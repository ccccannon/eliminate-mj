
import { _decorator, Component, Node, AudioSource, AudioClip, resources, assert, assetManager, loader, director, game, js, url } from 'cc';
import { LogUtil } from '../../module/log/LogUtil';

const { ccclass, property } = _decorator;

@ccclass('AudioMgr')
export class AudioMgr {
    public static Ins: AudioMgr
    musicVolume: number = 1;
    soundVolume: number = 1;
    baseSoundVolume: number = 1;
    baseMusicVolume: number = 1;
    music: AudioSource = null;
    oldMusicName = null;
    sounds: { [key: string]: AudioSource } = js.createMap();
    //private gameCfg:any = null

    async init() {
        this.soundVolume = 1;
        this.musicVolume = 1;
        this.baseSoundVolume = 1;
        this.baseMusicVolume = 1;
        if (this.isOpenSound()) {
            this.openSound()
        } else {
            this.hideSound();
        }
        if (this.isOpenMusic()) {
            this.openMusic();
        } else {
            this.hideMusic();
        }
    }

    onChangeMusic(isOpen) {
        this.saveMusicState(isOpen);
    }

    onChangeSound(isOpen) {
        this.saveSoundState(isOpen);
    }

    /**
     * 
     * @param loop 是否循环播放
     * @param scene 场景 1 大厅 2 游戏
     */
    async playMusic(path: string, loop: boolean, name?: string) {
        //let currSceneName = director.getScene().name;
        let musicName = name
        if (!musicName) {
            musicName = this.getSoundName(path)
        }


        resources.load(path, (err, clip: AudioClip) => {
            if (err) {
                LogUtil.E(`load sound ${path} err `, err);
                return;
            }
            if (!this.music) {
                let node = new Node();
                this.music = node.addComponent(AudioSource);
                director.getScene().addChild(node);
            }
            this.music.stop();
            this.music.loop = loop;
            this.music.clip = clip;
            if (this.baseMusicVolume > 0) {
                this.music.play();
            }
            this.music.volume = this.musicVolume;
        });
    }


    playSound(path: string, isLoop: boolean = false, name?: string) {
        let soundName = name
        if (!soundName) {
            soundName = this.getSoundName(path)
        }

        resources.load(path, (err, clip: AudioClip) => {
            if (err) {
                LogUtil.E(`load sound ${path} err `, err);
                return;
            }
            let audio = this.sounds[path];
            if (!audio) {
                let node = new Node();
                audio = node.addComponent(AudioSource);
                this.sounds[path] = audio;
                director.getScene().addChild(node);
            }
            audio.loop = isLoop;
            audio.volume = this.soundVolume
            if (isLoop) {
                audio.clip = clip;
                if (this.baseSoundVolume > 0) {
                    audio.play();
                }
            } else {
                audio.stop();
                if (this.baseSoundVolume > 0) {
                    audio.playOneShot(clip);
                }
            }
        });
    }

    getSoundName(path: string) {
        let nameNumber = path.lastIndexOf('/')
        let name = path.slice(nameNumber + 1, path.length)
        return name
    }

    stopSound(path: string) {
        let sound = this.sounds[path];
        if (sound) {
            sound.stop();
        }
    }

    hideMusic() {
        this.baseMusicVolume = 0;
        if (this.music)
            this.music.pause();
    }

    openMusic() {
        this.baseMusicVolume = 1;
        if (this.music)
            this.music.play();
    }

    hideSound() {
        this.baseSoundVolume = 0;
        for (const key in this.sounds) {
            let sound = this.sounds[key];
            sound.stop();
        }
    }

    openSound() {
        this.baseSoundVolume = 1;
    }

    setSoundVolume(value) {
        this.soundVolume = value;
        for (const key in this.sounds) {
            let sound = this.sounds[key];
            sound.volume = value;
        }
    }

    setMusicVolume(value) {
        if (this.music) {
            this.music.volume = value;
        }
        this.musicVolume = value;
    }
    getSoundVolume() {
        return this.soundVolume;
    }

    getMusicVolume() {
        return this.musicVolume;
    }
    /*
 * state 1：开，0：关
 */
    isOpenMusic(): boolean {
        let stateString = localStorage.getItem('local_cache_music_state');
        // LogUtil.D(`music_state isOpenMusic == `, stateString);
        // 初始的时候没有定义
        if (stateString == null || stateString == undefined || stateString == " " || stateString == "") {
            stateString = '1';
        }
        let state = parseInt(stateString);
        return state == 1 ? true : false;
    }

    /*
    * state 1：开，0：关
    */
    isOpenSound(): boolean {
        let stateString = localStorage.getItem('local_cache_sound_state');
        // LogUtil.D(`sound_state isOpenSound == `, stateString);
        // 初始的时候没有定义
        if (stateString == null || stateString == undefined || stateString == " " || stateString == "") {
            stateString = '1';
        }

        let state = parseInt(stateString);

        return state == 1 ? true : false;
    }

    saveMusicState(state) {
        if (!state) {
            this.hideMusic();
        } else {
            this.openMusic();
        }
        let value = state ? 1 : 0;
        localStorage.setItem('local_cache_music_state', value + '');
    }

    saveSoundState(state) {
        if (!state) {
            this.hideSound();
        } else {
            this.openSound();
        }
        let value = state ? 1 : 0;
        localStorage.setItem('local_cache_sound_state', value + '');
    }

}

