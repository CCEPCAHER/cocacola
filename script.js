Es correcto (function () {
  'use strict';

  /* =========================================================================
     CARGAR FECHAS DESDE FIRESTORE
     ========================================================================= */
  let promotionDates = {};
  let firestoreReady = false;

  // Función para cargar fechas desde Firestore
  async function loadPromotionDatesFromFirestore() {
    try {
      // Esperar a que Firebase esté disponible
      let attempts = 0;
      let firebaseApp = null;
      
      while (attempts < 150) {
        if (window.auth) {
          firebaseApp = window.auth.app;
          break;
        }
        
        if (window.firebaseApp) {
          firebaseApp = window.firebaseApp;
          break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 50));
        attempts++;
      }

      if (!firebaseApp) {
        return;
      }

      // Importar Firestore
      const { getFirestore, collection, getDocs } = await import(
        'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js'
      );
      
      // Obtener instancia de Firestore
      const db = getFirestore(firebaseApp);
      
      // Cargar promociones desde la colección "promotions"
      const querySnapshot = await getDocs(collection(db, 'promotions'));
      
      if (querySnapshot.empty) {
        return;
      }
      
      // Guardar cada promoción
      querySnapshot.forEach((doc) => {
        promotionDates[doc.id] = doc.data();
      });
      
      firestoreReady = true;
      
      // Aplicar fechas a las secciones
      applyPromotionDatesToSections();
      
    } catch (error) {
      console.error('Error cargando fechas:', error);
    }
  }

  // Aplicar fechas dinámicas a las secciones
  function applyPromotionDatesToSections() {
    if (!firestoreReady || Object.keys(promotionDates).length === 0) {
      return;
    }

    // Iterar sobre todas las secciones
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
    
    // Re-renderizar productos con nuevas fechas
    updateProductList();
  }

  // Iniciar carga al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(loadPromotionDatesFromFirestore, 2000);
    });
  } else {
    setTimeout(loadPromotionDatesFromFirestore, 2000);
  }
  /* -----------------------------------------------------------------------
     1. DATOS: SECCIONES Y PRODUCTOS
     - Rellena los productos como necesites; estructura mínima incluida.
  ----------------------------------------------------------------------- */
  const sections = {        
    "FOCOS": [
      { 
        "name": "", 
        "price": 0.00,
        "startDate": "2025-08-01", 
        "endDate": "2025-08-31",   
        "offer": false,
        "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},

{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},

{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},

{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
}
    ],
"EEAA Y PUNTUACION": [
      { 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
}
    ],
"ORDEN DE MARCAS": [
      { 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
}
    ],
"FEM ALCAMPO": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-08-14",
      "endDate": "2025-08-27",
  "offer": false,
  "staticOffer": true,
},

{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
  { 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
  { 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
],

"FEM CARREFOUR": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-08-26",
      "endDate": "2025-09-10",
  "offer": false,
  "staticOffer": true,
},

{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
    ],
"FEM CARREFOUR MARKET": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-07-24",
      "endDate": "2025-08-07",
  "offer": false,
  "staticOffer": true,
},

{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
    ],
"FEM SUPECO": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-07-31",
      "endDate": "2025-08-25",
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
    ],
"FEM SORLI": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-07-30",
      "endDate": "2025-08-26",
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
    ],
"FEM SCLAT BONPREU": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-06-10",
      "endDate": "2025-08-25",
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
  { 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
  { 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
  { 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
  { 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
  { 
  "name": "",  
  "price": 0.00,
    "startDate": "2025-07-28",
      "endDate": "2025-08-25",
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
  { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-07-29",
      "endDate": "2025-08-25",
  "offer": false,
  "staticOffer": true,
},
  { 
  "name": "", 
  "price": 0.00, 
    "startDate": "2025-07-29",
      "endDate": "2025-08-25",
  "offer": false,
  "staticOffer": true,
},
   { 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
    ],

"FEM CAPRABO": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-08-14",
      "endDate": "2025-08-27",
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,

},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,

},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,

}
],
"FEM CONSUM": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-07-24",
      "endDate": "2025-08-27",
  "offer": false,
  "staticOffer": true,
},

{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
{ 
  "name": "",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
    ],
"FEM CONDIS": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-07-30",
      "endDate": "2025-08-19",
  "offer": false,
  "staticOffer": true,
}
    ],
    "FEM COVIRAN": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2025-07-29",
      "endDate": "2025-08-09",
  "offer": false,
  "staticOffer": true,
},
     
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
      
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
      
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
      
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
},
      
