'use strict'

// define rect to hit
const HIT_SX = 2
const HIT_SY = 5
const HIT_W = 22
const HIT_H = 9

function determineHitTarget() {
    let x = HIT_SX + lib.math.rndi(HIT_W)
    let y = HIT_SY + lib.math.rndi(HIT_H)

    let ls = lab.collider.filterWithin(x, y, 0.9, 0.9).filter(e => e.solid)
    if (ls.length > 0) return false

    return {
        x: x,
        y: y
    }
}

function tryMultipleTargets() {
    for (let i = 0; i < 20; i++) {
        let tar = determineHitTarget()
        if (tar) return tar
    }
    return false
}

function hitTarget(tar) {
    sys.spawn('Ruby', {
        x: tar.x,
        y: tar.y,
    }, 'camera')

    sys.spawn('Emitter', {
        Z: 102,
        x: tar.x,
        y: tar.y,
        color: '#ffffff',
        lifespan: 0.1,
        force: 1000,
        radius: 0.2,
        size: 0.1, vsize: 0.1,
        speed: 1, vspeed: 0.2,
        angle: 0, spread: Math.PI*2,
        minLifespan: 0.4, vLifespan: 0.2
    }, 'camera')

    lab.imagination.reduce(env.METEOR_HIT_FACTOR)
    lib.sfx(res.sfx.explosion1, 0.5)
}


module.exports = {

    Z: 102,

    freq: env.tuning.METEOR_INIT_FQ,

    meteoroids: [],

    newMeteor: function() {
        let tar = tryMultipleTargets()
        if (!tar) return // can't find any target


        let meteor = {
            a: true,
            c: lib.math.rndi(3),
            m: 10 + lib.math.rndi(5),
            x: lib.math.rndi(ctx.width),
            y: -50,
            tar: tar,
            tx: lab.camera.screenX(tar.x),
            ty: lab.camera.screenY(tar.y),
            ttl: 1,
        }

        meteor.dx = (meteor.tx-meteor.x)/meteor.ttl
        meteor.dy = (meteor.ty-meteor.y)/meteor.ttl

        // place the meteor
        for (let i = 0; i < this.meteoroids.length; i++) {
            if (!this.meteoroids[i].a) {
                this.meteoroids[i] = meteor
                return
            }
        }
        this.meteoroids.push(meteor)
    },

    evo: function(dt) {
        if (lib.math.rndf() < this.freq * dt) this.newMeteor()

        this.meteoroids.forEach(m => {
            if (m.a) {
                m.x += m.dx * dt
                m.y += m.dy * dt
                m.ttl -= dt
                if (m.ttl < 0) {
                    m.a = false
                    hitTarget(m.tar)
                }
            }
        })
    },

    draw: function() {
        // draw meteoroids
        this.meteoroids.forEach( m => {
            if (m.a) {
                let img = res['star-blue']
                switch(m.c) {
                case 1: img = res['star-blue']; break;
                case 2: img = res['star-yellow']; break;
                }
                ctx.drawImage(img, m.x-m.m/2, m.y-m.m/2, m.m, m.m)

                /*
                // mark the target
                let TH = 2
                ctx.fillStyle = '#ff1020'
                ctx.fillRect(m.tx-TH, m.ty-TH, TH*2, TH*2)
                */
            }
        })
    },
}
