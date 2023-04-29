let inputKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
    z: false,
    x: false,
    c: false,
}

window.addEventListener("keydown", e => {
    switch (e.key) {
        case "Arrowup":
            inputKeys.up = true;
            break;
        case "ArrowDown":
            inputKeys.down = true;
            break;
        case "ArrowLeft":
            inputKeys.left = true;
            break;
        case "ArrowRight":
            inputKeys.right = true;
            break;
        case "z":
        case "Z":
            inputKeys.z = true;
            break;
        case "x":
        case "X":
            inputKeys.x = true;
            break;
        case "c":
        case "C":
            inputKeys.c = true;
    }
});

window.addEventListener("keyup", e => {
    switch (e.key) {
        case "Arrowup":
            inputKeys.up = false;
            break;
        case "ArrowDown":
            inputKeys.down = false;
            break;
        case "ArrowLeft":
            inputKeys.left = false;
            break;
        case "ArrowRight":
            inputKeys.right = false;
            break;
        case "z":
        case "Z":
            inputKeys.z = false;
            break;
        case "x":
        case "X":
            inputKeys.x = false;
            break;
        case "c":
        case "C":
            inputKeys.c = false;
    }
});