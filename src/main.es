/* eslint-disable */
import TileEditor from './TileEditor'

const editor = new TileEditor(window, document.getElementById('game'))

editor.load()

function update () {
    editor.clear()
    editor.draw()
    editor.update()
    requestAnimationFrame(update)
}

update()
