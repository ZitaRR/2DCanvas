import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";
import * as PrimitiveShapes from "./primitive_shapes/primitive_shapes.js";
class Game {
    constructor() {
        this.last = new Date();
        this.now = new Date();
        this.filter = 50;
        this.frames = 0;
        this.components = [];
        this.map = new Map();
        if (Game.instance) {
            throw new Error("Game has already been instantiated");
        }
        Game._instance = this;
        Window.initialize(this);
        this.filter = 50;
        this.frames = 0;
        this.context = Window.context;
        this.context.lineWidth = 5;
        this.start();
    }
    static get instance() {
        return this._instance;
    }
    start() {
        this.components.push(new PrimitiveShapes.Square(new Vector2(100, 100), 50));
        this.components.push(new PrimitiveShapes.Triangle(new Vector2(200, 100), 50, 50));
        this.components.push(new PrimitiveShapes.Circle(new Vector2(300, 100), 50));
        this.components.push(new PrimitiveShapes.Pentagon(new Vector2(400, 100), 50));
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
            comp.move(1, 0);
            comp.draw(this.context);
        }
        setTimeout(() => this.draw(), 1);
    }
    instantiate(comp) {
        this.components.push(comp);
    }
}
export { Game };
