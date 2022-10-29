require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"DynamicLoader":[function(require,module,exports){

/*
DynamicLoader Module for FramerJS
https://github.com/LucienLee/framer-DynamicLoader/

Created by Lucien Lee (@luciendeer), Jan. 12th, 2016

DynamicLoader braeks the barriars between 3rd party web development libraries and Framer, which
help you load local, external stylesheets and scripts dynamically.

Add the following line to your project in Framer Studio.
	{DynamicLoader} = require 'DynamicLoader'

[Load one file]
DynamicLoader.add('script.js').then(->
 * when script.js loaded successfully
...
).catch(->
 * when script.js loaded failed
...
)

[Load file in series]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )

[Load file in parallel]
DynamicLoader.series(['one.js', 'two.css', ...]).then( successCallback, failCallback )
 */
exports.DynamicLoader = (function() {
  function DynamicLoader() {}

  DynamicLoader.add = function(url) {
    var promise;
    promise = new Promise(function(resolve, reject) {
      var file, loaded;
      if (url.substr(url.lastIndexOf('.')) === ".js") {
        loaded = Array.prototype.find.call(document.getElementsByTagName('script'), function(element) {
          if (element.getAttribute('src') === url) {
            return element;
          }
        });
        if (loaded !== void 0) {
          return resolve('have loaded');
        }
        file = document.createElement('script');
        file.src = url;
      } else if (url.substr(url.lastIndexOf('.')) === ".css") {
        loaded = Array.prototype.find.call(document.getElementsByTagName('link'), function(element) {
          if (element.getAttribute('rel') === url) {
            return element;
          }
        });
        if (loaded !== void 0) {
          return resolve('have loaded');
        }
        file = document.createElement('link');
        file.rel = "stylesheet";
        file.href = url;
      }
      file.addEventListener('load', function() {
        return resolve(file);
      });
      file.addEventListener('error', function() {
        return reject(file);
      });
      return document.body.appendChild(file);
    });
    return promise;
  };

  DynamicLoader.series = function(urls) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw "ERROR: NO URL IN ARRAY!";
    }
    return urls.reduce((function(_this) {
      return function(promise, url) {
        return promise.then(function() {
          return _this.add(url);
        });
      };
    })(this), Promise.resolve());
  };

  DynamicLoader.parallel = function(urls) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw "ERROR: NO URL IN ARRAY!";
    }
    return Promise.all(urls.map((function(_this) {
      return function(url) {
        return _this.add(url);
      };
    })(this)));
  };

  return DynamicLoader;

})();


},{}],"PreviewClass1":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9pT1NTd2l0Y2guY29mZmVlIiwiLi4vbW9kdWxlcy9pT1NTZWdtZW50ZWRDb250cm9sLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld19Mb2dvTGF5ZXIuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3X0Fzc2V0cy5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzNS5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczQuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3MzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzMi5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczEuY29mZmVlIiwiLi4vbW9kdWxlcy9EeW5hbWljTG9hZGVyLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMjI1xuXHQjIGlPU1N3aXRjaFxuXHR7aU9TU3dpdGNofSA9IHJlcXVpcmUgXCJpT1NTd2l0Y2hcIlxuXG5cdHN3aXRjaCA9IG5ldyBpT1NTd2l0Y2hcblx0XHRpc09uOiA8Ym9vbD4gaXMgdGhlIHN3aXRjaCBpbiB0aGUgb24gcG9zaXRpb24gKGRlZmF1bHRzIHRvIGZhbHNlKVxuXHRcdHRpbnRDb2xvcjogPGNvbG9yPiB0aGUgY29sb3Igb2YgdGhlIHN3aXRjaCBiYWNrZ3JvdW5kIHdoZW4gaXNPbiBpcyB0cnVlIChkZWZhdWx0cyB0byBpT1MgZ3JlZW4pXG5cdFx0dGh1bWJUaW50Q29sb3I6IDxjb2xvcj4gdGhlIGNvbG9yIG9mIHRoZSBzd2l0Y2ggdGh1bWIgKGRlZmF1bHRzIHRvIHdoaXRlKVxuXG5cdCMgT2JzZXJ2ZSB0aGUgXCJFdmVudHMuVmFsdWVDaGFuZ2VcIiBldmVudFxuXHRzd2l0Y2gub25WYWx1ZUNoYW5nZSAodmFsdWUpIC0+XG5cbiMjI1xuXG5pT1NLaXRDb2xvcnMgPVxuICByZWQ6IG5ldyBDb2xvcihcIkZGM0IzMFwiKVxuICBncmVlbjogbmV3IENvbG9yKFwiNENEOTY0XCIpXG4gIGJsdWU6ICBuZXcgQ29sb3IoXCIwMDdBRkZcIilcbiAgYmxhY2s6IG5ldyBDb2xvcihcIjAwMFwiKVxuICBncmF5OiBuZXcgQ29sb3IoXCI4RThFOTNcIilcbiAgZ3JleTogbmV3IENvbG9yKFwiOEU4RTkzXCIpXG4gIHdoaXRlOiBuZXcgQ29sb3IoXCJmZmZcIilcbiAgdHJhbnNwYXJlbnQ6IG5ldyBDb2xvcihcInRyYW5zcGFyZW50XCIpXG5cblxuRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlID0gXCJzd2l0Y2hWYWx1ZUNoYW5nZVwiXG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0b3B0aW9ucyA9IF8uZGVmYXVsdHMge30sIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogNTFcblx0XHRcdGhlaWdodDogMzFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogaU9TS2l0Q29sb3JzLnRyYW5zcGFyZW50XG5cblx0XHRcdHRpbnRDb2xvcjogaU9TS2l0Q29sb3JzLmdyZWVuXG5cdFx0XHR0aHVtYlRpbnRDb2xvcjogaU9TS2l0Q29sb3JzLndoaXRlXG5cdFx0XHRpc09uOiBmYWxzZVxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdHJpbUNvbG9yID0gXCJFNUU1RUFcIlxuXG5cdFx0QGJhc2UgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmJhc2VcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogaU9TS2l0Q29sb3JzLnRyYW5zcGFyZW50XG5cdFx0XHRib3JkZXJSYWRpdXM6IDIwXG5cdFx0XHRib3JkZXJDb2xvcjogcmltQ29sb3Jcblx0XHRcdGJvcmRlcldpZHRoOiAxLjVcblxuXHRcdFx0c2hhZG93Q29sb3I6IHJpbUNvbG9yXG5cdFx0XHRzaGFkb3dUeXBlOiBcImlubmVyXCJcblxuXHRcdEBiYXNlLnN0YXRlcy5vbiA9XG5cdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0c2hhZG93Q29sb3I6IEB0aW50Q29sb3Jcblx0XHRcdHNoYWRvd1NwcmVhZDogMjBcblxuXHRcdEBiYXNlLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0dGltZTogMC42XG5cdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuNzUpXG5cblx0XHRAdGh1bWIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLnRodW1iXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDI5LCBoZWlnaHQ6IDI5XG5cdFx0XHRib3JkZXJSYWRpdXM6IDE0LjVcblx0XHRcdHg6IDFcblx0XHRcdG1pZFk6IEBoZWlnaHQgLyAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlPU0tpdENvbG9ycy50cmFuc3BhcmVudFxuXHRcdFx0Ym9yZGVyV2lkdGg6IDAuNVxuXHRcdFx0Ym9yZGVyQ29sb3I6IFwicmdiYSgwLDAsMCwwLjA0KVwiXG5cdFx0QHRodW1iLnN0YXRlcy5vbiA9XG5cdFx0XHR4OiAyMVxuXHRcdEB0aHVtYi5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdHRpbWU6IDAuNlxuXHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjgpXG5cblx0XHRAdGh1bWJGaWxsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInRodW1iRmlsbFwiXG5cdFx0XHRwYXJlbnQ6IEB0aHVtYlxuXHRcdFx0eDogMC41XG5cdFx0XHR5OiAwLjVcblx0XHRcdHdpZHRoOiAyOCwgaGVpZ2h0OiAyOFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAdGh1bWJUaW50Q29sb3JcblxuXHRcdFx0c2hhZG93MTpcblx0XHRcdFx0eTogM1xuXHRcdFx0XHRibHVyOiA4XG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xNSlcIlxuXHRcdFx0c2hhZG93Mjpcblx0XHRcdFx0eTogMVxuXHRcdFx0XHRibHVyOiAxXG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xNilcIlxuXHRcdFx0c2hhZG93Mzpcblx0XHRcdFx0eTogM1xuXHRcdFx0XHRibHVyOiAxXG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xMClcIlxuXG5cdFx0aWYgQGlzT25cblx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdFx0QHRodW1iLnN0YXRlU3dpdGNoIFwib25cIlxuXG5cblxuXHRcdEBvbkNsaWNrIC0+XG5cdFx0XHRAc2V0T24gIUBpc09uLCB0cnVlXG5cblxuXHRAZGVmaW5lIFwidGludENvbG9yXCIsXG5cdFx0Z2V0OiAtPiBAX3RpbnRDb2xvclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF90aW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaW50Q29sb3IoKVxuXHRAZGVmaW5lIFwidGh1bWJUaW50Q29sb3JcIixcblx0XHRnZXQ6IC0+IEBfdGh1bWJUaW50Q29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfdGh1bWJUaW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaHVtYigpXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IEBfaXNPblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9pc09uID0gdmFsdWVcblxuXHRzZXRPbjogKHN3aXRjaE9uLCBhbmltYXRlZCkgLT5cblx0XHRAaXNPbiA9IHN3aXRjaE9uXG5cdFx0YW5pbWF0ZWQgPSBhbmltYXRlZCA/IHRydWVcblxuXHRcdGlmIEBpc09uXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwib25cIlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSBcIm9uXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRlbHNlXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcImRlZmF1bHRcIlxuXG5cdFx0QGVtaXQgRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlLCBAaXNPblxuXG5cblx0X3VwZGF0ZVRpbnRDb2xvcjogLT5cblx0XHRpZiBAYmFzZVxuXHRcdFx0QGJhc2Uuc3RhdGVzLm9uLnNoYWRvd0NvbG9yID0gQHRpbnRDb2xvclxuXHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiIGlmIEBpc09uXG5cblx0X3VwZGF0ZVRodW1iOiAtPlxuXHRcdGlmIEB0aHVtYkZpbGwgdGhlbiBAdGh1bWJGaWxsLmJhY2tncm91bmRDb2xvciA9IEB0aHVtYlRpbnRDb2xvclxuXG5cdG9uVmFsdWVDaGFuZ2U6IChjYikgLT4gQG9uKEV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSwgY2IpXG5cblxuZXhwb3J0cy5pT1NTd2l0Y2ggPSBTd2l0Y2hcbiIsIiMjI1xuICAgICMgaU9TU2VnbWVudGVkQ29udHJvbFxuICAgIHtpT1NTZWdtZW50ZWRDb250cm9sfSA9IHJlcXVpcmUgXCJpT1NTZWdtZW50ZWRDb250cm9sXCJcblxuICAgIHNlZ0NvbnRyb2wgPSBuZXcgaU9TU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAjIE9QVElPTkFMXG4gICAgICAgIGl0ZW1zOiA8YXJyYXk+IChzdHJpbmdzIGZvciBlYWNoIHNlZ21lbnQgdGl0bGUpXG4gICAgICAgIHRpbnRDb2xvcjogPGNvbG9yPiAoZGVmYXVsdHMgdG8gaU9TIGJsdWUpXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogPGNvbG9yPiAoZGVmYXVsdHMgdG8gd2hpdGUpXG4gICAgICAgIHdpZHRoOiA8bnVtYmVyPiAoZGVmYXVsdHMgdG8gU2NyZWVuLndpZHRoIHdpdGggMTZkcCBwYWRkaW5nKVxuICAgICAgICBoZWlnaHQ6IDxudW1iZXI+IChkZWZhdWx0cyB0byAyOSlcbiAgICAgICAgaXNNb21lbnRhcnk6IDxib29sPiAoZG9uJ3QgaGlnaGxpZ2h0IGl0ZW1zIG9uIHRhcCksIGRlZmF1bHRzIHRvIGZhbHNlKVxuXG4gICAgc2VnQ29udHJvbC5zZXRTZWxlY3RlZCA8Ym9vbD4sIDxudW1iZXI+XG4gICAgICAgICMgaWYgYm9vbD10cnVlLCBzZWxlY3QsIG9yIGlmIGJvb2w9ZmFsc2UsIHVuc2VsZWN0IHRoZSBzZWdtZW50IGF0IGluZGV4IDxudW1iZXI+XG5cbiAgICBzZWdDb250cm9sLmluc2VydFNlZ21lbnQgPHN0cmluZz4sIDxudW1iZXI+IG9wdGlvbmFsXG4gICAgICAgICMgYWRkIGEgbmV3IHNlZ21lbnQgd2l0aCB0aGUgbmFtZSA8c3RyaW5nPlxuICAgICAgICAjIG9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgaW5kZXggdG8gaW5zZXJ0IHRoZSBuZXcgc2VnbWVudCBhdFxuICAgICAgICAjIGJ5IGRlZmF1bHQsIGluc2VydCBpbiB0aGUgbGFzdCBwb3N0aW9uXG5cbiAgICBzZWdDb250cm9sLnJlbW92ZVNlZ21lbnQgPG51bWJlcj5cbiAgICAgICAgIyByZW1vdmUgdGhlIHNlZ21lbnQgYXQgaW5kZXggPG51bWJlcj5cblxuICAgIHNlZ0NvbnRyb2wuc2V0VGl0bGUgPHN0cmluZz4sIDxudW1iZXI+XG4gICAgICAgICMgY2hhbmdlIHRoZSB0aXRsZSB0byA8c3RyaW5nPiBvZiB0aGUgc2VnbWVudCBhdCBpbmRleCA8bnVtYmVyPlxuXG4gICAgc2VnQ29udHJvbC5zZXRXaWR0aCA8bnVtYmVyPiwgPG51bWJlcj5cbiAgICAgICAgIyBoYXJkLXNldCB3aWR0aCBvZiBzZWdtZW50IGF0IHRoZSBzZWNvbmQgPG51bWJlcj4gaW5kZXggdG8gdGhlIGZpcnN0IDxudW1iZXI+XG5cbiAgICAjIE9ic2VydmUgdGhlIFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIgZXZlbnRcbiAgICBuYXZCYXIub24gXCJjaGFuZ2U6Y3VycmVudFNlZ21lbnRcIiwgKGN1cnJlbnRTZWdtZW50LCBsYXN0U2VnbWVudCkgLT5cblxuIyMjXG5cblxuY2xhc3MgZXhwb3J0cy5pT1NTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgTGF5ZXJcblxuICAgIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblxuICAgICAgICBASFBBRERJTkcgPSAxNlxuICAgICAgICBASEVJR0hUID0gMjlcblxuICAgICAgICBvcHRpb25zID0gXy5kZWZhdWx0cyB7fSwgb3B0aW9ucyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICAgICAgdGludENvbG9yOiBcIiMwMDdBRkZcIlxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgd2lkdGg6IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgICAgICBoZWlnaHQ6IEBIRUlHSFRcbiAgICAgICAgICAgIHg6IEBIUEFERElOR1xuICAgICAgICAgICAgaXNNb21lbnRhcnk6IGZhbHNlXG4gICAgICAgICAgICBjbGlwOiB0cnVlXG5cbiAgICAgICAgc3VwZXIgb3B0aW9uc1xuXG4gICAgICAgIEB0aW50Q29sb3IgPSBvcHRpb25zLnRpbnRDb2xvclxuICAgICAgICBAaXNNb21lbnRhcnkgPSBvcHRpb25zLmlzTW9tZW50YXJ5XG4gICAgICAgIEBib3JkZXJXaWR0aCA9IDFcbiAgICAgICAgQGJvcmRlclJhZGl1cyA9IDRcblxuICAgICAgICBAX2JhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yXG4gICAgICAgIEBfc2VnbWVudHMgPSBbXVxuICAgICAgICBmb3IgaXRlbSBpbiBvcHRpb25zLml0ZW1zXG4gICAgICAgICAgICBAX2FkZFNlZ21lbnQgaXRlbVxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcbiAgICAgICAgQF90b3VjaERvd24gPSBmYWxzZVxuXG4gICAgX3NlZ21lbnRGb3JFdmVudDogKGV2ZW50KSAtPlxuICAgICAgICAjIFRvdWNoTW92ZSBkb2Vzbid0IHdvcmsgdGhlIHNhbWUgb24gbW9iaWxlLCBzbyBkbyB0aGUgaGl0IHRlc3Rpbmcgb3Vyc2VsdmVzXG4gICAgICAgIHRvdWNoRXZlbnQgPSBFdmVudHMudG91Y2hFdmVudChldmVudClcbiAgICAgICAgcG9pbnQgPSB7eDp0b3VjaEV2ZW50LmNsaWVudFgsIHk6dG91Y2hFdmVudC5jbGllbnRZfVxuICAgICAgICBwb2ludCA9IFV0aWxzLmNvbnZlcnRQb2ludChwb2ludCwgdW5kZWZpbmVkLCBALCB0cnVlKVxuICAgICAgICBmb3IgYUxheWVyIGluIEBjaGlsZHJlblxuICAgICAgICAgICAgcmV0dXJuIGFMYXllciBpZiBVdGlscy5wb2ludEluRnJhbWUocG9pbnQsIGFMYXllci5mcmFtZSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgX2FkZFNlZ21lbnQ6ICh0aXRsZSwgaW5kZXgpIC0+XG4gICAgICAgIHNlZ21lbnQgPSBuZXcgTGF5ZXJcbiAgICAgICAgICAgIGhlaWdodDogQGhlaWdodFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBAX2JhY2tncm91bmRDb2xvclxuICAgICAgICAgICAgcGFyZW50OiBAXG4gICAgICAgICAgICBuYW1lOiBcIi5TZWdtZW50XCIrQF9zZWdtZW50cy5sZW5ndGhcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hTdGFydCAoZXZlbnQsIGxheWVyKSA9PlxuICAgICAgICAgICAgQF90b3VjaERvd24gPSB0cnVlXG4gICAgICAgICAgICBFdmVudHMud3JhcChkb2N1bWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcInRhcGVuZFwiLCBAX3RvdWNoRW5kKVxuICAgICAgICAgICAgcmV0dXJuIGlmIGxheWVyIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgICAgICBsYXllci5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoQF90aW50Q29sb3IpLmFscGhhKC4xKVxuXG4gICAgICAgIHNlZ21lbnQub25Ub3VjaE1vdmUgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIGxheWVyID0gQF9zZWdtZW50Rm9yRXZlbnQgZXZlbnRcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyB1bmRlZmluZWRcblxuICAgICAgICAgICAgQF91bnNlbGVjdEFsbCgpXG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgICAgIGlmIEBfdG91Y2hEb3duIHRoZW4gbGF5ZXIuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKEBfdGludENvbG9yKS5hbHBoYSguMSlcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hFbmQgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIGxheWVyID0gQF9zZWdtZW50Rm9yRXZlbnQgZXZlbnRcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyB1bmRlZmluZWRcblxuICAgICAgICAgICAgQF9zZWxlY3RJdGVtIGxheWVyXG5cbiAgICAgICAgdGl0bGVUZXh0ID0gbmV3IFRleHRMYXllclxuICAgICAgICAgICAgdGV4dDogdGl0bGVcbiAgICAgICAgICAgIHBhcmVudDogc2VnbWVudFxuICAgICAgICAgICAgbmFtZTogXCIuTGFiZWxcIlxuICAgICAgICAgICAgY29sb3I6IEBfdGludENvbG9yXG4gICAgICAgICAgICBmb250U2l6ZTogMTdcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMFxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiXG4gICAgICAgICAgICB3aWR0aDogc2VnbWVudC53aWR0aFxuICAgICAgICBzZWdtZW50LnRpdGxlID0gdGl0bGVcbiAgICAgICAgc2VnbWVudC5sYWJlbCA9IHRpdGxlVGV4dFxuICAgICAgICB0aXRsZVRleHQuZm9udFNpemUgPSAxM1xuXG4gICAgICAgIGlmIGluZGV4P1xuICAgICAgICAgICAgQF9zZWdtZW50cy5zcGxpY2UgaW5kZXgsIDAsIHNlZ21lbnRcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF9zZWdtZW50cy5wdXNoIHNlZ21lbnRcblxuICAgIF90b3VjaEVuZDogKGV2ZW50LCBsYXllcik9PlxuICAgICAgICBAX3RvdWNoRG93biA9IGZhbHNlXG4gICAgICAgIEBfdW5zZWxlY3RBbGwoKVxuXG4gICAgX2xheW91dFNlZ21lbnRzOiAoKS0+XG4gICAgICAgIGZvciBzZWdtZW50LCBpIGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgIHNlZ21lbnQuaW5kZXggPSBpICMgcGFzc2VkIGluIGV2ZW50IGhhbmRsZXIgaW4gY2FzZSBvZiByZS1sYXlvdXQgYWZ0ZXIgaW5pdFxuICAgICAgICAgICAgIyBidHcgdGhlIGFiaWxpdHkgdG8gc2V0V2lkdGggb2YgYW55IHNlZ21lbnQgaXMgd2h5IHRoaXMgY29tcGxleGl0eSBleGlzdHNcbiAgICAgICAgICAgIHVubGVzcyBzZWdtZW50Lmhhc0V4cGxpY2l0V2lkdGg/XG4gICAgICAgICAgICAgICAgc2VnbWVudHNXaXRoRXhwbGljaXRXaWR0aCA9IF8uZmlsdGVyIEBfc2VnbWVudHMsIChvKS0+IHJldHVybiBvLmhhc0V4cGxpY2l0V2lkdGg/XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nV2lkdGggPSBAd2lkdGhcbiAgICAgICAgICAgICAgICBmb3Igd1NlZ21lbnQgaW4gc2VnbWVudHNXaXRoRXhwbGljaXRXaWR0aFxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmdXaWR0aCAtPSB3U2VnbWVudC53aWR0aFxuICAgICAgICAgICAgICAgIHNlZ21lbnQud2lkdGggPSBNYXRoLnJvdW5kIChyZW1haW5pbmdXaWR0aCAvIChAX3NlZ21lbnRzLmxlbmd0aCAtIHNlZ21lbnRzV2l0aEV4cGxpY2l0V2lkdGgubGVuZ3RoKSlcbiAgICAgICAgICAgIHNlZ21lbnQueCA9IG5leHRYXG4gICAgICAgICAgICBuZXh0WCA9IHNlZ21lbnQubWF4WFxuXG4gICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJpZ2h0ID0gXCIxcHggc29saWQgI3tAX3RpbnRDb2xvcn1cIlxuICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjBcIlxuICAgICAgICAgICAgaWYgaSBpcyAwIHRoZW4gc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweCAwIDAgNHB4XCJcbiAgICAgICAgICAgIGlmIGkgaXMgQF9zZWdtZW50cy5sZW5ndGgtMVxuICAgICAgICAgICAgICAgIGlmIEBfc2VnbWVudHMubGVuZ3RoIGlzIDFcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweFwiXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJpZ2h0ID0gXCJcIlxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMCA0cHggNHB4IDBcIlxuXG4gICAgICAgICAgICBsYWJlbCA9IHNlZ21lbnQuY2hpbGRyZW5bMF1cbiAgICAgICAgICAgIGxhYmVsPy53aWR0aCA9IHNlZ21lbnQud2lkdGhcbiAgICAgICAgICAgIGxhYmVsPy5jZW50ZXIoKVxuICAgICAgICBAd2lkdGggPSBuZXh0WFxuXG4gICAgX3NlbGVjdEl0ZW06IChpdGVtKS0+XG4gICAgICAgIHJldHVybiBpZiBpdGVtIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgIGlmICFAaXNNb21lbnRhcnlcbiAgICAgICAgICAgIG9sZEl0ZW0gPSBAX3NlbGVjdGVkSXRlbVxuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0gPSBpdGVtXG4gICAgICAgICAgICBAX3Vuc2VsZWN0SXRlbSBvbGRJdGVtXG4gICAgICAgICAgICBAX2hpZ2hsaWdodEl0ZW0gQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF91bnNlbGVjdEl0ZW0gaXRlbVxuICAgICAgICBAZW1pdChcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiLCBpdGVtLCBvbGRJdGVtKVxuXG4gICAgX3Vuc2VsZWN0QWxsOiAoKS0+XG4gICAgICAgIGZvciBzZWdtZW50IGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgIEBfcmVtb3ZlSGlnaGxpZ2h0IHNlZ21lbnQgdW5sZXNzIHNlZ21lbnQgaXMgQF9zZWxlY3RlZEl0ZW1cblxuICAgIF91bnNlbGVjdEl0ZW06IChpdGVtLCBpc0NsZWFyaW5nKS0+XG4gICAgICAgIGlmIGl0ZW0/IHRoZW4gQF9yZW1vdmVIaWdobGlnaHQgaXRlbVxuICAgICAgICBpZiBpc0NsZWFyaW5nXG4gICAgICAgICAgICBAX3NlbGVjdGVkSXRlbSA9IG51bGxcbiAgICAgICAgICAgIEBlbWl0KFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIsIG51bGwsIGl0ZW0pXG5cbiAgICBfaGlnaGxpZ2h0SXRlbTogKGl0ZW0pLT5cbiAgICAgICAgaXRlbS5iYWNrZ3JvdW5kQ29sb3IgPSBAX3RpbnRDb2xvclxuICAgICAgICBpdGVtLmxhYmVsLmNvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcblxuICAgIF9yZW1vdmVIaWdobGlnaHQ6IChpdGVtKS0+XG4gICAgICAgIGl0ZW0uYmFja2dyb3VuZENvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgaXRlbS5sYWJlbC5jb2xvciA9IEBfdGludENvbG9yXG5cbiAgICBfbGF5b3V0OiAoKS0+XG4gICAgICAgIEB3aWR0aCA9IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgQGRlZmluZSBcImlzTW9tZW50YXJ5XCIsXG4gICAgICAgIGdldDogLT4gQF9pc01vbWVudGFyeVxuICAgICAgICBzZXQ6ICh2YWx1ZSktPlxuICAgICAgICAgICAgQF9pc01vbWVudGFyeSA9IHZhbHVlXG5cbiAgICBAZGVmaW5lIFwidGludENvbG9yXCIsXG4gICAgICAgIGdldDogLT4gQF90aW50Q29sb3JcbiAgICAgICAgc2V0OiAodmFsdWUpLT5cbiAgICAgICAgICAgIEBib3JkZXJDb2xvciA9IHZhbHVlXG4gICAgICAgICAgICBpZiBAX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgZm9yIHNlZ21lbnQgaW4gQF9zZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmxhYmVsLmNvbG9yID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSaWdodCA9IFwiMXB4IHNvbGlkICN7dmFsdWV9XCJcbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtPy5iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZVxuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0/LmxhYmVsLmNvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgICAgIEBfdGludENvbG9yID0gdmFsdWVcblxuICAgIEBkZWZpbmUgXCJudW1iZXJPZlNlZ21lbnRzXCIsXG4gICAgICAgIGdldDogLT4gQF9zZWdtZW50cz8ubGVuZ3RoXG5cbiAgICBAZGVmaW5lIFwic2VsZWN0ZWRTZWdtZW50SW5kZXhcIixcbiAgICAgICAgZ2V0OiAtPiBAX3NlbGVjdGVkSXRlbT8uaW5kZXhcblxuICAgIEBkZWZpbmUgXCJhdXRvTGF5b3V0XCIsXG4gICAgICAgIGdldDogLT4gQF9hdXRvTGF5b3V0XG4gICAgICAgIHNldDogKHZhbHVlKS0+XG4gICAgICAgICAgICBAX2F1dG9MYXlvdXQgPSB2YWx1ZVxuXG4gICAgc2V0U2VsZWN0ZWQ6IChpc1NlbGVjdGVkLCBpbmRleCkgLT5cbiAgICAgICAgc2VnbWVudCA9IEBfc2VnbWVudHNbaW5kZXhdXG4gICAgICAgIGlmIGlzU2VsZWN0ZWQgdGhlbiBAX3NlbGVjdEl0ZW0gc2VnbWVudCBlbHNlIEBfdW5zZWxlY3RJdGVtIHNlZ21lbnQsIHRydWVcblxuICAgIGluc2VydFNlZ21lbnQ6ICh0aXRsZSwgaW5kZXgpIC0+XG4gICAgICAgIGlmICFpbmRleD8gdGhlbiBpbmRleCA9IEBfc2VnbWVudHMubGVuZ3RoXG4gICAgICAgIEBfYWRkU2VnbWVudCB0aXRsZSwgaW5kZXhcbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG5cbiAgICByZW1vdmVTZWdtZW50OiAoaW5kZXgpLT5cbiAgICAgICAgaWYgQF9zZWdtZW50c1tpbmRleF0/XG4gICAgICAgICAgICBAX3NlZ21lbnRzW2luZGV4XS5kZXN0cm95KClcbiAgICAgICAgICAgIEBfc2VnbWVudHMuc3BsaWNlIGluZGV4LCAxXG4gICAgICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIHJlbW92ZUFsbFNlZ21lbnRzOiAoKS0+XG4gICAgICAgIEByZW1vdmVTZWdtZW50IDAgd2hpbGUgQF9zZWdtZW50cy5sZW5ndGggPiAwXG5cbiAgICBzZXRUaXRsZTogKHRpdGxlLCBpbmRleCktPlxuICAgICAgICBAX3NlZ21lbnRzW2luZGV4XT8ubGFiZWwudGV4dCA9IHRpdGxlXG5cbiAgICBzZXRXaWR0aDogKHdpZHRoLCBpbmRleCktPlxuICAgICAgICBpZiB3aWR0aD9cbiAgICAgICAgICAgIEBfc2VnbWVudHNbaW5kZXhdPy5oYXNFeHBsaWNpdFdpZHRoID0gQF9zZWdtZW50c1tpbmRleF0/LndpZHRoID0gd2lkdGhcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF9zZWdtZW50c1tpbmRleF0/Lmhhc0V4cGxpY2l0V2lkdGggPSBudWxsXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgYXV0b1dpZHRoTGF5b3V0OiAoKS0+XG4gICAgICAgIEB3aWR0aCA9IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuIiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXG5cblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSBcIiNGRkZGRkZcIlxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG4iLCJcblxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIlxuIiwiIyBQcmV2aWV3IENvbXBvbmVudFxuXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG4jIHtQcmV2aWV3Q2xhc3MxfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MxXCJcbiMge1ByZXZpZXdDbGFzczR9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczRcIlxue1ByZXZpZXdDbGFzczV9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczVcIlxuXG4jIHByaW50IFByZXZpZXdcblxuXG5jbGFzcyBGaXhQcmV2aWV3RXhwb3J0IGV4dGVuZHMgUHJldmlld0NsYXNzNVxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3IGV4dGVuZHMgRml4UHJldmlld0V4cG9ydFxuXG5cblxuXG4jIE5hdGl2ZVxuXG5gd2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGZ1bmN0aW9uIChsYXllcikge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBsYXllclxufVxuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlTm9ybWFsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVOb3JtYWxcIiwgcmVjZWl2ZU1lc3NhZ2VOb3JtYWwsIGZhbHNlKTtcbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zb2xlLmxvZyhldmVudClcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvRmlsbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVGaWxsXCIsIHJlY2VpdmVNZXNzYWdlLCBmYWxzZSk7XG5gXG5cblxuXG5cblxuXG5cblxuXG4iLCJcbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG4iLCJcblxue1ByZXZpZXdDbGFzczR9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczRcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNSBleHRlbmRzIFByZXZpZXdDbGFzczRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGNvbnRyb2xQYW5lbExheWVyID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMDBcblx0XHRcdHg6IDIwLCB5OiA2MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Y29udHJvbFBhbmVsOiBjb250cm9sUGFuZWxMYXllclxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRjb250cm9sUGFuZWxMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ2NvbnRyb2xQYW5lbCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb250cm9sUGFuZWxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsID0gdmFsdWVcblx0XG5cdGFkZFNlY3Rpb246ICh0aXRsZSwgYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gcmV0dXJuXG5cdFx0ZWxzZVxuXHRcdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdFx0d2lkdGg6IDM2MFxuXHRcdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0XHRwYXJlbnQ6IEBjb250cm9sUGFuZWxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcdHNlY3Rpb25WaWV3LnkgPSAoQGNvbnRyb2xQYW5lbC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIDEwMFxuXG5cdFx0XHRAYWRkU2VjdGlvblRpdGxlKHRpdGxlKS5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXG5cdFx0XHRzdW1YID0gMFxuXHRcdFx0Zm9yIGFjdGlvbkl0ZW0sIGluZGV4IGluIGFjdGlvbkFycmF5XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkU2VjdGlvbkJ1dHRvbihhY3Rpb25JdGVtKVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOFxuXHRcdFx0XHRcblxuXG5cblxuXHRhZGRTZWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgcFYgPSA2LCBwSCA9IDkpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0cGFkZGluZzogeyB0b3A6IHBWLCBib3R0b206IHBWICsgMiwgbGVmdDogcEgsIHJpZ2h0OiBwSCB9XG5cdFx0XHRmb250U2l6ZTogMThcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDhcblx0XHRcblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBhY3Rpb25JdGVtLmhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyXG5cblxuXHRhZGRTZWN0aW9uVGl0bGU6ICh0aXRsZSA9IFwiSGVhZGVyIFRpdGxlXCIpID0+XG5cdFx0cmV0dXJuIG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IHRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IDEyXG5cblxuXG5cbiMgIyBFeGFtcGxlXG4jIHByZXZpZXcuYWRkU2VjdGlvbihcIkNob29zZSBCYWNrZ3JvdW5kXCIsIFtcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfSxcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfVxuIyBdKSIsIlxuXG57UHJldmlld0NsYXNzM30gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzM1wiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3M0IGV4dGVuZHMgUHJldmlld0NsYXNzM1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdFxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpXG5cdFx0XHRAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXG5cblx0XG5cdFxuXHR1cGRhdGVTY2FsZVN0YXRlOiAoKSA9PlxuXHRcdHNjYWxlWCA9IChDYW52YXMud2lkdGggLSAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKENhbnZhcy5oZWlnaHQgLSAxMTIpIC8gQGhlaWdodFxuXHRcdEBzdGF0ZXMuZmlsbC5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcblxuXG5cblxuXHRzZXREZXNrdG9wU2NhbGVNb2RlOiAoZm9yU3RhdGUgPSBcIm5vcm1hbFwiKSA9PlxuXG5cdFx0aW5pdFN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcInNjYWxlXCIsIFt7IHZhbHVlOiBcImZpbGxcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJub3JtYWxcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9XSwgZm9yU3RhdGUpXG5cblx0XHRzaG91bGRTaG93QnV0dG9uID0gQGdldFN0YXRlR2VuZXJpYyhcImJ1dHRvblwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgdHJ1ZSlcblxuXHRcdHNob3VsZFNob3dMb2dvID0gQGdldFN0YXRlR2VuZXJpYyhcImxvZ29cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCB0cnVlKVxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oaW5pdFN0YXRlKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdHByZXZpZXdEZXNrdG9wOiAoKSA9PlxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBcIjIyMlwiXG5cdFx0QGNyZWF0ZUJhcnMoKVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cblx0dXBkYXRlUHJldmlld09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsUHJldmlldyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cdFx0cHJldmlld0NhbnZhcyA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIyMjJcIiwgbmFtZTogXCIuaGlkZGVuUHJldmlld0NhbnZhc1wiXG5cdFx0XG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBvcmlnaW5ZID0gMC41XG5cdFx0QG9yaWdpblggPSAwLjVcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpXG5cdFx0XHRcblx0XHRcdGlmIEBzY3JlZW5TaXplKDM3NSwgNzY4KSBvciBAc2NyZWVuU2l6ZSgzOTAsIDc5Nykgb3IgQHNjcmVlblNpemUoNDE0LCA4NTIpIG9yIEBzY3JlZW5TaXplKDQyOCwgODc5KVxuXHRcdFx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNldEN1c3RvbVByZXZpZXcoKVxuXHRcdFxuIyBcdFx0ZWxzZSBpZiBAdmlldy53aWR0aCA9PSAzNjBcblx0XHRcdFxuXHRcdGVsc2Vcblx0XHRcdEBzZXRDdXN0b21QcmV2aWV3KClcblx0XG5cdFxuXG5cdHNldEN1c3RvbVByZXZpZXc6ICgpID0+XG5cdFx0QHkgPSBBbGlnbi50b3Bcblx0XHRAb3JpZ2luWSA9IDAuMVxuXHRcdFxuXHRcdEBzY2FsZSA9IChTY3JlZW4uaGVpZ2h0IC0gMTIwKSAvIEBoZWlnaHRcblx0XHRAYm9yZGVyUmFkaXVzID0gMjBcblx0XHRAY2xpcCA9IHRydWVcblxuXHRcdHRpcCA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDI0MCwgaGVpZ2h0OiA0NFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMudGlwXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtMzApXG5cdFx0XHRvcGFjaXR5OiAwLjVcblxuXG5cblxuXHQjIGdldFN0YXRlR2VuZXJpYzogKGtleSA9IFwic2NhbGVcIiwgcGFpcnMgPSBbeyB2YWx1ZTogLCByZXN1bHQ6IH0sIHt2YWx1ZTogLCByZXN1bHQ6IH1dLCBkZWZhdWx0UmVzdWx0ID0gXCJcIilcblx0Z2V0U3RhdGVHZW5lcmljOiAoc3RhdGVLZXkgPSBcInNjYWxlXCIsIHN0YXRlUGFpcnMgPSBbXSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpID0+XG5cdFx0cmVzdWx0ID0gZGVmYXVsdFJlc3VsdFxuXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXG5cdFx0XHRpZiBrZXlQYXJ0ID09IHN0YXRlS2V5XG5cdFx0XHRcdGZvciBwYWlyIGluIHN0YXRlUGFpcnNcblx0XHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gcGFpci52YWx1ZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm9rIFwiICsgXCIgI3twYWlyLnZhbHVlfVwiIFxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcGFpci5yZXN1bHRcblx0XHRcdFx0XHQjIGVsc2Vcblx0XHRcdFx0XHRcdCMgcHJpbnQgXCJub3QgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XG5cdFx0cmV0dXJuIHJlc3VsdFxuXHRcblx0XG5cdFxuXHRcbiIsIlxue0xvZ29MYXllcn0gPSByZXF1aXJlIFwiUHJldmlld19Mb2dvTGF5ZXJcIlxue1ByZXZpZXdDbGFzczJ9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczJcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMyBleHRlbmRzIFByZXZpZXdDbGFzczJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246ICgpID0+XG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlID0gbmV3IExheWVyXG5cdFx0XHRzaXplOiA0OCwgYm9yZGVyUmFkaXVzOiA0OFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogQWxpZ24uYm90dG9tKC0zMilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjEpXCJcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdHByZXZpZXc6IEBcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRidXR0b25TY2FsZS5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBidXR0b25TY2FsZVxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdHNpemU6IDI4LCBib3JkZXJSYWRpdXM6IDIyXG5cdFx0XHR4OiAxMCwgeTogMTBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUub25UYXAgLT5cblx0XHRcdGlmIEBzdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZmlsbFwiIHRoZW4gbmV4dFN0YXRlID0gXCJub3JtYWxcIiBlbHNlIG5leHRTdGF0ZSA9IFwiZmlsbFwiXG5cdFx0XHRAc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGNoaWxkcmVuWzBdLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjdXN0b20ucHJldmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplID0gKGJ1dHRvbkxheWVyKSA9PlxuXHRcdFx0bG9jYWxCdXR0b24gPSBidXR0b25MYXllclxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnggPSBBbGlnbi5yaWdodCgtMzIpXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci55ID0gQWxpZ24uYm90dG9tKC0zMilcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZShidXR0b25TY2FsZSlcblxuXG5cbiIsIlxuXG57UHJldmlld0NsYXNzMX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzMVwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3MyIGV4dGVuZHMgUHJldmlld0NsYXNzMVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblxuXG5cblx0IyBDcmVhdGUgQmFyc1xuXG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKHRlbXApID0+XG5cdFx0dGVtcC5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhciBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdGVtcCwgd2lkdGg6IHRlbXAud2lkdGggLSAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoNilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5jZW50ZXIoMSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW1wiZGFya1wiXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLmNlbnRlcigtMSlcblx0XHRcdGltYWdlOiBAYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW1wiZGFya1wiXVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtcImRhcmtcIl1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbXCJkYXJrXCJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbXCJkYXJrXCJdXG5cdFx0XG5cdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW1wiZGFya1wiXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW1wiZGFya1wiXVxuXHRcblx0XG5cdFxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoYmFyTGF5ZXIpID0+XG5cdFx0aG9tZUluZGljYXRvciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQGFzc2V0cy5jb2xvcltcImRhcmtcIl0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cdCIsIlxuXG5Bc3NldHMgPSByZXF1aXJlIFwiUHJldmlld19Bc3NldHNcIlxuXG5cbiMgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczEgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG5hbWU6IFwiUHJldmlld1wiXG5cblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdHZpc2libGU6IHRydWVcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2Vcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogXCIyMDoyMFwiXG5cdFx0XHRhc3NldHM6IEFzc2V0cy5kYXRhXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFxuXG5cdFxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXHRcblxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXG5cblx0QGRlZmluZSAnYXNzZXRzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0c1xuXG5cblxuXG5cblx0c2NyZWVuU2l6ZTogKHcsIGgpID0+IHJldHVybiBTY3JlZW4ud2lkdGggPT0gdyBhbmQgU2NyZWVuLmhlaWdodCA9PSBoXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB3aWR0aCA9PSB3IGFuZCBAaGVpZ2h0ID09IGhcblx0dmlld1dpZHRoOiAodykgPT4gcmV0dXJuIEB3aWR0aCA9PSB3XG5cblx0bG9nU2l6ZTogKCkgPT5cblx0XHRuZXcgVGV4dExheWVyIHsgdGV4dDogXCIje1NjcmVlbi53aWR0aH14I3tTY3JlZW4uaGVpZ2h0fVwiLCB5OiBBbGlnbi5jZW50ZXIgfVx0XG5cblxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblxuXG5cdFx0XG4iLCIjIyNcbkR5bmFtaWNMb2FkZXIgTW9kdWxlIGZvciBGcmFtZXJKU1xuaHR0cHM6Ly9naXRodWIuY29tL0x1Y2llbkxlZS9mcmFtZXItRHluYW1pY0xvYWRlci9cblxuQ3JlYXRlZCBieSBMdWNpZW4gTGVlIChAbHVjaWVuZGVlciksIEphbi4gMTJ0aCwgMjAxNlxuXG5EeW5hbWljTG9hZGVyIGJyYWVrcyB0aGUgYmFycmlhcnMgYmV0d2VlbiAzcmQgcGFydHkgd2ViIGRldmVsb3BtZW50IGxpYnJhcmllcyBhbmQgRnJhbWVyLCB3aGljaFxuaGVscCB5b3UgbG9hZCBsb2NhbCwgZXh0ZXJuYWwgc3R5bGVzaGVldHMgYW5kIHNjcmlwdHMgZHluYW1pY2FsbHkuXG5cbkFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uXG5cdHtEeW5hbWljTG9hZGVyfSA9IHJlcXVpcmUgJ0R5bmFtaWNMb2FkZXInXG5cbltMb2FkIG9uZSBmaWxlXVxuRHluYW1pY0xvYWRlci5hZGQoJ3NjcmlwdC5qcycpLnRoZW4oLT5cbiMgd2hlbiBzY3JpcHQuanMgbG9hZGVkIHN1Y2Nlc3NmdWxseVxuLi4uXG4pLmNhdGNoKC0+XG4jIHdoZW4gc2NyaXB0LmpzIGxvYWRlZCBmYWlsZWRcbi4uLlxuKVxuXG5bTG9hZCBmaWxlIGluIHNlcmllc11cbkR5bmFtaWNMb2FkZXIuc2VyaWVzKFsnb25lLmpzJywgJ3R3by5jc3MnLCAuLi5dKS50aGVuKCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWxDYWxsYmFjayApXG5cbltMb2FkIGZpbGUgaW4gcGFyYWxsZWxdXG5EeW5hbWljTG9hZGVyLnNlcmllcyhbJ29uZS5qcycsICd0d28uY3NzJywgLi4uXSkudGhlbiggc3VjY2Vzc0NhbGxiYWNrLCBmYWlsQ2FsbGJhY2sgKVxuXG4jIyNcblxuXG5cblxuY2xhc3MgZXhwb3J0cy5EeW5hbWljTG9hZGVyXG5cblx0IyBQcm9taXNpZnkgc2luZ2xlIGR5bmFtaWMgc2NyaXB0IGxvYWRpbmdcblx0QGFkZCA9ICh1cmwpIC0+XG5cdFx0cHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpIC0+XG5cdFx0XHRpZiB1cmwuc3Vic3RyKCB1cmwubGFzdEluZGV4T2YoJy4nKSApIGlzIFwiLmpzXCJcblx0XHRcdFx0IyBsb2FkIHNjcmlwdCBvbmNlXG5cdFx0XHRcdGxvYWRlZCA9IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLCAoZWxlbWVudCkgLT5cblx0XHRcdFx0XHRpZiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykgaXMgdXJsIHRoZW4gcmV0dXJuIGVsZW1lbnRcblx0XHRcdFx0aWYgbG9hZGVkIGlzbnQgdW5kZWZpbmVkIHRoZW4gcmV0dXJuIHJlc29sdmUgJ2hhdmUgbG9hZGVkJ1xuXG5cdFx0XHRcdGZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG5cdFx0XHRcdGZpbGUuc3JjID0gdXJsXG5cdFx0XHRlbHNlIGlmIHVybC5zdWJzdHIoIHVybC5sYXN0SW5kZXhPZignLicpICkgaXMgXCIuY3NzXCJcblx0XHRcdFx0IyBsb2FkIHN0eWxlIG9uY2Vcblx0XHRcdFx0bG9hZGVkID0gQXJyYXkucHJvdG90eXBlLmZpbmQuY2FsbCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpLCAoZWxlbWVudCkgLT5cblx0XHRcdFx0XHRpZiBlbGVtZW50LmdldEF0dHJpYnV0ZSgncmVsJykgaXMgdXJsIHRoZW4gcmV0dXJuIGVsZW1lbnRcblx0XHRcdFx0aWYgbG9hZGVkIGlzbnQgdW5kZWZpbmVkIHRoZW4gcmV0dXJuIHJlc29sdmUgJ2hhdmUgbG9hZGVkJ1xuXG5cdFx0XHRcdGZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdsaW5rJ1xuXHRcdFx0XHRmaWxlLnJlbCA9IFwic3R5bGVzaGVldFwiXG5cdFx0XHRcdGZpbGUuaHJlZiA9IHVybFxuXG5cdFx0XHRmaWxlLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnLCAtPlxuXHRcdFx0XHRyZXNvbHZlIGZpbGVcblx0XHRcdGZpbGUuYWRkRXZlbnRMaXN0ZW5lciAnZXJyb3InLCAtPlxuXHRcdFx0XHRyZWplY3QgZmlsZVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBmaWxlXG5cdFx0KVxuXG5cdFx0cmV0dXJuIHByb21pc2VcblxuXHQjIER5bmFtaWMgZmlsZSBsb2FkaW5nIGluIHNlcmllc1xuXHRAc2VyaWVzID0gKHVybHMpIC0+XG5cdFx0aWYgIUFycmF5LmlzQXJyYXkodXJscykgb3IgdXJscy5sZW5ndGggaXMgMCB0aGVuIHRocm93IFwiRVJST1I6IE5PIFVSTCBJTiBBUlJBWSFcIlxuXG5cdFx0cmV0dXJuIHVybHMucmVkdWNlKFxuXHRcdFx0KHByb21pc2UsIHVybCkgPT5cblx0XHRcdFx0cmV0dXJuIHByb21pc2UudGhlbiggPT4gQGFkZCh1cmwpIClcblx0XHRcdCxcblx0XHRcdFByb21pc2UucmVzb2x2ZSgpKVxuXG5cdCMgRHluYW1pYyBmaWxlIGxvYWRpbmcgaW4gcGFyYWxsZWxcblx0QHBhcmFsbGVsID0gKHVybHMpIC0+XG5cdFx0aWYgIUFycmF5LmlzQXJyYXkodXJscykgb3IgdXJscy5sZW5ndGggaXMgMCB0aGVuIHRocm93IFwiRVJST1I6IE5PIFVSTCBJTiBBUlJBWSFcIlxuXG5cdFx0UHJvbWlzZS5hbGwoXG5cdFx0XHR1cmxzLm1hcCggKHVybCkgPT5cblx0XHRcdFx0cmV0dXJuIEBhZGQodXJsKVxuXHRcdCkpIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFhQUE7O0FEQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDTSxPQUFPLENBQUM7OztFQUdiLGFBQUMsQ0FBQSxHQUFELEdBQU8sU0FBQyxHQUFEO0FBQ04sUUFBQTtJQUFBLE9BQUEsR0FBYyxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxNQUFWO0FBQ3JCLFVBQUE7TUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLENBQVksR0FBRyxDQUFDLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBWixDQUFBLEtBQXNDLEtBQXpDO1FBRUMsTUFBQSxHQUFTLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQXJCLENBQTBCLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixRQUE5QixDQUExQixFQUFtRSxTQUFDLE9B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
