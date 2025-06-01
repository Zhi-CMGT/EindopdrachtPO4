import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "./resources";

export class Portal extends Actor {

    constructor(x, y, width, height) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed,
        })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Portal.toSprite());
        this.scale = new Vector(0.5, 0.5);
        this.collider.set(Shape.Box(150, 150, Vector.Half, new Vector(0, 10)));
    }

    hit() {
        this.actions.blink(this.width, this.height);
    }

}