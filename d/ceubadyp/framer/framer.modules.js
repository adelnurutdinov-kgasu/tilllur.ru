require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PreviewClass1":[function(require,module,exports){
var Assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assets = require("Preview_Assets");

exports.PreviewClass1 = (function(superClass) {
  extend(PreviewClass1, superClass);

  function PreviewClass1(options) {
    this.options = options != null ? options : {};
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    this.logSize = bind(this.logSize, this);
    this.viewWidth = bind(this.viewWidth, this);
    this.viewSize = bind(this.viewSize, this);
    this.screenSize = bind(this.screenSize, this);
    _.defaults(this.options, {
      name: "Preview",
      view: null,
      backgroundColor: null,
      borderRadius: 42,
      assets: Assets.data
    });
    PreviewClass1.__super__.constructor.call(this, this.options);
    window.savePreviewMessageFramerObject(this);
    this.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
  }

  PreviewClass1.define('view', {
    get: function() {
      return this.options.view;
    },
    set: function(value) {
      this.options.view = value;
      this.width = this.view.width;
      this.height = this.view.height;
      return this.view.parent = this;
    }
  });

  PreviewClass1.define('assets', {
    get: function() {
      return this.options.assets;
    }
  });

  PreviewClass1.prototype.screenSize = function(w, h) {
    return Screen.width === w && Screen.height === h;
  };

  PreviewClass1.prototype.viewSize = function(w, h) {
    return this.width === w && this.height === h;
  };

  PreviewClass1.prototype.viewWidth = function(w) {
    return this.width === w;
  };

  PreviewClass1.prototype.logSize = function() {
    return new TextLayer({
      text: Screen.width + "x" + Screen.height,
      y: Align.center
    });
  };

  PreviewClass1.prototype.animateStateToNormal = function() {
    return this.animate("normal", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  PreviewClass1.prototype.animateStateToFill = function() {
    return this.animate("fill", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  PreviewClass1.prototype.stateSwitchToNormal = function() {
    return this.stateSwitch("normal");
  };

  PreviewClass1.prototype.stateSwitchToFill = function() {
    return this.stateSwitch("fill");
  };

  return PreviewClass1;

})(Layer);


},{"Preview_Assets":"Preview_Assets"}],"PreviewClass2":[function(require,module,exports){
var PreviewClass1,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass1 = require("PreviewClass1").PreviewClass1;

exports.PreviewClass2 = (function(superClass) {
  extend(PreviewClass2, superClass);

  function PreviewClass2(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createClassicAndroidStatusBar = bind(this.createClassicAndroidStatusBar, this);
    this.createAndroidStatusBar = bind(this.createAndroidStatusBar, this);
    this.createBars = bind(this.createBars, this);
    _.defaults(this.options, {
      statusBar: "dark",
      homeBar: "dark",
      visible: true,
      forceAndroidBar: false,
      prototypeCreationYear: "20:20"
    });
    PreviewClass2.__super__.constructor.call(this, this.options);
  }

  PreviewClass2.define('statusBar', {
    get: function() {
      return this.options.statusBar;
    },
    set: function(value) {
      return this.options.statusBar = value;
    }
  });

  PreviewClass2.define('homeBar', {
    get: function() {
      return this.options.homeBar;
    },
    set: function(value) {
      return this.options.homeBar = value;
    }
  });

  PreviewClass2.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  PreviewClass2.define('visible', {
    get: function() {
      if (this.options.visible) {
        return 1;
      } else {
        return 0;
      }
    },
    set: function(value) {
      return this.options.visible = value;
    }
  });

  PreviewClass2.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
    }
  });

  PreviewClass2.prototype.createBars = function() {
    var topBar;
    topBar = new Layer({
      parent: this,
      width: this.width,
      y: Align.top,
      name: ".status bar",
      opacity: this.visible,
      backgroundColor: null
    });
    if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926) || this.viewSize(360, 782)) {
      this.createNotchStatusBar(topBar);
      return this.createHomeIndicator(new Layer({
        parent: this,
        width: this.width,
        height: 34,
        y: Align.bottom,
        name: ".home bar",
        opacity: this.visible,
        backgroundColor: null
      }));
    } else if (this.viewSize(375, 667) || this.viewSize(414, 736) || this.viewSize(320, 568)) {
      return this.createClassicStatusBar(topBar);
    } else if (this.forceAndroidBar) {
      return this.createClassicAndroidStatusBar(topBar);
    } else {
      return this.createAndroidStatusBar(topBar);
    }
  };

  PreviewClass2.prototype.createAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 32;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left(4),
      y: Align.top(2 + 5),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right(-4),
      y: Align.top(5),
      image: this.assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createClassicAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 20;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.top(2),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right,
      y: Align.top(),
      image: this.assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createClassicStatusBar = function(barLayer) {
    var classicCenterComponent, classicLeftComponent, classicRightomponent;
    barLayer.height = 20;
    classicLeftComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.left,
      image: this.assets.oldStatusBarLeftImage[this.statusBar]
    });
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 12,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: this.assets.oldStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createNotchStatusBar = function(barLayer) {
    var notchCenterComponent, notchLeftComponent, notchRightComponent;
    barLayer.height = 44;
    notchLeftComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 21,
      x: Align.left(21),
      y: Align.top(12),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      letterSpacing: -0.17,
      fontSize: 15,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    notchCenterComponent = new Layer({
      parent: barLayer,
      width: 375,
      height: barLayer.height,
      x: Align.center,
      image: this.assets.notch
    });
    return notchRightComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: this.assets.statusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createHomeIndicator = function(barLayer) {
    var homeIndicator;
    return homeIndicator = new Layer({
      parent: barLayer,
      width: 135,
      height: 5,
      x: Align.center,
      y: Align.bottom(-8),
      backgroundColor: this.assets.color[this.homeBar],
      borderRadius: 20
    });
  };

  return PreviewClass2;

})(PreviewClass1);


},{"PreviewClass1":"PreviewClass1"}],"PreviewClass3":[function(require,module,exports){
var LogoLayer, PreviewClass2,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LogoLayer = require("Preview_LogoLayer").LogoLayer;

PreviewClass2 = require("PreviewClass2").PreviewClass2;

exports.PreviewClass3 = (function(superClass) {
  extend(PreviewClass3, superClass);

  function PreviewClass3(options) {
    this.options = options != null ? options : {};
    this.createScaleButton = bind(this.createScaleButton, this);
    this.createLogoButton = bind(this.createLogoButton, this);
    _.defaults(this.options, PreviewClass3.__super__.constructor.call(this, this.options));
  }

  PreviewClass3.prototype.createLogoButton = function() {
    var logoButton, openHomeHandler;
    openHomeHandler = function() {
      return window.location = "https://tilllur.com";
    };
    return logoButton = new LogoLayer({
      width: 76,
      height: 32,
      x: Align.left(32),
      y: Align.top(12),
      handler: openHomeHandler
    });
  };

  PreviewClass3.prototype.createScaleButton = function(forState) {
    var buttonInsideLayer, buttonScale, updateButtonOnResize;
    buttonScale = new Layer({
      size: 48,
      borderRadius: 48,
      x: Align.right(-32),
      y: Align.bottom(-32),
      backgroundColor: "rgba(255,255,255, 0.1)",
      borderWidth: 2,
      custom: {
        preview: this
      }
    });
    buttonScale.style = {
      cursor: "pointer"
    };
    buttonScale.states = {
      "normal": {
        borderColor: "rgba(255,255,255, 0.2)"
      },
      "fill": {
        borderColor: "rgba(255,255,255, 0.6)"
      }
    };
    buttonScale.stateSwitch(forState);
    buttonInsideLayer = new Layer({
      parent: buttonScale,
      borderWidth: 2,
      size: 28,
      borderRadius: 22,
      x: 10,
      y: 10,
      backgroundColor: null
    });
    buttonInsideLayer.states = {
      "normal": {
        borderColor: "rgba(255,255,255, 0.6)"
      },
      "fill": {
        borderColor: "rgba(255,255,255, 0.2)"
      }
    };
    buttonInsideLayer.stateSwitch(forState);
    buttonScale.onTap(function() {
      var nextState;
      if (this.states.current.name === "fill") {
        nextState = "normal";
      } else {
        nextState = "fill";
      }
      this.stateSwitch(nextState);
      this.children[0].stateSwitch(nextState);
      return this.custom.preview.animate(nextState, {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      });
    });
    updateButtonOnResize = (function(_this) {
      return function(buttonLayer) {
        var localButton;
        localButton = buttonLayer;
        Canvas.on("change:height", function() {
          return buttonLayer.x = Align.right(-32);
        });
        return Canvas.on("change:width", function() {
          return buttonLayer.y = Align.bottom(-32);
        });
      };
    })(this);
    return updateButtonOnResize(buttonScale);
  };

  return PreviewClass3;

})(PreviewClass2);


},{"PreviewClass2":"PreviewClass2","Preview_LogoLayer":"Preview_LogoLayer"}],"PreviewClass4":[function(require,module,exports){
var PreviewClass3,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass3 = require("PreviewClass3").PreviewClass3;

exports.PreviewClass4 = (function(superClass) {
  extend(PreviewClass4, superClass);

  function PreviewClass4(options) {
    this.options = options != null ? options : {};
    this.getStateGeneric = bind(this.getStateGeneric, this);
    this.setCustomPreview = bind(this.setCustomPreview, this);
    this.previewMobile = bind(this.previewMobile, this);
    this.updatePreviewOnResize = bind(this.updatePreviewOnResize, this);
    this.previewDesktop = bind(this.previewDesktop, this);
    this.setDesktopScaleMode = bind(this.setDesktopScaleMode, this);
    this.updateScaleState = bind(this.updateScaleState, this);
    this.scalePreview = bind(this.scalePreview, this);
    _.defaults(this.options, PreviewClass4.__super__.constructor.call(this, this.options));
    this.scalePreview();
  }

  PreviewClass4.prototype.scalePreview = function() {
    if (Utils.isMobile()) {
      return this.previewMobile();
    } else {
      this.updateScaleState();
      this.setDesktopScaleMode();
      this.previewDesktop();
      return this.updatePreviewOnResize();
    }
  };

  PreviewClass4.prototype.updateScaleState = function() {
    var scaleX, scaleY;
    scaleX = (Canvas.width - 112) / this.width;
    scaleY = (Canvas.height - 112) / this.height;
    return this.states.fill.scale = Math.min(scaleX, scaleY);
  };

  PreviewClass4.prototype.setDesktopScaleMode = function(forState) {
    var initState, shouldShowButton, shouldShowLogo;
    if (forState == null) {
      forState = "normal";
    }
    initState = this.getStateGeneric("scale", [
      {
        value: "fill",
        result: "fill"
      }, {
        value: "normal",
        result: "normal"
      }, {
        value: "true",
        result: "fill"
      }
    ], forState);
    shouldShowButton = this.getStateGeneric("button", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], true);
    shouldShowLogo = this.getStateGeneric("logo", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], true);
    if (shouldShowLogo) {
      this.createLogoButton();
    }
    if (shouldShowButton) {
      this.createScaleButton(initState);
    }
    return this.stateSwitch(initState);
  };

  PreviewClass4.prototype.previewDesktop = function() {
    Canvas.backgroundColor = "222";
    this.createBars();
    this.center();
    return this.clip = true;
  };

  PreviewClass4.prototype.updatePreviewOnResize = function() {
    var localPreview;
    localPreview = this;
    Canvas.on("change:height", (function(_this) {
      return function() {
        localPreview.x = Align.center;
        return localPreview.updateScaleState();
      };
    })(this));
    return Canvas.on("change:width", (function(_this) {
      return function() {
        localPreview.y = Align.center;
        return localPreview.updateScaleState();
      };
    })(this));
  };

  PreviewClass4.prototype.previewMobile = function() {
    var previewCanvas;
    previewCanvas = new BackgroundLayer({
      backgroundColor: "222",
      name: ".hiddenPreviewCanvas"
    });
    this.clip = false;
    this.center();
    this.originY = 0.5;
    this.originX = 0.5;
    if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926)) {
      return this.scale = Screen.width / this.width;
    } else {
      return this.setCustomPreview();
    }
  };

  PreviewClass4.prototype.setCustomPreview = function() {
    var tip;
    this.y = Align.top;
    this.originY = 0.1;
    this.scale = (Screen.height - 120) / this.height;
    this.borderRadius = 20;
    this.clip = true;
    return tip = new Layer({
      width: 240,
      height: 44,
      image: this.assets.tip,
      x: Align.center,
      y: Align.bottom(-30),
      opacity: 0.5
    });
  };

  PreviewClass4.prototype.getStateGeneric = function(stateKey, statePairs, defaultResult) {
    var i, item, j, keyPart, keyValuePair, len, len1, pair, ref, result, valuePart;
    if (stateKey == null) {
      stateKey = "scale";
    }
    if (statePairs == null) {
      statePairs = [];
    }
    if (defaultResult == null) {
      defaultResult = "";
    }
    result = defaultResult;
    ref = location.search.slice(1).split('&');
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      keyValuePair = item.split("=");
      keyPart = keyValuePair[0];
      valuePart = keyValuePair[1];
      if (keyPart === stateKey) {
        for (j = 0, len1 = statePairs.length; j < len1; j++) {
          pair = statePairs[j];
          if (valuePart === pair.value) {
            result = pair.result;
          }
        }
      }
    }
    return result;
  };

  return PreviewClass4;

})(PreviewClass3);


},{"PreviewClass3":"PreviewClass3"}],"PreviewClass5":[function(require,module,exports){
var PreviewClass4,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass4 = require("PreviewClass4").PreviewClass4;

exports.PreviewClass5 = (function(superClass) {
  extend(PreviewClass5, superClass);

  function PreviewClass5(options) {
    var controlPanelLayer;
    this.options = options != null ? options : {};
    this.addSectionTitle = bind(this.addSectionTitle, this);
    this.addSectionButton = bind(this.addSectionButton, this);
    this.addSection = bind(this.addSection, this);
    controlPanelLayer = new Layer({
      width: 360,
      height: 1000,
      x: 20,
      y: 60,
      backgroundColor: null
    });
    _.defaults(this.options, {
      controlPanel: controlPanelLayer
    });
    PreviewClass5.__super__.constructor.call(this, this.options);
    controlPanelLayer.parent = this.parent;
  }

  PreviewClass5.define('controlPanel', {
    get: function() {
      return this.options.controlPanel;
    },
    set: function(value) {
      return this.options.controlPanel = value;
    }
  });

  PreviewClass5.prototype.addSection = function(title, actionArray) {
    var actionItem, i, index, len, results, sectionButton, sectionView, sumX;
    if (actionArray == null) {
      actionArray = [];
    }
    if (Utils.isMobile()) {

    } else {
      sectionView = new Layer({
        width: 360,
        height: 100,
        parent: this.controlPanel,
        backgroundColor: null
      });
      sectionView.y = (this.controlPanel.children.length - 1) * 100;
      this.addSectionTitle(title).parent = sectionView;
      sumX = 0;
      results = [];
      for (index = i = 0, len = actionArray.length; i < len; index = ++i) {
        actionItem = actionArray[index];
        sectionButton = this.addSectionButton(actionItem);
        sectionButton.parent = sectionView;
        sectionButton.x = sumX;
        results.push(sumX += sectionButton.width + 8);
      }
      return results;
    }
  };

  PreviewClass5.prototype.addSectionButton = function(actionItem, pV, pH) {
    var buttonLayer;
    if (pV == null) {
      pV = 6;
    }
    if (pH == null) {
      pH = 9;
    }
    buttonLayer = new TextLayer({
      text: actionItem.title,
      y: 42,
      padding: {
        top: pV,
        bottom: pV + 2,
        left: pH,
        right: pH
      },
      fontSize: 18,
      fontWeight: 500,
      color: "white",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 8
    });
    buttonLayer.on(Events.Tap, actionItem.handler);
    return buttonLayer;
  };

  PreviewClass5.prototype.addSectionTitle = function(title) {
    if (title == null) {
      title = "Header Title";
    }
    return new TextLayer({
      text: title,
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: 0.6,
      padding: {
        top: 12
      }
    });
  };

  return PreviewClass5;

})(PreviewClass4);


},{"PreviewClass4":"PreviewClass4"}],"PreviewClass6":[function(require,module,exports){
var PreviewClass5,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass5 = require("PreviewClass5").PreviewClass5;

exports.PreviewClass6 = (function(superClass) {
  extend(PreviewClass6, superClass);

  function PreviewClass6(options) {
    var treeViewLayer;
    this.options = options != null ? options : {};
    this.printNode = bind(this.printNode, this);
    this.printTree = bind(this.printTree, this);
    treeViewLayer = new ScrollComponent({
      width: 320,
      height: 0,
      scrollVertical: true,
      scrollHorizontal: false,
      mouseWheelEnabled: true,
      backgroundColor: "#222"
    });
    treeViewLayer.content.height = 0;
    treeViewLayer.mouseWheelEnabled = true;
    _.defaults(this.options, {
      treeView: treeViewLayer,
      indent: 1
    });
    PreviewClass6.__super__.constructor.call(this, this.options);
    treeViewLayer.parent = this.parent;
  }

  PreviewClass6.define('treeView', {
    get: function() {
      return this.options.treeView;
    },
    set: function(value) {
      return this.options.treeView = value;
    }
  });

  PreviewClass6.define('indent', {
    get: function() {
      return this.options.indent;
    },
    set: function(value) {
      return this.options.indent = value;
    }
  });

  PreviewClass6.prototype.printTree = function() {
    print(this.view.children);
    this.printNode(this.view);
    this.treeView.height = Screen.height;
    return this.treeView.updateContent();
  };

  PreviewClass6.prototype.printNode = function(node, level) {
    var childNode, i, layerName, len, nextLevel, ref, results, treeNodeLayer;
    if (level == null) {
      level = 0;
    }
    if (node.name === "") {
      layerName = "Untitled";
    } else {
      layerName = node.name;
    }
    treeNodeLayer = new TextLayer({
      parent: this.treeView.content,
      text: Array(level + 1).join(" ・ ") + (" " + layerName),
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: layerName === "Untitled" ? 0.5 : 1,
      height: 28,
      y: this.treeView.height,
      backgroundColor: null,
      custom: {
        layer: node
      }
    });
    treeNodeLayer.onTap(function() {
      return print(this.custom.layer.name + " x: " + this.custom.layer.x + " y: " + this.custom.layer.y + " size: " + this.custom.layer.width + "x" + this.custom.layer.height);
    });
    this.treeView.height += 28;
    if (node.children.length > 0) {
      nextLevel = level + 1;
      ref = node.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        childNode = ref[i];
        results.push(this.printNode(childNode, nextLevel));
      }
      return results;
    }
  };

  return PreviewClass6;

})(PreviewClass5);


},{"PreviewClass5":"PreviewClass5"}],"PreviewComponentAssets":[function(require,module,exports){
exports.data = {
  color: {
    dark: "#000",
    light: "#FFF"
  },
  statusBarRightImage: {
    dark: "modules/PreviewComponentAssets/statusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/statusBar_right_light.png"
  },
  oldStatusBarLeftImage: {
    dark: "modules/PreviewComponentAssets/oldStatusBar_left_dark.png",
    light: "modules/PreviewComponentAssets/oldStatusBar_left_light.png"
  },
  oldStatusBarRightImage: {
    dark: "modules/PreviewComponentAssets/oldStatusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/oldStatusBar_right_light.png"
  },
  androidStatusBarRightImage: {
    dark: "modules/PreviewComponentAssets/androidStatusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/androidStatusBar_right_light.png"
  },
  notch: "modules/PreviewComponentAssets/statusBar_notch.png"
};


},{}],"PreviewComponent":[function(require,module,exports){
var FixPreviewExport, PreviewClass6,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

PreviewClass6 = require("PreviewClass6").PreviewClass6;

FixPreviewExport = (function(superClass) {
  extend(FixPreviewExport, superClass);

  function FixPreviewExport() {
    return FixPreviewExport.__super__.constructor.apply(this, arguments);
  }

  return FixPreviewExport;

})(PreviewClass6);

exports.Preview = (function(superClass) {
  extend(Preview, superClass);

  function Preview() {
    return Preview.__super__.constructor.apply(this, arguments);
  }

  return Preview;

})(FixPreviewExport);

window.savePreviewMessageFramerObject = function (layer) {
	window.previewMessageFramerObject = layer
}
;

window.receiveMessageNormal = function (event) {
	window.previewMessageFramerObject.animateStateToNormal()
}
window.addEventListener("animateNormal", receiveMessageNormal, false);
;

window.receiveMessage = function (event) {
	console.log(event)
	window.previewMessageFramerObject.animateStateToFill()
}
window.addEventListener("animateFill", receiveMessage, false);
;


},{"PreviewClass6":"PreviewClass6"}],"Preview_Assets":[function(require,module,exports){
exports.data = {
  color: {
    dark: "#000",
    light: "#FFF"
  },
  statusBarRightImage: {
    dark: "modules/PreviewComponentAssets/statusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/statusBar_right_light.png"
  },
  oldStatusBarLeftImage: {
    dark: "modules/PreviewComponentAssets/oldStatusBar_left_dark.png",
    light: "modules/PreviewComponentAssets/oldStatusBar_left_light.png"
  },
  oldStatusBarRightImage: {
    dark: "modules/PreviewComponentAssets/oldStatusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/oldStatusBar_right_light.png"
  },
  androidStatusBarRightImage: {
    dark: "modules/PreviewComponentAssets/androidStatusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/androidStatusBar_right_light.png"
  },
  notch: "modules/PreviewComponentAssets/statusBar_notch.png",
  tip: "modules/PreviewComponentAssets/tip.png"
};


},{}],"Preview_LogoLayer":[function(require,module,exports){
var getLogo,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.LogoLayer = (function(superClass) {
  extend(LogoLayer, superClass);

  function LogoLayer(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      opacity: 0.5,
      handler: null,
      svg: getLogo("FFF")
    });
    LogoLayer.__super__.constructor.call(this, this.options);
    this.style = {
      cursor: "pointer"
    };
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
  }

  LogoLayer.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  LogoLayer.prototype.Hover = function() {
    return this.opacity = 0.8;
  };

  LogoLayer.prototype.HoverOff = function() {
    return this.opacity = 0.5;
  };

  return LogoLayer;

})(SVGLayer);

