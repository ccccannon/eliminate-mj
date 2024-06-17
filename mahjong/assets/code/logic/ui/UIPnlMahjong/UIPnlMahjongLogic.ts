import { _decorator, Button, Color, director, dynamicAtlasManager, EventKeyboard, input, Input, instantiate, KeyCode, Label, Node, Sprite, tween, UIOpacity, v3 } from 'cc'
import { UIPnlMahjongView } from './UIPnlMahjongView'
import { UIBaseLogic } from '../UIBaseLogic'
import { cardList1, cardList2, cardList3, cardList4, MahjongTile, cardList5, otherCardList1, suitValue, otherSuit } from '../MahjongConstant';
import { MahjongUtils } from '../MahjongUtils';
import { MahjongData } from '../MahjongData';
import { Tool } from '../../../module/common/Tool';
import { TipsManager } from '../TipsMgr';
import { EnumUI } from '../../common/EnumUI';
import { UIMgr } from '../UIMgr';
import { UIPnlOverLogic } from '../UIPnlOver/UIPnlOverLogic';
const { ccclass } = _decorator

const cardArray = [cardList1, cardList2, cardList3, cardList4];

export class UIPnlMahjongLogic extends UIBaseLogic {
    public static prefabPath = "/prefab/ui/PnlMahjong"
    public _view: UIPnlMahjongView

    private gameoverLogic: UIPnlOverLogic;

    /** 是否点击的第一个消除的麻将 */
    private isFirst: boolean = true;
    /** 点击的第一个麻将 */
    private firstMahjong: number[] = [];
    /** 结束定时器 */
    private overInterval: any = null;

    /** 是否正在播放动画 */
    private isPlayAnim: boolean = false;
    /** 连击次数 */
    private comboCount: number = 0;
    /** 上一次消除的分数 */
    private lastScore: number = 0;
    /** 焦点移动位置 */
    private moveCardPos: number[] = [];
    /** 长按时间 */
    private pressTime: number = 0;
    /** 长按定时器 */
    private pressInterval: any;
    /** 中间牌来源位置 */
    private centerPoint: number[] = [];
    /** 中间牌来源方向 */
    private centerDirection: KeyCode = null;
    /** 首次消除 */
    private firstMove: boolean = true;
    private cardLayer: number = 0;

    public Init(id: string, go: Node) {
        // dynamicAtlasManager.enabled = true;
        this._view = new UIPnlMahjongView(go)
        super.Init(id, go)

        // --------- your code
        MahjongData.getInstance().mahjongRoot = this._view._Nego_Root;
        let userData = MahjongData.getInstance().loadUserData();
        if (userData) {
            this.onContinueGame(userData);
        } else {
            this.gameInit();
        }
    }

