
import Method from './../Method';
import EventMessage from './../tool/model/EventMessage';
import EventManager from './../tool/common/EventManager';
import Utility from './../common/Utility';
import Config from './../tool/model/Config';
import WxTool from './Wxtool';
import ShareLimit from './../common/ShareTheLimit';
import RemoteControl from '../Game/tool/RemoteCtrl';
import NetManager from './../common/NetManager';
import SelfADManager from './../selfComponent/SelfADManager';

export default class Wx {
    private static instance: Wx;
    public static get Instance(): Wx {
        if (this.instance == null)
            this.instance = new Wx();
        return this.instance;
    }
    private bannerAd = null;

    private interstitialAd = null;

    private videos: { [key: string]: any };

    private datas: { [key: string]: string } = {};

    public isPlayingVideoAD: boolean = false;

    public code: string = null;

    private isLogin: boolean = false;

    public wx = window.wx;

    private GameClub = null;

    private bannerShowTime: number;

    public index;
    public openId;
    public release_id;

    private gameClub;
    private Video;
    private userInfoBtn;

    private watchCallback: (isSuccess: boolean) => void;

    public init() {
        if (!Wx.Instance.wx) {
            return
        }
        this.wx.onAudioInterruptionEnd(function () {
            //强行暂停音乐 如果不暂停，调用resumeMusic是无效的，因为是微信让声音消失了
            cc.audioEngine.pauseAll();
            cc.audioEngine.resumeAll();
            console.log('恢复音乐播放');
            //恢复音乐播放，比如调用 cc.audioEngine.resumeMusic();
            //self.refreshBG();
        });
        // RemoteControl.Instance.requestSwitch();

        // NetManager.Instance.HttpPost('https://wyzsf.qingpeng438.com/gg/public/index.php/index/Index/getSharingMaterials',
        //     'project_id=1089&is_array=1', (res) => {
        //         if (res.code == 0) {
        //             Utility.log('分享数据:', res.data);
        //             WxTool.Instance.SaveShareData(res.data);
        //         }
        //     })

        this.onShow((res) => {
            if (res.query) {
                console.log(res);
                if (res.query.release_id) {
                    this.SignRelease(res.query.release_id);
                }
                if (res.query.openId) {
                    this.SignOpenid(res.query.openId);
                }
            }
            // if (Wx.instance.localStorageGetBool(Config.MUSIC_IS_PLAY, true)) { //判断是否播放音乐
            //     MusicManager.instance.pauseGameBgMusic();
            //     MusicManager.instance.playGameBgMusic();
            // }
            // else {
            //     MusicManager.instance.pauseGameBgMusic();
            // }
            ShareLimit.ShareBack();
        })
    }

    public onShow(callback: (res) => void) {
        if (this.wx != undefined && this.wx != null) {
            console.log('onshow');
            this.wx.onShow((res) => {
                console.log("onshow: ", res);
                callback(res);
            })
        }
    }

    /**
     * 好友助力
     * @param value 
     */
    public SignRelease(value) {
        this.release_id = value;
        this.login((isSuccess) => {
            if (isSuccess)
                NetManager.Instance.LoginWithoutUser(() => {
                    console.log('记录成功');
                    this.release_id = null;
                })
        });
    }

    /**
     * 好友助力
     * @param value 
     */
    public SignOpenid(value) {
        this.openId = value;
        this.login((isSuccess) => {
            if (isSuccess)
                NetManager.Instance.LoginWithoutUser(() => {
                    console.log('记录成功');
                    this.openId = null;
                })
        });
    }

    /**
     * 跳转到指定小程序
     * @param appId 小程序的appid,不传参数则默认 wx4cdf89817b429c80
     */
    public More(appId: string, path: string = '') {
        if (this.wx != undefined) {
            this.wx.navigateToMiniProgram({
                appId: appId,
                path: path,
                success: () => {
                    NetManager.Instance.adStatistics(4, () => { })
                    console.log('跳转成功');
                },
                fail: (err) => {
                    console.log('跳转失败:', err);
                }
            })
        }
    }

    /**
     * 打开图片
     * @param image 需要打开的图片路径
     */
    public openImage(image) {
        let arr = new Array(image);
        if (this.wx != undefined) {
            this.wx.previewImage({
                urls: arr,
                success: () => {
                    NetManager.Instance.adStatistics(4, () => { })
                    console.log('打开成功');
                },
                fail: (err) => {
                    console.log('打开失败:', err);
                }
            })
        }
    }

