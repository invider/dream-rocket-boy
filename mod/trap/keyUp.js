module.exports = function(e) {

    if (_.paused && e.code !== 'Digit8') {
        _.paused = false
        return
    }

    switch(e.code) {

        case 'KeyA': lab.control.stop(1, 1); break;
        case 'KeyD': lab.control.stop(1, 3); break;

        case 'ArrowLeft': lab.control.stop(2, 1); break;
        case 'ArrowRight': lab.control.stop(2, 3); break;

        case 'KeyP': _.paused = true; break;
    }

};
