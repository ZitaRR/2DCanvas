import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";

class GameObject{
    public get angle(){
        return this._angle;
    }

    public vector: Vector2;
    public scale: Vector2;

    protected _angle: number;
    protected components: Component[] = [];

    constructor(vector: Vector2, scale: Vector2, angle: number = 0, ...components: { new(object: GameObject): Component }[]){
        this.vector = vector;
        this.scale = scale;
        this._angle = angle;
        
        for(let i = 0; i < components.length; i++){
            this.components.push(new components[i](this));
        }
    }

    public update(): void{
        for(let i = 0; i < this.components.length; i++){
            this.components[i].run();
        }
    }

    public rotate(angle: number): void{
        this._angle += angle;
    }

    public move(x: number, y: number): void{
        this.vector.x += x;
        this.vector.y += y;
    }

    public addComponent<T extends Component>(type: { new(object: GameObject): T; }): Component{
        const component: T = new type(this);
        this.components.push(component);
        return component;
    }

    public getComponent<T extends Component>(type: { new(...args: any[]): T }): T | null{
        for(let i = 0; i < this.components.length; i++){
            const component: Component = this.components[i];
            if(component instanceof type){
                return component;
            }
        }
        return null;
    }

    public removeComponent<T extends Component>(type: { new(...args: any[]): T }): void{
        for(let i = 0; i < this.components.length; i++){
            const component: Component = this.components[i];
            if(component instanceof type){
                this.components.slice(i, 1);
                return;
            }
        }
    }
}

export { GameObject };