    /**
     * 弹出网络等待遮罩层
     */
    public ShowWaiting(title = "") {
        if (window.wx != undefined)
            wx.showLoading({
                mask: true,
                title
            });
    }

    /**
     * 播放广告,播放之前需要先初始化
     * @param key 广告的key
     */
    public playVideo(callback: (isSuccess: boolean) => void) {
        let videoAd = this.getVideo(Config.Instance.VIDEOID);
        if (videoAd == null) {
            this.ShowToast('当前不支持观看视频,请升级微信后再试');
            return;
        }
        this.watchCallback = callback;
        videoAd.load()
            .then(() => {
                videoAd.show();
                // Manager.pauseMusic();
            })
            .catch(err => {
                console.log(err.errMsg)
                this.ShowToast('当前观看次数达到上限,请明天再试');
            })
    }

    // /**
    //  * 分享
    //  * @param pos 分享点数据
    //  * @param callback 回调
    //  * @param shareMessage 分享透传
    //  */
    // public share(pos: string, callback: (isSuccess: boolean) => void, shareMessage?: string) {
    //     // if (window.wx == undefined)
    //     //     return
    //     let shareNum = Math.floor(cc.random0To1() * WxTool.Instance.GetShareLenth());
    //     this.shareBase(pos, callback, WxTool.Instance.GetShareTitle(shareNum), WxTool.Instance.GetShareImageUrl(shareNum), ShareLimit.canShareGroup, shareMessage);
    // }

    /**
     * 分享
     * @param pos 分享点数据
     * @param callback 回调
     * @param shareMessage 分享透传
     */
    public share(callback: (isSuccess: boolean) => void, CheckGroup: boolean = true, shareMessage?: string) {
        if (this.wx == undefined)
            return
        let shareNum = Math.floor(cc.random0To1() * WxTool.Instance.GetShareLenth());
        console.log(shareNum);
        console.log(WxTool.Instance.GetShareImageUrl(shareNum));
        this.shareBase(callback, WxTool.Instance.GetShareTitle(shareNum), WxTool.Instance.GetShareImageUrl(shareNum), CheckGroup, shareMessage);
    }

    //不判断群分享
    public shareWithoutGroup(callback: (isSuccess: boolean) => void, shareMessage?: string) {
        if (this.wx == undefined)
            return
        let shareNum = Math.floor(cc.random0To1() * WxTool.Instance.GetShareLenth());
        this.shareBase(callback, WxTool.Instance.GetShareTitle(shareNum), WxTool.Instance.GetShareImageUrl(shareNum), false, shareMessage);
    }
    //邀请好友分享
    public InvitationShare(callback: (isSuccess: boolean) => void, openId, shareMessage?: string) {
        if (this.wx == undefined) {
            return
        }
        let shareNum = Math.floor(cc.random0To1() * WxTool.Instance.GetShareLenth());
        shareMessage = 'openId=' + openId;
        this.shareBase(callback, WxTool.Instance.GetShareTitle(shareNum), WxTool.Instance.GetShareImageUrl(shareNum), false, shareMessage);
    }

    /**
     * 分享
     * @param callback 回调函数
     * @param title 分享标题
     * @param url 分享图片
     * @param CheckGroup 是否检测重复群id
     * @param shareMessage 分享透传参数
     */
    public shareBase(callback: (isSuccess: boolean) => void, title: string, url: string, CheckGroup: boolean, shareMessage?: string) {
        if (this.wx == undefined) {
            if (callback != null) {
                callback(true);
            }
            return;
        }

        if (!this.isLogin) {

            this.login((isSuccess: boolean) => {

                if (isSuccess) {

                    this.shareBase(callback, title, url, CheckGroup, shareMessage);
                } else {
                    // MyNotification.showTip('请授权登录！');
                    if (callback)
                        callback(false);
                }
            }, true);
            return;
        }
        ShareLimit.OnShare(callback, CheckGroup);
        if (title == '') { title = '分享' }
        if (url == '') { url = 'https://idleminer-1256769450.cos.ap-shanghai.myqcloud.com/share/share0.png'; }
        this.wx.aldShareAppMessage({
            title: title,
            imageUrl: url,
            query: shareMessage,
        });
    }

