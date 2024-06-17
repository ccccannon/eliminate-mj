// waitting界面

import { Node, _decorator } from "cc";
import { UIBaseLogic } from "../UIBaseLogic";

export class PnlWaittingLogic extends UIBaseLogic {
    public static prefabPath = "prefab/ui/tips/PnlWaiting"

    public Init(id: string, go: Node) {
        super.Init(id, go)
    }
    
}

