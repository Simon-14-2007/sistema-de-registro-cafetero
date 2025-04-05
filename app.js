const { jsPDF } = window.jspdf;

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const userForm = document.getElementById('userForm');
    const coffeeForm = document.getElementById('coffeeForm');
    const dailySummary = document.getElementById('dailySummary');
    const totalKilos = document.getElementById('totalKilos');
    const totalEarnings = document.getElementById('totalEarnings');
    const clearButton = document.getElementById('clearData');
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    // Guardar datos del usuario
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userData = {
            name: document.getElementById('userName').value,
            doc: document.getElementById('userDoc').value,
            phone: document.getElementById('userPhone').value
        };
        localStorage.setItem('coffeeUserData', JSON.stringify(userData));
        alert('Datos personales guardados correctamente');
    });

    // Calcular y mostrar resultados
    coffeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const price = parseFloat(document.getElementById('pricePerKilo').value);
        let dailyKilosData = [];
        let total = 0;
        
        // Recopilar datos de cada día
        days.forEach((day, index) => {
            const kilos = parseFloat(document.getElementById(day).value) || 0;
            dailyKilosData.push({
                dayName: dayNames[index],
                kilos: kilos
            });
            total += kilos;
        });
        
        const earnings = total * price;
        
        // Mostrar resultados
        totalKilos.textContent = total.toFixed(2);
        totalEarnings.textContent = earnings.toFixed(2);
        
        // Generar resumen diario
        let summaryHTML = '<h3>Detalle por día:</h3><ul>';
        dailyKilosData.forEach(day => {
            summaryHTML += `<li>${day.dayName}: ${day.kilos.toFixed(2)} kg</li>`;
        });
        summaryHTML += '</ul>';
        dailySummary.innerHTML = summaryHTML;
        
        // Guardar datos en localStorage
        const weeklyData = {
            date: new Date().toLocaleDateString(),
            dailyKilos: dailyKilosData,
            totalKilos: total,
            totalEarnings: earnings,
            pricePerKilo: price
        };
        
        localStorage.setItem('coffeeWeeklyData', JSON.stringify(weeklyData));
    });

    // Limpiar datos
    clearButton.addEventListener('click', () => {
        localStorage.clear();
        userForm.reset();
        coffeeForm.reset();
        totalKilos.textContent = '0.00';
        totalEarnings.textContent = '0.00';
        dailySummary.innerHTML = '';
        alert('Todos los datos han sido eliminados');
    });

    // Cargar datos guardados al iniciar
    const loadSavedData = () => {
        const savedUserData = JSON.parse(localStorage.getItem('coffeeUserData'));
        if (savedUserData) {
            document.getElementById('userName').value = savedUserData.name;
            document.getElementById('userDoc').value = savedUserData.doc;
            document.getElementById('userPhone').value = savedUserData.phone;
        }
        
        const savedWeeklyData = JSON.parse(localStorage.getItem('coffeeWeeklyData'));
        if (savedWeeklyData) {
            document.getElementById('pricePerKilo').value = savedWeeklyData.pricePerKilo;
            
            savedWeeklyData.dailyKilos.forEach((day, index) => {
                document.getElementById(days[index]).value = day.kilos;
            });
            
            totalKilos.textContent = savedWeeklyData.totalKilos.toFixed(2);
            totalEarnings.textContent = savedWeeklyData.totalEarnings.toFixed(2);
            
            let summaryHTML = '<h3>Detalle por día:</h3><ul>';
            savedWeeklyData.dailyKilos.forEach(day => {
                summaryHTML += `<li>${day.dayName}: ${day.kilos.toFixed(2)} kg</li>`;
            });
            summaryHTML += '</ul>';
            dailySummary.innerHTML = summaryHTML;
        }
    };
    
    loadSavedData();
});

// Función para generar y descargar el PDF
document.getElementById('downloadPdf').addEventListener('click', generatePdf);

function generatePdf() {
    // Obtener los datos guardados
    const userData = JSON.parse(localStorage.getItem('coffeeUserData')) || {};
    const weeklyData = JSON.parse(localStorage.getItem('coffeeWeeklyData')) || {};
    
    // Crear nuevo PDF (orientación portrait, unidades en mm, formato A4)
    const doc = new jspdf.jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Configuración del documento
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const lineHeight = 7;
    let yPos = 20;
    
    // Logo y título
    doc.setFontSize(22);
    doc.setTextColor(58, 44, 26);
    doc.setFont('helvetica', 'bold');
    doc.text('Registro de Recolección de Café', pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 2;
    
    // Línea decorativa
    doc.setDrawColor(166, 124, 82);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += lineHeight * 1.5;
    
    // Datos del recolector
    doc.setFontSize(14);
    doc.setTextColor(58, 44, 26);
    doc.setFont('helvetica', 'bold');
    doc.text('Datos del Recolector:', margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${userData.name || 'No registrado'}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Documento: ${userData.doc || 'No registrado'}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Teléfono: ${userData.phone || 'No registrado'}`, margin, yPos);
    yPos += lineHeight * 1.5;
    
    // Datos de recolección
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Registro Semanal:', margin, yPos);
    yPos += lineHeight;
    
    // Tabla de datos diarios
    if (weeklyData.dailyKilos) {
        const tableData = weeklyData.dailyKilos.map(day => [
            day.dayName,
            `${day.kilos.toFixed(2)} kg`,
            `$${(day.kilos * weeklyData.pricePerKilo).toFixed(2)}`
        ]);
        
        // Añadir encabezados
        tableData.unshift(['Día', 'Kilos Recolectados', 'Ganancia']);
        
        doc.autoTable({
            startY: yPos,
            head: [tableData[0]],
            body: tableData.slice(1),
            margin: { left: margin, right: margin },
            headStyles: {
                fillColor: [58, 44, 26],
                textColor: [255, 255, 255],
                fontSize: 10
            },
            bodyStyles: {
                textColor: [58, 44, 26],
                fontSize: 10
            },
            alternateRowStyles: {
                fillColor: [244, 237, 224]
            },
            styles: {
                cellPadding: 5,
                lineWidth: 0.1,
                lineColor: [166, 124, 82]
            }
        });
        
        yPos = doc.lastAutoTable.finalY + lineHeight;
    } else {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('No hay datos de recolección registrados', margin, yPos);
        yPos += lineHeight;
    }
    
    // Totales
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen Total:', margin, yPos);
    yPos += lineHeight;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total kilos recolectados: ${weeklyData.totalKilos ? weeklyData.totalKilos.toFixed(2) + ' kg' : '0.00 kg'}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Ganancias totales: $${weeklyData.totalEarnings ? weeklyData.totalEarnings.toFixed(2) : '0.00'}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Precio por kilo: $${weeklyData.pricePerKilo ? weeklyData.pricePerKilo.toFixed(2) : '0.00'}`, margin, yPos);
    yPos += lineHeight * 1.5;
    
    // Fecha y firma
    doc.setFontSize(10);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, margin, yPos);
    yPos += lineHeight;
    doc.text('Finca Cafetalera - Sistema de Registro', pageWidth / 2, yPos, { align: 'center' });
    
    // Guardar el PDF
    doc.save(`Registro_Cafetero_${userData.name || 'Recolector'}_${new Date().toISOString().slice(0, 10)}.pdf`);
}