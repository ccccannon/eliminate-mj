// 玩家数据保存
// import Long from "long";
// import PBCS from '../../gen/pb_csprotos.js';
import { Tool } from "../../module/common/Tool";
// import { HttpMgr } from "../net/HttpMgr"
import { LogUtil } from "../../module/log/LogUtil";

export class PlayerData {
    public static Ins: PlayerData

    // private _uid: (number|Long)
    private _token: string
    public _chips: number // 余额
    public _name: string
    public _roomList: any[] = new Array<any>;  // 房间列表
    public _playerList:any[] = new Array<any>; // 玩家列表
    public _coin:number    // 当前余额
    public _email:string   // 邮箱
    public _method:number  // 玩法
    private _mainMode:string = "1"; // 常规桌= 1；极速桌=2
    public _time:number = 30;
    public _account:string  // 账号
    public _phoneNameber:string   // 电话号码
    public _password:string = "mypassword"  // 密码
    public _stayTime:number = 180; // 留座离桌等待时间
    public _currency:string = "R$";  // 默认符号
    public _login:boolean = true;   // 是否登录进入大厅
    private _route;
    public _setting = {    // 设置数据
        maxBuyInSwitch:false,   // 最大买入
        autoBuySwitch:false,    // 自动买入
        chipsDisplay:1,         // 筹码显示
        cardSqueezeSwitch:true, // 咪牌开关
        chatSwitch:false,       // 禁言模式
        smartSwitch:true        // 智能切换
    }

    // public GetUid() {
    //     return this._uid
    // }
    // public SetUid(uid: (number|Long)) {
    //     this._uid = uid
    // }

    public SetInfo(loginInfo){
        
    }
    public SavePlayerInfo(info){
        info = info.accounts
        // this._uid = info.uid
        this._token = info.Token
        this._name = info.nickname
        this._email = info.email
        this._account = info.account
        this._phoneNameber = info.phoneNumber
        // HttpMgr.Ins.setToken(info.Token)
        // HttpMgr.Ins.setUid(info.UID)
        // HttpMgr.Ins.setAccId(info.AccountID)
        this.SetCoin(info.coin)
    }
    public saveAccountData(info){
        // this._uid = info.accounts.uid;
        this._name = info.accounts.nickName;
        this._email = info.accounts.email;
        this._phoneNameber = info.accounts.phoneNumber;
        this._password = info.accounts.password;
    }

    public saveLevelList(bts){
        this._roomList = bts.roomsSummary;
    }
    public GetLevelList(){
        return  this._roomList;
    }
    public SetPlayerList(data){
        this._playerList = data.players;
    }
    public GetPlayerList(){
        return this._playerList;
    }    
    public GetChips() {
        return this._chips;
    }
    public GetName(){
        return this._name;
    }
    public setSettingData(data){
        if(data.settings){
            this._setting = data.settings;
        }
    }
    public getSettingData(){
        return this._setting;
    }
    // public SetChips(chips: number|Long) {
    //     this._chips = Tool.GetNumberFromLong(chips)
    // }

    public GetToken() {
        return this._token
    }

    public SetCoin(coin){
        this._coin = Number(coin)/100
    }
    public GetCoin(){
        return this._coin;
    }
    public SetMainMode(number){
        this._mainMode = number;
    }
    public GetMainMode(){
        return this._mainMode;
    }
    public SetRoute(route){
        this._route = route;
    }
    public GetRoute(){
        return this._route;
    }
    public SetLogin(login){
        this._login = login;
    }
    public GetLogin(){
        return this._login;
    }
}