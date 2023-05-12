"use strict"
class Font {
    constructor(name, str, x, y, d, size, color, spacing_x, spacing_y, speed) {
        this.str_now = "";
        this.length_allow = 0;
        this.str = str;
        this.x = x;
        this.y = y;
        this.direction = d;
        this.size = size;
        this.color = color;
        this.spacing_x = spacing_x;
        this.spacing_y = spacing_y;
        this.speed = speed;
        Global.displayStrings[name] = this;
        fontEveryFrame(name);
    }
    write() {
        const chars = this.str_now;
        const size = this.size;
        const d = this.direction * Math.PI / 180;
        let x, y;
        [x, y] = [0, 0];
        const charDataf = ((c) => {
            if (c == "\n" || c == " ") {
                return Global.fontData.space;
            } else if (Global.fontData[c] == void 0) {
                return Global.fontData.space;
            } else {
                return Global.fontData[c];
            }
        })
        for (let i = 0; i < chars.length; i++) {
            const charData = charDataf(chars[i])
            if (chars[i] == "\n") {
                x = 0;
                y += 15 + this.spacing_y;
            } else {
                Core.stamp("determination_" + (!this.color ? "white" : this.color),
                    this.x + (Math.cos(d) * x + Math.sin(d) * y) * size / 100,
                    this.y + (Math.sin(d) * x - Math.cos(d) * (y - charData.gap / 2)) * size / 100,
                    this.direction, size, 1, charData.left, charData.up, charData.width, charData.height
                );
                if (i + 1 < chars.length) x += (charData.width + charDataf(chars[i + 1]).width) / 2 + 2 + this.spacing_x;
            };
        };
    };
};

function fontForEach() {
    for (let name in Global.displayStrings) {
        fontEveryFrame(name);
    };
};

function fontEveryFrame(name) {
    const input = Global.displayStrings[name];
        if (input.length_allow == input.str.length && Core.inputKeys.z) {
            delete Global.displayStrings[name];
            return;
        } else if (Core.inputKeys.x) {
            input.length_allow = input.str.length
        } else if (input.length_allow < input.str.length) {
            input.length_allow += 1 / input.speed;
        }
        while (input.str_now.length < Math.min(input.length_allow, input.str.length)) {
            input.str_now += input.str[input.str_now.length];
            console.log(input.length_allow, input.str.length)
        };
}