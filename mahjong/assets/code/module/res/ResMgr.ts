import { Asset, Node, AssetManager, Constructor, Prefab, __private, assetManager, error, js, resources, SpriteFrame, instantiate } from "cc";
import { LogUtil } from "../log/LogUtil";
import { AssetTracker } from "./AssetTracker";

type ProgressCallback = __private._cocos_asset_asset_manager_shared__ProgressCallback;
type CompleteCallback<T = any> = __private._cocos_asset_asset_manager_shared__CompleteCallbackWithData;
type IRemoteOptions = __private._cocos_asset_asset_manager_shared__IRemoteOptions;
type AssetType<T = Asset> = Constructor<T>;

interface ILoadResArgs<T extends Asset> {
    bundle?: string;
    dir?: string;
    paths: string | string[];
    type: AssetType<T> | null;
    onProgress: ProgressCallback | null;
    onComplete: CompleteCallback<T> | null;
}

/** 
 * 游戏资管理 
 * 1、加载默认resources文件夹中资源
 * 2、加载默认bundle远程资源
 * 3、主动传递bundle名时，优先加载传递bundle名资源包中的资源
 */
export class ResMgr {
    public static Ins: ResMgr


    /** 全局默认加载的资源包名 */
    defaultBundleName: string = "resources";

    /**
     * 加载远程资源
     * @param url           资源地址
     * @param options       资源参数，例：{ ext: ".png" }
     * @param onComplete    加载完成回调
     * @example
var opt: IRemoteOptions = { ext: ".png" };
var onComplete = (err: Error | null, data: ImageAsset) => {
    const texture = new Texture2D();
    texture.image = data;
    
    const spriteFrame = new SpriteFrame();
    spriteFrame.texture = texture;
    
    var sprite = this.sprite.addComponent(Sprite);
    sprite.spriteFrame = spriteFrame;
}
oops.res.loadRemote<ImageAsset>(this.url, opt, onComplete);
     */
    loadRemote<T extends Asset>(url: string, options: IRemoteOptions | null, onComplete?: CompleteCallback<T> | null): void;
    loadRemote<T extends Asset>(url: string, onComplete?: CompleteCallback<T> | null): void;
    loadRemote<T extends Asset>(url: string, ...args: any): void {
        var options: IRemoteOptions | null = null;
        var onComplete: CompleteCallback<T> | null = null;
        if (args.length == 2) {
            options = args[0];
            onComplete = args[1];
        }
        else {
            onComplete = args[0];
        }
        assetManager.loadRemote<T>(url, options, onComplete);
    }

    /**
     * 加载资源包
     * @param url       资源地址
     * @param complete  完成事件
     * @param v         资源MD5版本号
     * @example
var serverUrl = "http://192.168.1.8:8080/";         // 服务器地址
var md5 = "8e5c0";                                  // Cocos Creator 构建后的MD5字符
await oops.res.loadBundle(serverUrl,md5);
     */

    /*
        loadBundle(url: string, v?: string) {
            return new Promise<AssetManager.Bundle>((resolve, reject) => {
                assetManager.loadBundle(url, { version: v }, (err, bundle: AssetManager.Bundle) => {
                    if (err) {
                        return error(err);
                    }
                    resolve(bundle);
                });
            });
        }
        */

