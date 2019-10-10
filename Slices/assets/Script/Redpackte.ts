const {ccclass, property} = cc._decorator;
import GameData from './GameData';
import Wx from './Wx/Wx';
import Config from './tool/model/Config';
import ShareLimit from './common/ShareTheLimit';
import { RewardType, RewardSystem, GetRewardType } from './Game/tool/RewardSystem';

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    Bg1: cc.Node = null;
    @property(cc.Node)
    Bg2: cc.Node = null;
    @property(cc.Label)
    number: cc.Label = null;

    bonusNum: number = 0;
    isRandom: boolean = false;

    // onLoad () {}

    start () {
        // Wx.Instance.hideGameClub();
        this.Bg1.active = true;
        this.Bg2.active = false;
    }

    Close(){
        if (this.isRandom == true){
            return;
        }
        this.Bg1.active = true;
        this.Bg2.active = false;
        // Wx.Instance.showGameClub();
        this.node.active = false;
    }
    
    /**
     * 领取更多
     */
    ToGetMore(){
        if (this.isRandom == true){
            return;
        }
        if(window.wx == undefined){
            console.log("window");
            GameData.Instance.AddBonuse(this.bonusNum);
            this.node.active = false;
            return;
        }
        RewardSystem.ShareAndWatch((isSuccess) => {
            if (isSuccess) {
                GameData.Instance.AddBonuse(this.bonusNum);
                this.node.active = false;
            }
        });
        this.Bg1.active = true;
        this.Bg2.active = false;
        // const type = RewardType.Bonus;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         GameData.Instance.AddBonuse(this.bonusNum);
        //         this.node.active = false;
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("ToGetMore....fail");
        //     }
        // );
    }
    //开启
    Open(){
        if(window.wx == undefined){
            console.log("window");
            this.BonusAmount();
            Wx.Instance.localStorageSetInt(Config.Instance.EVERYDAY_BONUS,1);
            return;
        }
        RewardSystem.Watch((isSuccess) => {
            if (isSuccess) {
                this.BonusAmount();
                Wx.Instance.localStorageSetInt(Config.Instance.EVERYDAY_BONUS,1);
            }
        });

        // const type = RewardType.Bonus;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         this.BonusAmount();
        //         Wx.Instance.localStorageSetInt(Config.Instance.EVERYDAY_BONUS,1);
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("openBonus....fail");
        //     }
        // );
    }

    TurntableOpen(){
        if(window.wx == undefined){
            console.log("window");
            this.BonusAmount();
            Wx.Instance.localStorageSetInt(Config.Instance.EVERYDAY_BONUS,1);
            return;
        }
        RewardSystem.ShareAndWatch((isSuccess) => {
            if (isSuccess) {
                this.BonusAmount();
                Wx.Instance.localStorageSetInt(Config.Instance.EVERYDAY_BONUS,1);
            }
        });
    }

    //放弃
    Waive(){
        if (this.isRandom == true){
            return;
        }
        this.node.active = false;
    }

    BonusAmount() {
        this.isRandom = true;
        this.Bg1.active = false;
        this.Bg2.active = true;
        let num;
        let PatchNum;

        this.schedule(() => {
            this.number.node.runAction(cc.sequence(
                cc.scaleTo(0.1, 1.3),
                cc.scaleTo(0.1, 1),
            ))
            PatchNum = Math.floor((Math.random() * 10) * 100) / 100;
            this.number.string = PatchNum.toString() + "元";
            console.log("PatchNum: ",PatchNum);
        }, 0.2, 15, 0)
        setTimeout(() => {
            this.number.node.runAction(cc.sequence(
                cc.scaleTo(0.4, 1.8),
                cc.scaleTo(0.1, 1),
            ))
            this.bonusNum = num = Math.floor((Math.random() * 0.5 + 0.5) * 100) / 100;
            this.number.string = num.toString() + "元";
            GameData.Instance.AddBonuse(num);
            this.isRandom = false;
            Wx.Instance.localStorageSetInt(Config.Instance.EVERYDAY_BONUS, 1);
            console.log("num: ",num);
        }, 3600);
    }

    // update (dt) {}
}
