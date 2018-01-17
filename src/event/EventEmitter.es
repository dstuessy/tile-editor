import Event from './Event'

export default class EventEmitter {
    constructor () {
        this.events = []
    }
    on (name = '', cb = () => {}) {
        this.events.push(new Event({ name, cb }))
    }
    off (name, cb) {
        this.events = this.events.filter(e => e.name !== name && e.cb !== cb)
    }
    fire (name = '', ...args) {
        this.events
            .filter(e => e.name === name)
            .forEach(e => e.cb(...args))
    }
}
