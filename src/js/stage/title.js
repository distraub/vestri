import { Stage, game, ColorLayer, BitmapText, input, state } from 'melonjs'
import gameData from '../gameData'
import Clicker from '../renderables/clicker'

class TitleScreen extends Stage {
  onResetEvent () {
    // Add a background layer at the lowest layer index.
    game.world.addChild(new ColorLayer('background', '#101020'), 0)
    gameData.score = 0
    gameData.lives = 3
    gameData.shield = 0
    gameData.multiplier = 1
    gameData.luck = 1
    gameData.chests = 2
    gameData.gameOver = false

   game.world.addChild(new Clicker(0, 0, { width: game.viewport.width, height: game.viewport.height }), 0)

    // Add title text (centered).
    game.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 - 20, {
        font: 'PressStart2P',
        size: 3.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: 'Vestri'
      }),
      1
    )

    // Add prompt text.
    game.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + 40, {
        font: 'PressStart2P',
        size: 1.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: 'Press Space To Start'
      }),
      1
    )

    // Bind the A key to a custom action "startGame".
    input.bindKey(input.KEY.SPACE, 'startGame', true)
    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.START}, input.KEY.SPACE)
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