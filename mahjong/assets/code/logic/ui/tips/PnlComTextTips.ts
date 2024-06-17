// 文字tips

import { Label, Node, _decorator } from "cc";
import { UIBaseLogic } from "../UIBaseLogic";

export class PnlComTextTips extends UIBaseLogic {
    public static prefabPath = "prefab/ui/tips/PnlComTextTips"
    private _contentLable: Label

    public Init(id: string, go: Node) {
        super.Init(id, go)
        this._contentLable = go.getChildByPath("lab_content").getComponent(Label)
    }
    
    public SetContent(content: string){
        this._contentLable.string = content;
    }
}

