// Script principal pour lancer l'arène Sidi Bou Saïd modifiée
// Intègre le générateur de maisons et configure les paramètres de fluidité

// Import du générateur Sidi Bou Saïd (si disponible)
let SidiBousaidGenerator;
try {
  if (typeof require !== 'undefined') {
    SidiBousaidGenerator = require('./sidi-bousaid.js');
  }
} catch (e) {
  console.log('Chargement du générateur via script tag');
}

// Configuration de l'arène
const ARENA_CONFIG = {
  name: 'Sidi Bou Sa\u00efd Arena',
  theme: 'tunisian',
  
  // Paramètres de fluidité
  performance: {
    targetFPS: 60,
    maxDrawCalls: 500,
    enableShadows: true,
    shadowQuality: 'medium',
    antialiasing: true,
    vsync: true,
    LODEnabled: true, // Level of Detail
    cullingDistance: 100,
    particleLimit: 1000
  },
  
  // Paramètres graphiques
  graphics: {
    textureQuality: 'high',
    renderDistance: 150,
    fogEnabled: true,
    fogColor: 0xCCE5FF,
    fogNear: 50,
    fogFar: 200,
    ambientLight: 0.6,
    sunIntensity: 1.2
  },
  
  // Configuration du quartier
  neighborhood: {
    centerX: 0,
    centerZ: 0,
    numHouses: 15,
    spacing: 25
  }
};

// Classe principale de gestion de l'arène
class SidiBousaidArena {
  constructor(config) {
    this.config = config;
    this.generator = null;
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.stats = {
      fps: 0,
      drawCalls: 0,
      triangles: 0
    };
  }
  
  // Initialisation de l'arène
  init(sceneObject) {
    console.log('Initialisation de l\'ar\u00e8ne Sidi Bou Sa\u00efd');
    this.scene = sceneObject;
    
    // Configuration des paramètres de rendu
    this.setupRenderer();
    
    // Génération du quartier
    this.generateNeighborhood();
    
    // Configuration de l'éclairage
    this.setupLighting();
    
    // Démarrage de la boucle d'optimisation
    this.startPerformanceMonitor();
    
    console.log('Ar\u00e8ne Sidi Bou Sa\u00efd initialis\u00e9e avec succ\u00e8s');
  }
  
  // Configuration du renderer pour la fluidité
  setupRenderer() {
    if (typeof THREE === 'undefined') {
      console.warn('THREE.js non disponible, configuration limit\u00e9e');
      return;
    }
    
    const perf = this.config.performance;
    
    // Configuration du renderer si disponible
    if (this.renderer) {
      this.renderer.shadowMap.enabled = perf.enableShadows;
      this.renderer.shadowMap.type = perf.shadowQuality === 'high' ? 
        THREE.PCFSoftShadowMap : THREE.PCFShadowMap;
      this.renderer.antialias = perf.antialiasing;
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    
    console.log('Param\u00e8tres de rendu configur\u00e9s:', perf);
  }
  
  // Génération du quartier Sidi Bou Saïd
  generateNeighborhood() {
    if (typeof SidiBousaidGenerator === 'undefined') {
      console.warn('G\u00e9n\u00e9rateur non disponible, cr\u00e9ation basique');
      this.createBasicStructures();
      return;
    }
    
    this.generator = new SidiBousaidGenerator(this.scene);
    
    const nh = this.config.neighborhood;
    this.generator.generateNeighborhood(nh.centerX, nh.centerZ, nh.numHouses);
    
    console.log(`Quartier g\u00e9n\u00e9r\u00e9: ${nh.numHouses} maisons`);
  }
  
  // Création de structures basiques si le générateur n'est pas disponible
  createBasicStructures() {
    console.log('Cr\u00e9ation de structures basiques...');
    // Logique de fallback pour créer quelques structures simples
  }
  
  // Configuration de l'éclairage
  setupLighting() {
    const gfx = this.config.graphics;
    
    console.log('Configuration de l\'\u00e9clairage tunisien');
    console.log('Lumi\u00e8re ambiante:', gfx.ambientLight);
    console.log('Intensit\u00e9 du soleil:', gfx.sunIntensity);
    
    // Configuration du brouillard pour l'ambiance m\u00e9diterran\u00e9enne
    if (gfx.fogEnabled && this.scene) {
      console.log(`Brouillard activ\u00e9: ${gfx.fogNear}m - ${gfx.fogFar}m`);
    }
  }
  
  // Monitoring des performances
  startPerformanceMonitor() {
    const perf = this.config.performance;
    let frameCount = 0;
    let lastTime = performance.now();
    
    const monitor = () => {
      const currentTime = performance.now();
      frameCount++;
      
      // Calcul FPS chaque seconde
      if (currentTime - lastTime >= 1000) {
        this.stats.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Log si performance sous la cible
        if (this.stats.fps < perf.targetFPS * 0.8) {
          console.warn(`Performance: ${this.stats.fps} FPS (cible: ${perf.targetFPS})`);
          this.optimizePerformance();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(monitor);
    };
    
    monitor();
    console.log('Monitoring des performances d\u00e9marr\u00e9');
  }
  
  // Optimisation automatique des performances
  optimizePerformance() {
    console.log('Optimisation des performances...');
    
    // R\u00e9duction de la qualit\u00e9 si n\u00e9cessaire
    if (this.stats.fps < 30) {
      console.log('FPS critique, r\u00e9duction qualit\u00e9');
      this.config.performance.shadowQuality = 'low';
      this.config.graphics.textureQuality = 'medium';
    }
  }
  
  // M\u00e9thode pour obtenir les statistiques
  getStats() {
    return {
      ...this.stats,
      config: this.config,
      houses: this.generator ? this.generator.houses.length : 0,
      flags: this.generator ? this.generator.flags.length : 0
    };
  }
}

// Initialisation globale
let sidiBousaidArena = null;

// Fonction d'initialisation pour être appelée depuis editor.html
function initSidiBousaidArena(scene) {
  sidiBousaidArena = new SidiBousaidArena(ARENA_CONFIG);
  sidiBousaidArena.init(scene);
  return sidiBousaidArena;
}

// Fonction pour obtenir les stats
function getSidiBousaidStats() {
  return sidiBousaidArena ? sidiBousaidArena.getStats() : null;
}

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SidiBousaidArena,
    ARENA_CONFIG,
    initSidiBousaidArena,
    getSidiBousaidStats
  };
}

// Message de chargement
console.log('='.repeat(50));
console.log('Script principal Sidi Bou Sa\u00efd charg\u00e9');
console.log('Pour initialiser: initSidiBousaidArena(scene)');
console.log('='.repeat(50));
