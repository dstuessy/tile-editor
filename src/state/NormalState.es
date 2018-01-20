import State from './State'

export default class NormalState extends State {
    draw (editor) {
        for (const tile of editor.tiles) {
            editor.fillCell(tile.pos, tile.color)
        }
    }
    update (editor) {
        return this
    }
}
