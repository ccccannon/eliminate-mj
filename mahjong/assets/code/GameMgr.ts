import { _decorator, Component, Node } from 'cc';
import { App } from './logic/App';
const { ccclass, property } = _decorator;

@ccclass('GameMgr')
export class GameMgr extends Component {
    public static Ins: GameMgr

    onLoad() {
        GameMgr.Ins = this

        // this.node.addComponent(TimerMgr)
        // this.node.addComponent(DebugDraw)
    }

    start() {
        App.Ins = new App()
        App.Ins.start()
    }

    update(dt: number) {

    }
}


