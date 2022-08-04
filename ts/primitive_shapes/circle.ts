import { GameObject } from "../game_object.js";
import { Renderer } from "../renderer.js";

class Circle extends Renderer{
    public readonly radius: number;

    constructor(object: GameObject){
        super(object);
        this.radius = object.size / 2;
    }

    protected draw(): void {
        this.context.save();

        this.context.translate(this.object.vector.x, this.object.vector.y);
        this.context.rotate(this.object.angle * Math.PI / 180);

        this.context.beginPath();
        this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.stroke();

        this.context.restore();
    }
}

export { Circle };