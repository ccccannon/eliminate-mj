import { AssetManager, assetManager, JsonAsset } from "cc"
// import { ISkin } from "../../gen/cfg_all"
// import { IGamehall } from "../../gen/cfg_all"

import { LogUtil } from "../../module/log/LogUtil"
import { ResMgr } from "../../module/res/ResMgr"

export class ConfigMgr {
    public static Ins: ConfigMgr

    private _cfgDir = "dataconfig"
    private _allData = new Map<string, any>()

    public async Start() {
        await this.LoadAllCfg()
    }

    async LoadAllCfg() {
        return new Promise<void>((resolve) => {
            ResMgr.Ins.loadDir(this._cfgDir, (err: Error, assetArr: Array<JsonAsset>) => {
                LogUtil.D(`--- load cfg success`)
                for (let i = 0; i < assetArr.length; i++) {
                    const ja = assetArr[i];
                    const sheetName = ja.name;

                    const sheetData = ja.json ? ja.json['items'] : [];
                    this._allData.set(sheetName, sheetData)
                    // LogUtil.D(`--- this._allData:`, this._allData.size)
                    ja.decRef()
                }

                resolve()
            })
        })
    }

    public GetSkin() {
        // const path = "cfg_skin"
        // const infoArr: ISkin[] = this._allData.get(path)
        // LogUtil.D(`--- infoArr:`, infoArr)
        // for (const info of infoArr) {
        //     LogUtil.D(`--- skin: ID: ${info.ID}, IconPath: ${info.IconPath}`)
        // }
        // return infoArr
    }
    public GetJsonData(path:string){
        // const infoArr:IGamehall[] = this._allData.get(path)
        // return infoArr
    }
    public GetCfgWithSheetName(sheetName: string) {
        return this._allData.get(`cfg_${sheetName}`.toLowerCase())
    }
}
