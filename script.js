document.addEventListener("DOMContentLoaded", function() {
  // Objeto con secciones y productos enfocados a tecnología y móviles  
  // Puedes inicializarlo con dos, tres o más secciones; luego se podrán agregar dinámicamente.
  const sections = {
    "Coca Cola": [
    { "name": "SEMI PACK 12 lata CC (90x2)=180", "price": 12.00, "offer": true },
    { "name": "SEMI Coca Cola Reg lata 33 cl. (960x2)=1920", "price": 720.00, "offer": true },
    { "name": "Coca Cola pack 6 2L", "price": 6.00, "offer": false },
    { "name": "SEMI PACK 4 Coca-Cola 2 L.", "price": 8.00, "offer": false },
    { "name": "Coca Cola pack 4 2L", "price": 4.00, "offer": false },
    { "name": "SEMI BIPACK Coca Cola 2x2L", "price": 4.00, "offer": false },
    { "name": "Coca Cola Bipack 2L", "price": 2.00, "offer": false },
    { "name": "SEMI Coca Cola pet 2 L.", "price": 2.00, "offer": false },
    { "name": "Coca Cola 2L", "price": 2.00, "offer": false },
    { "name": "Coca Cola Bipack 1,25L", "price": 2.50, "offer": false },
    { "name": "SEMI Coca Cola pet 1,25 L.", "price": 1.25, "offer": false },
    { "name": "Coca Cola 1,25L", "price": 1.25, "offer": false },
    { "name": "Coca Cola P4 Pet500", "price": 2.00, "offer": false },
    { "name": "Coca Cola pet500", "price": 0.50, "offer": false },
    { "name": "VNR 1L C6", "price": 1.00, "offer": false },
    { "name": "VNR P4 C6", "price": 4.00, "offer": false },
    { "name": "Coca-Cola Lata 33", "price": 1.00, "offer": false },
    { "name": "Bandeja Coca-Cola 33 cl. Pack 24", "price": 24.00, "offer": false },
    { "name": "PACK 12 Lata 33", "price": 12.00, "offer": false },
    { "name": "Minicam PACK 6X20 CL.", "price": 6.00, "offer": false }
  ],
  "Coca Cola Zero": [
    { "name": "SEMI PACK 12 CC Zero (90x2)=180", "price": 12.00, "offer": false },
    { "name": "SEMI Coca Cola Zero lata 33 cl. (960x2)=1920", "price": 912.00, "offer": true },
    { "name": "Coca Cola Zero pack 6 2L", "price": 6.00, "offer": false },
    { "name": "SEMI PACK 4 Coca Zero 2 L.", "price": 8.00, "offer": false },
    { "name": "Coca Cola Zero pack 4 2L", "price": 4.00, "offer": false },
    { "name": "SEMI BIPACK Coca Cola Zero Pet 2x2 L.", "price": 4.00, "offer": false },
    { "name": "Coca Cola Zero Bipack 2L", "price": 2.00, "offer": false },
    { "name": "SEMI Coca Cola Zero Pet 2 L.", "price": 2.00, "offer": false },
    { "name": "Coca Cola Zero 2L", "price": 2.00, "offer": false },
    { "name": "Coca Cola Zero Bipack 1,25L", "price": 2.50, "offer": false },
    { "name": "Coca Cola Zero 1,25L", "price": 1.25, "offer": false },
    { "name": "Coca Cola Zero P4 Pet500", "price": 2.00, "offer": false },
    { "name": "Coca Cola Zero pet500", "price": 0.50, "offer": false },
    { "name": "VNR 1L zero C6", "price": 1.00, "offer": false },
    { "name": "VNR zero P4 C6", "price": 4.00, "offer": false },
    { "name": "zero Lata 33", "price": 0.95, "offer": false },
    { "name": "Bandeja zero Pack 24", "price": 19.90, "offer": false },
    { "name": "PACK 12 zero Lata 33", "price": 10.26, "offer": false },
    { "name": "Minicam zero PACK 6X20 CL.", "price": 3.50, "offer": false }
  ],
  "coca cola light": [
    { "name": "Coca-Cola Light pack 4 2L", "price": 4.00, "offer": false },
    { "name": "Coca-Cola Light Bipack 2L", "price": 2.00, "offer": false },
    { "name": "Coca-Cola Light 2L", "price": 2.00, "offer": false },
    { "name": "Coca-Cola Light 1,25L", "price": 1.25, "offer": false },
    { "name": "Coca-Cola Light Pet500", "price": 0.50, "offer": false },
    { "name": "Coca-Cola Light Lata 33", "price": 1.00, "offer": false },
    { "name": "Bandeja Coca-Cola Light 33 cl Pack 24", "price": 24.00, "offer": false },
    { "name": "SEMI Coca-Cola Light Lata 33 P9 SD120", "price": 1.50, "offer": false },
    { "name": "PACK 9 Light Lata 33", "price": 9.00, "offer": false }
  ],
  "Coca Cola Zero Zero": [
    { "name": "SEMI PACK 12 CC Zero Zero (90x2)=180", "price": 12.00, "offer": false },
    { "name": "Coca-Cola Zero Zero pack 6 2L", "price": 6.00, "offer": false },
    { "name": "SEMI PACK 4 Coca Zero Zero Regular 2 L.", "price": 8.00, "offer": false },
    { "name": "Coca-Cola Zero Zero pack 4 2L", "price": 4.00, "offer": false },
    { "name": "SEMI BIPACK CC Zero Zero Pet 2x2L", "price": 4.00, "offer": false },
    { "name": "Coca-Cola Zero Zero Bipack 2L", "price": 2.00, "offer": false },
    { "name": "Coca-Cola Zero Zero 2L", "price": 2.00, "offer": false },
    { "name": "Coca-Cola Zero Zero Bipack 1,25L", "price": 2.50, "offer": false },
    { "name": "Coca-Cola Zero Zero 1,25L", "price": 1.25, "offer": false },
    { "name": "Coca-Cola Zero Zero Pet500", "price": 0.50, "offer": false },
    { "name": "Coca-Cola Zero Zero Lata 33", "price": 1.00, "offer": false },
    { "name": "Bandeja Coca-Cola Zero Zero 33 cl Pack 24", "price": 24.00, "offer": false },
    { "name": "PACK 12 Coca-Cola Zero Zero Lata 33", "price": 12.00, "offer": false },
    { "name": "COCA-COLA ZERO ZERO LATA PACK 6X20 CL.", "price": 6.00, "offer": false }
  ],
  "Coca Cola Sabores": [
    { "name": "Coca-Cola Sin Cafeína Pet 2 L. ", "price": 1.00, "offer": false },
    { "name": "Coca-Cola Sin Cafeína Lata 33", "price": 1.00, "offer": false },
    { "name": "Coca-Cola Light sin cafeína Pet 2 L.", "price": 1.00, "offer": false },
    { "name": "Coca-Cola Light Sin cafeína Lata 33", "price": 1.00, "offer": false },
    { "name": "Coca-Cola Zero Limón Lata 33", "price": 1.00, "offer": false },
    { "name": "Coca-Cola Zero Lima Lata 33 CCO8 C24", "price": 24.00, "offer": false },
    { "name": "Cherry Coke Zero Lata 33cl", "price": 1.00, "offer": false },
  ],
  "Fanta naranja": [
    { "name": "SEMI BIPACK Fanta Naranja 2X2L", "price": 3.50, "offer": false },
    { "name": "BIPACK Fanta Naranja Pet 2 L.", "price": 3.50, "offer": false },
    { "name": "SEMI Fanta Pet.2 L Naranja (150x2)=300", "price": 1.75, "offer": false },
    { "name": "Fanta Naranja Pet 2 L.", "price": 1.75, "offer": false },
    { "name": "Fanta Naranja Pet 1,25L", "price": 1.25, "offer": false },
    { "name": "Fanta Naranja Pet 500", "price": 0.50, "offer": false },
    { "name": "SEMI  PACK 9 lata Fanta Naranja (120x2)=240", "price": 9.00, "offer": false },
    { "name": "Pack x 9 Fanta Naranja Lata 33 cl.", "price": 9.00, "offer": false },
    { "name": "SEMI  Fanta Naranja lata (960x2)=1920", "price": 1.00, "offer": false },
    { "name": "Fanta Naranja Lata 33 cl.", "price": 1.00, "offer": false },
    { "name": "MINI LATA Fanta Naranja pack 6X20 CL", "price": 6.00, "offer": false },
    { "name": "BIPACK Fanta Zero Nar 2 L.", "price": 3.50, "offer": false },
    { "name": "Fanta Zero Nar 2 L.", "price": 1.75, "offer": false },
    { "name": "Pack x 6 Fanta Zero Naranja Lata 33", "price": 6.00, "offer": false },
    { "name": "Fanta Zero Naranja Lata 33", "price": 1.00, "offer": false }
  ],
  "Fanta limón": [
    { "name": "SEMI BIPACK Fanta Limón 2X2L", "price": 3.50, "offer": false },
    { "name": "BIPACK Fanta limón Pet 2 L.", "price": 3.50, "offer": false },
    { "name": "SEMI Fanta Pet.2 L Limón (150x2)=300", "price": 1.75, "offer": false },
    { "name": "Fanta limón Pet 2 L.", "price": 1.75, "offer": false },
    { "name": "Fanta limón Pet 1,25L", "price": 1.25, "offer": false },
    { "name": "Fanta limón Pet 500", "price": 0.50, "offer": false },
    { "name": "SEMI  PACK 9 lata Fanta Limón (120x2)=240", "price": 9.00, "offer": false },
    { "name": "Pack x 9 Fanta limón Lata 33 cl.", "price": 9.00, "offer": false },
    { "name": "SEMI  Fanta Limón lata (960x2)=1920", "price": 1.00, "offer": false },
    { "name": "Fanta limón Lata 33 cl.", "price": 1.00, "offer": false },
    { "name": "Fanta Zero lim 2 L.", "price": 1.75, "offer": false },
    { "name": "Fanta Zero limón Lata 33", "price": 1.00, "offer": false }
  ],
  "Fanta sabores": [
    { "name": "Fanta Sandía sin azúcar Pet 1.25L C6", "price": 1.25, "offer": false },
    { "name": "Fanta Frambuesa sin azúcar Pet 1.25L C6", "price": 1.25, "offer": false },
    { "name": "Fanta Sandía LATA 33", "price": 1.00, "offer": false },
    { "name": "Fanta Frambuesa LATA 33", "price": 1.00, "offer": false }
  ],
  "Sprite": [
    { "name": "Sprite Lata Pack 6X20 CL.", "price": 6.00, "offer": false },
    { "name": "Sprite Pet 2 L.", "price": 2.00, "offer": false },
    { "name": "BIPACK Sprite Pet 2 L.", "price": 3.50, "offer": false },
    { "name": "Sprite Zero Pet 2 L", "price": 2.00, "offer": false },
    { "name": "Sprite lata 33", "price": 1.00, "offer": false },
    { "name": "Sprite Zero lata 33", "price": 1.00, "offer": false },
    { "name": "Sprite lata 33 P9", "price": 9.00, "offer": false },
    { "name": "Sprite Pet 500", "price": 0.50, "offer": false }
  ],
  "Tónica": [
    { "name": "Nordic Mist lata 250", "price": 0.50, "offer": false },
    { "name": "Nordic Blue Lata 25 cl.", "price": 0.75, "offer": false },
    { "name": "Royal Bliss Bitter Roso Cesta VNR20 P4 C6", "price": 4.00, "offer": false },
    { "name": "Nordic Zero Lata 25 cl.", "price": 0.75, "offer": false },
    { "name": "Nordic Mist Tónica 1L", "price": 1.00, "offer": false },
    { "name": "Limca PET1L C12", "price": 1.00, "offer": false },
    { "name": "Royal Bliss Berry Lata 25 C12", "price": 12.00, "offer": false },
    { "name": "Royal Bliss Signature WTR Lata 25 C12", "price": 12.00, "offer": false },
    { "name": "Royal Bliss Signature tónica Zero Lata 25 C12", "price": 12.00, "offer": false },
    { "name": "Royal Bliss Lemon Mixer Lata 25 C12", "price": 12.00, "offer": false },
    { "name": "Royal Bliss Berry CESTA VNR20 P4 C6", "price": 4.00, "offer": false },
    { "name": "Royal Bliss Yuzu CESTA VNR20 P4 C6", "price": 4.00, "offer": false }
  ],
  "Burn": [
    { "name": "Burn Regular 0,5L", "price": 0.50, "offer": false },
    { "name": "Burn Zero Peach Lata 50 C12", "price": 12.00, "offer": false },
    { "name": "Burn Zero Raspberry LATA50 C12", "price": 12.00, "offer": false },
    { "name": "Pack x 4 Burn Lata 50 C6", "price": 6.00, "offer": false }
  ],
  "Energéticas": [
    { "name": "Monster Green Lata 50 cl.", "price": 1.50, "offer": false },
    { "name": "Monster Green Zero Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Pack x 4 Monster Green x 500 ml", "price": 6.00, "offer": false },
    { "name": "Monster LO - CARB 50 cl.", "price": 1.50, "offer": false },
    { "name": "Monster Rehab Lata 50 cl.", "price": 1.50, "offer": false },
    { "name": "Monster Rio", "price": 1.50, "offer": false },
    { "name": "Monster Ultra Paradise Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Ultra Red Lata 50 T24", "price": 24.00, "offer": false },
    { "name": "Monster Ultra White Lata 50 T24", "price": 24.00, "offer": false },
    { "name": "Pack x 4 Monster Ultra White Zero Lata 50", "price": 6.00, "offer": false },
    { "name": "Monster Ultra Fiesta Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Ultra Rosá Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Ultra Peachy Keen 50cl", "price": 1.50, "offer": false },
    { "name": "Monster Bad Apple 50cl", "price": 1.50, "offer": false },
    { "name": "Monster Punch 50cl.", "price": 1.50, "offer": false },
    { "name": "Monster Mango Loco Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Pack x 4 Monster Mango Loco Lata 50 C6", "price": 6.00, "offer": false },
    { "name": "Monster Monarch Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Nitro Super Dry Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Khaotic Juice Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Ultra Watermelon Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Lewis Hamilton Zero Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Ultra Gold Zero Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Aussie Style Lemonade Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Reserve Watermelon Lata 50 C24", "price": 24.00, "offer": false },
    { "name": "Monster Reserve White Pineapple Lata 50 C24", "price": 24.00, "offer": false }
  ],
  "M.Maid": [
    { "name": "Limón&Nada Clásica 1 L.", "price": 1.00, "offer": false }
  ],
  "FUZE": [
    { "name": "Fuze Limón Lata 33", "price": 1.00, "offer": false },
    { "name": "Fuze Limón sin azúcar Lata 33", "price": 1.00, "offer": false },
    { "name": "Fuze Limón Pet 50", "price": 0.50, "offer": false },
    { "name": "Fuze Limón Pet 1,5L", "price": 1.50, "offer": false },
    { "name": "Fuze Limón sin azúcar Pet 1,5L", "price": 1.50, "offer": false },
    { "name": "Fuze Tea Peach Hibiscus PET1.5L", "price": 1.50, "offer": false },
    { "name": "Fuze Tea Peach Hibiscus PET50", "price": 0.50, "offer": false }
    ],
    "Deportivas": [
    { "name": "Powerade Ice Storm Pet 50", "price": 1.50, "offer": false },
    { "name": "Powerade Zero Ice Storm PET50 C12", "price": 12.00, "offer": false },
    { "name": "Powerade Citrus Charge Pet 50", "price": 1.50, "offer": false },
    { "name": "Powerade Blood Orange Charge Pet 50", "price": 1.50, "offer": false },
    { "name": "Reign Melon manía Lata 50 C12", "price": 1.50, "offer": false },
    { "name": "Reign Razzle Berry Lata 50 C12", "price": 1.50, "offer": false }
  ],
  "Isotónicas": [
    { "name": "SEMI  Aquarius limón lata (960x2)=1920", "price": 1.00, "offer": false },
    { "name": "Aquarius limón Lata 33 cl.", "price": 1.00, "offer": false },
    { "name": "Aquarius Naranja Lata 33 cl.", "price": 1.00, "offer": false },
    { "name": "Aquarius Sin Azúcar Limón Lata 33 cl.", "price": 1.00, "offer": false },
    { "name": "Aquarius Sin Azúcar Naranja Lata 33 cl.", "price": 1.00, "offer": false },
    { "name": "Pack x 9 Aquarius Limón Lata 33 cl.", "price": 9.00, "offer": false },
    { "name": "Pack x 9 Aquarius Naranja Lata 33 cl.", "price": 9.00, "offer": false },
    { "name": "Aquarius limón Pet 500", "price": 0.50, "offer": false },
    { "name": "Aquarius Naranja Pet 500", "price": 0.50, "offer": false },
    { "name": "SEMI  Aquarius Limón Pet 1´5 l. (195x2)= 390", "price": 1.00, "offer": false },
    { "name": "Aquarius limón Pet 1,5 L.", "price": 1.50, "offer": false },
    { "name": "Aquarius Naranja Pet 1,5 L.", "price": 1.50, "offer": false },
    { "name": "Aquarius Limón Sin Azúcar Pet 1,5 L.", "price": 1.50, "offer": false },
    { "name": "Aquarius Naranja Sin Azúcar Pet 1,5 L.", "price": 1.50, "offer": false },
    { "name": "Aquarius Melocotón Rojo Pet 1.5L C6", "price": 1.50, "offer": false },
    { "name": "Pack x 4 Aquarius Limón Pet 1,5 L.", "price": 6.00, "offer": false },
    { "name": "Pack x 4 Aquarius Naranja Pet 1,5 L.", "price": 6.00, "offer": false },
    { "name": "BIPACK Aquarius Limón Pet 1,5 L.", "price": 3.50, "offer": false },
    { "name": "BIPACK Aquarius Naranja Pet 1,5 L.", "price": 3.50, "offer": false },
    { "name": "Aquarius Melocotón Rojo Lata 33", "price": 1.00, "offer": false }
  ],
  "Appletiser": [
    { "name": "Appletiser VNR75 C6", "price": 6.00, "offer": false },
    { "name": "Appletiser VNR275 P6 C4", "price": 4.00, "offer": false },
    { "name": "Appletiser LATA25 C12", "price": 12.00, "offer": false }
  ],
  "Aquabona": [
    { "name": "Aquabona Pet 0,5 L", "price": 0.50, "offer": false },
    { "name": "Aquabona 1.5L", "price": 1.50, "offer": false },
    { "name": "Semi Aquabona 1,5 L (240x2)=480", "price": 1.50, "offer": false },
    { "name": "Abuabona Singular PET50 C12", "price": 12.00, "offer": false },
    { "name": "Agua Vilas del Turbón pet 1L", "price": 1.00, "offer": false }
  ],
  "Alcoholes": [
    { "name": "Jack&Coke", "price": 3.00, "offer": false },
    { "name": "Jack&Coke zero", "price": 3.00, "offer": false },
    { "name": "Adsolut Sprite", "price": 3.00, "offer": false }
  ]

    };

  // Cantidades sugeridas para cada producto
  const PRODUCT_QUANTITIES = {
          "SEMI PACK 12 lata CC (90x2)=180": [2, 4],
          "SEMI Coca Cola Reg lata 33 cl. (960x2)=1920": [2, 4],
          "Coca Cola pack 6 2L": [16, 32],
          "SEMI PACK 4 Coca-Cola 2 L.": [2, 4],
          "Coca Cola pack 4 2L": [9, 18],
          "SEMI BIPACK Coca Cola 2x2L": [2, 4],
          "Coca Cola Bipack 2L": [16, 32],
          "SEMI Coca Cola pet 2 L.": [2, 4],
          "Coca Cola 2L": [16, 32],
          "Coca Cola Bipack 1,25L": [19, 38],
          "SEMI Coca Cola pet 1,25 L.": [2, 4],
          "Coca Cola 1,25L": [19, 38],
          "Coca Cola P4 Pet500": [54, 108],
          "Coca Cola pet500": [9, 18],
          "VNR 1L C6": [17, 34],
          "VNR P4 C6": [12, 24],
          "Coca-Cola Lata 33": [9, 18],
          "Bandeja Coca-Cola 33 cl. Pack 24": [108, 216],
          "PACK 12 Lata 33": [18, 36],
          "Minicam PACK 6X20 CL.": [54, 108],
          "SEMI PACK 12 CC Zero (90x2)=180": [2, 4],
          "SEMI Coca Cola Zero lata 33 cl. (960x2)=1920": [2, 4],
          "Coca Cola Zero pack 6 2L": [16, 32],
          "SEMI PACK 4 Coca Zero 2 L.": [2, 4],
          "Coca Cola Zero pack 4 2L": [24, 48],
          "SEMI BIPACK Coca Cola Zero Pet 2x2 L.": [2, 4],
          "Coca Cola Zero Bipack 2L": [16, 32],
          "SEMI Coca Cola Zero Pet 2 L.": [2, 4],
          "Coca Cola Zero 2L": [16, 32],
          "Coca Cola Zero Bipack 1,25L": [19, 38],
          "Coca Cola Zero 1,25L": [19, 38],
          "Coca Cola Zero P4 Pet500": [54, 108],
          "Coca Cola Zero pet500": [9, 18],
          "VNR 1L zero C6": [17, 34],
          "VNR zero P4 C6": [12, 24],
          "zero Lata 33": [9, 18],
          "Bandeja zero Pack 24": [108, 216],
          "PACK 12 zero Lata 33": [18, 36],
          "Minicam zero PACK 6X20 CL.": [54, 108],
          "Coca-Cola Light pack 4 2L": [24, 48],
          "Coca-Cola Light Bipack 2L": [16, 32],
          "Coca-Cola Light 2L": [9, 18],
          "Coca-Cola Light 1,25L": [19, 38],
          "Coca-Cola Light Pet500": [9, 18],
          "Coca-Cola Light Lata 33": [9, 18],
          "Bandeja Coca-Cola Light 33 cl Pack 24": [18, 108],
          "SEMI Coca-Cola Light Lata 33 P9 SD120": [2, 4],
          "PACK 9 Light Lata 33": [24, 48],
          "SEMI PACK 12 CC Zero Zero (90x2)=180": [2, 4],
          "Coca-Cola Zero Zero pack 6 2L": [16, 32],
          "SEMI PACK 4 Coca Zero Zero Regular 2 L.": [2, 4],
          "Coca-Cola Zero Zero pack 4 2L": [24, 48],
          "SEMI BIPACK CC Zero Zero Pet 2x2L": [2, 4],
          "Coca-Cola Zero Zero Bipack 2L": [16, 32],
          "Coca-Cola Zero Zero 2L": [16, 32],
          "Coca-Cola Zero Zero Bipack 1,25L": [19, 38],
          "Coca-Cola Zero Zero 1,25L": [19, 38],
          "Coca-Cola Zero Zero P4 Pet500": [9, 18],
          "Coca-Cola Zero Zero Pet500": [9, 18],
          "Coca-Cola Zero Zero Lata 33": [9, 18],
          "Bandeja Coca-Cola Zero Zero 33 cl Pack 24": [108, 216],
          "PACK 12 Coca-Cola Zero Zero Lata 33": [18, 36],
          "COCA-COLA ZERO ZERO LATA PACK 6X20 CL.": [54, 108],
          "Coca-Cola Zero Limón Lata 33": [9, 18],
          "Coca-Cola Zero Lima Lata 33 C24": [9, 18],
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
          "Monster Rio": [9, 18],
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
          "Aquarius Naranja Pet 1,5 L.": [21, 42],
          "Coca-Cola Sin Cafeína Pet 2 L. " : [16, 32],
          "Coca-Cola Sin Cafeína Lata 33" : [9, 18],
          "Coca-Cola Light sin cafeína Pet 2 L.": [16, 32],
          "Coca-Cola Light Sin cafeína Lata 33": [9, 18],
          "Coca-Cola Zero Limón Lata 33" : [9, 18],
          "Coca-Cola Zero Lima Lata 33 CCO8 C24": [9, 18],
          "Cherry Coke Zero Lata 33cl" : [9, 18],
          "Aquarius Limón Sin Azúcar Pet 1,5 L.": [21, 42],
          "Aquarius Naranja Sin Azúcar Pet 1,5 L.": [21, 42],
          "Aquarius Melocotón Rojo Pet 1.5L C6": [21, 42],
          "Pack x 4 Aquarius Limón Pet 1,5 L.": [28, 56],
          "Pack x 4 Aquarius Naranja Pet 1,5 L.": [28, 56],
          "BIPACK Aquarius Limón Pet 1,5 L.": [21, 42],
          "BIPACK Aquarius Naranja Pet 1,5 L.": [21, 42],
          "Aquarius Melocotón Rojo Lata 33": [9, 18],
          "Appletiser VNR75 C6": [17, 34],
          "Appletiser VNR275 P6 C4": [9, 18],
          "Appletiser LATA25 C12": [24, 48],
          "Aquabona Pet 0,5 L": [9, 18],
          "Aquabona 1.5L": [21, 42],
          "Semi Aquabona 1,5 L (240x2)=480": [2, 4],
          "Abuabona Singular PET50 C12": [18, 36],
          "Agua Vilas del Turbón pet 1L": [9, 18],
          "Jack&Coke": [3, 5, 15],
          "Jack&Coke zero": [3, 5, 15],
          "Adsolut Sprite": [3, 5, 15]     
};

  // Función para crear cada sección en formato carrusel  
  function createSection(sectionName, products) {
  // Se utiliza un <h2> para el encabezado de la sección
  let sectionHTML = `<h2 class="section-title">${sectionName}</h2><div class="carousel-container">`;
  products.forEach((product, index) => {
    const buttonId = `${sectionName}-${index}`.replace(/\s+/g, '-');
    const quantities = PRODUCT_QUANTITIES[product.name] || [1, 2, 3];
    // Genera el nombre de imagen (asegúrate de tener las imágenes en la carpeta "images")
    let imageName = `${sectionName.toLowerCase().replace(/\s+/g, '_')}_${index}.jpg`;
    sectionHTML += `
      <div class="product">
        ${product.offer ? '<div class="offer-tag">Oferta</div>' : ''}
        <img data-src="images/${imageName}" alt="${product.name}" class="lazy">
        <h3>${product.name}</h3>
        <p>Precio: ${product.offer 
          ? '<s>€' + product.price.toFixed(2) + '</s> <strong>€' + product.price.toFixed(2) + '</strong>' 
          : '€' + product.price.toFixed(2)}</p>
        <div class="quantity-buttons">
          ${quantities.map(value => `<button onclick="setQuantity(this, ${value})">${value}</button>`).join('')}
          <input type="number" placeholder="Otro" oninput="validateInput(this)">
        </div>
        <button id="${buttonId}" class="add-btn" onclick="addToCart(this, '${product.name}', ${product.price})">Agregar</button>
      </div>
    `;
  });
  sectionHTML += `</div>`;
  return sectionHTML;
}

  // Actualiza la lista de productos renderizando todas las secciones  
  function updateProductList() {
    const productListElem = document.getElementById("product-list");
    productListElem.innerHTML = Object.entries(sections)
      .map(([section, products]) => createSection(section, products))
      .join('');
    lazyLoadImages();
  }

  // Función para agregar un producto a una sección (crea la sección si no existe)
  function addProduct(sectionName, product) {
    if (!sections[sectionName]) {
      sections[sectionName] = [];
    }
    sections[sectionName].push(product);
    // Si el producto no tiene sugerencias, asigna unas por defecto
    if (!PRODUCT_QUANTITIES[product.name]) {
      PRODUCT_QUANTITIES[product.name] = [1, 2, 3];
    }
    updateProductList();
  }

  // Función para asignar cantidad al input desde los botones rápidos
  function setQuantity(button, value) {
    let input = button.parentElement.querySelector('input');
    input.value = value;
  }

  // Validar que la cantidad no sea negativa
  function validateInput(input) {
    if (input.value < 0) input.value = 0;
  }

  // Actualiza el total en el display fijo y en el modal
  function updateTotalDisplay(total) {
    document.getElementById('total-display').innerText = 'Total: €' + total.toFixed(2);
    document.getElementById('modal-total').innerText = 'Total: €' + total.toFixed(2);
  }

  // Agrega el producto al carrito, reproduce un sonido y actualiza el total  
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

    // Reproducir sonido (si está disponible)
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
        ${productName} - ${quantity} unidades - Precio: €${(productPrice * quantity).toFixed(2)}
        <button class="remove-btn" onclick="removeFromCart(this, '${button.id}')">Eliminar</button>
      </div>
    `;
    updateTotalPrice();
    showToast("Producto añadido: " + productName);
  }

  // Elimina el producto del carrito y actualiza el total
  function removeFromCart(button, buttonId) {
    button.parentElement.remove();
    const addButton = document.getElementById(buttonId);
    if (addButton) {
      addButton.classList.remove('added');
      addButton.style.backgroundColor = '#2c7a7b';
      addButton.innerText = 'Agregar';
    }
    let cartItemsContainer = document.getElementById("cart-items-modal");
    if (cartItemsContainer.children.length === 0) {
      cartItemsContainer.innerHTML = 'No hay productos añadidos.';
    }
    updateTotalPrice();
  }

  // Recalcula el total sumando los precios de cada producto del carrito
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

  // Recoge los datos del carrito y genera un arreglo para exportar a Excel
  function collectCartData() {
    const cartItems = document.querySelectorAll("#cart-items-modal .cart-item");
    if (cartItems.length === 0 || (cartItems[0].innerText && cartItems[0].innerText.includes('No hay productos'))) {
      alert("El carrito está vacío. No puedes enviar un pedido sin productos.");
      return null;
    }
    const order = [];
    cartItems.forEach(item => {
      const parts = item.innerText.split(" - ");
      const product = parts[0].trim();
      const quantity = parseInt(parts[1].replace(" unidades", ""));
      const price = parseFloat(parts[2].replace(" Precio: €", ""));
      order.push({ product, quantity, price });
    });
    return order;
  }

  // Exporta a Excel usando la librería XLSX
  function exportToExcel(order) {
    if (!order) return;
    const worksheet = XLSX.utils.json_to_sheet(order);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedido");
    const filename = `pedido_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, filename);
  }

  function submitOrder() {
    const order = collectCartData();
    if (!order) return;
    if (confirm("¿Estás seguro de que deseas finalizar el pedido?")) {
      exportToExcel(order);
      alert("Pedido enviado con éxito. Gracias por tu compra.");
      // Reiniciar carrito
      document.getElementById("cart-items-modal").innerHTML = 'No hay productos añadidos.';
      updateTotalDisplay(0);
      document.querySelectorAll('.add-btn').forEach(btn => {
        btn.classList.remove('added');
        btn.style.backgroundColor = '#2c7a7b';
        btn.innerText = 'Agregar';
      });
    }
  }

  // Muestra u oculta el modal del carrito
  function toggleCart() {
    document.getElementById("cart-modal").classList.toggle("active");
  }

  // Función para mostrar notificaciones tipo "toast"
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

  // Función que implementa lazy loading usando IntersectionObserver
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
      // Fallback para navegadores sin IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.classList.remove('lazy');
      });
    }
  }

  // Inicialización: renderiza los productos y configura el lazy loading  
  updateProductList();

  // Funcionalidad para arrastrar el botón del carrito y distinguir entre click y drag
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
      // Si no se arrastró, se trata como click
      if (!dragged) {
        toggleCart();
      }
    }, {once: true});
  });
  cartToggle.ondragstart = function() { return false; };

  // Exponer funciones globalmente para usar en atributos inline
  window.toggleCart = toggleCart;
  window.submitOrder = submitOrder;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.setQuantity = setQuantity;
  window.validateInput = validateInput;
  window.addProduct = addProduct; // Para agregar nuevos productos dinámicamente
  window.updateProductList = updateProductList;
});
