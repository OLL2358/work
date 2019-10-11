export default class CSV {
    private static readonly CELL_DELIMITERS = [';', ','];
    private static readonly LINE_DELIMITERS = ['\n', '\r'];

    private static cellParse(data: string[]): string[][] {

        let strs = new Array<string[]>();
        for (let i = 0; i < this.CELL_DELIMITERS.length; i++) {

            for (let j = 0; j < data.length; j++) {

                let dataCell = data[j].split(this.CELL_DELIMITERS[i]);
                /* let dataCell = Utility.splitString(data[j], this.CELL_DELIMITERS[i]);*/
                if (dataCell.length <= 1) {
                    break;
                }
                strs.push(dataCell);
            }
            if (strs.length > 0) {
                return strs;
            }
        }
        return strs;
    }

    private static lineParse(data: string): Array<string> {
        let strs = new Array<string>();
        for (let i = 0; i < this.LINE_DELIMITERS.length; i++) {
            try {
                strs = data.split(this.LINE_DELIMITERS[i]);
            } catch (error) {
                console.log(' error.message:', error.message, 'error.name:', error.name, 'error.stork:', error.stack);
            };
            /* strs = Utility.splitString(data, this.LINE_DELIMITERS[i]);*/
            if (strs.length > 0) {
                return strs;
            }
        }
        return strs;
    }

    public static parse(data: string) {

        let strs = this.lineParse(data);
        return this.cellParse(strs);
    }
}