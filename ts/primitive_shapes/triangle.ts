import { GameObject } from "../game_object.js";
import { Renderer } from "../renderer.js";
import { Vector2 } from "../vector2.js";

class Triangle extends Renderer{
    constructor(object: GameObject){
        super(object, undefined, 
            new Vector2(0, -(object.size / 2)),
            new Vector2(object.size / 2, object.size / 2),
            new Vector2(-(object.size / 2), object.size / 2));
    }
}

export { Triangle };