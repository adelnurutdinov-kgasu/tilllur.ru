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


},{"PreviewComponentAssets":"PreviewComponentAssets"}],"album":[function(require,module,exports){
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
var config, configAlbums, greys_base, greys_black, greys_darker, greys_darkest, greys_lighter, greys_lightest, greys_pre_white, greys_ultra_light, greys_white, newsModel0, newsModel1, newsModel10, newsModel2, newsModel3, newsModel4, newsModel5, newsModel6, newsModel7, newsModel8, newsModel9, playlist0, playlist1, randomSource, videoModel0, videoModel1, videoModel2;

config = "artists/im";

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
  navigation_header_background_color: "rgba(150,22,11,",
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
  video: config + "/video/movies/1.mp4"
};

videoModel2 = {
  image: config + "/video/previews/2.png",
  video: config + "/video/movies/1.mp4"
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
    title: "Classical Mushroom",
    year: 2000,
    tintColor: "#222",
    songs: ["Bust A Move", "None Of This Is Real", "Sailing In The Sea Of Mushroom", "The Shen", "Disco Mushroom", "Dracul", "Nothing Comes Easy", "Mush Mushi", "The Missed Symphony"],
    time: ["08:21", "06:22", "08:18", "08:33", "08:46", "08:00", "07:26", "07:36", "10:26"],
    image: configAlbums + "0.jpg",
    source: randomSource
  }, {
    title: "B.P.Empire",
    year: 2001,
    tintColor: "#222",
    songs: ["Never Ever Land", "Unbalanced", "Spaniard", "B.P.Empire", "Funchameleon", "Tasty Mushroom", "Noise Maker", "P.G.M.", "Dancing With Kadafi"],
    time: ["07:46", "07:15", "07:38", "07:26", "06:55", "06:56", "07:39", "07:21", "10:22"],
    image: configAlbums + "1.jpg",
    source: randomSource
  }, {
    title: "Converting Vegetarians",
    year: 2003,
    tintColor: "#222",
    songs: ["Albibeno", "Hush Mail", "Apogiffa Night", "Song Pong", "Chaplin", "Echonomix", "Scorpion Frog", "Deeply Disturbed", "Semi Nice", "Yanko Pitch", "Converting Vegetarians", "Elation Station", "Drop Out", "Avratz", "Blink", "Shakawkaw", "Pletzturra", "I Wish", "Ballerium", "Selecta", "Illuminaughty", "Jeenge", "Elevation"],
    time: ["07:03", "07:01", "08:08", "08:36", "06:54", "07:43", "08:00", "08:26", "06:09", "08:13", "05:39", "05:35", "05:14", "10:23", "05:32", "04:08", "06:44", "03:00", "07:17", "05:21", "04:50", "07:02", "05:15"],
    image: configAlbums + "2.jpg",
    source: randomSource
  }, {
    title: "I'm The Supervisor",
    year: 2004,
    tintColor: "#222",
    songs: ["I'm The Supervisor", "Ration Shmatio", "Muse Breaks RMX", "Meduzz", "Cities Of The Future", "Horus The Chorus", "Frog Machine", "Noon", "Bombat", "Stretched"],
    time: ["08:32", "06:29", "07:09", "06:42", "06:59", "07:39", "06:10", "06:07", "08:18", "07:22"],
    image: configAlbums + "3.jpg",
    source: randomSource
  }, {
    title: "Vicious Delicious",
    year: 2007,
    tintColor: "#222",
    songs: ["Becoming Insane", "Artillery", "Vicious Delicious", "Heavyweight", "Suliman", "Forgive Me", "Special Place", "In Front Of Me", "Eat It Raw", "Change The Formality", "Before"],
    time: ["07:20", "04:28", "07:24", "08:41", "06:10", "03:29", "06:53", "04:28", "06:30", "07:44", "06:57"],
    image: configAlbums + "4.jpg",
    source: randomSource
  }, {
    title: "Legend Of The Black Shawarma",
    year: 2009,
    tintColor: "#222",
    songs: ["Poquito Mas", "Saeed", "End Of The Road", "Smashing The Opponent", "Can't Stop", "Herbert The Pervert", "Killing Time", "Project 100", "Franks", "Slowly", "The Legend Of The Black Shawarma", "Riders On The Storm"],
    time: ["03:39", "07:03", "06:46", "04:09", "07:23", "07:17", "03:04", "09:37", "08:04", "08:59", "07:11", "04:29"],
    image: configAlbums + "5.jpg",
    source: randomSource
  }, {
    title: "Power Charge",
    year: 2011,
    tintColor: "#222",
    songs: ["Hellion Prime", "Energy Sequence", "Power Charge", "Cities of the Future", "Acid Proof", "Flying", "10.000 Fahrenheit", "Brain Spawn", "Unbalanced"],
    time: ["06:36", "06:31", "06:38", "07:25", "06:37", "06:34", "06:46", "06:45", "06:47"],
    image: configAlbums + "6.jpg",
    source: randomSource
  }, {
    title: "Army Of Mushrooms",
    year: 2012,
    tintColor: "#222",
    songs: ["Never Mind", "Nothing to Say", "Send Me an Angel", "U R So Fucked", "The Rat", "Nation of Wusses", "Wanted To", "Serve My Thirst", "I Shine", "Drum n Bassa", "The Pretender", "The Messenger 2012", "Swingish"],
    time: ["06:05", "06:28", "07:25", "04:41", "07:43", "07:02", "03:24", "06:46", "05:43", "07:12", "06:34", "10:38", "06:16"],
    image: configAlbums + "7.jpg",
    source: randomSource
  }, {
    title: "Friends On Mushrooms",
    year: 2014,
    tintColor: "#222",
    songs: ["Kafkaf", "Bass Nipple", "Savant On Mushrooms", "Kipod", "Kazabubu", "Now Is Gold", "Rise Up", "Nerds On Mushrooms", "Mambacore", "Where Do I Belong", "Astrix On Mushrooms", "Who Is There", "Bark", "Trance Party", "The French", "Kipod"],
    time: ["05:47", "04:54", "06:18", "07:00", "06:24", "05:53", "05:29", "05:33", "04:19", "03:26", "09:56", "04:04", "04:09", "07:41", "06:55", "05:47"],
    image: configAlbums + "8.jpg",
    source: randomSource
  }, {
    title: "Converting Vegetarians II",
    year: 2015,
    tintColor: "#222",
    songs: ["She Zoremet", "Yamakas in Space", "Sense of Direction", "Animatronica", "Feelings", "Pink Froid", "Demons of Pain", "Zoan Zound", "Blue Swan 5", "Fields of Grey", "Leopold", "On The Road Again", "Stuck in a Loop", "Mexicali", "The Surgeon"],
    time: ["05:14", "07:33", "03:25", "06:15", "04:10", "07:40", "02:58", "04:31", "08:58", "04:18", "04:14", "03:59", "04:23", "03:45", "06:21"],
    image: configAlbums + "9.jpg",
    source: randomSource
  }
];

