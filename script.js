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
    
    // Si no hay fecha de Firestore, usar fecha por defecto
    const defaultDate = dateType === 'startDate' ? getDefaultStartDate(sectionName) : getDefaultEndDate(sectionName);
    console.log(`📅 Usando fecha por defecto para ${sectionName} (${dateType}): ${defaultDate}`);
    return defaultDate;
  }



  async function initializeApp() {
    // Cargar fechas de promociones primero
    await loadPromotionDatesFromFirestore();
    
    // Luego actualizar la lista de productos con las fechas correctas
    updateProductList();
    createFilterDropdown();
    addEventListeners();
    if (window.initFullscreenModal) window.initFullscreenModal();
    
    // Cargar fechas de promociones con retraso como respaldo
    setTimeout(loadPromotionDatesFromFirestore, 1000);
    setTimeout(loadPromotionDatesFromFirestore, 3000);
  }

  function updateProductList() {
    const productListElem = document.getElementById('product-list');
    if (!productListElem) return;

    productListElem.innerHTML = SECTION_NAMES
      .map(sectionName => {
        const dynamicProducts = generateProductsFromImages(sectionName);
        return `<div class="section" data-section="${sectionName}">${createSection(sectionName, dynamicProducts)}</div>`;
      }).join('');

    if (window.updateProductImages) window.updateProductImages();
    if (window.lazyLoadImages) window.lazyLoadImages();
  }


  // Configuración de cuántas imágenes tiene cada sección
  const sectionImageCounts = {
    'FOCOS': 90,
    'EEAA Y PUNTUACION': 26,
    'ORDEN DE MARCAS': 19,
    'ACUERDO NACIONAL 2025': 6,
    'FEM ALCAMPO': 15,
    'FEM ALCAMPO SIGUIENTE': 15,
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
    'FEM CAPRABO SIGUIENTE':158,
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
    const imageCount = actualCounts[baseName] !== undefined 
      ? actualCounts[baseName] 
      : (sectionImageCounts[sectionName] || 5);
    
    // Secciones que NO deben tener fechas
    const sectionsWithoutDates = ['ORDEN DE MARCAS', 'EEAA Y PUNTUACION'];
    const hasDates = !sectionsWithoutDates.includes(sectionName);
    
    // Generar productos basándose en las imágenes disponibles
    for (let i = 0; i < imageCount; i++) {
      const imagePath = `images/${baseName}/${baseName}_${i}.jpg`;
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

      html += `<div class="product is-loading" data-section-name="${escapeHTML(sectionName)}">
        <div class="product-image-container skeleton">
          <img data-src="${p.image}" data-full="${p.fullImage}" alt="${escapeHTML(p.name)}" class="lazy" loading="lazy" crossorigin="anonymous"
            onload="this.closest('.product').classList.remove('is-loading'); this.parentElement.classList.remove('skeleton');"
            onerror="this.src='icons/icon-192.png'; this.style.opacity='0.5'; this.closest('.product').classList.remove('is-loading');">
        </div>
        <h3>${p.name || 'Producto sin nombre'}</h3>`;

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
  
  console.log(`Fecha actual: ${today.toISOString().split('T')[0]}, Fin: ${fin.toISOString().split('T')[0]}, Días restantes: ${diasRestantes}`);
  
  if (fin < today) {
    txtPrincipal = 'Oferta caducada';
    cls = 'offer-expired';
  } else if (ini && ini > today) {
    // Oferta futura: calcular días hasta el inicio
    const diffIni = ini - today;
    const diasHastaInicio = Math.ceil(diffIni / (1000 * 60 * 60 * 24));
    txtPrincipal = `Empieza en ${diasHastaInicio} ${diasHastaInicio === 1 ? 'día' : 'días'}`;
    const inicioStr = ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
    const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
    txtSecundario = `Desde ${inicioStr} hasta ${finStr}`;
    cls = 'offer-upcoming';
    console.log(`Oferta futura: empieza en ${diasHastaInicio} días`);
  } else {
    // Oferta activa: mostrar días restantes
    txtPrincipal = diasRestantes === 1 ? 'Queda 1 día' : `Quedan ${diasRestantes} días`;
    const inicioStr = ini ? ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'}) : '??';
    const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
    txtSecundario = `Desde ${inicioStr} hasta ${finStr}`;
    cls = 'offer-active';
    console.log(`Oferta activa: quedan ${diasRestantes} días`);
  }
  
  html += `<div class="offer-tag ${cls}">
    <span class="offer-main">${txtPrincipal}</span>
    ${txtSecundario ? `<span class="offer-dates"> | ${txtSecundario}</span>` : ''}
  </div>`;
}


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
  }


  window.setQuantity = setQuantity;
  window.validateInput = validateInput;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateProductListFromScript = updateProductList;

  document.addEventListener('DOMContentLoaded', initializeApp);
})();
