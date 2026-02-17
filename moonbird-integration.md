# Moonbird Integration Plan

## Overview
Add moonbird selection to Ether Dash while keeping the original owl as default.

## Implementation Steps

### 1. Add Moonbird State
```javascript
// Add to game state
moonbirdNumber: null,  // null = original owl
```

### 2. Update Title Screen
- Add "Choose Bird" button below high scores
- Shows current selection (Original Owl or Moonbird #XXXX)

### 3. Moonbird Chooser Screen
- Number input (0-9999)
- Random button
- Reset to original button
- Preview of selected moonbird

### 4. Sprite Loading
- Check if moonbirdNumber is set
- If yes: load from https://sprites.tomatobird.xyz/[number]/
- If no: use local original sprites
- Fallback to original if CDN fails

### 5. Storage
- Save selection in localStorage
- Persist across game sessions

## UI Mockup

```
TITLE SCREEN:
[Animated Owl/Moonbird]
TAP TO START

HOW TO PLAY    HIGH SCORES

    CHOOSE BIRD
   [Moonbird #1234]
```

```
CHOOSER SCREEN:
    CHOOSE YOUR BIRD

  Current: Moonbird #1234
  
  [____] Enter 0-9999
  
  [RANDOM] [ORIGINAL]
  
     [CONFIRM]
```

## Testing Plan
1. Test with original owl (default)
2. Test with specific moonbirds (0, 1234, 9999)
3. Test random selection
4. Test CDN failover
5. Test localStorage persistence

## Deployment
1. Upload sprites to R2 ✓
2. Set up custom domain 
3. Update game code
4. Test on staging
5. Deploy to tomatobird.xyz