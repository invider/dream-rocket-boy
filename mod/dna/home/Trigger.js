'use strict'
//@depends(dna/Sprite)
/**
 *
 * @param st
 * @constructor
 * @alias dna.home.Trigger
 */

let Trigger = function(st) {
    dna.Sprite.call(this, st);
    this.type = "rotate";
    this.collidable = true;
    this.angle = 0;
    sys.augment(this, st)
};

sys.extend(Trigger, dna.Sprite);

Trigger.prototype.use = function(hero, action){
    log.out(this.name + ' used by ' + hero.name)
}

Trigger.prototype.hit = function(elem){
    if (elem instanceof dna.Hero){
        elem.trigger = this
        // find associated trigger ui control
        lab[elem.controlName].trigger = this;
    }
}

module.exports = Trigger

