import { _decorator, Node, Button, Label, Sprite } from 'cc'
export class UIPnlComWinTipsView {
    public _root: Node
    public _Nego_root: Node
    public _TextC_title: Label
    public _TextC_content: Label
    public _Btn_Cancel: Button
    public _TextC_cancel: Label
    public _Btn_Ok: Button
    public _TextC_ok: Label

    constructor(go: Node) {
        this._root = go
        this._Nego_root = go.getChildByPath('Nego_root')
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label)
        this._TextC_content = go.getChildByPath('Nego_root/TextC_content').getComponent(Label)
        this._Btn_Cancel = go.getChildByPath('Nego_root/Group/Btn_Cancel').getComponent(Button)
        this._TextC_cancel = go.getChildByPath('Nego_root/Group/Btn_Cancel/TextC_cancel').getComponent(Label)
        this._Btn_Ok = go.getChildByPath('Nego_root/Group/Btn_Ok').getComponent(Button)
        this._TextC_ok = go.getChildByPath('Nego_root/Group/Btn_Ok/TextC_ok').getComponent(Label)
    }
}
