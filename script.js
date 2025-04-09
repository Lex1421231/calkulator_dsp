const DSP_PRICE_PER_M2 = 2100;
const FURNITURE_SET_PRICE = 1715;

// Создаем поля для 20 деталей
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('detailsContainer');
    
    for (let i = 1; i <= 20; i++) {
        const detailItem = document.createElement('div');
        detailItem.className = 'detail-item';
        detailItem.innerHTML = `
            <h4>Деталь ${i}</h4>
            <div>
                <label>Длина: <input type="number" id="length${i}" min="0" step="1" value="0"></label> мм
            </div>
            <div>
                <label>Ширина: <input type="number" id="width${i}" min="0" step="1" value="0"></label> мм
            </div>
            <div class="detail-area">Площадь: <span id="area${i}">0</span> м²</div>
        `;
        container.appendChild(detailItem);
        
        // Добавляем обработчики для расчета площади при изменении размеров
        document.getElementById(`length${i}`).addEventListener('input', updateArea);
        document.getElementById(`width${i}`).addEventListener('input', updateArea);
    }
    
    function updateArea() {
        const id = this.id.replace('length', '').replace('width', '');
        const length = parseFloat(document.getElementById(`length${id}`).value) || 0;
        const width = parseFloat(document.getElementById(`width${id}`).value) || 0;
        
        // Переводим мм в метры и вычисляем площадь
        const area = (length / 1000) * (width / 1000);
        document.getElementById(`area${id}`).textContent = area.toFixed(3);
    }
});

function calculate() {
    let totalArea = 0;
    let detailsHtml = '';
    
    // Собираем результаты по каждой детали
    for (let i = 1; i <= 20; i++) {
        const length = parseFloat(document.getElementById(`length${i}`).value) || 0;
        const width = parseFloat(document.getElementById(`width${i}`).value || 0);
        
        if (length > 0 && width > 0) {
            // Переводим мм в метры и вычисляем площадь
            const area = (length / 1000) * (width / 1000);
            totalArea += area;
            
            detailsHtml += `
                <p>Деталь ${i}: ${length} × ${width} мм = ${area.toFixed(3)} м²</p>
            `;
        }
    }
    
    // Получаем дополнительные расходы
    const additionalCosts = parseFloat(document.getElementById('additionalCosts').value) || 0;
    
    // Рассчитываем стоимости
    const dspCost = totalArea * DSP_PRICE_PER_M2;
    const furnitureCost = FURNITURE_SET_PRICE;
    const totalCost = dspCost + furnitureCost + additionalCosts;
    
    // Отображаем результаты
    document.getElementById('detailResults').innerHTML = detailsHtml;
    document.getElementById('totalArea').textContent = totalArea.toFixed(3);
    document.getElementById('totalDspCost').textContent = Math.round(dspCost);
    document.getElementById('totalFurnitureCost').textContent = Math.round(furnitureCost);
    document.getElementById('additionalCostsDisplay').textContent = Math.round(additionalCosts);
    document.getElementById('totalCost').textContent = Math.round(totalCost);
    
    document.getElementById('results').style.display = 'block';
}
