"use strict"

function main() {
    Game.timer = 0;
    window.requestAnimationFrame(update);
}

function update() {
    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
    if (Core.inputKeys.up) Game.player.y -= 3;
    if (Core.inputKeys.down) Game.player.y += 3;
    if (Core.inputKeys.left) Game.player.x -= 3;
    if (Core.inputKeys.right) Game.player.x += 3;
    Game.timer++;
    Game.box.direction = Game.timer;
    const box = boxGet();
    box.forEach(e => {
        e.drawWhite();
        [Game.player.x, Game.player.y] = e.calc(Game.player.x, Game.player.y);
    })
    box.forEach(e => e.drawBlack())
    Core.stamp(Game.enemy.costume, Game.enemy.x, Game.enemy.y)
    fontForEach();
    Core.stamp("soul_blue", Game.box.center.x, Game.box.center.y)
    Core.stamp("soul", Game.player.x, Game.player.y)
    hp_write(38, 413, 46, 92, "frisk", 19);
    window.requestAnimationFrame(update);
}

function hp_write(x, y, hp, max_hp, name, lv, size = 300, h = 14, w = 78) {
    const str = `${name} LV ${lv}`
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

    Core.stamp("hp_kr_white", (bar_x + 6) * size / 100 + x, y - 1, 0, size / 3, 1, 0, 0, 23, 10);
    Core.rect(x + (bar_x + 13) * size / 100, y - h * size / 300, max_hp * w * size / 20000, h * size / 200, "#ff0000");
    Core.rect(x + (bar_x + 13) * size / 100, y - h * size / 300, hp * w * size / 20000, h * size / 200, "#ffff00");
    Core.stamp("hp_kr_white", (bar_x - 15 + max_hp * w / 100) * size / 100 + x, y + 3, 0, size / 3, 1, 0, 11, 23, 21);

    new FontPlane("hp_player_name", `${hp} / ${max_hp}`, (bar_x + 9 + max_hp * w / 100) * size / 100, y - 2, 0, size, "white", 0, 0, 0, "status").write().delete();
}