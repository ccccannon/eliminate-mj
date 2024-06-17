//======================================================================
// description: native 管理类
//======================================================================

import { _decorator, Component, sys } from "cc"
import Base64Util from "../common/Base64Util";
import { Tool } from "../common/Tool";
import { LogUtil } from "../log/LogUtil"
import { INativeCaller } from "./INativeCaller";
import { NativeAndroid } from "./NativeAndroid";
import { NativeIos } from "./NativeIos";
import { NativeWeb } from "./NativeWeb";

const { ccclass, property } = _decorator;

type DlgNativeCb = (msg: string, isSucc: boolean) => void

export class NativeMgr {
    public static Ins: NativeMgr

    private mCallMap = new Map<string, DlgNativeCb>
    private mPersistCallMap = new Map<string, DlgNativeCb>
    private mCaller: INativeCaller

    Start() {
        NativeMgr.Ins = this

        // 注册一个全局方法
        window["gOnAndroidCall"] = this.onNativeCall.bind(this)
        window["gOnAndroidPerCall"] = this.onNativePerCall.bind(this)
    }

    public setCaller(caller: INativeCaller) {
        this.mCaller = caller
    }

    // 被 native 调用的接口
    private onNativeCall(data: string, isSucc: boolean = true) {
        data = this.mCaller.decode(data)
        let pd: IPlatformData = JSON.parse(data)
        let cb = this.mCallMap.get(pd.func)
        if (!cb)
            return

        this.mCallMap.delete(pd.func)
        cb(pd.msg, isSucc)
    }


    // 被 native 调用的接口
    private onNativePerCall(data: string, isSucc: boolean = true) {
        data = this.mCaller.decode(data)
        let pd: IPlatformData = JSON.parse(data)
        let cb = this.mPersistCallMap.get(pd.func)
        if (!cb)
            return

        cb(pd.msg, isSucc)
    }

    public callNativeFunc(cb: DlgNativeCb, funcName: string, jsonMsg: string = "{}") {
        // LogUtil.D(`--- CallNativeFunc, funcName: ${funcName}, jsonMsg: ${jsonMsg}`);
        if (cb) {
            this.mCallMap.set(funcName, cb)
        }

        try {
            this.mCaller.call(funcName, jsonMsg)
        } catch (ex) {
            // 调用失败要回调给逻辑层层
            let pd: IPlatformData = {
                func: funcName,
                msg: `NativeCallErr, funcName: ${funcName} err: ${ex}`
            }
            this.onNativeCall(JSON.stringify(pd), false)
        }
    }

    public cancelFunc(funcName: string) {
        this.mCallMap.delete(funcName)
    }

    public regPersistFunc(cb: DlgNativeCb, funcName: string) {
        this.mPersistCallMap.set(funcName, cb);
    }

    public cancelPersistFunc(funcName: string) {
        this.mPersistCallMap.delete(funcName)
    }
}


interface IPlatformData {
    func: string
    msg: string
}