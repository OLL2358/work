
import PlayGameItem from './PlayGameItem';
import EventManager from './../../../tool/common/EventManager';
import Wx from './../../../Wx/Wx';
const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskWall extends cc.Component {

    playItems: PlayGameItem[] = [];
    Close: cc.Node;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let temp = cc.find("ScrollView/view/content", this.node);
        for (let index = 0; index < temp.childrenCount; index++) {
            this.playItems.push(new PlayGameItem(cc.find('frame' + index, temp)));
        }
        this.Close = cc.find("Close", this.node);
    }

    start() {
        // Wx.Instance.hideGameClub();
        for(let i = 0; i<this.playItems.length;i++){
            this.playItems[i].UpdateItem(i);
        }
    }

    public AddDelegate(){
        EventManager.Instance.AddClick(this.Close, () => {
            // Wx.Instance.showGameClub();
            this.node.destroy();
            //移除监听
            for(let i = 10; i< this.playItems.length; i++){
                this.playItems[i].RemoveDelegate();
            }
        })
        for (let index = 0; index < this.playItems.length; index++) {
            this.playItems[index].AddDelegate();
        }
    }

    // update (dt) {}
}
