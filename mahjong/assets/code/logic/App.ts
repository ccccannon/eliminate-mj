import { dynamicAtlasManager, director } from "cc"
// import { DebugDraw } from "../module/debug/DebugDraw"
import { Lang, LanguageList } from "../module/language/Lang"
import { LogUtil } from "../module/log/LogUtil"
import { ResMgr } from "../module/res/ResMgr"
import { AudioMgr } from "./audio/AudioMgr"
import { ConfigMgr } from "./common/ConfigMgr"
import { EnumUI } from "./common/EnumUI"
import { DataMgr } from "./data/DataMgr"
// import { HttpMgr } from "./net/HttpMgr"
// import { NetConfig } from "./net/NetConfig"
// import { NetErrCodeMgr } from "./net/NetErrCodeMgr"
// import { PlatformMgr } from "./platform/PlatformMgr"
import { TipsManager } from "./ui/TipsMgr"
import { UIMgr } from "./ui/UIMgr"
import { EnumNative } from "./common/EnumNative"
import { UIPnlMahjongLogic } from "./ui/UIPnlMahjong/UIPnlMahjongLogic"
import { UIPnlSystemLogic } from "./ui/UIPnlSystem/UIPnlSystemLogic"

export class App {
    public static Ins: App

    constructor() {
        App.Ins = this

        dynamicAtlasManager.enabled = false; // -- 禁止动态合图

        // PlatformMgr.Ins = new PlatformMgr()
        // HttpMgr.Ins = new HttpMgr()
        ResMgr.Ins = new ResMgr()
        UIMgr.Ins = new UIMgr()
        ConfigMgr.Ins = new ConfigMgr()
        // NetErrCodeMgr.Ins = new NetErrCodeMgr()
        AudioMgr.Ins = new AudioMgr()
        DataMgr.Ins = new DataMgr()
        TipsManager.Ins = new TipsManager()
        // NetConfig.Ins = new NetConfig()
    }

    async start() {
        // LogUtil.D("--- app start")

        // await PlatformMgr.Ins.Start()
        // await ConfigMgr.Ins.Start()
        await UIMgr.Ins.start()
        await AudioMgr.Ins.init()
        // await Lang.Start(LanguageList.en_us)
        // await NetErrCodeMgr.Ins.Init()
        this.ShowLogin()
        // this.ShowDebugDraw()

        // await PlatformMgr.callNativeFn(EnumNative.HideSplash)
    }
    // 暂时先写在这
    async ShowLogin() {
        await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Mahjong, UIPnlMahjongLogic);
        await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.SystemLogic, UIPnlSystemLogic);
    }

    // async ShowDebugDraw() {
    //     DebugDraw.Ins.ShowDebugDraw()
    // }
}