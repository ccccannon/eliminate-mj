import { Color, Sprite, Node, Widget, UITransform, v3, Label, sys } from "cc";
import { MahjongTile, Suit, cardList1, cardList2, cardList3, cardList4, cardList5, otherCardList1 } from "./MahjongConstant";
import { MahjongUtils } from "./MahjongUtils";

const cardArray = [cardList1, cardList2, cardList3, cardList4];

/** 麻将数据 */
export class MahjongData {
    private static Ins: MahjongData;

    static getInstance(): MahjongData {
        if (!MahjongData.Ins) {
            MahjongData.Ins = new MahjongData();
        }
        return MahjongData.Ins;
    }
    /** 麻将父节点 */
    public mahjongRoot: Node = null;
    /** 初始化麻将牌 */
    public mahjongTiles: MahjongTile[] = [];
    /** 所有麻将 */
    public allCard: Map<number, number[][]> = new Map();
    /** 第一层其他牌 */
    public oneOtherCardList: number[][] = [];
    /** 第五层牌 */
    public fiveCard: number[] = [];
    /** 得分 */
    public curentScore: number = 0;
    /** 可点击卡牌 */
    public clickList: number[][][] = [];
    /** 所有没被全部压住的牌 */
    public noPressedCard: number[][][] = [];
    /** 倒计时时间 */
    public countDownTime: number = 0;
    /** 游戏结束 */
    public isGameOver: boolean = false;
    /** 正在提示 */
    public isHint: boolean = false;

    /** 获取卡牌节点 */
    getCardNode(layer: number, x: number, y: number) {
        return this.mahjongRoot.getChildByName("LayC_content").getChildByName(`Btn${layer}_${x}_${y}`);
    }

    /** 初始化卡牌 */
    public initMahjong() {
        for (let i = 0; i < 4; i++) {
            this.allCard.set(i + 1, MahjongUtils.copyArray(cardArray[i]));
        }
        this.oneOtherCardList = MahjongUtils.copyArray(otherCardList1);
        this.fiveCard = MahjongUtils.copyArray(cardList5);
        this.mahjongTiles = MahjongUtils.copyArray(MahjongUtils.initMahjongTiles());
    }

    /** 找出所有可点击的卡牌 */
    setSideCard() {
        let array: number[][][] = [];
        for (let i = 0; i < 4; i++) {
            array[i] = this.getRemoveCard(i + 1);
        }
        array[4] = [];
        // 第五层
        this.fiveCard.length > 0 ? array[4].push(this.fiveCard) : [];
        // 移出上面压住的
        for (let i = 0; i < 3; i++) {
            array[i] = this.removePressed(array[i], i + 2);
        }
        array[3] = this.removeFourPressed(array[3]);
        // 第一层需要判断特殊的三张牌
        array[0] = this.getOneCard(array[0]);
        this.clickList = MahjongUtils.copyArray(array);
    }

    /** 筛选最左边和最右边的卡牌 */
    getRemoveCard(layer: number) {
        let cardList: number[][] = [];
        let curCard = this.allCard.get(layer);
        for (let i = 0; i < curCard.length; i++) {
            let list = curCard[i].filter(v => v > 0);
            if (list.length == 0) {
                continue;
            }
            let card = curCard[i];
            const firstOneIndex = card.indexOf(1);
            const lastOneIndex = card.lastIndexOf(1);
            cardList.push([firstOneIndex, i]);
            if (firstOneIndex != lastOneIndex) {
                cardList.push([lastOneIndex, i]);
            }
        }
        return cardList;
    }

    /** 第一层需要判断特殊的三张牌 */
    getOneCard(card1: number[][]) {
        let oneLeft = this.oneOtherCardList.filter(v => v[0] == -1).length > 0;
        let oneRight = this.oneOtherCardList.filter(v => v[0] == 13).length > 0;
        let twoRight = this.oneOtherCardList.filter(v => v[0] == 12).length > 0;
        if (oneLeft) {
            card1.push([-1, 3.5]);
            card1 = card1.filter(v => !(v[0] == 0 && v[1] == 3 || v[0] == 0 && v[1] == 4))
        }
        if (oneRight) {
            card1.push([13, 3.5]);
            card1 = card1.filter(v => !(v[0] == 11 && v[1] == 3 || v[0] == 11 && v[1] == 4))
        }
        if (!oneRight && twoRight) {
            card1.push([12, 3.5]);
            card1 = card1.filter(v => !(v[0] == 11 && v[1] == 3 || v[0] == 11 && v[1] == 4))
        }
        return card1;
    }

