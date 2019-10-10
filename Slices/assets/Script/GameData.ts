
import Wx from './Wx/Wx';
import Config from './tool/model/Config';
import EventManager from './tool/common/EventManager';
import turntable from './turntable';
import RemoteControl, { BonusSwitch } from './Game/tool/RemoteCtrl';
import EnemyAI from './Data/EnemyAI';
import EnemyAIData from './Data/EnemyAIData';
import PlayerData from './Data/PlayerData';
import GameHelper from './GameHelper';

/**
 * 游戏数据类
 */
export default class GameData {
    private static instance: GameData;
    public static get Instance(): GameData {
        if (this.instance == null) {
            this.instance = new GameData();
        }
        return this.instance;
    }
    /**分享次数 */
    public static ShareNum: number = 0;
    /**游戏红包 */
    private Bonuse: number = 0;
    /**游戏钻石 */
    private Diamond: number = 0;
    /**游戏金钱 */
    private GameMoney: number = 0;
    /**签到天数索引 */
    public static signNum: number = 0;
    /**是否签到过索引 */
    public static isSignin: number = 0;
    /**免费转盘次数是否用完 */
    public static isFreeTumtable: boolean = false;
    /**转盘免费钻石次数，最多三次 */
    public static TurntableWatchNum: number = 0;
    /**广告开关 */
    public static AD: boolean = true;
    /**红包开关 */
    public static BonuseSwitch: boolean = true;
    
    public static token;

    TipsText:string = null;


    public user_info: PlayerData;
    public enemyInfo: PlayerData;

    public PkData: EnemyAI;
    public enemyAI: EnemyAI;
    init() {
        // GameData.Signtime = Wx.Instance.localStorageGetInt(Config.Instance.SIGN_TIME, 0);
        // if(new Date(new Date().setHours(0,0,0,0)).getTime() - GameData.Signtime > 0){
        //     console.log("刷新登陆");
        //     GameData.isSignin = 0;

        // }else {
        //     GameData.isSignin = Wx.Instance.localStorageGetInt(Config.Instance.IS_SIGN, 0);
        // }
        // GameData.signNum = Wx.Instance.localStorageGetInt(Config.Instance.SIGN_NUM, 0);
        // if(GameData.signNum == 7){
        //     GameData.signNum = 0;
        //     Wx.Instance.localStorageSetInt(Config.Instance.SIGN_NUM, GameData.signNum);
        // }

        // GameData.FreeTumtable = Wx.Instance.localStorageGetInt(Config.Instance.FREE_TUMTABLE_TIME, 0);
        // if(new Date(new Date().setHours(0,0,0,0)).getTime() - GameData.FreeTumtable > 0){
        //     console.log("刷新登陆");
        //     Wx.Instance.localStorageSetBool(Config.Instance.IS_FREE_TUMTBALE, false);
        //     Wx.Instance.localStorageSetInt(Config.Instance.TUMTABLE_SHARE_NUM, 0);
        //     GameData.isFreeTumtable = Wx.Instance.localStorageGetBool(Config.Instance.IS_FREE_TUMTBALE , false);
        //     GameData.TurntableShareNum = Wx.Instance.localStorageGetInt(Config.Instance.TUMTABLE_SHARE_NUM, 0);
        // }else{
        //     GameData.isFreeTumtable = Wx.Instance.localStorageGetBool(Config.Instance.IS_FREE_TUMTBALE , true);
        //     GameData.TurntableShareNum = Wx.Instance.localStorageGetInt(Config.Instance.TUMTABLE_SHARE_NUM, 0);
        // }
        this.GameMoney = Wx.Instance.localStorageGetInt(Config.Instance.MONEY, 0);
        this.Diamond = Wx.Instance.localStorageGetInt(Config.Instance.DIAMOND, 0);
        GameData.isSignin = Wx.Instance.localStorageGetInt(Config.Instance.IS_SIGN, 0);
        GameData.signNum = Wx.Instance.localStorageGetInt(Config.Instance.SIGN_NUM, 0);
        GameData.isFreeTumtable = Wx.Instance.localStorageGetBool(Config.Instance.IS_FREE_TUMTBALE, false);
        GameData.TurntableWatchNum = Wx.Instance.localStorageGetInt(Config.Instance.TUMTABLE_WATCH_NUM, 0);
        GameData.BonuseSwitch = RemoteControl.Instance.BonusData.switch;
        GameData.AD = RemoteControl.Instance.switchData.ad;
        GameData.ShareNum = Wx.Instance.localStorageGetInt(Config.Instance.KEY_SHARE_NUM, 0);
        if(!Wx.Instance.wx){
            this.user_info = new PlayerData();
            this.user_info.nick_name = "Player1";
            this.user_info.avatar_url = '';
            this.user_info.sex = 1;
            this.user_info.user_integral = 0;
            this.enemyInfo = new PlayerData();
            this.enemyInfo.nick_name = "Player2";
            this.enemyInfo.avatar_url = '';
            this.enemyInfo.sex = 1;
            this.enemyInfo.user_integral = 0;
        }
    }
    /**获取分享次数 */
    getShareTime(): number {
        let time;
        GameData.ShareNum = Wx.Instance.localStorageGetInt(Config.Instance.KEY_SHARE_NUM, 0);
        if (GameData.ShareNum <= 1) {
            time = 3;
        }
        else if (GameData.ShareNum >= 2 && GameData.ShareNum <= 3) {
            time = 3.5;
        }
        else if (GameData.ShareNum >= 4 && GameData.ShareNum <= 5) {
            time = 4;
        }
        else if (GameData.ShareNum >= 6 && GameData.ShareNum <= 7) {
            time = 4.5;
        }
        else if (GameData.ShareNum >= 8 && GameData.ShareNum <= 9) {
            time = 5;
        }
        else if (GameData.ShareNum >= 10 && GameData.ShareNum <= 11) {
            time = 5.5;
        } else {
            time = 6;
            console.log("12次分享以上");
        }
        return time * 1000;
    }
    /**获取红包开关 */
    public GetBonusSwitch(): boolean {
        // return true;
        if (window.wx == undefined) {
            return true;
        }
        return GameData.BonuseSwitch;
    }
    /**获取广告开关 */
    public GetADSwitch(): boolean {
        if (window.wx == undefined) {
            return true;
        }
        return GameData.AD;
    }

