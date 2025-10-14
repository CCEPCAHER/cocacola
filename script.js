(function () {
  'use strict';

  let promotionDates = {};
  
  async function loadPromotionDatesFromFirestore() {
    try {
      let attempts = 0;
      let firebaseApp = null;
      
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
        console.warn('Firebase no disponible. Las fechas no se cargarán.');
        return;
      }

      const { getFirestore, collection, getDocs } = await import(
        'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
      );
      
      const db = getFirestore(firebaseApp);
      const querySnapshot = await getDocs(collection(db, 'promotions'));
      
      if (querySnapshot.empty) {
        console.log('No se encontraron documentos en la colección "promotions".');
        return;
      }
      
      querySnapshot.forEach((doc) => {
        promotionDates[doc.id] = doc.data();
      });
      
      applyPromotionDatesToSections();
      
    } catch (error) {
      console.error('Error cargando fechas:', error);
    }
  }

  function applyPromotionDatesToSections() {
    if (Object.keys(promotionDates).length === 0) return;

    Object.keys(sections).forEach(sectionKey => {
      const normalizedKey = sectionKey.toUpperCase().replace(/\s+/g, '_');
      
      if (promotionDates[normalizedKey]) {
        const promo = promotionDates[normalizedKey];
        sections[sectionKey].forEach(product => {
          if (promo.active) {
            product.startDate = promo.startDate;
            product.endDate = promo.endDate;
          } else {
            delete product.startDate;
            delete product.endDate;
          }
        });
      }
    });
    
    updateProductList();
  }

  const sections = {
    "FOCOS": [
  { "name": "Focos Producto 1", "startDate": "2025-10-01", "endDate": "2025-10-31", "image": "images/focos/focos_0.jpg" },
  { "name": "Focos Producto 2", "image": "images/focos/focos_1.jpg" },
  { "name": "Focos Producto 3", "image": "images/focos/focos_2.jpg" },
  { "name": "Focos Producto 4", "image": "images/focos/focos_3.jpg" },
  { "name": "Focos Producto 5", "image": "images/focos/focos_4.jpg" },
  { "name": "Focos Producto 6", "image": "images/focos/focos_5.jpg" },
  { "name": "Focos Producto 7", "image": "images/focos/focos_6.jpg" },
  { "name": "Focos Producto 8", "image": "images/focos/focos_7.jpg" },
  { "name": "Focos Producto 9", "image": "images/focos/focos_8.jpg" },
  { "name": "Focos Producto 10", "image": "images/focos/focos_9.jpg" },
  { "name": "Focos Producto 11", "image": "images/focos/focos_10.jpg" },
  { "name": "Focos Producto 12", "image": "images/focos/focos_11.jpg" },
  { "name": "Focos Producto 13", "image": "images/focos/focos_12.jpg" },
  { "name": "Focos Producto 14", "image": "images/focos/focos_13.jpg" },
  { "name": "Focos Producto 15", "image": "images/focos/focos_14.jpg" },
  { "name": "Focos Producto 16", "image": "images/focos/focos_15.jpg" },
  { "name": "Focos Producto 17", "image": "images/focos/focos_16.jpg" },
  { "name": "Focos Producto 18", "image": "images/focos/focos_17.jpg" },
  { "name": "Focos Producto 19", "image": "images/focos/focos_18.jpg" },
  { "name": "Focos Producto 20", "image": "images/focos/focos_19.jpg" },
  { "name": "Focos Producto 21", "image": "images/focos/focos_20.jpg" },
  { "name": "Focos Producto 22", "image": "images/focos/focos_21.jpg" },
  { "name": "Focos Producto 23", "image": "images/focos/focos_22.jpg" },
  { "name": "Focos Producto 24", "image": "images/focos/focos_23.jpg" },
  { "name": "Focos Producto 25", "image": "images/focos/focos_24.jpg" },
  { "name": "Focos Producto 26", "image": "images/focos/focos_25.jpg" },
  { "name": "Focos Producto 27", "image": "images/focos/focos_26.jpg" },
  { "name": "Focos Producto 28", "image": "images/focos/focos_27.jpg" },
  { "name": "Focos Producto 29", "image": "images/focos/focos_28.jpg" },
  { "name": "Focos Producto 30", "image": "images/focos/focos_29.jpg" }
],
    "EEAA Y PUNTUACION": [
      { "name": "EEAA Puntuación 1", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_0.jpg" },
      { "name": "EEAA Puntuación 2", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_1.jpg" },
      { "name": "EEAA Puntuación 3", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_2.jpg" },
      { "name": "EEAA Puntuación 4", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_3.jpg" },
      { "name": "EEAA Puntuación 5", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_4.jpg" },
      { "name": "EEAA Puntuación 6", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_5.jpg" },
      { "name": "EEAA Puntuación 7", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_6.jpg" },
      { "name": "EEAA Puntuación 8", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_7.jpg" },
      { "name": "EEAA Puntuación 9", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_8.jpg" },
      { "name": "EEAA Puntuación 10", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_9.jpg" },
      { "name": "EEAA Puntuación 11", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_10.jpg" },
      { "name": "EEAA Puntuación 12", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_11.jpg" },
      { "name": "EEAA Puntuación 13", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_12.jpg" },
      { "name": "EEAA Puntuación 14", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_13.jpg" },
      { "name": "EEAA Puntuación 15", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_14.jpg" },
      { "name": "EEAA Puntuación 16", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_15.jpg" },
      { "name": "EEAA Puntuación 17", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_16.jpg" },
      { "name": "EEAA Puntuación 18", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_17.jpg" },
      { "name": "EEAA Puntuación 19", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_18.jpg" },
      { "name": "EEAA Puntuación 20", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_19.jpg" },
      { "name": "EEAA Puntuación 21", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_20.jpg" },
      { "name": "EEAA Puntuación 22", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_21.jpg" },
      { "name": "EEAA Puntuación 23", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_22.jpg" },
      { "name": "EEAA Puntuación 24", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_23.jpg" },
      { "name": "EEAA Puntuación 25", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_24.jpg" },
      { "name": "EEAA Puntuación 26", "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_25.jpg" }
    ],
    "ORDEN DE MARCAS": [
      { "name": "Marcas Producto 1", "image": "images/orden_de_marcas/orden_de_marcas_0.jpg" },
      { "name": "Marcas Producto 2", "image": "images/orden_de_marcas/orden_de_marcas_1.jpg" },
      { "name": "Marcas Producto 3", "image": "images/orden_de_marcas/orden_de_marcas_2.jpg" },
      { "name": "Marcas Producto 4", "image": "images/orden_de_marcas/orden_de_marcas_3.jpg" },
      { "name": "Marcas Producto 5", "image": "images/orden_de_marcas/orden_de_marcas_4.jpg" },
      { "name": "Marcas Producto 6", "image": "images/orden_de_marcas/orden_de_marcas_5.jpg" },
      { "name": "Marcas Producto 7", "image": "images/orden_de_marcas/orden_de_marcas_6.jpg" },
      { "name": "Marcas Producto 8", "image": "images/orden_de_marcas/orden_de_marcas_7.jpg" },
      { "name": "Marcas Producto 9", "image": "images/orden_de_marcas/orden_de_marcas_8.jpg" },
      { "name": "Marcas Producto 10", "image": "images/orden_de_marcas/orden_de_marcas_9.jpg" },
      { "name": "Marcas Producto 11", "image": "images/orden_de_marcas/orden_de_marcas_10.jpg" },
      { "name": "Marcas Producto 12", "image": "images/orden_de_marcas/orden_de_marcas_11.jpg" },
      { "name": "Marcas Producto 13", "image": "images/orden_de_marcas/orden_de_marcas_12.jpg" },
      { "name": "Marcas Producto 14", "image": "images/orden_de_marcas/orden_de_marcas_13.jpg" },
      { "name": "Marcas Producto 15", "image": "images/orden_de_marcas/orden_de_marcas_14.jpg" },
      { "name": "Marcas Producto 16", "image": "images/orden_de_marcas/orden_de_marcas_15.jpg" },
      { "name": "Marcas Producto 17", "image": "images/orden_de_marcas/orden_de_marcas_16.jpg" },
      { "name": "Marcas Producto 18", "image": "images/orden_de_marcas/orden_de_marcas_17.jpg" },
      { "name": "Marcas Producto 19", "image": "images/orden_de_marcas/orden_de_marcas_18.jpg" }
    ],
    "FEM ALCAMPO": [
      { "name": "Alcampo Producto 1", "startDate": "2025-10-09", "endDate": "2025-10-22", "image": "images/fem_alcampo/fem_alcampo_0.jpg" },
      { "name": "Alcampo Producto 2", "image": "images/fem_alcampo/fem_alcampo_1.jpg" },
      { "name": "Alcampo Producto 3", "image": "images/fem_alcampo/fem_alcampo_2.jpg" },
      { "name": "Alcampo Producto 4", "image": "images/fem_alcampo/fem_alcampo_3.jpg" },
      { "name": "Alcampo Producto 5", "image": "images/fem_alcampo/fem_alcampo_4.jpg" },
      { "name": "Alcampo Producto 6", "image": "images/fem_alcampo/fem_alcampo_5.jpg" },
      { "name": "Alcampo Producto 7", "image": "images/fem_alcampo/fem_alcampo_6.jpg" },
      { "name": "Alcampo Producto 8", "image": "images/fem_alcampo/fem_alcampo_7.jpg" },
      { "name": "Alcampo Producto 9", "image": "images/fem_alcampo/fem_alcampo_8.jpg" },
      { "name": "Alcampo Producto 10", "image": "images/fem_alcampo/fem_alcampo_9.jpg" },
      { "name": "Alcampo Producto 11", "image": "images/fem_alcampo/fem_alcampo_10.jpg" },
      { "name": "Alcampo Producto 12", "image": "images/fem_alcampo/fem_alcampo_11.jpg" },
      { "name": "Alcampo Producto 13", "image": "images/fem_alcampo/fem_alcampo_12.jpg" },
      { "name": "Alcampo Producto 14", "image": "images/fem_alcampo/fem_alcampo_13.jpg" },
      { "name": "Alcampo Producto 15", "image": "images/fem_alcampo/fem_alcampo_14.jpg" },
      { "name": "Alcampo Producto 16", "image": "images/fem_alcampo/fem_alcampo_15.jpg" }
    ],
    "FEM CARREFOUR": [
      { "name": "Carrefour Producto 1", "startDate": "2025-10-14", "endDate": "2025-10-27", "image": "images/fem_carrefour/fem_carrefour_0.jpg" },
      { "name": "Carrefour Producto 2", "image": "images/fem_carrefour/fem_carrefour_1.jpg" },
      { "name": "Carrefour Producto 3", "image": "images/fem_carrefour/fem_carrefour_2.jpg" },
      { "name": "Carrefour Producto 4", "image": "images/fem_carrefour/fem_carrefour_3.jpg" },
      { "name": "Carrefour Producto 5", "image": "images/fem_carrefour/fem_carrefour_4.jpg" },
      { "name": "Carrefour Producto 6", "image": "images/fem_carrefour/fem_carrefour_5.jpg" },
      { "name": "Carrefour Producto 7", "image": "images/fem_carrefour/fem_carrefour_6.jpg" },
      { "name": "Carrefour Producto 8", "image": "images/fem_carrefour/fem_carrefour_7.jpg" },
      { "name": "Carrefour Producto 9", "image": "images/fem_carrefour/fem_carrefour_8.jpg" },
      { "name": "Carrefour Producto 10", "image": "images/fem_carrefour/fem_carrefour_9.jpg" }
    ],
    "FEM CARREFOUR MARKET": [
      { "name": "C. Market Producto 1", "startDate": "2025-10-14", "endDate": "2025-10-27", "image": "images/fem_carrefour_market/fem_carrefour_market_0.jpg" },
      { "name": "C. Market Producto 2", "image": "images/fem_carrefour_market/fem_carrefour_market_1.jpg" },
      { "name": "C. Market Producto 3", "image": "images/fem_carrefour_market/fem_carrefour_market_2.jpg" },
      { "name": "C. Market Producto 4", "image": "images/fem_carrefour_market/fem_carrefour_market_3.jpg" },
      { "name": "C. Market Producto 5", "image": "images/fem_carrefour_market/fem_carrefour_market_4.jpg" },
      { "name": "C. Market Producto 6", "image": "images/fem_carrefour_market/fem_carrefour_market_5.jpg" },
      { "name": "C. Market Producto 7", "image": "images/fem_carrefour_market/fem_carrefour_market_6.jpg" },
      { "name": "C. Market Producto 8", "image": "images/fem_carrefour_market/fem_carrefour_market_7.jpg" },
      { "name": "C. Market Producto 9", "image": "images/fem_carrefour_market/fem_carrefour_market_8.jpg" },
      { "name": "C. Market Producto 10", "image": "images/fem_carrefour_market/fem_carrefour_market_9.jpg" },
      { "name": "C. Market Producto 11", "image": "images/fem_carrefour_market/fem_carrefour_market_10.jpg" },
      { "name": "C. Market Producto 12", "image": "images/fem_carrefour_market/fem_carrefour_market_11.jpg" }
    ],
    "FEM SUPECO": [
      { "name": "Supeco Producto 1", "image": "images/fem_supeco/fem_supeco_0.jpg" },
      { "name": "Supeco Producto 2", "image": "images/fem_supeco/fem_supeco_1.jpg" },
      { "name": "Supeco Producto 3", "image": "images/fem_supeco/fem_supeco_2.jpg" },
      { "name": "Supeco Producto 4", "image": "images/fem_supeco/fem_supeco_3.jpg" },
      { "name": "Supeco Producto 5", "image": "images/fem_supeco/fem_supeco_4.jpg" },
      { "name": "Supeco Producto 6", "image": "images/fem_supeco/fem_supeco_5.jpg" },
      { "name": "Supeco Producto 7", "image": "images/fem_supeco/fem_supeco_6.jpg" }
    ],
    "FEM SORLI": [
      { "name": "Sorli Producto 1", "image": "images/fem_sorli/fem_sorli_0.jpg" },
      { "name": "Sorli Producto 2", "image": "images/fem_sorli/fem_sorli_1.jpg" },
      { "name": "Sorli Producto 3", "image": "images/fem_sorli/fem_sorli_2.jpg" }
    ],
    "FEM SCLAT BONPREU": [
      { "name": "SCLAT Bonpreu 1", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_0.jpg" },
      { "name": "SCLAT Bonpreu 2", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_1.jpg" },
      { "name": "SCLAT Bonpreu 3", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_2.jpg" },
      { "name": "SCLAT Bonpreu 4", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_3.jpg" },
      { "name": "SCLAT Bonpreu 5", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_4.jpg" },
      { "name": "SCLAT Bonpreu 6", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_5.jpg" },
      { "name": "SCLAT Bonpreu 7", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_6.jpg" },
      { "name": "SCLAT Bonpreu 8", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_7.jpg" },
      { "name": "SCLAT Bonpreu 9", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_8.jpg" },
      { "name": "SCLAT Bonpreu 10", "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_9.jpg" }
    ],
    "FEM CAPRABO": [
      { "name": "Caprabo Producto 1", "image": "images/fem_caprabo/fem_caprabo_0.jpg" },
      { "name": "Caprabo Producto 2", "image": "images/fem_caprabo/fem_caprabo_1.jpg" },
      { "name": "Caprabo Producto 3", "image": "images/fem_caprabo/fem_caprabo_2.jpg" },
      { "name": "Caprabo Producto 4", "image": "images/fem_caprabo/fem_caprabo_3.jpg" },
      { "name": "Caprabo Producto 5", "image": "images/fem_caprabo/fem_caprabo_4.jpg" },
      { "name": "Caprabo Producto 6", "image": "images/fem_caprabo/fem_caprabo_5.jpg" },
      { "name": "Caprabo Producto 7", "image": "images/fem_caprabo/fem_caprabo_6.jpg" },
      { "name": "Caprabo Producto 8", "image": "images/fem_caprabo/fem_caprabo_7.jpg" },
      { "name": "Caprabo Producto 9", "image": "images/fem_caprabo/fem_caprabo_8.jpg" },
      { "name": "Caprabo Producto 10", "image": "images/fem_caprabo/fem_caprabo_9.jpg" }
    ],
    "FEM CONSUM": [
      { "name": "Consum Producto 1", "image": "images/fem_consum/fem_consum_0.jpg" },
      { "name": "Consum Producto 2", "image": "images/fem_consum/fem_consum_1.jpg" },
      { "name": "Consum Producto 3", "image": "images/fem_consum/fem_consum_2.jpg" },
      { "name": "Consum Producto 4", "image": "images/fem_consum/fem_consum_3.jpg" },
      { "name": "Consum Producto 5", "image": "images/fem_consum/fem_consum_4.jpg" },
      { "name": "Consum Producto 6", "image": "images/fem_consum/fem_consum_5.jpg" }
    ],
    "FEM CONDIS": [
      { "name": "Condis Producto 1", "image": "images/fem_condis/fem_condis_0.jpg" }
    ],
    "FEM COVIRAN": [
      { "name": "Coviran Producto 1", "image": "images/fem_coviran/fem_coviran_0.jpg" },
      { "name": "Coviran Producto 2", "image": "images/fem_coviran/fem_coviran_1.jpg" },
      { "name": "Coviran Producto 3", "image": "images/fem_coviran/fem_coviran_2.jpg" },
      { "name": "Coviran Producto 4", "image": "images/fem_coviran/fem_coviran_3.jpg" },
      { "name": "Coviran Producto 5", "image": "images/fem_coviran/fem_coviran_4.jpg" },
      { "name": "Coviran Producto 6", "image": "images/fem_coviran/fem_coviran_5.jpg" }
    ]
  };

  function initializeApp() {
    updateProductList();
    createFilterDropdown();
    initFullscreenModal();
    setTimeout(loadPromotionDatesFromFirestore, 2000);
  }

  function updateProductList() {
    const productListElem = document.getElementById('product-list');
    if (!productListElem) return;

    productListElem.innerHTML = Object.entries(sections)
      .map(([sectionName, products]) =>
        `<div class="section" data-section="${sectionName}">${createSection(sectionName, products)}</div>`
      ).join('');

    if (window.updateProductImages) window.updateProductImages();
    if (window.lazyLoadImages) window.lazyLoadImages();
  }

  function createSection(sectionName, products) {
    const escapeHTML = (str) => String(str || '').replace(/"/g, '&quot;');
    let html = `<h2 class="section-title">${sectionName}</h2><div class="carousel-container">`;

    products.forEach((p, i) => {
      const imagePath = p.image;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      html += `<div class="product" data-section-name="${escapeHTML(sectionName)}">
        <img data-src="${imagePath}" alt="${escapeHTML(p.name)}" class="lazy" loading="lazy">`;

      // Solo mostrar etiqueta de fecha en el primer producto de cada sección
      if (p.endDate && i === 0) {
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
        const diffTime = fin - today;
        const diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (fin < today) {
          txtPrincipal = 'Oferta caducada';
          cls = 'offer-expired';
          if (ini) {
            const inicioStr = ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
            const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
            txtSecundario = `Desde ${inicioStr} hasta ${finStr}`;
          }
        } else if (ini && ini > today) {
          const diffIni = ini - today;
          const diasHastaInicio = Math.ceil(diffIni / (1000 * 60 * 60 * 24));
          txtPrincipal = `Empieza en ${diasHastaInicio} ${diasHastaInicio === 1 ? 'día' : 'días'}`;
          const inicioStr = ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
          const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
          txtSecundario = `Desde ${inicioStr} hasta ${finStr}`;
          cls = 'offer-upcoming';
        } else {
          // ACTIVA: Mostrar días restantes arriba
          txtPrincipal = diasRestantes === 1 ? 'Queda 1 día' : `Quedan ${diasRestantes} días`;
          
          // Mostrar rango de fechas abajo
          if (ini) {
            const inicioStr = ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
            const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
            txtSecundario = `Desde ${inicioStr} hasta ${finStr}`;
          } else {
            const finStr = fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'});
            txtSecundario = `Hasta ${finStr}`;
          }
          
          cls = 'offer-active';
        }
        
        html += `<div class="offer-tag ${cls}">
          <p class="offer-main">${txtPrincipal}</p>
          ${txtSecundario ? `<p class="offer-dates">${txtSecundario}</p>` : ''}
        </div>`;
      }

      html += `</div>`;
    });

    html += `</div>`;
    return html;
  }

  function createFilterDropdown() {
    const container = document.getElementById('filter-container');
    if (!container) return;
    const select = document.createElement('select');
    select.id = 'section-filter';
    select.innerHTML = '<option value="">Todas las secciones</option>';
    Object.keys(sections).forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      select.appendChild(opt);
    });
    select.addEventListener('change', filterSections);
    container.appendChild(select);
  }

  function filterSections() {
    const selected = document.getElementById('section-filter').value;
    document.querySelectorAll('.section').forEach(s => {
      s.style.display = (!selected || s.dataset.section === selected) ? 'block' : 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', initializeApp);
})();
