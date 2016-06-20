'use strict';


var createGame = require('voxel-engine-stackgl')({
  pluginLoaders: {
    'voxel-engine-stackgl': require('voxel-engine-stackgl'),
    'voxel-bedrock': require('voxel-bedrock'),
    'voxel-registry': require('voxel-registry'), 
    'voxel-land': require('voxel-land'),
    'voxel-reach': require('voxel-reach'),
    'voxel-mine': require('voxel-mine'),
    'voxel-harvest': require('voxel-harvest'),
    'voxel-use': require('voxel-use'),
    'inventory': require('inventory'),
    'inventory-window': require('inventory-window'),
    'itempile': require('itempile'),
    'voxel-carry': require('voxel-carry'),
    'voxel-modal-dialog': require('voxel-modal-dialog'),
    'voxel-inventory-hotbar': require('voxel-inventory-hotbar'),
    'voxel-inventory-dialog': require('voxel-inventory-dialog'),
    'voxel-inventory-crafting': require('voxel-inventory-crafting'),
    'craftingrecipes': require('craftingrecipes'),
    'voxel-workbench': require('voxel-workbench')
  },
  pluginOpts: {
    'game-shell-fps-camera': {position: [0, -50, 0]},
    'voxel-land': {seed: Math.random()}, 
  }, 
  generateChunks: false
  });
  
  var game = createGame()
  var createReach = game.plugins.get('voxel-reach')
  reach = createReach(game, {reachDistance: 8})

  reach.on('use', function(target) { 
    if (target)
      game.createBlock(target.adjacent, 1)
  })

  reach.on('mining', function(target) { 
    if (target)
      game.setBlock(target.voxel, 0)
  })
