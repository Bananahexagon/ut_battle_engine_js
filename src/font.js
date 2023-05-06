"use strict"

async function font(input) {

}

function writeFrame(input) {
    const chars = input.string;
    const size = input.size;
    const d = input.direction * Math.PI / 180;
    let x, y;
    [x, y] = [0, 0];
    for (let i = 0; i < chars.length; i++) {
        let charData = Global.fontData[chars[i]];
        if (chars[i] == "\n") {
            x = 0;
            y++;
        } else {
            Core.stamp("determination_white",
                input.x + (Math.cos(d) * x + Math.sin(d) * y) * size / 100,
                input.y + (Math.sin(d) * x - Math.cos(d) * y + charData.gap / 2) * size / 100,
                0, size, 1, charData.left, charData.up, charData.width, charData.height
            )
            x += charData.width + 2;
        }
    };
}