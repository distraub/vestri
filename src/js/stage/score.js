import { Stage, game, ColorLayer, BitmapText, input, state, save, Color} from 'melonjs'
import gameData from '../gameData.js'

class ScoreScreen extends Stage {
  onResetEvent () {
    // Add a background layer at the lowest layer index.
    game.world.addChild(new ColorLayer('background', '#101020'), 0)

    gameData.startRound = false

    let chestMessage = 'Sorry try again'
    let bonusText = ''
    let luckText = ''
    let multipliertext = ''
    let shieldText = ''

    if (gameData.foundLuckyChest) {
        const scoreAdd = gameData.chests * 100
        gameData.score += scoreAdd * gameData.multiplier
        chestMessage = 'You found a lucky chest!'
        bonusText = `You got ${scoreAdd * gameData.multiplier} points`
        if (gameData.chests < 11) {
            gameData.chests++
        }

        const luckRoll = Math.floor(Math.random() * 100)
        const multiplierRoll = Math.floor(Math.random() * 100)
        const shieldRoll = Math.floor(Math.random() * 100)
        if (shieldRoll > 90 - gameData.luck) {
            gameData.shield += 1
            shieldText = `Shield increased by 1 to ${gameData.shield}`
        }
        if (gameData.luck < 5) {
            if (luckRoll > 85 - (gameData.luck * gameData.multiplier)) {
                gameData.luck += 1
                luckText = `Luck increased by 1 to ${gameData.luck}`
            }
        }
        let multiplier = 0
        if (multiplierRoll > 80 - gameData.luck) {
            multiplier = 1
        }
        if (multiplierRoll > 90 - gameData.luck) {
            multiplier = 2
        }
        if (multiplierRoll > 95 - gameData.luck) {
            multiplier = 3
        }

        if (multiplier > 0) {
            gameData.multiplier += multiplier
            multipliertext = `Multiplier increased by ${multiplier} to ${gameData.multiplier}`
        }

        gameData.foundLuckyChest = false
    } else {
        if (gameData.shield > 0) {
            gameData.shield--
            bonusText = `Used a shield, but kept your chests and stats`
        } else {
            if (gameData.chests > 2) {
                gameData.chests--
            } else {
                if (gameData.lives > 0) {
                    gameData.lives--
                } else {
                    gameData.gameOver = true
                    chestMessage = 'Game Over'
                    bonusText = 'No more lives left'
                }
            }
            if (gameData.luck > 1) {
                gameData.luck--
                luckText = `Luck decreased by 1 to ${gameData.luck}`
            }
            if (gameData.multiplier > 1) {
                gameData.multiplier--
                multipliertext = `Multiplier decreased by 1 to ${gameData.multiplier}`
            }
        }
    }

    // Add title text (centered).
    game.world.addChild(
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 - 100, {
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
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 - 40, {
        font: 'PressStart2P',
        size: 1.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: bonusText
      }),
      1
    )

    const shieldColor = new Color()
    shieldColor.parseHex('#027df4')
    const shieldRenderText = new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + 50, {
            font: 'PressStart2P',
            size: 0.6,
            textBaseline: 'middle',
            textAlign: 'center',
            text: shieldText
        })
    shieldRenderText.tint.setColor(shieldColor.r, shieldColor.g, shieldColor.b)
    game.world.addChild(shieldRenderText, 1)

    const luckColor = new Color()
    luckColor.parseHex('#02f46a')
    const luckRenderText = new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + 80, {
            font: 'PressStart2P',
            size: 0.6,
            textBaseline: 'middle',
            textAlign: 'center',
            text: luckText
        })
    luckRenderText.tint.setColor(luckColor.r, luckColor.g, luckColor.b)
    game.world.addChild(luckRenderText, 1)

    

    const multiplierColor = new Color()
    multiplierColor.parseHex('#c702f4')
    const multiplierRendertext = new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + 110, {
        font: 'PressStart2P',
        size: 0.6,
        textBaseline: 'middle',
        textAlign: 'center',
        text: multipliertext
      })
    multiplierRendertext.tint.setColor(multiplierColor.r, multiplierColor.g, multiplierColor.b)
    game.world.addChild(multiplierRendertext, 1)

    // Add prompt text.
    game.world.addChild(
        new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + 160, {
          font: 'PressStart2P',
          size: 0.8,
          textBaseline: 'middle',
          textAlign: 'center',
          text: 'Press Space to continue'
        }),
        1
      )
    // Add prompt text.  
    // Bind the A key to a custom action "startGame".
    input.bindKey(input.KEY.SPACE, 'startGame', true)
    input.bindGamepad(0, {type:"buttons", code: input.GAMEPAD.BUTTONS.START}, input.KEY.SPACE)
  }

  update (dt) {
    // Check if the A key was pressed.
    if (input.isKeyPressed('startGame')) {
        if (gameData.gameOver) {
            state.change(state.MENU)
        } else {
            state.change(state.PLAY)
        }
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