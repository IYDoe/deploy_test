import { Game } from './Game';

enum EVENTS {
    RIGHT = 'moveRight',
    LEFT = 'moveLeft',
    DOWN = 'moveDown',
    UP = 'moveUp',
    NEXT_PLAYER = 'nextPlayer',
    PREV_PLAYER = 'prevPlayer',
    FIRST_ABILITY = 'firstAbility',
    SECOND_ABILITY = 'secondAbility'
}

export class Control {
    private game: Game;
    private gamePadHistory: Record<string, boolean>;

    constructor(game: Game) {
        this.game = game;
        this.gamePadHistory = {};

        this.addEvents();
    }

    private moveEvents(e: KeyboardEvent, isMoving: boolean): void {
        switch(e.key) {
        case 'ArrowRight':
            this.game.eventBus.emit(EVENTS.RIGHT, isMoving);
            break;
        case 'ArrowLeft':
            this.game.eventBus.emit(EVENTS.LEFT, isMoving);
            break;
        case 'ArrowUp':
            this.game.eventBus.emit(EVENTS.UP, isMoving);
            break;
        case 'ArrowDown':
            this.game.eventBus.emit(EVENTS.DOWN, isMoving);
            break;
        }
    }

    private changePlayerEvents(e: KeyboardEvent): void {
        switch(e.code) {
        case 'KeyQ':
            this.game.eventBus.emit(EVENTS.PREV_PLAYER);
            break;
        case 'KeyW':
            this.game.eventBus.emit(EVENTS.NEXT_PLAYER);
            break;
        }
    }

    private abilitiesEvents(e: KeyboardEvent): void {
        switch(e.code) {
        case 'KeyA':
        case 'Space':
            this.game.eventBus.emit(EVENTS.FIRST_ABILITY);
            break;
        case 'KeyS':
            this.game.eventBus.emit(EVENTS.SECOND_ABILITY);
            break;
        }
    }

    private gamePadMoves(event: string, conditions: boolean): void {
        if (conditions) {
            this.game.eventBus.emit(event, true);
            this.gamePadHistory[event] = true;

            return;
        }

        if (this.gamePadHistory[event]) {
            this.game.eventBus.emit(event, false);
            this.gamePadHistory[event] = false;
        }
    }

    private gamePadActions(event: string, conditions: boolean): void {
        if (conditions) {
            if (!this.gamePadHistory[event]) {
                this.game.eventBus.emit(event);
                this.gamePadHistory[event] = true;
            }
        } else {
            if (this.gamePadHistory[event]) {
                this.gamePadHistory[event] = false
            }
        }
    }

    public gamePadContol() {
        const gamePads = navigator.getGamepads();

        if (!gamePads[0]) {
            return;
        }

        const gamePad = gamePads[0];
        const buttons = gamePad.buttons;
        const axes = gamePad.axes;

        this.gamePadActions(EVENTS.FIRST_ABILITY, buttons[0].pressed);
        this.gamePadActions(EVENTS.SECOND_ABILITY, buttons[1].pressed);
        this.gamePadActions(EVENTS.PREV_PLAYER, buttons[2].pressed);
        this.gamePadActions(EVENTS.NEXT_PLAYER, buttons[3].pressed);

        this.gamePadMoves(EVENTS.RIGHT, buttons[15].pressed || axes[0] > 0);
        this.gamePadMoves(EVENTS.LEFT, buttons[14].pressed || axes[0] < 0);
        this.gamePadMoves(EVENTS.DOWN, buttons[13].pressed || axes[3] > 0);
        this.gamePadMoves(EVENTS.UP, buttons[12].pressed || axes[3] < 0);
    }

    private addEvents(): void {
        window.addEventListener('keydown', e => {
            this.moveEvents(e, true);
        });

        window.addEventListener('keyup', e => {
            this.moveEvents(e, false);
            this.changePlayerEvents(e);
            this.abilitiesEvents(e);
        });
    }
}