    /**获取金币 */
    public GetGameMoney(): number {
        return this.GameMoney;
    }
    /**增加金币 */
    public AddGameMoney(num: number) {
        this.GameMoney += num;
        Wx.Instance.localStorageSetInt(Config.Instance.MONEY, this.GameMoney);
        EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
    }
    /**获得钻石 */
    public GetDiamond() {
        return this.Diamond;
    }
    /**增加钻石 */
    public AddDiamond(num: number) {
        this.Diamond += num;
        Wx.Instance.localStorageSetInt(Config.Instance.DIAMOND, this.Diamond);
        EventManager.Instance.ExcuteListener(Config.Instance.DIAMOND);
    }
    /**获取红包数额 */
    public GetBonus() {
        return this.Bonuse;
    }
    /**增加红包 */
    public AddBonuse(num: number) {
        this.Bonuse += num;
        Wx.Instance.localStorageSetFloat(Config.Instance.BONUSE, this.Bonuse);
        EventManager.Instance.ExcuteListener(Config.Instance.BONUSE);
    }

    //开始保存PK信息
    startPK(){
        this.PkData = new EnemyAI();
        if(!this.enemyAI){
            if(this.enemyInfo.record_data){
                console.log(this.enemyInfo.record_data);
                this.enemyAI = JSON.parse(this.enemyInfo.record_data);
            }else{
                this.enemyAI = new EnemyAI();
                let time = Math.floor(Math.random()*3 + 2);
                while (time < 120) {
                    let data: EnemyAIData = new EnemyAIData();
                    data.time = time;
                    data.score = GameHelper.Instance.EnemyAddNum(GameData.Instance.user_info.user_integral);
                    this.enemyAI.data.push(data);
                    time += Math.floor(Math.random() * 3 + 2);
                }
            }
        }
    }

    //增加PK得分
    PkAddScore(time: number, num: number) {
        let data = new EnemyAIData();
        data.time = time;
        data.score = num;
        this.PkData.data.push(data);
    }

    SetTipsText(Tips:string){
        this.TipsText = Tips;
    }
    GetTipsText():string{
        return this.TipsText;
    }

    getIsSign(){
        return GameData.isSignin;
    }
}
