// Moonbird Chooser Module for Ether Dash
// This module handles moonbird selection and sprite loading from CDN

const MoonbirdChooser = {
    // Configuration
    SPRITE_BASE_URL: 'https://pub-81c5b750034d42b6be2fe3c3dd264a5a.r2.dev', // R2 public domain (update when custom domain ready)
    // Custom domain will be: 'https://sprites.tomatobird.xyz'
    
    // State
    selectedMoonbird: null, // null = original owl, number = moonbird ID
    
    // Initialize from localStorage
    init() {
        const saved = localStorage.getItem('selectedMoonbird');
        if (saved !== null) {
            this.selectedMoonbird = saved === 'original' ? null : parseInt(saved);
        }
    },
    
    // Save selection
    saveSelection() {
        localStorage.setItem('selectedMoonbird', 
            this.selectedMoonbird === null ? 'original' : this.selectedMoonbird.toString());
    },
    
    // Get sprite URL
    getSpriteUrl(spriteName) {
        if (this.selectedMoonbird === null) {
            // Use original owl sprites
            return `sprites/${spriteName}`;
        } else {
            // Use moonbird sprites from CDN
            return `${this.SPRITE_BASE_URL}/${this.selectedMoonbird}/${spriteName}`;
        }
    },
    
    // Set moonbird (null for original, 0-9999 for moonbirds)
    setMoonbird(id) {
        if (id === null || (id >= 0 && id <= 9999)) {
            this.selectedMoonbird = id;
            this.saveSelection();
            return true;
        }
        return false;
    },
    
    // Get random moonbird ID
    getRandomMoonbird() {
        return Math.floor(Math.random() * 10000);
    },
    
    // Get display name
    getDisplayName() {
        return this.selectedMoonbird === null 
            ? 'Original Owl' 
            : `Moonbird #${this.selectedMoonbird}`;
    },
    
    // Load sprites with moonbird support
    async loadSprites() {
        const sprites = {};
        const spriteNames = [
            'idle_1', 'idle_2', 'idle_3', 'idle_4', 'idle_5', 'idle_6',
            'walk_1', 'walk_2', 'walk_3', 'walk_4', 'walk_5', 'walk_6'
        ];
        
        const loadPromises = spriteNames.map(name => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                const spriteUrl = this.getSpriteUrl(`${name}.png`);
                
                img.onload = () => {
                    sprites[name] = img;
                    resolve();
                };
                
                img.onerror = () => {
                    console.error(`Failed to load sprite: ${spriteUrl}`);
                    // Fallback to original sprite if moonbird fails
                    if (this.selectedMoonbird !== null) {
                        const fallbackImg = new Image();
                        fallbackImg.onload = () => {
                            sprites[name] = fallbackImg;
                            resolve();
                        };
                        fallbackImg.onerror = () => reject(`Failed to load fallback sprite: ${name}`);
                        fallbackImg.src = `sprites/${name}.png`;
                    } else {
                        reject(`Failed to load sprite: ${name}`);
                    }
                };
                
                img.src = spriteUrl;
            });
        });
        
        await Promise.all(loadPromises);
        return sprites;
    },
    
    // UI for moonbird selection (to be integrated into title screen)
    createChooserUI() {
        const chooserHTML = `
            <div id="moonbirdChooser" style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a0033;
                border: 3px solid #0ff;
                padding: 20px;
                text-align: center;
                font-family: 'Press Start 2P', cursive;
                color: #fff;
                z-index: 1000;
            ">
                <h2 style="color: #0ff; margin-bottom: 20px; font-size: 16px;">CHOOSE YOUR BIRD</h2>
                
                <div style="margin-bottom: 20px;">
                    <p style="font-size: 12px; margin-bottom: 10px;">Current: <span id="currentBird">${this.getDisplayName()}</span></p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <input type="number" id="moonbirdInput" 
                        min="0" max="9999" 
                        placeholder="0-9999"
                        style="
                            font-family: 'Press Start 2P', cursive;
                            padding: 10px;
                            background: #000;
                            color: #0ff;
                            border: 2px solid #0ff;
                            width: 150px;
                            text-align: center;
                        ">
                </div>
                
                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                    <button onclick="MoonbirdChooser.selectRandom()" style="
                        font-family: 'Press Start 2P', cursive;
                        padding: 10px;
                        background: #0ff;
                        color: #000;
                        border: none;
                        cursor: pointer;
                    ">RANDOM</button>
                    
                    <button onclick="MoonbirdChooser.selectOriginal()" style="
                        font-family: 'Press Start 2P', cursive;
                        padding: 10px;
                        background: #f0f;
                        color: #000;
                        border: none;
                        cursor: pointer;
                    ">ORIGINAL</button>
                    
                    <button onclick="MoonbirdChooser.confirmSelection()" style="
                        font-family: 'Press Start 2P', cursive;
                        padding: 10px;
                        background: #0f0;
                        color: #000;
                        border: none;
                        cursor: pointer;
                    ">CONFIRM</button>
                </div>
                
                <div style="margin-top: 20px;">
                    <button onclick="MoonbirdChooser.closeChooser()" style="
                        font-family: 'Press Start 2P', cursive;
                        padding: 10px;
                        background: #ff0;
                        color: #000;
                        border: none;
                        cursor: pointer;
                    ">BACK</button>
                </div>
            </div>
        `;
        
        const chooserDiv = document.createElement('div');
        chooserDiv.innerHTML = chooserHTML;
        document.body.appendChild(chooserDiv);
    },
    
    // UI Actions
    selectRandom() {
        const randomId = this.getRandomMoonbird();
        document.getElementById('moonbirdInput').value = randomId;
        document.getElementById('currentBird').textContent = `Moonbird #${randomId}`;
    },
    
    selectOriginal() {
        document.getElementById('moonbirdInput').value = '';
        document.getElementById('currentBird').textContent = 'Original Owl';
    },
    
    confirmSelection() {
        const input = document.getElementById('moonbirdInput').value;
        if (input === '') {
            this.setMoonbird(null);
        } else {
            const id = parseInt(input);
            if (id >= 0 && id <= 9999) {
                this.setMoonbird(id);
            } else {
                alert('Please enter a number between 0 and 9999');
                return;
            }
        }
        
        // Reload the game with new sprites
        window.location.reload();
    },
    
    closeChooser() {
        const chooser = document.getElementById('moonbirdChooser');
        if (chooser) {
            chooser.parentElement.remove();
        }
    }
};

// Export for use in main game
window.MoonbirdChooser = MoonbirdChooser;