import State from './State'

export default class NormalState extends State {
    draw (editor) {
        for (const tile of editor.pallete) {
            for (const pos of tile.positions) {
                editor.fillCell(pos, tile.color)
            }
        }
    }
    update (editor) {
        return this
    }
}