    public BindUIEvent() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        director.on("stopCountDown", this.onStopCountDown, this);
        director.on("newGame", this.onNewGame, this);
        director.on("cursorIn", this.updateMovePos, this);
    }

    public OnDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    /** 游戏初始化数据 */
    onNewGame() {
        this._view._TextC_time.string = `倒计时：10:00`;
        MahjongData.getInstance().curentScore = 0;
        MahjongData.getInstance().isGameOver = false;
        this.comboCount = 0;
        this.lastScore = 0;
        this.firstMove = true;
        this.cardLayer = 0;
        this._view._LayC_content.node.children.forEach((v, i) => {
            v.getChildByName("TextC_card").getComponent(Label).string = "";
        })
        this.gameInit();
    }

    /** 继续游戏 */
    onContinueGame(userData) {
        this.firstMove = false;
        MahjongData.getInstance().initMahjong();
        this.addCard();
        MahjongData.getInstance().setUserData(userData);
        setTimeout(() => {
            this.recoverCard(userData.nameList, userData.mahjongList);
            MahjongData.getInstance().setSideCard();
            this.refreshTips();
            MahjongData.getInstance().getAllNoPressedCard();
            this.startTime(MahjongData.getInstance().countDownTime);
            let list: number[][][] = MahjongData.getInstance().clickList;
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < list[i].length; j++) {
                    this.initSelectCard([i + 1, list[i][j][0], list[i][j][1]]);
                    return;
                }
            }
        })
    }

    /** 游戏初始化数据 */
    public gameInit() {
        MahjongData.getInstance().initMahjong();
        this.randomCard();
        this.addCard();
    }

    /** 随机卡牌 */
    public randomCard() {
        let selectedPairs = MahjongUtils.getSelectedPairs(MahjongData.getInstance().mahjongTiles);
        let randomArray: MahjongTile[] = [];
        let otherArray: MahjongTile[] = [];
        randomArray = MahjongData.getInstance().mahjongTiles.filter(item => {
            return selectedPairs.filter(v => v.suit == item.suit && v.value == item.value).length > 0
        });
        randomArray = randomArray.filter((v, i) => i % 4 < 2);
        otherArray = MahjongData.getInstance().mahjongTiles.filter(item => {
            return !(selectedPairs.filter(v => v.suit == item.suit && v.value == item.value).length > 0)
        });
        otherArray = otherArray.concat(randomArray);
        setTimeout(() => {
            MahjongData.getInstance().setSideCard();
            this.setCardValue(randomArray, otherArray);
            this.refreshTips();
            this.initSelectCard([5, ...cardList5]);
            MahjongData.getInstance().getAllNoPressedCard();
        })
    }

    /** 添加卡牌 */
    public addCard() {
        this.initCardNode(1, otherCardList1[0][0], otherCardList1[0][1]);
        for (let i = 0; i < 4; i++) {
            this.addCardNode(i + 1, cardArray[i]);
        }
        this.initCardNode(5, cardList5[0], cardList5[1]);
    }

    /** 添加牌节点 */
    addCardNode(layer: number, cardList: number[][]) {
        for (let i = 0; i < cardList.length; i++) {
            for (let j = 0; j < cardList[i].length; j++) {
                if (cardList[i][j] > 0) {
                    this.initCardNode(layer, j, i);
                }
            }
        }
        if (layer == 1) {
            for (let i = 1; i < otherCardList1.length; i++) {
                this.initCardNode(1, otherCardList1[i][0], otherCardList1[i][1]);
            }
        }
    }

    /** 初始化节点 */
    initCardNode(layer: number, x: number, y: number) {
        let cardItemLogic: Node = null;
        if (this._view._LayC_content.node.children.length == 144) {
            cardItemLogic = MahjongData.getInstance().getCardNode(layer, x, y);
            cardItemLogic.getComponent(UIOpacity).opacity = 255;
            cardItemLogic.setSiblingIndex(this.cardLayer);
            this.cardLayer++;
        } else {
            cardItemLogic = instantiate(this._view._Btn_CardItem.node);
            cardItemLogic.parent = this._view._LayC_content.node;
            cardItemLogic.name = `Btn${layer}_${x}_${y}`;
            cardItemLogic.on(Button.EventType.CLICK, this.onCardCallback, this);
        }
        cardItemLogic.setPosition(-465.5 + x * 81 - layer * 8, -58 - y * 109 + layer * 10, 0);
        cardItemLogic.active = true;
    }

    /** 恢复卡牌 */
    recoverCard(nameList: string[], mahjongList: MahjongTile[]) {
        this._view._LayC_content.node.children.map((v, i) => {
            let mahjong = mahjongList[nameList.indexOf(v.name)];
            if (mahjong.value < 0) {
                v.active = false;
            } else {
                v.active = true;
                let name = mahjong.value > 0 ? `${mahjong.value}${mahjong.suit}` : mahjong.suit;
                v.getChildByName("TextC_card").getComponent(Label).string = name;
                this.setCardSprite(v, mahjong);
            }
        })
    }

    /** 设置卡牌值 */
    setCardValue(randomArray: MahjongTile[], otherArray: MahjongTile[]) {
        randomArray.sort(() => Math.random() - 0.5);
        otherArray.sort(() => Math.random() - 0.5);
        let list: number[][][] = MahjongData.getInstance().clickList;
        let count = 0;
        for (let i = 0; i < 5; i++) {
            count += list[i].length;
        }
        let randomList = MahjongUtils.getRandomList(count, randomArray.length);
        for (let i = 0; i < randomList.length; i++) {
            let index = randomList[i];
            let curNum = randomList[i];
            let num = 0;
            for (let j = 0; j < 5; j++) {
                num += list[j].length;
                if (index < num) {
                    let mahjong = randomArray[i];
                    let name = mahjong.value > 0 ? `${mahjong.value}${mahjong.suit}` : mahjong.suit;
                    let node = MahjongData.getInstance().getCardNode(j + 1, list[j][curNum][0], list[j][curNum][1]);
                    node.getChildByName("TextC_card").getComponent(Label).string = name;
                    this.setCardSprite(node, mahjong);
                    break;
                }
                curNum -= list[j].length;
            }
        }

        // 设置其他牌值
        let num = 0;
        this._view._LayC_content.node.children.forEach((v, i) => {
            if (v.getChildByName("TextC_card").getComponent(Label).string == "") {
                let mahjong = otherArray[num];
                let name = mahjong.value > 0 ? `${mahjong.value}${mahjong.suit}` : mahjong.suit;
                v.getChildByName("TextC_card").getComponent(Label).string = name;
                this.setCardSprite(v, mahjong);
                num++;
            }
        })
    }

    /** 设置卡牌精灵 */
    setCardSprite(node: Node, mahjong: MahjongTile) {
        let sprite = node.getChildByName("ImgC_card");
        if (mahjong.value > 0) {
            let value = suitValue.get(mahjong.suit);
            let name = `0${value}0${mahjong.value}`;
            Tool.setImgSprite(sprite, `mahjong/${name}`);
            let spr = node.getChildByName("ImgC_bg").getComponent(Sprite);
            if (spr.spriteFrame.name != "UI_Mahjong_Image_Background_White") {
                Tool.setImgSprite(node.getChildByName("ImgC_bg"), `mahjong/UI_Mahjong_Image_Background_White`);
            }
        } else {
            let value = suitValue.get(mahjong.suit);
            let index = -1;
            for (let i = 0; i < otherSuit.length; i++) {
                let n = otherSuit[i].indexOf(mahjong.suit);
                if (n > -1) {
                    index = n;
                    break;
                }
            }
            let name = `0${value}0${index + 1}`;
            Tool.setImgSprite(sprite, `mahjong/${name}`);
            // @ts-ignore
            if (otherSuit[2].includes(mahjong.suit)) {
                Tool.setImgSprite(node.getChildByName("ImgC_bg"), `mahjong/UI_Mahjong_Image_Background_Green`);
            } 
            // @ts-ignore
            else if (otherSuit[3].includes(mahjong.suit)) {
                Tool.setImgSprite(node.getChildByName("ImgC_bg"), `mahjong/UI_Mahjong_Image_Background_Blue`);
            } else {
                let spr = node.getChildByName("ImgC_bg").getComponent(Sprite);
                if (spr.spriteFrame.name != "UI_Mahjong_Image_Background_White") {
                    Tool.setImgSprite(node.getChildByName("ImgC_bg"), `mahjong/UI_Mahjong_Image_Background_White`);
                }
            }
        }
    }

    /** 点击卡牌 */
    onCardCallback(button: Button) {
        if (this.isPlayAnim) return;
        let numbers = MahjongUtils.getBtnNumber(button.node.name);

        this.selectCard(numbers, false);
    }

    /** 选中卡牌 */
    selectCard(numbers: number[], isKey: boolean) {
        let list: number[][][] = MahjongData.getInstance().clickList;
        let node = MahjongData.getInstance().getCardNode(numbers[0], numbers[1], numbers[2]);
        if (isKey) {
            tween(node).to(0.1, { scale: v3(0.9, 0.9) }).start();
        }
        // 不能点击，播放抖动动画
        if (list[numbers[0] - 1].filter(v => v[0] == numbers[1] && v[1] == numbers[2]).length == 0) {
            tween(node)
                .by(0.02, { position: v3(5, 0) })
                .by(0.02, { position: v3(-6, 0) })
                .by(0.02, { position: v3(-3, 0) })
                .by(0.02, { position: v3(3, 0) })
                .by(0.02, { position: v3(1, 0) })
                .start();
            return;
        }
        if (this.isFirst) {
            this.firstMahjong = [...numbers];
            this.updateSelectPos();
            this.isFirst = false;
        } else {
            // 重复点击返回
            if (numbers.filter((v, i) => v == this.firstMahjong[i]).length >= 3) {
                this.firstMahjong = [];
                this._view._Nego_select.active = false;
                this.isFirst = true;
                return;
            }
            let node1 = MahjongData.getInstance().getCardNode(this.firstMahjong[0], this.firstMahjong[1], this.firstMahjong[2]);
            let name1 = node.getChildByName("TextC_card").getComponent(Label).string;
            let name2 = node1.getChildByName("TextC_card").getComponent(Label).string;
            const group1 = ['春', '夏', '秋', '冬'];
            const group2 = ['梅', '兰', '竹', '菊'];
            // @ts-ignore
            if (name1 == name2 || group1.includes(name1) && group1.includes(name2) || group2.includes(name1) && group2.includes(name2)) {

                let score = this.getScore(name1);
                this.removeAnim(node, node1, score);
                if (this.firstMahjong[1] == -1 && this.firstMahjong[2] == 3.5 || numbers[1] == -1 && numbers[2] == 3.5) {
                    MahjongData.getInstance().updateShadowLayer(this._view._LayC_content.node, false);
                }
                // 等待消除动画播放完成
                this.isPlayAnim = true;
                // 移除两个消除的麻将
                this.removeCard(numbers);
                this.removeCard(this.firstMahjong);
                MahjongData.getInstance().getAllNoPressedCard();
                setTimeout(() => {
                    this.isPlayAnim = false;
                    this.isFirst = true;

                    this.firstMahjong = [];
                    MahjongData.getInstance().setSideCard();
                    let residueCount = this._view._LayC_content.node.children.filter(v => v.active == true).length;
                    if (residueCount > 0) this.updateMoveCard(MahjongUtils.copyArray(numbers));
                    this.refreshTips();
                    if (this.firstMove) {
                        this.firstMove = false;
                        this.startTime(600);
                    }
                }, 1250)
            } else {
                this.firstMahjong = [...numbers];
                this.updateSelectPos();
            }
        }
    }

    getScore(name) {
        let score = MahjongUtils.calculateScore(name);
        this.comboCount = this.lastScore == score ? this.comboCount + 1 : 1;
        if (this.comboCount > 1) {
            console.log(`${this.comboCount}连击`);
        }
        this.lastScore = score;
        let residueCount = this._view._LayC_content.node.children.filter(v => v.active == true).length;
        console.log("residueCount", residueCount);
        // 分数=牌值分*连击次数*剩余牌张数
        return score * this.comboCount * residueCount;
    }

    /** 移除麻将 */
    removeCard(card: number[]) {
        if (card[0] == 5) {
            MahjongData.getInstance().fiveCard = [];
        } else if (card[0] == 1 && card[2] == 3.5) {
            MahjongData.getInstance().oneOtherCardList = MahjongData.getInstance().oneOtherCardList.filter(v => v[0] != card[1] || v[1] != card[2]);
        } else {
            let cardList = MahjongData.getInstance().allCard.get(card[0]);
            cardList[card[2]][card[1]] = 0;
            MahjongData.getInstance().allCard.set(card[0], cardList);
        }
    }

    /** 刷新 */
    refreshTips() {
        let count = this.getRemoveNumber();
        this._view._TextC_can.string = `当前可消除牌对：${count}`;
        let residueCount = this._view._LayC_content.node.children.filter(v => v.active == true).length;
        this._view._TextC_residue.string = `剩余牌数：${residueCount}`;
        this._view._TextC_score.string = `得分：${MahjongData.getInstance().curentScore}`;
        if (residueCount == 0) {
            this.gameOver();
            TipsManager.Ins.ShowTextTips("恭喜通关！");
        }
        else if (count == 0) {
            this.gameOver();
            TipsManager.Ins.ShowTextTips("死局！（无任何可消除的麻将牌了）");
        }
    }

    /** 获取消除对数 */
    getRemoveNumber() {
        let list: number[][][] = MahjongData.getInstance().clickList;
        let valueList = [];
        for (let i = 0; i < 5; i++) {
            list[i].forEach((v, j) => {
                let node = MahjongData.getInstance().getCardNode(i + 1, v[0], v[1]);
                let str = node.getChildByName("TextC_card").getComponent(Label).string;
                valueList.push(str);
            })

        }
        let cardValueList = MahjongUtils.getCardValue(valueList);
        let count = 0;
        for (let i in cardValueList) {
            let val = Math.floor(Number(cardValueList[i]) / 2);
            if (val > 0) {
                count += val;
            }
        }
        return count;
    }

    /** 停止或继续倒计时 */
    onStopCountDown(isStop: boolean) {
        if (isStop) {
            this.stopTime();
        } else {
            if (MahjongData.getInstance().countDownTime > 0) {
                this.startTime(MahjongData.getInstance().countDownTime);
            }
        }
    }

    /** 开始倒计时 */
    startTime(duration: number) {
        this.overInterval = setInterval(() => {
            duration--;
            MahjongData.getInstance().countDownTime = duration;
            if (duration < 0) {
                this.gameOver();
                TipsManager.Ins.ShowTextTips("时间到！");
            } else {
                let time = MahjongUtils.displayTime(duration)
                this._view._TextC_time.string = `倒计时：${time}`;
            }
        }, 1000);
    }

    /** 停止倒计时 */
    stopTime() {
        if (this.overInterval !== null) {
            clearInterval(this.overInterval);
            this.overInterval = null;
        }
    }

    /** 开始长按倒计时 */
    startKeyTime(keyCode: KeyCode) {
        this.pressInterval = setInterval(() => {
            this.pressTime += 66;
            if (this.pressTime >= 500) {
                this.getDistance(keyCode, true);
            }
        }, 66);
    }

    /** 停止长按倒计时 */
    stopKeyTime() {
        if (this.pressInterval !== null) {
            clearInterval(this.pressInterval);
            this.pressInterval = null;
        }
    }

    /** 键盘按下事件 */
    onKeyDown(event: EventKeyboard) {
        if (MahjongData.getInstance().isHint) return;
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_DOWN:
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT:
                this.pressTime = 0;
                this.stopKeyTime();
                this.startKeyTime(event.keyCode);
                this.getDistance(event.keyCode, false);
                break;
            case KeyCode.ENTER:
                this.selectCard(this.moveCardPos, true);
                break;
        }
    }

    /** 键盘松开事件 */
    onKeyUp(event: EventKeyboard) {
        if (MahjongData.getInstance().isHint) return;
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_DOWN:
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT:
                this.pressTime = 0;
                this.stopKeyTime();
                break;
            case KeyCode.ENTER:
                let node = MahjongData.getInstance().getCardNode(this.moveCardPos[0], this.moveCardPos[1], this.moveCardPos[2]);
                tween(node).to(0.1, { scale: v3(1, 1) }).start();
                break;
        }
    }

    /** 初始选择焦点 */
    initSelectCard(numbers: number[]) {
        this.moveCardPos = [...numbers];
        this.updateMovePos();
    }

    updateMovePos() {
        let numbers = this.moveCardPos;
        let node = MahjongData.getInstance().getCardNode(numbers[0], numbers[1], numbers[2]);
        let pos = node.getPosition();
        this._view._Nego_move.setPosition(v3(pos.x, pos.y))
        this._view._Nego_move.active = true;
    }

    updateSelectPos() {
        let numbers = [...this.firstMahjong];
        let node = MahjongData.getInstance().getCardNode(numbers[0], numbers[1], numbers[2]);
        let pos = node.getPosition();
        this._view._Nego_select.setPosition(v3(pos.x, pos.y))
        this._view._Nego_select.active = true;
    }

    /** 获取距离 */
    getDistance(key: KeyCode, isLongPress: boolean) {
        let list: number[][][] = MahjongData.getInstance().noPressedCard;
        let curList: number[][] = [];
        let disList: number[] = [];
        let minDistance: number = 0;
        let count = 0;

        // 先找目标方向的牌，有则取最近的牌，无则扩大一格继续寻找
        let distance = (pos) => {
            curList[count] = [pos[0], pos[1], pos[2]];
            let dis = MahjongUtils.calculateDistance([this.moveCardPos[1], this.moveCardPos[2]], [pos[1], pos[2]], 2);
            disList[count] = dis;
            if (minDistance == 0) minDistance = dis;
            else if (dis <= minDistance) minDistance = dis;
            count++;
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < list[i].length; j++) {
                let x = list[i][j];
                // 找出目标方向所有的牌
                if (key == KeyCode.ARROW_UP && x[1] < this.moveCardPos[2] ||
                    key == KeyCode.ARROW_DOWN && x[1] > this.moveCardPos[2] ||
                    key == KeyCode.ARROW_LEFT && x[0] < this.moveCardPos[1] ||
                    key == KeyCode.ARROW_RIGHT && x[0] > this.moveCardPos[1]) {
                    curList.push([i + 1, x[0], x[1]])
                }
            }
        }
        if (curList.length == 0) {
            if (!isLongPress && (key == KeyCode.ARROW_DOWN || key == KeyCode.ARROW_RIGHT)) {
                director.emit("moveCursor", key);
                this._view._Nego_move.active = false;
                this.stopKeyTime();
            }
            return;
        }
        let targetValue = key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN ? this.moveCardPos[1] : this.moveCardPos[2];
        // 取出离X轴最近的卡牌
        let closestValues = curList.reduce((closest, current) => {
            let current1 = key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN ? current[1] : current[2];
            let closest1 = key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN ? closest[0][1] : closest[0][2];
            const currentDistance = Math.abs(current1 - targetValue);
            const closestDistance = Math.abs(closest1 - targetValue);
            if (currentDistance < closestDistance) {
                return [current];
            } else if (currentDistance === closestDistance) {
                return [...closest, current];
            } else {
                return closest;
            }
        }, [curList[0]]);
        // 特殊处理小数位行
        if (this.moveCardPos[2] == 3.5) {
            if (key == KeyCode.ARROW_LEFT || key == KeyCode.ARROW_RIGHT) {
                let special = curList.filter(v => v[2] == 3 || v[2] == 4);
                closestValues = closestValues.concat(special);
            }
        } else if (this.moveCardPos[2] == 3 || this.moveCardPos[2] == 4) {
            if (key == KeyCode.ARROW_LEFT || key == KeyCode.ARROW_RIGHT) {
                let special = curList.filter(v => v[2] == 3.5);
                closestValues = closestValues.concat(special);
            }
        }
        if (this.moveCardPos[1] == 5.5) {
            if (key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN) {
                let special = curList.filter(v => v[1] == 5 || v[1] == 6);
                closestValues = closestValues.concat(special);
            }
        } else if (this.moveCardPos[1] == 5 || this.moveCardPos[1] == 6) {
            if (key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN) {
                let special = curList.filter(v => v[1] == 5.5);
                closestValues = closestValues.concat(special);
            }
        }
        closestValues = closestValues.filter((value, index, self) => {
            return index === self.findIndex((v) => (
                v[0] === value[0] && v[1] === value[1] && v[2] === value[2]
            ));
        });
        curList = [];
        closestValues.forEach(v => distance(v))
        if (disList.length > 0) {
            this.setMoveCard(disList, minDistance, curList, key, isLongPress);
        }
    }

    /** 设置移动牌 */
    setMoveCard(disList: number[], minDistance: number, curList: number[][], key: KeyCode, isLongPress: boolean) {
        let list = [];
        for (let i = 0; i < disList.length; i++) {
            let v = disList[i]
            if (v * 100 == minDistance * 100) {
                list.push(curList[i]);
            }
        }
        let fun = (array) => {
            if (isLongPress) {
                if (key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN) {
                    let temp = MahjongUtils.copyArray(this.moveCardPos);
                    if (Math.abs(temp[1] - array[0][1]) >= 1) {
                        return;
                    }
                } else if (key == KeyCode.ARROW_LEFT || key == KeyCode.ARROW_RIGHT) {
                    let temp = MahjongUtils.copyArray(this.moveCardPos);
                    if (Math.abs(temp[2] - array[0][2]) >= 1) {
                        return;
                    }
                }
            }

            this._view._Nego_move.active = false;
            let numbers = array[0];
            if (numbers[1] == 5.5) {
                this.centerPoint = MahjongUtils.copyArray(this.moveCardPos);
                this.centerDirection = key;
            } else {
                this.centerPoint = [];
                this.centerDirection = null;
            }
            this.moveCardPos = [...numbers];
            this.updateMovePos();
        }
        if (list.length > 1) {
            if (key == KeyCode.ARROW_UP) {
                let res = this.centerDirection == key ? list.filter(v => v[1] == this.centerPoint[1]) : list.filter(v => v[1] < this.moveCardPos[1]);
                fun(res);
            } else if (key == KeyCode.ARROW_DOWN) {
                let res = this.centerDirection == key ? list.filter(v => v[1] == this.centerPoint[1]) : list.filter(v => v[1] > this.moveCardPos[1]);
                fun(res);
            } else if (key == KeyCode.ARROW_LEFT) {
                let res = this.centerDirection == key ? list.filter(v => v[2] == this.centerPoint[2]) : list.filter(v => v[2] < this.moveCardPos[2]);
                fun(res);
            } else if (key == KeyCode.ARROW_RIGHT) {
                let res = this.centerDirection == key ? list.filter(v => v[2] == this.centerPoint[2]) : list.filter(v => v[2] > this.moveCardPos[2]);
                fun(res);
            }
        } else {
            fun(list);
        }
    }

    /** 消除动画 */
    removeAnim(card1: Node, card2: Node, score: number) {
        this._view._Nego_select.active = false;
        this._view._Nego_move.active = false;
        let pos1 = card1.getPosition();
        let pos2 = card2.getPosition();
        let centerPos = v3((pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2);
        card1.getChildByName("Shade0").active = false;
        card1.getChildByName("Shade1").active = false;
        card2.getChildByName("Shade0").active = false;
        card2.getChildByName("Shade1").active = false;
        let len = this._view._LayC_content.node.children.length;
        if (pos1.x > pos2.x) {
            card2.setSiblingIndex(len);
            card1.setSiblingIndex(len + 1);
        } else {
            if (pos1.x == pos2.x) {
                if (pos1.y > pos2.y) {
                    card1.setSiblingIndex(len);
                    card2.setSiblingIndex(len + 1);
                } else {
                    card2.setSiblingIndex(len);
                    card1.setSiblingIndex(len + 1);
                }
            } else {
                card1.setSiblingIndex(len);
                card2.setSiblingIndex(len + 1);
            }
        }
        // 播放移动和渐隐动画
        let condition = pos1.x == pos2.x && pos1.y <= pos2.y;
        tween(card1)
            .delay(0.2)
            .to(0.5, { position: v3(pos1.x > pos2.x || condition ? centerPos.x + 40 : centerPos.x - 40, centerPos.y, 0) }, { easing: "backIn" })
            .to(0.5, { position: v3(pos1.x > pos2.x || condition ? centerPos.x + 40 : centerPos.x - 40, centerPos.y + 100, 0) }, { easing: "backIn" })
            .start();
        tween(card2)
            .delay(0.2)
            .to(0.5, { position: v3(pos1.x > pos2.x || condition ? centerPos.x - 40 : centerPos.x + 40, centerPos.y, 0) }, { easing: "backIn" })
            .to(0.5, { position: v3(pos1.x > pos2.x || condition ? centerPos.x - 40 : centerPos.x + 40, centerPos.y + 100, 0) }, { easing: "backIn" })
            .start();
        tween(card1.getComponent(UIOpacity))
            .delay(1)
            .to(0.2, { opacity: 0 })
            .start();
        tween(card2.getComponent(UIOpacity))
            .delay(1)
            .to(0.2, { opacity: 0 })
            .call(() => {
                card1.active = false;
                card2.active = false;
            })
            .start();

        tween(this._view._Nego_score)
            .delay(0.6)
            .call(() => {
                this._view._Nego_score.active = true;
                this._view._Nego_score.getComponent(UIOpacity).opacity = 255;
                this._view._Nego_score.getComponent(Label).string = `+${score}`;
                MahjongData.getInstance().curentScore += score;
                this._view._Nego_score.setPosition(v3(this._view._Nego_score.getPosition().x, 23, 0));
            })
            .delay(0.3)
            .to(0.3, { position: v3(this._view._Nego_score.getPosition().x, 53, 0) }, { easing: "backIn" })
            .start();

        tween(this._view._Nego_score.getComponent(UIOpacity))
            .delay(1.5)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this._view._Nego_score.active = false;
            })
            .start();
    }

    /** 更新移动的光标 */
    updateMoveCard(numbers: number[]) {
        let list: number[][][] = MahjongData.getInstance().noPressedCard;
        if (list.length > 0) {
            let disList = [];
            let card: number[][] = [];
            let distance = (pos, layer) => {
                let dis = MahjongUtils.calculateDistance([numbers[1], numbers[2]], [pos[0], pos[1]], 2);
                disList.push(dis);
                card.push([layer, pos[0], pos[1]]);
            }
            for (let i = 0; i < list.length; i++) {
                let temp = list[i];
                if (temp.length > 0 && temp[0].length > 0) {
                    temp.forEach((v) => distance(v, i + 1))
                }
            }
            const minValue = Math.min(...disList);
            const minIndex = disList.indexOf(minValue);
            this.moveCardPos = [].concat(card[minIndex]);
            this.updateMovePos();
        }
    }

    /** 游戏结束 */
    async gameOver() {
        MahjongData.getInstance().isGameOver = true;
        MahjongData.getInstance().saveUserData();
        this.stopTime();
        setTimeout(async () => {
            if (this.gameoverLogic) {
                this.gameoverLogic.SetActive(true);
            } else {
                this.gameoverLogic = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Gameover, UIPnlOverLogic);
            }
            this.gameoverLogic.setOverInfo();
        }, 2000);
    }

}
