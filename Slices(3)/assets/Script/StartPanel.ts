// Learn TypeScript:
import Method from './Method';
import EventManager from './tool/common/EventManager';
import TaskWall from './UI/Panel/TaskWall/TaskWall';
import ShareLimit from './common/ShareTheLimit';
import GamePrefabs from './GamePrefabs';
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
export default class StartPanel extends cc.Component {

    @property(cc.Node)
    FreeDiamondBtn: cc.Node = null;
    @property(cc.Node)
    TaskBtn: cc.Node = null;
    @property(cc.Node)
    FieldGuide: cc.Node = null;
    @property(cc.Node)
    PanelView: cc.Node = null;
    @property(cc.Prefab)
    FreeDiamondView: cc.Prefab = null;
    @property(cc.Prefab)
    TaskWall: cc.Prefab = null;
    @property(cc.Prefab)
    FieldGuideView: cc.Prefab = null;


    logo
    yun
    FreeDiamond
    EndlessTheme
    jingdianmoshi_1

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let atlas: cc.SpriteAtlas;
        let atlas1: cc.SpriteAtlas;
        cc.loader.loadRes('SubTexture/StartPanel', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load StartPanel fail , message=' + error);
                return;
            }
            atlas = data;
            this.logo = cc.find('logo', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('logo');
            this.yun = cc.find('yun', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('yun');
            // this.FreeDiamond = this.FreeDiamondBtn.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('');
            this.EndlessTheme = cc.find('NewNode/EndlessTheme', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('annui');
            this.jingdianmoshi_1 = cc.find('NewNode/EndlessTheme/jingdianmoshi_1', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('jingdianmoshi_1');
        })
        cc.loader.loadRes('SubTexture/FieldGuide', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load FieldGuide fail , message=' + error);
                return;
            }
            atlas1 = data;
            this.FieldGuide.getComponent(cc.Sprite).spriteFrame = atlas1.getSpriteFrame('tujian_icon');
            this.FieldGuide.getChildByName('tujian').getComponent(cc.Sprite).spriteFrame = atlas1.getSpriteFrame('tujian');
        })

        this.AddDelegate();
    }

    AddDelegate() {
        EventManager.Instance.AddClick(this.TaskBtn, () => {
            let view = cc.instantiate(this.TaskWall);
            view.parent = this.PanelView;
            view.getComponent(TaskWall).AddDelegate();
        })
        EventManager.Instance.AddClick(this.FreeDiamondBtn, () => {
            let view = cc.instantiate(this.FreeDiamondView);
            view.parent = this.PanelView;
        })
        EventManager.Instance.AddClick(this.FieldGuide, () => {
            if (GamePrefabs.instance.NextResLoadSuccees == false) {
                GamePrefabs.instance.NextInit();
                setTimeout(() => {
                    let view = cc.instantiate(this.FieldGuideView);
                    view.parent = this.PanelView;
                }, 1000);
            } else {
                let view = cc.instantiate(this.FieldGuideView);
                view.parent = this.PanelView;
            }
        })
    }
    // update (dt) {}
}
