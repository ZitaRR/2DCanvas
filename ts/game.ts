import { GameObject } from "./game_object.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";
import * as PrimitiveShapes from "./primitive_shapes/primitive_shapes.js"
import { Utils } from "./utils.js";
import { Renderer } from "./renderer.js";
import { Color } from "./color.js";

class Game{
    public static get instance(): Game{
        return this._instance;
    }

    private static _instance: Game;

    public get context(){
        return this._context;
    }

    private last: Date = new Date();
    private now: Date = new Date();
    private filter: number = 50;
    private frames: number = 0;
    private objects: GameObject[] = [];
    private readonly _context: CanvasRenderingContext2D;

    constructor(){
        if(Game.instance){
            throw new Error("Game has already been instantiated");
        }

        Game._instance = this;
        this._context = Window.initialize(this);

        this.filter = 50;
        this.frames = 0;
        this.context.lineWidth = 5;

        this.start();
    }

    public start(): void{
        this.objects.push(new GameObject(new Vector2(100, 100), new Vector2(50, 50), 0, PrimitiveShapes.Square));
        this.objects.push(new GameObject(new Vector2(200, 100), new Vector2(50, 50), 0, PrimitiveShapes.Triangle));
        this.objects.push(new GameObject(new Vector2(300, 100), new Vector2(50, 50), 0, PrimitiveShapes.Pentagon));
        this.objects.push(new GameObject(new Vector2(400, 100), new Vector2(50, 50), 0, PrimitiveShapes.Circle));

        setTimeout(() => this.draw(), 100);
    }

    public draw(): void{
        const now: number = (this.now = new Date()).getTime();
        const last: number = this.last.getTime();
        const frame: number = 1000 / (now - last);

        if(now !== last){
            this.frames += (frame - this.frames) / this.filter;
            this.last = this.now;
        }

        this.context.clearRect(0, 0, Window.width, Window.height);

        for(let i in this.objects){
            const object: GameObject = this.objects[i];
            object.rotate(1);
            object.move(1, 0);
            object.update();
        }

        setTimeout(() => this.draw(), 1);
    }

    public instantiate(comp: GameObject): void{
        this.objects.push(comp);
    }

    public instantiateRandom(position?: Vector2): void{
        position ??= new Vector2(Math.random() * Window.width, Math.random() * Window.height);
        const scale: Vector2 = new Vector2(Math.random() * 300, Math.random() * 300);
        const angle: number =  Math.random() * 360;
        const shape: typeof Renderer = Utils.randomShape();
        this.instantiate(new GameObject(position, scale, angle, shape));
    }
}

export { Game };