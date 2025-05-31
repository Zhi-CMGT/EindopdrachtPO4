import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "./resources";
import { player } from "./player";

export class Point extends Actor {

    constructor(x, y, width, height) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Passive,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Point.toSprite());
        this.scale = new Vector(0.09, 0.09);

        this.collider.set(Shape.Box(200, 350, Vector.Half, new Vector(0, 0)));

    }
}