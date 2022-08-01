import { Color } from "./color.js";
import { Utils } from "./utils.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";

class Component{
    public get center(): Vector2{
        return new Vector2(this.vector.x - this.size.x / 2, this.vector.y - this.size.y / 2);
    }

    public get localCenter(): Vector2{
         return new Vector2(-(this.size.x / 2), -(this.size.y / 2));
    }

    public get top(): Vector2{
        return new Vector2(this.center.x, this.center.y - this.size.y / 2);
    }

    public get right(): Vector2{
        return new Vector2(this.center.x + this.size.x / 2, this.center.y);
    }

    public get bottom(): Vector2{
        return new Vector2(this.center.x, this.center.y + this.size.y / 2);
    }

    public get left(): Vector2{
        return new Vector2(this.center.x - this.size.x / 2, this.center.y);
    }

    public readonly vector: Vector2;
    public readonly size: Vector2;
    public color: Color;
    
    private angle: number;

    constructor(vector: Vector2, size: Vector2, color?: Color){
        this.vector = vector;
        this.size = size;
        this.color = color || Utils.randomRgbColor();
        this.angle = 0;
    }

    public draw(context: CanvasRenderingContext2D): void{
        context.save();
        context.translate(this.vector.x, this.vector.y);
        context.rotate(this.angle * Math.PI / 360);
        context.fillStyle = this.color.toString();
        context.fillRect(this.localCenter.x, this.localCenter.y, this.size.x, this.size.y);
        context.restore();
    }

    public rotate(angle: number): void{
        this.angle += angle;
    }

    public move(x: number, y: number): void{
        this.vector.x += x;
        this.vector.y += y;

        if(this.top.y > Window.height){
            this.vector.y = 0 - this.size.y / 2;
        }
        else if(this.left.x > Window.width){
            this.vector.x = 0 - this.size.x / 2;
        }
    }
}

export { Component };