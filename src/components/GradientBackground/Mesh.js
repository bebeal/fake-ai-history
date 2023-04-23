export default class Mesh {
    gl;

    wireframe = false;
    attributeInstances = [];
    constructor(minigl, geometry, material, properties = {}) {
        Object.assign(this, properties);
        this.geometry = geometry;
        this.material = material;
        this.gl = minigl;
        Object.entries(this.geometry.attributes).forEach(([e, attribute]) => {
            this.attributeInstances.push({
                attribute: attribute,
                location: attribute.attach(e, this.material.program)
            });
        });
        this.gl.meshes.push(this);
    }


    draw() {
        const context = this.gl.getContext();

        context.useProgram(this.material.program);

        this.material.uniformInstances.forEach(({uniform: uniform, location: location}) => {
            uniform.update(location);
        });

        this.attributeInstances.forEach(({attribute: attribute, location: location}) => {
            attribute.use(location);
        });

        const mode = this.wireframe ? context.LINES : context.TRIANGLES;

        context.drawElements(mode, this.geometry.attributes.index.values.length, context.UNSIGNED_SHORT, 0);
    }

    remove() {
        this.gl.meshes = this.gl.meshes.filter(mesh => mesh != this);
    }

}
