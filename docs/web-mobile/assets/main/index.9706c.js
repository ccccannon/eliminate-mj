System.register("chunks:///_virtual/App.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResMgr.ts', './AudioMgr.ts', './ConfigMgr.ts', './EnumUI.ts', './DataMgr.ts', './TipsMgr.ts', './UIMgr.ts', './UIPnlMahjongLogic.ts', './UIPnlSystemLogic.ts'], function (exports) {
  'use strict';

  var _asyncToGenerator, _regeneratorRuntime, cclegacy, dynamicAtlasManager, ResMgr, AudioMgr, ConfigMgr, EnumUI, DataMgr, TipsManager, UIMgr, UIPnlMahjongLogic, UIPnlSystemLogic;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      dynamicAtlasManager = module.dynamicAtlasManager;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      ConfigMgr = module.ConfigMgr;
    }, function (module) {
      EnumUI = module.EnumUI;
    }, function (module) {
      DataMgr = module.DataMgr;
    }, function (module) {
      TipsManager = module.TipsManager;
    }, function (module) {
      UIMgr = module.UIMgr;
    }, function (module) {
      UIPnlMahjongLogic = module.UIPnlMahjongLogic;
    }, function (module) {
      UIPnlSystemLogic = module.UIPnlSystemLogic;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e20a4no4yBDkrber2XXNN1t", "App", undefined);

      var App = exports('App', /*#__PURE__*/function () {
        function App() {
          App.Ins = this;
          dynamicAtlasManager.enabled = false; // -- 禁止动态合图
          // PlatformMgr.Ins = new PlatformMgr()
          // HttpMgr.Ins = new HttpMgr()

          ResMgr.Ins = new ResMgr();
          UIMgr.Ins = new UIMgr();
          ConfigMgr.Ins = new ConfigMgr(); // NetErrCodeMgr.Ins = new NetErrCodeMgr()

          AudioMgr.Ins = new AudioMgr();
          DataMgr.Ins = new DataMgr();
          TipsManager.Ins = new TipsManager(); // NetConfig.Ins = new NetConfig()
        }

        var _proto = App.prototype;

        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return UIMgr.Ins.start();

                case 2:
                  _context.next = 4;
                  return AudioMgr.Ins.init();

                case 4:
                  // await Lang.Start(LanguageList.en_us)
                  // await NetErrCodeMgr.Ins.Init()
                  this.ShowLogin();
                // this.ShowDebugDraw()
                // await PlatformMgr.callNativeFn(EnumNative.HideSplash)

                case 5:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }() // 暂时先写在这
        ;

        _proto.ShowLogin = /*#__PURE__*/function () {
          var _ShowLogin = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Mahjong, UIPnlMahjongLogic);

                case 2:
                  _context2.next = 4;
                  return UIMgr.Ins.CreateWindowCustomAsync(EnumUI.SystemLogic, UIPnlSystemLogic);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function ShowLogin() {
            return _ShowLogin.apply(this, arguments);
          }

          return ShowLogin;
        }() // async ShowDebugDraw() {
        //     DebugDraw.Ins.ShowDebugDraw()
        // }
        ;

        return App;
      }());
      App.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AssetTracker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, LogUtil;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "d49b0CPWOBCz7xThImczNGy", "AssetTracker", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AssetTracker = exports('AssetTracker', (_dec = ccclass('AssetTracker'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AssetTracker, _Component);

        function AssetTracker() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._astArr = new Array();
          return _this;
        }

        AssetTracker.trace = function trace(go, ast) {
          var at = go.getComponent(AssetTracker);

          if (!at) {
            at = go.addComponent(AssetTracker);
          }

          at.traceInner(ast);
        };

        var _proto = AssetTracker.prototype;

        _proto.traceInner = function traceInner(ast) {
          ast.addRef();

          this._astArr.push(ast);
        };

        _proto.onDestroy = function onDestroy() {
          // LogUtil.D(`--- onDestroy, cnt: ${this._astArr.length}, _astArr:\n`, this._astArr)
          this._astArr.forEach(function (ast, idx, arr) {
            ast.decRef();
          });

          this._astArr = null; // TODO: web 优化, 可以丢到 resmgr 中去, 延迟 30s 在计数减 1
        };

        _proto.debugDump = function debugDump() {
          this._astArr.forEach(function (ast, idx, arr) {
            LogUtil.D("", ast);
          });
        };

        return AssetTracker;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, resources, Node, AudioSource, director, js, LogUtil;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
      Node = module.Node;
      AudioSource = module.AudioSource;
      director = module.director;
      js = module.js;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "f5391blf/pLfps2O1cecMqx", "AudioMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioMgr = exports('AudioMgr', (_dec = ccclass('AudioMgr'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function AudioMgr() {
          this.musicVolume = 1;
          this.soundVolume = 1;
          this.baseSoundVolume = 1;
          this.baseMusicVolume = 1;
          this.music = null;
          this.oldMusicName = null;
          this.sounds = js.createMap();
        }

        var _proto = AudioMgr.prototype; //private gameCfg:any = null

        _proto.init = /*#__PURE__*/function () {
          var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.soundVolume = 1;
                  this.musicVolume = 1;
                  this.baseSoundVolume = 1;
                  this.baseMusicVolume = 1;

                  if (this.isOpenSound()) {
                    this.openSound();
                  } else {
                    this.hideSound();
                  }

                  if (this.isOpenMusic()) {
                    this.openMusic();
                  } else {
                    this.hideMusic();
                  }

                case 6:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function init() {
            return _init.apply(this, arguments);
          }

          return init;
        }();

        _proto.onChangeMusic = function onChangeMusic(isOpen) {
          this.saveMusicState(isOpen);
        };

        _proto.onChangeSound = function onChangeSound(isOpen) {
          this.saveSoundState(isOpen);
        }
        /**
         * 
         * @param loop 是否循环播放
         * @param scene 场景 1 大厅 2 游戏
         */
        ;

        _proto.playMusic = /*#__PURE__*/function () {
          var _playMusic = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(path, loop, name) {
            var _this = this;

            var musicName;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  //let currSceneName = director.getScene().name;
                  musicName = name;

                  if (!musicName) {
                    musicName = this.getSoundName(path);
                  }

                  resources.load(path, function (err, clip) {
                    if (err) {
                      LogUtil.E("load sound " + path + " err ", err);
                      return;
                    }

                    if (!_this.music) {
                      var node = new Node();
                      _this.music = node.addComponent(AudioSource);
                      director.getScene().addChild(node);
                    }

                    _this.music.stop();

                    _this.music.loop = loop;
                    _this.music.clip = clip;

                    if (_this.baseMusicVolume > 0) {
                      _this.music.play();
                    }

                    _this.music.volume = _this.musicVolume;
                  });

                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function playMusic(_x, _x2, _x3) {
            return _playMusic.apply(this, arguments);
          }

          return playMusic;
        }();

        _proto.playSound = function playSound(path, isLoop, name) {
          var _this2 = this;

          if (isLoop === void 0) {
            isLoop = false;
          }

          var soundName = name;

          if (!soundName) {
            soundName = this.getSoundName(path);
          }

          resources.load(path, function (err, clip) {
            if (err) {
              LogUtil.E("load sound " + path + " err ", err);
              return;
            }

            var audio = _this2.sounds[path];

            if (!audio) {
              var node = new Node();
              audio = node.addComponent(AudioSource);
              _this2.sounds[path] = audio;
              director.getScene().addChild(node);
            }

            audio.loop = isLoop;
            audio.volume = _this2.soundVolume;

            if (isLoop) {
              audio.clip = clip;

              if (_this2.baseSoundVolume > 0) {
                audio.play();
              }
            } else {
              audio.stop();

              if (_this2.baseSoundVolume > 0) {
                audio.playOneShot(clip);
              }
            }
          });
        };

        _proto.getSoundName = function getSoundName(path) {
          var nameNumber = path.lastIndexOf('/');
          var name = path.slice(nameNumber + 1, path.length);
          return name;
        };

        _proto.stopSound = function stopSound(path) {
          var sound = this.sounds[path];

          if (sound) {
            sound.stop();
          }
        };

        _proto.hideMusic = function hideMusic() {
          this.baseMusicVolume = 0;
          if (this.music) this.music.pause();
        };

        _proto.openMusic = function openMusic() {
          this.baseMusicVolume = 1;
          if (this.music) this.music.play();
        };

        _proto.hideSound = function hideSound() {
          this.baseSoundVolume = 0;

          for (var _key in this.sounds) {
            var sound = this.sounds[_key];
            sound.stop();
          }
        };

        _proto.openSound = function openSound() {
          this.baseSoundVolume = 1;
        };

        _proto.setSoundVolume = function setSoundVolume(value) {
          this.soundVolume = value;

          for (var _key2 in this.sounds) {
            var sound = this.sounds[_key2];
            sound.volume = value;
          }
        };

        _proto.setMusicVolume = function setMusicVolume(value) {
          if (this.music) {
            this.music.volume = value;
          }

          this.musicVolume = value;
        };

        _proto.getSoundVolume = function getSoundVolume() {
          return this.soundVolume;
        };

        _proto.getMusicVolume = function getMusicVolume() {
          return this.musicVolume;
        }
        /*
        * state 1：开，0：关
        */
        ;

        _proto.isOpenMusic = function isOpenMusic() {
          var stateString = localStorage.getItem('local_cache_music_state'); // LogUtil.D(`music_state isOpenMusic == `, stateString);
          // 初始的时候没有定义

          if (stateString == null || stateString == undefined || stateString == " " || stateString == "") {
            stateString = '1';
          }

          var state = parseInt(stateString);
          return state == 1 ? true : false;
        }
        /*
        * state 1：开，0：关
        */
        ;

        _proto.isOpenSound = function isOpenSound() {
          var stateString = localStorage.getItem('local_cache_sound_state'); // LogUtil.D(`sound_state isOpenSound == `, stateString);
          // 初始的时候没有定义

          if (stateString == null || stateString == undefined || stateString == " " || stateString == "") {
            stateString = '1';
          }

          var state = parseInt(stateString);
          return state == 1 ? true : false;
        };

        _proto.saveMusicState = function saveMusicState(state) {
          if (!state) {
            this.hideMusic();
          } else {
            this.openMusic();
          }

          var value = state ? 1 : 0;
          localStorage.setItem('local_cache_music_state', value + '');
        };

        _proto.saveSoundState = function saveSoundState(state) {
          if (!state) {
            this.hideSound();
          } else {
            this.openSound();
          }

          var value = state ? 1 : 0;
          localStorage.setItem('local_cache_sound_state', value + '');
        };

        return AudioMgr;
      }(), _class2.Ins = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Base64Util.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ba66fa1081JlK64KOi32bOc", "Base64Util", undefined);

      var keyString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var Base64Util = exports('default', /*#__PURE__*/function () {
        function Base64Util() {}
        /**
         * 将普通文本编码为 Base64 格式文本
         * @param string 
         * @see
         */


        Base64Util.encodeString = function encodeString(string) {
          // codes from http://www.webtoolkit.info/javascript-base64.html
          var base64 = '';
          var i = 0;
          var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
          string = Base64Util.encodeUtf8(string);

          while (i < string.length) {
            chr1 = string.charCodeAt(i++);
            chr2 = string.charCodeAt(i++);
            chr3 = string.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            base64 = base64 + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
          }

          return base64;
        }
        /**
         * 将 Base64 格式文本解码为普通文本
         * @param base64 
         */
        ;

        Base64Util.decodeString = function decodeString(base64) {
          // codes from http://www.webtoolkit.info/javascript-base64.html
          var string = '';
          var i = 0;
          var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
          base64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          while (i < base64.length) {
            enc1 = keyString.indexOf(base64.charAt(i++));
            enc2 = keyString.indexOf(base64.charAt(i++));
            enc3 = keyString.indexOf(base64.charAt(i++));
            enc4 = keyString.indexOf(base64.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            string = string + String.fromCharCode(chr1);

            if (enc3 != 64) {
              string = string + String.fromCharCode(chr2);
            }

            if (enc4 != 64) {
              string = string + String.fromCharCode(chr3);
            }
          }

          string = Base64Util.decodeUtf8(string);
          return string;
        }
        /**
         * 将普通文本编码为 UTF-8 格式文本
         * @param string 
         */
        ;

        Base64Util.encodeUtf8 = function encodeUtf8(string) {
          // codes from http://www.webtoolkit.info/javascript-base64.html
          string = string.replace(/\r\n/g, "\n");
          var utf8 = '';

          for (var i = 0; i < string.length; i++) {
            var c = string.charCodeAt(i);

            if (c < 128) {
              utf8 += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
              utf8 += String.fromCharCode(c >> 6 | 192);
              utf8 += String.fromCharCode(c & 63 | 128);
            } else {
              utf8 += String.fromCharCode(c >> 12 | 224);
              utf8 += String.fromCharCode(c >> 6 & 63 | 128);
              utf8 += String.fromCharCode(c & 63 | 128);
            }
          }

          return utf8;
        }
        /**
         * 将为 UTF-8 格式文本解码为普通文本
         * @param utf8 
         */
        ;

        Base64Util.decodeUtf8 = function decodeUtf8(utf8) {
          // codes from http://www.webtoolkit.info/javascript-base64.html
          var string = '';
          var i = 0;
          var c1 = 0,
              c2 = 0,
              c3 = 0;

          while (i < utf8.length) {
            c1 = utf8.charCodeAt(i);

            if (c1 < 128) {
              string += String.fromCharCode(c1);
              i++;
            } else if (c1 > 191 && c1 < 224) {
              c2 = utf8.charCodeAt(i + 1);
              string += String.fromCharCode((c1 & 31) << 6 | c2 & 63);
              i += 2;
            } else {
              c2 = utf8.charCodeAt(i + 1);
              c3 = utf8.charCodeAt(i + 2);
              string += String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
              i += 3;
            }
          }

          return string;
        }
        /**
         * (仅 Web 平台下可用) 将 Base64 文本转为二进制数据
         * @param base64 
         */
        ;

        Base64Util.base64ToBlob = function base64ToBlob(base64) {
          if (!window || !window.atob) {
            return null;
          }

          var strings = base64.split(',');
          var type = /image\/\w+|;/.exec(strings[0])[0];
          var data = window.atob(strings[1]);
          var arrayBuffer = new ArrayBuffer(data.length);
          var uint8Array = new Uint8Array(arrayBuffer);

          for (var i = 0; i < data.length; i++) {
            uint8Array[i] = data.charCodeAt(i) & 0xff;
          }

          return new Blob([uint8Array], {
            type: type
          });
        };

        return Base64Util;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Codec.ts", ['cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var cclegacy, LogUtil;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "14878sooAhMHr3QddHn7C5+", "Codec", undefined); // 上下行流的打包解包, 处理粘包问题


      var Codec = exports('Codec', /*#__PURE__*/function () {
        function Codec() {}

        Codec.encode = function encode(buff) {
          var total = new Uint8Array(2 + buff.byteLength);
          total.set([buff.byteLength & 255, buff.byteLength >>> 8 & 255], 0);
          total.set(buff, 2);
          return total;
        };

        Codec.decode = function decode(buff) {
          var resArr = new Array();
          Codec.innerDecode(buff, resArr);
          return resArr;
        };

        Codec.innerDecode = function innerDecode(buff, resArr) {
          try {
            var length = new Uint16Array(buff.slice(0, 2))[0];
            var res = new Uint8Array(buff.slice(2, 2 + length));
            resArr.push(res); // 剩余长度

            var nextLen = buff.byteLength - (2 + length);

            if (nextLen > 0) {
              Codec.innerDecode(buff.slice(2 + length, buff.byteLength), resArr);
            }
          } catch (ex) {
            LogUtil.E("--- Codec.innerDecode err:", ex);
          }
        };

        return Codec;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ConfigMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts', './ResMgr.ts'], function (exports) {
  'use strict';

  var _asyncToGenerator, _regeneratorRuntime, cclegacy, LogUtil, ResMgr;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      LogUtil = module.LogUtil;
    }, function (module) {
      ResMgr = module.ResMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "281c4nHb6BIMomb5XKaKLvg", "ConfigMgr", undefined);

      var ConfigMgr = exports('ConfigMgr', /*#__PURE__*/function () {
        function ConfigMgr() {
          this._cfgDir = "dataconfig";
          this._allData = new Map();
        }

        var _proto = ConfigMgr.prototype;

        _proto.Start = /*#__PURE__*/function () {
          var _Start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.LoadAllCfg();

                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function Start() {
            return _Start.apply(this, arguments);
          }

          return Start;
        }();

        _proto.LoadAllCfg = /*#__PURE__*/function () {
          var _LoadAllCfg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _this = this;

            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", new Promise(function (resolve) {
                    ResMgr.Ins.loadDir(_this._cfgDir, function (err, assetArr) {
                      LogUtil.D("--- load cfg success");

                      for (var i = 0; i < assetArr.length; i++) {
                        var ja = assetArr[i];
                        var sheetName = ja.name;
                        var sheetData = ja.json ? ja.json['items'] : [];

                        _this._allData.set(sheetName, sheetData); // LogUtil.D(`--- this._allData:`, this._allData.size)


                        ja.decRef();
                      }

                      resolve();
                    });
                  }));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function LoadAllCfg() {
            return _LoadAllCfg.apply(this, arguments);
          }

          return LoadAllCfg;
        }();

        _proto.GetSkin = function GetSkin() {// const path = "cfg_skin"
          // const infoArr: ISkin[] = this._allData.get(path)
          // LogUtil.D(`--- infoArr:`, infoArr)
          // for (const info of infoArr) {
          //     LogUtil.D(`--- skin: ID: ${info.ID}, IconPath: ${info.IconPath}`)
          // }
          // return infoArr
        };

        _proto.GetJsonData = function GetJsonData(path) {// const infoArr:IGamehall[] = this._allData.get(path)
          // return infoArr
        };

        _proto.GetCfgWithSheetName = function GetCfgWithSheetName(sheetName) {
          return this._allData.get(("cfg_" + sheetName).toLowerCase());
        };

        return ConfigMgr;
      }());
      ConfigMgr.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DataMgr.ts", ['cc', './ImageData.ts', './TimerMgr.ts'], function (exports) {
  'use strict';

  var cclegacy, ImageData, TimerMgr;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ImageData = module.ImageData;
    }, function (module) {
      TimerMgr = module.TimerMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b9f913t6yNLsbgpW5yemBXS", "DataMgr", undefined);

      var DataMgr = exports('DataMgr', function DataMgr() {
        // LoginData.Ins = new LoginData()
        // PlayerData.Ins = new PlayerData()
        // SrvAddressData.Ins = new SrvAddressData()
        // OtherData.Ins = new OtherData()
        // HttpReq.Ins = new HttpReq()
        ImageData.Ins = new ImageData(); // seatCoordinates.Ins = new seatCoordinates()
        // dezhouData.Ins = new dezhouData()

        TimerMgr.Ins = new TimerMgr(); // pokerHanding.Ins = new pokerHanding()   
      });
      DataMgr.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct TRT', 'Env TRT', 'TRT All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'TRT', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnumCommon.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2f2b4uCgo1MJY985cxADnHj", "EnumCommon", undefined);

      var EnumCommon = exports('EnumCommon', {});
      var ChanLogin = exports('ChanLogin', {
        Guest: 1,
        Facebook: 10,
        Google: 11,
        PhoneOrEmail: 12,
        LogOut: 100
      }); // 注销状态    

      var GameId = exports('GameId', {
        Slots: 3
      }); // 本地缓存 key

      var Prefs = exports('Prefs', {
        SvrIndex: "SvrIndex",
        MMuuid: "mm-uuid",
        SysF: "systemFunction",
        SystemSettingSound: "systemSettingSound",
        account: "account",
        paiZhuo: "paiZhuo"
      }); // 牌桌数据    

      var Method = exports('Method', {
        texas: 0,
        Omaha: 1,
        "short": 2
      });
      var mainMode = exports('mainMode', {
        regularTable: "1",
        expressTable: "2"
      }); // 极速桌

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnumEvent.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('EnumEvent', void 0);

      cclegacy._RF.push({}, "7ef350HcW5HuI7Dzr+WCDCp", "EnumEvent", undefined);

      var EnumEvent;

      (function (EnumEvent) {
        EnumEvent["Test01"] = "Test01";
        EnumEvent["TodayOut"] = "TodayOut";
        EnumEvent["ChangeLanguage"] = "ChangeLanguage";
      })(EnumEvent || (EnumEvent = exports('EnumEvent', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnumNative.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('EnumNative', void 0);

      cclegacy._RF.push({}, "36555HkQuFAFalONrb8RfGJ", "EnumNative", undefined);

      var EnumNative;

      (function (EnumNative) {
        EnumNative["SetProgress"] = "SetProgress";
        EnumNative["ProgressTips"] = "ProgressTips";
        EnumNative["HideSplash"] = "HideSplash";
      })(EnumNative || (EnumNative = exports('EnumNative', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnumUI.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        EnumUI: void 0,
        Music: void 0
      });

      cclegacy._RF.push({}, "394e2iWrmBGxKHxh3Ah2v5F", "EnumUI", undefined);

      var EnumUI;

      (function (EnumUI) {
        EnumUI["Test01"] = "Test01";
        EnumUI["Mahjong"] = "Mahjong";
        EnumUI["SystemLogic"] = "SystemLogic";
        EnumUI["Menu"] = "Menu";
        EnumUI["Gameover"] = "Gameover";
        EnumUI["Title"] = "Title";
        EnumUI["Gm"] = "Gm";
        EnumUI["DebugPanel"] = "DebugPanel";
        EnumUI["DebugDraw"] = "DebugDraw";
        EnumUI["Login"] = "Login";
        EnumUI["Waitting"] = "Waitting";
        EnumUI["TextTips"] = "TextTips";
        EnumUI["NormalTips"] = "NormalTips";
        EnumUI["GameHall"] = "GameHall";
        EnumUI["broadcast"] = "Broadcast";
        EnumUI["roomList"] = "RoomList";
        EnumUI["insideTheGame"] = "InsideTheGame";
        EnumUI["buychips"] = "BuyChips";
        EnumUI["systemFunctions"] = "SystemFunctions";
        EnumUI["setting"] = "Setting";
        EnumUI["gameRecord"] = "GameRecord";
        EnumUI["speedTable"] = "SpeedTable";
        EnumUI["speedMatch"] = "SpeedMatch";
        EnumUI["countdown"] = "CountDown";
        EnumUI["multiTable"] = "MultiTable";
        EnumUI["testLogic"] = "testLogic";
        EnumUI["errorTip"] = "ErrorTip";
        EnumUI["desconectarReconectar"] = "DesconectarReconectar";
        EnumUI["avatarInformation"] = "AvatarInformation";
        EnumUI["expression"] = "expression";
      })(EnumUI || (EnumUI = exports('EnumUI', {})));

      var Music; // call操作时的语音

      (function (Music) {
        Music["bgMusic"] = "music/bgMusic";
        Music["m01"] = "music/01-jiesuan";
        Music["m02"] = "music/02-xiazhu";
        Music["m03"] = "music/03";
        Music["m04"] = "music/04";
        Music["m05"] = "music/05-qiaozhuo";
        Music["m06"] = "music/06-win";
        Music["m07"] = "music/07-allin";
        Music["m08"] = "music/08-fold";
        Music["m09"] = "music/09-raise";
        Music["m10"] = "music/10-check";
        Music["m11"] = "music/11-bet";
        Music["m12"] = "music/12-call";
      })(Music || (Music = exports('Music', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EventSys.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, cclegacy, _decorator, LogUtil;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c4d90f7yf5Ku5rDhVnvNuSi", "EventSys", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var EventSys = exports('EventSys', /*#__PURE__*/function () {
        function EventSys() {}

        EventSys.Reg = function Reg(id, cb, lv) {
          var ei = null;
          var infoArr = this.eventMap.get(id);

          if (!infoArr) {
            infoArr = new Array();
            this.eventMap.set(id, infoArr);
          } else {
            for (var _iterator = _createForOfIteratorHelperLoose(infoArr), _step; !(_step = _iterator()).done;) {
              var item = _step.value;

              if (!item.isActive) {
                // 找到未使用的
                ei = item;
                break;
              }
            }
          }

          if (!ei) {
            ei = new EventInfo();
            infoArr.push(ei);
          }

          ei.lv = lv != null ? lv : 0;
          ei.cb = cb;
          ei.isActive = true;
          infoArr.sort(function (a, b) {
            return a.lv - b.lv;
          });
        };

        EventSys.UnReg = function UnReg(id, cb) {
          var infoArr = this.eventMap.get(id);
          if (!infoArr) return;

          for (var _iterator2 = _createForOfIteratorHelperLoose(infoArr), _step2; !(_step2 = _iterator2()).done;) {
            var item = _step2.value;

            if (item.cb == cb) {
              item.isActive = false;
              item.cb = null;
            }
          }
        };

        EventSys.Fire = function Fire(id) {
          var infoArr = this.eventMap.get(id);
          if (!infoArr) return;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          for (var _iterator3 = _createForOfIteratorHelperLoose(infoArr), _step3; !(_step3 = _iterator3()).done;) {
            var item = _step3.value;

            if (item.isActive && item.cb != null) {
              item.cb.apply(item, args);
            }
          }
        } // 防止一直堆积, 提供去除无用对象接口
        ;

        EventSys.Shrink = function Shrink() {// TODO: web 暂时未做
        };

        EventSys.DebugDump = function DebugDump() {
          LogUtil.D("--- DebugDump, eventMap: " + this.eventMap.size);
          this.eventMap.forEach(function (eiArr, key) {
            LogUtil.D("--------- id: " + key + ", count: " + eiArr.length);
            eiArr.forEach(function (ei, idx) {
              LogUtil.D("--- isActive: " + ei.isActive + ", cb is null: " + (ei.cb == null));
            });
          });
        };

        return EventSys;
      }());
      EventSys.eventMap = new Map();

      var EventInfo = function EventInfo() {
        this.lv = void 0;
        this.isActive = void 0;
        this.cb = void 0;
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './App.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component, App;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      App = module.App;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "97e12yMm51HwroDU44ygPF1", "GameMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameMgr = exports('GameMgr', (_dec = ccclass('GameMgr'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameMgr, _Component);

        function GameMgr() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = GameMgr.prototype;

        _proto.onLoad = function onLoad() {
          GameMgr.Ins = this; // this.node.addComponent(TimerMgr)
          // this.node.addComponent(DebugDraw)
        };

        _proto.start = function start() {
          App.Ins = new App();
          App.Ins.start();
        };

        _proto.update = function update(dt) {};

        return GameMgr;
      }(Component), _class2.Ins = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HttpHelper.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, cclegacy, _decorator, LogUtil;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "04df2u4/bFDfbl1cfGq9hJK", "HttpHelper", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var kTimeout = 10000; // 10s 超时

      var HttpHelper = exports('HttpHelper', /*#__PURE__*/function () {
        function HttpHelper() {} // ------------------- 回调接口


        HttpHelper.postDataCb = function postDataCb(url, data, callback) {
          var xhr = new XMLHttpRequest();
          xhr.responseType = "arraybuffer"; // 必须指定为类型, 才能上行流

          xhr.open('POST', url);
          xhr.setRequestHeader('Conten-Type', 'application/octet-stream');

          xhr.ontimeout = function () {
            xhr.abort();
            callback(false, "postDataCb ontimeout");
          };

          xhr.onerror = function () {
            callback(false, "postDataCb onerror");
          };

          xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return; // 会回调两次, 需要用这个判断去掉

            if (xhr.status === 200) {
              callback(true, xhr.response);
            } else {
              callback(false, "--- postDataCb fail, code: " + xhr.status);
            }
          };

          xhr.send(data);
        };

        HttpHelper.postJsonCb = function postJsonCb(url, json, header, callback) {
          var xhr = new XMLHttpRequest();
          xhr.timeout = kTimeout;
          xhr.open("POST", url);
          xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          if (HttpHelper.getUserToken()) {
            xhr.setRequestHeader('User-Token', HttpHelper.getUserToken());
          }

          if (HttpHelper.getXLogId()) {
            xhr.setRequestHeader("x-log-id", HttpHelper.getXLogId());
          }

          xhr.ontimeout = function () {
            xhr.abort();
            callback(false, "postJsonCb ontimeout");
          };

          xhr.onerror = function () {
            callback(false, "postJsonCb onerror");
          };

          xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return; // 会回调两次, 需要用这个判断去掉

            if (xhr.status === 200) {
              var cookieHeader = xhr.getAllResponseHeaders();
              var tokenHeader = xhr.getResponseHeader('User-Token');
              var logIdHeader = xhr.getResponseHeader('x-log-id');
              console.log("cookieHeader =", cookieHeader);

              if (tokenHeader) {
                HttpHelper.setUserToken(tokenHeader);
              }

              if (logIdHeader) {
                HttpHelper.setXLogId(logIdHeader);
              }

              callback(true, xhr.responseText);
            } else {
              LogUtil.D("--- postJsonCb fail, code: " + xhr.status);
              callback(false, xhr.status);
            }
          };

          xhr.send(json);
        };

        HttpHelper.getCookie = function getCookie() {
          var cookieStrings = [];

          for (var _key in HttpHelper.cookies) {
            cookieStrings.push(_key + "=" + HttpHelper.cookies[_key]);
          }

          return cookieStrings.join('; ');
        };

        HttpHelper.setCookie = function setCookie(cookieHeader) {
          var cookieStrings = cookieHeader.split(';');

          for (var _iterator = _createForOfIteratorHelperLoose(cookieStrings), _step; !(_step = _iterator()).done;) {
            var cookieString = _step.value;
            var cookieParts = cookieString.split('=');

            if (cookieParts.length === 1) {
              HttpHelper.cookies[cookieParts[0]] = cookieParts[1];
            }
          }
        };

        HttpHelper.getUserToken = function getUserToken() {
          return HttpHelper.header[0];
        };

        HttpHelper.setUserToken = function setUserToken(tokenHeader) {
          HttpHelper.header[0] = tokenHeader;
        };

        HttpHelper.getXLogId = function getXLogId() {
          return HttpHelper.header[1];
        };

        HttpHelper.setXLogId = function setXLogId(logIdHeader) {
          HttpHelper.header[1] = logIdHeader;
        };

        HttpHelper.getCb = function getCb(url, callback) {
          var xhr = new XMLHttpRequest();
          xhr.responseType = "arraybuffer"; // 必须指定为类型, 才能上行流

          xhr.open('GET', url);
          xhr.setRequestHeader('Conten-Type', 'application/octet-stream');

          xhr.ontimeout = function () {
            xhr.abort();
            callback(false, "getCb ontimeout");
          };

          xhr.onerror = function () {
            callback(false, "getCb onerror");
          };

          xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return; // 会回调两次, 需要用这个判断去掉

            if (xhr.status === 200) {
              callback(true, xhr.response);
            } else {
              callback(false, "--- getCb fail, code: " + xhr.status);
            }
          };

          xhr.send();
        } // ------------------- 异步接口
        ;

        HttpHelper.postDataAsync = function postDataAsync(url, data) {
          return new Promise(function (resolve) {
            HttpHelper.postDataCb(url, data, function (isOk, buff) {
              resolve({
                isOk: isOk,
                buff: buff
              });
            });
          });
        };

        HttpHelper.postJsonAsync = function postJsonAsync(url, json) {
          var header = new Map(); // TODO: web 先糊着

          return new Promise(function (resolve) {
            HttpHelper.postJsonCb(url, json, header, function (isOk, msg) {
              resolve({
                isOk: isOk,
                msg: msg
              });
            });
          });
        };

        HttpHelper.getAsync = function getAsync(url) {
          return new Promise(function (resolve) {
            HttpHelper.getCb(url, function (isOk, bts) {
              resolve({
                isOk: isOk,
                bts: bts
              });
            });
          });
        };

        return HttpHelper;
      }());
      HttpHelper.cookies = {};
      HttpHelper.header = {};

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ImageData.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, resources, SpriteAtlas;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      SpriteAtlas = module.SpriteAtlas;
    }],
    execute: function () {
      cclegacy._RF.push({}, "daf27ysgE9NK77SJCHHZm9T", "ImageData", undefined);

      var ImageData = exports('ImageData', /*#__PURE__*/function () {
        function ImageData() {
          this.pokerImg = void 0;
          this.chipImg = void 0;
          this.outsPokerImg = void 0;
        }

        var _proto = ImageData.prototype;

        _proto.getPokerPlist = function getPokerPlist() {
          this.loadPlist("ui/Atlas/poker/poker");
          this.loadPlist1("ui/Atlas/insideTheGame/c_chip");
          this.loadPlist2("ui/Atlas/poker/outsPoker");
        };

        _proto.loadPlist = function loadPlist(path) {
          var _this = this;

          resources.load(path, SpriteAtlas, function (err, assets) {
            if (err) {
              console.error('加载plist图集资源失败:', err);
              return;
            } else {
              _this.pokerImg = assets;
              console.log("this.pokerImg = ", _this.pokerImg);
            }
          });
        };

        _proto.loadPlist1 = function loadPlist1(path) {
          var _this2 = this;

          resources.load(path, SpriteAtlas, function (err, assets) {
            if (err) {
              console.error('加载plist图集资源失败:', err);
              return;
            } else {
              _this2.chipImg = assets;
            }
          });
        };

        _proto.loadPlist2 = function loadPlist2(path) {
          var _this3 = this;

          resources.load(path, SpriteAtlas, function (err, assets) {
            if (err) {
              console.error('加载plist图集资源失败:', err);
              return;
            } else {
              _this3.outsPokerImg = assets;
            }
          });
        };

        return ImageData;
      }());
      ImageData.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/INativeCaller.ts", ['cc'], function () {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "62d2c3cQglEl7Hx+WhsS9UY", "INativeCaller", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Lang.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EnumEvent.ts', './EventSys.ts', './LogUtil.ts', './ResMgr.ts'], function (exports) {
  'use strict';

  var _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, js, JsonAsset, EnumEvent, EventSys, LogUtil, ResMgr;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      js = module.js;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      EnumEvent = module.EnumEvent;
    }, function (module) {
      EventSys = module.EventSys;
    }, function (module) {
      LogUtil = module.LogUtil;
    }, function (module) {
      ResMgr = module.ResMgr;
    }],
    execute: function () {
      exports('LanguageList', void 0);

      cclegacy._RF.push({}, "3f2eewI7vFApIhwO2T3mJCf", "Lang", undefined);

      var LanguageList;

      (function (LanguageList) {
        LanguageList["zh_hk"] = "zh-HK";
        LanguageList["zh_mo"] = "zh-MO";
        LanguageList["zh_cn"] = "zh-CN";
        LanguageList["zh_tw"] = "zh-TW";
        LanguageList["zh_sg"] = "zh-SG";
        LanguageList["en_us"] = "en-US";
        LanguageList["en_gb"] = "en-GB";
        LanguageList["ms_bn"] = "ms-BN";
        LanguageList["ms_my"] = "ms-MY";
        LanguageList["ar_sa"] = "ar-SA";
        LanguageList["vi_vn"] = "vi-VN";
        LanguageList["th_th"] = "th-TH";
        LanguageList["ko_kr"] = "ko-KR";
        LanguageList["ja_jp"] = "ja-JP";
        LanguageList["es_es"] = "es-ES";
        LanguageList["id_id"] = "id-ID";
        LanguageList["ur_pk"] = "ur-PK";
        LanguageList["tr_tr"] = "tr-TR";
        LanguageList["af_za"] = "af-ZA";
        LanguageList["az_az"] = "az-AZ";
        LanguageList["be_by"] = "be-BY";
        LanguageList["bg_bg"] = "bg-BG";
        LanguageList["bs_ba"] = "bs-BA";
        LanguageList["ca_es"] = "ca-ES";
        LanguageList["cs_cz"] = "cs-CZ";
        LanguageList["cy_gb"] = "cy-GB";
        LanguageList["da_dk"] = "da-DK";
        LanguageList["de_de"] = "de-DE";
        LanguageList["dv_mv"] = "dv-MV";
        LanguageList["et_ee"] = "et-EE";
        LanguageList["eu_es"] = "eu-ES";
        LanguageList["fa_ir"] = "fa-IR";
        LanguageList["fi_fi"] = "fi-FI";
        LanguageList["fo_fo"] = "fo-FO";
        LanguageList["fr_fr"] = "fr-FR";
        LanguageList["gl_es"] = "gl-ES";
        LanguageList["gu_in"] = "gu-IN";
        LanguageList["he_il"] = "he-IL";
        LanguageList["hi_in"] = "hi-IN";
        LanguageList["hr_hr"] = "hr-HR";
        LanguageList["hu_hu"] = "hu-HU";
        LanguageList["hy_am"] = "hy-AM";
        LanguageList["is_is"] = "is-IS";
        LanguageList["it_it"] = "it-IT";
        LanguageList["ka_ge"] = "ka-GE";
        LanguageList["kk_kz"] = "kk-KZ";
        LanguageList["kn_in"] = "kn-IN";
        LanguageList["kok_in"] = "kok-IN";
        LanguageList["ky_kg"] = "ky-KG";
        LanguageList["lt_lt"] = "lt-LT";
        LanguageList["lv_lv"] = "lv-LV";
        LanguageList["mi_nz"] = "mi-NZ";
        LanguageList["mk_mk"] = "mk-MK";
        LanguageList["mn_mn"] = "mn-MN";
        LanguageList["mr_in"] = "mr-IN";
        LanguageList["mt_mt"] = "mt-MT";
        LanguageList["nb_no"] = "nb-NO";
        LanguageList["nl_nl"] = "nl-NL";
        LanguageList["nn_no"] = "nn-NO";
        LanguageList["ns_za"] = "ns-ZA";
        LanguageList["pa_in"] = "pa-IN";
        LanguageList["pl_pl"] = "pl-PL";
        LanguageList["pt_pt"] = "pt-PT";
        LanguageList["pt_br"] = "pt-BR";
        LanguageList["qu_bo"] = "qu-BO";
        LanguageList["ro_ro"] = "ro-RO";
        LanguageList["ru_ru"] = "ru-RU";
        LanguageList["sa_in"] = "sa-IN";
        LanguageList["se_se"] = "se-SE";
        LanguageList["sk_sk"] = "sk-SK";
        LanguageList["sl_si"] = "sl-SI";
        LanguageList["sq_al"] = "sq-AL";
        LanguageList["sr_ba"] = "sr-BA";
        LanguageList["sv_se"] = "sv-SE";
        LanguageList["sw_ke"] = "sw-KE";
        LanguageList["syr_sy"] = "syr-SY";
        LanguageList["ta_in"] = "ta-IN";
        LanguageList["te_in"] = "te-IN";
        LanguageList["tl_ph"] = "tl-PH";
        LanguageList["tn_za"] = "tn-ZA";
        LanguageList["tt_ru"] = "tt-RU";
        LanguageList["uk_ua"] = "uk-UA";
        LanguageList["uz_uz"] = "uz-UZ";
        LanguageList["xh_za"] = "xh-ZA";
        LanguageList["zu_za"] = "zu-ZA";
      })(LanguageList || (LanguageList = exports('LanguageList', {})));

      var Lang = exports('Lang', /*#__PURE__*/function () {
        function Lang() {}

        Lang.Start = /*#__PURE__*/function () {
          var _Start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(Language) {
            var ja;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return new Promise(function (res, rej) {
                    ResMgr.Ins.load('dataconfig/language', JsonAsset, function (error, ja) {
                      res(ja);
                    });
                  });

                case 2:
                  ja = _context.sent;
                  this.config = ja.json;
                  ja.decRef(); // 及时释放

                  this.setCurLanguage(Language);
                  EventSys.Fire(EnumEvent.ChangeLanguage);

                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function Start(_x) {
            return _Start.apply(this, arguments);
          }

          return Start;
        }() //加载远程多语言
        ;

        Lang.loadRemoteLanguage = /*#__PURE__*/function () {
          var _loadRemoteLanguage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url) {
            var ja;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return new Promise(function (res, rej) {
                    ResMgr.Ins.loadRemote(url, JsonAsset, function (error, ja) {
                      res(ja);
                    });
                  });

                case 2:
                  ja = _context2.sent;
                  this.config = ja.json;
                  ja.decRef(); // 及时释放

                  EventSys.Fire(EnumEvent.ChangeLanguage);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function loadRemoteLanguage(_x2) {
            return _loadRemoteLanguage.apply(this, arguments);
          }

          return loadRemoteLanguage;
        }();

        Lang.isLanguageContains = function isLanguageContains(key) {
          for (var k in this._config) {
            if (this._config[k][key] != undefined) {
              return true;
            }

            break;
          }

          return false;
        };

        Lang.setCurLanguage = function setCurLanguage(curlanguage) {
          LogUtil.D("curlanguage", curlanguage);

          if (!this.isLanguageContains(curlanguage)) {
            this.curLanguageStr = LanguageList.en_us;
          } else {
            this.curLanguageStr = curlanguage;
          }

          LogUtil.D("this.curLanguageStr", this.curLanguageStr);
        };

        Lang.getText = function getText(key) {
          if (this.config[key]) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            var t = js.formatStr.apply(js, [this.config[key][this.curLanguageStr]].concat(args));
            return t || "";
          } else {
            return "";
          }
        };

        _createClass(Lang, null, [{
          key: "config",
          get: function get() {
            return this._config;
          },
          set: function set(cfg) {
            this._config = cfg;
          }
        }]);

        return Lang;
      }());
      Lang._config = js.createMap();
      Lang.curLanguageStr = LanguageList.en_us;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguageCom.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './EnumEvent.ts', './EventSys.ts', './Lang.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Enum, CCString, CCInteger, Label, Component, EnumEvent, EventSys, LanguageList, Lang;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      CCString = module.CCString;
      CCInteger = module.CCInteger;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      EnumEvent = module.EnumEvent;
    }, function (module) {
      EventSys = module.EventSys;
    }, function (module) {
      LanguageList = module.LanguageList;
      Lang = module.Lang;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "b3d0d67Bx1EookOwIBrc6gA", "LanguageCom", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var LanguageType = Enum(Object.keys(LanguageList).reduce(function (result, item, index, arr) {
        result[item] = index;
        return result;
      }, {}));
      var LanguageCom = exports('LanguageCom', (_dec = ccclass('LanguageCom'), _dec2 = executeInEditMode(true), _dec3 = property(CCString), _dec4 = property(CCInteger), _dec5 = property(CCString), _dec6 = property({
        type: LanguageType
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LanguageCom, _Component);

        function LanguageCom() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "_key", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_lang", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LanguageCom.prototype;

        _proto.onLoad = /*#__PURE__*/function () {
          var _onLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  {
                    this.node.getComponent(Label).string = Lang.getText(this.key);
                  } //更新多语言

                  EventSys.Reg(EnumEvent.ChangeLanguage, this.refresh.bind(this));

                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function onLoad() {
            return _onLoad.apply(this, arguments);
          }

          return onLoad;
        }();

        _proto.onDestroy = function onDestroy() {
          EventSys.UnReg(EnumEvent.ChangeLanguage, this.refresh.bind(this));
        };

        _proto.refresh = function refresh(key) {
          if (key) {
            this.key = key;
          }

          this.node.getComponent(Label).string = Lang.getText(this.key);
        };

        _createClass(LanguageCom, [{
          key: "key",
          get: function get() {
            return this._key;
          },
          set: function set(value) {
            this._key = value;
            this.onLoad();
          }
        }, {
          key: "lang",
          get: function get() {
            return this._lang;
          },
          set: function set(value) {
            this._lang = value;
            this.onLoad();
          }
        }]);

        return LanguageCom;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_key", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_lang", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "key", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "key"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "lang", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "lang"), _class2.prototype)), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalStorageMgr.ts", ['cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var cclegacy, sys, LogUtil;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e2471UbnwxMgJg+swA7f2tV", "LocalStorageMgr", undefined);
      /**
       * @class localStorage 操作类
       */


      var localStorageMgr = exports('localStorageMgr', /*#__PURE__*/function () {
        function localStorageMgr() {}

        localStorageMgr.set = function set(key, value, type) {
          if (type === void 0) {
            type = 'string';
          }

          if (!value) value = value + ''; // 排除null和undefined

          var saveData = value;

          if (type === 'object') {
            saveData = JSON.stringify(value);
          }

          sys.localStorage.setItem(key, saveData);
        };

        localStorageMgr.get = function get(key, type) {
          if (type === void 0) {
            type = 'string';
          }

          var storageValue = sys.localStorage.getItem(key);
          return this.formatType(storageValue, type);
        };

        localStorageMgr.formatType = function formatType(data, type) {
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
        };

        localStorageMgr.safeParse = function safeParse(jsonStr) {
          var data = null;

          try {
            data = JSON.parse(jsonStr);
          } catch (e) {
            LogUtil.E('parse [ ' + jsonStr + ' ] failed!');
          }

          return data;
        };

        localStorageMgr.remove = function remove(key) {
          return sys.localStorage.removeItem(key);
        };

        localStorageMgr.clear = function clear() {
          return sys.localStorage.clear();
        };

        return localStorageMgr;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LogicTool.ts", ['cc', './EnumCommon.ts', './LocalStorageMgr.ts', './LogUtil.ts'], function (exports) {
  'use strict';

  var cclegacy, sys, Prefs, localStorageMgr, LogUtil;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      Prefs = module.Prefs;
    }, function (module) {
      localStorageMgr = module.localStorageMgr;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "62b8fhgnO5Aoo6jfHBjTdNz", "LogicTool", undefined); // import { UIPnlGmLogic } from "../../logic/ui/gm/UIPnlGm/UIPnlGmLogic";


      var LogicTool = exports('LogicTool', /*#__PURE__*/function () {
        function LogicTool() {}

        LogicTool.GetVersion = function GetVersion() {
          return '1.0.1.21';
        };

        LogicTool.GetOs = function GetOs() {
          LogUtil.D('sys.os 当前运行系统', sys.os);

          if (sys.os == sys.OS.IOS || sys.os == sys.OS.OSX) {
            return 1;
          } else if (sys.os == sys.OS.ANDROID) {
            return 2;
          } else if (sys.os == sys.OS.WINDOWS) {
            return 3;
          } else {
            return 0;
          }
        };

        LogicTool.GetDynamicPlatId = function GetDynamicPlatId() {
          return 201;
        };

        LogicTool.IsOpenGuest = function IsOpenGuest() {
          return true;
        };

        LogicTool.GetDeviceID = function GetDeviceID() {
          var uuid = localStorageMgr.get(Prefs.MMuuid);

          if (!uuid) {
            var d = new Date().getTime();
            var uuidTmpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            uuid = uuidTmpl.replace(/[xy]/g, function (c) {
              var r = (d + Math.random() * 16) % 16 | 0;
              d = Math.floor(d / 16);
              return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
            });
            localStorageMgr.set(Prefs.MMuuid, uuid);
          }

          return uuid;
        };

        LogicTool.IsNeedOpenBigWin = function IsNeedOpenBigWin(bet, win) {
          return false;
        };

        LogicTool.OpenSlotsBigWinPanel = function OpenSlotsBigWinPanel(bet, win, onClose) {
          // TODO ZGS 补充big win
          if (onClose != null) onClose();
        };

        LogicTool.GetFormatNumber = function GetFormatNumber(value, pointCnt, noSymbol) {
          //LogUtil.D(`${value}`)
          if (pointCnt == null) pointCnt = 2;
          if (noSymbol == null) noSymbol = false; // 保留了指定小数位

          var tempStr = new Number(value).toFixed(pointCnt);
          var tempArr = tempStr.split("."); // 保存小数位

          tempStr = tempArr[0]; // 整数部分

          var numStr = new Number(tempStr).toLocaleString(); // 整数部分千分位分割

          if (tempArr[1]) numStr = numStr + "." + tempArr[1];
          if (noSymbol) numStr = this.GetMoneySymbol() + numStr; //LogUtil.D(numStr)

          return numStr;
        } // 取货币货号
        ;

        LogicTool.GetMoneySymbol = function GetMoneySymbol() {
          //TODO ZGS 货币符号先写死
          return "R";
        };

        return LogicTool;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LogUtil.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b6520ksUopDvbmiAXaA0TGX", "LogUtil", undefined);

      var ELogLevel;

      (function (ELogLevel) {
        ELogLevel[ELogLevel["Debug"] = 1] = "Debug";
        ELogLevel[ELogLevel["Warn"] = 2] = "Warn";
        ELogLevel[ELogLevel["Error"] = 3] = "Error";
        ELogLevel[ELogLevel["None"] = 4] = "None";
      })(ELogLevel || (ELogLevel = {}));

      var LogUtil = exports('LogUtil', /*#__PURE__*/function () {
        function LogUtil() {}

        LogUtil.Now = function Now() {
          var d = new Date();
          var str = d.getHours().toString();
          var timeStr = "";
          timeStr += (str.length == 1 ? "0" + str : str) + ":";
          str = d.getMinutes().toString();
          timeStr += (str.length == 1 ? "0" + str : str) + ":";
          str = d.getSeconds().toString();
          timeStr += (str.length == 1 ? "0" + str : str) + ":";
          str = d.getMilliseconds().toString();
          if (str.length == 1) str = "00" + str;
          if (str.length == 2) str = "0" + str;
          timeStr += str;
          timeStr = timeStr + " |";
          return timeStr;
        };

        LogUtil.SetLv = function SetLv(lv) {
          LogUtil.logLevel = lv;
        };

        LogUtil.D = function D(fmt) {
          var _console;

          if (ELogLevel.Debug < LogUtil.logLevel) return;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          (_console = console).log.apply(_console, [LogUtil.Now(), fmt].concat(args));
        };

        LogUtil.W = function W(fmt) {
          var _console2;

          if (ELogLevel.Warn < LogUtil.logLevel) return;

          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          (_console2 = console).warn.apply(_console2, [LogUtil.Now(), fmt].concat(args));
        };

        LogUtil.E = function E(fmt) {
          var _console3;

          if (ELogLevel.Error < LogUtil.logLevel) return;

          for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            args[_key3 - 1] = arguments[_key3];
          }

          (_console3 = console).error.apply(_console3, [LogUtil.Now(), fmt].concat(args));
        };

        LogUtil.A = function A(cond, fmt) {
          if (ELogLevel.Error < LogUtil.logLevel || cond) return;

          for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
            args[_key4 - 2] = arguments[_key4];
          }

          LogUtil.E.apply(LogUtil, [fmt].concat(args)); // throw new Error("--- exception, stop!");
        };

        return LogUtil;
      }());
      LogUtil.logLevel = ELogLevel.Debug;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LongPressEvent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCFloat, Button, Node, Component, LogUtil;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCFloat = module.CCFloat;
      Button = module.Button;
      Node = module.Node;
      Component = module.Component;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "c981cdHMJtCAruJ9+4OGzzE", "LongPressEvent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LongPressEvent = exports('LongPressEvent', (_dec = ccclass('LongPressEvent'), _dec2 = property(CCFloat), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LongPressEvent, _Component);

        function LongPressEvent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "interval", _descriptor, _assertThisInitialized(_this));

          _this.isworking = true;
          _this._onPress = void 0;
          _this._onClick = void 0;
          _this._begin = void 0;
          _this._button = void 0;
          _this._press = void 0;
          return _this;
        }

        var _proto = LongPressEvent.prototype;

        _proto.start = function start() {
          this._press = false;
          this._button = this.node.getComponent(Button);
          this.node.on(Node.EventType.MOUSE_DOWN, this.OnMouseDown, this);
          this.node.on(Node.EventType.MOUSE_UP, this.OnMouseUp, this);
          this.node.on(Node.EventType.MOUSE_LEAVE, this.OnMouseLeave, this);
        };

        _proto.update = function update(deltaTime) {};

        _proto.SetPressEvent = function SetPressEvent(onPress) {
          this._onPress = onPress;
        };

        _proto.SetClickEvent = function SetClickEvent(onClick) {
          this._onClick = onClick;
        };

        _proto.OnMouseDown = function OnMouseDown() {
          this._press = true;
          var date = new Date();
          this._begin = date.getTime(); //if (this._button) this._button.enabled = false
        };

        _proto.OnMouseUp = function OnMouseUp() {
          if (this._press) {
            var date = new Date();
            LogUtil.D("--- OnMouseUp.interval: ", date.getTime() - this._begin);

            if (date.getTime() - this._begin >= this.interval * 1000) {
              LogUtil.D("--- OnMouseUp.isworking: ", this.isworking);
              if (this._onPress && this.isworking) this._onPress();
            } else {
              LogUtil.D("--- OnMouseUp.isworking: ", this.isworking);
              if (this._onClick && this.isworking) this._onClick();
            } //if (this._button) this._button.enabled = true


            this._press = false;
          }
        };

        _proto.OnMouseLeave = function OnMouseLeave() {
          if (this._press) {
            //if (this._button) this._button.enabled = true
            this._press = false;
          }
        };

        _proto.onDestroy = function onDestroy() {
          this._onPress = null;
          this._onClick = null;
        };

        return LongPressEvent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "interval", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MahjongConstant.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('Suit', void 0);

      cclegacy._RF.push({}, "6e5c0R3pZpJTYWW2HMVle/V", "MahjongConstant", undefined); // 麻将常量
      // 定义麻将花色和牌值的枚举


      var Suit;
      /** 美术定义值 */

      (function (Suit) {
        Suit["WAN"] = "\u4E07";
        Suit["BING"] = "\u997C";
        Suit["TIAO"] = "\u6761";
        Suit["DONG"] = "\u4E1C";
        Suit["NAN"] = "\u5357";
        Suit["XI"] = "\u897F";
        Suit["BEI"] = "\u5317";
        Suit["ZHONG"] = "\u4E2D";
        Suit["FA"] = "\u53D1";
        Suit["BAI"] = "\u767D";
        Suit["CHUN"] = "\u6625";
        Suit["XIA"] = "\u590F";
        Suit["QIU"] = "\u79CB";
        Suit["DONG1"] = "\u51AC";
        Suit["MEI"] = "\u6885";
        Suit["LAN"] = "\u5170";
        Suit["ZHU"] = "\u7AF9";
        Suit["JU"] = "\u83CA";
      })(Suit || (Suit = exports('Suit', {})));

      var suitValue = exports('suitValue', new Map([['万', 1], ['饼', 2], ['条', 3], ['东', 4], ['南', 4], ['西', 4], ['北', 4], ['中', 5], ['发', 5], ['白', 5], ['梅', 6], ['兰', 6], ['竹', 6], ['菊', 6], ['春', 7], ['夏', 7], ['秋', 7], ['冬', 7]]));
      /** 其他花色牌 */

      var otherSuit = exports('otherSuit', [['东', '南', '西', '北'], ['中', '发', '白'], ['春', '夏', '秋', '冬'], ['梅', '兰', '竹', '菊']]); // 消除分数定义

      var scoreTable = exports('scoreTable', {
        // 万、饼、条
        '万': 10,
        '饼': 20,
        '条': 30,
        // 字牌
        '东': 40,
        '南': 40,
        '西': 40,
        '北': 40,
        '中': 50,
        '发': 50,
        '白': 50,
        // 花牌
        '春': 60,
        '夏': 60,
        '秋': 60,
        '冬': 70,
        '梅': 80,
        '兰': 80,
        '竹': 80,
        '菊': 80
      }); // 定义麻将牌的数据结构

      /** 第一层 */

      var cardList1 = exports('cardList1', [[0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0]]);
      /** 第二层 */

      var cardList2 = exports('cardList2', [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
      /** 第三层 */

      var cardList3 = exports('cardList3', [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
      /** 第四层 */

      var cardList4 = exports('cardList4', [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
      /** 第五层 */

      var cardList5 = exports('cardList5', [5.5, 3.5]);
      /** 第一层其他 */

      var otherCardList1 = exports('otherCardList1', [[-1, 3.5], [12, 3.5], [13, 3.5]]);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MahjongData.ts", ['cc', './MahjongConstant.ts', './MahjongUtils.ts'], function (exports) {
  'use strict';

  var cclegacy, UITransform, v3, sys, Label, otherCardList1, cardList5, Suit, cardList1, cardList2, cardList3, cardList4, MahjongUtils;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      UITransform = module.UITransform;
      v3 = module.v3;
      sys = module.sys;
      Label = module.Label;
    }, function (module) {
      otherCardList1 = module.otherCardList1;
      cardList5 = module.cardList5;
      Suit = module.Suit;
      cardList1 = module.cardList1;
      cardList2 = module.cardList2;
      cardList3 = module.cardList3;
      cardList4 = module.cardList4;
    }, function (module) {
      MahjongUtils = module.MahjongUtils;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e7c64OJRDVCJ7bHxG7yB28M", "MahjongData", undefined);

      var cardArray = [cardList1, cardList2, cardList3, cardList4];
      /** 麻将数据 */

      var MahjongData = exports('MahjongData', /*#__PURE__*/function () {
        function MahjongData() {
          this.mahjongRoot = null;
          this.mahjongTiles = [];
          this.allCard = new Map();
          this.oneOtherCardList = [];
          this.fiveCard = [];
          this.curentScore = 0;
          this.clickList = [];
          this.noPressedCard = [];
          this.countDownTime = 0;
          this.isGameOver = false;
          this.isHint = false;
        }

        MahjongData.getInstance = function getInstance() {
          if (!MahjongData.Ins) {
            MahjongData.Ins = new MahjongData();
          }

          return MahjongData.Ins;
        }
        /** 麻将父节点 */
        ;

        var _proto = MahjongData.prototype;
        /** 获取卡牌节点 */

        _proto.getCardNode = function getCardNode(layer, x, y) {
          return this.mahjongRoot.getChildByName("LayC_content").getChildByName("Btn" + layer + "_" + x + "_" + y);
        }
        /** 初始化卡牌 */
        ;

        _proto.initMahjong = function initMahjong() {
          for (var i = 0; i < 4; i++) {
            this.allCard.set(i + 1, MahjongUtils.copyArray(cardArray[i]));
          }

          this.oneOtherCardList = MahjongUtils.copyArray(otherCardList1);
          this.fiveCard = MahjongUtils.copyArray(cardList5);
          this.mahjongTiles = MahjongUtils.copyArray(MahjongUtils.initMahjongTiles());
        }
        /** 找出所有可点击的卡牌 */
        ;

        _proto.setSideCard = function setSideCard() {
          var array = [];

          for (var i = 0; i < 4; i++) {
            array[i] = this.getRemoveCard(i + 1);
          }

          array[4] = []; // 第五层

          this.fiveCard.length > 0 ? array[4].push(this.fiveCard) : []; // 移出上面压住的

          for (var _i = 0; _i < 3; _i++) {
            array[_i] = this.removePressed(array[_i], _i + 2);
          }

          array[3] = this.removeFourPressed(array[3]); // 第一层需要判断特殊的三张牌

          array[0] = this.getOneCard(array[0]);
          this.clickList = MahjongUtils.copyArray(array);
        }
        /** 筛选最左边和最右边的卡牌 */
        ;

        _proto.getRemoveCard = function getRemoveCard(layer) {
          var cardList = [];
          var curCard = this.allCard.get(layer);

          for (var i = 0; i < curCard.length; i++) {
            var list = curCard[i].filter(function (v) {
              return v > 0;
            });

            if (list.length == 0) {
              continue;
            }

            var card = curCard[i];
            var firstOneIndex = card.indexOf(1);
            var lastOneIndex = card.lastIndexOf(1);
            cardList.push([firstOneIndex, i]);

            if (firstOneIndex != lastOneIndex) {
              cardList.push([lastOneIndex, i]);
            }
          }

          return cardList;
        }
        /** 第一层需要判断特殊的三张牌 */
        ;

        _proto.getOneCard = function getOneCard(card1) {
          var oneLeft = this.oneOtherCardList.filter(function (v) {
            return v[0] == -1;
          }).length > 0;
          var oneRight = this.oneOtherCardList.filter(function (v) {
            return v[0] == 13;
          }).length > 0;
          var twoRight = this.oneOtherCardList.filter(function (v) {
            return v[0] == 12;
          }).length > 0;

          if (oneLeft) {
            card1.push([-1, 3.5]);
            card1 = card1.filter(function (v) {
              return !(v[0] == 0 && v[1] == 3 || v[0] == 0 && v[1] == 4);
            });
          }

          if (oneRight) {
            card1.push([13, 3.5]);
            card1 = card1.filter(function (v) {
              return !(v[0] == 11 && v[1] == 3 || v[0] == 11 && v[1] == 4);
            });
          }

          if (!oneRight && twoRight) {
            card1.push([12, 3.5]);
            card1 = card1.filter(function (v) {
              return !(v[0] == 11 && v[1] == 3 || v[0] == 11 && v[1] == 4);
            });
          }

          return card1;
        }
        /** 移出上面压住的 */
        ;

        _proto.removePressed = function removePressed(card, layer) {
          var curCard = this.allCard.get(layer);
          var array = [];

          for (var i = 0; i < card.length; i++) {
            var temp = card[i];

            if (curCard[temp[1]][temp[0]] > 0) {
              array.push(i);
            }
          }

          card = card.filter(function (v, i) {
            return !array.includes(i);
          });
          return card;
        }
        /** 第四层压住的特殊处理 */
        ;

        _proto.removeFourPressed = function removeFourPressed(card) {
          return this.fiveCard.length > 0 ? [] : card;
        }
        /** 找出所有没被压住的牌 */
        ;

        _proto.getAllNoPressedCard = function getAllNoPressedCard() {
          var _this = this;

          var array = [];

          var _loop = function _loop() {
            var curCard = _this.allCard.get(i + 1);

            var cardList = [];

            var _loop2 = function _loop2(i) {
              var list = curCard[i].filter(function (v) {
                return v > 0;
              });

              if (list.length == 0) {
                return "continue";
              }

              curCard[i].map(function (v, j) {
                if (v > 0) cardList.push([j, i]);
              });
            };

            for (var _i3 = 0; _i3 < curCard.length; _i3++) {
              var _ret = _loop2(_i3);

              if (_ret === "continue") continue;
            }

            array[i] = cardList;
          };

          for (var i = 0; i < 4; i++) {
            _loop();
          } // 移出上面压住的


          for (var _i2 = 0; _i2 < 3; _i2++) {
            array[_i2] = this.removePressed(array[_i2], _i2 + 2);
          }

          array[4] = [];
          array[4].push(this.fiveCard);
          var oneLeft = this.oneOtherCardList.filter(function (v) {
            return v[0] == -1;
          }).length > 0;
          var oneRight = this.oneOtherCardList.filter(function (v) {
            return v[0] == 13;
          }).length > 0;
          var twoRight = this.oneOtherCardList.filter(function (v) {
            return v[0] == 12;
          }).length > 0;
          if (oneLeft) array[0].push([-1, 3.5]);
          if (oneRight) array[0].push([13, 3.5]);
          if (twoRight) array[0].push([12, 3.5]);
          this.noPressedCard = MahjongUtils.copyArray(array);
          this.showShadow();
        }
        /** 阴影处理 */
        ;

        _proto.showShadow = function showShadow() {
          var _this2 = this;

          var cardParent = this.mahjongRoot.getChildByName("LayC_content");

          for (var i = 0; i < 5; i++) {
            var array = this.noPressedCard[i];

            if (array.length > 0 && array[0].length > 0) {
              for (var j = 0; j < array.length; j++) {
                var node = cardParent.getChildByName("Btn" + (i + 1) + "_" + array[j][0] + "_" + array[j][1]);
                node.getChildByName("Shade0").active = false;
                if (node && node.getChildByName("Shade1")) node.getChildByName("Shade1").active = false;
                node.getChildByName("Shade2").active = false;
              }
            }
          }

          var _loop3 = function _loop3(i) {
            var array = _this2.noPressedCard[i];

            if (array.length > 0 && array[0].length > 0) {
              var temp = [];
              var temp1 = [];

              var _loop4 = function _loop4(j) {
                var node = cardParent.getChildByName("Btn" + (i + 1) + "_" + array[j][0] + "_" + array[j][1]);
                node.getChildByName("Shade2").active = true;
                array.filter(function (v, n) {
                  if (v[0] == array[j][0] - 1 && v[1] == array[j][1]) {
                    temp.push(array[j]);
                  }
                });
                array.filter(function (v, n) {
                  if (v[1] == array[j][1] - 1 && v[0] == array[j][0]) {
                    temp1.push(array[j]);
                  }
                });
              };

              for (var _j = 0; _j < array.length; _j++) {
                _loop4(_j);
              }

              var result1 = array.filter(function (item1) {
                return !temp.some(function (item2) {
                  return item2[0] === item1[0] && item2[1] === item1[1];
                });
              });
              result1.forEach(function (v) {
                var node = cardParent.getChildByName("Btn" + (i + 1) + "_" + v[0] + "_" + v[1]);
                if (node && node.getChildByName("Shade1")) node.getChildByName("Shade1").active = true;
              });
              var result2 = array.filter(function (item1) {
                return !temp1.some(function (item2) {
                  return item2[0] === item1[0] && item2[1] === item1[1];
                });
              });
              result2.forEach(function (v) {
                var node = cardParent.getChildByName("Btn" + (i + 1) + "_" + v[0] + "_" + v[1]);
                node.getChildByName("Shade0").active = true;
              });
            }
          };

          for (var _i4 = 0; _i4 < 5; _i4++) {
            _loop3(_i4);
          }

          var oneLeft = this.oneOtherCardList.filter(function (v) {
            return v[0] == -1;
          }).length > 0;
          var twoRight = this.oneOtherCardList.filter(function (v) {
            return v[0] == 12;
          }).length > 0;

          if (oneLeft) {
            this.updateShadowLayer(cardParent, true);
          }

          if (twoRight) {
            var _node = cardParent.getChildByName("Btn1_12_3.5");

            _node.getChildByName("Shade1").active = false;
          }
        }
        /** 更新阴影层级 */
        ;

        _proto.updateShadowLayer = function updateShadowLayer(cardParent, isUpdate) {
          var bgNode = cardParent.parent.getChildByName("bg");
          var node = cardParent.getChildByName("Btn1_0_3");
          var node1 = cardParent.getChildByName("Btn1_0_4");

          if (isUpdate) {
            var shade1 = node.getChildByName("Shade1");

            if (shade1) {
              var shade2 = node1.getChildByName("Shade1");
              var worldPos1 = shade1.getComponent(UITransform).convertToWorldSpaceAR(v3());
              shade1.parent = bgNode;
              var localPos1 = bgNode.getComponent(UITransform).convertToNodeSpaceAR(worldPos1);
              shade1.setPosition(localPos1);
              var worldPos2 = shade2.getComponent(UITransform).convertToWorldSpaceAR(v3());
              shade2.parent = bgNode;
              var localPos2 = bgNode.getComponent(UITransform).convertToNodeSpaceAR(worldPos2);
              shade2.setPosition(localPos2);
            }
          } else {
            var _shade = bgNode.children[0];
            var _shade2 = bgNode.children[1];

            var _worldPos = _shade.getComponent(UITransform).convertToWorldSpaceAR(v3());

            _shade.parent = node;

            _shade.setSiblingIndex(0);

            var _localPos = node.getComponent(UITransform).convertToNodeSpaceAR(_worldPos);

            _shade.setPosition(_localPos);

            var _worldPos2 = _shade2.getComponent(UITransform).convertToWorldSpaceAR(v3());

            _shade2.parent = node1;

            _shade2.setSiblingIndex(0);

            var _localPos2 = node1.getComponent(UITransform).convertToNodeSpaceAR(_worldPos2);

            _shade2.setPosition(_localPos2);
          }
        }
        /** 存档 */
        ;

        _proto.saveUserData = function saveUserData() {
          if (this.curentScore == 0) return;

          if (MahjongData.getInstance().isGameOver) {
            sys.localStorage.removeItem('userData');
            return;
          }

          var nodeParent = this.mahjongRoot.getChildByName("LayC_content");
          var mahjongList = [];
          var nameList = [];
          nodeParent.children.map(function (v, i) {
            var mahjong = {
              value: -1,
              suit: Suit.WAN
            };

            if (v.active) {
              var name = v.getChildByName("TextC_card").getComponent(Label).string;
              mahjong.value = name.length > 1 ? parseInt(name) : 0;
              mahjong.suit = name.length > 1 ? name[1] : name;
            }

            mahjongList.push(mahjong);
            nameList.push(v.name);
          });
          var userData = {
            allCard: Array.from(this.allCard),
            oneOtherCardList: this.oneOtherCardList,
            fiveCard: this.fiveCard,
            curentScore: this.curentScore,
            countDownTime: this.countDownTime,
            mahjongList: mahjongList,
            nameList: nameList
          }; // console.log("saveUserData userData", JSON.stringify(userData));

          sys.localStorage.setItem('userData', JSON.stringify(userData));
        }
        /** 读取存档 */
        ;

        _proto.loadUserData = function loadUserData() {
          var jsonStr = sys.localStorage.getItem('userData');
          var userData = JSON.parse(jsonStr); // console.log("loadUserData userData", userData);

          return userData;
        }
        /** 设置用户数据 */
        ;

        _proto.setUserData = function setUserData(userData) {
          this.allCard = new Map(userData.allCard);
          this.oneOtherCardList = userData.oneOtherCardList;
          this.fiveCard = userData.fiveCard;
          this.curentScore = userData.curentScore;
          this.countDownTime = userData.countDownTime;
        };

        return MahjongData;
      }());
      MahjongData.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MahjongUtils.ts", ['cc', './MahjongConstant.ts'], function (exports) {
  'use strict';

  var cclegacy, Suit, scoreTable;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Suit = module.Suit;
      scoreTable = module.scoreTable;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bb977M/r8xGYrPMzWV3sALE", "MahjongUtils", undefined);
      /** 麻将工具 */


      var MahjongUtils = exports('MahjongUtils', /*#__PURE__*/function () {
        function MahjongUtils() {}
        /** 初始化麻将牌 */


        MahjongUtils.initMahjongTiles = function initMahjongTiles() {
          var mahjongTiles = []; // 初始化序牌

          for (var _i = 0, _arr = [Suit.WAN, Suit.BING, Suit.TIAO]; _i < _arr.length; _i++) {
            var suit = _arr[_i];

            for (var value = 1; value <= 9; value++) {
              for (var count = 0; count < 4; count++) {
                mahjongTiles.push({
                  suit: suit,
                  value: value
                });
              }
            }
          } // 初始化字牌


          for (var _i2 = 0, _arr2 = [Suit.DONG, Suit.NAN, Suit.XI, Suit.BEI, Suit.ZHONG, Suit.FA, Suit.BAI]; _i2 < _arr2.length; _i2++) {
            var _suit = _arr2[_i2];

            for (var _count = 0; _count < 4; _count++) {
              mahjongTiles.push({
                suit: _suit,
                value: 0
              });
            }
          } // 初始化花牌


          for (var _i3 = 0, _arr3 = [Suit.CHUN, Suit.XIA, Suit.QIU, Suit.DONG1, Suit.MEI, Suit.LAN, Suit.ZHU, Suit.JU]; _i3 < _arr3.length; _i3++) {
            var _suit2 = _arr3[_i3];
            mahjongTiles.push({
              suit: _suit2,
              value: 0
            });
          }

          return mahjongTiles;
        }
        /** 获取随机的牌 */
        ;

        MahjongUtils.getSelectedPairs = function getSelectedPairs(mahjongTiles) {
          // 随机中排除花牌144-8=136
          var newArray = mahjongTiles.slice(0, 136); // 从所有牌中随机选取10-15对

          var selectedPairs = [];
          var randomNumber = Math.floor(Math.random() * 6) + 10;

          var _loop = function _loop() {
            var randomIndex = Math.floor(Math.random() * newArray.length);
            var pair = newArray[randomIndex]; // 检查是否已经包含相同的牌

            var isPairUnique = !selectedPairs.some(function (existingPair) {
              return existingPair.suit === pair.suit && existingPair.value === pair.value;
            });

            if (isPairUnique) {
              selectedPairs.push(pair);
            }
          };

          while (selectedPairs.length < randomNumber) {
            _loop();
          }

          return selectedPairs;
        }
        /** 深拷贝数组 */
        ;

        MahjongUtils.copyArray = function copyArray(array) {
          return JSON.parse(JSON.stringify(array));
        }
        /** 获取随机列表 */
        ;

        MahjongUtils.getRandomList = function getRandomList(length, randomLength) {
          var randomIndices = [];

          while (randomIndices.length < randomLength) {
            var randomIndex = Math.floor(Math.random() * length);

            if (!randomIndices.includes(randomIndex)) {
              randomIndices.push(randomIndex);
            }
          }

          randomIndices.sort(function (a, b) {
            return a - b;
          });
          return randomIndices;
        }
        /** 获取按钮数值 */
        ;

        MahjongUtils.getBtnNumber = function getBtnNumber(inputString) {
          var numbers = inputString.replace("Btn", "").split("_").filter(function (part) {
            return !isNaN(parseFloat(part));
          }).map(function (part) {
            return parseFloat(part);
          });
          return numbers;
        }
        /** 获取牌值 */
        ;

        MahjongUtils.getCardValue = function getCardValue(list) {
          // 使用 reduce 统计每个元素的数量
          var countMap = list.reduce(function (acc, item) {
            var group1 = ['春', '夏', '秋', '冬'];
            var group2 = ['梅', '兰', '竹', '菊'];

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
        ;

        MahjongUtils.calculateScore = function calculateScore(text) {
          // 将输入的字符串按空格切割为牌组
          var cards = text.split(' '); // 计算总分数

          var totalScore = cards.reduce(function (acc, card) {
            var score = scoreTable[card[1]] || scoreTable[card];
            return score;
          }, 0);
          return totalScore;
        } // 显示剩余时间
        ;

        MahjongUtils.displayTime = function displayTime(duration) {
          var minutes = Math.floor(duration % 3600 / 60);
          var seconds = duration % 60;
          var formattedTime = this.formatNumber(minutes) + ":" + this.formatNumber(seconds);
          return formattedTime;
        } // 格式化数字，确保两位数
        ;

        MahjongUtils.formatNumber = function formatNumber(value) {
          return value < 10 ? "0" + value : "" + value;
        }
        /** 计算距离 */
        ;

        MahjongUtils.calculateDistance = function calculateDistance(point1, point2, pointNum) {
          var x1 = point1[0],
              y1 = point1[1];
          var x2 = point2[0],
              y2 = point2[1];
          var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          return Number(distance.toFixed(pointNum));
        };

        return MahjongUtils;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './GameMgr.ts', './App.ts', './AudioMgr.ts', './ConfigMgr.ts', './EnumCommon.ts', './EnumEvent.ts', './EnumNative.ts', './EnumUI.ts', './LocalStorageMgr.ts', './DataMgr.ts', './ImageData.ts', './OtherData.ts', './PlayerData.ts', './MahjongConstant.ts', './MahjongData.ts', './MahjongUtils.ts', './MaskCircle.ts', './TipsMgr.ts', './UIBaseLogic.ts', './UIMgr.ts', './UIPnlMahjongLogic.ts', './UIPnlMahjongView.ts', './UIPnlMenuLogic.ts', './UIPnlMenuView.ts', './UIPnlOverLogic.ts', './UIPnlOverView.ts', './UIPnlSystemLogic.ts', './UIPnlSystemView.ts', './UIPnlTitleLogic.ts', './UIPnlTitleView.ts', './Notify.ts', './PnlComTextTips.ts', './PnlWaittingLogic.ts', './UIPnlComWinTipsLogic.ts', './UIPnlComWinTipsView.ts', './UIPnlErrorTipLogic.ts', './UIPnlErrorTipView.ts', './Waitting.ts', './Base64Util.ts', './LogicTool.ts', './LongPressEvent.ts', './Tool.ts', './ParticleSimulator2DExt.ts', './ParticleSystem2DExt.ts', './ParticleSystem2DPlayOnAwake.ts', './EventSys.ts', './Lang.ts', './LanguageCom.ts', './LogUtil.ts', './INativeCaller.ts', './NativeAndroid.ts', './NativeIos.ts', './NativeMgr.ts', './NativeWeb.ts', './Codec.ts', './HttpHelper.ts', './SocketHelper.ts', './AssetTracker.ts', './ResMgr.ts', './TimerMgr.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/MaskCircle.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Graphics, color, UITransform, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Graphics = module.Graphics;
      color = module.color;
      UITransform = module.UITransform;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "8de7cpZYoFIV7WqOAJXcud9", "MaskCircle", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MaskCircle = exports('MaskCircle', (_dec = ccclass("MaskCircle"), _dec2 = property(Graphics), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MaskCircle, _Component);

        function MaskCircle() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "maskGraphics", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = MaskCircle.prototype;

        _proto.start = function start() {
          this.drawCircleMask();
        };

        _proto.drawCircleMask = function drawCircleMask() {
          // 获取Graphics组件
          var graphics = this.maskGraphics; // 清除已有的绘制

          graphics.clear(); // 绘制一个圆形遮罩

          graphics.fillColor = color(255, 255, 255, 255); // 可以根据需要设置颜色

          graphics.circle(0, 0, this.node.getComponent(UITransform).width / 2);
          graphics.fill();
        };

        return MaskCircle;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "maskGraphics", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeAndroid.ts", ['cc', './Base64Util.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, native, Base64Util;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      native = module.native;
    }, function (module) {
      Base64Util = module.default;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8c035KVKNJAPbv1+KnZo8J0", "NativeAndroid", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NativeAndroid = exports('NativeAndroid', /*#__PURE__*/function () {
        function NativeAndroid() {
          this._activityName = "com/yang/androidaar/MainActivity";
          this._argSign = "(Ljava/lang/String;Ljava/lang/String;)V";
        }

        var _proto = NativeAndroid.prototype;

        _proto.call = function call(funcName, jsonMsg) {
          native.reflection.callStaticMethod(this._activityName, funcName, this._argSign, jsonMsg, funcName);
        };

        _proto.decode = function decode(data) {
          return Base64Util.decodeString(data); // 因为 json 比较特殊, 所以在原生传过来的是 base64 编码之后的
        };

        return NativeAndroid;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeIos.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "407c7Tqs5FCf6Xj5qsfJTj3", "NativeIos", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NativeIos = exports('NativeIos', /*#__PURE__*/function () {
        function NativeIos() {}

        var _proto = NativeIos.prototype;

        _proto.call = function call(funcName, jsonMsg) {
          throw new Error("--- NativeIos Method not implemented. call");
        };

        _proto.decode = function decode(data) {
          throw new Error('--- NativeIos Method not implemented. decode');
        };

        return NativeIos;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeMgr.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bd803ayfgBES4hGT7f/PttZ", "NativeMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NativeMgr = exports('NativeMgr', /*#__PURE__*/function () {
        function NativeMgr() {
          this.mCallMap = new Map();
          this.mPersistCallMap = new Map();
          this.mCaller = void 0;
        }

        var _proto = NativeMgr.prototype;

        _proto.Start = function Start() {
          NativeMgr.Ins = this; // 注册一个全局方法

          window["gOnAndroidCall"] = this.onNativeCall.bind(this);
          window["gOnAndroidPerCall"] = this.onNativePerCall.bind(this);
        };

        _proto.setCaller = function setCaller(caller) {
          this.mCaller = caller;
        } // 被 native 调用的接口
        ;

        _proto.onNativeCall = function onNativeCall(data, isSucc) {
          if (isSucc === void 0) {
            isSucc = true;
          }

          data = this.mCaller.decode(data);
          var pd = JSON.parse(data);
          var cb = this.mCallMap.get(pd.func);
          if (!cb) return;
          this.mCallMap["delete"](pd.func);
          cb(pd.msg, isSucc);
        } // 被 native 调用的接口
        ;

        _proto.onNativePerCall = function onNativePerCall(data, isSucc) {
          if (isSucc === void 0) {
            isSucc = true;
          }

          data = this.mCaller.decode(data);
          var pd = JSON.parse(data);
          var cb = this.mPersistCallMap.get(pd.func);
          if (!cb) return;
          cb(pd.msg, isSucc);
        };

        _proto.callNativeFunc = function callNativeFunc(cb, funcName, jsonMsg) {
          if (jsonMsg === void 0) {
            jsonMsg = "{}";
          } // LogUtil.D(`--- CallNativeFunc, funcName: ${funcName}, jsonMsg: ${jsonMsg}`);


          if (cb) {
            this.mCallMap.set(funcName, cb);
          }

          try {
            this.mCaller.call(funcName, jsonMsg);
          } catch (ex) {
            // 调用失败要回调给逻辑层层
            var pd = {
              func: funcName,
              msg: "NativeCallErr, funcName: " + funcName + " err: " + ex
            };
            this.onNativeCall(JSON.stringify(pd), false);
          }
        };

        _proto.cancelFunc = function cancelFunc(funcName) {
          this.mCallMap["delete"](funcName);
        };

        _proto.regPersistFunc = function regPersistFunc(cb, funcName) {
          this.mPersistCallMap.set(funcName, cb);
        };

        _proto.cancelPersistFunc = function cancelPersistFunc(funcName) {
          this.mPersistCallMap["delete"](funcName);
        };

        return NativeMgr;
      }());
      NativeMgr.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NativeWeb.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      cclegacy._RF.push({}, "841a6Clj2lHaIYlZWU1zfVg", "NativeWeb", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var NativeWeb = exports('NativeWeb', /*#__PURE__*/function () {
        function NativeWeb() {}

        var _proto = NativeWeb.prototype;

        _proto.call = function call(funcName, jsonMsg) {
          throw new Error("--- NativeWeb Method not implemented. call");
        };

        _proto.decode = function decode(data) {
          throw new Error("--- NativeWeb Method not implemented. decode");
        };

        return NativeWeb;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Notify.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Animation, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "01391Mp6X1Gn554rkzavN4K", "Notify", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 滚动消息提示组件  */

      var Notify = exports('Notify', (_dec = ccclass('Notify'), _dec2 = property(Animation), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Notify, _Component);

        function Notify() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "animation", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Notify.prototype;

        _proto.onLoad = function onLoad() {
          if (this.animation) this.animation.on(Animation.EventType.FINISHED, this.onFinished, this);
        };

        _proto.onFinished = function onFinished() {
          this.node.destroy();
        } // /**
        //  * 显示提示
        //  * @param msg       文本
        //  * @param useI18n   设置为 true 时，使用多语言功能 msg 参数为多语言 key
        //  */
        // toast(msg: string, useI18n: boolean) {
        //     let label = this.lab_content?.getComponent(LanguageLabel)!;
        //     if (useI18n) {
        //         label.dataID = msg;
        //     }
        //     else {
        //         if (label)
        //             label.dataID = "";
        //         this.lab_content!.string = msg;
        //     }
        // }
        ;

        return Notify;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "animation", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/OtherData.ts", ['cc', './EventSys.ts', './LogUtil.ts', './TimerMgr.ts', './EnumEvent.ts'], function (exports) {
  'use strict';

  var cclegacy, macro, EventSys, LogUtil, TimerMgr, EnumEvent;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      macro = module.macro;
    }, function (module) {
      EventSys = module.EventSys;
    }, function (module) {
      LogUtil = module.LogUtil;
    }, function (module) {
      TimerMgr = module.TimerMgr;
    }, function (module) {
      EnumEvent = module.EnumEvent;
    }],
    execute: function () {
      cclegacy._RF.push({}, "75e71vqwwtJIqM8BOnFsi1o", "OtherData", undefined);

      var OtherData = exports('OtherData', /*#__PURE__*/function () {
        function OtherData() {
          this._serverTime = null;
          this._serverTimeTimer = null;
          this._todayOutTime = null;
          LogUtil.D('Init OtherData');
        }

        var _proto = OtherData.prototype;

        _proto.GetServerTime = function GetServerTime() {
          return this._serverTime;
        } // public SetServerTime(serverTime: number | Long) {
        //     this._serverTime = Tool.GetNumberFromLong(serverTime)
        //     this.RefreshTodayOutTime()
        //     this.AddServerTimeTimer()
        // }
        ;

        _proto.AddServerTimeTimer = function AddServerTimeTimer() {
          var _this = this;

          this.RemoveServerTimeTimer();
          this._serverTimeTimer = TimerMgr.Ins.AddTimer(1, function () {
            _this.HandleServerTime();
          }, macro.REPEAT_FOREVER);
        };

        _proto.RemoveServerTimeTimer = function RemoveServerTimeTimer() {
          if (this._serverTimeTimer != null) {
            TimerMgr.Ins.RemoveTimer(this._serverTimeTimer);
            this._serverTimeTimer = null;
          }
        };

        _proto.HandleServerTime = function HandleServerTime() {
          this._serverTime += 1;

          if (this._todayOutTime > 0 && this._serverTime >= this._todayOutTime) {
            EventSys.Fire(EnumEvent.TodayOut);
            this.RefreshTodayOutTime();
          }
        };

        _proto.RefreshTodayOutTime = function RefreshTodayOutTime() {
          this._todayOutTime = Math.floor(this._serverTime / (60 * 60 * 24)) * (60 * 60 * 24) + 60 * 60 * 24;
        };

        _proto.Clear = function Clear() {
          this.RemoveServerTimeTimer();
        };

        return OtherData;
      }());
      OtherData.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ParticleSimulator2DExt.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Vec2, UIVertexFormat, js, misc, ParticleSystem2D, Color;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      UIVertexFormat = module.UIVertexFormat;
      js = module.js;
      misc = module.misc;
      ParticleSystem2D = module.ParticleSystem2D;
      Color = module.Color;
    }],
    execute: function () {
      cclegacy._RF.push({}, "df3f1DtFbVHbrKZlSN8wQbU", "ParticleSimulator2DExt", undefined); // 补充引擎不让访问的属性


      var START_RADIUS_EQUAL_TO_END_RADIUS = -1;
      var START_SIZE_EQUAL_TO_END_SIZE = -1;
      var ZERO_VEC2 = new Vec2(0, 0);

      var _pos = new Vec2();

      var _tpa = new Vec2();

      var _tpb = new Vec2();

      var _tpc = new Vec2();

      var formatBytes = UIVertexFormat.getComponentPerVertex(UIVertexFormat.vfmtPosUvColor); // In the Free mode to get emit real rotation in the world coordinate.

      function getWorldRotation(node) {
        var rotation = 0;
        var tempNode = node;

        while (tempNode) {
          rotation += tempNode.eulerAngles.z;
          tempNode = tempNode.parent;
        }

        return rotation;
      }

      var Particle = function Particle() {
        this.pos = new Vec2(0, 0);
        this.startPos = new Vec2(0, 0);
        this.color = new Color(0, 0, 0, 255);
        this.deltaColor = {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        };
        this.size = 0;
        this.deltaSize = 0;
        this.rotation = 0;
        this.deltaRotation = 0;
        this.timeToLive = 0;
        this.drawPos = new Vec2(0, 0);
        this.aspectRatio = 1;
        this.dir = new Vec2(0, 0);
        this.radialAccel = 0;
        this.tangentialAccel = 0;
        this.angle = 0;
        this.degreesPerSecond = 0;
        this.radius = 0;
        this.deltaRadius = 0;
        this.enableAnimation = false;
        this.enableFrame = false;
        this.sizeX = 0;
        this.sizeY = 0;
        this.frameindex = 0;
        this.lastFrameTime = 0;
        this.uv_deltaX = 0;
        this.uv_deltaY = 0;
        this.animationRate = 0;
      };

      var ParticlePool = /*#__PURE__*/function (_js$Pool) {
        _inheritsLoose(ParticlePool, _js$Pool);

        function ParticlePool() {
          return _js$Pool.apply(this, arguments) || this;
        }

        var _proto = ParticlePool.prototype;

        _proto.get = function get() {
          return this._get() || new Particle();
        };

        return ParticlePool;
      }(js.Pool);

      var pool = new ParticlePool(function (par) {
        par.pos.set(ZERO_VEC2);
        par.startPos.set(ZERO_VEC2);
        par.color._val = 0xFF000000;
        par.deltaColor.r = par.deltaColor.g = par.deltaColor.b = 0;
        par.deltaColor.a = 255;
        par.size = 0;
        par.deltaSize = 0;
        par.rotation = 0;
        par.deltaRotation = 0;
        par.timeToLive = 0;
        par.drawPos.set(ZERO_VEC2);
        par.aspectRatio = 1; // Mode A

        par.dir.set(ZERO_VEC2);
        par.radialAccel = 0;
        par.tangentialAccel = 0; // Mode B

        par.angle = 0;
        par.degreesPerSecond = 0;
        par.radius = 0;
        par.deltaRadius = 0; //animation mode

        par.frameindex = 0; //当前帧

        par.lastFrameTime = 0;
      }, 1024);
      var particleSimulator = exports('particleSimulator', /*#__PURE__*/function () {
        function particleSimulator(system) {
          this.particles = [];
          this.active = false;
          this.uvFilled = 0;
          this.finished = false;
          this.readyToPlay = true;
          this.elapsed = 0;
          this.emitCounter = 0;
          this._worldRotation = 0;
          this.sys = system;
          this.particles = [];
          this.active = false;
          this.readyToPlay = true;
          this.finished = false;
          this.elapsed = 0;
          this.emitCounter = 0;
          this.uvFilled = 0;
          this._worldRotation = 0;
        }

        var _proto2 = particleSimulator.prototype;

        _proto2.stop = function stop() {
          this.active = false;
          this.readyToPlay = false;
          this.elapsed = this.sys.duration;
          this.emitCounter = 0;
        };

        _proto2.reset = function reset() {
          this.active = true;
          this.readyToPlay = true;
          this.elapsed = 0;
          this.emitCounter = 0;
          this.finished = false;
          var particles = this.particles;

          for (var id = 0; id < particles.length; ++id) pool.put(particles[id]);

          particles.length = 0;
        };

        _proto2.emitParticle = function emitParticle(pos) {
          var psys = this.sys;
          var particle = pool.get();
          this.particles.push(particle); // Init particle
          // timeToLive
          // no negative life. prevent division by 0

          particle.timeToLive = psys.life + psys.lifeVar * (Math.random() - 0.5) * 2;
          var timeToLive = particle.timeToLive = Math.max(0, particle.timeToLive); // position

          particle.pos.x = psys.sourcePos.x + psys.posVar.x * (Math.random() - 0.5) * 2;
          particle.pos.y = psys.sourcePos.y + psys.posVar.y * (Math.random() - 0.5) * 2; // Color

          var sr = 0;
          var sg = 0;
          var sb = 0;
          var sa = 0;
          var startColor = psys.startColor;
          var startColorVar = psys.startColorVar;
          var endColor = psys.endColor;
          var endColorVar = psys.endColorVar;
          particle.color.r = sr = misc.clampf(startColor.r + startColorVar.r * (Math.random() - 0.5) * 2, 0, 255);
          particle.color.g = sg = misc.clampf(startColor.g + startColorVar.g * (Math.random() - 0.5) * 2, 0, 255);
          particle.color.b = sb = misc.clampf(startColor.b + startColorVar.b * (Math.random() - 0.5) * 2, 0, 255);
          particle.color.a = sa = misc.clampf(startColor.a + startColorVar.a * (Math.random() - 0.5) * 2, 0, 255);
          particle.deltaColor.r = (misc.clampf(endColor.r + endColorVar.r * (Math.random() - 0.5) * 2, 0, 255) - sr) / timeToLive;
          particle.deltaColor.g = (misc.clampf(endColor.g + endColorVar.g * (Math.random() - 0.5) * 2, 0, 255) - sg) / timeToLive;
          particle.deltaColor.b = (misc.clampf(endColor.b + endColorVar.b * (Math.random() - 0.5) * 2, 0, 255) - sb) / timeToLive;
          particle.deltaColor.a = (misc.clampf(endColor.a + endColorVar.a * (Math.random() - 0.5) * 2, 0, 255) - sa) / timeToLive; // size

          var startS = psys.startSize + psys.startSizeVar * (Math.random() - 0.5) * 2;
          startS = Math.max(0, startS); // No negative value

          particle.size = startS;

          if (psys.endSize === START_SIZE_EQUAL_TO_END_SIZE) {
            particle.deltaSize = 0;
          } else {
            var endS = psys.endSize + psys.endSizeVar * (Math.random() - 0.5) * 2;
            endS = Math.max(0, endS); // No negative values

            particle.deltaSize = (endS - startS) / timeToLive;
          } // rotation


          var startA = psys.startSpin + psys.startSpinVar * (Math.random() - 0.5) * 2;
          var endA = psys.endSpin + psys.endSpinVar * (Math.random() - 0.5) * 2;
          particle.rotation = startA;
          particle.deltaRotation = (endA - startA) / timeToLive; // position

          particle.startPos.x = pos.x;
          particle.startPos.y = pos.y; // aspect ratio

          particle.aspectRatio = psys.aspectRatio || 1; // direction

          var a = misc.degreesToRadians(psys.angle + this._worldRotation + psys.angleVar * (Math.random() - 0.5) * 2); // Mode Gravity: A

          if (psys.emitterMode === ParticleSystem2D.EmitterMode.GRAVITY) {
            var s = psys.speed + psys.speedVar * (Math.random() - 0.5) * 2; // direction

            particle.dir.x = Math.cos(a);
            particle.dir.y = Math.sin(a);
            particle.dir.multiplyScalar(s); // radial accel

            particle.radialAccel = psys.radialAccel + psys.radialAccelVar * (Math.random() - 0.5) * 2; // tangential accel

            particle.tangentialAccel = psys.tangentialAccel + psys.tangentialAccelVar * (Math.random() - 0.5) * 2; // rotation is dir

            if (psys.rotationIsDir) {
              particle.rotation = -misc.radiansToDegrees(Math.atan2(particle.dir.y, particle.dir.x));
            }
          } else {
            // Mode Radius: B
            // Set the default diameter of the particle from the source position
            var startRadius = psys.startRadius + psys.startRadiusVar * (Math.random() - 0.5) * 2;
            var endRadius = psys.endRadius + psys.endRadiusVar * (Math.random() - 0.5) * 2;
            particle.radius = startRadius;
            particle.deltaRadius = psys.endRadius === START_RADIUS_EQUAL_TO_END_RADIUS ? 0 : (endRadius - startRadius) / timeToLive;
            particle.angle = a;
            particle.degreesPerSecond = misc.degreesToRadians(psys.rotatePerS + psys.rotatePerSVar * (Math.random() - 0.5) * 2);
          } //animation mode


          particle.enableAnimation = psys.enableAnimation;
          particle.enableFrame = psys.enableFrame;

          if (particle.enableAnimation && !particle.enableFrame) {
            particle.sizeX = psys.sizeX;
            particle.sizeY = psys.sizeY;
            particle.frameindex = Math.floor(Math.random() * (psys.sizeX * psys.sizeY));
            particle.lastFrameTime = particle.timeToLive;
            particle.uv_deltaX = psys.uv_deltaX;
            particle.uv_deltaY = psys.uv_deltaY;
            particle.animationRate = psys.animationRate;
          }

          if (particle.enableAnimation && particle.enableFrame) {
            particle.sizeX = psys.sizeX;
            particle.sizeY = psys.sizeY;
            particle.frameindex = 0;
            particle.lastFrameTime = particle.timeToLive;
            particle.uv_deltaX = psys.uv_deltaX;
            particle.uv_deltaY = psys.uv_deltaY;
            particle.animationRate = psys.animationRate;
          }
        };

        _proto2.updateUVs = function updateUVs(force) {
          var renderData = this.renderData;

          if (renderData && this.sys._renderSpriteFrame) {
            var vbuf = renderData.vData;
            var uv = this.sys._renderSpriteFrame.uv;
            var start = force ? 0 : this.uvFilled;
            var particleCount = this.particles.length;

            for (var i = start; i < particleCount; i++) {
              var offset = i * formatBytes * 4;
              vbuf[offset + 3] = uv[0];
              vbuf[offset + 4] = uv[1];
              vbuf[offset + 12] = uv[2];
              vbuf[offset + 13] = uv[3];
              vbuf[offset + 21] = uv[4];
              vbuf[offset + 22] = uv[5];
              vbuf[offset + 30] = uv[6];
              vbuf[offset + 31] = uv[7];
            }

            this.uvFilled = particleCount;
          }
        };

        _proto2.updateParticleBuffer = function updateParticleBuffer(particle, pos, buffer, offset) {
          var vbuf = buffer.vData; // const uintbuf = buffer._uintVData;
          // const x: number = pos.x;
          // const y: number = pos.y;
          // let width = particle.size;
          // let height = width;
          // const aspectRatio = particle.aspectRatio;
          // if (aspectRatio > 1) {
          //     height = width / aspectRatio;
          // } else {
          //     width = height * aspectRatio;
          // }
          // const halfWidth = width / 2;
          // const halfHeight = height / 2;
          // // pos
          // if (particle.rotation) {
          //     const x1 = -halfWidth;
          //     const y1 = -halfHeight;
          //     const x2 = halfWidth;
          //     const y2 = halfHeight;
          //     const rad = -misc.degreesToRadians(particle.rotation);
          //     const cr = Math.cos(rad);
          //     const sr = Math.sin(rad);
          //     // bl
          //     vbuf[offset] = x1 * cr - y1 * sr + x;
          //     vbuf[offset + 1] = x1 * sr + y1 * cr + y;
          //     vbuf[offset + 2] = 0;
          //     // br
          //     vbuf[offset + 9] = x2 * cr - y1 * sr + x;
          //     vbuf[offset + 10] = x2 * sr + y1 * cr + y;
          //     vbuf[offset + 11] = 0;
          //     // tl
          //     vbuf[offset + 18] = x1 * cr - y2 * sr + x;
          //     vbuf[offset + 19] = x1 * sr + y2 * cr + y;
          //     vbuf[offset + 20] = 0;
          //     // tr
          //     vbuf[offset + 27] = x2 * cr - y2 * sr + x;
          //     vbuf[offset + 28] = x2 * sr + y2 * cr + y;
          //     vbuf[offset + 29] = 0;
          // } else {
          //     // bl
          //     vbuf[offset] = x - halfWidth;
          //     vbuf[offset + 1] = y - halfHeight;
          //     vbuf[offset + 2] = 0;
          //     // br
          //     vbuf[offset + 9] = x + halfWidth;
          //     vbuf[offset + 10] = y - halfHeight;
          //     vbuf[offset + 11] = 0;
          //     // tl
          //     vbuf[offset + 18] = x - halfWidth;
          //     vbuf[offset + 19] = y + halfHeight;
          //     vbuf[offset + 20] = 0;
          //     // tr
          //     vbuf[offset + 27] = x + halfWidth;
          //     vbuf[offset + 28] = y + halfHeight;
          //     vbuf[offset + 29] = 0;
          // }

          var x = pos.x,
              y = pos.y;
          var size_2 = particle.size / 2; // pos

          if (particle.rotation) {
            var x1 = -size_2,
                y1 = -size_2;
            var x2 = size_2,
                y2 = size_2;
            var rad = -misc.degreesToRadians(particle.rotation);
            var cr = Math.cos(rad),
                sr = Math.sin(rad); // bl

            vbuf[offset] = x1 * cr - y1 * sr + x;
            vbuf[offset + 1] = x1 * sr + y1 * cr + y;
            vbuf[offset + 2] = 0; // br

            vbuf[offset + 9] = x2 * cr - y1 * sr + x;
            vbuf[offset + 10] = x2 * sr + y1 * cr + y;
            vbuf[offset + 11] = 0; // tl

            vbuf[offset + 18] = x1 * cr - y2 * sr + x;
            vbuf[offset + 19] = x1 * sr + y2 * cr + y;
            vbuf[offset + 20] = 0; // tr

            vbuf[offset + 27] = x2 * cr - y2 * sr + x;
            vbuf[offset + 28] = x2 * sr + y2 * cr + y;
            vbuf[offset + 29] = 0;
          } else {
            // bl
            vbuf[offset] = x - size_2;
            vbuf[offset + 1] = y - size_2;
            vbuf[offset + 2] = 0; // br

            vbuf[offset + 9] = x + size_2;
            vbuf[offset + 10] = y - size_2;
            vbuf[offset + 11] = 0; // tl

            vbuf[offset + 18] = x - size_2;
            vbuf[offset + 19] = y + size_2;
            vbuf[offset + 20] = 0; // tr

            vbuf[offset + 27] = x + size_2;
            vbuf[offset + 28] = y + size_2;
            vbuf[offset + 29] = 0;
          } //animation mode


          if (this.sys._renderSpriteFrame && particle.enableAnimation) {
            var spriteframeSize = this.sys._renderSpriteFrame.getOriginalSize();

            var maxFrameIndex = particle.sizeX * particle.sizeY;
            var nextFramePosIndex = (particle.frameindex + 1) % maxFrameIndex;
            var duration = 1 / particle.animationRate;
            var sizeY = Math.floor(nextFramePosIndex / particle.sizeX);
            var sizeX = nextFramePosIndex % particle.sizeX;
            var uv_x = sizeX * particle.uv_deltaX / spriteframeSize.width;
            var uv_y = sizeY * particle.uv_deltaY / spriteframeSize.height;
            var uv_w = particle.uv_deltaX / spriteframeSize.width;
            var uv_h = particle.uv_deltaY / spriteframeSize.height; //uv bl

            vbuf[offset + 3] = uv_x;
            vbuf[offset + 4] = uv_y + uv_h; //uv br

            vbuf[offset + 12] = uv_x + uv_w;
            vbuf[offset + 13] = uv_y + uv_h; //uv tl

            vbuf[offset + 21] = uv_x;
            vbuf[offset + 22] = uv_y; //uv tr

            vbuf[offset + 30] = uv_x + uv_w;
            vbuf[offset + 31] = uv_y;

            if (particle.enableFrame) {
              if (particle.lastFrameTime - particle.timeToLive > duration) {
                //计算需要第几列第几行的小图进行显示渲染
                particle.frameindex++;
                particle.lastFrameTime = particle.timeToLive;
              }
            }
          } else {
            vbuf[offset + 3] = 0;
            vbuf[offset + 4] = 1; //uv br

            vbuf[offset + 12] = 1;
            vbuf[offset + 13] = 1; //uv tl

            vbuf[offset + 21] = 0;
            vbuf[offset + 22] = 0; //uv tr

            vbuf[offset + 30] = 1;
            vbuf[offset + 31] = 0;
          } // color


          Color.toArray(vbuf, particle.color, offset + 5);
          Color.toArray(vbuf, particle.color, offset + 14);
          Color.toArray(vbuf, particle.color, offset + 23);
          Color.toArray(vbuf, particle.color, offset + 32);
        };

        _proto2.step = function step(dt) {
          var assembler = this.sys.assembler;
          var psys = this.sys;
          var node = psys.node;
          var particles = this.particles;
          dt = dt > assembler.maxParticleDeltaTime ? assembler.maxParticleDeltaTime : dt; // Calculate pos

          node.updateWorldTransform();

          if (psys.positionType === ParticleSystem2D.PositionType.FREE) {
            this._worldRotation = getWorldRotation(node);
            var m = node.worldMatrix;
            _pos.x = m.m12;
            _pos.y = m.m13;
          } else if (psys.positionType === ParticleSystem2D.PositionType.RELATIVE) {
            this._worldRotation = node.eulerAngles.z;
            _pos.x = node.position.x;
            _pos.y = node.position.y;
          } else {
            this._worldRotation = 0;
          } // Emission


          if (this.active && psys.emissionRate) {
            var rate = 1.0 / psys.emissionRate; // issue #1201, prevent bursts of particles, due to too high emitCounter

            if (particles.length < psys.totalParticles) this.emitCounter += dt;

            while (particles.length < psys.totalParticles && this.emitCounter > rate) {
              this.emitParticle(_pos);
              this.emitCounter -= rate;
            }

            this.elapsed += dt;

            if (psys.duration !== -1 && psys.duration < this.elapsed) {
              psys.stopSystem();
            }
          } // Request buffer for particles


          var renderData = this.renderData;
          var particleCount = particles.length;
          renderData.reset();
          this.requestData(particleCount * 4, particleCount * 6); // Fill up uvs

          if (particleCount > this.uvFilled) {
            this.updateUVs();
          } // Used to reduce memory allocation / creation within the loop


          var particleIdx = 0;

          while (particleIdx < particles.length) {
            // Reset temporary vectors
            _tpa.x = _tpa.y = _tpb.x = _tpb.y = _tpc.x = _tpc.y = 0;
            var particle = particles[particleIdx]; // life

            particle.timeToLive -= dt;

            if (particle.timeToLive > 0) {
              // Mode A: gravity, direction, tangential accel & radial accel
              if (psys.emitterMode === ParticleSystem2D.EmitterMode.GRAVITY) {
                var tmp = _tpc;
                var radial = _tpa;
                var tangential = _tpb; // radial acceleration

                if (particle.pos.x || particle.pos.y) {
                  radial.set(particle.pos);
                  radial.normalize();
                }

                tangential.set(radial);
                radial.multiplyScalar(particle.radialAccel); // tangential acceleration

                var newy = tangential.x;
                tangential.x = -tangential.y;
                tangential.y = newy;
                tangential.multiplyScalar(particle.tangentialAccel);
                tmp.set(radial);
                tmp.add(tangential);
                tmp.add(psys.gravity);
                tmp.multiplyScalar(dt);
                particle.dir.add(tmp);
                tmp.set(particle.dir);
                tmp.multiplyScalar(dt);
                particle.pos.add(tmp);
              } else {
                // Mode B: radius movement
                // Update the angle and radius of the particle.
                particle.angle += particle.degreesPerSecond * dt;
                particle.radius += particle.deltaRadius * dt;
                particle.pos.x = -Math.cos(particle.angle) * particle.radius;
                particle.pos.y = -Math.sin(particle.angle) * particle.radius;
              } // color


              particle.color.r += particle.deltaColor.r * dt;
              particle.color.g += particle.deltaColor.g * dt;
              particle.color.b += particle.deltaColor.b * dt;
              particle.color.a += particle.deltaColor.a * dt; // size

              particle.size += particle.deltaSize * dt;

              if (particle.size < 0) {
                particle.size = 0;
              } // angle


              particle.rotation += particle.deltaRotation * dt; // update values in quad buffer

              var newPos = _tpa;
              newPos.set(particle.pos);

              if (psys.positionType !== ParticleSystem2D.PositionType.GROUPED) {
                newPos.add(particle.startPos);
              }

              var offset = formatBytes * particleIdx * 4;
              this.updateParticleBuffer(particle, newPos, renderData, offset); // update particle counter

              ++particleIdx;
            } else {
              // life < 0
              var deadParticle = particles[particleIdx];

              if (particleIdx !== particles.length - 1) {
                particles[particleIdx] = particles[particles.length - 1];
              }

              pool.put(deadParticle);
              particles.length--;
              renderData.resize(renderData.vertexCount - 4, renderData.indexCount - 6);
            }
          }

          this.renderData.material = this.sys.getRenderMaterial(0); // hack

          this.renderData.frame = this.sys._renderSpriteFrame; // hack

          renderData.setRenderDrawInfoAttributes();

          if (particles.length === 0 && !this.active && !this.readyToPlay) {
            this.finished = true;

            psys._finishedSimulation();
          }
        };

        _proto2.requestData = function requestData(vertexCount, indexCount) {
          var offset = this.renderData.indexCount;
          this.renderData.request(vertexCount, indexCount);
          var count = this.renderData.indexCount / 6;
          var buffer = this.renderData.iData;

          for (var i = offset; i < count; i++) {
            var vId = i * 4;
            buffer[offset++] = vId;
            buffer[offset++] = vId + 1;
            buffer[offset++] = vId + 2;
            buffer[offset++] = vId + 1;
            buffer[offset++] = vId + 3;
            buffer[offset++] = vId + 2;
          }
        };

        _proto2.initDrawInfo = function initDrawInfo() {
          var renderData = this.renderData;
          renderData.setRenderDrawInfoAttributes();
        };

        return particleSimulator;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ParticleSystem2DExt.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts', './ParticleSimulator2DExt.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, CCBoolean, CCInteger, ParticleSystem2D, LogUtil, particleSimulator;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCBoolean = module.CCBoolean;
      CCInteger = module.CCInteger;
      ParticleSystem2D = module.ParticleSystem2D;
    }, function (module) {
      LogUtil = module.LogUtil;
    }, function (module) {
      particleSimulator = module.particleSimulator;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

      cclegacy._RF.push({}, "211fc9BIf9NJquM1R9AV63i", "ParticleSystem2DExt", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ParticleSystem2DExt = exports('ParticleSystem2DExt', (_dec = ccclass('ParticleSystem2DExt'), _dec2 = property(CCBoolean), _dec3 = property(CCBoolean), _dec4 = property(CCBoolean), _dec5 = property(CCBoolean), _dec6 = property(CCBoolean), _dec7 = property(CCBoolean), _dec8 = property(CCInteger), _dec9 = property(CCInteger), _dec10 = property(CCInteger), _dec11 = property(CCInteger), _dec12 = property(CCInteger), _dec(_class = (_class2 = /*#__PURE__*/function (_ParticleSystem2D) {
        _inheritsLoose(ParticleSystem2DExt, _ParticleSystem2D);

        function ParticleSystem2DExt() {
          var _this;

          _this = _ParticleSystem2D.call(this) || this;

          _initializerDefineProperty(_this, "_playOnAwake", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableAnimation", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableFrame", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sizeX", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "sizeY", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "uv_deltaX", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "uv_deltaY", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "animationRate", _descriptor8, _assertThisInitialized(_this));

          _this._simulator = new particleSimulator(_assertThisInitialized(_this));
          return _this;
        }

        var _proto = ParticleSystem2DExt.prototype;

        _proto.onEnable = function onEnable() {
          _ParticleSystem2D.prototype.onEnable.call(this);

          if (this.playOnAwake) {
            this.resetSystem();
          }

          if (!this.spriteFrame) {
            LogUtil.E('--- no spriteFrame');
            return;
          }

          var tex = this.spriteFrame.getGFXTexture();
          if (this.uv_deltaX == 0) this.uv_deltaX = tex.width / this.sizeX;
          if (this.uv_deltaY == 0) this.uv_deltaY = tex.height / this.sizeY;
        };

        _createClass(ParticleSystem2DExt, [{
          key: "playOnAwake",
          get: function get() {
            return this._playOnAwake;
          },
          set:
          /**
           * !#zh 激活时从头播动画
           */
          function set(value) {
            this._playOnAwake = value;
          }
        }, {
          key: "enableAnimation",
          get: function get() {
            return this._enableAnimation;
          },
          set: function set(value) {
            this._enableAnimation = value;
          }
        }, {
          key: "enableFrame",
          get: function get() {
            return this._enableFrame;
          },
          set:
          /**
           * 
           */
          function set(value) {
            this._enableFrame = value;
          }
        }]);

        return ParticleSystem2DExt;
      }(ParticleSystem2D), (_applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "playOnAwake"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_playOnAwake", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enableAnimation", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "enableAnimation"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_enableAnimation", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "enableFrame", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "enableFrame"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_enableFrame", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sizeX", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sizeY", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "uv_deltaX", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "uv_deltaY", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "animationRate", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ParticleSystem2DPlayOnAwake.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ParticleSystem2DExt.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, ParticleSystem2D, Component, ParticleSystem2DExt;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ParticleSystem2D = module.ParticleSystem2D;
      Component = module.Component;
    }, function (module) {
      ParticleSystem2DExt = module.ParticleSystem2DExt;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "b5213ni92hNIZm/7lBfhzDz", "ParticleSystem2DPlayOnAwake", undefined);

      var ccclass = _decorator.ccclass;
      var ParticleSystem2DPlayOnAwake = exports('ParticleSystem2DPlayOnAwake', (_dec = ccclass('ParticleSystem2DPlayOnAwake'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ParticleSystem2DPlayOnAwake, _Component);

        function ParticleSystem2DPlayOnAwake() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.particle2D = void 0;
          _this.particle2DExt = void 0;
          return _this;
        }

        var _proto = ParticleSystem2DPlayOnAwake.prototype;

        _proto.onLoad = function onLoad() {
          this.particle2D = this.node.getComponent(ParticleSystem2D);
          this.particle2DExt = this.node.getComponent(ParticleSystem2DExt);
        };

        _proto.onEnable = function onEnable() {
          if (this.particle2D) {
            this.particle2D.resetSystem();
          }

          if (this.particle2DExt) {
            this.particle2DExt.resetSystem();
          }
        };

        return ParticleSystem2DPlayOnAwake;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerData.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "02e86xZASBIIqHP7pBem4A1", "PlayerData", undefined);

      var PlayerData = exports('PlayerData', /*#__PURE__*/function () {
        function PlayerData() {
          this._token = void 0;
          this._chips = void 0;
          this._name = void 0;
          this._roomList = new Array();
          this._playerList = new Array();
          this._coin = void 0;
          this._email = void 0;
          this._method = void 0;
          this._mainMode = "1";
          this._time = 30;
          this._account = void 0;
          this._phoneNameber = void 0;
          this._password = "mypassword";
          this._stayTime = 180;
          this._currency = "R$";
          this._login = true;
          this._route = void 0;
          this._setting = {
            // 设置数据
            maxBuyInSwitch: false,
            // 最大买入
            autoBuySwitch: false,
            // 自动买入
            chipsDisplay: 1,
            // 筹码显示
            cardSqueezeSwitch: true,
            // 咪牌开关
            chatSwitch: false,
            // 禁言模式
            smartSwitch: true // 智能切换

          };
        }

        var _proto = PlayerData.prototype; // public GetUid() {
        //     return this._uid
        // }
        // public SetUid(uid: (number|Long)) {
        //     this._uid = uid
        // }

        _proto.SetInfo = function SetInfo(loginInfo) {};

        _proto.SavePlayerInfo = function SavePlayerInfo(info) {
          info = info.accounts; // this._uid = info.uid

          this._token = info.Token;
          this._name = info.nickname;
          this._email = info.email;
          this._account = info.account;
          this._phoneNameber = info.phoneNumber; // HttpMgr.Ins.setToken(info.Token)
          // HttpMgr.Ins.setUid(info.UID)
          // HttpMgr.Ins.setAccId(info.AccountID)

          this.SetCoin(info.coin);
        };

        _proto.saveAccountData = function saveAccountData(info) {
          // this._uid = info.accounts.uid;
          this._name = info.accounts.nickName;
          this._email = info.accounts.email;
          this._phoneNameber = info.accounts.phoneNumber;
          this._password = info.accounts.password;
        };

        _proto.saveLevelList = function saveLevelList(bts) {
          this._roomList = bts.roomsSummary;
        };

        _proto.GetLevelList = function GetLevelList() {
          return this._roomList;
        };

        _proto.SetPlayerList = function SetPlayerList(data) {
          this._playerList = data.players;
        };

        _proto.GetPlayerList = function GetPlayerList() {
          return this._playerList;
        };

        _proto.GetChips = function GetChips() {
          return this._chips;
        };

        _proto.GetName = function GetName() {
          return this._name;
        };

        _proto.setSettingData = function setSettingData(data) {
          if (data.settings) {
            this._setting = data.settings;
          }
        };

        _proto.getSettingData = function getSettingData() {
          return this._setting;
        } // public SetChips(chips: number|Long) {
        //     this._chips = Tool.GetNumberFromLong(chips)
        // }
        ;

        _proto.GetToken = function GetToken() {
          return this._token;
        };

        _proto.SetCoin = function SetCoin(coin) {
          this._coin = Number(coin) / 100;
        };

        _proto.GetCoin = function GetCoin() {
          return this._coin;
        };

        _proto.SetMainMode = function SetMainMode(number) {
          this._mainMode = number;
        };

        _proto.GetMainMode = function GetMainMode() {
          return this._mainMode;
        };

        _proto.SetRoute = function SetRoute(route) {
          this._route = route;
        };

        _proto.GetRoute = function GetRoute() {
          return this._route;
        };

        _proto.SetLogin = function SetLogin(login) {
          this._login = login;
        };

        _proto.GetLogin = function GetLogin() {
          return this._login;
        };

        return PlayerData;
      }());
      PlayerData.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PnlComTextTips.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBaseLogic.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, Label, UIBaseLogic;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aaa4aukq8FAeo6p6GCFJdmF", "PnlComTextTips", undefined);

      var PnlComTextTips = exports('PnlComTextTips', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(PnlComTextTips, _UIBaseLogic);

        function PnlComTextTips() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._contentLable = void 0;
          return _this;
        }

        var _proto = PnlComTextTips.prototype;

        _proto.Init = function Init(id, go) {
          _UIBaseLogic.prototype.Init.call(this, id, go);

          this._contentLable = go.getChildByPath("lab_content").getComponent(Label);
        };

        _proto.SetContent = function SetContent(content) {
          this._contentLable.string = content;
        };

        return PnlComTextTips;
      }(UIBaseLogic));
      PnlComTextTips.prefabPath = "prefab/ui/tips/PnlComTextTips";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PnlWaittingLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIBaseLogic.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIBaseLogic;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e7621jbqKRMYohAyVZUjJhx", "PnlWaittingLogic", undefined);

      var PnlWaittingLogic = exports('PnlWaittingLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(PnlWaittingLogic, _UIBaseLogic);

        function PnlWaittingLogic() {
          return _UIBaseLogic.apply(this, arguments) || this;
        }

        var _proto = PnlWaittingLogic.prototype;

        _proto.Init = function Init(id, go) {
          _UIBaseLogic.prototype.Init.call(this, id, go);
        };

        return PnlWaittingLogic;
      }(UIBaseLogic));
      PnlWaittingLogic.prefabPath = "prefab/ui/tips/PnlWaiting";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts', './AssetTracker.ts'], function (exports) {
  'use strict';

  var _asyncToGenerator, _regeneratorRuntime, cclegacy, assetManager, js, Asset, resources, instantiate, LogUtil, AssetTracker;

  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      assetManager = module.assetManager;
      js = module.js;
      Asset = module.Asset;
      resources = module.resources;
      instantiate = module.instantiate;
    }, function (module) {
      LogUtil = module.LogUtil;
    }, function (module) {
      AssetTracker = module.AssetTracker;
    }],
    execute: function () {
      cclegacy._RF.push({}, "46f54tncBRFnqhKDUIVC0aJ", "ResMgr", undefined);
      /** 
       * 游戏资管理 
       * 1、加载默认resources文件夹中资源
       * 2、加载默认bundle远程资源
       * 3、主动传递bundle名时，优先加载传递bundle名资源包中的资源
       */


      var ResMgr = exports('ResMgr', /*#__PURE__*/function () {
        function ResMgr() {
          this.defaultBundleName = "resources";
        }

        var _proto = ResMgr.prototype;

        _proto.loadRemote = function loadRemote(url) {
          var options = null;
          var onComplete = null;

          if ((arguments.length <= 1 ? 0 : arguments.length - 1) == 2) {
            options = arguments.length <= 1 ? undefined : arguments[1];
            onComplete = arguments.length <= 2 ? undefined : arguments[2];
          } else {
            onComplete = arguments.length <= 1 ? undefined : arguments[1];
          }

          assetManager.loadRemote(url, options, onComplete);
        }
        /**
         * 加载资源包
         * @param url       资源地址
         * @param complete  完成事件
         * @param v         资源MD5版本号
         * @example
        var serverUrl = "http://192.168.1.8:8080/";         // 服务器地址
        var md5 = "8e5c0";                                  // Cocos Creator 构建后的MD5字符
        await oops.res.loadBundle(serverUrl,md5);
         */

        /*
            loadBundle(url: string, v?: string) {
                return new Promise<AssetManager.Bundle>((resolve, reject) => {
                    assetManager.loadBundle(url, { version: v }, (err, bundle: AssetManager.Bundle) => {
                        if (err) {
                            return error(err);
                        }
                        resolve(bundle);
                    });
                });
            }
            */

        /**
         * 加载一个资源
         * @param bundleName    远程包名
         * @param paths         资源路径
         * @param type          资源类型
         * @param onProgress    加载进度回调
         * @param onComplete    加载完成回调
         * @example
        oops.res.load("spine_path", sp.SkeletonData, (err: Error | null, sd: sp.SkeletonData) => {
        });
         */
        ;

        _proto.load = function load(bundleName, paths, type, onProgress, onComplete) {
          var args = null;

          if (typeof paths === "string" || paths instanceof Array) {
            args = this.parseLoadResArgs(paths, type, onProgress, onComplete);
            args.bundle = bundleName;
          } else {
            args = this.parseLoadResArgs(bundleName, paths, type, onProgress);
            args.bundle = this.defaultBundleName;
          } // console.error(`--- ResMgr.load, args: ${JSON.stringify(args)}`)


          this.loadByArgs(args);
        }
        /**
         * 加载文件夹中的资源
         * @param bundleName    远程包名
         * @param dir           文件夹名
         * @param type          资源类型
         * @param onProgress    加载进度回调
         * @param onComplete    加载完成回调
         * @example
        // 加载进度事件
        var onProgressCallback = (finished: number, total: number, item: any) => {
        LogUtil.D("资源加载进度", finished, total);
        }
        // 加载完成事件
        var onCompleteCallback = () => {
        LogUtil.D("资源加载完成");
        }
        oops.res.loadDir("game", onProgressCallback, onCompleteCallback);
         */
        ;

        _proto.loadDir = function loadDir(bundleName, dir, type, onProgress, onComplete) {
          var args = null;

          if (typeof dir === "string") {
            args = this.parseLoadResArgs(dir, type, onProgress, onComplete);
            args.bundle = bundleName;
          } else {
            args = this.parseLoadResArgs(bundleName, dir, type, onProgress);
            args.bundle = this.defaultBundleName;
          }

          args.dir = args.paths; // console.error(`--- ResMgr.loadDir, args: ${JSON.stringify(args)}`)

          this.loadByArgs(args);
        }
        /**
         * 通过资源相对路径释放资源
         * @param path          资源路径
         * @param bundleName    远程资源包名
         */
        // private release(path: string, bundleName?: string) {
        //     if (bundleName == null) bundleName = this.defaultBundleName;
        //     var bundle = assetManager.getBundle(bundleName);
        //     if (bundle) {
        //         var asset = bundle.get(path);
        //         if (asset) {
        //             LogUtil.D("---- release: path:", path, asset)
        //             this.releasePrefabtDepsRecursively(asset._uuid);
        //         }
        //     }
        // }

        /**
         * 通过相对文件夹路径删除所有文件夹中资源
         * @param path          资源文件夹路径
         * @param bundleName    远程资源包名
         */
        // releaseDir(path: string, bundleName?: string) {
        //     if (bundleName == null) bundleName = this.defaultBundleName;
        //     var bundle: AssetManager.Bundle | null = assetManager.getBundle(bundleName);
        //     if (bundle) {
        //         var infos = bundle.getDirWithPath(path);
        //         if (infos) {
        //             infos.map((info) => {
        //                 this.releasePrefabtDepsRecursively(info.uuid);
        //             });
        //         }
        //         if (path == "" && bundleName != "resources") {
        //             assetManager.removeBundle(bundle);
        //         }
        //     }
        // }
        // /** 释放预制依赖资源 */
        // private releasePrefabtDepsRecursively(uuid: string) {
        //     var asset = assetManager.assets.get(uuid)!;
        //     asset.decRef()
        //     if (asset instanceof Prefab) {
        //         var uuids: string[] = assetManager.dependUtil.getDepsRecursively(uuid)!;
        //         LogUtil.D(`---- releasePrefabtDepsRecursively, asset instanceof Prefab, uuid: ${uuid}, ref uuids:`, uuids)
        //         uuids.forEach(uuid => {
        //             var asset = assetManager.assets.get(uuid)!;
        //             // asset.decRef();
        //         });
        //     }
        // }

        /**
         * 获取资源
         * @param path          资源路径
         * @param type          资源类型
         * @param bundleName    远程资源包名
         */
        // get<T extends Asset>(path: string, bundleName?: string): T | null;
        ;

        _proto.get = function get(path, type, bundleName) {
          if (bundleName == null) bundleName = this.defaultBundleName;
          var bundle = assetManager.getBundle(bundleName);
          return bundle.get(path, type);
        }
        /** 打印缓存中所有资源信息 */
        ;

        _proto.dump = function dump() {
          assetManager.assets.forEach(function (value, key) {
            LogUtil.D("--- asset:", assetManager.assets.get(key));
          });
          LogUtil.D("--- assets.count: " + assetManager.assets.count);
        };

        _proto.parseLoadResArgs = function parseLoadResArgs(paths, type, onProgress, onComplete) {
          var pathsOut = paths;
          var typeOut = type;
          var onProgressOut = onProgress;
          var onCompleteOut = onComplete;

          if (onComplete === undefined) {
            var isValidType = js.isChildClassOf(type, Asset);

            if (onProgress) {
              onCompleteOut = onProgress;

              if (isValidType) {
                onProgressOut = null;
              }
            } else if (onProgress === undefined && !isValidType) {
              onCompleteOut = type;
              onProgressOut = null;
              typeOut = null;
            }

            if (onProgress !== undefined && !isValidType) {
              onProgressOut = type;
              typeOut = null;
            }
          }

          return {
            paths: pathsOut,
            type: typeOut,
            onProgress: onProgressOut,
            onComplete: onCompleteOut
          };
        };

        _proto.loadByBundleAndArgs = function loadByBundleAndArgs(bundle, args) {
          if (args.dir) {
            bundle.loadDir(args.paths, args.type, args.onProgress, args.onComplete);
          } else {
            if (typeof args.paths == 'string') {
              bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            } else {
              bundle.load(args.paths, args.type, args.onProgress, args.onComplete);
            }
          }
        };

        _proto.loadByArgs = function loadByArgs(args) {
          var _this = this;

          if (args.bundle) {
            if (assetManager.bundles.has(args.bundle)) {
              //LogUtil.D(`--- ResMgr.loadByArgs, bundles.has true, bundle: ${args.bundle}`)
              var bundle = assetManager.bundles.get(args.bundle);
              this.loadByBundleAndArgs(bundle, args);
            } else {
              // 自动加载bundle
              LogUtil.D("--- ResMgr.loadByArgs, assetManager.loadBundle, bundle: " + args.bundle);
              assetManager.loadBundle(args.bundle, function (err, bundle) {
                if (!err) {
                  _this.loadByBundleAndArgs(bundle, args);
                } else {
                  console.error("--- ResMgr.loadByArgs, assetManager.loadBundle, error: " + err);
                }
              });
            }
          } else {
            LogUtil.D("--- ResMgr.args, no bundle: " + JSON.stringify(args));
            this.loadByBundleAndArgs(resources, args);
          }
        } // ------------------------------------ 对外接口 begin
        ;

        _proto.instantiateAsync = /*#__PURE__*/function () {
          var _instantiateAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(prefabPath, parent) {
            var _this2 = this;

            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", new Promise(function (resolve) {
                    _this2.load(prefabPath, function (err, asset) {
                      if (err) {
                        LogUtil.E("--- instantiateAsync error, path: " + prefabPath + ", err:", err);
                        resolve(null);
                        return;
                      }

                      var go = instantiate(asset);
                      AssetTracker.trace(go, asset); // 资源计数追踪

                      if (parent) go.parent = parent;
                      resolve(go);
                    });
                  }));

                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function instantiateAsync(_x, _x2) {
            return _instantiateAsync.apply(this, arguments);
          }

          return instantiateAsync;
        }() // refGo 挂点, 最好是资源要依附的节点
        ;

        _proto.loadAssetAsync = /*#__PURE__*/function () {
          var _loadAssetAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(assetPath, type, refGo) {
            var _this3 = this;

            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", new Promise(function (resolve) {
                    _this3.loadAssetCb(assetPath, type, refGo, function (asset) {
                      resolve(asset);
                    });
                  }));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));

          function loadAssetAsync(_x3, _x4, _x5) {
            return _loadAssetAsync.apply(this, arguments);
          }

          return loadAssetAsync;
        }() // refGo 挂点, 最好是资源要依附的节点
        ;

        _proto.loadAssetCb = /*#__PURE__*/function () {
          var _loadAssetCb = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(assetPath, type, refGo, onComplete) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.load(assetPath, type, function (err, asset) {
                    if (err) {
                      LogUtil.E("--- loadAssetAsync error, path: " + assetPath + ", err:", err);
                      if (onComplete) onComplete(null);
                      return;
                    }

                    AssetTracker.trace(refGo, asset); // 资源计数追踪

                    if (onComplete) onComplete(asset);
                  });

                case 2:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));

          function loadAssetCb(_x6, _x7, _x8, _x9) {
            return _loadAssetCb.apply(this, arguments);
          }

          return loadAssetCb;
        }() // refGo 挂点, 最好是资源要依附的节点
        ;

        _proto.loadRemoteAsync = /*#__PURE__*/function () {
          var _loadRemoteAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(url, opts, refGo) {
            var _this4 = this;

            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", new Promise(function (resolve) {
                    _this4.loadRemote(url, opts, function (err, asset) {
                      if (err) {
                        LogUtil.E("--- loadRemoteAsync error, url: " + url + ", err:", err);
                        resolve(null);
                        return;
                      }

                      AssetTracker.trace(refGo, asset); // 资源计数追踪

                      resolve(asset);
                    });
                  }));

                case 1:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));

          function loadRemoteAsync(_x10, _x11, _x12) {
            return _loadRemoteAsync.apply(this, arguments);
          }

          return loadRemoteAsync;
        }() // refGo 挂点, 最好是资源要依附的节点
        ;

        _proto.loadDirAsync = /*#__PURE__*/function () {
          var _loadDirAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(dirPath, refGo) {
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", new Promise(function (resolve) {
                    ResMgr.Ins.loadDir(dirPath, function (err, arr) {
                      if (err) {
                        LogUtil.E("--- loadDirAsync error, dirPath: " + dirPath + ", err:", err);
                        resolve(null);
                        return;
                      }

                      arr.forEach(function (asset, idx, arr) {
                        AssetTracker.trace(refGo, asset); // 资源计数追踪
                      });
                      resolve(arr);
                    });
                  }));

                case 1:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));

          function loadDirAsync(_x13, _x14) {
            return _loadDirAsync.apply(this, arguments);
          }

          return loadDirAsync;
        }() // ------------------------------------ 对外接口 end
        ;

        _proto.dumpPath = function dumpPath(path) {
          LogUtil.D('--- dumpPath:', path);
          var bundleName = "resources";
          var bundle = assetManager.getBundle(bundleName);
          var asset01 = bundle.get(path); // LogUtil.D('--- asset01:', asset01)

          var uuid = asset01._uuid; // LogUtil.D('--- asset01 uuid:', uuid, "--- ref cnt:", asset01.refCount)

          this.dumpUuidRecur(uuid);
        };

        _proto.dumpUuidRecur = function dumpUuidRecur(uuid, depth) {
          var _this5 = this;

          if (depth === void 0) {
            depth = 1;
          }

          var pre = "---".repeat(depth);
          var asset01 = assetManager.assets.get(uuid);
          var uuids = assetManager.dependUtil.getDepsRecursively(uuid);
          LogUtil.D(pre + " dumpUuidRecur: " + uuid + ", refCnt: " + asset01.refCount + "\nasset:", asset01, "\nuuid:", uuids);
          uuids.forEach(function (uuid) {
            _this5.dumpUuidRecur(uuid, ++depth); // var asset03: any = assetManager.assets.get(uuid)!;
            // LogUtil.D(`---- dumpUuidRecur ref asset refCnt: ${uuid}, ref: ${asset03.refCount}`, asset03)

          });
        };

        return ResMgr;
      }());
      ResMgr.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SocketHelper.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('ESocketStatus', void 0);

      cclegacy._RF.push({}, "8e7caLQIx1JXaZ6B44gXBhl", "SocketHelper", undefined);

      var ESocketStatus;

      (function (ESocketStatus) {
        ESocketStatus[ESocketStatus["None"] = 0] = "None";
        ESocketStatus[ESocketStatus["Connecting"] = 1] = "Connecting";
        ESocketStatus[ESocketStatus["ConnectSucc"] = 2] = "ConnectSucc";
        ESocketStatus[ESocketStatus["ConnectFail"] = 3] = "ConnectFail";
        ESocketStatus[ESocketStatus["ConnectClose"] = 5] = "ConnectClose";
      })(ESocketStatus || (ESocketStatus = exports('ESocketStatus', {})));

      var SocketHelper = exports('SocketHelper', /*#__PURE__*/function () {
        function SocketHelper() {
          this._ws = null;
          this._status = ESocketStatus.None;

          this._onMsgFn = function (bts) {};

          this._onStatusFn = function (status) {};
        }

        var _proto = SocketHelper.prototype; // ---------------------- ws 回调 begin

        _proto.onClosed = function onClosed(ev) {
          this.onStatusChange(ESocketStatus.ConnectClose);
        };

        _proto.onError = function onError(ev) {
          // LogUtil.E("--- error occured, reason: {0}, Unknown Error: {1}\n", reason, errorMsg)
          this.onStatusChange(ESocketStatus.ConnectFail);
        };

        _proto.onMsg = function onMsg(ev) {
          this._onMsgFn(ev.data);
        };

        _proto.onOpen = function onOpen(ev) {
          this.onStatusChange(ESocketStatus.ConnectSucc);
        } // ---------------------- ws 回调 end
        ;

        _proto.onStatusChange = function onStatusChange(status) {
          this._status = status;

          this._onStatusFn(status);
        };

        _proto.clear = function clear() {
          if (this._ws != null) {
            this._ws.close();

            this._ws = null;
          }
        } // ---------------------- 必须实现的 对外接口
        ;

        _proto.connect = function connect(url, protocol) {
          this.clear();
          this.onStatusChange(ESocketStatus.Connecting);
          this._ws = new WebSocket(url);
          this._ws.binaryType = 'arraybuffer';
          this._ws.onopen = this.onOpen.bind(this);
          this._ws.onmessage = this.onMsg.bind(this);
          this._ws.onclose = this.onClosed.bind(this);
          this._ws.onerror = this.onError.bind(this);
        };

        _proto.sendMsg = function sendMsg(bts) {
          if (WebSocket.OPEN) {
            this._ws.send(bts);
          }
        };

        _proto.disconnect = function disconnect() {
          this.clear();
        };

        _proto.isConnected = function isConnected() {
          return this._ws != null && this._ws.readyState == WebSocket.OPEN;
        };

        _proto.getStatus = function getStatus() {
          return this._status;
        };

        _proto.regOnMsg = function regOnMsg(fn) {
          this._onMsgFn = fn;
        };

        _proto.regOnStatus = function regOnStatus(fn) {
          this._onStatusFn = fn;
        };

        _proto.destroy = function destroy() {
          this.clear();
          this._onMsgFn = null;
          this._onStatusFn = null;
        };

        return SocketHelper;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TimerMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, _decorator, Component, LogUtil;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      LogUtil = module.LogUtil;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "6060eT2NIBHUYglRm/JBUeo", "TimerMgr", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; // 参考: https://docs.cocos.com/creator/manual/zh/scripting/scheduler.html

      var TimerMgr = exports('TimerMgr', (_dec = ccclass('TimerMgr'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TimerMgr, _Component);

        function TimerMgr() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._autoId = 0;
          _this._timerMap = new Map();
          _this._updateMap = new Map();
          _this._intervalMap = new Map();
          _this._timeoutMap = new Map();
          return _this;
        }

        var _proto = TimerMgr.prototype;

        _proto.onLoad = function onLoad() {
          TimerMgr.Ins = this;
        };

        _proto.update = function update(dt) {
          this._updateMap.forEach(function (cb, key, m) {
            cb(dt);
          });
        };

        _proto.AddInterval = function AddInterval(cb, time) {
          var id = setInterval(cb, time);

          this._intervalMap.set(id, cb);

          return id;
        };

        _proto.removeInterval = function removeInterval(id) {
          var fn = this._intervalMap.get(id);

          if (fn) {
            clearInterval(id);

            this._intervalMap["delete"](id);
          }
        };

        _proto.Addtimeout = function Addtimeout(cb, time) {
          var id = setTimeout(cb, time);

          this._timeoutMap.set(id, cb);

          return id;
        };

        _proto.removeTimeout = function removeTimeout(id) {
          var fn = this._timeoutMap.get(id);

          if (fn) {
            clearTimeout(id);

            this._timeoutMap["delete"](id);
          }
        };

        _proto.AddTimer = function AddTimer(sec, cb, repeat, delay) {
          var id = "" + ++this._autoId;

          this._timerMap.set(id, cb);

          this.schedule(cb, sec, repeat, delay); // this.schedule(this.fn01, 1, 3, 5) // 5s 后开始执行 1 次, 重复 3 次, 共 4 次

          return id;
        };

        _proto.SetTimeout = function SetTimeout(sec, cb) {
          var _this2 = this;

          var id = this.AddTimer(sec, function () {
            _this2.RemoveTimer(id);

            cb();
          }); // this.scheduleOnce(wrapFn, sec) // 貌似无法移除, 所以不能使用

          return id;
        };

        _proto.RegUpdate = function RegUpdate(cb) {
          var id = "" + ++this._autoId;

          this._updateMap.set(id, cb);

          return id;
        };

        _proto.UnRegUpdate = function UnRegUpdate(id) {
          this._updateMap["delete"](id);
        };

        _proto.RemoveTimer = function RemoveTimer(id) {
          var fn = this._timerMap.get(id);

          if (fn) {
            this.unschedule(fn);

            this._timerMap["delete"](id);
          }
        };

        _proto.RemoveAll = function RemoveAll() {
          this.unscheduleAllCallbacks();

          this._timerMap.clear();
        };

        _proto.DebuDump = function DebuDump() {
          // LogUtil.D(`--- DebugDump, timerMap:`, this._timerMap)
          // LogUtil.D(`--- DebugDump, updateMap:`, this._updateMap)
          LogUtil.D("--- DebugDump, _intervalMap:", this._intervalMap);
          LogUtil.D("--- DebugDump, _timeoutMap:", this._timeoutMap);

          for (var _iterator = _createForOfIteratorHelperLoose(this._intervalMap.keys()), _step; !(_step = _iterator()).done;) {
            var key = _step.value;
            console.log("_intervalMap Key = ", key);
          }

          for (var _iterator2 = _createForOfIteratorHelperLoose(this._timeoutMap.keys()), _step2; !(_step2 = _iterator2()).done;) {
            var _key2 = _step2.value;
            console.log("_timeoutMap Key = ", _key2);
          }
        };

        _proto.removeAll = function removeAll() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this._intervalMap.keys()), _step3; !(_step3 = _iterator3()).done;) {
            var key = _step3.value;
            clearInterval(key);
          }

          for (var _iterator4 = _createForOfIteratorHelperLoose(this._timeoutMap.keys()), _step4; !(_step4 = _iterator4()).done;) {
            var _key3 = _step4.value;
            clearTimeout(_key3);
          }
        };

        return TimerMgr;
      }(Component), _class2.Ins = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TipsMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogUtil.ts', './EnumUI.ts', './PnlComTextTips.ts', './UIPnlComWinTipsLogic.ts', './PnlWaittingLogic.ts', './UIMgr.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, isValid, Component, LogUtil, EnumUI, PnlComTextTips, UIPnlComWinTipsLogic, PnlWaittingLogic, UIMgr, ECanvas;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      isValid = module.isValid;
      Component = module.Component;
    }, function (module) {
      LogUtil = module.LogUtil;
    }, function (module) {
      EnumUI = module.EnumUI;
    }, function (module) {
      PnlComTextTips = module.PnlComTextTips;
    }, function (module) {
      UIPnlComWinTipsLogic = module.UIPnlComWinTipsLogic;
    }, function (module) {
      PnlWaittingLogic = module.PnlWaittingLogic;
    }, function (module) {
      UIMgr = module.UIMgr;
      ECanvas = module.ECanvas;
    }],
    execute: function () {
      cclegacy._RF.push({}, "28217++9kdPz4wtQbcYtKCm", "TipsMgr", undefined);

      var TipsManager = exports('TipsManager', /*#__PURE__*/function (_Component) {
        _inheritsLoose(TipsManager, _Component);

        function TipsManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._creatingWaitUI = false;
          _this._closingWaitUI = false;
          _this._waitUI = null;
          return _this;
        }

        var _proto = TipsManager.prototype;
        /** 创建网络不稳定提示 */

        _proto.CreateWaitting = /*#__PURE__*/function () {
          var _CreateWaitting = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var canvasTrans;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (UIMgr.Ins.GetLogicIns(EnumUI.Waitting)) {
                    _context.next = 7;
                    break;
                  }

                  canvasTrans = UIMgr.Ins.GetCanvasNode(ECanvas.LayerTop);
                  _context.next = 4;
                  return UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Waitting, PnlWaittingLogic, canvasTrans);

                case 4:
                  this._waitUI = _context.sent; // 创建期间被关了

                  this._waitUI.Hide();

                  LogUtil.D("创建成功this._waitUI");

                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function CreateWaitting() {
            return _CreateWaitting.apply(this, arguments);
          }

          return CreateWaitting;
        }();

        _proto.HideWaittingUI = function HideWaittingUI() {
          if (isValid(this._waitUI)) {
            this._waitUI.Hide();
          }
        };

        _proto.ShowWaittingUI = function ShowWaittingUI() {
          if (this._closingWaitUI) return;

          if (isValid(this._waitUI)) {
            this._waitUI.Show();

            this._closingWaitUI = false;
          }
        }
        /** 转菊花, 默认十五秒后关闭 
         * @param time 时长
         * @param delay 延时
        */
        ;

        _proto.ShowWaitting = /*#__PURE__*/function () {
          var _ShowWaitting = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(time, delay) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.unschedule(this.HideWaittingUI);
                  this.unschedule(this.ShowWaittingUI);
                  if (!time) time = 15; // 设定延时，取消也会相应延后

                  if (delay) {
                    time += delay;
                  }

                  if (!isValid(this._waitUI)) {
                    _context2.next = 11;
                    break;
                  }

                  this._closingWaitUI = false;
                  this.schedule(this.HideWaittingUI, time, 0);
                  this.schedule(this.ShowWaittingUI, delay, 0);
                  return _context2.abrupt("return");

                case 11:
                  this._creatingWaitUI = true;
                  this._closingWaitUI = false;
                  _context2.next = 15;
                  return this.CreateWaitting();

                case 15:
                  this._creatingWaitUI = false;
                  this.schedule(this.HideWaittingUI, time, 0);
                  this.schedule(this.ShowWaittingUI, delay, 0);

                case 18:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function ShowWaitting(_x, _x2) {
            return _ShowWaitting.apply(this, arguments);
          }

          return ShowWaitting;
        }()
        /** 网络恢复 */
        ;

        _proto.CloseWaitting = function CloseWaitting() {
          this._closingWaitUI = true;
          this.unschedule(this.ShowWaittingUI);
          this.unschedule(this.HideWaittingUI);
          this.HideWaittingUI();
        }
        /**
         * 飘字提示
         * @param content 文本内容
         */
        ;

        _proto.ShowTextTips = /*#__PURE__*/function () {
          var _ShowTextTips = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(content) {
            var canvasTrans, tipsIns;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (content) {
                    _context3.next = 2;
                    break;
                  }

                  return _context3.abrupt("return");

                case 2:
                  canvasTrans = UIMgr.Ins.GetCanvasNode(ECanvas.LayerTop);
                  _context3.next = 5;
                  return UIMgr.Ins.CreateWindowAutoAsync(PnlComTextTips, canvasTrans);

                case 5:
                  tipsIns = _context3.sent;
                  tipsIns.SetContent(content);

                case 7:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));

          function ShowTextTips(_x3) {
            return _ShowTextTips.apply(this, arguments);
          }

          return ShowTextTips;
        }()
        /**
         * 公共弹窗
         */
        ;

        _proto.OpenNormalTips = function OpenNormalTips(data) {
          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve) {
            var operate, cbFunc, tipsIns, canvasTrans, logicIns;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  operate = {
                    title: data.title ? data.title : "",
                    msg: data.msg,
                    okTxt: data.okTxt ? data.okTxt : "OK",
                    noTxt: data.noTxt ? data.noTxt : "No",
                    hideNo: data.hideNo ? data.hideNo : false
                  };

                  cbFunc = function cbFunc(result) {
                    resolve(result);
                  };

                  tipsIns = UIMgr.Ins.GetLogicIns(EnumUI.NormalTips);

                  if (tipsIns) {
                    _context4.next = 11;
                    break;
                  }

                  canvasTrans = UIMgr.Ins.GetCanvasNode(ECanvas.LayerTop);
                  _context4.next = 7;
                  return UIMgr.Ins.CreateWindowCustomAsync(EnumUI.NormalTips, UIPnlComWinTipsLogic, canvasTrans);

                case 7:
                  logicIns = _context4.sent;
                  logicIns.SetData(operate, cbFunc);
                  _context4.next = 12;
                  break;

                case 11:
                  tipsIns.SetData(operate, cbFunc);

                case 12:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          })));
        };

        return TipsManager;
      }(Component));
      TipsManager.Ins = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Tool.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResMgr.ts'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, director, Node, Button, sys, native, path, Label, resources, SpriteFrame, Sprite, assetManager, Texture2D, UIOpacity, Font, ResMgr;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      Node = module.Node;
      Button = module.Button;
      sys = module.sys;
      native = module.native;
      path = module.path;
      Label = module.Label;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      assetManager = module.assetManager;
      Texture2D = module.Texture2D;
      UIOpacity = module.UIOpacity;
      Font = module.Font;
    }, function (module) {
      ResMgr = module.ResMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "510401L5StFiZyQMS9GW2Fm", "Tool", undefined); // import { status,behavior,dezhouData } from '../../logic/ui/insideTheGame/UIPnlInsideTheGame/dezhouData';


      var Tool = exports('Tool', /*#__PURE__*/function () {
        function Tool() {} // 只获取子节点


        Tool.GetChildRecursive = function GetChildRecursive(node, name) {
          for (var index = 0; index < node.children.length; index++) {
            var child = node.children[index];
            var go = Tool.GetChildOrSelfRecursive(child, name);
            if (go) return go;
          }

          return null;
        } // 获取 本身 or 子节点
        ;

        Tool.GetChildOrSelfRecursive = function GetChildOrSelfRecursive(node, name) {
          if (node.name == name) return node; // node.getChildByName() // 不能递归查找

          for (var index = 0; index < node.children.length; index++) {
            var child = node.children[index];
            var go = Tool.GetChildOrSelfRecursive(child, name);
            if (go) return go;
          }

          return null;
        };

        Tool.GetRootNode = function GetRootNode(name) {
          return director.getScene().getChildByPath(name);
        };

        Tool.InstantiateAsync = /*#__PURE__*/function () {
          var _InstantiateAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(prefabPath, parent) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return ResMgr.Ins.instantiateAsync(prefabPath, parent);

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));

          function InstantiateAsync(_x, _x2) {
            return _InstantiateAsync.apply(this, arguments);
          }

          return InstantiateAsync;
        }();

        Tool.DontDestroyOnLoad = function DontDestroyOnLoad(node) {
          director.addPersistRootNode(node);
        };

        Tool.Destroy = function Destroy(node) {
          node.destroy();
        }
        /**
         * 从resources/ui下加载一个图片资源
         * @param path        资源相对于resources/ui的路径
         * @param onComplete    加载完成回调
         */
        ;

        Tool.GetUISpriteByPath = function GetUISpriteByPath(path, type, refGo, onComplete) {
          var finalPath = "ui/Atlas/" + path + "/spriteFrame"; // LogUtil.D("--- zgs path: ", finalPath)

          ResMgr.Ins.loadAssetCb(finalPath, type, refGo, function (atlas) {
            if (onComplete) onComplete(atlas);
          });
        } // 添加点击
        ;

        Tool.AddClick = function AddClick(obj, callBackFun, target, index) {
          var button, node;

          if (obj instanceof Node) {
            node = obj;
            button = node.getComponent(Button);
            if (button == null) button = node.addComponent(Button);
          } else if (obj instanceof Button) {
            node = obj.node;
            button = obj;
          }

          if (button == null) return;
          node.index = button.index = index;
          callBackFun && node.on(Button.EventType.CLICK, callBackFun, target);
          return button;
        };

        Tool.RemoveClick = function RemoveClick(obj, callBackFun, target) {
          var node = null;

          if (obj instanceof Node) {
            node = obj;
          } else if (obj instanceof Button) {
            node = obj.node;
          }

          if (node == null) return;
          node.off(Button.EventType.CLICK, callBackFun, target);
        };

        Tool.Join = function Join() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return args.map(function (val, idx, arr) {
            return val.replace(/(\/*$)/g, "");
          }).join("/");
        };

        Tool.IsMobile = function IsMobile() {
          return sys.platform == sys.Platform.ANDROID || sys.platform == sys.Platform.IOS;
        } // 读取包内资源路径, android 的 assets, ios 的 Data/Raw, 等价于 unity 中的 Application.streamingAssetsPath
        ;

        Tool.readStreamAssetsBts = function readStreamAssetsBts(relaPath) {
          if (Tool.IsMobile()) {
            return native.fileUtils.getDataFromFile(native.fileUtils.fullPathForFilename(relaPath));
          } else {
            return null;
          }
        };

        Tool.readStreamAssetsStr = function readStreamAssetsStr(relaPath) {
          var bts = Tool.readStreamAssetsBts(relaPath);
          return bts != null ? new TextDecoder().decode(new Uint8Array(bts)) : "";
        };

        Tool.writeFileStr = function writeFileStr(fullPath, txt) {
          if (!Tool.IsMobile()) return false;
          var dirPath = path.dirname(fullPath);

          if (!native.fileUtils.isDirectoryExist(dirPath)) {
            native.fileUtils.createDirectory(dirPath);
          }

          native.fileUtils.writeStringToFile(txt, fullPath);
        }
        /**
         * 修改按钮标题
         * @param btn {Button | Node} 按钮或结点
         * @param v {string} 修改值
         */
        ;

        Tool.SetBtnLabel = function SetBtnLabel(btn, v) {
          if (btn instanceof Button) {
            btn = btn.node;
          }

          var labTitle = btn.getComponentInChildren(Label);
          labTitle && (labTitle.string = v);
        }
        /**
         * 按钮可点击性行为修改
         * @param btn {Button | Node} 按钮或结点
         * @param v {NBoolean} 修改值
         */
        ;

        Tool.ChangeEnabled = function ChangeEnabled(btn, v) {
          if (v === void 0) {
            v = null;
          }

          if (btn instanceof Node) {
            btn = btn.getComponent(Button);
          }

          if (btn) {
            if (typeof v == 'boolean') {
              btn.interactable = v;
            } else {
              btn.interactable = !btn.interactable;
            }
          }
        }
        /**
         * 将Long转换成number
         * @param value 值
         */
        // public static GetNumberFromLong(value: number | Long) {
        //     if (typeof (value) == "number") return value
        //     if (value == null || value.unsigned) return 0
        //     return value.low
        // }

        /*
        * 字符串加密
        */
        ;

        Tool.encryptString = function encryptString(str, key) {
          var result = "";

          for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
          }

          return result;
        };

        Tool.decryptString = function decryptString(str, key) {
          var result = "";

          for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
          }

          return result;
        }
        /** 
         * 类似于Lua中format.string
        */
        ;

        Tool.formatString = function formatString(str) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return str.replace(/\{(\d+)\}/g, function (match, index) {
            return typeof args[index] !== "undefined" ? args[index] : match;
          });
        }
        /**
         * 服务器传过来的数值都需要除以100
         */
        ;

        Tool.strNumStr = function strNumStr(str) {
          return (Number(str) / 100).toString();
        }
        /**
         * 发给服务器的数值需要乘以100
         */
        ;

        Tool.numStrnum = function numStrnum(str) {
          return (Number(str) * 100).toString();
        }
        /**
         * 筹码分类
         * @param num 
         * @returns 
         */
        // public static chipNum(num:number){
        //     let value = num;
        //     let img = [0,0,0,0,0,0,0,0,0,0];
        //     let imgNum = [];
        //     let chip = [100000,50000,10000,5000,2000,500,100,25,5,1]
        //     for (let i = 0;i<chip.length;i++){
        //         img[i] = Math.trunc(value / chip[i]);
        //         for(let j=0;j<img[i];j++){
        //             imgNum.push(chip[i]);
        //         }
        //         value = value % chip[i];
        //     }
        //     return imgNum;
        // }
        ;

        Tool.chipNum = function chipNum(num) {
          var value = num;
          var img = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var imgNum = [];
          var chip = [1400000, 50000, 10000, 5000, 2000, 500, 100, 25, 5, 1];

          if (value > 1400000) {
            img[0] = 1;
            imgNum.push(1400000);
            value = 0;
          } else {
            img[0] = 0;
          }

          for (var i = 1; i < chip.length; i++) {
            img[i] = Math.trunc(value / chip[i]);

            for (var j = 0; j < img[i]; j++) {
              imgNum.push(chip[i]);
            }

            value = value % chip[i];
          }

          if (imgNum.length > 28) {
            imgNum = imgNum.slice(0, 28);
          }

          return imgNum;
        }
        /**
         *设置精灵图片
         * @param node 
         * @param path 本地路径
         */
        ;

        Tool.setImgSprite = function setImgSprite(node, path) {
          resources.load("ui/Atlas/" + path + "/spriteFrame", SpriteFrame, function (err, spriteFrame) {
            if (err) {
              console.error('Failed to load sprite image:', err);
              return;
            } // 设置精灵图片


            if (node && node.getComponent(Sprite)) {
              node.getComponent(Sprite).spriteFrame = spriteFrame;
            } else {
              console.log("不存在图片");
              return;
            }
          });
        }
        /**
         * 加载远程url图片
         * @param node 
         * @param url 
         */
        ;

        Tool.setImgUrlSprite = function setImgUrlSprite(node, url) {
          assetManager.loadRemote(url, function (err, imageAsset) {
            var spriteFrame = new SpriteFrame();
            var texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            node.getComponent(Sprite).spriteFrame = spriteFrame;
          });
        }
        /**
         *设置文字
         * @param node 
         * @param path 本地路径
         * @param [opacityNum=255] 
         */
        ;

        Tool.setLabelFont = function setLabelFont(node, path, opacity) {
          if (opacity === void 0) {
            opacity = 255;
          }

          node.getComponent(UIOpacity).opacity = opacity;
          resources.load("ui/Fonts/" + path, Font, function (err, font) {
            if (err) {
              console.error('Failed to load font:', err);
              return;
            } else {
              node.getComponent(Label).font = font;
            }
          });
        }
        /**
         * 列表中的最大值及最大值的数量
         */
        ;

        Tool.findMaxAndCount = function findMaxAndCount(arr) {
          if (arr.length === 0) {
            throw new Error("列表为空");
          }

          var max = arr[0].Rate;
          var pos = arr[0].Pos;
          var rate = arr[0].Rate;
          var count = 1;

          for (var i = 1; i < arr.length; i++) {
            if (arr[i].Rate > max) {
              max = arr[i].Rate;
              count = 1;
              pos = arr[i].Pos;
              rate = arr[0].Rate;
            } else if (arr[i].Rate === max) {
              count++;
            }
          }

          return {
            pos: pos,
            count: count,
            rate: rate
          };
        }
        /**
         * 图片点击状态图片切换
         * @param nodeArr 节点列表
         * @param clickedSprite 点击的节点
         * @param path 图片路径
         */
        ;

        Tool.statusPictureToggle = function statusPictureToggle(nodeArr, clickedSprite, path) {
          for (var _iterator = _createForOfIteratorHelperLoose(nodeArr), _step; !(_step = _iterator()).done;) {
            var sprite = _step.value;

            if (sprite === clickedSprite) {
              Tool.setImgSprite(sprite, path + sprite.name + "_1");
            } else {
              Tool.setImgSprite(sprite, path + sprite.name + "_0");
            }
          }
        };

        Tool.statusPictureToggleList = function statusPictureToggleList(nodeArr, clickedSprite, path) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(nodeArr), _step2; !(_step2 = _iterator2()).done;) {
            var sprite = _step2.value;

            if (sprite === clickedSprite) {
              Tool.setImgSprite(sprite, path + "_1");
            } else {
              Tool.setImgSprite(sprite, path + "_0");
            }
          }
        };

        return Tool;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIBaseLogic.ts", ['cc', './UIMgr.ts'], function (exports) {
  'use strict';

  var cclegacy, Button, Tween, UIMgr;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Button = module.Button;
      Tween = module.Tween;
    }, function (module) {
      UIMgr = module.UIMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "53b1ba/pv5Dq6bu5zJ82T6u", "UIBaseLogic", undefined);

      var UIBaseLogic = exports('UIBaseLogic', /*#__PURE__*/function () {
        function UIBaseLogic() {
          this.id = void 0;
          this.rootGo = void 0;
          this.isShow = void 0;
          this.insName = void 0;
        }

        var _proto = UIBaseLogic.prototype;

        _proto.Init = function Init(id, go) {
          this.id = id;
          this.rootGo = go;
          this.isShow = false;
          this.BindUIEvent();
        };

        _proto.BindUIEvent = function BindUIEvent() {};

        _proto.BindUIEventClick = function BindUIEventClick(go, fn) {
          go.on(Button.EventType.CLICK, fn, this);
        };

        _proto.OnCreate = function OnCreate() {};

        _proto.Show = function Show() {
          this.isShow = true;
          this.SetActive(true);
        };

        _proto.Hide = function Hide() {
          this.isShow = false;
          this.SetActive(false);
        };

        _proto.SetActive = function SetActive(isActive) {
          this.rootGo.active = isActive;
        };

        _proto.SetParentTran = function SetParentTran(parent, keepWorldTransform) {
          if (keepWorldTransform === void 0) {
            keepWorldTransform = false;
          }

          this.rootGo.setParent(parent, keepWorldTransform);
        };

        _proto.SetPos = function SetPos(pos) {
          this.rootGo.setPosition(pos);
        };

        _proto.GetPos = function GetPos() {
          return this.rootGo.getPosition();
        };

        _proto.GetParent = function GetParent() {
          return this.rootGo.parent;
        };

        _proto.ShowSwitch = function ShowSwitch(isShow) {
          if (this.isShow == isShow) return;
          this.isShow = isShow;
        } // 播放出现动画
        ;

        _proto.ShowAnim = function ShowAnim(node, origin, strength, dur) {
          UIMgr.Ins.Ripple(node, origin, strength, dur);
        } // 播放隐藏动画
        ;

        _proto.HideAnim = function HideAnim(node, callback, dst, strength, dur) {
          UIMgr.Ins.RippleOut(node, callback, dst, strength, dur);
        };

        _proto.Destroy = function Destroy() {
          UIMgr.Ins.DestroyWindow(this.id, false);
        };

        _proto.OnDestroy = function OnDestroy() {
          this.isShow = false;
        } // ----------- 通用方法
        // public BindUIEventClick(GameObject go, DlgDefine.VoidDelegate handler) {
        //     UIEventListener.Get(go).onClick = handler;
        // }
        // 不允许调用
        ;

        _proto.DestroyInner = function DestroyInner() {
          // UIEventListener.Clear(rootGo);
          if (this.rootGo) {
            this.OnDestroy();
            Tween.stopAllByTarget(this.rootGo);
            this.rootGo.destroy();
            this.rootGo = null;
          }
        };

        return UIBaseLogic;
      }());
      UIBaseLogic.prefabPath = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Tool.ts', './LogUtil.ts', './TimerMgr.ts'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, tween, Vec3, UIOpacity, Tween, Camera, Tool, LogUtil, TimerMgr;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Vec3 = module.Vec3;
      UIOpacity = module.UIOpacity;
      Tween = module.Tween;
      Camera = module.Camera;
    }, function (module) {
      Tool = module.Tool;
    }, function (module) {
      LogUtil = module.LogUtil;
    }, function (module) {
      TimerMgr = module.TimerMgr;
    }],
    execute: function () {
      exports('ECanvas', void 0);

      cclegacy._RF.push({}, "87f249hHIRLS5Nn/W0q2+rK", "UIMgr", undefined);

      var UIMgr = exports('UIMgr', /*#__PURE__*/function () {
        function UIMgr() {
          this._uiRootObj = void 0;
          this._uiCamera = void 0;
          this._uiSEffectCanvasObj = void 0;
          this._uiMainCanvasObj = void 0;
          this._uiTopCanvasObj = void 0;
          this._uiMsgCanvasObj = void 0;
          this._uiGodCanvasObj = void 0;
          this._autoId = 0;
          this._logicInsList = new Map();
        }

        var _proto = UIMgr.prototype;

        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this._uiRootObj = Tool.GetRootNode("ui_root_ex");
                  Tool.DontDestroyOnLoad(this._uiRootObj);
                  this._uiCamera = Tool.GetChildRecursive(this._uiRootObj, "ui_camera").getComponent(Camera);
                  this._uiSEffectCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "scene_effect_canvas");
                  this._uiMainCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "main_canvas");
                  this._uiTopCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "top_canvas");
                  this._uiMsgCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "msg_canvas");
                  this._uiGodCanvasObj = Tool.GetChildRecursive(this._uiRootObj, "god_canvas");

                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function start() {
            return _start.apply(this, arguments);
          }

          return start;
        }() // ------------- 异步加载 ui begin -------------
        ;

        _proto.CreateWindowAsync = /*#__PURE__*/function () {
          var _CreateWindowAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, cls, parent) {
            var prefabPath, go, ins;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  prefabPath = cls.prefabPath;
                  _context2.next = 3;
                  return Tool.InstantiateAsync(prefabPath);

                case 3:
                  go = _context2.sent;
                  if (!parent) parent = this.GetCanvasNode(ECanvas.LayerMain);
                  ins = new cls();
                  ins.Init(id, go);
                  this.AddLogicIns(id, ins);
                  ins.OnCreate();
                  ins.SetParentTran(parent);
                  ins.ShowSwitch(true);
                  return _context2.abrupt("return", ins);

                case 12:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function CreateWindowAsync(_x, _x2, _x3) {
            return _CreateWindowAsync.apply(this, arguments);
          }

          return CreateWindowAsync;
        }();

        _proto.CreateWindowCustomAsync = /*#__PURE__*/function () {
          var _CreateWindowCustomAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(customId, cls, parent) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.CreateWindowAsync(customId, cls, parent);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));

          function CreateWindowCustomAsync(_x4, _x5, _x6) {
            return _CreateWindowCustomAsync.apply(this, arguments);
          }

          return CreateWindowCustomAsync;
        }();

        _proto.CreateWindowAutoAsync = /*#__PURE__*/function () {
          var _CreateWindowAutoAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(cls, parent) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.CreateWindowAsync(this.GenerateId(), cls, parent);

                case 2:
                  return _context4.abrupt("return", _context4.sent);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));

          function CreateWindowAutoAsync(_x7, _x8) {
            return _CreateWindowAutoAsync.apply(this, arguments);
          }

          return CreateWindowAutoAsync;
        }() // ------------- 异步加载 ui end -------------
        ;

        _proto.DestroyWindow = function DestroyWindow(id, isDelay) {
          var _this = this;

          if (isDelay === void 0) {
            isDelay = false;
          }

          var ins = this._logicInsList.get(id);

          if (!ins) return;

          if (isDelay) {
            // TODO: web aaa
            TimerMgr.Ins.SetTimeout(0, function () {
              ins.DestroyInner();

              _this._logicInsList["delete"](id);
            });
          } else {
            ins.DestroyInner();

            this._logicInsList["delete"](id);
          }
        };

        _proto.Clear = function Clear() {
          var _this2 = this;

          var arr = Array.from(this._logicInsList.keys());
          arr.forEach(function (id, index, arr) {
            _this2.DestroyWindow(id, false);
          });

          this._logicInsList.clear();
        };

        _proto.AddLogicIns = function AddLogicIns(id, ins) {
          LogUtil.A(!this._logicInsList.get(id), "--- already exist ins id: " + id);

          this._logicInsList.set(id, ins);
        };

        _proto.GetLogicIns = function GetLogicIns(id) {
          return this._logicInsList.get(id);
        };

        _proto.GetLogicNameIns = function GetLogicNameIns(id) {
          for (var _iterator = _createForOfIteratorHelperLoose(this._logicInsList), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
                key = _step$value[0],
                value = _step$value[1];

            if (value.insName == id) {
              return this._logicInsList.get(key);
            }
          }
        };

        _proto.GenerateId = function GenerateId() {
          return "" + ++this._autoId;
        };

        _proto.GetCanvasNode = function GetCanvasNode(layer) {
          if (layer == ECanvas.LayerSceneEffect) return this._uiSEffectCanvasObj;else if (layer == ECanvas.LayerMain) return this._uiMainCanvasObj;else if (layer == ECanvas.LayerTop) return this._uiTopCanvasObj;else if (layer == ECanvas.LayerMsg) return this._uiMsgCanvasObj;else if (layer == ECanvas.LayerGod) return this._uiGodCanvasObj;else {
            LogUtil.A(false, "--- no found layer:{0}", layer);
            return this._uiMainCanvasObj;
          }
        };

        _proto.GetUIRootGo = function GetUIRootGo() {
          return this._uiRootObj;
        };

        _proto.GetUICamera = function GetUICamera() {
          return this._uiCamera;
        }
        /**
         * 波动效果(小幅缩放)
         * @param node {Node} 节点
         * @param origin {number} 初始比例
         * @param strength {number} 强度
         * @param dur {number} 时长
         */
        ;

        _proto.Ripple = function Ripple(node, origin, strength, dur) {
          if (!node) return;
          origin || (origin = 0.1);
          strength || (strength = 1.1);
          dur || (dur = 0.2);
          var sx1 = node.scale.x * strength;
          var sx2 = node.scale.x * 1;
          var sy1 = node.scale.y * strength;
          var sy2 = node.scale.y * 1;
          var sz1 = node.scale.z * strength;
          var sz2 = node.scale.z * 1;
          setTimeout(function () {
            tween(node).call(function () {
              node.setScale(origin, origin, 1);
            }).to(dur, {
              scale: new Vec3(sx1, sy1, sz1)
            }).to(dur / 2, {
              scale: new Vec3(sx2, sy2, sz2)
            }).start();
          });
        }
        /**
         * 缩放渐隐
         * @param node {Node} 节点
         * @param callback {Function} 动画结束回调函数
         * @param dst {number} 最终比例
         * @param strength {number} 强度
         * @param dur {number} 时长
         */
        ;

        _proto.RippleOut = function RippleOut(node, callback, dst, strength, dur) {
          if (!node) return;
          dst || (dst = 0.6);
          strength || (strength = 1.05);
          dur || (dur = 0.14);
          var sx1 = node.scale.x * strength;
          var sx2 = node.scale.x * dst;
          var sy1 = node.scale.y * strength;
          var sy2 = node.scale.y * dst;
          var sz1 = node.scale.z * strength;
          var sz2 = node.scale.z * dst;
          tween(node).to(dur / 2, {
            scale: new Vec3(sx1, sy1, sz1)
          }).to(dur, {
            scale: new Vec3(sx2, sy2, sz2)
          }).call(function () {
            if (typeof callback === 'function') {
              callback();
            }
          }).start();
          if (!node.getComponent(UIOpacity)) node.addComponent(UIOpacity);
          tween(node.getComponent(UIOpacity)).delay(dur / 2).to(dur, {
            opacity: 0
          }).start();
        }
        /**
         * 摇晃
         * @param node         Node        结点
         * @param enable       boolean     动作停止或启动
         * @param duration     number      时长（晃动时间）
         * @param strength     number      强度（晃动角度
         */
        ;

        _proto.Rock = function Rock(node, enable, duration, strength) {
          if (enable === void 0) {
            enable = true;
          }

          if (duration === void 0) {
            duration = 5;
          }

          if (strength === void 0) {
            strength = 25;
          }

          if (!node) return;

          if (enable) {
            Tween.stopAllByTarget(node);
            node.angle = strength;
            tween(node).to(duration, {
              angle: -strength
            }).to(duration, {
              angle: strength
            }).union().repeatForever().start();
          } else {
            Tween.stopAllByTarget(node);
            node.angle = strength;
          }
        };

        _proto.Destroy = function Destroy() {
          this.Clear();

          if (this._uiRootObj) {
            this._uiRootObj.destroy();

            this._uiRootObj = null;
          }
        };

        _proto.DebugDump = function DebugDump() {
          LogUtil.D("--- this._logicInsList:", this._logicInsList);
        };

        return UIMgr;
      }());
      UIMgr.Ins = void 0;
      var ECanvas;

      (function (ECanvas) {
        ECanvas[ECanvas["LayerSceneEffect"] = 1] = "LayerSceneEffect";
        ECanvas[ECanvas["LayerMain"] = 3] = "LayerMain";
        ECanvas[ECanvas["LayerTop"] = 4] = "LayerTop";
        ECanvas[ECanvas["LayerMsg"] = 6] = "LayerMsg";
        ECanvas[ECanvas["LayerGod"] = 7] = "LayerGod";
      })(ECanvas || (ECanvas = exports('ECanvas', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlComWinTipsLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIPnlComWinTipsView.ts', './UIBaseLogic.ts', './Tool.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, UIPnlComWinTipsView, UIBaseLogic, Tool;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      UIPnlComWinTipsView = module.UIPnlComWinTipsView;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }, function (module) {
      Tool = module.Tool;
    }],
    execute: function () {
      cclegacy._RF.push({}, "12eace7tHRMIKf8wl8pU7FM", "UIPnlComWinTipsLogic", undefined);

      var UIPnlComWinTipsLogic = exports('UIPnlComWinTipsLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(UIPnlComWinTipsLogic, _UIBaseLogic);

        function UIPnlComWinTipsLogic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._view = void 0;
          _this._callback = void 0;
          return _this;
        }

        var _proto = UIPnlComWinTipsLogic.prototype;

        _proto.Init = function Init(id, go) {
          this._view = new UIPnlComWinTipsView(go);

          _UIBaseLogic.prototype.Init.call(this, id, go);
        };

        _proto.OnCreate = function OnCreate() {
          this.ShowAnim(this._view._Nego_root);
        };

        _proto.BindUIEvent = function BindUIEvent() {
          this.BindUIEventClick(this._view._Btn_Ok.node, this.HandlerBtnOk);
          this.BindUIEventClick(this._view._Btn_Cancel.node, this.HandlerBtnCancel);
        };

        _proto.SetData = function SetData(data, callback) {
          if (!data) return;

          if (data.title) {
            this._view._TextC_title.string = data.title;
            this._view._TextC_title.node.active = true;
          } else {
            this._view._TextC_title.node.active = false;
          }

          if (data.msg) {
            this._view._TextC_content.string = data.msg;
          }

          if (data.hideNo) {
            this._view._Btn_Cancel.node.active = false;
          } else {
            this._view._Btn_Cancel.node.active = true;
          }

          if (data.okTxt) {
            Tool.SetBtnLabel(this._view._Btn_Ok, data.okTxt);
          }

          if (data.noTxt) {
            Tool.SetBtnLabel(this._view._Btn_Cancel, data.noTxt);
          }

          this._callback = callback;
        };

        _proto.HandlerBtnOk = function HandlerBtnOk() {
          this._callback && this._callback(true);
          this.DestroyAnim();
        };

        _proto.HandlerBtnCancel = function HandlerBtnCancel() {
          this._callback && this._callback(false);
          this.DestroyAnim();
        };

        _proto.DestroyAnim = function DestroyAnim() {
          this.HideAnim(this._view._Nego_root, this.Destroy.bind(this));
          this.Destroy();
        };

        return UIPnlComWinTipsLogic;
      }(UIBaseLogic));
      UIPnlComWinTipsLogic.prefabPath = "/prefab/ui/tips/PnlComWinTips";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlComWinTipsView.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Label, Button;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Button = module.Button;
    }],
    execute: function () {
      cclegacy._RF.push({}, "08d58mOsWNJM46ZTMwVessi", "UIPnlComWinTipsView", undefined);

      var UIPnlComWinTipsView = exports('UIPnlComWinTipsView', function UIPnlComWinTipsView(go) {
        this._root = void 0;
        this._Nego_root = void 0;
        this._TextC_title = void 0;
        this._TextC_content = void 0;
        this._Btn_Cancel = void 0;
        this._TextC_cancel = void 0;
        this._Btn_Ok = void 0;
        this._TextC_ok = void 0;
        this._root = go;
        this._Nego_root = go.getChildByPath('Nego_root');
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label);
        this._TextC_content = go.getChildByPath('Nego_root/TextC_content').getComponent(Label);
        this._Btn_Cancel = go.getChildByPath('Nego_root/Group/Btn_Cancel').getComponent(Button);
        this._TextC_cancel = go.getChildByPath('Nego_root/Group/Btn_Cancel/TextC_cancel').getComponent(Label);
        this._Btn_Ok = go.getChildByPath('Nego_root/Group/Btn_Ok').getComponent(Button);
        this._TextC_ok = go.getChildByPath('Nego_root/Group/Btn_Ok/TextC_ok').getComponent(Label);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlErrorTipLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIPnlErrorTipView.ts', './UIBaseLogic.ts', './Lang.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, UIPnlErrorTipView, UIBaseLogic, Lang;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      UIPnlErrorTipView = module.UIPnlErrorTipView;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }, function (module) {
      Lang = module.Lang;
    }],
    execute: function () {
      cclegacy._RF.push({}, "056adZphSpFW7x4reegnPz9", "UIPnlErrorTipLogic", undefined); // import { UIPnlGameHallLogic } from "../../../ui/gameHall/UIPnlGameHall/UIPnlGameHallLogic"


      var ccclass = _decorator.ccclass;
      var UIPnlErrorTipLogic = exports('UIPnlErrorTipLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(UIPnlErrorTipLogic, _UIBaseLogic);

        function UIPnlErrorTipLogic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._view = void 0;
          _this.scene = void 0;
          _this.errorCode = void 0;
          return _this;
        }

        var _proto = UIPnlErrorTipLogic.prototype;

        _proto.Init = function Init(id, go) {
          this._view = new UIPnlErrorTipView(go);

          _UIBaseLogic.prototype.Init.call(this, id, go); // --------- your code

        };

        _proto.setData = function setData(scene, code) {
          this.scene = scene;
          this.errorCode = "Error_" + code;
          this.initView();
        };

        _proto.BindUIEvent = function BindUIEvent() {
          this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back);
        };

        _proto.HandlerBtn_back = /*#__PURE__*/function () {
          var _HandlerBtn_back = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // let logicIns: UIPnlGameHallLogic = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.GameHall, UIPnlGameHallLogic);
                  this.scene.Destroy();
                  this.Destroy();

                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function HandlerBtn_back() {
            return _HandlerBtn_back.apply(this, arguments);
          }

          return HandlerBtn_back;
        }();

        _proto.initView = function initView() {
          this._view._TextC_illustrate.string = Lang.getText("Label_label83");
          this._view._TextC_title1.string = Lang.getText("Label_label84");
          this._view._TextC_title2.string = Lang.getText(this.errorCode);

          this._view._Btn_back.node.getChildByName("btn_label1");
        };

        return UIPnlErrorTipLogic;
      }(UIBaseLogic));
      UIPnlErrorTipLogic.prefabPath = "/prefab/ui/tips/PnlErrorTip";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlErrorTipView.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Layout, Label, Button;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Layout = module.Layout;
      Label = module.Label;
      Button = module.Button;
    }],
    execute: function () {
      cclegacy._RF.push({}, "808a2M7X2VOA4mtR1OovlNx", "UIPnlErrorTipView", undefined);

      var UIPnlErrorTipView = exports('UIPnlErrorTipView', function UIPnlErrorTipView(go) {
        this._root = void 0;
        this._Nego_root = void 0;
        this._LayC_recharge = void 0;
        this._TextC_illustrate = void 0;
        this._Btn_back = void 0;
        this._TextC_title1 = void 0;
        this._TextC_title2 = void 0;
        this._root = go;
        this._Nego_root = go.getChildByPath('Nego_root');
        this._LayC_recharge = go.getChildByPath('Nego_root/LayC_recharge').getComponent(Layout);
        this._TextC_illustrate = go.getChildByPath('Nego_root/LayC_recharge/TextC_illustrate').getComponent(Label);
        this._Btn_back = go.getChildByPath('Nego_root/LayC_recharge/Btn_back').getComponent(Button);
        this._TextC_title1 = go.getChildByPath('Nego_root/LayC_recharge/TextC_title1').getComponent(Label);
        this._TextC_title2 = go.getChildByPath('Nego_root/LayC_recharge/TextC_title2').getComponent(Label);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlMahjongLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIPnlMahjongView.ts', './UIBaseLogic.ts', './MahjongConstant.ts', './MahjongUtils.ts', './MahjongData.ts', './Tool.ts', './TipsMgr.ts', './EnumUI.ts', './UIMgr.ts', './UIPnlOverLogic.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, input, Input, director, Label, UIOpacity, instantiate, Button, Sprite, tween, v3, KeyCode, UIPnlMahjongView, UIBaseLogic, cardList5, otherCardList1, suitValue, otherSuit, cardList1, cardList2, cardList3, cardList4, MahjongUtils, MahjongData, Tool, TipsManager, EnumUI, UIMgr, UIPnlOverLogic;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      director = module.director;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      instantiate = module.instantiate;
      Button = module.Button;
      Sprite = module.Sprite;
      tween = module.tween;
      v3 = module.v3;
      KeyCode = module.KeyCode;
    }, function (module) {
      UIPnlMahjongView = module.UIPnlMahjongView;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }, function (module) {
      cardList5 = module.cardList5;
      otherCardList1 = module.otherCardList1;
      suitValue = module.suitValue;
      otherSuit = module.otherSuit;
      cardList1 = module.cardList1;
      cardList2 = module.cardList2;
      cardList3 = module.cardList3;
      cardList4 = module.cardList4;
    }, function (module) {
      MahjongUtils = module.MahjongUtils;
    }, function (module) {
      MahjongData = module.MahjongData;
    }, function (module) {
      Tool = module.Tool;
    }, function (module) {
      TipsManager = module.TipsManager;
    }, function (module) {
      EnumUI = module.EnumUI;
    }, function (module) {
      UIMgr = module.UIMgr;
    }, function (module) {
      UIPnlOverLogic = module.UIPnlOverLogic;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7f9f8ManIBFcJN5PeU1hlZZ", "UIPnlMahjongLogic", undefined);

      var ccclass = _decorator.ccclass;
      var cardArray = [cardList1, cardList2, cardList3, cardList4];
      var UIPnlMahjongLogic = exports('UIPnlMahjongLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(UIPnlMahjongLogic, _UIBaseLogic);

        function UIPnlMahjongLogic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._view = void 0;
          _this.gameoverLogic = void 0;
          _this.isFirst = true;
          _this.firstMahjong = [];
          _this.overInterval = null;
          _this.isPlayAnim = false;
          _this.comboCount = 0;
          _this.lastScore = 0;
          _this.moveCardPos = [];
          _this.pressTime = 0;
          _this.pressInterval = void 0;
          _this.centerPoint = [];
          _this.centerDirection = null;
          _this.firstMove = true;
          _this.cardLayer = 0;
          return _this;
        }

        var _proto = UIPnlMahjongLogic.prototype;

        _proto.Init = function Init(id, go) {
          // dynamicAtlasManager.enabled = true;
          this._view = new UIPnlMahjongView(go);

          _UIBaseLogic.prototype.Init.call(this, id, go); // --------- your code


          MahjongData.getInstance().mahjongRoot = this._view._Nego_Root;
          var userData = MahjongData.getInstance().loadUserData();

          if (userData) {
            this.onContinueGame(userData);
          } else {
            this.gameInit();
          }
        };

        _proto.BindUIEvent = function BindUIEvent() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
          director.on("stopCountDown", this.onStopCountDown, this);
          director.on("newGame", this.onNewGame, this);
          director.on("cursorIn", this.updateMovePos, this);
        };

        _proto.OnDestroy = function OnDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
        }
        /** 游戏初始化数据 */
        ;

        _proto.onNewGame = function onNewGame() {
          this._view._TextC_time.string = "\u5012\u8BA1\u65F6\uFF1A10:00";
          MahjongData.getInstance().curentScore = 0;
          MahjongData.getInstance().isGameOver = false;
          this.comboCount = 0;
          this.lastScore = 0;
          this.firstMove = true;
          this.cardLayer = 0;

          this._view._LayC_content.node.children.forEach(function (v, i) {
            v.getChildByName("TextC_card").getComponent(Label).string = "";
          });

          this.gameInit();
        }
        /** 继续游戏 */
        ;

        _proto.onContinueGame = function onContinueGame(userData) {
          var _this2 = this;

          this.firstMove = false;
          MahjongData.getInstance().initMahjong();
          this.addCard();
          MahjongData.getInstance().setUserData(userData);
          setTimeout(function () {
            _this2.recoverCard(userData.nameList, userData.mahjongList);

            MahjongData.getInstance().setSideCard();

            _this2.refreshTips();

            MahjongData.getInstance().getAllNoPressedCard();

            _this2.startTime(MahjongData.getInstance().countDownTime);

            var list = MahjongData.getInstance().clickList;

            for (var i = 0; i < 5; i++) {
              for (var j = 0; j < list[i].length; j++) {
                _this2.initSelectCard([i + 1, list[i][j][0], list[i][j][1]]);

                return;
              }
            }
          });
        }
        /** 游戏初始化数据 */
        ;

        _proto.gameInit = function gameInit() {
          MahjongData.getInstance().initMahjong();
          this.randomCard();
          this.addCard();
        }
        /** 随机卡牌 */
        ;

        _proto.randomCard = function randomCard() {
          var _this3 = this;

          var selectedPairs = MahjongUtils.getSelectedPairs(MahjongData.getInstance().mahjongTiles);
          var randomArray = [];
          var otherArray = [];
          randomArray = MahjongData.getInstance().mahjongTiles.filter(function (item) {
            return selectedPairs.filter(function (v) {
              return v.suit == item.suit && v.value == item.value;
            }).length > 0;
          });
          randomArray = randomArray.filter(function (v, i) {
            return i % 4 < 2;
          });
          otherArray = MahjongData.getInstance().mahjongTiles.filter(function (item) {
            return !(selectedPairs.filter(function (v) {
              return v.suit == item.suit && v.value == item.value;
            }).length > 0);
          });
          otherArray = otherArray.concat(randomArray);
          setTimeout(function () {
            MahjongData.getInstance().setSideCard();

            _this3.setCardValue(randomArray, otherArray);

            _this3.refreshTips();

            _this3.initSelectCard([5].concat(cardList5));

            MahjongData.getInstance().getAllNoPressedCard();
          });
        }
        /** 添加卡牌 */
        ;

        _proto.addCard = function addCard() {
          this.initCardNode(1, otherCardList1[0][0], otherCardList1[0][1]);

          for (var i = 0; i < 4; i++) {
            this.addCardNode(i + 1, cardArray[i]);
          }

          this.initCardNode(5, cardList5[0], cardList5[1]);
        }
        /** 添加牌节点 */
        ;

        _proto.addCardNode = function addCardNode(layer, cardList) {
          for (var i = 0; i < cardList.length; i++) {
            for (var j = 0; j < cardList[i].length; j++) {
              if (cardList[i][j] > 0) {
                this.initCardNode(layer, j, i);
              }
            }
          }

          if (layer == 1) {
            for (var _i = 1; _i < otherCardList1.length; _i++) {
              this.initCardNode(1, otherCardList1[_i][0], otherCardList1[_i][1]);
            }
          }
        }
        /** 初始化节点 */
        ;

        _proto.initCardNode = function initCardNode(layer, x, y) {
          var cardItemLogic = null;

          if (this._view._LayC_content.node.children.length == 144) {
            cardItemLogic = MahjongData.getInstance().getCardNode(layer, x, y);
            cardItemLogic.getComponent(UIOpacity).opacity = 255;
            cardItemLogic.setSiblingIndex(this.cardLayer);
            this.cardLayer++;
          } else {
            cardItemLogic = instantiate(this._view._Btn_CardItem.node);
            cardItemLogic.parent = this._view._LayC_content.node;
            cardItemLogic.name = "Btn" + layer + "_" + x + "_" + y;
            cardItemLogic.on(Button.EventType.CLICK, this.onCardCallback, this);
          }

          cardItemLogic.setPosition(-465.5 + x * 81 - layer * 8, -58 - y * 109 + layer * 10, 0);
          cardItemLogic.active = true;
        }
        /** 恢复卡牌 */
        ;

        _proto.recoverCard = function recoverCard(nameList, mahjongList) {
          var _this4 = this;

          this._view._LayC_content.node.children.map(function (v, i) {
            var mahjong = mahjongList[nameList.indexOf(v.name)];

            if (mahjong.value < 0) {
              v.active = false;
            } else {
              v.active = true;
              var name = mahjong.value > 0 ? "" + mahjong.value + mahjong.suit : mahjong.suit;
              v.getChildByName("TextC_card").getComponent(Label).string = name;

              _this4.setCardSprite(v, mahjong);
            }
          });
        }
        /** 设置卡牌值 */
        ;

        _proto.setCardValue = function setCardValue(randomArray, otherArray) {
          var _this5 = this;

          randomArray.sort(function () {
            return Math.random() - 0.5;
          });
          otherArray.sort(function () {
            return Math.random() - 0.5;
          });
          var list = MahjongData.getInstance().clickList;
          var count = 0;

          for (var i = 0; i < 5; i++) {
            count += list[i].length;
          }

          var randomList = MahjongUtils.getRandomList(count, randomArray.length);

          for (var _i2 = 0; _i2 < randomList.length; _i2++) {
            var index = randomList[_i2];
            var curNum = randomList[_i2];
            var _num = 0;

            for (var j = 0; j < 5; j++) {
              _num += list[j].length;

              if (index < _num) {
                var mahjong = randomArray[_i2];
                var name = mahjong.value > 0 ? "" + mahjong.value + mahjong.suit : mahjong.suit;
                var node = MahjongData.getInstance().getCardNode(j + 1, list[j][curNum][0], list[j][curNum][1]);
                node.getChildByName("TextC_card").getComponent(Label).string = name;
                this.setCardSprite(node, mahjong);
                break;
              }

              curNum -= list[j].length;
            }
          } // 设置其他牌值


          var num = 0;

          this._view._LayC_content.node.children.forEach(function (v, i) {
            if (v.getChildByName("TextC_card").getComponent(Label).string == "") {
              var _mahjong = otherArray[num];

              var _name = _mahjong.value > 0 ? "" + _mahjong.value + _mahjong.suit : _mahjong.suit;

              v.getChildByName("TextC_card").getComponent(Label).string = _name;

              _this5.setCardSprite(v, _mahjong);

              num++;
            }
          });
        }
        /** 设置卡牌精灵 */
        ;

        _proto.setCardSprite = function setCardSprite(node, mahjong) {
          var sprite = node.getChildByName("ImgC_card");

          if (mahjong.value > 0) {
            var value = suitValue.get(mahjong.suit);
            var name = "0" + value + "0" + mahjong.value;
            Tool.setImgSprite(sprite, "mahjong/" + name);
            var spr = node.getChildByName("ImgC_bg").getComponent(Sprite);

            if (spr.spriteFrame.name != "UI_Mahjong_Image_Background_White") {
              Tool.setImgSprite(node.getChildByName("ImgC_bg"), "mahjong/UI_Mahjong_Image_Background_White");
            }
          } else {
            var _value = suitValue.get(mahjong.suit);

            var index = -1;

            for (var i = 0; i < otherSuit.length; i++) {
              var n = otherSuit[i].indexOf(mahjong.suit);

              if (n > -1) {
                index = n;
                break;
              }
            }

            var _name2 = "0" + _value + "0" + (index + 1);

            Tool.setImgSprite(sprite, "mahjong/" + _name2); // @ts-ignore

            if (otherSuit[2].includes(mahjong.suit)) {
              Tool.setImgSprite(node.getChildByName("ImgC_bg"), "mahjong/UI_Mahjong_Image_Background_Green");
            } // @ts-ignore
            else if (otherSuit[3].includes(mahjong.suit)) {
                Tool.setImgSprite(node.getChildByName("ImgC_bg"), "mahjong/UI_Mahjong_Image_Background_Blue");
              } else {
                var _spr = node.getChildByName("ImgC_bg").getComponent(Sprite);

                if (_spr.spriteFrame.name != "UI_Mahjong_Image_Background_White") {
                  Tool.setImgSprite(node.getChildByName("ImgC_bg"), "mahjong/UI_Mahjong_Image_Background_White");
                }
              }
          }
        }
        /** 点击卡牌 */
        ;

        _proto.onCardCallback = function onCardCallback(button) {
          if (this.isPlayAnim) return;
          var numbers = MahjongUtils.getBtnNumber(button.node.name);
          this.selectCard(numbers, false);
        }
        /** 选中卡牌 */
        ;

        _proto.selectCard = function selectCard(numbers, isKey) {
          var _this6 = this;

          var list = MahjongData.getInstance().clickList;
          var node = MahjongData.getInstance().getCardNode(numbers[0], numbers[1], numbers[2]);

          if (isKey) {
            tween(node).to(0.1, {
              scale: v3(0.9, 0.9)
            }).start();
          } // 不能点击，播放抖动动画


          if (list[numbers[0] - 1].filter(function (v) {
            return v[0] == numbers[1] && v[1] == numbers[2];
          }).length == 0) {
            tween(node).by(0.02, {
              position: v3(5, 0)
            }).by(0.02, {
              position: v3(-6, 0)
            }).by(0.02, {
              position: v3(-3, 0)
            }).by(0.02, {
              position: v3(3, 0)
            }).by(0.02, {
              position: v3(1, 0)
            }).start();
            return;
          }

          if (this.isFirst) {
            this.firstMahjong = [].concat(numbers);
            this.updateSelectPos();
            this.isFirst = false;
          } else {
            // 重复点击返回
            if (numbers.filter(function (v, i) {
              return v == _this6.firstMahjong[i];
            }).length >= 3) {
              this.firstMahjong = [];
              this._view._Nego_select.active = false;
              this.isFirst = true;
              return;
            }

            var node1 = MahjongData.getInstance().getCardNode(this.firstMahjong[0], this.firstMahjong[1], this.firstMahjong[2]);
            var name1 = node.getChildByName("TextC_card").getComponent(Label).string;
            var name2 = node1.getChildByName("TextC_card").getComponent(Label).string;
            var group1 = ['春', '夏', '秋', '冬'];
            var group2 = ['梅', '兰', '竹', '菊']; // @ts-ignore

            if (name1 == name2 || group1.includes(name1) && group1.includes(name2) || group2.includes(name1) && group2.includes(name2)) {
              var score = this.getScore(name1);
              this.removeAnim(node, node1, score);

              if (this.firstMahjong[1] == -1 && this.firstMahjong[2] == 3.5 || numbers[1] == -1 && numbers[2] == 3.5) {
                MahjongData.getInstance().updateShadowLayer(this._view._LayC_content.node, false);
              } // 等待消除动画播放完成


              this.isPlayAnim = true; // 移除两个消除的麻将

              this.removeCard(numbers);
              this.removeCard(this.firstMahjong);
              MahjongData.getInstance().getAllNoPressedCard();
              setTimeout(function () {
                _this6.isPlayAnim = false;
                _this6.isFirst = true;
                _this6.firstMahjong = [];
                MahjongData.getInstance().setSideCard();

                var residueCount = _this6._view._LayC_content.node.children.filter(function (v) {
                  return v.active == true;
                }).length;

                if (residueCount > 0) _this6.updateMoveCard(MahjongUtils.copyArray(numbers));

                _this6.refreshTips();

                if (_this6.firstMove) {
                  _this6.firstMove = false;

                  _this6.startTime(600);
                }
              }, 1250);
            } else {
              this.firstMahjong = [].concat(numbers);
              this.updateSelectPos();
            }
          }
        };

        _proto.getScore = function getScore(name) {
          var score = MahjongUtils.calculateScore(name);
          this.comboCount = this.lastScore == score ? this.comboCount + 1 : 1;

          if (this.comboCount > 1) {
            console.log(this.comboCount + "\u8FDE\u51FB");
          }

          this.lastScore = score;

          var residueCount = this._view._LayC_content.node.children.filter(function (v) {
            return v.active == true;
          }).length;

          console.log("residueCount", residueCount); // 分数=牌值分*连击次数*剩余牌张数

          return score * this.comboCount * residueCount;
        }
        /** 移除麻将 */
        ;

        _proto.removeCard = function removeCard(card) {
          if (card[0] == 5) {
            MahjongData.getInstance().fiveCard = [];
          } else if (card[0] == 1 && card[2] == 3.5) {
            MahjongData.getInstance().oneOtherCardList = MahjongData.getInstance().oneOtherCardList.filter(function (v) {
              return v[0] != card[1] || v[1] != card[2];
            });
          } else {
            var cardList = MahjongData.getInstance().allCard.get(card[0]);
            cardList[card[2]][card[1]] = 0;
            MahjongData.getInstance().allCard.set(card[0], cardList);
          }
        }
        /** 刷新 */
        ;

        _proto.refreshTips = function refreshTips() {
          var count = this.getRemoveNumber();
          this._view._TextC_can.string = "\u5F53\u524D\u53EF\u6D88\u9664\u724C\u5BF9\uFF1A" + count;

          var residueCount = this._view._LayC_content.node.children.filter(function (v) {
            return v.active == true;
          }).length;

          this._view._TextC_residue.string = "\u5269\u4F59\u724C\u6570\uFF1A" + residueCount;
          this._view._TextC_score.string = "\u5F97\u5206\uFF1A" + MahjongData.getInstance().curentScore;

          if (residueCount == 0) {
            this.gameOver();
            TipsManager.Ins.ShowTextTips("恭喜通关！");
          } else if (count == 0) {
            this.gameOver();
            TipsManager.Ins.ShowTextTips("死局！（无任何可消除的麻将牌了）");
          }
        }
        /** 获取消除对数 */
        ;

        _proto.getRemoveNumber = function getRemoveNumber() {
          var list = MahjongData.getInstance().clickList;
          var valueList = [];

          var _loop = function _loop(i) {
            list[i].forEach(function (v, j) {
              var node = MahjongData.getInstance().getCardNode(i + 1, v[0], v[1]);
              var str = node.getChildByName("TextC_card").getComponent(Label).string;
              valueList.push(str);
            });
          };

          for (var i = 0; i < 5; i++) {
            _loop(i);
          }

          var cardValueList = MahjongUtils.getCardValue(valueList);
          var count = 0;

          for (var _i3 in cardValueList) {
            var val = Math.floor(Number(cardValueList[_i3]) / 2);

            if (val > 0) {
              count += val;
            }
          }

          return count;
        }
        /** 停止或继续倒计时 */
        ;

        _proto.onStopCountDown = function onStopCountDown(isStop) {
          if (isStop) {
            this.stopTime();
          } else {
            if (MahjongData.getInstance().countDownTime > 0) {
              this.startTime(MahjongData.getInstance().countDownTime);
            }
          }
        }
        /** 开始倒计时 */
        ;

        _proto.startTime = function startTime(duration) {
          var _this7 = this;

          this.overInterval = setInterval(function () {
            duration--;
            MahjongData.getInstance().countDownTime = duration;

            if (duration < 0) {
              _this7.gameOver();

              TipsManager.Ins.ShowTextTips("时间到！");
            } else {
              var time = MahjongUtils.displayTime(duration);
              _this7._view._TextC_time.string = "\u5012\u8BA1\u65F6\uFF1A" + time;
            }
          }, 1000);
        }
        /** 停止倒计时 */
        ;

        _proto.stopTime = function stopTime() {
          if (this.overInterval !== null) {
            clearInterval(this.overInterval);
            this.overInterval = null;
          }
        }
        /** 开始长按倒计时 */
        ;

        _proto.startKeyTime = function startKeyTime(keyCode) {
          var _this8 = this;

          this.pressInterval = setInterval(function () {
            _this8.pressTime += 66;

            if (_this8.pressTime >= 500) {
              _this8.getDistance(keyCode, true);
            }
          }, 66);
        }
        /** 停止长按倒计时 */
        ;

        _proto.stopKeyTime = function stopKeyTime() {
          if (this.pressInterval !== null) {
            clearInterval(this.pressInterval);
            this.pressInterval = null;
          }
        }
        /** 键盘按下事件 */
        ;

        _proto.onKeyDown = function onKeyDown(event) {
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
        ;

        _proto.onKeyUp = function onKeyUp(event) {
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
              var node = MahjongData.getInstance().getCardNode(this.moveCardPos[0], this.moveCardPos[1], this.moveCardPos[2]);
              tween(node).to(0.1, {
                scale: v3(1, 1)
              }).start();
              break;
          }
        }
        /** 初始选择焦点 */
        ;

        _proto.initSelectCard = function initSelectCard(numbers) {
          this.moveCardPos = [].concat(numbers);
          this.updateMovePos();
        };

        _proto.updateMovePos = function updateMovePos() {
          var numbers = this.moveCardPos;
          var node = MahjongData.getInstance().getCardNode(numbers[0], numbers[1], numbers[2]);
          var pos = node.getPosition();

          this._view._Nego_move.setPosition(v3(pos.x, pos.y));

          this._view._Nego_move.active = true;
        };

        _proto.updateSelectPos = function updateSelectPos() {
          var numbers = [].concat(this.firstMahjong);
          var node = MahjongData.getInstance().getCardNode(numbers[0], numbers[1], numbers[2]);
          var pos = node.getPosition();

          this._view._Nego_select.setPosition(v3(pos.x, pos.y));

          this._view._Nego_select.active = true;
        }
        /** 获取距离 */
        ;

        _proto.getDistance = function getDistance(key, isLongPress) {
          var _this9 = this;

          var list = MahjongData.getInstance().noPressedCard;
          var curList = [];
          var disList = [];
          var minDistance = 0;
          var count = 0; // 先找目标方向的牌，有则取最近的牌，无则扩大一格继续寻找

          var distance = function distance(pos) {
            curList[count] = [pos[0], pos[1], pos[2]];
            var dis = MahjongUtils.calculateDistance([_this9.moveCardPos[1], _this9.moveCardPos[2]], [pos[1], pos[2]], 2);
            disList[count] = dis;
            if (minDistance == 0) minDistance = dis;else if (dis <= minDistance) minDistance = dis;
            count++;
          };

          for (var i = 0; i < 5; i++) {
            for (var j = 0; j < list[i].length; j++) {
              var x = list[i][j]; // 找出目标方向所有的牌

              if (key == KeyCode.ARROW_UP && x[1] < this.moveCardPos[2] || key == KeyCode.ARROW_DOWN && x[1] > this.moveCardPos[2] || key == KeyCode.ARROW_LEFT && x[0] < this.moveCardPos[1] || key == KeyCode.ARROW_RIGHT && x[0] > this.moveCardPos[1]) {
                curList.push([i + 1, x[0], x[1]]);
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

          var targetValue = key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN ? this.moveCardPos[1] : this.moveCardPos[2]; // 取出离X轴最近的卡牌

          var closestValues = curList.reduce(function (closest, current) {
            var current1 = key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN ? current[1] : current[2];
            var closest1 = key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN ? closest[0][1] : closest[0][2];
            var currentDistance = Math.abs(current1 - targetValue);
            var closestDistance = Math.abs(closest1 - targetValue);

            if (currentDistance < closestDistance) {
              return [current];
            } else if (currentDistance === closestDistance) {
              return [].concat(closest, [current]);
            } else {
              return closest;
            }
          }, [curList[0]]); // 特殊处理小数位行

          if (this.moveCardPos[2] == 3.5) {
            if (key == KeyCode.ARROW_LEFT || key == KeyCode.ARROW_RIGHT) {
              var special = curList.filter(function (v) {
                return v[2] == 3 || v[2] == 4;
              });
              closestValues = closestValues.concat(special);
            }
          } else if (this.moveCardPos[2] == 3 || this.moveCardPos[2] == 4) {
            if (key == KeyCode.ARROW_LEFT || key == KeyCode.ARROW_RIGHT) {
              var _special = curList.filter(function (v) {
                return v[2] == 3.5;
              });

              closestValues = closestValues.concat(_special);
            }
          }

          if (this.moveCardPos[1] == 5.5) {
            if (key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN) {
              var _special2 = curList.filter(function (v) {
                return v[1] == 5 || v[1] == 6;
              });

              closestValues = closestValues.concat(_special2);
            }
          } else if (this.moveCardPos[1] == 5 || this.moveCardPos[1] == 6) {
            if (key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN) {
              var _special3 = curList.filter(function (v) {
                return v[1] == 5.5;
              });

              closestValues = closestValues.concat(_special3);
            }
          }

          closestValues = closestValues.filter(function (value, index, self) {
            return index === self.findIndex(function (v) {
              return v[0] === value[0] && v[1] === value[1] && v[2] === value[2];
            });
          });
          curList = [];
          closestValues.forEach(function (v) {
            return distance(v);
          });

          if (disList.length > 0) {
            this.setMoveCard(disList, minDistance, curList, key, isLongPress);
          }
        }
        /** 设置移动牌 */
        ;

        _proto.setMoveCard = function setMoveCard(disList, minDistance, curList, key, isLongPress) {
          var _this10 = this;

          var list = [];

          for (var i = 0; i < disList.length; i++) {
            var v = disList[i];

            if (v * 100 == minDistance * 100) {
              list.push(curList[i]);
            }
          }

          var fun = function fun(array) {
            if (isLongPress) {
              if (key == KeyCode.ARROW_UP || key == KeyCode.ARROW_DOWN) {
                var temp = MahjongUtils.copyArray(_this10.moveCardPos);

                if (Math.abs(temp[1] - array[0][1]) >= 1) {
                  return;
                }
              } else if (key == KeyCode.ARROW_LEFT || key == KeyCode.ARROW_RIGHT) {
                var _temp = MahjongUtils.copyArray(_this10.moveCardPos);

                if (Math.abs(_temp[2] - array[0][2]) >= 1) {
                  return;
                }
              }
            }

            _this10._view._Nego_move.active = false;
            var numbers = array[0];

            if (numbers[1] == 5.5) {
              _this10.centerPoint = MahjongUtils.copyArray(_this10.moveCardPos);
              _this10.centerDirection = key;
            } else {
              _this10.centerPoint = [];
              _this10.centerDirection = null;
            }

            _this10.moveCardPos = [].concat(numbers);

            _this10.updateMovePos();
          };

          if (list.length > 1) {
            if (key == KeyCode.ARROW_UP) {
              var res = this.centerDirection == key ? list.filter(function (v) {
                return v[1] == _this10.centerPoint[1];
              }) : list.filter(function (v) {
                return v[1] < _this10.moveCardPos[1];
              });
              fun(res);
            } else if (key == KeyCode.ARROW_DOWN) {
              var _res = this.centerDirection == key ? list.filter(function (v) {
                return v[1] == _this10.centerPoint[1];
              }) : list.filter(function (v) {
                return v[1] > _this10.moveCardPos[1];
              });

              fun(_res);
            } else if (key == KeyCode.ARROW_LEFT) {
              var _res2 = this.centerDirection == key ? list.filter(function (v) {
                return v[2] == _this10.centerPoint[2];
              }) : list.filter(function (v) {
                return v[2] < _this10.moveCardPos[2];
              });

              fun(_res2);
            } else if (key == KeyCode.ARROW_RIGHT) {
              var _res3 = this.centerDirection == key ? list.filter(function (v) {
                return v[2] == _this10.centerPoint[2];
              }) : list.filter(function (v) {
                return v[2] > _this10.moveCardPos[2];
              });

              fun(_res3);
            }
          } else {
            fun(list);
          }
        }
        /** 消除动画 */
        ;

        _proto.removeAnim = function removeAnim(card1, card2, score) {
          var _this11 = this;

          this._view._Nego_select.active = false;
          this._view._Nego_move.active = false;
          var pos1 = card1.getPosition();
          var pos2 = card2.getPosition();
          var centerPos = v3((pos1.x + pos2.x) / 2, (pos1.y + pos2.y) / 2);
          card1.getChildByName("Shade0").active = false;
          card1.getChildByName("Shade1").active = false;
          card2.getChildByName("Shade0").active = false;
          card2.getChildByName("Shade1").active = false;
          var len = this._view._LayC_content.node.children.length;

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
          } // 播放移动和渐隐动画


          var condition = pos1.x == pos2.x && pos1.y <= pos2.y;
          tween(card1).delay(0.2).to(0.5, {
            position: v3(pos1.x > pos2.x || condition ? centerPos.x + 40 : centerPos.x - 40, centerPos.y, 0)
          }, {
            easing: "backIn"
          }).to(0.5, {
            position: v3(pos1.x > pos2.x || condition ? centerPos.x + 40 : centerPos.x - 40, centerPos.y + 100, 0)
          }, {
            easing: "backIn"
          }).start();
          tween(card2).delay(0.2).to(0.5, {
            position: v3(pos1.x > pos2.x || condition ? centerPos.x - 40 : centerPos.x + 40, centerPos.y, 0)
          }, {
            easing: "backIn"
          }).to(0.5, {
            position: v3(pos1.x > pos2.x || condition ? centerPos.x - 40 : centerPos.x + 40, centerPos.y + 100, 0)
          }, {
            easing: "backIn"
          }).start();
          tween(card1.getComponent(UIOpacity)).delay(1).to(0.2, {
            opacity: 0
          }).start();
          tween(card2.getComponent(UIOpacity)).delay(1).to(0.2, {
            opacity: 0
          }).call(function () {
            card1.active = false;
            card2.active = false;
          }).start();
          tween(this._view._Nego_score).delay(0.6).call(function () {
            _this11._view._Nego_score.active = true;
            _this11._view._Nego_score.getComponent(UIOpacity).opacity = 255;
            _this11._view._Nego_score.getComponent(Label).string = "+" + score;
            MahjongData.getInstance().curentScore += score;

            _this11._view._Nego_score.setPosition(v3(_this11._view._Nego_score.getPosition().x, 23, 0));
          }).delay(0.3).to(0.3, {
            position: v3(this._view._Nego_score.getPosition().x, 53, 0)
          }, {
            easing: "backIn"
          }).start();
          tween(this._view._Nego_score.getComponent(UIOpacity)).delay(1.5).to(0.2, {
            opacity: 0
          }).call(function () {
            _this11._view._Nego_score.active = false;
          }).start();
        }
        /** 更新移动的光标 */
        ;

        _proto.updateMoveCard = function updateMoveCard(numbers) {
          var list = MahjongData.getInstance().noPressedCard;

          if (list.length > 0) {
            var disList = [];
            var card = [];

            var distance = function distance(pos, layer) {
              var dis = MahjongUtils.calculateDistance([numbers[1], numbers[2]], [pos[0], pos[1]], 2);
              disList.push(dis);
              card.push([layer, pos[0], pos[1]]);
            };

            var _loop2 = function _loop2(i) {
              var temp = list[i];

              if (temp.length > 0 && temp[0].length > 0) {
                temp.forEach(function (v) {
                  return distance(v, i + 1);
                });
              }
            };

            for (var i = 0; i < list.length; i++) {
              _loop2(i);
            }

            var minValue = Math.min.apply(Math, disList);
            var minIndex = disList.indexOf(minValue);
            this.moveCardPos = [].concat(card[minIndex]);
            this.updateMovePos();
          }
        }
        /** 游戏结束 */
        ;

        _proto.gameOver = /*#__PURE__*/function () {
          var _gameOver = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _this12 = this;

            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  MahjongData.getInstance().isGameOver = true;
                  MahjongData.getInstance().saveUserData();
                  this.stopTime();
                  setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          if (!_this12.gameoverLogic) {
                            _context.next = 4;
                            break;
                          }

                          _this12.gameoverLogic.SetActive(true);

                          _context.next = 7;
                          break;

                        case 4:
                          _context.next = 6;
                          return UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Gameover, UIPnlOverLogic);

                        case 6:
                          _this12.gameoverLogic = _context.sent;

                        case 7:
                          _this12.gameoverLogic.setOverInfo();

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  })), 2000);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));

          function gameOver() {
            return _gameOver.apply(this, arguments);
          }

          return gameOver;
        }();

        return UIPnlMahjongLogic;
      }(UIBaseLogic));
      UIPnlMahjongLogic.prefabPath = "/prefab/ui/PnlMahjong";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlMahjongView.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Layout, Button, Sprite, Label;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Layout = module.Layout;
      Button = module.Button;
      Sprite = module.Sprite;
      Label = module.Label;
    }],
    execute: function () {
      cclegacy._RF.push({}, "53392ZZNOtFjoqtRTshrn5m", "UIPnlMahjongView", undefined);

      var UIPnlMahjongView = exports('UIPnlMahjongView', function UIPnlMahjongView(go) {
        this._root = void 0;
        this._Nego_Root = void 0;
        this._LayC_content = void 0;
        this._Nego_move = void 0;
        this._Nego_select = void 0;
        this._Nego_hint1 = void 0;
        this._Nego_hint2 = void 0;
        this._Btn_CardItem = void 0;
        this._ImgC_bg = void 0;
        this._ImgC_card = void 0;
        this._TextC_card = void 0;
        this._TextC_can = void 0;
        this._TextC_time = void 0;
        this._TextC_score = void 0;
        this._TextC_residue = void 0;
        this._Nego_score = void 0;
        this._root = go;
        this._Nego_Root = go.getChildByPath('Nego_Root');
        this._LayC_content = go.getChildByPath('Nego_Root/LayC_content').getComponent(Layout);
        this._Nego_move = go.getChildByPath('Nego_Root/tipNode/Nego_move');
        this._Nego_select = go.getChildByPath('Nego_Root/tipNode/Nego_select');
        this._Nego_hint1 = go.getChildByPath('Nego_Root/tipNode/Nego_hint1');
        this._Nego_hint2 = go.getChildByPath('Nego_Root/tipNode/Nego_hint2');
        this._Btn_CardItem = go.getChildByPath('Nego_Root/Btn_CardItem').getComponent(Button);
        this._ImgC_bg = go.getChildByPath('Nego_Root/Btn_CardItem/ImgC_bg').getComponent(Sprite);
        this._ImgC_card = go.getChildByPath('Nego_Root/Btn_CardItem/ImgC_card').getComponent(Sprite);
        this._TextC_card = go.getChildByPath('Nego_Root/Btn_CardItem/TextC_card').getComponent(Label);
        this._TextC_can = go.getChildByPath('Nego_Root/top/TextC_can').getComponent(Label);
        this._TextC_time = go.getChildByPath('Nego_Root/top/TextC_time').getComponent(Label);
        this._TextC_score = go.getChildByPath('Nego_Root/top/TextC_score').getComponent(Label);
        this._TextC_residue = go.getChildByPath('Nego_Root/top/TextC_residue').getComponent(Label);
        this._Nego_score = go.getChildByPath('Nego_Root/top/Nego_score');
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlMenuLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIPnlMenuView.ts', './UIBaseLogic.ts', './UIPnlTitleLogic.ts', './EnumUI.ts', './UIMgr.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, director, UIPnlMenuView, UIBaseLogic, UIPnlTitleLogic, EnumUI, UIMgr;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
    }, function (module) {
      UIPnlMenuView = module.UIPnlMenuView;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }, function (module) {
      UIPnlTitleLogic = module.UIPnlTitleLogic;
    }, function (module) {
      EnumUI = module.EnumUI;
    }, function (module) {
      UIMgr = module.UIMgr;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b1a76p3df1PCr0EOJbfzH6z", "UIPnlMenuLogic", undefined);

      var ccclass = _decorator.ccclass;
      var UIPnlMenuLogic = exports('UIPnlMenuLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(UIPnlMenuLogic, _UIBaseLogic);

        function UIPnlMenuLogic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._view = void 0;
          _this.titleLogic = void 0;
          return _this;
        }

        var _proto = UIPnlMenuLogic.prototype;

        _proto.Init = function Init(id, go) {
          this._view = new UIPnlMenuView(go);

          _UIBaseLogic.prototype.Init.call(this, id, go); // --------- your code

        };

        _proto.BindUIEvent = function BindUIEvent() {
          this.BindUIEventClick(this._view._Btn_introduce.node, this.HandlerBtn_introduce);
          this.BindUIEventClick(this._view._Btn_scoreRule.node, this.HandlerBtn_scoreRule);
          this.BindUIEventClick(this._view._Btn_sound.node, this.HandlerBtn_sound);
          this.BindUIEventClick(this._view._Btn_backTitle.node, this.HandlerBtn_backTitle);
          this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back);
        };

        _proto.HandlerBtn_introduce = function HandlerBtn_introduce() {
          console.log("玩法介绍");
        };

        _proto.HandlerBtn_scoreRule = function HandlerBtn_scoreRule() {
          console.log("得分规则");
        };

        _proto.HandlerBtn_sound = function HandlerBtn_sound() {
          console.log("静音");
        };

        _proto.HandlerBtn_backTitle = /*#__PURE__*/function () {
          var _HandlerBtn_backTitle = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  console.log("返回标题页");
                  this.SetActive(false);

                  if (!this.titleLogic) {
                    _context.next = 6;
                    break;
                  }

                  this.titleLogic.SetActive(true);
                  _context.next = 9;
                  break;

                case 6:
                  _context.next = 8;
                  return UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Title, UIPnlTitleLogic);

                case 8:
                  this.titleLogic = _context.sent;

                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function HandlerBtn_backTitle() {
            return _HandlerBtn_backTitle.apply(this, arguments);
          }

          return HandlerBtn_backTitle;
        }();

        _proto.HandlerBtn_back = function HandlerBtn_back() {
          this.SetActive(false);
          director.emit("stopCountDown", false);
        };

        return UIPnlMenuLogic;
      }(UIBaseLogic));
      UIPnlMenuLogic.prefabPath = "/prefab/ui/PnlMenu";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlMenuView.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Label, Button;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Button = module.Button;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9e347DFUlJHVot5USPFx9rz", "UIPnlMenuView", undefined);

      var UIPnlMenuView = exports('UIPnlMenuView', function UIPnlMenuView(go) {
        this._root = void 0;
        this._Nego_root = void 0;
        this._TextC_title = void 0;
        this._Btn_introduce = void 0;
        this._Btn_scoreRule = void 0;
        this._Btn_sound = void 0;
        this._Btn_backTitle = void 0;
        this._Btn_back = void 0;
        this._root = go;
        this._Nego_root = go.getChildByPath('Nego_root');
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label);
        this._Btn_introduce = go.getChildByPath('Nego_root/Group/Btn_introduce').getComponent(Button);
        this._Btn_scoreRule = go.getChildByPath('Nego_root/Group/Btn_scoreRule').getComponent(Button);
        this._Btn_sound = go.getChildByPath('Nego_root/Group/Btn_sound').getComponent(Button);
        this._Btn_backTitle = go.getChildByPath('Nego_root/Group/Btn_backTitle').getComponent(Button);
        this._Btn_back = go.getChildByPath('Nego_root/Btn_back').getComponent(Button);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlOverLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIPnlOverView.ts', './UIBaseLogic.ts', './MahjongData.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, director, UIPnlOverView, UIBaseLogic, MahjongData;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
    }, function (module) {
      UIPnlOverView = module.UIPnlOverView;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }, function (module) {
      MahjongData = module.MahjongData;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b84c1MxotJOXJvz5EGwMqdw", "UIPnlOverLogic", undefined);

      var ccclass = _decorator.ccclass;
      var UIPnlOverLogic = exports('UIPnlOverLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(UIPnlOverLogic, _UIBaseLogic);

        function UIPnlOverLogic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._view = void 0;
          return _this;
        }

        var _proto = UIPnlOverLogic.prototype;

        _proto.Init = function Init(id, go) {
          this._view = new UIPnlOverView(go);

          _UIBaseLogic.prototype.Init.call(this, id, go); // --------- your code

        };

        _proto.BindUIEvent = function BindUIEvent() {
          this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back);
          this.BindUIEventClick(this._view._Btn_newGame.node, this.HandlerBtn_newGame);
        };

        _proto.HandlerBtn_back = function HandlerBtn_back() {
          this.SetActive(false);
        };

        _proto.HandlerBtn_newGame = function HandlerBtn_newGame() {
          this.SetActive(false);
          director.emit("newGame");
        }
        /** 设置结算信息 */
        ;

        _proto.setOverInfo = function setOverInfo() {
          var score = MahjongData.getInstance().curentScore;
          var count = MahjongData.getInstance().mahjongRoot.getChildByName("LayC_content").children.filter(function (v) {
            return v.active == true;
          }).length;
          console.log("设置结算信息", count);
          this._view._TextC_score.string = "\u5F97\u5206\uFF1A" + score;
          var value = ((144 - count) / 144 * 100).toFixed(2);
          this._view._TextC_complete.string = "\u5B8C\u6210\u5EA6" + value + "%   " + Number(value) * 100;
          this._view._TextC_endScore.string = "\u6700\u7EC8\u5F97\u5206\uFF1A" + (score + Number(value) * 100);
        };

        return UIPnlOverLogic;
      }(UIBaseLogic));
      UIPnlOverLogic.prefabPath = "/prefab/ui/PnlOver";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlOverView.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Label, Button;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Button = module.Button;
    }],
    execute: function () {
      cclegacy._RF.push({}, "93627vnvo1ABIOzebuQZUMs", "UIPnlOverView", undefined);

      var UIPnlOverView = exports('UIPnlOverView', function UIPnlOverView(go) {
        this._root = void 0;
        this._Nego_root = void 0;
        this._TextC_title = void 0;
        this._Btn_back = void 0;
        this._Btn_newGame = void 0;
        this._TextC_cancel = void 0;
        this._TextC_score = void 0;
        this._TextC_complete = void 0;
        this._TextC_endScore = void 0;
        this._root = go;
        this._Nego_root = go.getChildByPath('Nego_root');
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label);
        this._Btn_back = go.getChildByPath('Nego_root/Btn_back').getComponent(Button);
        this._Btn_newGame = go.getChildByPath('Nego_root/Btn_newGame').getComponent(Button);
        this._TextC_cancel = go.getChildByPath('Nego_root/Btn_newGame/TextC_cancel').getComponent(Label);
        this._TextC_score = go.getChildByPath('Nego_root/TextC_score').getComponent(Label);
        this._TextC_complete = go.getChildByPath('Nego_root/TextC_complete').getComponent(Label);
        this._TextC_endScore = go.getChildByPath('Nego_root/TextC_endScore').getComponent(Label);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlSystemLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIPnlSystemView.ts', './UIBaseLogic.ts', './MahjongData.ts', './MahjongUtils.ts', './TipsMgr.ts', './UIPnlMenuLogic.ts', './UIMgr.ts', './EnumUI.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, input, Input, director, v3, UIOpacity, tween, KeyCode, Label, UIPnlSystemView, UIBaseLogic, MahjongData, MahjongUtils, TipsManager, UIPnlMenuLogic, UIMgr, EnumUI;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      director = module.director;
      v3 = module.v3;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      KeyCode = module.KeyCode;
      Label = module.Label;
    }, function (module) {
      UIPnlSystemView = module.UIPnlSystemView;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }, function (module) {
      MahjongData = module.MahjongData;
    }, function (module) {
      MahjongUtils = module.MahjongUtils;
    }, function (module) {
      TipsManager = module.TipsManager;
    }, function (module) {
      UIPnlMenuLogic = module.UIPnlMenuLogic;
    }, function (module) {
      UIMgr = module.UIMgr;
    }, function (module) {
      EnumUI = module.EnumUI;
    }],
    execute: function () {
      cclegacy._RF.push({}, "90f3297QVtJz76MKFClH6QC", "UIPnlSystemLogic", undefined);

      var ccclass = _decorator.ccclass;
      var UIPnlSystemLogic = exports('UIPnlSystemLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(UIPnlSystemLogic, _UIBaseLogic);

        function UIPnlSystemLogic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._view = void 0;
          _this.menuLogic = void 0;
          return _this;
        }

        var _proto = UIPnlSystemLogic.prototype;

        _proto.Init = function Init(id, go) {
          this._view = new UIPnlSystemView(go);

          _UIBaseLogic.prototype.Init.call(this, id, go); // --------- your code

        };

        _proto.BindUIEvent = function BindUIEvent() {
          this.BindUIEventClick(this._view._Btn_hint.node, this.HandlerBtn_hint);
          this.BindUIEventClick(this._view._Btn_menu.node, this.HandlerBtn_menu);
          this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back);
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          director.on("moveCursor", this.onMoveCursor, this);
        };

        _proto.OnDestroy = function OnDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          director.off("moveCursor", this.onMoveCursor, this);
        }
        /** 提示 */
        ;

        _proto.HandlerBtn_hint = function HandlerBtn_hint() {
          var _this2 = this;

          var list = MahjongData.getInstance().clickList;
          var valueList = [];

          var _loop = function _loop(i) {
            list[i].forEach(function (v, j) {
              var node = MahjongData.getInstance().getCardNode(i + 1, v[0], v[1]);
              var str = node.getChildByName("TextC_card").getComponent(Label).string;
              valueList.push(str);
            });
          };

          for (var i = 0; i < 5; i++) {
            _loop(i);
          }

          var cardValueList = MahjongUtils.getCardValue(valueList);
          var tipText = "";

          for (var _i in cardValueList) {
            var val = Math.floor(Number(cardValueList[_i]) / 2);

            if (val > 0) {
              tipText = _i;
              break;
            }
          }

          var count = 0;

          var _loop2 = function _loop2(i) {
            list[i].forEach(function (v, j) {
              var node = MahjongData.getInstance().getCardNode(i + 1, v[0], v[1]);
              var str = node.getChildByName("TextC_card").getComponent(Label).string;
              var group1 = ['春', '夏', '秋', '冬'];
              var group2 = ['梅', '兰', '竹', '菊'];

              if (group1.includes(tipText) && group1.includes(str) || group2.includes(tipText) && group2.includes(str)) {
                count++;

                _this2.playHintAnim(node, count);
              } else if (str == tipText) {
                count++;

                _this2.playHintAnim(node, count);
              }
            });
          };

          for (var _i2 = 0; _i2 < 5; _i2++) {
            _loop2(_i2);
          }
        }
        /** 菜单 */
        ;

        _proto.HandlerBtn_menu = /*#__PURE__*/function () {
          var _HandlerBtn_menu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this.menuLogic) {
                    _context.next = 4;
                    break;
                  }

                  this.menuLogic.SetActive(true);
                  _context.next = 7;
                  break;

                case 4:
                  _context.next = 6;
                  return UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Menu, UIPnlMenuLogic);

                case 6:
                  this.menuLogic = _context.sent;

                case 7:
                  director.emit("stopCountDown", true);

                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));

          function HandlerBtn_menu() {
            return _HandlerBtn_menu.apply(this, arguments);
          }

          return HandlerBtn_menu;
        }()
        /** 返回 */
        ;

        _proto.HandlerBtn_back = function HandlerBtn_back() {
          var data = {
            title: "",
            msg: "是否要退出游戏（退出游戏时将自动保存目前进度）",
            okTxt: "返回",
            noTxt: "退出"
          };
          TipsManager.Ins.OpenNormalTips(data).then(function (result) {
            director.emit("stopCountDown", false);
            var text = result ? "返回" : "退出";
            console.log(text);

            if (!result) {
              MahjongData.getInstance().saveUserData();
            }
          });
          director.emit("stopCountDown", true);
        }
        /** 提示动画 */
        ;

        _proto.playHintAnim = function playHintAnim(node, index) {
          if (index > 2) return;
          var pos = node.getPosition();
          var tipNode = MahjongData.getInstance().mahjongRoot.getChildByName("tipNode");
          var curNode = index == 1 ? tipNode.getChildByName("Nego_hint1") : tipNode.getChildByName("Nego_hint2");
          curNode.setPosition(v3(pos.x, pos.y));
          curNode.active = true;
          var uiOpacity = curNode.getComponent(UIOpacity);
          uiOpacity.opacity = 255;
          tween(uiOpacity).to(0.15, {
            opacity: 0
          }, {
            easing: "backIn"
          }).to(0.15, {
            opacity: 255
          }, {
            easing: "backIn"
          }).to(0.15, {
            opacity: 0
          }, {
            easing: "backIn"
          }).to(0.15, {
            opacity: 255
          }, {
            easing: "backIn"
          }).to(0.15, {
            opacity: 0
          }, {
            easing: "backIn"
          }).start();
        }
        /** 移动光标 */
        ;

        _proto.onMoveCursor = function onMoveCursor() {
          MahjongData.getInstance().isHint = true;
          this._view._Btn_hint.node.getChildByName("tip").active = true;
        }
        /** 键盘按下事件 */
        ;

        _proto.onKeyDown = function onKeyDown(event) {
          if (!MahjongData.getInstance().isHint) return;

          switch (event.keyCode) {
            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_LEFT:
              MahjongData.getInstance().isHint = false;
              this._view._Btn_hint.node.getChildByName("tip").active = false;
              director.emit("cursorIn");
              break;

            case KeyCode.ENTER:
              this.HandlerBtn_hint();
              break;
          }
        };

        return UIPnlSystemLogic;
      }(UIBaseLogic));
      UIPnlSystemLogic.prefabPath = "/prefab/ui/PnlSystem";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlSystemView.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Button;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Button = module.Button;
    }],
    execute: function () {
      cclegacy._RF.push({}, "57efdgGJopBnq1eUrbNcAVT", "UIPnlSystemView", undefined);

      var UIPnlSystemView = exports('UIPnlSystemView', function UIPnlSystemView(go) {
        this._root = void 0;
        this._Nego_Root = void 0;
        this._Btn_hint = void 0;
        this._Btn_menu = void 0;
        this._Btn_back = void 0;
        this._root = go;
        this._Nego_Root = go.getChildByPath('Nego_Root');
        this._Btn_hint = go.getChildByPath('Nego_Root/Btn_hint').getComponent(Button);
        this._Btn_menu = go.getChildByPath('Nego_Root/Btn_menu').getComponent(Button);
        this._Btn_back = go.getChildByPath('Nego_Root/Btn_back').getComponent(Button);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlTitleLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './UIPnlTitleView.ts', './UIBaseLogic.ts'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, director, UIPnlTitleView, UIBaseLogic;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
    }, function (module) {
      UIPnlTitleView = module.UIPnlTitleView;
    }, function (module) {
      UIBaseLogic = module.UIBaseLogic;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7d08fng6pxL6am56tvAWriD", "UIPnlTitleLogic", undefined);

      var ccclass = _decorator.ccclass;
      var UIPnlTitleLogic = exports('UIPnlTitleLogic', /*#__PURE__*/function (_UIBaseLogic) {
        _inheritsLoose(UIPnlTitleLogic, _UIBaseLogic);

        function UIPnlTitleLogic() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _UIBaseLogic.call.apply(_UIBaseLogic, [this].concat(args)) || this;
          _this._view = void 0;
          return _this;
        }

        var _proto = UIPnlTitleLogic.prototype;

        _proto.Init = function Init(id, go) {
          this._view = new UIPnlTitleView(go);

          _UIBaseLogic.prototype.Init.call(this, id, go); // --------- your code

        };

        _proto.BindUIEvent = function BindUIEvent() {
          this.BindUIEventClick(this._view._Btn_newGame.node, this.HandlerBtn_newGame);
          this.BindUIEventClick(this._view._Btn_continue.node, this.HandlerBtn_continue);
          this.BindUIEventClick(this._view._Btn_back.node, this.HandlerBtn_back);
        };

        _proto.HandlerBtn_newGame = function HandlerBtn_newGame() {
          this.SetActive(false);
          director.emit("newGame");
        };

        _proto.HandlerBtn_continue = function HandlerBtn_continue() {
          this.SetActive(false);
          director.emit("stopCountDown", false);
        };

        _proto.HandlerBtn_back = function HandlerBtn_back() {
          this.SetActive(false);
          director.emit("stopCountDown", false);
        };

        return UIPnlTitleLogic;
      }(UIBaseLogic));
      UIPnlTitleLogic.prefabPath = "/prefab/ui/PnlTitle";

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIPnlTitleView.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Label, Button;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Button = module.Button;
    }],
    execute: function () {
      cclegacy._RF.push({}, "eca08QLT7NMr7QOp4wHAToM", "UIPnlTitleView", undefined);

      var UIPnlTitleView = exports('UIPnlTitleView', function UIPnlTitleView(go) {
        this._root = void 0;
        this._Nego_root = void 0;
        this._TextC_title = void 0;
        this._Btn_newGame = void 0;
        this._Btn_continue = void 0;
        this._Btn_back = void 0;
        this._root = go;
        this._Nego_root = go.getChildByPath('Nego_root');
        this._TextC_title = go.getChildByPath('Nego_root/TextC_title').getComponent(Label);
        this._Btn_newGame = go.getChildByPath('Nego_root/Group/Btn_newGame').getComponent(Button);
        this._Btn_continue = go.getChildByPath('Nego_root/Group/Btn_continue').getComponent(Button);
        this._Btn_back = go.getChildByPath('Nego_root/Btn_back').getComponent(Button);
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Waitting.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "95143M/82NCOLKGzw14JlmS", "Waitting", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /** 加载延时提示动画 */

      var LoadingIndicator = exports('LoadingIndicator', (_dec = ccclass("LoadingIndicator"), _dec2 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadingIndicator, _Component);

        function LoadingIndicator() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "loading", _descriptor, _assertThisInitialized(_this));

          _this.loading_rotate = 0;
          return _this;
        }

        var _proto = LoadingIndicator.prototype;

        _proto.update = function update(dt) {
          this.loading_rotate += dt * 220;
          this.loading.setRotationFromEuler(0, 0, -this.loading_rotate % 360);

          if (this.loading_rotate > 360) {
            this.loading_rotate -= 360;
          }
        };

        return LoadingIndicator;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "loading", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});