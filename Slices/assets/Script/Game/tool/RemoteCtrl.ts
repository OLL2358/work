// import NetManager from "../tool/common/NetManager";
// import Utility from "../tool/common/Utility";
import Config from './../../tool/model/Config';
import { GetRewardType } from "./RewardSystem";
import ShareLimit from './../../common/ShareTheLimit';
import NetManager from './../../common/NetManager';
import Utility from './../../common/Utility';
import GameData from './../../GameData';

export class SwitchData {
    /**分享开关 */
    share: boolean = true;

    /**视频开关 */
    video: boolean = true;

    /**日志开关 */
    log: boolean = true;

    /**是否屏蔽结算 */
    settle: boolean = false;

    /**视频次数 */
    video_number: number = 1000;

    /**广告开关 */
    ad: boolean = true;

    /**是否为体验版，true.体验版，false.正式版 */
    examine: boolean = true;
}

export class BonusSwitch {
    /**红包开关 */
    switch: boolean = true;

    /**红包领取数次 */
    number: number = 10;
}

/**
 * 远程控制接口
 *
 * id是828 测试的版本号是1.2
 *
 * usage:
 *
 * RemoteControl.Instance.requestSwitch();
 * RemoteControl.Instance.getRewardMethod();
 *
 */
export default class RemoteControl {
    public id = "1089";
    public version = "";
    public loadSwitch: boolean = false;
    public switchData: SwitchData = new SwitchData();
    public BonusData: BonusSwitch = new BonusSwitch();

    private static instance: RemoteControl;
    public static get Instance(): RemoteControl {
        if (this.instance == null) {
            this.instance = new RemoteControl();
            this.instance.version = Config.Instance.versionType; // ser version
            console.log("switchData = " + JSON.stringify(this.instance.switchData));
            
        }
        return this.instance;
    }

    /**
     * 开关接口
     */
    public requestSwitch() {
        console.log("RemoteControl.requestSwitch()");

        NetManager.Instance.requestSwitch((res)=>{
            // success
            console.log("RemoteControl.requestSwitch() success res = ", res);
            if (res.code == 1) {
                this.loadSwitch = true;
                this.switchData = res.data.control_switch;
                this.BonusData = res.data.bonus_switch;
                console.log("开关 = ", res);
                this.setShareLimit();
            } else {
                this.loadSwitch = false;
            }
        })

        // const url = "https://wyzsf.qingpeng438.com/gg/public/index.php/index/Index/getData";
        // const param = `?id=${this.id}&version=${this.version}`;
        // NetManager.Instance.HttpPost(url, (res) => {
        //     // success
        //     console.log("RemoteControl.requestSwitch() success res = ", res);
        //     if (res.code == 1) {
        //         this.loadSwitch = true;
        //         this.switchData = res.data.control_switch;

        //         console.log("this.switchData = ", this.switchData);
        //         this.setShareLimit();
        //     } else {
        //         this.loadSwitch = false;
        //     }

        // }, param, (text) => {
        //     // fail
        //     console.log("requestSwitch() fail res = ", text);
        //     this.loadSwitch = true;
        // });
    }

    public requestSwitchQQ() {
        this.loadSwitch = true;

        // this.switchData 使o用本地默认值
    }

    public setShareLimit() {
        ShareLimit.setNeedLog(this.switchData.log);
        ShareLimit.watchNum = this.switchData.video_number;
    }

    /**
     * 领取奖励的方式
     */
    public getRewardMethod(): GetRewardType {
        // 没有接入sdk, 直接获得奖励
        if (Utility.invalidSDK()) {
            console.log("GetRewardType.Direct");
            return GetRewardType.Direct;
        }
        console.log("this.loadSwitch: ",this.loadSwitch);
        console.log("this.switchData.video_switch: ",this.switchData.video);
        console.log("this.switchData.share_switch: ",this.switchData.share);
        if (this.loadSwitch) {
            if (this.switchData.video) {
                if (ShareLimit.CheckWatchVideoNum()) {
                    console.log("GetRewardType.Video1");
                    return GetRewardType.Video;
                }
            }

            if (this.switchData.share) {
                console.log("GetRewardType.Share");
                return GetRewardType.Share;
            } else {
                // 不能看视频, 不能分享
                console.log("GetRewardType.Cant");
                return GetRewardType.Cant;
            }
        } else {
            console.log("GetRewardType.Video2");
            return GetRewardType.Video;
        }
    }

    public getRewardMethod1(): GetRewardType {
        // 没有接入sdk, 直接获得奖励
        if (Utility.invalidSDK()) {
            console.log("GetRewardType.Direct");
            return GetRewardType.Direct;
        }
        console.log("this.loadSwitch: ",this.loadSwitch);
        console.log("this.switchData.share_switch: ",this.switchData.share);
        if (this.loadSwitch) {

            if (this.switchData.share) {
                console.log("GetRewardType.Share");
                return GetRewardType.Share;
            } else {
                // 不能看视频, 不能分享
                console.log("GetRewardType.Cant");
                return GetRewardType.Cant;
            }
        }
    }
}