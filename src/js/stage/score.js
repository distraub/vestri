import { Stage, game, ColorLayer, BitmapText, input, state, save, Color, device} from 'melonjs'
import gameData from '../gameData.js'
import Clicker from '../renderables/clicker'

class ScoreScreen extends Stage {
  onResetEvent () {
    // Add a background layer at the lowest layer index.
    game.world.addChild(new ColorLayer('background', '#101020'), 0)
    game.world.addChild(new Clicker(0, 0, { width: game.viewport.width, height: game.viewport.height }), 0)

    const ultraTall = game.viewport.height >= game.viewport.width * 1.5
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
        if (shieldRoll > 70 - gameData.luck) {
            gameData.shield += 1
            shieldText = `Shield increased by 1 to ${gameData.shield}`
        }
        
        if (luckRoll > 65 - (gameData.luck * gameData.multiplier)) {
            if (gameData.luck < 5) {
                gameData.luck += 1
                luckText = `Extra lucky! Luck increased by 1 to ${gameData.luck}`
            } else {
                luckText = `You are already very lucky! Luck stayed at max ${gameData.luck}`
            }
        } else {
            if (gameData.luck > 1) {
                gameData.luck--
                luckText = `It wasn't extra lucky. Luck decreased by 1 to ${gameData.luck}`
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
                    bonusText = `You scored ${gameData.score} points`
                }
            }
            if (!gameData.gameOver) {
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
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 - ultraTall ? 60 : 40, {
        font: 'PressStart2P',
        size: ultraTall ? 1.7 : 1.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: bonusText
      }),
      1
    )

    const shieldColor = new Color()
    shieldColor.parseHex('#027df4')
    const shieldRenderText = new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + ultraTall ? 70 : 50, {
            font: 'PressStart2P',
            size: ultraTall ? 1 : 0.6,
            textBaseline: 'middle',
            textAlign: 'center',
            text: shieldText
        })
    shieldRenderText.tint.setColor(shieldColor.r, shieldColor.g, shieldColor.b)
    game.world.addChild(shieldRenderText, 1)

    const luckColor = new Color()
    luckColor.parseHex('#02f46a')
    const luckRenderText = new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + ultraTall ? 100 : 80, {
            font: 'PressStart2P',
            size: ultraTall ? 1 : 0.6,
            textBaseline: 'middle',
            textAlign: 'center',
            text: luckText
        })
    luckRenderText.tint.setColor(luckColor.r, luckColor.g, luckColor.b)
    game.world.addChild(luckRenderText, 1)

    

    const multiplierColor = new Color()
    multiplierColor.parseHex('#c702f4')
    const multiplierRendertext = new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + ultraTall ? 130 : 110, {
        font: 'PressStart2P',
        size: ultraTall ? 1 : 0.6,
        textBaseline: 'middle',
        textAlign: 'center',
        text: multipliertext
      })
    multiplierRendertext.tint.setColor(multiplierColor.r, multiplierColor.g, multiplierColor.b)
    game.world.addChild(multiplierRendertext, 1)

    let startText = 'Press Space or Click to continue'
    if (device.isMobile) {
        startText = 'Tap to continue'
    }
    // Add prompt text.
    game.world.addChild(
        new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + ultraTall ? 180: 160, {
          font: 'PressStart2P',
          size: ultraTall ? 1.1 : 0.8,
          textBaseline: 'middle',
          textAlign: 'center',
          text: startText
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