getLogo = function(withColor) {
  var selectedColor;
  selectedColor = "#FFFFFF";
  return "<svg width=\"76\" height=\"32\" viewBox=\"0 0 76 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M2.79199 21.6C2.79199 21.168 2.90399 20.408 3.12799 19.32L4.39999 12.84H2.98399L3.07999 12.12C4.99999 11.544 6.88799 10.552 8.74399 9.14398H9.89599L9.31999 11.76H11.192L10.976 12.84H9.12799L7.90399 19.32C7.69599 20.312 7.59199 20.976 7.59199 21.312C7.59199 22.08 7.92799 22.544 8.59999 22.704C8.43999 23.248 8.07199 23.68 7.49599 24C6.91999 24.32 6.22399 24.48 5.40799 24.48C4.59199 24.48 3.95199 24.224 3.48799 23.712C3.02399 23.2 2.79199 22.496 2.79199 21.6Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M17.5599 22.68C17.0639 23.88 16.0239 24.48 14.4399 24.48C13.6239 24.48 12.9599 24.2 12.4479 23.64C12.0159 23.144 11.7999 22.648 11.7999 22.152C11.7999 20.856 12.0959 18.944 12.6879 16.416L13.5759 11.76L18.4479 11.28L16.9839 18.864C16.7119 20.048 16.5759 20.848 16.5759 21.264C16.5759 22.176 16.9039 22.648 17.5599 22.68ZM14.0079 8.42398C14.0079 7.79998 14.2639 7.31998 14.7759 6.98398C15.3039 6.64798 15.9439 6.47998 16.6959 6.47998C17.4479 6.47998 18.0479 6.64798 18.4959 6.98398C18.9599 7.31998 19.1919 7.79998 19.1919 8.42398C19.1919 9.04798 18.9359 9.51998 18.4239 9.83998C17.9279 10.16 17.3039 10.32 16.5519 10.32C15.7999 10.32 15.1839 10.16 14.7039 9.83998C14.2399 9.51998 14.0079 9.04798 14.0079 8.42398Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M26.0606 22.68C25.5646 23.88 24.5246 24.48 22.9406 24.48C22.1406 24.48 21.4846 24.2 20.9726 23.64C20.5566 23.176 20.3486 22.68 20.3486 22.152C20.3486 20.952 20.6286 19.04 21.1886 16.416L22.9406 7.19998L27.8126 6.71998L25.4846 18.864C25.2126 20.048 25.0766 20.848 25.0766 21.264C25.0766 22.176 25.4046 22.648 26.0606 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M34.5618 22.68C34.0658 23.88 33.0258 24.48 31.4418 24.48C30.6418 24.48 29.9858 24.2 29.4738 23.64C29.0578 23.176 28.8498 22.68 28.8498 22.152C28.8498 20.952 29.1298 19.04 29.6898 16.416L31.4418 7.19998L36.3138 6.71998L33.9858 18.864C33.7138 20.048 33.5778 20.848 33.5778 21.264C33.5778 22.176 33.9058 22.648 34.5618 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M43.0631 22.68C42.5671 23.88 41.5271 24.48 39.9431 24.48C39.1431 24.48 38.4871 24.2 37.9751 23.64C37.5591 23.176 37.3511 22.68 37.3511 22.152C37.3511 20.952 37.6311 19.04 38.1911 16.416L39.9431 7.19998L44.8151 6.71998L42.4871 18.864C42.2151 20.048 42.0791 20.848 42.0791 21.264C42.0791 22.176 42.4071 22.648 43.0631 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M53.5323 22.992C52.7643 23.984 51.4283 24.48 49.5243 24.48C48.5323 24.48 47.6763 24.184 46.9563 23.592C46.2363 22.984 45.8763 22.248 45.8763 21.384C45.8763 20.904 45.9003 20.544 45.9483 20.304L47.5563 11.76L52.4283 11.28L50.6763 20.544C50.6123 20.896 50.5803 21.176 50.5803 21.384C50.5803 22.312 50.8603 22.776 51.4203 22.776C52.0443 22.776 52.5803 22.352 53.0283 21.504C53.1723 21.232 53.2763 20.92 53.3403 20.568L55.0443 11.76L59.7723 11.28L57.9963 20.64C57.9483 20.88 57.9243 21.128 57.9243 21.384C57.9243 21.64 57.9963 21.912 58.1403 22.2C58.2843 22.472 58.5883 22.64 59.0523 22.704C58.9563 23.088 58.7403 23.408 58.4043 23.664C57.7003 24.208 56.9643 24.48 56.1963 24.48C55.4443 24.48 54.8443 24.344 54.3963 24.072C53.9483 23.8 53.6603 23.44 53.5323 22.992Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M69.2947 17.256C69.8707 16.232 70.1587 15.2 70.1587 14.16C70.1587 13.472 69.9107 13.128 69.4147 13.128C69.0307 13.128 68.6387 13.456 68.2387 14.112C67.8227 14.768 67.5507 15.52 67.4227 16.368L66.1747 24L61.2067 24.48L63.6547 11.76L67.6147 11.28L67.1827 13.704C67.9667 12.088 69.2387 11.28 70.9987 11.28C71.9267 11.28 72.6387 11.52 73.1347 12C73.6467 12.48 73.9027 13.216 73.9027 14.208C73.9027 15.184 73.5747 15.984 72.9187 16.608C72.2787 17.232 71.4067 17.544 70.3027 17.544C69.8227 17.544 69.4867 17.448 69.2947 17.256Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};


},{}],"layerBase":[function(require,module,exports){
var arrow, banner, bg, bottomBar, colored, cycler, figmaView, header, headerLayer, i, item, layer, layerShadow, len, logo, newsBg, newsFakeTitle, newsFooter, newsHeader, newsItems, nextState, nextStateHandler, panel, sceneLayers, sceneStates, statusBar, texts, verticals, zenBottom, zenCard, zenFade, zenFakeSource, zenImage, zenMenu, zenText, zenTitle;

figmaView = new Layer({
  name: "figmaView",
  x: 0,
  y: 0,
  width: 360,
  height: 640,
  opacity: 1,
  backgroundColor: "rgba(242.24999696016312, 242.24999696016312, 242.24999696016312, 1)"
});

header = new Layer({
  name: "header",
  parent: figmaView,
  x: 0,
  y: 24,
  width: 360,
  opacity: 1,
  image: "images/figma/header.png"
});

header.states = {
  "base": {
    height: 270
  },
  "overLayer": {
    height: 270
  },
  "scrolled": {
    height: 274
  }
};

bg = new Layer({
  name: "bg",
  parent: header,
  x: 0,
  y: 0,
  width: 360,
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 1)"
});

bg.states = {
  "base": {
    height: 268
  },
  "overLayer": {
    height: 268
  },
  "scrolled": {
    height: 92
  }
};

colored = new Layer({
  name: "colored",
  parent: header,
  x: 0,
  width: 360,
  height: 72,
  opacity: 1,
  image: "images/figma/colored.png"
});

colored.states = {
  "base": {
    y: 196
  },
  "overLayer": {
    y: 196
  },
  "scrolled": {
    y: 22
  }
};

verticals = new Layer({
  name: "verticals",
  parent: header,
  x: 0,
  width: 360,
  height: 72,
  opacity: 1,
  image: "images/figma/verticals.png"
});

verticals.states = {
  "base": {
    y: 196
  },
  "overLayer": {
    y: 196
  },
  "scrolled": {
    y: 43
  }
};

texts = new Layer({
  name: "texts",
  parent: header,
  x: 0,
  width: 360,
  height: 14,
  image: "images/figma/texts.png"
});

texts.states = {
  "base": {
    y: 241,
    opacity: 1
  },
  "overLayer": {
    y: 241,
    opacity: 1
  },
  "scrolled": {
    y: 88,
    opacity: 0
  }
};

panel = new Layer({
  name: "panel",
  parent: header,
  x: 0,
  width: 360,
  height: 40,
  image: "images/figma/panel.png"
});

panel.states = {
  "base": {
    y: 156,
    opacity: 1
  },
  "overLayer": {
    y: 156,
    opacity: 1
  },
  "scrolled": {
    y: 3,
    opacity: 0
  }
};

arrow = new Layer({
  name: "arrow",
  parent: header,
  x: 0,
  width: 360,
  height: 56,
  opacity: 1,
  image: "images/figma/arrow.png"
});

arrow.states = {
  "base": {
    y: 100
  },
  "overLayer": {
    y: 100
  },
  "scrolled": {
    y: 0
  }
};

logo = new Layer({
  name: "logo",
  parent: header,
  x: 0,
  width: 360,
  height: 100,
  image: "images/figma/logo.png"
});

logo.states = {
  "base": {
    y: 0,
    opacity: 1
  },
  "overLayer": {
    y: 0,
    opacity: 1
  },
  "scrolled": {
    y: -100,
    opacity: 0
  }
};

banner = new Layer({
  name: "banner",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 76,
  opacity: 1,
  image: "images/figma/banner.png"
});

banner.states = {
  "base": {
    y: 294
  },
  "overLayer": {
    y: 294
  },
  "scrolled": {
    y: 120
  }
};

statusBar = new Layer({
  name: "statusBar",
  parent: figmaView,
  x: 0,
  y: 0,
  width: 360,
  height: 24,
  opacity: 1,
  image: "images/figma/statusBar.png"
});

zenCard = new Layer({
  name: "zenCard",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 430,
  opacity: 1,
  image: "images/figma/zenCard.png"
});

zenCard.states = {
  "base": {
    y: 378
  },
  "overLayer": {
    y: 378
  },
  "scrolled": {
    y: 204
  }
};

zenImage = new Layer({
  name: "zenImage",
  parent: zenCard,
  x: 0,
  y: 0,
  width: 360,
  height: 430,
  opacity: 1,
  image: "images/figma/zenImage.png"
});

zenFade = new Layer({
  name: "zenFade",
  parent: zenCard,
  x: 0,
  y: 0,
  width: 360,
  height: 430,
  backgroundColor: "rgba(9.000000413507223, 9.000000413507223, 9.000000413507223, 1)"
});

zenFade.states = {
  "base": {
    opacity: 1
  },
  "overLayer": {
    opacity: 1
  },
  "scrolled": {
    opacity: 0
  }
};

zenMenu = new Layer({
  name: "zenMenu",
  parent: zenCard,
  x: 316,
  y: 8,
  width: 28,
  height: 28,
  image: "images/figma/zenMenu.png"
});

zenMenu.states = {
  "base": {
    opacity: 0
  },
  "overLayer": {
    opacity: 0
  },
  "scrolled": {
    opacity: 1
  }
};

zenTitle = new Layer({
  name: "zenTitle",
  parent: zenCard,
  x: 16,
  width: 312,
  height: 48,
  opacity: 1,
  image: "images/figma/zenTitle.png"
});

zenTitle.states = {
  "base": {
    y: 38
  },
  "overLayer": {
    y: 38
  },
  "scrolled": {
    y: 243
  }
};

zenText = new Layer({
  name: "zenText",
  parent: zenCard,
  x: 16,
  width: 312,
  height: 60,
  image: "images/figma/zenText.png"
});

zenText.states = {
  "base": {
    y: 94,
    opacity: 0.7
  },
  "overLayer": {
    y: 94,
    opacity: 0.7
  },
  "scrolled": {
    y: 299,
    opacity: 1
  }
};

zenBottom = new Layer({
  name: "zenBottom",
  parent: zenCard,
  x: 0,
  y: 366,
  width: 344,
  height: 64,
  opacity: 1,
  image: "images/figma/zenBottom.png"
});

zenFakeSource = new Layer({
  name: "zenFakeSource",
  parent: zenCard,
  x: 16,
  y: 16,
  width: 228,
  height: 14,
  image: "images/figma/zenFakeSource.png"
});

zenFakeSource.states = {
  "base": {
    opacity: 1
  },
  "overLayer": {
    opacity: 1
  },
  "scrolled": {
    opacity: 0
  }
};

layer = new Layer({
  name: "layer",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 640,
  opacity: 1,
  backgroundColor: "transparent"
});

layer.states = {
  "base": {
    y: 0
  },
  "overLayer": {
    y: 0
  },
  "scrolled": {
    y: 400
  }
};

layerShadow = new Layer({
  name: "layerShadow",
  parent: layer,
  x: 0,
  y: 424,
  width: 360,
  height: 164,
  opacity: 1,
  image: "images/figma/layerShadow.png"
});

newsBg = new Layer({
  name: "newsBg",
  parent: layer,
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 1)"
});

