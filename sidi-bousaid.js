// Script de génération automatique des maisons style Sidi Bou Saïd
// Génère des bâtiments blancs et bleus avec des drapeaux tunisiens

const SIDI_BOUSAID_CONFIG = {
  houseColor: 0xFFFFFF, // Blanc
  doorColor: 0x0066CC,   // Bleu Sidi Bou Saïd
  windowColor: 0x0066CC, // Bleu
  roofColor: 0xFF4444,   // Rouge terracotta
  flagTexture: 'assets/flags/drapeau-tunisie.png'
};

class SidiBousaidGenerator {
  constructor(scene) {
    this.scene = scene;
    this.houses = [];
    this.flags = [];
  }

  // Génère une maison style Sidi Bou Saïd
  generateHouse(x, y, z, width = 10, height = 12, depth = 10) {
    const house = {
      walls: this.createWalls(x, y, z, width, height, depth),
      door: this.createDoor(x, y, z, width),
      windows: this.createWindows(x, y, z, width, height, depth),
      roof: this.createRoof(x, y + height, z, width, depth)
    };
    
    this.houses.push(house);
    return house;
  }

  createWalls(x, y, z, width, height, depth) {
    // Crée les murs blancs
    const walls = [];
    const wallMaterial = { color: SIDI_BOUSAID_CONFIG.houseColor };
    
    // Mur avant, arrière, gauche, droite
    walls.push({
      position: { x, y: y + height/2, z },
      dimensions: { width, height, depth },
      material: wallMaterial
    });
    
    return walls;
  }

  createDoor(x, y, z, houseWidth) {
    return {
      position: { x, y: y + 2, z: z + houseWidth/2 - 0.5 },
      dimensions: { width: 2, height: 4, depth: 0.2 },
      material: { color: SIDI_BOUSAID_CONFIG.doorColor }
    };
  }

  createWindows(x, y, z, width, height, depth) {
    const windows = [];
    const windowMaterial = { color: SIDI_BOUSAID_CONFIG.windowColor };
    
    // Fenêtres sur la façade
    for (let i = 0; i < 2; i++) {
      windows.push({
        position: { 
          x: x - width/4 + i * width/2, 
          y: y + height * 0.6, 
          z: z + depth/2 
        },
        dimensions: { width: 2, height: 3, depth: 0.1 },
        material: windowMaterial
      });
    }
    
    return windows;
  }

  createRoof(x, y, z, width, depth) {
    return {
      position: { x, y, z },
      dimensions: { width: width + 1, height: 1, depth: depth + 1 },
      material: { color: SIDI_BOUSAID_CONFIG.roofColor }
    };
  }

  // Génère un drapeau tunisien
  generateFlag(x, y, z) {
    const flag = {
      pole: {
        position: { x, y: y + 5, z },
        dimensions: { radius: 0.1, height: 10 },
        material: { color: 0x888888 }
      },
      fabric: {
        position: { x: x + 1.5, y: y + 8, z },
        dimensions: { width: 3, height: 2 },
        texture: SIDI_BOUSAID_CONFIG.flagTexture
      }
    };
    
    this.flags.push(flag);
    return flag;
  }

  // Génère un quartier complet
  generateNeighborhood(centerX, centerZ, numHouses = 10) {
    const spacing = 20;
    const housesPerRow = Math.ceil(Math.sqrt(numHouses));
    
    for (let i = 0; i < numHouses; i++) {
      const row = Math.floor(i / housesPerRow);
      const col = i % housesPerRow;
      
      const x = centerX + (col - housesPerRow/2) * spacing;
      const z = centerZ + (row - housesPerRow/2) * spacing;
      const y = 0;
      
      // Variation aléatoire de taille
      const width = 8 + Math.random() * 4;
      const height = 10 + Math.random() * 6;
      const depth = 8 + Math.random() * 4;
      
      this.generateHouse(x, y, z, width, height, depth);
      
      // Ajoute un drapeau à certaines maisons
      if (Math.random() > 0.5) {
        this.generateFlag(x + width/2, y, z - depth/2);
      }
    }
  }

  // Exporte la configuration pour le moteur de jeu
  exportToGameEngine() {
    return {
      houses: this.houses,
      flags: this.flags,
      config: SIDI_BOUSAID_CONFIG
    };
  }
}

// Export pour utilisation dans le jeu
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SidiBousaidGenerator;
}
