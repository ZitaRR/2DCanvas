import { Color } from "./color.js";
import { GameObject } from "./game_object.js";
import { Game } from "./game.js";
import { Utils } from "./utils.js";
import { Vector2 } from "./vector2.js";
import { Component } from "./component.js";

class Renderer extends Component{
    public get vertices(): Vector2[]{
        return this._vertices;
    }

    protected _vertices: Vector2[];
    protected color: Color;
    protected readonly context: CanvasRenderingContext2D;

    constructor(object: GameObject, color?: Color, ...vertices: Vector2[]){
        super(object);
        this._vertices = vertices;
        this.color = color || Utils.randomRgbColor();
        this.context = Game.instance.context;
    }

    public run(): void{
        this.draw();
    }

    protected draw(): void{
        if(this.vertices.length == 0){
            return;
        }

        this.context.save();

        this.context.translate(this.object.vector.x, this.object.vector.y);
        this.context.strokeStyle = this.color.toString();
        this.context.beginPath();

        for(let i = 0; i < this.vertices.length; i++){
            const position: Vector2 = this.vertices[i % this.vertices.length];
            if(!position){
                break;
            }

            const rotation: Vector2 = new Vector2(
                position.x * Math.cos(this.object.angle * (Math.PI / 180)) - position.y * Math.sin(this.object.angle * (Math.PI / 180)),
                position.x * Math.sin(this.object.angle * (Math.PI / 180)) + position.y * Math.cos(this.object.angle * (Math.PI / 180))
            );
            this.context.lineTo(rotation.x, rotation.y);
        }

        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }

    public centroid(): Vector2{
        const centroid = new Vector2();
        for(let i in this.vertices){
            centroid.add(this.vertices[i]);
        }
        return centroid.divide(this.vertices.length);
    }
}

export { Renderer };