newsBg.states = {
  "base": {
    x: 6,
    y: 475,
    width: 348,
    height: 418
  },
  "overLayer": {
    x: 0,
    y: 24,
    width: 360,
    height: 570
  },
  "scrolled": {
    x: 6,
    y: 475,
    width: 348,
    height: 418
  }
};

newsFakeTitle = new Layer({
  name: "newsFakeTitle",
  parent: layer,
  x: 0,
  width: 360,
  height: 16,
  image: "images/figma/newsFakeTitle.png"
});

newsFakeTitle.states = {
  "base": {
    y: 487,
    opacity: 1
  },
  "overLayer": {
    y: 188,
    opacity: 0
  },
  "scrolled": {
    y: 487,
    opacity: 1
  }
};

newsFooter = new Layer({
  name: "newsFooter",
  parent: layer,
  opacity: 1,
  image: "images/figma/newsFooter.png"
});

newsFooter.states = {
  "base": {
    x: 6,
    y: 850.3,
    width: 348,
    height: 42.5
  },
  "overLayer": {
    x: 0,
    y: 554,
    width: 360,
    height: 44
  },
  "scrolled": {
    x: 6,
    y: 850.3,
    width: 348,
    height: 42.5
  }
};

newsItems = new Layer({
  name: "newsItems",
  parent: layer,
  opacity: 1,
  image: "images/figma/newsItems.png"
});

newsItems.states = {
  "base": {
    x: 6,
    y: 502.5,
    width: 348.0,
    height: 348.0
  },
  "overLayer": {
    x: 0,
    y: 194,
    width: 360.0,
    height: 360.0
  },
  "scrolled": {
    x: 6,
    y: 502.5,
    width: 348.0,
    height: 348.0
  }
};

newsHeader = new Layer({
  name: "newsHeader",
  parent: layer,
  image: "images/figma/newsHeader.png"
});

newsHeader.states = {
  "base": {
    x: 6,
    y: 432.9,
    width: 348,
    height: 69.6,
    opacity: 0
  },
  "overLayer": {
    x: 0,
    y: 122,
    width: 360,
    height: 72,
    opacity: 1
  },
  "scrolled": {
    x: 6,
    y: 432.9,
    width: 348,
    height: 69.6,
    opacity: 0
  }
};

headerLayer = new Layer({
  name: "headerLayer",
  parent: layer,
  image: "images/figma/headerLayer.png"
});

headerLayer.states = {
  "base": {
    x: 6,
    y: 375.6,
    width: 348,
    height: 92.8,
    opacity: 0
  },
  "overLayer": {
    x: 0,
    y: 24,
    width: 360,
    height: 96,
    opacity: 1
  },
  "scrolled": {
    x: 6,
    y: 375.6,
    width: 348,
    height: 92.8,
    opacity: 0
  }
};

bottomBar = new Layer({
  name: "bottomBar",
  parent: figmaView,
  x: 0,
  y: 592,
  width: 360,
  height: 48,
  opacity: 1,
  image: "images/figma/bottomBar.png"
});

sceneStates = ["base", "overLayer", "scrolled"];

sceneLayers = [figmaView, header, bg, colored, verticals, texts, panel, arrow, logo, banner, statusBar, zenCard, zenImage, zenFade, zenMenu, zenTitle, zenText, zenBottom, zenFakeSource, layer, layerShadow, newsBg, newsFakeTitle, newsFooter, newsItems, newsHeader, headerLayer, bottomBar];

for (i = 0, len = sceneLayers.length; i < len; i++) {
  item = sceneLayers[i];
  try {
    item.stateSwitch(sceneStates[0]);
  } catch (error1) {}
}

cycler = Utils.cycle(sceneStates);

nextState = cycler();

nextStateHandler = function() {
  var error, j, len1, results;
  nextState = cycler();
  results = [];
  for (j = 0, len1 = sceneLayers.length; j < len1; j++) {
    item = sceneLayers[j];
    try {
      results.push(item.animate(nextState, {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      }));
    } catch (error1) {
      error = error1;
    }
  }
  return results;
};

figmaView.on(Events.Click, function() {
  return nextStateHandler();
});

sceneStates = ["base", "overLayer"];

cycler = Utils.cycle(sceneStates);

nextState = cycler();

figmaView.clip = true;

newsBg.states.base.borderRadius = 8;

newsBg.states.overLayer.borderRadius = 0;

newsBg.states.scrolled.borderRadius = 8;

newsBg.stateSwitch(nextState);

zenCard.title = "zenCard";

exports.layers = {
  "figmaView": figmaView,
  "bottomBar": bottomBar,
  "layer": layer,
  "title": zenTitle,
  "text": zenText,
  "source": zenFakeSource
};

exports.sceneLayers = function() {
  return sceneLayers;
};

exports.sceneStates = function() {
  return sceneStates;
};

zenFade.opacity = 0.7;


},{}],"layerNewAlert":[function(require,module,exports){
var alerts, arrow, banner, bg, bottomBar, colored, cycler, figmaView, header, headerLayer, i, item, layer, layerShadow, len, logo, newsBg, newsFakeTitle, newsFooter, newsHeader, newsItems, nextState, nextStateHandler, panel, sceneLayers, sceneStates, statusBar, texts, verticals, zenBottom, zenCard, zenFade, zenFakeSource, zenImage, zenMenu, zenText, zenTitle;

figmaView = new Layer({
  name: "figmaView",
  x: 0,
  y: 0,
  width: 360,
  height: 640,
  opacity: 1,
  backgroundColor: "rgba(242.24999696016312, 242.24999696016312, 242.24999696016312, 1)"
});

header = new Layer({
  name: "header",
  parent: figmaView,
  x: 0,
  y: 24,
  width: 360,
  opacity: 1,
  image: "images/figma/header.png"
});

header.states = {
  "base": {
    height: 270
  },
  "overLayer": {
    height: 270
  },
  "scrolled": {
    height: 274
  }
};

bg = new Layer({
  name: "bg",
  parent: header,
  x: 0,
  y: 0,
  width: 360,
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 1)"
});

bg.states = {
  "base": {
    height: 268
  },
  "overLayer": {
    height: 268
  },
  "scrolled": {
    height: 92
  }
};

colored = new Layer({
  name: "colored",
  parent: header,
  x: 0,
  width: 360,
  height: 72,
  opacity: 1,
  image: "images/figma/colored.png"
});

colored.states = {
  "base": {
    y: 196
  },
  "overLayer": {
    y: 196
  },
  "scrolled": {
    y: 22
  }
};

verticals = new Layer({
  name: "verticals",
  parent: header,
  x: 0,
  width: 360,
  height: 72,
  opacity: 1,
  image: "images/figma/verticals.png"
});

verticals.states = {
  "base": {
    y: 196
  },
  "overLayer": {
    y: 196
  },
  "scrolled": {
    y: 43
  }
};

texts = new Layer({
  name: "texts",
  parent: header,
  x: 0,
  width: 360,
  height: 14,
  image: "images/figma/texts.png"
});

texts.states = {
  "base": {
    y: 241,
    opacity: 1
  },
  "overLayer": {
    y: 241,
    opacity: 1
  },
  "scrolled": {
    y: 88,
    opacity: 0
  }
};

panel = new Layer({
  name: "panel",
  parent: header,
  x: 0,
  width: 360,
  height: 40,
  image: "images/figma/panel.png"
});

panel.states = {
  "base": {
    y: 156,
    opacity: 1
  },
  "overLayer": {
    y: 156,
    opacity: 1
  },
  "scrolled": {
    y: 3,
    opacity: 0
  }
};

arrow = new Layer({
  name: "arrow",
  parent: header,
  x: 0,
  width: 360,
  height: 56,
  opacity: 1,
  image: "images/figma/arrow.png"
});

arrow.states = {
  "base": {
    y: 100
  },
  "overLayer": {
    y: 100
  },
  "scrolled": {
    y: 0
  }
};

logo = new Layer({
  name: "logo",
  parent: header,
  x: 0,
  width: 360,
  height: 100,
  image: "images/figma/logo.png"
});

logo.states = {
  "base": {
    y: 0,
    opacity: 1
  },
  "overLayer": {
    y: 0,
    opacity: 1
  },
  "scrolled": {
    y: -100,
    opacity: 0
  }
};

banner = new Layer({
  name: "banner",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 76,
  opacity: 1,
  image: "images/figma/banner.png"
});

banner.states = {
  "base": {
    y: 294
  },
  "overLayer": {
    y: 294
  },
  "scrolled": {
    y: 120
  }
};

statusBar = new Layer({
  name: "statusBar",
  parent: figmaView,
  x: 0,
  y: 0,
  width: 360,
  height: 24,
  opacity: 1,
  image: "images/figma/statusBar.png"
});

zenCard = new Layer({
  name: "zenCard",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 430,
  opacity: 1,
  image: "images/figma/zenCard.png"
});

zenCard.states = {
  "base": {
    y: 458
  },
  "overLayer": {
    y: 458
  },
  "scrolled": {
    y: 284
  }
};

zenImage = new Layer({
  name: "zenImage",
  parent: zenCard,
  x: 0,
  y: 0,
  width: 360,
  height: 430,
  opacity: 1,
  image: "images/figma/zenImage.png"
});

zenFade = new Layer({
  name: "zenFade",
  parent: zenCard,
  x: 0,
  y: 0,
  width: 360,
  height: 430,
  backgroundColor: "rgba(9.000000413507223, 9.000000413507223, 9.000000413507223, 1)"
});

zenFade.states = {
  "base": {
    opacity: 1
  },
  "overLayer": {
    opacity: 1
  },
  "scrolled": {
    opacity: 0
  }
};

zenMenu = new Layer({
  name: "zenMenu",
  parent: zenCard,
  x: 316,
  y: 8,
  width: 28,
  height: 28,
  image: "images/figma/zenMenu.png"
});

zenMenu.states = {
  "base": {
    opacity: 0
  },
  "overLayer": {
    opacity: 0
  },
  "scrolled": {
    opacity: 1
  }
};

zenTitle = new Layer({
  name: "zenTitle",
  parent: zenCard,
  x: 16,
  width: 312,
  height: 48,
  opacity: 1,
  image: "images/figma/zenTitle.png"
});

zenTitle.states = {
  "base": {
    y: 38
  },
  "overLayer": {
    y: 38
  },
  "scrolled": {
    y: 243
  }
};

zenText = new Layer({
  name: "zenText",
  parent: zenCard,
  x: 16,
  width: 312,
  height: 60,
  image: "images/figma/zenText.png"
});

zenText.states = {
  "base": {
    y: 94,
    opacity: 0.7
  },
  "overLayer": {
    y: 94,
    opacity: 0.7
  },
  "scrolled": {
    y: 299,
    opacity: 1
  }
};

zenBottom = new Layer({
  name: "zenBottom",
  parent: zenCard,
  x: 0,
  y: 366,
  width: 344,
  height: 64,
  opacity: 1,
  image: "images/figma/zenBottom.png"
});

zenFakeSource = new Layer({
  name: "zenFakeSource",
  parent: zenCard,
  x: 16,
  y: 16,
  width: 228,
  height: 14,
  image: "images/figma/zenFakeSource.png"
});

zenFakeSource.states = {
  "base": {
    opacity: 1
  },
  "overLayer": {
    opacity: 1
  },
  "scrolled": {
    opacity: 0
  }
};

alerts = new Layer({
  name: "alerts",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 72,
  opacity: 1,
  image: "images/figma/alerts.png"
});

alerts.states = {
  "base": {
    y: 378
  },
  "overLayer": {
    y: 378
  },
  "scrolled": {
    y: 204
  }
};

layer = new Layer({
  name: "layer",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 640,
  opacity: 1,
  backgroundColor: "transparent"
});

layer.states = {
  "base": {
    y: 30
  },
  "overLayer": {
    y: 0
  },
  "scrolled": {
    y: 400
  }
};

layerShadow = new Layer({
  name: "layerShadow",
  parent: layer,
  x: 0,
  y: 424,
  width: 360,
  height: 164,
  opacity: 1,
  image: "images/figma/layerShadow.png"
});

newsBg = new Layer({
  name: "newsBg",
  parent: layer,
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 1)"
});

newsBg.states = {
  "base": {
    x: 6,
    y: 475,
    width: 348,
    height: 418
  },
  "overLayer": {
    x: 0,
    y: 24,
    width: 360,
    height: 570
  },
  "scrolled": {
    x: 6,
    y: 475,
    width: 348,
    height: 418
  }
};

