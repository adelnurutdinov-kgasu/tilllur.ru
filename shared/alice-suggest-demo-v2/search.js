// search.js
const INPUT_MIN_HEIGHT = 56;
const getInputMaxHeight = () => {
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue('--input-max-height');
    return parseInt(value) || 360;
};
const INPUT_MAX_HEIGHT = getInputMaxHeight();

class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.suggestionsContainer = document.getElementById('suggestionsContainer');
        this.currentQueryText = document.getElementById('currentQueryText');
        this.aliceQueryText = document.getElementById('aliceQueryText');
        this.suggestionsList = document.getElementById('suggestionsList');
        this.currentQuery = document.getElementById('currentQuery');
        this.aliceQuery = document.getElementById('aliceQuery');
        this.footerButton = document.getElementById('footerButton');
        this.footer = document.querySelector('.suggestion-footer');
        
        this.activeIndex = 0;
        this.suggestions = [];
        this.debounceTimer = null;
        this.cache = new Map();
        this.currentRequest = null;
        this.keyboardNavigation = false;
        this.searchInputActionButton = null; // Добавляем новое свойство
        
        // Восстановление настроек из localStorage
        const promoStored = localStorage.getItem('aliceAppPromo');
        this.aliceAppPromo = promoStored !== null ? promoStored === 'true' : true;
        
        const thresholdStored = localStorage.getItem('aliceAppPromoThreshold');
        this.aliceAppPromoThreshold = thresholdStored !== null && !isNaN(Number(thresholdStored)) ? Number(thresholdStored) : 30;

        const unitedOutputStored = localStorage.getItem('isUnitedOutput');
        this.isUnitedOutput = unitedOutputStored !== null ? unitedOutputStored === 'true' : false;

        const unitedOutputTargetStored = localStorage.getItem('unitedOutputTarget');
        this.unitedOutputTarget = unitedOutputTargetStored === 'alice' ? 'alice' : 'search';

        this.init();
    }
    
    init() {
        this.searchInput.focus();
        this.searchInputAction = document.getElementById('searchInputAction');
        
        this.searchInput.addEventListener('input', (e) => this.handleInput(e));
        this.searchInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Скрываем подсказки при клике вне всего блока поиска
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-wrapper')) {
                this.hideSuggestions();
            }
        });
        
        this.suggestionsContainer.addEventListener('click', (e) => this.handleSuggestionClick(e));
        this.footerButton.addEventListener('click', () => this.executeSearch());

        // Обработчики наведения мыши на первые два элемента
        if (this.currentQuery) {
            this.currentQuery.addEventListener('mouseenter', () => {
                document.querySelectorAll('.suggestion-item').forEach(item => item.classList.remove('active'));
                this.currentQuery.classList.add('active');
                this.activeIndex = this._firstIsAlice ? 1 : 0;
                this.updateFooterButtonByActive(this.currentQuery);
                this.suggestionsContainer.classList.remove('force-active');
            });
        }
        if (this.aliceQuery) {
            this.aliceQuery.addEventListener('mouseenter', () => {
                document.querySelectorAll('.suggestion-item').forEach(item => item.classList.remove('active'));
                this.aliceQuery.classList.add('active');
                this.activeIndex = this._firstIsAlice ? 0 : 1;
                this.updateFooterButtonByActive(this.aliceQuery);
                this.suggestionsContainer.classList.remove('force-active');
            });
        }
        
        // Инициализация демо-переключателей
        const promoToggle = document.getElementById('aliceAppPromoToggle');
        if (promoToggle) {
            promoToggle.checked = this.aliceAppPromo;
            promoToggle.addEventListener('change', (e) => {
                this.aliceAppPromo = e.target.checked;
                localStorage.setItem('aliceAppPromo', String(this.aliceAppPromo));
                this.handleInput({ target: this.searchInput }); // Обновляем UI
            });
        }
        
        const promoThresholdSelect = document.getElementById('aliceAppPromoThresholdSelect');
        if (promoThresholdSelect) {
            promoThresholdSelect.value = String(this.aliceAppPromoThreshold);
            promoThresholdSelect.addEventListener('change', (e) => {
                this.aliceAppPromoThreshold = parseInt(e.target.value, 10);
                localStorage.setItem('aliceAppPromoThreshold', String(this.aliceAppPromoThreshold));
                this.handleInput({ target: this.searchInput }); // Обновляем UI
            });
        }

        const unitedOutputToggle = document.getElementById('unitedOutputToggle');
        const unitedOutputTargetSelect = document.getElementById('unitedOutputTargetSelect');
        if (unitedOutputToggle) {
            unitedOutputToggle.checked = this.isUnitedOutput;
            if (unitedOutputTargetSelect) {
                unitedOutputTargetSelect.value = this.unitedOutputTarget;
                unitedOutputTargetSelect.style.display = this.isUnitedOutput ? '' : 'none';
            }
            unitedOutputToggle.addEventListener('change', (e) => {
                this.isUnitedOutput = e.target.checked;
                localStorage.setItem('isUnitedOutput', String(this.isUnitedOutput));
                if (unitedOutputTargetSelect) {
                    unitedOutputTargetSelect.style.display = this.isUnitedOutput ? '' : 'none';
                }
                this.handleInput({ target: this.searchInput }); // Обновляем UI
            });
        }
        if (unitedOutputTargetSelect) {
            unitedOutputTargetSelect.value = this.unitedOutputTarget;
            unitedOutputTargetSelect.addEventListener('change', (e) => {
                this.unitedOutputTarget = e.target.value;
                localStorage.setItem('unitedOutputTarget', this.unitedOutputTarget);
                this.handleInput({ target: this.searchInput });
            });
        }

        // Логика авто-ресайза инпута
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => {
                // Предотвращение вставки HTML
                if (this.searchInput.innerHTML !== this.searchInput.textContent) {
                    const text = this.searchInput.textContent;
                    this.searchInput.textContent = text;
                    const range = document.createRange();
                    const sel = window.getSelection();
                    if (sel && this.searchInput.firstChild) {
                       range.setStart(this.searchInput.firstChild, text.length);
                       range.collapse(true);
                       sel.removeAllRanges();
                       sel.addRange(range);
                    }
                }
                this.autoResizeInput();
            });
            this.autoResizeInput();
        }
        
        // Устанавливаем начальное состояние UI
        this.updateUIState();
    }
    
    autoResizeInput() {
        this.searchInput.style.height = 'auto';
        const scrollHeight = this.searchInput.scrollHeight;
        const newHeight = Math.min(INPUT_MAX_HEIGHT, Math.max(INPUT_MIN_HEIGHT, scrollHeight));
        this.searchInput.style.height = `${newHeight}px`;
    }

    handleInput(e) {
        const query = (e.target.textContent || '').trim();
        
        // Эта функция теперь управляет и футером, и видимостью подсказок
        this.updateUIState();
        
        if (query.length === 0) {
            return; // Если инпут пуст, выходим
        }

        // Обновляем текст в "Найти" и "Спросить у Алисы"
        this.updateStaticSuggestion(this.currentQuery, 'svg/search.png', 'Поиск', query, '— Найти в Яндексе', false);
        this.updateStaticSuggestion(this.aliceQuery, 'svg/chat.png', 'Алиса', query, '— Спросить Алису', true);

        this.updateSuggestionOrder(query);
        this.activeIndex = 0;
        this.updateActiveSuggestion();
        
        if (this.cache.has(query)) {
            this.suggestions = this.cache.get(query);
            this.renderSuggestions();
            return;
        }
        
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            if (this.isUnitedOutput && query.length >= this.aliceAppPromoThreshold) {
                this.suggestions = [];
                this.renderSuggestions(); // Очистит список
                return;
            }
            this.fetchSuggestions(query);
        }, 200);
    }
    
    handleKeydown(e) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.suggestionsContainer.classList.add('force-active');
                this.navigateSuggestions(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.suggestionsContainer.classList.add('force-active');
                this.navigateSuggestions(-1);
                break;
            case 'Enter':
                e.preventDefault();
                this.executeSearch();
                break;
            case 'Escape':
                e.preventDefault();
                this.hideSuggestions();
                break;
        }
    }
    
    navigateSuggestions(direction) {
        const visibleItems = Array.from(this.suggestionsContainer.querySelectorAll('.suggestion-item')).filter(
            item => getComputedStyle(item).display !== 'none'
        );
        const totalItems = visibleItems.length;
        if (totalItems === 0) return;

        let currentItem = this.suggestionsContainer.querySelector('.suggestion-item.active');
        let currentIndex = currentItem ? visibleItems.indexOf(currentItem) : -1;

        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = totalItems - 1;
        } else if (currentIndex >= totalItems) {
            currentIndex = 0;
        }
        
        // Обновляем активный класс
        visibleItems.forEach(item => item.classList.remove('active'));
        const newActiveItem = visibleItems[currentIndex];
        newActiveItem.classList.add('active');

        // Находим глобальный activeIndex для логики executeSearch
        if (newActiveItem === this.currentQuery) this.activeIndex = this._firstIsAlice ? 1 : 0;
        else if (newActiveItem === this.aliceQuery) this.activeIndex = this._firstIsAlice ? 0 : 1;
        else {
             this.activeIndex = Array.from(this.suggestionsList.children).indexOf(newActiveItem) + 2;
        }

        this.updateFooterButtonByActive(newActiveItem);
    }
    
    updateUIState() {
        const query = (this.searchInput.textContent || '').trim();
        const wrapper = this.searchInput.closest('.search-wrapper');
        // Кнопка уходит вниз, если длина текста >= aliceAppPromoThreshold
        if (query.length > this.aliceAppPromoThreshold) {
            wrapper.classList.add('action-below');
        } else {
            wrapper.classList.remove('action-below');
        }

        if (query === "") {
            this.hideSuggestions();
            this.footer.classList.add('footer-minimal');
            this.footerButton.style.display = 'none';
            this.footer.style.display = '';
            this.searchInputAction.style.display = 'none';
        } else {
            this.showSuggestions();
            this.footer.classList.remove('footer-minimal');
            this.footerButton.style.display = '';
            this.footer.style.display = 'none';
            this.searchInputAction.style.display = '';
            // Копируем содержимое и классы с footerButton
            this.searchInputAction.innerHTML = '';
            const btn = this.footerButton.cloneNode(true);
            this.searchInputActionButton = btn; // Присваиваем созданную кнопку свойству
            this.searchInputActionButton.id = 'searchInputActionButton';
            this.searchInputActionButton.style.display = '';
            this.searchInputAction.appendChild(this.searchInputActionButton);
            // Навешиваем обработчик
            this.searchInputActionButton.onclick = () => this.executeSearch();
        }
    }

    showSuggestions() {
        this.suggestionsContainer.classList.add('visible');
    }
    
    hideSuggestions() {
        this.suggestionsContainer.classList.remove('visible');
    }
    
    updateActiveSuggestion() {
        const query = (this.searchInput.textContent || '').trim();
        const isUnited = this.isUnitedOutput && query.length >= this.aliceAppPromoThreshold;

        this.currentQuery.style.display = isUnited ? 'none' : 'flex';
        this.aliceQuery.style.display = isUnited ? 'none' : 'flex';

        const allItems = Array.from(this.suggestionsContainer.querySelectorAll('.suggestion-item'));
        allItems.forEach(item => item.classList.remove('active'));
        
        let activeDomItem = null;
        let first = this._firstIsAlice ? this.aliceQuery : this.currentQuery;
        let second = this._firstIsAlice ? this.currentQuery : this.aliceQuery;

        if (this.activeIndex === 0) {
            first.classList.add('active');
            activeDomItem = first;
        } else if (this.activeIndex === 1) {
            second.classList.add('active');
            activeDomItem = second;
        } else {
            const suggestionItem = this.suggestionsList.children[this.activeIndex - 2];
            if (suggestionItem) {
                suggestionItem.classList.add('active');
                activeDomItem = suggestionItem;
            } else {
                // Если саджест не найден, по умолчанию активируем первый видимый
                first.classList.add('active');
                activeDomItem = first;
            }
        }
        this.updateFooterButtonByActive(activeDomItem);
    }

    updateFooterButtonByActive(activeDomItem) {
        const query = (this.searchInput.textContent || '').trim();
        if (this.isUnitedOutput && query.length >= this.aliceAppPromoThreshold) {
            if (this.unitedOutputTarget === 'alice') {
                this.footerButton.textContent = 'Спросить Алису';
                this.footerButton.classList.add('alice');
                if (this.searchInputActionButton) {
                    this.searchInputActionButton.textContent = 'Спросить Алису';
                    this.searchInputActionButton.classList.add('alice');
                }
            } else {
                this.footerButton.textContent = 'Найти';
                this.footerButton.classList.remove('alice');
                if (this.searchInputActionButton) {
                    this.searchInputActionButton.textContent = 'Найти';
                    this.searchInputActionButton.classList.remove('alice');
                }
            }
            return;
        }

        if (!activeDomItem) {
            activeDomItem = this.suggestionsContainer.querySelector('.suggestion-item.active');
        }
        if (!activeDomItem) {
             let first = this._firstIsAlice ? this.aliceQuery : this.currentQuery;
             activeDomItem = first;
        }
        
        if (activeDomItem === this.currentQuery) {
            this.footerButton.textContent = 'Найти';
            this.footerButton.classList.remove('alice');
            if (this.searchInputActionButton) {
                this.searchInputActionButton.textContent = 'Найти';
                this.searchInputActionButton.classList.remove('alice');
            }
        } else if (activeDomItem === this.aliceQuery) {
            this.footerButton.textContent = 'Спросить Алису';
            this.footerButton.classList.add('alice');
            if (this.searchInputActionButton) {
                this.searchInputActionButton.textContent = 'Спросить Алису';
                this.searchInputActionButton.classList.add('alice');
            }
        } else {
            const textSpan = activeDomItem.querySelector('.suggestion-text');
            const suggestionText = textSpan ? textSpan.textContent : '';
            this.footerButton.textContent = this.isURL(suggestionText) ? 'Перейти' : 'Найти';
            this.footerButton.classList.remove('alice');
            if (this.searchInputActionButton) {
                this.searchInputActionButton.textContent = this.isURL(suggestionText) ? 'Перейти' : 'Найти';
                this.searchInputActionButton.classList.remove('alice');
            }
        }
    }
    
    executeSearch() {
        let searchQuery = this.searchInput.textContent.trim();
        const activeItem = this.suggestionsContainer.querySelector('.suggestion-item.active');

        if (this.isUnitedOutput && searchQuery.length >= this.aliceAppPromoThreshold) {
            if (this.unitedOutputTarget === 'alice') {
                window.open(this.getAliceURL(searchQuery), '_self');
            } else {
                window.open(this.asSuggestURL(searchQuery), '_self');
            }
            return;
        }

        if (!activeItem) { // На случай если ничего не выбрано, ищем по инпуту
            window.open(this.asSuggestURL(searchQuery), '_self');
            return;
        }

        if (activeItem === this.aliceQuery) {
            window.open(this.getAliceURL(searchQuery), '_self');
        } else if (activeItem === this.currentQuery) {
            window.open(this.asSuggestURL(searchQuery), '_self');
        } else {
            const suggestionText = activeItem.querySelector('.suggestion-text').textContent;
            window.open(this.asSuggestURL(suggestionText), '_self');
        }
    }
    
    handleSuggestionClick(e) {
        const suggestionItem = e.target.closest('.suggestion-item');
        if (!suggestionItem) return;
        
        // Обновляем activeIndex перед выполнением поиска
        document.querySelectorAll('.suggestion-item').forEach(item => item.classList.remove('active'));
        suggestionItem.classList.add('active');

        this.executeSearch();
    }
    
    async fetchSuggestions(query) {
        if (query.length < 2) {
            this.suggestions = [];
            this.renderSuggestions();
            return;
        }
        if (this.currentRequest) {
            this.currentRequest.abort();
        }
        try {
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const yandexUrl = `https://suggest.yandex.ru/suggest-ya.cgi?part=${encodeURIComponent(query)}&v=4&nav_text=3`;
            const controller = new AbortController();
            this.currentRequest = controller;
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const response = await fetch(proxyUrl + encodeURIComponent(yandexUrl), { signal: controller.signal });
            clearTimeout(timeoutId);
            this.currentRequest = null;
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.text();
            let jsonData = null;
            if (data.trim().startsWith('[')) {
                // Обычный JSON
                try {
                    jsonData = JSON.parse(data);
                } catch (e) {
                    console.error('Ошибка парсинга JSON:', e, data);
                    this.suggestions = [];
                    this.renderSuggestions();
                    return;
                }
            } else {
                // JSONP
                const start = data.indexOf('(');
                const end = data.lastIndexOf(')');
                if (start !== -1 && end !== -1 && end > start) {
                    const jsonStr = data.substring(start + 1, end);
                    try {
                        jsonData = JSON.parse(jsonStr);
                    } catch (e) {
                        console.error('Ошибка парсинга JSONP:', e, jsonStr);
                        this.suggestions = [];
                        this.renderSuggestions();
                        return;
                    }
                } else {
                    console.error('Некорректный ответ от suggest:', data);
                    this.suggestions = [];
                    this.renderSuggestions();
                    return;
                }
            }
            if (jsonData && jsonData.length > 1 && Array.isArray(jsonData[1])) {
                this.suggestions = jsonData[1].map(item => ({
                    text: typeof item === 'string' ? item : (item[2] || ''),
                    isNav: typeof item !== 'string'
                })).filter(item => item.text && item.text.trim());
                this.cache.set(query, this.suggestions);
            } else {
                this.suggestions = [];
            }
        } catch (error) {
            if (error.name !== 'AbortError') console.error('Ошибка получения подсказок:', error);
            this.suggestions = [];
        }
        this.renderSuggestions();
    }
    
    renderSuggestions() {
        this.suggestionsList.innerHTML = '';
        const scrollArea = this.suggestionsContainer.querySelector('.suggestions-scroll-area');
        if (this.suggestions.length === 0) {
            scrollArea.classList.add('only-static');
        } else {
            scrollArea.classList.remove('only-static');
        }
        if (this.isUnitedOutput && (this.searchInput.textContent || '').trim().length >= this.aliceAppPromoThreshold) {
             this.suggestions = [];
        }

        this.suggestions.forEach((suggestion, idx) => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            if (suggestion.isNav) div.classList.add('nav-item');
            if (this.isURL(suggestion.text)) div.classList.add('url-item');
            // Добавляем класс .dynamic для динамических подсказок
            div.classList.add('dynamic');
            
            div.innerHTML = `<span class="suggestion-icon"><img src="svg/search.png" alt="Поиск" width="20" height="20" /></span><span class="suggestion-text">${this.escapeHtml(suggestion.text)}</span>`;
            
            div.addEventListener('mouseenter', () => {
                document.querySelectorAll('.suggestion-item').forEach(item => item.classList.remove('active'));
                div.classList.add('active');
                this.activeIndex = idx + 2;
                this.updateFooterButtonByActive(div);
                this.suggestionsContainer.classList.remove('force-active');
            });
            this.suggestionsList.appendChild(div);
        });
        
        if (this.suggestions.length === 0 && this.activeIndex > 1) {
            this.activeIndex = 0;
        }
        this.updateActiveSuggestion();
    }
    
    asSuggestURL(input) {
        if (SearchUtils.isURL(input)) {
            let url = input;
            if (!/^https?:\/\//i.test(url)) {
                url = `http://${url}`;
            }
            return url;
        } else {
            return `https://yandex.ru/search/?text=${encodeURIComponent(input)}`;
        }
    }
    
    escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
        return text.replace(/[&<>"']/g, c => map[c]);
    }

    isURL(text) {
        return SearchUtils.isURL(text);
    }
    
    getAliceURL(query) {
        // Изменяем формат URL для Алисы на требуемый с диплинком
        const deeplink = encodeURIComponent(JSON.stringify({ text: query }));
        return `https://alice.yandex.ru/?alice_deeplink=${deeplink}`;
    }

    updateSuggestionOrder(query) {
        const scrollArea = this.suggestionsContainer.querySelector('.suggestions-scroll-area');
        const showAliceFirst = this.aliceAppPromo && query.length > this.aliceAppPromoThreshold;
        
        this._firstIsAlice = showAliceFirst; // Сохраняем состояние
        
        if (showAliceFirst) {
            if (scrollArea.children[0] !== this.aliceQuery) {
                scrollArea.insertBefore(this.aliceQuery, scrollArea.children[0]);
            }
        } else {
            if (scrollArea.children[0] !== this.currentQuery) {
                scrollArea.insertBefore(this.currentQuery, scrollArea.children[0]);
            }
        }
    }

    // Добавляю новый метод для обновления содержимого статичных подсказок
    updateStaticSuggestion(container, iconSrc, iconAlt, text, hint, isAlice) {
        if (!container) return;
        let icon = container.querySelector('.suggestion-icon img');
        let textSpan = container.querySelector('.suggestion-text');
        let hintSpan = container.querySelector('.suggestion-hint');
        if (!icon) {
            // Если структура не создана (например, при первом рендере), создаём её
            container.innerHTML = `<span class="suggestion-icon"><img src="${iconSrc}" alt="${iconAlt}" width="20" height="20" /></span><span class="suggestion-text"></span><span class="suggestion-hint${isAlice ? ' alice-hint' : ''}"></span>`;
            icon = container.querySelector('.suggestion-icon img');
            textSpan = container.querySelector('.suggestion-text');
            hintSpan = container.querySelector('.suggestion-hint');
        }
        if (icon.src !== location.origin + '/' + iconSrc) icon.src = iconSrc;
        if (icon.alt !== iconAlt) icon.alt = iconAlt;
        textSpan.textContent = text;
        hintSpan.textContent = hint;
        if (isAlice) hintSpan.classList.add('alice-hint');
        else hintSpan.classList.remove('alice-hint');
    }
}

class SearchUtils {
    static isURL(str) {
        if (!str) return false;
        // Простая проверка на наличие точки и отсутствие пробелов + базовые протоколы
        const simpleUrlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;
        const hasDot = str.includes('.');
        const noSpaces = !str.includes(' ');
        const isLocalhost = str.startsWith('localhost');
        return (hasDot && noSpaces) || isLocalhost || simpleUrlPattern.test(str);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SearchEngine();
});