    /**
     * 加载一个资源
     * @param bundleName    远程包名
     * @param paths         资源路径
     * @param type          资源类型
     * @param onProgress    加载进度回调
     * @param onComplete    加载完成回调
     * @example
oops.res.load("spine_path", sp.SkeletonData, (err: Error | null, sd: sp.SkeletonData) => {

});
     */
    load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    load<T extends Asset>(bundleName: string, paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    load<T extends Asset>(bundleName: string, paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    load<T extends Asset>(bundleName: string, paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    load<T extends Asset>(paths: string | string[], onProgress: ProgressCallback | null, onComplete: CompleteCallback<T> | null): void;
    load<T extends Asset>(paths: string | string[], onComplete?: CompleteCallback<T> | null): void;
    load<T extends Asset>(paths: string | string[], type: AssetType<T> | null, onComplete?: CompleteCallback<T> | null): void;
    load<T extends Asset>(
        bundleName: string,
        paths?: string | string[] | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    ) {
        let args: ILoadResArgs<T> | null = null;
        if (typeof paths === "string" || paths instanceof Array) {
            args = this.parseLoadResArgs(paths, type, onProgress, onComplete);
            args.bundle = bundleName;
        }
        else {
            args = this.parseLoadResArgs(bundleName, paths, type, onProgress);
            args.bundle = this.defaultBundleName;
        }
        // console.error(`--- ResMgr.load, args: ${JSON.stringify(args)}`)
        this.loadByArgs(args);
    }

    /**
     * 加载文件夹中的资源
     * @param bundleName    远程包名
     * @param dir           文件夹名
     * @param type          资源类型
     * @param onProgress    加载进度回调
     * @param onComplete    加载完成回调
     * @example
// 加载进度事件
var onProgressCallback = (finished: number, total: number, item: any) => {
    LogUtil.D("资源加载进度", finished, total);
}

// 加载完成事件
var onCompleteCallback = () => {
    LogUtil.D("资源加载完成");
}
oops.res.loadDir("game", onProgressCallback, onCompleteCallback);
     */
    loadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(bundleName: string, dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(bundleName: string, dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(bundleName: string, dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(dir: string, type: AssetType<T> | null, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(dir: string, onProgress: ProgressCallback | null, onComplete: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(dir: string, onComplete?: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(dir: string, type: AssetType<T> | null, onComplete?: CompleteCallback<T[]> | null): void;
    loadDir<T extends Asset>(
        bundleName: string,
        dir?: string | AssetType<T> | ProgressCallback | CompleteCallback | null,
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: ProgressCallback | CompleteCallback | null,
        onComplete?: CompleteCallback | null,
    ) {
        let args: ILoadResArgs<T> | null = null;
        if (typeof dir === "string") {
            args = this.parseLoadResArgs(dir, type, onProgress, onComplete);
            args.bundle = bundleName;
        }
        else {
            args = this.parseLoadResArgs(bundleName, dir, type, onProgress);
            args.bundle = this.defaultBundleName;
        }
        args.dir = args.paths as string;
        // console.error(`--- ResMgr.loadDir, args: ${JSON.stringify(args)}`)
        this.loadByArgs(args);
    }

    /**
     * 通过资源相对路径释放资源
     * @param path          资源路径
     * @param bundleName    远程资源包名
     */
    // private release(path: string, bundleName?: string) {
    //     if (bundleName == null) bundleName = this.defaultBundleName;
    //     var bundle = assetManager.getBundle(bundleName);
    //     if (bundle) {
    //         var asset = bundle.get(path);
    //         if (asset) {
    //             LogUtil.D("---- release: path:", path, asset)
    //             this.releasePrefabtDepsRecursively(asset._uuid);
    //         }
    //     }
    // }

    /**
     * 通过相对文件夹路径删除所有文件夹中资源
     * @param path          资源文件夹路径
     * @param bundleName    远程资源包名
     */
    // releaseDir(path: string, bundleName?: string) {
    //     if (bundleName == null) bundleName = this.defaultBundleName;

    //     var bundle: AssetManager.Bundle | null = assetManager.getBundle(bundleName);
    //     if (bundle) {
    //         var infos = bundle.getDirWithPath(path);
    //         if (infos) {
    //             infos.map((info) => {
    //                 this.releasePrefabtDepsRecursively(info.uuid);
    //             });
    //         }

    //         if (path == "" && bundleName != "resources") {
    //             assetManager.removeBundle(bundle);
    //         }
    //     }
    // }

    // /** 释放预制依赖资源 */
    // private releasePrefabtDepsRecursively(uuid: string) {
    //     var asset = assetManager.assets.get(uuid)!;
    //     asset.decRef()

    //     if (asset instanceof Prefab) {
    //         var uuids: string[] = assetManager.dependUtil.getDepsRecursively(uuid)!;
    //         LogUtil.D(`---- releasePrefabtDepsRecursively, asset instanceof Prefab, uuid: ${uuid}, ref uuids:`, uuids)
    //         uuids.forEach(uuid => {
    //             var asset = assetManager.assets.get(uuid)!;
    //             // asset.decRef();
    //         });
    //     }
    // }

    /**
     * 获取资源
     * @param path          资源路径
     * @param type          资源类型
     * @param bundleName    远程资源包名
     */
    // get<T extends Asset>(path: string, bundleName?: string): T | null;
    get<T extends Asset>(path: string, type?: __private._cocos_asset_asset_manager_shared__AssetType<T> | null, bundleName?: string): T | null {
        if (bundleName == null) bundleName = this.defaultBundleName;

        var bundle: AssetManager.Bundle = assetManager.getBundle(bundleName)!;
        return bundle.get(path, type);
    }

    /** 打印缓存中所有资源信息 */
    dump() {
        assetManager.assets.forEach((value: Asset, key: string) => {
            LogUtil.D("--- asset:", assetManager.assets.get(key));
        })
        LogUtil.D(`--- assets.count: ${assetManager.assets.count}`);

    }

    private parseLoadResArgs<T extends Asset>(
        paths: string | string[],
        type?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onProgress?: AssetType<T> | ProgressCallback | CompleteCallback | null,
        onComplete?: ProgressCallback | CompleteCallback | null
    ) {
        let pathsOut: any = paths;
        let typeOut: any = type;
        let onProgressOut: any = onProgress;
        let onCompleteOut: any = onComplete;
        if (onComplete === undefined) {
            const isValidType = js.isChildClassOf(type as AssetType, Asset);
            if (onProgress) {
                onCompleteOut = onProgress as CompleteCallback;
                if (isValidType) {
                    onProgressOut = null;
                }
            }
            else if (onProgress === undefined && !isValidType) {
                onCompleteOut = type as CompleteCallback;
                onProgressOut = null;
                typeOut = null;
            }
            if (onProgress !== undefined && !isValidType) {
                onProgressOut = type as ProgressCallback;
                typeOut = null;
            }
        }
        return { paths: pathsOut, type: typeOut, onProgress: onProgressOut, onComplete: onCompleteOut };
    }

    private loadByBundleAndArgs<T extends Asset>(bundle: AssetManager.Bundle, args: ILoadResArgs<T>): void {
        if (args.dir) {
            bundle.loadDir(args.paths as string, args.type, args.onProgress, args.onComplete);
        }
        else {
            if (typeof args.paths == 'string') {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
            else {
                bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
        }
    }

    private loadByArgs<T extends Asset>(args: ILoadResArgs<T>) {
        if (args.bundle) {
            if (assetManager.bundles.has(args.bundle)) {
                //LogUtil.D(`--- ResMgr.loadByArgs, bundles.has true, bundle: ${args.bundle}`)
                let bundle = assetManager.bundles.get(args.bundle);
                this.loadByBundleAndArgs(bundle!, args);
            }
            else {
                // 自动加载bundle
                LogUtil.D(`--- ResMgr.loadByArgs, assetManager.loadBundle, bundle: ${args.bundle}`)
                assetManager.loadBundle(args.bundle, (err, bundle) => {
                    if (!err) {
                        this.loadByBundleAndArgs(bundle, args);
                    } else {
                        console.error(`--- ResMgr.loadByArgs, assetManager.loadBundle, error: ${err}`)
                    }
                })
            }
        }
        else {
            LogUtil.D(`--- ResMgr.args, no bundle: ${JSON.stringify(args)}`)
            this.loadByBundleAndArgs(resources, args);
        }
    }

    // ------------------------------------ 对外接口 begin
    public async instantiateAsync(prefabPath: string, parent?: Node) {
        return new Promise<Node>((resolve) => {
            this.load(prefabPath, (err: Error, asset: Prefab) => {
                if (err) {
                    LogUtil.E(`--- instantiateAsync error, path: ${prefabPath}, err:`, err)
                    resolve(null)
                    return
                }

                let go = instantiate(asset);
                AssetTracker.trace(go, asset) // 资源计数追踪
                if (parent)
                    go.parent = parent
                resolve(go)
            })
        })
    }

    // refGo 挂点, 最好是资源要依附的节点
    public async loadAssetAsync<T extends Asset>(assetPath: string,type:AssetType, refGo: Node) {
        return new Promise<T>((resolve) => {
            this.loadAssetCb(assetPath, type,refGo, (asset: T) => {
                resolve(asset)
            })
        })
    }

    // refGo 挂点, 最好是资源要依附的节点
    public async loadAssetCb<T extends Asset>(assetPath: string,type:AssetType, refGo: Node, onComplete?: Function) {
        await this.load(assetPath,type, (err: Error, asset: T) => {
            if (err) {
                LogUtil.E(`--- loadAssetAsync error, path: ${assetPath}, err:`, err)
                if (onComplete) onComplete(null)
                return
            }

            AssetTracker.trace(refGo, asset) // 资源计数追踪
            if (onComplete) onComplete(asset)
        })
    }

    // refGo 挂点, 最好是资源要依附的节点
    public async loadRemoteAsync<T extends Asset>(url: string, opts: IRemoteOptions, refGo: Node) {
        return new Promise<T>((resolve) => {
            this.loadRemote(url, opts, (err: Error, asset: T) => {
                if (err) {
                    LogUtil.E(`--- loadRemoteAsync error, url: ${url}, err:`, err)
                    resolve(null)
                    return
                }

                AssetTracker.trace(refGo, asset) // 资源计数追踪
                resolve(asset)
            })
        })
    }


    // refGo 挂点, 最好是资源要依附的节点
    public async loadDirAsync<T extends Asset>(dirPath: string, refGo: Node) {
        return new Promise<Array<T>>((resolve) => {
            ResMgr.Ins.loadDir(dirPath, (err: Error, arr: Array<T>) => {
                if (err) {
                    LogUtil.E(`--- loadDirAsync error, dirPath: ${dirPath}, err:`, err)
                    resolve(null)
                    return
                }

                arr.forEach((asset, idx, arr) => {
                    AssetTracker.trace(refGo, asset) // 资源计数追踪
                })
                resolve(arr)
            })
        })
    }

    // ------------------------------------ 对外接口 end

    public dumpPath(path: string) {
        LogUtil.D('--- dumpPath:', path)

        let bundleName = "resources"

        let bundle = assetManager.getBundle(bundleName);
        let asset01 = bundle.get(path);
        // LogUtil.D('--- asset01:', asset01)

        let uuid = asset01._uuid
        // LogUtil.D('--- asset01 uuid:', uuid, "--- ref cnt:", asset01.refCount)

        this.dumpUuidRecur(uuid)
    }

    private dumpUuidRecur(uuid: string, depth: number = 1) {
        let pre = "---".repeat(depth)
        var asset01 = assetManager.assets.get(uuid)!;

        var uuids: string[] = assetManager.dependUtil.getDepsRecursively(uuid)!;
        LogUtil.D(`${pre} dumpUuidRecur: ${uuid}, refCnt: ${asset01.refCount}\nasset:`, asset01, "\nuuid:", uuids)

        uuids.forEach(uuid => {
            this.dumpUuidRecur(uuid, ++depth)
            // var asset03: any = assetManager.assets.get(uuid)!;
            // LogUtil.D(`---- dumpUuidRecur ref asset refCnt: ${uuid}, ref: ${asset03.refCount}`, asset03)
        });
    }
}