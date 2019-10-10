
import Wx from "../wx/Wx";
import SelfAdData from "./BannerData";
import Utility from "../common/Utility";
import EventManager from './../tool/common/EventManager';
import NetManager from './../common/NetManager';
/**
 * 触电自家banner
 */
export default class SelfBanner {
    node: cc.Node;
    sprite: cc.Sprite;
    data: { appId: string, image: string };
    index: number = 0;
    myTimeOut;
    constructor(node: cc.Node) {
        this.node = node;
        this.sprite = node.addComponent(cc.Sprite);
        this.node.anchorY = 0;
        node.width = 720;
        node.height = 250;
        node.scale = 0.75;
        node.y = -498;
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        EventManager.Instance.AddClick(this.node, () => {
            if (this.data) {
                Wx.Instance.More(this.data.appId);
                NetManager.Instance.adStatistics(4,()=>{})
            }
        });
    }

    public Show() {
        this.data = SelfAdData.bannerDatas[this.index];//Math.floor(Math.random() * SelfAdData.bannerDatas.length)
        cc.loader.load({ "url": SelfAdData.bannerDatas[this.index].image, type: 'jpg' }, (err, res) => {
            if (err)
                Utility.error('banner url is not image', this.data.image);
            else {
                this.sprite.spriteFrame = new cc.SpriteFrame(res);
            }
        });
        this.node.active = true;

        this.myTimeOut = setTimeout(() => {
            this.index = (this.index + 1) % SelfAdData.bannerDatas.length;
            if (this.node && this.node.active)
                this.Show();
        }, 120000 / SelfAdData.bannerDatas.length);
    }

    public Hide() {
        this.node.active = false;
    }

    public onDestroy() {
        clearTimeout(this.myTimeOut);
    }
}
