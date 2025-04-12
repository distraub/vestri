import { Stage, game, ColorLayer, BitmapText, input, state } from "melonjs";

class TitleScreen extends Stage {
    onResetEvent() {
        // add a gray background to the default Stage
        game.world.addChild(new ColorLayer("background", "#101020"));

        // show a big title
        game.world.addChild(new BitmapText(
            game.viewport.width / 2,
            game.viewport.height / 2,
            {
                font: "PressStart2P",
                size: 3.0,
                textBaseline: "middle",
                textAlign: "center",
                text: "Vistri"
            }
        ));

        // show the "Press A To Start" text
        game.world.addChild(new BitmapText(
            game.viewport.width / 2,
            game.viewport.height / 2 + 60,
            {
                font: "PressStart2P",
                size: 1.0,
                textBaseline: "middle",
                textAlign: "center",
                text: "Press A To Start"
            }
        ));

        // Bind the A key so we can detect when the user presses it
        input.bindKey(input.KEY.A, "startGame", true)
    }

    update(dt) {
        // If the user pressed A, change the state to the Play screen
        if (input.isKeyPressed("startGame")) {
            state.change(state.PLAY)
        }

        return super.update(dt)
    }

    onDestroyEvent() {
        // Unbind the A key when leaving this screen
        input.unbindKey(input.KEY.A)
    }
}

export default TitleScreen;