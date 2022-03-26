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
var PCButton, PCCopyButton, PCSVGButton, PCSlideChanger, PCText, PrototypeSlide, SVG, ScreenSlide, Slide, fontAveria,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SVG = require("PCSVG");

exports.Presentation = (function(superClass) {
  extend(Presentation, superClass);

  function Presentation(options) {
    var item, j, len, ref;
    this.options = options != null ? options : {};
    this.openURLHome = bind(this.openURLHome, this);
    this.openURL = bind(this.openURL, this);
    this.withPrototypes = bind(this.withPrototypes, this);
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
    this.canvas = new BackgroundLayer({
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
      width: this.canvas.width,
      height: this.gap,
      name: "topView"
    });
    this.bottomView = new Layer({
      width: this.canvas.width,
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
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
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
      y: Align.center
    });
    this.copyButton = new PCCopyButton({
      parent: this.topView,
      name: "copy link",
      text: "Copy Link",
      textAlign: "right",
      y: Align.center,
      custom: {
        x: -32 - 20 - 24
      }
    });
    this.fullscreenButton = new PCSVGButton({
      parent: this.topView,
      name: "fullscreen",
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
      handler: this.restartHandler,
      custom: {
        x: -2000
      }
    });
    this.updateSize(this.canvas);
  }

  Presentation.define('title', {
    get: function() {
      return this.options.title;
    },
    set: function(value) {
      return this.options.title = value;
    }
  });

  Presentation.define('deviceCanvas', {
    get: function() {
      return this.options.deviceCanvas;
    },
    set: function(value) {
      return this.options.deviceCanvas = value;
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
    scaleX = (this.canvas.width - slideGap / 6) / this.width;
    scaleY = (this.canvas.height - slideGap) / this.height;
    this.states.window.scale = Math.min(scaleX, scaleY);
    scaleX = this.canvas.width / this.width;
    scaleY = this.canvas.height / this.height;
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
      var index, item, j, len, ref;
      ref = this.content.children;
      for (index = j = 0, len = ref.length; j < len; index = ++j) {
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
    return local.parent.on("change:width", (function(_this) {
      return function() {
        return local.updateSize(local.parent);
      };
    })(this));
  };

  Presentation.prototype.updateSize = function(anchor) {
    this.parent.width = anchor.width;
    this.topView.width = anchor.width;
    if (this.canvas.width < 740) {
      this.titleText.x = Align.left(this.logoButton.x);
      this.titleText.y = Align.top(this.topView.height + 10);
      this.copyButton.x = Align.left(this.logoButton.x);
      this.copyButton.y = Align.top(this.topView.height + 36);
    } else {
      this.titleText.x = Align.center;
      this.titleText.y = Align.center;
      this.copyButton.x = Align.right(this.copyButton.custom.x);
      this.copyButton.y = Align.center;
    }
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

  Presentation.prototype.withPrototypes = function(urls, named) {
    if (named == null) {
      named = "";
    }
    return new PrototypeSlide({
      urls: urls,
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
      title: "",
      imageRadius: 42,
      imageSize: {
        width: 375 * 2,
        height: 812 * 2,
        gap: 60 * 2
      }
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

  Slide.define('imageRadius', {
    get: function() {
      return this.options.imageRadius;
    },
    set: function(value) {
      return this.options.imageRadius = value;
    }
  });

  Slide.define('imageSize', {
    get: function() {
      return this.options.imageSize;
    },
    set: function(value) {
      return this.options.descriptions = value;
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
      descriptions: []
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

  ScreenSlide.prototype.update = function() {
    var image, j, len, ref;
    ref = this.images;
    for (j = 0, len = ref.length; j < len; j++) {
      image = ref[j];
      new Layer({
        parent: this.screenView,
        width: this.imageSize.width,
        height: this.imageSize.height,
        x: this.screenView.children.length * (this.imageSize.width + this.imageSize.gap),
        name: "" + (image.split("/").pop()),
        image: image
      });
    }
    this.screenView.width = this.screenView.children.length * (this.imageSize.width + this.imageSize.gap) - this.imageSize.gap;
    this.screenView.height = this.imageSize.height;
    return this.screenView.center();
  };

  return ScreenSlide;

})(Slide);

PrototypeSlide = (function(superClass) {
  extend(PrototypeSlide, superClass);

  function PrototypeSlide(options) {
    this.options = options != null ? options : {};
    this.createWebView = bind(this.createWebView, this);
    this.update = bind(this.update, this);
    _.defaults(this.options, {
      urls: []
    });
    this.screenView = new Layer({
      name: "screens",
      backgroundColor: "null"
    });
    PrototypeSlide.__super__.constructor.call(this, this.options);
    this.screenView.parent = this;
    this.update();
  }

  PrototypeSlide.define('urls', {
    get: function() {
      return this.options.urls;
    },
    set: function(value) {
      return this.options.urls = value;
    }
  });

  PrototypeSlide.define('imageSize', {
    get: function() {
      return this.options.imageSize;
    },
    set: function(value) {
      return this.options.imageSize = value;
    }
  });

  PrototypeSlide.prototype.update = function() {
    var currentURL, i, j, len, ref, webView;
    ref = this.urls;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      currentURL = ref[i];
      webView = this.createWebView(currentURL);
      webView.x = this.screenView.children.length * (this.imageSize.width + this.imageSize.gap);
      webView.parent = this.screenView;
    }
    this.screenView.width = this.screenView.children.length * (this.imageSize.width + this.imageSize.gap) - this.imageSize.gap;
    this.screenView.height = this.imageSize.height;
    return this.screenView.center();
  };

  PrototypeSlide.prototype.createWebView = function(webURL) {
    var contentView, view;
    view = new Layer({
      width: this.imageSize.width,
      height: this.imageSize.height,
      name: "webview",
      backgroundColor: null,
      borderRadius: this.imageRadius,
      clip: true
    });
    contentView = new Layer({
      parent: view,
      width: this.imageSize.width,
      height: this.imageSize.height,
      backgroundColor: null,
      html: "<iframe style='position: absolute; width: 100%; height: 100%;' src='" + webURL + "'></iframe>",
      ignoreEvents: false,
      clip: true
    });
    return view;
  };

  return PrototypeSlide;

})(Slide);


},{"PCSVG":"PCSVG"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9QcmVzZW50YXRpb25Db21wb25lbnQvUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMTkgW3ByZXNlbnRhdGlvbl0gTmF2aWdhdGlvbiBWaWV3IOKAlCBEZW1vLmZyYW1lci9tb2R1bGVzL1ByZXNlbnRhdGlvbkNvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJlc2VudGF0aW9uQ29tcG9uZW50L1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTE5IFtwcmVzZW50YXRpb25dIE5hdmlnYXRpb24gVmlldyDigJQgRGVtby5mcmFtZXIvbW9kdWxlcy9QQ1NWRy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgUHJlc2VudGF0aW9uIENvbXBvbmVudFxuXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG4jIFByZXNlbnRhdGlvblxuXG5jbGFzcyBleHBvcnRzLlByZXNlbnRhdGlvbiBleHRlbmRzIFBhZ2VDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRAZ2FwID0gNTZcblx0XHRAX3RoZW1lID0gXCJcIlxuXHRcdFxuXHRcdEBjYW52YXMgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRuYW1lOiBcImNhbnZhc1wiXG5cdFx0QGNhbnZhcy5zdGF0ZXMgPVxuXHRcdFx0XCJ3aW5kb3dcIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCIgfVxuXHRcdFxuXHRcdEB0b3BWaWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQGNhbnZhcy53aWR0aCwgaGVpZ2h0OiBAZ2FwLCBuYW1lOiBcInRvcFZpZXdcIlxuXHRcdFxuXHRcdEBib3R0b21WaWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQGNhbnZhcy53aWR0aCwgaGVpZ2h0OiBAZ2FwLCBuYW1lOiBcImJvdHRvbVZpZXdcIiwgeTogQWxpZ24uYm90dG9tXG5cdFx0XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHBhcmVudDogQGNhbnZhc1xuXHRcdFx0d2lkdGg6IDE0MDAgKiAyXG5cdFx0XHRoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogdHJ1ZVxuIyBcdFx0XHRjbGlwOiBmYWxzZVxuXHRcdFx0XG5cdFx0XHR0aXRsZTogXCJcIlxuXHRcdFx0Z2FwOiBAZ2FwICogMlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0Zm9yIGl0ZW0gaW4gW0B0b3BWaWV3LCBAYm90dG9tVmlld11cblx0XHRcdGl0ZW0ucGFyZW50ID0gQHBhcmVudFxuXHRcdFx0aXRlbS5zZW5kVG9CYWNrKClcblx0XHRcdGl0ZW0uYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdFx0aXRlbS5zdGF0ZXMgPVxuXHRcdFx0XHRcIndpbmRvd1wiOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFx0XHRcImZ1bGxzY3JlZW5cIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwid2luZG93XCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFxuXHRcdEBpbml0R2VuZXJhbCgpXG5cdFx0QGluaXRQYWdlQ2hhbmdlKClcblx0XHRAaW5pdFNpemVDaGFuZ2UoKVxuXHRcdEBpbml0U2NhbGUoKVxuXHRcdEBpbml0U2hvcnRjdXRzKClcblx0XHRcblx0XHRcblx0XHQjIFRvcCBWaWV3XG5cdFx0QGxvZ29CdXR0b24gPSBuZXcgUENTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwibG9nb1wiXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzIsIGFzc2V0OiBTVkcubG9nb0ljb25cblx0XHRcdGhhbmRsZXI6IEBvcGVuVVJMSG9tZVxuXHRcdFxuXHRcdEB0aXRsZVRleHQgPSBuZXcgUENUZXh0XG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcInRpdGxlXCJcblx0XHRcdHRleHQ6IEB0aXRsZSwgdGV4dEFsaWduOiBcImNlbnRlclwiLCB5OiBBbGlnbi5jZW50ZXJcbiMgXHRcdFx0eDogQWxpZ24uY2VudGVyLCB3aWR0aDogQHRvcFZpZXcud2lkdGggLyAyXG5cdFx0XG5cdFx0QGNvcHlCdXR0b24gPSBuZXcgUENDb3B5QnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImNvcHkgbGlua1wiXG5cdFx0XHR0ZXh0OiBcIkNvcHkgTGlua1wiLCB0ZXh0QWxpZ246IFwicmlnaHRcIiwgeTogQWxpZ24uY2VudGVyXG4jIFx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMi0yMC0yNCksICwgd2lkdGg6IEBib3R0b21WaWV3LndpZHRoIC8gNFxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0zMi0yMC0yNCB9XG5cdFx0XG5cdFx0QGZ1bGxzY3JlZW5CdXR0b24gPSBuZXcgUENTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiZnVsbHNjcmVlblwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcbiMgXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0d2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCBhc3NldDogU1ZHLmZ1bGxzY3JlZW5JY29uXG5cdFx0XHRoYW5kbGVyOiBAY2hhbmdlU2NhbGVcblx0XHRcdGN1c3RvbTogeyB4OiAtMzIgfVxuXHRcdFxuXHRcdCMgQm90dG9tIFZpZXdcblx0XHRAc2xpZGVDaGFuZ2VyVmlldyA9IG5ldyBQQ1NsaWRlQ2hhbmdlclxuXHRcdFx0cGFyZW50OiBAYm90dG9tVmlldywgbmFtZTogXCJzbGlkZSBjaGFuZ2VyXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcdEByZXN0YXJ0QnV0dG9uID0gbmV3IFBDQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInJlc3RhcnRcIlxuXHRcdFx0dGV4dDogXCJSZXN0YXJ0IChSKVwiLCB0ZXh0QWxpZ246IFwicmlnaHRcIlxuIyBcdFx0XHR3aWR0aDogQGJvdHRvbVZpZXcud2lkdGggLyA0XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMjAwMCksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGFuZGxlcjogQHJlc3RhcnRIYW5kbGVyXG5cdFx0XHRjdXN0b206IHsgeDogLTIwMDAgfVxuXHRcdFxuXHRcdEB1cGRhdGVTaXplKEBjYW52YXMpXG5cdFxuXHRcblx0XG5cdEBkZWZpbmUgJ3RpdGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2RldmljZUNhbnZhcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5kZXZpY2VDYW52YXNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZGV2aWNlQ2FudmFzID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dhcCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5nYXBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ2FwID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ190aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5fdGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuX3RoZW1lID0gdmFsdWVcblx0XG5cdFxuXHRcblx0aW5pdFNob3J0Y3V0czogKCkgPT5cblx0XHRsb2NhbFNjcm9sbCA9IEBcblx0XHRcblx0XHRFdmVudHMud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cblx0XHRcdGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd0xlZnRcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5zbmFwVG9OZXh0UGFnZShcImxlZnRcIiwgZmFsc2UpXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd1JpZ2h0XCJcblx0XHRcdFx0bG9jYWxTY3JvbGwuc25hcFRvTmV4dFBhZ2UoXCJyaWdodFwiLCBmYWxzZSlcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUNcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5jb3B5QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5RlwiXG5cdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlSXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwucmVzdGFydEJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIkVzY2FwZVwiXG5cdFx0XHRcdGlmIGxvY2FsU2Nyb2xsLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcblx0XG5cdGluaXRTY2FsZTogKGZvclN0YXRlID0gXCJ3aW5kb3dcIikgPT5cblx0XHRzbGlkZUdhcCA9IDEyMFxuXHRcdFxuXHRcdHNjYWxlWCA9IChAY2FudmFzLndpZHRoIC0gc2xpZGVHYXAgLyA2KSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChAY2FudmFzLmhlaWdodCAtIHNsaWRlR2FwKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLndpbmRvdy5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuIyBcdFx0cHJpbnQgTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFx0XG5cdFx0c2NhbGVYID0gQGNhbnZhcy53aWR0aCAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IEBjYW52YXMuaGVpZ2h0IC8gQGhlaWdodFxuXHRcdEBzdGF0ZXMuZnVsbHNjcmVlbi5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdEBzdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRAY2FudmFzLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdEBjZW50ZXIoKVxuXHRcblx0XG5cdFxuXHRcblx0Y2hhbmdlU2NhbGU6ICgpID0+XG5cdFx0XG5cdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJ3aW5kb3dcIiB0aGVuIG5leHRTdGF0ZSA9IFwiZnVsbHNjcmVlblwiXG5cdFx0ZWxzZSBuZXh0U3RhdGUgPSBcIndpbmRvd1wiXG5cdFx0XG5cdFx0QGFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGNhbnZhcy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEB0b3BWaWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGJvdHRvbVZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cblx0cmVzdGFydEhhbmRsZXI6ICgpID0+XG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bMF0sIGZhbHNlKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRpbml0R2VuZXJhbDogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5kaXNhYmxlKClcblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblx0XHRcblx0XHRsb2NhbCA9IEBcblx0XHRgXG5cdFx0Y29uc3QgcHJlZmVyc0RhcmtTY2hlbWUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpO1xuXHRcdGlmIChwcmVmZXJzRGFya1NjaGVtZS5tYXRjaGVzKSB7IGxvY2FsLl90aGVtZSA9IFwiZGFya1wiIH1cblx0XHRlbHNlIHsgbG9jYWwuX3RoZW1lID0gXCJsaWdodFwiIH1cblx0XHRgXG5cdFx0bG9jYWwuX3RoZW1lXG5cdFx0XG5cdFxuXHRpbml0UGFnZUNoYW5nZTogKCkgPT5cblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgLT5cblx0XHRcdGZvciBpdGVtLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRcdEBzbGlkZUNoYW5nZXJWaWV3LmN1cnJlbnQgPSAoaW5kZXggKyAxKVxuXHRcdFx0XHRcdHJldHVyblxuIyBcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShAY3VycmVudFBhZ2UubmFtZSwgXCIje0BjdXJyZW50UGFnZS5uYW1lfVwiLCBcIj9wYWdlPTFcIilcbiMgXHRcdFx0cHJpbnQgQGN1cnJlbnRQYWdlXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdEBwYXJlbnQuc2xpZGVDaGFuZ2VyVmlldy5wYWdlcyA9IEBjaGlsZHJlbi5sZW5ndGhcblx0XG5cdFxuXHRpbml0U2l6ZUNoYW5nZTogKCkgPT5cblx0XHRsb2NhbCA9IEBcblx0XHRcblx0XHRsb2NhbC5wYXJlbnQub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsLnVwZGF0ZVNpemUobG9jYWwucGFyZW50KVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHVwZGF0ZVNpemU6IChhbmNob3IpID0+XG5cdFx0IyB3aWR0aFxuXHRcdEBwYXJlbnQud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcblx0XHRAdG9wVmlldy53aWR0aCA9IGFuY2hvci53aWR0aFxuXHRcdFxuXHRcdGlmIEBjYW52YXMud2lkdGggPCA3NDBcblx0XHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEB0aXRsZVRleHQueSA9IEFsaWduLnRvcChAdG9wVmlldy5oZWlnaHQgKyAxMClcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEBjb3B5QnV0dG9uLnkgPSBBbGlnbi50b3AoQHRvcFZpZXcuaGVpZ2h0ICsgMzYpXG5cdFx0ZWxzZVxuXHRcdFx0QHRpdGxlVGV4dC54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRAdGl0bGVUZXh0LnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLnJpZ2h0KEBjb3B5QnV0dG9uLmN1c3RvbS54KVxuXHRcdFx0QGNvcHlCdXR0b24ueSA9IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uLnggPSBBbGlnbi5yaWdodChAZnVsbHNjcmVlbkJ1dHRvbi5jdXN0b20ueClcblx0XHRcblx0XHRAYm90dG9tVmlldy53aWR0aCA9IGFuY2hvci53aWR0aFxuXHRcdEBzbGlkZUNoYW5nZXJWaWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XHQjIGhlaWdodFxuXHRcdEBwYXJlbnQuaGVpZ2h0ID0gYW5jaG9yLmhlaWdodFxuXHRcdEBib3R0b21WaWV3LnkgPSBBbGlnbi5ib3R0b21cblx0XHRcblx0XHRAaW5pdFNjYWxlKEBzdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcdFxuXHRcdFxuXHRcblx0XG5cdHdpdGhJbWFnZXM6IChpbWFnZXMsIG5hbWVkID0gXCJcIikgPT5cblx0XHRyZXR1cm4gbmV3IFNjcmVlblNsaWRlXG5cdFx0XHRpbWFnZXM6IGltYWdlcywgZGVzY3JpcHRpb25zOiBbXSwgdGl0bGU6IG5hbWVkLCBwYXJlbnQ6IEBjb250ZW50XG5cdFx0XHR4OiBAY29udGVudC5jaGlsZHJlbi5sZW5ndGggKiAoQHdpZHRoICsgQGdhcClcblx0XG5cdHdpdGhQcm90b3R5cGVzOiAodXJscywgbmFtZWQgPSBcIlwiKSA9PlxuXHRcdHJldHVybiBuZXcgUHJvdG90eXBlU2xpZGVcblx0XHRcdHVybHM6IHVybHMsIGRlc2NyaXB0aW9uczogW10sIHRpdGxlOiBuYW1lZCwgcGFyZW50OiBAY29udGVudFxuXHRcdFx0eDogQGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoICogKEB3aWR0aCArIEBnYXApXG5cdFxuXHRcblx0b3BlblVSTDogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCIsIGlzQmxhbmsgPSBmYWxzZSkgPT5cblx0XHRpZiBpc0JsYW5rIHRoZW4gd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuXHRcdGVsc2VcbiMgXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIj9zbGlkZUlEXCJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybFxuXHRcblx0b3BlblVSTEhvbWU6ID0+XG5cdFx0QG9wZW5VUkwoXCJodHRwczovL3RpbGxsdXIucnVcIiwgdHJ1ZSlcblxuXG5cblxuXG5cbiMgU2xpZGVcblxuY2xhc3MgU2xpZGUgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyXG5cdFx0XHRoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdGJvcmRlclJhZGl1czogMTYgKiAyXG5cdFx0XHR0aXRsZTogXCJcIlxuXHRcdFx0XG5cdFx0XHRpbWFnZVJhZGl1czogNDJcblx0XHRcdGltYWdlU2l6ZTpcblx0XHRcdFx0d2lkdGg6IDM3NSAqIDJcblx0XHRcdFx0aGVpZ2h0OiA4MTIgKiAyXG5cdFx0XHRcdGdhcDogNjAgKiAyXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAbmFtZSA9IFwic2xpZGUgI3tAcGFyZW50LmNoaWxkcmVuLmxlbmd0aH1cIlxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICd0aXRsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbWFnZVJhZGl1cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbWFnZVJhZGl1c1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5pbWFnZVJhZGl1cyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbWFnZVNpemUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW1hZ2VTaXplXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmRlc2NyaXB0aW9ucyA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdG5hbWVkOiAodGl0bGUpID0+XG5cdFx0QHRpdGxlID0gdGl0bGVcblx0XHRyZXR1cm4gQFxuXHRcblxuXG5cbiMgVGV4dCwgQnV0dG9uXG5cbiMgZm9udEF2ZXJpYSA9IFV0aWxzLmxvYWRXZWJGb250KFwiQXZlcmlhIFNlcmlmIExpYnJlXCIsIDcwMCkgIyBiYXNlIChiYWQgbnVtYmVycylcbiMgZm9udEF2ZXJpYSA9IFV0aWxzLmxvYWRXZWJGb250KFwiRnJlZG9rYVwiLCA2MDApICMgY29taXNjXG5mb250QXZlcmlhID0gVXRpbHMubG9hZFdlYkZvbnQoXCJOdW5pdG9cIiwgODAwKVxuXG5jbGFzcyBQQ1RleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuMlxuXHRcdFx0dGV4dE92ZXJmbG93OiBcImVsbGlwc2lzXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblxuY2xhc3MgUENCdXR0b24gZXh0ZW5kcyBQQ1RleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cblxuXG4jIEJ1dHRvbjogU1ZHXG5cbmNsYXNzIFBDU1ZHQnV0dG9uIGV4dGVuZHMgUENCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0YXNzZXQ6IG51bGxcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRhdXRvU2l6ZTogZmFsc2Vcblx0XHRcblx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcblx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcblx0QGRlZmluZSAnYXNzZXQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFzc2V0ID0gdmFsdWVcblx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cblx0XHRcdFx0XCJvbkxpZ2h0XCI6IHsgc3ZnOiB2YWx1ZS5vbkxpZ2h0IH1cblx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcblx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cblx0XHRAc3ZnU2hhcGUud2lkdGggPSBAd2lkdGhcblx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuIyBCdXR0b246IENvcHlcblxuY2xhc3MgUENDb3B5QnV0dG9uIGV4dGVuZHMgUENCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIucnVcIlxuXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG5cdFx0QGFyZWEgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAYXJlYS5wYXJlbnQgPSBAXG5cdFxuXHRcblx0QGRlZmluZSAnbGluaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcblx0dXBkYXRlOiAobGluaykgPT5cblx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcblx0Y29weUhhbmRsZXI6ID0+XG5cdFx0dGV4dERpdiA9IEBhcmVhLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3B5dGV4dGFyZWEtY2xhc3MnKVxuXHRcdHRleHREaXYuZm9jdXMoKVxuXHRcdHRleHREaXYuc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcblx0XHRcblx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG5cdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG5cdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHRleHQgPSBvcmlnaW5UaXRsZVxuXG5cblxuXG5cblxuXG5cblxuIyBQYWdlIENoYW5nZXJcblxuY2xhc3MgUENTbGlkZUNoYW5nZXIgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJwcm9ncmVzcyB2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDEyMFxuXHRcdFx0aGVpZ2h0OiA1NlxuXHRcdFx0cGFnZXM6IDFcblx0XHRcdGN1cnJlbnQ6IDFcblx0XHRcblx0XHRAY3VycmVudFRleHQgPSBuZXcgUENUZXh0XG5cdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCIsIHdpZHRoOiAxMjAsIGxldHRlclNwYWNpbmc6IDNcbiMgXHRcdFx0Zm9udEZhbWlseTogVXRpbHMubG9hZFdlYkZvbnQoXCJDb3VyaWVyIFByaW1lXCIpXG4jIFx0XHRcdGZvbnRGYW1pbHk6IFV0aWxzLmxvYWRXZWJGb250KFwiU2Fuc2l0YVwiLCA3MDApXG5cdFx0QHByZXZCdXR0b24gPSBuZXcgUENTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwicHJldlwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcucHJldkljb25cblx0XHRAbmV4dEJ1dHRvbiA9IG5ldyBQQ1NWR0J1dHRvblxuXHRcdFx0bmFtZTogXCJuZXh0XCIsIHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgYXNzZXQ6IFNWRy5uZXh0SWNvblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QGN1cnJlbnRUZXh0LnBhcmVudCA9IEBcblx0XHRAY3VycmVudFRleHQueSA9IEFsaWduLmNlbnRlcigtMSlcblx0XHRAY3VycmVudFRleHQuc3R5bGUgPVxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCJ0bnVtXCJcblx0XHRcdFwiZm9udC12YXJpYW50LW51bWVyaWNcIjogXCJ0YWJ1bGFyLW51bXMgbGluaW5nLW51bXNcIlxuXHRcdFxuXHRcdEBwcmV2QnV0dG9uLnBhcmVudCA9IEBcblx0XHRAcHJldkJ1dHRvbi54ID0gQWxpZ24ubGVmdFxuXHRcdEBwcmV2QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XHRAbmV4dEJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QG5leHRCdXR0b24ueCA9IEFsaWduLnJpZ2h0XG5cdFx0QG5leHRCdXR0b24ueSA9IEFsaWduLmNlbnRlclxuXHRcblx0XG5cdEBkZWZpbmUgJ3BhZ2VzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBhZ2VzXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5wYWdlcyA9IHZhbHVlXG5cdFx0XHRAY3VycmVudFRleHQudGV4dCA9IFwiI3tAY3VycmVudH0vI3tAcGFnZXN9XCJcblx0XG5cdEBkZWZpbmUgJ2N1cnJlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY3VycmVudFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuY3VycmVudCA9IHZhbHVlXG5cdFx0XHRAY3VycmVudFRleHQudGV4dCA9IFwiI3tAY3VycmVudH0vI3tAcGFnZXN9XCJcblxuXG5cbiMgU2xpZGU6IFNjcmVlbnNcblxuY2xhc3MgU2NyZWVuU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRpbWFnZXM6IFtdXG5cdFx0XHRkZXNjcmlwdGlvbnM6IFtdXG5cdFx0XG5cdFx0QHNjcmVlblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwic2NyZWVuc1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAc2NyZWVuVmlldy5wYXJlbnQgPSBAXG5cdFx0QHVwZGF0ZSgpXG5cdFxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICdpbWFnZXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW1hZ2VzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmltYWdlcyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdkZXNjcmlwdGlvbnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZGVzY3JpcHRpb25zXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmRlc2NyaXB0aW9ucyA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdHVwZGF0ZTogKCkgPT5cblx0XHRmb3IgaW1hZ2UgaW4gQGltYWdlc1xuXHRcdFx0bmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQHNjcmVlblZpZXdcblx0XHRcdFx0d2lkdGg6IEBpbWFnZVNpemUud2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdFx0XHR4OiBAc2NyZWVuVmlldy5jaGlsZHJlbi5sZW5ndGggKiAoQGltYWdlU2l6ZS53aWR0aCArIEBpbWFnZVNpemUuZ2FwKVxuXHRcdFx0XHRuYW1lOiBcIiN7aW1hZ2Uuc3BsaXQoXCIvXCIpLnBvcCgpfVwiXG5cdFx0XHRcdGltYWdlOiBpbWFnZVxuXHRcdFx0XHRcblx0XHRcblx0XHRAc2NyZWVuVmlldy53aWR0aCA9IEBzY3JlZW5WaWV3LmNoaWxkcmVuLmxlbmd0aCAqIChAaW1hZ2VTaXplLndpZHRoICsgQGltYWdlU2l6ZS5nYXApIC0gQGltYWdlU2l6ZS5nYXBcblx0XHRAc2NyZWVuVmlldy5oZWlnaHQgPSBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdEBzY3JlZW5WaWV3LmNlbnRlcigpXG5cblxuXG4jIFNsaWRlOiBQcm90b3R5cGVcblxuY2xhc3MgUHJvdG90eXBlU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR1cmxzOiBbXVxuXHRcdFxuXHRcdEBzY3JlZW5WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInNjcmVlbnNcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHNjcmVlblZpZXcucGFyZW50ID0gQFxuXHRcdEB1cGRhdGUoKVxuXHRcblx0XG5cdFxuXHRcblx0QGRlZmluZSAndXJscycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy51cmxzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnVybHMgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2ltYWdlU2l6ZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbWFnZVNpemVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW1hZ2VTaXplID0gdmFsdWVcblx0XG4jIFx0d2l0aFVSTDogKHVybCkgPT5cbiMgXHRcdEB1cmxzLnB1c2ggdXJsXG5cdFxuXHR1cGRhdGU6ICgpID0+XG5cdFx0Zm9yIGN1cnJlbnRVUkwsIGkgaW4gQHVybHNcblx0XHRcdHdlYlZpZXcgPSBAY3JlYXRlV2ViVmlldyhjdXJyZW50VVJMKVxuXHRcdFx0d2ViVmlldy54ID0gQHNjcmVlblZpZXcuY2hpbGRyZW4ubGVuZ3RoICogKEBpbWFnZVNpemUud2lkdGggKyBAaW1hZ2VTaXplLmdhcClcblx0XHRcdHdlYlZpZXcucGFyZW50ID0gQHNjcmVlblZpZXdcblx0XHRcblx0XHRAc2NyZWVuVmlldy53aWR0aCA9IEBzY3JlZW5WaWV3LmNoaWxkcmVuLmxlbmd0aCAqIChAaW1hZ2VTaXplLndpZHRoICsgQGltYWdlU2l6ZS5nYXApIC0gQGltYWdlU2l6ZS5nYXBcblx0XHRAc2NyZWVuVmlldy5oZWlnaHQgPSBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdEBzY3JlZW5WaWV3LmNlbnRlcigpXG5cdFxuXHRcblx0Y3JlYXRlV2ViVmlldzogKHdlYlVSTCkgPT5cblx0XHRcblx0XHR2aWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdFx0bmFtZTogXCJ3ZWJ2aWV3XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYm9yZGVyUmFkaXVzOiBAaW1hZ2VSYWRpdXNcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRjb250ZW50VmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB2aWV3XG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRodG1sOiBcIjxpZnJhbWUgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsnIHNyYz0nI3t3ZWJVUkx9Jz48L2lmcmFtZT5cIlxuXHRcdFx0aWdub3JlRXZlbnRzOiBmYWxzZSwgY2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHJldHVybiB2aWV3XG5cblxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmNvbG9yX29uRGFyayA9IFwiI2ZmZlwiXG5jb2xvcl9vbkxpZ2h0ID0gXCIjMDAwXCJcblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuXG5leHBvcnRzLmxvZ29JY29uID0geyBvbkRhcms6IGdldExvZ28oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0TG9nbyhjb2xvcl9vbkxpZ2h0KX1cblxuXG5cbmdldEZ1bGxzY3JlZW4gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMTEuMDQxIDIuOTIxNjRDMTEuMDQxIDMuNDQ0NzMgMTEuNDIyNSAzLjgzNDk4IDExLjk1MzMgMy44MzQ5OEgxMi41NDIzTDE1LjExMzUgMy42NjA2MUwxMy4wOTggNS41Nzg2MkwxMC43MDkyIDcuOTUzM0MxMC41MjY3IDguMTI3NjYgMTAuNDQzOCA4LjM1MTg0IDEwLjQ0MzggOC41OTI2M0MxMC40NDM4IDkuMTU3MjQgMTAuODI1MyA5LjU2NDA5IDExLjM4OTMgOS41NjQwOUMxMS42NDY0IDkuNTY0MDkgMTEuODcwNCA5LjQ2NDQ1IDEyLjA1MjkgOS4yOTAwOUwxNC40MzM0IDYuOTA3MTFMMTYuMzQxMSA0Ljg4MTE2TDE2LjE2NjkgNy40NzE3MlY4LjExOTM2QzE2LjE2NjkgOC42NDI0NSAxNi41NDg1IDkuMDQxIDE3LjA3OTMgOS4wNDFDMTcuNjEwMiA5LjA0MSAxOCA4LjY1MDc1IDE4IDguMTE5MzZWMy41MTExNkMxOCAyLjU1NjMxIDE3LjQ0NDMgMiAxNi40OTA0IDJMMTEuOTUzMyAyQzExLjQzMDggMiAxMS4wNDEgMi4zOTAyNCAxMS4wNDEgMi45MjE2NFpNMiAxMS44ODA2TDIgMTYuNDg4OEMyIDE3LjQ0MzcgMi41NTU3MyAxOCAzLjUwOTU5IDE4SDguMDQ2NjZDOC41NjkyMSAxOCA4Ljk1OTA1IDE3LjYwMTUgOC45NTkwNSAxNy4wNzg0QzguOTU5MDUgMTYuNTU1MyA4LjU3NzUgMTYuMTY1IDguMDQ2NjYgMTYuMTY1SDcuNDU3NzVMNC44ODY0NyAxNi4zMzk0TDYuOTAyMDIgMTQuNDIxNEw5LjI5MDgyIDEyLjA0NjdDOS40NzMzIDExLjg3MjMgOS41NTYyNSAxMS42NDgyIDkuNTU2MjUgMTEuMzk5MUM5LjU1NjI1IDEwLjgzNDUgOS4xNzQ3IDEwLjQyNzYgOC42MTA2OCAxMC40Mjc2QzguMzUzNTUgMTAuNDI3NiA4LjEyMTMxIDEwLjUyNzIgNy45NDcxMiAxMC43MDk5TDUuNTY2NjIgMTMuMDkyOUwzLjY1ODg5IDE1LjExODhMMy44MzMwNyAxMi41MjgzTDMuODMzMDcgMTEuODgwNkMzLjgzMzA3IDExLjM0OTIgMy40NTE1MyAxMC45NTkgMi45MjA2OCAxMC45NTlDMi4zODk4NCAxMC45NTkgMiAxMS4zNDkyIDIgMTEuODgwNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5mdWxsc2NyZWVuSWNvbiA9IHsgb25EYXJrOiBnZXRGdWxsc2NyZWVuKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldEZ1bGxzY3JlZW4oY29sb3Jfb25MaWdodCl9XG5cblxuXG5cbmdldE5leHQgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNC43OTY0IDEyLjc5MzFMOS41ODYyNyA4TDQuNzk2NCAzLjIwNjg3QzQuNDA2MDEgMi44MTYyMSA0LjQwNjIyIDIuMTgzMDQgNC43OTY4OCAxLjc5MjY1QzUuMTg3NTQgMS40MDIyNiA1LjgyMDcgMS40MDI0OCA2LjIxMTA5IDEuNzkzMTNMMTEuNzA3MyA3LjI5MzEzQzEyLjA5NzUgNy42ODM2IDEyLjA5NzUgOC4zMTY0IDExLjcwNzMgOC43MDY4N0w2LjIxMTA5IDE0LjIwNjlDNS44MjA3IDE0LjU5NzUgNS4xODc1NCAxNC41OTc3IDQuNzk2ODggMTQuMjA3M0M0LjQwNjIyIDEzLjgxNyA0LjQwNjAxIDEzLjE4MzggNC43OTY0IDEyLjc5MzFaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMubmV4dEljb24gPSB7IG9uRGFyazogZ2V0TmV4dChjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXROZXh0KGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFByZXYgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNi40MTc0OCA4TDExLjIwNzMgMTIuNzkzMUMxMS41OTc3IDEzLjE4MzggMTEuNTk3NSAxMy44MTcgMTEuMjA2OSAxNC4yMDczQzEwLjgxNjIgMTQuNTk3NyAxMC4xODMgMTQuNTk3NSA5Ljc5MjY1IDE0LjIwNjlMNC4yOTY0IDguNzA2ODdDMy45MDYyIDguMzE2NCAzLjkwNjIgNy42ODM2IDQuMjk2NCA3LjI5MzEzTDkuNzkyNjUgMS43OTMxM0MxMC4xODMgMS40MDI0OCAxMC44MTYyIDEuNDAyMjYgMTEuMjA2OSAxLjc5MjY1QzExLjU5NzUgMi4xODMwNCAxMS41OTc3IDIuODE2MjEgMTEuMjA3MyAzLjIwNjg3TDYuNDE3NDggOFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wcmV2SWNvbiA9IHsgb25EYXJrOiBnZXRQcmV2KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFByZXYoY29sb3Jfb25MaWdodCkgfVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURJQSxJQUFBOztBQUFBLFlBQUEsR0FBZTs7QUFDZixhQUFBLEdBQWdCOztBQUVoQixPQUFBLEdBQVUsU0FBQyxTQUFEO0FBQ1QsTUFBQTtFQUFBLGFBQUEsR0FBZ0I7QUFDaEIsU0FBTyw2a0JBQUEsR0FDdWQsYUFEdmQsR0FDcWUsbXVCQURyZSxHQUVrdEIsYUFGbHRCLEdBRWd1Qiw4VkFGaHVCLEdBRzZVLGFBSDdVLEdBRzJWLDhWQUgzVixHQUk2VSxhQUo3VSxHQUkyViw4VkFKM1YsR0FLNlUsYUFMN1UsR0FLMlYscXhCQUwzVixHQU1vd0IsYUFOcHdCLEdBTWt4QixxaUJBTmx4QixHQU9vaEIsYUFQcGhCLEdBT2tpQjtBQVRoaUI7O0FBYVYsT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFBRSxNQUFBLEVBQVEsT0FBQSxDQUFRLFlBQVIsQ0FBVjtFQUFpQyxPQUFBLEVBQVMsT0FBQSxDQUFRLGFBQVIsQ0FBMUM7OztBQUluQixhQUFBLEdBQWdCLFNBQUMsU0FBRDtBQUNmLE1BQUE7RUFBQSxhQUFBLEdBQWdCO0FBQ2hCLFNBQU8sbWxDQUFBLEdBQzY5QixhQUQ3OUIsR0FDMitCO0FBSG4rQjs7QUFPaEIsT0FBTyxDQUFDLGNBQVIsR0FBeUI7RUFBRSxNQUFBLEVBQVEsYUFBQSxDQUFjLFlBQWQsQ0FBVjtFQUF1QyxPQUFBLEVBQVMsYUFBQSxDQUFjLGFBQWQsQ0FBaEQ7OztBQUt6QixPQUFBLEdBQVUsU0FBQyxTQUFEO0FBQ1QsTUFBQTtFQUFBLGFBQUEsR0FBZ0I7QUFDaEIsU0FBTyxvYkFBQSxHQUM4VCxhQUQ5VCxHQUM0VTtBQUgxVTs7QUFPVixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUFFLE1BQUEsRUFBUSxPQUFBLENBQVEsWUFBUixDQUFWO0VBQWlDLE9BQUEsRUFBUyxPQUFBLENBQVEsYUFBUixDQUExQzs7O0FBSW5CLE9BQUEsR0FBVSxTQUFDLFNBQUQ7QUFDVCxNQUFBO0VBQUEsYUFBQSxHQUFnQjtBQUNoQixTQUFPLDZhQUFBLEdBQ3VULGFBRHZULEdBQ3FVO0FBSG5VOztBQU9WLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQUUsTUFBQSxFQUFRLE9BQUEsQ0FBUSxZQUFSLENBQVY7RUFBaUMsT0FBQSxFQUFTLE9BQUEsQ0FBUSxhQUFSLENBQTFDOzs7OztBRHBEbkIsSUFBQSxnSEFBQTtFQUFBOzs7O0FBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxPQUFSOztBQUlBLE9BQU8sQ0FBQzs7O0VBQ0Esc0JBQUMsT0FBRDtBQUNaLFFBQUE7SUFEYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7Ozs7OztJQUN0QixJQUFDLENBQUEsR0FBRCxHQUFPO0lBQ1AsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUVWLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxlQUFBLENBQ2I7TUFBQSxJQUFBLEVBQU0sUUFBTjtLQURhO0lBRWQsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLEdBQ0M7TUFBQSxRQUFBLEVBQVU7UUFBRSxlQUFBLEVBQWlCLE1BQW5CO09BQVY7TUFDQSxZQUFBLEVBQWM7UUFBRSxlQUFBLEVBQWlCLE1BQW5CO09BRGQ7O0lBR0QsSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLEtBQUEsQ0FDZDtNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQWY7TUFBc0IsTUFBQSxFQUFRLElBQUMsQ0FBQSxHQUEvQjtNQUFvQyxJQUFBLEVBQU0sU0FBMUM7S0FEYztJQUdmLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsS0FBQSxDQUNqQjtNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQWY7TUFBc0IsTUFBQSxFQUFRLElBQUMsQ0FBQSxHQUEvQjtNQUFvQyxJQUFBLEVBQU0sWUFBMUM7TUFBd0QsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFqRTtLQURpQjtJQUlsQixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BQVQ7TUFDQSxLQUFBLEVBQU8sSUFBQSxHQUFPLENBRGQ7TUFFQSxNQUFBLEVBQVEsR0FBQSxHQUFNLENBRmQ7TUFHQSxjQUFBLEVBQWdCLEtBSGhCO01BSUEsZ0JBQUEsRUFBa0IsSUFKbEI7TUFPQSxLQUFBLEVBQU8sRUFQUDtNQVFBLEdBQUEsRUFBSyxJQUFDLENBQUEsR0FBRCxHQUFPLENBUlo7S0FERDtJQVdBLDhDQUFNLElBQUMsQ0FBQSxPQUFQO0FBRUE7QUFBQSxTQUFBLHFDQUFBOztNQUNDLElBQUksQ0FBQyxNQUFMLEdBQWMsSUFBQyxDQUFBO01BQ2YsSUFBSSxDQUFDLFVBQUwsQ0FBQTtNQUNBLElBQUksQ0FBQyxlQUFMLEdBQXVCO01BQ3ZCLElBQUksQ0FBQyxNQUFMLEdBQ0M7UUFBQSxRQUFBLEVBQVU7VUFBRSxPQUFBLEVBQVMsQ0FBWDtTQUFWO1FBQ0EsWUFBQSxFQUFjO1VBQUUsT0FBQSxFQUFTLENBQVg7U0FEZDs7QUFMRjtJQVNBLElBQUMsQ0FBQSxNQUFELEdBQ0M7TUFBQSxRQUFBLEVBQVU7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQUFWO01BQ0EsWUFBQSxFQUFjO1FBQUUsS0FBQSxFQUFPLENBQVQ7T0FEZDs7SUFHRCxJQUFDLENBQUEsV0FBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGNBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxjQUFELENBQUE7SUFDQSxJQUFDLENBQUEsU0FBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGFBQUQsQ0FBQTtJQUlBLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsV0FBQSxDQUNqQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsT0FBVDtNQUFrQixJQUFBLEVBQU0sTUFBeEI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxFQUFYLENBREg7TUFDbUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUQ1QjtNQUVBLEtBQUEsRUFBTyxFQUZQO01BRVcsTUFBQSxFQUFRLEVBRm5CO01BRXVCLEtBQUEsRUFBTyxHQUFHLENBQUMsUUFGbEM7TUFHQSxPQUFBLEVBQVMsSUFBQyxDQUFBLFdBSFY7S0FEaUI7SUFNbEIsSUFBQyxDQUFBLFNBQUQsR0FBaUIsSUFBQSxNQUFBLENBQ2hCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxPQUFUO01BQWtCLElBQUEsRUFBTSxPQUF4QjtNQUNBLElBQUEsRUFBTSxJQUFDLENBQUEsS0FEUDtNQUNjLFNBQUEsRUFBVyxRQUR6QjtNQUNtQyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRDVDO0tBRGdCO0lBS2pCLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsWUFBQSxDQUNqQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsT0FBVDtNQUFrQixJQUFBLEVBQU0sV0FBeEI7TUFDQSxJQUFBLEVBQU0sV0FETjtNQUNtQixTQUFBLEVBQVcsT0FEOUI7TUFDdUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURoRDtNQUdBLE1BQUEsRUFBUTtRQUFFLENBQUEsRUFBRyxDQUFDLEVBQUQsR0FBSSxFQUFKLEdBQU8sRUFBWjtPQUhSO0tBRGlCO0lBTWxCLElBQUMsQ0FBQSxnQkFBRCxHQUF3QixJQUFBLFdBQUEsQ0FDdkI7TUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLE9BQVQ7TUFBa0IsSUFBQSxFQUFNLFlBQXhCO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURUO01BR0EsS0FBQSxFQUFPLEVBSFA7TUFHVyxNQUFBLEVBQVEsRUFIbkI7TUFHdUIsS0FBQSxFQUFPLEdBQUcsQ0FBQyxjQUhsQztNQUlBLE9BQUEsRUFBUyxJQUFDLENBQUEsV0FKVjtNQUtBLE1BQUEsRUFBUTtRQUFFLENBQUEsRUFBRyxDQUFDLEVBQU47T0FMUjtLQUR1QjtJQVN4QixJQUFDLENBQUEsZ0JBQUQsR0FBd0IsSUFBQSxjQUFBLENBQ3ZCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUFUO01BQXFCLElBQUEsRUFBTSxlQUEzQjtNQUNBLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEVDtLQUR1QjtJQUl4QixJQUFDLENBQUEsYUFBRCxHQUFxQixJQUFBLFFBQUEsQ0FDcEI7TUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFVBQVQ7TUFBcUIsSUFBQSxFQUFNLFNBQTNCO01BQ0EsSUFBQSxFQUFNLGFBRE47TUFDcUIsU0FBQSxFQUFXLE9BRGhDO01BR0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxJQUFiLENBSEg7TUFHdUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUhoQztNQUlBLE9BQUEsRUFBUyxJQUFDLENBQUEsY0FKVjtNQUtBLE1BQUEsRUFBUTtRQUFFLENBQUEsRUFBRyxDQUFDLElBQU47T0FMUjtLQURvQjtJQVFyQixJQUFDLENBQUEsVUFBRCxDQUFZLElBQUMsQ0FBQSxNQUFiO0VBekZZOztFQTZGYixZQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCO0lBQTVCLENBREw7R0FERDs7RUFJQSxZQUFDLENBQUEsTUFBRCxDQUFRLGNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULEdBQXdCO0lBQW5DLENBREw7R0FERDs7RUFJQSxZQUFDLENBQUEsTUFBRCxDQUFRLEtBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxHQUFULEdBQWU7SUFBMUIsQ0FETDtHQUREOztFQUlBLFlBQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0I7SUFBN0IsQ0FETDtHQUREOzt5QkFNQSxhQUFBLEdBQWUsU0FBQTtBQUNkLFFBQUE7SUFBQSxXQUFBLEdBQWM7V0FFZCxNQUFNLENBQUMsSUFBUCxDQUFZLE1BQVosQ0FBbUIsQ0FBQyxnQkFBcEIsQ0FBcUMsU0FBckMsRUFBZ0QsU0FBQyxLQUFEO01BQy9DLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxXQUFqQjtlQUNDLFdBQVcsQ0FBQyxjQUFaLENBQTJCLE1BQTNCLEVBQW1DLEtBQW5DLEVBREQ7T0FBQSxNQUVLLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxZQUFqQjtlQUNKLFdBQVcsQ0FBQyxjQUFaLENBQTJCLE9BQTNCLEVBQW9DLEtBQXBDLEVBREk7T0FBQSxNQUVBLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxNQUFqQjtlQUNKLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBdkIsQ0FBNEIsTUFBTSxDQUFDLEdBQW5DLEVBREk7T0FBQSxNQUVBLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxNQUFqQjtlQUNKLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUE3QixDQUFrQyxNQUFNLENBQUMsR0FBekMsRUFESTtPQUFBLE1BRUEsSUFBRyxLQUFLLENBQUMsSUFBTixLQUFjLE1BQWpCO2VBQ0osV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUExQixDQUErQixNQUFNLENBQUMsR0FBdEMsRUFESTtPQUFBLE1BRUEsSUFBRyxLQUFLLENBQUMsSUFBTixLQUFjLFFBQWpCO1FBQ0osSUFBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUEzQixLQUFtQyxZQUF0QztpQkFDQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBN0IsQ0FBa0MsTUFBTSxDQUFDLEdBQXpDLEVBREQ7U0FESTs7SUFYMEMsQ0FBaEQ7RUFIYzs7eUJBbUJmLFNBQUEsR0FBVyxTQUFDLFFBQUQ7QUFDVixRQUFBOztNQURXLFdBQVc7O0lBQ3RCLFFBQUEsR0FBVztJQUVYLE1BQUEsR0FBUyxDQUFDLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixHQUFnQixRQUFBLEdBQVcsQ0FBNUIsQ0FBQSxHQUFpQyxJQUFDLENBQUE7SUFDM0MsTUFBQSxHQUFTLENBQUMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLEdBQWlCLFFBQWxCLENBQUEsR0FBOEIsSUFBQyxDQUFBO0lBQ3hDLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQWYsR0FBdUIsSUFBSSxDQUFDLEdBQUwsQ0FBUyxNQUFULEVBQWlCLE1BQWpCO0lBSXZCLE1BQUEsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQVIsR0FBZ0IsSUFBQyxDQUFBO0lBQzFCLE1BQUEsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLE1BQVIsR0FBaUIsSUFBQyxDQUFBO0lBQzNCLElBQUMsQ0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQW5CLEdBQTJCLElBQUksQ0FBQyxHQUFMLENBQVMsTUFBVCxFQUFpQixNQUFqQjtJQUUzQixJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWI7SUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLFdBQVIsQ0FBb0IsUUFBcEI7V0FFQSxJQUFDLENBQUEsTUFBRCxDQUFBO0VBaEJVOzt5QkFxQlgsV0FBQSxHQUFhLFNBQUE7QUFFWixRQUFBO0lBQUEsSUFBRyxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFoQixLQUF3QixRQUEzQjtNQUF5QyxTQUFBLEdBQVksYUFBckQ7S0FBQSxNQUFBO01BQ0ssU0FBQSxHQUFZLFNBRGpCOztJQUdBLElBQUMsQ0FBQSxPQUFELENBQVMsU0FBVCxFQUFvQjtNQUFBLEtBQUEsRUFBTyxNQUFBLENBQU87UUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUFQLENBQVA7TUFBMkIsSUFBQSxFQUFNLEdBQWpDO0tBQXBCO0lBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLENBQWdCLFNBQWhCLEVBQTJCO01BQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTztRQUFBLE9BQUEsRUFBUyxDQUFUO09BQVAsQ0FBUDtNQUEyQixJQUFBLEVBQU0sR0FBakM7S0FBM0I7SUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsQ0FBaUIsU0FBakIsRUFBNEI7TUFBQSxLQUFBLEVBQU8sTUFBQSxDQUFPO1FBQUEsT0FBQSxFQUFTLENBQVQ7T0FBUCxDQUFQO01BQTJCLElBQUEsRUFBTSxHQUFqQztLQUE1QjtXQUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFvQixTQUFwQixFQUErQjtNQUFBLEtBQUEsRUFBTyxNQUFBLENBQU87UUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUFQLENBQVA7TUFBMkIsSUFBQSxFQUFNLEdBQWpDO0tBQS9CO0VBUlk7O3lCQVdiLGNBQUEsR0FBZ0IsU0FBQTtXQUNmLElBQUMsQ0FBQSxVQUFELENBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUE5QixFQUFrQyxLQUFsQztFQURlOzt5QkFRaEIsV0FBQSxHQUFhLFNBQUE7QUFDWixRQUFBO0lBQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBeEIsQ0FBQTtJQUNBLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7SUFDQSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFwQixHQUE2QjtJQUU3QixLQUFBLEdBQVE7SUFDUjs7Ozs7V0FLQSxLQUFLLENBQUM7RUFYTTs7eUJBY2IsY0FBQSxHQUFnQixTQUFBO0lBRWYsSUFBQyxDQUFBLEVBQUQsQ0FBSSxvQkFBSixFQUEwQixTQUFBO0FBQ3pCLFVBQUE7QUFBQTtBQUFBLFdBQUEscURBQUE7O1FBQ0MsSUFBRyxJQUFBLEtBQVEsSUFBQyxDQUFBLFdBQVo7VUFDQyxJQUFDLENBQUEsZ0JBQWdCLENBQUMsT0FBbEIsR0FBNkIsS0FBQSxHQUFRO0FBQ3JDLGlCQUZEOztBQUREO0lBRHlCLENBQTFCO1dBUUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksaUJBQVosRUFBK0IsU0FBQTthQUM5QixJQUFDLENBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQXpCLEdBQWlDLElBQUMsQ0FBQSxRQUFRLENBQUM7SUFEYixDQUEvQjtFQVZlOzt5QkFjaEIsY0FBQSxHQUFnQixTQUFBO0FBQ2YsUUFBQTtJQUFBLEtBQUEsR0FBUTtXQUVSLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBYixDQUFnQixjQUFoQixFQUFnQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFDL0IsS0FBSyxDQUFDLFVBQU4sQ0FBaUIsS0FBSyxDQUFDLE1BQXZCO01BRCtCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQztFQUhlOzt5QkFVaEIsVUFBQSxHQUFZLFNBQUMsTUFBRDtJQUVYLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixHQUFnQixNQUFNLENBQUM7SUFFdkIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCLE1BQU0sQ0FBQztJQUV4QixJQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixHQUFnQixHQUFuQjtNQUNDLElBQUMsQ0FBQSxTQUFTLENBQUMsQ0FBWCxHQUFlLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUF2QjtNQUNmLElBQUMsQ0FBQSxTQUFTLENBQUMsQ0FBWCxHQUFlLEtBQUssQ0FBQyxHQUFOLENBQVUsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCLEVBQTVCO01BRWYsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQyxJQUFOLENBQVcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUF2QjtNQUNoQixJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLEdBQU4sQ0FBVSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0IsRUFBNUIsRUFMakI7S0FBQSxNQUFBO01BT0MsSUFBQyxDQUFBLFNBQVMsQ0FBQyxDQUFYLEdBQWUsS0FBSyxDQUFDO01BQ3JCLElBQUMsQ0FBQSxTQUFTLENBQUMsQ0FBWCxHQUFlLEtBQUssQ0FBQztNQUVyQixJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUEvQjtNQUNoQixJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLE9BWHZCOztJQWFBLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxDQUFsQixHQUFzQixLQUFLLENBQUMsS0FBTixDQUFZLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBckM7SUFFdEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQW9CLE1BQU0sQ0FBQztJQUMzQixJQUFDLENBQUEsZ0JBQWdCLENBQUMsQ0FBbEIsR0FBc0IsS0FBSyxDQUFDO0lBRzVCLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixHQUFpQixNQUFNLENBQUM7SUFDeEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQztXQUV0QixJQUFDLENBQUEsU0FBRCxDQUFXLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTNCO0VBNUJXOzt5QkFpQ1osVUFBQSxHQUFZLFNBQUMsTUFBRCxFQUFTLEtBQVQ7O01BQVMsUUFBUTs7QUFDNUIsV0FBVyxJQUFBLFdBQUEsQ0FDVjtNQUFBLE1BQUEsRUFBUSxNQUFSO01BQWdCLFlBQUEsRUFBYyxFQUE5QjtNQUFrQyxLQUFBLEVBQU8sS0FBekM7TUFBZ0QsTUFBQSxFQUFRLElBQUMsQ0FBQSxPQUF6RDtNQUNBLENBQUEsRUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFsQixHQUEyQixDQUFDLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLEdBQVgsQ0FEOUI7S0FEVTtFQURBOzt5QkFLWixjQUFBLEdBQWdCLFNBQUMsSUFBRCxFQUFPLEtBQVA7O01BQU8sUUFBUTs7QUFDOUIsV0FBVyxJQUFBLGNBQUEsQ0FDVjtNQUFBLElBQUEsRUFBTSxJQUFOO01BQVksWUFBQSxFQUFjLEVBQTFCO01BQThCLEtBQUEsRUFBTyxLQUFyQztNQUE0QyxNQUFBLEVBQVEsSUFBQyxDQUFBLE9BQXJEO01BQ0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQWxCLEdBQTJCLENBQUMsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsR0FBWCxDQUQ5QjtLQURVO0VBREk7O3lCQU1oQixPQUFBLEdBQVMsU0FBQyxHQUFELEVBQTZCLE9BQTdCOztNQUFDLE1BQU07OztNQUFzQixVQUFVOztJQUMvQyxJQUFHLE9BQUg7YUFBZ0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaLEVBQWlCLFFBQWpCLEVBQWhCO0tBQUEsTUFBQTthQUdDLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLElBSG5COztFQURROzt5QkFNVCxXQUFBLEdBQWEsU0FBQTtXQUNaLElBQUMsQ0FBQSxPQUFELENBQVMsb0JBQVQsRUFBK0IsSUFBL0I7RUFEWTs7OztHQW5RcUI7O0FBNlE3Qjs7O0VBRVEsZUFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLGVBQUEsRUFBaUIsTUFBakI7TUFDQSxLQUFBLEVBQU8sSUFBQSxHQUFPLENBRGQ7TUFFQSxNQUFBLEVBQVEsR0FBQSxHQUFNLENBRmQ7TUFHQSxZQUFBLEVBQWMsRUFBQSxHQUFLLENBSG5CO01BSUEsS0FBQSxFQUFPLEVBSlA7TUFNQSxXQUFBLEVBQWEsRUFOYjtNQU9BLFNBQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxHQUFBLEdBQU0sQ0FBYjtRQUNBLE1BQUEsRUFBUSxHQUFBLEdBQU0sQ0FEZDtRQUVBLEdBQUEsRUFBSyxFQUFBLEdBQUssQ0FGVjtPQVJEO0tBREQ7SUFhQSx1Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUMsQ0FBQSxJQUFELEdBQVEsUUFBQSxHQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDO0VBaEJ0Qjs7RUFvQmIsS0FBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQjtJQUE1QixDQURMO0dBREQ7O0VBSUEsS0FBQyxDQUFBLE1BQUQsQ0FBUSxhQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxHQUF1QjtJQUFsQyxDQURMO0dBREQ7O0VBSUEsS0FBQyxDQUFBLE1BQUQsQ0FBUSxXQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxHQUF3QjtJQUFuQyxDQURMO0dBREQ7O2tCQU1BLEtBQUEsR0FBTyxTQUFDLEtBQUQ7SUFDTixJQUFDLENBQUEsS0FBRCxHQUFTO0FBQ1QsV0FBTztFQUZEOzs7O0dBcENZOztBQStDcEIsVUFBQSxHQUFhLEtBQUssQ0FBQyxXQUFOLENBQWtCLFFBQWxCLEVBQTRCLEdBQTVCOztBQUVQOzs7RUFDUSxnQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsVUFBQSxFQUFZLFVBQVo7TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLEtBQUEsRUFBTyxPQUZQO01BR0EsTUFBQSxFQUFRLEVBSFI7TUFJQSxhQUFBLEVBQWUsR0FKZjtNQUtBLGFBQUEsRUFBZSxHQUxmO01BTUEsWUFBQSxFQUFjLFVBTmQ7S0FERDtJQVNBLHdDQUFNLElBQUMsQ0FBQSxPQUFQO0VBWFk7Ozs7R0FETzs7QUFnQmY7OztFQUNRLGtCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE9BQUEsRUFBUyxHQUFUO01BQ0EsT0FBQSxFQUFTLElBRFQ7S0FERDtJQUlBLDBDQUFNLElBQUMsQ0FBQSxPQUFQO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLE1BQUEsRUFBUSxTQUFSOztJQUVULElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEtBQWY7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0VBVlk7O3FCQVliLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLE9BQUQsR0FBVztFQURMOztxQkFFUCxRQUFBLEdBQVUsU0FBQTtXQUNULElBQUMsQ0FBQSxPQUFELEdBQVc7RUFERjs7RUFJVixRQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxHQUFYLEVBQWdCLEtBQWhCO0lBQVgsQ0FBTDtHQUREOzs7O0dBbkJzQjs7QUEyQmpCOzs7RUFDUSxxQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLElBQUEsRUFBTSxFQUFOO01BQ0EsS0FBQSxFQUFPLElBRFA7TUFFQSxJQUFBLEVBQU0sS0FGTjtNQUdBLFFBQUEsRUFBVSxLQUhWO0tBREQ7SUFNQSxJQUFDLENBQUEsUUFBRCxHQUFnQixJQUFBLFFBQUEsQ0FDZjtNQUFBLGVBQUEsRUFBaUIsTUFBakI7TUFBeUIsSUFBQSxFQUFNLFVBQS9CO0tBRGU7SUFHaEIsNkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsR0FBbUI7SUFDbkIsSUFBQyxDQUFBLGFBQUQsQ0FBQTtFQWJZOztFQWdCYixXQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCO01BQ2pCLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixHQUNDO1FBQUEsUUFBQSxFQUFVO1VBQUUsR0FBQSxFQUFLLEtBQUssQ0FBQyxNQUFiO1NBQVY7UUFDQSxTQUFBLEVBQVc7VUFBRSxHQUFBLEVBQUssS0FBSyxDQUFDLE9BQWI7U0FEWDs7YUFFRCxJQUFDLENBQUEsUUFBUSxDQUFDLFdBQVYsQ0FBc0IsUUFBdEI7SUFMSSxDQURMO0dBREQ7O3dCQVNBLGFBQUEsR0FBZSxTQUFBO0lBQ2QsSUFBQyxDQUFBLFFBQVEsQ0FBQyxLQUFWLEdBQWtCLElBQUMsQ0FBQTtXQUNuQixJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsR0FBbUIsSUFBQyxDQUFBO0VBRk47Ozs7R0ExQlU7O0FBaUNwQjs7O0VBQ1Esc0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsSUFBQSxFQUFNLG9CQUFOO01BQ0EsT0FBQSxFQUFTLElBQUMsQ0FBQSxXQURWO0tBREQ7SUFJQSxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsS0FBQSxDQUNYO01BQUEsT0FBQSxFQUFTLENBQVQ7TUFBWSxDQUFBLEVBQUcsQ0FBQyxJQUFoQjtNQUFzQixJQUFBLEVBQU0sSUFBNUI7S0FEVztJQUdaLDhDQUFNLElBQUMsQ0FBQSxPQUFQO0lBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWU7RUFWSDs7RUFhYixZQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEdBQWdCO2FBQ2hCLElBQUMsQ0FBQSxNQUFELENBQVEsS0FBUjtJQUZJLENBREw7R0FERDs7eUJBT0EsTUFBQSxHQUFRLFNBQUMsSUFBRDtXQUNQLElBQUMsQ0FBQSxJQUFJLENBQUMsSUFBTixHQUFhLDZEQUFBLEdBQThELElBQTlELEdBQW1FO0VBRHpFOzt5QkFJUixXQUFBLEdBQWEsU0FBQTtBQUNaLFFBQUE7SUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLElBQUksQ0FBQyxhQUFOLENBQW9CLHdCQUFwQjtJQUNWLE9BQU8sQ0FBQyxLQUFSLENBQUE7SUFDQSxPQUFPLENBQUMsTUFBUixDQUFBO0lBQ0EsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsTUFBckI7SUFFQSxXQUFBLEdBQWMsSUFBQyxDQUFBO0lBQ2YsSUFBQyxDQUFBLElBQUQsR0FBUTtXQUNSLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBWixFQUFlLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtlQUFHLEtBQUMsQ0FBQSxJQUFELEdBQVE7TUFBWDtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBZjtFQVJZOzs7O0dBekJhOztBQTZDckI7OztFQUVRLHdCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxJQUFBLEVBQU0sZUFBTjtNQUNBLGVBQUEsRUFBaUIsSUFEakI7TUFFQSxLQUFBLEVBQU8sR0FGUDtNQUdBLE1BQUEsRUFBUSxFQUhSO01BSUEsS0FBQSxFQUFPLENBSlA7TUFLQSxPQUFBLEVBQVMsQ0FMVDtLQUREO0lBUUEsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxNQUFBLENBQ2xCO01BQUEsU0FBQSxFQUFXLFFBQVg7TUFBcUIsS0FBQSxFQUFPLEdBQTVCO01BQWlDLGFBQUEsRUFBZSxDQUFoRDtLQURrQjtJQUluQixJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFdBQUEsQ0FDakI7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUFjLEtBQUEsRUFBTyxFQUFyQjtNQUF5QixNQUFBLEVBQVEsRUFBakM7TUFBcUMsS0FBQSxFQUFPLEdBQUcsQ0FBQyxRQUFoRDtLQURpQjtJQUVsQixJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFdBQUEsQ0FDakI7TUFBQSxJQUFBLEVBQU0sTUFBTjtNQUFjLEtBQUEsRUFBTyxFQUFyQjtNQUF5QixNQUFBLEVBQVEsRUFBakM7TUFBcUMsS0FBQSxFQUFPLEdBQUcsQ0FBQyxRQUFoRDtLQURpQjtJQUdsQixnREFBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixHQUFzQjtJQUN0QixJQUFDLENBQUEsV0FBVyxDQUFDLENBQWIsR0FBaUIsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLENBQWQ7SUFDakIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLEdBQ0M7TUFBQSx1QkFBQSxFQUF5QixNQUF6QjtNQUNBLHNCQUFBLEVBQXdCLDBCQUR4Qjs7SUFHRCxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUI7SUFDckIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQztJQUN0QixJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDO0lBRXRCLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFxQjtJQUNyQixJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDO0lBQ3RCLElBQUMsQ0FBQSxVQUFVLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUM7RUFqQ1Y7O0VBb0NiLGNBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUI7YUFDakIsSUFBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLEdBQXVCLElBQUMsQ0FBQSxPQUFGLEdBQVUsR0FBVixHQUFhLElBQUMsQ0FBQTtJQUZoQyxDQURMO0dBREQ7O0VBTUEsY0FBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxHQUFtQjthQUNuQixJQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsR0FBdUIsSUFBQyxDQUFBLE9BQUYsR0FBVSxHQUFWLEdBQWEsSUFBQyxDQUFBO0lBRmhDLENBREw7R0FERDs7OztHQTVDNEI7O0FBc0R2Qjs7O0VBQ1EscUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxNQUFBLEVBQVEsRUFBUjtNQUNBLFlBQUEsRUFBYyxFQURkO0tBREQ7SUFJQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLEtBQUEsQ0FDakI7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLGVBQUEsRUFBaUIsTUFEakI7S0FEaUI7SUFJbEIsNkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUI7SUFDckIsSUFBQyxDQUFBLE1BQUQsQ0FBQTtFQWJZOztFQWtCYixXQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCO0lBQTdCLENBREw7R0FERDs7RUFJQSxXQUFDLENBQUEsTUFBRCxDQUFRLGNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULEdBQXdCO0lBQW5DLENBREw7R0FERDs7d0JBTUEsTUFBQSxHQUFRLFNBQUE7QUFDUCxRQUFBO0FBQUE7QUFBQSxTQUFBLHFDQUFBOztNQUNLLElBQUEsS0FBQSxDQUNIO1FBQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxVQUFUO1FBQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FEbEI7UUFFQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUZuQjtRQUdBLENBQUEsRUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFyQixHQUE4QixDQUFDLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQixJQUFDLENBQUEsU0FBUyxDQUFDLEdBQS9CLENBSGpDO1FBSUEsSUFBQSxFQUFNLEVBQUEsR0FBRSxDQUFDLEtBQUssQ0FBQyxLQUFOLENBQVksR0FBWixDQUFnQixDQUFDLEdBQWpCLENBQUEsQ0FBRCxDQUpSO1FBS0EsS0FBQSxFQUFPLEtBTFA7T0FERztBQURMO0lBVUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQW9CLElBQUMsQ0FBQSxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQXJCLEdBQThCLENBQUMsSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFYLEdBQW1CLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBL0IsQ0FBOUIsR0FBb0UsSUFBQyxDQUFBLFNBQVMsQ0FBQztJQUNuRyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsSUFBQyxDQUFBLFNBQVMsQ0FBQztXQUNoQyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosQ0FBQTtFQWJPOzs7O0dBN0JpQjs7QUFnRHBCOzs7RUFDUSx3QkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7OztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxJQUFBLEVBQU0sRUFBTjtLQUREO0lBR0EsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxLQUFBLENBQ2pCO01BQUEsSUFBQSxFQUFNLFNBQU47TUFDQSxlQUFBLEVBQWlCLE1BRGpCO0tBRGlCO0lBSWxCLGdEQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCO0lBQ3JCLElBQUMsQ0FBQSxNQUFELENBQUE7RUFaWTs7RUFpQmIsY0FBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtJQUEzQixDQURMO0dBREQ7O0VBSUEsY0FBQyxDQUFBLE1BQUQsQ0FBUSxXQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQjtJQUFoQyxDQURMO0dBREQ7OzJCQU9BLE1BQUEsR0FBUSxTQUFBO0FBQ1AsUUFBQTtBQUFBO0FBQUEsU0FBQSw2Q0FBQTs7TUFDQyxPQUFBLEdBQVUsSUFBQyxDQUFBLGFBQUQsQ0FBZSxVQUFmO01BQ1YsT0FBTyxDQUFDLENBQVIsR0FBWSxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFyQixHQUE4QixDQUFDLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQixJQUFDLENBQUEsU0FBUyxDQUFDLEdBQS9CO01BQzFDLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLElBQUMsQ0FBQTtBQUhuQjtJQUtBLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUFvQixJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFyQixHQUE4QixDQUFDLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxHQUFtQixJQUFDLENBQUEsU0FBUyxDQUFDLEdBQS9CLENBQTlCLEdBQW9FLElBQUMsQ0FBQSxTQUFTLENBQUM7SUFDbkcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLElBQUMsQ0FBQSxTQUFTLENBQUM7V0FDaEMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLENBQUE7RUFSTzs7MkJBV1IsYUFBQSxHQUFlLFNBQUMsTUFBRDtBQUVkLFFBQUE7SUFBQSxJQUFBLEdBQVcsSUFBQSxLQUFBLENBQ1Y7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLFNBQVMsQ0FBQyxLQUFsQjtNQUF5QixNQUFBLEVBQVEsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUE1QztNQUNBLElBQUEsRUFBTSxTQUROO01BQ2lCLGVBQUEsRUFBaUIsSUFEbEM7TUFDd0MsWUFBQSxFQUFjLElBQUMsQ0FBQSxXQUR2RDtNQUVBLElBQUEsRUFBTSxJQUZOO0tBRFU7SUFLWCxXQUFBLEdBQWtCLElBQUEsS0FBQSxDQUNqQjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FEbEI7TUFDeUIsTUFBQSxFQUFRLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFENUM7TUFDb0QsZUFBQSxFQUFpQixJQURyRTtNQUVBLElBQUEsRUFBTSxzRUFBQSxHQUF1RSxNQUF2RSxHQUE4RSxhQUZwRjtNQUdBLFlBQUEsRUFBYyxLQUhkO01BR3FCLElBQUEsRUFBTSxJQUgzQjtLQURpQjtBQU1sQixXQUFPO0VBYk87Ozs7R0F4Q2EifQ==
