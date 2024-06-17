import { _decorator, Component, Node, Button, CCFloat } from 'cc';
import { LogUtil } from '../log/LogUtil';
const { ccclass, property } = _decorator;

@ccclass('LongPressEvent')
export class LongPressEvent extends Component {
    @property(CCFloat)
    public interval: number = 0.5

    public isworking: boolean = true

    protected _onPress: Function
    protected _onClick: Function
    protected _begin: number
    protected _button: Button
    protected _press: boolean


    start() {
        this._press = false
        this._button = this.node.getComponent(Button)
        this.node.on(Node.EventType.MOUSE_DOWN, this.OnMouseDown, this)
        this.node.on(Node.EventType.MOUSE_UP, this.OnMouseUp, this)
        this.node.on(Node.EventType.MOUSE_LEAVE, this.OnMouseLeave, this)
    }

    update(deltaTime: number) {
        
    }

    public SetPressEvent(onPress: Function) {
        this._onPress = onPress
    }

    public SetClickEvent(onClick: Function) {
        this._onClick = onClick
    }

    private OnMouseDown() {
        this._press = true
        let date = new Date()
        this._begin = date.getTime()
        //if (this._button) this._button.enabled = false
    }

    private OnMouseUp() {
        if (this._press) {
            let date = new Date()
            LogUtil.D("--- OnMouseUp.interval: ", date.getTime() - this._begin)
            if (date.getTime() - this._begin >= (this.interval * 1000)) {
                LogUtil.D("--- OnMouseUp.isworking: ", this.isworking)
                if (this._onPress && this.isworking) this._onPress()
            } else {
                LogUtil.D("--- OnMouseUp.isworking: ", this.isworking)
                if (this._onClick && this.isworking) this._onClick()
            }
            //if (this._button) this._button.enabled = true
            this._press = false
        }
    }

    private OnMouseLeave() {
        if (this._press) {
            //if (this._button) this._button.enabled = true
            this._press = false
        }
    }

    onDestroy() {
        this._onPress = null
        this._onClick = null
    }
}

