import { Actor } from "excalibur";
import { Resources } from "./resources";

export class Background extends Actor {

    constructor() {
        super({
            width: Resources.Background.width,
            height: Resources.Background.height,
        });

        this.graphics.use(Resources.Background.toSprite());
    }
}