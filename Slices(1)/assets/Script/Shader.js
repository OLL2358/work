var ShaderUtils = cc.Class({
    extends: cc.Component,

    properties: {
        fragmentName: 'Gradient.txt',

        from: cc.Color,
        to: cc.Color,
    },

    start() {
        this.vertStr = `
            attribute vec4 a_position;
            attribute vec2 a_texCoord;
            attribute vec4 a_color;
            
            varying vec2 v_texCoord;
            varying vec4 v_fragmentColor;
            
            void main()
            {
                gl_Position = CC_PMatrix * a_position;
                v_fragmentColor = a_color;
                v_texCoord = a_texCoord;
            }
        `;

        // this.colors = [cc.Color.BLUE, cc.Color.YELLOW, cc.Color.ORANGE];
        this.program = new cc.GLProgram();
        this.loadShader(this.fragmentName, this.setProgram);
    },

    loadShader (shaderName, callback) {

        cc.loader.loadRes('Shaders/' + shaderName, function (err, res) {
            if (err) {
                console.error('load fail.');
                return;
            }
            var sgNode = this.node.getComponent(cc.Sprite)._sgNode;

            callback(sgNode, this.program, this.vertStr, res);
            this.setBGGradient();
        }.bind(this));
    },

    setBGGradient () {
        // var randomNumber = Math.floor(Math.random() * 3);
        // this.from = this.colors[randomNumber];

        this.updateUniform();
    },

    updateUniform() {
        this.program.use();

        if (cc.sys.isNative) {
            var state = cc.GLProgramState.getOrCreateWithGLProgram(this.program);

            state.setUniformVec3('from', this.from);
            state.setUniformVec3('to', this.to);
        }
        else {
            var from = this.program.getUniformLocationForName('from');
            var to = this.program.getUniformLocationForName('to');

            var fromNormalized = this.colorNormalized(this.from);
            var toNormalized = this.colorNormalized(this.to);
            this.program.setUniformLocationWith3f(from, fromNormalized.r, fromNormalized.g, fromNormalized.b);
            this.program.setUniformLocationWith3f(to, toNormalized.r, toNormalized.g, toNormalized.b);
        }

    },

    colorNormalized (color) {
        var normalized = {r: 0.0, g: 0.0, b: 0.0};
    
        normalized.r = color.r / 255;
        normalized.g = color.g / 255;
        normalized.b = color.b / 255;
        return normalized;
    },

    setProgram(sgNode, program, vert, frag) {

        if (cc.sys.isNative) {
            program.initWithString(vert, frag);
        }
        else {
            program.initWithVertexShaderByteArray(vert, frag);

            program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);
            program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);
        }
        program.link();
        program.updateUniforms();

        if (cc.sys.isNative) {
            var state = cc.GLProgramState.getOrCreateWithGLProgram(program);
            sgNode.setGLProgramState(state);
        }
        else {
            sgNode.setShaderProgram(program);
        }

    },
});
module.exports = ShaderUtils;