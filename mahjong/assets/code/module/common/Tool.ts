import { Node, Texture2D, ImageAsset, director, assetManager, Sprite, resources, SpriteFrame, UIOpacity, Font, Button, Label, sys, native, path, view, ResolutionPolicy, game, Rect, UITransform } from "cc";
// import { Long, util } from "protobufjs";
import { LogUtil } from "../log/LogUtil";
import { ResMgr } from "../res/ResMgr";
// import { status,behavior,dezhouData } from '../../logic/ui/insideTheGame/UIPnlInsideTheGame/dezhouData';
export class Tool {
    // 只获取子节点
    public static GetChildRecursive(node: Node, name: string): Node {
        for (let index = 0; index < node.children.length; index++) {
            const child = node.children[index]
            const go = Tool.GetChildOrSelfRecursive(child, name)
            if (go)
                return go
        }
        return null
    }

    // 获取 本身 or 子节点
    public static GetChildOrSelfRecursive(node: Node, name: string): Node {
        if (node.name == name)
            return node;

        // node.getChildByName() // 不能递归查找

        for (let index = 0; index < node.children.length; index++) {
            const child = node.children[index]
            const go = Tool.GetChildOrSelfRecursive(child, name)
            if (go)
                return go
        }
        return null
    }

    public static GetRootNode(name: string): Node {
        return director.getScene().getChildByPath(name)
    }

    public static async InstantiateAsync(prefabPath: string, parent?: Node) {
        return await ResMgr.Ins.instantiateAsync(prefabPath, parent)
    }

    public static DontDestroyOnLoad(node: Node) {
        director.addPersistRootNode(node)
    }

    public static Destroy(node: Node) {
        node.destroy()
    }

    /**
     * 从resources/ui下加载一个图片资源
     * @param path        资源相对于resources/ui的路径
     * @param onComplete    加载完成回调
     */
    public static GetUISpriteByPath(path: string, type: any, refGo: Node, onComplete: Function) {
        let finalPath = `ui/Atlas/${path}/spriteFrame`
        // LogUtil.D("--- zgs path: ", finalPath)
        ResMgr.Ins.loadAssetCb(finalPath, type, refGo, (atlas: SpriteFrame) => {
            if (onComplete) onComplete(atlas)
        })
    }

    // 添加点击
    public static AddClick(obj, callBackFun, target, index?: any) {
        let button, node
        if (obj instanceof Node) {
            node = obj
            button = node.getComponent(Button)
            if (button == null) button = node.addComponent(Button);
        } else if (obj instanceof Button) {
            node = obj.node
            button = obj
        }

        if (button == null) return

        node.index = button.index = index;
        callBackFun && node.on(Button.EventType.CLICK, callBackFun, target)
        return button
    }

    public static RemoveClick(obj, callBackFun, target) {
        let node = null;
        if (obj instanceof Node) {
            node = obj;
        } else if (obj instanceof Button) {
            node = obj.node;
        }

        if (node == null) return;
        node.off(Button.EventType.CLICK, callBackFun, target)
    }

