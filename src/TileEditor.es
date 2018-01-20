import StateMachine from './state/StateMachine'
import NormalState from './state/NormalState'
import EventEmitter from './event/EventEmitter'
import Key from './lib/Key.es'

export default class TileEditor extends EventEmitter {
    constructor () {
        super()

        this.key = new Key()
        this.sm = new StateMachine(new NormalState())
    }
    load () {
        // load any assets here
    }
    draw () {
        this.sm.state.draw()
    }
    update () {
        this.sm.change(this.sm.state.update(this))
    }
}
