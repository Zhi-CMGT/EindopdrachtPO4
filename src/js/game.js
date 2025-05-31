import '../css/style.css'
import { Actor, Engine, DisplayMode, Keys, Vector, SolverStrategy, Label, Font, Color } from "excalibur"
import { ResourceLoader, Resources } from './resources.js'
import { player } from './player.js'
import { Background } from './background.js'
import { Platform } from './platform.js'
import { Obstacle } from './obstacle.js'
import { StartPlatform } from './startPlatform.js'
import { Point } from './point.js'
import { UI } from './ui.js'

export class Game extends Engine {

    ui;
    scoreTracker;
    highScoreTracker;
    playerLivesTracker;

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 800)
            }
        });

        this.highScore = (localStorage.getItem(`highScore`)) || 0;
        this.playerLives = (localStorage.getItem(`playerLives`)) || 3;
        this.gameHasEnded = false;
        this.players = [];

        this.start(ResourceLoader).then(() => this.startGame())
        
    }

    startGame() {
        console.log("start de game!")

        const background = new Background();
        this.add(background);


        this.scoreTracker = {score: 0};
        this.highScoreTracker = { highScore: this.highScore };
        this.playerLivesTracker = { playerLives: this.playerLives };

        const player1 = new player(
            Keys.Left,
            Keys.Right,
            Keys.Up,
            Keys.Down,
            Resources.Player1.toSprite(),
            new Vector(110, 600)
        );
        this.add(player1);

        const player2 = new player(
            Keys.A,
            Keys.D,
            Keys.W,
            Keys.S,
            Resources.Player2.toSprite(),
            new Vector(1100, 600)
        );
        this.add(player2);

        this.players.push(player1, player2);

        this.add(new StartPlatform(150, 700));
        this.add(new StartPlatform(1100, 700));

        this.add(new Platform(400, 600));
        this.add(new Platform(750, 600));

        this.add(new Platform(90, 470));
        this.add(new Platform(1050, 470));

        this.add(new Platform(650, 340));
        this.add(new Platform(1250, 340));

        this.add(new Platform(180, 200));
        this.add(new Platform(950, 220));

        this.add(new Platform(600, 120));


        for (let i = 0; i < 5; i++) {
            const platforms = this.currentScene.actors.filter(actor => actor instanceof Platform);

            const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

            const obstacleX = randomPlatform.pos.x + (Math.random() * (randomPlatform.width - 30));
            const obstacleY = randomPlatform.pos.y - 55;

            const obstacle = new Obstacle(obstacleX, obstacleY);
            this.add(obstacle);
        }

        for (let i = 0; i < 10; i++) {
            const pointX = Math.random() * this.drawWidth;
            const pointY = Math.random() * this.drawHeight;
            this.add(new Point(pointX, pointY));
        }

        this.ui = new UI(
            [player1, player2],
            this.scoreTracker,
            this.highScoreTracker,
            this.playerLivesTracker
        );
        this.add(this.ui);

        this.on("postupdate", () => {
            for (const player of this.players) {
                if (player.health <= 0 && !this.gameHasEnded) {
                    this.gameOver();
                }
            }
        });

        this.showDebug(true);
    }

    gameOver() {
        this.gameHasEnded = true;
        console.log("Game Over!");

        if (this.scoreTracker.score > this.highScore) {
            this.highScore = this.scoreTracker.score;
            localStorage.setItem(`highScore`, this.highScore.toString());
            this.highScoreTracker.highScore = this.highScore;
            console.log(`New high score: ${this.highScore}`);
        }

        setTimeout(() => window.location.reload(), 3000);
    }
}

new Game()