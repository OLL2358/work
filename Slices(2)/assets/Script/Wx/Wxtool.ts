import Config from './../tool/model/Config';
import Wx from './Wx';
import GameData from '../GameData';
// var ws = require('../../sdk/ws.min');

export default class WxTool {
    private static instance: WxTool = null;
    public static get Instance(): WxTool {
        if (this.instance == null) {
            this.instance = new WxTool();
        }
        return this.instance;
    }
    public static user_info = null;
    /*拿到用户的头像跟名称 用于界面显示*/
    public UserheadURL: string = null;
    public Username: string = null;

    /**用户openid */
    public openid: string = "";

    public watchAdId: number = 0;
    public chargerType: number = 0;

    private shareStringArray: Array<string> = null;
    private shareImageUrlArray: Array<string> = null;

    private shareData: any[] = [];

    private shareIdArray: Array<string> = null;

    /**
     * 分享统计
     * @param pos 分享点
     * @param title 标题
     * @param image 图片
     */
    public ShareRecord(pos: string, title: string, image: string) {
        return;

        // try {
        //     ws.share({
        //         pos: pos,
        //         title: title,
        //         imageUrl: image
        //     })
        // } catch (err) {
        //     Utility.error(err);
        // }
    }


    public GetShareImageUrl(index: number) {
        if (!this.shareData[index])
            return '';
        return this.shareData[index].img;
    }

    public SaveShareData(datas: any[]) {
        this.shareData = datas;

        Wx.Instance.wx.aldOnShareAppMessage(() => {
            let shareNum = Math.floor(cc.random0To1() * this.GetShareLenth());
            return {
                title: this.GetShareTitle(shareNum),
                imageUrl: this.GetShareImageUrl(shareNum),
            }
        })
    }

    public GetShareLenth() {
        if (!this.shareData)
            return 0;
        return this.shareData.length;
    }
    public OnEvent(event: string, key: string, value: string) {
        // ======================================
        // if (window.wx != undefined) {
        //     wx.aldSendEvent(event, { [key]: value })
        // }
        // ======================================
    }

    public getShareIdArray() {
        return this.shareIdArray;
    }

    public setShareIdArray(array) {
        this.shareIdArray = array;
    }

    public getLastShareTime() {
        return Wx.Instance.localStorageGet(Config.Instance.KEY_SHARE_TIME, '');
    }
    public setLastShareTime(time) {
        Wx.Instance.localStorageSet(Config.Instance.KEY_SHARE_TIME, time);
    }
    public GetShareTitle(index: number): string {
        if (!this.shareData[index])
            return '';
        return this.shareData[index].share_title;
    }
    public isExistShareId(shareId: string): boolean {

        for (let i = this.shareIdArray.length - 1; i >= 0; i--) {

            if (shareId == this.shareIdArray[i]) {
                return true;
            }
        }
        this.shareIdArray.push(shareId);
        Wx.Instance.localStorageSet(Config.Instance.KEY_SHARE_ID_ARRAY, this.shareIdArray.join(','));
        return false;
    }


    public init() {
        /*初始化*/
        this.shareIdArray = new Array();

        this.shareStringArray = [
            '矿工穷光棍突然提车娶妻，一夜暴富的秘籍竟然是靠…',
            /* '当年唯一存活的矿工，醒来后说出在矿井深处发生的事情，竟然是…',*/
        ];

        this.shareImageUrlArray = [
            'https://idleminer-1256769450.cos.ap-shanghai.myqcloud.com/share/share0.png',
            /* 'https://idleminer-1256769450.cos.ap-shanghai.myqcloud.com/share/share1.png',*/
        ];
        Date.prototype.format = function (format) {
            var o = {
                "M+": this.getMonth() + 1, /*month*/
                "d+": this.getDate(),    /*day*/
                "h+": this.getHours(),   /*hour*/
                "m+": this.getMinutes(), /*minute*/
                "s+": this.getSeconds(), /*second*/
                "q+": Math.floor((this.getMonth() + 3) / 3),  /*quarter*/
                "S": this.getMilliseconds() /*millisecond*/
            }
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        }

        let date = this.getLastShareTime();
        let curDate = new Date().format('yyyy-MM-dd');

        if (date == curDate) {
            console.log('initDatas', '相等');

            let shareIdStr = Wx.Instance.localStorageGet(Config.Instance.KEY_SHARE_ID_ARRAY, '');
            if (shareIdStr != '') {
                this.shareIdArray = shareIdStr.split(',');
            } else {
                this.shareIdArray = new Array<string>();
            }
        } else {
            console.log('initDatas', '不相等');
            console.log('data:', date, 'curDate:', curDate);
            Wx.Instance.localStorageSet(Config.Instance.KEY_SHARE_ID_ARRAY, ''); //不是同一天的话 重置分享数组
            Wx.Instance.localStorageSetInt(Config.Instance.KEY_VIDEO_NUM, 0);   //不是同一天的话 重置视频次数
            Wx.Instance.localStorageSetInt(Config.Instance.KEY_SHARE_NUM, 0);   //不是同一天的话 重置分享次数
            Wx.Instance.localStorageSetInt(Config.Instance.IS_SIGN, 0);   //不是同一天的话 重置签到次数
            Wx.Instance.localStorageSetInt(Config.Instance.IS_FREE_TUMTBALE, 0);   //不是同一天的话 重置免费转盘次数
            Wx.Instance.localStorageSetInt(Config.Instance.TUMTABLE_WATCH_NUM, 0);   //不是同一天的话 重置分享转盘次数
            Wx.Instance.localStorageSetInt(Config.Instance.EVERYDAY_BONUS, 0);   //不是同一天的话 重置每日红包
            Wx.Instance.localStorageSetInt(Config.Instance.FreeDiamondNum, 0);   //不是同一天的话 重置免费钻石领取次数
            Wx.Instance.localStorageSetInt(Config.Instance.DiamondChangingFreeDiamondNum, 0);   //不是同一天的话 重置兑换钻石界面免费钻石领取次数
            Wx.Instance.localStorageSetInt(Config.Instance.PlayingFreeDiamond, 0);   //不是同一天的话 重置游戏中的免费钻石
            
            if(Wx.Instance.localStorageGetInt(Config.Instance.SIGN_NUM, 0) == 7){   //签到够七天，重置签到
                Wx.Instance.localStorageSetInt(Config.Instance.SIGN_NUM, 0)
            }

            this.setLastShareTime(curDate);
            this.setShareIdArray(new Array<string>());
        }
        GameData.Instance.init();
    }
}
