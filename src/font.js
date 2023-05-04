const fontData = readJsonData("fontData");

async function font(input) {

}

function writeFrame(input) {
    const chars = input.string;
    for (let i = 0; i < chars.length; i++) {
        ((a) => {
            Core.stamp("determination_white", 32 * i + 16, 32 + a.gap * 2, 0, 400, 1, a.left, a.up, a.width, a.height)
        })(fontData[chars[i]])
    }
}