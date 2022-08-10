import { GameObject } from "./game_object.js";
import { Vector2 } from "./vector2.js";
import { Window } from "./window.js";
import * as PrimitiveShapes from "./primitive_shapes/primitive_shapes.js";
import { Utils } from "./utils.js";
import { Renderer } from "./renderer.js";
import { Color } from "./color.js";
import { Collision } from "./collision.js";
class Game {
    constructor() {
        this.last = new Date();
        this.now = new Date();
        this.filter = 50;
        this.frames = 0;
        this.objects = [];
        this.player = null;
        if (Game.instance) {
            throw new Error("Game has already been instantiated");
        }
        Game._instance = this;
        this._context = Window.initialize(this);
        this.filter = 50;
        this.frames = 0;
        this.context.lineWidth = 4;
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
        this.objects.push(new GameObject(new Vector2(151, 100), new Vector2(50, 50), 0, PrimitiveShapes.Triangle));
        this.objects.push(new GameObject(new Vector2(300, 100), new Vector2(50, 50), 0, PrimitiveShapes.Pentagon));
        this.player = this.objects[1];
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
        console.log(this.frames);
        this.context.clearRect(0, 0, Window.width, Window.height);
        let collision = false;
        for (let i = 0; i < this.objects.length; i++) {
            const object = this.objects[i];
            object.rotate(2);
            //object.move(1, 0);
            const current = object.getComponent(Renderer);
            if (current) {
                for (let j = 0; j < this.objects.length; j++) {
                    const other = this.objects[j];
                    if (object.isSame(other)) {
                        continue;
                    }
                    const renderer = other.getComponent(Renderer);
                    if (!renderer) {
                        continue;
                    }
                    collision = Collision.isColliding(current, renderer);
                    if (collision) {
                        current.color = new Color(255, 0, 0);
                        renderer.color = new Color(255, 0, 0);
                        break;
                    }
                }
            }
            if (!collision && current) {
                current.color = current.initailColor;
            }
            object.update();
        }
        setTimeout(() => this.draw(), 1);
    }
    instantiate(comp) {
        this.objects.push(comp);
    }
    instantiateRandom(position) {
        position !== null && position !== void 0 ? position : (position = new Vector2(Math.random() * Window.width, Math.random() * Window.height));
        const scale = new Vector2(Math.random() * 120, Math.random() * 120);
        const angle = Math.random() * 360;
        const shape = Utils.randomShape();
        this.instantiate(new GameObject(position, scale, angle, shape));
    }
    movePlayer(vector) {
        var _a;
        const step = 5;
        (_a = this.player) === null || _a === void 0 ? void 0 : _a.move(vector.x * step, vector.y * step);
    }
}
export { Game };
