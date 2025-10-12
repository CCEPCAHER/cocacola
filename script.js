(function () {
  'use strict';

  /* =========================================================================
     CARGAR FECHAS DESDE FIRESTORE
     ========================================================================= */
  let promotionDates = {};
  
  // Función para cargar fechas desde Firestore (Arreglada la espera por Firebase)
  async function loadPromotionDatesFromFirestore() {
    try {
      // Esperar a que Firebase esté disponible
      let attempts = 0;
      let firebaseApp = null;
      
      while (attempts < 150) {
        // Se espera a la instancia global expuesta por el módulo de Firebase
        if (window.firebaseApp) {
          firebaseApp = window.firebaseApp;
          break;
        }
        
        // Mantengo la verificación 'window.auth' por si es una configuración antigua
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

      // Importar Firestore (Se mantiene la versión original)
      const { getFirestore, collection, getDocs } = await import(
        'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
      );
      
      // Obtener instancia de Firestore
      const db = getFirestore(firebaseApp);
      
      // Cargar promociones desde la colección "promotions"
      const querySnapshot = await getDocs(collection(db, 'promotions'));
      
      if (querySnapshot.empty) {
        console.log('No se encontraron documentos en la colección "promotions".');
        return;
      }
      
      // Guardar cada promoción
      querySnapshot.forEach((doc) => {
        promotionDates[doc.id] = doc.data();
      });
      
      // Aplicar fechas a las secciones y re-renderizar
      applyPromotionDatesToSections();
      
    } catch (error) {
      console.error('Error cargando fechas:', error);
    }
  }

  // Aplicar fechas dinámicas a las secciones
  function applyPromotionDatesToSections() {
    if (Object.keys(promotionDates).length === 0) {
      return;
    }

    // Iterar sobre todas las secciones
    Object.keys(sections).forEach(sectionKey => {
      // Normalización de la clave para coincidir con el ID de Firestore
      const normalizedKey = sectionKey.toUpperCase().replace(/\s+/g, '_');
      
      if (promotionDates[normalizedKey]) {
        const promo = promotionDates[normalizedKey];
        
        sections[sectionKey].forEach(product => {
          if (promo.active) {
            product.startDate = promo.startDate;
            product.endDate = promo.endDate;
          } else {
            // Eliminar fechas si la promoción está inactiva
            delete product.startDate;
            delete product.endDate;
          }
        });
      }
    });
    
    // Re-renderizar productos con nuevas fechas
    updateProductList();
  }

  /* -----------------------------------------------------------------------
     1. DATOS: SECCIONES Y PRODUCTOS
     - Rutas de imagen actualizadas para coincidir con la estructura de Firebase Storage.
  ----------------------------------------------------------------------- */
  const sections = {
        
    "FOCOS": [
      { 
        "name": "Focos Producto 1", 
        "price": 0.00,
        "startDate": "2025-08-01", 
        "endDate": "2025-08-31",   
        "offer": false,
        "staticOffer": true,
        "image": "images/focos/focos_0.jpg",
      },
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
      { "name": "Focos Producto 18", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/focos/focos_17.jpg" }
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
      { "name": "Alcampo Producto 16", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_alcampo/fem_alcampo_15.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } }
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
      { "name": "Carrefour Producto 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour/fem_carrefour_9.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } }
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
      { "name": "C. Market Producto 12", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_carrefour_market/fem_carrefour_market_11.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } }
    ],
    "FEM SUPECO": [
      { "name": "Supeco Producto 1", "price": 0.00, "startDate": "2025-07-31", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_0.jpg" },
      { "name": "Supeco Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_1.jpg" },
      { "name": "Supeco Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_2.jpg" },
      { "name": "Supeco Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_3.jpg" },
      { "name": "Supeco Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_4.jpg" },
      { "name": "Supeco Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_5.jpg" },
      { "name": "Supeco Producto 7", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_supeco/fem_supeco_6.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } }
    ],
    "FEM SORLI": [
      { "name": "Sorli Producto 1", "price": 0.00, "startDate": "2025-07-30", "endDate": "2025-08-26", "offer": false, "staticOffer": true, "image": "images/fem_sorli/fem_sorli_0.jpg" },
      { "name": "Sorli Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sorli/fem_sorli_1.jpg" },
      { "name": "Sorli Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sorli/fem_sorli_2.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } }
    ],
    "FEM SCLAT BONPREU": [
      { "name": "SCLAT Bonpreu 1", "price": 0.00, "startDate": "2025-06-10", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_0.jpg" },
      { "name": "SCLAT Bonpreu 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_1.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } },
      { "name": "SCLAT Bonpreu 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_2.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } },
      { "name": "SCLAT Bonpreu 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_3.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } },
      { "name": "SCLAT Bonpreu 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_4.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } },
      { "name": "SCLAT Bonpreu 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_5.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } },
      { "name": "SCLAT Bonpreu 7", "price": 0.00, "startDate": "2025-07-28", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_6.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } },
      { "name": "SCLAT Bonpreu 8", "price": 0.00, "startDate": "2025-07-29", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_7.jpg" },
      { "name": "SCLAT Bonpreu 9", "price": 0.00, "startDate": "2025-07-29", "endDate": "2025-08-25", "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_8.jpg" },
      { "name": "SCLAT Bonpreu 10", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_sclat_bonpreu/fem_sclat_bonpreu_9.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } }
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
    "FEM CONSUM": [
      { "name": "Consum Producto 1", "price": 0.00, "startDate": "2025-07-24", "endDate": "2025-08-27", "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_0.jpg" },
      { "name": "Consum Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_1.jpg" },
      { "name": "Consum Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_2.jpg" },
      { "name": "Consum Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_3.jpg" },
      { "name": "Consum Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_4.jpg" },
      { "name": "Consum Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_consum/fem_consum_5.jpg", "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false } }
    ],
    "FEM CONDIS": [
      { "name": "Condis Producto 1", "price": 0.00, "startDate": "2025-07-30", "endDate": "2025-08-19", "offer": false, "staticOffer": true, "image": "images/fem_condis/fem_condis_0.jpg" }
    ],
    "FEM COVIRAN": [
      { "name": "Coviran Producto 1", "price": 0.00, "startDate": "2025-07-29", "endDate": "2025-08-09", "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_0.jpg" },
      { "name": "Coviran Producto 2", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_1.jpg" },
      { "name": "Coviran Producto 3", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_2.jpg" },
      { "name": "Coviran Producto 4", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_3.jpg" },
      { "name": "Coviran Producto 5", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_4.jpg" },
      { "name": "Coviran Producto 6", "price": 0.00, "offer": false, "staticOffer": true, "image": "images/fem_coviran/fem_coviran_5.jpg" }
    ],
  };

  // Cantidades sugeridas para cada producto
  const PRODUCT_QUANTITIES = {
    "PROMOCIONES": [0],
    "EEFF COCA-COLA": [0],
    "EEFF MONSTER": [0],
    "CABECERA": [0]
  };
/* -----------------------------------------------------------------------
   FULLSCREEN MODAL PARA IMÁGENES Y PDF (Corregido para usar data-full)
------------------------------------------------------------------------ */
function initFullscreenModal() {
  const productList   = document.getElementById('product-list');
  const modal         = document.getElementById('fullscreen-modal');
  const modalContent  = modal.querySelector('.fullscreen-modal-content');
  const closeBtn      = modal.querySelector('.close-fullscreen-modal');

  /* abrir */
  function openModal(card) {
    // Busca la URL de alta resolución en data-full (llenado por el script de Firebase)
    const src = card.querySelector('img')?.dataset.full; 
    if (!src) return;

    modalContent.innerHTML = '';                         // limpia
    if (src.toLowerCase().endsWith('.pdf')) {
      const iframe = document.createElement('iframe');   // PDF
      iframe.src = src;
      modalContent.appendChild(iframe);
    } else {
      const img = document.createElement('img');         // JPG / PNG …
      img.src = src;
      modalContent.appendChild(img);
    }
    modal.classList.remove('hidden'); 
    modal.classList.add('active');     // activa transiciones CSS
    document.body.style.overflow = 'hidden';             // bloquea scroll fondo
  }

  /* cerrar */
  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.classList.add('hidden');
      modalContent.innerHTML = '';
      document.body.style.overflow = '';
    }, 400);                                             // mismo tiempo que la transición
  }

  /* ─── Delegación de eventos ─── */
  productList.addEventListener('click', e => {
    const card = e.target.closest('.product');
    // Solo dispara si hay una imagen con data-full (que es la URL de descarga)
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

/* -----------------------------------------------------------------------
     2. RENDERIZADO DE LA TIENDA
  ----------------------------------------------------------------------- */
  function initializeApp() {
    updateProductList();
    createFilterDropdown();
    addEventListeners();
    initFullscreenModal();
    // Inicia la carga de fechas con un retraso para asegurar que Firebase se ha cargado.
    setTimeout(loadPromotionDatesFromFirestore, 2000); 
  }

  function updateProductList() {
    const productListElem = document.getElementById('product-list');
    if (!productListElem) return;

    productListElem.innerHTML = Object.entries(sections)
      .map(([sectionName, products]) =>
        `<div class="section" data-section="${sectionName}">
           ${createSection(sectionName, products)}
         </div>`
      )
      .join('');

    // Llama a la función global para que el script de Firebase inicie la carga de URLs
    if (window.updateProductImages) {
      window.updateProductImages();
    }
    
    lazyLoadImages();
  }

  function createSection(sectionName, products) {
    const escapeHTML = (str) => String(str || '').replace(/"/g, '&quot;');
    let html = `<h2 class="section-title">${sectionName}</h2><div class="carousel-container">`;

    products.forEach((p, i) => {
      const btnId = `${sectionName.replace(/\s/g, '_')}-${i}`;
      // Usamos p.image (la ruta de Storage) como data-src inicial
      const imagePath = p.image; 
      
      // Fecha actual a medianoche
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      html += `
        <div class="product" data-section-name="${escapeHTML(sectionName)}">
          <img data-src="${imagePath}" alt="${escapeHTML(p.name)}" class="lazy">
          <h3>${p.name || 'Producto sin nombre'}</h3>
      `;

      /* Etiqueta de oferta (si procede) */
      if (p.endDate) {
        // Crear fechas correctamente desde formato YYYY-MM-DD
        const endParts = p.endDate.split('-');
        const fin = new Date(endParts[0], endParts[1] - 1, endParts[2]);
        fin.setHours(23, 59, 59, 999); // Fin del día
        
        let ini = null;
        if (p.startDate) {
          const startParts = p.startDate.split('-');
          ini = new Date(startParts[0], startParts[1] - 1, startParts[2]);
          ini.setHours(0, 0, 0, 0); // Inicio del día
        }
        
        let txt = '', cls = '';
        
        if (fin < today) {
          txt = 'Oferta caducada';
          cls = 'offer-expired';
        } else if (ini && ini > today) {
          txt = `Próxima: ${ini.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'})} - ${fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit'})}`;
          cls = 'offer-upcoming';
        } else {
          txt = `Activa hasta: ${fin.toLocaleDateString('es-ES', {day:'2-digit', month:'2-digit', year:'numeric'})}`;
          cls = 'offer-active';
        }
        
        html += `<p class="offer-tag ${cls}">${txt}</p>`;
      }

      /* Precio + controles */
      if (!p.staticOffer && typeof p.price === 'number') {
        const qs = PRODUCT_QUANTITIES[p.name] || [];
        html += `<p class="price">€${p.price.toFixed(2)}</p>
          <div class="quantity-buttons">
            ${qs.map(q => `<button onclick="setQuantity(this,${q})">${q}</button>`).join('')}
            <input type="number" placeholder="Otro" oninput="validateInput(this)">
          </div>
          <button id="${btnId}" class="add-btn"
                  data-product-name="${escapeHTML(p.name)}"
                  data-product-price="${p.price}"
                  onclick="addToCart(this)">Agregar</button>`;
      }

      html += `</div>`;   // .product
    });

    html += `</div>`;      // .carousel-container
    return html;
  }

  /* -----------------------------------------------------------------------
     3. CARRITO
  ----------------------------------------------------------------------- */
  function setQuantity(btn, v) {
    const input = btn.parentElement.querySelector('input');
    input.value = v;
  }
  
  function validateInput(input) {
    if (input.value < 0) input.value = 0;
  }

  function updateTotalDisplay(t) {
    const out = `Total: €${t.toFixed(2)}`;
    ['total-display', 'modal-total']
      .forEach(id => { const el=document.getElementById(id); if (el) el.innerText=out; });
  }

  function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('#cart-items-modal .cart-item')
      .forEach(it => total += parseFloat(it.dataset.price) || 0);
    updateTotalDisplay(total);
  }

  function addToCart(btn) {
    const name  = btn.dataset.productName;
    const price = parseFloat(btn.dataset.productPrice);
    const input = btn.parentElement.querySelector('input[type="number"]');

    if (!input || !input.value.trim()) { alert('Ingresa una cantidad'); return; }
    const qty = parseInt(input.value,10);
    if (!qty || qty<=0)         { alert('Cantidad no válida'); return; }
    if (btn.classList.contains('added')) { alert('Ya añadido'); return; }

    const section = btn.closest('[data-section-name]').dataset.sectionName || 'General';
    const cart    = document.getElementById('cart-items-modal');
    if (cart.innerText.trim()==='No hay productos añadidos.') cart.innerHTML='';

    const subtotal = price*qty;
    cart.insertAdjacentHTML('beforeend',`
      <div class="cart-item" data-price="${subtotal.toFixed(2)}"
           data-section="${section}" data-quantity="${qty}"
           data-product-name="${name}">
        <span class="cart-product-name">${name}</span> – ${qty} uds – €${subtotal.toFixed(2)}
        <button class="remove-btn" onclick="removeFromCart(this,'${btn.id}')">Eliminar</button>
      </div>`);

    btn.classList.add('added'); btn.style.background='#28a745'; btn.textContent='Añadido';
    updateTotalPrice(); showToast(`Producto añadido: ${name}`);
  }

  function removeFromCart(removeBtn, addBtnId) {
    removeBtn.parentElement.remove();
    const addBtn=document.getElementById(addBtnId);
    if (addBtn){
      addBtn.classList.remove('added');
      addBtn.style.background='#E41A1C';
      addBtn.textContent='Agregar';
      const input = addBtn.parentElement.querySelector('input[type="number"]');
      if (input) input.value='';
    }
    const cart=document.getElementById('cart-items-modal');
    if (!cart.children.length) cart.innerHTML='No hay productos añadidos.';
    updateTotalPrice();
  }

  /** Devuelve array de items {product,quantity,totalPrice,section} o null */
  function collectCartData() {
    const cartItems = document.querySelectorAll('#cart-items-modal .cart-item');
    if (!cartItems.length) return null;
    return Array.from(cartItems).map(it=>{
      const q = parseInt(it.dataset.quantity,10) || 0;
      return {
        product    : it.dataset.productName,
        quantity   : q,
        totalPrice : parseFloat(it.dataset.price) || 0,
        section    : it.dataset.section
      };
    });
  }

  /** Comprueba que no queden inputs con cantidad sin añadir */
  function checkPendingInputs() {
    for (const div of document.querySelectorAll('.product')) {
      const input = div.querySelector('input[type="number"]');
      const add   = div.querySelector('.add-btn');
      if (input && input.value && parseInt(input.value)>0 && add && !add.classList.contains('added')){
        alert(`Falta añadir ${div.querySelector('h3')?.innerText||'un producto'} al carrito.`);
        return true;
      }
    }
    return false;
  }

  /* -----------  FINALIZAR PEDIDO  --------------------------------------- */
  function submitOrder() {
    if (checkPendingInputs()) return;

    const items = collectCartData();
    if (!items) { alert('Carrito vacío'); return; }

    if (!confirm('¿Finalizar y descargar pedido?')) return;

    /* 1. Guardar en Firestore (definido en index.html módulo) */
    if (typeof window.sendOrderToFirestore === 'function') {
      window.sendOrderToFirestore(items);
    }

    /* 2. Descargar Excel */
    exportToExcel(items);

    /* 3. Reset visual */
    document.getElementById('cart-items-modal').innerHTML = 'No hay productos añadidos.';
    updateTotalDisplay(0);
    document.querySelectorAll('.add-btn').forEach(b=>{
      b.classList.remove('added'); b.style.background='#E41A1C'; b.textContent='Agregar';
    });
    document.querySelectorAll('.product input[type="number"]').forEach(i=>i.value='');
    toggleCart();
    alert('✅ Pedido enviado y descargado');
  }

  /* -----------  EXCEL (XLSX.js)  ---------------------------------------- */
  function exportToExcel(order) {
    if (!order || !order.length) return;

    const store = localStorage.getItem('userStore')   || 'Tienda';
    const user  = localStorage.getItem('loggedInUser')|| 'Usuario';
    const date  = new Date().toLocaleDateString('es-ES');
    const file  = `Pedido_${store.replace(/\s/g,'_')}_${date.replace(/\//g,'-')}.xlsx`;

    /* Agrupar por sección */
    const grouped = order.reduce((a,i)=>{
      (a[i.section]=a[i.section]||[]).push(i); return a;
    },{});

    const sheet = [
      [`Pedido para: ${store}`],
      [`Realizado por: ${user}`],
      [`Fecha: ${date}`],
      []
    ];

    let grandTotal=0;
    for (const sec in grouped){
      sheet.push([sec]);
      sheet.push(['Producto','Unidades','Precio Unit.','Subtotal']);
      let subtotal=0;
      grouped[sec].forEach(i=>{
        const unit = i.quantity ? i.totalPrice/i.quantity : 0;
        sheet.push([i.product,i.quantity,unit,i.totalPrice]);
        subtotal+=i.totalPrice;
      });
      sheet.push([`Subtotal ${sec}`,'','',subtotal],[]);
      grandTotal+=subtotal;
    }
    sheet.push([],['TOTAL','','',grandTotal]);

    const ws = XLSX.utils.aoa_to_sheet(sheet);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Pedido');
    XLSX.writeFile(wb,file);
  }

  /* -----------------------------------------------------------------------
     4. UTILIDADES DE UI
  ----------------------------------------------------------------------- */
  function toggleCart() {
    document.getElementById('cart-modal')?.classList.toggle('active');
  }
  
  function showToast(msg) {
    const t=document.createElement('div');
    t.className='toast'; t.innerText=msg;
    document.body.appendChild(t);
    setTimeout(()=>{t.classList.add('show');},100);
    setTimeout(()=>{t.classList.remove('show'); setTimeout(()=>t.remove(),500);},2500);
  }
  
  function lazyLoadImages() {
    const imgs=[...document.querySelectorAll('img.lazy')];
    if ('IntersectionObserver' in window) {
      const obs=new IntersectionObserver((entries,o)=>{
        entries.forEach(e=>{
          if (e.isIntersecting){
            // Usa data-full (URL de Firebase) o data-src si data-full aún no existe
            e.target.src = e.target.dataset.full || e.target.dataset.src;
            // Almacenamos la URL de alta resolución en data-full si aún no está.
            if (!e.target.dataset.full) e.target.dataset.full = e.target.dataset.src; 
            e.target.classList.remove('lazy'); 
            o.unobserve(e.target);
          }
        });
      });
      imgs.forEach(i=>obs.observe(i));
    } else {
      imgs.forEach(i=>{ 
        i.src = i.dataset.full || i.dataset.src; 
        if (!i.dataset.full) i.dataset.full = i.dataset.src;
        i.classList.remove('lazy'); 
      });
    }
  }

  /* -----------------------------------------------------------------------
     5. FILTRO POR SECCIÓN
  ----------------------------------------------------------------------- */
  function createFilterDropdown() {
    const wrap=document.getElementById('filter-container');
    if (!wrap) return;

    wrap.innerHTML='';
    const dd = document.createElement('div'); dd.className='dropdown';
    const btn= document.createElement('button'); btn.className='filter-dropdown-btn';
    btn.textContent='Filtrar por sección ▼';
    const list=document.createElement('div'); list.className='dropdown-content';

    btn.onclick=()=>list.classList.toggle('show');
    const addOpt=(txt,sec)=>{
      const a=document.createElement('a'); a.href='#'; a.textContent=txt;
      a.onclick=e=>{
        e.preventDefault();
        filterSections(sec); list.classList.remove('show');
        btn.textContent=`Filtrar: ${txt} ▼`;
      };
      list.appendChild(a);
    };
    addOpt('Todos','Todos');
    Object.keys(sections).forEach(s=>addOpt(s,s));

    dd.append(btn,list); wrap.appendChild(dd);
  }

  function filterSections(sel) {
    document.querySelectorAll('.section').forEach(el=>{
      el.style.display = (sel==='Todos'||el.dataset.section===sel) ? '' : 'none';
    });
  }

  /* -----------------------------------------------------------------------
     6. REGISTRO DE EVENTOS Y SERVICE WORKER
  ----------------------------------------------------------------------- */
  function addEventListeners() {
    document.getElementById('cart-toggle') ?.addEventListener('click',toggleCart);
    document.getElementById('submit-order')?.addEventListener('click',submitOrder);
    document.getElementById('close-modal') ?.addEventListener('click',toggleCart);
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(()=>console.log('Service Worker registrado'))
      .catch(err=>console.error('SW error',err));
  }

  /* -----------------------------------------------------------------------
     7. LANZAR APP
  ----------------------------------------------------------------------- */
  initializeApp();

  /* Hacer funciones globales para HTML inline */
  Object.assign(window,{
    setQuantity, validateInput, addToCart, removeFromCart, toggleCart,
    // Exportar para que el módulo de Firebase las use
    updateProductList
  });

})();  /* IIFE */
