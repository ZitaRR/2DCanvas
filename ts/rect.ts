import { Vector2 } from "./vector2.js";

class Rect{
    public get center(): Vector2{
        return this._center;
    };

    public get min(): Vector2{
        return this._min;
    }

    public get max(): Vector2{
        return this._max;
    }

    public get width(): number{
        return this._width;
    }

    public get height(): number{
        return this._height;
    }

    private _center: Vector2;
    private _min: Vector2;
    private _max: Vector2;
    private _width: number;
    private _height: number;

    constructor(center: Vector2, width: number, height: number){
        this._center = center;
        this._width = width;
        this._height = height;

        this._min = new Vector2(this.center.x - width / 2, this.center.y - height / 2);
        this._max = new Vector2(this.center.x + width / 2, this.center.y + height / 2);
    }

    public draw(context: CanvasRenderingContext2D): void{
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