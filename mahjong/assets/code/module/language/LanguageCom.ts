
import { _decorator, Component, Label, path, Enum, CCString, CCInteger, AssetManager, resources, assetManager } from 'cc';
import { EDITOR } from 'cc/env';
import { EnumEvent } from '../../logic/common/EnumEvent';
import { EventSys } from '../event/EventSys';
import { ResMgr } from '../res/ResMgr';
import { Lang, LanguageList } from './Lang';

const { ccclass, property, executeInEditMode } = _decorator;

let LanguageType = Enum(Object.keys(LanguageList).reduce((result, item, index, arr) => {
    result[item] = index;
    return result
}, {}))

@ccclass('LanguageCom')
@executeInEditMode(true)
export class LanguageCom extends Component {
    @property(CCString)
    _key = ""
    @property(CCInteger)
    _lang = 2

    @property(CCString)
    get key() {
        return this._key;
    }
    set key(value) {
        this._key = value;
        this.onLoad();
    }

    @property({ type: LanguageType })
    get lang() {
        return this._lang
    };
    set lang(value) {
        this._lang = value;
        this.onLoad();
    }

    async onLoad() {
        if (EDITOR) {
            let text = null
            let url = path.join(window["Editor"]["Project"].path, 'assets/resources/dataconfig/language.json')
            let json = window["require"]('fs').readFileSync(url, 'utf-8')
            let config = JSON.parse(json);
            text = config[this.key];
            if (text) {
                let lan = LanguageList[LanguageType[this.lang]]
                if (lan) {
                    this.node.getComponent(Label).string = text[lan];
                } else {
                    this.node.getComponent(Label).string = ""
                }
            } else {
                this.node.getComponent(Label).string = ""
            }
        } else {
            this.node.getComponent(Label).string = Lang.getText(this.key);
        }
        //更新多语言
        EventSys.Reg(EnumEvent.ChangeLanguage, this.refresh.bind(this));
    }

    onDestroy() {
        EventSys.UnReg(EnumEvent.ChangeLanguage, this.refresh.bind(this));
    }

    refresh(key?) {
        if (key) {
            this.key = key;
        }
        this.node.getComponent(Label).string = Lang.getText(this.key);
    }
}
