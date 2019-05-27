'use strict'

let spawnBed = 0

let game = {

    over: false,

    level: 0,
    cycle: 0,
    dayTime: 0,

    evo: function(dt) {
        if (this.over) return

        this.cycle++
        this.dayTime += dt
        if (this.dayTime > env.DAY_LENGTH) {
            this.dayTime = 0
            this.nextDay()
        }
    },

    nextDay: function() {
        env.day++
        lab.meteoroidRain.freq *= env.tuning.METEOR_DAY_FQ_INCREASE
        lab.space.speed -= 1
        lib.sfx(res.sfx.nextday, 0.3)
    },

    nextLevel: function(level){
        if (level !== undefined) this.level = level;
        else this.level++;

        // loop to first level in the end
        let levelRes = res.levels[this.level];

        if (!levelRes) {
            this.level = 1;
            levelRes = res.levels[this.level];
        }

        log.out('Level Up to #' + this.level);
        window.location.hash = '' + this.level;
        
        this.loadLevel(levelRes)
    },

    /*
    gameOver: function(){
        this.loadLevel(res.levels.death);
        setTimeout(() => {
            lab.camera.x = 17;
            lab.camera.y = 8;
            lab.camera.scale = 25
        }, 1000);
        lib.sfx(res.sfx.ghost2, 1)
    },
    */

    loadLevel: function(levelRes){
        lab.camera.detachAll();
        lib.levelLoader.loadFile(levelRes, lib.typeMap);
    },

    locateBeds: function() {
        return lab.camera._ls.filter(e => e instanceof dna.home.Bed)
    },

    spawnHero: function(player) {
        let beds = this.locateBeds()
        if (spawnBed >= beds.length) spawnBed = 0
        let bed = beds[spawnBed++]

        let hero = sys.spawn('Hero', {
            name: 'hero' + player,
            Z: 101, 
            x: bed.x,
            y: bed.y,
            bedType: "bed1",
            controlName: "triggerControl1",
        }, 'camera');
        hero.jump()

        return hero
    },

};

module.exports = game;
