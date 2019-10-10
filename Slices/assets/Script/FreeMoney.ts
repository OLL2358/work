import { RewardType, RewardSystem, GetRewardType } from "./Game/tool/RewardSystem";
import GameData from './GameData';
import Method from './Method';
import ADData from './ADData';
import ShareLimit from "./common/ShareTheLimit";


const { ccclass, property } = cc._decorator;

@ccclass
export default class FreeMoney extends cc.Component {

    // onLoad () {}
    @property(cc.Node)
    awardView: cc.Node = null;

    markNode: cc.Node = null;

    di
    di_1
    jinbi
    kuang_1
    huodegengduo
    annui
    huoqu



    onLoad() {
        this.markNode = cc.find("annui/mark", this.node)
        cc.loader.loadRes('SubTexture/FreeMoney', cc.SpriteAtlas, (err, res:cc.SpriteAtlas) => {
            if (err) {
                console.log("FreeMoney is fail :", err);
                return
            }
            this.di = cc.find('di', this.node).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("di");
            this.di_1 = cc.find('di_1', this.node).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("di_1");
            this.jinbi = cc.find('di_1/jinbi', this.node).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("jinbi");
            this.kuang_1 = cc.find('di_1/kuang_1', this.node).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("kuang_1");
            this.huodegengduo = cc.find('huodegengduo', this.node).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("huodegengduo");
            this.annui = cc.find('annui', this.node).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("annui");
            this.huoqu = cc.find('annui/huoqu', this.node).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("huoqu");
        })
    }

    mark() {
        if (ShareLimit.CanWatchVideo()) {
            cc.find("share", this.markNode).active = false;
            cc.find("vidoe", this.markNode).active = true;
        } else if (ShareLimit.CanShare()) {
            cc.find("share", this.markNode).active = true;
            cc.find("vidoe", this.markNode).active = false;
        } else {
            cc.find("share", this.markNode).active =
                cc.find("vidoe", this.markNode).active = false;
        }
    }

    start() {
        this.node.setScale(0);
        this.awardView.active = false;
        this.node.runAction(cc.sequence(
            cc.scaleTo(0.2, 1.2),
            cc.scaleTo(0.2, 1),
        ))
        this.mark();
    }

    GetMoneyButton() {
        RewardSystem.ShareAndWatch((isSuccess) => {
            if (isSuccess) {
                this.awardView.active = true;
                Method.OpenViewNum++;
                this.mark();
            }
        });

        // const type = RewardType.Money;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         this.awardView.active = true;
        //         Method.OpenViewNum++;
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("GetMoneyButton....fail");
        //     }
        // );
    }

    getAward() {
        GameData.Instance.AddGameMoney(50);
        this.awardView.active = false;
    }

    close() {
        this.node.runAction(cc.sequence(
            cc.scaleTo(0, 1),
            cc.scaleTo(0.2, 1.2),
            cc.scaleTo(0.2, 0),
            cc.callFunc(() => {
                this.node.removeFromParent();
            })
        ))
    }

    ADicon1() {
        if (window.wx != undefined) {
            wx.navigateToMiniProgram({
                appId: ADData.instance.AdData[0].appId,
                success: () => {
                    console.log('跳转成功');
                },
                fail: () => {
                    console.log('跳转失败');
                }
            })
        }
    }
    ADicon2() {
        if (window.wx != undefined) {
            wx.navigateToMiniProgram({
                appId: ADData.instance.AdData[1].appId,
                success: () => {
                    console.log('跳转成功');
                },
                fail: () => {
                    console.log('跳转失败');
                }
            })
        }
    }
    ADicon3() {
        if (window.wx != undefined) {
            wx.navigateToMiniProgram({
                appId: ADData.instance.AdData[2].appId,
                success: () => {
                    console.log('跳转成功');
                },
                fail: () => {
                    console.log('跳转失败');
                }
            })
        }
    }
    ADicon4() {
        if (window.wx != undefined) {
            wx.navigateToMiniProgram({
                appId: ADData.instance.AdData[3].appId,
                success: () => {
                    console.log('跳转成功');
                },
                fail: () => {
                    console.log('跳转失败');
                }
            })
        }
    }
    // update (dt) {}
}
