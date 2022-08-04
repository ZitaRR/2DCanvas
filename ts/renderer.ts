import { Color } from "./color.js";
import { GameObject } from "./game_object.js";
import { Game } from "./game.js";
import { Utils } from "./utils.js";
import { Vector2 } from "./vector2.js";
import { Component } from "./component.js";

class Renderer extends Component{
    protected vertices: Vector2[];
    protected color: Color;
    protected readonly context: CanvasRenderingContext2D;

    constructor(object: GameObject, color?: Color, ...vertices: Vector2[]){
        super(object);
        this.vertices = vertices;
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
        this.context.rotate(this.object.angle * Math.PI / 180);
        this.context.strokeStyle = this.color.toString();
        this.context.beginPath();

        for(let i = 0; i < this.vertices.length; i++){
            const position: Vector2 = this.vertices[i % this.vertices.length];
            if(!position){
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