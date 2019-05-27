'use strict'
//@depends(dna/Sprite)

/**
 *
 * @param st
 * @constructor
 * @alias lab.Floor
 */
let Floor = function(st) {
    dna.Sprite.call(this, st);

    this.solid = true
    this.img = res.home.floor;

    sys.augment(this, st);
};

sys.extend(Floor, dna.Sprite);

module.exports = Floor

