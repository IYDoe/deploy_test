import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Baleog extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y,
        }, 'baleog');

        this.spritePath = '/images/sprites/baleog.png';
        this.avatarPos = '-6px 3px';
        this.deadAvatar = '-6px -907px'
        this.canAttack = true;
    }

    protected firstAbility(): void {
        this.attack = this.firstAbilityInProgress;

        if (this.attack) {
            this.animInProgress = true;
            this.frameY = this.isDirectionRight ? 18 : 20;
            this.maxFrameX = 3;

            setTimeout(() => {
                this.frameReset();
            }, 300)
        }

        this.animInProgress = false;
        this.firstAbilityInProgress = false;
    }

    protected secondAbility(): void { }
}
