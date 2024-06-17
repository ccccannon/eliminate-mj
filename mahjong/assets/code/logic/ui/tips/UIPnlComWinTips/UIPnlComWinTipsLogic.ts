import { _decorator, Node } from 'cc'
import { UIPnlComWinTipsView } from './UIPnlComWinTipsView'
import { UIBaseLogic } from '../../UIBaseLogic'
import { INormalTipsData } from '../../TipsMgr'
import { LogUtil } from '../../../../module/log/LogUtil'
import { Tool } from '../../../../module/common/Tool'

export class UIPnlComWinTipsLogic extends UIBaseLogic {
    public static prefabPath = "/prefab/ui/tips/PnlComWinTips"
    public _view: UIPnlComWinTipsView
    private _callback: Function;


    public Init(id: string, go: Node) {
        this._view = new UIPnlComWinTipsView(go)
        super.Init(id, go)
    }

    public OnCreate() {
        this.ShowAnim(this._view._Nego_root)
    }

    public BindUIEvent() {
        this.BindUIEventClick(this._view._Btn_Ok.node, this.HandlerBtnOk)
        this.BindUIEventClick(this._view._Btn_Cancel.node, this.HandlerBtnCancel)
    }
    
    public SetData(data: INormalTipsData, callback?: Function){
        if (!data) return;
        if (data.title) {
            this._view._TextC_title.string = data.title
            this._view._TextC_title.node.active = true
        }else{
            this._view._TextC_title.node.active = false
        }

        if (data.msg) {
            this._view._TextC_content.string = data.msg
        }

        if (data.hideNo){
            this._view._Btn_Cancel.node.active = false
        }else {
            this._view._Btn_Cancel.node.active = true
        }

        if (data.okTxt) {
            Tool.SetBtnLabel(this._view._Btn_Ok, data.okTxt)
        }

        if (data.noTxt) {
            Tool.SetBtnLabel(this._view._Btn_Cancel, data.noTxt)
        }
        this._callback = callback
    }

    private HandlerBtnOk() {
        this._callback && this._callback(true)
        this.DestroyAnim()
    }
    
    private HandlerBtnCancel() {
        this._callback && this._callback(false)
        this.DestroyAnim()
    }

    private DestroyAnim() {
        this.HideAnim(this._view._Nego_root, this.Destroy.bind(this));
        this.Destroy();
    }
}
