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
      y: Align.top(-2),
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
      y: Align.top(-4.5),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9pT1NTd2l0Y2guY29mZmVlIiwiLi4vbW9kdWxlcy9pT1NTZWdtZW50ZWRDb250cm9sLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld19Mb2dvTGF5ZXIuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3X0Fzc2V0cy5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzNi5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczUuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3M0LmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzMy5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczIuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3MxLmNvZmZlZSIsIi4uL21vZHVsZXMvRHluYW1pY0xvYWRlci5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyNcblx0IyBpT1NTd2l0Y2hcblx0e2lPU1N3aXRjaH0gPSByZXF1aXJlIFwiaU9TU3dpdGNoXCJcblxuXHRzd2l0Y2ggPSBuZXcgaU9TU3dpdGNoXG5cdFx0aXNPbjogPGJvb2w+IGlzIHRoZSBzd2l0Y2ggaW4gdGhlIG9uIHBvc2l0aW9uIChkZWZhdWx0cyB0byBmYWxzZSlcblx0XHR0aW50Q29sb3I6IDxjb2xvcj4gdGhlIGNvbG9yIG9mIHRoZSBzd2l0Y2ggYmFja2dyb3VuZCB3aGVuIGlzT24gaXMgdHJ1ZSAoZGVmYXVsdHMgdG8gaU9TIGdyZWVuKVxuXHRcdHRodW1iVGludENvbG9yOiA8Y29sb3I+IHRoZSBjb2xvciBvZiB0aGUgc3dpdGNoIHRodW1iIChkZWZhdWx0cyB0byB3aGl0ZSlcblxuXHQjIE9ic2VydmUgdGhlIFwiRXZlbnRzLlZhbHVlQ2hhbmdlXCIgZXZlbnRcblx0c3dpdGNoLm9uVmFsdWVDaGFuZ2UgKHZhbHVlKSAtPlxuXG4jIyNcblxuaU9TS2l0Q29sb3JzID1cbiAgcmVkOiBuZXcgQ29sb3IoXCJGRjNCMzBcIilcbiAgZ3JlZW46IG5ldyBDb2xvcihcIjRDRDk2NFwiKVxuICBibHVlOiAgbmV3IENvbG9yKFwiMDA3QUZGXCIpXG4gIGJsYWNrOiBuZXcgQ29sb3IoXCIwMDBcIilcbiAgZ3JheTogbmV3IENvbG9yKFwiOEU4RTkzXCIpXG4gIGdyZXk6IG5ldyBDb2xvcihcIjhFOEU5M1wiKVxuICB3aGl0ZTogbmV3IENvbG9yKFwiZmZmXCIpXG4gIHRyYW5zcGFyZW50OiBuZXcgQ29sb3IoXCJ0cmFuc3BhcmVudFwiKVxuXG5cbkV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSA9IFwic3dpdGNoVmFsdWVDaGFuZ2VcIlxuY2xhc3MgU3dpdGNoIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdG9wdGlvbnMgPSBfLmRlZmF1bHRzIHt9LCBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDUxXG5cdFx0XHRoZWlnaHQ6IDMxXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlPU0tpdENvbG9ycy50cmFuc3BhcmVudFxuXG5cdFx0XHR0aW50Q29sb3I6IGlPU0tpdENvbG9ycy5ncmVlblxuXHRcdFx0dGh1bWJUaW50Q29sb3I6IGlPU0tpdENvbG9ycy53aGl0ZVxuXHRcdFx0aXNPbjogZmFsc2Vcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRyaW1Db2xvciA9IFwiRTVFNUVBXCJcblxuXHRcdEBiYXNlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5iYXNlXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlPU0tpdENvbG9ycy50cmFuc3BhcmVudFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMFxuXHRcdFx0Ym9yZGVyQ29sb3I6IHJpbUNvbG9yXG5cdFx0XHRib3JkZXJXaWR0aDogMS41XG5cblx0XHRcdHNoYWRvd0NvbG9yOiByaW1Db2xvclxuXHRcdFx0c2hhZG93VHlwZTogXCJpbm5lclwiXG5cblx0XHRAYmFzZS5zdGF0ZXMub24gPVxuXHRcdFx0Ym9yZGVyV2lkdGg6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiBAdGludENvbG9yXG5cdFx0XHRzaGFkb3dTcHJlYWQ6IDIwXG5cblx0XHRAYmFzZS5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdHRpbWU6IDAuNlxuXHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjc1KVxuXG5cdFx0QHRodW1iID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi50aHVtYlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyOSwgaGVpZ2h0OiAyOVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNC41XG5cdFx0XHR4OiAxXG5cdFx0XHRtaWRZOiBAaGVpZ2h0IC8gMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBpT1NLaXRDb2xvcnMudHJhbnNwYXJlbnRcblx0XHRcdGJvcmRlcldpZHRoOiAwLjVcblx0XHRcdGJvcmRlckNvbG9yOiBcInJnYmEoMCwwLDAsMC4wNClcIlxuXHRcdEB0aHVtYi5zdGF0ZXMub24gPVxuXHRcdFx0eDogMjFcblx0XHRAdGh1bWIuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHR0aW1lOiAwLjZcblx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC44KVxuXG5cdFx0QHRodW1iRmlsbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJ0aHVtYkZpbGxcIlxuXHRcdFx0cGFyZW50OiBAdGh1bWJcblx0XHRcdHg6IDAuNVxuXHRcdFx0eTogMC41XG5cdFx0XHR3aWR0aDogMjgsIGhlaWdodDogMjhcblx0XHRcdGJvcmRlclJhZGl1czogMTRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQHRodW1iVGludENvbG9yXG5cblx0XHRcdHNoYWRvdzE6XG5cdFx0XHRcdHk6IDNcblx0XHRcdFx0Ymx1cjogOFxuXHRcdFx0XHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTUpXCJcblx0XHRcdHNoYWRvdzI6XG5cdFx0XHRcdHk6IDFcblx0XHRcdFx0Ymx1cjogMVxuXHRcdFx0XHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTYpXCJcblx0XHRcdHNoYWRvdzM6XG5cdFx0XHRcdHk6IDNcblx0XHRcdFx0Ymx1cjogMVxuXHRcdFx0XHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTApXCJcblxuXHRcdGlmIEBpc09uXG5cdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcIm9uXCJcblxuXG5cblx0XHRAb25DbGljayAtPlxuXHRcdFx0QHNldE9uICFAaXNPbiwgdHJ1ZVxuXG5cblx0QGRlZmluZSBcInRpbnRDb2xvclwiLFxuXHRcdGdldDogLT4gQF90aW50Q29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfdGludENvbG9yID0gdmFsdWVcblx0XHRcdEBfdXBkYXRlVGludENvbG9yKClcblx0QGRlZmluZSBcInRodW1iVGludENvbG9yXCIsXG5cdFx0Z2V0OiAtPiBAX3RodW1iVGludENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX3RodW1iVGludENvbG9yID0gdmFsdWVcblx0XHRcdEBfdXBkYXRlVGh1bWIoKVxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiBAX2lzT25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfaXNPbiA9IHZhbHVlXG5cblx0c2V0T246IChzd2l0Y2hPbiwgYW5pbWF0ZWQpIC0+XG5cdFx0QGlzT24gPSBzd2l0Y2hPblxuXHRcdGFuaW1hdGVkID0gYW5pbWF0ZWQgPyB0cnVlXG5cblx0XHRpZiBAaXNPblxuXHRcdFx0aWYgYW5pbWF0ZWRcblx0XHRcdFx0QGJhc2UuYW5pbWF0ZSBcIm9uXCJcblx0XHRcdFx0QHRodW1iLmFuaW1hdGUgXCJvblwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0ZWxzZVxuXHRcdFx0aWYgYW5pbWF0ZWRcblx0XHRcdFx0QGJhc2UuYW5pbWF0ZSBcImRlZmF1bHRcIlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSBcImRlZmF1bHRcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcImRlZmF1bHRcIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVTd2l0Y2ggXCJkZWZhdWx0XCJcblxuXHRcdEBlbWl0IEV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSwgQGlzT25cblxuXG5cdF91cGRhdGVUaW50Q29sb3I6IC0+XG5cdFx0aWYgQGJhc2Vcblx0XHRcdEBiYXNlLnN0YXRlcy5vbi5zaGFkb3dDb2xvciA9IEB0aW50Q29sb3Jcblx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIiBpZiBAaXNPblxuXG5cdF91cGRhdGVUaHVtYjogLT5cblx0XHRpZiBAdGh1bWJGaWxsIHRoZW4gQHRodW1iRmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSBAdGh1bWJUaW50Q29sb3JcblxuXHRvblZhbHVlQ2hhbmdlOiAoY2IpIC0+IEBvbihFdmVudHMuU3dpdGNoVmFsdWVDaGFuZ2UsIGNiKVxuXG5cbmV4cG9ydHMuaU9TU3dpdGNoID0gU3dpdGNoXG4iLCIjIyNcbiAgICAjIGlPU1NlZ21lbnRlZENvbnRyb2xcbiAgICB7aU9TU2VnbWVudGVkQ29udHJvbH0gPSByZXF1aXJlIFwiaU9TU2VnbWVudGVkQ29udHJvbFwiXG5cbiAgICBzZWdDb250cm9sID0gbmV3IGlPU1NlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgIyBPUFRJT05BTFxuICAgICAgICBpdGVtczogPGFycmF5PiAoc3RyaW5ncyBmb3IgZWFjaCBzZWdtZW50IHRpdGxlKVxuICAgICAgICB0aW50Q29sb3I6IDxjb2xvcj4gKGRlZmF1bHRzIHRvIGlPUyBibHVlKVxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IDxjb2xvcj4gKGRlZmF1bHRzIHRvIHdoaXRlKVxuICAgICAgICB3aWR0aDogPG51bWJlcj4gKGRlZmF1bHRzIHRvIFNjcmVlbi53aWR0aCB3aXRoIDE2ZHAgcGFkZGluZylcbiAgICAgICAgaGVpZ2h0OiA8bnVtYmVyPiAoZGVmYXVsdHMgdG8gMjkpXG4gICAgICAgIGlzTW9tZW50YXJ5OiA8Ym9vbD4gKGRvbid0IGhpZ2hsaWdodCBpdGVtcyBvbiB0YXApLCBkZWZhdWx0cyB0byBmYWxzZSlcblxuICAgIHNlZ0NvbnRyb2wuc2V0U2VsZWN0ZWQgPGJvb2w+LCA8bnVtYmVyPlxuICAgICAgICAjIGlmIGJvb2w9dHJ1ZSwgc2VsZWN0LCBvciBpZiBib29sPWZhbHNlLCB1bnNlbGVjdCB0aGUgc2VnbWVudCBhdCBpbmRleCA8bnVtYmVyPlxuXG4gICAgc2VnQ29udHJvbC5pbnNlcnRTZWdtZW50IDxzdHJpbmc+LCA8bnVtYmVyPiBvcHRpb25hbFxuICAgICAgICAjIGFkZCBhIG5ldyBzZWdtZW50IHdpdGggdGhlIG5hbWUgPHN0cmluZz5cbiAgICAgICAgIyBvcHRpb25hbGx5IHNwZWNpZnkgdGhlIGluZGV4IHRvIGluc2VydCB0aGUgbmV3IHNlZ21lbnQgYXRcbiAgICAgICAgIyBieSBkZWZhdWx0LCBpbnNlcnQgaW4gdGhlIGxhc3QgcG9zdGlvblxuXG4gICAgc2VnQ29udHJvbC5yZW1vdmVTZWdtZW50IDxudW1iZXI+XG4gICAgICAgICMgcmVtb3ZlIHRoZSBzZWdtZW50IGF0IGluZGV4IDxudW1iZXI+XG5cbiAgICBzZWdDb250cm9sLnNldFRpdGxlIDxzdHJpbmc+LCA8bnVtYmVyPlxuICAgICAgICAjIGNoYW5nZSB0aGUgdGl0bGUgdG8gPHN0cmluZz4gb2YgdGhlIHNlZ21lbnQgYXQgaW5kZXggPG51bWJlcj5cblxuICAgIHNlZ0NvbnRyb2wuc2V0V2lkdGggPG51bWJlcj4sIDxudW1iZXI+XG4gICAgICAgICMgaGFyZC1zZXQgd2lkdGggb2Ygc2VnbWVudCBhdCB0aGUgc2Vjb25kIDxudW1iZXI+IGluZGV4IHRvIHRoZSBmaXJzdCA8bnVtYmVyPlxuXG4gICAgIyBPYnNlcnZlIHRoZSBcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiIGV2ZW50XG4gICAgbmF2QmFyLm9uIFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIsIChjdXJyZW50U2VnbWVudCwgbGFzdFNlZ21lbnQpIC0+XG5cbiMjI1xuXG5cbmNsYXNzIGV4cG9ydHMuaU9TU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIExheWVyXG5cbiAgICBjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cbiAgICAgICAgQEhQQURESU5HID0gMTZcbiAgICAgICAgQEhFSUdIVCA9IDI5XG5cbiAgICAgICAgb3B0aW9ucyA9IF8uZGVmYXVsdHMge30sIG9wdGlvbnMsXG4gICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgIHRpbnRDb2xvcjogXCIjMDA3QUZGXCJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4ud2lkdGggLSBASFBBRERJTkcqMlxuICAgICAgICAgICAgaGVpZ2h0OiBASEVJR0hUXG4gICAgICAgICAgICB4OiBASFBBRERJTkdcbiAgICAgICAgICAgIGlzTW9tZW50YXJ5OiBmYWxzZVxuICAgICAgICAgICAgY2xpcDogdHJ1ZVxuXG4gICAgICAgIHN1cGVyIG9wdGlvbnNcblxuICAgICAgICBAdGludENvbG9yID0gb3B0aW9ucy50aW50Q29sb3JcbiAgICAgICAgQGlzTW9tZW50YXJ5ID0gb3B0aW9ucy5pc01vbWVudGFyeVxuICAgICAgICBAYm9yZGVyV2lkdGggPSAxXG4gICAgICAgIEBib3JkZXJSYWRpdXMgPSA0XG5cbiAgICAgICAgQF9iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuICAgICAgICBAX3NlZ21lbnRzID0gW11cbiAgICAgICAgZm9yIGl0ZW0gaW4gb3B0aW9ucy5pdGVtc1xuICAgICAgICAgICAgQF9hZGRTZWdtZW50IGl0ZW1cbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG4gICAgICAgIEBfdG91Y2hEb3duID0gZmFsc2VcblxuICAgIF9zZWdtZW50Rm9yRXZlbnQ6IChldmVudCkgLT5cbiAgICAgICAgIyBUb3VjaE1vdmUgZG9lc24ndCB3b3JrIHRoZSBzYW1lIG9uIG1vYmlsZSwgc28gZG8gdGhlIGhpdCB0ZXN0aW5nIG91cnNlbHZlc1xuICAgICAgICB0b3VjaEV2ZW50ID0gRXZlbnRzLnRvdWNoRXZlbnQoZXZlbnQpXG4gICAgICAgIHBvaW50ID0ge3g6dG91Y2hFdmVudC5jbGllbnRYLCB5OnRvdWNoRXZlbnQuY2xpZW50WX1cbiAgICAgICAgcG9pbnQgPSBVdGlscy5jb252ZXJ0UG9pbnQocG9pbnQsIHVuZGVmaW5lZCwgQCwgdHJ1ZSlcbiAgICAgICAgZm9yIGFMYXllciBpbiBAY2hpbGRyZW5cbiAgICAgICAgICAgIHJldHVybiBhTGF5ZXIgaWYgVXRpbHMucG9pbnRJbkZyYW1lKHBvaW50LCBhTGF5ZXIuZnJhbWUpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcblxuICAgIF9hZGRTZWdtZW50OiAodGl0bGUsIGluZGV4KSAtPlxuICAgICAgICBzZWdtZW50ID0gbmV3IExheWVyXG4gICAgICAgICAgICBoZWlnaHQ6IEBoZWlnaHRcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgICAgIHBhcmVudDogQFxuICAgICAgICAgICAgbmFtZTogXCIuU2VnbWVudFwiK0Bfc2VnbWVudHMubGVuZ3RoXG5cbiAgICAgICAgc2VnbWVudC5vblRvdWNoU3RhcnQgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIEBfdG91Y2hEb3duID0gdHJ1ZVxuICAgICAgICAgICAgRXZlbnRzLndyYXAoZG9jdW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0YXBlbmRcIiwgQF90b3VjaEVuZClcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyBAX3NlbGVjdGVkSXRlbVxuICAgICAgICAgICAgbGF5ZXIuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKEBfdGludENvbG9yKS5hbHBoYSguMSlcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hNb3ZlIChldmVudCwgbGF5ZXIpID0+XG4gICAgICAgICAgICBsYXllciA9IEBfc2VnbWVudEZvckV2ZW50IGV2ZW50XG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgdW5kZWZpbmVkXG5cbiAgICAgICAgICAgIEBfdW5zZWxlY3RBbGwoKVxuICAgICAgICAgICAgcmV0dXJuIGlmIGxheWVyIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgICAgICBpZiBAX3RvdWNoRG93biB0aGVuIGxheWVyLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihAX3RpbnRDb2xvcikuYWxwaGEoLjEpXG5cbiAgICAgICAgc2VnbWVudC5vblRvdWNoRW5kIChldmVudCwgbGF5ZXIpID0+XG4gICAgICAgICAgICBsYXllciA9IEBfc2VnbWVudEZvckV2ZW50IGV2ZW50XG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgdW5kZWZpbmVkXG5cbiAgICAgICAgICAgIEBfc2VsZWN0SXRlbSBsYXllclxuXG4gICAgICAgIHRpdGxlVGV4dCA9IG5ldyBUZXh0TGF5ZXJcbiAgICAgICAgICAgIHRleHQ6IHRpdGxlXG4gICAgICAgICAgICBwYXJlbnQ6IHNlZ21lbnRcbiAgICAgICAgICAgIG5hbWU6IFwiLkxhYmVsXCJcbiAgICAgICAgICAgIGNvbG9yOiBAX3RpbnRDb2xvclxuICAgICAgICAgICAgZm9udFNpemU6IDE3XG4gICAgICAgICAgICBmb250V2VpZ2h0OiA0MDBcbiAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuICAgICAgICAgICAgd2lkdGg6IHNlZ21lbnQud2lkdGhcbiAgICAgICAgc2VnbWVudC50aXRsZSA9IHRpdGxlXG4gICAgICAgIHNlZ21lbnQubGFiZWwgPSB0aXRsZVRleHRcbiAgICAgICAgdGl0bGVUZXh0LmZvbnRTaXplID0gMTNcblxuICAgICAgICBpZiBpbmRleD9cbiAgICAgICAgICAgIEBfc2VnbWVudHMuc3BsaWNlIGluZGV4LCAwLCBzZWdtZW50XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBfc2VnbWVudHMucHVzaCBzZWdtZW50XG5cbiAgICBfdG91Y2hFbmQ6IChldmVudCwgbGF5ZXIpPT5cbiAgICAgICAgQF90b3VjaERvd24gPSBmYWxzZVxuICAgICAgICBAX3Vuc2VsZWN0QWxsKClcblxuICAgIF9sYXlvdXRTZWdtZW50czogKCktPlxuICAgICAgICBmb3Igc2VnbWVudCwgaSBpbiBAX3NlZ21lbnRzXG4gICAgICAgICAgICBzZWdtZW50LmluZGV4ID0gaSAjIHBhc3NlZCBpbiBldmVudCBoYW5kbGVyIGluIGNhc2Ugb2YgcmUtbGF5b3V0IGFmdGVyIGluaXRcbiAgICAgICAgICAgICMgYnR3IHRoZSBhYmlsaXR5IHRvIHNldFdpZHRoIG9mIGFueSBzZWdtZW50IGlzIHdoeSB0aGlzIGNvbXBsZXhpdHkgZXhpc3RzXG4gICAgICAgICAgICB1bmxlc3Mgc2VnbWVudC5oYXNFeHBsaWNpdFdpZHRoP1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzV2l0aEV4cGxpY2l0V2lkdGggPSBfLmZpbHRlciBAX3NlZ21lbnRzLCAobyktPiByZXR1cm4gby5oYXNFeHBsaWNpdFdpZHRoP1xuICAgICAgICAgICAgICAgIHJlbWFpbmluZ1dpZHRoID0gQHdpZHRoXG4gICAgICAgICAgICAgICAgZm9yIHdTZWdtZW50IGluIHNlZ21lbnRzV2l0aEV4cGxpY2l0V2lkdGhcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nV2lkdGggLT0gd1NlZ21lbnQud2lkdGhcbiAgICAgICAgICAgICAgICBzZWdtZW50LndpZHRoID0gTWF0aC5yb3VuZCAocmVtYWluaW5nV2lkdGggLyAoQF9zZWdtZW50cy5sZW5ndGggLSBzZWdtZW50c1dpdGhFeHBsaWNpdFdpZHRoLmxlbmd0aCkpXG4gICAgICAgICAgICBzZWdtZW50LnggPSBuZXh0WFxuICAgICAgICAgICAgbmV4dFggPSBzZWdtZW50Lm1heFhcblxuICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSaWdodCA9IFwiMXB4IHNvbGlkICN7QF90aW50Q29sb3J9XCJcbiAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIwXCJcbiAgICAgICAgICAgIGlmIGkgaXMgMCB0aGVuIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHggMCAwIDRweFwiXG4gICAgICAgICAgICBpZiBpIGlzIEBfc2VnbWVudHMubGVuZ3RoLTFcbiAgICAgICAgICAgICAgICBpZiBAX3NlZ21lbnRzLmxlbmd0aCBpcyAxXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIlxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSaWdodCA9IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjAgNHB4IDRweCAwXCJcblxuICAgICAgICAgICAgbGFiZWwgPSBzZWdtZW50LmNoaWxkcmVuWzBdXG4gICAgICAgICAgICBsYWJlbD8ud2lkdGggPSBzZWdtZW50LndpZHRoXG4gICAgICAgICAgICBsYWJlbD8uY2VudGVyKClcbiAgICAgICAgQHdpZHRoID0gbmV4dFhcblxuICAgIF9zZWxlY3RJdGVtOiAoaXRlbSktPlxuICAgICAgICByZXR1cm4gaWYgaXRlbSBpcyBAX3NlbGVjdGVkSXRlbVxuICAgICAgICBpZiAhQGlzTW9tZW50YXJ5XG4gICAgICAgICAgICBvbGRJdGVtID0gQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtID0gaXRlbVxuICAgICAgICAgICAgQF91bnNlbGVjdEl0ZW0gb2xkSXRlbVxuICAgICAgICAgICAgQF9oaWdobGlnaHRJdGVtIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBfdW5zZWxlY3RJdGVtIGl0ZW1cbiAgICAgICAgQGVtaXQoXCJjaGFuZ2U6Y3VycmVudFNlZ21lbnRcIiwgaXRlbSwgb2xkSXRlbSlcblxuICAgIF91bnNlbGVjdEFsbDogKCktPlxuICAgICAgICBmb3Igc2VnbWVudCBpbiBAX3NlZ21lbnRzXG4gICAgICAgICAgICBAX3JlbW92ZUhpZ2hsaWdodCBzZWdtZW50IHVubGVzcyBzZWdtZW50IGlzIEBfc2VsZWN0ZWRJdGVtXG5cbiAgICBfdW5zZWxlY3RJdGVtOiAoaXRlbSwgaXNDbGVhcmluZyktPlxuICAgICAgICBpZiBpdGVtPyB0aGVuIEBfcmVtb3ZlSGlnaGxpZ2h0IGl0ZW1cbiAgICAgICAgaWYgaXNDbGVhcmluZ1xuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0gPSBudWxsXG4gICAgICAgICAgICBAZW1pdChcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiLCBudWxsLCBpdGVtKVxuXG4gICAgX2hpZ2hsaWdodEl0ZW06IChpdGVtKS0+XG4gICAgICAgIGl0ZW0uYmFja2dyb3VuZENvbG9yID0gQF90aW50Q29sb3JcbiAgICAgICAgaXRlbS5sYWJlbC5jb2xvciA9IEBfYmFja2dyb3VuZENvbG9yXG5cbiAgICBfcmVtb3ZlSGlnaGxpZ2h0OiAoaXRlbSktPlxuICAgICAgICBpdGVtLmJhY2tncm91bmRDb2xvciA9IEBfYmFja2dyb3VuZENvbG9yXG4gICAgICAgIGl0ZW0ubGFiZWwuY29sb3IgPSBAX3RpbnRDb2xvclxuXG4gICAgX2xheW91dDogKCktPlxuICAgICAgICBAd2lkdGggPSBTY3JlZW4ud2lkdGggLSBASFBBRERJTkcqMlxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIEBkZWZpbmUgXCJpc01vbWVudGFyeVwiLFxuICAgICAgICBnZXQ6IC0+IEBfaXNNb21lbnRhcnlcbiAgICAgICAgc2V0OiAodmFsdWUpLT5cbiAgICAgICAgICAgIEBfaXNNb21lbnRhcnkgPSB2YWx1ZVxuXG4gICAgQGRlZmluZSBcInRpbnRDb2xvclwiLFxuICAgICAgICBnZXQ6IC0+IEBfdGludENvbG9yXG4gICAgICAgIHNldDogKHZhbHVlKS0+XG4gICAgICAgICAgICBAYm9yZGVyQ29sb3IgPSB2YWx1ZVxuICAgICAgICAgICAgaWYgQF9zZWdtZW50c1xuICAgICAgICAgICAgICAgIGZvciBzZWdtZW50IGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5sYWJlbC5jb2xvciA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmlnaHQgPSBcIjFweCBzb2xpZCAje3ZhbHVlfVwiXG4gICAgICAgICAgICBAX3NlbGVjdGVkSXRlbT8uYmFja2dyb3VuZENvbG9yID0gdmFsdWVcbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtPy5sYWJlbC5jb2xvciA9IEBfYmFja2dyb3VuZENvbG9yXG4gICAgICAgICAgICBAX3RpbnRDb2xvciA9IHZhbHVlXG5cbiAgICBAZGVmaW5lIFwibnVtYmVyT2ZTZWdtZW50c1wiLFxuICAgICAgICBnZXQ6IC0+IEBfc2VnbWVudHM/Lmxlbmd0aFxuXG4gICAgQGRlZmluZSBcInNlbGVjdGVkU2VnbWVudEluZGV4XCIsXG4gICAgICAgIGdldDogLT4gQF9zZWxlY3RlZEl0ZW0/LmluZGV4XG5cbiAgICBAZGVmaW5lIFwiYXV0b0xheW91dFwiLFxuICAgICAgICBnZXQ6IC0+IEBfYXV0b0xheW91dFxuICAgICAgICBzZXQ6ICh2YWx1ZSktPlxuICAgICAgICAgICAgQF9hdXRvTGF5b3V0ID0gdmFsdWVcblxuICAgIHNldFNlbGVjdGVkOiAoaXNTZWxlY3RlZCwgaW5kZXgpIC0+XG4gICAgICAgIHNlZ21lbnQgPSBAX3NlZ21lbnRzW2luZGV4XVxuICAgICAgICBpZiBpc1NlbGVjdGVkIHRoZW4gQF9zZWxlY3RJdGVtIHNlZ21lbnQgZWxzZSBAX3Vuc2VsZWN0SXRlbSBzZWdtZW50LCB0cnVlXG5cbiAgICBpbnNlcnRTZWdtZW50OiAodGl0bGUsIGluZGV4KSAtPlxuICAgICAgICBpZiAhaW5kZXg/IHRoZW4gaW5kZXggPSBAX3NlZ21lbnRzLmxlbmd0aFxuICAgICAgICBAX2FkZFNlZ21lbnQgdGl0bGUsIGluZGV4XG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgcmVtb3ZlU2VnbWVudDogKGluZGV4KS0+XG4gICAgICAgIGlmIEBfc2VnbWVudHNbaW5kZXhdP1xuICAgICAgICAgICAgQF9zZWdtZW50c1tpbmRleF0uZGVzdHJveSgpXG4gICAgICAgICAgICBAX3NlZ21lbnRzLnNwbGljZSBpbmRleCwgMVxuICAgICAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG5cbiAgICByZW1vdmVBbGxTZWdtZW50czogKCktPlxuICAgICAgICBAcmVtb3ZlU2VnbWVudCAwIHdoaWxlIEBfc2VnbWVudHMubGVuZ3RoID4gMFxuXG4gICAgc2V0VGl0bGU6ICh0aXRsZSwgaW5kZXgpLT5cbiAgICAgICAgQF9zZWdtZW50c1tpbmRleF0/LmxhYmVsLnRleHQgPSB0aXRsZVxuXG4gICAgc2V0V2lkdGg6ICh3aWR0aCwgaW5kZXgpLT5cbiAgICAgICAgaWYgd2lkdGg/XG4gICAgICAgICAgICBAX3NlZ21lbnRzW2luZGV4XT8uaGFzRXhwbGljaXRXaWR0aCA9IEBfc2VnbWVudHNbaW5kZXhdPy53aWR0aCA9IHdpZHRoXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBfc2VnbWVudHNbaW5kZXhdPy5oYXNFeHBsaWNpdFdpZHRoID0gbnVsbFxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIGF1dG9XaWR0aExheW91dDogKCktPlxuICAgICAgICBAd2lkdGggPSBTY3JlZW4ud2lkdGggLSBASFBBRERJTkcqMlxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcbiIsIiMgTG9nb1xuXG5jbGFzcyBleHBvcnRzLkxvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKFwiRkZGXCIpXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG5cbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdFxuXG5cdFxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblxuXG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcblx0dGlwOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy90aXAucG5nXCJcbiIsIiMgUHJldmlldyBDb21wb25lbnRcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuIyB7UHJldmlld0NsYXNzMX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzMVwiXG4jIHtQcmV2aWV3Q2xhc3M0fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M0XCJcbiMge1ByZXZpZXdDbGFzczV9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczVcIlxue1ByZXZpZXdDbGFzczZ9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczZcIlxuXG4jIHByaW50IFByZXZpZXdcblxuXG5jbGFzcyBGaXhQcmV2aWV3RXhwb3J0IGV4dGVuZHMgUHJldmlld0NsYXNzNlxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3IGV4dGVuZHMgRml4UHJldmlld0V4cG9ydFxuXG5cblxuXG4jIE5hdGl2ZVxuXG5gd2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGZ1bmN0aW9uIChsYXllcikge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBsYXllclxufVxuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlTm9ybWFsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVOb3JtYWxcIiwgcmVjZWl2ZU1lc3NhZ2VOb3JtYWwsIGZhbHNlKTtcbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zb2xlLmxvZyhldmVudClcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvRmlsbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVGaWxsXCIsIHJlY2VpdmVNZXNzYWdlLCBmYWxzZSk7XG5gXG5cblxuXG5cbiMgcHJldmlldy5hZGRTZWN0aW9uKFwiU2VjdGlvbiBUaXRsZVwiLCBbXG4jIFx0eyB0aXRsZTogXCJUaXRsZTFcIiwgaGFuZGxlcjogaGFuZGxlcjEgfSxcbiMgXHR7IHRpdGxlOiBcIlRpdGxlMlwiLCBoYW5kbGVyOiBoYW5kbGVyMiB9LFxuIyBdKVxuXG5cblxuXG5cblxuXG4iLCJcbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG4iLCJcblxue1ByZXZpZXdDbGFzczV9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczVcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNiBleHRlbmRzIFByZXZpZXdDbGFzczVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRyZWVWaWV3TGF5ZXIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMzIwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcblx0XHR0cmVlVmlld0xheWVyLmNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdHRyZWVWaWV3TGF5ZXIubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cdFx0XHRcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0cmVlVmlldzogdHJlZVZpZXdMYXllclxuXHRcdFx0aW5kZW50OiAxXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyZWVWaWV3TGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICd0cmVlVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50cmVlVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50cmVlVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbmRlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5kZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluZGVudCA9IHZhbHVlXG5cdFxuXG5cblx0cHJpbnRUcmVlOiAoKSA9PlxuXHRcdHByaW50IEB2aWV3LmNoaWxkcmVuXG5cdFx0QHByaW50Tm9kZShAdmlldylcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXHRcdEB0cmVlVmlldy51cGRhdGVDb250ZW50KClcblx0XG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAdHJlZVZpZXcuY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQHRyZWVWaWV3LmhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdHRyZWVOb2RlTGF5ZXIub25UYXAgLT5cblx0XHRcdHByaW50IFwiI3tAY3VzdG9tLmxheWVyLm5hbWV9IHg6ICN7QGN1c3RvbS5sYXllci54fSB5OiAje0BjdXN0b20ubGF5ZXIueX0gc2l6ZTogI3tAY3VzdG9tLmxheWVyLndpZHRofXgje0BjdXN0b20ubGF5ZXIuaGVpZ2h0fVwiXG5cblx0XHRcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ICs9IDI4XG5cblxuXHRcdGlmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0bmV4dExldmVsID0gbGV2ZWwgKyAxXG5cdFx0XHRmb3IgY2hpbGROb2RlIGluIG5vZGUuY2hpbGRyZW5cblx0XHRcdFx0QHByaW50Tm9kZShjaGlsZE5vZGUsIG5leHRMZXZlbClcblx0XHRcbiIsIlxuXG57UHJldmlld0NsYXNzNH0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNFwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3M1IGV4dGVuZHMgUHJldmlld0NsYXNzNFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAzNjAsIGhlaWdodDogMTAwMFxuXHRcdFx0eDogMjAsIHk6IDYwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRjb250cm9sUGFuZWw6IGNvbnRyb2xQYW5lbExheWVyXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdGNvbnRyb2xQYW5lbExheWVyLnBhcmVudCA9IEBwYXJlbnRcblxuXHRcblx0QGRlZmluZSAnY29udHJvbFBhbmVsJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5jb250cm9sUGFuZWwgPSB2YWx1ZVxuXHRcblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiByZXR1cm5cblx0XHRlbHNlXG5cdFx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0XHR3aWR0aDogMzYwXG5cdFx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRyb2xQYW5lbFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFx0c2VjdGlvblZpZXcueSA9IChAY29udHJvbFBhbmVsLmNoaWxkcmVuLmxlbmd0aCAtIDEpICogMTAwXG5cblx0XHRcdEBhZGRTZWN0aW9uVGl0bGUodGl0bGUpLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cblx0XHRcdHN1bVggPSAwXG5cdFx0XHRmb3IgYWN0aW9uSXRlbSwgaW5kZXggaW4gYWN0aW9uQXJyYXlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRTZWN0aW9uQnV0dG9uKGFjdGlvbkl0ZW0pXG5cdFx0XHRcdHNlY3Rpb25CdXR0b24ucGFyZW50ID0gc2VjdGlvblZpZXdcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0XHRzdW1YICs9IHNlY3Rpb25CdXR0b24ud2lkdGggKyA4XG5cdFx0XHRcdFxuXG5cblxuXG5cdGFkZFNlY3Rpb25CdXR0b246IChhY3Rpb25JdGVtLCBwViA9IDYsIHBIID0gOSkgPT5cblx0XHRidXR0b25MYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IGFjdGlvbkl0ZW0udGl0bGVcblx0XHRcdHk6IDQyXG5cdFx0XHRwYWRkaW5nOiB7IHRvcDogcFYsIGJvdHRvbTogcFYgKyAyLCBsZWZ0OiBwSCwgcmlnaHQ6IHBIIH1cblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0XHRcdGJvcmRlclJhZGl1czogOFxuXHRcdFxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGFjdGlvbkl0ZW0uaGFuZGxlcilcblx0XHRyZXR1cm4gYnV0dG9uTGF5ZXJcblxuXG5cdGFkZFNlY3Rpb25UaXRsZTogKHRpdGxlID0gXCJIZWFkZXIgVGl0bGVcIikgPT5cblx0XHRyZXR1cm4gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogdGl0bGVcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdHBhZGRpbmc6XG5cdFx0XHRcdHRvcDogMTJcblxuXG5cblxuIyAjIEV4YW1wbGVcbiMgcHJldmlldy5hZGRTZWN0aW9uKFwiQ2hvb3NlIEJhY2tncm91bmRcIiwgW1xuIyBcdHsgdGl0bGU6IHRlc3QxLCBoYW5kbGVyOiB0ZXN0MiB9LFxuIyBcdHsgdGl0bGU6IHRlc3QxLCBoYW5kbGVyOiB0ZXN0MiB9XG4jIF0pIiwiXG5cbntQcmV2aWV3Q2xhc3MzfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MzXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczQgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0XG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKClcblx0XHRcdEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlXG5cdFx0XHRAdXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XHRAc2V0RGVza3RvcFNjYWxlTW9kZSgpXG5cdFx0XHRAcHJldmlld0Rlc2t0b3AoKVxuXHRcdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cblxuXHRcblx0XG5cdHVwZGF0ZVNjYWxlU3RhdGU6ICgpID0+XG5cdFx0c2NhbGVYID0gKENhbnZhcy53aWR0aCAtIDExMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoQ2FudmFzLmhlaWdodCAtIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlcy5maWxsLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFxuXG5cblxuXG5cdHNldERlc2t0b3BTY2FsZU1vZGU6IChmb3JTdGF0ZSA9IFwibm9ybWFsXCIpID0+XG5cblx0XHRpbml0U3RhdGUgPSBAZ2V0U3RhdGVHZW5lcmljKFwic2NhbGVcIiwgW3sgdmFsdWU6IFwiZmlsbFwiLCByZXN1bHQ6IFwiZmlsbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm5vcm1hbFwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IFwiZmlsbFwiIH1dLCBmb3JTdGF0ZSlcblxuXHRcdHNob3VsZFNob3dCdXR0b24gPSBAZ2V0U3RhdGVHZW5lcmljKFwiYnV0dG9uXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCB0cnVlKVxuXG5cdFx0c2hvdWxkU2hvd0xvZ28gPSBAZ2V0U3RhdGVHZW5lcmljKFwibG9nb1wiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIHRydWUpXG5cdFx0XG5cdFx0aWYgc2hvdWxkU2hvd0xvZ28gdGhlbiBAY3JlYXRlTG9nb0J1dHRvbigpXG5cdFx0aWYgc2hvdWxkU2hvd0J1dHRvbiB0aGVuIEBjcmVhdGVTY2FsZUJ1dHRvbihpbml0U3RhdGUpXG5cdFx0QHN0YXRlU3dpdGNoKGluaXRTdGF0ZSlcblx0XG5cdFxuXHRcblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IFwiMjIyXCJcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjIyMlwiLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZVxuXHRcdFx0QHNldEN1c3RvbVByZXZpZXcoKVxuXHRcblx0XG5cblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcFxuXHRcdEBvcmlnaW5ZID0gMC4xXG5cdFx0XG5cdFx0QHNjYWxlID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGhlaWdodFxuXHRcdEBib3JkZXJSYWRpdXMgPSAyMFxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cdFx0dGlwID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMjQwLCBoZWlnaHQ6IDQ0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy50aXBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC0zMClcblx0XHRcdG9wYWNpdHk6IDAuNVxuXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwib2sgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG57TG9nb0xheWVyfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0xvZ29MYXllclwiXG57UHJldmlld0NsYXNzMn0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzMlwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3MzIGV4dGVuZHMgUHJldmlld0NsYXNzMlxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XG5cdFxuXHRcblx0Y3JlYXRlTG9nb0J1dHRvbjogKCkgPT5cblx0XHRcblx0XHRvcGVuSG9tZUhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCJodHRwczovL3RpbGxsdXIuY29tXCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdGNyZWF0ZVNjYWxlQnV0dG9uOiAoZm9yU3RhdGUpID0+XG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUgPSBuZXcgTGF5ZXJcblx0XHRcdHNpemU6IDQ4LCBib3JkZXJSYWRpdXM6IDQ4XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzIpLCB5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMSlcIlxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0cHJldmlldzogQFxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJ1dHRvblNjYWxlXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0c2l6ZTogMjgsIGJvcmRlclJhZGl1czogMjJcblx0XHRcdHg6IDEwLCB5OiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25TY2FsZS5vblRhcCAtPlxuXHRcdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBuZXh0U3RhdGUgPSBcIm5vcm1hbFwiIGVsc2UgbmV4dFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY2hpbGRyZW5bMF0uc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGN1c3RvbS5wcmV2aWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUgPSAoYnV0dG9uTGF5ZXIpID0+XG5cdFx0XHRsb2NhbEJ1dHRvbiA9IGJ1dHRvbkxheWVyXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueCA9IEFsaWduLnJpZ2h0KC0zMilcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnkgPSBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplKGJ1dHRvblNjYWxlKVxuXG5cblxuIiwiXG5cbntQcmV2aWV3Q2xhc3MxfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MxXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczIgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MxXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c3RhdHVzQmFyOiBcImRhcmtcIiAjIGxpZ2h0L2Rhcmtcblx0XHRcdGhvbWVCYXI6IFwiZGFya1wiICMgbGlnaHQvZGFya1xuXG5cdFx0XHR2aXNpYmxlOiB0cnVlICMgdHJ1ZSAvIGZhbHNlXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlICMgdHJ1ZSAvIGZhbHNlXG5cblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogXCIyMDoyMFwiICMgZ2VuZXJhdGVkIGZyb20ganNvblxuXHRcdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnN0YXR1c0JhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaG9tZUJhciA9IHZhbHVlXG5cblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblxuXHQjIENyZWF0ZSBCYXJzXG5cblx0Y3JlYXRlQmFyczogKCkgPT5cblx0XHR0b3BCYXIgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFxuXHRcdGVsc2UgaWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcikgXG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAodGVtcCkgPT5cblx0XHR0ZW1wLmhlaWdodCA9IDMyXG5cdFx0XG5cdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyIG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB0ZW1wLCB3aWR0aDogdGVtcC53aWR0aCAtIDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLnRvcCg2KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgtMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wKC00LjUpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRob21lSW5kaWNhdG9yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bob21lQmFyXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0IiwiXG5cbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3X0Fzc2V0c1wiXG5cblxuIyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cblx0XG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cblx0QGRlZmluZSAnYXNzZXRzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0c1xuXG5cblxuXG5cblx0c2NyZWVuU2l6ZTogKHcsIGgpID0+IHJldHVybiBTY3JlZW4ud2lkdGggPT0gdyBhbmQgU2NyZWVuLmhlaWdodCA9PSBoXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB3aWR0aCA9PSB3IGFuZCBAaGVpZ2h0ID09IGhcblx0dmlld1dpZHRoOiAodykgPT4gcmV0dXJuIEB3aWR0aCA9PSB3XG5cblx0bG9nU2l6ZTogKCkgPT5cblx0XHRuZXcgVGV4dExheWVyIHsgdGV4dDogXCIje1NjcmVlbi53aWR0aH14I3tTY3JlZW4uaGVpZ2h0fVwiLCB5OiBBbGlnbi5jZW50ZXIgfVx0XG5cblxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblxuXG5cdFx0XG4iLCIjIyNcbkR5bmFtaWNMb2FkZXIgTW9kdWxlIGZvciBGcmFtZXJKU1xuaHR0cHM6Ly9naXRodWIuY29tL0x1Y2llbkxlZS9mcmFtZXItRHluYW1pY0xvYWRlci9cblxuQ3JlYXRlZCBieSBMdWNpZW4gTGVlIChAbHVjaWVuZGVlciksIEphbi4gMTJ0aCwgMjAxNlxuXG5EeW5hbWljTG9hZGVyIGJyYWVrcyB0aGUgYmFycmlhcnMgYmV0d2VlbiAzcmQgcGFydHkgd2ViIGRldmVsb3BtZW50IGxpYnJhcmllcyBhbmQgRnJhbWVyLCB3aGljaFxuaGVscCB5b3UgbG9hZCBsb2NhbCwgZXh0ZXJuYWwgc3R5bGVzaGVldHMgYW5kIHNjcmlwdHMgZHluYW1pY2FsbHkuXG5cbkFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uXG5cdHtEeW5hbWljTG9hZGVyfSA9IHJlcXVpcmUgJ0R5bmFtaWNMb2FkZXInXG5cbltMb2FkIG9uZSBmaWxlXVxuRHluYW1pY0xvYWRlci5hZGQoJ3NjcmlwdC5qcycpLnRoZW4oLT5cbiMgd2hlbiBzY3JpcHQuanMgbG9hZGVkIHN1Y2Nlc3NmdWxseVxuLi4uXG4pLmNhdGNoKC0+XG4jIHdoZW4gc2NyaXB0LmpzIGxvYWRlZCBmYWlsZWRcbi4uLlxuKVxuXG5bTG9hZCBmaWxlIGluIHNlcmllc11cbkR5bmFtaWNMb2FkZXIuc2VyaWVzKFsnb25lLmpzJywgJ3R3by5jc3MnLCAuLi5dKS50aGVuKCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWxDYWxsYmFjayApXG5cbltMb2FkIGZpbGUgaW4gcGFyYWxsZWxdXG5EeW5hbWljTG9hZGVyLnNlcmllcyhbJ29uZS5qcycsICd0d28uY3NzJywgLi4uXSkudGhlbiggc3VjY2Vzc0NhbGxiYWNrLCBmYWlsQ2FsbGJhY2sgKVxuXG4jIyNcblxuXG5cblxuY2xhc3MgZXhwb3J0cy5EeW5hbWljTG9hZGVyXG5cblx0IyBQcm9taXNpZnkgc2luZ2xlIGR5bmFtaWMgc2NyaXB0IGxvYWRpbmdcblx0QGFkZCA9ICh1cmwpIC0+XG5cdFx0cHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpIC0+XG5cdFx0XHRpZiB1cmwuc3Vic3RyKCB1cmwubGFzdEluZGV4T2YoJy4nKSApIGlzIFwiLmpzXCJcblx0XHRcdFx0IyBsb2FkIHNjcmlwdCBvbmNlXG5cdFx0XHRcdGxvYWRlZCA9IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpLCAoZWxlbWVudCkgLT5cblx0XHRcdFx0XHRpZiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykgaXMgdXJsIHRoZW4gcmV0dXJuIGVsZW1lbnRcblx0XHRcdFx0aWYgbG9hZGVkIGlzbnQgdW5kZWZpbmVkIHRoZW4gcmV0dXJuIHJlc29sdmUgJ2hhdmUgbG9hZGVkJ1xuXG5cdFx0XHRcdGZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG5cdFx0XHRcdGZpbGUuc3JjID0gdXJsXG5cdFx0XHRlbHNlIGlmIHVybC5zdWJzdHIoIHVybC5sYXN0SW5kZXhPZignLicpICkgaXMgXCIuY3NzXCJcblx0XHRcdFx0IyBsb2FkIHN0eWxlIG9uY2Vcblx0XHRcdFx0bG9hZGVkID0gQXJyYXkucHJvdG90eXBlLmZpbmQuY2FsbCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGluaycpLCAoZWxlbWVudCkgLT5cblx0XHRcdFx0XHRpZiBlbGVtZW50LmdldEF0dHJpYnV0ZSgncmVsJykgaXMgdXJsIHRoZW4gcmV0dXJuIGVsZW1lbnRcblx0XHRcdFx0aWYgbG9hZGVkIGlzbnQgdW5kZWZpbmVkIHRoZW4gcmV0dXJuIHJlc29sdmUgJ2hhdmUgbG9hZGVkJ1xuXG5cdFx0XHRcdGZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdsaW5rJ1xuXHRcdFx0XHRmaWxlLnJlbCA9IFwic3R5bGVzaGVldFwiXG5cdFx0XHRcdGZpbGUuaHJlZiA9IHVybFxuXG5cdFx0XHRmaWxlLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnLCAtPlxuXHRcdFx0XHRyZXNvbHZlIGZpbGVcblx0XHRcdGZpbGUuYWRkRXZlbnRMaXN0ZW5lciAnZXJyb3InLCAtPlxuXHRcdFx0XHRyZWplY3QgZmlsZVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBmaWxlXG5cdFx0KVxuXG5cdFx0cmV0dXJuIHByb21pc2VcblxuXHQjIER5bmFtaWMgZmlsZSBsb2FkaW5nIGluIHNlcmllc1xuXHRAc2VyaWVzID0gKHVybHMpIC0+XG5cdFx0aWYgIUFycmF5LmlzQXJyYXkodXJscykgb3IgdXJscy5sZW5ndGggaXMgMCB0aGVuIHRocm93IFwiRVJST1I6IE5PIFVSTCBJTiBBUlJBWSFcIlxuXG5cdFx0cmV0dXJuIHVybHMucmVkdWNlKFxuXHRcdFx0KHByb21pc2UsIHVybCkgPT5cblx0XHRcdFx0cmV0dXJuIHByb21pc2UudGhlbiggPT4gQGFkZCh1cmwpIClcblx0XHRcdCxcblx0XHRcdFByb21pc2UucmVzb2x2ZSgpKVxuXG5cdCMgRHluYW1pYyBmaWxlIGxvYWRpbmcgaW4gcGFyYWxsZWxcblx0QHBhcmFsbGVsID0gKHVybHMpIC0+XG5cdFx0aWYgIUFycmF5LmlzQXJyYXkodXJscykgb3IgdXJscy5sZW5ndGggaXMgMCB0aGVuIHRocm93IFwiRVJST1I6IE5PIFVSTCBJTiBBUlJBWSFcIlxuXG5cdFx0UHJvbWlzZS5hbGwoXG5cdFx0XHR1cmxzLm1hcCggKHVybCkgPT5cblx0XHRcdFx0cmV0dXJuIEBhZGQodXJsKVxuXHRcdCkpIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFjQUE7O0FEQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDTSxPQUFPLENBQUM7OztFQUdiLGFBQUMsQ0FBQSxHQUFELEdBQU8sU0FBQyxHQUFEO0FBQ04sUUFBQTtJQUFBLE9BQUEsR0FBYyxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxNQUFWO0FBQ3JCLFVBQUE7TUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLENBQVksR0FBRyxDQUFDLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBWixDQUFBLEtBQXNDLEtBQXpDO1FBRUMsTUFBQSxHQUFTLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQXJCLENBQTBCLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixRQUE5QixDQUExQixFQUFtRSxTQUFDLE9BQUQ7VUFDM0UsSUFBRyxPQUFPLENBQUMsWUFBUixDQUFxQixLQUFyQixDQUFBLEtBQStCLEdBQWxDO0FBQTJDLG1CQUFPLFFBQWxEOztRQUQyRSxDQUFuRTtRQUVULElBQUcsTUFBQSxLQUFZLE1BQWY7QUFBOEIsaUJBQU8sT0FBQSxDQUFRLGFBQVIsRUFBckM7O1FBRUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO1FBQ1AsSUFBSSxDQUFDLEdBQUwsR0FBVyxJ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
