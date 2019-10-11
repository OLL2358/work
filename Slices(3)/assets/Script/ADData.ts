/**
 * 广告数据
 */
export default class ADData {
    private static _instance: ADData;
    public static get instance(): ADData {
        if (!this._instance) {
            this._instance = new ADData();
        }
        return this._instance;
    }

    public link = "https://pt.qingpeng438.com/public/oss/qq/";

    public AdData = [
        {
            //0
            mode: 'link',
            appName: '坦克打方块',
            appIcon: '1',
            appId: 'wx349141b6ae884e2c',
            path: '',
            imageUrl: ''
        },
        {
            //1
            mode: 'link',
            appName: '十点消你',
            appIcon: '2',
            appId: 'wx9dab060c780df55d',
            path: '',
            imageUrl: ''
        },
        {
            //2
            mode: 'link',
            appName: '数字连线王者',
            appIcon: '3',
            appId: 'wxe50b4b3637774d2a',
            path: '',
            imageUrl: ''
        },
        {
            //3
            mode: 'link',
            appName: '疯狂的球球正版',
            appIcon: '4',
            appId: 'wxa69b5981432ef11e',
            path: '',
            imageUrl: ''
        },
        {
            //4
            mode: 'link',
            appName: '扫楼大作战',
            appIcon: '5',
            appId: 'wxcd8255e82c0ba6a4',
            path: '?release_id=151',
            imageUrl: ''
        },

        {
            //5
            mode: 'link',
            appName: '3D蹦蹦球',
            appIcon: '6',
            appId: 'wxfaf45fd2c0462504',
            path: '',
            imageUrl: ''
        },
        {
            //6
            mode: 'link',
            appName: '屠神',
            appIcon: '7',
            appId: 'wx684491e7f1643c2e',
            path: '?channel=1001847',
            imageUrl: ''
        },
        {
            //7
            mode: 'link',
            appName: '疯狂的球球2',
            appIcon: '8',
            appId: 'wx6427f4065136b5ac',
            path: '',
            imageUrl: ''
        },
        {
            //8
            mode: 'link',
            appName: '仙灵正传',
            appIcon: '9',
            appId: 'wx4dbeed83554df77e',
            path: '?tid=10001',
            imageUrl: ''
        },
        {
            //9
            mode: 'link',
            appName: '消灭脂肪',
            appIcon: '10',
            appId: 'wxbd863ac2799a3043',
            path: '',
            imageUrl: ''
        },
        {
            //10
            mode: 'image',
            appName: '斗破修仙',
            appIcon: '11',
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner6QC.jpg?time=' + new Date().getTime()
        },
        {
            //11
            mode: 'link',
            appName: '小小三国志',
            appIcon: '12',
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner4QC.jpg?time=' + new Date().getTime()
        },
        {
            //12
            mode: 'link',
            appName: '皇上吉祥2',
            appIcon: '13',
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner7QC.jpg?time=' + new Date().getTime()
        },
        {
            //13
            mode: 'link',
            appName: '封神来了',
            appIcon: '14',
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner9QC.jpg?time=' + new Date().getTime()
        },
    ];
    public bannerData = [
        {
            //0
            mode: 'image',
            appName: '斗破修仙',
            appIcon: this.link + 'Banner6.jpg?time=' + new Date().getTime(),
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner6QC.jpg?time=' + new Date().getTime()
        },
        {
            //1
            mode: 'link',
            appName: '小小三国志',
            appIcon: this.link + 'Banner4.jpg?time=' + new Date().getTime(),
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner4QC.jpg?time=' + new Date().getTime()
        },
        {
            //2
            mode: 'link',
            appName: '皇上吉祥2',
            appIcon: this.link + 'Banner7.jpg?time=' + new Date().getTime(),
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner7QC.jpg?time=' + new Date().getTime()
        },
        {
            //3
            mode: 'link',
            appName: '封神来了',
            appIcon: this.link + 'Banner9.jpg?time=' + new Date().getTime(),
            appId: '',
            path: '',
            imageUrl: this.link + 'Banner9QC.jpg?time=' + new Date().getTime()
        },
    ];
    public NewAdData;
}
