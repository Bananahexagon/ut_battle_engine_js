"use strict"
class Font {
    constructor() { }
    delete() {
        delete Global.displayStrings[this.name];
    }
}

class FontSuper extends Font {
    constructor(name, x, y, d, size, font, input) {
        super();
        this.name = name;
        this._ = {
            all_str: input.reduce((a, c) => a + c.str, ""),
            now: [{ str: "", color: input[0].color, spacing_x: input[0].spacing_x, spacing_y: input[0].spacing_y }],
            length_allow: 0,
            count: 0,
            current_char: 0,
            current_char_true: 0,
        }
        this.x = x;
        this.y = y;
        this.direction = d;
        this.size = size;
        this.data = input;
        this.font = ((f) => {
            switch (f) {
                case "status":
                    return Global.fontData.status;
                default:
                    return Global.fontData.en;
            }
        })(font)
        Global.displayStrings[name] = this;
        this.process();
    }
    write() {
        const size = this.size;
        const d = this.direction * Math.PI / 180;
        const input_str_length = this._.now.reduce((a, c) => a + c.str.length, 0);
        let x = 0;
        let y = 0;
        let count = 0;
        const charDataf = ((c) => {
            if (c == "\n" || c == " ") {
                return this.font.space;
            } else if (this.font[c] === undefined) {
                return this.font.space;
            } else {
                return this.font[c];
            }
        })
        this._.now.forEach((e) => {
            const s = e.str.split("");
            s.forEach((c) => {
                const charData = charDataf(c)
                if (c == "\n") {
                    x = 0;
                    y += this.font.height_basic + e.spacing_y;
                } else {
                    Core.stamp(this.font.name + "_" + e.color,
                        this.x + (Math.cos(d) * x - Math.sin(d) * (y + charData.gap / 2)) * size / 100,
                        this.y + (Math.sin(d) * x + Math.cos(d) * (y + charData.gap / 2)) * size / 100,
                        this.direction, size, 1, charData.left, charData.up, charData.width, charData.height
                    );
                    if (count + 1 < input_str_length) x += (charData.width + charDataf(this._.all_str[count + 1]).width) / 2 + this.font.width_basic + e.spacing_x;
                }
                count++
            })
        });
        return this;
    };
    process() {
        const input_str_length = this.data.reduce((a, c) => a + c.str.length, 0);
        if (this._.length_allow == input_str_length && Core.inputKeys.z) {
            delete Global.displayStrings[name];
            return;
        } else if (Core.inputKeys.x) {
            this._.length_allow = input_str_length;
            this._.current_char = input_str_length;
        } else if (this._.length_allow < input_str_length) {
            this._.length_allow += 1 / this.data[this._.count].speed;
            this._.current_char += 1 / this.data[this._.count].speed;
        }
        while (this._.current_char_true < Math.min(this._.length_allow, input_str_length)) {
            this._.now[this._.count].str += this.data[this._.count].str[this._.now[this._.count].str.length];
            this._.current_char_true++
            while (this.data[this._.count].str.length <= this._.now[this._.count].str.length) {
                if (this._.count + 1 < this.data.length) {
                    this._.count++;
                    this._.now.push({
                        str: "",
                        color: ((this.data[this._.count].color === undefined) ? "white" : this.data[this._.count].color),
                        spacing_x: this.data[this._.count].spacing_x,
                        spacing_y: this.data[this._.count].spacing_y
                    })
                    this._.current_char -= this.data[this._.count].str.length;
                } else {
                    break;
                };
            };
        };
    }
};

class FontPlane extends Font {
    constructor(name, str, x, y, d, size, color, spacing_x, spacing_y, speed, font) {
        super();
        this.name = name;
        this.str_now = "";
        this.length_allow = 0;
        this.str = str + "";
        this.x = x;
        this.y = y;
        this.direction = d;
        this.size = size;
        this.color = color;
        this.spacing_x = spacing_x;
        this.spacing_y = spacing_y;
        this.speed = speed;
        this.font = ((f) => {
            switch (f) {
                case "status":
                    return Global.fontData.status;
                default:
                    return Global.fontData.en;
            }
        })(font)
        Global.displayStrings[name] = this;
        this.process();
    }
    write() {
        const chars = this.str_now;
        const size = this.size;
        const d = this.direction * Math.PI / 180;
        let x, y;
        [x, y] = [0, 0];
        const charDataf = ((c) => {
            if (c == "\n" || c == " ") {
                return this.font.space;
            } else if (this.font[c] === undefined) {
                return this.font.space;
            } else {
                return this.font[c];
            }
        })
        for (let i = 0; i < chars.length; i++) {
            const charData = charDataf(chars[i])
            if (chars[i] == "\n") {
                x = 0;
                y += this.font.height_basic + this.spacing_y;
            } else {
                Core.stamp(this.font.name + "_" + (!this.color ? "white" : this.color),
                    this.x + (Math.cos(d) * x - Math.sin(d) * (y + charData.gap / 2)) * size / 100,
                    this.y + (Math.sin(d) * x + Math.cos(d) * (y + charData.gap / 2)) * size / 100,
                    this.direction, size, 1, charData.left, charData.up, charData.width, charData.height
                );
                if (i + 1 < chars.length) x += (charData.width + charDataf(chars[i + 1]).width) / 2 + this.font.width_basic + this.spacing_x;
            };
        };
        return this;
    };
    process() {
        if (this.length_allow == this.str.length && Core.inputKeys.z) {
            delete Global.displayStrings[this.name];
            return;
        } else if (Core.inputKeys.x) {
            this.length_allow = this.str.length
        } else if (this.length_allow < this.str.length) {
            this.length_allow += 1 / this.speed;
        }
        while (this.str_now.length < Math.min(this.length_allow, this.str.length)) {
            this.str_now += this.str[this.str_now.length];
        };
    }
};

function fontForEach() {
    for (let name in Global.displayStrings) {
        Global.displayStrings[name].process()
    };
};
/*
 *Template
 *new FontSuper("name", 64, 128, 0, 400, "determination", [
 *    { str: "text", color: "white", spacing_x: 0, spacing_y: 0, speed: 2 },
 *])
 */

