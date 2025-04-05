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