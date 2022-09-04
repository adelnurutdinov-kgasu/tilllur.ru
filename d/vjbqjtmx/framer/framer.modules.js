require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PreviewComponentAssets":[function(require,module,exports){
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
var Assets, LogoLayer, getLogo, localColors, theme,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assets = require("PreviewComponentAssets");

Framer.Extras.Hints.disable();

localColors = {
  bg_color_onLight: "#eee",
  bg_color_onDark: "#222",
  content_color_onLight: "#000",
  content_color_onDark: "#FFF"
};

theme = {
  bg_color: localColors.bg_color_onDark,
  content_color: localColors.content_color_onDark
};

LogoLayer = (function(superClass) {
  extend(LogoLayer, superClass);

  function LogoLayer(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      opacity: 0.5,
      handler: null,
      svg: getLogo(localColors.content_color_onDark)
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
  selectedColor = withColor;
  return "<svg width=\"76\" height=\"32\" viewBox=\"0 0 76 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M2.79199 21.6C2.79199 21.168 2.90399 20.408 3.12799 19.32L4.39999 12.84H2.98399L3.07999 12.12C4.99999 11.544 6.88799 10.552 8.74399 9.14398H9.89599L9.31999 11.76H11.192L10.976 12.84H9.12799L7.90399 19.32C7.69599 20.312 7.59199 20.976 7.59199 21.312C7.59199 22.08 7.92799 22.544 8.59999 22.704C8.43999 23.248 8.07199 23.68 7.49599 24C6.91999 24.32 6.22399 24.48 5.40799 24.48C4.59199 24.48 3.95199 24.224 3.48799 23.712C3.02399 23.2 2.79199 22.496 2.79199 21.6Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M17.5599 22.68C17.0639 23.88 16.0239 24.48 14.4399 24.48C13.6239 24.48 12.9599 24.2 12.4479 23.64C12.0159 23.144 11.7999 22.648 11.7999 22.152C11.7999 20.856 12.0959 18.944 12.6879 16.416L13.5759 11.76L18.4479 11.28L16.9839 18.864C16.7119 20.048 16.5759 20.848 16.5759 21.264C16.5759 22.176 16.9039 22.648 17.5599 22.68ZM14.0079 8.42398C14.0079 7.79998 14.2639 7.31998 14.7759 6.98398C15.3039 6.64798 15.9439 6.47998 16.6959 6.47998C17.4479 6.47998 18.0479 6.64798 18.4959 6.98398C18.9599 7.31998 19.1919 7.79998 19.1919 8.42398C19.1919 9.04798 18.9359 9.51998 18.4239 9.83998C17.9279 10.16 17.3039 10.32 16.5519 10.32C15.7999 10.32 15.1839 10.16 14.7039 9.83998C14.2399 9.51998 14.0079 9.04798 14.0079 8.42398Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M26.0606 22.68C25.5646 23.88 24.5246 24.48 22.9406 24.48C22.1406 24.48 21.4846 24.2 20.9726 23.64C20.5566 23.176 20.3486 22.68 20.3486 22.152C20.3486 20.952 20.6286 19.04 21.1886 16.416L22.9406 7.19998L27.8126 6.71998L25.4846 18.864C25.2126 20.048 25.0766 20.848 25.0766 21.264C25.0766 22.176 25.4046 22.648 26.0606 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M34.5618 22.68C34.0658 23.88 33.0258 24.48 31.4418 24.48C30.6418 24.48 29.9858 24.2 29.4738 23.64C29.0578 23.176 28.8498 22.68 28.8498 22.152C28.8498 20.952 29.1298 19.04 29.6898 16.416L31.4418 7.19998L36.3138 6.71998L33.9858 18.864C33.7138 20.048 33.5778 20.848 33.5778 21.264C33.5778 22.176 33.9058 22.648 34.5618 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M43.0631 22.68C42.5671 23.88 41.5271 24.48 39.9431 24.48C39.1431 24.48 38.4871 24.2 37.9751 23.64C37.5591 23.176 37.3511 22.68 37.3511 22.152C37.3511 20.952 37.6311 19.04 38.1911 16.416L39.9431 7.19998L44.8151 6.71998L42.4871 18.864C42.2151 20.048 42.0791 20.848 42.0791 21.264C42.0791 22.176 42.4071 22.648 43.0631 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M53.5323 22.992C52.7643 23.984 51.4283 24.48 49.5243 24.48C48.5323 24.48 47.6763 24.184 46.9563 23.592C46.2363 22.984 45.8763 22.248 45.8763 21.384C45.8763 20.904 45.9003 20.544 45.9483 20.304L47.5563 11.76L52.4283 11.28L50.6763 20.544C50.6123 20.896 50.5803 21.176 50.5803 21.384C50.5803 22.312 50.8603 22.776 51.4203 22.776C52.0443 22.776 52.5803 22.352 53.0283 21.504C53.1723 21.232 53.2763 20.92 53.3403 20.568L55.0443 11.76L59.7723 11.28L57.9963 20.64C57.9483 20.88 57.9243 21.128 57.9243 21.384C57.9243 21.64 57.9963 21.912 58.1403 22.2C58.2843 22.472 58.5883 22.64 59.0523 22.704C58.9563 23.088 58.7403 23.408 58.4043 23.664C57.7003 24.208 56.9643 24.48 56.1963 24.48C55.4443 24.48 54.8443 24.344 54.3963 24.072C53.9483 23.8 53.6603 23.44 53.5323 22.992Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M69.2947 17.256C69.8707 16.232 70.1587 15.2 70.1587 14.16C70.1587 13.472 69.9107 13.128 69.4147 13.128C69.0307 13.128 68.6387 13.456 68.2387 14.112C67.8227 14.768 67.5507 15.52 67.4227 16.368L66.1747 24L61.2067 24.48L63.6547 11.76L67.6147 11.28L67.1827 13.704C67.9667 12.088 69.2387 11.28 70.9987 11.28C71.9267 11.28 72.6387 11.52 73.1347 12C73.6467 12.48 73.9027 13.216 73.9027 14.208C73.9027 15.184 73.5747 15.984 72.9187 16.608C72.2787 17.232 71.4067 17.544 70.3027 17.544C69.8227 17.544 69.4867 17.448 69.2947 17.256Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};

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

exports.Preview = (function(superClass) {
  extend(Preview, superClass);

  function Preview(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createClassicAndroidStatusBar = bind(this.createClassicAndroidStatusBar, this);
    this.createAndroidStatusBar = bind(this.createAndroidStatusBar, this);
    this.createBars = bind(this.createBars, this);
    this.logSize = bind(this.logSize, this);
    this.setCustomPreview = bind(this.setCustomPreview, this);
    this.previewMobile = bind(this.previewMobile, this);
    this.previewDesktop = bind(this.previewDesktop, this);
    this.updatePreviewOnResize = bind(this.updatePreviewOnResize, this);
    this.viewWidth = bind(this.viewWidth, this);
    this.viewSize = bind(this.viewSize, this);
    this.screenSize = bind(this.screenSize, this);
    this.scalePreview = bind(this.scalePreview, this);
    this.createScaleButton = bind(this.createScaleButton, this);
    this.createLogoButton = bind(this.createLogoButton, this);
    this.setDesktopScaleMode = bind(this.setDesktopScaleMode, this);
    this.updateScaleState = bind(this.updateScaleState, this);
    this.getLocationData = bind(this.getLocationData, this);
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    _.defaults(this.options, {
      view: null,
      prototypeCreationYear: "20:21",
      name: "Preview",
      backgroundColor: null,
      borderRadius: 42,
      forceAndroidBar: false,
      visible: true,
      topTheme: "dark",
      bottomTheme: "dark",
      assets: Assets.data
    });
    Preview.__super__.constructor.call(this, this.options);
    window.savePreviewMessageFramerObject(this);
    this.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
    this.scalePreview();
  }

  Preview.define('view', {
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

  Preview.define('visible', {
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

  Preview.define('topTheme', {
    get: function() {
      return this.options.topTheme;
    },
    set: function(value) {
      return this.options.topTheme = value;
    }
  });

  Preview.define('bottomTheme', {
    get: function() {
      return this.options.bottomTheme;
    },
    set: function(value) {
      return this.options.bottomTheme = value;
    }
  });

  Preview.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  Preview.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
    }
  });

  Preview.define('assets', {
    get: function() {
      return this.options.assets;
    }
  });

  Preview.prototype.animateStateToNormal = function() {
    return this.animate("normal", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  Preview.prototype.animateStateToFill = function() {
    return this.animate("fill", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  Preview.prototype.stateSwitchToNormal = function() {
    return this.stateSwitch("normal");
  };

  Preview.prototype.stateSwitchToFill = function() {
    return this.stateSwitch("fill");
  };

  Preview.prototype.getLocationData = function() {
    var i, item, keyPart, keyValuePair, len, queryArray, results, valuePart;
    queryArray = location.search.slice(1).split('&');
    results = [];
    for (i = 0, len = queryArray.length; i < len; i++) {
      item = queryArray[i];
      keyValuePair = item.split("=");
      keyPart = keyValuePair[0];
      valuePart = keyValuePair[1];
      if (keyPart === "scale") {
        if (valuePart === "fill") {
          results.push(this.stateSwitchToFill());
        } else if (valuePart === "normal") {
          results.push(this.stateSwitchToNormal());
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Preview.prototype.updateScaleState = function() {
    var scaleX, scaleY;
    scaleX = (Canvas.width - 112) / this.width;
    scaleY = (Canvas.height - 112) / this.height;
    return this.states.fill.scale = Math.min(scaleX, scaleY);
  };

  Preview.prototype.setDesktopScaleMode = function(forState) {
    var i, initState, item, j, k, keyPart, keyValuePair, len, len1, len2, ref, ref1, ref2, shouldShowButton, shouldShowLogo, valuePart;
    if (forState == null) {
      forState = "normal";
    }
    this.updateScaleState();
    initState = forState;
    ref = location.search.slice(1).split('&');
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      keyValuePair = item.split("=");
      keyPart = keyValuePair[0];
      valuePart = keyValuePair[1];
      if (keyPart === "scale") {
        if (valuePart === "fill") {
          initState = "fill";
        } else {
          initState = "normal";
        }
      }
    }
    shouldShowButton = true;
    ref1 = location.search.slice(1).split('&');
    for (j = 0, len1 = ref1.length; j < len1; j++) {
      item = ref1[j];
      keyValuePair = item.split("=");
      keyPart = keyValuePair[0];
      valuePart = keyValuePair[1];
      if (keyPart === "button") {
        if (valuePart === "off") {
          shouldShowButton = false;
        }
      }
    }
    shouldShowLogo = true;
    ref2 = location.search.slice(1).split('&');
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      item = ref2[k];
      keyValuePair = item.split("=");
      keyPart = keyValuePair[0];
      valuePart = keyValuePair[1];
      if (keyPart === "logo") {
        if (valuePart === "off") {
          shouldShowLogo = false;
        }
      }
    }
    if (shouldShowLogo) {
      this.createLogoButton(initState);
    }
    if (shouldShowButton) {
      this.createScaleButton(initState);
    }
    return this.stateSwitch(initState);
  };

  Preview.prototype.createLogoButton = function(forState) {
    var logoButton, openHomeHandler;
    if (Utils.isFramerStudio()) {
      return;
    }
    openHomeHandler = function() {
      return window.location = "https://tilllur.ru";
    };
    return logoButton = new LogoLayer({
      width: 76,
      height: 32,
      x: Align.left(32),
      y: Align.top(12),
      handler: openHomeHandler
    });
  };

  Preview.prototype.createScaleButton = function(forState) {
    var buttonInsideLayer, buttonScale, updateButtonOnResize;
    if (Utils.isFramerStudio()) {
      return;
    }
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

  Preview.prototype.scalePreview = function() {
    if (Utils.isMobile()) {
      return this.previewMobile();
    } else {
      this.setDesktopScaleMode();
      this.previewDesktop();
      return this.updatePreviewOnResize();
    }
  };

  Preview.prototype.screenSize = function(w, h) {
    return Screen.width === w && Screen.height === h;
  };

  Preview.prototype.viewSize = function(w, h) {
    return this.width === w && this.height === h;
  };

  Preview.prototype.viewWidth = function(w) {
    return this.width === w;
  };

  Preview.prototype.updatePreviewOnResize = function() {
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

  Preview.prototype.previewDesktop = function() {
    Canvas.backgroundColor = theme.bg_color;
    this.createBars();
    this.center();
    return this.clip = true;
  };

  Preview.prototype.previewMobile = function() {
    var previewCanvas;
    previewCanvas = new BackgroundLayer({
      backgroundColor: theme.content_color,
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

  Preview.prototype.setCustomPreview = function() {
    var sH;
    this.y = Align.top(-20);
    this.originY = 0;
    sH = (Screen.height + 40) / this.height;
    return this.scale = Math.min(Screen.width / this.width, sH);
  };

  Preview.prototype.logSize = function() {
    return new TextLayer({
      text: Screen.width + "x" + Screen.height,
      y: Align.center
    });
  };

  Preview.prototype.createBars = function() {
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

  Preview.prototype.createAndroidStatusBar = function(temp) {
    temp.height = 32;
    return this.createClassicAndroidStatusBar(new Layer({
      parent: temp,
      width: temp.width - 16,
      x: Align.center,
      y: Align.top(6),
      backgroundColor: null
    }));
  };

  Preview.prototype.createClassicAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 20;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.center(1),
      color: this.assets.color[this.topTheme],
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
      image: this.assets.androidStatusBarRightImage[this.topTheme]
    });
  };

  Preview.prototype.createClassicStatusBar = function(barLayer) {
    var classicCenterComponent, classicLeftComponent, classicRightomponent;
    barLayer.height = 20;
    classicLeftComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.left,
      image: this.assets.oldStatusBarLeftImage[this.topTheme]
    });
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: this.assets.color[this.topTheme],
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
      image: this.assets.oldStatusBarRightImage[this.topTheme]
    });
  };

  Preview.prototype.createNotchStatusBar = function(barLayer) {
    var notchCenterComponent, notchLeftComponent, notchRightComponent;
    barLayer.height = 44;
    notchLeftComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 21,
      x: Align.left(21),
      y: Align.top(12),
      color: this.assets.color[this.topTheme],
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
      image: this.assets.statusBarRightImage[this.topTheme]
    });
  };

  Preview.prototype.createHomeIndicator = function(barLayer) {
    var homeIndicator;
    return homeIndicator = new Layer({
      parent: barLayer,
      width: 135,
      height: 5,
      x: Align.center,
      y: Align.bottom(-8),
      backgroundColor: this.assets.color[this.bottomTheme],
      borderRadius: 20
    });
  };

  return Preview;

})(Layer);


},{"PreviewComponentAssets":"PreviewComponentAssets"}],"iOSSegmentedControl":[function(require,module,exports){

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjEtMDYtMTQgW3BwXSBZYW5kZXggQ2xpcHMg4oCTIFNjcm9sbCAyLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjEtMDYtMTQgW3BwXSBZYW5kZXggQ2xpcHMg4oCTIFNjcm9sbCAyLmZyYW1lci9tb2R1bGVzL2lPU1N3aXRjaC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIxLTA2LTE0IFtwcF0gWWFuZGV4IENsaXBzIOKAkyBTY3JvbGwgMi5mcmFtZXIvbW9kdWxlcy9pT1NTZWdtZW50ZWRDb250cm9sLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjEtMDYtMTQgW3BwXSBZYW5kZXggQ2xpcHMg4oCTIFNjcm9sbCAyLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMS0wNi0xNCBbcHBdIFlhbmRleCBDbGlwcyDigJMgU2Nyb2xsIDIuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyNcblx0IyBpT1NTd2l0Y2hcblx0e2lPU1N3aXRjaH0gPSByZXF1aXJlIFwiaU9TU3dpdGNoXCJcblxuXHRzd2l0Y2ggPSBuZXcgaU9TU3dpdGNoXG5cdFx0aXNPbjogPGJvb2w+IGlzIHRoZSBzd2l0Y2ggaW4gdGhlIG9uIHBvc2l0aW9uIChkZWZhdWx0cyB0byBmYWxzZSlcblx0XHR0aW50Q29sb3I6IDxjb2xvcj4gdGhlIGNvbG9yIG9mIHRoZSBzd2l0Y2ggYmFja2dyb3VuZCB3aGVuIGlzT24gaXMgdHJ1ZSAoZGVmYXVsdHMgdG8gaU9TIGdyZWVuKVxuXHRcdHRodW1iVGludENvbG9yOiA8Y29sb3I+IHRoZSBjb2xvciBvZiB0aGUgc3dpdGNoIHRodW1iIChkZWZhdWx0cyB0byB3aGl0ZSlcblxuXHQjIE9ic2VydmUgdGhlIFwiRXZlbnRzLlZhbHVlQ2hhbmdlXCIgZXZlbnRcblx0c3dpdGNoLm9uVmFsdWVDaGFuZ2UgKHZhbHVlKSAtPlxuXG4jIyNcblxuaU9TS2l0Q29sb3JzID1cbiAgcmVkOiBuZXcgQ29sb3IoXCJGRjNCMzBcIilcbiAgZ3JlZW46IG5ldyBDb2xvcihcIjRDRDk2NFwiKVxuICBibHVlOiAgbmV3IENvbG9yKFwiMDA3QUZGXCIpXG4gIGJsYWNrOiBuZXcgQ29sb3IoXCIwMDBcIilcbiAgZ3JheTogbmV3IENvbG9yKFwiOEU4RTkzXCIpXG4gIGdyZXk6IG5ldyBDb2xvcihcIjhFOEU5M1wiKVxuICB3aGl0ZTogbmV3IENvbG9yKFwiZmZmXCIpXG4gIHRyYW5zcGFyZW50OiBuZXcgQ29sb3IoXCJ0cmFuc3BhcmVudFwiKVxuXG5cbkV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSA9IFwic3dpdGNoVmFsdWVDaGFuZ2VcIlxuY2xhc3MgU3dpdGNoIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdG9wdGlvbnMgPSBfLmRlZmF1bHRzIHt9LCBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDUxXG5cdFx0XHRoZWlnaHQ6IDMxXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlPU0tpdENvbG9ycy50cmFuc3BhcmVudFxuXG5cdFx0XHR0aW50Q29sb3I6IGlPU0tpdENvbG9ycy5ncmVlblxuXHRcdFx0dGh1bWJUaW50Q29sb3I6IGlPU0tpdENvbG9ycy53aGl0ZVxuXHRcdFx0aXNPbjogZmFsc2Vcblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHRyaW1Db2xvciA9IFwiRTVFNUVBXCJcblxuXHRcdEBiYXNlID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5iYXNlXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IEB3aWR0aFxuXHRcdFx0aGVpZ2h0OiBAaGVpZ2h0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlPU0tpdENvbG9ycy50cmFuc3BhcmVudFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMFxuXHRcdFx0Ym9yZGVyQ29sb3I6IHJpbUNvbG9yXG5cdFx0XHRib3JkZXJXaWR0aDogMS41XG5cblx0XHRcdHNoYWRvd0NvbG9yOiByaW1Db2xvclxuXHRcdFx0c2hhZG93VHlwZTogXCJpbm5lclwiXG5cblx0XHRAYmFzZS5zdGF0ZXMub24gPVxuXHRcdFx0Ym9yZGVyV2lkdGg6IDBcblx0XHRcdHNoYWRvd0NvbG9yOiBAdGludENvbG9yXG5cdFx0XHRzaGFkb3dTcHJlYWQ6IDIwXG5cblx0XHRAYmFzZS5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdHRpbWU6IDAuNlxuXHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjc1KVxuXG5cdFx0QHRodW1iID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi50aHVtYlwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAyOSwgaGVpZ2h0OiAyOVxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNC41XG5cdFx0XHR4OiAxXG5cdFx0XHRtaWRZOiBAaGVpZ2h0IC8gMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBpT1NLaXRDb2xvcnMudHJhbnNwYXJlbnRcblx0XHRcdGJvcmRlcldpZHRoOiAwLjVcblx0XHRcdGJvcmRlckNvbG9yOiBcInJnYmEoMCwwLDAsMC4wNClcIlxuXHRcdEB0aHVtYi5zdGF0ZXMub24gPVxuXHRcdFx0eDogMjFcblx0XHRAdGh1bWIuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHR0aW1lOiAwLjZcblx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC44KVxuXG5cdFx0QHRodW1iRmlsbCA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJ0aHVtYkZpbGxcIlxuXHRcdFx0cGFyZW50OiBAdGh1bWJcblx0XHRcdHg6IDAuNVxuXHRcdFx0eTogMC41XG5cdFx0XHR3aWR0aDogMjgsIGhlaWdodDogMjhcblx0XHRcdGJvcmRlclJhZGl1czogMTRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQHRodW1iVGludENvbG9yXG5cblx0XHRcdHNoYWRvdzE6XG5cdFx0XHRcdHk6IDNcblx0XHRcdFx0Ymx1cjogOFxuXHRcdFx0XHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTUpXCJcblx0XHRcdHNoYWRvdzI6XG5cdFx0XHRcdHk6IDFcblx0XHRcdFx0Ymx1cjogMVxuXHRcdFx0XHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTYpXCJcblx0XHRcdHNoYWRvdzM6XG5cdFx0XHRcdHk6IDNcblx0XHRcdFx0Ymx1cjogMVxuXHRcdFx0XHRjb2xvcjogXCJyZ2JhKDAsMCwwLDAuMTApXCJcblxuXHRcdGlmIEBpc09uXG5cdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcIm9uXCJcblxuXG5cblx0XHRAb25DbGljayAtPlxuXHRcdFx0QHNldE9uICFAaXNPbiwgdHJ1ZVxuXG5cblx0QGRlZmluZSBcInRpbnRDb2xvclwiLFxuXHRcdGdldDogLT4gQF90aW50Q29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfdGludENvbG9yID0gdmFsdWVcblx0XHRcdEBfdXBkYXRlVGludENvbG9yKClcblx0QGRlZmluZSBcInRodW1iVGludENvbG9yXCIsXG5cdFx0Z2V0OiAtPiBAX3RodW1iVGludENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX3RodW1iVGludENvbG9yID0gdmFsdWVcblx0XHRcdEBfdXBkYXRlVGh1bWIoKVxuXG5cdEBkZWZpbmUgXCJpc09uXCIsXG5cdFx0Z2V0OiAtPiBAX2lzT25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfaXNPbiA9IHZhbHVlXG5cblx0c2V0T246IChzd2l0Y2hPbiwgYW5pbWF0ZWQpIC0+XG5cdFx0QGlzT24gPSBzd2l0Y2hPblxuXHRcdGFuaW1hdGVkID0gYW5pbWF0ZWQgPyB0cnVlXG5cblx0XHRpZiBAaXNPblxuXHRcdFx0aWYgYW5pbWF0ZWRcblx0XHRcdFx0QGJhc2UuYW5pbWF0ZSBcIm9uXCJcblx0XHRcdFx0QHRodW1iLmFuaW1hdGUgXCJvblwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0ZWxzZVxuXHRcdFx0aWYgYW5pbWF0ZWRcblx0XHRcdFx0QGJhc2UuYW5pbWF0ZSBcImRlZmF1bHRcIlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSBcImRlZmF1bHRcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcImRlZmF1bHRcIlxuXHRcdFx0XHRAdGh1bWIuc3RhdGVTd2l0Y2ggXCJkZWZhdWx0XCJcblxuXHRcdEBlbWl0IEV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSwgQGlzT25cblxuXG5cdF91cGRhdGVUaW50Q29sb3I6IC0+XG5cdFx0aWYgQGJhc2Vcblx0XHRcdEBiYXNlLnN0YXRlcy5vbi5zaGFkb3dDb2xvciA9IEB0aW50Q29sb3Jcblx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIiBpZiBAaXNPblxuXG5cdF91cGRhdGVUaHVtYjogLT5cblx0XHRpZiBAdGh1bWJGaWxsIHRoZW4gQHRodW1iRmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSBAdGh1bWJUaW50Q29sb3JcblxuXHRvblZhbHVlQ2hhbmdlOiAoY2IpIC0+IEBvbihFdmVudHMuU3dpdGNoVmFsdWVDaGFuZ2UsIGNiKVxuXG5cbmV4cG9ydHMuaU9TU3dpdGNoID0gU3dpdGNoXG4iLCIjIyNcbiAgICAjIGlPU1NlZ21lbnRlZENvbnRyb2xcbiAgICB7aU9TU2VnbWVudGVkQ29udHJvbH0gPSByZXF1aXJlIFwiaU9TU2VnbWVudGVkQ29udHJvbFwiXG5cbiAgICBzZWdDb250cm9sID0gbmV3IGlPU1NlZ21lbnRlZENvbnRyb2xcbiAgICAgICAgIyBPUFRJT05BTFxuICAgICAgICBpdGVtczogPGFycmF5PiAoc3RyaW5ncyBmb3IgZWFjaCBzZWdtZW50IHRpdGxlKVxuICAgICAgICB0aW50Q29sb3I6IDxjb2xvcj4gKGRlZmF1bHRzIHRvIGlPUyBibHVlKVxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IDxjb2xvcj4gKGRlZmF1bHRzIHRvIHdoaXRlKVxuICAgICAgICB3aWR0aDogPG51bWJlcj4gKGRlZmF1bHRzIHRvIFNjcmVlbi53aWR0aCB3aXRoIDE2ZHAgcGFkZGluZylcbiAgICAgICAgaGVpZ2h0OiA8bnVtYmVyPiAoZGVmYXVsdHMgdG8gMjkpXG4gICAgICAgIGlzTW9tZW50YXJ5OiA8Ym9vbD4gKGRvbid0IGhpZ2hsaWdodCBpdGVtcyBvbiB0YXApLCBkZWZhdWx0cyB0byBmYWxzZSlcblxuICAgIHNlZ0NvbnRyb2wuc2V0U2VsZWN0ZWQgPGJvb2w+LCA8bnVtYmVyPlxuICAgICAgICAjIGlmIGJvb2w9dHJ1ZSwgc2VsZWN0LCBvciBpZiBib29sPWZhbHNlLCB1bnNlbGVjdCB0aGUgc2VnbWVudCBhdCBpbmRleCA8bnVtYmVyPlxuXG4gICAgc2VnQ29udHJvbC5pbnNlcnRTZWdtZW50IDxzdHJpbmc+LCA8bnVtYmVyPiBvcHRpb25hbFxuICAgICAgICAjIGFkZCBhIG5ldyBzZWdtZW50IHdpdGggdGhlIG5hbWUgPHN0cmluZz5cbiAgICAgICAgIyBvcHRpb25hbGx5IHNwZWNpZnkgdGhlIGluZGV4IHRvIGluc2VydCB0aGUgbmV3IHNlZ21lbnQgYXRcbiAgICAgICAgIyBieSBkZWZhdWx0LCBpbnNlcnQgaW4gdGhlIGxhc3QgcG9zdGlvblxuXG4gICAgc2VnQ29udHJvbC5yZW1vdmVTZWdtZW50IDxudW1iZXI+XG4gICAgICAgICMgcmVtb3ZlIHRoZSBzZWdtZW50IGF0IGluZGV4IDxudW1iZXI+XG5cbiAgICBzZWdDb250cm9sLnNldFRpdGxlIDxzdHJpbmc+LCA8bnVtYmVyPlxuICAgICAgICAjIGNoYW5nZSB0aGUgdGl0bGUgdG8gPHN0cmluZz4gb2YgdGhlIHNlZ21lbnQgYXQgaW5kZXggPG51bWJlcj5cblxuICAgIHNlZ0NvbnRyb2wuc2V0V2lkdGggPG51bWJlcj4sIDxudW1iZXI+XG4gICAgICAgICMgaGFyZC1zZXQgd2lkdGggb2Ygc2VnbWVudCBhdCB0aGUgc2Vjb25kIDxudW1iZXI+IGluZGV4IHRvIHRoZSBmaXJzdCA8bnVtYmVyPlxuXG4gICAgIyBPYnNlcnZlIHRoZSBcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiIGV2ZW50XG4gICAgbmF2QmFyLm9uIFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIsIChjdXJyZW50U2VnbWVudCwgbGFzdFNlZ21lbnQpIC0+XG5cbiMjI1xuXG5cbmNsYXNzIGV4cG9ydHMuaU9TU2VnbWVudGVkQ29udHJvbCBleHRlbmRzIExheWVyXG5cbiAgICBjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cbiAgICAgICAgQEhQQURESU5HID0gMTZcbiAgICAgICAgQEhFSUdIVCA9IDI5XG5cbiAgICAgICAgb3B0aW9ucyA9IF8uZGVmYXVsdHMge30sIG9wdGlvbnMsXG4gICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgIHRpbnRDb2xvcjogXCIjMDA3QUZGXCJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjRkZGRkZGXCJcbiAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4ud2lkdGggLSBASFBBRERJTkcqMlxuICAgICAgICAgICAgaGVpZ2h0OiBASEVJR0hUXG4gICAgICAgICAgICB4OiBASFBBRERJTkdcbiAgICAgICAgICAgIGlzTW9tZW50YXJ5OiBmYWxzZVxuICAgICAgICAgICAgY2xpcDogdHJ1ZVxuXG4gICAgICAgIHN1cGVyIG9wdGlvbnNcblxuICAgICAgICBAdGludENvbG9yID0gb3B0aW9ucy50aW50Q29sb3JcbiAgICAgICAgQGlzTW9tZW50YXJ5ID0gb3B0aW9ucy5pc01vbWVudGFyeVxuICAgICAgICBAYm9yZGVyV2lkdGggPSAxXG4gICAgICAgIEBib3JkZXJSYWRpdXMgPSA0XG5cbiAgICAgICAgQF9iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuICAgICAgICBAX3NlZ21lbnRzID0gW11cbiAgICAgICAgZm9yIGl0ZW0gaW4gb3B0aW9ucy5pdGVtc1xuICAgICAgICAgICAgQF9hZGRTZWdtZW50IGl0ZW1cbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG4gICAgICAgIEBfdG91Y2hEb3duID0gZmFsc2VcblxuICAgIF9zZWdtZW50Rm9yRXZlbnQ6IChldmVudCkgLT5cbiAgICAgICAgIyBUb3VjaE1vdmUgZG9lc24ndCB3b3JrIHRoZSBzYW1lIG9uIG1vYmlsZSwgc28gZG8gdGhlIGhpdCB0ZXN0aW5nIG91cnNlbHZlc1xuICAgICAgICB0b3VjaEV2ZW50ID0gRXZlbnRzLnRvdWNoRXZlbnQoZXZlbnQpXG4gICAgICAgIHBvaW50ID0ge3g6dG91Y2hFdmVudC5jbGllbnRYLCB5OnRvdWNoRXZlbnQuY2xpZW50WX1cbiAgICAgICAgcG9pbnQgPSBVdGlscy5jb252ZXJ0UG9pbnQocG9pbnQsIHVuZGVmaW5lZCwgQCwgdHJ1ZSlcbiAgICAgICAgZm9yIGFMYXllciBpbiBAY2hpbGRyZW5cbiAgICAgICAgICAgIHJldHVybiBhTGF5ZXIgaWYgVXRpbHMucG9pbnRJbkZyYW1lKHBvaW50LCBhTGF5ZXIuZnJhbWUpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcblxuICAgIF9hZGRTZWdtZW50OiAodGl0bGUsIGluZGV4KSAtPlxuICAgICAgICBzZWdtZW50ID0gbmV3IExheWVyXG4gICAgICAgICAgICBoZWlnaHQ6IEBoZWlnaHRcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgICAgIHBhcmVudDogQFxuICAgICAgICAgICAgbmFtZTogXCIuU2VnbWVudFwiK0Bfc2VnbWVudHMubGVuZ3RoXG5cbiAgICAgICAgc2VnbWVudC5vblRvdWNoU3RhcnQgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIEBfdG91Y2hEb3duID0gdHJ1ZVxuICAgICAgICAgICAgRXZlbnRzLndyYXAoZG9jdW1lbnQpLmFkZEV2ZW50TGlzdGVuZXIoXCJ0YXBlbmRcIiwgQF90b3VjaEVuZClcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyBAX3NlbGVjdGVkSXRlbVxuICAgICAgICAgICAgbGF5ZXIuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKEBfdGludENvbG9yKS5hbHBoYSguMSlcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hNb3ZlIChldmVudCwgbGF5ZXIpID0+XG4gICAgICAgICAgICBsYXllciA9IEBfc2VnbWVudEZvckV2ZW50IGV2ZW50XG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgdW5kZWZpbmVkXG5cbiAgICAgICAgICAgIEBfdW5zZWxlY3RBbGwoKVxuICAgICAgICAgICAgcmV0dXJuIGlmIGxheWVyIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgICAgICBpZiBAX3RvdWNoRG93biB0aGVuIGxheWVyLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihAX3RpbnRDb2xvcikuYWxwaGEoLjEpXG5cbiAgICAgICAgc2VnbWVudC5vblRvdWNoRW5kIChldmVudCwgbGF5ZXIpID0+XG4gICAgICAgICAgICBsYXllciA9IEBfc2VnbWVudEZvckV2ZW50IGV2ZW50XG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgdW5kZWZpbmVkXG5cbiAgICAgICAgICAgIEBfc2VsZWN0SXRlbSBsYXllclxuXG4gICAgICAgIHRpdGxlVGV4dCA9IG5ldyBUZXh0TGF5ZXJcbiAgICAgICAgICAgIHRleHQ6IHRpdGxlXG4gICAgICAgICAgICBwYXJlbnQ6IHNlZ21lbnRcbiAgICAgICAgICAgIG5hbWU6IFwiLkxhYmVsXCJcbiAgICAgICAgICAgIGNvbG9yOiBAX3RpbnRDb2xvclxuICAgICAgICAgICAgZm9udFNpemU6IDE3XG4gICAgICAgICAgICBmb250V2VpZ2h0OiA0MDBcbiAgICAgICAgICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuICAgICAgICAgICAgd2lkdGg6IHNlZ21lbnQud2lkdGhcbiAgICAgICAgc2VnbWVudC50aXRsZSA9IHRpdGxlXG4gICAgICAgIHNlZ21lbnQubGFiZWwgPSB0aXRsZVRleHRcbiAgICAgICAgdGl0bGVUZXh0LmZvbnRTaXplID0gMTNcblxuICAgICAgICBpZiBpbmRleD9cbiAgICAgICAgICAgIEBfc2VnbWVudHMuc3BsaWNlIGluZGV4LCAwLCBzZWdtZW50XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBfc2VnbWVudHMucHVzaCBzZWdtZW50XG5cbiAgICBfdG91Y2hFbmQ6IChldmVudCwgbGF5ZXIpPT5cbiAgICAgICAgQF90b3VjaERvd24gPSBmYWxzZVxuICAgICAgICBAX3Vuc2VsZWN0QWxsKClcblxuICAgIF9sYXlvdXRTZWdtZW50czogKCktPlxuICAgICAgICBmb3Igc2VnbWVudCwgaSBpbiBAX3NlZ21lbnRzXG4gICAgICAgICAgICBzZWdtZW50LmluZGV4ID0gaSAjIHBhc3NlZCBpbiBldmVudCBoYW5kbGVyIGluIGNhc2Ugb2YgcmUtbGF5b3V0IGFmdGVyIGluaXRcbiAgICAgICAgICAgICMgYnR3IHRoZSBhYmlsaXR5IHRvIHNldFdpZHRoIG9mIGFueSBzZWdtZW50IGlzIHdoeSB0aGlzIGNvbXBsZXhpdHkgZXhpc3RzXG4gICAgICAgICAgICB1bmxlc3Mgc2VnbWVudC5oYXNFeHBsaWNpdFdpZHRoP1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzV2l0aEV4cGxpY2l0V2lkdGggPSBfLmZpbHRlciBAX3NlZ21lbnRzLCAobyktPiByZXR1cm4gby5oYXNFeHBsaWNpdFdpZHRoP1xuICAgICAgICAgICAgICAgIHJlbWFpbmluZ1dpZHRoID0gQHdpZHRoXG4gICAgICAgICAgICAgICAgZm9yIHdTZWdtZW50IGluIHNlZ21lbnRzV2l0aEV4cGxpY2l0V2lkdGhcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluaW5nV2lkdGggLT0gd1NlZ21lbnQud2lkdGhcbiAgICAgICAgICAgICAgICBzZWdtZW50LndpZHRoID0gTWF0aC5yb3VuZCAocmVtYWluaW5nV2lkdGggLyAoQF9zZWdtZW50cy5sZW5ndGggLSBzZWdtZW50c1dpdGhFeHBsaWNpdFdpZHRoLmxlbmd0aCkpXG4gICAgICAgICAgICBzZWdtZW50LnggPSBuZXh0WFxuICAgICAgICAgICAgbmV4dFggPSBzZWdtZW50Lm1heFhcblxuICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSaWdodCA9IFwiMXB4IHNvbGlkICN7QF90aW50Q29sb3J9XCJcbiAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIwXCJcbiAgICAgICAgICAgIGlmIGkgaXMgMCB0aGVuIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHggMCAwIDRweFwiXG4gICAgICAgICAgICBpZiBpIGlzIEBfc2VnbWVudHMubGVuZ3RoLTFcbiAgICAgICAgICAgICAgICBpZiBAX3NlZ21lbnRzLmxlbmd0aCBpcyAxXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI0cHhcIlxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSaWdodCA9IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjAgNHB4IDRweCAwXCJcblxuICAgICAgICAgICAgbGFiZWwgPSBzZWdtZW50LmNoaWxkcmVuWzBdXG4gICAgICAgICAgICBsYWJlbD8ud2lkdGggPSBzZWdtZW50LndpZHRoXG4gICAgICAgICAgICBsYWJlbD8uY2VudGVyKClcbiAgICAgICAgQHdpZHRoID0gbmV4dFhcblxuICAgIF9zZWxlY3RJdGVtOiAoaXRlbSktPlxuICAgICAgICByZXR1cm4gaWYgaXRlbSBpcyBAX3NlbGVjdGVkSXRlbVxuICAgICAgICBpZiAhQGlzTW9tZW50YXJ5XG4gICAgICAgICAgICBvbGRJdGVtID0gQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtID0gaXRlbVxuICAgICAgICAgICAgQF91bnNlbGVjdEl0ZW0gb2xkSXRlbVxuICAgICAgICAgICAgQF9oaWdobGlnaHRJdGVtIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBfdW5zZWxlY3RJdGVtIGl0ZW1cbiAgICAgICAgQGVtaXQoXCJjaGFuZ2U6Y3VycmVudFNlZ21lbnRcIiwgaXRlbSwgb2xkSXRlbSlcblxuICAgIF91bnNlbGVjdEFsbDogKCktPlxuICAgICAgICBmb3Igc2VnbWVudCBpbiBAX3NlZ21lbnRzXG4gICAgICAgICAgICBAX3JlbW92ZUhpZ2hsaWdodCBzZWdtZW50IHVubGVzcyBzZWdtZW50IGlzIEBfc2VsZWN0ZWRJdGVtXG5cbiAgICBfdW5zZWxlY3RJdGVtOiAoaXRlbSwgaXNDbGVhcmluZyktPlxuICAgICAgICBpZiBpdGVtPyB0aGVuIEBfcmVtb3ZlSGlnaGxpZ2h0IGl0ZW1cbiAgICAgICAgaWYgaXNDbGVhcmluZ1xuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0gPSBudWxsXG4gICAgICAgICAgICBAZW1pdChcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiLCBudWxsLCBpdGVtKVxuXG4gICAgX2hpZ2hsaWdodEl0ZW06IChpdGVtKS0+XG4gICAgICAgIGl0ZW0uYmFja2dyb3VuZENvbG9yID0gQF90aW50Q29sb3JcbiAgICAgICAgaXRlbS5sYWJlbC5jb2xvciA9IEBfYmFja2dyb3VuZENvbG9yXG5cbiAgICBfcmVtb3ZlSGlnaGxpZ2h0OiAoaXRlbSktPlxuICAgICAgICBpdGVtLmJhY2tncm91bmRDb2xvciA9IEBfYmFja2dyb3VuZENvbG9yXG4gICAgICAgIGl0ZW0ubGFiZWwuY29sb3IgPSBAX3RpbnRDb2xvclxuXG4gICAgX2xheW91dDogKCktPlxuICAgICAgICBAd2lkdGggPSBTY3JlZW4ud2lkdGggLSBASFBBRERJTkcqMlxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIEBkZWZpbmUgXCJpc01vbWVudGFyeVwiLFxuICAgICAgICBnZXQ6IC0+IEBfaXNNb21lbnRhcnlcbiAgICAgICAgc2V0OiAodmFsdWUpLT5cbiAgICAgICAgICAgIEBfaXNNb21lbnRhcnkgPSB2YWx1ZVxuXG4gICAgQGRlZmluZSBcInRpbnRDb2xvclwiLFxuICAgICAgICBnZXQ6IC0+IEBfdGludENvbG9yXG4gICAgICAgIHNldDogKHZhbHVlKS0+XG4gICAgICAgICAgICBAYm9yZGVyQ29sb3IgPSB2YWx1ZVxuICAgICAgICAgICAgaWYgQF9zZWdtZW50c1xuICAgICAgICAgICAgICAgIGZvciBzZWdtZW50IGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5sYWJlbC5jb2xvciA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmlnaHQgPSBcIjFweCBzb2xpZCAje3ZhbHVlfVwiXG4gICAgICAgICAgICBAX3NlbGVjdGVkSXRlbT8uYmFja2dyb3VuZENvbG9yID0gdmFsdWVcbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtPy5sYWJlbC5jb2xvciA9IEBfYmFja2dyb3VuZENvbG9yXG4gICAgICAgICAgICBAX3RpbnRDb2xvciA9IHZhbHVlXG5cbiAgICBAZGVmaW5lIFwibnVtYmVyT2ZTZWdtZW50c1wiLFxuICAgICAgICBnZXQ6IC0+IEBfc2VnbWVudHM/Lmxlbmd0aFxuXG4gICAgQGRlZmluZSBcInNlbGVjdGVkU2VnbWVudEluZGV4XCIsXG4gICAgICAgIGdldDogLT4gQF9zZWxlY3RlZEl0ZW0/LmluZGV4XG5cbiAgICBAZGVmaW5lIFwiYXV0b0xheW91dFwiLFxuICAgICAgICBnZXQ6IC0+IEBfYXV0b0xheW91dFxuICAgICAgICBzZXQ6ICh2YWx1ZSktPlxuICAgICAgICAgICAgQF9hdXRvTGF5b3V0ID0gdmFsdWVcblxuICAgIHNldFNlbGVjdGVkOiAoaXNTZWxlY3RlZCwgaW5kZXgpIC0+XG4gICAgICAgIHNlZ21lbnQgPSBAX3NlZ21lbnRzW2luZGV4XVxuICAgICAgICBpZiBpc1NlbGVjdGVkIHRoZW4gQF9zZWxlY3RJdGVtIHNlZ21lbnQgZWxzZSBAX3Vuc2VsZWN0SXRlbSBzZWdtZW50LCB0cnVlXG5cbiAgICBpbnNlcnRTZWdtZW50OiAodGl0bGUsIGluZGV4KSAtPlxuICAgICAgICBpZiAhaW5kZXg/IHRoZW4gaW5kZXggPSBAX3NlZ21lbnRzLmxlbmd0aFxuICAgICAgICBAX2FkZFNlZ21lbnQgdGl0bGUsIGluZGV4XG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgcmVtb3ZlU2VnbWVudDogKGluZGV4KS0+XG4gICAgICAgIGlmIEBfc2VnbWVudHNbaW5kZXhdP1xuICAgICAgICAgICAgQF9zZWdtZW50c1tpbmRleF0uZGVzdHJveSgpXG4gICAgICAgICAgICBAX3NlZ21lbnRzLnNwbGljZSBpbmRleCwgMVxuICAgICAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG5cbiAgICByZW1vdmVBbGxTZWdtZW50czogKCktPlxuICAgICAgICBAcmVtb3ZlU2VnbWVudCAwIHdoaWxlIEBfc2VnbWVudHMubGVuZ3RoID4gMFxuXG4gICAgc2V0VGl0bGU6ICh0aXRsZSwgaW5kZXgpLT5cbiAgICAgICAgQF9zZWdtZW50c1tpbmRleF0/LmxhYmVsLnRleHQgPSB0aXRsZVxuXG4gICAgc2V0V2lkdGg6ICh3aWR0aCwgaW5kZXgpLT5cbiAgICAgICAgaWYgd2lkdGg/XG4gICAgICAgICAgICBAX3NlZ21lbnRzW2luZGV4XT8uaGFzRXhwbGljaXRXaWR0aCA9IEBfc2VnbWVudHNbaW5kZXhdPy53aWR0aCA9IHdpZHRoXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBfc2VnbWVudHNbaW5kZXhdPy5oYXNFeHBsaWNpdFdpZHRoID0gbnVsbFxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIGF1dG9XaWR0aExheW91dDogKCktPlxuICAgICAgICBAd2lkdGggPSBTY3JlZW4ud2lkdGggLSBASFBBRERJTkcqMlxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcbiIsIiMgUHJldmlldyBDb21wb25lbnRcbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3Q29tcG9uZW50QXNzZXRzXCJcbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbmxvY2FsQ29sb3JzID1cblx0YmdfY29sb3Jfb25MaWdodDogXCIjZWVlXCJcblx0YmdfY29sb3Jfb25EYXJrOiBcIiMyMjJcIlxuXHRjb250ZW50X2NvbG9yX29uTGlnaHQ6IFwiIzAwMFwiXG5cdGNvbnRlbnRfY29sb3Jfb25EYXJrOiBcIiNGRkZcIlxuXG50aGVtZSA9XG5cdGJnX2NvbG9yOiBsb2NhbENvbG9ycy5iZ19jb2xvcl9vbkRhcmtcblx0Y29udGVudF9jb2xvcjogbG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmtcblxuXG4jIExvZ29cblxuY2xhc3MgTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28obG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmspXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuIyBQcmV2aWV3XG5cbiMgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWV3OiBudWxsXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IFwiMjA6MjFcIlxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0XG5cdFx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0XHR0b3BUaGVtZTogXCJkYXJrXCJcblx0XHRcdGJvdHRvbVRoZW1lOiBcImRhcmtcIlxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3RvcFRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRvcFRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRvcFRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2JvdHRvbVRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcbiMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93QmFyID0gdmFsdWVcblx0XG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblx0XG5cdFxuXHRcblx0XG5cdGdldExvY2F0aW9uRGF0YTogKCkgPT5cblx0XHRxdWVyeUFycmF5ID0gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gcXVlcnlBcnJheVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdFx0XHRlbHNlIGlmIHZhbHVlUGFydCA9PSBcIm5vcm1hbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcdFx0XG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cdHNldERlc2t0b3BTY2FsZU1vZGU6IChmb3JTdGF0ZSA9IFwibm9ybWFsXCIpID0+XG5cdFx0QHVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdGluaXRTdGF0ZSA9IGZvclN0YXRlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBpbml0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0XHRlbHNlIGluaXRTdGF0ZSA9IFwibm9ybWFsXCJcblx0XHRcblx0XHRzaG91bGRTaG93QnV0dG9uID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImJ1dHRvblwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0J1dHRvbiA9IGZhbHNlXG5cdFx0XG5cdFx0c2hvdWxkU2hvd0xvZ28gPSB0cnVlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwibG9nb1wiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0xvZ28gPSBmYWxzZVxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oaW5pdFN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oaW5pdFN0YXRlKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgdGhlbiByZXR1cm5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcblx0XG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXHRcblx0XG5cblx0XG5cdFxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmdfY29sb3Jcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb250ZW50X2NvbG9yLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcCgtMjApXG5cdFx0QG9yaWdpblkgPSAwXG5cdFx0XG5cdFx0c0ggPSAoU2NyZWVuLmhlaWdodCArIDQwKSAvIEBoZWlnaHRcblx0XHRAc2NhbGUgPSBNYXRoLm1pbihTY3JlZW4ud2lkdGggLyBAd2lkdGgsIHNIKVxuXHRcblx0XG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKHRlbXApID0+XG5cdFx0dGVtcC5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhciBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdGVtcCwgd2lkdGg6IHRlbXAud2lkdGggLSAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoNilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5jZW50ZXIoMSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGJvdHRvbVRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0XG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBS0FBO0FEQ0EsT0FBTyxDQUFDLElBQVIsR0FDQztFQUFBLEtBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsS0FBQSxFQUFPLE1BRFA7R0FERDtFQUdBLG1CQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0seURBQU47SUFDQSxLQUFBLEVBQU8sMERBRFA7R0FKRDtFQU1BLHFCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sMkRBQU47SUFDQSxLQUFBLEVBQU8sNERBRFA7R0FQRDtFQVNBLHNCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sNERBQU47SUFDQSxLQUFBLEVBQU8sNkRBRFA7R0FWRDtFQVlBLDBCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sZ0VBQU47SUFDQSxLQUFBLEVBQU8saUVBRFA7R0FiRDtFQWdCQSxLQUFBLEVBQU8sb0RBaEJQOzs7OztBRERELElBQUEsOENBQUE7RUFBQTs7OztBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsd0JBQVI7O0FBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcEIsQ0FBQTs7QUFFQSxXQUFBLEdBQ0M7RUFBQSxnQkFBQSxFQUFrQixNQUFs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
