'use strict'

const MAX_GAMEPADS = 8
const GAMEPAD_BUTTON_SCAN = 16

// control ghost
module.exports = {

    move: function(player, dir) {
        if (lab.game.over) return

        let h = lab.camera['hero' + player]
        if (h) {
            if (dir === 2 && !h.keys[dir]) {
                h.jump()
            }
            h.keys[dir] = true
        } else {
            lab.game.spawnHero(player)
        }
    },

    stop: function(player, dir) {
        let h = lab.camera['hero' + player]
        if (h) {
            h.keys[dir] = false
        }
    },

    use: function(player, action) {
        if (lab.game.over) return

        let h = lab.camera['hero' + player]
        if (!h) {
            lab.game.spawnHero(player)
            return
        }

        h.use(action)
    },

    handlePad: function(player, pad, dt) {
        let h = lab.camera['hero' + player]
        if (!h) {
            // no associated hero!
            // check if we need to spawn on
            let pressedAction = false
            for (let b = 0; b < GAMEPAD_BUTTON_SCAN; b++) {
                if (pad.buttons[b] && pad.buttons[b].pressed) pressedAction = true
            }
            if (pressedAction) h = lab.game.spawnHero(player)
            return
        }

        for (let b = 0; b < 4; b++) {
            if (pad.buttons[b].pressed) {
                if (!h.keys[5+b]) {
                    h.use(b+1)
                    h.keys[5+b] = true
                }
            } else {
                h.keys[5+b] = false
            }
        }

        let x = 0
        if (pad.axes[0]) x = pad.axes[0]
        let y = 0
        if (pad.axes[1]) y = pad.axes[1]

        if (x < -0.2) this.move(player, 1)
        else this.stop(player, 1)

        if (x > 0.2) this.move(player, 3)
        else this.stop(player, 3)

        if (y < -0.8) this.move(player, 2)
        else this.stop(player, 2)

        if (y > 0.8) this.move(player, 4)
        else this.stop(player, 4)

    },

    evo: function(dt) {
        if (lab.game.over) return

        for (let i = 0; i < MAX_GAMEPADS; i++) {
            let pad = navigator.getGamepads()[i];
            if (pad) this.handlePad(i+3, pad, dt)
        }
    },

}
