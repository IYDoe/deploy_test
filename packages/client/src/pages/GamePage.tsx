import React, { useEffect, useRef, useState } from 'react'
import { Game } from '../engine/Game'
import { PlayersStatus } from '../components/PlayersStatus'
import { Player } from '../engine/Player'
import lvl_1 from '../lvlMaps/lvl_1.json'
import { useAppDispatch } from '../store/hooks'
import { setFinishStatus, setDeadPlayer } from '../store/slices/gameSlice/gameSlice'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../utils/paths'

export const GamePage = () => {
    let game: Game | null = null
    const [ stopTimer, setStopTimer ] = useState(false)
    const [ players, setPlayers ] = useState<Player[]>([])
    const [ pointerLocked, setPointerLocked ] = useState<boolean>(false)
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const lvls = [ lvl_1 ]
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const finishLvl = (status: boolean) => {
        document.exitPointerLock()
        setStopTimer(true)
        dispatch(setFinishStatus(status))
    }

    const toStartScreen = () => {
        document.exitPointerLock()
        navigate(Paths.startScreen);
    }

    const handleKeyPressEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            toStartScreen()
        }
    }

    const init = () => {
        if (!refCanvas.current || game) {
            return
        }

        const ctx = refCanvas.current.getContext('2d')
        game = new Game(ctx as CanvasRenderingContext2D, lvls)

        game.eventBus.on('update', () => {
            setPlayers([ ...game!.players ])
        })

        game.eventBus.on('gameOver', () => {
            dispatch(setDeadPlayer(false))
            finishLvl(false)
        })

        game.eventBus.on('finishLvl', (isAnbDead: boolean) => {
            dispatch(setDeadPlayer(isAnbDead))
            finishLvl(!isAnbDead)
        })

        game.eventBus.emit('update')

        let last = performance.now()

        const animate = (now: number) => {
            const delay = now - last
            last = now

            game!.draw(delay)

            requestAnimationFrame(animate)
        }

        animate(0)

        document.addEventListener('pointerlockchange', handlePointerLockChange)

        document.documentElement.requestPointerLock()
    }

    const handlePointerLockChange = () => {
        setPointerLocked(document.pointerLockElement === refCanvas.current)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPressEsc);
        init()

        return () => {
            window.removeEventListener('keydown', handleKeyPressEsc);
            document.removeEventListener(
                'pointerlockchange',
                handlePointerLockChange
            )
        }
    }, [])

    return (
        <div>
            <canvas
                ref={refCanvas}
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={() => refCanvas.current?.requestPointerLock()}>
                Необходимо включить поддержку JavaScript в вашем браузере
            </canvas>
            <PlayersStatus players={players} stopTimer={stopTimer} />
            <button className='round-button round-button_top round-button_left' onClick={toStartScreen}>
                <img src='/images/exit.svg' alt="В меню." />
            </button>
            {pointerLocked}
        </div>
    )
}
