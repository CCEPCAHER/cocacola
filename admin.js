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
  if (window.adminAuth && (window.adminAuth.app || window.adminAuth.auth)) {
    clearInterval(waitForFirebase);

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
function initPDFConverter() {
  const sectionSelector = document.getElementById('section-selector');
  const dropArea = document.getElementById('drop-area');
  const pdfInput = document.getElementById('pdf-input');
  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const alertContainer = document.getElementById('alert-container');
  const previewContainer = document.getElementById('preview-container');

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

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      showAlert('❌ El PDF es demasiado grande. Máximo 100MB', 'error');
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
      if (progressFill.textContent === '100%') {
        setTimeout(() => (progressContainer.style.display = 'none'), 2000);
      } else {
        progressContainer.style.display = 'none';
      }
      progressFill.style.width = '0%';
      progressFill.textContent = '0%';
      pdfInput.value = '';
    }
  }

  async function convertPDFToImages(file, section) {
    // Verificar pdf.js
    if (typeof pdfjsLib === 'undefined') {
      console.warn('📦 Cargando pdf.js dinámicamente...');
      const module = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
      window.pdfjsLib = module.pdfjsLib || module;
    }

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ arrayBuffer }).promise;
    const totalPages = pdf.numPages;

    console.log(`📄 PDF cargado: ${totalPages} páginas`);
    progressText.textContent = `Procesando ${totalPages} páginas...`;

    const batchSize = totalPages > 30 ? 3 : 5;
    let uploadedCount = 0;

    for (let i = 0; i < totalPages; i += batchSize) {
      const endPage = Math.min(i + batchSize, totalPages);
      const batch = [];

      for (let pageNum = i + 1; pageNum <= endPage; pageNum++) {
        batch.push(processPage(pdf, pageNum, section, pageNum));
      }

      try {
        await Promise.all(batch);
        uploadedCount += batch.length;
        updateProgress(uploadedCount, totalPages);
        console.log(`✅ Lote completado: ${uploadedCount}/${totalPages}`);
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
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const blob = await canvasToBlob(canvas, 0.85);
      const sectionName = section.toLowerCase().replace(/\s+/g, '_');
      const fileName = `${sectionName}_${pageNum - 1}.jpg`;

      await uploadToFirebaseWithRetry(blob, fileName, section, 3);

      if (pageNum <= 10) {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/jpeg', 0.85);
        img.className = 'preview-image';
        img.alt = `Página ${displayNum}`;
        previewContainer.appendChild(img);
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      canvas.remove();

      console.log(`✅ Página ${displayNum} subida`);
    } catch (error) {
      console.error(`❌ Error procesando página ${displayNum}:`, error);
      throw new Error(`Error en página ${displayNum}: ${error.message}`);
    }
  }

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

    const { ref, uploadBytes, getDownloadURL } = storageModule;
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
    if (['info', 'success'].includes(type)) {
      setTimeout(() => {
        alertContainer.innerHTML = '';
      }, 4000);
    }
  }

  // === Cargar secciones ===
  function loadSections() {
    const sections = [
      "FOCOS", "EEAA Y PUNTUACION", "ORDEN DE MARCAS",
      "FEM ALCAMPO", "FEM CARREFOUR", "FEM CARREFOUR MARKET",
      "FEM SUPECO", "FEM SORLI", "FEM SCLAT BONPREU",
      "FEM CAPRABO", "FEM CONSUM", "FEM CONDIS", "FEM COVIRAN",
      "IMPLANTACIONES", "Coca Cola", "Coca Cola Zero",
      "Coca Cola Light", "Coca Cola Zero Zero", "Coca Cola Sabores",
      "Fanta Naranja", "Fanta Limón", "Fanta Sabores",
      "Sprite", "Tónica", "Burn", "Energéticas",
      "M.Maid", "FUZE", "Deportivas", "Isotónicas",
      "Appletiser", "Aquabona", "Alcoholes"
    ];

    console.log('📋 Cargando secciones...', sections.length);

    sections.forEach(section => {
      const option = document.createElement('option');
      option.value = section;
      option.textContent = section;
      sectionSelector.appendChild(option);
    });

    console.log('✅ Secciones cargadas:', sectionSelector.options.length);
  }
}