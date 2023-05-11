import { Core, Global } from "./core";

class Font {
    str: string;
    x: number;
    y: number;
    direction: number;
    size: number;
    color: string;
    spacing_x: number;
    spacing_y: number;
    speed: number;
    constructor(name: string, str: string, x: number, y: number, d: number, size: number, color: string, spacing_x: number, spacing_y: number, speed: number) {
        this.str = str;
        this.x = x;
        this.y = y;
        this.direction = d;
        this.size = size;
        this.color = color;
        this.spacing_x = spacing_x;
        this.spacing_y = spacing_y;
        this.speed = speed;
        Global.DisplayStrings[name] = this;
    }
    writeObject() {

    }

    writePlane() {
        const chars = this.str;
        const size = this.size;
        const d = this.direction * Math.PI / 180;
        let x, y;
        [x, y] = [0, 0];
        const charDataf = ((c: string) => {
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
}

function fontForEach() {
    for (let name in Global.DisplayStrings) {
        const input = Global.DisplayStrings[name]
        if (input.length_allow == input.string.length && Core.inputKeys.z) {
            return (() => {
                delete Global.Strings.input
            })()
        } else if (Core.inputKeys.x) {
            input.length_allow = input.string.length
        } else {
            input.length_allow += 1 / input.speed;
        }
        while (input.string_now.length < Math.min(input.length_allow, input.string.length)) {
            input.string_now += input.string[input.string_now];
        };
    };
};

export { Font, fontForEach }