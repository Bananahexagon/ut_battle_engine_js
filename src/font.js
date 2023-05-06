"use strict"

function fontEach() {
    for (let input in Global.Strings) {
        let length_allow = 0;
        if (length_allow == input.string.length && Core.inputKeys.z) {
            return (()=>{
                delete Global.Strings.input
            })()
        } else if (Core.inputKeys.x) {
            length_allow = input.string.length
        } else {
            length_allow += 1 / input.speed;
        }
        while (input.string_now.length < Math.min(length_allow, input.string.length)) {
            input.string_now += input.string[input.string_now];
        };
    };
};

function writePlane(input) {
    const chars = input.string;
    const size = input.size;
    const d = input.direction * Math.PI / 180;
    let x, y;
    [x, y] = [0, 0];
    const charDataf = ((c) => {
        switch (c) {
            case "\n":
            case " ":
                return Global.fontData.space;
            case Global.fontData[c] === undefined:
                return Global.fontData.irregular;
            default:
                return Global.fontData[c];
        }
    })
    for (let i = 0; i < chars.length; i++) {
        const charData = charDataf(chars[i])
        if (chars[i] == "\n") {
            x = 0;
            y += 15 + input.spacing_y;
        } else {
            Core.stamp("determination_" + (!input.color ? "white" : input.color),
                input.x + (Math.cos(d) * x + Math.sin(d) * y) * size / 100,
                input.y + (Math.sin(d) * x - Math.cos(d) * (y - charData.gap / 2)) * size / 100,
                input.direction, size, 1, charData.left, charData.up, charData.width, charData.height
            );
            if (i + 1 < chars.length) x += (charData.width + charDataf(chars[i + 1]).width) / 2 + 2 + input.spacing_x;
        };
    };
};