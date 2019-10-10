import Config from "../../tool/model/Config";
import EventManager from "../../tool/common/EventManager";
import EventMessage from "../../tool/model/EventMessage";
// import MusicManager from "../../music/MusicManager";
// import Utility from "../../tool/common/Utility";
// import GameHelper from "./GameHelper";
// import GameData from "../Manager/GameData";
// import NetManager from "../../tool/common/NetManager";
// import { BigNumber } from "bignumber.js";
// import ShareLimit from "../../Common/ShareLimit";
import Wx from './../../Wx/Wx';
import RemoteControl from "./RemoteCtrl";
import ShareLimit from './../../common/ShareTheLimit';

/**
 * 奖励类型
 */
export enum RewardType{
    None = 0,
    // /**仓库主管 */
    // CashierDirector = 1,
    // /**矿车主管 */
    // ElevatorDirector = 2,
    // /**矿层主管 */
    // FloorDirector = 3,
    // /**免费宝石 */
    // FreeGemstone,

    // /**
    //  * 幸运转盘
    //  */
    // LuckCoin,

    // /** QQ: 幸运转盘免费抽奖 */
    // LuckFreeDraw,

    // /**
    //  * 障碍层解锁时间加速30分钟
    //  */
    // Unlock,
    // /**
    //  * 矿层收入X2
    //  */
    // GiftDoublieNum,
    // /**
    //  * 6分钟的3倍加速BUFF
    //  */
    // FreeMoneyDouble,

    // /** 闲置现金收入 */
    // PromoteMoneyDouble,

    // /** 同时启动主管技能 */
    // AllDirectorSkill,

    // /** QQ: 免费宝箱时间 */
    // FreeBoxTime,
    /** 复活 */
    Resurgence,
    /** 炸弹 */
    Bomb,
    /**金币 */
    Money,
    /**红包 */
    Bonus,
    /**钻石 */
    Diamond,
}

/**
 * 领取奖励方式
 */
export enum GetRewardType {
    None,
    /**分享 */
    Share,
    /**视频 */
    Video,
    /**直接获得 */
    Direct,
    /**金币 */
    Gold,
    /**钻石 */
    Gem,
    /**不能获得 */
    Cant,
}

/**
 * 获取奖励系统
 */
export class RewardSystem {

    private node: cc.Node;

    /**
     * 奖励类型
     */
    private targetType: RewardType;
    private getTargetMethod: GetRewardType;

    /**
     * 分享视频成功
     */
    private onSuccess = null;
    /**
     * 分享视频失败
     */
    private onFail = null;

    private static instance: RewardSystem;
    public static get Instance(): RewardSystem {
        if (this.instance == null) {
            this.instance = new RewardSystem();
        }
        return this.instance;
    }

    public init(node: cc.Node) {
        this.node = node;
        this.initEvent();
    }

    public initEvent() {
        if (this.node) {
            EventManager.Instance.AddListener(this.node, EventMessage.instance.WatchFinished, () => {

                let VideoNum = Wx.Instance.localStorageGetInt(Config.Instance.KEY_VIDEO_NUM, 0);
                VideoNum++;
                Wx.Instance.localStorageSetInt(Config.Instance.KEY_VIDEO_NUM, VideoNum);

                console.log('视频播放次数:', Wx.Instance.localStorageGetInt(Config.Instance.KEY_VIDEO_NUM, 0));

                if (this.targetType != RewardType.None) {
                    // 领取奖励
                    if (this.onSuccess) {
                        this.onSuccess(this.targetType, this.getTargetMethod);
                    }
                }

                this.clearTarget();
            });

            EventManager.Instance.AddListener(this.node, EventMessage.instance.WatchFail, () => {
                Wx.Instance.ShowToast("提前结束视频,无法获得奖励");

                if (this.onFail) {
                    this.onFail(this.targetType, this.getTargetMethod);
                }

                this.clearTarget();
            });
        }
    }
     /**
     * 分享或看视频,返回值为true时为分享,回调中也有该参数,用于阿拉丁统计
     */
    public static ShareAndWatch(callback: (isSuccess: boolean, isShare: boolean) => void): boolean {
        if (ShareLimit.CanWatchVideo()) {
            console.log("播放视频")
            Wx.Instance.playVideo((isSuccess: boolean) => {
                if (callback)
                    callback(isSuccess, false);
            });
            return false;
        }
        else if (ShareLimit.CanShare()) {
            console.log("分享")
            Wx.Instance.share((isSuccess: boolean) => {
                if (callback)
                    callback(isSuccess, true);
                return true;
            });
        }
        else {
            Wx.Instance.ShowToast('今日发送次数已达到上限.');
            return undefined;
        }
    }
    /**
     * 看视频,返回值为true时为分享,回调中也有该参数,用于阿拉丁统计
     */
    public static Watch(callback: (isSuccess: boolean, isShare: boolean) => void): boolean {
        // if (ShareLimit.CanWatchVideo()) {
            console.log("播放视频")
            Wx.Instance.playVideo((isSuccess: boolean) => {
                if (callback)
                    callback(isSuccess, false);
            });
            return false;
        // }
        // else {
        //     Wx.Instance.ShowToast('今日发送次数已达到上限.');
        //     return undefined;
        // }
    }
     /**
     * 分享或看视频,返回值为true时为分享,回调中也有该参数,用于阿拉丁统计
     */
    public static Share(callback: (isSuccess: boolean, isShare: boolean) => void): boolean {
        // if (ShareLimit.CanWatchVideo()) {
        //     console.log("播放视频")
        //     Wx.Instance.playVideo((isSuccess: boolean) => {
        //         if (callback)
        //             callback(isSuccess, false);
        //     });
        //     return false;
        // }
        if (ShareLimit.CanShare()) {
            console.log("分享")
            Wx.Instance.share((isSuccess: boolean) => {
                if (callback)
                    callback(isSuccess, true);
                return true;
            });
        }
        else {
            Wx.Instance.ShowToast('今日发送次数已达到上限.');
            return undefined;
        }
    }


