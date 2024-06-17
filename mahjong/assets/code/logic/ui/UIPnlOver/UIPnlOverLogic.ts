import { _decorator, director, Node } from 'cc'
import { UIPnlOverView } from './UIPnlOverView'
import { UIBaseLogic } from '../UIBaseLogic'
import { MahjongData } from '../MahjongData'
const { ccclass } = _decorator

export class UIPnlOverLogic extends UIBaseLogic {
    public static prefabPath = "/prefab/ui/PnlOver"
    public _view: UIPnlOverView

    public Init(id: string, go: Node) {
        this._view = new UIPnlOverView(go)
        super.Init(id, go)

        // --------- your code
    }

    public BindUIEvent() {
        this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back)
        this.BindUIEventClick(this._view._Btn_newGame.node, this.HandlerBtn_newGame)
    }

    private HandlerBtn_back() {
        this.SetActive(false);
    }

    private HandlerBtn_newGame() {
        this.SetActive(false);
        director.emit("newGame");
    }

    /** 设置结算信息 */
    setOverInfo() {
        const score = MahjongData.getInstance().curentScore;
        const count = MahjongData.getInstance().mahjongRoot.getChildByName("LayC_content").children.filter(v => v.active == true).length;
        console.log("设置结算信息", count);
        this._view._TextC_score.string = `得分：${score}`;
        const value = ((144 - count) / 144 * 100).toFixed(2);
        this._view._TextC_complete.string = `完成度${value}%   ${Number(value) * 100}`;
        this._view._TextC_endScore.string = `最终得分：${score + Number(value) * 100}`;
    }

}
