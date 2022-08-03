import { Component } from "./component.js";
class Circle extends Component {
    constructor(vector, radius) {
        super(vector);
        this.radius = radius;
    }
    draw(context) {
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
