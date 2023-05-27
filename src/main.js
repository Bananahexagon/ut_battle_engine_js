"use strict"

function main() {
    Game.timer = 0;
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
    hp_write(32, 400, 92)
    window.requestAnimationFrame(update);
}

function hp_write(x, y, hp, w = 16) {
    new FontPlane("hp_player_name", `${Game.player.name} LV ${Game.player.lv}`, x, y, 0, 200, "white", 0, 0, 0, "status")
    Global.displayStrings.hp_player_name.write();
    const bar_x = [...`${Game.player.name} LV ${Game.player.lv}`].reduce((a, c) => {
        return a + ((c, f) => {
            if (c == "\n" || c == " " || f[c] == void 0) {
                return f.space;
            } else {
                return f[c];
            }
        })(c, Global.fontData.status).width + 1},
        0);
    console.log(bar_x)
    Core.ctx.beginPath();
    Core.ctx.rect((x + bar_x * 2) * 2, y * 2, hp * 2, w * 2);
    Core.ctx.fillStyle = "#ffff00";
    Core.ctx.fill();
    Global.displayStrings.hp_player_name.delete()
}