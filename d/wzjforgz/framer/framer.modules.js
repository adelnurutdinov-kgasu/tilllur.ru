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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy95ZWFyLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy92aWRlby5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMjAgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvdGltZWZyb21zZWMuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL3RleHQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL3NvbmcuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL3BsYXlsaXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9wbGF5X3NvbmcuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL29sZC95b3V0dWJlIGJhY2t1cC95b3V0dWJlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9vbGQvZmVlZCBiYWNrdXAvdHJvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL29sZC9kYXRhIGJhY2t1cC90cm9sbC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMjAgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvb2xkL2NvbG9yIGJhY2t1cC90cm9sbC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMjAgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvb2xkL2NvbG9yIGJhY2t1cC9iYXNlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9uZXdzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9uYXYuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2RldGFpbGVkX3BsYXlsaXN0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9kZXRhaWxlZF9uZXdzLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9kZXRhaWxlZF9hbGJ1bS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMjAgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvY3JlYXRlX3NvbmcuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2FydGlzdC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMjAgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvYXJ0aXN0cyBiYWNrdXAvdHJvbGwuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2FydGlzdHMgYmFja3VwL3NwbGVhbi5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0xMjAgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBGbG93IDEuZnJhbWVyL21vZHVsZXMvYXJ0aXN0cyBiYWNrdXAvc3BsZWFuIDIuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMTIwIFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgRmxvdyAxLmZyYW1lci9tb2R1bGVzL2FsYnVtLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTEyMCBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIEZsb3cgMS5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsie1RleHRMYXllcn0gPSByZXF1aXJlIFwidGV4dFwiXG5cbmNsYXNzIGV4cG9ydHMuWWVhciBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLnllYXJJRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ3llYXJJRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMueWVhcklEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy55ZWFySUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsImNsYXNzIGV4cG9ydHMuVmlkZW8gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLnZpZGVvSUQgPz0gLTFcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdFxuXHRAZGVmaW5lICd2aWRlb0lEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy52aWRlb0lEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWRlb0lEID0gdmFsdWVcblxuXG5cdFx0XHQiLCJleHBvcnRzLnRpbWVGcm9tU2Vjb25kcyA9IChzZWNvbmRzKSAtPlxuXHRpZiBzZWNvbmRzID4gMFxuXHRcdHJldHVybiBuZXcgRGF0ZShzZWNvbmRzICogMTAwMCkudG9JU09TdHJpbmcoKS5zdWJzdHIoMTUsIDQpXG5cdGVsc2Vcblx0XHRyZXR1cm4gXCIwOjAwXCIiLCJjbGFzcyBUZXh0TGF5ZXIgZXh0ZW5kcyBMYXllclxuXHRcdFxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0QGRvQXV0b1NpemUgPSBmYWxzZVxuXHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gZmFsc2Vcblx0XHRvcHRpb25zLmJhY2tncm91bmRDb2xvciA/PSBpZiBvcHRpb25zLnNldHVwIHRoZW4gXCJoc2xhKDYwLCA5MCUsIDQ3JSwgLjQpXCIgZWxzZSBcInRyYW5zcGFyZW50XCJcblx0XHRvcHRpb25zLmNvbG9yID89IFwicmVkXCJcblx0XHRvcHRpb25zLmxpbmVIZWlnaHQgPz0gMS4yNVxuXHRcdG9wdGlvbnMuZm9udEZhbWlseSA/PSBcIkhlbHZldGljYVwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAyMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlVzZSBsYXllci50ZXh0IHRvIGFkZCB0ZXh0XCJcblx0XHRzdXBlciBvcHRpb25zXG5cdFx0QHN0eWxlLndoaXRlU3BhY2UgPSBcInByZS1saW5lXCIgIyBhbGxvdyBcXG4gaW4gLnRleHRcblx0XHRAc3R5bGUub3V0bGluZSA9IFwibm9uZVwiICMgbm8gYm9yZGVyIHdoZW4gc2VsZWN0ZWRcblx0XHRcblx0c2V0U3R5bGU6IChwcm9wZXJ0eSwgdmFsdWUsIHB4U3VmZml4ID0gZmFsc2UpIC0+XG5cdFx0QHN0eWxlW3Byb3BlcnR5XSA9IGlmIHB4U3VmZml4IHRoZW4gdmFsdWUrXCJweFwiIGVsc2UgdmFsdWVcblx0XHRAZW1pdChcImNoYW5nZToje3Byb3BlcnR5fVwiLCB2YWx1ZSlcblx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdFx0XG5cdGNhbGNTaXplOiAtPlxuXHRcdHNpemVBZmZlY3RpbmdTdHlsZXMgPVxuXHRcdFx0bGluZUhlaWdodDogQHN0eWxlW1wibGluZS1oZWlnaHRcIl1cblx0XHRcdGZvbnRTaXplOiBAc3R5bGVbXCJmb250LXNpemVcIl1cblx0XHRcdGZvbnRXZWlnaHQ6IEBzdHlsZVtcImZvbnQtd2VpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nVG9wOiBAc3R5bGVbXCJwYWRkaW5nLXRvcFwiXVxuXHRcdFx0cGFkZGluZ1JpZ2h0OiBAc3R5bGVbXCJwYWRkaW5nLXJpZ2h0XCJdXG5cdFx0XHRwYWRkaW5nQm90dG9tOiBAc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXVxuXHRcdFx0cGFkZGluZ0xlZnQ6IEBzdHlsZVtcInBhZGRpbmctbGVmdFwiXVxuXHRcdFx0dGV4dFRyYW5zZm9ybTogQHN0eWxlW1widGV4dC10cmFuc2Zvcm1cIl1cblx0XHRcdGJvcmRlcldpZHRoOiBAc3R5bGVbXCJib3JkZXItd2lkdGhcIl1cblx0XHRcdGxldHRlclNwYWNpbmc6IEBzdHlsZVtcImxldHRlci1zcGFjaW5nXCJdXG5cdFx0XHRmb250RmFtaWx5OiBAc3R5bGVbXCJmb250LWZhbWlseVwiXVxuXHRcdFx0Zm9udFN0eWxlOiBAc3R5bGVbXCJmb250LXN0eWxlXCJdXG5cdFx0XHRmb250VmFyaWFudDogQHN0eWxlW1wiZm9udC12YXJpYW50XCJdXG5cdFx0Y29uc3RyYWludHMgPSB7fVxuXHRcdGlmIEBkb0F1dG9TaXplSGVpZ2h0IHRoZW4gY29uc3RyYWludHMud2lkdGggPSBAd2lkdGhcblx0XHRzaXplID0gVXRpbHMudGV4dFNpemUgQHRleHQsIHNpemVBZmZlY3RpbmdTdHlsZXMsIGNvbnN0cmFpbnRzXG5cdFx0aWYgQHN0eWxlLnRleHRBbGlnbiBpcyBcInJpZ2h0XCJcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRcdEB4ID0gQHgtQHdpZHRoXG5cdFx0ZWxzZVxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdEBoZWlnaHQgPSBzaXplLmhlaWdodFxuXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZVwiLFxuXHRcdGdldDogLT4gQGRvQXV0b1NpemVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJhdXRvU2l6ZUhlaWdodFwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdEBkb0F1dG9TaXplSGVpZ2h0ID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImNvbnRlbnRFZGl0YWJsZVwiLFxuXHRcdHNldDogKGJvb2xlYW4pIC0+XG5cdFx0XHRAX2VsZW1lbnQuY29udGVudEVkaXRhYmxlID0gYm9vbGVhblxuXHRcdFx0QGlnbm9yZUV2ZW50cyA9ICFib29sZWFuXG5cdFx0XHRAb24gXCJpbnB1dFwiLCAtPiBAY2FsY1NpemUoKSBpZiBAZG9BdXRvU2l6ZVxuXHRAZGVmaW5lIFwidGV4dFwiLFxuXHRcdGdldDogLT4gQF9lbGVtZW50LnRleHRDb250ZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2VsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZVxuXHRcdFx0QGVtaXQoXCJjaGFuZ2U6dGV4dFwiLCB2YWx1ZSlcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImZvbnRGYW1pbHlcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udEZhbWlseVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250RmFtaWx5XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFNpemVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFNpemUucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFNpemVcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsaW5lSGVpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxpbmVIZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxpbmVIZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250V2VpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRXZWlnaHQgXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRXZWlnaHRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U3R5bGVcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFN0eWxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTdHlsZVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRWYXJpYW50XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRWYXJpYW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRWYXJpYW50XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1wiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nVG9wXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdUb3AucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdSaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nUmlnaHQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0JvdHRvbVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nQm90dG9tLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nTGVmdFwiLFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdMZWZ0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwidGV4dEFsaWduXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRBbGlnblwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInRleHRUcmFuc2Zvcm1cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUudGV4dFRyYW5zZm9ybSBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dFRyYW5zZm9ybVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImxldHRlclNwYWNpbmdcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGV0dGVyU3BhY2luZy5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsZXR0ZXJTcGFjaW5nXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGVuZ3RoXCIsIFxuXHRcdGdldDogLT4gQHRleHQubGVuZ3RoXG5cbmNvbnZlcnRUb1RleHRMYXllciA9IChsYXllcikgLT5cblx0dCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRuYW1lOiBsYXllci5uYW1lXG5cdFx0ZnJhbWU6IGxheWVyLmZyYW1lXG5cdFx0cGFyZW50OiBsYXllci5wYXJlbnRcblx0XG5cdGNzc09iaiA9IHt9XG5cdGNzcyA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLmNzc1xuXHRjc3MuZm9yRWFjaCAocnVsZSkgLT5cblx0XHRyZXR1cm4gaWYgXy5pbmNsdWRlcyBydWxlLCAnLyonXG5cdFx0YXJyID0gcnVsZS5zcGxpdCgnOiAnKVxuXHRcdGNzc09ialthcnJbMF1dID0gYXJyWzFdLnJlcGxhY2UoJzsnLCcnKVxuXHR0LnN0eWxlID0gY3NzT2JqXG5cdFxuXHRpbXBvcnRQYXRoID0gbGF5ZXIuX19mcmFtZXJJbXBvcnRlZEZyb21QYXRoXG5cdGlmIF8uaW5jbHVkZXMgaW1wb3J0UGF0aCwgJ0AyeCdcblx0XHR0LmZvbnRTaXplICo9IDJcblx0XHR0LmxpbmVIZWlnaHQgPSAocGFyc2VJbnQodC5saW5lSGVpZ2h0KSoyKSsncHgnXG5cdFx0dC5sZXR0ZXJTcGFjaW5nICo9IDJcblx0XHRcdFx0XHRcblx0dC55IC09IChwYXJzZUludCh0LmxpbmVIZWlnaHQpLXQuZm9udFNpemUpLzIgIyBjb21wZW5zYXRlIGZvciBob3cgQ1NTIGhhbmRsZXMgbGluZSBoZWlnaHRcblx0dC55IC09IHQuZm9udFNpemUgKiAwLjEgIyBza2V0Y2ggcGFkZGluZ1xuXHR0LnggLT0gdC5mb250U2l6ZSAqIDAuMDggIyBza2V0Y2ggcGFkZGluZ1xuXHR0LndpZHRoICs9IHQuZm9udFNpemUgKiAwLjUgIyBza2V0Y2ggcGFkZGluZ1xuXG5cdHQudGV4dCA9IGxheWVyLl9pbmZvLm1ldGFkYXRhLnN0cmluZ1xuXHRsYXllci5kZXN0cm95KClcblx0cmV0dXJuIHRcblxuTGF5ZXI6OmNvbnZlcnRUb1RleHRMYXllciA9IC0+IGNvbnZlcnRUb1RleHRMYXllcihAKVxuXG5jb252ZXJ0VGV4dExheWVycyA9IChvYmopIC0+XG5cdGZvciBwcm9wLGxheWVyIG9mIG9ialxuXHRcdGlmIGxheWVyLl9pbmZvLmtpbmQgaXMgXCJ0ZXh0XCJcblx0XHRcdG9ialtwcm9wXSA9IGNvbnZlcnRUb1RleHRMYXllcihsYXllcilcblxuIyBCYWNrd2FyZHMgY29tcGFiaWxpdHkuIFJlcGxhY2VkIGJ5IGNvbnZlcnRUb1RleHRMYXllcigpXG5MYXllcjo6ZnJhbWVBc1RleHRMYXllciA9IChwcm9wZXJ0aWVzKSAtPlxuICAgIHQgPSBuZXcgVGV4dExheWVyXG4gICAgdC5mcmFtZSA9IEBmcmFtZVxuICAgIHQuc3VwZXJMYXllciA9IEBzdXBlckxheWVyXG4gICAgXy5leHRlbmQgdCxwcm9wZXJ0aWVzXG4gICAgQGRlc3Ryb3koKVxuICAgIHRcblxuZXhwb3J0cy5UZXh0TGF5ZXIgPSBUZXh0TGF5ZXJcbmV4cG9ydHMuY29udmVydFRleHRMYXllcnMgPSBjb252ZXJ0VGV4dExheWVyc1xuIiwiY2xhc3MgZXhwb3J0cy5Tb25nIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5hbGJ1bUlEID89IC0xXG5cdFx0QG9wdGlvbnMuc29uZ0lEID89IC0xXG5cdFx0QG9wdGlvbnMuYWxidW1UaXRsZSA/PSBcIk1heSAxNFwiXG5cdFx0QG9wdGlvbnMuc29uZ1RpdGxlID89IFwi0KHQvtC10LLRi9C1INCz0YPQsdGLXCJcblx0XHRcblx0XHQgXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRALndpZHRoID0gMzIwKjJcblx0XHRALmhlaWdodCA9IDY2KjJcblx0XHRALmJhY2tncm91bmRDb2xvciA9IFwibnVsbFwiXG5cdFx0XG5cdEBkZWZpbmUgJ2FsYnVtSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSUQgPSB2YWx1ZVxuXHRcdFx0XG5cdEBkZWZpbmUgJ3NvbmdJRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ0lEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zb25nSUQgPSB2YWx1ZVxuXHRcdFx0XG5cdEBkZWZpbmUgJ2FsYnVtVGl0bGUnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtVGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtVGl0bGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc29uZ1RpdGxlJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5zb25nVGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNvbmdUaXRsZSA9IHZhbHVlXG5cdFx0XHQiLCJjbGFzcyBleHBvcnRzLlBsYXlsaXN0IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5wbGF5bGlzdElEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAncGxheWxpc3RJRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMucGxheWxpc3RJRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMucGxheWxpc3RJRCA9IHZhbHVlXG5cblxuXHRcdFx0IiwiVGltZSA9IHJlcXVpcmUgJ3RpbWVmcm9tc2VjJ1xuXG5BcnRpc3QgPSByZXF1aXJlIFwiYXJ0aXN0XCJcbmNvbmZpZyA9IEFydGlzdC5jb25maWdcblxuc29uZ1BhdGggPSBjb25maWcgKyBcIi9zb25ncy9cIlxuXG5cblxuZXhwb3J0cy5wbGF5UGxheWxpc3QgPSAoc29uZ0lELCBhbGJ1bU1vZGVsKSAtPlxuXHRzb25nc05hbWVzID0gYWxidW1Nb2RlbC5zb25nc1xuXHRzb25nc1NvdXJjZSA9IGFsYnVtTW9kZWwuc291cmNlXG5cdCMgc29uZ3NBbGJ1bXMgPSBhbGJ1bU1vZGVsLmFsYnVtc1xuXHRcblx0c29uZ3NOYW1lQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NOYW1lcylcblx0c29uZ3NTb3VyY2VDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc1NvdXJjZSlcblx0IyBzb25nQWxidW1JREN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzQWxidW1zKVxuXHRcblx0cGxheWluZ1NvbmdOYW1lID0gXCJcIlxuXHRwbGF5aW5nU29uZ1NvdXJjZSA9IFwiXCJcblx0cGxheWluZ1NvbmdBbGJ1bUlEID0gMFxuXHRmb3IgaSBpbiBbMC4uc29uZ0lEXVxuXHRcdHBsYXlpbmdTb25nTmFtZSA9IHNvbmdzTmFtZUN5Y2xlcigpXG5cdFx0cGxheWluZ1NvbmdTb3VyY2VcdD0gc29uZ1BhdGgrc29uZ3NTb3VyY2VDeWNsZXIoKVxuXHRcdCMgcGxheWluZ1NvbmdBbGJ1bUlEID0gVXRpbHMuY3ljbGUoc29uZ3NBbGJ1bXMpXG5cdFx0IyBwcmludCBwbGF5aW5nU29uZ0FsYnVtSURcblx0XG5cdGlmIHBhdXNlLnN0YXRlcy5jdXJyZW50IGlzIFwiaGlkZGVuXCJcblx0XHRwbGF5LnN0YXRlcy5uZXh0KClcblx0XHRwYXVzZS5zdGF0ZXMubmV4dCgpXG5cdFxuXHRtdXNpYy52aWRlbyA9IHBsYXlpbmdTb25nU291cmNlXG5cdFxuXHRwbGF5ZXJTb25nVGl0bGUudGV4dCA9IHBsYXlpbmdTb25nTmFtZVxuXHQjIHByaW50IHBsYXlpbmdTb25nQWxidW1JRFxuXHQjIHByaW50IEFydGlzdC5hbGJ1bXNBcnRpc3RbcGxheWluZ1NvbmdBbGJ1bUlEXVxuXHRwbGF5ZXJTb25nQWxidW0udGV4dCA9IGFsYnVtTW9kZWwudGl0bGUgKyBcIiDigJMgXCIgKyBhbGJ1bU1vZGVsLnllYXJcblx0XG5cdFV0aWxzLmRlbGF5IC4zLCAtPiBcblx0XHRkdXJhdGlvblJpZ2h0Lmh0bWwgPSBcIi1cIiArIFRpbWUudGltZUZyb21TZWNvbmRzIG11c2ljLnBsYXllci5kdXJhdGlvblxuXHRcdHNjcnViYmVyLm1heCA9IH5+bXVzaWMucGxheWVyLmR1cmF0aW9uXG5cdFxuXHRtdXNpYy5wbGF5ZXIucGxheSgpXG5cblxuZXhwb3J0cy5wbGF5RmF2UGxheWxpc3QgPSAoc29uZ0lELCBhbGJ1bU1vZGVsLCBtdXNpYywgcGxheSwgcGF1c2UsIHBsYXllclNvbmdUaXRsZSwgcGxheWVyU29uZ0FsYnVtLCBkdXJhdGlvblJpZ2h0LCBzY3J1YmJlcikgLT5cblx0c29uZ3NOYW1lcyA9IGFsYnVtTW9kZWwuc29uZ3Ncblx0c29uZ3NTb3VyY2UgPSBhbGJ1bU1vZGVsLnNvdXJjZVxuXHRzb25nc0FsYnVtcyA9IGFsYnVtTW9kZWwuYWxidW1zXG5cdFxuXHRzb25nc05hbWVDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc05hbWVzKVxuXHRzb25nc1NvdXJjZUN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzU291cmNlKVxuXHRzb25nQWxidW1JREN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzQWxidW1zKVxuXHRcblx0cGxheWluZ1NvbmdOYW1lID0gXCJcIlxuXHRwbGF5aW5nU29uZ1NvdXJjZSA9IFwiXCJcblx0cGxheWluZ1NvbmdBbGJ1bUlEID0gMFxuXHRmb3IgaSBpbiBbMC4uc29uZ0lEXVxuXHRcdHBsYXlpbmdTb25nTmFtZSA9IHNvbmdzTmFtZUN5Y2xlcigpXG5cdFx0cGxheWluZ1NvbmdTb3VyY2UgPSBzb25nUGF0aCtzb25nc1NvdXJjZUN5Y2xlcigpXG5cdFx0cGxheWluZ1NvbmdBbGJ1bUlEID0gc29uZ0FsYnVtSURDeWNsZXIoKVxuXHRcblx0aWYgcGF1c2Uuc3RhdGVzLmN1cnJlbnQgaXMgXCJoaWRkZW5cIlxuXHRcdHBsYXkuc3RhdGVzLm5leHQoKVxuXHRcdHBhdXNlLnN0YXRlcy5uZXh0KClcblx0XG5cdG11c2ljLnZpZGVvID0gcGxheWluZ1NvbmdTb3VyY2Vcblx0XG5cdHBsYXllclNvbmdUaXRsZS50ZXh0ID0gcGxheWluZ1NvbmdOYW1lXG5cdHBsYXllclNvbmdBbGJ1bS50ZXh0ID0gQXJ0aXN0LmFsYnVtc0FydGlzdFtwbGF5aW5nU29uZ0FsYnVtSURdLnRpdGxlICsgXCIg4oCTIFwiICsgQXJ0aXN0LmFsYnVtc0FydGlzdFtwbGF5aW5nU29uZ0FsYnVtSURdLnllYXJcblx0XG5cdFV0aWxzLmRlbGF5IC4zLCAtPiBcblx0XHRkdXJhdGlvblJpZ2h0Lmh0bWwgPSBcIi1cIiArIFRpbWUudGltZUZyb21TZWNvbmRzIG11c2ljLnBsYXllci5kdXJhdGlvblxuXHRcdHNjcnViYmVyLm1heCA9IH5+bXVzaWMucGxheWVyLmR1cmF0aW9uXG5cdFxuXHRtdXNpYy5wbGF5ZXIucGxheSgpXG5cblxuIiwiIyBHZXR0aW5nIERhdGFcblxuY29uZmlnID0gXCJhcnRpc3RzL3Ryb2xsXCJcblxudmlkZW9Nb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMC5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMS5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcbn1cblxudmlkZW9Nb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMi5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzIubXA0XCJcbn1cblxudmlkZW9Nb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMy5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzMubXA0XCJcbn1cblxudmlkZW9Nb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvNC5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzQubXA0XCJcbn1cblxudmlkZW9Nb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvNS5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzUubXA0XCJcbn1cblxuXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMiwgdmlkZW9Nb2RlbDMsIHZpZGVvTW9kZWw0LCB2aWRlb01vZGVsNV0iLCIjIEdldHRpbmcgRGF0YVxuXG5jb25maWcgPSBcImFydGlzdHMvdHJvbGxcIlxuXG5zb25nTW9kZWwwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8wLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMC5qcGdcIlxufVxuXG5zb25nTW9kZWwxID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMS5qcGdcIlxufVxuXG5zb25nTW9kZWwyID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8yLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzIuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMi5qcGdcIlxufVxuXG5zb25nTW9kZWwzID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8zLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzMuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMy5qcGdcIlxufVxuXG5zb25nTW9kZWw0ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC80LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzQuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNC5qcGdcIlxufVxuXG5zb25nTW9kZWw1ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC81LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzUuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNS5qcGdcIlxufVxuXG5zb25nTW9kZWw2ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC82LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzYuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNi5qcGdcIlxufVxuXG5zb25nTW9kZWw3ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC83LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzcuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvNy5qcGdcIlxufVxuXG5zb25nTW9kZWw4ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC84LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzguanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOC5qcGdcIlxufVxuXG5zb25nTW9kZWw5ID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC85LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzkuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvOS5qcGdcIlxufVxuXG5zb25nTW9kZWwxMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMTAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMTAuanBnXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi9uZXdzL3RleHQvMTAuanBnXCJcbn1cblxuZXhwb3J0cy5mZWVkRGF0YSA9IFtzb25nTW9kZWwwLCBzb25nTW9kZWwxLCBzb25nTW9kZWwyLCBzb25nTW9kZWwzLCBzb25nTW9kZWw0LCBzb25nTW9kZWw1LCBzb25nTW9kZWw2LCBzb25nTW9kZWw3LCBzb25nTW9kZWw4LCBzb25nTW9kZWw5LCBzb25nTW9kZWwxMF0iLCIjIEdldHRpbmcgRGF0YVxuXG5jb25maWcgPSBcImFydGlzdHMvdHJvbGxcIlxuXG5hbGJ1bU1vZGVsMSA9IHsgXG5cdHRpdGxlOiBcIkVtb3Rpb25hbCA4XCJcblx0eWVhcjogXCIyMDE0XCJcblx0XG5cdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG5cdFxuXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcblx0dGludENvbG9yOiBcImdyZXlcIlxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxufVxuXG5hbGJ1bU1vZGVsMiA9IHsgXG5cdHRpdGxlOiBcIk1heSAxM1wiXG5cdHllYXI6IFwiMjAxNFwiXG5cdFxuXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuXHRcblx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG5cdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cbn1cblxuYWxidW1Nb2RlbDMgPSB7IFxuXHR0aXRsZTogXCJFbW90aW9uYWwgOFwiXG5cdHllYXI6IFwiMjAxNFwiXG5cdFxuXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG5cdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuXHRcblx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG5cdHRpbnRDb2xvcjogXCJncmV5XCJcblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cbn1cblxuXG5cblxuXG5leHBvcnRzLmFsYnVtc0RhdGEgPSBbYWxidW1Nb2RlbDEsIGFsYnVtTW9kZWwyLCBhbGJ1bU1vZGVsM11cbmV4cG9ydHMuZmF2TGlzdCA9IHsgXHRcblx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIl1cblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxuXHRcblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiXVxuXHRhbGJ1bXM6IFswLCAxLCAyLCAwLCAwLCAxLCAyLCAyLCAxLCAwXVxufVxuXG5cbiIsImNvbmZpZyA9IFwiYXJ0aXN0cy90cm9sbFwiXG5cbmdyZXlzX3doaXRlID0gXCIjRkZGRkZGXCJcbmdyZXlzX3ByZV93aGl0ZSA9IFwiI0Y3RjdGN1wiXG5ncmV5c191bHRyYV9saWdodCA9IFwiI0VFRUVFRVwiXG5ncmV5c19saWdodGVzdCA9IFwiI0RERERERFwiXG5ncmV5c19saWdodGVyID0gXCIjQ0NDQ0NDXCJcbmdyZXlzX2Jhc2UgPSBcIiM5OTk5OTlcIlxuZ3JleXNfZGFya2VyID0gXCIjNjY2NjY2XCJcbmdyZXlzX2Rhcmtlc3QgPSBcIiMyMjIyMjJcIlxuZ3JleXNfYmxhY2sgPSBcIiMwMDAwMDBcIlxuXG5cbmV4cG9ydHMuY29sb3JUaGVtZSA9IHtcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZDogXCJibGFja1wiXG5cdG5hdmlnYXRpb25fb3ZlcmxheV9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGRhcmtlci5wbmdcIlxuXHQjIG5hdmlnYXRpb25faGVhZGVyX3RleHQ6IFwiI0ZGRkZGRlwiXG5cdFxuXHRuYXZpZ2F0aW9uX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL2JnLnBuZ1wiXG5cdG5hdmlnYXRpb25fc2hhZG93OiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdG5hdmlnYXRpb25fc2Nyb2xsX2JhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjEpXCJcblx0IyBuYXZpZ2F0aW9uX2JsdXI6IFwiI0ZGRkZGRlwiXG5cdCMgbmF2aWdhdGlvbl9jYXJkX292ZXJsYXlfYmFja2dyb3VuZDogXCIjRkZGRkZGXCJcblxuXHRwbGF5ZXJfYmFja2dyb3VuZDogXCJyZ2JhKDI5LDI5LDI5LDEpXCJcblx0cGxheWVyX3Byb2dyZXNzX2Jhc2U6IFwiIzY2NjY2NlwiXG5cdHBsYXllcl9wcm9ncmVzc19maWxsZWQ6IFwiI0FGMTQxN1wiXG5cdHBsYXllcl9zb25nX3RpdGxlOiBcIiNGRkZGRkZcIlxuXHRwbGF5ZXJfYWxidW1fdGl0bGU6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjUpXCJcblx0cGxheWVyX3NoYWRvd3M6IFwicmdiYSgwLDAsMCwwLjUpXCJcblxuXHRhbGJ1bV9zaGFkb3c6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0ZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZDogXCIjMjIyXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aXRsZTogXCIjRkZGRkZGXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ19udW1iZXI6IFwiIzk5OVwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGltZTogXCIjOTk5XCJcblx0ZmF2X3NvbmdzX3RpdGxlOiBcInJnYmEoMjU1LDI1NSwyNTUsMC41KVwiXG59IiwiY29uZmlnID0gXCJhcnRpc3RzL3Ryb2xsXCJcblxuZ3JleXNfd2hpdGUgPSBcIiNGRkZGRkZcIlxuZ3JleXNfcHJlX3doaXRlID0gXCIjRjdGN0Y3XCJcbmdyZXlzX3VsdHJhX2xpZ2h0ID0gXCIjRUVFRUVFXCJcbmdyZXlzX2xpZ2h0ZXN0ID0gXCIjREREREREXCJcbmdyZXlzX2xpZ2h0ZXIgPSBcIiNDQ0NDQ0NcIlxuZ3JleXNfYmFzZSA9IFwiIzk5OTk5OVwiXG5ncmV5c19kYXJrZXIgPSBcIiM2NjY2NjZcIlxuZ3JleXNfZGFya2VzdCA9IFwiIzIyMjIyMlwiXG5ncmV5c19ibGFjayA9IFwiIzAwMDAwMFwiXG5cblxuZXhwb3J0cy5jb2xvclRoZW1lID0ge1xuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kOiBcIndoaXRlXCJcblx0bmF2aWdhdGlvbl9vdmVybGF5X2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gZGFya2VyLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9oZWFkZXJfdGV4dDogXCIjRkZGRkZGXCJcblx0XG5cdG5hdmlnYXRpb25fYmFja2dyb3VuZDogY29uZmlnICsgXCIvYmcucG5nXCJcblx0bmF2aWdhdGlvbl9zaGFkb3c6IFwicmVkXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfYmFja2dyb3VuZDogXCJyZWRcIlxuXHQjIG5hdmlnYXRpb25fYmx1cjogXCIjRkZGRkZGXCJcblx0IyBuYXZpZ2F0aW9uX2NhcmRfb3ZlcmxheV9iYWNrZ3JvdW5kOiBcIiNGRkZGRkZcIlxuXG5cdHBsYXllcl9iYWNrZ3JvdW5kOiBcInJlZFwiXG5cdHBsYXllcl9wcm9ncmVzc19iYXNlOiBcImJsdWVcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfZmlsbGVkOiBcImdyZWVuXCJcblx0cGxheWVyX3NvbmdfdGl0bGU6IFwieWVsbG93XCJcblx0cGxheWVyX2FsYnVtX3RpdGxlOiBcImJsdWVcIlxuXHRwbGF5ZXJfc2hhZG93czogXCJncmVlblwiXG5cblx0YWxidW1fc2hhZG93OiBcInllbGxvd1wiXG5cdGRldGFpbGVkX2FsYnVtX2JhY2tncm91bmQ6IFwiZ3JleVwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGU6IFwicmVkXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ19udW1iZXI6IFwiYmx1ZVwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGltZTogXCJyZWRcIlxuXHRmYXZfc29uZ3NfdGl0bGU6IFwid2hpdGVcIlxufSIsImNsYXNzIGV4cG9ydHMuTmV3cyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMubmV3c0lEID89IC0xXG5cdFx0QG9wdGlvbnMubmV3c0ltYWdlID89IC0xXG5cdFx0QG9wdGlvbnMubmV3c1RleHRJbWFnZSA/PSAtMVxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRALmJvcmRlclJhZGl1cyA9IDhcblx0XHRcblx0QGRlZmluZSAnbmV3c0lEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLm5ld3NJRCA9IHZhbHVlXG5cdFx0XHRcblx0QGRlZmluZSAnbmV3c0ltYWdlJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSW1hZ2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLm5ld3NJbWFnZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICduZXdzVGV4dEltYWdlJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzVGV4dEltYWdlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzVGV4dEltYWdlID0gdmFsdWVcblx0IiwiY2xhc3MgZXhwb3J0cy5OYXYgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLm5hdklEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAnbmF2SUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLm5hdklEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uYXZJRCA9IHZhbHVlXG5cblxuXHRcdFx0IiwiXG5sb2NhbERpc2FwcGVhclRpbWUgPSAwLjM0XG5sb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5sb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmUgPSBcImN1YmljLWJlemllciguMzIsLjkyLC45MiwuOTkpXCJcblxuQXJ0aXN0ID0gcmVxdWlyZSBcImFydGlzdFwiXG5jb25maWcgPSBBcnRpc3QuY29uZmlnXG5cbntQbGF5bGlzdH0gPSByZXF1aXJlIFwicGxheWxpc3RcIlxuXG5cbmNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyA9IChuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0Y2xvc2VEZXRhaWxlZFZpZXcobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IsIDExMzYpXG5cbmNsb3NlRGV0YWlsZWRWaWV3T25lV2F5ID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRjbG9zZURldGFpbGVkVmlldyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvciwgLTExMzYpXG5cblxuXG5jbG9zZURldGFpbGVkVmlldyA9IChuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvciwgdmFsdWVZKSAtPlxuXHRcblx0bmV3c0RldGFpbGVkVG9wVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IC04OCozXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogdmFsdWVZXG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0cGxheWxpc3REZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFxuXHRzdGF0dXNfYmFyX2NvbG9yLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIFwiMSlcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcblx0VXRpbHMuZGVsYXkgbG9jYWxEaXNhcHBlYXJUaW1lICsgMC4wMiwgLT5cblx0XHRwbGF5bGlzdERldGFpbGVkVmlldy5kZXN0cm95KClcblxuXG5cblxuXG5cblxuZXhwb3J0cy5jcmVhdGVQbGF5bGlzdERldGFpbGVkUGFnZSA9IChwbGF5bGlzdElELCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRwbGF5bGlzdE1vZGVsID0gQXJ0aXN0LnBsYXlsaXN0c0RhdGFbcGxheWxpc3RJRF1cblx0IyBwcmludCBwbGF5bGlzdE1vZGVsLmltYWdlXG5cdFxuXHRwbGF5bGlzdERldGFpbGVkVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzZcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFxuXHRcblx0IyBwbGF5bGlzdERldGFpbGVkVmlldy5vbiBFdmVudHMuVGFwLCAoZXZlbnQsIGxheWVyKSAtPlxuIyBcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiMgXHRcdHByaW50IFwiaW5zaWRlICN7dGFwfVwiXG5cblx0bmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogcGxheWxpc3REZXRhaWxlZFZpZXdcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiA4OCoyXG5cdFx0eTogLTg4KjJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdGltYWdlOiBwbGF5bGlzdE1vZGVsLmltYWdlXG5cblx0Ymx1ckRldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXHRcdHdpZHRoOiBuZXdzRGV0YWlsZWRUb3BWaWV3LndpZHRoXG5cdFx0aGVpZ2h0OiBuZXdzRGV0YWlsZWRUb3BWaWV3LmhlaWdodFxuXHRcdGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9ibHVyX2NvbG9yXG5cblx0Ymx1ckRldGFpbGVkVG9wVmlldy5zdHlsZSA9XG5cdFx0XHQnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2JsdXJfcmFkaXVzXG5cblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0KjJcblx0XHRoZWlnaHQ6IDY0KjJcblx0XHR4OiAwXG5cdFx0eTogMjAqMlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDApXCJcblx0XHRpbWFnZTogY29uZmlnICsgXCIvY2xvc2VOZXdzUGFnZS5wbmdcIlxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXG5cdHNoYXJlTmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiAyNDRcblx0XHRoZWlnaHQ6IDcyXG5cdFx0eDogMzc2XG5cdFx0eTogNzJcblx0XHRpbWFnZTogY29uZmlnICsgXCIvc2hhcmVOZXdzRGV0YWlsZWRWaWV3LnBuZ1wiXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cdFxuXHRcblxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnQgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2LTg4KjItNjAqMlxuXHRcdHk6IDExMzZcblx0XHRwYXJlbnQ6IHBsYXlsaXN0RGV0YWlsZWRWaWV3XG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJiZ2EoMCwwLDAsMClcIlxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRcblx0XHRzcGVlZFk6IDAuOFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2VcblxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRUZXh0VmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDE2ODBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdCMgeTogbmV3c0RldGFpbGVkQ29udGVudEltYWdlLmhlaWdodFxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50XG5cblx0bmV3c0RldGFpbGVkQ29udGVudFRleHRJbWFnZSA9IG5ldyBQbGF5bGlzdFxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkQ29udGVudFRleHRWaWV3XG5cdFx0cGxheWxpc3RJRDogcGxheWxpc3RJRFxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDE2ODBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdGltYWdlOiBwbGF5bGlzdE1vZGVsLnRleHRJbWFnZVxuXG5cdFxuXHRcblx0XG5cdCMgb3BlbmluZyBhbmltYXRpb25zXG5cdFxuXHRuZXdzRGV0YWlsZWRUb3BWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogMFxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogODgqMlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFx0IyBjdXJ2ZTogXCJjdWJpYy1iZXppZXIoLjAxLDEsLjc4LC44OSlcIlxuXHRcdFxuXHRwbGF5bGlzdERldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdFxuXHRcblx0c3RhdHVzX2Jhcl9jb2xvci5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBcIjApXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXG5cblxuXHRnYXBCb3R0b20gPSAtODYwXG5cdGdhcFRvcCA9IDBcblx0Z2FwRGVsdGEgPSAyMDBcblx0XG5cdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0VXRpbHMuZGVsYXkgbG9jYWxEaXNhcHBlYXJUaW1lLCAtPlxuXHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gdHJ1ZVxuXHRcblx0XG5cdFxuXHQjIGNsb3NlIHZpZXdcblx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5vbiBFdmVudHMuTW92ZSwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA+IGdhcFRvcCAmJiBpc05ld3NWaWV3TW9kdWxhdGluZ1xuXHRcdFx0Ym91bmRzID0gW2dhcFRvcCwgZ2FwVG9wK2dhcERlbHRhXVxuXHRcdFx0bmV3c0RldGFpbGVkVG9wVmlldy55ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAsIC04OF0sIHRydWUpIFxuXHRcdFx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdHNoYXJlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMC45LCAwXSwgdHJ1ZSlcblx0XHRcdHBsYXlsaXN0RGV0YWlsZWRWaWV3LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCxcIiArIGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSArIFwiKVwiXG5cdFx0XHRsb2NhbFN0YXR1c0JhckFydGlzdCA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAxXSwgdHJ1ZSlcblx0XHRcdHN0YXR1c19iYXJfY29sb3IuYmFja2dyb3VuZENvbG9yID0gQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIGxvY2FsU3RhdHVzQmFyQXJ0aXN0ICsgXCIpXCJcblx0XHRcdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPCBnYXBCb3R0b20gJiYgaXNOZXdzVmlld01vZHVsYXRpbmdcblx0XHRcdGJvdW5kcyA9IFtnYXBCb3R0b20sIGdhcEJvdHRvbS1nYXBEZWx0YV1cblx0XHRcdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0bG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAuOSwgMF0sIHRydWUpXG5cdFx0XHRwbGF5bGlzdERldGFpbGVkVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgKyBcIilcIlxuXHRcdFx0bG9jYWxTdGF0dXNCYXJBcnRpc3QgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMCwgMV0sIHRydWUpXG5cdFx0XHRzdGF0dXNfYmFyX2NvbG9yLmJhY2tncm91bmRDb2xvciA9IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBsb2NhbFN0YXR1c0JhckFydGlzdCArIFwiKVwiXG5cdFxuXHRcblx0XG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwub24gRXZlbnRzLlNjcm9sbEVuZCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHQjIHByaW50IG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPCBnYXBCb3R0b20gLSBnYXBEZWx0YSAvIDUgKiAyXG5cdFx0XHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0XHRcdCMgY2xvc2VEZXRhaWxlZFZpZXcocGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XHRjbG9zZURldGFpbGVkVmlld09uZVdheShuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBwbGF5bGlzdERldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcblx0XHRpZiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSA+IGdhcFRvcCArIGdhcERlbHRhIC8gNSAqIDJcblx0XHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdFx0Y2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIHBsYXlsaXN0RGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcblx0XG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdGlzTmV3c1ZpZXdNb2R1bGF0aW5nID0gZmFsc2Vcblx0XHRjbG9zZURldGFpbGVkVmlld1R3b1dheXMobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgcGxheWxpc3REZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XG5cdFx0cGxheWxpc3REZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0XHRcblx0XHRcblx0XG5cdFxuXHRyZXR1cm4gW3BsYXlsaXN0RGV0YWlsZWRWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50VGV4dEltYWdlXSIsIiMgbG9jYWxEaXNhcHBlYXJUaW1lID0gMC41XG4jIGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmUgPSBcImN1YmljLWJlemllciguMDYsLjgxLDAsLjkzKVwiXG4jIGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4wNiwuODEsLjc5LC45OSlcIlxubG9jYWxEaXNhcHBlYXJUaW1lID0gMC4zNFxubG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxubG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5cbkFydGlzdCA9IHJlcXVpcmUgXCJhcnRpc3RcIlxuY29uZmlnID0gQXJ0aXN0LmNvbmZpZ1xuXG5cbmNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyA9IChuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRjbG9zZURldGFpbGVkVmlldyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yLCAxMTM2KVxuXG5cbmNsb3NlRGV0YWlsZWRWaWV3T25lV2F5ID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdGNsb3NlRGV0YWlsZWRWaWV3KG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IsIC0xMTM2KVxuXG5cbmNsb3NlRGV0YWlsZWRWaWV3ID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IsIHZhbHVlWSkgLT5cblx0XG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAtODgqM1xuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IHZhbHVlWVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XG5cdG5ld3NEZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFxuXHRzdGF0dXNfYmFyX2NvbG9yLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIFwiMSlcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcblx0VXRpbHMuZGVsYXkgbG9jYWxEaXNhcHBlYXJUaW1lKzAuMDIsIC0+XG5cdFx0bmV3c0RldGFpbGVkVmlldy5kZXN0cm95KClcblxuXG5cblxuXG5cblxuZXhwb3J0cy5jcmVhdGVOZXdzRGV0YWlsZWRQYWdlID0gKG5ld3NBcnRpc3RNb2RlbCwgc3RhdHVzX2Jhcl9jb2xvcikgLT5cblx0IyBwcmludCBuZXdzQXJ0aXN0TW9kZWwuaW1hZ2Vcblx0XG5cdG5ld3NEZXRhaWxlZFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcblx0bmV3c0RldGFpbGVkVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdCMgc2tpcCB0YXBzXG5cblx0bmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDg4KjJcblx0XHR5OiAtODgqMlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0aW1hZ2U6IG5ld3NBcnRpc3RNb2RlbC5pbWFnZVxuXG5cdGJsdXJEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFRvcFZpZXdcblx0XHR3aWR0aDogbmV3c0RldGFpbGVkVG9wVmlldy53aWR0aFxuXHRcdGhlaWdodDogbmV3c0RldGFpbGVkVG9wVmlldy5oZWlnaHRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25fYmx1cl9jb2xvclxuXG5cdGJsdXJEZXRhaWxlZFRvcFZpZXcuc3R5bGUgPVxuXHRcdFx0Jy13ZWJraXQtYmFja2Ryb3AtZmlsdGVyJzogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9ibHVyX3JhZGl1c1xuXG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NCoyXG5cdFx0aGVpZ2h0OiA2NCoyXG5cdFx0eDogMFxuXHRcdHk6IDIwKjJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFx0aW1hZ2U6IGNvbmZpZyArIFwiL2Nsb3NlTmV3c1BhZ2UucG5nXCJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZFRvcFZpZXdcblxuXHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogMjQ0XG5cdFx0aGVpZ2h0OiA3MlxuXHRcdHg6IDM3NlxuXHRcdHk6IDcyXG5cdFx0aW1hZ2U6IGNvbmZpZyArIFwiL3NoYXJlTmV3c0RldGFpbGVkVmlldy5wbmdcIlxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXHRcblx0XG5cblxuXHRuZXdzRGV0YWlsZWRDb250ZW50ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHR5OiAxMTM2XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRWaWV3XG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJiZ2EoMCwwLDAsMClcIlxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRcblx0XHRzcGVlZFk6IDAuOFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2VcblxuXHQjIG5ld3NEZXRhaWxlZENvbnRlbnRJbWFnZSA9IG5ldyBMYXllclxuIyBcdFx0d2lkdGg6IDY0MFxuIyBcdFx0aGVpZ2h0OiA0ODBcbiMgXHRcdHBhcmVudDogbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50XG4jIFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuIyBcdFx0aW1hZ2U6IG5ld3NBcnRpc3RNb2RlbC5pbWFnZVxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRUZXh0VmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDE2ODBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXHRcdCMgeTogbmV3c0RldGFpbGVkQ29udGVudEltYWdlLmhlaWdodFxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50XG5cblx0bmV3c0RldGFpbGVkQ29udGVudFRleHRJbWFnZSA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkQ29udGVudFRleHRWaWV3XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTY4MFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0aW1hZ2U6IG5ld3NBcnRpc3RNb2RlbC50ZXh0SW1hZ2VcblxuXHRcblx0XG5cdFxuXHQjIG9wZW5pbmcgYW5pbWF0aW9uc1xuXHRcblx0bmV3c0RldGFpbGVkVG9wVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDg4KjJcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcdCMgY3VydmU6IFwiY3ViaWMtYmV6aWVyKC4wMSwxLC43OCwuODkpXCJcblx0XHRcblx0bmV3c0RldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdFxuXHRcblx0c3RhdHVzX2Jhcl9jb2xvci5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBiYWNrZ3JvdW5kQ29sb3I6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3IgKyBcIjApXCIgfVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXG5cblxuXHRnYXBCb3R0b20gPSAtODYwXG5cdGdhcFRvcCA9IDEwXG5cdGdhcERlbHRhID0gMjAwXG5cdFxuXHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSwgLT5cblx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IHRydWVcblx0XG5cdFxuXHRcblx0IyBjbG9zZSB2aWV3XG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwub24gRXZlbnRzLk1vdmUsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPiBnYXBUb3AgJiYgaXNOZXdzVmlld01vZHVsYXRpbmdcblx0XHRcdGJvdW5kcyA9IFtnYXBUb3AsIGdhcFRvcCtnYXBEZWx0YV1cblx0XHRcdG5ld3NEZXRhaWxlZFRvcFZpZXcueSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAtODhdLCB0cnVlKSBcblx0XHRcdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0bG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAuOSwgMF0sIHRydWUpXG5cdFx0XHRuZXdzRGV0YWlsZWRWaWV3LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCxcIiArIGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSArIFwiKVwiXG5cdFx0XHRsb2NhbFN0YXR1c0JhckFydGlzdCA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAxXSwgdHJ1ZSlcblx0XHRcdHN0YXR1c19iYXJfY29sb3IuYmFja2dyb3VuZENvbG9yID0gQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIGxvY2FsU3RhdHVzQmFyQXJ0aXN0ICsgXCIpXCJcblx0XHRcdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPCBnYXBCb3R0b20gJiYgaXNOZXdzVmlld01vZHVsYXRpbmdcblx0XHRcdGJvdW5kcyA9IFtnYXBCb3R0b20sIGdhcEJvdHRvbS1nYXBEZWx0YV1cblx0XHRcdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0bG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAuOSwgMF0sIHRydWUpXG5cdFx0XHRuZXdzRGV0YWlsZWRWaWV3LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCxcIiArIGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSArIFwiKVwiXG5cdFx0XHRsb2NhbFN0YXR1c0JhckFydGlzdCA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAxXSwgdHJ1ZSlcblx0XHRcdHN0YXR1c19iYXJfY29sb3IuYmFja2dyb3VuZENvbG9yID0gQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIGxvY2FsU3RhdHVzQmFyQXJ0aXN0ICsgXCIpXCJcblx0XG5cdFxuXHRcblx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5vbiBFdmVudHMuU2Nyb2xsLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55IDwgZ2FwQm90dG9tIC0gZ2FwRGVsdGEgLyA1ICogMlxuXHRcdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0XHRjbG9zZURldGFpbGVkVmlld09uZVdheShuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3LCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55ID4gZ2FwVG9wICsgZ2FwRGVsdGEgLyA1ICogMlxuXHRcdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0XHRjbG9zZURldGFpbGVkVmlld1R3b1dheXMobmV3c0RldGFpbGVkVG9wVmlldywgbmV3c0RldGFpbGVkQ29udGVudCwgbmV3c0RldGFpbGVkVmlldywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XG5cdFxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub24gRXZlbnRzLlRhcCwgLT5cblx0XHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0Y2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcsIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XG5cdFx0bmV3c0RldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0XHRcdFxuXHRcdFxuXHRcblx0XG5cdHJldHVybiBuZXdzRGV0YWlsZWRWaWV3IiwiU29uZ0NyZWF0b3IgPSByZXF1aXJlICdjcmVhdGVfc29uZydcbkFydGlzdCA9IHJlcXVpcmUgXCJhcnRpc3RcIlxue1RleHRMYXllcn0gPSByZXF1aXJlIFwidGV4dFwiXG5jb25maWcgPSBBcnRpc3QuY29uZmlnXG5cbmxvY2FsRGlzYXBwZWFyVGltZSA9IDAuMlxubG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxubG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5cblxuYW5pbWF0ZURldGFpbGVkQWxidW1QYWdlID0gKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1ksIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlLndpZHRoID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbNjQwLCBvZmZzZXRWYWx1ZS53aWR0aF0sIHRydWUpXG5cdGFsYnVtX2Zha2VfaW1hZ2UuaGVpZ2h0ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbNjQwLCBvZmZzZXRWYWx1ZS5oZWlnaHRdLCB0cnVlKVxuXHRhbGJ1bV9mYWtlX2ltYWdlLnggPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLCBvZmZzZXRWYWx1ZS54XSwgdHJ1ZSlcblx0YWxidW1fZmFrZV9pbWFnZS55ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMCwgb2Zmc2V0VmFsdWUueV0sIHRydWUpXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC40XSlcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIud2lkdGggPSBhbGJ1bV9mYWtlX2ltYWdlLndpZHRoXG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLmhlaWdodCA9IGFsYnVtX2Zha2VfaW1hZ2UuaGVpZ2h0XG5cdFx0XG5cdGxvY2FsQXJ0aXN0ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMC44LCAwXSwgdHJ1ZSlcblx0ZGV0YWlsZWRBbGJ1bVZpZXcuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLFwiICsgbG9jYWxBcnRpc3QgKyBcIilcIlxuXG5cdGxvY2FsU3RhdHVzQmFyQXJ0aXN0ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMCwgMV0sIHRydWUpXG5cdCMgcHJpbnQgQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIGxvY2FsU3RhdHVzQmFyQXJ0aXN0ICsgXCIpXCJcblx0c3RhdHVzX2Jhcl9jb2xvci5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiICsgQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIGxvY2FsU3RhdHVzQmFyQXJ0aXN0ICsgXCIpXCJcblx0XG5cdGZvciBpdGVtLGkgaW4gYWxidW1PcHRpb25zXG5cdFx0aXRlbS5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC40XSlcblx0XHRpdGVtLnkgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFthbGJ1bU9wdGlvbnNZW2ldLCBhbGJ1bU9wdGlvbnNZW2ldK29mZnNldFZhbHVlLnkgLyAyICsgKGkrMSkgKiAyMF0pXG5cblxuY2xvc2VEZXRhaWxlZEFsYnVtUGFnZSA9IChhbGJ1bVNvbmdzVmlldywgYWxidW1fZmFrZV9pbWFnZSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIG9mZnNldFZhbHVlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBzdGF0dXNfYmFyX2NvbG9yKSAtPlxuXHRcblx0YWxidW1Tb25nc1ZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAxMTM2XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZS5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHdpZHRoOiBvZmZzZXRWYWx1ZS53aWR0aCwgaGVpZ2h0OiBvZmZzZXRWYWx1ZS5oZWlnaHQsIHg6IG9mZnNldFZhbHVlLngsIHk6IG9mZnNldFZhbHVlLnlcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdG9wYWNpdHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XG5cdGRldGFpbGVkQWxidW1WaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIn1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XG5cdGZvciBpdGVtIGluIGFsYnVtT3B0aW9uc1xuXHRcdGl0ZW0uYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczogeyBvcGFjaXR5OiAwLCB5OiBpdGVtLnkgKyA2MH1cblx0XHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDRcblx0XG5cdHN0YXR1c19iYXJfY29sb3IuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgYmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yICsgXCIxKVwiIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0XG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSswLjAyLCAtPlxuXHRcdGRldGFpbGVkQWxidW1WaWV3LmRlc3Ryb3koKVxuXG5cblxuXG5cbiMgQ29tcG9zZSBEZXRhaWxlZCBWaWV3XHRcbmV4cG9ydHMuY3JlYXRlRGV0YWlsZWRBbGJ1bVBhZ2UgPSAoYWxidW1JRCwgb2Zmc2V0VmFsdWUsIHN0YXR1c19iYXJfY29sb3IpIC0+XG5cdFxuXHRkZXRhaWxlZEFsYnVtVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzZcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFxuXHRkZXRhaWxlZEFsYnVtVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdCMgaWdub3JlIG90aGVyIHRhcHNcblxuXG5cblxuXHRhbGJ1bV9mYWtlX2ltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHdpZHRoOiBvZmZzZXRWYWx1ZS53aWR0aFxuXHRcdGhlaWdodDogb2Zmc2V0VmFsdWUuaGVpZ2h0XG5cdFx0eDogb2Zmc2V0VmFsdWUueFxuXHRcdHk6IG9mZnNldFZhbHVlLnlcblx0XHRpbWFnZTogXCIje0FydGlzdC5hbGJ1bXNEYXRhW2FsYnVtSURdLmltYWdlfVwiXG5cblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IGFsYnVtX2Zha2VfaW1hZ2Vcblx0XHRvcGFjaXR5OiAwXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogNjQwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5uYXZpZ2F0aW9uX2JsdXJfY29sb3Jcblx0XG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLnN0eWxlID1cblx0XHRcdCctd2Via2l0LWJhY2tkcm9wLWZpbHRlcic6IEFydGlzdC5jb2xvclRoZW1lLm5hdmlnYXRpb25fYmx1cl9yYWRpdXNcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRhbGJ1bVRpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogZGV0YWlsZWRBbGJ1bVZpZXdcblx0XHR0ZXh0OiBcIiN7QXJ0aXN0LmFsYnVtc0RhdGFbYWxidW1JRF0udGl0bGV9XCJcblx0XHR3aWR0aDogMjkyKjJcblx0XHRoZWlnaHQ6IDQ4XG5cdFx0eDogMjhcblx0XHR5OiA4NCoyXG5cdFx0Zm9udFNpemU6IDQwXG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0Y29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX3RpdGxlXG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cdFx0b3BhY2l0eTogMFxuXHRcblx0YWxidW1ZZWFyID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogZGV0YWlsZWRBbGJ1bVZpZXdcblx0XHR0ZXh0OiBcIiN7QXJ0aXN0LmFsYnVtc0RhdGFbYWxidW1JRF0ueWVhcn1cIlxuXHRcdHdpZHRoOiAyOTIqMlxuXHRcdGhlaWdodDogNDhcblx0XHR4OiAyOFxuXHRcdHk6IDExNCoyXG5cdFx0Zm9udFNpemU6IDMyXG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0Y29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX3llYXJcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblx0XHRvcGFjaXR5OiAwXG5cdFxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNzJcblx0XHRoZWlnaHQ6IDcyXG5cdFx0eDogMTQyKjJcblx0XHR5OiAzNCoyXG5cdFx0aW1hZ2U6IGNvbmZpZyArIFwiL2Nsb3NlQWxidW0ucG5nXCJcblx0XHRwYXJlbnQ6IGRldGFpbGVkQWxidW1WaWV3XG5cdFx0b3BhY2l0eTogMFxuXHRcblx0YWxidW1Tb25nc1ZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IGRldGFpbGVkQWxidW1WaWV3XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogNzA4XG5cdFx0eTogMTEzNlxuXHRcdGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUuZGV0YWlsZWRfYWxidW1fYmFja2dyb3VuZFxuXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0YWxidW1PcHRpb25zID0gW2FsYnVtWWVhciwgYWxidW1UaXRsZSwgY2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3XVxuXHRhbGJ1bU9wdGlvbnNZID0gW2FsYnVtWWVhci55LCBhbGJ1bVRpdGxlLnksIGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy55XVxuXG5cdGFsYnVtX2Zha2VfaW1hZ2UuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR3aWR0aDogNjQwLCBoZWlnaHQ6IDY0MCwgeDogMCwgeTogMFxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5hbmltYXRlXG5cdFx0cHJvcGVydGllczogeyBvcGFjaXR5OiAxIH1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRkZWxheTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFxuXHRmb3IgaXRlbSBpbiBhbGJ1bU9wdGlvbnNcblx0XHRpdGVtLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6IHsgb3BhY2l0eTogMSB9XG5cdFx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0XHRkZWxheTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0XG5cdGRldGFpbGVkQWxidW1WaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC44KVwifVxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRkZWxheTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXG5cdGFsYnVtU29uZ3NWaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0eTogMzA4XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblx0XHRkZWxheTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gNFxuXG5cdFxuXHRzdGF0dXNfYmFyX2NvbG9yLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7IGJhY2tncm91bmRDb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUubmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvciArIFwiMClcIiB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmVcblxuXG5cblxuXG5cblx0IyBDb21wb3NlIHNvbmcgZm9yIGFsYnVtXG5cdHNvbmdzU2Nyb2xsVmlldyA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiA3MDhcblx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdHBhcmVudDogYWxidW1Tb25nc1ZpZXdcblx0XHR5OiAyMFxuXHRcdHNwZWVkWTogMC44XG5cblx0c29uZ3MgPSBTb25nQ3JlYXRvci5jcmVhdGVTb25nc0ZvckFsYnVtKGFsYnVtSUQpXG5cdHNvbmdSZXN1bHRIZWlnaHQgPSAwXG5cdGZvciBzb25nLGkgaW4gc29uZ3Ncblx0XHRzb25nLnkgPSBpICogODBcblx0XHRzb25nUmVzdWx0SGVpZ2h0ID0gc29uZy55ICsgc29uZy5oZWlnaHRcblx0XHRzb25nLnBhcmVudCA9IHNvbmdzU2Nyb2xsVmlldy5jb250ZW50XG5cdFxuXHRcblx0XG5cdFxuXHQjIENsb3NlIEFsYnVtIFZpZXdcblx0Y2xvc2luZ0FsYnVtVmlldyA9IGZhbHNlXG5cdGJvdW5kcyA9IFsyMCwgMjIwXVxuXHRib3VuZHNCb3R0b20gPSBbLShzb25nUmVzdWx0SGVpZ2h0IC0gc29uZ3NTY3JvbGxWaWV3LmhlaWdodCArIGJvdW5kc1swXSksIC0oc29uZ1Jlc3VsdEhlaWdodCAtIHNvbmdzU2Nyb2xsVmlldy5oZWlnaHQgKyBib3VuZHNbMV0pXVxuXHRcblx0c29uZ3NTY3JvbGxWaWV3Lm9uIEV2ZW50cy5TY3JvbGwsIC0+XG5cdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA+IGJvdW5kc1swXVxuXHRcdFx0YW5pbWF0ZURldGFpbGVkQWxidW1QYWdlKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1ksIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA8IGJvdW5kc0JvdHRvbVswXVxuXHRcdFx0YW5pbWF0ZURldGFpbGVkQWxidW1QYWdlKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzQm90dG9tLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1ksIHN0YXR1c19iYXJfY29sb3IpXG5cblx0XHRcdFxuXHRcblxuXG5cblx0c29uZ3NTY3JvbGxWaWV3Lm9uIEV2ZW50cy5TY3JvbGxFbmQsIC0+XG5cdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA+IChib3VuZHNbMV0tYm91bmRzWzBdKSAvIDUgKiAyXG5cdFx0XHRzb25nc1Njcm9sbFZpZXcuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0Y2xvc2luZ0FsYnVtVmlldyA9IHRydWVcblx0XHRcdGNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgc3RhdHVzX2Jhcl9jb2xvcilcblx0XHRcblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55IDwgKGJvdW5kc0JvdHRvbVsxXS1ib3VuZHNCb3R0b21bMF0pIC8gNSAqIDIgKyBib3VuZHNCb3R0b21bMF1cblx0XHRcdHNvbmdzU2Nyb2xsVmlldy5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRjbG9zaW5nQWxidW1WaWV3ID0gdHJ1ZVxuXHRcdFx0Y2xvc2VEZXRhaWxlZEFsYnVtUGFnZShhbGJ1bVNvbmdzVmlldywgYWxidW1fZmFrZV9pbWFnZSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIG9mZnNldFZhbHVlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcdFxuXHRcblx0XG5cdHNvbmdzU2Nyb2xsVmlldy5vbiBFdmVudHMuTW92ZSwgLT5cblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55ID4gYm91bmRzWzBdIGFuZCAhY2xvc2luZ0FsYnVtVmlld1xuXHRcdFx0YW5pbWF0ZURldGFpbGVkQWxidW1QYWdlKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1ksIHN0YXR1c19iYXJfY29sb3IpXG5cdFx0XHRcblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55IDwgYm91bmRzQm90dG9tWzBdIGFuZCAhY2xvc2luZ0FsYnVtVmlld1xuXHRcdFx0YW5pbWF0ZURldGFpbGVkQWxidW1QYWdlKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzQm90dG9tLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1ksIHN0YXR1c19iYXJfY29sb3IpXG5cdFxuXHRcblx0XG5cdFxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub24gRXZlbnRzLlRhcCwgLT5cblx0XHRzb25nc1Njcm9sbFZpZXcuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdGNsb3NpbmdBbGJ1bVZpZXcgPSB0cnVlXG5cdFx0Y2xvc2VEZXRhaWxlZEFsYnVtUGFnZShhbGJ1bVNvbmdzVmlldywgYWxidW1fZmFrZV9pbWFnZSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIG9mZnNldFZhbHVlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zLCBzdGF0dXNfYmFyX2NvbG9yKVxuXHRcblx0XG5cblx0cmV0dXJuIFtkZXRhaWxlZEFsYnVtVmlldywgc29uZ3NdIiwie1Nvbmd9ID0gcmVxdWlyZSBcInNvbmdcIlxue1RleHRMYXllcn0gPSByZXF1aXJlIFwidGV4dFwiXG5cbkFydGlzdCA9IHJlcXVpcmUgXCJhcnRpc3RcIlxuY29uZmlnID0gQXJ0aXN0LmNvbmZpZ1xuXG4jIFNvbmcgKGFsYnVtSUQpXG5leHBvcnRzLmNyZWF0ZVNvbmdzRm9yQWxidW0gPSAoYWxidW1JRCkgLT5cblx0c29uZ3MgPSBbXVxuXHRmb3Igc29uZywgaSBpbiBBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS5zb25nc1xuXHRcdHNvbmdzLnB1c2goQC5jcmVhdGVBbGJ1bVNvbmcoYWxidW1JRCwgaSkpXG5cdHJldHVybiBzb25nc1xuXHRcblxuXG5leHBvcnRzLmNyZWF0ZVNvbmdzRm9yRmF2ID0gKHNvbmdzTGlzdCkgLT5cblx0c29uZ3MgPSBbXVxuXHRmb3Igc29uZywgaSBpbiBzb25nc0xpc3Quc29uZ3Ncblx0XHRzb25ncy5wdXNoKEAuY3JlYXRlU29uZyhpKSlcblx0cmV0dXJuIHNvbmdzXG5cblxuXG5cbiMgU29uZyAoYWxidW1JRCwgc29uZ051bWJlcilcbmV4cG9ydHMuY3JlYXRlU29uZyA9IChzb25nTnVtYmVyKSAtPlxuXHRcblx0c29uZ1ZpZXcgPSBuZXcgU29uZ1xuXHRcdGhlaWdodDogMTMyXG5cdFx0YWxidW1JRDogQXJ0aXN0LmZhdkxpc3QuYWxidW1zW3NvbmdOdW1iZXJdXG5cdFx0c29uZ0lEOiBzb25nTnVtYmVyXG5cblx0c29uZ0ltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdGltYWdlOiBBcnRpc3QuYWxidW1zRGF0YVtBcnRpc3QuZmF2TGlzdC5hbGJ1bXNbc29uZ051bWJlcl1dLmltYWdlXG5cdFx0d2lkdGg6IDQ4KjJcblx0XHRoZWlnaHQ6IDQ4KjJcblx0XHR4OiAzMlxuXHRcdHk6IDE2XG5cblx0c29uZ1RpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7QXJ0aXN0LmZhdkxpc3Quc29uZ3Nbc29uZ051bWJlcl19XCJcblx0XHR3aWR0aDogNDQwXG5cdFx0aGVpZ2h0OiA0NFxuXHRcdHg6IDE1NlxuXHRcdHk6IDIyXG5cdFx0Zm9udFNpemU6IDM2XG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdGNvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5kZXRhaWxlZF9hbGJ1bV9zb25nX3RpdGxlXG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cblx0YWxidW1UaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IHNvbmdWaWV3XG5cdFx0dGV4dDogXCIje0FydGlzdC5hbGJ1bXNEYXRhW0FydGlzdC5mYXZMaXN0LmFsYnVtc1tzb25nTnVtYmVyXV0udGl0bGV9XCJcblx0XHR3aWR0aDogNDQwXG5cdFx0aGVpZ2h0OiAzNFxuXHRcdHg6IDE1NlxuXHRcdHk6IDY4XG5cdFx0Zm9udFNpemU6IDI4XG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdGNvbG9yOiBBcnRpc3QuY29sb3JUaGVtZS5kZXRhaWxlZF9hbGJ1bV9zb25nX3RpbWVcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XG5cdHJldHVybiBzb25nVmlld1xuXG5cblxuXG4jIFNvbmcgKGFsYnVtSUQsIHNvbmdOdW1iZXIpXG5leHBvcnRzLmNyZWF0ZUFsYnVtU29uZyA9IChhbGJ1bUlELCBzb25nTnVtYmVyKSAtPlxuXHRcblx0c29uZ1ZpZXcgPSBuZXcgU29uZ1xuXHRcdGhlaWdodDogODBcblx0XHRhbGJ1bUlEOiBhbGJ1bUlEXG5cdFx0c29uZ0lEOiBzb25nTnVtYmVyXG5cdFx0IyBhbGJ1bVRpdGxlOiBBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS50aW1lW3NvbmdOdW1iZXJdXG5cdFx0c29uZ1RpdGxlOiBBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS5zb25nc1tzb25nTnVtYmVyXVxuXG5cdHNvbmdUaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IHNvbmdWaWV3XG5cdFx0dGV4dDogXCIje3NvbmdWaWV3LnNvbmdUaXRsZX1cIlxuXHRcdHdpZHRoOiA0NDBcblx0XHRoZWlnaHQ6IDQwXG5cdFx0eDogKDI4KzE0KSoyXG5cdFx0eTogMjBcblx0XHRmb250U2l6ZTogMzJcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwibGVmdFwiXG5cdFx0Y29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX3NvbmdfdGl0bGVcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblxuXHRzb25nRHVyYXRpb24gPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdHRleHQ6IFwiI3tBcnRpc3QuYWxidW1zRGF0YVthbGJ1bUlEXS50aW1lW3NvbmdOdW1iZXJdfVwiXG5cdFx0d2lkdGg6IDEyMFxuXHRcdGhlaWdodDogMzRcblx0XHR4OiAyMzIqMisyOFxuXHRcdHk6IDI2XG5cdFx0Zm9udFNpemU6IDI4XG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRjb2xvcjogQXJ0aXN0LmNvbG9yVGhlbWUuZGV0YWlsZWRfYWxidW1fc29uZ190aW1lXG5cdFx0bGV0dGVyU3BhY2luZzogMC41XG5cdFx0b3BhY2l0eTogMC43XG5cdFxuXHRzb25nTnVtYmVyID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7c29uZ051bWJlcisxfVwiXG5cdFx0d2lkdGg6IDE4KjJcblx0XHRoZWlnaHQ6IDE0KjJcblx0XHR4OiAxMCoyXG5cdFx0eTogMTMqMlxuXHRcdGZvbnRTaXplOiAyNFxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0Y29sb3I6IEFydGlzdC5jb2xvclRoZW1lLmRldGFpbGVkX2FsYnVtX3NvbmdfbnVtYmVyXG5cdFx0bGV0dGVyU3BhY2luZzogMC41XG5cdFx0b3BhY2l0eTogMC43XG5cdFxuXHRyZXR1cm4gc29uZ1ZpZXciLCJjb25maWcgPSBcImFydGlzdHMvaW1cIlxuZXhwb3J0cy5jb25maWcgPSBjb25maWdcblxuZ3JleXNfd2hpdGUgPSBcIiNGRkZGRkZcIlxuZ3JleXNfcHJlX3doaXRlID0gXCIjRjdGN0Y3XCJcbmdyZXlzX3VsdHJhX2xpZ2h0ID0gXCIjRUVFRUVFXCJcbmdyZXlzX2xpZ2h0ZXN0ID0gXCIjREREREREXCJcbmdyZXlzX2xpZ2h0ZXIgPSBcIiNDQ0NDQ0NcIlxuZ3JleXNfYmFzZSA9IFwiIzk5OTk5OVwiXG5ncmV5c19kYXJrZXIgPSBcIiM2NjY2NjZcIlxuZ3JleXNfZGFya2VzdCA9IFwiIzIyMjIyMlwiXG5ncmV5c19ibGFjayA9IFwiIzAwMDAwMFwiXG5cblxuZXhwb3J0cy5jb2xvclRoZW1lID0ge1xuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGhlYWRlci5wbmdcIlxuXHRuYXZpZ2F0aW9uX2hlYWRlcl9iYWNrZ3JvdW5kX2NvbG9yOiBcInJnYmEoMTUwLDIyLDExLFwiXG5cdG5hdmlnYXRpb25fb3ZlcmxheV9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGRhcmtlci5wbmdcIlxuXHQjIG5hdmlnYXRpb25faGVhZGVyX3RleHQ6IFwiI0ZGRkZGRlwiXG5cdFxuXHRuYXZpZ2F0aW9uX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL2JnLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9zaGFkb3c6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF90aW1lbGluZTogXCIjNjY2XCJcblx0bmF2aWdhdGlvbl9ibHVyX3JhZGl1czogXCJibHVyKDEwcHgpXCJcblx0bmF2aWdhdGlvbl9ibHVyX2NvbG9yOiBcInJnYmEoMCwwLDAsMC42KVwiXG5cdCMgbmF2aWdhdGlvbl9jYXJkX292ZXJsYXlfYmFja2dyb3VuZDogXCIjRkZGRkZGXCJcblxuXG5cblx0cGxheWVyX2JhY2tncm91bmQ6IFwiIzFEMUQxRFwiXG5cdHBsYXllcl9wcm9ncmVzc19iYXNlOiBcIiM2NjZcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfZmlsbGVkOiBcIiNBRjE0MTdcIlxuXHRwbGF5ZXJfc29uZ190aXRsZTogXCJ3aGl0ZVwiXG5cdHBsYXllcl9hbGJ1bV90aXRsZTogXCJyZ2JhKDIwNCwyMDQsMjA0LDAuNSlcIlxuXHRcblx0cGxheWVyX3NoYWRvd19jb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRwbGF5ZXJfc2hhZG93X3k6IC0yMFxuXHRwbGF5ZXJfc2hhZG93X2JsdXI6IDQwXG5cblxuXG5cdGNhcmRfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdGNhcmRfc2hhZG93X3k6IDI4XG5cdGNhcmRfc2hhZG93X2JsdXI6IDQwXG5cdFxuXHQjIERldGFpbGVkIEFsYnVtXG5cdGRldGFpbGVkX2FsYnVtX2JhY2tncm91bmQ6IFwiIzExMVwiXG5cdGRldGFpbGVkX2FsYnVtX3RpdGxlOiBcIndoaXRlXCJcblx0ZGV0YWlsZWRfYWxidW1feWVhcjogXCJyZ2JhKDIwNCwyMDQsMjA0LDAuNSlcIlxuXHRmYXZfc29uZ3NfdGl0bGU6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjUpXCJcblx0XG5cdCMgRGV0YWlsZWQgQWxidW0gU29uZ1xuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpdGxlOiBcIndoaXRlXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ19udW1iZXI6IFwiIzk5OVwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGltZTogXCIjOTk5XCJcblxufVxuXG5cblxuXG5cbm5ld3NNb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8wLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8yLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzMuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8zLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzQuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC80LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzUuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC81LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDYgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC82LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDcgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzcuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC83LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDggPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzguanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC84LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDkgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC85LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xMC5qcGdcIlxufVxuXG5leHBvcnRzLmZlZWREYXRhID0gW25ld3NNb2RlbDAsIG5ld3NNb2RlbDEsIG5ld3NNb2RlbDIsIG5ld3NNb2RlbDMsIG5ld3NNb2RlbDQsIG5ld3NNb2RlbDUsIG5ld3NNb2RlbDYsIG5ld3NNb2RlbDcsIG5ld3NNb2RlbDgsIG5ld3NNb2RlbDksIG5ld3NNb2RlbDEwXVxuXG5cblxuXG5cblxuXG5cblxudmlkZW9Nb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMC5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMS5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcbn1cblxudmlkZW9Nb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMi5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcbn1cblxuXG5cbnBsYXlsaXN0MCA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMC5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMC5wbmdcIlxufVxuXG5wbGF5bGlzdDEgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMS5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzEucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzEucG5nXCJcbn1cblxuZXhwb3J0cy5wbGF5bGlzdHNEYXRhID0gW3BsYXlsaXN0MCwgcGxheWxpc3QxXVxuZXhwb3J0cy5tb3ZpZXNEYXRhID0gW3ZpZGVvTW9kZWwwLCB2aWRlb01vZGVsMSwgdmlkZW9Nb2RlbDJdXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIEdldHRpbmcgRGF0YVxuXG4jIGNvbmZpZyA9IFwiYXJ0aXN0cy9zcGxlYW5cIlxuXG4jIGFsYnVtTW9kZWwwID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAxOTk0XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAxOTk1XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDE5OTlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAwNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAwNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAwN1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA5XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw3ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDggPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDIwMTJcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDkgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDIwMTNcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEwID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDExID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTVcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTZcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEzID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTdcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMThcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE1ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMjBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cblxuXG5cblxuIyBleHBvcnRzLmFsYnVtc0RhdGEgPSBbYWxidW1Nb2RlbDAsIGFsYnVtTW9kZWwxLCBhbGJ1bU1vZGVsMiwgYWxidW1Nb2RlbDMsIGFsYnVtTW9kZWw0LCBhbGJ1bU1vZGVsNSwgYWxidW1Nb2RlbDYsIGFsYnVtTW9kZWw3LCBhbGJ1bU1vZGVsOCwgYWxidW1Nb2RlbDksIGFsYnVtTW9kZWwxMCwgYWxidW1Nb2RlbDExLCBhbGJ1bU1vZGVsMTIsIGFsYnVtTW9kZWwxMywgYWxidW1Nb2RlbDE0LCBhbGJ1bU1vZGVsMTVdXG5cblxuXG5jb25maWdBbGJ1bXMgPSBjb25maWcgKyBcIi9hbGJ1bXMvXCJcbiMgcHJpbnQgY29uZmlnQWxidW1zXG5cbnJhbmRvbVNvdXJjZSA9IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIl1cblxuXG5leHBvcnRzLmFsYnVtc0RhdGEgPSBbe3RpdGxlOlwiQ2xhc3NpY2FsIE11c2hyb29tXCIseWVhcjoyMDAwLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJCdXN0IEEgTW92ZVwiLFwiTm9uZSBPZiBUaGlzIElzIFJlYWxcIixcIlNhaWxpbmcgSW4gVGhlIFNlYSBPZiBNdXNocm9vbVwiLFwiVGhlIFNoZW5cIixcIkRpc2NvIE11c2hyb29tXCIsXCJEcmFjdWxcIixcIk5vdGhpbmcgQ29tZXMgRWFzeVwiLFwiTXVzaCBNdXNoaVwiLFwiVGhlIE1pc3NlZCBTeW1waG9ueVwiXSx0aW1lOltcIjA4OjIxXCIsXCIwNjoyMlwiLFwiMDg6MThcIixcIjA4OjMzXCIsXCIwODo0NlwiLFwiMDg6MDBcIixcIjA3OjI2XCIsXCIwNzozNlwiLFwiMTA6MjZcIl0sIGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjAuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiQi5QLkVtcGlyZVwiLHllYXI6MjAwMSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wiTmV2ZXIgRXZlciBMYW5kXCIsXCJVbmJhbGFuY2VkXCIsXCJTcGFuaWFyZFwiLFwiQi5QLkVtcGlyZVwiLFwiRnVuY2hhbWVsZW9uXCIsXCJUYXN0eSBNdXNocm9vbVwiLFwiTm9pc2UgTWFrZXJcIixcIlAuRy5NLlwiLFwiRGFuY2luZyBXaXRoIEthZGFmaVwiXSx0aW1lOltcIjA3OjQ2XCIsXCIwNzoxNVwiLFwiMDc6MzhcIixcIjA3OjI2XCIsXCIwNjo1NVwiLFwiMDY6NTZcIixcIjA3OjM5XCIsXCIwNzoyMVwiLFwiMTA6MjJcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMS5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJDb252ZXJ0aW5nIFZlZ2V0YXJpYW5zXCIseWVhcjoyMDAzLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJBbGJpYmVub1wiLFwiSHVzaCBNYWlsXCIsXCJBcG9naWZmYSBOaWdodFwiLFwiU29uZyBQb25nXCIsXCJDaGFwbGluXCIsXCJFY2hvbm9taXhcIixcIlNjb3JwaW9uIEZyb2dcIixcIkRlZXBseSBEaXN0dXJiZWRcIixcIlNlbWkgTmljZVwiLFwiWWFua28gUGl0Y2hcIixcIkNvbnZlcnRpbmcgVmVnZXRhcmlhbnNcIixcIkVsYXRpb24gU3RhdGlvblwiLFwiRHJvcCBPdXRcIixcIkF2cmF0elwiLFwiQmxpbmtcIixcIlNoYWthd2thd1wiLFwiUGxldHp0dXJyYVwiLFwiSSBXaXNoXCIsXCJCYWxsZXJpdW1cIixcIlNlbGVjdGFcIixcIklsbHVtaW5hdWdodHlcIixcIkplZW5nZVwiLFwiRWxldmF0aW9uXCJdLHRpbWU6W1wiMDc6MDNcIixcIjA3OjAxXCIsXCIwODowOFwiLFwiMDg6MzZcIixcIjA2OjU0XCIsXCIwNzo0M1wiLFwiMDg6MDBcIixcIjA4OjI2XCIsXCIwNjowOVwiLFwiMDg6MTNcIixcIjA1OjM5XCIsXCIwNTozNVwiLFwiMDU6MTRcIixcIjEwOjIzXCIsXCIwNTozMlwiLFwiMDQ6MDhcIixcIjA2OjQ0XCIsXCIwMzowMFwiLFwiMDc6MTdcIixcIjA1OjIxXCIsXCIwNDo1MFwiLFwiMDc6MDJcIixcIjA1OjE1XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjIuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiSSdtIFRoZSBTdXBlcnZpc29yXCIseWVhcjoyMDA0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJJJ20gVGhlIFN1cGVydmlzb3JcIixcIlJhdGlvbiBTaG1hdGlvXCIsXCJNdXNlIEJyZWFrcyBSTVhcIixcIk1lZHV6elwiLFwiQ2l0aWVzIE9mIFRoZSBGdXR1cmVcIixcIkhvcnVzIFRoZSBDaG9ydXNcIixcIkZyb2cgTWFjaGluZVwiLFwiTm9vblwiLFwiQm9tYmF0XCIsXCJTdHJldGNoZWRcIl0sdGltZTpbXCIwODozMlwiLFwiMDY6MjlcIixcIjA3OjA5XCIsXCIwNjo0MlwiLFwiMDY6NTlcIixcIjA3OjM5XCIsXCIwNjoxMFwiLFwiMDY6MDdcIixcIjA4OjE4XCIsXCIwNzoyMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIzLmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIlZpY2lvdXMgRGVsaWNpb3VzXCIseWVhcjoyMDA3LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJCZWNvbWluZyBJbnNhbmVcIixcIkFydGlsbGVyeVwiLFwiVmljaW91cyBEZWxpY2lvdXNcIixcIkhlYXZ5d2VpZ2h0XCIsXCJTdWxpbWFuXCIsXCJGb3JnaXZlIE1lXCIsXCJTcGVjaWFsIFBsYWNlXCIsXCJJbiBGcm9udCBPZiBNZVwiLFwiRWF0IEl0IFJhd1wiLFwiQ2hhbmdlIFRoZSBGb3JtYWxpdHlcIixcIkJlZm9yZVwiXSx0aW1lOltcIjA3OjIwXCIsXCIwNDoyOFwiLFwiMDc6MjRcIixcIjA4OjQxXCIsXCIwNjoxMFwiLFwiMDM6MjlcIixcIjA2OjUzXCIsXCIwNDoyOFwiLFwiMDY6MzBcIixcIjA3OjQ0XCIsXCIwNjo1N1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI0LmpwZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIkxlZ2VuZCBPZiBUaGUgQmxhY2sgU2hhd2FybWFcIix5ZWFyOjIwMDksdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIlBvcXVpdG8gTWFzXCIsXCJTYWVlZFwiLFwiRW5kIE9mIFRoZSBSb2FkXCIsXCJTbWFzaGluZyBUaGUgT3Bwb25lbnRcIixcIkNhbid0IFN0b3BcIixcIkhlcmJlcnQgVGhlIFBlcnZlcnRcIixcIktpbGxpbmcgVGltZVwiLFwiUHJvamVjdCAxMDBcIixcIkZyYW5rc1wiLFwiU2xvd2x5XCIsXCJUaGUgTGVnZW5kIE9mIFRoZSBCbGFjayBTaGF3YXJtYVwiLFwiUmlkZXJzIE9uIFRoZSBTdG9ybVwiXSx0aW1lOltcIjAzOjM5XCIsXCIwNzowM1wiLFwiMDY6NDZcIixcIjA0OjA5XCIsXCIwNzoyM1wiLFwiMDc6MTdcIixcIjAzOjA0XCIsXCIwOTozN1wiLFwiMDg6MDRcIixcIjA4OjU5XCIsXCIwNzoxMVwiLFwiMDQ6MjlcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNS5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJQb3dlciBDaGFyZ2VcIix5ZWFyOjIwMTEsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIkhlbGxpb24gUHJpbWVcIixcIkVuZXJneSBTZXF1ZW5jZVwiLFwiUG93ZXIgQ2hhcmdlXCIsXCJDaXRpZXMgb2YgdGhlIEZ1dHVyZVwiLFwiQWNpZCBQcm9vZlwiLFwiRmx5aW5nXCIsXCIxMC4wMDAgRmFocmVuaGVpdFwiLFwiQnJhaW4gU3Bhd25cIixcIlVuYmFsYW5jZWRcIl0sdGltZTpbXCIwNjozNlwiLFwiMDY6MzFcIixcIjA2OjM4XCIsXCIwNzoyNVwiLFwiMDY6MzdcIixcIjA2OjM0XCIsXCIwNjo0NlwiLFwiMDY6NDVcIixcIjA2OjQ3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjYuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSwgXG5cbnt0aXRsZTpcIkFybXkgT2YgTXVzaHJvb21zXCIseWVhcjoyMDEyLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJOZXZlciBNaW5kXCIsXCJOb3RoaW5nIHRvIFNheVwiLFwiU2VuZCBNZSBhbiBBbmdlbFwiLFwiVSBSIFNvIEZ1Y2tlZFwiLFwiVGhlIFJhdFwiLFwiTmF0aW9uIG9mIFd1c3Nlc1wiLFwiV2FudGVkIFRvXCIsXCJTZXJ2ZSBNeSBUaGlyc3RcIixcIkkgU2hpbmVcIixcIkRydW0gbiBCYXNzYVwiLFwiVGhlIFByZXRlbmRlclwiLFwiVGhlIE1lc3NlbmdlciAyMDEyXCIsXCJTd2luZ2lzaFwiXSx0aW1lOltcIjA2OjA1XCIsXCIwNjoyOFwiLFwiMDc6MjVcIixcIjA0OjQxXCIsXCIwNzo0M1wiLFwiMDc6MDJcIixcIjAzOjI0XCIsXCIwNjo0NlwiLFwiMDU6NDNcIixcIjA3OjEyXCIsXCIwNjozNFwiLFwiMTA6MzhcIixcIjA2OjE2XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjcuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiRnJpZW5kcyBPbiBNdXNocm9vbXNcIix5ZWFyOjIwMTQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcIkthZmthZlwiLFwiQmFzcyBOaXBwbGVcIixcIlNhdmFudCBPbiBNdXNocm9vbXNcIixcIktpcG9kXCIsXCJLYXphYnVidVwiLFwiTm93IElzIEdvbGRcIixcIlJpc2UgVXBcIixcIk5lcmRzIE9uIE11c2hyb29tc1wiLFwiTWFtYmFjb3JlXCIsXCJXaGVyZSBEbyBJIEJlbG9uZ1wiLFwiQXN0cml4IE9uIE11c2hyb29tc1wiLFwiV2hvIElzIFRoZXJlXCIsXCJCYXJrXCIsXCJUcmFuY2UgUGFydHlcIixcIlRoZSBGcmVuY2hcIixcIktpcG9kXCJdLHRpbWU6W1wiMDU6NDdcIixcIjA0OjU0XCIsXCIwNjoxOFwiLFwiMDc6MDBcIixcIjA2OjI0XCIsXCIwNTo1M1wiLFwiMDU6MjlcIixcIjA1OjMzXCIsXCIwNDoxOVwiLFwiMDM6MjZcIixcIjA5OjU2XCIsXCIwNDowNFwiLFwiMDQ6MDlcIixcIjA3OjQxXCIsXCIwNjo1NVwiLFwiMDU6NDdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOC5qcGdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJDb252ZXJ0aW5nIFZlZ2V0YXJpYW5zIElJXCIseWVhcjoyMDE1LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCJTaGUgWm9yZW1ldFwiLFwiWWFtYWthcyBpbiBTcGFjZVwiLFwiU2Vuc2Ugb2YgRGlyZWN0aW9uXCIsXCJBbmltYXRyb25pY2FcIixcIkZlZWxpbmdzXCIsXCJQaW5rIEZyb2lkXCIsXCJEZW1vbnMgb2YgUGFpblwiLFwiWm9hbiBab3VuZFwiLFwiQmx1ZSBTd2FuIDVcIixcIkZpZWxkcyBvZiBHcmV5XCIsXCJMZW9wb2xkXCIsXCJPbiBUaGUgUm9hZCBBZ2FpblwiLFwiU3R1Y2sgaW4gYSBMb29wXCIsXCJNZXhpY2FsaVwiLFwiVGhlIFN1cmdlb25cIl0sdGltZTpbXCIwNToxNFwiLFwiMDc6MzNcIixcIjAzOjI1XCIsXCIwNjoxNVwiLFwiMDQ6MTBcIixcIjA3OjQwXCIsXCIwMjo1OFwiLFwiMDQ6MzFcIixcIjA4OjU4XCIsXCIwNDoxOFwiLFwiMDQ6MTRcIixcIjAzOjU5XCIsXCIwNDoyM1wiLFwiMDM6NDVcIixcIjA2OjIxXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjkuanBnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfVxuXG5cblxuXVxuXG5cblxuXG4jIGV4cG9ydHMuZmF2TGlzdCA9IHtcbiMgXHRzb25nczogW1wiYWRcIl1cbiMgXHR0aW1lOiBbXCIxOjFcIl1cbiMgXHRhbGJ1bXM6IFszXVxuIyB9XG5leHBvcnRzLmZhdkxpc3QgPSB7XG5cdHNvbmdzOiBbXCJMaXF1aWQgU21va2VcIiwgXCJTaGUgWm9yZW1ldFwiLCBcIlJpZGVycyBPbiBUaGUgU3Rvcm1cIiwgXCJBcnRpbGxlcnlcIiwgIFwiS2F6YWJ1YnVcIiwgXCJOZXZlciBNaW5kXCIsIFwiWm9hbiBab3VuZFwiLCBcIkhlYXZ5d2VpZ2h0XCIsIFwiS2Fma2FmXCIsIFwiQmFzcyBOaXBwbGVcIl1cblx0c291cmNlOiByYW5kb21Tb3VyY2VcblxuXHR0aW1lOiBbXCI2OjM5XCIsIFwiNToxNFwiLCBcIjQ6MjlcIiwgXCI0OjI4XCIsIFwiNjoyNFwiLCBcIjY6MDVcIiwgXCI0OjMxXCIsIFwiODo0MVwiLCBcIjU6NDdcIiwgXCI0OjU0XCJdXG5cdGFsYnVtczogWzIsIDksIDUsIDQsIDgsIDcsIDksIDQsIDgsIDhdXG59IiwiY29uZmlnID0gXCJhcnRpc3RzL3Ryb2xsXCJcbmV4cG9ydHMuY29uZmlnID0gY29uZmlnXG5cbmdyZXlzX3doaXRlID0gXCIjRkZGRkZGXCJcbmdyZXlzX3ByZV93aGl0ZSA9IFwiI0Y3RjdGN1wiXG5ncmV5c191bHRyYV9saWdodCA9IFwiI0VFRUVFRVwiXG5ncmV5c19saWdodGVzdCA9IFwiI0RERERERFwiXG5ncmV5c19saWdodGVyID0gXCIjQ0NDQ0NDXCJcbmdyZXlzX2Jhc2UgPSBcIiM5OTk5OTlcIlxuZ3JleXNfZGFya2VyID0gXCIjNjY2NjY2XCJcbmdyZXlzX2Rhcmtlc3QgPSBcIiMyMjIyMjJcIlxuZ3JleXNfYmxhY2sgPSBcIiMwMDAwMDBcIlxuXG5cbmV4cG9ydHMuY29sb3JUaGVtZSA9IHtcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBoZWFkZXIucG5nXCJcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvcjogXCJyZ2JhKDAsMCwwLFwiXG5cdG5hdmlnYXRpb25fb3ZlcmxheV9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGRhcmtlci5wbmdcIlxuXHQjIG5hdmlnYXRpb25faGVhZGVyX3RleHQ6IFwiI0ZGRkZGRlwiXG5cdFxuXHRuYXZpZ2F0aW9uX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL2JnLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9zaGFkb3c6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF90aW1lbGluZTogXCIjNjY2XCJcblx0bmF2aWdhdGlvbl9ibHVyX3JhZGl1czogXCJibHVyKDEwcHgpXCJcblx0bmF2aWdhdGlvbl9ibHVyX2NvbG9yOiBcInJnYmEoMCwwLDAsMC42KVwiXG5cdCMgbmF2aWdhdGlvbl9jYXJkX292ZXJsYXlfYmFja2dyb3VuZDogXCIjRkZGRkZGXCJcblxuXG5cblx0cGxheWVyX2JhY2tncm91bmQ6IFwiIzFEMUQxRFwiXG5cdHBsYXllcl9wcm9ncmVzc19iYXNlOiBcIiM2NjZcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfZmlsbGVkOiBcIiNBRjE0MTdcIlxuXHRwbGF5ZXJfc29uZ190aXRsZTogXCJ3aGl0ZVwiXG5cdHBsYXllcl9hbGJ1bV90aXRsZTogXCJyZ2JhKDIwNCwyMDQsMjA0LDAuNSlcIlxuXHRcblx0cGxheWVyX3NoYWRvd19jb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRwbGF5ZXJfc2hhZG93X3k6IC0yMFxuXHRwbGF5ZXJfc2hhZG93X2JsdXI6IDQwXG5cblxuXG5cdGNhcmRfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdGNhcmRfc2hhZG93X3k6IDI4XG5cdGNhcmRfc2hhZG93X2JsdXI6IDQwXG5cdFxuXHQjIERldGFpbGVkIEFsYnVtXG5cdGRldGFpbGVkX2FsYnVtX2JhY2tncm91bmQ6IFwiIzExMVwiXG5cdGRldGFpbGVkX2FsYnVtX3RpdGxlOiBcIndoaXRlXCJcblx0ZGV0YWlsZWRfYWxidW1feWVhcjogXCJyZ2JhKDIwNCwyMDQsMjA0LDAuNSlcIlxuXHRmYXZfc29uZ3NfdGl0bGU6IFwicmdiYSgyNTUsMjU1LDI1NSwwLjUpXCJcblx0XG5cdCMgRGV0YWlsZWQgQWxidW0gU29uZ1xuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpdGxlOiBcIndoaXRlXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ19udW1iZXI6IFwiIzk5OVwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGltZTogXCIjOTk5XCJcblxufVxuXG5cblxuXG5cbm5ld3NNb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8wLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8yLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzMuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8zLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzQuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC80LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzUuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC81LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDYgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC82LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDcgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzcuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC83LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDggPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzguanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC84LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDkgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC85LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xMC5qcGdcIlxufVxuXG5leHBvcnRzLmZlZWREYXRhID0gW25ld3NNb2RlbDAsIG5ld3NNb2RlbDEsIG5ld3NNb2RlbDIsIG5ld3NNb2RlbDMsIG5ld3NNb2RlbDQsIG5ld3NNb2RlbDUsIG5ld3NNb2RlbDYsIG5ld3NNb2RlbDcsIG5ld3NNb2RlbDgsIG5ld3NNb2RlbDksIG5ld3NNb2RlbDEwXVxuXG5cblxuXG5cblxuXG5cblxudmlkZW9Nb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMC5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMS5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMi5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxuXG5cbnBsYXlsaXN0MCA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMC5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMC5wbmdcIlxufVxuXG5wbGF5bGlzdDEgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMS5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzEucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzEucG5nXCJcbn1cblxuZXhwb3J0cy5wbGF5bGlzdHNEYXRhID0gW3BsYXlsaXN0MCwgcGxheWxpc3QxXVxuZXhwb3J0cy5tb3ZpZXNEYXRhID0gW3ZpZGVvTW9kZWwwLCB2aWRlb01vZGVsMSwgdmlkZW9Nb2RlbDJdXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIEdldHRpbmcgRGF0YVxuXG4jIGNvbmZpZyA9IFwiYXJ0aXN0cy9zcGxlYW5cIlxuXG4jIGFsYnVtTW9kZWwwID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAxOTk0XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAxOTk1XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDE5OTlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAwNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAwNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAwN1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA5XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw3ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDggPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDIwMTJcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDkgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDIwMTNcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEwID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDExID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTVcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTZcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEzID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTdcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMThcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE1ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMjBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cblxuXG5cblxuIyBleHBvcnRzLmFsYnVtc0RhdGEgPSBbYWxidW1Nb2RlbDAsIGFsYnVtTW9kZWwxLCBhbGJ1bU1vZGVsMiwgYWxidW1Nb2RlbDMsIGFsYnVtTW9kZWw0LCBhbGJ1bU1vZGVsNSwgYWxidW1Nb2RlbDYsIGFsYnVtTW9kZWw3LCBhbGJ1bU1vZGVsOCwgYWxidW1Nb2RlbDksIGFsYnVtTW9kZWwxMCwgYWxidW1Nb2RlbDExLCBhbGJ1bU1vZGVsMTIsIGFsYnVtTW9kZWwxMywgYWxidW1Nb2RlbDE0LCBhbGJ1bU1vZGVsMTVdXG5cblxuXG5jb25maWdBbGJ1bXMgPSBjb25maWcgKyBcIi9hbGJ1bXMvXCJcbiMgcHJpbnQgY29uZmlnQWxidW1zXG5cbnJhbmRvbVNvdXJjZSA9IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIl1cblxuXG5leHBvcnRzLmFsYnVtc0RhdGEgPSBbe3RpdGxlOlwi0JjQutGA0LBcIix5ZWFyOjE5OTYsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCU0L7Qu9GPINGA0LjRgdC60LBcIixcItCo0LDQvNCw0LzQsNC90YtcIixcItCh0LjQsNC80YHQutC40LUg0YHQtdGA0LTRhtCwXCIsXCLQndC1INC30LLQtdC30LTQsFwiLFwi0JTQtdC70YzRhNC40L3Ri1wiLFwi0KDQsNC90LXRgtC60LBcIixcItCd0LAg0Y/QtNGLXCIsXCLQotCw0Log0L3QsNC00L5cIixcItCQ0LvQvNCw0LfQsNC80LhcIixcItCh0LjQs9C90LDQu9GLXCIsXCLQnNCw0LvRjNGH0LjQui3RgdC+0LvQtNCw0YJcIixcItCT0L7Qu9C+0LRcIixcItCh0LDQudC+0L3QsNGA0LAg0LTQuNGB0LrQsFwiLFwi0JTQsNC70LXQutC+XCJdLHRpbWU6W1wiMDM6NTdcIixcIjAzOjM0XCIsXCIwMzo1NlwiLFwiMDM6MzBcIixcIjA0OjM4XCIsXCIwMzoxOVwiLFwiMDM6MTBcIixcIjAzOjU4XCIsXCIwNDoxNVwiLFwiMDQ6MTdcIixcIjA0OjM0XCIsXCIwNDo0M1wiLFwiMDM6NDdcIixcIjA2OjIzXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjAuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCc0L7RgNGB0LrQsNGPXCIseWVhcjoxOTk3LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQktC00YDRg9CzINGD0YjQu9C4INC/0L7QtdC30LTQsFwiLFwi0JTQtdCy0L7Rh9C60LBcIixcItCj0YLQtdC60LDQuVwiLFwi0JzQvtGA0YHQutCw0Y8g0LHQvtC70LXQt9C90YxcIixcItCS0LvQsNC00LjQstC+0YHRgtC+0LogMjAwMFwiLFwi0KDQvtC30LAg0JvRjtC60YHQtdC80LHRg9GA0LNcIixcItCa0L7RgiDQutC+0YLQsCAo0JLQvtGCINC4INCy0YHRjyDQu9GO0LHQvtCy0YwpXCIsXCLQl9Cw0LHQsNCy0YtcIixcItCh0LrQvtGA0L7RgdGC0YxcIixcItCS0YDQtdC80Y8g0YLQtdC/0LvQsFwiLFwi0JTQtdC70LDQuSDQvNC10L3RjyDRgtC+0YfQvdC+XCIsXCLQktGB0LXRhtC10LvQviDQstGB0LXQvFwiLFwi0JLQvtGB0L/QuNGC0LDQvdC90LjQuiDRg9C/0LDQstGI0LXQuSDQt9Cy0LXQt9C00YtcIixcItCd0L7QstCw0Y8g0LvRg9C90LAg0LDQv9GA0LXQu9GPXCJdLHRpbWU6W1wiMDM6NTBcIixcIjAzOjIzXCIsXCIwMjoxOFwiLFwiMDQ6NDFcIixcIjAyOjM4XCIsXCIwMjoyMlwiLFwiMDM6MDhcIixcIjAyOjMzXCIsXCIwMzo1MlwiLFwiMDM6MDdcIixcIjAyOjU3XCIsXCIwMzo1MlwiLFwiMDQ6MjhcIixcIjAyOjU5XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCo0LDQvNC+0YDQsFwiLHllYXI6MTk5OCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JDQu9C70L4sINC/0L7Qv9GBIVwiLFwi0KPQu9GM0YLQuNC80LDRgtGD0LxcIixcItCd0L7QstCw0Y8g0LvRg9C90LAg0LDQv9GA0LXQu9GPXCIsXCLQmtCw0YHRgdC10YLQvdGL0Lkg0LzQsNC70YzRh9C40LpcIixcItCY0L3QvtC/0LvQsNC90LXRgtC90YvQuSDQs9C+0YHRgtGMXCIsXCLQlNC10LLRg9GI0LrQuCDRjdC80LDQvdGB0LjQv9GNXCIsXCLQktC10YfQtdGA0L3QuNC5INGH0LDQuVwiLFwi0JHQuNGCINCx0YPQvFwiLFwi0JvRg9C90L3Ri9C1INC00LXQstC40YbRi1wiLFwi0J/QsNGA0LpcIixcItCh0LDQudC+0L3QsNGA0LAg0LTQuNGB0LrQsFwiLFwi0KfRkdGA0L3QsNGPINC00YvRgNCwXCIsXCLQkiDQtNGD0LzQsNGFINC+INC00LXQstGD0YjQutC1INC40Lcg0LPQvtGA0L7QtNCwINGG0LXQvdGC0YDQsNC70YzQvdC+0LPQviDQv9C+0LTRh9C40L3QtdC90LjRjyDQmtCd0KBcIixcItCU0LXQu9Cw0Lkg0LzQtdC90Y8g0YLQvtGH0L3QvlwiLFwi0KLQsNC6INGB0YLRgNCw0YjQvdC+XCIsXCLQktGB0LXRhtC10LvQviDQstGB0LXQvFwiLFwi0JzQsNC70YzRh9C40Lot0YHQvtC70LTQsNGCXCIsXCLQktC+0YHQv9C40YLQsNC90L3QuNC6INGD0L/QsNCy0YjQtdC5INC30LLQtdC30LTRi1wiLFwi0JvQvtC20LjRgdGMLCDQv9C+0LTQv9C+0LvQutC+0LLQvdC40LohXCIsXCLQlNC10LvQsNC5INCuLdCuXCIsXCLQkdC70YPQtNC70LjQstGL0LUg0LrQvtGC0YtcIixcItCf0L7RgdC40LTQtdC70LrQuC3Qv9C+0LTQs9C70Y/QtNC10LvQutC4XCIsXCLQlNCw0LvQtdC60L5cIixcItCt0YXQvtC8INCz0L7QvdCz0LBcIl0sdGltZTpbXCIwMjoxNlwiLFwiMDM6NDJcIixcIjAyOjU5XCIsXCIwMzo1MlwiLFwiMDM6NTFcIixcIjAyOjMxXCIsXCIwMzo0MlwiLFwiMDI6MTdcIixcIjAzOjI4XCIsXCIwMjozN1wiLFwiMDM6NDdcIixcIjAzOjQ5XCIsXCIwMzowM1wiLFwiMDI6NTdcIixcIjAzOjUxXCIsXCIwMzo1MlwiLFwiMDQ6MzVcIixcIjA0OjMwXCIsXCIwMzoxMlwiLFwiMDM6NDVcIixcIjAzOjI2XCIsXCIwMzozMlwiLFwiMDU6MTJcIixcIjA0OjI1XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjIuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCi0L7Rh9C90L4g0KDRgtGD0YLRjCDQkNC70L7RjVwiLHllYXI6MjAwMCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JrQsNGA0L3QsNCy0LDQu9CwLtC90LXRglwiLFwi0J3QtSDQvtGH0LXQvdGMXCIsXCLQodC60L7RgNC10LUg0Lgg0LHRi9GB0YLRgNC+XCIsXCLQnNC+0Y8g0L/QtdCy0LjRhtCwXCIsXCLQodC10LLQtdGA0L3Ri9C5INC/0L7Qu9GO0YFcIixcItCd0LXQstC10YHRgtCwP1wiLFwi0JbQsNCx0YDRi1wiLFwi0JrQu9GD0LHQvdC40YfQvdCw0Y9cIixcItCh0L3Ri1wiLFwi0JHQtdC3INC+0LHQvNCw0L3QsFwiLFwi0JXQvNGDINC90LUg0LLQt9GP0YLRjCDRgtC10LHRj1wiLFwi0KLQuNGI0LVcIixcItCh0LvRg9GH0LDQudC90L7RgdGC0LhcIl0sdGltZTpbXCIwMzoxMFwiLFwiMDM6NThcIixcIjAzOjA2XCIsXCIwNDowOVwiLFwiMDM6NDBcIixcIjAzOjU2XCIsXCIwMzozMlwiLFwiMDI6MzdcIixcIjAzOjU4XCIsXCIwMzoyM1wiLFwiMDQ6NTBcIixcIjAzOjAwXCIsXCIwMzozM1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIzLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQnNC10LDQvNGD0YDRi1wiLHllYXI6MjAwMix0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JIg0YDQtdC50YFcIixcItCd0LAg0YPQtNCw0YfRg1wiLFwi0K3RgtC+INC/0L4g0LvRjtCx0LLQuFwiLFwi0JPQu9GD0LHQttC1XCIsXCLQnNC+0YDRgdC60LDRjyDQutCw0L/Rg9GB0YLQsFwiLFwi0J/Qu9GO0YEgMjhcIixcItCU0L7QsdGA0L7QtSDRg9GC0YDQviwg0L/Qu9Cw0L3QtdGC0LAhXCIsXCLQodGC0LXQutC70LBcIixcItCd0LXQtNC+0L/QvtC90LjQvNCw0Y7RidCw0Y9cIixcItCX0L3QsNC60L7QvNGL0Lwg0YHRgtC+0LvQuNGH0L3Ri9C8XCIsXCLQntCx0LXRidCw0L3QuNGPXCIsXCLQrdGC0L4g0L/QviDQu9GO0LHQstC4XCJdLHRpbWU6W1wiMDQ6MDlcIixcIjAzOjU0XCIsXCIwMjo1NFwiLFwiMDQ6MDNcIixcIjAyOjI4XCIsXCIwNDozOVwiLFwiMDM6MjlcIixcIjAzOjQ3XCIsXCIwNDowN1wiLFwiMDQ6MzVcIixcIjAzOjU3XCIsXCIwMzo0N1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI0LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG5cbnt0aXRsZTpcItCf0L7RhdC40YLQuNGC0LXQu9C4INC60L3QuNCzXCIseWVhcjoyMDA0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQotCw0LrQuNC1INC00LXQstGH0L7QvdC60LhcIixcItCk0LvQsNC80LXQvdC60L4g0JrRgNCw0YHQvtGC0LrQuCDRhy4gMlwiLFwi0KTQu9Cw0LzQtdC90LrQviDQmtGA0LDRgdC+0YLQutC4INGHLiAxXCIsXCLQk9C00LUg0YLQsNC60L7QuSDRjz9cIixcItCi0LLQvtGPINC70LXRgtC90Y/Rj1wiLFwi0JfQvtC70L7RgtGL0LUg0LLQvtGA0L7RgtCwXCIsXCLQktC+0LTQvtC/0LDQtNGLINGB0LvQtdC3XCIsXCLQl9C10LvQtdC90YvQuSByb2Nrc1wiLFwi0JfQtdC70LXQvdGL0Lkgcm9ja3NcIixcItCc0LXQtNCy0LXQtNC40YbQsFwiLFwi0JHQvtC60YHQtdGA0YHQutC40Lkg0LLQsNC70YzRgSDRhy4gMiBcXFwi0JrQsNGA0LDQvNC10LvRjFxcXCJcIixcItCR0L7QutGB0LXRgNGB0LrQuNC5INCy0LDQu9GM0YFcIixcItCR0L7QutGB0LXRgNGB0LrQuNC5IEZ1bmt5INCy0LDQu9GM0YFcIixcItCi0LDQutC40LUg0LTQtdCy0YfQvtC90LrQuFwiLFwi0JzQtdC00LLQtdC00LjRhtCwIEJlc3RvbG9jaCBNaXhcIl0sdGltZTpbXCIwNDozOFwiLFwiMzZcIixcIjAxOjAzXCIsXCIwNjozNVwiLFwiMDI6NTVcIixcIjAzOjU3XCIsXCIwMzo1NFwiLFwiNTRcIixcIjAzOjE4XCIsXCIwMzo1NFwiLFwiMDE6MzNcIixcIjAyOjM4XCIsXCIwNDo1MFwiLFwiMDQ6NTlcIixcIjA0OjAxXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjUuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCh0LvQuNGP0L3QuNC1INC4INC/0L7Qs9C70L7RidC10L3QuNC1XCIseWVhcjoyMDA1LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQmNC90YLRgNC+XCIsXCLQn9GA0L7RgdGC0LgsINCa0LjRgdC60LAhXCIsXCLQkdCw0L3Qt9Cw0LlcIixcItCl0LjRidC90LjQulwiLFwi0KHRgtGA0LDRhdGDINC90LXRglwiLFwi0JrQvtGA0LDQu9C70YtcIixcItCf0YDQuNCy0LDRgtC40LfQsNGG0LjRj1wiLFwi0KLQsNC60LHRi9Cy0LDQtdGC0L3QtdGB0LvRg9GH0LDQudC90L5cIixcItCv0L3RgtCw0YDRjFwiLFwi0JjRgNC40YFcIixcItCd0LXQv9C+0LrQvtC5XCIsXCLQl9C00YDQsNCy0YHRgtCy0YPQudC00L7RgdCy0LjQtNCw0L3QuNGPXCJdLHRpbWU6W1wiMDI6NTRcIixcIjA1OjExXCIsXCIwMjo1MFwiLFwiMDM6NTRcIixcIjAzOjMwXCIsXCIwNDowN1wiLFwiMDM6MzFcIixcIjA0OjQ4XCIsXCIwMzo1N1wiLFwiMDM6MTRcIixcIjAyOjUxXCIsXCIwNDoyNFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI2LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCJCZXN0IERK4oCZJ3MgRGFuY2UgTWl4IFZvbC5WSVwiLHllYXI6MjAwNix0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JfQtNGA0LDQstGB0YLQstGD0LnQtNC+0YHQstC40LTQsNC90LjRj1wiLFwi0KHRgtGA0LDRhdGDINC90LXRglwiLFwi0JzQtdC00LLQtdC00LjRhtCwIHwgRGogSXZhbiBTY3JhdGNoaW4nXCIsXCLQn9GA0L7RgdGC0LgsINCa0LjRgdC60LBcIixcItChINCd0L7QstGL0Lwg0JPQvtC00L7QvCwg0JrRgNC+0YjQutCwIVwiLFwi0JTQtdCy0L7Rh9C60LBcIixcItCh0YLRgNCw0YXRgyDQvdC10YJcIixcItChINCd0L7QstGL0Lwg0JPQvtC00L7QvCwg0JrRgNC+0YjQutCwIVwiLFwiTGFkeSBBbHBpbmUgQmx1ZSB8IERqIFJhbVwiLFwiTHVja3kgQnJpZGU/XCIsXCLQmNGA0LjRgVwiLFwi0J3QtdCy0LXRgdGC0LA/XCIsXCLQlNC10LvRjNGE0LjQvdGLXCIsXCLQmNC00LgsINGPINCx0YPQtNGDXCIsXCLQoSDQndC+0LLRi9C8INCT0L7QtNC+0LwsINCa0YDQvtGI0LrQsCFcIixcItCd0LXQv9C+0LrQvtC5XCJdLHRpbWU6W1wiMDU6MDdcIixcIjA1OjAyXCIsXCIwNTo1OFwiLFwiMDI6NDFcIixcIjA0OjAwXCIsXCIwMzoxOVwiLFwiMDI6NDNcIixcIjA1OjA4XCIsXCIwNDo1MlwiLFwiMDM6NTlcIixcIjA0OjA3XCIsXCIwMzoxM1wiLFwiMDQ6MThcIixcIjA0OjI5XCIsXCIwNDo1MlwiLFwiMDI6NDlcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNy5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwiOFwiLHllYXI6MjAwOCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JfQsNC/0YPRgdC6INGA0LDQutC10YLQvtC/0LvQsNC90LAgXFxcItCY0L7RgdC40YQg0KHRgtCw0LvQuNC9XFxcIiDQvdCwINCb0YPQvdGDXCIsXCLQrdC5LCDRgtC+0LLQsNGA0LjRiVwiLFwi0JrQvtC90YLRgNCw0LHQsNC90LTRi1wiLFwi0J/RgNC+0YHQv9Cw0LvQuFwiLFwi0JzRg9C30YvQutCw0L3RglwiLFwi0J3QsNGI0LUg0LLRgNC10LzRj1wiLFwi0JzQvtC70L7QtNC+0YHRgtGMXCIsXCLQnNC10YLQtdC70YxcIixcItCX0L7Qu9C+0YLQviDQuCDQu9Cw0LTQsNC9XCIsXCLQkiDRjdGC0L7QvCDRgdCy0LXRgtC1XCIsXCLQnNCw0LzRiyDQtNC+0YfQtdGA0LXQuVwiLFwi0K/QtNC10YDQvdGL0LUg0YHRgtCw0L3RhtC40LhcIixcItCf0YzRj9C90LDRjyDRgdGC0YDRg9C90LBcIixcItCeLCDRgNCw0LkhXCIsXCLQm9Cw0LfRg9GA0L3Qvi3QsdC40YDRjtC30L7QstGL0LVcIixcItCf0L7RgdC/0LgsINGA0L7Qui3QvS3RgNC+0LvQu1wiLFwi0JDQutCy0LDQu9Cw0L3Qs9C4XCIsXCLQktC10YHQvdCwXCIsXCLQndC+0YDQvNCw0LvRjNC90YvQuSDQsdC40LfQvdC10YFcIixcItCk0LDQvdGC0LDRgdGC0LjQutCwXCIsXCLQmtGA0YPQsyDQt9Cw0LzQutC90YPQu9GB0Y9cIl0sdGltZTpbXCIwMTo1N1wiLFwiMDM6NDdcIixcIjA0OjAwXCIsXCIwMzoxMFwiLFwiMDM6NDJcIixcIjA0OjQ3XCIsXCIwNDo0OFwiLFwiMDM6NDRcIixcIjA0OjIzXCIsXCIwNDo1NFwiLFwiMDU6MzNcIixcIjA1OjE0XCIsXCIwMzo1NVwiLFwiMDQ6MDBcIixcIjA0OjE1XCIsXCIwNDoyN1wiLFwiMDU6MDBcIixcIjA1OjAwXCIsXCIwNDoyOFwiLFwiMDM6NDJcIixcIjAyOjU3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjguanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIkNvbXJhZGUgQW1iYXNzYWRvclwiLHllYXI6MjAwOSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wiTW90aGVycyBBbmQgRGF1Z2h0ZXJzXCIsXCJIZXksIFRvdmFyaXNoY2hcIixcIldlIE92ZXJzbGVwdFwiLFwiTXVzaWNpYW5cIixcIk51Y2xlYXIgU3RhdGlvbnNcIixcIlZlbm9tb3VzIFN0YXJcIixcIkluIE91ciBXb3JsZFwiLFwiRHJ1bmtlbiBTdHJpbmdcIixcIlF1ZWVuIE9mIFJvY2tcIixcIlNub3dzdG9ybVwiLFwiV2l0bmVzc2VzXCIsXCJTbGVlcCBSb2NrJ24nUm9sbFwiLFwiQnVybiBJdCBBbGxcIixcIkNhbGlmb3JuaWEgRHJlYW1pbmdcIl0sdGltZTpbXCIwNTozNVwiLFwiMDM6NDhcIixcIjAzOjA5XCIsXCIwMzo0M1wiLFwiMDU6MTRcIixcIjAzOjAxXCIsXCIwNDo1NlwiLFwiMDM6NTVcIixcIjAzOjA4XCIsXCIwMzo0NVwiLFwiMDM6MDJcIixcIjA0OjI3XCIsXCIwNjowN1wiLFwiMDM6MTJcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQtdC00LrQuNC1INC30LXQvNC70LhcIix5ZWFyOjIwMTAsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCS0L7QudC90LAg0YfQtdC70L7QstC10YfQutC+0LJcIixcItCh0LzQvtCzXCIsXCLQktC10YfQtdGAXCIsXCLQlNGA0YPQs9C40LUg0LzQtdGB0YLQsFwiLFwi0JzQsNGB0LvQvlwiLFwi0JvRg9GH0LhcIixcItCU0LXQstC+0YfQutC+0LTRgNGD0LNcIixcItCo0LDQvNC+0YDQsFwiLFwi0JjQtNC4LCDRjyDQsdGD0LTRg1wiLFwi0J3QtdGCINC90LXRgiDQvdC10YJcIixcItCd0LDRgNC60L7RgtC40LrQsNC8IOKAkyDQvdC10YIhXCIsXCLQodCw0YPQvdC00YLRgNC10LpcIixcItCd0LAg0L/QtdGA0LXQutGA0LXRgdGC0LrQsNGFINGB0YPQtNGM0LHRiyAo0KHRgtCw0L3RjCDRh9C10LvQvtCy0LXQutC+0LwpXCIsXCLQoSDQndC+0LLRi9C8INCz0L7QtNC+0LwsINC60YDQvtGI0LrQsCFcIl0sdGltZTpbXCIwMzo1OFwiLFwiMDQ6MTVcIixcIjA0OjI0XCIsXCIwMzo0NFwiLFwiMDM6NTlcIixcIjA0OjUxXCIsXCIwMzo0OFwiLFwiMDM6MDdcIixcIjA1OjQzXCIsXCIwNDowOFwiLFwiMDM6NDFcIixcIjAzOjU3XCIsXCIwMjozOFwiLFwiMDU6MDVcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTAuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCc0YPQvNC40LrQsNC8INC+0YIg0YLRgNC+0LvQu9C40LrQvtCyLiDQn9C+0YHQv9C4LCDRgNC+0Lot0L0t0YDQvtC70LtcIix5ZWFyOjIwMTIsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCt0YLQviDQv9C+INC70Y7QsdCy0LhcIixcItCeLCDRgNCw0LlcIixcItCU0LXQu9GM0YTQuNC90YtcIixcItCi0LDQutC40LUg0LTQtdCy0YfQvtC90LrQuFwiLFwi0KLQsNC6INC90LDQtNC+XCIsXCLQoSDQvdC+0LLRi9C8INCz0L7QtNC+0LwsINC60YDQvtGI0LrQsFwiLFwi0J3QtdCy0LXRgdGC0LBcIixcItCd0L7QstCw0Y8g0LvRg9C90LAg0LDQv9GA0LXQu9GPXCIsXCLQn9C+0YHQv9C4LCDRgNC+0Lot0L0t0YDQvtC70LtcIixcItCc0L7RjyDQv9C10LLQuNGG0LBcIixcItCX0LDQsdCw0LLRi1wiXSx0aW1lOltcIjAzOjQ2XCIsXCIwMzowNlwiLFwiMDU6MTFcIixcIjA0OjM4XCIsXCIwNDowMVwiLFwiMDQ6NThcIixcIjAzOjE4XCIsXCIwMzoxMlwiLFwiMDM6MzRcIixcIjA0OjI4XCIsXCIwMzozMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0J/QuNGA0LDRgtGB0LrQuNC1INC60L7Qv9C40LhcIix5ZWFyOjIwMTUsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItChINGH0LjRgdGC0L7Qs9C+INC70LjRgdGC0LBcIixcItCc0LXQtNC70LXQvdC90YvQtSDRgtCw0L3RhtGLXCIsXCLQktC40YLQsNC80LjQvdGLXCIsXCLQn9C40YDQsNGC0YHQutC40LUg0LrQvtC/0LjQuFwiLFwi0JrQsNC20LXRgtGB0Y9cIixcItCc0L7Qu9C90LjRj1wiLFwi0JfQvtC70L7RgtC+0LUg0YHQtdGA0LTRhtC1XCIsXCLQn9C+0YHQu9C10LTQvdC40Lkg0L7RgtC/0YPRgdC60L3QvtC5XCIsXCLQmtGD0LrQu9GLXCIsXCLQnNC+0YjQutCwXCIsXCLQk9C00LUg0LLRiywg0LTQtdCy0L7Rh9C60LhcIixcItCa0YLQviDQsdGD0LTQtdGCINGB0L/QsNGB0LDRgtGMINGA0L7Qui3QvS3RgNC+0LvQu1wiLFwi0KjRgtC+0YDQvFwiLFwi0J3QvtGP0LHRgNGMXCIsXCIybmQgV2luZFwiLFwiRmFrZSBhIEZha2VcIixcIkRvbHBoaW5zXCIsXCIxOTg0IFBhcnQgSUlcIixcIkhvcm9uZ2J1bFwiLFwiV2l0Y2hcIixcIlBvbGFyIEJlYXJcIixcIlJvdW5kIGFuZCBSb3VuZFwiLFwiT3kgT3kgT3lcIixcIkNoYS1NYS1DaGFtLUFcIixcIllvdSBDcnVzaCBvbiBNZVwiLFwiSW4gVGhlIFZhbGxleSBvZiBFYXNlXCIsXCJNYWdpYyBTdG9uZVwiLFwiS3VhaXp1b2thaVwiXSx0aW1lOltcIjAzOjU4XCIsXCIwOTowMlwiLFwiMDQ6MTdcIixcIjA2OjI4XCIsXCIwNDoyN1wiLFwiMDQ6MzJcIixcIjAzOjM0XCIsXCIwMzozMlwiLFwiMDI6NThcIixcIjAzOjQ5XCIsXCIwNDo0OFwiLFwiMDQ6MTZcIixcIjAzOjQwXCIsXCIwNjowMFwiLFwiMDU6MTVcIixcIjAzOjQzXCIsXCIwNDo0NlwiLFwiMDM6MTFcIixcIjA0OjQ0XCIsXCIwMzoyMlwiLFwiMDQ6MDFcIixcIjAzOjQ1XCIsXCIwMzozNFwiLFwiMDM6MzJcIixcIjAzOjQzXCIsXCIwODoyN1wiLFwiMDY6MzlcIixcIjAzOjQ4XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEyLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9XG5cbl1cblxuXG5cblxuIyBleHBvcnRzLmZhdkxpc3QgPSB7XG4jIFx0c29uZ3M6IFtcImFkXCJdXG4jIFx0dGltZTogW1wiMToxXCJdXG4jIFx0YWxidW1zOiBbM11cbiMgfVxuZXhwb3J0cy5mYXZMaXN0ID0ge1xuXHRzb25nczogW1wi0JLQu9Cw0LTQuNCy0L7RgdGC0L7QuiAyMDAwXCIsIFwi0J3QtdCy0LXRgdGC0LA/XCIsIFwi0KPRgtC10LrQsNC5XCIsIFwi0JzQtdC00LLQtdC00LjRhtC/XCIsICBcItCt0YLQviDQv9C+INC70Y7QsdCy0LhcIiwgXCLQl9Cw0LHQsNCy0YtcIiwgXCLQotCw0LrQuNC1INC00LXQstGH0L7QvdC60LhcIiwgXCLQlNC10LLQvtGH0LrQsFwiLCBcItCk0LDQvdGC0LDRgdGC0LjQutCwXCIsIFwi0JTQtdC70YzRhNC40L3Ri1wiXVxuXHRzb3VyY2U6IHJhbmRvbVNvdXJjZVxuXG5cdHRpbWU6IFtcIjM6NDdcIiwgXCI0OjA5XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIl1cblx0YWxidW1zOiBbMSwgMywgMSwgNSwgNCwgMSwgNSwgMSwgOSwgMF1cbn0iLCJjb25maWcgPSBcImFydGlzdHMvc3BsZWFuXCJcbmV4cG9ydHMuY29uZmlnID0gY29uZmlnXG5cbmdyZXlzX3doaXRlID0gXCIjRkZGRkZGXCJcbmdyZXlzX3ByZV93aGl0ZSA9IFwiI0Y3RjdGN1wiXG5ncmV5c191bHRyYV9saWdodCA9IFwiI0VFRUVFRVwiXG5ncmV5c19saWdodGVzdCA9IFwiI0RERERERFwiXG5ncmV5c19saWdodGVyID0gXCIjQ0NDQ0NDXCJcbmdyZXlzX2Jhc2UgPSBcIiM5OTk5OTlcIlxuZ3JleXNfZGFya2VyID0gXCIjNjY2NjY2XCJcbmdyZXlzX2Rhcmtlc3QgPSBcIiMyMjIyMjJcIlxuZ3JleXNfYmxhY2sgPSBcIiMwMDAwMDBcIlxuXG5cbmV4cG9ydHMuY29sb3JUaGVtZSA9IHtcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZDogY29uZmlnICsgXCIvbmF2aWdhdGlvbiBoZWFkZXIucG5nXCJcblx0bmF2aWdhdGlvbl9oZWFkZXJfYmFja2dyb3VuZF9jb2xvcjogXCJyZ2JhKDI0NCwxMjQsNTQsXCJcblx0bmF2aWdhdGlvbl9vdmVybGF5X2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gZGFya2VyLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9oZWFkZXJfdGV4dDogXCIjRkZGRkZGXCJcblx0XG5cdG5hdmlnYXRpb25fYmFja2dyb3VuZDogY29uZmlnICsgXCIvYmcucG5nXCJcblx0IyBuYXZpZ2F0aW9uX3NoYWRvdzogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF9iYWNrZ3JvdW5kOiBcInJnYmEoMCwwLDAsMC4wNilcIlxuXHRuYXZpZ2F0aW9uX3Njcm9sbF90aW1lbGluZTogXCIjOTk5XCJcblx0bmF2aWdhdGlvbl9ibHVyX3JhZGl1czogXCJibHVyKDEwcHgpXCJcblx0bmF2aWdhdGlvbl9ibHVyX2NvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsMC42KVwiXG5cdCMgbmF2aWdhdGlvbl9jYXJkX292ZXJsYXlfYmFja2dyb3VuZDogXCIjRkZGRkZGXCJcblxuXG5cblx0cGxheWVyX2JhY2tncm91bmQ6IFwid2hpdGVcIlxuXHRwbGF5ZXJfcHJvZ3Jlc3NfYmFzZTogXCIjQ0NDXCJcblx0cGxheWVyX3Byb2dyZXNzX2ZpbGxlZDogXCIjRkY4MDEyXCJcblx0cGxheWVyX3NvbmdfdGl0bGU6IFwiYmxhY2tcIlxuXHRwbGF5ZXJfYWxidW1fdGl0bGU6IFwiIzY2NlwiXG5cdFxuXHRwbGF5ZXJfc2hhZG93X2NvbG9yOiBcInJnYmEoMCwwLDAsMC4yKVwiXG5cdHBsYXllcl9zaGFkb3dfeTogLThcblx0cGxheWVyX3NoYWRvd19ibHVyOiAyMFxuXG5cblxuXHRjYXJkX3NoYWRvd19jb2xvcjogXCJyZ2JhKDAsMCwwLDAuMilcIlxuXHRjYXJkX3NoYWRvd195OiAwXG5cdGNhcmRfc2hhZG93X2JsdXI6IDIwXG5cdFxuXHQjIERldGFpbGVkIEFsYnVtXG5cdGRldGFpbGVkX2FsYnVtX2JhY2tncm91bmQ6IFwid2hpdGVcIlxuXHRkZXRhaWxlZF9hbGJ1bV90aXRsZTogXCJibGFja1wiXG5cdGRldGFpbGVkX2FsYnVtX3llYXI6IFwiIzY2NlwiXG5cdGZhdl9zb25nc190aXRsZTogXCIjOTk5XCJcblx0XG5cdCMgRGV0YWlsZWQgQWxidW0gU29uZ1xuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX3RpdGxlOiBcIiMwMDBcIlxuXHRkZXRhaWxlZF9hbGJ1bV9zb25nX251bWJlcjogXCIjNjY2XCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aW1lOiBcIiM2NjZcIlxuXG59XG5cblxuXG5cblxubmV3c01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8wLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzAuanBnXCJcbn1cblxubmV3c01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEuanBnXCJcbn1cblxubmV3c01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8yLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzIuanBnXCJcbn1cblxubmV3c01vZGVsMyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8zLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzMuanBnXCJcbn1cblxubmV3c01vZGVsNCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy80LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzQuanBnXCJcbn1cblxubmV3c01vZGVsNSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy81LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzUuanBnXCJcbn1cblxubmV3c01vZGVsNiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy82LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzYuanBnXCJcbn1cblxubmV3c01vZGVsNyA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvNy5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy83LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzcuanBnXCJcbn1cblxubmV3c01vZGVsOCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvOC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy84LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzguanBnXCJcbn1cblxubmV3c01vZGVsOSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi9uZXdzL2Z1bGwvMS5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy85LmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzkuanBnXCJcbn1cblxubmV3c01vZGVsMTAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEwLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvY292ZXJzLzEwLmpwZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvbmV3cy90ZXh0LzEwLmpwZ1wiXG59XG5cbmV4cG9ydHMuZmVlZERhdGEgPSBbbmV3c01vZGVsMCwgbmV3c01vZGVsMSwgbmV3c01vZGVsMiwgbmV3c01vZGVsMywgbmV3c01vZGVsNCwgbmV3c01vZGVsNSwgbmV3c01vZGVsNiwgbmV3c01vZGVsNywgbmV3c01vZGVsOCwgbmV3c01vZGVsOSwgbmV3c01vZGVsMTBdXG5cblxuXG5cblxuXG5cblxuXG52aWRlb01vZGVsMCA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8wLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMSA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8xLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG52aWRlb01vZGVsMiA9IHsgXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9wcmV2aWV3cy8yLnBuZ1wiXG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMC5tcDRcIlxufVxuXG5cblxucGxheWxpc3QwID0ge1xuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcblx0aW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL2NvdmVycy8wLnBuZ1wiXG5cdHRleHRJbWFnZTogY29uZmlnICsgXCIvdmlkZW8vdGV4dC8wLnBuZ1wiXG59XG5cbnBsYXlsaXN0MSA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8xLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMS5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMS5wbmdcIlxufVxuXG5leHBvcnRzLnBsYXlsaXN0c0RhdGEgPSBbcGxheWxpc3QwLCBwbGF5bGlzdDFdXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMl1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgR2V0dGluZyBEYXRhXG5cbmNvbmZpZyA9IFwiYXJ0aXN0cy9zcGxlYW5cIlxuXG4jIGFsYnVtTW9kZWwwID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAxOTk0XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAxOTk1XG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDE5OTlcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDMgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAwNVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzMuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMjAwNlxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMjAwN1xuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDA5XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw3ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDggPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDIwMTJcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDkgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDIwMTNcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEwID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTRcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8yLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDExID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTVcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEyID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTZcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDEzID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMTdcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE0ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMThcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDE1ID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMjBcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cblxuXG5cblxuIyBleHBvcnRzLmFsYnVtc0RhdGEgPSBbYWxidW1Nb2RlbDAsIGFsYnVtTW9kZWwxLCBhbGJ1bU1vZGVsMiwgYWxidW1Nb2RlbDMsIGFsYnVtTW9kZWw0LCBhbGJ1bU1vZGVsNSwgYWxidW1Nb2RlbDYsIGFsYnVtTW9kZWw3LCBhbGJ1bU1vZGVsOCwgYWxidW1Nb2RlbDksIGFsYnVtTW9kZWwxMCwgYWxidW1Nb2RlbDExLCBhbGJ1bU1vZGVsMTIsIGFsYnVtTW9kZWwxMywgYWxidW1Nb2RlbDE0LCBhbGJ1bU1vZGVsMTVdXG5cblxuXG5jb25maWdBbGJ1bXMgPSBjb25maWcgKyBcIi9hbGJ1bXMvXCJcblxucmFuZG9tU291cmNlID0gW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiXVxuXG5cbmV4cG9ydHMuYWxidW1zRGF0YSA9IFt7dGl0bGU6XCLQn9GL0LvRjNC90LDRjyDQsdGL0LvRjFwiLHllYXI6MTk5NCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JbQtdGA0YLQstCwINGC0LDQu9C+0LPQviDQu9GM0LTQsFwiLFwi0KXQvtC70L7QtNC90YvQtSDQt9C40LzRi1wiLFwi0JzQvdC1INGB0LrQsNC30LDQu9C4INGB0LvQvtCy0L5cIixcItCf0L7QtCDRgdGD0YDQtNC40L3QutGDXCIsXCLQk9GA0L7Qt9CwXCIsXCLQktC+0LnQvdCwXCIsXCLQn9GL0LvRjNC90LDRjyDQsdGL0LvRjC4g0KHQutCw0LfQutCwXCIsXCLQodC10YDQtdCx0YDRj9C90YvQtSDRgNC10LrQuFwiLFwi0KLQstC+0LUg0YDQsNC30LHQuNGC0L7QtSDQv9C10L3RgdC90LVcIixcItCh0LrQsNC30L7Rh9C90YvQuSDQu9C10YjQuNC5XCIsXCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs9GB0LrQvtC1INC90LXQsdC+XCIsXCLQl9Cy0LXRgNC4XCIsXCLQoNGL0LHQsCDQsdC10Lcg0YLRgNGD0YHQvtCyXCJdLHRpbWU6W1wiMDY6MDFcIixcIjAxOjMxXCIsXCIwMzowOFwiLFwiMDM6MjZcIixcIjAzOjQ0XCIsXCIwMjozMFwiLFwiMDU6MjBcIixcIjAyOjUyXCIsXCIwMToyM1wiLFwiMDE6NDJcIixcIjAyOjI5XCIsXCIwMjozNlwiLFwiMDM6MDRcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JrQvtC70LvQtdC60YbQuNC+0L3QtdGAINC+0YDRg9C20LjRj1wiLHllYXI6MTk5NSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JHRg9C00Ywg0LzQvtC10Lkg0YLQtdC90YzRjlwiLFwi0JvRjtCx0L7QstGMINC40LTQtdGCINC/0L4g0L/RgNC+0LLQvtC00LDQvFwiLFwi0KfQtdGA0L3Ri9C5INGG0LLQtdGCINGB0L7Qu9C90YbQsFwiLFwi0KHQsNC80L7QstCw0YBcIixcItCW0LXRgNGC0LLQsCDRgtCw0LvQvtCz0L4g0LvRjNC00LBcIixcItCn0YLQviDRgtGLINCx0YPQtNC10YjRjCDQtNC10LvQsNGC0YxcIixcItCg0YvQsdCwINCx0LXQtyDRgtGA0YPRgdC+0LJcIixcItCf0YvQu9GM0L3QsNGPINCx0YvQu9GMLiDQodC60LDQt9C60LBcIixcItCd0LXRh9C10LPQviDQtNC10LvQsNGC0Ywg0LLQvdGD0YLRgNC4XCIsXCLQmNC00Lgg0YfQtdGA0LXQtyDQu9C10YFcIl0sdGltZTpbXCIwNTo0MVwiLFwiMDQ6MjRcIixcIjA3OjQ3XCIsXCIwNTozMVwiLFwiMDU6NDZcIixcIjA1OjA5XCIsXCIwMzowOVwiLFwiMDU6MzVcIixcIjAzOjI2XCIsXCIwNjozMlwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQpNC+0L3QsNGA0Ywg0L/QvtC0INCz0LvQsNC30L7QvFwiLHllYXI6MTk5Nyx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JzQvtC70LjRgtCy0LBcIixcItCvINC90LUg0YXQvtGH0YMg0LTQvtC80L7QuVwiLFwi0JHQvtC90L3QuCDQuCDQmtC70LDQudC0XCIsXCLQotGA0Lgg0YbQstC10YLQsCAo0J/QtdGA0LLRi9C5INGB0L3QtdCzKVwiLFwi0J3QtdCy0YHQutC40Lkg0L/RgNC+0YHQv9C10LrRglwiLFwi0KHQv9C4INCyINC30LDQsdGA0L7RiNC10L3QvdC+0Lwg0LTQvtC80LVcIixcItCf0YDQuNGA0L7QttC00LXQvdC90YvQuSDRg9Cx0LjQudGG0LBcIixcItCn0LDRgdGC0YPRiNC60LhcIixcItCc0L7RjyDQu9GO0LHQvtCy0YxcIixcItCQ0L3Qs9C70L4t0YDRg9GB0YHQutC40Lkg0YHQu9C+0LLQsNGA0YwgKNCU0LDQstCw0LksINCb0LDQvNCwKVwiLFwi0KHQutC+0YDQviDQsdGD0LTQtdGCINGB0L7Qu9C90LXRh9C90L5cIixcItCX0LAg0YHRgtC10L3QvtC5XCJdLHRpbWU6W1wiMzJcIixcIjAzOjQ5XCIsXCIwMjo0MFwiLFwiMDQ6NDBcIixcIjA1OjEyXCIsXCIwNDoxN1wiLFwiMDM6MjFcIixcIjA0OjQ0XCIsXCIwMzozNlwiLFwiMDQ6MzZcIixcIjA0OjQyXCIsXCIwMToyN1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIyLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQk9GA0LDQvdCw0YLQvtCy0YvQuSDQsNC70YzQsdC+0LxcIix5ZWFyOjE5OTgsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCS0LXRgdGMINGN0YLQvtGCINCx0YDQtdC0XCIsXCLQlNC+0YHRgtCw0L3RjCDQs9GA0LDQvdCw0YLRg1wiLFwi0J7RgNCx0LjRgiDQsdC10Lcg0YHQsNGF0LDRgNCwXCIsXCLQn9GA0LjRhdC+0LTQuFwiLFwi0KHQstC10YIg0LPQvtGA0LXQuyDQstGB0Y4g0L3QvtGH0YxcIixcItCb0Y7RgdGPINGB0LjQtNC40YIg0LTQvtC80LBcIixcItCR0L7QsyDRg9GB0YLQsNC7INC90LDRgSDQu9GO0LHQuNGC0YxcIixcItCa0LDRgtC40YHRjCwg0LrQvtC70LXRgdC+IVwiLFwi0JLRi9GF0L7QtNCwINC90LXRglwiLFwi0JrQvtC60YLQtdC50LvQuCDRgtGA0LXRgtGM0LXQuSDQvNC40YDQvtCy0L7QuVwiLFwi0JTQttC40LxcIixcItCc0LDRgNC40Y8g0Lgg0KXRg9Cw0L3QsFwiLFwi0J/QvtC00LLQvtC00L3QsNGPINC70L7QtNC60LBcIl0sdGltZTpbXCIwMzowNlwiLFwiMDQ6MTBcIixcIjAyOjE3XCIsXCIwNDowMlwiLFwiMDI6MzBcIixcIjAzOjU3XCIsXCIwMjozMlwiLFwiMDI6NDdcIixcIjAzOjQ3XCIsXCIwMjo1MlwiLFwiMDI6NDdcIixcIjA4OjAzXCIsXCIwMzo0M1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIzLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQkNC70YzRgtCw0LLQuNGB0YLQsFwiLHllYXI6MTk5OSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JDQu9GM0YLQsNCy0LjRgdGC0LBcIixcItCc0L7Qu9C+0LrQviDQuCDQvNGR0LRcIixcItCf0LjQuy3QutGD0YDQuNC7XCIsXCLQotC10YDQv9GB0LjRhdC+0YDQsFwiLFwi0JTQsNC70LXQutC+INC00L7QvNC+0LlcIixcItCQ0LHRgdC10L3RglwiLFwi0JTQvtCx0YDRi9GFINC00LXQuyDQvNCw0YHRgtC10YBcIixcItCc0L7RgtC+0YbQuNC60LvQtdGC0L3QsNGPINGG0LXQv9GMXCIsXCLQodGD0LzQsNGB0YjQtdC00YjQuNC5INCw0LLRgtC+0LHRg9GBXCIsXCLQkNC70LrQvtCz0L7Qu9GMXCIsXCLQktGB0YLRgNC10YLQuNC80YHRjyDQt9Cw0LLRgtGA0LBcIixcItCc0L7Qu9C+0LrQviDQuCDQvNGR0LRcIl0sdGltZTpbXCIwNjowNlwiLFwiMDQ6MzlcIixcIjA0OjUzXCIsXCIwMjo0N1wiLFwiMDM6NTdcIixcIjAxOjU0XCIsXCIwNDo1NVwiLFwiMDQ6MTVcIixcIjAzOjUwXCIsXCIwNToyNVwiLFwiMDQ6MjdcIixcIjA1OjAzXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjQuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcIjI1LdC5INC60LDQtNGAXCIseWVhcjoyMDAxLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQm9C40L3QuNGPINC20LjQt9C90LhcIixcItCX0LLQtdC30LTQsCDRgNC+0Lot0L0t0YDQvtC70LvQsFwiLFwi0JLRgdC10LPQviDRhdC+0YDQvtGI0LXQs9C+XCIsXCLQnNC+0ZEg0YHQtdGA0LTRhtC1XCIsXCLQoNC40LrQuC3QotC40LrQuC3QotCw0LLQuFwiLFwiU09TIVwiLFwiRmVsbGluaVwiLFwi0J7RgdGC0LDQtdC80YHRjyDQt9C40LzQvtCy0LDRgtGMXCIsXCLQotC10LHQtSDRjdGC0L4g0YHQvdC40YLRgdGPXCIsXCLQodC+0LLRgdC10Lwg0LTRgNGD0LPQvtC5XCIsXCLQn9C70LDRgdGC0LzQsNGB0YHQvtCy0LDRjyDQttC40LfQvdGMXCIsXCLQn9C+0Lkg0LzQvdC1INC10YnRkVwiLFwi0JvQtdC90LjQvdCz0YDQsNC0IC0gQW1zdGVyZGFtXCIsXCJGaW5lXCJdLHRpbWU6W1wiMDM6MDBcIixcIjA0OjEwXCIsXCIwMjo1OVwiLFwiMDQ6MDlcIixcIjAxOjU4XCIsXCIwNDoyNlwiLFwiMDQ6NDRcIixcIjAzOjM4XCIsXCIwNDo1OFwiLFwiMDI6MDhcIixcIjAyOjI1XCIsXCIwMzo1NVwiLFwiMDI6MzZcIixcIjI5XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjUuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCd0L7QstGL0LUg0LvRjtC00LhcIix5ZWFyOjIwMDMsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCd0L7QstGL0LUg0LvRjtC00LhcIixcItCS0YDQtdC80Y8sINCd0LDQt9Cw0LQhXCIsXCLQk9Cw0L3QtNCx0L7Qu1wiLFwi0KHQu9C+0LzQsNC90L4g0JLRgdC1XCIsXCLQlNC10LLRj9GC0LjRjdGC0LDQttC90YvQuSDQtNC+0LxcIixcItCR0LvQvtC60LDQtNCwXCIsXCLQktCw0LvQtNCw0LlcIixcItCZ0L7QsyDQodC/0L7QutC+0LXQvVwiLFwi0KHQtdCy0LXRgNC+LdCX0LDQv9Cw0LRcIixcItCg0K3QnyAo0J3QtdGA0LLQvdC+0LUg0KHQtdGA0LTRhtC1KVwiLFwi0JDQu9GM0YLQsNCy0LjRgdGC0LAgKNCU0YDRg9Cz0LDRjyDQotC+0YfQutCwINCX0YDQtdC90LjRjylcIl0sdGltZTpbXCIwMzo0NFwiLFwiMDQ6MTJcIixcIjAyOjM1XCIsXCIwNDoxNlwiLFwiMDQ6MzBcIixcIjAzOjIyXCIsXCIwNDoyN1wiLFwiMDI6NTZcIixcIjAzOjUzXCIsXCIwMzoxNFwiLFwiMDQ6MDdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDRhdGA0L7QvdC40LrQsCDRgdC+0LHRi9GC0LjQuVwiLHllYXI6MjAwNCx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0J7QutC10LDQvVwiLFwi0KHQtdC80Ywg0LLQvtGB0YzQvNGL0YVcIixcItCo0LDRgtC+INCc0LDRgNCz0L5cIixcItCc0Ysg0YHQuNC00LXQu9C4INC4INC60YPRgNC40LvQuFwiLFwi0KHQuNCw0L3Rg9C60LLQuNC70YxcIixcItCn0LXQu9C+0LLQtdC6INC4INCU0LXRgNC10LLQvlwiLFwi0JvQsNCx0LjRgNC40L3RglwiLFwi0KjQsNCz0LhcIixcItCR0LXRgNC40LvQu9C40LlcIixcItCf0LDRgNC+0LLQvtC3XCIsXCLQm9GO0LTQuCDQvdCwINC70LDQtNC+0L3QuFwiLFwi0KPRgNC+0Log0LPQtdC+0LPRgNCw0YTQuNC4XCIsXCLQktGB0ZEg0LLQutC70Y7Rh9C10L3QvlwiLFwi0JPQvtC70L7RgSDQt9CwINC60LDQtNGA0L7QvFwiLFwi0KDQvtC80LDQvdGBXCJdLHRpbWU6W1wiMzZcIixcIjA0OjIyXCIsXCIwMzo1NFwiLFwiMDM6MTlcIixcIjAyOjMyXCIsXCIwMjoxNlwiLFwiMDQ6NDhcIixcIjAxOjI5XCIsXCIwMzozMVwiLFwiNTNcIixcIjAyOjAxXCIsXCIwNDo1OVwiLFwiMDM6MjBcIixcIjAxOjA4XCIsXCIwMzoyN1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI3LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCIseWVhcjoyMDA3LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQnNC10LvRjNC60L3Rg9C70LAg0YfRjNGPLdGC0L4g0YLQtdC90YxcIixcItCh0LrQsNC20LhcIixcItCc0LDRgtGHXCIsXCLQndCwINGB0YfQsNGB0YLRjNC1XCIsXCLQktC+0LvQvdCwXCIsXCLQm9C10L/QtdGB0YLQvtC6XCIsXCLQmNC80L/QtdGA0LDRgtC+0YBcIixcItCR0LXRgtGF0L7QstC10L1cIixcItCc0LDRj9C6XCIsXCLQn9GA0LDQt9C00L3QuNC6XCIsXCLQodGD0YXQsNGA0Lgg0Lgg0YHRg9GI0LrQuFwiLFwi0JzQvtCx0LjQu9GM0L3Ri9C5XCIsXCLQmtC+0LvQvtC60L7Qu1wiLFwi0J/RgNC+0LHQutC4XCIsXCLQnNCw0LzQvNCwINC80LjRj1wiLFwi0J/RgNC+0YfRjFwiLFwi0KHRi9C9XCJdLHRpbWU6W1wiMDM6MTZcIixcIjAzOjEyXCIsXCIwMjo1MVwiLFwiMDI6NDRcIixcIjAzOjI5XCIsXCIwMzozOFwiLFwiMDE6MTVcIixcIjAyOjQ0XCIsXCIwMzo0OVwiLFwiMDI6MjFcIixcIjA1OjMxXCIsXCIwMzoyNVwiLFwiMDM6NDBcIixcIjA0OjAzXCIsXCIwMzowMVwiLFwiMDM6MjBcIixcIjAxOjUxXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjguanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCh0LjQs9C90LDQuyDQuNC3INC60L7RgdC80L7RgdCwXCIseWVhcjoyMDA5LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQndCw0YHRgtGA0L7QudC60LAg0LfQstGD0LrQsFwiLFwi0JTRi9GI0Lgg0LvQtdCz0LrQvlwiLFwi0JTQvtCx0YDQviDQv9C+0LbQsNC70L7QstCw0YLRjFwiLFwi0JHQvtC70YzRiNC1INC90LjQutCw0LrQvtCz0L4g0YDQvtC6LdC9LdGA0L7Qu9C70LBcIixcItCS0L3QuNC3INCz0L7Qu9C+0LLQvtC5XCIsXCLQp9C10YDQtNCw0LpcIixcItCX0LXQu9C10L3QsNGPINC/0LXRgdC90Y9cIixcItCa0LDQvNC10L3RjFwiLFwiMzAwN1wiLFwi0JHQtdC3INGC0L7RgNC80L7Qt9C+0LJcIixcItCa0L7RgNCw0LHQu9GMINC20LTQtdGCIVwiLFwi0KfQtdC70L7QstC10Log0L3QtSDRgdC/0LDQu1wiLFwi0JrQvtCy0YfQtdCzXCIsXCLQktGL0L/Rg9GB0YLQuCDQvNC10L3RjyDQvtGC0YHRjtC00LBcIixcItCf0LjRgdGM0LzQvlwiLFwi0JLRgdC1INGC0LDQuiDRgdGC0YDQsNC90L3QvlwiLFwi0JLQsNC70YzRgVwiLFwi0JTQviDQstGB0YLRgNC10YfQuFwiXSx0aW1lOltcIjAyOjQwXCIsXCIwMzo1M1wiLFwiMDQ6MTFcIixcIjA0OjEyXCIsXCIwMzowNVwiLFwiMDQ6MDdcIixcIjAzOjMwXCIsXCIwNDo1OVwiLFwiMDI6MTFcIixcIjAzOjE0XCIsXCIwMjo0NFwiLFwiMDI6NTJcIixcIjAzOjMyXCIsXCIwMzoxMVwiLFwiMDI6MjlcIixcIjAyOjAzXCIsXCIwMzowN1wiLFwiMDQ6MjJcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiOS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0J7QsdC80LDQvSDQt9GA0LXQvdC40Y9cIix5ZWFyOjIwMTIsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCj0LLQtdGA0YLRjtGA0LBcIixcItCb0LXRgtC10LvQsCDQttC40LfQvdGMXCIsXCLQp9GR0YDQvdCw0Y8g0JLQvtC70LPQsFwiLFwi0JvQtdGB0YLQvdC40YbQsFwiLFwi0KHRgtGA0LDRiNC90LDRjyDRgtCw0LnQvdCwXCIsXCLQn9C10YLQtdGA0LHRg9GA0LPRgdC60LDRjyDRgdCy0LDQtNGM0LHQsFwiLFwi0JTQvtGH0Ywg0YHQsNC80YPRgNCw0Y9cIixcItCk0LjQsdC+0L3QsNGH0YfQuFwiLFwi0JIg0LzQuNGA0LUg0LjQu9C70Y7Qt9C40LlcIixcItCf0YDQsNC30LTQvdC40LogKNCU0YDRg9Cz0LDRjyDRgtC+0YfQutCwINC30YDQtdC90LjRjylcIixcItCa0L7QstGIXCIsXCLQodC+0LvQvdGG0LUg0LLQt9C+0LnQtNGR0YJcIixcItCn0YPQtNCw0LpcIixcItCS0L7Qu9GI0LXQsdC90L7QtSDRgdC70L7QstC+XCJdLHRpbWU6W1wiMDE6NDRcIixcIjAyOjMwXCIsXCIwMjo0NlwiLFwiMDI6MThcIixcIjAyOjI0XCIsXCIwNDoyMFwiLFwiMDM6MzZcIixcIjAzOjI3XCIsXCIwMjo1OFwiLFwiMDI6MzlcIixcIjAzOjAxXCIsXCIwMzozNVwiLFwiMDI6MjlcIixcIjA0OjI0XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEwLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNC10LfQvtC90LDQvdGBLiDQp9Cw0YHRgtGMIDFcIix5ZWFyOjIwMTQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCS0YHQsNC00L3QuNC6XCIsXCLQkNC5INC70L7QsiDRjiFcIixcItCh0YLQsNGA0YvQuSDQtNC+0LxcIixcItCc0L7RgNC+0Lcg0L/QviDQutC+0LbQtVwiLFwi0JzRi9GB0LvRjFwiLFwi0JXRgdGC0Ywg0LrRgtC+LdC90LjQsdGD0LTRjCDQttC40LLQvtC5P1wiLFwi0KDQsNC5INCyINGI0LDQu9Cw0YjQtVwiLFwi0JLRgdGRINC90LDQvtCx0L7RgNC+0YJcIixcItCf0L7QvNC+0LvRh9C40Lwg0L3QtdC80L3QvtCz0L5cIixcItCf0YPRgdGC0Ywg0LjQs9GA0LDQtdGCINC80YPQt9GL0LrQsCFcIixcItCT0L7RgNC40LfQvtC90YIg0YHQvtCx0YvRgtC40LlcIixcItCh0YDQtdC00Lgg0LfQuNC80YtcIixcItCU0LLQtdGA0L3QvtC5INCz0LvQsNC30L7QulwiLFwi0J/QvtC00LLQvtC00L3QsNGPINC/0LXRgdC90Y9cIl0sdGltZTpbXCIwMjo1MFwiLFwiMDM6MjBcIixcIjAyOjM5XCIsXCIwMzowNVwiLFwiMDM6NTJcIixcIjAzOjEwXCIsXCIwMzoxM1wiLFwiMDE6MjJcIixcIjAzOjQyXCIsXCIwMzoxM1wiLFwiMDI6MzVcIixcIjAyOjQyXCIsXCIwNToyM1wiLFwiMDM6MjhcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMTEuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LXQt9C+0L3QsNC90YEuINCn0LDRgdGC0YwgMlwiLHllYXI6MjAxNSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JrRgNCw0YHQvtGC0LBcIixcItCe0YDQutC10YHRgtGAXCIsXCLQn9C10YHQvdGPINC90LAg0L7QtNC90L7QvCDQsNC60LrQvtGA0LTQtVwiLFwi0JTQstCwINC/0LvRjtGBINC+0LTQuNC9XCIsXCLQn9C+0LvQvdCw0Y8g0LvRg9C90LBcIixcItCi0LDQvdGG0YPQuSFcIixcItCh0LjQvNGE0L7QvdC40Y9cIixcItCd0LXRhNGC0YxcIixcItCf0L7QttCw0YBcIixcItCo0LDRhdC80LDRgtGLXCIsXCLQmNGB0YfQtdC30LDQtdC8INCyINGC0LXQvNC90L7RgtC1XCJdLHRpbWU6W1wiMDI6NThcIixcIjA0OjExXCIsXCIwNDoxMFwiLFwiMDI6MzdcIixcIjAzOjM4XCIsXCIwNDoxMFwiLFwiMDI6NTRcIixcIjAyOjE0XCIsXCIwMjo1M1wiLFwiMDU6NTNcIixcIjA0OjA1XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjEyLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9XG5cbl1cblxuXG5cblxuIyBleHBvcnRzLmZhdkxpc3QgPSB7XG4jIFx0c29uZ3M6IFtcImFkXCJdXG4jIFx0dGltZTogW1wiMToxXCJdXG4jIFx0YWxidW1zOiBbM11cbiMgfVxuZXhwb3J0cy5mYXZMaXN0ID0ge1xuXHRzb25nczogW1wi0JLRi9GF0L7QtNCwINC90LXRglwiLCBcItCc0L7QtSDRgdC10YDQtNGG0LVcIiwgXCLQotCw0L3RhtGD0LlcIiwgXCLQoNC+0LzQsNC90YFcIiwgIFwi0JvQuNC90LjRjyDQltC40LfQvdC4XCIsIFwi0J7RgNC60LXRgdGC0YBcIiwgXCLQntGA0LHQuNGCINCx0LXQtyDRgdCw0YXQsNGA0LBcIiwgXCLQlNC+0YfRjCDRgdCw0LzRg9GA0LDRj1wiLCBcItCg0LDQuSDQsiDRiNCw0LvQsNGI0LVcIiwgXCLQn9C+0Lkg0LzQvdC1INC10YnQtVwiXVxuXHRzb3VyY2U6IHJhbmRvbVNvdXJjZVxuXG5cdHRpbWU6IFtcIjM6NDdcIiwgXCI0OjA5XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIl1cblx0YWxidW1zOiBbMywgNSwgMTIsIDcsIDUsIDEyLCAzLCAxMCwgMTEsIDVdXG59IiwiY29uZmlnID0gXCJhcnRpc3RzL3NwbGVhblwiXG5leHBvcnRzLmNvbmZpZyA9IGNvbmZpZ1xuXG5ncmV5c193aGl0ZSA9IFwiI0ZGRkZGRlwiXG5ncmV5c19wcmVfd2hpdGUgPSBcIiNGN0Y3RjdcIlxuZ3JleXNfdWx0cmFfbGlnaHQgPSBcIiNFRUVFRUVcIlxuZ3JleXNfbGlnaHRlc3QgPSBcIiNERERERERcIlxuZ3JleXNfbGlnaHRlciA9IFwiI0NDQ0NDQ1wiXG5ncmV5c19iYXNlID0gXCIjOTk5OTk5XCJcbmdyZXlzX2RhcmtlciA9IFwiIzY2NjY2NlwiXG5ncmV5c19kYXJrZXN0ID0gXCIjMjIyMjIyXCJcbmdyZXlzX2JsYWNrID0gXCIjMDAwMDAwXCJcblxuXG5leHBvcnRzLmNvbG9yVGhlbWUgPSB7XG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL25hdmlnYXRpb24gaGVhZGVyLnBuZ1wiXG5cdG5hdmlnYXRpb25faGVhZGVyX2JhY2tncm91bmRfY29sb3I6IFwicmdiYSgyNDQsMTI0LDU0LFwiXG5cdG5hdmlnYXRpb25fb3ZlcmxheV9iYWNrZ3JvdW5kOiBjb25maWcgKyBcIi9uYXZpZ2F0aW9uIGRhcmtlci5wbmdcIlxuXHQjIG5hdmlnYXRpb25faGVhZGVyX3RleHQ6IFwiI0ZGRkZGRlwiXG5cdFxuXHRuYXZpZ2F0aW9uX2JhY2tncm91bmQ6IGNvbmZpZyArIFwiL2JnLnBuZ1wiXG5cdCMgbmF2aWdhdGlvbl9zaGFkb3c6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfYmFja2dyb3VuZDogXCJyZ2JhKDAsMCwwLDAuMDYpXCJcblx0bmF2aWdhdGlvbl9zY3JvbGxfdGltZWxpbmU6IFwiIzk5OVwiXG5cdG5hdmlnYXRpb25fYmx1cl9yYWRpdXM6IFwiYmx1cigxMHB4KVwiXG5cdG5hdmlnYXRpb25fYmx1cl9jb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuNilcIlxuXHQjIG5hdmlnYXRpb25fY2FyZF9vdmVybGF5X2JhY2tncm91bmQ6IFwiI0ZGRkZGRlwiXG5cblxuXG5cdHBsYXllcl9iYWNrZ3JvdW5kOiBcIndoaXRlXCJcblx0cGxheWVyX3Byb2dyZXNzX2Jhc2U6IFwiI0NDQ1wiXG5cdHBsYXllcl9wcm9ncmVzc19maWxsZWQ6IFwiI0ZGODAxMlwiXG5cdHBsYXllcl9zb25nX3RpdGxlOiBcImJsYWNrXCJcblx0cGxheWVyX2FsYnVtX3RpdGxlOiBcIiM2NjZcIlxuXHRcblx0cGxheWVyX3NoYWRvd19jb2xvcjogXCJyZ2JhKDAsMCwwLDAuMilcIlxuXHRwbGF5ZXJfc2hhZG93X3k6IC04XG5cdHBsYXllcl9zaGFkb3dfYmx1cjogMjBcblxuXG5cblx0Y2FyZF9zaGFkb3dfY29sb3I6IFwicmdiYSgwLDAsMCwwLjIpXCJcblx0Y2FyZF9zaGFkb3dfeTogMFxuXHRjYXJkX3NoYWRvd19ibHVyOiAyMFxuXHRcblx0IyBEZXRhaWxlZCBBbGJ1bVxuXHRkZXRhaWxlZF9hbGJ1bV9iYWNrZ3JvdW5kOiBcIndoaXRlXCJcblx0ZGV0YWlsZWRfYWxidW1fdGl0bGU6IFwiYmxhY2tcIlxuXHRkZXRhaWxlZF9hbGJ1bV95ZWFyOiBcIiM2NjZcIlxuXHRmYXZfc29uZ3NfdGl0bGU6IFwiIzk5OVwiXG5cdFxuXHQjIERldGFpbGVkIEFsYnVtIFNvbmdcblx0ZGV0YWlsZWRfYWxidW1fc29uZ190aXRsZTogXCIjMDAwXCJcblx0ZGV0YWlsZWRfYWxidW1fc29uZ19udW1iZXI6IFwiIzY2NlwiXG5cdGRldGFpbGVkX2FsYnVtX3NvbmdfdGltZTogXCIjNjY2XCJcblxufVxuXG5cblxuXG5cbm5ld3NNb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzAuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8wLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8yLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzMuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvMy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8zLmpwZ1wiXG59XG5cbm5ld3NNb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzQuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC80LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzUuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC81LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDYgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNi5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC82LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDcgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzcuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvNy5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC83LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDggPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzguanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC84LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDkgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvbmV3cy9mdWxsLzEuanBnXCJcblx0Y292ZXJJbWFnZTogY29uZmlnICsgXCIvbmV3cy9jb3ZlcnMvOS5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC85LmpwZ1wiXG59XG5cbm5ld3NNb2RlbDEwID0geyBcblx0aW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvZnVsbC8xMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBjb25maWcgKyBcIi9uZXdzL2NvdmVycy8xMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL25ld3MvdGV4dC8xMC5qcGdcIlxufVxuXG5leHBvcnRzLmZlZWREYXRhID0gW25ld3NNb2RlbDAsIG5ld3NNb2RlbDEsIG5ld3NNb2RlbDIsIG5ld3NNb2RlbDMsIG5ld3NNb2RlbDQsIG5ld3NNb2RlbDUsIG5ld3NNb2RlbDYsIG5ld3NNb2RlbDcsIG5ld3NNb2RlbDgsIG5ld3NNb2RlbDksIG5ld3NNb2RlbDEwXVxuXG5cblxuXG5cblxuXG5cblxudmlkZW9Nb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMC5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMS5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMi5wbmdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxuXG5cbnBsYXlsaXN0MCA9IHtcblx0dmlkZW86IGNvbmZpZyArIFwiL3ZpZGVvL21vdmllcy8wLm1wNFwiXG5cdGltYWdlOiBjb25maWcgKyBcIi92aWRlby9jb3ZlcnMvMC5wbmdcIlxuXHR0ZXh0SW1hZ2U6IGNvbmZpZyArIFwiL3ZpZGVvL3RleHQvMC5wbmdcIlxufVxuXG5wbGF5bGlzdDEgPSB7XG5cdHZpZGVvOiBjb25maWcgKyBcIi92aWRlby9tb3ZpZXMvMS5tcDRcIlxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vY292ZXJzLzEucG5nXCJcblx0dGV4dEltYWdlOiBjb25maWcgKyBcIi92aWRlby90ZXh0LzEucG5nXCJcbn1cblxuZXhwb3J0cy5wbGF5bGlzdHNEYXRhID0gW3BsYXlsaXN0MCwgcGxheWxpc3QxXVxuZXhwb3J0cy5tb3ZpZXNEYXRhID0gW3ZpZGVvTW9kZWwwLCB2aWRlb01vZGVsMSwgdmlkZW9Nb2RlbDJdXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIEdldHRpbmcgRGF0YVxuXG5jb25maWcgPSBcImFydGlzdHMvc3BsZWFuXCJcblxuIyBhbGJ1bU1vZGVsMCA9IHtcbiMgXHR0aXRsZTogXCLQoNC10LLQtdGA0YHQuNCy0L3QsNGPINC70L7Qs9C40LrQsCDRgdC+0LHRi9GC0LjQuVwiXG4jIFx0eWVhcjogMTk5NFxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzAuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMSA9IHtcbiMgXHR0aXRsZTogXCLQodC40LPQvdCw0YEg0LjQtyDQutC+0YHQvNC+0YHQsFwiXG4jIFx0eWVhcjogMTk5NVxuI1xuIyBcdHNvbmdzOiBbXCJOaW1idXMgMjAwMFwiLCBcIlJvbGxpbmdzdG9uZXJcIiwgXCJIb3VzdG9uXCIsIFwiVGh1bmRlcmp1aWNlXCIsICBcIk1heSAxM1wiLCBcIkdsb3Vjb21hXCIsIFwiQ2hhdnJvbiBPY2VhblwiLCBcIlRoZSBEb21lXCIsIFwiUGxhbiBCXCIsIFwiTWF5IDEzIFJlbWl4XCIsIFwiTmV2c2t5IFByXCIsIFwiQmxvb2R5IFdhdGVyc1wiLCBcIktub2NrIG91dFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzEuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwid2hpdGVcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsMiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAxOTk5XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwzID0ge1xuIyBcdHRpdGxlOiBcItCg0LDQt9C00LLQvtC10L3QuNC1INC70LjRh9C90L7RgdGC0LhcIlxuIyBcdHllYXI6IDIwMDVcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8zLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDQgPSB7XG4jIFx0dGl0bGU6IFwi0KDQtdCy0LXRgNGB0LjQstC90LDRjyDQu9C+0LPQuNC60LAg0YHQvtCx0YvRgtC40LlcIlxuIyBcdHllYXI6IDIwMDZcbiNcbiMgXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8wLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcImdyZXlcIlxuIyBcdHNvdXJjZTogW1wiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDUgPSB7XG4jIFx0dGl0bGU6IFwi0KHQuNCz0L3QsNGBINC40Lcg0LrQvtGB0LzQvtGB0LBcIlxuIyBcdHllYXI6IDIwMDdcbiNcbiMgXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG4jXG4jIFx0aW1hZ2U6IGNvbmZpZyArIFwiL2FsYnVtcy8xLmpwZ1wiXG4jIFx0dGludENvbG9yOiBcIndoaXRlXCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCJdXG4jIH1cbiNcbiMgYWxidW1Nb2RlbDYgPSB7XG4jIFx0dGl0bGU6IFwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiXG4jIFx0eWVhcjogMjAwOVxuI1xuIyBcdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cbiMgXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cbiNcbiMgXHRpbWFnZTogY29uZmlnICsgXCIvYWxidW1zLzIuanBnXCJcbiMgXHR0aW50Q29sb3I6IFwiZ3JleVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIl1cbiMgfVxuI1xuIyBhbGJ1bU1vZGVsNyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDEwXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw4ID0ge1xuIyBcdHRpdGxlOiBcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0LvQvtCz0LjQutCwINGB0L7QsdGL0YLQuNC5XCJcbiMgXHR5ZWFyOiAyMDEyXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMC5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWw5ID0ge1xuIyBcdHRpdGxlOiBcItCh0LjQs9C90LDRgSDQuNC3INC60L7RgdC80L7RgdCwXCJcbiMgXHR5ZWFyOiAyMDEzXG4jXG4jIFx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIiwgXCJOZXZza3kgUHJcIiwgXCJCbG9vZHkgV2F0ZXJzXCIsIFwiS25vY2sgb3V0XCJdXG4jIFx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMS5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG4jIFx0c291cmNlOiBbXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMCA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE0XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMi5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMSA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE1XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMiA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE2XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxMyA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE3XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxNCA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDE4XG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG4jXG4jIGFsYnVtTW9kZWwxNSA9IHtcbiMgXHR0aXRsZTogXCLQoNCw0LfQtNCy0L7QtdC90LjQtSDQu9C40YfQvdC+0YHRgtC4XCJcbiMgXHR5ZWFyOiAyMDIwXG4jXG4jIFx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuIyBcdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuI1xuIyBcdGltYWdlOiBjb25maWcgKyBcIi9hbGJ1bXMvMy5qcGdcIlxuIyBcdHRpbnRDb2xvcjogXCJncmV5XCJcbiMgXHRzb3VyY2U6IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiLCBcIjEubXAzXCIsIFwiMS5tcDNcIiwgXCIxLm1wM1wiXVxuIyB9XG5cblxuXG5cbiMgZXhwb3J0cy5hbGJ1bXNEYXRhID0gW2FsYnVtTW9kZWwwLCBhbGJ1bU1vZGVsMSwgYWxidW1Nb2RlbDIsIGFsYnVtTW9kZWwzLCBhbGJ1bU1vZGVsNCwgYWxidW1Nb2RlbDUsIGFsYnVtTW9kZWw2LCBhbGJ1bU1vZGVsNywgYWxidW1Nb2RlbDgsIGFsYnVtTW9kZWw5LCBhbGJ1bU1vZGVsMTAsIGFsYnVtTW9kZWwxMSwgYWxidW1Nb2RlbDEyLCBhbGJ1bU1vZGVsMTMsIGFsYnVtTW9kZWwxNCwgYWxidW1Nb2RlbDE1XVxuXG5cblxuY29uZmlnQWxidW1zID0gY29uZmlnICsgXCIvYWxidW1zL1wiXG5cbnJhbmRvbVNvdXJjZSA9IFtcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIiwgXCIyLm1wM1wiLCBcIjEubXAzXCIsIFwiMi5tcDNcIiwgXCIxLm1wM1wiLCBcIjIubXAzXCIsIFwiMS5tcDNcIl1cblxuXG5leHBvcnRzLmFsYnVtc0RhdGEgPSBbe3RpdGxlOlwi0J/Ri9C70YzQvdCw0Y8g0LHRi9C70YxcIix5ZWFyOjE5OTQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCW0LXRgNGC0LLQsCDRgtCw0LvQvtCz0L4g0LvRjNC00LBcIixcItCl0L7Qu9C+0LTQvdGL0LUg0LfQuNC80YtcIixcItCc0L3QtSDRgdC60LDQt9Cw0LvQuCDRgdC70L7QstC+XCIsXCLQn9C+0LQg0YHRg9GA0LTQuNC90LrRg1wiLFwi0JPRgNC+0LfQsFwiLFwi0JLQvtC50L3QsFwiLFwi0J/Ri9C70YzQvdCw0Y8g0LHRi9C70YwuINCh0LrQsNC30LrQsFwiLFwi0KHQtdGA0LXQsdGA0Y/QvdGL0LUg0YDQtdC60LhcIixcItCi0LLQvtC1INGA0LDQt9Cx0LjRgtC+0LUg0L/QtdC90YHQvdC1XCIsXCLQodC60LDQt9C+0YfQvdGL0Lkg0LvQtdGI0LjQuVwiLFwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LPRgdC60L7QtSDQvdC10LHQvlwiLFwi0JfQstC10YDQuFwiLFwi0KDRi9Cx0LAg0LHQtdC3INGC0YDRg9GB0L7QslwiXSx0aW1lOltcIjA2OjAxXCIsXCIwMTozMVwiLFwiMDM6MDhcIixcIjAzOjI2XCIsXCIwMzo0NFwiLFwiMDI6MzBcIixcIjA1OjIwXCIsXCIwMjo1MlwiLFwiMDE6MjNcIixcIjAxOjQyXCIsXCIwMjoyOVwiLFwiMDI6MzZcIixcIjAzOjA0XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjAuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCa0L7Qu9C70LXQutGG0LjQvtC90LXRgCDQvtGA0YPQttC40Y9cIix5ZWFyOjE5OTUsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCR0YPQtNGMINC80L7QtdC5INGC0LXQvdGM0Y5cIixcItCb0Y7QsdC+0LLRjCDQuNC00LXRgiDQv9C+INC/0YDQvtCy0L7QtNCw0LxcIixcItCn0LXRgNC90YvQuSDRhtCy0LXRgiDRgdC+0LvQvdGG0LBcIixcItCh0LDQvNC+0LLQsNGAXCIsXCLQltC10YDRgtCy0LAg0YLQsNC70L7Qs9C+INC70YzQtNCwXCIsXCLQp9GC0L4g0YLRiyDQsdGD0LTQtdGI0Ywg0LTQtdC70LDRgtGMXCIsXCLQoNGL0LHQsCDQsdC10Lcg0YLRgNGD0YHQvtCyXCIsXCLQn9GL0LvRjNC90LDRjyDQsdGL0LvRjC4g0KHQutCw0LfQutCwXCIsXCLQndC10YfQtdCz0L4g0LTQtdC70LDRgtGMINCy0L3Rg9GC0YDQuFwiLFwi0JjQtNC4INGH0LXRgNC10Lcg0LvQtdGBXCJdLHRpbWU6W1wiMDU6NDFcIixcIjA0OjI0XCIsXCIwNzo0N1wiLFwiMDU6MzFcIixcIjA1OjQ2XCIsXCIwNTowOVwiLFwiMDM6MDlcIixcIjA1OjM1XCIsXCIwMzoyNlwiLFwiMDY6MzJcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMS5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KTQvtC90LDRgNGMINC/0L7QtCDQs9C70LDQt9C+0LxcIix5ZWFyOjE5OTcsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCc0L7Qu9C40YLQstCwXCIsXCLQryDQvdC1INGF0L7Rh9GDINC00L7QvNC+0LlcIixcItCR0L7QvdC90Lgg0Lgg0JrQu9Cw0LnQtFwiLFwi0KLRgNC4INGG0LLQtdGC0LAgKNCf0LXRgNCy0YvQuSDRgdC90LXQsylcIixcItCd0LXQstGB0LrQuNC5INC/0YDQvtGB0L/QtdC60YJcIixcItCh0L/QuCDQsiDQt9Cw0LHRgNC+0YjQtdC90L3QvtC8INC00L7QvNC1XCIsXCLQn9GA0LjRgNC+0LbQtNC10L3QvdGL0Lkg0YPQsdC40LnRhtCwXCIsXCLQp9Cw0YHRgtGD0YjQutC4XCIsXCLQnNC+0Y8g0LvRjtCx0L7QstGMXCIsXCLQkNC90LPQu9C+LdGA0YPRgdGB0LrQuNC5INGB0LvQvtCy0LDRgNGMICjQlNCw0LLQsNC5LCDQm9Cw0LzQsClcIixcItCh0LrQvtGA0L4g0LHRg9C00LXRgiDRgdC+0LvQvdC10YfQvdC+XCIsXCLQl9CwINGB0YLQtdC90L7QuVwiXSx0aW1lOltcIjMyXCIsXCIwMzo0OVwiLFwiMDI6NDBcIixcIjA0OjQwXCIsXCIwNToxMlwiLFwiMDQ6MTdcIixcIjAzOjIxXCIsXCIwNDo0NFwiLFwiMDM6MzZcIixcIjA0OjM2XCIsXCIwNDo0MlwiLFwiMDE6MjdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JPRgNCw0L3QsNGC0L7QstGL0Lkg0LDQu9GM0LHQvtC8XCIseWVhcjoxOTk4LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQktC10YHRjCDRjdGC0L7RgiDQsdGA0LXQtFwiLFwi0JTQvtGB0YLQsNC90Ywg0LPRgNCw0L3QsNGC0YNcIixcItCe0YDQsdC40YIg0LHQtdC3INGB0LDRhdCw0YDQsFwiLFwi0J/RgNC40YXQvtC00LhcIixcItCh0LLQtdGCINCz0L7RgNC10Lsg0LLRgdGOINC90L7Rh9GMXCIsXCLQm9GO0YHRjyDRgdC40LTQuNGCINC00L7QvNCwXCIsXCLQkdC+0LMg0YPRgdGC0LDQuyDQvdCw0YEg0LvRjtCx0LjRgtGMXCIsXCLQmtCw0YLQuNGB0YwsINC60L7Qu9C10YHQviFcIixcItCS0YvRhdC+0LTQsCDQvdC10YJcIixcItCa0L7QutGC0LXQudC70Lgg0YLRgNC10YLRjNC10Lkg0LzQuNGA0L7QstC+0LlcIixcItCU0LbQuNC8XCIsXCLQnNCw0YDQuNGPINC4INCl0YPQsNC90LBcIixcItCf0L7QtNCy0L7QtNC90LDRjyDQu9C+0LTQutCwXCJdLHRpbWU6W1wiMDM6MDZcIixcIjA0OjEwXCIsXCIwMjoxN1wiLFwiMDQ6MDJcIixcIjAyOjMwXCIsXCIwMzo1N1wiLFwiMDI6MzJcIixcIjAyOjQ3XCIsXCIwMzo0N1wiLFwiMDI6NTJcIixcIjAyOjQ3XCIsXCIwODowM1wiLFwiMDM6NDNcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiMy5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0JDQu9GM0YLQsNCy0LjRgdGC0LBcIix5ZWFyOjE5OTksdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCQ0LvRjNGC0LDQstC40YHRgtCwXCIsXCLQnNC+0LvQvtC60L4g0Lgg0LzRkdC0XCIsXCLQn9C40Lst0LrRg9GA0LjQu1wiLFwi0KLQtdGA0L/RgdC40YXQvtGA0LBcIixcItCU0LDQu9C10LrQviDQtNC+0LzQvtC5XCIsXCLQkNCx0YHQtdC90YJcIixcItCU0L7QsdGA0YvRhSDQtNC10Lsg0LzQsNGB0YLQtdGAXCIsXCLQnNC+0YLQvtGG0LjQutC70LXRgtC90LDRjyDRhtC10L/RjFwiLFwi0KHRg9C80LDRgdGI0LXQtNGI0LjQuSDQsNCy0YLQvtCx0YPRgVwiLFwi0JDQu9C60L7Qs9C+0LvRjFwiLFwi0JLRgdGC0YDQtdGC0LjQvNGB0Y8g0LfQsNCy0YLRgNCwXCIsXCLQnNC+0LvQvtC60L4g0Lgg0LzRkdC0XCJdLHRpbWU6W1wiMDY6MDZcIixcIjA0OjM5XCIsXCIwNDo1M1wiLFwiMDI6NDdcIixcIjAzOjU3XCIsXCIwMTo1NFwiLFwiMDQ6NTVcIixcIjA0OjE1XCIsXCIwMzo1MFwiLFwiMDU6MjVcIixcIjA0OjI3XCIsXCIwNTowM1wiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI0LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCIyNS3QuSDQutCw0LTRgFwiLHllYXI6MjAwMSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JvQuNC90LjRjyDQttC40LfQvdC4XCIsXCLQl9Cy0LXQt9C00LAg0YDQvtC6LdC9LdGA0L7Qu9C70LBcIixcItCS0YHQtdCz0L4g0YXQvtGA0L7RiNC10LPQvlwiLFwi0JzQvtGRINGB0LXRgNC00YbQtVwiLFwi0KDQuNC60Lgt0KLQuNC60Lgt0KLQsNCy0LhcIixcIlNPUyFcIixcIkZlbGxpbmlcIixcItCe0YHRgtCw0LXQvNGB0Y8g0LfQuNC80L7QstCw0YLRjFwiLFwi0KLQtdCx0LUg0Y3RgtC+INGB0L3QuNGC0YHRj1wiLFwi0KHQvtCy0YHQtdC8INC00YDRg9Cz0L7QuVwiLFwi0J/Qu9Cw0YHRgtC80LDRgdGB0L7QstCw0Y8g0LbQuNC30L3RjFwiLFwi0J/QvtC5INC80L3QtSDQtdGJ0ZFcIixcItCb0LXQvdC40L3Qs9GA0LDQtCAtIEFtc3RlcmRhbVwiLFwiRmluZVwiXSx0aW1lOltcIjAzOjAwXCIsXCIwNDoxMFwiLFwiMDI6NTlcIixcIjA0OjA5XCIsXCIwMTo1OFwiLFwiMDQ6MjZcIixcIjA0OjQ0XCIsXCIwMzozOFwiLFwiMDQ6NThcIixcIjAyOjA4XCIsXCIwMjoyNVwiLFwiMDM6NTVcIixcIjAyOjM2XCIsXCIyOVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI1LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQndC+0LLRi9C1INC70Y7QtNC4XCIseWVhcjoyMDAzLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQndC+0LLRi9C1INC70Y7QtNC4XCIsXCLQktGA0LXQvNGPLCDQndCw0LfQsNC0IVwiLFwi0JPQsNC90LTQsdC+0LtcIixcItCh0LvQvtC80LDQvdC+INCS0YHQtVwiLFwi0JTQtdCy0Y/RgtC40Y3RgtCw0LbQvdGL0Lkg0LTQvtC8XCIsXCLQkdC70L7QutCw0LTQsFwiLFwi0JLQsNC70LTQsNC5XCIsXCLQmdC+0LMg0KHQv9C+0LrQvtC10L1cIixcItCh0LXQstC10YDQvi3Ql9Cw0L/QsNC0XCIsXCLQoNCt0J8gKNCd0LXRgNCy0L3QvtC1INCh0LXRgNC00YbQtSlcIixcItCQ0LvRjNGC0LDQstC40YHRgtCwICjQlNGA0YPQs9Cw0Y8g0KLQvtGH0LrQsCDQl9GA0LXQvdC40Y8pXCJdLHRpbWU6W1wiMDM6NDRcIixcIjA0OjEyXCIsXCIwMjozNVwiLFwiMDQ6MTZcIixcIjA0OjMwXCIsXCIwMzoyMlwiLFwiMDQ6MjdcIixcIjAyOjU2XCIsXCIwMzo1M1wiLFwiMDM6MTRcIixcIjA0OjA3XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjYuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCg0LXQstC10YDRgdC40LLQvdCw0Y8g0YXRgNC+0L3QuNC60LAg0YHQvtCx0YvRgtC40LlcIix5ZWFyOjIwMDQsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCe0LrQtdCw0L1cIixcItCh0LXQvNGMINCy0L7RgdGM0LzRi9GFXCIsXCLQqNCw0YLQviDQnNCw0YDQs9C+XCIsXCLQnNGLINGB0LjQtNC10LvQuCDQuCDQutGD0YDQuNC70LhcIixcItCh0LjQsNC90YPQutCy0LjQu9GMXCIsXCLQp9C10LvQvtCy0LXQuiDQuCDQlNC10YDQtdCy0L5cIixcItCb0LDQsdC40YDQuNC90YJcIixcItCo0LDQs9C4XCIsXCLQkdC10YDQuNC70LvQuNC5XCIsXCLQn9Cw0YDQvtCy0L7Qt1wiLFwi0JvRjtC00Lgg0L3QsCDQu9Cw0LTQvtC90LhcIixcItCj0YDQvtC6INCz0LXQvtCz0YDQsNGE0LjQuFwiLFwi0JLRgdGRINCy0LrQu9GO0YfQtdC90L5cIixcItCT0L7Qu9C+0YEg0LfQsCDQutCw0LTRgNC+0LxcIixcItCg0L7QvNCw0L3RgVwiXSx0aW1lOltcIjM2XCIsXCIwNDoyMlwiLFwiMDM6NTRcIixcIjAzOjE5XCIsXCIwMjozMlwiLFwiMDI6MTZcIixcIjA0OjQ4XCIsXCIwMToyOVwiLFwiMDM6MzFcIixcIjUzXCIsXCIwMjowMVwiLFwiMDQ6NTlcIixcIjAzOjIwXCIsXCIwMTowOFwiLFwiMDM6MjdcIl0saW1hZ2U6IGNvbmZpZ0FsYnVtcyArIFwiNy5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQsNC30LTQstC+0LXQvdC40LUg0LvQuNGH0L3QvtGB0YLQuFwiLHllYXI6MjAwNyx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0JzQtdC70YzQutC90YPQu9CwINGH0YzRjy3RgtC+INGC0LXQvdGMXCIsXCLQodC60LDQttC4XCIsXCLQnNCw0YLRh1wiLFwi0J3QsCDRgdGH0LDRgdGC0YzQtVwiLFwi0JLQvtC70L3QsFwiLFwi0JvQtdC/0LXRgdGC0L7QulwiLFwi0JjQvNC/0LXRgNCw0YLQvtGAXCIsXCLQkdC10YLRhdC+0LLQtdC9XCIsXCLQnNCw0Y/QulwiLFwi0J/RgNCw0LfQtNC90LjQulwiLFwi0KHRg9GF0LDRgNC4INC4INGB0YPRiNC60LhcIixcItCc0L7QsdC40LvRjNC90YvQuVwiLFwi0JrQvtC70L7QutC+0LtcIixcItCf0YDQvtCx0LrQuFwiLFwi0JzQsNC80LzQsCDQvNC40Y9cIixcItCf0YDQvtGH0YxcIixcItCh0YvQvVwiXSx0aW1lOltcIjAzOjE2XCIsXCIwMzoxMlwiLFwiMDI6NTFcIixcIjAyOjQ0XCIsXCIwMzoyOVwiLFwiMDM6MzhcIixcIjAxOjE1XCIsXCIwMjo0NFwiLFwiMDM6NDlcIixcIjAyOjIxXCIsXCIwNTozMVwiLFwiMDM6MjVcIixcIjAzOjQwXCIsXCIwNDowM1wiLFwiMDM6MDFcIixcIjAzOjIwXCIsXCIwMTo1MVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCI4LmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQodC40LPQvdCw0Lsg0LjQtyDQutC+0YHQvNC+0YHQsFwiLHllYXI6MjAwOSx0aW50Q29sb3I6XCIjMjIyXCIsc29uZ3M6W1wi0J3QsNGB0YLRgNC+0LnQutCwINC30LLRg9C60LBcIixcItCU0YvRiNC4INC70LXQs9C60L5cIixcItCU0L7QsdGA0L4g0L/QvtC20LDQu9C+0LLQsNGC0YxcIixcItCR0L7Qu9GM0YjQtSDQvdC40LrQsNC60L7Qs9C+INGA0L7Qui3QvS3RgNC+0LvQu9CwXCIsXCLQktC90LjQtyDQs9C+0LvQvtCy0L7QuVwiLFwi0KfQtdGA0LTQsNC6XCIsXCLQl9C10LvQtdC90LDRjyDQv9C10YHQvdGPXCIsXCLQmtCw0LzQtdC90YxcIixcIjMwMDdcIixcItCR0LXQtyDRgtC+0YDQvNC+0LfQvtCyXCIsXCLQmtC+0YDQsNCx0LvRjCDQttC00LXRgiFcIixcItCn0LXQu9C+0LLQtdC6INC90LUg0YHQv9Cw0LtcIixcItCa0L7QstGH0LXQs1wiLFwi0JLRi9C/0YPRgdGC0Lgg0LzQtdC90Y8g0L7RgtGB0Y7QtNCwXCIsXCLQn9C40YHRjNC80L5cIixcItCS0YHQtSDRgtCw0Log0YHRgtGA0LDQvdC90L5cIixcItCS0LDQu9GM0YFcIixcItCU0L4g0LLRgdGC0YDQtdGH0LhcIl0sdGltZTpbXCIwMjo0MFwiLFwiMDM6NTNcIixcIjA0OjExXCIsXCIwNDoxMlwiLFwiMDM6MDVcIixcIjA0OjA3XCIsXCIwMzozMFwiLFwiMDQ6NTlcIixcIjAyOjExXCIsXCIwMzoxNFwiLFwiMDI6NDRcIixcIjAyOjUyXCIsXCIwMzozMlwiLFwiMDM6MTFcIixcIjAyOjI5XCIsXCIwMjowM1wiLFwiMDM6MDdcIixcIjA0OjIyXCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjkuanBlZ1wiLCBzb3VyY2U6IHJhbmRvbVNvdXJjZX0sXG5cbnt0aXRsZTpcItCe0LHQvNCw0L0g0LfRgNC10L3QuNGPXCIseWVhcjoyMDEyLHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQo9Cy0LXRgNGC0Y7RgNCwXCIsXCLQm9C10YLQtdC70LAg0LbQuNC30L3RjFwiLFwi0KfRkdGA0L3QsNGPINCS0L7Qu9Cz0LBcIixcItCb0LXRgdGC0L3QuNGG0LBcIixcItCh0YLRgNCw0YjQvdCw0Y8g0YLQsNC50L3QsFwiLFwi0J/QtdGC0LXRgNCx0YPRgNCz0YHQutCw0Y8g0YHQstCw0LTRjNCx0LBcIixcItCU0L7Rh9GMINGB0LDQvNGD0YDQsNGPXCIsXCLQpNC40LHQvtC90LDRh9GH0LhcIixcItCSINC80LjRgNC1INC40LvQu9GO0LfQuNC5XCIsXCLQn9GA0LDQt9C00L3QuNC6ICjQlNGA0YPQs9Cw0Y8g0YLQvtGH0LrQsCDQt9GA0LXQvdC40Y8pXCIsXCLQmtC+0LLRiFwiLFwi0KHQvtC70L3RhtC1INCy0LfQvtC50LTRkdGCXCIsXCLQp9GD0LTQsNC6XCIsXCLQktC+0LvRiNC10LHQvdC+0LUg0YHQu9C+0LLQvlwiXSx0aW1lOltcIjAxOjQ0XCIsXCIwMjozMFwiLFwiMDI6NDZcIixcIjAyOjE4XCIsXCIwMjoyNFwiLFwiMDQ6MjBcIixcIjAzOjM2XCIsXCIwMzoyN1wiLFwiMDI6NThcIixcIjAyOjM5XCIsXCIwMzowMVwiLFwiMDM6MzVcIixcIjAyOjI5XCIsXCIwNDoyNFwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMC5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfSxcblxue3RpdGxlOlwi0KDQtdC30L7QvdCw0L3RgS4g0KfQsNGB0YLRjCAxXCIseWVhcjoyMDE0LHRpbnRDb2xvcjpcIiMyMjJcIixzb25nczpbXCLQktGB0LDQtNC90LjQulwiLFwi0JDQuSDQu9C+0LIg0Y4hXCIsXCLQodGC0LDRgNGL0Lkg0LTQvtC8XCIsXCLQnNC+0YDQvtC3INC/0L4g0LrQvtC20LVcIixcItCc0YvRgdC70YxcIixcItCV0YHRgtGMINC60YLQvi3QvdC40LHRg9C00Ywg0LbQuNCy0L7QuT9cIixcItCg0LDQuSDQsiDRiNCw0LvQsNGI0LVcIixcItCS0YHRkSDQvdCw0L7QsdC+0YDQvtGCXCIsXCLQn9C+0LzQvtC70YfQuNC8INC90LXQvNC90L7Qs9C+XCIsXCLQn9GD0YHRgtGMINC40LPRgNCw0LXRgiDQvNGD0LfRi9C60LAhXCIsXCLQk9C+0YDQuNC30L7QvdGCINGB0L7QsdGL0YLQuNC5XCIsXCLQodGA0LXQtNC4INC30LjQvNGLXCIsXCLQlNCy0LXRgNC90L7QuSDQs9C70LDQt9C+0LpcIixcItCf0L7QtNCy0L7QtNC90LDRjyDQv9C10YHQvdGPXCJdLHRpbWU6W1wiMDI6NTBcIixcIjAzOjIwXCIsXCIwMjozOVwiLFwiMDM6MDVcIixcIjAzOjUyXCIsXCIwMzoxMFwiLFwiMDM6MTNcIixcIjAxOjIyXCIsXCIwMzo0MlwiLFwiMDM6MTNcIixcIjAyOjM1XCIsXCIwMjo0MlwiLFwiMDU6MjNcIixcIjAzOjI4XCJdLGltYWdlOiBjb25maWdBbGJ1bXMgKyBcIjExLmpwZWdcIiwgc291cmNlOiByYW5kb21Tb3VyY2V9LFxuXG57dGl0bGU6XCLQoNC10LfQvtC90LDQvdGBLiDQp9Cw0YHRgtGMIDJcIix5ZWFyOjIwMTUsdGludENvbG9yOlwiIzIyMlwiLHNvbmdzOltcItCa0YDQsNGB0L7RgtCwXCIsXCLQntGA0LrQtdGB0YLRgFwiLFwi0J/QtdGB0L3RjyDQvdCwINC+0LTQvdC+0Lwg0LDQutC60L7RgNC00LVcIixcItCU0LLQsCDQv9C70Y7RgSDQvtC00LjQvVwiLFwi0J/QvtC70L3QsNGPINC70YPQvdCwXCIsXCLQotCw0L3RhtGD0LkhXCIsXCLQodC40LzRhNC+0L3QuNGPXCIsXCLQndC10YTRgtGMXCIsXCLQn9C+0LbQsNGAXCIsXCLQqNCw0YXQvNCw0YLRi1wiLFwi0JjRgdGH0LXQt9Cw0LXQvCDQsiDRgtC10LzQvdC+0YLQtVwiXSx0aW1lOltcIjAyOjU4XCIsXCIwNDoxMVwiLFwiMDQ6MTBcIixcIjAyOjM3XCIsXCIwMzozOFwiLFwiMDQ6MTBcIixcIjAyOjU0XCIsXCIwMjoxNFwiLFwiMDI6NTNcIixcIjA1OjUzXCIsXCIwNDowNVwiXSxpbWFnZTogY29uZmlnQWxidW1zICsgXCIxMi5qcGVnXCIsIHNvdXJjZTogcmFuZG9tU291cmNlfVxuXG5dXG5cblxuXG5cbiMgZXhwb3J0cy5mYXZMaXN0ID0ge1xuIyBcdHNvbmdzOiBbXCJhZFwiXVxuIyBcdHRpbWU6IFtcIjE6MVwiXVxuIyBcdGFsYnVtczogWzNdXG4jIH1cbmV4cG9ydHMuZmF2TGlzdCA9IHtcblx0c29uZ3M6IFtcItCS0YvRhdC+0LTQsCDQvdC10YJcIiwgXCLQnNC+0LUg0YHQtdGA0LTRhtC1XCIsIFwi0KLQsNC90YbRg9C5XCIsIFwi0KDQvtC80LDQvdGBXCIsICBcItCb0LjQvdC40Y8g0JbQuNC30L3QuFwiLCBcItCe0YDQutC10YHRgtGAXCIsIFwi0J7RgNCx0LjRgiDQsdC10Lcg0YHQsNGF0LDRgNCwXCIsIFwi0JTQvtGH0Ywg0YHQsNC80YPRgNCw0Y9cIiwgXCLQoNCw0Lkg0LIg0YjQsNC70LDRiNC1XCIsIFwi0J/QvtC5INC80L3QtSDQtdGJ0LVcIl1cblx0c291cmNlOiByYW5kb21Tb3VyY2VcblxuXHR0aW1lOiBbXCIzOjQ3XCIsIFwiNDowOVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIyOjQ1XCJdXG5cdGFsYnVtczogWzMsIDUsIDEyLCA3LCA1LCAxMiwgMywgMTAsIDExLCA1XVxufSIsImNsYXNzIGV4cG9ydHMuQWxidW0gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLmFsYnVtSUQgPz0gLTFcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdFxuXHRAZGVmaW5lICdhbGJ1bUlEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5hbGJ1bUlEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5hbGJ1bUlEID0gdmFsdWVcblxuXG5cdFx0XHQiLCIjIFByZXZpZXcgQ29tcG9uZW50XG5Bc3NldHMgPSByZXF1aXJlIFwiUHJldmlld0NvbXBvbmVudEFzc2V0c1wiXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5sb2NhbENvbG9ycyA9XG5cdGJnX2NvbG9yX29uTGlnaHQ6IFwiI2VlZVwiXG5cdGJnX2NvbG9yX29uRGFyazogXCIjMjIyXCJcblx0Y29udGVudF9jb2xvcl9vbkxpZ2h0OiBcIiMwMDBcIlxuXHRjb250ZW50X2NvbG9yX29uRGFyazogXCIjRkZGXCJcblxudGhlbWUgPVxuXHRiZ19jb2xvcjogbG9jYWxDb2xvcnMuYmdfY29sb3Jfb25EYXJrXG5cdGNvbnRlbnRfY29sb3I6IGxvY2FsQ29sb3JzLmNvbnRlbnRfY29sb3Jfb25EYXJrXG5cblxuIyBMb2dvXG5cbmNsYXNzIExvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKGxvY2FsQ29sb3JzLmNvbnRlbnRfY29sb3Jfb25EYXJrKVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cblxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cbiMgUHJldmlld1xuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlldzogbnVsbFxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBcIjIwOjE2XCJcblx0XHRcdG5hbWU6IFwiUHJldmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2Vcblx0XHRcdFxuXHRcdFx0dmlzaWJsZTogdHJ1ZVxuXHRcdFx0dG9wVGhlbWU6IFwiZGFya1wiXG5cdFx0XHRib3R0b21UaGVtZTogXCJkYXJrXCJcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3Zpc2libGUnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd0b3BUaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50b3BUaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50b3BUaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdib3R0b21UaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhciA9IHZhbHVlXG5cdFxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcIm5vcm1hbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJmaWxsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdHN0YXRlU3dpdGNoVG9Ob3JtYWw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFxuXHRcblx0XG5cdFxuXHRnZXRMb2NhdGlvbkRhdGE6ICgpID0+XG5cdFx0cXVlcnlBcnJheSA9IGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblxuXHRcdGZvciBpdGVtIGluIHF1ZXJ5QXJyYXlcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcInNjYWxlXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwiZmlsbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHRcdFx0ZWxzZSBpZiB2YWx1ZVBhcnQgPT0gXCJub3JtYWxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvTm9ybWFsKClcblx0XHRcdFxuXHRcblx0XG5cdHVwZGF0ZVNjYWxlU3RhdGU6ICgpID0+XG5cdFx0c2NhbGVYID0gKENhbnZhcy53aWR0aCAtIDExMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoQ2FudmFzLmhlaWdodCAtIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlcy5maWxsLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFxuXHRzZXREZXNrdG9wU2NhbGVNb2RlOiAoZm9yU3RhdGUgPSBcIm5vcm1hbFwiKSA9PlxuXHRcdEB1cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRpbml0U3RhdGUgPSBmb3JTdGF0ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcInNjYWxlXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwiZmlsbFwiIHRoZW4gaW5pdFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdFx0ZWxzZSBpbml0U3RhdGUgPSBcIm5vcm1hbFwiXG5cdFx0XG5cdFx0c2hvdWxkU2hvd0J1dHRvbiA9IHRydWVcblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJidXR0b25cIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJvZmZcIiB0aGVuIHNob3VsZFNob3dCdXR0b24gPSBmYWxzZVxuXHRcdFxuXHRcdHNob3VsZFNob3dMb2dvID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImxvZ29cIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJvZmZcIiB0aGVuIHNob3VsZFNob3dMb2dvID0gZmFsc2Vcblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRAc3RhdGVTd2l0Y2goaW5pdFN0YXRlKVxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoZm9yU3RhdGUpID0+XG5cdFx0aWYgVXRpbHMuaXNGcmFtZXJTdHVkaW8oKSB0aGVuIHJldHVyblxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5ydVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUgPSBuZXcgTGF5ZXJcblx0XHRcdHNpemU6IDQ4LCBib3JkZXJSYWRpdXM6IDQ4XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzIpLCB5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMSlcIlxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0cHJldmlldzogQFxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJ1dHRvblNjYWxlXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0c2l6ZTogMjgsIGJvcmRlclJhZGl1czogMjJcblx0XHRcdHg6IDEwLCB5OiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25TY2FsZS5vblRhcCAtPlxuXHRcdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBuZXh0U3RhdGUgPSBcIm5vcm1hbFwiIGVsc2UgbmV4dFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY2hpbGRyZW5bMF0uc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGN1c3RvbS5wcmV2aWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUgPSAoYnV0dG9uTGF5ZXIpID0+XG5cdFx0XHRsb2NhbEJ1dHRvbiA9IGJ1dHRvbkxheWVyXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueCA9IEFsaWduLnJpZ2h0KC0zMilcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnkgPSBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplKGJ1dHRvblNjYWxlKVxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2Vcblx0XHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRcdEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblx0XG5cdFxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblx0XG5cdFxuXG5cdFxuXHRcblx0dXBkYXRlUHJldmlld09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsUHJldmlldyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XG5cdFxuXHRcblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IHRoZW1lLmJnX2NvbG9yXG5cdFx0QGNyZWF0ZUJhcnMoKVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cdFx0cHJldmlld0NhbnZhcyA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29udGVudF9jb2xvciwgbmFtZTogXCIuaGlkZGVuUHJldmlld0NhbnZhc1wiXG5cdFx0XG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBvcmlnaW5ZID0gMC41XG5cdFx0QG9yaWdpblggPSAwLjVcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpXG5cdFx0XHRcblx0XHRcdGlmIEBzY3JlZW5TaXplKDM3NSwgNzY4KSBvciBAc2NyZWVuU2l6ZSgzOTAsIDc5Nykgb3IgQHNjcmVlblNpemUoNDE0LCA4NTIpIG9yIEBzY3JlZW5TaXplKDQyOCwgODc5KVxuXHRcdFx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRcdGVsc2UgQHNldEN1c3RvbVByZXZpZXcoKVxuXHRcdFxuIyBcdFx0ZWxzZSBpZiBAdmlldy53aWR0aCA9PSAzNjBcblx0XHRcdFxuXHRcdGVsc2UgQHNldEN1c3RvbVByZXZpZXcoKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHNldEN1c3RvbVByZXZpZXc6ICgpID0+XG5cdFx0QHkgPSBBbGlnbi50b3AoLTIwKVxuXHRcdEBvcmlnaW5ZID0gMFxuXHRcdFxuXHRcdHNIID0gKFNjcmVlbi5oZWlnaHQgKyA0MCkgLyBAaGVpZ2h0XG5cdFx0QHNjYWxlID0gTWF0aC5taW4oU2NyZWVuLndpZHRoIC8gQHdpZHRoLCBzSClcblx0XG5cdFxuXHRsb2dTaXplOiAoKSA9PlxuXHRcdG5ldyBUZXh0TGF5ZXIgeyB0ZXh0OiBcIiN7U2NyZWVuLndpZHRofXgje1NjcmVlbi5oZWlnaHR9XCIsIHk6IEFsaWduLmNlbnRlciB9XG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdHRvcEJhciA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIodG9wQmFyKSBcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcilcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6ICh0ZW1wKSA9PlxuXHRcdHRlbXAuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIgbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IHRlbXAsIHdpZHRoOiB0ZW1wLndpZHRoIC0gMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24udG9wKDYpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyKDEpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAdG9wVGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24uY2VudGVyKC0xKVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRvcFRoZW1lXVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAdG9wVGhlbWVdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFx0XG5cdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRob21lSW5kaWNhdG9yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bib3R0b21UaGVtZV0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cdFxuXG4iLCJcbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQXlCQUE7QURDQSxPQUFPLENBQUMsSUFBUixHQUNDO0VBQUEsS0FBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLE1BQU47SUFDQSxLQUFBLEVBQU8sTUFEUDtHQUREO0VBR0EsbUJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSx5REFBTjtJQUNBLEtBQUEsRUFBTywwREFEUDtHQUpEO0VBTUEscUJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSwyREFBTjtJQUNBLEtBQUEsRUFBTyw0REFEUDtHQVBEO0VBU0Esc0JBQUEsRUFDQztJQUFBLElBQUEsRUFBTSw0REFBTjtJQUNBLEtBQUEsRUFBTyw2REFEUDtHQVZEO0VBWUEsMEJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxnRUFBTjtJQUNBLEtBQUEsRUFBTyxpRUFEUDtHQWJEO0VBZ0JBLEtBQUEsRUFBTyxvREFoQlA7Ozs7O0FEREQsSUFBQSw4Q0FBQTtFQUFBOzs7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSx3QkFBUjs7QUFDVCxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFwQixDQUFBOztBQUVBLFdBQUEsR0FDQztFQUFBLGdCQUFBLEVBQWtCLE1BQWxCO0VBQ0EsZUFBQSxFQUFpQixNQURqQjtFQUVBLHFCQUFBLEVBQXVCLE1BRnZCO0VBR0Esb0JBQUEsRUFBc0IsTUFIdEI7OztBQUtELEtBQUEsR0FDQztFQUFBLFFBQUEsRUFBVSxXQUFXLENBQUMsZUFBdEI7RUFDQSxhQUFBLEVBQWUsV0FBVyxDQUFDLG9CQUQzQjs7O0FBTUs7OztFQUNRLG1CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE9BQUEsRUFBUyxHQUFUO01BQ0EsT0FB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
