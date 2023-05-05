"use strict"

async function font(input) {

}

function writeFrame(input) {
    const chars = input.string;
    const size = input.size;
    let x, y;
    [x, y] = [0, 0];
    for (let i = 0; i < chars.length; i++) {
        let charData = Global.fontData[chars[i]];
        Core.stamp("determination_white", x * size / 100, (y + charData.gap / 2) * size / 100, 0, size, 1, charData.left, charData.up, charData.width, charData.height)
    }
}