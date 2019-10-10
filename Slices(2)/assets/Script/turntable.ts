// Learn TypeScript:
import GameData from './GameData';
import Method from './Method';
import Wx from './Wx/Wx';
import Config from './tool/model/Config';
import RemoteControl from './Game/tool/RemoteCtrl';
import EventManager from './tool/common/EventManager';
import EventMessage from './tool/model/EventMessage';
import { RewardType, RewardSystem, GetRewardType } from './Game/tool/RewardSystem';
import TaskWall from './UI/Panel/TaskWall/TaskWall';
import NetManager from './common/NetManager';
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
export default class turntable extends cc.Component {
    private static instance: turntable;
    public static get Instance(): turntable {
        return this.instance;
    }

    @property(cc.Node)
    view: cc.Node = null;
    @property(cc.Node)
    award: cc.Node = null;
    @property(cc.Node)
    pan: cc.Node = null;
    @property(cc.Sprite)
    jinbi: cc.Sprite = null;
    @property(cc.Node)
    gift: cc.Node = null;
    @property(cc.Node)
    gift48: cc.Node = null;
    @property(cc.Node)
    mask: cc.Node = null;
    @property(cc.Node)
    FreeButton: cc.Node = null;
    @property(cc.Node)
    WatchBtn: cc.Node = null;
    @property(cc.Node)
    ShareBtn: cc.Node = null;

    @property(cc.Node)
    redPackets: cc.Node = null;
    @property(cc.Label)
    RedPacketNum: cc.Label = null;

    @property(cc.Label)
    DiamondNumber: cc.Label = null;

    @property(cc.Node)
    GetDiamondView: cc.Node = null;

    @property(cc.Node)
    shareTips: cc.Node = null;
    shareTips_Close: cc.Node = null;
    @property(cc.Node)
    AccessToDiamonds: cc.Node = null;
    AccessToDiamonds_Close: cc.Node = null;
    AccessToDiamonds_TaskBtn: cc.Node = null;
    AccessToDiamonds_ShareBtn: cc.Node = null;

    @property(cc.Prefab)
    TaskWall: cc.Prefab = null;
    @property(cc.Node)
    panelView: cc.Node = null;

    @property(cc.Node)
    Bigpan: cc.Node = null;
    @property(cc.Node)
    Bigpan48: cc.Node = null;


    @property(cc.Node)
    Redpackte: cc.Node = null;
    @property(cc.Node)
    Bg1: cc.Node = null;
    @property(cc.Node)
    Bg2: cc.Node = null;
    @property(cc.Node)
    Redpackte_Close: cc.Node = null;
    @property(cc.Node)
    Redpackte_Waive: cc.Node = null;
    @property(cc.Node)
    Redpackte_Get: cc.Node = null;


    bonusNum: number = null;

    awardIndex: number = 0;

    public static turntableAtlas: cc.SpriteAtlas = null;

    isRotate: boolean = false;
    isRandom: boolean = false;

    shareUserBtn;
    AccessToDiamonds_shareUserBtn;

    onLoad() {
        this.shareTips_Close = cc.find("Close", this.shareTips);
        this.AccessToDiamonds_Close = cc.find("Button/Close", this.AccessToDiamonds);
        this.AccessToDiamonds_TaskBtn = cc.find("Button/TaskBtn", this.AccessToDiamonds);
        this.AccessToDiamonds_ShareBtn = cc.find("Button/ShareBtn", this.AccessToDiamonds);
    }
    AddDelegate() {
        EventManager.Instance.AddClick(this.Redpackte_Close,()=>{
            this.Redpackte.active = false;
            this.Bg1.active = true;
            this.Bg2.active = false;
        })
        EventManager.Instance.AddClick(this.Redpackte_Waive,()=>{
            this.Redpackte.active = false;
            this.Bg1.active = true;
            this.Bg2.active = false;
        })
        EventManager.Instance.AddClick(this.Redpackte_Get,()=>{
            this.Redpackte.active = false;
            this.Bg1.active = true;
            this.Bg2.active = false;
        })
        EventManager.Instance.AddListener(this.node, Config.Instance.DIAMOND, () => {
            //钻石
            this.DiamondNumber.string = GameData.Instance.GetDiamond().toString();
        })
        EventManager.Instance.AddClick(this.shareTips_Close, () => {
            this.shareTips.active = false;
        })
        EventManager.Instance.AddClick(this.AccessToDiamonds_Close, () => {
            this.AccessToDiamonds.active = false;
        })
        EventManager.Instance.AddClick(this.AccessToDiamonds_TaskBtn, () => {
            let view = cc.instantiate(this.TaskWall);
            view.parent = this.panelView;
            view.getComponent(TaskWall).AddDelegate();
        })
        EventManager.Instance.AddClick(this.AccessToDiamonds_ShareBtn, () => {
            //好友助力
            this.InviteFriends();
        })
    }

