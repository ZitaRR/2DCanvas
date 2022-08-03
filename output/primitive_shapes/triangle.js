import { Component } from "../component.js";
import { Vector2 } from "../vector2.js";
class Triangle extends Component {
    constructor(vector, width, height) {
        super(vector, undefined, new Vector2(0, -(height / 2)), new Vector2(width / 2, height / 2), new Vector2(-(width / 2), height / 2));
        this.width = width;
        this.height = height;
    }
}
export { Triangle };
