import ShareLimit from './ShareTheLimit';

export default class Utility {
    /**
     * 获取屏幕尺寸
     */
    public static getScreenSize(): cc.Size {
        return cc.director.getWinSize();
    }
    public static log(message?: any, ...params: any[]) {
        if (Utility.isQQPlay()) {
            BK.Console.log(message, params);
            return;
        }

        if (ShareLimit.getNeedLog()) {
        } else if (window.wx != undefined) {
        }

        console.log(message, params);
    }


    public static removeSelf(node: cc.Node) {
        node.removeFromParent(true);
        node.destroy();
    }
    public static error(message?: any, ...params: any[]) {
        if (Utility.isQQPlay()) {
            BK.Console.error(message, params);
            return;
        }

        console.error(message, params);
    }

    public static isQQPlay() {
        return cc.sys.platform == cc.sys.QQ_PLAY;
    }

    // true: 没有接入 微信, 玩一玩
    public static invalidSDK() {
        if (window.wx == undefined && !Utility.isQQPlay()) {
            return true;
        }
        return false;
    }
    public static validSDK() {
        return !Utility.invalidSDK();
    }

    public static isWX() {
        return !!window.wx;
    }

    /**
     * 往左补零
     */
    public static paddingLeft(num: number, n: number) {
        return (Array(n).join('0') + num).slice(-n);
    }
}
