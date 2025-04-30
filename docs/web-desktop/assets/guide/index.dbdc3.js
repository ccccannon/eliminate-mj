System.register("chunks:///_virtual/EditorAssets.ts", ['cc'], function (exports) {
  var cclegacy, warn;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      warn = module.warn;
    }],
    execute: function () {
      cclegacy._RF.push({}, "30eb5XBO9hFp6g/AAeV2xn9", "EditorAssets", undefined);
      /**
       * 编辑器内资源加载类
       */
      var EditorAsset = exports('default', /*#__PURE__*/function () {
        function EditorAsset() {}
        /**
         * 在编辑器环境中加载 assets 目录下的资源
         * @param path 相对路径，根目录为 assets/，注意带上文件后缀，如：eazax-sine-wave.effect
         * @param assetType 资源类型，如：effect
         * @param callback 加载完成回调
         * @example 
         * EditorAsset.load<EffectAsset>("libs/hyz/guide/effect/hollow.effect","effect",(err: Error, result: EffectAsset) => {
         *   console.log("xxxxxxxx",err,result)
         * })
         */
        EditorAsset.load = function load(path, assetType, callback) {
          return new Promise(function (res) {
            {
              res(null);
              warn('[EditorAsset]', '该函数只在编辑器环境内有效！');
              return;
            }
          });
        };
        return EditorAsset;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/function.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('_funcs', void 0);
      cclegacy._RF.push({}, "b288bU1YzBIZrjeOfdQAI/i", "function", undefined);
      var _funcs;
      (function (_funcs2) {
        function formatNumberWithThousandSeparator(num) {
          if (num === void 0) {
            num = 0;
          }
          if (typeof num != "number") {
            return "";
          }
          // 如果 num 是小数，则只处理整数部分  
          var parts = num.toString().split(".");
          var integerPart = parts[0];

          // 使用正则表达式在每三位数字后添加逗号  
          var formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+$)/g, ",");

          // 如果原数字包含小数部分，则将其添加回结果  
          var result = formattedIntegerPart;
          if (parts.length > 1) {
            result += "." + parts[1];
          }
          return result;
        }
        _funcs2.formatNumberWithThousandSeparator = formatNumberWithThousandSeparator;
        function checkPolygonContainPoint(p, poly) {
          var px = p.x,
            py = p.y,
            flag = false;
          for (var i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            var sx = poly[i].x,
              sy = poly[i].y,
              tx = poly[j].x,
              ty = poly[j].y;

            // 点与多边形顶点重合
            if (sx === px && sy === py || tx === px && ty === py) {
              return 0;
            }

            // 判断线段两端点是否在射线两侧
            if (sy < py && ty >= py || sy >= py && ty < py) {
              // 线段上与射线 Y 坐标相同的点的 X 坐标
              var x = sx + (py - sy) * (tx - sx) / (ty - sy);

              // 点在多边形的边上
              if (x === px) {
                return 0;
              }

              // 射线穿过多边形的边界
              if (x > px) {
                flag = !flag;
              }
            }
          }

          // 射线穿过多边形边界的次数为奇数时点在多边形内
          return flag ? -1 : 1;
        }
        _funcs2.checkPolygonContainPoint = checkPolygonContainPoint;
      })(_funcs || (_funcs = exports('_funcs', {})));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/guide", ['./EditorAssets.ts', './guide_component.ts', './guide_config.ts', './guide_hollow.ts', './guide_manager.ts', './guide_step.ts', './guide_tip_base.ts', './touch_blocker.ts', './hyz_export.ts', './hyz_init.ts', './function.ts', './persist_nodes.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/guide_component.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './guide_manager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Component, guide_manager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      guide_manager = module.guide_manager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "b4ed6jLqC5C0YcF7CMo1BWa", "guide_component", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var guide_component = exports('guide_component', (_dec = ccclass("guide_component"), _dec2 = property("string"), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(guide_component, _Component);
        function guide_component() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "key", _descriptor, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = guide_component.prototype;
        _proto.onLoad = function onLoad() {
          if (this.key === "") {
            return;
          }
          guide_manager.registerGuideComponent(this.key, this.node);
        };
        return guide_component;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "key", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/guide_config.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './guide_step.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, ClickCloseType;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ClickCloseType = module.ClickCloseType;
    }],
    execute: function () {
      cclegacy._RF.push({}, "075f8Y7Z1JJRq5KTcpbNqzH", "guide_config", undefined);
      var guide_config = exports('guide_config', /*#__PURE__*/function () {
        function guide_config() {
          this._guideCfgs = null;
        }
        guide_config.getInstance = function getInstance() {
          if (this._inst == null) {
            this._inst = new guide_config();
          }
          return this._inst;
        }

        /**加载引导配置 */;
        var _proto = guide_config.prototype;
        _proto.load = /*#__PURE__*/
        function () {
          var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(jsonPath, bundleName) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", this._guideCfgs);
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function load(_x, _x2) {
            return _load.apply(this, arguments);
          }
          return load;
        }() /**获取引导序列 */;
        _proto.getGuideConfig = function getGuideConfig(guideId) {
          return this._guideCfgs[guideId];
        }

        /**输入引导配置 */;
        _proto.setGuideConfigs = function setGuideConfigs(guideCfgs) {
          this._guideCfgs = guideCfgs;
        }

        /**输入引导表和引导步骤表的json配置 */;
        _proto.setGuideConfigsByJson = function setGuideConfigsByJson(guideConfs, guideStepConfs) {
          var getGuideStepConf = function getGuideStepConf(id) {
            for (var _iterator = _createForOfIteratorHelperLoose(guideStepConfs), _step; !(_step = _iterator()).done;) {
              var _step$value = _step.value,
                key = _step$value[0],
                conf = _step$value[1];
              if (conf.ID == id) {
                return conf;
              }
            }
            return null;
          };
          var createConfigGuide = function createConfigGuide(id, index, guideId, clickType, stepKey, desc, waitForEvent, targetPath, tipPrefab, tipParams, hollowoutParam) {
            return {
              id: id,
              index: index,
              guideId: guideId,
              clickType: clickType,
              stepKey: stepKey,
              desc: desc,
              waitForEvent: waitForEvent,
              targetPath: targetPath,
              tipPrefab: tipPrefab,
              tipParams: tipParams,
              hollowoutParam: hollowoutParam
            };
          };
          if (this._guideCfgs == null) {
            this._guideCfgs = {};
          }

          //根据现有的字段，拼出hyz.IConfigGuide
          for (var _iterator2 = _createForOfIteratorHelperLoose(guideConfs), _step2; !(_step2 = _iterator2()).done;) {
            var _step2$value = _step2.value,
              key = _step2$value[0],
              guideConf = _step2$value[1];
            var array = [];
            //获取引导步骤
            for (var j = 0; j < guideConf.StepType.length; j++) {
              var stepType = guideConf.StepType[j];
              if (stepType != 1) {
                //TODO: 其他类型引导，具体实现的时候再确定做法
                continue;
              }
              var stepID = guideConf.StepID[j];
              if (stepID <= 0) {
                continue;
              }
              var guideStepConf = getGuideStepConf(stepID);
              if (guideStepConf == null) {
                continue;
              }
              var id = stepID;
              var index = j;
              var guideId = guideConf.ID;
              var stepKey = stepID; //TODO: 暂时没有特殊的Key，先用引导ID代替
              var clickType = ClickCloseType.no_close;
              if (guideStepConf.EffectType == 4 && guideStepConf.ButtonID == 0) {
                //纯文本展示类型
                clickType = ClickCloseType.close_by_click_bg;
              }
              var desc; //描述
              var waitForEvent = guideStepConf.Event; //等待事件
              var targetPath = guideStepConf.ButtonID == 0 ? undefined : guideStepConf.ButtonID.toString();
              var tipPrefab = {
                bundleName: "gui_main",
                prefabPath: "guide/GuideView"
              };
              var tipParams;
              var hollowoutParam = {
                opacity: 0
              };

              // if (guideStepConf.ButtonID == 0 && dialogType == 0) {
              //     dialogType = 1;
              // }

              var data = createConfigGuide(id, index, guideId, clickType, stepKey, desc, waitForEvent, targetPath, tipPrefab, tipParams, hollowoutParam);
              array.push(data);
            }
            this._guideCfgs[guideConf.ID] = array;
          }
        };
        return guide_config;
      }());
      guide_config._inst = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/guide_hollow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './guide_step.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Sprite, director, Director, v2, UITransform, Component, Material, Tween, tween, HollowShape, guide_step;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      director = module.director;
      Director = module.Director;
      v2 = module.v2;
      UITransform = module.UITransform;
      Component = module.Component;
      Material = module.Material;
      Tween = module.Tween;
      tween = module.tween;
    }, function (module) {
      HollowShape = module.HollowShape;
      guide_step = module.guide_step;
    }],
    execute: function () {
      var _dec, _dec2, _class;
      cclegacy._RF.push({}, "6c0a5MiCjhPXZKzP2Mu4uOr", "guide_hollow", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property,
        requireComponent = _decorator.requireComponent,
        executeInEditMode = _decorator.executeInEditMode,
        disallowMultiple = _decorator.disallowMultiple,
        executionOrder = _decorator.executionOrder;
      var guide_hollow = exports('default', (_dec = requireComponent(Sprite), _dec2 = executionOrder(-10), ccclass(_class = _dec(_class = disallowMultiple(_class = _dec2(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(guide_hollow, _Component);
        function guide_hollow() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._curStep = null;
          _this.material = null;
          _this.tweenRes = null;
          _this._oldShape = HollowShape.None;
          return _this;
        }
        var _proto = guide_hollow.prototype;
        _proto.onLoad = function onLoad() {
          director.on(Director.EVENT_BEFORE_SCENE_LAUNCH, this._onBeforeSceneLaunch, this);
          this.init();
        };
        _proto.onDestroy = function onDestroy() {
          director.off(Director.EVENT_BEFORE_SCENE_LAUNCH, this._onBeforeSceneLaunch, this);
        };
        _proto._onBeforeSceneLaunch = function _onBeforeSceneLaunch() {
          this._oldShape = HollowShape.None;
        }

        /**
         * 初始化组件
         */;
        _proto.init = /*#__PURE__*/
        function () {
          var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var sprite;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.material == null)) {
                    _context.next = 7;
                    break;
                  }
                  if (!hyz.hollowEffect) {
                    _context.next = 6;
                    break;
                  }
                  this.material = new Material();
                  this.material.initialize({
                    effectAsset: hyz.hollowEffect
                  });
                  _context.next = 7;
                  break;
                case 6:
                  return _context.abrupt("return");
                case 7:
                  sprite = this.node.getComponent(Sprite);
                  if (sprite) {
                    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
                    sprite.spriteFrame = hyz.whiteDot_spriteFrame;
                    sprite.customMaterial = this.material;
                    // 更新材质属性
                    this.updateProperties();
                  }
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function init() {
            return _init.apply(this, arguments);
          }
          return init;
        }()
        /**
         * 更新材质属性
         */;

        _proto.updateProperties = function updateProperties() {
          var material = this.material;
          if (this._curStep == null) {
            return;
          }
          var aspectRatio = this.getNodeSize().y / this.getNodeSize().x;
          material.setProperty("aspectRatio", aspectRatio);
          var holeShape = this._curStep.hollowParam.holeShape;
          material.setProperty("holeShape", holeShape);
          var center = this.getCenter(this._curStep.hollowParam.center);
          material.setProperty("center", center);
          var radius = this.getWidth(this._curStep.hollowParam.radius);
          material.setProperty("radius", radius);
          var rectSize = v2(this.getWidth(this._curStep.rectSize.width), this.getHeight(this._curStep.rectSize.height));
          material.setProperty("rectSize", rectSize);
          var roundCorner = this.getRound(this._curStep.hollowParam.round);
          material.setProperty("roundCorner", roundCorner);
          var opacity = this._curStep.hollowParam.opacity / 255;
          material.setProperty("opacity", opacity);
        }

        /**手动填上挖的洞 */;
        _proto.fillHollowout = function fillHollowout() {
          if (this._curStep == null) {
            return;
          }
          var _oldShape = this._curStep.holeShape;
          this._curStep.holeShape = HollowShape.None;
          this.updateProperties();
          this._curStep.holeShape = _oldShape;
        };
        //上一次的形状
        _proto.tweenTo = /*#__PURE__*/
        function () {
          var _tweenTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(step, bIsFromHide, time) {
            var _this2 = this;
            var tmpStep;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (bIsFromHide === void 0) {
                    bIsFromHide = false;
                  }
                  if (time === void 0) {
                    time = 0.2;
                  }
                  if (!(this._curStep == null || this._oldShape == HollowShape.None || bIsFromHide)) {
                    _context2.next = 18;
                    break;
                  }
                  this._oldShape = step.holeShape;
                  if (!(step.holeShape == HollowShape.None)) {
                    _context2.next = 9;
                    break;
                  }
                  this._curStep = guide_step.createWithClickGuide(step.hollowParam, step.tag);
                  this.updateProperties();
                  _context2.next = 17;
                  break;
                case 9:
                  tmpStep = guide_step.createWithClickGuide(step.hollowParam, step.tag);
                  if (tmpStep.radius) {
                    tmpStep.radius *= 2;
                  }
                  if (tmpStep.rectSize) {
                    tmpStep.rectSize.width *= 2;
                    tmpStep.rectSize.height *= 2;
                  }
                  if (tmpStep.opacity) {
                    tmpStep.opacity = 0;
                  }
                  this._curStep = tmpStep;
                  this.updateProperties();
                  _context2.next = 17;
                  return this.tweenTo(step, false, 0.2);
                case 17:
                  return _context2.abrupt("return");
                case 18:
                  if (!(step.holeShape == HollowShape.None || this._curStep.equals(step))) {
                    _context2.next = 28;
                    break;
                  }
                  this._curStep.center = step.hollowParam.center;
                  this._curStep.radius = step.hollowParam.radius;
                  this._curStep.rectSize = step.hollowParam.rectSize;
                  this._curStep.holeShape = step.hollowParam.holeShape;
                  this._curStep.opacity = step.hollowParam.opacity;
                  this._curStep.round = step.hollowParam.round;
                  this.updateProperties();
                  this._oldShape = step.holeShape;
                  return _context2.abrupt("return");
                case 28:
                  this._oldShape = step.holeShape;
                  this._curStep.hollowParam.holeShape = step.hollowParam.holeShape;
                  return _context2.abrupt("return", new Promise(function (res) {
                    // 停止进行中的缓动
                    Tween.stopAllByTarget(_this2);
                    _this2.unscheduleAllCallbacks();
                    // 完成上一个期约
                    if (_this2.tweenRes != null) {
                      _this2.tweenRes();
                    }
                    _this2.tweenRes = res;
                    // 缓动
                    tween(_this2._curStep).to(time, {
                      center: step.hollowParam.center,
                      radius: step.hollowParam.radius,
                      rectSize: step.hollowParam.rectSize,
                      holeShape: step.hollowParam.holeShape,
                      opacity: step.hollowParam.opacity,
                      round: step.hollowParam.round
                    }, {
                      onUpdate: function onUpdate(target, ratio) {
                        _this2.updateProperties();
                      }
                    }).call(function () {
                      _this2.scheduleOnce(function () {
                        if (_this2.tweenRes) {
                          _this2.tweenRes();
                          _this2.tweenRes = null;
                        }
                      });
                    }).start();
                  }));
                case 31:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function tweenTo(_x, _x2, _x3) {
            return _tweenTo.apply(this, arguments);
          }
          return tweenTo;
        }()
        /**
         * 获取中心点
         * @param center
         */;

        _proto.getCenter = function getCenter(center) {
          var trans = this.getComponent(UITransform);
          var width = trans.width;
          var height = trans.height;
          var x = (center.x + width / 2) / width,
            y = (-center.y + height / 2) / height;
          return v2(x, y);
        }

        /**
         * 获取节点尺寸
         */;
        _proto.getNodeSize = function getNodeSize() {
          var trans = this.getComponent(UITransform),
            width = trans.width,
            height = trans.height;
          return v2(width, height);
        }

        /**
         * 获取挖孔宽度
         * @param width
         */;
        _proto.getWidth = function getWidth(w) {
          var trans = this.getComponent(UITransform);
          var width = trans.width;
          return w / width;
        }

        /**
         * 获取挖孔高度
         * @param height
         */;
        _proto.getHeight = function getHeight(height) {
          var trans = this.getComponent(UITransform);
          return height / trans.width;
        }

        /**
         * 获取圆角半径
         * @param round
         */;
        _proto.getRound = function getRound(round) {
          var trans = this.getComponent(UITransform);
          return round / trans.width;
        };
        return guide_hollow;
      }(Component)) || _class) || _class) || _class) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/guide_manager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './touch_blocker.ts', './guide_step.ts', './guide_hollow.ts', './guide_tip_base.ts', './persist_nodes.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, _decorator, instantiate, Widget, error, assetManager, sys, log, isValid, Component, find, touch_blocker, guide_step, guide_hollow, guide_tip_base, getPersistNode, PersistNodeNames;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      Widget = module.Widget;
      error = module.error;
      assetManager = module.assetManager;
      sys = module.sys;
      log = module.log;
      isValid = module.isValid;
      Component = module.Component;
      find = module.find;
    }, function (module) {
      touch_blocker = module.default;
    }, function (module) {
      guide_step = module.guide_step;
    }, function (module) {
      guide_hollow = module.default;
    }, function (module) {
      guide_tip_base = module.guide_tip_base;
    }, function (module) {
      getPersistNode = module.getPersistNode;
      PersistNodeNames = module.PersistNodeNames;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "d08d06nxWdHBow04xjD4LNU", "guide_manager", undefined);
      var property = _decorator.property,
        ccclass = _decorator.ccclass;
      var GuideState = /*#__PURE__*/function (GuideState) {
        GuideState[GuideState["None"] = 0] = "None";
        GuideState[GuideState["guiding"] = 1] = "guiding";
        GuideState[GuideState["paused"] = 2] = "paused";
        GuideState[GuideState["closed"] = 3] = "closed";
        return GuideState;
      }(GuideState || {}); //标记引导是否完成了
      var _guideFinishTags = null;
      function localTags() {
        if (_guideFinishTags == null) {
          var str = sys.localStorage.getItem("_guideFinishTags");
          log("GUIDE _guideFinishTags", str);
          try {
            _guideFinishTags = JSON.parse(str);
          } catch (e) {
            _guideFinishTags = {};
          }
          if (_guideFinishTags == null) {
            _guideFinishTags = {};
          }
        }
      }

      /**
       *  新手引导
       */
      var guide_manager = exports('guide_manager', (_dec = ccclass("guide_manager"), _dec2 = property(guide_hollow), _dec3 = property(touch_blocker), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(guide_manager, _Component);
        function guide_manager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "hollowOut", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "touchBlocker", _descriptor2, _assertThisInitialized(_this));
          _this._clickSteps = [];
          _this._curStep = null;
          _this._state = GuideState.None;
          _this._tipUIs = {};
          return _this;
        }
        var _proto = guide_manager.prototype;
        /**设置步骤 */
        _proto.setSteps = function setSteps(steps) {
          this._clickSteps = steps;
          this._state = GuideState.None;
        }

        /**添加步骤到尾部 */;
        _proto.addStep = function addStep(step) {
          this._clickSteps.push(step);
        }

        /**插入步骤到下一位 */;
        _proto.insertNextStep = function insertNextStep(step) {
          this._clickSteps.unshift(step);
        };
        /**如果有下一步就进行下一步，没有就关闭引导 */
        _proto.checkGoNextStep = /*#__PURE__*/
        function () {
          var _checkGoNextStep = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var oldStep, _step$showEvent, _step$showEvent3, _oldStep$showEvent, step, _step$showEvent2, autoNext, bIsFromHide;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  oldStep = this._curStep;
                  this._curStep = null;
                  if (!(this._clickSteps.length == 0)) {
                    _context.next = 6;
                    break;
                  }
                  this.closeCurStep();
                  _context.next = 31;
                  break;
                case 6:
                  this._state = GuideState.guiding;
                  step = this._clickSteps.splice(0, 1)[0];
                  if (!(step != null && (_step$showEvent = step.showEvent) != null && _step$showEvent.onBeforeAppear)) {
                    _context.next = 12;
                    break;
                  }
                  autoNext = step == null || (_step$showEvent2 = step.showEvent) == null ? void 0 : _step$showEvent2.onBeforeAppear(step);
                  if (!autoNext) {
                    _context.next = 12;
                    break;
                  }
                  return _context.abrupt("return");
                case 12:
                  if (!guide_manager.checkHasGuideFinished(step.guideId)) {
                    _context.next = 14;
                    break;
                  }
                  return _context.abrupt("return");
                case 14:
                  bIsFromHide = false;
                  if (!this.hollowOut.node.active) {
                    bIsFromHide = true;
                  }
                  this.show();
                  this._curStep = step;
                  this.touchBlocker.blockAll(); // 屏蔽所有点击
                  //TODO: 这里还没时间查为什么在之前计算的有问题，这里要延迟一帧后才能计算出正确的位置
                  _context.next = 21;
                  return guide_manager.wait(20);
                case 21:
                  step.reset();
                  _log("GUIDE_LOG,checkGoNextStep,下一步", step.tag);
                  _context.next = 25;
                  return this.hollowOut.tweenTo(step, bIsFromHide);
                case 25:
                  if (!(step != null && (_step$showEvent3 = step.showEvent) != null && _step$showEvent3.onWillAppear)) {
                    _context.next = 29;
                    break;
                  }
                  _context.next = 28;
                  return step.showEvent.onWillAppear(step);
                case 28:
                  step.showEvent.onWillAppear = null;
                case 29:
                  this.touchBlocker.setStep(step); // 设置可点击节点

                  if (oldStep != null && (_oldStep$showEvent = oldStep.showEvent) != null && _oldStep$showEvent.onWillFinish) {
                    oldStep.showEvent.onWillFinish(oldStep);
                  }
                case 31:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function checkGoNextStep() {
            return _checkGoNextStep.apply(this, arguments);
          }
          return checkGoNextStep;
        }();
        _proto.pause = function pause() {
          this.hide();
          this._state = GuideState.paused;
        }

        /**关闭当前引导 */;
        _proto.closeCurStep = function closeCurStep() {
          var _this$_curStep;
          console.error("closeCurStep");
          if (this._state == GuideState.closed) {
            return;
          }
          this._state = GuideState.closed;
          _log("GUIDE_LOG,closeCurStep", (_this$_curStep = this._curStep) == null ? void 0 : _this$_curStep.tag, "this._clickSteps.length", this._clickSteps.length);
          var oldStep = this._curStep;
          this._curStep = null;
          if (oldStep) {
            var _oldStep$showEvent2;
            if ((_oldStep$showEvent2 = oldStep.showEvent) != null && _oldStep$showEvent2.onWillFinish) {
              oldStep.showEvent.onWillFinish(oldStep);
            }
          }
          if (this._state == GuideState.closed) {
            var _oldStep$showEvent3;
            //因为onWillFinish里可能已经checkGoNextStep了,表示是一个连贯的引导，不需要调用close
            this.hide();
            if (oldStep != null && (_oldStep$showEvent3 = oldStep.showEvent) != null && _oldStep$showEvent3.onAfterHide) {
              var _oldStep$showEvent4;
              //只有中断的引导会调用这个
              oldStep == null || (_oldStep$showEvent4 = oldStep.showEvent) == null || _oldStep$showEvent4.onAfterHide(oldStep);
            }
          }
        };
        _proto.show = function show() {
          this.node.active = true;
          this.hollowOut.node.active = true;
          this.touchBlocker.node.active = true;
        };
        _proto.hide = function hide() {
          // this.node.active = false;
          this.hollowOut.node.active = false;
          // this.touchBlocker.node.active = false;
          this.touchBlocker.passAll();
        };
        _proto.getTouchBlocker = function getTouchBlocker() {
          return this.touchBlocker.node;
        };
        guide_manager.getInstance = function getInstance() {
          var root = getPersistNode(PersistNodeNames.GuideMgr);
          if (root == null) {
            return null;
          }
          var userGuide = root.getComponentInChildren(guide_manager);
          if (userGuide == null) {
            var _node = instantiate(hyz.guidePrefab);
            _node.parent = root;
            userGuide = _node.getComponent(guide_manager);
            userGuide.getComponent(Widget).updateAlignment();
            userGuide.hollowOut.getComponent(Widget).updateAlignment();
            userGuide.touchBlocker.getComponent(Widget).updateAlignment();
            userGuide.node.active = false;
            userGuide.hollowOut.node.active = false;
            userGuide.touchBlocker.node.active = false;
          }
          return userGuide;
        };
        _proto.loadPrefab = function loadPrefab(bundleName, pfbPath) {
          return new Promise( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
            var bundle;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  bundle = assetManager.getBundle(bundleName);
                  if (!(bundle == null)) {
                    _context2.next = 5;
                    break;
                  }
                  _context2.next = 4;
                  return new Promise(function (res, rej) {
                    assetManager.loadBundle(bundleName, {}, function (err, data) {
                      if (err) {
                        rej();
                        return;
                      }
                      res(data);
                    });
                  });
                case 4:
                  bundle = _context2.sent;
                case 5:
                  if (!(bundle == null)) {
                    _context2.next = 7;
                    break;
                  }
                  return _context2.abrupt("return");
                case 7:
                  bundle.load(pfbPath, function (err, assets) {
                    if (err) {
                      error("\u52A0\u8F7Dasset\u5931\u8D25, url:" + pfbPath + ", err: " + err);
                      resolve(assets);
                    } else {
                      resolve(assets);
                    }
                  });
                case 8:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })));
        };
        /**
         * 播放一系列引导
         * @returns true表示正常播放
         */
        _proto.playGuideList = function playGuideList(arr, callbackObj) {
          var _this2 = this;
          if (!arr || arr.length == 0) {
            return false;
          }
          if (hyz.guide_manager.checkHasGuideFinished(arr[0].guideId)) {
            return false;
          }
          var tipParents = {}; //记录tipUI对应的当前显示的业务界面的节点

          var getOrCreateTipNode = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(bundleName, prefabPath) {
              var key, item, pfb, gm, node;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(!bundleName || !prefabPath)) {
                      _context3.next = 2;
                      break;
                    }
                    return _context3.abrupt("return");
                  case 2:
                    key = (bundleName != null ? bundleName : "") + ":" + prefabPath;
                    item = _this2._tipUIs[key];
                    if (!(item && isValid(item))) {
                      _context3.next = 7;
                      break;
                    }
                    item.node.active = false;
                    return _context3.abrupt("return", item);
                  case 7:
                    _context3.next = 9;
                    return _this2.loadPrefab(bundleName, prefabPath);
                  case 9:
                    pfb = _context3.sent;
                    if (!(pfb == null)) {
                      _context3.next = 13;
                      break;
                    }
                    error("引导提示UI的prefab不存在");
                    return _context3.abrupt("return");
                  case 13:
                    gm = guide_manager.getInstance();
                    if (!(gm == null)) {
                      _context3.next = 16;
                      break;
                    }
                    return _context3.abrupt("return");
                  case 16:
                    node = instantiate(pfb);
                    node.parent = gm.node;
                    _this2._tipUIs[key] = item = node.getComponent(guide_tip_base);
                    if (item == null) {
                      error("引导提示UI必须继承自 guide_tip_base");
                    }
                    item.node.active = false;
                    return _context3.abrupt("return", item);
                  case 22:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function getOrCreateTipNode(_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }();
          var checkHighLightNodeAndContinue = /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(v, func) {
              var total, interval, counting;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!(v.targetPath == null)) {
                      _context4.next = 3;
                      break;
                    }
                    //不需要查找目标对象的时候
                    if (func != null) {
                      func(false);
                    }
                    return _context4.abrupt("return");
                  case 3:
                    if (!guide_manager.isGuideComponentExist(v.targetPath)) {
                      _context4.next = 6;
                      break;
                    }
                    //查找目标对象存在的时候
                    if (func != null) {
                      func(false);
                    }
                    return _context4.abrupt("return");
                  case 6:
                    total = 5000; //最长等待时间5秒
                    interval = 20;
                    counting = 0;
                  //需要查找的时候
                  case 9:
                    if (guide_manager.isGuideComponentExist(v.targetPath)) {
                      _context4.next = 18;
                      break;
                    }
                    _context4.next = 12;
                    return guide_manager.wait(interval);
                  case 12:
                    counting += interval;
                    if (!(counting > total)) {
                      _context4.next = 16;
                      break;
                    }
                    error("查找目标对象超时:" + v.targetPath);
                    return _context4.abrupt("break", 18);
                  case 16:
                    _context4.next = 9;
                    break;
                  case 18:
                    //找到再进行下一步
                    if (func != null) {
                      func(true);
                    }
                  case 19:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function checkHighLightNodeAndContinue(_x5, _x6) {
              return _ref3.apply(this, arguments);
            };
          }();
          var step = null;
          var func;
          /**处理单项引导 */
          func = /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(idx) {
              var v, _handler;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    v = arr[idx];
                    if (!(v == null)) {
                      _context7.next = 3;
                      break;
                    }
                    return _context7.abrupt("return");
                  case 3:
                    /**创建一个step,并且添加到流程里面 */
                    _handler = function _handler(tipParent) {
                      var _v$tipPrefab;
                      if ((_v$tipPrefab = v.tipPrefab) != null && _v$tipPrefab.prefabPath) {
                        var _v$tipPrefab$bundleNa, _v$tipPrefab2, _v$tipPrefab3;
                        var key = ((_v$tipPrefab$bundleNa = (_v$tipPrefab2 = v.tipPrefab) == null ? void 0 : _v$tipPrefab2.bundleName) != null ? _v$tipPrefab$bundleNa : "") + ":" + ((_v$tipPrefab3 = v.tipPrefab) == null ? void 0 : _v$tipPrefab3.prefabPath);
                        if (tipParent) {
                          tipParents[key] = tipParent;
                        } else if (isValid(tipParents[key])) {
                          tipParent = tipParents[key]; //对于在某同一界面的后续引导，也要传递tipParent节点
                        }
                      }

                      var _highLightNode = undefined; //要高亮的节点
                      if (v.targetPath) {
                        //天鲲自定义，获取组件
                        _highLightNode = guide_manager.getGuideComponent(v.targetPath);
                        if (_highLightNode == null) {
                          _highLightNode = find(v.targetPath, tipParent);
                        }
                        if (_highLightNode == null) {
                          _highLightNode = find(v.targetPath);
                        }
                        if (_highLightNode == null) {
                          console.error("高亮节点路径不对" + v.targetPath);
                        }
                      }
                      step = guide_step.createWithHighLightNode(_highLightNode, v);
                      step.setShowEvent({
                        onBeforeAppear: function onBeforeAppear() {
                          if (callbackObj != null && callbackObj.onStepBeforeAppear) {
                            return callbackObj.onStepBeforeAppear(v);
                          }
                          return false;
                        },
                        onWillAppear: function () {
                          var _onWillAppear = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
                            var _v$tipPrefab4, _v$tipPrefab5;
                            var tipItem;
                            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                              while (1) switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return getOrCreateTipNode((_v$tipPrefab4 = v.tipPrefab) == null ? void 0 : _v$tipPrefab4.bundleName, (_v$tipPrefab5 = v.tipPrefab) == null ? void 0 : _v$tipPrefab5.prefabPath);
                                case 2:
                                  tipItem = _context5.sent;
                                  if (tipItem) {
                                    if (tipParent && !isValid(tipParent)) {
                                      tipParent = undefined;
                                    }
                                    if (_highLightNode && !isValid(_highLightNode)) {
                                      _highLightNode = null;
                                    }
                                    tipItem.initGuideTip(v, _highLightNode, tipParent);
                                    tipItem.node.active = true;
                                    _log(v.guideId, v.id, "onWillAppear,显示tipUI", v.tipPrefab, v.tipParams);
                                  }
                                  if (tipItem) {
                                    tipItem.onStepWillAppear(v);
                                  }
                                  if (callbackObj != null && callbackObj.onStepWillAppear) {
                                    callbackObj.onStepWillAppear(v, tipItem);
                                  }
                                case 6:
                                case "end":
                                  return _context5.stop();
                              }
                            }, _callee5);
                          }));
                          function onWillAppear() {
                            return _onWillAppear.apply(this, arguments);
                          }
                          return onWillAppear;
                        }(),
                        onWillFinish: function onWillFinish() {
                          var _v$tipPrefab6, _v$tipPrefab7;
                          getOrCreateTipNode((_v$tipPrefab6 = v.tipPrefab) == null ? void 0 : _v$tipPrefab6.bundleName, (_v$tipPrefab7 = v.tipPrefab) == null ? void 0 : _v$tipPrefab7.prefabPath).then(function (tipItem) {
                            if (tipItem) {
                              var _arr, _v$tipPrefab8, _arr2, _v$tipPrefab9, _arr3;
                              //下一个提示是否有同源的提示，有的话就不hide，避免闪烁
                              var nNextIsSameUI = ((_arr = arr[idx + 1]) == null || (_arr = _arr.tipPrefab) == null ? void 0 : _arr.prefabPath) == ((_v$tipPrefab8 = v.tipPrefab) == null ? void 0 : _v$tipPrefab8.prefabPath) && ((_arr2 = arr[idx + 1]) == null || (_arr2 = _arr2.tipPrefab) == null ? void 0 : _arr2.bundleName) == ((_v$tipPrefab9 = v.tipPrefab) == null ? void 0 : _v$tipPrefab9.bundleName) && ((_arr3 = arr[idx + 1]) == null ? void 0 : _arr3.tipParams);
                              if (!nNextIsSameUI) {
                                tipItem.hide();
                              }
                            }
                            if (tipItem) {
                              tipItem.onStepWillFinish(v);
                            }
                          });
                          func(idx + 1);
                          _log(v.guideId, v.id, "onWillfinish,4");
                          /**如果有连贯的下一步引导，直接开启，如果没有，先关闭，等待waitForEvent的事件 */
                          _this2.checkGoNextStep();
                          if (callbackObj != null && callbackObj.onStepWillFinish) {
                            var _v$tipPrefab10;
                            callbackObj.onStepWillFinish(v, _this2._tipUIs[(_v$tipPrefab10 = v.tipPrefab) == null ? void 0 : _v$tipPrefab10.prefabPath]);
                          }
                          if (arr[idx + 1] == null) {
                            _log(v.guideId, "onGuideFinish");
                            if (callbackObj != null && callbackObj.onGuideFinish) {
                              callbackObj.onGuideFinish(v.guideId);
                            }
                          }
                        },
                        onAfterHide: function () {
                          var _onAfterHide = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
                            var _v$tipPrefab11, _v$tipPrefab12;
                            var tipItem, _v$tipPrefab13;
                            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                              while (1) switch (_context6.prev = _context6.next) {
                                case 0:
                                  _context6.next = 2;
                                  return getOrCreateTipNode((_v$tipPrefab11 = v.tipPrefab) == null ? void 0 : _v$tipPrefab11.bundleName, (_v$tipPrefab12 = v.tipPrefab) == null ? void 0 : _v$tipPrefab12.prefabPath);
                                case 2:
                                  tipItem = _context6.sent;
                                  if (tipItem) {
                                    tipItem.onStepAfterHide(v);
                                  }
                                  if (callbackObj != null && callbackObj.onStepAfterHide) {
                                    callbackObj.onStepAfterHide(v, _this2._tipUIs[(_v$tipPrefab13 = v.tipPrefab) == null ? void 0 : _v$tipPrefab13.prefabPath]);
                                  }
                                case 5:
                                case "end":
                                  return _context6.stop();
                              }
                            }, _callee6);
                          }));
                          function onAfterHide() {
                            return _onAfterHide.apply(this, arguments);
                          }
                          return onAfterHide;
                        }()
                      });
                      _this2.addStep(step);
                      _log(v.guideId, v.id, "handler,addStep,", "id:" + v.id + ",desc:" + v.desc);
                    };
                    if (!v.waitForEvent) {
                      _context7.next = 9;
                      break;
                    }
                    _log(v.guideId, v.id, "func,1,等待事件", v.waitForEvent);
                    _this2.node.once(v.waitForEvent, function (parent) {
                      _log(v.guideId, v.id, "func,2,已触发等待事件", v.waitForEvent);
                      if (parent instanceof Component) {
                        _handler(parent.node);
                        /**等到相关事件了，开启新的引导步骤 */
                        _this2.checkGoNextStep();
                      } else {
                        _handler(parent);
                        /**等到相关事件了，开启新的引导步骤 */
                        _this2.checkGoNextStep();
                      }
                    }, _this2);
                    _context7.next = 11;
                    break;
                  case 9:
                    _context7.next = 11;
                    return checkHighLightNodeAndContinue(v, function (waiting) {
                      _log(v.guideId, v.id, "func,2,直接执行", "idx:" + idx);
                      _handler(undefined);
                      if (idx == 0 || waiting && _this2._clickSteps.length == 1) {
                        /**起个头，开始显示 */
                        _this2.checkGoNextStep();
                      }
                    });
                  case 11:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return function func(_x7) {
              return _ref4.apply(this, arguments);
            };
          }();
          func(0);
          return true;
        }

        /**
         * 异步 等待时间
         * @param millisecond
         * @returns
         */;
        guide_manager.wait = /*#__PURE__*/
        function () {
          var _wait = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(millisecond) {
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  return _context8.abrupt("return", new Promise(function (resolve, reject) {
                    setTimeout(function () {
                      resolve();
                    }, millisecond);
                  }));
                case 1:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          }));
          function wait(_x8) {
            return _wait.apply(this, arguments);
          }
          return wait;
        }()
        /**
         * 也是配置里的事件，不过是由外界业务逻辑抛出，给guide_manager接收的事件
         */;

        guide_manager.emitToSelf = function emitToSelf(eventName, parent) {
          var _gm$node;
          var gm = this.getInstance();
          if (gm == null) {
            return;
          }
          for (var _len2 = arguments.length, params = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            params[_key2 - 2] = arguments[_key2];
          }
          (_gm$node = gm.node).emit.apply(_gm$node, [eventName, parent].concat(params));
        }

        /**
         * 标记某个系列引导流程已经完成
         * @param guideId 系列引导的主id
         */;
        guide_manager.markGuideFinish = function markGuideFinish(guideId) {
          var _guideFinishTags2;
          _guideFinishTags = (_guideFinishTags2 = _guideFinishTags) != null ? _guideFinishTags2 : {};
          _guideFinishTags[guideId] = true;
          sys.localStorage.setItem("_guideFinishTags", JSON.stringify(_guideFinishTags));
          log("GUIDE _guideFinishTags,mark:", JSON.stringify(_guideFinishTags));
        }

        /**
         * 系列引导是否已经完成
         * @param guideId 系列引导的主id
         * @returns
         */;
        guide_manager.checkHasGuideFinished = function checkHasGuideFinished(guideId) {
          localTags();
          return _guideFinishTags[guideId] == true;
        };
        guide_manager.playGuideList = function playGuideList(arr, callbackObj) {
          var gm = this.getInstance();
          if (gm == null) {
            return false;
          }
          return gm.playGuideList(arr, callbackObj);
        };
        guide_manager.closeCurStep = function closeCurStep() {
          var gm = this.getInstance();
          if (gm == null) {
            return;
          }
          gm.closeCurStep();
        }

        /**屏蔽所有点击（只屏蔽点击，跟遮罩无关） */;
        guide_manager.blockAllTouch = function blockAllTouch() {
          var gm = this.getInstance();
          if (gm == null) {
            return;
          }
          gm.touchBlocker.node.active = true;
          gm.touchBlocker.blockAll();
        }

        /**手动填上挖的洞 */;
        guide_manager.fillHollowout = function fillHollowout() {
          var gm = this.getInstance();
          if (gm == null) {
            return;
          }
          gm.hollowOut.fillHollowout();
        }

        /////////////////////////////////////////注册的引导组件

        //已注册的对象
        ;
        //注册引导对象
        guide_manager.registerGuideComponent = function registerGuideComponent(key, node) {
          if (node == null) {
            return;
          }
          guide_manager.allGuideComponent.set(key, node);
        };
        guide_manager.unregisterGuideComponent = function unregisterGuideComponent(key) {
          guide_manager.allGuideComponent["delete"](key);
        };
        guide_manager.isGuideComponentRegistered = function isGuideComponentRegistered(node) {
          var uuid = node.uuid;
          for (var _iterator = _createForOfIteratorHelperLoose(guide_manager.allGuideComponent), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              key = _step$value[0],
              guideNode = _step$value[1];
            if (guideNode != null) {
              if (guideNode.uuid == uuid) {
                return [true, key];
              }
            }
          }
          return [false, null];
        };
        guide_manager.unregisterGuideComponentByNode = function unregisterGuideComponentByNode(node) {
          var _guide_manager$isGuid = guide_manager.isGuideComponentRegistered(node),
            isRegistered = _guide_manager$isGuid[0],
            key = _guide_manager$isGuid[1];
          if (isRegistered && key != null) {
            guide_manager.allGuideComponent["delete"](key);
          }
        };
        guide_manager.getGuideComponent = function getGuideComponent(name) {
          var node = guide_manager.allGuideComponent.get(name);
          if (node == null) {
            return null;
          }
          return node;
        };
        guide_manager.isGuideComponentExist = function isGuideComponentExist(key) {
          var exist = guide_manager.allGuideComponent.has(key);
          if (!exist) {
            return false;
          }
          var node = guide_manager.allGuideComponent.get(key);
          if (node == null) {
            return false;
          }
          if (!isValid(node)) {
            return false;
          }
          return true;
        };
        return guide_manager;
      }(Component), _class3.event_guide_emit = "event_guide_emit", _class3.allGuideComponent = new Map(), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hollowOut", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "touchBlocker", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      function _log(a) {
        for (var _len3 = arguments.length, b = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          b[_key3 - 1] = arguments[_key3];
        }
        log.apply(void 0, ["GUIDE_LOG", a].concat(b));
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/guide_step.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './function.ts'], function (exports) {
  var _createClass, cclegacy, v2, isValid, UITransform, assert, v3, size, Vec2, _funcs;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      v2 = module.v2;
      isValid = module.isValid;
      UITransform = module.UITransform;
      assert = module.assert;
      v3 = module.v3;
      size = module.size;
      Vec2 = module.Vec2;
    }, function (module) {
      _funcs = module._funcs;
    }],
    execute: function () {
      cclegacy._RF.push({}, "59ab1fUpT9DM4FeWY3Tkqhh", "guide_step", undefined);

      /** 镂空形状 */
      var HollowShape = exports('HollowShape', /*#__PURE__*/function (HollowShape) {
        HollowShape[HollowShape["None"] = 0] = "None";
        HollowShape[HollowShape["Circle"] = 1] = "Circle";
        HollowShape[HollowShape["Rect"] = 2] = "Rect";
        HollowShape[HollowShape["Hex"] = 3] = "Hex";
        return HollowShape;
      }({})); // /**图片遮罩 */
      // SpriteMask = 4,
      var ClickCloseType = exports('ClickCloseType', /*#__PURE__*/function (ClickCloseType) {
        ClickCloseType[ClickCloseType["close_by_click_bg"] = 0] = "close_by_click_bg";
        ClickCloseType[ClickCloseType["close_by_click_highlight"] = 1] = "close_by_click_highlight";
        ClickCloseType[ClickCloseType["no_close"] = 2] = "no_close";
        return ClickCloseType;
      }({}));
      var guide_step = exports('guide_step', /*#__PURE__*/function () {
        function guide_step(clickType, tag) {
          if (tag === void 0) {
            tag = 0;
          }
          /**标记step所在的系列引导 */
          this.guideId = 0;
          /**标记step用 */
          this.tag = 0;
          /**高亮节点 */
          this.node = null;
          /**配置 */
          this.cfg = null;
          /**
           * hyz.IConfigGuide.clickType
           ** 0：点击任意处关闭
           ** 1：点击高亮处自动关闭
           ** 2：点击任意处都不会自动关闭 */
          this.clickType = ClickCloseType.close_by_click_bg;
          this._showEvent = void 0;
          /**镂空形状 */
          this._holeShape = void 0;
          /**中心点 */
          this._center = void 0;
          /**形状大小（中心点离边的距离） */
          this._radius = void 0;
          /**矩形大小 */
          this._rectSize = size(0, 0);
          /**圆角半径 */
          this.round = 0;
          /**背景透明度 */
          this.opacity = 200;
          this._vertexArr = [];
          this.clickType = clickType != null ? clickType : ClickCloseType.close_by_click_bg;
          this.tag = tag;
        }
        /**按钮点击引导 */
        guide_step.createWithClickGuide = function createWithClickGuide(param, tag) {
          var _param$holeShape, _param$round, _param$opacity;
          if (tag === void 0) {
            tag = 0;
          }
          var step = new guide_step(ClickCloseType.close_by_click_highlight, tag);
          step._holeShape = (_param$holeShape = param.holeShape) != null ? _param$holeShape : HollowShape.Rect;
          step._center = param.center;
          step._radius = param.radius;
          if (param.rectSize) {
            step._rectSize = param.rectSize.clone();
          }
          step.round = (_param$round = param.round) != null ? _param$round : 0;
          step.opacity = (_param$opacity = param.opacity) != null ? _param$opacity : 200;
          step._updateVertex();
          return step;
        }

        /**对一个节点的位置进行挖洞 */;
        guide_step.createWithBtnNode = function createWithBtnNode(node, tag) {
          if (tag === void 0) {
            tag = 0;
          }
          var pt = node.getWorldPosition();
          var trans = hyz.guide_manager.getInstance().node.getComponent(UITransform);
          if (trans == null) {
            return;
          }
          pt = trans.convertToNodeSpaceAR(pt);
          var uiTrans = node.getComponent(UITransform);
          if (uiTrans == null) {
            return;
          }
          var contentSize = uiTrans.contentSize.clone();
          var _scele = v3(1, 1, 1);
          node.getWorldScale(_scele);
          contentSize.width *= _scele.x;
          contentSize.height *= _scele.y;
          var step = guide_step.createWithClickGuide({
            holeShape: hyz.HollowShape.Rect,
            center: v2(pt.x, pt.y),
            radius: contentSize.width * 0.5 * 1.414,
            rectSize: contentSize,
            round: 10
          }, tag);
          return step;
        }

        /**没有按钮点击，即任何点击事件都算完成本次引导 */;
        guide_step.createWithoutClick = function createWithoutClick(node, tag) {
          if (node === void 0) {
            node = null;
          }
          if (tag === void 0) {
            tag = 0;
          }
          var step;
          if (isValid(node)) {
            step = guide_step.createWithBtnNode(node, tag);
          } else {
            step = new guide_step(ClickCloseType.close_by_click_bg, tag);
            step._center = v2(0, 0);
            step._radius = 0;
            step.round = 0;
            step.opacity = 200;
            step._holeShape = HollowShape.None;
          }
          return step;
        }

        /**
         *
         * @param node 高亮节点
         * @param cfg 配置
         */;
        guide_step.createWithHighLightNode = function createWithHighLightNode(node, cfg) {
          var _cfg$hollowoutParam$r, _cfg$hollowoutParam, _cfg$hollowoutParam$o, _cfg$hollowoutParam2;
          if (node === void 0) {
            node = null;
          }
          var _shape = HollowShape.Rect;
          var _center = v2(0, 0);
          var _radius = 0;
          var _round = (_cfg$hollowoutParam$r = (_cfg$hollowoutParam = cfg.hollowoutParam) == null ? void 0 : _cfg$hollowoutParam.round) != null ? _cfg$hollowoutParam$r : 10;
          var _opacity = (_cfg$hollowoutParam$o = (_cfg$hollowoutParam2 = cfg.hollowoutParam) == null ? void 0 : _cfg$hollowoutParam2.opacity) != null ? _cfg$hollowoutParam$o : 200;
          var _rectSize = null;
          if (node && isValid(node)) {
            var _cfg$hollowoutParam3;
            var pt = node.getWorldPosition();
            var trans = hyz.guide_manager.getInstance().node.getComponent(UITransform);
            pt = trans.convertToNodeSpaceAR(pt);
            trans = node.getComponent(UITransform);
            assert(trans != null, "高亮节点一定要有UItransform组件");
            var contentSize = trans.contentSize.clone();
            var _scele = v3(1, 1, 1);
            node.getWorldScale(_scele);
            contentSize.width *= _scele.x;
            contentSize.height *= _scele.y;
            _center = v2(pt.x, pt.y);
            _radius = contentSize.width * 0.5 * 1.414;
            _rectSize = contentSize;
            var margin = cfg == null || (_cfg$hollowoutParam3 = cfg.hollowoutParam) == null ? void 0 : _cfg$hollowoutParam3.margin;
            if (margin != null && margin.left) {
              _rectSize.width += margin == null ? void 0 : margin.left;
              _center.x -= (margin == null ? void 0 : margin.left) * 0.5;
            }
            if (margin != null && margin.right) {
              _rectSize.width += margin == null ? void 0 : margin.right;
              _center.x += (margin == null ? void 0 : margin.right) * 0.5;
            }
            if (margin != null && margin.top) {
              _rectSize.height += margin == null ? void 0 : margin.top;
              _center.y += (margin == null ? void 0 : margin.top) * 0.5;
            }
            if (margin != null && margin.bottom) {
              _rectSize.height += margin == null ? void 0 : margin.bottom;
              _center.y -= (margin == null ? void 0 : margin.bottom) * 0.5;
            }
          } else {
            _shape = HollowShape.None;
          }
          var step = new guide_step(cfg.clickType, cfg.id);
          step.guideId = cfg.guideId;
          step.node = node;
          step.cfg = cfg;
          step._holeShape = _shape;
          step._center = _center;
          step._radius = _radius;
          if (_rectSize) {
            step._rectSize = _rectSize.clone();
          }
          step.round = _round;
          step.opacity = _opacity;
          step._updateVertex();
          return step;
        }

        //重新计算
        ;

        var _proto = guide_step.prototype;
        _proto.reset = function reset() {
          var _this$cfg$hollowoutPa, _this$cfg$hollowoutPa2, _this$cfg$hollowoutPa3, _this$cfg$hollowoutPa4;
          if (this.node == null || this.cfg == null) {
            return;
          }
          var _shape = HollowShape.Rect;
          var _center = v2(0, 0);
          var _radius = 0;
          var _round = (_this$cfg$hollowoutPa = (_this$cfg$hollowoutPa2 = this.cfg.hollowoutParam) == null ? void 0 : _this$cfg$hollowoutPa2.round) != null ? _this$cfg$hollowoutPa : 10;
          var _opacity = (_this$cfg$hollowoutPa3 = (_this$cfg$hollowoutPa4 = this.cfg.hollowoutParam) == null ? void 0 : _this$cfg$hollowoutPa4.opacity) != null ? _this$cfg$hollowoutPa3 : 200;
          var _rectSize = null;
          if (this.node && isValid(this.node)) {
            var _this$cfg;
            var pt = this.node.getWorldPosition();
            var trans = hyz.guide_manager.getInstance().getTouchBlocker().getComponent(UITransform);
            pt = trans.convertToNodeSpaceAR(pt);
            trans = this.node.getComponent(UITransform);
            assert(trans != null, "高亮节点一定要有UItransform组件");
            var contentSize = trans.contentSize.clone();
            var _scele = v3(1, 1, 1);
            this.node.getWorldScale(_scele);
            contentSize.width *= _scele.x;
            contentSize.height *= _scele.y;
            _center = v2(pt.x, pt.y);
            _radius = contentSize.width * 0.5 * 1.414;
            _rectSize = contentSize;
            var margin = (_this$cfg = this.cfg) == null || (_this$cfg = _this$cfg.hollowoutParam) == null ? void 0 : _this$cfg.margin;
            if (margin != null && margin.left) {
              _rectSize.width += margin == null ? void 0 : margin.left;
              _center.x -= (margin == null ? void 0 : margin.left) * 0.5;
            }
            if (margin != null && margin.right) {
              _rectSize.width += margin == null ? void 0 : margin.right;
              _center.x += (margin == null ? void 0 : margin.right) * 0.5;
            }
            if (margin != null && margin.top) {
              _rectSize.height += margin == null ? void 0 : margin.top;
              _center.y += (margin == null ? void 0 : margin.top) * 0.5;
            }
            if (margin != null && margin.bottom) {
              _rectSize.height += margin == null ? void 0 : margin.bottom;
              _center.y -= (margin == null ? void 0 : margin.bottom) * 0.5;
            }
          }
          this._holeShape = _shape;
          this._center = _center;
          this._radius = _radius;
          if (_rectSize) {
            this._rectSize = _rectSize.clone();
          }
          this.round = _round;
          this.opacity = _opacity;
          this._updateVertex();
        };
        _proto.setShowEvent = function setShowEvent(event) {
          this._showEvent = event;
          return this;
        }

        /**是否有点击引导 */;
        _proto.checkHasClick = function checkHasClick() {
          return this.holeShape != HollowShape.None;
        };
        _proto._updateVertex = function _updateVertex() {
          this._vertexArr = [];
          var _borderNum = 4;
          if (this.holeShape == HollowShape.Hex) {
            _borderNum = 6;
          }
          var interval = 360 / _borderNum;
          var realRadius = this.radius;
          var angle = 0;
          if (_borderNum % 2 == 0) {
            angle = -interval / 2;
          }
          var angleArr = [angle];
          for (var i = 1; i < _borderNum; i++) {
            angle += interval;
            angleArr.push(angle);
          }
          for (var _i = 0; _i < angleArr.length; _i++) {
            angle = angleArr[_i];
            this._vertexArr[_i] = v2(realRadius * Math.sin(angle / 180 * 3.14) + this.center.x, realRadius * Math.cos(angle / 180 * 3.14) + this.center.y);
          }
          if (this.holeShape == HollowShape.Rect && !this.rectSize.equals(size(0, 0))) {
            this._vertexArr = [];
            var pts = [v2(-0.5, 0.5), v2(0.5, 0.5), v2(0.5, -0.5), v2(-0.5, -0.5)];
            if (this.node && isValid(this.node)) {
              var trans = this.node.getComponent(UITransform);
              if (trans != null) {
                var anchor = trans.anchorPoint;
                pts = [v2(anchor.x - 1, anchor.y), v2(anchor.x, anchor.y), v2(anchor.x, anchor.y - 1), v2(anchor.x - 1, anchor.y - 1)];
              }
            }
            for (var _i2 = 0; _i2 < 4; _i2++) {
              this._vertexArr[_i2] = v2(this.rectSize.width * pts[_i2].x + this.center.x, this.rectSize.height * pts[_i2].y + this.center.y);
            }
          }
        };
        _proto.getVerterArr = function getVerterArr() {
          return this._vertexArr;
        };
        _proto.checkContain = function checkContain(pt) {
          if (this.holeShape == HollowShape.Circle) {
            var dis = Vec2.distance(pt, this.center);
            return dis < this.radius;
          } else if (this.holeShape == HollowShape.Rect || this.holeShape == HollowShape.Hex) {
            var arr = this.getVerterArr();
            return _funcs.checkPolygonContainPoint(pt, arr) == -1;
          }
          return false;
        };
        _proto.equals = function equals(step) {
          if (this.holeShape != step.holeShape) {
            return false;
          }
          if (Math.abs(this.center.x - step.center.x) > 0.001 || Math.abs(this.center.y - step.center.y) > 0.001) {
            return false;
          }
          if (this.holeShape == HollowShape.Rect) {
            if (this.rectSize == null && step.rectSize != null || this.rectSize != null && step.rectSize == null) {
              return false;
            }
            if (this.rectSize != null && (Math.abs(this.rectSize.width - step.rectSize.width) > 0.001 || Math.abs(this.rectSize.height - step.rectSize.height) > 0.001)) {
              return false;
            }
          }
          if (this.opacity != step.opacity) {
            return false;
          }
          if (this.round != step.round) {
            return false;
          }
          return true;
        };
        _createClass(guide_step, [{
          key: "showEvent",
          get: function get() {
            return this._showEvent;
          }
        }, {
          key: "holeShape",
          get: function get() {
            return this._holeShape;
          },
          set: function set(val) {
            if (this._holeShape != val) {
              this._updateVertex();
              this._holeShape = val;
            }
          }
        }, {
          key: "center",
          get: function get() {
            return this._center;
          },
          set: function set(val) {
            if (this._center != val) {
              this._updateVertex();
              this._center = val;
            }
          }
        }, {
          key: "radius",
          get: function get() {
            return this._radius;
          },
          set: function set(val) {
            if (this._radius != val) {
              this._updateVertex();
              this._radius = val;
            }
          }
        }, {
          key: "rectSize",
          get: function get() {
            return this._rectSize;
          },
          set: function set(val) {
            if (!this._rectSize.equals(val)) {
              this._updateVertex();
              this._rectSize.set(val);
            }
          }
        }, {
          key: "hollowParam",
          get: function get() {
            return this;
          }
        }]);
        return guide_step;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/guide_tip_base.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
    }],
    execute: function () {
      cclegacy._RF.push({}, "65831uuj1tIPrcWF/ZE7mSe", "guide_tip_base", undefined);

      /**引导步骤的额外提示UI的参数 */
      var guide_tip_base = exports('guide_tip_base', /*#__PURE__*/function (_Component) {
        _inheritsLoose(guide_tip_base, _Component);
        function guide_tip_base() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = guide_tip_base.prototype;
        /**
         *
         * @param parent 当前弹窗（如果是弹窗，这个依赖于waitForEvent传的参数）
         * @param highLightNode 当前高亮节点
         * @param params
         */
        _proto.initGuideTip = function initGuideTip(cfg, highLightNode, parent) {
          throw new Error("子类必须实现initGuideTip方法");
        };
        _proto.onStepWillAppear = function onStepWillAppear(cfg) {};
        _proto.onStepWillFinish = function onStepWillFinish(cfg) {};
        _proto.onStepAfterHide = function onStepAfterHide(cfg) {};
        _proto.hide = function hide() {
          this.node.active = false;
        };
        return guide_tip_base;
      }(Component));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/hyz_export.ts", ['cc', './guide_manager.ts', './guide_tip_base.ts', './guide_step.ts', './guide_config.ts', './function.ts'], function (exports) {
  var cclegacy, ImageAsset, Texture2D, SpriteFrame;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      ImageAsset = module.ImageAsset;
      Texture2D = module.Texture2D;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      exports('guide_manager', module.guide_manager);
    }, function (module) {
      exports('guide_tip_base', module.guide_tip_base);
    }, function (module) {
      var _setter = {};
      _setter.ClickCloseType = module.ClickCloseType;
      _setter.HollowShape = module.HollowShape;
      _setter.guide_step = module.guide_step;
      exports(_setter);
    }, function (module) {
      exports('guide_config', module.guide_config);
    }, function (module) {
      exports('_funcs', module._funcs);
    }],
    execute: function () {
      cclegacy._RF.push({}, "79985YFOYhDyp/6env21LMh", "hyz_export", undefined);
      var data = {
        picData: new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255]),
        width: 2,
        height: 2
      };
      var img = new ImageAsset();
      img.reset({
        _data: data.picData,
        width: data.width,
        height: data.height,
        format: Texture2D.PixelFormat.RGBA8888,
        _compressed: false
      });
      var texture = new Texture2D();
      texture.image = img;
      var frame = new SpriteFrame();
      frame.texture = texture;
      frame.packable = false;
      frame.ensureMeshData();
      var whiteDot_texture = exports('whiteDot_texture', texture);
      var whiteDot_spriteFrame = exports('whiteDot_spriteFrame', frame);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/hyz_init.ts", ['cc', './hyz_export.ts'], function () {
  var cclegacy, director, Director, assetManager, error, EffectAsset, Prefab, hyz_export;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      Director = module.Director;
      assetManager = module.assetManager;
      error = module.error;
      EffectAsset = module.EffectAsset;
      Prefab = module.Prefab;
    }, function (module) {
      hyz_export = module;
    }],
    execute: function () {
      cclegacy._RF.push({}, "da51biL59lLHordMrOiZ0QY", "hyz_init", undefined);
      var self = window;
      self["hyz"] = hyz_export;
      var _hyz = hyz_export;
      director.once(Director.EVENT_AFTER_SCENE_LAUNCH, function () {
        {
          assetManager.loadBundle("guide", {}, function (err, bundle) {
            if (err) {
              error("guide bundle不存在");
              return;
            }
            bundle.load("hyz/guide/effect/hollow", EffectAsset, function (err, result) {
              if (err) {
                error("hyz/guide/effect/hollow.effect not exist");
                return;
              }
              _hyz.hollowEffect = result;
            });
            bundle.load("hyz/guide/pfb_guide_manager", Prefab, function (err, result) {
              if (err) {
                error("hyz/guide/pfb_guide_manager.prefab not exist");
                return;
              }
              _hyz.guidePrefab = result;
            });
          });
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/persist_nodes.ts", ['cc'], function (exports) {
  var cclegacy, v2, Node, find, Layers, director, UITransform, Widget;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      v2 = module.v2;
      Node = module.Node;
      find = module.find;
      Layers = module.Layers;
      director = module.director;
      UITransform = module.UITransform;
      Widget = module.Widget;
    }],
    execute: function () {
      exports('getPersistNode', getPersistNode);
      var _zOrder;
      cclegacy._RF.push({}, "bd0c8Z0RhdDU4EDNcpPWC8+", "persist_nodes", undefined);

      ///全局常驻节点的枚举
      var PersistNodeNames = exports('PersistNodeNames', /*#__PURE__*/function (PersistNodeNames) {
        PersistNodeNames["PopuMgr"] = "PopuMgr";
        PersistNodeNames["GuideMgr"] = "GuideMgr";
        PersistNodeNames["ToastMgr"] = "ToastMgr";
        PersistNodeNames["LoadingTip"] = "LoadingTip";
        PersistNodeNames["SoundMgr"] = "SoundMgr";
        PersistNodeNames["GlobalScheduler"] = "GlobalScheduler";
        PersistNodeNames["GlobalAni"] = "GlobalAni";
        PersistNodeNames["AudioNode"] = "AudioNode";
        return PersistNodeNames;
      }({}));
      var zOrder = (_zOrder = {}, _zOrder[PersistNodeNames.PopuMgr] = 1, _zOrder[PersistNodeNames.GuideMgr] = 2, _zOrder[PersistNodeNames.ToastMgr] = 4, _zOrder[PersistNodeNames.LoadingTip] = 5, _zOrder);
      var _globalNode = null;
      /**
       * 获得或者生成常驻节点
       */
      function getPersistNode(type, offset, size) {
        if (offset === void 0) {
          offset = v2(0, 0);
        }
        if (size === void 0) {
          size = null;
        }
        if (_globalNode == null) {
          _globalNode = new Node("_globalNode");
          var guiRoot = find("gui");
          _globalNode.setParent(guiRoot);
          _globalNode.setSiblingIndex(100);
          _globalNode.layer = Layers.Enum.UI_2D;
          _addWidget(_globalNode);

          // let cameraNode = new Node("cameraNode")
          // cameraNode.parent = _globalNode;
          // let camera = cameraNode.addComponent(Camera);
          // camera.visibility = Layers.Enum.UI_2D|Layers.Enum.UI_3D|Layers.Enum.DEFAULT;
          // camera.clearFlags = Camera.ClearFlag.SOLID_COLOR;
          // camera.clearColor = Color.BLACK;
          // camera.far = 2000;
          // camera.projection = renderer.scene.CameraProjection.ORTHO;
          // camera.near = 0;
          // camera.priority= 1073741824 + 1;

          // canvas.cameraComponent = camera;

          {
            director.addPersistRootNode(_globalNode);
          }
        }
        // let screenSize = view.getVisibleSize();

        // _globalNode.addComponent(UITransform).setContentSize(screenSize);
        _globalNode.setPosition(0, 0);
        var ret = _globalNode.getChildByName(type);
        if (!ret) {
          ret = new Node(type);
          var zindex = zOrder[type] || 0;
          _globalNode.addChild(ret);
          ret.setSiblingIndex(zindex);
        }
        if (offset) {
          ret.setPosition(offset.x, offset.y);
        }
        if (size) {
          var uiTran = ret.getComponent(UITransform);
          if (uiTran == null) {
            uiTran = ret.addComponent(UITransform);
          }
          uiTran.contentSize = size;
        } else {
          _addWidget(ret);
        }
        return ret;
      }
      function _addWidget(node) {
        var widget = node.getComponent(Widget) || node.addComponent(Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = 0;
        widget.right = 0;
        widget.top = 0;
        widget.bottom = 0;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/touch_blocker.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, director, Director, find, Camera, NodeEventType, UITransform, Vec3, Vec2, size, v3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      director = module.director;
      Director = module.Director;
      find = module.find;
      Camera = module.Camera;
      NodeEventType = module.NodeEventType;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Vec2 = module.Vec2;
      size = module.size;
      v3 = module.v3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "71437kWdHVCmLmmcgwncIi7", "touch_blocker", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var touch_blocker = exports('default', (_dec = property(Sprite), ccclass(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(touch_blocker, _Component);
        function touch_blocker() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          /**
           * 拦截状态
           */
          _this.isBlockAll = false;
          /**
           * 放行状态
           */
          _this.isPassAll = false;
          _this._camera = null;
          _initializerDefineProperty(_this, "debugSpr", _descriptor, _assertThisInitialized(_this));
          _this._curStep = null;
          return _this;
        }
        var _proto = touch_blocker.prototype;
        _proto.onLoad = function onLoad() {
          this.registerEvent();
          this._camera = find("gui/UICamera").getComponent(Camera);
        }

        /**
         * 生命周期：节点开始
         */;
        _proto.start = function start() {}

        /**
         * 生命周期：销毁
         */;
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvent();
        }

        /**
         * 注册事件
         */;
        _proto.registerEvent = function registerEvent() {
          this.node.on(NodeEventType.TOUCH_START, this.onTouchEvent, this);
          this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchEvent, this);
          this.node.on(NodeEventType.TOUCH_END, this.onTouchEvent, this);
        }

        /**
         * 反注册事件
         */;
        _proto.unregisterEvent = function unregisterEvent() {
          this.node.targetOff(this);
        }

        /**
         * 事件回调
         * @param event 事件
         */;
        _proto.onTouchEvent = function onTouchEvent(event) {
          // 全部放行状态
          if (this.isPassAll) {
            event.preventSwallow = true;
            return;
          }
          // 拦截状态并且无目标
          if (this.isBlockAll || !this._curStep) {
            event.preventSwallow = false;
            event.propagationImmediateStopped = true;
            event.propagationStopped = true;
            return;
          }
          if (this._curStep.clickType == hyz.ClickCloseType.close_by_click_bg) {
            event.preventSwallow = false;
            event.propagationImmediateStopped = true;
            event.propagationStopped = true;
            if (event.type == NodeEventType.TOUCH_END) {
              hyz.guide_manager.closeCurStep();
            }
            return;
          }
          if (isJustLaunchNewScene) {
            //也拦截所有
            event.preventSwallow = false;
            event.propagationImmediateStopped = true;
            event.propagationStopped = true;
            return;
          }
          // 点击是否命中目标节点
          var pt = event.getLocation();
          var _node = event.target;
          var trans = _node.getComponent(UITransform);
          if (trans == null) {
            return;
          }
          var screenPos = new Vec3(pt.x, pt.y, 0);
          var pos = this._camera.screenToWorld(screenPos);
          pos = trans.convertToNodeSpaceAR(pos);
          var pos2 = new Vec2(pos.x, pos.y);
          var isContains = this._curStep.checkContain(pos2);
          if (isContains) {
            //点击到了目标节点
            event.preventSwallow = true;
            if (this._curStep.clickType == hyz.ClickCloseType.close_by_click_highlight) {
              if (event.type == NodeEventType.TOUCH_END) {
                hyz.guide_manager.closeCurStep();
              }
            }
          } else {
            event.preventSwallow = false;
            event.propagationImmediateStopped = true;
            event.propagationStopped = true;
          }
        }

        /**
         * 屏蔽所有点击
         */;
        _proto.blockAll = function blockAll() {
          this.isBlockAll = true;
          this.isPassAll = false;
        }

        /**
         * 放行所有点击
         */;
        _proto.passAll = function passAll() {
          this.isPassAll = true;
          this.isBlockAll = false;
        };
        _proto.setStep = function setStep(step) {
          this._curStep = step;
          this.isBlockAll = false;
          this.isPassAll = false;
          if (this.debugSpr) {
            if (!this._curStep.rectSize.equals(size(0, 0))) {
              var trans = this.debugSpr.getComponent(UITransform);
              if (trans != null) {
                trans.setContentSize(this._curStep.rectSize);
              }
            }
            this.debugSpr.node.worldPosition = v3(this._curStep.center.x, this._curStep.center.y, 0);
          }
        };
        return touch_blocker;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "debugSpr", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      //为避免这个时候点击block关闭引导，而业务逻辑那里又不能相应的触发，从而导致引导没有衔接上
      var isJustLaunchNewScene = true;
      var timeId;
      director.on(Director.EVENT_AFTER_SCENE_LAUNCH, function () {
        isJustLaunchNewScene = true;
        clearTimeout(timeId);
        timeId = setTimeout(function () {
          isJustLaunchNewScene = false;
        }, 1000);
      });
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/guide', 'chunks:///_virtual/guide'); 
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