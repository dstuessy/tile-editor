export default class Event {
    constructor (name = '', cb = () => {}) {
        if (!name) {
            throw TypeError("Event: event 'name' shouldn't be falsy.")
        }
        if (!cb) {
            throw TypeError("Event: event 'cb' (callback) shouldn't be falsy.")
        }

        this.name = name
        this.cb = cb
    }
}