newsFakeTitle = new Layer({
  name: "newsFakeTitle",
  parent: layer,
  x: 0,
  width: 360,
  height: 16,
  image: "images/figma/newsFakeTitle.png"
});

newsFakeTitle.states = {
  "base": {
    y: 487,
    opacity: 1
  },
  "overLayer": {
    y: 188,
    opacity: 0
  },
  "scrolled": {
    y: 487,
    opacity: 1
  }
};

newsFooter = new Layer({
  name: "newsFooter",
  parent: layer,
  opacity: 1,
  image: "images/figma/newsFooter.png"
});

newsFooter.states = {
  "base": {
    x: 6,
    y: 850.3,
    width: 348,
    height: 42.5
  },
  "overLayer": {
    x: 0,
    y: 554,
    width: 360,
    height: 44
  },
  "scrolled": {
    x: 6,
    y: 850.3,
    width: 348,
    height: 42.5
  }
};

newsItems = new Layer({
  name: "newsItems",
  parent: layer,
  opacity: 1,
  image: "images/figma/newsItems.png"
});

newsItems.states = {
  "base": {
    x: 6,
    y: 502.5,
    width: 348.0,
    height: 348.0
  },
  "overLayer": {
    x: 0,
    y: 194,
    width: 360.0,
    height: 360.0
  },
  "scrolled": {
    x: 6,
    y: 502.5,
    width: 348.0,
    height: 348.0
  }
};

newsHeader = new Layer({
  name: "newsHeader",
  parent: layer,
  image: "images/figma/newsHeader.png"
});

newsHeader.states = {
  "base": {
    x: 6,
    y: 432.9,
    width: 348,
    height: 69.6,
    opacity: 0
  },
  "overLayer": {
    x: 0,
    y: 122,
    width: 360,
    height: 72,
    opacity: 1
  },
  "scrolled": {
    x: 6,
    y: 432.9,
    width: 348,
    height: 69.6,
    opacity: 0
  }
};

headerLayer = new Layer({
  name: "headerLayer",
  parent: layer,
  image: "images/figma/headerLayer.png"
});

headerLayer.states = {
  "base": {
    x: 6,
    y: 375.6,
    width: 348,
    height: 92.8,
    opacity: 0
  },
  "overLayer": {
    x: 0,
    y: 24,
    width: 360,
    height: 96,
    opacity: 1
  },
  "scrolled": {
    x: 6,
    y: 375.6,
    width: 348,
    height: 92.8,
    opacity: 0
  }
};

bottomBar = new Layer({
  name: "bottomBar",
  parent: figmaView,
  x: 0,
  y: 592,
  width: 360,
  height: 48,
  opacity: 1,
  image: "images/figma/bottomBar.png"
});

sceneStates = ["base", "overLayer", "scrolled"];

sceneLayers = [figmaView, header, bg, colored, verticals, texts, panel, arrow, logo, banner, statusBar, zenCard, zenImage, zenFade, zenMenu, zenTitle, zenText, zenBottom, zenFakeSource, alerts, layer, layerShadow, newsBg, newsFakeTitle, newsFooter, newsItems, newsHeader, headerLayer, bottomBar];

for (i = 0, len = sceneLayers.length; i < len; i++) {
  item = sceneLayers[i];
  try {
    item.stateSwitch(sceneStates[0]);
  } catch (error1) {}
}

cycler = Utils.cycle(sceneStates);

nextState = cycler();

nextStateHandler = function() {
  var error, j, len1, results;
  nextState = cycler();
  results = [];
  for (j = 0, len1 = sceneLayers.length; j < len1; j++) {
    item = sceneLayers[j];
    try {
      results.push(item.animate(nextState, {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      }));
    } catch (error1) {
      error = error1;
    }
  }
  return results;
};

figmaView.on(Events.Click, function() {
  return nextStateHandler();
});

sceneStates = ["base", "overLayer"];

cycler = Utils.cycle(sceneStates);

nextState = cycler();

figmaView.clip = true;

newsBg.states.base.borderRadius = 8;

newsBg.states.overLayer.borderRadius = 0;

newsBg.states.scrolled.borderRadius = 8;

newsBg.stateSwitch(nextState);

zenCard.title = "zenCard";

exports.layers = {
  "figmaView": figmaView,
  "bottomBar": bottomBar,
  "layer": layer
};

exports.sceneLayers = function() {
  return sceneLayers;
};

exports.sceneStates = function() {
  return sceneStates;
};

