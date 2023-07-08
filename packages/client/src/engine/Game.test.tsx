import { Game } from './Game'
import 'jest-canvas-mock'
import lvl_1 from '../lvlMaps/lvl_1.json'

describe('Game', () => {
    let canvasMock: HTMLCanvasElement
    let ctxMock: CanvasRenderingContext2D

    beforeEach(() => {
        canvasMock = document.createElement('canvas')
        ctxMock = canvasMock.getContext('2d') as CanvasRenderingContext2D
    })

    it('creates an instance of Game', () => {
        const lvls = [ lvl_1 ]
        const game = new Game(ctxMock, lvls)

        expect(game).toBeInstanceOf(Game)
    })
})
