document.addEventListener("DOMContentLoaded", function () {
    // Manejar envío del formulario
    document.getElementById('pedidoForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const cantidad = document.getElementById('cantidad').value.trim();
        const cliente = document.getElementById('cliente').value.trim();
        const direccion = document.getElementById('direccion').value.trim();

        if (!cantidad || !cliente || !direccion) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const pedido = { cantidad, cliente, direccion };

        try {
            const response = await fetch('/guardar-pedido', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido)
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el pedido.');
        }
    });

    // Lazy loading de imágenes
    let lazyImages = document.querySelectorAll("img.lazy");
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});

const express = require('express');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, 'pedidos.xlsx');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/guardar-pedido', async (req, res) => {
    const { cantidad, cliente, direccion } = req.body;

    if (!cantidad || !cliente || !direccion) {
        return res.status(400).json({ message: 'Faltan datos obligatorios: cantidad, cliente o dirección.' });
    }

    const workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
        worksheet = workbook.getWorksheet('Pedidos') || workbook.addWorksheet('Pedidos');
    } else {
        worksheet = workbook.addWorksheet('Pedidos');
        worksheet.columns = [
            { header: 'Cantidad', key: 'cantidad' },
            { header: 'Cliente', key: 'cliente' },
            { header: 'Dirección', key: 'direccion' },
            { header: 'Fecha y Hora', key: 'fechaHora' },
        ];
    }

    worksheet.addRow({ cantidad, cliente, direccion, fechaHora: new Date().toLocaleString() });

    try {
        await workbook.xlsx.writeFile(filePath);
        res.json({ message: 'Pedido guardado en Excel exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el pedido en Excel.', error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

