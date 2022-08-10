class Vector2{
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    public toString(): string{
        return `[${this.x}, ${this.y}]`;
    }

    public add(vector: Vector2): Vector2{
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    public subtract(vector: Vector2): Vector2{
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    public divide(scalar: number): Vector2{
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    public magnitude(): number{
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector2{
        const magnitude: number = this.magnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }
    
    public static dot(v1: Vector2, v2: Vector2): number{
        return v1.x * v2.x + v1.y * v2.y;
    }
}

export { Vector2 };