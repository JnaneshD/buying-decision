/**
 * Main Application Logic for Buying Decision App
 */

// DOM Elements
const elements = {
    // Screens
    onboardingScreen: document.getElementById('onboarding-screen'),
    dashboardScreen: document.getElementById('dashboard-screen'),
    
    // Onboarding
    onboardingForm: document.getElementById('onboarding-form'),
    userName: document.getElementById('user-name'),
    monthlySalary: document.getElementById('monthly-salary'),
    currencyPrefix: document.getElementById('currency-prefix'),
    currencyButtons: document.querySelectorAll('#onboarding-form .currency-btn'),
    
    // Dashboard
    greeting: document.getElementById('greeting'),
    statMonthly: document.getElementById('stat-monthly'),
    statDaily: document.getElementById('stat-daily'),
    statHourly: document.getElementById('stat-hourly'),
    itemCurrencyPrefix: document.getElementById('item-currency-prefix'),
    
    // Add Item
    addItemForm: document.getElementById('add-item-form'),
    itemName: document.getElementById('item-name'),
    itemPrice: document.getElementById('item-price'),
    itemUrl: document.getElementById('item-url'),
    
    
    // Work Time Result
    workTimeResult: document.getElementById('work-time-result'),
    resultEmoji: document.getElementById('result-emoji'),
    resultItemName: document.getElementById('result-item-name'),
    resultPrice: document.getElementById('result-price'),
    timeDisplay: document.getElementById('time-display'),
    progressBar: document.getElementById('progress-bar'),
    resultMessage: document.getElementById('result-message'),
    btnSkipPurchase: document.getElementById('btn-skip-purchase'),
    btnAddToList: document.getElementById('btn-add-to-list'),
    
    // Celebration (Skip/Save)
    celebrationOverlay: document.getElementById('celebration-overlay'),
    celebrationMessage: document.getElementById('celebration-message'),
    confettiContainer: document.getElementById('confetti'),
    
    // Purchase Celebration (Bought It)
    purchaseOverlay: document.getElementById('purchase-overlay'),
    purchaseEmoji: document.getElementById('purchase-emoji'),
    purchaseTitle: document.getElementById('purchase-title'),
    purchaseMessage: document.getElementById('purchase-message'),
    purchaseConfetti: document.getElementById('purchase-confetti'),
    
    // Items List
    itemsList: document.getElementById('items-list'),
    emptyState: document.getElementById('empty-state'),
    listSummary: document.getElementById('list-summary'),
    totalItems: document.getElementById('total-items'),
    totalCost: document.getElementById('total-cost'),
    totalWorkTime: document.getElementById('total-work-time'),
    btnClearAll: document.getElementById('btn-clear-all'),
    
    // Settings
    settingsBtn: document.getElementById('settings-btn'),
    settingsModal: document.getElementById('settings-modal'),
    settingsForm: document.getElementById('settings-form'),
    editName: document.getElementById('edit-name'),
    editSalary: document.getElementById('edit-salary'),
    settingsCurrencyPrefix: document.getElementById('settings-currency-prefix'),
    settingsCurrencySelector: document.getElementById('settings-currency-selector'),
    closeSettings: document.getElementById('close-settings'),
    cancelSettings: document.getElementById('cancel-settings'),
    resetData: document.getElementById('reset-data'),
    
    // Help Modal
    helpBtn: document.getElementById('help-btn'),
    helpModal: document.getElementById('help-modal'),
    closeHelp: document.getElementById('close-help'),
    gotItBtn: document.getElementById('got-it-btn')
};

// App State
let currentItem = null;
let selectedCurrency = 'INR';

/**
 * Initialize the application
 */
function init() {
    if (Storage.hasUser()) {
        showDashboard();
    } else {
        showOnboarding();
    }
    
    setupEventListeners();
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Currency selection in onboarding
    elements.currencyButtons.forEach(btn => {
        btn.addEventListener('click', () => handleCurrencySelect(btn, 'onboarding'));
    });

    // Onboarding form submission
    elements.onboardingForm.addEventListener('submit', handleOnboardingSubmit);

    // Add item form submission
    elements.addItemForm.addEventListener('submit', handleAddItem);

    // Skip purchase button
    elements.btnSkipPurchase.addEventListener('click', handleSkipPurchase);

    // Add to list button
    elements.btnAddToList.addEventListener('click', handleAddToList);

    // Clear all items
    elements.btnClearAll.addEventListener('click', handleClearAll);

    // Settings modal
    elements.settingsBtn.addEventListener('click', openSettings);
    elements.closeSettings.addEventListener('click', closeSettings);
    elements.cancelSettings.addEventListener('click', closeSettings);
    elements.settingsModal.querySelector('.modal-backdrop').addEventListener('click', closeSettings);
    elements.settingsForm.addEventListener('submit', handleSettingsSave);
    elements.resetData.addEventListener('click', handleResetData);

    // Settings currency selection
    const settingsCurrencyBtns = elements.settingsCurrencySelector.querySelectorAll('.currency-btn');
    settingsCurrencyBtns.forEach(btn => {
        btn.addEventListener('click', () => handleCurrencySelect(btn, 'settings'));
    });

    // Close celebration overlay on click
    elements.celebrationOverlay.addEventListener('click', () => {
        elements.celebrationOverlay.classList.add('hidden');
    });

    // Close purchase overlay on click
    elements.purchaseOverlay.addEventListener('click', () => {
        elements.purchaseOverlay.classList.add('hidden');
    });

    // Help modal
    elements.helpBtn.addEventListener('click', openHelp);
    elements.closeHelp.addEventListener('click', closeHelp);
    elements.gotItBtn.addEventListener('click', closeHelp);
    elements.helpModal.querySelector('.modal-backdrop').addEventListener('click', closeHelp);
}

