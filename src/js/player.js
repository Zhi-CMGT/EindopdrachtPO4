import { Actor, CollisionType, Color, DegreeOfFreedom, Font, Label, Shape, Vector } from "excalibur";
import { Resources } from "./resources";
import { Platform } from "./platform";
import { Obstacle } from "./obstacle";

export class player extends Actor {

    constructor(leftKey, rightKey, upKey, downKey, sprite, startPos, playerNumber) {

        super({
            pos: startPos,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Active,
            collider: Shape.Box(100, 170, Vector.Half, new Vector(0, 0)),
        }
        )

        this.graphics.use(sprite);

        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey;
        this.downKey = downKey;
        this.speed = 200;

        this.health = 3;        

    }

    onInitialize(engine) {
        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.on("collisionstart", (event) => this.handleCollision(event));

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
            this.vel.y = -480;
        }

        this.vel.x = xspeed;
    }

    handleCollision(event) {
        if (event.other instanceof Obstacle) {
            event.other.kill();

        }
    }
}