// =========================================================================
// admin.js - Panel de Administración con Firebase Storage (OPTIMIZADO Y SEGURO)
// =========================================================================

// =========================================================================
// 1. CONFIGURACIÓN DE FIREBASE STORAGE Y UTILIDADES
// =========================================================================
let storage;
let storageModule;

// Esperar a que Firebase esté disponible
const waitForFirebase = setInterval(() => {
  // Asumo que 'adminAuth' ya está disponible en window con 'app' o 'auth'
  if (window.adminAuth && (window.adminAuth.app || window.adminAuth.auth)) {
    clearInterval(waitForFirebase);

    // Cargar Firebase Storage dinámicamente
    import('https://www.gstatic.com/firebasejs/11.6.0/firebase-storage.js')
      .then(module => {
        const { getStorage, ref, uploadBytes, getDownloadURL, listAll } = module;
        const app = window.adminAuth.app || window.adminAuth.auth.app;
        storage = getStorage(app);
        storageModule = { ref, uploadBytes, getDownloadURL, listAll };
        console.log('✅ Firebase Storage inicializado');
      })
      .catch(err => console.error('❌ Error al cargar Storage:', err));
  }
}, 100);


// =========================================================================
// 2. CONVERTIDOR DE PDF A IMÁGENES
// =========================================================================

// Elementos globales para que las funciones de progreso y alerta puedan acceder
let progressText;
let progressFill;
let progressContainer;
let previewContainer;
let alertContainer;
let sectionSelector; // Necesario para obtener el valor actual en handleFiles

document.addEventListener('DOMContentLoaded', () => {
  initPDFConverter();
});

