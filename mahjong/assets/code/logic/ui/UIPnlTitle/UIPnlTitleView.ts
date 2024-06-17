import { _decorator, Label, Button, Node } from 'cc'
export class UIPnlTitleView {
    public _root: Node
    public _Nego_root: Node
    public _TextC_title: Label
    public _Btn_newGame: Button
    public _Btn_continue: Button
    public _Btn_back: Button

    constructor(go: Node) {
        this._root = go
        this._Nego_root = go.getChildByPath('Nego_root')
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label)
        this._Btn_newGame = go.getChildByPath('Nego_root/Group/Btn_newGame').getComponent(Button)
        this._Btn_continue = go.getChildByPath('Nego_root/Group/Btn_continue').getComponent(Button)
        this._Btn_back = go.getChildByPath('Nego_root/Btn_back').getComponent(Button)
    }
}
