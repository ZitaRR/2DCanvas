class GameObject {
    constructor(vector, scale, angle = 0, ...components) {
        this.components = [];
        this.vector = vector;
        this.scale = scale;
        this._angle = angle;
        for (let i = 0; i < components.length; i++) {
            this.components.push(new components[i](this));
        }
    }
    get angle() {
        return this._angle;
    }
    update() {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].run();
        }
    }
    rotate(angle) {
        this._angle += angle;
    }
    move(x, y) {
        this.vector.x += x;
        this.vector.y += y;
    }
    addComponent(type) {
        const component = new type(this);
        this.components.push(component);
        return component;
    }
    getComponent(type) {
        for (let i = 0; i < this.components.length; i++) {
            const component = this.components[i];
            if (component instanceof type) {
                return component;
            }
        }
        return null;
    }
    removeComponent(type) {
        for (let i = 0; i < this.components.length; i++) {
            const component = this.components[i];
            if (component instanceof type) {
                this.components.slice(i, 1);
                return;
            }
        }
    }
}
export { GameObject };
