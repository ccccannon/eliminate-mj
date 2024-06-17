import { _decorator, Button, Label, Node } from 'cc'
export class UIPnlMenuView {
    public _root: Node
    public _Nego_root: Node
    public _TextC_title: Label
    public _Btn_introduce: Button
    public _Btn_scoreRule: Button
    public _Btn_sound: Button
    public _Btn_backTitle: Button
    public _Btn_back: Button

    constructor(go: Node) {
        this._root = go
        this._Nego_root = go.getChildByPath('Nego_root')
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label)
        this._Btn_introduce = go.getChildByPath('Nego_root/Group/Btn_introduce').getComponent(Button)
        this._Btn_scoreRule = go.getChildByPath('Nego_root/Group/Btn_scoreRule').getComponent(Button)
        this._Btn_sound = go.getChildByPath('Nego_root/Group/Btn_sound').getComponent(Button)
        this._Btn_backTitle = go.getChildByPath('Nego_root/Group/Btn_backTitle').getComponent(Button)
        this._Btn_back = go.getChildByPath('Nego_root/Btn_back').getComponent(Button)
    }
}
