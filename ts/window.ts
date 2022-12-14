import { Game } from "./game.js";
import { Vector2 } from "./vector2.js";

class Window{
    public static get width(): number{
        return this.canvas.width;
    }

    public static get height(): number{
        return this.canvas.height;
    }

    private static get id(): string{
        return "game-window";
    }

    private static canvas: HTMLCanvasElement;
    private static game: Game;

    constructor(){
        throw new Error("Cannot be instantiated");
    }

    public static initialize(game: Game): CanvasRenderingContext2D{
        this.setupCanvas();

        const context: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if(!context){
            throw new Error("Failed to retrieve context");
        }

        this.setupEvents();
        this.game = game;
        return context;
    }

    private static setupCanvas(): void{
        this.canvas = document.createElement("canvas");
        this.canvas.id = this.id;
        this.setSize();

        document.body.appendChild(this.canvas);
    }

    private static setupEvents(): void{
        window.addEventListener("resize", () => this.setSize());
        window.addEventListener("keydown", (event) => {
            switch(event.key){
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
            const rect: DOMRect = this.canvas.getBoundingClientRect();
            const position: Vector2 = new Vector2(event.clientX - rect.left, event.clientY - rect.top);
            this.game.instantiateRandom(position);
        });
    }

    private static setSize(): void{
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

export { Window };