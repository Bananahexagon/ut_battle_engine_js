"use strict"

function main() {
    Game.timer = 0;
    new FontPlane("test", "Megaloapple", 64, 128, 30, 200, "white", 0, 0, 2, "determination")
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
    Global.displayStrings.test.direction += 0;
    window.requestAnimationFrame(update);
}