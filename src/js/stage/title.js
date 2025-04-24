import { Stage, game, ColorLayer, BitmapText, input, state, device } from 'melonjs'
import gameData from '../gameData'
import Clicker from '../renderables/clicker'

class TitleScreen extends Stage {
  onResetEvent () {
    // Add a background layer at the lowest layer index.
    game.world.addChild(new ColorLayer('background', '#101020'), 0)
    gameData.score = 0
    gameData.lives = 3 + gameData.addLives
    gameData.shield = 0 + gameData.addShield
    gameData.multiplier = 1 + gameData.addMultiplier
    gameData.luck = 1 + gameData.addLuck
    gameData.chests = 2
    gameData.gameOver = false

   game.world.addChild(new Clicker(0, 0, { width: game.viewport.width, height: game.viewport.height }), 0)

   if (device.hasFullscreenSupport) {
        device.requestFullscreen()
    }
   const ultraTall = game.viewport.height >= game.viewport.width * 1.5
   
   // Add a title background image.
    // Add title text (centered).
    game.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 - 20, {
        font: 'PressStart2P',
        size: ultraTall ? 5 : 3.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: 'Vestri'
      }),
      1
    )

    let startText = 'Press Space or Click to start'
    if (device.isMobile) {
        startText = 'Tap to start'
    }
    // Add prompt text.
    game.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + (ultraTall ? 80: 40), {
        font: 'PressStart2P',
        size: ultraTall ? 1.8 : 1.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: startText
      }),
      1
    )

    // Bind the A key to a custom action "startGame".
    input.bindKey(input.KEY.SPACE, 'startGame', true)
    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.START}, input.KEY.SPACE)
    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.A}, input.KEY.SPACE)
  }

  onClick (event) {
    console.log('click')
  }

  update (dt) {
    // Check if the A key was pressed.
    if (input.isKeyPressed('startGame')) {
      state.change(state.PLAY)
    }
    // Continue with regular update processing.
    return super.update(dt)
  }

  onDestroyEvent () {
    // Unbind the A key when leaving this screen.
    input.unbindKey(input.KEY.SPACE)
  }
}

export default TitleScreen