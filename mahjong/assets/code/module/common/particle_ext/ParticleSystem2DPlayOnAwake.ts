import { _decorator, ParticleSystem2D, Component } from "cc";
import { ParticleSystem2DExt } from "./ParticleSystem2DExt";
const { ccclass} = _decorator;


@ccclass('ParticleSystem2DPlayOnAwake')
export class ParticleSystem2DPlayOnAwake extends Component {
    public particle2D: ParticleSystem2D
    public particle2DExt: ParticleSystem2DExt

    onLoad(){
       this.particle2D = this.node.getComponent(ParticleSystem2D);
       this.particle2DExt = this.node.getComponent(ParticleSystem2DExt);
    }

    onEnable() {
        if (this.particle2D) {
            this.particle2D.resetSystem()
        }
        if (this.particle2DExt) {
            this.particle2DExt.resetSystem()
        }
    }
}