exports.favList = {
  songs: ["Liquid Smoke", "She Zoremet", "Riders On The Storm", "Artillery", "Kazabubu", "Never Mind", "Zoan Zound", "Heavyweight", "Kafkaf", "Bass Nipple"],
  source: randomSource,
  time: ["6:39", "5:14", "4:29", "4:28", "6:24", "6:05", "4:31", "8:41", "5:47", "4:54"],
  albums: [2, 9, 5, 4, 8, 7, 9, 4, 8, 8]
};


},{}],"create_song":[function(require,module,exports){
var Artist, Song, TextLayer, config;

Song = require("song").Song;

TextLayer = require("text").TextLayer;

Artist = require("artist");

config = Artist.config;

exports.createSongsForAlbum = function(albumID) {
  var i, j, len, ref, song, songs;
  songs = [];
  ref = Artist.albumsData[albumID].songs;
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
    albumID: Artist.favList.albums[songNumber],
    songID: songNumber
  });
  songImage = new Layer({
    parent: songView,
    image: Artist.albumsData[Artist.favList.albums[songNumber]].image,
    width: 48 * 2,
    height: 48 * 2,
    x: 32,
    y: 16
  });
  songTitle = new TextLayer({
    parent: songView,
    text: "" + Artist.favList.songs[songNumber],
    width: 440,
    height: 44,
    x: 156,
    y: 22,
    fontSize: 36,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: Artist.colorTheme.detailed_album_song_title,
    letterSpacing: 0.2
  });
  albumTitle = new TextLayer({
    parent: songView,
    text: "" + Artist.albumsData[Artist.favList.albums[songNumber]].title,
    width: 440,
    height: 34,
    x: 156,
    y: 68,
    fontSize: 28,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "left",
    color: Artist.colorTheme.detailed_album_song_time,
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
    songTitle: Artist.albumsData[albumID].songs[songNumber]
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
    color: Artist.colorTheme.detailed_album_song_title,
    letterSpacing: 0.2
  });
  songDuration = new TextLayer({
    parent: songView,
    text: "" + Artist.albumsData[albumID].time[songNumber],
    width: 120,
    height: 34,
    x: 232 * 2 + 28,
    y: 26,
    fontSize: 28,
    fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif",
    textAlign: "right",
    color: Artist.colorTheme.detailed_album_song_time,
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
    color: Artist.colorTheme.detailed_album_song_number,
    letterSpacing: 0.5,
    opacity: 0.7
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


},{"text":"text"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL3llYXIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvdmlkZW8uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvdGltZWZyb21zZWMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvdGV4dC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMiBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9zb25nLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL3BsYXlsaXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL3BsYXlfc29uZy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMiBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9vbGQveW91dHViZSBiYWNrdXAveW91dHViZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMiBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9vbGQvZmVlZCBiYWNrdXAvdHJvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvb2xkL2RhdGEgYmFja3VwL3Ryb2xsLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL29sZC9jb2xvciBiYWNrdXAvdHJvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvb2xkL2NvbG9yIGJhY2t1cC9iYXNlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL25ld3MuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvbmF2LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2RldGFpbGVkX3BsYXlsaXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2RldGFpbGVkX25ld3MuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvZGV0YWlsZWRfYWxidW0uY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvY3JlYXRlX3NvbmcuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvYXJ0aXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2FydGlzdHMgYmFja3VwL3Ryb2xsLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2FydGlzdHMgYmFja3VwL3NwbGVhbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMiBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9hcnRpc3RzIGJhY2t1cC9zcGxlYW4gMi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMiBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9hbGJ1bS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMiBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ7VGV4dExheWVyfSA9IHJlcXVpcmUgXCJ0ZXh0XCJcblxuY2xhc3MgZXhwb3J0cy5ZZWFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMueWVhcklEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAneWVhcklEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy55ZWFySURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnllYXJJRCA9IHZhbHVlXG5cblxuXHRcdFx0IiwiY2xhc3MgZXhwb3J0cy5WaWRlbyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMudmlkZW9JRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ3ZpZGVvSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsImV4cG9ydHMudGltZUZyb21TZWNvbmRzID0gKHNlY29uZHMpIC0+XG5cdGlmIHNlY29uZHMgPiAwXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHNlY29uZHMgKiAxMDAwKS50b0lTT1N0cmluZygpLnN1YnN0cigxNSwgNClcblx0ZWxzZVxuXHRcdHJldHVybiBcIjA6MDBcIiIsImNsYXNzIFRleHRMYXllciBleHRlbmRzIExheWVyXG5cdFx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblx0XHRAZG9BdXRvU2l6ZSA9IGZhbHNlXG5cdFx0QGRvQXV0b1NpemVIZWlnaHQgPSBmYWxzZVxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcImhzbGEoNjAsIDkwJSwgNDclLCAuNClcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuY29sb3IgPz0gXCJyZWRcIlxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAxLjI1XG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiSGVsdmV0aWNhXCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDIwXG5cdFx0b3B0aW9ucy50ZXh0ID89IFwiVXNlIGxheWVyLnRleHQgdG8gYWRkIHRleHRcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLWxpbmVcIiAjIGFsbG93IFxcbiBpbiAudGV4dFxuXHRcdEBzdHlsZS5vdXRsaW5lID0gXCJub25lXCIgIyBubyBib3JkZXIgd2hlbiBzZWxlY3RlZFxuXHRcdFxuXHRzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSwgcHhTdWZmaXggPSBmYWxzZSkgLT5cblx0XHRAc3R5bGVbcHJvcGVydHldID0gaWYgcHhTdWZmaXggdGhlbiB2YWx1ZStcInB4XCIgZWxzZSB2YWx1ZVxuXHRcdEBlbWl0KFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsIHZhbHVlKVxuXHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0XHRcblx0Y2FsY1NpemU6IC0+XG5cdFx0c2l6ZUFmZmVjdGluZ1N0eWxlcyA9XG5cdFx0XHRsaW5lSGVpZ2h0OiBAc3R5bGVbXCJsaW5lLWhlaWdodFwiXVxuXHRcdFx0Zm9udFNpemU6IEBzdHlsZVtcImZvbnQtc2l6ZVwiXVxuXHRcdFx0Zm9udFdlaWdodDogQHN0eWxlW1wiZm9udC13ZWlnaHRcIl1cblx0XHRcdHBhZGRpbmdUb3A6IEBzdHlsZVtcInBhZGRpbmctdG9wXCJdXG5cdFx0XHRwYWRkaW5nUmlnaHQ6IEBzdHlsZVtcInBhZGRpbmctcmlnaHRcIl1cblx0XHRcdHBhZGRpbmdCb3R0b206IEBzdHlsZVtcInBhZGRpbmctYm90dG9tXCJdXG5cdFx0XHRwYWRkaW5nTGVmdDogQHN0eWxlW1wicGFkZGluZy1sZWZ0XCJdXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiBAc3R5bGVbXCJ0ZXh0LXRyYW5zZm9ybVwiXVxuXHRcdFx0Ym9yZGVyV2lkdGg6IEBzdHlsZVtcImJvcmRlci13aWR0aFwiXVxuXHRcdFx0bGV0dGVyU3BhY2luZzogQHN0eWxlW1wibGV0dGVyLXNwYWNpbmdcIl1cblx0XHRcdGZvbnRGYW1pbHk6IEBzdHlsZVtcImZvbnQtZmFtaWx5XCJdXG5cdFx0XHRmb250U3R5bGU6IEBzdHlsZVtcImZvbnQtc3R5bGVcIl1cblx0XHRcdGZvbnRWYXJpYW50OiBAc3R5bGVbXCJmb250LXZhcmlhbnRcIl1cblx0XHRjb25zdHJhaW50cyA9IHt9XG5cdFx0aWYgQGRvQXV0b1NpemVIZWlnaHQgdGhlbiBjb25zdHJhaW50cy53aWR0aCA9IEB3aWR0aFxuXHRcdHNpemUgPSBVdGlscy50ZXh0U2l6ZSBAdGV4dCwgc2l6ZUFmZmVjdGluZ1N0eWxlcywgY29uc3RyYWludHNcblx0XHRpZiBAc3R5bGUudGV4dEFsaWduIGlzIFwicmlnaHRcIlxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdFx0QHggPSBAeC1Ad2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0QGhlaWdodCA9IHNpemUuaGVpZ2h0XG5cblx0QGRlZmluZSBcImF1dG9TaXplXCIsXG5cdFx0Z2V0OiAtPiBAZG9BdXRvU2l6ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImF1dG9TaXplSGVpZ2h0XCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0QGRvQXV0b1NpemVIZWlnaHQgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiY29udGVudEVkaXRhYmxlXCIsXG5cdFx0c2V0OiAoYm9vbGVhbikgLT5cblx0XHRcdEBfZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSBib29sZWFuXG5cdFx0XHRAaWdub3JlRXZlbnRzID0gIWJvb2xlYW5cblx0XHRcdEBvbiBcImlucHV0XCIsIC0+IEBjYWxjU2l6ZSgpIGlmIEBkb0F1dG9TaXplXG5cdEBkZWZpbmUgXCJ0ZXh0XCIsXG5cdFx0Z2V0OiAtPiBAX2VsZW1lbnQudGV4dENvbnRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cdFx0XHRAZW1pdChcImNoYW5nZTp0ZXh0XCIsIHZhbHVlKVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiZm9udEZhbWlseVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250RmFtaWx5XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U2l6ZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U2l6ZS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U2l6ZVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxpbmVIZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGluZUhlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGluZUhlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRXZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFdlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFdlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTdHlsZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFN0eWxlXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFZhcmlhbnRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFZhcmlhbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFZhcmlhbnRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdUb3BcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1RvcC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1JpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdSaWdodC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nQm90dG9tXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdCb3R0b20ucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdMZWZ0XCIsXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJ0ZXh0QWxpZ25cIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dEFsaWduXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwidGV4dFRyYW5zZm9ybVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS50ZXh0VHJhbnNmb3JtIFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0VHJhbnNmb3JtXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwibGV0dGVyU3BhY2luZ1wiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5sZXR0ZXJTcGFjaW5nLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxldHRlclNwYWNpbmdcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsZW5ndGhcIiwgXG5cdFx0Z2V0OiAtPiBAdGV4dC5sZW5ndGhcblxuY29udmVydFRvVGV4dExheWVyID0gKGxheWVyKSAtPlxuXHR0ID0gbmV3IFRleHRMYXllclxuXHRcdG5hbWU6IGxheWVyLm5hbWVcblx0XHRmcmFtZTogbGF5ZXIuZnJhbWVcblx0XHRwYXJlbnQ6IGxheWVyLnBhcmVudFxuXHRcblx0Y3NzT2JqID0ge31cblx0Y3NzID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuY3NzXG5cdGNzcy5mb3JFYWNoIChydWxlKSAtPlxuXHRcdHJldHVybiBpZiBfLmluY2x1ZGVzIHJ1bGUsICcvKidcblx0XHRhcnIgPSBydWxlLnNwbGl0KCc6ICcpXG5cdFx0Y3NzT2JqW2FyclswXV0gPSBhcnJbMV0ucmVwbGFjZSgnOycsJycpXG5cdHQuc3R5bGUgPSBjc3NPYmpcblx0XG5cdGltcG9ydFBhdGggPSBsYXllci5fX2ZyYW1lckltcG9ydGVkRnJvbVBhdGhcblx0aWYgXy5pbmNsdWRlcyBpbXBvcnRQYXRoLCAnQDJ4J1xuXHRcdHQuZm9udFNpemUgKj0gMlxuXHRcdHQubGluZUhlaWdodCA9IChwYXJzZUludCh0LmxpbmVIZWlnaHQpKjIpKydweCdcblx0XHR0LmxldHRlclNwYWNpbmcgKj0gMlxuXHRcdFx0XHRcdFxuXHR0LnkgLT0gKHBhcnNlSW50KHQubGluZUhlaWdodCktdC5mb250U2l6ZSkvMiAjIGNvbXBlbnNhdGUgZm9yIGhvdyBDU1MgaGFuZGxlcyBsaW5lIGhlaWdodFxuXHR0LnkgLT0gdC5mb250U2l6ZSAqIDAuMSAjIHNrZXRjaCBwYWRkaW5nXG5cdHQueCAtPSB0LmZvbnRTaXplICogMC4wOCAjIHNrZXRjaCBwYWRkaW5nXG5cdHQud2lkdGggKz0gdC5mb250U2l6ZSAqIDAuNSAjIHNrZXRjaCBwYWRkaW5nXG5cblx0dC50ZXh0ID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuc3RyaW5nXG5cdGxheWVyLmRlc3Ryb3koKVxuXHRyZXR1cm4gdFxuXG5MYXllcjo6Y29udmVydFRvVGV4dExheWVyID0gLT4gY29udmVydFRvVGV4dExheWVyKEApXG5cbmNvbnZlcnRUZXh0TGF5ZXJzID0gKG9iaikgLT5cblx0Zm9yIHByb3AsbGF5ZXIgb2Ygb2JqXG5cdFx0aWYgbGF5ZXIuX2luZm8ua2luZCBpcyBcInRleHRcIlxuXHRcdFx0b2JqW3Byb3BdID0gY29udmVydFRvVGV4dExheWVyKGxheWVyKVxuXG4jIEJhY2t3YXJkcyBjb21wYWJpbGl0eS4gUmVwbGFjZWQgYnkgY29udmVydFRvVGV4dExheWVyKClcbkxheWVyOjpmcmFtZUFzVGV4dExheWVyID0gKHByb3BlcnRpZXMpIC0+XG4gICAgdCA9IG5ldyBUZXh0TGF5ZXJcbiAgICB0LmZyYW1lID0gQGZyYW1lXG4gICAgdC5zdXBlckxheWVyID0gQHN1cGVyTGF5ZXJcbiAgICBfLmV4dGVuZCB0LHByb3BlcnRpZXNcbiAgICBAZGVzdHJveSgpXG4gICAgdFxuXG5leHBvcnRzLlRleHRMYXllciA9IFRleHRMYXllclxuZXhwb3J0cy5jb252ZXJ0VGV4dExheWVycyA9IGNvbnZlcnRUZXh0TGF5ZXJzXG4iLCJjbGFzcyBleHBvcnRzLlNvbmcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLmFsYnVtSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5zb25nSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5hbGJ1bVRpdGxlID89IFwiTWF5IDE0XCJcblx0XHRAb3B0aW9ucy5zb25nVGl0bGUgPz0gXCLQodC+0LXQstGL0LUg0LPRg9Cx0YtcIlxuXHRcdFxuXHRcdCBcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEAud2lkdGggPSAzMjAqMlxuXHRcdEAuaGVpZ2h0ID0gNjYqMlxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJudWxsXCJcblx0XHRcblx0QGRlZmluZSAnYWxidW1JRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRCA9IHZhbHVlXG5cdFx0XHRcblx0QGRlZmluZSAnc29uZ0lEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5zb25nSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNvbmdJRCA9IHZhbHVlXG5cdFx0XHRcblx0QGRlZmluZSAnYWxidW1UaXRsZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1UaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1UaXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzb25nVGl0bGUnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnNvbmdUaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ1RpdGxlID0gdmFsdWVcblx0XHRcdCIsImNsYXNzIGV4cG9ydHMuUGxheWxpc3QgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLnBsYXlsaXN0SUQgPz0gLTFcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdFxuXHRAZGVmaW5lICdwbGF5bGlzdElEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5wbGF5bGlzdElEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5wbGF5bGlzdElEID0gdmFsdWVcblxuXG5cdFx0XHQiLCJUaW1lID0gcmVxdWlyZSAndGltZWZyb21zZWMnXG5cbkFydGlzdCA9IHJlcXVpcmUgXCJhcnRpc3RcIlxuY29uZmlnID0gQXJ0aXN0LmNvbmZpZ1xuXG5zb25nUGF0aCA9IGNvbmZpZyArIFwiL3NvbmdzL1wiXG5cblxuXG5leHBvcnRzLnBsYXlQbGF5bGlzdCA9IChzb25nSUQsIGFsYnVtTW9kZWwpIC0+XG5cdHNvbmdzTmFtZXMgPSBhbGJ1bU1vZGVsLnNvbmdzXG5cdHNvbmdzU291cmNlID0gYWxidW1Nb2RlbC5zb3VyY2Vcblx0IyBzb25nc0FsYnVtcyA9IGFsYnVtTW9kZWwuYWxidW1zXG5cdFxuXHRzb25nc05hbWVDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc05hbWVzKVxuXHRzb25nc1NvdXJjZUN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzU291cmNlKVxuXHQjIHNvbmdBbGJ1bUlEQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NBbGJ1bXMpXG5cdFxuXHRwbGF5aW5nU29uZ05hbWUgPSBcIlwiXG5cdHBsYXlpbmdTb25nU291cmNlID0gXCJcIlxuXHRwbGF5aW5nU29uZ0FsYnVtSUQgPSAwXG5cdGZvciBpIGluIFswLi5zb25nSURdXG5cdFx0cGxheWluZ1NvbmdOYW1lID0gc29uZ3NOYW1lQ3ljbGVyKClcblx0XHRwbGF5aW5nU29uZ1NvdXJjZVx0PSBzb25nUGF0aCtzb25nc1NvdXJjZUN5Y2xlcigpXG5cdFx0IyBwbGF5aW5nU29uZ0FsYnVtSUQgPSBVdGlscy5jeWNsZShzb25nc0FsYnVtcylcblx0XHQjIHByaW50IHBsYXlpbmdTb25nQWxidW1JRFxuXHRcblx0aWYgcGF1c2Uuc3RhdGVzLmN1cnJlbnQgaXMgXCJoaWRkZW5cIlxuXHRcdHBsYXkuc3RhdGVzLm5leHQoKVxuXHRcdHBhdXNlLnN0YXRlcy5uZXh0KClcblx0XG5cdG11c2ljLnZpZGVvID0gcGxheWluZ1NvbmdTb3VyY2Vcblx0XG5cdHBsYXllclNvbmdUaXRsZS50ZXh0ID0gcGxheWluZ1NvbmdOYW1lXG5cdCMgcHJpbnQgcGxheWluZ1NvbmdBbGJ1bUlEXG5cdCMgcHJpbnQgQXJ0aXN0LmFsYnVtc0FydGlzdFtwbGF5aW5nU29uZ0FsYnVtSURdXG5cdHBsYXllclNvbmdBbGJ1bS50ZXh0ID0gYWxidW1Nb2RlbC50aXRsZSArIFwiIOKAkyBcIiArIGFsYnVtTW9kZWwueWVhclxuXHRcblx0VXRpbHMuZGVsYXkgLjMsIC0+IFxuXHRcdGR1cmF0aW9uUmlnaHQuaHRtbCA9IFwiLVwiICsgVGltZS50aW1lRnJvbVNlY29uZHMgbXVzaWMucGxheWVyLmR1cmF0aW9uXG5cdFx0c2NydWJiZXIubWF4ID0gfn5tdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XG5cdG11c2ljLnBsYXllci5wbGF5KClcblxuXG5leHBvcnRzLnBsYXlGYXZQbGF5bGlzdCA9IChzb25nSUQsIGFsYnVtTW9kZWwsIG11c2ljLCBwbGF5LCBwYXVzZSwgcGxheWVyU29uZ1RpdGxlLCBwbGF5ZXJTb25nQWxidW0sIGR1cmF0aW9uUmlnaHQsIHNjcnViYmVyKSAtPlxuXHRzb25nc05hbWVzID0gYWxidW1Nb2RlbC5zb25nc1xuXHRzb25nc1NvdXJjZSA9IGFsYnVtTW9kZWwuc291cmNlXG5cdHNvbmdzQWxidW1zID0gYWxidW1Nb2RlbC5hbGJ1bXNcblx0XG5cdHNvbmdzTmFtZUN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzTmFtZXMpXG5cdHNvbmdzU291cmNlQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NTb3VyY2UpXG5cdHNvbmdBbGJ1bUlEQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NBbGJ1bXMpXG5cdFxuXHRwbGF5aW5nU29uZ05hbWUgPSBcIlwiXG5cdHBsYXlpbmdTb25nU291cmNlID0gXCJcIlxuXHRwbGF5aW5nU29uZ0FsYnVtSUQgPSAwXG5cdGZvciBpIGluIFswLi5zb25nSURdXG5cdFx0cGxheWluZ1NvbmdOYW1lID0gc29uZ3NOYW1lQ3ljbGVyKClcblx0XHRwbGF5aW5nU29uZ1NvdXJjZSA9IHNvbmdQYXRoK3NvbmdzU291cmNlQ3ljbGVyKClcblx0XHRwbGF5aW5nU29uZ0FsYnVtSUQgPSBzb25nQWxidW1JREN5Y2xlcigpXG5cdFxuXHRpZiBwYXVzZS5zdGF0ZXMuY3VycmVudCBpcyBcImhpZGRlblwiXG5cdFx0cGxheS5zdGF0ZXMubmV4dCgpXG5cdFx0cGF1c2Uuc3RhdGVzLm5leHQoKVxuXHRcblx0bXVzaWMudmlkZW8gPSBwbGF5aW5nU29uZ1NvdXJjZVxuXHRcblx0cGxheWVyU29uZ1RpdGxlLnRleHQgPSBwbGF5aW5nU29uZ05hbWVcblx0cGxheWVyU29uZ0FsYnVtLnRleHQgPSBBcnRpc3QuYWxidW1zQXJ0aXN0W3BsYXlpbmdTb25nQWxidW1JRF0udGl0bGUgKyBcIiDigJMgXCIgKyBBcnRpc3QuYWxidW1zQXJ0aXN0W3BsYXlpbmdTb25nQWxidW1JRF0ueWVhclxuXHRcblx0VXRpbHMuZGVsYXkgLjMsIC0+IFxuXHRcdGR1cmF0aW9uUmlnaHQuaHRtbCA9IFwiLVwiICsgVGltZS50aW1lRnJvbVNlY29uZHMgbXVzaWMucGxheWVyLmR1cmF0aW9uXG5cdFx0c2NydWJiZXIubWF4ID0gfn5tdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XG5cdG11c2ljLnBsYXllci5wbGF5KClcblxuXG4iLCIjIEdldHRpbmcgRGF0YVxuXG5jb25maWcgPSBcImFydGlzdHMvdHJvbGxcIlxuXG52aWRlb01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8wLmpwZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8xLmpwZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMS5tcDRcIlxufVxuXG52aWRlb01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8yLmpwZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMi5tcDRcIlxufVxuXG52aWRlb01vZGVsMyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8zLmpwZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMy5tcDRcIlxufVxuXG52aWRlb01vZGVsNCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy80LmpwZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvNC5tcDRcIlxufVxuXG52aWRlb01vZGVsNSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy81LmpwZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvNS5tcDRcIlxufVxuXG5cbmV4cG9ydHMubW92aWVzRGF0YSA9IFt2aWRlb01vZGVsMCwgdmlkZW9Nb2RlbDEsIHZpZGVvTW9kZWwyLCB2aWRlb01vZGVsMywgdmlkZW9Nb2RlbDQsIHZpZGVvTW9kZWw1XSIsIiMgR2V0dGluZyBEYXRhXG5cbmNvbmZpZyA9IFwiYXJ0aXN0cy90cm9sbFwiXG5cbnNvbmdNb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8wLmpwZ1wiXG59XG5cbnNvbmdNb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xLmpwZ1wiXG59XG5cbnNvbmdNb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzIuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8yLmpwZ1wiXG59XG5cbnNvbmdNb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzMuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8zLmpwZ1wiXG59XG5cbnNvbmdNb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzQuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC80LmpwZ1wiXG59XG5cbnNvbmdNb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzUuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC81LmpwZ1wiXG59XG5cbnNvbmdNb2RlbDYgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzYuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC82LmpwZ1wiXG59XG5cbnNvbmdNb2RlbDcgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzcuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC83LmpwZ1wiXG59XG5cbnNvbmdNb2RlbDggPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzguanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC84LmpwZ1wiXG59XG5cbnNvbmdNb2RlbDkgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzkuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC85LmpwZ1wiXG59XG5cbnNvbmdNb2RlbDEwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xMC5qcGdcIlxufVxuXG5leHBvcnRzLmZlZWREYXRhID0gW3NvbmdNb2RlbDAsIHNvbmdNb2RlbDEsIHNvbmdNb2RlbDIsIHNvbmdNb2RlbDMsIHNvbmdNb2RlbDQsIHNvbmdNb2RlbDUsIHNvbmdNb2RlbDYsIHNvbmdNb2RlbDcsIHNvbmdNb2RlbDgsIHNvbmdNb2RlbDksIHNvbmdNb2RlbDEwXSIsIiMgR2V0dGluZyBEYXRhXG5cbmNvbmZpZyA9IFwiYXJ0aXN0cy90cm9sbFwiXG5cbmFsYnVtTW9kZWwxID0geyBcblx0dGl0bGU6IFwiRW1vdGlvbmFsIDhcIlxuXHR5ZWFyOiBcIjIwMTRcIlxuXHRcblx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cblx0XG5cdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuXHR0aW50Q29sb3I6IFwiZ3JleVwiXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCJdXG59XG5cbmFsYnVtTW9kZWwyID0geyBcblx0dGl0bGU6IFwiTWF5IDEzXCJcblx0eWVhcjogXCIyMDE0XCJcblx0XG5cdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG5cdFxuXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcblx0dGludENvbG9yOiBcIndoaXRlXCJcblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxufVxuXG5hbGJ1bU1vZGVsMyA9IHsgXG5cdHRpdGxlOiBcIkVtb3Rpb25hbCA4XCJcblx0eWVhcjogXCIyMDE0XCJcblx0XG5cdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG5cdFxuXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcblx0dGludENvbG9yOiBcImdyZXlcIlxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxufVxuXG5cblxuXG5cbmV4cG9ydHMuYWxidW1zRGF0YSA9IFthbGJ1bU1vZGVsMSwgYWxidW1Nb2RlbDIsIGFsYnVtTW9kZWwzXVxuZXhwb3J0cy5mYXZMaXN0ID0geyBcdFxuXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiXVxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCJdXG5cdFxuXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCJdXG5cdGFsYnVtczogWzAsIDEsIDIsIDAsIDAsIDEsIDIsIDIsIDEsIDBdXG59XG5cblxuIiwiY29uZmlnID0gXCJhcnRpc3RzL3Ryb2xsXCJcblxuZ3JleXNfd2hpdGUgPSBcIiNGRkZGRkZcIlxuZ3JleXNfcHJlX3doaXRlID0gXCIjRjdGN0Y3XCJcbmdyZXlzX3VsdHJhX2xpZ2h0ID0gXCIjRUVFRUVFXCJcbmdyZXlzX2xpZ2h0ZXN0ID0gXCIjREREREREXCJcbmdyZXlzX2xpZ2h0ZXIgPSBcIiNDQ0NDQ0NcIlxuZ3JleXNfYmFzZSA9IFwiIzk5OTk5OVwiXG5ncmV5c19kYXJrZXIgPSBcIiM2NjY2NjZcIlxuZ3JleXNfZGFya2VzdCA9IFwiIzIyMjIyMlwiXG5ncmV5c19ibGFjayA9IFwiIzAwMDAwMFwiXG5cblxuZXhwb3J0cy5jb2xvclRoZW1lID0ge1xuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kOiBcImJsYWNrXCJcblx0bmF2aWdhdGlvbl9vdmVybGF5X2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gZGFya2VyLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9oZWFkZXJfdGV4dDogXCIjRkZGRkZGXCJcblx0XG5cdG5hdmlnYXRpb25fYmFja2dyb3VuZDogY29uZmlnICsgXCIvYmcucG5nXCJcblx0bmF2aWdhdGlvbl9zaGFkb3c6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuMSlcIlxuXHQjIG5hdmlnYXRpb25fYmx1cjogXCIjRkZGRkZGXCJcblx0IyBuYXZpZ2F0aW9uX2NhcmRfb3ZlcmxheV9iYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIlxuXG5cdHBsYXllcl9iYWNrZ3JvdW5kOiBcInJnYmEoMjksMjksMjksMSlcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfYmFzZTogXCIjNjY2NjY2XCJcblx0cGxheWVyX3Byb2dyZXNzX2ZpbGxlZDogXCIjQUYxNDE3XCJcblx0cGxheWVyX3NvbmdfdGl0bGU6IFwiI0ZGRkZGRlwiXG5cdHBsYXllcl9hbGJ1bV90aXRsZTogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNSlcIlxuXHRwbGF5ZXJfc2hhZG93czogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXG5cdGFsYnVtX3NoYWRvdzogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRkZXRhaWxlZF9hbGJ1bV9iYWNrZ3JvdW5kOiBcIiMyMjJcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpdGxlOiBcIiNGRkZGRkZcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX251bWJlcjogXCIjOTk5XCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aW1lOiBcIiM5OTlcIlxuXHRmYXZfc29uZ3NfdGl0bGU6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjUpXCJcbn0iLCJjb25maWcgPSBcImFydGlzdHMvdHJvbGxcIlxuXG5ncmV5c193aGl0ZSA9IFwiI0ZGRkZGRlwiXG5ncmV5c19wcmVfd2hpdGUgPSBcIiNGN0Y3RjdcIlxuZ3JleXNfdWx0cmFfbGlnaHQgPSBcIiNFRUVFRUVcIlxuZ3JleXNfbGlnaHRlc3QgPSBcIiNERERERERcIlxuZ3JleXNfbGlnaHRlciA9IFwiI0NDQ0NDQ1wiXG5ncmV5c19iYXNlID0gXCIjOTk5OTk5XCJcbmdyZXlzX2RhcmtlciA9IFwiIzY2NjY2NlwiXG5ncmV5c19kYXJrZXN0ID0gXCIjMjIyMjIyXCJcbmdyZXlzX2JsYWNrID0gXCIjMDAwMDAwXCJcblxuXG5leHBvcnRzLmNvbG9yVGhlbWUgPSB7XG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmQ6IFwid2hpdGVcIlxuXHRuYXZpZ2F0aW9uX292ZXJsYXlfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBkYXJrZXIucG5nXCJcblx0IyBuYXZpZ2F0aW9uX2hlYWRlcl90ZXh0OiBcIiNGRkZGRkZcIlxuXHRcblx0bmF2aWdhdGlvbl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9iZy5wbmdcIlxuXHRuYXZpZ2F0aW9uX3NoYWRvdzogXCJyZWRcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF9iYWNrZ3JvdW5kOiBcInJlZFwiXG5cdCMgbmF2aWdhdGlvbl9ibHVyOiBcIiNGRkZGRkZcIlxuXHQjIG5hdmlnYXRpb25fY2FyZF9vdmVybGF5X2JhY2tncm91bmQ6IFwiI0ZGRkZGRlwiXG5cblx0cGxheWVyX2JhY2tncm91bmQ6IFwicmVkXCJcblx0cGxheWVyX3Byb2dyZXNzX2Jhc2U6IFwiYmx1ZVwiXG5cdHBsYXllcl9wcm9ncmVzc19maWxsZWQ6IFwiZ3JlZW5cIlxuXHRwbGF5ZXJfc29uZ190aXRsZTogXCJ5ZWxsb3dcIlxuXHRwbGF5ZXJfYWxidW1fdGl0bGU6IFwiYmx1ZVwiXG5cdHBsYXllcl9zaGFkb3dzOiBcImdyZWVuXCJcblxuXHRhbGJ1bV9zaGFkb3c6IFwieWVsbG93XCJcblx0ZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZDogXCJncmV5XCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aXRsZTogXCJyZWRcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX251bWJlcjogXCJibHVlXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aW1lOiBcInJlZFwiXG5cdGZhdl9zb25nc190aXRsZTogXCJ3aGl0ZVwiXG59IiwiY2xhc3MgZXhwb3J0cy5OZXdzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5uZXdzSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5uZXdzSW1hZ2UgPz0gLTFcblx0XHRAb3B0aW9ucy5uZXdzVGV4dEltYWdlID89IC0xXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEAuYm9yZGVyUmFkaXVzID0gOFxuXHRcdFxuXHRAZGVmaW5lICduZXdzSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLm5ld3NJRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0lEID0gdmFsdWVcblx0XHRcdFxuXHRAZGVmaW5lICduZXdzSW1hZ2UnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLm5ld3NJbWFnZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0ltYWdlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ25ld3NUZXh0SW1hZ2UnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLm5ld3NUZXh0SW1hZ2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLm5ld3NUZXh0SW1hZ2UgPSB2YWx1ZVxuXHQiLCJjbGFzcyBleHBvcnRzLk5hdiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMubmF2SUQgPz0gLTFcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdFxuXHRAZGVmaW5lICduYXZJRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmF2SURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLm5hdklEID0gdmFsdWVcblxuXG5cdFx0XHQiLCJcbmxvY2FsRGlzYXBwZWFyVGltZSA9IDAuMzRcbmxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmUgPSBcImN1YmljLWJlemllciguMzIsLjkyLC45MiwuOTkpXCJcbmxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxuXG5BcnRpc3QgPSByZXF1aXJlIFwiYXJ0aXN0XCJcbmNvbmZpZyA9IEFydGlzdC5jb25maWdcblxue1BsYXlsaXN0fSA9IHJlcXVpcmUgXCJwbGF5bGlzdFwiXG5cblxuY2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRjbG9zZURldGFpbGVkVmlldyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvciwgMTEzNilcblxuY2xvc2VEZXRhaWxlZFZpZXdPbmVXYXkgPSAobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdGNsb3NlRGV0YWlsZWRWaWV3KG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yLCAtMTEzNilcblxuXG5cbmNsb3NlRGV0YWlsZWRWaWV3ID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yLCB2YWx1ZVkpIC0+XG5cdFxuXHRuZXdzRGV0YWlsZWRUb3BWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogLTg4KjNcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFx0XG5cdG5ld3NEZXRhaWxlZENvbnRlbnQuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiB2YWx1ZVlcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRwbGF5bGlzdERldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XG5cdHN0YXR1c19iYXJfY29sb3IuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgXCIxKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFxuXHRVdGlscy5kZWxheSBsb2NhbERpc2FwcGVhclRpbWUgKyAwLjAyLCAtPlxuXHRcdHBsYXlsaXN0RGV0YWlsZWRWaWV3LmRlc3Ryb3koKVxuXG5cblxuXG5cblxuXG5leHBvcnRzLmNyZWF0ZVBsYXlsaXN0RGV0YWlsZWRQYWdlID0gKHBsYXlsaXN0SUQsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdHBsYXlsaXN0TW9kZWwgPSBBcnRpc3QucGxheWxpc3RzRGF0YVtwbGF5bGlzdElEXVxuXHQjIHByaW50IHBsYXlsaXN0TW9kZWwuaW1hZ2Vcblx0XG5cdHBsYXlsaXN0RGV0YWlsZWRWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0XG5cdFxuXHQjIHBsYXlsaXN0RGV0YWlsZWRWaWV3Lm9uIEV2ZW50cy5UYXAsIChldmVudCwgbGF5ZXIpIC0+XG4jIFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuIyBcdFx0cHJpbnQgXCJpbnNpZGUgI3t0YXB9XCJcblxuXHRuZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBwbGF5bGlzdERldGFpbGVkVmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDg4KjJcblx0XHR5OiAtODgqMlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0aW1hZ2U6IHBsYXlsaXN0TW9kZWwuaW1hZ2VcblxuXHRibHVyRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cdFx0d2lkdGg6IG5ld3NEZXRhaWxlZFRvcFZpZXcud2lkdGhcblx0XHRoZWlnaHQ6IG5ld3NEZXRhaWxlZFRvcFZpZXcuaGVpZ2h0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2JsdXJfY29sb3JcblxuXHRibHVyRGV0YWlsZWRUb3BWaWV3LnN0eWxlID1cblx0XHRcdCctd2Via2l0LWJhY2tkcm9wLWZpbHRlcic6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25fYmx1cl9yYWRpdXNcblxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQqMlxuXHRcdGhlaWdodDogNjQqMlxuXHRcdHg6IDBcblx0XHR5OiAyMCoyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdGltYWdlOiBjb25maWcgKyBcIi9jbG9zZU5ld3NQYWdlLnBuZ1wiXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cblx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDI0NFxuXHRcdGhlaWdodDogNzJcblx0XHR4OiAzNzZcblx0XHR5OiA3MlxuXHRcdGltYWdlOiBjb25maWcgKyBcIi9zaGFyZU5ld3NEZXRhaWxlZFZpZXcucG5nXCJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFRvcFZpZXdcblx0XG5cdFxuXG5cblx0bmV3c0RldGFpbGVkQ29udGVudCA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzYtODgqMi02MCoyXG5cdFx0eTogMTEzNlxuXHRcdHBhcmVudDogcGxheWxpc3REZXRhaWxlZFZpZXdcblx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmJnYSgwLDAsMCwwKVwiXG5cblx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2LTg4KjItNjAqMlxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkQ29udGVudFxuXHRcdHNwZWVkWTogMC44XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXG5cblx0bmV3c0RldGFpbGVkQ29udGVudFRleHRWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTY4MFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0IyB5OiBuZXdzRGV0YWlsZWRDb250ZW50SW1hZ2UuaGVpZ2h0XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnRcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dEltYWdlID0gbmV3IFBsYXlsaXN0XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXdcblx0XHRwbGF5bGlzdElEOiBwbGF5bGlzdElEXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTY4MFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0aW1hZ2U6IHBsYXlsaXN0TW9kZWwudGV4dEltYWdlXG5cblx0XG5cdFxuXHRcblx0IyBvcGVuaW5nIGFuaW1hdGlvbnNcblx0XG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAwXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XG5cdG5ld3NEZXRhaWxlZENvbnRlbnQuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiA4OCoyXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XHQjIGN1cnZlOiBcImN1YmljLWJlemllciguMDEsMSwuNzgsLjg5KVwiXG5cdFx0XG5cdHBsYXlsaXN0RGV0YWlsZWRWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC45KVwiXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0XG5cdFxuXHRzdGF0dXNfYmFyX2NvbG9yLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIFwiMClcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cblxuXG5cdGdhcEJvdHRvbSA9IC04NjBcblx0Z2FwVG9wID0gMFxuXHRnYXBEZWx0YSA9IDIwMFxuXHRcblx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRVdGlscy5kZWxheSBsb2NhbERpc2FwcGVhclRpbWUsIC0+XG5cdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSB0cnVlXG5cdFxuXHRcblx0XG5cdCMgY2xvc2Ugdmlld1xuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLm9uIEV2ZW50cy5Nb3ZlLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55ID4gZ2FwVG9wICYmIGlzTmV3c1ZpZXdNb2R1bGF0aW5nXG5cdFx0XHRib3VuZHMgPSBbZ2FwVG9wLCBnYXBUb3ArZ2FwRGVsdGFdXG5cdFx0XHRuZXdzRGV0YWlsZWRUb3BWaWV3LnkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMCwgLTg4XSwgdHJ1ZSkgXG5cdFx0XHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLjksIDBdLCB0cnVlKVxuXHRcdFx0cGxheWxpc3REZXRhaWxlZFZpZXcuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLFwiICsgbG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlICsgXCIpXCJcblx0XHRcdGxvY2FsU3RhdHVzQmFyQXJ0aXN0ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAsIDFdLCB0cnVlKVxuXHRcdFx0c3RhdHVzX2Jhcl9jb2xvci5iYWNrZ3JvdW5kQ29sb3IgPSBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgbG9jYWxTdGF0dXNCYXJBcnRpc3QgKyBcIilcIlxuXHRcdFx0XHRcblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA8IGdhcEJvdHRvbSAmJiBpc05ld3NWaWV3TW9kdWxhdGluZ1xuXHRcdFx0Ym91bmRzID0gW2dhcEJvdHRvbSwgZ2FwQm90dG9tLWdhcERlbHRhXVxuXHRcdFx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdHNoYXJlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMC45LCAwXSwgdHJ1ZSlcblx0XHRcdHBsYXlsaXN0RGV0YWlsZWRWaWV3LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCxcIiArIGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSArIFwiKVwiXG5cdFx0XHRsb2NhbFN0YXR1c0JhckFydGlzdCA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAxXSwgdHJ1ZSlcblx0XHRcdHN0YXR1c19iYXJfY29sb3IuYmFja2dyb3VuZENvbG9yID0gQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIGxvY2FsU3RhdHVzQmFyQXJ0aXN0ICsgXCIpXCJcblx0XG5cdFxuXHRcblx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5vbiBFdmVudHMuU2Nyb2xsRW5kLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdCMgcHJpbnQgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50Lnlcblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA8IGdhcEJvdHRvbSAtIGdhcERlbHRhIC8gNSAqIDJcblx0XHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdFx0IyBjbG9zZURldGFpbGVkVmlldyhwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcdGNsb3NlRGV0YWlsZWRWaWV3T25lV2F5KG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55ID4gZ2FwVG9wICsgZ2FwRGVsdGEgLyA1ICogMlxuXHRcdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0XHRjbG9zZURldGFpbGVkVmlld1R3b1dheXMobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpXG5cdFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdGNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcblx0XHRwbGF5bGlzdERldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0XHRcdFxuXHRcdFxuXHRcblx0XG5cdHJldHVybiBbcGxheWxpc3REZXRhaWxlZFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnRUZXh0SW1hZ2VdIiwiIyBsb2NhbERpc2FwcGVhclRpbWUgPSAwLjVcbiMgbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4wNiwuODEsMCwuOTMpXCJcbiMgbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjA2LC44MSwuNzksLjk5KVwiXG5sb2NhbERpc2FwcGVhclRpbWUgPSAwLjM0XG5sb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5sb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmUgPSBcImN1YmljLWJlemllciguMzIsLjkyLC45MiwuOTkpXCJcblxuQXJ0aXN0ID0gcmVxdWlyZSBcImFydGlzdFwiXG5jb25maWcgPSBBcnRpc3QuY29uZmlnXG5cblxuY2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdGNsb3NlRGV0YWlsZWRWaWV3KG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IsIDExMzYpXG5cblxuY2xvc2VEZXRhaWxlZFZpZXdPbmVXYXkgPSAobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0Y2xvc2VEZXRhaWxlZFZpZXcobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvciwgLTExMzYpXG5cblxuY2xvc2VEZXRhaWxlZFZpZXcgPSAobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvciwgdmFsdWVZKSAtPlxuXHRcblx0bmV3c0RldGFpbGVkVG9wVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IC04OCozXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogdmFsdWVZXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0bmV3c0RldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XG5cdHN0YXR1c19iYXJfY29sb3IuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgXCIxKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFxuXHRVdGlscy5kZWxheSBsb2NhbERpc2FwcGVhclRpbWUrMC4wMiwgLT5cblx0XHRuZXdzRGV0YWlsZWRWaWV3LmRlc3Ryb3koKVxuXG5cblxuXG5cblxuXG5leHBvcnRzLmNyZWF0ZU5ld3NEZXRhaWxlZFBhZ2UgPSAobmV3c0FydGlzdE1vZGVsLCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHQjIHByaW50IG5ld3NBcnRpc3RNb2RlbC5pbWFnZVxuXHRcblx0bmV3c0RldGFpbGVkVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzZcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFxuXHRuZXdzRGV0YWlsZWRWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0IyBza2lwIHRhcHNcblxuXHRuZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRWaWV3XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogODgqMlxuXHRcdHk6IC04OCoyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRpbWFnZTogbmV3c0FydGlzdE1vZGVsLmltYWdlXG5cblx0Ymx1ckRldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXHRcdHdpZHRoOiBuZXdzRGV0YWlsZWRUb3BWaWV3LndpZHRoXG5cdFx0aGVpZ2h0OiBuZXdzRGV0YWlsZWRUb3BWaWV3LmhlaWdodFxuXHRcdGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9ibHVyX2NvbG9yXG5cblx0Ymx1ckRldGFpbGVkVG9wVmlldy5zdHlsZSA9XG5cdFx0XHQnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2JsdXJfcmFkaXVzXG5cblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0KjJcblx0XHRoZWlnaHQ6IDY0KjJcblx0XHR4OiAwXG5cdFx0eTogMjAqMlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0XHRpbWFnZTogY29uZmlnICsgXCIvY2xvc2VOZXdzUGFnZS5wbmdcIlxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXG5cdHNoYXJlTmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiAyNDRcblx0XHRoZWlnaHQ6IDcyXG5cdFx0eDogMzc2XG5cdFx0eTogNzJcblx0XHRpbWFnZTogY29uZmlnICsgXCIvc2hhcmVOZXdzRGV0YWlsZWRWaWV3LnBuZ1wiXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cdFxuXHRcblxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnQgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2LTg4KjItNjAqMlxuXHRcdHk6IDExMzZcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFZpZXdcblx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmJnYSgwLDAsMCwwKVwiXG5cblx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2LTg4KjItNjAqMlxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkQ29udGVudFxuXHRcdHNwZWVkWTogMC44XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcblx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXG5cdCMgbmV3c0RldGFpbGVkQ29udGVudEltYWdlID0gbmV3IExheWVyXG4jIFx0XHR3aWR0aDogNjQwXG4jIFx0XHRoZWlnaHQ6IDQ4MFxuIyBcdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnRcbiMgXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4jIFx0XHRpbWFnZTogbmV3c0FydGlzdE1vZGVsLmltYWdlXG5cblx0bmV3c0RldGFpbGVkQ29udGVudFRleHRWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTY4MFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0IyB5OiBuZXdzRGV0YWlsZWRDb250ZW50SW1hZ2UuaGVpZ2h0XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnRcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dEltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXdcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNjgwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRpbWFnZTogbmV3c0FydGlzdE1vZGVsLnRleHRJbWFnZVxuXG5cdFxuXHRcblx0XG5cdCMgb3BlbmluZyBhbmltYXRpb25zXG5cdFxuXHRuZXdzRGV0YWlsZWRUb3BWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogMFxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogODgqMlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFx0IyBjdXJ2ZTogXCJjdWJpYy1iZXppZXIoLjAxLDEsLjc4LC44OSlcIlxuXHRcdFxuXHRuZXdzRGV0YWlsZWRWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC45KVwiXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0XG5cdFxuXHRzdGF0dXNfYmFyX2NvbG9yLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIFwiMClcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cblxuXG5cdGdhcEJvdHRvbSA9IC04NjBcblx0Z2FwVG9wID0gMTBcblx0Z2FwRGVsdGEgPSAyMDBcblx0XG5cdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0VXRpbHMuZGVsYXkgbG9jYWxEaXNhcHBlYXJUaW1lLCAtPlxuXHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gdHJ1ZVxuXHRcblx0XG5cdFxuXHQjIGNsb3NlIHZpZXdcblx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5vbiBFdmVudHMuTW92ZSwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA+IGdhcFRvcCAmJiBpc05ld3NWaWV3TW9kdWxhdGluZ1xuXHRcdFx0Ym91bmRzID0gW2dhcFRvcCwgZ2FwVG9wK2dhcERlbHRhXVxuXHRcdFx0bmV3c0RldGFpbGVkVG9wVmlldy55ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAsIC04OF0sIHRydWUpIFxuXHRcdFx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdHNoYXJlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMC45LCAwXSwgdHJ1ZSlcblx0XHRcdG5ld3NEZXRhaWxlZFZpZXcuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLFwiICsgbG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlICsgXCIpXCJcblx0XHRcdGxvY2FsU3RhdHVzQmFyQXJ0aXN0ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAsIDFdLCB0cnVlKVxuXHRcdFx0c3RhdHVzX2Jhcl9jb2xvci5iYWNrZ3JvdW5kQ29sb3IgPSBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgbG9jYWxTdGF0dXNCYXJBcnRpc3QgKyBcIilcIlxuXHRcdFx0XHRcblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA8IGdhcEJvdHRvbSAmJiBpc05ld3NWaWV3TW9kdWxhdGluZ1xuXHRcdFx0Ym91bmRzID0gW2dhcEJvdHRvbSwgZ2FwQm90dG9tLWdhcERlbHRhXVxuXHRcdFx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdHNoYXJlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMC45LCAwXSwgdHJ1ZSlcblx0XHRcdG5ld3NEZXRhaWxlZFZpZXcuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLFwiICsgbG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlICsgXCIpXCJcblx0XHRcdGxvY2FsU3RhdHVzQmFyQXJ0aXN0ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAsIDFdLCB0cnVlKVxuXHRcdFx0c3RhdHVzX2Jhcl9jb2xvci5iYWNrZ3JvdW5kQ29sb3IgPSBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgbG9jYWxTdGF0dXNCYXJBcnRpc3QgKyBcIilcIlxuXHRcblx0XG5cdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLm9uIEV2ZW50cy5TY3JvbGwsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPCBnYXBCb3R0b20gLSBnYXBEZWx0YSAvIDUgKiAyXG5cdFx0XHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0XHRcdGNsb3NlRGV0YWlsZWRWaWV3T25lV2F5KG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPiBnYXBUb3AgKyBnYXBEZWx0YSAvIDUgKiAyXG5cdFx0XHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0XHRcdGNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcblx0XG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0XHRjbG9zZURldGFpbGVkVmlld1R3b1dheXMobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcblx0XHRuZXdzRGV0YWlsZWRWaWV3LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0XHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRcdFx0XG5cdFx0XG5cdFxuXHRcblx0cmV0dXJuIG5ld3NEZXRhaWxlZFZpZXciLCJTb25nQ3JlYXRvciA9IHJlcXVpcmUgJ2NyZWF0ZV9zb25nJ1xuQXJ0aXN0ID0gcmVxdWlyZSBcImFydGlzdFwiXG57VGV4dExheWVyfSA9IHJlcXVpcmUgXCJ0ZXh0XCJcbmNvbmZpZyA9IEFydGlzdC5jb25maWdcblxubG9jYWxEaXNhcHBlYXJUaW1lID0gMC4yXG5sb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5sb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmUgPSBcImN1YmljLWJlemllciguMzIsLjkyLC45MiwuOTkpXCJcblxuXG5hbmltYXRlRGV0YWlsZWRBbGJ1bVBhZ2UgPSAoc29uZ3NTY3JvbGxWaWV3LCBib3VuZHMsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBhbGJ1bV9mYWtlX2ltYWdlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBvZmZzZXRWYWx1ZSwgYWxidW1PcHRpb25zWSwgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0XG5cdGFsYnVtX2Zha2VfaW1hZ2Uud2lkdGggPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFs2NDAsIG9mZnNldFZhbHVlLndpZHRoXSwgdHJ1ZSlcblx0YWxidW1fZmFrZV9pbWFnZS5oZWlnaHQgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFs2NDAsIG9mZnNldFZhbHVlLmhlaWdodF0sIHRydWUpXG5cdGFsYnVtX2Zha2VfaW1hZ2UueCA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgWzAsIG9mZnNldFZhbHVlLnhdLCB0cnVlKVxuXHRhbGJ1bV9mYWtlX2ltYWdlLnkgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLCBvZmZzZXRWYWx1ZS55XSwgdHJ1ZSlcblx0XG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjRdKVxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci53aWR0aCA9IGFsYnVtX2Zha2VfaW1hZ2Uud2lkdGhcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuaGVpZ2h0ID0gYWxidW1fZmFrZV9pbWFnZS5oZWlnaHRcblx0XHRcblx0bG9jYWxBcnRpc3QgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLjgsIDBdLCB0cnVlKVxuXHRkZXRhaWxlZEFsYnVtVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbEFydGlzdCArIFwiKVwiXG5cblx0bG9jYWxTdGF0dXNCYXJBcnRpc3QgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLCAxXSwgdHJ1ZSlcblx0IyBwcmludCBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgbG9jYWxTdGF0dXNCYXJBcnRpc3QgKyBcIilcIlxuXHRzdGF0dXNfYmFyX2NvbG9yLmJhY2tncm91bmRDb2xvciA9IFwiXCIgKyBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgbG9jYWxTdGF0dXNCYXJBcnRpc3QgKyBcIilcIlxuXHRcblx0Zm9yIGl0ZW0saSBpbiBhbGJ1bU9wdGlvbnNcblx0XHRpdGVtLm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjRdKVxuXHRcdGl0ZW0ueSA9IFV0aWxzLm1vZHVsYXRlKHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnksIGJvdW5kcywgW2FsYnVtT3B0aW9uc1lbaV0sIGFsYnVtT3B0aW9uc1lbaV0rb2Zmc2V0VmFsdWUueSAvIDIgKyAoaSsxKSAqIDIwXSlcblxuXG5jbG9zZURldGFpbGVkQWxidW1QYWdlID0gKGFsYnVtU29uZ3NWaWV3LCBhbGJ1bV9mYWtlX2ltYWdlLCBhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlciwgb2Zmc2V0VmFsdWUsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdFxuXHRhbGJ1bVNvbmdzVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDExMzZcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0d2lkdGg6IG9mZnNldFZhbHVlLndpZHRoLCBoZWlnaHQ6IG9mZnNldFZhbHVlLmhlaWdodCwgeDogb2Zmc2V0VmFsdWUueCwgeTogb2Zmc2V0VmFsdWUueVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0b3BhY2l0eTogMFxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcblx0ZGV0YWlsZWRBbGJ1bVZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHtiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwifVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRkZWxheTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcblx0Zm9yIGl0ZW0gaW4gYWxidW1PcHRpb25zXG5cdFx0aXRlbS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOiB7IG9wYWNpdHk6IDAsIHk6IGl0ZW0ueSArIDYwfVxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gNFxuXHRcblx0c3RhdHVzX2Jhcl9jb2xvci5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBcIjEpXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFxuXHRcblx0VXRpbHMuZGVsYXkgbG9jYWxEaXNhcHBlYXJUaW1lKzAuMDIsIC0+XG5cdFx0ZGV0YWlsZWRBbGJ1bVZpZXcuZGVzdHJveSgpXG5cblxuXG5cblxuIyBDb21wb3NlIERldGFpbGVkIFZpZXdcdFxuZXhwb3J0cy5jcmVhdGVEZXRhaWxlZEFsYnVtUGFnZSA9IChhbGJ1bUlELCBvZmZzZXRWYWx1ZSwgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0XG5cdGRldGFpbGVkQWxidW1WaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0XG5cdGRldGFpbGVkQWxidW1WaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0IyBpZ25vcmUgb3RoZXIgdGFwc1xuXG5cblxuXG5cdGFsYnVtX2Zha2VfaW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IGRldGFpbGVkQWxidW1WaWV3XG5cdFx0d2lkdGg6IG9mZnNldFZhbHVlLndpZHRoXG5cdFx0aGVpZ2h0OiBvZmZzZXRWYWx1ZS5oZWlnaHRcblx0XHR4OiBvZmZzZXRWYWx1ZS54XG5cdFx0eTogb2Zmc2V0VmFsdWUueVxuXHRcdGltYWdlOiBcIiN7QXJ0aXN0LmFsYnVtc0RhdGFbYWxidW1JRF0uaW1hZ2V9XCJcblxuXHRhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogYWxidW1fZmFrZV9pbWFnZVxuXHRcdG9wYWNpdHk6IDBcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiA2NDBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25fYmx1cl9jb2xvclxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuc3R5bGUgPVxuXHRcdFx0Jy13ZWJraXQtYmFja2Ryb3AtZmlsdGVyJzogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9ibHVyX3JhZGl1c1xuXHRcblx0XG5cdFxuXHRcblx0XG5cdGFsYnVtVGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHRleHQ6IFwiI3tBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS50aXRsZX1cIlxuXHRcdHdpZHRoOiAyOTIqMlxuXHRcdGhlaWdodDogNDhcblx0XHR4OiAyOFxuXHRcdHk6IDg0KjJcblx0XHRmb250U2l6ZTogNDBcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRjb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUuZGV0YWlsZWRfYWxidW1fdGl0bGVcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblx0XHRvcGFjaXR5OiAwXG5cdFxuXHRhbGJ1bVllYXIgPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHRleHQ6IFwiI3tBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS55ZWFyfVwiXG5cdFx0d2lkdGg6IDI5MioyXG5cdFx0aGVpZ2h0OiA0OFxuXHRcdHg6IDI4XG5cdFx0eTogMTE0KjJcblx0XHRmb250U2l6ZTogMzJcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRjb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUuZGV0YWlsZWRfYWxidW1feWVhclxuXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcdG9wYWNpdHk6IDBcblx0XG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA3MlxuXHRcdGhlaWdodDogNzJcblx0XHR4OiAxNDIqMlxuXHRcdHk6IDM0KjJcblx0XHRpbWFnZTogY29uZmlnICsgXCIvY2xvc2VBbGJ1bS5wbmdcIlxuXHRcdHBhcmVudDogZGV0YWlsZWRBbGJ1bVZpZXdcblx0XHRvcGFjaXR5OiAwXG5cdFxuXHRhbGJ1bVNvbmdzVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogZGV0YWlsZWRBbGJ1bVZpZXdcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiA3MDhcblx0XHR5OiAxMTM2XG5cdFx0YmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5kZXRhaWxlZF9hbGJ1bV9iYWNrZ3JvdW5kXG5cblx0XG5cdFxuXHRcblx0XG5cdFxuXHRhbGJ1bU9wdGlvbnMgPSBbYWxidW1ZZWFyLCBhbGJ1bVRpdGxlLCBjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXddXG5cdGFsYnVtT3B0aW9uc1kgPSBbYWxidW1ZZWFyLnksIGFsYnVtVGl0bGUueSwgY2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3LnldXG5cblx0YWxidW1fZmFrZV9pbWFnZS5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHdpZHRoOiA2NDAsIGhlaWdodDogNjQwLCB4OiAwLCB5OiAwXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IG9wYWNpdHk6IDEgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGRlbGF5OiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XG5cdGZvciBpdGVtIGluIGFsYnVtT3B0aW9uc1xuXHRcdGl0ZW0uYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczogeyBvcGFjaXR5OiAxIH1cblx0XHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRcdGRlbGF5OiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0XHRcblx0ZGV0YWlsZWRBbGJ1bVZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHtiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjgpXCJ9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdGRlbGF5OiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cblx0YWxidW1Tb25nc1ZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAzMDhcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcdGRlbGF5OiBsb2NhbERpc2FwcGVhclRpbWUgLyA0XG5cblx0XG5cdHN0YXR1c19iYXJfY29sb3IuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgXCIwKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXG5cblxuXG5cblxuXHQjIENvbXBvc2Ugc29uZyBmb3IgYWxidW1cblx0c29uZ3NTY3JvbGxWaWV3ID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDcwOFxuXHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0cGFyZW50OiBhbGJ1bVNvbmdzVmlld1xuXHRcdHk6IDIwXG5cdFx0c3BlZWRZOiAwLjhcblxuXHRzb25ncyA9IFNvbmdDcmVhdG9yLmNyZWF0ZVNvbmdzRm9yQWxidW0oYWxidW1JRClcblx0c29uZ1Jlc3VsdEhlaWdodCA9IDBcblx0Zm9yIHNvbmcsaSBpbiBzb25nc1xuXHRcdHNvbmcueSA9IGkgKiA4MFxuXHRcdHNvbmdSZXN1bHRIZWlnaHQgPSBzb25nLnkgKyBzb25nLmhlaWdodFxuXHRcdHNvbmcucGFyZW50ID0gc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnRcblx0XG5cdFxuXHRcblx0XG5cdCMgQ2xvc2UgQWxidW0gVmlld1xuXHRjbG9zaW5nQWxidW1WaWV3ID0gZmFsc2Vcblx0Ym91bmRzID0gWzIwLCAyMjBdXG5cdGJvdW5kc0JvdHRvbSA9IFstKHNvbmdSZXN1bHRIZWlnaHQgLSBzb25nc1Njcm9sbFZpZXcuaGVpZ2h0ICsgYm91bmRzWzBdKSwgLShzb25nUmVzdWx0SGVpZ2h0IC0gc29uZ3NTY3JvbGxWaWV3LmhlaWdodCArIGJvdW5kc1sxXSldXG5cdFxuXHRzb25nc1Njcm9sbFZpZXcub24gRXZlbnRzLlNjcm9sbCwgLT5cblx0XHRcblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55ID4gYm91bmRzWzBdXG5cdFx0XHRhbmltYXRlRGV0YWlsZWRBbGJ1bVBhZ2Uoc29uZ3NTY3JvbGxWaWV3LCBib3VuZHMsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBhbGJ1bV9mYWtlX2ltYWdlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBvZmZzZXRWYWx1ZSwgYWxidW1PcHRpb25zWSwgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55IDwgYm91bmRzQm90dG9tWzBdXG5cdFx0XHRhbmltYXRlRGV0YWlsZWRBbGJ1bVBhZ2Uoc29uZ3NTY3JvbGxWaWV3LCBib3VuZHNCb3R0b20sIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBhbGJ1bV9mYWtlX2ltYWdlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBvZmZzZXRWYWx1ZSwgYWxidW1PcHRpb25zWSwgc3RhdHVzX2Jhcl9jb2xvcilcblxuXHRcdFx0XG5cdFxuXG5cblxuXHRzb25nc1Njcm9sbFZpZXcub24gRXZlbnRzLlNjcm9sbEVuZCwgLT5cblx0XHRcblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55ID4gKGJvdW5kc1sxXS1ib3VuZHNbMF0pIC8gNSAqIDJcblx0XHRcdHNvbmdzU2Nyb2xsVmlldy5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRjbG9zaW5nQWxidW1WaWV3ID0gdHJ1ZVxuXHRcdFx0Y2xvc2VEZXRhaWxlZEFsYnVtUGFnZShhbGJ1bVNvbmdzVmlldywgYWxidW1fZmFrZV9pbWFnZSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIG9mZnNldFZhbHVlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPCAoYm91bmRzQm90dG9tWzFdLWJvdW5kc0JvdHRvbVswXSkgLyA1ICogMiArIGJvdW5kc0JvdHRvbVswXVxuXHRcdFx0c29uZ3NTY3JvbGxWaWV3Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGNsb3NpbmdBbGJ1bVZpZXcgPSB0cnVlXG5cdFx0XHRjbG9zZURldGFpbGVkQWxidW1QYWdlKGFsYnVtU29uZ3NWaWV3LCBhbGJ1bV9mYWtlX2ltYWdlLCBhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlciwgb2Zmc2V0VmFsdWUsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XG5cdFxuXHRcblx0c29uZ3NTY3JvbGxWaWV3Lm9uIEV2ZW50cy5Nb3ZlLCAtPlxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPiBib3VuZHNbMF0gYW5kICFjbG9zaW5nQWxidW1WaWV3XG5cdFx0XHRhbmltYXRlRGV0YWlsZWRBbGJ1bVBhZ2Uoc29uZ3NTY3JvbGxWaWV3LCBib3VuZHMsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBhbGJ1bV9mYWtlX2ltYWdlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBvZmZzZXRWYWx1ZSwgYWxidW1PcHRpb25zWSwgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcdFxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPCBib3VuZHNCb3R0b21bMF0gYW5kICFjbG9zaW5nQWxidW1WaWV3XG5cdFx0XHRhbmltYXRlRGV0YWlsZWRBbGJ1bVBhZ2Uoc29uZ3NTY3JvbGxWaWV3LCBib3VuZHNCb3R0b20sIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBhbGJ1bV9mYWtlX2ltYWdlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBvZmZzZXRWYWx1ZSwgYWxidW1PcHRpb25zWSwgc3RhdHVzX2Jhcl9jb2xvcilcblx0XG5cdFxuXHRcblx0XG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdHNvbmdzU2Nyb2xsVmlldy5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0Y2xvc2luZ0FsYnVtVmlldyA9IHRydWVcblx0XHRjbG9zZURldGFpbGVkQWxidW1QYWdlKGFsYnVtU29uZ3NWaWV3LCBhbGJ1bV9mYWtlX2ltYWdlLCBhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlciwgb2Zmc2V0VmFsdWUsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIHN0YXR1c19iYXJfY29sb3IpXG5cdFxuXHRcblxuXHRyZXR1cm4gW2RldGFpbGVkQWxidW1WaWV3LCBzb25nc10iLCJ7U29uZ30gPSByZXF1aXJlIFwic29uZ1wiXG57VGV4dExheWVyfSA9IHJlcXVpcmUgXCJ0ZXh0XCJcblxuQXJ0aXN0ID0gcmVxdWlyZSBcImFydGlzdFwiXG5jb25maWcgPSBBcnRpc3QuY29uZmlnXG5cbiMgU29uZyAoYWxidW1JRClcbmV4cG9ydHMuY3JlYXRlU29uZ3NGb3JBbGJ1bSA9IChhbGJ1bUlEKSAtPlxuXHRzb25ncyA9IFtdXG5cdGZvciBzb25nLCBpIGluIEFydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzXG5cdFx0c29uZ3MucHVzaChALmNyZWF0ZUFsYnVtU29uZyhhbGJ1bUlELCBpKSlcblx0cmV0dXJuIHNvbmdzXG5cdFxuXG5cbmV4cG9ydHMuY3JlYXRlU29uZ3NGb3JGYXYgPSAoc29uZ3NMaXN0KSAtPlxuXHRzb25ncyA9IFtdXG5cdGZvciBzb25nLCBpIGluIHNvbmdzTGlzdC5zb25nc1xuXHRcdHNvbmdzLnB1c2goQC5jcmVhdGVTb25nKGkpKVxuXHRyZXR1cm4gc29uZ3NcblxuXG5cblxuIyBTb25nIChhbGJ1bUlELCBzb25nTnVtYmVyKVxuZXhwb3J0cy5jcmVhdGVTb25nID0gKHNvbmdOdW1iZXIpIC0+XG5cdFxuXHRzb25nVmlldyA9IG5ldyBTb25nXG5cdFx0aGVpZ2h0OiAxMzJcblx0XHRhbGJ1bUlEOiBBcnRpc3QuZmF2TGlzdC5hbGJ1bXNbc29uZ051bWJlcl1cblx0XHRzb25nSUQ6IHNvbmdOdW1iZXJcblxuXHRzb25nSW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHNvbmdWaWV3XG5cdFx0aW1hZ2U6IEFydGlzdC5hbGJ1bXNEYXRhW0FydGlzdC5mYXZMaXN0LmFsYnVtc1tzb25nTnVtYmVyXV0uaW1hZ2Vcblx0XHR3aWR0aDogNDgqMlxuXHRcdGhlaWdodDogNDgqMlxuXHRcdHg6IDMyXG5cdFx0eTogMTZcblxuXHRzb25nVGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdHRleHQ6IFwiI3tBcnRpc3QuZmF2TGlzdC5zb25nc1tzb25nTnVtYmVyXX1cIlxuXHRcdHdpZHRoOiA0NDBcblx0XHRoZWlnaHQ6IDQ0XG5cdFx0eDogMTU2XG5cdFx0eTogMjJcblx0XHRmb250U2l6ZTogMzZcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0Y29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGVcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblxuXHRhbGJ1bVRpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7QXJ0aXN0LmFsYnVtc0RhdGFbQXJ0aXN0LmZhdkxpc3QuYWxidW1zW3NvbmdOdW1iZXJdXS50aXRsZX1cIlxuXHRcdHdpZHRoOiA0NDBcblx0XHRoZWlnaHQ6IDM0XG5cdFx0eDogMTU2XG5cdFx0eTogNjhcblx0XHRmb250U2l6ZTogMjhcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0Y29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX3NvbmdfdGltZVxuXHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcblx0cmV0dXJuIHNvbmdWaWV3XG5cblxuXG5cbiMgU29uZyAoYWxidW1JRCwgc29uZ051bWJlcilcbmV4cG9ydHMuY3JlYXRlQWxidW1Tb25nID0gKGFsYnVtSUQsIHNvbmdOdW1iZXIpIC0+XG5cdFxuXHRzb25nVmlldyA9IG5ldyBTb25nXG5cdFx0aGVpZ2h0OiA4MFxuXHRcdGFsYnVtSUQ6IGFsYnVtSURcblx0XHRzb25nSUQ6IHNvbmdOdW1iZXJcblx0XHQjIGFsYnVtVGl0bGU6IEFydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpbWVbc29uZ051bWJlcl1cblx0XHRzb25nVGl0bGU6IEFydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzW3NvbmdOdW1iZXJdXG5cblx0c29uZ1RpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7c29uZ1ZpZXcuc29uZ1RpdGxlfVwiXG5cdFx0d2lkdGg6IDQ0MFxuXHRcdGhlaWdodDogNDBcblx0XHR4OiAoMjgrMTQpKjJcblx0XHR5OiAyMFxuXHRcdGZvbnRTaXplOiAzMlxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRjb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUuZGV0YWlsZWRfYWxidW1fc29uZ190aXRsZVxuXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXG5cdHNvbmdEdXJhdGlvbiA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IHNvbmdWaWV3XG5cdFx0dGV4dDogXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpbWVbc29uZ051bWJlcl19XCJcblx0XHR3aWR0aDogMTIwXG5cdFx0aGVpZ2h0OiAzNFxuXHRcdHg6IDIzMioyKzI4XG5cdFx0eTogMjZcblx0XHRmb250U2l6ZTogMjhcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdGNvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5kZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWVcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XHRvcGFjaXR5OiAwLjdcblx0XG5cdHNvbmdOdW1iZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdHRleHQ6IFwiI3tzb25nTnVtYmVyKzF9XCJcblx0XHR3aWR0aDogMTgqMlxuXHRcdGhlaWdodDogMTQqMlxuXHRcdHg6IDEwKjJcblx0XHR5OiAxMyoyXG5cdFx0Zm9udFNpemU6IDI0XG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRjb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUuZGV0YWlsZWRfYWxidW1fc29uZ19udW1iZXJcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XHRvcGFjaXR5OiAwLjdcblx0XG5cdHJldHVybiBzb25nVmlldyIsImNvbmZpZyA9IFwiYXJ0aXN0cy9pbVwiXG5leHBvcnRzLmNvbmZpZyA9IGNvbmZpZ1xuXG5ncmV5c193aGl0ZSA9IFwiI0ZGRkZGRlwiXG5ncmV5c19wcmVfd2hpdGUgPSBcIiNGN0Y3RjdcIlxuZ3JleXNfdWx0cmFfbGlnaHQgPSBcIiNFRUVFRUVcIlxuZ3JleXNfbGlnaHRlc3QgPSBcIiNERERERERcIlxuZ3JleXNfbGlnaHRlciA9IFwiI0NDQ0NDQ1wiXG5ncmV5c19iYXNlID0gXCIjOTk5OTk5XCJcbmdyZXlzX2RhcmtlciA9IFwiIzY2NjY2NlwiXG5ncmV5c19kYXJrZXN0ID0gXCIjMjIyMjIyXCJcbmdyZXlzX2JsYWNrID0gXCIjMDAwMDAwXCJcblxuXG5leHBvcnRzLmNvbG9yVGhlbWUgPSB7XG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gaGVhZGVyLnBuZ1wiXG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3I6IFwicmdiYSgxNTAsMjIsMTEsXCJcblx0bmF2aWdhdGlvbl9vdmVybGF5X2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gZGFya2VyLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9oZWFkZXJfdGV4dDogXCIjRkZGRkZGXCJcblx0XG5cdG5hdmlnYXRpb25fYmFja2dyb3VuZDogY29uZmlnICsgXCIvYmcucG5nXCJcblx0IyBuYXZpZ2F0aW9uX3NoYWRvdzogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF9iYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC40KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX3RpbWVsaW5lOiBcIiM2NjZcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfcmFkaXVzOiBcImJsdXIoMTBweClcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfY29sb3I6IFwicmdiYSgwLDAsMCwwLjYpXCJcblx0IyBuYXZpZ2F0aW9uX2NhcmRfb3ZlcmxheV9iYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIlxuXG5cblxuXHRwbGF5ZXJfYmFja2dyb3VuZDogXCIjMUQxRDFEXCJcblx0cGxheWVyX3Byb2dyZXNzX2Jhc2U6IFwiIzY2NlwiXG5cdHBsYXllcl9wcm9ncmVzc19maWxsZWQ6IFwiI0FGMTQxN1wiXG5cdHBsYXllcl9zb25nX3RpdGxlOiBcIndoaXRlXCJcblx0cGxheWVyX2FsYnVtX3RpdGxlOiBcInJnYmEoMjA0LDIwNCwyMDQsMC41KVwiXG5cdFxuXHRwbGF5ZXJfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdHBsYXllcl9zaGFkb3dfeTogLTIwXG5cdHBsYXllcl9zaGFkb3dfYmx1cjogNDBcblxuXG5cblx0Y2FyZF9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0Y2FyZF9zaGFkb3dfeTogMjhcblx0Y2FyZF9zaGFkb3dfYmx1cjogNDBcblx0XG5cdCMgRGV0YWlsZWQgQWxidW1cblx0ZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZDogXCIjMTExXCJcblx0ZGV0YWlsZWRfYWxidW1fdGl0bGU6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV95ZWFyOiBcInJnYmEoMjA0LDIwNCwyMDQsMC41KVwiXG5cdGZhdl9zb25nc190aXRsZTogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNSlcIlxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bSBTb25nXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGU6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX251bWJlcjogXCIjOTk5XCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aW1lOiBcIiM5OTlcIlxuXG59XG5cblxuXG5cblxubmV3c01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8wLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzAuanBnXCJcbn1cblxubmV3c01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEuanBnXCJcbn1cblxubmV3c01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8yLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzIuanBnXCJcbn1cblxubmV3c01vZGVsMyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8zLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzMuanBnXCJcbn1cblxubmV3c01vZGVsNCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy80LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzQuanBnXCJcbn1cblxubmV3c01vZGVsNSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy81LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzUuanBnXCJcbn1cblxubmV3c01vZGVsNiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy82LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzYuanBnXCJcbn1cblxubmV3c01vZGVsNyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy83LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzcuanBnXCJcbn1cblxubmV3c01vZGVsOCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvOC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy84LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzguanBnXCJcbn1cblxubmV3c01vZGVsOSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy85LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzkuanBnXCJcbn1cblxubmV3c01vZGVsMTAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEwLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEwLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEwLmpwZ1wiXG59XG5cbmV4cG9ydHMuZmVlZERhdGEgPSBbbmV3c01vZGVsMCwgbmV3c01vZGVsMSwgbmV3c01vZGVsMiwgbmV3c01vZGVsMywgbmV3c01vZGVsNCwgbmV3c01vZGVsNSwgbmV3c01vZGVsNiwgbmV3c01vZGVsNywgbmV3c01vZGVsOCwgbmV3c01vZGVsOSwgbmV3c01vZGVsMTBdXG5cblxuXG5cblxuXG5cblxuXG52aWRlb01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8wLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8xLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMS5tcDRcIlxufVxuXG52aWRlb01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8yLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMS5tcDRcIlxufVxuXG5cblxucGxheWxpc3QwID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8wLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8wLnBuZ1wiXG59XG5cbnBsYXlsaXN0MSA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8xLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMS5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMS5wbmdcIlxufVxuXG5leHBvcnRzLnBsYXlsaXN0c0RhdGEgPSBbcGxheWxpc3QwLCBwbGF5bGlzdDFdXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMl1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgR2V0dGluZyBEYXRhXG5cbiMgY29uZmlnID0gXCJhcnRpc3RzL3NwbGVhblwiXG5cbiMgYWxidW1Nb2RlbDAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDE5OTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDE5OTVcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMTk5OVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA1XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAyMDA2XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw1ID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAyMDA3XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw2ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMDlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDcgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAxMlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAxM1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTEgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxN1xuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTQgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxOFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTUgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAyMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuXG5cblxuXG4jIGV4cG9ydHMuYWxidW1zRGF0YSA9IFthbGJ1bU1vZGVsMCwgYWxidW1Nb2RlbDEsIGFsYnVtTW9kZWwyLCBhbGJ1bU1vZGVsMywgYWxidW1Nb2RlbDQsIGFsYnVtTW9kZWw1LCBhbGJ1bU1vZGVsNiwgYWxidW1Nb2RlbDcsIGFsYnVtTW9kZWw4LCBhbGJ1bU1vZGVsOSwgYWxidW1Nb2RlbDEwLCBhbGJ1bU1vZGVsMTEsIGFsYnVtTW9kZWwxMiwgYWxidW1Nb2RlbDEzLCBhbGJ1bU1vZGVsMTQsIGFsYnVtTW9kZWwxNV1cblxuXG5cbmNvbmZpZ0FsYnVtcyA9IGNvbmZpZyArIFwiL2FsYnVtcy9cIlxuIyBwcmludCBjb25maWdBbGJ1bXNcblxucmFuZG9tU291cmNlID0gW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiXVxuXG5cbmV4cG9ydHMuYWxidW1zRGF0YSA9IFt7dGl0bGU6XCJDbGFzc2ljYWwgTXVzaHJvb21cIix5ZWFyOjIwMDAsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIkJ1c3QgQSBNb3ZlXCIsXCJOb25lIE9mIFRoaXMgSXMgUmVhbFwiLFwiU2FpbGluZyBJbiBUaGUgU2VhIE9mIE11c2hyb29tXCIsXCJUaGUgU2hlblwiLFwiRGlzY28gTXVzaHJvb21cIixcIkRyYWN1bFwiLFwiTm90aGluZyBDb21lcyBFYXN5XCIsXCJNdXNoIE11c2hpXCIsXCJUaGUgTWlzc2VkIFN5bXBob255XCJdLHRpbWU6W1wiMDg6MjFcIixcIjA2OjIyXCIsXCIwODoxOFwiLFwiMDg6MzNcIixcIjA4OjQ2XCIsXCIwODowMFwiLFwiMDc6MjZcIixcIjA3OjM2XCIsXCIxMDoyNlwiXSwgaW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMC5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJCLlAuRW1waXJlXCIseWVhcjoyMDAxLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJOZXZlciBFdmVyIExhbmRcIixcIlVuYmFsYW5jZWRcIixcIlNwYW5pYXJkXCIsXCJCLlAuRW1waXJlXCIsXCJGdW5jaGFtZWxlb25cIixcIlRhc3R5IE11c2hyb29tXCIsXCJOb2lzZSBNYWtlclwiLFwiUC5HLk0uXCIsXCJEYW5jaW5nIFdpdGggS2FkYWZpXCJdLHRpbWU6W1wiMDc6NDZcIixcIjA3OjE1XCIsXCIwNzozOFwiLFwiMDc6MjZcIixcIjA2OjU1XCIsXCIwNjo1NlwiLFwiMDc6MzlcIixcIjA3OjIxXCIsXCIxMDoyMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxLmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIkNvbnZlcnRpbmcgVmVnZXRhcmlhbnNcIix5ZWFyOjIwMDMsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIkFsYmliZW5vXCIsXCJIdXNoIE1haWxcIixcIkFwb2dpZmZhIE5pZ2h0XCIsXCJTb25nIFBvbmdcIixcIkNoYXBsaW5cIixcIkVjaG9ub21peFwiLFwiU2NvcnBpb24gRnJvZ1wiLFwiRGVlcGx5IERpc3R1cmJlZFwiLFwiU2VtaSBOaWNlXCIsXCJZYW5rbyBQaXRjaFwiLFwiQ29udmVydGluZyBWZWdldGFyaWFuc1wiLFwiRWxhdGlvbiBTdGF0aW9uXCIsXCJEcm9wIE91dFwiLFwiQXZyYXR6XCIsXCJCbGlua1wiLFwiU2hha2F3a2F3XCIsXCJQbGV0enR1cnJhXCIsXCJJIFdpc2hcIixcIkJhbGxlcml1bVwiLFwiU2VsZWN0YVwiLFwiSWxsdW1pbmF1Z2h0eVwiLFwiSmVlbmdlXCIsXCJFbGV2YXRpb25cIl0sdGltZTpbXCIwNzowM1wiLFwiMDc6MDFcIixcIjA4OjA4XCIsXCIwODozNlwiLFwiMDY6NTRcIixcIjA3OjQzXCIsXCIwODowMFwiLFwiMDg6MjZcIixcIjA2OjA5XCIsXCIwODoxM1wiLFwiMDU6MzlcIixcIjA1OjM1XCIsXCIwNToxNFwiLFwiMTA6MjNcIixcIjA1OjMyXCIsXCIwNDowOFwiLFwiMDY6NDRcIixcIjAzOjAwXCIsXCIwNzoxN1wiLFwiMDU6MjFcIixcIjA0OjUwXCIsXCIwNzowMlwiLFwiMDU6MTVcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMi5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJJJ20gVGhlIFN1cGVydmlzb3JcIix5ZWFyOjIwMDQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIkknbSBUaGUgU3VwZXJ2aXNvclwiLFwiUmF0aW9uIFNobWF0aW9cIixcIk11c2UgQnJlYWtzIFJNWFwiLFwiTWVkdXp6XCIsXCJDaXRpZXMgT2YgVGhlIEZ1dHVyZVwiLFwiSG9ydXMgVGhlIENob3J1c1wiLFwiRnJvZyBNYWNoaW5lXCIsXCJOb29uXCIsXCJCb21iYXRcIixcIlN0cmV0Y2hlZFwiXSx0aW1lOltcIjA4OjMyXCIsXCIwNjoyOVwiLFwiMDc6MDlcIixcIjA2OjQyXCIsXCIwNjo1OVwiLFwiMDc6MzlcIixcIjA2OjEwXCIsXCIwNjowN1wiLFwiMDg6MThcIixcIjA3OjIyXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjMuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiVmljaW91cyBEZWxpY2lvdXNcIix5ZWFyOjIwMDcsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIkJlY29taW5nIEluc2FuZVwiLFwiQXJ0aWxsZXJ5XCIsXCJWaWNpb3VzIERlbGljaW91c1wiLFwiSGVhdnl3ZWlnaHRcIixcIlN1bGltYW5cIixcIkZvcmdpdmUgTWVcIixcIlNwZWNpYWwgUGxhY2VcIixcIkluIEZyb250IE9mIE1lXCIsXCJFYXQgSXQgUmF3XCIsXCJDaGFuZ2UgVGhlIEZvcm1hbGl0eVwiLFwiQmVmb3JlXCJdLHRpbWU6W1wiMDc6MjBcIixcIjA0OjI4XCIsXCIwNzoyNFwiLFwiMDg6NDFcIixcIjA2OjEwXCIsXCIwMzoyOVwiLFwiMDY6NTNcIixcIjA0OjI4XCIsXCIwNjozMFwiLFwiMDc6NDRcIixcIjA2OjU3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjQuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiTGVnZW5kIE9mIFRoZSBCbGFjayBTaGF3YXJtYVwiLHllYXI6MjAwOSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wiUG9xdWl0byBNYXNcIixcIlNhZWVkXCIsXCJFbmQgT2YgVGhlIFJvYWRcIixcIlNtYXNoaW5nIFRoZSBPcHBvbmVudFwiLFwiQ2FuJ3QgU3RvcFwiLFwiSGVyYmVydCBUaGUgUGVydmVydFwiLFwiS2lsbGluZyBUaW1lXCIsXCJQcm9qZWN0IDEwMFwiLFwiRnJhbmtzXCIsXCJTbG93bHlcIixcIlRoZSBMZWdlbmQgT2YgVGhlIEJsYWNrIFNoYXdhcm1hXCIsXCJSaWRlcnMgT24gVGhlIFN0b3JtXCJdLHRpbWU6W1wiMDM6MzlcIixcIjA3OjAzXCIsXCIwNjo0NlwiLFwiMDQ6MDlcIixcIjA3OjIzXCIsXCIwNzoxN1wiLFwiMDM6MDRcIixcIjA5OjM3XCIsXCIwODowNFwiLFwiMDg6NTlcIixcIjA3OjExXCIsXCIwNDoyOVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI1LmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIlBvd2VyIENoYXJnZVwiLHllYXI6MjAxMSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wiSGVsbGlvbiBQcmltZVwiLFwiRW5lcmd5IFNlcXVlbmNlXCIsXCJQb3dlciBDaGFyZ2VcIixcIkNpdGllcyBvZiB0aGUgRnV0dXJlXCIsXCJBY2lkIFByb29mXCIsXCJGbHlpbmdcIixcIjEwLjAwMCBGYWhyZW5oZWl0XCIsXCJCcmFpbiBTcGF3blwiLFwiVW5iYWxhbmNlZFwiXSx0aW1lOltcIjA2OjM2XCIsXCIwNjozMVwiLFwiMDY6MzhcIixcIjA3OjI1XCIsXCIwNjozN1wiLFwiMDY6MzRcIixcIjA2OjQ2XCIsXCIwNjo0NVwiLFwiMDY6NDdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNi5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LCBcblxue3RpdGxlOlwiQXJteSBPZiBNdXNocm9vbXNcIix5ZWFyOjIwMTIsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIk5ldmVyIE1pbmRcIixcIk5vdGhpbmcgdG8gU2F5XCIsXCJTZW5kIE1lIGFuIEFuZ2VsXCIsXCJVIFIgU28gRnVja2VkXCIsXCJUaGUgUmF0XCIsXCJOYXRpb24gb2YgV3Vzc2VzXCIsXCJXYW50ZWQgVG9cIixcIlNlcnZlIE15IFRoaXJzdFwiLFwiSSBTaGluZVwiLFwiRHJ1bSBuIEJhc3NhXCIsXCJUaGUgUHJldGVuZGVyXCIsXCJUaGUgTWVzc2VuZ2VyIDIwMTJcIixcIlN3aW5naXNoXCJdLHRpbWU6W1wiMDY6MDVcIixcIjA2OjI4XCIsXCIwNzoyNVwiLFwiMDQ6NDFcIixcIjA3OjQzXCIsXCIwNzowMlwiLFwiMDM6MjRcIixcIjA2OjQ2XCIsXCIwNTo0M1wiLFwiMDc6MTJcIixcIjA2OjM0XCIsXCIxMDozOFwiLFwiMDY6MTZcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNy5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJGcmllbmRzIE9uIE11c2hyb29tc1wiLHllYXI6MjAxNCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wiS2Fma2FmXCIsXCJCYXNzIE5pcHBsZVwiLFwiU2F2YW50IE9uIE11c2hyb29tc1wiLFwiS2lwb2RcIixcIkthemFidWJ1XCIsXCJOb3cgSXMgR29sZFwiLFwiUmlzZSBVcFwiLFwiTmVyZHMgT24gTXVzaHJvb21zXCIsXCJNYW1iYWNvcmVcIixcIldoZXJlIERvIEkgQmVsb25nXCIsXCJBc3RyaXggT24gTXVzaHJvb21zXCIsXCJXaG8gSXMgVGhlcmVcIixcIkJhcmtcIixcIlRyYW5jZSBQYXJ0eVwiLFwiVGhlIEZyZW5jaFwiLFwiS2lwb2RcIl0sdGltZTpbXCIwNTo0N1wiLFwiMDQ6NTRcIixcIjA2OjE4XCIsXCIwNzowMFwiLFwiMDY6MjRcIixcIjA1OjUzXCIsXCIwNToyOVwiLFwiMDU6MzNcIixcIjA0OjE5XCIsXCIwMzoyNlwiLFwiMDk6NTZcIixcIjA0OjA0XCIsXCIwNDowOVwiLFwiMDc6NDFcIixcIjA2OjU1XCIsXCIwNTo0N1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI4LmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIkNvbnZlcnRpbmcgVmVnZXRhcmlhbnMgSUlcIix5ZWFyOjIwMTUsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIlNoZSBab3JlbWV0XCIsXCJZYW1ha2FzIGluIFNwYWNlXCIsXCJTZW5zZSBvZiBEaXJlY3Rpb25cIixcIkFuaW1hdHJvbmljYVwiLFwiRmVlbGluZ3NcIixcIlBpbmsgRnJvaWRcIixcIkRlbW9ucyBvZiBQYWluXCIsXCJab2FuIFpvdW5kXCIsXCJCbHVlIFN3YW4gNVwiLFwiRmllbGRzIG9mIEdyZXlcIixcIkxlb3BvbGRcIixcIk9uIFRoZSBSb2FkIEFnYWluXCIsXCJTdHVjayBpbiBhIExvb3BcIixcIk1leGljYWxpXCIsXCJUaGUgU3VyZ2VvblwiXSx0aW1lOltcIjA1OjE0XCIsXCIwNzozM1wiLFwiMDM6MjVcIixcIjA2OjE1XCIsXCIwNDoxMFwiLFwiMDc6NDBcIixcIjAyOjU4XCIsXCIwNDozMVwiLFwiMDg6NThcIixcIjA0OjE4XCIsXCIwNDoxNFwiLFwiMDM6NTlcIixcIjA0OjIzXCIsXCIwMzo0NVwiLFwiMDY6MjFcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOS5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9XG5cblxuXG5dXG5cblxuXG5cbiMgZXhwb3J0cy5mYXZMaXN0ID0ge1xuIyBcdHNvbmdzOiBbXCJhZFwiXVxuIyBcdHRpbWU6IFtcIjE6MVwiXVxuIyBcdGFsYnVtczogWzNdXG4jIH1cbmV4cG9ydHMuZmF2TGlzdCA9IHtcblx0c29uZ3M6IFtcIkxpcXVpZCBTbW9rZVwiLCBcIlNoZSBab3JlbWV0XCIsIFwiUmlkZXJzIE9uIFRoZSBTdG9ybVwiLCBcIkFydGlsbGVyeVwiLCAgXCJLYXphYnVidVwiLCBcIk5ldmVyIE1pbmRcIiwgXCJab2FuIFpvdW5kXCIsIFwiSGVhdnl3ZWlnaHRcIiwgXCJLYWZrYWZcIiwgXCJCYXNzIE5pcHBsZVwiXVxuXHRzb3VyY2U6IHJhbmRvbVNvdXJjZVxuXG5cdHRpbWU6IFtcIjY6MzlcIiwgXCI1OjE0XCIsIFwiNDoyOVwiLCBcIjQ6MjhcIiwgXCI2OjI0XCIsIFwiNjowNVwiLCBcIjQ6MzFcIiwgXCI4OjQxXCIsIFwiNTo0N1wiLCBcIjQ6NTRcIl1cblx0YWxidW1zOiBbMiwgOSwgNSwgNCwgOCwgNywgOSwgNCwgOCwgOF1cbn0iLCJjb25maWcgPSBcImFydGlzdHMvdHJvbGxcIlxuZXhwb3J0cy5jb25maWcgPSBjb25maWdcblxuZ3JleXNfd2hpdGUgPSBcIiNGRkZGRkZcIlxuZ3JleXNfcHJlX3doaXRlID0gXCIjRjdGN0Y3XCJcbmdyZXlzX3VsdHJhX2xpZ2h0ID0gXCIjRUVFRUVFXCJcbmdyZXlzX2xpZ2h0ZXN0ID0gXCIjREREREREXCJcbmdyZXlzX2xpZ2h0ZXIgPSBcIiNDQ0NDQ0NcIlxuZ3JleXNfYmFzZSA9IFwiIzk5OTk5OVwiXG5ncmV5c19kYXJrZXIgPSBcIiM2NjY2NjZcIlxuZ3JleXNfZGFya2VzdCA9IFwiIzIyMjIyMlwiXG5ncmV5c19ibGFjayA9IFwiIzAwMDAwMFwiXG5cblxuZXhwb3J0cy5jb2xvclRoZW1lID0ge1xuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGhlYWRlci5wbmdcIlxuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yOiBcInJnYmEoMCwwLDAsXCJcblx0bmF2aWdhdGlvbl9vdmVybGF5X2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gZGFya2VyLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9oZWFkZXJfdGV4dDogXCIjRkZGRkZGXCJcblx0XG5cdG5hdmlnYXRpb25fYmFja2dyb3VuZDogY29uZmlnICsgXCIvYmcucG5nXCJcblx0IyBuYXZpZ2F0aW9uX3NoYWRvdzogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF9iYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC40KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX3RpbWVsaW5lOiBcIiM2NjZcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfcmFkaXVzOiBcImJsdXIoMTBweClcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfY29sb3I6IFwicmdiYSgwLDAsMCwwLjYpXCJcblx0IyBuYXZpZ2F0aW9uX2NhcmRfb3ZlcmxheV9iYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIlxuXG5cblxuXHRwbGF5ZXJfYmFja2dyb3VuZDogXCIjMUQxRDFEXCJcblx0cGxheWVyX3Byb2dyZXNzX2Jhc2U6IFwiIzY2NlwiXG5cdHBsYXllcl9wcm9ncmVzc19maWxsZWQ6IFwiI0FGMTQxN1wiXG5cdHBsYXllcl9zb25nX3RpdGxlOiBcIndoaXRlXCJcblx0cGxheWVyX2FsYnVtX3RpdGxlOiBcInJnYmEoMjA0LDIwNCwyMDQsMC41KVwiXG5cdFxuXHRwbGF5ZXJfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdHBsYXllcl9zaGFkb3dfeTogLTIwXG5cdHBsYXllcl9zaGFkb3dfYmx1cjogNDBcblxuXG5cblx0Y2FyZF9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0Y2FyZF9zaGFkb3dfeTogMjhcblx0Y2FyZF9zaGFkb3dfYmx1cjogNDBcblx0XG5cdCMgRGV0YWlsZWQgQWxidW1cblx0ZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZDogXCIjMTExXCJcblx0ZGV0YWlsZWRfYWxidW1fdGl0bGU6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV95ZWFyOiBcInJnYmEoMjA0LDIwNCwyMDQsMC41KVwiXG5cdGZhdl9zb25nc190aXRsZTogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNSlcIlxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bSBTb25nXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGU6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX251bWJlcjogXCIjOTk5XCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aW1lOiBcIiM5OTlcIlxuXG59XG5cblxuXG5cblxubmV3c01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8wLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzAuanBnXCJcbn1cblxubmV3c01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEuanBnXCJcbn1cblxubmV3c01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8yLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzIuanBnXCJcbn1cblxubmV3c01vZGVsMyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8zLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzMuanBnXCJcbn1cblxubmV3c01vZGVsNCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy80LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzQuanBnXCJcbn1cblxubmV3c01vZGVsNSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy81LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzUuanBnXCJcbn1cblxubmV3c01vZGVsNiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy82LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzYuanBnXCJcbn1cblxubmV3c01vZGVsNyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy83LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzcuanBnXCJcbn1cblxubmV3c01vZGVsOCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvOC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy84LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzguanBnXCJcbn1cblxubmV3c01vZGVsOSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy85LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzkuanBnXCJcbn1cblxubmV3c01vZGVsMTAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEwLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEwLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEwLmpwZ1wiXG59XG5cbmV4cG9ydHMuZmVlZERhdGEgPSBbbmV3c01vZGVsMCwgbmV3c01vZGVsMSwgbmV3c01vZGVsMiwgbmV3c01vZGVsMywgbmV3c01vZGVsNCwgbmV3c01vZGVsNSwgbmV3c01vZGVsNiwgbmV3c01vZGVsNywgbmV3c01vZGVsOCwgbmV3c01vZGVsOSwgbmV3c01vZGVsMTBdXG5cblxuXG5cblxuXG5cblxuXG52aWRlb01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8wLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8xLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8yLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG5cblxucGxheWxpc3QwID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8wLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8wLnBuZ1wiXG59XG5cbnBsYXlsaXN0MSA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8xLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMS5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMS5wbmdcIlxufVxuXG5leHBvcnRzLnBsYXlsaXN0c0RhdGEgPSBbcGxheWxpc3QwLCBwbGF5bGlzdDFdXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMl1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgR2V0dGluZyBEYXRhXG5cbiMgY29uZmlnID0gXCJhcnRpc3RzL3NwbGVhblwiXG5cbiMgYWxidW1Nb2RlbDAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDE5OTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDE5OTVcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMTk5OVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA1XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAyMDA2XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw1ID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAyMDA3XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw2ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMDlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDcgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAxMlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAxM1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTEgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxN1xuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTQgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxOFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTUgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAyMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuXG5cblxuXG4jIGV4cG9ydHMuYWxidW1zRGF0YSA9IFthbGJ1bU1vZGVsMCwgYWxidW1Nb2RlbDEsIGFsYnVtTW9kZWwyLCBhbGJ1bU1vZGVsMywgYWxidW1Nb2RlbDQsIGFsYnVtTW9kZWw1LCBhbGJ1bU1vZGVsNiwgYWxidW1Nb2RlbDcsIGFsYnVtTW9kZWw4LCBhbGJ1bU1vZGVsOSwgYWxidW1Nb2RlbDEwLCBhbGJ1bU1vZGVsMTEsIGFsYnVtTW9kZWwxMiwgYWxidW1Nb2RlbDEzLCBhbGJ1bU1vZGVsMTQsIGFsYnVtTW9kZWwxNV1cblxuXG5cbmNvbmZpZ0FsYnVtcyA9IGNvbmZpZyArIFwiL2FsYnVtcy9cIlxuIyBwcmludCBjb25maWdBbGJ1bXNcblxucmFuZG9tU291cmNlID0gW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiXVxuXG5cbmV4cG9ydHMuYWxidW1zRGF0YSA9IFt7dGl0bGU6XCLQmNC60YDQsFwiLHllYXI6MTk5Nix0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JTQvtC70Y8g0YDQuNGB0LrQsFwiLFwi0KjQsNC80LDQvNCw0L3Ri1wiLFwi0KHQuNCw0LzRgdC60LjQtSDRgdC10YDQtNGG0LBcIixcItCd0LUg0LfQstC10LfQtNCwXCIsXCLQlNC10LvRjNGE0LjQvdGLXCIsXCLQoNCw0L3QtdGC0LrQsFwiLFwi0J3QsCDRj9C00YtcIixcItCi0LDQuiDQvdCw0LTQvlwiLFwi0JDQu9C80LDQt9Cw0LzQuFwiLFwi0KHQuNCz0L3QsNC70YtcIixcItCc0LDQu9GM0YfQuNC6LdGB0L7Qu9C00LDRglwiLFwi0JPQvtC70L7QtFwiLFwi0KHQsNC50L7QvdCw0YDQsCDQtNC40YHQutCwXCIsXCLQlNCw0LvQtdC60L5cIl0sdGltZTpbXCIwMzo1N1wiLFwiMDM6MzRcIixcIjAzOjU2XCIsXCIwMzozMFwiLFwiMDQ6MzhcIixcIjAzOjE5XCIsXCIwMzoxMFwiLFwiMDM6NThcIixcIjA0OjE1XCIsXCIwNDoxN1wiLFwiMDQ6MzRcIixcIjA0OjQzXCIsXCIwMzo0N1wiLFwiMDY6MjNcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JzQvtGA0YHQutCw0Y9cIix5ZWFyOjE5OTcsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCS0LTRgNGD0LMg0YPRiNC70Lgg0L/QvtC10LfQtNCwXCIsXCLQlNC10LLQvtGH0LrQsFwiLFwi0KPRgtC10LrQsNC5XCIsXCLQnNC+0YDRgdC60LDRjyDQsdC+0LvQtdC30L3RjFwiLFwi0JLQu9Cw0LTQuNCy0L7RgdGC0L7QuiAyMDAwXCIsXCLQoNC+0LfQsCDQm9GO0LrRgdC10LzQsdGD0YDQs1wiLFwi0JrQvtGCINC60L7RgtCwICjQktC+0YIg0Lgg0LLRgdGPINC70Y7QsdC+0LLRjClcIixcItCX0LDQsdCw0LLRi1wiLFwi0KHQutC+0YDQvtGB0YLRjFwiLFwi0JLRgNC10LzRjyDRgtC10L/Qu9CwXCIsXCLQlNC10LvQsNC5INC80LXQvdGPINGC0L7Rh9C90L5cIixcItCS0YHQtdGG0LXQu9C+INCy0YHQtdC8XCIsXCLQktC+0YHQv9C40YLQsNC90L3QuNC6INGD0L/QsNCy0YjQtdC5INC30LLQtdC30LTRi1wiLFwi0J3QvtCy0LDRjyDQu9GD0L3QsCDQsNC/0YDQtdC70Y9cIl0sdGltZTpbXCIwMzo1MFwiLFwiMDM6MjNcIixcIjAyOjE4XCIsXCIwNDo0MVwiLFwiMDI6MzhcIixcIjAyOjIyXCIsXCIwMzowOFwiLFwiMDI6MzNcIixcIjAzOjUyXCIsXCIwMzowN1wiLFwiMDI6NTdcIixcIjAzOjUyXCIsXCIwNDoyOFwiLFwiMDI6NTlcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KjQsNC80L7RgNCwXCIseWVhcjoxOTk4LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQkNC70LvQviwg0L/QvtC/0YEhXCIsXCLQo9C70YzRgtC40LzQsNGC0YPQvFwiLFwi0J3QvtCy0LDRjyDQu9GD0L3QsCDQsNC/0YDQtdC70Y9cIixcItCa0LDRgdGB0LXRgtC90YvQuSDQvNCw0LvRjNGH0LjQulwiLFwi0JjQvdC+0L/Qu9Cw0L3QtdGC0L3Ri9C5INCz0L7RgdGC0YxcIixcItCU0LXQstGD0YjQutC4INGN0LzQsNC90YHQuNC/0Y1cIixcItCS0LXRh9C10YDQvdC40Lkg0YfQsNC5XCIsXCLQkdC40YIg0LHRg9C8XCIsXCLQm9GD0L3QvdGL0LUg0LTQtdCy0LjRhtGLXCIsXCLQn9Cw0YDQulwiLFwi0KHQsNC50L7QvdCw0YDQsCDQtNC40YHQutCwXCIsXCLQp9GR0YDQvdCw0Y8g0LTRi9GA0LBcIixcItCSINC00YPQvNCw0YUg0L4g0LTQtdCy0YPRiNC60LUg0LjQtyDQs9C+0YDQvtC00LAg0YbQtdC90YLRgNCw0LvRjNC90L7Qs9C+INC/0L7QtNGH0LjQvdC10L3QuNGPINCa0J3QoFwiLFwi0JTQtdC70LDQuSDQvNC10L3RjyDRgtC+0YfQvdC+XCIsXCLQotCw0Log0YHRgtGA0LDRiNC90L5cIixcItCS0YHQtdGG0LXQu9C+INCy0YHQtdC8XCIsXCLQnNCw0LvRjNGH0LjQui3RgdC+0LvQtNCw0YJcIixcItCS0L7RgdC/0LjRgtCw0L3QvdC40Log0YPQv9Cw0LLRiNC10Lkg0LfQstC10LfQtNGLXCIsXCLQm9C+0LbQuNGB0YwsINC/0L7QtNC/0L7Qu9C60L7QstC90LjQuiFcIixcItCU0LXQu9Cw0Lkg0K4t0K5cIixcItCR0LvRg9C00LvQuNCy0YvQtSDQutC+0YLRi1wiLFwi0J/QvtGB0LjQtNC10LvQutC4LdC/0L7QtNCz0LvRj9C00LXQu9C60LhcIixcItCU0LDQu9C10LrQvlwiLFwi0K3RhdC+0Lwg0LPQvtC90LPQsFwiXSx0aW1lOltcIjAyOjE2XCIsXCIwMzo0MlwiLFwiMDI6NTlcIixcIjAzOjUyXCIsXCIwMzo1MVwiLFwiMDI6MzFcIixcIjAzOjQyXCIsXCIwMjoxN1wiLFwiMDM6MjhcIixcIjAyOjM3XCIsXCIwMzo0N1wiLFwiMDM6NDlcIixcIjAzOjAzXCIsXCIwMjo1N1wiLFwiMDM6NTFcIixcIjAzOjUyXCIsXCIwNDozNVwiLFwiMDQ6MzBcIixcIjAzOjEyXCIsXCIwMzo0NVwiLFwiMDM6MjZcIixcIjAzOjMyXCIsXCIwNToxMlwiLFwiMDQ6MjVcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KLQvtGH0L3QviDQoNGC0YPRgtGMINCQ0LvQvtGNXCIseWVhcjoyMDAwLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQmtCw0YDQvdCw0LLQsNC70LAu0L3QtdGCXCIsXCLQndC1INC+0YfQtdC90YxcIixcItCh0LrQvtGA0LXQtSDQuCDQsdGL0YHRgtGA0L5cIixcItCc0L7RjyDQv9C10LLQuNGG0LBcIixcItCh0LXQstC10YDQvdGL0Lkg0L/QvtC70Y7RgVwiLFwi0J3QtdCy0LXRgdGC0LA/XCIsXCLQltCw0LHRgNGLXCIsXCLQmtC70YPQsdC90LjRh9C90LDRj1wiLFwi0KHQvdGLXCIsXCLQkdC10Lcg0L7QsdC80LDQvdCwXCIsXCLQldC80YMg0L3QtSDQstC30Y/RgtGMINGC0LXQsdGPXCIsXCLQotC40YjQtVwiLFwi0KHQu9GD0YfQsNC50L3QvtGB0YLQuFwiXSx0aW1lOltcIjAzOjEwXCIsXCIwMzo1OFwiLFwiMDM6MDZcIixcIjA0OjA5XCIsXCIwMzo0MFwiLFwiMDM6NTZcIixcIjAzOjMyXCIsXCIwMjozN1wiLFwiMDM6NThcIixcIjAzOjIzXCIsXCIwNDo1MFwiLFwiMDM6MDBcIixcIjAzOjMzXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjMuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCc0LXQsNC80YPRgNGLXCIseWVhcjoyMDAyLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQkiDRgNC10LnRgVwiLFwi0J3QsCDRg9C00LDRh9GDXCIsXCLQrdGC0L4g0L/QviDQu9GO0LHQstC4XCIsXCLQk9C70YPQsdC20LVcIixcItCc0L7RgNGB0LrQsNGPINC60LDQv9GD0YHRgtCwXCIsXCLQn9C70Y7RgSAyOFwiLFwi0JTQvtCx0YDQvtC1INGD0YLRgNC+LCDQv9C70LDQvdC10YLQsCFcIixcItCh0YLQtdC60LvQsFwiLFwi0J3QtdC00L7Qv9C+0L3QuNC80LDRjtGJ0LDRj1wiLFwi0JfQvdCw0LrQvtC80YvQvCDRgdGC0L7Qu9C40YfQvdGL0LxcIixcItCe0LHQtdGJ0LDQvdC40Y9cIixcItCt0YLQviDQv9C+INC70Y7QsdCy0LhcIl0sdGltZTpbXCIwNDowOVwiLFwiMDM6NTRcIixcIjAyOjU0XCIsXCIwNDowM1wiLFwiMDI6MjhcIixcIjA0OjM5XCIsXCIwMzoyOVwiLFwiMDM6NDdcIixcIjA0OjA3XCIsXCIwNDozNVwiLFwiMDM6NTdcIixcIjAzOjQ3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjQuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cblxue3RpdGxlOlwi0J/QvtGF0LjRgtC40YLQtdC70Lgg0LrQvdC40LNcIix5ZWFyOjIwMDQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCi0LDQutC40LUg0LTQtdCy0YfQvtC90LrQuFwiLFwi0KTQu9Cw0LzQtdC90LrQviDQmtGA0LDRgdC+0YLQutC4INGHLiAyXCIsXCLQpNC70LDQvNC10L3QutC+INCa0YDQsNGB0L7RgtC60Lgg0YcuIDFcIixcItCT0LTQtSDRgtCw0LrQvtC5INGPP1wiLFwi0KLQstC+0Y8g0LvQtdGC0L3Rj9GPXCIsXCLQl9C+0LvQvtGC0YvQtSDQstC+0YDQvtGC0LBcIixcItCS0L7QtNC+0L/QsNC00Ysg0YHQu9C10LdcIixcItCX0LXQu9C10L3Ri9C5IHJvY2tzXCIsXCLQl9C10LvQtdC90YvQuSByb2Nrc1wiLFwi0JzQtdC00LLQtdC00LjRhtCwXCIsXCLQkdC+0LrRgdC10YDRgdC60LjQuSDQstCw0LvRjNGBINGHLiAyIFxcXCLQmtCw0YDQsNC80LXQu9GMXFxcIlwiLFwi0JHQvtC60YHQtdGA0YHQutC40Lkg0LLQsNC70YzRgVwiLFwi0JHQvtC60YHQtdGA0YHQutC40LkgRnVua3kg0LLQsNC70YzRgVwiLFwi0KLQsNC60LjQtSDQtNC10LLRh9C+0L3QutC4XCIsXCLQnNC10LTQstC10LTQuNGG0LAgQmVzdG9sb2NoIE1peFwiXSx0aW1lOltcIjA0OjM4XCIsXCIzNlwiLFwiMDE6MDNcIixcIjA2OjM1XCIsXCIwMjo1NVwiLFwiMDM6NTdcIixcIjAzOjU0XCIsXCI1NFwiLFwiMDM6MThcIixcIjAzOjU0XCIsXCIwMTozM1wiLFwiMDI6MzhcIixcIjA0OjUwXCIsXCIwNDo1OVwiLFwiMDQ6MDFcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KHQu9C40Y/QvdC40LUg0Lgg0L/QvtCz0LvQvtGJ0LXQvdC40LVcIix5ZWFyOjIwMDUsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCY0L3RgtGA0L5cIixcItCf0YDQvtGB0YLQuCwg0JrQuNGB0LrQsCFcIixcItCR0LDQvdC30LDQuVwiLFwi0KXQuNGJ0L3QuNC6XCIsXCLQodGC0YDQsNGF0YMg0L3QtdGCXCIsXCLQmtC+0YDQsNC70LvRi1wiLFwi0J/RgNC40LLQsNGC0LjQt9Cw0YbQuNGPXCIsXCLQotCw0LrQsdGL0LLQsNC10YLQvdC10YHQu9GD0YfQsNC50L3QvlwiLFwi0K/QvdGC0LDRgNGMXCIsXCLQmNGA0LjRgVwiLFwi0J3QtdC/0L7QutC+0LlcIixcItCX0LTRgNCw0LLRgdGC0LLRg9C50LTQvtGB0LLQuNC00LDQvdC40Y9cIl0sdGltZTpbXCIwMjo1NFwiLFwiMDU6MTFcIixcIjAyOjUwXCIsXCIwMzo1NFwiLFwiMDM6MzBcIixcIjA0OjA3XCIsXCIwMzozMVwiLFwiMDQ6NDhcIixcIjAzOjU3XCIsXCIwMzoxNFwiLFwiMDI6NTFcIixcIjA0OjI0XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjYuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIkJlc3QgRErigJkncyBEYW5jZSBNaXggVm9sLlZJXCIseWVhcjoyMDA2LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQl9C00YDQsNCy0YHRgtCy0YPQudC00L7RgdCy0LjQtNCw0L3QuNGPXCIsXCLQodGC0YDQsNGF0YMg0L3QtdGCXCIsXCLQnNC10LTQstC10LTQuNGG0LAgfCBEaiBJdmFuIFNjcmF0Y2hpbidcIixcItCf0YDQvtGB0YLQuCwg0JrQuNGB0LrQsFwiLFwi0KEg0J3QvtCy0YvQvCDQk9C+0LTQvtC8LCDQmtGA0L7RiNC60LAhXCIsXCLQlNC10LLQvtGH0LrQsFwiLFwi0KHRgtGA0LDRhdGDINC90LXRglwiLFwi0KEg0J3QvtCy0YvQvCDQk9C+0LTQvtC8LCDQmtGA0L7RiNC60LAhXCIsXCJMYWR5IEFscGluZSBCbHVlIHwgRGogUmFtXCIsXCJMdWNreSBCcmlkZT9cIixcItCY0YDQuNGBXCIsXCLQndC10LLQtdGB0YLQsD9cIixcItCU0LXQu9GM0YTQuNC90YtcIixcItCY0LTQuCwg0Y8g0LHRg9C00YNcIixcItChINCd0L7QstGL0Lwg0JPQvtC00L7QvCwg0JrRgNC+0YjQutCwIVwiLFwi0J3QtdC/0L7QutC+0LlcIl0sdGltZTpbXCIwNTowN1wiLFwiMDU6MDJcIixcIjA1OjU4XCIsXCIwMjo0MVwiLFwiMDQ6MDBcIixcIjAzOjE5XCIsXCIwMjo0M1wiLFwiMDU6MDhcIixcIjA0OjUyXCIsXCIwMzo1OVwiLFwiMDQ6MDdcIixcIjAzOjEzXCIsXCIwNDoxOFwiLFwiMDQ6MjlcIixcIjA0OjUyXCIsXCIwMjo0OVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI3LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCI4XCIseWVhcjoyMDA4LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQl9Cw0L/Rg9GB0Log0YDQsNC60LXRgtC+0L/Qu9Cw0L3QsCBcXFwi0JjQvtGB0LjRhCDQodGC0LDQu9C40L1cXFwiINC90LAg0JvRg9C90YNcIixcItCt0LksINGC0L7QstCw0YDQuNGJXCIsXCLQmtC+0L3RgtGA0LDQsdCw0L3QtNGLXCIsXCLQn9GA0L7RgdC/0LDQu9C4XCIsXCLQnNGD0LfRi9C60LDQvdGCXCIsXCLQndCw0YjQtSDQstGA0LXQvNGPXCIsXCLQnNC+0LvQvtC00L7RgdGC0YxcIixcItCc0LXRgtC10LvRjFwiLFwi0JfQvtC70L7RgtC+INC4INC70LDQtNCw0L1cIixcItCSINGN0YLQvtC8INGB0LLQtdGC0LVcIixcItCc0LDQvNGLINC00L7Rh9C10YDQtdC5XCIsXCLQr9C00LXRgNC90YvQtSDRgdGC0LDQvdGG0LjQuFwiLFwi0J/RjNGP0L3QsNGPINGB0YLRgNGD0L3QsFwiLFwi0J4sINGA0LDQuSFcIixcItCb0LDQt9GD0YDQvdC+LdCx0LjRgNGO0LfQvtCy0YvQtVwiLFwi0J/QvtGB0L/QuCwg0YDQvtC6LdC9LdGA0L7Qu9C7XCIsXCLQkNC60LLQsNC70LDQvdCz0LhcIixcItCS0LXRgdC90LBcIixcItCd0L7RgNC80LDQu9GM0L3Ri9C5INCx0LjQt9C90LXRgVwiLFwi0KTQsNC90YLQsNGB0YLQuNC60LBcIixcItCa0YDRg9CzINC30LDQvNC60L3Rg9C70YHRj1wiXSx0aW1lOltcIjAxOjU3XCIsXCIwMzo0N1wiLFwiMDQ6MDBcIixcIjAzOjEwXCIsXCIwMzo0MlwiLFwiMDQ6NDdcIixcIjA0OjQ4XCIsXCIwMzo0NFwiLFwiMDQ6MjNcIixcIjA0OjU0XCIsXCIwNTozM1wiLFwiMDU6MTRcIixcIjAzOjU1XCIsXCIwNDowMFwiLFwiMDQ6MTVcIixcIjA0OjI3XCIsXCIwNTowMFwiLFwiMDU6MDBcIixcIjA0OjI4XCIsXCIwMzo0MlwiLFwiMDI6NTdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiQ29tcmFkZSBBbWJhc3NhZG9yXCIseWVhcjoyMDA5LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJNb3RoZXJzIEFuZCBEYXVnaHRlcnNcIixcIkhleSwgVG92YXJpc2hjaFwiLFwiV2UgT3ZlcnNsZXB0XCIsXCJNdXNpY2lhblwiLFwiTnVjbGVhciBTdGF0aW9uc1wiLFwiVmVub21vdXMgU3RhclwiLFwiSW4gT3VyIFdvcmxkXCIsXCJEcnVua2VuIFN0cmluZ1wiLFwiUXVlZW4gT2YgUm9ja1wiLFwiU25vd3N0b3JtXCIsXCJXaXRuZXNzZXNcIixcIlNsZWVwIFJvY2snbidSb2xsXCIsXCJCdXJuIEl0IEFsbFwiLFwiQ2FsaWZvcm5pYSBEcmVhbWluZ1wiXSx0aW1lOltcIjA1OjM1XCIsXCIwMzo0OFwiLFwiMDM6MDlcIixcIjAzOjQzXCIsXCIwNToxNFwiLFwiMDM6MDFcIixcIjA0OjU2XCIsXCIwMzo1NVwiLFwiMDM6MDhcIixcIjAzOjQ1XCIsXCIwMzowMlwiLFwiMDQ6MjdcIixcIjA2OjA3XCIsXCIwMzoxMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI5LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNC10LTQutC40LUg0LfQtdC80LvQuFwiLHllYXI6MjAxMCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JLQvtC50L3QsCDRh9C10LvQvtCy0LXRh9C60L7QslwiLFwi0KHQvNC+0LNcIixcItCS0LXRh9C10YBcIixcItCU0YDRg9Cz0LjQtSDQvNC10YHRgtCwXCIsXCLQnNCw0YHQu9C+XCIsXCLQm9GD0YfQuFwiLFwi0JTQtdCy0L7Rh9C60L7QtNGA0YPQs1wiLFwi0KjQsNC80L7RgNCwXCIsXCLQmNC00LgsINGPINCx0YPQtNGDXCIsXCLQndC10YIg0L3QtdGCINC90LXRglwiLFwi0J3QsNGA0LrQvtGC0LjQutCw0Lwg4oCTINC90LXRgiFcIixcItCh0LDRg9C90LTRgtGA0LXQulwiLFwi0J3QsCDQv9C10YDQtdC60YDQtdGB0YLQutCw0YUg0YHRg9C00YzQsdGLICjQodGC0LDQvdGMINGH0LXQu9C+0LLQtdC60L7QvClcIixcItChINCd0L7QstGL0Lwg0LPQvtC00L7QvCwg0LrRgNC+0YjQutCwIVwiXSx0aW1lOltcIjAzOjU4XCIsXCIwNDoxNVwiLFwiMDQ6MjRcIixcIjAzOjQ0XCIsXCIwMzo1OVwiLFwiMDQ6NTFcIixcIjAzOjQ4XCIsXCIwMzowN1wiLFwiMDU6NDNcIixcIjA0OjA4XCIsXCIwMzo0MVwiLFwiMDM6NTdcIixcIjAyOjM4XCIsXCIwNTowNVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JzRg9C80LjQutCw0Lwg0L7RgiDRgtGA0L7Qu9C70LjQutC+0LIuINCf0L7RgdC/0LgsINGA0L7Qui3QvS3RgNC+0LvQu1wiLHllYXI6MjAxMix0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0K3RgtC+INC/0L4g0LvRjtCx0LLQuFwiLFwi0J4sINGA0LDQuVwiLFwi0JTQtdC70YzRhNC40L3Ri1wiLFwi0KLQsNC60LjQtSDQtNC10LLRh9C+0L3QutC4XCIsXCLQotCw0Log0L3QsNC00L5cIixcItChINC90L7QstGL0Lwg0LPQvtC00L7QvCwg0LrRgNC+0YjQutCwXCIsXCLQndC10LLQtdGB0YLQsFwiLFwi0J3QvtCy0LDRjyDQu9GD0L3QsCDQsNC/0YDQtdC70Y9cIixcItCf0L7RgdC/0LgsINGA0L7Qui3QvS3RgNC+0LvQu1wiLFwi0JzQvtGPINC/0LXQstC40YbQsFwiLFwi0JfQsNCx0LDQstGLXCJdLHRpbWU6W1wiMDM6NDZcIixcIjAzOjA2XCIsXCIwNToxMVwiLFwiMDQ6MzhcIixcIjA0OjAxXCIsXCIwNDo1OFwiLFwiMDM6MThcIixcIjAzOjEyXCIsXCIwMzozNFwiLFwiMDQ6MjhcIixcIjAzOjMyXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjExLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQn9C40YDQsNGC0YHQutC40LUg0LrQvtC/0LjQuFwiLHllYXI6MjAxNSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0KEg0YfQuNGB0YLQvtCz0L4g0LvQuNGB0YLQsFwiLFwi0JzQtdC00LvQtdC90L3Ri9C1INGC0LDQvdGG0YtcIixcItCS0LjRgtCw0LzQuNC90YtcIixcItCf0LjRgNCw0YLRgdC60LjQtSDQutC+0L/QuNC4XCIsXCLQmtCw0LbQtdGC0YHRj1wiLFwi0JzQvtC70L3QuNGPXCIsXCLQl9C+0LvQvtGC0L7QtSDRgdC10YDQtNGG0LVcIixcItCf0L7RgdC70LXQtNC90LjQuSDQvtGC0L/Rg9GB0LrQvdC+0LlcIixcItCa0YPQutC70YtcIixcItCc0L7RiNC60LBcIixcItCT0LTQtSDQstGLLCDQtNC10LLQvtGH0LrQuFwiLFwi0JrRgtC+INCx0YPQtNC10YIg0YHQv9Cw0YHQsNGC0Ywg0YDQvtC6LdC9LdGA0L7Qu9C7XCIsXCLQqNGC0L7RgNC8XCIsXCLQndC+0Y/QsdGA0YxcIixcIjJuZCBXaW5kXCIsXCJGYWtlIGEgRmFrZVwiLFwiRG9scGhpbnNcIixcIjE5ODQgUGFydCBJSVwiLFwiSG9yb25nYnVsXCIsXCJXaXRjaFwiLFwiUG9sYXIgQmVhclwiLFwiUm91bmQgYW5kIFJvdW5kXCIsXCJPeSBPeSBPeVwiLFwiQ2hhLU1hLUNoYW0tQVwiLFwiWW91IENydXNoIG9uIE1lXCIsXCJJbiBUaGUgVmFsbGV5IG9mIEVhc2VcIixcIk1hZ2ljIFN0b25lXCIsXCJLdWFpenVva2FpXCJdLHRpbWU6W1wiMDM6NThcIixcIjA5OjAyXCIsXCIwNDoxN1wiLFwiMDY6MjhcIixcIjA0OjI3XCIsXCIwNDozMlwiLFwiMDM6MzRcIixcIjAzOjMyXCIsXCIwMjo1OFwiLFwiMDM6NDlcIixcIjA0OjQ4XCIsXCIwNDoxNlwiLFwiMDM6NDBcIixcIjA2OjAwXCIsXCIwNToxNVwiLFwiMDM6NDNcIixcIjA0OjQ2XCIsXCIwMzoxMVwiLFwiMDQ6NDRcIixcIjAzOjIyXCIsXCIwNDowMVwiLFwiMDM6NDVcIixcIjAzOjM0XCIsXCIwMzozMlwiLFwiMDM6NDNcIixcIjA4OjI3XCIsXCIwNjozOVwiLFwiMDM6NDhcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTIuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX1cblxuXVxuXG5cblxuXG4jIGV4cG9ydHMuZmF2TGlzdCA9IHtcbiMgXHRzb25nczogW1wiYWRcIl1cbiMgXHR0aW1lOiBbXCIxOjFcIl1cbiMgXHRhbGJ1bXM6IFszXVxuIyB9XG5leHBvcnRzLmZhdkxpc3QgPSB7XG5cdHNvbmdzOiBbXCLQktC70LDQtNC40LLQvtGB0YLQvtC6IDIwMDBcIiwgXCLQndC10LLQtdGB0YLQsD9cIiwgXCLQo9GC0LXQutCw0LlcIiwgXCLQnNC10LTQstC10LTQuNGG0L9cIiwgIFwi0K3RgtC+INC/0L4g0LvRjtCx0LLQuFwiLCBcItCX0LDQsdCw0LLRi1wiLCBcItCi0LDQutC40LUg0LTQtdCy0YfQvtC90LrQuFwiLCBcItCU0LXQstC+0YfQutCwXCIsIFwi0KTQsNC90YLQsNGB0YLQuNC60LBcIiwgXCLQlNC10LvRjNGE0LjQvdGLXCJdXG5cdHNvdXJjZTogcmFuZG9tU291cmNlXG5cblx0dGltZTogW1wiMzo0N1wiLCBcIjQ6MDlcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiXVxuXHRhbGJ1bXM6IFsxLCAzLCAxLCA1LCA0LCAxLCA1LCAxLCA5LCAwXVxufSIsImNvbmZpZyA9IFwiYXJ0aXN0cy9zcGxlYW5cIlxuZXhwb3J0cy5jb25maWcgPSBjb25maWdcblxuZ3JleXNfd2hpdGUgPSBcIiNGRkZGRkZcIlxuZ3JleXNfcHJlX3doaXRlID0gXCIjRjdGN0Y3XCJcbmdyZXlzX3VsdHJhX2xpZ2h0ID0gXCIjRUVFRUVFXCJcbmdyZXlzX2xpZ2h0ZXN0ID0gXCIjREREREREXCJcbmdyZXlzX2xpZ2h0ZXIgPSBcIiNDQ0NDQ0NcIlxuZ3JleXNfYmFzZSA9IFwiIzk5OTk5OVwiXG5ncmV5c19kYXJrZXIgPSBcIiM2NjY2NjZcIlxuZ3JleXNfZGFya2VzdCA9IFwiIzIyMjIyMlwiXG5ncmV5c19ibGFjayA9IFwiIzAwMDAwMFwiXG5cblxuZXhwb3J0cy5jb2xvclRoZW1lID0ge1xuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGhlYWRlci5wbmdcIlxuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yOiBcInJnYmEoMjQ0LDEyNCw1NCxcIlxuXHRuYXZpZ2F0aW9uX292ZXJsYXlfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBkYXJrZXIucG5nXCJcblx0IyBuYXZpZ2F0aW9uX2hlYWRlcl90ZXh0OiBcIiNGRkZGRkZcIlxuXHRcblx0bmF2aWdhdGlvbl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9iZy5wbmdcIlxuXHQjIG5hdmlnYXRpb25fc2hhZG93OiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX2JhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjA2KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX3RpbWVsaW5lOiBcIiM5OTlcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfcmFkaXVzOiBcImJsdXIoMTBweClcIlxuXHRuYXZpZ2F0aW9uX2JsdXJfY29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjYpXCJcblx0IyBuYXZpZ2F0aW9uX2NhcmRfb3ZlcmxheV9iYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIlxuXG5cblxuXHRwbGF5ZXJfYmFja2dyb3VuZDogXCJ3aGl0ZVwiXG5cdHBsYXllcl9wcm9ncmVzc19iYXNlOiBcIiNDQ0NcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfZmlsbGVkOiBcIiNGRjgwMTJcIlxuXHRwbGF5ZXJfc29uZ190aXRsZTogXCJibGFja1wiXG5cdHBsYXllcl9hbGJ1bV90aXRsZTogXCIjNjY2XCJcblx0XG5cdHBsYXllcl9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0cGxheWVyX3NoYWRvd195OiAtOFxuXHRwbGF5ZXJfc2hhZG93X2JsdXI6IDIwXG5cblxuXG5cdGNhcmRfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC4yKVwiXG5cdGNhcmRfc2hhZG93X3k6IDBcblx0Y2FyZF9zaGFkb3dfYmx1cjogMjBcblx0XG5cdCMgRGV0YWlsZWQgQWxidW1cblx0ZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZDogXCJ3aGl0ZVwiXG5cdGRldGFpbGVkX2FsYnVtX3RpdGxlOiBcImJsYWNrXCJcblx0ZGV0YWlsZWRfYWxidW1feWVhcjogXCIjNjY2XCJcblx0ZmF2X3NvbmdzX3RpdGxlOiBcIiM5OTlcIlxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bSBTb25nXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGU6IFwiIzAwMFwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfbnVtYmVyOiBcIiM2NjZcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWU6IFwiIzY2NlwiXG5cbn1cblxuXG5cblxuXG5uZXdzTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8wLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMC5qcGdcIlxufVxuXG5uZXdzTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMS5qcGdcIlxufVxuXG5uZXdzTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzIuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMi5qcGdcIlxufVxuXG5uZXdzTW9kZWwzID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8zLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzMuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMy5qcGdcIlxufVxuXG5uZXdzTW9kZWw0ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC80LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzQuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNC5qcGdcIlxufVxuXG5uZXdzTW9kZWw1ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC81LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzUuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNS5qcGdcIlxufVxuXG5uZXdzTW9kZWw2ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzYuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNi5qcGdcIlxufVxuXG5uZXdzTW9kZWw3ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC83LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzcuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNy5qcGdcIlxufVxuXG5uZXdzTW9kZWw4ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC84LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzguanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOC5qcGdcIlxufVxuXG5uZXdzTW9kZWw5ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzkuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOS5qcGdcIlxufVxuXG5uZXdzTW9kZWwxMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMTAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMTAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMTAuanBnXCJcbn1cblxuZXhwb3J0cy5mZWVkRGF0YSA9IFtuZXdzTW9kZWwwLCBuZXdzTW9kZWwxLCBuZXdzTW9kZWwyLCBuZXdzTW9kZWwzLCBuZXdzTW9kZWw0LCBuZXdzTW9kZWw1LCBuZXdzTW9kZWw2LCBuZXdzTW9kZWw3LCBuZXdzTW9kZWw4LCBuZXdzTW9kZWw5LCBuZXdzTW9kZWwxMF1cblxuXG5cblxuXG5cblxuXG5cbnZpZGVvTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzAucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzEucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cbnZpZGVvTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3ByZXZpZXdzLzIucG5nXCJcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG59XG5cblxuXG5wbGF5bGlzdDAgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzAucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzAucG5nXCJcbn1cblxucGxheWxpc3QxID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8xLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8xLnBuZ1wiXG59XG5cbmV4cG9ydHMucGxheWxpc3RzRGF0YSA9IFtwbGF5bGlzdDAsIHBsYXlsaXN0MV1cbmV4cG9ydHMubW92aWVzRGF0YSA9IFt2aWRlb01vZGVsMCwgdmlkZW9Nb2RlbDEsIHZpZGVvTW9kZWwyXVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyBHZXR0aW5nIERhdGFcblxuY29uZmlnID0gXCJhcnRpc3RzL3NwbGVhblwiXG5cbiMgYWxidW1Nb2RlbDAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDE5OTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDE5OTVcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMTk5OVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA1XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAyMDA2XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw1ID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAyMDA3XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw2ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMDlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDcgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAxMlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsOSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAxM1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTAgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTEgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTIgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxN1xuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTQgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAxOFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMTUgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAyMFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuXG5cblxuXG4jIGV4cG9ydHMuYWxidW1zRGF0YSA9IFthbGJ1bU1vZGVsMCwgYWxidW1Nb2RlbDEsIGFsYnVtTW9kZWwyLCBhbGJ1bU1vZGVsMywgYWxidW1Nb2RlbDQsIGFsYnVtTW9kZWw1LCBhbGJ1bU1vZGVsNiwgYWxidW1Nb2RlbDcsIGFsYnVtTW9kZWw4LCBhbGJ1bU1vZGVsOSwgYWxidW1Nb2RlbDEwLCBhbGJ1bU1vZGVsMTEsIGFsYnVtTW9kZWwxMiwgYWxidW1Nb2RlbDEzLCBhbGJ1bU1vZGVsMTQsIGFsYnVtTW9kZWwxNV1cblxuXG5cbmNvbmZpZ0FsYnVtcyA9IGNvbmZpZyArIFwiL2FsYnVtcy9cIlxuXG5yYW5kb21Tb3VyY2UgPSBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCJdXG5cblxuZXhwb3J0cy5hbGJ1bXNEYXRhID0gW3t0aXRsZTpcItCf0YvQu9GM0L3QsNGPINCx0YvQu9GMXCIseWVhcjoxOTk0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQltC10YDRgtCy0LAg0YLQsNC70L7Qs9C+INC70YzQtNCwXCIsXCLQpdC+0LvQvtC00L3Ri9C1INC30LjQvNGLXCIsXCLQnNC90LUg0YHQutCw0LfQsNC70Lgg0YHQu9C+0LLQvlwiLFwi0J/QvtC0INGB0YPRgNC00LjQvdC60YNcIixcItCT0YDQvtC30LBcIixcItCS0L7QudC90LBcIixcItCf0YvQu9GM0L3QsNGPINCx0YvQu9GMLiDQodC60LDQt9C60LBcIixcItCh0LXRgNC10LHRgNGP0L3Ri9C1INGA0LXQutC4XCIsXCLQotCy0L7QtSDRgNCw0LfQsdC40YLQvtC1INC/0LXQvdGB0L3QtVwiLFwi0KHQutCw0LfQvtGH0L3Ri9C5INC70LXRiNC40LlcIixcItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCz0YHQutC+0LUg0L3QtdCx0L5cIixcItCX0LLQtdGA0LhcIixcItCg0YvQsdCwINCx0LXQtyDRgtGA0YPRgdC+0LJcIl0sdGltZTpbXCIwNjowMVwiLFwiMDE6MzFcIixcIjAzOjA4XCIsXCIwMzoyNlwiLFwiMDM6NDRcIixcIjAyOjMwXCIsXCIwNToyMFwiLFwiMDI6NTJcIixcIjAxOjIzXCIsXCIwMTo0MlwiLFwiMDI6MjlcIixcIjAyOjM2XCIsXCIwMzowNFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIwLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQmtC+0LvQu9C10LrRhtC40L7QvdC10YAg0L7RgNGD0LbQuNGPXCIseWVhcjoxOTk1LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQkdGD0LTRjCDQvNC+0LXQuSDRgtC10L3RjNGOXCIsXCLQm9GO0LHQvtCy0Ywg0LjQtNC10YIg0L/QviDQv9GA0L7QstC+0LTQsNC8XCIsXCLQp9C10YDQvdGL0Lkg0YbQstC10YIg0YHQvtC70L3RhtCwXCIsXCLQodCw0LzQvtCy0LDRgFwiLFwi0JbQtdGA0YLQstCwINGC0LDQu9C+0LPQviDQu9GM0LTQsFwiLFwi0KfRgtC+INGC0Ysg0LHRg9C00LXRiNGMINC00LXQu9Cw0YLRjFwiLFwi0KDRi9Cx0LAg0LHQtdC3INGC0YDRg9GB0L7QslwiLFwi0J/Ri9C70YzQvdCw0Y8g0LHRi9C70YwuINCh0LrQsNC30LrQsFwiLFwi0J3QtdGH0LXQs9C+INC00LXQu9Cw0YLRjCDQstC90YPRgtGA0LhcIixcItCY0LTQuCDRh9C10YDQtdC3INC70LXRgVwiXSx0aW1lOltcIjA1OjQxXCIsXCIwNDoyNFwiLFwiMDc6NDdcIixcIjA1OjMxXCIsXCIwNTo0NlwiLFwiMDU6MDlcIixcIjAzOjA5XCIsXCIwNTozNVwiLFwiMDM6MjZcIixcIjA2OjMyXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCk0L7QvdCw0YDRjCDQv9C+0LQg0LPQu9Cw0LfQvtC8XCIseWVhcjoxOTk3LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQnNC+0LvQuNGC0LLQsFwiLFwi0K8g0L3QtSDRhdC+0YfRgyDQtNC+0LzQvtC5XCIsXCLQkdC+0L3QvdC4INC4INCa0LvQsNC50LRcIixcItCi0YDQuCDRhtCy0LXRgtCwICjQn9C10YDQstGL0Lkg0YHQvdC10LMpXCIsXCLQndC10LLRgdC60LjQuSDQv9GA0L7RgdC/0LXQutGCXCIsXCLQodC/0Lgg0LIg0LfQsNCx0YDQvtGI0LXQvdC90L7QvCDQtNC+0LzQtVwiLFwi0J/RgNC40YDQvtC20LTQtdC90L3Ri9C5INGD0LHQuNC50YbQsFwiLFwi0KfQsNGB0YLRg9GI0LrQuFwiLFwi0JzQvtGPINC70Y7QsdC+0LLRjFwiLFwi0JDQvdCz0LvQvi3RgNGD0YHRgdC60LjQuSDRgdC70L7QstCw0YDRjCAo0JTQsNCy0LDQuSwg0JvQsNC80LApXCIsXCLQodC60L7RgNC+INCx0YPQtNC10YIg0YHQvtC70L3QtdGH0L3QvlwiLFwi0JfQsCDRgdGC0LXQvdC+0LlcIl0sdGltZTpbXCIzMlwiLFwiMDM6NDlcIixcIjAyOjQwXCIsXCIwNDo0MFwiLFwiMDU6MTJcIixcIjA0OjE3XCIsXCIwMzoyMVwiLFwiMDQ6NDRcIixcIjAzOjM2XCIsXCIwNDozNlwiLFwiMDQ6NDJcIixcIjAxOjI3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjIuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCT0YDQsNC90LDRgtC+0LLRi9C5INCw0LvRjNCx0L7QvFwiLHllYXI6MTk5OCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JLQtdGB0Ywg0Y3RgtC+0YIg0LHRgNC10LRcIixcItCU0L7RgdGC0LDQvdGMINCz0YDQsNC90LDRgtGDXCIsXCLQntGA0LHQuNGCINCx0LXQtyDRgdCw0YXQsNGA0LBcIixcItCf0YDQuNGF0L7QtNC4XCIsXCLQodCy0LXRgiDQs9C+0YDQtdC7INCy0YHRjiDQvdC+0YfRjFwiLFwi0JvRjtGB0Y8g0YHQuNC00LjRgiDQtNC+0LzQsFwiLFwi0JHQvtCzINGD0YHRgtCw0Lsg0L3QsNGBINC70Y7QsdC40YLRjFwiLFwi0JrQsNGC0LjRgdGMLCDQutC+0LvQtdGB0L4hXCIsXCLQktGL0YXQvtC00LAg0L3QtdGCXCIsXCLQmtC+0LrRgtC10LnQu9C4INGC0YDQtdGC0YzQtdC5INC80LjRgNC+0LLQvtC5XCIsXCLQlNC20LjQvFwiLFwi0JzQsNGA0LjRjyDQuCDQpdGD0LDQvdCwXCIsXCLQn9C+0LTQstC+0LTQvdCw0Y8g0LvQvtC00LrQsFwiXSx0aW1lOltcIjAzOjA2XCIsXCIwNDoxMFwiLFwiMDI6MTdcIixcIjA0OjAyXCIsXCIwMjozMFwiLFwiMDM6NTdcIixcIjAyOjMyXCIsXCIwMjo0N1wiLFwiMDM6NDdcIixcIjAyOjUyXCIsXCIwMjo0N1wiLFwiMDg6MDNcIixcIjAzOjQzXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjMuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCQ0LvRjNGC0LDQstC40YHRgtCwXCIseWVhcjoxOTk5LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQkNC70YzRgtCw0LLQuNGB0YLQsFwiLFwi0JzQvtC70L7QutC+INC4INC80ZHQtFwiLFwi0J/QuNC7LdC60YPRgNC40LtcIixcItCi0LXRgNC/0YHQuNGF0L7RgNCwXCIsXCLQlNCw0LvQtdC60L4g0LTQvtC80L7QuVwiLFwi0JDQsdGB0LXQvdGCXCIsXCLQlNC+0LHRgNGL0YUg0LTQtdC7INC80LDRgdGC0LXRgFwiLFwi0JzQvtGC0L7RhtC40LrQu9C10YLQvdCw0Y8g0YbQtdC/0YxcIixcItCh0YPQvNCw0YHRiNC10LTRiNC40Lkg0LDQstGC0L7QsdGD0YFcIixcItCQ0LvQutC+0LPQvtC70YxcIixcItCS0YHRgtGA0LXRgtC40LzRgdGPINC30LDQstGC0YDQsFwiLFwi0JzQvtC70L7QutC+INC4INC80ZHQtFwiXSx0aW1lOltcIjA2OjA2XCIsXCIwNDozOVwiLFwiMDQ6NTNcIixcIjAyOjQ3XCIsXCIwMzo1N1wiLFwiMDE6NTRcIixcIjA0OjU1XCIsXCIwNDoxNVwiLFwiMDM6NTBcIixcIjA1OjI1XCIsXCIwNDoyN1wiLFwiMDU6MDNcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiMjUt0Lkg0LrQsNC00YBcIix5ZWFyOjIwMDEsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCb0LjQvdC40Y8g0LbQuNC30L3QuFwiLFwi0JfQstC10LfQtNCwINGA0L7Qui3QvS3RgNC+0LvQu9CwXCIsXCLQktGB0LXQs9C+INGF0L7RgNC+0YjQtdCz0L5cIixcItCc0L7RkSDRgdC10YDQtNGG0LVcIixcItCg0LjQutC4LdCi0LjQutC4LdCi0LDQstC4XCIsXCJTT1MhXCIsXCJGZWxsaW5pXCIsXCLQntGB0YLQsNC10LzRgdGPINC30LjQvNC+0LLQsNGC0YxcIixcItCi0LXQsdC1INGN0YLQviDRgdC90LjRgtGB0Y9cIixcItCh0L7QstGB0LXQvCDQtNGA0YPQs9C+0LlcIixcItCf0LvQsNGB0YLQvNCw0YHRgdC+0LLQsNGPINC20LjQt9C90YxcIixcItCf0L7QuSDQvNC90LUg0LXRidGRXCIsXCLQm9C10L3QuNC90LPRgNCw0LQgLSBBbXN0ZXJkYW1cIixcIkZpbmVcIl0sdGltZTpbXCIwMzowMFwiLFwiMDQ6MTBcIixcIjAyOjU5XCIsXCIwNDowOVwiLFwiMDE6NThcIixcIjA0OjI2XCIsXCIwNDo0NFwiLFwiMDM6MzhcIixcIjA0OjU4XCIsXCIwMjowOFwiLFwiMDI6MjVcIixcIjAzOjU1XCIsXCIwMjozNlwiLFwiMjlcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0J3QvtCy0YvQtSDQu9GO0LTQuFwiLHllYXI6MjAwMyx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0J3QvtCy0YvQtSDQu9GO0LTQuFwiLFwi0JLRgNC10LzRjywg0J3QsNC30LDQtCFcIixcItCT0LDQvdC00LHQvtC7XCIsXCLQodC70L7QvNCw0L3QviDQktGB0LVcIixcItCU0LXQstGP0YLQuNGN0YLQsNC20L3Ri9C5INC00L7QvFwiLFwi0JHQu9C+0LrQsNC00LBcIixcItCS0LDQu9C00LDQuVwiLFwi0JnQvtCzINCh0L/QvtC60L7QtdC9XCIsXCLQodC10LLQtdGA0L4t0JfQsNC/0LDQtFwiLFwi0KDQrdCfICjQndC10YDQstC90L7QtSDQodC10YDQtNGG0LUpXCIsXCLQkNC70YzRgtCw0LLQuNGB0YLQsCAo0JTRgNGD0LPQsNGPINCi0L7Rh9C60LAg0JfRgNC10L3QuNGPKVwiXSx0aW1lOltcIjAzOjQ0XCIsXCIwNDoxMlwiLFwiMDI6MzVcIixcIjA0OjE2XCIsXCIwNDozMFwiLFwiMDM6MjJcIixcIjA0OjI3XCIsXCIwMjo1NlwiLFwiMDM6NTNcIixcIjAzOjE0XCIsXCIwNDowN1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI2LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINGF0YDQvtC90LjQutCwINGB0L7QsdGL0YLQuNC5XCIseWVhcjoyMDA0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQntC60LXQsNC9XCIsXCLQodC10LzRjCDQstC+0YHRjNC80YvRhVwiLFwi0KjQsNGC0L4g0JzQsNGA0LPQvlwiLFwi0JzRiyDRgdC40LTQtdC70Lgg0Lgg0LrRg9GA0LjQu9C4XCIsXCLQodC40LDQvdGD0LrQstC40LvRjFwiLFwi0KfQtdC70L7QstC10Log0Lgg0JTQtdGA0LXQstC+XCIsXCLQm9Cw0LHQuNGA0LjQvdGCXCIsXCLQqNCw0LPQuFwiLFwi0JHQtdGA0LjQu9C70LjQuVwiLFwi0J/QsNGA0L7QstC+0LdcIixcItCb0Y7QtNC4INC90LAg0LvQsNC00L7QvdC4XCIsXCLQo9GA0L7QuiDQs9C10L7Qs9GA0LDRhNC40LhcIixcItCS0YHRkSDQstC60LvRjtGH0LXQvdC+XCIsXCLQk9C+0LvQvtGBINC30LAg0LrQsNC00YDQvtC8XCIsXCLQoNC+0LzQsNC90YFcIl0sdGltZTpbXCIzNlwiLFwiMDQ6MjJcIixcIjAzOjU0XCIsXCIwMzoxOVwiLFwiMDI6MzJcIixcIjAyOjE2XCIsXCIwNDo0OFwiLFwiMDE6MjlcIixcIjAzOjMxXCIsXCI1M1wiLFwiMDI6MDFcIixcIjA0OjU5XCIsXCIwMzoyMFwiLFwiMDE6MDhcIixcIjAzOjI3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjcuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIix5ZWFyOjIwMDcsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCc0LXQu9GM0LrQvdGD0LvQsCDRh9GM0Y8t0YLQviDRgtC10L3RjFwiLFwi0KHQutCw0LbQuFwiLFwi0JzQsNGC0YdcIixcItCd0LAg0YHRh9Cw0YHRgtGM0LVcIixcItCS0L7Qu9C90LBcIixcItCb0LXQv9C10YHRgtC+0LpcIixcItCY0LzQv9C10YDQsNGC0L7RgFwiLFwi0JHQtdGC0YXQvtCy0LXQvVwiLFwi0JzQsNGP0LpcIixcItCf0YDQsNC30LTQvdC40LpcIixcItCh0YPRhdCw0YDQuCDQuCDRgdGD0YjQutC4XCIsXCLQnNC+0LHQuNC70YzQvdGL0LlcIixcItCa0L7Qu9C+0LrQvtC7XCIsXCLQn9GA0L7QsdC60LhcIixcItCc0LDQvNC80LAg0LzQuNGPXCIsXCLQn9GA0L7Rh9GMXCIsXCLQodGL0L1cIl0sdGltZTpbXCIwMzoxNlwiLFwiMDM6MTJcIixcIjAyOjUxXCIsXCIwMjo0NFwiLFwiMDM6MjlcIixcIjAzOjM4XCIsXCIwMToxNVwiLFwiMDI6NDRcIixcIjAzOjQ5XCIsXCIwMjoyMVwiLFwiMDU6MzFcIixcIjAzOjI1XCIsXCIwMzo0MFwiLFwiMDQ6MDNcIixcIjAzOjAxXCIsXCIwMzoyMFwiLFwiMDE6NTFcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KHQuNCz0L3QsNC7INC40Lcg0LrQvtGB0LzQvtGB0LBcIix5ZWFyOjIwMDksdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCd0LDRgdGC0YDQvtC50LrQsCDQt9Cy0YPQutCwXCIsXCLQlNGL0YjQuCDQu9C10LPQutC+XCIsXCLQlNC+0LHRgNC+INC/0L7QttCw0LvQvtCy0LDRgtGMXCIsXCLQkdC+0LvRjNGI0LUg0L3QuNC60LDQutC+0LPQviDRgNC+0Lot0L0t0YDQvtC70LvQsFwiLFwi0JLQvdC40Lcg0LPQvtC70L7QstC+0LlcIixcItCn0LXRgNC00LDQulwiLFwi0JfQtdC70LXQvdCw0Y8g0L/QtdGB0L3Rj1wiLFwi0JrQsNC80LXQvdGMXCIsXCIzMDA3XCIsXCLQkdC10Lcg0YLQvtGA0LzQvtC30L7QslwiLFwi0JrQvtGA0LDQsdC70Ywg0LbQtNC10YIhXCIsXCLQp9C10LvQvtCy0LXQuiDQvdC1INGB0L/QsNC7XCIsXCLQmtC+0LLRh9C10LNcIixcItCS0YvQv9GD0YHRgtC4INC80LXQvdGPINC+0YLRgdGO0LTQsFwiLFwi0J/QuNGB0YzQvNC+XCIsXCLQktGB0LUg0YLQsNC6INGB0YLRgNCw0L3QvdC+XCIsXCLQktCw0LvRjNGBXCIsXCLQlNC+INCy0YHRgtGA0LXRh9C4XCJdLHRpbWU6W1wiMDI6NDBcIixcIjAzOjUzXCIsXCIwNDoxMVwiLFwiMDQ6MTJcIixcIjAzOjA1XCIsXCIwNDowN1wiLFwiMDM6MzBcIixcIjA0OjU5XCIsXCIwMjoxMVwiLFwiMDM6MTRcIixcIjAyOjQ0XCIsXCIwMjo1MlwiLFwiMDM6MzJcIixcIjAzOjExXCIsXCIwMjoyOVwiLFwiMDI6MDNcIixcIjAzOjA3XCIsXCIwNDoyMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI5LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQntCx0LzQsNC9INC30YDQtdC90LjRj1wiLHllYXI6MjAxMix0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0KPQstC10YDRgtGO0YDQsFwiLFwi0JvQtdGC0LXQu9CwINC20LjQt9C90YxcIixcItCn0ZHRgNC90LDRjyDQktC+0LvQs9CwXCIsXCLQm9C10YHRgtC90LjRhtCwXCIsXCLQodGC0YDQsNGI0L3QsNGPINGC0LDQudC90LBcIixcItCf0LXRgtC10YDQsdGD0YDQs9GB0LrQsNGPINGB0LLQsNC00YzQsdCwXCIsXCLQlNC+0YfRjCDRgdCw0LzRg9GA0LDRj1wiLFwi0KTQuNCx0L7QvdCw0YfRh9C4XCIsXCLQkiDQvNC40YDQtSDQuNC70LvRjtC30LjQuVwiLFwi0J/RgNCw0LfQtNC90LjQuiAo0JTRgNGD0LPQsNGPINGC0L7Rh9C60LAg0LfRgNC10L3QuNGPKVwiLFwi0JrQvtCy0YhcIixcItCh0L7Qu9C90YbQtSDQstC30L7QudC00ZHRglwiLFwi0KfRg9C00LDQulwiLFwi0JLQvtC70YjQtdCx0L3QvtC1INGB0LvQvtCy0L5cIl0sdGltZTpbXCIwMTo0NFwiLFwiMDI6MzBcIixcIjAyOjQ2XCIsXCIwMjoxOFwiLFwiMDI6MjRcIixcIjA0OjIwXCIsXCIwMzozNlwiLFwiMDM6MjdcIixcIjAyOjU4XCIsXCIwMjozOVwiLFwiMDM6MDFcIixcIjAzOjM1XCIsXCIwMjoyOVwiLFwiMDQ6MjRcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTAuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LXQt9C+0L3QsNC90YEuINCn0LDRgdGC0YwgMVwiLHllYXI6MjAxNCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JLRgdCw0LTQvdC40LpcIixcItCQ0Lkg0LvQvtCyINGOIVwiLFwi0KHRgtCw0YDRi9C5INC00L7QvFwiLFwi0JzQvtGA0L7QtyDQv9C+INC60L7QttC1XCIsXCLQnNGL0YHQu9GMXCIsXCLQldGB0YLRjCDQutGC0L4t0L3QuNCx0YPQtNGMINC20LjQstC+0Lk/XCIsXCLQoNCw0Lkg0LIg0YjQsNC70LDRiNC1XCIsXCLQktGB0ZEg0L3QsNC+0LHQvtGA0L7RglwiLFwi0J/QvtC80L7Qu9GH0LjQvCDQvdC10LzQvdC+0LPQvlwiLFwi0J/Rg9GB0YLRjCDQuNCz0YDQsNC10YIg0LzRg9C30YvQutCwIVwiLFwi0JPQvtGA0LjQt9C+0L3RgiDRgdC+0LHRi9GC0LjQuVwiLFwi0KHRgNC10LTQuCDQt9C40LzRi1wiLFwi0JTQstC10YDQvdC+0Lkg0LPQu9Cw0LfQvtC6XCIsXCLQn9C+0LTQstC+0LTQvdCw0Y8g0L/QtdGB0L3Rj1wiXSx0aW1lOltcIjAyOjUwXCIsXCIwMzoyMFwiLFwiMDI6MzlcIixcIjAzOjA1XCIsXCIwMzo1MlwiLFwiMDM6MTBcIixcIjAzOjEzXCIsXCIwMToyMlwiLFwiMDM6NDJcIixcIjAzOjEzXCIsXCIwMjozNVwiLFwiMDI6NDJcIixcIjA1OjIzXCIsXCIwMzoyOFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQtdC30L7QvdCw0L3RgS4g0KfQsNGB0YLRjCAyXCIseWVhcjoyMDE1LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQmtGA0LDRgdC+0YLQsFwiLFwi0J7RgNC60LXRgdGC0YBcIixcItCf0LXRgdC90Y8g0L3QsCDQvtC00L3QvtC8INCw0LrQutC+0YDQtNC1XCIsXCLQlNCy0LAg0L/Qu9GO0YEg0L7QtNC40L1cIixcItCf0L7Qu9C90LDRjyDQu9GD0L3QsFwiLFwi0KLQsNC90YbRg9C5IVwiLFwi0KHQuNC80YTQvtC90LjRj1wiLFwi0J3QtdGE0YLRjFwiLFwi0J/QvtC20LDRgFwiLFwi0KjQsNGF0LzQsNGC0YtcIixcItCY0YHRh9C10LfQsNC10Lwg0LIg0YLQtdC80L3QvtGC0LVcIl0sdGltZTpbXCIwMjo1OFwiLFwiMDQ6MTFcIixcIjA0OjEwXCIsXCIwMjozN1wiLFwiMDM6MzhcIixcIjA0OjEwXCIsXCIwMjo1NFwiLFwiMDI6MTRcIixcIjAyOjUzXCIsXCIwNTo1M1wiLFwiMDQ6MDVcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTIuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX1cblxuXVxuXG5cblxuXG4jIGV4cG9ydHMuZmF2TGlzdCA9IHtcbiMgXHRzb25nczogW1wiYWRcIl1cbiMgXHR0aW1lOiBbXCIxOjFcIl1cbiMgXHRhbGJ1bXM6IFszXVxuIyB9XG5leHBvcnRzLmZhdkxpc3QgPSB7XG5cdHNvbmdzOiBbXCLQktGL0YXQvtC00LAg0L3QtdGCXCIsIFwi0JzQvtC1INGB0LXRgNC00YbQtVwiLCBcItCi0LDQvdGG0YPQuVwiLCBcItCg0L7QvNCw0L3RgVwiLCAgXCLQm9C40L3QuNGPINCW0LjQt9C90LhcIiwgXCLQntGA0LrQtdGB0YLRgFwiLCBcItCe0YDQsdC40YIg0LHQtdC3INGB0LDRhdCw0YDQsFwiLCBcItCU0L7Rh9GMINGB0LDQvNGD0YDQsNGPXCIsIFwi0KDQsNC5INCyINGI0LDQu9Cw0YjQtVwiLCBcItCf0L7QuSDQvNC90LUg0LXRidC1XCJdXG5cdHNvdXJjZTogcmFuZG9tU291cmNlXG5cblx0dGltZTogW1wiMzo0N1wiLCBcIjQ6MDlcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiXVxuXHRhbGJ1bXM6IFszLCA1LCAxMiwgNywgNSwgMTIsIDMsIDEwLCAxMSwgNV1cbn0iLCJjb25maWcgPSBcImFydGlzdHMvc3BsZWFuXCJcbmV4cG9ydHMuY29uZmlnID0gY29uZmlnXG5cbmdyZXlzX3doaXRlID0gXCIjRkZGRkZGXCJcbmdyZXlzX3ByZV93aGl0ZSA9IFwiI0Y3RjdGN1wiXG5ncmV5c191bHRyYV9saWdodCA9IFwiI0VFRUVFRVwiXG5ncmV5c19saWdodGVzdCA9IFwiI0RERERERFwiXG5ncmV5c19saWdodGVyID0gXCIjQ0NDQ0NDXCJcbmdyZXlzX2Jhc2UgPSBcIiM5OTk5OTlcIlxuZ3JleXNfZGFya2VyID0gXCIjNjY2NjY2XCJcbmdyZXlzX2Rhcmtlc3QgPSBcIiMyMjIyMjJcIlxuZ3JleXNfYmxhY2sgPSBcIiMwMDAwMDBcIlxuXG5cbmV4cG9ydHMuY29sb3JUaGVtZSA9IHtcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBoZWFkZXIucG5nXCJcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvcjogXCJyZ2JhKDI0NCwxMjQsNTQsXCJcblx0bmF2aWdhdGlvbl9vdmVybGF5X2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gZGFya2VyLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9oZWFkZXJfdGV4dDogXCIjRkZGRkZGXCJcblx0XG5cdG5hdmlnYXRpb25fYmFja2dyb3VuZDogY29uZmlnICsgXCIvYmcucG5nXCJcblx0IyBuYXZpZ2F0aW9uX3NoYWRvdzogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF9iYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC4wNilcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF90aW1lbGluZTogXCIjOTk5XCJcblx0bmF2aWdhdGlvbl9ibHVyX3JhZGl1czogXCJibHVyKDEwcHgpXCJcblx0bmF2aWdhdGlvbl9ibHVyX2NvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsMC42KVwiXG5cdCMgbmF2aWdhdGlvbl9jYXJkX292ZXJsYXlfYmFja2dyb3VuZDogXCIjRkZGRkZGXCJcblxuXG5cblx0cGxheWVyX2JhY2tncm91bmQ6IFwid2hpdGVcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfYmFzZTogXCIjQ0NDXCJcblx0cGxheWVyX3Byb2dyZXNzX2ZpbGxlZDogXCIjRkY4MDEyXCJcblx0cGxheWVyX3NvbmdfdGl0bGU6IFwiYmxhY2tcIlxuXHRwbGF5ZXJfYWxidW1fdGl0bGU6IFwiIzY2NlwiXG5cdFxuXHRwbGF5ZXJfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC4yKVwiXG5cdHBsYXllcl9zaGFkb3dfeTogLThcblx0cGxheWVyX3NoYWRvd19ibHVyOiAyMFxuXG5cblxuXHRjYXJkX3NoYWRvd19jb2xvcjogXCJyZ2JhKDAsMCwwLDAuMilcIlxuXHRjYXJkX3NoYWRvd195OiAwXG5cdGNhcmRfc2hhZG93X2JsdXI6IDIwXG5cdFxuXHQjIERldGFpbGVkIEFsYnVtXG5cdGRldGFpbGVkX2FsYnVtX2JhY2tncm91bmQ6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV90aXRsZTogXCJibGFja1wiXG5cdGRldGFpbGVkX2FsYnVtX3llYXI6IFwiIzY2NlwiXG5cdGZhdl9zb25nc190aXRsZTogXCIjOTk5XCJcblx0XG5cdCMgRGV0YWlsZWQgQWxidW0gU29uZ1xuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpdGxlOiBcIiMwMDBcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX251bWJlcjogXCIjNjY2XCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aW1lOiBcIiM2NjZcIlxuXG59XG5cblxuXG5cblxubmV3c01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8wLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzAuanBnXCJcbn1cblxubmV3c01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEuanBnXCJcbn1cblxubmV3c01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8yLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzIuanBnXCJcbn1cblxubmV3c01vZGVsMyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8zLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzMuanBnXCJcbn1cblxubmV3c01vZGVsNCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy80LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzQuanBnXCJcbn1cblxubmV3c01vZGVsNSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy81LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzUuanBnXCJcbn1cblxubmV3c01vZGVsNiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy82LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzYuanBnXCJcbn1cblxubmV3c01vZGVsNyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy83LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzcuanBnXCJcbn1cblxubmV3c01vZGVsOCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvOC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy84LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzguanBnXCJcbn1cblxubmV3c01vZGVsOSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy85LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzkuanBnXCJcbn1cblxubmV3c01vZGVsMTAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEwLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEwLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEwLmpwZ1wiXG59XG5cbmV4cG9ydHMuZmVlZERhdGEgPSBbbmV3c01vZGVsMCwgbmV3c01vZGVsMSwgbmV3c01vZGVsMiwgbmV3c01vZGVsMywgbmV3c01vZGVsNCwgbmV3c01vZGVsNSwgbmV3c01vZGVsNiwgbmV3c01vZGVsNywgbmV3c01vZGVsOCwgbmV3c01vZGVsOSwgbmV3c01vZGVsMTBdXG5cblxuXG5cblxuXG5cblxuXG52aWRlb01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8wLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8xLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8yLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG5cblxucGxheWxpc3QwID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8wLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8wLnBuZ1wiXG59XG5cbnBsYXlsaXN0MSA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8xLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMS5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMS5wbmdcIlxufVxuXG5leHBvcnRzLnBsYXlsaXN0c0RhdGEgPSBbcGxheWxpc3QwLCBwbGF5bGlzdDFdXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMl1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgR2V0dGluZyBEYXRhXG5cbmNvbmZpZyA9IFwiYXJ0aXN0cy9zcGxlYW5cIlxuXG4jIGFsYnVtTW9kZWwwID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAxOTk0XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAxOTk1XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDE5OTlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAwNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAwNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAwN1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA5XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw3ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDggPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDIwMTJcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDkgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDIwMTNcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEwID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDExID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTVcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTZcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEzID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTdcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMThcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE1ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMjBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cblxuXG5cblxuIyBleHBvcnRzLmFsYnVtc0RhdGEgPSBbYWxidW1Nb2RlbDAsIGFsYnVtTW9kZWwxLCBhbGJ1bU1vZGVsMiwgYWxidW1Nb2RlbDMsIGFsYnVtTW9kZWw0LCBhbGJ1bU1vZGVsNSwgYWxidW1Nb2RlbDYsIGFsYnVtTW9kZWw3LCBhbGJ1bU1vZGVsOCwgYWxidW1Nb2RlbDksIGFsYnVtTW9kZWwxMCwgYWxidW1Nb2RlbDExLCBhbGJ1bU1vZGVsMTIsIGFsYnVtTW9kZWwxMywgYWxidW1Nb2RlbDE0LCBhbGJ1bU1vZGVsMTVdXG5cblxuXG5jb25maWdBbGJ1bXMgPSBjb25maWcgKyBcIi9hbGJ1bXMvXCJcblxucmFuZG9tU291cmNlID0gW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiXVxuXG5cbmV4cG9ydHMuYWxidW1zRGF0YSA9IFt7dGl0bGU6XCLQn9GL0LvRjNC90LDRjyDQsdGL0LvRjFwiLHllYXI6MTk5NCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JbQtdGA0YLQstCwINGC0LDQu9C+0LPQviDQu9GM0LTQsFwiLFwi0KXQvtC70L7QtNC90YvQtSDQt9C40LzRi1wiLFwi0JzQvdC1INGB0LrQsNC30LDQu9C4INGB0LvQvtCy0L5cIixcItCf0L7QtCDRgdGD0YDQtNC40L3QutGDXCIsXCLQk9GA0L7Qt9CwXCIsXCLQktC+0LnQvdCwXCIsXCLQn9GL0LvRjNC90LDRjyDQsdGL0LvRjC4g0KHQutCw0LfQutCwXCIsXCLQodC10YDQtdCx0YDRj9C90YvQtSDRgNC10LrQuFwiLFwi0KLQstC+0LUg0YDQsNC30LHQuNGC0L7QtSDQv9C10L3RgdC90LVcIixcItCh0LrQsNC30L7Rh9C90YvQuSDQu9C10YjQuNC5XCIsXCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs9GB0LrQvtC1INC90LXQsdC+XCIsXCLQl9Cy0LXRgNC4XCIsXCLQoNGL0LHQsCDQsdC10Lcg0YLRgNGD0YHQvtCyXCJdLHRpbWU6W1wiMDY6MDFcIixcIjAxOjMxXCIsXCIwMzowOFwiLFwiMDM6MjZcIixcIjAzOjQ0XCIsXCIwMjozMFwiLFwiMDU6MjBcIixcIjAyOjUyXCIsXCIwMToyM1wiLFwiMDE6NDJcIixcIjAyOjI5XCIsXCIwMjozNlwiLFwiMDM6MDRcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JrQvtC70LvQtdC60YbQuNC+0L3QtdGAINC+0YDRg9C20LjRj1wiLHllYXI6MTk5NSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JHRg9C00Ywg0LzQvtC10Lkg0YLQtdC90YzRjlwiLFwi0JvRjtCx0L7QstGMINC40LTQtdGCINC/0L4g0L/RgNC+0LLQvtC00LDQvFwiLFwi0KfQtdGA0L3Ri9C5INGG0LLQtdGCINGB0L7Qu9C90YbQsFwiLFwi0KHQsNC80L7QstCw0YBcIixcItCW0LXRgNGC0LLQsCDRgtCw0LvQvtCz0L4g0LvRjNC00LBcIixcItCn0YLQviDRgtGLINCx0YPQtNC10YjRjCDQtNC10LvQsNGC0YxcIixcItCg0YvQsdCwINCx0LXQtyDRgtGA0YPRgdC+0LJcIixcItCf0YvQu9GM0L3QsNGPINCx0YvQu9GMLiDQodC60LDQt9C60LBcIixcItCd0LXRh9C10LPQviDQtNC10LvQsNGC0Ywg0LLQvdGD0YLRgNC4XCIsXCLQmNC00Lgg0YfQtdGA0LXQtyDQu9C10YFcIl0sdGltZTpbXCIwNTo0MVwiLFwiMDQ6MjRcIixcIjA3OjQ3XCIsXCIwNTozMVwiLFwiMDU6NDZcIixcIjA1OjA5XCIsXCIwMzowOVwiLFwiMDU6MzVcIixcIjAzOjI2XCIsXCIwNjozMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQpNC+0L3QsNGA0Ywg0L/QvtC0INCz0LvQsNC30L7QvFwiLHllYXI6MTk5Nyx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JzQvtC70LjRgtCy0LBcIixcItCvINC90LUg0YXQvtGH0YMg0LTQvtC80L7QuVwiLFwi0JHQvtC90L3QuCDQuCDQmtC70LDQudC0XCIsXCLQotGA0Lgg0YbQstC10YLQsCAo0J/QtdGA0LLRi9C5INGB0L3QtdCzKVwiLFwi0J3QtdCy0YHQutC40Lkg0L/RgNC+0YHQv9C10LrRglwiLFwi0KHQv9C4INCyINC30LDQsdGA0L7RiNC10L3QvdC+0Lwg0LTQvtC80LVcIixcItCf0YDQuNGA0L7QttC00LXQvdC90YvQuSDRg9Cx0LjQudGG0LBcIixcItCn0LDRgdGC0YPRiNC60LhcIixcItCc0L7RjyDQu9GO0LHQvtCy0YxcIixcItCQ0L3Qs9C70L4t0YDRg9GB0YHQutC40Lkg0YHQu9C+0LLQsNGA0YwgKNCU0LDQstCw0LksINCb0LDQvNCwKVwiLFwi0KHQutC+0YDQviDQsdGD0LTQtdGCINGB0L7Qu9C90LXRh9C90L5cIixcItCX0LAg0YHRgtC10L3QvtC5XCJdLHRpbWU6W1wiMzJcIixcIjAzOjQ5XCIsXCIwMjo0MFwiLFwiMDQ6NDBcIixcIjA1OjEyXCIsXCIwNDoxN1wiLFwiMDM6MjFcIixcIjA0OjQ0XCIsXCIwMzozNlwiLFwiMDQ6MzZcIixcIjA0OjQyXCIsXCIwMToyN1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIyLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQk9GA0LDQvdCw0YLQvtCy0YvQuSDQsNC70YzQsdC+0LxcIix5ZWFyOjE5OTgsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCS0LXRgdGMINGN0YLQvtGCINCx0YDQtdC0XCIsXCLQlNC+0YHRgtCw0L3RjCDQs9GA0LDQvdCw0YLRg1wiLFwi0J7RgNCx0LjRgiDQsdC10Lcg0YHQsNGF0LDRgNCwXCIsXCLQn9GA0LjRhdC+0LTQuFwiLFwi0KHQstC10YIg0LPQvtGA0LXQuyDQstGB0Y4g0L3QvtGH0YxcIixcItCb0Y7RgdGPINGB0LjQtNC40YIg0LTQvtC80LBcIixcItCR0L7QsyDRg9GB0YLQsNC7INC90LDRgSDQu9GO0LHQuNGC0YxcIixcItCa0LDRgtC40YHRjCwg0LrQvtC70LXRgdC+IVwiLFwi0JLRi9GF0L7QtNCwINC90LXRglwiLFwi0JrQvtC60YLQtdC50LvQuCDRgtGA0LXRgtGM0LXQuSDQvNC40YDQvtCy0L7QuVwiLFwi0JTQttC40LxcIixcItCc0LDRgNC40Y8g0Lgg0KXRg9Cw0L3QsFwiLFwi0J/QvtC00LLQvtC00L3QsNGPINC70L7QtNC60LBcIl0sdGltZTpbXCIwMzowNlwiLFwiMDQ6MTBcIixcIjAyOjE3XCIsXCIwNDowMlwiLFwiMDI6MzBcIixcIjAzOjU3XCIsXCIwMjozMlwiLFwiMDI6NDdcIixcIjAzOjQ3XCIsXCIwMjo1MlwiLFwiMDI6NDdcIixcIjA4OjAzXCIsXCIwMzo0M1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIzLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQkNC70YzRgtCw0LLQuNGB0YLQsFwiLHllYXI6MTk5OSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JDQu9GM0YLQsNCy0LjRgdGC0LBcIixcItCc0L7Qu9C+0LrQviDQuCDQvNGR0LRcIixcItCf0LjQuy3QutGD0YDQuNC7XCIsXCLQotC10YDQv9GB0LjRhdC+0YDQsFwiLFwi0JTQsNC70LXQutC+INC00L7QvNC+0LlcIixcItCQ0LHRgdC10L3RglwiLFwi0JTQvtCx0YDRi9GFINC00LXQuyDQvNCw0YHRgtC10YBcIixcItCc0L7RgtC+0YbQuNC60LvQtdGC0L3QsNGPINGG0LXQv9GMXCIsXCLQodGD0LzQsNGB0YjQtdC00YjQuNC5INCw0LLRgtC+0LHRg9GBXCIsXCLQkNC70LrQvtCz0L7Qu9GMXCIsXCLQktGB0YLRgNC10YLQuNC80YHRjyDQt9Cw0LLRgtGA0LBcIixcItCc0L7Qu9C+0LrQviDQuCDQvNGR0LRcIl0sdGltZTpbXCIwNjowNlwiLFwiMDQ6MzlcIixcIjA0OjUzXCIsXCIwMjo0N1wiLFwiMDM6NTdcIixcIjAxOjU0XCIsXCIwNDo1NVwiLFwiMDQ6MTVcIixcIjAzOjUwXCIsXCIwNToyNVwiLFwiMDQ6MjdcIixcIjA1OjAzXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjQuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIjI1LdC5INC60LDQtNGAXCIseWVhcjoyMDAxLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQm9C40L3QuNGPINC20LjQt9C90LhcIixcItCX0LLQtdC30LTQsCDRgNC+0Lot0L0t0YDQvtC70LvQsFwiLFwi0JLRgdC10LPQviDRhdC+0YDQvtGI0LXQs9C+XCIsXCLQnNC+0ZEg0YHQtdGA0LTRhtC1XCIsXCLQoNC40LrQuC3QotC40LrQuC3QotCw0LLQuFwiLFwiU09TIVwiLFwiRmVsbGluaVwiLFwi0J7RgdGC0LDQtdC80YHRjyDQt9C40LzQvtCy0LDRgtGMXCIsXCLQotC10LHQtSDRjdGC0L4g0YHQvdC40YLRgdGPXCIsXCLQodC+0LLRgdC10Lwg0LTRgNGD0LPQvtC5XCIsXCLQn9C70LDRgdGC0LzQsNGB0YHQvtCy0LDRjyDQttC40LfQvdGMXCIsXCLQn9C+0Lkg0LzQvdC1INC10YnRkVwiLFwi0JvQtdC90LjQvdCz0YDQsNC0IC0gQW1zdGVyZGFtXCIsXCJGaW5lXCJdLHRpbWU6W1wiMDM6MDBcIixcIjA0OjEwXCIsXCIwMjo1OVwiLFwiMDQ6MDlcIixcIjAxOjU4XCIsXCIwNDoyNlwiLFwiMDQ6NDRcIixcIjAzOjM4XCIsXCIwNDo1OFwiLFwiMDI6MDhcIixcIjAyOjI1XCIsXCIwMzo1NVwiLFwiMDI6MzZcIixcIjI5XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjUuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCd0L7QstGL0LUg0LvRjtC00LhcIix5ZWFyOjIwMDMsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCd0L7QstGL0LUg0LvRjtC00LhcIixcItCS0YDQtdC80Y8sINCd0LDQt9Cw0LQhXCIsXCLQk9Cw0L3QtNCx0L7Qu1wiLFwi0KHQu9C+0LzQsNC90L4g0JLRgdC1XCIsXCLQlNC10LLRj9GC0LjRjdGC0LDQttC90YvQuSDQtNC+0LxcIixcItCR0LvQvtC60LDQtNCwXCIsXCLQktCw0LvQtNCw0LlcIixcItCZ0L7QsyDQodC/0L7QutC+0LXQvVwiLFwi0KHQtdCy0LXRgNC+LdCX0LDQv9Cw0LRcIixcItCg0K3QnyAo0J3QtdGA0LLQvdC+0LUg0KHQtdGA0LTRhtC1KVwiLFwi0JDQu9GM0YLQsNCy0LjRgdGC0LAgKNCU0YDRg9Cz0LDRjyDQotC+0YfQutCwINCX0YDQtdC90LjRjylcIl0sdGltZTpbXCIwMzo0NFwiLFwiMDQ6MTJcIixcIjAyOjM1XCIsXCIwNDoxNlwiLFwiMDQ6MzBcIixcIjAzOjIyXCIsXCIwNDoyN1wiLFwiMDI6NTZcIixcIjAzOjUzXCIsXCIwMzoxNFwiLFwiMDQ6MDdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDRhdGA0L7QvdC40LrQsCDRgdC+0LHRi9GC0LjQuVwiLHllYXI6MjAwNCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0J7QutC10LDQvVwiLFwi0KHQtdC80Ywg0LLQvtGB0YzQvNGL0YVcIixcItCo0LDRgtC+INCc0LDRgNCz0L5cIixcItCc0Ysg0YHQuNC00LXQu9C4INC4INC60YPRgNC40LvQuFwiLFwi0KHQuNCw0L3Rg9C60LLQuNC70YxcIixcItCn0LXQu9C+0LLQtdC6INC4INCU0LXRgNC10LLQvlwiLFwi0JvQsNCx0LjRgNC40L3RglwiLFwi0KjQsNCz0LhcIixcItCR0LXRgNC40LvQu9C40LlcIixcItCf0LDRgNC+0LLQvtC3XCIsXCLQm9GO0LTQuCDQvdCwINC70LDQtNC+0L3QuFwiLFwi0KPRgNC+0Log0LPQtdC+0LPRgNCw0YTQuNC4XCIsXCLQktGB0ZEg0LLQutC70Y7Rh9C10L3QvlwiLFwi0JPQvtC70L7RgSDQt9CwINC60LDQtNGA0L7QvFwiLFwi0KDQvtC80LDQvdGBXCJdLHRpbWU6W1wiMzZcIixcIjA0OjIyXCIsXCIwMzo1NFwiLFwiMDM6MTlcIixcIjAyOjMyXCIsXCIwMjoxNlwiLFwiMDQ6NDhcIixcIjAxOjI5XCIsXCIwMzozMVwiLFwiNTNcIixcIjAyOjAxXCIsXCIwNDo1OVwiLFwiMDM6MjBcIixcIjAxOjA4XCIsXCIwMzoyN1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI3LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCIseWVhcjoyMDA3LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQnNC10LvRjNC60L3Rg9C70LAg0YfRjNGPLdGC0L4g0YLQtdC90YxcIixcItCh0LrQsNC20LhcIixcItCc0LDRgtGHXCIsXCLQndCwINGB0YfQsNGB0YLRjNC1XCIsXCLQktC+0LvQvdCwXCIsXCLQm9C10L/QtdGB0YLQvtC6XCIsXCLQmNC80L/QtdGA0LDRgtC+0YBcIixcItCR0LXRgtGF0L7QstC10L1cIixcItCc0LDRj9C6XCIsXCLQn9GA0LDQt9C00L3QuNC6XCIsXCLQodGD0YXQsNGA0Lgg0Lgg0YHRg9GI0LrQuFwiLFwi0JzQvtCx0LjQu9GM0L3Ri9C5XCIsXCLQmtC+0LvQvtC60L7Qu1wiLFwi0J/RgNC+0LHQutC4XCIsXCLQnNCw0LzQvNCwINC80LjRj1wiLFwi0J/RgNC+0YfRjFwiLFwi0KHRi9C9XCJdLHRpbWU6W1wiMDM6MTZcIixcIjAzOjEyXCIsXCIwMjo1MVwiLFwiMDI6NDRcIixcIjAzOjI5XCIsXCIwMzozOFwiLFwiMDE6MTVcIixcIjAyOjQ0XCIsXCIwMzo0OVwiLFwiMDI6MjFcIixcIjA1OjMxXCIsXCIwMzoyNVwiLFwiMDM6NDBcIixcIjA0OjAzXCIsXCIwMzowMVwiLFwiMDM6MjBcIixcIjAxOjUxXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjguanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCh0LjQs9C90LDQuyDQuNC3INC60L7RgdC80L7RgdCwXCIseWVhcjoyMDA5LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQndCw0YHRgtGA0L7QudC60LAg0LfQstGD0LrQsFwiLFwi0JTRi9GI0Lgg0LvQtdCz0LrQvlwiLFwi0JTQvtCx0YDQviDQv9C+0LbQsNC70L7QstCw0YLRjFwiLFwi0JHQvtC70YzRiNC1INC90LjQutCw0LrQvtCz0L4g0YDQvtC6LdC9LdGA0L7Qu9C70LBcIixcItCS0L3QuNC3INCz0L7Qu9C+0LLQvtC5XCIsXCLQp9C10YDQtNCw0LpcIixcItCX0LXQu9C10L3QsNGPINC/0LXRgdC90Y9cIixcItCa0LDQvNC10L3RjFwiLFwiMzAwN1wiLFwi0JHQtdC3INGC0L7RgNC80L7Qt9C+0LJcIixcItCa0L7RgNCw0LHQu9GMINC20LTQtdGCIVwiLFwi0KfQtdC70L7QstC10Log0L3QtSDRgdC/0LDQu1wiLFwi0JrQvtCy0YfQtdCzXCIsXCLQktGL0L/Rg9GB0YLQuCDQvNC10L3RjyDQvtGC0YHRjtC00LBcIixcItCf0LjRgdGM0LzQvlwiLFwi0JLRgdC1INGC0LDQuiDRgdGC0YDQsNC90L3QvlwiLFwi0JLQsNC70YzRgVwiLFwi0JTQviDQstGB0YLRgNC10YfQuFwiXSx0aW1lOltcIjAyOjQwXCIsXCIwMzo1M1wiLFwiMDQ6MTFcIixcIjA0OjEyXCIsXCIwMzowNVwiLFwiMDQ6MDdcIixcIjAzOjMwXCIsXCIwNDo1OVwiLFwiMDI6MTFcIixcIjAzOjE0XCIsXCIwMjo0NFwiLFwiMDI6NTJcIixcIjAzOjMyXCIsXCIwMzoxMVwiLFwiMDI6MjlcIixcIjAyOjAzXCIsXCIwMzowN1wiLFwiMDQ6MjJcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0J7QsdC80LDQvSDQt9GA0LXQvdC40Y9cIix5ZWFyOjIwMTIsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCj0LLQtdGA0YLRjtGA0LBcIixcItCb0LXRgtC10LvQsCDQttC40LfQvdGMXCIsXCLQp9GR0YDQvdCw0Y8g0JLQvtC70LPQsFwiLFwi0JvQtdGB0YLQvdC40YbQsFwiLFwi0KHRgtGA0LDRiNC90LDRjyDRgtCw0LnQvdCwXCIsXCLQn9C10YLQtdGA0LHRg9GA0LPRgdC60LDRjyDRgdCy0LDQtNGM0LHQsFwiLFwi0JTQvtGH0Ywg0YHQsNC80YPRgNCw0Y9cIixcItCk0LjQsdC+0L3QsNGH0YfQuFwiLFwi0JIg0LzQuNGA0LUg0LjQu9C70Y7Qt9C40LlcIixcItCf0YDQsNC30LTQvdC40LogKNCU0YDRg9Cz0LDRjyDRgtC+0YfQutCwINC30YDQtdC90LjRjylcIixcItCa0L7QstGIXCIsXCLQodC+0LvQvdGG0LUg0LLQt9C+0LnQtNGR0YJcIixcItCn0YPQtNCw0LpcIixcItCS0L7Qu9GI0LXQsdC90L7QtSDRgdC70L7QstC+XCJdLHRpbWU6W1wiMDE6NDRcIixcIjAyOjMwXCIsXCIwMjo0NlwiLFwiMDI6MThcIixcIjAyOjI0XCIsXCIwNDoyMFwiLFwiMDM6MzZcIixcIjAzOjI3XCIsXCIwMjo1OFwiLFwiMDI6MzlcIixcIjAzOjAxXCIsXCIwMzozNVwiLFwiMDI6MjlcIixcIjA0OjI0XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEwLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNC10LfQvtC90LDQvdGBLiDQp9Cw0YHRgtGMIDFcIix5ZWFyOjIwMTQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCS0YHQsNC00L3QuNC6XCIsXCLQkNC5INC70L7QsiDRjiFcIixcItCh0YLQsNGA0YvQuSDQtNC+0LxcIixcItCc0L7RgNC+0Lcg0L/QviDQutC+0LbQtVwiLFwi0JzRi9GB0LvRjFwiLFwi0JXRgdGC0Ywg0LrRgtC+LdC90LjQsdGD0LTRjCDQttC40LLQvtC5P1wiLFwi0KDQsNC5INCyINGI0LDQu9Cw0YjQtVwiLFwi0JLRgdGRINC90LDQvtCx0L7RgNC+0YJcIixcItCf0L7QvNC+0LvRh9C40Lwg0L3QtdC80L3QvtCz0L5cIixcItCf0YPRgdGC0Ywg0LjQs9GA0LDQtdGCINC80YPQt9GL0LrQsCFcIixcItCT0L7RgNC40LfQvtC90YIg0YHQvtCx0YvRgtC40LlcIixcItCh0YDQtdC00Lgg0LfQuNC80YtcIixcItCU0LLQtdGA0L3QvtC5INCz0LvQsNC30L7QulwiLFwi0J/QvtC00LLQvtC00L3QsNGPINC/0LXRgdC90Y9cIl0sdGltZTpbXCIwMjo1MFwiLFwiMDM6MjBcIixcIjAyOjM5XCIsXCIwMzowNVwiLFwiMDM6NTJcIixcIjAzOjEwXCIsXCIwMzoxM1wiLFwiMDE6MjJcIixcIjAzOjQyXCIsXCIwMzoxM1wiLFwiMDI6MzVcIixcIjAyOjQyXCIsXCIwNToyM1wiLFwiMDM6MjhcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTEuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LXQt9C+0L3QsNC90YEuINCn0LDRgdGC0YwgMlwiLHllYXI6MjAxNSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JrRgNCw0YHQvtGC0LBcIixcItCe0YDQutC10YHRgtGAXCIsXCLQn9C10YHQvdGPINC90LAg0L7QtNC90L7QvCDQsNC60LrQvtGA0LTQtVwiLFwi0JTQstCwINC/0LvRjtGBINC+0LTQuNC9XCIsXCLQn9C+0LvQvdCw0Y8g0LvRg9C90LBcIixcItCi0LDQvdGG0YPQuSFcIixcItCh0LjQvNGE0L7QvdC40Y9cIixcItCd0LXRhNGC0YxcIixcItCf0L7QttCw0YBcIixcItCo0LDRhdC80LDRgtGLXCIsXCLQmNGB0YfQtdC30LDQtdC8INCyINGC0LXQvNC90L7RgtC1XCJdLHRpbWU6W1wiMDI6NThcIixcIjA0OjExXCIsXCIwNDoxMFwiLFwiMDI6MzdcIixcIjAzOjM4XCIsXCIwNDoxMFwiLFwiMDI6NTRcIixcIjAyOjE0XCIsXCIwMjo1M1wiLFwiMDU6NTNcIixcIjA0OjA1XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEyLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9XG5cbl1cblxuXG5cblxuIyBleHBvcnRzLmZhdkxpc3QgPSB7XG4jIFx0c29uZ3M6IFtcImFkXCJdXG4jIFx0dGltZTogW1wiMToxXCJdXG4jIFx0YWxidW1zOiBbM11cbiMgfVxuZXhwb3J0cy5mYXZMaXN0ID0ge1xuXHRzb25nczogW1wi0JLRi9GF0L7QtNCwINC90LXRglwiLCBcItCc0L7QtSDRgdC10YDQtNGG0LVcIiwgXCLQotCw0L3RhtGD0LlcIiwgXCLQoNC+0LzQsNC90YFcIiwgIFwi0JvQuNC90LjRjyDQltC40LfQvdC4XCIsIFwi0J7RgNC60LXRgdGC0YBcIiwgXCLQntGA0LHQuNGCINCx0LXQtyDRgdCw0YXQsNGA0LBcIiwgXCLQlNC+0YfRjCDRgdCw0LzRg9GA0LDRj1wiLCBcItCg0LDQuSDQsiDRiNCw0LvQsNGI0LVcIiwgXCLQn9C+0Lkg0LzQvdC1INC10YnQtVwiXVxuXHRzb3VyY2U6IHJhbmRvbVNvdXJjZVxuXG5cdHRpbWU6IFtcIjM6NDdcIiwgXCI0OjA5XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIl1cblx0YWxidW1zOiBbMywgNSwgMTIsIDcsIDUsIDEyLCAzLCAxMCwgMTEsIDVdXG59IiwiY2xhc3MgZXhwb3J0cy5BbGJ1bSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuYWxidW1JRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ2FsYnVtSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsIiMgUHJldmlldyBDb21wb25lbnRcbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3Q29tcG9uZW50QXNzZXRzXCJcbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbmxvY2FsQ29sb3JzID1cblx0YmdfY29sb3Jfb25MaWdodDogXCIjZWVlXCJcblx0YmdfY29sb3Jfb25EYXJrOiBcIiMyMjJcIlxuXHRjb250ZW50X2NvbG9yX29uTGlnaHQ6IFwiIzAwMFwiXG5cdGNvbnRlbnRfY29sb3Jfb25EYXJrOiBcIiNGRkZcIlxuXG50aGVtZSA9XG5cdGJnX2NvbG9yOiBsb2NhbENvbG9ycy5iZ19jb2xvcl9vbkRhcmtcblx0Y29udGVudF9jb2xvcjogbG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmtcblxuXG4jIExvZ29cblxuY2xhc3MgTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28obG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmspXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuIyBQcmV2aWV3XG5cbiMgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWV3OiBudWxsXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IFwiMjA6MTZcIlxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0XG5cdFx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0XHR0b3BUaGVtZTogXCJkYXJrXCJcblx0XHRcdGJvdHRvbVRoZW1lOiBcImRhcmtcIlxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3RvcFRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRvcFRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRvcFRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2JvdHRvbVRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcbiMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93QmFyID0gdmFsdWVcblx0XG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblx0XG5cdFxuXHRcblx0XG5cdGdldExvY2F0aW9uRGF0YTogKCkgPT5cblx0XHRxdWVyeUFycmF5ID0gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gcXVlcnlBcnJheVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdFx0XHRlbHNlIGlmIHZhbHVlUGFydCA9PSBcIm5vcm1hbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcdFx0XG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cdHNldERlc2t0b3BTY2FsZU1vZGU6IChmb3JTdGF0ZSA9IFwibm9ybWFsXCIpID0+XG5cdFx0QHVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdGluaXRTdGF0ZSA9IGZvclN0YXRlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBpbml0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0XHRlbHNlIGluaXRTdGF0ZSA9IFwibm9ybWFsXCJcblx0XHRcblx0XHRzaG91bGRTaG93QnV0dG9uID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImJ1dHRvblwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0J1dHRvbiA9IGZhbHNlXG5cdFx0XG5cdFx0c2hvdWxkU2hvd0xvZ28gPSB0cnVlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwibG9nb1wiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0xvZ28gPSBmYWxzZVxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oaW5pdFN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oaW5pdFN0YXRlKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgdGhlbiByZXR1cm5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcblx0XG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXHRcblx0XG5cblx0XG5cdFxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmdfY29sb3Jcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb250ZW50X2NvbG9yLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcCgtMjApXG5cdFx0QG9yaWdpblkgPSAwXG5cdFx0XG5cdFx0c0ggPSAoU2NyZWVuLmhlaWdodCArIDQwKSAvIEBoZWlnaHRcblx0XHRAc2NhbGUgPSBNYXRoLm1pbihTY3JlZW4ud2lkdGggLyBAd2lkdGgsIHNIKVxuXHRcblx0XG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKHRlbXApID0+XG5cdFx0dGVtcC5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhciBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdGVtcCwgd2lkdGg6IHRlbXAud2lkdGggLSAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoNilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5jZW50ZXIoMSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGJvdHRvbVRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0XG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBeUJBQTtBRENBLE9BQU8sQ0FBQyxJQUFSLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLEtBQUEsRUFBTyxNQURQO0dBREQ7RUFHQSxtQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLHlEQUFOO0lBQ0EsS0FBQSxFQUFPLDBEQURQO0dBSkQ7RUFNQSxxQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDJEQUFOO0lBQ0EsS0FBQSxFQUFPLDREQURQO0dBUEQ7RUFTQSxzQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDREQUFOO0lBQ0EsS0FBQSxFQUFPLDZEQURQO0dBVkQ7RUFZQSwwQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLGdFQUFOO0lBQ0EsS0FBQSxFQUFPLGlFQURQO0dBYkQ7RUFnQkEsS0FBQSxFQUFPLG9EQWhCUDs7Ozs7QURERCxJQUFBLDhDQUFBO0VBQUE7Ozs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLHdCQUFSOztBQUNULE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBRUEsV0FBQSxHQUNDO0VBQUEsZ0JBQUEsRUFBa0IsTUFBbEI7RUFDQSxlQUFBLEVBQWlCLE1BRGpCO0VBRUEscUJBQUEsRUFBdUIsTUFGdkI7RUFHQSxvQkFBQSxFQUFzQixNQUh0Qjs7O0FBS0QsS0FBQSxHQUNDO0VBQUEsUUFBQSxFQUFVLFdBQVcsQ0FBQyxlQUF0QjtFQUNBLGFBQUEsRUFBZSxXQUFXLENBQUMsb0JBRDNCOzs7QUFNSzs7O0VBQ1EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsT0FBQSxFQUFTLEdBQVQ7TUFDQSxPQUFBLEVBQVMsSUFEVDtNQUVBLEdBQUEsRUFB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
