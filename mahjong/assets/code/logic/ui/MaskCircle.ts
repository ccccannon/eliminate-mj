import { _decorator, Component, color,Graphics, Size, UITransform } from "cc";

const { ccclass, property } = _decorator;

@ccclass("MaskCircle")
export class MaskCircle extends Component {
    @property(Graphics)
    maskGraphics: Graphics = null!;

    start() {
        this.drawCircleMask();
    }

    drawCircleMask() {
        // 获取Graphics组件
        const graphics: Graphics = this.maskGraphics;
        // 清除已有的绘制
        graphics.clear();
        // 绘制一个圆形遮罩
        graphics.fillColor = color(255, 255, 255, 255); // 可以根据需要设置颜色
        graphics.circle(0,0, this.node.getComponent(UITransform).width / 2);
        graphics.fill();
    }
}
