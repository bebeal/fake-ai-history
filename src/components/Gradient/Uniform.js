export default class Uniform {
    gl;
    type;
    value;
    typeFn;
    _typeMap = {
        float: '1f',
        int: '1i',
        vec2: '2fv',
        vec3: '3fv',
        vec4: '4fv',
        mat4: 'Matrix4fv'
    };
    constructor(minigl, type, value, properties = {}) {

        
        Object.assign(this, properties);

        
        this.gl = minigl;
        this.type = type;
        this.value = value;

        
        this.typeFn = this._typeMap[this.type] || this._typeMap.float;

        
        this.update();
    }

    update(value) {
        if (this.value) {

            var paramB = this.value;
            var paramC = null;

            if (this.typeFn.indexOf('Matrix') === 0) {
                paramB = this.transpose;
                paramC = this.value;
            }

            this.gl.getContext()[`uniform${this.typeFn}`](value, paramB, paramC);
        }
    }

    getDeclaration(name, type, length) {
        if (this.excludeFrom !== type) {

            if (this.type === 'array') {
                return `${this.value[0].getDeclaration(name, type, this.value.length)}
const int ${name}_length = ${this.value.length};`;
            }

            if (this.type === 'struct') {
                let namePrefix = name.replace('u_', '');
                namePrefix = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);

                const declaration = Object.entries(this.value).map(([name, uniform]) => {
                    return uniform.getDeclaration(name, type).replace(/^uniform/, '');
                }).join('');

                return `uniform struct ${namePrefix} {
    ${declaration}
} ${name}${ length > 0 ? `[${length}]` : '' };`;

            }

            return `uniform ${this.type} ${name}${ length > 0 ? `[${length}]` : '' };`
        }
    }

}
