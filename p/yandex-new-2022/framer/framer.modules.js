require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PCButtons":[function(require,module,exports){
var CopyButton, SVG, SVGButton, Text, TextButton, fontAveria,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

SVG = require("PCSVG");

fontAveria = "Raleway";

Text = (function(superClass) {
  extend(Text, superClass);

  function Text(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      fontFamily: fontAveria,
      fontSize: 18,
      weight: 700,
      color: "white",
      height: 20,
      letterSpacing: 0.7,
      letterSpacing: 0.4
    });
    Text.__super__.constructor.call(this, this.options);
    this.style = {
      "font-family": "Raleway, 'PT Sans', 'Helvetica', 'Tahoma', sans-serif;",
      "font-weight": 700,
      "-webkit-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;",
      "-moz-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;",
      "-ms-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;",
      "font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
    };
  }

  return Text;

})(TextLayer);

TextButton = (function(superClass) {
  extend(TextButton, superClass);

  function TextButton(options) {
    this.options = options != null ? options : {};
    this.updateTuple = bind(this.updateTuple, this);
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      tuple: {
        normal: 0.8,
        hover: 0.5
      },
      opacity: 0.5,
      handler: null
    });
    TextButton.__super__.constructor.call(this, this.options);
    this.style = {
      cursor: "pointer"
    };
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
  }

  TextButton.prototype.Hover = function() {
    return this.opacity = this.tuple.hover;
  };

  TextButton.prototype.HoverOff = function() {
    return this.opacity = this.tuple.normal;
  };

  TextButton.prototype.updateTuple = function(newTuple) {
    this.tuple = newTuple;
    this.emit(Events.MouseOver);
    return this.emit(Events.MouseOut);
  };

  TextButton.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  TextButton.define('tuple', {
    get: function() {
      return this.options.tuple;
    },
    set: function(value) {
      return this.options.tuple = value;
    }
  });

  return TextButton;

})(Text);

SVGButton = (function(superClass) {
  extend(SVGButton, superClass);

  function SVGButton(options) {
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
    SVGButton.__super__.constructor.call(this, this.options);
    this.svgShape.parent = this;
    this.updateSVGSize();
  }

  SVGButton.define('asset', {
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

  SVGButton.prototype.updateSVGSize = function() {
    this.svgShape.width = this.width;
    return this.svgShape.height = this.height;
  };

  return SVGButton;

})(TextButton);

CopyButton = (function(superClass) {
  extend(CopyButton, superClass);

  function CopyButton(options) {
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
    CopyButton.__super__.constructor.call(this, this.options);
    this.area.parent = this;
  }

  CopyButton.define('link', {
    get: function() {
      return this.options.link;
    },
    set: function(value) {
      this.options.link = value;
      return this.update(value);
    }
  });

  CopyButton.prototype.update = function(link) {
    return this.area.html = "<textarea class='js-copytextarea-class' style='opacity:0;'>" + link + "</textarea>";
  };

  CopyButton.prototype.copyHandler = function() {
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

  return CopyButton;

})(TextButton);

module.exports = {
  Text: Text,
  TextButton: TextButton,
  SVGButton: SVGButton,
  CopyButton: CopyButton
};


},{"PCSVG":"PCSVG"}],"PCPlayerSlider":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.PlayerSlider = (function(superClass) {
  extend(PlayerSlider, superClass);

  function PlayerSlider(options) {
    var knobCursor;
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    this.view = new Layer({
      name: "sliderView",
      width: 184 * 2,
      height: 56 * 2,
      backgroundColor: "rgba(0,0,0,0.25)",
      borderRadius: 56
    });
    this.view.draggable.enabled = true;
    this.view.draggable.speedX = 0;
    this.view.draggable.speedY = 0;
    this.view.draggable.propagateEvents = false;
    PlayerSlider.__super__.constructor.call(this, this.options);
    this.parent = this.view;
    this.name = "videoSlider";
    this.center();
    this.backgroundColor = null;
    this.height = 4 * 2;
    this.width = 128 * 2;
    this.x = Align.center;
    this.knobSize = 24 * 2;
    this.sliderOverlay.backgroundColor = "rgba(255,255,255,0.05)";
    this.sliderOverlay.width = 128 * 2;
    this.sliderOverlay.height = 4 * 2;
    this.sliderOverlay.x = 0;
    this.sliderOverlay.y = 0;
    this.sliderOverlay.ignoreEvents = true;
    this.fill.backgroundColor = "white";
    this.fill.opacity = 0.3;
    this.knob.backgroundColor = "null";
    this.knob.opacity = 1;
    this.knob.draggable.momentum = false;
    this.knob.draggable.propagateEvents = false;
    this.knob.shadowColor = null;
    this.knob.shadowY = 0;
    knobCursor = new Layer({
      parent: this.knob,
      width: 4 * 2,
      height: 32 * 2,
      x: Align.center,
      y: Align.center,
      backgroundColor: "DDD",
      borderRadius: 4 * 2
    });
    this.style = {
      cursor: "pointer"
    };
    this.on(Events.TouchStart, function(event, layer) {
      return layer.value = Utils.modulate(event.point.x, [0, this.sliderOverlay.width], [0, 1], true);
    });
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
  }

  PlayerSlider.prototype.Hover = function() {};

  PlayerSlider.prototype.HoverOff = function() {};

  PlayerSlider.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  return PlayerSlider;

})(SliderComponent);


},{}],"PCSVG":[function(require,module,exports){
var color_onDark, color_onLight, getFullscreen, getLogo, getNext, getPause, getPlay, getPrev, getSharePrototype, getVideoSlider;

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

getPlay = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"180\" height=\"180\" viewBox=\"0 0 180 180\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<circle opacity=\"0.5\" cx=\"90\" cy=\"90\" r=\"90\" fill=\"#000\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M76.7158 58.4914C73.0513 56.2364 68.3334 58.8729 68.3334 63.1756V116.824C68.3334 121.127 73.0515 123.763 76.716 121.508L123.972 94.6826C127.462 92.5349 127.462 87.4619 123.972 85.3143L76.7158 58.4914Z\" fill=\"white\" fill-opacity=\"0.8\"/>\n</svg>";
};

exports.playIcon = {
  onDark: getPlay(color_onDark),
  onLight: getPlay(color_onLight)
};

getPause = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"180\" height=\"180\" viewBox=\"0 0 180 180\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<circle opacity=\"0.5\" cx=\"90\" cy=\"90\" r=\"90\" fill=\"#000\"/>\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M70 56C65.5817 56 62 59.5817 62 64V116C62 120.418 65.5817 124 70 124H76C80.4183 124 84 120.418 84 116V64C84 59.5817 80.4183 56 76 56H70ZM104 56C99.5817 56 96 59.5817 96 64V116C96 120.418 99.5817 124 104 124H110C114.418 124 118 120.418 118 116V64C118 59.5817 114.418 56 110 56H104Z\" fill=\"white\" fill-opacity=\"0.8\"/>\n</svg>";
};

exports.pauseIcon = {
  onDark: getPause(color_onDark),
  onLight: getPause(color_onLight)
};

getVideoSlider = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"368\" height=\"112\" viewBox=\"0 0 368 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect opacity=\"0.3\" width=\"368\" height=\"112\" rx=\"56\" fill=\"#000\"/>\n<rect opacity=\"0.5\" x=\"34\" y=\"52\" width=\"300\" height=\"8\" rx=\"4\" fill=\"white\"/>\n</svg>";
};

exports.videoSliderIcon = {
  onDark: getVideoSlider(color_onDark),
  onLight: getVideoSlider(color_onLight)
};

getSharePrototype = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"180\" height=\"180\" viewBox=\"0 0 180 180\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect opacity=\"0.3\" width=\"180\" height=\"180\" rx=\"90\" fill=\"#000\"/>\n<g opacity=\"0.6\">\n<path d=\"M101.67 57.7586H80.1762C76.8312 57.7586 74.0216 60.0509 73.2325 63.1503C72.9885 64.1089 72.2095 64.9233 71.2203 64.9233H67.6379C66.6486 64.9233 65.8349 64.1174 65.9571 63.1357C66.837 56.0654 72.8676 50.5938 80.1762 50.5938H101.67C109.584 50.5938 116 57.0094 116 64.9233V115.077C116 122.991 109.584 129.406 101.67 129.406H80.1762C72.8676 129.406 66.837 123.935 65.9571 116.864C65.8349 115.883 66.6486 115.077 67.6379 115.077H71.2203C72.2095 115.077 72.9885 115.891 73.2325 116.85C74.0216 119.949 76.8312 122.241 80.1762 122.241H101.67C105.627 122.241 108.835 119.034 108.835 115.077V64.9233C108.835 60.9663 105.627 57.7586 101.67 57.7586Z\" fill=\"white\"/>\n<path d=\"M69.2647 101.805L78.6004 92.4629H49.8379C48.4777 92.4629 47.375 91.3602 47.375 90C47.375 88.6398 48.4777 87.5371 49.8379 87.5371H78.6004L69.2647 78.1951C68.3032 77.2329 68.3038 75.6735 69.2659 74.712C70.228 73.7505 71.7875 73.7511 72.749 74.7132L86.2856 88.2591C87.2466 89.2208 87.2466 90.7793 86.2856 91.7409L72.749 105.287C71.7875 106.249 70.228 106.249 69.2659 105.288C68.3038 104.327 68.3032 102.767 69.2647 101.805Z\" fill=\"white\"/>\n</g>\n</svg>";
};

