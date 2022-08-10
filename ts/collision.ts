import { Renderer } from "./renderer.js";
import { Vector2 } from "./vector2.js";

class Collision{
    public static isColliding(a: Renderer, b: Renderer): boolean{
        for(let i = 0; i < a.transformedVertices.length; i++){
            const v1: Vector2 = a.transformedVertices[i];
            const v2: Vector2 = a.transformedVertices[(i + 1) % a.transformedVertices.length];

            const edge: Vector2 = v2.subtract(v1);
            const axis: Vector2 = new Vector2(edge.y, -edge.x);

            const proj1: { min: number, max: number } = this.project(a.transformedVertices, axis);
            const proj2: { min: number, max: number } = this.project(b.transformedVertices, axis);

            if(proj1.min > proj1.max || proj2.min > proj1.max){
                return false;
            }
        }

        for(let i = 0; i < b.transformedVertices.length; i++){
            const v1: Vector2 = b.transformedVertices[i];
            const v2: Vector2 = b.transformedVertices[(i + 1) % b.transformedVertices.length];

            const edge: Vector2 = v2.subtract(v1);
            const axis: Vector2 = new Vector2(edge.y, -edge.x);

            const proj1: { min: number, max: number } = this.project(b.transformedVertices, axis);
            const proj2: { min: number, max: number } = this.project(a.transformedVertices, axis);

            if(proj1.min > proj1.max || proj2.min > proj1.max){
                return false;
            }
        }

        return true;
    }

    private static project(vertices: Vector2[], axis: Vector2): { min: number, max: number }{
        let min: number = Number.POSITIVE_INFINITY;
        let max: number = Number.NEGATIVE_INFINITY;

        for(let i in vertices){
            const v: Vector2 = vertices[i];
            const dot: number = Vector2.dot(v, axis);

            if(dot < min){
                min = dot;
            }
            if(dot > max){
                max = dot;
            }
        }

        return { min: min, max: max };
    }
}

export { Collision };