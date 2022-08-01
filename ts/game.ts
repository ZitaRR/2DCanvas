import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";

class Game{
    public static get instance(): Game{
        return this._instance;
    }

    private static _instance: Game;

    private last: Date = new Date();
    private now: Date = new Date();
    private filter: number = 50;
    private frames: number = 0;
    private context: CanvasRenderingContext2D;
    private components: Component[] = [];

    constructor(){
        if(Game.instance){
            throw new Error("Game has already been instantiated");
        }

        Game._instance = this;
        Window.initialize(this);

        this.filter = 50;
        this.frames = 0;
        this.context = Window.context;

        this.start();
    }

    public start(): void{
        this.components.push(new Component(new Vector2(500, 50), new Vector2(100, 100)));
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

        for(let i in this.components){
            const comp: Component = this.components[i];
            comp.rotate(1);
            comp.move(5, 0);
            comp.draw(this.context);
        }

        setTimeout(() => this.draw(), 1);
    }

    public instantiate(comp: Component): void{
        this.components.push(comp);
    }
}

export { Game };