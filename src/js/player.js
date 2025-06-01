import { Actor, CollisionType, DegreeOfFreedom, Shape, Vector } from "excalibur";
import { Obstacle } from "./obstacle";
import { Point } from "./point";
import { Enemy } from "./enemy";

export class player extends Actor {

    score = 0;
    health = 3;

    constructor(leftKey, rightKey, upKey, downKey, sprite, startPos) {

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
    }

    // @ts-ignore
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

        if (this.pos.y > 720 && !engine.gameHasEnded) {
            this.health = 0;
        }
    }

    handleCollision(e) {
        if (e.other.owner instanceof Obstacle) {
            e.other.owner.hit();
            this.health--;
            // @ts-ignore
            this.scene?.engine.ui.updateLives(this.health);
        }

        if (e.other.owner instanceof Point) {
            e.other.owner.hit();
            this.score++;
            // @ts-ignore
            this.scene?.engine.ui.updateScore(this.score);
        }

        if (e.other.owner instanceof Enemy) {
            e.other.owner.kill();
            this.health--;
            // @ts-ignore
            this.scene?.engine.ui.updateLives(this.health);
        }
    }
}
