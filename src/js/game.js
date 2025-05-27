import '../css/style.css'
import { Actor, Engine, DisplayMode, Keys, Resource, Vector, SolverStrategy } from "excalibur"
import { ResourceLoader, Resources } from './resources.js'
import { player } from './player.js'
import { Background } from './background.js'
import { platform } from './platform.js'
import { StartPlatform } from './startPlatform.js'

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
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        const background = new Background();
        this.add(background);

        const player1 = new player(
            Keys.Left, 
            Keys.Right, 
            Keys.Up, 
            Keys.Down, 
            Resources.Player1.toSprite(),
            new Vector(60, 600)
        );
        this.add(player1);

        const player2 = new player(
            Keys.A, 
            Keys.D, 
            Keys.W, 
            Keys.S, 
            Resources.Player2.toSprite(),
            new Vector(1200, 600)
        );
        this.add(player2);

        this.add(new StartPlatform(100, 600));

        // player1.events.on("exitviewport", (e) => this.fishLeft(e))
    }
}

new Game()
