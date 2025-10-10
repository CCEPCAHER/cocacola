// =========================================================================
// admin.js - Panel de Administración con Firebase Storage (VERSIÓN MEJORADA)
// =========================================================================

// Verificar si el DOM ya está listo o esperar el evento
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPDFConverter);
} else {
  initPDFConverter();
}

// =========================================================================
// 1. CONFIGURACIÓN DE FIREBASE STORAGE
// =========================================================================
let storage;
let storageModule;

// Esperar a que Firebase esté disponible
const waitForFirebase = setInterval(() => {
  if (window.adminAuth && window.adminAuth.auth) {
    clearInterval(waitForFirebase);
    // Importar Storage
    import('https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js')
      .then(module => {
        const { getStorage, ref, uploadBytes, getDownloadURL, listAll } = module;
        storage = getStorage(window.adminAuth.auth.app);
        storageModule = { ref, uploadBytes, getDownloadURL, listAll };
        console.log('✅ Firebase Storage inicializado');
      })
      .catch(err => console.error('❌ Error al cargar Storage:', err));
  }
}, 100);

// =========================================================================
// 2. CONVERTIDOR DE PDF A IMÁGENES
// =========================================================================
function initPDFConverter() {
  const sectionSelector = document.getElementById('section-selector');
  const dropArea = document.getElementById('drop-area');
  const pdfInput = document.getElementById('pdf-input');
  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const alertContainer = document.getElementById('alert-container');
  const previewContainer = document.getElementById('preview-container');

  // Verificar que los elementos existen
  if (!sectionSelector || !dropArea || !pdfInput) {
    console.error('❌ No se encontraron los elementos del DOM');
    return;
  }

  // Configurar PDF.js worker ANTES de cualquier operación
  console.log('🔧 Configurando PDF.js...');
  
  if (typeof pdfjsLib === 'undefined') {
    console.error('❌ PDF.js no está cargado. Verifica que la biblioteca esté incluida.');
    showAlert('❌ Error: PDF.js no está cargado correctamente', 'error');
    return;
  }
  
  pdfjsLib.GlobalWorkerOptions.workerSrc = 
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  
  console.log('✅ PDF.js configurado correctamente');
  console.log('📦 Versión de PDF.js:', pdfjsLib.version);

  // Cargar secciones
  loadSections();

  // Eventos drag & drop
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
  });

  dropArea.addEventListener('drop', handleDrop, false);
  dropArea.addEventListener('click', () => pdfInput.click());
  pdfInput.addEventListener('change', handleFileSelect);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  function handleFileSelect(e) {
    const files = e.target.files;
    handleFiles(files);
  }

  async function handleFiles(files) {
    if (!files.length) return;

    const file = files[0];
    
    console.log('📁 Archivo seleccionado:', {
      nombre: file.name,
      tamaño: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      tipo: file.type
    });
    
    // Validar tamaño del archivo (máximo 10 MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showAlert(`⚠️ El archivo es muy grande (${(file.size / 1024 / 1024).toFixed(2)} MB). Máximo permitido: 10 MB`, 'warning');
      return;
    }

    const section = sectionSelector.value;
    if (!section) {
      showAlert('⚠️ Selecciona una sección primero', 'warning');
      return;
    }

    if (file.type !== 'application/pdf') {
      showAlert('❌ Solo se permiten archivos PDF', 'error');
      return;
    }

    try {
      showAlert(`🔄 Iniciando procesamiento de "${file.name}" (${(file.size / 1024 / 1024).toFixed(2)} MB)`, 'info');
      progressContainer.style.display = 'block';
      previewContainer.innerHTML = '';

      await convertPDFToImages(file, section);

      showAlert('✅ ¡PDF convertido y subido a Firebase con éxito!', 'success');
    } catch (error) {
      console.error('❌ Error completo:', error);
      showAlert(`❌ Error: ${error.message}`, 'error');
    } finally {
      progressContainer.style.display = 'none';
      progressFill.style.width = '0%';
      progressFill.textContent = '0%';
      pdfInput.value = '';
    }
  }

  async function convertPDFToImages(file, section) {
    // Verificar que pdf.js esté cargado
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('PDF.js no está cargado. Por favor recarga la página.');
    }

    console.log('==========================================');
    console.log('🔄 INICIANDO CONVERSIÓN DE PDF');
    console.log('==========================================');

    try {
      // PASO 1: Leer archivo
      showAlert('📖 Paso 1/5: Leyendo archivo PDF...', 'info');
      updateProgress(0, 5, 'Leyendo archivo...');
      
      const arrayBuffer = await file.arrayBuffer();
      console.log('✅ ArrayBuffer obtenido, tamaño:', arrayBuffer.byteLength, 'bytes');
      
      // PASO 2: Validar PDF
      showAlert('🔍 Paso 2/5: Validando formato PDF...', 'info');
      updateProgress(1, 5, 'Validando PDF...');
      
      const uint8Array = new Uint8Array(arrayBuffer);
      const pdfHeader = String.fromCharCode(uint8Array[0], uint8Array[1], uint8Array[2], uint8Array[3]);
      
      if (pdfHeader !== '%PDF') {
        throw new Error(`El archivo no es un PDF válido. Header: "${pdfHeader}"`);
      }
      console.log('✅ PDF válido detectado');
      
      // PASO 3: Cargar documento
      showAlert('📥 Paso 3/5: Cargando documento PDF...', 'info');
      updateProgress(2, 5, 'Cargando documento...');
      
      const loadingTask = pdfjsLib.getDocument({
         uint8Array,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
        verbosity: 1
      });
      
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      console.log(`✅ PDF cargado: ${totalPages} páginas`);
      
      // PASO 4: Convertir páginas
      showAlert(`🎨 Paso 4/5: Convirtiendo ${totalPages} páginas a imágenes...`, 'info');

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        updateProgress(pageNum, totalPages, `Convirtiendo página ${pageNum}/${totalPages}...`);
        
        showAlert(`🎨 Convirtiendo página ${pageNum} de ${totalPages}...`, 'info');

        const page = await pdf.getPage(pageNum);
        
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { 
          willReadFrequently: false,
          alpha: false
        });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ 
          canvasContext: context, 
          viewport: viewport,
          intent: 'print'
        }).promise;

        const blob = await new Promise(resolve => 
          canvas.toBlob(resolve, 'image/jpeg', 0.85)
        );
        
        const sectionName = section.toLowerCase().replace(/\s+/g, '_');
        const fileName = `${sectionName}_${pageNum - 1}.jpg`;

        // PASO 5: Subir a Firebase
        showAlert(`☁️ Subiendo ${fileName} a Firebase Storage...`, 'info');
        await uploadToFirebase(blob, fileName, section);
        
        showAlert(`✅ ${fileName} subido correctamente (${(blob.size / 1024).toFixed(0)} KB)`, 'success');

        // Crear preview
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg', 0.85);
        img.className = 'preview-image';
        img.alt = `Página ${pageNum}`;
        img.title = `${fileName} - ${(blob.size / 1024).toFixed(0)} KB`;
        previewContainer.appendChild(img);
        
        // Limpiar memoria
        canvas.width = 0;
        canvas.height = 0;
        page.cleanup();
      }
      
      // PASO 5: Finalizar
      updateProgress(5, 5, '¡Completado!');
      showAlert(`🎉 Proceso completado: ${totalPages} imágenes convertidas y subidas`, 'success');
      
      pdf.cleanup();
      pdf.destroy();
      console.log('==========================================');
      console.log('✅ CONVERSIÓN COMPLETADA EXITOSAMENTE');
      console.log('==========================================\n');
      
    } catch (error) {
      console.error('==========================================');
      console.error('❌ ERROR EN CONVERSIÓN DE PDF');
      console.error('==========================================');
      console.error('Tipo de error:', error.name);
      console.error('Mensaje:', error.message);
      console.error('Stack completo:', error.stack);
      console.error('==========================================\n');
      throw new Error(`Error al procesar PDF: ${error.message}`);
    }
  }

  async function uploadToFirebase(blob, fileName, section) {
    // Esperar hasta 10 segundos a que Storage se inicialice
    let attempts = 0;
    while ((!storage || !storageModule) && attempts < 100) {
      if (attempts === 0) {
        showAlert('⏳ Esperando a que Firebase Storage esté listo...', 'info');
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!storage || !storageModule) {
      throw new Error('Firebase Storage no pudo inicializarse. Recarga la página e intenta de nuevo.');
    }

    const { ref, uploadBytes, getDownloadURL } = storageModule;
    
    const folderName = section.toLowerCase().replace(/\s+/g, '_');
    const storageRef = ref(storage, `images/${folderName}/${fileName}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log(`✅ Subido: images/${folderName}/${fileName}`);
      console.log(`🔗 URL: ${downloadURL}`);
      
      return downloadURL;
    } catch (error) {
      console.error('❌ Error en uploadBytes:', error);
      throw new Error(`Error al subir ${fileName}: ${error.message}`);
    }
  }

  function updateProgress(current, total, message = '') {
    const percent = Math.round((current / total) * 100);
    progressFill.style.width = percent + '%';
    progressFill.textContent = percent + '%';
    progressText.textContent = message || `Procesando ${current} de ${total}...`;
  }

  function showAlert(message, type) {
    const timestamp = new Date().toLocaleTimeString('es-ES');
    alertContainer.innerHTML = `
      <div class="alert alert-${type}">
        <strong>[${timestamp}]</strong> ${message}
      </div>
    `;
    
    // No ocultar automáticamente mensajes de éxito/error para que se vean
    if (type === 'info') {
      setTimeout(() => {
        // Solo limpiar si no hay otro mensaje más reciente
        const currentAlert = alertContainer.querySelector('.alert-info');
        if (currentAlert) {
          alertContainer.innerHTML = '';
        }
      }, 3000);
    }
  }

  function loadSections() {
    const sections = [
      "FOCOS",
      "EEAA Y PUNTUACION",
      "ORDEN DE MARCAS",
      "FEM ALCAMPO",
      "FEM CARREFOUR",
      "FEM CARREFOUR MARKET",
      "FEM SUPECO",
      "FEM SORLI",
      "FEM SCLAT BONPREU",
      "FEM CAPRABO",
      "FEM CONSUM",
      "FEM CONDIS",
      "FEM COVIRAN",
      "IMPLANTACIONES",
      "Coca Cola",
      "Coca Cola Zero",
      "coca cola light",
      "Coca Cola Zero Zero",
      "Coca Cola Sabores",
      "Fanta naranja",
      "Fanta limón",
      "Fanta sabores",
      "Sprite",
      "Tónica",
      "Burn",
      "Energéticas",
      "M.Maid",
      "FUZE",
      "Deportivas",
      "Isotónicas",
      "Appletiser",
      "Aquabona",
      "Alcoholes"
    ];

    sections.forEach(section => {
      const option = document.createElement('option');
      option.value = section;
      option.textContent = section;
      sectionSelector.appendChild(option);
    });
  }
}
