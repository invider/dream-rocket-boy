
let ZOOM = 35

function attachEngine(x, y) {
    sys.spawn('Emitter', {
        Z: 25,
        x: x,
        y: y,
        color: '#ffffff',
        lifespan: -1,
        force: 200,
        radius: 0,
        size: 0.1, vsize: 0.1,
        speed: 4, vspeed: 1,
        angle: Math.PI*0.45, spread: Math.PI/8,
        minLifespan: 0.3, vLifespan: 0.2,
    }, 'camera')
}

module.exports = function() {

    log.out('setting up')

    sys.spawn('SlideCamera', {
        name: 'camera', 
        Z: 10,
        x: 13,
        y: 9,
        scale: ZOOM,
        speed: ZOOM*8,
        keys: []
    });

    /*
    sys.spawn('Grid', {
        Z: 10000,
        color: '#ffffff',
        top: 10,
        step: 1,
        coordinates: false,
        style: 'target',
    }, 'camera');
    */


    // setup level according to hash
    if (window.location.hash) {
        lab.game.nextLevel(parseInt(window.location.hash.substring(1)))
    } else {
        lab.game.nextLevel();
    }

    sys.spawn('home/TriggerControl', {
        name: 'triggerControl1', 
        Z: 10,
        x: 50,
        y: 70,
        w: 50,
        h: 50,
        scale: ZOOM,
        speed: ZOOM*8,
        keys: []
    });

    sys.spawn('home/TriggerControl', {
        name: 'triggerControl2', 
        Z: 10,
        x: 150,
        y: 70,
        w: 50,
        h: 50,
        scale: ZOOM,
        speed: ZOOM*8,
        keys: []
    });

    // attach rocket engines
    attachEngine(2, 16)
    attachEngine(24, 16)

    env.sfxVolume = 0.7
    sys.augment(env, env.tuning)
    sys.augment(env, env.config)
    
    env.day = 1

    /*
    if (!env.debug) {
        // hide and pause debug mod
        mod.debug.paused = true
        mod.debug.hidden = true
    }
    */
}
