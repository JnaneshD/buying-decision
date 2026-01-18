# 💰 Buying Decision

A Duolingo-inspired web app that helps you make smarter purchasing decisions by showing how many hours of work each purchase costs.

![Preview](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 What It Does

Ever felt buyer's remorse after an impulsive purchase? This app helps you think twice by converting prices into **work time**.

Enter your salary once, and every time you consider a purchase, you'll see:

- 📊 How many **days and hours** of work that item costs
- 🎯 Smart emoji suggestions for items (👟 for shoes, 📱 for phones, etc.)
- 🎉 Celebratory animations when you decide NOT to buy something!

## ✨ Features

- 🔐 **100% Private** - All data stored locally in your browser
- 💱 **Multi-Currency** - Supports INR (₹) and USD ($)
- 🎨 **Duolingo-Inspired Design** - Beautiful, playful, motivating
- 📝 **Wishlist Management** - Track items you're considering
- 📊 **Combined Totals** - See total work time for all wishlist items
- 🎉 **Celebration Mode** - Get rewarded for smart decisions!
- 📱 **Responsive** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Option 1: Just Open It

Simply open `index.html` in any modern web browser. That's it!

```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

### Option 2: Use a Local Server (Recommended for Development)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Then open http://localhost:8000
```

## 📁 Project Structure

```
BuyingDecision/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Duolingo-inspired styles
├── js/
│   ├── app.js          # Main application logic
│   ├── storage.js      # LocalStorage management
│   └── utils.js        # Helper functions & emoji mapping
└── README.md           # This file
```

## 🌐 Deployment

This app is static and can be deployed anywhere that hosts HTML files:

### Netlify (Recommended)

1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Deploy automatically on every push

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow prompts

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Select branch `main` and folder `/` (root)
4. Your site will be at `https://username.github.io/repo-name`

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🎨 Customization

### Adding More Emoji Mappings

Edit `js/utils.js` and add keywords to the `EMOJI_KEYWORDS` object:

```javascript
const EMOJI_KEYWORDS = {
  // Add your custom keywords
  "custom item": "🎯",
  // ...
};
```

### Adding More Currencies

Edit `js/utils.js` and add to the `CURRENCIES` object:

```javascript
const CURRENCIES = {
  INR: { symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
  USD: { symbol: "$", name: "US Dollar", locale: "en-US" },
  // Add more:
  EUR: { symbol: "€", name: "Euro", locale: "de-DE" },
  GBP: { symbol: "£", name: "British Pound", locale: "en-GB" },
};
```

Then update the HTML currency selector buttons accordingly.

## 📊 How Work Time Is Calculated

```
Working Days per Month = 22
Working Hours per Day = 8

Hourly Rate = Monthly Salary / 22 / 8
Daily Rate = Monthly Salary / 22

Work Time = Item Price / Hourly Rate
```

## 🛡️ Privacy

- **Zero data sent anywhere** - Everything stays in your browser
- **LocalStorage only** - Clear browser data to reset
- **No cookies** - No tracking, no analytics

## 📝 License

MIT License - Feel free to use, modify, and distribute!

---

Made with 💚 to help you save wisely
