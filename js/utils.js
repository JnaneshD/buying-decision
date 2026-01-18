/**
 * Utility Functions for Buying Decision App
 */

// Currency Configuration
const CURRENCIES = {
    INR: {
        symbol: '₹',
        name: 'Indian Rupee',
        locale: 'en-IN'
    },
    USD: {
        symbol: '$',
        name: 'US Dollar',
        locale: 'en-US'
    }
};

// Emoji Mapping for Common Items
const EMOJI_KEYWORDS = {
    // Electronics
    'phone': '📱', 'mobile': '📱', 'smartphone': '📱', 'iphone': '📱', 'android': '📱',
    'laptop': '💻', 'computer': '💻', 'macbook': '💻', 'notebook': '💻', 'pc': '🖥️',
    'tablet': '📲', 'ipad': '📲',
    'watch': '⌚', 'smartwatch': '⌚', 'apple watch': '⌚',
    'headphone': '🎧', 'earphone': '🎧', 'airpods': '🎧', 'earbuds': '🎧', 'headset': '🎧',
    'camera': '📷', 'dslr': '📷', 'gopro': '📷',
    'tv': '📺', 'television': '📺', 'monitor': '🖥️',
    'speaker': '🔊', 'soundbar': '🔊',
    'keyboard': '⌨️', 'mouse': '🖱️',
    'gaming': '🎮', 'playstation': '🎮', 'xbox': '🎮', 'nintendo': '🎮', 'ps5': '🎮',
    'drone': '🚁',
    
    // Fashion & Accessories
    'shoe': '👟', 'shoes': '👟', 'sneaker': '👟', 'nike': '👟', 'jordan': '👟', 'adidas': '👟',
    'boot': '👢', 'boots': '👢',
    'sandal': '👡', 'sandals': '👡', 'heel': '👠', 'heels': '👠',
    'shirt': '👕', 'tshirt': '👕', 't-shirt': '👕',
    'dress': '👗',
    'jeans': '👖', 'pants': '👖', 'trouser': '👖',
    'jacket': '🧥', 'coat': '🧥', 'hoodie': '🧥', 'sweater': '🧥',
    'suit': '🤵',
    'bag': '👜', 'handbag': '👜', 'purse': '👛',
    'backpack': '🎒',
    'wallet': '👝',
    'hat': '🧢', 'cap': '🧢',
    'glasses': '👓', 'sunglasses': '🕶️',
    'ring': '💍', 'jewelry': '💎', 'jewellery': '💎', 'necklace': '📿',
    'perfume': '🧴', 'cologne': '🧴',
    
    // Vehicles & Transport
    'car': '🚗', 'vehicle': '🚗', 'auto': '🚗',
    'bike': '🚲', 'bicycle': '🚲', 'cycle': '🚲',
    'motorcycle': '🏍️', 'motorbike': '🏍️', 'scooter': '🛵',
    'flight': '✈️', 'ticket': '🎫',
    
    // Home & Living
    'furniture': '🪑', 'chair': '🪑', 'sofa': '🛋️', 'couch': '🛋️',
    'bed': '🛏️', 'mattress': '🛏️',
    'table': '🪑', 'desk': '🪑',
    'lamp': '💡', 'light': '💡',
    'fan': '🌀', 'ac': '❄️', 'air conditioner': '❄️',
    'fridge': '🧊', 'refrigerator': '🧊',
    'washing machine': '🧺', 'washer': '🧺',
    'microwave': '📻', 'oven': '🍳',
    'vacuum': '🧹',
    
    // Food & Drinks
    'food': '🍔', 'burger': '🍔', 'pizza': '🍕', 'restaurant': '🍽️',
    'coffee': '☕', 'cafe': '☕', 'starbucks': '☕',
    'wine': '🍷', 'beer': '🍺', 'drink': '🥤',
    'cake': '🎂', 'dessert': '🍰', 'ice cream': '🍦',
    'chocolate': '🍫',
    
    // Sports & Fitness
    'gym': '🏋️', 'fitness': '🏋️', 'workout': '🏋️',
    'football': '⚽', 'soccer': '⚽',
    'basketball': '🏀',
    'cricket': '🏏',
    'tennis': '🎾',
    'golf': '⛳',
    'swimming': '🏊', 'pool': '🏊',
    'yoga': '🧘',
    
    // Entertainment & Hobbies
    'book': '📚', 'books': '📚', 'novel': '📖',
    'music': '🎵', 'guitar': '🎸', 'piano': '🎹',
    'movie': '🎬', 'film': '🎬', 'cinema': '🎬', 'netflix': '📺',
    'game': '🎮', 'games': '🎮',
    'concert': '🎤', 'show': '🎭', 'theatre': '🎭',
    'art': '🎨', 'painting': '🖼️',
    'plant': '🪴', 'plants': '🪴', 'flower': '🌸',
    'toy': '🧸', 'toys': '🧸', 'lego': '🧱',
    
    // Travel & Vacation
    'travel': '✈️', 'vacation': '🏖️', 'holiday': '🏖️', 'trip': '🗺️',
    'hotel': '🏨', 'resort': '🏨',
    'luggage': '🧳', 'suitcase': '🧳',
    
    // Health & Beauty
    'medicine': '💊', 'pharmacy': '💊',
    'makeup': '💄', 'lipstick': '💄', 'cosmetic': '💄',
    'skincare': '🧴',
    'haircut': '💇', 'salon': '💇', 'spa': '💆',
    
    // Tech & Gadgets
    'gadget': '⚙️', 'tech': '🔧',
    'charger': '🔌', 'cable': '🔌',
    'battery': '🔋', 'powerbank': '🔋',
    
    // Gifts & Special
    'gift': '🎁', 'present': '🎁',
    'birthday': '🎂', 'party': '🎉',
    'wedding': '💒', 'anniversary': '💝',
    
    // Education
    'course': '📚', 'class': '📚', 'tutorial': '📚', 'udemy': '📚',
    'subscription': '📋', 'membership': '📋',
    
    // Miscellaneous
    'insurance': '🛡️',
    'rent': '🏠', 'house': '🏠', 'apartment': '🏢',
    'pet': '🐕', 'dog': '🐕', 'cat': '🐈',
};

