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
      showAlert('🔄 Procesando PDF...', 'info');
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

    console.log('🔄 Iniciando conversión de PDF...');

    try {
      // Leer el archivo como ArrayBuffer
      console.log('📖 Leyendo archivo...');
      const arrayBuffer = await file.arrayBuffer();
      console.log('✅ ArrayBuffer obtenido, tamaño:', arrayBuffer.byteLength, 'bytes');
      
      // IMPORTANTE: Convertir ArrayBuffer a Uint8Array
      const uint8Array = new Uint8Array(arrayBuffer);
      console.log('✅ Uint8Array creado, longitud:', uint8Array.length);
      
      // Verificar que los primeros bytes son un PDF válido (%PDF)
      const pdfHeader = String.fromCharCode(uint8Array[0], uint8Array[1], uint8Array[2], uint8Array[3]);
      if (pdfHeader !== '%PDF') {
        throw new Error('El archivo no es un PDF válido');
      }
      console.log('✅ Header PDF válido:', pdfHeader);
      
      // Configurar opciones de carga
      console.log('⚙️ Configurando opciones de carga...');
      const loadingTask = pdfjsLib.getDocument({
         uint8Array,  // USAR uint8Array, NO arrayBuffer
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
        verbosity: 1  // Activar logs para debugging
      });
      
      console.log('📥 Cargando documento PDF...');
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      console.log(`✅ PDF cargado exitosamente: ${totalPages} páginas`);

      progressText.textContent = `Procesando ${totalPages} páginas...`;

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        console.log(`📄 Procesando página ${pageNum} de ${totalPages}...`);
        updateProgress(pageNum, totalPages);

        const page = await pdf.getPage(pageNum);
        console.log(`✅ Página ${pageNum} obtenida`);
        
        // Escala de renderizado
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });
        console.log(`📐 Viewport: ${viewport.width}x${viewport.height}`);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { 
          willReadFrequently: false,
          alpha: false
        });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        console.log(`🎨 Renderizando página ${pageNum}...`);
        await page.render({ 
          canvasContext: context, 
          viewport: viewport,
          intent: 'print'
        }).promise;
        console.log(`✅ Página ${pageNum} renderizada`);

        // Convertir a blob JPG
        console.log(`💾 Convirtiendo página ${pageNum} a JPEG...`);
        const blob = await new Promise(resolve => 
          canvas.toBlob(resolve, 'image/jpeg', 0.85)
        );
        console.log(`✅ Blob creado, tamaño: ${(blob.size / 1024).toFixed(2)} KB`);
        
        // Nombre del archivo
        const sectionName = section.toLowerCase().replace(/\s+/g, '_');
        const fileName = `${sectionName}_${pageNum - 1}.jpg`;

        // Subir a Firebase Storage
        console.log(`☁️ Subiendo ${fileName} a Firebase...`);
        await uploadToFirebase(blob, fileName, section);
        console.log(`✅ ${fileName} subido exitosamente`);

        // Crear preview
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg', 0.85);
        img.className = 'preview-image';
        img.alt = `Página ${pageNum}`;
        previewContainer.appendChild(img);
        
        // Limpiar canvas de memoria
        canvas.width = 0;
        canvas.height = 0;
        
        // Liberar memoria de la página
        page.cleanup();
      }
      
      // Limpiar PDF de memoria
      console.log('🧹 Limpiando recursos...');
      pdf.cleanup();
      pdf.destroy();
      console.log('✅ Conversión completada exitosamente');
      
    } catch (error) {
      console.error('❌ Error detallado en convertPDFToImages:', error);
      console.error('Stack trace:', error.stack);
      throw new Error(`Error al procesar PDF: ${error.message}`);
    }
  }

  async function uploadToFirebase(blob, fileName, section) {
    if (!storage || !storageModule) {
      throw new Error('Firebase Storage no está inicializado. Espera unos segundos e intenta de nuevo.');
    }

    const { ref, uploadBytes, getDownloadURL } = storageModule;
    
    // Normalizar nombre de sección para usar como carpeta
    const folderName = section.toLowerCase().replace(/\s+/g, '_');
    
    // Crear referencia con estructura: images/{seccion}/{archivo}
    const storageRef = ref(storage, `images/${folderName}/${fileName}`);
    
    // Subir archivo
    const snapshot = await uploadBytes(storageRef, blob);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log(`✅ Subido a: images/${folderName}/${fileName}`);
    console.log(`🔗 URL: ${downloadURL}`);
    
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
