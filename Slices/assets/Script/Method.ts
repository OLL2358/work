import BasePos from './Game/Model/BasePos';
import GamePrefabs from './GamePrefabs';
import Wx from './Wx/Wx';
import Config from './tool/model/Config';
import { RewardType, RewardSystem, GetRewardType } from './Game/tool/RewardSystem';
import RemoteControl from './Game/tool/RemoteCtrl';
import GameData from './GameData';
import EventManager from './tool/common/EventManager';
import EventMessage from './tool/model/EventMessage';
import Utility from './common/Utility';
import ADData from './ADData';
import WxTool from './Wx/Wxtool';
import turntable from './turntable';
import GameHelper from './GameHelper';
import NetManager from './common/NetManager';
import SignIn from './SignIn';
import ADItem from './AD/ADItem';
import BannerItem from './AD/BannerItem';
import AdManage from './AD/AdManage';
import ShareLimit from './common/ShareTheLimit';

const { ccclass, property } = cc._decorator;
@ccclass
export default class Method extends cc.Component {
    private static _instance: Method;
    public static get instance(): Method {
        return this._instance;
    }

    @property(cc.Node)
    game: cc.Node = null;
    @property(cc.Node)
    startNode: cc.Node = null;
    @property(cc.Node)
    Setting: cc.Node = null;
    @property(cc.Node)
    Title: cc.Node = null;
    @property(cc.Node)
    Resurgence: cc.Node = null;
    @property(cc.Node)
    AD: cc.Node = null;
    @property(cc.Prefab)
    Gameobj0: cc.Node = null;
    @property(cc.Prefab)
    Gameobj1: cc.Node = null;
    @property(cc.Prefab)
    Gameobj2: cc.Node = null;
    @property(cc.Prefab)
    Gameobj3: cc.Node = null;
    @property(cc.Prefab)
    Gameobj4: cc.Node = null;
    @property(cc.Prefab)
    Gameobj5: cc.Node = null;
    @property(cc.Prefab)
    previewNode0: cc.Node = null;
    @property(cc.Prefab)
    previewNode1: cc.Node = null;
    @property(cc.Prefab)
    previewNode2: cc.Node = null;
    @property(cc.Prefab)
    previewNode3: cc.Node = null;
    @property(cc.Prefab)
    previewNode4: cc.Node = null;
    @property(cc.Prefab)
    previewNode5: cc.Node = null;
    @property(cc.Node)
    preview: cc.Node = null;
    @property(cc.Node)
    Antipasto_0: cc.Node = null;
    @property(cc.Node)
    Antipasto_1: cc.Node = null;
    @property(cc.Node)
    Antipasto_2: cc.Node = null;
    @property(cc.Node)
    Antipasto_3: cc.Node = null;
    @property(cc.Node)
    Antipasto_4: cc.Node = null;
    @property(cc.Node)
    Antipasto_5: cc.Node = null;
    @property(cc.Node)
    StartBase_Antipasto: cc.Node = null;
    @property(cc.Node)
    Hammer: cc.Node = null;
    @property(cc.Node)
    BigHammer0: cc.Node = null;
    @property(cc.Node)
    BigHammer1: cc.Node = null;
    @property(cc.Node)
    BigHammer2: cc.Node = null;
    @property(cc.Node)
    BigHammer3: cc.Node = null;
    @property(cc.Node)
    BigHammer4: cc.Node = null;
    @property(cc.Node)
    BigHammer5: cc.Node = null;
    @property(cc.Node)
    HammerButton: cc.Node = null;
    @property(cc.Node)
    mask: cc.Node = null;
    @property(cc.Label)
    maskText: cc.Label = null;
    @property(cc.Label)
    Score: cc.Label = null;
    @property(cc.Prefab)
    PlusOne0: cc.Node = null;
    @property(cc.Prefab)
    PlusOne1: cc.Node = null;
    @property(cc.Prefab)
    PlusOne2: cc.Node = null;
    @property(cc.Prefab)
    PlusOne3: cc.Node = null;
    @property(cc.Prefab)
    PlusOne4: cc.Node = null;
    @property(cc.Prefab)
    PlusOne5: cc.Node = null;
    @property(cc.Prefab)
    removeScore: cc.Node = null;
    @property(cc.Node)
    UniversalBlockNode: cc.Node = null;
    @property(cc.Node)
    FunMask: cc.Node = null;
    @property(cc.Node)
    Guide: cc.Node = null;
    @property(cc.Node)
    GuideAntipasto: cc.Node = null;
    /**背景音乐 */
    @property(cc.AudioClip)
    BackgroundMusic: cc.AudioClip = null;
    /**死亡音乐 */
    @property(cc.AudioClip)
    DeathMusic: cc.AudioClip = null;
    /**放置音乐 */
    @property(cc.AudioClip)
    PlaceMusic: cc.AudioClip = null;
    /**圆盘消除音效 */
    @property(cc.AudioClip)
    SynthesisOfMusic: cc.AudioClip = null;
    /**放置错误音效 */
    @property(cc.AudioClip)
    ErrorMusic: cc.AudioClip = null;
    @property(cc.Node)
    MusicLine: cc.Node = null;
    @property(cc.Node)
    Musicicon: cc.Node = null;
    @property(cc.Node)
    SignView: cc.Node = null;
    @property(cc.Node)
    Revive: cc.Node = null;
    @property(cc.Node)
    Over: cc.Node = null;
    @property(cc.Label)
    OverScore: cc.Label = null;
    @property(cc.Label)
    Money: cc.Label = null;
    @property(cc.Node)
    GitBox: cc.Node = null;
    @property(cc.Node)
    Box: cc.Node = null;
    @property(cc.Node)
    jinbi: cc.Node = null;
    @property(cc.Node)
    BasePanel: cc.Node = null;

    clickTime: number = 0;
    private static isMusic = true;

    //更多游戏静态Icon
    @property(cc.Node)
    StrarIcon: cc.Node = null;
    @property(cc.Node)
    GuessYouLikeIcon1: cc.Node = null;
    @property(cc.Node)
    GuessYouLikeIcon2: cc.Node = null;
    @property(cc.Node)
    GuessYouLikeIcon3: cc.Node = null;
    @property(cc.Node)
    GuessYouLikeIcon4: cc.Node = null;
    @property(cc.Node)
    GuessYouLikeIcon5: cc.Node = null;
    @property(cc.Node)
    GuessYouLikeNode: cc.Node = null;

    @property(cc.Node)
    StartIcon: cc.Node = null;


    randomIndex = 0;

    GuessYouLikeIcon1AD: string = ADData.instance.AdData[3].appId;
    GuessYouLikeIcon2AD: string = ADData.instance.AdData[0].appId;
    GuessYouLikeIcon3AD: string = ADData.instance.AdData[1].appId;
    GuessYouLikeIcon4AD: string = ADData.instance.AdData[4].appId;
    GuessYouLikeIcon5AD: string = ADData.instance.AdData[7].appId;
    randomIconAD: string = null;

    @property(cc.Node)
    QRcode: cc.Node = null;
    @property(cc.Node)
    Drawer: cc.Node = null;
    @property(cc.Node)
    DrawerButton: cc.Node = null;
    @property(cc.Node)
    randomIcon: cc.Node = null;
    @property(cc.Node)
    randomIcon_Node: cc.Node = null;
    @property(cc.Node)
    moreGame: cc.Node = null;
    @property(cc.Node)
    moreGameView: cc.Node = null;

    @property(cc.Prefab)
    Particle: cc.Node = null;


    private matchList0 = [];
    private matchList1 = [];
    private matchList2 = [];
    private matchList3 = [];
    private matchList4 = [];
    private matchList5 = [];
    private matchcost0: number = 0;
    private matchcost1: number = 0;
    private matchcost2: number = 0;
    private matchcost3: number = 0;
    private matchcost4: number = 0;
    private matchcost5: number = 0;

    @property(cc.Node)
    MatchBasePanel: cc.Node = null
    @property(cc.Node)
    MatchAntipasto_0: cc.Node = null
    @property(cc.Node)
    MatchAntipasto_1: cc.Node = null
    @property(cc.Node)
    MatchAntipasto_2: cc.Node = null
    @property(cc.Node)
    MatchAntipasto_3: cc.Node = null
    @property(cc.Node)
    MatchAntipasto_4: cc.Node = null
    @property(cc.Node)
    MatchAntipasto_5: cc.Node = null

    private BaseList0 = [];
    private BaseList1 = [];
    private BaseList2 = [];
    private BaseList3 = [];
    private BaseList4 = [];
    private BaseList5 = [];
    private obj: cc.Node = null;
    private cost0: number = 0;
    private cost1: number = 0;
    private cost2: number = 0;
    private cost3: number = 0;
    private cost4: number = 0;
    private cost5: number = 0;
    /**随机数 */
    private random: number = null;
    private randomFloor: number = null;
    private index: number = null;
    /**水果类型索引 */
    private FruitsIndex: number = null;
    /**预制体索引 */
    private Preview: number = null;
    /**总分数 */
    private SumScore: number = 0;
    /**是否完成引导 */
    private isGuide = 1;
    /**预览水果预制体 */
    private PreviewNode: cc.Node = null;

    private seq;

    private CurFruits: cc.SpriteAtlas;
    private FruitsColor: string;

    /**关卡索引 */
    private StoryIndex: number = 0;
    private isAgain: boolean = false;
    @property(cc.Sprite)
    Fruits: cc.Sprite = null;
    @property(cc.Node)
    StoryNumView: cc.Node = null;
    @property(cc.Node)
    PromptBoard: cc.Node = null;
    @property(cc.Node)
    Achieve: cc.Node = null;
    @property(cc.Node)
    PassFruits: cc.Node = null;
    @property(cc.Node)
    FirstPass: cc.Node = null;
    @property(cc.Node)
    PassButton: cc.Node = null;
    @property(cc.Node)
    storyButton_0: cc.Node = null;
    @property(cc.Node)
    storyButton_1: cc.Node = null;
    @property(cc.Node)
    storyButton_2: cc.Node = null;
    @property(cc.Node)
    storyButton_3: cc.Node = null;
    @property(cc.Node)
    storyButton_4: cc.Node = null;
    @property(cc.Node)
    storyButton_5: cc.Node = null;
    @property(cc.Node)
    StoryBasePanel: cc.Node = null;
    @property(cc.Node)
    StoryPreview: cc.Node = null;

    /**分享标示s */
    public static ShareIndex: number = 0;
    public static BeforeTheShareTime: number = 0;
    AfterSharingTime: number = 0;

    /**限制 */
    randomCost0: number = 0;
    randomCost1: number = 0;
    randomCost2: number = 0;
    randomCost3: number = 0;
    randomCost4: number = 0;
    randomCost5: number = 0;
    randomCost6: number = 0;

    randomCost00: number = 0;
    randomCost11: number = 0;
    randomCost22: number = 0;
    randomCost33: number = 0;
    randomCost44: number = 0;
    randomCost55: number = 0;
    randomCost66: number = 0;

    public static StartBase: Array<BasePos>;
    public static Base0Info: Array<BasePos>;
    public static Base1Info: Array<BasePos>;
    public static Base2Info: Array<BasePos>;
    public static Base3Info: Array<BasePos>;
    public static Base4Info: Array<BasePos>;
    public static Base5Info: Array<BasePos>;
    public static BasePosInfo: Array<BasePos>;

    /**水果图集 */
    public static CocoAtlas: cc.SpriteAtlas;
    public static KiwiAtlas: cc.SpriteAtlas;
    public static LemonAtlas: cc.SpriteAtlas;
    public static MangosteenAtlas: cc.SpriteAtlas;
    public static OrangeAtlas: cc.SpriteAtlas;
    public static PawpawAtlas: cc.SpriteAtlas;
    public static PineappleAtlas: cc.SpriteAtlas;
    public static PomeloAtlas: cc.SpriteAtlas;

    public static PassAtlas: cc.SpriteAtlas;
    public static PitayaAtlas: cc.SpriteAtlas;
    public static PearAtlas: cc.SpriteAtlas;
    public static AppleAtlas: cc.SpriteAtlas;
    public static PomegranateAtlas: cc.SpriteAtlas;
    public static WatermelonAtlas: cc.SpriteAtlas;
    /**广告Icon */
    public static QRcodeAtlas: cc.SpriteAtlas;
    public static BannerIconAtlas: cc.SpriteAtlas;

    public static RecruitModel: cc.SpriteAtlas;

    @property(cc.Node)
    EndlessTheme: cc.Node = null;
    @property(cc.Node)
    MatchedTheme: cc.Node = null;
    @property(cc.Node)
    LevelTheme: cc.Node = null;
    @property(cc.Node)
    SignIcon: cc.Node = null;
    @property(cc.Node)
    turntableIcon: cc.Node = null;
    @property(cc.Node)
    FreeDiamondIcon: cc.Node = null;
    @property(cc.Node)
    RedpackteIcon: cc.Node = null;
    @property(cc.Node)
    TaskBtnIcon: cc.Node = null;
    @property(cc.Node)
    turntableNode: cc.Node = null;
    @property(cc.Node)
    FieldGuideNode: cc.Node = null;


    @property(cc.Node)
    LoadingView: cc.Node = null;
    @property(cc.Node)
    ProgressBar: cc.Node = null;

    @property(cc.Node)
    Base0Node: cc.Node = null;
    @property(cc.Node)
    Base1Node: cc.Node = null;
    @property(cc.Node)
    Base2Node: cc.Node = null;
    @property(cc.Node)
    Base3Node: cc.Node = null;
    @property(cc.Node)
    Base4Node: cc.Node = null;
    @property(cc.Node)
    Base5Node: cc.Node = null;

    @property(cc.Node)
    FunctionNode: cc.Node = null;
    @property(cc.Node)
    StartBaseNode: cc.Node = null;

    public static SharesWitch: boolean = null;

    @property(cc.Node)
    QRCODE1: cc.Node = null;
    @property(cc.Node)
    QRCODE2: cc.Node = null;
    @property(cc.Node)
    QRCODE3: cc.Node = null;
    @property(cc.Node)
    QRCODE4: cc.Node = null;

    DeathIndex: number = 0;

    @property(cc.Node)
    WarningTips: cc.Node = null
    @property(cc.Node)
    Tips: cc.Node = null
    @property(cc.Label)
    TopScoreNode: cc.Label = null
    Tipswhether: boolean = false;

    @property(cc.Node)
    share: cc.Node = null

    TopScore: number = 0;

    //PanelView
    @property(cc.Node)
    PanelView: cc.Node = null;
    /**免费金币界面 */
    @property(cc.Prefab)
    FreeMoneyView: cc.Prefab = null;
    /**匹配界面 */
    @property(cc.Node)
    MatchingView: cc.Node = null;
    /**PK界面 */
    @property(cc.Node)
    PlayerKilling: cc.Node = null;
    /**结算提示 */
    @property(cc.Node)
    FinishTips: cc.Node = null;
    /**结算界面 */
    @property(cc.Node)
    FinishView: cc.Node = null;
    /**提现界面 */
    @property(cc.Node)
    WithdrawMoneyView: cc.Node = null;

    /**比赛时间 */
    @property(cc.Node)
    TimeNode: cc.Node = null;

    /**红包页面 */
    @property(cc.Node)
    RedPackteView: cc.Node = null;
    /**红包icon */
    @property(cc.Node)
    Bonusicon: cc.Node = null;
    @property(cc.Label)
    BonusNum: cc.Label = null;

    PKTime: number = 120;

    @property(cc.Label)
    DiamondNum: cc.Label = null;

    @property(cc.Prefab)
    TipsPanel: cc.Prefab = null;
    @property(cc.Prefab)
    PlayingFreeDiamondPanel: cc.Prefab = null;
    @property(cc.Prefab)
    MoneyChangingPanel: cc.Prefab = null;
    @property(cc.Prefab)
    MapTheTrial: cc.Prefab = null;
    @property(cc.Prefab)
    BoxPanel: cc.Prefab = null;

    public boxpanel: cc.Node = null;

    /**打开界面次数 */
    public static OpenViewNum: number = 0;

    isdie: boolean = false;

    rankUserBtn;
    matchUserBtn;

    //皮肤界面
    MapTheTrialView() {
        if (RemoteControl.Instance.switchData.share) {
            Method.OpenViewNum++;
            let View = cc.instantiate(this.MapTheTrial);
            View.parent = this.PanelView;
        } else {
            this.continueCreate();
        }

    }

    //提示界面
    TipsView(Text: string) {
        Method.OpenViewNum++;
        GameData.Instance.SetTipsText(Text);
        let View = cc.instantiate(this.TipsPanel);
        View.parent = this.PanelView;
    }

    //兑换界面
    MoneyChangingView() {
        Method.OpenViewNum++;
        let View = cc.instantiate(this.MoneyChangingPanel);
        View.parent = this.PanelView;
    }

    PlayingFreeDiamond() {

        this.schedule(() => {
            if (cc.find("PlayingFreeDiamond", this.PanelView) == null) {
                if (Wx.Instance.localStorageGetInt(Config.Instance.PlayingFreeDiamond, 0) >= 3) {
                    console.log("今天领取的次数已满");
                    return;
                } else {
                    Method.OpenViewNum++;
                    let View = cc.instantiate(this.PlayingFreeDiamondPanel);
                    View.parent = this.PanelView;
                }
            }
        }, Math.random() * 120 + 180);
    }

    BonusBtn() {
        Method.OpenViewNum++;
        // Wx.Instance.hideGameClub();
        this.turntableNode.active = true;
        this.turntableNode.scale = 1;
        this.turntableNode.opacity = 255;
        this.WithdrawMoneyView.active = true;
    }

    AddMoney() {
        Method.OpenViewNum++;
        let view = cc.instantiate(this.FreeMoneyView);
        view.parent = this.PanelView;
    }

    Matching() {
        Method.OpenViewNum++;
        setTimeout(() => {
            this.MatchingView.active = false;
            this.PlayerKilling.active = true;
            this.TimeOut();
        }, 4000);
    }

    TimeOut() {
        let minute = cc.find("minute", this.TimeNode).getComponent(cc.Label);
        let second = cc.find("second", this.TimeNode).getComponent(cc.Label);

        this.schedule(() => {
            this.PKTime--;
            minute.string = Math.floor(this.PKTime / 60).toString();
            second.string = (this.PKTime % 6).toString();
            if (this.PKTime <= 0) {
                //结算界面
                let Bg = cc.find("Bg", this.FinishTips);
                Bg.setPosition(-730, 160);
                this.FinishTips.active = true;
                Bg.runAction(cc.sequence(
                    cc.moveTo(1, -730, 160),
                    cc.delayTime(2),
                    cc.moveTo(1, 730, 160),
                    cc.callFunc(() => {
                        this.FinishTips.active = false;
                        this.FinishView.active = true;
                    })
                ))
                return;
            }
        }, 1);
    }

    start() {

        let hthis = this;
        if (!Wx.Instance.wx) {
            hthis.FunStart();
        } else {
            AdManage.initComponent(cc.find("ADNode", this.node), function (parent_node) {
                // AdManage.createCarouselIcon(parent_node,-295,315);//轮播Icon
                AdManage.createGuessLike(parent_node, 0, -210, 0.73,
                    "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/guess_like_7.png",
                    0, 0, 25, null, 715 * 0.75, 200 * 0.75);//猜你喜欢
                AdManage.createDrawer(parent_node, 0, 30, 0.75); //抽屉
                // AdManage.createDrawer(parent_node,0,200,0.5); //抽屉
                // AdManage.createPlayGameAd(parent_node,0,0);//静态Icon
                AdManage.createPlayGameAd(parent_node, 0, 120, 0.65, 75, -10, 10);//静态Icon
                let aa = AdManage.createExitBtn(parent_node, -225, 390, 0.8);//退出游戏按钮
                // AdManage.createMoreGame(parent_node,210,-350);//更多游戏
                console.log("initComponent===================", AdManage.game_box_data);
                AdManage.createGameBox(parent_node, 0, 50, 0.75, 135 * 1.2, 83 * 1.2, "https://gg-1256769450.cos.ap-guangzhou.myqcloud.com/ad_style/game_box_7.png");
                console.log("aaaaaaaaaaaaa ", aa);
                hthis.FunStart();
            });
        }
    }

    FunStart() {
        NetManager.Instance.LoginWithoutUser((isSuccess) => {
            console.log("登陆成功");
        });
        Method._instance = this;
        Wx.Instance.init();
        WxTool.Instance.init();
        GamePrefabs.Instance.Init();


        this.random = this.value;

        this.LoadingView.active = true;
        this.startNode.active = false;
        this.game.active = false;
        this.Resurgence.active = false;
        this.GitBox.active = false;
        this.Title.active = false;
        this.turntableNode.active = false;
        this.RedPackteView.active = false;

        this.DiamondNum.string = GameData.Instance.GetDiamond().toString();

        // this.turntableIcon.active = this.Bonusicon.active = GameData.Instance.GetBonusSwitch();
        this.BonusNum.string = '￥' + GameHelper.Instance.keepTwoDecimalFull(GameData.Instance.GetBonus());
        this.WithdrawMoneyView.active = false;

        // this.SignView.active = true;
        this.SumScore = 0;
        this.isGuide = Wx.Instance.localStorageGetInt(Config.Instance.IS_GUIDE, 0);
        //获取通过多少关卡
        this.StoryIndex = Wx.Instance.localStorageGetInt(Config.Instance.STORY_NUM, 0) == 0 ? 1 : Wx.Instance.localStorageGetInt(Config.Instance.STORY_NUM, 0);

        let Moneynum: number = GameData.Instance.GetGameMoney();
        this.Money.string = Moneynum.toString();



        Wx.Instance.initVideo("adunit-22bf932e018a4368");
        RewardSystem.Instance.init(this.node);

        // if (GameData.Instance.getIsSign() == 0) {
        //     setTimeout(() => {
        //         this.Signbutton();
        //     }, 2000);
        // }

        if (this.isGuide == 1) {
            // this.Guide.active = false;
            // this.Guide.removeFromParent();
            // this.Preview = this.randomNum();
        } else {
            // this.Guide.active = true;
            this.Preview = 0;
        }

        this.exposeEnv();


        //背景音乐
        // cc.audioEngine.play(this.BackgroundMusic.name, true, 0.3);
        // setTimeout(() => {
        //     this.create();
        // }, 1000);
        this.Listen();

        // this.PlayingFreeDiamond();

        Wx.Instance.ShowBanner();
        Wx.Instance.ShowInterstitial();
        this.schedule(() => {
            if (this.boxpanel == null) {
                Wx.Instance.hideBanner();
                Wx.Instance.ShowBanner();
            }
        }, 90)


        if (Wx.Instance.wx != undefined) {
            const res = wx.getSystemInfoSync()
            if (res.model.indexOf("iPhone", 0) == 0) {
                cc.find("di/haoyouzaiwan", this.moreGameView).active = false;
            } else {
                cc.find("di/haoyouzaiwan", this.moreGameView).active = true;
            }
        }
    }

