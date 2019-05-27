'use strict'
//@depends(dna/home/Trigger)
/**
 *
 * @param st
 * @constructor
 * @alias lab.WindowTrigger
 */
let WindowTrigger = function(st) {
    dna.home.Trigger.call(this, st);
    //this.tiles = ... // use this for specifying trigger control tileset
    //this.triggerTileX = 0
    //this.solid = true
    this.img = res.home.window;
    sys.augment(this, st);
};

sys.extend(WindowTrigger, dna.home.Trigger);

WindowTrigger.prototype.use = function(target){
    lab.imagination.value -= 10;
    let rays = lib.damageDistribution.createRays(this.x, this.y);
    let damageCache = {};
    while (rays.length){
        rays = lib.damageDistribution.distribute(rays)
        rays = lib.damageDistribution.checkDamage(rays, (x, y)=> {
            return lab.camera._ls.filter(camObj => {
                let ox = Math.round(camObj.x);
                let oy = Math.round(camObj.y);
                let res = x == ox && y == oy;
                if (res){
                    let damageCacheKey = camObj.x + "_" + camObj.y;
                    if (!damageCache[damageCacheKey]){
                        console.log("Damaged" + damageCacheKey + ":", camObj);
                        sys.spawn('Emitter', {
                            Z: 102,
                            x: x,
                            y: y,
                            color: '#ffffff',
                            lifespan: 0.1,
                            force: 1000,
                            radius: 0.2,
                            size: 0.1, vsize: 0.1,
                            speed: 1, vspeed: 0.2,
                            angle: 0, spread: Math.PI*2,
                            minLifespan: 0.4, vLifespan: 0.2
                        }, 'camera')
                        damageCache[damageCacheKey] = 1;
                    }

                }
                return res;
            }).length;
        });
    }
}

module.exports = WindowTrigger

