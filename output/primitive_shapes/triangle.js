import { Renderer } from "../renderer.js";
import { Vector2 } from "../vector2.js";
class Triangle extends Renderer {
    constructor(object) {
        super(object, undefined, new Vector2(0, -(object.scale.y / 2)), new Vector2(object.scale.x / 2, object.scale.y / 2), new Vector2(-(object.scale.x / 2), object.scale.y / 2));
    }
}
export { Triangle };