    /**
     * 进入游戏动画
     */
    animationFun() {
        Wx.Instance.OnEvent("加载游戏", "功能", "进入游戏首页");
        Method.OpenViewNum++;
        // Wx.Instance.showGameClub();
        this.moreGame.active = true;
        this.randomIcon_Node.setPosition(-200, 220);
        this.randomIcon_Node.rotation = 0;
        // this.DrawerButton.active = true;
        // this.DrawerButton.setPosition(240, 222);
        // this.logo.active = false;
        // setTimeout(() => {
        //     this.logo.getComponent(cc.Animation).play("StartTitle");
        // }, 1000);
        // this.EndlessTheme.parent.getComponent(cc.Animation).play();
        // this.EndlessTheme.runAction(cc.repeatForever(cc.sequence(
        //     cc.delayTime(2),
        //     cc.scaleTo(1, 0.8, 0.8),
        //     cc.scaleTo(0.1, 0.9, 0.9),
        //     cc.scaleTo(0.1, 1, 0.87),
        //     cc.scaleTo(0.1, 0.8, 0.87),
        //     cc.scaleTo(0.1, 0.9, 0.87),
        //     cc.scaleTo(0.1, 0.84, 1),
        //     cc.scaleTo(0.1, 0.8, 0.8),
        // )))
        // this.DrawerButton.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.4, 1),
        //     cc.scaleTo(0.1, 0.9),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 1),
        // ))
        // this.DrawerButton.setScale(0);
        // this.DrawerButton.opacity = 0;
        // this.DrawerButton.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.2, 200),
        //     cc.fadeTo(0.1, 255),
        //     cc.delayTime(2),
        //     cc.callFunc(() => {
        //         var anim = this.DrawerButton.getComponent(cc.Animation);
        //         anim.play();
        //     })
        // ))
        // this.randomIcon_Node.rotation = 0;
        // this.randomIcon_Node.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.randomIcon_Node.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.4, 1),
        //     cc.scaleTo(0.1, 0.9),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 1),
        // ))
        // this.randomIcon_Node.runAction(cc.repeatForever(cc.sequence(
        //     cc.delayTime(3),
        //     cc.rotateTo(0.2, 15),
        //     cc.rotateTo(0.2, -15),
        //     cc.rotateTo(0.1, 15),
        //     cc.rotateTo(0.1, 0),
        // )))

        // this.MatchedTheme.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.7),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.MatchedTheme.runAction(cc.sequence(
        //     cc.scaleTo(0, 0),
        //     cc.delayTime(0.7),
        //     cc.scaleTo(0.3, 0.8),
        //     cc.scaleTo(0.1, 0.9),
        //     cc.scaleTo(0.05, 0.98, 0.87),
        //     cc.scaleTo(0.05, 0.8, 0.87),
        //     cc.scaleTo(0.05, 0.86, 0.87),
        //     cc.scaleTo(0.05, 0.84, 0.9),
        //     cc.scaleTo(0.1, 0.8, 0.8),
        // ))

        // this.LevelTheme.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(1),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.LevelTheme.runAction(cc.sequence(
        //     cc.scaleTo(0, 0),
        //     cc.delayTime(1),
        //     cc.scaleTo(0.3, 0.8),
        //     cc.scaleTo(0.1, 0.9),
        //     cc.scaleTo(0.05, 0.98, 0.87),
        //     cc.scaleTo(0.05, 0.8, 0.87),
        //     cc.scaleTo(0.05, 0.86, 0.87),
        //     cc.scaleTo(0.05, 0.84, 0.9),
        //     cc.scaleTo(0.1, 0.8, 0.8),
        // ))

        // this.SignIcon.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.SignIcon.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.7),
        // ))

        // this.turntableIcon.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.turntableIcon.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.8),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.8),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.8),
        // ))

        // this.TaskBtnIcon.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.TaskBtnIcon.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.6),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.6),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.6),
        // ))
        // this.FieldGuideNode.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.FieldGuideNode.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.7),
        // ))

        // this.moreGame.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.moreGame.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 1.2),
        //     cc.scaleTo(0.2, 1.3, 1),
        //     cc.scaleTo(0.1, 1.2),
        //     cc.scaleTo(0.2, 1.4, 0.9),
        //     cc.scaleTo(0.1, 1.2),
        // ))

        // this.FreeDiamondIcon.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.FreeDiamondIcon.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.6),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.6),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.6),
        // ))

        // this.RedpackteIcon.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.RedpackteIcon.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.8),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.8),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.8),
        // ))

        this.GuessYouLikeNode.active = true;
        // this.GuessYouLikeNode.setPosition(0, -180);
        // this.GuessYouLikeNode.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(1.3),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.GuessYouLikeNode.runAction(cc.sequence(
        //     cc.scaleTo(0, 0),
        //     cc.delayTime(1),
        //     cc.scaleTo(0.3, 0.7),
        //     cc.scaleTo(0.1, 0.8),
        //     cc.scaleTo(0.05, 0.88, 0.77),
        //     cc.scaleTo(0.05, 0.7, 0.77),
        //     cc.scaleTo(0.05, 0.76, 0.77),
        //     cc.scaleTo(0.05, 0.74, 0.8),
        //     cc.scaleTo(0.1, 0.7, 0.7),
        // ))

        // setTimeout(() => {
        //     //初始化广告
        //     this.GuessYouLikeInit();
        //     this.DrawerInit()
        //     this.MoreGameInit();
        //     this.RandomIcon();
        //     setTimeout(() => {
        //         if (Wx.Instance.localStorageGetInt(Config.Instance.EVERYDAY_BONUS, 0) == 0) {
        //             this.RedPackteView.active = RemoteControl.Instance.BonusData.switch;
        //         }
        //     }, 1500);
        // }, 3000);
        this.StrarIcon.active = false;

    }

    randomFruits(num: number) {
        if (num == 0) {
            this.FruitsColor = "ffffff";
            this.CurFruits = Method.CocoAtlas;
        } else if (num == 1) {
            this.FruitsColor = "92bb1a";
            this.CurFruits = Method.KiwiAtlas;
        } else if (num == 2) {
            this.FruitsColor = "f3ea05";
            this.CurFruits = Method.LemonAtlas;
        } else if (num == 3) {
            this.FruitsColor = "faf2e5";
            this.CurFruits = Method.MangosteenAtlas;
        } else if (num == 4) {
            this.FruitsColor = "f2a80a";
            this.CurFruits = Method.OrangeAtlas;
        } else if (num == 5) {
            this.FruitsColor = "fd6a1d";
            this.CurFruits = Method.PawpawAtlas;
        } else if (num == 6) {
            this.FruitsColor = "fbed6a";
            this.CurFruits = Method.PineappleAtlas;
        } else if (num == 7) {
            this.FruitsColor = "ff7893";
            this.CurFruits = Method.PomeloAtlas;
        } else if (num == 8) {
            this.FruitsColor = "fdce27";
            this.CurFruits = Method.PassAtlas;
        } else if (num == 9) {
            this.FruitsColor = "fe0084";
            this.CurFruits = Method.PitayaAtlas;
        } else if (num == 10) {
            this.FruitsColor = "fdfbd2";
            this.CurFruits = Method.PearAtlas;
        } else if (num == 11) {
            this.FruitsColor = "ef2400";
            this.CurFruits = Method.AppleAtlas;
        } else if (num == 12) {
            this.FruitsColor = "f22c1c";
            this.CurFruits = Method.PomegranateAtlas;
        } else if (num == 13) {
            this.FruitsColor = "fa5931";
            this.CurFruits = Method.WatermelonAtlas;
        }
    }

    randomFruitsNum(): number {
        let num = Math.floor(Math.random() * 13);
        return num;
    }

    /**
     * 1：斗破修仙
     * 2：小小三国志
     * 3：逐日战神
     * 4：小宝当皇上
     * @param index 
     */
    ShowQRcode(index) {
        let urls = []
        index == 1 ? urls = [ADData.instance.AdData[10].imageUrl] :
            index == 2 ? urls = [ADData.instance.AdData[11].imageUrl] :
                index == 3 ? urls = [ADData.instance.AdData[12].imageUrl] :
                    urls = [ADData.instance.AdData[13].imageUrl]
        // wx.previewImage({ current: urls[0], urls })
        Wx.Instance.openImage(urls[0]);


        // switch (index) {
        //     case 1:
        //     urls = ["https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/三国封魔传.jpg"]
        //         break;
        //     case 2:
        //     urls = ["https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/仙界奇迹.jpg"]
        //         break;
        //     case 3:
        //     urls = ["https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/封神来了.jpg"]
        //         break;
        //     case 4:
        //     urls = ["https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/小小三国志.jpg"]
        //         break;
        //     default:
        //         break;
        // }
        // urls = [
        //     "https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/三国封魔传.jpg",
        //     "https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/仙界奇迹.jpg",
        //     "https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/封神来了.jpg",
        //     "https://freshfruit-1256769450.cos.ap-chengdu.myqcloud.com/QRcode/小小三国志.jpg",
        // ]


        // wx.previewImage({
        //     current: urls[0], // 当前显示图片的http链接
        //     urls: [
        //         'http://www.pptbz.com/pptpic/UploadFiles_6909/201211/2012111719294197.jpg'
        //     ] // 需要预览的图片http链接列表
        //   })
        // wx.updateShareMenu({
        //     withShareTicket: true,
        //     success() { 
        //         console.log("????")
        //     }
        //   })
        // wx.showShareMenu({
        //     withShareTicket: true
        //   });
        // wx.showToast({
        //     title: '成功',
        //     icon: 'success',
        //     image: 'resources/HelloWorld',
        //     duration: 2000
        // })
        //   wx.showActionSheet({
        //     itemList: ['A', 'B', 'C'],
        //     success(res) {
        //       console.log(res.tapIndex)
        //     },
        //     fail(res) {
        //       console.log(res.errMsg)
        //     }
        //   })
    }

    /**
     * 监听
     */
    Listen() {

        EventManager.Instance.AddListener(this.node, Config.Instance.GetData, () => {
            console.log("初始化成功");
            //初始化广告

            // this.GuessYouLikeInit();
            // this.DrawerInit()
            // this.MoreGameInit();
            // this.RandomIcon();
            // this.ADicon();
            // setTimeout(() => {
            //     if (Wx.Instance.localStorageGetInt(Config.Instance.EVERYDAY_BONUS, 0) == 0) {
            //         this.RedPackteView.active = RemoteControl.Instance.BonusData.switch;
            //         ADData.instance.NewAdData.more_game.length == 0 ? null : this.ShowMoreGame();
            //     }
            // }, 1500);
        })
        EventManager.Instance.AddListener(this.node, Config.Instance.FruitsTryOut, () => {
            //皮肤试用
            this.continueCreate();
        })
        EventManager.Instance.AddListener(this.node, Config.Instance.BONUSE, () => {
            //红包
            this.BonusNum.string = '￥' + GameHelper.Instance.keepTwoDecimalFull(GameData.Instance.GetBonus());
        })
        EventManager.Instance.AddListener(this.node, Config.Instance.DIAMOND, () => {
            //钻石
            this.DiamondNum.string = GameData.Instance.GetDiamond().toString();
        })
        EventManager.Instance.AddListener(this.node, Config.Instance.MONEY, () => {
            //金币
            this.Money.string = GameData.Instance.GetGameMoney().toString();
        })
        EventManager.Instance.AddListener(this.node, EventMessage.instance.passShare, () => {
            console.log("分享时差: ", this.AfterSharingTime - Method.BeforeTheShareTime);
            if (this.AfterSharingTime - Method.BeforeTheShareTime >= GameData.Instance.getShareTime()) {
                //炫耀
                if (Method.ShareIndex == 0) {
                    GameData.Instance.AddGameMoney(15);
                    Wx.Instance.ShowToast("恭喜你获得了三倍奖励！");
                    EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
                }
                //转盘
                else if (Method.ShareIndex == 1) {
                    turntable.Instance.ShareRotate();
                }
            } else {
                Wx.Instance.ShowToast("请分享到不同的群");
            }
        })
        EventManager.Instance.AddListener(this.node, EventMessage.instance.GameInfo, (params) => {
            this.ProgressBar.getComponent(cc.ProgressBar).progress = params[0];
            console.log(params[0]);
            if (params[0] >= 0.9) {
                setTimeout(() => {
                    console.log("加载成功！");
                    Wx.Instance.OnEvent("加载游戏", "功能", "完成loading100%");
                    this.LoadingView.active = false;
                    this.startNode.active = true;
                    this.Over.getChildByName("anniu_1").active = RemoteControl.Instance.switchData.share;
                    cc.find("AD", this.node).active = false;
                    // this.share.active = RemoteControl.Instance.switchData.share;
                    // this.TaskBtnIcon.active = this.AD.active = RemoteControl.Instance.switchData.ad;
                    // this.RedpackteIcon.active = RemoteControl.Instance.BonusData.switch;
                    // this.turntableIcon.active = RemoteControl.Instance.BonusData.switch;
                    console.log("mark");
                    this.ResurgenceMark();
                    this.mark();
                    this.GitBoxMark();
                    this.animationFun();
                }, 800);
            }
        })
        EventManager.Instance.AddListener(this.node, EventMessage.instance.GameResourcesInit, (params) => {
            if (params[0] >= 1) {
                GamePrefabs.instance.NextResLoadSuccees = true;
                console.log("图集加载")
            }
        })
    }

    mark() {
        if (ShareLimit.CanWatchVideo()) {
            cc.find("Canvas/Start/FreeDiamond/mark/share").active = false;
            cc.find("Canvas/Start/FreeDiamond/mark/vidoe").active = true;
        } else if (ShareLimit.CanShare()) {
            cc.find("Canvas/Start/FreeDiamond/mark/share").active = true;
            cc.find("Canvas/Start/FreeDiamond/mark/vidoe").active = false;
        } else {
            cc.find("Canvas/Start/FreeDiamond/mark/share").active =
                cc.find("Canvas/Start/FreeDiamond/mark/vidoe").active = false;
        }
    }

