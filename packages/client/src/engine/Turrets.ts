import { Bullet } from './Bullet';
import { Game } from './Game';
import { TurretsItem } from './interfaces'

export class Turrets {
    private game: Game;
    private data: TurretsItem;
    private bullet: Bullet;
    private time: number;
    private delay: number;
    private imagePath: string;
    private imagePathBullet: string;
    private image?: CanvasImageSource;
    private imageBullet?: CanvasImageSource;

    constructor(game: Game, data: TurretsItem) {
        this.game = game;
        this.data = data;
        this.time = new Date().getTime();
        this.delay = 1200;
        this.imagePath = this.data.image;
        this.image = this.game.loadImage(this.imagePath);
        this.imagePathBullet = this.data.bullet.image;
        this.imageBullet = this.game.loadImage(this.imagePathBullet);
        this.bullet = new Bullet(this.game, this.data, this.imageBullet);
    }

    public draw(): void {
        if (!this.image) {
            return;
        }

        this.game.ctx.drawImage(this.image, this.data.x, this.data.y, this.data.width, this.data.height);

        this.bullet.draw();
    }

    public update(): void {
        if (!this.game.closeToScope(this.data.x, this.data.y)) {
            return;
        }

        const now = new Date().getTime();

        if (this.time + this.delay < now) {
            this.bullet = new Bullet(this.game, this.data, this.imageBullet);
            this.time = now;
        }

        this.bullet.update();
    }
}
