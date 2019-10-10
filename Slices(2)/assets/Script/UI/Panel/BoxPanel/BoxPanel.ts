
import ADItem from './../../../AD/ADItem';
import EventManager from '../../../tool/common/EventManager';
import Wx from './../../../Wx/Wx';
import ADData from '../../../ADData';
import Method from './../../../Method';
const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxPanel extends cc.Component {

    private BoxsItem: ADItem[] = [];
    private Close: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        for (let i = 0; i < 15; i++) {
            this.BoxsItem.push(new ADItem(cc.find('Box/Icon' + i, this.node)));
        }
        this.Close = cc.find("Close", this.node);
    }

    start() {
        for (let i = 0; i < this.BoxsItem.length; i++) {
            this.BoxsItem[i].UpdateIcon(ADData.instance.NewAdData.more_game[i]);
        }
        Wx.Instance.hideBanner();
        this.AddDelegate()
    }

    //添加监听 点击 事件
    public AddDelegate() {
        this.Close.on(cc.Node.EventType.TOUCH_END,()=>{
            this.node.destroy();
            Method.instance.boxpanel = null;
            this.Close.off(cc.Node.EventType.TOUCH_END,null);
            Wx.Instance.ShowBanner();
            for (let i = 0; i < this.BoxsItem.length; i++) {
                this.BoxsItem[i].RemoveDelegate();
            }
        })
        for (let i = 0; i < this.BoxsItem.length; i++) {
            this.BoxsItem[i].AddDalegate();
        }
    }

    // update (dt) {}
}
