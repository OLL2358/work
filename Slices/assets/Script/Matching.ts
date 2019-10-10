
import Method from './Method';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Matching extends cc.Component {

    @property(cc.Node)
    Player1: cc.Node = null;
    @property(cc.Node)
    Player2: cc.Node = null;
    @property(cc.Node)
    PlayerKilling: cc.Node = null;

    private Data = [];

    start () {
        this.Player2.active = false;
        setTimeout(() => {
            this.Player2.active = true;
            setTimeout(() => {
                this.node.active = false;
                this.PlayerKilling.active = true;
            }, 1000);
        }, (Math.random() * 2 + 2)*1000);
    }
}
