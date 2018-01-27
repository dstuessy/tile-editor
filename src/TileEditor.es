import fs from 'fs'
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
        this.pallete = []
        this.key = new Key()
        this.sm = new StateMachine(new NormalState())

        this.maximise()

        window.addEventListener('resize', () => {
            this.maximise()
        })
    }
    load (levelPath = '') {
        if (!levelPath) {
            throw TypeError("TileEditor.load(levelPath): 'levelPath' cannot be falsy.")
        }
        const filePath = `./level/${levelPath}`

        fs.readFile(filePath, (err, content) => {
            if (err) {
                throw err
            }
            const level = JSON.parse(content)
            const tiles = level.pallete || []

            this.pallete = Object.keys(tiles).map((type) => {
                const tile = tiles[type]
                return new Tile(type, tile.positions, tile.color)
            })
        })
    }
    save () {
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
        this.ctx.fillRect(pos[0] * this.cellWidth, pos[1] * this.cellWidth, pos[0] + this.cellWidth, pos[1] + this.cellWidth)
    }
}
