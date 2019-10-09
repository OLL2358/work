import Config from "../tool/model/Config";
import { GetRewardType } from "../game/tool/RewardSystem";
import RemoteControl from "../Game/tool/RemoteCtrl";
import Wx from './../Wx/Wx';
import Utility from './Utility';

export default class ShareLimit extends cc.Component {

    private static isReviewSuccess: boolean = false;

    private static myLocation: string;
    private static serverLocation: string[] = ['广州'];
    private static isCanShare: boolean = null;
    private static shareDate: string = '1,2,3,4,5';
    private static shareTimeList: string[] = ['7-22'];
    private static isNeedLog: boolean = true;
    public static watchNum: number = 6;/*视频次数,从后台获得*/
    public static shareNum: number = 10;/*分享次数,从后台获得*/

    private static shareCallback = null;
    private static sharetime = 0;
    private static CheckGroup: boolean;

    private static tryPlayCallback = null;
    private static tryPlayData = null;
    private static tryPlayTime = 0;

    public static SetShareTime(shareDate: string, shareTime: string) {
        this.shareDate = shareDate == null ? '' : shareDate;
        this.shareTimeList = shareTime == null ? [] : shareTime.split(',');
    }

    public static SetGroupShare(canShareGroup: boolean) {
        /* this.canShareGroup = canShareGroup;*/
    }

    /*查看分享限制*/
    public static ShareTheLimit(): boolean {
        if (this.isCanShare != null)
            return this.isCanShare;
        if (this.serverLocation.length == 0)
            return this.CheckTime();
        console.log(this.myLocation);
        console.log(this.serverLocation);
        for (let i = 0; i < this.serverLocation.length; i++) {
            if (this.myLocation.includes(this.serverLocation[i])) {
                return this.isCanShare = this.CheckTime();
            }
        }
        return this.isCanShare = false;
    }


    public static setNeedLog(isNeed: boolean) {
        this.isNeedLog = isNeed;
    }


    //服务器时间
    private static GetTime(): number {
        // return GameData.Instance.serverTime;
    }



    public static SetServerLocation(location: string) {
        if (location == null || location == '')
            this.serverLocation = [];
        else
            this.serverLocation = location.split(',');
    }

    public static setIsReviewSuccess(isSuccess: boolean) {
        this.isReviewSuccess = isSuccess;
    }


    /*查看当前观看次数是否已达到上限*/
    public static CheckWatchVideoNum(): boolean {
        console.log('当前观看次数=' + this.getWatchVideoNum() + ',设置的次数=' + this.watchNum);
        return this.getWatchVideoNum() < this.watchNum;
    }
    public static CheckShareNum(): boolean{
        console.log('当前分享次数=' + this.getShareNum() + ',设置的次数=' + this.shareNum);
        return this.getShareNum() < this.shareNum;
    }

    public static SetMyLocation(location: string) {
        /* console.log("mylocation is " + location);*/
        this.myLocation = location;
    }

    public static getNeedLog(): boolean {
        return this.isNeedLog;
    }

    /**delete */
    /**
     * 查看奖励发放类型 0:分享 1:视频 2:看完视频且没有分享
     */
    public static RewardSendType(): number {
        // if (this.getIsReviewSuccess()) {
        //     if (this.ShareTheLimit()) {
        //         if (this.CheckWatchVideoNum()) {
        //             return 1;
        //         } else {/*关卡视频次数达到上限*/
        //             return 0;
        //         }
        //     } else {
        //         return 0;
        //     }

        // } else {
        //     if (this.CheckWatchVideoNum())
        //         return 1;
        //     else {/*关卡视频次数达到上限*/
        //         return 2;
        //     }
        // }

        const method = RemoteControl.Instance.getRewardMethod();

        if (method == GetRewardType.Share) {
            return 0;
        } else if (method == GetRewardType.Video) {
            return 1;
        } else {
            return 2;
        }
    }
    /**
     * 获取是否可以分享
     */
    public static CanShare(): boolean {
        return RemoteControl.Instance.switchData.share;
    }

