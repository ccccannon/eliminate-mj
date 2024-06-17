import { js, JsonAsset } from "cc";
import { EnumEvent } from "../../logic/common/EnumEvent";
import { EventSys } from "../event/EventSys";
import { LogUtil } from "../log/LogUtil";
import { ResMgr } from "../res/ResMgr";

export enum LanguageList {
	zh_hk = "zh-HK",
	zh_mo = "zh-MO",
	zh_cn = "zh-CN",
	zh_tw = "zh-TW",
	zh_sg = "zh-SG",
	en_us = "en-US",
	en_gb = "en-GB",
	ms_bn = "ms-BN",
	ms_my = "ms-MY",
	ar_sa = 'ar-SA',
	vi_vn = "vi-VN",
	th_th = "th-TH",
	ko_kr = "ko-KR",
	ja_jp = "ja-JP",
	es_es = "es-ES",
	id_id = "id-ID",
	ur_pk = "ur-PK",
	tr_tr = "tr-TR",
	af_za = "af-ZA",
	az_az = "az-AZ",
	be_by = "be-BY",
	bg_bg = "bg-BG",
	bs_ba = "bs-BA",
	ca_es = "ca-ES",
	cs_cz = "cs-CZ",
	cy_gb = "cy-GB",
	da_dk = "da-DK",
	de_de = "de-DE",
	dv_mv = "dv-MV",
	et_ee = "et-EE",
	eu_es = "eu-ES",
	fa_ir = "fa-IR",
	fi_fi = "fi-FI",
	fo_fo = "fo-FO",
	fr_fr = "fr-FR",
	gl_es = "gl-ES",
	gu_in = "gu-IN",
	he_il = "he-IL",
	hi_in = "hi-IN",
	hr_hr = "hr-HR",
	hu_hu = "hu-HU",
	hy_am = "hy-AM",
	is_is = "is-IS",
	it_it = "it-IT",
	ka_ge = "ka-GE",
	kk_kz = "kk-KZ",
	kn_in = "kn-IN",
	kok_in = "kok-IN",
	ky_kg = "ky-KG",
	lt_lt = "lt-LT",
	lv_lv = "lv-LV",
	mi_nz = "mi-NZ",
	mk_mk = "mk-MK",
	mn_mn = "mn-MN",
	mr_in = "mr-IN",
	mt_mt = "mt-MT",
	nb_no = "nb-NO",
	nl_nl = "nl-NL",
	nn_no = "nn-NO",
	ns_za = "ns-ZA",
	pa_in = "pa-IN",
	pl_pl = "pl-PL",
	pt_pt = "pt-PT",
	pt_br = "pt-BR",
	qu_bo = "qu-BO",
	ro_ro = "ro-RO",
	ru_ru = "ru-RU",
	sa_in = "sa-IN",
	se_se = "se-SE",
	sk_sk = "sk-SK",
	sl_si = "sl-SI",
	sq_al = "sq-AL",
	sr_ba = "sr-BA",
	sv_se = "sv-SE",
	sw_ke = "sw-KE",
	syr_sy = "syr-SY",
	ta_in = "ta-IN",
	te_in = "te-IN",
	tl_ph = "tl-PH",
	tn_za = "tn-ZA",
	tt_ru = "tt-RU",
	uk_ua = "uk-UA",
	uz_uz = "uz-UZ",
	xh_za = "xh-ZA",
	zu_za = "zu-ZA"
}

export class Lang {
	private static _config: any = js.createMap();
	public static curLanguageStr = LanguageList.en_us;

	static set config(cfg) {
		this._config = cfg;
	}
	static get config() {
		return this._config;
	}


	public static async Start(Language: LanguageList) {
		let ja: JsonAsset = await new Promise((res, rej) => {
			ResMgr.Ins.load('dataconfig/language', JsonAsset, (error, ja: JsonAsset) => {
				res(ja)
			})
		})

		this.config = ja.json
		ja.decRef() // 及时释放

		this.setCurLanguage(Language)
		EventSys.Fire(EnumEvent.ChangeLanguage);
	}

	//加载远程多语言
	public static async loadRemoteLanguage(url) {
		let ja: JsonAsset = await new Promise((res, rej) => {
			ResMgr.Ins.loadRemote(url, JsonAsset, (error, ja: JsonAsset) => {
				res(ja)
			})
		})

		this.config = ja.json
		ja.decRef() // 及时释放

		EventSys.Fire(EnumEvent.ChangeLanguage);
	}

	private static isLanguageContains(key) {
		for (const k in this._config) {
			if (this._config[k][key] != undefined) {
				return true
			}
			break
		}
		return false
	}

	public static setCurLanguage(curlanguage) {
		LogUtil.D("curlanguage", curlanguage)
		if (!this.isLanguageContains(curlanguage)) {
			this.curLanguageStr = LanguageList.en_us;
		} else {
			this.curLanguageStr = curlanguage;
		}
		LogUtil.D("this.curLanguageStr", this.curLanguageStr)
	}



	public static getText(key: string, ...args) {
		if (this.config[key]) {
			let t = js.formatStr(this.config[key][this.curLanguageStr], ...args);
			return t || "";
		} else {
			return ""
		}
	}
}