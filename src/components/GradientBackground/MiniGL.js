import Attribute from './Attribute.js';
import Material from './Material.js';
import Mesh from './Mesh.js';
import PlaneGeometry from './PlaneGeometry.js';
import Uniform from './Uniform.js';

export default class MiniGL {
    _class = MiniGL;
    _canvas;
    _context;
    commonUniforms = {};
    meshes = [];
    constructor(canvas, width, height) {
        this.setCanvas(canvas);

        const matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        this.commonUniforms = {
            projectionMatrix: new Uniform(this, 'mat4', matrix),
            modelViewMatrix: new Uniform(this, 'mat4', matrix),
            resolution: new Uniform(this, 'vec2', [1, 1]),
            aspectRatio: new Uniform(this, 'float', 1)
        };

        this.setSize(width, height);
    }
    setCanvas(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('webgl', {
            antialias: true
        });
    }
    getCanvas() {
        return this._canvas;
    }
    getContext() {
        return this._context;
    }
    setSize(width = 640, height = 480) {
        this.getCanvas().width = width;
        this.getCanvas().height = height;
        this.getContext().viewport(0, 0, width, height);
        this.commonUniforms.resolution.value = [width, height];
        this.commonUniforms.aspectRatio.value = width / height;
    }

    setOrthographicCamera(left = 0, right = 0, top = 0, bottom = -2000, distance = 2000) {
        this.commonUniforms.projectionMatrix.value = [
            2 / this.getCanvas().width,
            0, 0, 0, 0,
            2 / this.getCanvas().height,
            0, 0, 0, 0,
            2 / (bottom - distance),
            0, left, right, top, 1
        ];
    }

    render() {
        this.getContext().clearColor(0, 0, 0, 0);
        this.getContext().clearDepth(1);
        this.meshes.forEach(mesh => {
            mesh.draw();
        });
    }

}
