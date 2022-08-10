import { Vector2 } from "./vector2.js";
class Window {
    constructor() {
        throw new Error("Cannot be instantiated");
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
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Failed to retrieve context");
        }
        this.setupEvents();
        this.game = game;
        return context;
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
            switch (event.key) {
                case "w":
                    this.game.movePlayer(new Vector2(0, -1));
                    break;
                case "a":
                    this.game.movePlayer(new Vector2(-1, 0));
                    break;
                case "s":
                    this.game.movePlayer(new Vector2(0, 1));
                    break;
                case "d":
                    this.game.movePlayer(new Vector2(1, 0));
                    break;
            }
        });
        window.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const position = new Vector2(event.clientX - rect.left, event.clientY - rect.top);
            this.game.instantiateRandom(position);
        });
    }
    static setSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
export { Window };
