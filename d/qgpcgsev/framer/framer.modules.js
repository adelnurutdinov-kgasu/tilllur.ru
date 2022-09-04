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
      prototypeCreationYear: "20:16",
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


},{"PreviewComponentAssets":"PreviewComponentAssets"}],"albumView":[function(require,module,exports){
var Artist, Card, Contrast, SongCreator, TextLayer, config;

TextLayer = require("text").TextLayer;

Card = require('card').Card;

Contrast = require('contrast');

SongCreator = require('create_song');

Artist = require('artist');

config = Artist.config;

exports.returnContentView = function(albumID, card) {
  var albumSongs, contentViewBg, i, j, len, localContentColor, localFontColor, shuffleBreaker, shuffleTitle, song, studio;
  localFontColor = "#000";
  localContentColor = "white";
  contentViewBg = new Layer({
    width: 616,
    height: 874,
    x: 8,
    y: 0,
    borderRadius: 12,
    backgroundColor: localContentColor,
    propagateEvents: false
  });
  contentViewBg.on(Events.Click, function() {});
  shuffleBreaker = new Layer({
    width: 616,
    height: 2,
    x: 0,
    y: 48 * 2,
    backgroundColor: localFontColor,
    opacity: 0.2,
    parent: contentViewBg
  });
  shuffleTitle = new TextLayer({
    parent: contentViewBg,
    text: "Перемешать альбом",
    width: 284 * 2,
    height: 18 * 2,
    x: 12 * 2,
    y: 15 * 2,
    fontSize: 15 * 2,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: localFontColor,
    opacity: 0.8,
    letterSpacing: 0.2
  });
  albumSongs = SongCreator.createSongsForAlbum(albumID, localFontColor);
  for (i = j = 0, len = albumSongs.length; j < len; i = ++j) {
    song = albumSongs[i];
    song.y = song.height * i + 48 * 2;
    song.parent = contentViewBg;
    song.albumID = albumID;
    song.propagateEvents = false;
  }
  contentViewBg.height = song.height * albumSongs.length + 14 * 2 + 60 + 8 * 2;
  studio = new Layer({
    width: 208,
    height: 24,
    x: 216,
    image: "images/studio.png",
    parent: card,
    y: song.height * albumSongs.length + 14 * 2 + 60 + 8 * 2 + 108 * 2 + 20
  });
  return [contentViewBg, albumSongs];
};

exports.returnAlbumView = function(albumID) {
  var albumTitle, albumYear, card, cardColor, image, image_bg, localContentColor, localFontColor, topView;
  cardColor = new Color("" + Artist.albumsData[albumID].tintColor);
  localFontColor = cardColor;
  localContentColor = cardColor;
  localFontColor = Contrast.returnTextColor(cardColor);
  localContentColor = Contrast.returnContentColor(cardColor);
  card = new Card({
    width: 640,
    height: 108 * 2 + 108,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.1)",
    cardID: albumID,
    backgroundColor: cardColor
  });
  topView = new Layer({
    width: 640,
    height: 108 * 2,
    backgroundColor: "null",
    parent: card
  });
  image_bg = new Layer({
    width: 156,
    height: 156,
    x: 36,
    y: 28,
    backgroundColor: "rgba(255,255,255,0)",
    shadowY: 20,
    shadowBlur: 28,
    shadowColor: "rgba(0,0,0,0.5)",
    parent: card
  });
  card.imageLayer = image_bg;
  image = new Layer({
    width: 156,
    height: 156,
    x: 36,
    y: 28,
    image: "" + Artist.albumsData[albumID].image,
    parent: card
  });
  albumTitle = new TextLayer({
    parent: card,
    text: "" + Artist.albumsData[albumID].title,
    width: 210 * 2,
    height: 50 * 2,
    x: 108 * 2,
    y: 14 * 2,
    fontSize: 18 * 2,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: localFontColor,
    letterSpacing: 0.2
  });
  albumYear = new TextLayer({
    parent: card,
    text: "" + Artist.albumsData[albumID].year,
    width: 200 * 2,
    height: 50 * 2,
    x: 108 * 2,
    y: 74 * 2,
    fontSize: 13 * 2,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: localFontColor,
    opacity: 0.8,
    letterSpacing: 0.2
  });
  return [card, topView];
};


},{"artist":"artist","card":"card","contrast":"contrast","create_song":"create_song","text":"text"}],"album":[function(require,module,exports){
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


},{}],"artists-backup/splean-2":[function(require,module,exports){
var config, configAlbums, greys_base, greys_black, greys_darker, greys_darkest, greys_lighter, greys_lightest, greys_pre_white, greys_ultra_light, greys_white, newsModel0, newsModel1, newsModel10, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, playlist0, playlist1, randomSource, videoModel0, videoModel1, videoModel2;

config = "artists/splean";

exports.config = config;

greys_white = "#FFFFFF";

greys_pre_white = "#F7F7F7";

greys_ultra_light = "#EEEEEE";

greys_lightest = "#DDDDDD";

greys_lighter = "#CCCCCC";

greys_base = "#999999";

greys_darker = "#666666";

greys_darkest = "#222222";

greys_black = "#000000";

exports.colorTheme = {
  navigation_header_background: config + "/navigation header.png",
  navigation_header_background_color: "rgba(244,124,54,",
  navigation_overlay_background: config + "/navigation darker.png",
  navigation_background: config + "/bg.png",
  navigation_scroll_background: "rgba(0,0,0,0.06)",
  navigation_scroll_timeline: "#999",
  navigation_blur_radius: "blur(10px)",
  navigation_blur_color: "rgba(255,255,255,0.6)",
  player_background: "white",
  player_progress_base: "#CCC",
  player_progress_filled: "#FF8012",
  player_song_title: "black",
  player_album_title: "#666",
  player_shadow_color: "rgba(0,0,0,0.2)",
  player_shadow_y: -8,
  player_shadow_blur: 20,
  card_shadow_color: "rgba(0,0,0,0.2)",
  card_shadow_y: 0,
  card_shadow_blur: 20,
  detailed_album_background: "white",
  detailed_album_title: "black",
  detailed_album_year: "#666",
  fav_songs_title: "#999",
  detailed_album_song_title: "#000",
  detailed_album_song_number: "#666",
  detailed_album_song_time: "#666"
};

newsModel0 = {
  image: config + "/news/full/0.jpg",
  coverImage: config + "/news/covers/0.jpg",
  textImage: config + "/news/text/0.jpg"
};

newsModel1 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/1.jpg",
  textImage: config + "/news/text/1.jpg"
};

newsModel2 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/2.jpg",
  textImage: config + "/news/text/2.jpg"
};

newsModel3 = {
  image: config + "/news/full/3.jpg",
  coverImage: config + "/news/covers/3.jpg",
  textImage: config + "/news/text/3.jpg"
};

newsModel4 = {
  image: config + "/news/full/4.jpg",
  coverImage: config + "/news/covers/4.jpg",
  textImage: config + "/news/text/4.jpg"
};

newsModel5 = {
  image: config + "/news/full/5.jpg",
  coverImage: config + "/news/covers/5.jpg",
  textImage: config + "/news/text/5.jpg"
};

newsModel6 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/6.jpg",
  textImage: config + "/news/text/6.jpg"
};

newsModel7 = {
  image: config + "/news/full/7.jpg",
  coverImage: config + "/news/covers/7.jpg",
  textImage: config + "/news/text/7.jpg"
};

newsModel8 = {
  image: config + "/news/full/8.jpg",
  coverImage: config + "/news/covers/8.jpg",
  textImage: config + "/news/text/8.jpg"
};

newsModel9 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/9.jpg",
  textImage: config + "/news/text/9.jpg"
};

newsModel10 = {
  image: config + "/news/full/10.jpg",
  coverImage: config + "/news/covers/10.jpg",
  textImage: config + "/news/text/10.jpg"
};

exports.feedData = [newsModel0, newsModel1, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, newsModel10];

videoModel0 = {
  image: config + "/video/previews/0.png",
  video: config + "/video/movies/0.mp4"
};

videoModel1 = {
  image: config + "/video/previews/1.png",
  video: config + "/video/movies/0.mp4"
};

videoModel2 = {
  image: config + "/video/previews/2.png",
  video: config + "/video/movies/0.mp4"
};

playlist0 = {
  video: config + "/video/movies/0.mp4",
  image: config + "/video/covers/0.png",
  textImage: config + "/video/text/0.png"
};

playlist1 = {
  video: config + "/video/movies/1.mp4",
  image: config + "/video/covers/1.png",
  textImage: config + "/video/text/1.png"
};

exports.playlistsData = [playlist0, playlist1];

exports.moviesData = [videoModel0, videoModel1, videoModel2];

config = "artists/splean";

configAlbums = config + "/albums/";

randomSource = ["1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3"];

exports.albumsData = [
  {
    title: "Пыльная быль",
    year: 1994,
    tintColor: "#222",
    songs: ["Жертва талого льда", "Холодные зимы", "Мне сказали слово", "Под сурдинку", "Гроза", "Война", "Пыльная быль. Сказка", "Серебряные реки", "Твое разбитое пенсне", "Сказочный леший", "Санкт-Петербургское небо", "Звери", "Рыба без трусов"],
    time: ["06:01", "01:31", "03:08", "03:26", "03:44", "02:30", "05:20", "02:52", "01:23", "01:42", "02:29", "02:36", "03:04"],
    image: configAlbums + "0.jpeg",
    source: randomSource
  }, {
    title: "Коллекционер оружия",
    year: 1995,
    tintColor: "#222",
    songs: ["Будь моей тенью", "Любовь идет по проводам", "Черный цвет солнца", "Самовар", "Жертва талого льда", "Что ты будешь делать", "Рыба без трусов", "Пыльная быль. Сказка", "Нечего делать внутри", "Иди через лес"],
    time: ["05:41", "04:24", "07:47", "05:31", "05:46", "05:09", "03:09", "05:35", "03:26", "06:32"],
    image: configAlbums + "1.jpeg",
    source: randomSource
  }, {
    title: "Фонарь под глазом",
    year: 1997,
    tintColor: "#222",
    songs: ["Молитва", "Я не хочу домой", "Бонни и Клайд", "Три цвета (Первый снег)", "Невский проспект", "Спи в заброшенном доме", "Прирожденный убийца", "Частушки", "Моя любовь", "Англо-русский словарь (Давай, Лама)", "Скоро будет солнечно", "За стеной"],
    time: ["32", "03:49", "02:40", "04:40", "05:12", "04:17", "03:21", "04:44", "03:36", "04:36", "04:42", "01:27"],
    image: configAlbums + "2.jpeg",
    source: randomSource
  }, {
    title: "Гранатовый альбом",
    year: 1998,
    tintColor: "#222",
    songs: ["Весь этот бред", "Достань гранату", "Орбит без сахара", "Приходи", "Свет горел всю ночь", "Люся сидит дома", "Бог устал нас любить", "Катись, колесо!", "Выхода нет", "Коктейли третьей мировой", "Джим", "Мария и Хуана", "Подводная лодка"],
    time: ["03:06", "04:10", "02:17", "04:02", "02:30", "03:57", "02:32", "02:47", "03:47", "02:52", "02:47", "08:03", "03:43"],
    image: configAlbums + "3.jpeg",
    source: randomSource
  }, {
    title: "Альтависта",
    year: 1999,
    tintColor: "#222",
    songs: ["Альтависта", "Молоко и мёд", "Пил-курил", "Терпсихора", "Далеко домой", "Абсент", "Добрых дел мастер", "Мотоциклетная цепь", "Сумасшедший автобус", "Алкоголь", "Встретимся завтра", "Молоко и мёд"],
    time: ["06:06", "04:39", "04:53", "02:47", "03:57", "01:54", "04:55", "04:15", "03:50", "05:25", "04:27", "05:03"],
    image: configAlbums + "4.jpeg",
    source: randomSource
  }, {
    title: "25-й кадр",
    year: 2001,
    tintColor: "#222",
    songs: ["Линия жизни", "Звезда рок-н-ролла", "Всего хорошего", "Моё сердце", "Рики-Тики-Тави", "SOS!", "Fellini", "Остаемся зимовать", "Тебе это снится", "Совсем другой", "Пластмассовая жизнь", "Пой мне ещё", "Ленинград - Amsterdam", "Fine"],
    time: ["03:00", "04:10", "02:59", "04:09", "01:58", "04:26", "04:44", "03:38", "04:58", "02:08", "02:25", "03:55", "02:36", "29"],
    image: configAlbums + "5.jpeg",
    source: randomSource
  }, {
    title: "Новые люди",
    year: 2003,
    tintColor: "#222",
    songs: ["Новые люди", "Время, Назад!", "Гандбол", "Сломано Все", "Девятиэтажный дом", "Блокада", "Валдай", "Йог Спокоен", "Северо-Запад", "РЭП (Нервное Сердце)", "Альтависта (Другая Точка Зрения)"],
    time: ["03:44", "04:12", "02:35", "04:16", "04:30", "03:22", "04:27", "02:56", "03:53", "03:14", "04:07"],
    image: configAlbums + "6.jpeg",
    source: randomSource
  }, {
    title: "Реверсивная хроника событий",
    year: 2004,
    tintColor: "#222",
    songs: ["Океан", "Семь восьмых", "Шато Марго", "Мы сидели и курили", "Сиануквиль", "Человек и Дерево", "Лабиринт", "Шаги", "Бериллий", "Паровоз", "Люди на ладони", "Урок географии", "Всё включено", "Голос за кадром", "Романс"],
    time: ["36", "04:22", "03:54", "03:19", "02:32", "02:16", "04:48", "01:29", "03:31", "53", "02:01", "04:59", "03:20", "01:08", "03:27"],
    image: configAlbums + "7.jpeg",
    source: randomSource
  }, {
    title: "Раздвоение личности",
    year: 2007,
    tintColor: "#222",
    songs: ["Мелькнула чья-то тень", "Скажи", "Матч", "На счастье", "Волна", "Лепесток", "Император", "Бетховен", "Маяк", "Праздник", "Сухари и сушки", "Мобильный", "Колокол", "Пробки", "Мамма мия", "Прочь", "Сын"],
    time: ["03:16", "03:12", "02:51", "02:44", "03:29", "03:38", "01:15", "02:44", "03:49", "02:21", "05:31", "03:25", "03:40", "04:03", "03:01", "03:20", "01:51"],
    image: configAlbums + "8.jpeg",
    source: randomSource
  }, {
    title: "Сигнал из космоса",
    year: 2009,
    tintColor: "#222",
    songs: ["Настройка звука", "Дыши легко", "Добро пожаловать", "Больше никакого рок-н-ролла", "Вниз головой", "Чердак", "Зеленая песня", "Камень", "3007", "Без тормозов", "Корабль ждет!", "Человек не спал", "Ковчег", "Выпусти меня отсюда", "Письмо", "Все так странно", "Вальс", "До встречи"],
    time: ["02:40", "03:53", "04:11", "04:12", "03:05", "04:07", "03:30", "04:59", "02:11", "03:14", "02:44", "02:52", "03:32", "03:11", "02:29", "02:03", "03:07", "04:22"],
    image: configAlbums + "9.jpeg",
    source: randomSource
  }, {
    title: "Обман зрения",
    year: 2012,
    tintColor: "#222",
    songs: ["Увертюра", "Летела жизнь", "Чёрная Волга", "Лестница", "Страшная тайна", "Петербургская свадьба", "Дочь самурая", "Фибоначчи", "В мире иллюзий", "Праздник (Другая точка зрения)", "Ковш", "Солнце взойдёт", "Чудак", "Волшебное слово"],
    time: ["01:44", "02:30", "02:46", "02:18", "02:24", "04:20", "03:36", "03:27", "02:58", "02:39", "03:01", "03:35", "02:29", "04:24"],
    image: configAlbums + "10.jpeg",
    source: randomSource
  }, {
    title: "Резонанс. Часть 1",
    year: 2014,
    tintColor: "#222",
    songs: ["Всадник", "Ай лов ю!", "Старый дом", "Мороз по коже", "Мысль", "Есть кто-нибудь живой?", "Рай в шалаше", "Всё наоборот", "Помолчим немного", "Пусть играет музыка!", "Горизонт событий", "Среди зимы", "Дверной глазок", "Подводная песня"],
    time: ["02:50", "03:20", "02:39", "03:05", "03:52", "03:10", "03:13", "01:22", "03:42", "03:13", "02:35", "02:42", "05:23", "03:28"],
    image: configAlbums + "11.jpeg",
    source: randomSource
  }, {
    title: "Резонанс. Часть 2",
    year: 2015,
    tintColor: "#222",
    songs: ["Красота", "Оркестр", "Песня на одном аккорде", "Два плюс один", "Полная луна", "Танцуй!", "Симфония", "Нефть", "Пожар", "Шахматы", "Исчезаем в темноте"],
    time: ["02:58", "04:11", "04:10", "02:37", "03:38", "04:10", "02:54", "02:14", "02:53", "05:53", "04:05"],
    image: configAlbums + "12.jpeg",
    source: randomSource
  }
];

exports.favList = {
  songs: ["Выхода нет", "Мое сердце", "Танцуй", "Романс", "Линия Жизни", "Оркестр", "Орбит без сахара", "Дочь самурая", "Рай в шалаше", "Пой мне еще"],
  source: randomSource,
  time: ["3:47", "4:09", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"],
  albums: [3, 5, 12, 7, 5, 12, 3, 10, 11, 5]
};


},{}],"artists-backup/splean":[function(require,module,exports){
var config, configAlbums, greys_base, greys_black, greys_darker, greys_darkest, greys_lighter, greys_lightest, greys_pre_white, greys_ultra_light, greys_white, newsModel0, newsModel1, newsModel10, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, playlist0, playlist1, randomSource, videoModel0, videoModel1, videoModel2;

config = "artists/splean";

exports.config = config;

greys_white = "#FFFFFF";

greys_pre_white = "#F7F7F7";

greys_ultra_light = "#EEEEEE";

greys_lightest = "#DDDDDD";

greys_lighter = "#CCCCCC";

greys_base = "#999999";

greys_darker = "#666666";

greys_darkest = "#222222";

greys_black = "#000000";

exports.colorTheme = {
  navigation_header_background: config + "/navigation header.png",
  navigation_header_background_color: "rgba(244,124,54,",
  navigation_overlay_background: config + "/navigation darker.png",
  navigation_background: config + "/bg.png",
  navigation_scroll_background: "rgba(0,0,0,0.06)",
  navigation_scroll_timeline: "#999",
  navigation_blur_radius: "blur(10px)",
  navigation_blur_color: "rgba(255,255,255,0.6)",
  player_background: "white",
  player_progress_base: "#CCC",
  player_progress_filled: "#FF8012",
  player_song_title: "black",
  player_album_title: "#666",
  player_shadow_color: "rgba(0,0,0,0.2)",
  player_shadow_y: -8,
  player_shadow_blur: 20,
  card_shadow_color: "rgba(0,0,0,0.2)",
  card_shadow_y: 0,
  card_shadow_blur: 20,
  detailed_album_background: "white",
  detailed_album_title: "black",
  detailed_album_year: "#666",
  fav_songs_title: "#999",
  detailed_album_song_title: "#000",
  detailed_album_song_number: "#666",
  detailed_album_song_time: "#666"
};

newsModel0 = {
  image: config + "/news/full/0.jpg",
  coverImage: config + "/news/covers/0.jpg",
  textImage: config + "/news/text/0.jpg"
};

newsModel1 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/1.jpg",
  textImage: config + "/news/text/1.jpg"
};

newsModel2 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/2.jpg",
  textImage: config + "/news/text/2.jpg"
};

newsModel3 = {
  image: config + "/news/full/3.jpg",
  coverImage: config + "/news/covers/3.jpg",
  textImage: config + "/news/text/3.jpg"
};

newsModel4 = {
  image: config + "/news/full/4.jpg",
  coverImage: config + "/news/covers/4.jpg",
  textImage: config + "/news/text/4.jpg"
};

newsModel5 = {
  image: config + "/news/full/5.jpg",
  coverImage: config + "/news/covers/5.jpg",
  textImage: config + "/news/text/5.jpg"
};

newsModel6 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/6.jpg",
  textImage: config + "/news/text/6.jpg"
};

newsModel7 = {
  image: config + "/news/full/7.jpg",
  coverImage: config + "/news/covers/7.jpg",
  textImage: config + "/news/text/7.jpg"
};

newsModel8 = {
  image: config + "/news/full/8.jpg",
  coverImage: config + "/news/covers/8.jpg",
  textImage: config + "/news/text/8.jpg"
};

newsModel9 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/9.jpg",
  textImage: config + "/news/text/9.jpg"
};

newsModel10 = {
  image: config + "/news/full/10.jpg",
  coverImage: config + "/news/covers/10.jpg",
  textImage: config + "/news/text/10.jpg"
};

exports.feedData = [newsModel0, newsModel1, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, newsModel10];

videoModel0 = {
  image: config + "/video/previews/0.png",
  video: config + "/video/movies/0.mp4"
};

videoModel1 = {
  image: config + "/video/previews/1.png",
  video: config + "/video/movies/0.mp4"
};

videoModel2 = {
  image: config + "/video/previews/2.png",
  video: config + "/video/movies/0.mp4"
};

playlist0 = {
  video: config + "/video/movies/0.mp4",
  image: config + "/video/covers/0.png",
  textImage: config + "/video/text/0.png"
};

playlist1 = {
  video: config + "/video/movies/1.mp4",
  image: config + "/video/covers/1.png",
  textImage: config + "/video/text/1.png"
};

exports.playlistsData = [playlist0, playlist1];

exports.moviesData = [videoModel0, videoModel1, videoModel2];

config = "artists/splean";

configAlbums = config + "/albums/";

randomSource = ["1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3"];

exports.albumsData = [
  {
    title: "Пыльная быль",
    year: 1994,
    tintColor: "#222",
    songs: ["Жертва талого льда", "Холодные зимы", "Мне сказали слово", "Под сурдинку", "Гроза", "Война", "Пыльная быль. Сказка", "Серебряные реки", "Твое разбитое пенсне", "Сказочный леший", "Санкт-Петербургское небо", "Звери", "Рыба без трусов"],
    time: ["06:01", "01:31", "03:08", "03:26", "03:44", "02:30", "05:20", "02:52", "01:23", "01:42", "02:29", "02:36", "03:04"],
    image: configAlbums + "0.jpeg",
    source: randomSource
  }, {
    title: "Коллекционер оружия",
    year: 1995,
    tintColor: "#222",
    songs: ["Будь моей тенью", "Любовь идет по проводам", "Черный цвет солнца", "Самовар", "Жертва талого льда", "Что ты будешь делать", "Рыба без трусов", "Пыльная быль. Сказка", "Нечего делать внутри", "Иди через лес"],
    time: ["05:41", "04:24", "07:47", "05:31", "05:46", "05:09", "03:09", "05:35", "03:26", "06:32"],
    image: configAlbums + "1.jpeg",
    source: randomSource
  }, {
    title: "Фонарь под глазом",
    year: 1997,
    tintColor: "#222",
    songs: ["Молитва", "Я не хочу домой", "Бонни и Клайд", "Три цвета (Первый снег)", "Невский проспект", "Спи в заброшенном доме", "Прирожденный убийца", "Частушки", "Моя любовь", "Англо-русский словарь (Давай, Лама)", "Скоро будет солнечно", "За стеной"],
    time: ["32", "03:49", "02:40", "04:40", "05:12", "04:17", "03:21", "04:44", "03:36", "04:36", "04:42", "01:27"],
    image: configAlbums + "2.jpeg",
    source: randomSource
  }, {
    title: "Гранатовый альбом",
    year: 1998,
    tintColor: "#222",
    songs: ["Весь этот бред", "Достань гранату", "Орбит без сахара", "Приходи", "Свет горел всю ночь", "Люся сидит дома", "Бог устал нас любить", "Катись, колесо!", "Выхода нет", "Коктейли третьей мировой", "Джим", "Мария и Хуана", "Подводная лодка"],
    time: ["03:06", "04:10", "02:17", "04:02", "02:30", "03:57", "02:32", "02:47", "03:47", "02:52", "02:47", "08:03", "03:43"],
    image: configAlbums + "3.jpeg",
    source: randomSource
  }, {
    title: "Альтависта",
    year: 1999,
    tintColor: "#222",
    songs: ["Альтависта", "Молоко и мёд", "Пил-курил", "Терпсихора", "Далеко домой", "Абсент", "Добрых дел мастер", "Мотоциклетная цепь", "Сумасшедший автобус", "Алкоголь", "Встретимся завтра", "Молоко и мёд"],
    time: ["06:06", "04:39", "04:53", "02:47", "03:57", "01:54", "04:55", "04:15", "03:50", "05:25", "04:27", "05:03"],
    image: configAlbums + "4.jpeg",
    source: randomSource
  }, {
    title: "25-й кадр",
    year: 2001,
    tintColor: "#222",
    songs: ["Линия жизни", "Звезда рок-н-ролла", "Всего хорошего", "Моё сердце", "Рики-Тики-Тави", "SOS!", "Fellini", "Остаемся зимовать", "Тебе это снится", "Совсем другой", "Пластмассовая жизнь", "Пой мне ещё", "Ленинград - Amsterdam", "Fine"],
    time: ["03:00", "04:10", "02:59", "04:09", "01:58", "04:26", "04:44", "03:38", "04:58", "02:08", "02:25", "03:55", "02:36", "29"],
    image: configAlbums + "5.jpeg",
    source: randomSource
  }, {
    title: "Новые люди",
    year: 2003,
    tintColor: "#222",
    songs: ["Новые люди", "Время, Назад!", "Гандбол", "Сломано Все", "Девятиэтажный дом", "Блокада", "Валдай", "Йог Спокоен", "Северо-Запад", "РЭП (Нервное Сердце)", "Альтависта (Другая Точка Зрения)"],
    time: ["03:44", "04:12", "02:35", "04:16", "04:30", "03:22", "04:27", "02:56", "03:53", "03:14", "04:07"],
    image: configAlbums + "6.jpeg",
    source: randomSource
  }, {
    title: "Реверсивная хроника событий",
    year: 2004,
    tintColor: "#222",
    songs: ["Океан", "Семь восьмых", "Шато Марго", "Мы сидели и курили", "Сиануквиль", "Человек и Дерево", "Лабиринт", "Шаги", "Бериллий", "Паровоз", "Люди на ладони", "Урок географии", "Всё включено", "Голос за кадром", "Романс"],
    time: ["36", "04:22", "03:54", "03:19", "02:32", "02:16", "04:48", "01:29", "03:31", "53", "02:01", "04:59", "03:20", "01:08", "03:27"],
    image: configAlbums + "7.jpeg",
    source: randomSource
  }, {
    title: "Раздвоение личности",
    year: 2007,
    tintColor: "#222",
    songs: ["Мелькнула чья-то тень", "Скажи", "Матч", "На счастье", "Волна", "Лепесток", "Император", "Бетховен", "Маяк", "Праздник", "Сухари и сушки", "Мобильный", "Колокол", "Пробки", "Мамма мия", "Прочь", "Сын"],
    time: ["03:16", "03:12", "02:51", "02:44", "03:29", "03:38", "01:15", "02:44", "03:49", "02:21", "05:31", "03:25", "03:40", "04:03", "03:01", "03:20", "01:51"],
    image: configAlbums + "8.jpeg",
    source: randomSource
  }, {
    title: "Сигнал из космоса",
    year: 2009,
    tintColor: "#222",
    songs: ["Настройка звука", "Дыши легко", "Добро пожаловать", "Больше никакого рок-н-ролла", "Вниз головой", "Чердак", "Зеленая песня", "Камень", "3007", "Без тормозов", "Корабль ждет!", "Человек не спал", "Ковчег", "Выпусти меня отсюда", "Письмо", "Все так странно", "Вальс", "До встречи"],
    time: ["02:40", "03:53", "04:11", "04:12", "03:05", "04:07", "03:30", "04:59", "02:11", "03:14", "02:44", "02:52", "03:32", "03:11", "02:29", "02:03", "03:07", "04:22"],
    image: configAlbums + "9.jpeg",
    source: randomSource
  }, {
    title: "Обман зрения",
    year: 2012,
    tintColor: "#222",
    songs: ["Увертюра", "Летела жизнь", "Чёрная Волга", "Лестница", "Страшная тайна", "Петербургская свадьба", "Дочь самурая", "Фибоначчи", "В мире иллюзий", "Праздник (Другая точка зрения)", "Ковш", "Солнце взойдёт", "Чудак", "Волшебное слово"],
    time: ["01:44", "02:30", "02:46", "02:18", "02:24", "04:20", "03:36", "03:27", "02:58", "02:39", "03:01", "03:35", "02:29", "04:24"],
    image: configAlbums + "10.jpeg",
    source: randomSource
  }, {
    title: "Резонанс. Часть 1",
    year: 2014,
    tintColor: "#222",
    songs: ["Всадник", "Ай лов ю!", "Старый дом", "Мороз по коже", "Мысль", "Есть кто-нибудь живой?", "Рай в шалаше", "Всё наоборот", "Помолчим немного", "Пусть играет музыка!", "Горизонт событий", "Среди зимы", "Дверной глазок", "Подводная песня"],
    time: ["02:50", "03:20", "02:39", "03:05", "03:52", "03:10", "03:13", "01:22", "03:42", "03:13", "02:35", "02:42", "05:23", "03:28"],
    image: configAlbums + "11.jpeg",
    source: randomSource
  }, {
    title: "Резонанс. Часть 2",
    year: 2015,
    tintColor: "#222",
    songs: ["Красота", "Оркестр", "Песня на одном аккорде", "Два плюс один", "Полная луна", "Танцуй!", "Симфония", "Нефть", "Пожар", "Шахматы", "Исчезаем в темноте"],
    time: ["02:58", "04:11", "04:10", "02:37", "03:38", "04:10", "02:54", "02:14", "02:53", "05:53", "04:05"],
    image: configAlbums + "12.jpeg",
    source: randomSource
  }
];

exports.favList = {
  songs: ["Выхода нет", "Мое сердце", "Танцуй", "Романс", "Линия Жизни", "Оркестр", "Орбит без сахара", "Дочь самурая", "Рай в шалаше", "Пой мне еще"],
  source: randomSource,
  time: ["3:47", "4:09", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"],
  albums: [3, 5, 12, 7, 5, 12, 3, 10, 11, 5]
};


},{}],"artists-backup/troll":[function(require,module,exports){
var config, configAlbums, greys_base, greys_black, greys_darker, greys_darkest, greys_lighter, greys_lightest, greys_pre_white, greys_ultra_light, greys_white, newsModel0, newsModel1, newsModel10, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, playlist0, playlist1, randomSource, videoModel0, videoModel1, videoModel2;

config = "artists/troll";

exports.config = config;

greys_white = "#FFFFFF";

greys_pre_white = "#F7F7F7";

greys_ultra_light = "#EEEEEE";

greys_lightest = "#DDDDDD";

greys_lighter = "#CCCCCC";

greys_base = "#999999";

greys_darker = "#666666";

greys_darkest = "#222222";

greys_black = "#000000";

exports.colorTheme = {
  navigation_header_background: config + "/navigation header.png",
  navigation_header_background_color: "rgba(0,0,0,",
  navigation_overlay_background: config + "/navigation darker.png",
  navigation_background: config + "/bg.png",
  navigation_scroll_background: "rgba(0,0,0,0.4)",
  navigation_scroll_timeline: "#666",
  navigation_blur_radius: "blur(10px)",
  navigation_blur_color: "rgba(0,0,0,0.6)",
  player_background: "#1D1D1D",
  player_progress_base: "#666",
  player_progress_filled: "#AF1417",
  player_song_title: "white",
  player_album_title: "rgba(204,204,204,0.5)",
  player_shadow_color: "rgba(0,0,0,0.5)",
  player_shadow_y: -20,
  player_shadow_blur: 40,
  card_shadow_color: "rgba(0,0,0,0.5)",
  card_shadow_y: 28,
  card_shadow_blur: 40,
  detailed_album_background: "#111",
  detailed_album_title: "white",
  detailed_album_year: "rgba(204,204,204,0.5)",
  fav_songs_title: "rgba(255,255,255,0.5)",
  detailed_album_song_title: "white",
  detailed_album_song_number: "#999",
  detailed_album_song_time: "#999"
};

newsModel0 = {
  image: config + "/news/full/0.jpg",
  coverImage: config + "/news/covers/0.jpg",
  textImage: config + "/news/text/0.jpg"
};

newsModel1 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/1.jpg",
  textImage: config + "/news/text/1.jpg"
};

newsModel2 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/2.jpg",
  textImage: config + "/news/text/2.jpg"
};

newsModel3 = {
  image: config + "/news/full/3.jpg",
  coverImage: config + "/news/covers/3.jpg",
  textImage: config + "/news/text/3.jpg"
};

newsModel4 = {
  image: config + "/news/full/4.jpg",
  coverImage: config + "/news/covers/4.jpg",
  textImage: config + "/news/text/4.jpg"
};

newsModel5 = {
  image: config + "/news/full/5.jpg",
  coverImage: config + "/news/covers/5.jpg",
  textImage: config + "/news/text/5.jpg"
};

newsModel6 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/6.jpg",
  textImage: config + "/news/text/6.jpg"
};

newsModel7 = {
  image: config + "/news/full/7.jpg",
  coverImage: config + "/news/covers/7.jpg",
  textImage: config + "/news/text/7.jpg"
};

newsModel8 = {
  image: config + "/news/full/8.jpg",
  coverImage: config + "/news/covers/8.jpg",
  textImage: config + "/news/text/8.jpg"
};

newsModel9 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/9.jpg",
  textImage: config + "/news/text/9.jpg"
};

newsModel10 = {
  image: config + "/news/full/10.jpg",
  coverImage: config + "/news/covers/10.jpg",
  textImage: config + "/news/text/10.jpg"
};

exports.feedData = [newsModel0, newsModel1, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, newsModel10];

videoModel0 = {
  image: config + "/video/previews/0.png",
  video: config + "/video/movies/0.mp4"
};

videoModel1 = {
  image: config + "/video/previews/1.png",
  video: config + "/video/movies/0.mp4"
};

videoModel2 = {
  image: config + "/video/previews/2.png",
  video: config + "/video/movies/0.mp4"
};

playlist0 = {
  video: config + "/video/movies/0.mp4",
  image: config + "/video/covers/0.png",
  textImage: config + "/video/text/0.png"
};

playlist1 = {
  video: config + "/video/movies/1.mp4",
  image: config + "/video/covers/1.png",
  textImage: config + "/video/text/1.png"
};

exports.playlistsData = [playlist0, playlist1];

exports.moviesData = [videoModel0, videoModel1, videoModel2];

configAlbums = config + "/albums/";

randomSource = ["1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3"];

exports.albumsData = [
  {
    title: "Икра",
    year: 1996,
    tintColor: "#222",
    songs: ["Доля риска", "Шамаманы", "Сиамские сердца", "Не звезда", "Дельфины", "Ранетка", "На яды", "Так надо", "Алмазами", "Сигналы", "Мальчик-солдат", "Голод", "Сайонара диска", "Далеко"],
    time: ["03:57", "03:34", "03:56", "03:30", "04:38", "03:19", "03:10", "03:58", "04:15", "04:17", "04:34", "04:43", "03:47", "06:23"],
    image: configAlbums + "0.jpeg",
    source: randomSource
  }, {
    title: "Морская",
    year: 1997,
    tintColor: "#222",
    songs: ["Вдруг ушли поезда", "Девочка", "Утекай", "Морская болезнь", "Владивосток 2000", "Роза Люксембург", "Кот кота (Вот и вся любовь)", "Забавы", "Скорость", "Время тепла", "Делай меня точно", "Всецело всем", "Воспитанник упавшей звезды", "Новая луна апреля"],
    time: ["03:50", "03:23", "02:18", "04:41", "02:38", "02:22", "03:08", "02:33", "03:52", "03:07", "02:57", "03:52", "04:28", "02:59"],
    image: configAlbums + "1.jpeg",
    source: randomSource
  }, {
    title: "Шамора",
    year: 1998,
    tintColor: "#222",
    songs: ["Алло, попс!", "Ультиматум", "Новая луна апреля", "Кассетный мальчик", "Инопланетный гость", "Девушки эмансипэ", "Вечерний чай", "Бит бум", "Лунные девицы", "Парк", "Сайонара диска", "Чёрная дыра", "В думах о девушке из города центрального подчинения КНР", "Делай меня точно", "Так страшно", "Всецело всем", "Мальчик-солдат", "Воспитанник упавшей звезды", "Ложись, подполковник!", "Делай Ю-Ю", "Блудливые коты", "Посиделки-подгляделки", "Далеко", "Эхом гонга"],
    time: ["02:16", "03:42", "02:59", "03:52", "03:51", "02:31", "03:42", "02:17", "03:28", "02:37", "03:47", "03:49", "03:03", "02:57", "03:51", "03:52", "04:35", "04:30", "03:12", "03:45", "03:26", "03:32", "05:12", "04:25"],
    image: configAlbums + "2.jpeg",
    source: randomSource
  }, {
    title: "Точно Ртуть Алоэ",
    year: 2000,
    tintColor: "#222",
    songs: ["Карнавала.нет", "Не очень", "Скорее и быстро", "Моя певица", "Северный полюс", "Невеста?", "Жабры", "Клубничная", "Сны", "Без обмана", "Ему не взять тебя", "Тише", "Случайности"],
    time: ["03:10", "03:58", "03:06", "04:09", "03:40", "03:56", "03:32", "02:37", "03:58", "03:23", "04:50", "03:00", "03:33"],
    image: configAlbums + "3.jpeg",
    source: randomSource
  }, {
    title: "Меамуры",
    year: 2002,
    tintColor: "#222",
    songs: ["В рейс", "На удачу", "Это по любви", "Глубже", "Морская капуста", "Плюс 28", "Доброе утро, планета!", "Стекла", "Недопонимающая", "Знакомым столичным", "Обещания", "Это по любви"],
    time: ["04:09", "03:54", "02:54", "04:03", "02:28", "04:39", "03:29", "03:47", "04:07", "04:35", "03:57", "03:47"],
    image: configAlbums + "4.jpeg",
    source: randomSource
  }, {
    title: "Похитители книг",
    year: 2004,
    tintColor: "#222",
    songs: ["Такие девчонки", "Фламенко Красотки ч. 2", "Фламенко Красотки ч. 1", "Где такой я?", "Твоя летняя", "Золотые ворота", "Водопады слез", "Зеленый rocks", "Зеленый rocks", "Медведица", "Боксерский вальс ч. 2 \"Карамель\"", "Боксерский вальс", "Боксерский Funky вальс", "Такие девчонки", "Медведица Bestoloch Mix"],
    time: ["04:38", "36", "01:03", "06:35", "02:55", "03:57", "03:54", "54", "03:18", "03:54", "01:33", "02:38", "04:50", "04:59", "04:01"],
    image: configAlbums + "5.jpeg",
    source: randomSource
  }, {
    title: "Слияние и поглощение",
    year: 2005,
    tintColor: "#222",
    songs: ["Интро", "Прости, Киска!", "Банзай", "Хищник", "Страху нет", "Кораллы", "Приватизация", "Такбываетнеслучайно", "Янтарь", "Ирис", "Непокой", "Здравствуйдосвидания"],
    time: ["02:54", "05:11", "02:50", "03:54", "03:30", "04:07", "03:31", "04:48", "03:57", "03:14", "02:51", "04:24"],
    image: configAlbums + "6.jpeg",
    source: randomSource
  }, {
    title: "Best DJ’'s Dance Mix Vol.VI",
    year: 2006,
    tintColor: "#222",
    songs: ["Здравствуйдосвидания", "Страху нет", "Медведица | Dj Ivan Scratchin'", "Прости, Киска", "С Новым Годом, Крошка!", "Девочка", "Страху нет", "С Новым Годом, Крошка!", "Lady Alpine Blue | Dj Ram", "Lucky Bride?", "Ирис", "Невеста?", "Дельфины", "Иди, я буду", "С Новым Годом, Крошка!", "Непокой"],
    time: ["05:07", "05:02", "05:58", "02:41", "04:00", "03:19", "02:43", "05:08", "04:52", "03:59", "04:07", "03:13", "04:18", "04:29", "04:52", "02:49"],
    image: configAlbums + "7.jpeg",
    source: randomSource
  }, {
    title: "8",
    year: 2008,
    tintColor: "#222",
    songs: ["Запуск ракетоплана \"Иосиф Сталин\" на Луну", "Эй, товарищ", "Контрабанды", "Проспали", "Музыкант", "Наше время", "Молодость", "Метель", "Золото и ладан", "В этом свете", "Мамы дочерей", "Ядерные станции", "Пьяная струна", "О, рай!", "Лазурно-бирюзовые", "Поспи, рок-н-ролл", "Акваланги", "Весна", "Нормальный бизнес", "Фантастика", "Круг замкнулся"],
    time: ["01:57", "03:47", "04:00", "03:10", "03:42", "04:47", "04:48", "03:44", "04:23", "04:54", "05:33", "05:14", "03:55", "04:00", "04:15", "04:27", "05:00", "05:00", "04:28", "03:42", "02:57"],
    image: configAlbums + "8.jpeg",
    source: randomSource
  }, {
    title: "Comrade Ambassador",
    year: 2009,
    tintColor: "#222",
    songs: ["Mothers And Daughters", "Hey, Tovarishch", "We Overslept", "Musician", "Nuclear Stations", "Venomous Star", "In Our World", "Drunken String", "Queen Of Rock", "Snowstorm", "Witnesses", "Sleep Rock'n'Roll", "Burn It All", "California Dreaming"],
    time: ["05:35", "03:48", "03:09", "03:43", "05:14", "03:01", "04:56", "03:55", "03:08", "03:45", "03:02", "04:27", "06:07", "03:12"],
    image: configAlbums + "9.jpeg",
    source: randomSource
  }, {
    title: "Редкие земли",
    year: 2010,
    tintColor: "#222",
    songs: ["Война человечков", "Смог", "Вечер", "Другие места", "Масло", "Лучи", "Девочкодруг", "Шамора", "Иди, я буду", "Нет нет нет", "Наркотикам – нет!", "Саундтрек", "На перекрестках судьбы (Стань человеком)", "С Новым годом, крошка!"],
    time: ["03:58", "04:15", "04:24", "03:44", "03:59", "04:51", "03:48", "03:07", "05:43", "04:08", "03:41", "03:57", "02:38", "05:05"],
    image: configAlbums + "10.jpeg",
    source: randomSource
  }, {
    title: "Мумикам от тролликов. Поспи, рок-н-ролл",
    year: 2012,
    tintColor: "#222",
    songs: ["Это по любви", "О, рай", "Дельфины", "Такие девчонки", "Так надо", "С новым годом, крошка", "Невеста", "Новая луна апреля", "Поспи, рок-н-ролл", "Моя певица", "Забавы"],
    time: ["03:46", "03:06", "05:11", "04:38", "04:01", "04:58", "03:18", "03:12", "03:34", "04:28", "03:32"],
    image: configAlbums + "11.jpeg",
    source: randomSource
  }, {
    title: "Пиратские копии",
    year: 2015,
    tintColor: "#222",
    songs: ["С чистого листа", "Медленные танцы", "Витамины", "Пиратские копии", "Кажется", "Молния", "Золотое сердце", "Последний отпускной", "Куклы", "Мошка", "Где вы, девочки", "Кто будет спасать рок-н-ролл", "Шторм", "Ноябрь", "2nd Wind", "Fake a Fake", "Dolphins", "1984 Part II", "Horongbul", "Witch", "Polar Bear", "Round and Round", "Oy Oy Oy", "Cha-Ma-Cham-A", "You Crush on Me", "In The Valley of Ease", "Magic Stone", "Kuaizuokai"],
    time: ["03:58", "09:02", "04:17", "06:28", "04:27", "04:32", "03:34", "03:32", "02:58", "03:49", "04:48", "04:16", "03:40", "06:00", "05:15", "03:43", "04:46", "03:11", "04:44", "03:22", "04:01", "03:45", "03:34", "03:32", "03:43", "08:27", "06:39", "03:48"],
    image: configAlbums + "12.jpeg",
    source: randomSource
  }
];

exports.favList = {
  songs: ["Владивосток 2000", "Невеста?", "Утекай", "Медведицп", "Это по любви", "Забавы", "Такие девчонки", "Девочка", "Фантастика", "Дельфины"],
  source: randomSource,
  time: ["3:47", "4:09", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"],
  albums: [1, 3, 1, 5, 4, 1, 5, 1, 9, 0]
};


},{}],"artist":[function(require,module,exports){
var albumsDataYears, config, configAlbums, greys_base, greys_black, greys_darker, greys_darkest, greys_lighter, greys_lightest, greys_pre_white, greys_ultra_light, greys_white, newsModel0, newsModel1, newsModel10, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, playlist0, playlist1, popularPlaylist, randomSource, videoModel0, videoModel1, videoModel2;

config = "artists/troll";

exports.config = config;

greys_white = "#FFFFFF";

greys_pre_white = "#F7F7F7";

greys_ultra_light = "#EEEEEE";

greys_lightest = "#DDDDDD";

greys_lighter = "#CCCCCC";

greys_base = "#999999";

greys_darker = "#666666";

greys_darkest = "#222222";

greys_black = "#000000";

exports.colorTheme = {
  navigation_header_background: config + "/navigation header.png",
  navigation_header_background_color: "rgba(0,0,0,",
  navigation_overlay_background: config + "/navigation darker.png",
  navigation_background: config + "/bg.png",
  navigation_scroll_background: "rgba(0,0,0,0.4)",
  navigation_scroll_timeline: "#666",
  navigation_blur_radius: "blur(10px)",
  navigation_blur_color: "rgba(0,0,0,0.6)",
  player_background: "#1D1D1D",
  player_progress_base: "#666",
  player_progress_filled: "#AF1417",
  player_song_title: "white",
  player_album_title: "rgba(204,204,204,0.5)",
  player_shadow_color: "rgba(0,0,0,0.5)",
  player_shadow_y: -20,
  player_shadow_blur: 40,
  card_shadow_color: "rgba(0,0,0,0.5)",
  card_shadow_y: 28,
  card_shadow_blur: 40,
  detailed_album_background: "#111",
  detailed_album_title: "white",
  detailed_album_year: "rgba(204,204,204,0.5)",
  fav_songs_title: "rgba(255,255,255,0.5)",
  detailed_album_song_title: "white",
  detailed_album_song_number: "#999",
  detailed_album_song_time: "#999"
};

newsModel0 = {
  image: config + "/news/full/0.jpg",
  coverImage: config + "/news/covers/0.jpg",
  textImage: config + "/news/text/0.jpg"
};

newsModel1 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/1.jpg",
  textImage: config + "/news/text/1.jpg"
};

newsModel2 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/2.jpg",
  textImage: config + "/news/text/2.jpg"
};

newsModel3 = {
  image: config + "/news/full/3.jpg",
  coverImage: config + "/news/covers/3.jpg",
  textImage: config + "/news/text/3.jpg"
};

newsModel4 = {
  image: config + "/news/full/4.jpg",
  coverImage: config + "/news/covers/4.jpg",
  textImage: config + "/news/text/4.jpg"
};

newsModel5 = {
  image: config + "/news/full/5.jpg",
  coverImage: config + "/news/covers/5.jpg",
  textImage: config + "/news/text/5.jpg"
};

newsModel6 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/6.jpg",
  textImage: config + "/news/text/6.jpg"
};

newsModel7 = {
  image: config + "/news/full/7.jpg",
  coverImage: config + "/news/covers/7.jpg",
  textImage: config + "/news/text/7.jpg"
};

newsModel8 = {
  image: config + "/news/full/8.jpg",
  coverImage: config + "/news/covers/8.jpg",
  textImage: config + "/news/text/8.jpg"
};

newsModel9 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/9.jpg",
  textImage: config + "/news/text/9.jpg"
};

newsModel10 = {
  image: config + "/news/full/10.jpg",
  coverImage: config + "/news/covers/10.jpg",
  textImage: config + "/news/text/10.jpg"
};

exports.feedData = [newsModel0, newsModel1, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, newsModel10];

videoModel0 = {
  image: config + "/video/previews/0.png",
  video: config + "/video/movies/0.mp4"
};

videoModel1 = {
  image: config + "/video/previews/1.png",
  video: config + "/video/movies/0.mp4"
};

videoModel2 = {
  image: config + "/video/previews/2.png",
  video: config + "/video/movies/0.mp4"
};

playlist0 = {
  video: config + "/video/movies/0.mp4",
  image: config + "/video/covers/0.png",
  textImage: config + "/video/text/0.png"
};

playlist1 = {
  video: config + "/video/movies/1.mp4",
  image: config + "/video/covers/1.png",
  textImage: config + "/video/text/1.png"
};

popularPlaylist = {
  video: config + "/video/movies/0.mp4",
  image: config + "/video/covers/2.png",
  textImage: config + "/video/text/2.png"
};

exports.playlistsData = [playlist0, playlist1, popularPlaylist];

exports.moviesData = [videoModel0, videoModel1, videoModel2];

configAlbums = config + "/albums/";

randomSource = ["1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3", "2.mp3", "1.mp3"];

albumsDataYears = [
  {
    title: "Immortalized",
    year: 2015,
    tintColor: "#362828",
    songs: ["The Eye Of The Storm", "Immortalized", "The Vengeful One", "Open Your Eyes", "The Light", "What Are You Waiting For", "You're Mine", "Who", "Save Our Last Goodbye", "Fire It Up", "The Sound Of Silence", "Never Wrong", "Who Taught You How To Hate", "Tyrant", "Legion Of Monsters", "The Brave And The Bold"],
    time: ["01:20", "04:17", "04:12", "03:57", "04:16", "04:03", "04:55", "04:46", "04:59", "04:05", "04:08", "03:33", "04:57", "03:49", "04:23", "04:34"],
    image: configAlbums + "9.jpg",
    source: randomSource
  }, {
    title: "The Lost Children",
    year: 2011,
    tintColor: "#27212A",
    songs: ["Hell", "A Welcome Burden", "This Moment", "Old Friend", "Monster", "Run", "Leave It Alone", "Two Worlds", "God Of The Mind", "Sickened", "Mine", "Parasite", "Dehumanized", "3", "Midlife Crisis", "Living After Midnight"],
    time: ["04:15", "03:31", "03:05", "03:36", "04:04", "03:13", "04:06", "03:32", "03:05", "03:58", "05:04", "03:24", "03:31", "04:02", "04:02", "04:25"],
    image: configAlbums + "8.jpg",
    source: randomSource
  }, {
    title: "The Sickness 10th Anniversary Edition",
    year: 2010,
    tintColor: "#3E686D",
    songs: ["Voices", "The Game", "Stupify", "Down With The Sickness", "Violence Fetish", "Fear", "Numb", "Want", "Conflict", "Shout2000", "Droppin' Plates", "Meaning Of Life", "God Of The Mind", "A Welcome Burden"],
    time: ["03:12", "03:46", "04:34", "04:38", "03:23", "03:46", "03:44", "03:52", "04:35", "04:18", "03:48", "04:00", "03:05", "03:31"],
    image: configAlbums + "7.jpg",
    source: randomSource
  }, {
    title: "Disturbed - The Interview",
    year: 2010,
    tintColor: "#29252B",
    songs: ["Touring (Dan Donegan)", "Number One Album", "Song Identity", "Wheelchair On Stage", "John Moyer's Audition", "Time Off", "Influences", "Recording", "So Much Darkness", "Spirituality", "Closer To The People"],
    time: ["04:32", "05:59", "04:12", "05:32", "03:21", "05:30", "06:03", "04:13", "05:41", "04:45", "07:29"],
    image: configAlbums + "6.jpg",
    source: randomSource
  }, {
    title: "Asylum",
    year: 2010,
    tintColor: "#291B18",
    songs: ["Remnants", "Asylum", "The Infection", "Warrior", "Another Way To Die", "Never Again", "The Animal", "Crucified", "Serpentine", "My Child", "Sacrifice", "Innocence", "ISHFWILF", "Down With The Sickness", "Stricken"],
    time: ["02:43", "04:36", "04:08", "03:24", "04:13", "03:33", "04:13", "04:37", "04:09", "03:18", "04:00", "04:31", "05:26", "05:53", "04:17"],
    image: configAlbums + "5.jpg",
    source: randomSource
  }, {
    title: "Indestructible",
    year: 2008,
    tintColor: "#D29552",
    songs: ["Indestructible", "Inside The Fire", "Deceiver", "The Night", "Perfect Insanity", "Haunted", "Enough", "The Curse", "Torn", "Criminal", "Divide", "Façade", "Stricken", "Down With The Sickness", "Just Stop"],
    time: ["04:38", "03:51", "03:49", "04:46", "03:56", "04:42", "04:20", "03:24", "04:09", "04:15", "03:36", "03:45", "04:27", "05:14", "03:51"],
    image: configAlbums + "4.jpg",
    source: randomSource
  }, {
    title: "Ten Thousand Fists",
    year: 2005,
    tintColor: "#41322E",
    songs: ["Ten Thousand Fists", "Just Stop", "Guarded", "Deify", "Stricken", "I'm Alive", "Sons Of Plunder", "Overburdened", "Decadence", "Forgiven", "Land Of Confusion", "Sacred Lie", "Pain Redefined", "Avarice"],
    time: ["03:32", "03:43", "03:20", "04:16", "04:05", "04:42", "03:48", "05:57", "03:24", "04:12", "04:47", "03:05", "04:07", "02:56"],
    image: configAlbums + "3.jpg",
    source: randomSource
  }, {
    title: "Music As A Weapon II",
    year: 2004,
    tintColor: "#3C2520",
    songs: ["Loading The Weapon", "Bound", "Myself", "Dehumanized", "Forfeit", "Fade To Black", "Empty", "Sumtimes", "Darkness", "Bruises", "Prayer", "The Red", "Poem", "Stupify (With Pete Loeffler & Joey Duenas)"],
    time: ["02:34", "03:53", "03:34", "03:43", "04:05", "04:25", "04:01", "04:41", "04:01", "02:48", "03:47", "03:44", "03:19", "04:28"],
    image: configAlbums + "2.jpg",
    source: randomSource
  }, {
    title: "Believe",
    year: 2002,
    tintColor: "#741F24",
    songs: ["Prayer", "Liberate", "Awaken", "Believe", "Remember", "Intoxication", "Rise", "Mistress", "Breathe", "Bound", "Devour", "Darkness"],
    time: ["03:39", "03:27", "04:29", "04:27", "04:08", "03:11", "03:55", "03:45", "04:19", "03:51", "03:46", "03:56"],
    image: configAlbums + "1.jpg",
    source: randomSource
  }, {
    title: "The Sickness",
    year: 2000,
    tintColor: "#26453D",
    songs: ["Voices", "The Game", "Stupify", "Down With the Sickness", "Violence Fetish", "Fear", "Numb", "Want", "Conflict", "Shout 2000", "Droppin' Plates", "Meaning Of Life"],
    time: ["03:11", "03:47", "04:34", "04:39", "03:23", "03:45", "03:44", "03:51", "04:35", "04:18", "03:48", "04:02"],
    image: configAlbums + "0.jpg",
    source: randomSource
  }
];

exports.albumsData = albumsDataYears;


},{}],"card":[function(require,module,exports){
var Artist, Contrast, SongCreator, TextLayer, config,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = require("text").TextLayer;

Contrast = require('contrast');

SongCreator = require('create_song');

Artist = require('artist');

config = Artist.config;

exports.Card = (function(superClass) {
  extend(Card, superClass);

  function Card(options) {
    var base, base1, base2, base3, base4, base5, base6, base7, base8;
    this.options = options != null ? options : {};
    if ((base = this.options).albumID == null) {
      base.albumID = -1;
    }
    if ((base1 = this.options).imageLayer == null) {
      base1.imageLayer = null;
    }
    if ((base2 = this.options).songsArray == null) {
      base2.songsArray = null;
    }
    if ((base3 = this.options).buttonLayer == null) {
      base3.buttonLayer = null;
    }
    if ((base4 = this.options).contentLayer == null) {
      base4.contentLayer = null;
    }
    if ((base5 = this.options).localFontColor == null) {
      base5.localFontColor = "black";
    }
    if ((base6 = this.options).localContentColor == null) {
      base6.localContentColor = "white";
    }
    if ((base7 = this.options).cardColor == null) {
      base7.cardColor = "black";
    }
    if ((base8 = this.options).isContentShown == null) {
      base8.isContentShown = false;
    }
    Card.__super__.constructor.call(this, this.options);
  }

  Card.define('albumID', {
    get: function() {
      return this.options.albumID;
    },
    set: function(value) {
      return this.options.albumID = value;
    }
  });

  Card.define('imageLayer', {
    get: function() {
      return this.options.imageLayer;
    },
    set: function(value) {
      return this.options.imageLayer = value;
    }
  });

  Card.define('songsArray', {
    get: function() {
      return this.options.songsArray;
    },
    set: function(value) {
      return this.options.songsArray = value;
    }
  });

  Card.define('contentLayer', {
    get: function() {
      return this.options.contentLayer;
    },
    set: function(value) {
      return this.options.contentLayer = value;
    }
  });

  Card.define('localFontColor', {
    get: function() {
      return this.options.localFontColor;
    },
    set: function(value) {
      return this.options.localFontColor = value;
    }
  });

  Card.define('localContentColor', {
    get: function() {
      return this.options.localContentColor;
    },
    set: function(value) {
      return this.options.localContentColor = value;
    }
  });

  Card.define('cardColor', {
    get: function() {
      return this.options.cardColor;
    },
    set: function(value) {
      return this.options.cardColor = value;
    }
  });

  Card.prototype.initAlbumView = function(albumID) {
    var albumTitle, albumYear, image, image_bg, topView;
    this.cardColor = new Color("" + Artist.albumsData[albumID].tintColor);
    this.localFontColor = Contrast.returnTextColor(this.cardColor);
    this.localContentColor = Contrast.returnContentColor(this.cardColor);
    this.width = 640;
    this.height = 108 * 2 + 108;
    this.borderRadius = 20;
    this.borderWidth = 4;
    this.borderColor = new Color({
      r: this.localFontColor.r,
      g: this.localFontColor.g,
      b: this.localFontColor.b,
      a: 0.2
    });
    this.albumID = albumID;
    this.backgroundColor = this.cardColor;
    topView = new Layer({
      width: 640,
      height: 108 * 2,
      backgroundColor: "null",
      parent: this
    });
    this.buttonLayer = topView;
    image_bg = new Layer({
      width: 156,
      height: 156,
      x: 36,
      y: 28,
      backgroundColor: "rgba(255,255,255,0)",
      shadowY: 2,
      shadowBlur: 8,
      shadowColor: "rgba(0,0,0,0.2)",
      parent: this
    });
    image = new Layer({
      width: 156,
      height: 156,
      x: 36,
      y: 28,
      image: "" + Artist.albumsData[albumID].image,
      parent: this
    });
    albumTitle = new TextLayer({
      parent: this,
      text: "" + Artist.albumsData[albumID].title,
      width: 210 * 2,
      height: 50 * 2,
      x: 108 * 2,
      y: 14 * 2,
      fontSize: 18 * 2,
      fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
      textAlign: "left",
      color: this.localFontColor,
      letterSpacing: 0.2
    });
    return albumYear = new TextLayer({
      parent: this,
      text: "" + Artist.albumsData[albumID].year,
      width: 200 * 2,
      height: 50 * 2,
      x: 108 * 2,
      y: 74 * 2,
      fontSize: 13 * 2,
      fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
      textAlign: "left",
      color: this.localFontColor,
      opacity: 0.8,
      letterSpacing: 0.2
    });
  };

  Card.prototype.returnButtonLayer = function() {
    return this.buttonLayer;
  };

  Card.prototype.returnSongsArray = function() {
    return this.songsArray;
  };

  Card.prototype.returnContentLayer = function() {
    return this.contentLayer;
  };

  Card.prototype.initContent = function() {
    var albumSongs, content, i, j, len, shuffleBreaker, shuffleTitle, song, studio;
    content = new Layer({
      width: 616,
      height: 874,
      x: 8,
      y: 108 * 2,
      borderRadius: 12,
      backgroundColor: this.localContentColor,
      propagateEvents: false,
      parent: this,
      name: "contentLayer " + this.albumID
    });
    this.contentLayer = content;
    shuffleBreaker = new Layer({
      width: 616,
      height: 2,
      x: 0,
      y: 48 * 2,
      backgroundColor: this.localFontColor,
      opacity: 0.2,
      parent: this.contentLayer
    });
    shuffleTitle = new TextLayer({
      parent: this.contentLayer,
      text: "Перемешать альбом",
      width: 284 * 2,
      height: 18 * 2,
      x: 12 * 2,
      y: 15 * 2,
      fontSize: 15 * 2,
      fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
      textAlign: "left",
      color: this.localFontColor,
      opacity: 0.8,
      letterSpacing: 0.2
    });
    albumSongs = SongCreator.createSongsForAlbum(this.albumID, this.localFontColor);
    this.songsArray = albumSongs;
    for (i = j = 0, len = albumSongs.length; j < len; i = ++j) {
      song = albumSongs[i];
      song.y = song.height * i + 48 * 2;
      song.parent = this.contentLayer;
      song.albumID = this.albumID;
      song.propagateEvents = false;
    }
    this.contentLayer.height = albumSongs[0].height * albumSongs.length + 14 * 2 + 60 + 8 * 2;
    studio = new Layer({
      width: 208,
      height: 24,
      x: 216,
      image: "images/studio.png",
      parent: this.contentLayer,
      y: albumSongs[0].height * albumSongs.length + 14 * 2 + 60 + 8 * 2 + 108 * 2 + 20 - 108 * 2
    });
    return this.height = song.height * albumSongs.length + 14 * 2 + 60 + 8 * 2 + 108 * 2 + 20 + 20 + studio.height + 4;
  };

  Card.prototype.desroyContent = function() {
    return Utils.delay(0.5, (function(_this) {
      return function() {
        var j, len, ref, song;
        _this.height = 108 * 3;
        if (typeof _this.contentLayer !== "undefined" && _this.contentLayer !== null) {
          _this.contentLayer.parent = null;
          _this.contentLayer.opacity = 0;
          _this.contentLayer.destroy();
        }
        if (typeof _this.songsArray !== "undefined" && _this.songsArray !== null) {
          ref = _this.songsArray;
          for (j = 0, len = ref.length; j < len; j++) {
            song = ref[j];
            song.destroy();
          }
          return _this.songArray = null;
        }
      };
    })(this));
  };

  return Card;

})(Layer);


},{"artist":"artist","contrast":"contrast","create_song":"create_song","text":"text"}],"contrast":[function(require,module,exports){
exports.getColorContrastOf = function(color1, color2) {
  var L1, L1B, L1G, L1R, L2, L2B, L2G, L2R, cr, temp;
  L1R = color1.r;
  if (L1R <= 0.03928) {
    L1R = color1.r / 12.92;
  } else {
    L1R = Math.pow((L1R + 0.055) / 1.055, 2.4);
  }
  L1G = color1.g;
  if (L1G <= 0.03928) {
    L1G = color1.g / 12.92;
  } else {
    L1G = Math.pow((L1G + 0.055) / 1.055, 2.4);
  }
  L1B = color1.b;
  if (L1B <= 0.03928) {
    L1B = color1.b / 12.92;
  } else {
    L1B = Math.pow((L1B + 0.055) / 1.055, 2.4);
  }
  L2R = color2.r;
  if (L2R <= 0.03928) {
    L2R = color2.r / 12.92;
  } else {
    L2R = Math.pow((L2R + 0.055) / 1.055, 2.4);
  }
  L2G = color2.g;
  if (L2G <= 0.03928) {
    L2G = color2.g / 12.92;
  } else {
    L2G = Math.pow((L2G + 0.055) / 1.055, 2.4);
  }
  L2B = color2.b;
  if (L2B <= 0.03928) {
    L2B = color2.b / 12.92;
  } else {
    L2B = Math.pow((L2B + 0.055) / 1.055, 2.4);
  }
  L1 = 0.2126 * L1R + 0.7152 * L1G + 0.0722 * L1B;
  L2 = 0.2126 * L2R + 0.7152 * L2G + 0.0722 * L2B;
  if (L1 <= L2) {
    temp = L2;
    L2 = L1;
    L1 = temp;
  }
  cr = ((L1 + 0.05) / (L2 + 0.05)).toFixed(1);
  return cr;
};

exports.getLightenValue = function(color) {
  var baseColor, baseColorFixed, correctIndex, cv, i, j;
  baseColor = color;
  baseColorFixed = color;
  correctIndex = 0;
  for (i = j = 0; j < 100; i = ++j) {
    correctIndex = i;
    baseColorFixed = baseColor.lighten(i);
    cv = this.getColorContrastOf(baseColor, baseColorFixed);
    if (cv > 10) {
      break;
    }
  }
  return correctIndex;
};

exports.getDarkenValue = function(color) {
  var baseColor, baseColorFixed, correctIndex, cv, i, j;
  baseColor = color;
  baseColorFixed = color;
  correctIndex = 0;
  for (i = j = 10; j < 100; i = ++j) {
    correctIndex = i;
    baseColorFixed = baseColor.darken(i);
    cv = this.getColorContrastOf(baseColor, baseColorFixed);
    if (cv > 3) {
      break;
    }
  }
  return correctIndex;
};

exports.returnContentColor = function(color) {
  var returnColor;
  returnColor = "rgba(255,255,255,0.1)";
  return new Color(returnColor);
};

exports.returnTextColor = function(color) {
  var changedValue, cv1, cv2, localFontColor;
  cv1 = this.getColorContrastOf(color, new Color("#000"));
  cv2 = this.getColorContrastOf(color, new Color("#FFF"));
  localFontColor = color;
  changedValue = 0;
  if (color.h < 0.0001 && color.l < 0.14) {
    localFontColor = new Color("#FFF");
    changedValue = this.getDarkenValue(localFontColor);
    if (typeof changedValue !== "undefined" && changedValue !== null) {
      changedValue = 50;
    }
    localFontColor = localFontColor.darken(changedValue);
  } else if (color.h > 200) {
    localFontColor = new Color("#FFF");
    changedValue = this.getDarkenValue(localFontColor);
    localFontColor = localFontColor.darken(changedValue);
  } else if (cv1 < cv2) {
    changedValue = this.getLightenValue(localFontColor);
    localFontColor = localFontColor.lighten(changedValue);
  } else {
    changedValue = this.getDarkenValue(localFontColor);
    localFontColor = localFontColor.darken(changedValue);
  }
  return localFontColor;
};


},{}],"create_song":[function(require,module,exports){
var Artist, Song, TextLayer, config;

Song = require("song").Song;

TextLayer = require("text").TextLayer;

Artist = require("artist");

config = Artist.config;

exports.createSongsForAlbum = function(albumID, fontColor) {
  var i, j, len, ref, song, songs;
  songs = [];
  ref = Artist.albumsData[albumID].songs;
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    song = ref[i];
    songs.push(this.createAlbumSong(albumID, i, fontColor));
  }
  return songs;
};

exports.createAlbumSong = function(albumID, songNumber, fontColor) {
  var breaker, songTitle, songView;
  songView = new Song({
    width: 292 * 2,
    height: 48 * 2,
    backgroundColor: "null",
    albumID: albumID,
    songID: songNumber,
    songTitle: Artist.albumsData[albumID].songs[songNumber]
  });
  breaker = new Layer({
    width: 528,
    height: 2,
    x: 28 * 2,
    y: 47 * 2,
    backgroundColor: fontColor,
    parent: songView,
    opacity: 0.1
  });
  songTitle = new TextLayer({
    parent: songView,
    text: "" + songView.songTitle,
    width: 264 * 2,
    height: 40,
    x: 28 * 2,
    y: 14 * 2,
    fontSize: 32,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: fontColor,
    letterSpacing: 0.2
  });
  songNumber = new TextLayer({
    parent: songView,
    text: "" + (songNumber + 1),
    width: 18 * 2,
    height: 14 * 2,
    x: 0,
    y: 17 * 2,
    fontSize: 24,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "right",
    color: fontColor,
    letterSpacing: 0,
    opacity: 0.5
  });
  return songView;
};


},{"artist":"artist","song":"song","text":"text"}],"detailed_album":[function(require,module,exports){
var Artist, SongCreator, TextLayer, animateDetailedAlbumPage, closeDetailedAlbumPage, config, localDisappearTime, localNewsDetailedAppearCurve, localNewsDetailedCloseCurve;

SongCreator = require('create_song');

Artist = require("artist");

TextLayer = require("text").TextLayer;

config = Artist.config;

localDisappearTime = 0.2;

localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)";

localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)";

animateDetailedAlbumPage = function(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY, status_bar_color) {
  var i, item, j, len, localArtist, localStatusBarArtist, results;
  album_fake_image.width = Utils.modulate(songsScrollView.content.y, bounds, [640, offsetValue.width], true);
  album_fake_image.height = Utils.modulate(songsScrollView.content.y, bounds, [640, offsetValue.height], true);
  album_fake_image.x = Utils.modulate(songsScrollView.content.y, bounds, [0, offsetValue.x], true);
  album_fake_image.y = Utils.modulate(songsScrollView.content.y, bounds, [0, offsetValue.y], true);
  album_fake_image_darker.opacity = Utils.modulate(songsScrollView.content.y, bounds, [1, 0.4]);
  album_fake_image_darker.width = album_fake_image.width;
  album_fake_image_darker.height = album_fake_image.height;
  localArtist = Utils.modulate(songsScrollView.content.y, bounds, [0.8, 0], true);
  detailedAlbumView.backgroundColor = "rgba(0,0,0," + localArtist + ")";
  localStatusBarArtist = Utils.modulate(songsScrollView.content.y, bounds, [0, 1], true);
  status_bar_color.backgroundColor = "" + Artist.colorTheme.navigation_header_background_color + localStatusBarArtist + ")";
  results = [];
  for (i = j = 0, len = albumOptions.length; j < len; i = ++j) {
    item = albumOptions[i];
    item.opacity = Utils.modulate(songsScrollView.content.y, bounds, [1, 0.4]);
    results.push(item.y = Utils.modulate(songsScrollView.content.y, bounds, [albumOptionsY[i], albumOptionsY[i] + offsetValue.y / 2 + (i + 1) * 20]));
  }
  return results;
};

closeDetailedAlbumPage = function(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions, status_bar_color) {
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
  status_bar_color.animate({
    properties: {
      backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)"
    },
    time: localDisappearTime,
    curve: localNewsDetailedAppearCurve
  });
  return Utils.delay(localDisappearTime + 0.02, function() {
    return detailedAlbumView.destroy();
  });
};

exports.createDetailedAlbumPage = function(albumID, offsetValue, status_bar_color) {
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
    image: "" + Artist.albumsData[albumID].image
  });
  album_fake_image_darker = new Layer({
    parent: album_fake_image,
    opacity: 0,
    width: 640,
    height: 640,
    backgroundColor: Artist.colorTheme.navigation_blur_color
  });
  album_fake_image_darker.style = {
    '-webkit-backdrop-filter': Artist.colorTheme.navigation_blur_radius
  };
  albumTitle = new TextLayer({
    parent: detailedAlbumView,
    text: "" + Artist.albumsData[albumID].title,
    width: 292 * 2,
    height: 48,
    x: 28,
    y: 84 * 2,
    fontSize: 40,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "center",
    color: Artist.colorTheme.detailed_album_title,
    letterSpacing: 0.2,
    opacity: 0
  });
  albumYear = new TextLayer({
    parent: detailedAlbumView,
    text: "" + Artist.albumsData[albumID].year,
    width: 292 * 2,
    height: 48,
    x: 28,
    y: 114 * 2,
    fontSize: 32,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "center",
    color: Artist.colorTheme.detailed_album_year,
    letterSpacing: 0.2,
    opacity: 0
  });
  closeNewsDetailedTopView = new Layer({
    width: 72,
    height: 72,
    x: 142 * 2,
    y: 34 * 2,
    image: config + "/closeAlbum.png",
    parent: detailedAlbumView,
    opacity: 0
  });
  albumSongsView = new Layer({
    parent: detailedAlbumView,
    width: 640,
    height: 708,
    y: 1136,
    backgroundColor: Artist.colorTheme.detailed_album_background
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
  status_bar_color.animate({
    properties: {
      backgroundColor: Artist.colorTheme.navigation_header_background_color + "0)"
    },
    time: localDisappearTime,
    curve: localNewsDetailedAppearCurve
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
  bounds = [20, 220];
  boundsBottom = [-(songResultHeight - songsScrollView.height + bounds[0]), -(songResultHeight - songsScrollView.height + bounds[1])];
  songsScrollView.on(Events.Scroll, function() {
    if (songsScrollView.content.y > bounds[0]) {
      animateDetailedAlbumPage(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY, status_bar_color);
    }
    if (songsScrollView.content.y < boundsBottom[0]) {
      return animateDetailedAlbumPage(songsScrollView, boundsBottom, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY, status_bar_color);
    }
  });
  songsScrollView.on(Events.ScrollEnd, function() {
    if (songsScrollView.content.y > (bounds[1] - bounds[0]) / 5 * 2) {
      songsScrollView.ignoreEvents = true;
      closingAlbumView = true;
      closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions, status_bar_color);
    }
    if (songsScrollView.content.y < (boundsBottom[1] - boundsBottom[0]) / 5 * 2 + boundsBottom[0]) {
      songsScrollView.ignoreEvents = true;
      closingAlbumView = true;
      return closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions, status_bar_color);
    }
  });
  songsScrollView.on(Events.Move, function() {
    if (songsScrollView.content.y > bounds[0] && !closingAlbumView) {
      animateDetailedAlbumPage(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY, status_bar_color);
    }
    if (songsScrollView.content.y < boundsBottom[0] && !closingAlbumView) {
      return animateDetailedAlbumPage(songsScrollView, boundsBottom, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY, status_bar_color);
    }
  });
  closeNewsDetailedTopView.on(Events.Tap, function() {
    songsScrollView.ignoreEvents = true;
    closingAlbumView = true;
    return closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions, status_bar_color);
  });
  return [detailedAlbumView, songs];
};


},{"artist":"artist","create_song":"create_song","text":"text"}],"detailed_news":[function(require,module,exports){
var Artist, closeDetailedView, closeDetailedViewOneWay, closeDetailedViewTwoWays, config, localDisappearTime, localNewsDetailedAppearCurve, localNewsDetailedCloseCurve;

localDisappearTime = 0.34;

localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)";

localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)";

Artist = require("artist");

config = Artist.config;

closeDetailedViewTwoWays = function(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color) {
  return closeDetailedView(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color, 1136);
};

closeDetailedViewOneWay = function(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color) {
  return closeDetailedView(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color, -1136);
};

closeDetailedView = function(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color, valueY) {
  newsDetailedTopView.animate({
    properties: {
      y: -88 * 3
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  newsDetailedContent.animate({
    properties: {
      y: valueY
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  newsDetailedView.animate({
    properties: {
      backgroundColor: "rgba(0,0,0,0)"
    },
    time: localDisappearTime
  });
  status_bar_color.animate({
    properties: {
      backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)"
    },
    time: localDisappearTime / 2
  });
  return Utils.delay(localDisappearTime + 0.02, function() {
    return newsDetailedView.destroy();
  });
};

exports.createNewsDetailedPage = function(newsArtistModel, status_bar_color) {
  var blurDetailedTopView, closeNewsDetailedTopView, gapBottom, gapDelta, gapTop, isNewsViewModulating, newsDetailedContent, newsDetailedContentScroll, newsDetailedContentTextImage, newsDetailedContentTextView, newsDetailedTopView, newsDetailedView, shareNewsDetailedTopView;
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
    image: newsArtistModel.image
  });
  blurDetailedTopView = new Layer({
    parent: newsDetailedTopView,
    width: newsDetailedTopView.width,
    height: newsDetailedTopView.height,
    backgroundColor: Artist.colorTheme.navigation_blur_color
  });
  blurDetailedTopView.style = {
    '-webkit-backdrop-filter': Artist.colorTheme.navigation_blur_radius
  };
  closeNewsDetailedTopView = new Layer({
    width: 64 * 2,
    height: 64 * 2,
    x: 0,
    y: 20 * 2,
    backgroundColor: "rgba(0,0,0,0)",
    image: config + "/closeNewsPage.png",
    parent: newsDetailedTopView
  });
  shareNewsDetailedTopView = new Layer({
    width: 244,
    height: 72,
    x: 376,
    y: 72,
    image: config + "/shareNewsDetailedView.png",
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
  newsDetailedContentTextView = new Layer({
    width: 640,
    height: 1680,
    backgroundColor: "white",
    parent: newsDetailedContentScroll.content
  });
  newsDetailedContentTextImage = new Layer({
    parent: newsDetailedContentTextView,
    width: 640,
    height: 1680,
    backgroundColor: "white",
    image: newsArtistModel.textImage
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
  status_bar_color.animate({
    properties: {
      backgroundColor: Artist.colorTheme.navigation_header_background_color + "0)"
    },
    time: localDisappearTime
  });
  gapBottom = -860;
  gapTop = 10;
  gapDelta = 200;
  isNewsViewModulating = false;
  Utils.delay(localDisappearTime, function() {
    return isNewsViewModulating = true;
  });
  newsDetailedContentScroll.on(Events.Move, function(event, layer) {
    var bounds, localBackgroundOpacityValue, localStatusBarArtist;
    if (newsDetailedContentScroll.content.y > gapTop && isNewsViewModulating) {
      bounds = [gapTop, gapTop + gapDelta];
      newsDetailedTopView.y = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, -88], true);
      closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true);
      newsDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")";
      localStatusBarArtist = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, 1], true);
      status_bar_color.backgroundColor = Artist.colorTheme.navigation_header_background_color + localStatusBarArtist + ")";
    }
    if (newsDetailedContentScroll.content.y < gapBottom && isNewsViewModulating) {
      bounds = [gapBottom, gapBottom - gapDelta];
      closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true);
      newsDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")";
      localStatusBarArtist = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, 1], true);
      return status_bar_color.backgroundColor = Artist.colorTheme.navigation_header_background_color + localStatusBarArtist + ")";
    }
  });
  newsDetailedContentScroll.on(Events.Scroll, function(event, layer) {
    if (newsDetailedContentScroll.content.y < gapBottom - gapDelta / 5 * 2) {
      newsDetailedContentScroll.ignoreEvents = true;
      isNewsViewModulating = false;
      closeDetailedViewOneWay(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color);
    }
    if (newsDetailedContentScroll.content.y > gapTop + gapDelta / 5 * 2) {
      newsDetailedContentScroll.ignoreEvents = true;
      isNewsViewModulating = false;
      return closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color);
    }
  });
  closeNewsDetailedTopView.on(Events.Tap, function() {
    newsDetailedContentScroll.ignoreEvents = true;
    isNewsViewModulating = false;
    closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color);
    return newsDetailedView.animate({
      properties: {
        backgroundColor: "rgba(0,0,0,0)"
      },
      time: localDisappearTime / 2
    });
  });
  return newsDetailedView;
};


},{"artist":"artist"}],"detailed_playlist":[function(require,module,exports){
var Artist, Playlist, closeDetailedView, closeDetailedViewOneWay, closeDetailedViewTwoWays, config, localDisappearTime, localNewsDetailedAppearCurve, localNewsDetailedCloseCurve;

localDisappearTime = 0.34;

localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)";

localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)";

Artist = require("artist");

config = Artist.config;

Playlist = require("playlist").Playlist;

closeDetailedViewTwoWays = function(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color) {
  return closeDetailedView(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color, 1136);
};

closeDetailedViewOneWay = function(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color) {
  return closeDetailedView(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color, -1136);
};

closeDetailedView = function(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color, valueY) {
  newsDetailedTopView.animate({
    properties: {
      y: -88 * 3
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  newsDetailedContent.animate({
    properties: {
      y: valueY
    },
    time: localDisappearTime,
    curve: localNewsDetailedCloseCurve
  });
  playlistDetailedView.animate({
    properties: {
      backgroundColor: "rgba(0,0,0,0)"
    },
    time: localDisappearTime
  });
  status_bar_color.animate({
    properties: {
      backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)"
    },
    time: localDisappearTime / 2
  });
  return Utils.delay(localDisappearTime + 0.02, function() {
    return playlistDetailedView.destroy();
  });
};

exports.createPlaylistDetailedPage = function(playlistID, status_bar_color) {
  var blurDetailedTopView, closeNewsDetailedTopView, gapBottom, gapDelta, gapTop, isNewsViewModulating, newsDetailedContent, newsDetailedContentScroll, newsDetailedContentTextImage, newsDetailedContentTextView, newsDetailedTopView, playlistDetailedView, playlistModel, shareNewsDetailedTopView;
  playlistModel = Artist.playlistsData[playlistID];
  playlistDetailedView = new Layer({
    width: 640,
    height: 1136,
    backgroundColor: "rgba(0,0,0,0)"
  });
  newsDetailedTopView = new Layer({
    parent: playlistDetailedView,
    width: 640,
    height: 88 * 2,
    y: -88 * 2,
    backgroundColor: "transparent",
    image: playlistModel.image
  });
  blurDetailedTopView = new Layer({
    parent: newsDetailedTopView,
    width: newsDetailedTopView.width,
    height: newsDetailedTopView.height,
    backgroundColor: Artist.colorTheme.navigation_blur_color
  });
  blurDetailedTopView.style = {
    '-webkit-backdrop-filter': Artist.colorTheme.navigation_blur_radius
  };
  closeNewsDetailedTopView = new Layer({
    width: 64 * 2,
    height: 64 * 2,
    x: 0,
    y: 20 * 2,
    backgroundColor: "rgba(0,0,0,0)",
    image: config + "/closeNewsPage.png",
    parent: newsDetailedTopView
  });
  shareNewsDetailedTopView = new Layer({
    width: 244,
    height: 72,
    x: 376,
    y: 72,
    image: config + "/shareNewsDetailedView.png",
    parent: newsDetailedTopView
  });
  newsDetailedContent = new Layer({
    width: 640,
    height: 1136 - 88 * 2 - 60 * 2,
    y: 1136,
    parent: playlistDetailedView,
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
  newsDetailedContentTextView = new Layer({
    width: 640,
    height: 1680,
    backgroundColor: "white",
    parent: newsDetailedContentScroll.content
  });
  newsDetailedContentTextImage = new Playlist({
    parent: newsDetailedContentTextView,
    playlistID: playlistID,
    width: 640,
    height: 1680,
    backgroundColor: "white",
    image: playlistModel.textImage
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
  playlistDetailedView.animate({
    properties: {
      backgroundColor: "rgba(0,0,0,0.9)"
    },
    time: localDisappearTime
  });
  status_bar_color.animate({
    properties: {
      backgroundColor: Artist.colorTheme.navigation_header_background_color + "0)"
    },
    time: localDisappearTime
  });
  gapBottom = -860;
  gapTop = 0;
  gapDelta = 200;
  isNewsViewModulating = false;
  Utils.delay(localDisappearTime, function() {
    return isNewsViewModulating = true;
  });
  newsDetailedContentScroll.on(Events.Move, function(event, layer) {
    var bounds, localBackgroundOpacityValue, localStatusBarArtist;
    if (newsDetailedContentScroll.content.y > gapTop && isNewsViewModulating) {
      bounds = [gapTop, gapTop + gapDelta];
      newsDetailedTopView.y = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, -88], true);
      closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true);
      playlistDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")";
      localStatusBarArtist = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, 1], true);
      status_bar_color.backgroundColor = Artist.colorTheme.navigation_header_background_color + localStatusBarArtist + ")";
    }
    if (newsDetailedContentScroll.content.y < gapBottom && isNewsViewModulating) {
      bounds = [gapBottom, gapBottom - gapDelta];
      closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true);
      localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true);
      playlistDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")";
      localStatusBarArtist = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, 1], true);
      return status_bar_color.backgroundColor = Artist.colorTheme.navigation_header_background_color + localStatusBarArtist + ")";
    }
  });
  newsDetailedContentScroll.on(Events.ScrollEnd, function(event, layer) {
    if (newsDetailedContentScroll.content.y < gapBottom - gapDelta / 5 * 2) {
      newsDetailedContentScroll.ignoreEvents = true;
      isNewsViewModulating = false;
      closeDetailedViewOneWay(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color);
    }
    if (newsDetailedContentScroll.content.y > gapTop + gapDelta / 5 * 2) {
      newsDetailedContentScroll.ignoreEvents = true;
      isNewsViewModulating = false;
      return closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color);
    }
  });
  closeNewsDetailedTopView.on(Events.Tap, function() {
    newsDetailedContentScroll.ignoreEvents = true;
    isNewsViewModulating = false;
    closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, playlistDetailedView, status_bar_color);
    return playlistDetailedView.animate({
      properties: {
        backgroundColor: "rgba(0,0,0,0)"
      },
      time: localDisappearTime / 2
    });
  });
  return [playlistDetailedView, newsDetailedContentTextImage];
};


},{"artist":"artist","playlist":"playlist"}],"nav":[function(require,module,exports){
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


},{}],"old/color-backup/base":[function(require,module,exports){
var config, greys_base, greys_black, greys_darker, greys_darkest, greys_lighter, greys_lightest, greys_pre_white, greys_ultra_light, greys_white;

config = "artists/troll";

greys_white = "#FFFFFF";

greys_pre_white = "#F7F7F7";

greys_ultra_light = "#EEEEEE";

greys_lightest = "#DDDDDD";

greys_lighter = "#CCCCCC";

greys_base = "#999999";

greys_darker = "#666666";

greys_darkest = "#222222";

greys_black = "#000000";

exports.colorTheme = {
  navigation_header_background: "white",
  navigation_overlay_background: config + "/navigation darker.png",
  navigation_background: config + "/bg.png",
  navigation_shadow: "red",
  navigation_scroll_background: "red",
  player_background: "red",
  player_progress_base: "blue",
  player_progress_filled: "green",
  player_song_title: "yellow",
  player_album_title: "blue",
  player_shadows: "green",
  album_shadow: "yellow",
  detailed_album_background: "grey",
  detailed_album_song_title: "red",
  detailed_album_song_number: "blue",
  detailed_album_song_time: "red",
  fav_songs_title: "white"
};


},{}],"old/color-backup/troll":[function(require,module,exports){
var config, greys_base, greys_black, greys_darker, greys_darkest, greys_lighter, greys_lightest, greys_pre_white, greys_ultra_light, greys_white;

config = "artists/troll";

greys_white = "#FFFFFF";

greys_pre_white = "#F7F7F7";

greys_ultra_light = "#EEEEEE";

greys_lightest = "#DDDDDD";

greys_lighter = "#CCCCCC";

greys_base = "#999999";

greys_darker = "#666666";

greys_darkest = "#222222";

greys_black = "#000000";

exports.colorTheme = {
  navigation_header_background: "black",
  navigation_overlay_background: config + "/navigation darker.png",
  navigation_background: config + "/bg.png",
  navigation_shadow: "rgba(0,0,0,0.5)",
  navigation_scroll_background: "rgba(0,0,0,0.1)",
  player_background: "rgba(29,29,29,1)",
  player_progress_base: "#666666",
  player_progress_filled: "#AF1417",
  player_song_title: "#FFFFFF",
  player_album_title: "rgba(255,255,255,0.5)",
  player_shadows: "rgba(0,0,0,0.5)",
  album_shadow: "rgba(0,0,0,0.5)",
  detailed_album_background: "#222",
  detailed_album_song_title: "#FFFFFF",
  detailed_album_song_number: "#999",
  detailed_album_song_time: "#999",
  fav_songs_title: "rgba(255,255,255,0.5)"
};


},{}],"old/data-backup/troll":[function(require,module,exports){
var albumModel1, albumModel2, albumModel3, config;

config = "artists/troll";

albumModel1 = {
  title: "Emotional 8",
  year: "2014",
  songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"],
  image: config + "/albums/0.jpg",
  tintColor: "grey",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

albumModel2 = {
  title: "May 13",
  year: "2014",
  songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice", "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix", "Nevsky Pr", "Bloody Waters", "Knock out"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45", "3:08", "3:08", "3:08"],
  image: config + "/albums/1.jpg",
  tintColor: "white",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

albumModel3 = {
  title: "Emotional 8",
  year: "2014",
  songs: ["Hydro", "Dreamland", "Hate", "Blunt", "Neon Clouds", "Stay", "Aurora", "Noir", "Aurora Remix"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08"],
  image: config + "/albums/2.jpg",
  tintColor: "grey",
  source: ["1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"]
};

exports.albumsData = [albumModel1, albumModel2, albumModel3];

exports.favList = {
  songs: ["Nimbus 2000", "Rollingstoner", "Houston", "Thunderjuice", "May 13", "Gloucoma", "Chavron Ocean", "The Dome", "Plan B", "May 13 Remix"],
  source: ["1.m4a", "2.m4a", "1.m4a", "2.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a", "1.m4a"],
  time: ["3:08", "2:45", "3:08", "2:45", "2:45", "3:08", "3:08", "3:08", "3:08", "2:45"],
  albums: [0, 1, 2, 0, 0, 1, 2, 2, 1, 0]
};


},{}],"old/feed-backup/troll":[function(require,module,exports){
var config, songModel0, songModel1, songModel10, songModel2, songModel3, songModel4, songModel5, songModel6, songModel7, songModel8, songModel9;

config = "artists/troll";

songModel0 = {
  image: config + "/news/full/0.jpg",
  coverImage: config + "/news/covers/0.jpg",
  textImage: config + "/news/text/0.jpg"
};

songModel1 = {
  image: config + "/news/full/1.jpg",
  coverImage: config + "/news/covers/1.jpg",
  textImage: config + "/news/text/1.jpg"
};

songModel2 = {
  image: config + "/news/full/2.jpg",
  coverImage: config + "/news/covers/2.jpg",
  textImage: config + "/news/text/2.jpg"
};

songModel3 = {
  image: config + "/news/full/3.jpg",
  coverImage: config + "/news/covers/3.jpg",
  textImage: config + "/news/text/3.jpg"
};

songModel4 = {
  image: config + "/news/full/4.jpg",
  coverImage: config + "/news/covers/4.jpg",
  textImage: config + "/news/text/4.jpg"
};

songModel5 = {
  image: config + "/news/full/5.jpg",
  coverImage: config + "/news/covers/5.jpg",
  textImage: config + "/news/text/5.jpg"
};

songModel6 = {
  image: config + "/news/full/6.jpg",
  coverImage: config + "/news/covers/6.jpg",
  textImage: config + "/news/text/6.jpg"
};

songModel7 = {
  image: config + "/news/full/7.jpg",
  coverImage: config + "/news/covers/7.jpg",
  textImage: config + "/news/text/7.jpg"
};

songModel8 = {
  image: config + "/news/full/8.jpg",
  coverImage: config + "/news/covers/8.jpg",
  textImage: config + "/news/text/8.jpg"
};

songModel9 = {
  image: config + "/news/full/9.jpg",
  coverImage: config + "/news/covers/9.jpg",
  textImage: config + "/news/text/9.jpg"
};

songModel10 = {
  image: config + "/news/full/10.jpg",
  coverImage: config + "/news/covers/10.jpg",
  textImage: config + "/news/text/10.jpg"
};

exports.feedData = [songModel0, songModel1, songModel2, songModel3, songModel4, songModel5, songModel6, songModel7, songModel8, songModel9, songModel10];


},{}],"old/youtube-backup/youtube":[function(require,module,exports){
var config, videoModel0, videoModel1, videoModel2, videoModel3, videoModel4, videoModel5;

config = "artists/troll";

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


},{}],"play_song":[function(require,module,exports){
var Artist, Time, config, songPath;

Time = require('timefromsec');

Artist = require("artist");

config = Artist.config;

songPath = config + "/songs/";

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
  playerSongAlbum.text = Artist.albumsArtist[playingSongAlbumID].title + " – " + Artist.albumsArtist[playingSongAlbumID].year;
  Utils.delay(.3, function() {
    durationRight.html = "-" + Time.timeFromSeconds(music.player.duration);
    return scrubber.max = ~~music.player.duration;
  });
  return music.player.play();
};


},{"artist":"artist","timefromsec":"timefromsec"}],"playlist":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Playlist = (function(superClass) {
  extend(Playlist, superClass);

  function Playlist(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).playlistID == null) {
      base.playlistID = -1;
    }
    Playlist.__super__.constructor.call(this, this.options);
  }

  Playlist.define('playlistID', {
    get: function() {
      return this.options.playlistID;
    },
    set: function(value) {
      return this.options.playlistID = value;
    }
  });

  return Playlist;

})(Layer);


},{}],"skipCard":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.SkipCard = (function(superClass) {
  extend(SkipCard, superClass);

  function SkipCard(options) {
    var base;
    this.options = options != null ? options : {};
    if ((base = this.options).cardID == null) {
      base.cardID = -1;
    }
    SkipCard.__super__.constructor.call(this, this.options);
  }

  SkipCard.define('cardID', {
    get: function() {
      return this.options.cardID;
    },
    set: function(value) {
      return this.options.cardID = value;
    }
  });

  return SkipCard;

})(Layer);


},{}],"song":[function(require,module,exports){
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


},{"text":"text"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL3llYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvdmlkZW8uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvdGltZWZyb21zZWMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvdGV4dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0yNCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMi5mcmFtZXIvbW9kdWxlcy9zb25nLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL3NraXBDYXJkLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL3BsYXlsaXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL3BsYXlfc29uZy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0yNCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMi5mcmFtZXIvbW9kdWxlcy9vbGQveW91dHViZSBiYWNrdXAveW91dHViZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0yNCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMi5mcmFtZXIvbW9kdWxlcy9vbGQvZmVlZCBiYWNrdXAvdHJvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvb2xkL2RhdGEgYmFja3VwL3Ryb2xsLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL29sZC9jb2xvciBiYWNrdXAvdHJvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvb2xkL2NvbG9yIGJhY2t1cC9iYXNlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL25ld3MuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvbmF2LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL2RldGFpbGVkX3BsYXlsaXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL2RldGFpbGVkX25ld3MuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvZGV0YWlsZWRfYWxidW0uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvY3JlYXRlX3NvbmcuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvY29udHJhc3QuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvY2FyZC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0yNCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMi5mcmFtZXIvbW9kdWxlcy9hcnRpc3QuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvYXJ0aXN0cyBiYWNrdXAvdHJvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMjQgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDIuZnJhbWVyL21vZHVsZXMvYXJ0aXN0cyBiYWNrdXAvc3BsZWFuLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL2FydGlzdHMgYmFja3VwL3NwbGVhbiAyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL2FsYnVtLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL2FsYnVtVmlldy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0yNCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMi5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTI0IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAyLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ7VGV4dExheWVyfSA9IHJlcXVpcmUgXCJ0ZXh0XCJcblxuY2xhc3MgZXhwb3J0cy5ZZWFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMueWVhcklEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAneWVhcklEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy55ZWFySURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnllYXJJRCA9IHZhbHVlXG5cblxuXHRcdFx0IiwiY2xhc3MgZXhwb3J0cy5WaWRlbyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMudmlkZW9JRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ3ZpZGVvSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsImV4cG9ydHMudGltZUZyb21TZWNvbmRzID0gKHNlY29uZHMpIC0+XG5cdGlmIHNlY29uZHMgPiAwXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHNlY29uZHMgKiAxMDAwKS50b0lTT1N0cmluZygpLnN1YnN0cigxNSwgNClcblx0ZWxzZVxuXHRcdHJldHVybiBcIjA6MDBcIiIsImNsYXNzIFRleHRMYXllciBleHRlbmRzIExheWVyXG5cdFx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblx0XHRAZG9BdXRvU2l6ZSA9IGZhbHNlXG5cdFx0QGRvQXV0b1NpemVIZWlnaHQgPSBmYWxzZVxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcImhzbGEoNjAsIDkwJSwgNDclLCAuNClcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuY29sb3IgPz0gXCJyZWRcIlxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAxLjI1XG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiSGVsdmV0aWNhXCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDIwXG5cdFx0b3B0aW9ucy50ZXh0ID89IFwiVXNlIGxheWVyLnRleHQgdG8gYWRkIHRleHRcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLWxpbmVcIiAjIGFsbG93IFxcbiBpbiAudGV4dFxuXHRcdEBzdHlsZS5vdXRsaW5lID0gXCJub25lXCIgIyBubyBib3JkZXIgd2hlbiBzZWxlY3RlZFxuXHRcdFxuXHRzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSwgcHhTdWZmaXggPSBmYWxzZSkgLT5cblx0XHRAc3R5bGVbcHJvcGVydHldID0gaWYgcHhTdWZmaXggdGhlbiB2YWx1ZStcInB4XCIgZWxzZSB2YWx1ZVxuXHRcdEBlbWl0KFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsIHZhbHVlKVxuXHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0XHRcblx0Y2FsY1NpemU6IC0+XG5cdFx0c2l6ZUFmZmVjdGluZ1N0eWxlcyA9XG5cdFx0XHRsaW5lSGVpZ2h0OiBAc3R5bGVbXCJsaW5lLWhlaWdodFwiXVxuXHRcdFx0Zm9udFNpemU6IEBzdHlsZVtcImZvbnQtc2l6ZVwiXVxuXHRcdFx0Zm9udFdlaWdodDogQHN0eWxlW1wiZm9udC13ZWlnaHRcIl1cblx0XHRcdHBhZGRpbmdUb3A6IEBzdHlsZVtcInBhZGRpbmctdG9wXCJdXG5cdFx0XHRwYWRkaW5nUmlnaHQ6IEBzdHlsZVtcInBhZGRpbmctcmlnaHRcIl1cblx0XHRcdHBhZGRpbmdCb3R0b206IEBzdHlsZVtcInBhZGRpbmctYm90dG9tXCJdXG5cdFx0XHRwYWRkaW5nTGVmdDogQHN0eWxlW1wicGFkZGluZy1sZWZ0XCJdXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiBAc3R5bGVbXCJ0ZXh0LXRyYW5zZm9ybVwiXVxuXHRcdFx0Ym9yZGVyV2lkdGg6IEBzdHlsZVtcImJvcmRlci13aWR0aFwiXVxuXHRcdFx0bGV0dGVyU3BhY2luZzogQHN0eWxlW1wibGV0dGVyLXNwYWNpbmdcIl1cblx0XHRcdGZvbnRGYW1pbHk6IEBzdHlsZVtcImZvbnQtZmFtaWx5XCJdXG5cdFx0XHRmb250U3R5bGU6IEBzdHlsZVtcImZvbnQtc3R5bGVcIl1cblx0XHRcdGZvbnRWYXJpYW50OiBAc3R5bGVbXCJmb250LXZhcmlhbnRcIl1cblx0XHRjb25zdHJhaW50cyA9IHt9XG5cdFx0aWYgQGRvQXV0b1NpemVIZWlnaHQgdGhlbiBjb25zdHJhaW50cy53aWR0aCA9IEB3aWR0aFxuXHRcdHNpemUgPSBVdGlscy50ZXh0U2l6ZSBAdGV4dCwgc2l6ZUFmZmVjdGluZ1N0eWxlcywgY29uc3RyYWludHNcblx0XHRpZiBAc3R5bGUudGV4dEFsaWduIGlzIFwicmlnaHRcIlxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdFx0QHggPSBAeC1Ad2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0QGhlaWdodCA9IHNpemUuaGVpZ2h0XG5cblx0QGRlZmluZSBcImF1dG9TaXplXCIsXG5cdFx0Z2V0OiAtPiBAZG9BdXRvU2l6ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImF1dG9TaXplSGVpZ2h0XCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0QGRvQXV0b1NpemVIZWlnaHQgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiY29udGVudEVkaXRhYmxlXCIsXG5cdFx0c2V0OiAoYm9vbGVhbikgLT5cblx0XHRcdEBfZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSBib29sZWFuXG5cdFx0XHRAaWdub3JlRXZlbnRzID0gIWJvb2xlYW5cblx0XHRcdEBvbiBcImlucHV0XCIsIC0+IEBjYWxjU2l6ZSgpIGlmIEBkb0F1dG9TaXplXG5cdEBkZWZpbmUgXCJ0ZXh0XCIsXG5cdFx0Z2V0OiAtPiBAX2VsZW1lbnQudGV4dENvbnRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cdFx0XHRAZW1pdChcImNoYW5nZTp0ZXh0XCIsIHZhbHVlKVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiZm9udEZhbWlseVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250RmFtaWx5XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U2l6ZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U2l6ZS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U2l6ZVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxpbmVIZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGluZUhlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGluZUhlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRXZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFdlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFdlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTdHlsZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFN0eWxlXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFZhcmlhbnRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFZhcmlhbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFZhcmlhbnRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdUb3BcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1RvcC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1JpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdSaWdodC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nQm90dG9tXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdCb3R0b20ucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdMZWZ0XCIsXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJ0ZXh0QWxpZ25cIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dEFsaWduXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwidGV4dFRyYW5zZm9ybVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS50ZXh0VHJhbnNmb3JtIFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0VHJhbnNmb3JtXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwibGV0dGVyU3BhY2luZ1wiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5sZXR0ZXJTcGFjaW5nLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxldHRlclNwYWNpbmdcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsZW5ndGhcIiwgXG5cdFx0Z2V0OiAtPiBAdGV4dC5sZW5ndGhcblxuY29udmVydFRvVGV4dExheWVyID0gKGxheWVyKSAtPlxuXHR0ID0gbmV3IFRleHRMYXllclxuXHRcdG5hbWU6IGxheWVyLm5hbWVcblx0XHRmcmFtZTogbGF5ZXIuZnJhbWVcblx0XHRwYXJlbnQ6IGxheWVyLnBhcmVudFxuXHRcblx0Y3NzT2JqID0ge31cblx0Y3NzID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuY3NzXG5cdGNzcy5mb3JFYWNoIChydWxlKSAtPlxuXHRcdHJldHVybiBpZiBfLmluY2x1ZGVzIHJ1bGUsICcvKidcblx0XHRhcnIgPSBydWxlLnNwbGl0KCc6ICcpXG5cdFx0Y3NzT2JqW2FyclswXV0gPSBhcnJbMV0ucmVwbGFjZSgnOycsJycpXG5cdHQuc3R5bGUgPSBjc3NPYmpcblx0XG5cdGltcG9ydFBhdGggPSBsYXllci5fX2ZyYW1lckltcG9ydGVkRnJvbVBhdGhcblx0aWYgXy5pbmNsdWRlcyBpbXBvcnRQYXRoLCAnQDJ4J1xuXHRcdHQuZm9udFNpemUgKj0gMlxuXHRcdHQubGluZUhlaWdodCA9IChwYXJzZUludCh0LmxpbmVIZWlnaHQpKjIpKydweCdcblx0XHR0LmxldHRlclNwYWNpbmcgKj0gMlxuXHRcdFx0XHRcdFxuXHR0LnkgLT0gKHBhcnNlSW50KHQubGluZUhlaWdodCktdC5mb250U2l6ZSkvMiAjIGNvbXBlbnNhdGUgZm9yIGhvdyBDU1MgaGFuZGxlcyBsaW5lIGhlaWdodFxuXHR0LnkgLT0gdC5mb250U2l6ZSAqIDAuMSAjIHNrZXRjaCBwYWRkaW5nXG5cdHQueCAtPSB0LmZvbnRTaXplICogMC4wOCAjIHNrZXRjaCBwYWRkaW5nXG5cdHQud2lkdGggKz0gdC5mb250U2l6ZSAqIDAuNSAjIHNrZXRjaCBwYWRkaW5nXG5cblx0dC50ZXh0ID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuc3RyaW5nXG5cdGxheWVyLmRlc3Ryb3koKVxuXHRyZXR1cm4gdFxuXG5MYXllcjo6Y29udmVydFRvVGV4dExheWVyID0gLT4gY29udmVydFRvVGV4dExheWVyKEApXG5cbmNvbnZlcnRUZXh0TGF5ZXJzID0gKG9iaikgLT5cblx0Zm9yIHByb3AsbGF5ZXIgb2Ygb2JqXG5cdFx0aWYgbGF5ZXIuX2luZm8ua2luZCBpcyBcInRleHRcIlxuXHRcdFx0b2JqW3Byb3BdID0gY29udmVydFRvVGV4dExheWVyKGxheWVyKVxuXG4jIEJhY2t3YXJkcyBjb21wYWJpbGl0eS4gUmVwbGFjZWQgYnkgY29udmVydFRvVGV4dExheWVyKClcbkxheWVyOjpmcmFtZUFzVGV4dExheWVyID0gKHByb3BlcnRpZXMpIC0+XG4gICAgdCA9IG5ldyBUZXh0TGF5ZXJcbiAgICB0LmZyYW1lID0gQGZyYW1lXG4gICAgdC5zdXBlckxheWVyID0gQHN1cGVyTGF5ZXJcbiAgICBfLmV4dGVuZCB0LHByb3BlcnRpZXNcbiAgICBAZGVzdHJveSgpXG4gICAgdFxuXG5leHBvcnRzLlRleHRMYXllciA9IFRleHRMYXllclxuZXhwb3J0cy5jb252ZXJ0VGV4dExheWVycyA9IGNvbnZlcnRUZXh0TGF5ZXJzXG4iLCJjbGFzcyBleHBvcnRzLlNvbmcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLmFsYnVtSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5zb25nSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5hbGJ1bVRpdGxlID89IFwiTWF5IDE0XCJcblx0XHRAb3B0aW9ucy5zb25nVGl0bGUgPz0gXCLQodC+0LXQstGL0LUg0LPRg9Cx0YtcIlxuXHRcdFxuXHRcdCBcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRAZGVmaW5lICdhbGJ1bUlEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5hbGJ1bUlEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5hbGJ1bUlEID0gdmFsdWVcblx0XHRcdFxuXHRAZGVmaW5lICdzb25nSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnNvbmdJRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ0lEID0gdmFsdWVcblx0XHRcdFxuXHRAZGVmaW5lICdhbGJ1bVRpdGxlJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5hbGJ1bVRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5hbGJ1bVRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3NvbmdUaXRsZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ1RpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zb25nVGl0bGUgPSB2YWx1ZVxuXHRcdFx0IiwiY2xhc3MgZXhwb3J0cy5Ta2lwQ2FyZCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuY2FyZElEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAnY2FyZElEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5jYXJkSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmNhcmRJRCA9IHZhbHVlXG5cblxuXHRcdFx0IiwiY2xhc3MgZXhwb3J0cy5QbGF5bGlzdCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMucGxheWxpc3RJRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ3BsYXlsaXN0SUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnBsYXlsaXN0SURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnBsYXlsaXN0SUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsIlRpbWUgPSByZXF1aXJlICd0aW1lZnJvbXNlYydcblxuQXJ0aXN0ID0gcmVxdWlyZSBcImFydGlzdFwiXG5jb25maWcgPSBBcnRpc3QuY29uZmlnXG5cbnNvbmdQYXRoID0gY29uZmlnICsgXCIvc29uZ3MvXCJcblxuXG5cbmV4cG9ydHMucGxheVBsYXlsaXN0ID0gKHNvbmdJRCwgYWxidW1Nb2RlbCkgLT5cblx0c29uZ3NOYW1lcyA9IGFsYnVtTW9kZWwuc29uZ3Ncblx0c29uZ3NTb3VyY2UgPSBhbGJ1bU1vZGVsLnNvdXJjZVxuXHQjIHNvbmdzQWxidW1zID0gYWxidW1Nb2RlbC5hbGJ1bXNcblx0XG5cdHNvbmdzTmFtZUN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzTmFtZXMpXG5cdHNvbmdzU291cmNlQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NTb3VyY2UpXG5cdCMgc29uZ0FsYnVtSURDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc0FsYnVtcylcblx0XG5cdHBsYXlpbmdTb25nTmFtZSA9IFwiXCJcblx0cGxheWluZ1NvbmdTb3VyY2UgPSBcIlwiXG5cdHBsYXlpbmdTb25nQWxidW1JRCA9IDBcblx0Zm9yIGkgaW4gWzAuLnNvbmdJRF1cblx0XHRwbGF5aW5nU29uZ05hbWUgPSBzb25nc05hbWVDeWNsZXIoKVxuXHRcdHBsYXlpbmdTb25nU291cmNlXHQ9IHNvbmdQYXRoK3NvbmdzU291cmNlQ3ljbGVyKClcblx0XHQjIHBsYXlpbmdTb25nQWxidW1JRCA9IFV0aWxzLmN5Y2xlKHNvbmdzQWxidW1zKVxuXHRcdCMgcHJpbnQgcGxheWluZ1NvbmdBbGJ1bUlEXG5cdFxuXHRpZiBwYXVzZS5zdGF0ZXMuY3VycmVudCBpcyBcImhpZGRlblwiXG5cdFx0cGxheS5zdGF0ZXMubmV4dCgpXG5cdFx0cGF1c2Uuc3RhdGVzLm5leHQoKVxuXHRcblx0bXVzaWMudmlkZW8gPSBwbGF5aW5nU29uZ1NvdXJjZVxuXHRcblx0cGxheWVyU29uZ1RpdGxlLnRleHQgPSBwbGF5aW5nU29uZ05hbWVcblx0IyBwcmludCBwbGF5aW5nU29uZ0FsYnVtSURcblx0IyBwcmludCBBcnRpc3QuYWxidW1zQXJ0aXN0W3BsYXlpbmdTb25nQWxidW1JRF1cblx0cGxheWVyU29uZ0FsYnVtLnRleHQgPSBhbGJ1bU1vZGVsLnRpdGxlICsgXCIg4oCTIFwiICsgYWxidW1Nb2RlbC55ZWFyXG5cdFxuXHRVdGlscy5kZWxheSAuMywgLT4gXG5cdFx0ZHVyYXRpb25SaWdodC5odG1sID0gXCItXCIgKyBUaW1lLnRpbWVGcm9tU2Vjb25kcyBtdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XHRzY3J1YmJlci5tYXggPSB+fm11c2ljLnBsYXllci5kdXJhdGlvblxuXHRcblx0bXVzaWMucGxheWVyLnBsYXkoKVxuXG5cbmV4cG9ydHMucGxheUZhdlBsYXlsaXN0ID0gKHNvbmdJRCwgYWxidW1Nb2RlbCwgbXVzaWMsIHBsYXksIHBhdXNlLCBwbGF5ZXJTb25nVGl0bGUsIHBsYXllclNvbmdBbGJ1bSwgZHVyYXRpb25SaWdodCwgc2NydWJiZXIpIC0+XG5cdHNvbmdzTmFtZXMgPSBhbGJ1bU1vZGVsLnNvbmdzXG5cdHNvbmdzU291cmNlID0gYWxidW1Nb2RlbC5zb3VyY2Vcblx0c29uZ3NBbGJ1bXMgPSBhbGJ1bU1vZGVsLmFsYnVtc1xuXHRcblx0c29uZ3NOYW1lQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NOYW1lcylcblx0c29uZ3NTb3VyY2VDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc1NvdXJjZSlcblx0c29uZ0FsYnVtSURDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc0FsYnVtcylcblx0XG5cdHBsYXlpbmdTb25nTmFtZSA9IFwiXCJcblx0cGxheWluZ1NvbmdTb3VyY2UgPSBcIlwiXG5cdHBsYXlpbmdTb25nQWxidW1JRCA9IDBcblx0Zm9yIGkgaW4gWzAuLnNvbmdJRF1cblx0XHRwbGF5aW5nU29uZ05hbWUgPSBzb25nc05hbWVDeWNsZXIoKVxuXHRcdHBsYXlpbmdTb25nU291cmNlID0gc29uZ1BhdGgrc29uZ3NTb3VyY2VDeWNsZXIoKVxuXHRcdHBsYXlpbmdTb25nQWxidW1JRCA9IHNvbmdBbGJ1bUlEQ3ljbGVyKClcblx0XG5cdGlmIHBhdXNlLnN0YXRlcy5jdXJyZW50IGlzIFwiaGlkZGVuXCJcblx0XHRwbGF5LnN0YXRlcy5uZXh0KClcblx0XHRwYXVzZS5zdGF0ZXMubmV4dCgpXG5cdFxuXHRtdXNpYy52aWRlbyA9IHBsYXlpbmdTb25nU291cmNlXG5cdFxuXHRwbGF5ZXJTb25nVGl0bGUudGV4dCA9IHBsYXlpbmdTb25nTmFtZVxuXHRwbGF5ZXJTb25nQWxidW0udGV4dCA9IEFydGlzdC5hbGJ1bXNBcnRpc3RbcGxheWluZ1NvbmdBbGJ1bUlEXS50aXRsZSArIFwiIOKAkyBcIiArIEFydGlzdC5hbGJ1bXNBcnRpc3RbcGxheWluZ1NvbmdBbGJ1bUlEXS55ZWFyXG5cdFxuXHRVdGlscy5kZWxheSAuMywgLT4gXG5cdFx0ZHVyYXRpb25SaWdodC5odG1sID0gXCItXCIgKyBUaW1lLnRpbWVGcm9tU2Vjb25kcyBtdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XHRzY3J1YmJlci5tYXggPSB+fm11c2ljLnBsYXllci5kdXJhdGlvblxuXHRcblx0bXVzaWMucGxheWVyLnBsYXkoKVxuXG5cbiIsIiMgR2V0dGluZyBEYXRhXG5cbmNvbmZpZyA9IFwiYXJ0aXN0cy90cm9sbFwiXG5cbnZpZGVvTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzAuanBnXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzEuanBnXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8xLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzIuanBnXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8yLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwzID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzMuanBnXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8zLm1wNFwiXG59XG5cbnZpZGVvTW9kZWw0ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzQuanBnXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy80Lm1wNFwiXG59XG5cbnZpZGVvTW9kZWw1ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzUuanBnXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy81Lm1wNFwiXG59XG5cblxuZXhwb3J0cy5tb3ZpZXNEYXRhID0gW3ZpZGVvTW9kZWwwLCB2aWRlb01vZGVsMSwgdmlkZW9Nb2RlbDIsIHZpZGVvTW9kZWwzLCB2aWRlb01vZGVsNCwgdmlkZW9Nb2RlbDVdIiwiIyBHZXR0aW5nIERhdGFcblxuY29uZmlnID0gXCJhcnRpc3RzL3Ryb2xsXCJcblxuc29uZ01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8wLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzAuanBnXCJcbn1cblxuc29uZ01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEuanBnXCJcbn1cblxuc29uZ01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMi5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8yLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzIuanBnXCJcbn1cblxuc29uZ01vZGVsMyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8zLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzMuanBnXCJcbn1cblxuc29uZ01vZGVsNCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy80LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzQuanBnXCJcbn1cblxuc29uZ01vZGVsNSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy81LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzUuanBnXCJcbn1cblxuc29uZ01vZGVsNiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNi5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy82LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzYuanBnXCJcbn1cblxuc29uZ01vZGVsNyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy83LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzcuanBnXCJcbn1cblxuc29uZ01vZGVsOCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvOC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy84LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzguanBnXCJcbn1cblxuc29uZ01vZGVsOSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvOS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy85LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzkuanBnXCJcbn1cblxuc29uZ01vZGVsMTAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEwLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEwLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEwLmpwZ1wiXG59XG5cbmV4cG9ydHMuZmVlZERhdGEgPSBbc29uZ01vZGVsMCwgc29uZ01vZGVsMSwgc29uZ01vZGVsMiwgc29uZ01vZGVsMywgc29uZ01vZGVsNCwgc29uZ01vZGVsNSwgc29uZ01vZGVsNiwgc29uZ01vZGVsNywgc29uZ01vZGVsOCwgc29uZ01vZGVsOSwgc29uZ01vZGVsMTBdIiwiIyBHZXR0aW5nIERhdGFcblxuY29uZmlnID0gXCJhcnRpc3RzL3Ryb2xsXCJcblxuYWxidW1Nb2RlbDEgPSB7IFxuXHR0aXRsZTogXCJFbW90aW9uYWwgOFwiXG5cdHllYXI6IFwiMjAxNFwiXG5cdFxuXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG5cdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuXHRcblx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG5cdHRpbnRDb2xvcjogXCJncmV5XCJcblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cbn1cblxuYWxidW1Nb2RlbDIgPSB7IFxuXHR0aXRsZTogXCJNYXkgMTNcIlxuXHR5ZWFyOiBcIjIwMTRcIlxuXHRcblx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG5cdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cblx0XG5cdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCJdXG59XG5cbmFsYnVtTW9kZWwzID0geyBcblx0dGl0bGU6IFwiRW1vdGlvbmFsIDhcIlxuXHR5ZWFyOiBcIjIwMTRcIlxuXHRcblx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cblx0XG5cdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuXHR0aW50Q29sb3I6IFwiZ3JleVwiXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCJdXG59XG5cblxuXG5cblxuZXhwb3J0cy5hbGJ1bXNEYXRhID0gW2FsYnVtTW9kZWwxLCBhbGJ1bU1vZGVsMiwgYWxidW1Nb2RlbDNdXG5leHBvcnRzLmZhdkxpc3QgPSB7IFx0XG5cdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCJdXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cblx0XG5cdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIl1cblx0YWxidW1zOiBbMCwgMSwgMiwgMCwgMCwgMSwgMiwgMiwgMSwgMF1cbn1cblxuXG4iLCJjb25maWcgPSBcImFydGlzdHMvdHJvbGxcIlxuXG5ncmV5c193aGl0ZSA9IFwiI0ZGRkZGRlwiXG5ncmV5c19wcmVfd2hpdGUgPSBcIiNGN0Y3RjdcIlxuZ3JleXNfdWx0cmFfbGlnaHQgPSBcIiNFRUVFRUVcIlxuZ3JleXNfbGlnaHRlc3QgPSBcIiNERERERERcIlxuZ3JleXNfbGlnaHRlciA9IFwiI0NDQ0NDQ1wiXG5ncmV5c19iYXNlID0gXCIjOTk5OTk5XCJcbmdyZXlzX2RhcmtlciA9IFwiIzY2NjY2NlwiXG5ncmV5c19kYXJrZXN0ID0gXCIjMjIyMjIyXCJcbmdyZXlzX2JsYWNrID0gXCIjMDAwMDAwXCJcblxuXG5leHBvcnRzLmNvbG9yVGhlbWUgPSB7XG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmQ6IFwiYmxhY2tcIlxuXHRuYXZpZ2F0aW9uX292ZXJsYXlfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBkYXJrZXIucG5nXCJcblx0IyBuYXZpZ2F0aW9uX2hlYWRlcl90ZXh0OiBcIiNGRkZGRkZcIlxuXHRcblx0bmF2aWdhdGlvbl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9iZy5wbmdcIlxuXHRuYXZpZ2F0aW9uX3NoYWRvdzogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF9iYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC4xKVwiXG5cdCMgbmF2aWdhdGlvbl9ibHVyOiBcIiNGRkZGRkZcIlxuXHQjIG5hdmlnYXRpb25fY2FyZF9vdmVybGF5X2JhY2tncm91bmQ6IFwiI0ZGRkZGRlwiXG5cblx0cGxheWVyX2JhY2tncm91bmQ6IFwicmdiYSgyOSwyOSwyOSwxKVwiXG5cdHBsYXllcl9wcm9ncmVzc19iYXNlOiBcIiM2NjY2NjZcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfZmlsbGVkOiBcIiNBRjE0MTdcIlxuXHRwbGF5ZXJfc29uZ190aXRsZTogXCIjRkZGRkZGXCJcblx0cGxheWVyX2FsYnVtX3RpdGxlOiBcInJnYmEoMjU1LDI1NSwyNTUsMC41KVwiXG5cdHBsYXllcl9zaGFkb3dzOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cblx0YWxidW1fc2hhZG93OiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdGRldGFpbGVkX2FsYnVtX2JhY2tncm91bmQ6IFwiIzIyMlwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGU6IFwiI0ZGRkZGRlwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfbnVtYmVyOiBcIiM5OTlcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWU6IFwiIzk5OVwiXG5cdGZhdl9zb25nc190aXRsZTogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNSlcIlxufSIsImNvbmZpZyA9IFwiYXJ0aXN0cy90cm9sbFwiXG5cbmdyZXlzX3doaXRlID0gXCIjRkZGRkZGXCJcbmdyZXlzX3ByZV93aGl0ZSA9IFwiI0Y3RjdGN1wiXG5ncmV5c191bHRyYV9saWdodCA9IFwiI0VFRUVFRVwiXG5ncmV5c19saWdodGVzdCA9IFwiI0RERERERFwiXG5ncmV5c19saWdodGVyID0gXCIjQ0NDQ0NDXCJcbmdyZXlzX2Jhc2UgPSBcIiM5OTk5OTlcIlxuZ3JleXNfZGFya2VyID0gXCIjNjY2NjY2XCJcbmdyZXlzX2Rhcmtlc3QgPSBcIiMyMjIyMjJcIlxuZ3JleXNfYmxhY2sgPSBcIiMwMDAwMDBcIlxuXG5cbmV4cG9ydHMuY29sb3JUaGVtZSA9IHtcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZDogXCJ3aGl0ZVwiXG5cdG5hdmlnYXRpb25fb3ZlcmxheV9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGRhcmtlci5wbmdcIlxuXHQjIG5hdmlnYXRpb25faGVhZGVyX3RleHQ6IFwiI0ZGRkZGRlwiXG5cdFxuXHRuYXZpZ2F0aW9uX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL2JnLnBuZ1wiXG5cdG5hdmlnYXRpb25fc2hhZG93OiBcInJlZFwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX2JhY2tncm91bmQ6IFwicmVkXCJcblx0IyBuYXZpZ2F0aW9uX2JsdXI6IFwiI0ZGRkZGRlwiXG5cdCMgbmF2aWdhdGlvbl9jYXJkX292ZXJsYXlfYmFja2dyb3VuZDogXCIjRkZGRkZGXCJcblxuXHRwbGF5ZXJfYmFja2dyb3VuZDogXCJyZWRcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfYmFzZTogXCJibHVlXCJcblx0cGxheWVyX3Byb2dyZXNzX2ZpbGxlZDogXCJncmVlblwiXG5cdHBsYXllcl9zb25nX3RpdGxlOiBcInllbGxvd1wiXG5cdHBsYXllcl9hbGJ1bV90aXRsZTogXCJibHVlXCJcblx0cGxheWVyX3NoYWRvd3M6IFwiZ3JlZW5cIlxuXG5cdGFsYnVtX3NoYWRvdzogXCJ5ZWxsb3dcIlxuXHRkZXRhaWxlZF9hbGJ1bV9iYWNrZ3JvdW5kOiBcImdyZXlcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpdGxlOiBcInJlZFwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfbnVtYmVyOiBcImJsdWVcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWU6IFwicmVkXCJcblx0ZmF2X3NvbmdzX3RpdGxlOiBcIndoaXRlXCJcbn0iLCJjbGFzcyBleHBvcnRzLk5ld3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLm5ld3NJRCA/PSAtMVxuXHRcdEBvcHRpb25zLm5ld3NJbWFnZSA/PSAtMVxuXHRcdEBvcHRpb25zLm5ld3NUZXh0SW1hZ2UgPz0gLTFcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QC5ib3JkZXJSYWRpdXMgPSA4XG5cdFx0XG5cdEBkZWZpbmUgJ25ld3NJRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0lEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSUQgPSB2YWx1ZVxuXHRcdFx0XG5cdEBkZWZpbmUgJ25ld3NJbWFnZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0ltYWdlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSW1hZ2UgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnbmV3c1RleHRJbWFnZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c1RleHRJbWFnZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c1RleHRJbWFnZSA9IHZhbHVlXG5cdCIsImNsYXNzIGV4cG9ydHMuTmF2IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5uYXZJRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ25hdklEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5uYXZJRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmF2SUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsIlxubG9jYWxEaXNhcHBlYXJUaW1lID0gMC4zNFxubG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxubG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5cbkFydGlzdCA9IHJlcXVpcmUgXCJhcnRpc3RcIlxuY29uZmlnID0gQXJ0aXN0LmNvbmZpZ1xuXG57UGxheWxpc3R9ID0gcmVxdWlyZSBcInBsYXlsaXN0XCJcblxuXG5jbG9zZURldGFpbGVkVmlld1R3b1dheXMgPSAobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdGNsb3NlRGV0YWlsZWRWaWV3KG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yLCAxMTM2KVxuXG5jbG9zZURldGFpbGVkVmlld09uZVdheSA9IChuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0Y2xvc2VEZXRhaWxlZFZpZXcobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IsIC0xMTM2KVxuXG5cblxuY2xvc2VEZXRhaWxlZFZpZXcgPSAobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IsIHZhbHVlWSkgLT5cblx0XG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAtODgqM1xuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IHZhbHVlWVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XG5cdHBsYXlsaXN0RGV0YWlsZWRWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcblx0c3RhdHVzX2Jhcl9jb2xvci5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBcIjEpXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSArIDAuMDIsIC0+XG5cdFx0cGxheWxpc3REZXRhaWxlZFZpZXcuZGVzdHJveSgpXG5cblxuXG5cblxuXG5cbmV4cG9ydHMuY3JlYXRlUGxheWxpc3REZXRhaWxlZFBhZ2UgPSAocGxheWxpc3RJRCwgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0cGxheWxpc3RNb2RlbCA9IEFydGlzdC5wbGF5bGlzdHNEYXRhW3BsYXlsaXN0SURdXG5cdCMgcHJpbnQgcGxheWxpc3RNb2RlbC5pbWFnZVxuXHRcblx0cGxheWxpc3REZXRhaWxlZFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcblx0XG5cdCMgcGxheWxpc3REZXRhaWxlZFZpZXcub24gRXZlbnRzLlRhcCwgKGV2ZW50LCBsYXllcikgLT5cbiMgXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4jIFx0XHRwcmludCBcImluc2lkZSAje3RhcH1cIlxuXG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHBsYXlsaXN0RGV0YWlsZWRWaWV3XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogODgqMlxuXHRcdHk6IC04OCoyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRpbWFnZTogcGxheWxpc3RNb2RlbC5pbWFnZVxuXG5cdGJsdXJEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFRvcFZpZXdcblx0XHR3aWR0aDogbmV3c0RldGFpbGVkVG9wVmlldy53aWR0aFxuXHRcdGhlaWdodDogbmV3c0RldGFpbGVkVG9wVmlldy5oZWlnaHRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25fYmx1cl9jb2xvclxuXG5cdGJsdXJEZXRhaWxlZFRvcFZpZXcuc3R5bGUgPVxuXHRcdFx0Jy13ZWJraXQtYmFja2Ryb3AtZmlsdGVyJzogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9ibHVyX3JhZGl1c1xuXG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NCoyXG5cdFx0aGVpZ2h0OiA2NCoyXG5cdFx0eDogMFxuXHRcdHk6IDIwKjJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFx0aW1hZ2U6IGNvbmZpZyArIFwiL2Nsb3NlTmV3c1BhZ2UucG5nXCJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFRvcFZpZXdcblxuXHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogMjQ0XG5cdFx0aGVpZ2h0OiA3MlxuXHRcdHg6IDM3NlxuXHRcdHk6IDcyXG5cdFx0aW1hZ2U6IGNvbmZpZyArIFwiL3NoYXJlTmV3c0RldGFpbGVkVmlldy5wbmdcIlxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXHRcblx0XG5cblxuXHRuZXdzRGV0YWlsZWRDb250ZW50ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHR5OiAxMTM2XG5cdFx0cGFyZW50OiBwbGF5bGlzdERldGFpbGVkVmlld1xuXHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZVxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyYmdhKDAsMCwwLDApXCJcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzYtODgqMi02MCoyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50XG5cdFx0c3BlZWRZOiAwLjhcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNjgwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHQjIHk6IG5ld3NEZXRhaWxlZENvbnRlbnRJbWFnZS5oZWlnaHRcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudFxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRUZXh0SW1hZ2UgPSBuZXcgUGxheWxpc3Rcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRUZXh0Vmlld1xuXHRcdHBsYXlsaXN0SUQ6IHBsYXlsaXN0SURcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNjgwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRpbWFnZTogcGxheWxpc3RNb2RlbC50ZXh0SW1hZ2VcblxuXHRcblx0XG5cdFxuXHQjIG9wZW5pbmcgYW5pbWF0aW9uc1xuXHRcblx0bmV3c0RldGFpbGVkVG9wVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDg4KjJcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcdCMgY3VydmU6IFwiY3ViaWMtYmV6aWVyKC4wMSwxLC43OCwuODkpXCJcblx0XHRcblx0cGxheWxpc3REZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjkpXCJcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRcblx0XG5cdHN0YXR1c19iYXJfY29sb3IuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgXCIwKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblxuXG5cblx0Z2FwQm90dG9tID0gLTg2MFxuXHRnYXBUb3AgPSAwXG5cdGdhcERlbHRhID0gMjAwXG5cdFxuXHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSwgLT5cblx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IHRydWVcblx0XG5cdFxuXHRcblx0IyBjbG9zZSB2aWV3XG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwub24gRXZlbnRzLk1vdmUsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPiBnYXBUb3AgJiYgaXNOZXdzVmlld01vZHVsYXRpbmdcblx0XHRcdGJvdW5kcyA9IFtnYXBUb3AsIGdhcFRvcCtnYXBEZWx0YV1cblx0XHRcdG5ld3NEZXRhaWxlZFRvcFZpZXcueSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAtODhdLCB0cnVlKSBcblx0XHRcdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0bG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAuOSwgMF0sIHRydWUpXG5cdFx0XHRwbGF5bGlzdERldGFpbGVkVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgKyBcIilcIlxuXHRcdFx0bG9jYWxTdGF0dXNCYXJBcnRpc3QgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMCwgMV0sIHRydWUpXG5cdFx0XHRzdGF0dXNfYmFyX2NvbG9yLmJhY2tncm91bmRDb2xvciA9IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBsb2NhbFN0YXR1c0JhckFydGlzdCArIFwiKVwiXG5cdFx0XHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55IDwgZ2FwQm90dG9tICYmIGlzTmV3c1ZpZXdNb2R1bGF0aW5nXG5cdFx0XHRib3VuZHMgPSBbZ2FwQm90dG9tLCBnYXBCb3R0b20tZ2FwRGVsdGFdXG5cdFx0XHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLjksIDBdLCB0cnVlKVxuXHRcdFx0cGxheWxpc3REZXRhaWxlZFZpZXcuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLFwiICsgbG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlICsgXCIpXCJcblx0XHRcdGxvY2FsU3RhdHVzQmFyQXJ0aXN0ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAsIDFdLCB0cnVlKVxuXHRcdFx0c3RhdHVzX2Jhcl9jb2xvci5iYWNrZ3JvdW5kQ29sb3IgPSBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgbG9jYWxTdGF0dXNCYXJBcnRpc3QgKyBcIilcIlxuXHRcblx0XG5cdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLm9uIEV2ZW50cy5TY3JvbGxFbmQsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0IyBwcmludCBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueVxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55IDwgZ2FwQm90dG9tIC0gZ2FwRGVsdGEgLyA1ICogMlxuXHRcdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0XHQjIGNsb3NlRGV0YWlsZWRWaWV3KHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFx0Y2xvc2VEZXRhaWxlZFZpZXdPbmVXYXkobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPiBnYXBUb3AgKyBnYXBEZWx0YSAvIDUgKiAyXG5cdFx0XHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0XHRcdGNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XG5cdFxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub24gRXZlbnRzLlRhcCwgLT5cblx0XHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0Y2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFxuXHRcdHBsYXlsaXN0RGV0YWlsZWRWaWV3LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0XHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRcdFx0XG5cdFx0XG5cdFxuXHRcblx0cmV0dXJuIFtwbGF5bGlzdERldGFpbGVkVmlldywgbmV3c0RldGFpbGVkQ29udGVudFRleHRJbWFnZV0iLCIjIGxvY2FsRGlzYXBwZWFyVGltZSA9IDAuNVxuIyBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjA2LC44MSwwLC45MylcIlxuIyBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmUgPSBcImN1YmljLWJlemllciguMDYsLjgxLC43OSwuOTkpXCJcbmxvY2FsRGlzYXBwZWFyVGltZSA9IDAuMzRcbmxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmUgPSBcImN1YmljLWJlemllciguMzIsLjkyLC45MiwuOTkpXCJcbmxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxuXG5BcnRpc3QgPSByZXF1aXJlIFwiYXJ0aXN0XCJcbmNvbmZpZyA9IEFydGlzdC5jb25maWdcblxuXG5jbG9zZURldGFpbGVkVmlld1R3b1dheXMgPSAobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0Y2xvc2VEZXRhaWxlZFZpZXcobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvciwgMTEzNilcblxuXG5jbG9zZURldGFpbGVkVmlld09uZVdheSA9IChuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRjbG9zZURldGFpbGVkVmlldyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yLCAtMTEzNilcblxuXG5jbG9zZURldGFpbGVkVmlldyA9IChuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yLCB2YWx1ZVkpIC0+XG5cdFxuXHRuZXdzRGV0YWlsZWRUb3BWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogLTg4KjNcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFx0XG5cdG5ld3NEZXRhaWxlZENvbnRlbnQuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiB2YWx1ZVlcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRuZXdzRGV0YWlsZWRWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcblx0c3RhdHVzX2Jhcl9jb2xvci5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBcIjEpXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSswLjAyLCAtPlxuXHRcdG5ld3NEZXRhaWxlZFZpZXcuZGVzdHJveSgpXG5cblxuXG5cblxuXG5cbmV4cG9ydHMuY3JlYXRlTmV3c0RldGFpbGVkUGFnZSA9IChuZXdzQXJ0aXN0TW9kZWwsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdCMgcHJpbnQgbmV3c0FydGlzdE1vZGVsLmltYWdlXG5cdFxuXHRuZXdzRGV0YWlsZWRWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0XG5cdG5ld3NEZXRhaWxlZFZpZXcub24gRXZlbnRzLlRhcCwgLT5cblx0XHQjIHNraXAgdGFwc1xuXG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFZpZXdcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiA4OCoyXG5cdFx0eTogLTg4KjJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdGltYWdlOiBuZXdzQXJ0aXN0TW9kZWwuaW1hZ2VcblxuXHRibHVyRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cdFx0d2lkdGg6IG5ld3NEZXRhaWxlZFRvcFZpZXcud2lkdGhcblx0XHRoZWlnaHQ6IG5ld3NEZXRhaWxlZFRvcFZpZXcuaGVpZ2h0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2JsdXJfY29sb3JcblxuXHRibHVyRGV0YWlsZWRUb3BWaWV3LnN0eWxlID1cblx0XHRcdCctd2Via2l0LWJhY2tkcm9wLWZpbHRlcic6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25fYmx1cl9yYWRpdXNcblxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQqMlxuXHRcdGhlaWdodDogNjQqMlxuXHRcdHg6IDBcblx0XHR5OiAyMCoyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdGltYWdlOiBjb25maWcgKyBcIi9jbG9zZU5ld3NQYWdlLnBuZ1wiXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cblx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDI0NFxuXHRcdGhlaWdodDogNzJcblx0XHR4OiAzNzZcblx0XHR5OiA3MlxuXHRcdGltYWdlOiBjb25maWcgKyBcIi9zaGFyZU5ld3NEZXRhaWxlZFZpZXcucG5nXCJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFRvcFZpZXdcblx0XG5cdFxuXG5cblx0bmV3c0RldGFpbGVkQ29udGVudCA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzYtODgqMi02MCoyXG5cdFx0eTogMTEzNlxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVmlld1xuXHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZVxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyYmdhKDAsMCwwLDApXCJcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzYtODgqMi02MCoyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50XG5cdFx0c3BlZWRZOiAwLjhcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cblx0IyBuZXdzRGV0YWlsZWRDb250ZW50SW1hZ2UgPSBuZXcgTGF5ZXJcbiMgXHRcdHdpZHRoOiA2NDBcbiMgXHRcdGhlaWdodDogNDgwXG4jIFx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudFxuIyBcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiMgXHRcdGltYWdlOiBuZXdzQXJ0aXN0TW9kZWwuaW1hZ2VcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNjgwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHQjIHk6IG5ld3NEZXRhaWxlZENvbnRlbnRJbWFnZS5oZWlnaHRcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudFxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRUZXh0SW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRUZXh0Vmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDE2ODBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdGltYWdlOiBuZXdzQXJ0aXN0TW9kZWwudGV4dEltYWdlXG5cblx0XG5cdFxuXHRcblx0IyBvcGVuaW5nIGFuaW1hdGlvbnNcblx0XG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAwXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XG5cdG5ld3NEZXRhaWxlZENvbnRlbnQuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiA4OCoyXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XHQjIGN1cnZlOiBcImN1YmljLWJlemllciguMDEsMSwuNzgsLjg5KVwiXG5cdFx0XG5cdG5ld3NEZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjkpXCJcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRcblx0XG5cdHN0YXR1c19iYXJfY29sb3IuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgXCIwKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblxuXG5cblx0Z2FwQm90dG9tID0gLTg2MFxuXHRnYXBUb3AgPSAxMFxuXHRnYXBEZWx0YSA9IDIwMFxuXHRcblx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRVdGlscy5kZWxheSBsb2NhbERpc2FwcGVhclRpbWUsIC0+XG5cdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSB0cnVlXG5cdFxuXHRcblx0XG5cdCMgY2xvc2Ugdmlld1xuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLm9uIEV2ZW50cy5Nb3ZlLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55ID4gZ2FwVG9wICYmIGlzTmV3c1ZpZXdNb2R1bGF0aW5nXG5cdFx0XHRib3VuZHMgPSBbZ2FwVG9wLCBnYXBUb3ArZ2FwRGVsdGFdXG5cdFx0XHRuZXdzRGV0YWlsZWRUb3BWaWV3LnkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMCwgLTg4XSwgdHJ1ZSkgXG5cdFx0XHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLjksIDBdLCB0cnVlKVxuXHRcdFx0bmV3c0RldGFpbGVkVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgKyBcIilcIlxuXHRcdFx0bG9jYWxTdGF0dXNCYXJBcnRpc3QgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMCwgMV0sIHRydWUpXG5cdFx0XHRzdGF0dXNfYmFyX2NvbG9yLmJhY2tncm91bmRDb2xvciA9IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBsb2NhbFN0YXR1c0JhckFydGlzdCArIFwiKVwiXG5cdFx0XHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55IDwgZ2FwQm90dG9tICYmIGlzTmV3c1ZpZXdNb2R1bGF0aW5nXG5cdFx0XHRib3VuZHMgPSBbZ2FwQm90dG9tLCBnYXBCb3R0b20tZ2FwRGVsdGFdXG5cdFx0XHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLjksIDBdLCB0cnVlKVxuXHRcdFx0bmV3c0RldGFpbGVkVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgKyBcIilcIlxuXHRcdFx0bG9jYWxTdGF0dXNCYXJBcnRpc3QgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMCwgMV0sIHRydWUpXG5cdFx0XHRzdGF0dXNfYmFyX2NvbG9yLmJhY2tncm91bmRDb2xvciA9IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBsb2NhbFN0YXR1c0JhckFydGlzdCArIFwiKVwiXG5cdFxuXHRcblx0XG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwub24gRXZlbnRzLlNjcm9sbCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA8IGdhcEJvdHRvbSAtIGdhcERlbHRhIC8gNSAqIDJcblx0XHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdFx0Y2xvc2VEZXRhaWxlZFZpZXdPbmVXYXkobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA+IGdhcFRvcCArIGdhcERlbHRhIC8gNSAqIDJcblx0XHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdFx0Y2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpXG5cdFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdGNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFxuXHRcdG5ld3NEZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0XHRcblx0XHRcblx0XG5cdFxuXHRyZXR1cm4gbmV3c0RldGFpbGVkVmlldyIsIlNvbmdDcmVhdG9yID0gcmVxdWlyZSAnY3JlYXRlX3NvbmcnXG5BcnRpc3QgPSByZXF1aXJlIFwiYXJ0aXN0XCJcbntUZXh0TGF5ZXJ9ID0gcmVxdWlyZSBcInRleHRcIlxuY29uZmlnID0gQXJ0aXN0LmNvbmZpZ1xuXG5sb2NhbERpc2FwcGVhclRpbWUgPSAwLjJcbmxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmUgPSBcImN1YmljLWJlemllciguMzIsLjkyLC45MiwuOTkpXCJcbmxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxuXG5cbmFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZSA9IChzb25nc1Njcm9sbFZpZXcsIGJvdW5kcywgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZLCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRcblx0YWxidW1fZmFrZV9pbWFnZS53aWR0aCA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzY0MCwgb2Zmc2V0VmFsdWUud2lkdGhdLCB0cnVlKVxuXHRhbGJ1bV9mYWtlX2ltYWdlLmhlaWdodCA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzY0MCwgb2Zmc2V0VmFsdWUuaGVpZ2h0XSwgdHJ1ZSlcblx0YWxidW1fZmFrZV9pbWFnZS54ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMCwgb2Zmc2V0VmFsdWUueF0sIHRydWUpXG5cdGFsYnVtX2Zha2VfaW1hZ2UueSA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzAsIG9mZnNldFZhbHVlLnldLCB0cnVlKVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuNF0pXG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLndpZHRoID0gYWxidW1fZmFrZV9pbWFnZS53aWR0aFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5oZWlnaHQgPSBhbGJ1bV9mYWtlX2ltYWdlLmhlaWdodFxuXHRcdFxuXHRsb2NhbEFydGlzdCA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzAuOCwgMF0sIHRydWUpXG5cdGRldGFpbGVkQWxidW1WaWV3LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCxcIiArIGxvY2FsQXJ0aXN0ICsgXCIpXCJcblxuXHRsb2NhbFN0YXR1c0JhckFydGlzdCA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzAsIDFdLCB0cnVlKVxuXHQjIHByaW50IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBsb2NhbFN0YXR1c0JhckFydGlzdCArIFwiKVwiXG5cdHN0YXR1c19iYXJfY29sb3IuYmFja2dyb3VuZENvbG9yID0gXCJcIiArIEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBsb2NhbFN0YXR1c0JhckFydGlzdCArIFwiKVwiXG5cdFxuXHRmb3IgaXRlbSxpIGluIGFsYnVtT3B0aW9uc1xuXHRcdGl0ZW0ub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuNF0pXG5cdFx0aXRlbS55ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbYWxidW1PcHRpb25zWVtpXSwgYWxidW1PcHRpb25zWVtpXStvZmZzZXRWYWx1ZS55IC8gMiArIChpKzEpICogMjBdKVxuXG5cbmNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UgPSAoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0XG5cdGFsYnVtU29uZ3NWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogMTEzNlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XG5cdGFsYnVtX2Zha2VfaW1hZ2UuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR3aWR0aDogb2Zmc2V0VmFsdWUud2lkdGgsIGhlaWdodDogb2Zmc2V0VmFsdWUuaGVpZ2h0LCB4OiBvZmZzZXRWYWx1ZS54LCB5OiBvZmZzZXRWYWx1ZS55XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHRvcGFjaXR5OiAwXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFxuXHRkZXRhaWxlZEFsYnVtVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczoge2JhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJ9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdGRlbGF5OiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFxuXHRmb3IgaXRlbSBpbiBhbGJ1bU9wdGlvbnNcblx0XHRpdGVtLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6IHsgb3BhY2l0eTogMCwgeTogaXRlbS55ICsgNjB9XG5cdFx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyA0XG5cdFxuXHRzdGF0dXNfYmFyX2NvbG9yLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIFwiMSlcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XG5cdFxuXHRVdGlscy5kZWxheSBsb2NhbERpc2FwcGVhclRpbWUrMC4wMiwgLT5cblx0XHRkZXRhaWxlZEFsYnVtVmlldy5kZXN0cm95KClcblxuXG5cblxuXG4jIENvbXBvc2UgRGV0YWlsZWQgVmlld1x0XG5leHBvcnRzLmNyZWF0ZURldGFpbGVkQWxidW1QYWdlID0gKGFsYnVtSUQsIG9mZnNldFZhbHVlLCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRcblx0ZGV0YWlsZWRBbGJ1bVZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcblx0ZGV0YWlsZWRBbGJ1bVZpZXcub24gRXZlbnRzLlRhcCwgLT5cblx0XHQjIGlnbm9yZSBvdGhlciB0YXBzXG5cblxuXG5cblx0YWxidW1fZmFrZV9pbWFnZSA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogZGV0YWlsZWRBbGJ1bVZpZXdcblx0XHR3aWR0aDogb2Zmc2V0VmFsdWUud2lkdGhcblx0XHRoZWlnaHQ6IG9mZnNldFZhbHVlLmhlaWdodFxuXHRcdHg6IG9mZnNldFZhbHVlLnhcblx0XHR5OiBvZmZzZXRWYWx1ZS55XG5cdFx0aW1hZ2U6IFwiI3tBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS5pbWFnZX1cIlxuXG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBhbGJ1bV9mYWtlX2ltYWdlXG5cdFx0b3BhY2l0eTogMFxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDY0MFxuXHRcdGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9ibHVyX2NvbG9yXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5zdHlsZSA9XG5cdFx0XHQnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2JsdXJfcmFkaXVzXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0YWxidW1UaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IGRldGFpbGVkQWxidW1WaWV3XG5cdFx0dGV4dDogXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpdGxlfVwiXG5cdFx0d2lkdGg6IDI5MioyXG5cdFx0aGVpZ2h0OiA0OFxuXHRcdHg6IDI4XG5cdFx0eTogODQqMlxuXHRcdGZvbnRTaXplOiA0MFxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdGNvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5kZXRhaWxlZF9hbGJ1bV90aXRsZVxuXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcdG9wYWNpdHk6IDBcblx0XG5cdGFsYnVtWWVhciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IGRldGFpbGVkQWxidW1WaWV3XG5cdFx0dGV4dDogXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnllYXJ9XCJcblx0XHR3aWR0aDogMjkyKjJcblx0XHRoZWlnaHQ6IDQ4XG5cdFx0eDogMjhcblx0XHR5OiAxMTQqMlxuXHRcdGZvbnRTaXplOiAzMlxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdGNvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5kZXRhaWxlZF9hbGJ1bV95ZWFyXG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cdFx0b3BhY2l0eTogMFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDcyXG5cdFx0aGVpZ2h0OiA3MlxuXHRcdHg6IDE0MioyXG5cdFx0eTogMzQqMlxuXHRcdGltYWdlOiBjb25maWcgKyBcIi9jbG9zZUFsYnVtLnBuZ1wiXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdG9wYWNpdHk6IDBcblx0XG5cdGFsYnVtU29uZ3NWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDcwOFxuXHRcdHk6IDExMzZcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX2JhY2tncm91bmRcblxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGFsYnVtT3B0aW9ucyA9IFthbGJ1bVllYXIsIGFsYnVtVGl0bGUsIGNsb3NlTmV3c0RldGFpbGVkVG9wVmlld11cblx0YWxidW1PcHRpb25zWSA9IFthbGJ1bVllYXIueSwgYWxidW1UaXRsZS55LCBjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcueV1cblxuXHRhbGJ1bV9mYWtlX2ltYWdlLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0d2lkdGg6IDY0MCwgaGVpZ2h0OiA2NDAsIHg6IDAsIHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgb3BhY2l0eTogMSB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0Zm9yIGl0ZW0gaW4gYWxidW1PcHRpb25zXG5cdFx0aXRlbS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRcdFxuXHRkZXRhaWxlZEFsYnVtVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczoge2JhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOClcIn1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblxuXHRhbGJ1bVNvbmdzVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDMwOFxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDRcblxuXHRcblx0c3RhdHVzX2Jhcl9jb2xvci5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBcIjApXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cblxuXG5cblxuXG5cdCMgQ29tcG9zZSBzb25nIGZvciBhbGJ1bVxuXHRzb25nc1Njcm9sbFZpZXcgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogNzA4XG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRwYXJlbnQ6IGFsYnVtU29uZ3NWaWV3XG5cdFx0eTogMjBcblx0XHRzcGVlZFk6IDAuOFxuXG5cdHNvbmdzID0gU29uZ0NyZWF0b3IuY3JlYXRlU29uZ3NGb3JBbGJ1bShhbGJ1bUlEKVxuXHRzb25nUmVzdWx0SGVpZ2h0ID0gMFxuXHRmb3Igc29uZyxpIGluIHNvbmdzXG5cdFx0c29uZy55ID0gaSAqIDgwXG5cdFx0c29uZ1Jlc3VsdEhlaWdodCA9IHNvbmcueSArIHNvbmcuaGVpZ2h0XG5cdFx0c29uZy5wYXJlbnQgPSBzb25nc1Njcm9sbFZpZXcuY29udGVudFxuXHRcblx0XG5cdFxuXHRcblx0IyBDbG9zZSBBbGJ1bSBWaWV3XG5cdGNsb3NpbmdBbGJ1bVZpZXcgPSBmYWxzZVxuXHRib3VuZHMgPSBbMjAsIDIyMF1cblx0Ym91bmRzQm90dG9tID0gWy0oc29uZ1Jlc3VsdEhlaWdodCAtIHNvbmdzU2Nyb2xsVmlldy5oZWlnaHQgKyBib3VuZHNbMF0pLCAtKHNvbmdSZXN1bHRIZWlnaHQgLSBzb25nc1Njcm9sbFZpZXcuaGVpZ2h0ICsgYm91bmRzWzFdKV1cblx0XG5cdHNvbmdzU2Nyb2xsVmlldy5vbiBFdmVudHMuU2Nyb2xsLCAtPlxuXHRcdFxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPiBib3VuZHNbMF1cblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kcywgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZLCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPCBib3VuZHNCb3R0b21bMF1cblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kc0JvdHRvbSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZLCBzdGF0dXNfYmFyX2NvbG9yKVxuXG5cdFx0XHRcblx0XG5cblxuXG5cdHNvbmdzU2Nyb2xsVmlldy5vbiBFdmVudHMuU2Nyb2xsRW5kLCAtPlxuXHRcdFxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPiAoYm91bmRzWzFdLWJvdW5kc1swXSkgLyA1ICogMlxuXHRcdFx0c29uZ3NTY3JvbGxWaWV3Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGNsb3NpbmdBbGJ1bVZpZXcgPSB0cnVlXG5cdFx0XHRjbG9zZURldGFpbGVkQWxidW1QYWdlKGFsYnVtU29uZ3NWaWV3LCBhbGJ1bV9mYWtlX2ltYWdlLCBhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlciwgb2Zmc2V0VmFsdWUsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA8IChib3VuZHNCb3R0b21bMV0tYm91bmRzQm90dG9tWzBdKSAvIDUgKiAyICsgYm91bmRzQm90dG9tWzBdXG5cdFx0XHRzb25nc1Njcm9sbFZpZXcuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0Y2xvc2luZ0FsYnVtVmlldyA9IHRydWVcblx0XHRcdGNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcblx0XG5cdFxuXHRzb25nc1Njcm9sbFZpZXcub24gRXZlbnRzLk1vdmUsIC0+XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA+IGJvdW5kc1swXSBhbmQgIWNsb3NpbmdBbGJ1bVZpZXdcblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kcywgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZLCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA8IGJvdW5kc0JvdHRvbVswXSBhbmQgIWNsb3NpbmdBbGJ1bVZpZXdcblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kc0JvdHRvbSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZLCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcblx0XG5cdFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0c29uZ3NTY3JvbGxWaWV3Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRjbG9zaW5nQWxidW1WaWV3ID0gdHJ1ZVxuXHRcdGNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XG5cdFxuXG5cdHJldHVybiBbZGV0YWlsZWRBbGJ1bVZpZXcsIHNvbmdzXSIsIntTb25nfSA9IHJlcXVpcmUgXCJzb25nXCJcbntUZXh0TGF5ZXJ9ID0gcmVxdWlyZSBcInRleHRcIlxuXG5BcnRpc3QgPSByZXF1aXJlIFwiYXJ0aXN0XCJcbmNvbmZpZyA9IEFydGlzdC5jb25maWdcblxuXG5cbiMgU29uZyAoYWxidW1JRClcbmV4cG9ydHMuY3JlYXRlU29uZ3NGb3JBbGJ1bSA9IChhbGJ1bUlELCBmb250Q29sb3IpIC0+XG5cdHNvbmdzID0gW11cblx0Zm9yIHNvbmcsIGkgaW4gQXJ0aXN0LmFsYnVtc0RhdGFbYWxidW1JRF0uc29uZ3Ncblx0XHRzb25ncy5wdXNoKEAuY3JlYXRlQWxidW1Tb25nKGFsYnVtSUQsIGksIGZvbnRDb2xvcikpXG5cdHJldHVybiBzb25nc1xuXHRcblxuXG4jIGV4cG9ydHMuY3JlYXRlU29uZ3NGb3JGYXYgPSAoc29uZ3NMaXN0KSAtPlxuIyBcdHNvbmdzID0gW11cbiMgXHRmb3Igc29uZywgaSBpbiBzb25nc0xpc3Quc29uZ3NcbiMgXHRcdHNvbmdzLnB1c2goQC5jcmVhdGVTb25nKGkpKVxuIyBcdHJldHVybiBzb25nc1xuI1xuI1xuI1xuI1xuIyAjIFNvbmcgKGFsYnVtSUQsIHNvbmdOdW1iZXIpXG4jIGV4cG9ydHMuY3JlYXRlU29uZyA9IChzb25nTnVtYmVyKSAtPlxuI1xuIyBcdHNvbmdWaWV3ID0gbmV3IFNvbmdcbiMgXHRcdGhlaWdodDogODBcbiMgXHRcdGFsYnVtSUQ6IEFydGlzdC5mYXZMaXN0LmFsYnVtc1tzb25nTnVtYmVyXVxuIyBcdFx0c29uZ0lEOiBzb25nTnVtYmVyXG4jXG4jIFx0c29uZ0ltYWdlID0gbmV3IExheWVyXG4jIFx0XHRwYXJlbnQ6IHNvbmdWaWV3XG4jIFx0XHRpbWFnZTogQXJ0aXN0LmFsYnVtc0RhdGFbQXJ0aXN0LmZhdkxpc3QuYWxidW1zW3NvbmdOdW1iZXJdXS5pbWFnZVxuIyBcdFx0d2lkdGg6IDQ4KjJcbiMgXHRcdGhlaWdodDogNDgqMlxuIyBcdFx0eDogMzJcbiMgXHRcdHk6IDE2XG4jXG4jIFx0c29uZ1RpdGxlID0gbmV3IFRleHRMYXllclxuIyBcdFx0cGFyZW50OiBzb25nVmlld1xuIyBcdFx0dGV4dDogXCIje0FydGlzdC5mYXZMaXN0LnNvbmdzW3NvbmdOdW1iZXJdfVwiXG4jIFx0XHR3aWR0aDogNDQwXG4jIFx0XHRoZWlnaHQ6IDQ0XG4jIFx0XHR4OiAxNTZcbiMgXHRcdHk6IDIyXG4jIFx0XHRmb250U2l6ZTogMzZcbiMgXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuIyBcdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuIyBcdFx0Y29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGVcbiMgXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuI1xuIyBcdGFsYnVtVGl0bGUgPSBuZXcgVGV4dExheWVyXG4jIFx0XHRwYXJlbnQ6IHNvbmdWaWV3XG4jIFx0XHR0ZXh0OiBcIiN7QXJ0aXN0LmFsYnVtc0RhdGFbQXJ0aXN0LmZhdkxpc3QuYWxidW1zW3NvbmdOdW1iZXJdXS50aXRsZX1cIlxuIyBcdFx0d2lkdGg6IDQ0MFxuIyBcdFx0aGVpZ2h0OiAzNFxuIyBcdFx0eDogMTU2XG4jIFx0XHR5OiA2OFxuIyBcdFx0Zm9udFNpemU6IDI4XG4jIFx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcbiMgXHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcbiMgXHRcdGNvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5kZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWVcbiMgXHRcdGxldHRlclNwYWNpbmc6IDAuNVxuI1xuIyBcdHJldHVybiBzb25nVmlld1xuXG5cblxuXG4jIFNvbmcgKGFsYnVtSUQsIHNvbmdOdW1iZXIpXG5leHBvcnRzLmNyZWF0ZUFsYnVtU29uZyA9IChhbGJ1bUlELCBzb25nTnVtYmVyLCBmb250Q29sb3IpIC0+XG5cdFxuXHRzb25nVmlldyA9IG5ldyBTb25nXG5cdFx0d2lkdGg6IDI5MioyXG5cdFx0aGVpZ2h0OiA0OCoyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcdGFsYnVtSUQ6IGFsYnVtSURcblx0XHRzb25nSUQ6IHNvbmdOdW1iZXJcblx0XHRzb25nVGl0bGU6IEFydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzW3NvbmdOdW1iZXJdXG5cblx0YnJlYWtlciA9IG5ldyBMYXllciB3aWR0aDogNTI4LCBoZWlnaHQ6IDIsIHg6IDI4KjIsIHk6IDQ3KjIsIGJhY2tncm91bmRDb2xvcjogZm9udENvbG9yLCBwYXJlbnQ6IHNvbmdWaWV3LCBvcGFjaXR5OiAwLjFcblxuXHRzb25nVGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdHRleHQ6IFwiI3tzb25nVmlldy5zb25nVGl0bGV9XCJcblx0XHR3aWR0aDogMjY0KjJcblx0XHRoZWlnaHQ6IDQwXG5cdFx0eDogMjgqMlxuXHRcdHk6IDE0KjJcblx0XHRmb250U2l6ZTogMzJcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0Y29sb3I6IGZvbnRDb2xvclxuXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXG5cdCMgc29uZ0R1cmF0aW9uID0gbmV3IFRleHRMYXllclxuIyBcdFx0cGFyZW50OiBzb25nVmlld1xuIyBcdFx0dGV4dDogXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpbWVbc29uZ051bWJlcl19XCJcbiMgXHRcdHdpZHRoOiAxMjBcbiMgXHRcdGhlaWdodDogMzRcbiMgXHRcdHg6IDIzMioyKzI4XG4jIFx0XHR5OiAyNlxuIyBcdFx0Zm9udFNpemU6IDI4XG4jIFx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcbiMgXHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG4jIFx0XHRjb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUuZGV0YWlsZWRfYWxidW1fc29uZ190aW1lXG4jIFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcbiMgXHRcdG9wYWNpdHk6IDAuN1xuXHRcblx0c29uZ051bWJlciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IHNvbmdWaWV3XG5cdFx0dGV4dDogXCIje3NvbmdOdW1iZXIrMX1cIlxuXHRcdHdpZHRoOiAxOCoyXG5cdFx0aGVpZ2h0OiAxNCoyXG5cdFx0eDogMFxuXHRcdHk6IDE3KjJcblx0XHRmb250U2l6ZTogMjRcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdGNvbG9yOiBmb250Q29sb3Jcblx0XHRsZXR0ZXJTcGFjaW5nOiAwXG5cdFx0b3BhY2l0eTogMC41XG5cdFxuXHQjIHByaW50IFwiSGU6XCIgKyBzb25nVmlldy5oZWlnaHRcblx0cmV0dXJuIHNvbmdWaWV3IiwiZXhwb3J0cy5nZXRDb2xvckNvbnRyYXN0T2YgPSAoY29sb3IxLCBjb2xvcjIpIC0+XG5cblx0IyBDb2xvciAxXG5cblx0TDFSID0gY29sb3IxLnJcblx0aWYgTDFSIDw9IDAuMDM5Mjhcblx0XHRMMVIgPSBjb2xvcjEuciAvIDEyLjkyO1xuXHRlbHNlXG5cdFx0TDFSID0gTWF0aC5wb3coKChMMVIgKyAwLjA1NSkgLyAxLjA1NSksIDIuNClcblxuXHRMMUcgPSBjb2xvcjEuZ1xuXHRpZiAoTDFHIDw9IDAuMDM5MjgpXG5cdFx0TDFHID0gY29sb3IxLmcgLyAxMi45MlxuXHRlbHNlIFxuXHRcdEwxRyA9IE1hdGgucG93KCgoTDFHICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpXG5cblx0TDFCID0gY29sb3IxLmJcblx0aWYgKEwxQiA8PSAwLjAzOTI4KVxuXHRcdEwxQiA9IGNvbG9yMS5iIC8gMTIuOTJcblx0ZWxzZVxuXHRcdEwxQiA9IE1hdGgucG93KCgoTDFCICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpXG5cblx0IyBDb2xvciAyXG5cblx0TDJSID0gY29sb3IyLnJcblx0aWYgKEwyUiA8PSAwLjAzOTI4KVxuXHRcdEwyUiA9IGNvbG9yMi5yIC8gMTIuOTJcblx0ZWxzZVxuXHRcdEwyUiA9IE1hdGgucG93KCgoTDJSICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpXG5cblx0TDJHID0gY29sb3IyLmdcblx0aWYgKEwyRyA8PSAwLjAzOTI4KVxuXHRcdEwyRyA9IGNvbG9yMi5nIC8gMTIuOTJcblx0ZWxzZVxuXHRcdEwyRyA9IE1hdGgucG93KCgoTDJHICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpXG5cblx0TDJCID0gY29sb3IyLmJcblx0aWYgKEwyQiA8PSAwLjAzOTI4KVxuXHRcdEwyQiA9IGNvbG9yMi5iIC8gMTIuOTJcblx0ZWxzZVxuXHRcdEwyQiA9IE1hdGgucG93KCgoTDJCICsgMC4wNTUpIC8gMS4wNTUpLCAyLjQpXG5cblx0TDEgPSAwLjIxMjYgKiBMMVIgKyAwLjcxNTIgKiBMMUcgKyAwLjA3MjIgKiBMMUJcblx0TDIgPSAwLjIxMjYgKiBMMlIgKyAwLjcxNTIgKiBMMkcgKyAwLjA3MjIgKiBMMkJcblx0XG4jIFx0cHJpbnQgTDEgKyBcIiBcIiArIEwyXG5cdCMgTWFrZSBzdXJlIEwxIGlzIHRoZSBsaWdodGVyIGNvbG9yXG5cblx0aWYgTDEgPD0gTDJcblx0XHR0ZW1wID0gTDI7XG5cdFx0TDIgPSBMMTtcblx0XHRMMSA9IHRlbXA7XG5cblx0IyBDYWxjdWxhdGUgY29udHJhc3RcblxuXHRjciA9ICgoTDEgKyAwLjA1KSAvIChMMiArIDAuMDUpKS50b0ZpeGVkKDEpXG5cblx0cmV0dXJuIGNyXG5cblxuZXhwb3J0cy5nZXRMaWdodGVuVmFsdWUgPSAoY29sb3IpIC0+XG5cdGJhc2VDb2xvciA9IGNvbG9yXG5cdGJhc2VDb2xvckZpeGVkID0gY29sb3Jcblx0XG5cdGNvcnJlY3RJbmRleCA9IDBcblx0Zm9yIGkgaW4gWzAuLi4xMDBdXG5cdFx0Y29ycmVjdEluZGV4ID0gaVxuXHRcdGJhc2VDb2xvckZpeGVkID0gYmFzZUNvbG9yLmxpZ2h0ZW4oaSlcblx0XHRjdiA9IEAuZ2V0Q29sb3JDb250cmFzdE9mKGJhc2VDb2xvciwgYmFzZUNvbG9yRml4ZWQpXG5cdFx0aWYgY3YgPiAxMFxuXHRcdFx0YnJlYWtcblx0XG5cdHJldHVybiBjb3JyZWN0SW5kZXhcblxuZXhwb3J0cy5nZXREYXJrZW5WYWx1ZSA9IChjb2xvcikgLT5cblx0YmFzZUNvbG9yID0gY29sb3Jcblx0YmFzZUNvbG9yRml4ZWQgPSBjb2xvclxuXHRcblx0Y29ycmVjdEluZGV4ID0gMFxuXHRmb3IgaSBpbiBbMTAuLi4xMDBdXG5cdFx0Y29ycmVjdEluZGV4ID0gaVxuXHRcdGJhc2VDb2xvckZpeGVkID0gYmFzZUNvbG9yLmRhcmtlbihpKVxuXHRcdGN2ID0gQC5nZXRDb2xvckNvbnRyYXN0T2YoYmFzZUNvbG9yLCBiYXNlQ29sb3JGaXhlZClcblx0XHRpZiBjdiA+IDNcblx0XHRcdGJyZWFrXG5cdFxuXHRyZXR1cm4gY29ycmVjdEluZGV4XG5cblxuZXhwb3J0cy5yZXR1cm5Db250ZW50Q29sb3IgPSAoY29sb3IpIC0+XG5cdCMgY3YxID0gQC5nZXRDb2xvckNvbnRyYXN0T2YoY29sb3IsIG5ldyBDb2xvcihcIiMwMDBcIikpXG4jIFx0Y3YyID0gQC5nZXRDb2xvckNvbnRyYXN0T2YoY29sb3IsIG5ldyBDb2xvcihcIiNGRkZcIikpXG5cdHJldHVybkNvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMSlcIlxuXHRcblx0IyBpZiBjdjEgPiBjdjJcbiMgXHRcdHJldHVybkNvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMDgpXCJcbiMgXHRlbHNlXG4jIFx0XHRyZXR1cm5Db2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjEpXCJcblx0XG5cdCMgcHJpbnQgcmV0dXJuQ29sb3Jcblx0cmV0dXJuIG5ldyBDb2xvcihyZXR1cm5Db2xvcilcblxuXG5leHBvcnRzLnJldHVyblRleHRDb2xvciA9IChjb2xvcikgLT5cblx0XG5cdGN2MSA9IEAuZ2V0Q29sb3JDb250cmFzdE9mKGNvbG9yLCBuZXcgQ29sb3IoXCIjMDAwXCIpKVxuXHRjdjIgPSBALmdldENvbG9yQ29udHJhc3RPZihjb2xvciwgbmV3IENvbG9yKFwiI0ZGRlwiKSlcblxuXHRsb2NhbEZvbnRDb2xvciA9IGNvbG9yXG5cdGNoYW5nZWRWYWx1ZSA9IDBcblx0XG5cdCMgZml4IGZvciBibGFjayBjb2xvcnNcblx0aWYgY29sb3IuaCA8IDAuMDAwMSBhbmQgY29sb3IubCA8IDAuMTRcblx0XHRsb2NhbEZvbnRDb2xvciA9IG5ldyBDb2xvcihcIiNGRkZcIilcblx0XHRjaGFuZ2VkVmFsdWUgPSBALmdldERhcmtlblZhbHVlKGxvY2FsRm9udENvbG9yKVxuXHRcdFxuXHRcdGlmIHR5cGVvZiBjaGFuZ2VkVmFsdWUgIT0gXCJ1bmRlZmluZWRcIiAmJiBjaGFuZ2VkVmFsdWUgIT0gbnVsbFxuXHRcdFx0Y2hhbmdlZFZhbHVlID0gNTBcblx0XHRsb2NhbEZvbnRDb2xvciA9IGxvY2FsRm9udENvbG9yLmRhcmtlbihjaGFuZ2VkVmFsdWUpXG5cdFxuXHRlbHNlIGlmIGNvbG9yLmggPiAyMDBcblx0XHRsb2NhbEZvbnRDb2xvciA9IG5ldyBDb2xvcihcIiNGRkZcIilcblx0XHRjaGFuZ2VkVmFsdWUgPSBALmdldERhcmtlblZhbHVlKGxvY2FsRm9udENvbG9yKVxuXHRcdGxvY2FsRm9udENvbG9yID0gbG9jYWxGb250Q29sb3IuZGFya2VuKGNoYW5nZWRWYWx1ZSlcblx0XG5cdGVsc2UgaWYgY3YxIDwgY3YyXG5cdFx0Y2hhbmdlZFZhbHVlID0gQC5nZXRMaWdodGVuVmFsdWUobG9jYWxGb250Q29sb3IpXG5cdFx0bG9jYWxGb250Q29sb3IgPSBsb2NhbEZvbnRDb2xvci5saWdodGVuKGNoYW5nZWRWYWx1ZSlcblx0ZWxzZVxuXHRcdGNoYW5nZWRWYWx1ZSA9IEAuZ2V0RGFya2VuVmFsdWUobG9jYWxGb250Q29sb3IpXG5cdFx0bG9jYWxGb250Q29sb3IgPSBsb2NhbEZvbnRDb2xvci5kYXJrZW4oY2hhbmdlZFZhbHVlKVxuXHRcblx0cmV0dXJuIGxvY2FsRm9udENvbG9yIiwie1RleHRMYXllcn0gPSByZXF1aXJlIFwidGV4dFwiXG4jIHtDYXJkfSA9IHJlcXVpcmUgJ2NhcmQnXG5Db250cmFzdCA9IHJlcXVpcmUgJ2NvbnRyYXN0J1xuXG5Tb25nQ3JlYXRvciA9IHJlcXVpcmUgJ2NyZWF0ZV9zb25nJ1xuXG5BcnRpc3QgPSByZXF1aXJlICdhcnRpc3QnXG5jb25maWcgPSBBcnRpc3QuY29uZmlnXG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuQ2FyZCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuYWxidW1JRCA/PSAtMVxuXHRcdFxuXHRcdEBvcHRpb25zLmltYWdlTGF5ZXIgPz0gbnVsbFxuXHRcdFxuXHRcdEBvcHRpb25zLnNvbmdzQXJyYXkgPz0gbnVsbFxuXHRcdEBvcHRpb25zLmJ1dHRvbkxheWVyID89IG51bGxcblx0XHRAb3B0aW9ucy5jb250ZW50TGF5ZXIgPz0gbnVsbFxuXHRcdFxuXHRcdEBvcHRpb25zLmxvY2FsRm9udENvbG9yID89IFwiYmxhY2tcIlxuXHRcdEBvcHRpb25zLmxvY2FsQ29udGVudENvbG9yID89IFwid2hpdGVcIlxuXHRcdEBvcHRpb25zLmNhcmRDb2xvciA/PSBcImJsYWNrXCJcblx0XHRcblx0XHRAb3B0aW9ucy5pc0NvbnRlbnRTaG93biA/PSBmYWxzZVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAnYWxidW1JRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRCA9IHZhbHVlXG5cblx0QGRlZmluZSAnaW1hZ2VMYXllcicsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuaW1hZ2VMYXllclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuaW1hZ2VMYXllciA9IHZhbHVlXG5cblx0QGRlZmluZSAnc29uZ3NBcnJheScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ3NBcnJheVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ3NBcnJheSA9IHZhbHVlXG5cblx0QGRlZmluZSAnY29udGVudExheWVyJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5jb250ZW50TGF5ZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmNvbnRlbnRMYXllciA9IHZhbHVlXG5cblx0QGRlZmluZSAnbG9jYWxGb250Q29sb3InLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmxvY2FsRm9udENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5sb2NhbEZvbnRDb2xvciA9IHZhbHVlXG5cblx0QGRlZmluZSAnbG9jYWxDb250ZW50Q29sb3InLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmxvY2FsQ29udGVudENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5sb2NhbENvbnRlbnRDb2xvciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdjYXJkQ29sb3InLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmNhcmRDb2xvclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuY2FyZENvbG9yID0gdmFsdWVcblx0XG5cdFxuXG5cdGluaXRBbGJ1bVZpZXc6IChhbGJ1bUlEKSAtPlxuXHRcdEAuY2FyZENvbG9yID0gbmV3IENvbG9yKFwiI3tBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS50aW50Q29sb3J9XCIpXG5cdFx0XG5cdFx0QC5sb2NhbEZvbnRDb2xvciA9IENvbnRyYXN0LnJldHVyblRleHRDb2xvcihALmNhcmRDb2xvcilcblx0XHRALmxvY2FsQ29udGVudENvbG9yID0gQ29udHJhc3QucmV0dXJuQ29udGVudENvbG9yKEAuY2FyZENvbG9yKVxuXG5cdFx0QC53aWR0aCA9IDY0MFxuXHRcdEAuaGVpZ2h0ID0gMTA4KjIrMTA4XG5cdFx0QC5ib3JkZXJSYWRpdXMgPSAyMFxuXHRcdEAuYm9yZGVyV2lkdGggPSA0XG5cdFx0QC5ib3JkZXJDb2xvciA9IG5ldyBDb2xvcihyOiBALmxvY2FsRm9udENvbG9yLnIsIGc6IEAubG9jYWxGb250Q29sb3IuZywgYjogQC5sb2NhbEZvbnRDb2xvci5iLCBhOiAwLjIpXG5cdFx0QC5hbGJ1bUlEID0gYWxidW1JRFxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gQC5jYXJkQ29sb3Jcblx0XG5cdFx0dG9wVmlldyA9IG5ldyBMYXllciB3aWR0aDogNjQwLCBoZWlnaHQ6IDEwOCoyLCBiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiLCBwYXJlbnQ6IEBcblx0XHRALmJ1dHRvbkxheWVyID0gdG9wVmlld1xuXG5cblx0XHRpbWFnZV9iZyA9IG5ldyBMYXllciB3aWR0aDogMTU2LCBoZWlnaHQ6IDE1NiwgeDogMzYsIHk6IDI4LCBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwwKVwiLCBzaGFkb3dZOiAyLCBzaGFkb3dCbHVyOiA4LCBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMilcIiwgcGFyZW50OiBAXG5cdFxuXHRcdGltYWdlID0gbmV3IExheWVyIHdpZHRoOiAxNTYsIGhlaWdodDogMTU2LCB4OiAzNiwgeTogMjgsIGltYWdlOiBcIiN7QXJ0aXN0LmFsYnVtc0RhdGFbYWxidW1JRF0uaW1hZ2V9XCIsIHBhcmVudDogQFxuXG5cdFx0YWxidW1UaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0dGV4dDogXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpdGxlfVwiXG5cdFx0XHR3aWR0aDogMjEwKjJcblx0XHRcdGhlaWdodDogNTAqMlxuXHRcdFx0eDogMTA4KjJcblx0XHRcdHk6IDE0KjJcblx0XHRcdGZvbnRTaXplOiAxOCoyXG5cdFx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRcdGNvbG9yOiBALmxvY2FsRm9udENvbG9yXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblx0XG5cdFx0YWxidW1ZZWFyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR0ZXh0OiBcIiN7QXJ0aXN0LmFsYnVtc0RhdGFbYWxidW1JRF0ueWVhcn1cIlxuXHRcdFx0d2lkdGg6IDIwMCoyXG5cdFx0XHRoZWlnaHQ6IDUwKjJcblx0XHRcdHg6IDEwOCoyXG5cdFx0XHR5OiA3NCoyXG5cdFx0XHRmb250U2l6ZTogMTMqMlxuXHRcdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0XHRjb2xvcjogQC5sb2NhbEZvbnRDb2xvclxuXHRcdFx0b3BhY2l0eTogMC44XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRyZXR1cm5CdXR0b25MYXllcjogLT5cblx0XHQjIHByaW50IFwiaW5zaWRlOiBcIiArIEAuY29udGVudExheWVyXG5cdFx0cmV0dXJuIEAuYnV0dG9uTGF5ZXJcblx0XG5cdHJldHVyblNvbmdzQXJyYXk6IC0+XG5cdFx0IyBwcmludCBcImluc2lkZTogXCIgKyBALmNvbnRlbnRMYXllclxuXHRcdHJldHVybiBALnNvbmdzQXJyYXlcblx0XG5cdHJldHVybkNvbnRlbnRMYXllcjogLT5cblx0XHQjIHByaW50IFwiaW5zaWRlOiBcIiArIEAuY29udGVudExheWVyXG5cdFx0cmV0dXJuIEAuY29udGVudExheWVyXG5cblxuXHRpbml0Q29udGVudDogKCktPlxuXHRcdGNvbnRlbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiA2MTZcblx0XHRcdGhlaWdodDogODc0XG5cdFx0XHR4OiA4XG5cdFx0XHR5OiAxMDgqMlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBALmxvY2FsQ29udGVudENvbG9yXG5cdFx0XHRwcm9wYWdhdGVFdmVudHM6IGZhbHNlXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwiY29udGVudExheWVyICN7QC5hbGJ1bUlEfVwiXG5cdFx0XHRcblx0XHRALmNvbnRlbnRMYXllciA9IGNvbnRlbnRcblx0XHRcblx0XHQjIEAuY29udGVudExheWVyLm9uIEV2ZW50cy5DbGljaywgLT5cblx0XHRcblx0XHRzaHVmZmxlQnJlYWtlciA9IG5ldyBMYXllciB3aWR0aDogNjE2LCBoZWlnaHQ6IDIsIHg6IDAsIHk6IDQ4KjIsIGJhY2tncm91bmRDb2xvcjogQC5sb2NhbEZvbnRDb2xvciwgb3BhY2l0eTogMC4yLCBwYXJlbnQ6IEAuY29udGVudExheWVyXG5cblx0XG5cdFx0c2h1ZmZsZVRpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALmNvbnRlbnRMYXllclxuXHRcdFx0dGV4dDogXCLQn9C10YDQtdC80LXRiNCw0YLRjCDQsNC70YzQsdC+0LxcIlxuXHRcdFx0d2lkdGg6IDI4NCoyXG5cdFx0XHRoZWlnaHQ6IDE4KjJcblx0XHRcdHg6IDEyKjJcblx0XHRcdHk6IDE1KjJcblx0XHRcdGZvbnRTaXplOiAxNSoyXG5cdFx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRcdGNvbG9yOiBALmxvY2FsRm9udENvbG9yXG5cdFx0XHRvcGFjaXR5OiAwLjhcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcdFxuXG5cdFx0IyBzaHVmZmxlID0gbmV3IExheWVyIHdpZHRoOiA1NjgsIGhlaWdodDogNjAsIHg6IDI0LCB5OiAxNCoyLCBpbWFnZTogXCJpbWFnZXMvc2h1ZmZsZS5wbmdcIiwgcGFyZW50OiBjb250ZW50Vmlld0JnXG5cblx0XHQjIGZvciBzb25nIGluIEFydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzXG5cdFx0YWxidW1Tb25ncyA9IFNvbmdDcmVhdG9yLmNyZWF0ZVNvbmdzRm9yQWxidW0oQC5hbGJ1bUlELCBALmxvY2FsRm9udENvbG9yKVxuXHRcdEAuc29uZ3NBcnJheSA9IGFsYnVtU29uZ3Ncblx0XHRmb3Igc29uZywgaSBpbiBhbGJ1bVNvbmdzXG5cdFx0XHRzb25nLnkgPSBzb25nLmhlaWdodCAqIChpKSArIDQ4KjJcblx0XHRcdHNvbmcucGFyZW50ID0gQC5jb250ZW50TGF5ZXJcblx0XHRcdHNvbmcuYWxidW1JRCA9IEAuYWxidW1JRFxuXHRcdFx0c29uZy5wcm9wYWdhdGVFdmVudHMgPSBmYWxzZVxuXHRcblx0XHRALmNvbnRlbnRMYXllci5oZWlnaHQgPSBhbGJ1bVNvbmdzWzBdLmhlaWdodCAqIGFsYnVtU29uZ3MubGVuZ3RoICsgMTQqMiArIDYwICsgOCoyXG5cdFx0c3R1ZGlvID0gbmV3IExheWVyIHdpZHRoOiAyMDgsIGhlaWdodDogMjQsIHg6IDIxNiwgaW1hZ2U6IFwiaW1hZ2VzL3N0dWRpby5wbmdcIiwgcGFyZW50OiBALmNvbnRlbnRMYXllciwgeTogYWxidW1Tb25nc1swXS5oZWlnaHQgKiBhbGJ1bVNvbmdzLmxlbmd0aCArIDE0KjIgKyA2MCArIDgqMiArIDEwOCoyICsgMjAgLSAxMDgqMlxuXHRcdEAuaGVpZ2h0ID0gc29uZy5oZWlnaHQgKiBhbGJ1bVNvbmdzLmxlbmd0aCArIDE0KjIgKyA2MCArIDgqMiArIDEwOCoyICsgMjAgKyAyMCArIHN0dWRpby5oZWlnaHQrNFxuXHRcblx0XHRcblx0XG5cdFxuXHRkZXNyb3lDb250ZW50OiAtPlxuXHRcdFV0aWxzLmRlbGF5IDAuNSwgPT5cblx0XHRcdEAuaGVpZ2h0ID0gMTA4KjNcblx0XHRcdFxuXHRcdFx0aWYgdHlwZW9mIEAuY29udGVudExheWVyICE9IFwidW5kZWZpbmVkXCIgJiYgQC5jb250ZW50TGF5ZXIgIT0gbnVsbFxuXHRcdFx0XHRALmNvbnRlbnRMYXllci5wYXJlbnQgPSBudWxsXG5cdFx0XHRcdEAuY29udGVudExheWVyLm9wYWNpdHkgPSAwXG5cdFx0XHRcblx0XHRcdFx0QC5jb250ZW50TGF5ZXIuZGVzdHJveSgpXG5cdFx0XHRcblx0XHRcdGlmIHR5cGVvZiBALnNvbmdzQXJyYXkgIT0gXCJ1bmRlZmluZWRcIiAmJiBALnNvbmdzQXJyYXkgIT0gbnVsbFxuXHRcdFx0XHRmb3Igc29uZyBpbiBALnNvbmdzQXJyYXlcblx0XHRcdFx0XHRzb25nLmRlc3Ryb3koKVxuXHRcdFx0XHRALnNvbmdBcnJheSA9IG51bGxcblx0XHRcblx0XHRcblx0XHQiLCJjb25maWcgPSBcImFydGlzdHMvdHJvbGxcIlxuZXhwb3J0cy5jb25maWcgPSBjb25maWdcblxuZ3JleXNfd2hpdGUgPSBcIiNGRkZGRkZcIlxuZ3JleXNfcHJlX3doaXRlID0gXCIjRjdGN0Y3XCJcbmdyZXlzX3VsdHJhX2xpZ2h0ID0gXCIjRUVFRUVFXCJcbmdyZXlzX2xpZ2h0ZXN0ID0gXCIjREREREREXCJcbmdyZXlzX2xpZ2h0ZXIgPSBcIiNDQ0NDQ0NcIlxuZ3JleXNfYmFzZSA9IFwiIzk5OTk5OVwiXG5ncmV5c19kYXJrZXIgPSBcIiM2NjY2NjZcIlxuZ3JleXNfZGFya2VzdCA9IFwiIzIyMjIyMlwiXG5ncmV5c19ibGFjayA9IFwiIzAwMDAwMFwiXG5cblxuZXhwb3J0cy5jb2xvclRoZW1lID0ge1xuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGhlYWRlci5wbmdcIlxuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yOiBcInJnYmEoMCwwLDAsXCJcblx0bmF2aWdhdGlvbl9vdmVybGF5X2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gZGFya2VyLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9oZWFkZXJfdGV4dDogXCIjRkZGRkZGXCJcblx0XG5cdG5hdmlnYXRpb25fYmFja2dyb3VuZDogY29uZmlnICsgXCIvYmcucG5nXCJcblx0IyBuYXZpZ2F0aW9uX3NoYWRvdzogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF9iYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC40KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX3RpbWVsaW5lOiBcIiM2NjZcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfcmFkaXVzOiBcImJsdXIoMTBweClcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfY29sb3I6IFwicmdiYSgwLDAsMCwwLjYpXCJcblx0IyBuYXZpZ2F0aW9uX2NhcmRfb3ZlcmxheV9iYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIlxuXG5cblxuXHRwbGF5ZXJfYmFja2dyb3VuZDogXCIjMUQxRDFEXCJcblx0cGxheWVyX3Byb2dyZXNzX2Jhc2U6IFwiIzY2NlwiXG5cdHBsYXllcl9wcm9ncmVzc19maWxsZWQ6IFwiI0FGMTQxN1wiXG5cdHBsYXllcl9zb25nX3RpdGxlOiBcIndoaXRlXCJcblx0cGxheWVyX2FsYnVtX3RpdGxlOiBcInJnYmEoMjA0LDIwNCwyMDQsMC41KVwiXG5cdFxuXHRwbGF5ZXJfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdHBsYXllcl9zaGFkb3dfeTogLTIwXG5cdHBsYXllcl9zaGFkb3dfYmx1cjogNDBcblxuXG5cblx0Y2FyZF9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0Y2FyZF9zaGFkb3dfeTogMjhcblx0Y2FyZF9zaGFkb3dfYmx1cjogNDBcblx0XG5cdCMgRGV0YWlsZWQgQWxidW1cblx0ZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZDogXCIjMTExXCJcblx0ZGV0YWlsZWRfYWxidW1fdGl0bGU6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV95ZWFyOiBcInJnYmEoMjA0LDIwNCwyMDQsMC41KVwiXG5cdGZhdl9zb25nc190aXRsZTogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNSlcIlxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bSBTb25nXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGU6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX251bWJlcjogXCIjOTk5XCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aW1lOiBcIiM5OTlcIlxuXG59XG5cblxuXG5cblxubmV3c01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8wLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzAuanBnXCJcbn1cblxubmV3c01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEuanBnXCJcbn1cblxubmV3c01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8yLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzIuanBnXCJcbn1cblxubmV3c01vZGVsMyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8zLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzMuanBnXCJcbn1cblxubmV3c01vZGVsNCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy80LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzQuanBnXCJcbn1cblxubmV3c01vZGVsNSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy81LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzUuanBnXCJcbn1cblxubmV3c01vZGVsNiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy82LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzYuanBnXCJcbn1cblxubmV3c01vZGVsNyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy83LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzcuanBnXCJcbn1cblxubmV3c01vZGVsOCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvOC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy84LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzguanBnXCJcbn1cblxubmV3c01vZGVsOSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy85LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzkuanBnXCJcbn1cblxubmV3c01vZGVsMTAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEwLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEwLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEwLmpwZ1wiXG59XG5cbmV4cG9ydHMuZmVlZERhdGEgPSBbbmV3c01vZGVsMCwgbmV3c01vZGVsMSwgbmV3c01vZGVsMiwgbmV3c01vZGVsMywgbmV3c01vZGVsNCwgbmV3c01vZGVsNSwgbmV3c01vZGVsNiwgbmV3c01vZGVsNywgbmV3c01vZGVsOCwgbmV3c01vZGVsOSwgbmV3c01vZGVsMTBdXG5cblxuXG5cblxuXG5cblxuXG52aWRlb01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8wLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8xLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8yLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG5cblxucGxheWxpc3QwID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8wLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8wLnBuZ1wiXG59XG5cbnBsYXlsaXN0MSA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8xLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMS5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMS5wbmdcIlxufVxuXG5wb3B1bGFyUGxheWxpc3QgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzIucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzIucG5nXCJcbn1cblxuZXhwb3J0cy5wbGF5bGlzdHNEYXRhID0gW3BsYXlsaXN0MCwgcGxheWxpc3QxLCBwb3B1bGFyUGxheWxpc3RdXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMl1cblxuXG5cblxuXG5cblxuXG5cblxuY29uZmlnQWxidW1zID0gY29uZmlnICsgXCIvYWxidW1zL1wiXG4jIHByaW50IGNvbmZpZ0FsYnVtc1xuXG5yYW5kb21Tb3VyY2UgPSBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCJdXG5cblxuYWxidW1zRGF0YVllYXJzID0gW3t0aXRsZTpcIkltbW9ydGFsaXplZFwiLHllYXI6MjAxNSx0aW50Q29sb3I6XCIjMzYyODI4XCIsc29uZ3M6W1wiVGhlIEV5ZSBPZiBUaGUgU3Rvcm1cIixcIkltbW9ydGFsaXplZFwiLFwiVGhlIFZlbmdlZnVsIE9uZVwiLFwiT3BlbiBZb3VyIEV5ZXNcIixcIlRoZSBMaWdodFwiLFwiV2hhdCBBcmUgWW91IFdhaXRpbmcgRm9yXCIsXCJZb3UncmUgTWluZVwiLFwiV2hvXCIsXCJTYXZlIE91ciBMYXN0IEdvb2RieWVcIixcIkZpcmUgSXQgVXBcIixcIlRoZSBTb3VuZCBPZiBTaWxlbmNlXCIsXCJOZXZlciBXcm9uZ1wiLFwiV2hvIFRhdWdodCBZb3UgSG93IFRvIEhhdGVcIixcIlR5cmFudFwiLFwiTGVnaW9uIE9mIE1vbnN0ZXJzXCIsXCJUaGUgQnJhdmUgQW5kIFRoZSBCb2xkXCJdLHRpbWU6W1wiMDE6MjBcIixcIjA0OjE3XCIsXCIwNDoxMlwiLFwiMDM6NTdcIixcIjA0OjE2XCIsXCIwNDowM1wiLFwiMDQ6NTVcIixcIjA0OjQ2XCIsXCIwNDo1OVwiLFwiMDQ6MDVcIixcIjA0OjA4XCIsXCIwMzozM1wiLFwiMDQ6NTdcIixcIjAzOjQ5XCIsXCIwNDoyM1wiLFwiMDQ6MzRcIl0sIGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjkuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiVGhlIExvc3QgQ2hpbGRyZW5cIix5ZWFyOjIwMTEsdGludENvbG9yOlwiIzI3MjEyQVwiLHNvbmdzOltcIkhlbGxcIixcIkEgV2VsY29tZSBCdXJkZW5cIixcIlRoaXMgTW9tZW50XCIsXCJPbGQgRnJpZW5kXCIsXCJNb25zdGVyXCIsXCJSdW5cIixcIkxlYXZlIEl0IEFsb25lXCIsXCJUd28gV29ybGRzXCIsXCJHb2QgT2YgVGhlIE1pbmRcIixcIlNpY2tlbmVkXCIsXCJNaW5lXCIsXCJQYXJhc2l0ZVwiLFwiRGVodW1hbml6ZWRcIixcIjNcIixcIk1pZGxpZmUgQ3Jpc2lzXCIsXCJMaXZpbmcgQWZ0ZXIgTWlkbmlnaHRcIl0sdGltZTpbXCIwNDoxNVwiLFwiMDM6MzFcIixcIjAzOjA1XCIsXCIwMzozNlwiLFwiMDQ6MDRcIixcIjAzOjEzXCIsXCIwNDowNlwiLFwiMDM6MzJcIixcIjAzOjA1XCIsXCIwMzo1OFwiLFwiMDU6MDRcIixcIjAzOjI0XCIsXCIwMzozMVwiLFwiMDQ6MDJcIixcIjA0OjAyXCIsXCIwNDoyNVwiXSwgaW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOC5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJUaGUgU2lja25lc3MgMTB0aCBBbm5pdmVyc2FyeSBFZGl0aW9uXCIseWVhcjoyMDEwLHRpbnRDb2xvcjpcIiMzRTY4NkRcIixzb25nczpbXCJWb2ljZXNcIixcIlRoZSBHYW1lXCIsXCJTdHVwaWZ5XCIsXCJEb3duIFdpdGggVGhlIFNpY2tuZXNzXCIsXCJWaW9sZW5jZSBGZXRpc2hcIixcIkZlYXJcIixcIk51bWJcIixcIldhbnRcIixcIkNvbmZsaWN0XCIsXCJTaG91dDIwMDBcIixcIkRyb3BwaW4nIFBsYXRlc1wiLFwiTWVhbmluZyBPZiBMaWZlXCIsXCJHb2QgT2YgVGhlIE1pbmRcIixcIkEgV2VsY29tZSBCdXJkZW5cIl0sdGltZTpbXCIwMzoxMlwiLFwiMDM6NDZcIixcIjA0OjM0XCIsXCIwNDozOFwiLFwiMDM6MjNcIixcIjAzOjQ2XCIsXCIwMzo0NFwiLFwiMDM6NTJcIixcIjA0OjM1XCIsXCIwNDoxOFwiLFwiMDM6NDhcIixcIjA0OjAwXCIsXCIwMzowNVwiLFwiMDM6MzFcIl0sIGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjcuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiRGlzdHVyYmVkIC0gVGhlIEludGVydmlld1wiLHllYXI6MjAxMCx0aW50Q29sb3I6XCIjMjkyNTJCXCIsc29uZ3M6W1wiVG91cmluZyAoRGFuIERvbmVnYW4pXCIsXCJOdW1iZXIgT25lIEFsYnVtXCIsXCJTb25nIElkZW50aXR5XCIsXCJXaGVlbGNoYWlyIE9uIFN0YWdlXCIsXCJKb2huIE1veWVyJ3MgQXVkaXRpb25cIixcIlRpbWUgT2ZmXCIsXCJJbmZsdWVuY2VzXCIsXCJSZWNvcmRpbmdcIixcIlNvIE11Y2ggRGFya25lc3NcIixcIlNwaXJpdHVhbGl0eVwiLFwiQ2xvc2VyIFRvIFRoZSBQZW9wbGVcIl0sdGltZTpbXCIwNDozMlwiLFwiMDU6NTlcIixcIjA0OjEyXCIsXCIwNTozMlwiLFwiMDM6MjFcIixcIjA1OjMwXCIsXCIwNjowM1wiLFwiMDQ6MTNcIixcIjA1OjQxXCIsXCIwNDo0NVwiLFwiMDc6MjlcIl0sIGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjYuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiQXN5bHVtXCIseWVhcjoyMDEwLHRpbnRDb2xvcjpcIiMyOTFCMThcIixzb25nczpbXCJSZW1uYW50c1wiLFwiQXN5bHVtXCIsXCJUaGUgSW5mZWN0aW9uXCIsXCJXYXJyaW9yXCIsXCJBbm90aGVyIFdheSBUbyBEaWVcIixcIk5ldmVyIEFnYWluXCIsXCJUaGUgQW5pbWFsXCIsXCJDcnVjaWZpZWRcIixcIlNlcnBlbnRpbmVcIixcIk15IENoaWxkXCIsXCJTYWNyaWZpY2VcIixcIklubm9jZW5jZVwiLFwiSVNIRldJTEZcIixcIkRvd24gV2l0aCBUaGUgU2lja25lc3NcIixcIlN0cmlja2VuXCJdLHRpbWU6W1wiMDI6NDNcIixcIjA0OjM2XCIsXCIwNDowOFwiLFwiMDM6MjRcIixcIjA0OjEzXCIsXCIwMzozM1wiLFwiMDQ6MTNcIixcIjA0OjM3XCIsXCIwNDowOVwiLFwiMDM6MThcIixcIjA0OjAwXCIsXCIwNDozMVwiLFwiMDU6MjZcIixcIjA1OjUzXCIsXCIwNDoxN1wiXSwgaW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNS5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJJbmRlc3RydWN0aWJsZVwiLHllYXI6MjAwOCx0aW50Q29sb3I6XCIjRDI5NTUyXCIsc29uZ3M6W1wiSW5kZXN0cnVjdGlibGVcIixcIkluc2lkZSBUaGUgRmlyZVwiLFwiRGVjZWl2ZXJcIixcIlRoZSBOaWdodFwiLFwiUGVyZmVjdCBJbnNhbml0eVwiLFwiSGF1bnRlZFwiLFwiRW5vdWdoXCIsXCJUaGUgQ3Vyc2VcIixcIlRvcm5cIixcIkNyaW1pbmFsXCIsXCJEaXZpZGVcIixcIkZhw6dhZGVcIixcIlN0cmlja2VuXCIsXCJEb3duIFdpdGggVGhlIFNpY2tuZXNzXCIsXCJKdXN0IFN0b3BcIl0sdGltZTpbXCIwNDozOFwiLFwiMDM6NTFcIixcIjAzOjQ5XCIsXCIwNDo0NlwiLFwiMDM6NTZcIixcIjA0OjQyXCIsXCIwNDoyMFwiLFwiMDM6MjRcIixcIjA0OjA5XCIsXCIwNDoxNVwiLFwiMDM6MzZcIixcIjAzOjQ1XCIsXCIwNDoyN1wiLFwiMDU6MTRcIixcIjAzOjUxXCJdLCBpbWFnZTogY29uZmlnQWxidW1zICsgXCI0LmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIlRlbiBUaG91c2FuZCBGaXN0c1wiLHllYXI6MjAwNSx0aW50Q29sb3I6XCIjNDEzMjJFXCIsc29uZ3M6W1wiVGVuIFRob3VzYW5kIEZpc3RzXCIsXCJKdXN0IFN0b3BcIixcIkd1YXJkZWRcIixcIkRlaWZ5XCIsXCJTdHJpY2tlblwiLFwiSSdtIEFsaXZlXCIsXCJTb25zIE9mIFBsdW5kZXJcIixcIk92ZXJidXJkZW5lZFwiLFwiRGVjYWRlbmNlXCIsXCJGb3JnaXZlblwiLFwiTGFuZCBPZiBDb25mdXNpb25cIixcIlNhY3JlZCBMaWVcIixcIlBhaW4gUmVkZWZpbmVkXCIsXCJBdmFyaWNlXCJdLHRpbWU6W1wiMDM6MzJcIixcIjAzOjQzXCIsXCIwMzoyMFwiLFwiMDQ6MTZcIixcIjA0OjA1XCIsXCIwNDo0MlwiLFwiMDM6NDhcIixcIjA1OjU3XCIsXCIwMzoyNFwiLFwiMDQ6MTJcIixcIjA0OjQ3XCIsXCIwMzowNVwiLFwiMDQ6MDdcIixcIjAyOjU2XCJdLCBpbWFnZTogY29uZmlnQWxidW1zICsgXCIzLmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIk11c2ljIEFzIEEgV2VhcG9uIElJXCIseWVhcjoyMDA0LHRpbnRDb2xvcjpcIiMzQzI1MjBcIixzb25nczpbXCJMb2FkaW5nIFRoZSBXZWFwb25cIixcIkJvdW5kXCIsXCJNeXNlbGZcIixcIkRlaHVtYW5pemVkXCIsXCJGb3JmZWl0XCIsXCJGYWRlIFRvIEJsYWNrXCIsXCJFbXB0eVwiLFwiU3VtdGltZXNcIixcIkRhcmtuZXNzXCIsXCJCcnVpc2VzXCIsXCJQcmF5ZXJcIixcIlRoZSBSZWRcIixcIlBvZW1cIixcIlN0dXBpZnkgKFdpdGggUGV0ZSBMb2VmZmxlciAmIEpvZXkgRHVlbmFzKVwiXSx0aW1lOltcIjAyOjM0XCIsXCIwMzo1M1wiLFwiMDM6MzRcIixcIjAzOjQzXCIsXCIwNDowNVwiLFwiMDQ6MjVcIixcIjA0OjAxXCIsXCIwNDo0MVwiLFwiMDQ6MDFcIixcIjAyOjQ4XCIsXCIwMzo0N1wiLFwiMDM6NDRcIixcIjAzOjE5XCIsXCIwNDoyOFwiXSwgaW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMi5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJCZWxpZXZlXCIseWVhcjoyMDAyLHRpbnRDb2xvcjpcIiM3NDFGMjRcIixzb25nczpbXCJQcmF5ZXJcIixcIkxpYmVyYXRlXCIsXCJBd2FrZW5cIixcIkJlbGlldmVcIixcIlJlbWVtYmVyXCIsXCJJbnRveGljYXRpb25cIixcIlJpc2VcIixcIk1pc3RyZXNzXCIsXCJCcmVhdGhlXCIsXCJCb3VuZFwiLFwiRGV2b3VyXCIsXCJEYXJrbmVzc1wiXSx0aW1lOltcIjAzOjM5XCIsXCIwMzoyN1wiLFwiMDQ6MjlcIixcIjA0OjI3XCIsXCIwNDowOFwiLFwiMDM6MTFcIixcIjAzOjU1XCIsXCIwMzo0NVwiLFwiMDQ6MTlcIixcIjAzOjUxXCIsXCIwMzo0NlwiLFwiMDM6NTZcIl0sIGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiVGhlIFNpY2tuZXNzXCIseWVhcjoyMDAwLHRpbnRDb2xvcjpcIiMyNjQ1M0RcIixzb25nczpbXCJWb2ljZXNcIixcIlRoZSBHYW1lXCIsXCJTdHVwaWZ5XCIsXCJEb3duIFdpdGggdGhlIFNpY2tuZXNzXCIsXCJWaW9sZW5jZSBGZXRpc2hcIixcIkZlYXJcIixcIk51bWJcIixcIldhbnRcIixcIkNvbmZsaWN0XCIsXCJTaG91dCAyMDAwXCIsXCJEcm9wcGluJyBQbGF0ZXNcIixcIk1lYW5pbmcgT2YgTGlmZVwiXSx0aW1lOltcIjAzOjExXCIsXCIwMzo0N1wiLFwiMDQ6MzRcIixcIjA0OjM5XCIsXCIwMzoyM1wiLFwiMDM6NDVcIixcIjAzOjQ0XCIsXCIwMzo1MVwiLFwiMDQ6MzVcIixcIjA0OjE4XCIsXCIwMzo0OFwiLFwiMDQ6MDJcIl0sIGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjAuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxuXG5cblxuXG5cblxuXG5cblxuXG4jXG4jIHt0aXRsZTpcItCg0LXQtNC60LjQtSDQt9C10LzQu9C4XCIseWVhcjoyMDEwLHRpbnRDb2xvcjpcIiNDRkQzRTJcIixzb25nczpbXCLQktC+0LnQvdCwINGH0LXQu9C+0LLQtdGH0LrQvtCyXCIsXCLQodC80L7Qs1wiLFwi0JLQtdGH0LXRgFwiLFwi0JTRgNGD0LPQuNC1INC80LXRgdGC0LBcIixcItCc0LDRgdC70L5cIixcItCb0YPRh9C4XCIsXCLQlNC10LLQvtGH0LrQvtC00YDRg9CzXCIsXCLQqNCw0LzQvtGA0LBcIixcItCY0LTQuCwg0Y8g0LHRg9C00YNcIixcItCd0LXRgiDQvdC10YIg0L3QtdGCXCIsXCLQndCw0YDQutC+0YLQuNC60LDQvCDigJMg0L3QtdGCIVwiLFwi0KHQsNGD0L3QtNGC0YDQtdC6XCIsXCLQndCwINC/0LXRgNC10LrRgNC10YHRgtC60LDRhSDRgdGD0LTRjNCx0YsgKNCh0YLQsNC90Ywg0YfQtdC70L7QstC10LrQvtC8KVwiLFwi0KEg0J3QvtCy0YvQvCDQs9C+0LTQvtC8LCDQutGA0L7RiNC60LAhXCJdLHRpbWU6W1wiMDM6NThcIixcIjA0OjE1XCIsXCIwNDoyNFwiLFwiMDM6NDRcIixcIjAzOjU5XCIsXCIwNDo1MVwiLFwiMDM6NDhcIixcIjAzOjA3XCIsXCIwNTo0M1wiLFwiMDQ6MDhcIixcIjAzOjQxXCIsXCIwMzo1N1wiLFwiMDI6MzhcIixcIjA1OjA1XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEwLmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG4jXG4jIHt0aXRsZTpcItCc0YPQvNC40LrQsNC8INC+0YIg0YLRgNC+0LvQu9C40LrQvtCyLiDQn9C+0YHQv9C4LCDRgNC+0Lot0L0t0YDQvtC70LtcIix5ZWFyOjIwMTIsdGludENvbG9yOlwiIzhCQzcxQlwiLHNvbmdzOltcItCt0YLQviDQv9C+INC70Y7QsdCy0LhcIixcItCeLCDRgNCw0LlcIixcItCU0LXQu9GM0YTQuNC90YtcIixcItCi0LDQutC40LUg0LTQtdCy0YfQvtC90LrQuFwiLFwi0KLQsNC6INC90LDQtNC+XCIsXCLQoSDQvdC+0LLRi9C8INCz0L7QtNC+0LwsINC60YDQvtGI0LrQsFwiLFwi0J3QtdCy0LXRgdGC0LBcIixcItCd0L7QstCw0Y8g0LvRg9C90LAg0LDQv9GA0LXQu9GPXCIsXCLQn9C+0YHQv9C4LCDRgNC+0Lot0L0t0YDQvtC70LtcIixcItCc0L7RjyDQv9C10LLQuNGG0LBcIixcItCX0LDQsdCw0LLRi1wiXSx0aW1lOltcIjAzOjQ2XCIsXCIwMzowNlwiLFwiMDU6MTFcIixcIjA0OjM4XCIsXCIwNDowMVwiLFwiMDQ6NThcIixcIjAzOjE4XCIsXCIwMzoxMlwiLFwiMDM6MzRcIixcIjA0OjI4XCIsXCIwMzozMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMS5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuI1xuIyB7dGl0bGU6XCLQn9C40YDQsNGC0YHQutC40LUg0LrQvtC/0LjQuFwiLHllYXI6MjAxNSx0aW50Q29sb3I6XCIjQkFCRDg1XCIsc29uZ3M6W1wi0KEg0YfQuNGB0YLQvtCz0L4g0LvQuNGB0YLQsFwiLFwi0JzQtdC00LvQtdC90L3Ri9C1INGC0LDQvdGG0YtcIixcItCS0LjRgtCw0LzQuNC90YtcIixcItCf0LjRgNCw0YLRgdC60LjQtSDQutC+0L/QuNC4XCIsXCLQmtCw0LbQtdGC0YHRj1wiLFwi0JzQvtC70L3QuNGPXCIsXCLQl9C+0LvQvtGC0L7QtSDRgdC10YDQtNGG0LVcIixcItCf0L7RgdC70LXQtNC90LjQuSDQvtGC0L/Rg9GB0LrQvdC+0LlcIixcItCa0YPQutC70YtcIixcItCc0L7RiNC60LBcIixcItCT0LTQtSDQstGLLCDQtNC10LLQvtGH0LrQuFwiLFwi0JrRgtC+INCx0YPQtNC10YIg0YHQv9Cw0YHQsNGC0Ywg0YDQvtC6LdC9LdGA0L7Qu9C7XCIsXCLQqNGC0L7RgNC8XCIsXCLQndC+0Y/QsdGA0YxcIixcIjJuZCBXaW5kXCIsXCJGYWtlIGEgRmFrZVwiLFwiRG9scGhpbnNcIixcIjE5ODQgUGFydCBJSVwiLFwiSG9yb25nYnVsXCIsXCJXaXRjaFwiLFwiUG9sYXIgQmVhclwiLFwiUm91bmQgYW5kIFJvdW5kXCIsXCJPeSBPeSBPeVwiLFwiQ2hhLU1hLUNoYW0tQVwiLFwiWW91IENydXNoIG9uIE1lXCIsXCJJbiBUaGUgVmFsbGV5IG9mIEVhc2VcIixcIk1hZ2ljIFN0b25lXCIsXCJLdWFpenVva2FpXCJdLHRpbWU6W1wiMDM6NThcIixcIjA5OjAyXCIsXCIwNDoxN1wiLFwiMDY6MjhcIixcIjA0OjI3XCIsXCIwNDozMlwiLFwiMDM6MzRcIixcIjAzOjMyXCIsXCIwMjo1OFwiLFwiMDM6NDlcIixcIjA0OjQ4XCIsXCIwNDoxNlwiLFwiMDM6NDBcIixcIjA2OjAwXCIsXCIwNToxNVwiLFwiMDM6NDNcIixcIjA0OjQ2XCIsXCIwMzoxMVwiLFwiMDQ6NDRcIixcIjAzOjIyXCIsXCIwNDowMVwiLFwiMDM6NDVcIixcIjAzOjM0XCIsXCIwMzozMlwiLFwiMDM6NDNcIixcIjA4OjI3XCIsXCIwNjozOVwiLFwiMDM6NDhcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTIuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfVxuXG5dXG5cbiMgZXhwb3J0cy5hbGJ1bXNEYXRhID0gYWxidW1zRGF0YVllYXJzLnJldmVyc2UoKVxuZXhwb3J0cy5hbGJ1bXNEYXRhID0gYWxidW1zRGF0YVllYXJzXG5cbiIsImNvbmZpZyA9IFwiYXJ0aXN0cy90cm9sbFwiXG5leHBvcnRzLmNvbmZpZyA9IGNvbmZpZ1xuXG5ncmV5c193aGl0ZSA9IFwiI0ZGRkZGRlwiXG5ncmV5c19wcmVfd2hpdGUgPSBcIiNGN0Y3RjdcIlxuZ3JleXNfdWx0cmFfbGlnaHQgPSBcIiNFRUVFRUVcIlxuZ3JleXNfbGlnaHRlc3QgPSBcIiNERERERERcIlxuZ3JleXNfbGlnaHRlciA9IFwiI0NDQ0NDQ1wiXG5ncmV5c19iYXNlID0gXCIjOTk5OTk5XCJcbmdyZXlzX2RhcmtlciA9IFwiIzY2NjY2NlwiXG5ncmV5c19kYXJrZXN0ID0gXCIjMjIyMjIyXCJcbmdyZXlzX2JsYWNrID0gXCIjMDAwMDAwXCJcblxuXG5leHBvcnRzLmNvbG9yVGhlbWUgPSB7XG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gaGVhZGVyLnBuZ1wiXG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3I6IFwicmdiYSgwLDAsMCxcIlxuXHRuYXZpZ2F0aW9uX292ZXJsYXlfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBkYXJrZXIucG5nXCJcblx0IyBuYXZpZ2F0aW9uX2hlYWRlcl90ZXh0OiBcIiNGRkZGRkZcIlxuXHRcblx0bmF2aWdhdGlvbl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9iZy5wbmdcIlxuXHQjIG5hdmlnYXRpb25fc2hhZG93OiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX2JhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfdGltZWxpbmU6IFwiIzY2NlwiXG5cdG5hdmlnYXRpb25fYmx1cl9yYWRpdXM6IFwiYmx1cigxMHB4KVwiXG5cdG5hdmlnYXRpb25fYmx1cl9jb2xvcjogXCJyZ2JhKDAsMCwwLDAuNilcIlxuXHQjIG5hdmlnYXRpb25fY2FyZF9vdmVybGF5X2JhY2tncm91bmQ6IFwiI0ZGRkZGRlwiXG5cblxuXG5cdHBsYXllcl9iYWNrZ3JvdW5kOiBcIiMxRDFEMURcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfYmFzZTogXCIjNjY2XCJcblx0cGxheWVyX3Byb2dyZXNzX2ZpbGxlZDogXCIjQUYxNDE3XCJcblx0cGxheWVyX3NvbmdfdGl0bGU6IFwid2hpdGVcIlxuXHRwbGF5ZXJfYWxidW1fdGl0bGU6IFwicmdiYSgyMDQsMjA0LDIwNCwwLjUpXCJcblx0XG5cdHBsYXllcl9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0cGxheWVyX3NoYWRvd195OiAtMjBcblx0cGxheWVyX3NoYWRvd19ibHVyOiA0MFxuXG5cblxuXHRjYXJkX3NoYWRvd19jb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRjYXJkX3NoYWRvd195OiAyOFxuXHRjYXJkX3NoYWRvd19ibHVyOiA0MFxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bVxuXHRkZXRhaWxlZF9hbGJ1bV9iYWNrZ3JvdW5kOiBcIiMxMTFcIlxuXHRkZXRhaWxlZF9hbGJ1bV90aXRsZTogXCJ3aGl0ZVwiXG5cdGRldGFpbGVkX2FsYnVtX3llYXI6IFwicmdiYSgyMDQsMjA0LDIwNCwwLjUpXCJcblx0ZmF2X3NvbmdzX3RpdGxlOiBcInJnYmEoMjU1LDI1NSwyNTUsMC41KVwiXG5cdFxuXHQjIERldGFpbGVkIEFsYnVtIFNvbmdcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aXRsZTogXCJ3aGl0ZVwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfbnVtYmVyOiBcIiM5OTlcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWU6IFwiIzk5OVwiXG5cbn1cblxuXG5cblxuXG5uZXdzTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8wLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMC5qcGdcIlxufVxuXG5uZXdzTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMS5qcGdcIlxufVxuXG5uZXdzTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzIuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMi5qcGdcIlxufVxuXG5uZXdzTW9kZWwzID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8zLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzMuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMy5qcGdcIlxufVxuXG5uZXdzTW9kZWw0ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC80LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzQuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNC5qcGdcIlxufVxuXG5uZXdzTW9kZWw1ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC81LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzUuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNS5qcGdcIlxufVxuXG5uZXdzTW9kZWw2ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzYuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNi5qcGdcIlxufVxuXG5uZXdzTW9kZWw3ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC83LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzcuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNy5qcGdcIlxufVxuXG5uZXdzTW9kZWw4ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC84LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzguanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOC5qcGdcIlxufVxuXG5uZXdzTW9kZWw5ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzkuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOS5qcGdcIlxufVxuXG5uZXdzTW9kZWwxMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMTAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMTAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMTAuanBnXCJcbn1cblxuZXhwb3J0cy5mZWVkRGF0YSA9IFtuZXdzTW9kZWwwLCBuZXdzTW9kZWwxLCBuZXdzTW9kZWwyLCBuZXdzTW9kZWwzLCBuZXdzTW9kZWw0LCBuZXdzTW9kZWw1LCBuZXdzTW9kZWw2LCBuZXdzTW9kZWw3LCBuZXdzTW9kZWw4LCBuZXdzTW9kZWw5LCBuZXdzTW9kZWwxMF1cblxuXG5cblxuXG5cblxuXG5cbnZpZGVvTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzAucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzEucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzIucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cblxuXG5wbGF5bGlzdDAgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzAucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzAucG5nXCJcbn1cblxucGxheWxpc3QxID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8xLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8xLnBuZ1wiXG59XG5cbmV4cG9ydHMucGxheWxpc3RzRGF0YSA9IFtwbGF5bGlzdDAsIHBsYXlsaXN0MV1cbmV4cG9ydHMubW92aWVzRGF0YSA9IFt2aWRlb01vZGVsMCwgdmlkZW9Nb2RlbDEsIHZpZGVvTW9kZWwyXVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyBHZXR0aW5nIERhdGFcblxuIyBjb25maWcgPSBcImFydGlzdHMvc3BsZWFuXCJcblxuIyBhbGJ1bU1vZGVsMCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMTk5NFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMTk5NVxuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAxOTk5XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwzID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMDVcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDQgPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDIwMDZcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDUgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDIwMDdcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDYgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAwOVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDEwXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw4ID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAyMDEyXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw5ID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAyMDEzXG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMCA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE0XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMSA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE1XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE2XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE3XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxNCA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE4XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxNSA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDIwXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG5cblxuXG5cbiMgZXhwb3J0cy5hbGJ1bXNEYXRhID0gW2FsYnVtTW9kZWwwLCBhbGJ1bU1vZGVsMSwgYWxidW1Nb2RlbDIsIGFsYnVtTW9kZWwzLCBhbGJ1bU1vZGVsNCwgYWxidW1Nb2RlbDUsIGFsYnVtTW9kZWw2LCBhbGJ1bU1vZGVsNywgYWxidW1Nb2RlbDgsIGFsYnVtTW9kZWw5LCBhbGJ1bU1vZGVsMTAsIGFsYnVtTW9kZWwxMSwgYWxidW1Nb2RlbDEyLCBhbGJ1bU1vZGVsMTMsIGFsYnVtTW9kZWwxNCwgYWxidW1Nb2RlbDE1XVxuXG5cblxuY29uZmlnQWxidW1zID0gY29uZmlnICsgXCIvYWxidW1zL1wiXG4jIHByaW50IGNvbmZpZ0FsYnVtc1xuXG5yYW5kb21Tb3VyY2UgPSBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCJdXG5cblxuZXhwb3J0cy5hbGJ1bXNEYXRhID0gW3t0aXRsZTpcItCY0LrRgNCwXCIseWVhcjoxOTk2LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQlNC+0LvRjyDRgNC40YHQutCwXCIsXCLQqNCw0LzQsNC80LDQvdGLXCIsXCLQodC40LDQvNGB0LrQuNC1INGB0LXRgNC00YbQsFwiLFwi0J3QtSDQt9Cy0LXQt9C00LBcIixcItCU0LXQu9GM0YTQuNC90YtcIixcItCg0LDQvdC10YLQutCwXCIsXCLQndCwINGP0LTRi1wiLFwi0KLQsNC6INC90LDQtNC+XCIsXCLQkNC70LzQsNC30LDQvNC4XCIsXCLQodC40LPQvdCw0LvRi1wiLFwi0JzQsNC70YzRh9C40Lot0YHQvtC70LTQsNGCXCIsXCLQk9C+0LvQvtC0XCIsXCLQodCw0LnQvtC90LDRgNCwINC00LjRgdC60LBcIixcItCU0LDQu9C10LrQvlwiXSx0aW1lOltcIjAzOjU3XCIsXCIwMzozNFwiLFwiMDM6NTZcIixcIjAzOjMwXCIsXCIwNDozOFwiLFwiMDM6MTlcIixcIjAzOjEwXCIsXCIwMzo1OFwiLFwiMDQ6MTVcIixcIjA0OjE3XCIsXCIwNDozNFwiLFwiMDQ6NDNcIixcIjAzOjQ3XCIsXCIwNjoyM1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIwLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQnNC+0YDRgdC60LDRj1wiLHllYXI6MTk5Nyx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JLQtNGA0YPQsyDRg9GI0LvQuCDQv9C+0LXQt9C00LBcIixcItCU0LXQstC+0YfQutCwXCIsXCLQo9GC0LXQutCw0LlcIixcItCc0L7RgNGB0LrQsNGPINCx0L7Qu9C10LfQvdGMXCIsXCLQktC70LDQtNC40LLQvtGB0YLQvtC6IDIwMDBcIixcItCg0L7Qt9CwINCb0Y7QutGB0LXQvNCx0YPRgNCzXCIsXCLQmtC+0YIg0LrQvtGC0LAgKNCS0L7RgiDQuCDQstGB0Y8g0LvRjtCx0L7QstGMKVwiLFwi0JfQsNCx0LDQstGLXCIsXCLQodC60L7RgNC+0YHRgtGMXCIsXCLQktGA0LXQvNGPINGC0LXQv9C70LBcIixcItCU0LXQu9Cw0Lkg0LzQtdC90Y8g0YLQvtGH0L3QvlwiLFwi0JLRgdC10YbQtdC70L4g0LLRgdC10LxcIixcItCS0L7RgdC/0LjRgtCw0L3QvdC40Log0YPQv9Cw0LLRiNC10Lkg0LfQstC10LfQtNGLXCIsXCLQndC+0LLQsNGPINC70YPQvdCwINCw0L/RgNC10LvRj1wiXSx0aW1lOltcIjAzOjUwXCIsXCIwMzoyM1wiLFwiMDI6MThcIixcIjA0OjQxXCIsXCIwMjozOFwiLFwiMDI6MjJcIixcIjAzOjA4XCIsXCIwMjozM1wiLFwiMDM6NTJcIixcIjAzOjA3XCIsXCIwMjo1N1wiLFwiMDM6NTJcIixcIjA0OjI4XCIsXCIwMjo1OVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQqNCw0LzQvtGA0LBcIix5ZWFyOjE5OTgsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCQ0LvQu9C+LCDQv9C+0L/RgSFcIixcItCj0LvRjNGC0LjQvNCw0YLRg9C8XCIsXCLQndC+0LLQsNGPINC70YPQvdCwINCw0L/RgNC10LvRj1wiLFwi0JrQsNGB0YHQtdGC0L3Ri9C5INC80LDQu9GM0YfQuNC6XCIsXCLQmNC90L7Qv9C70LDQvdC10YLQvdGL0Lkg0LPQvtGB0YLRjFwiLFwi0JTQtdCy0YPRiNC60Lgg0Y3QvNCw0L3RgdC40L/RjVwiLFwi0JLQtdGH0LXRgNC90LjQuSDRh9Cw0LlcIixcItCR0LjRgiDQsdGD0LxcIixcItCb0YPQvdC90YvQtSDQtNC10LLQuNGG0YtcIixcItCf0LDRgNC6XCIsXCLQodCw0LnQvtC90LDRgNCwINC00LjRgdC60LBcIixcItCn0ZHRgNC90LDRjyDQtNGL0YDQsFwiLFwi0JIg0LTRg9C80LDRhSDQviDQtNC10LLRg9GI0LrQtSDQuNC3INCz0L7RgNC+0LTQsCDRhtC10L3RgtGA0LDQu9GM0L3QvtCz0L4g0L/QvtC00YfQuNC90LXQvdC40Y8g0JrQndCgXCIsXCLQlNC10LvQsNC5INC80LXQvdGPINGC0L7Rh9C90L5cIixcItCi0LDQuiDRgdGC0YDQsNGI0L3QvlwiLFwi0JLRgdC10YbQtdC70L4g0LLRgdC10LxcIixcItCc0LDQu9GM0YfQuNC6LdGB0L7Qu9C00LDRglwiLFwi0JLQvtGB0L/QuNGC0LDQvdC90LjQuiDRg9C/0LDQstGI0LXQuSDQt9Cy0LXQt9C00YtcIixcItCb0L7QttC40YHRjCwg0L/QvtC00L/QvtC70LrQvtCy0L3QuNC6IVwiLFwi0JTQtdC70LDQuSDQri3QrlwiLFwi0JHQu9GD0LTQu9C40LLRi9C1INC60L7RgtGLXCIsXCLQn9C+0YHQuNC00LXQu9C60Lgt0L/QvtC00LPQu9GP0LTQtdC70LrQuFwiLFwi0JTQsNC70LXQutC+XCIsXCLQrdGF0L7QvCDQs9C+0L3Qs9CwXCJdLHRpbWU6W1wiMDI6MTZcIixcIjAzOjQyXCIsXCIwMjo1OVwiLFwiMDM6NTJcIixcIjAzOjUxXCIsXCIwMjozMVwiLFwiMDM6NDJcIixcIjAyOjE3XCIsXCIwMzoyOFwiLFwiMDI6MzdcIixcIjAzOjQ3XCIsXCIwMzo0OVwiLFwiMDM6MDNcIixcIjAyOjU3XCIsXCIwMzo1MVwiLFwiMDM6NTJcIixcIjA0OjM1XCIsXCIwNDozMFwiLFwiMDM6MTJcIixcIjAzOjQ1XCIsXCIwMzoyNlwiLFwiMDM6MzJcIixcIjA1OjEyXCIsXCIwNDoyNVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIyLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQotC+0YfQvdC+INCg0YLRg9GC0Ywg0JDQu9C+0Y1cIix5ZWFyOjIwMDAsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCa0LDRgNC90LDQstCw0LvQsC7QvdC10YJcIixcItCd0LUg0L7Rh9C10L3RjFwiLFwi0KHQutC+0YDQtdC1INC4INCx0YvRgdGC0YDQvlwiLFwi0JzQvtGPINC/0LXQstC40YbQsFwiLFwi0KHQtdCy0LXRgNC90YvQuSDQv9C+0LvRjtGBXCIsXCLQndC10LLQtdGB0YLQsD9cIixcItCW0LDQsdGA0YtcIixcItCa0LvRg9Cx0L3QuNGH0L3QsNGPXCIsXCLQodC90YtcIixcItCR0LXQtyDQvtCx0LzQsNC90LBcIixcItCV0LzRgyDQvdC1INCy0LfRj9GC0Ywg0YLQtdCx0Y9cIixcItCi0LjRiNC1XCIsXCLQodC70YPRh9Cw0LnQvdC+0YHRgtC4XCJdLHRpbWU6W1wiMDM6MTBcIixcIjAzOjU4XCIsXCIwMzowNlwiLFwiMDQ6MDlcIixcIjAzOjQwXCIsXCIwMzo1NlwiLFwiMDM6MzJcIixcIjAyOjM3XCIsXCIwMzo1OFwiLFwiMDM6MjNcIixcIjA0OjUwXCIsXCIwMzowMFwiLFwiMDM6MzNcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMy5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JzQtdCw0LzRg9GA0YtcIix5ZWFyOjIwMDIsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCSINGA0LXQudGBXCIsXCLQndCwINGD0LTQsNGH0YNcIixcItCt0YLQviDQv9C+INC70Y7QsdCy0LhcIixcItCT0LvRg9Cx0LbQtVwiLFwi0JzQvtGA0YHQutCw0Y8g0LrQsNC/0YPRgdGC0LBcIixcItCf0LvRjtGBIDI4XCIsXCLQlNC+0LHRgNC+0LUg0YPRgtGA0L4sINC/0LvQsNC90LXRgtCwIVwiLFwi0KHRgtC10LrQu9CwXCIsXCLQndC10LTQvtC/0L7QvdC40LzQsNGO0YnQsNGPXCIsXCLQl9C90LDQutC+0LzRi9C8INGB0YLQvtC70LjRh9C90YvQvFwiLFwi0J7QsdC10YnQsNC90LjRj1wiLFwi0K3RgtC+INC/0L4g0LvRjtCx0LLQuFwiXSx0aW1lOltcIjA0OjA5XCIsXCIwMzo1NFwiLFwiMDI6NTRcIixcIjA0OjAzXCIsXCIwMjoyOFwiLFwiMDQ6MzlcIixcIjAzOjI5XCIsXCIwMzo0N1wiLFwiMDQ6MDdcIixcIjA0OjM1XCIsXCIwMzo1N1wiLFwiMDM6NDdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxuXG57dGl0bGU6XCLQn9C+0YXQuNGC0LjRgtC10LvQuCDQutC90LjQs1wiLHllYXI6MjAwNCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0KLQsNC60LjQtSDQtNC10LLRh9C+0L3QutC4XCIsXCLQpNC70LDQvNC10L3QutC+INCa0YDQsNGB0L7RgtC60Lgg0YcuIDJcIixcItCk0LvQsNC80LXQvdC60L4g0JrRgNCw0YHQvtGC0LrQuCDRhy4gMVwiLFwi0JPQtNC1INGC0LDQutC+0Lkg0Y8/XCIsXCLQotCy0L7RjyDQu9C10YLQvdGP0Y9cIixcItCX0L7Qu9C+0YLRi9C1INCy0L7RgNC+0YLQsFwiLFwi0JLQvtC00L7Qv9Cw0LTRiyDRgdC70LXQt1wiLFwi0JfQtdC70LXQvdGL0Lkgcm9ja3NcIixcItCX0LXQu9C10L3Ri9C5IHJvY2tzXCIsXCLQnNC10LTQstC10LTQuNGG0LBcIixcItCR0L7QutGB0LXRgNGB0LrQuNC5INCy0LDQu9GM0YEg0YcuIDIgXFxcItCa0LDRgNCw0LzQtdC70YxcXFwiXCIsXCLQkdC+0LrRgdC10YDRgdC60LjQuSDQstCw0LvRjNGBXCIsXCLQkdC+0LrRgdC10YDRgdC60LjQuSBGdW5reSDQstCw0LvRjNGBXCIsXCLQotCw0LrQuNC1INC00LXQstGH0L7QvdC60LhcIixcItCc0LXQtNCy0LXQtNC40YbQsCBCZXN0b2xvY2ggTWl4XCJdLHRpbWU6W1wiMDQ6MzhcIixcIjM2XCIsXCIwMTowM1wiLFwiMDY6MzVcIixcIjAyOjU1XCIsXCIwMzo1N1wiLFwiMDM6NTRcIixcIjU0XCIsXCIwMzoxOFwiLFwiMDM6NTRcIixcIjAxOjMzXCIsXCIwMjozOFwiLFwiMDQ6NTBcIixcIjA0OjU5XCIsXCIwNDowMVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI1LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQodC70LjRj9C90LjQtSDQuCDQv9C+0LPQu9C+0YnQtdC90LjQtVwiLHllYXI6MjAwNSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JjQvdGC0YDQvlwiLFwi0J/RgNC+0YHRgtC4LCDQmtC40YHQutCwIVwiLFwi0JHQsNC90LfQsNC5XCIsXCLQpdC40YnQvdC40LpcIixcItCh0YLRgNCw0YXRgyDQvdC10YJcIixcItCa0L7RgNCw0LvQu9GLXCIsXCLQn9GA0LjQstCw0YLQuNC30LDRhtC40Y9cIixcItCi0LDQutCx0YvQstCw0LXRgtC90LXRgdC70YPRh9Cw0LnQvdC+XCIsXCLQr9C90YLQsNGA0YxcIixcItCY0YDQuNGBXCIsXCLQndC10L/QvtC60L7QuVwiLFwi0JfQtNGA0LDQstGB0YLQstGD0LnQtNC+0YHQstC40LTQsNC90LjRj1wiXSx0aW1lOltcIjAyOjU0XCIsXCIwNToxMVwiLFwiMDI6NTBcIixcIjAzOjU0XCIsXCIwMzozMFwiLFwiMDQ6MDdcIixcIjAzOjMxXCIsXCIwNDo0OFwiLFwiMDM6NTdcIixcIjAzOjE0XCIsXCIwMjo1MVwiLFwiMDQ6MjRcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiQmVzdCBESuKAmSdzIERhbmNlIE1peCBWb2wuVklcIix5ZWFyOjIwMDYsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCX0LTRgNCw0LLRgdGC0LLRg9C50LTQvtGB0LLQuNC00LDQvdC40Y9cIixcItCh0YLRgNCw0YXRgyDQvdC10YJcIixcItCc0LXQtNCy0LXQtNC40YbQsCB8IERqIEl2YW4gU2NyYXRjaGluJ1wiLFwi0J/RgNC+0YHRgtC4LCDQmtC40YHQutCwXCIsXCLQoSDQndC+0LLRi9C8INCT0L7QtNC+0LwsINCa0YDQvtGI0LrQsCFcIixcItCU0LXQstC+0YfQutCwXCIsXCLQodGC0YDQsNGF0YMg0L3QtdGCXCIsXCLQoSDQndC+0LLRi9C8INCT0L7QtNC+0LwsINCa0YDQvtGI0LrQsCFcIixcIkxhZHkgQWxwaW5lIEJsdWUgfCBEaiBSYW1cIixcIkx1Y2t5IEJyaWRlP1wiLFwi0JjRgNC40YFcIixcItCd0LXQstC10YHRgtCwP1wiLFwi0JTQtdC70YzRhNC40L3Ri1wiLFwi0JjQtNC4LCDRjyDQsdGD0LTRg1wiLFwi0KEg0J3QvtCy0YvQvCDQk9C+0LTQvtC8LCDQmtGA0L7RiNC60LAhXCIsXCLQndC10L/QvtC60L7QuVwiXSx0aW1lOltcIjA1OjA3XCIsXCIwNTowMlwiLFwiMDU6NThcIixcIjAyOjQxXCIsXCIwNDowMFwiLFwiMDM6MTlcIixcIjAyOjQzXCIsXCIwNTowOFwiLFwiMDQ6NTJcIixcIjAzOjU5XCIsXCIwNDowN1wiLFwiMDM6MTNcIixcIjA0OjE4XCIsXCIwNDoyOVwiLFwiMDQ6NTJcIixcIjAyOjQ5XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjcuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIjhcIix5ZWFyOjIwMDgsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCX0LDQv9GD0YHQuiDRgNCw0LrQtdGC0L7Qv9C70LDQvdCwIFxcXCLQmNC+0YHQuNGEINCh0YLQsNC70LjQvVxcXCIg0L3QsCDQm9GD0L3Rg1wiLFwi0K3QuSwg0YLQvtCy0LDRgNC40YlcIixcItCa0L7QvdGC0YDQsNCx0LDQvdC00YtcIixcItCf0YDQvtGB0L/QsNC70LhcIixcItCc0YPQt9GL0LrQsNC90YJcIixcItCd0LDRiNC1INCy0YDQtdC80Y9cIixcItCc0L7Qu9C+0LTQvtGB0YLRjFwiLFwi0JzQtdGC0LXQu9GMXCIsXCLQl9C+0LvQvtGC0L4g0Lgg0LvQsNC00LDQvVwiLFwi0JIg0Y3RgtC+0Lwg0YHQstC10YLQtVwiLFwi0JzQsNC80Ysg0LTQvtGH0LXRgNC10LlcIixcItCv0LTQtdGA0L3Ri9C1INGB0YLQsNC90YbQuNC4XCIsXCLQn9GM0Y/QvdCw0Y8g0YHRgtGA0YPQvdCwXCIsXCLQniwg0YDQsNC5IVwiLFwi0JvQsNC30YPRgNC90L4t0LHQuNGA0Y7Qt9C+0LLRi9C1XCIsXCLQn9C+0YHQv9C4LCDRgNC+0Lot0L0t0YDQvtC70LtcIixcItCQ0LrQstCw0LvQsNC90LPQuFwiLFwi0JLQtdGB0L3QsFwiLFwi0J3QvtGA0LzQsNC70YzQvdGL0Lkg0LHQuNC30L3QtdGBXCIsXCLQpNCw0L3RgtCw0YHRgtC40LrQsFwiLFwi0JrRgNGD0LMg0LfQsNC80LrQvdGD0LvRgdGPXCJdLHRpbWU6W1wiMDE6NTdcIixcIjAzOjQ3XCIsXCIwNDowMFwiLFwiMDM6MTBcIixcIjAzOjQyXCIsXCIwNDo0N1wiLFwiMDQ6NDhcIixcIjAzOjQ0XCIsXCIwNDoyM1wiLFwiMDQ6NTRcIixcIjA1OjMzXCIsXCIwNToxNFwiLFwiMDM6NTVcIixcIjA0OjAwXCIsXCIwNDoxNVwiLFwiMDQ6MjdcIixcIjA1OjAwXCIsXCIwNTowMFwiLFwiMDQ6MjhcIixcIjAzOjQyXCIsXCIwMjo1N1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI4LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJDb21yYWRlIEFtYmFzc2Fkb3JcIix5ZWFyOjIwMDksdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIk1vdGhlcnMgQW5kIERhdWdodGVyc1wiLFwiSGV5LCBUb3ZhcmlzaGNoXCIsXCJXZSBPdmVyc2xlcHRcIixcIk11c2ljaWFuXCIsXCJOdWNsZWFyIFN0YXRpb25zXCIsXCJWZW5vbW91cyBTdGFyXCIsXCJJbiBPdXIgV29ybGRcIixcIkRydW5rZW4gU3RyaW5nXCIsXCJRdWVlbiBPZiBSb2NrXCIsXCJTbm93c3Rvcm1cIixcIldpdG5lc3Nlc1wiLFwiU2xlZXAgUm9jayduJ1JvbGxcIixcIkJ1cm4gSXQgQWxsXCIsXCJDYWxpZm9ybmlhIERyZWFtaW5nXCJdLHRpbWU6W1wiMDU6MzVcIixcIjAzOjQ4XCIsXCIwMzowOVwiLFwiMDM6NDNcIixcIjA1OjE0XCIsXCIwMzowMVwiLFwiMDQ6NTZcIixcIjAzOjU1XCIsXCIwMzowOFwiLFwiMDM6NDVcIixcIjAzOjAyXCIsXCIwNDoyN1wiLFwiMDY6MDdcIixcIjAzOjEyXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjkuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LXQtNC60LjQtSDQt9C10LzQu9C4XCIseWVhcjoyMDEwLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQktC+0LnQvdCwINGH0LXQu9C+0LLQtdGH0LrQvtCyXCIsXCLQodC80L7Qs1wiLFwi0JLQtdGH0LXRgFwiLFwi0JTRgNGD0LPQuNC1INC80LXRgdGC0LBcIixcItCc0LDRgdC70L5cIixcItCb0YPRh9C4XCIsXCLQlNC10LLQvtGH0LrQvtC00YDRg9CzXCIsXCLQqNCw0LzQvtGA0LBcIixcItCY0LTQuCwg0Y8g0LHRg9C00YNcIixcItCd0LXRgiDQvdC10YIg0L3QtdGCXCIsXCLQndCw0YDQutC+0YLQuNC60LDQvCDigJMg0L3QtdGCIVwiLFwi0KHQsNGD0L3QtNGC0YDQtdC6XCIsXCLQndCwINC/0LXRgNC10LrRgNC10YHRgtC60LDRhSDRgdGD0LTRjNCx0YsgKNCh0YLQsNC90Ywg0YfQtdC70L7QstC10LrQvtC8KVwiLFwi0KEg0J3QvtCy0YvQvCDQs9C+0LTQvtC8LCDQutGA0L7RiNC60LAhXCJdLHRpbWU6W1wiMDM6NThcIixcIjA0OjE1XCIsXCIwNDoyNFwiLFwiMDM6NDRcIixcIjAzOjU5XCIsXCIwNDo1MVwiLFwiMDM6NDhcIixcIjAzOjA3XCIsXCIwNTo0M1wiLFwiMDQ6MDhcIixcIjAzOjQxXCIsXCIwMzo1N1wiLFwiMDI6MzhcIixcIjA1OjA1XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEwLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQnNGD0LzQuNC60LDQvCDQvtGCINGC0YDQvtC70LvQuNC60L7Qsi4g0J/QvtGB0L/QuCwg0YDQvtC6LdC9LdGA0L7Qu9C7XCIseWVhcjoyMDEyLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQrdGC0L4g0L/QviDQu9GO0LHQstC4XCIsXCLQniwg0YDQsNC5XCIsXCLQlNC10LvRjNGE0LjQvdGLXCIsXCLQotCw0LrQuNC1INC00LXQstGH0L7QvdC60LhcIixcItCi0LDQuiDQvdCw0LTQvlwiLFwi0KEg0L3QvtCy0YvQvCDQs9C+0LTQvtC8LCDQutGA0L7RiNC60LBcIixcItCd0LXQstC10YHRgtCwXCIsXCLQndC+0LLQsNGPINC70YPQvdCwINCw0L/RgNC10LvRj1wiLFwi0J/QvtGB0L/QuCwg0YDQvtC6LdC9LdGA0L7Qu9C7XCIsXCLQnNC+0Y8g0L/QtdCy0LjRhtCwXCIsXCLQl9Cw0LHQsNCy0YtcIl0sdGltZTpbXCIwMzo0NlwiLFwiMDM6MDZcIixcIjA1OjExXCIsXCIwNDozOFwiLFwiMDQ6MDFcIixcIjA0OjU4XCIsXCIwMzoxOFwiLFwiMDM6MTJcIixcIjAzOjM0XCIsXCIwNDoyOFwiLFwiMDM6MzJcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTEuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCf0LjRgNCw0YLRgdC60LjQtSDQutC+0L/QuNC4XCIseWVhcjoyMDE1LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQoSDRh9C40YHRgtC+0LPQviDQu9C40YHRgtCwXCIsXCLQnNC10LTQu9C10L3QvdGL0LUg0YLQsNC90YbRi1wiLFwi0JLQuNGC0LDQvNC40L3Ri1wiLFwi0J/QuNGA0LDRgtGB0LrQuNC1INC60L7Qv9C40LhcIixcItCa0LDQttC10YLRgdGPXCIsXCLQnNC+0LvQvdC40Y9cIixcItCX0L7Qu9C+0YLQvtC1INGB0LXRgNC00YbQtVwiLFwi0J/QvtGB0LvQtdC00L3QuNC5INC+0YLQv9GD0YHQutC90L7QuVwiLFwi0JrRg9C60LvRi1wiLFwi0JzQvtGI0LrQsFwiLFwi0JPQtNC1INCy0YssINC00LXQstC+0YfQutC4XCIsXCLQmtGC0L4g0LHRg9C00LXRgiDRgdC/0LDRgdCw0YLRjCDRgNC+0Lot0L0t0YDQvtC70LtcIixcItCo0YLQvtGA0LxcIixcItCd0L7Rj9Cx0YDRjFwiLFwiMm5kIFdpbmRcIixcIkZha2UgYSBGYWtlXCIsXCJEb2xwaGluc1wiLFwiMTk4NCBQYXJ0IElJXCIsXCJIb3JvbmdidWxcIixcIldpdGNoXCIsXCJQb2xhciBCZWFyXCIsXCJSb3VuZCBhbmQgUm91bmRcIixcIk95IE95IE95XCIsXCJDaGEtTWEtQ2hhbS1BXCIsXCJZb3UgQ3J1c2ggb24gTWVcIixcIkluIFRoZSBWYWxsZXkgb2YgRWFzZVwiLFwiTWFnaWMgU3RvbmVcIixcIkt1YWl6dW9rYWlcIl0sdGltZTpbXCIwMzo1OFwiLFwiMDk6MDJcIixcIjA0OjE3XCIsXCIwNjoyOFwiLFwiMDQ6MjdcIixcIjA0OjMyXCIsXCIwMzozNFwiLFwiMDM6MzJcIixcIjAyOjU4XCIsXCIwMzo0OVwiLFwiMDQ6NDhcIixcIjA0OjE2XCIsXCIwMzo0MFwiLFwiMDY6MDBcIixcIjA1OjE1XCIsXCIwMzo0M1wiLFwiMDQ6NDZcIixcIjAzOjExXCIsXCIwNDo0NFwiLFwiMDM6MjJcIixcIjA0OjAxXCIsXCIwMzo0NVwiLFwiMDM6MzRcIixcIjAzOjMyXCIsXCIwMzo0M1wiLFwiMDg6MjdcIixcIjA2OjM5XCIsXCIwMzo0OFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfVxuXG5dXG5cblxuXG5cbiMgZXhwb3J0cy5mYXZMaXN0ID0ge1xuIyBcdHNvbmdzOiBbXCJhZFwiXVxuIyBcdHRpbWU6IFtcIjE6MVwiXVxuIyBcdGFsYnVtczogWzNdXG4jIH1cbmV4cG9ydHMuZmF2TGlzdCA9IHtcblx0c29uZ3M6IFtcItCS0LvQsNC00LjQstC+0YHRgtC+0LogMjAwMFwiLCBcItCd0LXQstC10YHRgtCwP1wiLCBcItCj0YLQtdC60LDQuVwiLCBcItCc0LXQtNCy0LXQtNC40YbQv1wiLCAgXCLQrdGC0L4g0L/QviDQu9GO0LHQstC4XCIsIFwi0JfQsNCx0LDQstGLXCIsIFwi0KLQsNC60LjQtSDQtNC10LLRh9C+0L3QutC4XCIsIFwi0JTQtdCy0L7Rh9C60LBcIiwgXCLQpNCw0L3RgtCw0YHRgtC40LrQsFwiLCBcItCU0LXQu9GM0YTQuNC90YtcIl1cblx0c291cmNlOiByYW5kb21Tb3VyY2VcblxuXHR0aW1lOiBbXCIzOjQ3XCIsIFwiNDowOVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCJdXG5cdGFsYnVtczogWzEsIDMsIDEsIDUsIDQsIDEsIDUsIDEsIDksIDBdXG59IiwiY29uZmlnID0gXCJhcnRpc3RzL3NwbGVhblwiXG5leHBvcnRzLmNvbmZpZyA9IGNvbmZpZ1xuXG5ncmV5c193aGl0ZSA9IFwiI0ZGRkZGRlwiXG5ncmV5c19wcmVfd2hpdGUgPSBcIiNGN0Y3RjdcIlxuZ3JleXNfdWx0cmFfbGlnaHQgPSBcIiNFRUVFRUVcIlxuZ3JleXNfbGlnaHRlc3QgPSBcIiNERERERERcIlxuZ3JleXNfbGlnaHRlciA9IFwiI0NDQ0NDQ1wiXG5ncmV5c19iYXNlID0gXCIjOTk5OTk5XCJcbmdyZXlzX2RhcmtlciA9IFwiIzY2NjY2NlwiXG5ncmV5c19kYXJrZXN0ID0gXCIjMjIyMjIyXCJcbmdyZXlzX2JsYWNrID0gXCIjMDAwMDAwXCJcblxuXG5leHBvcnRzLmNvbG9yVGhlbWUgPSB7XG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gaGVhZGVyLnBuZ1wiXG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3I6IFwicmdiYSgyNDQsMTI0LDU0LFwiXG5cdG5hdmlnYXRpb25fb3ZlcmxheV9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGRhcmtlci5wbmdcIlxuXHQjIG5hdmlnYXRpb25faGVhZGVyX3RleHQ6IFwiI0ZGRkZGRlwiXG5cdFxuXHRuYXZpZ2F0aW9uX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL2JnLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9zaGFkb3c6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuMDYpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfdGltZWxpbmU6IFwiIzk5OVwiXG5cdG5hdmlnYXRpb25fYmx1cl9yYWRpdXM6IFwiYmx1cigxMHB4KVwiXG5cdG5hdmlnYXRpb25fYmx1cl9jb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNilcIlxuXHQjIG5hdmlnYXRpb25fY2FyZF9vdmVybGF5X2JhY2tncm91bmQ6IFwiI0ZGRkZGRlwiXG5cblxuXG5cdHBsYXllcl9iYWNrZ3JvdW5kOiBcIndoaXRlXCJcblx0cGxheWVyX3Byb2dyZXNzX2Jhc2U6IFwiI0NDQ1wiXG5cdHBsYXllcl9wcm9ncmVzc19maWxsZWQ6IFwiI0ZGODAxMlwiXG5cdHBsYXllcl9zb25nX3RpdGxlOiBcImJsYWNrXCJcblx0cGxheWVyX2FsYnVtX3RpdGxlOiBcIiM2NjZcIlxuXHRcblx0cGxheWVyX3NoYWRvd19jb2xvcjogXCJyZ2JhKDAsMCwwLDAuMilcIlxuXHRwbGF5ZXJfc2hhZG93X3k6IC04XG5cdHBsYXllcl9zaGFkb3dfYmx1cjogMjBcblxuXG5cblx0Y2FyZF9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0Y2FyZF9zaGFkb3dfeTogMFxuXHRjYXJkX3NoYWRvd19ibHVyOiAyMFxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bVxuXHRkZXRhaWxlZF9hbGJ1bV9iYWNrZ3JvdW5kOiBcIndoaXRlXCJcblx0ZGV0YWlsZWRfYWxidW1fdGl0bGU6IFwiYmxhY2tcIlxuXHRkZXRhaWxlZF9hbGJ1bV95ZWFyOiBcIiM2NjZcIlxuXHRmYXZfc29uZ3NfdGl0bGU6IFwiIzk5OVwiXG5cdFxuXHQjIERldGFpbGVkIEFsYnVtIFNvbmdcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aXRsZTogXCIjMDAwXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ19udW1iZXI6IFwiIzY2NlwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGltZTogXCIjNjY2XCJcblxufVxuXG5cblxuXG5cbm5ld3NNb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8wLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8yLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzMuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8zLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzQuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC80LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzUuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC81LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDYgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC82LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDcgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzcuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC83LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDggPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzguanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC84LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDkgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC85LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xMC5qcGdcIlxufVxuXG5leHBvcnRzLmZlZWREYXRhID0gW25ld3NNb2RlbDAsIG5ld3NNb2RlbDEsIG5ld3NNb2RlbDIsIG5ld3NNb2RlbDMsIG5ld3NNb2RlbDQsIG5ld3NNb2RlbDUsIG5ld3NNb2RlbDYsIG5ld3NNb2RlbDcsIG5ld3NNb2RlbDgsIG5ld3NNb2RlbDksIG5ld3NNb2RlbDEwXVxuXG5cblxuXG5cblxuXG5cblxudmlkZW9Nb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMC5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMS5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMi5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxuXG5cbnBsYXlsaXN0MCA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMC5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMC5wbmdcIlxufVxuXG5wbGF5bGlzdDEgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMS5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzEucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzEucG5nXCJcbn1cblxuZXhwb3J0cy5wbGF5bGlzdHNEYXRhID0gW3BsYXlsaXN0MCwgcGxheWxpc3QxXVxuZXhwb3J0cy5tb3ZpZXNEYXRhID0gW3ZpZGVvTW9kZWwwLCB2aWRlb01vZGVsMSwgdmlkZW9Nb2RlbDJdXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIEdldHRpbmcgRGF0YVxuXG5jb25maWcgPSBcImFydGlzdHMvc3BsZWFuXCJcblxuIyBhbGJ1bU1vZGVsMCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMTk5NFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMTk5NVxuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAxOTk5XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwzID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMDVcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDQgPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDIwMDZcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDUgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDIwMDdcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDYgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAwOVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDEwXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw4ID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAyMDEyXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw5ID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAyMDEzXG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMCA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE0XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMSA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE1XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE2XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE3XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxNCA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE4XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxNSA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDIwXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG5cblxuXG5cbiMgZXhwb3J0cy5hbGJ1bXNEYXRhID0gW2FsYnVtTW9kZWwwLCBhbGJ1bU1vZGVsMSwgYWxidW1Nb2RlbDIsIGFsYnVtTW9kZWwzLCBhbGJ1bU1vZGVsNCwgYWxidW1Nb2RlbDUsIGFsYnVtTW9kZWw2LCBhbGJ1bU1vZGVsNywgYWxidW1Nb2RlbDgsIGFsYnVtTW9kZWw5LCBhbGJ1bU1vZGVsMTAsIGFsYnVtTW9kZWwxMSwgYWxidW1Nb2RlbDEyLCBhbGJ1bU1vZGVsMTMsIGFsYnVtTW9kZWwxNCwgYWxidW1Nb2RlbDE1XVxuXG5cblxuY29uZmlnQWxidW1zID0gY29uZmlnICsgXCIvYWxidW1zL1wiXG5cbnJhbmRvbVNvdXJjZSA9IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIl1cblxuXG5leHBvcnRzLmFsYnVtc0RhdGEgPSBbe3RpdGxlOlwi0J/Ri9C70YzQvdCw0Y8g0LHRi9C70YxcIix5ZWFyOjE5OTQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCW0LXRgNGC0LLQsCDRgtCw0LvQvtCz0L4g0LvRjNC00LBcIixcItCl0L7Qu9C+0LTQvdGL0LUg0LfQuNC80YtcIixcItCc0L3QtSDRgdC60LDQt9Cw0LvQuCDRgdC70L7QstC+XCIsXCLQn9C+0LQg0YHRg9GA0LTQuNC90LrRg1wiLFwi0JPRgNC+0LfQsFwiLFwi0JLQvtC50L3QsFwiLFwi0J/Ri9C70YzQvdCw0Y8g0LHRi9C70YwuINCh0LrQsNC30LrQsFwiLFwi0KHQtdGA0LXQsdGA0Y/QvdGL0LUg0YDQtdC60LhcIixcItCi0LLQvtC1INGA0LDQt9Cx0LjRgtC+0LUg0L/QtdC90YHQvdC1XCIsXCLQodC60LDQt9C+0YfQvdGL0Lkg0LvQtdGI0LjQuVwiLFwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LPRgdC60L7QtSDQvdC10LHQvlwiLFwi0JfQstC10YDQuFwiLFwi0KDRi9Cx0LAg0LHQtdC3INGC0YDRg9GB0L7QslwiXSx0aW1lOltcIjA2OjAxXCIsXCIwMTozMVwiLFwiMDM6MDhcIixcIjAzOjI2XCIsXCIwMzo0NFwiLFwiMDI6MzBcIixcIjA1OjIwXCIsXCIwMjo1MlwiLFwiMDE6MjNcIixcIjAxOjQyXCIsXCIwMjoyOVwiLFwiMDI6MzZcIixcIjAzOjA0XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjAuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCa0L7Qu9C70LXQutGG0LjQvtC90LXRgCDQvtGA0YPQttC40Y9cIix5ZWFyOjE5OTUsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCR0YPQtNGMINC80L7QtdC5INGC0LXQvdGM0Y5cIixcItCb0Y7QsdC+0LLRjCDQuNC00LXRgiDQv9C+INC/0YDQvtCy0L7QtNCw0LxcIixcItCn0LXRgNC90YvQuSDRhtCy0LXRgiDRgdC+0LvQvdGG0LBcIixcItCh0LDQvNC+0LLQsNGAXCIsXCLQltC10YDRgtCy0LAg0YLQsNC70L7Qs9C+INC70YzQtNCwXCIsXCLQp9GC0L4g0YLRiyDQsdGD0LTQtdGI0Ywg0LTQtdC70LDRgtGMXCIsXCLQoNGL0LHQsCDQsdC10Lcg0YLRgNGD0YHQvtCyXCIsXCLQn9GL0LvRjNC90LDRjyDQsdGL0LvRjC4g0KHQutCw0LfQutCwXCIsXCLQndC10YfQtdCz0L4g0LTQtdC70LDRgtGMINCy0L3Rg9GC0YDQuFwiLFwi0JjQtNC4INGH0LXRgNC10Lcg0LvQtdGBXCJdLHRpbWU6W1wiMDU6NDFcIixcIjA0OjI0XCIsXCIwNzo0N1wiLFwiMDU6MzFcIixcIjA1OjQ2XCIsXCIwNTowOVwiLFwiMDM6MDlcIixcIjA1OjM1XCIsXCIwMzoyNlwiLFwiMDY6MzJcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KTQvtC90LDRgNGMINC/0L7QtCDQs9C70LDQt9C+0LxcIix5ZWFyOjE5OTcsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCc0L7Qu9C40YLQstCwXCIsXCLQryDQvdC1INGF0L7Rh9GDINC00L7QvNC+0LlcIixcItCR0L7QvdC90Lgg0Lgg0JrQu9Cw0LnQtFwiLFwi0KLRgNC4INGG0LLQtdGC0LAgKNCf0LXRgNCy0YvQuSDRgdC90LXQsylcIixcItCd0LXQstGB0LrQuNC5INC/0YDQvtGB0L/QtdC60YJcIixcItCh0L/QuCDQsiDQt9Cw0LHRgNC+0YjQtdC90L3QvtC8INC00L7QvNC1XCIsXCLQn9GA0LjRgNC+0LbQtNC10L3QvdGL0Lkg0YPQsdC40LnRhtCwXCIsXCLQp9Cw0YHRgtGD0YjQutC4XCIsXCLQnNC+0Y8g0LvRjtCx0L7QstGMXCIsXCLQkNC90LPQu9C+LdGA0YPRgdGB0LrQuNC5INGB0LvQvtCy0LDRgNGMICjQlNCw0LLQsNC5LCDQm9Cw0LzQsClcIixcItCh0LrQvtGA0L4g0LHRg9C00LXRgiDRgdC+0LvQvdC10YfQvdC+XCIsXCLQl9CwINGB0YLQtdC90L7QuVwiXSx0aW1lOltcIjMyXCIsXCIwMzo0OVwiLFwiMDI6NDBcIixcIjA0OjQwXCIsXCIwNToxMlwiLFwiMDQ6MTdcIixcIjAzOjIxXCIsXCIwNDo0NFwiLFwiMDM6MzZcIixcIjA0OjM2XCIsXCIwNDo0MlwiLFwiMDE6MjdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JPRgNCw0L3QsNGC0L7QstGL0Lkg0LDQu9GM0LHQvtC8XCIseWVhcjoxOTk4LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQktC10YHRjCDRjdGC0L7RgiDQsdGA0LXQtFwiLFwi0JTQvtGB0YLQsNC90Ywg0LPRgNCw0L3QsNGC0YNcIixcItCe0YDQsdC40YIg0LHQtdC3INGB0LDRhdCw0YDQsFwiLFwi0J/RgNC40YXQvtC00LhcIixcItCh0LLQtdGCINCz0L7RgNC10Lsg0LLRgdGOINC90L7Rh9GMXCIsXCLQm9GO0YHRjyDRgdC40LTQuNGCINC00L7QvNCwXCIsXCLQkdC+0LMg0YPRgdGC0LDQuyDQvdCw0YEg0LvRjtCx0LjRgtGMXCIsXCLQmtCw0YLQuNGB0YwsINC60L7Qu9C10YHQviFcIixcItCS0YvRhdC+0LTQsCDQvdC10YJcIixcItCa0L7QutGC0LXQudC70Lgg0YLRgNC10YLRjNC10Lkg0LzQuNGA0L7QstC+0LlcIixcItCU0LbQuNC8XCIsXCLQnNCw0YDQuNGPINC4INCl0YPQsNC90LBcIixcItCf0L7QtNCy0L7QtNC90LDRjyDQu9C+0LTQutCwXCJdLHRpbWU6W1wiMDM6MDZcIixcIjA0OjEwXCIsXCIwMjoxN1wiLFwiMDQ6MDJcIixcIjAyOjMwXCIsXCIwMzo1N1wiLFwiMDI6MzJcIixcIjAyOjQ3XCIsXCIwMzo0N1wiLFwiMDI6NTJcIixcIjAyOjQ3XCIsXCIwODowM1wiLFwiMDM6NDNcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMy5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JDQu9GM0YLQsNCy0LjRgdGC0LBcIix5ZWFyOjE5OTksdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCQ0LvRjNGC0LDQstC40YHRgtCwXCIsXCLQnNC+0LvQvtC60L4g0Lgg0LzRkdC0XCIsXCLQn9C40Lst0LrRg9GA0LjQu1wiLFwi0KLQtdGA0L/RgdC40YXQvtGA0LBcIixcItCU0LDQu9C10LrQviDQtNC+0LzQvtC5XCIsXCLQkNCx0YHQtdC90YJcIixcItCU0L7QsdGA0YvRhSDQtNC10Lsg0LzQsNGB0YLQtdGAXCIsXCLQnNC+0YLQvtGG0LjQutC70LXRgtC90LDRjyDRhtC10L/RjFwiLFwi0KHRg9C80LDRgdGI0LXQtNGI0LjQuSDQsNCy0YLQvtCx0YPRgVwiLFwi0JDQu9C60L7Qs9C+0LvRjFwiLFwi0JLRgdGC0YDQtdGC0LjQvNGB0Y8g0LfQsNCy0YLRgNCwXCIsXCLQnNC+0LvQvtC60L4g0Lgg0LzRkdC0XCJdLHRpbWU6W1wiMDY6MDZcIixcIjA0OjM5XCIsXCIwNDo1M1wiLFwiMDI6NDdcIixcIjAzOjU3XCIsXCIwMTo1NFwiLFwiMDQ6NTVcIixcIjA0OjE1XCIsXCIwMzo1MFwiLFwiMDU6MjVcIixcIjA0OjI3XCIsXCIwNTowM1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI0LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCIyNS3QuSDQutCw0LTRgFwiLHllYXI6MjAwMSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JvQuNC90LjRjyDQttC40LfQvdC4XCIsXCLQl9Cy0LXQt9C00LAg0YDQvtC6LdC9LdGA0L7Qu9C70LBcIixcItCS0YHQtdCz0L4g0YXQvtGA0L7RiNC10LPQvlwiLFwi0JzQvtGRINGB0LXRgNC00YbQtVwiLFwi0KDQuNC60Lgt0KLQuNC60Lgt0KLQsNCy0LhcIixcIlNPUyFcIixcIkZlbGxpbmlcIixcItCe0YHRgtCw0LXQvNGB0Y8g0LfQuNC80L7QstCw0YLRjFwiLFwi0KLQtdCx0LUg0Y3RgtC+INGB0L3QuNGC0YHRj1wiLFwi0KHQvtCy0YHQtdC8INC00YDRg9Cz0L7QuVwiLFwi0J/Qu9Cw0YHRgtC80LDRgdGB0L7QstCw0Y8g0LbQuNC30L3RjFwiLFwi0J/QvtC5INC80L3QtSDQtdGJ0ZFcIixcItCb0LXQvdC40L3Qs9GA0LDQtCAtIEFtc3RlcmRhbVwiLFwiRmluZVwiXSx0aW1lOltcIjAzOjAwXCIsXCIwNDoxMFwiLFwiMDI6NTlcIixcIjA0OjA5XCIsXCIwMTo1OFwiLFwiMDQ6MjZcIixcIjA0OjQ0XCIsXCIwMzozOFwiLFwiMDQ6NThcIixcIjAyOjA4XCIsXCIwMjoyNVwiLFwiMDM6NTVcIixcIjAyOjM2XCIsXCIyOVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI1LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQndC+0LLRi9C1INC70Y7QtNC4XCIseWVhcjoyMDAzLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQndC+0LLRi9C1INC70Y7QtNC4XCIsXCLQktGA0LXQvNGPLCDQndCw0LfQsNC0IVwiLFwi0JPQsNC90LTQsdC+0LtcIixcItCh0LvQvtC80LDQvdC+INCS0YHQtVwiLFwi0JTQtdCy0Y/RgtC40Y3RgtCw0LbQvdGL0Lkg0LTQvtC8XCIsXCLQkdC70L7QutCw0LTQsFwiLFwi0JLQsNC70LTQsNC5XCIsXCLQmdC+0LMg0KHQv9C+0LrQvtC10L1cIixcItCh0LXQstC10YDQvi3Ql9Cw0L/QsNC0XCIsXCLQoNCt0J8gKNCd0LXRgNCy0L3QvtC1INCh0LXRgNC00YbQtSlcIixcItCQ0LvRjNGC0LDQstC40YHRgtCwICjQlNGA0YPQs9Cw0Y8g0KLQvtGH0LrQsCDQl9GA0LXQvdC40Y8pXCJdLHRpbWU6W1wiMDM6NDRcIixcIjA0OjEyXCIsXCIwMjozNVwiLFwiMDQ6MTZcIixcIjA0OjMwXCIsXCIwMzoyMlwiLFwiMDQ6MjdcIixcIjAyOjU2XCIsXCIwMzo1M1wiLFwiMDM6MTRcIixcIjA0OjA3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjYuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0YXRgNC+0L3QuNC60LAg0YHQvtCx0YvRgtC40LlcIix5ZWFyOjIwMDQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCe0LrQtdCw0L1cIixcItCh0LXQvNGMINCy0L7RgdGM0LzRi9GFXCIsXCLQqNCw0YLQviDQnNCw0YDQs9C+XCIsXCLQnNGLINGB0LjQtNC10LvQuCDQuCDQutGD0YDQuNC70LhcIixcItCh0LjQsNC90YPQutCy0LjQu9GMXCIsXCLQp9C10LvQvtCy0LXQuiDQuCDQlNC10YDQtdCy0L5cIixcItCb0LDQsdC40YDQuNC90YJcIixcItCo0LDQs9C4XCIsXCLQkdC10YDQuNC70LvQuNC5XCIsXCLQn9Cw0YDQvtCy0L7Qt1wiLFwi0JvRjtC00Lgg0L3QsCDQu9Cw0LTQvtC90LhcIixcItCj0YDQvtC6INCz0LXQvtCz0YDQsNGE0LjQuFwiLFwi0JLRgdGRINCy0LrQu9GO0YfQtdC90L5cIixcItCT0L7Qu9C+0YEg0LfQsCDQutCw0LTRgNC+0LxcIixcItCg0L7QvNCw0L3RgVwiXSx0aW1lOltcIjM2XCIsXCIwNDoyMlwiLFwiMDM6NTRcIixcIjAzOjE5XCIsXCIwMjozMlwiLFwiMDI6MTZcIixcIjA0OjQ4XCIsXCIwMToyOVwiLFwiMDM6MzFcIixcIjUzXCIsXCIwMjowMVwiLFwiMDQ6NTlcIixcIjAzOjIwXCIsXCIwMTowOFwiLFwiMDM6MjdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNy5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiLHllYXI6MjAwNyx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JzQtdC70YzQutC90YPQu9CwINGH0YzRjy3RgtC+INGC0LXQvdGMXCIsXCLQodC60LDQttC4XCIsXCLQnNCw0YLRh1wiLFwi0J3QsCDRgdGH0LDRgdGC0YzQtVwiLFwi0JLQvtC70L3QsFwiLFwi0JvQtdC/0LXRgdGC0L7QulwiLFwi0JjQvNC/0LXRgNCw0YLQvtGAXCIsXCLQkdC10YLRhdC+0LLQtdC9XCIsXCLQnNCw0Y/QulwiLFwi0J/RgNCw0LfQtNC90LjQulwiLFwi0KHRg9GF0LDRgNC4INC4INGB0YPRiNC60LhcIixcItCc0L7QsdC40LvRjNC90YvQuVwiLFwi0JrQvtC70L7QutC+0LtcIixcItCf0YDQvtCx0LrQuFwiLFwi0JzQsNC80LzQsCDQvNC40Y9cIixcItCf0YDQvtGH0YxcIixcItCh0YvQvVwiXSx0aW1lOltcIjAzOjE2XCIsXCIwMzoxMlwiLFwiMDI6NTFcIixcIjAyOjQ0XCIsXCIwMzoyOVwiLFwiMDM6MzhcIixcIjAxOjE1XCIsXCIwMjo0NFwiLFwiMDM6NDlcIixcIjAyOjIxXCIsXCIwNTozMVwiLFwiMDM6MjVcIixcIjAzOjQwXCIsXCIwNDowM1wiLFwiMDM6MDFcIixcIjAzOjIwXCIsXCIwMTo1MVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI4LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQodC40LPQvdCw0Lsg0LjQtyDQutC+0YHQvNC+0YHQsFwiLHllYXI6MjAwOSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0J3QsNGB0YLRgNC+0LnQutCwINC30LLRg9C60LBcIixcItCU0YvRiNC4INC70LXQs9C60L5cIixcItCU0L7QsdGA0L4g0L/QvtC20LDQu9C+0LLQsNGC0YxcIixcItCR0L7Qu9GM0YjQtSDQvdC40LrQsNC60L7Qs9C+INGA0L7Qui3QvS3RgNC+0LvQu9CwXCIsXCLQktC90LjQtyDQs9C+0LvQvtCy0L7QuVwiLFwi0KfQtdGA0LTQsNC6XCIsXCLQl9C10LvQtdC90LDRjyDQv9C10YHQvdGPXCIsXCLQmtCw0LzQtdC90YxcIixcIjMwMDdcIixcItCR0LXQtyDRgtC+0YDQvNC+0LfQvtCyXCIsXCLQmtC+0YDQsNCx0LvRjCDQttC00LXRgiFcIixcItCn0LXQu9C+0LLQtdC6INC90LUg0YHQv9Cw0LtcIixcItCa0L7QstGH0LXQs1wiLFwi0JLRi9C/0YPRgdGC0Lgg0LzQtdC90Y8g0L7RgtGB0Y7QtNCwXCIsXCLQn9C40YHRjNC80L5cIixcItCS0YHQtSDRgtCw0Log0YHRgtGA0LDQvdC90L5cIixcItCS0LDQu9GM0YFcIixcItCU0L4g0LLRgdGC0YDQtdGH0LhcIl0sdGltZTpbXCIwMjo0MFwiLFwiMDM6NTNcIixcIjA0OjExXCIsXCIwNDoxMlwiLFwiMDM6MDVcIixcIjA0OjA3XCIsXCIwMzozMFwiLFwiMDQ6NTlcIixcIjAyOjExXCIsXCIwMzoxNFwiLFwiMDI6NDRcIixcIjAyOjUyXCIsXCIwMzozMlwiLFwiMDM6MTFcIixcIjAyOjI5XCIsXCIwMjowM1wiLFwiMDM6MDdcIixcIjA0OjIyXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjkuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCe0LHQvNCw0L0g0LfRgNC10L3QuNGPXCIseWVhcjoyMDEyLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQo9Cy0LXRgNGC0Y7RgNCwXCIsXCLQm9C10YLQtdC70LAg0LbQuNC30L3RjFwiLFwi0KfRkdGA0L3QsNGPINCS0L7Qu9Cz0LBcIixcItCb0LXRgdGC0L3QuNGG0LBcIixcItCh0YLRgNCw0YjQvdCw0Y8g0YLQsNC50L3QsFwiLFwi0J/QtdGC0LXRgNCx0YPRgNCz0YHQutCw0Y8g0YHQstCw0LTRjNCx0LBcIixcItCU0L7Rh9GMINGB0LDQvNGD0YDQsNGPXCIsXCLQpNC40LHQvtC90LDRh9GH0LhcIixcItCSINC80LjRgNC1INC40LvQu9GO0LfQuNC5XCIsXCLQn9GA0LDQt9C00L3QuNC6ICjQlNGA0YPQs9Cw0Y8g0YLQvtGH0LrQsCDQt9GA0LXQvdC40Y8pXCIsXCLQmtC+0LLRiFwiLFwi0KHQvtC70L3RhtC1INCy0LfQvtC50LTRkdGCXCIsXCLQp9GD0LTQsNC6XCIsXCLQktC+0LvRiNC10LHQvdC+0LUg0YHQu9C+0LLQvlwiXSx0aW1lOltcIjAxOjQ0XCIsXCIwMjozMFwiLFwiMDI6NDZcIixcIjAyOjE4XCIsXCIwMjoyNFwiLFwiMDQ6MjBcIixcIjAzOjM2XCIsXCIwMzoyN1wiLFwiMDI6NThcIixcIjAyOjM5XCIsXCIwMzowMVwiLFwiMDM6MzVcIixcIjAyOjI5XCIsXCIwNDoyNFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQtdC30L7QvdCw0L3RgS4g0KfQsNGB0YLRjCAxXCIseWVhcjoyMDE0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQktGB0LDQtNC90LjQulwiLFwi0JDQuSDQu9C+0LIg0Y4hXCIsXCLQodGC0LDRgNGL0Lkg0LTQvtC8XCIsXCLQnNC+0YDQvtC3INC/0L4g0LrQvtC20LVcIixcItCc0YvRgdC70YxcIixcItCV0YHRgtGMINC60YLQvi3QvdC40LHRg9C00Ywg0LbQuNCy0L7QuT9cIixcItCg0LDQuSDQsiDRiNCw0LvQsNGI0LVcIixcItCS0YHRkSDQvdCw0L7QsdC+0YDQvtGCXCIsXCLQn9C+0LzQvtC70YfQuNC8INC90LXQvNC90L7Qs9C+XCIsXCLQn9GD0YHRgtGMINC40LPRgNCw0LXRgiDQvNGD0LfRi9C60LAhXCIsXCLQk9C+0YDQuNC30L7QvdGCINGB0L7QsdGL0YLQuNC5XCIsXCLQodGA0LXQtNC4INC30LjQvNGLXCIsXCLQlNCy0LXRgNC90L7QuSDQs9C70LDQt9C+0LpcIixcItCf0L7QtNCy0L7QtNC90LDRjyDQv9C10YHQvdGPXCJdLHRpbWU6W1wiMDI6NTBcIixcIjAzOjIwXCIsXCIwMjozOVwiLFwiMDM6MDVcIixcIjAzOjUyXCIsXCIwMzoxMFwiLFwiMDM6MTNcIixcIjAxOjIyXCIsXCIwMzo0MlwiLFwiMDM6MTNcIixcIjAyOjM1XCIsXCIwMjo0MlwiLFwiMDU6MjNcIixcIjAzOjI4XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjExLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNC10LfQvtC90LDQvdGBLiDQp9Cw0YHRgtGMIDJcIix5ZWFyOjIwMTUsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCa0YDQsNGB0L7RgtCwXCIsXCLQntGA0LrQtdGB0YLRgFwiLFwi0J/QtdGB0L3RjyDQvdCwINC+0LTQvdC+0Lwg0LDQutC60L7RgNC00LVcIixcItCU0LLQsCDQv9C70Y7RgSDQvtC00LjQvVwiLFwi0J/QvtC70L3QsNGPINC70YPQvdCwXCIsXCLQotCw0L3RhtGD0LkhXCIsXCLQodC40LzRhNC+0L3QuNGPXCIsXCLQndC10YTRgtGMXCIsXCLQn9C+0LbQsNGAXCIsXCLQqNCw0YXQvNCw0YLRi1wiLFwi0JjRgdGH0LXQt9Cw0LXQvCDQsiDRgtC10LzQvdC+0YLQtVwiXSx0aW1lOltcIjAyOjU4XCIsXCIwNDoxMVwiLFwiMDQ6MTBcIixcIjAyOjM3XCIsXCIwMzozOFwiLFwiMDQ6MTBcIixcIjAyOjU0XCIsXCIwMjoxNFwiLFwiMDI6NTNcIixcIjA1OjUzXCIsXCIwNDowNVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfVxuXG5dXG5cblxuXG5cbiMgZXhwb3J0cy5mYXZMaXN0ID0ge1xuIyBcdHNvbmdzOiBbXCJhZFwiXVxuIyBcdHRpbWU6IFtcIjE6MVwiXVxuIyBcdGFsYnVtczogWzNdXG4jIH1cbmV4cG9ydHMuZmF2TGlzdCA9IHtcblx0c29uZ3M6IFtcItCS0YvRhdC+0LTQsCDQvdC10YJcIiwgXCLQnNC+0LUg0YHQtdGA0LTRhtC1XCIsIFwi0KLQsNC90YbRg9C5XCIsIFwi0KDQvtC80LDQvdGBXCIsICBcItCb0LjQvdC40Y8g0JbQuNC30L3QuFwiLCBcItCe0YDQutC10YHRgtGAXCIsIFwi0J7RgNCx0LjRgiDQsdC10Lcg0YHQsNGF0LDRgNCwXCIsIFwi0JTQvtGH0Ywg0YHQsNC80YPRgNCw0Y9cIiwgXCLQoNCw0Lkg0LIg0YjQsNC70LDRiNC1XCIsIFwi0J/QvtC5INC80L3QtSDQtdGJ0LVcIl1cblx0c291cmNlOiByYW5kb21Tb3VyY2VcblxuXHR0aW1lOiBbXCIzOjQ3XCIsIFwiNDowOVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCJdXG5cdGFsYnVtczogWzMsIDUsIDEyLCA3LCA1LCAxMiwgMywgMTAsIDExLCA1XVxufSIsImNvbmZpZyA9IFwiYXJ0aXN0cy9zcGxlYW5cIlxuZXhwb3J0cy5jb25maWcgPSBjb25maWdcblxuZ3JleXNfd2hpdGUgPSBcIiNGRkZGRkZcIlxuZ3JleXNfcHJlX3doaXRlID0gXCIjRjdGN0Y3XCJcbmdyZXlzX3VsdHJhX2xpZ2h0ID0gXCIjRUVFRUVFXCJcbmdyZXlzX2xpZ2h0ZXN0ID0gXCIjREREREREXCJcbmdyZXlzX2xpZ2h0ZXIgPSBcIiNDQ0NDQ0NcIlxuZ3JleXNfYmFzZSA9IFwiIzk5OTk5OVwiXG5ncmV5c19kYXJrZXIgPSBcIiM2NjY2NjZcIlxuZ3JleXNfZGFya2VzdCA9IFwiIzIyMjIyMlwiXG5ncmV5c19ibGFjayA9IFwiIzAwMDAwMFwiXG5cblxuZXhwb3J0cy5jb2xvclRoZW1lID0ge1xuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGhlYWRlci5wbmdcIlxuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yOiBcInJnYmEoMjQ0LDEyNCw1NCxcIlxuXHRuYXZpZ2F0aW9uX292ZXJsYXlfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBkYXJrZXIucG5nXCJcblx0IyBuYXZpZ2F0aW9uX2hlYWRlcl90ZXh0OiBcIiNGRkZGRkZcIlxuXHRcblx0bmF2aWdhdGlvbl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9iZy5wbmdcIlxuXHQjIG5hdmlnYXRpb25fc2hhZG93OiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX2JhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjA2KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX3RpbWVsaW5lOiBcIiM5OTlcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfcmFkaXVzOiBcImJsdXIoMTBweClcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfY29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjYpXCJcblx0IyBuYXZpZ2F0aW9uX2NhcmRfb3ZlcmxheV9iYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIlxuXG5cblxuXHRwbGF5ZXJfYmFja2dyb3VuZDogXCJ3aGl0ZVwiXG5cdHBsYXllcl9wcm9ncmVzc19iYXNlOiBcIiNDQ0NcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfZmlsbGVkOiBcIiNGRjgwMTJcIlxuXHRwbGF5ZXJfc29uZ190aXRsZTogXCJibGFja1wiXG5cdHBsYXllcl9hbGJ1bV90aXRsZTogXCIjNjY2XCJcblx0XG5cdHBsYXllcl9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0cGxheWVyX3NoYWRvd195OiAtOFxuXHRwbGF5ZXJfc2hhZG93X2JsdXI6IDIwXG5cblxuXG5cdGNhcmRfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC4yKVwiXG5cdGNhcmRfc2hhZG93X3k6IDBcblx0Y2FyZF9zaGFkb3dfYmx1cjogMjBcblx0XG5cdCMgRGV0YWlsZWQgQWxidW1cblx0ZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZDogXCJ3aGl0ZVwiXG5cdGRldGFpbGVkX2FsYnVtX3RpdGxlOiBcImJsYWNrXCJcblx0ZGV0YWlsZWRfYWxidW1feWVhcjogXCIjNjY2XCJcblx0ZmF2X3NvbmdzX3RpdGxlOiBcIiM5OTlcIlxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bSBTb25nXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGU6IFwiIzAwMFwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfbnVtYmVyOiBcIiM2NjZcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWU6IFwiIzY2NlwiXG5cbn1cblxuXG5cblxuXG5uZXdzTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8wLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMC5qcGdcIlxufVxuXG5uZXdzTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMS5qcGdcIlxufVxuXG5uZXdzTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzIuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMi5qcGdcIlxufVxuXG5uZXdzTW9kZWwzID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8zLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzMuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMy5qcGdcIlxufVxuXG5uZXdzTW9kZWw0ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC80LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzQuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNC5qcGdcIlxufVxuXG5uZXdzTW9kZWw1ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC81LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzUuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNS5qcGdcIlxufVxuXG5uZXdzTW9kZWw2ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzYuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNi5qcGdcIlxufVxuXG5uZXdzTW9kZWw3ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC83LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzcuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNy5qcGdcIlxufVxuXG5uZXdzTW9kZWw4ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC84LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzguanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOC5qcGdcIlxufVxuXG5uZXdzTW9kZWw5ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzkuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOS5qcGdcIlxufVxuXG5uZXdzTW9kZWwxMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMTAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMTAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMTAuanBnXCJcbn1cblxuZXhwb3J0cy5mZWVkRGF0YSA9IFtuZXdzTW9kZWwwLCBuZXdzTW9kZWwxLCBuZXdzTW9kZWwyLCBuZXdzTW9kZWwzLCBuZXdzTW9kZWw0LCBuZXdzTW9kZWw1LCBuZXdzTW9kZWw2LCBuZXdzTW9kZWw3LCBuZXdzTW9kZWw4LCBuZXdzTW9kZWw5LCBuZXdzTW9kZWwxMF1cblxuXG5cblxuXG5cblxuXG5cbnZpZGVvTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzAucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzEucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzIucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cblxuXG5wbGF5bGlzdDAgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzAucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzAucG5nXCJcbn1cblxucGxheWxpc3QxID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8xLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8xLnBuZ1wiXG59XG5cbmV4cG9ydHMucGxheWxpc3RzRGF0YSA9IFtwbGF5bGlzdDAsIHBsYXlsaXN0MV1cbmV4cG9ydHMubW92aWVzRGF0YSA9IFt2aWRlb01vZGVsMCwgdmlkZW9Nb2RlbDEsIHZpZGVvTW9kZWwyXVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyBHZXR0aW5nIERhdGFcblxuY29uZmlnID0gXCJhcnRpc3RzL3NwbGVhblwiXG5cbiMgYWxidW1Nb2RlbDAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDE5OTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDE5OTVcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMTk5OVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA1XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAyMDA2XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw1ID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAyMDA3XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw2ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMDlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDcgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAxMlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAxM1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTEgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxN1xuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTQgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxOFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTUgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAyMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuXG5cblxuXG4jIGV4cG9ydHMuYWxidW1zRGF0YSA9IFthbGJ1bU1vZGVsMCwgYWxidW1Nb2RlbDEsIGFsYnVtTW9kZWwyLCBhbGJ1bU1vZGVsMywgYWxidW1Nb2RlbDQsIGFsYnVtTW9kZWw1LCBhbGJ1bU1vZGVsNiwgYWxidW1Nb2RlbDcsIGFsYnVtTW9kZWw4LCBhbGJ1bU1vZGVsOSwgYWxidW1Nb2RlbDEwLCBhbGJ1bU1vZGVsMTEsIGFsYnVtTW9kZWwxMiwgYWxidW1Nb2RlbDEzLCBhbGJ1bU1vZGVsMTQsIGFsYnVtTW9kZWwxNV1cblxuXG5cbmNvbmZpZ0FsYnVtcyA9IGNvbmZpZyArIFwiL2FsYnVtcy9cIlxuXG5yYW5kb21Tb3VyY2UgPSBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCJdXG5cblxuZXhwb3J0cy5hbGJ1bXNEYXRhID0gW3t0aXRsZTpcItCf0YvQu9GM0L3QsNGPINCx0YvQu9GMXCIseWVhcjoxOTk0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQltC10YDRgtCy0LAg0YLQsNC70L7Qs9C+INC70YzQtNCwXCIsXCLQpdC+0LvQvtC00L3Ri9C1INC30LjQvNGLXCIsXCLQnNC90LUg0YHQutCw0LfQsNC70Lgg0YHQu9C+0LLQvlwiLFwi0J/QvtC0INGB0YPRgNC00LjQvdC60YNcIixcItCT0YDQvtC30LBcIixcItCS0L7QudC90LBcIixcItCf0YvQu9GM0L3QsNGPINCx0YvQu9GMLiDQodC60LDQt9C60LBcIixcItCh0LXRgNC10LHRgNGP0L3Ri9C1INGA0LXQutC4XCIsXCLQotCy0L7QtSDRgNCw0LfQsdC40YLQvtC1INC/0LXQvdGB0L3QtVwiLFwi0KHQutCw0LfQvtGH0L3Ri9C5INC70LXRiNC40LlcIixcItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCz0YHQutC+0LUg0L3QtdCx0L5cIixcItCX0LLQtdGA0LhcIixcItCg0YvQsdCwINCx0LXQtyDRgtGA0YPRgdC+0LJcIl0sdGltZTpbXCIwNjowMVwiLFwiMDE6MzFcIixcIjAzOjA4XCIsXCIwMzoyNlwiLFwiMDM6NDRcIixcIjAyOjMwXCIsXCIwNToyMFwiLFwiMDI6NTJcIixcIjAxOjIzXCIsXCIwMTo0MlwiLFwiMDI6MjlcIixcIjAyOjM2XCIsXCIwMzowNFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIwLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQmtC+0LvQu9C10LrRhtC40L7QvdC10YAg0L7RgNGD0LbQuNGPXCIseWVhcjoxOTk1LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQkdGD0LTRjCDQvNC+0LXQuSDRgtC10L3RjNGOXCIsXCLQm9GO0LHQvtCy0Ywg0LjQtNC10YIg0L/QviDQv9GA0L7QstC+0LTQsNC8XCIsXCLQp9C10YDQvdGL0Lkg0YbQstC10YIg0YHQvtC70L3RhtCwXCIsXCLQodCw0LzQvtCy0LDRgFwiLFwi0JbQtdGA0YLQstCwINGC0LDQu9C+0LPQviDQu9GM0LTQsFwiLFwi0KfRgtC+INGC0Ysg0LHRg9C00LXRiNGMINC00LXQu9Cw0YLRjFwiLFwi0KDRi9Cx0LAg0LHQtdC3INGC0YDRg9GB0L7QslwiLFwi0J/Ri9C70YzQvdCw0Y8g0LHRi9C70YwuINCh0LrQsNC30LrQsFwiLFwi0J3QtdGH0LXQs9C+INC00LXQu9Cw0YLRjCDQstC90YPRgtGA0LhcIixcItCY0LTQuCDRh9C10YDQtdC3INC70LXRgVwiXSx0aW1lOltcIjA1OjQxXCIsXCIwNDoyNFwiLFwiMDc6NDdcIixcIjA1OjMxXCIsXCIwNTo0NlwiLFwiMDU6MDlcIixcIjAzOjA5XCIsXCIwNTozNVwiLFwiMDM6MjZcIixcIjA2OjMyXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCk0L7QvdCw0YDRjCDQv9C+0LQg0LPQu9Cw0LfQvtC8XCIseWVhcjoxOTk3LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQnNC+0LvQuNGC0LLQsFwiLFwi0K8g0L3QtSDRhdC+0YfRgyDQtNC+0LzQvtC5XCIsXCLQkdC+0L3QvdC4INC4INCa0LvQsNC50LRcIixcItCi0YDQuCDRhtCy0LXRgtCwICjQn9C10YDQstGL0Lkg0YHQvdC10LMpXCIsXCLQndC10LLRgdC60LjQuSDQv9GA0L7RgdC/0LXQutGCXCIsXCLQodC/0Lgg0LIg0LfQsNCx0YDQvtGI0LXQvdC90L7QvCDQtNC+0LzQtVwiLFwi0J/RgNC40YDQvtC20LTQtdC90L3Ri9C5INGD0LHQuNC50YbQsFwiLFwi0KfQsNGB0YLRg9GI0LrQuFwiLFwi0JzQvtGPINC70Y7QsdC+0LLRjFwiLFwi0JDQvdCz0LvQvi3RgNGD0YHRgdC60LjQuSDRgdC70L7QstCw0YDRjCAo0JTQsNCy0LDQuSwg0JvQsNC80LApXCIsXCLQodC60L7RgNC+INCx0YPQtNC10YIg0YHQvtC70L3QtdGH0L3QvlwiLFwi0JfQsCDRgdGC0LXQvdC+0LlcIl0sdGltZTpbXCIzMlwiLFwiMDM6NDlcIixcIjAyOjQwXCIsXCIwNDo0MFwiLFwiMDU6MTJcIixcIjA0OjE3XCIsXCIwMzoyMVwiLFwiMDQ6NDRcIixcIjAzOjM2XCIsXCIwNDozNlwiLFwiMDQ6NDJcIixcIjAxOjI3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjIuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCT0YDQsNC90LDRgtC+0LLRi9C5INCw0LvRjNCx0L7QvFwiLHllYXI6MTk5OCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JLQtdGB0Ywg0Y3RgtC+0YIg0LHRgNC10LRcIixcItCU0L7RgdGC0LDQvdGMINCz0YDQsNC90LDRgtGDXCIsXCLQntGA0LHQuNGCINCx0LXQtyDRgdCw0YXQsNGA0LBcIixcItCf0YDQuNGF0L7QtNC4XCIsXCLQodCy0LXRgiDQs9C+0YDQtdC7INCy0YHRjiDQvdC+0YfRjFwiLFwi0JvRjtGB0Y8g0YHQuNC00LjRgiDQtNC+0LzQsFwiLFwi0JHQvtCzINGD0YHRgtCw0Lsg0L3QsNGBINC70Y7QsdC40YLRjFwiLFwi0JrQsNGC0LjRgdGMLCDQutC+0LvQtdGB0L4hXCIsXCLQktGL0YXQvtC00LAg0L3QtdGCXCIsXCLQmtC+0LrRgtC10LnQu9C4INGC0YDQtdGC0YzQtdC5INC80LjRgNC+0LLQvtC5XCIsXCLQlNC20LjQvFwiLFwi0JzQsNGA0LjRjyDQuCDQpdGD0LDQvdCwXCIsXCLQn9C+0LTQstC+0LTQvdCw0Y8g0LvQvtC00LrQsFwiXSx0aW1lOltcIjAzOjA2XCIsXCIwNDoxMFwiLFwiMDI6MTdcIixcIjA0OjAyXCIsXCIwMjozMFwiLFwiMDM6NTdcIixcIjAyOjMyXCIsXCIwMjo0N1wiLFwiMDM6NDdcIixcIjAyOjUyXCIsXCIwMjo0N1wiLFwiMDg6MDNcIixcIjAzOjQzXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjMuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCQ0LvRjNGC0LDQstC40YHRgtCwXCIseWVhcjoxOTk5LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQkNC70YzRgtCw0LLQuNGB0YLQsFwiLFwi0JzQvtC70L7QutC+INC4INC80ZHQtFwiLFwi0J/QuNC7LdC60YPRgNC40LtcIixcItCi0LXRgNC/0YHQuNGF0L7RgNCwXCIsXCLQlNCw0LvQtdC60L4g0LTQvtC80L7QuVwiLFwi0JDQsdGB0LXQvdGCXCIsXCLQlNC+0LHRgNGL0YUg0LTQtdC7INC80LDRgdGC0LXRgFwiLFwi0JzQvtGC0L7RhtC40LrQu9C10YLQvdCw0Y8g0YbQtdC/0YxcIixcItCh0YPQvNCw0YHRiNC10LTRiNC40Lkg0LDQstGC0L7QsdGD0YFcIixcItCQ0LvQutC+0LPQvtC70YxcIixcItCS0YHRgtGA0LXRgtC40LzRgdGPINC30LDQstGC0YDQsFwiLFwi0JzQvtC70L7QutC+INC4INC80ZHQtFwiXSx0aW1lOltcIjA2OjA2XCIsXCIwNDozOVwiLFwiMDQ6NTNcIixcIjAyOjQ3XCIsXCIwMzo1N1wiLFwiMDE6NTRcIixcIjA0OjU1XCIsXCIwNDoxNVwiLFwiMDM6NTBcIixcIjA1OjI1XCIsXCIwNDoyN1wiLFwiMDU6MDNcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiMjUt0Lkg0LrQsNC00YBcIix5ZWFyOjIwMDEsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCb0LjQvdC40Y8g0LbQuNC30L3QuFwiLFwi0JfQstC10LfQtNCwINGA0L7Qui3QvS3RgNC+0LvQu9CwXCIsXCLQktGB0LXQs9C+INGF0L7RgNC+0YjQtdCz0L5cIixcItCc0L7RkSDRgdC10YDQtNGG0LVcIixcItCg0LjQutC4LdCi0LjQutC4LdCi0LDQstC4XCIsXCJTT1MhXCIsXCJGZWxsaW5pXCIsXCLQntGB0YLQsNC10LzRgdGPINC30LjQvNC+0LLQsNGC0YxcIixcItCi0LXQsdC1INGN0YLQviDRgdC90LjRgtGB0Y9cIixcItCh0L7QstGB0LXQvCDQtNGA0YPQs9C+0LlcIixcItCf0LvQsNGB0YLQvNCw0YHRgdC+0LLQsNGPINC20LjQt9C90YxcIixcItCf0L7QuSDQvNC90LUg0LXRidGRXCIsXCLQm9C10L3QuNC90LPRgNCw0LQgLSBBbXN0ZXJkYW1cIixcIkZpbmVcIl0sdGltZTpbXCIwMzowMFwiLFwiMDQ6MTBcIixcIjAyOjU5XCIsXCIwNDowOVwiLFwiMDE6NThcIixcIjA0OjI2XCIsXCIwNDo0NFwiLFwiMDM6MzhcIixcIjA0OjU4XCIsXCIwMjowOFwiLFwiMDI6MjVcIixcIjAzOjU1XCIsXCIwMjozNlwiLFwiMjlcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0J3QvtCy0YvQtSDQu9GO0LTQuFwiLHllYXI6MjAwMyx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0J3QvtCy0YvQtSDQu9GO0LTQuFwiLFwi0JLRgNC10LzRjywg0J3QsNC30LDQtCFcIixcItCT0LDQvdC00LHQvtC7XCIsXCLQodC70L7QvNCw0L3QviDQktGB0LVcIixcItCU0LXQstGP0YLQuNGN0YLQsNC20L3Ri9C5INC00L7QvFwiLFwi0JHQu9C+0LrQsNC00LBcIixcItCS0LDQu9C00LDQuVwiLFwi0JnQvtCzINCh0L/QvtC60L7QtdC9XCIsXCLQodC10LLQtdGA0L4t0JfQsNC/0LDQtFwiLFwi0KDQrdCfICjQndC10YDQstC90L7QtSDQodC10YDQtNGG0LUpXCIsXCLQkNC70YzRgtCw0LLQuNGB0YLQsCAo0JTRgNGD0LPQsNGPINCi0L7Rh9C60LAg0JfRgNC10L3QuNGPKVwiXSx0aW1lOltcIjAzOjQ0XCIsXCIwNDoxMlwiLFwiMDI6MzVcIixcIjA0OjE2XCIsXCIwNDozMFwiLFwiMDM6MjJcIixcIjA0OjI3XCIsXCIwMjo1NlwiLFwiMDM6NTNcIixcIjAzOjE0XCIsXCIwNDowN1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI2LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINGF0YDQvtC90LjQutCwINGB0L7QsdGL0YLQuNC5XCIseWVhcjoyMDA0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQntC60LXQsNC9XCIsXCLQodC10LzRjCDQstC+0YHRjNC80YvRhVwiLFwi0KjQsNGC0L4g0JzQsNGA0LPQvlwiLFwi0JzRiyDRgdC40LTQtdC70Lgg0Lgg0LrRg9GA0LjQu9C4XCIsXCLQodC40LDQvdGD0LrQstC40LvRjFwiLFwi0KfQtdC70L7QstC10Log0Lgg0JTQtdGA0LXQstC+XCIsXCLQm9Cw0LHQuNGA0LjQvdGCXCIsXCLQqNCw0LPQuFwiLFwi0JHQtdGA0LjQu9C70LjQuVwiLFwi0J/QsNGA0L7QstC+0LdcIixcItCb0Y7QtNC4INC90LAg0LvQsNC00L7QvdC4XCIsXCLQo9GA0L7QuiDQs9C10L7Qs9GA0LDRhNC40LhcIixcItCS0YHRkSDQstC60LvRjtGH0LXQvdC+XCIsXCLQk9C+0LvQvtGBINC30LAg0LrQsNC00YDQvtC8XCIsXCLQoNC+0LzQsNC90YFcIl0sdGltZTpbXCIzNlwiLFwiMDQ6MjJcIixcIjAzOjU0XCIsXCIwMzoxOVwiLFwiMDI6MzJcIixcIjAyOjE2XCIsXCIwNDo0OFwiLFwiMDE6MjlcIixcIjAzOjMxXCIsXCI1M1wiLFwiMDI6MDFcIixcIjA0OjU5XCIsXCIwMzoyMFwiLFwiMDE6MDhcIixcIjAzOjI3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjcuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIix5ZWFyOjIwMDcsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCc0LXQu9GM0LrQvdGD0LvQsCDRh9GM0Y8t0YLQviDRgtC10L3RjFwiLFwi0KHQutCw0LbQuFwiLFwi0JzQsNGC0YdcIixcItCd0LAg0YHRh9Cw0YHRgtGM0LVcIixcItCS0L7Qu9C90LBcIixcItCb0LXQv9C10YHRgtC+0LpcIixcItCY0LzQv9C10YDQsNGC0L7RgFwiLFwi0JHQtdGC0YXQvtCy0LXQvVwiLFwi0JzQsNGP0LpcIixcItCf0YDQsNC30LTQvdC40LpcIixcItCh0YPRhdCw0YDQuCDQuCDRgdGD0YjQutC4XCIsXCLQnNC+0LHQuNC70YzQvdGL0LlcIixcItCa0L7Qu9C+0LrQvtC7XCIsXCLQn9GA0L7QsdC60LhcIixcItCc0LDQvNC80LAg0LzQuNGPXCIsXCLQn9GA0L7Rh9GMXCIsXCLQodGL0L1cIl0sdGltZTpbXCIwMzoxNlwiLFwiMDM6MTJcIixcIjAyOjUxXCIsXCIwMjo0NFwiLFwiMDM6MjlcIixcIjAzOjM4XCIsXCIwMToxNVwiLFwiMDI6NDRcIixcIjAzOjQ5XCIsXCIwMjoyMVwiLFwiMDU6MzFcIixcIjAzOjI1XCIsXCIwMzo0MFwiLFwiMDQ6MDNcIixcIjAzOjAxXCIsXCIwMzoyMFwiLFwiMDE6NTFcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KHQuNCz0L3QsNC7INC40Lcg0LrQvtGB0LzQvtGB0LBcIix5ZWFyOjIwMDksdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCd0LDRgdGC0YDQvtC50LrQsCDQt9Cy0YPQutCwXCIsXCLQlNGL0YjQuCDQu9C10LPQutC+XCIsXCLQlNC+0LHRgNC+INC/0L7QttCw0LvQvtCy0LDRgtGMXCIsXCLQkdC+0LvRjNGI0LUg0L3QuNC60LDQutC+0LPQviDRgNC+0Lot0L0t0YDQvtC70LvQsFwiLFwi0JLQvdC40Lcg0LPQvtC70L7QstC+0LlcIixcItCn0LXRgNC00LDQulwiLFwi0JfQtdC70LXQvdCw0Y8g0L/QtdGB0L3Rj1wiLFwi0JrQsNC80LXQvdGMXCIsXCIzMDA3XCIsXCLQkdC10Lcg0YLQvtGA0LzQvtC30L7QslwiLFwi0JrQvtGA0LDQsdC70Ywg0LbQtNC10YIhXCIsXCLQp9C10LvQvtCy0LXQuiDQvdC1INGB0L/QsNC7XCIsXCLQmtC+0LLRh9C10LNcIixcItCS0YvQv9GD0YHRgtC4INC80LXQvdGPINC+0YLRgdGO0LTQsFwiLFwi0J/QuNGB0YzQvNC+XCIsXCLQktGB0LUg0YLQsNC6INGB0YLRgNCw0L3QvdC+XCIsXCLQktCw0LvRjNGBXCIsXCLQlNC+INCy0YHRgtGA0LXRh9C4XCJdLHRpbWU6W1wiMDI6NDBcIixcIjAzOjUzXCIsXCIwNDoxMVwiLFwiMDQ6MTJcIixcIjAzOjA1XCIsXCIwNDowN1wiLFwiMDM6MzBcIixcIjA0OjU5XCIsXCIwMjoxMVwiLFwiMDM6MTRcIixcIjAyOjQ0XCIsXCIwMjo1MlwiLFwiMDM6MzJcIixcIjAzOjExXCIsXCIwMjoyOVwiLFwiMDI6MDNcIixcIjAzOjA3XCIsXCIwNDoyMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI5LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQntCx0LzQsNC9INC30YDQtdC90LjRj1wiLHllYXI6MjAxMix0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0KPQstC10YDRgtGO0YDQsFwiLFwi0JvQtdGC0LXQu9CwINC20LjQt9C90YxcIixcItCn0ZHRgNC90LDRjyDQktC+0LvQs9CwXCIsXCLQm9C10YHRgtC90LjRhtCwXCIsXCLQodGC0YDQsNGI0L3QsNGPINGC0LDQudC90LBcIixcItCf0LXRgtC10YDQsdGD0YDQs9GB0LrQsNGPINGB0LLQsNC00YzQsdCwXCIsXCLQlNC+0YfRjCDRgdCw0LzRg9GA0LDRj1wiLFwi0KTQuNCx0L7QvdCw0YfRh9C4XCIsXCLQkiDQvNC40YDQtSDQuNC70LvRjtC30LjQuVwiLFwi0J/RgNCw0LfQtNC90LjQuiAo0JTRgNGD0LPQsNGPINGC0L7Rh9C60LAg0LfRgNC10L3QuNGPKVwiLFwi0JrQvtCy0YhcIixcItCh0L7Qu9C90YbQtSDQstC30L7QudC00ZHRglwiLFwi0KfRg9C00LDQulwiLFwi0JLQvtC70YjQtdCx0L3QvtC1INGB0LvQvtCy0L5cIl0sdGltZTpbXCIwMTo0NFwiLFwiMDI6MzBcIixcIjAyOjQ2XCIsXCIwMjoxOFwiLFwiMDI6MjRcIixcIjA0OjIwXCIsXCIwMzozNlwiLFwiMDM6MjdcIixcIjAyOjU4XCIsXCIwMjozOVwiLFwiMDM6MDFcIixcIjAzOjM1XCIsXCIwMjoyOVwiLFwiMDQ6MjRcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTAuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LXQt9C+0L3QsNC90YEuINCn0LDRgdGC0YwgMVwiLHllYXI6MjAxNCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JLRgdCw0LTQvdC40LpcIixcItCQ0Lkg0LvQvtCyINGOIVwiLFwi0KHRgtCw0YDRi9C5INC00L7QvFwiLFwi0JzQvtGA0L7QtyDQv9C+INC60L7QttC1XCIsXCLQnNGL0YHQu9GMXCIsXCLQldGB0YLRjCDQutGC0L4t0L3QuNCx0YPQtNGMINC20LjQstC+0Lk/XCIsXCLQoNCw0Lkg0LIg0YjQsNC70LDRiNC1XCIsXCLQktGB0ZEg0L3QsNC+0LHQvtGA0L7RglwiLFwi0J/QvtC80L7Qu9GH0LjQvCDQvdC10LzQvdC+0LPQvlwiLFwi0J/Rg9GB0YLRjCDQuNCz0YDQsNC10YIg0LzRg9C30YvQutCwIVwiLFwi0JPQvtGA0LjQt9C+0L3RgiDRgdC+0LHRi9GC0LjQuVwiLFwi0KHRgNC10LTQuCDQt9C40LzRi1wiLFwi0JTQstC10YDQvdC+0Lkg0LPQu9Cw0LfQvtC6XCIsXCLQn9C+0LTQstC+0LTQvdCw0Y8g0L/QtdGB0L3Rj1wiXSx0aW1lOltcIjAyOjUwXCIsXCIwMzoyMFwiLFwiMDI6MzlcIixcIjAzOjA1XCIsXCIwMzo1MlwiLFwiMDM6MTBcIixcIjAzOjEzXCIsXCIwMToyMlwiLFwiMDM6NDJcIixcIjAzOjEzXCIsXCIwMjozNVwiLFwiMDI6NDJcIixcIjA1OjIzXCIsXCIwMzoyOFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQtdC30L7QvdCw0L3RgS4g0KfQsNGB0YLRjCAyXCIseWVhcjoyMDE1LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQmtGA0LDRgdC+0YLQsFwiLFwi0J7RgNC60LXRgdGC0YBcIixcItCf0LXRgdC90Y8g0L3QsCDQvtC00L3QvtC8INCw0LrQutC+0YDQtNC1XCIsXCLQlNCy0LAg0L/Qu9GO0YEg0L7QtNC40L1cIixcItCf0L7Qu9C90LDRjyDQu9GD0L3QsFwiLFwi0KLQsNC90YbRg9C5IVwiLFwi0KHQuNC80YTQvtC90LjRj1wiLFwi0J3QtdGE0YLRjFwiLFwi0J/QvtC20LDRgFwiLFwi0KjQsNGF0LzQsNGC0YtcIixcItCY0YHRh9C10LfQsNC10Lwg0LIg0YLQtdC80L3QvtGC0LVcIl0sdGltZTpbXCIwMjo1OFwiLFwiMDQ6MTFcIixcIjA0OjEwXCIsXCIwMjozN1wiLFwiMDM6MzhcIixcIjA0OjEwXCIsXCIwMjo1NFwiLFwiMDI6MTRcIixcIjAyOjUzXCIsXCIwNTo1M1wiLFwiMDQ6MDVcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTIuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX1cblxuXVxuXG5cblxuXG4jIGV4cG9ydHMuZmF2TGlzdCA9IHtcbiMgXHRzb25nczogW1wiYWRcIl1cbiMgXHR0aW1lOiBbXCIxOjFcIl1cbiMgXHRhbGJ1bXM6IFszXVxuIyB9XG5leHBvcnRzLmZhdkxpc3QgPSB7XG5cdHNvbmdzOiBbXCLQktGL0YXQvtC00LAg0L3QtdGCXCIsIFwi0JzQvtC1INGB0LXRgNC00YbQtVwiLCBcItCi0LDQvdGG0YPQuVwiLCBcItCg0L7QvNCw0L3RgVwiLCAgXCLQm9C40L3QuNGPINCW0LjQt9C90LhcIiwgXCLQntGA0LrQtdGB0YLRgFwiLCBcItCe0YDQsdC40YIg0LHQtdC3INGB0LDRhdCw0YDQsFwiLCBcItCU0L7Rh9GMINGB0LDQvNGD0YDQsNGPXCIsIFwi0KDQsNC5INCyINGI0LDQu9Cw0YjQtVwiLCBcItCf0L7QuSDQvNC90LUg0LXRidC1XCJdXG5cdHNvdXJjZTogcmFuZG9tU291cmNlXG5cblx0dGltZTogW1wiMzo0N1wiLCBcIjQ6MDlcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiXVxuXHRhbGJ1bXM6IFszLCA1LCAxMiwgNywgNSwgMTIsIDMsIDEwLCAxMSwgNV1cbn0iLCJjbGFzcyBleHBvcnRzLkFsYnVtIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5hbGJ1bUlEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAnYWxidW1JRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRCA9IHZhbHVlXG5cblxuXHRcdFx0Iiwie1RleHRMYXllcn0gPSByZXF1aXJlIFwidGV4dFwiXG57Q2FyZH0gPSByZXF1aXJlICdjYXJkJ1xuQ29udHJhc3QgPSByZXF1aXJlICdjb250cmFzdCdcblxuU29uZ0NyZWF0b3IgPSByZXF1aXJlICdjcmVhdGVfc29uZydcblxuQXJ0aXN0ID0gcmVxdWlyZSAnYXJ0aXN0J1xuY29uZmlnID0gQXJ0aXN0LmNvbmZpZ1xuXG5cbmV4cG9ydHMucmV0dXJuQ29udGVudFZpZXcgPSAoYWxidW1JRCwgY2FyZCkgLT5cblx0bG9jYWxGb250Q29sb3IgPSBcIiMwMDBcIlxuXHRsb2NhbENvbnRlbnRDb2xvciA9IFwid2hpdGVcIlxuXHRcblx0Y29udGVudFZpZXdCZyA9IG5ldyBMYXllciB3aWR0aDogNjE2LCBoZWlnaHQ6IDg3NCwgeDogOCwgeTogMCwgYm9yZGVyUmFkaXVzOiAxMiwgYmFja2dyb3VuZENvbG9yOiBsb2NhbENvbnRlbnRDb2xvciwgcHJvcGFnYXRlRXZlbnRzOiBmYWxzZVxuXHRcblx0XG5cdGNvbnRlbnRWaWV3Qmcub24gRXZlbnRzLkNsaWNrLCAtPlxuXHRcdFxuXHRzaHVmZmxlQnJlYWtlciA9IG5ldyBMYXllciB3aWR0aDogNjE2LCBoZWlnaHQ6IDIsIHg6IDAsIHk6IDQ4KjIsIGJhY2tncm91bmRDb2xvcjogbG9jYWxGb250Q29sb3IsIG9wYWNpdHk6IDAuMiwgcGFyZW50OiBjb250ZW50Vmlld0JnXG5cblx0XG5cdHNodWZmbGVUaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IGNvbnRlbnRWaWV3Qmdcblx0XHR0ZXh0OiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINCw0LvRjNCx0L7QvFwiXG5cdFx0d2lkdGg6IDI4NCoyXG5cdFx0aGVpZ2h0OiAxOCoyXG5cdFx0eDogMTIqMlxuXHRcdHk6IDE1KjJcblx0XHRmb250U2l6ZTogMTUqMlxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRjb2xvcjogbG9jYWxGb250Q29sb3Jcblx0XHRvcGFjaXR5OiAwLjhcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblx0XHRcblxuXHQjIHNodWZmbGUgPSBuZXcgTGF5ZXIgd2lkdGg6IDU2OCwgaGVpZ2h0OiA2MCwgeDogMjQsIHk6IDE0KjIsIGltYWdlOiBcImltYWdlcy9zaHVmZmxlLnBuZ1wiLCBwYXJlbnQ6IGNvbnRlbnRWaWV3QmdcblxuXHQjIGZvciBzb25nIGluIEFydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzXG5cdGFsYnVtU29uZ3MgPSBTb25nQ3JlYXRvci5jcmVhdGVTb25nc0ZvckFsYnVtKGFsYnVtSUQsIGxvY2FsRm9udENvbG9yKVxuXHRmb3Igc29uZywgaSBpbiBhbGJ1bVNvbmdzXG5cdFx0c29uZy55ID0gc29uZy5oZWlnaHQgKiAoaSkgKyA0OCoyXG5cdFx0c29uZy5wYXJlbnQgPSBjb250ZW50Vmlld0JnXG5cdFx0c29uZy5hbGJ1bUlEID0gYWxidW1JRFxuXHRcdHNvbmcucHJvcGFnYXRlRXZlbnRzID0gZmFsc2Vcblx0XG5cdGNvbnRlbnRWaWV3QmcuaGVpZ2h0ID0gc29uZy5oZWlnaHQgKiBhbGJ1bVNvbmdzLmxlbmd0aCArIDE0KjIgKyA2MCArIDgqMlxuXHRzdHVkaW8gPSBuZXcgTGF5ZXIgd2lkdGg6IDIwOCwgaGVpZ2h0OiAyNCwgeDogMjE2LCBpbWFnZTogXCJpbWFnZXMvc3R1ZGlvLnBuZ1wiLCBwYXJlbnQ6IGNhcmQsIHk6IHNvbmcuaGVpZ2h0ICogYWxidW1Tb25ncy5sZW5ndGggKyAxNCoyICsgNjAgKyA4KjIgKyAxMDgqMiArIDIwXG5cdCMgY2FyZC5oZWlnaHQgPSBzb25nLmhlaWdodCAqIGFsYnVtU29uZ3MubGVuZ3RoICsgMTQqMiArIDYwICsgOCoyICsgMTA4KjIgKyAyMCArIDIwICsgc3R1ZGlvLmhlaWdodCs0XG5cdFxuXHRyZXR1cm4gW2NvbnRlbnRWaWV3QmcsIGFsYnVtU29uZ3NdXG5cblxuXG5leHBvcnRzLnJldHVybkFsYnVtVmlldyA9IChhbGJ1bUlEKSAtPlxuXHRjYXJkQ29sb3IgPSBuZXcgQ29sb3IoXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpbnRDb2xvcn1cIilcblx0bG9jYWxGb250Q29sb3IgPSBjYXJkQ29sb3Jcblx0bG9jYWxDb250ZW50Q29sb3IgPSBjYXJkQ29sb3Jcblx0bG9jYWxGb250Q29sb3IgPSBDb250cmFzdC5yZXR1cm5UZXh0Q29sb3IoY2FyZENvbG9yKVxuXHRsb2NhbENvbnRlbnRDb2xvciA9IENvbnRyYXN0LnJldHVybkNvbnRlbnRDb2xvcihjYXJkQ29sb3IpXG5cblx0Y2FyZCA9IG5ldyBDYXJkIHdpZHRoOiA2NDAsIGhlaWdodDogMTA4KjIrMTA4LCBib3JkZXJSYWRpdXM6IDIwLCBib3JkZXJXaWR0aDogNCwgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjEpXCIsIGNhcmRJRDogYWxidW1JRCwgYmFja2dyb3VuZENvbG9yOiBjYXJkQ29sb3Jcblx0XG5cdHRvcFZpZXcgPSBuZXcgTGF5ZXIgd2lkdGg6IDY0MCwgaGVpZ2h0OiAxMDgqMiwgYmFja2dyb3VuZENvbG9yOiBcIm51bGxcIiwgcGFyZW50OiBjYXJkXG5cblx0aW1hZ2VfYmcgPSBuZXcgTGF5ZXIgd2lkdGg6IDE1NiwgaGVpZ2h0OiAxNTYsIHg6IDM2LCB5OiAyOCwgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsMClcIiwgc2hhZG93WTogMjAsIHNoYWRvd0JsdXI6IDI4LCBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIiwgcGFyZW50OiBjYXJkXG5cdFxuXHRjYXJkLmltYWdlTGF5ZXIgPSBpbWFnZV9iZ1xuXHRcblxuXHRpbWFnZSA9IG5ldyBMYXllciB3aWR0aDogMTU2LCBoZWlnaHQ6IDE1NiwgeDogMzYsIHk6IDI4LCBpbWFnZTogXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLmltYWdlfVwiLCBwYXJlbnQ6IGNhcmRcblxuXHRhbGJ1bVRpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogY2FyZFxuXHRcdHRleHQ6IFwiI3tBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS50aXRsZX1cIlxuXHRcdHdpZHRoOiAyMTAqMlxuXHRcdGhlaWdodDogNTAqMlxuXHRcdHg6IDEwOCoyXG5cdFx0eTogMTQqMlxuXHRcdGZvbnRTaXplOiAxOCoyXG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdGNvbG9yOiBsb2NhbEZvbnRDb2xvclxuXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcblx0YWxidW1ZZWFyID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogY2FyZFxuXHRcdHRleHQ6IFwiI3tBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS55ZWFyfVwiXG5cdFx0d2lkdGg6IDIwMCoyXG5cdFx0aGVpZ2h0OiA1MCoyXG5cdFx0eDogMTA4KjJcblx0XHR5OiA3NCoyXG5cdFx0Zm9udFNpemU6IDEzKjJcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0Y29sb3I6IGxvY2FsRm9udENvbG9yXG5cdFx0b3BhY2l0eTogMC44XG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cblxuXG5cdFxuXG5cblx0XG5cdFxuXHRcblx0XG5cdFxuXHRyZXR1cm4gW2NhcmQsIHRvcFZpZXddIiwiIyBQcmV2aWV3IENvbXBvbmVudFxuQXNzZXRzID0gcmVxdWlyZSBcIlByZXZpZXdDb21wb25lbnRBc3NldHNcIlxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxubG9jYWxDb2xvcnMgPVxuXHRiZ19jb2xvcl9vbkxpZ2h0OiBcIiNlZWVcIlxuXHRiZ19jb2xvcl9vbkRhcms6IFwiIzIyMlwiXG5cdGNvbnRlbnRfY29sb3Jfb25MaWdodDogXCIjMDAwXCJcblx0Y29udGVudF9jb2xvcl9vbkRhcms6IFwiI0ZGRlwiXG5cbnRoZW1lID1cblx0YmdfY29sb3I6IGxvY2FsQ29sb3JzLmJnX2NvbG9yX29uRGFya1xuXHRjb250ZW50X2NvbG9yOiBsb2NhbENvbG9ycy5jb250ZW50X2NvbG9yX29uRGFya1xuXG5cbiMgTG9nb1xuXG5jbGFzcyBMb2dvTGF5ZXIgZXh0ZW5kcyBTVkdMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdHN2ZzogZ2V0TG9nbyhsb2NhbENvbG9ycy5jb250ZW50X2NvbG9yX29uRGFyaylcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXG5cblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuXG4jIE5hdGl2ZVxuXG5gd2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGZ1bmN0aW9uIChsYXllcikge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBsYXllclxufVxuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlTm9ybWFsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVOb3JtYWxcIiwgcmVjZWl2ZU1lc3NhZ2VOb3JtYWwsIGZhbHNlKTtcbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zb2xlLmxvZyhldmVudClcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvRmlsbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVGaWxsXCIsIHJlY2VpdmVNZXNzYWdlLCBmYWxzZSk7XG5gXG5cblxuXG4jIFByZXZpZXdcblxuIyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlldyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogXCIyMDoxNlwiXG5cdFx0XHRuYW1lOiBcIlByZXZpZXdcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlXG5cdFx0XHRcblx0XHRcdHZpc2libGU6IHRydWVcblx0XHRcdHRvcFRoZW1lOiBcImRhcmtcIlxuXHRcdFx0Ym90dG9tVGhlbWU6IFwiZGFya1wiXG5cdFx0XHRhc3NldHM6IEFzc2V0cy5kYXRhXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHR3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0KEApXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cdFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAndG9wVGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudG9wVGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudG9wVGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYm90dG9tVGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm90dG9tVGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYm90dG9tVGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYXNzZXRzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0c1xuIyBcdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dCYXIgPSB2YWx1ZVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJub3JtYWxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwiZmlsbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXHRcblx0XG5cdFxuXHRcblx0Z2V0TG9jYXRpb25EYXRhOiAoKSA9PlxuXHRcdHF1ZXJ5QXJyYXkgPSBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cblx0XHRmb3IgaXRlbSBpbiBxdWVyeUFycmF5XG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJzY2FsZVwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcImZpbGxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0XHRcdGVsc2UgaWYgdmFsdWVQYXJ0ID09IFwibm9ybWFsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cdFx0XHRcblx0XG5cdFxuXHR1cGRhdGVTY2FsZVN0YXRlOiAoKSA9PlxuXHRcdHNjYWxlWCA9IChDYW52YXMud2lkdGggLSAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKENhbnZhcy5oZWlnaHQgLSAxMTIpIC8gQGhlaWdodFxuXHRcdEBzdGF0ZXMuZmlsbC5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcblx0c2V0RGVza3RvcFNjYWxlTW9kZTogKGZvclN0YXRlID0gXCJub3JtYWxcIikgPT5cblx0XHRAdXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0aW5pdFN0YXRlID0gZm9yU3RhdGVcblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJzY2FsZVwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcImZpbGxcIiB0aGVuIGluaXRTdGF0ZSA9IFwiZmlsbFwiXG5cdFx0XHRcdGVsc2UgaW5pdFN0YXRlID0gXCJub3JtYWxcIlxuXHRcdFxuXHRcdHNob3VsZFNob3dCdXR0b24gPSB0cnVlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwiYnV0dG9uXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwib2ZmXCIgdGhlbiBzaG91bGRTaG93QnV0dG9uID0gZmFsc2Vcblx0XHRcblx0XHRzaG91bGRTaG93TG9nbyA9IHRydWVcblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJsb2dvXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwib2ZmXCIgdGhlbiBzaG91bGRTaG93TG9nbyA9IGZhbHNlXG5cdFx0XG5cdFx0aWYgc2hvdWxkU2hvd0xvZ28gdGhlbiBAY3JlYXRlTG9nb0J1dHRvbihpbml0U3RhdGUpXG5cdFx0aWYgc2hvdWxkU2hvd0J1dHRvbiB0aGVuIEBjcmVhdGVTY2FsZUJ1dHRvbihpbml0U3RhdGUpXG5cdFx0QHN0YXRlU3dpdGNoKGluaXRTdGF0ZSlcblx0XG5cdFxuXHRcblx0Y3JlYXRlTG9nb0J1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgdGhlbiByZXR1cm5cblx0XHRcblx0XHRvcGVuSG9tZUhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCJodHRwczovL3RpbGxsdXIucnVcIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZVNjYWxlQnV0dG9uOiAoZm9yU3RhdGUpID0+XG5cdFx0aWYgVXRpbHMuaXNGcmFtZXJTdHVkaW8oKSB0aGVuIHJldHVyblxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlID0gbmV3IExheWVyXG5cdFx0XHRzaXplOiA0OCwgYm9yZGVyUmFkaXVzOiA0OFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogQWxpZ24uYm90dG9tKC0zMilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjEpXCJcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdHByZXZpZXc6IEBcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRidXR0b25TY2FsZS5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBidXR0b25TY2FsZVxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdHNpemU6IDI4LCBib3JkZXJSYWRpdXM6IDIyXG5cdFx0XHR4OiAxMCwgeTogMTBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUub25UYXAgLT5cblx0XHRcdGlmIEBzdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZmlsbFwiIHRoZW4gbmV4dFN0YXRlID0gXCJub3JtYWxcIiBlbHNlIG5leHRTdGF0ZSA9IFwiZmlsbFwiXG5cdFx0XHRAc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGNoaWxkcmVuWzBdLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjdXN0b20ucHJldmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplID0gKGJ1dHRvbkxheWVyKSA9PlxuXHRcdFx0bG9jYWxCdXR0b24gPSBidXR0b25MYXllclxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnggPSBBbGlnbi5yaWdodCgtMzIpXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci55ID0gQWxpZ24uYm90dG9tKC0zMilcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZShidXR0b25TY2FsZSlcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlXG5cdFx0XHRAc2V0RGVza3RvcFNjYWxlTW9kZSgpXG5cdFx0XHRAcHJldmlld0Rlc2t0b3AoKVxuXHRcdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cdFxuXHRcblx0c2NyZWVuU2l6ZTogKHcsIGgpID0+IHJldHVybiBTY3JlZW4ud2lkdGggPT0gdyBhbmQgU2NyZWVuLmhlaWdodCA9PSBoXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB3aWR0aCA9PSB3IGFuZCBAaGVpZ2h0ID09IGhcblx0dmlld1dpZHRoOiAodykgPT4gcmV0dXJuIEB3aWR0aCA9PSB3XG5cdFxuXHRcblxuXHRcblx0XG5cdHVwZGF0ZVByZXZpZXdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbFByZXZpZXcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy55ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFxuXHRcblx0XG5cdHByZXZpZXdEZXNrdG9wOiAoKSA9PlxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSB0aGVtZS5iZ19jb2xvclxuXHRcdEBjcmVhdGVCYXJzKClcblx0XHRAY2VudGVyKClcblx0XHRAY2xpcCA9IHRydWVcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdHByZXZpZXdDYW52YXMgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbnRlbnRfY29sb3IsIG5hbWU6IFwiLmhpZGRlblByZXZpZXdDYW52YXNcIlxuXHRcdFxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAY2VudGVyKClcblx0XHRAb3JpZ2luWSA9IDAuNVxuXHRcdEBvcmlnaW5YID0gMC41XG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KVxuXHRcdFx0XG5cdFx0XHRpZiBAc2NyZWVuU2l6ZSgzNzUsIDc2OCkgb3IgQHNjcmVlblNpemUoMzkwLCA3OTcpIG9yIEBzY3JlZW5TaXplKDQxNCwgODUyKSBvciBAc2NyZWVuU2l6ZSg0MjgsIDg3OSlcblx0XHRcdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0XHRlbHNlIEBzZXRDdXN0b21QcmV2aWV3KClcblx0XHRcbiMgXHRcdGVsc2UgaWYgQHZpZXcud2lkdGggPT0gMzYwXG5cdFx0XHRcblx0XHRlbHNlIEBzZXRDdXN0b21QcmV2aWV3KClcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wKC0yMClcblx0XHRAb3JpZ2luWSA9IDBcblx0XHRcblx0XHRzSCA9IChTY3JlZW4uaGVpZ2h0ICsgNDApIC8gQGhlaWdodFxuXHRcdEBzY2FsZSA9IE1hdGgubWluKFNjcmVlbi53aWR0aCAvIEB3aWR0aCwgc0gpXG5cdFxuXHRcblx0bG9nU2l6ZTogKCkgPT5cblx0XHRuZXcgVGV4dExheWVyIHsgdGV4dDogXCIje1NjcmVlbi53aWR0aH14I3tTY3JlZW4uaGVpZ2h0fVwiLCB5OiBBbGlnbi5jZW50ZXIgfVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQmFyczogKCkgPT5cblx0XHR0b3BCYXIgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFxuXHRcdGVsc2UgaWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcikgXG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpXG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAodGVtcCkgPT5cblx0XHR0ZW1wLmhlaWdodCA9IDMyXG5cdFx0XG5cdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyIG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB0ZW1wLCB3aWR0aDogdGVtcC53aWR0aCAtIDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLnRvcCg2KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLmNlbnRlcigxKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLmNlbnRlcigtMSlcblx0XHRcdGltYWdlOiBAYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY1N0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0xlZnRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5sZWZ0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJMZWZ0SW1hZ2VbQHRvcFRoZW1lXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAdG9wVGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRvcFRoZW1lXVxuXHRcdFxuXHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAdG9wVGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGxldHRlclNwYWNpbmc6IC0wLjE3XG5cdFx0XHRmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRub3RjaENlbnRlckNvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDM3NSwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aW1hZ2U6IEBhc3NldHMubm90Y2hcblx0XHRcblx0XHRub3RjaFJpZ2h0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLnN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRvcFRoZW1lXVxuXHRcblx0XG5cdFxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoYmFyTGF5ZXIpID0+XG5cdFx0aG9tZUluZGljYXRvciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQGFzc2V0cy5jb2xvcltAYm90dG9tVGhlbWVdLCBib3JkZXJSYWRpdXM6IDIwXG5cdFxuXHRcblxuIiwiXG5leHBvcnRzLmRhdGEgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkE2QkFBO0FEQ0EsT0FBTyxDQUFDLElBQVIsR0FDQztFQUFBLEtBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsS0FBQSxFQUFPLE1BRFA7R0FERDtFQUdBLG1CQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0seURBQU47SUFDQSxLQUFBLEVBQU8sMERBRFA7R0FKRDtFQU1BLHFCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sMkRBQU47SUFDQSxLQUFBLEVBQU8sNERBRFA7R0FQRDtFQVNBLHNCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sNERBQU47SUFDQSxLQUFBLEVBQU8sNkRBRFA7R0FWRDtFQVlBLDBCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sZ0VBQU47SUFDQSxLQUFBLEVBQU8saUVBRFA7R0FiRDtFQWdCQSxLQUFBLEVBQU8sb0RBaEJQOzs7OztBRERELElBQUEsOENBQUE7RUFBQTs7OztBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsd0JBQVI7O0FBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcEIsQ0FBQTs7QUFFQSxX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
