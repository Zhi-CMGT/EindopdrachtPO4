import '../css/style.css'
// @ts-ignore
import { Actor, Engine, DisplayMode, Keys, Resource, Vector, SolverStrategy } from "excalibur"
import { ResourceLoader, Resources } from './resources.js'
import { player } from './player.js'
import { Background } from './background.js'
import { Platform } from './platform.js'

export class Game extends Engine {

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

        this.start(ResourceLoader).then(() => this.startGame())
    }



    startGame() {
        console.log("start de game!")

        const background = new Background();
        this.add(background);

        this.add(new Platform(150, 700, 300, 150));
        this.add(new Platform(1100, 700, 300, 150));
        this.add(new Platform(350, 600, 300, 150));
        this.add(new Platform(220, 450, 300, 150));
        this.add(new Platform(580, 500, 300, 150));
        this.add(new Platform(880, 600, 300, 150));
        this.add(new Platform(1100, 480, 300, 150));
        this.add(new Platform(1100, 700, 300, 150));


        const player1 = new player(
            Keys.Left,
            Keys.Right,
            Keys.Up,
            Keys.Down,
            Resources.Player1.toSprite(),
            new Vector(110, 550)
        );
        this.add(player1);

        const player2 = new player(
            Keys.A,
            Keys.D,
            Keys.W,
            Keys.S,
            Resources.Player2.toSprite(),
            new Vector(1100, 550)
        );
        this.add(player2);

        // player1.events.on("exitviewport", (e) => this.fishLeft(e))
    }

}

new Game()
