import { Entity, collision, game, event } from 'melonjs'

export default class PlayerEntity extends Entity {
  constructor (x, y, settings = {}) {
    settings.width = settings.width || 50
    settings.height = settings.height || 50
    super(x, y, settings)
    this.width = settings.width * 2
    this.height = settings.height * 2
    // Set a speed value (pixels per frame, adjust as needed)
    this.speed = 4
    // Create flags for movement
    this.moving = {
      left: false,
      right: false,
      up: false,
      down: false
    }
    // Bind event handlers and register them
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    event.on(event.KEYDOWN, this.onKeyDown)
    event.on(event.KEYUP, this.onKeyUp)
    this.body.collisionType = collision.types.PLAYER_OBJECT
    this.anchorPoint.set(0.5, 0.5)
  }

  onKeyDown (action, keyCode, edge) {
    // Use the action name provided by the key binding (e.g., "left")
    if (action === 'left') {
      this.moving.left = true
    }
    if (action === 'right') {
      this.moving.right = true
    }
    if (action === 'up') {
      this.moving.up = true
    }
    if (action === 'down') {
      this.moving.down = true
    }
  }

  onKeyUp (action, keyCode, edge) {
    if (action === 'left') {
      this.moving.left = false
    }
    if (action === 'right') {
      this.moving.right = false
    }
    if (action === 'up') {
      this.moving.up = false
    }
    if (action === 'down') {
      this.moving.down = false
    }
  }

  update (dt) {
    let dx = 0
    let dy = 0
    // Check the movement flags and update position accordingly.
    // (For now we use a constant offset per frame. You can multiply by dt later.)
    if (this.moving.left) {
      dx -= this.speed
    }
    if (this.moving.right) {
      dx += this.speed
    }
    if (this.moving.up) {
      dy -= this.speed
    }
    if (this.moving.down) {
      dy += this.speed
    }
    
    if (this.pos.x > 0 && this.pos.x < (game.world.width / 2) - 15) {
        this.pos.x += dx
    } else {
        if (this.pos.x < (game.world.width / 2) - 15) {
            this.pos.x = this.pos.x + 1
        } else {
            this.pos.x = (game.world.width / 2) - 16
        }
    }

    if (this.pos.y > 0 && this.pos.y < (game.world.height / 2) - 15) {
        this.pos.y += dy
    } else {
        if (this.pos.y < (game.world.height / 2) - 15) {
            this.pos.y = this.pos.y + 1
        } else {
            this.pos.y = (game.world.height / 2) - 16
        }
    }
    
    return true
  }

  draw (renderer) {
    const ctx = renderer.getContext()
    if (ctx) {
      ctx.fillStyle = '#02c1f9'
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    return true
  }

  onDestroyEvent () {
    event.off(event.KEYDOWN, this.onKeyDown)
    event.off(event.KEYUP, this.onKeyUp)
  }
  
}