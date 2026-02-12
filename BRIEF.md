# Ether Dash — Web Port & Gameplay Overhaul

## What This Is
A side-scrolling crypto runner game. An owl character runs through a cyberpunk city collecting ETH coins while avoiding "Drainer" skull coins that steal your score. The game gets harder as your score increases. When your score beats the lowest high score, a "Cash Out" button appears — crypto themed throughout.

## Tech Stack
- **Single HTML file** with embedded CSS and JS (or separate files, your call)
- **HTML5 Canvas** for rendering
- **No frameworks** — vanilla JS
- **Mobile-first** — portrait orientation, touch controls
- **PWA-ready** — works from home screen

## Assets Available (in project folder)
- `Background.png` — cyberpunk city parallax background (wide, meant for scrolling)
- `Title.jpg` — title screen
- `Eth Coin.png` — collectible ETH coin (large version)
- `Drainer.png` — skull drainer coin (large version)
- `Drainer 2.png` — alternate drainer
- `cashOutButton.png` — cash out button
- `sprites/walk_1.png` through `walk_6.png` — owl walk animation (SMALL ~1.5kb each, may need to use the larger Jump files as reference for size)
- `sprites/jump_1.png` through `jump_6.png` — owl jump animation (larger ~5kb versions from xcassets)
- `sprites/coin.png` — coin from xcassets
- `sprites/cashout.png` — cashout button from xcassets
- `audio/Coin.mp3` — coin collect sound
- `audio/Drain.mp3` — drainer hit sound
- `audio/Jump.mp3` — jump sound
- `audio/Money.mp3` — cash out sound
- `audio/Ether M1.mp3` — background music

NOTE: The walk sprites are tiny (1.5kb). The Jump sprites from the smaller 2 folder (5kb) are better sized. If walk sprites are too small to render well, scale them up or generate placeholder colored rectangles that look like the owl.

## Original Game Mechanics (from Swift code)
- Owl runs right, background scrolls left
- Hold to run, release to idle (bouncing)
- Tap while running = jump
- Coins spawn at two Y positions (low and high)
- Drainers appear after 20 coins, probability increases with score
- **Drainer hit = score goes to ZERO** (the rug pull)
- Progress bar shows how close you are to the high score board
- Cash Out button appears when score >= lowest high score
- High score board with 3-initial entry (arcade style)

## CRITICAL CHANGES FOR WEB VERSION

### Fix: Not Enough Room to Dodge
- **Three lanes** (ground, mid, high) instead of two
- Player taps/swipes UP to jump one lane, DOWN to duck one lane
- Coins and drainers appear in specific lanes — player must move to collect/avoid
- **Wider spacing** between obstacles — at least 1.5 seconds between spawns at base speed
- **Warning indicator** — drainers glow/pulse red from further away so player can react

### Fix: Too Hard
- Drainers take **50% of score** (rounded down), NOT 100%
- **Shield power-up** (golden glowing coin) — appears rarely, absorbs one drainer hit
- Drainers don't appear until score reaches **30** (not 20)
- Drainer max probability caps at **40%** (not near 100%)
- Speed increases more gradually — every 10 seconds instead of 5

### Fix: Too Boring
- **Combo system** — collect 3+ coins in a row without missing = 2x multiplier, 6+ = 3x
- **Visual milestones** — background tint shifts at 50, 100, 200 points (gets more neon)
- **Near-miss bonus** — dodge a drainer by <50px = +5 bonus points + screen flash
- **Speed boost pickup** — rare green coin, brief speed burst + invincibility frames
- **Score popup animations** — "+1", "+5 NEAR MISS!", "2X COMBO" floating text
- **Screen shake** on drainer hit

### Mobile Controls
- **Tap anywhere** = jump up one lane
- **Swipe down** = drop down one lane  
- **Hold** = run (auto-run might be better for mobile — character always runs, tap to jump)
- Actually: **AUTO-RUN** — character always runs. Tap to jump. Tap while in air for double-jump. Swipe down to drop fast.

### Screens
1. **Title Screen** — shows Title.jpg background, tap to start, high score button
2. **Game Screen** — the runner game
3. **Cash Out / Game Over** — score display, high score entry if qualified, play again button
4. **High Scores** — top 10, arcade style with initials

### Visual Style
- Dark cyberpunk aesthetic matching the background
- Neon glow effects on UI elements
- Retro pixel/arcade font (use a Google Font like "Press Start 2P")
- Score in top-left with coin icon
- Progress bar below score
- Combo multiplier displayed prominently when active

### Audio
- Background music loops (Ether M1.mp3)
- Sound effects for: coin collect, drainer hit, jump, cash out
- Music starts on first tap (browser autoplay policy)

## Portrait Orientation
- Game MUST be portrait (9:16 ratio like the original)
- Canvas should fill the phone screen
- Background scrolls horizontally, cropped to show the ground level portion

## Performance
- Target 60fps on mobile
- Use requestAnimationFrame
- Pre-load all assets before starting
- Keep sprite count reasonable — max ~15 objects on screen

## Serve It
After building, create a simple server or just make it work as static files.
The game should work by opening index.html directly OR via a local server.
