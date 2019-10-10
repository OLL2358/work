// Learn TypeScript:
import EventManager from './../../../tool/common/EventManager';
import GameData from './../../../GameData';
import Wx from './../../../Wx/Wx';
import { RewardSystem } from '../../../Game/tool/RewardSystem';
import Config from './../../../tool/model/Config';
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoneyChanging extends cc.Component {

    @property(cc.Node)
    Changing: cc.Node = null;
    @property(cc.Node)
    Cancel: cc.Node = null;
    @property(cc.Prefab)
    TipsPanel: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Changing = cc.find("Button/Changing",this.node)
        this.Cancel = cc.find("Button/Cancel",this.node)
    }

    start () {
        this.AddDelegate()
    }

    //提示界面
    Tips(Text: string){
        GameData.Instance.SetTipsText(Text);
        let View = cc.instantiate(this.TipsPanel);
        View.parent = this.node.parent;
    }

    AddDelegate(){
        EventManager.Instance.AddClick(this.Changing,()=>{
            if(GameData.Instance.GetDiamond() >= 1){
                GameData.Instance.AddDiamond(-1);
                GameData.Instance.AddGameMoney(100);
                this.Tips("恭喜获得100金币！");
            }else{
                if(Wx.Instance.localStorageGetInt(Config.Instance.DiamondChangingFreeDiamondNum,0) >= 3){
                    this.Tips("今天免费钻石领取次数已用完");
                }else{
                    RewardSystem.ShareAndWatch((isSuccess)=>{
                        if(isSuccess){
                            GameData.Instance.AddDiamond(5);
                            this.Tips("恭喜获得5钻石！");
                            let num = Wx.Instance.localStorageGetInt(Config.Instance.DiamondChangingFreeDiamondNum,0);
                            num++;
                            Wx.Instance.localStorageSetInt(Config.Instance.DiamondChangingFreeDiamondNum,num);
                        }
                    })
                }
            }
        })
        EventManager.Instance.AddClick(this.Cancel,()=>{
            this.node.destroy();
        })
    }

    // update (dt) {}
}
