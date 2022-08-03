import { Component } from "../component.js";
import { Vector2 } from "../vector2.js";

class Pentagon extends Component{
    public readonly radius: number;

    constructor(vector: Vector2, diameter: number){
        const radius: number = diameter / 2;
        super(vector, undefined, 
            new Vector2(0, -radius),
            new Vector2(radius, -(radius * .15)),
            new Vector2(radius - radius * .35, radius),
            new Vector2(-radius + radius * .35, radius),
            new Vector2(-radius, -(radius * .15)));
        this.radius = radius;
    }
}

export { Pentagon };