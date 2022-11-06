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


},{}],"iOSSegmentedControl":[function(require,module,exports){

/*
     * iOSSegmentedControl
    {iOSSegmentedControl} = require "iOSSegmentedControl"

    segControl = new iOSSegmentedControl
         * OPTIONAL
        items: <array> (strings for each segment title)
        tintColor: <color> (defaults to iOS blue)
        backgroundColor: <color> (defaults to white)
        width: <number> (defaults to Screen.width with 16dp padding)
        height: <number> (defaults to 29)
        isMomentary: <bool> (don't highlight items on tap), defaults to false)

    segControl.setSelected <bool>, <number>
         * if bool=true, select, or if bool=false, unselect the segment at index <number>

    segControl.insertSegment <string>, <number> optional
         * add a new segment with the name <string>
         * optionally specify the index to insert the new segment at
         * by default, insert in the last postion

    segControl.removeSegment <number>
         * remove the segment at index <number>

    segControl.setTitle <string>, <number>
         * change the title to <string> of the segment at index <number>

    segControl.setWidth <number>, <number>
         * hard-set width of segment at the second <number> index to the first <number>

     * Observe the "change:currentSegment" event
    navBar.on "change:currentSegment", (currentSegment, lastSegment) ->
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.iOSSegmentedControl = (function(superClass) {
  extend(iOSSegmentedControl, superClass);

  function iOSSegmentedControl(options) {
    var item, j, len, ref;
    if (options == null) {
      options = {};
    }
    this._touchEnd = bind(this._touchEnd, this);
    this.HPADDING = 16;
    this.HEIGHT = 29;
    options = _.defaults({}, options, {
      items: [],
      tintColor: "#007AFF",
      backgroundColor: "#FFFFFF",
      width: Screen.width - this.HPADDING * 2,
      height: this.HEIGHT,
      x: this.HPADDING,
      isMomentary: false,
      clip: true
    });
    iOSSegmentedControl.__super__.constructor.call(this, options);
    this.tintColor = options.tintColor;
    this.isMomentary = options.isMomentary;
    this.borderWidth = 1;
    this.borderRadius = 4;
    this._backgroundColor = options.backgroundColor;
    this._segments = [];
    ref = options.items;
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      this._addSegment(item);
    }
    this._layoutSegments();
    this._touchDown = false;
  }

  iOSSegmentedControl.prototype._segmentForEvent = function(event) {
    var aLayer, j, len, point, ref, touchEvent;
    touchEvent = Events.touchEvent(event);
    point = {
      x: touchEvent.clientX,
      y: touchEvent.clientY
    };
    point = Utils.convertPoint(point, void 0, this, true);
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      aLayer = ref[j];
      if (Utils.pointInFrame(point, aLayer.frame)) {
        return aLayer;
      }
    }
    return void 0;
  };

  iOSSegmentedControl.prototype._addSegment = function(title, index) {
    var segment, titleText;
    segment = new Layer({
      height: this.height,
      backgroundColor: this._backgroundColor,
      parent: this,
      name: ".Segment" + this._segments.length
    });
    segment.onTouchStart((function(_this) {
      return function(event, layer) {
        _this._touchDown = true;
        Events.wrap(document).addEventListener("tapend", _this._touchEnd);
        if (layer === _this._selectedItem) {
          return;
        }
        return layer.backgroundColor = new Color(_this._tintColor).alpha(.1);
      };
    })(this));
    segment.onTouchMove((function(_this) {
      return function(event, layer) {
        layer = _this._segmentForEvent(event);
        if (layer === void 0) {
          return;
        }
        _this._unselectAll();
        if (layer === _this._selectedItem) {
          return;
        }
        if (_this._touchDown) {
          return layer.backgroundColor = new Color(_this._tintColor).alpha(.1);
        }
      };
    })(this));
    segment.onTouchEnd((function(_this) {
      return function(event, layer) {
        layer = _this._segmentForEvent(event);
        if (layer === void 0) {
          return;
        }
        return _this._selectItem(layer);
      };
    })(this));
    titleText = new TextLayer({
      text: title,
      parent: segment,
      name: ".Label",
      color: this._tintColor,
      fontSize: 17,
      fontWeight: 400,
      textAlign: "center",
      width: segment.width
    });
    segment.title = title;
    segment.label = titleText;
    titleText.fontSize = 13;
    if (index != null) {
      return this._segments.splice(index, 0, segment);
    } else {
      return this._segments.push(segment);
    }
  };

  iOSSegmentedControl.prototype._touchEnd = function(event, layer) {
    this._touchDown = false;
    return this._unselectAll();
  };

  iOSSegmentedControl.prototype._layoutSegments = function() {
    var i, j, k, label, len, len1, nextX, ref, remainingWidth, segment, segmentsWithExplicitWidth, wSegment;
    ref = this._segments;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      segment = ref[i];
      segment.index = i;
      if (segment.hasExplicitWidth == null) {
        segmentsWithExplicitWidth = _.filter(this._segments, function(o) {
          return o.hasExplicitWidth != null;
        });
        remainingWidth = this.width;
        for (k = 0, len1 = segmentsWithExplicitWidth.length; k < len1; k++) {
          wSegment = segmentsWithExplicitWidth[k];
          remainingWidth -= wSegment.width;
        }
        segment.width = Math.round(remainingWidth / (this._segments.length - segmentsWithExplicitWidth.length));
      }
      segment.x = nextX;
      nextX = segment.maxX;
      segment.style.borderRight = "1px solid " + this._tintColor;
      segment.style.borderRadius = "0";
      if (i === 0) {
        segment.style.borderRadius = "4px 0 0 4px";
      }
      if (i === this._segments.length - 1) {
        if (this._segments.length === 1) {
          segment.style.borderRadius = "4px";
        } else {
          segment.style.borderRight = "";
          segment.style.borderRadius = "0 4px 4px 0";
        }
      }
      label = segment.children[0];
      if (label != null) {
        label.width = segment.width;
      }
      if (label != null) {
        label.center();
      }
    }
    return this.width = nextX;
  };

  iOSSegmentedControl.prototype._selectItem = function(item) {
    var oldItem;
    if (item === this._selectedItem) {
      return;
    }
    if (!this.isMomentary) {
      oldItem = this._selectedItem;
      this._selectedItem = item;
      this._unselectItem(oldItem);
      this._highlightItem(this._selectedItem);
    } else {
      this._unselectItem(item);
    }
    return this.emit("change:currentSegment", item, oldItem);
  };

  iOSSegmentedControl.prototype._unselectAll = function() {
    var j, len, ref, results, segment;
    ref = this._segments;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      segment = ref[j];
      if (segment !== this._selectedItem) {
        results.push(this._removeHighlight(segment));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  iOSSegmentedControl.prototype._unselectItem = function(item, isClearing) {
    if (item != null) {
      this._removeHighlight(item);
    }
    if (isClearing) {
      this._selectedItem = null;
      return this.emit("change:currentSegment", null, item);
    }
  };

  iOSSegmentedControl.prototype._highlightItem = function(item) {
    item.backgroundColor = this._tintColor;
    return item.label.color = this._backgroundColor;
  };

  iOSSegmentedControl.prototype._removeHighlight = function(item) {
    item.backgroundColor = this._backgroundColor;
    return item.label.color = this._tintColor;
  };

  iOSSegmentedControl.prototype._layout = function() {
    this.width = Screen.width - this.HPADDING * 2;
    return this._layoutSegments();
  };

  iOSSegmentedControl.define("isMomentary", {
    get: function() {
      return this._isMomentary;
    },
    set: function(value) {
      return this._isMomentary = value;
    }
  });

  iOSSegmentedControl.define("tintColor", {
    get: function() {
      return this._tintColor;
    },
    set: function(value) {
      var j, len, ref, ref1, ref2, segment;
      this.borderColor = value;
      if (this._segments) {
        ref = this._segments;
        for (j = 0, len = ref.length; j < len; j++) {
          segment = ref[j];
          segment.label.color = value;
          segment.style.borderRight = "1px solid " + value;
        }
      }
      if ((ref1 = this._selectedItem) != null) {
        ref1.backgroundColor = value;
      }
      if ((ref2 = this._selectedItem) != null) {
        ref2.label.color = this._backgroundColor;
      }
      return this._tintColor = value;
    }
  });

  iOSSegmentedControl.define("numberOfSegments", {
    get: function() {
      var ref;
      return (ref = this._segments) != null ? ref.length : void 0;
    }
  });

  iOSSegmentedControl.define("selectedSegmentIndex", {
    get: function() {
      var ref;
      return (ref = this._selectedItem) != null ? ref.index : void 0;
    }
  });

  iOSSegmentedControl.define("autoLayout", {
    get: function() {
      return this._autoLayout;
    },
    set: function(value) {
      return this._autoLayout = value;
    }
  });

  iOSSegmentedControl.prototype.setSelected = function(isSelected, index) {
    var segment;
    segment = this._segments[index];
    if (isSelected) {
      return this._selectItem(segment);
    } else {
      return this._unselectItem(segment, true);
    }
  };

  iOSSegmentedControl.prototype.insertSegment = function(title, index) {
    if (index == null) {
      index = this._segments.length;
    }
    this._addSegment(title, index);
    return this._layoutSegments();
  };

  iOSSegmentedControl.prototype.removeSegment = function(index) {
    if (this._segments[index] != null) {
      this._segments[index].destroy();
      this._segments.splice(index, 1);
      return this._layoutSegments();
    }
  };

  iOSSegmentedControl.prototype.removeAllSegments = function() {
    var results;
    results = [];
    while (this._segments.length > 0) {
      results.push(this.removeSegment(0));
    }
    return results;
  };

  iOSSegmentedControl.prototype.setTitle = function(title, index) {
    var ref;
    return (ref = this._segments[index]) != null ? ref.label.text = title : void 0;
  };

  iOSSegmentedControl.prototype.setWidth = function(width, index) {
    var ref, ref1, ref2;
    if (width != null) {
      if ((ref = this._segments[index]) != null) {
        ref.hasExplicitWidth = (ref1 = this._segments[index]) != null ? ref1.width = width : void 0;
      }
    } else {
      if ((ref2 = this._segments[index]) != null) {
        ref2.hasExplicitWidth = null;
      }
    }
    return this._layoutSegments();
  };

  iOSSegmentedControl.prototype.autoWidthLayout = function() {
    this.width = Screen.width - this.HPADDING * 2;
    return this._layoutSegments();
  };

  return iOSSegmentedControl;

})(Layer);


},{}],"iOSSwitch":[function(require,module,exports){

/*
	 * iOSSwitch
	{iOSSwitch} = require "iOSSwitch"

	switch = new iOSSwitch
		isOn: <bool> is the switch in the on position (defaults to false)
		tintColor: <color> the color of the switch background when isOn is true (defaults to iOS green)
		thumbTintColor: <color> the color of the switch thumb (defaults to white)

	 * Observe the "Events.ValueChange" event
	switch.onValueChange (value) ->
 */
var Switch, iOSKitColors,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

iOSKitColors = {
  red: new Color("FF3B30"),
  green: new Color("4CD964"),
  blue: new Color("007AFF"),
  black: new Color("000"),
  gray: new Color("8E8E93"),
  grey: new Color("8E8E93"),
  white: new Color("fff"),
  transparent: new Color("transparent")
};

Events.SwitchValueChange = "switchValueChange";

Switch = (function(superClass) {
  extend(Switch, superClass);

  function Switch(options) {
    var rimColor;
    if (options == null) {
      options = {};
    }
    options = _.defaults({}, options, {
      width: 51,
      height: 31,
      backgroundColor: iOSKitColors.transparent,
      tintColor: iOSKitColors.green,
      thumbTintColor: iOSKitColors.white,
      isOn: false
    });
    Switch.__super__.constructor.call(this, options);
    rimColor = "E5E5EA";
    this.base = new Layer({
      name: ".base",
      parent: this,
      width: this.width,
      height: this.height,
      backgroundColor: iOSKitColors.transparent,
      borderRadius: 20,
      borderColor: rimColor,
      borderWidth: 1.5,
      shadowColor: rimColor,
      shadowType: "inner"
    });
    this.base.states.on = {
      borderWidth: 0,
      shadowColor: this.tintColor,
      shadowSpread: 20
    };
    this.base.animationOptions = {
      time: 0.6,
      curve: Spring({
        damping: 0.75
      })
    };
    this.thumb = new Layer({
      name: ".thumb",
      parent: this,
      width: 29,
      height: 29,
      borderRadius: 14.5,
      x: 1,
      midY: this.height / 2,
      backgroundColor: iOSKitColors.transparent,
      borderWidth: 0.5,
      borderColor: "rgba(0,0,0,0.04)"
    });
    this.thumb.states.on = {
      x: 21
    };
    this.thumb.animationOptions = {
      time: 0.6,
      curve: Spring({
        damping: 0.8
      })
    };
    this.thumbFill = new Layer({
      name: "thumbFill",
      parent: this.thumb,
      x: 0.5,
      y: 0.5,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: this.thumbTintColor,
      shadow1: {
        y: 3,
        blur: 8,
        color: "rgba(0,0,0,0.15)"
      },
      shadow2: {
        y: 1,
        blur: 1,
        color: "rgba(0,0,0,0.16)"
      },
      shadow3: {
        y: 3,
        blur: 1,
        color: "rgba(0,0,0,0.10)"
      }
    });
    if (this.isOn) {
      this.base.stateSwitch("on");
      this.thumb.stateSwitch("on");
    }
    this.onClick(function() {
      return this.setOn(!this.isOn, true);
    });
  }

  Switch.define("tintColor", {
    get: function() {
      return this._tintColor;
    },
    set: function(value) {
      this._tintColor = value;
      return this._updateTintColor();
    }
  });

  Switch.define("thumbTintColor", {
    get: function() {
      return this._thumbTintColor;
    },
    set: function(value) {
      this._thumbTintColor = value;
      return this._updateThumb();
    }
  });

  Switch.define("isOn", {
    get: function() {
      return this._isOn;
    },
    set: function(value) {
      return this._isOn = value;
    }
  });

  Switch.prototype.setOn = function(switchOn, animated) {
    this.isOn = switchOn;
    animated = animated != null ? animated : true;
    if (this.isOn) {
      if (animated) {
        this.base.animate("on");
        this.thumb.animate("on");
      } else {
        this.base.stateSwitch("on");
        this.thumb.stateSwitch("on");
      }
    } else {
      if (animated) {
        this.base.animate("default");
        this.thumb.animate("default");
      } else {
        this.base.stateSwitch("default");
        this.thumb.stateSwitch("default");
      }
    }
    return this.emit(Events.SwitchValueChange, this.isOn);
  };

  Switch.prototype._updateTintColor = function() {
    if (this.base) {
      this.base.states.on.shadowColor = this.tintColor;
      if (this.isOn) {
        return this.base.stateSwitch("on");
      }
    }
  };

  Switch.prototype._updateThumb = function() {
    if (this.thumbFill) {
      return this.thumbFill.backgroundColor = this.thumbTintColor;
    }
  };

  Switch.prototype.onValueChange = function(cb) {
    return this.on(Events.SwitchValueChange, cb);
  };

  return Switch;

})(Layer);

exports.iOSSwitch = Switch;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9pT1NTd2l0Y2guY29mZmVlIiwiLi4vbW9kdWxlcy9pT1NTZWdtZW50ZWRDb250cm9sLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld19Mb2dvTGF5ZXIuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3X0Fzc2V0cy5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzNi5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczUuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3M0LmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzMy5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczIuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3MxLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMjI1xuXHQjIGlPU1N3aXRjaFxuXHR7aU9TU3dpdGNofSA9IHJlcXVpcmUgXCJpT1NTd2l0Y2hcIlxuXG5cdHN3aXRjaCA9IG5ldyBpT1NTd2l0Y2hcblx0XHRpc09uOiA8Ym9vbD4gaXMgdGhlIHN3aXRjaCBpbiB0aGUgb24gcG9zaXRpb24gKGRlZmF1bHRzIHRvIGZhbHNlKVxuXHRcdHRpbnRDb2xvcjogPGNvbG9yPiB0aGUgY29sb3Igb2YgdGhlIHN3aXRjaCBiYWNrZ3JvdW5kIHdoZW4gaXNPbiBpcyB0cnVlIChkZWZhdWx0cyB0byBpT1MgZ3JlZW4pXG5cdFx0dGh1bWJUaW50Q29sb3I6IDxjb2xvcj4gdGhlIGNvbG9yIG9mIHRoZSBzd2l0Y2ggdGh1bWIgKGRlZmF1bHRzIHRvIHdoaXRlKVxuXG5cdCMgT2JzZXJ2ZSB0aGUgXCJFdmVudHMuVmFsdWVDaGFuZ2VcIiBldmVudFxuXHRzd2l0Y2gub25WYWx1ZUNoYW5nZSAodmFsdWUpIC0+XG5cbiMjI1xuXG5pT1NLaXRDb2xvcnMgPVxuICByZWQ6IG5ldyBDb2xvcihcIkZGM0IzMFwiKVxuICBncmVlbjogbmV3IENvbG9yKFwiNENEOTY0XCIpXG4gIGJsdWU6ICBuZXcgQ29sb3IoXCIwMDdBRkZcIilcbiAgYmxhY2s6IG5ldyBDb2xvcihcIjAwMFwiKVxuICBncmF5OiBuZXcgQ29sb3IoXCI4RThFOTNcIilcbiAgZ3JleTogbmV3IENvbG9yKFwiOEU4RTkzXCIpXG4gIHdoaXRlOiBuZXcgQ29sb3IoXCJmZmZcIilcbiAgdHJhbnNwYXJlbnQ6IG5ldyBDb2xvcihcInRyYW5zcGFyZW50XCIpXG5cblxuRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlID0gXCJzd2l0Y2hWYWx1ZUNoYW5nZVwiXG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0b3B0aW9ucyA9IF8uZGVmYXVsdHMge30sIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogNTFcblx0XHRcdGhlaWdodDogMzFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogaU9TS2l0Q29sb3JzLnRyYW5zcGFyZW50XG5cblx0XHRcdHRpbnRDb2xvcjogaU9TS2l0Q29sb3JzLmdyZWVuXG5cdFx0XHR0aHVtYlRpbnRDb2xvcjogaU9TS2l0Q29sb3JzLndoaXRlXG5cdFx0XHRpc09uOiBmYWxzZVxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdHJpbUNvbG9yID0gXCJFNUU1RUFcIlxuXG5cdFx0QGJhc2UgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmJhc2VcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogaU9TS2l0Q29sb3JzLnRyYW5zcGFyZW50XG5cdFx0XHRib3JkZXJSYWRpdXM6IDIwXG5cdFx0XHRib3JkZXJDb2xvcjogcmltQ29sb3Jcblx0XHRcdGJvcmRlcldpZHRoOiAxLjVcblxuXHRcdFx0c2hhZG93Q29sb3I6IHJpbUNvbG9yXG5cdFx0XHRzaGFkb3dUeXBlOiBcImlubmVyXCJcblxuXHRcdEBiYXNlLnN0YXRlcy5vbiA9XG5cdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0c2hhZG93Q29sb3I6IEB0aW50Q29sb3Jcblx0XHRcdHNoYWRvd1NwcmVhZDogMjBcblxuXHRcdEBiYXNlLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0dGltZTogMC42XG5cdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuNzUpXG5cblx0XHRAdGh1bWIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLnRodW1iXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDI5LCBoZWlnaHQ6IDI5XG5cdFx0XHRib3JkZXJSYWRpdXM6IDE0LjVcblx0XHRcdHg6IDFcblx0XHRcdG1pZFk6IEBoZWlnaHQgLyAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlPU0tpdENvbG9ycy50cmFuc3BhcmVudFxuXHRcdFx0Ym9yZGVyV2lkdGg6IDAuNVxuXHRcdFx0Ym9yZGVyQ29sb3I6IFwicmdiYSgwLDAsMCwwLjA0KVwiXG5cdFx0QHRodW1iLnN0YXRlcy5vbiA9XG5cdFx0XHR4OiAyMVxuXHRcdEB0aHVtYi5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdHRpbWU6IDAuNlxuXHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjgpXG5cblx0XHRAdGh1bWJGaWxsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInRodW1iRmlsbFwiXG5cdFx0XHRwYXJlbnQ6IEB0aHVtYlxuXHRcdFx0eDogMC41XG5cdFx0XHR5OiAwLjVcblx0XHRcdHdpZHRoOiAyOCwgaGVpZ2h0OiAyOFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAdGh1bWJUaW50Q29sb3JcblxuXHRcdFx0c2hhZG93MTpcblx0XHRcdFx0eTogM1xuXHRcdFx0XHRibHVyOiA4XG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xNSlcIlxuXHRcdFx0c2hhZG93Mjpcblx0XHRcdFx0eTogMVxuXHRcdFx0XHRibHVyOiAxXG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xNilcIlxuXHRcdFx0c2hhZG93Mzpcblx0XHRcdFx0eTogM1xuXHRcdFx0XHRibHVyOiAxXG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xMClcIlxuXG5cdFx0aWYgQGlzT25cblx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdFx0QHRodW1iLnN0YXRlU3dpdGNoIFwib25cIlxuXG5cblxuXHRcdEBvbkNsaWNrIC0+XG5cdFx0XHRAc2V0T24gIUBpc09uLCB0cnVlXG5cblxuXHRAZGVmaW5lIFwidGludENvbG9yXCIsXG5cdFx0Z2V0OiAtPiBAX3RpbnRDb2xvclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF90aW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaW50Q29sb3IoKVxuXHRAZGVmaW5lIFwidGh1bWJUaW50Q29sb3JcIixcblx0XHRnZXQ6IC0+IEBfdGh1bWJUaW50Q29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfdGh1bWJUaW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaHVtYigpXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IEBfaXNPblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9pc09uID0gdmFsdWVcblxuXHRzZXRPbjogKHN3aXRjaE9uLCBhbmltYXRlZCkgLT5cblx0XHRAaXNPbiA9IHN3aXRjaE9uXG5cdFx0YW5pbWF0ZWQgPSBhbmltYXRlZCA/IHRydWVcblxuXHRcdGlmIEBpc09uXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwib25cIlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSBcIm9uXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRlbHNlXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcImRlZmF1bHRcIlxuXG5cdFx0QGVtaXQgRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlLCBAaXNPblxuXG5cblx0X3VwZGF0ZVRpbnRDb2xvcjogLT5cblx0XHRpZiBAYmFzZVxuXHRcdFx0QGJhc2Uuc3RhdGVzLm9uLnNoYWRvd0NvbG9yID0gQHRpbnRDb2xvclxuXHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiIGlmIEBpc09uXG5cblx0X3VwZGF0ZVRodW1iOiAtPlxuXHRcdGlmIEB0aHVtYkZpbGwgdGhlbiBAdGh1bWJGaWxsLmJhY2tncm91bmRDb2xvciA9IEB0aHVtYlRpbnRDb2xvclxuXG5cdG9uVmFsdWVDaGFuZ2U6IChjYikgLT4gQG9uKEV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSwgY2IpXG5cblxuZXhwb3J0cy5pT1NTd2l0Y2ggPSBTd2l0Y2hcbiIsIiMjI1xuICAgICMgaU9TU2VnbWVudGVkQ29udHJvbFxuICAgIHtpT1NTZWdtZW50ZWRDb250cm9sfSA9IHJlcXVpcmUgXCJpT1NTZWdtZW50ZWRDb250cm9sXCJcblxuICAgIHNlZ0NvbnRyb2wgPSBuZXcgaU9TU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAjIE9QVElPTkFMXG4gICAgICAgIGl0ZW1zOiA8YXJyYXk+IChzdHJpbmdzIGZvciBlYWNoIHNlZ21lbnQgdGl0bGUpXG4gICAgICAgIHRpbnRDb2xvcjogPGNvbG9yPiAoZGVmYXVsdHMgdG8gaU9TIGJsdWUpXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogPGNvbG9yPiAoZGVmYXVsdHMgdG8gd2hpdGUpXG4gICAgICAgIHdpZHRoOiA8bnVtYmVyPiAoZGVmYXVsdHMgdG8gU2NyZWVuLndpZHRoIHdpdGggMTZkcCBwYWRkaW5nKVxuICAgICAgICBoZWlnaHQ6IDxudW1iZXI+IChkZWZhdWx0cyB0byAyOSlcbiAgICAgICAgaXNNb21lbnRhcnk6IDxib29sPiAoZG9uJ3QgaGlnaGxpZ2h0IGl0ZW1zIG9uIHRhcCksIGRlZmF1bHRzIHRvIGZhbHNlKVxuXG4gICAgc2VnQ29udHJvbC5zZXRTZWxlY3RlZCA8Ym9vbD4sIDxudW1iZXI+XG4gICAgICAgICMgaWYgYm9vbD10cnVlLCBzZWxlY3QsIG9yIGlmIGJvb2w9ZmFsc2UsIHVuc2VsZWN0IHRoZSBzZWdtZW50IGF0IGluZGV4IDxudW1iZXI+XG5cbiAgICBzZWdDb250cm9sLmluc2VydFNlZ21lbnQgPHN0cmluZz4sIDxudW1iZXI+IG9wdGlvbmFsXG4gICAgICAgICMgYWRkIGEgbmV3IHNlZ21lbnQgd2l0aCB0aGUgbmFtZSA8c3RyaW5nPlxuICAgICAgICAjIG9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgaW5kZXggdG8gaW5zZXJ0IHRoZSBuZXcgc2VnbWVudCBhdFxuICAgICAgICAjIGJ5IGRlZmF1bHQsIGluc2VydCBpbiB0aGUgbGFzdCBwb3N0aW9uXG5cbiAgICBzZWdDb250cm9sLnJlbW92ZVNlZ21lbnQgPG51bWJlcj5cbiAgICAgICAgIyByZW1vdmUgdGhlIHNlZ21lbnQgYXQgaW5kZXggPG51bWJlcj5cblxuICAgIHNlZ0NvbnRyb2wuc2V0VGl0bGUgPHN0cmluZz4sIDxudW1iZXI+XG4gICAgICAgICMgY2hhbmdlIHRoZSB0aXRsZSB0byA8c3RyaW5nPiBvZiB0aGUgc2VnbWVudCBhdCBpbmRleCA8bnVtYmVyPlxuXG4gICAgc2VnQ29udHJvbC5zZXRXaWR0aCA8bnVtYmVyPiwgPG51bWJlcj5cbiAgICAgICAgIyBoYXJkLXNldCB3aWR0aCBvZiBzZWdtZW50IGF0IHRoZSBzZWNvbmQgPG51bWJlcj4gaW5kZXggdG8gdGhlIGZpcnN0IDxudW1iZXI+XG5cbiAgICAjIE9ic2VydmUgdGhlIFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIgZXZlbnRcbiAgICBuYXZCYXIub24gXCJjaGFuZ2U6Y3VycmVudFNlZ21lbnRcIiwgKGN1cnJlbnRTZWdtZW50LCBsYXN0U2VnbWVudCkgLT5cblxuIyMjXG5cblxuY2xhc3MgZXhwb3J0cy5pT1NTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgTGF5ZXJcblxuICAgIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblxuICAgICAgICBASFBBRERJTkcgPSAxNlxuICAgICAgICBASEVJR0hUID0gMjlcblxuICAgICAgICBvcHRpb25zID0gXy5kZWZhdWx0cyB7fSwgb3B0aW9ucyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICAgICAgdGludENvbG9yOiBcIiMwMDdBRkZcIlxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgd2lkdGg6IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgICAgICBoZWlnaHQ6IEBIRUlHSFRcbiAgICAgICAgICAgIHg6IEBIUEFERElOR1xuICAgICAgICAgICAgaXNNb21lbnRhcnk6IGZhbHNlXG4gICAgICAgICAgICBjbGlwOiB0cnVlXG5cbiAgICAgICAgc3VwZXIgb3B0aW9uc1xuXG4gICAgICAgIEB0aW50Q29sb3IgPSBvcHRpb25zLnRpbnRDb2xvclxuICAgICAgICBAaXNNb21lbnRhcnkgPSBvcHRpb25zLmlzTW9tZW50YXJ5XG4gICAgICAgIEBib3JkZXJXaWR0aCA9IDFcbiAgICAgICAgQGJvcmRlclJhZGl1cyA9IDRcblxuICAgICAgICBAX2JhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yXG4gICAgICAgIEBfc2VnbWVudHMgPSBbXVxuICAgICAgICBmb3IgaXRlbSBpbiBvcHRpb25zLml0ZW1zXG4gICAgICAgICAgICBAX2FkZFNlZ21lbnQgaXRlbVxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcbiAgICAgICAgQF90b3VjaERvd24gPSBmYWxzZVxuXG4gICAgX3NlZ21lbnRGb3JFdmVudDogKGV2ZW50KSAtPlxuICAgICAgICAjIFRvdWNoTW92ZSBkb2Vzbid0IHdvcmsgdGhlIHNhbWUgb24gbW9iaWxlLCBzbyBkbyB0aGUgaGl0IHRlc3Rpbmcgb3Vyc2VsdmVzXG4gICAgICAgIHRvdWNoRXZlbnQgPSBFdmVudHMudG91Y2hFdmVudChldmVudClcbiAgICAgICAgcG9pbnQgPSB7eDp0b3VjaEV2ZW50LmNsaWVudFgsIHk6dG91Y2hFdmVudC5jbGllbnRZfVxuICAgICAgICBwb2ludCA9IFV0aWxzLmNvbnZlcnRQb2ludChwb2ludCwgdW5kZWZpbmVkLCBALCB0cnVlKVxuICAgICAgICBmb3IgYUxheWVyIGluIEBjaGlsZHJlblxuICAgICAgICAgICAgcmV0dXJuIGFMYXllciBpZiBVdGlscy5wb2ludEluRnJhbWUocG9pbnQsIGFMYXllci5mcmFtZSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgX2FkZFNlZ21lbnQ6ICh0aXRsZSwgaW5kZXgpIC0+XG4gICAgICAgIHNlZ21lbnQgPSBuZXcgTGF5ZXJcbiAgICAgICAgICAgIGhlaWdodDogQGhlaWdodFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBAX2JhY2tncm91bmRDb2xvclxuICAgICAgICAgICAgcGFyZW50OiBAXG4gICAgICAgICAgICBuYW1lOiBcIi5TZWdtZW50XCIrQF9zZWdtZW50cy5sZW5ndGhcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hTdGFydCAoZXZlbnQsIGxheWVyKSA9PlxuICAgICAgICAgICAgQF90b3VjaERvd24gPSB0cnVlXG4gICAgICAgICAgICBFdmVudHMud3JhcChkb2N1bWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcInRhcGVuZFwiLCBAX3RvdWNoRW5kKVxuICAgICAgICAgICAgcmV0dXJuIGlmIGxheWVyIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgICAgICBsYXllci5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoQF90aW50Q29sb3IpLmFscGhhKC4xKVxuXG4gICAgICAgIHNlZ21lbnQub25Ub3VjaE1vdmUgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIGxheWVyID0gQF9zZWdtZW50Rm9yRXZlbnQgZXZlbnRcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyB1bmRlZmluZWRcblxuICAgICAgICAgICAgQF91bnNlbGVjdEFsbCgpXG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgICAgIGlmIEBfdG91Y2hEb3duIHRoZW4gbGF5ZXIuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKEBfdGludENvbG9yKS5hbHBoYSguMSlcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hFbmQgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIGxheWVyID0gQF9zZWdtZW50Rm9yRXZlbnQgZXZlbnRcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyB1bmRlZmluZWRcblxuICAgICAgICAgICAgQF9zZWxlY3RJdGVtIGxheWVyXG5cbiAgICAgICAgdGl0bGVUZXh0ID0gbmV3IFRleHRMYXllclxuICAgICAgICAgICAgdGV4dDogdGl0bGVcbiAgICAgICAgICAgIHBhcmVudDogc2VnbWVudFxuICAgICAgICAgICAgbmFtZTogXCIuTGFiZWxcIlxuICAgICAgICAgICAgY29sb3I6IEBfdGludENvbG9yXG4gICAgICAgICAgICBmb250U2l6ZTogMTdcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMFxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiXG4gICAgICAgICAgICB3aWR0aDogc2VnbWVudC53aWR0aFxuICAgICAgICBzZWdtZW50LnRpdGxlID0gdGl0bGVcbiAgICAgICAgc2VnbWVudC5sYWJlbCA9IHRpdGxlVGV4dFxuICAgICAgICB0aXRsZVRleHQuZm9udFNpemUgPSAxM1xuXG4gICAgICAgIGlmIGluZGV4P1xuICAgICAgICAgICAgQF9zZWdtZW50cy5zcGxpY2UgaW5kZXgsIDAsIHNlZ21lbnRcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF9zZWdtZW50cy5wdXNoIHNlZ21lbnRcblxuICAgIF90b3VjaEVuZDogKGV2ZW50LCBsYXllcik9PlxuICAgICAgICBAX3RvdWNoRG93biA9IGZhbHNlXG4gICAgICAgIEBfdW5zZWxlY3RBbGwoKVxuXG4gICAgX2xheW91dFNlZ21lbnRzOiAoKS0+XG4gICAgICAgIGZvciBzZWdtZW50LCBpIGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgIHNlZ21lbnQuaW5kZXggPSBpICMgcGFzc2VkIGluIGV2ZW50IGhhbmRsZXIgaW4gY2FzZSBvZiByZS1sYXlvdXQgYWZ0ZXIgaW5pdFxuICAgICAgICAgICAgIyBidHcgdGhlIGFiaWxpdHkgdG8gc2V0V2lkdGggb2YgYW55IHNlZ21lbnQgaXMgd2h5IHRoaXMgY29tcGxleGl0eSBleGlzdHNcbiAgICAgICAgICAgIHVubGVzcyBzZWdtZW50Lmhhc0V4cGxpY2l0V2lkdGg/XG4gICAgICAgICAgICAgICAgc2VnbWVudHNXaXRoRXhwbGljaXRXaWR0aCA9IF8uZmlsdGVyIEBfc2VnbWVudHMsIChvKS0+IHJldHVybiBvLmhhc0V4cGxpY2l0V2lkdGg/XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nV2lkdGggPSBAd2lkdGhcbiAgICAgICAgICAgICAgICBmb3Igd1NlZ21lbnQgaW4gc2VnbWVudHNXaXRoRXhwbGljaXRXaWR0aFxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmdXaWR0aCAtPSB3U2VnbWVudC53aWR0aFxuICAgICAgICAgICAgICAgIHNlZ21lbnQud2lkdGggPSBNYXRoLnJvdW5kIChyZW1haW5pbmdXaWR0aCAvIChAX3NlZ21lbnRzLmxlbmd0aCAtIHNlZ21lbnRzV2l0aEV4cGxpY2l0V2lkdGgubGVuZ3RoKSlcbiAgICAgICAgICAgIHNlZ21lbnQueCA9IG5leHRYXG4gICAgICAgICAgICBuZXh0WCA9IHNlZ21lbnQubWF4WFxuXG4gICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJpZ2h0ID0gXCIxcHggc29saWQgI3tAX3RpbnRDb2xvcn1cIlxuICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjBcIlxuICAgICAgICAgICAgaWYgaSBpcyAwIHRoZW4gc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweCAwIDAgNHB4XCJcbiAgICAgICAgICAgIGlmIGkgaXMgQF9zZWdtZW50cy5sZW5ndGgtMVxuICAgICAgICAgICAgICAgIGlmIEBfc2VnbWVudHMubGVuZ3RoIGlzIDFcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweFwiXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJpZ2h0ID0gXCJcIlxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMCA0cHggNHB4IDBcIlxuXG4gICAgICAgICAgICBsYWJlbCA9IHNlZ21lbnQuY2hpbGRyZW5bMF1cbiAgICAgICAgICAgIGxhYmVsPy53aWR0aCA9IHNlZ21lbnQud2lkdGhcbiAgICAgICAgICAgIGxhYmVsPy5jZW50ZXIoKVxuICAgICAgICBAd2lkdGggPSBuZXh0WFxuXG4gICAgX3NlbGVjdEl0ZW06IChpdGVtKS0+XG4gICAgICAgIHJldHVybiBpZiBpdGVtIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgIGlmICFAaXNNb21lbnRhcnlcbiAgICAgICAgICAgIG9sZEl0ZW0gPSBAX3NlbGVjdGVkSXRlbVxuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0gPSBpdGVtXG4gICAgICAgICAgICBAX3Vuc2VsZWN0SXRlbSBvbGRJdGVtXG4gICAgICAgICAgICBAX2hpZ2hsaWdodEl0ZW0gQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF91bnNlbGVjdEl0ZW0gaXRlbVxuICAgICAgICBAZW1pdChcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiLCBpdGVtLCBvbGRJdGVtKVxuXG4gICAgX3Vuc2VsZWN0QWxsOiAoKS0+XG4gICAgICAgIGZvciBzZWdtZW50IGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgIEBfcmVtb3ZlSGlnaGxpZ2h0IHNlZ21lbnQgdW5sZXNzIHNlZ21lbnQgaXMgQF9zZWxlY3RlZEl0ZW1cblxuICAgIF91bnNlbGVjdEl0ZW06IChpdGVtLCBpc0NsZWFyaW5nKS0+XG4gICAgICAgIGlmIGl0ZW0/IHRoZW4gQF9yZW1vdmVIaWdobGlnaHQgaXRlbVxuICAgICAgICBpZiBpc0NsZWFyaW5nXG4gICAgICAgICAgICBAX3NlbGVjdGVkSXRlbSA9IG51bGxcbiAgICAgICAgICAgIEBlbWl0KFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIsIG51bGwsIGl0ZW0pXG5cbiAgICBfaGlnaGxpZ2h0SXRlbTogKGl0ZW0pLT5cbiAgICAgICAgaXRlbS5iYWNrZ3JvdW5kQ29sb3IgPSBAX3RpbnRDb2xvclxuICAgICAgICBpdGVtLmxhYmVsLmNvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcblxuICAgIF9yZW1vdmVIaWdobGlnaHQ6IChpdGVtKS0+XG4gICAgICAgIGl0ZW0uYmFja2dyb3VuZENvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgaXRlbS5sYWJlbC5jb2xvciA9IEBfdGludENvbG9yXG5cbiAgICBfbGF5b3V0OiAoKS0+XG4gICAgICAgIEB3aWR0aCA9IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgQGRlZmluZSBcImlzTW9tZW50YXJ5XCIsXG4gICAgICAgIGdldDogLT4gQF9pc01vbWVudGFyeVxuICAgICAgICBzZXQ6ICh2YWx1ZSktPlxuICAgICAgICAgICAgQF9pc01vbWVudGFyeSA9IHZhbHVlXG5cbiAgICBAZGVmaW5lIFwidGludENvbG9yXCIsXG4gICAgICAgIGdldDogLT4gQF90aW50Q29sb3JcbiAgICAgICAgc2V0OiAodmFsdWUpLT5cbiAgICAgICAgICAgIEBib3JkZXJDb2xvciA9IHZhbHVlXG4gICAgICAgICAgICBpZiBAX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgZm9yIHNlZ21lbnQgaW4gQF9zZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmxhYmVsLmNvbG9yID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSaWdodCA9IFwiMXB4IHNvbGlkICN7dmFsdWV9XCJcbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtPy5iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZVxuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0/LmxhYmVsLmNvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgICAgIEBfdGludENvbG9yID0gdmFsdWVcblxuICAgIEBkZWZpbmUgXCJudW1iZXJPZlNlZ21lbnRzXCIsXG4gICAgICAgIGdldDogLT4gQF9zZWdtZW50cz8ubGVuZ3RoXG5cbiAgICBAZGVmaW5lIFwic2VsZWN0ZWRTZWdtZW50SW5kZXhcIixcbiAgICAgICAgZ2V0OiAtPiBAX3NlbGVjdGVkSXRlbT8uaW5kZXhcblxuICAgIEBkZWZpbmUgXCJhdXRvTGF5b3V0XCIsXG4gICAgICAgIGdldDogLT4gQF9hdXRvTGF5b3V0XG4gICAgICAgIHNldDogKHZhbHVlKS0+XG4gICAgICAgICAgICBAX2F1dG9MYXlvdXQgPSB2YWx1ZVxuXG4gICAgc2V0U2VsZWN0ZWQ6IChpc1NlbGVjdGVkLCBpbmRleCkgLT5cbiAgICAgICAgc2VnbWVudCA9IEBfc2VnbWVudHNbaW5kZXhdXG4gICAgICAgIGlmIGlzU2VsZWN0ZWQgdGhlbiBAX3NlbGVjdEl0ZW0gc2VnbWVudCBlbHNlIEBfdW5zZWxlY3RJdGVtIHNlZ21lbnQsIHRydWVcblxuICAgIGluc2VydFNlZ21lbnQ6ICh0aXRsZSwgaW5kZXgpIC0+XG4gICAgICAgIGlmICFpbmRleD8gdGhlbiBpbmRleCA9IEBfc2VnbWVudHMubGVuZ3RoXG4gICAgICAgIEBfYWRkU2VnbWVudCB0aXRsZSwgaW5kZXhcbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG5cbiAgICByZW1vdmVTZWdtZW50OiAoaW5kZXgpLT5cbiAgICAgICAgaWYgQF9zZWdtZW50c1tpbmRleF0/XG4gICAgICAgICAgICBAX3NlZ21lbnRzW2luZGV4XS5kZXN0cm95KClcbiAgICAgICAgICAgIEBfc2VnbWVudHMuc3BsaWNlIGluZGV4LCAxXG4gICAgICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIHJlbW92ZUFsbFNlZ21lbnRzOiAoKS0+XG4gICAgICAgIEByZW1vdmVTZWdtZW50IDAgd2hpbGUgQF9zZWdtZW50cy5sZW5ndGggPiAwXG5cbiAgICBzZXRUaXRsZTogKHRpdGxlLCBpbmRleCktPlxuICAgICAgICBAX3NlZ21lbnRzW2luZGV4XT8ubGFiZWwudGV4dCA9IHRpdGxlXG5cbiAgICBzZXRXaWR0aDogKHdpZHRoLCBpbmRleCktPlxuICAgICAgICBpZiB3aWR0aD9cbiAgICAgICAgICAgIEBfc2VnbWVudHNbaW5kZXhdPy5oYXNFeHBsaWNpdFdpZHRoID0gQF9zZWdtZW50c1tpbmRleF0/LndpZHRoID0gd2lkdGhcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF9zZWdtZW50c1tpbmRleF0/Lmhhc0V4cGxpY2l0V2lkdGggPSBudWxsXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgYXV0b1dpZHRoTGF5b3V0OiAoKS0+XG4gICAgICAgIEB3aWR0aCA9IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuIiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXG5cblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSBcIiNGRkZGRkZcIlxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG4iLCJcblxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIlxuIiwiIyBQcmV2aWV3IENvbXBvbmVudFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG4jIHtQcmV2aWV3Q2xhc3MxfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MxXCJcbiMge1ByZXZpZXdDbGFzczR9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczRcIlxuIyB7UHJldmlld0NsYXNzNX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNVwiXG57UHJldmlld0NsYXNzNn0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNlwiXG5cbiMgcHJpbnQgUHJldmlld1xuXG5cbmNsYXNzIEZpeFByZXZpZXdFeHBvcnQgZXh0ZW5kcyBQcmV2aWV3Q2xhc3M2XG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBGaXhQcmV2aWV3RXhwb3J0XG5cblxuXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cblxuIyBwcmV2aWV3LmFkZFNlY3Rpb24oXCJTZWN0aW9uIFRpdGxlXCIsIFtcbiMgXHR7IHRpdGxlOiBcIlRpdGxlMVwiLCBoYW5kbGVyOiBoYW5kbGVyMSB9LFxuIyBcdHsgdGl0bGU6IFwiVGl0bGUyXCIsIGhhbmRsZXI6IGhhbmRsZXIyIH0sXG4jIF0pXG5cblxuXG5cblxuXG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIlxuXG57UHJldmlld0NsYXNzNX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNVwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3M2IGV4dGVuZHMgUHJldmlld0NsYXNzNVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dHJlZVZpZXdMYXllciA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHdpZHRoOiAzMjBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFxuXHRcdHRyZWVWaWV3TGF5ZXIuY29udGVudC5oZWlnaHQgPSAwXG5cdFx0dHJlZVZpZXdMYXllci5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblx0XHRcdFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRyZWVWaWV3OiB0cmVlVmlld0xheWVyXG5cdFx0XHRpbmRlbnQ6IDFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJlZVZpZXdMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ3RyZWVWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRyZWVWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRyZWVWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2luZGVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbmRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5kZW50ID0gdmFsdWVcblx0XG5cblxuXHRwcmludFRyZWU6ICgpID0+XG5cdFx0cHJpbnQgQHZpZXcuY2hpbGRyZW5cblx0XHRAcHJpbnROb2RlKEB2aWV3KVxuXHRcdEB0cmVlVmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cdFx0QHRyZWVWaWV3LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblxuXHRwcmludE5vZGU6IChub2RlLCBsZXZlbCA9IDApID0+XG5cdFx0aWYgbm9kZS5uYW1lID09IFwiXCIgdGhlbiBsYXllck5hbWUgPSBcIlVudGl0bGVkXCIgZWxzZSBsYXllck5hbWUgPSBub2RlLm5hbWVcblx0XHQjIHByaW50IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblxuXHRcdHRyZWVOb2RlTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEB0cmVlVmlldy5jb250ZW50XG5cdFx0XHR0ZXh0OiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cdFx0XHRcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRcdG9wYWNpdHk6IGlmIGxheWVyTmFtZSA9PSBcIlVudGl0bGVkXCIgdGhlbiAwLjUgZWxzZSAxXG5cdFx0XHRoZWlnaHQ6IDI4XG5cdFx0XHR5OiBAdHJlZVZpZXcuaGVpZ2h0XG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxheWVyOiBub2RlXG5cdFx0XG5cdFx0dHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0cHJpbnQgXCIje0BjdXN0b20ubGF5ZXIubmFtZX0geDogI3tAY3VzdG9tLmxheWVyLnh9IHk6ICN7QGN1c3RvbS5sYXllci55fSBzaXplOiAje0BjdXN0b20ubGF5ZXIud2lkdGh9eCN7QGN1c3RvbS5sYXllci5oZWlnaHR9XCJcblxuXHRcdFxuXHRcdEB0cmVlVmlldy5oZWlnaHQgKz0gMjhcblxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXHRcdFxuIiwiXG5cbntQcmV2aWV3Q2xhc3M0fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M0XCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczUgZXh0ZW5kcyBQcmV2aWV3Q2xhc3M0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRjb250cm9sUGFuZWxMYXllciA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAwXG5cdFx0XHR4OiAyMCwgeTogNjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGNvbnRyb2xQYW5lbDogY29udHJvbFBhbmVsTGF5ZXJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICdjb250cm9sUGFuZWwnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbCA9IHZhbHVlXG5cdFxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIHJldHVyblxuXHRcdGVsc2Vcblx0XHRcdHNlY3Rpb25WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdHdpZHRoOiAzNjBcblx0XHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udHJvbFBhbmVsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XHRzZWN0aW9uVmlldy55ID0gKEBjb250cm9sUGFuZWwuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAxMDBcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZSh0aXRsZSkucGFyZW50ID0gc2VjdGlvblZpZXdcblxuXHRcdFx0c3VtWCA9IDBcblx0XHRcdGZvciBhY3Rpb25JdGVtLCBpbmRleCBpbiBhY3Rpb25BcnJheVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZFNlY3Rpb25CdXR0b24oYWN0aW9uSXRlbSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcdFx0XG5cblxuXG5cblx0YWRkU2VjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIHBWID0gNiwgcEggPSA5KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiBwViwgYm90dG9tOiBwViArIDIsIGxlZnQ6IHBILCByaWdodDogcEggfVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0XG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgYWN0aW9uSXRlbS5oYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAodGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdHJldHVybiBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiB0aXRsZVxuXHRcdFx0Zm9udFNpemU6IDE1XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiAxMlxuXG5cblxuXG4jICMgRXhhbXBsZVxuIyBwcmV2aWV3LmFkZFNlY3Rpb24oXCJDaG9vc2UgQmFja2dyb3VuZFwiLCBbXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH0sXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH1cbiMgXSkiLCJcblxue1ByZXZpZXdDbGFzczN9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczNcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNCBleHRlbmRzIFByZXZpZXdDbGFzczNcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0QHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2Vcblx0XHRcdEB1cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRcdEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblxuXG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cblxuXG5cblx0c2V0RGVza3RvcFNjYWxlTW9kZTogKGZvclN0YXRlID0gXCJub3JtYWxcIikgPT5cblxuXHRcdGluaXRTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIGZvclN0YXRlKVxuXG5cdFx0c2hvdWxkU2hvd0J1dHRvbiA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIHRydWUpXG5cblx0XHRzaG91bGRTaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgdHJ1ZSlcblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRAc3RhdGVTd2l0Y2goaW5pdFN0YXRlKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gXCIyMjJcIlxuXHRcdEBjcmVhdGVCYXJzKClcblx0XHRAY2VudGVyKClcblx0XHRAY2xpcCA9IHRydWVcblxuXG5cdHVwZGF0ZVByZXZpZXdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbFByZXZpZXcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy55ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdHByZXZpZXdDYW52YXMgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMjIyXCIsIG5hbWU6IFwiLmhpZGRlblByZXZpZXdDYW52YXNcIlxuXHRcdFxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAY2VudGVyKClcblx0XHRAb3JpZ2luWSA9IDAuNVxuXHRcdEBvcmlnaW5YID0gMC41XG5cblx0XHQjIHByaW50IEB3aWR0aCArICcgJyArIEBoZWlnaHRcblx0XHRcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpXG5cdFx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wXG5cdFx0QG9yaWdpblkgPSAwLjFcblx0XHRcblx0XHRAc2NhbGUgPSAoU2NyZWVuLmhlaWdodCAtIDEyMCkgLyBAaGVpZ2h0XG5cdFx0QGJvcmRlclJhZGl1cyA9IDIwXG5cdFx0QGNsaXAgPSB0cnVlXG5cblx0XHR0aXAgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAyNDAsIGhlaWdodDogNDRcblx0XHRcdGltYWdlOiBAYXNzZXRzLnRpcFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTMwKVxuXHRcdFx0b3BhY2l0eTogMC41XG5cblxuXG5cblx0IyBnZXRTdGF0ZUdlbmVyaWM6IChrZXkgPSBcInNjYWxlXCIsIHBhaXJzID0gW3sgdmFsdWU6ICwgcmVzdWx0OiB9LCB7dmFsdWU6ICwgcmVzdWx0OiB9XSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpXG5cdGdldFN0YXRlR2VuZXJpYzogKHN0YXRlS2V5ID0gXCJzY2FsZVwiLCBzdGF0ZVBhaXJzID0gW10sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKSA9PlxuXHRcdHJlc3VsdCA9IGRlZmF1bHRSZXN1bHRcblxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblxuXHRcdFx0aWYga2V5UGFydCA9PSBzdGF0ZUtleVxuXHRcdFx0XHRmb3IgcGFpciBpbiBzdGF0ZVBhaXJzXG5cdFx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IHBhaXIudmFsdWVcblx0XHRcdFx0XHRcdCMgcHJpbnQgXCJvayBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHBhaXIucmVzdWx0XG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwibm90IFwiICsgXCIgI3twYWlyLnZhbHVlfVwiIFxuXHRcdFxuXHRcdHJldHVybiByZXN1bHRcblx0XG5cdFxuXHRcblx0XG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIlByZXZpZXdfTG9nb0xheWVyXCJcbntQcmV2aWV3Q2xhc3MyfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MyXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczMgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cblxuXG4iLCJcblxue1ByZXZpZXdDbGFzczF9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczFcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMiBleHRlbmRzIFByZXZpZXdDbGFzczFcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRzdGF0dXNCYXI6IFwiZGFya1wiICMgbGlnaHQvZGFya1xuXHRcdFx0aG9tZUJhcjogXCJkYXJrXCIgIyBsaWdodC9kYXJrXG5cblx0XHRcdHZpc2libGU6IHRydWUgIyB0cnVlIC8gZmFsc2Vcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2UgIyB0cnVlIC8gZmFsc2VcblxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBcIjIwOjIwXCIgIyBnZW5lcmF0ZWQgZnJvbSBqc29uXG5cdFx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyID0gdmFsdWVcblxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cblxuXG5cdCMgQ3JlYXRlIEJhcnNcblxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdHRvcEJhciA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIodG9wQmFyKSBcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcilcblx0XG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQoNCksIHk6IEFsaWduLnRvcCgyICsgNSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCgtNCksIHk6IEFsaWduLnRvcCg1KVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wKDIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLnRvcCgpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRob21lSW5kaWNhdG9yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bob21lQmFyXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0IiwiXG5cbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3X0Fzc2V0c1wiXG5cblxuIyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cblx0XG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cblx0QGRlZmluZSAnYXNzZXRzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0c1xuXG5cblxuXG5cblx0c2NyZWVuU2l6ZTogKHcsIGgpID0+IHJldHVybiBTY3JlZW4ud2lkdGggPT0gdyBhbmQgU2NyZWVuLmhlaWdodCA9PSBoXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB3aWR0aCA9PSB3IGFuZCBAaGVpZ2h0ID09IGhcblx0dmlld1dpZHRoOiAodykgPT4gcmV0dXJuIEB3aWR0aCA9PSB3XG5cblx0bG9nU2l6ZTogKCkgPT5cblx0XHRuZXcgVGV4dExheWVyIHsgdGV4dDogXCIje1NjcmVlbi53aWR0aH14I3tTY3JlZW4uaGVpZ2h0fVwiLCB5OiBBbGlnbi5jZW50ZXIgfVx0XG5cblxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblxuXG5cdFx0XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQWFBQTtBREVBLElBQUEsTUFBQTtFQUFBOzs7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxnQkFBUjs7QUFLSCxPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztN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
