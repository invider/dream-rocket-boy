'use strict'
//@depends(dna/Sprite)

/**
 *
 * @param st
 * @constructor
 * @alias lab.BathWallPaper
 */
let BathWallPaper = function(st) {
    dna.Sprite.call(this, st);
    this.solid = false
    this.img = res.home.wallpaperBath;

    sys.augment(this, st);
};

sys.extend(BathWallPaper, dna.Sprite);

module.exports = BathWallPaper
