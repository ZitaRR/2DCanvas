import { Color } from "./color.js";
import { Utils } from "./utils.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";

class Component{
    public get centroid() : Vector2{
        let centroid: Vector2 = new Vector2(0, 0);
        for(let i = 0; i < this.vertices.length; i++){
            centroid.x += this.vertices[i].x;
            centroid.y += this.vertices[i].y;
        }

        centroid.x /= this.vertices.length;
        centroid.y /= this.vertices.length;
        return centroid;
    }

    public readonly vector: Vector2;
    public color: Color;
    
    protected readonly vertices: Vector2[];
    protected angle: number;

    constructor(vector: Vector2, color?: Color, ...vertices : Vector2[]){
        this.vector = vector;
        this.vertices = vertices;
        this.color = color || Utils.randomRgbColor();
        this.angle = 0;
    }

    public draw(context: CanvasRenderingContext2D): void{
        context.save();
        context.beginPath();

        context.translate(this.vector.x, this.vector.y);
        context.rotate(this.angle * Math.PI / 180);
        context.strokeStyle = this.color.toString();
        
        for(let i = 0; i <= this.vertices.length; i++){
            const position: Vector2 = this.vertices[i % this.vertices.length];
            if(!position){
                break;
            }

            context.lineTo(position.x, position.y);
        }

        context.closePath();
        context.stroke();
        context.restore();
    }

    public rotate(angle: number): void{
        this.angle += angle;
    }

    public move(x: number, y: number): void{
        this.vector.x += x;
        this.vector.y += y;
    }
}

export { Component };