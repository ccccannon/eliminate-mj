import { _decorator, Label, Node, Button } from 'cc'
export class UIPnlOverView {
    public _root: Node
    public _Nego_root: Node
    public _TextC_title: Label
    public _Btn_back: Button
    public _Btn_newGame: Button
    public _TextC_cancel: Label
    public _TextC_score: Label
    public _TextC_complete: Label
    public _TextC_endScore: Label

    constructor(go: Node) {
        this._root = go
        this._Nego_root = go.getChildByPath('Nego_root')
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label)
        this._Btn_back = go.getChildByPath('Nego_root/Btn_back').getComponent(Button)
        this._Btn_newGame = go.getChildByPath('Nego_root/Btn_newGame').getComponent(Button)
        this._TextC_cancel = go.getChildByPath('Nego_root/Btn_newGame/TextC_cancel').getComponent(Label)
        this._TextC_score = go.getChildByPath('Nego_root/TextC_score').getComponent(Label)
        this._TextC_complete = go.getChildByPath('Nego_root/TextC_complete').getComponent(Label)
        this._TextC_endScore = go.getChildByPath('Nego_root/TextC_endScore').getComponent(Label)
    }
}
