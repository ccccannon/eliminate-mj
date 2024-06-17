import {  _decorator,SpriteAtlas,resources } from 'cc';
import { LogUtil } from "../../module/log/LogUtil";

export class ImageData {
    public static Ins: ImageData;
    public pokerImg;
    public chipImg;
    public outsPokerImg;

    public getPokerPlist(){
        this.loadPlist("ui/Atlas/poker/poker");
        this.loadPlist1("ui/Atlas/insideTheGame/c_chip");
        this.loadPlist2("ui/Atlas/poker/outsPoker");
    }

    public loadPlist(path:string){
        let assets 
        resources.load(path, SpriteAtlas, (err, assets) => {
            if (err) {
              console.error('加载plist图集资源失败:', err);
              return;
            }else{
                this.pokerImg = assets as SpriteAtlas;
                console.log("this.pokerImg = ",this.pokerImg);
            }
        })
    }
    
    public loadPlist1(path:string){
        let assets 
        resources.load(path, SpriteAtlas, (err, assets) => {
            if (err) {
              console.error('加载plist图集资源失败:', err);
              return;
            }else{
                this.chipImg = assets as SpriteAtlas;
            }
        })
    }
    public loadPlist2(path:string){
        let assets 
        resources.load(path, SpriteAtlas, (err, assets) => {
            if (err) {
              console.error('加载plist图集资源失败:', err);
              return;
            }else{
                this.outsPokerImg = assets as SpriteAtlas;
            }
        })
    }
}
