// =========================================================================
// admin.js - Panel de Administración con Firebase Storage (CORREGIDO)
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

  // Configurar PDF.js worker
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

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

    const section = sectionSelector.value;
    if (!section) {
      showAlert('⚠️ Selecciona una sección primero', 'warning');
      return;
    }

    const file = files[0];
    if (file.type !== 'application/pdf') {
      showAlert('❌ Solo se permiten archivos PDF', 'error');
      return;
    }

    try {
      showAlert('🔄 Procesando PDF...', 'info');
      progressContainer.style.display = 'block';
      previewContainer.innerHTML = '';

      await convertPDFToImages(file, section);

      showAlert('✅ ¡PDF convertido y subido a Firebase con éxito!', 'success');
    } catch (error) {
      console.error('Error:', error);
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
      throw new Error('PDF.js no está cargado');
    }

    // Cargar PDF - CORRECCIÓN AQUÍ
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({  arrayBuffer });
    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;

    progressText.textContent = `Procesando ${totalPages} páginas...`;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      updateProgress(pageNum, totalPages);

      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport: viewport }).promise;

      // Convertir a blob JPG
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
      
      // Nombre del archivo
      const sectionName = section.toLowerCase().replace(/\s+/g, '_');
      const fileName = `${sectionName}_${pageNum - 1}.jpg`;

      // Subir a Firebase Storage
      await uploadToFirebase(blob, fileName, section);

      // Crear preview
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/jpeg', 0.95);
      img.className = 'preview-image';
      img.alt = `Página ${pageNum}`;
      previewContainer.appendChild(img);
    }
  }

  async function uploadToFirebase(blob, fileName, section) {
    if (!storage || !storageModule) {
      throw new Error('Firebase Storage no está inicializado');
    }

    const { ref, uploadBytes, getDownloadURL } = storageModule;
    
    // Normalizar nombre de sección para usar como carpeta
    const folderName = section.toLowerCase().replace(/\s+/g, '_');
    
    // Crear referencia con estructura de carpetas: images/{seccion}/{archivo}
    const storageRef = ref(storage, `images/${folderName}/${fileName}`);
    
    // Subir archivo
    const snapshot = await uploadBytes(storageRef, blob);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log(`✅ Subido a: images/${folderName}/${fileName}`);
    console.log(`URL: ${downloadURL}`);
    
    return downloadURL;
  }

  function updateProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    progressFill.style.width = percent + '%';
    progressFill.textContent = percent + '%';
    progressText.textContent = `Procesando página ${current} de ${total}...`;
  }

  function showAlert(message, type) {
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
      alertContainer.innerHTML = '';
    }, 5000);
  }

  function loadSections() {
    const sections = [
      "FOCOS", "EEAA Y PUNTUACION", "ORDEN DE MARCAS",
      "FEM ALCAMPO", "FEM CARREFOUR", "FEM CARREFOUR MARKET",
      "FEM SUPECO", "FEM SORLI", "FEM SCLAT BONPREU",
      "FEM CAPRABO", "FEM CONSUM", "FEM CONDIS", "FEM COVIRAN",
      "IMPLANTACIONES", "Coca Cola", "Coca Cola Zero",
      "coca cola light", "Coca Cola Zero Zero", "Coca Cola Sabores",
      "Fanta naranja", "Fanta limón", "Fanta sabores",
      "Sprite", "Tónica", "Burn", "Energéticas",
      "M.Maid", "FUZE", "Deportivas", "Isotónicas",
      "Appletiser", "Aquabona", "Alcoholes"
    ];

    sections.forEach(section => {
      const option = document.createElement('option');
      option.value = section;
      option.textContent = section;
      sectionSelector.appendChild(option);
    });
  }
}
