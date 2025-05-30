import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "./resources";

export class Platform extends Actor {

    constructor(x, y, width, height) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed,

        })

        const sprite = Resources.Platform.toSprite();
        sprite.scale = new Vector(width / sprite.width, height / sprite.height); // Schaal de sprite
        this.graphics.use(sprite);
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;
        this.collider.set(Shape.Box(this.width, this.height));
    }
}