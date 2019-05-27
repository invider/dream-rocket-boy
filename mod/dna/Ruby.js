'use strict'

/**
 *
 * @param st
 * @constructor
 * @alias lab.Ruby
 */
let Ruby = function(st) {
    dna.Sprite.call(this, st);

    this.Z = 15
    this.alive = true
    this.solid = false
    this.collidable = true
    this.img = res['star-yellow']

    this.value = 1 + lib.math.rndi(env.RUBY_MAX_VALUE)
    this.w = 0.5
    this.h = 0.5
    this.aw = 0.1
    this.ah = 0.1

    sys.augment(this, st);
};
sys.extend(Ruby, dna.Sprite);

Ruby.prototype.hit = function(e) {
    if (e instanceof dna.Hero) {
        let v = Math.ceil(this.value)
        lab.imagination.supply(v)
        e.hint('+' + v + ' imagination', env.color.up)
        lib.sfx(res.sfx.pickup2, 0.5)
        this.__.detach(this)
    }
}

Ruby.prototype.evo = function(dt) {
    this.value -= env.RUBY_VALUE_REDUCE_FACTOR * dt
    if (this.value < env.RUBY_MIN_VALUE) {
        this.__.detach(this)
    }
}


module.exports = Ruby

