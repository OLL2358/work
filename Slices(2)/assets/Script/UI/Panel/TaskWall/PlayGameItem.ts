import ADData from "../../../ADData";
import Method from './../../../Method';
import ShareLimit from "../../../common/ShareTheLimit";
import EventManager from './../../../tool/common/EventManager';
import Wx from './../../../Wx/Wx';
import Config from './../../../tool/model/Config';
import GameData from './../../../GameData';

/**
 * 试玩游戏
 */
export default class PlayGameItem {

    Icon: cc.Sprite;
    PlayGameBtn: cc.Node;
    GameName: cc.Label;

    wasPlay: boolean = false;

    adData;
    constructor(node) {
        this.GameName = cc.find("name", node).getComponent(cc.Label);
        this.Icon = cc.find("rim/mask/icon", node).getComponent(cc.Sprite);
        this.PlayGameBtn = cc.find("Btn", node);

        this.wasPlay = false;
    }

    AddDelegate() {
        EventManager.Instance.AddClick(this.PlayGameBtn, () => {
            if (!this.wasPlay) {
                ShareLimit.TryPlay(this.adData, () => {
                    this.wasPlay = true;
                    let gameJson = Wx.Instance.localStorageGet(Config.Instance.PlayGames, '');
                    let games: string[] = [];
                    if (gameJson) {
                        games = JSON.parse(gameJson);
                    }
                    games.push(this.adData.appId);
                    Wx.Instance.localStorageSet(Config.Instance.PlayGames, JSON.stringify(games));
                    GameData.Instance.AddDiamond(10);
                    this.PlayGameBtn.color = cc.Color.GRAY;
                    console.log("试玩成功.获得10钻石奖励!");
                })
            }
        })
    }

    RemoveDelegate() {
        EventManager.Instance.RemoveClick(this.PlayGameBtn);
    }

    UpdateItem(index: number) {
        this.adData = ADData.instance.NewAdData.ad_info[index];
        console.log("adData: ",this.adData);
        cc.loader.load({ url: this.adData.appIcon, type: "png" }, (err, res) => {
            if (err) {
                console.error("UpdateItem fail 。。。");
                return;
            }
            this.Icon.spriteFrame = new cc.SpriteFrame(res);
        })
        if (this.GameName)
            this.GameName.string = this.adData.appName;
        let gameJson = Wx.Instance.localStorageGet(Config.Instance.PlayGames, '');
        if (gameJson) {
            let games: string[] = JSON.parse(gameJson);
            if (games.findIndex(a => a == this.adData.appId) >= 0) {
                this.wasPlay = true;
            }
        }
        this.PlayGameBtn.color = this.wasPlay ? cc.Color.GRAY : cc.Color.WHITE;
    }
}
