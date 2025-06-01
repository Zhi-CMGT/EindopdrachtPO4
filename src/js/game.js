import '../css/style.css'
import { Engine, DisplayMode, Keys, Vector, SolverStrategy, Label, Font, Color, TextAlign } from "excalibur"
import { ResourceLoader, Resources } from './resources.js'
import { Player } from './player.js'
import { Background } from './background.js'
import { Platform } from './platform.js'
import { Obstacle } from './obstacle.js'
import { StartPlatform } from './startPlatform.js'
import { Point } from './point.js'
import { UI } from './ui.js'
import { Portal } from './portal.js'

export class Game extends Engine {

    ui;
    scoreTracker;
    highScoreTracker;
    playerLivesTracker;
    totalPoints = 0;
    collectedPoints = 0;

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

        this.add(new Portal(180, 100));

        const player1 = new Player(
            Keys.Left,
            Keys.Right,
            Keys.Up,
            Keys.Down,
            Resources.Player1.toSprite(),
            new Vector(110, 600)
        );
        this.add(player1);

        const player2 = new Player(
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
        this.add(new StartPlatform(180, 200));

        this.add(new Platform(400, 600));
        this.add(new Platform(750, 600));

        this.add(new Platform(90, 470));
        this.add(new Platform(1050, 470));

        this.add(new Platform(650, 340));
        this.add(new Platform(1250, 340));

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

        const pointRows = [
            { x: 150, y: 500 },
            { x: 300, y: 300 },
            { x: 580, y: 450 },
            { x: 700, y: 150 },
            { x: 850, y: 350 },
            { x: 1100, y: 100 }
        ];

        const spacing = 50;
        const pointsPerRow = 4;

        pointRows.forEach(({ x, y }) => {
            for (let i = 0; i < pointsPerRow; i++) {
                this.add(new Point(x + (i * spacing), y));
                this.totalPoints++;
            }
        });

        this.scoreTracker = { score: 0 };
        this.highScoreTracker = { highScore: this.highScore };
        this.playerLivesTracker = { playerLives: this.playerLives };

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

        setTimeout(() => window.location.reload(), 200);
    }

    gameCompleted() {
        this.gameHasEnded = true;
        console.log("Game Completed!");

        const gameCompletedLabel = new Label({
            text: "Game Completed!",
            pos: new Vector(this.drawWidth / 2, this.drawHeight / 2 - 100),
            font: new Font({
                family: "Arial",
                size: 50,
                // @ts-ignore
                unit: "px",
                color: Color.White,
                textAlign: TextAlign.Center
            }),
            anchor: Vector.Half
        });

        const restartLabel = new Label({
            text: "Press R to Restart",
            pos: new Vector(this.drawWidth / 2, this.drawHeight / 2),
            font: new Font({
                family: "Arial",
                size: 30,
                // @ts-ignore
                unit: "px",
                color: Color.White,
                textAlign: TextAlign.Center
            }),
            anchor: Vector.Half
        });

        this.currentScene.add(gameCompletedLabel);
        this.currentScene.add(restartLabel);

        this.input.keyboard.on("press", (evt) => {
            if (evt.key === Keys.R) {
                window.location.reload();
            }
        });
    }
}

new Game();
