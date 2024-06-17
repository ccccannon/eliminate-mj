
export enum EnumUI {
    Test01 = "Test01",
    Mahjong = "Mahjong",
    SystemLogic = "SystemLogic",
    Menu = "Menu",
    Gameover = "Gameover",
    Title = "Title",
    Gm = "Gm",
    DebugPanel = "DebugPanel",
    DebugDraw = "DebugDraw",
    Login = "Login",
    Waitting = "Waitting",
    TextTips = "TextTips",
    NormalTips = "NormalTips",
    GameHall = "GameHall",
    broadcast = "Broadcast",
    roomList = "RoomList",
    insideTheGame = "InsideTheGame",
    buychips = "BuyChips",
    systemFunctions = "SystemFunctions",
    setting = "Setting",
    gameRecord = "GameRecord",
    speedTable = "SpeedTable",
    speedMatch = "SpeedMatch",
    countdown = "CountDown",
    multiTable = "MultiTable",
    testLogic = "testLogic",
    errorTip = "ErrorTip",
    desconectarReconectar = "DesconectarReconectar",
    avatarInformation = "AvatarInformation",
    expression = "expression"
}

export enum Music {
    bgMusic = "music/bgMusic",
    // chipEffects = "music/chipEffects",
    // licensingEffects = "music/licensingEffects",
    // winEffects = "music/winEffects",
    // actionEffects = "music/actionEffects"  ,
    m01 = "music/01-jiesuan",  // 获胜结算筹码声(对局有结果筹码划入对应玩家手中时播放)
    m02 = "music/02-xiazhu",   // 下注筹码声 (call/bet/raise/allin时筹码放在桌上时播放和语音同时放出)
    m03 = "music/03",          // 倒计时警告声 (行动阶段、留座离桌倒计时到一半时播放)
    m04 = "music/04",          // 弃牌声/摊牌掀牌声/翻牌发牌声/转牌河牌发牌声
    m05 = "music/05-qiaozhuo", // 过牌敲桌/check时播放，和语音同时放出
    m06 = "music/06-win",      // 获胜特效声(玩家获胜时播放，和动画同步)
    m07 = "music/07-allin",    // allin操作时的语音
    m08 = "music/08-fold",     // fold操作时的语音
    m09 = "music/09-raise",    // raise操作时的语音
    m10 = "music/10-check",   // check操作时的语音
    m11 = "music/11-bet",     // bet操作时的语音
    m12 = "music/12-call",    // call操作时的语音
}