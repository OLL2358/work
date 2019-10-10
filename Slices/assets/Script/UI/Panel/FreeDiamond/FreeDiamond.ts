import EventManager from "../../../tool/common/EventManager";
import Wx from './../../../Wx/Wx';
import { RewardSystem } from "../../../Game/tool/RewardSystem";
import Config from './../../../tool/model/Config';
import GameData from './../../../GameData';
import Utility from './../../../common/Utility';
import ShareLimit from "../../../common/ShareTheLimit";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Diamond extends cc.Component {

    @property(cc.Node)
    Share: cc.Node = null;
    @property(cc.Node)
    Close: cc.Node = null;
    @property(cc.Label)
    Hour: cc.Label = null;
    @property(cc.Label)
    Minute: cc.Label = null;
    @property(cc.Label)
    Second: cc.Label = null;

    isWatch: boolean = false;

    // onLoad () {}

    start() {
        // Wx.Instance.hideGameClub();
        this.SetTime();
        this.Hour.schedule(() => {
            this.SetTime();
        }, 1)
        this.AddDelegate();
        this.mark();
    }

    AddDelegate() {
        EventManager.Instance.AddClick(this.Share, () => {
            RewardSystem.Share((isSuccess) => {
                if (isSuccess) {
                    let nextTime = Wx.Instance.localStorageGetInt(Config.Instance.FreeDiamondCD, 0);
                    nextTime -= 3600000;
                    let nowTime = new Date().getTime();
                    let cost = (nextTime - nowTime) / 1000;
                    if (cost <= 0) {
                        this.getDiamond();
                    } else {
                        Wx.Instance.localStorageSetInt(Config.Instance.FreeDiamondCD, nextTime);
                        Wx.Instance.ShowToast("发出成功,时间减少一小时!");
                    }
                }
            })
        })
        EventManager.Instance.AddClick(this.Close, () => {
            // Wx.Instance.showGameClub();
            this.node.destroy();
        })
    }

    mark() {
        if (ShareLimit.CanWatchVideo()) {
            cc.find("Canvas/Start/FreeDiamond/mark/share").active = false;
            cc.find("Canvas/Start/FreeDiamond/mark/share").active = true;
        } else if (ShareLimit.CanShare()) {
            cc.find("Canvas/Start/FreeDiamond/mark/share").active = true;
            cc.find("Canvas/Start/FreeDiamond/mark/share").active = false;
        } else {
            cc.find("Canvas/Start/FreeDiamond/mark/share").active =
                cc.find("Canvas/Start/FreeDiamond/mark/share").active = false;
        }
    }

    SetTime() {
        let nextTime = Wx.Instance.localStorageGetInt(Config.Instance.FreeDiamondCD, 0);
        let nowTime = new Date().getTime();
        let cost = (nextTime - nowTime) / 1000;
        this.Hour.string = Math.floor(cost / 3600).toString();
        this.Minute.string = Utility.paddingLeft(Math.floor((cost % 3600) / 60), 2);
        this.Second.string = Utility.paddingLeft(Math.floor(cost % 60), 2);
        if (cost <= 0) {
            if (this.isWatch == false) {
                this.node.active = false;
                this.isWatch = true;
                RewardSystem.ShareAndWatch((isSuccess) => {
                    if (isSuccess) {
                        this.mark();
                        this.node.active = true;
                        this.getDiamond();
                        this.isWatch = false;
                    }
                })
            }
        }
    }

    getDiamond() {
        let nextTime;
        let nowTime = new Date().getTime();
        let getNum = Wx.Instance.localStorageGetInt(Config.Instance.FreeDiamondNum, 0);
        if (getNum >= 8) {
            Wx.Instance.ShowToast("今天可领次数已用完！");
        } else {
            this.node.active = false;
            nextTime = nowTime + 3 * 3600000;
            GameData.Instance.AddDiamond(5);
            getNum++;
            Wx.Instance.localStorageSetInt(Config.Instance.FreeDiamondNum, getNum);
            Wx.Instance.ShowToast("恭喜获得5钻石!");
        }
        Wx.Instance.localStorageSetInt(Config.Instance.FreeDiamondCD, nextTime);
    }

    // update (dt) {}
}
