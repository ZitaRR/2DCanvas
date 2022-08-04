import { GameObject } from "../game_object.js";
import { Renderer } from "../renderer.js";
import { Vector2 } from "../vector2.js";

class Pentagon extends Renderer{
    public readonly radius: number;

    constructor(object: GameObject){
        const radius: number = object.size / 2;
        super(object, undefined, 
            new Vector2(0, -radius),
            new Vector2(radius, -(radius * .15)),
            new Vector2(radius - radius * .35, radius),
            new Vector2(-radius + radius * .35, radius),
            new Vector2(-radius, -(radius * .15)));
        this.radius = radius;
    }
}

export { Pentagon };