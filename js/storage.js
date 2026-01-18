/**
 * Storage Manager for Buying Decision App
 * Handles all localStorage operations
 */

const STORAGE_KEYS = {
    USER: 'buyingDecision_user',
    ITEMS: 'buyingDecision_items',
    SETTINGS: 'buyingDecision_settings'
};

/**
 * Storage Manager Object
 */
const Storage = {
    /**
     * Check if user has completed onboarding
     * @returns {boolean}
     */
    hasUser() {
        return localStorage.getItem(STORAGE_KEYS.USER) !== null;
    },

    /**
     * Save user data
     * @param {object} userData - User data object
     */
    saveUser(userData) {
        const user = {
            name: userData.name,
            monthlySalary: parseFloat(userData.monthlySalary),
            currency: userData.currency || 'INR',
            dailyRate: parseFloat(userData.monthlySalary) / 22, // 22 working days
            hourlyRate: parseFloat(userData.monthlySalary) / 22 / 8, // 8 hours per day
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        return user;
    },

    /**
     * Get user data
     * @returns {object|null} - User data or null
     */
    getUser() {
        const userData = localStorage.getItem(STORAGE_KEYS.USER);
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Update user data
     * @param {object} updates - Fields to update
     * @returns {object} - Updated user data
     */
    updateUser(updates) {
        const user = this.getUser();
        if (!user) return null;

        const updatedUser = {
            ...user,
            ...updates,
            updatedAt: new Date().toISOString()
        };

        // Recalculate rates if salary changed
        if (updates.monthlySalary) {
            updatedUser.dailyRate = parseFloat(updates.monthlySalary) / 22;
            updatedUser.hourlyRate = parseFloat(updates.monthlySalary) / 22 / 8;
        }

        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
        return updatedUser;
    },

    /**
     * Get all items
     * @returns {array} - Array of items
     */
    getItems() {
        const items = localStorage.getItem(STORAGE_KEYS.ITEMS);
        return items ? JSON.parse(items) : [];
    },

    /**
     * Add a new item
     * @param {object} itemData - Item data
     * @returns {object} - The added item
     */
    addItem(itemData) {
        const items = this.getItems();
        const user = this.getUser();
        
        const newItem = {
            id: generateId(),
            name: itemData.name,
            price: parseFloat(itemData.price),
            url: itemData.url || '', // Optional product URL
            emoji: getItemEmoji(itemData.name),
            workTime: calculateWorkTime(parseFloat(itemData.price), user.hourlyRate),
            addedAt: new Date().toISOString()
        };

        items.push(newItem);
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
        return newItem;
    },

    /**
     * Remove an item by ID
     * @param {string} itemId - Item ID to remove
     * @returns {boolean} - Success status
     */
    removeItem(itemId) {
        const items = this.getItems();
        const filteredItems = items.filter(item => item.id !== itemId);
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(filteredItems));
        return true;
    },

    /**
     * Clear all items
     */
    clearAllItems() {
        localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify([]));
    },

    /**
     * Get total of all items
     * @returns {object} - Object with totalPrice and totalWorkTime
     */
    getItemsTotals() {
        const items = this.getItems();
        const user = this.getUser();
        
        if (items.length === 0 || !user) {
            return {
                count: 0,
                totalPrice: 0,
                totalWorkTime: { days: 0, hours: 0, totalHours: 0 }
            };
        }

        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        const totalWorkTime = calculateWorkTime(totalPrice, user.hourlyRate);

        return {
            count: items.length,
            totalPrice,
            totalWorkTime
        };
    },

    /**
     * Reset all data
     */
    resetAll() {
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.ITEMS);
        localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    }
};
