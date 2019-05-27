'use strict'
//@depends(dna/Sprite)

/**
 *
 * @param st
 * @constructor
 * @alias lab.Bed
 */
let Bed = function(st) {
    dna.Sprite.call(this, st);
    this.solid = false
    this.img = res.home[st.bedType];

    sys.augment(this, st);
    //this.spawnPlayer();
};
sys.extend(Bed, dna.Sprite);

/*
Bed.prototype.spawnPlayer = function(){
    sys.spawn("Hero", {
        name: this.hero,
        controlName: this.controlName,
        x: this.x,
        y: this.y,
    }, "camera");
}
*/

module.exports = Bed
