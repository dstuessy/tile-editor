/* eslint-disable */
import TileEditor from './TileEditor'

const editor = new TileEditor()

editor.load()

function update () {
    editor.draw()
    editor.update()
    requestAnimationFrame(update)
}

update()
