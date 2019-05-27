'use strict'
//@depends(dna/Sprite)

/**
 *
 * @param st
 * @constructor
 * @alias lab.WallPaperBottom
 */
let WallPaperBottom = function(st) {
    dna.Sprite.call(this, st);
    this.solid = false
    this.img = res.home.wallpaperBottom;

    sys.augment(this, st);
};

sys.extend(WallPaperBottom, dna.Sprite);

module.exports = WallPaperBottom
