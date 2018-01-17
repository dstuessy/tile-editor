import StateMachine from './state/StateMachine'
import NormalState from './state/NormalState'
import HelloState from './state/HelloState'
import EventEmitter from './event/EventEmitter'

export default class TileEditor extends EventEmitter {
    constructor () {
        super()

        this.state = new StateMachine(new NormalState())

        console.log(this.state.prop.greet)

        this.state.change(new HelloState())

        console.log(this.state.prop.greet)

        this.state.change(new NormalState())

        console.log(this.state.prop.greet)
    }
}
