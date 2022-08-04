import { GameObject } from "../game_object.js";
import { Renderer } from "../renderer.js";
import { Vector2 } from "../vector2.js";

class Square extends Renderer{
    constructor(object: GameObject){
        super(object, undefined,
            new Vector2(-(object.scale.x / 2), -(object.scale.y / 2)),
            new Vector2(object.scale.x / 2, -(object.scale.y / 2)),
            new Vector2(object.scale.x / 2, object.scale.y / 2),
            new Vector2(-(object.scale.x / 2), object.scale.y / 2));
    }
}

export { Square }