import { LogUtil } from "../log/LogUtil"

// 上下行流的打包解包, 处理粘包问题
export class Codec {

    public static encode(buff: Uint8Array): Uint8Array {
        const total = new Uint8Array(2 + buff.byteLength)
        total.set([buff.byteLength & 255, (buff.byteLength >>> 8) & 255], 0)
        total.set(buff, 2)
        return total
    }

    public static decode(buff: ArrayBuffer): Array<Uint8Array> {
        const resArr = new Array<Uint8Array>()
        Codec.innerDecode(buff, resArr)
        return resArr
    }

    private static innerDecode(buff: ArrayBuffer, resArr: Array<Uint8Array>) {
        try {
            const length = new Uint16Array(buff.slice(0, 2))[0]
            const res = new Uint8Array(buff.slice(2, 2 + length))
            resArr.push(res)

            // 剩余长度
            const nextLen = buff.byteLength - (2 + length)
            if (nextLen > 0) {
                Codec.innerDecode(buff.slice(2 + length, buff.byteLength), resArr)
            }
        } catch (ex) {
            LogUtil.E("--- Codec.innerDecode err:", ex)
        }
    }
}