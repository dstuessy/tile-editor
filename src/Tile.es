
export default class Tile {
    constructor (type = '', pos = [], color = '') {
        if (!type || !color) {
            throw TypeError("new Tile(type, pos, color): 'type' and 'color' cannot be falsy")
        }
        this.type = type
        this.positions = pos
        this.color = color
    }
}
