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

  // Función para obtener las fechas de la promoción configuradas en el admin (Firestore)
  function getFirestoreDate(sectionName, dateType) {
    const promo = promotionDates[toPromoKey(sectionName)];
    if (promo && promo.active) {
      console.log(`📅 Usando fecha de Firestore para ${sectionName} (${dateType}): ${promo[dateType]}`);
      return promo[dateType];
    }
    
    // Sin fechas en Firestore no se muestra etiqueta de oferta
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
      // Mantener el filtro activo en el nuevo contenido
      applySectionFilter();

      // Re-inicializar utilidades que dependen del nuevo DOM
      if (window.updateProductImages) window.updateProductImages();
      if (window.lazyLoadImages) window.lazyLoadImages();
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
    const baseName = toFolderName(sectionName);

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
        // Usar fechas de Firestore si están configuradas (sin fechas no se muestra etiqueta)
        startDate: (i === 0 && hasDates) ? getFirestoreDate(sectionName, 'startDate') : null,
        endDate: (i === 0 && hasDates) ? getFirestoreDate(sectionName, 'endDate') : null
      });
    }
    
    return products;
  }

  function createSection(sectionName, products) {
    const escapeHTML = (str) => String(str || '').replace(/"/g, '&quot;');
    let html = `<h2 class="section-title">${sectionName}${sectionNewBadge(sectionName)}</h2><div class="carousel-container">`;

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
  // Es también el filtro de secciones de la app
  // ========================
  const FRESH_DAYS = 7;   // verde: subido en los últimos 7 días
  const STALE_DAYS = 30;  // naranja: más de 30 días sin subir nada (mismo umbral que el admin)
  const STATUS_ORDER = { fresh: 0, ok: 1, stale: 2, expired: 3, unknown: 4 };
  // Grupos que aparecen al pulsar "Ver las otras" (las nuevas siempre están visibles)
  const UPDATE_GROUPS = [
    { status: 'ok', label: 'Hace 7–30 días' },
    { status: 'stale', label: 'Hace más de 30 días' },
    { status: 'expired', label: 'Oferta caducada' },
    { status: 'unknown', label: 'Sin fecha de subida' }
  ];

  let activeSection = '';     // cadena filtrada ('' = todas)
  let showAllUpdates = false; // grupos de "Ver las otras" desplegados

  function toFolderName(sectionName) {
    return sectionName.toLowerCase().replace(/\s+/g, '_');
  }

  function toPromoKey(sectionName) {
    return sectionName.toUpperCase().replace(/\s+/g, '_');
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

  function relativeDayLabel(days) {
    if (days <= 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    return `Hace ${days} días`;
  }

  // dd/mm, con el año solo si no es el actual
  function formatShortDate(date) {
    const options = { day: '2-digit', month: '2-digit' };
    if (date.getFullYear() !== new Date().getFullYear()) options.year = 'numeric';
    return date.toLocaleDateString('es-ES', options);
  }

  function sectionHasImages(sectionName) {
    const count = (window.firebaseImageActualCounts || {})[toFolderName(sectionName)];
    return (count !== undefined ? count : (sectionImageCounts[sectionName] || 0)) > 0;
  }

  // Fecha de la última subida de una sección (solo si tiene imágenes: al traspasar
  // un periodo, SIGUIENTE queda vacía pero con fecha nueva)
  function getSectionUpdatedAt(sectionName) {
    if (!SECTION_NAMES.includes(sectionName) || !sectionHasImages(sectionName)) return null;
    const d = new Date(getLastUpdatesMap()[toFolderName(sectionName)]);
    return isNaN(d.getTime()) ? null : d;
  }

  // Fecha de fin de la promoción activa, solo si ya ha pasado
  function getExpiredEndDate(sectionName) {
    const promo = promotionDates[toPromoKey(sectionName)];
    if (!promo || !promo.active || !promo.endDate) return null;
    const [y, m, d] = promo.endDate.split('-');
    const endDate = new Date(y, m - 1, d);
    return daysSince(endDate) > 0 ? endDate : null;
  }

  // Etiqueta "Nuevo" junto al título de las secciones subidas en los últimos 7 días
  function sectionNewBadge(sectionName) {
    const updatedAt = getSectionUpdatedAt(sectionName);
    if (!updatedAt || getExpiredEndDate(sectionName)) return '';
    const days = daysSince(updatedAt);
    if (days >= FRESH_DAYS) return '';
    return `<span class="section-new-badge">Nuevo · ${relativeDayLabel(days)}</span>`;
  }

  // Estado de una cadena: se considera su sección actual + su SIGUIENTE
  function getSectionUpdateStatus(sectionName) {
    const nextName = `${sectionName} SIGUIENTE`;
    const updatedAt = [getSectionUpdatedAt(sectionName), getSectionUpdatedAt(nextName)]
      .filter(Boolean)
      .sort((a, b) => b - a)[0] || null;
    const hasNext = !!getSectionUpdatedAt(nextName);
    const expiredEndDate = getExpiredEndDate(sectionName);

    const days = updatedAt ? daysSince(updatedAt) : null;
    let status;
    if (expiredEndDate) status = 'expired';
    else if (days === null) status = 'unknown';
    else if (days < FRESH_DAYS) status = 'fresh';
    else if (days <= STALE_DAYS) status = 'ok';
    else status = 'stale';

    let label;
    if (expiredEndDate) label = 'Caducada';
    else if (days === null) label = 'Sin fecha';
    else label = relativeDayLabel(days);

    // Barra de detalle: solo lo que la casilla no dice ya
    const detail = [];
    if (updatedAt) {
      const dayStr = days <= 0 ? 'hoy' : days === 1 ? 'ayer' : `el ${formatShortDate(updatedAt)}`;
      const timeStr = updatedAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      detail.push(`Subido ${dayStr} a las ${timeStr}`);
    }
    if (expiredEndDate) detail.push(`Terminó el ${formatShortDate(expiredEndDate)}`);
    if (hasNext) detail.push('FEM siguiente disponible');

    return { sectionName, status, label, updatedAt, hasNext, detail: detail.join(' · ') };
  }

  function renderUpdateChip(it) {
    const isActive = it.sectionName === activeSection;
    return `
      <button type="button" class="update-chip is-${it.status}${isActive ? ' is-active' : ''}"
        data-section="${it.sectionName}" aria-pressed="${isActive}">
        <span class="update-dot" aria-hidden="true"></span>
        <span class="update-chip-name">${it.sectionName.replace(/^FEM /, '')}</span>
        <span class="update-chip-meta">
          <span class="update-chip-time">${it.label}</span>
          ${it.hasNext ? '<span class="update-chip-next">+ Siguiente</span>' : ''}
        </span>
      </button>`;
  }

  function renderUpdateStatus() {
    const container = document.getElementById('update-status');
    if (!container) return;

    const items = SECTION_NAMES
      .filter(name => !name.includes('SIGUIENTE'))
      .map(getSectionUpdateStatus)
      .sort((a, b) => (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) || ((b.updatedAt || 0) - (a.updatedAt || 0)));

    let collapsed = false;
    try { collapsed = localStorage.getItem('updateStatusCollapsed') === '1'; } catch (e) {}

    const active = items.find(it => it.sectionName === activeSection);
    const fresh = items.filter(it => it.status === 'fresh');
    const others = items.filter(it => it.status !== 'fresh');
    const outdatedCount = items.filter(it => it.status === 'stale' || it.status === 'expired').length;
    const outdatedText = `${outdatedCount} ${outdatedCount === 1 ? 'desactualizada' : 'desactualizadas'}`;

    // Barra del filtro activo: se ve también con el panel plegado
    const detail = active
      ? `
        <div class="update-detail is-${active.status}" role="status">
          <span class="update-dot" aria-hidden="true"></span>
          <span class="update-detail-text"><strong>${active.sectionName.replace(/^FEM /, '')}</strong>${active.detail ? ` · ${active.detail}` : ''}</span>
          <button type="button" class="update-detail-clear" aria-label="Ver todas las secciones">✕</button>
        </div>`
      : '';

    let summary = '';
    let body = detail;

    if (collapsed) {
      // Plegado: el resumen sustituye a las casillas
      summary = `
        <span class="update-status-summary">
          <span class="update-pill${fresh.length ? ' is-fresh' : ''}">${fresh.length || 'Ninguna'} ${fresh.length === 1 ? 'nueva' : 'nuevas'} esta semana</span>
          ${outdatedCount ? `<span class="update-pill is-outdated">${outdatedText}</span>` : ''}
        </span>`;
    } else {
      // La sección filtrada se muestra siempre, aunque esté en un grupo plegado
      const pinned = !showAllUpdates && active && active.status !== 'fresh' ? [active] : [];
      const mainChips = [...fresh, ...pinned].map(renderUpdateChip).join('');
      const emptyMsg = fresh.length ? '' : '<span class="update-empty">Nada nuevo en los últimos 7 días</span>';
      const moreBtn = others.length
        ? `
          <button type="button" class="update-more" aria-expanded="${showAllUpdates}">
            ${showAllUpdates
              ? 'Ver menos ▴'
              : `Ver las otras ${others.length}${outdatedCount ? ` · <span class="update-more-outdated">${outdatedText}</span>` : ''} ▾`}
          </button>`
        : '';
      const groups = showAllUpdates
        ? UPDATE_GROUPS.map(group => {
            const groupItems = others.filter(it => it.status === group.status);
            if (!groupItems.length) return '';
            return `
              <div class="update-group">
                <p class="update-group-label">${group.label}</p>
                <div class="update-chips">${groupItems.map(renderUpdateChip).join('')}</div>
              </div>`;
          }).join('')
        : '';

      body = `<div class="update-chips">${mainChips}${emptyMsg}</div>${detail}${moreBtn}${groups}`;
    }

    const html = `
      <button type="button" class="update-status-toggle" aria-expanded="${!collapsed}">
        <span class="update-status-title">🕒 Actualizaciones</span>
        ${summary}
        <span class="update-status-caret" aria-hidden="true">▾</span>
      </button>
      ${body ? `<div class="update-status-body">${body}</div>` : ''}`;

    container.classList.toggle('is-collapsed', collapsed);
    if (container.innerHTML !== html) container.innerHTML = html;
  }

  function handleUpdateStatusClick(e) {
    const chip = e.target.closest('.update-chip');
    if (chip) {
      // Tocar la sección ya filtrada vuelve a mostrar todas
      activeSection = activeSection === chip.dataset.section ? '' : chip.dataset.section;
      // Plegar la lista: la sección elegida queda fijada arriba junto a su detalle
      showAllUpdates = false;
      filterSections();
      return;
    }

    if (e.target.closest('.update-detail-clear')) {
      activeSection = '';
      filterSections();
      return;
    }

    if (e.target.closest('.update-more')) {
      showAllUpdates = !showAllUpdates;
      triggerHaptic('light');
      renderUpdateStatus();
      return;
    }

    if (e.target.closest('.update-status-toggle')) {
      const collapsed = !document.getElementById('update-status').classList.contains('is-collapsed');
      try { localStorage.setItem('updateStatusCollapsed', collapsed ? '1' : '0'); } catch (err) {}
      triggerHaptic('light');
      renderUpdateStatus();
    }
  }

  // Muestra solo la cadena filtrada (actual + SIGUIENTE); las secciones sin productos siguen ocultas
  function applySectionFilter() {
    document.querySelectorAll('.section').forEach(s => {
      const sectionName = s.dataset.section;
      const matches = !activeSection || sectionName === activeSection || sectionName === `${activeSection} SIGUIENTE`;
      s.style.display = matches && s.childElementCount ? 'block' : 'none';
    });
  }

  // Cambio de filtro por el usuario
  function filterSections() {
    triggerHaptic('light');

    const applyFilter = () => {
      applySectionFilter();

      // Re-cargar imágenes lazy de las secciones que acaban de hacerse visibles
      // Primero intentar asignar URLs ya cacheadas
      if (window.updateProductImages) window.updateProductImages();
      // Luego re-observar las imágenes lazy restantes que no tenían URL en caché
      if (window.lazyLoadImages) window.lazyLoadImages();
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
