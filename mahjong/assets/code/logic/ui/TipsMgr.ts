import { Component, isValid } from "cc";
import { LogUtil } from "../../module/log/LogUtil";
import { TimerMgr } from "../../module/timer/TimerMgr";
import { EnumUI } from "../common/EnumUI";
import { PnlComTextTips } from "./tips/PnlComTextTips";
import { UIPnlComWinTipsLogic } from "./tips/UIPnlComWinTips/UIPnlComWinTipsLogic";
import { PnlWaittingLogic } from "./tips/PnlWaittingLogic";
import { ECanvas, UIMgr } from "./UIMgr";
import { UIBaseLogic } from "./UIBaseLogic";


export class TipsManager extends Component {
    public static Ins: TipsManager;
    public _creatingWaitUI = false;
    public _closingWaitUI = false;
    public _waitUI: UIBaseLogic = null;

    /** 创建网络不稳定提示 */
    private async CreateWaitting() {
        if (!UIMgr.Ins.GetLogicIns(EnumUI.Waitting)) {
            let canvasTrans = UIMgr.Ins.GetCanvasNode(ECanvas.LayerTop)
            this._waitUI = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Waitting, PnlWaittingLogic, canvasTrans)
            // 创建期间被关了
            this._waitUI.Hide()
            LogUtil.D("创建成功this._waitUI")
        }
    }

    private HideWaittingUI() {
        if (isValid(this._waitUI)) {
            this._waitUI.Hide();
        }
    }

    private ShowWaittingUI() {
        if (this._closingWaitUI) return
        if (isValid(this._waitUI)) {
            this._waitUI.Show();
            this._closingWaitUI = false;
        }
    }

    /** 转菊花, 默认十五秒后关闭 
     * @param time 时长
     * @param delay 延时
    */
    public async ShowWaitting(time?: number, delay?: number) {
        this.unschedule(this.HideWaittingUI);
        this.unschedule(this.ShowWaittingUI);
        if (!time) time = 15
        // 设定延时，取消也会相应延后
        if (delay) {
            time += delay;
        }
        if (isValid(this._waitUI)) {
            this._closingWaitUI = false;
            this.schedule(this.HideWaittingUI, time, 0);
            this.schedule(this.ShowWaittingUI, delay, 0);
            return;
        } else {
            this._creatingWaitUI = true;
            this._closingWaitUI = false;
            await this.CreateWaitting()
            this._creatingWaitUI = false;
            this.schedule(this.HideWaittingUI, time, 0);
            this.schedule(this.ShowWaittingUI, delay, 0);
        }
    }

    /** 网络恢复 */
    public CloseWaitting() {
        this._closingWaitUI = true
        this.unschedule(this.ShowWaittingUI);
        this.unschedule(this.HideWaittingUI);
        this.HideWaittingUI();
    }

    /**
     * 飘字提示
     * @param content 文本内容
     */
    public async ShowTextTips(content: string) {
        if (!content) return
        let canvasTrans = UIMgr.Ins.GetCanvasNode(ECanvas.LayerTop)
        let tipsIns: PnlComTextTips = await UIMgr.Ins.CreateWindowAutoAsync(PnlComTextTips, canvasTrans)
        tipsIns.SetContent(content)
    }

    /**
     * 公共弹窗
     */
    public OpenNormalTips(data: INormalTipsData) {
        return new Promise<boolean>(async (resolve) => {
            let operate: INormalTipsData = {
                title: data.title ? data.title : "",
                msg: data.msg,
                okTxt: data.okTxt ? data.okTxt : "OK",
                noTxt: data.noTxt ? data.noTxt : "No",
                hideNo: data.hideNo ? data.hideNo : false,
            }
            let cbFunc = (result: boolean) => {
                resolve(result);
            }
            let tipsIns = UIMgr.Ins.GetLogicIns(EnumUI.NormalTips) as UIPnlComWinTipsLogic
            if (!tipsIns) {
                let canvasTrans = UIMgr.Ins.GetCanvasNode(ECanvas.LayerTop)
                let logicIns: UIPnlComWinTipsLogic = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.NormalTips, UIPnlComWinTipsLogic, canvasTrans)
                logicIns.SetData(operate, cbFunc)
            } else {
                tipsIns.SetData(operate, cbFunc)
            }
        })
    }
}

export interface INormalTipsData {
    title?: string,
    msg?: string,
    okTxt?: string,
    noTxt?: string,
    hideNo?: boolean,
}