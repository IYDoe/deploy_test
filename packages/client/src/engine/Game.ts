import { EventBus } from '../utils/EventBus';
import { Player } from './Player';
import { Control } from './Control';
import { Map } from './Map';
import { Eric } from './players/Eric';
import { Baleog } from './players/Baleog';
import { Olaf } from './players/Olaf';
import { FrameSettings, LvlData, Size, Players, PosAndSize } from './interfaces';
import { Turrets } from './Turrets';
import { Enemy } from './Enemy';
import { Heals } from './Heals';

export class Game {
    public size: Size;
    public screen: Size;
    public ctx: CanvasRenderingContext2D;
    public map: Map;
    public eventBus: EventBus;
    public activePlayer: Player;
    public currentLvl: LvlData;
    public players: Player[];
    public turrets: Turrets[];
    public enemies: Enemy[];
    public heals: Heals[];
    private control: Control;
    public finishArea: PosAndSize;
    private currentLvlIndex: number;
    private activePlayerIndex: number;
    private drawnOnce: boolean;
    private lvlBackground?: CanvasImageSource;
    private prevPlayer: Player;
    private needChangePlayer: 'next' | 'prev' | null;
    private gameOver: boolean;
    public frameSettings: FrameSettings;

    constructor(ctx: CanvasRenderingContext2D, lvls: LvlData[]) {
        this.ctx = ctx;

        this.currentLvlIndex = 0;
        this.currentLvl = lvls[this.currentLvlIndex];

        this.size = {
            width: this.currentLvl?.size.width,
            height: this.currentLvl?.size.height,
        }

        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.eventBus = new EventBus();
        this.control = new Control(this);
        this.map = new Map(this, this.currentLvl);

        this.players = [
            new Eric(this, {
                x: this.currentLvl?.playersPosition.eric.x,
                y: this.currentLvl?.playersPosition.eric.y
            }),
            new Baleog(this, {
                x: this.currentLvl?.playersPosition.baleog.x,
                y: this.currentLvl?.playersPosition.baleog.y
            }),
            new Olaf(this, {
                x: this.currentLvl?.playersPosition.olaf.x,
                y: this.currentLvl?.playersPosition.olaf.y
            })
        ];

        this.prevPlayer = this.players[0];

        this.turrets = [];
        this.enemies = [];
        this.heals = [];

        this.activePlayerIndex = 0;
        this.activePlayer = this.players[this.activePlayerIndex];

        this.drawnOnce = false;
        this.gameOver = false;

        this.needChangePlayer = null;

        this.currentLvl?.turrets.forEach(item => {
            this.turrets.push(new Turrets(this, item));
        });

        this.currentLvl?.enemies.forEach(item => {
            this.enemies.push(new Enemy(this, item));
        });

        this.currentLvl?.heals.forEach(item => {
            this.heals.push(new Heals(this, item));
        });

        this.frameSettings = {
            delay: 0,
            interval: 1000 / 20,
            timer: 0
        }

        this.finishArea = this.currentLvl?.finishArea;

        this.addEvents();
    }

    public getStartPointX(name?: keyof Players<unknown>): number {
        if (!name) {
            return 0;
        }

        return this.currentLvl?.startPoint[name].x - window.innerWidth > 0 ? this.currentLvl.startPoint[name].x - window.innerWidth : 0;
    }

    public getStartPointY(name?: keyof Players<unknown>): number {
        if (!name) {
            return 0;
        }

        return this.currentLvl?.startPoint[name].y - window.innerHeight > 0 ? this.currentLvl.startPoint[name].y - window.innerHeight : 0;
    }

    public closeToScope(x: number, y: number): boolean {
        return this.activePlayer.screen.x + this.screen.width > x - this.screen.width / 2 &&
        this.activePlayer.screen.y + this.screen.height > y - this.screen.height / 2;
    }

