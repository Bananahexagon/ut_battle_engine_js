"use strict"

function main() {
    Game.timer = 0;
    window.requestAnimationFrame(update);
}

function update() {
    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
    Core.ctx.globalAlpha = 0.5;
    Core.stamp("back", 320, 240, 0, 100);
    Core.ctx.globalAlpha = 1;
    if (Core.inputKeys.up) Game.player.y -= 5;
    if (Core.inputKeys.down) Game.player.y += 5;
    if (Core.inputKeys.left) Game.player.x -= 5;
    if (Core.inputKeys.right) Game.player.x += 5;
    Game.timer++;
    fontForEach();
    hp_write(38, 413, 92, 300)
    window.requestAnimationFrame(update);
}

function hp_write(x, y, hp, size = 200, w = 16) {
    const str = `${Game.player.name} LV ${Game.player.lv}`
    new FontPlane("hp_player_name", str, x, y, 0, size, "white", 0, 0, 0, "status")
    Global.displayStrings.hp_player_name.write();
    const bar_x = [...str].reduce((a, c) => {
        return a + ((c, f) => {
            if (f[c] === undefined) {
                return f.space;
            } else {
                return f[c];
            }
        })(c, Global.fontData.status).width + 1
    }, 0) + 5;

    console.log(bar_x);
    Core.stamp("hp_kr_white", (bar_x + 6) * size / 100 + x, y - 1, 0, size / 3, 1, 0, 0, 23, 10);
    Core.ctx.beginPath();
    Core.ctx.rect((x + bar_x * size / 100 + 38) * 2, (y - 13) * 2, hp * size / 100, w * size / 100);
    Core.ctx.fillStyle = "#ffff00";
    Core.ctx.fill()
    Global.displayStrings.hp_player_name.delete();

}