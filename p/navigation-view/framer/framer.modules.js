require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PCSVG":[function(require,module,exports){
var color_onDark, color_onLight, getFullscreen, getLogo, getNext, getPrev;

color_onDark = "#fff";

color_onLight = "#000";

getLogo = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"76\" height=\"32\" viewBox=\"0 0 76 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M2.79199 21.6C2.79199 21.168 2.90399 20.408 3.12799 19.32L4.39999 12.84H2.98399L3.07999 12.12C4.99999 11.544 6.88799 10.552 8.74399 9.14398H9.89599L9.31999 11.76H11.192L10.976 12.84H9.12799L7.90399 19.32C7.69599 20.312 7.59199 20.976 7.59199 21.312C7.59199 22.08 7.92799 22.544 8.59999 22.704C8.43999 23.248 8.07199 23.68 7.49599 24C6.91999 24.32 6.22399 24.48 5.40799 24.48C4.59199 24.48 3.95199 24.224 3.48799 23.712C3.02399 23.2 2.79199 22.496 2.79199 21.6Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M17.5599 22.68C17.0639 23.88 16.0239 24.48 14.4399 24.48C13.6239 24.48 12.9599 24.2 12.4479 23.64C12.0159 23.144 11.7999 22.648 11.7999 22.152C11.7999 20.856 12.0959 18.944 12.6879 16.416L13.5759 11.76L18.4479 11.28L16.9839 18.864C16.7119 20.048 16.5759 20.848 16.5759 21.264C16.5759 22.176 16.9039 22.648 17.5599 22.68ZM14.0079 8.42398C14.0079 7.79998 14.2639 7.31998 14.7759 6.98398C15.3039 6.64798 15.9439 6.47998 16.6959 6.47998C17.4479 6.47998 18.0479 6.64798 18.4959 6.98398C18.9599 7.31998 19.1919 7.79998 19.1919 8.42398C19.1919 9.04798 18.9359 9.51998 18.4239 9.83998C17.9279 10.16 17.3039 10.32 16.5519 10.32C15.7999 10.32 15.1839 10.16 14.7039 9.83998C14.2399 9.51998 14.0079 9.04798 14.0079 8.42398Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M26.0606 22.68C25.5646 23.88 24.5246 24.48 22.9406 24.48C22.1406 24.48 21.4846 24.2 20.9726 23.64C20.5566 23.176 20.3486 22.68 20.3486 22.152C20.3486 20.952 20.6286 19.04 21.1886 16.416L22.9406 7.19998L27.8126 6.71998L25.4846 18.864C25.2126 20.048 25.0766 20.848 25.0766 21.264C25.0766 22.176 25.4046 22.648 26.0606 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M34.5618 22.68C34.0658 23.88 33.0258 24.48 31.4418 24.48C30.6418 24.48 29.9858 24.2 29.4738 23.64C29.0578 23.176 28.8498 22.68 28.8498 22.152C28.8498 20.952 29.1298 19.04 29.6898 16.416L31.4418 7.19998L36.3138 6.71998L33.9858 18.864C33.7138 20.048 33.5778 20.848 33.5778 21.264C33.5778 22.176 33.9058 22.648 34.5618 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M43.0631 22.68C42.5671 23.88 41.5271 24.48 39.9431 24.48C39.1431 24.48 38.4871 24.2 37.9751 23.64C37.5591 23.176 37.3511 22.68 37.3511 22.152C37.3511 20.952 37.6311 19.04 38.1911 16.416L39.9431 7.19998L44.8151 6.71998L42.4871 18.864C42.2151 20.048 42.0791 20.848 42.0791 21.264C42.0791 22.176 42.4071 22.648 43.0631 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M53.5323 22.992C52.7643 23.984 51.4283 24.48 49.5243 24.48C48.5323 24.48 47.6763 24.184 46.9563 23.592C46.2363 22.984 45.8763 22.248 45.8763 21.384C45.8763 20.904 45.9003 20.544 45.9483 20.304L47.5563 11.76L52.4283 11.28L50.6763 20.544C50.6123 20.896 50.5803 21.176 50.5803 21.384C50.5803 22.312 50.8603 22.776 51.4203 22.776C52.0443 22.776 52.5803 22.352 53.0283 21.504C53.1723 21.232 53.2763 20.92 53.3403 20.568L55.0443 11.76L59.7723 11.28L57.9963 20.64C57.9483 20.88 57.9243 21.128 57.9243 21.384C57.9243 21.64 57.9963 21.912 58.1403 22.2C58.2843 22.472 58.5883 22.64 59.0523 22.704C58.9563 23.088 58.7403 23.408 58.4043 23.664C57.7003 24.208 56.9643 24.48 56.1963 24.48C55.4443 24.48 54.8443 24.344 54.3963 24.072C53.9483 23.8 53.6603 23.44 53.5323 22.992Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M69.2947 17.256C69.8707 16.232 70.1587 15.2 70.1587 14.16C70.1587 13.472 69.9107 13.128 69.4147 13.128C69.0307 13.128 68.6387 13.456 68.2387 14.112C67.8227 14.768 67.5507 15.52 67.4227 16.368L66.1747 24L61.2067 24.48L63.6547 11.76L67.6147 11.28L67.1827 13.704C67.9667 12.088 69.2387 11.28 70.9987 11.28C71.9267 11.28 72.6387 11.52 73.1347 12C73.6467 12.48 73.9027 13.216 73.9027 14.208C73.9027 15.184 73.5747 15.984 72.9187 16.608C72.2787 17.232 71.4067 17.544 70.3027 17.544C69.8227 17.544 69.4867 17.448 69.2947 17.256Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};

exports.logoIcon = {
  onDark: getLogo(color_onDark),
  onLight: getLogo(color_onLight)
};

getFullscreen = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M11.041 2.92164C11.041 3.44473 11.4225 3.83498 11.9533 3.83498H12.5423L15.1135 3.66061L13.098 5.57862L10.7092 7.9533C10.5267 8.12766 10.4438 8.35184 10.4438 8.59263C10.4438 9.15724 10.8253 9.56409 11.3893 9.56409C11.6464 9.56409 11.8704 9.46445 12.0529 9.29009L14.4334 6.90711L16.3411 4.88116L16.1669 7.47172V8.11936C16.1669 8.64245 16.5485 9.041 17.0793 9.041C17.6102 9.041 18 8.65075 18 8.11936V3.51116C18 2.55631 17.4443 2 16.4904 2L11.9533 2C11.4308 2 11.041 2.39024 11.041 2.92164ZM2 11.8806L2 16.4888C2 17.4437 2.55573 18 3.50959 18H8.04666C8.56921 18 8.95905 17.6015 8.95905 17.0784C8.95905 16.5553 8.5775 16.165 8.04666 16.165H7.45775L4.88647 16.3394L6.90202 14.4214L9.29082 12.0467C9.4733 11.8723 9.55625 11.6482 9.55625 11.3991C9.55625 10.8345 9.1747 10.4276 8.61068 10.4276C8.35355 10.4276 8.12131 10.5272 7.94712 10.7099L5.56662 13.0929L3.65889 15.1188L3.83307 12.5283L3.83307 11.8806C3.83307 11.3492 3.45153 10.959 2.92068 10.959C2.38984 10.959 2 11.3492 2 11.8806Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};

