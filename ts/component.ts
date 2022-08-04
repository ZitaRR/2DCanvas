import { GameObject } from "./game_object"

abstract class Component{
    public readonly object: GameObject;

    constructor(object: GameObject){
        this.object = object;
    }
    
    abstract run(): void;
}

export { Component }