exports.sharePrototypeIcon = {
  onDark: getSharePrototype(color_onDark),
  onLight: getSharePrototype(color_onLight)
};


},{}],"PCSlideChanger":[function(require,module,exports){
var Buttons, SVG, SVGButton, TextButton,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SVG = require("PCSVG");

Buttons = require("PCButtons");

TextButton = Buttons.TextButton;

SVGButton = Buttons.SVGButton;

exports.SlideChanger = (function(superClass) {
  extend(SlideChanger, superClass);

  function SlideChanger(options) {
    var testHadler;
    this.options = options != null ? options : {};
    this.moveRight = bind(this.moveRight, this);
    this.moveLeft = bind(this.moveLeft, this);
    _.defaults(this.options, {
      name: "progress view",
      backgroundColor: null,
      width: 120,
      height: 56,
      pages: 1,
      current: 1,
      slider: null
    });
    testHadler = function(event, layer) {
      try {
        return this.parent.slider.pinchToGrid();
      } catch (error) {}
    };
    this.currentText = new TextButton({
      textAlign: "center",
      width: 120,
      letterSpacing: 3,
      handler: testHadler
    });
    this.currentText.updateTuple({
      normal: 1,
      hover: 0.8
    });
    this.prevButton = new SVGButton({
      name: "prev",
      width: 16,
      height: 16,
      asset: SVG.prevIcon,
      handler: this.moveLeft
    });
    this.nextButton = new SVGButton({
      name: "next",
      width: 16,
      height: 16,
      asset: SVG.nextIcon,
      handler: this.moveRight
    });
    SlideChanger.__super__.constructor.call(this, this.options);
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

  SlideChanger.define('slider', {
    get: function() {
      return this.options.slider;
    },
    set: function(value) {
      return this.options.slider = value;
    }
  });

  SlideChanger.define('pages', {
    get: function() {
      return this.options.pages;
    },
    set: function(value) {
      this.options.pages = value;
      return this.currentText.text = this.current + "/" + this.pages;
    }
  });

  SlideChanger.define('current', {
    get: function() {
      return this.options.current;
    },
    set: function(value) {
      this.options.current = value;
      if (this.current !== -1) {
        return this.currentText.text = this.current + "/" + this.pages;
      }
    }
  });

  SlideChanger.prototype.moveLeft = function() {
    return this.slider.snapToNextPage("left", false);
  };

  SlideChanger.prototype.moveRight = function() {
    return this.slider.snapToNextPage("right", false);
  };

  return SlideChanger;

})(Layer);


},{"PCButtons":"PCButtons","PCSVG":"PCSVG"}],"PCSlider0":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Slider0 = (function(superClass) {
  extend(Slider0, superClass);

  function Slider0(options) {
    var canvasBackgroundLayer, gridScroll;
    this.options = options != null ? options : {};
    this.openURLHome = bind(this.openURLHome, this);
    this.openURL = bind(this.openURL, this);
    this.restartHandler = bind(this.restartHandler, this);
    this.changeScale = bind(this.changeScale, this);
    this.initScale = bind(this.initScale, this);
    this.updateSize = bind(this.updateSize, this);
    this.isGrid = bind(this.isGrid, this);
    canvasBackgroundLayer = new BackgroundLayer({
      name: "canvas"
    });
    canvasBackgroundLayer.states = {
      "window": {
        backgroundColor: "#000"
      },
      "fullscreen": {
        backgroundColor: "#222"
      }
    };
    gridScroll = new ScrollComponent({
      parent: canvasBackgroundLayer,
      name: "grid",
      width: 1400 * 2,
      height: 900 * 2,
      scrollVertical: false,
      scrollHorizontal: false,
      backgroundColor: null,
      ignoreEvents: true
    });
    gridScroll.states = {
      "window": {
        scale: 1
      },
      "fullscreen": {
        scale: 1
      }
    };
    _.defaults(this.options, {
      canvas: canvasBackgroundLayer,
      grid: gridScroll,
      parent: gridScroll.content,
      width: gridScroll.width,
      height: gridScroll.height,
      scrollVertical: false,
      scrollHorizontal: true,
      presentationTitle: "Untitled"
    });
    Slider0.__super__.constructor.call(this, this.options);
    this.content.draggable.propagateEvents = false;
    this.states = {
      "grid": {
        opacity: 1
      },
      "present": {
        opacity: 1
      }
    };
    this.stateSwitch("present");
    Framer.Extras.Preloader.disable();
    Framer.Extras.Hints.disable();
    document.body.style.cursor = "auto";
    this.initScale();
    this.updateSize();
    this.canvas.on("change:size", (function(_this) {
      return function() {
        return _this.updateSize();
      };
    })(this));
  }

  Slider0.define('title', {
    get: function() {
      return this.options.presentationTitle;
    },
    set: function(value) {
      return this.options.presentationTitle = value;
    }
  });

  Slider0.define('canvas', {
    get: function() {
      return this.options.canvas;
    },
    set: function(value) {
      return this.options.canvas = value;
    }
  });

  Slider0.define('grid', {
    get: function() {
      return this.options.grid;
    },
    set: function(value) {
      return this.options.grid = value;
    }
  });

  Slider0.prototype.isGrid = function() {
    return this.states.current.name === "grid";
  };

  Slider0.prototype.updateSize = function() {
    return this.initScale(this.grid.states.current.name);
  };

  Slider0.prototype.initScale = function(forState) {
    var scaleX, scaleY;
    if (forState == null) {
      forState = "window";
    }
    scaleX = (this.canvas.width - 20) / this.grid.width;
    scaleY = (this.canvas.height - 120) / this.grid.height;
    this.grid.states.window.scale = Math.min(scaleX, scaleY);
    scaleX = this.canvas.width / this.grid.width;
    scaleY = this.canvas.height / this.grid.height;
    this.grid.states.fullscreen.scale = Math.min(scaleX, scaleY);
    this.grid.stateSwitch(forState);
    this.canvas.stateSwitch(forState);
    return this.grid.center();
  };

  Slider0.prototype.changeScale = function() {
    var nextState;
    if (this.grid.states.current.name === "window") {
      nextState = "fullscreen";
    } else {
      nextState = "window";
    }
    this.grid.animate(nextState, {
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

  Slider0.prototype.restartHandler = function() {
    return this.snapToPage(this.content.children[0], false);
  };

  Slider0.prototype.openURL = function(url, isBlank) {
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

  Slider0.prototype.openURLHome = function() {
    return this.openURL("https://tilllur.ru", false);
  };

  return Slider0;

})(PageComponent);


},{}],"PCSlider1":[function(require,module,exports){
var Buttons, CopyButton, SVG, SVGButton, SlideChanger, Slider0, Text, TextButton,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SVG = require("PCSVG");

Slider0 = require("PCSlider0").Slider0;

SlideChanger = require("PCSlideChanger").SlideChanger;

Buttons = require("PCButtons");

Text = Buttons.Text;

TextButton = Buttons.TextButton;

TextButton = Buttons.TextButton;

SVGButton = Buttons.SVGButton;

CopyButton = Buttons.CopyButton;

exports.Slider1 = (function(superClass) {
  extend(Slider1, superClass);

  function Slider1(options) {
    var i, item, len, ref;
    this.options = options != null ? options : {};
    this.updateViewBuilderSize = bind(this.updateViewBuilderSize, this);
    Slider1.__super__.constructor.call(this, this.options);
    this.topView = new Layer({
      parent: this.canvas,
      name: "topView",
      backgroundColor: null,
      width: this.canvas.width,
      height: 56
    });
    this.bottomView = new Layer({
      parent: this.canvas,
      name: "bottomView",
      backgroundColor: null,
      width: this.canvas.width,
      height: 56,
      y: Align.bottom
    });
    ref = [this.topView, this.bottomView];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.sendToBack();
      item.states = {
        "window": {
          opacity: 1
        },
        "fullscreen": {
          opacity: 0
        }
      };
    }
    this.logoButton = new SVGButton({
      parent: this.topView,
      name: "logo",
      x: Align.left(32),
      y: Align.center,
      width: 76,
      height: 32,
      asset: SVG.logoIcon,
      handler: this.openURLHome
    });
    this.titleText = new Text({
      parent: this.topView,
      name: "title",
      text: this.title,
      textAlign: "center",
      y: Align.center
    });
    this.copyButton = new CopyButton({
      parent: this.topView,
      name: "copy link",
      text: "Copy Link",
      textAlign: "right",
      y: Align.center,
      custom: {
        x: -40 - 20 - 24
      },
      link: window.location
    });
    this.fullscreenButton = new SVGButton({
      parent: this.topView,
      name: "fullscreen",
      y: Align.center,
      width: 20,
      height: 20,
      asset: SVG.fullscreenIcon,
      handler: this.changeScale,
      custom: {
        x: -36
      }
    });
    this.slideChangerView = new SlideChanger({
      parent: this.bottomView,
      name: "slide changer",
      x: Align.center,
      slider: this
    });
    this.restartButton = new TextButton({
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
    this.updateViewBuilderSize(this.canvas);
    this.canvas.on("change:size", (function(_this) {
      return function() {
        return _this.updateViewBuilderSize(_this.canvas);
      };
    })(this));
  }

  Slider1.prototype.updateViewBuilderSize = function(anchor) {
    this.topView.width = anchor.width;
    if (anchor.width < 740) {
      this.titleText.x = Align.left(this.logoButton.x);
      this.titleText.y = Align.top(this.topView.height + 10);
      this.copyButton.x = Align.left(this.logoButton.x);
      this.copyButton.y = Align.top(this.topView.height + 36);
    } else {
      this.titleText.x = Align.center;
      this.titleText.y = Align.center(2);
      this.copyButton.x = Align.right(this.copyButton.custom.x);
      this.copyButton.y = Align.center(2);
    }
    this.fullscreenButton.x = Align.right(this.fullscreenButton.custom.x);
    this.fullscreenButton.y = Align.center(2);
    this.bottomView.width = anchor.width;
    this.slideChangerView.x = Align.center;
    return this.bottomView.y = Align.bottom;
  };

  return Slider1;

})(Slider0);


},{"PCButtons":"PCButtons","PCSVG":"PCSVG","PCSlideChanger":"PCSlideChanger","PCSlider0":"PCSlider0"}],"PCSlider2":[function(require,module,exports){
var PrototypeSlide, SimpleVideoSlide, Slide, SlideTemplate, Slider1, VideoSlide,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Slider1 = require("PCSlider1").Slider1;

SlideTemplate = require("PCSlide");

Slide = SlideTemplate.Slide;

SimpleVideoSlide = SlideTemplate.SimpleVideoSlide;

VideoSlide = SlideTemplate.VideoSlide;

PrototypeSlide = SlideTemplate.PrototypeSlide;

exports.Slider2 = (function(superClass) {
  extend(Slider2, superClass);

  function Slider2(options) {
    this.options = options != null ? options : {};
    this.prototypeSlide = bind(this.prototypeSlide, this);
    this.simpleVideoSlide = bind(this.simpleVideoSlide, this);
    this.videoSlide = bind(this.videoSlide, this);
    this.slide = bind(this.slide, this);
    _.defaults(this.options, {
      videoSlides: []
    });
    Slider2.__super__.constructor.call(this, this.options);
  }

  Slider2.define('videoSlides', {
    get: function() {
      return this.options.videoSlides;
    }
  });

  Slider2.prototype.slide = function(named) {
    if (named == null) {
      named = "";
    }
    return new Slide({
      parent: this.content
    });
  };

  Slider2.prototype.videoSlide = function(name) {
    var slide;
    if (name == null) {
      name = "";
    }
    slide = new VideoSlide({
      parent: this.content
    });
    this.videoSlides.push(slide);
    return slide;
  };

  Slider2.prototype.simpleVideoSlide = function(name) {
    var slide;
    if (name == null) {
      name = "";
    }
    slide = new SimpleVideoSlide({
      parent: this.content
    });
    this.videoSlides.push(slide);
    return slide;
  };

  Slider2.prototype.prototypeSlide = function(name) {
    if (name == null) {
      name = "";
    }
    return new PrototypeSlide({
      parent: this.content
    });
  };

  return Slider2;

})(Slider1);


},{"PCSlide":"PCSlide","PCSlider1":"PCSlider1"}],"PCSlider3":[function(require,module,exports){
var Slider2,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Slider2 = require("PCSlider2").Slider2;

exports.Slider3 = (function(superClass) {
  extend(Slider3, superClass);

  function Slider3(options) {
    this.options = options != null ? options : {};
    this.initShortcuts = bind(this.initShortcuts, this);
    Slider3.__super__.constructor.call(this, this.options);
    this.initShortcuts();
  }

  Slider3.prototype.initShortcuts = function() {
    var localScroll;
    localScroll = this;
    return Events.wrap(window).addEventListener("keydown", function(event) {
      if (event.code === "ArrowLeft") {
        if (!localScroll.isGrid()) {
          return localScroll.snapToNextPage("left", false);
        }
      } else if (event.code === "ArrowRight") {
        if (!localScroll.isGrid()) {
          return localScroll.snapToNextPage("right", false);
        }
      } else if (event.code === "KeyC") {
        return localScroll.copyButton.emit(Events.Tap);
      } else if (event.code === "KeyF") {
        return localScroll.fullscreenButton.emit(Events.Tap);
      } else if (event.code === "KeyR") {
        return localScroll.restartButton.emit(Events.Tap);
      } else if (event.code === "KeyA") {
        return localScroll.pinchToGrid();
      } else if (event.code === "Escape") {
        if (localScroll.states.current.name === "fullscreen") {
          return localScroll.fullscreenButton.emit(Events.Tap);
        }
      } else if (event.code === "Space") {
        try {
          return localScroll.currentPage.togglePlay();
        } catch (error) {}
      }
    });
  };

  return Slider3;

})(Slider2);


},{"PCSlider2":"PCSlider2"}],"PCSlider4":[function(require,module,exports){
var Slider3,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Slider3 = require("PCSlider3").Slider3;

exports.Slider4 = (function(superClass) {
  extend(Slider4, superClass);

  function Slider4(options) {
    this.options = options != null ? options : {};
    this.updateCurrentPageSlider = bind(this.updateCurrentPageSlider, this);
    this.showGridCancelButton = bind(this.showGridCancelButton, this);
    this.pauseBackgroundVideos = bind(this.pauseBackgroundVideos, this);
    this.playActiveVideo = bind(this.playActiveVideo, this);
    this.updateCurrentPage = bind(this.updateCurrentPage, this);
    Slider4.__super__.constructor.call(this, this.options);
    this.on("change:currentPage", function() {
      return this.updateCurrentPage();
    });
    this.content.on("change:children", function() {
      this.parent.slideChangerView.pages = this.children.length;
      return this.parent.updateCurrentPage();
    });
  }

  Slider4.prototype.updateCurrentPage = function() {
    var i, index, item, len, ref;
    if (!this.isGrid()) {
      ref = this.content.children;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        item = ref[index];
        if (item === this.currentPage) {
          this.lastSlideSelectedIndex = index;
          break;
        }
      }
    }
    this.pauseBackgroundVideos();
    this.updateCurrentPageSlider();
    if (!this.isGrid()) {
      return this.playActiveVideo();
    }
  };

  Slider4.prototype.playActiveVideo = function() {
    var currentVideoSlide, i, len, ref;
    ref = this.videoSlides;
    for (i = 0, len = ref.length; i < len; i++) {
      currentVideoSlide = ref[i];
      if (currentVideoSlide === this.currentPage) {
        currentVideoSlide.play();
        return;
      }
    }
  };

  Slider4.prototype.pauseBackgroundVideos = function() {
    var currentVideoSlide, i, len, ref, results;
    ref = this.videoSlides;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      currentVideoSlide = ref[i];
      if (currentVideoSlide !== this.currentPage) {
        results.push(currentVideoSlide.pause());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Slider4.prototype.showGridCancelButton = function() {
    return this.slideChangerView.current = -1;
  };

  Slider4.prototype.updateCurrentPageSlider = function() {
    var i, index, item, len, ref;
    if (this.isGrid()) {
      this.showGridCancelButton();
      return;
    }
    ref = this.content.children;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      item = ref[index];
      if (item === this.currentPage) {
        this.slideChangerView.current = index + 1;
        return;
      }
    }
  };

  return Slider4;

})(Slider3);


},{"PCSlider3":"PCSlider3"}],"PCSlider5":[function(require,module,exports){
var Slider4,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Slider4 = require("PCSlider4").Slider4;

exports.Slider5 = (function(superClass) {
  extend(Slider5, superClass);

  function Slider5(options) {
    this.options = options != null ? options : {};
    this.selectCurrentPlayingVideo = bind(this.selectCurrentPlayingVideo, this);
    this.updateCurrentPage = bind(this.updateCurrentPage, this);
    _.defaults(this.options, {
      activeVideoPlayer: null,
      activeProgressSlider: null,
      activeDrag: false,
      activePlaying: true
    });
    Slider5.__super__.constructor.call(this, this.options);
    Framer.Loop.on("render", (function(_this) {
      return function() {
        if (!_this.activeDrag && _this.activePlaying && !_this.isGrid()) {
          if (_this.activeProgressSlider !== void 0 && _this.activeProgressSlider !== null) {
            if (_this.activeVideoPlayer !== void 0 && _this.activeVideoPlayer !== null) {
              return _this.activeProgressSlider.value = Utils.modulate(_this.activeVideoPlayer.currentTime, [0, _this.activeVideoPlayer.duration], [0, 1], true);
            }
          }
        }
      };
    })(this));
  }

  Slider5.prototype.updateCurrentPage = function() {
    Slider5.__super__.updateCurrentPage.call(this, this.updateContent());
    this.selectCurrentPlayingVideo();
    return this.activeDrag = false;
  };

  Slider5.define('activeProgressSlider', {
    get: function() {
      return this.options.activeProgressSlider;
    },
    set: function(value) {
      return this.options.activeProgressSlider = value;
    }
  });

  Slider5.define('activeVideoPlayer', {
    get: function() {
      return this.options.activeVideoPlayer;
    },
    set: function(value) {
      return this.options.activeVideoPlayer = value;
    }
  });

  Slider5.define('activeDrag', {
    get: function() {
      return this.options.activeDrag;
    },
    set: function(value) {
      return this.options.activeDrag = value;
    }
  });

  Slider5.define('activePlaying', {
    get: function() {
      return this.options.activePlaying;
    },
    set: function(value) {
      return this.options.activePlaying = value;
    }
  });

  Slider5.prototype.selectCurrentPlayingVideo = function() {
    var currentlyNotPlaying, i, item, len, ref;
    currentlyNotPlaying = true;
    ref = this.videoSlides;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      if (item === this.currentPage) {
        currentlyNotPlaying = false;
        this.activeProgressSlider = this.currentPage.playerSlider;
        this.activeVideoPlayer = this.currentPage.videoView.player;
      }
    }
    if (currentlyNotPlaying) {
      this.activeProgressSlider = null;
      return this.activeVideoPlayer = null;
    }
  };

  return Slider5;

})(Slider4);


},{"PCSlider4":"PCSlider4"}],"PCSliderPinch":[function(require,module,exports){
var Buttons, Slider5, TextButton,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Slider5 = require("PCSlider5").Slider5;

Buttons = require("PCButtons");

TextButton = Buttons.TextButton;

exports.SliderPinch = (function(superClass) {
  extend(SliderPinch, superClass);

  function SliderPinch(options) {
    this.options = options != null ? options : {};
    this.pinchToSlide = bind(this.pinchToSlide, this);
    this.pinchToGrid = bind(this.pinchToGrid, this);
    this.getGridScale = bind(this.getGridScale, this);
    this.getGridGap = bind(this.getGridGap, this);
    this.gridSize = bind(this.gridSize, this);
    _.defaults(this.options, {
      lastSlideSelectedIndex: 0,
      gridButtons: []
    });
    SliderPinch.__super__.constructor.call(this, this.options);
    this.on(Events.StateSwitchEnd, function(from, to) {
      var nextOpacityValue;
      if (from !== to) {
        if (to === "present") {
          nextOpacityValue = 1;
        } else {
          nextOpacityValue = 0;
        }
        return this.bottomView.animate({
          opacity: nextOpacityValue,
          options: {
            curve: Spring({
              damping: 1
            }),
            time: 0.5
          }
        });
      }
    });
  }

  SliderPinch.define('lastSlideSelectedIndex', {
    get: function() {
      return this.options.lastSlideSelectedIndex;
    },
    set: function(value) {
      return this.options.lastSlideSelectedIndex = value;
    }
  });

  SliderPinch.define('pinchButtons', {
    get: function() {
      return this.options.pinchButtons;
    },
    set: function(value) {
      return this.options.pinchButtons = value;
    }
  });

  SliderPinch.prototype.gridSize = function() {
    return 3;
  };

  SliderPinch.prototype.getGridGap = function() {
    return 20;
  };

  SliderPinch.prototype.getGridScale = function() {
    var ws;
    ws = (this.width - this.getGridGap() * (this.gridSize() - 1)) / this.gridSize();
    return ws / this.width;
  };

  SliderPinch.prototype.pinchToGrid = function() {
    var deltaRowNumber, gridDownscaleAnimation, i, index, j, len, len1, ref, ref1, scaleIndex, selectedSlideDeltaY, slide;
    if (this.isGrid()) {
      this.pinchToSlide(this.lastSlideSelectedIndex);
      return;
    }
    this.stateSwitch("grid");
    this.showGridCancelButton();
    scaleIndex = this.getGridScale();
    this.ignoreEvents = true;
    this.content.ignoreEvents = true;
    this.scrollHorizontal = false;
    ref = this.content.children;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      slide = ref[index];
      slide.gridData = {
        x: (index % this.gridSize() - 1) * (slide.width * scaleIndex + this.getGridGap()),
        y: ((index - index % this.gridSize()) / this.gridSize() - 1) * (slide.height * scaleIndex + this.getGridGap()) + this.getGridGap(),
        scale: scaleIndex
      };
    }
    this.grid.scrollToPoint({
      x: 0,
      y: this.content.children[this.lastSlideSelectedIndex].gridData.y
    }, false);
    selectedSlideDeltaY = this.grid.scrollY;
    this.snapToPage(this.content.children[0], false);
    this.clip = false;
    this.content.clip = false;
    this.grid.scrollVertical = true;
    this.grid.mouseWheelEnabled = true;
    deltaRowNumber = (this.content.children.length - (this.content.children.length % this.gridSize())) / this.gridSize() + 1;
    this.height = deltaRowNumber * (this.grid.height / 3) + (deltaRowNumber + 1) * (this.gridSize() / scaleIndex);
    ref1 = this.content.children;
    for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
      slide = ref1[index];
      if (index === this.lastSlideSelectedIndex) {
        slide.bringToFront();
        slide.x = 0;
        slide.y = selectedSlideDeltaY;
        gridDownscaleAnimation = new Animation(slide, {
          x: slide.gridData.x,
          y: slide.gridData.y,
          scale: slide.gridData.scale,
          options: {
            curve: Bezier(0.25, 0.1, 0.25, 1),
            time: 0.3
          }
        });
        gridDownscaleAnimation.start();
        gridDownscaleAnimation.on(Events.AnimationEnd, function(animation) {
          var gridBackButton, gridBackHander, k, len2, localGridButtons, localScroll, ref2;
          localScroll = this.layer.parent.parent;
          localGridButtons = [];
          ref2 = localScroll.content.children;
          for (index = k = 0, len2 = ref2.length; k < len2; index = ++k) {
            slide = ref2[index];
            gridBackHander = function(event, layer) {
              localScroll = this.parent.parent.parent;
              localScroll.lastSlideSelectedIndex = this.custom.slideIndex;
              return localScroll.pinchToSlide();
            };
            gridBackButton = new TextButton({
              parent: slide,
              width: slide.width,
              height: slide.height,
              backgroundColor: null,
              text: "",
              handler: gridBackHander,
              custom: {
                slideIndex: index
              }
            });
            localGridButtons.push(gridBackButton);
          }
          return localScroll.gridButtons = localGridButtons;
        });
      } else {
        slide.x = slide.gridData.x;
        slide.y = slide.gridData.y;
        slide.scale = slide.gridData.scale;
      }
    }
    this.updateContent();
    return this.grid.updateContent();
  };

  SliderPinch.prototype.pinchToSlide = function() {
    var i, index, item, j, k, len, len1, len2, ref, ref1, ref2, slide;
    this.stateSwitch("present");
    ref = this.gridButtons;
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.destroy();
    }
    this.ignoreEvents = false;
    this.content.ignoreEvents = false;
    this.scrollHorizontal = true;
    this.clip = true;
    this.content.clip = true;
    this.grid.ignoreEvents = true;
    this.grid.scrollVertical = false;
    this.grid.mouseWheelEnabled = false;
    this.height = this.grid.height;
    this.grid.scrollToTop(false);
    ref1 = this.content.children;
    for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
      slide = ref1[index];
      slide.gridData = {
        x: (slide.width + 120) * index,
        y: 0,
        scale: 1
      };
    }
    ref2 = this.content.children;
    for (index = k = 0, len2 = ref2.length; k < len2; index = ++k) {
      slide = ref2[index];
      slide.x = slide.gridData.x;
      slide.y = slide.gridData.y;
      slide.scale = slide.gridData.scale;
    }
    this.updateContent();
    this.snapToPage(this.content.children[this.lastSlideSelectedIndex], false);
    return this.updateCurrentPage();
  };

  return SliderPinch;

})(Slider5);


},{"PCButtons":"PCButtons","PCSlider5":"PCSlider5"}],"PCSlide":[function(require,module,exports){
var Buttons, PlayerSlider, PrototypeSlide, SVG, SVGButton, SimpleVideoSlide, Slide, SlideTemplate, Text, VideoSlide,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SVG = require("PCSVG");

Buttons = require("PCButtons");

Text = Buttons.Text;

SVGButton = Buttons.SVGButton;

PlayerSlider = require("PCPlayerSlider").PlayerSlider;

SlideTemplate = (function(superClass) {
  extend(SlideTemplate, superClass);

  function SlideTemplate(options) {
    this.options = options != null ? options : {};
    this.randomColor = bind(this.randomColor, this);
    this.overlay = bind(this.overlay, this);
    this.source = bind(this.source, this);
    _.defaults(this.options, {
      gridData: null,
      backgroundColor: "#222",
      width: 1400 * 2,
      height: 900 * 2,
      borderRadius: 16 * 2,
      title: "",
      image: null,
      clip: true
    });
    SlideTemplate.__super__.constructor.call(this, this.options);
    this.x = (this.parent.children.length - 1) * (this.width + 120);
    this.parent.parent.updateContent();
    this.name = "slide " + this.parent.children.length;
  }

  SlideTemplate.define('title', {
    get: function() {
      return this.options.title;
    },
    set: function(value) {
      return this.options.title = value;
    }
  });

  SlideTemplate.define('gridData', {
    get: function() {
      return this.options.gridData;
    },
    set: function(value) {
      return this.options.gridData = value;
    }
  });

  SlideTemplate.prototype.source = function(image) {
    this.image = image;
    return this;
  };

  SlideTemplate.prototype.overlay = function(image) {
    var topImage;
    topImage = new Layer({
      parent: this,
      width: 1400 * 2,
      height: 900 * 2,
      image: image
    });
    return this;
  };

  SlideTemplate.prototype.randomColor = function() {
    this.backgroundColor = Utils.randomColor();
    return this;
  };

  return SlideTemplate;

})(Layer);

Slide = (function(superClass) {
  extend(Slide, superClass);

  function Slide(options) {
    this.options = options != null ? options : {};
    this.openPrototypeURL = bind(this.openPrototypeURL, this);
    this.link = bind(this.link, this);
    _.defaults(this.options, {
      shareLink: ""
    });
    Slide.__super__.constructor.call(this, this.options);
  }

  Slide.define('shareLink', {
    get: function() {
      return this.options.shareLink;
    },
    set: function(value) {
      return this.options.shareLink = value;
    }
  });

  Slide.prototype.link = function(url) {
    this.shareLink = url;
    return this.sharePrototypeButton = new SVGButton({
      parent: this,
      name: "shareButton",
      x: Align.right(-98 * 2),
      y: Align.bottom(-44 * 2),
      backgroundColor: null,
      width: 90 * 2,
      height: 90 * 2,
      asset: SVG.sharePrototypeIcon,
      handler: this.openPrototypeURL
    });
  };

  Slide.prototype.openPrototypeURL = function() {
    var presentation;
    presentation = this.parent.parent;
    return presentation.openURL(this.shareLink, true);
  };

  return Slide;

})(SlideTemplate);

SimpleVideoSlide = (function(superClass) {
  extend(SimpleVideoSlide, superClass);

  function SimpleVideoSlide(options) {
    this.options = options != null ? options : {};
    this.togglePlay = bind(this.togglePlay, this);
    this.pause = bind(this.pause, this);
    this.play = bind(this.play, this);
    this.isPaused = bind(this.isPaused, this);
    this.source = bind(this.source, this);
    _.defaults(this.options, {
      videoURL: null
    });
    this.loadingText = new Text({
      width: 400,
      height: 70,
      fontSize: 40,
      opacity: 0.5,
      text: "Loading"
    });
    this.videoView = new VideoLayer({
      width: 1680,
      height: 1080,
      name: "videoView",
      backgroundColor: "null"
    });
    this.videoView.player.muted = true;
    this.videoView.player.autoplay = false;
    this.videoView.player.loop = true;
    SimpleVideoSlide.__super__.constructor.call(this, this.options);
    this.loadingText.parent = this;
    this.loadingText.center();
    this.videoView.parent = this;
    this.videoView.scale = this.height / 1080;
    this.videoView.center();
  }

  SimpleVideoSlide.define('videoURL', {
    get: function() {
      return this.options.videoURL;
    },
    set: function(value) {
      return this.options.videoURL = value;
    }
  });

  SimpleVideoSlide.prototype.source = function(video) {
    this.videoView.video = video;
    return this;
  };

  SimpleVideoSlide.prototype.isPaused = function() {
    return this.videoView.player.paused;
  };

  SimpleVideoSlide.prototype.play = function() {
    if (!this.isPaused()) {
      return;
    }
    return this.videoView.player.play();
  };

  SimpleVideoSlide.prototype.pause = function() {
    if (this.isPaused()) {
      return;
    }
    return this.videoView.player.pause();
  };

  SimpleVideoSlide.prototype.togglePlay = function() {
    if (this.isPaused()) {
      return this.play();
    } else {
      return this.pause();
    }
  };

  return SimpleVideoSlide;

})(Slide);

VideoSlide = (function(superClass) {
  extend(VideoSlide, superClass);

  function VideoSlide(options) {
    this.options = options != null ? options : {};
    VideoSlide.__super__.constructor.call(this, this.options);
    this.playButton = new SVGButton({
      parent: this,
      name: "playButton",
      x: Align.left(98 * 2),
      y: Align.bottom(-44 * 2),
      backgroundColor: null,
      width: 90 * 2,
      height: 90 * 2,
      asset: SVG.playIcon
    });
    this.playButton.states = {
      "playing": {
        asset: SVG.pauseIcon
      },
      "paused": {
        asset: SVG.playIcon
      }
    };
    this.playButton.stateSwitch("playing");
    this.playButton.on(Events.Tap, function(event, layer) {
      var presentation, slide;
      slide = this.parent;
      presentation = slide.parent.parent;
      slide.togglePlay();
      return presentation.activeDrag = false;
    });
    Events.wrap(this.videoView.player).on("pause", (function(_this) {
      return function() {
        var presentation;
        _this.pause();
        _this.playButton.stateSwitch("paused");
        presentation = _this.parent.parent;
        if (_this.videoView.player === presentation.activeVideoPlayer) {
          return presentation.activePlaying = false;
        }
      };
    })(this));
    Events.wrap(this.videoView.player).on("play", (function(_this) {
      return function() {
        var presentation;
        _this.play();
        _this.playButton.stateSwitch("playing");
        presentation = _this.parent.parent;
        if (_this.videoView.player === presentation.activeVideoPlayer) {
          return presentation.activePlaying = true;
        }
      };
    })(this));
    this.playerSlider = new PlayerSlider;
    this.playerSlider.parent.parent = this;
    this.playerSlider.parent.x = Align.left(212 * 2);
    this.playerSlider.parent.y = Align.bottom(-61 * 2);
    this.playerSlider.on(Events.TouchStart, function() {
      var presentation, slide;
      slide = this.parent.parent;
      presentation = slide.parent.parent;
      slide.pause();
      return presentation.activeDrag = true;
    });
    this.playerSlider.on("change:value", function() {
      var presentation, slide;
      slide = this.parent.parent;
      presentation = slide.parent.parent;
      if (presentation.activeDrag) {
        return slide.videoView.player.currentTime = Utils.modulate(this.value, [0, 1], [0, slide.videoView.player.duration], true);
      }
    });
  }

  return VideoSlide;

})(SimpleVideoSlide);

PrototypeSlide = (function(superClass) {
  extend(PrototypeSlide, superClass);

  function PrototypeSlide(options) {
    this.options = options != null ? options : {};
    this.createWebView = bind(this.createWebView, this);
    this.source = bind(this.source, this);
    this.sized = bind(this.sized, this);
    this.bordered = bind(this.bordered, this);
    this.scaled = bind(this.scaled, this);
    this.prototypeView = new Layer({
      name: "prototype",
      backgroundColor: null,
      borderRadius: 42,
      clip: true
    });
    PrototypeSlide.__super__.constructor.call(this, this.options);
    this.prototypeView.parent = this;
    this.sized();
  }

  PrototypeSlide.define('pWidth', {
    get: function() {
      return this.options.pWidth;
    },
    set: function(value) {
      return this.options.pWidth = value;
    }
  });

  PrototypeSlide.define('pHeight', {
    get: function() {
      return this.options.pHeight;
    },
    set: function(value) {
      return this.options.pHeight = value;
    }
  });

  PrototypeSlide.prototype.scaled = function(value) {
    this.prototypeView.scale = value;
    return this;
  };

  PrototypeSlide.prototype.bordered = function(value) {
    this.prototypeView.borderRadius = value;
    return this;
  };

  PrototypeSlide.prototype.sized = function(width, height) {
    if (width == null) {
      width = 375;
    }
    if (height == null) {
      height = 812;
    }
    this.prototypeView.width = width;
    this.prototypeView.height = height;
    this.prototypeView.center();
    return this;
  };

  PrototypeSlide.prototype.source = function(originURL) {
    var contentView, url;
    url = originURL + "?logo=off&button=off";
    contentView = new Layer({
      parent: this.prototypeView,
      width: this.prototypeView.width,
      height: this.prototypeView.height,
      backgroundColor: null,
      html: "<iframe style='position: absolute; width: 100%; height: 100%;' src='" + url + "'></iframe>",
      ignoreEvents: false,
      clip: true
    });
    return this;
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

module.exports = {
  Slide: Slide,
  SimpleVideoSlide: SimpleVideoSlide,
  VideoSlide: VideoSlide,
  PrototypeSlide: PrototypeSlide
};


},{"PCButtons":"PCButtons","PCPlayerSlider":"PCPlayerSlider","PCSVG":"PCSVG"}],"PresentationComponent":[function(require,module,exports){
var FixPresentationExport, SliderPinch,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SliderPinch = require("PCSliderPinch").SliderPinch;

FixPresentationExport = (function(superClass) {
  extend(FixPresentationExport, superClass);

  function FixPresentationExport() {
    return FixPresentationExport.__super__.constructor.apply(this, arguments);
  }

  return FixPresentationExport;

})(SliderPinch);

exports.Presentation = (function(superClass) {
  extend(Presentation, superClass);

  function Presentation() {
    return Presentation.__super__.constructor.apply(this, arguments);
  }

  return Presentation;

})(FixPresentationExport);


},{"PCSliderPinch":"PCSliderPinch"}],"PreviewComponentAssets":[function(require,module,exports){
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
      prototypeCreationYear: "20:22",
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
        } else if (valuePart === "false") {
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
        } else if (valuePart === "false") {
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


},{"PreviewComponentAssets":"PreviewComponentAssets"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QcmVzZW50YXRpb25Db21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZS5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlclBpbmNoLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyNS5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIzLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMi5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjEuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIwLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVDaGFuZ2VyLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU1ZHLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDUGxheWVyU2xpZGVyLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDQnV0dG9ucy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgUHJldmlldyBDb21wb25lbnRcbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3Q29tcG9uZW50QXNzZXRzXCJcbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbmxvY2FsQ29sb3JzID1cblx0YmdfY29sb3Jfb25MaWdodDogXCIjZWVlXCJcblx0YmdfY29sb3Jfb25EYXJrOiBcIiMyMjJcIlxuXHRjb250ZW50X2NvbG9yX29uTGlnaHQ6IFwiIzAwMFwiXG5cdGNvbnRlbnRfY29sb3Jfb25EYXJrOiBcIiNGRkZcIlxuXG50aGVtZSA9XG5cdGJnX2NvbG9yOiBsb2NhbENvbG9ycy5iZ19jb2xvcl9vbkRhcmtcblx0Y29udGVudF9jb2xvcjogbG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmtcblxuXG4jIExvZ29cblxuY2xhc3MgTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28obG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmspXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuIyBQcmV2aWV3XG5cbiMgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWV3OiBudWxsXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IFwiMjA6MjJcIlxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0XG5cdFx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0XHR0b3BUaGVtZTogXCJkYXJrXCJcblx0XHRcdGJvdHRvbVRoZW1lOiBcImRhcmtcIlxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3RvcFRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRvcFRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRvcFRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2JvdHRvbVRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcbiMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93QmFyID0gdmFsdWVcblx0XG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblx0XG5cblx0XG5cdFxuXHRcblx0XG5cdGdldExvY2F0aW9uRGF0YTogKCkgPT5cblx0XHRxdWVyeUFycmF5ID0gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gcXVlcnlBcnJheVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdFx0XHRlbHNlIGlmIHZhbHVlUGFydCA9PSBcIm5vcm1hbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcdFx0XG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cdHNldERlc2t0b3BTY2FsZU1vZGU6IChmb3JTdGF0ZSA9IFwibm9ybWFsXCIpID0+XG5cdFx0QHVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdGluaXRTdGF0ZSA9IGZvclN0YXRlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBpbml0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0XHRlbHNlIGluaXRTdGF0ZSA9IFwibm9ybWFsXCJcblx0XHRcblx0XHRzaG91bGRTaG93QnV0dG9uID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImJ1dHRvblwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0J1dHRvbiA9IGZhbHNlXG5cdFx0XHRcdGVsc2UgaWYgdmFsdWVQYXJ0ID09IFwiZmFsc2VcIiB0aGVuIHNob3VsZFNob3dCdXR0b24gPSBmYWxzZVxuXHRcdFxuXHRcdHNob3VsZFNob3dMb2dvID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImxvZ29cIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJvZmZcIiB0aGVuIHNob3VsZFNob3dMb2dvID0gZmFsc2Vcblx0XHRcdFx0ZWxzZSBpZiB2YWx1ZVBhcnQgPT0gXCJmYWxzZVwiIHRoZW4gc2hvdWxkU2hvd0xvZ28gPSBmYWxzZVxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oaW5pdFN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oaW5pdFN0YXRlKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgdGhlbiByZXR1cm5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcblx0XG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXHRcblx0XG5cblx0XG5cdFxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmdfY29sb3Jcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb250ZW50X2NvbG9yLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcCgtMjApXG5cdFx0QG9yaWdpblkgPSAwXG5cdFx0XG5cdFx0c0ggPSAoU2NyZWVuLmhlaWdodCArIDQwKSAvIEBoZWlnaHRcblx0XHRAc2NhbGUgPSBNYXRoLm1pbihTY3JlZW4ud2lkdGggLyBAd2lkdGgsIHNIKVxuXHRcblx0XG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKHRlbXApID0+XG5cdFx0dGVtcC5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhciBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdGVtcCwgd2lkdGg6IHRlbXAud2lkdGggLSAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoNilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5jZW50ZXIoMSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGJvdHRvbVRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0XG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIlxuIyB7U2xpZGVyMH0gPSByZXF1aXJlIFwiUENTbGlkZXIwXCIgXHQjIFNjYWxlIC8gVVJMXG4jIHtTbGlkZXIxfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjFcIlx0IyBQYW5lbHNcbiMge1NsaWRlcjJ9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMlwiXHQjIENyZWF0ZSBTbGlkZVxuIyB7U2xpZGVyM30gPSByZXF1aXJlIFwiUENTbGlkZXIzXCJcdCMgU2hvcnRjdXRzXG4jIHtTbGlkZXI0fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjRcIlx0IyBCYWNrZ3JvdW5kIFBhdXNlIGZvciBWaWRlb3NcbiMge1NsaWRlcjV9ID0gcmVxdWlyZSBcIlBDU2xpZGVyNVwiXHQjIFBsYXlpbmcgVmlkZW9cbntTbGlkZXJQaW5jaH0gPSByZXF1aXJlIFwiUENTbGlkZXJQaW5jaFwiXHQjIFBpbmNoXG5cbmNsYXNzIEZpeFByZXNlbnRhdGlvbkV4cG9ydCBleHRlbmRzIFNsaWRlclBpbmNoXG4jIGNsYXNzIEZpeFByZXNlbnRhdGlvbkV4cG9ydCBleHRlbmRzIFNsaWRlcjBcbmNsYXNzIGV4cG9ydHMuUHJlc2VudGF0aW9uIGV4dGVuZHMgRml4UHJlc2VudGF0aW9uRXhwb3J0XG5cblxuIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuVGV4dCA9IEJ1dHRvbnMuVGV4dFxuU1ZHQnV0dG9uID0gQnV0dG9ucy5TVkdCdXR0b25cblxue1BsYXllclNsaWRlcn0gPSByZXF1aXJlKFwiUENQbGF5ZXJTbGlkZXJcIilcblxuY2xhc3MgU2xpZGVUZW1wbGF0ZSBleHRlbmRzIExheWVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRncmlkRGF0YTogbnVsbFxuXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMlwiXG5cdFx0XHR3aWR0aDogMTQwMCAqIDJcblx0XHRcdGhlaWdodDogOTAwICogMlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNiAqIDJcblx0XHRcdHRpdGxlOiBcIlwiXG5cdFx0XHRpbWFnZTogbnVsbFxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHggPSAoQHBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIChAd2lkdGggKyAxMjApIFxuXHRcdEBwYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXHRcdEBuYW1lID0gXCJzbGlkZSAje0BwYXJlbnQuY2hpbGRyZW4ubGVuZ3RofVwiXG5cdFxuXHRcblx0XG5cdEBkZWZpbmUgJ3RpdGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dyaWREYXRhJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmdyaWREYXRhXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmdyaWREYXRhID0gdmFsdWVcblx0XG5cdFxuXHRcblx0c291cmNlOiAoaW1hZ2UpID0+XG5cdFx0QGltYWdlID0gaW1hZ2Vcblx0XHRyZXR1cm4gQFxuXHRcblx0b3ZlcmxheTogKGltYWdlKSA9PlxuXHRcdHRvcEltYWdlID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxNDAwICogMiwgaGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRpbWFnZTogaW1hZ2Vcblx0XHRyZXR1cm4gQFxuXHRcblx0cmFuZG9tQ29sb3I6ICgpID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRyZXR1cm4gQFxuXG5cblxuXG5cbiMgUzogU2xpZGVcblxuIyBmZm1wZWcgLWkgaW5wdXQubXA0IC1jOnYgbGlieDI2NCAtcHJvZmlsZTp2IG1haW4gLXZmIGZvcm1hdD15dXY0MjBwIC1jOmEgYWFjIC1tb3ZmbGFncyArZmFzdHN0YXJ0IG91dHB1dC5tcDRcbiMgZmZtcGVnIC1pIG91dHB1dC5tcDQgLWZpbHRlcjp2IFwiY3JvcD0xNjgwOjEwODA6MTIwOjBcIiAtYzphIGNvcHkgY3JvcC5tcDRcblxuXG5jbGFzcyBTbGlkZSBleHRlbmRzIFNsaWRlVGVtcGxhdGVcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHNoYXJlTGluazogXCJcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFxuXHRcblx0QGRlZmluZSAnc2hhcmVMaW5rJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNoYXJlTGlua1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaGFyZUxpbmsgPSB2YWx1ZVxuXHRcblx0XG5cdGxpbms6ICh1cmwpID0+XG5cdFx0QHNoYXJlTGluayA9IHVybFxuXHRcdFxuXHRcdEBzaGFyZVByb3RvdHlwZUJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQCwgbmFtZTogXCJzaGFyZUJ1dHRvblwiXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtOTgqMiksIHk6IEFsaWduLmJvdHRvbSgtNDQgKiAyKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogOTAgKiAyLCBoZWlnaHQ6IDkwICogMlxuXHRcdFx0YXNzZXQ6IFNWRy5zaGFyZVByb3RvdHlwZUljb25cblx0XHRcdGhhbmRsZXI6IEBvcGVuUHJvdG90eXBlVVJMXG5cdFxuXHRvcGVuUHJvdG90eXBlVVJMOiAoKSA9PlxuXHRcdHByZXNlbnRhdGlvbiA9IEBwYXJlbnQucGFyZW50XG5cdFx0cHJlc2VudGF0aW9uLm9wZW5VUkwoQHNoYXJlTGluaywgdHJ1ZSlcblxuXG5cblxuXG5cblxuXG5cblxuIyBTOiBUZW1wbGF0ZSAoVmlkZW8pXG5cbmNsYXNzIFNpbXBsZVZpZGVvU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWRlb1VSTDogbnVsbFxuXHRcdFxuXHRcdEBsb2FkaW5nVGV4dCA9IG5ldyBUZXh0XG5cdFx0XHR3aWR0aDogNDAwLCBoZWlnaHQ6IDcwXG5cdFx0XHRmb250U2l6ZTogNDBcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0dGV4dDogXCJMb2FkaW5nXCJcblx0XHRcdFxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcgPSBuZXcgVmlkZW9MYXllclxuXHRcdFx0d2lkdGg6IDE2ODAsIGhlaWdodDogMTA4MFxuXHRcdFx0bmFtZTogXCJ2aWRlb1ZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLm11dGVkID0gdHJ1ZVxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLmF1dG9wbGF5ID0gZmFsc2Vcblx0XHRAdmlkZW9WaWV3LnBsYXllci5sb29wID0gdHJ1ZVxuXHRcdFxuXHRcdFxuIyBcdFx0QHZpZGVvVmlldy5vblRhcCA9PlxuIyBcdFx0XHRAdG9nZ2xlUGxheSgpXG5cdFx0XG4jIFx0XHRFdmVudHMud3JhcChAdmlkZW9WaWV3LnBsYXllcikub24gXCJwbGF5XCIsIC0+XG4jIFx0XHRcdHByaW50IFwiVmlkZW8gcGF1c2VkXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBsb2FkaW5nVGV4dC5wYXJlbnQgPSBAXG5cdFx0QGxvYWRpbmdUZXh0LmNlbnRlcigpXG5cdFx0XG5cdFx0QHZpZGVvVmlldy5wYXJlbnQgPSBAXG5cdFx0QHZpZGVvVmlldy5zY2FsZSA9IEBoZWlnaHQgLyAxMDgwXG5cdFx0QHZpZGVvVmlldy5jZW50ZXIoKVxuXHRcdFxuIyBcdFx0QGNsaXAgPSB0cnVlXG5cdFxuXHRcblx0XG4jIFx0dXJsOiAoKSA9PlxuIyBcdFx0QHZpZGVvID0gXG5cdFxuXHRcblx0QGRlZmluZSAndmlkZW9VUkwnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlkZW9VUkxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlkZW9VUkwgPSB2YWx1ZVxuXHRcblxuXG5cblx0c291cmNlOiAodmlkZW8pID0+XG5cdFx0QHZpZGVvVmlldy52aWRlbyA9IHZpZGVvXG5cdFx0cmV0dXJuIEBcblx0XG5cdGlzUGF1c2VkOiAoKSA9PlxuXHRcdHJldHVybiBAdmlkZW9WaWV3LnBsYXllci5wYXVzZWRcblxuXHRwbGF5OiAoKSA9PlxuXHRcdGlmICFAaXNQYXVzZWQoKSB0aGVuIHJldHVyblxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLnBsYXkoKVxuXHRcblx0cGF1c2U6ICgpID0+XG5cdFx0aWYgQGlzUGF1c2VkKCkgdGhlbiByZXR1cm5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5wYXVzZSgpXG5cdFxuXHR0b2dnbGVQbGF5OiAoKSA9PlxuXHRcdGlmIEBpc1BhdXNlZCgpIHRoZW4gQHBsYXkoKVxuXHRcdGVsc2UgQHBhdXNlKClcblx0XG5cblxuIyBcdGxvYWRWaWRlbzogKHdlYlVSTCkgPT5cbiMgXHRcdEB2aWRlb1ZpZXcucGxheWVyLm11dGVkID0gdHJ1ZVxuIyBcdFx0QHZpZGVvVmlldy5wbGF5ZXIuYXV0b3BsYXkgPSB0cnVlXG4jIFx0XHRAdmlkZW9WaWV3LnZpZGVvID0gQHZpZGVvVVJMXG4jIFx0XHRVdGlscy5kZWxheSAxMCwgPT5cbiMgXHRcdEB2aWRlb1ZpZXcucGxheWVyLnBsYXkoKVxuXHRcdFxuXHRcdFxuIyBcdFx0cHJpbnQgQHZpZGVvVmlldy5wbGF5ZXIucmVhZHlTdGF0ZVxuIyBcdFx0VXRpbHMuZGVsYXkgMTAsID0+XG4jIFx0XHRcdHByaW50IEB2aWRlb1ZpZXcucGxheWVyLnJlYWR5U3RhdGVcblxuXG5cblxuXG4jIFM6IFNsaWRlIChWaWRlbylcblxuY2xhc3MgVmlkZW9TbGlkZSBleHRlbmRzIFNpbXBsZVZpZGVvU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXG5cdFx0IyBQbGF5L1BhdXNlXG5cdFx0QHBsYXlCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEAsIG5hbWU6IFwicGxheUJ1dHRvblwiXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDk4KjIpLCB5OiBBbGlnbi5ib3R0b20oLTQ0ICogMilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDkwICogMiwgaGVpZ2h0OiA5MCAqIDJcblx0XHRcdGFzc2V0OiBTVkcucGxheUljb25cblx0XHRcblx0XHRAcGxheUJ1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0XCJwbGF5aW5nXCI6IHsgYXNzZXQ6IFNWRy5wYXVzZUljb24gfVxuXHRcdFx0XCJwYXVzZWRcIjogeyBhc3NldDogU1ZHLnBsYXlJY29uIH1cblx0XHRcblx0XHRAcGxheUJ1dHRvbi5zdGF0ZVN3aXRjaChcInBsYXlpbmdcIilcblx0XHRcblx0XHRAcGxheUJ1dHRvbi5vbiBFdmVudHMuVGFwLCAoZXZlbnQsIGxheWVyKSAtPlx0XHRcdFxuXHRcdFx0c2xpZGUgPSBAcGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdHNsaWRlLnRvZ2dsZVBsYXkoKVxuXHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZURyYWcgPSBmYWxzZVxuXHRcdFx0XG5cdFx0XG5cdFx0XG5cblxuXHRcdEV2ZW50cy53cmFwKEB2aWRlb1ZpZXcucGxheWVyKS5vbiBcInBhdXNlXCIsID0+XG5cdFx0XHQjIHByaW50IFwiISBuZXh0IHBhdXNlXCJcblx0XHRcdEBwYXVzZSgpXG5cdFx0XHRAcGxheUJ1dHRvbi5zdGF0ZVN3aXRjaChcInBhdXNlZFwiKVxuXHRcdFx0XG5cdFx0XHRwcmVzZW50YXRpb24gPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0aWYgQHZpZGVvVmlldy5wbGF5ZXIgPT0gcHJlc2VudGF0aW9uLmFjdGl2ZVZpZGVvUGxheWVyXG5cdFx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVQbGF5aW5nID0gZmFsc2Vcblx0XHRcblx0XHRcblx0XHRFdmVudHMud3JhcChAdmlkZW9WaWV3LnBsYXllcikub24gXCJwbGF5XCIsID0+XG5cdFx0XHQjIHByaW50IFwiISBuZXh0IHBsYXlcIlxuXHRcdFx0QHBsYXkoKVxuXHRcdFx0QHBsYXlCdXR0b24uc3RhdGVTd2l0Y2goXCJwbGF5aW5nXCIpXG5cdFx0XHRcblx0XHRcdHByZXNlbnRhdGlvbiA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRpZiBAdmlkZW9WaWV3LnBsYXllciA9PSBwcmVzZW50YXRpb24uYWN0aXZlVmlkZW9QbGF5ZXJcblx0XHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZVBsYXlpbmcgPSB0cnVlXG5cdFx0XG5cdFx0XG5cdFx0XG5cblx0XHQjIFByb2dyZXNzXG5cdFx0QHBsYXllclNsaWRlciA9IG5ldyBQbGF5ZXJTbGlkZXJcblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC5wYXJlbnQgPSBAXG5cblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC54ID0gQWxpZ24ubGVmdCgyMTIqMilcblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC55ID0gQWxpZ24uYm90dG9tKC02MSAqIDIpXG5cdFx0XG5cdFx0QHBsYXllclNsaWRlci5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdCMgcHJpbnQgXCJUb3VjaCBTdGFydFwiXG5cdFx0XHRzbGlkZSA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdHNsaWRlLnBhdXNlKClcblx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnID0gdHJ1ZVxuXHRcdFxuXHRcdEBwbGF5ZXJTbGlkZXIub24gXCJjaGFuZ2U6dmFsdWVcIiwgLT5cblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0aWYgcHJlc2VudGF0aW9uLmFjdGl2ZURyYWdcblx0XHRcdFx0c2xpZGUudmlkZW9WaWV3LnBsYXllci5jdXJyZW50VGltZSA9IFV0aWxzLm1vZHVsYXRlKEB2YWx1ZSwgWzAsIDFdLCBbMCwgc2xpZGUudmlkZW9WaWV3LnBsYXllci5kdXJhdGlvbl0sIHRydWUpXG5cdFx0XHRcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgUzogU2xpZGUgKFByb3RvdHlwZSlcblxuY2xhc3MgUHJvdG90eXBlU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdEBwcm90b3R5cGVWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInByb3RvdHlwZVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBwcm90b3R5cGVWaWV3LnBhcmVudCA9IEBcblx0XHRAc2l6ZWQoKVxuXHRcblx0XG5cdFxuXHRcblx0QGRlZmluZSAncFdpZHRoJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBXaWR0aFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wV2lkdGggPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAncEhlaWdodCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wSGVpZ2h0XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnBIZWlnaHQgPSB2YWx1ZVxuXHRcblx0XG5cdFxuXHRcblx0c2NhbGVkOiAodmFsdWUpID0+XG5cdFx0QHByb3RvdHlwZVZpZXcuc2NhbGUgPSB2YWx1ZVxuXHRcdHJldHVybiBAXG5cdFxuXHRib3JkZXJlZDogKHZhbHVlKSA9PlxuXHRcdEBwcm90b3R5cGVWaWV3LmJvcmRlclJhZGl1cyA9IHZhbHVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdHNpemVkOiAod2lkdGggPSAzNzUsIGhlaWdodCA9IDgxMikgPT5cblx0XHRAcHJvdG90eXBlVmlldy53aWR0aCA9IHdpZHRoXG5cdFx0QHByb3RvdHlwZVZpZXcuaGVpZ2h0ID0gaGVpZ2h0XG5cdFx0QHByb3RvdHlwZVZpZXcuY2VudGVyKClcblx0XHRyZXR1cm4gQFxuXHRcblx0XG5cdFxuXHRcblx0c291cmNlOiAob3JpZ2luVVJMKSA9PlxuXHRcdHVybCA9IG9yaWdpblVSTCArIFwiP2xvZ289b2ZmJmJ1dHRvbj1vZmZcIlxuXHRcdFxuXHRcdGNvbnRlbnRWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBwcm90b3R5cGVWaWV3XG5cdFx0XHR3aWR0aDogQHByb3RvdHlwZVZpZXcud2lkdGgsIGhlaWdodDogQHByb3RvdHlwZVZpZXcuaGVpZ2h0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGh0bWw6IFwiPGlmcmFtZSBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOycgc3JjPScje3VybH0nPjwvaWZyYW1lPlwiXG5cdFx0XHRpZ25vcmVFdmVudHM6IGZhbHNlLCBjbGlwOiB0cnVlXG5cdFx0XG5cdFx0cmV0dXJuIEBcblx0XG5cdFxuXHRcblx0Y3JlYXRlV2ViVmlldzogKHdlYlVSTCkgPT5cblx0XHRcblx0XHR2aWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdFx0bmFtZTogXCJ3ZWJ2aWV3XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYm9yZGVyUmFkaXVzOiBAaW1hZ2VSYWRpdXNcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRjb250ZW50VmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB2aWV3XG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRodG1sOiBcIjxpZnJhbWUgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsnIHNyYz0nI3t3ZWJVUkx9Jz48L2lmcmFtZT5cIlxuXHRcdFx0aWdub3JlRXZlbnRzOiBmYWxzZSwgY2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHJldHVybiB2aWV3XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtTbGlkZSwgU2ltcGxlVmlkZW9TbGlkZSwgVmlkZW9TbGlkZSwgUHJvdG90eXBlU2xpZGV9IiwiXG57U2xpZGVyNX0gPSByZXF1aXJlIFwiUENTbGlkZXI1XCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblxuXG4jIFBhbmVsc1xuXG4jIHByaW50IFwiP1wiXG5jbGFzcyBleHBvcnRzLlNsaWRlclBpbmNoIGV4dGVuZHMgU2xpZGVyNVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGxhc3RTbGlkZVNlbGVjdGVkSW5kZXg6IDBcblx0XHRcdGdyaWRCdXR0b25zOiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAb24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0XHRpZiBmcm9tICE9IHRvXG5cdFx0XHRcdGlmIHRvID09IFwicHJlc2VudFwiXG5cdFx0XHRcdFx0bmV4dE9wYWNpdHlWYWx1ZSA9IDFcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdG5leHRPcGFjaXR5VmFsdWUgPSAwXG5cdFx0XHRcdFxuXHRcdFx0XHRAYm90dG9tVmlldy5hbmltYXRlKG9wYWNpdHk6IG5leHRPcGFjaXR5VmFsdWUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblx0XHRcdFx0XG5cdFx0XG5cdFxuXHRAZGVmaW5lICdsYXN0U2xpZGVTZWxlY3RlZEluZGV4Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwaW5jaEJ1dHRvbnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucGluY2hCdXR0b25zXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnBpbmNoQnV0dG9ucyA9IHZhbHVlXG5cdFx0XG5cdFxuXHRcblxuXHRncmlkU2l6ZTogKCkgPT5cblx0XHRyZXR1cm4gM1xuXG5cdGdldEdyaWRHYXA6ICgpID0+XG5cdFx0cmV0dXJuIDIwXG5cblx0Z2V0R3JpZFNjYWxlOiAoKSA9PlxuXHRcdHdzID0gKEB3aWR0aCAtIEBnZXRHcmlkR2FwKCkgKiAoQGdyaWRTaXplKCkgLSAxKSkgLyBAZ3JpZFNpemUoKVxuXHRcdHJldHVybiB3cyAvIEB3aWR0aFxuXG5cblxuXHRwaW5jaFRvR3JpZDogKCkgPT5cblxuXHRcdGlmIEBpc0dyaWQoKVxuXHRcdFx0QHBpbmNoVG9TbGlkZShAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleClcblx0XHRcdHJldHVyblxuXG5cdFx0QHN0YXRlU3dpdGNoKFwiZ3JpZFwiKVxuXHRcdEBzaG93R3JpZENhbmNlbEJ1dHRvbigpXG5cblx0XHRzY2FsZUluZGV4ID0gQGdldEdyaWRTY2FsZSgpXG5cblx0XHRAaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdEBjb250ZW50Lmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRcdCMgQHNjcm9sbFZlcnRpY2FsID0gdHJ1ZVxuXHRcdCMgQGNvbnRlbnQuc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXHRcdEBzY3JvbGxIb3Jpem9udGFsID0gZmFsc2Vcblx0XHQjIEBjb250ZW50LnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXG5cblxuXHRcdGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHNsaWRlLmdyaWREYXRhID1cblx0XHRcdFx0eDogKGluZGV4ICUgQGdyaWRTaXplKCkgLSAxKSAqIChzbGlkZS53aWR0aCAqIHNjYWxlSW5kZXggKyBAZ2V0R3JpZEdhcCgpKVxuXHRcdFx0XHR5OiAoKGluZGV4IC0gaW5kZXggJSBAZ3JpZFNpemUoKSkgLyBAZ3JpZFNpemUoKSAtIDEpICogKHNsaWRlLmhlaWdodCAqIHNjYWxlSW5kZXggKyBAZ2V0R3JpZEdhcCgpKSArIEBnZXRHcmlkR2FwKClcblx0XHRcdFx0c2NhbGU6IHNjYWxlSW5kZXhcblxuXG5cblxuXHRcdEBncmlkLnNjcm9sbFRvUG9pbnQoe3g6IDAsIHk6IEBjb250ZW50LmNoaWxkcmVuW0BsYXN0U2xpZGVTZWxlY3RlZEluZGV4XS5ncmlkRGF0YS55IH0sIGZhbHNlKVxuXHRcdHNlbGVjdGVkU2xpZGVEZWx0YVkgPSBAZ3JpZC5zY3JvbGxZXG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bMF0sIGZhbHNlKVxuXG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBjb250ZW50LmNsaXAgPSBmYWxzZVxuXG5cdFx0QGdyaWQuc2Nyb2xsVmVydGljYWwgPSB0cnVlXG5cdFx0QGdyaWQubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cblx0XHRkZWx0YVJvd051bWJlciA9ICgoQGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gKEBjb250ZW50LmNoaWxkcmVuLmxlbmd0aCAlIEBncmlkU2l6ZSgpKSkgLyBAZ3JpZFNpemUoKSArIDEpXG5cdFx0QGhlaWdodCA9IGRlbHRhUm93TnVtYmVyICogKEBncmlkLmhlaWdodCAvIDMpICsgKGRlbHRhUm93TnVtYmVyICsgMSkgKiAoQGdyaWRTaXplKCkgLyBzY2FsZUluZGV4KVxuXG5cblx0XHRcblx0XHRcblx0XHRmb3Igc2xpZGUsIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRpZiBpbmRleCA9PSBAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleFxuXG5cdFx0XHRcdHNsaWRlLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdHNsaWRlLnggPSAwXG5cdFx0XHRcdHNsaWRlLnkgPSBzZWxlY3RlZFNsaWRlRGVsdGFZXG5cblx0XHRcdFx0Z3JpZERvd25zY2FsZUFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24gc2xpZGUsXG5cdFx0XHRcdFx0eDogc2xpZGUuZ3JpZERhdGEueFxuXHRcdFx0XHRcdHk6IHNsaWRlLmdyaWREYXRhLnlcblx0XHRcdFx0XHRzY2FsZTogc2xpZGUuZ3JpZERhdGEuc2NhbGVcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0Y3VydmU6IEJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpXG5cdFx0XHRcdFx0XHR0aW1lOiAwLjNcblx0XHRcdFx0XG5cdFx0XHRcdGdyaWREb3duc2NhbGVBbmltYXRpb24uc3RhcnQoKVxuXG5cdFx0XHRcdGdyaWREb3duc2NhbGVBbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgKGFuaW1hdGlvbikgLT5cblx0XHRcdFx0XHRsb2NhbFNjcm9sbCA9IEBsYXllci5wYXJlbnQucGFyZW50XG5cdFx0XHRcdFx0bG9jYWxHcmlkQnV0dG9ucyA9IFtdXG5cblx0XHRcdFx0XHRmb3Igc2xpZGUsIGluZGV4IGluIGxvY2FsU2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdFx0XHRcdCMgcHJpbnQgbG9jYWxTbGlkZVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRncmlkQmFja0hhbmRlciA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRcdFx0XHRcdGxvY2FsU2Nyb2xsID0gQHBhcmVudC5wYXJlbnQucGFyZW50XG5cdFx0XHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBAY3VzdG9tLnNsaWRlSW5kZXhcblx0XHRcdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb1NsaWRlKClcblxuXHRcdFx0XHRcdFx0Z3JpZEJhY2tCdXR0b24gPSBuZXcgVGV4dEJ1dHRvblxuXHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHNsaWRlXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiBzbGlkZS53aWR0aCwgaGVpZ2h0OiBzbGlkZS5oZWlnaHRcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdFx0XHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0XHRcdFx0XHRoYW5kbGVyOiBncmlkQmFja0hhbmRlclxuXHRcdFx0XHRcdFx0XHRjdXN0b206XG5cdFx0XHRcdFx0XHRcdFx0c2xpZGVJbmRleDogaW5kZXhcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0bG9jYWxHcmlkQnV0dG9ucy5wdXNoIGdyaWRCYWNrQnV0dG9uXG5cblx0XHRcdFx0XHRcdCMgZ3JpZEJhY2tCdXR0b24ub25UYXAgLT5cblx0XHRcdFx0XHRcdCMgXHRsb2NhbFNjcm9sbCA9IEBwYXJlbnQucGFyZW50LnBhcmVudFxuXHRcdFx0XHRcdFx0IyBcdGxvY2FsU2Nyb2xsLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBAY3VzdG9tLnNsaWRlSW5kZXhcblx0XHRcdFx0XHRcdCMgXHRsb2NhbFNjcm9sbC5waW5jaFRvU2xpZGUoKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmdyaWRCdXR0b25zID0gbG9jYWxHcmlkQnV0dG9uc1xuXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2xpZGUueCA9IHNsaWRlLmdyaWREYXRhLnhcblx0XHRcdFx0c2xpZGUueSA9IHNsaWRlLmdyaWREYXRhLnlcblx0XHRcdFx0c2xpZGUuc2NhbGUgPSBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXG5cblxuXHRcdFxuXHRcdFxuXHRcdEB1cGRhdGVDb250ZW50KClcblx0XHRAZ3JpZC51cGRhdGVDb250ZW50KClcblxuXG5cblx0XG5cblxuXG5cdHBpbmNoVG9TbGlkZTogKCkgPT5cblx0XHRcblx0XHRAc3RhdGVTd2l0Y2goXCJwcmVzZW50XCIpXG5cblx0XHRmb3IgaXRlbSBpbiBAZ3JpZEJ1dHRvbnNcblx0XHRcdGl0ZW0uZGVzdHJveSgpXG5cblx0XHRAaWdub3JlRXZlbnRzID0gZmFsc2Vcblx0XHRAY29udGVudC5pZ25vcmVFdmVudHMgPSBmYWxzZVxuXG5cdFx0IyBAc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXHRcdCMgQGNvbnRlbnQuc2Nyb2xsVmVydGljYWwgPSB0cnVlXG5cdFx0QHNjcm9sbEhvcml6b250YWwgPSB0cnVlXG5cdFx0IyBAY29udGVudC5zY3JvbGxIb3Jpem9udGFsID0gdHJ1ZVxuXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFx0QGNvbnRlbnQuY2xpcCA9IHRydWVcblx0XHQjIEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblx0XHRAZ3JpZC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0IyBAZ3JpZC5jb250ZW50Lmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRcdEBncmlkLnNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHRAZ3JpZC5tb3VzZVdoZWVsRW5hYmxlZCA9IGZhbHNlXG5cblx0XHRAaGVpZ2h0ID0gQGdyaWQuaGVpZ2h0XG5cdFx0QGdyaWQuc2Nyb2xsVG9Ub3AoZmFsc2UpXG5cblxuXHRcdGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHNsaWRlLmdyaWREYXRhID1cblx0XHRcdFx0eDogKHNsaWRlLndpZHRoICsgMTIwKSAqIGluZGV4XG5cdFx0XHRcdHk6IDBcblx0XHRcdFx0c2NhbGU6IDFcblxuXHRcdGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHNsaWRlLnggPSBzbGlkZS5ncmlkRGF0YS54XG5cdFx0XHRzbGlkZS55ID0gc2xpZGUuZ3JpZERhdGEueVxuXHRcdFx0c2xpZGUuc2NhbGUgPSBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXG5cdFx0IyBmb3Igc2xpZGUsIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0IyBcdGlmIGluZGV4ID09IEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4XG5cdFx0IyBcdFx0c2xpZGUuYnJpbmdUb0Zyb250KClcblxuXHRcdCMgXHRcdGdyaWRVcHNjYWxlQW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbiBzbGlkZSxcblx0XHQjIFx0XHRcdHg6IHNsaWRlLmdyaWREYXRhLnhcblx0XHQjIFx0XHRcdHk6IHNsaWRlLmdyaWREYXRhLnlcblx0XHQjIFx0XHRcdHNjYWxlOiBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXHRcdCMgXHRcdFx0b3B0aW9uczpcblx0XHQjIFx0XHRcdFx0Y3VydmU6IEJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpXG5cdFx0IyBcdFx0XHRcdHRpbWU6IDAuM1xuXHRcdFx0XHRcblx0XHQjIFx0XHRncmlkVXBzY2FsZUFuaW1hdGlvbi5zdGFydCgpXG5cblx0XHQjIFx0XHRncmlkVXBzY2FsZUFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAoYW5pbWF0aW9uKSAtPlxuXHRcdCMgXHRcdFx0bG9jYWxTY3JvbGwgPSBAbGF5ZXIucGFyZW50LnBhcmVudFxuXG5cdFx0IyBcdFx0XHRmb3Igc2xpZGUsIGluZGV4IGluIGxvY2FsU2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW5cblx0XHQjIFx0XHRcdFx0c2xpZGUueCA9IHNsaWRlLmdyaWREYXRhLnhcblx0XHQjIFx0XHRcdFx0c2xpZGUueSA9IHNsaWRlLmdyaWREYXRhLnlcblx0XHQjIFx0XHRcdFx0c2xpZGUuc2NhbGUgPSBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXHRcdCMgXHRcdFx0XHQjIHNsaWRlLm9wYWNpdHkgPSAxXG5cblx0XHQjIFx0IyBlbHNlXG5cdFx0IyBcdFx0IyBzbGlkZS5vcGFjaXR5ID0gMC41XG5cblxuXHRcdFxuXHRcdEB1cGRhdGVDb250ZW50KClcblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlbltAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleF0sIGZhbHNlKVxuXG5cdFx0QHVwZGF0ZUN1cnJlbnRQYWdlKClcblxuXG5cblx0XHRcblx0XHQiLCJcbntTbGlkZXI0fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjRcIlxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjUgZXh0ZW5kcyBTbGlkZXI0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGFjdGl2ZVZpZGVvUGxheWVyOiBudWxsXG5cdFx0XHRhY3RpdmVQcm9ncmVzc1NsaWRlcjogbnVsbFxuXHRcdFx0YWN0aXZlRHJhZzogZmFsc2Vcblx0XHRcdGFjdGl2ZVBsYXlpbmc6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEZyYW1lci5Mb29wLm9uIFwicmVuZGVyXCIsID0+XG5cdFx0XHRpZiAhQGFjdGl2ZURyYWcgYW5kIEBhY3RpdmVQbGF5aW5nIGFuZCAhQGlzR3JpZCgpXG5cdFx0XHRcdGlmIEBhY3RpdmVQcm9ncmVzc1NsaWRlciAhPSB1bmRlZmluZWQgYW5kIEBhY3RpdmVQcm9ncmVzc1NsaWRlciAhPSBudWxsXG5cdFx0XHRcdFx0aWYgQGFjdGl2ZVZpZGVvUGxheWVyICE9IHVuZGVmaW5lZCBhbmQgQGFjdGl2ZVZpZGVvUGxheWVyICE9IG51bGxcblx0XHRcdFx0XHRcdEBhY3RpdmVQcm9ncmVzc1NsaWRlci52YWx1ZSA9IFV0aWxzLm1vZHVsYXRlKEBhY3RpdmVWaWRlb1BsYXllci5jdXJyZW50VGltZSwgWzAsIEBhY3RpdmVWaWRlb1BsYXllci5kdXJhdGlvbl0sIFswLCAxXSwgdHJ1ZSlcblxuXG5cblx0dXBkYXRlQ3VycmVudFBhZ2U6ICgpID0+XG5cdFx0c3VwZXIgQHVwZGF0ZUNvbnRlbnQoKVxuXHRcdFxuXHRcdEBzZWxlY3RDdXJyZW50UGxheWluZ1ZpZGVvKClcblx0XHRAYWN0aXZlRHJhZyA9IGZhbHNlXG5cdFxuXHRcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZVByb2dyZXNzU2xpZGVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZVByb2dyZXNzU2xpZGVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZVByb2dyZXNzU2xpZGVyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZVZpZGVvUGxheWVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZVZpZGVvUGxheWVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZVZpZGVvUGxheWVyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZURyYWcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlRHJhZ1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVEcmFnID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZVBsYXlpbmcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlUGxheWluZ1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVQbGF5aW5nID0gdmFsdWVcblx0XG5cdFxuXHRcblx0c2VsZWN0Q3VycmVudFBsYXlpbmdWaWRlbzogKCkgPT5cblx0XHRjdXJyZW50bHlOb3RQbGF5aW5nID0gdHJ1ZVxuXG5cdFx0Zm9yIGl0ZW0gaW4gQHZpZGVvU2xpZGVzXG5cdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRjdXJyZW50bHlOb3RQbGF5aW5nID0gZmFsc2Vcblx0XHRcdFx0QGFjdGl2ZVByb2dyZXNzU2xpZGVyID0gQGN1cnJlbnRQYWdlLnBsYXllclNsaWRlclxuXHRcdFx0XHRAYWN0aXZlVmlkZW9QbGF5ZXIgPSBAY3VycmVudFBhZ2UudmlkZW9WaWV3LnBsYXllclxuXHRcdFxuXHRcdGlmIGN1cnJlbnRseU5vdFBsYXlpbmdcblx0XHRcdEBhY3RpdmVQcm9ncmVzc1NsaWRlciA9IG51bGxcblx0XHRcdEBhY3RpdmVWaWRlb1BsYXllciA9IG51bGxcbiIsIlxue1NsaWRlcjN9ID0gcmVxdWlyZSBcIlBDU2xpZGVyM1wiXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyNCBleHRlbmRzIFNsaWRlcjNcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBvbiBcImNoYW5nZTpjdXJyZW50UGFnZVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUN1cnJlbnRQYWdlKClcblx0XHRcblx0XHRAY29udGVudC5vbiBcImNoYW5nZTpjaGlsZHJlblwiLCAtPlxuXHRcdFx0QHBhcmVudC5zbGlkZUNoYW5nZXJWaWV3LnBhZ2VzID0gQGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0QHBhcmVudC51cGRhdGVDdXJyZW50UGFnZSgpXG5cdFx0XG5cdFxuXHRcblx0XG5cdHVwZGF0ZUN1cnJlbnRQYWdlOiAoKSA9PlxuXHRcdGlmICFAaXNHcmlkKClcblx0XHRcdGZvciBpdGVtLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRcdEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4ID0gaW5kZXhcblx0XHRcdFx0XHRicmVha1xuXHRcdFxuXG5cdFx0QHBhdXNlQmFja2dyb3VuZFZpZGVvcygpXG5cdFx0QHVwZGF0ZUN1cnJlbnRQYWdlU2xpZGVyKClcblxuXHRcdGlmICFAaXNHcmlkKCkgdGhlbiBAcGxheUFjdGl2ZVZpZGVvKClcblx0XHRcdFxuXHRcblxuXG5cdHBsYXlBY3RpdmVWaWRlbzogKCkgPT5cblx0XHRmb3IgY3VycmVudFZpZGVvU2xpZGUgaW4gQHZpZGVvU2xpZGVzXG5cdFx0XHRpZiBjdXJyZW50VmlkZW9TbGlkZSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0Y3VycmVudFZpZGVvU2xpZGUucGxheSgpXG5cdFx0XHRcdHJldHVyblxuXG5cblx0cGF1c2VCYWNrZ3JvdW5kVmlkZW9zOiAoKSA9PlxuXHRcdGZvciBjdXJyZW50VmlkZW9TbGlkZSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGlmIGN1cnJlbnRWaWRlb1NsaWRlICE9IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRjdXJyZW50VmlkZW9TbGlkZS5wYXVzZSgpXG5cdFxuXHRzaG93R3JpZENhbmNlbEJ1dHRvbjogKCkgPT5cblx0XHRAc2xpZGVDaGFuZ2VyVmlldy5jdXJyZW50ID0gLTFcblx0XG5cdHVwZGF0ZUN1cnJlbnRQYWdlU2xpZGVyOiAoKSA9PlxuXHRcdGlmIEBpc0dyaWQoKVxuXHRcdFx0QHNob3dHcmlkQ2FuY2VsQnV0dG9uKClcblx0XHRcdHJldHVyblxuXHRcdFxuXHRcdGZvciBpdGVtLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0aWYgaXRlbSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0QHNsaWRlQ2hhbmdlclZpZXcuY3VycmVudCA9IChpbmRleCArIDEpXG5cdFx0XHRcdHJldHVybiIsIlxuXG57U2xpZGVyMn0gPSByZXF1aXJlIFwiUENTbGlkZXIyXCJcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIzIGV4dGVuZHMgU2xpZGVyMlxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QGluaXRTaG9ydGN1dHMoKVxuXHRcblx0XG5cdGluaXRTaG9ydGN1dHM6ICgpID0+XG5cdFx0bG9jYWxTY3JvbGwgPSBAXG5cdFx0XG5cdFx0RXZlbnRzLndyYXAod2luZG93KS5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCAoZXZlbnQpIC0+XG5cdFx0XHRcblx0XHRcdGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd0xlZnRcIlxuXHRcdFx0XHRpZiAhbG9jYWxTY3JvbGwuaXNHcmlkKCkgdGhlbiBsb2NhbFNjcm9sbC5zbmFwVG9OZXh0UGFnZShcImxlZnRcIiwgZmFsc2UpXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIkFycm93UmlnaHRcIlxuXHRcdFx0XHRpZiAhbG9jYWxTY3JvbGwuaXNHcmlkKCkgdGhlbiBsb2NhbFNjcm9sbC5zbmFwVG9OZXh0UGFnZShcInJpZ2h0XCIsIGZhbHNlKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlDXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwuY29weUJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5RlwiXG5cdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleVJcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5yZXN0YXJ0QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlBXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb0dyaWQoKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJFc2NhcGVcIlxuXHRcdFx0XHRpZiBsb2NhbFNjcm9sbC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZnVsbHNjcmVlblwiXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuZnVsbHNjcmVlbkJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiU3BhY2VcIlxuXHRcdFx0XHR0cnkgbG9jYWxTY3JvbGwuY3VycmVudFBhZ2UudG9nZ2xlUGxheSgpXG5cdCIsIlxue1NsaWRlcjF9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMVwiXG5cblxuU2xpZGVUZW1wbGF0ZSA9IHJlcXVpcmUoXCJQQ1NsaWRlXCIpXG5TbGlkZSA9IFNsaWRlVGVtcGxhdGUuU2xpZGVcblNpbXBsZVZpZGVvU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlNpbXBsZVZpZGVvU2xpZGVcblZpZGVvU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlZpZGVvU2xpZGVcblByb3RvdHlwZVNsaWRlID0gU2xpZGVUZW1wbGF0ZS5Qcm90b3R5cGVTbGlkZVxuXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyMiBleHRlbmRzIFNsaWRlcjFcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlkZW9TbGlkZXM6IFtdXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cdEBkZWZpbmUgJ3ZpZGVvU2xpZGVzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZGVvU2xpZGVzXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2xpZGU6IChuYW1lZCA9IFwiXCIpID0+XG5cdFx0cmV0dXJuIG5ldyBTbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcblx0XG5cdHZpZGVvU2xpZGU6IChuYW1lID0gXCJcIikgPT5cblx0XHRzbGlkZSA9IG5ldyBWaWRlb1NsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0QHZpZGVvU2xpZGVzLnB1c2ggc2xpZGVcblx0XHRyZXR1cm4gc2xpZGVcblx0XG5cdHNpbXBsZVZpZGVvU2xpZGU6IChuYW1lID0gXCJcIikgPT5cblx0XHRzbGlkZSA9IG5ldyBTaW1wbGVWaWRlb1NsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0QHZpZGVvU2xpZGVzLnB1c2ggc2xpZGVcblx0XHRyZXR1cm4gc2xpZGVcblx0XG5cdFxuXHRwcm90b3R5cGVTbGlkZTogKG5hbWUgPSBcIlwiKSA9PlxuXHRcdHJldHVybiBuZXcgUHJvdG90eXBlU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnQiLCJcblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbntTbGlkZXIwfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjBcIlxuIyB7U2xpZGVyUGluY2h9ID0gcmVxdWlyZSBcIlBDU2xpZGVyUGluY2hcIlxue1NsaWRlQ2hhbmdlcn0gPSByZXF1aXJlIFwiUENTbGlkZUNoYW5nZXJcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuVGV4dCA9IEJ1dHRvbnMuVGV4dFxuVGV4dEJ1dHRvbiA9IEJ1dHRvbnMuVGV4dEJ1dHRvblxuVGV4dEJ1dHRvbiA9IEJ1dHRvbnMuVGV4dEJ1dHRvblxuU1ZHQnV0dG9uID0gQnV0dG9ucy5TVkdCdXR0b25cbkNvcHlCdXR0b24gPSBCdXR0b25zLkNvcHlCdXR0b25cblxuXG4jIFBhbmVsc1xuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjEgZXh0ZW5kcyBTbGlkZXIwXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEB0b3BWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBjYW52YXMsIG5hbWU6IFwidG9wVmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAY2FudmFzLndpZHRoLCBoZWlnaHQ6IDU2XG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGNhbnZhcywgbmFtZTogXCJib3R0b21WaWV3XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEBjYW52YXMud2lkdGgsIGhlaWdodDogNTYsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFxuXHRcdGZvciBpdGVtIGluIFtAdG9wVmlldywgQGJvdHRvbVZpZXddXG5cdFx0XHRpdGVtLnNlbmRUb0JhY2soKVxuXHRcdFx0aXRlbS5zdGF0ZXMgPVxuXHRcdFx0XHRcIndpbmRvd1wiOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFx0XHRcImZ1bGxzY3JlZW5cIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcblx0XHRcblx0XHRcblx0XHQjIFRvcCBWaWV3XG5cdFx0QGxvZ29CdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImxvZ29cIlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyLCBhc3NldDogU1ZHLmxvZ29JY29uXG5cdFx0XHRoYW5kbGVyOiBAb3BlblVSTEhvbWVcblx0XHRcblx0XHRAdGl0bGVUZXh0ID0gbmV3IFRleHRcblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwidGl0bGVcIlxuXHRcdFx0dGV4dDogQHRpdGxlLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcdEBjb3B5QnV0dG9uID0gbmV3IENvcHlCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiY29weSBsaW5rXCJcblx0XHRcdHRleHQ6IFwiQ29weSBMaW5rXCIsIHRleHRBbGlnbjogXCJyaWdodFwiLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGN1c3RvbTogeyB4OiAtNDAtMjAtMjQgfVxuXHRcdFx0bGluazogd2luZG93LmxvY2F0aW9uXG5cdFx0XG5cdFx0QGZ1bGxzY3JlZW5CdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImZ1bGxzY3JlZW5cIlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMjAsIGhlaWdodDogMjAsIGFzc2V0OiBTVkcuZnVsbHNjcmVlbkljb25cblx0XHRcdGhhbmRsZXI6IEBjaGFuZ2VTY2FsZVxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0zNiB9XG5cdFx0XG5cblxuXG5cdFx0IyBCb3R0b20gVmlld1xuXHRcdEBzbGlkZUNoYW5nZXJWaWV3ID0gbmV3IFNsaWRlQ2hhbmdlclxuXHRcdFx0cGFyZW50OiBAYm90dG9tVmlldywgbmFtZTogXCJzbGlkZSBjaGFuZ2VyXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0c2xpZGVyOiBAXG5cdFx0XG5cdFx0QHJlc3RhcnRCdXR0b24gPSBuZXcgVGV4dEJ1dHRvblxuXHRcdFx0cGFyZW50OiBAYm90dG9tVmlldywgbmFtZTogXCJyZXN0YXJ0XCJcblx0XHRcdHRleHQ6IFwiUmVzdGFydCAoUilcIiwgdGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0yMDAwKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoYW5kbGVyOiBAcmVzdGFydEhhbmRsZXJcblx0XHRcdGN1c3RvbTogeyB4OiAtMjAwMCB9XG5cdFx0XG5cdFx0XG5cblxuXHRcdEB1cGRhdGVWaWV3QnVpbGRlclNpemUoQGNhbnZhcylcblx0XHRAY2FudmFzLm9uIFwiY2hhbmdlOnNpemVcIiwgPT5cblx0XHRcdEB1cGRhdGVWaWV3QnVpbGRlclNpemUoQGNhbnZhcylcblx0XHRcblx0XHRcblx0XG5cblx0dXBkYXRlVmlld0J1aWxkZXJTaXplOiAoYW5jaG9yKSA9PlxuXHRcdFxuXHRcdEB0b3BWaWV3LndpZHRoID0gYW5jaG9yLndpZHRoXG5cdFx0XG5cdFx0aWYgYW5jaG9yLndpZHRoIDwgNzQwXG5cdFx0XHRAdGl0bGVUZXh0LnggPSBBbGlnbi5sZWZ0KEBsb2dvQnV0dG9uLngpXG5cdFx0XHRAdGl0bGVUZXh0LnkgPSBBbGlnbi50b3AoQHRvcFZpZXcuaGVpZ2h0ICsgMTApXG5cdFx0XHRcblx0XHRcdEBjb3B5QnV0dG9uLnggPSBBbGlnbi5sZWZ0KEBsb2dvQnV0dG9uLngpXG5cdFx0XHRAY29weUJ1dHRvbi55ID0gQWxpZ24udG9wKEB0b3BWaWV3LmhlaWdodCArIDM2KVxuXHRcdGVsc2Vcblx0XHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0QHRpdGxlVGV4dC55ID0gQWxpZ24uY2VudGVyKDIpXG5cdFx0XHRcblx0XHRcdEBjb3B5QnV0dG9uLnggPSBBbGlnbi5yaWdodChAY29weUJ1dHRvbi5jdXN0b20ueClcblx0XHRcdEBjb3B5QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXIoMilcblx0XHRcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbi54ID0gQWxpZ24ucmlnaHQoQGZ1bGxzY3JlZW5CdXR0b24uY3VzdG9tLngpXG5cdFx0QGZ1bGxzY3JlZW5CdXR0b24ueSA9IEFsaWduLmNlbnRlcigyKVxuXHRcdFxuXHRcdEBib3R0b21WaWV3LndpZHRoID0gYW5jaG9yLndpZHRoXG5cdFx0QHNsaWRlQ2hhbmdlclZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcdCMgaGVpZ2h0XG5cdFx0QGJvdHRvbVZpZXcueSA9IEFsaWduLmJvdHRvbSIsIlxuXG4jIFNjYWxlICYgVVJMIGhhbmRsaW5nXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyMCBleHRlbmRzIFBhZ2VDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRjYW52YXNCYWNrZ3JvdW5kTGF5ZXIgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRuYW1lOiBcImNhbnZhc1wiXG5cdFx0XG5cdFx0Y2FudmFzQmFja2dyb3VuZExheWVyLnN0YXRlcyA9XG5cdFx0XHRcIndpbmRvd1wiOiB7IGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIgfVxuXHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgYmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIiB9XG5cdFx0XG5cblx0XHRncmlkU2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBjYW52YXNCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdG5hbWU6IFwiZ3JpZFwiXG5cdFx0XHR3aWR0aDogMTQwMCAqIDIsIGhlaWdodDogOTAwICogMlxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlLCBzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpZ25vcmVFdmVudHM6IHRydWVcblx0XHRcblx0XHRncmlkU2Nyb2xsLnN0YXRlcyA9XG5cdFx0XHRcIndpbmRvd1wiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IHNjYWxlOiAxIH1cblxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGNhbnZhczogY2FudmFzQmFja2dyb3VuZExheWVyXG5cdFx0XHRncmlkOiBncmlkU2Nyb2xsXG5cdFxuXHRcdFx0cGFyZW50OiBncmlkU2Nyb2xsLmNvbnRlbnRcblx0XHRcdHdpZHRoOiBncmlkU2Nyb2xsLndpZHRoLCBoZWlnaHQ6IGdyaWRTY3JvbGwuaGVpZ2h0XG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2UsIHNjcm9sbEhvcml6b250YWw6IHRydWVcblx0XHRcdHByZXNlbnRhdGlvblRpdGxlOiBcIlVudGl0bGVkXCJcblx0XHRcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY29udGVudC5kcmFnZ2FibGUucHJvcGFnYXRlRXZlbnRzID0gZmFsc2VcblxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJncmlkXCI6IHsgb3BhY2l0eTogMSB9XG5cdFx0XHRcInByZXNlbnRcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRAc3RhdGVTd2l0Y2goXCJwcmVzZW50XCIpXG5cblx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5kaXNhYmxlKClcblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblx0XHRcblx0XHRAaW5pdFNjYWxlKClcblx0XHRcblx0XHRAdXBkYXRlU2l6ZSgpXG5cdFx0QGNhbnZhcy5vbiBcImNoYW5nZTpzaXplXCIsID0+XG5cdFx0XHRAdXBkYXRlU2l6ZSgpXG5cdFxuXHRcblx0QGRlZmluZSAndGl0bGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJlc2VudGF0aW9uVGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJlc2VudGF0aW9uVGl0bGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnY2FudmFzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmNhbnZhc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5jYW52YXMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZ3JpZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmdyaWQgPSB2YWx1ZVxuXHRcblx0XG5cdFxuXHRpc0dyaWQ6ICgpID0+XG5cdFx0cmV0dXJuIEBzdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZ3JpZFwiXG5cdFxuXHR1cGRhdGVTaXplOiAoKSA9PlxuXHRcdEBpbml0U2NhbGUoQGdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XG5cdFxuXHRpbml0U2NhbGU6IChmb3JTdGF0ZSA9IFwid2luZG93XCIpID0+XG5cblx0XHRzY2FsZVggPSAoQGNhbnZhcy53aWR0aCAtIDIwKSAvIEBncmlkLndpZHRoXG5cdFx0c2NhbGVZID0gKEBjYW52YXMuaGVpZ2h0IC0gMTIwKSAvIEBncmlkLmhlaWdodFxuXHRcdEBncmlkLnN0YXRlcy53aW5kb3cuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XHRcblx0XHRzY2FsZVggPSBAY2FudmFzLndpZHRoIC8gQGdyaWQud2lkdGhcblx0XHRzY2FsZVkgPSBAY2FudmFzLmhlaWdodCAvIEBncmlkLmhlaWdodFxuXHRcdEBncmlkLnN0YXRlcy5mdWxsc2NyZWVuLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFx0XG5cdFx0QGdyaWQuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0QGNhbnZhcy5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRAZ3JpZC5jZW50ZXIoKVxuXHRcblx0XG5cdCMgZm9yIHJlYWN0XG5cdGNoYW5nZVNjYWxlOiAoKSA9PlxuXHRcdFxuXHRcdGlmIEBncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJ3aW5kb3dcIiB0aGVuIG5leHRTdGF0ZSA9IFwiZnVsbHNjcmVlblwiXG5cdFx0ZWxzZSBuZXh0U3RhdGUgPSBcIndpbmRvd1wiXG5cdFx0XG5cdFx0QGdyaWQuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAY2FudmFzLmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QHRvcFZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAYm90dG9tVmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblxuXHRyZXN0YXJ0SGFuZGxlcjogKCkgPT5cblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlblswXSwgZmFsc2UpXG5cdFxuXHRcblx0b3BlblVSTDogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCIsIGlzQmxhbmsgPSBmYWxzZSkgPT5cblx0XHRpZiBpc0JsYW5rIHRoZW4gd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuXHRcdGVsc2VcbiMgXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIj9zbGlkZUlEXCJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybFxuXHRcblx0b3BlblVSTEhvbWU6ID0+XG5cdFx0QG9wZW5VUkwoXCJodHRwczovL3RpbGxsdXIucnVcIiwgZmFsc2UpXG5cbiIsIlxuXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuIyBUZXh0ID0gQnV0dG9ucy5UZXh0XG5UZXh0QnV0dG9uID0gQnV0dG9ucy5UZXh0QnV0dG9uXG5TVkdCdXR0b24gPSBCdXR0b25zLlNWR0J1dHRvblxuXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVDaGFuZ2VyIGV4dGVuZHMgTGF5ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG5hbWU6IFwicHJvZ3Jlc3Mgdmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiAxMjBcblx0XHRcdGhlaWdodDogNTZcblx0XHRcdHBhZ2VzOiAxXG5cdFx0XHRjdXJyZW50OiAxXG5cdFx0XHRzbGlkZXI6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdHRlc3RIYWRsZXIgPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0dHJ5IEBwYXJlbnQuc2xpZGVyLnBpbmNoVG9HcmlkKClcblxuXG5cdFx0QGN1cnJlbnRUZXh0ID0gbmV3IFRleHRCdXR0b25cblx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIiwgd2lkdGg6IDEyMCwgbGV0dGVyU3BhY2luZzogM1xuXHRcdFx0aGFuZGxlcjogdGVzdEhhZGxlclxuXHRcdFxuXHRcdEBjdXJyZW50VGV4dC51cGRhdGVUdXBsZSh7IG5vcm1hbDogMSwgaG92ZXI6IDAuOCB9KVxuXG5cdFx0QHByZXZCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRuYW1lOiBcInByZXZcIiwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBhc3NldDogU1ZHLnByZXZJY29uXG5cdFx0XHRoYW5kbGVyOiBAbW92ZUxlZnRcblx0XHRcblx0XHRAbmV4dEJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwibmV4dFwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcubmV4dEljb25cblx0XHRcdGhhbmRsZXI6IEBtb3ZlUmlnaHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBjdXJyZW50VGV4dC5wYXJlbnQgPSBAXG5cdFx0QGN1cnJlbnRUZXh0LnkgPSBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0QGN1cnJlbnRUZXh0LnN0eWxlID1cblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwidG51bVwiXG5cdFx0XHRcImZvbnQtdmFyaWFudC1udW1lcmljXCI6IFwidGFidWxhci1udW1zIGxpbmluZy1udW1zXCJcblx0XHRcblx0XHRAcHJldkJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QHByZXZCdXR0b24ueCA9IEFsaWduLmxlZnRcblx0XHRAcHJldkJ1dHRvbi55ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0QG5leHRCdXR0b24ucGFyZW50ID0gQFxuXHRcdEBuZXh0QnV0dG9uLnggPSBBbGlnbi5yaWdodFxuXHRcdEBuZXh0QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XG5cdEBkZWZpbmUgJ3NsaWRlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zbGlkZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNsaWRlciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwYWdlcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wYWdlc1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMucGFnZXMgPSB2YWx1ZVxuXHRcdFx0QGN1cnJlbnRUZXh0LnRleHQgPSBcIiN7QGN1cnJlbnR9LyN7QHBhZ2VzfVwiXG5cblx0QGRlZmluZSAnY3VycmVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jdXJyZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5jdXJyZW50ID0gdmFsdWVcblxuXHRcdFx0aWYgQGN1cnJlbnQgIT0gLTFcblx0XHRcdFx0IyB0aGVuIEBwYXJlbnQuYW5pbWF0ZShvcGFjaXR5OiAwLCBjdXJ2ZTogU3ByaW5nKGRhbXJwaW5nOiAxKSwgdGltZTogMC40KVxuXHRcdFx0IyBlbHNlXG5cdFx0XHRcdCMgQHBhcmVudC5hbmltYXRlKG9wYWNpdHk6IDEsIGN1cnZlOiBTcHJpbmcoZGFtcnBpbmc6IDEpLCB0aW1lOiAwLjQpXG5cdFx0XHRcdEBjdXJyZW50VGV4dC50ZXh0ID0gXCIje0BjdXJyZW50fS8je0BwYWdlc31cIlxuXHRcdFx0XG5cdFxuXG5cblxuXHRtb3ZlTGVmdDogKCkgPT5cbiMgXHRcdHByaW50IEBzbGlkZXJcblx0XHRAc2xpZGVyLnNuYXBUb05leHRQYWdlKFwibGVmdFwiLCBmYWxzZSlcblx0XG5cdG1vdmVSaWdodDogKCkgPT5cbiMgXHRcdHByaW50IEBzbGlkZXJcblx0XHRAc2xpZGVyLnNuYXBUb05leHRQYWdlKFwicmlnaHRcIiwgZmFsc2UpIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmNvbG9yX29uRGFyayA9IFwiI2ZmZlwiXG5jb2xvcl9vbkxpZ2h0ID0gXCIjMDAwXCJcblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuXG5leHBvcnRzLmxvZ29JY29uID0geyBvbkRhcms6IGdldExvZ28oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0TG9nbyhjb2xvcl9vbkxpZ2h0KX1cblxuXG5cbmdldEZ1bGxzY3JlZW4gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMTEuMDQxIDIuOTIxNjRDMTEuMDQxIDMuNDQ0NzMgMTEuNDIyNSAzLjgzNDk4IDExLjk1MzMgMy44MzQ5OEgxMi41NDIzTDE1LjExMzUgMy42NjA2MUwxMy4wOTggNS41Nzg2MkwxMC43MDkyIDcuOTUzM0MxMC41MjY3IDguMTI3NjYgMTAuNDQzOCA4LjM1MTg0IDEwLjQ0MzggOC41OTI2M0MxMC40NDM4IDkuMTU3MjQgMTAuODI1MyA5LjU2NDA5IDExLjM4OTMgOS41NjQwOUMxMS42NDY0IDkuNTY0MDkgMTEuODcwNCA5LjQ2NDQ1IDEyLjA1MjkgOS4yOTAwOUwxNC40MzM0IDYuOTA3MTFMMTYuMzQxMSA0Ljg4MTE2TDE2LjE2NjkgNy40NzE3MlY4LjExOTM2QzE2LjE2NjkgOC42NDI0NSAxNi41NDg1IDkuMDQxIDE3LjA3OTMgOS4wNDFDMTcuNjEwMiA5LjA0MSAxOCA4LjY1MDc1IDE4IDguMTE5MzZWMy41MTExNkMxOCAyLjU1NjMxIDE3LjQ0NDMgMiAxNi40OTA0IDJMMTEuOTUzMyAyQzExLjQzMDggMiAxMS4wNDEgMi4zOTAyNCAxMS4wNDEgMi45MjE2NFpNMiAxMS44ODA2TDIgMTYuNDg4OEMyIDE3LjQ0MzcgMi41NTU3MyAxOCAzLjUwOTU5IDE4SDguMDQ2NjZDOC41NjkyMSAxOCA4Ljk1OTA1IDE3LjYwMTUgOC45NTkwNSAxNy4wNzg0QzguOTU5MDUgMTYuNTU1MyA4LjU3NzUgMTYuMTY1IDguMDQ2NjYgMTYuMTY1SDcuNDU3NzVMNC44ODY0NyAxNi4zMzk0TDYuOTAyMDIgMTQuNDIxNEw5LjI5MDgyIDEyLjA0NjdDOS40NzMzIDExLjg3MjMgOS41NTYyNSAxMS42NDgyIDkuNTU2MjUgMTEuMzk5MUM5LjU1NjI1IDEwLjgzNDUgOS4xNzQ3IDEwLjQyNzYgOC42MTA2OCAxMC40Mjc2QzguMzUzNTUgMTAuNDI3NiA4LjEyMTMxIDEwLjUyNzIgNy45NDcxMiAxMC43MDk5TDUuNTY2NjIgMTMuMDkyOUwzLjY1ODg5IDE1LjExODhMMy44MzMwNyAxMi41MjgzTDMuODMzMDcgMTEuODgwNkMzLjgzMzA3IDExLjM0OTIgMy40NTE1MyAxMC45NTkgMi45MjA2OCAxMC45NTlDMi4zODk4NCAxMC45NTkgMiAxMS4zNDkyIDIgMTEuODgwNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5mdWxsc2NyZWVuSWNvbiA9IHsgb25EYXJrOiBnZXRGdWxsc2NyZWVuKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldEZ1bGxzY3JlZW4oY29sb3Jfb25MaWdodCl9XG5cblxuXG5cbmdldE5leHQgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNC43OTY0IDEyLjc5MzFMOS41ODYyNyA4TDQuNzk2NCAzLjIwNjg3QzQuNDA2MDEgMi44MTYyMSA0LjQwNjIyIDIuMTgzMDQgNC43OTY4OCAxLjc5MjY1QzUuMTg3NTQgMS40MDIyNiA1LjgyMDcgMS40MDI0OCA2LjIxMTA5IDEuNzkzMTNMMTEuNzA3MyA3LjI5MzEzQzEyLjA5NzUgNy42ODM2IDEyLjA5NzUgOC4zMTY0IDExLjcwNzMgOC43MDY4N0w2LjIxMTA5IDE0LjIwNjlDNS44MjA3IDE0LjU5NzUgNS4xODc1NCAxNC41OTc3IDQuNzk2ODggMTQuMjA3M0M0LjQwNjIyIDEzLjgxNyA0LjQwNjAxIDEzLjE4MzggNC43OTY0IDEyLjc5MzFaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMubmV4dEljb24gPSB7IG9uRGFyazogZ2V0TmV4dChjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXROZXh0KGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFByZXYgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNi40MTc0OCA4TDExLjIwNzMgMTIuNzkzMUMxMS41OTc3IDEzLjE4MzggMTEuNTk3NSAxMy44MTcgMTEuMjA2OSAxNC4yMDczQzEwLjgxNjIgMTQuNTk3NyAxMC4xODMgMTQuNTk3NSA5Ljc5MjY1IDE0LjIwNjlMNC4yOTY0IDguNzA2ODdDMy45MDYyIDguMzE2NCAzLjkwNjIgNy42ODM2IDQuMjk2NCA3LjI5MzEzTDkuNzkyNjUgMS43OTMxM0MxMC4xODMgMS40MDI0OCAxMC44MTYyIDEuNDAyMjYgMTEuMjA2OSAxLjc5MjY1QzExLjU5NzUgMi4xODMwNCAxMS41OTc3IDIuODE2MjEgMTEuMjA3MyAzLjIwNjg3TDYuNDE3NDggOFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wcmV2SWNvbiA9IHsgb25EYXJrOiBnZXRQcmV2KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFByZXYoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0UGxheSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiB2aWV3Qm94PVwiMCAwIDE4MCAxODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxjaXJjbGUgb3BhY2l0eT1cIjAuNVwiIGN4PVwiOTBcIiBjeT1cIjkwXCIgcj1cIjkwXCIgZmlsbD1cIiMwMDBcIi8+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNzYuNzE1OCA1OC40OTE0QzczLjA1MTMgNTYuMjM2NCA2OC4zMzM0IDU4Ljg3MjkgNjguMzMzNCA2My4xNzU2VjExNi44MjRDNjguMzMzNCAxMjEuMTI3IDczLjA1MTUgMTIzLjc2MyA3Ni43MTYgMTIxLjUwOEwxMjMuOTcyIDk0LjY4MjZDMTI3LjQ2MiA5Mi41MzQ5IDEyNy40NjIgODcuNDYxOSAxMjMuOTcyIDg1LjMxNDNMNzYuNzE1OCA1OC40OTE0WlwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGwtb3BhY2l0eT1cIjAuOFwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5SWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXkoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFBhdXNlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPGNpcmNsZSBvcGFjaXR5PVwiMC41XCIgY3g9XCI5MFwiIGN5PVwiOTBcIiByPVwiOTBcIiBmaWxsPVwiIzAwMFwiLz5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03MCA1NkM2NS41ODE3IDU2IDYyIDU5LjU4MTcgNjIgNjRWMTE2QzYyIDEyMC40MTggNjUuNTgxNyAxMjQgNzAgMTI0SDc2QzgwLjQxODMgMTI0IDg0IDEyMC40MTggODQgMTE2VjY0Qzg0IDU5LjU4MTcgODAuNDE4MyA1NiA3NiA1Nkg3MFpNMTA0IDU2Qzk5LjU4MTcgNTYgOTYgNTkuNTgxNyA5NiA2NFYxMTZDOTYgMTIwLjQxOCA5OS41ODE3IDEyNCAxMDQgMTI0SDExMEMxMTQuNDE4IDEyNCAxMTggMTIwLjQxOCAxMTggMTE2VjY0QzExOCA1OS41ODE3IDExNC40MTggNTYgMTEwIDU2SDEwNFpcIiBmaWxsPVwid2hpdGVcIiBmaWxsLW9wYWNpdHk9XCIwLjhcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGF1c2VJY29uID0geyBvbkRhcms6IGdldFBhdXNlKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBhdXNlKGNvbG9yX29uTGlnaHQpIH1cblxuXG5nZXRWaWRlb1NsaWRlciA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIzNjhcIiBoZWlnaHQ9XCIxMTJcIiB2aWV3Qm94PVwiMCAwIDM2OCAxMTJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxyZWN0IG9wYWNpdHk9XCIwLjNcIiB3aWR0aD1cIjM2OFwiIGhlaWdodD1cIjExMlwiIHJ4PVwiNTZcIiBmaWxsPVwiIzAwMFwiLz5cbjxyZWN0IG9wYWNpdHk9XCIwLjVcIiB4PVwiMzRcIiB5PVwiNTJcIiB3aWR0aD1cIjMwMFwiIGhlaWdodD1cIjhcIiByeD1cIjRcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMudmlkZW9TbGlkZXJJY29uID0geyBvbkRhcms6IGdldFZpZGVvU2xpZGVyKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFZpZGVvU2xpZGVyKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFNoYXJlUHJvdG90eXBlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHJlY3Qgb3BhY2l0eT1cIjAuM1wiIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgcng9XCI5MFwiIGZpbGw9XCIjMDAwXCIvPlxuPGcgb3BhY2l0eT1cIjAuNlwiPlxuPHBhdGggZD1cIk0xMDEuNjcgNTcuNzU4Nkg4MC4xNzYyQzc2LjgzMTIgNTcuNzU4NiA3NC4wMjE2IDYwLjA1MDkgNzMuMjMyNSA2My4xNTAzQzcyLjk4ODUgNjQuMTA4OSA3Mi4yMDk1IDY0LjkyMzMgNzEuMjIwMyA2NC45MjMzSDY3LjYzNzlDNjYuNjQ4NiA2NC45MjMzIDY1LjgzNDkgNjQuMTE3NCA2NS45NTcxIDYzLjEzNTdDNjYuODM3IDU2LjA2NTQgNzIuODY3NiA1MC41OTM4IDgwLjE3NjIgNTAuNTkzOEgxMDEuNjdDMTA5LjU4NCA1MC41OTM4IDExNiA1Ny4wMDk0IDExNiA2NC45MjMzVjExNS4wNzdDMTE2IDEyMi45OTEgMTA5LjU4NCAxMjkuNDA2IDEwMS42NyAxMjkuNDA2SDgwLjE3NjJDNzIuODY3NiAxMjkuNDA2IDY2LjgzNyAxMjMuOTM1IDY1Ljk1NzEgMTE2Ljg2NEM2NS44MzQ5IDExNS44ODMgNjYuNjQ4NiAxMTUuMDc3IDY3LjYzNzkgMTE1LjA3N0g3MS4yMjAzQzcyLjIwOTUgMTE1LjA3NyA3Mi45ODg1IDExNS44OTEgNzMuMjMyNSAxMTYuODVDNzQuMDIxNiAxMTkuOTQ5IDc2LjgzMTIgMTIyLjI0MSA4MC4xNzYyIDEyMi4yNDFIMTAxLjY3QzEwNS42MjcgMTIyLjI0MSAxMDguODM1IDExOS4wMzQgMTA4LjgzNSAxMTUuMDc3VjY0LjkyMzNDMTA4LjgzNSA2MC45NjYzIDEwNS42MjcgNTcuNzU4NiAxMDEuNjcgNTcuNzU4NlpcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTY5LjI2NDcgMTAxLjgwNUw3OC42MDA0IDkyLjQ2MjlINDkuODM3OUM0OC40Nzc3IDkyLjQ2MjkgNDcuMzc1IDkxLjM2MDIgNDcuMzc1IDkwQzQ3LjM3NSA4OC42Mzk4IDQ4LjQ3NzcgODcuNTM3MSA0OS44Mzc5IDg3LjUzNzFINzguNjAwNEw2OS4yNjQ3IDc4LjE5NTFDNjguMzAzMiA3Ny4yMzI5IDY4LjMwMzggNzUuNjczNSA2OS4yNjU5IDc0LjcxMkM3MC4yMjggNzMuNzUwNSA3MS43ODc1IDczLjc1MTEgNzIuNzQ5IDc0LjcxMzJMODYuMjg1NiA4OC4yNTkxQzg3LjI0NjYgODkuMjIwOCA4Ny4yNDY2IDkwLjc3OTMgODYuMjg1NiA5MS43NDA5TDcyLjc0OSAxMDUuMjg3QzcxLjc4NzUgMTA2LjI0OSA3MC4yMjggMTA2LjI0OSA2OS4yNjU5IDEwNS4yODhDNjguMzAzOCAxMDQuMzI3IDY4LjMwMzIgMTAyLjc2NyA2OS4yNjQ3IDEwMS44MDVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9nPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnNoYXJlUHJvdG90eXBlSWNvbiA9IHsgb25EYXJrOiBnZXRTaGFyZVByb3RvdHlwZShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRTaGFyZVByb3RvdHlwZShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5cbiIsImNsYXNzIGV4cG9ydHMuUGxheWVyU2xpZGVyIGV4dGVuZHMgU2xpZGVyQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0QHZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwic2xpZGVyVmlld1wiXG5cdFx0XHR3aWR0aDogMTg0ICogMiwgaGVpZ2h0OiA1NiAqIDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMjUpXCJcblx0XHRcdGJvcmRlclJhZGl1czogNTZcblx0XHRcblx0XHRAdmlldy5kcmFnZ2FibGUuZW5hYmxlZCA9IHRydWVcblx0XHRAdmlldy5kcmFnZ2FibGUuc3BlZWRYID0gMFxuXHRcdEB2aWV3LmRyYWdnYWJsZS5zcGVlZFkgPSAwXG5cdFx0QHZpZXcuZHJhZ2dhYmxlLnByb3BhZ2F0ZUV2ZW50cyA9IGZhbHNlXG5cdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAcGFyZW50ID0gQHZpZXdcblx0XHRAbmFtZSA9IFwidmlkZW9TbGlkZXJcIlxuXHRcdEBjZW50ZXIoKVxuXHRcdFxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0QGhlaWdodCA9IDQgKiAyXG5cdFx0QHdpZHRoID0gMTI4ICogMlxuXHRcdEB4ID0gQWxpZ24uY2VudGVyXG5cdFx0QGtub2JTaXplID0gMjQgKiAyXG5cdFx0XG5cdFx0QHNsaWRlck92ZXJsYXkuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpXCJcblx0XHRAc2xpZGVyT3ZlcmxheS53aWR0aCA9IDEyOCAqIDJcblx0XHRAc2xpZGVyT3ZlcmxheS5oZWlnaHQgPSA0ICogMlxuXHRcdEBzbGlkZXJPdmVybGF5LnggPSAwXG5cdFx0QHNsaWRlck92ZXJsYXkueSA9IDBcblx0XHRAc2xpZGVyT3ZlcmxheS5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XG5cdFx0QGZpbGwuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG5cdFx0QGZpbGwub3BhY2l0eSA9IDAuM1xuXHRcdFxuXHRcdEBrbm9iLmJhY2tncm91bmRDb2xvciA9IFwibnVsbFwiXG5cdFx0QGtub2Iub3BhY2l0eSA9IDFcblx0XHRAa25vYi5kcmFnZ2FibGUubW9tZW50dW0gPSBmYWxzZVxuXHRcdEBrbm9iLmRyYWdnYWJsZS5wcm9wYWdhdGVFdmVudHMgPSBmYWxzZVxuXHRcdEBrbm9iLnNoYWRvd0NvbG9yID0gbnVsbFxuXHRcdEBrbm9iLnNoYWRvd1kgPSAwXG5cdFx0XG5cdFx0a25vYkN1cnNvciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAa25vYlxuXHRcdFx0d2lkdGg6IDQgKiAyLCBoZWlnaHQ6IDMyICogMlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJERERcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0ICogMlxuXHRcdFxuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0bGF5ZXIudmFsdWUgPSBVdGlscy5tb2R1bGF0ZShldmVudC5wb2ludC54LCBbMCwgQHNsaWRlck92ZXJsYXkud2lkdGhdLCBbMCwgMV0sIHRydWUpXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRcblx0SG92ZXI6ID0+XG4jIFx0XHRAb3BhY2l0eSA9IDFcblx0SG92ZXJPZmY6ID0+XG4jIFx0XHRAb3BhY2l0eSA9IDAuNVxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG4jIFRleHQsIEJ1dHRvblxuXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIk51bml0b1wiLCA4MDApXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIlJhbGV3YXlcIiwgNzAwKVxuZm9udEF2ZXJpYSA9IFwiUmFsZXdheVwiXG5cbmNsYXNzIFRleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHR3ZWlnaHQ6IDcwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjRcbiMgXHRcdFx0dGV4dE92ZXJmbG93OiBcImVsbGlwc2lzXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0eWxlID1cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogXCJSYWxld2F5LCAnUFQgU2FucycsICdIZWx2ZXRpY2EnLCAnVGFob21hJywgc2Fucy1zZXJpZjtcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiOiA3MDBcblx0XHRcdFwiLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1vei1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1zLWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcblxuXG5cblxuXG5jbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDAuOCwgaG92ZXI6IDAuNSB9XG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdGhhbmRsZXI6IG51bGxcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ob3ZlclxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ub3JtYWxcblx0XG5cdHVwZGF0ZVR1cGxlOiAobmV3VHVwbGUpID0+XG5cdFx0QHR1cGxlID0gbmV3VHVwbGVcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdmVyXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3V0XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEBkZWZpbmUgJ3R1cGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnR1cGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy50dXBsZSA9IHZhbHVlXG5cblxuXG5cbiMgQnV0dG9uOiBTVkdcblxuY2xhc3MgU1ZHQnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0ZXh0OiBcIlwiXG5cdFx0XHRhc3NldDogbnVsbFxuXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdGF1dG9TaXplOiBmYWxzZVxuXHRcdFxuXHRcdEBzdmdTaGFwZSA9IG5ldyBTVkdMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIiwgbmFtZTogXCJzdmdTaGFwZVwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3ZnU2hhcGUucGFyZW50ID0gQFxuXHRcdEB1cGRhdGVTVkdTaXplKClcblx0XG5cdFxuXHRAZGVmaW5lICdhc3NldCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYXNzZXQgPSB2YWx1ZVxuXHRcdFx0QHN2Z1NoYXBlLnN0YXRlcyA9XG5cdFx0XHRcdFwib25EYXJrXCI6IHsgc3ZnOiB2YWx1ZS5vbkRhcmsgfVxuXHRcdFx0XHRcIm9uTGlnaHRcIjogeyBzdmc6IHZhbHVlLm9uTGlnaHQgfVxuXHRcdFx0QHN2Z1NoYXBlLnN0YXRlU3dpdGNoKFwib25EYXJrXCIpXG5cdFxuXHR1cGRhdGVTVkdTaXplOiAoKSA9PlxuXHRcdEBzdmdTaGFwZS53aWR0aCA9IEB3aWR0aFxuXHRcdEBzdmdTaGFwZS5oZWlnaHQgPSBAaGVpZ2h0XG5cdFxuXG5cblxuXG4jIEJ1dHRvbjogQ29weVxuXG5jbGFzcyBDb3B5QnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5ydVwiXG5cdFx0XHRoYW5kbGVyOiBAY29weUhhbmRsZXJcblx0XHRcblx0XHRAYXJlYSA9IG5ldyBMYXllclxuXHRcdFx0b3BhY2l0eTogMCwgeDogLTMwMDAsIGh0bWw6IG51bGxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBhcmVhLnBhcmVudCA9IEBcblx0XG5cdFxuXHRAZGVmaW5lICdsaW5rJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuXHRcdFx0QHVwZGF0ZSh2YWx1ZSlcblx0XG5cdFxuXHR1cGRhdGU6IChsaW5rKSA9PlxuXHRcdEBhcmVhLmh0bWwgPSBcIjx0ZXh0YXJlYSBjbGFzcz0nanMtY29weXRleHRhcmVhLWNsYXNzJyBzdHlsZT0nb3BhY2l0eTowOyc+I3tsaW5rfTwvdGV4dGFyZWE+XCJcblx0XG5cdFxuXHRjb3B5SGFuZGxlcjogPT5cblx0XHR0ZXh0RGl2ID0gQGFyZWEucXVlcnlTZWxlY3RvcignLmpzLWNvcHl0ZXh0YXJlYS1jbGFzcycpXG5cdFx0dGV4dERpdi5mb2N1cygpXG5cdFx0dGV4dERpdi5zZWxlY3QoKVxuXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kICdjb3B5J1xuXHRcdFxuXHRcdG9yaWdpblRpdGxlID0gQHRleHRcblx0XHRAdGV4dCA9IFwiRG9uZSDwn5GMXCJcblx0XHRVdGlscy5kZWxheSAxLCA9PiBAdGV4dCA9IG9yaWdpblRpdGxlXG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1RleHQsIFRleHRCdXR0b24sIFNWR0J1dHRvbiwgQ29weUJ1dHRvbn1cblxuXG5cblxuXG5cblxuIyAvKiB3SW5mb3JtYXRpb24gRGVsaXZlcnkgaW4gWWFuZGV4IEFwcCAqL1xuXG4jIHdpZHRoOiA3MTUuNjVweDtcbiMgaGVpZ2h0OiAzMnB4O1xuXG4jIGZvbnQtZmFtaWx5OiAnUmFsZXdheSc7XG4jIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiMgZm9udC13ZWlnaHQ6IDcwMDtcbiMgZm9udC1zaXplOiAxOHB4O1xuIyBsaW5lLWhlaWdodDogMzJweDtcbiMgLyogaWRlbnRpY2FsIHRvIGJveCBoZWlnaHQsIG9yIDE3OCUgKi9cbiMgZGlzcGxheTogZmxleDtcbiMgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiMgdGV4dC1hbGlnbjogY2VudGVyO1xuIyBsZXR0ZXItc3BhY2luZzogMC4wNGVtO1xuIyBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICdzczA5JyBvbjtcblxuIyBjb2xvcjogI0ZGRkZGRjtcblxuXG4jIC8qIEluc2lkZSBhdXRvIGxheW91dCAqL1xuIyBmbGV4OiBub25lO1xuIyBvcmRlcjogMTtcbiMgZmxleC1ncm93OiAwO1xuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFlQUE7QURDQSxJQUFBLHdEQUFBO0VBQUE7Ozs7QUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLE9BQVI7O0FBTU4sVUFBQSxHQUFhOztBQUVQOzs7RUFDUSxjQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxVQUFBLEVBQVksVUFBWjtNQUNBLFFBQUEsRUFBVSxFQURWO01BRUEsTUFBQSxFQUFRLEdBRlI7TUFHQSxLQUFBLEVBQU8sT0FIUDtNQUlBLE1BQUEsRUFBUSxFQUpSO01BS0EsYUFBQSxFQUFlLEdBTGY7TUFNQSxhQUFBLEVBQWUsR0FOZjtLQUREO0lBVUEsc0NBQU0sSUFBQyxDQUFBLE9BQVA7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
