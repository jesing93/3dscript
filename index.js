var texturePath = require('programmerart-textures')('')
var createGame = require('voxel-engine')
/*var createGame = require('voxel-engine-stackgl')({
  pluginLoaders: {
    //'voxel-bedrock': require('voxel-bedrock'),
    //'voxel-flatland': require('voxel-flatland')
  },
  pluginOpts: {
    'voxel-engine-stackgl': {generateChunks: false},
    'game-shell-fps-camera': {position: [0, -100, 0]},

    //'voxel-bedrock': {},
    //'voxel-flatland': {block: 'bedrock'}
  }})*/
//var createArtpacks = require('artpacks')
//var textureEngine = require('voxel-texture-shader')({
  // a copy of your voxel.js game
//  game: game,
//
  // artpacks instance
//  artPacks: artPacks
//});
var highlight = require('voxel-highlight')
var player = require('voxel-player')
var voxel = require('voxel')
var extend = require('extend')
var fly = require('voxel-fly')
var walk = require('voxel-walk')
//var createPlugins = require('voxel-plugins')
//var plugins = createPlugins(game, {require:require})

//plugins.add('voxel-registry', {});
//var registry = game.plugins.get('voxel-registry');
//plugins.loadAll();

module.exports = function(opts, setup) {
  setup = setup || defaultSetup
  var defaults = {
    generate: function(x,y,z) {
    var limit = Math.floor(Math.random() * 10) + 1;
    if ((x*x + y*y + z*z > limit*limit)/* && (y*y < 30)*/) { 
      return 0
    }else{
      return Math.floor(Math.random() * 4) + 1
    }
  },
    texturePath: texturePath, //'/textures/'
    //generateChunks: false,
    chunkDistance: 2,
    materials: [['blocks/grass_top', 'blocks/dirt', 'blocks/grass_side'], 'blocks/stone', 'blocks/dirt'], //['#fff', '#000'],
    //materialFlatColor: true,
    worldOrigin: [0, 0, 0],
    controls: { discreteFire: true }
  }
  opts = extend({}, defaults, opts || {})

  // setup the game and add some trees
  var game = createGame(opts)
  var container = opts.container || document.body
  window.game = game // for debugging
  game.appendTo(container)
  if (game.notCapable()) return game
  
  var createPlayer = player(game)
  //var artpacks = createArtpacks(['textures/PureBDcraft_32x_MC17.zip'])
  

  // create the player from a minecraft skin file and tell the
  // game to use it as the main player
  var avatar = createPlayer(opts.playerSkin || 'player.png')
  avatar.possess()
  avatar.yaw.position.set(0, 101, 0)

  setup(game, avatar)
  
  return game
}

function defaultSetup(game, avatar) {
  
  var makeFly = fly(game)
  var target = game.controls.target()
  game.flyer = makeFly(target)
  
  // highlight blocks when you look at them, hold <Ctrl> for block placement
  var blockPosPlace, blockPosErase
  var hl = game.highlighter = highlight(game, { color: 0xff0000 })
  hl.on('highlight', function (voxelPos) { blockPosErase = voxelPos })
  hl.on('remove', function (voxelPos) { blockPosErase = null })
  hl.on('highlight-adjacent', function (voxelPos) { blockPosPlace = voxelPos })
  hl.on('remove-adjacent', function (voxelPos) { blockPosPlace = null })

  // toggle between first and third person modes
  window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 'R'.charCodeAt(0)) avatar.toggle()
  })

  // block interaction stuff, uses highlight data
  var currentMaterial = 1

  game.on('fire', function (target, state) {
    var position = blockPosPlace
    if (position) {
      game.createBlock(position, currentMaterial)
    }
    else {
      position = blockPosErase
      if (position) game.setBlock(position, 0)
    }
  })

  game.on('tick', function() {
    walk.render(target.playerSkin)
    var vx = Math.abs(target.velocity.x)
    var vz = Math.abs(target.velocity.z)
    if (vx > 0.001 || vz > 0.001) walk.stopWalking()
    else walk.startWalking()
  })

}