    checkList() {
        if (this.BaseList0.indexOf(0) != -1 && this.BaseList1.indexOf(0) != -1 &&
            this.BaseList2.indexOf(0) != -1 && this.BaseList3.indexOf(0) != -1 &&
            this.BaseList4.indexOf(0) != -1 && this.BaseList5.indexOf(0) != -1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 无尽随机数0 ~ 1
     */
    randomNum(): number {
        // if (this.appear1()) {
        //     console.log("不死: ", this.appear1());
        //     return this.appear1();
        // }
        // if(this.random > 0.5){
        //     return 14;
        // }else{
        //     return 17;
        // }
        let num;
        // this.random > 0.22 ?
        //     this.random > 0 && this.random < 0.15 ? num = 0 :
        //         this.random > 0.15 && this.random < 0.29 ? num = 0 :
        //             this.random > 0.15 && this.random < 0.29 ? num = 1 :
        //                 this.random > 0.29 && this.random < 0.48 ? num = 2 :
        //                     this.random > 0.48 && this.random < 0.62 ? num = 3 :
        //                         this.random > 0.62 && this.random < 0.79 ? num = 4 : num = 5 :
        //     this.random < 0.22 && this.random > 0.05 ?
        //         this.random > 0 && this.random < 0.15 ? num = 0 :
        //             this.random > 0.15 && this.random < 0.29 ? num = 0 :
        //                 this.random > 0.15 && this.random < 0.29 ? num = 1 :
        //                     this.random > 0.29 && this.random < 0.48 ? num = 2 :
        //                         this.random > 0.48 && this.random < 0.62 ? num = 3 :
        //                             this.random > 0.62 && this.random < 0.79 ? num = 4 : num = 5 :
        //         this.random > 0 && this.random < 0.15 ? num = 0 :
        //             this.random > 0.15 && this.random < 0.29 ? num = 0 :
        //                 this.random > 0.15 && this.random < 0.29 ? num = 1 :
        //                     this.random > 0.29 && this.random < 0.48 ? num = 2 :
        //                         this.random > 0.48 && this.random < 0.62 ? num = 3 :
        //                             this.random > 0.62 && this.random < 0.79 ? num = 4 : num = 5;
        let src = Math.floor(this.random * 10)
        src = src / 10;
        console.log("src: ", src);
        console.log("this.randomFloor: ", this.randomFloor);
        console.log("this.random: ", this.random);
        if (this.randomFloor == null) {
            this.randomFloor = src;
            this.index = 0;
        }

        if (src == this.randomFloor) {
            this.index++;
            console.log("index: ", this.index);
        } else {
            this.randomFloor == null;
        }

        if (this.index == 5) {
            this.random = this.value;
            this.randomFloor == null;
        }


        if (this.SumScore < 99) {
            if (this.FruitsIndex == 0 && this.appear(0) == 5) {
                // console.log("果盘里有5个，当前有1个")
                if (this.random < 0.2) {
                    num = 1;
                } else if (this.random < 0.4) {
                    num = 2;
                } else if (this.random < 0.6) {
                    num = 3;
                } else if (this.random < 0.8) {
                    num = 4;
                } else {
                    num = 5;
                }
            } else {
                if (this.random < 0.3) {
                    num = 0;
                } else if (this.random < 0.44) {
                    num = 1;
                } else if (this.random < 0.58) {
                    num = 2;
                } else if (this.random < 0.72) {
                    num = 3;
                } else if (this.random < 0.86) {
                    num = 4;
                } else {
                    num = 5;
                }
            }
        }
        else if (this.SumScore < 299) {
            if (this.FruitsIndex == 1 && this.appear(1) == 5) {
                // console.log("果盘里有5个，当前有1个")
                if (this.random < 0.2) {
                    num = 0;
                } else if (this.random < 0.4) {
                    num = 2;
                } else if (this.random < 0.6) {
                    num = 3;
                } else if (this.random < 0.8) {
                    num = 4;
                } else {
                    num = 5;
                }
            } else {
                if (this.random < 0.14) {
                    num = 0;
                } else if (this.random < 0.44) {
                    num = 1;
                } else if (this.random < 0.58) {
                    num = 2;
                } else if (this.random < 0.72) {
                    num = 3;
                } else if (this.random < 0.86) {
                    num = 4;
                } else {
                    num = 5;
                }

            }
        }
        else if (this.SumScore < 599) {
            if (this.FruitsIndex == 2 && this.appear(2) == 5) {
                // console.log("果盘里有5个，当前有1个")
                if (this.random < 0.2) {
                    num = 0;
                } else if (this.random < 0.4) {
                    num = 1;
                } else if (this.random < 0.6) {
                    num = 3;
                } else if (this.random < 0.8) {
                    num = 4;
                } else {
                    num = 5;
                }
            } else {
                if (this.random < 0.14) {
                    num = 0;
                } else if (this.random < 0.28) {
                    num = 1;
                } else if (this.random < 0.58) {
                    num = 2;
                } else if (this.random < 0.72) {
                    num = 3;
                } else if (this.random < 0.86) {
                    num = 4;
                } else {
                    num = 5;
                }
            }
        }
        else if (this.SumScore < 999) {
            if (this.FruitsIndex == 3 && this.appear(3) == 5) {
                // console.log("果盘里有5个，当前有1个")
                if (this.random < 0.2) {
                    num = 0;
                } else if (this.random < 0.4) {
                    num = 1;
                } else if (this.random < 0.6) {
                    num = 2;
                } else if (this.random < 0.8) {
                    num = 4;
                } else {
                    num = 5;
                }
            } else {
                if (this.random < 0.14) {
                    num = 0;
                } else if (this.random < 0.28) {
                    num = 1;
                } else if (this.random < 0.42) {
                    num = 2;
                } else if (this.random < 0.72) {
                    num = 3;
                } else if (this.random < 0.86) {
                    num = 4;
                } else {
                    num = 5;
                }
            }
        }
        else if (this.SumScore < 1999) {
            if (this.FruitsIndex == 4 && this.appear(4) == 5) {
                // console.log("果盘里有5个，当前有1个")
                if (this.random < 0.2) {
                    num = 0;
                } else if (this.random < 0.4) {
                    num = 1;
                } else if (this.random < 0.6) {
                    num = 2;
                } else if (this.random < 0.8) {
                    num = 3;
                } else {
                    num = 5;
                }
            } else {
                if (this.random < 0.14) {
                    num = 0;
                } else if (this.random < 0.28) {
                    num = 1;
                } else if (this.random < 0.42) {
                    num = 2;
                } else if (this.random < 0.56) {
                    num = 3;
                } else if (this.random < 0.86) {
                    num = 4;
                } else {
                    num = 5;
                }
            }
        }
        else if (this.SumScore < 4999) {
            if (this.FruitsIndex == 5 && this.appear(5) == 5) {
                // console.log("果盘里有5个，当前有1个")
                if (this.random < 0.2) {
                    num = 0;
                } else if (this.random < 0.4) {
                    num = 1;
                } else if (this.random < 0.6) {
                    num = 2;
                } else if (this.random < 0.8) {
                    num = 3;
                } else {
                    num = 4;
                }
            } else {
                if (this.random < 0.14) {
                    num = 0;
                } else if (this.random < 0.28) {
                    num = 1;
                } else if (this.random < 0.42) {
                    num = 2;
                } else if (this.random < 0.56) {
                    num = 3;
                } else if (this.random < 0.70) {
                    num = 4;
                } else {
                    num = 5;
                }
            }
        }
        else {
            if (this.FruitsIndex == 0 && this.appear(0) == 5) {
                // console.log("果盘里有5个，当前有1个")
                if (this.random < 0.2) {
                    num = 5;
                } else if (this.random < 0.4) {
                    num = 1;
                } else if (this.random < 0.6) {
                    num = 2;
                } else if (this.random < 0.8) {
                    num = 3;
                } else {
                    num = 4;
                }
            } else {
                if (this.random < 0.3) {
                    num = 0;
                } else if (this.random < 0.44) {
                    num = 1;
                } else if (this.random < 0.58) {
                    num = 2;
                } else if (this.random < 0.72) {
                    num = 3;
                } else if (this.random < 0.86) {
                    num = 4;
                } else {
                    num = 5;
                }
            }
        }

        //规则1
        if (this.SumScore < 99 && this.DeathDecision1(0) == false) {
            if (this.randomCost0 >= 30) {
                this.randomCost0 = 0;
                return num;
            }
            if (this.random < 0.2) {
                num = 1;
            } else if (this.random < 0.4) {
                num = 2;
            } else if (this.random < 0.6) {
                num = 3;
            } else if (this.random < 0.8) {
                num = 4;
            } else {
                num = 5;
            }
            this.randomCost0++;
            // console.log("0 ~ 99间隔第一种: ", this.randomCost0);
        }
        else if (this.SumScore < 299 && this.DeathDecision1(1) == false) {
            if (this.randomCost1 >= 29) {
                this.randomCost1 = 1;
                return num;
            }
            if (this.random < 0.2) {
                num = 0;
            } else if (this.random < 0.4) {
                num = 2;
            } else if (this.random < 0.6) {
                num = 3;
            } else if (this.random < 0.8) {
                num = 4;
            } else {
                num = 5;
            }
            this.randomCost1++;
            // console.log("100 ~299间隔第一种: ", this.randomCost1);
        }
        else if (this.SumScore < 599 && this.DeathDecision1(2) == false) {
            if (this.randomCost2 >= 28) {
                this.randomCost2 = 2;
                return num;
            }
            if (this.random < 0.2) {
                num = 1;
            } else if (this.random < 0.4) {
                num = 0;
            } else if (this.random < 0.6) {
                num = 3;
            } else if (this.random < 0.8) {
                num = 4;
            } else {
                num = 5;
            }
            this.randomCost2++;
            // console.log("300 ~ 599间隔第一种: ", this.randomCost2);
        }
        else if (this.SumScore < 999 && this.DeathDecision1(3) == false) {
            if (this.randomCost3 >= 27) {
                this.randomCost3 = 3;
                return num;
            }
            if (this.random < 0.2) {
                num = 1;
            } else if (this.random < 0.4) {
                num = 2;
            } else if (this.random < 0.6) {
                num = 0;
            } else if (this.random < 0.8) {
                num = 4;
            } else {
                num = 5;
            }
            this.randomCost3++;
            // console.log("600 ~ 999间隔第一种: ", this.randomCost3);
        }
        else if (this.SumScore < 1999 && this.DeathDecision1(4) == false) {
            if (this.randomCost4 >= 26) {
                this.randomCost4 = 4;
                return num;
            }
            if (this.random < 0.2) {
                num = 1;
            } else if (this.random < 0.4) {
                num = 2;
            } else if (this.random < 0.6) {
                num = 3;
            } else if (this.random < 0.8) {
                num = 0;
            } else {
                num = 5;
            }
            this.randomCost4++;
            // console.log("1000 ~ 1999间隔第一种: ", this.randomCost4);
        }
        else if (this.SumScore < 4999 && this.DeathDecision1(5) == false) {
            if (this.randomCost5 >= 25) {
                this.randomCost5 = 5;
                return num;
            }
            if (this.random < 0.2) {
                num = 1;
            } else if (this.random < 0.4) {
                num = 2;
            } else if (this.random < 0.6) {
                num = 3;
            } else if (this.random < 0.8) {
                num = 4;
            } else {
                num = 0;
            }
            this.randomCost5++;
            // console.log("2000 ~ 41999间隔第一种: ", this.randomCost5);
        }
        else if (this.SumScore > 5000 && num == 0 && this.DeathDecision1(0) == false) {
            if (this.randomCost6 >= 24) {
                this.randomCost6 = 0;
                return num;
            }
            if (this.random < 0.2) {
                num = 1;
            } else if (this.random < 0.4) {
                num = 2;
            } else if (this.random < 0.6) {
                num = 3;
            } else if (this.random < 0.8) {
                num = 4;
            } else {
                num = 5;
            }
            this.randomCost6++;
            // console.log("5000以上间隔第一种: ", this.randomCost6);
        }
        else {
            this.randomCost0 = 0;
            this.randomCost1 = 0;
            this.randomCost2 = 0;
            this.randomCost3 = 0;
            this.randomCost4 = 0;
            this.randomCost5 = 0;
            this.randomCost6 = 0;
            // console.log("规则1....不成立")
        }

        // //规则2
        // if (this.SumScore < 49 && this.DeathDecision1(0) == false && this.DeathDecision1(1) == false) {
        //     if (this.randomCost00 >= 30) {
        //         this.randomCost00 = 0;
        //         return num;
        //     }
        //     if (this.random < 0.25) {
        //         num = 2;
        //     } else if (this.random < 0.5) {
        //         num = 3;
        //     } else if (this.random < 0.75) {
        //         num = 4;
        //     } else {
        //         num = 5;
        //     }
        //     this.randomCost00++;
        //     console.log("0 ~ 49间隔第二种: ", this.randomCost00);
        // }
        // else if (this.SumScore < 99 && this.DeathDecision1(1) == false && this.DeathDecision1(2) == false) {
        //     if (this.randomCost11 >= 25) {
        //         this.randomCost11 = 0;
        //         return num;
        //     }
        //     if (this.random < 0.25) {
        //         num = 0;
        //     } else if (this.random < 0.5) {
        //         num = 3;
        //     } else if (this.random < 0.75) {
        //         num = 4;
        //     } else {
        //         num = 5;
        //     }
        //     this.randomCost11++;
        //     console.log("50 ~ 99间隔第二种: ", this.randomCost11);
        // }
        // else if (this.SumScore < 199 && this.DeathDecision1(2) == false && this.DeathDecision1(3) == false) {
        //     if (this.randomCost22 >= 23) {
        //         this.randomCost22 = 0;
        //         return num;
        //     }
        //     if (this.random < 0.25) {
        //         num = 0;
        //     } else if (this.random < 0.5) {
        //         num = 1;
        //     } else if (this.random < 0.75) {
        //         num = 4;
        //     } else {
        //         num = 5;
        //     }
        //     this.randomCost22++;
        //     console.log("100 ~ 199间隔第二种: ", this.randomCost22);
        // }
        // else if (this.SumScore < 499 && this.DeathDecision1(3) == false && this.DeathDecision1(4) == false) {
        //     if (this.randomCost33 >= 20) {
        //         this.randomCost33 = 0;
        //         return num;
        //     }
        //     if (this.random < 0.25) {
        //         num = 0;
        //     } else if (this.random < 0.5) {
        //         num = 1;
        //     } else if (this.random < 0.75) {
        //         num = 2;
        //     } else {
        //         num = 5;
        //     }
        //     this.randomCost33++;
        //     console.log("200 ~ 499间隔第二种: ", this.randomCost33);
        // }
        // else if (this.SumScore < 999 && this.DeathDecision1(4) == false && this.DeathDecision1(5) == false) {
        //     if (this.randomCost44 >= 18) {
        //         this.randomCost44 = 0;
        //         return num;
        //     }
        //     if (this.random < 0.25) {
        //         num = 0;
        //     } else if (this.random < 0.5) {
        //         num = 1;
        //     } else if (this.random < 0.75) {
        //         num = 2;
        //     } else {
        //         num = 3;
        //     }
        //     this.randomCost44++;
        //     console.log("500 ~ 999间隔第二种: ", this.randomCost44);
        // }
        // else if (this.SumScore < 1999 && this.DeathDecision1(0) == false && this.DeathDecision1(5) == false) {
        //     if (this.randomCost55 >= 15) {
        //         this.randomCost55 = 0;
        //         return num;
        //     }
        //     if (this.random < 0.25) {
        //         num = 1;
        //     } else if (this.random < 0.5) {
        //         num = 2;
        //     } else if (this.random < 0.75) {
        //         num = 3;
        //     } else {
        //         num = 4;
        //     }
        //     this.randomCost55++;
        //     console.log("1000 ~ 1999间隔第二种: ", this.randomCost55);
        // }
        // else if (this.SumScore > 2000 && this.DeathDecision1(0) == false && this.DeathDecision1(1) == false) {
        //     if (this.randomCost66 >= 12) {
        //         this.randomCost66 = 0;
        //         return num;
        //     }
        //     if (this.random < 0.25) {
        //         num = 2;
        //     } else if (this.random < 0.5) {
        //         num = 3;
        //     } else if (this.random < 0.75) {
        //         num = 4;
        //     } else {
        //         num = 5;
        //     }
        //     this.randomCost66++;
        //     console.log("2000以上间隔第二种: ", this.randomCost66);
        // }
        // else {
        //     this.randomCost0 = 0;
        //     this.randomCost1 = 0;
        //     this.randomCost2 = 0;
        //     this.randomCost3 = 0;
        //     this.randomCost4 = 0;
        //     this.randomCost5 = 0;
        //     this.randomCost6 = 0;
        //     console.log("规则2....不成立")
        // }

        return num;


        // if (this.random > 0.22) {
        //     if (this.random > 0 && this.random < 0.15) {
        //         return 0;
        //     } else if (this.random > 0.15 && this.random < 0.29) {
        //         return 1;
        //     } else if (this.random > 0.29 && this.random < 0.48) {
        //         return 2;
        //     } else if (this.random > 0.48 && this.random < 0.62) {
        //         return 3;
        //     } else if (this.random > 0.62 && this.random < 0.79) {
        //         return 4;
        //     } else {
        //         return 5;
        //     }
        // } else if (this.random < 0.22 && this.random > 0.05) {
        //     if (this.random > 0 && this.random < 0.15) {
        //         return 0;
        //     } else if (this.random > 0.15 && this.random < 0.29) {
        //         return 1;
        //     } else if (this.random > 0.29 && this.random < 0.48) {
        //         return 2;
        //     } else if (this.random > 0.48 && this.random < 0.62) {
        //         return 3;
        //     } else if (this.random > 0.62 && this.random < 0.79) {
        //         return 4;
        //     } else {
        //         return 5;
        //     }
        // } else {
        //     if (this.random > 0 && this.random < 0.15) {
        //         return 0;
        //     } else if (this.random > 0.15 && this.random < 0.29) {
        //         return 1;
        //     } else if (this.random > 0.29 && this.random < 0.48) {
        //         return 2;
        //     } else if (this.random > 0.48 && this.random < 0.62) {
        //         return 3;
        //     } else if (this.random > 0.62 && this.random < 0.79) {
        //         return 4;
        //     } else {
        //         return 5;
        //     }
        // }

        // if (this.random > 0 && this.random < 0.055) {
        //     return 0;
        // }
        // else if (this.random > 0.055 && this.random < 0.055 * 2) {
        //     return 1;
        // }
        // else if (this.random > 0.055 * 2 && this.random < 0.055 * 3) {
        //     return 2;
        // }
        // else if (this.random > 0.055 * 3 && this.random < 0.055 * 4) {
        //     return 3;
        // }
        // else if (this.random > 0.055 * 4 && this.random < 0.055 * 5) {
        //     return 4;
        // }
        // else if (this.random > 0.055 * 5 && this.random < 0.055 * 6) {
        //     return 5;
        // }
        // else if (this.random > 0.055 * 6 && this.random < 0.055 * 7) {
        //     return 6;
        // }
        // else if (this.random > 0.055 * 7 && this.random < 0.055 * 8) {
        //     return 7;
        // }
        // else if (this.random > 0.055 * 8 && this.random < 0.055 * 9) {
        //     return 8;
        // }
        // else if (this.random > 0.055 * 10 && this.random < 0.055 * 11) {
        //     return 9;
        // }
        // else if (this.random > 0.055 * 11 && this.random < 0.055 * 12) {
        //     return 10;
        // }
        // else if (this.random > 0.055 * 12 && this.random < 0.055 * 13) {
        //     return 11;
        // }
        // else if (this.random > 0.055 * 13 && this.random < 0.055 * 14) {
        //     return 12;
        // }
        // else if (this.random > 0.055 * 14 && this.random < 0.055 * 15) {
        //     return 13;
        // }
        // else if (this.random > 0.055 * 15 && this.random < 0.055 * 16) {
        //     return 14;
        // }
        // else if (this.random > 0.055 * 16 && this.random < 0.055 * 17) {
        //     return 15;
        // }
        // else if (this.random > 0.055 * 17 && this.random < 0.055 * 18) {
        //     return 16;
        // } else {
        //     return 17;
        // }
    }

    Warning() {
        if (this.appear(0) == 6 && this.Preview == 0 && this.FruitsIndex != 0) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(1) == 6 && this.Preview == 1 && this.FruitsIndex != 1) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(2) == 6 && this.Preview == 2 && this.FruitsIndex != 2) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(3) == 6 && this.Preview == 3 && this.FruitsIndex != 3) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(4) == 6 && this.Preview == 4 && this.FruitsIndex != 4) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(5) == 6 && this.Preview == 5 && this.FruitsIndex != 5) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(0) == 5 && this.Preview == 0 && this.FruitsIndex == 0) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(1) == 5 && this.Preview == 1 && this.FruitsIndex == 1) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(2) == 5 && this.Preview == 2 && this.FruitsIndex == 2) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(3) == 5 && this.Preview == 3 && this.FruitsIndex == 3) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(4) == 5 && this.Preview == 4 && this.FruitsIndex == 4) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else if (this.appear(5) == 5 && this.Preview == 5 && this.FruitsIndex == 5) {
            this.WarningTips.active = true;
            // this.Tips.active = true;
            console.log("Warning!!!")
        }
        else {
            this.WarningTips.active = false;
        }
    }

    /**
     * 刷新
     */
    create() {
        let GameObj: cc.Node;
        let PreviewObj: cc.Node;
        if (this.PreviewNode) {
            this.PreviewNode.runAction(cc.sequence(
                cc.scaleTo(0.1, 1.2),
                cc.scaleTo(0.1, 0),
                cc.callFunc(() => {
                    this.preview.removeAllChildren();
                })
            ))
        }
        this.FruitsIndex = this.Preview;
        this.random = this.value;
        if (this.isGuide != 1) {
            console.log("新手引导固定刷新", this.Preview);
            if (this.Preview == 0) this.Preview = 1;
            else if (this.Preview == 1) this.Preview = 2;
            else if (this.Preview == 2) this.Preview = 3;
            else if (this.Preview == 3) this.Preview = 4;
            else if (this.Preview == 4) this.Preview = 5;
            else this.Preview = this.randomNum();
        } else {
            this.Preview = this.randomNum();
        }
        // this.isGuide != 1 ?
        //     this.Preview == 0 ? this.Preview = 1 :
        //         this.Preview == 1 ? this.Preview = 2 :
        //             this.Preview == 2 ? this.Preview = 3 :
        //                 this.Preview == 3 ? this.Preview = 4 : this.Preview = 5
        //     : this.Preview = this.randomNum();
        // this.Preview = this.randomNum();
        //保存记录
        this.SaveGamePreviewIndex();
        this.Warning();
        //一块
        this.FruitsIndex == 0 ? GameObj = cc.instantiate(this.Gameobj0) :
            this.FruitsIndex == 1 ? GameObj = cc.instantiate(this.Gameobj1) :
                this.FruitsIndex == 2 ? GameObj = cc.instantiate(this.Gameobj2) :
                    this.FruitsIndex == 3 ? GameObj = cc.instantiate(this.Gameobj3) :
                        this.FruitsIndex == 4 ? GameObj = cc.instantiate(this.Gameobj4) : GameObj = cc.instantiate(this.Gameobj5);
        GameObj.setScale(0);
        GameObj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((this.FruitsIndex + 1).toString());
        GameObj.setPosition(cc.v2(Method.StartBase[this.FruitsIndex].StartBase_PosX, Method.StartBase[this.FruitsIndex].StartBase_PosY));
        GameObj.parent = this.StartBase_Antipasto;
        GameObj.name = "Watermelon" + this.FruitsIndex;
        GameObj.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.05, 0.8),
            cc.scaleTo(0.05, 1),
        ))
        // this.Watermelon = 0;
        this.obj = GameObj;

        //下一个
        setTimeout(() => {
            this.PreviewNode.stopAllActions();
            // this.PreviewNode.setScale(1);
            this.Preview == 0 ? PreviewObj = cc.instantiate(this.previewNode0) :
                this.Preview == 1 ? PreviewObj = cc.instantiate(this.previewNode1) :
                    this.Preview == 2 ? PreviewObj = cc.instantiate(this.previewNode2) :
                        this.Preview == 3 ? PreviewObj = cc.instantiate(this.previewNode3) :
                            this.Preview == 4 ? PreviewObj = cc.instantiate(this.previewNode4) : PreviewObj = cc.instantiate(this.previewNode5);
            PreviewObj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((this.Preview + 1).toString());
            PreviewObj.parent = this.preview;
            PreviewObj.name = "previewNode" + this.Preview;
            this.PreviewNode = PreviewObj;
            this.PreviewNode.runAction(cc.sequence(
                cc.scaleTo(0, 1),
                cc.moveTo(0.2, 0, 0),
                cc.callFunc(() => {
                    return;
                }),
            ))
        }, 201);
        this.Death();

    }
    //继续游戏刷新
    continueCreate() {
        if (this.CurFruits == null) {
            this.randomFruits(0);
        }
        let GameObj: cc.Node;
        let PreviewObj: cc.Node;
        // if(this.PreviewNode){
        //     this.PreviewNode.runAction(cc.sequence(
        //         cc.scaleTo(0.1,1.2),
        //         cc.scaleTo(0.1,0),
        //         cc.callFunc(()=>{
        //             this.preview.removeAllChildren();
        //         })
        //     ))
        // }

        if (this.isGuide != 1) {
            this.FruitsIndex = this.Preview;
            this.random = this.value;
            this.isGuide != 1 ?
                this.Preview == 0 ? this.Preview = 1 :
                    this.Preview == 1 ? this.Preview = 2 :
                        this.Preview == 2 ? this.Preview = 3 :
                            this.Preview == 3 ? this.Preview = 4 : this.Preview = 5
                : this.Preview = Wx.Instance.localStorageGetInt(Config.ContinueTheGame.PreviewIndex, this.Preview = this.random);
        } else {
            this.FruitsIndex = Wx.Instance.localStorageGetInt(Config.ContinueTheGame.FruitsIndex, this.FruitsIndex = this.random);
            this.Preview = Wx.Instance.localStorageGetInt(Config.ContinueTheGame.PreviewIndex, this.Preview = this.random);
            this.TopScoreNode.string = Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0).toString();
            this.SumScore = Wx.Instance.localStorageGetInt(Config.ContinueTheGame.CurScore, 0);
            this.Score.string = this.SumScore.toString();
        }
        //保存记录
        this.objcreate();

        //警告提示
        this.Warning();

        //一块
        this.FruitsIndex == 0 ? GameObj = cc.instantiate(this.Gameobj0) :
            this.FruitsIndex == 1 ? GameObj = cc.instantiate(this.Gameobj1) :
                this.FruitsIndex == 2 ? GameObj = cc.instantiate(this.Gameobj2) :
                    this.FruitsIndex == 3 ? GameObj = cc.instantiate(this.Gameobj3) :
                        this.FruitsIndex == 4 ? GameObj = cc.instantiate(this.Gameobj4) : GameObj = cc.instantiate(this.Gameobj5);
        GameObj.setScale(0);
        GameObj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((this.FruitsIndex + 1).toString());
        GameObj.setPosition(cc.v2(Method.StartBase[this.FruitsIndex].StartBase_PosX, Method.StartBase[this.FruitsIndex].StartBase_PosY));
        GameObj.parent = this.StartBase_Antipasto;
        GameObj.name = "Fruits" + this.FruitsIndex;
        GameObj.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.05, 0.8),
            cc.scaleTo(0.05, 1),
        ))
        // this.Watermelon = 0;
        this.obj = GameObj;

        this.preview.removeAllChildren();
        //下一个
        setTimeout(() => {
            this.Preview == 0 ? PreviewObj = cc.instantiate(this.previewNode0) :
                this.Preview == 1 ? PreviewObj = cc.instantiate(this.previewNode1) :
                    this.Preview == 2 ? PreviewObj = cc.instantiate(this.previewNode2) :
                        this.Preview == 3 ? PreviewObj = cc.instantiate(this.previewNode3) :
                            this.Preview == 4 ? PreviewObj = cc.instantiate(this.previewNode4) : PreviewObj = cc.instantiate(this.previewNode5);
            PreviewObj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((this.Preview + 1).toString());
            PreviewObj.parent = this.preview;
            PreviewObj.name = "previewNode" + this.Preview;
            this.PreviewNode = PreviewObj;
            this.PreviewNode.runAction(cc.sequence(
                cc.scaleTo(0, 1),
                cc.moveTo(0.2, 0, 0),
                cc.callFunc(() => {
                    return;
                }),
            ))
        }, 201);
        this.Death();
    }
    /**
     * 继承上次的保存记录
     */
    objcreate() {
        this.BaseList0 = Wx.Instance.localStorageGetList(Config.ContinueTheGame.Base0list);
        this.BaseList1 = Wx.Instance.localStorageGetList(Config.ContinueTheGame.Base1list);
        this.BaseList2 = Wx.Instance.localStorageGetList(Config.ContinueTheGame.Base2list);
        this.BaseList3 = Wx.Instance.localStorageGetList(Config.ContinueTheGame.Base3list);
        this.BaseList4 = Wx.Instance.localStorageGetList(Config.ContinueTheGame.Base4list);
        this.BaseList5 = Wx.Instance.localStorageGetList(Config.ContinueTheGame.Base5list);
        this.cost0 = this.BaseList0.length;
        this.cost1 = this.BaseList1.length;
        this.cost2 = this.BaseList2.length;
        this.cost3 = this.BaseList3.length;
        this.cost4 = this.BaseList4.length;
        this.cost5 = this.BaseList5.length;
        console.log("保存记录BaseList0: ", this.BaseList0, " + this.cost0: ", this.cost0);
        console.log("保存记录BaseList1: ", this.BaseList1, " + this.cost1: ", this.cost1);
        console.log("保存记录BaseList2: ", this.BaseList2, " + this.cost2: ", this.cost2);
        console.log("保存记录BaseList3: ", this.BaseList3, " + this.cost3: ", this.cost3);
        console.log("保存记录BaseList4: ", this.BaseList4, " + this.cost4: ", this.cost4);
        console.log("保存记录BaseList5: ", this.BaseList5, " + this.cost5: ", this.cost5);

        if (this.BaseList0 != null || this.BaseList0 != undefined || this.BaseList0 != []) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList0.indexOf(i) != -1) {
                    let obj = i == 0 ? cc.instantiate(this.Gameobj0) :
                        i == 1 ? cc.instantiate(this.Gameobj1) :
                            i == 2 ? cc.instantiate(this.Gameobj2) :
                                i == 3 ? cc.instantiate(this.Gameobj3) :
                                    i == 4 ? cc.instantiate(this.Gameobj4) : cc.instantiate(this.Gameobj5);
                    obj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((i + 1).toString());
                    obj.setPosition(cc.v2(Method.StartBase[i].StartBase_PosX, Method.StartBase[i].StartBase_PosY));
                    obj.parent = this.Antipasto_0;
                    obj.name = "Fruits" + i;
                    // this.cost0++;
                }
            }
        }

        if (this.BaseList1 != null || this.BaseList1 != undefined || this.BaseList1 != []) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList1.indexOf(i) != -1) {
                    let obj = i == 0 ? cc.instantiate(this.Gameobj0) :
                        i == 1 ? cc.instantiate(this.Gameobj1) :
                            i == 2 ? cc.instantiate(this.Gameobj2) :
                                i == 3 ? cc.instantiate(this.Gameobj3) :
                                    i == 4 ? cc.instantiate(this.Gameobj4) : cc.instantiate(this.Gameobj5);
                    obj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((i + 1).toString());
                    obj.setPosition(cc.v2(Method.StartBase[i].StartBase_PosX, Method.StartBase[i].StartBase_PosY));
                    obj.parent = this.Antipasto_1;
                    obj.name = "Fruits" + i;
                    // this.cost1++;
                }
            }
        }

        if (this.BaseList2 != null || this.BaseList2 != undefined || this.BaseList2 != []) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList2.indexOf(i) != -1) {
                    let obj = i == 0 ? cc.instantiate(this.Gameobj0) :
                        i == 1 ? cc.instantiate(this.Gameobj1) :
                            i == 2 ? cc.instantiate(this.Gameobj2) :
                                i == 3 ? cc.instantiate(this.Gameobj3) :
                                    i == 4 ? cc.instantiate(this.Gameobj4) : cc.instantiate(this.Gameobj5);
                    obj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((i + 1).toString());
                    obj.setPosition(cc.v2(Method.StartBase[i].StartBase_PosX, Method.StartBase[i].StartBase_PosY));
                    obj.parent = this.Antipasto_2;
                    obj.name = "Fruits" + i;
                    // this.cost2++;
                }
            }
        }

        if (this.BaseList3 != null || this.BaseList3 != undefined || this.BaseList3 != []) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList3.indexOf(i) != -1) {
                    let obj = i == 0 ? cc.instantiate(this.Gameobj0) :
                        i == 1 ? cc.instantiate(this.Gameobj1) :
                            i == 2 ? cc.instantiate(this.Gameobj2) :
                                i == 3 ? cc.instantiate(this.Gameobj3) :
                                    i == 4 ? cc.instantiate(this.Gameobj4) : cc.instantiate(this.Gameobj5);
                    obj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((i + 1).toString());
                    obj.setPosition(cc.v2(Method.StartBase[i].StartBase_PosX, Method.StartBase[i].StartBase_PosY));
                    obj.parent = this.Antipasto_3;
                    obj.name = "Fruits" + i;
                    // this.cost3++;
                }
            }
        }

        if (this.BaseList4 != null || this.BaseList4 != undefined || this.BaseList4 != []) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList4.indexOf(i) != -1) {
                    let obj = i == 0 ? cc.instantiate(this.Gameobj0) :
                        i == 1 ? cc.instantiate(this.Gameobj1) :
                            i == 2 ? cc.instantiate(this.Gameobj2) :
                                i == 3 ? cc.instantiate(this.Gameobj3) :
                                    i == 4 ? cc.instantiate(this.Gameobj4) : cc.instantiate(this.Gameobj5);
                    obj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((i + 1).toString());
                    obj.setPosition(cc.v2(Method.StartBase[i].StartBase_PosX, Method.StartBase[i].StartBase_PosY));
                    obj.parent = this.Antipasto_4;
                    obj.name = "Fruits" + i;
                    // this.cost4++;
                }
            }
        }

        if (this.BaseList5 != null || this.BaseList5 != undefined || this.BaseList5 != []) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList5.indexOf(i) != -1) {
                    let obj = i == 0 ? cc.instantiate(this.Gameobj0) :
                        i == 1 ? cc.instantiate(this.Gameobj1) :
                            i == 2 ? cc.instantiate(this.Gameobj2) :
                                i == 3 ? cc.instantiate(this.Gameobj3) :
                                    i == 4 ? cc.instantiate(this.Gameobj4) : cc.instantiate(this.Gameobj5);
                    obj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((i + 1).toString());
                    obj.setPosition(cc.v2(Method.StartBase[i].StartBase_PosX, Method.StartBase[i].StartBase_PosY));
                    obj.parent = this.Antipasto_5;
                    obj.name = "Fruits" + i;
                    // this.cost5++;
                }
            }
        }
    }

    /**
     * 关卡刷新
     */
    storycreate() {
        let GameObj;
        let PreviewObj;
        this.preview.removeAllChildren();
        this.FruitsIndex = this.Preview;
        this.random = this.value;
        console.log("this.random: ", this.random);
        if (this.isGuide != 1) {
            console.log("新手引导固定刷新", this.Preview);
            if (this.Preview == 0) this.Preview = 1;
            else if (this.Preview == 1) this.Preview = 2;
            else if (this.Preview == 2) this.Preview = 3;
            else if (this.Preview == 3) this.Preview = 4;
            else if (this.Preview == 4) this.Preview = 5;
            else this.Preview = this.randomNum();
        } else {
            this.Preview = this.randomNum();
        }
        // this.isGuide != 1 ?
        //     this.Preview == 0 ? this.Preview = 1 :
        //         this.Preview == 1 ? this.Preview = 2 :
        //             this.Preview == 2 ? this.Preview = 3 :
        //                 this.Preview == 3 ? this.Preview = 4 : this.Preview = 5
        //     : this.Preview = this.randomNum();
        this.SaveGamePreviewIndex();
        //一块
        this.FruitsIndex == 0 ? GameObj = cc.instantiate(this.Gameobj0) :
            this.FruitsIndex == 1 ? GameObj = cc.instantiate(this.Gameobj1) :
                this.FruitsIndex == 2 ? GameObj = cc.instantiate(this.Gameobj2) :
                    this.FruitsIndex == 3 ? GameObj = cc.instantiate(this.Gameobj3) :
                        this.FruitsIndex == 4 ? GameObj = cc.instantiate(this.Gameobj4) : GameObj = cc.instantiate(this.Gameobj5);
        GameObj.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame((this.FruitsIndex + 1).toString());
        GameObj.setPosition(cc.v2(Method.StartBase[this.FruitsIndex].StartBase_PosX, Method.StartBase[this.FruitsIndex].StartBase_PosY));
        GameObj.parent = this.StoryBasePanel;
        GameObj.name = "Watermelon" + this.FruitsIndex;
        // this.Watermelon = 0;
        this.obj = GameObj;

        //下一个
        this.Preview == 0 ? PreviewObj = cc.instantiate(this.previewNode0) :
            this.Preview == 1 ? PreviewObj = cc.instantiate(this.previewNode1) :
                this.Preview == 2 ? PreviewObj = cc.instantiate(this.previewNode2) :
                    this.Preview == 3 ? PreviewObj = cc.instantiate(this.previewNode3) :
                        this.Preview == 4 ? PreviewObj = cc.instantiate(this.previewNode4) : PreviewObj = cc.instantiate(this.previewNode5)
        PreviewObj.parent = this.StoryPreview;
        PreviewObj.name = "previewNode" + this.Preview;
        PreviewObj.runAction(cc.sequence(
            cc.moveTo(0.2, 0, 0),
            cc.callFunc(() => {
                return;
            })
        ))
        this.Death();

    }
    baselist() {

    }
    //--------------------------------出现判定-----------------------------------------//
    appear(num1: number): number {
        this.DeathIndex = 0;
        if (this.BaseList0.indexOf(num1) != -1) {
            this.DeathIndex++;
        }
        if (this.BaseList1.indexOf(num1) != -1) {
            this.DeathIndex++;
        }
        if (this.BaseList2.indexOf(num1) != -1) {
            this.DeathIndex++;
        }
        if (this.BaseList3.indexOf(num1) != -1) {
            this.DeathIndex++;
        }
        if (this.BaseList4.indexOf(num1) != -1) {
            this.DeathIndex++;
        }
        if (this.BaseList5.indexOf(num1) != -1) {
            this.DeathIndex++;
        }
        return this.DeathIndex;
    }

    /**
     * 返回不死判断
     */
    appear1(): number {
        let result: number = null;
        let num0: number = null;
        let num1: number = null;
        let num2: number = null;
        let num3: number = null;
        let num4: number = null;
        let num5: number = null;
        let Index0 = 0;
        let Index1 = 0;
        let Index2 = 0;
        let Index3 = 0;
        let Index4 = 0;
        let Index5 = 0;
        for (let i = 0; i < 6; i++) {
            if (this.BaseList0.indexOf(i) != -1) {
                Index0++;
            }
            if (this.BaseList1.indexOf(i) != -1) {
                Index1++;
            }
            if (this.BaseList2.indexOf(i) != -1) {
                Index2++;
            }
            if (this.BaseList3.indexOf(i) != -1) {
                Index3++;
            }
            if (this.BaseList4.indexOf(i) != -1) {
                Index4++;
            }
            if (this.BaseList5.indexOf(i) != -1) {
                Index5++;
            }
        }
        if (Index0 == 5) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList0.indexOf(i) == -1) {
                    num0 = i;
                }
            }
        }
        if (Index1 == 5) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList1.indexOf(i) == -1) {
                    num1 = i;
                }
            }
        }
        if (Index2 == 5) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList2.indexOf(i) == -1) {
                    num2 = i;
                }
            }
        }
        if (Index3 == 5) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList3.indexOf(i) == -1) {
                    num3 = i;
                }
            }
        }
        if (Index4 == 5) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList4.indexOf(i) == -1) {
                    num4 = i;
                }
            }
        }
        if (Index5 == 5) {
            for (let i = 0; i < 6; i++) {
                if (this.BaseList5.indexOf(i) == -1) {
                    num5 = i;
                }
            }
        }
        if (num0) {
            result = num0;
        }
        else if (num1) {
            result = num1;
        }
        else if (num2) {
            result = num2;
        }
        else if (num3) {
            result = num3;
        }
        else if (num4) {
            result = num4;
        }
        else if (num5) {
            result = num5;
        }
        return result;
    }

    //--------------------------------出现判定-----------------------------------------//
    //--------------------------------死亡判定------------------------------------//
    Death() {
        let cost: boolean;
        this.FruitsIndex == 0 ? cost = this.DeathDecision1(0) :
            this.FruitsIndex == 1 ? cost = this.DeathDecision1(1) :
                this.FruitsIndex == 2 ? cost = this.DeathDecision1(2) :
                    this.FruitsIndex == 3 ? cost = this.DeathDecision1(3) :
                        this.FruitsIndex == 4 ? cost = this.DeathDecision1(4) :
                            cost = this.DeathDecision1(5);
        // this.Watermelon == 6 ? cost = this.DeathDecision2(0, 1) :
        //     this.Watermelon == 7 ? cost = this.DeathDecision2(1, 2) :
        //         this.Watermelon == 8 ? cost = this.DeathDecision2(2, 3) :
        //             this.Watermelon == 9 ? cost = this.DeathDecision2(3, 4) :
        //                 this.Watermelon == 10 ? cost = this.DeathDecision2(4, 5) :
        //                     this.Watermelon == 11 ? cost = this.DeathDecision2(5, 0) :
        //                         this.Watermelon == 12 ? cost = this.DeathDecision3(0, 1, 2) :
        //                             this.Watermelon == 13 ? cost = this.DeathDecision3(1, 2, 3) :
        //                                 this.Watermelon == 14 ? cost = this.DeathDecision3(2, 3, 4) :
        //                                     this.Watermelon == 15 ? cost = this.DeathDecision3(3, 4, 5) :
        //                                         this.Watermelon == 16 ? cost = this.DeathDecision3(4, 5, 0) :
        //                                             cost = this.DeathDecision3(5, 0, 1);
        if (cost == false) {
            this.Gameover();
        }

        // if (this.Watermelon == 0) {
        //     cost = this.DeathDecision1(0);
        // }
        // else if (this.Watermelon == 1) {
        //     cost = this.DeathDecision1(1);
        // }
        // else if (this.Watermelon == 2) {
        //     cost = this.DeathDecision1(2);
        // }
        // else if (this.Watermelon == 3) {
        //     cost = this.DeathDecision1(3);
        // }
        // else if (this.Watermelon == 4) {
        //     cost = this.DeathDecision1(4);
        // }
        // else if (this.Watermelon == 5) {
        //     cost = this.DeathDecision1(5);
        // }
        // else if (this.Watermelon == 6) {
        //     cost = this.DeathDecision2(0, 1);
        // }
        // else if (this.Watermelon == 7) {
        //     cost = this.DeathDecision2(1, 2);
        // }
        // else if (this.Watermelon == 8) {
        //     cost = this.DeathDecision2(2, 3);
        // }
        // else if (this.Watermelon == 9) {
        //     cost = this.DeathDecision2(3, 4);
        // }
        // else if (this.Watermelon == 10) {
        //     cost = this.DeathDecision2(4, 5);
        // }
        // else if (this.Watermelon == 11) {
        //     cost = this.DeathDecision2(5, 0);
        // }
        // else if (this.Watermelon == 12) {
        //     cost = this.DeathDecision3(0, 1, 2);
        // }
        // else if (this.Watermelon == 13) {
        //     cost = this.DeathDecision3(1, 2, 3);
        // }
        // else if (this.Watermelon == 14) {
        //     cost = this.DeathDecision3(2, 3, 4);
        // }
        // else if (this.Watermelon == 15) {
        //     cost = this.DeathDecision3(3, 4, 5);
        // }
        // else if (this.Watermelon == 16) {
        //     cost = this.DeathDecision3(4, 5, 0);
        // }
        // else if (this.Watermelon == 17) {
        //     cost = this.DeathDecision3(5, 0, 1);
        // }

    }
    /**
     * 单块的死亡判断
     */
    DeathDecision1(num1: number): boolean {
        let bool;
        // this.DeathIndex = 0;
        this.BaseList0.indexOf(num1) == -1 ? bool = true :
            this.BaseList1.indexOf(num1) == -1 ? bool = true :
                this.BaseList2.indexOf(num1) == -1 ? bool = true :
                    this.BaseList3.indexOf(num1) == -1 ? bool = true :
                        this.BaseList4.indexOf(num1) == -1 ? bool = true :
                            this.BaseList5.indexOf(num1) == -1 ? bool = true :
                                bool = false;

        // if (this.BaseList0.indexOf(num1) == -1) {
        //     bool =  true;
        // }else{
        //     this.DeathIndex++;
        // }
        // if (this.BaseList1.indexOf(num1) == -1) {
        //     bool =  true;
        // }else{
        //     this.DeathIndex++;
        // }
        // if (this.BaseList2.indexOf(num1) == -1) {
        //     bool =  true;
        // }else{
        //     this.DeathIndex++;
        // }
        // if (this.BaseList3.indexOf(num1) == -1) {
        //     bool =  true;
        // }else{
        //     this.DeathIndex++;
        // }
        // if (this.BaseList4.indexOf(num1) == -1) {
        //     bool =  true;
        // }else{
        //     this.DeathIndex++;
        // }
        // if (this.BaseList5.indexOf(num1) == -1) {
        //     bool =  true;
        // }else{
        //     this.DeathIndex++;
        // }
        return bool;
    }
    /**
     * 两块的死亡判定
     */
    DeathDecision2(num1: number, num2: number): boolean {
        let bool;
        this.BaseList0.indexOf(num1) == -1 ?
            this.BaseList0.indexOf(num2) == -1 ? bool = true : bool = false :
            this.BaseList1.indexOf(num1) == -1 ?
                this.BaseList1.indexOf(num2) == -1 ? bool = true : bool = false :
                this.BaseList2.indexOf(num1) == -1 ?
                    this.BaseList2.indexOf(num2) == -1 ? bool = true : bool = false :
                    this.BaseList3.indexOf(num1) == -1 ?
                        this.BaseList3.indexOf(num2) == -1 ? bool = true : bool = false :
                        this.BaseList4.indexOf(num1) == -1 ?
                            this.BaseList4.indexOf(num2) == -1 ? bool = true : bool = false :
                            this.BaseList5.indexOf(num2) == -1 ? bool = true : bool = false;
        return bool;

        // if (this.BaseList0.indexOf(num1) == -1) {
        //     if (this.BaseList0.indexOf(num2) == -1) {
        //         return true;
        //     }
        // }
        // if (this.BaseList1.indexOf(num1) == -1) {
        //     if (this.BaseList1.indexOf(num2) == -1) {
        //         return true;
        //     }
        // }
        // if (this.BaseList2.indexOf(num1) == -1) {
        //     if (this.BaseList2.indexOf(num2) == -1) {
        //         return true;
        //     }
        // }
        // if (this.BaseList3.indexOf(num1) == -1) {
        //     if (this.BaseList3.indexOf(num2) == -1) {
        //         return true;
        //     }
        // }
        // if (this.BaseList4.indexOf(num1) == -1) {
        //     if (this.BaseList4.indexOf(num2) == -1) {
        //         return true;
        //     }
        // }
        // if (this.BaseList5.indexOf(num1) == -1) {
        //     if (this.BaseList5.indexOf(num2) == -1) {
        //         return true;
        //     }
        // }
    }
    /**
     * 三块的死亡判断
     */
    DeathDecision3(num1: number, num2: number, num3: number): boolean {
        let bool;
        this.BaseList0.indexOf(num1) == -1 ?
            this.BaseList0.indexOf(num2) == -1 ?
                this.BaseList0.indexOf(num3) == -1 ? bool = true : bool = false : bool = false :

            this.BaseList1.indexOf(num1) == -1 ?
                this.BaseList1.indexOf(num2) == -1 ?
                    this.BaseList1.indexOf(num3) == -1 ? bool = true : bool = false : bool = false :

                this.BaseList2.indexOf(num1) == -1 ?
                    this.BaseList2.indexOf(num2) == -1 ?
                        this.BaseList2.indexOf(num3) == -1 ? bool = true : bool = false : bool = false :

                    this.BaseList3.indexOf(num1) == -1 ?
                        this.BaseList3.indexOf(num2) == -1 ?
                            this.BaseList3.indexOf(num3) == -1 ? bool = true : bool = false : bool = false :

                        this.BaseList4.indexOf(num1) == -1 ?
                            this.BaseList4.indexOf(num2) == -1 ?
                                this.BaseList4.indexOf(num3) == -1 ? bool = true : bool = false : bool = false :

                            this.BaseList5.indexOf(num2) == -1 ?
                                this.BaseList5.indexOf(num3) == -1 ? bool = true : bool = false : bool = false;


        return bool;

        // if (this.BaseList0.indexOf(num1) == -1) {
        //     if (this.BaseList0.indexOf(num2) == -1) {
        //         if (this.BaseList0.indexOf(num3) == -1) {
        //             return true;
        //         }
        //     }
        // }
        // if (this.BaseList1.indexOf(num1) == -1) {
        //     if (this.BaseList1.indexOf(num2) == -1) {
        //         if (this.BaseList1.indexOf(num3) == -1) {
        //             return true;
        //         }
        //     }
        // }
        // if (this.BaseList2.indexOf(num1) == -1) {
        //     if (this.BaseList2.indexOf(num2) == -1) {
        //         if (this.BaseList2.indexOf(num3) == -1) {
        //             return true;
        //         }
        //     }
        // }
        // if (this.BaseList3.indexOf(num1) == -1) {
        //     if (this.BaseList3.indexOf(num2) == -1) {
        //         if (this.BaseList3.indexOf(num3) == -1) {
        //             return true;
        //         }
        //     }
        // }
        // if (this.BaseList4.indexOf(num1) == -1) {
        //     if (this.BaseList4.indexOf(num2) == -1) {
        //         if (this.BaseList4.indexOf(num3) == -1) {
        //             return true;
        //         }
        //     }
        // }
        // if (this.BaseList5.indexOf(num1) == -1) {
        //     if (this.BaseList5.indexOf(num2) == -1) {
        //         if (this.BaseList5.indexOf(num3) == -1) {
        //             return true;
        //         }
        //     }
        // }
    }
    //--------------------------------死亡判定------------------------------------//



    //----------------------------------新手引导-------------------------------//
    /**
     * 新手引导按钮
     */
    GuideButton() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.GuideView(this.FruitsIndex);
    }
    /**
     * 新手引导
     * @param index 
     */
    GuideView(index: number) {

        //白圈
        let baibian = cc.find("GuideBase/baibian", this.Guide);
        baibian.stopAllActions();
        baibian.parent.stopAllActions();
        baibian.parent.scale = 0.7;
        baibian.parent.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.6),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 0.8),
        ))
        baibian.active = true;
        baibian.scale = 1;
        baibian.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.4),
            cc.scaleTo(0.1, 1),
            cc.scaleTo(0.2, 3),
        ))
        baibian.runAction(cc.sequence(
            cc.fadeTo(0.1, 200),
            cc.fadeTo(0.1, 150),
            cc.fadeTo(0.2, 0),
            cc.callFunc(() => {
                baibian.active = false;
            })
        ))

        let x: number;
        let y: number;
        console.log("Method.Base3Info[index]:", Method.Base3Info[index], " ++++: ", index);
        x = Method.Base3Info[index].BasePos3_PosX;
        y = Method.Base3Info[index].BasePos3_PosY;
        let list = this.BaseList3;
        this.obj.runAction(cc.sequence(
            cc.moveTo(0.2, cc.v2(x, y)),
            // cc.delayTime(1),
            cc.callFunc(() => {
                if (this.seekindex(list, index) == true)
                    return;
                list = this.listPush(list, index);
                this.cost3 = this.addCost(this.cost3, index);
                this.PlayMusic(this.PlaceMusic, false, 1);
                this.obj.parent = this.GuideAntipasto;
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                if (this.cost3 == 6) {

                    //爆炸效果
                    this.bomb("Base3", this.BasePanel);

                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost3 = 0;
                    list = [];
                    this.GuideAntipasto.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.GuideAntipasto;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList3 = list;
                }
                if (index == 5) {
                    this.isGuide = 1;
                    Wx.Instance.localStorageSetInt(Config.Instance.IS_GUIDE, this.isGuide);
                    this.Guide.removeFromParent();
                    GameData.Instance.AddGameMoney(100);
                    Wx.Instance.ShowToast(`恭喜你获得了100金币！`);
                    console.log("完成引导...");
                }
                this.create();
                this.PlusOneIndex(this.GuideAntipasto, index);
                this.Score.string = this.SumScore.toString();

                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }
                this.Score.string = this.SumScore.toString();
            })
        ))
    }
    //----------------------------------新手引导-------------------------------//




    //-----------------------------果盘点击事件----------------------------------//
    Button0() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Base0_Fun(this.FruitsIndex);
    }
    Button1() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Base1_Fun(this.FruitsIndex);
    }
    Button2() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Base2_Fun(this.FruitsIndex);
    }
    Button3() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Base3_Fun(this.FruitsIndex);
    }
    Button4() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Base4_Fun(this.FruitsIndex);
    }
    Button5() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Base5_Fun(this.FruitsIndex);
    }
    //--------------------------------果盘点击事件-------------------------------//

    //--------------------------------数组找索引---------------------------------//
    /**
     * 数组找索引前
     * @param list 数组
     * @param index 索引
     */
    seekindex(list: any, index: number): boolean {
        if (index < 6) {
            if (this.listindexOf1(list, index) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                this.obj.parent.runAction(cc.sequence(
                    cc.delayTime(0),
                    cc.rotateBy(0.2, 360),
                ));
                return true;
            }
        } else if (index == 6) {
            if (this.listindexOf2(list, 0, 1) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 7) {
            if (this.listindexOf2(list, 1, 2) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 8) {
            if (this.listindexOf2(list, 2, 3) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 9) {
            if (this.listindexOf2(list, 3, 4) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 10) {
            if (this.listindexOf2(list, 4, 5) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 11) {
            if (this.listindexOf2(list, 5, 0) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 12) {
            if (this.listindexOf3(list, 0, 1, 2) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 13) {
            if (this.listindexOf3(list, 1, 2, 3) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 14) {
            if (this.listindexOf3(list, 2, 3, 4) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 15) {
            if (this.listindexOf3(list, 3, 4, 5) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 16) {
            if (this.listindexOf3(list, 4, 5, 0) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        } else if (index == 17) {
            if (this.listindexOf3(list, 5, 0, 1) == true) {
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                return true;
            }
        }
        return false;
    }
    /**
     * 数组找索引方法(一个索引)
     */
    listindexOf1(list1, one: number): boolean {
        let bool;
        list1.indexOf(one) == -1 ? bool = false : bool = true;
        return bool;

        // if (list1.indexOf(one) == -1) {
        //     return false;
        // }
    }
    /**
     * 数组找索引方法(二个索引)
     */
    listindexOf2(list1, one: number, twe: number): boolean {
        let bool;
        list1.indexOf(one) == -1 ?
            list1.indexOf(twe) == -1 ?
                bool = false : bool = true : bool = true;
        return bool;

        // if (list1.indexOf(one) == -1) {
        //     if (list1.indexOf(twe) == -1) {
        //         return false;
        //     }
        // }
    }
    /**
     * 数组找索引方法(三个索引)
     */
    listindexOf3(list1, one: number, twe: number, three: number): boolean {
        let bool;
        list1.indexOf(one) == -1 ?
            list1.indexOf(twe) == -1 ?
                list1.indexOf(three) == -1 ? bool = false : bool = true : bool = true : bool = true;

        return bool;

        if (list1.indexOf(one) == -1) {
            if (list1.indexOf(twe) == -1) {
                if (list1.indexOf(three) == -1) {
                    return false;
                }
            }
        }
        // bool1 = list1.indexOf(one) == -1 ? false:true;
        // bool2 = list1.indexOf(twe) == -1 ? false:true;
        // bool3 = list1.indexOf(three) == -1 ? false:true;
        // if(bool1 == bool2 == bool3 == false){
        //     return false;
        // }
    }
    /**
     * 数组添加索引
     * @param List 数组
     * @param indexNum 索引
     */
    listPush(List: any, indexNum: number): any {
        if (indexNum < 6) {
            List.push(indexNum);
        } else if (indexNum == 6) {
            List.push(0);
            List.push(1);
        } else if (indexNum == 7) {
            List.push(1);
            List.push(2);
        } else if (indexNum == 8) {
            List.push(2);
            List.push(3);
        } else if (indexNum == 9) {
            List.push(3);
            List.push(4);
        } else if (indexNum == 10) {
            List.push(4);
            List.push(5);
        } else if (indexNum == 11) {
            List.push(5);
            List.push(1);
        } else if (indexNum == 12) {
            List.push(0);
            List.push(1);
            List.push(2);
        } else if (indexNum == 13) {
            List.push(1);
            List.push(2);
            List.push(3);
        } else if (indexNum == 14) {
            List.push(2);
            List.push(3);
            List.push(4);
        } else if (indexNum == 15) {
            List.push(3);
            List.push(4);
            List.push(5);
        } else if (indexNum == 16) {
            List.push(4);
            List.push(5);
            List.push(1);
        } else if (indexNum == 17) {
            List.push(5);
            List.push(0);
            List.push(1);
        }
        return List;
    }
    /**
     * 增加指定编号果盘的索引
     * @param cost 
     * @param index 
     */
    addCost(cost: number, index: number): number {
        if (index < 6) {
            this.SumScore++;
            cost++;
        } else if (index == 6) {
            this.SumScore += 2;
            cost += 2;
        } else if (index == 7) {
            this.SumScore += 2;
            cost += 2;
        } else if (index == 8) {
            this.SumScore += 2;
            cost += 2;
        } else if (index == 9) {
            this.SumScore += 2;
            cost += 2;
        } else if (index == 10) {
            this.SumScore += 2;
            cost += 2;
        } else if (index == 11) {
            this.SumScore += 2;
            cost += 2;
        } else if (index == 12) {
            this.SumScore += 3;
            cost += 3;
        } else if (index == 13) {
            this.SumScore += 3;
            cost += 3;
        } else if (index == 14) {
            this.SumScore += 3;
            cost += 3;
        } else if (index == 15) {
            this.SumScore += 3;
            cost += 3;
        } else if (index == 16) {
            this.SumScore += 3;
            cost += 3;
        } else if (index == 17) {
            this.SumScore += 3;
            cost += 3;
        }
        return cost;
    }
    //--------------------------------数组找索引---------------------------------//




    //---------------------------------加分----------------------------------//
    /**
     * 加分特效
     * @param parent 父级
     * @param index 水果编号
     */
    PlusOneIndex(parent, index) {
        if (index == 0) {
            this.PlusOneFun(parent, 0);
            // let gameobj = cc.instantiate(this.PlusOne0);
            // gameobj.parent = this.Antipasto_0;
            // gameobj.name = "PlusOne" + 0;
            // gameobj.getComponent(cc.Animation).play();
        }
        else if (index == 1) {
            this.PlusOneFun(parent, 1);
        }
        else if (index == 2) {
            this.PlusOneFun(parent, 2);
        }
        else if (index == 3) {
            this.PlusOneFun(parent, 3);
        }
        else if (index == 4) {
            this.PlusOneFun(parent, 4);
        }
        else if (index == 5) {
            this.PlusOneFun(parent, 5);
        }
        else if (index == 6) {
            this.PlusOneFun(parent, 0);
            this.PlusOneFun(parent, 1);
        }
        else if (index == 7) {
            this.PlusOneFun(parent, 1);
            this.PlusOneFun(parent, 2);
        }
        else if (index == 8) {
            this.PlusOneFun(parent, 2);
            this.PlusOneFun(parent, 3);
        }
        else if (index == 9) {
            this.PlusOneFun(parent, 3);
            this.PlusOneFun(parent, 4);
        }
        else if (index == 10) {
            this.PlusOneFun(parent, 4);
            this.PlusOneFun(parent, 5);
        }
        else if (index == 11) {
            this.PlusOneFun(parent, 5);
            this.PlusOneFun(parent, 0);
        }
        else if (index == 12) {
            this.PlusOneFun(parent, 0);
            this.PlusOneFun(parent, 1);
            this.PlusOneFun(parent, 2);
        }
        else if (index == 13) {
            this.PlusOneFun(parent, 1);
            this.PlusOneFun(parent, 2);
            this.PlusOneFun(parent, 3);
        }
        else if (index == 14) {
            this.PlusOneFun(parent, 2);
            this.PlusOneFun(parent, 3);
            this.PlusOneFun(parent, 4);
        }
        else if (index == 15) {
            this.PlusOneFun(parent, 3);
            this.PlusOneFun(parent, 4);
            this.PlusOneFun(parent, 5);
        }
        else if (index == 16) {
            this.PlusOneFun(parent, 4);
            this.PlusOneFun(parent, 5);
            this.PlusOneFun(parent, 0);
        }
        else if (index == 17) {
            this.PlusOneFun(parent, 5);
            this.PlusOneFun(parent, 0);
            this.PlusOneFun(parent, 1);
        }
    }
    /**
     * 加分方法
     * @param parentNode 父物体
     * @param num 编号
     */
    PlusOneFun(parentNode, num: number) {
        if (num == 0) {
            let gameobj1 = cc.instantiate(this.PlusOne0);
            gameobj1.parent = parentNode;
            gameobj1.name = "PlusOne" + 0;
            gameobj1.getComponent(cc.Animation).play();
        }
        if (num == 1) {
            let gameobj1 = cc.instantiate(this.PlusOne1);
            gameobj1.parent = parentNode;
            gameobj1.name = "PlusOne" + 1;
            gameobj1.getComponent(cc.Animation).play();
        }
        if (num == 2) {
            let gameobj1 = cc.instantiate(this.PlusOne2);
            gameobj1.parent = parentNode;
            gameobj1.name = "PlusOne" + 2;
            gameobj1.getComponent(cc.Animation).play();
        }
        if (num == 3) {
            let gameobj1 = cc.instantiate(this.PlusOne3);
            gameobj1.parent = parentNode;
            gameobj1.name = "PlusOne" + 3;
            gameobj1.getComponent(cc.Animation).play();
        }
        if (num == 4) {
            let gameobj1 = cc.instantiate(this.PlusOne4);
            gameobj1.parent = parentNode;
            gameobj1.name = "PlusOne" + 4;
            gameobj1.getComponent(cc.Animation).play();
        }
        if (num == 5) {
            let gameobj1 = cc.instantiate(this.PlusOne5);
            gameobj1.parent = parentNode;
            gameobj1.name = "PlusOne" + 5;
            gameobj1.getComponent(cc.Animation).play();
        }
    }
    //---------------------------------加分----------------------------------//



    //--------------------------------果盘---------------------------------------//
    Base0_Fun(index: number) {
        //白圈
        let baibian = cc.find("Base0/baibian", this.BasePanel);
        baibian.stopAllActions();
        baibian.parent.stopAllActions();
        baibian.parent.scale = 0.7;
        baibian.parent.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.6),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 0.8),
        ))
        baibian.active = true;
        baibian.scale = 1;
        baibian.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.4),
            cc.scaleTo(0.1, 1),
            cc.scaleTo(0.2, 3),
        ))
        baibian.runAction(cc.sequence(
            cc.fadeTo(0.1, 200),
            cc.fadeTo(0.1, 150),
            cc.fadeTo(0.2, 0),
            cc.callFunc(() => {
                baibian.active = false;
            })
        ))


        let x: number;
        let y: number;
        x = Method.Base0Info[index].BasePos0_PosX;
        y = Method.Base0Info[index].BasePos0_PosY;
        let list = this.BaseList0;
        this.obj.runAction(cc.sequence(
            cc.moveTo(0.2, cc.v2(x, y)),
            cc.callFunc(() => {
                if (this.seekindex(list, index) == true) {
                    this.PlayMusic(this.ErrorMusic, false, 1);
                    return;
                }
                this.StartBase_Antipasto.removeAllChildren();
                this.preview.removeAllChildren();
                this.PlayMusic(this.PlaceMusic, false, 1);
                list = this.listPush(list, index);
                this.cost0 = this.addCost(this.cost0, index);
                // console.log("this.cost0: ",this.cost0);
                // console.log("list: ",list);
                this.obj.parent = this.Antipasto_0;
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                if (this.cost0 == 6) {

                    //爆炸效果
                    this.bomb("Base0", this.BasePanel);

                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost0 = 0;
                    this.Antipasto_0.removeAllChildren();
                    let ScorePlay0 = cc.instantiate(this.removeScore);
                    ScorePlay0.parent = this.Antipasto_0;
                    ScorePlay0.name = "removeScore";
                    ScorePlay0.getComponent(cc.Animation).play();
                    this.BaseList0 = [];

                    if (this.cost1 != 0) {

                        //爆炸效果
                        this.bomb("Base1", this.BasePanel);

                        this.Antipasto_1.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost1.toString();
                        ScorePlay1.parent = this.Antipasto_1;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost1;
                        this.cost1 = 0;
                        this.BaseList1 = [];
                    }

                    if (this.cost5 != 0) {

                        //爆炸效果
                        this.bomb("Base5", this.BasePanel);

                        this.Antipasto_5.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost5.toString();
                        ScorePlay2.parent = this.Antipasto_5;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost5;
                        this.cost5 = 0;
                        this.BaseList5 = [];
                    }
                    this.GitBoxFun();
                }

                this.create();
                this.PlusOneIndex(this.Antipasto_0, index);
                this.Score.string = this.SumScore.toString();

                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }

                this.SaveGameList();
            })
        ));
    }
    Base1_Fun(index: number) {

        //白圈
        let baibian = cc.find("Base1/baibian", this.BasePanel);
        baibian.stopAllActions();
        baibian.parent.stopAllActions();
        baibian.parent.scale = 0.7;
        baibian.parent.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.6),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 0.8),
        ))
        baibian.active = true;
        baibian.scale = 1;
        baibian.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.4),
            cc.scaleTo(0.1, 1),
            cc.scaleTo(0.2, 3),
        ))
        baibian.runAction(cc.sequence(
            cc.fadeTo(0.1, 200),
            cc.fadeTo(0.1, 150),
            cc.fadeTo(0.2, 0),
            cc.callFunc(() => {
                baibian.active = false;
            })
        ))

        let x: number;
        let y: number;
        x = Method.Base1Info[index].BasePos1_PosX;
        y = Method.Base1Info[index].BasePos1_PosY;
        let list = this.BaseList1;
        this.obj.runAction(cc.sequence(
            cc.moveTo(0.2, cc.v2(x, y)),
            // cc.delayTime(1),
            cc.callFunc(() => {
                if (this.seekindex(list, index) == true) {
                    this.PlayMusic(this.ErrorMusic, false, 1);
                    return;
                }
                this.PlayMusic(this.PlaceMusic, false, 1);
                list = this.listPush(list, index);
                this.cost1 = this.addCost(this.cost1, index);
                // console.log("this.cost1: ",this.cost1);
                // console.log("list: ",list);
                this.obj.parent = this.Antipasto_1;
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                if (this.cost1 == 6) {

                    //爆炸效果
                    this.bomb("Base1", this.BasePanel);

                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost1 = 0;
                    this.Antipasto_1.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_1;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList1 = [];

                    if (this.cost0 != 0) {

                        //爆炸效果
                        this.bomb("Base0", this.BasePanel);

                        this.Antipasto_0.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost0.toString();
                        ScorePlay2.parent = this.Antipasto_0;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost0;
                        this.cost0 = 0;
                        this.BaseList0 = [];
                    }

                    if (this.cost2 != 0) {

                        //爆炸效果
                        this.bomb("Base2", this.BasePanel);

                        this.Antipasto_2.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost2.toString();
                        ScorePlay1.parent = this.Antipasto_2;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost2;
                        this.cost2 = 0;
                        this.BaseList2 = [];
                    }
                    this.GitBoxFun();
                }
                this.create();
                this.PlusOneIndex(this.Antipasto_1, index);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }

                this.SaveGameList();
            })
        ))
    }
    Base2_Fun(index: number) {

        //白圈
        let baibian = cc.find("Base2/baibian", this.BasePanel);
        baibian.stopAllActions();
        baibian.parent.stopAllActions();
        baibian.parent.scale = 0.7;
        baibian.parent.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.6),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 0.8),
        ))
        baibian.active = true;
        baibian.scale = 1;
        baibian.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.4),
            cc.scaleTo(0.1, 1),
            cc.scaleTo(0.2, 3),
        ))
        baibian.runAction(cc.sequence(
            cc.fadeTo(0.1, 200),
            cc.fadeTo(0.1, 150),
            cc.fadeTo(0.2, 0),
            cc.callFunc(() => {
                baibian.active = false;
            })
        ))

        let x: number;
        let y: number;
        x = Method.Base2Info[index].BasePos2_PosX;
        y = Method.Base2Info[index].BasePos2_PosY;
        let list = this.BaseList2;
        this.obj.runAction(cc.sequence(
            cc.moveTo(0.2, cc.v2(x, y)),
            // cc.delayTime(1),
            cc.callFunc(() => {
                if (this.seekindex(list, index) == true) {
                    this.PlayMusic(this.ErrorMusic, false, 1);
                    return;
                }
                this.PlayMusic(this.PlaceMusic, false, 1);
                list = this.listPush(list, index);
                this.cost2 = this.addCost(this.cost2, index);
                // console.log("this.cost2: ",this.cost2);
                // console.log("list: ",list);
                this.obj.parent = this.Antipasto_2;
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                if (this.cost2 == 6) {

                    //爆炸效果
                    this.bomb("Base2", this.BasePanel);

                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost2 = 0;
                    this.Antipasto_2.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_2;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList2 = [];

                    if (this.cost1 != 0) {

                        //爆炸效果
                        this.bomb("Base1", this.BasePanel);

                        this.Antipasto_1.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost1.toString();
                        ScorePlay1.parent = this.Antipasto_1;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost1;
                        this.cost1 = 0;
                        this.BaseList1 = [];
                    }

                    if (this.cost3 != 0) {

                        //爆炸效果
                        this.bomb("Base3", this.BasePanel);

                        this.Antipasto_3.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost3.toString();
                        ScorePlay2.parent = this.Antipasto_3;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost3;
                        this.cost3 = 0;
                        this.BaseList3 = [];
                    }
                    this.GitBoxFun();
                }
                this.create();
                this.PlusOneIndex(this.Antipasto_2, index);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }

                this.SaveGameList();
            })
        ))
    }
    Base3_Fun(index: number) {

        //白圈
        let baibian = cc.find("Base3/baibian", this.BasePanel);
        baibian.stopAllActions();
        baibian.parent.stopAllActions();
        baibian.parent.scale = 0.7;
        baibian.parent.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.6),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 0.8),
        ))
        baibian.active = true;
        baibian.scale = 1;
        baibian.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.4),
            cc.scaleTo(0.1, 1),
            cc.scaleTo(0.2, 3),
        ))
        baibian.runAction(cc.sequence(
            cc.fadeTo(0.1, 200),
            cc.fadeTo(0.1, 150),
            cc.fadeTo(0.2, 0),
            cc.callFunc(() => {
                baibian.active = false;
            })
        ))

        let x: number;
        let y: number;
        x = Method.Base3Info[index].BasePos3_PosX;
        y = Method.Base3Info[index].BasePos3_PosY;
        let list = this.BaseList3;
        this.obj.runAction(cc.sequence(
            cc.moveTo(0.2, cc.v2(x, y)),
            // cc.delayTime(1),
            cc.callFunc(() => {
                if (this.seekindex(list, index) == true) {
                    this.PlayMusic(this.ErrorMusic, false, 1);
                    return;
                }
                this.PlayMusic(this.PlaceMusic, false, 1);
                list = this.listPush(list, index);
                this.cost3 = this.addCost(this.cost3, index);
                // console.log("this.cost3: ",this.cost3);
                // console.log("list: ",list);
                this.obj.parent = this.Antipasto_3;
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                if (this.cost3 == 6) {

                    //爆炸效果
                    this.bomb("Base3", this.BasePanel);

                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost3 = 0;
                    this.Antipasto_3.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_3;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList3 = [];

                    if (this.cost2 != 0) {

                        //爆炸效果
                        this.bomb("Base2", this.BasePanel);

                        this.Antipasto_2.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost2.toString();
                        ScorePlay1.parent = this.Antipasto_2;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost2;
                        this.cost2 = 0;
                        this.BaseList2 = [];
                    }

                    if (this.cost4 != 0) {

                        //爆炸效果
                        this.bomb("Base4", this.BasePanel);

                        this.Antipasto_4.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost4.toString();
                        ScorePlay2.parent = this.Antipasto_4;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost4;
                        this.cost4 = 0;
                        this.BaseList4 = [];
                    }
                    this.GitBoxFun();
                }
                this.create();
                this.PlusOneIndex(this.Antipasto_3, index);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }

                this.SaveGameList();
            })
        ))
    }
    Base4_Fun(index: number) {

        //白圈
        let baibian = cc.find("Base4/baibian", this.BasePanel);
        baibian.stopAllActions();
        baibian.parent.stopAllActions();
        baibian.parent.scale = 0.7;
        baibian.parent.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.6),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 0.8),
        ))
        baibian.active = true;
        baibian.scale = 1;
        baibian.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.4),
            cc.scaleTo(0.1, 1),
            cc.scaleTo(0.2, 3),
        ))
        baibian.runAction(cc.sequence(
            cc.fadeTo(0.1, 200),
            cc.fadeTo(0.1, 150),
            cc.fadeTo(0.2, 0),
            cc.callFunc(() => {
                baibian.active = false;
            })
        ))

        let x: number;
        let y: number;
        x = Method.Base4Info[index].BasePos4_PosX;
        y = Method.Base4Info[index].BasePos4_PosY;
        let list = this.BaseList4;
        this.obj.runAction(cc.sequence(
            cc.moveTo(0.2, cc.v2(x, y)),
            // cc.delayTime(1),
            cc.callFunc(() => {
                if (this.seekindex(list, index) == true) {
                    this.PlayMusic(this.ErrorMusic, false, 1);
                    return;
                }
                this.PlayMusic(this.PlaceMusic, false, 1);
                list = this.listPush(list, index);
                this.cost4 = this.addCost(this.cost4, index);
                // console.log("this.cost4: ",this.cost4);
                // console.log("list: ",list);
                this.obj.parent = this.Antipasto_4;
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                if (this.cost4 == 6) {

                    //爆炸效果
                    this.bomb("Base4", this.BasePanel);

                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost4 = 0;
                    this.Antipasto_4.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_4;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList4 = [];

                    if (this.cost3 != 0) {

                        //爆炸效果
                        this.bomb("Base3", this.BasePanel);

                        this.Antipasto_3.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost3.toString();
                        ScorePlay1.parent = this.Antipasto_3;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost3;
                        this.cost3 = 0;
                        this.BaseList3 = [];
                    }


                    if (this.cost5 != 0) {

                        //爆炸效果
                        this.bomb("Base5", this.BasePanel);

                        this.Antipasto_5.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost5.toString();
                        ScorePlay2.parent = this.Antipasto_5;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost5;
                        this.cost5 = 0;
                        this.BaseList5 = [];
                    }
                    this.GitBoxFun();
                }
                this.create();
                this.PlusOneIndex(this.Antipasto_4, index);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }

                this.SaveGameList();
            })
        ))
    }
    Base5_Fun(index: number) {

        //白圈
        let baibian = cc.find("Base5/baibian", this.BasePanel);
        baibian.stopAllActions();
        baibian.parent.stopAllActions();
        baibian.parent.scale = 0.7;
        baibian.parent.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.6),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 0.8),
        ))
        baibian.active = true;
        baibian.scale = 1;
        baibian.runAction(cc.sequence(
            cc.scaleTo(0.1, 1.4),
            cc.scaleTo(0.1, 1),
            cc.scaleTo(0.2, 3),
        ))
        baibian.runAction(cc.sequence(
            cc.fadeTo(0.1, 200),
            cc.fadeTo(0.1, 150),
            cc.fadeTo(0.2, 0),
            cc.callFunc(() => {
                baibian.active = false;
            })
        ))

        let x: number;
        let y: number;
        x = Method.Base5Info[index].BasePos5_PosX;
        y = Method.Base5Info[index].BasePos5_PosY;
        let list = this.BaseList5;
        this.obj.runAction(cc.sequence(
            cc.moveTo(0.2, cc.v2(x, y)),
            // cc.delayTime(1),
            cc.callFunc(() => {
                if (this.seekindex(list, index) == true) {
                    this.PlayMusic(this.ErrorMusic, false, 1);
                    return;
                }
                this.PlayMusic(this.PlaceMusic, false, 1);
                list = this.listPush(list, index);
                this.cost5 = this.addCost(this.cost5, index);
                // console.log("this.cost5: ",this.cost5);
                // console.log("list: ",list);
                this.obj.parent = this.Antipasto_5;
                this.obj.setPosition(cc.v2(Method.StartBase[index].StartBase_PosX, Method.StartBase[index].StartBase_PosY));
                if (this.cost5 == 6) {

                    //爆炸效果
                    this.bomb("Base5", this.BasePanel);

                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost5 = 0;
                    this.Antipasto_5.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_5;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList5 = [];

                    if (this.cost4 != 0) {

                        //爆炸效果
                        this.bomb("Base4", this.BasePanel);

                        this.Antipasto_4.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost4.toString();
                        ScorePlay1.parent = this.Antipasto_4;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost4;
                        this.cost4 = 0;
                        this.BaseList4 = [];
                    }

                    if (this.cost0 != 0) {

                        //爆炸效果
                        this.bomb("Base0", this.BasePanel);

                        this.Antipasto_0.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost0.toString();
                        ScorePlay2.parent = this.Antipasto_0;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost0;
                        this.cost0 = 0;
                        this.BaseList0 = [];
                    }
                    this.GitBoxFun();
                }
                this.create();
                this.PlusOneIndex(this.Antipasto_5, index);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }

                this.SaveGameList();
            })
        ))
    }
    //---------------------------------果盘-------------------------------------//

    /**
     * //-------------------------------万能块--------------------------------//
     */
    UniversalBlock() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        Wx.Instance.OnEvent("经典模式", "功能", "点击万能块道具");
        if (GameData.Instance.GetGameMoney() > 30) {
            Method.OpenViewNum++;
            GameData.Instance.AddGameMoney(-30);
            this.FunMask.active = true;
            this.UniversalBlockNode.active = true;
        } else {
            // this.AddMoney();
            this.MoneyChangingView();
            // const type = RewardType.Money;
            // const method = RewardSystem.Instance.getDefaultRewardMethod();
            // RewardSystem.Instance.getReward(
            //     type,
            //     method,
            //     (targetType: RewardType, getMethod: GetRewardType) => {
            //         // success
            //         Wx.Instance.OnEvent("经典模式","功能","万能块道具视频分享成功");
            //         this.FunMask.active = true;
            //         this.UniversalBlockNode.active = true;
            //     },
            //     (targetType: RewardType, getMethod: GetRewardType) => {
            //         // fail
            //         console.log("Block0。。。fail");
            //     }
            // );
        }
    }
    Block0() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Block0Fun();
    }
    Block1() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Block1Fun();
    }

    Block2() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Block2Fun();
    }
    Block3() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Block3Fun();

    }
    Block4() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Block4Fun();
    }
    Block5() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Block5Fun();
    }
    AddFun(index: number, Antipasto: cc.Node) {
        switch (index) {
            case 0:
                let Gameobj0 = cc.instantiate(this.Gameobj0);
                Gameobj0.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame("1");
                Gameobj0.setPosition(cc.v2(Method.StartBase[0].StartBase_PosX, Method.StartBase[0].StartBase_PosY));
                Gameobj0.parent = Antipasto;
                Gameobj0.name = "Watermelon" + 0;
                break;
            case 1:
                let Gameobj1 = cc.instantiate(this.Gameobj1);
                Gameobj1.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame("2");
                Gameobj1.setPosition(cc.v2(Method.StartBase[1].StartBase_PosX, Method.StartBase[1].StartBase_PosY));
                Gameobj1.parent = Antipasto;
                Gameobj1.name = "Watermelon" + 1;
                break;
            case 2:
                let Gameobj2 = cc.instantiate(this.Gameobj2);
                Gameobj2.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame("3");
                Gameobj2.setPosition(cc.v2(Method.StartBase[2].StartBase_PosX, Method.StartBase[2].StartBase_PosY));
                Gameobj2.parent = Antipasto;
                Gameobj2.name = "Watermelon" + 2;
                break;
            case 3:
                let Gameobj3 = cc.instantiate(this.Gameobj3);
                Gameobj3.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame("4");
                Gameobj3.setPosition(cc.v2(Method.StartBase[3].StartBase_PosX, Method.StartBase[3].StartBase_PosY));
                Gameobj3.parent = Antipasto;
                Gameobj3.name = "Watermelon" + 3;
                break;
            case 4:
                let Gameobj4 = cc.instantiate(this.Gameobj4);
                Gameobj4.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame("5");
                Gameobj4.setPosition(cc.v2(Method.StartBase[4].StartBase_PosX, Method.StartBase[4].StartBase_PosY));
                Gameobj4.parent = Antipasto;
                Gameobj4.name = "Watermelon" + 4;
                break;
            case 5:
                let Gameobj5 = cc.instantiate(this.Gameobj5);
                Gameobj5.getComponent(cc.Sprite).spriteFrame = this.CurFruits.getSpriteFrame("6");
                Gameobj5.setPosition(cc.v2(Method.StartBase[5].StartBase_PosX, Method.StartBase[5].StartBase_PosY));
                Gameobj5.parent = Antipasto;
                Gameobj5.name = "Watermelon" + 5;
                break;

            default:
                break;
        }
    }
    Block0Fun() {
        for (let i = 0; i < 6; i++) {
            if (this.BaseList0.indexOf(i) == -1) {
                this.BaseList0.push(i);
                this.AddFun(i, this.Antipasto_0);

                this.PlayMusic(this.PlaceMusic, false, 1);
                this.cost0 = this.addCost(this.cost0, 1);
                if (this.cost0 == 6) {
                    this.bomb("Base0", this.BasePanel);
                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost0 = 0;
                    this.Antipasto_0.removeAllChildren();
                    let ScorePlay0 = cc.instantiate(this.removeScore);
                    ScorePlay0.parent = this.Antipasto_0;
                    ScorePlay0.name = "removeScore";
                    ScorePlay0.getComponent(cc.Animation).play();
                    this.BaseList0 = [];

                    if (this.cost1 != 0) {
                        this.Antipasto_1.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost1.toString();
                        ScorePlay1.parent = this.Antipasto_1;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost1;
                        this.cost1 = 0;
                        this.BaseList1 = [];
                    }

                    if (this.cost5 != 0) {
                        this.Antipasto_5.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost5.toString();
                        ScorePlay2.parent = this.Antipasto_5;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost5;
                        this.cost5 = 0;
                        this.BaseList5 = [];
                    }
                    this.GitBoxFun();
                }

                this.PlusOneIndex(this.Antipasto_0, i);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }
                this.FunMask.active = false;
                this.UniversalBlockNode.active = false;
                this.Death();
                this.SaveGameList();
                return;
            }
        }
    }
    Block1Fun() {
        for (let i = 0; i < 6; i++) {
            if (this.BaseList1.indexOf(i) == -1) {
                this.BaseList1.push(i);
                this.AddFun(i, this.Antipasto_1);

                this.PlayMusic(this.PlaceMusic, false, 1);
                this.cost1 = this.addCost(this.cost1, 1);
                if (this.cost1 == 6) {
                    this.bomb("Base1", this.BasePanel);
                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost1 = 0;
                    this.Antipasto_1.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_1;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList1 = [];

                    if (this.cost0 != 0) {
                        this.Antipasto_0.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost0.toString();
                        ScorePlay2.parent = this.Antipasto_0;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost0;
                        this.cost0 = 0;
                        this.BaseList0 = [];
                    }

                    if (this.cost2 != 0) {
                        this.Antipasto_2.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost2.toString();
                        ScorePlay1.parent = this.Antipasto_2;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost2;
                        this.cost2 = 0;
                        this.BaseList2 = [];
                    }
                    this.GitBoxFun();
                }

                this.PlusOneIndex(this.Antipasto_1, i);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }

                this.FunMask.active = false;
                this.UniversalBlockNode.active = false;
                this.Death();
                this.SaveGameList();
                return;
            }
        }
    }
    Block2Fun() {
        for (let i = 0; i < 6; i++) {
            if (this.BaseList2.indexOf(i) == -1) {
                this.BaseList2.push(i);
                this.AddFun(i, this.Antipasto_2);

                this.PlayMusic(this.PlaceMusic, false, 1);
                this.cost2 = this.addCost(this.cost2, 1);
                if (this.cost2 == 6) {
                    this.bomb("Base2", this.BasePanel);
                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost2 = 0;
                    this.Antipasto_2.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_2;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList2 = [];

                    if (this.cost1 != 0) {
                        this.Antipasto_1.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost1.toString();
                        ScorePlay1.parent = this.Antipasto_1;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost1;
                        this.cost1 = 0;
                        this.BaseList1 = [];
                    }

                    if (this.cost3 != 0) {
                        this.Antipasto_3.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost3.toString();
                        ScorePlay2.parent = this.Antipasto_3;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost3;
                        this.cost3 = 0;
                        this.BaseList3 = [];
                    }
                    this.GitBoxFun();
                }

                this.PlusOneIndex(this.Antipasto_2, i);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }
                this.FunMask.active = false;
                this.UniversalBlockNode.active = false;
                this.Death();
                this.SaveGameList();
                return;
            }
        }
    }
    Block3Fun() {
        for (let i = 0; i < 6; i++) {
            if (this.BaseList3.indexOf(i) == -1) {
                this.BaseList3.push(i);
                this.AddFun(i, this.Antipasto_3);

                this.PlayMusic(this.PlaceMusic, false, 1);
                this.cost3 = this.addCost(this.cost3, 1);
                if (this.cost3 == 6) {
                    this.bomb("Base3", this.BasePanel);
                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost3 = 0;
                    this.Antipasto_3.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_3;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList3 = [];

                    if (this.cost2 != 0) {
                        this.Antipasto_2.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost2.toString();
                        ScorePlay1.parent = this.Antipasto_2;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost2;
                        this.cost2 = 0;
                        this.BaseList2 = [];
                    }

                    if (this.cost4 != 0) {
                        this.Antipasto_4.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost4.toString();
                        ScorePlay2.parent = this.Antipasto_4;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost4;
                        this.cost4 = 0;
                        this.BaseList4 = [];
                    }
                    this.GitBoxFun();
                }

                this.PlusOneIndex(this.Antipasto_3, i);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }
                this.FunMask.active = false;
                this.UniversalBlockNode.active = false;
                this.Death();
                this.SaveGameList();
                return;
            }
        }
    }
    Block4Fun() {
        for (let i = 0; i < 6; i++) {
            if (this.BaseList4.indexOf(i) == -1) {
                this.BaseList4.push(i);
                this.AddFun(i, this.Antipasto_4);

                this.PlayMusic(this.PlaceMusic, false, 1);
                this.cost4 = this.addCost(this.cost4, 1);
                if (this.cost4 == 6) {
                    this.bomb("Base4", this.BasePanel);
                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost4 = 0;
                    this.Antipasto_4.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_4;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList4 = [];

                    if (this.cost3 != 0) {
                        this.Antipasto_3.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost3.toString();
                        ScorePlay1.parent = this.Antipasto_3;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost3;
                        this.cost3 = 0;
                        this.BaseList3 = [];
                    }


                    if (this.cost5 != 0) {
                        this.Antipasto_5.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost5.toString();
                        ScorePlay2.parent = this.Antipasto_5;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost5;
                        this.cost5 = 0;
                        this.BaseList5 = [];
                    }
                    this.GitBoxFun();
                }

                this.PlusOneIndex(this.Antipasto_4, i);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }
                this.FunMask.active = false;
                this.UniversalBlockNode.active = false;
                this.Death();
                this.SaveGameList();
                return;
            }
        }
    }
    Block5Fun() {
        for (let i = 0; i < 6; i++) {
            if (this.BaseList5.indexOf(i) == -1) {
                this.BaseList5.push(i);
                this.AddFun(i, this.Antipasto_5);

                this.PlayMusic(this.PlaceMusic, false, 1);
                this.cost5 = this.addCost(this.cost5, 1);
                if (this.cost5 == 6) {
                    this.bomb("Base5", this.BasePanel);
                    this.PlayMusic(this.SynthesisOfMusic, false, 1);
                    this.SumScore += 6;
                    this.cost5 = 0;
                    this.Antipasto_5.removeAllChildren();
                    let ScorePlay = cc.instantiate(this.removeScore);
                    ScorePlay.parent = this.Antipasto_5;
                    ScorePlay.name = "removeScore";
                    ScorePlay.getComponent(cc.Animation).play();
                    this.BaseList5 = [];

                    if (this.cost4 != 0) {

                        this.Antipasto_4.removeAllChildren();
                        let ScorePlay1 = cc.instantiate(this.removeScore);
                        ScorePlay1.getComponent(cc.Label).string = "+" + this.cost4.toString();
                        ScorePlay1.parent = this.Antipasto_4;
                        ScorePlay1.name = "removeScore";
                        ScorePlay1.getComponent(cc.Animation).play();
                        this.SumScore += this.cost4;
                        this.cost4 = 0;
                        this.BaseList4 = [];
                    }

                    if (this.cost0 != 0) {

                        this.Antipasto_0.removeAllChildren();
                        let ScorePlay2 = cc.instantiate(this.removeScore);
                        ScorePlay2.getComponent(cc.Label).string = "+" + this.cost0.toString();
                        ScorePlay2.parent = this.Antipasto_0;
                        ScorePlay2.name = "removeScore";
                        ScorePlay2.getComponent(cc.Animation).play();
                        this.SumScore += this.cost0;
                        this.cost0 = 0;
                        this.BaseList0 = [];
                    }
                    this.GitBoxFun();

                }

                this.PlusOneIndex(this.Antipasto_5, i);
                this.Score.string = this.SumScore.toString();
                if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
                    Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
                    this.TopScoreNode.string = this.SumScore.toString();
                }
                this.FunMask.active = false;
                this.UniversalBlockNode.active = false;
                this.Death();
                this.SaveGameList();
                return;
            }
        }
    }
    //--------------------------------万能块-----------------------------------//


    //----------------------------------游戏音效---------------------------//
    /**
     * 停止背景音乐包括所有音效
     */
    public static pauseAllMusic() {
        console.log("停止所有音效");
        Wx.Instance.localStorageSetBool(Config.Instance.MUSIC_IS_PLAY, false);
        Method.isMusic = false;
        cc.audioEngine.pauseAll();
    }
    /**
     * 恢复所有音效
     */
    public static recoverMusic() {
        console.log("恢复所有音效");
        Wx.Instance.localStorageSetBool(Config.Instance.MUSIC_IS_PLAY, true);
        Method.isMusic = true;
        cc.audioEngine.resumeAll();
    }
    /**
     * 关闭背影音乐和音效
     */
    MusicButton() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        // this.isMusic = Wx.Instance.localStorageGetBool(Config.Instance.MUSIC_IS_PLAY, true);
        if (Method.isMusic == true) {
            this.Musicicon.color = new cc.Color(200, 200, 200);
            this.MusicLine.active = true;
            Method.isMusic = false;
            cc.audioEngine.pauseAll();
        } else {
            this.Musicicon.color = new cc.Color(255, 255, 255);
            this.MusicLine.active = false;
            Method.isMusic = true;
            cc.audioEngine.resumeAll();
        }
    }
    /**
     * 游戏音效（不包括背影音乐）
     * @param musicObj 
     * @param loop 
     * @param Valume 
     */
    PlayMusic(musicObj: cc.AudioClip, loop: boolean, Valume: number) {
        if (Method.isMusic == false) {
            return;
        }
        cc.audioEngine.play(musicObj, loop, Valume);
    }
    //----------------------------------游戏音效---------------------------//


    /**
     * 无尽模式的开始按钮
     */
    startBtn() {
        if (GamePrefabs.instance.NextResLoadSuccees == false) {
            GamePrefabs.instance.NextInit();

            cc.loader.loadRes('SubTexture/Revive', cc.SpriteAtlas, (err, res) => {
                if (err) {
                    console.log('Revive is fail: ', err);
                    return;
                }
                cc.find('node/guangshu', this.Revive).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("guangshu");
                cc.find('node/yun_2', this.Revive).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("yun_2");
                cc.find('node/kuang', this.Revive).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("kuang");
                cc.find('node/yun_1', this.Revive).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("yun_1");
                cc.find('node/yun_4', this.Revive).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("yun_4");
                cc.find('node/yun_3', this.Revive).getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("yun_3");
                // for (let index = 0; index < 6; index++) {
                //     cc.find(`node/NewNode/yudi${index}`, this.Revive).getComponent(cc.Sprite).spriteFrame= res.getSpriteFrame("yudi");
                // }
                // cc.find("Circle",this.node).getComponent(cc.Sprite).spriteFrame= res.getSpriteFrame("xuxiankuang");
            })

            setTimeout(() => {
                cc.loader.loadRes('SubTexture/GiftBox', cc.SpriteAtlas, (err, res) => {
                    if (err) {
                        console.log('GiftBox is fail: ', err);
                        return;
                    }
                    // this.GitBox.getChildByName("guangshu").getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("guangshu");
                    // this.jinbi.getChildByName("putonglingqu").getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("putonglingqu");
                    this.GitBox.getChildByName("Box").getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame("lihe");
                })
            }, 1000);

            setTimeout(() => {
                this.startBtnInit()
            }, 1000);
        } else {
            this.startBtnInit()
        }
    }

    startBtnInit() {
        Wx.Instance.OnEvent("首页", "功能", "点击经典模式");
        cc.find("ADNode", this.node).active = false;
        Method.OpenViewNum++;
        //动画
        this.randomIcon_Node.stopAllActions();
        this.MatchedTheme.stopAllActions();
        this.LevelTheme.stopAllActions();
        this.turntableIcon.stopAllActions();
        this.FieldGuideNode.stopAllActions();
        this.moreGame.stopAllActions();
        this.FreeDiamondIcon.stopAllActions();
        this.RedpackteIcon.stopAllActions();
        this.GuessYouLikeNode.stopAllActions();
        this.mask.opacity = 0;
        this.mask.active = true;
        if (window.wx != null) {
            this.TopScoreNode.string = Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0).toString();
            this.Score.string = Wx.Instance.localStorageGetInt(Config.ContinueTheGame.CurScore, 0).toString();
        }

        this.randomIcon_Node.rotation = 0;
        this.randomIcon_Node.runAction(cc.sequence(
            cc.fadeTo(0, 255),
            cc.fadeTo(0.5, 150),
            cc.fadeTo(0.2, 0),
        ))
        this.randomIcon_Node.runAction(cc.sequence(
            cc.delayTime(0.4),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
        ))
        this.MatchedTheme.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.5, 160),
            cc.fadeTo(0.2, 0),
        ))
        this.MatchedTheme.runAction(cc.sequence(
            cc.delayTime(0.5),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
        ))

        this.LevelTheme.runAction(cc.sequence(
            cc.delayTime(0.2),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.5, 170),
            cc.fadeTo(0.2, 0),
        ))
        this.LevelTheme.runAction(cc.sequence(
            cc.delayTime(0.6),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
        ))

        this.turntableIcon.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.fadeTo(0.5, 180),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.2, 0),
        ))
        this.turntableIcon.runAction(cc.sequence(
            cc.delayTime(0.7),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
        ))

        this.FieldGuideNode.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.fadeTo(0.5, 180),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.2, 0),
        ))
        this.FieldGuideNode.runAction(cc.sequence(
            cc.delayTime(0.7),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
        ))

        this.moreGame.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.5, 190),
            cc.fadeTo(0.2, 0),
        ))
        this.moreGame.runAction(cc.sequence(
            cc.delayTime(0.7),
            cc.scaleTo(0.1, 1.3),
            cc.scaleTo(0.2, 0),
        ))

        this.FreeDiamondIcon.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.5, 190),
            cc.fadeTo(0.2, 0),
        ))
        this.FreeDiamondIcon.runAction(cc.sequence(
            cc.delayTime(0.7),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
        ))

        this.RedpackteIcon.runAction(cc.sequence(
            cc.delayTime(0.3),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.5, 190),
            cc.fadeTo(0.2, 0),
        ))
        this.RedpackteIcon.runAction(cc.sequence(
            cc.delayTime(0.7),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
        ))

        this.GuessYouLikeNode.active = true;
        this.GuessYouLikeNode.setPosition(0, -180);
        this.GuessYouLikeNode.runAction(cc.sequence(
            cc.delayTime(0.4),
            cc.fadeTo(0, 255),
            cc.fadeTo(0.5, 200),
            cc.fadeTo(0.2, 0),
        ))
        this.GuessYouLikeNode.runAction(cc.sequence(
            cc.delayTime(0.8),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 0),
            cc.callFunc(() => {
                this.startNode.active = false;
                this.checkStoryNum(1);
                this.Fruits.node.active = false;
                this.StartIcon.active = false;
                this.moreGame.active = false;
                this.FreeDiamondIcon.active = false;
                this.RedpackteIcon.active = false;
                this.UniversalBlockNode.active = false;
                this.GuessYouLikeNode.active = false;
                this.Title.active = true;
                this.game.active = true;
                this.randomIcon_Node.rotation = 0;
                this.randomIcon_Node.setPosition(-210, 355);
                this.randomIcon_Node.active = true;
                cc.find("ADIcon", this.AD).active = false;
                this.preview.active = true;
                this.Hammer.active = false;
                this.MapTheTrialView();
            })
        ))
        this.randomIcon_Node.rotation = 0;
        this.randomIcon_Node.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1),
            cc.fadeTo(0.2, 150),
            cc.fadeTo(0.5, 255),
        ))
        this.randomIcon_Node.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1),
            cc.scaleTo(0.4, 0.9),
        ))

        this.StartBaseNode.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.1),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.StartBaseNode.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.1),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.5),
            cc.scaleTo(0.1, 0.7),
        ))

        this.Base0Node.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.2),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.Base0Node.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.2),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.5),
            cc.scaleTo(0.1, 0.7),
        ))

        this.Base1Node.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.3),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.Base1Node.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.3),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.5),
            cc.scaleTo(0.1, 0.7),
        ))

        this.Base2Node.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.4),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.Base2Node.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.4),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.5),
            cc.scaleTo(0.1, 0.7),
        ))

        this.Base3Node.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.5),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.Base3Node.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.5),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.5),
            cc.scaleTo(0.1, 0.7),
        ))

        this.Base4Node.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.6),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.Base4Node.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.6),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.5),
            cc.scaleTo(0.1, 0.7),
        ))

        this.Base5Node.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.7),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.Base5Node.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.7),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.5),
            cc.scaleTo(0.1, 0.7),
        ))
        this.FunctionNode.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(1.8),
            cc.fadeTo(0.3, 180),
            cc.fadeTo(0.2, 255),
        ))
        this.FunctionNode.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1.8),
            cc.scaleTo(0.3, 1),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.1, 1),
            cc.callFunc(() => {
                this.mask.active = false;
                this.mask.opacity = 150;
                if (this.isGuide == 0) {
                    this.Guide.active = true;
                } else {
                    this.Guide.active = false;
                    this.Guide.removeFromParent();
                    this.Preview = this.randomNum();
                    this.SaveGamePreviewIndex();
                }
            })
        ))
        if (this.isGuide == 0) {
            this.Guide.getChildByName("Mask").runAction(cc.sequence(
                cc.fadeTo(0, 0),
                cc.fadeTo(1, 120),
            ))
        }
    }
    /**
     * 1 = 无尽
     * 2 = 关卡
     * 3 = 匹配
     * @param Mode 模式index
     */
    checkStoryNum(Mode: number) {
        let title = cc.find("StoryName/guanqia", this.Title).getComponent(cc.Sprite);
        let wuxian = cc.find("StoryName/wuxian", this.Title);
        switch (Mode) {
            case 1:
                wuxian.active = true;
                title.node.active = false;
                break;
            case 2:
                wuxian.active = false;
                title.node.active = true;
                this.StoryIndex <= 20 ? title.spriteFrame = Method.RecruitModel.getSpriteFrame("jichuguanka") :
                    this.StoryIndex <= 50 ? title.spriteFrame = Method.RecruitModel.getSpriteFrame("putongguanka") :
                        this.StoryIndex <= 100 ? title.spriteFrame = Method.RecruitModel.getSpriteFrame("yibnaguanka") :
                            this.StoryIndex <= 200 ? title.spriteFrame = Method.RecruitModel.getSpriteFrame("kunnanguanka") :
                                title.spriteFrame = Method.RecruitModel.getSpriteFrame("emengguanka");
                break;
            case 3:

                break;

            default:
                break;
        }

    }
    /**
     * 通关炫耀
     */
    passShare() {
        Wx.Instance.OnEvent("经典模式", "功能", "点击炫耀获得");
        if (window.wx == null) {
            GameData.Instance.AddGameMoney(15);
            Wx.Instance.ShowToast(`恭喜你获得了15金币！`);
        } else {
            Wx.Instance.share(() => {
                setTimeout(() => {
                    Wx.Instance.OnEvent("经典模式", "功能", "点击炫耀分享成功");
                    Method.ShareIndex = 0;
                    Method.BeforeTheShareTime = new Date().getTime();
                    Wx.Instance.localStorageSetInt(Config.Instance.KEY_SHARE_NUM, GameData.ShareNum++)
                    EventManager.Instance.ExcuteListener(EventMessage.instance.passShare);
                }, 2000);
            });
        }
    }
    HomeShare() {
        Wx.Instance.share(() => { });
    }

    /**
     * 游戏结束
     */
    Gameover() {
        this.isdie = true;
        this.PlayMusic(this.DeathMusic, false, 1);
        this.mask.opacity = 200;
        this.maskText.node.opacity = 0;
        this.mask.active = true;
        this.maskText.node.active = true;
        this.maskText.string = "没有可能的行动...";
        this.maskText.node.runAction(cc.sequence(
            cc.fadeTo(0.5, 255),
            cc.delayTime(1.5),
            cc.fadeTo(0.5, 0),
            cc.callFunc(() => {
                // this.mask.active = false;
                // this.maskText.node.active = false;
                // return;
            })
        ))
        this.mask.runAction(cc.sequence(
            cc.delayTime(2),
            cc.fadeTo(0.5, 100),
            cc.callFunc(() => {
                Wx.Instance.OnEvent("经典模式", "功能", "弹出复活界面");
                Method.OpenViewNum++;
                this.mask.active = false;
                this.maskText.node.active = false;
                this.Resurgence.active = true;
                this.Revive.active = true;
                cc.find("ADNode", this.node).active = true;
                this.Over.active = false;
                this.GuessYouLikeNode.active = true;
                this.GuessYouLikeNode.setPosition(0, -112.5);
                this.CountDown();
            })
        ))
    }


    CountDown() {
        let index = 5;
        let time = cc.find("Number", this.Revive)
        time.getComponent(cc.Label).string = index.toString();
        let circle = cc.find("Circle", this.Revive)
        circle.stopAllActions();
        let Blackbutton = cc.find("quxiaofuhuo", this.Revive)
        Blackbutton.active = false;
        setTimeout(() => {
            Blackbutton.active = true;
        }, 2000);
        this.seq = cc.repeat(
            cc.sequence(
                cc.scaleTo(0.3, 0.8),
                cc.scaleTo(0.4, 1.2),
                cc.scaleTo(0.3, 1),
                cc.callFunc(() => {
                    index--;
                    time.getComponent(cc.Label).string = index.toString();
                })
            ), 6);
        circle.runAction(this.seq);
        setTimeout(() => {
            if (index <= 0) {
                this.black();
            }
        }, 6000);

    }

    bomb(url: string, parent: cc.Node) {
        //爆炸效果
        let texiao = cc.instantiate(this.Particle);
        texiao.getComponent(cc.ParticleSystem).startColor = cc.hexToColor(this.FruitsColor);
        texiao.getComponent(cc.ParticleSystem).endColor = cc.hexToColor(this.FruitsColor);
        texiao.parent = cc.find(url, parent);
    }

    ResurgenceMark() {
        // console.log("???: ", cc.find("Canvas/Resurgence/Revive/resurgenceBtn/mark/share"))
        if (ShareLimit.CanWatchVideo()) {
            cc.find("Canvas/Resurgence/Revive/resurgenceBtn/mark/share").active = false;
            cc.find("Canvas/Resurgence/Revive/resurgenceBtn/mark/vidoe").active = true;
        } else if (ShareLimit.CanShare()) {
            cc.find("Canvas/Resurgence/Revive/resurgenceBtn/mark/share").active = true;
            cc.find("Canvas/Resurgence/Revive/resurgenceBtn/mark/vidoe").active = false;
        } else {
            cc.find("Canvas/Resurgence/Revive/resurgenceBtn/mark/share").active =
                cc.find("Canvas/Resurgence/Revive/resurgenceBtn/mark/vidoe").active = false;
        }
    }

    /**
     * 复活
     */
    resurgenceBtn() {
        Wx.Instance.OnEvent("经典模式", "功能", "点击立即复活");

        RewardSystem.ShareAndWatch((isSuccess) => {
            if (isSuccess) {
                this.ResurgenceMark();
                Wx.Instance.OnEvent("经典模式", "功能", "点击立即复活视频分享成功");
                if (this.random > 0 && this.random < 1 / 6) {
                    this.BaseList0 = [];
                    this.BaseList1 = [];
                    this.BaseList2 = [];
                    this.cost0 = 0;
                    this.cost1 = 0;
                    this.cost2 = 0;
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
                    this.Antipasto_0.removeAllChildren();
                    this.Antipasto_1.removeAllChildren();
                    this.Antipasto_2.removeAllChildren();
                    this.Resurgence.active = false;
                    this.bomb("Base0", this.BasePanel);
                    this.bomb("Base1", this.BasePanel);
                    this.bomb("Base2", this.BasePanel);
                } else if (this.random > 1 / 6 && this.random < (1 / 6) * 2) {
                    this.BaseList1 = [];
                    this.BaseList2 = [];
                    this.BaseList3 = [];
                    this.cost1 = 0;
                    this.cost2 = 0;
                    this.cost3 = 0;
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
                    this.Antipasto_1.removeAllChildren();
                    this.Antipasto_2.removeAllChildren();
                    this.Antipasto_3.removeAllChildren();
                    this.Resurgence.active = false;
                    this.bomb("Base1", this.BasePanel);
                    this.bomb("Base2", this.BasePanel);
                    this.bomb("Base3", this.BasePanel);
                } else if (this.random > (1 / 6) * 2 && this.random < (1 / 6) * 3) {
                    this.BaseList2 = [];
                    this.BaseList3 = [];
                    this.BaseList4 = [];
                    this.cost2 = 0;
                    this.cost3 = 0;
                    this.cost4 = 0;
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
                    this.Antipasto_2.removeAllChildren();
                    this.Antipasto_3.removeAllChildren();
                    this.Antipasto_4.removeAllChildren();
                    this.Resurgence.active = false;
                    this.bomb("Base2", this.BasePanel);
                    this.bomb("Base3", this.BasePanel);
                    this.bomb("Base4", this.BasePanel);
                } else if (this.random > (1 / 6) * 3 && this.random < (1 / 6) * 4) {
                    this.BaseList3 = [];
                    this.BaseList4 = [];
                    this.BaseList5 = [];
                    this.cost3 = 0;
                    this.cost4 = 0;
                    this.cost5 = 0;
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
                    this.Antipasto_3.removeAllChildren();
                    this.Antipasto_4.removeAllChildren();
                    this.Antipasto_5.removeAllChildren();
                    this.Resurgence.active = false;
                    this.bomb("Base3", this.BasePanel);
                    this.bomb("Base4", this.BasePanel);
                    this.bomb("Base5", this.BasePanel);
                } else if (this.random > (1 / 6) * 4 && this.random < (1 / 6) * 5) {
                    this.BaseList4 = [];
                    this.BaseList5 = [];
                    this.BaseList0 = [];
                    this.cost4 = 0;
                    this.cost5 = 0;
                    this.cost0 = 0;
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
                    this.Antipasto_4.removeAllChildren();
                    this.Antipasto_5.removeAllChildren();
                    this.Antipasto_0.removeAllChildren();
                    this.Resurgence.active = false;
                    this.bomb("Base4", this.BasePanel);
                    this.bomb("Base5", this.BasePanel);
                    this.bomb("Base0", this.BasePanel);
                } else {
                    this.BaseList5 = [];
                    this.BaseList0 = [];
                    this.BaseList1 = [];
                    this.cost5 = 0;
                    this.cost0 = 0;
                    this.cost1 = 0;
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
                    this.Antipasto_5.removeAllChildren();
                    this.Antipasto_0.removeAllChildren();
                    this.Antipasto_1.removeAllChildren();
                    this.Resurgence.active = false;
                    this.bomb("Base5", this.BasePanel);
                    this.bomb("Base0", this.BasePanel);
                    this.bomb("Base1", this.BasePanel);
                }
                this.GuessYouLikeNode.active = false;
            }
        });

        // const type = RewardType.Resurgence;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         if (this.ClickButtonCd() == false) {
        //             return;
        //         }
        //         Wx.Instance.OnEvent("经典模式", "功能", "点击立即复活视频分享成功");
        //         if (this.random > 0 && this.random < 1 / 6) {
        //             this.BaseList0 = [];
        //             this.BaseList1 = [];
        //             this.BaseList2 = [];
        //             this.cost0 = 0;
        //             this.cost1 = 0;
        //             this.cost2 = 0;
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        //             this.Antipasto_0.removeAllChildren();
        //             this.Antipasto_1.removeAllChildren();
        //             this.Antipasto_2.removeAllChildren();
        //             this.Resurgence.active = false;
        //             this.bomb("Base0", this.BasePanel);
        //             this.bomb("Base1", this.BasePanel);
        //             this.bomb("Base2", this.BasePanel);
        //         } else if (this.random > 1 / 6 && this.random < (1 / 6) * 2) {
        //             this.BaseList1 = [];
        //             this.BaseList2 = [];
        //             this.BaseList3 = [];
        //             this.cost1 = 0;
        //             this.cost2 = 0;
        //             this.cost3 = 0;
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        //             this.Antipasto_1.removeAllChildren();
        //             this.Antipasto_2.removeAllChildren();
        //             this.Antipasto_3.removeAllChildren();
        //             this.Resurgence.active = false;
        //             this.bomb("Base1", this.BasePanel);
        //             this.bomb("Base2", this.BasePanel);
        //             this.bomb("Base3", this.BasePanel);
        //         } else if (this.random > (1 / 6) * 2 && this.random < (1 / 6) * 3) {
        //             this.BaseList2 = [];
        //             this.BaseList3 = [];
        //             this.BaseList4 = [];
        //             this.cost2 = 0;
        //             this.cost3 = 0;
        //             this.cost4 = 0;
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        //             this.Antipasto_2.removeAllChildren();
        //             this.Antipasto_3.removeAllChildren();
        //             this.Antipasto_4.removeAllChildren();
        //             this.Resurgence.active = false;
        //             this.bomb("Base2", this.BasePanel);
        //             this.bomb("Base3", this.BasePanel);
        //             this.bomb("Base4", this.BasePanel);
        //         } else if (this.random > (1 / 6) * 3 && this.random < (1 / 6) * 4) {
        //             this.BaseList3 = [];
        //             this.BaseList4 = [];
        //             this.BaseList5 = [];
        //             this.cost3 = 0;
        //             this.cost4 = 0;
        //             this.cost5 = 0;
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        //             this.Antipasto_3.removeAllChildren();
        //             this.Antipasto_4.removeAllChildren();
        //             this.Antipasto_5.removeAllChildren();
        //             this.Resurgence.active = false;
        //             this.bomb("Base3", this.BasePanel);
        //             this.bomb("Base4", this.BasePanel);
        //             this.bomb("Base5", this.BasePanel);
        //         } else if (this.random > (1 / 6) * 4 && this.random < (1 / 6) * 5) {
        //             this.BaseList4 = [];
        //             this.BaseList5 = [];
        //             this.BaseList0 = [];
        //             this.cost4 = 0;
        //             this.cost5 = 0;
        //             this.cost0 = 0;
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        //             this.Antipasto_4.removeAllChildren();
        //             this.Antipasto_5.removeAllChildren();
        //             this.Antipasto_0.removeAllChildren();
        //             this.Resurgence.active = false;
        //             this.bomb("Base4", this.BasePanel);
        //             this.bomb("Base5", this.BasePanel);
        //             this.bomb("Base0", this.BasePanel);
        //         } else {
        //             this.BaseList5 = [];
        //             this.BaseList0 = [];
        //             this.BaseList1 = [];
        //             this.cost5 = 0;
        //             this.cost0 = 0;
        //             this.cost1 = 0;
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        //             Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        //             this.Antipasto_5.removeAllChildren();
        //             this.Antipasto_0.removeAllChildren();
        //             this.Antipasto_1.removeAllChildren();
        //             this.Resurgence.active = false;
        //             this.bomb("Base5", this.BasePanel);
        //             this.bomb("Base0", this.BasePanel);
        //             this.bomb("Base1", this.BasePanel);
        //         }
        //         this.GuessYouLikeNode.active = false;
        //         // this.GuessYouLikeNode.setPosition(0, -394);
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("resurgenceBtn。。。fail");
        //     }
        // );

    }
    /**
     * 取消复活
     */
    black() {
        Wx.Instance.OnEvent("经典模式", "功能", "点击取消复活");
        Wx.Instance.OnEvent("经典模式", "功能", "弹出结算界面");

        Method.OpenViewNum++;
        let circle = cc.find("Circle", this.Revive).stopAction(this.seq);
        this.Revive.active = false;
        this.Over.active = true;
        this.OverScore.string = this.SumScore.toString();
        if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
            Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
            this.TopScoreNode.string = this.SumScore.toString();
        }
    }
    /**
     * 重新开始
     */
    again() {
        this.isdie = false;
        cc.find("ADNode", this.node).active = false;

        Wx.Instance.OnEvent("经典模式", "功能", "点击重新开始");
        this.randomCost0 = 0;
        this.randomCost1 = 0;
        this.randomCost2 = 0;
        this.randomCost3 = 0;
        this.randomCost4 = 0;
        this.randomCost5 = 0;
        this.randomCost6 = 0;
        this.BaseList0 = [];
        this.BaseList1 = [];
        this.BaseList2 = [];
        this.BaseList3 = [];
        this.BaseList4 = [];
        this.BaseList5 = [];
        this.cost0 = 0;
        this.cost1 = 0;
        this.cost2 = 0;
        this.cost3 = 0;
        this.cost4 = 0;
        this.cost5 = 0;

        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        Wx.Instance.localStorageSetInt(Config.ContinueTheGame.FruitsIndex, this.FruitsIndex = this.random);
        Wx.Instance.localStorageSetInt(Config.ContinueTheGame.PreviewIndex, this.Preview = this.random);
        Wx.Instance.localStorageSetInt(Config.ContinueTheGame.CurScore, 0);
        console.log(this.BaseList0,
            this.BaseList1,
            this.BaseList2,
            this.BaseList3,
            this.BaseList4,
            this.BaseList5);

        this.Antipasto_0.removeAllChildren();
        this.Antipasto_1.removeAllChildren();
        this.Antipasto_2.removeAllChildren();
        this.Antipasto_3.removeAllChildren();
        this.Antipasto_4.removeAllChildren();
        this.Antipasto_5.removeAllChildren();
        this.StartBase_Antipasto.removeAllChildren();
        this.obj = null;
        this.Preview = this.randomNum();
        this.SaveGamePreviewIndex();
        this.SumScore = 0;
        this.Score.string = this.SumScore.toString();
        this.Hammer.active = false;
        this.HammerButton.active = true;
        this.UniversalBlockNode.active = false;
        this.Resurgence.active = false;
        this.game.active = true;
        this.Setting.active = false;
        this.create();
        this.GuessYouLikeNode.active = false;
        // this.GuessYouLikeNode.setPosition(0, -394);

    }
    /**
     * 返回首页
     */
    home() {
        Wx.Instance.ShowInterstitial();
        Wx.Instance.OnEvent("经典模式", "功能", "点击返回主页");
        Wx.Instance.OnEvent("经典模式", "功能", "返回");
        Method.OpenViewNum++;
        cc.find("ADNode", this.node).active = true;
        this.Resurgence.active = false;
        this.game.active = false;
        this.Setting.active = false;
        this.UniversalBlockNode.active = false;
        this.Title.active = false;
        this.EndlessTheme.active = true;
        // this.DrawerButton.active = true;
        this.randomIcon_Node.active = true;
        this.MatchedTheme.active = true;
        this.LevelTheme.active = true;
        // this.SignIcon.active = true;
        this.turntableIcon.active = RemoteControl.Instance.BonusData.switch;
        this.RedpackteIcon.active = RemoteControl.Instance.BonusData.switch;
        // this.TaskBtnIcon.active = RemoteControl.Instance.switchData.ad;
        this.FieldGuideNode.active = true;
        this.moreGame.active = true;
        this.FreeDiamondIcon.active = true;
        this.GuessYouLikeNode.active = true;
        this.startNode.active = true;
        // Wx.Instance.showGameClub();
        cc.find("ADIcon", this.AD).active = true;

        this.mask.opacity = 0;
        this.mask.active = true;

        this.randomFruits(0);

        this.StrarIcon.active = false;

        // this.logo.stopAllActions();
        // this.EndlessTheme.stopAllActions();
        // this.DrawerButton.stopAllActions();
        this.randomIcon_Node.stopAllActions();
        this.MatchedTheme.stopAllActions();
        this.LevelTheme.stopAllActions();
        // this.SignIcon.stopAllActions();
        this.turntableIcon.stopAllActions();
        // this.TaskBtnIcon.stopAllActions();
        this.FieldGuideNode.stopAllActions();
        this.moreGame.stopAllActions();
        this.FreeDiamondIcon.stopAllActions();
        this.RedpackteIcon.stopAllActions();
        this.GuessYouLikeNode.stopAllActions();

        // this.logo.opacity = 255;
        // this.logo.setScale(0.8);
        // this.EndlessTheme.opacity = 255;
        // this.EndlessTheme.setScale(0.8);

        this.randomIcon_Node.rotation = 0;
        this.randomIcon_Node.setPosition(-200, 220);
        // this.DrawerButton.setPosition(240, 222);
        this.GuessYouLikeNode.setPosition(0, -180);

        // this.logo.active = false;
        // setTimeout(() => {
        //     this.logo.getComponent(cc.Animation).play("StartTitle");
        // }, 1000);

        // this.EndlessTheme.parent.getComponent(cc.Animation).play();
        // this.EndlessTheme.runAction(cc.repeatForever(cc.sequence(
        //     cc.delayTime(2),
        //     cc.scaleTo(1, 0.8, 0.8),
        //     cc.scaleTo(0.1, 0.9, 0.9),
        //     cc.scaleTo(0.1, 1, 0.87),
        //     cc.scaleTo(0.1, 0.8, 0.87),
        //     cc.scaleTo(0.1, 0.9, 0.87),
        //     cc.scaleTo(0.1, 0.84, 1),
        //     cc.scaleTo(0.1, 0.8, 0.8),
        // )))

        // this.EndlessTheme.runAction(cc.sequence(
        //     cc.fadeTo(0, 255),
        //     cc.fadeTo(0.5, 130),
        //     cc.fadeTo(0.2, 0),
        // ))
        // this.EndlessTheme.runAction(cc.sequence(
        //     cc.scaleTo(0.3, 0.8, 0.8),
        //     cc.scaleTo(0.1, 0.9, 0.9),
        //     cc.scaleTo(0.1, 1, 0.87),
        //     cc.scaleTo(0.1, 0.8, 0.87),
        //     cc.scaleTo(0.1, 0.9, 0.87),
        //     cc.scaleTo(0.1, 0.84, 1),
        //     cc.scaleTo(0.1, 0.8, 0.8),
        //     cc.callFunc(()=>{
        //         console.log(this.EndlessTheme);
        //     })
        // ))
        // this.EndlessTheme.runAction(cc.repeatForever(cc.sequence(
        //     cc.delayTime(2),
        //     cc.scaleTo(0.3, 0.8, 0.8),
        //     cc.scaleTo(0.1, 0.9, 0.9),
        //     cc.scaleTo(0.1, 1, 0.87),
        //     cc.scaleTo(0.1, 0.8, 0.87),
        //     cc.scaleTo(0.1, 0.9, 0.87),
        //     cc.scaleTo(0.1, 0.84, 1),
        //     cc.scaleTo(0.1, 0.8, 0.8),
        // )))


        // this.DrawerButton.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.4, 1),
        //     cc.scaleTo(0.1, 0.9),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 1),
        // ))
        // this.DrawerButton.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.2, 200),
        //     cc.fadeTo(0.1, 255),
        //     cc.delayTime(2),
        //     cc.callFunc(() => {
        //         var anim = this.DrawerButton.getComponent(cc.Animation);
        //         anim.play();
        //     })
        // ))

        this.randomIcon_Node.runAction(cc.sequence(
            cc.fadeTo(0.1, 0),
            cc.delayTime(0.9),
            cc.fadeTo(0.3, 255),
        ))
        this.randomIcon_Node.runAction(cc.sequence(
            cc.delayTime(0.9),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.2, 1.4, 1),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.2, 1.2, 0.9),
            cc.scaleTo(0.1, 1),
        ))
        this.randomIcon_Node.runAction(cc.repeatForever(cc.sequence(
            cc.delayTime(3),
            cc.rotateTo(0.2, 15),
            cc.rotateTo(0.2, -15),
            cc.rotateTo(0.1, 15),
            cc.rotateTo(0.1, 0),
        )))

        this.MatchedTheme.runAction(cc.sequence(
            cc.fadeTo(0.1, 0),
            cc.delayTime(0.7),
            cc.fadeTo(0.3, 255),
        ))
        this.MatchedTheme.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(0.7),
            cc.scaleTo(0.3, 0.8),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.05, 0.98, 0.87),
            cc.scaleTo(0.05, 0.8, 0.87),
            cc.scaleTo(0.05, 0.86, 0.87),
            cc.scaleTo(0.05, 0.84, 0.9),
            cc.scaleTo(0.1, 0.8, 0.8),
        ))

        this.LevelTheme.runAction(cc.sequence(
            cc.fadeTo(0.1, 0),
            cc.delayTime(1),
            cc.fadeTo(0.3, 255),
        ))
        this.LevelTheme.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1),
            cc.scaleTo(0.3, 0.8),
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.05, 0.98, 0.87),
            cc.scaleTo(0.05, 0.8, 0.87),
            cc.scaleTo(0.05, 0.86, 0.87),
            cc.scaleTo(0.05, 0.84, 0.9),
            cc.scaleTo(0.1, 0.8, 0.8),
        ))

        // this.SignIcon.runAction(cc.sequence(
        //     cc.fadeTo(0.1, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.3, 255),
        // ))
        // this.SignIcon.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.7),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.7),
        // ))

        this.turntableIcon.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(0.9),
            cc.fadeTo(0.4, 255),
        ))
        this.turntableIcon.runAction(cc.sequence(
            cc.delayTime(0.9),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.2, 1.1, 1),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.2, 1.2, 0.9),
            cc.scaleTo(0.1, 0.8),
        ))

        // this.TaskBtnIcon.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.delayTime(0.9),
        //     cc.fadeTo(0.4, 255),
        // ))
        // this.TaskBtnIcon.runAction(cc.sequence(
        //     cc.delayTime(0.9),
        //     cc.scaleTo(0.1, 0.6),
        //     cc.scaleTo(0.2, 1.1, 1),
        //     cc.scaleTo(0.1, 0.6),
        //     cc.scaleTo(0.2, 1.2, 0.9),
        //     cc.scaleTo(0.1, 0.6),
        // ))
        this.FieldGuideNode.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.delayTime(0.9),
            cc.fadeTo(0.4, 255),
        ))
        this.FieldGuideNode.runAction(cc.sequence(
            cc.delayTime(0.9),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.2, 1.1, 1),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.2, 1.2, 0.9),
            cc.scaleTo(0.1, 0.7),
        ))

        this.moreGame.runAction(cc.sequence(
            cc.fadeTo(0.1, 0),
            cc.delayTime(0.9),
            cc.fadeTo(0.3, 255),
        ))
        this.moreGame.runAction(cc.sequence(
            cc.delayTime(0.9),
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.2, 1.3, 1),
            cc.scaleTo(0.1, 1.2),
            cc.scaleTo(0.2, 1.4, 0.9),
            cc.scaleTo(0.1, 1.2),
        ))

        this.FreeDiamondIcon.runAction(cc.sequence(
            cc.fadeTo(0.1, 0),
            cc.delayTime(0.9),
            cc.fadeTo(0.3, 255),
        ))
        this.FreeDiamondIcon.runAction(cc.sequence(
            cc.delayTime(0.9),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.2, 1.1, 1),
            cc.scaleTo(0.1, 0.7),
            cc.scaleTo(0.2, 1.2, 0.9),
            cc.scaleTo(0.1, 0.7),
        ))

        this.RedpackteIcon.runAction(cc.sequence(
            cc.fadeTo(0.1, 0),
            cc.delayTime(0.9),
            cc.fadeTo(0.3, 255),
        ))
        this.RedpackteIcon.runAction(cc.sequence(
            cc.delayTime(0.9),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.2, 1.1, 1),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.2, 1.2, 0.9),
            cc.scaleTo(0.1, 0.8),
        ))

        this.GuessYouLikeNode.setPosition(0, -180);
        this.GuessYouLikeNode.runAction(cc.sequence(
            cc.fadeTo(0.1, 0),
            cc.delayTime(1.3),
            cc.fadeTo(0.3, 255),
        ))
        this.GuessYouLikeNode.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.delayTime(1),
            cc.scaleTo(0.3, 0.7),
            cc.scaleTo(0.1, 0.8),
            cc.scaleTo(0.05, 0.88, 0.77),
            cc.scaleTo(0.05, 0.7, 0.77),
            cc.scaleTo(0.05, 0.76, 0.77),
            cc.scaleTo(0.05, 0.74, 0.8),
            cc.scaleTo(0.1, 0.7, 0.7),
            cc.callFunc(() => {
                this.mask.active = false;
                this.mask.opacity = 255;

                if (this.isdie == true) {
                    this.randomCost0 = 0;
                    this.randomCost1 = 0;
                    this.randomCost2 = 0;
                    this.randomCost3 = 0;
                    this.randomCost4 = 0;
                    this.randomCost5 = 0;
                    this.randomCost6 = 0;
                    this.BaseList0 = [];
                    this.BaseList1 = [];
                    this.BaseList2 = [];
                    this.BaseList3 = [];
                    this.BaseList4 = [];
                    this.BaseList5 = [];
                    this.cost0 = 0;
                    this.cost1 = 0;
                    this.cost2 = 0;
                    this.cost3 = 0;
                    this.cost4 = 0;
                    this.cost5 = 0;
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
                    Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
                    Wx.Instance.localStorageSetInt(Config.ContinueTheGame.FruitsIndex, this.FruitsIndex = this.random);
                    Wx.Instance.localStorageSetInt(Config.ContinueTheGame.PreviewIndex, this.Preview = this.random);
                    Wx.Instance.localStorageSetInt(Config.ContinueTheGame.CurScore, 0);
                    console.log(this.BaseList0,
                        this.BaseList1,
                        this.BaseList2,
                        this.BaseList3,
                        this.BaseList4,
                        this.BaseList5);

                    this.Antipasto_0.removeAllChildren();
                    this.Antipasto_1.removeAllChildren();
                    this.Antipasto_2.removeAllChildren();
                    this.Antipasto_3.removeAllChildren();
                    this.Antipasto_4.removeAllChildren();
                    this.Antipasto_5.removeAllChildren();
                    this.StartBase_Antipasto.removeAllChildren();
                    this.obj = null;
                    this.isdie = false;
                    console.log("已死亡")
                } else {
                    this.Antipasto_0.removeAllChildren();
                    this.Antipasto_1.removeAllChildren();
                    this.Antipasto_2.removeAllChildren();
                    this.Antipasto_3.removeAllChildren();
                    this.Antipasto_4.removeAllChildren();
                    this.Antipasto_5.removeAllChildren();
                    this.StartBase_Antipasto.removeAllChildren();
                    this.obj = null;
                    console.log("未死亡")
                }
                // this.Preview = this.randomNum();
                this.SaveGamePreviewIndex();
                // this.SumScore = 0;
                this.Score.string = this.SumScore.toString();
                // this.startNode.active = true;
            })
        ))


    }
    /**
     * 设置
     */
    setBtn() {
        Wx.Instance.OnEvent("经典模式", "功能", "点击暂停");
        Method.OpenViewNum++;
        this.Setting.active = true;
        this.StartIcon.active = false;
        cc.find("ADNode", this.node).active = true;
        this.GuessYouLikeNode.active = true;
        this.GuessYouLikeNode.setPosition(0, -180);
    }
    /**
     * 继续游戏
     */
    continue() {
        Wx.Instance.OnEvent("经典模式", "功能", "点击继续游戏");
        this.Setting.active = false;
        this.GuessYouLikeNode.active = false;
        cc.find("ADNode", this.node).active = false;
        // this.GuessYouLikeNode.setPosition(0, -380);
    }

    TipsFun() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        if (this.Tipswhether == false) {
            this.Tips.stopAllActions();
            this.Tips.getComponent(cc.Animation).play("Tips2")
            this.Tipswhether = true;
        } else {
            this.Tips.stopAllActions();
            this.Tips.getComponent(cc.Animation).play("Tips1")
            this.Tipswhether = false;
        }
    }

    /**
     * 签到按钮
     */
    Signbutton() {
        Wx.Instance.OnEvent("首页", "功能", "点击签到");
        Method.OpenViewNum++;
        SignIn.Instance.check();
        // this.mask.active = true;
        this.SignView.opacity = 0;
        this.SignView.active = true;
        this.SignView.runAction(cc.sequence(
            cc.fadeTo(0, 0),
            cc.fadeTo(0.3, 255),
        ))
        this.SignView.runAction(cc.sequence(
            cc.scaleTo(0, 0),
            cc.scaleTo(0.3, 0.8),
            cc.scaleTo(0.1, 0.7),
        ))
        let button = cc.find("Award/lingqu", this.SignView);
        button.active = false;
        setTimeout(() => {
            button.active = true;
        }, 2000);
    }


    /**
     * 按钮CD
     */
    ClickButtonCd(): boolean {
        let currentTime = Date.now();
        if (currentTime - this.clickTime < 350) {
            // console.log("in click button cd ");
            return false;
        }
        this.clickTime = currentTime;
        return true;
    }

    GuessYouLikeMore(AppId: string, IconIndex: cc.Node) {
        if (window.wx != undefined) {
            wx.navigateToMiniProgram({
                appId: AppId,
                success: () => {
                    console.log('跳转成功');
                    // this.GuessYouLikeIcon1AD = this.ADIcon(IconIndex);
                },
                fail: () => {
                    console.log('跳转失败');
                }
            })
        }
    }
    showDrawer() {
        Method.OpenViewNum++;
        if (this.startNode.active == true) {
            // Wx.Instance.hideGameClub();
        }
        this.Drawer.active = true;
        this.Drawer.setPosition(550, 0);
        this.Drawer.runAction(cc.sequence(
            cc.moveTo(0.3, -40, 0),
            cc.moveTo(0.2, 20, 0),
            cc.moveTo(0.1, 0, 0),
        ))
    }
    hideDrawer() {
        this.Drawer.runAction(cc.sequence(
            cc.moveTo(0.1, -80, 0),
            cc.moveTo(0.5, 550, 0),
            cc.callFunc(() => {
                if (this.startNode.active == true) {
                    // Wx.Instance.showGameClub();
                }
                this.Drawer.active = false;
            })
        ))

    }

    flaunt() {
        if (window.wx == null) {
            GameData.Instance.AddGameMoney(30);
            Wx.Instance.ShowToast(`恭喜你获得了30金币！`);
            this.again();
        } else {
            Wx.Instance.share(() => {
                setTimeout(() => {
                    GameData.Instance.AddGameMoney(30);
                    Wx.Instance.ShowToast(`恭喜你获得了30金币！`);
                    this.again();
                }, 2000);
            });
        }
    }

    //---------------------------------------广告物料------------------------------------------------//

    //--------------------------首页固定Icon--------------------------//
    // Icon1() {
    //     Wx.Instance.More(ADData.instance.AdData[6].appId);
    // }
    // Icon2() {
    //     Wx.Instance.More(ADData.instance.AdData[7].appId);
    // }
    // Icon3() {
    //     Wx.Instance.More(ADData.instance.AdData[8].appId);
    // }
    // Icon4() {
    //     Wx.Instance.More(ADData.instance.AdData[9].appId);
    // }
    // Icon5() {
    //     Wx.Instance.More(ADData.instance.AdData[10].appId);
    // }
    // Icon6() {
    //     Wx.Instance.More(ADData.instance.AdData[11].appId);
    // }
    RandomItems: ADItem = null;
    /**
     * 轮播icon
     */
    RandomIcon() {
        this.RandomItems = new ADItem(cc.find('randomIcon', this.AD))
        this.RandomItems.AddDalegate();
        this.RandomItems.UpdateRandom("game");

        // if (this.randomIndex == 14) {
        //     this.randomIndex = 0;
        // }
        // this.randomIndex += 1;
        // if (this.randomIndex == 1) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("1");
        //     this.randomIconAD = ADData.instance.AdData[0].appId;
        // }
        // if (this.randomIndex == 2) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("2");
        //     this.randomIconAD = ADData.instance.AdData[1].appId;
        // }
        // else if (this.randomIndex == 3) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("3");
        //     this.randomIconAD = ADData.instance.AdData[2].appId;
        // }
        // else if (this.randomIndex == 4) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("4");
        //     this.randomIconAD = ADData.instance.AdData[3].appId;
        // }
        // else if (this.randomIndex == 5) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("5");
        //     this.randomIconAD = ADData.instance.AdData[4].appId;
        // }
        // else if (this.randomIndex == 6) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("6");
        //     this.randomIconAD = ADData.instance.AdData[5].appId;
        // }
        // else if (this.randomIndex == 7) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("7");
        //     this.randomIconAD = ADData.instance.AdData[6].appId;
        // }
        // else if (this.randomIndex == 8) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("8");
        //     this.randomIconAD = ADData.instance.AdData[7].appId;;
        // }
        // else if (this.randomIndex == 9) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("9");
        //     this.randomIconAD = ADData.instance.AdData[8].appId;
        // }
        // else if (this.randomIndex == 10) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("10");
        //     this.randomIconAD = ADData.instance.AdData[9].appId;
        // }
        // else if (this.randomIndex == 11) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("11");
        //     this.randomIconAD = "QRcode"
        // }
        // else if (this.randomIndex == 12) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("12");
        //     this.randomIconAD = "QRcode"
        // }
        // else if (this.randomIndex == 13) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("13");
        //     this.randomIconAD = "QRcode"
        // }
        // else if (this.randomIndex == 14) {
        //     this.randomIcon.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("14");
        //     this.randomIconAD = "QRcode"
        // }
        // this.schedule(this.RandomIcon, 3);
    }
    ADiconItems: ADItem;
    ADicon() {
        for (let i = 0; i < 6; i++) {
            this.ADiconItems = new ADItem(cc.find('ADIcon/Icon' + i, this.AD))
            this.ADiconItems.AddDalegate();
            this.ADiconItems.UpdateIcon(ADData.instance.NewAdData.play_game_ad[i]);
        }
    }
    RandomIconbutton() {
        Wx.Instance.OnEvent("首页", "广告", "点击轮播icon");

        if (this.randomIconAD == "QRcode") {
            if (this.randomIndex == 11) {
                this.ShowQRcode(1);
                // console.log("2")
                // this.QRcode.active = true;
                // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("4")
                // Wx.Instance.hideBanner();
            }
            if (this.randomIndex == 12) {
                this.ShowQRcode(2);
                // console.log("2")
                // this.QRcode.active = true;
                // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("3")
                // Wx.Instance.hideBanner();
            }
            if (this.randomIndex == 13) {
                this.ShowQRcode(3);
                // console.log("2")
                // this.QRcode.active = true;
                // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("2")
                // Wx.Instance.hideBanner();
            }
            if (this.randomIndex == 14) {
                this.ShowQRcode(4);
                // console.log("2")
                // this.QRcode.active = true;
                // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("2")
                // Wx.Instance.hideBanner();
            }
        } else {
            Wx.Instance.More(this.randomIconAD);
        }
    }
    //--------------------------首页固定Icon--------------------------//

    //---------------------------猜你喜欢------------------------------------//
    YouLikeItems: ADItem[] = [];
    GuessYouLikeInit() {
        for (let i = 0; i < 5; i++) {
            this.YouLikeItems.push(new ADItem(cc.find('Icon' + i, this.GuessYouLikeNode)))
        }
        console.log("YouLikeItems.length: ", this.YouLikeItems.length);
        this.YouLikeAddDelegate();
        this.SetUlike();

        // let i = 5;
        // let a = 5;
        // for (let index = 1; index < 6; index++) {
        //     cc.find("Text/name" + index, this.GuessYouLikeNode).getComponent(cc.Label).string = ADData.instance.AdData[i++].appName;
        //     cc.find("Mask" + index + "/" + index, this.GuessYouLikeNode).getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame(ADData.instance.AdData[a++].appIcon);
        // }
        // cc.find("Text/name2", this.GuessYouLikeNode).getComponent(cc.Label).string = "十点消你";
        // cc.find("Text/name3", this.GuessYouLikeNode).getComponent(cc.Label).string = "疯狂的球球2";
        // cc.find("Text/name4", this.GuessYouLikeNode).getComponent(cc.Label).string = "疯狂的球球正版";
        // cc.find("Text/name5", this.GuessYouLikeNode).getComponent(cc.Label).string = "丛林大乱斗";
    }
    YouLikeAddDelegate() {
        for (let i = 0; i < this.YouLikeItems.length; i++) {
            this.YouLikeItems[i].AddDalegate();
        }
    }
    SetUlike() {
        for (let i = 0; i < this.YouLikeItems.length; i++) {
            this.YouLikeItems[i].UpdateIcon(ADData.instance.NewAdData.guess_like[i]);
        }
        // cc.find("Text/name" + index, this.GuessYouLikeNode).getComponent(cc.Label).string = ADData.instance.AdData[ADindex].appName;
        // cc.find("Mask" + index + "/" + index, this.GuessYouLikeNode).getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame(ADData.instance.AdData[ADindex].appIcon);
    }
    GuessYouLike1() {
        Wx.Instance.OnEvent("首页", "功能", "点击猜你喜欢");
        Wx.Instance.More(this.GuessYouLikeIcon1AD);
    }
    GuessYouLike2() {
        Wx.Instance.OnEvent("首页", "功能", "点击猜你喜欢");
        Wx.Instance.More(this.GuessYouLikeIcon2AD);
    }
    GuessYouLike3() {
        Wx.Instance.OnEvent("首页", "功能", "点击猜你喜欢");
        Wx.Instance.More(this.GuessYouLikeIcon3AD);
    }
    GuessYouLike4() {
        Wx.Instance.OnEvent("首页", "功能", "点击猜你喜欢");
        Wx.Instance.More(this.GuessYouLikeIcon4AD);
    }
    GuessYouLike5() {
        Wx.Instance.OnEvent("首页", "功能", "点击猜你喜欢");
        Wx.Instance.More(this.GuessYouLikeIcon5AD);
    }
    // ADIcon(GameObj: cc.Node): string {
    //     let AD: string = null;
    //     let index = 0;
    //     let random = this.value;
    //     if (random > 0.8) {
    //         index = 1;
    //     } else if (random > 0.6) {
    //         index = 2;
    //     } else if (random > 0.4) {
    //         index = 3;
    //     } else if (random > 0.2) {
    //         index = 4;
    //     } else if (random > 0) {
    //         index = 5;
    //     }
    //     switch (index) {
    //         case 1:
    //             //
    //             GameObj.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("4");
    //             cc.find("name", GameObj).getComponent(cc.Label).string = "天天爱挖宝";
    //             GameObj.setContentSize(126, 126);
    //             AD = "wxcd8255e82c0ba6a4";
    //             break;
    //         case 2:
    //             GameObj.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("5");
    //             cc.find("name", GameObj).getComponent(cc.Label).string = "荣耀矿工";
    //             GameObj.setContentSize(126, 126);
    //             AD = "wxb3525c610633aa8b";
    //             break;
    //         case 3:
    //             GameObj.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("3");
    //             cc.find("name", GameObj).getComponent(cc.Label).string = "数字连线王者";
    //             GameObj.setContentSize(126, 126);
    //             AD = "wxe50b4b3637774d2a";
    //             break;
    //         case 4:
    //             GameObj.getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("12");
    //             cc.find("name", GameObj).getComponent(cc.Label).string = "我爱解谜";
    //             GameObj.setContentSize(126, 126);
    //             AD = "wxffd19aad9b0d43e1";
    //             break;
    //         default:
    //             break;
    //     }
    //     return AD;
    // }
    //---------------------------猜你喜欢------------------------------------//

    //--------------------------------抽屉----------------------------------//
    TableItems: ADItem[] = [];
    DrawerInit() {
        for (let i = 0; i < 12; i++) {
            this.TableItems.push(new ADItem(cc.find('Layout/Icon' + i, this.Drawer)));
        }
        console.log("TableItems.length: ", this.TableItems.length)
        this.DrawerAddDelegate();
        this.DrawerUpdate();

        // for (let index = 0; index < 12; index++) {
        //     cc.find("Layout/" + index, this.Drawer).getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame(index.toString());
        //     cc.find("Layout/" + index + "/Name", this.Drawer).getComponent(cc.Label).string = ADData.instance.AdData[index - 1].appName;
        // }
        // cc.find("Layout/" + 11, this.Drawer).getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("13");
        // cc.find("Layout/" + 11 + "/Name", this.Drawer).getComponent(cc.Label).string = ADData.instance.AdData[12].appName;
        // cc.find("Layout/" + 12, this.Drawer).getComponent(cc.Sprite).spriteFrame = Method.ADIconAtlas.getSpriteFrame("14");
        // cc.find("Layout/" + 12 + "/Name", this.Drawer).getComponent(cc.Label).string = ADData.instance.AdData[13].appName;
    }
    DrawerAddDelegate() {
        for (let i = 0; i < this.TableItems.length; i++) {
            this.TableItems[i].AddDalegate();
        }
    }
    DrawerUpdate() {
        for (let i = 0; i < this.TableItems.length; i++) {
            this.TableItems[i].UpdateIcon(ADData.instance.NewAdData.drawer[i]);
        }
    }
    Drawericon1() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[0].appId);
    }
    Drawericon2() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[1].appId);
    }
    Drawericon3() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[2].appId);
    }
    Drawericon4() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[3].appId);
    }
    Drawericon5() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[4].appId);
    }
    Drawericon6() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[5].appId);
    }
    Drawericon7() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[6].appId);
    }
    Drawericon8() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[7].appId);
        // Wx.Instance.More("wxf6d1b732f6f5d44c")
    }
    Drawericon9() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        Wx.Instance.More(ADData.instance.AdData[8].appId);
        // Wx.Instance.More("wx52966cd958bcd65b")
    }
    Drawericon10() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        // this.ShowQRcode(4);
        Wx.Instance.More(ADData.instance.AdData[9].appId);
    }
    Drawericon11() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        this.ShowQRcode(1);
    }
    Drawericon12() {
        Wx.Instance.OnEvent("首页", "广告", "点击抽屉icon");
        this.ShowQRcode(4);
    }
    //--------------------------------抽屉----------------------------------//

    //----------------------------------更多游戏----------------------------------//
    MoreGameItems: BannerItem[] = [];
    MoreGameInit() {
        for (let i = 0; i < 4; i++) {
            this.MoreGameItems.push(new BannerItem(cc.find("ItemList/Banner" + i, this.moreGameView)));
        }
        console.log("MoreGameItems.length: ", this.MoreGameItems.length);
        this.ShowQRcodeBanner();
    }
    ShowQRcodeBanner() {
        for (let i = 0; i < this.MoreGameItems.length; i++) {
            this.MoreGameItems[i].UpdateItem(i)
        }

        // let urls1 = ADData.instance.bannerData[0].appIcon;
        // let urls2 = ADData.instance.bannerData[1].appIcon;
        // let urls3 = ADData.instance.bannerData[2].appIcon;
        // let urls4 = ADData.instance.bannerData[3].appIcon;
        // cc.loader.load(urls1, (err, res) => {
        //     if (err) {
        //         Utility.log("urls1...", err);
        //         return;
        //     }
        //     let sprite = new cc.SpriteFrame(res);
        //     this.QRCODE1.getComponent(cc.Sprite).spriteFrame = sprite;

        //     Utility.log("head loaded... urls1 = " + urls1);
        // });
        // cc.loader.load(urls2, (err, res) => {
        //     if (err) {
        //         Utility.log("urls2...", err);
        //         return;
        //     }

        //     let sprite = new cc.SpriteFrame(res);
        //     this.QRCODE2.getComponent(cc.Sprite).spriteFrame = sprite;

        //     Utility.log("head loaded... urls2 = " + urls2);
        // });
        // cc.loader.load(urls3, (err, res) => {
        //     if (err) {
        //         Utility.log("urls3...", err);
        //         return;
        //     }

        //     let sprite = new cc.SpriteFrame(res);
        //     this.QRCODE3.getComponent(cc.Sprite).spriteFrame = sprite;

        //     Utility.log("head loaded... urls3 = " + urls3);
        // });
        // cc.loader.load(urls4, (err, res) => {
        //     if (err) {
        //         Utility.log("urls4...", err);
        //         return;
        //     }

        //     let sprite = new cc.SpriteFrame(res);
        //     this.QRCODE4.getComponent(cc.Sprite).spriteFrame = sprite;

        //     Utility.log("head loaded... urls4 = " + urls4);
        // });
    }

    MoreGameAddDelegate() {
        for (let i = 0; i < 4; i++) {
            this.MoreGameItems[i].AddDelegate();
        }
    }

    ShowMoreGame() {
        if (RemoteControl.Instance.switchData.ad) {
            Wx.Instance.OnEvent("首页", "广告", "点击更多游戏");
            // Wx.Instance.hideGameClub();
            this.boxpanel = cc.instantiate(this.BoxPanel);
            this.boxpanel.parent = this.PanelView;
        }
        // this.moreGameView.active = true;
        // this.moreGameView.runAction(cc.sequence(
        //     cc.fadeTo(0, 0),
        //     cc.fadeTo(0.3, 255),
        // ))
        // this.moreGameView.runAction(cc.sequence(
        //     cc.scaleTo(0, 0),
        //     cc.scaleTo(0.3, 1.1),
        //     cc.scaleTo(0.1, 1),
        // ))
    }
    HideMoreGame() {
        this.moreGameView.runAction(cc.sequence(
            cc.fadeTo(0, 255),
            cc.fadeTo(0.3, 0),
        ))
        this.moreGameView.runAction(cc.sequence(
            cc.scaleTo(0, 1),
            cc.scaleTo(0.3, 0),
            cc.callFunc(() => {
                this.moreGameView.active = false;
                // Wx.Instance.showGameClub();
            })
        ))
    }
    banner1() {
        Wx.Instance.OnEvent("首页", "广告", "点击二维码Banner");
        this.ShowQRcode(1);
        // this.QRcode.active = true;
        // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("1")
        // Wx.Instance.hideBanner();
    }
    banner2() {
        Wx.Instance.OnEvent("首页", "广告", "点击二维码Banner");
        this.ShowQRcode(2);
        // this.QRcode.active = true;
        // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("2")
        // Wx.Instance.hideBanner();
    }
    banner3() {
        Wx.Instance.OnEvent("首页", "广告", "点击二维码Banner");
        this.ShowQRcode(3);
        // this.QRcode.active = true;
        // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("3")
        // Wx.Instance.hideBanner();
    }
    banner4() {
        Wx.Instance.OnEvent("首页", "广告", "点击二维码Banner");
        this.ShowQRcode(4);
        // this.QRcode.active = true;
        // cc.find("photo", this.QRcode).getComponent(cc.Sprite).spriteFrame = Method.QRcodeAtlas.getSpriteFrame("4")
        // Wx.Instance.hideBanner();
    }
    //----------------------------------更多游戏----------------------------------//


    hideQRcode() {
        this.QRcode.active = false;
    }


    //---------------------------------------广告物料------------------------------------------------//


    //---------------------------------------随机礼盒（15%）--------------------------------//
    GitBoxFun() {
        if (this.random > 0.15) {
            return;
        }
        Wx.Instance.OnEvent("经典模式", "功能", "弹出金币礼盒");
        Method.OpenViewNum++;

        this.GitBox.active = true;
        this.Box.active = true;
        this.jinbi.active = false;
        this.Box.runAction(cc.sequence(
            cc.rotateTo(0.25, 20),
            cc.rotateTo(0.25, -20),
            cc.rotateTo(0.25, 20),
            cc.rotateTo(0.25, -20),
            cc.callFunc(() => {
                this.Box.active = false;
                this.jinbi.active = true;
                this.jinbi.getChildByName("putonglingqu").active = false;
                setTimeout(() => {
                    this.jinbi.getChildByName("putonglingqu").active = true;
                }, 2000);
            })
        ))
    }

    GitBoxMark() {
        if (ShareLimit.CanWatchVideo()) {
            cc.find("Canvas/game/GitBox/jinbi/wubeilingqu/mark/share").active = false;
            cc.find("Canvas/game/GitBox/jinbi/wubeilingqu/mark/vidoe").active = true;
        } else if (ShareLimit.CanShare()) {
            cc.find("Canvas/game/GitBox/jinbi/wubeilingqu/mark/share").active = true;
            cc.find("Canvas/game/GitBox/jinbi/wubeilingqu/mark/vidoe").active = false;
        } else {
            cc.find("Canvas/game/GitBox/jinbi/wubeilingqu/mark/share").active =
                cc.find("Canvas/game/GitBox/jinbi/wubeilingqu/mark/vidoe").active = false;
        }
    }

    getAward() {
        Wx.Instance.OnEvent("经典模式", "功能", "普通领取");
        GameData.Instance.AddGameMoney(10);
        Wx.Instance.ShowToast(`恭喜你获得了10金币！`);
        this.GitBox.active = false;
        EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
    }

    getQuintupleAward() {
        RewardSystem.ShareAndWatch((isSuccess) => {
            if (isSuccess) {
                this.GitBoxMark();
                Wx.Instance.OnEvent("经典模式", "功能", "点击五倍领取成功");
                GameData.Instance.AddGameMoney(50);
                Wx.Instance.ShowToast(`恭喜你获得了50金币！`);
                this.GitBox.active = false;
                EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
            }
        });

        // const type = RewardType.Money;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         Wx.Instance.OnEvent("经典模式", "功能", "点击五倍领取成功");
        //         GameData.Instance.AddGameMoney(50);
        //         Wx.Instance.ShowToast(`恭喜你获得了50金币！`);
        //         this.GitBox.active = false;
        //         EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("getQuintupleAward...fail");
        //     }
        // );
    }
    //---------------------------------------随机礼盒（15%）--------------------------------//


    //---------------------------------炸弹(锤子)---------------------------//
    hammerButton() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        Wx.Instance.OnEvent("经典模式", "功能", "点击炸弹道具");
        Method.OpenViewNum++;

        if (this.BaseList0.length == 0 && this.BaseList1.length == 0 && this.BaseList2.length == 0
            && this.BaseList3.length == 0 && this.BaseList4.length == 0 && this.BaseList5.length == 0) {
            this.mask.opacity = 200;
            this.maskText.node.opacity = 0;
            this.mask.active = true;
            this.maskText.node.active = true;
            this.maskText.string = "没有什么可以打破的!";
            this.maskText.node.runAction(cc.sequence(
                cc.fadeTo(0.5, 255),
                cc.delayTime(1.5),
                cc.fadeTo(0.5, 0),
                cc.callFunc(() => {
                    // this.mask.active = false;
                    // this.maskText.node.active = false;
                    // return;
                })
            ))
            this.mask.runAction(cc.sequence(
                cc.delayTime(2),
                cc.fadeTo(0.5, 100),
                cc.callFunc(() => {
                    this.mask.active = false;
                    this.maskText.node.active = false;
                })
            ))
            return;
        }
        if (GameData.Instance.GetGameMoney() > 60) {
            GameData.Instance.AddGameMoney(-60);
            EventManager.Instance.ExcuteListener(Config.Instance.MONEY);
            this.FunMask.active = true;
            this.Hammer.active = true;
            this.BigHammer0.active = true;
            this.BigHammer1.active = true;
            this.BigHammer2.active = true;
            this.BigHammer3.active = true;
            this.BigHammer4.active = true;
            this.BigHammer5.active = true;
            this.HammerButton.active = false;
            if (this.BaseList0.length == 0) {
                this.BigHammer0.active = false;
            }
            if (this.BaseList1.length == 0) {
                this.BigHammer1.active = false;
            }
            if (this.BaseList2.length == 0) {
                this.BigHammer2.active = false;
            }
            if (this.BaseList3.length == 0) {
                this.BigHammer3.active = false;
            }
            if (this.BaseList4.length == 0) {
                this.BigHammer4.active = false;
            }
            if (this.BaseList5.length == 0) {
                this.BigHammer5.active = false;
            }
            return;
        }
        else {
            //弹出免费金币界面
            // this.AddMoney();
            this.MoneyChangingView();
        }
        // const type = RewardType.Bomb;
        // const method = RewardSystem.Instance.getDefaultRewardMethod();
        // RewardSystem.Instance.getReward(
        //     type,
        //     method,
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // success
        //         Wx.Instance.OnEvent("经典模式","功能","炸弹道具视频分享成功");
        //         this.FunMask.active = true;
        //         this.Hammer.active = true;
        //         this.BigHammer0.active = true;
        //         this.BigHammer1.active = true;
        //         this.BigHammer2.active = true;
        //         this.BigHammer3.active = true;
        //         this.BigHammer4.active = true;
        //         this.BigHammer5.active = true;
        //         this.HammerButton.active = false;
        //         if (this.BaseList0.length == 0) {
        //             this.BigHammer0.active = false;
        //         }
        //         if (this.BaseList1.length == 0) {
        //             this.BigHammer1.active = false;
        //         }
        //         if (this.BaseList2.length == 0) {
        //             this.BigHammer2.active = false;
        //         }
        //         if (this.BaseList3.length == 0) {
        //             this.BigHammer3.active = false;
        //         }
        //         if (this.BaseList4.length == 0) {
        //             this.BigHammer4.active = false;
        //         }
        //         if (this.BaseList5.length == 0) {
        //             this.BigHammer5.active = false;
        //         }
        //     },
        //     (targetType: RewardType, getMethod: GetRewardType) => {
        //         // fail
        //         console.log("hammerButton。。。fault");
        //     }
        // );
    }
    hammer0() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Antipasto_0.removeAllChildren();
        for (let index = 0; index < 6; index++) {
            if (this.BaseList0.indexOf(index) != -1) {
                this.SumScore++;
                if (index == 0) {
                    let gameobj = cc.instantiate(this.PlusOne0);
                    gameobj.parent = this.Antipasto_0;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 1) {
                    let gameobj = cc.instantiate(this.PlusOne1);
                    gameobj.parent = this.Antipasto_0;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 2) {
                    let gameobj = cc.instantiate(this.PlusOne2);
                    gameobj.parent = this.Antipasto_0;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 3) {
                    let gameobj = cc.instantiate(this.PlusOne3);
                    gameobj.parent = this.Antipasto_0;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 4) {
                    let gameobj = cc.instantiate(this.PlusOne4);
                    gameobj.parent = this.Antipasto_0;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 5) {
                    let gameobj = cc.instantiate(this.PlusOne5);
                    gameobj.parent = this.Antipasto_0;
                    gameobj.getComponent(cc.Animation).play();
                }
            }
        }
        this.bomb("Base0", this.BasePanel);
        this.Score.string = this.SumScore.toString();
        if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
            Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
            this.TopScoreNode.string = this.SumScore.toString();
        }
        this.BaseList0 = [];
        this.cost0 = 0;
        this.Hammer.active = false;
        this.HammerButton.active = true;
        this.FunMask.active = false;
        this.SaveGameList();
    }
    hammer1() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Antipasto_1.removeAllChildren();
        for (let index = 0; index < 6; index++) {
            if (this.BaseList1.indexOf(index) != -1) {
                this.SumScore++;
                if (index == 0) {
                    let gameobj = cc.instantiate(this.PlusOne0);
                    gameobj.parent = this.Antipasto_1;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 1) {
                    let gameobj = cc.instantiate(this.PlusOne1);
                    gameobj.parent = this.Antipasto_1;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 2) {
                    let gameobj = cc.instantiate(this.PlusOne2);
                    gameobj.parent = this.Antipasto_1;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 3) {
                    let gameobj = cc.instantiate(this.PlusOne3);
                    gameobj.parent = this.Antipasto_1;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 4) {
                    let gameobj = cc.instantiate(this.PlusOne4);
                    gameobj.parent = this.Antipasto_1;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 5) {
                    let gameobj = cc.instantiate(this.PlusOne5);
                    gameobj.parent = this.Antipasto_1;
                    gameobj.getComponent(cc.Animation).play();
                }
            }
        }
        this.bomb("Base1", this.BasePanel);
        this.Score.string = this.SumScore.toString();
        if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
            Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
            this.TopScoreNode.string = this.SumScore.toString();
        }
        this.BaseList1 = [];
        this.cost1 = 0;
        this.Hammer.active = false;
        this.HammerButton.active = true;
        this.FunMask.active = false;
        this.SaveGameList();
    }
    hammer2() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Antipasto_2.removeAllChildren();
        for (let index = 0; index < 6; index++) {
            if (this.BaseList2.indexOf(index) != -1) {
                this.SumScore++;
                if (index == 0) {
                    let gameobj = cc.instantiate(this.PlusOne0);
                    gameobj.parent = this.Antipasto_2;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 1) {
                    let gameobj = cc.instantiate(this.PlusOne1);
                    gameobj.parent = this.Antipasto_2;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 2) {
                    let gameobj = cc.instantiate(this.PlusOne2);
                    gameobj.parent = this.Antipasto_2;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 3) {
                    let gameobj = cc.instantiate(this.PlusOne3);
                    gameobj.parent = this.Antipasto_2;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 4) {
                    let gameobj = cc.instantiate(this.PlusOne4);
                    gameobj.parent = this.Antipasto_2;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 5) {
                    let gameobj = cc.instantiate(this.PlusOne5);
                    gameobj.parent = this.Antipasto_2;
                    gameobj.getComponent(cc.Animation).play();
                }
            }
        }
        this.bomb("Base2", this.BasePanel);
        this.Score.string = this.SumScore.toString();
        if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
            Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
            this.TopScoreNode.string = this.SumScore.toString();
        }
        this.BaseList2 = [];
        this.cost2 = 0;
        this.Hammer.active = false;
        this.HammerButton.active = true;
        this.FunMask.active = false;
        this.SaveGameList();
    }
    hammer3() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Antipasto_3.removeAllChildren();
        for (let index = 0; index < 6; index++) {
            if (this.BaseList3.indexOf(index) != -1) {
                this.SumScore++;
                if (index == 0) {
                    let gameobj = cc.instantiate(this.PlusOne0);
                    gameobj.parent = this.Antipasto_3;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 1) {
                    let gameobj = cc.instantiate(this.PlusOne1);
                    gameobj.parent = this.Antipasto_3;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 2) {
                    let gameobj = cc.instantiate(this.PlusOne2);
                    gameobj.parent = this.Antipasto_3;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 3) {
                    let gameobj = cc.instantiate(this.PlusOne3);
                    gameobj.parent = this.Antipasto_3;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 4) {
                    let gameobj = cc.instantiate(this.PlusOne4);
                    gameobj.parent = this.Antipasto_3;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 5) {
                    let gameobj = cc.instantiate(this.PlusOne5);
                    gameobj.parent = this.Antipasto_3;
                    gameobj.getComponent(cc.Animation).play();
                }
            }
        }
        this.bomb("Base3", this.BasePanel);
        this.Score.string = this.SumScore.toString();
        if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
            Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
            this.TopScoreNode.string = this.SumScore.toString();
        }
        this.BaseList3 = [];
        this.cost3 = 0;
        this.Hammer.active = false;
        this.HammerButton.active = true;
        this.FunMask.active = false;
        this.SaveGameList();
    }
    hammer4() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Antipasto_4.removeAllChildren();
        for (let index = 0; index < 6; index++) {
            if (this.BaseList4.indexOf(index) != -1) {
                this.SumScore++;
                if (index == 0) {
                    let gameobj = cc.instantiate(this.PlusOne0);
                    gameobj.parent = this.Antipasto_4;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 1) {
                    let gameobj = cc.instantiate(this.PlusOne1);
                    gameobj.parent = this.Antipasto_4;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 2) {
                    let gameobj = cc.instantiate(this.PlusOne2);
                    gameobj.parent = this.Antipasto_4;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 3) {
                    let gameobj = cc.instantiate(this.PlusOne3);
                    gameobj.parent = this.Antipasto_4;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 4) {
                    let gameobj = cc.instantiate(this.PlusOne4);
                    gameobj.parent = this.Antipasto_4;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 5) {
                    let gameobj = cc.instantiate(this.PlusOne5);
                    gameobj.parent = this.Antipasto_4;
                    gameobj.getComponent(cc.Animation).play();
                }
            }
        }
        this.bomb("Base4", this.BasePanel);
        this.Score.string = this.SumScore.toString();
        if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
            Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
            this.TopScoreNode.string = this.SumScore.toString();
        }
        this.BaseList4 = [];
        this.cost4 = 0;
        this.Hammer.active = false;
        this.HammerButton.active = true;
        this.FunMask.active = false;
        this.SaveGameList();
    }
    hammer5() {
        if (this.ClickButtonCd() == false) {
            return;
        }
        this.Antipasto_5.removeAllChildren();
        for (let index = 0; index < 6; index++) {
            if (this.BaseList5.indexOf(index) != -1) {
                this.SumScore++;
                if (index == 0) {
                    let gameobj = cc.instantiate(this.PlusOne0);
                    gameobj.parent = this.Antipasto_5;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 1) {
                    let gameobj = cc.instantiate(this.PlusOne1);
                    gameobj.parent = this.Antipasto_5;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 2) {
                    let gameobj = cc.instantiate(this.PlusOne2);
                    gameobj.parent = this.Antipasto_5;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 3) {
                    let gameobj = cc.instantiate(this.PlusOne3);
                    gameobj.parent = this.Antipasto_5;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 4) {
                    let gameobj = cc.instantiate(this.PlusOne4);
                    gameobj.parent = this.Antipasto_5;
                    gameobj.getComponent(cc.Animation).play();
                }
                else if (index == 5) {
                    let gameobj = cc.instantiate(this.PlusOne5);
                    gameobj.parent = this.Antipasto_5;
                    gameobj.getComponent(cc.Animation).play();
                }
            }
        }
        this.bomb("Base5", this.BasePanel);
        this.Score.string = this.SumScore.toString();
        if (this.SumScore > Wx.Instance.localStorageGetInt(Config.Instance.TOP_SCORE, 0)) {
            Wx.Instance.localStorageSetInt(Config.Instance.TOP_SCORE, this.SumScore);
            this.TopScoreNode.string = this.SumScore.toString();
        }
        this.BaseList5 = [];
        this.cost5 = 0;
        this.Hammer.active = false;
        this.HammerButton.active = true;
        this.FunMask.active = false;
        this.SaveGameList();
    }
    //---------------------------------炸弹(锤子)---------------------------//


    /**
     * 创建一个随机数生成器
     */
    public constructor(seed: number) {
        super();
        this.seed = seed;
        if (!this.seed && this.seed != 0) {
            this.seed = new Date().getTime();
        }
    }

    /**
     * 设置用于随机数生成器的种子，如果不设置则实际是取当前时间毫秒数
     */
    public seed: number;
    /**
     * 返回一个随机数，在0.0～1.0之间
     */
    public get value(): number {
        return this.range(0, 1);
    }
    /**
     * 返回一个在min和max之间的随机浮点数
     */
    public range(min: number, max: number): number {
        if (!this.seed && this.seed != 0) {
            this.seed = new Date().getTime();
        }
        max = max || 1;
        min = min || 0;
        this.seed = (this.seed * 9301 + 49297) % 233280;
        var rnd = this.seed / 233280.0;
        return min + rnd * (max - min);
    }

    /**
     * 设置用于随机数生成器的种子，如果不设置则实际是取当前时间毫秒数
     */
    public static seed: number;

    /**
     * 返回一个随机数，在0.0～1.0之间
     */
    public static get value(): number {
        return this.range(0, 1);
    }
    public static get value1(): number {
        return this.range(2, 5);
    }
    /**
     * 返回一个在min和max之间的随机浮点数
     */
    public static range(min: number, max: number): number {
        if (!this.seed && this.seed != 0) {
            this.seed = new Date().getTime();
        }
        max = max || 1;
        min = min || 0;
        this.seed = (this.seed * 9301 + 49297) % 233280;
        var rnd = this.seed / 233280.0;
        return min + rnd * (max - min);
    }

    update(dt) {

        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            let AfterSharingTime = 0;
            if (this.isShare == true) {
                this.AfterSharingTime = new Date().getTime();
                this.isShare = false;
            }

            if (Method.isMusic == false) {
                return;
            } else {
                cc.audioEngine.resumeAll();
            }
        });

        // if (Method.OpenViewNum == 3) {
        //     Wx.Instance.hideBanner()
        //     Wx.Instance.ShowBanner(Config.Instance.BANNERID);
        //     Method.OpenViewNum = 0;
        // }

    }

    continueGameList() {

    }

    SaveGameList() {
        // return
        console.log("SaveGameList");
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base0list, JSON.stringify(this.BaseList0));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base1list, JSON.stringify(this.BaseList1));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base2list, JSON.stringify(this.BaseList2));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base3list, JSON.stringify(this.BaseList3));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base4list, JSON.stringify(this.BaseList4));
        Wx.Instance.localStorageSetList(Config.ContinueTheGame.Base5list, JSON.stringify(this.BaseList5));
        Wx.Instance.localStorageSetInt(Config.ContinueTheGame.CurScore, this.SumScore);
    }
    SaveGamePreviewIndex() {
        // return
        if (this.Preview) {
            Wx.Instance.localStorageSetInt(Config.ContinueTheGame.PreviewIndex, this.Preview);
        }
        if (this.FruitsIndex) {
            Wx.Instance.localStorageSetInt(Config.ContinueTheGame.FruitsIndex, this.FruitsIndex);
        }
    }

    exposeEnv() {
        window.gg = {
            Wx: Wx.Instance,
            GameDate: GameData.Instance,
        };
    }

}