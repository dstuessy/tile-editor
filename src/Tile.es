import Vector from './lib/Vector'

export default class Tile {
    constructor (x, y, color) {
        this.pos = new Vector(x, y)
        this.color = color
    }
}
