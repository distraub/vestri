import { Stage, game, ColorLayer, BitmapText, input, state, save } from 'melonjs'
import gameData from '../gameData.js'

class ScoreScreen extends Stage {
  onResetEvent () {
    // Add a background layer at the lowest layer index.
    game.world.addChild(new ColorLayer('background', '#101020'), 0)

    gameData.startRound = false

    let chestMessage = 'Sorry try again'
    let bonusText = ''

    if (gameData.foundLuckyChest) {
        const scoreAdd = gameData.chests * 100
        gameData.score += scoreAdd
        chestMessage = 'You found the lucky chest!'
        bonusText = `You got ${scoreAdd} points`
        if (gameData.chests < 11) {
            gameData.chests++
        }
        gameData.foundLuckyChest = false
    } else {
        if (gameData.chests > 2) {
            gameData.chests--
        }
    }

    // Add title text (centered).
    game.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 - 20, {
        font: 'PressStart2P',
        size: 2.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: chestMessage
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
        text: bonusText
      }),
      1
    )

    // Add prompt text.
    game.world.addChild(
        new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + 80, {
          font: 'PressStart2P',
          size: 0.8,
          textBaseline: 'middle',
          textAlign: 'center',
          text: 'Press Space to continue'
        }),
        1
      )

    
    // Bind the A key to a custom action "startGame".
    input.bindKey(input.KEY.SPACE, 'startGame', true)
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

export default ScoreScreen