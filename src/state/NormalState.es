import State from './State'
import HelloState from './HelloState'

export default class NormalState extends State {
    draw () {
        console.log('...')
    }
    update (editor) {
        if (editor.key.isDown(':')) {
            return new HelloState()
        }

        return this
    }
}
