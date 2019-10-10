
import GameData from './GameData';
import Wx from './Wx/Wx';
import GameHelper from './GameHelper';
import Method from './Method';
import EventManager from './tool/common/EventManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class WithdrawMoneyView extends cc.Component {

    @property(cc.Node)
    Tips: cc.Node = null;
    @property(cc.Label)
    number: cc.Label = null;
    @property(cc.Node)
    Turntable: cc.Node = null;
    @property(cc.Node)
    StrategyBtn: cc.Node = null;
    @property(cc.Node)
    ActivityRulesBtn: cc.Node = null;
    @property(cc.Node)
    StrategyView: cc.Node = null;
    @property(cc.Node)
    Strategy_Close: cc.Node = null;
    @property(cc.Node)
    ActivityRulesView: cc.Node = null;
    @property(cc.Node)
    ActivityRules_Close: cc.Node = null;
    @property(cc.Node)
    ActivityRules_WithdrawBtn: cc.Node = null;

    // onLoad () {}

    start () {
        this.Tips.active = false;
        this.number.string = '￥' + GameHelper.Instance.keepTwoDecimalFull(GameData.Instance.GetBonus());
        this.AddDelegate();
    }

    AddDelegate(){
        EventManager.Instance.AddClick(this.StrategyBtn,()=>{
            this.StrategyView.active = true;
        })
        EventManager.Instance.AddClick(this.ActivityRulesBtn,()=>{
            this.ActivityRulesView.active = true;
        })
        EventManager.Instance.AddClick(this.Strategy_Close,()=>{
            this.StrategyView.active = false;
        })
        EventManager.Instance.AddClick(this.ActivityRules_Close,()=>{
            this.ActivityRulesView.active = false;
        })
        EventManager.Instance.AddClick(this.ActivityRules_WithdrawBtn,()=>{
            this.StrategyView.active = true;
        })
    }

    Close(){
        // Wx.Instance.showGameClub();
        this.node.active = false;
        this.Turntable.active = true;
    }

    WithdrawTips(){
        Method.OpenViewNum++;
        this.Tips.active = true;
    }

    TipsClose(){
        // Wx.Instance.showGameClub();
        this.Tips.active = false;
    }
    // update (dt) {}
}