    public static CanWatchVideo() {
        return RemoteControl.Instance.switchData.video && this.getWatchVideoNum() < RemoteControl.Instance.switchData.video_number;
    }

    /**
     * 获取当前已观看视频次数
     */
    public static getWatchVideoNum(): number {
        return Wx.Instance.localStorageGetInt(Config.Instance.KEY_VIDEO_NUM, 0);
    }

    /**
     * 获取当前已分享次数
     */
    public static getShareNum(): number {
        return Wx.Instance.localStorageGetInt(Config.Instance.KEY_SHARE_NUM, 0);
    }

    public static addShareNum() {
        Wx.Instance.localStorageSetInt(Config.Instance.KEY_SHARE_NUM, this.getShareNum() + 1);
    }

    public static canShareGroup: boolean = true;

    public static getIsReviewSuccess(): boolean {
        return this.isReviewSuccess;
    }


    public static CheckTime(): boolean {
        let curTime: Date = new Date(this.GetTime());
        console.log(curTime.getDay());
        if (this.shareDate == null || this.shareDate == '')
            return false
        /*分享 日期限制(周几)*/
        if (this.shareDate.includes(curTime.getDay().toString())) {
            /*时间限制 几点*/
            for (let i = 0; i < this.shareTimeList.length; i++) {
                let timeText = this.shareTimeList[i].split("-");
                if (curTime.getHours() >= parseInt(timeText[0]) && curTime.getHours() <= parseInt(timeText[1])) {
                    return true;
                }
            }
        }

        return false;
    }

    /*刷新分享限制*/
    public static refreshCheck() {
        for (let i = 0; i < this.serverLocation.length - 1; i++) {
            if (this.myLocation.includes(this.serverLocation[i])) {
                this.isCanShare = this.CheckTime();
                return;
            }
        }
        this.isCanShare = false;
    }

    public static OnShare(callback: (isSuccess: boolean) => void, CheckGroup: boolean) {
        this.shareCallback = callback;
        this.sharetime = new Date().getTime();
        this.CheckGroup = CheckGroup;
    }



    public static ShareBack() {
        let time = new Date().getTime();
        Utility.log('time=' + time, 'sharetime=' + this.sharetime);

        if (this.shareCallback) {
            let needTime;
            let shareNum = this.getShareNum();
            needTime = Math.floor((shareNum / 2)) * 500 + 3000;
            needTime = needTime > 6000 ? 6000 : needTime;
            if (!this.CheckGroup) {
                this.shareCallback(true);
                this.shareCallback = null;
            } else if (time - this.sharetime > needTime) {
                // UIManager.Instance.ShowPanel<TipsPanel>(TipsPanel, PanelType.ViewType.Tips, '发出成功,点击确认领取奖励', () => {
                    Wx.Instance.ShowToast("发出成功,已领取奖励");
                    this.addShareNum();
                    this.shareCallback(true);
                    this.shareCallback = null;
                // });
            } else {
                Wx.Instance.ShowToast('通讯失败,请重新操作!');
                this.shareCallback(false);
                this.shareCallback = null;
            }
        }

        if (this.tryPlayData && this.tryPlayCallback) {
            if (time - this.tryPlayTime >= 20000) {
                this.tryPlayCallback();
            } else {
                console.log("试玩失败");
                // UIManager.Instance.ShowPanel<TipsPanel>(TipsPanel, PanelType.ViewType.Tips, '试玩失败!');
            }
            this.tryPlayData = null;
            this.tryPlayCallback = null;
        }
    }

    public static TryPlay(adData, callback) {
        this.tryPlayData = adData;
        this.tryPlayCallback = callback;
        this.tryPlayTime = new Date().getTime();
        Wx.Instance.More(adData.appId, adData.path);
        if (!Wx.Instance.wx)
            callback();
    }
}
