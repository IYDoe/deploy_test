import { Game } from '../Game';
import { Player } from '../Player';
import { Position } from '../interfaces';

export class Olaf extends Player {
    constructor(game: Game, position: Position) {
        super(game, {
            x: position.x,
            y: position.y
        }, 'olaf');

        this.spritePath = '/images/sprites/olaf.png';
        this.avatarPos = '-5px 0px';
        this.deadAvatar = '-10px -914px';

        this.shield = true;
    }

    protected firstAbility(): void {
        this.firstAbilityInProgress = false;
    }

    protected secondAbility(): void { }
}