    /**
     * 通过分享, 视频, 直接领取方式领取奖励
     */
    public getReward(type: RewardType, getMethod: GetRewardType, onSuccess?, onFail?) {
        this.targetType = type;
        this.getTargetMethod = getMethod;
        this.onSuccess = onSuccess;
        this.onFail = onFail;

        switch (getMethod) {
            case GetRewardType.Share:
                console.log("RewardSystem.getReward() -- Share");
                // onSuccess && onSuccess();

                Wx.Instance.share((isSuccess:boolean) => {
                    if (isSuccess) {
                        onSuccess && onSuccess(this.targetType, this.getTargetMethod);
                    } else {
                        onFail && onFail(this.targetType, this.getTargetMethod);
                    }
                });
                
                break;
            case GetRewardType.Video:
                // 检测视频次数
                if (RemoteControl.Instance.loadSwitch) {
                    if (RemoteControl.Instance.switchData.video) {
                        if (ShareLimit.CheckWatchVideoNum()) {
                            console.log("RewardSystem.getReward() -- Video");
                            Wx.Instance.playVideo(null);
                            return;
                        }
                    }
                }

                Wx.Instance.ShowToast("当前观看次数达到上限,请明天再试");
                onFail && onFail(this.targetType, this.getTargetMethod);

                break;
            case GetRewardType.Direct:
                console.log("RewardSystem.getReward() -- Direct");
                onSuccess && onSuccess(this.targetType, this.getTargetMethod);
                break;
            case GetRewardType.Cant:
                onFail && onFail(this.targetType, this.getTargetMethod);
                break;
            default:
                break;
        }
    }
    /**
     * 通过分享,直接领取方式领取奖励
     */
    public SharegetReward(type: RewardType, getMethod: GetRewardType, onSuccess?, onFail?) {
        this.targetType = type;
        this.getTargetMethod = getMethod;
        this.onSuccess = onSuccess;
        this.onFail = onFail;

        switch (getMethod) {
            case GetRewardType.Share:
                console.log("RewardSystem.getReward() -- Share");
                // onSuccess && onSuccess();

                Wx.Instance.share((isSuccess:boolean) => {
                    if (isSuccess) {
                        onSuccess && onSuccess(this.targetType, this.getTargetMethod);
                    } else {
                        onFail && onFail(this.targetType, this.getTargetMethod);
                    }
                });

                break;
            // case GetRewardType.Video:
            //     // 检测视频次数
            //     if (RemoteControl.Instance.loadSwitch) {
            //         if (RemoteControl.Instance.switchData.video) {
            //             if (ShareLimit.CheckWatchVideoNum()) {
            //                 console.log("RewardSystem.getReward() -- Video");
            //                 Wx.Instance.playVideo(Config.Instance.VIDEOID);
            //                 return;
            //             }
            //         }
            //     }

            //     Wx.Instance.ShowToast("当前观看次数达到上限,请明天再试");
            //     onFail && onFail(this.targetType, this.getTargetMethod);

            //     break;
            case GetRewardType.Direct:
                console.log("RewardSystem.getReward() -- Direct");
                onSuccess && onSuccess(this.targetType, this.getTargetMethod);
                break;
            case GetRewardType.Cant:
                onFail && onFail(this.targetType, this.getTargetMethod);
                break;
            default:
                break;
        }
    }

    public clearTarget() {
        this.targetType = RewardType.None;
        this.getTargetMethod = GetRewardType.None;
        this.onSuccess = null;
        this.onFail = null;
    }

    public getDefaultRewardMethod() {
        const method = RemoteControl.Instance.getRewardMethod();
        return method;
    }
    public getDefaultRewardMethod1() {
        const method = RemoteControl.Instance.getRewardMethod1();
        return method;
    }

    public test() {
        const type = RewardType.Money;
        const method = RewardSystem.Instance.getDefaultRewardMethod();
        RewardSystem.Instance.getReward(
            type,
            method,
            (targetType: RewardType, getMethod: GetRewardType) => {
                // success

            },
            (targetType: RewardType, getMethod: GetRewardType) => {
                // fail

            }
        );
    }

}