import { Renderer } from "../renderer.js";
import { Vector2 } from "../vector2.js";
class Square extends Renderer {
    constructor(object) {
        super(object, undefined, new Vector2(-(object.size / 2), -(object.size / 2)), new Vector2(object.size / 2, -(object.size / 2)), new Vector2(object.size / 2, object.size / 2), new Vector2(-(object.size / 2), object.size / 2));
    }
}
export { Square };
