import { Game } from './Game';
import { LvlData, PosAndSize } from './interfaces';

export class Map {
    private game: Game;
    public data: LvlData;
    private drawnOnce: boolean

    constructor(game: Game, data: LvlData) {
        this.game = game;
        this.data = data;
        this.drawnOnce = false
    }

    drawItem(item: PosAndSize): void {
        this.game.ctx.fillRect(item.x, item.y, item.width, item.height);
    }

    draw(): void {
        if (this.drawnOnce) {
            return;
        }

        this.data.stairs.forEach(item => {
            this.drawItem(item);
        });

        this.data.platforms.forEach(item => {
            this.drawItem(item);
        });

        this.drawnOnce = true;
    }
}
