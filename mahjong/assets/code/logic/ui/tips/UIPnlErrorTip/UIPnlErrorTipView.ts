import { _decorator, Node, Button, Label, Layout } from 'cc'
export class UIPnlErrorTipView {
    public _root: Node
    public _Nego_root: Node
    public _LayC_recharge: Layout
    public _TextC_illustrate: Label
    public _Btn_back: Button
    public _TextC_title1: Label
    public _TextC_title2: Label

    constructor(go: Node) {
        this._root = go
        this._Nego_root = go.getChildByPath('Nego_root')
        this._LayC_recharge = go.getChildByPath('Nego_root/LayC_recharge').getComponent(Layout)
        this._TextC_illustrate = go.getChildByPath('Nego_root/LayC_recharge/TextC_illustrate').getComponent(Label)
        this._Btn_back = go.getChildByPath('Nego_root/LayC_recharge/Btn_back').getComponent(Button)
        this._TextC_title1 = go.getChildByPath('Nego_root/LayC_recharge/TextC_title1').getComponent(Label)
        this._TextC_title2 = go.getChildByPath('Nego_root/LayC_recharge/TextC_title2').getComponent(Label)
    }
}
