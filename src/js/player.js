import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {

    constructor(leftKey, rightKey, upKey, downKey) {

        leftKey;
        rightKey;
        upKey;
        downKey;

        super({
            width: Resources.Player1.width,
            height: Resources.Player1.height,
        })

        this.sprite = Resources.player1.toSprite();
        this.graphics.use(this.sprite);

        this.pos = new Vector(100, 100);
        
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey; 
        this.downKey = downKey;
        this.speed = undefined;
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
         if (engine.input.keyboard.isHeld(this.leftKey)) {
            xspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.rightKey)) {
            xspeed = this.speed;
        }

        if (engine.input.keyboard.isHeld(this.upKey)) {
            yspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.downKey)) {
            yspeed = this.speed;
        }

        this.vel = new Vector(xspeed, yspeed);
    }
}