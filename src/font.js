async function font(data) {

}

let fontData = (() => {
    let fD = {
        0: { left: 0, up: 18, width: 6, height: 9, gap: 0 },
        1: { left: 10, up: 18, width: 6, height: 9, gap: 0 },
        2: { left: 20, up: 18, width: 6, height: 9, gap: 0 },
        3: { left: 30, up: 18, width: 6, height: 9, gap: 0 },
        4: { left: 40, up: 18, width: 6, height: 9, gap: 0 },
        5: { left: 50, up: 18, width: 6, height: 9, gap: 0 },
        6: { left: 60, up: 18, width: 6, height: 9, gap: 0 },
        7: { left: 70, up: 18, width: 6, height: 9, gap: 0 },
        8: { left: 80, up: 18, width: 6, height: 9, gap: 0 },
        9: { left: 90, up: 18, width: 6, height: 9, gap: 0 },

        A: { left: 10, up: 34, width: 6, height: 9, gap: 0 },
        B: { left: 20, up: 34, width: 6, height: 9, gap: 0 },
        C: { left: 30, up: 34, width: 6, height: 9, gap: 0 },
        D: { left: 40, up: 34, width: 6, height: 9, gap: 0 },
        E: { left: 50, up: 34, width: 6, height: 9, gap: 0 },
        F: { left: 60, up: 34, width: 6, height: 9, gap: 0 },
        G: { left: 70, up: 34, width: 6, height: 9, gap: 0 },
        H: { left: 80, up: 34, width: 6, height: 9, gap: 0 },
        I: { left: 90, up: 34, width: 6, height: 9, gap: 0 },
        J: { left: 100, up: 34, width: 6, height: 9, gap: 0 },
        K: { left: 110, up: 34, width: 6, height: 9, gap: 0 },
        L: { left: 120, up: 34, width: 6, height: 9, gap: 0 },
        M: { left: 130, up: 34, width: 7, height: 9, gap: 0 },
        N: { left: 140, up: 34, width: 6, height: 9, gap: 0 },
        O: { left: 150, up: 34, width: 6, height: 9, gap: 0 },
        P: { left: 0, up: 50, width: 6, height: 9, gap: 0 },
        Q: { left: 10, up: 50, width: 6, height: 9, gap: 0 },
        R: { left: 20, up: 50, width: 6, height: 9, gap: 0 },
        S: { left: 30, up: 50, width: 6, height: 9, gap: 0 },
        T: { left: 40, up: 50, width: 6, height: 9, gap: 0 },
        U: { left: 50, up: 50, width: 6, height: 9, gap: 0 },
        V: { left: 60, up: 50, width: 6, height: 9, gap: 0 },
        W: { left: 70, up: 50, width: 7, height: 9, gap: 0 },
        X: { left: 80, up: 50, width: 6, height: 9, gap: 0 },
        Y: { left: 90, up: 50, width: 6, height: 9, gap: 0 },
        Z: { left: 100, up: 50, width: 6, height: 9, gap: 0 },

        a: { left: 10, up: 68, width: 6, height: 7, gap: 2 },
        b: { left: 20, up: 66, width: 6, height: 9, gap: 0 },
        c: { left: 30, up: 68, width: 6, height: 7, gap: 2 },
        d: { left: 40, up: 66, width: 6, height: 9, gap: 0 },
        e: { left: 50, up: 68, width: 6, height: 7, gap: 2 },
        f: { left: 60, up: 66, width: 6, height: 9, gap: 0 },
        g: { left: 70, up: 68, width: 6, height: 10, gap: 5 },
        h: { left: 80, up: 66, width: 6, height: 9, gap: 0 },
        i: { left: 90, up: 65, width: 6, height: 10, gap: -1 },
        j: { left: 100, up: 65, width: 6, height: 13, gap: 2 },
        k: { left: 110, up: 66, width: 6, height: 9, gap: 0 },
        l: { left: 120, up: 66, width: 6, height: 9, gap: 0 },
        m: { left: 130, up: 68, width: 7, height: 7, gap: 2 },
        n: { left: 140, up: 68, width: 6, height: 7, gap: 2 },
        o: { left: 150, up: 68, width: 6, height: 7, gap: 2 },
        p: { left: 0, up: 84, width: 6, height: 10, gap: 5 },
        q: { left: 10, up: 84, width: 6, height: 10, gap: 5 },
        r: { left: 20, up: 84, width: 6, height: 7, gap: 2 },
        s: { left: 30, up: 84, width: 6, height: 7, gap: 2 },
        t: { left: 40, up: 82, width: 6, height: 9, gap: 0 },
        u: { left: 50, up: 84, width: 6, height: 7, gap: 2 },
        v: { left: 60, up: 84, width: 6, height: 7, gap: 2 },
        w: { left: 70, up: 84, width: 7, height: 7, gap: 2 },
        x: { left: 80, up: 84, width: 6, height: 7, gap: 2 },
        y: { left: 90, up: 84, width: 6, height: 10, gap: 5 },
        z: { left: 100, up: 84, width: 6, height: 7, gap: 2 },
    };
    {
        fD["space"] = { left: 0, up: 0, width: 1, height: 1, gap: 0 };
        fD["!"] = { left: 10, up: 1, width: 4, height: 10, gap: -1 };
        fD['"'] = { left: 20, up: 2, width: 5, height: 4, gap: -5 };
        fD["#"] = { left: 30, up: 2, width: 7, height: 9, gap: 0 };
        fD["$"] = { left: 40, up: 0, width: 6, height: 13, gap: 0 };
        fD["%"] = { left: 50, up: 2, width: 7, height: 9, gap: 0 };
        fD["&"] = { left: 60, up: 2, width: 7, height: 9, gap: 0 };
        fD["'"] = { left: 70, up: 2, width: 2, height: 4, gap: -5 };
        fD["("] = { left: 80, up: 2, width: 4, height: 9, gap: 0 };
        fD[")"] = { left: 90, up: 2, width: 4, height: 9, gap: 0 };
        fD["*"] = { left: 100, up: 4, width: 8, height: 5, gap: 0 };
        fD["+"] = { left: 110, up: 4, width: 6, height: 5, gap: 0 };
        fD[","] = { left: 120, up: 9, width: 2, height: 4, gap: 9 };
        fD["-"] = { left: 130, up: 6, width: 5, height: 1, gap: 0 };
        fD["."] = { left: 140, up: 9, width: 2, height: 2, gap: 7 };
        fD["/"] = { left: 150, up: 2, width: 6, height: 10, gap: 1 };

        fD[":"] = { left: 100, up: 20, width: 2, height: 7, gap: 2 };
        fD[";"] = { left: 110, up: 20, width: 2, height: 9, gap: 4 };
        fD["<"] = { left: 120, up: 18, width: 5, height: 9, gap: 0 };
        fD["="] = { left: 130, up: 21, width: 5, height: 3, gap: 0 };
        fD[">"] = { left: 140, up: 18, width: 5, height: 9, gap: 0 };
        fD["?"] = { left: 150, up: 18, width: 6, height: 9, gap: 0 };
        fD["@"] = { left: 0, up: 34, width: 6, height: 9, gap: 0 };

        fD["["] = { left: 110, up: 50, width: 4, height: 9, gap: 0 };
        fD["\\"] = { left: 120, up: 50, width: 6, height: 10, gap: 1 };
        fD["]"] = { left: 130, up: 50, width: 4, height: 9, gap: 0 };
        fD["^"] = { left: 140, up: 49, width: 6, height: 4, gap: -5 };
        fD["_"] = { left: 150, up: 61, width: 4, height: 1, gap: 14 };

        fD["{"] = { left: 110, up: 82, width: 5, height: 9, gap: 0 };
        fD["|"] = { left: 120, up: 82, width: 2, height: 9, gap: 0 };
        fD["}"] = { left: 130, up: 82, width: 5, height: 9, gap: 0 };
        fD["~"] = { left: 140, up: 85, width: 7, height: 2, gap: -1 };
    }
    return fD;
})()


let w = (input) => {
    Core.ctx.clearRect(0, 0, Core.canvas.width, Core.canvas.height);
    const chars = input;
    for (let i = 0; i < chars.length; i++) {
        ((a) => {
            Core.stamp("determination_white", 32 * i + 16, 32 + a.gap * 2, 0, 400, 1, a.left, a.up, a.width, a.height)
        })(fontData[chars[i]])
    }
}