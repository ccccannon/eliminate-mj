import { _decorator, Component, Node, EventTouch } from 'cc';
import { LogUtil } from '../log/LogUtil';
const { ccclass, property } = _decorator;

// 参考: https://docs.cocos.com/creator/manual/zh/scripting/scheduler.html

@ccclass('TimerMgr')
export class TimerMgr extends Component {
    public static Ins: TimerMgr

    private _autoId: number = 0
    private _timerMap = new Map<string, Function>()
    private _updateMap = new Map<string, Function>()
    private _intervalMap= new Map();
    private _timeoutMap = new Map();

    onLoad() {
        TimerMgr.Ins = this
    }

    update(dt: number) {
        this._updateMap.forEach((cb, key, m) => {
            cb(dt)
        })
    }
    public AddInterval(cb:Function,time:number){
        let id = setInterval(cb,time);
        this._intervalMap.set(id, cb);
        return id;
    }

    public removeInterval(id){
        let fn = this._intervalMap.get(id)
        if (fn) {
            clearInterval(id);
            this._intervalMap.delete(id);
        }        
    }

    public Addtimeout(cb:Function,time:number){
        let id = setTimeout(cb,time);
        this._timeoutMap.set(id, cb);
        return id;        
    }

    public removeTimeout(id){
        let fn = this._timeoutMap.get(id)
        if (fn) {
            clearTimeout(id);
            this._timeoutMap.delete(id);
        }         
    }
    public AddTimer(sec: number, cb: Function, repeat?: number, delay?: number): string {
        let id = `${++this._autoId}`
        this._timerMap.set(id, cb)
        this.schedule(cb, sec, repeat, delay)
        // this.schedule(this.fn01, 1, 3, 5) // 5s 后开始执行 1 次, 重复 3 次, 共 4 次
        return id
    }

    public SetTimeout(sec: number, cb: Function): string {
        let id = this.AddTimer(sec, () => {
            this.RemoveTimer(id)
            cb()
        })
        // this.scheduleOnce(wrapFn, sec) // 貌似无法移除, 所以不能使用
        return id
    }

    public RegUpdate(cb: (dt: number) => void): string {
        let id = `${++this._autoId}`
        this._updateMap.set(id, cb)
        return id
    }

    public UnRegUpdate(id: string) {
        this._updateMap.delete(id)
    }

    public RemoveTimer(id: string) {
        let fn = this._timerMap.get(id)
        if (fn) {
            this.unschedule(fn)
            this._timerMap.delete(id)
        }
    }

    public RemoveAll() {
        this.unscheduleAllCallbacks()
        this._timerMap.clear()
    }

    public DebuDump() {
        // LogUtil.D(`--- DebugDump, timerMap:`, this._timerMap)
        // LogUtil.D(`--- DebugDump, updateMap:`, this._updateMap)
        LogUtil.D(`--- DebugDump, _intervalMap:`, this._intervalMap);
        LogUtil.D(`--- DebugDump, _timeoutMap:`, this._timeoutMap);
        for (let key of this._intervalMap.keys()) {
            console.log("_intervalMap Key = ",key);                  
        }
        for (let key of this._timeoutMap.keys()) {
            console.log("_timeoutMap Key = ",key);                  
        }
    }

    public removeAll(){
        for (let key of this._intervalMap.keys()) {
            clearInterval(key);                
        }
        for (let key of this._timeoutMap.keys()) {
            clearTimeout(key);               
        }
    }
}

