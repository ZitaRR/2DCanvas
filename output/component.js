import { Utils } from "./utils.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";
class Component {
    constructor(vector, size, color) {
        this.vector = vector;
        this.size = size;
        this.color = color || Utils.randomRgbColor();
        this.angle = 0;
    }
    get center() {
        return new Vector2(this.vector.x - this.size.x / 2, this.vector.y - this.size.y / 2);
    }
    get localCenter() {
        return new Vector2(-(this.size.x / 2), -(this.size.y / 2));
    }
    get top() {
        return new Vector2(this.center.x, this.center.y - this.size.y / 2);
    }
    get right() {
        return new Vector2(this.center.x + this.size.x / 2, this.center.y);
    }
    get bottom() {
        return new Vector2(this.center.x, this.center.y + this.size.y / 2);
    }
    get left() {
        return new Vector2(this.center.x - this.size.x / 2, this.center.y);
    }
    draw(context) {
        context.save();
        context.translate(this.vector.x, this.vector.y);
        context.rotate(this.angle * Math.PI / 360);
        context.fillStyle = this.color.toString();
        context.fillRect(this.localCenter.x, this.localCenter.y, this.size.x, this.size.y);
        context.restore();
    }
    rotate(angle) {
        this.angle += angle;
    }
    move(x, y) {
        this.vector.x += x;
        this.vector.y += y;
        if (this.top.y > Window.height) {
            this.vector.y = 0 - this.size.y / 2;
        }
        else if (this.left.x > Window.width) {
            this.vector.x = 0 - this.size.x / 2;
        }
    }
}
export { Component };