// Default emoji for items without a match
const DEFAULT_EMOJI = '🛒';

/**
 * Get emoji for an item based on its name
 * @param {string} itemName - The name of the item
 * @returns {string} - The matching emoji or default
 */
function getItemEmoji(itemName) {
    const lowerName = itemName.toLowerCase();
    
    // Check for exact matches first
    for (const [keyword, emoji] of Object.entries(EMOJI_KEYWORDS)) {
        if (lowerName.includes(keyword)) {
            return emoji;
        }
    }
    
    return DEFAULT_EMOJI;
}

/**
 * Format currency with proper locale
 * @param {number} amount - The amount to format
 * @param {string} currencyCode - Currency code (INR/USD)
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount, currencyCode = 'INR') {
    const currency = CURRENCIES[currencyCode] || CURRENCIES.INR;
    return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Calculate work time for a given price
 * @param {number} price - The price of the item
 * @param {number} hourlyRate - User's hourly earning rate
 * @returns {object} - Object with years, months, days, hours, and total hours
 */
function calculateWorkTime(price, hourlyRate) {
    const totalHours = price / hourlyRate;
    const totalDays = totalHours / 8; // 8 working hours per day
    
    // Calculate years, months, days
    const workingDaysPerMonth = 22;
    const workingDaysPerYear = 22 * 12; // 264 days
    
    const years = Math.floor(totalDays / workingDaysPerYear);
    const remainingAfterYears = totalDays % workingDaysPerYear;
    
    const months = Math.floor(remainingAfterYears / workingDaysPerMonth);
    const remainingAfterMonths = remainingAfterYears % workingDaysPerMonth;
    
    const days = Math.floor(remainingAfterMonths);
    const hours = Math.round((remainingAfterMonths - days) * 8);
    
    return {
        years,
        months,
        days,
        hours,
        totalDays: Math.round(totalDays),
        totalHours: Math.round(totalHours * 10) / 10
    };
}

/**
 * Format work time as readable string
 * @param {object} workTime - Object with years, months, days, and hours
 * @returns {string} - Formatted string like "2 years, 3 months" or "5 days, 4 hours"
 */
function formatWorkTime(workTime) {
    const parts = [];
    
    if (workTime.years > 0) {
        parts.push(`${workTime.years} year${workTime.years !== 1 ? 's' : ''}`);
    }
    if (workTime.months > 0) {
        parts.push(`${workTime.months} month${workTime.months !== 1 ? 's' : ''}`);
    }
    // Only show days if less than 1 year total, or if it's significant
    if (workTime.years === 0 && workTime.days > 0) {
        parts.push(`${workTime.days} day${workTime.days !== 1 ? 's' : ''}`);
    }
    // Only show hours if less than 1 month total
    if (workTime.years === 0 && workTime.months === 0 && workTime.hours > 0) {
        parts.push(`${workTime.hours} hour${workTime.hours !== 1 ? 's' : ''}`);
    }
    
    if (parts.length === 0) {
        return 'less than an hour';
    }
    return parts.join(', ');
}

/**
 * Get motivational message based on work time
 * @param {object} workTime - Object with years, months, days and hours
 * @returns {string} - Motivational message
 */
function getMotivationalMessage(workTime) {
    const totalDays = (workTime.years * 264) + (workTime.months * 22) + workTime.days + (workTime.hours / 8);
    
    if (totalDays < 0.5) {
        return "Quick purchase! Just a few hours of work. 👍";
    } else if (totalDays < 1) {
        return "Almost a full day of work. Think about it! 🤔";
    } else if (totalDays < 3) {
        return "A couple of days of work. Is it worth it? 💭";
    } else if (totalDays < 7) {
        return "That's almost a week of your life! 😱";
    } else if (totalDays < 22) {
        return "More than a week of work! Really need it? 🚨";
    } else if (totalDays < 66) {
        return "That's 1-3 months of hard work! Sleep on it! 😴";
    } else if (totalDays < 264) {
        return "Several months of your life! Major decision! 🔴";
    } else {
        return "A YEAR+ of work! Life-changing purchase! 🏠";
    }
}

