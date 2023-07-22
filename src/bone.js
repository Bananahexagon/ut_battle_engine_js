Global.enemyAttacks.normalBone = {};

class normalBone {
    static autoID = 0;
    constructor(name, sx, sy, sd, sl, mx, my, md, ml, life, color, size, center = 0) {
        this.x = sx;
        this.y = sy;
        this.d = sd;
        this.len = sl;
        this.sx = sx;
        this.sy = sy;
        this.sd = sd;
        this.slen = sl;
        this.mx = mx;
        this.my = my;
        this.md = md;
        this.mlen = ml;
        this.life = life;
        this.color = color;
        this.size = size;
        this.age = 0;
        this.center = center;
        this.name = name ? name : "_auto|" + normalBone.autoID++;
        Global.enemyAttacks.normalBone[this.name] = this;
    }
    move() {
        this.age++;

        if (typeof (this.mx) == "number") this.x += this.mx;
        else switch (this.mx.type) {
            case "sin": this.x = this.sx + this.mx.amp * Math.sin(this.age / (Math.PI * this.mx.cycle)); break;
            case "cos": this.x = this.sx - this.mx.amp * Math.cos(this.age / (Math.PI * this.mx.cycle)); break;
            case "custom": this.x = this.mx.fn(this.life); break;
        }

        if (typeof (this.my) == "number") this.y += this.my;
        else switch (this.my.type) {
            case "sin": this.y = this.sy + this.my.amp * Math.sin(this.age / (Math.PI * this.my.cycle)); break;
            case "cos": this.y = this.sy - this.my.amp * Math.cos(this.age / (Math.PI * this.my.cycle)); break;
            case "custom": this.y = this.my.fn(this.life); break;
        }
        if (typeof (this.md) == "number") this.d += this.md;
        else switch (this.md.type) {
            case "sin": this.d = this.sd + this.md.amp * Math.sin(this.age / (Math.PI * this.md.cycle)); break;
            case "cos": this.d = this.sd - this.md.amp * Math.cos(this.age / (Math.PI * this.md.cycle)); break;
            case "custom": this.d = this.md.fn(this.life); break;
        }
        if (typeof (this.mlen) == "number") this.len += this.mlen;
        else switch (this.mlen.type) {
            case "sin": this.len = this.slen + this.mlen.amp * Math.sin(this.age / (Math.PI * this.mlen.cycle)); break;
            case "cos": this.len = this.slen - this.mlen.amp * Math.cos(this.age / (Math.PI * this.mlen.cycle)); break;
            case "custom": this.len = this.mlen.fn(this.life); break;
        }
        if (this.life < this.age) this.delete();
    }
    draw() {
        if (this.center == 0) {
            Core.stamp("bone_head_white", this.x, this.y, this.d - 180, this.size);
            Core.drawLine(this.x, this.y, this.d * Math.PI / 180, this.len, this.size / 100 * 10, "#ffffff", 1);
            Core.stamp("bone_head_white", this.x + this.len * Math.sin(this.d * Math.PI / 180), this.y - this.len * Math.cos(this.d * Math.PI / 180), this.d, this.size);
        } else {
            Core.stamp("bone_head_white", this.x - this.len * Math.sin(this.d * Math.PI / 180) / 2, this.y + this.len * Math.cos(this.d * Math.PI / 180) / 2, this.d - 180, this.size);
            Core.drawLine(this.x, this.y, this.d * Math.PI / 180, this.len, this.size / 100 * 10, "#ffffff", 0);
            Core.stamp("bone_head_white", this.x + this.len * Math.sin(this.d * Math.PI / 180) / 2, this.y - this.len * Math.cos(this.d * Math.PI / 180) / 2, this.d, this.size);
        }
    }
    delete() {
        delete Global.enemyAttacks.normalBone[this.name];
    }
}

function normalBoneForEach() {
    for (const name in Global.enemyAttacks.normalBone) {
        Global.enemyAttacks.normalBone[name].move();
        Global.enemyAttacks.normalBone[name] ? Global.enemyAttacks.normalBone[name].draw() : 0;
    };
};

new normalBone("bone1", 170, 240, 60, 150, 0, 0, -2, 0, Infinity, "white", 200)
new normalBone("bone2", 370, 240, 60, 150, 0, 0, 5, 0, Infinity, "white", 200, 1)
new normalBone("bone3", 170, 240, 60, 150,
    {
        type: "sin",
        amp: 250,
        cycle: 30,
    },
    {
        type: "cos",
        amp: 250,
        cycle: 30,
    }, 0, 0, Infinity, "white", 200, 1
)