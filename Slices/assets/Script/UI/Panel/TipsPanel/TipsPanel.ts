
import GameData from './../../../GameData';
import EventManager from './../../../tool/common/EventManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    Text: cc.Label = null;
    @property(cc.Node)
    Close: cc.Node = null;

    // onLoad () {}

    start () {
        this.Text.string = GameData.Instance.GetTipsText()
        this.AddDelegate();
    }

    AddDelegate(){
        EventManager.Instance.AddClick(this.Close, ()=>{
            GameData.Instance.SetTipsText(null);
            this.node.destroy();
        })
    }

    // update (dt) {}
}
