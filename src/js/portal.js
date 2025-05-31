import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "./resources";

export class Portal extends Actor {

    constructor(x, y) {
        
        super({
            pos: new Vector(x, y),
            width: 50,
            height: 80,
            collisionType: CollisionType.Fixed,
        })
    }

    onInitialize() {
        this.graphics.use(Resources.Portal.toSprite());
        this.scale = new Vector(0.09, 0.09);

        this.collider.set(Shape.Box(200, 350, Vector.Half, new Vector(0, 0)));
    }

    // hit() {
    //     console.log("Game Cpmpleted!");
    // }
}