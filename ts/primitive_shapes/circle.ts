import { Component } from "../component.js";
import { Vector2 } from "../vector2.js";

class Circle extends Component{
    public readonly radius: number;

    constructor(vector: Vector2, diameter: number){
        super(vector);
        this.radius = diameter / 2;
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.save();

        context.translate(this.vector.x, this.vector.y);
        context.rotate(this.angle * Math.PI / 180);

        context.beginPath();
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();

        context.restore();
    }
}

export { Circle };