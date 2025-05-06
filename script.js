document.addEventListener("DOMContentLoaded", function() {
  // ============================================
  // Código existente para productos, carrito, etc.
  // ============================================
  
  // Objeto con secciones y productos
  const sections = {
    "FOCOS": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2024-05-01",
      "endDate": "2024-05-31",
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
"startDate": "2024-05-06",
      "endDate": "2024-05-19",
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

"CARREFOUR": [
      { 
  "name": "", 
  "price": 0.00, 
"startDate": "2024-04-22",
      "endDate": "2024-05-12",
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
"startDate": "2024-04-22",
      "endDate": "2024-05-12",
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
"startDate": "2024-04-29",
      "endDate": "2024-05-28",
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
"startDate": "2024-04-30",
      "endDate": "2024-05-20",
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
"startDate": "2024-04-29",
      "endDate": "2024-05-12",
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
"startDate": "2024-05-01",
      "endDate": "2024-05-14",
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
"startDate": "2024-04-10",
      "endDate": "2024-04-29",
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
"startDate": "2024-04-23",
      "endDate": "2024-05-06",
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
        "name": "Fuze Tea Peach Hibiscus PET50", 
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
        "name": "Appletiser VNR75 C6", 
        "price": 6.00, 
        "offer": false,
        "discountOptions": { "twoXone": false, "threeXtwo": false, "secondUnit70": false, "twentyPercent": false }
      },
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
      },
      { 
        "name": "Agua Vilas del Turbón pet 1L", 
        "price": 1.00, 
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




// ======================================================================
// Inicialización de la aplicación
// ======================================================================
function initializeApp() {
  updateProductList();
  createFilterDropdown();
}

// ======================================================================
// Función para actualizar el listado de productos (secciones)
// ======================================================================
function updateProductList() {
  const productListElem = document.getElementById("product-list");
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
  let sectionHTML = `<h2 class="section-title">${sectionName}</h2><div class="carousel-container">`;
  products.forEach((product, index) => {
    const buttonId = `${sectionName}-${index}`.replace(/\s+/g, '-');
    const quantities = PRODUCT_QUANTITIES[product.name] || [0, 0, 0];
    let imageName = `${sectionName.toLowerCase().replace(/\s+/g, '_')}_${index}.jpg`;

    let offerHTML = product.offer ? '<div class="offer-tag">Oferta</div>' : '';

    let dateRangeHTML = '';
    if (product.startDate && product.endDate) {
      const startDate = new Date(product.startDate).toLocaleDateString('es-ES');
      const endDate = new Date(product.endDate).toLocaleDateString('es-ES');
      dateRangeHTML = `<div class="date-range-tag">${startDate} - ${endDate}</div>`;
    }

    let offerLogoHTML = '';
    if (product.offer && product.offerLogos) {
      offerLogoHTML = `<div class="logo-container">`;
      if (product.offerLogos.alcampo) {
        offerLogoHTML += `<div class="offer-logo super1"><img src="images/logo_supermerc.png" alt="Alcampo"></div>`;
      }
      if (product.offerLogos.condis) {
        offerLogoHTML += `<div class="offer-logo super2"><img src="images/logo_condis.png" alt="Condis"></div>`;
      }
      if (product.offerLogos.carrefour) {
        offerLogoHTML += `<div class="offer-logo super3"><img src="images/logo_carrefour.png" alt="Carrefour"></div>`;
      }
      if (product.offerLogos.caprabo) {
        offerLogoHTML += `<div class="offer-logo super4"><img src="images/logo_caprabo.png" alt="Caprabo"></div>`;
      }
      if (product.offerLogos.sorli) {
        offerLogoHTML += `<div class="offer-logo super5"><img src="images/logo_sorli.png" alt="Sorli"></div>`;
      }
      if (product.offerLogos.consum) {
        offerLogoHTML += `<div class="offer-logo super6"><img src="images/logo_consum.png" alt="Consum"></div>`;
      }
      offerLogoHTML += `</div>`;
    }

    let discountHTML = '';
    if (product.discountOptions) {
      if (product.discountOptions.twoXone) {
        discountHTML += `<div class="discount-tag twoXone">2x1</div>`;
      }
      if (product.discountOptions.threeXtwo) {
        discountHTML += `<div class="discount-tag threeXtwo">3x2</div>`;
      }
      if (product.discountOptions.secondUnit70) {
        discountHTML += `<div class="discount-tag secondUnit70">70% descuento 2da</div>`;
      }
      if (product.discountOptions.twentyPercent) {
        discountHTML += `<div class="discount-tag twentyPercent">20% descuento</div>`;
      }
      if (product.discountOptions.fiftyPercent) {
        discountHTML += `<div class="discount-tag fiftyPercent">50% descuento</div>`;
      }
      if (product.discountOptions.gift) {
        discountHTML += `<div class="discount-tag gift">Regalo</div>`;
      }
      if (product.discountOptions.travel) {
        discountHTML += `<div class="discount-tag travel">Viaje</div>`;
      }
      if (product.discountOptions.draw) {
        discountHTML += `<div class="discount-tag draw">Sorteo</div>`;
      }
      if (product.discountOptions.promoWeb) {
        discountHTML += `<div class="discount-tag promoWeb">Promo Web</div>`;
      }
    }

    let priceHTML = "";
    if (!product.staticOffer && product.price !== 0) {
      priceHTML = product.offer && product.previousPrice 
        ? `<s>€${product.previousPrice.toFixed(2)}</s> <strong>€${product.price.toFixed(2)}</strong>`
        : `€${product.price.toFixed(2)}`;
    }

    let focusLogoHTML = '';
    if (product.focus1) {
      focusLogoHTML = `<div class="focus-logo foco1"><div class="focus-text">FOCO 1</div></div>`;
    } else if (product.focus2) {
      focusLogoHTML = `<div class="focus-logo foco2"><div class="focus-text">FOCO 2</div></div>`;
    } else if (product.focus3) {
      focusLogoHTML = `<div class="focus-logo foco3"><div class="focus-text">FOCO 3</div></div>`;
    } else if (product.focus4) {
      focusLogoHTML = `<div class="focus-logo foco4"><div class="focus-text">FOCO 4</div></div>`;
    }

    if (product.staticOffer) {
      sectionHTML += `
        <div class="product static-offer">
          ${offerLogoHTML}
          ${offerHTML}
          ${dateRangeHTML}
          ${discountHTML}
          ${focusLogoHTML}
          <img data-src="images/${imageName}" alt="${product.name}" class="lazy">
          <h3>${product.name}</h3>
        </div>
      `;
    } else {
      sectionHTML += `
        <div class="product">
          ${offerLogoHTML}
          ${offerHTML}
          ${dateRangeHTML}
          ${discountHTML}
          ${focusLogoHTML}
          <img data-src="images/${imageName}" alt="${product.name}" class="lazy">
          <h3>${product.name}</h3>
          ${priceHTML ? `<p class="price">${priceHTML}</p>` : ''}
          <div class="quantity-buttons">
            ${quantities.map(value => `<button onclick="setQuantity(this, ${value})">${value}</button>`).join('')}
            <input type="number" placeholder="Otro" oninput="validateInput(this)">
          </div>
          <button id="${buttonId}" class="add-btn" onclick="addToCart(this, '${product.name}', ${product.price})">Agregar</button>
        </div>
      `;
    }
  });
  sectionHTML += `</div>`;
  return sectionHTML;
}

// ======================================================================
// Funciones de carrito, totales, etc.
// ======================================================================
function setQuantity(button, value) {
  let input = button.parentElement.querySelector('input');
  input.value = value;
}

function validateInput(input) {
  if (input.value < 0) input.value = 0;
}

function updateTotalDisplay(total) {
  document.getElementById('total-display').innerText = 'Total: €' + total.toFixed(2);
  document.getElementById('modal-total').innerText = 'Total: €' + total.toFixed(2);
}

function addToCart(button, productName, productPrice) {
  let input = button.parentElement.querySelector('input');
  let quantity = parseInt(input.value);
  if (isNaN(quantity) || quantity <= 0) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }
  if (button.classList.contains('added')) {
    alert("Este producto ya ha sido añadido.");
    return;
  }
  button.classList.add('added');
  button.style.backgroundColor = '#ffa500';
  button.innerText = 'Añadido';
  const sound = document.getElementById("add-sound");
  if (sound) {
    sound.play().catch(error => console.error("Error al reproducir sonido:", error));
  }
  let cartItemsContainer = document.getElementById("cart-items-modal");
  if (cartItemsContainer.innerText.trim() === 'No hay productos añadidos.') {
    cartItemsContainer.innerHTML = '';
  }
  cartItemsContainer.innerHTML += `
    <div class="cart-item" data-price="${(productPrice * quantity).toFixed(2)}">
      <span class="cart-product-name">${productName}</span> - ${quantity} unidades - Precio: €${(productPrice * quantity).toFixed(2)}
      <button class="remove-btn" onclick="removeFromCart(this, '${button.id}')">Eliminar</button>
    </div>
  `;
  updateTotalPrice();
  showToast("Producto añadido: " + productName);
}

function removeFromCart(button, buttonId) {
  button.parentElement.remove();
  const addButton = document.getElementById(buttonId);
  if (addButton) {
    addButton.classList.remove('added');
    addButton.style.backgroundColor = '#2c7a7b';
    addButton.innerText = 'Agregar';
    const input = addButton.parentElement.querySelector('input[type="number"]');
    if (input) {
      input.value = "";
    }
  }
  let cartItemsContainer = document.getElementById("cart-items-modal");
  if (cartItemsContainer.children.length === 0) {
    cartItemsContainer.innerHTML = 'No hay productos añadidos.';
  }
  updateTotalPrice();
}

function updateTotalPrice() {
  let total = 0;
  document.querySelectorAll('#cart-items-modal .cart-item').forEach(item => {
    const itemPrice = parseFloat(item.getAttribute('data-price'));
    if (!isNaN(itemPrice)) {
      total += itemPrice;
    }
  });
  updateTotalDisplay(total);
}

function collectCartData() {
  const cartItems = document.querySelectorAll("#cart-items-modal .cart-item");
  if (
    cartItems.length === 0 ||
    (cartItems[0].innerText && cartItems[0].innerText.includes('No hay productos'))
  ) {
    alert("El carrito está vacío. No puedes enviar un pedido sin productos.");
    return null;
  }
  const order = [];
  cartItems.forEach(item => {
    const productElem = item.querySelector('.cart-product-name');
    const product = productElem ? productElem.innerText.trim() : "";
    const quantityMatch = item.innerText.match(/-\s*(\d+)\s*unidades/);
    const priceMatch = item.innerText.match(/Precio:\s*€([\d\.]+)/);
    if (product && quantityMatch && priceMatch) {
      const quantity = parseInt(quantityMatch[1], 10);
      const price = parseFloat(priceMatch[1]);
      order.push({ product, quantity, price });
    } else {
      console.error("Error al parsear el item del carrito:", item.innerText);
    }
  });
  return order;
}

function exportToExcel(order) {
  // Verificamos que exista algún producto en el pedido
  if (!order || order.length === 0) {
    alert("No hay productos en el pedido.");
    return;
  }
  
  // Definimos la cabecera de las columnas para el archivo Excel
  const header = ["Producto", "Unidades", "Precio", "Valor"];

  // Creamos las filas a partir de cada producto en el pedido.
  // "Valor" es el resultado de la multiplicación de cantidad por precio.
  const rows = order.map(item => {
    const valor = item.quantity * item.price;
    return [item.product, item.quantity, item.price, valor];
  });

  // Calculamos el total gastado sumando los valores de cada producto.
  const totalGastado = rows.reduce((acc, row) => acc + row[3], 0);
  // Agregamos una fila final para mostrar el total gastado.
  rows.push(["Total gastado", "", "", totalGastado]);

  // Combina la cabecera y las filas en un array de arrays que representa la hoja
  const worksheetData = [header, ...rows];

  // Convierte el array de arrays en una hoja de cálculo usando XLSX
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  // Opcional: Establece el ancho de algunas columnas para mejorar el formato
  ws["!cols"] = [{ wch: 30 }, { wch: 10 }, { wch: 15 }, { wch: 15 }];

  // Crea un nuevo libro de trabajo y agrega la hoja creada
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pedido");

  // Intentamos escribir el libro en un buffer en formato xlsx
  try {
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    // Creamos un Blob a partir del buffer con el tipo MIME correspondiente
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    // Creamos un elemento <a> temporal para forzar la descarga del archivo
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pedido.xlsx";
    document.body.appendChild(link);
    link.click();
    // Eliminamos el enlace después de unos instantes y liberamos la URL creada
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);
  } catch (error) {
    console.error("Error al exportar a Excel:", error);
    alert("Hubo un error al generar el archivo Excel.");
  }
}

function checkPendingInputs() {
  const productDivs = document.querySelectorAll('.product');
  for (let div of productDivs) {
    const input = div.querySelector('input[type="number"]');
    const addButton = div.querySelector('.add-btn');
    if (input && input.value.trim() !== "" && parseInt(input.value) > 0 && !addButton.classList.contains('added')) {
      const productName = div.querySelector('h3') ? div.querySelector('h3').innerText : "Producto";
      alert(`Ha olvidado añadir ${productName} al carrito. No puedo hacer envío hasta que no haya añadido o eliminado el número del contenedor.`);
      return true;
    }
  }
  return false;
}

function submitOrder() {
  if (checkPendingInputs()) {
    return;
  }
  
  const orderItems = collectCartData();
  if (!orderItems) return;

  const loggedUser = localStorage.getItem("loggedInUser") || "Usuario no identificado";
  const storeName = localStorage.getItem("userStore") || "Supermercado desconocido";
  const order = {
    email: loggedUser,
    userStore: storeName,
    products: orderItems
  };

  console.log("Contenido del pedido:", JSON.stringify(order, null, 2));
  
  if (confirm("¿Estás seguro de que deseas finalizar el pedido?")) {
    // Descarga el Excel sin enviar datos al servidor
    exportToExcel(order.products);

    // Reinicia el carrito
    document.getElementById("cart-items-modal").innerHTML = 'No hay productos añadidos.';
    updateTotalDisplay(0);
    document.querySelectorAll('.add-btn').forEach(btn => {
      btn.classList.remove('added');
      btn.style.backgroundColor = '#2c7a7b';
      btn.innerText = 'Agregar';
    });

    alert("Pedido descargado exitosamente.");
    
    /*
    // Si en el futuro necesitas enviar el pedido, se puede activar este bloque:
    fetch("https://TU-SERVIDOR.com/api/pedido", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
    .then(response => response.text())
    .then(data => console.log("Pedido enviado:", data))
    .catch(error => {
      console.error("Error al enviar el pedido:", error);
      alert("Error al enviar el pedido.");
    });
    */
  }
}

// Exponer la función para que sea accesible desde el HTML
window.submitOrder = submitOrder;
function toggleCart() {
  document.getElementById("cart-modal").classList.toggle("active");
}

function showToast(message) {
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 2000);
  }, 100);
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('img.lazy');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.classList.remove('lazy');
    });
  }
}

