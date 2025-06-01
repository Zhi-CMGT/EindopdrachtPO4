import { Actor, CollisionType, DegreeOfFreedom, Shape, Side, Vector } from "excalibur";
import { Obstacle } from "./obstacle";
import { Point } from "./point";
import { Portal } from "./portal";

export class Player extends Actor {

    score = 0;
    health = 3;
    #leftKey;
    #rightKey;
    #upKey;
    #downKey;
    #isGrounded = false;
    #speed = 200;

    constructor(leftKey, rightKey, upKey, downKey, sprite, startPos) {
        super({
            pos: startPos,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Active,
            collider: Shape.Box(100, 170, Vector.Half, new Vector(0, 0)),
        });

        this.graphics.use(sprite);

        this.#leftKey = leftKey;
        this.#rightKey = rightKey;
        this.#upKey = upKey;
        this.#downKey = downKey;
    }

    onInitialize(engine) {
        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        this.on("collisionstart", (event) => {
            this.handleCollision(event);

            if (event.side === Side.Bottom) {
                this.isGrounded = true;
            }
        });

        this.on("collisionend", (event) => {
            if (event.side === Side.Bottom) {
                this.isGrounded = false;
            }
        });
    }

    onPreUpdate(engine) {
        let xspeed = 0;

        if (engine.input.keyboard.isHeld(this.#leftKey)) {
            xspeed = -this.#speed;
        }
        if (engine.input.keyboard.isHeld(this.#rightKey)) {
            xspeed = this.#speed;
        }

        if (engine.input.keyboard.wasPressed(this.#upKey) && this.isGrounded) {
            this.vel.y = -480;
            this.isGrounded = false;
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
            // @ts-ignore
            this.scene.engine.collectedPoints++;
        }

        if (e.other.owner instanceof Portal) {
            e.other.owner.hit();

            // @ts-ignore
            if (this.scene?.engine.collectedPoints >= this.scene?.engine.totalPoints) {
                // @ts-ignore
                this.scene?.engine.gameCompleted();
            }
        }
    }
}
