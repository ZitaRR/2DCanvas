import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";
class Game {
    constructor() {
        this.last = new Date();
        this.now = new Date();
        this.filter = 50;
        this.frames = 0;
        this.components = [];
        if (Game.instance) {
            throw new Error("Game has already been instantiated");
        }
        Game._instance = this;
        Window.initialize(this);
        this.filter = 50;
        this.frames = 0;
        this.context = Window.context;
        this.start();
    }
    static get instance() {
        return this._instance;
    }
    start() {
        this.components.push(new Component(new Vector2(500, 50), new Vector2(100, 100)));
        setTimeout(() => this.draw(), 100);
    }
    draw() {
        const now = (this.now = new Date()).getTime();
        const last = this.last.getTime();
        const frame = 1000 / (now - last);
        if (now !== last) {
            this.frames += (frame - this.frames) / this.filter;
            this.last = this.now;
        }
        this.context.clearRect(0, 0, Window.width, Window.height);
        for (let i in this.components) {
            const comp = this.components[i];
            comp.rotate(1);
            comp.move(5, 0);
            comp.draw(this.context);
        }
        setTimeout(() => this.draw(), 1);
    }
    instantiate(comp) {
        this.components.push(comp);
    }
}
export { Game };
