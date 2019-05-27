'use strict'
//@depends(dna/Sprite)

/**
 *
 * @param st
 * @constructor
 * @alias lab.Brick
 */
let Brick = function(st) {
    dna.Sprite.call(this, st);

    this.solid = true
    this.tiles = res.home.bricks;

    sys.augment(this, st);
};

sys.extend(Brick, dna.Sprite);

module.exports = Brick

