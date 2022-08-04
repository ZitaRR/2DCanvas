import { Color } from "./color.js";
import * as PrimitiveShapes from "./primitive_shapes/primitive_shapes.js";
class Utils {
    constructor() {
        throw new Error("Cannot be instantiated");
    }
    static randomRgbColor() {
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        return new Color(r, g, b);
    }
    static randomShape() {
        const index = Math.floor(Math.random() * 4);
        switch (index) {
            case 0:
                return PrimitiveShapes.Circle;
            case 1:
                return PrimitiveShapes.Square;
            case 2:
                return PrimitiveShapes.Triangle;
            case 3:
                return PrimitiveShapes.Pentagon;
            default:
                throw new Error("This really shouldn't happen");
        }
    }
}
export { Utils };
