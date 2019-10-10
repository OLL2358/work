
import BasePos from './Game/Model/BasePos';
import Method from './Method';
import CSV from './UI/Commom/CSV';
import EventManager from './tool/common/EventManager';
import EventMessage from './tool/model/EventMessage';
import turntable from './turntable';
import Wx from './Wx/Wx';
export default class GamePrefabs {
    public static instance: GamePrefabs;
    public static get Instance(): GamePrefabs {
        if (this.instance == null)
            this.instance = new GamePrefabs();
        return this.instance;
    }
    /*#region 加载*/
    private loadResNum: number = 0;
    private CurLoad: number = 0;

    public callbask;
    private NextLoad: number = 0;
    private NextLoadResNum: number = 0;
    public NextResLoadSuccees: boolean = false;
    private get curLoad(): number { return this.CurLoad; }
    private set curLoad(num: number) {
        this.CurLoad = num;
        EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
    }

    public Init() {
        Wx.Instance.OnEvent("加载游戏", "功能", "开始loading");
        this.loadResNum = 7;
        //1
        cc.loader.loadRes('csv/Base0', (error, data) => {
            if (error) {
                console.log('load Base0 fail , message=' + error);
                return;
            }
            let strs: Array<string[]> = CSV.parse(data);
            let tempArray = new Array<BasePos>();
            for (let i = 1; i < strs.length; i++) {

                let info: BasePos = new BasePos();
                for (let j = 0; j < strs[i].length; j++) {
                    let strsCell = strs[i][j];
                    if (j == 1) {
                        info.BasePos0_PosX = parseInt(strsCell);
                    } else if (j == 2) {
                        info.BasePos0_PosY = parseInt(strsCell);
                    }
                }
                tempArray.push(info);
            }
            Method.Base0Info = tempArray;
            this.CurLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        });
        //2
        cc.loader.loadRes('csv/Base1', (error, data) => {
            if (error) {
                console.log('load Base1 fail , message=' + error);
                return;
            }
            let strs: Array<string[]> = CSV.parse(data);
            let tempArray = new Array<BasePos>();
            for (let i = 1; i < strs.length; i++) {

                let info: BasePos = new BasePos();
                for (let j = 0; j < strs[i].length; j++) {
                    let strsCell = strs[i][j];
                    if (j == 1) {
                        info.BasePos1_PosX = parseInt(strsCell);
                    } else if (j == 2) {
                        info.BasePos1_PosY = parseInt(strsCell);
                    }
                }
                tempArray.push(info);
            }
            Method.Base1Info = tempArray;
            this.CurLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        });
        //3
        cc.loader.loadRes('csv/Base2', (error, data) => {
            if (error) {
                console.log('load Base2 fail , message=' + error);
                return;
            }
            let strs: Array<string[]> = CSV.parse(data);
            let tempArray = new Array<BasePos>();
            for (let i = 1; i < strs.length; i++) {

                let info: BasePos = new BasePos();
                for (let j = 0; j < strs[i].length; j++) {
                    let strsCell = strs[i][j];
                    if (j == 1) {
                        info.BasePos2_PosX = parseInt(strsCell);
                    } else if (j == 2) {
                        info.BasePos2_PosY = parseInt(strsCell);
                    }
                }
                tempArray.push(info);
            }
            Method.Base2Info = tempArray;
            this.CurLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        });
        //4
        cc.loader.loadRes('csv/Base3', (error, data) => {
            if (error) {
                console.log('load Base3 fail , message=' + error);
                return;
            }
            let strs: Array<string[]> = CSV.parse(data);
            let tempArray = new Array<BasePos>();
            for (let i = 1; i < strs.length; i++) {

                let info: BasePos = new BasePos();
                for (let j = 0; j < strs[i].length; j++) {
                    let strsCell = strs[i][j];
                    if (j == 1) {
                        info.BasePos3_PosX = parseInt(strsCell);
                    } else if (j == 2) {
                        info.BasePos3_PosY = parseInt(strsCell);
                    }
                }
                tempArray.push(info);
            }
            Method.Base3Info = tempArray;
            this.CurLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        });
        //5
        cc.loader.loadRes('csv/Base4', (error, data) => {
            if (error) {
                console.log('load Base4 fail , message=' + error);
                return;
            }
            let strs: Array<string[]> = CSV.parse(data);
            let tempArray = new Array<BasePos>();
            for (let i = 1; i < strs.length; i++) {

                let info: BasePos = new BasePos();
                for (let j = 0; j < strs[i].length; j++) {
                    let strsCell = strs[i][j];
                    if (j == 1) {
                        info.BasePos4_PosX = parseInt(strsCell);
                    } else if (j == 2) {
                        info.BasePos4_PosY = parseInt(strsCell);
                    }
                }
                tempArray.push(info);
            }
            Method.Base4Info = tempArray;
            this.CurLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        });
        //6
        cc.loader.loadRes('csv/Base5', (error, data) => {
            if (error) {
                console.log('load Base5 fail , message=' + error);
                return;
            }
            let strs: Array<string[]> = CSV.parse(data);
            let tempArray = new Array<BasePos>();
            for (let i = 1; i < strs.length; i++) {

                let info: BasePos = new BasePos();
                for (let j = 0; j < strs[i].length; j++) {
                    let strsCell = strs[i][j];
                    if (j == 1) {
                        info.BasePos5_PosX = parseInt(strsCell);
                    } else if (j == 2) {
                        info.BasePos5_PosY = parseInt(strsCell);
                    }
                }
                tempArray.push(info);
            }
            Method.Base5Info = tempArray;
            this.CurLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        });
        //7
        cc.loader.loadRes('csv/StartBase', (error, data) => {
            if (error) {
                console.log('load StartBase fail , message=' + error);
                return;
            }
            let strs: Array<string[]> = CSV.parse(data);
            let tempArray = new Array<BasePos>();
            for (let i = 1; i < strs.length; i++) {
                let info: BasePos = new BasePos();
                for (let j = 0; j < strs[i].length; j++) {
                    let strsCell = strs[i][j];
                    if (j == 1) {
                        info.StartBase_PosX = parseInt(strsCell);
                    } else if (j == 2) {
                        info.StartBase_PosY = parseInt(strsCell);
                    }
                }
                tempArray.push(info);
            }
            Method.StartBase = tempArray;
            this.CurLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameInfo, this.CurLoad / this.loadResNum);
        });
    }

    NextInit() {
        if (this.NextResLoadSuccees) {
            console.log('图集加载完成');
            return;
        }
        // this.callbask = callbask;
        this.NextLoad = 0;
        this.NextLoadResNum = 15;
        //1
        cc.loader.loadRes('SubTexture/SubFruits/Coco', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load Coco fail , message=' + error);
                return;
            }
            Method.CocoAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //2
        cc.loader.loadRes('SubTexture/SubFruits/kiwi', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load kiwi fail , message=' + error);
                return;
            }
            Method.KiwiAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //3
        cc.loader.loadRes('SubTexture/SubFruits/lemon', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load lemon fail , message=' + error);
                return;
            }
            Method.LemonAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //4
        cc.loader.loadRes('SubTexture/SubFruits/mangosteen', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load mangosteen fail , message=' + error);
                return;
            }
            Method.MangosteenAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //5
        cc.loader.loadRes('SubTexture/SubFruits/orange', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load orange fail , message=' + error);
                return;
            }
            Method.OrangeAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //6
        cc.loader.loadRes('SubTexture/SubFruits/pawpaw', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load pawpaw fail , message=' + error);
                return;
            }
            Method.PawpawAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //7
        cc.loader.loadRes('SubTexture/SubFruits/pineapple', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load pineapple fail , message=' + error);
                return;
            }
            Method.PineappleAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //8
        cc.loader.loadRes('SubTexture/SubFruits/pomelo', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load pomelo fail , message=' + error);
                return;
            }
            Method.PomeloAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //9
        cc.loader.loadRes('SubTexture/SubFruits/Pass', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load Pass fail , message=' + error);
                return;
            }
            Method.PassAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //10
        cc.loader.loadRes('SubTexture/SubFruits/Pitaya', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load Pitaya fail , message=' + error);
                return;
            }
            Method.PitayaAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //11
        cc.loader.loadRes('SubTexture/SubFruits/Pear', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load Pear fail , message=' + error);
                return;
            }
            Method.PearAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //12
        cc.loader.loadRes('SubTexture/SubFruits/Apple', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load Apple fail , message=' + error);
                return;
            }
            Method.AppleAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //13
        cc.loader.loadRes('SubTexture/SubFruits/Pomegranate', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load Pomegranate fail , message=' + error);
                return;
            }
            Method.PomegranateAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })
        //14
        cc.loader.loadRes('SubTexture/SubFruits/Watermelon', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load Watermelon fail , message=' + error);
                return;
            }
            Method.WatermelonAtlas = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })

        //15
        cc.loader.loadRes('SubTexture/RecruitModel', cc.SpriteAtlas, (error, data) => {
            if (error) {
                console.log('load RecruitModel fail , message=' + error);
                return;
            }
            Method.RecruitModel = data;
            this.NextLoad++;
            EventManager.Instance.ExcuteListener(EventMessage.instance.GameResourcesInit, this.NextLoad / this.NextLoadResNum);
        })

    }
}
