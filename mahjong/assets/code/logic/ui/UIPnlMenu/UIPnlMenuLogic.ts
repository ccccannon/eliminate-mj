import { _decorator, director, Node } from 'cc'
import { UIPnlMenuView } from './UIPnlMenuView'
import { UIBaseLogic } from '../UIBaseLogic'
import { UIPnlTitleLogic } from '../UIPnlTitle/UIPnlTitleLogic'
import { EnumUI } from '../../common/EnumUI'
import { UIMgr } from '../UIMgr'
const { ccclass } = _decorator

export class UIPnlMenuLogic extends UIBaseLogic {
    public static prefabPath = "/prefab/ui/PnlMenu"
    public _view: UIPnlMenuView

    private titleLogic: UIPnlTitleLogic;

    public Init(id: string, go: Node) {
        this._view = new UIPnlMenuView(go)
        super.Init(id, go)

        // --------- your code
    }

    public BindUIEvent() {
        this.BindUIEventClick(this._view._Btn_introduce.node, this.HandlerBtn_introduce)
        this.BindUIEventClick(this._view._Btn_scoreRule.node, this.HandlerBtn_scoreRule)
        this.BindUIEventClick(this._view._Btn_sound.node, this.HandlerBtn_sound)
        this.BindUIEventClick(this._view._Btn_backTitle.node, this.HandlerBtn_backTitle)
        this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back)
    }

    private HandlerBtn_introduce() {
        console.log("玩法介绍");
    }

    private HandlerBtn_scoreRule() {
        console.log("得分规则");
    }

    private HandlerBtn_sound() {
        console.log("静音");
    }

    private async HandlerBtn_backTitle() {
        console.log("返回标题页");
        this.SetActive(false);
        if (this.titleLogic) {
            this.titleLogic.SetActive(true);
        } else {
            this.titleLogic = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Title, UIPnlTitleLogic);
        }
    }

    private HandlerBtn_back() {
        this.SetActive(false);
        director.emit("stopCountDown", false);
    }

}
