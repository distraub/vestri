import { Sprite, collision, state, game, input, loader, Body, Rect, Vector2d, Color } from 'melonjs'
import gameData from '../gameData.js'

export default class Clicker extends Sprite {
  constructor (x, y, settings = {}) {
    // Ensure mandatory properties are defined
    settings.width = settings.width || 50
    settings.height = settings.height || 50
    // settings.number = settings.number || 0
    settings.image = "chest"
    settings.framewidth = settings.width || 50
    settings.frameheight = settings.height || 50
    // settings.anchorPoint = new Vector2d(0.5, 0.5)
    super(x, y, settings)
    this.isLuckyChest = settings.isLuckyChest
    // Multiply the size as desired
    this.width = settings.width
    this.height = settings.height
    this.collisions = 0
    this.anchorPoint.set(0, 0)

    this.body = new Body(this)
    this.body.addShape(new Rect(0, 0, this.width, this.height));
    this.body.ignoreGravity = true;
    const clickerColor = new Color()
    clickerColor.parseHex('#101020')
    this.tint.setColor(clickerColor.r, clickerColor.g, clickerColor.b)

    // Mark the entity as clickable
    this.isClickable = true
    // Register a pointer event for a mouse/touch click on this entity.
    input.registerPointerEvent('pointerdown', this, this.onClick.bind(this), true)
  }

  update (dt) {
    return super.update(dt)
  }

  onClick (event) {
    // When clicked, perform the same actions as in collision with the player.
    if (state.isCurrent(state.MENU)) {
      state.change(state.PLAY)
      return false
    }
    if (state.isCurrent(state.SCORE)) {
      if (gameData.gameOver) {
            state.change(state.MENU)
        } else {
            state.change(state.PLAY)
        }
      return false
    }
    // Returning false stops propagation (optional)
    return false
  }

  onDestroyEvent () {
    // Remove the pointer event for cleanup
    input.releasePointerEvent('pointerdown', this)
  }
}