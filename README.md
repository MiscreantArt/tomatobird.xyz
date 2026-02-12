# Ether Dash - Web Version

A cyberpunk crypto-themed endless runner game built for mobile devices in portrait mode.

## How to Play

### Controls
- **Mobile (Touch):**
  - Tap anywhere: Jump up one lane
  - Swipe down: Drop down one lane

- **Desktop (Keyboard):**
  - Arrow Up / W / Space: Jump up one lane
  - Arrow Down / S: Drop down one lane

### Gameplay
- Your owl character auto-runs through a cyberpunk city
- Collect ETH coins to increase your score
- Avoid Drainer skulls that steal 50% of your score
- Move between three lanes (ground, mid, high) to collect coins and dodge drainers
- Build combos by collecting coins consecutively:
  - 3+ coins = 2X multiplier
  - 6+ coins = 3X multiplier
- Dodge drainers closely for a +5 near-miss bonus
- Collect special powerups:
  - **Shield (golden)**: Protects from one drainer hit
  - **Speed Boost (green)**: Brief speed burst with invincibility

### Progression
- Drainers appear after reaching 30 points
- Game speed increases every 10 seconds
- Background tint changes at milestones: 50, 100, 200 points
- Cash Out button appears when you beat the lowest high score
- Enter your initials for the high score board

## How to Run

### Option 1: Direct File
Simply open `index.html` in any modern web browser (Chrome, Safari, Firefox, Edge).

### Option 2: Local Server (Recommended for Testing)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Mobile Testing
1. Start a local server on your development machine
2. Find your local IP address (e.g., 192.168.1.100)
3. On your phone, navigate to `http://YOUR_IP:8000`
4. Tap "Add to Home Screen" for a PWA-like experience

## Features Implemented

### Core Mechanics
✅ Three-lane movement system
✅ Auto-run gameplay
✅ Touch and keyboard controls
✅ Combo multiplier system (2X, 3X)
✅ Shield and speed boost powerups
✅ Near-miss bonus detection
✅ Reduced drainer punishment (50% instead of 100%)

### Visual Effects
✅ Screen shake on drainer hits
✅ Floating score popup animations
✅ Visual milestone tints (background color shifts)
✅ Neon glow effects
✅ Parallax scrolling background
✅ Warning indicators for drainers

### UI/UX
✅ Title screen
✅ Game screen with HUD
✅ Cash Out button when qualified
✅ High score system (top 10)
✅ Game over screen
✅ Progress bar to next cash out

### Audio
✅ Background music (looping)
✅ Coin collect sound
✅ Drainer hit sound
✅ Jump sound
✅ Cash out sound

### Technical
✅ Portrait mobile orientation
✅ Responsive canvas sizing
✅ Asset preloading
✅ 60 FPS target
✅ Local storage for high scores

## Assets Used
- Background.png - Cyberpunk city parallax
- Title.jpg - Title screen
- Sprites (Jump animations, coins, buttons)
- Audio (BGM, sound effects)

## Browser Compatibility
- Chrome/Edge (recommended)
- Safari
- Firefox
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
Optimized for:
- 60 FPS on mobile devices
- Portrait orientation (9:16 aspect ratio)
- Touch-friendly controls
- Responsive to various screen sizes

## Credits
Built with vanilla JavaScript, HTML5 Canvas, and retro arcade styling.
