// =========================================================================
// admin-promotions.js - Gestión de fechas de promociones
// =========================================================================

let db;
let dbModule;

// Esperar a que Firestore esté disponible
const waitForFirestore = setInterval(() => {
  if (window.adminAuth && window.adminAuth.auth) {
    clearInterval(waitForFirestore);
    
    import('https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js')
      .then(module => {
        const { getFirestore, collection, doc, getDoc, setDoc, getDocs, serverTimestamp } = module;
        db = getFirestore(window.adminAuth.auth.app);
        dbModule = { collection, doc, getDoc, setDoc, getDocs, serverTimestamp };
        console.log('✅ Firestore inicializado para promociones');
        
        // Inicializar gestión de promociones
        initPromotionManager();
      })
      .catch(err => console.error('❌ Error al cargar Firestore:', err));
  }
}, 100);

function initPromotionManager() {
  const promotionSelector = document.getElementById('promotion-selector');
  const promotionForm = document.getElementById('promotion-dates-form');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  const activeCheckbox = document.getElementById('promotion-active');
  const saveBtn = document.getElementById('save-promotion-btn');
  const statusDiv = document.getElementById('promotion-status');
  const promotionsList = document.getElementById('promotions-list');

  if (!promotionSelector || !promotionForm) {
    console.error('❌ Elementos de promociones no encontrados');
    return;
  }

  // Lista de promociones disponibles
  // NOTA: "ORDEN DE MARCAS" y "EEAA Y PUNTUACION" no tienen fechas de promoción
  const promotions = [
    { id: 'ACUERDO_NACIONAL_2025', name: 'ACUERDO NACIONAL 2025' },
    { id: 'FOCOS', name: 'FOCOS' },
    { id: 'FEM_ALCAMPO', name: 'FEM ALCAMPO' },
    { id: 'FEM_ALCAMPO_SIGUIENTE', name: 'FEM ALCAMPO SIGUIENTE' },
    { id: 'FEM_CARREFOUR', name: 'FEM CARREFOUR' },
    { id: 'FEM_CARREFOUR_SIGUIENTE', name: 'FEM CARREFOUR SIGUIENTE' },
    { id: 'FEM_CARREFOUR_MARKET', name: 'FEM CARREFOUR MARKET' },
    { id: 'FEM_CARREFOUR_MARKET_SIGUIENTE', name: 'FEM CARREFOUR MARKET SIGUIENTE' },
    { id: 'FEM_SUPECO', name: 'FEM SUPECO' },
    { id: 'FEM_SUPECO_SIGUIENTE', name: 'FEM SUPECO SIGUIENTE' },
    { id: 'FEM_SORLI', name: 'FEM SORLI' },
    { id: 'FEM_SORLI_SIGUIENTE', name: 'FEM SORLI SIGUIENTE' },
    { id: 'FEM_SCLAT_BONPREU', name: 'FEM SCLAT BONPREU' },
    { id: 'FEM_SCLAT_BONPREU_SIGUIENTE', name: 'FEM SCLAT BONPREU SIGUIENTE' },
    { id: 'FEM_CAPRABO', name: 'FEM CAPRABO' },
    { id: 'FEM_CAPRABO_SIGUIENTE', name: 'FEM CAPRABO SIGUIENTE' },
    { id: 'FEM_CONSUM', name: 'FEM CONSUM' },
    { id: 'FEM_CONSUM_SIGUIENTE', name: 'FEM CONSUM SIGUIENTE' },
    { id: 'FEM_CONDIS', name: 'FEM CONDIS' },
    { id: 'FEM_CONDIS_SIGUIENTE', name: 'FEM CONDIS SIGUIENTE' },
    { id: 'FEM_COVIRAN', name: 'FEM COVIRAN' },
    { id: 'FEM_COVIRAN_SIGUIENTE', name: 'FEM COVIRAN SIGUIENTE' },
    { id: 'FEM_ECI', name: 'FEM ECI' },
    { id: 'FEM_ECI_SIGUIENTE', name: 'FEM ECI SIGUIENTE' }
  ];

  // Poblar selector de promociones
  promotions.forEach(promo => {
    const option = document.createElement('option');
    option.value = promo.id;
    option.textContent = promo.name;
    promotionSelector.appendChild(option);
  });

  // Cargar lista de promociones activas al inicio
  loadActivePromotions();

  // Evento: seleccionar promoción
  promotionSelector.addEventListener('change', async () => {
    const promoId = promotionSelector.value;
    
    if (!promoId) {
      promotionForm.classList.add('hidden');
      return;
    }

    promotionForm.classList.remove('hidden');
    await loadPromotionData(promoId);
  });

  // Evento: guardar cambios
  saveBtn.addEventListener('click', async () => {
    const promoId = promotionSelector.value;
    
    if (!promoId) {
      showPromotionStatus('⚠️ Selecciona una promoción primero', 'warning');
      return;
    }

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const active = activeCheckbox.checked;

    if (!startDate || !endDate) {
      showPromotionStatus('⚠️ Las fechas son obligatorias', 'warning');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      showPromotionStatus('❌ La fecha de inicio debe ser anterior a la fecha de fin', 'error');
      return;
    }

    try {
      // Validar y formatear fechas antes de guardar
      // Las fechas de los inputs ya vienen en formato YYYY-MM-DD
      const formattedStartDate = startDate;
      const formattedEndDate = endDate;
      
      console.log(`📅 Guardando fechas para ${promoId}:`, {
        originalStartDate: startDate,
        formattedStartDate,
        originalEndDate: endDate,
        formattedEndDate
      });
      
      await savePromotionData(promoId, { 
        startDate: formattedStartDate, 
        endDate: formattedEndDate, 
        active 
      });
      showPromotionStatus('✅ Promoción guardada exitosamente', 'success');
      loadActivePromotions();
    } catch (error) {
      console.error('Error al guardar:', error);
      showPromotionStatus('❌ Error al guardar: ' + error.message, 'error');
    }
  });

  // Cargar datos de una promoción desde Firestore
  async function loadPromotionData(promoId) {
    if (!db || !dbModule) {
      showPromotionStatus('⏳ Firestore no está listo. Espera un momento.', 'info');
      return;
    }

    try {
      const { doc, getDoc } = dbModule;
      const docRef = doc(db, 'promotions', promoId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Función helper para convertir fechas a formato YYYY-MM-DD
        const formatDateForInput = (dateValue) => {
          if (!dateValue) return '';
          
          // Si es un Timestamp de Firestore
          if (dateValue && typeof dateValue.toDate === 'function') {
            const d = dateValue.toDate();
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
          
          // Si es un string de fecha
          if (typeof dateValue === 'string') {
            // Verificar si ya está en formato YYYY-MM-DD
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
              return dateValue;
            }
            // Convertir otros formatos de fecha
            const date = new Date(dateValue);
            if (!isNaN(date.getTime())) {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`;
            }
          }
          
          // Si es un objeto Date
          if (dateValue instanceof Date) {
            const year = dateValue.getFullYear();
            const month = String(dateValue.getMonth() + 1).padStart(2, '0');
            const day = String(dateValue.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
          
          return '';
        };
        
        startDateInput.value = formatDateForInput(data.startDate);
        endDateInput.value = formatDateForInput(data.endDate);
        activeCheckbox.checked = data.active !== false;
        
        console.log(`📅 Fechas cargadas para ${promoId}:`, {
          startDate: data.startDate,
          formattedStartDate: startDateInput.value,
          endDate: data.endDate,
          formattedEndDate: endDateInput.value
        });
        
        showPromotionStatus(`✅ Datos cargados de Firestore`, 'success');
      } else {
        // Valores por defecto si no existe
        startDateInput.value = '';
        endDateInput.value = '';
        activeCheckbox.checked = true;
        
        showPromotionStatus('ℹ️ Nueva promoción (no existe en Firestore aún)', 'info');
      }
    } catch (error) {
      console.error('Error al cargar promoción:', error);
      showPromotionStatus('❌ Error al cargar datos: ' + error.message, 'error');
    }
  }

  // Guardar datos de promoción en Firestore
  async function savePromotionData(promoId, data) {
    if (!db || !dbModule) {
      throw new Error('Firestore no está inicializado');
    }

    const { doc, setDoc, serverTimestamp } = dbModule;
    const docRef = doc(db, 'promotions', promoId);

    // Asegurar que las fechas se guarden como strings en formato YYYY-MM-DD
    const dataToSave = {
      startDate: data.startDate,
      endDate: data.endDate,
      active: data.active,
      lastUpdated: serverTimestamp()
    };

    console.log(`💾 Guardando promoción ${promoId}:`, dataToSave);

    await setDoc(docRef, dataToSave, { merge: true });

    console.log(`✅ Promoción ${promoId} guardada en Firestore`);
  }

  // Cargar y mostrar lista de promociones activas
  async function loadActivePromotions() {
    if (!db || !dbModule) {
      promotionsList.innerHTML = '<p>⏳ Cargando Firestore...</p>';
      setTimeout(loadActivePromotions, 1000);
      return;
    }

    try {
      const { collection, getDocs } = dbModule;
      const querySnapshot = await getDocs(collection(db, 'promotions'));
      
      if (querySnapshot.empty) {
        promotionsList.innerHTML = `
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; border: 2px solid #ffc107;">
            <p style="color: #856404; margin-bottom: 15px; font-weight: bold;">
              ⚠️ No hay promociones configuradas en Firestore
            </p>
            <p style="color: #856404; margin-bottom: 15px;">
              Haz clic en el botón de abajo para crear todas las promociones automáticamente con fechas por defecto.
            </p>
            <button id="init-promotions-btn" class="btn-primary" style="width: 100%;">
              🚀 Inicializar Todas las Promociones
            </button>
          </div>
        `;
        
        // Agregar evento al botón de inicialización
        document.getElementById('init-promotions-btn').addEventListener('click', initializeAllPromotions);
        return;
      }

      let html = '<div style="display: grid; gap: 15px;">';
      const activePromosMap = {};
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        activePromosMap[doc.id] = data;
        
        // Verificar si la fecha de fin ya expiró
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        let isExpired = false;
        if (data.endDate) {
          const end = new Date(data.endDate);
          if (!isNaN(end.getTime()) && end < now) {
            isExpired = true;
          }
        }
        
        let status = '🔴 Inactiva';
        let statusColor = '#6c757d';
        let bgColor = '#e9ecef';
        let borderColor = '#6c757d';
        
        if (data.active !== false) {
          if (isExpired) {
            status = '⚠️ Expirada (Requiere actualización)';
            statusColor = '#d9534f';
            bgColor = '#fff3cd'; // Fondo amarillo de advertencia
            borderColor = '#fd7e14'; // Borde naranja
          } else {
            status = '🟢 Activa';
            statusColor = '#28a745';
            bgColor = '#f8f9fa';
            borderColor = '#28a745';
          }
        }
        
        // Función helper para formatear fechas para mostrar
        const formatDateForDisplay = (dateValue) => {
          if (!dateValue) return 'Sin fecha';
          
          // Si es un Timestamp de Firestore
          if (dateValue && typeof dateValue.toDate === 'function') {
            return dateValue.toDate().toLocaleDateString('es-ES');
          }
          
          // Si es un string de fecha
          if (typeof dateValue === 'string') {
            const date = new Date(dateValue);
            if (!isNaN(date.getTime())) {
              return date.toLocaleDateString('es-ES');
            }
            return dateValue; // Si ya está formateado
          }
          
          // Si es un objeto Date
          if (dateValue instanceof Date) {
            return dateValue.toLocaleDateString('es-ES');
          }
          
          return 'Sin fecha';
        };
        
        html += `
          <div style="background: ${bgColor}; padding: 15px; border-radius: 8px; border-left: 5px solid ${borderColor}; border: 1px solid ${bgColor === '#f8f9fa' ? '#eee' : borderColor}; border-left-width: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 1.1rem; color: #333;">${doc.id.replace(/_/g, ' ')}</strong>
              <span style="color: ${statusColor}; font-weight: bold; font-size: 0.95rem;">${status}</span>
            </div>
            <div style="margin-top: 8px; color: #666; font-size: 0.95rem;">
              📅 ${formatDateForDisplay(data.startDate)} → ${formatDateForDisplay(data.endDate)}
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      promotionsList.innerHTML = html;

      // Ejecutar comprobación automática de traspaso de periodos
      checkAndMigrateExpiredPromotions(activePromosMap);
      
    } catch (error) {
      console.error('Error al cargar promociones:', error);
      promotionsList.innerHTML = '<p style="color: #dc3545;">❌ Error al cargar promociones</p>';
    }
  }

  // === Detección y migración automática de promociones expiradas ===
  async function checkAndMigrateExpiredPromotions(activePromosMap) {
    const PROMOTION_PAIRS = {
      'FEM_ALCAMPO': 'FEM_ALCAMPO_SIGUIENTE',
      'FEM_CARREFOUR': 'FEM_CARREFOUR_SIGUIENTE',
      'FEM_CARREFOUR_MARKET': 'FEM_CARREFOUR_MARKET_SIGUIENTE',
      'FEM_SUPECO': 'FEM_SUPECO_SIGUIENTE',
      'FEM_SORLI': 'FEM_SORLI_SIGUIENTE',
      'FEM_SCLAT_BONPREU': 'FEM_SCLAT_BONPREU_SIGUIENTE',
      'FEM_CAPRABO': 'FEM_CAPRABO_SIGUIENTE',
      'FEM_CONSUM': 'FEM_CONSUM_SIGUIENTE',
      'FEM_CONDIS': 'FEM_CONDIS_SIGUIENTE',
      'FEM_COVIRAN': 'FEM_COVIRAN_SIGUIENTE',
      'FEM_ECI': 'FEM_ECI_SIGUIENTE'
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    for (const [currentId, nextId] of Object.entries(PROMOTION_PAIRS)) {
      const current = activePromosMap[currentId];
      const next = activePromosMap[nextId];

      if (current && next) {
        // Verificar si la fecha de fin de la promoción actual ya expiró
        let isCurrentExpired = false;
        if (current.endDate) {
          const end = new Date(current.endDate);
          if (!isNaN(end.getTime()) && end < now) {
            isCurrentExpired = true;
          }
        }

        // El siguiente periodo debe estar activo y tener fechas configuradas
        const isNextConfigured = next.active !== false && next.startDate && next.endDate;

        if (isCurrentExpired && isNextConfigured) {
          console.log(`🔄 [MIGRACIÓN] Detectada promoción actual expirada: ${currentId} y siguiente configurada: ${nextId}. Iniciando migración...`);
          try {
            await executePromotionMigration(currentId, nextId, current, next);
            break; // Salir del bucle para procesar de una en una y recargar
          } catch (error) {
            console.error(`❌ Error al migrar ${currentId} ← ${nextId}:`, error);
            alert(`❌ Error al traspasar el periodo de ${currentId.replace(/_/g, ' ')}: ${error.message}`);
          }
        }
      }
    }
  }

  async function executePromotionMigration(currentId, nextId, currentData, nextData) {
    // 1. Mostrar mensaje de migración
    const statusDiv = document.getElementById('promotion-status');
    if (statusDiv) {
      statusDiv.innerHTML = `<div class="alert alert-info" style="background: #d1ecf1; border-color: #bee5eb; color: #0c5460; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 500;">⏳ Traspasando automáticamente el periodo de <b>${currentId.replace(/_/g, ' ')}</b> (el periodo actual ha finalizado y el siguiente se activará)... No cierres la página.</div>`;
    }

    try {
      // Cargar Firebase Storage si no está cargado
      const storageModuleObj = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js');
      const { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject } = storageModuleObj;
      const storageInstance = getStorage(window.adminAuth.auth.app);

      const folderCurrent = currentId.replace(/_/g, ' ').toLowerCase().replace(/\s+/g, '_');
      const folderNext = nextId.replace(/_/g, ' ').toLowerCase().replace(/\s+/g, '_');

      const srcRef = ref(storageInstance, `images/${folderNext}/`);
      const destRef = ref(storageInstance, `images/${folderCurrent}/`);

      console.log(`📂 Copiando archivos de storage de images/${folderNext}/ a images/${folderCurrent}/`);

      // 2. Copiar archivos en Storage
      const listResult = await listAll(srcRef);
      
      // Limpiar primero las imágenes antiguas de la carpeta de destino
      const destListResult = await listAll(destRef);
      if (destListResult.items.length > 0) {
        console.log(`🗑️ Limpiando ${destListResult.items.length} imágenes antiguas de images/${folderCurrent}/`);
        await Promise.allSettled(destListResult.items.map(item => deleteObject(item)));
      }

      // Copiar archivos de Siguiente a Actual
      for (const itemRef of listResult.items) {
        try {
          const url = await getDownloadURL(itemRef);
          const response = await fetch(url);
          const blob = await response.blob();
          
          const newFileRef = ref(storageInstance, `images/${folderCurrent}/${itemRef.name}`);
          const metadata = {
            contentType: 'image/jpeg',
            customMetadata: {
              uploadedAt: new Date().toISOString(),
              section: currentId.replace(/_/g, ' ')
            }
          };
          await uploadBytes(newFileRef, blob, metadata);
          console.log(`✅ Copiado: ${itemRef.name} a images/${folderCurrent}/`);
        } catch (e) {
          console.error(`❌ Error copiando archivo ${itemRef.name}:`, e);
          throw new Error(`Error copiando archivo ${itemRef.name}: ${e.message}`);
        }
      }

      // 3. Eliminar archivos de la carpeta Siguiente
      if (listResult.items.length > 0) {
        console.log(`🗑️ Eliminando archivos de origen en images/${folderNext}/`);
        await Promise.allSettled(listResult.items.map(item => deleteObject(item)));
      }

      // 4. Actualizar conteo de imágenes en Firestore metadata/imageCounts
      const { doc, getDoc, setDoc, serverTimestamp } = dbModule;
      const countsDocRef = doc(db, 'metadata', 'imageCounts');
      const countsSnap = await getDoc(countsDocRef);
      const currentCounts = countsSnap.exists() ? countsSnap.data() : {};

      // El nuevo conteo para la sección actual es el que tenía la sección siguiente
      // Y la sección siguiente ahora tiene 0 imágenes
      const nextCount = currentCounts[folderNext] || 0;
      const nowStr = new Date().toISOString();

      await setDoc(countsDocRef, {
        [folderCurrent]: nextCount,
        [`${folderCurrent}_updatedAt`]: nowStr,
        [folderNext]: 0,
        [`${folderNext}_updatedAt`]: nowStr
      }, { merge: true });

      console.log(`📊 Actualizados conteos en Firestore: ${folderCurrent}=${nextCount}, ${folderNext}=0`);

      // 5. Actualizar fechas de las promociones en Firestore
      const currentPromoRef = doc(db, 'promotions', currentId);
      const nextPromoRef = doc(db, 'promotions', nextId);

      // Guardar datos
      await setDoc(currentPromoRef, {
        startDate: nextData.startDate,
        endDate: nextData.endDate,
        active: nextData.active,
        lastUpdated: serverTimestamp()
      }, { merge: true });

      // Desactivar y limpiar el periodo siguiente
      await setDoc(nextPromoRef, {
        startDate: '',
        endDate: '',
        active: false,
        lastUpdated: serverTimestamp()
      }, { merge: true });

      console.log(`📅 Fechas de promociones actualizadas en Firestore.`);

      // 6. Finalizar y recargar UI
      if (statusDiv) {
        statusDiv.innerHTML = `<div class="alert alert-success" style="background: #d4edda; border-color: #c3e6cb; color: #155724; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 500;">✅ Se ha trasladado el periodo <b>${nextData.startDate} → ${nextData.endDate}</b> a la sección actual. La sección siguiente ha quedado vacía y libre.</div>`;
        setTimeout(() => { statusDiv.innerHTML = ''; }, 6000);
      }

      // Recargar la lista en la interfaz
      loadActivePromotions();
      
      // Si loadSectionsStatus está disponible en el ámbito global, llamarlo para refrescar el dashboard
      if (typeof window.loadSectionsStatus === 'function') {
        window.loadSectionsStatus();
      }
    } catch (err) {
      console.error("❌ Error en executePromotionMigration:", err);
      if (statusDiv) {
        statusDiv.innerHTML = `<div class="alert alert-danger" style="background: #f8d7da; border-color: #f5c6cb; color: #721c24; padding: 15px; border-radius: 8px; margin-bottom: 20px;">❌ Error al migrar periodo: ${err.message}</div>`;
      }
    }
  }

  // Inicializar todas las promociones con datos por defecto
  async function initializeAllPromotions() {
    if (!db || !dbModule) {
      alert('❌ Firestore no está listo. Espera un momento.');
      return;
    }

    const confirmInit = confirm('¿Estás seguro de que deseas crear todas las promociones con fechas por defecto?\n\nEsto creará 12 promociones en Firestore.');
    
    if (!confirmInit) return;

    const { doc, setDoc, serverTimestamp } = dbModule;

    const promotionsData = {
      'FEM_ALCAMPO': { startDate: '2025-10-23', endDate: '2025-11-05', active: true },
      'FEM_ALCAMPO_SIGUIENTE': { startDate: '2025-11-06', endDate: '2025-11-19', active: true },
      'FEM_CARREFOUR': { startDate: '2025-10-28', endDate: '2025-11-13', active: true },
      'FEM_CARREFOUR_SIGUIENTE': { startDate: '2025-11-14', endDate: '2025-11-28', active: true },
      'FEM_CARREFOUR_MARKET': { startDate: '2025-10-14', endDate: '2025-10-27', active: true },
      'FEM_CARREFOUR_MARKET_SIGUIENTE': { startDate: '2025-10-28', endDate: '2025-11-11', active: true },
      'FEM_SUPECO': { startDate: '2025-10-25', endDate: '2025-11-08', active: true },
      'FEM_SUPECO_SIGUIENTE': { startDate: '2025-11-08', endDate: '2025-11-22', active: true },
      'FEM_SORLI': { startDate: '2025-10-20', endDate: '2025-11-02', active: true },
      'FEM_SORLI_SIGUIENTE': { startDate: '2025-11-03', endDate: '2025-11-16', active: true },
      'FEM_SCLAT_BONPREU': { startDate: '2025-10-18', endDate: '2025-10-31', active: true },
      'FEM_SCLAT_BONPREU_SIGUIENTE': { startDate: '2025-11-01', endDate: '2025-11-14', active: true },
      'FEM_CAPRABO': { startDate: '2025-10-16', endDate: '2025-10-29', active: true },
      'FEM_CAPRABO_SIGUIENTE': { startDate: '2025-10-30', endDate: '2025-11-12', active: true },
      'FEM_CONSUM': { startDate: '2025-10-22', endDate: '2025-11-04', active: true },
      'FEM_CONSUM_SIGUIENTE': { startDate: '2025-11-05', endDate: '2025-11-18', active: true },
      'FEM_CONDIS': { startDate: '2025-10-22', endDate: '2025-11-04', active: true },
      'FEM_CONDIS_SIGUIENTE': { startDate: '2025-11-05', endDate: '2025-11-18', active: true },
      'FEM_COVIRAN': { startDate: '2025-10-21', endDate: '2025-11-03', active: true },
      'FEM_COVIRAN_SIGUIENTE': { startDate: '2025-11-04', endDate: '2025-11-17', active: true },
      'FEM_ECI': { startDate: '2025-10-24', endDate: '2025-11-06', active: true },
      'FEM_ECI_SIGUIENTE': { startDate: '2025-11-07', endDate: '2025-11-20', active: true },
      'ACUERDO_NACIONAL_2025': { startDate: '2025-10-01', endDate: '2025-10-31', active: true },
      'FOCOS': { startDate: '2025-10-01', endDate: '2025-10-31', active: true }
    };

    try {
      promotionsList.innerHTML = '<p>⏳ Creando promociones...</p>';
      
      let count = 0;
      for (const [id, data] of Object.entries(promotionsData)) {
        const docRef = doc(db, 'promotions', id);
        await setDoc(docRef, {
          ...data,
          lastUpdated: serverTimestamp()
        });
        count++;
        console.log(`✅ Promoción ${id} creada (${count}/${Object.keys(promotionsData).length})`);
      }
      
      alert(`✅ Se han creado ${count} promociones exitosamente`);
      loadActivePromotions();
      
    } catch (error) {
      console.error('Error al inicializar:', error);
      alert('❌ Error al inicializar promociones: ' + error.message);
      promotionsList.innerHTML = `<p style="color: #dc3545;">❌ Error: ${error.message}</p>`;
    }
  }

  function showPromotionStatus(message, type) {
    statusDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
      statusDiv.innerHTML = '';
    }, 4000);
  }
}
