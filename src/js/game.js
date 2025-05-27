import '../css/style.css'
import { Actor, Engine, DisplayMode, Keys } from "excalibur"
import { ResourceLoader } from './resources.js'
import { player } from './player.js'
import { Background } from './background.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
        this.canvasSize = undefined
    }

    startGame() {
        console.log("start de game!")

        const background = new Background();
        this.add(background);

        const player1 = new player(Keys.Left, Keys.Right, Keys.Up, Keys.Down);
        this.add(player1);

        const player2 = new player(Keys.A, Keys.D, Keys.W, Keys.S);
        this.add(player2);

        // player1.events.on("exitviewport", (e) => this.fishLeft(e))
    }
}

new Game()