    start() {
        // Wx.Instance.hideGameClub();
        turntable.instance = this;
        this.GetDiamondView.active = false;
        this.DiamondNumber.string = GameData.Instance.GetDiamond().toString();

        GameData.Instance.GetBonusSwitch() == false ? this.Bigpan48.active = true : this.Bigpan48.active = false;
        // if (RemoteControl.Instance.switchData.share == true) {
        //     this.WatchBtn.getComponent(cc.Button).interactable = false;
        // } else {
        //     this.WatchBtn.getComponent(cc.Button).interactable = true;
        // }
        // GameData.TurntableWatchNum = Wx.Instance.localStorageGetInt(Config.Instance.TUMTABLE_WATCH_NUM, 0);
        // if (GameData.TurntableWatchNum > 3) {
        //     this.WatchBtn.getComponent(cc.Button).interactable = false;
        // } else {
        //     this.WatchBtn.getComponent(cc.Button).interactable = true;
        // }
        if (GameData.isFreeTumtable == true) {
            this.FreeButton.active = false;
        } else {
            this.FreeButton.active = true;
        }

        this.AddDelegate();

        if (Wx.Instance.wx) {
            //是否授权
            let isLogin = Wx.Instance.localStorageGetBool(Config.Instance.IsLogin, false);
            if (!isLogin) {
                let scale = window.innerWidth / 540;
                if (!this.shareUserBtn) {
                    this.shareUserBtn = Wx.Instance.wx.createUserInfoButton({
                        type: 'image',
                        image: 'https://tens-1256769450.cos.ap-shanghai.myqcloud.com/image/qunatouming.png',
                        style: {
                            width: this.ShareBtn.width * scale,
                            height: this.ShareBtn.height * scale,
                            left: (270 - this.ShareBtn.width / 2 + this.ShareBtn.x) * scale,
                            //中心点往下295像素
                            top: window.innerHeight / 2 - (this.ShareBtn.height / 2 + this.ShareBtn.y) * scale
                        },
                    });
                    console.log("style: ", this.shareUserBtn.style);
                    this.shareUserBtn.onTap((res) => {
                        NetManager.Instance.UserLogin(res, (isSuccess) => {
                            if (isSuccess) {
                                this.shareUserBtn.destroy();
                                this.shareUserBtn = null;
                            }
                        })
                    })
                }
                this.shareUserBtn.show();
            } else {
                NetManager.Instance.LoginWithoutUser((isSuccess) => {
                    console.log("登陆成功");
                });
            }
        }
    }

