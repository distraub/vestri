console.log('running')
import * as me from "https://esm.run/melonjs"

me.device.onReady(function () {
    // initialize the display canvas once the device/browser is ready
    if (!me.video.init(1218, 700, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.")
        return;
    }

    // set a gray background color
    me.game.world.backgroundColor.parseCSS("#202020")

    // add a font text display object
    me.game.world.addChild(new me.Text(500, 281, {
        font: "Arial",
        size: 160,
        fillStyle: "#FFFFFF",
        textBaseline : "middle",
        textAlign : "center",
        text : "Hello World !"
    }))
})