import { _decorator, director, EventKeyboard, Input, input, KeyCode, Label, Node, sys, tween, UIOpacity, v3 } from 'cc'
import { UIPnlSystemView } from './UIPnlSystemView'
import { UIBaseLogic } from '../UIBaseLogic'
import { MahjongData } from '../MahjongData'
import { MahjongUtils } from '../MahjongUtils'
import { INormalTipsData, TipsManager } from '../TipsMgr'
import { Tool } from '../../../module/common/Tool'
import { UIPnlMenuLogic } from '../UIPnlMenu/UIPnlMenuLogic'
import { UIMgr } from '../UIMgr'
import { EnumUI } from '../../common/EnumUI'
import { MahjongTile, Suit } from '../MahjongConstant'
const { ccclass } = _decorator

export class UIPnlSystemLogic extends UIBaseLogic {
    public static prefabPath = "/prefab/ui/PnlSystem"
    public _view: UIPnlSystemView

    private menuLogic: UIPnlMenuLogic;

    public Init(id: string, go: Node) {
        this._view = new UIPnlSystemView(go)
        super.Init(id, go)

        // --------- your code
    }

    public BindUIEvent() {
        this.BindUIEventClick(this._view._Btn_hint.node, this.HandlerBtn_hint)
        this.BindUIEventClick(this._view._Btn_menu.node, this.HandlerBtn_menu)
        this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back)

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        director.on("moveCursor", this.onMoveCursor, this);
    }

    public OnDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        director.off("moveCursor", this.onMoveCursor, this);
    }

    /** 提示 */
    private HandlerBtn_hint() {
        let list: number[][][] = MahjongData.getInstance().clickList;
        let valueList = [];
        for (let i = 0; i < 5; i++) {
            list[i].forEach((v, j) => {
                let node = MahjongData.getInstance().getCardNode(i + 1, v[0], v[1]);
                let str = node.getChildByName("TextC_card").getComponent(Label).string;
                valueList.push(str);
            })

        }
        let cardValueList = MahjongUtils.getCardValue(valueList);
        let tipText = "";
        for (let i in cardValueList) {
            let val = Math.floor(Number(cardValueList[i]) / 2);
            if (val > 0) {
                tipText = i;
                break;
            }
        }
        let count = 0;
        for (let i = 0; i < 5; i++) {
            list[i].forEach((v, j) => {
                let node = MahjongData.getInstance().getCardNode(i + 1, v[0], v[1]);
                let str = node.getChildByName("TextC_card").getComponent(Label).string;
                const group1 = ['春', '夏', '秋', '冬'];
                const group2 = ['梅', '兰', '竹', '菊'];
                if (group1.includes(tipText) && group1.includes(str)
                    || group2.includes(tipText) && group2.includes(str)) {
                    count++;
                    this.playHintAnim(node, count);
                } else if (str == tipText) {
                    count++;
                    this.playHintAnim(node, count);
                }
            })

        }
    }

    /** 菜单 */
    private async HandlerBtn_menu() {
        if (this.menuLogic) {
            this.menuLogic.SetActive(true);
        } else {
            this.menuLogic = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Menu, UIPnlMenuLogic);
        }
        director.emit("stopCountDown", true);
    }

    /** 返回 */
    private HandlerBtn_back() {
        let data: INormalTipsData = {
            title: "",
            msg: "是否要退出游戏（退出游戏时将自动保存目前进度）",
            okTxt: "返回",
            noTxt: "退出",
        }
        TipsManager.Ins.OpenNormalTips(data).then((result) => {
            director.emit("stopCountDown", false);
            let text = result ? "返回" : "退出";
            console.log(text);
            if (!result) {
                MahjongData.getInstance().saveUserData();
            }
        })
        director.emit("stopCountDown", true);
    }

    /** 提示动画 */
    playHintAnim(node: Node, index: number) {
        if (index > 2) return;
        let pos = node.getPosition();
        let tipNode = MahjongData.getInstance().mahjongRoot.getChildByName("tipNode");
        let curNode = index == 1 ? tipNode.getChildByName("Nego_hint1") : tipNode.getChildByName("Nego_hint2");
        curNode.setPosition(v3(pos.x, pos.y))
        curNode.active = true;
        let uiOpacity = curNode.getComponent(UIOpacity);
        uiOpacity.opacity = 255;
        tween(uiOpacity)
            .to(0.15, { opacity: 0 }, { easing: "backIn" })
            .to(0.15, { opacity: 255 }, { easing: "backIn" })
            .to(0.15, { opacity: 0 }, { easing: "backIn" })
            .to(0.15, { opacity: 255 }, { easing: "backIn" })
            .to(0.15, { opacity: 0 }, { easing: "backIn" })
            .start();
    }

    /** 移动光标 */
    onMoveCursor() {
        MahjongData.getInstance().isHint = true;
        this._view._Btn_hint.node.getChildByName("tip").active = true;
    }

    /** 键盘按下事件 */
    onKeyDown(event: EventKeyboard) {
        if (!MahjongData.getInstance().isHint) return;
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_LEFT:
                MahjongData.getInstance().isHint = false;
                this._view._Btn_hint.node.getChildByName("tip").active = false;
                director.emit("cursorIn");
                break;
            case KeyCode.ENTER:
                this.HandlerBtn_hint();
                break;
        }
    }



}
