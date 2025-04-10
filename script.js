document.addEventListener('DOMContentLoaded', function() {
    const calculator = {
        detailCount: 1,
        currentDspPrice: 2100,
        
        init: function() {
            this.setupEventListeners();
            this.updateArea(1);
            this.watchDspPriceChange();
            this.setupFirstDetailControls();
        },
        
        setupEventListeners: function() {
            document.getElementById('addDetailBtn').addEventListener('click', () => this.addDetail());
            document.getElementById('calculateBtn').addEventListener('click', () => this.calculate());
        },
        
        setupFirstDetailControls: function() {
            document.getElementById('length1').addEventListener('input', () => this.updateArea(1));
            document.getElementById('width1').addEventListener('input', () => this.updateArea(1));
            document.getElementById('quantity1').addEventListener('input', () => this.updateArea(1));
            
            document.querySelector('.detail-item .minus').addEventListener('click', () => {
                const input = document.getElementById('quantity1');
                if (input.value > 1) input.value--;
                this.updateArea(1);
            });
            
            document.querySelector('.detail-item .plus').addEventListener('click', () => {
                const input = document.getElementById('quantity1');
                input.value++;
                this.updateArea(1);
            });
        },
        
        watchDspPriceChange: function() {
            document.getElementById('dspPrice').addEventListener('input', (e) => {
                this.currentDspPrice = parseFloat(e.target.value) || 0;
                for (let i = 1; i <= this.detailCount; i++) {
                    this.updateArea(i);
                }
            });
        },
        
        addDetail: function() {
            this.detailCount++;
            const container = document.getElementById('detailsContainer');
            
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';
            detailItem.innerHTML = `
                <h4>Деталь ${this.detailCount}</h4>
                <div>
                    <label>Длина: <input type="number" id="length${this.detailCount}" min="0" step="1" value="0"></label> мм
                </div>
                <div>
                    <label>Ширина: <input type="number" id="width${this.detailCount}" min="0" step="1" value="0"></label> мм
                </div>
                <div>
                    <label>Количество: 
                        <button class="quantity-btn minus">-</button>
                        <input type="number" id="quantity${this.detailCount}" min="1" value="1" class="quantity-input">
                        <button class="quantity-btn plus">+</button>
                    </label>
                </div>
                <div class="detail-area">Площадь: <span id="area${this.detailCount}">0</span> м²</div>
                <div class="detail-cost">Стоимость: <span id="cost${this.detailCount}">0</span> руб.</div>
            `;
            container.appendChild(detailItem);
            
            // Добавляем обработчики
            document.getElementById(`length${this.detailCount}`).addEventListener('input', () => this.updateArea(this.detailCount));
            document.getElementById(`width${this.detailCount}`).addEventListener('input', () => this.updateArea(this.detailCount));
            document.getElementById(`quantity${this.detailCount}`).addEventListener('input', () => this.updateArea(this.detailCount));
            
            // Обработчики для кнопок количества
            detailItem.querySelector('.minus').addEventListener('click', () => {
                const input = document.getElementById(`quantity${this.detailCount}`);
                if (input.value > 1) input.value--;
                this.updateArea(this.detailCount);
            });
            
            detailItem.querySelector('.plus').addEventListener('click', () => {
                const input = document.getElementById(`quantity${this.detailCount}`);
                input.value++;
                this.updateArea(this.detailCount);
            });
            
            // Прокрутка к новой детали
            detailItem.scrollIntoView({ behavior: 'smooth' });
        },
        
        updateArea: function(id) {
            const length = parseFloat(document.getElementById(`length${id}`).value) || 0;
            const width = parseFloat(document.getElementById(`width${id}`).value) || 0;
            const quantity = parseInt(document.getElementById(`quantity${id}`).value) || 1;
            
            // Валидация
            if (length < 0) document.getElementById(`length${id}`).value = 0;
            if (width < 0) document.getElementById(`width${id}`).value = 0;
            if (quantity < 1) document.getElementById(`quantity${id}`).value = 1;
            
            // Переводим мм в метры и вычисляем площадь
            const area = (length / 1000) * (width / 1000) * quantity;
            const cost = area * this.currentDspPrice;
            
            document.getElementById(`area${id}`).textContent = area.toFixed(3);
            document.getElementById(`cost${id}`).textContent = Math.round(cost);
        },
        
        calculate: function() {
            const furniturePrice = parseFloat(document.getElementById('furniturePrice').value) || 0;
            const additionalCosts = parseFloat(document.getElementById('additionalCosts').value) || 0;
            
            let totalArea = 0;
            let totalDspCost = 0;
            let detailsHtml = '';
            let hasValidDetails = false;
            
            for (let i = 1; i <= this.detailCount; i++) {
                const length = parseFloat(document.getElementById(`length${i}`).value) || 0;
                const width = parseFloat(document.getElementById(`width${i}`).value) || 0;
                const quantity = parseInt(document.getElementById(`quantity${i}`).value) || 1;
                
                if (length > 0 && width > 0) {
                    hasValidDetails = true;
                    const area = (length / 1000) * (width / 1000) * quantity;
                    const cost = area * this.currentDspPrice;
                    
                    totalArea += area;
                    totalDspCost += cost;
                    
                    detailsHtml += `
                        <p>Деталь ${i}: ${length} × ${width} мм (${quantity} шт.) = 
                        ${area.toFixed(3)} м² × ${this.currentDspPrice} руб/м² = ${Math.round(cost)} руб.</p>
                    `;
                }
            }
            
            if (!hasValidDetails) {
                alert('Пожалуйста, введите размеры хотя бы одной детали');
                return;
            }
            
            const totalCost = totalDspCost + furniturePrice + additionalCosts;
            
            // Отображаем результаты
            document.getElementById('detailResults').innerHTML = detailsHtml;
            document.getElementById('totalArea').textContent = totalArea.toFixed(3);
            document.getElementById('totalDspCost').textContent = Math.round(totalDspCost);
            document.getElementById('totalFurnitureCost').textContent = Math.round(furniturePrice);
            document.getElementById('additionalCostsDisplay').textContent = Math.round(additionalCosts);
            document.getElementById('totalCost').textContent = Math.round(totalCost);
            
            // Показываем и прокручиваем к результатам
            const results = document.getElementById('results');
            results.style.display = 'block';
            results.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    calculator.init();
});
