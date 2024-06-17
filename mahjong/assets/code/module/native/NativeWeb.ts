import { _decorator, Component, sys } from "cc"
import { LogUtil } from "../log/LogUtil"
import { INativeCaller } from "./INativeCaller";

const { ccclass, property } = _decorator;


export class NativeWeb implements INativeCaller {
    call(funcName: string, jsonMsg: string) {
        throw new Error("--- NativeWeb Method not implemented. call");
    }

    decode(data: string): string {
        throw new Error("--- NativeWeb Method not implemented. decode");
    }
}