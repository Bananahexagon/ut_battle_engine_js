"use strict"

function main() {
    Game.timer = 0;
    window.requestAnimationFrame(update);
}

function update() {
    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
    Core.ctx.globalAlpha = 0.1;
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

function hp_write(x, y, hp, size = 300, h = 14, w = 78) {
    const str = `${Game.player.name} LV ${Game.player.lv}`
    new FontPlane("hp_player_name", str, x, y, 0, size, "white", 0, 0, 0, "status").write().delete();
    const bar_x = [...str].reduce((a, c) => {
        return a + ((c, f) => {
            if (f[c] === undefined) {
                return f.space;
            } else {
                return f[c];
            }
        })(c, Global.fontData.status).width + 1
    }, 0);

    console.log(bar_x);
    Core.stamp("hp_kr_white", (bar_x + 6) * size / 100 + x, y - 1, 0, size / 3, 1, 0, 0, 23, 10);
    Core.stamp("hp_kr_white", (bar_x - 15 + hp * w / 100) * size / 100 + x, y + 3, 0, size / 3, 1, 0, 11, 23, 21);

    Core.ctx.beginPath();
    Core.ctx.rect((x + (bar_x + 13) * size / 100) * 2, (y - h * size / 300) * 2, hp * w * size / 10000, h * size / 100);
    Core.ctx.fillStyle = "#ffff00";
    Core.ctx.fill();
    
    new FontPlane("hp_player_name", `${Game.player.hp} / ${Game.player.max}`, (bar_x + 9 + hp * w / 100) * size / 100, y - 2, 0, size, "white", 0, 0, 0, "status").write().delete();
}