import Wx from "../../../Wx/Wx";
import Config from './../../../tool/model/Config';
import EventManager from './../../../tool/common/EventManager';
import Method from './../../../Method';
import GameData from './../../../GameData';
import { RewardSystem } from './../../../Game/tool/RewardSystem';
import RemoteControl from "../../../Game/tool/RemoteCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FieldGuide extends cc.Component {

    @property(cc.Node)
    Fruits: cc.Node = null;
    @property(cc.Sprite)
    CurFruit: cc.Sprite = null;
    @property(cc.Node)
    unlockBtn: cc.Node = null;
    @property(cc.Node)
    FreeBtn: cc.Node = null;
    @property(cc.Node)
    Close: cc.Node = null;
    @property(cc.Sprite)
    AwardFruit: cc.Sprite = null;
    @property(cc.Label)
    CurName: cc.Label = null;

    Fruits1: cc.Node;
    Fruits2: cc.Node;
    Fruits3: cc.Node;
    Fruits4: cc.Node;
    Fruits5: cc.Node;
    Fruits6: cc.Node;
    Fruits7: cc.Node;
    Fruits8: cc.Node;
    Fruits9: cc.Node;
    Fruits10: cc.Node;
    Fruits11: cc.Node;
    Fruits12: cc.Node;
    Fruits13: cc.Node;
    Fruits14: cc.Node;

    havefruit = [1];

    curPrice: number;
    curNo: number;

    di
    mupai
    ding

    fengexian

    FruitsBg
    zuanshi
    Fruit
    Light
    Lock

    jiesuotujian
    mianfeitiyan

    guang
    jiesuochenggong
    shuzi_1

    CurFruits

    onLoad() {
        this.Fruits1 = cc.find("Fruits1", this.Fruits);
        this.Fruits2 = cc.find("Fruits2", this.Fruits);
        this.Fruits3 = cc.find("Fruits3", this.Fruits);
        this.Fruits4 = cc.find("Fruits4", this.Fruits);
        this.Fruits5 = cc.find("Fruits5", this.Fruits);
        this.Fruits6 = cc.find("Fruits6", this.Fruits);
        this.Fruits7 = cc.find("Fruits7", this.Fruits);
        this.Fruits8 = cc.find("Fruits8", this.Fruits);
        this.Fruits9 = cc.find("Fruits9", this.Fruits);
        this.Fruits10 = cc.find("Fruits10", this.Fruits);
        this.Fruits11 = cc.find("Fruits11", this.Fruits);
        this.Fruits12 = cc.find("Fruits12", this.Fruits);
        this.Fruits13 = cc.find("Fruits13", this.Fruits);
        this.Fruits14 = cc.find("Fruits14", this.Fruits);

        if (!RemoteControl.Instance.switchData.share) {
            this.FreeBtn.active = false;
            this.unlockBtn.x = 0;
        }
        let atlas: cc.SpriteAtlas;
        cc.loader.loadRes('SubTexture/FieldGuide', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load FieldGuide fail , message=' + error);
                return;
            }
            atlas = data;
            console.log("============= ");

            this.di = cc.find('Bg/di', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('di');
            this.mupai = cc.find('Bg/mupai', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('mupai');
            this.ding = cc.find('Bg/ding', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('ding');

            this.unlockBtn.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('annui');
            this.FreeBtn.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('annui');
            this.jiesuotujian = cc.find('jiesuotujian', this.unlockBtn).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame("jiesuotujian");
            this.mianfeitiyan = cc.find('mianfeitiyan', this.FreeBtn).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame("mianfeitiyan");
            this.guang = cc.find('award/guang', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame("guang");
            this.jiesuochenggong = cc.find('award/jiesuochenggong', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame("jiesuochenggong");
            this.shuzi_1 = cc.find('award/shuzi_1', this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame("shuzi_1");


            cc.loader.loadRes('SubTexture/SubFruits/Coco', cc.SpriteAtlas, (error, data) => {
                if (error) {
                    console.log('load Coco fail , message=' + error);
                    return;
                }
                this.CurFruits = cc.find("CurFruits/Fruit", this.node).getComponent(cc.Sprite).spriteFrame = data.getSpriteFrame("Fruit");
            })

            for (let i = 0; i < 5; i++) {
                this.fengexian = cc.find(`ScrollView/view/content/Line/fengexian${i}`, this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('fengexian');
            }
            for (let j = 1; j < 15; j++) {
                this.FruitsBg = cc.find(`ScrollView/view/content/Fruits/Fruits${j}`, this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('dizuo_1');
                this.zuanshi = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Diamond/zuanshi`, this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('zuanshi');
                this.Light = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Light`, this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('xuanzhong');
                this.Lock = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Lock`, this.node).getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame('suo');
                let FruitAtlas: cc.SpriteAtlas;
                if (j == 1) {
                    cc.loader.loadRes('SubTexture/SubFruits/Coco', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load Coco fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 2) {
                    cc.loader.loadRes('SubTexture/SubFruits/kiwi', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load kiwi fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 3) {
                    cc.loader.loadRes('SubTexture/SubFruits/lemon', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load lemon fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 4) {
                    cc.loader.loadRes('SubTexture/SubFruits/mangosteen', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load mangosteen fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 5) {
                    cc.loader.loadRes('SubTexture/SubFruits/orange', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load orange fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 6) {
                    cc.loader.loadRes('SubTexture/SubFruits/pawpaw', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load pawpaw fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 7) {
                    cc.loader.loadRes('SubTexture/SubFruits/pineapple', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load pineapple fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 8) {
                    cc.loader.loadRes('SubTexture/SubFruits/pomelo', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load pomelo fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 9) {
                    cc.loader.loadRes('SubTexture/SubFruits/Pass', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load Pass fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 10) {
                    cc.loader.loadRes('SubTexture/SubFruits/Pitaya', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load Pitaya fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 11) {
                    cc.loader.loadRes('SubTexture/SubFruits/Pear', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load Pear fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 12) {
                    cc.loader.loadRes('SubTexture/SubFruits/Apple', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load Apple fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 13) {
                    cc.loader.loadRes('SubTexture/SubFruits/Pomegranate', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load Pomegranate fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
                else if (j == 14) {
                    cc.loader.loadRes('SubTexture/SubFruits/Watermelon', cc.SpriteAtlas, (error, data) => {
                        if (error) {
                            console.log('load Watermelon fail , message=' + error);
                            return;
                        }
                        FruitAtlas = data;
                        this.Fruit = cc.find(`ScrollView/view/content/Fruits/Fruits${j}/Fruit`, this.node).getComponent(cc.Sprite).spriteFrame = FruitAtlas.getSpriteFrame("Fruit");
                    })
                }
            }
        })


    }

    start() {
        this.Init();
        this.AddDelegate();
        // Wx.Instance.hideGameClub();
    }

    Init() {
        this.havefruit = Wx.Instance.localStorageGetList(Config.Instance.HaveFruits);
        for (let i = 1; i < 14; i++) {
            let obj = cc.find("Fruits" + (i + 1), this.Fruits)
            if (this.havefruit.indexOf(i + 1) != -1) {
                cc.find("Lock", obj).active = false;
                cc.find("Diamond", obj).active = false;
                cc.find("have", obj).active = true;
            } else {
                cc.find("Lock", obj).active = true;
                cc.find("Diamond", obj).active = true;
                cc.find("have", obj).active = false;
            }
        }
    }

    AddDelegate() {
        EventManager.Instance.AddClick(this.unlockBtn, () => {
            if (this.havefruit.indexOf(this.curNo) != -1 || this.curNo == 1) {
                console.log("已解锁皮肤");
                Wx.Instance.ShowToast("已解锁皮肤");
                return;
            }
            if (GameData.Instance.GetDiamond() >= this.curPrice) {
                this.havefruit.push(this.curNo);
                Wx.Instance.localStorageSetList(Config.Instance.HaveFruits, JSON.stringify(this.havefruit));
                Wx.Instance.ShowToast("解锁成功");
                console.log("解锁成功");
                this.Init();
            } else {
                console.log("钻石不足");
                Wx.Instance.ShowToast("钻石不足");
            }
        })
        EventManager.Instance.AddClick(this.FreeBtn, () => {
            if (this.havefruit.indexOf(this.curNo) != -1 || this.curNo == 1) {
                console.log("已解锁皮肤");
                Wx.Instance.ShowToast("已解锁皮肤");
                return;
            }
            if (Wx.Instance.wx == null) {
                this.AwardFruit.spriteFrame = this.FruitsSprite(this.curNo).getSpriteFrame("Fruit");
                Method.instance.randomFruits(this.curNo - 1);
                console.log(this.curNo);
                cc.find("Fruits" + this.curNo + "/Diamond", this.Fruits).active = false;
                cc.find("Fruits" + this.curNo + "/Lock", this.Fruits).active = false;
                cc.find("Fruits" + this.curNo + "/Text", this.Fruits).active = true;
            } else {
                RewardSystem.Share((isSuccess) => {
                    if (isSuccess) {
                        this.AwardFruit.spriteFrame = this.FruitsSprite(this.curNo).getSpriteFrame("Fruit");
                        Method.instance.randomFruits(this.curNo - 1);
                        console.log(this.curNo);
                        cc.find("Fruits" + this.curNo + "/Diamond", this.Fruits).active = false;
                        cc.find("Fruits" + this.curNo + "/Lock", this.Fruits).active = false;
                        cc.find("Fruits" + this.curNo + "/Text", this.Fruits).active = true;
                    }
                })
            }
        })
        EventManager.Instance.AddClick(this.Close, () => {
            // Wx.Instance.showGameClub();
            this.Remove();
        })
        EventManager.Instance.AddClick(this.Fruits1, () => {
            this.CurFruit.spriteFrame = Method.CocoAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "椰子";
            this.light(1);
            this.curNo = 1;
            this.curPrice = 0;
            Method.instance.randomFruits(0);
        })
        EventManager.Instance.AddClick(this.Fruits2, () => {
            this.CurFruit.spriteFrame = Method.KiwiAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "奇异果";
            this.light(2);
            if (cc.find("Fruits" + 2 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(1);
                return;
            }
            if (this.havefruit.indexOf(2 - 1) == -1) {
                this.curNo = 2;
                this.curPrice = 200;
            } else {
                Method.instance.randomFruits(1);
            }
        })
        EventManager.Instance.AddClick(this.Fruits3, () => {
            this.CurFruit.spriteFrame = Method.LemonAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "柠檬";
            this.light(3);
            if (cc.find("Fruits" + 3 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(2);
                return;
            }
            if (this.havefruit.indexOf(3 - 1) == -1) {
                this.curNo = 3;
                this.curPrice = 200;
            } else {
                Method.instance.randomFruits(2);
            }
        })
        EventManager.Instance.AddClick(this.Fruits4, () => {
            this.CurFruit.spriteFrame = Method.MangosteenAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "山竹";
            this.light(4);
            if (cc.find("Fruits" + 4 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(3);
                return;
            }
            if (this.havefruit.indexOf(4 - 1) == -1) {
                this.curNo = 4;
                this.curPrice = 300;
            } else {
                Method.instance.randomFruits(3);
            }
        })
        EventManager.Instance.AddClick(this.Fruits5, () => {
            this.CurFruit.spriteFrame = Method.OrangeAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "橙子";
            this.light(5);
            if (cc.find("Fruits" + 5 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(4);
                return;
            }
            if (this.havefruit.indexOf(5 - 1) == -1) {
                this.curNo = 5;
                this.curPrice = 300;
            } else {
                Method.instance.randomFruits(4);
            }
        })
        EventManager.Instance.AddClick(this.Fruits6, () => {
            this.CurFruit.spriteFrame = Method.PawpawAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "木瓜";
            this.light(6);
            if (cc.find("Fruits" + 6 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(5);
                return;
            }
            if (this.havefruit.indexOf(6 - 1) == -1) {
                this.curNo = 6;
                this.curPrice = 300;
            } else {
                Method.instance.randomFruits(5);
            }
        })
        EventManager.Instance.AddClick(this.Fruits7, () => {
            this.CurFruit.spriteFrame = Method.PineappleAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "菠萝";
            this.light(7);
            if (cc.find("Fruits" + 7 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(6);
                return;
            }
            if (this.havefruit.indexOf(7 - 1) == -1) {
                this.curNo = 7;
                this.curPrice = 400;
            } else {
                Method.instance.randomFruits(6);
            }
        })
        EventManager.Instance.AddClick(this.Fruits8, () => {
            this.CurFruit.spriteFrame = Method.PomeloAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "西柚";
            this.light(8);
            if (cc.find("Fruits" + 8 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(7);
                return;
            }
            if (this.havefruit.indexOf(8 - 1) == -1) {
                this.curNo = 8;
                this.curPrice = 400;
            } else {
                Method.instance.randomFruits(7);
            }
        })
        EventManager.Instance.AddClick(this.Fruits9, () => {
            this.CurFruit.spriteFrame = Method.PomeloAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "百香果";
            this.light(9);
            if (cc.find("Fruits" + 9 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(8);
                return;
            }
            if (this.havefruit.indexOf(9 - 1) == -1) {
                this.curNo = 9;
                this.curPrice = 400;
            } else {
                Method.instance.randomFruits(8);
            }
        })
        EventManager.Instance.AddClick(this.Fruits10, () => {
            this.CurFruit.spriteFrame = Method.PitayaAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "火龙果";
            this.light(10);
            if (cc.find("Fruits" + 10 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(9);
                return;
            }
            if (this.havefruit.indexOf(10 - 1) == -1) {
                this.curNo = 10;
                this.curPrice = 500;
            } else {
                Method.instance.randomFruits(9);
            }
        })
        EventManager.Instance.AddClick(this.Fruits11, () => {
            this.CurFruit.spriteFrame = Method.PearAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "雪梨";
            this.light(11);
            if (cc.find("Fruits" + 11 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(10);
                return;
            }
            if (this.havefruit.indexOf(11 - 1) == -1) {
                this.curNo = 11;
                this.curPrice = 500;
            } else {
                Method.instance.randomFruits(10);
            }
        })
        EventManager.Instance.AddClick(this.Fruits12, () => {
            this.CurFruit.spriteFrame = Method.AppleAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "苹果";
            this.light(12);
            if (cc.find("Fruits" + 12 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(11);
                return;
            }
            if (this.havefruit.indexOf(12 - 1) == -1) {
                this.curNo = 12;
                this.curPrice = 500;
            } else {
                Method.instance.randomFruits(11);
            }
        })
        EventManager.Instance.AddClick(this.Fruits13, () => {
            this.CurFruit.spriteFrame = Method.PomegranateAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "石榴";
            this.light(13);
            if (cc.find("Fruits" + 13 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(12);
                return;
            }
            if (this.havefruit.indexOf(13 - 1) == -1) {
                this.curNo = 13;
                this.curPrice = 600;
            } else {
                Method.instance.randomFruits(12);
            }
        })
        EventManager.Instance.AddClick(this.Fruits14, () => {
            this.CurFruit.spriteFrame = Method.WatermelonAtlas.getSpriteFrame("Fruit");
            this.CurName.string = "西瓜";
            this.light(14);
            if (cc.find("Fruits" + 14 + "/Text", this.Fruits).active) {
                Method.instance.randomFruits(13);
                return;
            }
            if (this.havefruit.indexOf(14 - 1) == -1) {
                this.curNo = 14;
                this.curPrice = 600;
            } else {
                Method.instance.randomFruits(13);
            }
        })
    }

    light(num: number) {
        for (let i = 1; i < 15; i++) {
            cc.find("Fruits" + i + "/Light", this.Fruits).active = false;
        }
        // setTimeout(() => {
        cc.find("Fruits" + num + "/Light", this.Fruits).active = true;
        // }, 1);
    }

    Remove() {
        EventManager.Instance.RemoveClick(this.unlockBtn);
        this.node.destroy();
    }

    FruitsSprite(num: number) {
        if (num == 0) {
            return Method.CocoAtlas;
        } else if (num == 1) {
            return Method.KiwiAtlas;
        } else if (num == 2) {
            return Method.LemonAtlas;
        } else if (num == 3) {
            return Method.MangosteenAtlas;
        } else if (num == 4) {
            return Method.OrangeAtlas;
        } else if (num == 5) {
            return Method.PawpawAtlas;
        } else if (num == 6) {
            return Method.PineappleAtlas;
        } else if (num == 7) {
            return Method.PomeloAtlas;
        } else if (num == 8) {
            return Method.PassAtlas;
        } else if (num == 9) {
            return Method.PitayaAtlas;
        } else if (num == 10) {
            return Method.PearAtlas;
        } else if (num == 11) {
            return Method.AppleAtlas;
        } else if (num == 12) {
            return Method.PomegranateAtlas;
        } else if (num == 13) {
            return Method.WatermelonAtlas;
        }
    }
    // update (dt) {}
}
