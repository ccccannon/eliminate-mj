
export const EnumCommon = {
}

export const enum ChanLogin {
    Guest = 1,         // 游客
    Facebook = 10,
    Google = 11,
    PhoneOrEmail = 12, // 手机或邮箱
    LogOut = 100,      // 注销状态    
}

export const enum GameId {
    Slots = 3,
}

// 本地缓存 key
export const enum Prefs {
    SvrIndex = "SvrIndex",      //选服
    MMuuid = "mm-uuid",
    SysF   = "systemFunction",  // 局内设置缓存
    SystemSettingSound = "systemSettingSound", // 系统设置
    account = "account",      // 账户设置
    paiZhuo = "paiZhuo",       // 牌桌数据    
}

export const enum Method{  // 玩法
    texas = 0,   // 德州
    Omaha = 1,   // omaha
    short = 2    // 短牌
}

export const enum mainMode{   // 模式
    regularTable = "1",    // 常规桌
    expressTable = "2",    // 极速桌
}