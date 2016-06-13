'use strict';

var createGame = require('voxel-engine-stackgl')({
  pluginLoaders: {
    'voxel-bedrock': require('voxel-bedrock'),
    'voxel-registry': require('voxel-registry'), 
    'voxel-land': require('voxel-land')
  },
  pluginOpts: {
    'voxel-engine-stackgl': {generateChunks: false},
    'game-shell-fps-camera': {position: [0, -100, 0]},

    'voxel-bedrock': {},
    'voxel-land': {}
  }});

/*var game = createGame();
var createPlugins = require('voxel-plugins');
var plugins = createPlugins(game, {require:require});
plugins.add('voxel-registry', {});
plugins.add('voxel-land', {});
plugins.loadAll();
var registry = game.plugins.get('voxel-registry');
Land(game)*/
