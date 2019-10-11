import EventManager from "./EventManager";

/*消息监听者*/
export default class EventListener extends cc.Component {
    private button: cc.Button = null;

    onDestroy() {
        EventManager.Instance.RemoveClick(this.node);
    }

    OnbuttonClick(event) {
        if (event.currentTarget != null) {
            if (this.button && this.button.interactable) {
                EventManager.Instance.ExcuteClickEvent(event.currentTarget);
            }
        }
    }
    onLoad() {
        this.button = this.getComponent('cc.Button');
        if (this.button != null) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.OnbuttonClick, this);
        }
    }

}
