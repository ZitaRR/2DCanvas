import { Utils } from "./utils.js";
import { Vector2 } from "./vector2.js";
class Window {
    constructor() {
        throw new Error("Cannot be instantiated");
    }
    static get context() {
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Failed to retrieve context");
        }
        return context;
    }
    static get width() {
        return this.canvas.width;
    }
    static get height() {
        return this.canvas.height;
    }
    static get id() {
        return "game-window";
    }
    static initialize(game) {
        this.setupCanvas();
        this.setupEvents();
        this.game = game;
    }
    static setupCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = this.id;
        this.setSize();
        document.body.appendChild(this.canvas);
    }
    static setupEvents() {
        window.addEventListener("resize", () => this.setSize());
        window.addEventListener("keydown", (event) => {
            console.log(event);
        });
        window.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const position = new Vector2(event.clientX - rect.left, event.clientY - rect.top);
            this.game.instantiate(Utils.randomShape(position, 50));
        });
    }
    static setSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
export { Window };
