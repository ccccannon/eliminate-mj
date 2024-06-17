import { _decorator, Button, Node } from 'cc'
export class UIPnlSystemView {
    public _root: Node
    public _Nego_Root: Node
    public _Btn_hint: Button
    public _Btn_menu: Button
    public _Btn_back: Button

    constructor(go: Node) {
        this._root = go
        this._Nego_Root = go.getChildByPath('Nego_Root')
        this._Btn_hint = go.getChildByPath('Nego_Root/Btn_hint').getComponent(Button)
        this._Btn_menu = go.getChildByPath('Nego_Root/Btn_menu').getComponent(Button)
        this._Btn_back = go.getChildByPath('Nego_Root/Btn_back').getComponent(Button)
    }
}
