import { Actor, Keys, Vector } from "excalibur";
import { Resources } from "./resources";

export class player extends Actor {

    constructor(A, D, W, S) {

        Keys.A;
        Keys.D;
        Keys.W;
        Keys.S;

        super()

        this.sprite = Resources.Player1.toSprite();
        this.graphics.use(this.sprite);

        this.pos = new Vector(60, 600);
        this.scale = new Vector(0.5, 0.5);
        
        this.Keys = {
            A: Keys.A,
            D: Keys.D,
            W: Keys.W,
            S: Keys.S
        };
        this.speed = 200;
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
         if (engine.input.keyboard.isHeld(this.Keys.A)) {
            xspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.Keys.D)) {
            xspeed = this.speed;
        }

        if (engine.input.keyboard.isHeld(this.Keys.W)) {
            yspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.Keys.S)) {
            yspeed = this.speed;
        }

        this.vel = new Vector(xspeed, yspeed);
    }
}