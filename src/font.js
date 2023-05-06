"use strict"

async function font(input) {
    const started_time = Global.timer;
    let timer = 0;
    let length_allow = 0;
    let data = {
        size: input.size,
        x: input.x,
        y: input.y,
        direction: input.d,
        spacing_x: input.spacing_x,
        spacing_y: input.spacing_y,
        color: input.color,
        string: "",
    };
    while (true) {
        if (timer != Global.timer) {
            if (Core.inputKeys.x) {
                length_allow = input.string.length
            } else {
                length_allow += 1 / input.speed;
            }
            while (data.string.length < Math.max(length_allow, input.string.length)) {
                data.string += input.string[data.string.length];
            };
            writeFrame(data);
        };
        timer = Global.timer;
    };
};

function writeFrame(input) {
    const chars = input.string;
    const size = input.size;
    const d = input.direction * Math.PI / 180;
    let x, y;
    [x, y] = [0, 0];
    for (let i = 0; i < chars.length; i++) {
        const charData = Global.fontData[chars[i]];
        if (chars[i] == "\n") {
            x = 0;
            y += 15 + input.spacing_y;
        } else {
            Core.stamp("determination_" + !input.color ? white : input.color,
                input.x + (Math.cos(d) * x + Math.sin(d) * y) * size / 100,
                input.y + (Math.sin(d) * x - Math.cos(d) * (y + charData.gap) / 2) * size / 100,
                input.direction, size, 1, charData.left, charData.up, charData.width, charData.height
            );
            x += charData.width + 2 + input.spacing_x;
        };
    };
};