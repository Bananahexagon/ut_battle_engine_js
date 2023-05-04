async function font(data) {

}

let fontData = (() => {
    let fD = {
        0: { left: 0, up: 18, width: 6, height: 9 },
        1: { left: 10, up: 18, width: 6, height: 9 },
        2: { left: 20, up: 18, width: 6, height: 9 },
        3: { left: 30, up: 18, width: 6, height: 9 },
        4: { left: 40, up: 18, width: 6, height: 9 },
        5: { left: 50, up: 18, width: 6, height: 9 },
        6: { left: 60, up: 18, width: 6, height: 9 },
        7: { left: 70, up: 18, width: 6, height: 9 },
        8: { left: 80, up: 18, width: 6, height: 9 },
        9: { left: 90, up: 18, width: 6, height: 9 },

        A: { left: 10, up: 34, width: 6, height: 9 },
        B: { left: 20, up: 34, width: 6, height: 9 },
        C: { left: 30, up: 34, width: 6, height: 9 },
        D: { left: 40, up: 34, width: 6, height: 9 },
        E: { left: 50, up: 34, width: 6, height: 9 },
        F: { left: 60, up: 34, width: 6, height: 9 },
        G: { left: 70, up: 34, width: 6, height: 9 },
        H: { left: 80, up: 34, width: 6, height: 9 },
        I: { left: 90, up: 34, width: 6, height: 9 },
        J: { left: 100, up: 34, width: 6, height: 9 },
        K: { left: 110, up: 34, width: 6, height: 9 },
        L: { left: 120, up: 34, width: 6, height: 9 },
        M: { left: 130, up: 34, width: 7, height: 9 },
        N: { left: 140, up: 34, width: 6, height: 9 },
        O: { left: 150, up: 34, width: 6, height: 9 },
        P: { left: 0, up: 50, width: 6, height: 9 },
        Q: { left: 10, up: 50, width: 6, height: 9 },
        R: { left: 20, up: 50, width: 6, height: 9 },
        S: { left: 30, up: 50, width: 6, height: 9 },
        T: { left: 40, up: 50, width: 6, height: 9 },
        U: { left: 50, up: 50, width: 6, height: 9 },
        V: { left: 60, up: 50, width: 6, height: 9 },
        W: { left: 70, up: 50, width: 7, height: 9 },
        X: { left: 80, up: 50, width: 6, height: 9 },
        Y: { left: 90, up: 50, width: 6, height: 9 },
        Z: { left: 100, up: 50, width: 6, height: 9 },

        a: { left: 10, up: 68, width: 6, height: 7 },
        b: { left: 20, up: 66, width: 6, height: 9 },
        c: { left: 30, up: 68, width: 6, height: 7 },
        d: { left: 40, up: 66, width: 6, height: 9 },
        e: { left: 50, up: 68, width: 6, height: 7 },
        f: { left: 60, up: 66, width: 6, height: 9 },
        g: { left: 70, up: 68, width: 6, height: 10 },
        h: { left: 80, up: 66, width: 6, height: 9 },
        i: { left: 90, up: 65, width: 6, height: 10 },
        j: { left: 100, up: 65, width: 6, height: 13 },
        k: { left: 110, up: 66, width: 6, height: 9 },
        l: { left: 120, up: 66, width: 6, height: 9 },
        m: { left: 130, up: 68, width: 7, height: 7 },
        n: { left: 140, up: 68, width: 6, height: 7 },
        o: { left: 150, up: 68, width: 6, height: 7 },
        p: { left: 0, up: 84, width: 6, height: 10 },
        q: { left: 10, up: 84, width: 6, height: 10 },
        r: { left: 20, up: 84, width: 6, height: 7 },
        s: { left: 30, up: 84, width: 6, height: 7 },
        t: { left: 40, up: 82, width: 6, height: 9 },
        u: { left: 50, up: 84, width: 6, height: 7 },
        v: { left: 60, up: 84, width: 6, height: 7 },
        w: { left: 70, up: 84, width: 7, height: 7 },
        x: { left: 80, up: 84, width: 6, height: 7 },
        y: { left: 90, up: 84, width: 6, height: 10 },
        z: { left: 100, up: 84, width: 6, height: 7 },
    };
    {
        fD["space"] = { left: 0, up: 0, width: 1, height: 1 };
        fD["!"] = { left: 10, up: 1, width: 4, height: 10 };
        fD['"'] = { left: 20, up: 2, width: 5, height: 4 };
        fD["#"] = { left: 30, up: 2, width: 7, height: 9 };
        fD["$"] = { left: 40, up: 0, width: 6, height: 13 };
        fD["%"] = { left: 50, up: 2, width: 7, height: 9 };
        fD["&"] = { left: 60, up: 2, width: 7, height: 9 };
        fD["'"] = { left: 70, up: 2, width: 2, height: 4 };
        fD["("] = { left: 80, up: 2, width: 4, height: 9 };
        fD[")"] = { left: 90, up: 2, width: 4, height: 9 };
        fD["*"] = { left: 100, up: 4, width: 8, height: 5 };
        fD["+"] = { left: 110, up: 4, width: 6, height: 5 };
        fD[","] = { left: 120, up: 9, width: 2, height: 4 };
        fD["-"] = { left: 130, up: 6, width: 5, height: 1 };
        fD["."] = { left: 140, up: 9, width: 2, height: 2 };
        fD["/"] = { left: 150, up: 2, width: 6, height: 10 };

        fD[":"] = { left: 100, up: 20, width: 2, height: 7 };
        fD[";"] = { left: 110, up: 20, width: 2, height: 9 };
        fD["<"] = { left: 120, up: 18, width: 5, height: 9 };
        fD["="] = { left: 130, up: 21, width: 5, height: 3 };
        fD[">"] = { left: 140, up: 18, width: 5, height: 9 };
        fD["?"] = { left: 150, up: 18, width: 6, height: 9 };
        fD["@"] = { left: 0, up: 34, width: 6, height: 9 };

        fD["["] = { left: 110, up: 50, width: 4, height: 9 };
        fD["\\"] = { left: 120, up: 50, width: 6, height: 10 };
        fD["]"] = { left: 130, up: 50, width: 4, height: 9 };
        fD["^"] = { left: 140, up: 49, width: 6, height: 4 };
        fD["_"] = { left: 150, up: 61, width: 4, height: 1 };

        fD["{"] = { left: 110, up: 82, width: 5, height: 9 };
        fD["|"] = { left: 120, up: 82, width: 2, height: 9 };
        fD["}"] = { left: 130, up: 82, width: 5, height: 9 };
        fD["~"] = { left: 140, up: 85, width: 7, height: 2 };
    }
    return fD;
})()


let w = (input) => {
    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
    const chars = input;
    for (let i = 0; i < chars.length; i++) {
        ((a) => {
            Core.stamp("d", 32 * i + 16, 32, 0, 400, 1, a.left, a.up, a.width, a.height)
        })(fontData[chars[i]])
    }
}