Global.enemyAttacks.normalBone = {};

class normalBone {
    static autoID = 0;
    constructor(name, sx, sy, sd, sl, mx, my, md, ml, life, color, size) {
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
        this.name = name ? name : "_auto|" + normalBone.autoID;
        Global.enemyAttacks.normalBone[this.name];
    }
    move() {
        this.age++;

        if (typeof (this.mx) == "number") this.x += this.mx;
        else if (this.mx.type == "sin") this.x = this.sx + this.mx.amp * Math.sin(this.age / (Math.PI * this.mx.hz));
        else if (this.mx.type == "cos") this.x = this.sx + this.mx.amp * Math.sin(this.age / (Math.PI * this.mx.hz));

        if (typeof (this.my) == "number") this.y += this.my;
        else if (this.my.type == "sin") this.y = this.sy + this.my.amp * Math.sin(this.age / (Math.PI * this.my.hz));
        else if (this.my.type == "cos") this.y = this.sy + this.my.amp * Math.sin(this.age / (Math.PI * this.my.hz));

        if (typeof (this.md) == "number") this.d += this.md;
        else if (this.md.type == "sin") this.d = this.sd + this.md.amp * Math.sin(this.age / (Math.PI * this.md.hz));
        else if (this.md.type == "cos") this.d = this.sd + this.md.amp * Math.sin(this.age / (Math.PI * this.md.hz));

        if (typeof (this.mlen) == "number") this.len += this.mlen;
        else if (this.mlen.type == "sin") this.len = this.slen + this.mlen.amp * Math.sin(this.age / (Math.PI * this.mlen.hz));
        else if (this.mlen.type == "cos") this.len = this.slen + this.mlen.amp * Math.sin(this.age / (Math.PI * this.mlen.hz));

        if (this.age < this.life) this.delete();
    }
    draw() {
        Core.stamp("bone_head_white", this.x, this.y, this.d, this.size);
        Core.drawLine(this.x, this.y, this.d, this.len, this, size / 100, "#ffffff");
    }
    delete() {
        delete Global.enemyAttacks.normalBone[this.name];
    }
}
