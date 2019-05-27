'use strict'
//@depends(dna/Sprite)

/**
 *
 * @param st
 * @constructor
 * @alias lab.WallPaper
 */
let WallPaper = function(st) {
    dna.Sprite.call(this, st);
    this.solid = false
    this.img = res.home.wallpaper;

    sys.augment(this, st);
};

sys.extend(WallPaper, dna.Sprite);

module.exports = WallPaper
