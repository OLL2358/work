// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    fragmentName: string = 'Gradient.txt';
    from: cc.Color = cc.hexToColor("#000000");
    to: cc.Color= cc.hexToColor("#3f3f59");
    program;
    vertStr;

    start() {
        const nowTime = new Date().getTime();
        // const nowTime = 1547227796000;
        const AM_0 = new Date(new Date().setHours(0,0,0,0)).getTime();
        const AM_2 = new Date(new Date().setHours(2,0,0,0)).getTime();
        const AM_4 = new Date(new Date().setHours(4,0,0,0)).getTime();
        const AM_6 = new Date(new Date().setHours(6,0,0,0)).getTime();
        const AM_8 = new Date(new Date().setHours(8,0,0,0)).getTime();
        const PM_2 = new Date(new Date().setHours(14,0,0,0)).getTime();
        const PM_6 = new Date(new Date().setHours(18,0,0,0)).getTime();
        const PM_7 = new Date(new Date().setHours(19,0,0,0)).getTime();
        const PM_8 = new Date(new Date().setHours(20,0,0,0)).getTime();
        const PM_12 = new Date(new Date().setHours(24,0,0,0)).getTime();
        console.log("当前时间: ",nowTime);

        if(nowTime >= AM_0 && nowTime <= AM_2){
            console.log("0:00 ~ 2:00");
            // this.from = cc.hexToColor("#000000");
            // this.to = cc.hexToColor("#3f3f59");
            this.from = this.ColorRatio(nowTime,AM_0,AM_2,cc.hexToColor("#000000"),cc.hexToColor("#3f3f59"));
            this.to = this.ColorRatio(nowTime,AM_0,AM_2,cc.hexToColor("#3f3f59"),cc.hexToColor("#7974ac"));
        }
        else if(nowTime >= AM_2 && nowTime <= AM_4){
            console.log("2:00 ~ 5:00");
            // this.from = cc.hexToColor("#3f3f59");
            // this.to = cc.hexToColor("#7974ac");
            this.from = this.ColorRatio(nowTime,AM_2,AM_4,cc.hexToColor("#3f3f59"),cc.hexToColor("#7974ac"));
            this.to = this.ColorRatio(nowTime,AM_2,AM_4,cc.hexToColor("#7974ac"),cc.hexToColor("#fb8b97"));
        }
        else if(nowTime >= AM_4 && nowTime <= AM_6){
            console.log("5:00 ~ 7:00");
            // this.from = cc.hexToColor("#7974ac");
            // this.to = cc.hexToColor("#fb8b97");
            this.from = this.ColorRatio(nowTime,AM_4,AM_6,cc.hexToColor("#7974ac"),cc.hexToColor("#fb8b97"));
            this.to = this.ColorRatio(nowTime,AM_4,AM_6,cc.hexToColor("#fb8b97"),cc.hexToColor("#ffffff"));
        }
        else if(nowTime >= AM_6 && nowTime <= AM_8){
            console.log("7:00 ~ 12:00");
            this.from = cc.hexToColor("#fb8b97");
            this.to = cc.hexToColor("#ffffff");
            // this.from = this.ColorRatio(nowTime,AM_6,AM_8,cc.hexToColor("#fb8b97"),cc.hexToColor("#ffffff"));
            // this.to = this.ColorRatio(nowTime,AM_6,AM_8,cc.hexToColor("#ffffff"),cc.hexToColor("#6ed5fe"));
        }
        else if(nowTime >= AM_8 && nowTime <= PM_2){
            console.log("12:00 ~ 15:00");
            this.from = cc.hexToColor("#ffffff");
            this.to = cc.hexToColor("#6ed5fe");
            // this.from = this.ColorRatio(nowTime,AM_8,PM_2,cc.hexToColor("#ffffff"),cc.hexToColor("#6ed5fe"));
            // this.to = this.ColorRatio(nowTime,AM_8,PM_2,cc.hexToColor("#6ed5fe"),cc.hexToColor("#1c528e"));
        }
        else if(nowTime >= PM_2 && nowTime <= PM_6){
            console.log("15:00 ~ 17:00");
            // this.from = cc.hexToColor("#6ed5fe");
            // this.to = cc.hexToColor("#1c528e");
            this.from = this.ColorRatio(nowTime,PM_2,PM_6,cc.hexToColor("#6ed5fe"),cc.hexToColor("#1c528e"));
            this.to = this.ColorRatio(nowTime,PM_2,PM_6,cc.hexToColor("#1c528e"),cc.hexToColor("#ebc354"));
        }
        else if(nowTime >= PM_6 && nowTime <= PM_7){
            console.log("17:00 ~ 19:00");
            // this.from = cc.hexToColor("#1c528e");
            // this.to = cc.hexToColor("#ebc354");
            this.from = this.ColorRatio(nowTime,PM_6,PM_7,cc.hexToColor("#1c528e"),cc.hexToColor("#ebc354"));
            this.to = this.ColorRatio(nowTime,PM_6,PM_7,cc.hexToColor("#ebc354"),cc.hexToColor("#98390b"));
        }
        else if(nowTime >= PM_7 && nowTime <= PM_8){
            console.log("19:00 ~ 22:00");
            // this.from = cc.hexToColor("#ebc354");
            // this.to = cc.hexToColor("#98390b");
            this.from = this.ColorRatio(nowTime,PM_7,PM_8,cc.hexToColor("#ebc354"),cc.hexToColor("#98390b"));
            this.to = this.ColorRatio(nowTime,PM_7,PM_8,cc.hexToColor("#98390b"),cc.hexToColor("#160903"));
        }
        else if(nowTime >= PM_8 && nowTime <= PM_12){
            console.log("22:00 ~ 24:00");
            // this.from = cc.hexToColor("#98390b");
            // this.to = cc.hexToColor("#160903");
            this.from = this.ColorRatio(nowTime,PM_8,PM_12,cc.hexToColor("#98390b"),cc.hexToColor("#160903"));
            this.to = this.ColorRatio(nowTime,PM_8,PM_12,cc.hexToColor("#160903"),cc.hexToColor("#000000"));
        }
        console.log(this.from);
        console.log(this.to);
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
    }
    /**
     * 
     * @param nowTime 当前时间
     * @param RatioTime_front 前时间戳
     * @param RatioTime_back 后时间戳
     * @param color_front 前color
     * @param color_back 后color
     */
    ColorRatio(nowTime:number,RatioTime_front:number,RatioTime_back:number,color_front:cc.Color,color_back:cc.Color): cc.Color{
        console.log("前时间戳:",RatioTime_front)
        console.log("后时间戳:",RatioTime_back)
        var normalized = {r: 0.0, g: 0.0, b: 0.0};
        var Ratio:number = 0;
        if(nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.1){
            Ratio = 0;
            normalized.r = color_front.r;
            normalized.g = color_front.g;
            normalized.b = color_front.b;
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.1 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.2
                ){
            Ratio = 0.1;
            normalized.r = (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = (color_front.b * Ratio) + (color_back.b * Ratio);
            console.log("color_front.r * Ratio: ",color_front.r * Ratio)
            console.log("color_front.g * Ratio: ",color_front.g * Ratio)
            console.log("color_front.b * Ratio: ",color_front.b * Ratio)
            console.log("color_back.r * Ratio: ",color_back.r * Ratio)
            console.log("color_back.g * Ratio: ",color_back.g * Ratio)
            console.log("color_back.b * Ratio: ",color_back.b * Ratio)
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.2 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.3
                ){
            Ratio = 0.2;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.3 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.4
                ){
            Ratio = 0.3;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.4 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.5
                ){
            Ratio = 0.4;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.5 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.6
                ){
            Ratio = 0.5;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.6 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.7
                ){
            Ratio = 0.6;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.7 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.8
                ){
            Ratio = 0.7;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.8 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*0.9
                ){
            Ratio = 0.8;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*0.9 &&
                nowTime < RatioTime_front + (RatioTime_back - RatioTime_front)*1
                ){
            Ratio = 0.9;
            normalized.r = color_front.r + (color_front.r * Ratio) + (color_back.r * Ratio);
            normalized.g = color_front.g + (color_front.g * Ratio) + (color_back.g * Ratio);
            normalized.b = color_front.b + (color_front.b * Ratio) + (color_back.b * Ratio);
        }
        else if(nowTime > RatioTime_front + (RatioTime_back - RatioTime_front)*1){
            Ratio = 1;
            normalized.r = color_back.r;
            normalized.g = color_back.g;
            normalized.b = color_back.b;
        }
        if(normalized.r > 255){
            normalized.r = color_back.r;
        }
        if(normalized.g > 255){
            normalized.g = color_back.g;
        }
        if(normalized.b > 255){
            normalized.b = color_back.b;
        }
        console.log("normalized: ",normalized);
        console.log("Ratio: ",Ratio);
        return normalized;
    }


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
    }

    setBGGradient () {
        // var randomNumber = Math.floor(Math.random() * 3);
        // this.from = this.colors[randomNumber];

        this.updateUniform();
    }

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

    }

    colorNormalized (color) {
        var normalized = {r: 0.0, g: 0.0, b: 0.0};
    
        normalized.r = color.r / 255;
        normalized.g = color.g / 255;
        normalized.b = color.b / 255;
        return normalized;
    }

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

    }
}
