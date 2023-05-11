"use strict"

function main() {
    Game.timer = 0;
    new Font("test", "Lorem ipsum dolor sit amet", 64, 128, 30, 200, "white", 0, 0, 2)
    window.requestAnimationFrame(update);
}
function update() {
    if (Core.inputKeys.up) Game.player.y -= 5;
    if (Core.inputKeys.down) Game.player.y += 5;
    if (Core.inputKeys.left) Game.player.x -= 5;
    if (Core.inputKeys.right) Game.player.x += 5;
    Game.timer++;
    fontForEach();
    Global.displayStrings.name.write()
    window.requestAnimationFrame(update);
}