function initPDFConverter() {
  // Asignar elementos a variables globales/locales
  sectionSelector = document.getElementById('section-selector');
  const dropArea = document.getElementById('drop-area');
  const pdfInput = document.getElementById('pdf-input');
  progressContainer = document.getElementById('progress-container');
  progressFill = document.getElementById('progress-fill');
  progressText = document.getElementById('progress-text');
  alertContainer = document.getElementById('alert-container');
  previewContainer = document.getElementById('preview-container');

  // 🔍 Verificar elementos requeridos
  const requiredElements = {
    sectionSelector,
    dropArea,
    pdfInput,
    progressContainer,
    progressFill,
    progressText,
    alertContainer,
    previewContainer
  };
  for (const [name, el] of Object.entries(requiredElements)) {
    if (!el) console.warn(`⚠️ Falta el elemento ${name} en el HTML`);
  }

  if (!sectionSelector) {
    console.error('❌ No se encontró el elemento section-selector');
    return;
  }

  loadSections();

  // === Eventos Drag & Drop ===
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    if (dropArea) dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    if (dropArea) dropArea.addEventListener(eventName, () => dropArea.classList.add('dragover'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    if (dropArea) dropArea.addEventListener(eventName, () => dropArea.classList.remove('dragover'), false);
  });

  if (dropArea) {
    dropArea.addEventListener('drop', handleDrop, false);
    dropArea.addEventListener('click', () => pdfInput && pdfInput.click());
  }
  if (pdfInput) pdfInput.addEventListener('change', handleFileSelect);

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

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      showAlert('❌ El PDF es demasiado grande. Máximo 100MB', 'error');
      return;
    }

    try {
      showAlert('🔄 Procesando PDF...', 'info');
      if (progressContainer) progressContainer.style.display = 'block';
      if (previewContainer) previewContainer.innerHTML = '';

      // LLAMADA A LA FUNCIÓN DE CONVERSIÓN Y CARGA SEGURA
      await convertAndUploadPDF(file, section);

      showAlert('✅ ¡PDF convertido y subido a Firebase con éxito!', 'success');
    } catch (error) {
      console.error('Error en handleFiles:', error);
      showAlert(`❌ Error: ${error.message}`, 'error');
    } finally {
      if (progressContainer) {
        // La actualización de progreso se hace dentro de convertAndUploadPDF
        // Esta limpieza final se ejecuta solo si el proceso terminó (éxito o error)
        setTimeout(() => (progressContainer.style.display = 'none'), 2000);
      }
      if (progressFill) {
        progressFill.style.width = '0%';
        progressFill.textContent = '0%';
      }
      if (pdfInput) pdfInput.value = ''; // Limpiar input
    }
  }
  
  // =========================================================================
  // FUNCIONES PRINCIPALES DE CONVERSIÓN Y CARGA (VERSION SEGURA)
  // =========================================================================

  /**
   * Procesa la página, la convierte a Blob (JPEG) y la sube a Firebase Storage.
   * @param {Object} pdf - Objeto PDF cargado por pdf.js.
   * @param {number} pageNum - Número de la página a procesar (base 1).
   * @param {string} sectionSlug - El slug de la sección de destino.
   * @param {number} totalPages - Número total de páginas.
   * @returns {Promise<Blob | null>} El Blob de la imagen generada o null en caso de error/no preview.
   */
  async function processAndUploadPage(pdf, pageNum, sectionSlug, totalPages) {
    try {
      const page = await pdf.getPage(pageNum);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Crear y configurar el canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Renderizar página en canvas
      await page.render({ canvasContext: context, viewport }).promise;

      // Convertir canvas a Blob (JPEG)
      const blob = await canvasToBlob(canvas, 0.85);

      // Subir a Firebase
      const sectionName = sectionSlug.toLowerCase().replace(/\s+/g, '_');
      // Usamos pageNum - 1 para que el índice sea base 0 en el nombre del archivo si es necesario,
      // pero mantenemos el nombre de archivo con un número secuencial simple.
      const fileName = `${sectionName}_${pageNum - 1}.jpg`; 
      await uploadToFirebaseWithRetry(blob, fileName, sectionSlug, 3);
      
      // Actualizar progreso
      updateProgress(pageNum, totalPages);
      console.log(`✅ Página ${pageNum}/${totalPages} subida: ${fileName}`);

      // Generar preview si es una de las primeras páginas
      let previewBlob = null;
      if (previewContainer && pageNum <= 10) {
        // En este caso, el mismo blob subido sirve para el preview.
        previewBlob = blob; 
      }

      // Limpiar recursos
      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.remove();

      return previewBlob;
    } catch (error) {
      console.error(`❌ Error procesando página ${pageNum}:`, error);
      throw new Error(`Error en página ${pageNum}: ${error.message}`);
    }
  }

  /**
   * Convierte y carga un archivo PDF página por página de forma segura.
   * @param {File} file - El objeto File del PDF.
   * @param {string} sectionSlug - El slug de la sección de destino.
   */
  async function convertAndUploadPDF(file, sectionSlug) {
    // Verificar pdf.js
    if (typeof pdfjsLib === 'undefined') {
      console.warn('📦 Cargando pdf.js dinámicamente...');
      const module = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
      window.pdfjsLib = module.pdfjsLib || module;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Leer a ArrayBuffer (SEGURO)
    const arrayBuffer = await file.arrayBuffer();
    // Envolver SIEMPRE en Uint8Array (SEGURO para la carga de datos)
    const uint8 = new Uint8Array(arrayBuffer);

    // Cargar el PDF con la forma correcta (usando 'data')
    const loadingTask = pdfjsLib.getDocument({ data: uint8 });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    if (progressText) progressText.textContent = `Encontradas ${numPages} páginas. Convirtiendo...`;
    
    // Configuración de procesamiento concurrente (lotes)
    const batchSize = numPages > 30 ? 3 : 5;
    let uploadedCount = 0;
    
    // Limpiar el contenedor de previsualización al inicio
    if (previewContainer) previewContainer.innerHTML = ''; 

    for (let i = 1; i <= numPages; i += batchSize) {
      const endPage = Math.min(i + batchSize - 1, numPages);
      const batchPromises = [];
      
      for (let pageNum = i; pageNum <= endPage; pageNum++) {
        batchPromises.push(processAndUploadPage(pdf, pageNum, sectionSlug, numPages));
      }
      
      try {
        const pageBlobs = await Promise.all(batchPromises);
        uploadedCount += batchPromises.length;
        
        // Mostrar previews de las primeras páginas (si el blob fue devuelto)
        pageBlobs.forEach((pageBlob, index) => {
           const pageNum = i + index;
           if (previewContainer && pageBlob) {
             const imgUrl = URL.createObjectURL(pageBlob);
             const img = document.createElement("img");
             img.src = imgUrl;
             img.className = 'preview-image';
             img.alt = `Página ${pageNum}`;
             previewContainer.appendChild(img);
             // Liberar la URL de objeto después de un tiempo
             setTimeout(() => URL.revokeObjectURL(imgUrl), 5000); 
           }
        });
        
        console.log(`✅ Lote completado: ${uploadedCount}/${numPages}`);
        await new Promise(resolve => setTimeout(resolve, 100)); // Pequeña pausa
        
      } catch (error) {
         console.error(`❌ Error en lote ${i / batchSize + 1}:`, error);
         throw error; // Re-lanzar error para que handleFiles lo capture
      }
    }
    
    // Asegurar que el progreso se muestre al 100% al finalizar
    updateProgress(numPages, numPages); 
  }
  
  // =========================================================================
  // FUNCIONES AUXILIARES
  // =========================================================================

  function canvasToBlob(canvas, quality) {
    return new Promise((resolve, reject) => {
      try {
        if (canvas.toBlob) {
          canvas.toBlob(
            blob => {
              if (blob) resolve(blob);
              else resolve(dataURLtoBlob(canvas.toDataURL('image/jpeg', quality)));
            },
            'image/jpeg',
            quality
          );
        } else {
          resolve(dataURLtoBlob(canvas.toDataURL('image/jpeg', quality)));
        }
      } catch (error) {
        console.error('Error en canvasToBlob:', error);
        reject(error);
      }
    });
  }

  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
  }

  async function uploadToFirebaseWithRetry(blob, fileName, section, maxRetries = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await uploadToFirebase(blob, fileName, section);
        return;
      } catch (error) {
        lastError = error;
        console.warn(`⚠️ Intento ${attempt}/${maxRetries} falló para ${fileName}: ${error.message}`);
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    throw new Error(`Fallo después de ${maxRetries} intentos: ${lastError.message}`);
  }

  async function uploadToFirebase(blob, fileName, section) {
    if (!storage || !storageModule) {
      throw new Error('Firebase Storage no está inicializado');
    }

    const { ref, uploadBytes } = storageModule;
    const folderName = section.toLowerCase().replace(/\s+/g, '_');
    const storageRef = ref(storage, `images/${folderName}/${fileName}`);

    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        section
      }
    };

    const uploadPromise = uploadBytes(storageRef, blob, metadata);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: La subida tardó más de 30 segundos')), 30000)
    );

    const snapshot = await Promise.race([uploadPromise, timeoutPromise]);
    // El getDownloadURL no es estrictamente necesario para la subida
    // Si se necesita la URL en el frontend:
    // const downloadURL = await getDownloadURL(snapshot.ref); 
    // console.log(`✅ Subido a: images/${folderName}/${fileName}`);
    // return downloadURL;
    return snapshot;
  }

  function updateProgress(current, total) {
    if (progressFill && progressText) {
      const percent = Math.round((current / total) * 100);
      progressFill.style.width = percent + '%';
      progressFill.textContent = percent + '%';
      progressText.textContent = `Subidas ${current} de ${total} páginas (${percent}%)`;
    }
  }

  function showAlert(message, type) {
    if (alertContainer) {
      alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
      if (['info', 'success'].includes(type)) {
        setTimeout(() => {
          alertContainer.innerHTML = '';
        }, 4000);
      }
    }
  }

  // === Cargar secciones ===
  function loadSections() {
    const sections = [
      "FOCOS", "EEAA Y PUNTUACION", "ORDEN DE MARCAS", "ACUERDO NACIONAL 2025",
      "FEM ALCAMPO", "FEM ALCAMPO SIGUIENTE", "FEM CARREFOUR", "FEM CARREFOUR SIGUIENTE", "FEM CARREFOUR MARKET", "FEM CARREFOUR MARKET SIGUIENTE",
      "FEM SUPECO", "FEM SUPECO SIGUIENTE", "FEM SORLI", "FEM SORLI SIGUIENTE", "FEM SCLAT BONPREU", "FEM SCLAT BONPREU SIGUIENTE",
      "FEM CAPRABO", "FEM CAPRABO SIGUIENTE", "FEM CONSUM", "FEM CONSUM SIGUIENTE", "FEM CONDIS", "FEM CONDIS SIGUIENTE", "FEM COVIRAN", "FEM COVIRAN SIGUIENTE",
      "IMPLANTACIONES"
    ];

    console.log('📋 Cargando secciones...', sections.length);

    if (sectionSelector) {
      sections.forEach(section => {
        const option = document.createElement('option');
        option.value = section;
        option.textContent = section;
        sectionSelector.appendChild(option);
      });
      console.log('✅ Secciones cargadas:', sectionSelector.options.length);
    }
  }
}