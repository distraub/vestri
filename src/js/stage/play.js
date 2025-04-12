import { Stage, game, ColorLayer, BitmapText  } from "melonjs"

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        // add a gray background to the default Stage
        game.world.addChild(new ColorLayer("background", "#101020"))

        // add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 2,  {
            font : "PressStart2P",
            size : 3.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "Vistri"
        }))

        // add a font text display object
        game.world.addChild(new BitmapText(game.viewport.width / 2, game.viewport.height / 2 + 60,  {
            font : "PressStart2P",
            size : 1.0,
            textBaseline : "middle",
            textAlign : "center",
            text : "Press A To Start"
        }))
    }
}

export default PlayScreen
