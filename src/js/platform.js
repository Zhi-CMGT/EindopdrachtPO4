import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "./resources";

export class Platform extends Actor {

    constructor(x, y, width = 300, height = 150) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed,

        });

    }

    onInitialize(engine) {
        this.graphics.use(Resources.Platform.toSprite());
        this.scale = new Vector(0.5, 0.35);
        this.collider.set(Shape.Box(this.width, this.height, Vector.Half, new Vector(0, -15)));


    }
}