    IconButton() {
        Method.OpenViewNum++;

        // this.mask.active = true;
        // this.mask.runAction(cc.sequence(
        //     cc.fadeTo(0,0),
        //     cc.fadeTo(0.5,150),
        // ))
        // Wx.Instance.hideGameClub();
        this.view.active = true;
        this.award.active = false;
        this.view.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.scaleTo(0.5, 1),
        ))
        this.view.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.fadeTo(0.2, 150),
            cc.fadeTo(0.3, 255),
        ))
    }
    Close() {
        // Wx.Instance.showGameClub();
        this.view.runAction(cc.sequence(
            cc.scaleTo(0, 1),
            cc.scaleTo(0.5, 0),
        ))
        this.view.runAction(cc.sequence(
            cc.fadeTo(0, 255),
            cc.fadeTo(0.2, 150),
            cc.fadeTo(0.3, 0),
            cc.callFunc(() => {
                this.view.active = false;
                // Wx.Instance.showGameClub();
            })
        ))
        // this.mask.runAction(cc.sequence(
        //     cc.fadeTo(0,150),
        //     cc.fadeTo(0.5,0),
        //     cc.callFunc(()=>{
        //         this.mask.active = false;
        //     })
        // ))
    }
    randomNum(): number {
        let iss = [0.24, 0.08, 0.24, 0.06, 0.24, 0, 0.09, 0.05]
        let rand = Math.random();
        for (let i = 0; i < iss.length; i++) {
            if (rand < iss[i]) {
                return i;
            }
            rand -= iss[i];
        }
    }

    randomNum48(): number {
        let iss = [0.24, 0.24, 0.08, 0.06, 0.2, 0.04, 0.09, 0.05]
        let rand = Math.random();
        for (let i = 0; i < iss.length; i++) {
            if (rand < iss[i]) {
                return i;
            }
            rand -= iss[i];
        }
    }

    GetDiamondVideo() {
        GameData.TurntableWatchNum = Wx.Instance.localStorageGetInt(Config.Instance.TUMTABLE_WATCH_NUM, 0);
        if (GameData.TurntableWatchNum > 3) {
            Wx.Instance.ShowToast('今日免费次数已达到上限.');
            return;
        }
        RewardSystem.Watch((isSuccess) => {
            if (isSuccess) {
                this.GetDiamondView.active = true;
            }
        });

        // const type = RewardType.Diamond;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         this.GetDiamondView.active = true;
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("GetDiamond....fail");
        //     }
        // );
    }

    getDiamond() {
        GameData.Instance.AddDiamond(5);
        this.GetDiamondView.active = false;
        this.DiamondNumber.string = GameData.Instance.GetDiamond().toString();
    }

    InviteFriends() {
        //好友助力
        console.log("好友助力user_info: ", GameData.Instance.user_info);
        if (this.isRotate == false) {
            Wx.Instance.InvitationShare(() => {
                this.shareTips.active = true;
            }, GameData.Instance.user_info.user_id)
        }
    }

    Lottery() {
        if (this.isRotate) {
            return;
        }
        if(window.wx = null){
            this.ShareRotate();
        }
        // if (window.wx == null) {
        //     this.isRotate = true;
        //     this.pan.rotation = 0;
        //     this.ShareRotate();
        // } else {
        if (GameData.Instance.GetDiamond() >= 10) {
            console.log("消耗钻石");
            this.isRotate = true;
            this.pan.rotation = 0;
            GameData.Instance.AddDiamond(-10);
            this.DiamondNumber.string = GameData.Instance.GetDiamond().toString();
            if (GameData.Instance.GetBonus() >= 48) {
                this.ShareRotate48();
            } else {
                if (this.Bigpan48.active == false) {
                    this.ShareRotate();
                } else {
                    this.ShareRotate48();
                }
            }
        } else {
            this.AccessToDiamonds.active = true;
            if (Wx.Instance.wx) {
                //是否授权
                let isLogin = Wx.Instance.localStorageGetBool(Config.Instance.IsLogin, false);
                if (!isLogin) {
                    let scale = window.innerWidth / 720;
                    if (!this.AccessToDiamonds_ShareBtn) {
                        this.AccessToDiamonds_shareUserBtn = Wx.Instance.wx.createUserInfoButton({
                            type: 'image',
                            image: 'https://tens-1256769450.cos.ap-shanghai.myqcloud.com/image/qunatouming.png',
                            style: {
                                width: this.AccessToDiamonds_ShareBtn.width * scale,
                                height: this.AccessToDiamonds_ShareBtn.height * scale,
                                left: (270 - this.AccessToDiamonds_ShareBtn.width / 2 + this.AccessToDiamonds_ShareBtn.x) * scale,
                                //中心点往下295像素
                                top: window.innerHeight / 2 - (this.AccessToDiamonds_ShareBtn.height / 2 + this.AccessToDiamonds_ShareBtn.y) * scale
                            },
                        });
                        this.AccessToDiamonds_shareUserBtn.onTap((res) => {
                            NetManager.Instance.UserLogin(res, (isSuccess) => {
                                if (isSuccess) {
                                    this.AccessToDiamonds_shareUserBtn.destroy();
                                    this.AccessToDiamonds_shareUserBtn = null;
                                }
                            })
                        })
                    }
                    // this.AccessToDiamonds_shareUserBtn.show();
                } else {
                    NetManager.Instance.LoginWithoutUser((isSuccess) => {
                        console.log("登陆成功");
                    });
                }
            }
        }
        // if (RemoteControl.Instance.switchData.share == false) {
        //     Wx.Instance.ShowToast("分享次数不足");
        //     return;
        // }
        // Wx.Instance.share('', () => {
        //     Method.ShareIndex = 1;
        //     Method.BeforeTheShareTime = new Date().getTime();
        //     Wx.Instance.localStorageSetInt(Config.Instance.KEY_SHARE_NUM, GameData.ShareNum++)
        //     EventManager.Instance.ExcuteListener(EventMessage.instance.passShare);
        // });
        // }
    }

    ShareRotate() {
        this.isRotate = true;
        this.pan.rotation = 0;
        this.awardIndex = this.randomNum();
        console.log(this.awardIndex);
        let ratate = (360 * 5 + ((360 / 8) * this.awardIndex)) + 22.5;
        this.pan.runAction(cc.sequence(
            cc.rotateBy(2, ratate),
            // cc.rotateBy(0.5, -360 - 45 * (this.awardIndex - 1) - 20),
            cc.callFunc(() => {
                Method.OpenViewNum++;
                this.awardimg(this.awardIndex);
                this.isRotate = false;
            })
        ))
    }
    ShareRotate48() {
        this.isRotate = true;
        this.pan.rotation = 0;
        this.awardIndex = this.randomNum48();
        console.log(this.awardIndex);
        let ratate = (360 * 5 + ((360 / 8) * this.awardIndex)) + 22.5;
        this.pan.runAction(cc.sequence(
            cc.rotateBy(2, ratate),
            // cc.rotateBy(0.5, -360 - 45 * (this.awardIndex - 1) - 20),
            cc.callFunc(() => {
                Method.OpenViewNum++;
                if (this.awardIndex == 0) {
                    this.ShareRotate48();
                } else {
                    this.awardimg48(this.awardIndex);
                }
                this.isRotate = false;
            })
        ))
    }

    FreeLottery() {
        if (this.isRotate) {
            return;
        }
        this.isRotate = true;
        this.pan.rotation = 0;
        this.awardIndex = this.randomNum();
        let ratate = (360 * 5 + ((360 / 8) * this.awardIndex)) + 22.5;
        this.pan.runAction(cc.sequence(
            cc.rotateBy(2, ratate),
            // cc.rotateBy(1,-360 - 45 * (this.awardIndex-1) - 20),
            cc.callFunc(() => {
                this.awardimg(this.awardIndex);
                Wx.Instance.localStorageSetBool(Config.Instance.IS_FREE_TUMTBALE, true);
                this.isRotate = false;
            })
        ))
        this.FreeButton.active = false;
    }

    AgainRotate() {
        this.isRotate = true;
        this.pan.rotation = 0;
        this.awardIndex = this.randomNum();
        console.log("this.awardNum: ", this.awardIndex);
        let ratate = (360 * 5 + ((360 / 8) * this.awardIndex)) + 22.5;
        this.pan.runAction(cc.sequence(
            cc.rotateBy(2, ratate),
            cc.delayTime(1),
            cc.callFunc(() => {
                this.pan.rotation = 0;
                if (this.awardIndex == 0) {
                    this.isRotate = true;
                    this.AgainRotate();
                } else {
                    this.awardimg48(this.awardIndex);
                    this.isRotate = false;
                }
            })
        ))
    }

    BonusAmount() {
        this.isRandom = true;
        this.redPackets.active = true;
        let num;
        let PatchNum;

        this.redPackets.active = true;
        setTimeout(() => {
            this.RedPacketNum.node.runAction(cc.sequence(
                cc.scaleTo(0.1, 1.3),
                cc.scaleTo(0.1, 1),
            ))
            PatchNum = Math.floor((Math.random() * 10) * 100) / 100;
            this.RedPacketNum.string = PatchNum.toString() + "元";
        }, 0.2, 15, 0)
        setTimeout(() => {
            this.RedPacketNum.node.runAction(cc.sequence(
                cc.scaleTo(0.4, 1.8),
                cc.scaleTo(0.1, 1),
            ))
            this.bonusNum = num = Math.floor((Math.random() * 0.5 + 0.5) * 100) / 100;
            this.RedPacketNum.string = num.toString() + "元";
            GameData.Instance.AddBonuse(num);
            this.isRandom = false;
        }, 3600);
    }

    awardimg(index) {
        if (index == 0) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("hongbao");
        }
        else if (index == 1) {
            this.jinbi.node.active = false;
            this.gift.active = true;
            this.gift48.active = false;
        }
        else if (index == 2) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("hongbao");
        }
        else if (index == 3) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("zuanshi_5");
        }
        else if (index == 4) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("hongbao");
        }
        // else if (index == 5) {
        //     this.jinbi.node.active = true;
        //     this.gift.active = false;
        //     this.gift48.active = false;
        //     this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("hongbao");
        // }
        else if (index == 6) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("jinbi_1000");
        }
        else if (index == 7) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("zuanshi_15");
        } else {
            console.log("awardIndex...fail");
        }
        this.award.active = true;
    }

    awardimg48(index) {
        if (index == 1) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("zuanshi_10");
        }
        else if (index == 2) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("jinbi_1000");
        }
        else if (index == 3) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("zuanshi_5");
        }
        else if (index == 4) {
            //谢谢惠顾
        }
        else if (index == 5) {
            this.jinbi.node.active = false;
            this.gift.active = false;
            this.gift48.active = true;
        }
        else if (index == 6) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("jinbi_1000");
        }
        else if (index == 7) {
            this.jinbi.node.active = true;
            this.gift.active = false;
            this.gift48.active = false;
            this.jinbi.spriteFrame = turntable.turntableAtlas.getSpriteFrame("zuanshi_15");
        } else {
            console.log("awardIndex...fail")
        }
    }

    receive() {
        this.award.active = false;
        console.log("this.awardIndex: ", this.awardIndex);
        if (this.awardIndex == 0) {
            // GameData.Instance.AddGameMoney(50);
            this.redPackets.active = true;
        }
        else if (this.awardIndex == 1) {
            // GameData.Instance.AddGameMoney(100);
            this.award.active = false;
            this.redPackets.active = true;
            GameData.Instance.AddDiamond(10);
            this.DiamondNumber.string = GameData.Instance.GetDiamond().toString();
        }
        else if (this.awardIndex == 2) {
            // GameData.Instance.AddGameMoney(200);
            this.redPackets.active = true;
        }
        else if (this.awardIndex == 3) {
            GameData.Instance.AddDiamond(5);
            this.DiamondNumber.string = GameData.Instance.GetDiamond().toString();
            // GameData.Instance.AddGameMoney(500);
        }
        else if (this.awardIndex == 4) {
            // GameData.Instance.AddGameMoney(1000);
            this.redPackets.active = true;
        }
        else if (this.awardIndex == 6) {
            GameData.Instance.AddGameMoney(1000);
        }
        else if (this.awardIndex == 7) {
            GameData.Instance.AddDiamond(15);
            this.DiamondNumber.string = GameData.Instance.GetDiamond().toString();
            // GameData.Instance.AddGameMoney(30);
        }
    }
    // update (dt) {}
}
