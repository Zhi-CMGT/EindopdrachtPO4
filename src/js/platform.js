import { Actor, CollisionType } from "excalibur";
import { Resources } from "./resources";

export class platform extends Actor {

  constructor(x, y,) {

    super({
        
    })

    this.graphics.use(Resources.Platform.toSprite());
  }


}