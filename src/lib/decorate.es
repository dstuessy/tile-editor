
export default (target, decoration) => new Proxy(target, {
    get (target, prop, receiver) {
        return prop in decoration ? decoration[prop] : target[prop]
    }
})
