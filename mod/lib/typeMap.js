var TYPEMAP = {
    'b': 'home/Brick',
    '*': 'home/Floor',
    '|': 'home/WallPaper',
    'u': 'home/WallPaperBottom',
    'U': 'home/BathWallpaper',
    'i': 'home/InvisibleWal',
    'r': 'roof',
    '@': {proto:"home/Bed", params: {
        hero: "hero1",
        bedType: "bed1",
        controlName: "triggerControl1",
    }},
    '#': {proto:"home/Bed", params: {
        hero: "hero2",
        bedType: "bed2",
        controlName: "triggerControl2",
    }},
    'w': 'home/controls/WindowTrigger',
    'm': 'home/controls/MicrowaveTrigger',
    'T': 'home/controls/TestTrigger',
    't': 'home/controls/TvTrigger'
};


module.exports = TYPEMAP;
