import { GameObject } from "./game_object.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";
import * as PrimitiveShapes from "./primitive_shapes/primitive_shapes.js"
import { Utils } from "./utils.js";
import { Renderer } from "./renderer.js";
import { Color } from "./color.js";
import { Collision } from "./collision.js";

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
    private player: GameObject | null = null;
    private readonly _context: CanvasRenderingContext2D;

    constructor(){
        if(Game.instance){
            throw new Error("Game has already been instantiated");
        }

        Game._instance = this;
        this._context = Window.initialize(this);

        this.filter = 50;
        this.frames = 0;
        this.context.lineWidth = 4;

        this.start();
    }

    public start(): void{
        this.objects.push(new GameObject(new Vector2(100, 100), new Vector2(50, 50), 0, PrimitiveShapes.Square));
        this.objects.push(new GameObject(new Vector2(151, 100), new Vector2(50, 50), 0, PrimitiveShapes.Triangle));
        this.objects.push(new GameObject(new Vector2(300, 100), new Vector2(50, 50), 0, PrimitiveShapes.Pentagon));

        this.player = this.objects[1];

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

        console.log(this.frames);
        this.context.clearRect(0, 0, Window.width, Window.height);
        let collision: boolean = false;

        for(let i = 0; i < this.objects.length; i++){
            const object: GameObject = this.objects[i];
            object.rotate(2);
            //object.move(1, 0);

            const current: Renderer | null = object.getComponent(Renderer);
            if(current){
                for(let j = 0; j < this.objects.length; j++){
                    const other: GameObject = this.objects[j];
                    if(object.isSame(other)){
                        continue; 
                    }

                    const renderer: Renderer | null = other.getComponent(Renderer);
                    if(!renderer){
                        continue;
                    }

                    collision = Collision.isColliding(current, renderer);
                    if(collision){
                        current.color = new Color(255, 0, 0);
                        renderer.color = new Color(255, 0, 0);
                        break;
                    }
                }
            }

            if(!collision && current){
                current.color = current.initailColor;
            }
            object.update();
        }

        setTimeout(() => this.draw(), 1);
    }

    public instantiate(comp: GameObject): void{
        this.objects.push(comp);
    }

    public instantiateRandom(position?: Vector2): void{
        position ??= new Vector2(Math.random() * Window.width, Math.random() * Window.height);
        const scale: Vector2 = new Vector2(Math.random() * 120, Math.random() * 120);
        const angle: number =  Math.random() * 360;
        const shape: typeof Renderer = Utils.randomShape();
        this.instantiate(new GameObject(position, scale, angle, shape));
    }

    public movePlayer(vector: Vector2): void{
        const step: number = 5;
        this.player?.move(vector.x * step, vector.y * step);
    }
}

export { Game };