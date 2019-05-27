'use strict'
//@depends(dna/home/Trigger)
/**
 *
 * @param st
 * @constructor
 * @alias lab.TvTrigger
 */
let TvTrigger = function(st) {
    dna.home.Trigger.call(this, st);
    this.tiles = res.home.tv;
    this.startTilex = 0;
    this.endTilex = 1;
    this.framerate = 10;
    sys.augment(this, st);
};

sys.extend(TvTrigger, dna.home.Trigger);

TvTrigger.prototype.use = function(target){

};

module.exports = TvTrigger

