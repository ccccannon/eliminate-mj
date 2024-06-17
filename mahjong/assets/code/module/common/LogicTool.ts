import { Node, Prefab, instantiate, director, sys } from "cc";
import { Prefs } from "../../logic/common/EnumCommon";
import { localStorageMgr } from "../../logic/common/LocalStorageMgr";
import { LogUtil } from "../log/LogUtil";
import { ResMgr } from "../res/ResMgr";
import { UIMgr } from '../../logic/ui/UIMgr'
import { EnumUI } from "../../logic/common/EnumUI";
// import { UIPnlGmLogic } from "../../logic/ui/gm/UIPnlGm/UIPnlGmLogic";

export class LogicTool {

    public static GetVersion() {
        return '1.0.1.21'
    }

    public static GetOs() {
        LogUtil.D('sys.os 当前运行系统', sys.os)
        if (sys.os == sys.OS.IOS || sys.os == sys.OS.OSX) {
            return 1;
        }else if (sys.os == sys.OS.ANDROID){
            return 2;
        } else if (sys.os == sys.OS.WINDOWS) {
            return 3;
        } else {
            return 0;
        }
    }

    public static GetDynamicPlatId() {
        return 201
    }

    public static IsOpenGuest() {
        return true
    }

    public static GetDeviceID() {
        let uuid = localStorageMgr.get(Prefs.MMuuid);
        if (!uuid) {
            let d = new Date().getTime();
            const uuidTmpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            uuid = uuidTmpl.replace(/[xy]/g, (c) => {
                const r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            localStorageMgr.set(Prefs.MMuuid, uuid);
        }
        return uuid;
    }

    public static IsNeedOpenBigWin(bet: number, win: number) {
        return false
    }

    public static OpenSlotsBigWinPanel(bet: number, win: number, onClose?: Function) {
        // TODO ZGS 补充big win
        if (onClose != null) onClose()
    }

    public static GetFormatNumber(value: number, pointCnt?: number, noSymbol?: boolean) {
        //LogUtil.D(`${value}`)
        if (pointCnt == null) pointCnt = 2
        if (noSymbol == null) noSymbol = false
        // 保留了指定小数位
        let tempStr = new Number(value).toFixed(pointCnt)
        let tempArr = tempStr.split(".") // 保存小数位
        tempStr = tempArr[0] // 整数部分

        let numStr = new Number(tempStr).toLocaleString() // 整数部分千分位分割
        if (tempArr[1]) numStr = `${numStr}.${tempArr[1]}`
        if(noSymbol) numStr = this.GetMoneySymbol() + numStr
        
        //LogUtil.D(numStr)
        return numStr
    }

    // 取货币货号
    public static GetMoneySymbol() {
        //TODO ZGS 货币符号先写死
        return "R"
    }
}
