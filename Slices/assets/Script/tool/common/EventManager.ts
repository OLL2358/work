import EventData from "../model/EventData";
import EventListener from '../common/EventListener';
import Wx from './../../Wx/Wx';
import Utility from "../../common/Utility";

/*事件管理器*/
export default class EventManager {
    private static instance: EventManager = null;
    public static get Instance() {
        if (this.instance == null)
            this.instance = new EventManager();
        return this.instance;
    }
    /*变量*/
    /*点击事件*/
    private ClickEvents: { [key: string]: EventData } = {}
    /*监听者事件*/
    private ListenerEvents: { [key: string]: Array<ListenerEventInfo> } = {}
    /*公开方法*/
    /**
     * 添加节点点击事件
     * @param node 节点
     * @param event 事件
     * @param params 事件参数
     */
    public AddClick(node: cc.Node, event: (...params: any[]) => void, hasSound: boolean = true, ...params: any[]) {
        if (Wx.Instance.wx && !node) {
            Utility.error('传入的点击对象为空');
            return;
        }
        let com = node.getComponent(EventListener);
        let com2 = node.getComponent(cc.Button);
        if (!com2)
            node.addComponent(cc.Button);
        if (com == null)
            node.addComponent(EventListener);
        let key = EventManager.Instance.getNodeName(node);
        // let key = node.name;
        let data: EventData = new EventData();
        data.event = event;
        data.params = params;
        data.hasSound = hasSound;
        this.ClickEvents[key] = data;
    }
    /**
     * 移除节点上的点击方法
     * @param node 节点
     */
    public RemoveClick(node: cc.Node) {
        let key = EventManager.Instance.getNodeName(node);
        if (this.ClickEvents[key] != undefined && this.ClickEvents[key] != null)
            this.ClickEvents[key] = null;
    }
    /**
     * 执行节点上的点击方法
     * @param node 节点
     */
    public ExcuteClickEvent(node: cc.Node) {
        let key = EventManager.Instance.getNodeName(node);
        if (this.ClickEvents[key] != undefined && this.ClickEvents[key] != null)
            this.ClickEvents[key].event(this.ClickEvents[key].params);
    }
    /**
     * 清空所有点击方法(慎用)
     */
    public ClearClickEvent() {
        this.ClickEvents = {};
    }
    /**
     * 添加事件监听(单个主键可添加多个不同事件)
     * @param linstener 监听者 节点(可为null)
     * @param key 监听主键
     * @param event 事件
     */
    public AddListener(listener: cc.Node, key: string, event: (...params: any[]) => void) {
        if (this.ListenerEvents[key] == null)
            this.ListenerEvents[key] = new Array<ListenerEventInfo>();
        /*当前方法不存在于集合中*/
        if (this.ListenerEvents[key].find((value) => value.event == event) == null)
            this.ListenerEvents[key].push(new ListenerEventInfo(listener, event));
    }
    /**
     * 移除监听事件
     * @param key 监听主键
     * @param node 监听者(可空,与事件同时为空时,删除改键下所有事件,优先判定监听者)
     * @param event 事件(可空)
     */
    public RemoveLisener(key: string, node?: cc.Node, event?: (...params: any[]) => void) {
        if (this.ListenerEvents[key] == null)
            return;
        if (!event && !node) {
            this.RemoveListenerAll(key);
            return;
        }
        let index = -1;
        for (let i = 0; i < this.ListenerEvents[key].length; i++) {
            if (this.ListenerEvents[key][i].linstener == node ||
                this.ListenerEvents[key][i].event == event) {
                index = i;
                break;
            }
        }
        if (index >= 0)
            this.ListenerEvents[key].splice(index, 1);
    }
    /**
     * 移除某个节点下的所有监听事件
     * @param node 节点
     */
    public RemoveNodeAllListener(node: cc.Node) {
        for (let key in this.ListenerEvents) {
            this.RemoveLisener(key, node);
        }
    }
    /**
     * 移除监听主键下的所有事件
     * @param key 主键
     */
    public RemoveListenerAll(key: string) {
        if (this.ListenerEvents[key] == null)
            return;
        this.ListenerEvents[key].slice(0);
    }
    /**
     * 清空所有监听事件(慎用)
     */
    public ClearAllListener() {
        this.ListenerEvents = {};
    }
    /**
     * 执行监听事件
     * @param key 主键
     * @param params 执行参数(可空)
     */
    public ExcuteListener(key: string, ...params: any[]) {
        if (this.ListenerEvents[key] == null)
            return;
        for (let i = 0; i < this.ListenerEvents[key].length; i++) {
            if (this.ListenerEvents[key][i])
                this.ListenerEvents[key][i].event(params);
        }
    }
    /*私有方法*/
    /*获取节点key值*/
    private getNodeName(node: cc.Node): string {
        let key = node.name;
        while (node.parent != null && node.parent.name != 'Canvas') {
            key = node.parent.name + '/' + key
            node = node.parent;
        }
        return key;
    }

}
/**
 * 监听事件info
 */
class ListenerEventInfo {
    constructor(linstener: cc.Node, event: (...params: any[]) => void) {
        this.linstener = linstener;
        this.event = event;
    }
    public event: (...params: any[]) => void;
    public linstener: cc.Node;
}
