
import EventManager from './../tool/common/EventManager';
import Wx from './../Wx/Wx';
import ADData from './../ADData';
import Utility from './../common/Utility';

/**
 * banner item
 */
export default class BannerItem {
    node: cc.Node;
    Img: cc.Sprite;
    data;
    curindex: number;

    constructor(node: cc.Node) {
        this.node = node;
        this.Img = cc.find('Img', node).getComponent(cc.Sprite);
        EventManager.Instance.AddClick(this.node, () => {
            if (this.data.mode == 'link') {
                Wx.Instance.More(this.data.appId, this.data.path);
            } else if (this.data.mode == 'image') {
                Wx.Instance.openImage(this.data.imageUrl);
            }
        });
    }

    AddDelegate() {
        EventManager.Instance.AddClick(this.node, () => {
            if (this.data.mode == 'link') {
                Wx.Instance.More(this.data.appId, this.data.path);
            } else if (this.data.mode == 'image') {
                Wx.Instance.openImage(this.data.imageUrl);
            }
        });
    }

    RemoveDelegate() {
        EventManager.Instance.RemoveClick(this.node);
    }

    UpdateItem(index: number) {
        this.curindex = index;
        let itemIndex = ADData.instance.NewAdData.ad_info.findIndex(a => a.id == ADData.instance.NewAdData.more_game[index]);
        this.node.active = true;
        if (itemIndex == -1) {
            this.node.active = false;
            this.curindex = null;
            console.log('id 不存在', ADData.instance.NewAdData.more_game[index]);
            return;
        }
        this.data = ADData.instance.NewAdData.ad_info[itemIndex];
        cc.loader.load(this.data.appIcon, (err, res) => {
            if (err) {
                Utility.error(err);
                setTimeout(() => {
                    if (this.curindex != null)
                        this.UpdateItem(this.curindex);
                }, 500);
                return;
            }
            this.Img.spriteFrame = new cc.SpriteFrame(res);
        })
    }
}
