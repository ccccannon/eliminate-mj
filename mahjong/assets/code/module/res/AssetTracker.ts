import { _decorator, Component, Node, Asset, SpriteFrame } from 'cc';
import { LogUtil } from '../log/LogUtil';
const { ccclass, property } = _decorator;

@ccclass('AssetTracker')
export class AssetTracker extends Component {

    public static trace(go: Node, ast: Asset) {
        let at = go.getComponent(AssetTracker)
        if (!at) {
            at = go.addComponent(AssetTracker)
        }
        at.traceInner(ast)
    }

    private _astArr = new Array<Asset>()

    traceInner(ast: Asset) {
        ast.addRef()
        this._astArr.push(ast)
    }

    onDestroy() {
        // LogUtil.D(`--- onDestroy, cnt: ${this._astArr.length}, _astArr:\n`, this._astArr)
        this._astArr.forEach((ast, idx, arr) => {
            ast.decRef()
        })
        this._astArr = null

        // TODO: web 优化, 可以丢到 resmgr 中去, 延迟 30s 在计数减 1
    }

    debugDump() {
        this._astArr.forEach((ast, idx, arr) => {
            LogUtil.D("", ast)
        })
    }
}
