import { Actor, Label, Font, Color, Vector, FontUnit } from "excalibur";

export class UI extends Actor {

    scoreLabel;
    highScoreLabel;
    livesLabel;

    constructor(players, scoreTracker, highScoreTracker, playerLivesTracker) {
        super({
            x: 0,
            y: 0,
            z: 100
        });

        this.player1 = this.player1;
        this.player2 = this.player2;
        this.scoreTracker = scoreTracker ?? { score: 0 };
        this.highScoreTracker = highScoreTracker ?? { highScore: 0 };
        this.playerLivesTracker = playerLivesTracker ?? { playerLives: 3 };
    }

    onInitialize(engine) {
        const font = new Font({
            family: 'Arial',
            size: 24,
            unit: FontUnit.Px,
            color: Color.Blue
        });

        this.scoreLabel = new Label({
            text: `Score: ${this.scoreTracker.score}`,
            pos: new Vector(20, 20),
            font: font
        });

        this.highScoreLabel = new Label({
            text: `High Score: ${this.highScoreTracker.highScore}`,
            pos: new Vector(20, 45),
            font: font
        });

        this.livesLabel = new Label({
            text: `Lives: ${this.playerLivesTracker.playerLives}`,
            pos: new Vector(20, 70),
            font: font
        });

        this.addChild(this.scoreLabel);
        this.addChild(this.highScoreLabel);
        this.addChild(this.livesLabel);
    }

    updateScore() {
        if (!this.scoreTracker || !this.highScoreTracker || !this.playerLivesTracker) {
            return;
        }
        
        this.scoreLabel.text = `Score: ${this.scoreTracker.score ?? 0}`;
        this.highScoreLabel.text = `High Score: ${this.highScoreTracker.highScore ?? 0}`;
        this.livesLabel.text = `Lives: ${this.playerLivesTracker.playerLives ?? 3}`;    }
}
