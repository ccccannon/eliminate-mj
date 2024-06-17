import { MahjongTile, Suit, scoreTable } from "./MahjongConstant";

/** 麻将工具 */
export class MahjongUtils {

    /** 初始化麻将牌 */
    public static initMahjongTiles() {
        let mahjongTiles: MahjongTile[] = [];
        // 初始化序牌
        for (let suit of [Suit.WAN, Suit.BING, Suit.TIAO]) {
            for (let value = 1; value <= 9; value++) {
                for (let count = 0; count < 4; count++) {
                    mahjongTiles.push({ suit, value });
                }
            }
        }
        // 初始化字牌
        for (let suit of [Suit.DONG, Suit.NAN, Suit.XI, Suit.BEI, Suit.ZHONG, Suit.FA, Suit.BAI]) {
            for (let count = 0; count < 4; count++) {
                mahjongTiles.push({ suit, value: 0 });
            }
        }
        // 初始化花牌
        for (let suit of [Suit.CHUN, Suit.XIA, Suit.QIU, Suit.DONG1, Suit.MEI, Suit.LAN, Suit.ZHU, Suit.JU]) {
            mahjongTiles.push({ suit, value: 0 });
        }
        return mahjongTiles;
    }

    /** 获取随机的牌 */
    public static getSelectedPairs(mahjongTiles: MahjongTile[]) {
        // 随机中排除花牌144-8=136
        let newArray = mahjongTiles.slice(0, 136);
        // 从所有牌中随机选取10-15对
        let selectedPairs: MahjongTile[] = [];
        const randomNumber = Math.floor(Math.random() * 6) + 10;
        while (selectedPairs.length < randomNumber) {
            const randomIndex = Math.floor(Math.random() * newArray.length);
            const pair = newArray[randomIndex];

            // 检查是否已经包含相同的牌
            const isPairUnique = !selectedPairs.some(existingPair =>
                existingPair.suit === pair.suit && existingPair.value === pair.value
            );

            if (isPairUnique) {
                selectedPairs.push(pair);
            }
        }
        return selectedPairs;
    }

    /** 深拷贝数组 */
    public static copyArray(array) {
        return JSON.parse(JSON.stringify(array));
    }

    /** 获取随机列表 */
    public static getRandomList(length: number, randomLength: number) {
        const randomIndices: number[] = [];
        while (randomIndices.length < randomLength) {
            const randomIndex = Math.floor(Math.random() * length);

            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
            }
        }
        randomIndices.sort((a, b) => a - b)
        return randomIndices;
    }

    /** 获取按钮数值 */
    public static getBtnNumber(inputString: string) {
        const numbers = inputString
            .replace("Btn", "")
            .split("_")
            .filter(part => !isNaN(parseFloat(part)))
            .map(part => parseFloat(part));
        return numbers;
    }

    /** 获取牌值 */
    public static getCardValue(list: string[]) {
        // 使用 reduce 统计每个元素的数量
        const countMap = list.reduce((acc, item) => {
            const group1 = ['春', '夏', '秋', '冬'];
            const group2 = ['梅', '兰', '竹', '菊'];

            if (group1.includes(item)) {
                acc['春'] = (acc['春'] || 0) + 1;
            } else if (group2.includes(item)) {
                acc['梅'] = (acc['梅'] || 0) + 1;
            } else {
                acc[item] = (acc[item] || 0) + 1;
            }
            return acc;
        }, {});
        return countMap;
    }

    /** 计算消除分数 */
    public static calculateScore(text: string) {
        // 将输入的字符串按空格切割为牌组
        const cards = text.split(' ');

        // 计算总分数
        const totalScore = cards.reduce((acc, card) => {
            const score = scoreTable[card[1]] || scoreTable[card];
            return score;
        }, 0);

        return totalScore;
    }

    // 显示剩余时间
    public static displayTime(duration: number) {
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;
        const formattedTime = `${this.formatNumber(minutes)}:${this.formatNumber(seconds)}`;
        return formattedTime;
    }

    // 格式化数字，确保两位数
    public static formatNumber(value: number): string {
        return value < 10 ? `0${value}` : `${value}`;
    }

    /** 计算距离 */
    public static calculateDistance(point1: number[], point2: number[], pointNum: number): number {
        const [x1, y1] = point1;
        const [x2, y2] = point2;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return Number(distance.toFixed(pointNum));
    }
}