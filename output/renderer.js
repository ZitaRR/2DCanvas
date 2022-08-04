import { Game } from "./game.js";
import { Utils } from "./utils.js";
import { Component } from "./component.js";
class Renderer extends Component {
    constructor(object, color, ...vertices) {
        super(object);
        this.vertices = vertices;
        this.color = color || Utils.randomRgbColor();
        this.context = Game.instance.context;
    }
    run() {
        this.draw();
    }
    draw() {
        if (this.vertices.length == 0) {
            return;
        }
        this.context.save();
        this.context.translate(this.object.vector.x, this.object.vector.y);
        this.context.rotate(this.object.angle * Math.PI / 180);
        this.context.strokeStyle = this.color.toString();
        this.context.beginPath();
        for (let i = 0; i < this.vertices.length; i++) {
            const position = this.vertices[i % this.vertices.length];
            if (!position) {
                break;
            }
            this.context.lineTo(position.x, position.y);
        }
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }
}
export { Renderer };
