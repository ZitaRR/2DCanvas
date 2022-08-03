import { Utils } from "./utils.js";
import { Vector2 } from "./vector2.js";
class Component {
    constructor(vector, color, ...vertices) {
        this.vector = vector;
        this.vertices = vertices;
        this.color = color || Utils.randomRgbColor();
        this.angle = 0;
    }
    get centroid() {
        let centroid = new Vector2(0, 0);
        for (let i = 0; i < this.vertices.length; i++) {
            centroid.x += this.vertices[i].x;
            centroid.y += this.vertices[i].y;
        }
        centroid.x /= this.vertices.length;
        centroid.y /= this.vertices.length;
        return centroid;
    }
    draw(context) {
        context.save();
        context.beginPath();
        context.translate(this.vector.x, this.vector.y);
        context.rotate(this.angle * Math.PI / 180);
        context.strokeStyle = this.color.toString();
        for (let i = 0; i <= this.vertices.length; i++) {
            const position = this.vertices[i % this.vertices.length];
            if (!position) {
                break;
            }
            context.lineTo(position.x, position.y);
        }
        context.closePath();
        context.stroke();
        context.restore();
    }
    rotate(angle) {
        this.angle += angle;
    }
    move(x, y) {
        this.vector.x += x;
        this.vector.y += y;
    }
}
export { Component };
