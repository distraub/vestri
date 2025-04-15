import {
    audio,
    loader,
    state,
    device,
    video,
    utils,
    plugin,
    pool,
    input
  } from 'melonjs'
  import './index.css'
  import TitleScreen from './js/stage/title.js'
  import PlayScreen from './js/stage/play.js'
  import ScoreScreen from './js/stage/score.js'
  import PlayerEntity from './js/renderables/player.js'
  import DataManifest from './manifest.js'
  
  device.onReady(function () {
    // Force Canvas mode so native drawing methods (like fillRect) work
    if (
      !video.init(1218, 562, {
        parent: 'screen',
        scale: 'auto',
        renderer: video.CANVAS
      })
      
    ) {
      alert('Your browser does not support HTML5 canvas')
      return
    }

    
  
    if (process.env.NODE_ENV === 'development') {
      import('@melonjs/debug-plugin').then(debugPlugin => {
        utils.function.defer(
          plugin.register,
          this,
          debugPlugin.DebugPanelPlugin,
          'debugPanel'
        )
      })
    }
  
    audio.init('mp3,ogg')
    loader.setOptions({ crossOrigin: 'anonymous' })
  
    // Bind arrow keys if needed (for your player later)
    input.bindKey(input.KEY.LEFT, 'left', true)
    input.bindKey(input.KEY.RIGHT, 'right', true)
    input.bindKey(input.KEY.UP, 'up', true)
    input.bindKey(input.KEY.DOWN, 'down', true)
    input.bindKey(input.KEY.A, 'left', true)
    input.bindKey(input.KEY.D, 'right', true)
    input.bindKey(input.KEY.W, 'up', true)
    input.bindKey(input.KEY.S, 'down', true)        

    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.LEFT}, input.KEY.LEFT)
    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.RIGHT}, input.KEY.RIGHT)
    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.UP}, input.KEY.UP)
    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.DOWN}, input.KEY.DOWN)

    loader.preload(DataManifest, function () {
      // You can start with the TitleScreen or jump to the PlayScreen.
      // Here we set both states.
      state.set(state.MENU, new TitleScreen())
      state.set(state.PLAY, new PlayScreen())
      state.set(state.SCORE, new ScoreScreen())
  
      // Register the player entity for later use.
      pool.register('mainPlayer', PlayerEntity)
  
      // For testing, directly change to the PLAY state.
      state.change(state.MENU)
    })
  })