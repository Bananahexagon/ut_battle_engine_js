requestAnimationFrame(CORE.update);

function update() {
    CORE.ctx.clearRect(0, 0, CORE.canvas.width, CORE.canvas.height);
    if (inputKeys.up) player.y -= 5;
    if (inputKeys.down) player.y += 5;
    if (inputKeys.right) player.x += 5;
    if (inputKeys.left) player.x -= 5;
    Core.stamp("soul", 0, 0, 200);
}