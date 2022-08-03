import { Color } from "./color.js";
import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";
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

    public static randomShape(vector: Vector2, size: number): Component{
        const index = Math.floor(Math.random() * 4);
        switch(index){
            case 0:
                return new PrimitiveShapes.Circle(vector, size);
            case 1:
                return new PrimitiveShapes.Square(vector, size);
            case 2:
                return new PrimitiveShapes.Triangle(vector, size, size);
            case 3:
                return new PrimitiveShapes.Pentagon(vector, size);
            default:
                throw new Error("This really shouldn't happen");
        }
    }
}

export { Utils };