import { _decorator, Node } from 'cc'
import { UIPnlErrorTipView } from './UIPnlErrorTipView'
import { UIBaseLogic } from '../../UIBaseLogic'
import { Lang } from '../../../../module/language/Lang'
import { UIMgr } from "../../UIMgr"
import { EnumUI,Music } from "../../../common/EnumUI"
// import { UIPnlGameHallLogic } from "../../../ui/gameHall/UIPnlGameHall/UIPnlGameHallLogic"
const { ccclass } = _decorator

export class UIPnlErrorTipLogic extends UIBaseLogic {
    public static prefabPath = "/prefab/ui/tips/PnlErrorTip"
    public _view: UIPnlErrorTipView
    public scene;
    public errorCode;
    public Init(id: string, go: Node) {
        this._view = new UIPnlErrorTipView(go)
        super.Init(id, go)

        // --------- your code
    }

    public setData(scene,code){
        this.scene = scene;
        this.errorCode = `Error_${code}`;
        this.initView();
    }

    public BindUIEvent() {
        this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back)
    }

    private async HandlerBtn_back() {
        // let logicIns: UIPnlGameHallLogic = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.GameHall, UIPnlGameHallLogic);
        this.scene.Destroy();
        this.Destroy();      
    }

    public initView(){
        this._view._TextC_illustrate.string = Lang.getText("Label_label83");
        this._view._TextC_title1.string = Lang.getText("Label_label84");
        this._view._TextC_title2.string = Lang.getText(this.errorCode);
        this._view._Btn_back.node.getChildByName("btn_label1");
    }

}
