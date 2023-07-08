"use strict"

function line(lx, ly, d, len, width = 8, type = "line") {
    let position;
    return {
        calc: (px, py) => {
            let ptx = (px - lx) * Math.sin(d) - (py - ly) * Math.cos(d);
            let pty = (px - lx) * Math.cos(d) + (py - ly) * Math.sin(d);
            if (type == "line") position = 0 < pty;
            if (-len / 2 < ptx && ptx < len / 2 || type == "wall") {
                if (position) {
                    if (pty < width) pty = width;
                } else {
                    if (-width < pty) pty = -width;
                }
            }
            let prx = -ptx * Math.sin(-d) + pty * Math.cos(-d);
            let pry = -ptx * Math.cos(-d) - pty * Math.sin(-d);
            return [prx + lx, pry + ly];
        },
        writeLine: () => {
            writeLine(lx, ly, d, len);
        },
        drawWhite: () => {
            Core.rect(lx + (640 * Math.sin(d)), ly - (640 * Math.cos(d)), 1280, 1280, "#ffffff", d * 180 / Math.PI, 0);
        },
        drawBlack: () => {
            Core.rect(lx + (640 * Math.sin(d) + (width / 2 + 1) * Math.cos(d)), ly - (640 * Math.cos(d) - (width / 2 + 1) * Math.sin(d)), 1280, 1280, "#000000", d * 180 / Math.PI, 0);
        }
    }
}

function writeLine(lx, ly, d, len) {
    Core.ctx.beginPath();
    Core.ctx.moveTo(lx * 2 - len * Math.sin(d), ly * 2 + len * Math.cos(d));
    Core.ctx.lineTo(lx * 2 + len * Math.sin(d), ly * 2 - len * Math.cos(d));
    Core.ctx.strokeStyle = "#ffffff";
    Core.ctx.lineWidth = 10;
    Core.ctx.stroke();
}

function box() {
    const box = [
        line(
            Game.box.center.x + Game.box.width * Math.cos(Game.box.direction * Math.PI / 180),
            Game.box.center.y + Game.box.width * Math.sin(Game.box.direction * Math.PI / 180),
            Game.box.direction * Math.PI / 180, 640, 8, "wall"
        ),
        line(
            Game.box.center.x - Game.box.heigth * Math.sin(Game.box.direction * Math.PI / 180),
            Game.box.center.y + Game.box.heigth * Math.cos(Game.box.direction * Math.PI / 180),
            (Game.box.direction + 90) * Math.PI / 180, 640, 8, "wall"
        ),
        line(
            Game.box.center.x - Game.box.width * Math.cos(Game.box.direction * Math.PI / 180),
            Game.box.center.y - Game.box.width * Math.sin(Game.box.direction * Math.PI / 180),
            (Game.box.direction + 180) * Math.PI / 180, 640, 8, "wall"
        ),
        line(
            Game.box.center.x + Game.box.heigth * Math.sin(Game.box.direction * Math.PI / 180),
            Game.box.center.y - Game.box.heigth * Math.cos(Game.box.direction * Math.PI / 180),
            (Game.box.direction - 90) * Math.PI / 180, 640, 8, "wall"
        ),
    ];

    box.forEach(e => {
        e.drawWhite();
        [Game.player.x, Game.player.y] = e.calc(Game.player.x, Game.player.y);
    })
    box.forEach(e => e.drawBlack())
}