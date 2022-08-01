import { Color } from "./color.js";

class Utils{
    constructor(){
        throw new Error("Cannot be instantiated");
    }

    public static randomRgbColor(): Color{
        const r: number = Math.random() * 255;
        const g: number = Math.random() * 255;
        const b: number = Math.random() * 255;
        return new Color(r, g, b);
    }
}

export { Utils };