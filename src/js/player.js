import { Actor, CollisionType, DegreeOfFreedom, Shape, Vector } from "excalibur";
import { Resources } from "./resources";

export class player extends Actor {

    constructor(leftKey, rightKey, upKey, downKey, sprite, startPos) {

        super({
            pos: startPos,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Active,
        }
        )

        this.graphics.use(sprite);

        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey; 
        this.downKey = downKey;
        this.speed = 200;
    }

    onInitialize(engine) {
        this.body.useGravity = true;
        this.body.collisionType = CollisionType.Active;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

    }

    onPreUpdate(engine) {
        let xspeed = 0;

         if (engine.input.keyboard.isHeld(this.leftKey)) {
            xspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.rightKey)) {
            xspeed = this.speed;
        }

        if (engine.input.keyboard.wasPressed(this.upKey)) {
            this.vel.y = -500;
        }

        this.vel.x = xspeed;
    }
}