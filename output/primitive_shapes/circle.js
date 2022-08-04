import { Renderer } from "../renderer.js";
class Circle extends Renderer {
    constructor(object) {
        super(object);
        this.radius = object.scale.x / 2;
    }
    draw() {
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
