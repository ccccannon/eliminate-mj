import { LogUtil } from "../../module/log/LogUtil";
// import { LoginData } from "./LoginData";
import { PlayerData } from "./PlayerData";
// import { SrvAddressData } from "./SrvAddressData";
import { OtherData } from "./OtherData";
// import { HttpReq } from "./HttpReq";
import { ImageData } from "./ImageData";
// import { dezhouData } from "../ui/insideTheGame/UIPnlInsideTheGame/dezhouData";
// import { seatCoordinates } from "../ui/insideTheGame/UIPnlInsideTheGame/seatCoordinates";
// import { pokerHanding } from "../ui/insideTheGame/pokerHanding";
import { TimerMgr } from "../../module/timer/TimerMgr";

export class DataMgr {
    public static Ins: DataMgr;

    constructor() {
        // LoginData.Ins = new LoginData()
        // PlayerData.Ins = new PlayerData()
        // SrvAddressData.Ins = new SrvAddressData()
        // OtherData.Ins = new OtherData()
        // HttpReq.Ins = new HttpReq()
        ImageData.Ins = new ImageData()
        // seatCoordinates.Ins = new seatCoordinates()
        // dezhouData.Ins = new dezhouData()
        TimerMgr.Ins = new TimerMgr()
        // pokerHanding.Ins = new pokerHanding()   
    }
}