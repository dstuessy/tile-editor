
export default class Key {
    constructor () {
        this.pressed = new Set()

        window.addEventListener('keydown', (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.pressed.add(e.key)
        })

        window.addEventListener('keyup', (e) => {
            e.preventDefault()
            e.stopPropagation()
            this.pressed.delete(e.key)
        })
    }
    isDown (keyName) {
        return this.pressed.has(keyName)
    }
}
