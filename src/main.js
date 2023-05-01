
let timer = 0;

function main() {
    window.requestAnimationFrame(update);
}
function update() {
    timer++;
    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);

    if (Core.inputKeys.up) Game.player.y -= 5;
    if (Core.inputKeys.down) Game.player.y += 5;
    if (Core.inputKeys.right) Game.player.x += 5;
    if (Core.inputKeys.left) Game.player.x -= 5;

    Core.stamp("sans", Game.player.x, Game.player.y, timer, 200, 2);
    Core.stamp("sans", 100, 100, 0, 200);

    window.requestAnimationFrame(update);
}