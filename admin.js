// =========================================================================
// admin.js - Panel de Administración con Firebase Storage (OPTIMIZADO)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initPDFConverter();
});

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
// 2. CONVERTIDOR DE PDF A IMÁGENES (OPTIMIZADO)
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

    // Validar tamaño del archivo (máximo 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      showAlert('❌ El PDF es demasiado grande. Máximo 50MB', 'error');
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

    // Configurar worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = 
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    // Cargar PDF
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({  arrayBuffer }).promise;
    const totalPages = pdf.numPages;

    console.log(`📄 PDF cargado: ${totalPages} páginas`);
    progressText.textContent = `Procesando ${totalPages} páginas...`;

    // Procesar páginas en lotes para evitar problemas de memoria
    const batchSize = 5; // Procesar 5 páginas a la vez
    let uploadedCount = 0;

    for (let i = 0; i < totalPages; i += batchSize) {
      const endPage = Math.min(i + batchSize, totalPages);
      const batch = [];

      for (let pageNum = i + 1; pageNum <= endPage; pageNum++) {
        batch.push(processPage(pdf, pageNum, section, pageNum));
      }

      // Procesar el lote
      try {
        await Promise.all(batch);
        uploadedCount += batch.length;
        updateProgress(uploadedCount, totalPages);
        console.log(`✅ Lote completado: ${uploadedCount}/${totalPages}`);
        
        // Pequeña pausa entre lotes para liberar memoria
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error en lote ${i / batchSize + 1}:`, error);
        throw error;
      }
    }
  }

  async function processPage(pdf, pageNum, section, displayNum) {
    try {
      const page = await pdf.getPage(pageNum);
      
      // REDUCIR ESCALA para archivos más pequeños y evitar problemas de memoria
      // Cambiar de 2.0 a 1.5 o 1.0 si sigues teniendo problemas
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { willReadFrequently: false });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport: viewport }).promise;

      // Convertir a blob JPG con calidad reducida para móviles
      const quality = 0.85; // Reducir de 0.95 a 0.85
      const blob = await canvasToBlob(canvas, quality);
      
      // Nombre del archivo
      const sectionName = section.toLowerCase().replace(/\s+/g, '_');
      const fileName = `${sectionName}_${pageNum - 1}.jpg`;

      // Subir a Firebase Storage con reintentos
      await uploadToFirebaseWithRetry(blob, fileName, section, 3);

      // Crear preview (solo para las primeras 10 páginas para no saturar)
      if (pageNum <= 10) {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg', quality);
        img.className = 'preview-image';
        img.alt = `Página ${displayNum}`;
        previewContainer.appendChild(img);
      }

      // Limpiar canvas para liberar memoria
      canvas.width = 0;
      canvas.height = 0;
      
      console.log(`✅ Página ${displayNum} subida`);
      
    } catch (error) {
      console.error(`❌ Error procesando página ${displayNum}:`, error);
      throw new Error(`Error en página ${displayNum}: ${error.message}`);
    }
  }

  // Función mejorada para convertir canvas a blob con soporte cross-browser
  function canvasToBlob(canvas, quality) {
    return new Promise((resolve, reject) => {
      try {
        // Intentar usar toBlob nativo
        if (canvas.toBlob) {
          canvas.toBlob(
            blob => {
              if (blob) {
                resolve(blob);
              } else {
                // Fallback a dataURL si toBlob falla
                resolve(dataURLtoBlob(canvas.toDataURL('image/jpeg', quality)));
              }
            },
            'image/jpeg',
            quality
          );
        } else {
          // Fallback para navegadores que no soportan toBlob
          resolve(dataURLtoBlob(canvas.toDataURL('image/jpeg', quality)));
        }
      } catch (error) {
        console.error('Error en canvasToBlob:', error);
        reject(error);
      }
    });
  }

  // Convertir dataURL a Blob (fallback)
  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  // Subir con reintentos automáticos
  async function uploadToFirebaseWithRetry(blob, fileName, section, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await uploadToFirebase(blob, fileName, section);
        return; // Éxito
      } catch (error) {
        lastError = error;
        console.warn(`⚠️ Intento ${attempt}/${maxRetries} falló para ${fileName}: ${error.message}`);
        
        if (attempt < maxRetries) {
          // Espera exponencial: 1s, 2s, 4s
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

    const { ref, uploadBytes, getDownloadURL } = storageModule;
    
    // Normalizar nombre de sección para usar como carpeta
    const folderName = section.toLowerCase().replace(/\s+/g, '_');
    
    // Crear referencia con estructura de carpetas: images/{seccion}/{archivo}
    const storageRef = ref(storage, `images/${folderName}/${fileName}`);
    
    // Configurar metadata
    const metadata = {
      contentType: 'image/jpeg',
      customMeta {
        'uploadedAt': new Date().toISOString(),
        'section': section
      }
    };
    
    // Subir archivo con timeout
    const uploadPromise = uploadBytes(storageRef, blob, metadata);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout: La subida tardó más de 30 segundos')), 30000)
    );
    
    const snapshot = await Promise.race([uploadPromise, timeoutPromise]);
    
    // Obtener URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log(`✅ Subido a: images/${folderName}/${fileName}`);
    
    return downloadURL;
  }

  function updateProgress(current, total) {
    const percent = Math.round((current / total) * 100);
    progressFill.style.width = percent + '%';
    progressFill.textContent = percent + '%';
    progressText.textContent = `Subidas ${current} de ${total} páginas (${percent}%)`;
  }

  function showAlert(message, type) {
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    
    // Auto-ocultar solo para mensajes de info
    if (type === 'info') {
      setTimeout(() => {
        alertContainer.innerHTML = '';
      }, 3000);
    }
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
