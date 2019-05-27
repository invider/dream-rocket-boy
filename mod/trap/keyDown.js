let shots = 0

module.exports = function(e) {

    switch(e.code) {
        // player 1
        case 'KeyA': lab.control.move(1, 1); break;
        case 'KeyD': lab.control.move(1, 3); break;
        case 'KeyW': if (!e.repeat) lab.control.use(1, 1); break;
        case 'KeyS': case 'KeyE': if (!e.repeat) lab.control.use(1, 2); break;
        // player 2
        case 'ArrowLeft': lab.control.move(2, 1); break;
        case 'ArrowRight': lab.control.move(2, 3); break;
        case 'ArrowUp': if (!e.repeat) lab.control.use(2, 1); break;
        case 'ArrowDown': case 'ShiftRight': if (!e.repeat) lab.control.use(2, 2); break;

        case 'Digit8':
            if (!e.repeat) {
                lib.img.screenshot('ritual-' + (++shots))
            }
            break;
    }

    // cheat code accumulator
    if (!_.paused && !e.repeat) {
        lab.cheat.key(e.key)
    }
};
