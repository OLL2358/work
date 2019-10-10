import EventManager from "../../../tool/common/EventManager";
import Method from './../../../Method';
import Config from "../../../tool/model/Config";
import Wx from './../../../Wx/Wx';
import { RewardSystem } from "../../../Game/tool/RewardSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapTheTrial extends cc.Component {

    @property(cc.Node)
    show: cc.Node = null;
    @property(cc.Node)
    Close: cc.Node = null;

    Fruits1: cc.Node;
    Fruits2: cc.Node;
    Fruits3: cc.Node;
    Fruits4: cc.Node;

    Fruits1_button: cc.Node;
    Fruits2_button: cc.Node;
    Fruits3_button: cc.Node;
    Fruits4_button: cc.Node;

    Fruits1_sprite: cc.Sprite;
    Fruits2_sprite: cc.Sprite;
    Fruits3_sprite: cc.Sprite;
    Fruits4_sprite: cc.Sprite;

    curSpriteAtlas1: cc.SpriteAtlas;
    curSpriteAtlas2: cc.SpriteAtlas;
    curSpriteAtlas3: cc.SpriteAtlas;
    curSpriteAtlas4: cc.SpriteAtlas;

    atlasList = [];

    onLoad() {
        this.Fruits1 = cc.find("Fruits1", this.show);
        this.Fruits2 = cc.find("Fruits2", this.show);
        this.Fruits3 = cc.find("Fruits3", this.show);
        this.Fruits4 = cc.find("Fruits4", this.show);
        this.Fruits1_button = cc.find("button", this.Fruits1);
        this.Fruits2_button = cc.find("button", this.Fruits2);
        this.Fruits3_button = cc.find("button", this.Fruits3);
        this.Fruits4_button = cc.find("button", this.Fruits4);
        this.Fruits1_sprite = cc.find("sprite", this.Fruits1).getComponent(cc.Sprite);
        this.Fruits2_sprite = cc.find("sprite", this.Fruits2).getComponent(cc.Sprite);
        this.Fruits3_sprite = cc.find("sprite", this.Fruits3).getComponent(cc.Sprite);
        this.Fruits4_sprite = cc.find("sprite", this.Fruits4).getComponent(cc.Sprite);
    }

    start() {
        this.AddDelegate();
        this.atlasList = this.randomFruitsNum();
        console.log("atlasList: ", this.atlasList);
        this.curSpriteAtlas1 = this.FruitsSprite(this.atlasList[0]);
        this.curSpriteAtlas2 = this.FruitsSprite(this.atlasList[1]);
        this.curSpriteAtlas3 = this.FruitsSprite(this.atlasList[2]);
        this.curSpriteAtlas4 = this.FruitsSprite(this.atlasList[3]);
        console.log("curSpriteAtlas1: ", this.curSpriteAtlas1);
        this.Fruits1_sprite.spriteFrame = this.curSpriteAtlas1.getSpriteFrame("Fruit");
        this.Fruits2_sprite.spriteFrame = this.curSpriteAtlas2.getSpriteFrame("Fruit");
        this.Fruits3_sprite.spriteFrame = this.curSpriteAtlas3.getSpriteFrame("Fruit");
        this.Fruits4_sprite.spriteFrame = this.curSpriteAtlas4.getSpriteFrame("Fruit");
    }

    AddDelegate() {
        EventManager.Instance.AddClick(this.Fruits1_button, () => {
            if (Wx.Instance.wx == null) {
                Method.instance.randomFruits(this.atlasList[0]);
                EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                this.RemoveListener();
            } else {
                RewardSystem.Share((isSuccess) => {
                    if (isSuccess) {
                        Method.instance.randomFruits(this.atlasList[0]);
                        EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                        this.RemoveListener();
                    }
                })
            }
        })
        EventManager.Instance.AddClick(this.Fruits2_button, () => {
            if (Wx.Instance.wx == null) {
                Method.instance.randomFruits(this.atlasList[1]);
                EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                this.RemoveListener();
            } else {
                RewardSystem.Share((isSuccess) => {
                    if (isSuccess) {
                        Method.instance.randomFruits(this.atlasList[1]);
                        EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                        this.RemoveListener();
                    }
                })
            }
        })
        EventManager.Instance.AddClick(this.Fruits3_button, () => {
            if (Wx.Instance.wx == null) {
                Method.instance.randomFruits(this.atlasList[2]);
                EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                this.RemoveListener();
            } else {
                RewardSystem.Share((isSuccess) => {
                    if (isSuccess) {
                        Method.instance.randomFruits(this.atlasList[2]);
                        EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                        this.RemoveListener();
                    }
                })
            }
        })
        EventManager.Instance.AddClick(this.Fruits4_button, () => {
            if (Wx.Instance.wx == null) {
                Method.instance.randomFruits(this.atlasList[3]);
                EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                this.RemoveListener();
            } else {
                RewardSystem.Share((isSuccess) => {
                    if (isSuccess) {
                        Method.instance.randomFruits(this.atlasList[3]);
                        EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
                        this.RemoveListener();
                    }
                })
            }
        })
        EventManager.Instance.AddClick(this.Close, () => {
            EventManager.Instance.ExcuteListener(Config.Instance.FruitsTryOut);
            this.RemoveListener();
        })
    }

    RemoveListener() {
        EventManager.Instance.RemoveClick(this.Fruits1_button);
        EventManager.Instance.RemoveClick(this.Fruits2_button);
        EventManager.Instance.RemoveClick(this.Fruits3_button);
        EventManager.Instance.RemoveClick(this.Fruits4_button);
        EventManager.Instance.RemoveClick(this.Close);
        this.node.destroy();
    }

    FruitsSprite(num: number) {
        if (num == 0) {
            return Method.CocoAtlas;
        } else if (num == 1) {
            return Method.KiwiAtlas;
        } else if (num == 2) {
            return Method.LemonAtlas;
        } else if (num == 3) {
            return Method.MangosteenAtlas;
        } else if (num == 4) {
            return Method.OrangeAtlas;
        } else if (num == 5) {
            return Method.PawpawAtlas;
        } else if (num == 6) {
            return Method.PineappleAtlas;
        } else if (num == 7) {
            return Method.PomeloAtlas;
        } else if (num == 8) {
            return Method.PassAtlas;
        } else if (num == 9) {
            return Method.PitayaAtlas;
        } else if (num == 10) {
            return Method.PearAtlas;
        } else if (num == 11) {
            return Method.AppleAtlas;
        } else if (num == 12) {
            return Method.PomegranateAtlas;
        } else if (num == 13) {
            return Method.WatermelonAtlas;
        }
    }

    randomFruitsNum() {
        let list = [];
        while (list.length < 4) {
            let num = Math.floor(Math.random() * 13);
            if (list.indexOf(num) == -1) {
                list.push(num);
            }
        }
        return list;
    }

    // update (dt) {}
}
