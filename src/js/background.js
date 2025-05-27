import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Background extends Actor {

    constructor(x,y, screenWidth, screenHeight) {
        super({
            x,y,
            anchor: new Vector(0, 0),
            width: screenWidth,
            height: screenHeight,
        });

        this.graphics.use(Resources.Background.toSprite());
    }
}