import AdManage from "../../AD/AdManage";

class Config {
    public static readonly Instance = {
        /**版本号*/
        version: '1',
        versionType: AdManage.s_version,
        /**0代表未完成 1代表完成 */
        IS_GUIDE: "IS_GUIDE",
        /**签到数 */
        SIGN_NUM: "IS_GUIDE",
        /**是否签到过 0代表未签到 1代表签到过*/
        IS_SIGN: "IS_SIGN",
        /**签到时间 */
        SIGN_TIME: "SIGN_TIME",
        /**广告ID */
        BANNERID: "adunit-e693e0c5176f13b9",
        /**插屏ID */
        interstitialID: "adunit-51b9d57a914cfe07",
        /**视频ID */
        VIDEOID: "adunit-22bf932e018a4368",
        /**观看视频完成*/
        WatchFinished: 'WatchFinished',
        /**观看视频失败*/
        WatchFail: 'WatchFail',
        /**视频次数 */
        KEY_VIDEO_NUM: 'KEY_VIDEO_NUM',
        /**分享次数 */
        KEY_SHARE_NUM: 'KEY_SHARE_NUM',
        /**分享时间 */
        KEY_SHARE_TIME: 'KEY_SHARE_TIME',

        KEY_SHARE_ID_ARRAY: 'KEY_SHARE_ID_ARRAY',
        /**音乐开关 */
        MUSIC_IS_PLAY: "MUSIC_IS_PLAY",
        /**金币 */
        MONEY: "MONEY",
        /**钻石 */
        DIAMOND: "DIAMOND",
        /**红包 */
        BONUSE: "BONUS",
        /**已通关的关卡数量索引 */
        STORY_NUM: "STORY_NUM",
        /**转盘免费钻石视频次数 */
        TUMTABLE_WATCH_NUM: "TUMTABLE_SHARE_NUM",
        /**免费转盘时间 */
        FREE_TUMTABLE_TIME: "FREE_TUMTABLE_TIME",
        /**免费转盘次数是否使用 */
        IS_FREE_TUMTBALE: "IS_FREE_TUMTBALE",
        /**最高分 */
        TOP_SCORE: "TOP_SCORE",
        /**每日红包 */
        EVERYDAY_BONUS: "EVERYDAY_BONUS",
        PlayGames: "PlayGames",
        /**免费钻石冷却时间 */
        FreeDiamondCD: "FreeDiamondCD",
        /**免费钻石领取次数 */
        FreeDiamondNum: "FreeDiamondNum",
        /**兑换钻石界面免费钻石领取次数 */
        DiamondChangingFreeDiamondNum: "DiamondChangingFreeDiamondNum",
        /**游戏中的免费钻石 */
        PlayingFreeDiamond: "PlayingFreeDiamond",
        /**调用登陆 */
        IsLogin: 'IsLogin',
        /**皮肤试用 */
        FruitsTryOut: 'FruitsTryOut',
        /**拥有的水果(list) */
        HaveFruits: 'HaveFruits',
        /**获取数据成功 */
        GetData: 'GetData',
    }
    public static readonly ContinueTheGame = {
        Base0list: "Base0list",
        Base1list: "Base1list",
        Base2list: "Base2list",
        Base3list: "Base3list",
        Base4list: "Base4list",
        Base5list: "Base5list",
        CurScore: "CurScore",
        PreviewIndex: "PreviewIndex",
        FruitsIndex: "FruitsIndex",
    }
}
export default Config;