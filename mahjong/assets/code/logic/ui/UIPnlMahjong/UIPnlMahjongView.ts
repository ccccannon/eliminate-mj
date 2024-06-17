import { _decorator, Sprite, Layout, Node, Button, Label } from 'cc'
export class UIPnlMahjongView {
    public _root: Node
    public _Nego_Root: Node
    public _LayC_content: Layout
    public _Nego_move: Node
    public _Nego_select: Node
    public _Nego_hint1: Node
    public _Nego_hint2: Node
    public _Btn_CardItem: Button
    public _ImgC_bg: Sprite
    public _ImgC_card: Sprite
    public _TextC_card: Label
    public _TextC_can: Label
    public _TextC_time: Label
    public _TextC_score: Label
    public _TextC_residue: Label
    public _Nego_score: Node

    constructor(go: Node) {
        this._root = go
        this._Nego_Root = go.getChildByPath('Nego_Root')
        this._LayC_content = go.getChildByPath('Nego_Root/LayC_content').getComponent(Layout)
        this._Nego_move = go.getChildByPath('Nego_Root/tipNode/Nego_move')
        this._Nego_select = go.getChildByPath('Nego_Root/tipNode/Nego_select')
        this._Nego_hint1 = go.getChildByPath('Nego_Root/tipNode/Nego_hint1')
        this._Nego_hint2 = go.getChildByPath('Nego_Root/tipNode/Nego_hint2')
        this._Btn_CardItem = go.getChildByPath('Nego_Root/Btn_CardItem').getComponent(Button)
        this._ImgC_bg = go.getChildByPath('Nego_Root/Btn_CardItem/ImgC_bg').getComponent(Sprite)
        this._ImgC_card = go.getChildByPath('Nego_Root/Btn_CardItem/ImgC_card').getComponent(Sprite)
        this._TextC_card = go.getChildByPath('Nego_Root/Btn_CardItem/TextC_card').getComponent(Label)
        this._TextC_can = go.getChildByPath('Nego_Root/top/TextC_can').getComponent(Label)
        this._TextC_time = go.getChildByPath('Nego_Root/top/TextC_time').getComponent(Label)
        this._TextC_score = go.getChildByPath('Nego_Root/top/TextC_score').getComponent(Label)
        this._TextC_residue = go.getChildByPath('Nego_Root/top/TextC_residue').getComponent(Label)
        this._Nego_score = go.getChildByPath('Nego_Root/top/Nego_score')
    }
}
