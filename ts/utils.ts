import { Color } from "./color.js";
import { GameObject } from "./game_object.js";
import { Renderer } from "./renderer.js";
import * as PrimitiveShapes from "./primitive_shapes/primitive_shapes.js"

class Utils{
    constructor(){
        throw new Error("Cannot be instantiated");
    }

    public static randomRgbColor(): Color{
        const r: number = Math.random() * 255;
        const g: number = Math.random() * 255;
        const b: number = Math.random() * 255;
        return new Color(r, g, b);
    }

    public static randomShape(): typeof Renderer{
        const index = Math.floor(Math.random() * 3);
        switch(index){
            case 0:
                return PrimitiveShapes.Pentagon
            case 1:
                return PrimitiveShapes.Square;
            case 2:
                return PrimitiveShapes.Triangle;
            default:
                throw new Error("This really shouldn't happen");
        }
    }
}

export { Utils };