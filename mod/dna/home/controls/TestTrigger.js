'use strict'
//@depends(dna/home/Trigger)


let TestTrigger = function(st) {
    dna.home.Trigger.call(this, st);
//    this.speed = 0.5;

    sys.augment(this, st)
};

sys.extend(TestTrigger, dna.home.Trigger);

module.exports = TestTrigger;


