import SelfBanner from "./SelfBanner";

/**
 * 自家广告管理类
 */
export default class SelfADManager {
    static bannerAd: SelfBanner;
    public static ShowBanner() {
        if (!this.bannerAd || !this.bannerAd.node.isValid) {
            if(this.bannerAd)
                this.bannerAd.onDestroy();
            //获取画布,可根据项目修改
            let Canvas = cc.find('Canvas');
            let node = new cc.Node();
            node.parent = Canvas;
            this.bannerAd = new SelfBanner(node);
        }
        this.bannerAd.node.setSiblingIndex(9999);
        this.bannerAd.Show();
    }

    public static HideBanner() {
        if (this.bannerAd)
            this.bannerAd.Hide();
    }
}
