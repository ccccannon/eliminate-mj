import { macro } from 'cc';
// import { Long } from 'protobufjs';
import { Tool } from '../../module/common/Tool';
import { EventSys } from '../../module/event/EventSys';
import { LogUtil } from "../../module/log/LogUtil";
import { TimerMgr } from '../../module/timer/TimerMgr';
import { EnumEvent } from '../common/EnumEvent';

export class OtherData {
    public static Ins: OtherData

    protected _serverTime: number = null
    protected _serverTimeTimer: string = null
    protected _todayOutTime: number = null

    constructor(){
        LogUtil.D('Init OtherData');
    }

    public GetServerTime() {
        return this._serverTime
    }

    // public SetServerTime(serverTime: number | Long) {
    //     this._serverTime = Tool.GetNumberFromLong(serverTime)
    //     this.RefreshTodayOutTime()
    //     this.AddServerTimeTimer()
    // }

    public AddServerTimeTimer() {
        this.RemoveServerTimeTimer()
        this._serverTimeTimer = TimerMgr.Ins.AddTimer(1, () => {
            this.HandleServerTime()
        }, macro.REPEAT_FOREVER)
    }

    public RemoveServerTimeTimer() {
        if(this._serverTimeTimer != null) {
            TimerMgr.Ins.RemoveTimer(this._serverTimeTimer)
            this._serverTimeTimer = null
        }
    }

    public HandleServerTime() {
        this._serverTime += 1
        if (this._todayOutTime > 0 && this._serverTime >= this._todayOutTime) {
            EventSys.Fire(EnumEvent.TodayOut)
            this.RefreshTodayOutTime()
        }
    }

    public RefreshTodayOutTime() {
        this._todayOutTime = Math.floor(this._serverTime / (60 * 60 * 24)) * (60 * 60 * 24) + (60 * 60 * 24)
    }
    
    public Clear() {
        this.RemoveServerTimeTimer()
    }

}
