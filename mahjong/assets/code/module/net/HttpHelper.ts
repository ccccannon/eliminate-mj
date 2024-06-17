import { _decorator, Component, Node, EventTouch ,sys} from 'cc';
import { DebugDraw } from '../../module/debug/DebugDraw';
import { LogUtil } from '../../module/log/LogUtil';
const { ccclass, property } = _decorator;


let kTimeout = 10000 // 10s 超时

export class HttpHelper {

    // ------------------- 回调接口
    public static postDataCb(url: string, data: Uint8Array, callback?: (isOk: boolean, msg: Uint8Array | any) => void) {
        let xhr = new XMLHttpRequest()
        xhr.responseType = "arraybuffer" // 必须指定为类型, 才能上行流
        xhr.open('POST', url)
        xhr.setRequestHeader('Conten-Type', 'application/octet-stream')
        xhr.ontimeout = () => {
            xhr.abort();
            callback(false, "postDataCb ontimeout")
        };
        xhr.onerror = () => {
            callback(false, "postDataCb onerror")
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return; // 会回调两次, 需要用这个判断去掉

            if (xhr.status === 200) {
                callback(true, xhr.response)
            } else {
                callback(false, `--- postDataCb fail, code: ${xhr.status}`)
            }
        }
        xhr.send(data)
    }

    private static cookies: { [key: string]: string } = {};
    private static header:{} ={};
    public static postJsonCb(url: string, json: string, header: any = {}, callback?: (isOk: boolean, msg: string | any) => void) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = kTimeout
        xhr.open("POST",url)
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        if (HttpHelper.getUserToken()) {
            xhr.setRequestHeader('User-Token', HttpHelper.getUserToken());
        }
        if (HttpHelper.getXLogId()) {
            xhr.setRequestHeader("x-log-id",HttpHelper.getXLogId())
        }
        xhr.ontimeout = () => {
            xhr.abort();
            callback(false, "postJsonCb ontimeout")
        };
        xhr.onerror = () => {
            callback(false, "postJsonCb onerror")
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return; // 会回调两次, 需要用这个判断去掉

            if (xhr.status === 200) {
                const cookieHeader = xhr.getAllResponseHeaders()
                const tokenHeader = xhr.getResponseHeader('User-Token');
                const logIdHeader = xhr.getResponseHeader('x-log-id');
                console.log("cookieHeader =",cookieHeader);
                if (tokenHeader){
                    HttpHelper.setUserToken(tokenHeader)
                }
                if (logIdHeader){
                    HttpHelper.setXLogId(logIdHeader)
                }
                callback(true, xhr.responseText)
            } else {
                LogUtil.D(`--- postJsonCb fail, code: ${xhr.status}`)
                callback(false, xhr.status)
            }
        }
        xhr.send(json);
    }
    public static getCookie(): string {
        const cookieStrings: string[] = [];
        for (const key in HttpHelper.cookies) {
          cookieStrings.push(`${key}=${HttpHelper.cookies[key]}`);
        }
        return cookieStrings.join('; ');
      }
    
    public static setCookie(cookieHeader: string): void {
        const cookieStrings = cookieHeader.split(';');
        for (const cookieString of cookieStrings) {
          const cookieParts = cookieString.split('=');
          if (cookieParts.length === 1) {
            HttpHelper.cookies[cookieParts[0]] = cookieParts[1];
          }
        }
      }

    public static getUserToken(): string {
        return HttpHelper.header[0]
    }
    
    public static setUserToken(tokenHeader: string): void {
        HttpHelper.header[0] = tokenHeader
    } 
    public static getXLogId(): string {
        return HttpHelper.header[1]
    }
    
    public static setXLogId(logIdHeader: string): void {
        HttpHelper.header[1] = logIdHeader
    } 
    public static getCb(url: string, callback?: (isOk: boolean, msg: Uint8Array | any) => void) {
        let xhr = new XMLHttpRequest()
        xhr.responseType = "arraybuffer" // 必须指定为类型, 才能上行流
        xhr.open('GET', url)
        xhr.setRequestHeader('Conten-Type', 'application/octet-stream')
        xhr.ontimeout = () => {
            xhr.abort();
            callback(false, "getCb ontimeout")
        };
        xhr.onerror = () => {
            callback(false, "getCb onerror")
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return; // 会回调两次, 需要用这个判断去掉

            if (xhr.status === 200) {
                callback(true, xhr.response)
            } else {
                callback(false, `--- getCb fail, code: ${xhr.status}`)
            }
        }
        xhr.send()
    }

    // ------------------- 异步接口
    public static postDataAsync(url: string, data: Uint8Array) {
        return new Promise<{ isOk: boolean, buff: Uint8Array }>((resolve) => {
            HttpHelper.postDataCb(url, data, (isOk, buff) => {
                resolve({ isOk: isOk, buff: buff });
            })
        })
    }

    public static postJsonAsync(url: string, json: string) {
        let header = new Map() // TODO: web 先糊着
        return new Promise<{ isOk: boolean, msg: string }>((resolve) => {
            HttpHelper.postJsonCb(url, json, header, (isOk, msg) => {
                resolve({ isOk: isOk, msg: msg });
            })
        })
    }

    public static getAsync(url: string) {
        return new Promise<{ isOk: boolean, bts: ArrayBuffer }>((resolve) => {
            HttpHelper.getCb(url, (isOk, bts) => {
                resolve({ isOk: isOk, bts: bts })
            })
        })
    }
}


