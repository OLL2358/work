
// import ADData from "../../datas/DataManager/ADData";
// import EventManager from "../../tool/common/EventManager";
// import TimerManager from "../../game/manager/TimerManager";
// import Wx from "../../tool/wx/Wx";
import EventManager from './../tool/common/EventManager';
import Wx from './../Wx/Wx';
import ADData from './../ADData';
import TimerManager from './TimerManager';

/**
 * 广告item
 */
export default class ADItem {
    node: cc.Node;
    icon: cc.Sprite;
    Name: cc.Label;
    adData;
    index = [];
    IndexNum: number;
    curid: number;

    randomName: string;
    constructor(node: cc.Node) {
        this.node = node;
        this.icon = cc.find('Mask/Icon', node).getComponent(cc.Sprite);
        let nameNode = node.getChildByName('Name');
        if (nameNode)
            this.Name = nameNode.getComponent(cc.Label);
    }

    AddDalegate() {
        EventManager.Instance.AddClick(this.node, () => {
            console.log("mode: ", this.adData.mode)
            if (this.adData.mode == 'link') {
                Wx.Instance.More(this.adData.appId, this.adData.path);
            } else if (this.adData.mode == 'image') {
                Wx.Instance.openImage(this.adData.imageUrl);
            }
        });
    }

    UpdateIcon(id: number) {
        //找到广告id对应 广告索引
        this.curid = id;
        let itemIndex = ADData.instance.NewAdData.ad_info.findIndex(a => a.id == id);
        this.node.active = true;
        if (itemIndex == -1) {
            this.node.active = false;
            this.curid = null;
            console.log('id 不存在', id);
            return;
        }
        // this.icon.spriteFrame = GamePrefabs.Instance.IconAtlas.getSpriteFrame(this.adData.appIcon);
        cc.loader.load({ url: this.adData.appIcon, type: "png" }, (err, res) => {
            if (err) {
                console.error("UpdateIcon fail 。。。");
                setTimeout(() => {
                    if (this.curid != null) {
                        this.UpdateIcon(this.curid);
                        console.log("重新加载");
                    }
                }, 500);
                return;
            }
            this.icon.spriteFrame = new cc.SpriteFrame(res);
        })
        if (this.Name)
            this.Name.string = this.adData.appName;
    }
    /**
     * @param name 来源名称
     */
    UpdateRandom(name: string) {
        this.randomName = name;
        this.index = ADData.instance.NewAdData.icon_carousel;
        this.IndexNum = 0;
        this.UpdateIcon(this.index[this.IndexNum]);
        this.IndexNum = (this.IndexNum + 1) % this.index.length;
        // this.UpdateIcon(this.index[a]);
        TimerManager.instance.CreateTimer('UpdateIcon' + name, () => {
            this.UpdateIcon(this.index[this.IndexNum]);
            this.IndexNum = (this.IndexNum + 1) % this.index.length;
        }, 5);
    }

    RemoveDelegate() {
        EventManager.Instance.RemoveClick(this.node);
        if (this.randomName)
            TimerManager.instance.RemoveTimer('UpdateIcon' + this.randomName);
    }
}
