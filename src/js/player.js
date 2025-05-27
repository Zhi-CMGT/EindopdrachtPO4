import { Actor, CollisionType, DegreeOfFreedom, Vector } from "excalibur";
import { Resources } from "./resources";

export class player extends Actor {

    constructor(leftKey, rightKey, upKey, downKey, sprite, startPos) {

        leftKey;
        rightKey;
        upKey;
        downKey;

        super({
            pos: startPos,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Active,
        }
        )

        // this.sprite = Resources.Player1.toSprite();
        this.graphics.use(sprite);

        // this.pos = new Vector(60, 600);
        // this.scale = new Vector(0.5, 0.5);

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

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = 0;
         if (engine.input.keyboard.isHeld(this.leftKey)) {
            xspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.rightKey)) {
            xspeed = this.speed;
        }

        if (engine.input.keyboard.wasPressed(this.upKey)) {
            // @ts-ignore
            this.body.applyAngularImpulse(new Vector(0, -250 * delta))
            yspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.downKey)) {
            yspeed = this.speed;
        }

        this.vel = new Vector(xspeed, yspeed);
    }
}