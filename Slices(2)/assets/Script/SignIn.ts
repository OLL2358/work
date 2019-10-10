const { ccclass, property } = cc._decorator;
import Wx from './Wx/Wx';
import GameData from './GameData';
import Config from './tool/model/Config';
import { RewardType, GetRewardType, RewardSystem } from './Game/tool/RewardSystem';
import EventManager from './tool/common/EventManager';
import Method from './Method';
import ShareLimit from './common/ShareTheLimit';
@ccclass
export default class SignIn extends cc.Component {
    private static instance: SignIn;
    public static get Instance(): SignIn {
        return this.instance;
    }

    @property(cc.Node)
    View: cc.Node = null;
    @property(cc.Button)
    signinbutton: cc.Button = null;
    @property(cc.Node)
    Award: cc.Node = null;

    Day1: cc.Button = null;
    Day2: cc.Button = null;
    Day3: cc.Button = null;
    Day4: cc.Button = null;
    Day5: cc.Button = null;
    Day6: cc.Button = null;
    Day7: cc.Button = null;

    /**当天奖励金币的数值 */
    MoneyNum: number = 0;

    onLoad() {
        SignIn.instance = this;
    }

    start() {
        // Wx.Instance.hideGameClub();
        this.check();
        this.Award.active = false;
        this.mark();
    }

    signin() {
        if (GameData.isSignin == 0) {
            GameData.signNum++;
            GameData.isSignin = 1;
            Wx.Instance.localStorageSetInt(Config.Instance.SIGN_NUM, GameData.signNum);
            Wx.Instance.localStorageSetInt(Config.Instance.IS_SIGN, GameData.isSignin);
            Wx.Instance.localStorageSetInt(Config.Instance.SIGN_TIME, new Date().getTime());
            console.log("签到完成");
            cc.find("sign/qiandao", this.View).active = false;
            cc.find("sign/yiqiandao", this.View).active = true;
            this.check();
            let Money = cc.find("Money/number", this.Award).getComponent(cc.Label);
            Money.string = this.MoneyNum.toString();
            this.Award.active = true;
        } else {
            console.log("已签到");
        }
    }

    check() {

        if (GameData.isSignin == 1) {
            this.signinbutton.interactable = false;
            cc.find("sign/qiandao", this.View).active = false;
            cc.find("sign/yiqiandao", this.View).active = true;
        } else {
            this.signinbutton.interactable = true;
            cc.find("sign/qiandao", this.View).active = true;
            cc.find("sign/yiqiandao", this.View).active = false;
        }
        for (let i = 0; i < GameData.signNum; i++) {
            let fruits = cc.find(`SumDay/Day${i + 1}/fruits`, this.View);
            let BroughtOut = cc.find(`SumDay/Day${i + 1}/BroughtOut`, this.View);
            fruits.active = false;
            BroughtOut.active = true;
        }
        switch (GameData.signNum) {
            case 1:
                this.MoneyNum = 10;
                break;
            case 2:
                this.MoneyNum = 20;
                break;
            case 3:
                this.MoneyNum = 30;
                break;
            case 4:
                this.MoneyNum = 50;
                break;
            case 5:
                this.MoneyNum = 100;
                break;
            case 6:
                this.MoneyNum = 200;
                break;
            case 7:
                this.MoneyNum = 300;
                break;
            default:
                break;
        }
    }

    getAward() {
        Wx.Instance.OnEvent("首页", "功能", "普通领取");

        GameData.Instance.AddGameMoney(this.MoneyNum);
        Wx.Instance.ShowToast(`恭喜你获得了${this.MoneyNum}金币！`);
        this.Award.active = false;
        EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
    }

    mark() {
        if (ShareLimit.CanWatchVideo()) {
            cc.find("lingqu_2/mark/share", this.Award).active = false;
            cc.find("lingqu_2/mark/vidoe", this.Award).active = true;
        } else if (ShareLimit.CanShare()) {
            cc.find("lingqu_2/mark/share", this.Award).active = true;
            cc.find("lingqu_2/mark/vidoe", this.Award).active = false;
        } else {
            cc.find("lingqu_2/mark/share", this.Award).active =
                cc.find("lingqu_2/mark/vidoe", this.Award).active = false;
        }
    }

    getDoubleAward() {
        RewardSystem.ShareAndWatch((isSuccess) => {
            if (isSuccess) {
                this.mark();
                Wx.Instance.OnEvent("首页", "功能", "双倍领取成功");

                GameData.Instance.AddGameMoney(this.MoneyNum * 2);
                Wx.Instance.ShowToast(`恭喜你获得了${this.MoneyNum * 2}金币！`);
                this.Award.active = false;
                Method.OpenViewNum++;
                EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
            }
        });

        // const type = RewardType.Money;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         Wx.Instance.OnEvent("首页","功能","双倍领取成功");

        //         GameData.Instance.AddGameMoney(this.MoneyNum * 2);
        //         Wx.Instance.ShowToast(`恭喜你获得了${this.MoneyNum * 2}金币！`);
        //         this.Award.active = false;
        //         Method.OpenViewNum++;
        //         EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("getDoubleAward...fail")
        //     }
        // );
    }

    close() {
        // Wx.Instance.showGameClub();
        this.View.runAction(cc.sequence(
            cc.fadeTo(0, 255),
            cc.fadeTo(0.3, 0),
        ))
        this.View.runAction(cc.sequence(
            cc.scaleTo(0, 0.7),
            cc.scaleTo(0.3, 0),
            cc.callFunc(() => {
                this.View.active = false;
            })
        ))
    }


}
