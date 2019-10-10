
export default class EventMessage {
    public static readonly instance = {
        // ServerTime: 'ServerTime',/*系统时间刷新*/
        /*观看视频完成*/
        WatchFinished: 'WatchFinished',
        /*观看视频失败*/
        WatchFail: 'WatchFail',
        /**炫耀完成 */
        passShare: 'passShare',
        /**游戏资源初始化进度*/
        GameResourcesInit: 'GameResourcesInit',
        /**加载配置表进度 */
        GameInfo: 'GameInfo',
    }
}
