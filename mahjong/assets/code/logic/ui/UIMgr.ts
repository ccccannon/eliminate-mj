import { Camera, Node, tween, Tween, UIOpacity, Vec3 } from "cc";
import { Tool } from "../../module/common/Tool";
import { LogUtil } from "../../module/log/LogUtil";
import { TimerMgr } from "../../module/timer/TimerMgr";
import { UIBaseLogic } from "./UIBaseLogic";

export class UIMgr {
    public static Ins: UIMgr
    private _uiRootObj: Node;
    private _uiCamera: Camera;

    private _uiSEffectCanvasObj: Node;
    private _uiMainCanvasObj: Node;
    private _uiTopCanvasObj: Node;
    private _uiMsgCanvasObj: Node;
    private _uiGodCanvasObj: Node;


    private _autoId: number = 0
    private _logicInsList = new Map<string, UIBaseLogic>()

    async start() {
        this._uiRootObj = Tool.GetRootNode("ui_root_ex")
        Tool.DontDestroyOnLoad(this._uiRootObj)

        this._uiCamera = Tool.GetChildRecursive(this._uiRootObj, "ui_camera").getComponent(Camera)
        this._uiSEffectCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "scene_effect_canvas")
        this._uiMainCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "main_canvas")
        this._uiTopCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "top_canvas")
        this._uiMsgCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "msg_canvas")
        this._uiGodCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "god_canvas")
    }

    // ------------- 异步加载 ui begin -------------
    private async CreateWindowAsync(id: string, cls: any, parent?: Node) {
        let prefabPath = cls.prefabPath
        let go = await Tool.InstantiateAsync(prefabPath)

        if (!parent)
            parent = this.GetCanvasNode(ECanvas.LayerMain)

        let ins = new cls()
        ins.Init(id, go)
        this.AddLogicIns(id, ins)
        ins.OnCreate()
        ins.SetParentTran(parent)
        ins.ShowSwitch(true);
        return ins
    }

    public async CreateWindowCustomAsync(customId: string, cls: any, parent?: Node) {
        return await this.CreateWindowAsync(customId, cls, parent)
    }

    public async CreateWindowAutoAsync(cls: any, parent?: Node) {
        return await this.CreateWindowAsync(this.GenerateId(), cls, parent)
    }

    // ------------- 异步加载 ui end -------------

    public DestroyWindow(id: string, isDelay: boolean = false) {
        let ins = this._logicInsList.get(id)
        if (!ins)
            return

        if (isDelay) { // TODO: web aaa
            TimerMgr.Ins.SetTimeout(0, () => {
                ins.DestroyInner();
                this._logicInsList.delete(id);
            })
        } else {
            ins.DestroyInner();
            this._logicInsList.delete(id);
        }
    }

    public Clear() {
        let arr = Array.from(this._logicInsList.keys());
        arr.forEach((id, index, arr) => {
            this.DestroyWindow(id, false);
        })
        this._logicInsList.clear()
    }

    public AddLogicIns(id: string, ins: UIBaseLogic) {
        LogUtil.A(!this._logicInsList.get(id), `--- already exist ins id: ${id}`);
        this._logicInsList.set(id, ins);
    }

    public GetLogicIns(id: string): any {
        return this._logicInsList.get(id)
    }
    public GetLogicNameIns(id: string): any {
        for(let [key,value] of this._logicInsList){
            if(value.insName == id){
                return this._logicInsList.get(key)
            }
        }
        
    }
    public GenerateId(): string {
        return `${++this._autoId}`
    }

    public GetCanvasNode(layer: ECanvas): Node {
        if (layer == ECanvas.LayerSceneEffect)
            return this._uiSEffectCanvasObj;
        else if (layer == ECanvas.LayerMain)
            return this._uiMainCanvasObj;
        else if (layer == ECanvas.LayerTop)
            return this._uiTopCanvasObj;
        else if (layer == ECanvas.LayerMsg)
            return this._uiMsgCanvasObj;
        else if (layer == ECanvas.LayerGod)
            return this._uiGodCanvasObj;
        else {
            LogUtil.A(false, "--- no found layer:{0}", layer);
            return this._uiMainCanvasObj;
        }
    }

    public GetUIRootGo(): Node {
        return this._uiRootObj;
    }

    public GetUICamera(): Camera {
        return this._uiCamera;
    }

    /**
     * 波动效果(小幅缩放)
     * @param node {Node} 节点
     * @param origin {number} 初始比例
     * @param strength {number} 强度
     * @param dur {number} 时长
     */
    public Ripple(node: Node, origin?: number, strength?: number, dur?: number) {
        if (!node) return;
        origin || (origin = 0.1);
        strength || (strength = 1.1);
        dur || (dur = 0.2);

        const sx1 = node.scale.x * strength;
        const sx2 = node.scale.x * 1;
        const sy1 = node.scale.y * strength;
        const sy2 = node.scale.y * 1;
        const sz1 = node.scale.z * strength;
        const sz2 = node.scale.z * 1;

        setTimeout(() => {
            tween(node)
                .call(() => {
                    node.setScale(origin, origin, 1);
                })
                .to(dur, { scale: new Vec3(sx1, sy1, sz1) })
                .to(dur / 2, { scale: new Vec3(sx2, sy2, sz2) })
                .start();
        })
    }

    /**
     * 缩放渐隐
     * @param node {Node} 节点
     * @param callback {Function} 动画结束回调函数
     * @param dst {number} 最终比例
     * @param strength {number} 强度
     * @param dur {number} 时长
     */
    public RippleOut(node: Node, callback?: Function, dst?: number, strength?: number, dur?: number) {
        if (!node) return;
        dst || (dst = 0.6);
        strength || (strength = 1.05);
        dur || (dur = 0.14);

        const sx1 = node.scale.x * strength;
        const sx2 = node.scale.x * dst;
        const sy1 = node.scale.y * strength;
        const sy2 = node.scale.y * dst;
        const sz1 = node.scale.z * strength;
        const sz2 = node.scale.z * dst;

        tween(node)
            .to(dur / 2, { scale: new Vec3(sx1, sy1, sz1) })
            .to(dur, { scale: new Vec3(sx2, sy2, sz2) })
            .call(() => {
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .start();

        if (!node.getComponent(UIOpacity)) node.addComponent(UIOpacity);
        tween(node.getComponent(UIOpacity))
            .delay(dur / 2)
            .to(dur, { opacity: 0 })
            .start();
    }

    /**
     * 摇晃
     * @param node         Node        结点
     * @param enable       boolean     动作停止或启动
     * @param duration     number      时长（晃动时间）
     * @param strength     number      强度（晃动角度
     */
    public Rock(node: Node, enable: boolean = true, duration: number = 5, strength: number = 25) {
        if (!node) return;
        if (enable) {
            Tween.stopAllByTarget(node);
            node.angle = strength;
            tween(node)
                .to(duration, { angle: -strength })
                .to(duration, { angle: strength })
                .union()
                .repeatForever()
                .start();
        } else {
            Tween.stopAllByTarget(node);
            node.angle = strength;
        }
    }

    public Destroy() {
        this.Clear()

        if (this._uiRootObj) {
            this._uiRootObj.destroy()
            this._uiRootObj = null
        }
    }

    public DebugDump() {
        LogUtil.D("--- this._logicInsList:", this._logicInsList)
    }

}

export enum ECanvas {
    LayerSceneEffect = 1,
    LayerMain = 3,
    LayerTop = 4,
    LayerMsg = 6,
    LayerGod = 7,
}