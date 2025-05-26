import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const player1 = new Player(Keys.Left, Keys.Right, Keys.Up, Keys.Down);
        this.add(player1);

        player1.events.on("exitviewport", (e) => this.fishLeft(e))
    }

    fishLeft(e) {
        e.target.pos = new Vector(1350, 300)
    }
}

new Game()