    /** 移出上面压住的 */
    removePressed(card: number[][], layer: number) {
        let curCard = this.allCard.get(layer);
        let array: number[] = [];
        for (let i = 0; i < card.length; i++) {
            let temp = card[i];
            if (curCard[temp[1]][temp[0]] > 0) {
                array.push(i);
            }
        }
        card = card.filter((v, i) => !array.includes(i));
        return card;
    }

    /** 第四层压住的特殊处理 */
    removeFourPressed(card: number[][]) {
        return this.fiveCard.length > 0 ? [] : card;
    }

    /** 找出所有没被压住的牌 */
    getAllNoPressedCard() {
        let array: number[][][] = [];
        for (let i = 0; i < 4; i++) {
            let curCard = this.allCard.get(i + 1);
            let cardList: number[][] = [];
            for (let i = 0; i < curCard.length; i++) {
                let list = curCard[i].filter(v => v > 0);
                if (list.length == 0) {
                    continue;
                }
                curCard[i].map((v, j) => {
                    if (v > 0) cardList.push([j, i]);
                })
            }
            array[i] = cardList;
        }
        // 移出上面压住的
        for (let i = 0; i < 3; i++) {
            array[i] = this.removePressed(array[i], i + 2);
        }
        array[4] = [];
        array[4].push(this.fiveCard);
        let oneLeft = this.oneOtherCardList.filter(v => v[0] == -1).length > 0;
        let oneRight = this.oneOtherCardList.filter(v => v[0] == 13).length > 0;
        let twoRight = this.oneOtherCardList.filter(v => v[0] == 12).length > 0;
        if (oneLeft) array[0].push([-1, 3.5]);
        if (oneRight) array[0].push([13, 3.5]);
        if (twoRight) array[0].push([12, 3.5]);
        this.noPressedCard = MahjongUtils.copyArray(array);

        this.showShadow();
    }

    /** 阴影处理 */
    showShadow() {
        let cardParent = this.mahjongRoot.getChildByName("LayC_content")
        for (let i = 0; i < 5; i++) {
            let array = this.noPressedCard[i];
            if (array.length > 0 && array[0].length > 0) {
                for (let j = 0; j < array.length; j++) {
                    let node = cardParent.getChildByName(`Btn${i + 1}_${array[j][0]}_${array[j][1]}`);
                    node.getChildByName("Shade0").active = false;
                    if (node && node.getChildByName("Shade1"))
                        node.getChildByName("Shade1").active = false;
                    node.getChildByName("Shade2").active = false;
                }
            }
        }
        for (let i = 0; i < 5; i++) {
            let array = this.noPressedCard[i];
            if (array.length > 0 && array[0].length > 0) {
                let temp = [];
                let temp1 = [];
                for (let j = 0; j < array.length; j++) {
                    let node = cardParent.getChildByName(`Btn${i + 1}_${array[j][0]}_${array[j][1]}`);
                    node.getChildByName("Shade2").active = true;
                    array.filter((v, n) => {
                        if (v[0] == array[j][0] - 1 && v[1] == array[j][1]) {
                            temp.push(array[j]);
                        }
                    })
                    array.filter((v, n) => {
                        if (v[1] == array[j][1] - 1 && v[0] == array[j][0]) {
                            temp1.push(array[j]);
                        }
                    })
                }
                const result1 = array.filter(item1 => {
                    return !temp.some(item2 => item2[0] === item1[0] && item2[1] === item1[1]);
                });
                result1.forEach(v => {
                    let node = cardParent.getChildByName(`Btn${i + 1}_${v[0]}_${v[1]}`);
                    if (node && node.getChildByName("Shade1"))
                        node.getChildByName("Shade1").active = true;
                })

                const result2 = array.filter(item1 => {
                    return !temp1.some(item2 => item2[0] === item1[0] && item2[1] === item1[1]);
                });
                result2.forEach(v => {
                    let node = cardParent.getChildByName(`Btn${i + 1}_${v[0]}_${v[1]}`);
                    node.getChildByName("Shade0").active = true;
                })
            }
        }
        let oneLeft = this.oneOtherCardList.filter(v => v[0] == -1).length > 0;
        let twoRight = this.oneOtherCardList.filter(v => v[0] == 12).length > 0;
        if (oneLeft) {
            this.updateShadowLayer(cardParent, true);
        }
        if (twoRight) {
            let node = cardParent.getChildByName(`Btn1_12_3.5`);
            node.getChildByName("Shade1").active = false;
        }
    }

