'use strict'
//@depends(dna/Sprite)
/**
 *
 * @param st
 * @constructor
 * @alias dna.home.TriggerControl
 */

let TriggerControl = function(st) {
    dna.Sprite.call(this, st);
//    this.speed = 0.5;
    this.img = res.TriggerControlBg;
    this.trigger = false;
    this.collidable = true;

    sys.augment(this, st)
};

sys.extend(TriggerControl, dna.Sprite);
TriggerControl.prototype.draw = function(){
    if (this.trigger){
        dna.Sprite.prototype.draw.call(this);
        this.drawTrigger();
    }
    this.trigger = false;
}

TriggerControl.prototype.drawTrigger = function(){
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.trigger.type == "rotate"){
        let tiles = res.tileset;
        let triggerTileX = 10
        ctx.rotate(this.trigger.angle * Math.PI / 180);
        tiles.draw(triggerTileX, - tiles.tw/2, - tiles.th/2, tiles.th, tiles.tw);
    } else {
        let image = this.trigger.pressed ? res.home.buttonPressed: res.home.button;
        ctx.drawImage(image,- image.width / 2, - image.height / 2, image.width, image.height);
    }
    ctx.restore();
    
}

module.exports = TriggerControl;


