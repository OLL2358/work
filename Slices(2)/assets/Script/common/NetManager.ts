
import Config from './../tool/model/Config';
import Wx from './../Wx/Wx';
import EnemyAI from './../Data/EnemyAI';
import GameData from './../GameData';
import RemoteControl from './../Game/tool/RemoteCtrl';
import Utility from './Utility';
import WxTool from './../Wx/Wxtool';
import ADData from './../ADData';
import EventManager from './../tool/common/EventManager';

export default class NetManager {
    private static instance: NetManager;
    public static get Instance(): NetManager {
        if (this.instance == null)
            this.instance = new NetManager();
        return this.instance;
    }

    /**
     * http请求
     * @param url 链接
     * @param isPost 是否为post请求
     * @param params 请求参数
     * @param callback 成功回调
     * @param failCallback 失败回调
     */
    private HttpBase(url: string, isPost: boolean, params?: string, callback?: (text: any) => void, failCallback?: (text: string) => void) {
        var xhr = cc.loader.getXMLHttpRequest();
        /*注册事件*/
        xhr.onreadystatechange = function () {
            /*readyState=4的时候才是请求完成的时候*/
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    //协议返回的回调文本
                    let text: string = xhr.responseText
                    //re是 所有的空格匹配
                    var re = / /gi;
                    //所有的空格匹配改为+
                    text = text.replace(re, '+');
                    try {
                        /*可在此处做通用返回值的操作*/
                        if (callback)
                            callback(JSON.parse(text))
                    }
                    catch (err) {
                        console.error(err);
                        if (failCallback) {
                            failCallback('连接错误');
                        }
                    }
                } else {
                    if (failCallback)
                        failCallback(xhr.statusText);
                }
            }
        };
        /*没有回调的话就不显示遮罩*/
        if (callback) {
            /*显示及隐藏遮罩层*/
            // Wx.getInstance().ShowWaiting();
            // xhr.onloadend = (ev) => {
            // Wx.getInstance().HideWaiting();
            // }
        }
        /*错误事件*/
        xhr.onerror = (ev) => {
            if (failCallback)
                failCallback('连接出现错误');
        }
        xhr.onabort = (ev) => {
            if (failCallback)
                failCallback('连接断开');
        }
        xhr.ontimeout = (ev) => {
            if (failCallback)
                failCallback('连接超时');
        }

        if (!isPost && params != undefined && params != null)
            url += params;

        xhr.open(isPost ? "POST" : "GET", url, true);
        if (isPost) {
            // xhr.open(isPost ? "POST" : "GET", url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }

        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }

        xhr.timeout = 5000;
        if (isPost) {
            xhr.send(params);
        }
        else {
            xhr.send();
        }

        // Utility.log("url = ", url, "params = ", params);
    }

    /**
     * get请求
     * @param url 请求的链接(可以直接把需要的参数卸载链接上)
     * @param callback 成功回调
     * @param params 请求的参数(参数=值 以'&'拼接)
     * @param failCallback 失败回调(可空)
     */
    public HttpGet(url: string, callback: (text: any) => void, params?: string, failCallback?: (text: string) => void) {
        this.HttpBase(url, false, params, callback, failCallback);
    }

    /**
     * post请求
     * @param url 请求的链接
     * @param params post请求的参数(参数=值 以'&'拼接)
     * @param callback 成功回调
     * @param failCallback 失败回调(可空)
     */
    public HttpPost(url: string, params: string, callback: (text: any) => void, failCallback?: (text: string) => void) {
        this.HttpBase(url, true, params, callback, failCallback);
    }
    /**
     * 登陆
     */
    public Login(data: string, callback: (isSuccess: boolean) => void, failcallback?: (msg: string) => void) {
        if (Wx.Instance.wx != undefined) {
            let id = Wx.Instance.release_id ? Wx.Instance.release_id : Wx.Instance.openId ? Wx.Instance.openId : '';
            let type = Wx.Instance.release_id ? 1 : Wx.Instance.openId ? 2 : 1;
            NetManager.Instance.HttpPost('https://wyzsf.mrqpby.com/gg/public/index.php/index/Index/login?project_id=1089',
                data + (id == '' ? '' : cc.js.formatStr('&goto_id=%s&goto_type=%s', id, type)),
                (res) => {
                    console.log(res);
                    Wx.Instance.localStorageSet('data', res);
                    if (res != 'fail') {
                        if (res.code == 0) {
                            GameData.token = res.token;

                            //发送获取游戏数据请求
                            this.sendRequestGetData(callback);
                        }
                    }
                }, failcallback);
        }
    }

    /**
     * 包含用户信息的登录
     */
    public UserLogin(user: any, callback: (isSuccess: boolean) => void, failcallback?: (msg: string) => void) {
        if (Wx.Instance.wx == undefined)
            return;
        Wx.Instance.login((isSuccess) => {
            if (isSuccess) {
                this.Login(cc.js.formatStr('js_code=%s&user_info=%s', Wx.Instance.code, user.rawData), callback, failcallback);
            }
        })
    }

    public sendRequestGetData(callback: (isSuccess: boolean) => void) {
        if (Wx.Instance.wx != undefined) {
            // let token = Wx.Instance.getStorageSync('token');
            let token = GameData.token;
            //发送获取游戏数据请求
            NetManager.Instance.HttpPost('https://wyzsf.mrqpby.com/gg/public/index.php/index/index/getInitInfo?project_id=1089'
                , 'token=' + token + '&version=' + Config.Instance.versionType,
                (res) => {
                    console.log('info success：', res)
                    if (res.code == 0) {
                        Wx.Instance.localStorageSetBool(Config.Instance.IsLogin, true);
                        GameData.Instance.user_info = res.user_info;
                        console.log("user_info: ", GameData.Instance.user_info);
                        RemoteControl.Instance.loadSwitch = true;
                        RemoteControl.Instance.switchData = res.ad_set.control_switch;
                        RemoteControl.Instance.BonusData = res.ad_set.bonus_switch;
                        console.log("开关 = ", res.ad_set);
                        RemoteControl.Instance.setShareLimit();

                        Utility.log('分享数据:', res.share_array);
                        WxTool.Instance.SaveShareData(res.share_array);

                        ADData.instance.NewAdData = res;

                        if (res.friends && res.friends.length > 0) {
                            GameData.Instance.AddDiamond(res.friends.length * 10);

                            // UIManager.Instance.ShowPanel<TipsPanel>(TipsPanel, PanelType.ViewType.Tips, '离线期间好友助力共获得钻石x' + (res.friends.length * 10));
                        }
                        EventManager.Instance.ExcuteListener(Config.Instance.GetData);
                        if (callback)
                            callback(true);
                    }
                }, (fail) => {
                    console.log(fail);
                })
        }
    }

    /**
     * 不需要用户信息的登陆(使用用户信息登陆过一次就不需要用户信息了)
     */
    public LoginWithoutUser(callback: (isSuccess: boolean) => void, failcallback?: (msg: string) => void) {
        if (window.wx == undefined)
            return
        Wx.Instance.login((isSuccess) => {
            if (isSuccess) {
                this.Login(cc.js.formatStr('js_code=%s', Wx.Instance.code), callback, failcallback);
            }
        })
    }

    public requestSwitch(callback?: (text: any) => void, failCallback?: (text: string) => void) {
        if (window.wx == null)
            return
        let param = cc.js.formatStr('id=%s&version=%s', 1089, Config.Instance.versionType);
        this.HttpPost('https://wyzsf.mrqpby.com/gg/public/index.php/index/Index/getData', param, callback, failCallback);
    }
    
    /**
     * 广告统计
     * @param type 广告类型：1.视频，2.分享，3.微信banner广告，4.触电广告
     * @param callback 
     * @param failCallback 
     */
    public adStatistics(type: number, callback: () => void, failCallback?: (text: string) => void) {
        if (window.wx == null)
            return
        let token = GameData.token;
        let param = cc.js.formatStr('token=%s&ad_type_id=%s', token, type);
        this.HttpPost('https://wyzsf.mrqpby.com/gg/public/index.php/index/Index/adStatistics?project_id=1089', param, callback, failCallback);
    }
}
