"use strict"

function main() {
    Game.timer = 0;
    new Font("test", 64, 128, 30, 200, [
        { str: "Lorem ipsum", color: "white", spacing_x: 0, spacing_y: 0, speed: 2 },
        { str: " dolor\n sit", color: "red", spacing_x: 3, spacing_y: 0, speed: 5 },
        { str: " amet", color: "blue", spacing_x: 17, spacing_y: 0, speed: 15 },
    ])
    window.requestAnimationFrame(update);
}
function update() {
    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height)
    if (Core.inputKeys.up) Game.player.y -= 5;
    if (Core.inputKeys.down) Game.player.y += 5;
    if (Core.inputKeys.left) Game.player.x -= 5;
    if (Core.inputKeys.right) Game.player.x += 5;
    Game.timer++;
    fontForEach();
    Global.displayStrings.test.write();
    Global.displayStrings.test.direction += 0.5;
    window.requestAnimationFrame(update);
}