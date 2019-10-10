
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    Player1: cc.Node = null;
    @property(cc.Node)
    Player2: cc.Node = null;
    @property(cc.Node)
    Time: cc.Node = null;

    Player1_Score: cc.Label;
    Player1_avatar_url: cc.Sprite;
    Player1_name: cc.Label;
    Player1_sex: cc.Sprite;
    Player1_level: cc.Label;
    Player2_Score: cc.Label;
    Player2_avatar_url: cc.Sprite;
    Player2_name: cc.Label;
    Player2_sex: cc.Sprite;
    Player2_level: cc.Label;
    minute: cc.Label;
    second: cc.Label;

    onLoad () {
        this.Player1_Score = this.Player1.getChildByName("ScoreBg").getChildByName("Score").getComponent(cc.Label);
        this.Player1_avatar_url = this.Player1.getChildByName("touxiang").getChildByName("mask").getChildByName("photo").getComponent(cc.Sprite);
        this.Player1_name = this.Player1.getChildByName("Name").getComponent(cc.Label);
        this.Player1_sex = this.Player1.getChildByName("sex").getChildByName("di_1").getChildByName("nan").getComponent(cc.Sprite);
        this.Player1_level = this.Player1.getChildByName("level").getChildByName("di_1").getChildByName("name").getComponent(cc.Label);
        this.Player2_Score = this.Player2.getChildByName("ScoreBg").getChildByName("Score").getComponent(cc.Label);
        this.Player2_avatar_url = this.Player2.getChildByName("touxiang").getChildByName("mask").getChildByName("photo").getComponent(cc.Sprite);
        this.Player2_name = this.Player2.getChildByName("Name").getComponent(cc.Label);
        this.Player2_sex = this.Player2.getChildByName("sex").getChildByName("di_1").getChildByName("nan").getComponent(cc.Sprite);
        this.Player2_level = this.Player2.getChildByName("level").getChildByName("di_1").getChildByName("name").getComponent(cc.Label);
        this.minute = this.Time.getChildByName("minute").getComponent(cc.Label);
        this.second = this.Time.getChildByName("second").getComponent(cc.Label);
    }

    start () {

    }

    // update (dt) {}
}
