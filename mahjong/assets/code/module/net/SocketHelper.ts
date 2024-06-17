import { _decorator, Component, Node, EventTouch } from 'cc'
import { HttpHelper } from './HttpHelper'

export enum ESocketStatus {
    None = 0,
    Connecting = 1,
    ConnectSucc = 2,
    ConnectFail = 3,
    ConnectClose = 5,
}

export class SocketHelper {

    private _ws: WebSocket = null
    private _status: ESocketStatus = ESocketStatus.None


    private _onMsgFn: (bts: ArrayBuffer) => void = (bts) => { }
    private _onStatusFn: (status: ESocketStatus) => void = (status) => { }

    // ---------------------- ws 回调 begin
    private onClosed(ev: CloseEvent): any {
        this.onStatusChange(ESocketStatus.ConnectClose)

    }

    private onError(ev: Event): any {
        // LogUtil.E("--- error occured, reason: {0}, Unknown Error: {1}\n", reason, errorMsg)
        this.onStatusChange(ESocketStatus.ConnectFail)
    }

    private onMsg(ev: MessageEvent): any {
        this._onMsgFn(ev.data)
    }

    private onOpen(ev: Event): any {
        this.onStatusChange(ESocketStatus.ConnectSucc)
    }
    // ---------------------- ws 回调 end


    private onStatusChange(status: ESocketStatus) {
        this._status = status
        this._onStatusFn(status)
    }

    private clear() {
        if (this._ws != null) {
            this._ws.close()
            this._ws = null
        }
    }

    // ---------------------- 必须实现的 对外接口
    public connect(url: string, protocol?: string) {
        this.clear()
        this.onStatusChange(ESocketStatus.Connecting)
        this._ws = new WebSocket(url)
        this._ws.binaryType = 'arraybuffer'
        this._ws.onopen = this.onOpen.bind(this)
        this._ws.onmessage = this.onMsg.bind(this)
        this._ws.onclose = this.onClosed.bind(this)
        this._ws.onerror = this.onError.bind(this)
    }

    public sendMsg(bts: ArrayBuffer) {
        if(WebSocket.OPEN){
            this._ws.send(bts)
        }
    }

    public disconnect() {
        this.clear()
    }

    public isConnected(): boolean {
        return this._ws != null && this._ws.readyState == WebSocket.OPEN
    }

    public getStatus(): ESocketStatus {
        return this._status
    }

    public regOnMsg(fn: (bts: ArrayBuffer) => void) {
        this._onMsgFn = fn
    }

    public regOnStatus(fn: (status: ESocketStatus) => void) {
        this._onStatusFn = fn
    }

    public destroy() {
        this.clear()

        this._onMsgFn = null
        this._onStatusFn = null
    }
}