/**
 * Handle currency selection
 */
function handleCurrencySelect(button, context) {
    const container = context === 'onboarding' 
        ? elements.onboardingForm 
        : elements.settingsCurrencySelector;
    
    const prefixElement = context === 'onboarding'
        ? elements.currencyPrefix
        : elements.settingsCurrencyPrefix;
    
    // Remove active from all
    container.querySelectorAll('.currency-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to selected
    button.classList.add('active');
    
    // Update currency prefix
    const currency = button.dataset.currency;
    selectedCurrency = currency;
    prefixElement.textContent = CURRENCIES[currency].symbol;
}

/**
 * Handle onboarding form submission
 */
function handleOnboardingSubmit(e) {
    e.preventDefault();
    
    const name = elements.userName.value.trim();
    const salary = elements.monthlySalary.value;
    
    if (!name || !salary) return;
    
    // Get selected currency
    const activeCurrency = document.querySelector('#onboarding-form .currency-btn.active');
    const currency = activeCurrency ? activeCurrency.dataset.currency : 'INR';
    
    // Save user data
    Storage.saveUser({
        name,
        monthlySalary: salary,
        currency
    });
    
    // Show dashboard
    showDashboard();
}

/**
 * Show onboarding screen
 */
function showOnboarding() {
    elements.onboardingScreen.classList.remove('hidden');
    elements.dashboardScreen.classList.add('hidden');
}

/**
 * Show dashboard screen
 */
function showDashboard() {
    elements.onboardingScreen.classList.add('hidden');
    elements.dashboardScreen.classList.remove('hidden');
    
    updateDashboard();
    renderItems();
}

/**
 * Update dashboard with user data
 */
function updateDashboard() {
    const user = Storage.getUser();
    if (!user) return;
    
    const currency = user.currency || 'INR';
    const currencySymbol = CURRENCIES[currency].symbol;
    
    // Update greeting
    elements.greeting.textContent = `Hi, ${user.name}! 👋`;
    
    // Update stats
    elements.statMonthly.textContent = formatCurrency(user.monthlySalary, currency);
    elements.statDaily.textContent = formatCurrency(Math.round(user.dailyRate), currency);
    elements.statHourly.textContent = formatCurrency(Math.round(user.hourlyRate), currency);
    
    // Update currency prefix for add item form
    elements.itemCurrencyPrefix.textContent = currencySymbol;
}

/**
 * Handle add item form submission
 */
function handleAddItem(e) {
    e.preventDefault();
    
    const name = elements.itemName.value.trim();
    const price = parseFloat(elements.itemPrice.value);
    const url = elements.itemUrl ? elements.itemUrl.value.trim() : '';
    
    if (!name || !price) return;
    
    const user = Storage.getUser();
    const workTime = calculateWorkTime(price, user.hourlyRate);
    const emoji = getItemEmoji(name);
    const currency = user.currency || 'INR';
    
    // Store current item for later actions (including optional URL)
    currentItem = { name, price, emoji, workTime, url };
    
    // Show result
    showWorkTimeResult(name, price, emoji, workTime, currency, user.monthlySalary);
}

/**
 * Show work time result card
 */
function showWorkTimeResult(name, price, emoji, workTime, currency, monthlySalary) {
    elements.resultEmoji.textContent = emoji;
    elements.resultItemName.textContent = name;
    elements.resultPrice.textContent = formatCurrency(price, currency);
    elements.resultMessage.textContent = getMotivationalMessage(workTime);
    
    // Build time display dynamically
    buildTimeDisplay(workTime);
    
    // Update progress bar
    const percentage = Math.min((price / monthlySalary) * 100, 100);
    elements.progressBar.style.width = `${percentage}%`;
    
    // Set progress bar color based on expense level
    elements.progressBar.className = 'progress-bar';
    if (percentage > 30) {
        elements.progressBar.classList.add('expensive');
    }
    if (percentage > 50) {
        elements.progressBar.classList.add('very-expensive');
    }
    
    // Show the result card with animation
    elements.workTimeResult.classList.remove('hidden');
    
    // Scroll to result
    elements.workTimeResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Build time display with appropriate blocks (years, months, days, hours)
 */
function buildTimeDisplay(workTime) {
    const container = elements.timeDisplay;
    container.innerHTML = '';
    
    const blocks = [];
    
    // Add blocks based on what's relevant
    if (workTime.years > 0) {
        blocks.push({ value: workTime.years, unit: workTime.years === 1 ? 'year' : 'years' });
    }
    if (workTime.months > 0) {
        blocks.push({ value: workTime.months, unit: workTime.months === 1 ? 'month' : 'months' });
    }
    // Only show days if less than a year
    if (workTime.years === 0 && workTime.days > 0) {
        blocks.push({ value: workTime.days, unit: workTime.days === 1 ? 'day' : 'days' });
    }
    // Only show hours if less than a month
    if (workTime.years === 0 && workTime.months === 0 && workTime.hours > 0) {
        blocks.push({ value: workTime.hours, unit: workTime.hours === 1 ? 'hour' : 'hours' });
    }
    
    // If nothing to show, show "less than an hour"
    if (blocks.length === 0) {
        const block = document.createElement('div');
        block.className = 'time-block';
        block.innerHTML = `<span class="time-value"><1</span><span class="time-unit">hour</span>`;
        container.appendChild(block);
        return;
    }
    
    // Build the blocks
    blocks.forEach((block, index) => {
        const blockEl = document.createElement('div');
        blockEl.className = 'time-block';
        blockEl.innerHTML = `<span class="time-value">${block.value}</span><span class="time-unit">${block.unit}</span>`;
        container.appendChild(blockEl);
        
        // Add separator between blocks
        if (index < blocks.length - 1) {
            const sep = document.createElement('span');
            sep.className = 'time-separator';
            sep.textContent = '+';
            container.appendChild(sep);
        }
    });
}

/**
 * Handle skip purchase (celebrate!)
 */
function handleSkipPurchase() {
    if (!currentItem) return;
    
    // Show celebration
    elements.celebrationMessage.textContent = getCelebrationMessage(currentItem.workTime);
    elements.celebrationOverlay.classList.remove('hidden');
    
    // Create confetti
    createConfetti(elements.confettiContainer);
    
    // Hide result and reset form
    setTimeout(() => {
        elements.workTimeResult.classList.add('hidden');
        elements.addItemForm.reset();
        currentItem = null;
    }, 500);
    
    // Auto-hide celebration after 3 seconds
    setTimeout(() => {
        elements.celebrationOverlay.classList.add('hidden');
    }, 3000);
}

/**
 * Handle add to wishlist
 */
function handleAddToList() {
    if (!currentItem) return;
    
    // Add item to storage
    Storage.addItem(currentItem);
    
    // Hide result and reset form
    elements.workTimeResult.classList.add('hidden');
    elements.addItemForm.reset();
    currentItem = null;
    
    // Re-render items list
    renderItems();
}

/**
 * Render items list
 */
function renderItems() {
    const items = Storage.getItems();
    const user = Storage.getUser();
    const currency = user?.currency || 'INR';
    
    // Clear current items (except empty state)
    const existingCards = elements.itemsList.querySelectorAll('.item-card');
    existingCards.forEach(card => card.remove());
    
    if (items.length === 0) {
        elements.emptyState.style.display = 'block';
        elements.listSummary.classList.add('hidden');
        return;
    }
    
    elements.emptyState.style.display = 'none';
    elements.listSummary.classList.remove('hidden');
    
    // Render each item
    items.forEach(item => {
        const card = createItemCard(item, currency);
        elements.itemsList.insertBefore(card, elements.emptyState);
    });
    
    // Update summary
    updateListSummary(currency);
}

/**
 * Create item card element
 */
function createItemCard(item, currency) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = item.id;
    
    // Build URL link HTML if URL exists
    const urlHtml = item.url 
        ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="item-link" title="View product">🔗 View</a>`
        : '';
    
    card.innerHTML = `
        <div class="item-emoji">${item.emoji}</div>
        <div class="item-details">
            <div class="item-name">${item.name} ${urlHtml}</div>
            <div class="item-price">${formatCurrency(item.price, currency)}</div>
            <div class="item-time">⏱️ ${formatWorkTime(item.workTime)}</div>
        </div>
        <div class="item-actions">
            <button class="btn btn-bought-small" title="Mark as bought">🛍️</button>
            <button class="btn btn-delete" title="Skip & Save">🗑️</button>
        </div>
    `;
    
    // Add Bought It handler
    const boughtBtn = card.querySelector('.btn-bought-small');
    boughtBtn.addEventListener('click', () => handleBoughtItem(item));
    
    // Add delete handler (Skip & Save)
    const deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => handleDeleteItem(item.id, item.workTime));
    
    return card;
}

/**
 * Handle delete item with celebration
 */
function handleDeleteItem(itemId, workTime) {
    // Remove from storage
    Storage.removeItem(itemId);
    
    // Show mini celebration (savings)
    elements.celebrationMessage.textContent = getCelebrationMessage(workTime);
    elements.celebrationOverlay.classList.remove('hidden');
    createConfetti(elements.confettiContainer);
    
    // Re-render items
    renderItems();
    
    // Auto-hide celebration
    setTimeout(() => {
        elements.celebrationOverlay.classList.add('hidden');
    }, 2000);
}

/**
 * Handle buying an item (positive affirmation)
 */
function handleBoughtItem(item) {
    // Remove from wishlist
    Storage.removeItem(item.id);
    
    // Get positive purchase message
    const message = getPurchaseMessage(item);
    
    // Show purchase celebration
    elements.purchaseEmoji.textContent = item.emoji;
    elements.purchaseTitle.textContent = message.title;
    elements.purchaseMessage.textContent = message.text;
    elements.purchaseOverlay.classList.remove('hidden');
    createPurchaseConfetti(elements.purchaseConfetti);
    
    // Re-render items
    renderItems();
    
    // Auto-hide celebration
    setTimeout(() => {
        elements.purchaseOverlay.classList.add('hidden');
    }, 3000);
}

/**
 * Update list summary
 */
function updateListSummary(currency) {
    const totals = Storage.getItemsTotals();
    
    elements.totalItems.textContent = totals.count;
    elements.totalCost.textContent = formatCurrency(totals.totalPrice, currency);
    elements.totalWorkTime.textContent = formatWorkTime(totals.totalWorkTime);
}

/**
 * Handle clear all items
 */
function handleClearAll() {
    const items = Storage.getItems();
    if (items.length === 0) return;
    
    if (confirm('Are you sure you want to clear all items?')) {
        // Calculate total savings for celebration
        const totals = Storage.getItemsTotals();
        
        Storage.clearAllItems();
        renderItems();
        
        // Show big celebration
        elements.celebrationMessage.textContent = `Wow! You saved ${formatWorkTime(totals.totalWorkTime)} of work! 🎊`;
        elements.celebrationOverlay.classList.remove('hidden');
        createConfetti(elements.confettiContainer);
        
        setTimeout(() => {
            elements.celebrationOverlay.classList.add('hidden');
        }, 3000);
    }
}

/**
 * Open settings modal
 */
function openSettings() {
    const user = Storage.getUser();
    if (!user) return;
    
    // Populate form
    elements.editName.value = user.name;
    elements.editSalary.value = user.monthlySalary;
    
    // Set currency
    const currency = user.currency || 'INR';
    elements.settingsCurrencyPrefix.textContent = CURRENCIES[currency].symbol;
    
    const settingsCurrencyBtns = elements.settingsCurrencySelector.querySelectorAll('.currency-btn');
    settingsCurrencyBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.currency === currency);
    });
    
    selectedCurrency = currency;
    
    // Show modal
    elements.settingsModal.classList.remove('hidden');
}

/**
 * Close settings modal
 */
function closeSettings() {
    elements.settingsModal.classList.add('hidden');
}

/**
 * Open help modal
 */
function openHelp() {
    elements.helpModal.classList.remove('hidden');
}

/**
 * Close help modal
 */
function closeHelp() {
    elements.helpModal.classList.add('hidden');
}

/**
 * Handle settings save
 */
function handleSettingsSave(e) {
    e.preventDefault();
    
    const name = elements.editName.value.trim();
    const salary = parseFloat(elements.editSalary.value);
    
    if (!name || !salary) return;
    
    // Get selected currency from settings
    const activeCurrency = elements.settingsCurrencySelector.querySelector('.currency-btn.active');
    const currency = activeCurrency ? activeCurrency.dataset.currency : 'INR';
    
    // Update user
    Storage.updateUser({
        name,
        monthlySalary: salary,
        currency
    });
    
    // Update items work time with new rate
    const user = Storage.getUser();
    const items = Storage.getItems();
    const updatedItems = items.map(item => ({
        ...item,
        workTime: calculateWorkTime(item.price, user.hourlyRate)
    }));
    localStorage.setItem('buyingDecision_items', JSON.stringify(updatedItems));
    
    // Refresh dashboard
    updateDashboard();
    renderItems();
    
    // Close modal
    closeSettings();
}

/**
 * Handle reset all data
 */
function handleResetData() {
    if (confirm('Are you sure you want to reset ALL data? This cannot be undone!')) {
        Storage.resetAll();
        closeSettings();
        showOnboarding();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);