zenFade.opacity = 0.7;


},{}],"layerOldAlert":[function(require,module,exports){
var alerts, arrow, banner, bg, bottomBar, colored, cycler, figmaView, header, headerLayer, i, item, layer, layerShadow, len, logo, newsBg, newsFakeTitle, newsFooter, newsHeader, newsItems, nextState, nextStateHandler, panel, sceneLayers, sceneStates, statusBar, texts, verticals, zenBottom, zenCard, zenFade, zenFakeSource, zenImage, zenMenu, zenText, zenTitle;

figmaView = new Layer({
  name: "figmaView",
  x: 0,
  y: 0,
  width: 360,
  height: 640,
  opacity: 1,
  backgroundColor: "rgba(242.24999696016312, 242.24999696016312, 242.24999696016312, 1)"
});

header = new Layer({
  name: "header",
  parent: figmaView,
  x: 0,
  y: 24,
  width: 360,
  opacity: 1,
  image: "images/figma/header.png"
});

header.states = {
  "base": {
    height: 270
  },
  "overLayer": {
    height: 270
  },
  "scrolled": {
    height: 274
  }
};

bg = new Layer({
  name: "bg",
  parent: header,
  x: 0,
  y: 0,
  width: 360,
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 1)"
});

bg.states = {
  "base": {
    height: 268
  },
  "overLayer": {
    height: 268
  },
  "scrolled": {
    height: 92
  }
};

colored = new Layer({
  name: "colored",
  parent: header,
  x: 0,
  width: 360,
  height: 72,
  opacity: 1,
  image: "images/figma/colored.png"
});

colored.states = {
  "base": {
    y: 196
  },
  "overLayer": {
    y: 196
  },
  "scrolled": {
    y: 22
  }
};

verticals = new Layer({
  name: "verticals",
  parent: header,
  x: 0,
  width: 360,
  height: 72,
  opacity: 1,
  image: "images/figma/verticals.png"
});

verticals.states = {
  "base": {
    y: 196
  },
  "overLayer": {
    y: 196
  },
  "scrolled": {
    y: 43
  }
};

texts = new Layer({
  name: "texts",
  parent: header,
  x: 0,
  width: 360,
  height: 14,
  image: "images/figma/texts.png"
});

texts.states = {
  "base": {
    y: 241,
    opacity: 1
  },
  "overLayer": {
    y: 241,
    opacity: 1
  },
  "scrolled": {
    y: 88,
    opacity: 0
  }
};

panel = new Layer({
  name: "panel",
  parent: header,
  x: 0,
  width: 360,
  height: 40,
  image: "images/figma/panel.png"
});

panel.states = {
  "base": {
    y: 156,
    opacity: 1
  },
  "overLayer": {
    y: 156,
    opacity: 1
  },
  "scrolled": {
    y: 3,
    opacity: 0
  }
};

arrow = new Layer({
  name: "arrow",
  parent: header,
  x: 0,
  width: 360,
  height: 56,
  opacity: 1,
  image: "images/figma/arrow.png"
});

arrow.states = {
  "base": {
    y: 100
  },
  "overLayer": {
    y: 100
  },
  "scrolled": {
    y: 0
  }
};

logo = new Layer({
  name: "logo",
  parent: header,
  x: 0,
  width: 360,
  height: 100,
  image: "images/figma/logo.png"
});

logo.states = {
  "base": {
    y: 0,
    opacity: 1
  },
  "overLayer": {
    y: 0,
    opacity: 1
  },
  "scrolled": {
    y: -100,
    opacity: 0
  }
};

banner = new Layer({
  name: "banner",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 76,
  opacity: 1,
  image: "images/figma/banner.png"
});

banner.states = {
  "base": {
    y: 294
  },
  "overLayer": {
    y: 294
  },
  "scrolled": {
    y: 120
  }
};

statusBar = new Layer({
  name: "statusBar",
  parent: figmaView,
  x: 0,
  y: 0,
  width: 360,
  height: 24,
  opacity: 1,
  image: "images/figma/statusBar.png"
});

zenCard = new Layer({
  name: "zenCard",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 430,
  opacity: 1,
  image: "images/figma/zenCard.png"
});

zenCard.states = {
  "base": {
    y: 518
  },
  "overLayer": {
    y: 518
  },
  "scrolled": {
    y: 341
  }
};

zenImage = new Layer({
  name: "zenImage",
  parent: zenCard,
  x: 0,
  y: 0,
  width: 360,
  height: 430,
  opacity: 1,
  image: "images/figma/zenImage.png"
});

zenFade = new Layer({
  name: "zenFade",
  parent: zenCard,
  x: 0,
  y: 0,
  width: 360,
  height: 430,
  backgroundColor: "rgba(9.000000413507223, 9.000000413507223, 9.000000413507223, 1)"
});

zenFade.states = {
  "base": {
    opacity: 1
  },
  "overLayer": {
    opacity: 1
  },
  "scrolled": {
    opacity: 0
  }
};

zenMenu = new Layer({
  name: "zenMenu",
  parent: zenCard,
  x: 316,
  y: 8,
  width: 28,
  height: 28,
  image: "images/figma/zenMenu.png"
});

zenMenu.states = {
  "base": {
    opacity: 0
  },
  "overLayer": {
    opacity: 0
  },
  "scrolled": {
    opacity: 1
  }
};

zenTitle = new Layer({
  name: "zenTitle",
  parent: zenCard,
  x: 16,
  width: 312,
  height: 48,
  opacity: 1,
  image: "images/figma/zenTitle.png"
});

zenTitle.states = {
  "base": {
    y: 38
  },
  "overLayer": {
    y: 38
  },
  "scrolled": {
    y: 243
  }
};

zenText = new Layer({
  name: "zenText",
  parent: zenCard,
  x: 16,
  width: 312,
  height: 60,
  image: "images/figma/zenText.png"
});

zenText.states = {
  "base": {
    y: 94,
    opacity: 0.7
  },
  "overLayer": {
    y: 94,
    opacity: 0.7
  },
  "scrolled": {
    y: 299,
    opacity: 1
  }
};

zenBottom = new Layer({
  name: "zenBottom",
  parent: zenCard,
  x: 0,
  y: 366,
  width: 344,
  height: 64,
  opacity: 1,
  image: "images/figma/zenBottom.png"
});

zenFakeSource = new Layer({
  name: "zenFakeSource",
  parent: zenCard,
  x: 16,
  y: 16,
  width: 228,
  height: 14,
  image: "images/figma/zenFakeSource.png"
});

zenFakeSource.states = {
  "base": {
    opacity: 1
  },
  "overLayer": {
    opacity: 1
  },
  "scrolled": {
    opacity: 0
  }
};

alerts = new Layer({
  name: "alerts",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 133,
  opacity: 1,
  image: "images/figma/alerts.png"
});

alerts.states = {
  "base": {
    y: 378
  },
  "overLayer": {
    y: 378
  },
  "scrolled": {
    y: 204
  }
};

layer = new Layer({
  name: "layer",
  parent: figmaView,
  x: 0,
  width: 360,
  height: 640,
  opacity: 1,
  backgroundColor: "transparent"
});

layer.states = {
  "base": {
    y: 0
  },
  "overLayer": {
    y: 0
  },
  "scrolled": {
    y: 400
  }
};

layerShadow = new Layer({
  name: "layerShadow",
  parent: layer,
  x: 0,
  y: 424,
  width: 360,
  height: 164,
  opacity: 1,
  image: "images/figma/layerShadow.png"
});

newsBg = new Layer({
  name: "newsBg",
  parent: layer,
  opacity: 1,
  backgroundColor: "rgba(255, 255, 255, 1)"
});

newsBg.states = {
  "base": {
    x: 6,
    y: 475,
    width: 348,
    height: 418
  },
  "overLayer": {
    x: 0,
    y: 24,
    width: 360,
    height: 570
  },
  "scrolled": {
    x: 6,
    y: 475,
    width: 348,
    height: 418
  }
};

newsFakeTitle = new Layer({
  name: "newsFakeTitle",
  parent: layer,
  x: 0,
  width: 360,
  height: 16,
  image: "images/figma/newsFakeTitle.png"
});

newsFakeTitle.states = {
  "base": {
    y: 487,
    opacity: 1
  },
  "overLayer": {
    y: 188,
    opacity: 0
  },
  "scrolled": {
    y: 487,
    opacity: 1
  }
};

newsFooter = new Layer({
  name: "newsFooter",
  parent: layer,
  opacity: 1,
  image: "images/figma/newsFooter.png"
});

newsFooter.states = {
  "base": {
    x: 6,
    y: 850.3,
    width: 348,
    height: 42.5
  },
  "overLayer": {
    x: 0,
    y: 554,
    width: 360,
    height: 44
  },
  "scrolled": {
    x: 6,
    y: 850.3,
    width: 348,
    height: 42.5
  }
};

newsItems = new Layer({
  name: "newsItems",
  parent: layer,
  opacity: 1,
  image: "images/figma/newsItems.png"
});

newsItems.states = {
  "base": {
    x: 6,
    y: 502.5,
    width: 348.0,
    height: 348.0
  },
  "overLayer": {
    x: 0,
    y: 194,
    width: 360.0,
    height: 360.0
  },
  "scrolled": {
    x: 6,
    y: 502.5,
    width: 348.0,
    height: 348.0
  }
};

newsHeader = new Layer({
  name: "newsHeader",
  parent: layer,
  image: "images/figma/newsHeader.png"
});

newsHeader.states = {
  "base": {
    x: 6,
    y: 432.9,
    width: 348,
    height: 69.6,
    opacity: 0
  },
  "overLayer": {
    x: 0,
    y: 122,
    width: 360,
    height: 72,
    opacity: 1
  },
  "scrolled": {
    x: 6,
    y: 432.9,
    width: 348,
    height: 69.6,
    opacity: 0
  }
};

headerLayer = new Layer({
  name: "headerLayer",
  parent: layer,
  image: "images/figma/headerLayer.png"
});

headerLayer.states = {
  "base": {
    x: 6,
    y: 375.6,
    width: 348,
    height: 92.8,
    opacity: 0
  },
  "overLayer": {
    x: 0,
    y: 24,
    width: 360,
    height: 96,
    opacity: 1
  },
  "scrolled": {
    x: 6,
    y: 375.6,
    width: 348,
    height: 92.8,
    opacity: 0
  }
};

bottomBar = new Layer({
  name: "bottomBar",
  parent: figmaView,
  x: 0,
  y: 592,
  width: 360,
  height: 48,
  opacity: 1,
  image: "images/figma/bottomBar.png"
});

sceneStates = ["base", "overLayer", "scrolled"];

sceneLayers = [figmaView, header, bg, colored, verticals, texts, panel, arrow, logo, banner, statusBar, zenCard, zenImage, zenFade, zenMenu, zenTitle, zenText, zenBottom, zenFakeSource, alerts, layer, layerShadow, newsBg, newsFakeTitle, newsFooter, newsItems, newsHeader, headerLayer, bottomBar];

for (i = 0, len = sceneLayers.length; i < len; i++) {
  item = sceneLayers[i];
  try {
    item.stateSwitch(sceneStates[0]);
  } catch (error1) {}
}

cycler = Utils.cycle(sceneStates);

nextState = cycler();

nextStateHandler = function() {
  var error, j, len1, results;
  nextState = cycler();
  results = [];
  for (j = 0, len1 = sceneLayers.length; j < len1; j++) {
    item = sceneLayers[j];
    try {
      results.push(item.animate(nextState, {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      }));
    } catch (error1) {
      error = error1;
    }
  }
  return results;
};

figmaView.on(Events.Click, function() {
  return nextStateHandler();
});

sceneStates = ["base", "overLayer"];

cycler = Utils.cycle(sceneStates);

nextState = cycler();

figmaView.clip = true;

newsBg.states.base.borderRadius = 8;

newsBg.states.overLayer.borderRadius = 0;

newsBg.states.scrolled.borderRadius = 8;

newsBg.stateSwitch(nextState);

alerts.image = "images/alerts old.png";

zenCard.title = "zenCard";

exports.layers = {
  "figmaView": figmaView,
  "bottomBar": bottomBar,
  "layer": layer
};

exports.sceneLayers = function() {
  return sceneLayers;
};

exports.sceneStates = function() {
  return sceneStates;
};

zenFade.opacity = 0.7;


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbGF5ZXJPbGRBbGVydC5jb2ZmZWUiLCIuLi9tb2R1bGVzL2xheWVyTmV3QWxlcnQuY29mZmVlIiwiLi4vbW9kdWxlcy9sYXllckJhc2UuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3X0xvZ29MYXllci5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdfQXNzZXRzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NvbXBvbmVudC5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3M2LmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzNS5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczQuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3MzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzMi5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczEuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEltcG9ydCBmcm9tIEZpZ21hXG4jIEdlbmVyYXRlZCB3aXRoIEZyYW1lciBJbnZlbnRvcnlcblxuZmlnbWFWaWV3ID0gbmV3IExheWVyXG5cdG5hbWU6IFwiZmlnbWFWaWV3XCJcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA2NDBcblx0b3BhY2l0eTogMVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNDIuMjQ5OTk2OTYwMTYzMTIsIDI0Mi4yNDk5OTY5NjAxNjMxMiwgMjQyLjI0OTk5Njk2MDE2MzEyLCAxKVwiXG5cblxuaGVhZGVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwiaGVhZGVyXCJcblx0cGFyZW50OiBmaWdtYVZpZXdcblx0eDogMFxuXHR5OiAyNFxuXHR3aWR0aDogMzYwXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2hlYWRlci5wbmdcIlxuXG5oZWFkZXIuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0aGVpZ2h0OiAyNzBcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHRoZWlnaHQ6IDI3MFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0aGVpZ2h0OiAyNzRcblxuXG5iZyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImJnXCJcblx0cGFyZW50OiBoZWFkZXJcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0b3BhY2l0eTogMVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxKVwiXG5cbmJnLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdGhlaWdodDogMjY4XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0aGVpZ2h0OiAyNjhcblx0XCJzY3JvbGxlZFwiOlxuXHRcdGhlaWdodDogOTJcblxuXG5jb2xvcmVkID0gbmV3IExheWVyXG5cdG5hbWU6IFwiY29sb3JlZFwiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDcyXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2NvbG9yZWQucG5nXCJcblxuY29sb3JlZC5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAxOTZcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAxOTZcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDIyXG5cblxudmVydGljYWxzID0gbmV3IExheWVyXG5cdG5hbWU6IFwidmVydGljYWxzXCJcblx0cGFyZW50OiBoZWFkZXJcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNzJcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvdmVydGljYWxzLnBuZ1wiXG5cbnZlcnRpY2Fscy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAxOTZcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAxOTZcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDQzXG5cblxudGV4dHMgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ0ZXh0c1wiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDE0XG5cdGltYWdlOiBcImltYWdlcy9maWdtYS90ZXh0cy5wbmdcIlxuXG50ZXh0cy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAyNDFcblx0XHRvcGFjaXR5OiAxXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMjQxXG5cdFx0b3BhY2l0eTogMVxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogODhcblx0XHRvcGFjaXR5OiAwXG5cblxucGFuZWwgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJwYW5lbFwiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDQwXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9wYW5lbC5wbmdcIlxuXG5wYW5lbC5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAxNTZcblx0XHRvcGFjaXR5OiAxXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMTU2XG5cdFx0b3BhY2l0eTogMVxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogM1xuXHRcdG9wYWNpdHk6IDBcblxuXG5hcnJvdyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImFycm93XCJcblx0cGFyZW50OiBoZWFkZXJcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNTZcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvYXJyb3cucG5nXCJcblxuYXJyb3cuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMTAwXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMTAwXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAwXG5cblxubG9nbyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImxvZ29cIlxuXHRwYXJlbnQ6IGhlYWRlclxuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiAxMDBcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2xvZ28ucG5nXCJcblxubG9nby5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAwXG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDBcblx0XHRvcGFjaXR5OiAxXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAtMTAwXG5cdFx0b3BhY2l0eTogMFxuXG5cbmJhbm5lciA9IG5ldyBMYXllclxuXHRuYW1lOiBcImJhbm5lclwiXG5cdHBhcmVudDogZmlnbWFWaWV3XG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDc2XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2Jhbm5lci5wbmdcIlxuXG5iYW5uZXIuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMjk0XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMjk0XG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAxMjBcblxuXG5zdGF0dXNCYXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJzdGF0dXNCYXJcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHk6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDI0XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3N0YXR1c0Jhci5wbmdcIlxuXG5cbnplbkNhcmQgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ6ZW5DYXJkXCJcblx0cGFyZW50OiBmaWdtYVZpZXdcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNDMwXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3plbkNhcmQucG5nXCJcblxuemVuQ2FyZC5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiA1MThcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiA1MThcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDM0MVxuXG5cbnplbkltYWdlID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuSW1hZ2VcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA0MzBcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuSW1hZ2UucG5nXCJcblxuXG56ZW5GYWRlID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuRmFkZVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAwXG5cdHk6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDQzMFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSg5LjAwMDAwMDQxMzUwNzIyMywgOS4wMDAwMDA0MTM1MDcyMjMsIDkuMDAwMDAwNDEzNTA3MjIzLCAxKVwiXG5cbnplbkZhZGUuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdG9wYWNpdHk6IDFcblx0XCJzY3JvbGxlZFwiOlxuXHRcdG9wYWNpdHk6IDBcblxuXG56ZW5NZW51ID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuTWVudVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAzMTZcblx0eTogOFxuXHR3aWR0aDogMjhcblx0aGVpZ2h0OiAyOFxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuTWVudS5wbmdcIlxuXG56ZW5NZW51LnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdG9wYWNpdHk6IDBcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHRvcGFjaXR5OiAwXG5cdFwic2Nyb2xsZWRcIjpcblx0XHRvcGFjaXR5OiAxXG5cblxuemVuVGl0bGUgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ6ZW5UaXRsZVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAxNlxuXHR3aWR0aDogMzEyXG5cdGhlaWdodDogNDhcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuVGl0bGUucG5nXCJcblxuemVuVGl0bGUuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMzhcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAzOFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogMjQzXG5cblxuemVuVGV4dCA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplblRleHRcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMTZcblx0d2lkdGg6IDMxMlxuXHRoZWlnaHQ6IDYwXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS96ZW5UZXh0LnBuZ1wiXG5cbnplblRleHQuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogOTRcblx0XHRvcGFjaXR5OiAwLjdcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiA5NFxuXHRcdG9wYWNpdHk6IDAuN1xuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogMjk5XG5cdFx0b3BhY2l0eTogMVxuXG5cbnplbkJvdHRvbSA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplbkJvdHRvbVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAwXG5cdHk6IDM2NlxuXHR3aWR0aDogMzQ0XG5cdGhlaWdodDogNjRcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuQm90dG9tLnBuZ1wiXG5cblxuemVuRmFrZVNvdXJjZSA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplbkZha2VTb3VyY2VcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMTZcblx0eTogMTZcblx0d2lkdGg6IDIyOFxuXHRoZWlnaHQ6IDE0XG5cdGltYWdlOiBcImltYWdlcy9maWdtYS96ZW5GYWtlU291cmNlLnBuZ1wiXG5cbnplbkZha2VTb3VyY2Uuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdG9wYWNpdHk6IDFcblx0XCJzY3JvbGxlZFwiOlxuXHRcdG9wYWNpdHk6IDBcblxuXG5hbGVydHMgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJhbGVydHNcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiAxMzNcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvYWxlcnRzLnBuZ1wiXG5cbmFsZXJ0cy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAzNzhcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAzNzhcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDIwNFxuXG5cbmxheWVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwibGF5ZXJcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA2NDBcblx0b3BhY2l0eTogMVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXG5sYXllci5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAwXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogNDAwXG5cblxubGF5ZXJTaGFkb3cgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJsYXllclNoYWRvd1wiXG5cdHBhcmVudDogbGF5ZXJcblx0eDogMFxuXHR5OiA0MjRcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDE2NFxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9sYXllclNoYWRvdy5wbmdcIlxuXG5cbm5ld3NCZyA9IG5ldyBMYXllclxuXHRuYW1lOiBcIm5ld3NCZ1wiXG5cdHBhcmVudDogbGF5ZXJcblx0b3BhY2l0eTogMVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxKVwiXG5cbm5ld3NCZy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR4OiA2XG5cdFx0eTogNDc1XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNDE4XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eDogMFxuXHRcdHk6IDI0XG5cdFx0d2lkdGg6IDM2MFxuXHRcdGhlaWdodDogNTcwXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR4OiA2XG5cdFx0eTogNDc1XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNDE4XG5cblxubmV3c0Zha2VUaXRsZSA9IG5ldyBMYXllclxuXHRuYW1lOiBcIm5ld3NGYWtlVGl0bGVcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDE2XG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9uZXdzRmFrZVRpdGxlLnBuZ1wiXG5cbm5ld3NGYWtlVGl0bGUuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogNDg3XG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDE4OFxuXHRcdG9wYWNpdHk6IDBcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDQ4N1xuXHRcdG9wYWNpdHk6IDFcblxuXG5uZXdzRm9vdGVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwibmV3c0Zvb3RlclwiXG5cdHBhcmVudDogbGF5ZXJcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvbmV3c0Zvb3Rlci5wbmdcIlxuXG5uZXdzRm9vdGVyLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHg6IDZcblx0XHR5OiA4NTAuM1xuXHRcdHdpZHRoOiAzNDhcblx0XHRoZWlnaHQ6IDQyLjVcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR4OiAwXG5cdFx0eTogNTU0XG5cdFx0d2lkdGg6IDM2MFxuXHRcdGhlaWdodDogNDRcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHg6IDZcblx0XHR5OiA4NTAuM1xuXHRcdHdpZHRoOiAzNDhcblx0XHRoZWlnaHQ6IDQyLjVcblxuXG5uZXdzSXRlbXMgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJuZXdzSXRlbXNcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL25ld3NJdGVtcy5wbmdcIlxuXG5uZXdzSXRlbXMuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eDogNlxuXHRcdHk6IDUwMi41XG5cdFx0d2lkdGg6IDM0OC4wXG5cdFx0aGVpZ2h0OiAzNDguMFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHg6IDBcblx0XHR5OiAxOTRcblx0XHR3aWR0aDogMzYwLjBcblx0XHRoZWlnaHQ6IDM2MC4wXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR4OiA2XG5cdFx0eTogNTAyLjVcblx0XHR3aWR0aDogMzQ4LjBcblx0XHRoZWlnaHQ6IDM0OC4wXG5cblxubmV3c0hlYWRlciA9IG5ldyBMYXllclxuXHRuYW1lOiBcIm5ld3NIZWFkZXJcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9uZXdzSGVhZGVyLnBuZ1wiXG5cbm5ld3NIZWFkZXIuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eDogNlxuXHRcdHk6IDQzMi45XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNjkuNlxuXHRcdG9wYWNpdHk6IDBcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR4OiAwXG5cdFx0eTogMTIyXG5cdFx0d2lkdGg6IDM2MFxuXHRcdGhlaWdodDogNzJcblx0XHRvcGFjaXR5OiAxXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR4OiA2XG5cdFx0eTogNDMyLjlcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA2OS42XG5cdFx0b3BhY2l0eTogMFxuXG5cbmhlYWRlckxheWVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwiaGVhZGVyTGF5ZXJcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9oZWFkZXJMYXllci5wbmdcIlxuXG5oZWFkZXJMYXllci5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR4OiA2XG5cdFx0eTogMzc1LjZcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA5Mi44XG5cdFx0b3BhY2l0eTogMFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHg6IDBcblx0XHR5OiAyNFxuXHRcdHdpZHRoOiAzNjBcblx0XHRoZWlnaHQ6IDk2XG5cdFx0b3BhY2l0eTogMVxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eDogNlxuXHRcdHk6IDM3NS42XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogOTIuOFxuXHRcdG9wYWNpdHk6IDBcblxuXG5ib3R0b21CYXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJib3R0b21CYXJcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHk6IDU5MlxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNDhcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvYm90dG9tQmFyLnBuZ1wiXG5cblxuc2NlbmVTdGF0ZXMgPSBbXCJiYXNlXCIsIFwib3ZlckxheWVyXCIsIFwic2Nyb2xsZWRcIl1cbnNjZW5lTGF5ZXJzID0gW2ZpZ21hVmlldywgaGVhZGVyLCBiZywgY29sb3JlZCwgdmVydGljYWxzLCB0ZXh0cywgcGFuZWwsIGFycm93LCBsb2dvLCBiYW5uZXIsIHN0YXR1c0JhciwgemVuQ2FyZCwgemVuSW1hZ2UsIHplbkZhZGUsIHplbk1lbnUsIHplblRpdGxlLCB6ZW5UZXh0LCB6ZW5Cb3R0b20sIHplbkZha2VTb3VyY2UsIGFsZXJ0cywgbGF5ZXIsIGxheWVyU2hhZG93LCBuZXdzQmcsIG5ld3NGYWtlVGl0bGUsIG5ld3NGb290ZXIsIG5ld3NJdGVtcywgbmV3c0hlYWRlciwgaGVhZGVyTGF5ZXIsIGJvdHRvbUJhcl1cblxuZm9yIGl0ZW0gaW4gc2NlbmVMYXllcnNcblx0dHJ5IGl0ZW0uc3RhdGVTd2l0Y2goc2NlbmVTdGF0ZXNbMF0pXG5cblxuY3ljbGVyID0gVXRpbHMuY3ljbGUoc2NlbmVTdGF0ZXMpXG5uZXh0U3RhdGUgPSBjeWNsZXIoKVxuXG5uZXh0U3RhdGVIYW5kbGVyID0gKCkgLT5cblx0bmV4dFN0YXRlID0gY3ljbGVyKClcblx0Zm9yIGl0ZW0gaW4gc2NlbmVMYXllcnNcblx0XHR0cnlcblx0XHRcdGl0ZW0uYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRjYXRjaCBlcnJvclxuXG5cbmZpZ21hVmlldy5vbiBFdmVudHMuQ2xpY2ssIC0+XG5cdG5leHRTdGF0ZUhhbmRsZXIoKVxuXG5cblxuXG5cblxuXG5cbiMgT1ZFUlJJREVTXG5cbnNjZW5lU3RhdGVzID0gW1wiYmFzZVwiLCBcIm92ZXJMYXllclwiXVxuY3ljbGVyID0gVXRpbHMuY3ljbGUoc2NlbmVTdGF0ZXMpXG5uZXh0U3RhdGUgPSBjeWNsZXIoKVxuXG5cblxuXG5maWdtYVZpZXcuY2xpcCA9IHRydWVcblxubmV3c0JnLnN0YXRlcy5iYXNlLmJvcmRlclJhZGl1cyA9IDhcbm5ld3NCZy5zdGF0ZXMub3ZlckxheWVyLmJvcmRlclJhZGl1cyA9IDBcbm5ld3NCZy5zdGF0ZXMuc2Nyb2xsZWQuYm9yZGVyUmFkaXVzID0gOFxubmV3c0JnLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblxuXG5cblxuXG5hbGVydHMuaW1hZ2UgPSBcImltYWdlcy9hbGVydHMgb2xkLnBuZ1wiXG5cbnplbkNhcmQudGl0bGUgPSBcInplbkNhcmRcIlxuXG5leHBvcnRzLmxheWVycyA9IHtcblx0XCJmaWdtYVZpZXdcIjogZmlnbWFWaWV3LFxuXHRcImJvdHRvbUJhclwiOiBib3R0b21CYXIsXG5cdFwibGF5ZXJcIjogbGF5ZXIsXG59XG5cbmV4cG9ydHMuc2NlbmVMYXllcnMgPSAoKSAtPlxuXHRyZXR1cm4gc2NlbmVMYXllcnNcblxuZXhwb3J0cy5zY2VuZVN0YXRlcyA9ICgpIC0+XG5cdHJldHVybiBzY2VuZVN0YXRlc1xuXG56ZW5GYWRlLm9wYWNpdHkgPSAwLjciLCIjIEltcG9ydCBmcm9tIEZpZ21hXG4jIEdlbmVyYXRlZCB3aXRoIEZyYW1lciBJbnZlbnRvcnlcblxuZmlnbWFWaWV3ID0gbmV3IExheWVyXG5cdG5hbWU6IFwiZmlnbWFWaWV3XCJcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA2NDBcblx0b3BhY2l0eTogMVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNDIuMjQ5OTk2OTYwMTYzMTIsIDI0Mi4yNDk5OTY5NjAxNjMxMiwgMjQyLjI0OTk5Njk2MDE2MzEyLCAxKVwiXG5cblxuaGVhZGVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwiaGVhZGVyXCJcblx0cGFyZW50OiBmaWdtYVZpZXdcblx0eDogMFxuXHR5OiAyNFxuXHR3aWR0aDogMzYwXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2hlYWRlci5wbmdcIlxuXG5oZWFkZXIuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0aGVpZ2h0OiAyNzBcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHRoZWlnaHQ6IDI3MFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0aGVpZ2h0OiAyNzRcblxuXG5iZyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImJnXCJcblx0cGFyZW50OiBoZWFkZXJcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0b3BhY2l0eTogMVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxKVwiXG5cbmJnLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdGhlaWdodDogMjY4XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0aGVpZ2h0OiAyNjhcblx0XCJzY3JvbGxlZFwiOlxuXHRcdGhlaWdodDogOTJcblxuXG5jb2xvcmVkID0gbmV3IExheWVyXG5cdG5hbWU6IFwiY29sb3JlZFwiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDcyXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2NvbG9yZWQucG5nXCJcblxuY29sb3JlZC5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAxOTZcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAxOTZcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDIyXG5cblxudmVydGljYWxzID0gbmV3IExheWVyXG5cdG5hbWU6IFwidmVydGljYWxzXCJcblx0cGFyZW50OiBoZWFkZXJcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNzJcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvdmVydGljYWxzLnBuZ1wiXG5cbnZlcnRpY2Fscy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAxOTZcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAxOTZcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDQzXG5cblxudGV4dHMgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ0ZXh0c1wiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDE0XG5cdGltYWdlOiBcImltYWdlcy9maWdtYS90ZXh0cy5wbmdcIlxuXG50ZXh0cy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAyNDFcblx0XHRvcGFjaXR5OiAxXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMjQxXG5cdFx0b3BhY2l0eTogMVxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogODhcblx0XHRvcGFjaXR5OiAwXG5cblxucGFuZWwgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJwYW5lbFwiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDQwXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9wYW5lbC5wbmdcIlxuXG5wYW5lbC5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAxNTZcblx0XHRvcGFjaXR5OiAxXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMTU2XG5cdFx0b3BhY2l0eTogMVxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogM1xuXHRcdG9wYWNpdHk6IDBcblxuXG5hcnJvdyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImFycm93XCJcblx0cGFyZW50OiBoZWFkZXJcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNTZcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvYXJyb3cucG5nXCJcblxuYXJyb3cuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMTAwXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMTAwXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAwXG5cblxubG9nbyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImxvZ29cIlxuXHRwYXJlbnQ6IGhlYWRlclxuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiAxMDBcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2xvZ28ucG5nXCJcblxubG9nby5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiAwXG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDBcblx0XHRvcGFjaXR5OiAxXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAtMTAwXG5cdFx0b3BhY2l0eTogMFxuXG5cbmJhbm5lciA9IG5ldyBMYXllclxuXHRuYW1lOiBcImJhbm5lclwiXG5cdHBhcmVudDogZmlnbWFWaWV3XG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDc2XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2Jhbm5lci5wbmdcIlxuXG5iYW5uZXIuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMjk0XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMjk0XG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAxMjBcblxuXG5zdGF0dXNCYXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJzdGF0dXNCYXJcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHk6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDI0XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3N0YXR1c0Jhci5wbmdcIlxuXG5cbnplbkNhcmQgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ6ZW5DYXJkXCJcblx0cGFyZW50OiBmaWdtYVZpZXdcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNDMwXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3plbkNhcmQucG5nXCJcblxuemVuQ2FyZC5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiA0NThcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiA0NThcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDI4NFxuXG5cbnplbkltYWdlID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuSW1hZ2VcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA0MzBcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuSW1hZ2UucG5nXCJcblxuXG56ZW5GYWRlID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuRmFkZVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAwXG5cdHk6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDQzMFxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSg5LjAwMDAwMDQxMzUwNzIyMywgOS4wMDAwMDA0MTM1MDcyMjMsIDkuMDAwMDAwNDEzNTA3MjIzLCAxKVwiXG5cbnplbkZhZGUuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdG9wYWNpdHk6IDFcblx0XCJzY3JvbGxlZFwiOlxuXHRcdG9wYWNpdHk6IDBcblxuXG56ZW5NZW51ID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuTWVudVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAzMTZcblx0eTogOFxuXHR3aWR0aDogMjhcblx0aGVpZ2h0OiAyOFxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuTWVudS5wbmdcIlxuXG56ZW5NZW51LnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdG9wYWNpdHk6IDBcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHRvcGFjaXR5OiAwXG5cdFwic2Nyb2xsZWRcIjpcblx0XHRvcGFjaXR5OiAxXG5cblxuemVuVGl0bGUgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ6ZW5UaXRsZVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAxNlxuXHR3aWR0aDogMzEyXG5cdGhlaWdodDogNDhcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuVGl0bGUucG5nXCJcblxuemVuVGl0bGUuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMzhcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAzOFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogMjQzXG5cblxuemVuVGV4dCA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplblRleHRcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMTZcblx0d2lkdGg6IDMxMlxuXHRoZWlnaHQ6IDYwXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS96ZW5UZXh0LnBuZ1wiXG5cbnplblRleHQuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogOTRcblx0XHRvcGFjaXR5OiAwLjdcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiA5NFxuXHRcdG9wYWNpdHk6IDAuN1xuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogMjk5XG5cdFx0b3BhY2l0eTogMVxuXG5cbnplbkJvdHRvbSA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplbkJvdHRvbVwiXG5cdHBhcmVudDogemVuQ2FyZFxuXHR4OiAwXG5cdHk6IDM2NlxuXHR3aWR0aDogMzQ0XG5cdGhlaWdodDogNjRcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuQm90dG9tLnBuZ1wiXG5cblxuemVuRmFrZVNvdXJjZSA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplbkZha2VTb3VyY2VcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMTZcblx0eTogMTZcblx0d2lkdGg6IDIyOFxuXHRoZWlnaHQ6IDE0XG5cdGltYWdlOiBcImltYWdlcy9maWdtYS96ZW5GYWtlU291cmNlLnBuZ1wiXG5cbnplbkZha2VTb3VyY2Uuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdG9wYWNpdHk6IDFcblx0XCJzY3JvbGxlZFwiOlxuXHRcdG9wYWNpdHk6IDBcblxuXG5hbGVydHMgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJhbGVydHNcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA3MlxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9hbGVydHMucG5nXCJcblxuYWxlcnRzLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHk6IDM3OFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDM3OFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogMjA0XG5cblxubGF5ZXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJsYXllclwiXG5cdHBhcmVudDogZmlnbWFWaWV3XG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDY0MFxuXHRvcGFjaXR5OiAxXG5cdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cbmxheWVyLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHk6IDMwXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogNDAwXG5cblxubGF5ZXJTaGFkb3cgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJsYXllclNoYWRvd1wiXG5cdHBhcmVudDogbGF5ZXJcblx0eDogMFxuXHR5OiA0MjRcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDE2NFxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9sYXllclNoYWRvdy5wbmdcIlxuXG5cbm5ld3NCZyA9IG5ldyBMYXllclxuXHRuYW1lOiBcIm5ld3NCZ1wiXG5cdHBhcmVudDogbGF5ZXJcblx0b3BhY2l0eTogMVxuXHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAxKVwiXG5cbm5ld3NCZy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR4OiA2XG5cdFx0eTogNDc1XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNDE4XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eDogMFxuXHRcdHk6IDI0XG5cdFx0d2lkdGg6IDM2MFxuXHRcdGhlaWdodDogNTcwXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR4OiA2XG5cdFx0eTogNDc1XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNDE4XG5cblxubmV3c0Zha2VUaXRsZSA9IG5ldyBMYXllclxuXHRuYW1lOiBcIm5ld3NGYWtlVGl0bGVcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDE2XG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9uZXdzRmFrZVRpdGxlLnBuZ1wiXG5cbm5ld3NGYWtlVGl0bGUuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogNDg3XG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDE4OFxuXHRcdG9wYWNpdHk6IDBcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDQ4N1xuXHRcdG9wYWNpdHk6IDFcblxuXG5uZXdzRm9vdGVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwibmV3c0Zvb3RlclwiXG5cdHBhcmVudDogbGF5ZXJcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvbmV3c0Zvb3Rlci5wbmdcIlxuXG5uZXdzRm9vdGVyLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHg6IDZcblx0XHR5OiA4NTAuM1xuXHRcdHdpZHRoOiAzNDhcblx0XHRoZWlnaHQ6IDQyLjVcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR4OiAwXG5cdFx0eTogNTU0XG5cdFx0d2lkdGg6IDM2MFxuXHRcdGhlaWdodDogNDRcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHg6IDZcblx0XHR5OiA4NTAuM1xuXHRcdHdpZHRoOiAzNDhcblx0XHRoZWlnaHQ6IDQyLjVcblxuXG5uZXdzSXRlbXMgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJuZXdzSXRlbXNcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL25ld3NJdGVtcy5wbmdcIlxuXG5uZXdzSXRlbXMuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eDogNlxuXHRcdHk6IDUwMi41XG5cdFx0d2lkdGg6IDM0OC4wXG5cdFx0aGVpZ2h0OiAzNDguMFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHg6IDBcblx0XHR5OiAxOTRcblx0XHR3aWR0aDogMzYwLjBcblx0XHRoZWlnaHQ6IDM2MC4wXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR4OiA2XG5cdFx0eTogNTAyLjVcblx0XHR3aWR0aDogMzQ4LjBcblx0XHRoZWlnaHQ6IDM0OC4wXG5cblxubmV3c0hlYWRlciA9IG5ldyBMYXllclxuXHRuYW1lOiBcIm5ld3NIZWFkZXJcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9uZXdzSGVhZGVyLnBuZ1wiXG5cbm5ld3NIZWFkZXIuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eDogNlxuXHRcdHk6IDQzMi45XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNjkuNlxuXHRcdG9wYWNpdHk6IDBcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR4OiAwXG5cdFx0eTogMTIyXG5cdFx0d2lkdGg6IDM2MFxuXHRcdGhlaWdodDogNzJcblx0XHRvcGFjaXR5OiAxXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR4OiA2XG5cdFx0eTogNDMyLjlcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA2OS42XG5cdFx0b3BhY2l0eTogMFxuXG5cbmhlYWRlckxheWVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwiaGVhZGVyTGF5ZXJcIlxuXHRwYXJlbnQ6IGxheWVyXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9oZWFkZXJMYXllci5wbmdcIlxuXG5oZWFkZXJMYXllci5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR4OiA2XG5cdFx0eTogMzc1LjZcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA5Mi44XG5cdFx0b3BhY2l0eTogMFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHg6IDBcblx0XHR5OiAyNFxuXHRcdHdpZHRoOiAzNjBcblx0XHRoZWlnaHQ6IDk2XG5cdFx0b3BhY2l0eTogMVxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eDogNlxuXHRcdHk6IDM3NS42XG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogOTIuOFxuXHRcdG9wYWNpdHk6IDBcblxuXG5ib3R0b21CYXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJib3R0b21CYXJcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHk6IDU5MlxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNDhcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvYm90dG9tQmFyLnBuZ1wiXG5cblxuc2NlbmVTdGF0ZXMgPSBbXCJiYXNlXCIsIFwib3ZlckxheWVyXCIsIFwic2Nyb2xsZWRcIl1cbnNjZW5lTGF5ZXJzID0gW2ZpZ21hVmlldywgaGVhZGVyLCBiZywgY29sb3JlZCwgdmVydGljYWxzLCB0ZXh0cywgcGFuZWwsIGFycm93LCBsb2dvLCBiYW5uZXIsIHN0YXR1c0JhciwgemVuQ2FyZCwgemVuSW1hZ2UsIHplbkZhZGUsIHplbk1lbnUsIHplblRpdGxlLCB6ZW5UZXh0LCB6ZW5Cb3R0b20sIHplbkZha2VTb3VyY2UsIGFsZXJ0cywgbGF5ZXIsIGxheWVyU2hhZG93LCBuZXdzQmcsIG5ld3NGYWtlVGl0bGUsIG5ld3NGb290ZXIsIG5ld3NJdGVtcywgbmV3c0hlYWRlciwgaGVhZGVyTGF5ZXIsIGJvdHRvbUJhcl1cblxuZm9yIGl0ZW0gaW4gc2NlbmVMYXllcnNcblx0dHJ5IGl0ZW0uc3RhdGVTd2l0Y2goc2NlbmVTdGF0ZXNbMF0pXG5cblxuY3ljbGVyID0gVXRpbHMuY3ljbGUoc2NlbmVTdGF0ZXMpXG5uZXh0U3RhdGUgPSBjeWNsZXIoKVxuXG5uZXh0U3RhdGVIYW5kbGVyID0gKCkgLT5cblx0bmV4dFN0YXRlID0gY3ljbGVyKClcblx0Zm9yIGl0ZW0gaW4gc2NlbmVMYXllcnNcblx0XHR0cnlcblx0XHRcdGl0ZW0uYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRjYXRjaCBlcnJvclxuXG5cbmZpZ21hVmlldy5vbiBFdmVudHMuQ2xpY2ssIC0+XG5cdG5leHRTdGF0ZUhhbmRsZXIoKVxuXG5cblxuXG5cblxuXG5cbiMgT1ZFUlJJREVTXG5cbnNjZW5lU3RhdGVzID0gW1wiYmFzZVwiLCBcIm92ZXJMYXllclwiXVxuY3ljbGVyID0gVXRpbHMuY3ljbGUoc2NlbmVTdGF0ZXMpXG5uZXh0U3RhdGUgPSBjeWNsZXIoKVxuXG5cblxuXG5maWdtYVZpZXcuY2xpcCA9IHRydWVcblxubmV3c0JnLnN0YXRlcy5iYXNlLmJvcmRlclJhZGl1cyA9IDhcbm5ld3NCZy5zdGF0ZXMub3ZlckxheWVyLmJvcmRlclJhZGl1cyA9IDBcbm5ld3NCZy5zdGF0ZXMuc2Nyb2xsZWQuYm9yZGVyUmFkaXVzID0gOFxubmV3c0JnLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblxuXG5cblxuXG5cblxuemVuQ2FyZC50aXRsZSA9IFwiemVuQ2FyZFwiXG5cbmV4cG9ydHMubGF5ZXJzID0ge1xuXHRcImZpZ21hVmlld1wiOiBmaWdtYVZpZXcsXG5cdFwiYm90dG9tQmFyXCI6IGJvdHRvbUJhcixcblx0XCJsYXllclwiOiBsYXllcixcbn1cblxuZXhwb3J0cy5zY2VuZUxheWVycyA9ICgpIC0+XG5cdHJldHVybiBzY2VuZUxheWVyc1xuXG5leHBvcnRzLnNjZW5lU3RhdGVzID0gKCkgLT5cblx0cmV0dXJuIHNjZW5lU3RhdGVzXG5cblxuemVuRmFkZS5vcGFjaXR5ID0gMC43IiwiIyBJbXBvcnQgZnJvbSBGaWdtYVxuIyBHZW5lcmF0ZWQgd2l0aCBGcmFtZXIgSW52ZW50b3J5XG5cbmZpZ21hVmlldyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImZpZ21hVmlld1wiXG5cdHg6IDBcblx0eTogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNjQwXG5cdG9wYWNpdHk6IDFcblx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjQyLjI0OTk5Njk2MDE2MzEyLCAyNDIuMjQ5OTk2OTYwMTYzMTIsIDI0Mi4yNDk5OTY5NjAxNjMxMiwgMSlcIlxuXG5cbmhlYWRlciA9IG5ldyBMYXllclxuXHRuYW1lOiBcImhlYWRlclwiXG5cdHBhcmVudDogZmlnbWFWaWV3XG5cdHg6IDBcblx0eTogMjRcblx0d2lkdGg6IDM2MFxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9oZWFkZXIucG5nXCJcblxuaGVhZGVyLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdGhlaWdodDogMjcwXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0aGVpZ2h0OiAyNzBcblx0XCJzY3JvbGxlZFwiOlxuXHRcdGhlaWdodDogMjc0XG5cblxuYmcgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJiZ1wiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0eTogMFxuXHR3aWR0aDogMzYwXG5cdG9wYWNpdHk6IDFcblx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMSlcIlxuXG5iZy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHRoZWlnaHQ6IDI2OFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdGhlaWdodDogMjY4XG5cdFwic2Nyb2xsZWRcIjpcblx0XHRoZWlnaHQ6IDkyXG5cblxuY29sb3JlZCA9IG5ldyBMYXllclxuXHRuYW1lOiBcImNvbG9yZWRcIlxuXHRwYXJlbnQ6IGhlYWRlclxuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA3MlxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9jb2xvcmVkLnBuZ1wiXG5cbmNvbG9yZWQuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMTk2XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMTk2XG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAyMlxuXG5cbnZlcnRpY2FscyA9IG5ldyBMYXllclxuXHRuYW1lOiBcInZlcnRpY2Fsc1wiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDcyXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3ZlcnRpY2Fscy5wbmdcIlxuXG52ZXJ0aWNhbHMuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMTk2XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMTk2XG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiA0M1xuXG5cbnRleHRzID0gbmV3IExheWVyXG5cdG5hbWU6IFwidGV4dHNcIlxuXHRwYXJlbnQ6IGhlYWRlclxuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiAxNFxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvdGV4dHMucG5nXCJcblxudGV4dHMuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMjQxXG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDI0MVxuXHRcdG9wYWNpdHk6IDFcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDg4XG5cdFx0b3BhY2l0eTogMFxuXG5cbnBhbmVsID0gbmV3IExheWVyXG5cdG5hbWU6IFwicGFuZWxcIlxuXHRwYXJlbnQ6IGhlYWRlclxuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA0MFxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvcGFuZWwucG5nXCJcblxucGFuZWwuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMTU2XG5cdFx0b3BhY2l0eTogMVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDE1NlxuXHRcdG9wYWNpdHk6IDFcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDNcblx0XHRvcGFjaXR5OiAwXG5cblxuYXJyb3cgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJhcnJvd1wiXG5cdHBhcmVudDogaGVhZGVyXG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDU2XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2Fycm93LnBuZ1wiXG5cbmFycm93LnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHk6IDEwMFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDEwMFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogMFxuXG5cbmxvZ28gPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJsb2dvXCJcblx0cGFyZW50OiBoZWFkZXJcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogMTAwXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9sb2dvLnBuZ1wiXG5cbmxvZ28uc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMFxuXHRcdG9wYWNpdHk6IDFcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAwXG5cdFx0b3BhY2l0eTogMVxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogLTEwMFxuXHRcdG9wYWNpdHk6IDBcblxuXG5iYW5uZXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJiYW5uZXJcIlxuXHRwYXJlbnQ6IGZpZ21hVmlld1xuXHR4OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA3NlxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9iYW5uZXIucG5nXCJcblxuYmFubmVyLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHk6IDI5NFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHk6IDI5NFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogMTIwXG5cblxuc3RhdHVzQmFyID0gbmV3IExheWVyXG5cdG5hbWU6IFwic3RhdHVzQmFyXCJcblx0cGFyZW50OiBmaWdtYVZpZXdcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiAyNFxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9zdGF0dXNCYXIucG5nXCJcblxuXG56ZW5DYXJkID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuQ2FyZFwiXG5cdHBhcmVudDogZmlnbWFWaWV3XG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDQzMFxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS96ZW5DYXJkLnBuZ1wiXG5cbnplbkNhcmQuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eTogMzc4XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMzc4XG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiAyMDRcblxuXG56ZW5JbWFnZSA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplbkltYWdlXCJcblx0cGFyZW50OiB6ZW5DYXJkXG5cdHg6IDBcblx0eTogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogNDMwXG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3plbkltYWdlLnBuZ1wiXG5cblxuemVuRmFkZSA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplbkZhZGVcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMFxuXHR5OiAwXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA0MzBcblx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoOS4wMDAwMDA0MTM1MDcyMjMsIDkuMDAwMDAwNDEzNTA3MjIzLCA5LjAwMDAwMDQxMzUwNzIyMywgMSlcIlxuXG56ZW5GYWRlLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdG9wYWNpdHk6IDFcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHRvcGFjaXR5OiAxXG5cdFwic2Nyb2xsZWRcIjpcblx0XHRvcGFjaXR5OiAwXG5cblxuemVuTWVudSA9IG5ldyBMYXllclxuXHRuYW1lOiBcInplbk1lbnVcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMzE2XG5cdHk6IDhcblx0d2lkdGg6IDI4XG5cdGhlaWdodDogMjhcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3plbk1lbnUucG5nXCJcblxuemVuTWVudS5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHRvcGFjaXR5OiAwXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0b3BhY2l0eTogMFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0b3BhY2l0eTogMVxuXG5cbnplblRpdGxlID0gbmV3IExheWVyXG5cdG5hbWU6IFwiemVuVGl0bGVcIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMTZcblx0d2lkdGg6IDMxMlxuXHRoZWlnaHQ6IDQ4XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3plblRpdGxlLnBuZ1wiXG5cbnplblRpdGxlLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHk6IDM4XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMzhcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDI0M1xuXG5cbnplblRleHQgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ6ZW5UZXh0XCJcblx0cGFyZW50OiB6ZW5DYXJkXG5cdHg6IDE2XG5cdHdpZHRoOiAzMTJcblx0aGVpZ2h0OiA2MFxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuVGV4dC5wbmdcIlxuXG56ZW5UZXh0LnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHk6IDk0XG5cdFx0b3BhY2l0eTogMC43XG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogOTRcblx0XHRvcGFjaXR5OiAwLjdcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHk6IDI5OVxuXHRcdG9wYWNpdHk6IDFcblxuXG56ZW5Cb3R0b20gPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ6ZW5Cb3R0b21cIlxuXHRwYXJlbnQ6IHplbkNhcmRcblx0eDogMFxuXHR5OiAzNjZcblx0d2lkdGg6IDM0NFxuXHRoZWlnaHQ6IDY0XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL3plbkJvdHRvbS5wbmdcIlxuXG5cbnplbkZha2VTb3VyY2UgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJ6ZW5GYWtlU291cmNlXCJcblx0cGFyZW50OiB6ZW5DYXJkXG5cdHg6IDE2XG5cdHk6IDE2XG5cdHdpZHRoOiAyMjhcblx0aGVpZ2h0OiAxNFxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvemVuRmFrZVNvdXJjZS5wbmdcIlxuXG56ZW5GYWtlU291cmNlLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdG9wYWNpdHk6IDFcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHRvcGFjaXR5OiAxXG5cdFwic2Nyb2xsZWRcIjpcblx0XHRvcGFjaXR5OiAwXG5cblxubGF5ZXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJsYXllclwiXG5cdHBhcmVudDogZmlnbWFWaWV3XG5cdHg6IDBcblx0d2lkdGg6IDM2MFxuXHRoZWlnaHQ6IDY0MFxuXHRvcGFjaXR5OiAxXG5cdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cbmxheWVyLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHk6IDBcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR5OiAwXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR5OiA0MDBcblxuXG5sYXllclNoYWRvdyA9IG5ldyBMYXllclxuXHRuYW1lOiBcImxheWVyU2hhZG93XCJcblx0cGFyZW50OiBsYXllclxuXHR4OiAwXG5cdHk6IDQyNFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogMTY0XG5cdG9wYWNpdHk6IDFcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2xheWVyU2hhZG93LnBuZ1wiXG5cblxubmV3c0JnID0gbmV3IExheWVyXG5cdG5hbWU6IFwibmV3c0JnXCJcblx0cGFyZW50OiBsYXllclxuXHRvcGFjaXR5OiAxXG5cdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpXCJcblxubmV3c0JnLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHg6IDZcblx0XHR5OiA0NzVcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA0MThcblx0XCJvdmVyTGF5ZXJcIjpcblx0XHR4OiAwXG5cdFx0eTogMjRcblx0XHR3aWR0aDogMzYwXG5cdFx0aGVpZ2h0OiA1NzBcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHg6IDZcblx0XHR5OiA0NzVcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA0MThcblxuXG5uZXdzRmFrZVRpdGxlID0gbmV3IExheWVyXG5cdG5hbWU6IFwibmV3c0Zha2VUaXRsZVwiXG5cdHBhcmVudDogbGF5ZXJcblx0eDogMFxuXHR3aWR0aDogMzYwXG5cdGhlaWdodDogMTZcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL25ld3NGYWtlVGl0bGUucG5nXCJcblxubmV3c0Zha2VUaXRsZS5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR5OiA0ODdcblx0XHRvcGFjaXR5OiAxXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eTogMTg4XG5cdFx0b3BhY2l0eTogMFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eTogNDg3XG5cdFx0b3BhY2l0eTogMVxuXG5cbm5ld3NGb290ZXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJuZXdzRm9vdGVyXCJcblx0cGFyZW50OiBsYXllclxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9uZXdzRm9vdGVyLnBuZ1wiXG5cbm5ld3NGb290ZXIuc3RhdGVzID1cblx0XCJiYXNlXCI6XG5cdFx0eDogNlxuXHRcdHk6IDg1MC4zXG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNDIuNVxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHg6IDBcblx0XHR5OiA1NTRcblx0XHR3aWR0aDogMzYwXG5cdFx0aGVpZ2h0OiA0NFxuXHRcInNjcm9sbGVkXCI6XG5cdFx0eDogNlxuXHRcdHk6IDg1MC4zXG5cdFx0d2lkdGg6IDM0OFxuXHRcdGhlaWdodDogNDIuNVxuXG5cbm5ld3NJdGVtcyA9IG5ldyBMYXllclxuXHRuYW1lOiBcIm5ld3NJdGVtc1wiXG5cdHBhcmVudDogbGF5ZXJcblx0b3BhY2l0eTogMVxuXHRpbWFnZTogXCJpbWFnZXMvZmlnbWEvbmV3c0l0ZW1zLnBuZ1wiXG5cbm5ld3NJdGVtcy5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR4OiA2XG5cdFx0eTogNTAyLjVcblx0XHR3aWR0aDogMzQ4LjBcblx0XHRoZWlnaHQ6IDM0OC4wXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eDogMFxuXHRcdHk6IDE5NFxuXHRcdHdpZHRoOiAzNjAuMFxuXHRcdGhlaWdodDogMzYwLjBcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHg6IDZcblx0XHR5OiA1MDIuNVxuXHRcdHdpZHRoOiAzNDguMFxuXHRcdGhlaWdodDogMzQ4LjBcblxuXG5uZXdzSGVhZGVyID0gbmV3IExheWVyXG5cdG5hbWU6IFwibmV3c0hlYWRlclwiXG5cdHBhcmVudDogbGF5ZXJcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL25ld3NIZWFkZXIucG5nXCJcblxubmV3c0hlYWRlci5zdGF0ZXMgPVxuXHRcImJhc2VcIjpcblx0XHR4OiA2XG5cdFx0eTogNDMyLjlcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA2OS42XG5cdFx0b3BhY2l0eTogMFxuXHRcIm92ZXJMYXllclwiOlxuXHRcdHg6IDBcblx0XHR5OiAxMjJcblx0XHR3aWR0aDogMzYwXG5cdFx0aGVpZ2h0OiA3MlxuXHRcdG9wYWNpdHk6IDFcblx0XCJzY3JvbGxlZFwiOlxuXHRcdHg6IDZcblx0XHR5OiA0MzIuOVxuXHRcdHdpZHRoOiAzNDhcblx0XHRoZWlnaHQ6IDY5LjZcblx0XHRvcGFjaXR5OiAwXG5cblxuaGVhZGVyTGF5ZXIgPSBuZXcgTGF5ZXJcblx0bmFtZTogXCJoZWFkZXJMYXllclwiXG5cdHBhcmVudDogbGF5ZXJcblx0aW1hZ2U6IFwiaW1hZ2VzL2ZpZ21hL2hlYWRlckxheWVyLnBuZ1wiXG5cbmhlYWRlckxheWVyLnN0YXRlcyA9XG5cdFwiYmFzZVwiOlxuXHRcdHg6IDZcblx0XHR5OiAzNzUuNlxuXHRcdHdpZHRoOiAzNDhcblx0XHRoZWlnaHQ6IDkyLjhcblx0XHRvcGFjaXR5OiAwXG5cdFwib3ZlckxheWVyXCI6XG5cdFx0eDogMFxuXHRcdHk6IDI0XG5cdFx0d2lkdGg6IDM2MFxuXHRcdGhlaWdodDogOTZcblx0XHRvcGFjaXR5OiAxXG5cdFwic2Nyb2xsZWRcIjpcblx0XHR4OiA2XG5cdFx0eTogMzc1LjZcblx0XHR3aWR0aDogMzQ4XG5cdFx0aGVpZ2h0OiA5Mi44XG5cdFx0b3BhY2l0eTogMFxuXG5cbmJvdHRvbUJhciA9IG5ldyBMYXllclxuXHRuYW1lOiBcImJvdHRvbUJhclwiXG5cdHBhcmVudDogZmlnbWFWaWV3XG5cdHg6IDBcblx0eTogNTkyXG5cdHdpZHRoOiAzNjBcblx0aGVpZ2h0OiA0OFxuXHRvcGFjaXR5OiAxXG5cdGltYWdlOiBcImltYWdlcy9maWdtYS9ib3R0b21CYXIucG5nXCJcblxuXG5zY2VuZVN0YXRlcyA9IFtcImJhc2VcIiwgXCJvdmVyTGF5ZXJcIiwgXCJzY3JvbGxlZFwiXVxuc2NlbmVMYXllcnMgPSBbZmlnbWFWaWV3LCBoZWFkZXIsIGJnLCBjb2xvcmVkLCB2ZXJ0aWNhbHMsIHRleHRzLCBwYW5lbCwgYXJyb3csIGxvZ28sIGJhbm5lciwgc3RhdHVzQmFyLCB6ZW5DYXJkLCB6ZW5JbWFnZSwgemVuRmFkZSwgemVuTWVudSwgemVuVGl0bGUsIHplblRleHQsIHplbkJvdHRvbSwgemVuRmFrZVNvdXJjZSwgbGF5ZXIsIGxheWVyU2hhZG93LCBuZXdzQmcsIG5ld3NGYWtlVGl0bGUsIG5ld3NGb290ZXIsIG5ld3NJdGVtcywgbmV3c0hlYWRlciwgaGVhZGVyTGF5ZXIsIGJvdHRvbUJhcl1cblxuZm9yIGl0ZW0gaW4gc2NlbmVMYXllcnNcblx0dHJ5IGl0ZW0uc3RhdGVTd2l0Y2goc2NlbmVTdGF0ZXNbMF0pXG5cblxuY3ljbGVyID0gVXRpbHMuY3ljbGUoc2NlbmVTdGF0ZXMpXG5uZXh0U3RhdGUgPSBjeWNsZXIoKVxuXG5uZXh0U3RhdGVIYW5kbGVyID0gKCkgLT5cblx0bmV4dFN0YXRlID0gY3ljbGVyKClcblx0Zm9yIGl0ZW0gaW4gc2NlbmVMYXllcnNcblx0XHR0cnlcblx0XHRcdGl0ZW0uYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRjYXRjaCBlcnJvclxuXG5cbmZpZ21hVmlldy5vbiBFdmVudHMuQ2xpY2ssIC0+XG5cdG5leHRTdGF0ZUhhbmRsZXIoKVxuXG5cblxuXG5cblxuXG4jIE9WRVJSSURFU1xuXG5zY2VuZVN0YXRlcyA9IFtcImJhc2VcIiwgXCJvdmVyTGF5ZXJcIl1cbmN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNjZW5lU3RhdGVzKVxubmV4dFN0YXRlID0gY3ljbGVyKClcblxuXG5cblxuZmlnbWFWaWV3LmNsaXAgPSB0cnVlXG5cbm5ld3NCZy5zdGF0ZXMuYmFzZS5ib3JkZXJSYWRpdXMgPSA4XG5uZXdzQmcuc3RhdGVzLm92ZXJMYXllci5ib3JkZXJSYWRpdXMgPSAwXG5uZXdzQmcuc3RhdGVzLnNjcm9sbGVkLmJvcmRlclJhZGl1cyA9IDhcbm5ld3NCZy5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cblxuXG5cblxuXG5cbnplbkNhcmQudGl0bGUgPSBcInplbkNhcmRcIlxuXG5leHBvcnRzLmxheWVycyA9IHtcblx0XCJmaWdtYVZpZXdcIjogZmlnbWFWaWV3LFxuXHRcImJvdHRvbUJhclwiOiBib3R0b21CYXIsXG5cdFwibGF5ZXJcIjogbGF5ZXIsXG5cdFwidGl0bGVcIjogemVuVGl0bGUsXG5cdFwidGV4dFwiOiB6ZW5UZXh0LFxuXHRcInNvdXJjZVwiOiB6ZW5GYWtlU291cmNlLFxufVxuXG5cblxuZXhwb3J0cy5zY2VuZUxheWVycyA9ICgpIC0+XG5cdHJldHVybiBzY2VuZUxheWVyc1xuXG5leHBvcnRzLnNjZW5lU3RhdGVzID0gKCkgLT5cblx0cmV0dXJuIHNjZW5lU3RhdGVzXG5cblxuemVuRmFkZS5vcGFjaXR5ID0gMC43IiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXG5cblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSBcIiNGRkZGRkZcIlxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG4iLCJcblxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIlxuIiwiIyBQcmV2aWV3IENvbXBvbmVudFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG4jIHtQcmV2aWV3Q2xhc3MxfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MxXCJcbiMge1ByZXZpZXdDbGFzczR9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczRcIlxuIyB7UHJldmlld0NsYXNzNX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNVwiXG57UHJldmlld0NsYXNzNn0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNlwiXG5cbiMgcHJpbnQgUHJldmlld1xuXG5cbmNsYXNzIEZpeFByZXZpZXdFeHBvcnQgZXh0ZW5kcyBQcmV2aWV3Q2xhc3M2XG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBGaXhQcmV2aWV3RXhwb3J0XG5cblxuXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cblxuIyBwcmV2aWV3LmFkZFNlY3Rpb24oXCJTZWN0aW9uIFRpdGxlXCIsIFtcbiMgXHR7IHRpdGxlOiBcIlRpdGxlMVwiLCBoYW5kbGVyOiBoYW5kbGVyMSB9LFxuIyBcdHsgdGl0bGU6IFwiVGl0bGUyXCIsIGhhbmRsZXI6IGhhbmRsZXIyIH0sXG4jIF0pXG5cblxuXG5cblxuXG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIlxuXG57UHJldmlld0NsYXNzNX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNVwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3M2IGV4dGVuZHMgUHJldmlld0NsYXNzNVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dHJlZVZpZXdMYXllciA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHdpZHRoOiAzMjBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFxuXHRcdHRyZWVWaWV3TGF5ZXIuY29udGVudC5oZWlnaHQgPSAwXG5cdFx0dHJlZVZpZXdMYXllci5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblx0XHRcdFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRyZWVWaWV3OiB0cmVlVmlld0xheWVyXG5cdFx0XHRpbmRlbnQ6IDFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJlZVZpZXdMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ3RyZWVWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRyZWVWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRyZWVWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2luZGVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbmRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5kZW50ID0gdmFsdWVcblx0XG5cblxuXHRwcmludFRyZWU6ICgpID0+XG5cdFx0cHJpbnQgQHZpZXcuY2hpbGRyZW5cblx0XHRAcHJpbnROb2RlKEB2aWV3KVxuXHRcdEB0cmVlVmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cdFx0QHRyZWVWaWV3LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblxuXHRwcmludE5vZGU6IChub2RlLCBsZXZlbCA9IDApID0+XG5cdFx0aWYgbm9kZS5uYW1lID09IFwiXCIgdGhlbiBsYXllck5hbWUgPSBcIlVudGl0bGVkXCIgZWxzZSBsYXllck5hbWUgPSBub2RlLm5hbWVcblx0XHQjIHByaW50IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblxuXHRcdHRyZWVOb2RlTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEB0cmVlVmlldy5jb250ZW50XG5cdFx0XHR0ZXh0OiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cdFx0XHRcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRcdG9wYWNpdHk6IGlmIGxheWVyTmFtZSA9PSBcIlVudGl0bGVkXCIgdGhlbiAwLjUgZWxzZSAxXG5cdFx0XHRoZWlnaHQ6IDI4XG5cdFx0XHR5OiBAdHJlZVZpZXcuaGVpZ2h0XG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxheWVyOiBub2RlXG5cdFx0XG5cdFx0dHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0cHJpbnQgXCIje0BjdXN0b20ubGF5ZXIubmFtZX0geDogI3tAY3VzdG9tLmxheWVyLnh9IHk6ICN7QGN1c3RvbS5sYXllci55fSBzaXplOiAje0BjdXN0b20ubGF5ZXIud2lkdGh9eCN7QGN1c3RvbS5sYXllci5oZWlnaHR9XCJcblxuXHRcdFxuXHRcdEB0cmVlVmlldy5oZWlnaHQgKz0gMjhcblxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXHRcdFxuIiwiXG5cbntQcmV2aWV3Q2xhc3M0fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M0XCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczUgZXh0ZW5kcyBQcmV2aWV3Q2xhc3M0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRjb250cm9sUGFuZWxMYXllciA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAwXG5cdFx0XHR4OiAyMCwgeTogNjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGNvbnRyb2xQYW5lbDogY29udHJvbFBhbmVsTGF5ZXJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICdjb250cm9sUGFuZWwnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbCA9IHZhbHVlXG5cdFxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIHJldHVyblxuXHRcdGVsc2Vcblx0XHRcdHNlY3Rpb25WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdHdpZHRoOiAzNjBcblx0XHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udHJvbFBhbmVsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XHRzZWN0aW9uVmlldy55ID0gKEBjb250cm9sUGFuZWwuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAxMDBcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZSh0aXRsZSkucGFyZW50ID0gc2VjdGlvblZpZXdcblxuXHRcdFx0c3VtWCA9IDBcblx0XHRcdGZvciBhY3Rpb25JdGVtLCBpbmRleCBpbiBhY3Rpb25BcnJheVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZFNlY3Rpb25CdXR0b24oYWN0aW9uSXRlbSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcdFx0XG5cblxuXG5cblx0YWRkU2VjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIHBWID0gNiwgcEggPSA5KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiBwViwgYm90dG9tOiBwViArIDIsIGxlZnQ6IHBILCByaWdodDogcEggfVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0XG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgYWN0aW9uSXRlbS5oYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAodGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdHJldHVybiBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiB0aXRsZVxuXHRcdFx0Zm9udFNpemU6IDE1XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiAxMlxuXG5cblxuXG4jICMgRXhhbXBsZVxuIyBwcmV2aWV3LmFkZFNlY3Rpb24oXCJDaG9vc2UgQmFja2dyb3VuZFwiLCBbXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH0sXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH1cbiMgXSkiLCJcblxue1ByZXZpZXdDbGFzczN9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczNcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNCBleHRlbmRzIFByZXZpZXdDbGFzczNcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0QHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2Vcblx0XHRcdEB1cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRcdEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblxuXG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cblxuXG5cblx0c2V0RGVza3RvcFNjYWxlTW9kZTogKGZvclN0YXRlID0gXCJub3JtYWxcIikgPT5cblxuXHRcdGluaXRTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIGZvclN0YXRlKVxuXG5cdFx0c2hvdWxkU2hvd0J1dHRvbiA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIHRydWUpXG5cblx0XHRzaG91bGRTaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgdHJ1ZSlcblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRAc3RhdGVTd2l0Y2goaW5pdFN0YXRlKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gXCIyMjJcIlxuXHRcdEBjcmVhdGVCYXJzKClcblx0XHRAY2VudGVyKClcblx0XHRAY2xpcCA9IHRydWVcblxuXG5cdHVwZGF0ZVByZXZpZXdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbFByZXZpZXcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy55ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdHByZXZpZXdDYW52YXMgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMjIyXCIsIG5hbWU6IFwiLmhpZGRlblByZXZpZXdDYW52YXNcIlxuXHRcdFxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAY2VudGVyKClcblx0XHRAb3JpZ2luWSA9IDAuNVxuXHRcdEBvcmlnaW5YID0gMC41XG5cblx0XHQjIHByaW50IEB3aWR0aCArICcgJyArIEBoZWlnaHRcblx0XHRcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpXG5cdFx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wXG5cdFx0QG9yaWdpblkgPSAwLjFcblx0XHRcblx0XHRAc2NhbGUgPSAoU2NyZWVuLmhlaWdodCAtIDEyMCkgLyBAaGVpZ2h0XG5cdFx0QGJvcmRlclJhZGl1cyA9IDIwXG5cdFx0QGNsaXAgPSB0cnVlXG5cblx0XHR0aXAgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAyNDAsIGhlaWdodDogNDRcblx0XHRcdGltYWdlOiBAYXNzZXRzLnRpcFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTMwKVxuXHRcdFx0b3BhY2l0eTogMC41XG5cblxuXG5cblx0IyBnZXRTdGF0ZUdlbmVyaWM6IChrZXkgPSBcInNjYWxlXCIsIHBhaXJzID0gW3sgdmFsdWU6ICwgcmVzdWx0OiB9LCB7dmFsdWU6ICwgcmVzdWx0OiB9XSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpXG5cdGdldFN0YXRlR2VuZXJpYzogKHN0YXRlS2V5ID0gXCJzY2FsZVwiLCBzdGF0ZVBhaXJzID0gW10sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKSA9PlxuXHRcdHJlc3VsdCA9IGRlZmF1bHRSZXN1bHRcblxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblxuXHRcdFx0aWYga2V5UGFydCA9PSBzdGF0ZUtleVxuXHRcdFx0XHRmb3IgcGFpciBpbiBzdGF0ZVBhaXJzXG5cdFx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IHBhaXIudmFsdWVcblx0XHRcdFx0XHRcdCMgcHJpbnQgXCJvayBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHBhaXIucmVzdWx0XG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwibm90IFwiICsgXCIgI3twYWlyLnZhbHVlfVwiIFxuXHRcdFxuXHRcdHJldHVybiByZXN1bHRcblx0XG5cdFxuXHRcblx0XG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIlByZXZpZXdfTG9nb0xheWVyXCJcbntQcmV2aWV3Q2xhc3MyfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MyXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczMgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cblxuXG4iLCJcblxue1ByZXZpZXdDbGFzczF9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczFcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMiBleHRlbmRzIFByZXZpZXdDbGFzczFcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRzdGF0dXNCYXI6IFwiZGFya1wiICMgbGlnaHQvZGFya1xuXHRcdFx0aG9tZUJhcjogXCJkYXJrXCIgIyBsaWdodC9kYXJrXG5cblx0XHRcdHZpc2libGU6IHRydWUgIyB0cnVlIC8gZmFsc2Vcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2UgIyB0cnVlIC8gZmFsc2VcblxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBcIjIwOjIwXCIgIyBnZW5lcmF0ZWQgZnJvbSBqc29uXG5cdFx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyID0gdmFsdWVcblxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cblxuXG5cdCMgQ3JlYXRlIEJhcnNcblxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdHRvcEJhciA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIodG9wQmFyKSBcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcilcblx0XG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQoNCksIHk6IEFsaWduLnRvcCgyICsgNSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCgtNCksIHk6IEFsaWduLnRvcCg1KVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wKDIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLnRvcCgpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRob21lSW5kaWNhdG9yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bob21lQmFyXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0IiwiXG5cbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3X0Fzc2V0c1wiXG5cblxuIyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cblx0XG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cblx0QGRlZmluZSAnYXNzZXRzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0c1xuXG5cblxuXG5cblx0c2NyZWVuU2l6ZTogKHcsIGgpID0+IHJldHVybiBTY3JlZW4ud2lkdGggPT0gdyBhbmQgU2NyZWVuLmhlaWdodCA9PSBoXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB3aWR0aCA9PSB3IGFuZCBAaGVpZ2h0ID09IGhcblx0dmlld1dpZHRoOiAodykgPT4gcmV0dXJuIEB3aWR0aCA9PSB3XG5cblx0bG9nU2l6ZTogKCkgPT5cblx0XHRuZXcgVGV4dExheWVyIHsgdGV4dDogXCIje1NjcmVlbi53aWR0aH14I3tTY3JlZW4uaGVpZ2h0fVwiLCB5OiBBbGlnbi5jZW50ZXIgfVx0XG5cblxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblxuXG5cdFx0XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQWFBQTtBREVBLElBQUEsTUFBQTtFQUFBOzs7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxnQkFBUjs7QUFLSCxPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsSUFBQSxFQUFNLElBRE47TUFHQSxlQUFBLEVBQWlCLElBSGpCO01BSUEsWUFBQSxFQUFjLEVBSmQ7TUFNQSxNQUFBLEVBQVEsTUFBTSxDQUFDLElBTmY7S0FERDtJQVNBLCtDQUFNLElBQUMsQ0FBQSxPQUFQO0lBR0EsTUFBTSxDQUFDLDhCQUFQLENBQXNDLElBQXRDO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLEtB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
