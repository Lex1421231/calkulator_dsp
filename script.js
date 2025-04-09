let detailCount = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для первой детали
    document.getElementById('length1').addEventListener('input', function() { updateArea(1); });
    document.getElementById('width1').addEventListener('input', function() { updateArea(1); });
    
    // Кнопка добавления детали
    document.getElementById('addDetailBtn').addEventListener('click', addDetail);
    
    // Кнопка расчета
    document.getElementById('calculateBtn').addEventListener('click', calculate);
});

function addDetail() {
    detailCount++;
    const container = document.getElementById('detailsContainer');
    
    const detailItem = document.createElement('div');
    detailItem.className = 'detail-item';
    detailItem.innerHTML = `
        <h4>Деталь ${detailCount}</h4>
        <div>
            <label>Длина: <input type="number" id="length${detailCount}" min="0" step="1" value="0"></label> мм
        </div>
        <div>
            <label>Ширина: <input type="number" id="width${detailCount}" min="0" step="1" value="0"></label> мм
        </div>
        <div class="detail-area">Площадь: <span id="area${detailCount}">0</span> м²</div>
    `;
    container.appendChild(detailItem);
    
    // Добавляем обработчики для новой детали
    document.getElementById(`length${detailCount}`).addEventListener('input', function() { updateArea(detailCount); });
    document.getElementById(`width${detailCount}`).addEventListener('input', function() { updateArea(detailCount); });
}

function updateArea(id) {
    const length = parseFloat(document.getElementById(`length${id}`).value) || 0;
    const width = parseFloat(document.getElementById(`width${id}`).value) || 0;
    
    // Переводим мм в метры и вычисляем площадь
    const area = (length / 1000) * (width / 1000);
    document.getElementById(`area${id}`).textContent = area.toFixed(3);
}

function calculate() {
    // Получаем текущие цены
    const dspPrice = parseFloat(document.getElementById('dspPrice').value) || 0;
    const furniturePrice = parseFloat(document.getElementById('furniturePrice').value) || 0;
    const additionalCosts = parseFloat(document.getElementById('additionalCosts').value) || 0;
    
    let totalArea = 0;
    let detailsHtml = '';
    
    // Собираем результаты по каждой детали
    for (let i = 1; i <= detailCount; i++) {
        const length = parseFloat(document.getElementById(`length${i}`).value) || 0;
        const width = parseFloat(document.getElementById(`width${i}`).value || 0);
        
        if (length > 0 && width > 0) {
            const area = (length / 1000) * (width / 1000);
            totalArea += area;
            
            detailsHtml += `<p>Деталь ${i}: ${length} × ${width} мм = ${area.toFixed(3)} м²</p>`;
        }
    }
    
    // Рассчитываем стоимости
    const dspCost = totalArea * dspPrice;
    const totalCost = dspCost + furniturePrice + additionalCosts;
    
    // Отображаем результаты
    document.getElementById('detailResults').innerHTML = detailsHtml;
    document.getElementById('totalArea').textContent = totalArea.toFixed(3);
    document.getElementById('totalDspCost').textContent = Math.round(dspCost);
    document.getElementById('totalFurnitureCost').textContent = Math.round(furniturePrice);
    document.getElementById('additionalCostsDisplay').textContent = Math.round(additionalCosts);
    document.getElementById('totalCost').textContent = Math.round(totalCost);
    
    document.getElementById('results').style.display = 'block';
}
