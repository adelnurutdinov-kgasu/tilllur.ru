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
      visible: true,
      forceAndroidBar: false,
      backgroundColor: null,
      borderRadius: 42,
      prototypeCreationYear: "20:20",
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

  PreviewClass1.define('visible', {
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

  PreviewClass1.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  PreviewClass1.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
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
    _.defaults(this.options, PreviewClass2.__super__.constructor.call(this, this.options));
  }

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

  PreviewClass2.prototype.createAndroidStatusBar = function(temp) {
    temp.height = 32;
    return this.createClassicAndroidStatusBar(new Layer({
      parent: temp,
      width: temp.width - 16,
      x: Align.center,
      y: Align.top(6),
      backgroundColor: null
    }));
  };

  PreviewClass2.prototype.createClassicAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 20;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.center(1),
      color: this.assets.color["dark"],
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
      y: Align.center(-1),
      image: this.assets.androidStatusBarRightImage["dark"]
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
      image: this.assets.oldStatusBarLeftImage["dark"]
    });
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: this.assets.color["dark"],
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
      image: this.assets.oldStatusBarRightImage["dark"]
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
      color: this.assets.color["dark"],
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
      image: this.assets.statusBarRightImage["dark"]
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
      backgroundColor: this.assets.color["dark"],
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
      if (this.screenSize(375, 768) || this.screenSize(390, 797) || this.screenSize(414, 852) || this.screenSize(428, 879)) {
        return this.scale = Screen.width / this.width;
      } else {
        return this.setCustomPreview();
      }
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


},{"PreviewClass4":"PreviewClass4"}],"PreviewComponentAssets":[function(require,module,exports){
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
var FixPreviewExport, PreviewClass5,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

PreviewClass5 = require("PreviewClass5").PreviewClass5;

FixPreviewExport = (function(superClass) {
  extend(FixPreviewExport, superClass);

  function FixPreviewExport() {
    return FixPreviewExport.__super__.constructor.apply(this, arguments);
  }

  return FixPreviewExport;

})(PreviewClass5);

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


},{"PreviewClass5":"PreviewClass5"}],"Preview_Assets":[function(require,module,exports){
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


},{}],"album":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Album = (function(superClass) {
  extend(Album, superClass);

  function Album(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).albumID == null) {
      base.albumID = -1;
    }
    Album.__super__.constructor.call(this, this.options);
  }

  Album.define('albumID', {
    get: function() {
      return this.options.albumID;
    },
    set: function(value) {
      return this.options.albumID = value;
    }
  });

  return Album;

})(Layer);


},{}],"create_song":[function(require,module,exports){
var Data, Song, TextLayer;

Song = require("song").Song;

TextLayer = require("text").TextLayer;

Data = require("data");

exports.createSongsForAlbum = function(albumID) {
  var i, j, len, ref, song, songs;
  songs = [];
  ref = Data.albumsData[albumID].songs;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    song = ref[i];
    songs.push(this.createAlbumSong(albumID, i));
  }
  return songs;
};

exports.createSongsForFav = function(songsList) {
  var i, j, len, ref, song, songs;
  songs = [];
  ref = songsList.songs;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    song = ref[i];
    songs.push(this.createSong(i));
  }
  return songs;
};

exports.createSong = function(songNumber) {
  var albumTitle, songImage, songTitle, songView;
  songView = new Song({
    height: 132,
    albumID: Data.favList.albums[songNumber],
    songID: songNumber
  });
  songImage = new Layer({
    parent: songView,
    image: Data.albumsData[Data.favList.albums[songNumber]].image,
    width: 48 * 2,
    height: 48 * 2,
    x: 32,
    y: 16
  });
  songTitle = new TextLayer({
    parent: songView,
    text: "" + Data.favList.songs[songNumber],
    width: 440,
    height: 44,
    x: 156,
    y: 22,
    fontSize: 36,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: "white",
    letterSpacing: 0.2
  });
  albumTitle = new TextLayer({
    parent: songView,
    text: "" + Data.albumsData[Data.favList.albums[songNumber]].title,
    width: 440,
    height: 34,
    x: 156,
    y: 68,
    fontSize: 28,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: "#999",
    letterSpacing: 0.5
  });
  return songView;
};

