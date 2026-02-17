# Integrate Moonbird Chooser into Ether Dash

## Changes needed in index.html:

### 1. Add script tag before the main game script:
```html
<script src="moonbird-chooser.js"></script>
```

### 2. Modify the sprite loading section (around line 180):

Replace the existing sprite loading code:
```javascript
// Load sprites
const owlSprites = {};
const spriteNames = [
    'idle_1', 'idle_2', 'idle_3', 'idle_4', 'idle_5', 'idle_6',
    'walk_1', 'walk_2', 'walk_3', 'walk_4', 'walk_5', 'walk_6'
];
```

With:
```javascript
// Initialize moonbird chooser
MoonbirdChooser.init();

// Load sprites will be handled by MoonbirdChooser
let owlSprites = {};
```

### 3. Update the loadAssets function to use MoonbirdChooser:

Replace the sprite loading loop with:
```javascript
try {
    owlSprites = await MoonbirdChooser.loadSprites();
    assetsLoaded++;
    updateLoadingBar();
} catch (error) {
    console.error('Failed to load sprites:', error);
    // Fallback to original sprites
    MoonbirdChooser.setMoonbird(null);
    owlSprites = await MoonbirdChooser.loadSprites();
}
```

### 4. Add "Choose Bird" button to title screen:

In the drawTitleScreen function, add after the high scores button:

```javascript
// Choose Bird button
const chooseBirdY = highScoreButtonY + 50;
if (mouseY > chooseBirdY - 15 && mouseY < chooseBirdY + 15) {
    ctx.fillStyle = '#0ff';
    ctx.font = '14px "Press Start 2P"';
} else {
    ctx.fillStyle = '#888';
    ctx.font = '12px "Press Start 2P"';
}
ctx.textAlign = 'center';
ctx.fillText('CHOOSE BIRD', canvas.width / 2, chooseBirdY);

// Display current selection
ctx.font = '8px "Press Start 2P"';
ctx.fillStyle = '#666';
ctx.fillText(`[${MoonbirdChooser.getDisplayName()}]`, canvas.width / 2, chooseBirdY + 20);
```

### 5. Add click handler for the Choose Bird button:

In the click event handler for title screen, add:

```javascript
// Check Choose Bird button
const chooseBirdY = highScoreButtonY + 50;
if (mouseX > canvas.width / 2 - 80 && mouseX < canvas.width / 2 + 80 &&
    mouseY > chooseBirdY - 15 && mouseY < chooseBirdY + 15) {
    MoonbirdChooser.createChooserUI();
}
```

## Testing Steps:

1. First test with the default R2 dev domain:
   - Update SPRITE_BASE_URL in moonbird-chooser.js to the R2 dev URL
   - This should work immediately without custom domain setup

2. Once sprites.tomatobird.xyz is configured:
   - Update SPRITE_BASE_URL to 'https://sprites.tomatobird.xyz'
   - Test loading different moonbirds

## Deployment:

```bash
cd ~/Tomato_Work/projects/ether-dash-web
git add moonbird-chooser.js
git add integrate-moonbird.md  
git commit -m "Add moonbird chooser feature"
git push
```