exports.fullscreenIcon = {
  onDark: getFullscreen(color_onDark),
  onLight: getFullscreen(color_onLight)
};

getNext = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M4.7964 12.7931L9.58627 8L4.7964 3.20687C4.40601 2.81621 4.40622 2.18304 4.79688 1.79265C5.18754 1.40226 5.8207 1.40248 6.21109 1.79313L11.7073 7.29313C12.0975 7.6836 12.0975 8.3164 11.7073 8.70687L6.21109 14.2069C5.8207 14.5975 5.18754 14.5977 4.79688 14.2073C4.40622 13.817 4.40601 13.1838 4.7964 12.7931Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};

exports.nextIcon = {
  onDark: getNext(color_onDark),
  onLight: getNext(color_onLight)
};

getPrev = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.41748 8L11.2073 12.7931C11.5977 13.1838 11.5975 13.817 11.2069 14.2073C10.8162 14.5977 10.183 14.5975 9.79265 14.2069L4.2964 8.70687C3.9062 8.3164 3.9062 7.6836 4.2964 7.29313L9.79265 1.79313C10.183 1.40248 10.8162 1.40226 11.2069 1.79265C11.5975 2.18304 11.5977 2.81621 11.2073 3.20687L6.41748 8Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};

exports.prevIcon = {
  onDark: getPrev(color_onDark),
  onLight: getPrev(color_onLight)
};


},{}],"PresentationComponent":[function(require,module,exports){
var PCButton, PCCopyButton, PCSVGButton, PCSlideChanger, PCText, SVG, ScreenSlide, Slide, fontAveria,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SVG = require("PCSVG");

exports.Presentation = (function(superClass) {
  extend(Presentation, superClass);

  function Presentation(options) {
    var i, item, len, ref;
    this.options = options != null ? options : {};
    this.openURLHome = bind(this.openURLHome, this);
    this.openURL = bind(this.openURL, this);
    this.withImages = bind(this.withImages, this);
    this.updateSize = bind(this.updateSize, this);
    this.initSizeChange = bind(this.initSizeChange, this);
    this.initPageChange = bind(this.initPageChange, this);
    this.initGeneral = bind(this.initGeneral, this);
    this.restartHandler = bind(this.restartHandler, this);
    this.changeScale = bind(this.changeScale, this);
    this.initScale = bind(this.initScale, this);
    this.initShortcuts = bind(this.initShortcuts, this);
    this.gap = 56;
    this._theme = "";
    this.canvas = new Layer({
      width: Screen.width,
      height: Screen.height,
      name: "canvas"
    });
    this.canvas.states = {
      "window": {
        backgroundColor: "#000"
      },
      "fullscreen": {
        backgroundColor: "#222"
      }
    };
    this.topView = new Layer({
      width: Screen.width,
      height: this.gap,
      name: "topView"
    });
    this.bottomView = new Layer({
      width: Screen.width,
      height: this.gap,
      name: "bottomView",
      y: Align.bottom
    });
    _.defaults(this.options, {
      parent: this.canvas,
      width: 1400 * 2,
      height: 900 * 2,
      scrollVertical: false,
      scrollHorizontal: true,
      title: "",
      gap: this.gap * 2
    });
    Presentation.__super__.constructor.call(this, this.options);
    ref = [this.topView, this.bottomView];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.parent = this.parent;
      item.sendToBack();
      item.backgroundColor = null;
      item.states = {
        "window": {
          opacity: 1
        },
        "fullscreen": {
          opacity: 0
        }
      };
    }
    this.states = {
      "window": {
        scale: 1
      },
      "fullscreen": {
        scale: 1
      }
    };
    this.initGeneral();
    this.initPageChange();
    this.initSizeChange();
    this.initScale();
    this.initShortcuts();
    this.logoButton = new PCSVGButton({
      parent: this.topView,
      name: "logo",
      x: Align.left(32),
      y: Align.center,
      width: 76,
      height: 32,
      asset: SVG.logoIcon,
      handler: this.openURLHome
    });
    this.titleText = new PCText({
      parent: this.topView,
      name: "title",
      text: this.title,
      textAlign: "center",
      x: Align.center,
      y: Align.center,
      width: this.topView.width / 2
    });
    this.copyButton = new PCCopyButton({
      parent: this.topView,
      name: "copy link",
      text: "Copy Link",
      textAlign: "right",
      x: Align.right(-32 - 20 - 24),
      y: Align.center,
      width: this.bottomView.width / 4,
      custom: {
        x: -32 - 20 - 24
      }
    });
    this.fullscreenButton = new PCSVGButton({
      parent: this.topView,
      name: "fullscreen",
      x: Align.right(-32),
      y: Align.center,
      width: 20,
      height: 20,
      asset: SVG.fullscreenIcon,
      handler: this.changeScale,
      custom: {
        x: -32
      }
    });
    this.slideChangerView = new PCSlideChanger({
      parent: this.bottomView,
      name: "slide changer",
      x: Align.center
    });
    this.restartButton = new PCButton({
      parent: this.bottomView,
      name: "restart",
      text: "Restart (R)",
      textAlign: "right",
      x: Align.right(-2000),
      y: Align.center,
      width: this.bottomView.width / 4,
      handler: this.restartHandler,
      custom: {
        x: -2000
      }
    });
  }

  Presentation.define('title', {
    get: function() {
      return this.options.title;
    },
    set: function(value) {
      return this.options.title = value;
    }
  });

  Presentation.define('gap', {
    get: function() {
      return this.options.gap;
    },
    set: function(value) {
      return this.options.gap = value;
    }
  });

  Presentation.define('_theme', {
    get: function() {
      return this.options._theme;
    },
    set: function(value) {
      return this.options._theme = value;
    }
  });

  Presentation.prototype.initShortcuts = function() {
    var localScroll;
    localScroll = this;
    print(Screen.width);
    print(Canvas.width);
    return Events.wrap(window).addEventListener("keydown", function(event) {
      if (event.code === "ArrowLeft") {
        return localScroll.snapToNextPage("left", false);
      } else if (event.code === "ArrowRight") {
        return localScroll.snapToNextPage("right", false);
      } else if (event.code === "KeyC") {
        return localScroll.copyButton.emit(Events.Tap);
      } else if (event.code === "KeyF") {
        return localScroll.fullscreenButton.emit(Events.Tap);
      } else if (event.code === "KeyR") {
        return localScroll.restartButton.emit(Events.Tap);
      } else if (event.code === "Escape") {
        if (localScroll.states.current.name === "fullscreen") {
          return localScroll.fullscreenButton.emit(Events.Tap);
        }
      }
    });
  };

  Presentation.prototype.initScale = function(forState) {
    var scaleX, scaleY, slideGap;
    if (forState == null) {
      forState = "window";
    }
    slideGap = 120;
    scaleX = (Screen.width - slideGap / 6) / this.width;
    scaleY = (Screen.height - slideGap) / this.height;
    this.states.window.scale = Math.min(scaleX, scaleY);
    scaleX = Screen.width / this.width;
    scaleY = Screen.height / this.height;
    this.states.fullscreen.scale = Math.min(scaleX, scaleY);
    this.stateSwitch(forState);
    this.canvas.stateSwitch(forState);
    return this.center();
  };

  Presentation.prototype.changeScale = function() {
    var nextState;
    if (this.states.current.name === "window") {
      nextState = "fullscreen";
    } else {
      nextState = "window";
    }
    this.animate(nextState, {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
    this.canvas.animate(nextState, {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
    this.topView.animate(nextState, {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
    return this.bottomView.animate(nextState, {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  Presentation.prototype.restartHandler = function() {
    return this.snapToPage(this.content.children[0], false);
  };

  Presentation.prototype.initGeneral = function() {
    var local;
    Framer.Extras.Preloader.disable();
    Framer.Extras.Hints.disable();
    document.body.style.cursor = "auto";
    local = this;
    
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
		if (prefersDarkScheme.matches) { local._theme = "dark" }
		else { local._theme = "light" }
		;
    return local._theme;
  };

  Presentation.prototype.initPageChange = function() {
    this.on("change:currentPage", function() {
      var i, index, item, len, ref;
      ref = this.content.children;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        item = ref[index];
        if (item === this.currentPage) {
          this.slideChangerView.current = index + 1;
          return;
        }
      }
    });
    return this.content.on("change:children", function() {
      return this.parent.slideChangerView.pages = this.children.length;
    });
  };

  Presentation.prototype.initSizeChange = function() {
    var local;
    local = this;
    return Screen.on("change:width", (function(_this) {
      return function() {
        return local.updateSize(Screen);
      };
    })(this));
  };

  Presentation.prototype.updateSize = function(anchor) {
    this.parent.width = anchor.width;
    this.topView.width = anchor.width;
    this.titleText.x = Align.center;
    this.copyButton.x = Align.right(this.copyButton.custom.x);
    this.fullscreenButton.x = Align.right(this.fullscreenButton.custom.x);
    this.bottomView.width = anchor.width;
    this.slideChangerView.x = Align.center;
    this.parent.height = anchor.height;
    this.bottomView.y = Align.bottom;
    return this.initScale(this.states.current.name);
  };

  Presentation.prototype.withImages = function(images, named) {
    if (named == null) {
      named = "";
    }
    return new ScreenSlide({
      images: images,
      descriptions: [],
      title: named,
      parent: this.content,
      x: this.content.children.length * (this.width + this.gap)
    });
  };

  Presentation.prototype.openURL = function(url, isBlank) {
    if (url == null) {
      url = "https://tilllur.ru";
    }
    if (isBlank == null) {
      isBlank = false;
    }
    if (isBlank) {
      return window.open(url, '_blank');
    } else {
      return window.location = url;
    }
  };

  Presentation.prototype.openURLHome = function() {
    return this.openURL("https://tilllur.ru", true);
  };

  return Presentation;

})(PageComponent);

Slide = (function(superClass) {
  extend(Slide, superClass);

  function Slide(options) {
    this.options = options != null ? options : {};
    this.named = bind(this.named, this);
    _.defaults(this.options, {
      backgroundColor: "#222",
      width: 1400 * 2,
      height: 900 * 2,
      borderRadius: 16 * 2,
      title: ""
    });
    Slide.__super__.constructor.call(this, this.options);
    this.name = "slide " + this.parent.children.length;
  }

  Slide.define('title', {
    get: function() {
      return this.options.title;
    },
    set: function(value) {
      return this.options.title = value;
    }
  });

  Slide.prototype.named = function(title) {
    this.title = title;
    return this;
  };

  return Slide;

})(Layer);

fontAveria = Utils.loadWebFont("Nunito", 800);

PCText = (function(superClass) {
  extend(PCText, superClass);

  function PCText(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      fontFamily: fontAveria,
      fontSize: 18,
      color: "white",
      height: 20,
      letterSpacing: 0.7,
      letterSpacing: 0.2,
      textOverflow: "ellipsis"
    });
    PCText.__super__.constructor.call(this, this.options);
  }

  return PCText;

})(TextLayer);

PCButton = (function(superClass) {
  extend(PCButton, superClass);

  function PCButton(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      opacity: 0.5,
      handler: null
    });
    PCButton.__super__.constructor.call(this, this.options);
    this.style = {
      cursor: "pointer"
    };
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
  }

  PCButton.prototype.Hover = function() {
    return this.opacity = 0.8;
  };

  PCButton.prototype.HoverOff = function() {
    return this.opacity = 0.5;
  };

  PCButton.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  return PCButton;

})(PCText);

PCSVGButton = (function(superClass) {
  extend(PCSVGButton, superClass);

  function PCSVGButton(options) {
    this.options = options != null ? options : {};
    this.updateSVGSize = bind(this.updateSVGSize, this);
    _.defaults(this.options, {
      text: "",
      asset: null,
      clip: false,
      autoSize: false
    });
    this.svgShape = new SVGLayer({
      backgroundColor: "null",
      name: "svgShape"
    });
    PCSVGButton.__super__.constructor.call(this, this.options);
    this.svgShape.parent = this;
    this.updateSVGSize();
  }

  PCSVGButton.define('asset', {
    get: function() {
      return this.options.asset;
    },
    set: function(value) {
      this.options.asset = value;
      this.svgShape.states = {
        "onDark": {
          svg: value.onDark
        },
        "onLight": {
          svg: value.onLight
        }
      };
      return this.svgShape.stateSwitch("onDark");
    }
  });

  PCSVGButton.prototype.updateSVGSize = function() {
    this.svgShape.width = this.width;
    return this.svgShape.height = this.height;
  };

  return PCSVGButton;

})(PCButton);

PCCopyButton = (function(superClass) {
  extend(PCCopyButton, superClass);

  function PCCopyButton(options) {
    this.options = options != null ? options : {};
    this.copyHandler = bind(this.copyHandler, this);
    this.update = bind(this.update, this);
    _.defaults(this.options, {
      link: "https://tilllur.ru",
      handler: this.copyHandler
    });
    this.area = new Layer({
      opacity: 0,
      x: -3000,
      html: null
    });
    PCCopyButton.__super__.constructor.call(this, this.options);
    this.area.parent = this;
  }

  PCCopyButton.define('link', {
    get: function() {
      return this.options.link;
    },
    set: function(value) {
      this.options.link = value;
      return this.update(value);
    }
  });

  PCCopyButton.prototype.update = function(link) {
    return this.area.html = "<textarea class='js-copytextarea-class' style='opacity:0;'>" + link + "</textarea>";
  };

  PCCopyButton.prototype.copyHandler = function() {
    var originTitle, textDiv;
    textDiv = this.area.querySelector('.js-copytextarea-class');
    textDiv.focus();
    textDiv.select();
    document.execCommand('copy');
    originTitle = this.text;
    this.text = "Done 👌";
    return Utils.delay(1, (function(_this) {
      return function() {
        return _this.text = originTitle;
      };
    })(this));
  };

  return PCCopyButton;

})(PCButton);

PCSlideChanger = (function(superClass) {
  extend(PCSlideChanger, superClass);

  function PCSlideChanger(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      name: "progress view",
      backgroundColor: null,
      width: 120,
      height: 56,
      pages: 1,
      current: 1
    });
    this.currentText = new PCText({
      textAlign: "center",
      width: 120,
      letterSpacing: 3
    });
    this.prevButton = new PCSVGButton({
      name: "prev",
      width: 16,
      height: 16,
      asset: SVG.prevIcon
    });
    this.nextButton = new PCSVGButton({
      name: "next",
      width: 16,
      height: 16,
      asset: SVG.nextIcon
    });
    PCSlideChanger.__super__.constructor.call(this, this.options);
    this.currentText.parent = this;
    this.currentText.y = Align.center(-1);
    this.currentText.style = {
      "font-feature-settings": "tnum",
      "font-variant-numeric": "tabular-nums lining-nums"
    };
    this.prevButton.parent = this;
    this.prevButton.x = Align.left;
    this.prevButton.y = Align.center;
    this.nextButton.parent = this;
    this.nextButton.x = Align.right;
    this.nextButton.y = Align.center;
  }

  PCSlideChanger.define('pages', {
    get: function() {
      return this.options.pages;
    },
    set: function(value) {
      this.options.pages = value;
      return this.currentText.text = this.current + "/" + this.pages;
    }
  });

  PCSlideChanger.define('current', {
    get: function() {
      return this.options.current;
    },
    set: function(value) {
      this.options.current = value;
      return this.currentText.text = this.current + "/" + this.pages;
    }
  });

  return PCSlideChanger;

})(Layer);

ScreenSlide = (function(superClass) {
  extend(ScreenSlide, superClass);

  function ScreenSlide(options) {
    this.options = options != null ? options : {};
    this.update = bind(this.update, this);
    _.defaults(this.options, {
      images: [],
      descriptions: [],
      imageSize: {
        width: 375 * 2,
        height: 812 * 2,
        gap: 60 * 2
      }
    });
    this.screenView = new Layer({
      name: "screens",
      backgroundColor: "null"
    });
    ScreenSlide.__super__.constructor.call(this, this.options);
    this.screenView.parent = this;
    this.update();
  }

  ScreenSlide.define('images', {
    get: function() {
      return this.options.images;
    },
    set: function(value) {
      return this.options.images = value;
    }
  });

  ScreenSlide.define('descriptions', {
    get: function() {
      return this.options.descriptions;
    },
    set: function(value) {
      return this.options.descriptions = value;
    }
  });

  ScreenSlide.define('imageSize', {
    get: function() {
      return this.options.imageSize;
    }
  });

  ScreenSlide.prototype.update = function() {
    var i, image, len, ref;
    ref = this.images;
    for (i = 0, len = ref.length; i < len; i++) {
      image = ref[i];
      new Layer({
        name: "" + (image.split("/").pop()),
        parent: this.screenView,
        width: this.imageSize.width,
        height: this.imageSize.height,
        borderRadius: 42,
        image: image,
        x: this.screenView.children.length * (this.imageSize.width + this.imageSize.gap)
      });
    }
    this.screenView.width = this.screenView.children.length * (this.imageSize.width + this.imageSize.gap) - this.imageSize.gap;
    this.screenView.height = this.imageSize.height;
    return this.screenView.center();
  };

  return ScreenSlide;

})(Slide);


},{"PCSVG":"PCSVG"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9QcmVzZW50YXRpb25Db21wb25lbnQvUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMTkgW3ByZXNlbnRhdGlvbl0gTmF2aWdhdGlvbiBWaWV3IOKAlCBEZW1vLmZyYW1lci9tb2R1bGVzL1ByZXNlbnRhdGlvbkNvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJlc2VudGF0aW9uQ29tcG9uZW50L1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTE5IFtwcmVzZW50YXRpb25dIE5hdmlnYXRpb24gVmlldyDigJQgRGVtby5mcmFtZXIvbW9kdWxlcy9QQ1NWRy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgUHJlc2VudGF0aW9uIENvbXBvbmVudFxuXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5cbiMgUHJlc2VudGF0aW9uXG5cbmNsYXNzIGV4cG9ydHMuUHJlc2VudGF0aW9uIGV4dGVuZHMgUGFnZUNvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBnYXAgPSA1NlxuXHRcdEBfdGhlbWUgPSBcIlwiXG5cdFx0XG5cdFx0QGNhbnZhcyA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aCwgaGVpZ2h0OiBTY3JlZW4uaGVpZ2h0LCBuYW1lOiBcImNhbnZhc1wiXG5cdFx0QGNhbnZhcy5zdGF0ZXMgPVxuXHRcdFx0XCJ3aW5kb3dcIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCIgfVxuXHRcdFxuXHRcdEB0b3BWaWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IEBnYXAsIG5hbWU6IFwidG9wVmlld1wiXG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGgsIGhlaWdodDogQGdhcCwgbmFtZTogXCJib3R0b21WaWV3XCIsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEBjYW52YXNcblx0XHRcdHdpZHRoOiAxNDAwICogMlxuXHRcdFx0aGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IHRydWVcbiMgXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdFxuXHRcdFx0dGl0bGU6IFwiXCJcblx0XHRcdGdhcDogQGdhcCAqIDJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdGZvciBpdGVtIGluIFtAdG9wVmlldywgQGJvdHRvbVZpZXddXG5cdFx0XHRpdGVtLnBhcmVudCA9IEBwYXJlbnRcblx0XHRcdGl0ZW0uc2VuZFRvQmFjaygpXG5cdFx0XHRpdGVtLmJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHRcdGl0ZW0uc3RhdGVzID1cblx0XHRcdFx0XCJ3aW5kb3dcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIndpbmRvd1wiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRAaW5pdEdlbmVyYWwoKVxuXHRcdEBpbml0UGFnZUNoYW5nZSgpXG5cdFx0QGluaXRTaXplQ2hhbmdlKClcblx0XHRAaW5pdFNjYWxlKClcblx0XHRAaW5pdFNob3J0Y3V0cygpXG5cdFx0XG5cdFx0XG5cdFx0IyBUb3AgVmlld1xuXHRcdEBsb2dvQnV0dG9uID0gbmV3IFBDU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImxvZ29cIlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyLCBhc3NldDogU1ZHLmxvZ29JY29uXG5cdFx0XHRoYW5kbGVyOiBAb3BlblVSTEhvbWVcblx0XHRcblx0XHRAdGl0bGVUZXh0ID0gbmV3IFBDVGV4dFxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJ0aXRsZVwiXG5cdFx0XHR0ZXh0OiBAdGl0bGUsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIsIHdpZHRoOiBAdG9wVmlldy53aWR0aCAvIDJcblx0XHRcblx0XHRAY29weUJ1dHRvbiA9IG5ldyBQQ0NvcHlCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiY29weSBsaW5rXCJcblx0XHRcdHRleHQ6IFwiQ29weSBMaW5rXCIsIHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzItMjAtMjQpLCB5OiBBbGlnbi5jZW50ZXIsIHdpZHRoOiBAYm90dG9tVmlldy53aWR0aCAvIDRcblx0XHRcdGN1c3RvbTogeyB4OiAtMzItMjAtMjQgfVxuXHRcdFxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uID0gbmV3IFBDU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImZ1bGxzY3JlZW5cIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMjAsIGhlaWdodDogMjAsIGFzc2V0OiBTVkcuZnVsbHNjcmVlbkljb25cblx0XHRcdGhhbmRsZXI6IEBjaGFuZ2VTY2FsZVxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0zMiB9XG5cdFx0XG5cdFx0IyBCb3R0b20gVmlld1xuXHRcdEBzbGlkZUNoYW5nZXJWaWV3ID0gbmV3IFBDU2xpZGVDaGFuZ2VyXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInNsaWRlIGNoYW5nZXJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0QHJlc3RhcnRCdXR0b24gPSBuZXcgUENCdXR0b25cblx0XHRcdHBhcmVudDogQGJvdHRvbVZpZXcsIG5hbWU6IFwicmVzdGFydFwiXG5cdFx0XHR0ZXh0OiBcIlJlc3RhcnQgKFIpXCIsIHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMjAwMCksIHk6IEFsaWduLmNlbnRlciwgd2lkdGg6IEBib3R0b21WaWV3LndpZHRoIC8gNFxuXHRcdFx0aGFuZGxlcjogQHJlc3RhcnRIYW5kbGVyXG5cdFx0XHRjdXN0b206IHsgeDogLTIwMDAgfVxuXHRcdFxuXHRcdFxuXHRcblx0XG5cdEBkZWZpbmUgJ3RpdGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dhcCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5nYXBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ2FwID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ190aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5fdGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuX3RoZW1lID0gdmFsdWVcblx0XG5cdFxuXHRcblx0aW5pdFNob3J0Y3V0czogKCkgPT5cblx0XHRsb2NhbFNjcm9sbCA9IEBcblx0XHRwcmludCBTY3JlZW4ud2lkdGhcblx0XHRwcmludCBDYW52YXMud2lkdGhcblx0XHRcblx0XHRFdmVudHMud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cblx0XHRcdGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd0xlZnRcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5zbmFwVG9OZXh0UGFnZShcImxlZnRcIiwgZmFsc2UpXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd1JpZ2h0XCJcblx0XHRcdFx0bG9jYWxTY3JvbGwuc25hcFRvTmV4dFBhZ2UoXCJyaWdodFwiLCBmYWxzZSlcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUNcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5jb3B5QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5RlwiXG5cdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlSXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwucmVzdGFydEJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIkVzY2FwZVwiXG5cdFx0XHRcdGlmIGxvY2FsU2Nyb2xsLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcblx0XG5cdGluaXRTY2FsZTogKGZvclN0YXRlID0gXCJ3aW5kb3dcIikgPT5cblx0XHRzbGlkZUdhcCA9IDEyMFxuXHRcdFxuXHRcdHNjYWxlWCA9IChTY3JlZW4ud2lkdGggLSBzbGlkZUdhcCAvIDYpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSBzbGlkZUdhcCkgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlcy53aW5kb3cuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XHRcblx0XHRzY2FsZVggPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRzY2FsZVkgPSBTY3JlZW4uaGVpZ2h0IC8gQGhlaWdodFxuXHRcdEBzdGF0ZXMuZnVsbHNjcmVlbi5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdEBzdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRAY2FudmFzLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdEBjZW50ZXIoKVxuXHRcblx0XG5cdFxuXHRcblx0Y2hhbmdlU2NhbGU6ICgpID0+XG5cdFx0XG5cdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJ3aW5kb3dcIiB0aGVuIG5leHRTdGF0ZSA9IFwiZnVsbHNjcmVlblwiXG5cdFx0ZWxzZSBuZXh0U3RhdGUgPSBcIndpbmRvd1wiXG5cdFx0XG5cdFx0QGFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGNhbnZhcy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEB0b3BWaWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGJvdHRvbVZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cblx0cmVzdGFydEhhbmRsZXI6ICgpID0+XG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bMF0sIGZhbHNlKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRpbml0R2VuZXJhbDogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5kaXNhYmxlKClcblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblx0XHRcblx0XHRsb2NhbCA9IEBcblx0XHRgXG5cdFx0Y29uc3QgcHJlZmVyc0RhcmtTY2hlbWUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpO1xuXHRcdGlmIChwcmVmZXJzRGFya1NjaGVtZS5tYXRjaGVzKSB7IGxvY2FsLl90aGVtZSA9IFwiZGFya1wiIH1cblx0XHRlbHNlIHsgbG9jYWwuX3RoZW1lID0gXCJsaWdodFwiIH1cblx0XHRgXG5cdFx0bG9jYWwuX3RoZW1lXG5cdFx0XG5cdFxuXHRpbml0UGFnZUNoYW5nZTogKCkgPT5cblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgLT5cblx0XHRcdGZvciBpdGVtLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRcdEBzbGlkZUNoYW5nZXJWaWV3LmN1cnJlbnQgPSAoaW5kZXggKyAxKVxuXHRcdFx0XHRcdHJldHVyblxuIyBcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShAY3VycmVudFBhZ2UubmFtZSwgXCIje0BjdXJyZW50UGFnZS5uYW1lfVwiLCBcIj9wYWdlPTFcIilcbiMgXHRcdFx0cHJpbnQgQGN1cnJlbnRQYWdlXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdEBwYXJlbnQuc2xpZGVDaGFuZ2VyVmlldy5wYWdlcyA9IEBjaGlsZHJlbi5sZW5ndGhcblx0XG5cdFxuXHRpbml0U2l6ZUNoYW5nZTogKCkgPT5cblx0XHRsb2NhbCA9IEBcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsLnVwZGF0ZVNpemUoU2NyZWVuKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHVwZGF0ZVNpemU6IChhbmNob3IpID0+XG5cdFx0IyB3aWR0aFxuXHRcdEBwYXJlbnQud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcblx0XHRAdG9wVmlldy53aWR0aCA9IGFuY2hvci53aWR0aFxuXHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmNlbnRlclxuXHRcdEBjb3B5QnV0dG9uLnggPSBBbGlnbi5yaWdodChAY29weUJ1dHRvbi5jdXN0b20ueClcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbi54ID0gQWxpZ24ucmlnaHQoQGZ1bGxzY3JlZW5CdXR0b24uY3VzdG9tLngpXG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRAc2xpZGVDaGFuZ2VyVmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0IyBoZWlnaHRcblx0XHRAcGFyZW50LmhlaWdodCA9IGFuY2hvci5oZWlnaHRcblx0XHRAYm90dG9tVmlldy55ID0gQWxpZ24uYm90dG9tXG5cdFx0XG5cdFx0QGluaXRTY2FsZShAc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcblx0XHRcblx0XG5cdFxuXHR3aXRoSW1hZ2VzOiAoaW1hZ2VzLCBuYW1lZCA9IFwiXCIpID0+XG5cdFx0cmV0dXJuIG5ldyBTY3JlZW5TbGlkZVxuXHRcdFx0aW1hZ2VzOiBpbWFnZXMsIGRlc2NyaXB0aW9uczogW10sIHRpdGxlOiBuYW1lZCwgcGFyZW50OiBAY29udGVudFxuXHRcdFx0eDogQGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoICogKEB3aWR0aCArIEBnYXApXG5cdFxuXHRcblx0b3BlblVSTDogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCIsIGlzQmxhbmsgPSBmYWxzZSkgPT5cblx0XHRpZiBpc0JsYW5rIHRoZW4gd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuXHRcdGVsc2VcbiMgXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIj9zbGlkZUlEXCJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybFxuXHRcblx0b3BlblVSTEhvbWU6ID0+XG5cdFx0QG9wZW5VUkwoXCJodHRwczovL3RpbGxsdXIucnVcIiwgdHJ1ZSlcblxuXG5cblxuXG5cbiMgU2xpZGVcblxuY2xhc3MgU2xpZGUgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyXG5cdFx0XHRoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdGJvcmRlclJhZGl1czogMTYgKiAyXG5cdFx0XHR0aXRsZTogXCJcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QG5hbWUgPSBcInNsaWRlICN7QHBhcmVudC5jaGlsZHJlbi5sZW5ndGh9XCJcblx0XG5cdFxuXHRcblx0QGRlZmluZSAndGl0bGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGl0bGUgPSB2YWx1ZVxuXHRcblx0bmFtZWQ6ICh0aXRsZSkgPT5cblx0XHRAdGl0bGUgPSB0aXRsZVxuXHRcdHJldHVybiBAXG5cdFxuXG4jIFRleHQsIEJ1dHRvblxuXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIkF2ZXJpYSBTZXJpZiBMaWJyZVwiLCA3MDApICMgYmFzZSAoYmFkIG51bWJlcnMpXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIkZyZWRva2FcIiwgNjAwKSAjIGNvbWlzY1xuZm9udEF2ZXJpYSA9IFV0aWxzLmxvYWRXZWJGb250KFwiTnVuaXRvXCIsIDgwMClcblxuY2xhc3MgUENUZXh0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6IGZvbnRBdmVyaWFcblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjJcblx0XHRcdHRleHRPdmVyZmxvdzogXCJlbGxpcHNpc1wiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXG5cbmNsYXNzIFBDQnV0dG9uIGV4dGVuZHMgUENUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXG5cblxuIyBCdXR0b246IFNWR1xuXG5jbGFzcyBQQ1NWR0J1dHRvbiBleHRlbmRzIFBDQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRleHQ6IFwiXCJcblx0XHRcdGFzc2V0OiBudWxsXG5cdFx0XHRjbGlwOiBmYWxzZVxuXHRcdFx0YXV0b1NpemU6IGZhbHNlXG5cdFx0XG5cdFx0QHN2Z1NoYXBlID0gbmV3IFNWR0xheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiLCBuYW1lOiBcInN2Z1NoYXBlXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdmdTaGFwZS5wYXJlbnQgPSBAXG5cdFx0QHVwZGF0ZVNWR1NpemUoKVxuXHRcblx0XG5cdEBkZWZpbmUgJ2Fzc2V0Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5hc3NldCA9IHZhbHVlXG5cdFx0XHRAc3ZnU2hhcGUuc3RhdGVzID1cblx0XHRcdFx0XCJvbkRhcmtcIjogeyBzdmc6IHZhbHVlLm9uRGFyayB9XG5cdFx0XHRcdFwib25MaWdodFwiOiB7IHN2ZzogdmFsdWUub25MaWdodCB9XG5cdFx0XHRAc3ZnU2hhcGUuc3RhdGVTd2l0Y2goXCJvbkRhcmtcIilcblx0XG5cdHVwZGF0ZVNWR1NpemU6ICgpID0+XG5cdFx0QHN2Z1NoYXBlLndpZHRoID0gQHdpZHRoXG5cdFx0QHN2Z1NoYXBlLmhlaWdodCA9IEBoZWlnaHRcblx0XG5cbiMgQnV0dG9uOiBDb3B5XG5cbmNsYXNzIFBDQ29weUJ1dHRvbiBleHRlbmRzIFBDQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcdGhhbmRsZXI6IEBjb3B5SGFuZGxlclxuXHRcdFxuXHRcdEBhcmVhID0gbmV3IExheWVyXG5cdFx0XHRvcGFjaXR5OiAwLCB4OiAtMzAwMCwgaHRtbDogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QGFyZWEucGFyZW50ID0gQFxuXHRcblx0XG5cdEBkZWZpbmUgJ2xpbmsnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMubGlua1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubGluayA9IHZhbHVlXG5cdFx0XHRAdXBkYXRlKHZhbHVlKVxuXHRcblx0XG5cdHVwZGF0ZTogKGxpbmspID0+XG5cdFx0QGFyZWEuaHRtbCA9IFwiPHRleHRhcmVhIGNsYXNzPSdqcy1jb3B5dGV4dGFyZWEtY2xhc3MnIHN0eWxlPSdvcGFjaXR5OjA7Jz4je2xpbmt9PC90ZXh0YXJlYT5cIlxuXHRcblx0XG5cdGNvcHlIYW5kbGVyOiA9PlxuXHRcdHRleHREaXYgPSBAYXJlYS5xdWVyeVNlbGVjdG9yKCcuanMtY29weXRleHRhcmVhLWNsYXNzJylcblx0XHR0ZXh0RGl2LmZvY3VzKClcblx0XHR0ZXh0RGl2LnNlbGVjdCgpXG5cdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgJ2NvcHknXG5cdFx0XG5cdFx0b3JpZ2luVGl0bGUgPSBAdGV4dFxuXHRcdEB0ZXh0ID0gXCJEb25lIPCfkYxcIlxuXHRcdFV0aWxzLmRlbGF5IDEsID0+IEB0ZXh0ID0gb3JpZ2luVGl0bGVcblxuXG5cblxuXG5cblxuXG5cbiMgUGFnZSBDaGFuZ2VyXG5cbmNsYXNzIFBDU2xpZGVDaGFuZ2VyIGV4dGVuZHMgTGF5ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG5hbWU6IFwicHJvZ3Jlc3Mgdmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiAxMjBcblx0XHRcdGhlaWdodDogNTZcblx0XHRcdHBhZ2VzOiAxXG5cdFx0XHRjdXJyZW50OiAxXG5cdFx0XG5cdFx0QGN1cnJlbnRUZXh0ID0gbmV3IFBDVGV4dFxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiLCB3aWR0aDogMTIwLCBsZXR0ZXJTcGFjaW5nOiAzXG4jIFx0XHRcdGZvbnRGYW1pbHk6IFV0aWxzLmxvYWRXZWJGb250KFwiQ291cmllciBQcmltZVwiKVxuIyBcdFx0XHRmb250RmFtaWx5OiBVdGlscy5sb2FkV2ViRm9udChcIlNhbnNpdGFcIiwgNzAwKVxuXHRcdEBwcmV2QnV0dG9uID0gbmV3IFBDU1ZHQnV0dG9uXG5cdFx0XHRuYW1lOiBcInByZXZcIiwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBhc3NldDogU1ZHLnByZXZJY29uXG5cdFx0QG5leHRCdXR0b24gPSBuZXcgUENTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwibmV4dFwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcubmV4dEljb25cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBjdXJyZW50VGV4dC5wYXJlbnQgPSBAXG5cdFx0QGN1cnJlbnRUZXh0LnkgPSBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0QGN1cnJlbnRUZXh0LnN0eWxlID1cblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwidG51bVwiXG5cdFx0XHRcImZvbnQtdmFyaWFudC1udW1lcmljXCI6IFwidGFidWxhci1udW1zIGxpbmluZy1udW1zXCJcblx0XHRcblx0XHRAcHJldkJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QHByZXZCdXR0b24ueCA9IEFsaWduLmxlZnRcblx0XHRAcHJldkJ1dHRvbi55ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0QG5leHRCdXR0b24ucGFyZW50ID0gQFxuXHRcdEBuZXh0QnV0dG9uLnggPSBBbGlnbi5yaWdodFxuXHRcdEBuZXh0QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XG5cdFxuXHRAZGVmaW5lICdwYWdlcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wYWdlc1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMucGFnZXMgPSB2YWx1ZVxuXHRcdFx0QGN1cnJlbnRUZXh0LnRleHQgPSBcIiN7QGN1cnJlbnR9LyN7QHBhZ2VzfVwiXG5cdFxuXHRAZGVmaW5lICdjdXJyZW50Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmN1cnJlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmN1cnJlbnQgPSB2YWx1ZVxuXHRcdFx0QGN1cnJlbnRUZXh0LnRleHQgPSBcIiN7QGN1cnJlbnR9LyN7QHBhZ2VzfVwiXG5cblxuXG4jIFNsaWRlOiBTY3JlZW5zXG5cbmNsYXNzIFNjcmVlblNsaWRlIGV4dGVuZHMgU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aW1hZ2VzOiBbXVxuXHRcdFx0ZGVzY3JpcHRpb25zOiBbXVxuXHRcdFx0XG5cdFx0XHRpbWFnZVNpemU6XG5cdFx0XHRcdHdpZHRoOiAzNzUgKiAyXG5cdFx0XHRcdGhlaWdodDogODEyICogMlxuXHRcdFx0XHRnYXA6IDYwICogMlxuXHRcdFxuXHRcdEBzY3JlZW5WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInNjcmVlbnNcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHNjcmVlblZpZXcucGFyZW50ID0gQFxuXHRcdEB1cGRhdGUoKVxuXHRcblx0XG5cdFxuXHRcblx0QGRlZmluZSAnaW1hZ2VzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmltYWdlc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5pbWFnZXMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZGVzY3JpcHRpb25zJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmRlc2NyaXB0aW9uc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5kZXNjcmlwdGlvbnMgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2ltYWdlU2l6ZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbWFnZVNpemVcbiMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5kZXNjcmlwdGlvbnMgPSB2YWx1ZVxuXHRcblx0XG5cdFxuXHR1cGRhdGU6ICgpID0+XG5cdFx0Zm9yIGltYWdlIGluIEBpbWFnZXNcblx0XHRcdG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcIiN7aW1hZ2Uuc3BsaXQoXCIvXCIpLnBvcCgpfVwiXG5cdFx0XHRcdHBhcmVudDogQHNjcmVlblZpZXdcblx0XHRcdFx0d2lkdGg6IEBpbWFnZVNpemUud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcdGltYWdlOiBpbWFnZVxuXHRcdFx0XHR4OiBAc2NyZWVuVmlldy5jaGlsZHJlbi5sZW5ndGggKiAoQGltYWdlU2l6ZS53aWR0aCArIEBpbWFnZVNpemUuZ2FwKVxuXHRcdFxuXHRcdEBzY3JlZW5WaWV3LndpZHRoID0gQHNjcmVlblZpZXcuY2hpbGRyZW4ubGVuZ3RoICogKEBpbWFnZVNpemUud2lkdGggKyBAaW1hZ2VTaXplLmdhcCkgLSBAaW1hZ2VTaXplLmdhcFxuXHRcdEBzY3JlZW5WaWV3LmhlaWdodCA9IEBpbWFnZVNpemUuaGVpZ2h0XG5cdFx0QHNjcmVlblZpZXcuY2VudGVyKClcblx0XG5cdFxuXHRcbiMgXHRhZGRTY3JlZW5WaWV3OiAoKSA9PlxuIyAjIFx0XHRAb3B0aW9ucy5kZXNjcmlwdGlvbnNbLi5dLnBvcCgpXG4jIFx0XHRwcmludCBAaW1hZ2VTaXplXG4jIFx0XHRuZXcgTGF5ZXJcbiMgXHRcdFx0cGFyZW50OiBAc2NyZWVuVmlld1xuIyBcdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aFxuIyBcdFx0XHRoZWlnaHQ6IEBpbWFnZVNpemUuaGVpZ2h0XG4jIFx0XHRcdGJvcmRlclJhZGl1czogNDJcbiMgXHRcdFx0aW1hZ2U6IEBvcHRpb25zLmltYWdlc1suLl0ucG9wKClcbiMgXHRcdFx0eDogQHNjcmVlblZpZXcuY2hpbGRyZW4ubGVuZ3RoICogKEBpbWFnZVNpemUud2lkdGggKyBAaW1hZ2VTaXplLmdhcClcbiMgXHRcdFxuIyBcdFx0QHNjcmVlblZpZXcud2lkdGggPSBAc2NyZWVuVmlldy5jaGlsZHJlbi5sZW5ndGggKiAoQGltYWdlU2l6ZS53aWR0aCArIEBpbWFnZVNpemUuZ2FwKSAtIEBpbWFnZVNpemUuZ2FwXG4jIFx0XHRAc2NyZWVuVmlldy5oZWlnaHQgPSBAaW1hZ2VTaXplLmhlaWdodFxuIyBcdFx0QHNjcmVlblZpZXcuY2VudGVyKClcblxuXHRcblx0XG4jIFx0YWRkSW1hZ2VzOiAoIGltYWdlcywgZGVzY3JpcHRpb25zICkgPT5cbiMgXHRcdEBpbWFnZXMgPSBpbWFnZXNcbiMgXHRcdEBkZXNjcmlwdGlvbnMgPSBkZXNjcmlwdGlvbnNcbiMgXHRcdEB1cGRhdGVTY3JlZW5WaWV3KClcbiMgXHRcdHJldHVybiBAXG5cdFxuIyBcdGFkZEltYWdlOiAoIHVybCwgZGVzY3JpcHRpb24gPSBcIlwiICkgPT5cbiMgXHRcdEBpbWFnZXMucHVzaCB1cmxcbiMgXHRcdEBkZXNjcmlwdGlvbnMucHVzaCBkZXNjcmlwdGlvblxuIyBcdFx0QHVwZGF0ZVNjcmVlblZpZXcoKVxuXG5cblxuIyB0ZXN0U2xpZGUgPSBuZXcgU2NyZWVuU2xpZGUgKHRpdGxlOiBcImhlbGxvXCIpXG4jIHRlc3RTbGlkZS5hZGRJbWFnZShcImltYWdlcy9pbWcxLnBuZ1wiKVxuIyB0ZXN0U2xpZGUuYWRkSW1hZ2UoXCJpbWFnZXMvaW1nMi5wbmdcIilcbiMgdGVzdFNsaWRlLmFkZEltYWdlKFwiaW1hZ2VzL2ltZzMucG5nXCIpXG5cblxuXG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuY29sb3Jfb25EYXJrID0gXCIjZmZmXCJcbmNvbG9yX29uTGlnaHQgPSBcIiMwMDBcIlxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG5cbmV4cG9ydHMubG9nb0ljb24gPSB7IG9uRGFyazogZ2V0TG9nbyhjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRMb2dvKGNvbG9yX29uTGlnaHQpfVxuXG5cblxuZ2V0RnVsbHNjcmVlbiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0xMS4wNDEgMi45MjE2NEMxMS4wNDEgMy40NDQ3MyAxMS40MjI1IDMuODM0OTggMTEuOTUzMyAzLjgzNDk4SDEyLjU0MjNMMTUuMTEzNSAzLjY2MDYxTDEzLjA5OCA1LjU3ODYyTDEwLjcwOTIgNy45NTMzQzEwLjUyNjcgOC4xMjc2NiAxMC40NDM4IDguMzUxODQgMTAuNDQzOCA4LjU5MjYzQzEwLjQ0MzggOS4xNTcyNCAxMC44MjUzIDkuNTY0MDkgMTEuMzg5MyA5LjU2NDA5QzExLjY0NjQgOS41NjQwOSAxMS44NzA0IDkuNDY0NDUgMTIuMDUyOSA5LjI5MDA5TDE0LjQzMzQgNi45MDcxMUwxNi4zNDExIDQuODgxMTZMMTYuMTY2OSA3LjQ3MTcyVjguMTE5MzZDMTYuMTY2OSA4LjY0MjQ1IDE2LjU0ODUgOS4wNDEgMTcuMDc5MyA5LjA0MUMxNy42MTAyIDkuMDQxIDE4IDguNjUwNzUgMTggOC4xMTkzNlYzLjUxMTE2QzE4IDIuNTU2MzEgMTcuNDQ0MyAyIDE2LjQ5MDQgMkwxMS45NTMzIDJDMTEuNDMwOCAyIDExLjA0MSAyLjM5MDI0IDExLjA0MSAyLjkyMTY0Wk0yIDExLjg4MDZMMiAxNi40ODg4QzIgMTcuNDQzNyAyLjU1NTczIDE4IDMuNTA5NTkgMThIOC4wNDY2NkM4LjU2OTIxIDE4IDguOTU5MDUgMTcuNjAxNSA4Ljk1OTA1IDE3LjA3ODRDOC45NTkwNSAxNi41NTUzIDguNTc3NSAxNi4xNjUgOC4wNDY2NiAxNi4xNjVINy40NTc3NUw0Ljg4NjQ3IDE2LjMzOTRMNi45MDIwMiAxNC40MjE0TDkuMjkwODIgMTIuMDQ2N0M5LjQ3MzMgMTEuODcyMyA5LjU1NjI1IDExLjY0ODIgOS41NTYyNSAxMS4zOTkxQzkuNTU2MjUgMTAuODM0NSA5LjE3NDcgMTAuNDI3NiA4LjYxMDY4IDEwLjQyNzZDOC4zNTM1NSAxMC40Mjc2IDguMTIxMzEgMTAuNTI3MiA3Ljk0NzEyIDEwLjcwOTlMNS41NjY2MiAxMy4wOTI5TDMuNjU4ODkgMTUuMTE4OEwzLjgzMzA3IDEyLjUyODNMMy44MzMwNyAxMS44ODA2QzMuODMzMDcgMTEuMzQ5MiAzLjQ1MTUzIDEwLjk1OSAyLjkyMDY4IDEwLjk1OUMyLjM4OTg0IDEwLjk1OSAyIDExLjM0OTIgMiAxMS44ODA2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLmZ1bGxzY3JlZW5JY29uID0geyBvbkRhcms6IGdldEZ1bGxzY3JlZW4oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0RnVsbHNjcmVlbihjb2xvcl9vbkxpZ2h0KX1cblxuXG5cblxuZ2V0TmV4dCA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk00Ljc5NjQgMTIuNzkzMUw5LjU4NjI3IDhMNC43OTY0IDMuMjA2ODdDNC40MDYwMSAyLjgxNjIxIDQuNDA2MjIgMi4xODMwNCA0Ljc5Njg4IDEuNzkyNjVDNS4xODc1NCAxLjQwMjI2IDUuODIwNyAxLjQwMjQ4IDYuMjExMDkgMS43OTMxM0wxMS43MDczIDcuMjkzMTNDMTIuMDk3NSA3LjY4MzYgMTIuMDk3NSA4LjMxNjQgMTEuNzA3MyA4LjcwNjg3TDYuMjExMDkgMTQuMjA2OUM1LjgyMDcgMTQuNTk3NSA1LjE4NzU0IDE0LjU5NzcgNC43OTY4OCAxNC4yMDczQzQuNDA2MjIgMTMuODE3IDQuNDA2MDEgMTMuMTgzOCA0Ljc5NjQgMTIuNzkzMVpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5uZXh0SWNvbiA9IHsgb25EYXJrOiBnZXROZXh0KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldE5leHQoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0UHJldiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk02LjQxNzQ4IDhMMTEuMjA3MyAxMi43OTMxQzExLjU5NzcgMTMuMTgzOCAxMS41OTc1IDEzLjgxNyAxMS4yMDY5IDE0LjIwNzNDMTAuODE2MiAxNC41OTc3IDEwLjE4MyAxNC41OTc1IDkuNzkyNjUgMTQuMjA2OUw0LjI5NjQgOC43MDY4N0MzLjkwNjIgOC4zMTY0IDMuOTA2MiA3LjY4MzYgNC4yOTY0IDcuMjkzMTNMOS43OTI2NSAxLjc5MzEzQzEwLjE4MyAxLjQwMjQ4IDEwLjgxNjIgMS40MDIyNiAxMS4yMDY5IDEuNzkyNjVDMTEuNTk3NSAyLjE4MzA0IDExLjU5NzcgMi44MTYyMSAxMS4yMDczIDMuMjA2ODdMNi40MTc0OCA4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnByZXZJY29uID0geyBvbkRhcms6IGdldFByZXYoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UHJldihjb2xvcl9vbkxpZ2h0KSB9XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUVBQTtBRElBLElBQUE7O0FBQUEsWUFBQSxHQUFlOztBQUNmLGFBQUEsR0FBZ0I7O0FBRWhCLE9BQUEsR0FBVSxTQUFDLFNBQUQ7QUFDVCxNQUFBO0VBQUEsYUFBQSxHQUFnQjtBQUNoQixTQUFPLDZrQkFBQSxHQUN1ZCxhQUR2ZCxHQUNxZSxtdUJBRHJlLEdBRWt0QixhQUZsdEIsR0FFZ3VCLDhWQUZodUIsR0FHNlUsYUFIN1UsR0FHMlYsOFZBSDNWLEdBSTZVLGFBSjdVLEdBSTJWLDhWQUozVixHQUs2VSxhQUw3VSxHQUsyVixxeEJBTDNWLEdBTW93QixhQU5wd0IsR0FNa3hCLHFpQkFObHhCLEdBT29oQixhQVBwaEIsR0FPa2lCO0FBVGhpQjs7QUFhVixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUFFLE1BQUEsRUFBUSxPQUFBLENBQVEsWUFBUixDQUFWO0VBQWlDLE9BQUEsRUFBUyxPQUFBLENBQVEsYUFBUixDQUExQzs7O0FBSW5CLGFBQUEs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