/**
 * Get celebration message based on saved work time
 * @param {object} workTime - Object with years, months, days and hours
 * @returns {string} - Celebration message
 */
function getCelebrationMessage(workTime) {
    if (workTime.years > 0) {
        return `Incredible! You saved ${workTime.years}+ year${workTime.years !== 1 ? 's' : ''} of your life! 🏆`;
    } else if (workTime.months > 0) {
        return `Amazing! You saved ${workTime.months} month${workTime.months !== 1 ? 's' : ''} of work! 🌟`;
    } else if (workTime.days >= 7) {
        return `Great decision! You saved ${workTime.days} days of work! 🎉`;
    } else if (workTime.days > 0) {
        return `Nice! You saved ${workTime.days} day${workTime.days !== 1 ? 's' : ''} of work! 🎉`;
    } else {
        return `You saved ${workTime.hours} hour${workTime.hours !== 1 ? 's' : ''} of work! 👍`;
    }
}

/**
 * Create confetti effect
 * @param {HTMLElement} container - Container element for confetti
 */
function createConfetti(container) {
    // Green money-themed colors
    const colors = ['#58CC02', '#2E7D32', '#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9'];
    const moneyEmojis = ['💵', '💰', '💸', '🤑', '💲'];
    
    // Get viewport width for spreading
    const viewportWidth = window.innerWidth;
    
    // Add colored confetti - spread across full screen
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        // Spread across full viewport width
        confetti.style.left = `${Math.random() * viewportWidth}px`;
        confetti.style.top = `${Math.random() * -100}px`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 1}s`;
        confetti.style.animationDuration = `${2.5 + Math.random() * 2}s`;
        container.appendChild(confetti);
    }
    
    // Add floating money emojis - spread across screen
    for (let i = 0; i < 15; i++) {
        const money = document.createElement('span');
        money.className = 'money-float';
        money.textContent = moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)];
        // Spread across full viewport width
        money.style.left = `${Math.random() * viewportWidth}px`;
        money.style.top = `${50 + Math.random() * 30}%`;
        money.style.animationDelay = `${Math.random() * 0.8}s`;
        money.style.animationDuration = `${2 + Math.random() * 1.5}s`;
        container.appendChild(money);
    }
    
    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

/**
 * Generate unique ID
 * @returns {string} - Unique ID string
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Calculate expense level (for progress bar coloring)
 * @param {number} price - The price of the item
 * @param {number} monthlySalary - User's monthly salary
 * @returns {string} - Level: 'low', 'medium', 'high'
 */
function getExpenseLevel(price, monthlySalary) {
    const percentage = (price / monthlySalary) * 100;
    
    if (percentage < 10) return 'low';
    if (percentage < 30) return 'medium';
    return 'high';
}

/**
 * Get positive purchase affirmation message
 * @param {object} item - The purchased item
 * @returns {object} - Object with title and text
 */
function getPurchaseMessage(item) {
    const affirmations = [
        { title: "Enjoy Your Purchase! 🛍️", text: "You thought it through and made a mindful choice!" },
        { title: "Great Decision! ✨", text: "You deserve this. Enjoy your new " + item.name + "!" },
        { title: "Well Done! 🎯", text: "Smart shopping includes buying what truly matters!" },
        { title: "Treat Yourself! 💫", text: "Life is about balance. Enjoy your purchase!" },
        { title: "You Earned It! 🌟", text: "Your hard work made this possible. Enjoy!" },
        { title: "Congrats! 🎊", text: "A purchase well considered is a purchase well made!" }
    ];
    
    return affirmations[Math.floor(Math.random() * affirmations.length)];
}

/**
 * Create purchase celebration confetti (warm colors)
 * @param {HTMLElement} container - Container element for confetti
 */
function createPurchaseConfetti(container) {
    // Warm orange/gold colors for purchase celebration
    const colors = ['#FF9800', '#FFB74D', '#FFC107', '#FFD54F', '#FFAB00', '#FF8F00'];
    const celebrationEmojis = ['🛍️', '✨', '🎉', '💫', '⭐', '🎊'];
    
    const viewportWidth = window.innerWidth;
    
    // Add colored confetti
    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * viewportWidth}px`;
        confetti.style.top = `${Math.random() * -100}px`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 1}s`;
        confetti.style.animationDuration = `${2.5 + Math.random() * 2}s`;
        container.appendChild(confetti);
    }
    
    // Add celebration emojis
    for (let i = 0; i < 12; i++) {
        const emoji = document.createElement('span');
        emoji.className = 'money-float';
        emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
        emoji.style.left = `${Math.random() * viewportWidth}px`;
        emoji.style.top = `${50 + Math.random() * 30}%`;
        emoji.style.animationDelay = `${Math.random() * 0.8}s`;
        emoji.style.animationDuration = `${2 + Math.random() * 1.5}s`;
        container.appendChild(emoji);
    }
    
    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}
