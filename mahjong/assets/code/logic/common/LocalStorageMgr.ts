import { sys } from 'cc';
import { LogUtil } from '../../module/log/LogUtil';

/**
 * @class localStorage 操作类
 */
export class localStorageMgr {
    static set(key: string, value: any, type: string = 'string') {
        if (!value) value = value + ''; // 排除null和undefined
        let saveData = value;
        if (type === 'object') {
            saveData = JSON.stringify(value);
        }
        sys.localStorage.setItem(key, saveData);
    }

    static get(key: string, type: string = 'string') {
        const storageValue = sys.localStorage.getItem(key);
        return this.formatType(storageValue, type);
    }

    static formatType(data, type) {
        if (type === 'boolean') {
            if (data === 'false') return false;
            return Boolean(data);
        } else if (type === 'number') {
            return Number(data);
        } else if (type === 'object') {
            return this.safeParse(data);
        } else {
            return data;
        }
    }

    static safeParse(jsonStr: string) {
        let data = null;
        try {
            data = JSON.parse(jsonStr);
        } catch (e) {
            LogUtil.E('parse [ ' + jsonStr + ' ] failed!');
        }
        return data;
    }

    static remove(key: string) {
        return sys.localStorage.removeItem(key);
    }

    static clear() {
        return sys.localStorage.clear();
    }
}
