import StateMachine from './state/StateMachine'
import NormalState from './state/NormalState'
import Key from './lib/Key.es'
import Tile from './Tile'

/* global HTMLCanvasElement */
export default class TileEditor {
    constructor (window, canvas) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw TypeError('TileEditor(): argument needs to be an HTMLCanvasElement')
        }

        this.window = window
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.cellWidth = 32
        this.tiles = [
            new Tile(0, 0, 'blue'),
            new Tile(0, 1, 'blue'),
            new Tile(1, 1, 'blue'),
            new Tile(1, 0, 'blue'),
            new Tile(2, 2, 'red'),
            new Tile(3, 3, 'red'),
            new Tile(4, 4, 'green'),
            new Tile(3, 5, 'green')
        ]
        this.key = new Key()
        this.sm = new StateMachine(new NormalState())

        this.maximise()

        window.addEventListener('resize', () => {
            this.maximise()
        })
    }
    load () {
        // load any assets here
    }
    maximise () {
        this.canvas.width = this.window.innerWidth
        this.canvas.height = this.window.innerHeight
    }
    clear () {
        this.canvas.width = this.canvas.width
    }
    draw () {
        this.sm.state.draw(this)
    }
    update () {
        this.sm.change(this.sm.state.update(this))
    }
    fillCell (pos, color) {
        if (!(pos || color)) {
            throw TypeError('TileEditor.fillCell(): pos and color must not be falsy')
        }

        this.ctx.fillStyle = color
        this.ctx.fillRect(pos.x * this.cellWidth, pos.y * this.cellWidth, pos.x + this.cellWidth, pos.y + this.cellWidth)
    }
}
