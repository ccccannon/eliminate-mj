
import { _decorator, Component, Node, EventTouch, math, Button, Tween,Vec3 } from 'cc';
import { LogUtil } from '../../module/log/LogUtil';
import { UIMgr } from './UIMgr';


export class UIBaseLogic {
    public static prefabPath: string

    public id: string
    public rootGo: Node
    public isShow: Boolean
    public insName: string

    public Init(id: string, go: Node) {
        this.id = id
        this.rootGo = go
        this.isShow = false
        this.BindUIEvent()
    }

    public BindUIEvent() {

    }

    public BindUIEventClick(go: Node, fn: Function) {
        go.on(Button.EventType.CLICK, fn, this);
    }

    public OnCreate() {

    }

    public Show() {
        this.isShow = true
        this.SetActive(true)
    }
    
    public Hide() {
        this.isShow = false
        this.SetActive(false)
    }

    public SetActive(isActive: boolean) {
        this.rootGo.active = isActive
    }

    public SetParentTran(parent: Node, keepWorldTransform: boolean = false) {
        this.rootGo.setParent(parent, keepWorldTransform)
    }

    public SetPos(pos: math.Vec3) {
        this.rootGo.setPosition(pos)
    }

    public GetPos(): math.Vec3 {
        return this.rootGo.getPosition()
    }

    public GetParent(): Node {
        return this.rootGo.parent
    }

    public ShowSwitch(isShow: boolean) {
        if (this.isShow == isShow) return
        this.isShow = isShow
    }

    // 播放出现动画
    public ShowAnim(node: Node, origin?: number, strength?: number, dur?: number){
        UIMgr.Ins.Ripple(node, origin, strength, dur)
    }

    // 播放隐藏动画
    public HideAnim(node: Node, callback?: Function, dst?: number, strength?: number, dur?: number){
        UIMgr.Ins.RippleOut(node, callback, dst, strength, dur)
    }

    public Destroy() {
        UIMgr.Ins.DestroyWindow(this.id, false);
    }

    public OnDestroy() {
        this.isShow = false
    }

    // ----------- 通用方法
    // public BindUIEventClick(GameObject go, DlgDefine.VoidDelegate handler) {
    //     UIEventListener.Get(go).onClick = handler;
    // }


    // 不允许调用
    public DestroyInner() {
        // UIEventListener.Clear(rootGo);
        if (this.rootGo) {
            this.OnDestroy()
            Tween.stopAllByTarget(this.rootGo)
            this.rootGo.destroy()
            this.rootGo = null
        }
    }
}