    private addEvents(): void {
        this.eventBus.on('moveCameraX', (speed: number) => {
            this.moveCamera(speed, 'x');
        });

        this.eventBus.on('moveCameraY', (speed: number) => {
            this.moveCamera(speed, 'y');
        });

        this.eventBus.on('prevPlayer', () => {
            this.needChangePlayer = 'prev';
            this.prevPlayer = this.activePlayer;
            this.prevPlayerIndex();
        });

        this.eventBus.on('nextPlayer', () => {
            this.needChangePlayer = 'next';
            this.prevPlayer = this.activePlayer;
            this.nextPlayerIndex();
        });
    }

    private prevPlayerIndex(): void {
        this.activePlayerIndex = this.activePlayerIndex - 1 < 0 ? this.players.length - 1 : this.activePlayerIndex - 1;
    }

    private nextPlayerIndex(): void {
        this.activePlayerIndex = this.activePlayerIndex + 1 > this.players.length - 1 ? 0 : this.activePlayerIndex + 1;
    }

    private moveCamera(speed: number, axis: 'x' | 'y') {
        speed = -speed;
        this.activePlayer.screen[axis] -= speed;
        this.ctx.translate(axis === 'x' ? speed : 0, axis === 'y' ? speed : 0);
    }

    private changePlayer(): void {
        this.activePlayer = this.players[this.activePlayerIndex];

        if (this.activePlayer.isDead) {
            if (this.needChangePlayer === 'next') {
                this.nextPlayerIndex();
            } else if (this.needChangePlayer === 'prev') {
                this.prevPlayerIndex();
            }

        } else {
            this.ctx.translate(this.prevPlayer.screen.x - this.activePlayer.screen.x, this.prevPlayer.screen.y - this.activePlayer.screen.y);
            this.needChangePlayer = null;
            this.eventBus.emit('update');
        }

        if (this.players.every(e => e.isDead)) {
            this.gameOver = true;
        }
    }

    public update(): void {
        this.finishLevel();

        if (this.gameOver) {
            this.eventBus.emit('gameOver');

            return;
        }

        if (this.needChangePlayer) {
            this.changePlayer();
        }

        this.heals.forEach(heal => {
            heal.update();
        });

        this.players.forEach(player => {
            player.update();
        });

        this.turrets.forEach(turret => {
            turret.update();
        });

        this.enemies.forEach(enemy => {
            enemy.update();
        });

        this.control.gamePadContol();
    }

    public loadImage(path: string): CanvasImageSource | undefined {
        if (!path) {
            return;
        }

        const image = new Image();

        image.src = path;

        return image;
    }

    private firstDraw(): void {
        this.ctx.translate(-this.activePlayer.screen.x, -this.activePlayer.screen.y);
        this.drawnOnce = true;
    }

    private finishLevel(): void {
        const canFinish = this.players.every(player => player.canFinish || player.isDead);

        if (canFinish) {
            const isAnbDead = this.players.some(player => player.isDead);
            this.eventBus.emit('finishLvl', isAnbDead);
        }
    }

    public draw(delay: number): void {
        this.frameSettings.delay = delay;
        this.ctx.clearRect(this.activePlayer.screen.x, this.activePlayer.screen.y, this.screen.width, this.screen.height);

        if (!this.lvlBackground && this.currentLvl.background) {
            this.lvlBackground = this.loadImage(this.currentLvl.background);

            return;
        }

        if (this.lvlBackground) {
            this.ctx.drawImage(this.lvlBackground, 0, 0, this.size.width, this.size.height, 0, 0, this.size.width, this.size.height);
        }

        if (!this.drawnOnce) {
            this.firstDraw();
        }

        this.map.draw();

        this.players.forEach(player => {
            player.draw();
        });

        this.turrets.forEach(turret => {
            turret.draw();
        });

        this.enemies.forEach(enemy => {
            enemy.draw();
        });

        this.heals.forEach(heal => {
            heal.draw();
        });

        this.update();
    }
}
