import { GameObject } from "./game_object.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";
import * as PrimitiveShapes from "./primitive_shapes/primitive_shapes.js";
import { Utils } from "./utils.js";
class Game {
    constructor() {
        this.last = new Date();
        this.now = new Date();
        this.filter = 50;
        this.frames = 0;
        this.objects = [];
        if (Game.instance) {
            throw new Error("Game has already been instantiated");
        }
        Game._instance = this;
        this._context = Window.initialize(this);
        this.filter = 50;
        this.frames = 0;
        this.context.lineWidth = 5;
        this.start();
    }
    static get instance() {
        return this._instance;
    }
    get context() {
        return this._context;
    }
    start() {
        this.objects.push(new GameObject(new Vector2(100, 100), new Vector2(50, 50), 0, PrimitiveShapes.Square));
        this.objects.push(new GameObject(new Vector2(200, 100), new Vector2(50, 50), 0, PrimitiveShapes.Triangle));
        this.objects.push(new GameObject(new Vector2(300, 100), new Vector2(50, 50), 0, PrimitiveShapes.Pentagon));
        this.objects.push(new GameObject(new Vector2(400, 100), new Vector2(50, 50), 0, PrimitiveShapes.Circle));
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
        for (let i in this.objects) {
            const object = this.objects[i];
            object.rotate(1);
            object.move(1, 0);
            object.update();
        }
        setTimeout(() => this.draw(), 1);
    }
    instantiate(comp) {
        this.objects.push(comp);
    }
    instantiateRandom(position) {
        position !== null && position !== void 0 ? position : (position = new Vector2(Math.random() * Window.width, Math.random() * Window.height));
        const scale = new Vector2(Math.random() * 300, Math.random() * 300);
        const angle = Math.random() * 360;
        const shape = Utils.randomShape();
        this.instantiate(new GameObject(position, scale, angle, shape));
    }
}
export { Game };
