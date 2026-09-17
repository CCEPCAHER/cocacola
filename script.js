(function () {
  'use strict';

  let promotionDates = {};
  
  function triggerHaptic(type = 'light') {
    if (!('vibrate' in navigator)) return;
    const patterns = {
      light: 15,
      medium: 30,
      heavy: 50,
      error: [50, 80, 50],
      success: [20, 50]
    };
    navigator.vibrate(patterns[type] || patterns.light);
  }
  window.triggerHaptic = triggerHaptic;
  
  async function loadPromotionDatesFromFirestore() {
    try {
      let attempts = 0;
      let firebaseApp = null;
      
      // Esperar a que Firebase esté disponible
      while (attempts < 150) {
        if (window.firebaseApp) {
          firebaseApp = window.firebaseApp;
          break;
        }
        if (window.auth) {
          firebaseApp = window.auth.app;
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
        attempts++;
      }

      if (!firebaseApp) {
        console.warn('Firebase no disponible después de 150 intentos. Las fechas no se cargarán.');
        return;
      }

      console.log('Firebase disponible, cargando fechas de promociones...');

      const { getFirestore, collection, getDocs } = await import(
        'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
      );
      
      const db = getFirestore(firebaseApp);
      const querySnapshot = await getDocs(collection(db, 'promotions'));
      
      if (querySnapshot.empty) {
        console.log('No se encontraron documentos en la colección "promotions".');
        return;
      }
      
      console.log(`Se encontraron ${querySnapshot.size} promociones en Firestore`);
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        promotionDates[doc.id] = data;
        console.log(`Cargada promoción ${doc.id}:`, data);
      });
      
      console.log('Fechas cargadas:', promotionDates);
      applyPromotionDatesToSections();
      
    } catch (error) {
      console.error('Error cargando fechas:', error);
    }
  }

  function applyPromotionDatesToSections() {
    if (Object.keys(promotionDates).length === 0) return;
    // Las fechas de Firestore ya están en promotionDates,
    // getFirestoreDate() las leerá al regenerar los productos
    updateProductList();
  }

  // Función para obtener fechas desde Firestore (con prioridad sobre fechas por defecto)
  function getFirestoreDate(sectionName, dateType) {
    const normalizedKey = sectionName.toUpperCase().replace(/\s+/g, '_');
    const promo = promotionDates[normalizedKey];
    if (promo && promo.active) {
      console.log(`📅 Usando fecha de Firestore para ${sectionName} (${dateType}): ${promo[dateType]}`);
      return promo[dateType];
    }
    
    // Si no hay fecha de Firestore, retornar null para evitar mostrar "Oferta caducada"
    // con fechas por defecto obsoletas
    console.log(`📅 Sin fecha de Firestore para ${sectionName} (${dateType}). Retornando null.`);
    return null;
  }



  async function initializeApp() {
    // Cargar fechas de promociones primero
    await loadPromotionDatesFromFirestore();
    
    // Luego actualizar la lista de productos con las fechas correctas
    // (Solo si no se ha actualizado ya dentro de loadPromotionDatesFromFirestore)
    if (document.getElementById('product-list') && document.getElementById('product-list').innerHTML === '') {
      updateProductList();
    }
    
    createFilterDropdown();
    addEventListeners();
    if (window.initFullscreenModal) window.initFullscreenModal();
    
    // Eliminamos los setTimeouts redundantes que causaban re-renderizados jarreantes
    // y daban la sensación de que los productos "desaparecían".
  }

  function updateProductList() {
    const productListElem = document.getElementById('product-list');
    if (!productListElem) return;

    // Generar el nuevo HTML
    const newHTML = SECTION_NAMES
      .map(sectionName => {
        const dynamicProducts = generateProductsFromImages(sectionName);
        
        // Si no hay productos en esta sección (ej. ha sido swappeada o vaciada), ocultarla
        if (dynamicProducts.length === 0) {
          return `<div class="section" data-section="${sectionName}" style="display: none;"></div>`;
        }
        
        return `<div class="section" data-section="${sectionName}">${createSection(sectionName, dynamicProducts)}</div>`;
      }).join('');

    // Solo actualizar el DOM si el contenido ha cambiado para evitar parpadeos
    if (productListElem.innerHTML !== newHTML) {
      productListElem.innerHTML = newHTML;
      
      // Re-inicializar utilidades que dependen del nuevo DOM
      if (window.updateProductImages) window.updateProductImages();
      if (window.lazyLoadImages) window.lazyLoadImages();
      
      // Si hay un filtro activo, aplicarlo al nuevo contenido
      const filter = document.getElementById('section-filter');
      if (filter && filter.value && typeof filterSections === 'function') {
        filterSections();
      }
    }

    // Las fechas de subida pueden cambiar aunque los productos no cambien
    renderUpdateStatus();
  }


  // Configuración de cuántas imágenes tiene cada sección
  const sectionImageCounts = {
    'FOCOS': 90,
    'EEAA Y PUNTUACION': 26,
    'ORDEN DE MARCAS': 19,
    'ACUERDO NACIONAL 2025': 6,
    'FEM ALCAMPO': 27,
    'FEM ALCAMPO SIGUIENTE': 27,
    'FEM CARREFOUR': 15,
    'FEM CARREFOUR SIGUIENTE': 15,
    'FEM CARREFOUR MARKET': 12,
    'FEM CARREFOUR MARKET SIGUIENTE': 12,
    'FEM SUPECO':17,
    'FEM SUPECO SIGUIENTE': 17,
    'FEM SORLI': 3,
    'FEM SORLI SIGUIENTE': 3,
    'FEM SCLAT BONPREU': 8,
    'FEM SCLAT BONPREU SIGUIENTE': 8,
    'FEM CAPRABO': 15,
    'FEM CAPRABO SIGUIENTE': 15,
    'FEM CONSUM': 10,
    'FEM CONSUM SIGUIENTE': 10,
    'FEM CONDIS': 3,
    'FEM CONDIS SIGUIENTE': 3,
    'FEM COVIRAN': 4,
    'FEM COVIRAN SIGUIENTE': 4,
    'FEM ECI': 10,
    'FEM ECI SIGUIENTE': 10,
    'IMPLANTACIONES': 5
  };

  // Lista de secciones de la app (fuente de verdad: sectionImageCounts)
  const SECTION_NAMES = Object.keys(sectionImageCounts);

  // Función para generar productos dinámicamente basándose en las imágenes disponibles
  function generateProductsFromImages(sectionName) {
    const products = [];
    const baseName = sectionName.toLowerCase().replace(/\s+/g, '_');

    // Usar el conteo real de Firebase Storage si está disponible,
    // sino usar el conteo configurado como fallback
    const actualCounts = window.firebaseImageActualCounts || {};
    
    const imageCount = Math.min(actualCounts[baseName] !== undefined 
      ? actualCounts[baseName] 
      : (sectionImageCounts[sectionName] || 1), 100);
    
    // Si el conteo es 0 pero la sección debería tener algo por defecto, asegurar al menos 1
    // Esto evita que las secciones desaparezcan totalmente si hay un error de sincronización
    const finalCount = imageCount === 0 && sectionImageCounts[sectionName] > 0 ? 1 : imageCount;
    // Límite de seguridad de 100 imágenes por sección
    
    // Secciones que NO deben tener fechas
    const sectionsWithoutDates = ['ORDEN DE MARCAS', 'EEAA Y PUNTUACION'];
    const hasDates = !sectionsWithoutDates.includes(sectionName);
    
    // Generar productos basándose en las imágenes disponibles
    for (let i = 0; i < finalCount; i++) {
      const productName = sectionName.includes('SIGUIENTE') 
        ? `${sectionName.replace(' SIGUIENTE', '')} Siguiente Producto ${i + 1}`
        : `${sectionName} Producto ${i + 1}`;
      
      products.push({
        name: productName,
        price: 0.00,
        offer: false,
        staticOffer: true,
        image: `images/${baseName}/${baseName}_${i}_thumb.jpg`,
        fullImage: `images/${baseName}/${baseName}_${i}.jpg`,
        // Solo el primer producto tendrá fechas si la sección las permite
        // Usar fechas de Firestore si están disponibles, sino fechas por defecto
        startDate: (i === 0 && hasDates) ? getFirestoreDate(sectionName, 'startDate') : null,
        endDate: (i === 0 && hasDates) ? getFirestoreDate(sectionName, 'endDate') : null
      });
    }
    
    return products;
  }

  // Función para obtener fechas por defecto basándose en el nombre de la sección
  // Estas fechas se sobrescribirán con las fechas del administrador cuando estén disponibles
  function getDefaultStartDate(sectionName) {
    // Fechas por defecto que coinciden con las del administrador
    const dateMap = {
      'FEM ALCAMPO': '2025-10-23',
      'FEM ALCAMPO SIGUIENTE': '2025-11-06',
      'FEM CARREFOUR': '2025-10-28',
      'FEM CARREFOUR SIGUIENTE': '2025-11-14',
      'FEM CARREFOUR MARKET': '2025-10-14',
      'FEM CARREFOUR MARKET SIGUIENTE': '2025-10-28',
      'FEM SUPECO': '2025-10-25',
      'FEM SUPECO SIGUIENTE': '2025-11-08',
      'FEM SORLI': '2025-10-20',
      'FEM SORLI SIGUIENTE': '2025-11-03',
      'FEM SCLAT BONPREU': '2025-10-18',
      'FEM SCLAT BONPREU SIGUIENTE': '2025-11-01',
      'FEM CAPRABO': '2025-10-16',
      'FEM CAPRABO SIGUIENTE': '2025-10-30',
      'FEM CONSUM': '2025-10-22',
      'FEM CONSUM SIGUIENTE': '2025-11-05',
      'FEM CONDIS': '2025-10-22',
      'FEM CONDIS SIGUIENTE': '2025-11-05',
      'FEM COVIRAN': '2025-10-21',
      'FEM COVIRAN SIGUIENTE': '2025-11-04',
      'FEM ECI': '2025-10-24',
      'FEM ECI SIGUIENTE': '2025-11-07',
      'ACUERDO NACIONAL 2025': '2025-10-01',
      'FOCOS': '2025-10-01'
    };
    return dateMap[sectionName] || '2025-10-20';
  }

  function getDefaultEndDate(sectionName) {
    // Fechas por defecto que coinciden con las del administrador
    const dateMap = {
      'FEM ALCAMPO': '2025-11-05',
      'FEM ALCAMPO SIGUIENTE': '2025-11-19',
      'FEM CARREFOUR': '2025-11-13',
      'FEM CARREFOUR SIGUIENTE': '2025-11-28',
      'FEM CARREFOUR MARKET': '2025-10-27',
      'FEM CARREFOUR MARKET SIGUIENTE': '2025-11-11',
      'FEM SUPECO': '2025-11-08',
      'FEM SUPECO SIGUIENTE': '2025-11-22',
      'FEM SORLI': '2025-11-02',
      'FEM SORLI SIGUIENTE': '2025-11-16',
      'FEM SCLAT BONPREU': '2025-10-31',
      'FEM SCLAT BONPREU SIGUIENTE': '2025-11-14',
      'FEM CAPRABO': '2025-10-29',
      'FEM CAPRABO SIGUIENTE': '2025-11-12',
      'FEM CONSUM': '2025-11-04',
      'FEM CONSUM SIGUIENTE': '2025-11-18',
      'FEM CONDIS': '2025-11-04',
      'FEM CONDIS SIGUIENTE': '2025-11-18',
      'FEM COVIRAN': '2025-11-03',
      'FEM COVIRAN SIGUIENTE': '2025-11-17',
      'FEM ECI': '2025-11-06',
      'FEM ECI SIGUIENTE': '2025-11-20',
      'ACUERDO NACIONAL 2025': '2025-10-31',
      'FOCOS': '2025-10-31'
    };
    return dateMap[sectionName] || '2025-11-10';
  }

  function createSection(sectionName, products) {
    const escapeHTML = (str) => String(str || '').replace(/"/g, '&quot;');
    let html = `<h2 class="section-title">${sectionName}</h2><div class="carousel-container">`;

    products.forEach((p, i) => {
      const btnId = `${sectionName.replace(/\s/g, '_')}-${i}`;
      const imagePath = p.image;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let offerHtml = '';
      let productClasses = 'product is-loading';

      // Mostrar días restantes + rango de fechas solo en el primer producto (índice 0)
      if (p.endDate && i === 0) {
        console.log(`Procesando fechas para ${p.name}: inicio=${p.startDate}, fin=${p.endDate}`);
        
        const endParts = p.endDate.split('-');
        const fin = new Date(endParts[0], endParts[1] - 1, endParts[2]);
        fin.setHours(23, 59, 59, 999);
        
        let ini = null;
        if (p.startDate) {
          const startParts = p.startDate.split('-');
          ini = new Date(startParts[0], startParts[1] - 1, startParts[2]);
          ini.setHours(0, 0, 0, 0);
        }
        
        let txtPrincipal = '', txtSecundario = '', cls = '';
        
        // Calcular días restantes
        const diffTime = fin - today;
        const diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (fin < today) {
          txtPrincipal = 'Oferta caducada';
          cls = 'offer-expired';
          productClasses += ' product-expired';
        } else if (ini && ini > today) {
          const diffIni = ini - today;
          const diasHastaInicio = Math.ceil(diffIni / (1000 * 60 * 60 * 24));
          txtPrincipal = `Empieza en ${diasHastaInicio} ${diasHastaInicio === 1 ? 'día' : 'días'}`;
          const inicioStr = ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
          const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
          txtSecundario = `Desde ${inicioStr} hasta ${finStr}`;
          cls = 'offer-upcoming';
          productClasses += ' product-upcoming';
        } else {
          txtPrincipal = diasRestantes === 1 ? '¡ÚLTIMO DÍA!' : `¡QUEDAN ${diasRestantes} DÍAS!`;
          const inicioStr = ini ? ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'}) : '??';
          const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
          txtSecundario = `Desde ${inicioStr} hasta ${finStr}`;
          cls = 'offer-active';
          productClasses += ' product-on-sale';
        }
        
        offerHtml = `<div class="offer-tag ${cls}">
          <span class="offer-main">${txtPrincipal}</span>
          ${txtSecundario ? `<span class="offer-dates"> | ${txtSecundario}</span>` : ''}
        </div>`;
      }

      html += `<div class="${productClasses}" data-section-name="${escapeHTML(sectionName)}">
        <div class="product-image-container skeleton">
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${p.image}" data-full="${p.fullImage}" alt="${escapeHTML(p.name)}" class="lazy" loading="lazy" crossorigin="anonymous"
            onload="if(this.src && !this.src.startsWith('data:')) { this.closest('.product').classList.remove('is-loading'); this.parentElement.classList.remove('skeleton'); }"
            onerror="(async function(img) {
              if (!img.src || img.src.startsWith('data:') || img.src.endsWith('icon-192.png')) return;
              if (!img.dataset.retried) {
                img.dataset.retried = 'true';
                var key = (img.dataset.src || '').trim();
                if (key && window.ensureUrl) {
                  var newUrl = await window.ensureUrl(key, true);
                  if (newUrl) { img.src = newUrl; return; }
                }
              }
              img.src='icons/icon-192.png'; img.style.opacity='0.5';
              img.closest('.product')?.classList.remove('is-loading');
              img.parentElement?.classList.remove('skeleton');
            })(this)">
        </div>
        <h3>${p.name || 'Producto sin nombre'}</h3>
        ${offerHtml}`;


      if (!p.staticOffer && typeof p.price === 'number') {
        const qs = PRODUCT_QUANTITIES[p.name] || [];
        html += `<p class="price">€${p.price.toFixed(2)}</p>
          <div class="quantity-buttons">
            ${qs.map(q => `<button onclick="setQuantity(this,${q})">${q}</button>`).join('')}
            <input type="number" placeholder="Otro" oninput="validateInput(this)">
          </div>
          <button id="${btnId}" class="add-btn" data-product-name="${escapeHTML(p.name)}" data-product-price="${p.price}" onclick="addToCart(this)">Agregar</button>`;
      }

      html += `</div>`;
    });

    html += `</div>`;
    return html;
  }

  function setQuantity(btn, v) {
    const input = btn.parentElement.querySelector('input');
    input.value = v;
  }

  function validateInput(input) {
    if (input.value < 0) input.value = 0;
  }

  function updateTotalDisplay(t) {
    const out = `Total: €${t.toFixed(2)}`;
    ['total-display', 'modal-total'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerText = out;
    });
  }

  function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('#cart-items-modal .cart-item').forEach(it => total += parseFloat(it.dataset.price) || 0);
    updateTotalDisplay(total);
  }

  function addToCart(btn) {
    const name = btn.dataset.productName;
    const price = parseFloat(btn.dataset.productPrice);
    const input = btn.parentElement.querySelector('input[type="number"]');

    if (!input || !input.value.trim()) { alert('Ingresa una cantidad'); return; }
    const qty = parseInt(input.value, 10);
    if (!qty || qty <= 0) { alert('Cantidad no válida'); return; }
    if (btn.classList.contains('added')) { alert('Ya añadido'); return; }

    const section = btn.closest('[data-section-name]').dataset.sectionName || 'General';
    const cart = document.getElementById('cart-items-modal');
    if (cart.innerText.trim() === 'No hay productos añadidos.') cart.innerHTML = '';

    const subtotal = price * qty;
    cart.insertAdjacentHTML('beforeend', `
      <div class="cart-item" data-price="${subtotal.toFixed(2)}" data-section="${section}" data-quantity="${qty}" data-product-name="${name}">
        <span class="cart-product-name">${name}</span> – ${qty} uds – €${subtotal.toFixed(2)}
        <button class="remove-btn" onclick="removeFromCart(this,'${btn.id}')">Eliminar</button>
      </div>`);

    btn.classList.add('added');
    btn.style.background = '#28a745';
    btn.textContent = 'Añadido';
    updateTotalPrice();
    showToast(`Producto añadido: ${name}`);
    triggerHaptic('success');
  }

  function removeFromCart(removeBtn, addBtnId) {
    removeBtn.parentElement.remove();
    const addBtn = document.getElementById(addBtnId);
    if (addBtn) {
      addBtn.classList.remove('added');
      addBtn.style.background = '#E41A1C';
      addBtn.textContent = 'Agregar';
      const input = addBtn.parentElement.querySelector('input[type="number"]');
      if (input) input.value = '';
    }
    const cart = document.getElementById('cart-items-modal');
    if (!cart.children.length) cart.innerHTML = 'No hay productos añadidos.';
    updateTotalPrice();
  }

  function collectCartData() {
    const cartItems = document.querySelectorAll('#cart-items-modal .cart-item');
    if (!cartItems.length) return null;
    return Array.from(cartItems).map(it => {
      const q = parseInt(it.dataset.quantity, 10) || 0;
      return {
        product: it.dataset.productName,
        quantity: q,
        totalPrice: parseFloat(it.dataset.price) || 0,
        section: it.dataset.section
      };
    });
  }

  function checkPendingInputs() {
    for (const div of document.querySelectorAll('.product')) {
      const input = div.querySelector('input[type="number"]');
      const add = div.querySelector('.add-btn');
      if (input && input.value && parseInt(input.value) > 0 && add && !add.classList.contains('added')) {
        alert(`Falta añadir ${div.querySelector('h3')?.innerText || 'un producto'} al carrito.`);
        return true;
      }
    }
    return false;
  }

  function submitOrder() {
    if (checkPendingInputs()) return;
    const items = collectCartData();
    if (!items) { alert('Carrito vacío'); return; }
    if (!confirm('¿Finalizar y descargar pedido?')) return;

    if (typeof window.sendOrderToFirestore === 'function') {
      window.sendOrderToFirestore(items);
    }

    exportToExcel(items);

    document.getElementById('cart-items-modal').innerHTML = 'No hay productos añadidos.';
    updateTotalDisplay(0);
    document.querySelectorAll('.add-btn').forEach(b => {
      b.classList.remove('added');
      b.style.background = '#E41A1C';
      b.textContent = 'Agregar';
    });
    document.querySelectorAll('.product input[type="number"]').forEach(i => i.value = '');
    toggleCart();
    alert('✅ Pedido enviado y descargado');
    triggerHaptic('heavy');
  }

  function exportToExcel(order) {
    if (!order || !order.length) return;
    const user = localStorage.getItem('loggedInUser') || 'Usuario';
    const date = new Date().toLocaleDateString('es-ES');
    // Usar email del usuario para el nombre del archivo (sin @ y dominio)
    const userSlug = user.split('@')[0] || 'Usuario';
    const file = `Pedido_${userSlug}_${date.replace(/\//g, '-')}.xlsx`;

    const grouped = order.reduce((a, i) => {
      (a[i.section] = a[i.section] || []).push(i);
      return a;
    }, {});

    const sheet = [
      [`Realizado por: ${user}`],
      [`Fecha: ${date}`],
      []
    ];

    let grandTotal = 0;
    for (const sec in grouped) {
      sheet.push([sec]);
      sheet.push(['Producto', 'Unidades', 'Precio Unit.', 'Subtotal']);
      let subtotal = 0;
      grouped[sec].forEach(i => {
        const unit = i.quantity ? i.totalPrice / i.quantity : 0;
        sheet.push([i.product, i.quantity, unit, i.totalPrice]);
        subtotal += i.totalPrice;
      });
      sheet.push([`Subtotal ${sec}`, '', '', subtotal], []);
      grandTotal += subtotal;
    }
    sheet.push([], ['TOTAL', '', '', grandTotal]);

    const ws = XLSX.utils.aoa_to_sheet(sheet);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pedido');
    XLSX.writeFile(wb, file);
  }

  function toggleCart() {
    document.getElementById('cart-modal')?.classList.toggle('active');
  }

  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerText = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.classList.add('show'); }, 100);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 2500);
  }

  // ========================
  // PANEL DE ACTUALIZACIONES (parte superior)
  // ========================
  const FRESH_DAYS = 7;   // verde: subido en los últimos 7 días
  const STALE_DAYS = 30;  // naranja: más de 30 días sin subir nada (mismo umbral que el admin)
  const STATUS_ORDER = { fresh: 0, ok: 1, stale: 2, expired: 3, unknown: 4 };

  function toFolderName(sectionName) {
    return sectionName.toLowerCase().replace(/\s+/g, '_');
  }

  function getLastUpdatesMap() {
    if (window.firebaseImageUpdatedAt) return window.firebaseImageUpdatedAt;
    try {
      return JSON.parse(localStorage.getItem('firebaseImageLastUpdates')) || {};
    } catch (e) {
      return {};
    }
  }

  // Días naturales transcurridos desde una fecha (0 = hoy)
  function daysSince(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    return Math.round((today - day) / (1000 * 60 * 60 * 24));
  }

  // Estado de una cadena: se considera su sección actual + su SIGUIENTE
  function getSectionUpdateStatus(sectionName) {
    const actualCounts = window.firebaseImageActualCounts || {};
    const lastUpdates = getLastUpdatesMap();
    const nextName = `${sectionName} SIGUIENTE`;

    const hasImages = (name) => {
      const count = actualCounts[toFolderName(name)];
      return (count !== undefined ? count : (sectionImageCounts[name] || 0)) > 0;
    };
    const getUpdatedAt = (name) => {
      const d = new Date(lastUpdates[toFolderName(name)]);
      return isNaN(d.getTime()) ? null : d;
    };

    // Solo cuentan carpetas con imágenes (al traspasar un periodo, SIGUIENTE queda vacía con fecha nueva)
    let updatedAt = null;
    [sectionName, nextName].forEach(name => {
      if (!SECTION_NAMES.includes(name) || !hasImages(name)) return;
      const d = getUpdatedAt(name);
      if (d && (!updatedAt || d > updatedAt)) updatedAt = d;
    });

    const hasNext = SECTION_NAMES.includes(nextName) && hasImages(nextName) && !!getUpdatedAt(nextName);

    const promo = promotionDates[sectionName.toUpperCase().replace(/\s+/g, '_')];
    let isExpired = false;
    if (promo && promo.active && promo.endDate) {
      const [y, m, d] = promo.endDate.split('-');
      isExpired = daysSince(new Date(y, m - 1, d)) > 0;
    }

    const days = updatedAt ? daysSince(updatedAt) : null;
    let status;
    if (isExpired) status = 'expired';
    else if (days === null) status = 'unknown';
    else if (days < FRESH_DAYS) status = 'fresh';
    else if (days <= STALE_DAYS) status = 'ok';
    else status = 'stale';

    let label;
    if (isExpired) label = 'Caducada';
    else if (days === null) label = 'Sin datos';
    else if (days <= 0) label = 'Hoy';
    else if (days === 1) label = 'Ayer';
    else label = `Hace ${days} días`;

    const tooltip = [];
    if (isExpired) tooltip.push('Oferta caducada');
    if (updatedAt) {
      const dateStr = updatedAt.toLocaleDateString('es-ES');
      const timeStr = updatedAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      tooltip.push(`Actualizado el ${dateStr} a las ${timeStr}`);
    }
    if (hasNext) tooltip.push('FEM siguiente ya disponible');

    return { sectionName, status, label, updatedAt, hasNext, tooltip: tooltip.join(' · ') };
  }

  function renderUpdateStatus() {
    const container = document.getElementById('update-status');
    if (!container) return;

    const items = SECTION_NAMES
      .filter(name => !name.includes('SIGUIENTE'))
      .map(getSectionUpdateStatus)
      .sort((a, b) => (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) || ((b.updatedAt || 0) - (a.updatedAt || 0)));

    // Sin ninguna fecha todavía (p. ej. primera carga sin conexión): no mostrar un panel vacío
    if (items.every(it => it.status === 'unknown')) {
      container.classList.add('hidden');
      return;
    }

    let collapsed = false;
    try { collapsed = localStorage.getItem('updateStatusCollapsed') === '1'; } catch (e) {}

    const activeSection = document.getElementById('section-filter')?.value || '';
    const freshCount = items.filter(it => it.status === 'fresh').length;
    const outdatedCount = items.filter(it => it.status === 'stale' || it.status === 'expired').length;

    const pills = [
      freshCount
        ? `<span class="update-pill is-fresh">${freshCount} ${freshCount === 1 ? 'actualizada' : 'actualizadas'} esta semana</span>`
        : '<span class="update-pill">Nada nuevo esta semana</span>',
      outdatedCount
        ? `<span class="update-pill is-outdated">${outdatedCount} ${outdatedCount === 1 ? 'desactualizada' : 'desactualizadas'}</span>`
        : ''
    ].join('');

    const chips = items.map(it => `
      <button type="button" class="update-chip is-${it.status}${it.sectionName === activeSection ? ' is-active' : ''}"
        data-section="${it.sectionName}" aria-pressed="${it.sectionName === activeSection}" title="${it.tooltip}">
        <span class="update-dot" aria-hidden="true"></span>
        <span class="update-chip-name">${it.sectionName.replace(/^FEM /, '')}</span>
        <span class="update-chip-time">${it.label}</span>
        ${it.hasNext ? '<span class="update-chip-next" title="FEM siguiente ya disponible">+SIG</span>' : ''}
      </button>`).join('');

    const html = `
      <button type="button" class="update-status-toggle" aria-expanded="${!collapsed}" aria-controls="update-status-body">
        <span class="update-status-title">🕒 Actualizaciones</span>
        <span class="update-status-summary">${pills}</span>
        <span class="update-status-caret" aria-hidden="true">▾</span>
      </button>
      <div id="update-status-body" class="update-status-body">
        <div class="update-chips">${chips}</div>
        <p class="update-legend">
          <span class="update-legend-item is-fresh"><span class="update-dot"></span>Últimos 7 días</span>
          <span class="update-legend-item is-ok"><span class="update-dot"></span>7–30 días</span>
          <span class="update-legend-item is-stale"><span class="update-dot"></span>+30 días</span>
          <span class="update-legend-item is-expired"><span class="update-dot"></span>Caducada</span>
          <span class="update-legend-hint">Toca una sección para filtrar</span>
        </p>
      </div>`;

    container.classList.toggle('is-collapsed', collapsed);
    container.classList.remove('hidden');
    if (container.innerHTML !== html) container.innerHTML = html;
  }

  function handleUpdateStatusClick(e) {
    const chip = e.target.closest('.update-chip');
    if (chip) {
      const select = document.getElementById('section-filter');
      if (!select) return;
      // Tocar la sección ya filtrada vuelve a mostrar todas
      select.value = select.value === chip.dataset.section ? '' : chip.dataset.section;
      filterSections();
      return;
    }

    if (e.target.closest('.update-status-toggle')) {
      const container = document.getElementById('update-status');
      const collapsed = !container.classList.contains('is-collapsed');
      try { localStorage.setItem('updateStatusCollapsed', collapsed ? '1' : '0'); } catch (err) {}
      triggerHaptic('light');
      renderUpdateStatus();
    }
  }

  function createFilterDropdown() {
    const container = document.getElementById('filter-container');
    if (!container) return;
    const select = document.createElement('select');
    select.id = 'section-filter';
    select.innerHTML = '<option value="">Todas las secciones</option>';
    
    // Solo mostrar las secciones principales (sin SIGUIENTE) en el dropdown
    SECTION_NAMES.forEach(s => {
      if (!s.includes('SIGUIENTE')) {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        select.appendChild(opt);
      }
    });
    select.addEventListener('change', filterSections);
    container.appendChild(select);
  }

  function filterSections() {
    const selected = document.getElementById('section-filter').value;
    triggerHaptic('light');

    const applyFilter = () => {
      document.querySelectorAll('.section').forEach(s => {
        const sectionName = s.dataset.section;
        if (!selected) {
          s.style.display = 'block';
        } else {
          const shouldShow = sectionName === selected || sectionName === selected + ' SIGUIENTE';
          s.style.display = shouldShow ? 'block' : 'none';
        }
      });

      // Re-cargar imágenes lazy de las secciones que acaban de hacerse visibles
      // Primero intentar asignar URLs ya cacheadas
      if (window.updateProductImages) window.updateProductImages();
      // Luego re-observar las imágenes lazy restantes que no tenían URL en caché
      if (window.lazyLoadImages) window.lazyLoadImages();
      // Marcar la sección filtrada en el panel de actualizaciones
      renderUpdateStatus();
    };

    if (document.startViewTransition) {
      document.startViewTransition(applyFilter);
    } else {
      applyFilter();
    }
  }

  function addEventListeners() {
    document.getElementById('cart-toggle')?.addEventListener('click', toggleCart);
    document.getElementById('close-modal')?.addEventListener('click', toggleCart);
    document.getElementById('submit-order')?.addEventListener('click', submitOrder);
    document.getElementById('update-status')?.addEventListener('click', handleUpdateStatusClick);
  }


  window.setQuantity = setQuantity;
  window.validateInput = validateInput;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateProductListFromScript = updateProductList;

  document.addEventListener('DOMContentLoaded', initializeApp);
})();
