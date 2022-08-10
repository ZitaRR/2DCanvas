import { Vector2 } from "./vector2.js";
class Collision {
    static isColliding(a, b) {
        for (let i = 0; i < a.transformedVertices.length; i++) {
            const v1 = a.transformedVertices[i];
            const v2 = a.transformedVertices[(i + 1) % a.transformedVertices.length];
            const edge = v2.subtract(v1);
            const axis = new Vector2(edge.y, -edge.x);
            const proj1 = this.project(a.transformedVertices, axis);
            const proj2 = this.project(b.transformedVertices, axis);
            if (proj1.min > proj1.max || proj2.min > proj1.max) {
                return false;
            }
        }
        for (let i = 0; i < b.transformedVertices.length; i++) {
            const v1 = b.transformedVertices[i];
            const v2 = b.transformedVertices[(i + 1) % b.transformedVertices.length];
            const edge = v2.subtract(v1);
            const axis = new Vector2(edge.y, -edge.x);
            const proj1 = this.project(b.transformedVertices, axis);
            const proj2 = this.project(a.transformedVertices, axis);
            if (proj1.min > proj1.max || proj2.min > proj1.max) {
                return false;
            }
        }
        return true;
    }
    static project(vertices, axis) {
        let min = Number.POSITIVE_INFINITY;
        let max = Number.NEGATIVE_INFINITY;
        for (let i in vertices) {
            const v = vertices[i];
            const dot = Vector2.dot(v, axis);
            if (dot < min) {
                min = dot;
            }
            if (dot > max) {
                max = dot;
            }
        }
        return { min: min, max: max };
    }
}
export { Collision };
