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
    this.getLocationData = bind(this.getLocationData, this);
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    _.defaults(this.options, {
      view: null,
      prototypeCreationYear: "20:15",
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

  Preview.prototype.setDesktopScaleMode = function(forState) {
    var i, initState, item, j, k, keyPart, keyValuePair, len, len1, len2, ref, ref1, ref2, scaleX, scaleY, shouldShowButton, shouldShowLogo, valuePart;
    if (forState == null) {
      forState = "normal";
    }
    scaleX = (Canvas.width - 112) / this.width;
    scaleY = (Canvas.height - 112) / this.height;
    this.states.fill.scale = Math.min(scaleX, scaleY);
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
        return localPreview.x = Align.center;
      };
    })(this));
    return Canvas.on("change:width", (function(_this) {
      return function() {
        return localPreview.y = Align.center;
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


},{"PreviewComponentAssets":"PreviewComponentAssets"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE1LTAyLTI2IFtpb3NdIFRyYWlsc2VlIOKAkyBJbnRlcnNlY3Rpb24gSGlzdG9yeS5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDE1LTAyLTI2IFtpb3NdIFRyYWlsc2VlIOKAkyBJbnRlcnNlY3Rpb24gSGlzdG9yeS5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBQcmV2aWV3IENvbXBvbmVudFxuQXNzZXRzID0gcmVxdWlyZSBcIlByZXZpZXdDb21wb25lbnRBc3NldHNcIlxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxubG9jYWxDb2xvcnMgPVxuXHRiZ19jb2xvcl9vbkxpZ2h0OiBcIiNlZWVcIlxuXHRiZ19jb2xvcl9vbkRhcms6IFwiIzIyMlwiXG5cdGNvbnRlbnRfY29sb3Jfb25MaWdodDogXCIjMDAwXCJcblx0Y29udGVudF9jb2xvcl9vbkRhcms6IFwiI0ZGRlwiXG5cbnRoZW1lID1cblx0YmdfY29sb3I6IGxvY2FsQ29sb3JzLmJnX2NvbG9yX29uRGFya1xuXHRjb250ZW50X2NvbG9yOiBsb2NhbENvbG9ycy5jb250ZW50X2NvbG9yX29uRGFya1xuXG5cbiMgTG9nb1xuXG5jbGFzcyBMb2dvTGF5ZXIgZXh0ZW5kcyBTVkdMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdHN2ZzogZ2V0TG9nbyhsb2NhbENvbG9ycy5jb250ZW50X2NvbG9yX29uRGFyaylcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXG5cblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuXG4jIE5hdGl2ZVxuXG5gd2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGZ1bmN0aW9uIChsYXllcikge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBsYXllclxufVxuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlTm9ybWFsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVOb3JtYWxcIiwgcmVjZWl2ZU1lc3NhZ2VOb3JtYWwsIGZhbHNlKTtcbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zb2xlLmxvZyhldmVudClcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvRmlsbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVGaWxsXCIsIHJlY2VpdmVNZXNzYWdlLCBmYWxzZSk7XG5gXG5cblxuXG4jIFByZXZpZXdcblxuIyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlldyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogXCIyMDoxNVwiXG5cdFx0XHRuYW1lOiBcIlByZXZpZXdcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlXG5cdFx0XHRcblx0XHRcdHZpc2libGU6IHRydWVcblx0XHRcdHRvcFRoZW1lOiBcImRhcmtcIlxuXHRcdFx0Ym90dG9tVGhlbWU6IFwiZGFya1wiXG5cdFx0XHRhc3NldHM6IEFzc2V0cy5kYXRhXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHR3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0KEApXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cdFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAndG9wVGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudG9wVGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudG9wVGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYm90dG9tVGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm90dG9tVGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYm90dG9tVGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYXNzZXRzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0c1xuIyBcdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dCYXIgPSB2YWx1ZVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJub3JtYWxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwiZmlsbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXHRcblx0XG5cdFxuXHRcblx0Z2V0TG9jYXRpb25EYXRhOiAoKSA9PlxuXHRcdHF1ZXJ5QXJyYXkgPSBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cblx0XHRmb3IgaXRlbSBpbiBxdWVyeUFycmF5XG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJzY2FsZVwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcImZpbGxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0XHRcdGVsc2UgaWYgdmFsdWVQYXJ0ID09IFwibm9ybWFsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cdFx0XHRcblx0XG5cdFxuXHRzZXREZXNrdG9wU2NhbGVNb2RlOiAoZm9yU3RhdGUgPSBcIm5vcm1hbFwiKSA9PlxuXHRcdHNjYWxlWCA9IChDYW52YXMud2lkdGggLSAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKENhbnZhcy5oZWlnaHQgLSAxMTIpIC8gQGhlaWdodFxuXHRcdEBzdGF0ZXMuZmlsbC5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdGluaXRTdGF0ZSA9IGZvclN0YXRlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBpbml0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0XHRlbHNlIGluaXRTdGF0ZSA9IFwibm9ybWFsXCJcblx0XHRcblx0XHRzaG91bGRTaG93QnV0dG9uID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImJ1dHRvblwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0J1dHRvbiA9IGZhbHNlXG5cdFx0XG5cdFx0c2hvdWxkU2hvd0xvZ28gPSB0cnVlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwibG9nb1wiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0xvZ28gPSBmYWxzZVxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oaW5pdFN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oaW5pdFN0YXRlKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgdGhlbiByZXR1cm5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcblx0XG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXHRcblx0XG5cblx0XG5cdFxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmdfY29sb3Jcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb250ZW50X2NvbG9yLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcCgtMjApXG5cdFx0QG9yaWdpblkgPSAwXG5cdFx0XG5cdFx0c0ggPSAoU2NyZWVuLmhlaWdodCArIDQwKSAvIEBoZWlnaHRcblx0XHRAc2NhbGUgPSBNYXRoLm1pbihTY3JlZW4ud2lkdGggLyBAd2lkdGgsIHNIKVxuXHRcblx0XG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKHRlbXApID0+XG5cdFx0dGVtcC5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhciBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdGVtcCwgd2lkdGg6IHRlbXAud2lkdGggLSAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoNilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5jZW50ZXIoMSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGJvdHRvbVRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0XG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FEQ0EsT0FBTyxDQUFDLElBQVIsR0FDQztFQUFBLEtBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsS0FBQSxFQUFPLE1BRFA7R0FERDtFQUdBLG1CQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0seURBQU47SUFDQSxLQUFBLEVBQU8sMERBRFA7R0FKRDtFQU1BLHFCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sMkRBQU47SUFDQSxLQUFBLEVBQU8sNERBRFA7R0FQRDtFQVNBLHNCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sNERBQU47SUFDQSxLQUFBLEVBQU8sNkRBRFA7R0FWRDtFQVlBLDBCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sZ0VBQU47SUFDQSxLQUFBLEVBQU8saUVBRFA7R0FiRDtFQWdCQSxLQUFBLEVBQU8sb0RBaEJQOzs7OztBRERELElBQUEsOENBQUE7RUFBQTs7OztBQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsd0JBQVI7O0FBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcEIsQ0FBQTs7QUFFQSxXQUFBLEdBQ0M7RUFBQSxnQkFBQSxFQUFrQixNQUFsQjtFQUNBLGVBQUEsRUFBaUIsTUFEakI7RUFFQSxxQkFBQSxFQUF1QixNQUZ2QjtFQUdBLG9CQUFBLEVBQXNCLE1BSHRCOzs7QUFLRCxLQUFBLEdBQ0M7RUFBQSxRQUFBLEVBQVUsV0FBVyxDQUFDLGVBQXRCO0VBQ0EsYUFBQSxFQUFlLFdBQVcs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
