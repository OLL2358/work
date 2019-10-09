
export default class GameHelper {
    private static instance: GameHelper;
    public static get Instance(): GameHelper {
        if (this.instance == null) {
            this.instance = new GameHelper();
        }
        return this.instance;
    }

    //保留小数点后两位
    keepTwoDecimalFull(num: number) {
        var result = parseFloat(num.toString());
        if (isNaN(result)) {
            console.log("keepTwoDecimalFull。。。fail");
            return;
        }
        result = Math.round(num * 100) / 100;
        var s_x = result.toString();
        var pos_decimal = s_x.indexOf(".");
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += ".";
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    }

    /**
     * 传入积分段,返回一个敌方加的分数
     * @param Score 
     */
    public EnemyAddNum(Score: number) {
        let rank = this.GetRank(Score);
        if (Math.random() >= this.GetRank(rank))
            return 0;
        let retScore = Math.floor(Math.random() * (rank + 3)) + Math.floor(Math.random() * (rank + 3));
        if (retScore == 1)
            retScore = 2;
        return retScore;
    }

    GetRank(score: number) {
        if (score < 100)
            return 0;
        else if (score < 500)
            return 1;
        else if (score < 1000)
            return 2;
        else if (score < 2000)
            return 3;
        else if (score < 5000)
            return 4;
        else if (score < 10000)
            return 5;
        else if (score < 20000)
            return 6
        else
            return 7;
    }

    AIWinPercent(rank: number) {
        return rank * 0.05 + 0.3;
    }
}