    /** 更新阴影层级 */
    updateShadowLayer(cardParent: Node, isUpdate: boolean) {
        let bgNode = cardParent.parent.getChildByName("bg");
        let node = cardParent.getChildByName(`Btn1_0_3`);
        let node1 = cardParent.getChildByName(`Btn1_0_4`);

        if (isUpdate) {
            let shade1 = node.getChildByName("Shade1");
            if (shade1) {
                let shade2 = node1.getChildByName("Shade1");
                let worldPos1 = shade1.getComponent(UITransform).convertToWorldSpaceAR(v3());
                shade1.parent = bgNode;
                let localPos1 = bgNode.getComponent(UITransform).convertToNodeSpaceAR(worldPos1);
                shade1.setPosition(localPos1);

                let worldPos2 = shade2.getComponent(UITransform).convertToWorldSpaceAR(v3());
                shade2.parent = bgNode;
                let localPos2 = bgNode.getComponent(UITransform).convertToNodeSpaceAR(worldPos2);
                shade2.setPosition(localPos2);
            }
        } else {
            let shade1 = bgNode.children[0];
            let shade2 = bgNode.children[1];

            let worldPos1 = shade1.getComponent(UITransform).convertToWorldSpaceAR(v3());
            shade1.parent = node;
            shade1.setSiblingIndex(0);
            let localPos1 = node.getComponent(UITransform).convertToNodeSpaceAR(worldPos1);
            shade1.setPosition(localPos1);

            let worldPos2 = shade2.getComponent(UITransform).convertToWorldSpaceAR(v3());
            shade2.parent = node1;
            shade2.setSiblingIndex(0);
            let localPos2 = node1.getComponent(UITransform).convertToNodeSpaceAR(worldPos2);
            shade2.setPosition(localPos2);
        }
    }

    /** 存档 */
    saveUserData() {
        if (this.curentScore == 0) return;
        if (MahjongData.getInstance().isGameOver) {
            sys.localStorage.removeItem('userData');
            return;
        }

        let nodeParent = this.mahjongRoot.getChildByName("LayC_content");
        let mahjongList: MahjongTile[] = [];
        let nameList: string[] = [];
        nodeParent.children.map((v, i) => {
            let mahjong: MahjongTile = { value: -1, suit: Suit.WAN };
            if (v.active) {
                let name = v.getChildByName("TextC_card").getComponent(Label).string;
                mahjong.value = name.length > 1 ? parseInt(name) : 0;
                mahjong.suit = name.length > 1 ? name[1] as Suit : name as Suit;
            }
            mahjongList.push(mahjong);
            nameList.push(v.name);
        })
        let userData = {
            allCard: Array.from(this.allCard),
            oneOtherCardList: this.oneOtherCardList,
            fiveCard: this.fiveCard,
            curentScore: this.curentScore,
            countDownTime: this.countDownTime,
            mahjongList: mahjongList,
            nameList: nameList
        }
        // console.log("saveUserData userData", JSON.stringify(userData));
        sys.localStorage.setItem('userData', JSON.stringify(userData));
    }

    /** 读取存档 */
    loadUserData() {
        const jsonStr = sys.localStorage.getItem('userData');
        let userData = JSON.parse(jsonStr);
        // console.log("loadUserData userData", userData);
        return userData;
    }

    /** 设置用户数据 */
    setUserData(userData) {
        this.allCard = new Map(userData.allCard);
        this.oneOtherCardList = userData.oneOtherCardList;
        this.fiveCard = userData.fiveCard;
        this.curentScore = userData.curentScore;
        this.countDownTime = userData.countDownTime;
    }
}