    public login(callback: (isSuccess: boolean) => void, changeLogin?: boolean) {
        this.wx.login({
            success: (res) => {
                this.isLogin = changeLogin ? changeLogin : false;
                this.code = res.code;
                // wx.getUserInfo({
                //     success: (res) => {
                //         //获得用户头像,名称
                //         WxTool.Instance.Username = res.userInfo.nickName;
                //         WxTool.Instance.UserheadURL = res.userInfo.avatarUrl;
                //     },
                //     fail: () => {
                //         Utility.log('获取信息失败');
                //     }
                // })
                callback(true);
            },
            fail: (res) => {
                Utility.log('login fail:', res);
                Wx.Instance.ShowToast('登陆失败,请稍后重试');
                callback(false);
            }
        })
    }

    /**
     * 调用阿拉丁统计接口
     */
    public OnEvent(event: string, key: string = "", value: string = "") {
        // ======================================
        if (window.wx != undefined) {
            wx.aldSendEvent(event, { [key]: value });
        }
        // ======================================
    }

    public showGameClub() {
        if (window.wx == undefined) {
            return;
        }
        if (this.GameClub) {
            this.GameClub.show();
            console.log("showGameClub again...");
            return
        }

        let height = window.innerHeight;
        let width = window.innerWidth;
        let scale = window.innerWidth / 540;
        let yScale = window.innerHeight / 960;
        this.GameClub = wx.createGameClubButton({
            icon: 'light',
            style: {
                left: window.innerWidth / 2 + (195 - 40) * scale,
                top: innerHeight / 2 - (80 + 40) * yScale,
                width: 80 * scale,
                height: 80 * scale,
            }
        })
    }

    public hideGameClub() {
        if (window.wx == undefined) {
            return;
        }
        if (this.GameClub) {
            this.GameClub.hide();
            Utility.log("hide GameClub....");
        }
    }

    /**
     * 初始化插屏
     */
    public ShowInterstitial() {
        if (window.wx == undefined) {
            return;
        }

        // 创建插屏广告实例，提前初始化
        if (wx.createInterstitialAd) {
            this.interstitialAd = wx.createInterstitialAd({
                adUnitId: Config.Instance.interstitialID
            })
        }
        // 在适合的场景显示插屏广告
        if (this.interstitialAd) {
            this.interstitialAd.show().catch((err) => {
                this.ShowModal('插屏出错', '' + err.errMsg+'，'+err.errCode, () => { }, false);
            })
        }
    }

    public ShowBanner() {
        if (window.wx == undefined) {
            // SelfADManager.ShowBanner();
            return;
        }

        if (this.bannerAd) {
            this.bannerAd.show();
            console.log("showBanner again...");
            return;
        }
        let AdUnitId = Config.Instance.BANNERID;
        let height = window.innerHeight;
        let width = window.innerWidth;
        let scale = window.innerWidth / 540;
        // console.log(height, width);
        // console.log(AdUnitId);
        this.bannerAd = wx.createBannerAd({
            adUnitId: AdUnitId,
            style: {
                top: height / 2 + 290 * scale,
                width: width,
                left: 0,
            },
        })
        this.bannerAd.onLoad(() => {
            console.log("banner 广告加载成功");
        })
        this.bannerAd.onError(err => {
            // SelfADManager.ShowBanner();
            console.log(err);
        })
        // this.bannerAd.onResize(res => {
        //     this.bannerAd.style.top = height - res.height;

        //     if (height > 810) {
        //         this.bannerAd.style.top -= 20;
        //     }
        // })

        this.bannerAd.show();
    }
    public hideBanner() {
        if (window.wx == undefined) {
            return;
        }
        SelfADManager.HideBanner();
        if (this.bannerAd) {
            try {
                this.bannerAd.destory();
                this.bannerAd = null;
                Utility.log("destory banner....");
            } catch (error) {
                this.bannerAd = null;
                Utility.error(error);
            }
        }
    }

