'use strict'
//@depends(dna/Sprite)

let id = 1
let lastColor = 0;
let Hero = function(st) {
    dna.Sprite.call(this, st);
    this.name = 'hero' + id++
    this.alive = true
    this.collidable = true;
    this.Z = 101
    
    this.keys = []

    this.x = 0
    this.y = 0
    this.w = 0.9
    this.h = 0.9
    this.aw = 0.8
    this.ah = 0.9
    lastColor = !lastColor
    this.color = lastColor;
    this.tiles = res.character
    this.oldX = 0;
    this.startTilex = -1
    this.framerate = 9

    this.speed = 5
    this.dy = 0

    sys.augment(this, st)
}
sys.extend(Hero, dna.Sprite);

Hero.prototype.hint = function(msg, color, st) {
	// check if that hint already exists
    if (st && st.name) {
        if (lab[st.name]) return
    }
	if (!color) color = '#ffff00'

    let opt = {
        Z: 20,
        text: msg,
        fillStyle: '#000000',
        x: lab.camera.screenX(this.x+2),
        y: lab.camera.screenY(this.y - this.h/2),
        font: '14px ' + env.FONT,
        align: 'center',
        ttl: 2.5,
        tti: 0.3,
        ttf: 1,
        dx: +20,
        dy: -50,
    }
    if (st) sys.augment(opt, st)

    sys.spawn('text/fadeText', opt)

    opt.fillStyle = color
    opt.x -= 1
    opt.y -= 1
    opt.Z += 5
    sys.spawn('text/fadeText', opt)
}


Hero.prototype.use = function(action) {
    
    switch(action) {
    case 1: this.jump(); break;
    case 2: if (this.trigger) {
            this.trigger.use(this)
        }
        break;
    case 3: if (this.trigger) {
            this.trigger.use(this)
        }
        break;
    }
}

Hero.prototype.jump = function() {
    this.dy = -env.JUMP
    lib.sfx(res.sfx.jump1, 0.5)
}

Hero.prototype.moveTo = function(x, y) {
    // try to move
    if (lab.collider.testWall(this, x, y)) return false

    this.x = x
    this.y = y
    return true
}

Hero.prototype.evo = function(dt) {
    //dna.Sprite.evo(this, dt)
    this.oldX = this.x;
    this.nextFrame(dt)

    // move horizontally
    if (this.keys[1]) {
        this.moveTo(this.x - this.speed * dt, this.y)
    } else if (this.keys[3]) {
        this.moveTo(this.x + this.speed * dt, this.y)
    }

    // apply gravity
    this.dy += env.G*dt

    // vertical movement - jumps and gravity
    if (!this.moveTo(this.x, this.y + this.dy*dt)) {
        this.dy = 0
    }
    this.selectTile();
}
Hero.prototype.selectTile = function(){
    if (this.oldX === this.x && this.startTilex != -1){
        return;
    }

    let current = this.color ? 0: 4;
    this.startTilex = current;
    if (this.oldX > this.x){
        this.startTilex += 2;
    }
    this.endTilex = this.startTilex + 1
};
Hero.prototype.postDraw = function() {
    // draw active frame and status in debug mode
    if (env.debug) {

        ctx.lineWidth = 0.03
        // draw coordinates center
        ctx.strokeStyle = '#404040'
        ctx.beginPath()
        ctx.moveTo(0, -0.5)
        ctx.lineTo(0, 0.5)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(-0.5, -0)
        ctx.lineTo(0.5, 0)
        ctx.stroke()

        // draw bounding boxes
        ctx.lineWidth = 0.02
        ctx.strokeStyle = '#ff0000'
        ctx.beginPath();
        ctx.rect(-this.w2, -this.h2, this.w, this.h)
        ctx.stroke()

        ctx.lineWidth = 0.01
        ctx.strokeStyle = '#ffff00'
        ctx.beginPath();
        ctx.rect(-this.aw2, -this.ah2, this.aw, this.ah)
        ctx.stroke()
    }
}

module.exports = Hero

