"use strict"

async function font(input) {

}

function writeFrame(input) {
    const chars = input.string;
    let x, y;
    [x, y] = [0, 0];
    for (let i = 0; i < chars.length; i++) {
        let charData = fontData[chars[i]];
        Core.stamp("determination_white", 32 * i + 16, 32 + charData.gap * 2, 0, 400, 1, charData.left, charData.up, charData.width, charData.height)
        
    }
}