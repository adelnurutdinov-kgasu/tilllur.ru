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
      width: Canvas.width,
      height: Canvas.height,
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
      width: Canvas.width,
      height: this.gap,
      name: "topView"
    });
    this.bottomView = new Layer({
      width: Canvas.width,
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
    scaleX = (Canvas.width - slideGap / 6) / this.width;
    scaleY = (Canvas.height - slideGap) / this.height;
    this.states.window.scale = Math.min(scaleX, scaleY);
    scaleX = Canvas.width / this.width;
    scaleY = Canvas.height / this.height;
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
    return Canvas.on("change:width", (function(_this) {
      return function() {
        return local.updateSize(Canvas);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9QcmVzZW50YXRpb25Db21wb25lbnQvUHJlc2VudGF0aW9uLVF1ZXVlLzAwMSBbMjAyMF0gTmF2aWdhdGlvbiBWaWV3LmZyYW1lci9tb2R1bGVzL1ByZXNlbnRhdGlvbkNvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJlc2VudGF0aW9uQ29tcG9uZW50L1ByZXNlbnRhdGlvbi1RdWV1ZS8wMDEgWzIwMjBdIE5hdmlnYXRpb24gVmlldy5mcmFtZXIvbW9kdWxlcy9QQ1NWRy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgUHJlc2VudGF0aW9uIENvbXBvbmVudFxuXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5cbiMgUHJlc2VudGF0aW9uXG5cbmNsYXNzIGV4cG9ydHMuUHJlc2VudGF0aW9uIGV4dGVuZHMgUGFnZUNvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBnYXAgPSA1NlxuXHRcdEBfdGhlbWUgPSBcIlwiXG5cdFx0XG5cdFx0QGNhbnZhcyA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IENhbnZhcy53aWR0aCwgaGVpZ2h0OiBDYW52YXMuaGVpZ2h0LCBuYW1lOiBcImNhbnZhc1wiXG5cdFx0QGNhbnZhcy5zdGF0ZXMgPVxuXHRcdFx0XCJ3aW5kb3dcIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCIgfVxuXHRcdFxuXHRcdEB0b3BWaWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQ2FudmFzLndpZHRoLCBoZWlnaHQ6IEBnYXAsIG5hbWU6IFwidG9wVmlld1wiXG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiBDYW52YXMud2lkdGgsIGhlaWdodDogQGdhcCwgbmFtZTogXCJib3R0b21WaWV3XCIsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEBjYW52YXNcblx0XHRcdHdpZHRoOiAxNDAwICogMlxuXHRcdFx0aGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IHRydWVcbiMgXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdFxuXHRcdFx0dGl0bGU6IFwiXCJcblx0XHRcdGdhcDogQGdhcCAqIDJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdGZvciBpdGVtIGluIFtAdG9wVmlldywgQGJvdHRvbVZpZXddXG5cdFx0XHRpdGVtLnBhcmVudCA9IEBwYXJlbnRcblx0XHRcdGl0ZW0uc2VuZFRvQmFjaygpXG5cdFx0XHRpdGVtLmJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHRcdGl0ZW0uc3RhdGVzID1cblx0XHRcdFx0XCJ3aW5kb3dcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIndpbmRvd1wiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRAaW5pdEdlbmVyYWwoKVxuXHRcdEBpbml0UGFnZUNoYW5nZSgpXG5cdFx0QGluaXRTaXplQ2hhbmdlKClcblx0XHRAaW5pdFNjYWxlKClcblx0XHRAaW5pdFNob3J0Y3V0cygpXG5cdFx0XG5cdFx0XG5cdFx0IyBUb3AgVmlld1xuXHRcdEBsb2dvQnV0dG9uID0gbmV3IFBDU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImxvZ29cIlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyLCBhc3NldDogU1ZHLmxvZ29JY29uXG5cdFx0XHRoYW5kbGVyOiBAb3BlblVSTEhvbWVcblx0XHRcblx0XHRAdGl0bGVUZXh0ID0gbmV3IFBDVGV4dFxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJ0aXRsZVwiXG5cdFx0XHR0ZXh0OiBAdGl0bGUsIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXIsIHdpZHRoOiBAdG9wVmlldy53aWR0aCAvIDJcblx0XHRcblx0XHRAY29weUJ1dHRvbiA9IG5ldyBQQ0NvcHlCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiY29weSBsaW5rXCJcblx0XHRcdHRleHQ6IFwiQ29weSBMaW5rXCIsIHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzItMjAtMjQpLCB5OiBBbGlnbi5jZW50ZXIsIHdpZHRoOiBAYm90dG9tVmlldy53aWR0aCAvIDRcblx0XHRcdGN1c3RvbTogeyB4OiAtMzItMjAtMjQgfVxuXHRcdFxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uID0gbmV3IFBDU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImZ1bGxzY3JlZW5cIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMjAsIGhlaWdodDogMjAsIGFzc2V0OiBTVkcuZnVsbHNjcmVlbkljb25cblx0XHRcdGhhbmRsZXI6IEBjaGFuZ2VTY2FsZVxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0zMiB9XG5cdFx0XG5cdFx0IyBCb3R0b20gVmlld1xuXHRcdEBzbGlkZUNoYW5nZXJWaWV3ID0gbmV3IFBDU2xpZGVDaGFuZ2VyXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInNsaWRlIGNoYW5nZXJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0QHJlc3RhcnRCdXR0b24gPSBuZXcgUENCdXR0b25cblx0XHRcdHBhcmVudDogQGJvdHRvbVZpZXcsIG5hbWU6IFwicmVzdGFydFwiXG5cdFx0XHR0ZXh0OiBcIlJlc3RhcnQgKFIpXCIsIHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMjAwMCksIHk6IEFsaWduLmNlbnRlciwgd2lkdGg6IEBib3R0b21WaWV3LndpZHRoIC8gNFxuXHRcdFx0aGFuZGxlcjogQHJlc3RhcnRIYW5kbGVyXG5cdFx0XHRjdXN0b206IHsgeDogLTIwMDAgfVxuXHRcdFxuXHRcdFxuXHRcblx0XG5cdEBkZWZpbmUgJ3RpdGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dhcCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5nYXBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ2FwID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ190aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5fdGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuX3RoZW1lID0gdmFsdWVcblx0XG5cdFxuXHRcblx0aW5pdFNob3J0Y3V0czogKCkgPT5cblx0XHRsb2NhbFNjcm9sbCA9IEBcblx0XHRFdmVudHMud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cblx0XHRcdGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd0xlZnRcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5zbmFwVG9OZXh0UGFnZShcImxlZnRcIiwgZmFsc2UpXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd1JpZ2h0XCJcblx0XHRcdFx0bG9jYWxTY3JvbGwuc25hcFRvTmV4dFBhZ2UoXCJyaWdodFwiLCBmYWxzZSlcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUNcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5jb3B5QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5RlwiXG5cdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlSXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwucmVzdGFydEJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIkVzY2FwZVwiXG5cdFx0XHRcdGlmIGxvY2FsU2Nyb2xsLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcblx0XG5cdGluaXRTY2FsZTogKGZvclN0YXRlID0gXCJ3aW5kb3dcIikgPT5cblx0XHRzbGlkZUdhcCA9IDEyMFxuXHRcdFxuXHRcdHNjYWxlWCA9IChDYW52YXMud2lkdGggLSBzbGlkZUdhcCAvIDYpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKENhbnZhcy5oZWlnaHQgLSBzbGlkZUdhcCkgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlcy53aW5kb3cuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XHRcblx0XHRzY2FsZVggPSBDYW52YXMud2lkdGggLyBAd2lkdGhcblx0XHRzY2FsZVkgPSBDYW52YXMuaGVpZ2h0IC8gQGhlaWdodFxuXHRcdEBzdGF0ZXMuZnVsbHNjcmVlbi5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdEBzdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRAY2FudmFzLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdEBjZW50ZXIoKVxuXHRcblx0XG5cdFxuXHRcblx0Y2hhbmdlU2NhbGU6ICgpID0+XG5cdFx0XG5cdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJ3aW5kb3dcIiB0aGVuIG5leHRTdGF0ZSA9IFwiZnVsbHNjcmVlblwiXG5cdFx0ZWxzZSBuZXh0U3RhdGUgPSBcIndpbmRvd1wiXG5cdFx0XG5cdFx0QGFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGNhbnZhcy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEB0b3BWaWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGJvdHRvbVZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cblx0cmVzdGFydEhhbmRsZXI6ICgpID0+XG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bMF0sIGZhbHNlKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRpbml0R2VuZXJhbDogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5kaXNhYmxlKClcblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblx0XHRcblx0XHRsb2NhbCA9IEBcblx0XHRgXG5cdFx0Y29uc3QgcHJlZmVyc0RhcmtTY2hlbWUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpO1xuXHRcdGlmIChwcmVmZXJzRGFya1NjaGVtZS5tYXRjaGVzKSB7IGxvY2FsLl90aGVtZSA9IFwiZGFya1wiIH1cblx0XHRlbHNlIHsgbG9jYWwuX3RoZW1lID0gXCJsaWdodFwiIH1cblx0XHRgXG5cdFx0bG9jYWwuX3RoZW1lXG5cdFx0XG5cdFxuXHRpbml0UGFnZUNoYW5nZTogKCkgPT5cblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgLT5cblx0XHRcdGZvciBpdGVtLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRcdEBzbGlkZUNoYW5nZXJWaWV3LmN1cnJlbnQgPSAoaW5kZXggKyAxKVxuXHRcdFx0XHRcdHJldHVyblxuIyBcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShAY3VycmVudFBhZ2UubmFtZSwgXCIje0BjdXJyZW50UGFnZS5uYW1lfVwiLCBcIj9wYWdlPTFcIilcbiMgXHRcdFx0cHJpbnQgQGN1cnJlbnRQYWdlXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdEBwYXJlbnQuc2xpZGVDaGFuZ2VyVmlldy5wYWdlcyA9IEBjaGlsZHJlbi5sZW5ndGhcblx0XG5cdFxuXHRpbml0U2l6ZUNoYW5nZTogKCkgPT5cblx0XHRsb2NhbCA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsLnVwZGF0ZVNpemUoQ2FudmFzKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHVwZGF0ZVNpemU6IChhbmNob3IpID0+XG5cdFx0IyB3aWR0aFxuXHRcdEBwYXJlbnQud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcblx0XHRAdG9wVmlldy53aWR0aCA9IGFuY2hvci53aWR0aFxuXHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmNlbnRlclxuXHRcdEBjb3B5QnV0dG9uLnggPSBBbGlnbi5yaWdodChAY29weUJ1dHRvbi5jdXN0b20ueClcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbi54ID0gQWxpZ24ucmlnaHQoQGZ1bGxzY3JlZW5CdXR0b24uY3VzdG9tLngpXG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRAc2xpZGVDaGFuZ2VyVmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0IyBoZWlnaHRcblx0XHRAcGFyZW50LmhlaWdodCA9IGFuY2hvci5oZWlnaHRcblx0XHRAYm90dG9tVmlldy55ID0gQWxpZ24uYm90dG9tXG5cdFx0XG5cdFx0QGluaXRTY2FsZShAc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcblx0XHRcblx0XG5cdFxuXHR3aXRoSW1hZ2VzOiAoaW1hZ2VzLCBuYW1lZCA9IFwiXCIpID0+XG5cdFx0cmV0dXJuIG5ldyBTY3JlZW5TbGlkZVxuXHRcdFx0aW1hZ2VzOiBpbWFnZXMsIGRlc2NyaXB0aW9uczogW10sIHRpdGxlOiBuYW1lZCwgcGFyZW50OiBAY29udGVudFxuXHRcdFx0eDogQGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoICogKEB3aWR0aCArIEBnYXApXG5cdFxuXHRcblx0b3BlblVSTDogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCIsIGlzQmxhbmsgPSBmYWxzZSkgPT5cblx0XHRpZiBpc0JsYW5rIHRoZW4gd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuXHRcdGVsc2VcbiMgXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIj9zbGlkZUlEXCJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybFxuXHRcblx0b3BlblVSTEhvbWU6ID0+XG5cdFx0QG9wZW5VUkwoXCJodHRwczovL3RpbGxsdXIucnVcIiwgdHJ1ZSlcblx0XG5cdFxuXHRcblxuXG5cblxuIyBTbGlkZVxuXG5jbGFzcyBTbGlkZSBleHRlbmRzIExheWVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMlwiXG5cdFx0XHR3aWR0aDogMTQwMCAqIDJcblx0XHRcdGhlaWdodDogOTAwICogMlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNiAqIDJcblx0XHRcdHRpdGxlOiBcIlwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAbmFtZSA9IFwic2xpZGUgI3tAcGFyZW50LmNoaWxkcmVuLmxlbmd0aH1cIlxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICd0aXRsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aXRsZSA9IHZhbHVlXG5cdFxuXHRuYW1lZDogKHRpdGxlKSA9PlxuXHRcdEB0aXRsZSA9IHRpdGxlXG5cdFx0cmV0dXJuIEBcblx0XG5cbiMgVGV4dCwgQnV0dG9uXG5cbiMgZm9udEF2ZXJpYSA9IFV0aWxzLmxvYWRXZWJGb250KFwiQXZlcmlhIFNlcmlmIExpYnJlXCIsIDcwMCkgIyBiYXNlIChiYWQgbnVtYmVycylcbiMgZm9udEF2ZXJpYSA9IFV0aWxzLmxvYWRXZWJGb250KFwiRnJlZG9rYVwiLCA2MDApICMgY29taXNjXG5mb250QXZlcmlhID0gVXRpbHMubG9hZFdlYkZvbnQoXCJOdW5pdG9cIiwgODAwKVxuXG5jbGFzcyBQQ1RleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcdFx0dGV4dE92ZXJmbG93OiBcImVsbGlwc2lzXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblxuY2xhc3MgUENCdXR0b24gZXh0ZW5kcyBQQ1RleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cblxuXG4jIEJ1dHRvbjogU1ZHXG5cbmNsYXNzIFBDU1ZHQnV0dG9uIGV4dGVuZHMgUENCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0YXNzZXQ6IG51bGxcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRhdXRvU2l6ZTogZmFsc2Vcblx0XHRcblx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcblx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcblx0QGRlZmluZSAnYXNzZXQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFzc2V0ID0gdmFsdWVcblx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cblx0XHRcdFx0XCJvbkxpZ2h0XCI6IHsgc3ZnOiB2YWx1ZS5vbkxpZ2h0IH1cblx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcblx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cblx0XHRAc3ZnU2hhcGUud2lkdGggPSBAd2lkdGhcblx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuIyBCdXR0b246IENvcHlcblxuY2xhc3MgUENDb3B5QnV0dG9uIGV4dGVuZHMgUENCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIucnVcIlxuXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG5cdFx0QGFyZWEgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAYXJlYS5wYXJlbnQgPSBAXG5cdFxuXHRcblx0QGRlZmluZSAnbGluaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcblx0dXBkYXRlOiAobGluaykgPT5cblx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcblx0Y29weUhhbmRsZXI6ID0+XG5cdFx0dGV4dERpdiA9IEBhcmVhLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3B5dGV4dGFyZWEtY2xhc3MnKVxuXHRcdHRleHREaXYuZm9jdXMoKVxuXHRcdHRleHREaXYuc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcblx0XHRcblx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG5cdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG5cdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHRleHQgPSBvcmlnaW5UaXRsZVxuXG5cblxuXG5cblxuXG5cblxuIyBQYWdlIENoYW5nZXJcblxuY2xhc3MgUENTbGlkZUNoYW5nZXIgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJwcm9ncmVzcyB2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDEyMFxuXHRcdFx0aGVpZ2h0OiA1NlxuXHRcdFx0cGFnZXM6IDFcblx0XHRcdGN1cnJlbnQ6IDFcblx0XHRcblx0XHRAY3VycmVudFRleHQgPSBuZXcgUENUZXh0XG5cdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCIsIHdpZHRoOiAxMjAsIGxldHRlclNwYWNpbmc6IDNcbiMgXHRcdFx0Zm9udEZhbWlseTogVXRpbHMubG9hZFdlYkZvbnQoXCJDb3VyaWVyIFByaW1lXCIpXG4jIFx0XHRcdGZvbnRGYW1pbHk6IFV0aWxzLmxvYWRXZWJGb250KFwiU2Fuc2l0YVwiLCA3MDApXG5cdFx0QHByZXZCdXR0b24gPSBuZXcgUENTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwicHJldlwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcucHJldkljb25cblx0XHRAbmV4dEJ1dHRvbiA9IG5ldyBQQ1NWR0J1dHRvblxuXHRcdFx0bmFtZTogXCJuZXh0XCIsIHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgYXNzZXQ6IFNWRy5uZXh0SWNvblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QGN1cnJlbnRUZXh0LnBhcmVudCA9IEBcblx0XHRAY3VycmVudFRleHQueSA9IEFsaWduLmNlbnRlcigtMSlcblx0XHRAY3VycmVudFRleHQuc3R5bGUgPVxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCJ0bnVtXCJcblx0XHRcdFwiZm9udC12YXJpYW50LW51bWVyaWNcIjogXCJ0YWJ1bGFyLW51bXMgbGluaW5nLW51bXNcIlxuXHRcdFxuXHRcdEBwcmV2QnV0dG9uLnBhcmVudCA9IEBcblx0XHRAcHJldkJ1dHRvbi54ID0gQWxpZ24ubGVmdFxuXHRcdEBwcmV2QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XHRAbmV4dEJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QG5leHRCdXR0b24ueCA9IEFsaWduLnJpZ2h0XG5cdFx0QG5leHRCdXR0b24ueSA9IEFsaWduLmNlbnRlclxuXHRcblx0XG5cdEBkZWZpbmUgJ3BhZ2VzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBhZ2VzXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5wYWdlcyA9IHZhbHVlXG5cdFx0XHRAY3VycmVudFRleHQudGV4dCA9IFwiI3tAY3VycmVudH0vI3tAcGFnZXN9XCJcblx0XG5cdEBkZWZpbmUgJ2N1cnJlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY3VycmVudFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuY3VycmVudCA9IHZhbHVlXG5cdFx0XHRAY3VycmVudFRleHQudGV4dCA9IFwiI3tAY3VycmVudH0vI3tAcGFnZXN9XCJcblxuXG5cbiMgU2xpZGU6IFNjcmVlbnNcblxuY2xhc3MgU2NyZWVuU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRpbWFnZXM6IFtdXG5cdFx0XHRkZXNjcmlwdGlvbnM6IFtdXG5cdFx0XHRcblx0XHRcdGltYWdlU2l6ZTpcblx0XHRcdFx0d2lkdGg6IDM3NSAqIDJcblx0XHRcdFx0aGVpZ2h0OiA4MTIgKiAyXG5cdFx0XHRcdGdhcDogNjAgKiAyXG5cdFx0XG5cdFx0QHNjcmVlblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwic2NyZWVuc1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAc2NyZWVuVmlldy5wYXJlbnQgPSBAXG5cdFx0QHVwZGF0ZSgpXG5cdFxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICdpbWFnZXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW1hZ2VzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmltYWdlcyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdkZXNjcmlwdGlvbnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZGVzY3JpcHRpb25zXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmRlc2NyaXB0aW9ucyA9IHZhbHVlXG5cblx0QGRlZmluZSAnaW1hZ2VTaXplJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmltYWdlU2l6ZVxuIyBcdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmRlc2NyaXB0aW9ucyA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdHVwZGF0ZTogKCkgPT5cblx0XHRmb3IgaW1hZ2UgaW4gQGltYWdlc1xuXHRcdFx0bmV3IExheWVyXG5cdFx0XHRcdG5hbWU6IFwiI3tpbWFnZS5zcGxpdChcIi9cIikucG9wKCl9XCJcblx0XHRcdFx0cGFyZW50OiBAc2NyZWVuVmlld1xuXHRcdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IEBpbWFnZVNpemUuaGVpZ2h0XG5cdFx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdFx0aW1hZ2U6IGltYWdlXG5cdFx0XHRcdHg6IEBzY3JlZW5WaWV3LmNoaWxkcmVuLmxlbmd0aCAqIChAaW1hZ2VTaXplLndpZHRoICsgQGltYWdlU2l6ZS5nYXApXG5cdFx0XG5cdFx0QHNjcmVlblZpZXcud2lkdGggPSBAc2NyZWVuVmlldy5jaGlsZHJlbi5sZW5ndGggKiAoQGltYWdlU2l6ZS53aWR0aCArIEBpbWFnZVNpemUuZ2FwKSAtIEBpbWFnZVNpemUuZ2FwXG5cdFx0QHNjcmVlblZpZXcuaGVpZ2h0ID0gQGltYWdlU2l6ZS5oZWlnaHRcblx0XHRAc2NyZWVuVmlldy5jZW50ZXIoKVxuXHRcblx0XG5cdFxuIyBcdGFkZFNjcmVlblZpZXc6ICgpID0+XG4jICMgXHRcdEBvcHRpb25zLmRlc2NyaXB0aW9uc1suLl0ucG9wKClcbiMgXHRcdHByaW50IEBpbWFnZVNpemVcbiMgXHRcdG5ldyBMYXllclxuIyBcdFx0XHRwYXJlbnQ6IEBzY3JlZW5WaWV3XG4jIFx0XHRcdHdpZHRoOiBAaW1hZ2VTaXplLndpZHRoXG4jIFx0XHRcdGhlaWdodDogQGltYWdlU2l6ZS5oZWlnaHRcbiMgXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuIyBcdFx0XHRpbWFnZTogQG9wdGlvbnMuaW1hZ2VzWy4uXS5wb3AoKVxuIyBcdFx0XHR4OiBAc2NyZWVuVmlldy5jaGlsZHJlbi5sZW5ndGggKiAoQGltYWdlU2l6ZS53aWR0aCArIEBpbWFnZVNpemUuZ2FwKVxuIyBcdFx0XG4jIFx0XHRAc2NyZWVuVmlldy53aWR0aCA9IEBzY3JlZW5WaWV3LmNoaWxkcmVuLmxlbmd0aCAqIChAaW1hZ2VTaXplLndpZHRoICsgQGltYWdlU2l6ZS5nYXApIC0gQGltYWdlU2l6ZS5nYXBcbiMgXHRcdEBzY3JlZW5WaWV3LmhlaWdodCA9IEBpbWFnZVNpemUuaGVpZ2h0XG4jIFx0XHRAc2NyZWVuVmlldy5jZW50ZXIoKVxuXG5cdFxuXHRcbiMgXHRhZGRJbWFnZXM6ICggaW1hZ2VzLCBkZXNjcmlwdGlvbnMgKSA9PlxuIyBcdFx0QGltYWdlcyA9IGltYWdlc1xuIyBcdFx0QGRlc2NyaXB0aW9ucyA9IGRlc2NyaXB0aW9uc1xuIyBcdFx0QHVwZGF0ZVNjcmVlblZpZXcoKVxuIyBcdFx0cmV0dXJuIEBcblx0XG4jIFx0YWRkSW1hZ2U6ICggdXJsLCBkZXNjcmlwdGlvbiA9IFwiXCIgKSA9PlxuIyBcdFx0QGltYWdlcy5wdXNoIHVybFxuIyBcdFx0QGRlc2NyaXB0aW9ucy5wdXNoIGRlc2NyaXB0aW9uXG4jIFx0XHRAdXBkYXRlU2NyZWVuVmlldygpXG5cblxuXG4jIHRlc3RTbGlkZSA9IG5ldyBTY3JlZW5TbGlkZSAodGl0bGU6IFwiaGVsbG9cIilcbiMgdGVzdFNsaWRlLmFkZEltYWdlKFwiaW1hZ2VzL2ltZzEucG5nXCIpXG4jIHRlc3RTbGlkZS5hZGRJbWFnZShcImltYWdlcy9pbWcyLnBuZ1wiKVxuIyB0ZXN0U2xpZGUuYWRkSW1hZ2UoXCJpbWFnZXMvaW1nMy5wbmdcIilcblxuXG5cbiIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5jb2xvcl9vbkRhcmsgPSBcIiNmZmZcIlxuY29sb3Jfb25MaWdodCA9IFwiIzAwMFwiXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcblxuZXhwb3J0cy5sb2dvSWNvbiA9IHsgb25EYXJrOiBnZXRMb2dvKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldExvZ28oY29sb3Jfb25MaWdodCl9XG5cblxuXG5nZXRGdWxsc2NyZWVuID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTExLjA0MSAyLjkyMTY0QzExLjA0MSAzLjQ0NDczIDExLjQyMjUgMy44MzQ5OCAxMS45NTMzIDMuODM0OThIMTIuNTQyM0wxNS4xMTM1IDMuNjYwNjFMMTMuMDk4IDUuNTc4NjJMMTAuNzA5MiA3Ljk1MzNDMTAuNTI2NyA4LjEyNzY2IDEwLjQ0MzggOC4zNTE4NCAxMC40NDM4IDguNTkyNjNDMTAuNDQzOCA5LjE1NzI0IDEwLjgyNTMgOS41NjQwOSAxMS4zODkzIDkuNTY0MDlDMTEuNjQ2NCA5LjU2NDA5IDExLjg3MDQgOS40NjQ0NSAxMi4wNTI5IDkuMjkwMDlMMTQuNDMzNCA2LjkwNzExTDE2LjM0MTEgNC44ODExNkwxNi4xNjY5IDcuNDcxNzJWOC4xMTkzNkMxNi4xNjY5IDguNjQyNDUgMTYuNTQ4NSA5LjA0MSAxNy4wNzkzIDkuMDQxQzE3LjYxMDIgOS4wNDEgMTggOC42NTA3NSAxOCA4LjExOTM2VjMuNTExMTZDMTggMi41NTYzMSAxNy40NDQzIDIgMTYuNDkwNCAyTDExLjk1MzMgMkMxMS40MzA4IDIgMTEuMDQxIDIuMzkwMjQgMTEuMDQxIDIuOTIxNjRaTTIgMTEuODgwNkwyIDE2LjQ4ODhDMiAxNy40NDM3IDIuNTU1NzMgMTggMy41MDk1OSAxOEg4LjA0NjY2QzguNTY5MjEgMTggOC45NTkwNSAxNy42MDE1IDguOTU5MDUgMTcuMDc4NEM4Ljk1OTA1IDE2LjU1NTMgOC41Nzc1IDE2LjE2NSA4LjA0NjY2IDE2LjE2NUg3LjQ1Nzc1TDQuODg2NDcgMTYuMzM5NEw2LjkwMjAyIDE0LjQyMTRMOS4yOTA4MiAxMi4wNDY3QzkuNDczMyAxMS44NzIzIDkuNTU2MjUgMTEuNjQ4MiA5LjU1NjI1IDExLjM5OTFDOS41NTYyNSAxMC44MzQ1IDkuMTc0NyAxMC40Mjc2IDguNjEwNjggMTAuNDI3NkM4LjM1MzU1IDEwLjQyNzYgOC4xMjEzMSAxMC41MjcyIDcuOTQ3MTIgMTAuNzA5OUw1LjU2NjYyIDEzLjA5MjlMMy42NTg4OSAxNS4xMTg4TDMuODMzMDcgMTIuNTI4M0wzLjgzMzA3IDExLjg4MDZDMy44MzMwNyAxMS4zNDkyIDMuNDUxNTMgMTAuOTU5IDIuOTIwNjggMTAuOTU5QzIuMzg5ODQgMTAuOTU5IDIgMTEuMzQ5MiAyIDExLjg4MDZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMuZnVsbHNjcmVlbkljb24gPSB7IG9uRGFyazogZ2V0RnVsbHNjcmVlbihjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRGdWxsc2NyZWVuKGNvbG9yX29uTGlnaHQpfVxuXG5cblxuXG5nZXROZXh0ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTQuNzk2NCAxMi43OTMxTDkuNTg2MjcgOEw0Ljc5NjQgMy4yMDY4N0M0LjQwNjAxIDIuODE2MjEgNC40MDYyMiAyLjE4MzA0IDQuNzk2ODggMS43OTI2NUM1LjE4NzU0IDEuNDAyMjYgNS44MjA3IDEuNDAyNDggNi4yMTEwOSAxLjc5MzEzTDExLjcwNzMgNy4yOTMxM0MxMi4wOTc1IDcuNjgzNiAxMi4wOTc1IDguMzE2NCAxMS43MDczIDguNzA2ODdMNi4yMTEwOSAxNC4yMDY5QzUuODIwNyAxNC41OTc1IDUuMTg3NTQgMTQuNTk3NyA0Ljc5Njg4IDE0LjIwNzNDNC40MDYyMiAxMy44MTcgNC40MDYwMSAxMy4xODM4IDQuNzk2NCAxMi43OTMxWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLm5leHRJY29uID0geyBvbkRhcms6IGdldE5leHQoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0TmV4dChjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5nZXRQcmV2ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTYuNDE3NDggOEwxMS4yMDczIDEyLjc5MzFDMTEuNTk3NyAxMy4xODM4IDExLjU5NzUgMTMuODE3IDExLjIwNjkgMTQuMjA3M0MxMC44MTYyIDE0LjU5NzcgMTAuMTgzIDE0LjU5NzUgOS43OTI2NSAxNC4yMDY5TDQuMjk2NCA4LjcwNjg3QzMuOTA2MiA4LjMxNjQgMy45MDYyIDcuNjgzNiA0LjI5NjQgNy4yOTMxM0w5Ljc5MjY1IDEuNzkzMTNDMTAuMTgzIDEuNDAyNDggMTAuODE2MiAxLjQwMjI2IDExLjIwNjkgMS43OTI2NUMxMS41OTc1IDIuMTgzMDQgMTEuNTk3NyAyLjgxNjIxIDExLjIwNzMgMy4yMDY4N0w2LjQxNzQ4IDhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucHJldkljb24gPSB7IG9uRGFyazogZ2V0UHJldihjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQcmV2KGNvbG9yX29uTGlnaHQpIH1cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBRUFBO0FESUEsSUFBQTs7QUFBQSxZQUFBLEdBQWU7O0FBQ2YsYUFBQSxHQUFnQjs7QUFFaEIsT0FBQSxHQUFVLFNBQUMsU0FBRDtBQUNULE1BQUE7RUFBQSxhQUFBLEdBQWdCO0FBQ2hCLFNBQU8sNmtCQUFBLEdBQ3VkLGFBRHZkLEdBQ3FlLG11QkFEcmUsR0FFa3RCLGFBRmx0QixHQUVndUIsOFZBRmh1QixHQUc2VSxhQUg3VSxHQUcyViw4VkFIM1YsR0FJNlUsYUFKN1UsR0FJMlYsOFZBSjNWLEdBSzZVLGFBTDdVLEdBSzJWLHF4QkFMM1YsR0FNb3dCLGFBTnB3QixHQU1reEIscWlCQU5seEIsR0FPb2hCLGFBUHBoQixHQU9raUI7QUFUaGlCOztBQWFWLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQUUsTUFBQSxFQUFRLE9BQUEsQ0FBUSxZQUFSLENBQVY7RUFBaUMsT0FBQSxFQUFTLE9BQUEsQ0FBUSxhQUFSLENBQTFDOzs7QUFJbkIsYUFBQSxHQUFnQixTQUFDLFNBQUQ7QUFDZixNQUFBO0VBQUEsYUFBQSxHQUFnQjtBQUNoQixTQUFPLG1sQ0FBQSxHQUM2OUIsYUFENzlCLEdBQzIrQjtBQUhuK0I7O0FBT2hC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
