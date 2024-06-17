import { _decorator, director, Node } from 'cc'
import { UIPnlTitleView } from './UIPnlTitleView'
import { UIBaseLogic } from '../UIBaseLogic'
const { ccclass } = _decorator

export class UIPnlTitleLogic extends UIBaseLogic {
    public static prefabPath = "/prefab/ui/PnlTitle"
    public _view: UIPnlTitleView

    public Init(id: string, go: Node) {
        this._view = new UIPnlTitleView(go)
        super.Init(id, go)

        // --------- your code
    }

    public BindUIEvent() {
        this.BindUIEventClick(this._view._Btn_newGame.node, this.HandlerBtn_newGame)
        this.BindUIEventClick(this._view._Btn_continue.node, this.HandlerBtn_continue)
        this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back)
    }

    private HandlerBtn_newGame() {
        this.SetActive(false);
        director.emit("newGame");
    }

    private HandlerBtn_continue() {
        this.SetActive(false);
        director.emit("stopCountDown", false);
    }

    private HandlerBtn_back() {
        this.SetActive(false);
        director.emit("stopCountDown", false);
    }

}
