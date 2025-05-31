import { Actor, Label, Font, Color, Vector, FontUnit } from "excalibur";

export class UI extends Actor {
    constructor(player, scoreTracker, highScoreTracker, playerLivesTracker) {
        super({
            x: 0,
            y: 0,
            z: 100
        })

        this.player = player;
        this.scoreTracker = scoreTracker;
        this.highScoreTracker = highScoreTracker;
        this.playerLivesTracker = playerLivesTracker;
        this.playerLivesLabel = undefined;
    }

    onInitialize(engine) {
        const font = new Font({
            family: 'Arial',
            size: 24,
            unit: FontUnit.Px,
            color: Color.Blue
        });

        this.scoreLabel = new Label({
            text: `Score: 0`,
            pos: new Vector(20, 20),
            font: font
        });

        this.highScoreLabel = new Label({
            text: `High Score: ${this.highScoreTracker?.score ?? 0}`,
            pos: new Vector(20, 45),
            font: font
        });

        this.addChild(this.scoreLabel);
        this.addChild(this.highScoreLabel);
        this.addChild(this.player);

    }

    onPreUpdate() {
        if (!this.scoreTracker || !this.highScoreTracker || !this.playerLivesTracker) return;

        // @ts-ignore
        this.scoreLabel.text = `Score: ${this.scoreTracker.score}`;
        // @ts-ignore
        this.highScoreLabel.text = `High Score: ${this.highScoreTracker.score}`;
        this.playerLivesLabel.text = `Lives: ${this.playerLivesTracker.lives}`;
    }
}
