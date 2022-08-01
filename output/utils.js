import { Color } from "./color.js";
class Utils {
    constructor() {
        throw new Error("Cannot be instantiated");
    }
    static randomRgbColor() {
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        return new Color(r, g, b);
    }
}
export { Utils };
