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
    { id: 'FEM_COVIRAN_SIGUIENTE', name: 'FEM COVIRAN SIGUIENTE' }
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
      promotionForm.style.display = 'none';
      return;
    }

    promotionForm.style.display = 'block';
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
      await savePromotionData(promoId, { startDate, endDate, active });
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
        startDateInput.value = data.startDate || '';
        endDateInput.value = data.endDate || '';
        activeCheckbox.checked = data.active !== false;
        
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

    await setDoc(docRef, {
      ...data,
      lastUpdated: serverTimestamp()
    }, { merge: true });

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
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const status = data.active ? '🟢 Activa' : '🔴 Inactiva';
        const statusColor = data.active ? '#28a745' : '#dc3545';
        
        html += `
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid ${statusColor};">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 1.1rem;">${doc.id.replace(/_/g, ' ')}</strong>
              <span style="color: ${statusColor}; font-weight: bold;">${status}</span>
            </div>
            <div style="margin-top: 8px; color: #666;">
              📅 ${data.startDate || 'Sin fecha'} → ${data.endDate || 'Sin fecha'}
            </div>
          </div>
        `;
      });
      
      html += '</div>';
      promotionsList.innerHTML = html;
      
    } catch (error) {
      console.error('Error al cargar promociones:', error);
      promotionsList.innerHTML = '<p style="color: #dc3545;">❌ Error al cargar promociones</p>';
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
