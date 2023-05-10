function main() {
    Game.timer = 0;
    window.requestAnimationFrame(update);
}
function update() {
    if (Core.inputKeys.up) Game.player.y -= 5;
    if (Core.inputKeys.down) Game.player.y += 5;
    if (Core.inputKeys.left) Game.player.x -= 5;
    if (Core.inputKeys.right) Game.player.x += 5;
    Game.timer++;
    fontForEach();
    window.requestAnimationFrame(update);
}