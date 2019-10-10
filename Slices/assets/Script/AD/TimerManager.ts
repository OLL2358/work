// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class TimerManager extends cc.Component {
    private static _instance: TimerManager;
    public static get instance(): TimerManager {
        return this._instance;
    }
    onLoad() {
        TimerManager._instance = this;
    }

    //#region 公共方法
    private timers: { [key: string]: () => void } = {}
    /**
     * 创建定时器
     * @param key 定时器主键,用于删除定时器
     * @param callback 定时器事件
     * @param interval 执行频率(秒数,0为每帧)
     * @param repeat 执行次数
     * @param delay 延迟执行时间
     */
    public CreateTimer(key: string, callback: () => void, interval?: number, repeat?: number, delay?: number) {
        if (this.timers[key]) {
            this.RemoveTimer(key);
        }
        this.schedule(callback, interval, repeat, delay);
        this.timers[key] = callback;
    }

    public RemoveTimer(key: string) {
        if (this.timers[key]) {
            this.unschedule(this.timers[key]);
            this.timers[key] = undefined;
        }
    }
    //#endregion
}
