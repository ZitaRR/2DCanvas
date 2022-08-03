import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";
class Square extends Component {
    constructor(vector, size) {
        super(vector, undefined, new Vector2(-(size / 2), -(size / 2)), new Vector2(size / 2, -(size / 2)), new Vector2(size / 2, size / 2), new Vector2(-(size / 2), size / 2));
    }
}
export { Square };