exports.createAlbumSong = function(albumID, songNumber) {
  var songDuration, songTitle, songView;
  songView = new Song({
    height: 80,
    albumID: albumID,
    songID: songNumber,
    songTitle: Data.albumsData[albumID].songs[songNumber]
  });
  songTitle = new TextLayer({
    parent: songView,
    text: "" + songView.songTitle,
    width: 440,
    height: 40,
    x: (28 + 14) * 2,
    y: 20,
    fontSize: 32,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: "white",
    letterSpacing: 0.2
  });
  songDuration = new TextLayer({
    parent: songView,
    text: "" + Data.albumsData[albumID].time[songNumber],
    width: 120,
    height: 34,
    x: 232 * 2 + 28,
    y: 26,
    fontSize: 28,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "right",
    color: "#999",
    letterSpacing: 0.5,
    opacity: 0.7
  });
  songNumber = new TextLayer({
    parent: songView,
    text: "" + (songNumber + 1),
    width: 18 * 2,
    height: 14 * 2,
    x: 10 * 2,
    y: 13 * 2,
    fontSize: 24,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "right",
    color: "#999",
    letterSpacing: 0.5,
    opacity: 0.7
  });
  return songView;
};


},{"data":"data","song":"song","text":"text"}],"data":[function(require,module,exports){
var albumModel1, albumModel2, albumModel3, albumModel4, albumModel5;

albumModel1 = {
  title: "Emotional 8",
  year: 1998,
  songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"],
  image: "images/albums/1.jpg",
  tintColor: "grey",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

albumModel2 = {
  title: "May 13",
  year: 2001,
  songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice", "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45", "3:08", "3:08", "3:08"],
  image: "images/albums/2.jpg",
  tintColor: "white",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

albumModel3 = {
  title: "Emotional 8",
  year: 2002,
  songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"],
  image: "images/albums/3.jpg",
  tintColor: "grey",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

albumModel4 = {
  title: "Emotional 8",
  year: 2005,
  songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"],
  image: "images/albums/4.jpg",
  tintColor: "grey",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

albumModel5 = {
  title: "Emotional 8",
  year: 2008,
  songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"],
  image: "images/albums/5.jpg",
  tintColor: "grey",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

exports.albumsData = [albumModel1, albumModel2, albumModel3, albumModel4, albumModel5];

exports.favList = {
  songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice", "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix"],
  source: ["1.m4a", "2.m4a", "1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"],
  albums: [0, 1, 2, 0, 0, 1, 2, 2, 1, 0]
};


},{}],"detailed_album":[function(require,module,exports){
var Data, SongCreator, TextLayer, animateDetailedAlbumPage, closeDetailedAlbumPage, localDisappearTime, localNewsDetailedAppearCurve, localNewsDetailedCloseCurve;

Data = require('data');

SongCreator = require('create_song');

TextLayer = require("text").TextLayer;

localDisappearTime = 0.2;

localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)";

localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)";

animateDetailedAlbumPage = function(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY) {
  var i, item, j, len, localColor, results;
  album_fake_image.width = Utils.modulate(songsScrollView.content.y, bounds, [640, offsetValue.width], true);
  album_fake_image.height = Utils.modulate(songsScrollView.content.y, bounds, [640, offsetValue.height], true);
  album_fake_image.x = Utils.modulate(songsScrollView.content.y, bounds, [0, offsetValue.x], true);
  album_fake_image.y = Utils.modulate(songsScrollView.content.y, bounds, [0, offsetValue.y], true);
  album_fake_image_darker.opacity = Utils.modulate(songsScrollView.content.y, bounds, [1, 0.4]);
  album_fake_image_darker.width = album_fake_image.width;
  album_fake_image_darker.height = album_fake_image.height;
  localColor = Utils.modulate(songsScrollView.content.y, bounds, [0.8, 0], true);
  detailedAlbumView.backgroundColor = "rgba(0,0,0," + localColor + ")";
  results = [];
  for (i = j = 0, len = albumOptions.length; j < len; i = ++j) {
    item = albumOptions[i];
    item.opacity = Utils.modulate(songsScrollView.content.y, bounds, [1, 0.4]);
    results.push(item.y = Utils.modulate(songsScrollView.content.y, bounds, [albumOptionsY[i], albumOptionsY[i] + offsetValue.y / 2 + (i + 1) * 20]));
  }
  return results;
};

closeDetailedAlbumPage = function(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions) {
  var item, j, len;
  albumSongsView.animate({
    properties: {
      y: 1136
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  album_fake_image.animate({
    properties: {
      width: offsetValue.width,
      height: offsetValue.height,
      x: offsetValue.x,
      y: offsetValue.y
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  album_fake_image_darker.animate({
    properties: {
      opacity: 0
    },
    time: localDisappearTime
  });
  detailedAlbumView.animate({
    properties: {
      backgroundColor: "rgba(0,0,0,0)"
    },
    time: localDisappearTime / 2,
    delay: localDisappearTime / 2
  });
  for (j = 0, len = albumOptions.length; j < len; j++) {
    item = albumOptions[j];
    item.animate({
      properties: {
        opacity: 0,
        y: item.y + 60
      },
      time: localDisappearTime / 4
    });
  }
  return Utils.delay(localDisappearTime + 0.02, function() {
    return detailedAlbumView.destroy();
  });
};

exports.createDetailedAlbumPage = function(albumID, offsetValue) {
  var albumOptions, albumOptionsY, albumSongsView, albumTitle, albumYear, album_fake_image, album_fake_image_darker, bounds, boundsBottom, closeNewsDetailedTopView, closingAlbumView, detailedAlbumView, i, item, j, k, len, len1, song, songResultHeight, songs, songsScrollView;
  detailedAlbumView = new Layer({
    width: 640,
    height: 1136,
    backgroundColor: "rgba(0,0,0,0)"
  });
  detailedAlbumView.on(Events.Tap, function() {});
  album_fake_image = new Layer({
    parent: detailedAlbumView,
    width: offsetValue.width,
    height: offsetValue.height,
    x: offsetValue.x,
    y: offsetValue.y,
    image: "images/albums/" + albumID + ".jpg"
  });
  album_fake_image_darker = new Layer({
    parent: album_fake_image,
    opacity: 0,
    width: 640,
    height: 640,
    backgroundColor: "rgba(0,0,0,0.6)"
  });
  album_fake_image_darker.style = {
    '-webkit-backdrop-filter': 'blur(10px)'
  };
  albumTitle = new TextLayer({
    parent: detailedAlbumView,
    text: "" + Data.albumsData[albumID].title,
    width: 292 * 2,
    height: 48,
    x: 28,
    y: 84 * 2,
    fontSize: 40,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "center",
    color: "white",
    letterSpacing: 0.2,
    opacity: 0
  });
  albumYear = new TextLayer({
    parent: detailedAlbumView,
    text: "" + Data.albumsData[albumID].year,
    width: 292 * 2,
    height: 48,
    x: 28,
    y: 114 * 2,
    fontSize: 32,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "center",
    color: "#999999",
    letterSpacing: 0.2,
    opacity: 0
  });
  closeNewsDetailedTopView = new Layer({
    width: 72,
    height: 72,
    x: 142 * 2,
    y: 34 * 2,
    image: "images/closeNewsDetailedView.png",
    parent: detailedAlbumView,
    opacity: 0
  });
  albumSongsView = new Layer({
    parent: detailedAlbumView,
    width: 640,
    height: 708,
    y: 1136,
    backgroundColor: "#111"
  });
  albumOptions = [albumYear, albumTitle, closeNewsDetailedTopView];
  albumOptionsY = [albumYear.y, albumTitle.y, closeNewsDetailedTopView.y];
  album_fake_image.animate({
    properties: {
      width: 640,
      height: 640,
      x: 0,
      y: 0
    },
    time: localDisappearTime,
    curve: localNewsDetailedAppearCurve
  });
  album_fake_image_darker.animate({
    properties: {
      opacity: 1
    },
    time: localDisappearTime,
    delay: localDisappearTime / 2,
    curve: localNewsDetailedAppearCurve
  });
  for (j = 0, len = albumOptions.length; j < len; j++) {
    item = albumOptions[j];
    item.animate({
      properties: {
        opacity: 1
      },
      time: localDisappearTime / 2,
      delay: localDisappearTime / 2
    });
  }
  detailedAlbumView.animate({
    properties: {
      backgroundColor: "rgba(0,0,0,0.8)"
    },
    time: localDisappearTime / 2,
    delay: localDisappearTime / 2
  });
  albumSongsView.animate({
    properties: {
      y: 308
    },
    time: localDisappearTime,
    curve: localNewsDetailedAppearCurve,
    delay: localDisappearTime / 4
  });
  songsScrollView = new ScrollComponent({
    width: 640,
    height: 708,
    scrollHorizontal: false,
    parent: albumSongsView,
    y: 20,
    speedY: 0.8
  });
  songs = SongCreator.createSongsForAlbum(albumID);
  songResultHeight = 0;
  for (i = k = 0, len1 = songs.length; k < len1; i = ++k) {
    song = songs[i];
    song.y = i * 80;
    songResultHeight = song.y + song.height;
    song.parent = songsScrollView.content;
  }
  closingAlbumView = false;
  bounds = [10 + 40, 100 + 80];
  boundsBottom = [-(songResultHeight - songsScrollView.height + bounds[0]), -(songResultHeight - songsScrollView.height + bounds[1])];
  songsScrollView.on(Events.Scroll, function() {
    if (songsScrollView.content.y > bounds[0]) {
      animateDetailedAlbumPage(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY);
    }
    if (songsScrollView.content.y > bounds[1]) {
      songsScrollView.ignoreEvents = true;
      closingAlbumView = true;
      closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions);
    }
    if (songsScrollView.content.y < boundsBottom[0]) {
      animateDetailedAlbumPage(songsScrollView, boundsBottom, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY);
    }
    if (songsScrollView.content.y < boundsBottom[1]) {
      songsScrollView.ignoreEvents = true;
      closingAlbumView = true;
      return closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions);
    }
  });
  songsScrollView.on(Events.Move, function() {
    if (songsScrollView.content.y > bounds[0] && !closingAlbumView) {
      animateDetailedAlbumPage(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY);
    }
    if (songsScrollView.content.y < boundsBottom[0] && !closingAlbumView) {
      return animateDetailedAlbumPage(songsScrollView, boundsBottom, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY);
    }
  });
  closeNewsDetailedTopView.on(Events.Tap, function() {
    songsScrollView.ignoreEvents = true;
    closingAlbumView = true;
    return closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions);
  });
  return [detailedAlbumView, songs];
};


},{"create_song":"create_song","data":"data","text":"text"}],"detailed_news":[function(require,module,exports){
var closeDetailedView, closeDetailedViewTwoWays, localDisappearTime, localNewsDetailedAppearCurve, localNewsDetailedCloseCurve;

localDisappearTime = 0.34;

localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)";

localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)";

closeDetailedViewTwoWays = function(newsDetailedTopView, newsDetailedContent, newsDetailedView) {
  newsDetailedTopView.animate({
    properties: {
      y: -88 * 3
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  newsDetailedContent.animate({
    properties: {
      y: 1136
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  return Utils.delay(localDisappearTime + 0.02, function() {
    return newsDetailedView.destroy();
  });
};

closeDetailedView = function(newsDetailedView) {
  var moreTime;
  moreTime = 1.4;
  newsDetailedView.animate({
    properties: {
      y: -1136
    },
    time: localDisappearTime * moreTime,
    curve: localNewsDetailedCloseCurve
  });
  return Utils.delay(localDisappearTime * moreTime + 0.02, function() {
    return newsDetailedView.destroy();
  });
};

exports.createNewsDetailedPage = function(newsDataModel) {
  var blurDetailedTopView, closeNewsDetailedTopView, gapBottom, gapDelta, gapTop, isNewsViewModulating, newsDetailedContent, newsDetailedContentImage, newsDetailedContentScroll, newsDetailedContentTextImage, newsDetailedContentTextView, newsDetailedTopView, newsDetailedView, shareNewsDetailedTopView;
  newsDetailedView = new Layer({
    width: 640,
    height: 1136,
    backgroundColor: "rgba(0,0,0,0)"
  });
  newsDetailedView.on(Events.Tap, function() {});
  newsDetailedTopView = new Layer({
    parent: newsDetailedView,
    width: 640,
    height: 88 * 2,
    y: -88 * 2,
    backgroundColor: "transparent",
    image: newsDataModel.image
  });
  blurDetailedTopView = new Layer({
    parent: newsDetailedTopView,
    width: newsDetailedTopView.width,
    height: newsDetailedTopView.height,
    backgroundColor: "rgba(0,0,0,0.5)"
  });
  blurDetailedTopView.style = {
    '-webkit-backdrop-filter': 'blur(20px)'
  };
  closeNewsDetailedTopView = new Layer({
    width: 64 * 2,
    height: 64 * 2,
    x: 0,
    y: 20 * 2,
    backgroundColor: "rgba(0,0,0,0)",
    image: "images/closeNewsPage.png",
    parent: newsDetailedTopView
  });
  shareNewsDetailedTopView = new Layer({
    width: 244,
    height: 72,
    x: 376,
    y: 72,
    image: "images/shareNewsDetailedView.png",
    parent: newsDetailedTopView
  });
  newsDetailedContent = new Layer({
    width: 640,
    height: 1136 - 88 * 2 - 60 * 2,
    y: 1136,
    parent: newsDetailedView,
    scrollHorizontal: false,
    directionLock: true,
    backgroundColor: "rbga(0,0,0,0)"
  });
  newsDetailedContentScroll = new ScrollComponent({
    width: 640,
    height: 1136 - 88 * 2 - 60 * 2,
    parent: newsDetailedContent,
    speedY: 0.8,
    backgroundColor: "transparent",
    scrollHorizontal: false
  });
  newsDetailedContentImage = new Layer({
    width: 640,
    height: 480,
    parent: newsDetailedContentScroll.content,
    backgroundColor: "transparent",
    image: newsDataModel.image
  });
  newsDetailedContentTextView = new Layer({
    width: 640,
    height: 1400,
    backgroundColor: "white",
    y: newsDetailedContentImage.height,
    parent: newsDetailedContentScroll.content
  });
  newsDetailedContentTextImage = new Layer({
    parent: newsDetailedContentTextView,
    width: 640,
    height: 1440,
    backgroundColor: "white",
    image: newsDataModel.textImage
  });
  newsDetailedTopView.animate({
    properties: {
      y: 0
    },
    time: localDisappearTime,
    curve: localNewsDetailedAppearCurve
  });
  newsDetailedContent.animate({
    properties: {
      y: 88 * 2
    },
    time: localDisappearTime,
    curve: localNewsDetailedAppearCurve
  });
  newsDetailedView.animate({
    properties: {
      backgroundColor: "rgba(0,0,0,0.9)"
    },
    time: localDisappearTime
  });
  gapBottom = -1040;
  gapTop = 10;
  gapDelta = 110;
  isNewsViewModulating = false;
  Utils.delay(localDisappearTime, function() {
    return isNewsViewModulating = true;
  });
  newsDetailedContentScroll.on(Events.Move, function(event, layer) {
    var bounds, localBackgroundOpacityValue;
    if (newsDetailedContentScroll.content.y > gapTop && isNewsViewModulating) {
      bounds = [gapTop, gapTop + gapDelta];
      newsDetailedTopView.y = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, -88], true);
      closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true);
      newsDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")";
    }
    if (newsDetailedContentScroll.content.y < gapBottom && isNewsViewModulating) {
      bounds = [gapBottom, gapBottom - gapDelta];
      closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true);
      return newsDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")";
    }
  });
  newsDetailedContentScroll.on(Events.Scroll, function(event, layer) {
    if (newsDetailedContentScroll.content.y < gapBottom - gapDelta) {
      newsDetailedContentScroll.ignoreEvents = true;
      isNewsViewModulating = false;
      closeDetailedView(newsDetailedView);
    }
    if (newsDetailedContentScroll.content.y > gapTop + gapDelta) {
      newsDetailedContentScroll.ignoreEvents = true;
      isNewsViewModulating = false;
      return closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView);
    }
  });
  closeNewsDetailedTopView.on(Events.Tap, function() {
    newsDetailedContentScroll.ignoreEvents = true;
    isNewsViewModulating = false;
    closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView);
    return newsDetailedView.animate({
      properties: {
        backgroundColor: "rgba(0,0,0,0)"
      },
      time: localDisappearTime / 2
    });
  });
  return newsDetailedView;
};


},{}],"feed":[function(require,module,exports){
var songModel0, songModel1, songModel10, songModel2, songModel3, songModel4, songModel5, songModel6, songModel7, songModel8, songModel9;

songModel0 = {
  image: "images/news/full/0.jpg",
  coverImage: "images/news/covers/0.jpg",
  textImage: "images/news/text/0.jpg"
};

songModel1 = {
  image: "images/news/full/1.jpg",
  coverImage: "images/news/covers/1.jpg",
  textImage: "images/news/text/1.jpg"
};

songModel2 = {
  image: "images/news/full/2.jpg",
  coverImage: "images/news/covers/2.jpg",
  textImage: "images/news/text/2.jpg"
};

songModel3 = {
  image: "images/news/full/3.jpg",
  coverImage: "images/news/covers/3.jpg",
  textImage: "images/news/text/3.jpg"
};

songModel4 = {
  image: "images/news/full/4.jpg",
  coverImage: "images/news/covers/4.jpg",
  textImage: "images/news/text/4.jpg"
};

songModel5 = {
  image: "images/news/full/5.jpg",
  coverImage: "images/news/covers/5.jpg",
  textImage: "images/news/text/5.jpg"
};

songModel6 = {
  image: "images/news/full/6.jpg",
  coverImage: "images/news/covers/6.jpg",
  textImage: "images/news/text/6.jpg"
};

songModel7 = {
  image: "images/news/full/7.jpg",
  coverImage: "images/news/covers/7.jpg",
  textImage: "images/news/text/7.jpg"
};

songModel8 = {
  image: "images/news/full/8.jpg",
  coverImage: "images/news/covers/8.jpg",
  textImage: "images/news/text/8.jpg"
};

songModel9 = {
  image: "images/news/full/9.jpg",
  coverImage: "images/news/covers/9.jpg",
  textImage: "images/news/text/9.jpg"
};

songModel10 = {
  image: "images/news/full/10.jpg",
  coverImage: "images/news/covers/10.jpg",
  textImage: "images/news/text/10.jpg"
};

exports.feedData = [songModel0, songModel1, songModel2, songModel3, songModel4, songModel5, songModel6, songModel7, songModel8, songModel9, songModel10];


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"nav":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Nav = (function(superClass) {
  extend(Nav, superClass);

  function Nav(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).navID == null) {
      base.navID = -1;
    }
    Nav.__super__.constructor.call(this, this.options);
  }

  Nav.define('navID', {
    get: function() {
      return this.options.navID;
    },
    set: function(value) {
      return this.options.navID = value;
    }
  });

  return Nav;

})(Layer);


},{}],"news":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.News = (function(superClass) {
  extend(News, superClass);

  function News(options) {
    var base, base1, base2;
    this.options = options != null ? options : {};
    if ((base = this.options).newsID == null) {
      base.newsID = -1;
    }
    if ((base1 = this.options).newsImage == null) {
      base1.newsImage = -1;
    }
    if ((base2 = this.options).newsTextImage == null) {
      base2.newsTextImage = -1;
    }
    News.__super__.constructor.call(this, this.options);
    this.borderRadius = 8;
  }

  News.define('newsID', {
    get: function() {
      return this.options.newsID;
    },
    set: function(value) {
      return this.options.newsID = value;
    }
  });

  News.define('newsImage', {
    get: function() {
      return this.options.newsImage;
    },
    set: function(value) {
      return this.options.newsImage = value;
    }
  });

  News.define('newsTextImage', {
    get: function() {
      return this.options.newsTextImage;
    },
    set: function(value) {
      return this.options.newsTextImage = value;
    }
  });

  return News;

})(Layer);


},{}],"play_song":[function(require,module,exports){
var Data, Time, songPath;

Data = require('data');

Time = require('timefromsec');

songPath = "images/songs/";

exports.playPlaylist = function(songID, albumModel) {
  var i, j, playingSongAlbumID, playingSongName, playingSongSource, ref, songsNameCycler, songsNames, songsSource, songsSourceCycler;
  songsNames = albumModel.songs;
  songsSource = albumModel.source;
  songsNameCycler = Utils.cycle(songsNames);
  songsSourceCycler = Utils.cycle(songsSource);
  playingSongName = "";
  playingSongSource = "";
  playingSongAlbumID = 0;
  for (i = j = 0, ref = songID; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
    playingSongName = songsNameCycler();
    playingSongSource = songPath + songsSourceCycler();
  }
  if (pause.states.current === "hidden") {
    play.states.next();
    pause.states.next();
  }
  music.video = playingSongSource;
  playerSongTitle.text = playingSongName;
  playerSongAlbum.text = albumModel.title + " – " + albumModel.year;
  Utils.delay(.3, function() {
    durationRight.html = "-" + Time.timeFromSeconds(music.player.duration);
    return scrubber.max = ~~music.player.duration;
  });
  return music.player.play();
};

exports.playFavPlaylist = function(songID, albumModel, music, play, pause, playerSongTitle, playerSongAlbum, durationRight, scrubber) {
  var i, j, playingSongAlbumID, playingSongName, playingSongSource, ref, songAlbumIDCycler, songsAlbums, songsNameCycler, songsNames, songsSource, songsSourceCycler;
  songsNames = albumModel.songs;
  songsSource = albumModel.source;
  songsAlbums = albumModel.albums;
  songsNameCycler = Utils.cycle(songsNames);
  songsSourceCycler = Utils.cycle(songsSource);
  songAlbumIDCycler = Utils.cycle(songsAlbums);
  playingSongName = "";
  playingSongSource = "";
  playingSongAlbumID = 0;
  for (i = j = 0, ref = songID; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
    playingSongName = songsNameCycler();
    playingSongSource = songPath + songsSourceCycler();
    playingSongAlbumID = songAlbumIDCycler();
  }
  if (pause.states.current === "hidden") {
    play.states.next();
    pause.states.next();
  }
  music.video = playingSongSource;
  playerSongTitle.text = playingSongName;
  playerSongAlbum.text = Data.albumsData[playingSongAlbumID].title + " – " + Data.albumsData[playingSongAlbumID].year;
  Utils.delay(.3, function() {
    durationRight.html = "-" + Time.timeFromSeconds(music.player.duration);
    return scrubber.max = ~~music.player.duration;
  });
  return music.player.play();
};


},{"data":"data","timefromsec":"timefromsec"}],"song":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Song = (function(superClass) {
  extend(Song, superClass);

  function Song(options) {
    var base, base1, base2, base3;
    this.options = options != null ? options : {};
    if ((base = this.options).albumID == null) {
      base.albumID = -1;
    }
    if ((base1 = this.options).songID == null) {
      base1.songID = -1;
    }
    if ((base2 = this.options).albumTitle == null) {
      base2.albumTitle = "May 14";
    }
    if ((base3 = this.options).songTitle == null) {
      base3.songTitle = "Соевые губы";
    }
    Song.__super__.constructor.call(this, this.options);
    this.width = 320 * 2;
    this.height = 66 * 2;
    this.backgroundColor = "null";
  }

  Song.define('albumID', {
    get: function() {
      return this.options.albumID;
    },
    set: function(value) {
      return this.options.albumID = value;
    }
  });

  Song.define('songID', {
    get: function() {
      return this.options.songID;
    },
    set: function(value) {
      return this.options.songID = value;
    }
  });

  Song.define('albumTitle', {
    get: function() {
      return this.options.albumTitle;
    },
    set: function(value) {
      return this.options.albumTitle = value;
    }
  });

  Song.define('songTitle', {
    get: function() {
      return this.options.songTitle;
    },
    set: function(value) {
      return this.options.songTitle = value;
    }
  });

  return Song;

})(Layer);


},{}],"text":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.includes(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"timefromsec":[function(require,module,exports){
exports.timeFromSeconds = function(seconds) {
  if (seconds > 0) {
    return new Date(seconds * 1000).toISOString().substr(15, 4);
  } else {
    return "0:00";
  }
};


},{}],"video":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Video = (function(superClass) {
  extend(Video, superClass);

  function Video(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).videoID == null) {
      base.videoID = -1;
    }
    Video.__super__.constructor.call(this, this.options);
  }

  Video.define('videoID', {
    get: function() {
      return this.options.videoID;
    },
    set: function(value) {
      return this.options.videoID = value;
    }
  });

  return Video;

})(Layer);


},{}],"year":[function(require,module,exports){
var TextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = require("text").TextLayer;

exports.Year = (function(superClass) {
  extend(Year, superClass);

  function Year(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).yearID == null) {
      base.yearID = -1;
    }
    Year.__super__.constructor.call(this, this.options);
  }

  Year.define('yearID', {
    get: function() {
      return this.options.yearID;
    },
    set: function(value) {
      return this.options.yearID = value;
    }
  });

  return Year;

})(TextLayer);


},{"text":"text"}],"youtube":[function(require,module,exports){
var config, videoModel0, videoModel1, videoModel2, videoModel3, videoModel4, videoModel5;

config = "images";

videoModel0 = {
  image: config + "/video/previews/0.jpg",
  video: config + "/video/movies/0.mp4"
};

videoModel1 = {
  image: config + "/video/previews/1.jpg",
  video: config + "/video/movies/1.mp4"
};

videoModel2 = {
  image: config + "/video/previews/2.jpg",
  video: config + "/video/movies/2.mp4"
};

videoModel3 = {
  image: config + "/video/previews/3.jpg",
  video: config + "/video/movies/3.mp4"
};

videoModel4 = {
  image: config + "/video/previews/4.jpg",
  video: config + "/video/movies/4.mp4"
};

videoModel5 = {
  image: config + "/video/previews/5.jpg",
  video: config + "/video/movies/5.mp4"
};

exports.moviesData = [videoModel0, videoModel1, videoModel2, videoModel3, videoModel4, videoModel5];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMveW91dHViZS5jb2ZmZWUiLCIuLi9tb2R1bGVzL3llYXIuY29mZmVlIiwiLi4vbW9kdWxlcy92aWRlby5jb2ZmZWUiLCIuLi9tb2R1bGVzL3RpbWVmcm9tc2VjLmNvZmZlZSIsIi4uL21vZHVsZXMvdGV4dC5jb2ZmZWUiLCIuLi9tb2R1bGVzL3NvbmcuY29mZmVlIiwiLi4vbW9kdWxlcy9wbGF5X3NvbmcuY29mZmVlIiwiLi4vbW9kdWxlcy9uZXdzLmNvZmZlZSIsIi4uL21vZHVsZXMvbmF2LmNvZmZlZSIsIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9mZWVkLmNvZmZlZSIsIi4uL21vZHVsZXMvZGV0YWlsZWRfbmV3cy5jb2ZmZWUiLCIuLi9tb2R1bGVzL2RldGFpbGVkX2FsYnVtLmNvZmZlZSIsIi4uL21vZHVsZXMvZGF0YS5jb2ZmZWUiLCIuLi9tb2R1bGVzL2NyZWF0ZV9zb25nLmNvZmZlZSIsIi4uL21vZHVsZXMvYWxidW0uY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3X0xvZ29MYXllci5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdfQXNzZXRzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NvbXBvbmVudC5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3M1LmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzNC5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczMuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3MyLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzMS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgR2V0dGluZyBEYXRhXG5cbmNvbmZpZyA9IFwiaW1hZ2VzXCJcblxudmlkZW9Nb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMC5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMS5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcbn1cblxudmlkZW9Nb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMi5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzIubXA0XCJcbn1cblxudmlkZW9Nb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMy5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzMubXA0XCJcbn1cblxudmlkZW9Nb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvNC5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzQubXA0XCJcbn1cblxudmlkZW9Nb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvNS5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzUubXA0XCJcbn1cblxuXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMiwgdmlkZW9Nb2RlbDMsIHZpZGVvTW9kZWw0LCB2aWRlb01vZGVsNV0iLCJ7VGV4dExheWVyfSA9IHJlcXVpcmUgXCJ0ZXh0XCJcblxuY2xhc3MgZXhwb3J0cy5ZZWFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMueWVhcklEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAneWVhcklEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy55ZWFySURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnllYXJJRCA9IHZhbHVlXG5cblxuXHRcdFx0IiwiY2xhc3MgZXhwb3J0cy5WaWRlbyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMudmlkZW9JRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ3ZpZGVvSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsImV4cG9ydHMudGltZUZyb21TZWNvbmRzID0gKHNlY29uZHMpIC0+XG5cdGlmIHNlY29uZHMgPiAwXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHNlY29uZHMgKiAxMDAwKS50b0lTT1N0cmluZygpLnN1YnN0cigxNSwgNClcblx0ZWxzZVxuXHRcdHJldHVybiBcIjA6MDBcIiIsImNsYXNzIFRleHRMYXllciBleHRlbmRzIExheWVyXG5cdFx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblx0XHRAZG9BdXRvU2l6ZSA9IGZhbHNlXG5cdFx0QGRvQXV0b1NpemVIZWlnaHQgPSBmYWxzZVxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcImhzbGEoNjAsIDkwJSwgNDclLCAuNClcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuY29sb3IgPz0gXCJyZWRcIlxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAxLjI1XG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiSGVsdmV0aWNhXCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDIwXG5cdFx0b3B0aW9ucy50ZXh0ID89IFwiVXNlIGxheWVyLnRleHQgdG8gYWRkIHRleHRcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLWxpbmVcIiAjIGFsbG93IFxcbiBpbiAudGV4dFxuXHRcdEBzdHlsZS5vdXRsaW5lID0gXCJub25lXCIgIyBubyBib3JkZXIgd2hlbiBzZWxlY3RlZFxuXHRcdFxuXHRzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSwgcHhTdWZmaXggPSBmYWxzZSkgLT5cblx0XHRAc3R5bGVbcHJvcGVydHldID0gaWYgcHhTdWZmaXggdGhlbiB2YWx1ZStcInB4XCIgZWxzZSB2YWx1ZVxuXHRcdEBlbWl0KFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsIHZhbHVlKVxuXHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0XHRcblx0Y2FsY1NpemU6IC0+XG5cdFx0c2l6ZUFmZmVjdGluZ1N0eWxlcyA9XG5cdFx0XHRsaW5lSGVpZ2h0OiBAc3R5bGVbXCJsaW5lLWhlaWdodFwiXVxuXHRcdFx0Zm9udFNpemU6IEBzdHlsZVtcImZvbnQtc2l6ZVwiXVxuXHRcdFx0Zm9udFdlaWdodDogQHN0eWxlW1wiZm9udC13ZWlnaHRcIl1cblx0XHRcdHBhZGRpbmdUb3A6IEBzdHlsZVtcInBhZGRpbmctdG9wXCJdXG5cdFx0XHRwYWRkaW5nUmlnaHQ6IEBzdHlsZVtcInBhZGRpbmctcmlnaHRcIl1cblx0XHRcdHBhZGRpbmdCb3R0b206IEBzdHlsZVtcInBhZGRpbmctYm90dG9tXCJdXG5cdFx0XHRwYWRkaW5nTGVmdDogQHN0eWxlW1wicGFkZGluZy1sZWZ0XCJdXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiBAc3R5bGVbXCJ0ZXh0LXRyYW5zZm9ybVwiXVxuXHRcdFx0Ym9yZGVyV2lkdGg6IEBzdHlsZVtcImJvcmRlci13aWR0aFwiXVxuXHRcdFx0bGV0dGVyU3BhY2luZzogQHN0eWxlW1wibGV0dGVyLXNwYWNpbmdcIl1cblx0XHRcdGZvbnRGYW1pbHk6IEBzdHlsZVtcImZvbnQtZmFtaWx5XCJdXG5cdFx0XHRmb250U3R5bGU6IEBzdHlsZVtcImZvbnQtc3R5bGVcIl1cblx0XHRcdGZvbnRWYXJpYW50OiBAc3R5bGVbXCJmb250LXZhcmlhbnRcIl1cblx0XHRjb25zdHJhaW50cyA9IHt9XG5cdFx0aWYgQGRvQXV0b1NpemVIZWlnaHQgdGhlbiBjb25zdHJhaW50cy53aWR0aCA9IEB3aWR0aFxuXHRcdHNpemUgPSBVdGlscy50ZXh0U2l6ZSBAdGV4dCwgc2l6ZUFmZmVjdGluZ1N0eWxlcywgY29uc3RyYWludHNcblx0XHRpZiBAc3R5bGUudGV4dEFsaWduIGlzIFwicmlnaHRcIlxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdFx0QHggPSBAeC1Ad2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0QGhlaWdodCA9IHNpemUuaGVpZ2h0XG5cblx0QGRlZmluZSBcImF1dG9TaXplXCIsXG5cdFx0Z2V0OiAtPiBAZG9BdXRvU2l6ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImF1dG9TaXplSGVpZ2h0XCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0QGRvQXV0b1NpemVIZWlnaHQgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiY29udGVudEVkaXRhYmxlXCIsXG5cdFx0c2V0OiAoYm9vbGVhbikgLT5cblx0XHRcdEBfZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSBib29sZWFuXG5cdFx0XHRAaWdub3JlRXZlbnRzID0gIWJvb2xlYW5cblx0XHRcdEBvbiBcImlucHV0XCIsIC0+IEBjYWxjU2l6ZSgpIGlmIEBkb0F1dG9TaXplXG5cdEBkZWZpbmUgXCJ0ZXh0XCIsXG5cdFx0Z2V0OiAtPiBAX2VsZW1lbnQudGV4dENvbnRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cdFx0XHRAZW1pdChcImNoYW5nZTp0ZXh0XCIsIHZhbHVlKVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiZm9udEZhbWlseVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250RmFtaWx5XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U2l6ZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U2l6ZS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U2l6ZVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxpbmVIZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGluZUhlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGluZUhlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRXZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFdlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFdlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTdHlsZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFN0eWxlXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFZhcmlhbnRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFZhcmlhbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFZhcmlhbnRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdUb3BcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1RvcC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1JpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdSaWdodC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nQm90dG9tXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdCb3R0b20ucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdMZWZ0XCIsXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJ0ZXh0QWxpZ25cIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dEFsaWduXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwidGV4dFRyYW5zZm9ybVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS50ZXh0VHJhbnNmb3JtIFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0VHJhbnNmb3JtXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwibGV0dGVyU3BhY2luZ1wiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5sZXR0ZXJTcGFjaW5nLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxldHRlclNwYWNpbmdcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsZW5ndGhcIiwgXG5cdFx0Z2V0OiAtPiBAdGV4dC5sZW5ndGhcblxuY29udmVydFRvVGV4dExheWVyID0gKGxheWVyKSAtPlxuXHR0ID0gbmV3IFRleHRMYXllclxuXHRcdG5hbWU6IGxheWVyLm5hbWVcblx0XHRmcmFtZTogbGF5ZXIuZnJhbWVcblx0XHRwYXJlbnQ6IGxheWVyLnBhcmVudFxuXHRcblx0Y3NzT2JqID0ge31cblx0Y3NzID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuY3NzXG5cdGNzcy5mb3JFYWNoIChydWxlKSAtPlxuXHRcdHJldHVybiBpZiBfLmluY2x1ZGVzIHJ1bGUsICcvKidcblx0XHRhcnIgPSBydWxlLnNwbGl0KCc6ICcpXG5cdFx0Y3NzT2JqW2FyclswXV0gPSBhcnJbMV0ucmVwbGFjZSgnOycsJycpXG5cdHQuc3R5bGUgPSBjc3NPYmpcblx0XG5cdGltcG9ydFBhdGggPSBsYXllci5fX2ZyYW1lckltcG9ydGVkRnJvbVBhdGhcblx0aWYgXy5pbmNsdWRlcyBpbXBvcnRQYXRoLCAnQDJ4J1xuXHRcdHQuZm9udFNpemUgKj0gMlxuXHRcdHQubGluZUhlaWdodCA9IChwYXJzZUludCh0LmxpbmVIZWlnaHQpKjIpKydweCdcblx0XHR0LmxldHRlclNwYWNpbmcgKj0gMlxuXHRcdFx0XHRcdFxuXHR0LnkgLT0gKHBhcnNlSW50KHQubGluZUhlaWdodCktdC5mb250U2l6ZSkvMiAjIGNvbXBlbnNhdGUgZm9yIGhvdyBDU1MgaGFuZGxlcyBsaW5lIGhlaWdodFxuXHR0LnkgLT0gdC5mb250U2l6ZSAqIDAuMSAjIHNrZXRjaCBwYWRkaW5nXG5cdHQueCAtPSB0LmZvbnRTaXplICogMC4wOCAjIHNrZXRjaCBwYWRkaW5nXG5cdHQud2lkdGggKz0gdC5mb250U2l6ZSAqIDAuNSAjIHNrZXRjaCBwYWRkaW5nXG5cblx0dC50ZXh0ID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuc3RyaW5nXG5cdGxheWVyLmRlc3Ryb3koKVxuXHRyZXR1cm4gdFxuXG5MYXllcjo6Y29udmVydFRvVGV4dExheWVyID0gLT4gY29udmVydFRvVGV4dExheWVyKEApXG5cbmNvbnZlcnRUZXh0TGF5ZXJzID0gKG9iaikgLT5cblx0Zm9yIHByb3AsbGF5ZXIgb2Ygb2JqXG5cdFx0aWYgbGF5ZXIuX2luZm8ua2luZCBpcyBcInRleHRcIlxuXHRcdFx0b2JqW3Byb3BdID0gY29udmVydFRvVGV4dExheWVyKGxheWVyKVxuXG4jIEJhY2t3YXJkcyBjb21wYWJpbGl0eS4gUmVwbGFjZWQgYnkgY29udmVydFRvVGV4dExheWVyKClcbkxheWVyOjpmcmFtZUFzVGV4dExheWVyID0gKHByb3BlcnRpZXMpIC0+XG4gICAgdCA9IG5ldyBUZXh0TGF5ZXJcbiAgICB0LmZyYW1lID0gQGZyYW1lXG4gICAgdC5zdXBlckxheWVyID0gQHN1cGVyTGF5ZXJcbiAgICBfLmV4dGVuZCB0LHByb3BlcnRpZXNcbiAgICBAZGVzdHJveSgpXG4gICAgdFxuXG5leHBvcnRzLlRleHRMYXllciA9IFRleHRMYXllclxuZXhwb3J0cy5jb252ZXJ0VGV4dExheWVycyA9IGNvbnZlcnRUZXh0TGF5ZXJzXG4iLCJjbGFzcyBleHBvcnRzLlNvbmcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLmFsYnVtSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5zb25nSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5hbGJ1bVRpdGxlID89IFwiTWF5IDE0XCJcblx0XHRAb3B0aW9ucy5zb25nVGl0bGUgPz0gXCLQodC+0LXQstGL0LUg0LPRg9Cx0YtcIlxuXHRcdFxuXHRcdCBcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEAud2lkdGggPSAzMjAqMlxuXHRcdEAuaGVpZ2h0ID0gNjYqMlxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJudWxsXCJcblx0XHRcblx0QGRlZmluZSAnYWxidW1JRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRCA9IHZhbHVlXG5cdFx0XHRcblx0QGRlZmluZSAnc29uZ0lEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5zb25nSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNvbmdJRCA9IHZhbHVlXG5cdFx0XHRcblx0QGRlZmluZSAnYWxidW1UaXRsZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1UaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1UaXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzb25nVGl0bGUnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnNvbmdUaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ1RpdGxlID0gdmFsdWVcblx0XHRcdCIsIkRhdGEgPSByZXF1aXJlICdkYXRhJ1xuVGltZSA9IHJlcXVpcmUgJ3RpbWVmcm9tc2VjJ1xuXG5zb25nUGF0aCA9IFwiaW1hZ2VzL3NvbmdzL1wiXG5cblxuXG5leHBvcnRzLnBsYXlQbGF5bGlzdCA9IChzb25nSUQsIGFsYnVtTW9kZWwpIC0+XG5cdHNvbmdzTmFtZXMgPSBhbGJ1bU1vZGVsLnNvbmdzXG5cdHNvbmdzU291cmNlID0gYWxidW1Nb2RlbC5zb3VyY2Vcblx0IyBzb25nc0FsYnVtcyA9IGFsYnVtTW9kZWwuYWxidW1zXG5cdFxuXHRzb25nc05hbWVDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc05hbWVzKVxuXHRzb25nc1NvdXJjZUN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzU291cmNlKVxuXHQjIHNvbmdBbGJ1bUlEQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NBbGJ1bXMpXG5cdFxuXHRwbGF5aW5nU29uZ05hbWUgPSBcIlwiXG5cdHBsYXlpbmdTb25nU291cmNlID0gXCJcIlxuXHRwbGF5aW5nU29uZ0FsYnVtSUQgPSAwXG5cdGZvciBpIGluIFswLi5zb25nSURdXG5cdFx0cGxheWluZ1NvbmdOYW1lID0gc29uZ3NOYW1lQ3ljbGVyKClcblx0XHRwbGF5aW5nU29uZ1NvdXJjZVx0PSBzb25nUGF0aCtzb25nc1NvdXJjZUN5Y2xlcigpXG5cdFx0IyBwbGF5aW5nU29uZ0FsYnVtSUQgPSBVdGlscy5jeWNsZShzb25nc0FsYnVtcylcblx0XHQjIHByaW50IHBsYXlpbmdTb25nQWxidW1JRFxuXHRcblx0aWYgcGF1c2Uuc3RhdGVzLmN1cnJlbnQgaXMgXCJoaWRkZW5cIlxuXHRcdHBsYXkuc3RhdGVzLm5leHQoKVxuXHRcdHBhdXNlLnN0YXRlcy5uZXh0KClcblx0XG5cdG11c2ljLnZpZGVvID0gcGxheWluZ1NvbmdTb3VyY2Vcblx0XG5cdHBsYXllclNvbmdUaXRsZS50ZXh0ID0gcGxheWluZ1NvbmdOYW1lXG5cdCMgcHJpbnQgcGxheWluZ1NvbmdBbGJ1bUlEXG5cdCMgcHJpbnQgRGF0YS5hbGJ1bXNEYXRhW3BsYXlpbmdTb25nQWxidW1JRF1cblx0cGxheWVyU29uZ0FsYnVtLnRleHQgPSBhbGJ1bU1vZGVsLnRpdGxlICsgXCIg4oCTIFwiICsgYWxidW1Nb2RlbC55ZWFyXG5cdFxuXHRVdGlscy5kZWxheSAuMywgLT4gXG5cdFx0ZHVyYXRpb25SaWdodC5odG1sID0gXCItXCIgKyBUaW1lLnRpbWVGcm9tU2Vjb25kcyBtdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XHRzY3J1YmJlci5tYXggPSB+fm11c2ljLnBsYXllci5kdXJhdGlvblxuXHRcblx0bXVzaWMucGxheWVyLnBsYXkoKVxuXG5cbmV4cG9ydHMucGxheUZhdlBsYXlsaXN0ID0gKHNvbmdJRCwgYWxidW1Nb2RlbCwgbXVzaWMsIHBsYXksIHBhdXNlLCBwbGF5ZXJTb25nVGl0bGUsIHBsYXllclNvbmdBbGJ1bSwgZHVyYXRpb25SaWdodCwgc2NydWJiZXIpIC0+XG5cdHNvbmdzTmFtZXMgPSBhbGJ1bU1vZGVsLnNvbmdzXG5cdHNvbmdzU291cmNlID0gYWxidW1Nb2RlbC5zb3VyY2Vcblx0c29uZ3NBbGJ1bXMgPSBhbGJ1bU1vZGVsLmFsYnVtc1xuXHRcblx0c29uZ3NOYW1lQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NOYW1lcylcblx0c29uZ3NTb3VyY2VDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc1NvdXJjZSlcblx0c29uZ0FsYnVtSURDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc0FsYnVtcylcblx0XG5cdHBsYXlpbmdTb25nTmFtZSA9IFwiXCJcblx0cGxheWluZ1NvbmdTb3VyY2UgPSBcIlwiXG5cdHBsYXlpbmdTb25nQWxidW1JRCA9IDBcblx0Zm9yIGkgaW4gWzAuLnNvbmdJRF1cblx0XHRwbGF5aW5nU29uZ05hbWUgPSBzb25nc05hbWVDeWNsZXIoKVxuXHRcdHBsYXlpbmdTb25nU291cmNlID0gc29uZ1BhdGgrc29uZ3NTb3VyY2VDeWNsZXIoKVxuXHRcdHBsYXlpbmdTb25nQWxidW1JRCA9IHNvbmdBbGJ1bUlEQ3ljbGVyKClcblx0XG5cdGlmIHBhdXNlLnN0YXRlcy5jdXJyZW50IGlzIFwiaGlkZGVuXCJcblx0XHRwbGF5LnN0YXRlcy5uZXh0KClcblx0XHRwYXVzZS5zdGF0ZXMubmV4dCgpXG5cdFxuXHRtdXNpYy52aWRlbyA9IHBsYXlpbmdTb25nU291cmNlXG5cdFxuXHRwbGF5ZXJTb25nVGl0bGUudGV4dCA9IHBsYXlpbmdTb25nTmFtZVxuXHRwbGF5ZXJTb25nQWxidW0udGV4dCA9IERhdGEuYWxidW1zRGF0YVtwbGF5aW5nU29uZ0FsYnVtSURdLnRpdGxlICsgXCIg4oCTIFwiICsgRGF0YS5hbGJ1bXNEYXRhW3BsYXlpbmdTb25nQWxidW1JRF0ueWVhclxuXHRcblx0VXRpbHMuZGVsYXkgLjMsIC0+IFxuXHRcdGR1cmF0aW9uUmlnaHQuaHRtbCA9IFwiLVwiICsgVGltZS50aW1lRnJvbVNlY29uZHMgbXVzaWMucGxheWVyLmR1cmF0aW9uXG5cdFx0c2NydWJiZXIubWF4ID0gfn5tdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XG5cdG11c2ljLnBsYXllci5wbGF5KClcblxuXG4iLCJjbGFzcyBleHBvcnRzLk5ld3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLm5ld3NJRCA/PSAtMVxuXHRcdEBvcHRpb25zLm5ld3NJbWFnZSA/PSAtMVxuXHRcdEBvcHRpb25zLm5ld3NUZXh0SW1hZ2UgPz0gLTFcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QC5ib3JkZXJSYWRpdXMgPSA4XG5cdFx0XG5cdEBkZWZpbmUgJ25ld3NJRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0lEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSUQgPSB2YWx1ZVxuXHRcdFx0XG5cdEBkZWZpbmUgJ25ld3NJbWFnZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0ltYWdlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSW1hZ2UgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnbmV3c1RleHRJbWFnZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c1RleHRJbWFnZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c1RleHRJbWFnZSA9IHZhbHVlXG5cdCIsImNsYXNzIGV4cG9ydHMuTmF2IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5uYXZJRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ25hdklEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5uYXZJRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmF2SUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIEdldHRpbmcgRGF0YVxuXG5zb25nTW9kZWwwID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8wLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzAuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMC5qcGdcIlxufVxuXG5zb25nTW9kZWwxID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzEuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMS5qcGdcIlxufVxuXG5zb25nTW9kZWwyID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8yLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzIuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMi5qcGdcIlxufVxuXG5zb25nTW9kZWwzID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8zLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzMuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMy5qcGdcIlxufVxuXG5zb25nTW9kZWw0ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC80LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzQuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNC5qcGdcIlxufVxuXG5zb25nTW9kZWw1ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC81LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzUuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNS5qcGdcIlxufVxuXG5zb25nTW9kZWw2ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC82LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzYuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNi5qcGdcIlxufVxuXG5zb25nTW9kZWw3ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC83LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzcuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNy5qcGdcIlxufVxuXG5zb25nTW9kZWw4ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC84LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzguanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvOC5qcGdcIlxufVxuXG5zb25nTW9kZWw5ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC85LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzkuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvOS5qcGdcIlxufVxuXG5zb25nTW9kZWwxMCA9IHtcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8xMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBcImltYWdlcy9uZXdzL2NvdmVycy8xMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IFwiaW1hZ2VzL25ld3MvdGV4dC8xMC5qcGdcIlxufVxuXG5leHBvcnRzLmZlZWREYXRhID0gW3NvbmdNb2RlbDAsIHNvbmdNb2RlbDEsIHNvbmdNb2RlbDIsIHNvbmdNb2RlbDMsIHNvbmdNb2RlbDQsIHNvbmdNb2RlbDUsIHNvbmdNb2RlbDYsIHNvbmdNb2RlbDcsIHNvbmdNb2RlbDgsIHNvbmdNb2RlbDksIHNvbmdNb2RlbDEwXSIsIiMgbG9jYWxEaXNhcHBlYXJUaW1lID0gMC41XG4jIGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmUgPSBcImN1YmljLWJlemllciguMDYsLjgxLDAsLjkzKVwiXG4jIGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4wNiwuODEsLjc5LC45OSlcIlxubG9jYWxEaXNhcHBlYXJUaW1lID0gMC4zNFxubG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxubG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5cblxuY2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcpIC0+XG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAtODgqM1xuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDExMzZcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRVdGlscy5kZWxheSBsb2NhbERpc2FwcGVhclRpbWUrMC4wMiwgLT5cblx0XHRuZXdzRGV0YWlsZWRWaWV3LmRlc3Ryb3koKVxuXG5cbmNsb3NlRGV0YWlsZWRWaWV3ID0gKG5ld3NEZXRhaWxlZFZpZXcpIC0+XG5cdG1vcmVUaW1lID0gMS40XG5cdG5ld3NEZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAtMTEzNlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAqIG1vcmVUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0VXRpbHMuZGVsYXkgbG9jYWxEaXNhcHBlYXJUaW1lICogbW9yZVRpbWUgKyAwLjAyLCAtPlxuXHRcdG5ld3NEZXRhaWxlZFZpZXcuZGVzdHJveSgpXG5cblxuXG5cblxuXG5cbmV4cG9ydHMuY3JlYXRlTmV3c0RldGFpbGVkUGFnZSA9IChuZXdzRGF0YU1vZGVsKSAtPlxuXHQjIHByaW50IG5ld3NEYXRhTW9kZWwuaW1hZ2Vcblx0XG5cdG5ld3NEZXRhaWxlZFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcblx0bmV3c0RldGFpbGVkVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdCMgc2tpcCB0YXBzXG5cblx0bmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDg4KjJcblx0XHR5OiAtODgqMlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0aW1hZ2U6IG5ld3NEYXRhTW9kZWwuaW1hZ2VcblxuXHRibHVyRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cdFx0d2lkdGg6IG5ld3NEZXRhaWxlZFRvcFZpZXcud2lkdGhcblx0XHRoZWlnaHQ6IG5ld3NEZXRhaWxlZFRvcFZpZXcuaGVpZ2h0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cblx0Ymx1ckRldGFpbGVkVG9wVmlldy5zdHlsZSA9XG5cdFx0XHQnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInOiAnYmx1cigyMHB4KSdcblxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQqMlxuXHRcdGhlaWdodDogNjQqMlxuXHRcdHg6IDBcblx0XHR5OiAyMCoyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdGltYWdlOiBcImltYWdlcy9jbG9zZU5ld3NQYWdlLnBuZ1wiXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cblx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyIHdpZHRoOiAyNDQsIGhlaWdodDogNzIsIHg6IDM3NiwgeTogNzIsIGltYWdlOiBcImltYWdlcy9zaGFyZU5ld3NEZXRhaWxlZFZpZXcucG5nXCIsIHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXHRcblx0XG5cblxuXHRuZXdzRGV0YWlsZWRDb250ZW50ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHR5OiAxMTM2XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRWaWV3XG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJiZ2EoMCwwLDAsMClcIlxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRcblx0XHRzcGVlZFk6IDAuOFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2VcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50SW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiA0ODBcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0aW1hZ2U6IG5ld3NEYXRhTW9kZWwuaW1hZ2VcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNDAwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHR5OiBuZXdzRGV0YWlsZWRDb250ZW50SW1hZ2UuaGVpZ2h0XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnRcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dEltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXdcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNDQwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRpbWFnZTogbmV3c0RhdGFNb2RlbC50ZXh0SW1hZ2VcblxuXHRcblx0XG5cdFxuXHQjIG9wZW5pbmcgYW5pbWF0aW9uc1xuXHRcblx0bmV3c0RldGFpbGVkVG9wVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDg4KjJcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcdCMgY3VydmU6IFwiY3ViaWMtYmV6aWVyKC4wMSwxLC43OCwuODkpXCJcblx0XHRcblx0bmV3c0RldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXG5cblxuXG5cdGdhcEJvdHRvbSA9IC0xMDQwXG5cdGdhcFRvcCA9IDEwXG5cdGdhcERlbHRhID0gMTEwXG5cdFxuXHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSwgLT5cblx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IHRydWVcblx0XG5cdFxuXHRcblx0IyBjbG9zZSB2aWV3XG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwub24gRXZlbnRzLk1vdmUsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPiBnYXBUb3AgJiYgaXNOZXdzVmlld01vZHVsYXRpbmdcblx0XHRcdGJvdW5kcyA9IFtnYXBUb3AsIGdhcFRvcCtnYXBEZWx0YV1cblx0XHRcdG5ld3NEZXRhaWxlZFRvcFZpZXcueSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAtODhdLCB0cnVlKSBcblx0XHRcdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0bG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAuOSwgMF0sIHRydWUpXG5cdFx0XHRuZXdzRGV0YWlsZWRWaWV3LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCxcIiArIGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSArIFwiKVwiXG5cdFx0XHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55IDwgZ2FwQm90dG9tICYmIGlzTmV3c1ZpZXdNb2R1bGF0aW5nXG5cdFx0XHRib3VuZHMgPSBbZ2FwQm90dG9tLCBnYXBCb3R0b20tZ2FwRGVsdGFdXG5cdFx0XHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLjksIDBdLCB0cnVlKVxuXHRcdFx0bmV3c0RldGFpbGVkVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgKyBcIilcIlxuXHRcdFx0XG5cdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLm9uIEV2ZW50cy5TY3JvbGwsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPCBnYXBCb3R0b20gLSBnYXBEZWx0YVxuXHRcdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0XHRjbG9zZURldGFpbGVkVmlldyhuZXdzRGV0YWlsZWRWaWV3KVx0XHRcdFxuXHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55ID4gZ2FwVG9wICsgZ2FwRGVsdGFcblx0XHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdFx0Y2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcpXG5cdFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdGNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3KVxuXHRcdFxuXHRcdG5ld3NEZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0XHRcblx0XHRcblx0XG5cdFxuXHRyZXR1cm4gbmV3c0RldGFpbGVkVmlldyIsIkRhdGEgPSByZXF1aXJlICdkYXRhJ1xuU29uZ0NyZWF0b3IgPSByZXF1aXJlICdjcmVhdGVfc29uZydcbiMgU29uZ1BsYXllciA9IHJlcXVpcmUgJ3BsYXlfc29uZydcbntUZXh0TGF5ZXJ9ID0gcmVxdWlyZSBcInRleHRcIlxuXG5cbmxvY2FsRGlzYXBwZWFyVGltZSA9IDAuMlxubG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxubG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5cblxuYW5pbWF0ZURldGFpbGVkQWxidW1QYWdlID0gKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1kpIC0+XG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlLndpZHRoID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbNjQwLCBvZmZzZXRWYWx1ZS53aWR0aF0sIHRydWUpXG5cdGFsYnVtX2Zha2VfaW1hZ2UuaGVpZ2h0ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbNjQwLCBvZmZzZXRWYWx1ZS5oZWlnaHRdLCB0cnVlKVxuXHRhbGJ1bV9mYWtlX2ltYWdlLnggPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLCBvZmZzZXRWYWx1ZS54XSwgdHJ1ZSlcblx0YWxidW1fZmFrZV9pbWFnZS55ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMCwgb2Zmc2V0VmFsdWUueV0sIHRydWUpXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC40XSlcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIud2lkdGggPSBhbGJ1bV9mYWtlX2ltYWdlLndpZHRoXG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLmhlaWdodCA9IGFsYnVtX2Zha2VfaW1hZ2UuaGVpZ2h0XG5cdFx0XG5cdGxvY2FsQ29sb3IgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLjgsIDBdLCB0cnVlKVxuXHRkZXRhaWxlZEFsYnVtVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbENvbG9yICsgXCIpXCJcblx0XG5cdGZvciBpdGVtLGkgaW4gYWxidW1PcHRpb25zXG5cdFx0aXRlbS5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC40XSlcblx0XHRpdGVtLnkgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFthbGJ1bU9wdGlvbnNZW2ldLCBhbGJ1bU9wdGlvbnNZW2ldK29mZnNldFZhbHVlLnkgLyAyICsgKGkrMSkgKiAyMF0pXG5cblxuY2xvc2VEZXRhaWxlZEFsYnVtUGFnZSA9IChhbGJ1bVNvbmdzVmlldywgYWxidW1fZmFrZV9pbWFnZSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIG9mZnNldFZhbHVlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zKSAtPlxuXHRcblx0YWxidW1Tb25nc1ZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAxMTM2XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZS5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHdpZHRoOiBvZmZzZXRWYWx1ZS53aWR0aCwgaGVpZ2h0OiBvZmZzZXRWYWx1ZS5oZWlnaHQsIHg6IG9mZnNldFZhbHVlLngsIHk6IG9mZnNldFZhbHVlLnlcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdG9wYWNpdHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XG5cdGRldGFpbGVkQWxidW1WaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIn1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XG5cdGZvciBpdGVtIGluIGFsYnVtT3B0aW9uc1xuXHRcdGl0ZW0uYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczogeyBvcGFjaXR5OiAwLCB5OiBpdGVtLnkgKyA2MH1cblx0XHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDRcblx0XG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSswLjAyLCAtPlxuXHRcdGRldGFpbGVkQWxidW1WaWV3LmRlc3Ryb3koKVxuXG5cblxuXG5cbiMgQ29tcG9zZSBEZXRhaWxlZCBWaWV3XHRcbmV4cG9ydHMuY3JlYXRlRGV0YWlsZWRBbGJ1bVBhZ2UgPSAoYWxidW1JRCwgb2Zmc2V0VmFsdWUpIC0+XG5cdFxuXHRkZXRhaWxlZEFsYnVtVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzZcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFxuXHRkZXRhaWxlZEFsYnVtVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdCMgaWdub3JlIG90aGVyIHRhcHNcblxuXG5cblxuXHRhbGJ1bV9mYWtlX2ltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHdpZHRoOiBvZmZzZXRWYWx1ZS53aWR0aFxuXHRcdGhlaWdodDogb2Zmc2V0VmFsdWUuaGVpZ2h0XG5cdFx0eDogb2Zmc2V0VmFsdWUueFxuXHRcdHk6IG9mZnNldFZhbHVlLnlcblx0XHRpbWFnZTogXCJpbWFnZXMvYWxidW1zLyN7YWxidW1JRH0uanBnXCJcdFxuXG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBhbGJ1bV9mYWtlX2ltYWdlXG5cdFx0b3BhY2l0eTogMFxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDY0MFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNilcIlxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuc3R5bGUgPVxuXHRcdFx0Jy13ZWJraXQtYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoMTBweCknXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0YWxidW1UaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IGRldGFpbGVkQWxidW1WaWV3XG5cdFx0dGV4dDogXCIje0RhdGEuYWxidW1zRGF0YVthbGJ1bUlEXS50aXRsZX1cIlxuXHRcdHdpZHRoOiAyOTIqMlxuXHRcdGhlaWdodDogNDhcblx0XHR4OiAyOFxuXHRcdHk6IDg0KjJcblx0XHRmb250U2l6ZTogNDBcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cdFx0b3BhY2l0eTogMFxuXHRcblx0YWxidW1ZZWFyID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogZGV0YWlsZWRBbGJ1bVZpZXdcblx0XHR0ZXh0OiBcIiN7RGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnllYXJ9XCJcblx0XHR3aWR0aDogMjkyKjJcblx0XHRoZWlnaHQ6IDQ4XG5cdFx0eDogMjhcblx0XHR5OiAxMTQqMlxuXHRcdGZvbnRTaXplOiAzMlxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdGNvbG9yOiBcIiM5OTk5OTlcIlxuXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcdG9wYWNpdHk6IDBcblx0XG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA3MlxuXHRcdGhlaWdodDogNzJcblx0XHR4OiAxNDIqMlxuXHRcdHk6IDM0KjJcblx0XHRpbWFnZTogXCJpbWFnZXMvY2xvc2VOZXdzRGV0YWlsZWRWaWV3LnBuZ1wiXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdG9wYWNpdHk6IDBcblx0XG5cdGFsYnVtU29uZ3NWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDcwOFxuXHRcdHk6IDExMzZcblx0XHQjIGltYWdlOiBcImltYWdlcy9hbGJ1bXMvI3thbGJ1bUlEfS5qcGdcIlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCIjMTExXCJcblx0XG5cdCMgYmx1ciA9IG5ldyBMYXllclxuIyBcdFx0d2lkdGg6IDY0MFxuIyBcdFx0aGVpZ2h0OiAxMTM2XG4jIFx0XHRwYXJlbnQ6IGFsYnVtU29uZ3NWaWV3XG4jIFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNiknXG4jXG4jIFx0Ymx1ci5zdHlsZSA9XG4jIFx0XHQnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInOiAnYmx1cigxMHB4KSdcblxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGFsYnVtT3B0aW9ucyA9IFthbGJ1bVllYXIsIGFsYnVtVGl0bGUsIGNsb3NlTmV3c0RldGFpbGVkVG9wVmlld11cblx0YWxidW1PcHRpb25zWSA9IFthbGJ1bVllYXIueSwgYWxidW1UaXRsZS55LCBjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcueV1cblxuXHRhbGJ1bV9mYWtlX2ltYWdlLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0d2lkdGg6IDY0MCwgaGVpZ2h0OiA2NDAsIHg6IDAsIHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgb3BhY2l0eTogMSB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0Zm9yIGl0ZW0gaW4gYWxidW1PcHRpb25zXG5cdFx0aXRlbS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRcdFxuXHRkZXRhaWxlZEFsYnVtVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczoge2JhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOClcIn1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblxuXHRhbGJ1bVNvbmdzVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDMwOFxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDRcblxuXG5cblxuXG5cblxuXG5cdCMgQ29tcG9zZSBzb25nIGZvciBhbGJ1bVxuXHRzb25nc1Njcm9sbFZpZXcgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogNzA4XG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRwYXJlbnQ6IGFsYnVtU29uZ3NWaWV3XG5cdFx0eTogMjBcblx0XHRzcGVlZFk6IDAuOFxuXG5cdHNvbmdzID0gU29uZ0NyZWF0b3IuY3JlYXRlU29uZ3NGb3JBbGJ1bShhbGJ1bUlEKVxuXHRzb25nUmVzdWx0SGVpZ2h0ID0gMFxuXHRmb3Igc29uZyxpIGluIHNvbmdzXG5cdFx0c29uZy55ID0gaSAqIDgwXG5cdFx0c29uZ1Jlc3VsdEhlaWdodCA9IHNvbmcueSArIHNvbmcuaGVpZ2h0XG5cdFx0c29uZy5wYXJlbnQgPSBzb25nc1Njcm9sbFZpZXcuY29udGVudFxuXHRcblx0XG5cdFxuXHRcblx0IyBDbG9zZSBBbGJ1bSBWaWV3XG5cdGNsb3NpbmdBbGJ1bVZpZXcgPSBmYWxzZVxuXHRib3VuZHMgPSBbMTArNDAsIDEwMCs4MF1cblx0Ym91bmRzQm90dG9tID0gWy0oc29uZ1Jlc3VsdEhlaWdodCAtIHNvbmdzU2Nyb2xsVmlldy5oZWlnaHQgKyBib3VuZHNbMF0pLCAtKHNvbmdSZXN1bHRIZWlnaHQgLSBzb25nc1Njcm9sbFZpZXcuaGVpZ2h0ICsgYm91bmRzWzFdKV1cblx0XG5cdHNvbmdzU2Nyb2xsVmlldy5vbiBFdmVudHMuU2Nyb2xsLCAtPlxuXHRcdFxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPiBib3VuZHNbMF1cblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kcywgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZKVxuXHRcdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA+IGJvdW5kc1sxXVxuXHRcdFx0c29uZ3NTY3JvbGxWaWV3Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGNsb3NpbmdBbGJ1bVZpZXcgPSB0cnVlXG5cdFx0XHRjbG9zZURldGFpbGVkQWxidW1QYWdlKGFsYnVtU29uZ3NWaWV3LCBhbGJ1bV9mYWtlX2ltYWdlLCBhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlciwgb2Zmc2V0VmFsdWUsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMpXG5cdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA8IGJvdW5kc0JvdHRvbVswXVxuXHRcdFx0YW5pbWF0ZURldGFpbGVkQWxidW1QYWdlKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzQm90dG9tLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1kpXG5cblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55IDwgYm91bmRzQm90dG9tWzFdXG5cdFx0XHRzb25nc1Njcm9sbFZpZXcuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0Y2xvc2luZ0FsYnVtVmlldyA9IHRydWVcblx0XHRcdGNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucylcblx0XHRcdFxuXHRcblx0XG5cdFxuXHRzb25nc1Njcm9sbFZpZXcub24gRXZlbnRzLk1vdmUsIC0+XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA+IGJvdW5kc1swXSBhbmQgIWNsb3NpbmdBbGJ1bVZpZXdcblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kcywgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZKVxuXHRcdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA8IGJvdW5kc0JvdHRvbVswXSBhbmQgIWNsb3NpbmdBbGJ1bVZpZXdcblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kc0JvdHRvbSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZKVxuXHRcblx0XG5cdFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0c29uZ3NTY3JvbGxWaWV3Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRjbG9zaW5nQWxidW1WaWV3ID0gdHJ1ZVxuXHRcdGNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucylcblx0XG5cdFxuXG5cdHJldHVybiBbZGV0YWlsZWRBbGJ1bVZpZXcsIHNvbmdzXSIsIiMgR2V0dGluZyBEYXRhXG5cbmFsYnVtTW9kZWwxID0geyBcblx0dGl0bGU6IFwiRW1vdGlvbmFsIDhcIlxuXHR5ZWFyOiAxOTk4XG5cdFxuXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG5cdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuXHRcblx0aW1hZ2U6IFwiaW1hZ2VzL2FsYnVtcy8xLmpwZ1wiXG5cdHRpbnRDb2xvcjogXCJncmV5XCJcblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cbn1cblxuYWxidW1Nb2RlbDIgPSB7IFxuXHR0aXRsZTogXCJNYXkgMTNcIlxuXHR5ZWFyOiAyMDAxXG5cdFxuXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuXHRcblx0aW1hZ2U6IFwiaW1hZ2VzL2FsYnVtcy8yLmpwZ1wiXG5cdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cbn1cblxuYWxidW1Nb2RlbDMgPSB7IFxuXHR0aXRsZTogXCJFbW90aW9uYWwgOFwiXG5cdHllYXI6IDIwMDJcblx0XG5cdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG5cdFxuXHRpbWFnZTogXCJpbWFnZXMvYWxidW1zLzMuanBnXCJcblx0dGludENvbG9yOiBcImdyZXlcIlxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxufVxuXG5hbGJ1bU1vZGVsNCA9IHsgXG5cdHRpdGxlOiBcIkVtb3Rpb25hbCA4XCJcblx0eWVhcjogMjAwNVxuXHRcblx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cblx0XG5cdGltYWdlOiBcImltYWdlcy9hbGJ1bXMvNC5qcGdcIlxuXHR0aW50Q29sb3I6IFwiZ3JleVwiXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCJdXG59XG5cblxuYWxidW1Nb2RlbDUgPSB7IFxuXHR0aXRsZTogXCJFbW90aW9uYWwgOFwiXG5cdHllYXI6IDIwMDhcblx0XG5cdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG5cdFxuXHRpbWFnZTogXCJpbWFnZXMvYWxidW1zLzUuanBnXCJcblx0dGludENvbG9yOiBcImdyZXlcIlxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxufVxuXG5cblxuXG5cblxuZXhwb3J0cy5hbGJ1bXNEYXRhID0gW2FsYnVtTW9kZWwxLCBhbGJ1bU1vZGVsMiwgYWxidW1Nb2RlbDMsIGFsYnVtTW9kZWw0LCBhbGJ1bU1vZGVsNV1cbmV4cG9ydHMuZmF2TGlzdCA9IHsgXHRcblx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIl1cblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxuXHRcblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiXVxuXHRhbGJ1bXM6IFswLCAxLCAyLCAwLCAwLCAxLCAyLCAyLCAxLCAwXVxufVxuXG5cbiIsIntTb25nfSA9IHJlcXVpcmUgXCJzb25nXCJcbntUZXh0TGF5ZXJ9ID0gcmVxdWlyZSBcInRleHRcIlxuRGF0YSA9IHJlcXVpcmUgXCJkYXRhXCJcblxuIyBTb25nIChhbGJ1bUlEKVxuZXhwb3J0cy5jcmVhdGVTb25nc0ZvckFsYnVtID0gKGFsYnVtSUQpIC0+XG5cdHNvbmdzID0gW11cblx0Zm9yIHNvbmcsIGkgaW4gRGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzXG5cdFx0c29uZ3MucHVzaChALmNyZWF0ZUFsYnVtU29uZyhhbGJ1bUlELCBpKSlcblx0cmV0dXJuIHNvbmdzXG5cdFxuXG5cbmV4cG9ydHMuY3JlYXRlU29uZ3NGb3JGYXYgPSAoc29uZ3NMaXN0KSAtPlxuXHRzb25ncyA9IFtdXG5cdGZvciBzb25nLCBpIGluIHNvbmdzTGlzdC5zb25nc1xuXHRcdHNvbmdzLnB1c2goQC5jcmVhdGVTb25nKGkpKVxuXHRyZXR1cm4gc29uZ3NcblxuXG5cblxuIyBTb25nIChhbGJ1bUlELCBzb25nTnVtYmVyKVxuZXhwb3J0cy5jcmVhdGVTb25nID0gKHNvbmdOdW1iZXIpIC0+XG5cdFxuXHRzb25nVmlldyA9IG5ldyBTb25nXG5cdFx0aGVpZ2h0OiAxMzJcblx0XHRhbGJ1bUlEOiBEYXRhLmZhdkxpc3QuYWxidW1zW3NvbmdOdW1iZXJdXG5cdFx0c29uZ0lEOiBzb25nTnVtYmVyXG5cdFx0IyBhbGJ1bVRpdGxlOiBEYXRhLmFsYnVtc0RhdGFbYWxidW1JRF0udGl0bGVcblx0XHQjIHNvbmdUaXRsZTogRGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzW3NvbmdOdW1iZXJdXG5cblx0c29uZ0ltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdGltYWdlOiBEYXRhLmFsYnVtc0RhdGFbRGF0YS5mYXZMaXN0LmFsYnVtc1tzb25nTnVtYmVyXV0uaW1hZ2Vcblx0XHR3aWR0aDogNDgqMlxuXHRcdGhlaWdodDogNDgqMlxuXHRcdHg6IDMyXG5cdFx0eTogMTZcblxuXHRzb25nVGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdHRleHQ6IFwiI3tEYXRhLmZhdkxpc3Quc29uZ3Nbc29uZ051bWJlcl19XCJcblx0XHR3aWR0aDogNDQwXG5cdFx0aGVpZ2h0OiA0NFxuXHRcdHg6IDE1NlxuXHRcdHk6IDIyXG5cdFx0Zm9udFNpemU6IDM2XG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblxuXHRhbGJ1bVRpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7RGF0YS5hbGJ1bXNEYXRhW0RhdGEuZmF2TGlzdC5hbGJ1bXNbc29uZ051bWJlcl1dLnRpdGxlfVwiXG5cdFx0d2lkdGg6IDQ0MFxuXHRcdGhlaWdodDogMzRcblx0XHR4OiAxNTZcblx0XHR5OiA2OFxuXHRcdGZvbnRTaXplOiAyOFxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRjb2xvcjogXCIjOTk5XCJcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XG5cdHJldHVybiBzb25nVmlld1xuXG5cblxuXG4jIFNvbmcgKGFsYnVtSUQsIHNvbmdOdW1iZXIpXG5leHBvcnRzLmNyZWF0ZUFsYnVtU29uZyA9IChhbGJ1bUlELCBzb25nTnVtYmVyKSAtPlxuXHRcblx0c29uZ1ZpZXcgPSBuZXcgU29uZ1xuXHRcdGhlaWdodDogODBcblx0XHRhbGJ1bUlEOiBhbGJ1bUlEXG5cdFx0c29uZ0lEOiBzb25nTnVtYmVyXG5cdFx0IyBhbGJ1bVRpdGxlOiBEYXRhLmFsYnVtc0RhdGFbYWxidW1JRF0udGltZVtzb25nTnVtYmVyXVxuXHRcdHNvbmdUaXRsZTogRGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzW3NvbmdOdW1iZXJdXG5cblx0c29uZ1RpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7c29uZ1ZpZXcuc29uZ1RpdGxlfVwiXG5cdFx0d2lkdGg6IDQ0MFxuXHRcdGhlaWdodDogNDBcblx0XHR4OiAoMjgrMTQpKjJcblx0XHR5OiAyMFxuXHRcdGZvbnRTaXplOiAzMlxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cblx0c29uZ0R1cmF0aW9uID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7RGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpbWVbc29uZ051bWJlcl19XCJcblx0XHR3aWR0aDogMTIwXG5cdFx0aGVpZ2h0OiAzNFxuXHRcdHg6IDIzMioyKzI4XG5cdFx0eTogMjZcblx0XHRmb250U2l6ZTogMjhcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdGNvbG9yOiBcIiM5OTlcIlxuXHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcdG9wYWNpdHk6IDAuN1xuXHRcblx0c29uZ051bWJlciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IHNvbmdWaWV3XG5cdFx0dGV4dDogXCIje3NvbmdOdW1iZXIrMX1cIlxuXHRcdHdpZHRoOiAxOCoyXG5cdFx0aGVpZ2h0OiAxNCoyXG5cdFx0eDogMTAqMlxuXHRcdHk6IDEzKjJcblx0XHRmb250U2l6ZTogMjRcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdGNvbG9yOiBcIiM5OTlcIlxuXHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcdG9wYWNpdHk6IDAuN1xuXHRcblx0cmV0dXJuIHNvbmdWaWV3IiwiY2xhc3MgZXhwb3J0cy5BbGJ1bSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuYWxidW1JRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ2FsYnVtSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsIiMgTG9nb1xuXG5jbGFzcyBleHBvcnRzLkxvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKFwiRkZGXCIpXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG5cbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdFxuXG5cdFxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblxuXG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcblx0dGlwOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy90aXAucG5nXCJcbiIsIiMgUHJldmlldyBDb21wb25lbnRcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuIyB7UHJldmlld0NsYXNzMX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzMVwiXG4jIHtQcmV2aWV3Q2xhc3M0fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M0XCJcbntQcmV2aWV3Q2xhc3M1fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M1XCJcblxuIyBwcmludCBQcmV2aWV3XG5cblxuY2xhc3MgRml4UHJldmlld0V4cG9ydCBleHRlbmRzIFByZXZpZXdDbGFzczVcbmNsYXNzIGV4cG9ydHMuUHJldmlldyBleHRlbmRzIEZpeFByZXZpZXdFeHBvcnRcblxuXG5cblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuXG5cblxuXG5cblxuIiwiXG5leHBvcnRzLmRhdGEgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuIiwiXG5cbntQcmV2aWV3Q2xhc3M0fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M0XCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczUgZXh0ZW5kcyBQcmV2aWV3Q2xhc3M0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRjb250cm9sUGFuZWxMYXllciA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAwXG5cdFx0XHR4OiAyMCwgeTogNjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGNvbnRyb2xQYW5lbDogY29udHJvbFBhbmVsTGF5ZXJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICdjb250cm9sUGFuZWwnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbCA9IHZhbHVlXG5cdFxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIHJldHVyblxuXHRcdGVsc2Vcblx0XHRcdHNlY3Rpb25WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdHdpZHRoOiAzNjBcblx0XHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udHJvbFBhbmVsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XHRzZWN0aW9uVmlldy55ID0gKEBjb250cm9sUGFuZWwuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAxMDBcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZSh0aXRsZSkucGFyZW50ID0gc2VjdGlvblZpZXdcblxuXHRcdFx0c3VtWCA9IDBcblx0XHRcdGZvciBhY3Rpb25JdGVtLCBpbmRleCBpbiBhY3Rpb25BcnJheVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZFNlY3Rpb25CdXR0b24oYWN0aW9uSXRlbSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcdFx0XG5cblxuXG5cblx0YWRkU2VjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIHBWID0gNiwgcEggPSA5KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiBwViwgYm90dG9tOiBwViArIDIsIGxlZnQ6IHBILCByaWdodDogcEggfVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0XG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgYWN0aW9uSXRlbS5oYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAodGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdHJldHVybiBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiB0aXRsZVxuXHRcdFx0Zm9udFNpemU6IDE1XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiAxMlxuXG5cblxuXG4jICMgRXhhbXBsZVxuIyBwcmV2aWV3LmFkZFNlY3Rpb24oXCJDaG9vc2UgQmFja2dyb3VuZFwiLCBbXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH0sXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH1cbiMgXSkiLCJcblxue1ByZXZpZXdDbGFzczN9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczNcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNCBleHRlbmRzIFByZXZpZXdDbGFzczNcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0QHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2Vcblx0XHRcdEB1cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRcdEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblxuXG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cblxuXG5cblx0c2V0RGVza3RvcFNjYWxlTW9kZTogKGZvclN0YXRlID0gXCJub3JtYWxcIikgPT5cblxuXHRcdGluaXRTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIGZvclN0YXRlKVxuXG5cdFx0c2hvdWxkU2hvd0J1dHRvbiA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIHRydWUpXG5cblx0XHRzaG91bGRTaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgdHJ1ZSlcblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRAc3RhdGVTd2l0Y2goaW5pdFN0YXRlKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gXCIyMjJcIlxuXHRcdEBjcmVhdGVCYXJzKClcblx0XHRAY2VudGVyKClcblx0XHRAY2xpcCA9IHRydWVcblxuXG5cdHVwZGF0ZVByZXZpZXdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbFByZXZpZXcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy55ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdHByZXZpZXdDYW52YXMgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMjIyXCIsIG5hbWU6IFwiLmhpZGRlblByZXZpZXdDYW52YXNcIlxuXHRcdFxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAY2VudGVyKClcblx0XHRAb3JpZ2luWSA9IDAuNVxuXHRcdEBvcmlnaW5YID0gMC41XG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KVxuXHRcdFx0XG5cdFx0XHRpZiBAc2NyZWVuU2l6ZSgzNzUsIDc2OCkgb3IgQHNjcmVlblNpemUoMzkwLCA3OTcpIG9yIEBzY3JlZW5TaXplKDQxNCwgODUyKSBvciBAc2NyZWVuU2l6ZSg0MjgsIDg3OSlcblx0XHRcdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzZXRDdXN0b21QcmV2aWV3KClcblx0XHRcbiMgXHRcdGVsc2UgaWYgQHZpZXcud2lkdGggPT0gMzYwXG5cdFx0XHRcblx0XHRlbHNlXG5cdFx0XHRAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wXG5cdFx0QG9yaWdpblkgPSAwLjFcblx0XHRcblx0XHRAc2NhbGUgPSAoU2NyZWVuLmhlaWdodCAtIDEyMCkgLyBAaGVpZ2h0XG5cdFx0QGJvcmRlclJhZGl1cyA9IDIwXG5cdFx0QGNsaXAgPSB0cnVlXG5cblx0XHR0aXAgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAyNDAsIGhlaWdodDogNDRcblx0XHRcdGltYWdlOiBAYXNzZXRzLnRpcFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTMwKVxuXHRcdFx0b3BhY2l0eTogMC41XG5cblxuXG5cblx0IyBnZXRTdGF0ZUdlbmVyaWM6IChrZXkgPSBcInNjYWxlXCIsIHBhaXJzID0gW3sgdmFsdWU6ICwgcmVzdWx0OiB9LCB7dmFsdWU6ICwgcmVzdWx0OiB9XSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpXG5cdGdldFN0YXRlR2VuZXJpYzogKHN0YXRlS2V5ID0gXCJzY2FsZVwiLCBzdGF0ZVBhaXJzID0gW10sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKSA9PlxuXHRcdHJlc3VsdCA9IGRlZmF1bHRSZXN1bHRcblxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblxuXHRcdFx0aWYga2V5UGFydCA9PSBzdGF0ZUtleVxuXHRcdFx0XHRmb3IgcGFpciBpbiBzdGF0ZVBhaXJzXG5cdFx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IHBhaXIudmFsdWVcblx0XHRcdFx0XHRcdCMgcHJpbnQgXCJvayBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHBhaXIucmVzdWx0XG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwibm90IFwiICsgXCIgI3twYWlyLnZhbHVlfVwiIFxuXHRcdFxuXHRcdHJldHVybiByZXN1bHRcblx0XG5cdFxuXHRcblx0XG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIlByZXZpZXdfTG9nb0xheWVyXCJcbntQcmV2aWV3Q2xhc3MyfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MyXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczMgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cblxuXG4iLCJcblxue1ByZXZpZXdDbGFzczF9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczFcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMiBleHRlbmRzIFByZXZpZXdDbGFzczFcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXG5cblxuXG5cdCMgQ3JlYXRlIEJhcnNcblxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdHRvcEJhciA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIodG9wQmFyKSBcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcilcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6ICh0ZW1wKSA9PlxuXHRcdHRlbXAuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIgbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IHRlbXAsIHdpZHRoOiB0ZW1wLndpZHRoIC0gMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24udG9wKDYpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyKDEpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltcImRhcmtcIl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtcImRhcmtcIl1cblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY1N0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0xlZnRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5sZWZ0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJMZWZ0SW1hZ2VbXCJkYXJrXCJdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW1wiZGFya1wiXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW1wiZGFya1wiXVxuXHRcdFxuXHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltcImRhcmtcIl0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtcImRhcmtcIl1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbXCJkYXJrXCJdLCBib3JkZXJSYWRpdXM6IDIwXG5cdFxuXHQiLCJcblxuQXNzZXRzID0gcmVxdWlyZSBcIlByZXZpZXdfQXNzZXRzXCJcblxuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3MxIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBcIlByZXZpZXdcIlxuXG5cdFx0XHR2aWV3OiBudWxsXG5cdFx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlXG5cdFx0XHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0XG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IFwiMjA6MjBcIlxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cblx0XHR3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0KEApXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblxuXHRcblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcblxuXG5cblxuXG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cdFxuXG5cblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcIm5vcm1hbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJmaWxsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdHN0YXRlU3dpdGNoVG9Ob3JtYWw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cblxuXHRcdFxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkF5QkFBO0FERUEsSUFBQSxNQUFBO0VBQUE7Ozs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGdCQUFSOztBQUtILE9BQU8sQ0FBQzs7O0VBQ0EsdUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsSUFBQSxFQUFNLFNBQU47TUFFQSxJQUFBLEVBQU0sSUFGTjtNQUdBLE9BQUEsRUFBUyxJQUhUO01BSUEsZUFBQSxFQUFpQixLQUpqQjtNQU1BLGVBQUEsRUFBaUIsSUFOakI7TUFPQSxZQUFBLEVBQWMs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
