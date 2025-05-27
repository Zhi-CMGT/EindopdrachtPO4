import { Actor, CollisionType } from "excalibur";
import { Resources } from "./resources";

export class StartPlatform extends Actor {

    constructor(x, y) {

        super({
            x, y,
            width: 100,
            height: 50,

        })

        this.graphics.use(Resources.Platform.toSprite());
    }

      onInitialize(engine) {
    this.body.collisionType = CollisionType.Fixed;
}
}