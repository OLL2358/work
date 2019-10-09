// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    onLoad() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            const loadTask = wx.loadSubpackage({
                name: 'subpackage', // name 可以填 name 或者 root
                success: (res) => {
                    console.log("子包subpackage加载成功", res);
                    cc.director.loadScene('game');
                    // 分包加载成功后通过 success 回调
                },
                fail: (res) => {
                    console.log("子包subpackage加载出错", res);
                    // 分包加载失败通过 fail 回调
                }
            })
        }
    }

    start() {

    }

    // update (dt) {}
}
