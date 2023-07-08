import { Game } from './Game';
import { Player } from './Player';
import { HealsItem, PosAndSize } from './interfaces';

export class Heals {
    private game: Game;
    private data: HealsItem;

    private imagePath: string;
    private image?: CanvasImageSource;
    private destroyed: boolean;

    constructor(game: Game, data: HealsItem) {
        this.game = game;
        this.data = data;

        this.imagePath = this.data.image;
        this.image = this.game.loadImage(this.imagePath);
        this.destroyed = false
    }

    private addPoint(player: Player): void {
        if (this.data.type === 'AP' && player.armorPoints === 0) {
            player.armorPoints = 1;
            this.game.eventBus.emit('update');
            this.destroyed = true;
        }

        if (this.data.type === 'HP' && player.healPoints !== player.maxHealPoints) {
            player.healPoints += 1;
            this.game.eventBus.emit('update');
            this.destroyed = true;
        }
    }

    protected collision(block: PosAndSize): boolean {
        return (
            this.data.y + this.data.height >= block.y &&
            this.data.y <= block.y + block.height &&
            this.data.x <= block.x + block.width &&
            this.data.x + this.data.width >= block.x
        )
    }

    public draw(): void {
        if (!this.image || this.destroyed) {
            return;
        }

        this.game.ctx.drawImage(this.image, this.data.x, this.data.y, this.data.width, this.data.height);
    }

    public update(): void {
        if (this.destroyed) {
            return
        }

        this.game.players.forEach(player => {
            if (this.collision({ ...player.position, ...player.size })) {
                this.addPoint(player);
            }
        });
    }
}
