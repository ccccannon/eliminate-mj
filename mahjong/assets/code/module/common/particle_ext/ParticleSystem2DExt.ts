import { _decorator, Component, Node, ParticleSystem2D, CCFloat, CCInteger, CCBoolean, BloomStage } from 'cc';
import { LogUtil } from '../../log/LogUtil';
import { particleSimulator } from './ParticleSimulator2DExt';
const { ccclass, property } = _decorator;

@ccclass('ParticleSystem2DExt')
export class ParticleSystem2DExt extends ParticleSystem2D {
    /**
     * !#zh 激活时从头播动画
     */
    @property(CCBoolean)
    set playOnAwake(value: boolean) {
        this._playOnAwake = value
    }
    get playOnAwake() {
        return this._playOnAwake
    }

    @property(CCBoolean)
    _playOnAwake: boolean = false

    @property(CCBoolean)
    set enableAnimation(value: boolean) {
        this._enableAnimation = value
    }
    get enableAnimation() {
        return this._enableAnimation
    }

    @property(CCBoolean)
    _enableAnimation: boolean = false

    /**
     * 
     */
    @property(CCBoolean)
    set enableFrame(value: boolean) {
        this._enableFrame = value
    }
    get enableFrame() {
        return this._enableFrame
    }

    @property(CCBoolean)
    _enableFrame: boolean = false

    /**
     * !#zh 帧动画贴图的列数
     * @property {Number} sizeX
     * @default 0
     */
    @property(CCInteger)
    sizeX: number = 0;

    /**
     * !#zh 帧动画贴图的行数
     * @property {Number} sizeY
     * @default 0
     */
    @property(CCInteger)
    public sizeY = 0

    /**
     * !#zh 帧动画贴图，每一张序列帧图的宽度（需要等宽）
     * @property {Number} uv_deltaX
     * @default 0
     */
    @property(CCInteger)
    public uv_deltaX = 0

    /**
     * !#zh 帧动画贴图，每一张序列帧图的高度（需要等高）
     * @property {Number} uv_deltaY
     * @default 0
     */
    @property(CCInteger)
    public uv_deltaY = 0

    /**
     * !#zh 帧动画贴图，序列帧动画的帧率（默认60帧）
     * @property {Number} uv_deltaY
     * @default 0
     */
    @property(CCInteger)
    public animationRate = 60


    constructor() {
        super()
        this._simulator = new particleSimulator(this)
    }

    onEnable() {
        super.onEnable()
        
        if (this.playOnAwake) {
            this.resetSystem()
        }
        if (!this.spriteFrame) {
            LogUtil.E('--- no spriteFrame')
            return
        }

        let tex = this.spriteFrame.getGFXTexture()
        if (this.uv_deltaX == 0)
            this.uv_deltaX = tex.width / this.sizeX
        if (this.uv_deltaY == 0)
            this.uv_deltaY = tex.height / this.sizeY
    }
}


