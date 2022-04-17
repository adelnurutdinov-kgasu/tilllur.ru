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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL3lvdXR1YmUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMDUgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBTY3JvbGwgQWxidW1zIDQuZnJhbWVyL21vZHVsZXMveWVhci5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0wNSBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIFNjcm9sbCBBbGJ1bXMgNC5mcmFtZXIvbW9kdWxlcy92aWRlby5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0wNSBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIFNjcm9sbCBBbGJ1bXMgNC5mcmFtZXIvbW9kdWxlcy90aW1lZnJvbXNlYy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0wNSBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIFNjcm9sbCBBbGJ1bXMgNC5mcmFtZXIvbW9kdWxlcy90ZXh0LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL3NvbmcuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMDUgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBTY3JvbGwgQWxidW1zIDQuZnJhbWVyL21vZHVsZXMvcGxheV9zb25nLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL25ld3MuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMDUgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBTY3JvbGwgQWxidW1zIDQuZnJhbWVyL21vZHVsZXMvbmF2LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL2ZlZWQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMDUgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBTY3JvbGwgQWxidW1zIDQuZnJhbWVyL21vZHVsZXMvZGV0YWlsZWRfbmV3cy5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0wNSBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIFNjcm9sbCBBbGJ1bXMgNC5mcmFtZXIvbW9kdWxlcy9kZXRhaWxlZF9hbGJ1bS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAxNi0wOS0wNSBbYW5kcm9pZF0geWFtYmx6IHRlYW0g4oCTIFNjcm9sbCBBbGJ1bXMgNC5mcmFtZXIvbW9kdWxlcy9kYXRhLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL2NyZWF0ZV9zb25nLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL2FsYnVtLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE2LTA5LTA1IFthbmRyb2lkXSB5YW1ibHogdGVhbSDigJMgU2Nyb2xsIEFsYnVtcyA0LmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMTYtMDktMDUgW2FuZHJvaWRdIHlhbWJseiB0ZWFtIOKAkyBTY3JvbGwgQWxidW1zIDQuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgR2V0dGluZyBEYXRhXG5cbmNvbmZpZyA9IFwiaW1hZ2VzXCJcblxudmlkZW9Nb2RlbDAgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMC5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzAubXA0XCJcbn1cblxudmlkZW9Nb2RlbDEgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMS5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzEubXA0XCJcbn1cblxudmlkZW9Nb2RlbDIgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMi5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzIubXA0XCJcbn1cblxudmlkZW9Nb2RlbDMgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvMy5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzMubXA0XCJcbn1cblxudmlkZW9Nb2RlbDQgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvNC5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzQubXA0XCJcbn1cblxudmlkZW9Nb2RlbDUgPSB7IFxuXHRpbWFnZTogY29uZmlnICsgXCIvdmlkZW8vcHJldmlld3MvNS5qcGdcIlxuXHR2aWRlbzogY29uZmlnICsgXCIvdmlkZW8vbW92aWVzLzUubXA0XCJcbn1cblxuXG5leHBvcnRzLm1vdmllc0RhdGEgPSBbdmlkZW9Nb2RlbDAsIHZpZGVvTW9kZWwxLCB2aWRlb01vZGVsMiwgdmlkZW9Nb2RlbDMsIHZpZGVvTW9kZWw0LCB2aWRlb01vZGVsNV0iLCJ7VGV4dExheWVyfSA9IHJlcXVpcmUgXCJ0ZXh0XCJcblxuY2xhc3MgZXhwb3J0cy5ZZWFyIGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMueWVhcklEID89IC0xXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0QGRlZmluZSAneWVhcklEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy55ZWFySURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnllYXJJRCA9IHZhbHVlXG5cblxuXHRcdFx0IiwiY2xhc3MgZXhwb3J0cy5WaWRlbyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMudmlkZW9JRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ3ZpZGVvSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZGVvSUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsImV4cG9ydHMudGltZUZyb21TZWNvbmRzID0gKHNlY29uZHMpIC0+XG5cdGlmIHNlY29uZHMgPiAwXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHNlY29uZHMgKiAxMDAwKS50b0lTT1N0cmluZygpLnN1YnN0cigxNSwgNClcblx0ZWxzZVxuXHRcdHJldHVybiBcIjA6MDBcIiIsImNsYXNzIFRleHRMYXllciBleHRlbmRzIExheWVyXG5cdFx0XG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblx0XHRAZG9BdXRvU2l6ZSA9IGZhbHNlXG5cdFx0QGRvQXV0b1NpemVIZWlnaHQgPSBmYWxzZVxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcImhzbGEoNjAsIDkwJSwgNDclLCAuNClcIiBlbHNlIFwidHJhbnNwYXJlbnRcIlxuXHRcdG9wdGlvbnMuY29sb3IgPz0gXCJyZWRcIlxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAxLjI1XG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiSGVsdmV0aWNhXCJcblx0XHRvcHRpb25zLmZvbnRTaXplID89IDIwXG5cdFx0b3B0aW9ucy50ZXh0ID89IFwiVXNlIGxheWVyLnRleHQgdG8gYWRkIHRleHRcIlxuXHRcdHN1cGVyIG9wdGlvbnNcblx0XHRAc3R5bGUud2hpdGVTcGFjZSA9IFwicHJlLWxpbmVcIiAjIGFsbG93IFxcbiBpbiAudGV4dFxuXHRcdEBzdHlsZS5vdXRsaW5lID0gXCJub25lXCIgIyBubyBib3JkZXIgd2hlbiBzZWxlY3RlZFxuXHRcdFxuXHRzZXRTdHlsZTogKHByb3BlcnR5LCB2YWx1ZSwgcHhTdWZmaXggPSBmYWxzZSkgLT5cblx0XHRAc3R5bGVbcHJvcGVydHldID0gaWYgcHhTdWZmaXggdGhlbiB2YWx1ZStcInB4XCIgZWxzZSB2YWx1ZVxuXHRcdEBlbWl0KFwiY2hhbmdlOiN7cHJvcGVydHl9XCIsIHZhbHVlKVxuXHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0XHRcblx0Y2FsY1NpemU6IC0+XG5cdFx0c2l6ZUFmZmVjdGluZ1N0eWxlcyA9XG5cdFx0XHRsaW5lSGVpZ2h0OiBAc3R5bGVbXCJsaW5lLWhlaWdodFwiXVxuXHRcdFx0Zm9udFNpemU6IEBzdHlsZVtcImZvbnQtc2l6ZVwiXVxuXHRcdFx0Zm9udFdlaWdodDogQHN0eWxlW1wiZm9udC13ZWlnaHRcIl1cblx0XHRcdHBhZGRpbmdUb3A6IEBzdHlsZVtcInBhZGRpbmctdG9wXCJdXG5cdFx0XHRwYWRkaW5nUmlnaHQ6IEBzdHlsZVtcInBhZGRpbmctcmlnaHRcIl1cblx0XHRcdHBhZGRpbmdCb3R0b206IEBzdHlsZVtcInBhZGRpbmctYm90dG9tXCJdXG5cdFx0XHRwYWRkaW5nTGVmdDogQHN0eWxlW1wicGFkZGluZy1sZWZ0XCJdXG5cdFx0XHR0ZXh0VHJhbnNmb3JtOiBAc3R5bGVbXCJ0ZXh0LXRyYW5zZm9ybVwiXVxuXHRcdFx0Ym9yZGVyV2lkdGg6IEBzdHlsZVtcImJvcmRlci13aWR0aFwiXVxuXHRcdFx0bGV0dGVyU3BhY2luZzogQHN0eWxlW1wibGV0dGVyLXNwYWNpbmdcIl1cblx0XHRcdGZvbnRGYW1pbHk6IEBzdHlsZVtcImZvbnQtZmFtaWx5XCJdXG5cdFx0XHRmb250U3R5bGU6IEBzdHlsZVtcImZvbnQtc3R5bGVcIl1cblx0XHRcdGZvbnRWYXJpYW50OiBAc3R5bGVbXCJmb250LXZhcmlhbnRcIl1cblx0XHRjb25zdHJhaW50cyA9IHt9XG5cdFx0aWYgQGRvQXV0b1NpemVIZWlnaHQgdGhlbiBjb25zdHJhaW50cy53aWR0aCA9IEB3aWR0aFxuXHRcdHNpemUgPSBVdGlscy50ZXh0U2l6ZSBAdGV4dCwgc2l6ZUFmZmVjdGluZ1N0eWxlcywgY29uc3RyYWludHNcblx0XHRpZiBAc3R5bGUudGV4dEFsaWduIGlzIFwicmlnaHRcIlxuXHRcdFx0QHdpZHRoID0gc2l6ZS53aWR0aFxuXHRcdFx0QHggPSBAeC1Ad2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0QGhlaWdodCA9IHNpemUuaGVpZ2h0XG5cblx0QGRlZmluZSBcImF1dG9TaXplXCIsXG5cdFx0Z2V0OiAtPiBAZG9BdXRvU2l6ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBkb0F1dG9TaXplID0gdmFsdWVcblx0XHRcdGlmIEBkb0F1dG9TaXplIHRoZW4gQGNhbGNTaXplKClcblx0QGRlZmluZSBcImF1dG9TaXplSGVpZ2h0XCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0QGRvQXV0b1NpemVIZWlnaHQgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiY29udGVudEVkaXRhYmxlXCIsXG5cdFx0c2V0OiAoYm9vbGVhbikgLT5cblx0XHRcdEBfZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSBib29sZWFuXG5cdFx0XHRAaWdub3JlRXZlbnRzID0gIWJvb2xlYW5cblx0XHRcdEBvbiBcImlucHV0XCIsIC0+IEBjYWxjU2l6ZSgpIGlmIEBkb0F1dG9TaXplXG5cdEBkZWZpbmUgXCJ0ZXh0XCIsXG5cdFx0Z2V0OiAtPiBAX2VsZW1lbnQudGV4dENvbnRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlXG5cdFx0XHRAZW1pdChcImNoYW5nZTp0ZXh0XCIsIHZhbHVlKVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiZm9udEZhbWlseVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250RmFtaWx5XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250U2l6ZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U2l6ZS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U2l6ZVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxpbmVIZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUubGluZUhlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGluZUhlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRXZWlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFdlaWdodCBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFdlaWdodFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTdHlsZVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250U3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFN0eWxlXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFZhcmlhbnRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUuZm9udFZhcmlhbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udFZhcmlhbnRcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nXCIsXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1RvcFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdCb3R0b21cIiwgdmFsdWUsIHRydWUpXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdUb3BcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1RvcC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1JpZ2h0XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdSaWdodC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nUmlnaHRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nQm90dG9tXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnBhZGRpbmdCb3R0b20ucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdMZWZ0XCIsXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0xlZnQucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwicGFkZGluZ0xlZnRcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJ0ZXh0QWxpZ25cIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwidGV4dEFsaWduXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwidGV4dFRyYW5zZm9ybVwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS50ZXh0VHJhbnNmb3JtIFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0VHJhbnNmb3JtXCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwibGV0dGVyU3BhY2luZ1wiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5sZXR0ZXJTcGFjaW5nLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImxldHRlclNwYWNpbmdcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJsZW5ndGhcIiwgXG5cdFx0Z2V0OiAtPiBAdGV4dC5sZW5ndGhcblxuY29udmVydFRvVGV4dExheWVyID0gKGxheWVyKSAtPlxuXHR0ID0gbmV3IFRleHRMYXllclxuXHRcdG5hbWU6IGxheWVyLm5hbWVcblx0XHRmcmFtZTogbGF5ZXIuZnJhbWVcblx0XHRwYXJlbnQ6IGxheWVyLnBhcmVudFxuXHRcblx0Y3NzT2JqID0ge31cblx0Y3NzID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuY3NzXG5cdGNzcy5mb3JFYWNoIChydWxlKSAtPlxuXHRcdHJldHVybiBpZiBfLmluY2x1ZGVzIHJ1bGUsICcvKidcblx0XHRhcnIgPSBydWxlLnNwbGl0KCc6ICcpXG5cdFx0Y3NzT2JqW2FyclswXV0gPSBhcnJbMV0ucmVwbGFjZSgnOycsJycpXG5cdHQuc3R5bGUgPSBjc3NPYmpcblx0XG5cdGltcG9ydFBhdGggPSBsYXllci5fX2ZyYW1lckltcG9ydGVkRnJvbVBhdGhcblx0aWYgXy5pbmNsdWRlcyBpbXBvcnRQYXRoLCAnQDJ4J1xuXHRcdHQuZm9udFNpemUgKj0gMlxuXHRcdHQubGluZUhlaWdodCA9IChwYXJzZUludCh0LmxpbmVIZWlnaHQpKjIpKydweCdcblx0XHR0LmxldHRlclNwYWNpbmcgKj0gMlxuXHRcdFx0XHRcdFxuXHR0LnkgLT0gKHBhcnNlSW50KHQubGluZUhlaWdodCktdC5mb250U2l6ZSkvMiAjIGNvbXBlbnNhdGUgZm9yIGhvdyBDU1MgaGFuZGxlcyBsaW5lIGhlaWdodFxuXHR0LnkgLT0gdC5mb250U2l6ZSAqIDAuMSAjIHNrZXRjaCBwYWRkaW5nXG5cdHQueCAtPSB0LmZvbnRTaXplICogMC4wOCAjIHNrZXRjaCBwYWRkaW5nXG5cdHQud2lkdGggKz0gdC5mb250U2l6ZSAqIDAuNSAjIHNrZXRjaCBwYWRkaW5nXG5cblx0dC50ZXh0ID0gbGF5ZXIuX2luZm8ubWV0YWRhdGEuc3RyaW5nXG5cdGxheWVyLmRlc3Ryb3koKVxuXHRyZXR1cm4gdFxuXG5MYXllcjo6Y29udmVydFRvVGV4dExheWVyID0gLT4gY29udmVydFRvVGV4dExheWVyKEApXG5cbmNvbnZlcnRUZXh0TGF5ZXJzID0gKG9iaikgLT5cblx0Zm9yIHByb3AsbGF5ZXIgb2Ygb2JqXG5cdFx0aWYgbGF5ZXIuX2luZm8ua2luZCBpcyBcInRleHRcIlxuXHRcdFx0b2JqW3Byb3BdID0gY29udmVydFRvVGV4dExheWVyKGxheWVyKVxuXG4jIEJhY2t3YXJkcyBjb21wYWJpbGl0eS4gUmVwbGFjZWQgYnkgY29udmVydFRvVGV4dExheWVyKClcbkxheWVyOjpmcmFtZUFzVGV4dExheWVyID0gKHByb3BlcnRpZXMpIC0+XG4gICAgdCA9IG5ldyBUZXh0TGF5ZXJcbiAgICB0LmZyYW1lID0gQGZyYW1lXG4gICAgdC5zdXBlckxheWVyID0gQHN1cGVyTGF5ZXJcbiAgICBfLmV4dGVuZCB0LHByb3BlcnRpZXNcbiAgICBAZGVzdHJveSgpXG4gICAgdFxuXG5leHBvcnRzLlRleHRMYXllciA9IFRleHRMYXllclxuZXhwb3J0cy5jb252ZXJ0VGV4dExheWVycyA9IGNvbnZlcnRUZXh0TGF5ZXJzXG4iLCJjbGFzcyBleHBvcnRzLlNvbmcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLmFsYnVtSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5zb25nSUQgPz0gLTFcblx0XHRAb3B0aW9ucy5hbGJ1bVRpdGxlID89IFwiTWF5IDE0XCJcblx0XHRAb3B0aW9ucy5zb25nVGl0bGUgPz0gXCLQodC+0LXQstGL0LUg0LPRg9Cx0YtcIlxuXHRcdFxuXHRcdCBcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEAud2lkdGggPSAzMjAqMlxuXHRcdEAuaGVpZ2h0ID0gNjYqMlxuXHRcdEAuYmFja2dyb3VuZENvbG9yID0gXCJudWxsXCJcblx0XHRcblx0QGRlZmluZSAnYWxidW1JRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1JRCA9IHZhbHVlXG5cdFx0XHRcblx0QGRlZmluZSAnc29uZ0lEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5zb25nSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNvbmdJRCA9IHZhbHVlXG5cdFx0XHRcblx0QGRlZmluZSAnYWxidW1UaXRsZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1UaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYWxidW1UaXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzb25nVGl0bGUnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLnNvbmdUaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc29uZ1RpdGxlID0gdmFsdWVcblx0XHRcdCIsIkRhdGEgPSByZXF1aXJlICdkYXRhJ1xuVGltZSA9IHJlcXVpcmUgJ3RpbWVmcm9tc2VjJ1xuXG5zb25nUGF0aCA9IFwiaW1hZ2VzL3NvbmdzL1wiXG5cblxuXG5leHBvcnRzLnBsYXlQbGF5bGlzdCA9IChzb25nSUQsIGFsYnVtTW9kZWwpIC0+XG5cdHNvbmdzTmFtZXMgPSBhbGJ1bU1vZGVsLnNvbmdzXG5cdHNvbmdzU291cmNlID0gYWxidW1Nb2RlbC5zb3VyY2Vcblx0IyBzb25nc0FsYnVtcyA9IGFsYnVtTW9kZWwuYWxidW1zXG5cdFxuXHRzb25nc05hbWVDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc05hbWVzKVxuXHRzb25nc1NvdXJjZUN5Y2xlciA9IFV0aWxzLmN5Y2xlKHNvbmdzU291cmNlKVxuXHQjIHNvbmdBbGJ1bUlEQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NBbGJ1bXMpXG5cdFxuXHRwbGF5aW5nU29uZ05hbWUgPSBcIlwiXG5cdHBsYXlpbmdTb25nU291cmNlID0gXCJcIlxuXHRwbGF5aW5nU29uZ0FsYnVtSUQgPSAwXG5cdGZvciBpIGluIFswLi5zb25nSURdXG5cdFx0cGxheWluZ1NvbmdOYW1lID0gc29uZ3NOYW1lQ3ljbGVyKClcblx0XHRwbGF5aW5nU29uZ1NvdXJjZVx0PSBzb25nUGF0aCtzb25nc1NvdXJjZUN5Y2xlcigpXG5cdFx0IyBwbGF5aW5nU29uZ0FsYnVtSUQgPSBVdGlscy5jeWNsZShzb25nc0FsYnVtcylcblx0XHQjIHByaW50IHBsYXlpbmdTb25nQWxidW1JRFxuXHRcblx0aWYgcGF1c2Uuc3RhdGVzLmN1cnJlbnQgaXMgXCJoaWRkZW5cIlxuXHRcdHBsYXkuc3RhdGVzLm5leHQoKVxuXHRcdHBhdXNlLnN0YXRlcy5uZXh0KClcblx0XG5cdG11c2ljLnZpZGVvID0gcGxheWluZ1NvbmdTb3VyY2Vcblx0XG5cdHBsYXllclNvbmdUaXRsZS50ZXh0ID0gcGxheWluZ1NvbmdOYW1lXG5cdCMgcHJpbnQgcGxheWluZ1NvbmdBbGJ1bUlEXG5cdCMgcHJpbnQgRGF0YS5hbGJ1bXNEYXRhW3BsYXlpbmdTb25nQWxidW1JRF1cblx0cGxheWVyU29uZ0FsYnVtLnRleHQgPSBhbGJ1bU1vZGVsLnRpdGxlICsgXCIg4oCTIFwiICsgYWxidW1Nb2RlbC55ZWFyXG5cdFxuXHRVdGlscy5kZWxheSAuMywgLT4gXG5cdFx0ZHVyYXRpb25SaWdodC5odG1sID0gXCItXCIgKyBUaW1lLnRpbWVGcm9tU2Vjb25kcyBtdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XHRzY3J1YmJlci5tYXggPSB+fm11c2ljLnBsYXllci5kdXJhdGlvblxuXHRcblx0bXVzaWMucGxheWVyLnBsYXkoKVxuXG5cbmV4cG9ydHMucGxheUZhdlBsYXlsaXN0ID0gKHNvbmdJRCwgYWxidW1Nb2RlbCwgbXVzaWMsIHBsYXksIHBhdXNlLCBwbGF5ZXJTb25nVGl0bGUsIHBsYXllclNvbmdBbGJ1bSwgZHVyYXRpb25SaWdodCwgc2NydWJiZXIpIC0+XG5cdHNvbmdzTmFtZXMgPSBhbGJ1bU1vZGVsLnNvbmdzXG5cdHNvbmdzU291cmNlID0gYWxidW1Nb2RlbC5zb3VyY2Vcblx0c29uZ3NBbGJ1bXMgPSBhbGJ1bU1vZGVsLmFsYnVtc1xuXHRcblx0c29uZ3NOYW1lQ3ljbGVyID0gVXRpbHMuY3ljbGUoc29uZ3NOYW1lcylcblx0c29uZ3NTb3VyY2VDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc1NvdXJjZSlcblx0c29uZ0FsYnVtSURDeWNsZXIgPSBVdGlscy5jeWNsZShzb25nc0FsYnVtcylcblx0XG5cdHBsYXlpbmdTb25nTmFtZSA9IFwiXCJcblx0cGxheWluZ1NvbmdTb3VyY2UgPSBcIlwiXG5cdHBsYXlpbmdTb25nQWxidW1JRCA9IDBcblx0Zm9yIGkgaW4gWzAuLnNvbmdJRF1cblx0XHRwbGF5aW5nU29uZ05hbWUgPSBzb25nc05hbWVDeWNsZXIoKVxuXHRcdHBsYXlpbmdTb25nU291cmNlID0gc29uZ1BhdGgrc29uZ3NTb3VyY2VDeWNsZXIoKVxuXHRcdHBsYXlpbmdTb25nQWxidW1JRCA9IHNvbmdBbGJ1bUlEQ3ljbGVyKClcblx0XG5cdGlmIHBhdXNlLnN0YXRlcy5jdXJyZW50IGlzIFwiaGlkZGVuXCJcblx0XHRwbGF5LnN0YXRlcy5uZXh0KClcblx0XHRwYXVzZS5zdGF0ZXMubmV4dCgpXG5cdFxuXHRtdXNpYy52aWRlbyA9IHBsYXlpbmdTb25nU291cmNlXG5cdFxuXHRwbGF5ZXJTb25nVGl0bGUudGV4dCA9IHBsYXlpbmdTb25nTmFtZVxuXHRwbGF5ZXJTb25nQWxidW0udGV4dCA9IERhdGEuYWxidW1zRGF0YVtwbGF5aW5nU29uZ0FsYnVtSURdLnRpdGxlICsgXCIg4oCTIFwiICsgRGF0YS5hbGJ1bXNEYXRhW3BsYXlpbmdTb25nQWxidW1JRF0ueWVhclxuXHRcblx0VXRpbHMuZGVsYXkgLjMsIC0+IFxuXHRcdGR1cmF0aW9uUmlnaHQuaHRtbCA9IFwiLVwiICsgVGltZS50aW1lRnJvbVNlY29uZHMgbXVzaWMucGxheWVyLmR1cmF0aW9uXG5cdFx0c2NydWJiZXIubWF4ID0gfn5tdXNpYy5wbGF5ZXIuZHVyYXRpb25cblx0XG5cdG11c2ljLnBsYXllci5wbGF5KClcblxuXG4iLCJjbGFzcyBleHBvcnRzLk5ld3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBvcHRpb25zLm5ld3NJRCA/PSAtMVxuXHRcdEBvcHRpb25zLm5ld3NJbWFnZSA/PSAtMVxuXHRcdEBvcHRpb25zLm5ld3NUZXh0SW1hZ2UgPz0gLTFcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QC5ib3JkZXJSYWRpdXMgPSA4XG5cdFx0XG5cdEBkZWZpbmUgJ25ld3NJRCcsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0lEXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSUQgPSB2YWx1ZVxuXHRcdFx0XG5cdEBkZWZpbmUgJ25ld3NJbWFnZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c0ltYWdlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5uZXdzSW1hZ2UgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnbmV3c1RleHRJbWFnZScsXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c1RleHRJbWFnZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmV3c1RleHRJbWFnZSA9IHZhbHVlXG5cdCIsImNsYXNzIGV4cG9ydHMuTmF2IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAb3B0aW9ucy5uYXZJRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ25hdklEJyxcblx0XHRnZXQ6IC0+XG5cdFx0XHRAb3B0aW9ucy5uYXZJRFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubmF2SUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIEdldHRpbmcgRGF0YVxuXG5zb25nTW9kZWwwID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8wLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzAuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMC5qcGdcIlxufVxuXG5zb25nTW9kZWwxID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8xLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzEuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMS5qcGdcIlxufVxuXG5zb25nTW9kZWwyID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8yLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzIuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMi5qcGdcIlxufVxuXG5zb25nTW9kZWwzID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8zLmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzMuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvMy5qcGdcIlxufVxuXG5zb25nTW9kZWw0ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC80LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzQuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNC5qcGdcIlxufVxuXG5zb25nTW9kZWw1ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC81LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzUuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNS5qcGdcIlxufVxuXG5zb25nTW9kZWw2ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC82LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzYuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNi5qcGdcIlxufVxuXG5zb25nTW9kZWw3ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC83LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzcuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvNy5qcGdcIlxufVxuXG5zb25nTW9kZWw4ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC84LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzguanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvOC5qcGdcIlxufVxuXG5zb25nTW9kZWw5ID0geyBcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC85LmpwZ1wiXG5cdGNvdmVySW1hZ2U6IFwiaW1hZ2VzL25ld3MvY292ZXJzLzkuanBnXCJcblx0dGV4dEltYWdlOiBcImltYWdlcy9uZXdzL3RleHQvOS5qcGdcIlxufVxuXG5zb25nTW9kZWwxMCA9IHtcblx0aW1hZ2U6IFwiaW1hZ2VzL25ld3MvZnVsbC8xMC5qcGdcIlxuXHRjb3ZlckltYWdlOiBcImltYWdlcy9uZXdzL2NvdmVycy8xMC5qcGdcIlxuXHR0ZXh0SW1hZ2U6IFwiaW1hZ2VzL25ld3MvdGV4dC8xMC5qcGdcIlxufVxuXG5leHBvcnRzLmZlZWREYXRhID0gW3NvbmdNb2RlbDAsIHNvbmdNb2RlbDEsIHNvbmdNb2RlbDIsIHNvbmdNb2RlbDMsIHNvbmdNb2RlbDQsIHNvbmdNb2RlbDUsIHNvbmdNb2RlbDYsIHNvbmdNb2RlbDcsIHNvbmdNb2RlbDgsIHNvbmdNb2RlbDksIHNvbmdNb2RlbDEwXSIsIiMgbG9jYWxEaXNhcHBlYXJUaW1lID0gMC41XG4jIGxvY2FsTmV3c0RldGFpbGVkQXBwZWFyQ3VydmUgPSBcImN1YmljLWJlemllciguMDYsLjgxLDAsLjkzKVwiXG4jIGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4wNiwuODEsLjc5LC45OSlcIlxubG9jYWxEaXNhcHBlYXJUaW1lID0gMC4zNFxubG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxubG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5cblxuY2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzID0gKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcpIC0+XG5cdG5ld3NEZXRhaWxlZFRvcFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAtODgqM1xuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZENsb3NlQ3VydmVcblx0XHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDExMzZcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRVdGlscy5kZWxheSBsb2NhbERpc2FwcGVhclRpbWUrMC4wMiwgLT5cblx0XHRuZXdzRGV0YWlsZWRWaWV3LmRlc3Ryb3koKVxuXG5cbmNsb3NlRGV0YWlsZWRWaWV3ID0gKG5ld3NEZXRhaWxlZFZpZXcpIC0+XG5cdG1vcmVUaW1lID0gMS40XG5cdG5ld3NEZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAtMTEzNlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAqIG1vcmVUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0VXRpbHMuZGVsYXkgbG9jYWxEaXNhcHBlYXJUaW1lICogbW9yZVRpbWUgKyAwLjAyLCAtPlxuXHRcdG5ld3NEZXRhaWxlZFZpZXcuZGVzdHJveSgpXG5cblxuXG5cblxuXG5cbmV4cG9ydHMuY3JlYXRlTmV3c0RldGFpbGVkUGFnZSA9IChuZXdzRGF0YU1vZGVsKSAtPlxuXHQjIHByaW50IG5ld3NEYXRhTW9kZWwuaW1hZ2Vcblx0XG5cdG5ld3NEZXRhaWxlZFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxMTM2XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcblx0bmV3c0RldGFpbGVkVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdCMgc2tpcCB0YXBzXG5cblx0bmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogbmV3c0RldGFpbGVkVmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDg4KjJcblx0XHR5OiAtODgqMlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0aW1hZ2U6IG5ld3NEYXRhTW9kZWwuaW1hZ2VcblxuXHRibHVyRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cdFx0d2lkdGg6IG5ld3NEZXRhaWxlZFRvcFZpZXcud2lkdGhcblx0XHRoZWlnaHQ6IG5ld3NEZXRhaWxlZFRvcFZpZXcuaGVpZ2h0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cblx0Ymx1ckRldGFpbGVkVG9wVmlldy5zdHlsZSA9XG5cdFx0XHQnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInOiAnYmx1cigyMHB4KSdcblxuXHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQqMlxuXHRcdGhlaWdodDogNjQqMlxuXHRcdHg6IDBcblx0XHR5OiAyMCoyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdGltYWdlOiBcImltYWdlcy9jbG9zZU5ld3NQYWdlLnBuZ1wiXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRUb3BWaWV3XG5cblx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3ID0gbmV3IExheWVyIHdpZHRoOiAyNDQsIGhlaWdodDogNzIsIHg6IDM3NiwgeTogNzIsIGltYWdlOiBcImltYWdlcy9zaGFyZU5ld3NEZXRhaWxlZFZpZXcucG5nXCIsIHBhcmVudDogbmV3c0RldGFpbGVkVG9wVmlld1xuXHRcblx0XG5cblxuXHRuZXdzRGV0YWlsZWRDb250ZW50ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHR5OiAxMTM2XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRWaWV3XG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJiZ2EoMCwwLDAsMClcIlxuXG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogMTEzNi04OCoyLTYwKjJcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRcblx0XHRzcGVlZFk6IDAuOFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2VcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50SW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiA0ODBcblx0XHRwYXJlbnQ6IG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0aW1hZ2U6IG5ld3NEYXRhTW9kZWwuaW1hZ2VcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNDAwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHR5OiBuZXdzRGV0YWlsZWRDb250ZW50SW1hZ2UuaGVpZ2h0XG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnRcblxuXHRuZXdzRGV0YWlsZWRDb250ZW50VGV4dEltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBuZXdzRGV0YWlsZWRDb250ZW50VGV4dFZpZXdcblx0XHR3aWR0aDogNjQwXG5cdFx0aGVpZ2h0OiAxNDQwXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRpbWFnZTogbmV3c0RhdGFNb2RlbC50ZXh0SW1hZ2VcblxuXHRcblx0XG5cdFxuXHQjIG9wZW5pbmcgYW5pbWF0aW9uc1xuXHRcblx0bmV3c0RldGFpbGVkVG9wVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0bmV3c0RldGFpbGVkQ29udGVudC5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDg4KjJcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcdCMgY3VydmU6IFwiY3ViaWMtYmV6aWVyKC4wMSwxLC43OCwuODkpXCJcblx0XHRcblx0bmV3c0RldGFpbGVkVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOSlcIlxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXG5cblxuXG5cdGdhcEJvdHRvbSA9IC0xMDQwXG5cdGdhcFRvcCA9IDEwXG5cdGdhcERlbHRhID0gMTEwXG5cdFxuXHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSwgLT5cblx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IHRydWVcblx0XG5cdFxuXHRcblx0IyBjbG9zZSB2aWV3XG5cdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwub24gRXZlbnRzLk1vdmUsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPiBnYXBUb3AgJiYgaXNOZXdzVmlld01vZHVsYXRpbmdcblx0XHRcdGJvdW5kcyA9IFtnYXBUb3AsIGdhcFRvcCtnYXBEZWx0YV1cblx0XHRcdG5ld3NEZXRhaWxlZFRvcFZpZXcueSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLCAtODhdLCB0cnVlKSBcblx0XHRcdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldy5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzEsIDAuMV0sIHRydWUpXG5cdFx0XHRzaGFyZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0bG9jYWxCYWNrZ3JvdW5kT3BhY2l0eVZhbHVlID0gVXRpbHMubW9kdWxhdGUobmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnksIGJvdW5kcywgWzAuOSwgMF0sIHRydWUpXG5cdFx0XHRuZXdzRGV0YWlsZWRWaWV3LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCxcIiArIGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSArIFwiKVwiXG5cdFx0XHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55IDwgZ2FwQm90dG9tICYmIGlzTmV3c1ZpZXdNb2R1bGF0aW5nXG5cdFx0XHRib3VuZHMgPSBbZ2FwQm90dG9tLCBnYXBCb3R0b20tZ2FwRGVsdGFdXG5cdFx0XHRjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcub3BhY2l0eSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFsxLCAwLjFdLCB0cnVlKVxuXHRcdFx0c2hhcmVOZXdzRGV0YWlsZWRUb3BWaWV3Lm9wYWNpdHkgPSBVdGlscy5tb2R1bGF0ZShuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC4xXSwgdHJ1ZSlcblx0XHRcdGxvY2FsQmFja2dyb3VuZE9wYWNpdHlWYWx1ZSA9IFV0aWxzLm1vZHVsYXRlKG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55LCBib3VuZHMsIFswLjksIDBdLCB0cnVlKVxuXHRcdFx0bmV3c0RldGFpbGVkVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbEJhY2tncm91bmRPcGFjaXR5VmFsdWUgKyBcIilcIlxuXHRcdFx0XG5cdFxuXHRuZXdzRGV0YWlsZWRDb250ZW50U2Nyb2xsLm9uIEV2ZW50cy5TY3JvbGwsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0aWYgbmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5jb250ZW50LnkgPCBnYXBCb3R0b20gLSBnYXBEZWx0YVxuXHRcdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XHRpc05ld3NWaWV3TW9kdWxhdGluZyA9IGZhbHNlXG5cdFx0XHRjbG9zZURldGFpbGVkVmlldyhuZXdzRGV0YWlsZWRWaWV3KVx0XHRcdFxuXHRcdFxuXHRcdGlmIG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuY29udGVudC55ID4gZ2FwVG9wICsgZ2FwRGVsdGFcblx0XHRcdG5ld3NEZXRhaWxlZENvbnRlbnRTY3JvbGwuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdFx0Y2xvc2VEZXRhaWxlZFZpZXdUd29XYXlzKG5ld3NEZXRhaWxlZFRvcFZpZXcsIG5ld3NEZXRhaWxlZENvbnRlbnQsIG5ld3NEZXRhaWxlZFZpZXcpXG5cdFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0bmV3c0RldGFpbGVkQ29udGVudFNjcm9sbC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0aXNOZXdzVmlld01vZHVsYXRpbmcgPSBmYWxzZVxuXHRcdGNsb3NlRGV0YWlsZWRWaWV3VHdvV2F5cyhuZXdzRGV0YWlsZWRUb3BWaWV3LCBuZXdzRGV0YWlsZWRDb250ZW50LCBuZXdzRGV0YWlsZWRWaWV3KVxuXHRcdFxuXHRcdG5ld3NEZXRhaWxlZFZpZXcuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIlxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0XHRcblx0XHRcblx0XG5cdFxuXHRyZXR1cm4gbmV3c0RldGFpbGVkVmlldyIsIkRhdGEgPSByZXF1aXJlICdkYXRhJ1xuU29uZ0NyZWF0b3IgPSByZXF1aXJlICdjcmVhdGVfc29uZydcbiMgU29uZ1BsYXllciA9IHJlcXVpcmUgJ3BsYXlfc29uZydcbntUZXh0TGF5ZXJ9ID0gcmVxdWlyZSBcInRleHRcIlxuXG5cbmxvY2FsRGlzYXBwZWFyVGltZSA9IDAuMlxubG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZSA9IFwiY3ViaWMtYmV6aWVyKC4zMiwuOTIsLjkyLC45OSlcIlxubG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlID0gXCJjdWJpYy1iZXppZXIoLjMyLC45MiwuOTIsLjk5KVwiXG5cblxuYW5pbWF0ZURldGFpbGVkQWxidW1QYWdlID0gKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1kpIC0+XG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlLndpZHRoID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbNjQwLCBvZmZzZXRWYWx1ZS53aWR0aF0sIHRydWUpXG5cdGFsYnVtX2Zha2VfaW1hZ2UuaGVpZ2h0ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbNjQwLCBvZmZzZXRWYWx1ZS5oZWlnaHRdLCB0cnVlKVxuXHRhbGJ1bV9mYWtlX2ltYWdlLnggPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLCBvZmZzZXRWYWx1ZS54XSwgdHJ1ZSlcblx0YWxidW1fZmFrZV9pbWFnZS55ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMCwgb2Zmc2V0VmFsdWUueV0sIHRydWUpXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC40XSlcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIud2lkdGggPSBhbGJ1bV9mYWtlX2ltYWdlLndpZHRoXG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLmhlaWdodCA9IGFsYnVtX2Zha2VfaW1hZ2UuaGVpZ2h0XG5cdFx0XG5cdGxvY2FsQ29sb3IgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFswLjgsIDBdLCB0cnVlKVxuXHRkZXRhaWxlZEFsYnVtVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsXCIgKyBsb2NhbENvbG9yICsgXCIpXCJcblx0XG5cdGZvciBpdGVtLGkgaW4gYWxidW1PcHRpb25zXG5cdFx0aXRlbS5vcGFjaXR5ID0gVXRpbHMubW9kdWxhdGUoc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSwgYm91bmRzLCBbMSwgMC40XSlcblx0XHRpdGVtLnkgPSBVdGlscy5tb2R1bGF0ZShzb25nc1Njcm9sbFZpZXcuY29udGVudC55LCBib3VuZHMsIFthbGJ1bU9wdGlvbnNZW2ldLCBhbGJ1bU9wdGlvbnNZW2ldK29mZnNldFZhbHVlLnkgLyAyICsgKGkrMSkgKiAyMF0pXG5cblxuY2xvc2VEZXRhaWxlZEFsYnVtUGFnZSA9IChhbGJ1bVNvbmdzVmlldywgYWxidW1fZmFrZV9pbWFnZSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIG9mZnNldFZhbHVlLCBkZXRhaWxlZEFsYnVtVmlldywgYWxidW1PcHRpb25zKSAtPlxuXHRcblx0YWxidW1Tb25nc1ZpZXcuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6XG5cdFx0XHR5OiAxMTM2XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0Y3VydmU6IGxvY2FsTmV3c0RldGFpbGVkQ2xvc2VDdXJ2ZVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZS5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHdpZHRoOiBvZmZzZXRWYWx1ZS53aWR0aCwgaGVpZ2h0OiBvZmZzZXRWYWx1ZS5oZWlnaHQsIHg6IG9mZnNldFZhbHVlLngsIHk6IG9mZnNldFZhbHVlLnlcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRDbG9zZUN1cnZlXG5cdFxuXHRhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlci5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdG9wYWNpdHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XG5cdGRldGFpbGVkQWxidW1WaWV3LmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOiB7YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMClcIn1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XG5cdGZvciBpdGVtIGluIGFsYnVtT3B0aW9uc1xuXHRcdGl0ZW0uYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczogeyBvcGFjaXR5OiAwLCB5OiBpdGVtLnkgKyA2MH1cblx0XHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDRcblx0XG5cdFV0aWxzLmRlbGF5IGxvY2FsRGlzYXBwZWFyVGltZSswLjAyLCAtPlxuXHRcdGRldGFpbGVkQWxidW1WaWV3LmRlc3Ryb3koKVxuXG5cblxuXG5cbiMgQ29tcG9zZSBEZXRhaWxlZCBWaWV3XHRcbmV4cG9ydHMuY3JlYXRlRGV0YWlsZWRBbGJ1bVBhZ2UgPSAoYWxidW1JRCwgb2Zmc2V0VmFsdWUpIC0+XG5cdFxuXHRkZXRhaWxlZEFsYnVtVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDExMzZcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwKVwiXG5cdFxuXHRkZXRhaWxlZEFsYnVtVmlldy5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdCMgaWdub3JlIG90aGVyIHRhcHNcblxuXG5cblxuXHRhbGJ1bV9mYWtlX2ltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHdpZHRoOiBvZmZzZXRWYWx1ZS53aWR0aFxuXHRcdGhlaWdodDogb2Zmc2V0VmFsdWUuaGVpZ2h0XG5cdFx0eDogb2Zmc2V0VmFsdWUueFxuXHRcdHk6IG9mZnNldFZhbHVlLnlcblx0XHRpbWFnZTogXCJpbWFnZXMvYWxidW1zLyN7YWxidW1JRH0uanBnXCJcdFxuXG5cdGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBhbGJ1bV9mYWtlX2ltYWdlXG5cdFx0b3BhY2l0eTogMFxuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDY0MFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNilcIlxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuc3R5bGUgPVxuXHRcdFx0Jy13ZWJraXQtYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoMTBweCknXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0YWxidW1UaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IGRldGFpbGVkQWxidW1WaWV3XG5cdFx0dGV4dDogXCIje0RhdGEuYWxidW1zRGF0YVthbGJ1bUlEXS50aXRsZX1cIlxuXHRcdHdpZHRoOiAyOTIqMlxuXHRcdGhlaWdodDogNDhcblx0XHR4OiAyOFxuXHRcdHk6IDg0KjJcblx0XHRmb250U2l6ZTogNDBcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cdFx0b3BhY2l0eTogMFxuXHRcblx0YWxidW1ZZWFyID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogZGV0YWlsZWRBbGJ1bVZpZXdcblx0XHR0ZXh0OiBcIiN7RGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnllYXJ9XCJcblx0XHR3aWR0aDogMjkyKjJcblx0XHRoZWlnaHQ6IDQ4XG5cdFx0eDogMjhcblx0XHR5OiAxMTQqMlxuXHRcdGZvbnRTaXplOiAzMlxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdGNvbG9yOiBcIiM5OTk5OTlcIlxuXHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcdG9wYWNpdHk6IDBcblx0XG5cdGNsb3NlTmV3c0RldGFpbGVkVG9wVmlldyA9IG5ldyBMYXllclxuXHRcdHdpZHRoOiA3MlxuXHRcdGhlaWdodDogNzJcblx0XHR4OiAxNDIqMlxuXHRcdHk6IDM0KjJcblx0XHRpbWFnZTogXCJpbWFnZXMvY2xvc2VOZXdzRGV0YWlsZWRWaWV3LnBuZ1wiXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdG9wYWNpdHk6IDBcblx0XG5cdGFsYnVtU29uZ3NWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBkZXRhaWxlZEFsYnVtVmlld1xuXHRcdHdpZHRoOiA2NDBcblx0XHRoZWlnaHQ6IDcwOFxuXHRcdHk6IDExMzZcblx0XHQjIGltYWdlOiBcImltYWdlcy9hbGJ1bXMvI3thbGJ1bUlEfS5qcGdcIlxuXHRcdGJhY2tncm91bmRDb2xvcjogXCIjMTExXCJcblx0XG5cdCMgYmx1ciA9IG5ldyBMYXllclxuIyBcdFx0d2lkdGg6IDY0MFxuIyBcdFx0aGVpZ2h0OiAxMTM2XG4jIFx0XHRwYXJlbnQ6IGFsYnVtU29uZ3NWaWV3XG4jIFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNiknXG4jXG4jIFx0Ymx1ci5zdHlsZSA9XG4jIFx0XHQnLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXInOiAnYmx1cigxMHB4KSdcblxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGFsYnVtT3B0aW9ucyA9IFthbGJ1bVllYXIsIGFsYnVtVGl0bGUsIGNsb3NlTmV3c0RldGFpbGVkVG9wVmlld11cblx0YWxidW1PcHRpb25zWSA9IFthbGJ1bVllYXIueSwgYWxidW1UaXRsZS55LCBjbG9zZU5ld3NEZXRhaWxlZFRvcFZpZXcueV1cblxuXHRhbGJ1bV9mYWtlX2ltYWdlLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0d2lkdGg6IDY0MCwgaGVpZ2h0OiA2NDAsIHg6IDAsIHk6IDBcblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWVcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0YWxidW1fZmFrZV9pbWFnZV9kYXJrZXIuYW5pbWF0ZVxuXHRcdHByb3BlcnRpZXM6IHsgb3BhY2l0eTogMSB9XG5cdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRjdXJ2ZTogbG9jYWxOZXdzRGV0YWlsZWRBcHBlYXJDdXJ2ZVxuXHRcblx0Zm9yIGl0ZW0gaW4gYWxidW1PcHRpb25zXG5cdFx0aXRlbS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFx0dGltZTogbG9jYWxEaXNhcHBlYXJUaW1lIC8gMlxuXHRcdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblx0XHRcdFxuXHRkZXRhaWxlZEFsYnVtVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczoge2JhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuOClcIn1cblx0XHR0aW1lOiBsb2NhbERpc2FwcGVhclRpbWUgLyAyXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDJcblxuXHRhbGJ1bVNvbmdzVmlldy5hbmltYXRlXG5cdFx0cHJvcGVydGllczpcblx0XHRcdHk6IDMwOFxuXHRcdHRpbWU6IGxvY2FsRGlzYXBwZWFyVGltZVxuXHRcdGN1cnZlOiBsb2NhbE5ld3NEZXRhaWxlZEFwcGVhckN1cnZlXG5cdFx0ZGVsYXk6IGxvY2FsRGlzYXBwZWFyVGltZSAvIDRcblxuXG5cblxuXG5cblxuXG5cdCMgQ29tcG9zZSBzb25nIGZvciBhbGJ1bVxuXHRzb25nc1Njcm9sbFZpZXcgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0d2lkdGg6IDY0MFxuXHRcdGhlaWdodDogNzA4XG5cdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRwYXJlbnQ6IGFsYnVtU29uZ3NWaWV3XG5cdFx0eTogMjBcblx0XHRzcGVlZFk6IDAuOFxuXG5cdHNvbmdzID0gU29uZ0NyZWF0b3IuY3JlYXRlU29uZ3NGb3JBbGJ1bShhbGJ1bUlEKVxuXHRzb25nUmVzdWx0SGVpZ2h0ID0gMFxuXHRmb3Igc29uZyxpIGluIHNvbmdzXG5cdFx0c29uZy55ID0gaSAqIDgwXG5cdFx0c29uZ1Jlc3VsdEhlaWdodCA9IHNvbmcueSArIHNvbmcuaGVpZ2h0XG5cdFx0c29uZy5wYXJlbnQgPSBzb25nc1Njcm9sbFZpZXcuY29udGVudFxuXHRcblx0XG5cdFxuXHRcblx0IyBDbG9zZSBBbGJ1bSBWaWV3XG5cdGNsb3NpbmdBbGJ1bVZpZXcgPSBmYWxzZVxuXHRib3VuZHMgPSBbMTArNDAsIDEwMCs4MF1cblx0Ym91bmRzQm90dG9tID0gWy0oc29uZ1Jlc3VsdEhlaWdodCAtIHNvbmdzU2Nyb2xsVmlldy5oZWlnaHQgKyBib3VuZHNbMF0pLCAtKHNvbmdSZXN1bHRIZWlnaHQgLSBzb25nc1Njcm9sbFZpZXcuaGVpZ2h0ICsgYm91bmRzWzFdKV1cblx0XG5cdHNvbmdzU2Nyb2xsVmlldy5vbiBFdmVudHMuU2Nyb2xsLCAtPlxuXHRcdFxuXHRcdGlmIHNvbmdzU2Nyb2xsVmlldy5jb250ZW50LnkgPiBib3VuZHNbMF1cblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kcywgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZKVxuXHRcdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA+IGJvdW5kc1sxXVxuXHRcdFx0c29uZ3NTY3JvbGxWaWV3Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdGNsb3NpbmdBbGJ1bVZpZXcgPSB0cnVlXG5cdFx0XHRjbG9zZURldGFpbGVkQWxidW1QYWdlKGFsYnVtU29uZ3NWaWV3LCBhbGJ1bV9mYWtlX2ltYWdlLCBhbGJ1bV9mYWtlX2ltYWdlX2Rhcmtlciwgb2Zmc2V0VmFsdWUsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMpXG5cdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA8IGJvdW5kc0JvdHRvbVswXVxuXHRcdFx0YW5pbWF0ZURldGFpbGVkQWxidW1QYWdlKHNvbmdzU2Nyb2xsVmlldywgYm91bmRzQm90dG9tLCBhbGJ1bV9mYWtlX2ltYWdlX2RhcmtlciwgYWxidW1fZmFrZV9pbWFnZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucywgb2Zmc2V0VmFsdWUsIGFsYnVtT3B0aW9uc1kpXG5cblx0XHRpZiBzb25nc1Njcm9sbFZpZXcuY29udGVudC55IDwgYm91bmRzQm90dG9tWzFdXG5cdFx0XHRzb25nc1Njcm9sbFZpZXcuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFx0Y2xvc2luZ0FsYnVtVmlldyA9IHRydWVcblx0XHRcdGNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucylcblx0XHRcdFxuXHRcblx0XG5cdFxuXHRzb25nc1Njcm9sbFZpZXcub24gRXZlbnRzLk1vdmUsIC0+XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA+IGJvdW5kc1swXSBhbmQgIWNsb3NpbmdBbGJ1bVZpZXdcblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kcywgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZKVxuXHRcdFx0XG5cdFx0aWYgc29uZ3NTY3JvbGxWaWV3LmNvbnRlbnQueSA8IGJvdW5kc0JvdHRvbVswXSBhbmQgIWNsb3NpbmdBbGJ1bVZpZXdcblx0XHRcdGFuaW1hdGVEZXRhaWxlZEFsYnVtUGFnZShzb25nc1Njcm9sbFZpZXcsIGJvdW5kc0JvdHRvbSwgYWxidW1fZmFrZV9pbWFnZV9kYXJrZXIsIGFsYnVtX2Zha2VfaW1hZ2UsIGRldGFpbGVkQWxidW1WaWV3LCBhbGJ1bU9wdGlvbnMsIG9mZnNldFZhbHVlLCBhbGJ1bU9wdGlvbnNZKVxuXHRcblx0XG5cdFxuXHRcblx0Y2xvc2VOZXdzRGV0YWlsZWRUb3BWaWV3Lm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0c29uZ3NTY3JvbGxWaWV3Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRjbG9zaW5nQWxidW1WaWV3ID0gdHJ1ZVxuXHRcdGNsb3NlRGV0YWlsZWRBbGJ1bVBhZ2UoYWxidW1Tb25nc1ZpZXcsIGFsYnVtX2Zha2VfaW1hZ2UsIGFsYnVtX2Zha2VfaW1hZ2VfZGFya2VyLCBvZmZzZXRWYWx1ZSwgZGV0YWlsZWRBbGJ1bVZpZXcsIGFsYnVtT3B0aW9ucylcblx0XG5cdFxuXG5cdHJldHVybiBbZGV0YWlsZWRBbGJ1bVZpZXcsIHNvbmdzXSIsIiMgR2V0dGluZyBEYXRhXG5cbmFsYnVtTW9kZWwxID0geyBcblx0dGl0bGU6IFwiRW1vdGlvbmFsIDhcIlxuXHR5ZWFyOiAxOTk4XG5cdFxuXHRzb25nczogW1wiSHlkcm9cIiwgXCJEcmVhbWxhbmRcIiwgXCJIYXRlXCIsIFwiQmx1bnRcIiwgXCJOZW9uIENsb3Vkc1wiLCBcIlN0YXlcIiwgXCJBdXJvcmFcIiwgXCJOb2lyXCIsIFwiQXVyb3JhIFJlbWl4XCJdXG5cdHRpbWU6IFtcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjI6NDVcIiwgXCIyOjQ1XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuXHRcblx0aW1hZ2U6IFwiaW1hZ2VzL2FsYnVtcy8xLmpwZ1wiXG5cdHRpbnRDb2xvcjogXCJncmV5XCJcblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cbn1cblxuYWxidW1Nb2RlbDIgPSB7IFxuXHR0aXRsZTogXCJNYXkgMTNcIlxuXHR5ZWFyOiAyMDAxXG5cdFxuXHRzb25nczogW1wiTmltYnVzIDIwMDBcIiwgXCJSb2xsaW5nc3RvbmVyXCIsIFwiSG91c3RvblwiLCBcIlRodW5kZXJqdWljZVwiLCAgXCJNYXkgMTNcIiwgXCJHbG91Y29tYVwiLCBcIkNoYXZyb24gT2NlYW5cIiwgXCJUaGUgRG9tZVwiLCBcIlBsYW4gQlwiLCBcIk1heSAxMyBSZW1peFwiLCBcIk5ldnNreSBQclwiLCBcIkJsb29keSBXYXRlcnNcIiwgXCJLbm9jayBvdXRcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiXVxuXHRcblx0aW1hZ2U6IFwiaW1hZ2VzL2FsYnVtcy8yLmpwZ1wiXG5cdHRpbnRDb2xvcjogXCJ3aGl0ZVwiXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIl1cbn1cblxuYWxidW1Nb2RlbDMgPSB7IFxuXHR0aXRsZTogXCJFbW90aW9uYWwgOFwiXG5cdHllYXI6IDIwMDJcblx0XG5cdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG5cdFxuXHRpbWFnZTogXCJpbWFnZXMvYWxidW1zLzMuanBnXCJcblx0dGludENvbG9yOiBcImdyZXlcIlxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxufVxuXG5hbGJ1bU1vZGVsNCA9IHsgXG5cdHRpdGxlOiBcIkVtb3Rpb25hbCA4XCJcblx0eWVhcjogMjAwNVxuXHRcblx0c29uZ3M6IFtcIkh5ZHJvXCIsIFwiRHJlYW1sYW5kXCIsIFwiSGF0ZVwiLCBcIkJsdW50XCIsIFwiTmVvbiBDbG91ZHNcIiwgXCJTdGF5XCIsIFwiQXVyb3JhXCIsIFwiTm9pclwiLCBcIkF1cm9yYSBSZW1peFwiXVxuXHR0aW1lOiBbXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIyOjQ1XCIsIFwiMjo0NVwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIl1cblx0XG5cdGltYWdlOiBcImltYWdlcy9hbGJ1bXMvNC5qcGdcIlxuXHR0aW50Q29sb3I6IFwiZ3JleVwiXG5cdHNvdXJjZTogW1wiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCJdXG59XG5cblxuYWxidW1Nb2RlbDUgPSB7IFxuXHR0aXRsZTogXCJFbW90aW9uYWwgOFwiXG5cdHllYXI6IDIwMDhcblx0XG5cdHNvbmdzOiBbXCJIeWRyb1wiLCBcIkRyZWFtbGFuZFwiLCBcIkhhdGVcIiwgXCJCbHVudFwiLCBcIk5lb24gQ2xvdWRzXCIsIFwiU3RheVwiLCBcIkF1cm9yYVwiLCBcIk5vaXJcIiwgXCJBdXJvcmEgUmVtaXhcIl1cblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCJdXG5cdFxuXHRpbWFnZTogXCJpbWFnZXMvYWxidW1zLzUuanBnXCJcblx0dGludENvbG9yOiBcImdyZXlcIlxuXHRzb3VyY2U6IFtcIjEubTRhXCIsIFwiMi5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxufVxuXG5cblxuXG5cblxuZXhwb3J0cy5hbGJ1bXNEYXRhID0gW2FsYnVtTW9kZWwxLCBhbGJ1bU1vZGVsMiwgYWxidW1Nb2RlbDMsIGFsYnVtTW9kZWw0LCBhbGJ1bU1vZGVsNV1cbmV4cG9ydHMuZmF2TGlzdCA9IHsgXHRcblx0c29uZ3M6IFtcIk5pbWJ1cyAyMDAwXCIsIFwiUm9sbGluZ3N0b25lclwiLCBcIkhvdXN0b25cIiwgXCJUaHVuZGVyanVpY2VcIiwgIFwiTWF5IDEzXCIsIFwiR2xvdWNvbWFcIiwgXCJDaGF2cm9uIE9jZWFuXCIsIFwiVGhlIERvbWVcIiwgXCJQbGFuIEJcIiwgXCJNYXkgMTMgUmVtaXhcIl1cblx0c291cmNlOiBbXCIxLm00YVwiLCBcIjIubTRhXCIsIFwiMS5tNGFcIiwgXCIyLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiLCBcIjEubTRhXCIsIFwiMS5tNGFcIiwgXCIxLm00YVwiXVxuXHRcblx0dGltZTogW1wiMzowOFwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMjo0NVwiLCBcIjI6NDVcIiwgXCIzOjA4XCIsIFwiMzowOFwiLCBcIjM6MDhcIiwgXCIzOjA4XCIsIFwiMjo0NVwiXVxuXHRhbGJ1bXM6IFswLCAxLCAyLCAwLCAwLCAxLCAyLCAyLCAxLCAwXVxufVxuXG5cbiIsIntTb25nfSA9IHJlcXVpcmUgXCJzb25nXCJcbntUZXh0TGF5ZXJ9ID0gcmVxdWlyZSBcInRleHRcIlxuRGF0YSA9IHJlcXVpcmUgXCJkYXRhXCJcblxuIyBTb25nIChhbGJ1bUlEKVxuZXhwb3J0cy5jcmVhdGVTb25nc0ZvckFsYnVtID0gKGFsYnVtSUQpIC0+XG5cdHNvbmdzID0gW11cblx0Zm9yIHNvbmcsIGkgaW4gRGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzXG5cdFx0c29uZ3MucHVzaChALmNyZWF0ZUFsYnVtU29uZyhhbGJ1bUlELCBpKSlcblx0cmV0dXJuIHNvbmdzXG5cdFxuXG5cbmV4cG9ydHMuY3JlYXRlU29uZ3NGb3JGYXYgPSAoc29uZ3NMaXN0KSAtPlxuXHRzb25ncyA9IFtdXG5cdGZvciBzb25nLCBpIGluIHNvbmdzTGlzdC5zb25nc1xuXHRcdHNvbmdzLnB1c2goQC5jcmVhdGVTb25nKGkpKVxuXHRyZXR1cm4gc29uZ3NcblxuXG5cblxuIyBTb25nIChhbGJ1bUlELCBzb25nTnVtYmVyKVxuZXhwb3J0cy5jcmVhdGVTb25nID0gKHNvbmdOdW1iZXIpIC0+XG5cdFxuXHRzb25nVmlldyA9IG5ldyBTb25nXG5cdFx0aGVpZ2h0OiAxMzJcblx0XHRhbGJ1bUlEOiBEYXRhLmZhdkxpc3QuYWxidW1zW3NvbmdOdW1iZXJdXG5cdFx0c29uZ0lEOiBzb25nTnVtYmVyXG5cdFx0IyBhbGJ1bVRpdGxlOiBEYXRhLmFsYnVtc0RhdGFbYWxidW1JRF0udGl0bGVcblx0XHQjIHNvbmdUaXRsZTogRGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzW3NvbmdOdW1iZXJdXG5cblx0c29uZ0ltYWdlID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdGltYWdlOiBEYXRhLmFsYnVtc0RhdGFbRGF0YS5mYXZMaXN0LmFsYnVtc1tzb25nTnVtYmVyXV0uaW1hZ2Vcblx0XHR3aWR0aDogNDgqMlxuXHRcdGhlaWdodDogNDgqMlxuXHRcdHg6IDMyXG5cdFx0eTogMTZcblxuXHRzb25nVGl0bGUgPSBuZXcgVGV4dExheWVyXG5cdFx0cGFyZW50OiBzb25nVmlld1xuXHRcdHRleHQ6IFwiI3tEYXRhLmZhdkxpc3Quc29uZ3Nbc29uZ051bWJlcl19XCJcblx0XHR3aWR0aDogNDQwXG5cdFx0aGVpZ2h0OiA0NFxuXHRcdHg6IDE1NlxuXHRcdHk6IDIyXG5cdFx0Zm9udFNpemU6IDM2XG5cdFx0Zm9udEZhbWlseTogXCItYXBwbGUtc3lzdGVtLWJvbGQsIEJsaW5rTWFjU3lzdGVtRm9udCwgc2Fucy1zZXJpZlwiXG5cdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblxuXHRhbGJ1bVRpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7RGF0YS5hbGJ1bXNEYXRhW0RhdGEuZmF2TGlzdC5hbGJ1bXNbc29uZ051bWJlcl1dLnRpdGxlfVwiXG5cdFx0d2lkdGg6IDQ0MFxuXHRcdGhlaWdodDogMzRcblx0XHR4OiAxNTZcblx0XHR5OiA2OFxuXHRcdGZvbnRTaXplOiAyOFxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRjb2xvcjogXCIjOTk5XCJcblx0XHRsZXR0ZXJTcGFjaW5nOiAwLjVcblx0XG5cdHJldHVybiBzb25nVmlld1xuXG5cblxuXG4jIFNvbmcgKGFsYnVtSUQsIHNvbmdOdW1iZXIpXG5leHBvcnRzLmNyZWF0ZUFsYnVtU29uZyA9IChhbGJ1bUlELCBzb25nTnVtYmVyKSAtPlxuXHRcblx0c29uZ1ZpZXcgPSBuZXcgU29uZ1xuXHRcdGhlaWdodDogODBcblx0XHRhbGJ1bUlEOiBhbGJ1bUlEXG5cdFx0c29uZ0lEOiBzb25nTnVtYmVyXG5cdFx0IyBhbGJ1bVRpdGxlOiBEYXRhLmFsYnVtc0RhdGFbYWxidW1JRF0udGltZVtzb25nTnVtYmVyXVxuXHRcdHNvbmdUaXRsZTogRGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnNvbmdzW3NvbmdOdW1iZXJdXG5cblx0c29uZ1RpdGxlID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7c29uZ1ZpZXcuc29uZ1RpdGxlfVwiXG5cdFx0d2lkdGg6IDQ0MFxuXHRcdGhlaWdodDogNDBcblx0XHR4OiAoMjgrMTQpKjJcblx0XHR5OiAyMFxuXHRcdGZvbnRTaXplOiAzMlxuXHRcdGZvbnRGYW1pbHk6IFwiLWFwcGxlLXN5c3RlbS1ib2xkLCBCbGlua01hY1N5c3RlbUZvbnQsIHNhbnMtc2VyaWZcIlxuXHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0bGV0dGVyU3BhY2luZzogMC4yXG5cblx0c29uZ0R1cmF0aW9uID0gbmV3IFRleHRMYXllclxuXHRcdHBhcmVudDogc29uZ1ZpZXdcblx0XHR0ZXh0OiBcIiN7RGF0YS5hbGJ1bXNEYXRhW2FsYnVtSURdLnRpbWVbc29uZ051bWJlcl19XCJcblx0XHR3aWR0aDogMTIwXG5cdFx0aGVpZ2h0OiAzNFxuXHRcdHg6IDIzMioyKzI4XG5cdFx0eTogMjZcblx0XHRmb250U2l6ZTogMjhcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdGNvbG9yOiBcIiM5OTlcIlxuXHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcdG9wYWNpdHk6IDAuN1xuXHRcblx0c29uZ051bWJlciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRwYXJlbnQ6IHNvbmdWaWV3XG5cdFx0dGV4dDogXCIje3NvbmdOdW1iZXIrMX1cIlxuXHRcdHdpZHRoOiAxOCoyXG5cdFx0aGVpZ2h0OiAxNCoyXG5cdFx0eDogMTAqMlxuXHRcdHk6IDEzKjJcblx0XHRmb250U2l6ZTogMjRcblx0XHRmb250RmFtaWx5OiBcIi1hcHBsZS1zeXN0ZW0tYm9sZCwgQmxpbmtNYWNTeXN0ZW1Gb250LCBzYW5zLXNlcmlmXCJcblx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdGNvbG9yOiBcIiM5OTlcIlxuXHRcdGxldHRlclNwYWNpbmc6IDAuNVxuXHRcdG9wYWNpdHk6IDAuN1xuXHRcblx0cmV0dXJuIHNvbmdWaWV3IiwiY2xhc3MgZXhwb3J0cy5BbGJ1bSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMuYWxidW1JRCA/PSAtMVxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdEBkZWZpbmUgJ2FsYnVtSUQnLFxuXHRcdGdldDogLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSURcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFsYnVtSUQgPSB2YWx1ZVxuXG5cblx0XHRcdCIsIiMgUHJldmlldyBDb21wb25lbnRcbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3Q29tcG9uZW50QXNzZXRzXCJcbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbmxvY2FsQ29sb3JzID1cblx0YmdfY29sb3Jfb25MaWdodDogXCIjZWVlXCJcblx0YmdfY29sb3Jfb25EYXJrOiBcIiMyMjJcIlxuXHRjb250ZW50X2NvbG9yX29uTGlnaHQ6IFwiIzAwMFwiXG5cdGNvbnRlbnRfY29sb3Jfb25EYXJrOiBcIiNGRkZcIlxuXG50aGVtZSA9XG5cdGJnX2NvbG9yOiBsb2NhbENvbG9ycy5iZ19jb2xvcl9vbkRhcmtcblx0Y29udGVudF9jb2xvcjogbG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmtcblxuXG4jIExvZ29cblxuY2xhc3MgTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28obG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmspXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuIyBQcmV2aWV3XG5cbiMgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWV3OiBudWxsXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IFwiMjA6MTZcIlxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0XG5cdFx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0XHR0b3BUaGVtZTogXCJkYXJrXCJcblx0XHRcdGJvdHRvbVRoZW1lOiBcImRhcmtcIlxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3RvcFRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRvcFRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRvcFRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2JvdHRvbVRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcbiMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93QmFyID0gdmFsdWVcblx0XG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblx0XG5cdFxuXHRcblx0XG5cdGdldExvY2F0aW9uRGF0YTogKCkgPT5cblx0XHRxdWVyeUFycmF5ID0gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gcXVlcnlBcnJheVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdFx0XHRlbHNlIGlmIHZhbHVlUGFydCA9PSBcIm5vcm1hbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcdFx0XG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cdHNldERlc2t0b3BTY2FsZU1vZGU6IChmb3JTdGF0ZSA9IFwibm9ybWFsXCIpID0+XG5cdFx0QHVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdGluaXRTdGF0ZSA9IGZvclN0YXRlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBpbml0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0XHRlbHNlIGluaXRTdGF0ZSA9IFwibm9ybWFsXCJcblx0XHRcblx0XHRzaG91bGRTaG93QnV0dG9uID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImJ1dHRvblwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0J1dHRvbiA9IGZhbHNlXG5cdFx0XG5cdFx0c2hvdWxkU2hvd0xvZ28gPSB0cnVlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwibG9nb1wiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0xvZ28gPSBmYWxzZVxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oaW5pdFN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oaW5pdFN0YXRlKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgdGhlbiByZXR1cm5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcblx0XG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXHRcblx0XG5cblx0XG5cdFxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmdfY29sb3Jcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb250ZW50X2NvbG9yLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcCgtMjApXG5cdFx0QG9yaWdpblkgPSAwXG5cdFx0XG5cdFx0c0ggPSAoU2NyZWVuLmhlaWdodCArIDQwKSAvIEBoZWlnaHRcblx0XHRAc2NhbGUgPSBNYXRoLm1pbihTY3JlZW4ud2lkdGggLyBAd2lkdGgsIHNIKVxuXHRcblx0XG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKHRlbXApID0+XG5cdFx0dGVtcC5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhciBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdGVtcCwgd2lkdGg6IHRlbXAud2lkdGggLSAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoNilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5jZW50ZXIoMSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGJvdHRvbVRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0XG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBa0JBQTtBRENBLE9BQU8sQ0FBQyxJQUFSLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLEtBQUEsRUFBTyxNQURQO0dBREQ7RUFHQSxtQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLHlEQUFOO0lBQ0EsS0FBQSxFQUFPLDBEQURQO0dBSkQ7RUFNQSxxQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDJEQUFOO0lBQ0EsS0FBQSxFQUFPLDREQURQO0dBUEQ7RUFTQSxzQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDREQUFOO0lBQ0EsS0FBQSxFQUFPLDZEQURQO0dBVkQ7RUFZQSwwQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLGdFQUFOO0lBQ0EsS0FBQSxFQUFPLGlFQURQO0dBYkQ7RUFnQkEsS0FBQSxFQUFPLG9EQWhCUDs7Ozs7QURERCxJQUFBLDhDQUFBO0VBQUE7Ozs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLHdCQUFSOztBQUNULE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7O0FBRUEsV0FBQSxHQUNDO0VBQUEsZ0JBQUEsRUFBa0IsTUFBbEI7RUFDQSxlQUFBLEVBQWlCLE1BRGpCO0VBRUEscUJBQUEsRUFBdUIsTUFGdkI7RUFHQSxvQkFBQSxFQUFzQixNQUh0Qjs7O0FBS0QsS0FBQSxHQUNDO0VBQUEsUUFBQSxFQUFVLFdBQVcsQ0FBQyxlQUF0QjtFQUNBLGFBQUEsRUFBZSxXQUFXLENBQUMsb0JBRDNC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
