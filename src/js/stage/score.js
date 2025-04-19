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
            shieldText = `Shield is now ${gameData.shield}`
        }
        
        if (luckRoll > 65 - (gameData.luck + gameData.multiplier)) {
            if (gameData.luck < 5) {
                gameData.luck += 1
                luckText = `Extra lucky! Luck is now ${gameData.luck}`
            } else {
                luckText = `Luck stayed at max ${gameData.luck}`
            }
        } else {
            if (gameData.luck > 1) {
                gameData.luck--
                luckText = `Not extra lucky. Luck is now ${gameData.luck}`
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
            multipliertext = `Multiplier is now ${multiplier} to ${gameData.multiplier}`
        }

        gameData.foundLuckyChest = false
    } else {
        if (gameData.shield > 0) {
            gameData.shield--
            bonusText = `Shield used, kept chests`
        } else {
            if (gameData.chests > 2) {
                gameData.chests--
            } else {
                if (gameData.lives > 0) {
                    gameData.lives--
                } else {
                    gameData.gameOver = true
                    chestMessage = 'Game Over'
                    if (gameData.score > gameData.highScore) {
                        gameData.highScore = gameData.score
                        bonusText = `New High Score! ${gameData.score} points`
                    } else {
                        bonusText = `You scored ${gameData.score} points`
                    }
                }
            }
            if (!gameData.gameOver) {
                if (gameData.luck > 1) {
                    gameData.luck--
                    luckText = `Luck is now ${gameData.luck}`
                }
                if (gameData.multiplier > 1) {
                    gameData.multiplier--
                    multipliertext = `Multiplier is now ${gameData.multiplier}`
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
      new BitmapText(game.viewport.width / 2, game.viewport.height / 2 - (ultraTall ? 10 : 40), {
        font: 'PressStart2P',
        size: ultraTall ? 1.7 : 1.0,
        textBaseline: 'middle',
        textAlign: 'center',
        text: bonusText
      }),
      1
    )

    const textArray = []

    if (shieldText != '') {
        textArray.push({text: shieldText, color: '#027df4'})
    }
    if (luckText != '') {
        textArray.push({text: luckText, color: '#02f46a'})
    }
    if (multipliertext != '') {
        textArray.push({text: multipliertext, color: '#c702f4'})
    }

    for (let i = 0; i < textArray.length; i++) {
        const textColor = new Color()
        textColor.parseHex(textArray[i].color)
        const yStart = ultraTall ? 60 : 10
        const yModifer = ultraTall ? 65 : 40
        const textRender = new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + (yStart + (i * yModifer)), {
            font: 'PressStart2P',
            size: ultraTall ? 1.4 : 1.0,
            textBaseline: 'middle',
            textAlign: 'center',
            text: textArray[i].text
          })
        textRender.tint.setColor(textColor.r, textColor.g, textColor.b)
        game.world.addChild(textRender, 1)
    }

    let startText = 'Press Space or Click to continue'
    if (device.isMobile) {
        startText = 'Tap to continue'
    }
    // Add prompt text.
    game.world.addChild(
        new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + (ultraTall ? 70 + (59 * textArray.length) : 20 + (40 * textArray.length)), {
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