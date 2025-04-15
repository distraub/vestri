import { Stage, game, ColorLayer, BitmapText } from 'melonjs'
import Chest from '../renderables/chest.js'
import { pool } from 'melonjs'
import gameData from '../gameData.js'

class PlayScreen extends Stage {
  onResetEvent () {
    game.world.gravity = { x:0, y:0 }

    if (gameData.chests === undefined || gameData.chests == null) {
        gameData.chests = 2
    }

    game.world.addChild(
        new BitmapText(game.viewport.width / 2, 20, {
          font: 'PressStart2P',
          size: 0.8,
          textBaseline: 'top',
          textAlign: 'center',
          text: `Score: ${gameData.score}`
        }),
        1
      )

    // Add a background layer
    game.world.addChild(new ColorLayer('background', '#101020'), 0)

    const luckyChest = Math.floor(Math.random() * gameData.chests)
    const totalWidth = game.viewport.width / 2

    for (let x = 0; x < gameData.chests; x++) {
        const isLuckyChest = x == luckyChest
        const chestSize = 50
        const centerX = totalWidth * (x + 1) / (gameData.chests + 1)
        const leftX = centerX - (chestSize / 2)
        game.world.addChild(new Chest(leftX, 100, { width: chestSize, height: chestSize, id: `${x}`, isLuckyChest }), 1)
    }

    
    // game.world.addChild(new Chest(400, 100, { width: 50, height: 50, color: '#874621' }), 1)

    // Pull the player from the pool instead of game.world.pull
    const player = pool.pull('mainPlayer', (totalWidth / 2) - 12.5, 200, { width: 25, height: 25 })
    game.world.addChild(player, 2)
  }
}

export default PlayScreen