    /**
     * 初始化视频广告
     * @param key 广告的key
     */
    public initVideo(key: string): any {
        if (this.wx != undefined) {
            if (this.videos == null)
                this.videos = {};
            if (this.videos[key] == null) {
                try {
                    this.videos[key] = this.wx.createRewardedVideoAd({
                        adUnitId: key,
                    });
                    this.videos[key].onClose((res) => {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if (res && res.isEnded || res === undefined) {
                            let watchNum = this.localStorageGetInt(Config.Instance.KEY_VIDEO_NUM, 0);
                            watchNum++;
                            this.localStorageSetInt(Config.Instance.KEY_VIDEO_NUM, watchNum);
                            if (this.watchCallback) {
                                this.watchCallback(true);
                                this.watchCallback = null;
                            }
                        }
                        else {
                            if (this.watchCallback) {
                                this.watchCallback(false);
                                this.watchCallback = null;
                            }
                        }
                        // Manager.resumeMusic();
                    });
                    this.videos[key].onError((err) => {
                        this.ShowModal('视频出错', '' + err, () => { }, false);
                    })
                } catch (err) {
                    Utility.log("获取广告模块失败 id=" + key);
                }
            }
            return this.videos[key]
        }
        return null
    }

    /**
     * 打开确认窗口
     * @param title 标题
     * @param content 内容
     * @param success 成功回调
     * @param showCancel 是否显示取消按钮
     */
    ShowModal(title: string, content: string, success: (res) => void, showCancel: boolean = true) {
        if (this.wx) {
            this.wx.showModal({
                title: title,
                content: content,
                success: success,
                showCancel: showCancel,
            })
        }
    }

    /**
     * 获取广告对象,获取之前需要先初始化
     * @param key 广告的key
     */
    public getVideo(key: string): any {
        console.log("key: ", key);
        if (this.videos == null || this.videos[key] == null)
            return null
        return this.videos[key]
    }

    /*缓存*/
    public localStorageGetInt(key: string, defaultValue: number): number {
        return parseInt(this.localStorageGet(key, defaultValue.toString()));
    }

    public localStorageGetList(key: string) {
        let list = [];
        return JSON.parse(this.localStorageGet(key, JSON.stringify(list)));
    }

    public localStorageGet(key: string, defaultValue: string): string {

        if (this.datas[key] == undefined) {

            let value = Wx.Instance.getStorageSync(key);
            if (value == undefined
                || value == null
                || value == '') {
                value = defaultValue;
            }

            this.datas[key] = value;
            return value;
        }
        return this.datas[key];
    }

    public getStorageSync(key: string): string {

        if (window.wx != undefined) {
            return window.wx.getStorageSync(key);
        }
        return undefined;
    }

    public localStorageGetBool(key: string, defaultValue: boolean) {
        return parseInt(this.localStorageGet(key, (defaultValue ? 1 : 0).toString())) == 1 ? true : false;
    }
    public localStorageSetBool(key: string, value: boolean) {
        this.localStorageSet(key, (value ? 1 : 0).toString());
    }

    public localStorageSetInt(key: string, value: number) {
        this.localStorageSet(key, value.toString());
    }

    public setlist(key: string, value: string) {
        Wx.instance.setStorageSync(key, value);
    }

    public getlist(key: string) {
        return JSON.parse(Wx.Instance.getStorageSync(key));
    }

    public localStorageSetList(key: string, value: string) {
        this.localStorageSet(key, value);
    }
    public localStorageSet(key: string, value: string): void {
        if (this.datas[key] != value) {
            this.datas[key] = value;
            Wx.instance.setStorageSync(key, value);
        }
    }
    public localStorageSetFloat(key: string, value: number) {
        this.localStorageSet(key, value.toString());
    }
    public localStorageGetFloat(key: string, defaultValue: number): number {
        return parseFloat(this.localStorageGet(key, defaultValue.toString()));
    }
    public setStorageSync(key: string, value: string) {
        if (window.wx != undefined) {
            window.wx.setStorageSync(key, value);
        }
    }

    /**
     * 提示框
     * @param title 内容
     * @param delay 延迟(毫秒)
     */
    public ShowToast(title: string, delay?: number) {
        if (window.wx != undefined) {
            let _id = setTimeout(() => {
                clearTimeout(_id);

                wx.showToast({
                    title: title,
                    icon: 'none',
                    duration: delay == undefined ? 3000 : delay
                });
            }, 10);
        }
    }
}
