/* eslint-disable */
import TileEditor from './TileEditor'

const editor = new TileEditor(window, document.getElementById('game'))

editor.load('1-1.tile')

function update () {
    editor.clear()
    editor.draw()
    editor.update()
    requestAnimationFrame(update)
}

update()
