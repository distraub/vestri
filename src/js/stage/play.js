import { Stage, game, ColorLayer, BitmapText, Color, device } from 'melonjs'
import Chest from '../renderables/chest.js'
import { pool } from 'melonjs'
import gameData from '../gameData.js'

class PlayScreen extends Stage {
  onResetEvent () {
    game.world.gravity = { x:0, y:0 }
    const ultraTall = game.viewport.height >= game.viewport.width * 1.5

    if (gameData.chests === undefined || gameData.chests == null) {
        gameData.chests = 2
    }

    game.world.addChild(
        new BitmapText(game.viewport.width / 2 - 20, ultraTall ? 80 : 20, {
          font: 'PressStart2P',
          size: ultraTall ? 1.5 :0.8,
          textBaseline: 'top',
          textAlign: 'center',
          text: `Score: ${gameData.score}`
        }),
        1
      )

    const luckColor = new Color()
    luckColor.parseHex('#02f46a')
    const luckText = new BitmapText(20, 20, {
    font: 'PressStart2P',
    size: ultraTall ? 1.5 :0.8,
    textBaseline: 'top',
    textAlign: 'left',
    text: `Luck: ${gameData.luck}`
    })
    luckText.tint.setColor(luckColor.r, luckColor.g, luckColor.b)
    game.world.addChild(luckText, 1)

    const multiplierColor = new Color()
    multiplierColor.parseHex('#c702f4')
    const multipliertext = new BitmapText(game.viewport.width - 20, 20, {
        font: 'PressStart2P',
        size: ultraTall ? 1.5 :0.8,
        textBaseline: 'top',
        textAlign: 'right',
        text: `Multiplier: ${gameData.multiplier}`
      })
    multipliertext.tint.setColor(multiplierColor.r, multiplierColor.g, multiplierColor.b)
    game.world.addChild(multipliertext, 1)

    const livesColor = new Color()
    livesColor.parseHex('#f4dc02')
    const livesText = new BitmapText(20, game.viewport.height - (ultraTall ? 100 : 20), {
        font: 'PressStart2P',
        size: ultraTall ? 1.5 :0.8,
        textBaseline: 'bottom',
        textAlign: 'left',
        text: `Lives: ${gameData.lives}`
      })
    livesText.tint.setColor(livesColor.r, livesColor.g, livesColor.b)
    game.world.addChild(livesText, 1)

    const shieldColor = new Color()
    shieldColor.parseHex('#027df4')
    const shieldText = new BitmapText(game.viewport.width - 20, game.viewport.height - (ultraTall ? 100 : 20), {
        font: 'PressStart2P',
        size: ultraTall ? 1.5 :0.8,
        textBaseline: 'bottom',
        textAlign: 'right',
        text: `Shield: ${gameData.shield}`
      })
    shieldText.tint.setColor(shieldColor.r, shieldColor.g, shieldColor.b)
    game.world.addChild(shieldText, 1)

    // Add a background layer
    game.world.addChild(new ColorLayer('background', '#101020'), 0)

    const luckyChest = Math.floor(Math.random() * gameData.chests)
    const isLandscape = game.viewport.width > game.viewport.height
    const totalDistance = isLandscape ? game.viewport.width : game.viewport.height
    const luckRadius = gameData.luck - 1

    for (let x = 0; x < gameData.chests; x++) {
        let isLuckyChest = x >= luckyChest - luckRadius && x <= luckyChest + luckRadius
        const chestSize = ultraTall ? 100 : 50
        const chestCenter = totalDistance * (x + 1) / (gameData.chests + 1)
        if (isLandscape) {
            game.world.addChild(new Chest(chestCenter, 200, { width: chestSize, height: chestSize, id: `${x}`, isLuckyChest }), 1)
        } else {
            game.world.addChild(new Chest(game.viewport.width / 2, chestCenter, { width: chestSize, height: chestSize, id: `${x}`, isLuckyChest }), 1)
        }
    }
    // game.world.addChild(new Chest(400, 100, { width: 50, height: 50, color: '#874621' }), 1)

    // Pull the player from the pool instead of game.world.pull
    if (!device.isMobile && isLandscape) {
        const player = pool.pull('mainPlayer', (totalDistance / 2) + 12.5, 400, { width: 25, height: 25 })
        game.world.addChild(player, 2)
    }
  }
}

export default PlayScreen