{ 
  "name": "", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
}
    ],
  "Coca Cola": [
    { 
      "name": "SEMI PACK 12 lata CC (90x2)=180", 
      "price": 961.20,
      "previousPrice": 1000.00,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false
      }
    },
    { 
      "name": "SEMI Coca Cola Reg lata 33 cl. (960x2)=1920", 
      "price": 720.00, 
      "previousPrice": 750.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "PACK X 6 Coca-Cola Regular 2 L.", 
      "price": 12.00, 
      "previousPrice": 14.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "SEMI PACK 4 Coca-Cola 2 L.", 
      "price": 384.48, 
      "previousPrice": 420.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "PACK X 4 Coca-Cola Regular 2 L.", 
      "price": 10.68, 
      "previousPrice": 12.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "SEMI BIPACK Coca Cola 2x2L", 
      "price": 4.00, 
      "previousPrice": 4.50,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "BIPACK Coca-Cola Regular 2 L.", 
      "price": 4.74, 
      "previousPrice": 5.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "SEMI Coca Cola pet 2 L.", 
      "price": 370.50, 
      "previousPrice": 400.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "Coca-Cola Pet 2 L.", 
      "price": 2.47, 
      "previousPrice": 2.70,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "sorli": false
      }
    },
    { 
      "name": "COCA-COLA PET1,25L P2 C3", 
       "price": 3.00,
      "previousPrice": 3.99,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "SEMI Coca Cola pet 1,25 L.", 
       "price": 1.50,
      "previousPrice": 1.25,
      "offer":false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "Coca Cola 1,25L", 
       "price": 3.00,
      "previousPrice": 3.99,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "Coca Cola P4 Pet500", 
      "price": 2.00, 
      "previousPrice": 2.20,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {}
    },
    { 
      "name": "Coca Cola pet500", 
      "price": 0.50, 
      "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "VNR 1L Coca-Cola C6 ",
      "price": 1.00, 
      "previousPrice": 1.10,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {}
    },
    { 
      "name": "VNR Coca-Cola 20 cl P4 C6", 
      "price": 4.00, 
      "previousPrice": 4.50,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {}
    },
    { 
      "name": "Coca-Cola Lata 33", 
      "price": 1.00, 
      "previousPrice": 1.10,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {}
    },
    { 
      "name": "Bandeja Coca-Cola 33 cl. Pack 24", 
      "price": 24.00, 
      "previousPrice": 25.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {}
    },
    { 
      "name": "PACK 12 Coca-Cola  Lata 33", 
      "price": 12.00, 
      "previousPrice": 13.00,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {}
    },
    { 
      "name": "COCA-COLA  REGULAR LATA PACK 6X20 CL.", 
      "price": 6.00, 
      "previousPrice": 6.50,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {}
    }
  ],
  "Coca Cola Zero": [
    { 
      "name": "SEMI PACK 12 CC Zero (90x2)=180", 
      "price": 12.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "SEMI Coca Cola Zero lata 33 cl. (960x2)=1920", 
      "price": 912.00, 
      "offer": false,

      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "PACK X 6 Coca-Cola Zero 2L", 
      "price": 6.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "SEMI PACK 4 Coca Zero 2 L.", 
      "price": 8.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "PACK X 4 Coca-Cola Zero 2 L.", 
      "price": 4.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "SEMI BIPACK Coca Cola Zero Pet 2x2 L.", 
      "price": 4.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "BIPACK Coca-Cola Zero 2 L.", 
      "price": 2.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "SEMI Coca Cola Zero Pet 2 L.", 
      "price": 2.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "Coca Cola Zero Pet 2 L.", 
      "price": 2.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "COCA-COLA ZERO PET1,25L P2 C3", 
       "price": 3.00,
      "previousPrice": 3.99,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "Coca Cola Zero 1,25L", 
       "price": 3.00,
      "previousPrice": 3.99,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "Coca Cola Zero P4 Pet500", 
      "price": 2.00, 
      "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "Coca Cola Zero pet500", 
      "price": 0.50, 
      "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
    { 
      "name": "VNR 1L Coca-Cola ZER C6", 
      "price": 1.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "VNR Coca-Cola Zero 20 cl P4 C6", 
      "price": 4.00, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "Coca-Cola Zero lata 33 cl.", 
      "price": 0.95, 
      "offer": false,
      "focus1": true,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "Bandeja Coca-Cola Zero 33 cl. Pack 24", 
      "price": 19.90, 
      "offer": false,
      "focus1": true,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "PACK 12 Coca-Cola Zero Lata 33", 
      "price": 10.26, 
      "offer": false,
      "focus1": true,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    },
    { 
      "name": "COCA-COLA ZERO LATA PACK 6X20 CL.", 
      "price": 3.50, 
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false 
      }
    }
  ],
    "coca cola light": [
      { 
        "name": "Coca-Cola Light pack 4 2L", 
        "price": 4.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Coca-Cola Light 2 L.", 
        "price": 2.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Light Pet 2 L.", 
        "price": 2.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Light 1,25L", 
         "price": 3.00,
      "previousPrice": 3.99,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Coca-Cola Light Pet500", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Coca-Cola Light Lata 33", 
        "price": 1.00, 
        "previousPrice": 3.99,
      "offer": false,
      "focus1": true,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Bandeja Coca-Cola Light 33 cl Pack 24", 
        "price": 24.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI Coca-Cola Light Lata 33 P9 SD120", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "PACK 9 Coca-Cola Light Lata 33", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Coca Cola Zero Zero": [
      { 
        "name": "SEMI PACK 12 CC Zero Zero (90x2)=180", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Zero Zero pack 6 2L", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI PACK 4 Coca Zero Zero Regular 2 L.", 
        "price": 8.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "PACK X 4 Coca-Cola Zero Zero 2L.", 
        "price": 4.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI BIPACK CC Zero Zero Pet 2x2L", 
        "price": 4.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Coca-Cola Zero-Zero", 
        "price": 2.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca Cola Zero Zero Pet 2 L", 
        "price": 2.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Zero Zero Bipack 1,25L", 
         "price": 3.00,
      "previousPrice": 3.99,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Coca-Cola Zero Zero 1,25L", 
         "price": 3.00,
      "previousPrice": 3.99,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Coca-Cola Zero Zero Pet500", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Coca Cola Zero Zero Lata 33cl", 
        "price": 1.00, 
        "previousPrice": 3.99,
      "offer": false,
      "focus1": true,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Bandeja Coca-Cola Zero Zero 33 cl Pack 24", 
        "price": 24.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "PACK 12 Coca-Cola Zero Zero Lata 33", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "COCA-COLA ZERO ZERO LATA PACK 6X20 CL.", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Coca Cola Sabores": [
      { 
        "name": "Coca-Cola Sin Cafeína Pet 2 L.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Sin Cafeína Lata 33", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Light sin cafeína Pet 2 L.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Light Sin cafeína Lata 33", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Zero Limón Lata 33", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Coca-Cola Zero Lima Lata 33 CCO8 C24", 
        "price": 24.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Cherry Coke Zero Lata 33cl", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Fanta naranja": [
      { 
        "name": "SEMI BIPACK Fanta Naranja 2X2L", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Fanta Naranja Pet 2 L.", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI Fanta Pet.2 L Naranja (150x2)=300", 
        "price": 1.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Naranja Pet 2 L.", 
        "price": 1.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Naranja Pet 1,25L", 
        "price": 1.25, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Naranja Pet 500", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "SEMI  PACK 9 lata Fanta Naranja (120x2)=240", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": true }
      },
      { 
        "name": "Pack x 9 Fanta Naranja Lata 33 cl.", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI  Fanta Naranja lata (960x2)=1920", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Naranja Lata 33 cl.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "MINI LATA Fanta Naranja pack 6X20 CL", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Fanta Zero Nar 2 L.", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Zero Nar 2 L.", 
        "price": 1.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Pack x 6 Fanta Zero Naranja Lata 33", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Zero Naranja Lata 33", 
        "price": 1.00, 
        "offer": false,
        "focus1": true,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Fanta limón": [
      { 
        "name": "SEMI BIPACK Fanta Limón 2X2L", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Fanta limón Pet 2 L.", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI Fanta Pet.2 L Limón (150x2)=300", 
        "price": 1.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta limón Pet 2 L.", 
        "price": 1.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta limón Pet 1,25L", 
        "price": 1.25, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta limón Pet 500", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "SEMI  PACK 9 lata Fanta Limón (120x2)=240", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Pack x 9 Fanta limón Lata 33 cl.", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI  Fanta Limón lata (960x2)=1920", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta limón Lata 33 cl.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Zero lim 2 L.", 
        "price": 1.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Zero limón Lata 33", 
        "price": 1.00, 
        "offer": false,
        "focus1": true,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Fanta sabores": [
      { 
        "name": "Fanta Sandía sin azúcar Pet 1.25L C6", 
        "price": 1.25, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Frambuesa sin azúcar Pet 1.25L C6", 
        "price": 1.25, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fanta Sandía LATA 33", 
        "price": 1.00, 
        "previousPrice": 1.00,
      "offer": false,
      "focus1": true,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Fanta Frambuesa LATA 33", 
        "price": 1.00, 
        "offer": false,
        "focus1": true,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Sprite": [
      { 
        "name": "Sprite Lata Pack 6X20 CL.", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Sprite Pet 2 L.", 
        "price": 2.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Sprite Pet 2 L.", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Sprite Zero Pet 2 L", 
        "price": 2.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Sprite lata 33", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Sprite Zero lata 33", 
        "price": 1.00, 
        "previousPrice": 1.00,
      "offer": false,
      "focus1": true,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Sprite lata 33 P9", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Sprite Pet 500", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      }
    ],
    "Tónica": [
      { 
        "name": "Nordic Mist lata 250", 
        "price": 0.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Nordic Blue Lata 25 cl.", 
        "price": 0.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Royal Bliss Bitter Roso Cesta VNR20 P4 C6", 
        "price": 4.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Nordic Zero Lata 25 cl.", 
        "price": 0.75, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Nordic Mist Tónica 1L", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Limca PET1L C12", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Royal Bliss Berry Lata 25 C12", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Royal Bliss Signature WTR Lata 25 C12", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Royal Bliss Signature tónica Zero Lata 25 C12", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Royal Bliss Lemon Mixer Lata 25 C12", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Royal Bliss Berry CESTA VNR20 P4 C6", 
        "price": 4.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Royal Bliss Yuzu CESTA VNR20 P4 C6", 
        "price": 4.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Burn": [
      { 
        "name": "Burn Regular 0,5L", 
        "price": 0.50, 
        "offer": false,
        "focus3": true,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Burn Zero Peach Lata 50 C12", 
        "price": 12.00, 
        "offer": false,
        "focus3": true,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Burn Zero Raspberry LATA50 C12", 
        "price": 12.00, 
        "offer": false,
        "focus3": true,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Pack x 4 Burn Lata 50 C6", 
        "price": 6.00, 
        "offer": false,
        "focus3": true,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Energéticas": [
    {
      "name": "Monster Green Lata 50 cl.",
      "price": 1.50,
      "offer": false,
      "focus1": false,
      "focus2": false,
      "focus3": true,
      "focus4": false,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false
      },
      "offerLogos": {
        "alcampo": false,
        "condis": false,
        "carrefour": false,
        "caprabo": false,
        "consum": false,
        "sorli": false
      }
    },
    {
      "name": "Monster Green Zero Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Pack x 4 Monster Green x 500 ml",
      "price": 6.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster LO - CARB 50 cl.",
      "price": 1.50,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Rehab Lata 50 cl.",
      "price": 1.50,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "MONSTER JUICED RIO PUNCH LATA50 C24",
      "price": 1.50,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra Paradise Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra Red Lata 50 T24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra White Lata 50 T24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Pack x 4 Monster Ultra White Zero Lata 50",
      "price": 6.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra Fiesta Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra Rosá Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra Peachy Keen 50cl",
      "price": 1.50,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Bad Apple 50cl",
      "price": 1.50,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Punch 50cl.",
      "price": 1.50,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Mango Loco Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Pack x 4 Monster Mango Loco Lata 50 C6",
      "price": 6.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Monarch Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Nitro Super Dry Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Khaotic Juice Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra Watermelon Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Lewis Hamilton Zero Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Ultra Gold Zero Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Aussie Style Lemonade Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Reserve Watermelon Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "Monster Reserve White Pineapple Lata 50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    },
    {
      "name": "MONSTER ULTRA STRAWBERRY DREAMS LA50 C24",
      "price": 24.00,
      "offer": false,
      "focus3": true,
      "discountOptions": {
        "twoXone": false,
        "threeXtwo": false,
        "secondUnit70": false,
        "twentyPercent": false
      }
    }
  ],
    "M.Maid": [
      { 
        "name": "Limón&Nada Clásica 1 L.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "FUZE": [
      { 
        "name": "Fuze Limón Lata 33", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fuze Limón sin azúcar Lata 33", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Fuze Limón Pet 50", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Fuze Limón Pet 1,5L", 
        "price": 1.50,
      "previousPrice": 1.25,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Fuze Limón sin azúcar Pet 1,5L", 
        "price": 1.50,
      "previousPrice": 1.25,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Fuze Tea Peach Hibiscus PET1.5L", 
        "price": 1.50,
      "previousPrice": 1.25,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "FUZE MP PET 1,5L C6", 
        "price": 1.50,
      "previousPrice": 1.25,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "FUZE GTM PET50 C24", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      }
    ],
    "Deportivas": [
      { 
        "name": "Powerade Ice Storm Pet 50", 
      "price": 1.00,
      "previousPrice": 1.20,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Powerade Zero Ice Storm PET50 C12",  
      "price": 1.00,
      "previousPrice": 1.20,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Powerade Citrus Charge Pet 50",        
      "price": 1.00,
      "previousPrice": 1.20,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Powerade Blood Orange Charge Pet 50",        
      "price": 1.00,
      "previousPrice": 1.20,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "POWERADE ICE STORM PET 1L",        
      "price": 1.00,
      "previousPrice": 1.20,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
   
      { 
        "name": "POWERADE GOLDEN MANGO PET 1L",         
      "price": 1.00,
      "previousPrice": 1.20,
      "offer": false,
      "focus1": false,  
      "focus2": false,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
    },
      { 
        "name": "Reign Melon manía Lata 50 C12", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Reign Razzle Berry Lata 50 C12", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Isotónicas": [
      { 
        "name": "SEMI  Aquarius limón lata (960x2)=1920", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius limón Lata 33 cl.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Naranja Lata 33 cl.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Sin Azúcar Limón Lata 33 cl.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Sin Azúcar Naranja Lata 33 cl.", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Pack x 9 Aquarius Limón Lata 33 cl.", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Pack x 9 Aquarius Naranja Lata 33 cl.", 
        "price": 9.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius limón Pet 500", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "Aquarius Naranja Pet 500", 
        "price": 0.50, 
        "offer": false,
      "focus1": false,  
      "focus2": true,
      "focus3": false,
      "focus4": false,
      "discountOptions": { 
        "twoXone": false, 
        "threeXtwo": false, 
        "secondUnit70": false, 
        "twentyPercent": false,
        "fiftyPercent": false,
        "gift": false,
        "travel": false,
        "draw": false,
        "promoWeb": false 
      },
      "offerLogos": {
         "alcampo": false,
         "condis": false,
         "carrefour": false,
         "caprabo": false,
         "consum": false,
         "sorli": false

      }
      },
      { 
        "name": "SEMI  Aquarius Limón Pet 1´5 l. (195x2)= 390", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius limón Pet 1,5 L.", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Naranjar Pet 1,5 L.", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Limón Sin Azúcar Pet 1,5 L.", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Naranja Sin Azúcar Pet 1,5 L.", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Melocotón Rojo Pet 1.5L C6", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Pack x 4 Aquarius Limón Pet 1,5 L.", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Pack x 4 Aquarius Naranja Pet 1,5 L.", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Aquarius Limón Pet 1,5 L.", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "BIPACK Aquarius Naranja Pet 1,5 L.", 
        "price": 3.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquarius Melocotón Rojo Lata 33", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "SEMI Aquarius Naranja Pet 1´5 l. (195x2)= 390", 
        "price": 1.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Appletiser": [
      { 
        "name": "Appletiser VNR275 P6 C4", 
        "price": 4.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Appletiser LATA25 C12", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Aquabona": [
      { 
        "name": "Aquabona Pet 0,5 L", 
        "price": 0.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Aquabona 1.5L", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Semi Aquabona 1,5 L (240x2)=480", 
        "price": 1.50, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Abuabona Singular PET50 C12", 
        "price": 12.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
    "Alcoholes": [
      { 
        "name": "Jack & Coke Lata 33 C12", 
        "price": 3.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Jack & Coke Zero Sin Cafeína Lata 33 C12", 
        "price": 3.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
      { 
        "name": "Absolut Sprite Lata 25 C12", 
        "price": 3.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      }
    ],
 "IMPLANTACIONES": [
      { 
  "name": "EEFF COCA-COLA", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
{ 
  "name": "EEFF MONSTER", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
{ 
  "name": "PROMOCIONES", 
  "price": 0.00, 
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
},
{ 
  "name": "CABECERA",  
  "price": 0.00,
  "offer": false,
  "staticOffer": true,
  "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
}
    ],
};

  // Cantidades sugeridas para cada producto
  const PRODUCT_QUANTITIES = {
    "SEMI PACK 12 lata CC (90x2)=180": [2, 4],
    "SEMI Coca Cola Reg lata 33 cl. (960x2)=1920": [2, 4],
    "PACK X 6 Coca-Cola Regular 2 L.": [16, 32],
    "SEMI PACK 4 Coca-Cola 2 L.": [2, 4],
    "PACK X 4 Coca-Cola Regular 2 L.": [9, 18],
    "SEMI BIPACK Coca Cola 2x2L": [2, 4],
    "BIPACK Coca-Cola Regular 2 L.": [16, 32],
    "SEMI Coca Cola pet 2 L.": [2, 4],
    "Coca-Cola Pet 2 L.": [16, 32],
    "COCA-COLA PET1,25L P2 C3": [19, 38],
    "SEMI Coca Cola pet 1,25 L.": [2, 4],
    "Coca Cola 1,25L": [19, 38],
    "Coca Cola P4 Pet500": [54, 108],
    "Coca Cola pet500": [9, 18],
    "VNR 1L Coca-Cola C6 ": [17, 34],
    "VNR Coca-Cola 20 cl P4 C6": [12, 24],
    "Coca-Cola Lata 33": [9, 18],
    "Bandeja Coca-Cola 33 cl. Pack 24": [108, 216],
    "PACK 12 Coca-Cola  Lata 33": [18, 36],
    "COCA-COLA  REGULAR LATA PACK 6X20 CL.": [54, 108],
    "SEMI PACK 12 CC Zero (90x2)=180": [2, 4],
    "SEMI Coca Cola Zero lata 33 cl. (960x2)=1920": [2, 4],
    "PACK X 6 Coca-Cola Zero 2L": [16, 32],
    "SEMI PACK 4 Coca Zero 2 L.": [2, 4],
    "PACK X 4 Coca-Cola Zero 2 L.": [24, 48],
    "SEMI BIPACK Coca Cola Zero Pet 2x2 L.": [2, 4],
    "BIPACK Coca-Cola Zero 2 L.": [16, 32],
    "SEMI Coca Cola Zero Pet 2 L.": [2, 4],
    "Coca Cola Zero Pet 2 L.": [16, 32],
    "COCA-COLA ZERO PET1,25L P2 C3": [19, 38],
    "Coca Cola Zero 1,25L": [19, 38],
    "Coca Cola Zero P4 Pet500": [54, 108],
    "Coca Cola Zero pet500": [9, 18],
    "VNR 1L Coca-Cola ZER C6": [17, 34],
    "VNR Coca-Cola Zero 20 cl P4 C6": [12, 24],
    "Coca-Cola Zero lata 33 cl.": [9, 18],
    "Bandeja Coca-Cola Zero 33 cl. Pack 24": [108, 216],
    "PACK 12 Coca-Cola Zero Lata 33": [18, 36],
    "COCA-COLA ZERO LATA PACK 6X20 CL.": [54, 108],
    "Coca-Cola Light pack 4 2L": [24, 48],
    "BIPACK Coca-Cola Light 2 L.": [16, 32],
    "Coca-Cola Light Pet 2 L.": [9, 18],
    "Coca-Cola Light 1,25L": [19, 38],
    "Coca-Cola Light Pet500": [9, 18],
    "Coca-Cola Light Lata 33": [9, 18],
    "Bandeja Coca-Cola Light 33 cl Pack 24": [18, 108],
    "SEMI Coca-Cola Light Lata 33 P9 SD120": [2, 4],
    "PACK 9 Coca-Cola Light Lata 33": [24, 48],
    "SEMI PACK 12 CC Zero Zero (90x2)=180": [2, 4],
    "Coca-Cola Zero Zero pack 6 2L": [16, 32],
    "SEMI PACK 4 Coca Zero Zero Regular 2 L.": [2, 4],
    "PACK X 4 Coca-Cola Zero Zero 2L.": [24, 48],
    "SEMI BIPACK CC Zero Zero Pet 2x2L": [2, 4],
    "BIPACK Coca-Cola Zero-Zero": [16, 32],
    "Coca Cola Zero Zero Pet 2 L": [16, 32],
    "Coca-Cola Zero Zero Bipack 1,25L": [19, 38],
    "Coca-Cola Zero Zero 1,25L": [19, 38],
    "Coca-Cola Zero Zero Pet500": [9, 18],
    "Coca Cola Zero Zero Lata 33cl": [9, 18],
    "Bandeja Coca-Cola Zero Zero 33 cl Pack 24": [108, 216],
    "PACK 12 Coca-Cola Zero Zero Lata 33": [18, 36],
    "COCA-COLA ZERO ZERO LATA PACK 6X20 CL.": [54, 108],
    "Coca-Cola Zero Limón Lata 33": [9, 18],
    "Coca-Cola Zero Lima Lata 33 CCO8 C24": [9, 18],
    "SEMI BIPACK Fanta Naranja 2X2L": [2, 4],
    "BIPACK Fanta Naranja Pet 2 L.": [16, 32],
    "SEMI Fanta Pet.2 L Naranja (150x2)=300": [2, 4],
    "Fanta Naranja Pet 2 L.": [16, 32],
    "Fanta Naranja Pet 1,25L": [19, 38],
    "Fanta Naranja Pet 500": [9, 18],
    "SEMI  PACK 9 lata Fanta Naranja (120x2)=240": [2, 4],
    "Pack x 9 Fanta Naranja Lata 33 cl.": [24, 48],
    "SEMI  Fanta Naranja lata (960x2)=1920": [2, 4],
    "Fanta Naranja Lata 33 cl.": [9, 18],
    "MINI LATA Fanta Naranja pack 6X20 CL": [54, 108],
    "BIPACK Fanta Zero Nar 2 L.": [16, 32],
    "Fanta Zero Nar 2 L.": [16, 32],
    "Pack x 6 Fanta Zero Naranja Lata 33": [36, 72],
    "Fanta Zero Naranja Lata 33": [9, 18],
    "SEMI BIPACK Fanta Limón 2X2L": [2, 4],
    "BIPACK Fanta limón Pet 2 L.": [16, 32],
    "SEMI Fanta Pet.2 L Limón (150x2)=300": [2, 4],
    "Fanta limón Pet 2 L.": [16, 32],
    "Fanta limón Pet 1,25L": [19, 38],
    "Fanta limón Pet 500": [9, 18],
    "SEMI  PACK 9 lata Fanta Limón (120x2)=240": [2, 4],
    "Pack x 9 Fanta limón Lata 33 cl.": [24, 48],
    "SEMI  Fanta Limón lata (960x2)=1920": [2, 4],
    "Fanta limón Lata 33 cl.": [9, 18],
    "BIPACK Fanta Zero lim 2 L.": [16, 32],
    "Fanta Zero lim 2 L.": [16, 32],
    "Fanta Zero limón Lata 33": [9, 18],
    "Fanta Sandía sin azúcar Pet 1.25L C6": [19, 38],
    "Fanta Frambuesa sin azúcar Pet 1.25L C6": [19, 38],
    "Fanta Sandía LATA 33": [9, 18],
    "Fanta Frambuesa LATA 33": [9, 18],
    "Sprite Lata Pack 6X20 CL.": [54, 108],
    "Sprite Pet 2 L.": [16, 32],
    "BIPACK Sprite Pet 2 L.": [16, 32],
    "Sprite Zero Pet 2 L": [16, 32],
    "Sprite lata 33": [9, 18],
    "Sprite Zero lata 33": [9, 18],
    "Sprite lata 33 P9": [24, 48],
    "Sprite Pet 500": [9, 18],
    "Nordic Mist lata 250": [9, 18],
    "Nordic Blue Lata 25 cl.": [9, 18],
    "Royal Bliss Bitter Roso Cesta VNR20 P4 C6": [12, 24],
    "Nordic Zero Lata 25 cl.": [10, 20],
    "Nordic Mist Tónica 1L": [10, 20],
    "Limca PET1L C12": [10, 20],
    "Royal Bliss Berry Lata 25 C12": [24, 48],
    "Royal Bliss Signature WTR Lata 25 C12": [24, 48],
    "Royal Bliss Signature tónica Zero Lata 25 C12": [24, 48],
    "Royal Bliss Lemon Mixer Lata 25 C12": [24, 48],
    "Royal Bliss Berry CESTA VNR20 P4 C6": [12, 24],
    "Royal Bliss Yuzu CESTA VNR20 P4 C6": [12, 24],
    "Burn Regular 0,5L": [18, 36],
    "Burn Zero Peach Lata 50 C12": [18, 36],
    "Burn Zero Raspberry LATA50 C12": [18, 36],
    "Pack x 4 Burn Lata 50 C6": [9, 18],
    "Monster Green Lata 50 cl.": [9, 18],
    "Monster Green Zero Lata 50 C24": [9, 18],
    "Pack x 4 Monster Green x 500 ml": [9, 18],
    "Monster LO - CARB 50 cl.": [9, 18],
    "Monster Rehab Lata 50 cl.": [9, 18],
    "MONSTER JUICED RIO PUNCH LATA50 C24": [9, 18],
    "Monster Ultra Paradise Lata 50 C24": [9, 18],
    "Monster Ultra Red Lata 50 T24": [9, 18],
    "Monster Ultra White Lata 50 T24": [9, 18],
    "Pack x 4 Monster Ultra White Zero Lata 50": [9, 18],
    "Monster Ultra Fiesta Lata 50 C24": [9, 18],
    "Monster Ultra Rosá Lata 50 C24": [9, 18],
    "Monster Ultra Peachy Keen 50cl": [9, 18],
    "Monster Bad Apple 50cl": [9, 18],
    "Monster Punch 50cl.": [9, 18],
    "Monster Mango Loco Lata 50 C24": [9, 18],
    "Pack x 4 Monster Mango Loco Lata 50 C6": [9, 18],
    "Monster Monarch Lata 50 C24": [9, 18],
    "Monster Nitro Super Dry Lata 50 C24": [9, 18],
    "Monster Khaotic Juice Lata 50 C24": [9, 18],
    "Monster Ultra Watermelon Lata 50 C24": [9, 18],
    "Monster Lewis Hamilton Zero Lata 50 C24": [9, 18],
    "Monster Ultra Gold Zero Lata 50 C24": [9, 18],
    "Monster Aussie Style Lemonade Lata 50 C24": [9, 18],
    "Monster Reserve Watermelon Lata 50 C24": [9, 18],
    "Monster Reserve White Pineapple Lata 50 C24": [9, 18],
    "MONSTER ULTRA STRAWBERRY DREAMS LA50 C24": [9, 18],
    "Limón&Nada Clásica 1 L.": [25, 50],
    "FUZE GTM PET50 C24": [9, 18],
    "FUZE MP PET 1,5L C6": [21, 42],
    "Fuze Limón Lata 33": [9, 18],
    "Fuze Limón sin azúcar Lata 33": [9, 18],
    "Fuze Limón Pet 50": [9, 18],
    "Fuze Limón Pet 1,5L": [21, 42],
    "Fuze Limón sin azúcar Pet 1,5L": [21, 42],
    "Fuze Tea Peach Hibiscus PET1.5L": [21, 42],
    "Fuze Tea Peach Hibiscus PET50": [9, 18],
    "Powerade Ice Storm Pet 50": [9, 18],
    "Powerade Zero Ice Storm PET50 C12": [9, 18],

    "Powerade Citrus Charge Pet 50": [9, 18],
    "Powerade Blood Orange Charge Pet 50": [9, 18],
"Powerade Ice Storm Pet 50": [12, 24],
"Powerade Ice Storm Pet 50": [12, 24],
    "Reign Melon manía Lata 50 C12": [3, 5],
    "Reign Razzle Berry Lata 50 C12": [3, 5],
    "SEMI  Aquarius limón lata (960x2)=1920": [2, 4],
    "Aquarius limón Lata 33 cl.": [9, 18],
    "Aquarius Naranja Lata 33 cl.": [9, 18],
    "Aquarius Sin Azúcar Limón Lata 33 cl.": [9, 18],
    "Aquarius Sin Azúcar Naranja Lata 33 cl.": [9, 18],
    "Pack x 9 Aquarius Limón Lata 33 cl.": [24, 48],
    "Pack x 9 Aquarius Naranja Lata 33 cl.": [24, 48],
    "Aquarius limón Pet 500": [9, 18],
    "Aquarius Naranja Pet 500": [9, 18],
    "SEMI  Aquarius Limón Pet 1´5 l. (195x2)= 390": [2, 4],
    "Aquarius limón Pet 1,5 L.": [21, 42],
    "SEMI Aquarius naranja Pet 1,5 L.(195x2)=390": [2, 4],
    "Aquarius Naranjar Pet 1,5 L.": [21, 42],
    "Coca-Cola Sin Cafeína Pet 2 L.": [16, 32],
    "Coca-Cola Sin Cafeína Lata 33": [9, 18],
    "Coca-Cola Light sin cafeína Pet 2 L.": [16, 32],
    "Coca-Cola Light Sin cafeína Lata 33": [9, 18],
    "Coca-Cola Zero Limón Lata 33": [9, 18],
    "Coca-Cola Zero Lima Lata 33 CCO8 C24": [9, 18],
    "Cherry Coke Zero Lata 33cl": [9, 18],
    "Aquarius Limón Sin Azúcar Pet 1,5 L.": [21, 42],
    "Aquarius Naranja Sin Azúcar Pet 1,5 L.": [21, 42],
    "Aquarius Melocotón Rojo Pet 1.5L C6": [21, 42],
    "Pack x 4 Aquarius Limón Pet 1,5 L.": [28, 56],
    "Pack x 4 Aquarius Naranja Pet 1,5 L.": [28, 56],
    "BIPACK Aquarius Limón Pet 1,5 L.": [21, 42],
    "BIPACK Aquarius Naranja Pet 1,5 L.": [21, 42],
    "Aquarius Melocotón Rojo Lata 33": [9, 18],
    "SEMI Aquarius Naranja Pet 1´5 l. (195x2)= 390": [2, 4],
    "Appletiser VNR75 C6": [17, 34],
    "Appletiser VNR275 P6 C4": [9, 18],
    "Appletiser LATA25 C12": [24, 48],
    "Aquabona Pet 0,5 L": [9, 18],
    "Aquabona 1.5L": [21, 42],
    "Semi Aquabona 1,5 L (240x2)=480": [2, 4],
    "Abuabona Singular PET50 C12": [18, 36],
    "Agua Vilas del Turbón pet 1L": [9, 18],
    "Jack & Coke Lata 33 C12": [3, 5, 15],
    "Jack & Coke Zero Sin Cafeína Lata 33 C12": [3, 5, 15],
    "Absolut Sprite Lata 25 C12": [3, 5, 15],
"PROMOCIONES": [0],
"EEFF COCA-COLA":[0],
"EEFF MONSTER": [0],
"CABECERA":[0]
  };
/* -----------------------------------------------------------------------
   FULLSCREEN MODAL PARA IMÁGENES Y PDF
------------------------------------------------------------------------ */
function initFullscreenModal() {
  const productList   = document.getElementById('product-list');
  const modal         = document.getElementById('fullscreen-modal');
  const modalContent  = modal.querySelector('.fullscreen-modal-content');
  const closeBtn      = modal.querySelector('.close-fullscreen-modal');

  function openModal(card) {
    const img = card.querySelector('img[data-full]');
    // SIEMPRE coger la URL Firebase del atributo data-full
    const src = img?.dataset.full || img?.src;
    if (!src) return;

    modalContent.innerHTML = '';
    if (src.toLowerCase().endsWith('.pdf')) {
      const iframe = document.createElement('iframe');
      iframe.src = src;
      modalContent.appendChild(iframe);
    } else {
      const bigImg = document.createElement('img');
      bigImg.src = src;
      modalContent.appendChild(bigImg);
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
    if (card && !e.target.closest('button,input,a')) {
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

    lazyLoadImages();
  }

  function createSection(sectionName, products) {
    const escapeHTML = (str) => String(str || '').replace(/"/g, '&quot;');
    let html = `<h2 class="section-title">${sectionName}</h2><div class="carousel-container">`;

    products.forEach((p, i) => {
      const btnId = `${sectionName.replace(/\s/g, '_')}-${i}`;
      const img   = `images/${sectionName.toLowerCase().replace(/\s+/g, '_')}_${i}.jpg`;
      
      // Fecha actual a medianoche
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      html += `
        <div class="product" data-section-name="${escapeHTML(sectionName)}" data-fullview-src="${img}">
          <img data-src="${img}" alt="${escapeHTML(p.name)}" class="lazy">
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
            e.target.src=e.target.dataset.src; e.target.classList.remove('lazy'); o.unobserve(e.target);
          }
        });
      });
      imgs.forEach(i=>obs.observe(i));
    } else {
      imgs.forEach(i=>{ i.src=i.dataset.src; i.classList.remove('lazy'); });
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
    setQuantity, validateInput, addToCart, removeFromCart, toggleCart
  });

})();  /* IIFE */
