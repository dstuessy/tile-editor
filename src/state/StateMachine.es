import State from './State'
import decorate from '../lib/decorate'

export default class StateMachine {
    constructor (original) {
        this.original = original
        this.state = original
    }
    change (s) {
        if (!(s instanceof State)) {
            throw TypeError('StateMachine.change(): first argument should be an instance of State.')
        }

        if (s !== this.state) {
            this.state = decorate(this.original, s)
        }

        return this.state
    }
}
