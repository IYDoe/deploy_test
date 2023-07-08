import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Eric extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y
        }, 'eric');

        this.spritePath = '/images/sprites/eric.png';
        this.avatarPos = '-4px 0';
        this.deadAvatar = '-4px -911px'
        this.maxSpeed += 1;
    }

    protected firstAbility(): void {
        if (!this.firstAbilityInProgress || this.canMoveY || this.velocity.y !== 0) {
            this.firstAbilityInProgress = false;
            return;
        }

        this.jumpSpeed -= 1;
        this.position.y += this.jumpSpeed;

        this.noGravity = true;

        if (this.jumpSpeed <= -16) {
            this.jumpSpeed = 0;
            this.noGravity = false;
            this.firstAbilityInProgress = false;
        }
    }

    protected secondAbility(): void { }
}
