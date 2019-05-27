'use strict'
//@depends(dna/Sprite)

/**
 *
 * @param st
 * @constructor
 * @alias lab.InvisibleWall
 */
let InvisibleWall = function(st) {
    dna.Sprite.call(this, st);

    this.solid = true
    this.tiles = false
    this.img = false

    sys.augment(this, st);
};

sys.extend(InvisibleWall, dna.Sprite);

module.exports = InvisibleWall

