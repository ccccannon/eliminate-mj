import { _decorator, Component, Node, sys, native } from 'cc';
import Base64Util from '../common/Base64Util';
import { LogUtil } from "../log/LogUtil"
import { INativeCaller } from "./INativeCaller";

const { ccclass, property } = _decorator;


export class NativeAndroid implements INativeCaller {

    private _activityName: string = "com/yang/androidaar/MainActivity" // 后面做混淆后, 需要动态修改这个方法
    private _argSign: string = "(Ljava/lang/String;Ljava/lang/String;)V"

    call(funcName: string, jsonMsg: string) {
        native.reflection.callStaticMethod(this._activityName, funcName, this._argSign, jsonMsg, funcName);
    }

    decode(data: string): string {
        return Base64Util.decodeString(data) // 因为 json 比较特殊, 所以在原生传过来的是 base64 编码之后的
    }
}