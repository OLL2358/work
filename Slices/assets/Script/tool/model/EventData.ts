/*点击数据类*/
export default class EventData {
    public event: (...params: any[]) => void = null;
    public params: any[];
    public hasSound: boolean = true;
}