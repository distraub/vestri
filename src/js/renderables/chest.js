import { Entity, collision, state, game, input } from 'melonjs'
import gameData from '../gameData.js'

export default class Chest extends Entity {
  constructor (x, y, settings = {}) {
    // Ensure mandatory properties are defined
    settings.width = settings.width || 50
    settings.height = settings.height || 50
    settings.number = settings.number || 0
    super(x, y, settings)
    this.isLuckyChest = settings.isLuckyChest
    // Multiply the size as desired
    this.width = settings.width * 2
    this.height = settings.height * 2
    this.collisions = 0
    this.anchorPoint.set(0.5, 0.5)

    // Mark the entity as clickable
    this.isClickable = true
    // Register a pointer event for a mouse/touch click on this entity.
    // The 'pointerdown' event will trigger onClick when the chest is pressed.
    input.registerPointerEvent('pointerdown', this, this.onClick.bind(this), true)
  }

  update (dt) {
    return super.update(dt)
  }

  draw (renderer) {
    const ctx = renderer.getContext()
    if (ctx) {
      // Use your gameData array or other method to choose a color.
      ctx.fillStyle = gameData.chestColors[this.id]
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
  }

  onCollision (response, other) {
    if (other.body.collisionType === collision.types.PLAYER_OBJECT) {
      this.body.setCollisionMask(collision.types.NO_OBJECT)
      if (this.isLuckyChest) {
        gameData.foundLuckyChest = true
      } else {
        gameData.foundLuckyChest = false
      }
      state.change(state.SCORE)
      return false
    }
  }

  onClick (event) {
    // When clicked, perform the same actions as in collision with the player.
    if (this.body) {
      this.body.setCollisionMask(collision.types.NO_OBJECT)
    }
    if (this.isLuckyChest) {
      gameData.foundLuckyChest = true
    } else {
      gameData.foundLuckyChest = false
    }
    state.change(state.SCORE)
    // Returning false stops propagation (optional)
    return false
  }

  onDestroyEvent () {
    // Remove the pointer event for cleanup
    input.releasePointerEvent('pointerdown', this)
  }
}