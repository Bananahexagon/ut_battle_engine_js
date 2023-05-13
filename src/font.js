"use strict"
class FontSuper {
    constructor(name, x, y, d, size, input) {
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
        Global.displayStrings[name] = this;
        fontEveryFrame(name);
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
                return Global.fontData.space;
            } else if (Global.fontData[c] == void 0) {
                return Global.fontData.space;
            } else {
                return Global.fontData[c];
            }
        })
        this._.now.forEach((e) => {
            const s = e.str.split("");
            s.forEach((c) => {
                const charData = charDataf(c)
                if (c == "\n") {
                    x = 0;
                    y += 15 + e.spacing_y;
                } else {
                    Core.stamp("determination_" + e.color,
                        this.x + (Math.cos(d) * x - Math.sin(d) * y) * size / 100,
                        this.y + (Math.sin(d) * x + Math.cos(d) * (y + charData.gap / 2)) * size / 100,
                        this.direction, size, 1, charData.left, charData.up, charData.width, charData.height
                    );
                    if (count + 1 < input_str_length) x += (charData.width + charDataf(this._.all_str[count + 1]).width) / 2 + 2 + e.spacing_x;
                }
                count++
            })
            console.log(e)
        });
    };
};

function fontForEach() {
    for (let name in Global.displayStrings) {
        fontEveryFrame(name);
    };
};

function fontEveryFrame(name) {
    const input = Global.displayStrings[name];
    const input_str_length = input.data.reduce((a, c) => a + c.str.length, 0);
    if (input._.length_allow == input_str_length && Core.inputKeys.z) {
        delete Global.displayStrings[name];
        return;
    } else if (Core.inputKeys.x) {
        input._.length_allow = input_str_length;
        input._.current_char = input_str_length;
    } else if (input._.length_allow < input_str_length) {
        input._.length_allow += 1 / input.data[input._.count].speed;
        input._.current_char += 1 / input.data[input._.count].speed;
    }
    while (input._.current_char_true < Math.min(input._.length_allow, input_str_length)) {
        input._.now[input._.count].str += input.data[input._.count].str[input._.now[input._.count].str.length];
        input._.current_char_true++
        while (input.data[input._.count].str.length <= input._.now[input._.count].str.length) {
            if (input._.count + 1 < input.data.length) {
                console.log("A")
                input._.count++;
                input._.now.push({
                    str: "",
                    color: ((input.data[input._.count].color === undefined) ? "white" : input.data[input._.count].color),
                    spacing_x: input.data[input._.count].spacing_x,
                    spacing_y: input.data[input._.count].spacing_y
                })
                input._.current_char -= input.data[input._.count].str.length;
            } else {
                break;
            };
        };
    };
}