import State from './State'
import NormalState from './NormalState'

export default class HelloState extends State {
    constructor () {
        super()

        this.subject = 'World'
        this.previousTime = Date.now()
    }
    draw () {
        console.log(`Hello ${this.subject}!`)
    }
    update (editor) {
        if (editor.key.isDown('Escape')) {
            return new NormalState()
        }

        if ((Date.now() - this.previousTime) >= 2000) {
            this.subject = 'Universe'
            this.previousTime = Date.now()
        }

        return this
    }
}
