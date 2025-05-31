import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "./resources";

export class Obstacle extends Actor {

    constructor(x, y, width, height) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Obstacle.toSprite());
        this.scale = new Vector(0.15, 0.15);
        this.collider.set(Shape.Box(200, 350, Vector.Half, new Vector(0, 0)));

    }
}