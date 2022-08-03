import { Vector2 } from "./vector2.js";
class Rect {
    constructor(center, width, height) {
        this._center = center;
        this._width = width;
        this._height = height;
        this._min = new Vector2(this.center.x - width / 2, this.center.y - height / 2);
        this._max = new Vector2(this.center.x + width / 2, this.center.y + height / 2);
    }
    get center() {
        return this._center;
    }
    ;
    get min() {
        return this._min;
    }
    get max() {
        return this._max;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    draw(context) {
        context.moveTo(this.min.x, this.min.y);
        context.lineTo(this.min.x + this.width, this.min.y);
        context.moveTo(this.min.x + this.width, this.min.y);
        context.lineTo(this.max.x, this.max.y);
        context.moveTo(this.max.x, this.max.y);
        context.lineTo(this.max.x - this.width, this.max.y);
        context.moveTo(this.max.x - this.width, this.max.y);
        context.lineTo(this.min.x, this.min.y);
        context.stroke();
    }
}
export { Rect };
