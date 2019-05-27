function Ray(x, y, angle){
    this.x = x;
    this.y = y;
    this.dx = Math.cos(angle);
    this.dy = Math.sin(angle);
}

/**
 * @alias lib.damageDistribution
 * @type {{defaultSpeed: number, findDx: (function(*, *): number), triggerRadius: number, distribute: (function(*, *=): (Uint8Array | BigInt64Array | *[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array)), findK: (function(*, *): number), createRays: (function(*=, *=, *=): Array), checkDamage: (function(*, *): *), defaultCount: number}}
 */

module.exports = {
    triggerRadius: 1,
    defaultCount: 10000,
    defaultSpeed: 1,
    minX:-10000,
    minY:-10000,
    maxX:10000,
    maxY:10000,
    findAngle: function(current, max){
       return 2 * Math.PI * max / current;
    },

    createRays: function(x, y, count){
        count = count || this.defaultCount;
        let rays = [];
        for (let i=0; i<count; i++){
            let ray = new Ray(x, y, this.findAngle(i, count));
            rays.push(ray);
        }
        return rays;
    },
    distribute: function(rays, speed){
        speed = speed || this.defaultSpeed;
        return rays.map(ray => {
            ray.x += ray.dx * speed;
            ray.y += ray.dy * speed;
            return ray;
        }).filter(o => o.x > this.minX && o.y > this.minY && o.x < this.maxX && o.y < this.maxY)

    },
    checkDamage: function(rays, predicate){
        let cache = {};
        return rays.filter(o => {
            let x = Math.round(o.x);
            let y = Math.round(o.y);
            let cacheKey = x + "_" + "y";
            let res;
            if (cache[cacheKey] != undefined){
                res = cache[cacheKey];
            } else {
                res = predicate(x, y);
                cache[cacheKey] = res;
            }
            return !res;
        })
    }
}