    public static Join(...args: any[]): string {
        return args.map((val, idx, arr) => { return val.replace(/(\/*$)/g, "") }).join("/")
    }

    public static IsMobile(): boolean {
        return sys.platform == sys.Platform.ANDROID || sys.platform == sys.Platform.IOS
    }

    // 读取包内资源路径, android 的 assets, ios 的 Data/Raw, 等价于 unity 中的 Application.streamingAssetsPath
    public static readStreamAssetsBts(relaPath: string): ArrayBuffer {
        if (Tool.IsMobile()) {
            return native.fileUtils.getDataFromFile(native.fileUtils.fullPathForFilename(relaPath))
        } else {
            return null
        }
    }

    public static readStreamAssetsStr(relaPath: string): string {
        let bts = Tool.readStreamAssetsBts(relaPath)
        return bts != null ? new TextDecoder().decode(new Uint8Array(bts)) : ""
    }

    public static writeFileStr(fullPath: string, txt: string): boolean {
        if (!Tool.IsMobile())
            return false

        let dirPath = path.dirname(fullPath)
        if (!native.fileUtils.isDirectoryExist(dirPath)) {
            native.fileUtils.createDirectory(dirPath)
        }
        native.fileUtils.writeStringToFile(txt, fullPath)
    }

    /**
     * 修改按钮标题
     * @param btn {Button | Node} 按钮或结点
     * @param v {string} 修改值
     */
    public static SetBtnLabel(btn: Button | Node, v: string) {
        if (btn instanceof Button) {
            btn = btn.node;
        }
        const labTitle = btn.getComponentInChildren(Label);
        labTitle && (labTitle.string = v);
    }

    /**
     * 按钮可点击性行为修改
     * @param btn {Button | Node} 按钮或结点
     * @param v {NBoolean} 修改值
     */
    public static ChangeEnabled(btn: Button | Node, v: boolean | null | undefined = null) {
        if (btn instanceof Node) {
            btn = btn.getComponent(Button);
        }
        if (btn) {
            if (typeof v == 'boolean') {
                btn.interactable = v;
            } else {
                btn.interactable = !btn.interactable;
            }
        }
    }

    /**
     * 将Long转换成number
     * @param value 值
     */
    // public static GetNumberFromLong(value: number | Long) {
    //     if (typeof (value) == "number") return value
    //     if (value == null || value.unsigned) return 0
    //     return value.low
    // }

    /*
    * 字符串加密
    */
    public static encryptString(str: string, key: string): string {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    }
    public static decryptString(str: string, key: string): string {
        let result = "";
        for (let i = 0; i < str.length; i++) {
            let charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    }
    /** 
     * 类似于Lua中format.string
    */
    public static formatString(str: string, ...args: any[]): string {
        return str.replace(/\{(\d+)\}/g, (match, index) => {
            return typeof args[index] !== "undefined" ? args[index] : match;
        });
    }
    /**
     * 服务器传过来的数值都需要除以100
     */
    public static strNumStr(str: string) {
        return (Number(str) / 100).toString();
    }
    /**
     * 发给服务器的数值需要乘以100
     */
    public static numStrnum(str: string) {
        return (Number(str) * 100).toString()
    }
    /**
     * 筹码分类
     * @param num 
     * @returns 
     */
    // public static chipNum(num:number){
    //     let value = num;
    //     let img = [0,0,0,0,0,0,0,0,0,0];
    //     let imgNum = [];
    //     let chip = [100000,50000,10000,5000,2000,500,100,25,5,1]
    //     for (let i = 0;i<chip.length;i++){
    //         img[i] = Math.trunc(value / chip[i]);
    //         for(let j=0;j<img[i];j++){
    //             imgNum.push(chip[i]);
    //         }
    //         value = value % chip[i];
    //     }
    //     return imgNum;
    // }
    public static chipNum(num: number) {
        let value = num;
        let img = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let imgNum = [];
        let chip = [1400000, 50000, 10000, 5000, 2000, 500, 100, 25, 5, 1]
        if (value > 1400000) {
            img[0] = 1;
            imgNum.push(1400000);
            value = 0;
        } else {
            img[0] = 0;
        }
        for (let i = 1; i < chip.length; i++) {
            img[i] = Math.trunc(value / chip[i]);
            for (let j = 0; j < img[i]; j++) {
                imgNum.push(chip[i]);
            }
            value = value % chip[i];
        }
        if (imgNum.length > 28) {
            imgNum = imgNum.slice(0, 28);
        }
        return imgNum;
    }
    /**
     *设置精灵图片
     * @param node 
     * @param path 本地路径
     */
    public static setImgSprite(node, path) {
        resources.load(`ui/Atlas/${path}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error('Failed to load sprite image:', err);
                return;
            }
            // 设置精灵图片
            if (node && node.getComponent(Sprite)) {
                node.getComponent(Sprite).spriteFrame = spriteFrame;
            } else {
                console.log("不存在图片");
                return;
            }
        });
    }
    /**
     * 加载远程url图片
     * @param node 
     * @param url 
     */
    public static setImgUrlSprite(node, url) {
        assetManager.loadRemote<ImageAsset>(url, function (err, imageAsset) {
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            node.getComponent(Sprite).spriteFrame = spriteFrame;
        });
    }

    /**
     *设置文字
     * @param node 
     * @param path 本地路径
     * @param [opacityNum=255] 
     */
    public static setLabelFont(node, path, opacity = 255) {
        node.getComponent(UIOpacity).opacity = opacity;
        resources.load(`ui/Fonts/${path}`, Font, (err, font) => {
            if (err) {
                console.error('Failed to load font:', err);
                return;
            } else {
                node.getComponent(Label).font = font;
            }
        });
    }
    /**
     * 列表中的最大值及最大值的数量
     */
    public static findMaxAndCount(arr) {
        if (arr.length === 0) {
            throw new Error("列表为空");
        }
        let max = arr[0].Rate;
        let pos = arr[0].Pos;
        let rate = arr[0].Rate;
        let count = 1;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].Rate > max) {
                max = arr[i].Rate;
                count = 1;
                pos = arr[i].Pos;
                rate = arr[0].Rate;
            } else if (arr[i].Rate === max) {
                count++;
            }
        }
        return { pos, count, rate };
    }
    /**
     * 图片点击状态图片切换
     * @param nodeArr 节点列表
     * @param clickedSprite 点击的节点
     * @param path 图片路径
     */
    public static statusPictureToggle(nodeArr, clickedSprite, path) {
        for (const sprite of nodeArr) {
            if (sprite === clickedSprite) {
                Tool.setImgSprite(sprite, path + sprite.name + "_1");
            } else {
                Tool.setImgSprite(sprite, path + sprite.name + "_0");
            }
        }
    }
    public static statusPictureToggleList(nodeArr, clickedSprite, path) {
        for (const sprite of nodeArr) {
            if (sprite === clickedSprite) {
                Tool.setImgSprite(sprite, path + "_1");
            } else {
                Tool.setImgSprite(sprite, path + "_0");
            }
        }
    }
}
