(function () {
  'use strict';

  let promotionDates = {};
  
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
    if (Object.keys(promotionDates).length === 0) {
      console.log('No hay fechas de promociones cargadas desde Firestore');
      return;
    }

    console.log('Aplicando fechas de promociones desde Firestore:', promotionDates);

    // Secciones que NO deben tener fechas
    const sectionsWithoutDates = ['ORDEN DE MARCAS', 'EEAA Y PUNTUACION'];

    Object.keys(sections).forEach(sectionKey => {
      // Saltar secciones que no deben tener fechas
      if (sectionsWithoutDates.includes(sectionKey)) {
        console.log(`Saltando ${sectionKey} - no debe tener fechas`);
        return;
      }

      const normalizedKey = sectionKey.toUpperCase().replace(/\s+/g, '_');
      
      if (promotionDates[normalizedKey]) {
        const promo = promotionDates[normalizedKey];
        console.log(`Aplicando fechas para ${sectionKey} (${normalizedKey}):`, promo);
        
        sections[sectionKey].forEach(product => {
          if (promo.active) {
            product.startDate = promo.startDate;
            product.endDate = promo.endDate;
            console.log(`Actualizado producto ${product.name}: ${promo.startDate} - ${promo.endDate}`);
          } else {
            delete product.startDate;
            delete product.endDate;
            console.log(`Promoción ${sectionKey} desactivada, eliminando fechas`);
          }
        });
      } else {
        console.log(`No se encontraron fechas para ${sectionKey} (${normalizedKey})`);
      }
    });
    
    // Forzar actualización de la lista de productos
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

  const sections = {
    "FOCOS": [
  { "name": "Focos Producto 1", "price": 0.00, "startDate": "2025-08-01", "endDate": "2025-08-31", "offer": false, "staticOffer": true, "image": "images/focos/focos_0.jpg" },
  { "name": "Focos Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_1.jpg" },
  { "name": "Focos Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_2.jpg" },
  { "name": "Focos Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_3.jpg" },
  { "name": "Focos Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_4.jpg" },
  { "name": "Focos Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_5.jpg" },
  { "name": "Focos Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_6.jpg" },
  { "name": "Focos Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_7.jpg" },
  { "name": "Focos Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_8.jpg" },
  { "name": "Focos Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_9.jpg" },
  { "name": "Focos Producto 11", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_10.jpg" },
  { "name": "Focos Producto 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_11.jpg" },
  { "name": "Focos Producto 13", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_12.jpg" },
  { "name": "Focos Producto 14", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_13.jpg" },
  { "name": "Focos Producto 15", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_14.jpg" },
  { "name": "Focos Producto 16", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_15.jpg" },
  { "name": "Focos Producto 17", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_16.jpg" },
  { "name": "Focos Producto 18", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_17.jpg" },
  { "name": "Focos Producto 19", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_18.jpg" },
  { "name": "Focos Producto 20", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_19.jpg" },
  { "name": "Focos Producto 21", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_20.jpg" },
  { "name": "Focos Producto 22", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_21.jpg" },
  { "name": "Focos Producto 23", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_22.jpg" },
  { "name": "Focos Producto 24", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_23.jpg" },
  { "name": "Focos Producto 25", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_24.jpg" },
  { "name": "Focos Producto 26", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_25.jpg" },
  { "name": "Focos Producto 27", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_26.jpg" },
  { "name": "Focos Producto 28", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_27.jpg" },
  { "name": "Focos Producto 29", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_28.jpg" },
  { "name": "Focos Producto 30", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_29.jpg" },
  { "name": "Focos Producto 31", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_30.jpg" },
  { "name": "Focos Producto 32", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_31.jpg" },
  { "name": "Focos Producto 33", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_32.jpg" },
  { "name": "Focos Producto 34", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_33.jpg" },
  { "name": "Focos Producto 35", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_34.jpg" },
  { "name": "Focos Producto 36", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_35.jpg" },
  { "name": "Focos Producto 37", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_36.jpg" },
  { "name": "Focos Producto 38", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_37.jpg" },
  { "name": "Focos Producto 39", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_38.jpg" },
  { "name": "Focos Producto 40", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_39.jpg" }
],
    "EEAA Y PUNTUACION": [
      { "name": "EEAA Puntuación 1", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_0.jpg" },
      { "name": "EEAA Puntuación 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_1.jpg" },
      { "name": "EEAA Puntuación 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_2.jpg" },
      { "name": "EEAA Puntuación 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_3.jpg" },
      { "name": "EEAA Puntuación 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_4.jpg" },
      { "name": "EEAA Puntuación 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_5.jpg" },
      { "name": "EEAA Puntuación 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_6.jpg" },
      { "name": "EEAA Puntuación 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_7.jpg" },
      { "name": "EEAA Puntuación 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_8.jpg" },
      { "name": "EEAA Puntuación 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_9.jpg" },
      { "name": "EEAA Puntuación 11", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_10.jpg" },
      { "name": "EEAA Puntuación 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_11.jpg" },
      { "name": "EEAA Puntuación 13", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_12.jpg" },
      { "name": "EEAA Puntuación 14", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_13.jpg" },
      { "name": "EEAA Puntuación 15", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_14.jpg" },
      { "name": "EEAA Puntuación 16", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_15.jpg" },
      { "name": "EEAA Puntuación 17", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_16.jpg" },
      { "name": "EEAA Puntuación 18", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_17.jpg" },
      { "name": "EEAA Puntuación 19", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_18.jpg" },
      { "name": "EEAA Puntuación 20", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_19.jpg" },
      { "name": "EEAA Puntuación 21", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_20.jpg" },
      { "name": "EEAA Puntuación 22", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_21.jpg" },
      { "name": "EEAA Puntuación 23", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_22.jpg" },
      { "name": "EEAA Puntuación 24", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_23.jpg" },
      { "name": "EEAA Puntuación 25", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_24.jpg" },
      { "name": "EEAA Puntuación 26", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/eeaa_y_puntuacion/eeaa_y_puntuacion_25.jpg" }
    ],
    "ORDEN DE MARCAS": [
      { "name": "Marcas Producto 1", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_0.jpg" },
      { "name": "Marcas Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_1.jpg" },
      { "name": "Marcas Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_2.jpg" },
      { "name": "Marcas Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_3.jpg" },
      { "name": "Marcas Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_4.jpg" },
      { "name": "Marcas Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_5.jpg" },
      { "name": "Marcas Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_6.jpg" },
      { "name": "Marcas Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_7.jpg" },
      { "name": "Marcas Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_8.jpg" },
      { "name": "Marcas Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_9.jpg" },
      { "name": "Marcas Producto 11", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_10.jpg" },
      { "name": "Marcas Producto 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_11.jpg" },
      { "name": "Marcas Producto 13", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_12.jpg" },
      { "name": "Marcas Producto 14", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_13.jpg" },
      { "name": "Marcas Producto 15", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_14.jpg" },
      { "name": "Marcas Producto 16", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_15.jpg" },
      { "name": "Marcas Producto 17", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_16.jpg" },
      { "name": "Marcas Producto 18", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_17.jpg" },
      { "name": "Marcas Producto 19", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/orden_de_marcas/orden_de_marcas_18.jpg" }
    ],
    "ACUERDO NACIONAL 2025": [
      { "name": "Acuerdo Producto 1", "price": 0.00, "startDate": "2025-08-01", "endDate": "2025-08-31", "offer": false, "staticOffer": true, "image": "images/acuerdo_nacional_2025/acuerdo_nacional_2025_0.jpg" },
      { "name": "Acuerdo Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/acuerdo_nacional_2025/acuerdo_nacional_2025_1.jpg" },
      { "name": "Acuerdo Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/acuerdo_nacional_2025/acuerdo_nacional_2025_2.jpg" },
      { "name": "Acuerdo Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/acuerdo_nacional_2025/acuerdo_nacional_2025_3.jpg" },
      { "name": "Acuerdo Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/acuerdo_nacional_2025/acuerdo_nacional_2025_4.jpg" },
      { "name": "Acuerdo Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/acuerdo_nacional_2025/acuerdo_nacional_2025_5.jpg" }
    ],
    "FEM ALCAMPO": [
      { "name": "Alcampo Producto 1", "price": 0.00, "startDate": "2025-08-14", "endDate": "2025-08-27", "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_0.jpg" },
      { "name": "Alcampo Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_1.jpg" },
      { "name": "Alcampo Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_2.jpg" },
      { "name": "Alcampo Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_3.jpg" },
      { "name": "Alcampo Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_4.jpg" },
      { "name": "Alcampo Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_5.jpg" },
      { "name": "Alcampo Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_6.jpg" },
      { "name": "Alcampo Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_7.jpg" },
      { "name": "Alcampo Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_8.jpg" },
      { "name": "Alcampo Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_9.jpg" },
      { "name": "Alcampo Producto 11", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_10.jpg" },
      { "name": "Alcampo Producto 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_11.jpg" },
      { "name": "Alcampo Producto 13", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_12.jpg" },
      { "name": "Alcampo Producto 14", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_13.jpg" },
      { "name": "Alcampo Producto 15", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_14.jpg" },
      { "name": "Alcampo Producto 16", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_15.jpg" }
    ],
    "FEM ALCAMPO SIGUIENTE": [
      { "name": "Alcampo Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-28", "endDate": "2025-09-10", "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_0.jpg" },
      { "name": "Alcampo Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_1.jpg" },
      { "name": "Alcampo Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_2.jpg" },
      { "name": "Alcampo Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_3.jpg" },
      { "name": "Alcampo Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_4.jpg" },
      { "name": "Alcampo Siguiente Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_5.jpg" },
      { "name": "Alcampo Siguiente Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_6.jpg" },
      { "name": "Alcampo Siguiente Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_7.jpg" },
      { "name": "Alcampo Siguiente Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_8.jpg" },
      { "name": "Alcampo Siguiente Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_9.jpg" },
      { "name": "Alcampo Siguiente Producto 11", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_10.jpg" },
      { "name": "Alcampo Siguiente Producto 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_11.jpg" },
      { "name": "Alcampo Siguiente Producto 13", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_12.jpg" },
      { "name": "Alcampo Siguiente Producto 14", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_13.jpg" },
      { "name": "Alcampo Siguiente Producto 15", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_14.jpg" },
      { "name": "Alcampo Siguiente Producto 16", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo_siguiente/fem_alcampo_siguiente_15.jpg" }
    ],
    "FEM CARREFOUR": [
      { "name": "Carrefour Producto 1", "price": 0.00, "startDate": "2025-08-26", "endDate": "2025-09-10", "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_0.jpg" },
      { "name": "Carrefour Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_1.jpg" },
      { "name": "Carrefour Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_2.jpg" },
      { "name": "Carrefour Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_3.jpg" },
      { "name": "Carrefour Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_4.jpg" },
      { "name": "Carrefour Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_5.jpg" },
      { "name": "Carrefour Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_6.jpg" },
      { "name": "Carrefour Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_7.jpg" },
      { "name": "Carrefour Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_8.jpg" },
      { "name": "Carrefour Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_9.jpg" }
    ],
    "FEM CARREFOUR SIGUIENTE": [
      { "name": "Carrefour Siguiente Producto 1", "price": 0.00, "startDate": "2025-09-11", "endDate": "2025-09-25", "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_0.jpg" },
      { "name": "Carrefour Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_1.jpg" },
      { "name": "Carrefour Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_2.jpg" },
      { "name": "Carrefour Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_3.jpg" },
      { "name": "Carrefour Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_4.jpg" },
      { "name": "Carrefour Siguiente Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_5.jpg" },
      { "name": "Carrefour Siguiente Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_6.jpg" },
      { "name": "Carrefour Siguiente Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_7.jpg" },
      { "name": "Carrefour Siguiente Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_8.jpg" },
      { "name": "Carrefour Siguiente Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_siguiente/fem_carrefour_siguiente_9.jpg" }
    ],
    "FEM CARREFOUR MARKET": [
      { "name": "C. Market Producto 1", "price": 0.00, "startDate": "2025-07-24", "endDate": "2025-08-07", "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_0.jpg" },
      { "name": "C. Market Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_1.jpg" },
      { "name": "C. Market Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_2.jpg" },
      { "name": "C. Market Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_3.jpg" },
      { "name": "C. Market Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_4.jpg" },
      { "name": "C. Market Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_5.jpg" },
      { "name": "C. Market Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_6.jpg" },
      { "name": "C. Market Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_7.jpg" },
      { "name": "C. Market Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_8.jpg" },
      { "name": "C. Market Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_9.jpg" },
      { "name": "C. Market Producto 11", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_10.jpg" },
      { "name": "C. Market Producto 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_11.jpg" }
    ],
    "FEM CARREFOUR MARKET SIGUIENTE": [
      { "name": "C. Market Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-08", "endDate": "2025-08-22", "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_0.jpg" },
      { "name": "C. Market Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_1.jpg" },
      { "name": "C. Market Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_2.jpg" },
      { "name": "C. Market Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_3.jpg" },
      { "name": "C. Market Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_4.jpg" },
      { "name": "C. Market Siguiente Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_5.jpg" },
      { "name": "C. Market Siguiente Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_6.jpg" },
      { "name": "C. Market Siguiente Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_7.jpg" },
      { "name": "C. Market Siguiente Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_8.jpg" },
      { "name": "C. Market Siguiente Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_9.jpg" },
      { "name": "C. Market Siguiente Producto 11", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_10.jpg" },
      { "name": "C. Market Siguiente Producto 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market_siguiente/fem_carrefour_market_siguiente_11.jpg" }
    ],
    "FEM SUPECO": [
      { "name": "Supeco Producto 1", "price": 0.00, "startDate": "2025-07-31", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_0.jpg" },
      { "name": "Supeco Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_1.jpg" },
      { "name": "Supeco Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_2.jpg" },
      { "name": "Supeco Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_3.jpg" },
      { "name": "Supeco Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_4.jpg" },
      { "name": "Supeco Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_5.jpg" },
      { "name": "Supeco Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_6.jpg" }
    ],
    "FEM SUPECO SIGUIENTE": [
      { "name": "Supeco Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-26", "endDate": "2025-09-10", "offer": false, "staticOffer": true, "image": "images/fem_supeco_siguiente/fem_supeco_siguiente_0.jpg" },
      { "name": "Supeco Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco_siguiente/fem_supeco_siguiente_1.jpg" },
      { "name": "Supeco Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco_siguiente/fem_supeco_siguiente_2.jpg" },
      { "name": "Supeco Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco_siguiente/fem_supeco_siguiente_3.jpg" },
      { "name": "Supeco Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco_siguiente/fem_supeco_siguiente_4.jpg" },
      { "name": "Supeco Siguiente Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco_siguiente/fem_supeco_siguiente_5.jpg" },
      { "name": "Supeco Siguiente Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco_siguiente/fem_supeco_siguiente_6.jpg" }
    ],
    "FEM SORLI": [
      { "name": "Sorli Producto 1", "price": 0.00, "startDate": "2025-07-30", "endDate": "2025-08-26", "offer": false, "staticOffer": true, "image": "images/fem_sorli/fem_sorli_0.jpg" },
      { "name": "Sorli Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sorli/fem_sorli_1.jpg" },
      { "name": "Sorli Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sorli/fem_sorli_2.jpg" }
    ],
    "FEM SORLI SIGUIENTE": [
      { "name": "Sorli Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-27", "endDate": "2025-09-12", "offer": false, "staticOffer": true, "image": "images/fem_sorli_siguiente/fem_sorli_siguiente_0.jpg" },
      { "name": "Sorli Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sorli_siguiente/fem_sorli_siguiente_1.jpg" },
      { "name": "Sorli Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sorli_siguiente/fem_sorli_siguiente_2.jpg" }
    ],
    "FEM SCLAT BONPREU": [
      { "name": "SCLAT Bonpreu 1", "price": 0.00, "startDate": "2025-06-10", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_0.jpg" },
      { "name": "SCLAT Bonpreu 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_1.jpg" },
      { "name": "SCLAT Bonpreu 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_2.jpg" },
      { "name": "SCLAT Bonpreu 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_3.jpg" },
      { "name": "SCLAT Bonpreu 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_4.jpg" },
      { "name": "SCLAT Bonpreu 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_5.jpg" },
      { "name": "SCLAT Bonpreu 7", "price": 0.00, "startDate": "2025-07-28", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_6.jpg" },
      { "name": "SCLAT Bonpreu 8", "price": 0.00, "startDate": "2025-07-29", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_7.jpg" },
      { "name": "SCLAT Bonpreu 9", "price": 0.00, "startDate": "2025-07-29", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_8.jpg" },
      { "name": "SCLAT Bonpreu 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_9.jpg" }
    ],
    "FEM SCLAT BONPREU SIGUIENTE": [
      { "name": "SCLAT Bonpreu Siguiente 1", "price": 0.00, "startDate": "2025-08-26", "endDate": "2025-09-15", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_0.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_1.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_2.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_3.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_4.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_5.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_6.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_7.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_8.jpg" },
      { "name": "SCLAT Bonpreu Siguiente 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu_siguiente/fem_sclat_bonpreu_siguiente_9.jpg" }
    ],
    "FEM CAPRABO": [
      { "name": "Caprabo Producto 1", "price": 0.00, "startDate": "2025-08-14", "endDate": "2025-08-27", "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_0.jpg" },
      { "name": "Caprabo Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_1.jpg" },
      { "name": "Caprabo Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_2.jpg" },
      { "name": "Caprabo Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_3.jpg" },
      { "name": "Caprabo Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_4.jpg" },
      { "name": "Caprabo Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_5.jpg" },
      { "name": "Caprabo Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_6.jpg" },
      { "name": "Caprabo Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_7.jpg" },
      { "name": "Caprabo Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_8.jpg" },
      { "name": "Caprabo Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo/fem_caprabo_9.jpg" }
    ],
    "FEM CAPRABO SIGUIENTE": [
      { "name": "Caprabo Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-28", "endDate": "2025-09-10", "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_0.jpg" },
      { "name": "Caprabo Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_1.jpg" },
      { "name": "Caprabo Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_2.jpg" },
      { "name": "Caprabo Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_3.jpg" },
      { "name": "Caprabo Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_4.jpg" },
      { "name": "Caprabo Siguiente Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_5.jpg" },
      { "name": "Caprabo Siguiente Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_6.jpg" },
      { "name": "Caprabo Siguiente Producto 8", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_7.jpg" },
      { "name": "Caprabo Siguiente Producto 9", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_8.jpg" },
      { "name": "Caprabo Siguiente Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_caprabo_siguiente/fem_caprabo_siguiente_9.jpg" }
    ],
    "FEM CONSUM": [
      { "name": "Consum Producto 1", "price": 0.00, "startDate": "2025-07-24", "endDate": "2025-08-27", "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_0.jpg" },
      { "name": "Consum Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_1.jpg" },
      { "name": "Consum Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_2.jpg" },
      { "name": "Consum Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_3.jpg" },
      { "name": "Consum Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_4.jpg" },
      { "name": "Consum Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_5.jpg" }
    ],
    "FEM CONSUM SIGUIENTE": [
      { "name": "Consum Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-28", "endDate": "2025-09-10", "offer": false, "staticOffer": true, "image": "images/fem_consum_siguiente/fem_consum_siguiente_0.jpg" },
      { "name": "Consum Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum_siguiente/fem_consum_siguiente_1.jpg" },
      { "name": "Consum Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum_siguiente/fem_consum_siguiente_2.jpg" },
      { "name": "Consum Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum_siguiente/fem_consum_siguiente_3.jpg" },
      { "name": "Consum Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum_siguiente/fem_consum_siguiente_4.jpg" },
      { "name": "Consum Siguiente Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum_siguiente/fem_consum_siguiente_5.jpg" }
    ],
    "FEM CONDIS": [
      { "name": "Condis Producto 1", "price": 0.00, "startDate": "2025-07-30", "endDate": "2025-08-19", "offer": false, "staticOffer": true, "image": "images/fem_condis/fem_condis_0.jpg" }
    ],
    "FEM CONDIS SIGUIENTE": [
      { "name": "Condis Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-20", "endDate": "2025-09-05", "offer": false, "staticOffer": true, "image": "images/fem_condis_siguiente/fem_condis_siguiente_0.jpg" },
      { "name": "Condis Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_condis_siguiente/fem_condis_siguiente_1.jpg" },
      { "name": "Condis Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_condis_siguiente/fem_condis_siguiente_2.jpg" },
      { "name": "Condis Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_condis_siguiente/fem_condis_siguiente_3.jpg" },
      { "name": "Condis Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_condis_siguiente/fem_condis_siguiente_4.jpg" }
    ],
    "FEM COVIRAN": [
      { "name": "Coviran Producto 1", "price": 0.00, "startDate": "2025-07-29", "endDate": "2025-08-09", "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_0.jpg" },
      { "name": "Coviran Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_1.jpg" },
      { "name": "Coviran Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_2.jpg" },
      { "name": "Coviran Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_3.jpg" },
      { "name": "Coviran Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_4.jpg" },
      { "name": "Coviran Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_5.jpg" }
    ],
    "FEM COVIRAN SIGUIENTE": [
      { "name": "Coviran Siguiente Producto 1", "price": 0.00, "startDate": "2025-08-10", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_coviran_siguiente/fem_coviran_siguiente_0.jpg" },
      { "name": "Coviran Siguiente Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran_siguiente/fem_coviran_siguiente_1.jpg" },
      { "name": "Coviran Siguiente Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran_siguiente/fem_coviran_siguiente_2.jpg" },
      { "name": "Coviran Siguiente Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran_siguiente/fem_coviran_siguiente_3.jpg" },
      { "name": "Coviran Siguiente Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran_siguiente/fem_coviran_siguiente_4.jpg" },
      { "name": "Coviran Siguiente Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran_siguiente/fem_coviran_siguiente_5.jpg" }
    ]
  };

  const PRODUCT_QUANTITIES = {
    "PROMOCIONES": [0],
    "EEFF COCA-COLA": [0],
    "EEFF MONSTER": [0],
    "CABECERA": [0]
  };

  function initFullscreenModal() {
    const productList = document.getElementById('product-list');
    const modal = document.getElementById('fullscreen-modal');
    const modalContent = modal.querySelector('.fullscreen-modal-content');
    const closeBtn = modal.querySelector('.close-fullscreen-modal');

    function openModal(card) {
      const src = card.querySelector('img')?.dataset.full;
      if (!src) return;
      modalContent.innerHTML = '';
      if (src.toLowerCase().endsWith('.pdf')) {
        const iframe = document.createElement('iframe');
        iframe.src = src;
        modalContent.appendChild(iframe);
      } else {
        const img = document.createElement('img');
        img.src = src;
        modalContent.appendChild(img);
      }
      modal.classList.remove('hidden');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.classList.add('hidden');
        modalContent.innerHTML = '';
        document.body.style.overflow = '';
      }, 400);
    }

    productList.addEventListener('click', e => {
      const card = e.target.closest('.product');
      if (card && card.querySelector('img[data-full]') && !e.target.closest('button,input,a')) {
        e.preventDefault();
        openModal(card);
      }
    });
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
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

    productListElem.innerHTML = Object.entries(sections)
      .map(([sectionName, products]) => {
        // Generar productos dinámicamente basándose en las imágenes disponibles
        const dynamicProducts = generateProductsFromImages(sectionName);
        return `<div class="section" data-section="${sectionName}">${createSection(sectionName, dynamicProducts)}</div>`;
      }).join('');

    if (window.updateProductImages) window.updateProductImages();
    if (window.lazyLoadImages) window.lazyLoadImages();
  }


  // Configuración de cuántas imágenes tiene cada sección
  const sectionImageCounts = {
    'FOCOS': 10,
    'EEAA Y PUNTUACION': 26,
    'ORDEN DE MARCAS': 19,
    'ACUERDO NACIONAL 2025': 6,
    'FEM ALCAMPO': 5,
    'FEM ALCAMPO SIGUIENTE': 5,
    'FEM CARREFOUR': 10,
    'FEM CARREFOUR SIGUIENTE': 10,
    'FEM CARREFOUR MARKET': 12,
    'FEM CARREFOUR MARKET SIGUIENTE': 12,
    'FEM SUPECO': 7,
    'FEM SUPECO SIGUIENTE': 7,
    'FEM SORLI': 3,
    'FEM SORLI SIGUIENTE': 3,
    'FEM SCLAT BONPREU': 15,
    'FEM SCLAT BONPREU SIGUIENTE': 15,
    'FEM CAPRABO': 8,
    'FEM CAPRABO SIGUIENTE': 8,
    'FEM CONSUM': 6,
    'FEM CONSUM SIGUIENTE': 6,
    'FEM CONDIS': 1,
    'FEM CONDIS SIGUIENTE': 5,
    'FEM COVIRAN': 4,
    'FEM COVIRAN SIGUIENTE': 4,
    'IMPLANTACIONES': 5
  };

  // Función para generar productos dinámicamente basándose en las imágenes disponibles
  function generateProductsFromImages(sectionName) {
    const products = [];
    const baseName = sectionName.toLowerCase().replace(/\s+/g, '_');
    const imageCount = sectionImageCounts[sectionName] || 5; // Default a 5 si no está configurado
    
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
        image: imagePath,
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

      html += `<div class="product" data-section-name="${escapeHTML(sectionName)}">
        <img data-src="${imagePath}" alt="${escapeHTML(p.name)}" class="lazy" loading="lazy">
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
    <p class="offer-main">${txtPrincipal}</p>
    ${txtSecundario ? `<p class="offer-dates">${txtSecundario}</p>` : ''}
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
  }

  function exportToExcel(order) {
    if (!order || !order.length) return;
    const store = localStorage.getItem('userStore') || 'Tienda';
    const user = localStorage.getItem('loggedInUser') || 'Usuario';
    const date = new Date().toLocaleDateString('es-ES');
    const file = `Pedido_${store.replace(/\s/g, '_')}_${date.replace(/\//g, '-')}.xlsx`;

    const grouped = order.reduce((a, i) => {
      (a[i.section] = a[i.section] || []).push(i);
      return a;
    }, {});

    const sheet = [
      [`Pedido para: ${store}`],
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
    Object.keys(sections).forEach(s => {
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
    document.querySelectorAll('.section').forEach(s => {
      const sectionName = s.dataset.section;
      
      if (!selected) {
        // Si no hay filtro seleccionado, mostrar todas las secciones
        s.style.display = 'block';
      } else {
        // Si hay filtro seleccionado, mostrar la sección principal y su versión SIGUIENTE
        const shouldShow = sectionName === selected || 
                          sectionName === selected + ' SIGUIENTE';
        s.style.display = shouldShow ? 'block' : 'none';
      }
    });
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

  document.addEventListener('DOMContentLoaded', initializeApp);
})();
