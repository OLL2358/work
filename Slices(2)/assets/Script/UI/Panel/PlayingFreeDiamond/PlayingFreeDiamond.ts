

import EventManager from './../../../tool/common/EventManager';
import { RewardSystem } from '../../../Game/tool/RewardSystem';
import GameData from './../../../GameData';
import ShareLimit from '../../../common/ShareTheLimit';
const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayingFreeDiamond extends cc.Component {

    @property(cc.Node)
    GetBtn: cc.Node = null;
    @property(cc.Node)
    Cancel: cc.Node = null;
    @property(cc.Prefab)
    TipsPanel: cc.Prefab = null;

    // onLoad () {}

    start() {
        this.AddDelegate()
        this.mark();
    }

    //提示界面
    Tips(Text: string) {
        GameData.Instance.SetTipsText(Text);
        let View = cc.instantiate(this.TipsPanel);
        View.parent = this.node.parent;
    }

    mark() {
        if (ShareLimit.CanWatchVideo()) {
            cc.find("mark/share", this.GetBtn).active = false;
            cc.find("mark/vidoe", this.GetBtn).active = true;
        } else if (ShareLimit.CanShare()) {
            cc.find("mark/share", this.GetBtn).active = true;
            cc.find("mark/vidoe", this.GetBtn).active = false;
        } else {
            cc.find("mark/share", this.GetBtn).active =
                cc.find("mark/vidoe", this.GetBtn).active = false;
        }
    }

    AddDelegate() {
        EventManager.Instance.AddClick(this.GetBtn, () => {
            RewardSystem.ShareAndWatch((isSuccess) => {
                if (isSuccess) {
                    this.mark();
                    GameData.Instance.AddDiamond(5);
                    this.Tips("恭喜获得钻石x5");
                    this.node.destroy();
                }
            })
        })
        EventManager.Instance.AddClick(this.Cancel, () => {
            this.node.destroy();
        })
    }

    // update (dt) {}
}
