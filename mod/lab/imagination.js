'use strict'
// @depends(env/tuning)

const H = 20
const Y = 10

module.exports = {
    
    Z: 31,

    value: env.tuning.MAX_IMAGINATION,

    supply: function(v) {
        this.value = lib.math.limitedAdd(this.value, v, env.MAX_IMAGINATION)
        return this.value
    },

    reduce: function(v) {
        this.value -= v
        if (this.value < 0) {
            this.value = 0
            trap('gameOver')
        }
        return this.value
    },

    draw: function() {

        let i = this.value/env.MAX_IMAGINATION
        let mw = ctx.width * env.IMAGINATION_BAR
        let w = mw * i

        let x = ctx.width/2-w/2
        //ctx.fillStyle = '#c070ff'
        var g = ctx.createLinearGradient(x, 0, x+w, 0);
        g.addColorStop(0, '#302040')
        g.addColorStop(0.5, '#f070ff')
        g.addColorStop(1, '#302040')
        ctx.fillStyle = g

        ctx.fillRect(x, Y, w, H);

        ctx.strokeStyle = '#504070'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.rect(ctx.width/2 - mw/2, Y, mw, H);
        ctx.stroke()

        ctx.fillStyle = '#c070ff'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'

        ctx.fillStyle = '#605080'
        ctx.font = '18px kenney-rocket-square'
        ctx.fillText('imagination: ' + Math.floor(this.value) + '%', ctx.width/2, 54)

        ctx.fillStyle = env.color.imagination
        ctx.font = '18px kenney-rocket-square'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.fillText('day: ' + Math.floor(env.day), 10, 10)
    }
}