// ======================================================================
// Funcionalidad para arrastrar el botón del carrito
// ======================================================================
const cartToggle = document.getElementById("cart-toggle");
cartToggle.addEventListener('mousedown', function(e) {
  e.preventDefault();
  let startX = e.clientX, startY = e.clientY;
  let shiftX = e.clientX - cartToggle.getBoundingClientRect().left;
  let shiftY = e.clientY - cartToggle.getBoundingClientRect().top;
  let dragged = false;
  function moveAt(pageX, pageY) {
    cartToggle.style.left = pageX - shiftX + 'px';
    cartToggle.style.top = pageY - shiftY + 'px';
    cartToggle.style.position = 'fixed';
  }
  function onMouseMove(e) {
    if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
      dragged = true;
    }
    moveAt(e.pageX, e.pageY);
  }
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', function(e) {
    document.removeEventListener('mousemove', onMouseMove);
    if (!dragged) {
      toggleCart();
    }
  }, {once: true});
});
cartToggle.ondragstart = function() { return false; };

// ======================================================================
// NUEVA FUNCIONALIDAD: Dropdown de Filtros
// ======================================================================
function createFilterDropdown() {
  const filterContainer = document.getElementById("filter-container");
  filterContainer.innerHTML = "";
  const dropdownWrapper = document.createElement("div");
  dropdownWrapper.classList.add("dropdown");
  const dropdownButton = document.createElement("button");
  dropdownButton.classList.add("filter-dropdown-btn");
  dropdownButton.textContent = "Filtrar por sección ▼";
  dropdownButton.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
  });
  dropdownWrapper.appendChild(dropdownButton);
  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");
  const allOption = document.createElement("a");
  allOption.href = "#";
  allOption.textContent = "Todos";
  allOption.addEventListener("click", (e) => {
    e.preventDefault();
    filterSections("Todos");
    dropdownContent.classList.remove("show");
    dropdownButton.textContent = "Filtrar: Todos ▼";
  });
  dropdownContent.appendChild(allOption);
  Object.keys(sections).forEach(sectionName => {
    const option = document.createElement("a");
    option.href = "#";
    option.textContent = sectionName;
    option.addEventListener("click", (e) => {
      e.preventDefault();
      filterSections(sectionName);
      dropdownContent.classList.remove("show");
      dropdownButton.textContent = `Filtrar: ${sectionName} ▼`;
    });
    dropdownContent.appendChild(option);
  });
  dropdownWrapper.appendChild(dropdownContent);
  filterContainer.appendChild(dropdownWrapper);
}

function filterSections(selectedSection) {
  const sectionElements = document.querySelectorAll('.section');
  sectionElements.forEach(elem => {
    if (selectedSection === "Todos" || elem.getAttribute("data-section") === selectedSection) {
      elem.style.display = "";
    } else {
      elem.style.display = "none";
    }
  });
}

// ======================================================================
// Inicialización: renderizar productos y crear dropdown de filtros
// ======================================================================
window.addEventListener('DOMContentLoaded', initializeApp);

// ======================================================================
// Registro del Service Worker
// ======================================================================
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error en Service Worker:", err));
}

// ======================================================================
// Exponer funciones globalmente
// ======================================================================
window.toggleCart = toggleCart;
window.submitOrder = submitOrder;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.setQuantity = setQuantity;
window.validateInput = validateInput;
window.updateProductList = updateProductList;
});
// Inicia la aplicación al cargar el DOM
window.addEventListener('DOMContentLoaded', initializeApp);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Error en Service Worker:", err));
}
