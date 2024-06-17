import { _decorator, Component, Node, EventTouch } from 'cc';
import { LogUtil } from '../../module/log/LogUtil';
const { ccclass, property } = _decorator;

export class EventSys {
    private static eventMap = new Map<string, Array<EventInfo>>()

    public static Reg(id: string, cb: Function, lv?: number): void {
        let ei: EventInfo = null

        let infoArr = this.eventMap.get(id)
        if (!infoArr) {
            infoArr = new Array<EventInfo>()
            this.eventMap.set(id, infoArr)
        } else {
            for (let item of infoArr) {
                if (!item.isActive) { // 找到未使用的
                    ei = item
                    break
                }
            }
        }

        if (!ei) {
            ei = new EventInfo()
            infoArr.push(ei)
        }

        ei.lv = lv != null ? lv : 0
        ei.cb = cb
        ei.isActive = true

        infoArr.sort((a, b) => { return a.lv - b.lv })
    }

    public static UnReg(id: string, cb: Function): void {
        let infoArr = this.eventMap.get(id)
        if (!infoArr)
            return

        for (let item of infoArr) {
            if (item.cb == cb) {
                item.isActive = false
                item.cb = null
            }
        }
    }

    public static Fire(id: string, ...args: any[]): void {
        let infoArr = this.eventMap.get(id)
        if (!infoArr)
            return

        for (let item of infoArr) {
            if (item.isActive && item.cb != null) {
                item.cb(...args)
            }
        }
    }

    // 防止一直堆积, 提供去除无用对象接口
    public static Shrink() {
        // TODO: web 暂时未做
    }

    public static DebugDump() {
        LogUtil.D(`--- DebugDump, eventMap: ${this.eventMap.size}`)
        this.eventMap.forEach((eiArr, key) => {
            LogUtil.D(`--------- id: ${key}, count: ${eiArr.length}`)
            eiArr.forEach((ei, idx) => {
                LogUtil.D(`--- isActive: ${ei.isActive}, cb is null: ${ei.cb == null}`)
            })
        })
    }
}

class EventInfo {
    lv: number
    isActive: boolean
    cb: Function
}
