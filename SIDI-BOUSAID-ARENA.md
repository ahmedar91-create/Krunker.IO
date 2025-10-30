# Arène Sidi Bou Saïd - Krunker.IO

## Description

Ce projet ajoute une arène personnalisée inspirée de **Sidi Bou Saïd**, la célèbre ville tunisienne aux maisons blanches et bleues, au jeu Krunker.IO.

## 🇹🇳 Caractéristiques

### 1. Génération Automatique de Maisons
- **Style architectural tunisien** : Maisons blanches avec portes et fenêtres bleues
- **Toits en terracotta rouge** typiques de l'architecture méditerranéenne
- **Variation aléatoire** : Chaque maison a des dimensions uniques
- **Disposition en quartier** : Organisation spatiale réaliste

### 2. Drapeaux Tunisiens
- Image du drapeau tunisien intégrée : `assets/flags/drapeau-tunisie.png`
- Génération automatique sur certaines maisons
- Mâts avec drapeaux flottants

### 3. Optimisation des Performances
- **FPS cible** : 60 FPS
- **Système LOD** (Level of Detail) activé
- **Culling intelligent** : Distance de rendu optimisée
- **Gestion automatique** : Réduction de qualité si FPS < 30
- **Monitoring en temps réel** des performances

### 4. Paramètres Graphiques
- Qualité des textures : Haute
- Ombres : Activées (qualité moyenne)
- Antialiasing : Activé
- V-Sync : Activé
- Brouillard méditerranéen : Effet d'ambiance

## 📁 Structure des Fichiers

```
Krunker.IO/
├── assets/
│   └── flags/
│       ├── .gitkeep
│       └── drapeau-tunisie.png     # Image du drapeau tunisien
├── sidi-bousaid.js              # Générateur de maisons et drapeaux
├── main-arena-sidi-bousaid.js   # Script principal d'initialisation
├── editor.html                  # Éditeur de carte Krunker
└── SIDI-BOUSAID-ARENA.md        # Cette documentation
```

## 🚀 Utilisation

### Intégration dans Krunker

1. **Charger les scripts** dans l'éditeur Krunker :
```html
<script src="sidi-bousaid.js"></script>
<script src="main-arena-sidi-bousaid.js"></script>
```

2. **Initialiser l'arène** :
```javascript
// Après le chargement de la scène
const arena = initSidiBousaidArena(scene);
```

3. **Obtenir les statistiques** :
```javascript
const stats = getSidiBousaidStats();
console.log('FPS:', stats.fps);
console.log('Maisons:', stats.houses);
console.log('Drapeaux:', stats.flags);
```

## ⚙️ Configuration

### Paramètres Modifiables

Dans `main-arena-sidi-bousaid.js`, vous pouvez ajuster :

```javascript
const ARENA_CONFIG = {
  performance: {
    targetFPS: 60,           // FPS cible
    enableShadows: true,     // Activer les ombres
    shadowQuality: 'medium', // Qualité des ombres
    // ...
  },
  neighborhood: {
    numHouses: 15,           // Nombre de maisons
    spacing: 25              // Espacement entre maisons
  }
};
```

## 🎨 Palette de Couleurs Sidi Bou Saïd

- **Blanc** : `0xFFFFFF` - Murs des maisons
- **Bleu** : `0x0066CC` - Portes et fenêtres
- **Rouge terracotta** : `0xFF4444` - Toits
- **Gris** : `0x888888` - Mâts de drapeaux

## 📊 Optimisations Techniques

### Système de Performance
- Monitoring FPS en temps réel
- Dégradation automatique de qualité
- Limitation du nombre de draw calls (max 500)
- Limitation des particules (max 1000)

### Rendu Optimisé
- Culling à 100m de distance
- Distance de rendu : 150m
- Brouillard : 50m - 200m

## 🔧 Développement

### Commits Réalisés
1. ✅ Création du script `sidi-bousaid.js`
2. ✅ Ajout de la structure `assets/flags/`
3. ✅ Upload du drapeau tunisien
4. ✅ Création du script principal `main-arena-sidi-bousaid.js`
5. ✅ Documentation complète

## 🌐 Contexte Culturel

**Sidi Bou Saïd** est une petite ville côtière au nord de la Tunisie, célèbre pour :
- Son architecture distinctive blanc et bleu
- Ses ruelles pittoresques
- Sa vue sur la Méditerranée
- Son patrimoine culturel unique

Cette arène rend hommage à ce joyau tunisien en recréant son ambiance architecturale unique dans Krunker.IO.

## 📝 Notes

- Compatible avec Three.js
- Fonctionne avec l'éditeur Krunker standard
- Performance optimisée pour 60 FPS
- Génération procédurale pour variété

## 👤 Auteur

Développé pour le fork **ahmedar91-create/Krunker.IO**

---

**🇹🇳 Vive la Tunisie! 🇹🇳**
