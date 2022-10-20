require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PCButtons":[function(require,module,exports){
var CopyButton, LinkButton, SVG, SVGButton, Text, TextButton, fontAveria,
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
        normal: 0.5,
        hover: 0.8
      },
      handler: null
    });
    TextButton.__super__.constructor.call(this, this.options);
    this.style = {
      cursor: "pointer"
    };
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
    this.updateTuple(this.tuple);
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

LinkButton = (function(superClass) {
  extend(LinkButton, superClass);

  function LinkButton(options) {
    this.options = options != null ? options : {};
    this.setColor = bind(this.setColor, this);
    _.defaults(this.options, {
      link: "https://tilllur.ru",
      borderWidth: 1 * 2,
      borderRadius: 20 * 2,
      tuple: {
        normal: 1.0,
        hover: 0.8
      }
    });
    this.tintButtonFix = new Layer({
      height: 120 * 2,
      backgroundColor: null
    });
    this.buttonText = new Text({
      fontSize: 32 * 2,
      textAlign: "right",
      height: 60 * 2
    });
    this.buttonIcon = new SVGLayer({
      width: 24 * 2,
      height: 24 * 2,
      svg: SVG.openIcon.onLight,
      opacity: 0.6
    });
    LinkButton.__super__.constructor.call(this, this.options);
    this.buttonText.text = this.text;
    this.text = "";
    this.tintButtonFix.parent = this.parent;
    this.tintButtonFix.x = Align.right;
    this.tintButtonFix.y = Align.top;
    this.parent = this.tintButtonFix;
    this.y = Align.top(30 * 2);
    this.height = 60 * 2;
    this.buttonText.parent = this;
    this.buttonText.x = 16 * 2;
    this.buttonText.y = 9 * 2;
    this.buttonIcon.parent = this;
    this.buttonIcon.x = 16 * 2 + this.buttonText.width + 16 * 2;
    this.buttonIcon.y = Align.center(3 * 2);
    this.width = 16 * 2 + this.buttonText.width + this.buttonIcon.width + 16 * 2 + 16 * 2;
    this.tintButtonFix.width = this.width + 30 * 2 + 16 * 2;
    this.tintButtonFix.x = Align.right;
    this.x = Align.right(-30 * 2);
  }

  LinkButton.define('link', {
    get: function() {
      return this.options.link;
    },
    set: function(value) {
      return this.options.link = value;
    }
  });

  LinkButton.prototype.setColor = function(color) {
    if (color == null) {
      color = null;
    }
    if (color === null) {
      return;
    }
    return this.tintButtonFix.backgroundColor = color;
  };

  return LinkButton;

})(SVGButton);

module.exports = {
  Text: Text,
  TextButton: TextButton,
  SVGButton: SVGButton,
  CopyButton: CopyButton,
  LinkButton: LinkButton
};


},{"PCSVG":"PCSVG"}],"PCPlayerSlider":[function(require,module,exports){
var Buttons, SVG, SVGButton,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SVG = require("PCSVG");

Buttons = require("PCButtons");

SVGButton = Buttons.SVGButton;

exports.PlayerSlider = (function(superClass) {
  extend(PlayerSlider, superClass);

  function PlayerSlider(options) {
    var knobCursor;
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    this.view = new Layer({
      name: "sliderView",
      width: 260 * 2,
      height: 56 * 2,
      backgroundColor: "rgba(0,0,0,0.25)",
      borderRadius: 18 * 2
    });
    this.view.draggable.enabled = true;
    this.view.draggable.speedX = 0;
    this.view.draggable.speedY = 0;
    this.view.draggable.propagateEvents = false;
    this.playButton = new SVGButton({
      parent: this.view,
      name: "playButton",
      width: 40 * 2,
      height: 40 * 2,
      x: 12 * 2,
      y: Align.center,
      asset: SVG.playerPauseIcon,
      backgroundColor: null
    });
    this.playButton.states = {
      "playing": {
        asset: SVG.playerPauseIcon
      },
      "paused": {
        asset: SVG.playerPlayIcon
      }
    };
    this.playButton.stateSwitch("playing");
    this.soundButton = new SVGButton({
      parent: this.view,
      width: 40 * 2,
      height: 40 * 2,
      x: (12 + 40 + 8) * 2,
      y: Align.center,
      asset: SVG.playerSoundIcon,
      backgroundColor: null
    });
    this.soundButton.states = {
      "sound": {
        asset: SVG.playerSoundIcon
      },
      "muted": {
        asset: SVG.playerSoundOffIcon
      }
    };
    this.soundButton.stateSwitch("muted");
    PlayerSlider.__super__.constructor.call(this, this.options);
    this.parent = this.view;
    this.name = "videoSlider";
    this.backgroundColor = null;
    this.width = this.view.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2;
    this.height = 4 * 2;
    this.x = (12 + 40 + 8 + 40 + 16) * 2;
    this.y = Align.center;
    this.knobSize = 24 * 2;
    this.sliderOverlay.backgroundColor = "rgba(255,255,255,0.05)";
    this.sliderOverlay.width = this.width;
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
      backgroundColor: "#ddd",
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

  PlayerSlider.prototype.updateForScaleDown = function() {
    this.view.width = 800 * 2;
    this.view.x = Align.center;
    this.view.y = Align.bottom(-32 * 2);
    this.width = this.view.width - ((12 + 40 + 8 + 40 + 16) + 20) * 2;
    this.height = 4 * 2;
    this.sliderOverlay.width = this.width;
    this.sliderOverlay.height = 4 * 2;
    this.sliderOverlay.x = 0;
    return this.sliderOverlay.y = 0;
  };

  return PlayerSlider;

})(SliderComponent);


},{"PCButtons":"PCButtons","PCSVG":"PCSVG"}],"PCSVG":[function(require,module,exports){
var color_onDark, color_onLight, getFullscreen, getLogo, getNext, getOpenIcon, getPause, getPlay, getPlayerPause, getPlayerPlay, getPlayerSound, getPlayerSoundOff, getPrev, getSharePrototype, getVideoSlider;

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

getPlayerPlay = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M28.3494 18.5663C25.8324 17.0175 22.5918 18.8283 22.5918 21.7837L22.5918 58.6324C22.5918 61.5878 25.8325 63.3987 28.3495 61.8497L60.8075 43.4245C63.2046 41.9494 63.2045 38.465 60.8074 36.9899L28.3494 18.5663Z\" fill=\"white\"/>\n</svg>";
};

exports.playerPlayIcon = {
  onDark: getPlayerPlay(color_onDark),
  onLight: getPlayerPlay(color_onLight)
};

getPlayerPause = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M26.3158 16.7368C23.2928 16.7368 20.8422 19.1875 20.8422 22.2105V57.7894C20.8422 60.8125 23.2928 63.2631 26.3158 63.2631H30.4211C33.4441 63.2631 35.8948 60.8125 35.8948 57.7895V22.2105C35.8948 19.1875 33.4441 16.7368 30.4211 16.7368H26.3158ZM49.5793 16.7368C46.5562 16.7368 44.1056 19.1875 44.1056 22.2105V57.7894C44.1056 60.8125 46.5562 63.2631 49.5793 63.2631H53.6845C56.7076 63.2631 59.1582 60.8125 59.1582 57.7895V22.2105C59.1582 19.1875 56.7076 16.7368 53.6845 16.7368H49.5793Z\" fill=\"white\"/>\n</svg>";
};

exports.playerPauseIcon = {
  onDark: getPlayerPause(color_onDark),
  onLight: getPlayerPause(color_onLight)
};

getPlayerSound = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M40 15H37.5L27.5 27.5H20C18.4573 27.5 17.686 27.5 16.893 27.7738C15.9599 28.096 14.8601 28.9583 14.3246 29.7875C13.8695 30.4922 13.7259 31.0765 13.4388 32.2449C12.8167 34.7769 12.5 37.3805 12.5 40C12.5 42.6195 12.8167 45.2231 13.4388 47.7551C13.7259 48.9235 13.8695 49.5078 14.3246 50.2125C14.8601 51.0417 15.9599 51.904 16.893 52.2262C17.686 52.5 18.4573 52.5 20 52.5H27.5L37.5 65H40C43.05 65 46.25 55 46.25 39.9573C46.25 24.9147 43.1833 15 40 15Z\" fill=\"white\"/>\n<path d=\"M52.5 39.9763C52.495 37.3423 51.658 34.7772 50.1086 32.647L54.1521 29.7059C56.3213 32.688 57.493 36.2792 57.5 39.9668C57.507 43.6544 56.3489 47.25 54.191 50.2404L50.1364 47.3146C51.6778 45.1786 52.505 42.6103 52.5 39.9763Z\" fill=\"white\"/>\n<path d=\"M58.1955 26.7647C60.9845 30.5989 62.491 35.2161 62.5 39.9573C62.509 44.6986 61.02 49.3215 58.2456 53.1662L62.3001 56.0921C65.6911 51.3929 67.5109 45.7427 67.5 39.9479C67.489 34.153 65.6477 28.5097 62.2389 23.8235L58.1955 26.7647Z\" fill=\"white\"/>\n</svg>";
};

exports.playerSoundIcon = {
  onDark: getPlayerSound(color_onDark),
  onLight: getPlayerSound(color_onLight)
};

getPlayerSoundOff = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M45 15H47.5C50.6833 15 53.6 24.7222 53.6 40C53.6 41.7406 53.5604 43.409 53.4858 44.9992L38.326 23.3424L45 15Z\" fill=\"white\"/>\n<path d=\"M31.2363 27.5H27.5C25.9573 27.5 25.186 27.5 24.393 27.7738C23.4599 28.096 22.3601 28.9583 21.8246 29.7875C21.3695 30.4922 21.2259 31.0765 20.9388 32.2449C20.3167 34.7769 20 37.3805 20 40C20 42.6195 20.3167 45.2231 20.9388 47.7551C21.2259 48.9236 21.3695 49.5078 21.8246 50.2125C22.3601 51.0417 23.4599 51.904 24.393 52.2262C25.186 52.5 25.9573 52.5 27.5 52.5H35L45 65H47.5C49.1507 65 50.8014 62.1523 51.9685 57.1175L57.5 65.0195H63.75L28.75 15.0195H22.5L31.2363 27.5Z\" fill=\"white\"/>\n</svg>";
};

exports.playerSoundOffIcon = {
  onDark: getPlayerSoundOff(color_onDark),
  onLight: getPlayerSoundOff(color_onLight)
};

getOpenIcon = function(withColor) {
  var selectedColor;
  selectedColor = withColor;
  return "<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M14.0821 9.84328C14.0821 10.8895 14.8452 11.67 15.9069 11.67H17.0847L36.2273 11.3212L32.1961 15.1572L13.4185 33.9066C13.0536 34.2553 12.8877 34.7037 12.8877 35.1853C12.8877 36.3145 13.6508 37.1282 14.7788 37.1282C15.2931 37.1282 15.741 36.9289 16.1059 36.5802L34.867 17.8142L38.6824 13.7623L38.334 32.9434V34.2387C38.334 35.2849 39.0971 36.082 40.1588 36.082C41.2205 36.082 42.0002 35.3015 42.0002 34.2387V11.0223C42.0002 9.11261 40.8887 8 38.981 8L15.9069 8C14.8618 8 14.0821 8.78049 14.0821 9.84328Z\" fill=\"white\"/>\n</svg>";
};

exports.openIcon = {
  onDark: getOpenIcon(color_onDark),
  onLight: getOpenIcon(color_onLight)
};

"<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M38 15L15 38.4241L11.5762 35L35 12H14V8H42V36H38V15Z\" fill=\"white\"/>\n</svg>";


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
      this.titleText.width = anchor.width;
      this.titleText.textAlign = "left";
      this.titleText.x = Align.left(this.logoButton.x);
      this.titleText.y = Align.top(this.topView.height + 10);
      this.copyButton.x = Align.left(this.logoButton.x);
      this.copyButton.y = Align.top(this.topView.height + 36);
    } else {
      this.titleText.width = anchor.width / 2;
      this.titleText.textAlign = "center";
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
var HDVideoSlide, PrototypeSlide, SimpleVideoSlide, Slide, SlideTemplate, Slider1, VideoSlide,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Slider1 = require("PCSlider1").Slider1;

SlideTemplate = require("PCSlide");

Slide = SlideTemplate.Slide;

SimpleVideoSlide = SlideTemplate.SimpleVideoSlide;

VideoSlide = SlideTemplate.VideoSlide;

HDVideoSlide = SlideTemplate.HDVideoSlide;

PrototypeSlide = SlideTemplate.PrototypeSlide;

exports.Slider2 = (function(superClass) {
  extend(Slider2, superClass);

  function Slider2(options) {
    this.options = options != null ? options : {};
    this.prototypeSlide = bind(this.prototypeSlide, this);
    this.fullVideoSlide = bind(this.fullVideoSlide, this);
    this.videoSlide = bind(this.videoSlide, this);
    this.bgVideoSlide = bind(this.bgVideoSlide, this);
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

  Slider2.prototype.slide = function(sourceURL) {
    var slide;
    if (sourceURL == null) {
      sourceURL = null;
    }
    slide = new Slide({
      parent: this.content
    });
    if (sourceURL !== null) {
      slide.source(sourceURL);
    }
    return slide;
  };

  Slider2.prototype.bgVideoSlide = function(sourceURL) {
    var slide;
    if (sourceURL == null) {
      sourceURL = null;
    }
    slide = new SimpleVideoSlide({
      parent: this.content
    });
    if (sourceURL !== null) {
      slide.source(sourceURL);
    }
    this.videoSlides.push(slide);
    return slide;
  };

  Slider2.prototype.videoSlide = function(sourceURL) {
    var slide;
    if (sourceURL == null) {
      sourceURL = null;
    }
    slide = new HDVideoSlide({
      parent: this.content
    });
    if (sourceURL !== null) {
      slide.source(sourceURL);
    }
    this.videoSlides.push(slide);
    return slide;
  };

  Slider2.prototype.fullVideoSlide = function(sourceURL) {
    var slide;
    if (sourceURL == null) {
      sourceURL = null;
    }
    slide = new VideoSlide({
      parent: this.content
    });
    if (sourceURL !== null) {
      slide.source(sourceURL);
    }
    this.videoSlides.push(slide);
    return slide;
  };

  Slider2.prototype.prototypeSlide = function(sourceURL) {
    var slide;
    if (sourceURL == null) {
      sourceURL = null;
    }
    slide = new PrototypeSlide({
      parent: this.content
    });
    if (sourceURL !== null) {
      slide.source(sourceURL);
    }
    return slide;
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
var Buttons, HDVideoSlide, LinkButton, PlayerSlider, PrototypeSlide, SVG, SVGButton, SimpleVideoSlide, Slide, SlideTemplate, Text, VideoSlide,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SVG = require("PCSVG");

Buttons = require("PCButtons");

Text = Buttons.Text;

SVGButton = Buttons.SVGButton;

LinkButton = Buttons.LinkButton;

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

  Slide.prototype.link = function(url, buttonTitle, type) {
    if (url == null) {
      url = "https://tilllur.ru";
    }
    if (buttonTitle == null) {
      buttonTitle = "Open";
    }
    if (type == null) {
      type = 0;
    }
    this.shareLink = url;
    this.tintButton = new LinkButton({
      parent: this,
      name: "linkButton",
      text: buttonTitle,
      url: url,
      handler: this.openPrototypeURL
    });
    if (type === 0) {
      this.tintButton.backgroundColor = null;
      return this.tintButton.borderColor = "rgba(255,255,255,0.3)";
    } else if (type === 1) {
      this.tintButton.backgroundColor = "rgba(0,0,0,0.25)";
      return this.tintButton.borderColor = null;
    }
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
    this.unmute = bind(this.unmute, this);
    this.mute = bind(this.mute, this);
    this.loop = bind(this.loop, this);
    this.source = bind(this.source, this);
    _.defaults(this.options, {
      title: "simpleVideoSlide"
    });
    this.loadingText = new Text({
      width: 400,
      height: 70,
      fontSize: 40,
      opacity: 0.5,
      textAlign: "center",
      text: "No URL"
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

  SimpleVideoSlide.prototype.source = function(video) {
    this.videoView.video = video;
    this.loadingText.text = "Loading";
    return this;
  };

  SimpleVideoSlide.prototype.loop = function(value) {
    if (value == null) {
      value = true;
    }
    this.videoView.player.loop = true;
    return this;
  };

  SimpleVideoSlide.prototype.mute = function(value) {
    if (value == null) {
      value = true;
    }
    this.videoView.player.muted = value;
    return this;
  };

  SimpleVideoSlide.prototype.unmute = function() {
    this.videoView.player.muted = false;
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
    this.playerSlider = new PlayerSlider;
    this.playerSlider.parent.parent = this;
    this.playerSlider.parent.x = Align.left(98 * 2);
    this.playerSlider.parent.y = Align.bottom(-60 * 2);
    this.playerSlider.playButton.on(Events.Tap, function(event, layer) {
      var presentation, slide;
      slide = this.parent.parent;
      presentation = slide.parent.parent;
      slide.togglePlay();
      return presentation.activeDrag = false;
    });
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
    this.playerSlider.soundButton.on(Events.Tap, function() {
      var presentation, slide;
      slide = this.parent.parent;
      presentation = slide.parent.parent;
      if (slide.videoView.player.muted) {
        return slide.unmute();
      } else {
        return slide.mute();
      }
    });
    Events.wrap(this.videoView.player).on("pause", (function(_this) {
      return function() {
        var presentation;
        _this.pause();
        _this.playerSlider.playButton.stateSwitch("paused");
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
        _this.playerSlider.playButton.stateSwitch("playing");
        presentation = _this.parent.parent;
        presentation.activeDrag = false;
        if (_this.videoView.player === presentation.activeVideoPlayer) {
          return presentation.activePlaying = true;
        }
      };
    })(this));
    Events.wrap(this.videoView.player).on("volumechange", (function(_this) {
      return function() {
        if (_this.videoView.player.muted) {
          return _this.playerSlider.soundButton.stateSwitch("muted");
        } else {
          return _this.playerSlider.soundButton.stateSwitch("sound");
        }
      };
    })(this));
  }

  return VideoSlide;

})(SimpleVideoSlide);

HDVideoSlide = (function(superClass) {
  extend(HDVideoSlide, superClass);

  function HDVideoSlide(options) {
    this.options = options != null ? options : {};
    HDVideoSlide.__super__.constructor.call(this, this.options);
    this.videoView.width = 1920;
    this.videoView.height = 1080;
    this.videoView.x = 440;
    this.videoView.y = 286;
    this.videoView.borderRadius = 8 * 2;
    this.videoView.clip = true;
    this.videoView.originX = 0.5;
    this.videoView.originY = 0.5;
    this.videoView.scale = 1.3666;
    this.playerSlider.updateForScaleDown();
  }

  return HDVideoSlide;

})(VideoSlide);

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
    if (width === 375 && height === 812) {
      this.scaled(2.0);
    } else if (width === 390 && height === 844) {
      this.scaled(1.923);
    } else {
      this.scaled(2.0);
    }
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
  HDVideoSlide: HDVideoSlide,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QcmVzZW50YXRpb25Db21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZS5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlclBpbmNoLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyNS5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIzLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMi5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjEuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIwLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVDaGFuZ2VyLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU1ZHLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDUGxheWVyU2xpZGVyLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDQnV0dG9ucy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgUHJldmlldyBDb21wb25lbnRcbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3Q29tcG9uZW50QXNzZXRzXCJcbkZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cbmxvY2FsQ29sb3JzID1cblx0YmdfY29sb3Jfb25MaWdodDogXCIjZWVlXCJcblx0YmdfY29sb3Jfb25EYXJrOiBcIiMyMjJcIlxuXHRjb250ZW50X2NvbG9yX29uTGlnaHQ6IFwiIzAwMFwiXG5cdGNvbnRlbnRfY29sb3Jfb25EYXJrOiBcIiNGRkZcIlxuXG50aGVtZSA9XG5cdGJnX2NvbG9yOiBsb2NhbENvbG9ycy5iZ19jb2xvcl9vbkRhcmtcblx0Y29udGVudF9jb2xvcjogbG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmtcblxuXG4jIExvZ29cblxuY2xhc3MgTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28obG9jYWxDb2xvcnMuY29udGVudF9jb2xvcl9vbkRhcmspXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuIyBQcmV2aWV3XG5cbiMgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWV3OiBudWxsXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IFwiMjA6MjJcIlxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0XG5cdFx0XHR2aXNpYmxlOiB0cnVlXG5cdFx0XHR0b3BUaGVtZTogXCJkYXJrXCJcblx0XHRcdGJvdHRvbVRoZW1lOiBcImRhcmtcIlxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3RvcFRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRvcFRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRvcFRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2JvdHRvbVRoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJvdHRvbVRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcbiMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93QmFyID0gdmFsdWVcblx0XG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblx0XG5cblx0XG5cdFxuXHRcblx0XG5cdGdldExvY2F0aW9uRGF0YTogKCkgPT5cblx0XHRxdWVyeUFycmF5ID0gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gcXVlcnlBcnJheVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdFx0XHRlbHNlIGlmIHZhbHVlUGFydCA9PSBcIm5vcm1hbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcdFx0XG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cdHNldERlc2t0b3BTY2FsZU1vZGU6IChmb3JTdGF0ZSA9IFwibm9ybWFsXCIpID0+XG5cdFx0QHVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdGluaXRTdGF0ZSA9IGZvclN0YXRlXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXHRcdFx0XG5cdFx0XHRpZiBrZXlQYXJ0ID09IFwic2NhbGVcIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJmaWxsXCIgdGhlbiBpbml0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0XHRlbHNlIGluaXRTdGF0ZSA9IFwibm9ybWFsXCJcblx0XHRcblx0XHRzaG91bGRTaG93QnV0dG9uID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImJ1dHRvblwiXG5cdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBcIm9mZlwiIHRoZW4gc2hvdWxkU2hvd0J1dHRvbiA9IGZhbHNlXG5cdFx0XHRcdGVsc2UgaWYgdmFsdWVQYXJ0ID09IFwiZmFsc2VcIiB0aGVuIHNob3VsZFNob3dCdXR0b24gPSBmYWxzZVxuXHRcdFxuXHRcdHNob3VsZFNob3dMb2dvID0gdHJ1ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcImxvZ29cIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJvZmZcIiB0aGVuIHNob3VsZFNob3dMb2dvID0gZmFsc2Vcblx0XHRcdFx0ZWxzZSBpZiB2YWx1ZVBhcnQgPT0gXCJmYWxzZVwiIHRoZW4gc2hvdWxkU2hvd0xvZ28gPSBmYWxzZVxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oaW5pdFN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oaW5pdFN0YXRlKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdGlmIFV0aWxzLmlzRnJhbWVyU3R1ZGlvKCkgdGhlbiByZXR1cm5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcblx0XG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXHRcblx0XG5cblx0XG5cdFxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gdGhlbWUuYmdfY29sb3Jcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb250ZW50X2NvbG9yLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZSBAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcCgtMjApXG5cdFx0QG9yaWdpblkgPSAwXG5cdFx0XG5cdFx0c0ggPSAoU2NyZWVuLmhlaWdodCArIDQwKSAvIEBoZWlnaHRcblx0XHRAc2NhbGUgPSBNYXRoLm1pbihTY3JlZW4ud2lkdGggLyBAd2lkdGgsIHNIKVxuXHRcblx0XG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKHRlbXApID0+XG5cdFx0dGVtcC5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhciBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdGVtcCwgd2lkdGg6IHRlbXAud2lkdGggLSAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi50b3AoNilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi5jZW50ZXIoMSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGJvdHRvbVRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0XG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIlxuIyB7U2xpZGVyMH0gPSByZXF1aXJlIFwiUENTbGlkZXIwXCIgXHQjIFNjYWxlIC8gVVJMXG4jIHtTbGlkZXIxfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjFcIlx0IyBQYW5lbHNcbiMge1NsaWRlcjJ9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMlwiXHQjIENyZWF0ZSBTbGlkZVxuIyB7U2xpZGVyM30gPSByZXF1aXJlIFwiUENTbGlkZXIzXCJcdCMgU2hvcnRjdXRzXG4jIHtTbGlkZXI0fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjRcIlx0IyBCYWNrZ3JvdW5kIFBhdXNlIGZvciBWaWRlb3NcbiMge1NsaWRlcjV9ID0gcmVxdWlyZSBcIlBDU2xpZGVyNVwiXHQjIFBsYXlpbmcgVmlkZW9cbntTbGlkZXJQaW5jaH0gPSByZXF1aXJlIFwiUENTbGlkZXJQaW5jaFwiXHQjIFBpbmNoXG5cbmNsYXNzIEZpeFByZXNlbnRhdGlvbkV4cG9ydCBleHRlbmRzIFNsaWRlclBpbmNoXG4jIGNsYXNzIEZpeFByZXNlbnRhdGlvbkV4cG9ydCBleHRlbmRzIFNsaWRlcjBcbmNsYXNzIGV4cG9ydHMuUHJlc2VudGF0aW9uIGV4dGVuZHMgRml4UHJlc2VudGF0aW9uRXhwb3J0XG5cblxuIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuVGV4dCA9IEJ1dHRvbnMuVGV4dFxuU1ZHQnV0dG9uID0gQnV0dG9ucy5TVkdCdXR0b25cbkxpbmtCdXR0b24gPSBCdXR0b25zLkxpbmtCdXR0b25cblxue1BsYXllclNsaWRlcn0gPSByZXF1aXJlKFwiUENQbGF5ZXJTbGlkZXJcIilcblxuXG5cbiMgU2xpZGUgd2l0aCBJbWFnZXNcblxuY2xhc3MgU2xpZGVUZW1wbGF0ZSBleHRlbmRzIExheWVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRncmlkRGF0YTogbnVsbFxuXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMlwiXG5cdFx0XHR3aWR0aDogMTQwMCAqIDJcblx0XHRcdGhlaWdodDogOTAwICogMlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNiAqIDJcblx0XHRcdHRpdGxlOiBcIlwiXG5cdFx0XHRpbWFnZTogbnVsbFxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHggPSAoQHBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIChAd2lkdGggKyAxMjApIFxuXHRcdEBwYXJlbnQucGFyZW50LnVwZGF0ZUNvbnRlbnQoKVxuXHRcdEBuYW1lID0gXCJzbGlkZSAje0BwYXJlbnQuY2hpbGRyZW4ubGVuZ3RofVwiXG5cdFxuXHRcblx0XG5cdEBkZWZpbmUgJ3RpdGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dyaWREYXRhJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmdyaWREYXRhXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmdyaWREYXRhID0gdmFsdWVcblxuXG5cblx0c291cmNlOiAoaW1hZ2UpID0+XG5cdFx0QGltYWdlID0gaW1hZ2Vcblx0XHRyZXR1cm4gQFxuXHRcblx0b3ZlcmxheTogKGltYWdlKSA9PlxuXHRcdHRvcEltYWdlID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxNDAwICogMiwgaGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRpbWFnZTogaW1hZ2Vcblx0XHRyZXR1cm4gQFxuXHRcblx0cmFuZG9tQ29sb3I6ICgpID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRyZXR1cm4gQFxuXG5cblxuXG5cbiMgUzogU2xpZGUgd2l0aCBMaW5rXG5cbiMgZmZtcGVnIC1pIGlucHV0Lm1wNCAtYzp2IGxpYngyNjQgLXByb2ZpbGU6diBtYWluIC12ZiBmb3JtYXQ9eXV2NDIwcCAtYzphIGFhYyAtbW92ZmxhZ3MgK2Zhc3RzdGFydCBvdXRwdXQubXA0XG4jIGZmbXBlZyAtaSBvdXRwdXQubXA0IC1maWx0ZXI6diBcImNyb3A9MTY4MDoxMDgwOjEyMDowXCIgLWM6YSBjb3B5IGNyb3AubXA0XG5cblxuY2xhc3MgU2xpZGUgZXh0ZW5kcyBTbGlkZVRlbXBsYXRlXG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRzaGFyZUxpbms6IFwiXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblx0XG5cdEBkZWZpbmUgJ3NoYXJlTGluaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaGFyZUxpbmtcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hhcmVMaW5rID0gdmFsdWVcblx0XG5cdFxuXHRsaW5rOiAodXJsID0gXCJodHRwczovL3RpbGxsdXIucnVcIiwgYnV0dG9uVGl0bGUgPSBcIk9wZW5cIiwgdHlwZSA9IDApID0+XG5cdFx0QHNoYXJlTGluayA9IHVybFxuXG5cdFx0QHRpbnRCdXR0b24gPSBuZXcgTGlua0J1dHRvblxuXHRcdFx0cGFyZW50OiBALCBuYW1lOiBcImxpbmtCdXR0b25cIlxuXHRcdFx0dGV4dDogYnV0dG9uVGl0bGVcblx0XHRcdHVybDogdXJsXG5cdFx0XHRoYW5kbGVyOiBAb3BlblByb3RvdHlwZVVSTFxuXHRcdFxuXHRcdGlmIHR5cGUgPT0gMFxuXHRcdFx0QHRpbnRCdXR0b24uYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdFx0QHRpbnRCdXR0b24uYm9yZGVyQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4zKVwiXG5cdFx0ZWxzZSBpZiB0eXBlID09IDFcblx0XHRcdEB0aW50QnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjI1KVwiXG5cdFx0XHRAdGludEJ1dHRvbi5ib3JkZXJDb2xvciA9IG51bGxcblx0XG5cdG9wZW5Qcm90b3R5cGVVUkw6ICgpID0+XG5cdFx0cHJlc2VudGF0aW9uID0gQHBhcmVudC5wYXJlbnRcblx0XHRwcmVzZW50YXRpb24ub3BlblVSTChAc2hhcmVMaW5rLCB0cnVlKVxuXG5cblxuXG5cblxuXG5cblxuXG4jIFM6IFRlbXBsYXRlIChWaWRlbylcbiMgT3ZlcnJpZGUgXCJzb3VyY2UoKVwiXG5cbmNsYXNzIFNpbXBsZVZpZGVvU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0aXRsZTogXCJzaW1wbGVWaWRlb1NsaWRlXCJcblx0XHRcblx0XHRAbG9hZGluZ1RleHQgPSBuZXcgVGV4dFxuXHRcdFx0d2lkdGg6IDQwMCwgaGVpZ2h0OiA3MFxuXHRcdFx0Zm9udFNpemU6IDQwXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcblx0XHRcdHRleHQ6IFwiTm8gVVJMXCJcblx0XHRcdFxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcgPSBuZXcgVmlkZW9MYXllclxuXHRcdFx0d2lkdGg6IDE2ODAsIGhlaWdodDogMTA4MFxuXHRcdFx0bmFtZTogXCJ2aWRlb1ZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLm11dGVkID0gdHJ1ZVxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLmF1dG9wbGF5ID0gZmFsc2Vcblx0XHRAdmlkZW9WaWV3LnBsYXllci5sb29wID0gdHJ1ZVxuXHRcdFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRcblx0XHRAbG9hZGluZ1RleHQucGFyZW50ID0gQFxuXHRcdEBsb2FkaW5nVGV4dC5jZW50ZXIoKVxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcucGFyZW50ID0gQFxuXHRcdEB2aWRlb1ZpZXcuc2NhbGUgPSBAaGVpZ2h0IC8gMTA4MFxuXHRcdEB2aWRlb1ZpZXcuY2VudGVyKClcblxuXHRcblx0XG5cdCMgQGRlZmluZSAndmlkZW9VUkwnLFxuXHQjIFx0Z2V0OiAtPiBAb3B0aW9ucy52aWRlb1VSTFxuXHQjIFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpZGVvVVJMID0gdmFsdWVcblx0XG5cblx0IyBvdmVycmlkZVxuXHRzb3VyY2U6ICh2aWRlbykgPT5cblx0XHRAdmlkZW9WaWV3LnZpZGVvID0gdmlkZW9cblx0XHRAbG9hZGluZ1RleHQudGV4dCA9IFwiTG9hZGluZ1wiXG5cdFx0cmV0dXJuIEBcblxuXG5cblxuXHRsb29wOiAodmFsdWUgPSB0cnVlKSA9PlxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLmxvb3AgPSB0cnVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdG11dGU6ICh2YWx1ZSA9IHRydWUpID0+XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSB2YWx1ZVxuXHRcdHJldHVybiBAXG5cdFxuXHR1bm11dGU6ICgpID0+XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSBmYWxzZVxuXHRcdHJldHVybiBAXG5cblxuXG5cblx0aXNQYXVzZWQ6ICgpID0+XG5cdFx0cmV0dXJuIEB2aWRlb1ZpZXcucGxheWVyLnBhdXNlZFxuXG5cdHBsYXk6ICgpID0+XG5cdFx0aWYgIUBpc1BhdXNlZCgpIHRoZW4gcmV0dXJuXG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIucGxheSgpXG5cdFxuXHRwYXVzZTogKCkgPT5cblx0XHRpZiBAaXNQYXVzZWQoKSB0aGVuIHJldHVyblxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLnBhdXNlKClcblx0XG5cdHRvZ2dsZVBsYXk6ICgpID0+XG5cdFx0aWYgQGlzUGF1c2VkKCkgdGhlbiBAcGxheSgpXG5cdFx0ZWxzZSBAcGF1c2UoKVxuXHRcblxuXG4jIFx0bG9hZFZpZGVvOiAod2ViVVJMKSA9PlxuIyBcdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSB0cnVlXG4jIFx0XHRAdmlkZW9WaWV3LnBsYXllci5hdXRvcGxheSA9IHRydWVcbiMgXHRcdEB2aWRlb1ZpZXcudmlkZW8gPSBAdmlkZW9VUkxcbiMgXHRcdFV0aWxzLmRlbGF5IDEwLCA9PlxuIyBcdFx0QHZpZGVvVmlldy5wbGF5ZXIucGxheSgpXG5cdFx0XG5cdFx0XG4jIFx0XHRwcmludCBAdmlkZW9WaWV3LnBsYXllci5yZWFkeVN0YXRlXG4jIFx0XHRVdGlscy5kZWxheSAxMCwgPT5cbiMgXHRcdFx0cHJpbnQgQHZpZGVvVmlldy5wbGF5ZXIucmVhZHlTdGF0ZVxuXG5cblxuXG5cbiMgUzogU2xpZGUgKFZpZGVvKVxuXG5jbGFzcyBWaWRlb1NsaWRlIGV4dGVuZHMgU2ltcGxlVmlkZW9TbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHQjIFByb2dyZXNzXG5cdFx0QHBsYXllclNsaWRlciA9IG5ldyBQbGF5ZXJTbGlkZXJcblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC5wYXJlbnQgPSBAXG5cblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC54ID0gQWxpZ24ubGVmdCg5OCoyKVxuXHRcdEBwbGF5ZXJTbGlkZXIucGFyZW50LnkgPSBBbGlnbi5ib3R0b20oLTYwICogMilcblxuXHRcdCMgcHJpbnQgQHBsYXllclNsaWRlci5wYXJlbnRcblx0XHQjIHByaW50IEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvblxuXG5cblx0XHRAcGxheWVyU2xpZGVyLnBsYXlCdXR0b24ub24gRXZlbnRzLlRhcCwgKGV2ZW50LCBsYXllcikgLT5cdFx0XHRcblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0c2xpZGUudG9nZ2xlUGxheSgpXG5cdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlRHJhZyA9IGZhbHNlXG5cblxuXG5cblx0XHRAcGxheWVyU2xpZGVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuXHRcdFx0IyBwcmludCBcIlRvdWNoIFN0YXJ0XCJcblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0c2xpZGUucGF1c2UoKVxuXHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZURyYWcgPSB0cnVlXG5cdFx0XG5cdFx0XG5cblx0XHRAcGxheWVyU2xpZGVyLm9uIFwiY2hhbmdlOnZhbHVlXCIsIC0+XG5cdFx0XHRzbGlkZSA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdGlmIHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnXG5cdFx0XHRcdHNsaWRlLnZpZGVvVmlldy5wbGF5ZXIuY3VycmVudFRpbWUgPSBVdGlscy5tb2R1bGF0ZShAdmFsdWUsIFswLCAxXSwgWzAsIHNsaWRlLnZpZGVvVmlldy5wbGF5ZXIuZHVyYXRpb25dLCB0cnVlKVxuXHRcdFxuXHRcdFxuXG5cdFx0QHBsYXllclNsaWRlci5zb3VuZEJ1dHRvbi5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdFx0c2xpZGUgPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uID0gc2xpZGUucGFyZW50LnBhcmVudFxuXHRcdFx0XG5cdFx0XHRpZiBzbGlkZS52aWRlb1ZpZXcucGxheWVyLm11dGVkIHRoZW4gc2xpZGUudW5tdXRlKClcblx0XHRcdGVsc2Ugc2xpZGUubXV0ZSgpXG5cdFx0XG5cblx0XHRcblxuXHRcdFxuXHRcdEV2ZW50cy53cmFwKEB2aWRlb1ZpZXcucGxheWVyKS5vbiBcInBhdXNlXCIsID0+XG5cdFx0XHQjIHByaW50IFwiISBuZXh0IHBhdXNlXCJcblx0XHRcdEBwYXVzZSgpXG5cdFx0XHRAcGxheWVyU2xpZGVyLnBsYXlCdXR0b24uc3RhdGVTd2l0Y2goXCJwYXVzZWRcIilcblx0XHRcdFxuXHRcdFx0cHJlc2VudGF0aW9uID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdGlmIEB2aWRlb1ZpZXcucGxheWVyID09IHByZXNlbnRhdGlvbi5hY3RpdmVWaWRlb1BsYXllclxuXHRcdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlUGxheWluZyA9IGZhbHNlXG5cdFx0XG5cdFx0XG5cdFx0RXZlbnRzLndyYXAoQHZpZGVvVmlldy5wbGF5ZXIpLm9uIFwicGxheVwiLCA9PlxuXHRcdFx0IyBwcmludCBcIiEgbmV4dCBwbGF5XCJcblx0XHRcdEBwbGF5KClcblx0XHRcdEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvbi5zdGF0ZVN3aXRjaChcInBsYXlpbmdcIilcblx0XHRcdFxuXHRcdFx0cHJlc2VudGF0aW9uID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnID0gZmFsc2Vcblx0XHRcdGlmIEB2aWRlb1ZpZXcucGxheWVyID09IHByZXNlbnRhdGlvbi5hY3RpdmVWaWRlb1BsYXllclxuXHRcdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlUGxheWluZyA9IHRydWVcblx0XHRcblx0XHRcblx0XHRFdmVudHMud3JhcChAdmlkZW9WaWV3LnBsYXllcikub24gXCJ2b2x1bWVjaGFuZ2VcIiwgPT5cblx0XHRcdGlmIEB2aWRlb1ZpZXcucGxheWVyLm11dGVkXG5cdFx0XHRcdEBwbGF5ZXJTbGlkZXIuc291bmRCdXR0b24uc3RhdGVTd2l0Y2goXCJtdXRlZFwiKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAcGxheWVyU2xpZGVyLnNvdW5kQnV0dG9uLnN0YXRlU3dpdGNoKFwic291bmRcIilcblxuXHRcdFx0XHRcblx0XHRcbmNsYXNzIEhEVmlkZW9TbGlkZSBleHRlbmRzIFZpZGVvU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEB2aWRlb1ZpZXcud2lkdGggPSAxOTIwXG5cdFx0QHZpZGVvVmlldy5oZWlnaHQgPSAxMDgwXG5cdFx0QHZpZGVvVmlldy54ID0gNDQwXG5cdFx0QHZpZGVvVmlldy55ID0gMjg2XG5cblx0XHRAdmlkZW9WaWV3LmJvcmRlclJhZGl1cyA9IDggKiAyXG5cdFx0QHZpZGVvVmlldy5jbGlwID0gdHJ1ZVxuXG5cblx0XHRAdmlkZW9WaWV3Lm9yaWdpblggPSAwLjVcblx0XHRAdmlkZW9WaWV3Lm9yaWdpblkgPSAwLjVcblxuXHRcdEB2aWRlb1ZpZXcuc2NhbGUgPSAxLjM2NjZcblxuXG5cdFx0QHBsYXllclNsaWRlci51cGRhdGVGb3JTY2FsZURvd24oKVxuXG5cblx0XHRcdFxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyBTOiBTbGlkZSAoUHJvdG90eXBlKVxuXG5jbGFzcyBQcm90b3R5cGVTbGlkZSBleHRlbmRzIFNsaWRlXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0QHByb3RvdHlwZVZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwicHJvdG90eXBlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHByb3RvdHlwZVZpZXcucGFyZW50ID0gQFxuXHRcdEBzaXplZCgpXG5cdFxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICdwV2lkdGgnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucFdpZHRoXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnBXaWR0aCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwSGVpZ2h0Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBIZWlnaHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucEhlaWdodCA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdFxuXHRzY2FsZWQ6ICh2YWx1ZSkgPT5cblx0XHRAcHJvdG90eXBlVmlldy5zY2FsZSA9IHZhbHVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdGJvcmRlcmVkOiAodmFsdWUpID0+XG5cdFx0QHByb3RvdHlwZVZpZXcuYm9yZGVyUmFkaXVzID0gdmFsdWVcblx0XHRyZXR1cm4gQFxuXHRcblx0c2l6ZWQ6ICh3aWR0aCA9IDM3NSwgaGVpZ2h0ID0gODEyKSA9PlxuXHRcdEBwcm90b3R5cGVWaWV3LndpZHRoID0gd2lkdGhcblx0XHRAcHJvdG90eXBlVmlldy5oZWlnaHQgPSBoZWlnaHRcblx0XHRAcHJvdG90eXBlVmlldy5jZW50ZXIoKVxuXG5cdFx0aWYgd2lkdGggPT0gMzc1IGFuZCBoZWlnaHQgPT0gODEyIHRoZW4gQHNjYWxlZCgyLjApXG5cdFx0ZWxzZSBpZiB3aWR0aCA9PSAzOTAgYW5kIGhlaWdodCA9PSA4NDQgdGhlbiBAc2NhbGVkKDEuOTIzKVxuXHRcdGVsc2UgQHNjYWxlZCgyLjApXG5cblx0XHRyZXR1cm4gQFxuXHRcblx0XG5cdFxuXHQjIG92ZXJyaWRlXG5cdHNvdXJjZTogKG9yaWdpblVSTCkgPT5cblx0XHR1cmwgPSBvcmlnaW5VUkwgKyBcIj9sb2dvPW9mZiZidXR0b249b2ZmXCJcblx0XHRcblx0XHRjb250ZW50VmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAcHJvdG90eXBlVmlld1xuXHRcdFx0d2lkdGg6IEBwcm90b3R5cGVWaWV3LndpZHRoLCBoZWlnaHQ6IEBwcm90b3R5cGVWaWV3LmhlaWdodCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRodG1sOiBcIjxpZnJhbWUgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsnIHNyYz0nI3t1cmx9Jz48L2lmcmFtZT5cIlxuXHRcdFx0aWdub3JlRXZlbnRzOiBmYWxzZSwgY2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHJldHVybiBAXG5cdFxuXHRcblx0XG5cdGNyZWF0ZVdlYlZpZXc6ICh3ZWJVUkwpID0+XG5cdFx0XG5cdFx0dmlldyA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IEBpbWFnZVNpemUud2lkdGgsIGhlaWdodDogQGltYWdlU2l6ZS5oZWlnaHRcblx0XHRcdG5hbWU6IFwid2Vidmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJvcmRlclJhZGl1czogQGltYWdlUmFkaXVzXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XG5cdFx0Y29udGVudFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdmlld1xuXHRcdFx0d2lkdGg6IEBpbWFnZVNpemUud2lkdGgsIGhlaWdodDogQGltYWdlU2l6ZS5oZWlnaHQsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aHRtbDogXCI8aWZyYW1lIHN0eWxlPSdwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7JyBzcmM9JyN7d2ViVVJMfSc+PC9pZnJhbWU+XCJcblx0XHRcdGlnbm9yZUV2ZW50czogZmFsc2UsIGNsaXA6IHRydWVcblx0XHRcblx0XHRyZXR1cm4gdmlld1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7U2xpZGUsIFNpbXBsZVZpZGVvU2xpZGUsIFZpZGVvU2xpZGUsIEhEVmlkZW9TbGlkZSwgUHJvdG90eXBlU2xpZGV9IiwiXG57U2xpZGVyNX0gPSByZXF1aXJlIFwiUENTbGlkZXI1XCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblxuXG4jIFBhbmVsc1xuXG4jIHByaW50IFwiP1wiXG5jbGFzcyBleHBvcnRzLlNsaWRlclBpbmNoIGV4dGVuZHMgU2xpZGVyNVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGxhc3RTbGlkZVNlbGVjdGVkSW5kZXg6IDBcblx0XHRcdGdyaWRCdXR0b25zOiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAb24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0XHRpZiBmcm9tICE9IHRvXG5cdFx0XHRcdGlmIHRvID09IFwicHJlc2VudFwiXG5cdFx0XHRcdFx0bmV4dE9wYWNpdHlWYWx1ZSA9IDFcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdG5leHRPcGFjaXR5VmFsdWUgPSAwXG5cdFx0XHRcdFxuXHRcdFx0XHRAYm90dG9tVmlldy5hbmltYXRlKG9wYWNpdHk6IG5leHRPcGFjaXR5VmFsdWUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblx0XHRcdFx0XG5cdFx0XG5cdFxuXHRAZGVmaW5lICdsYXN0U2xpZGVTZWxlY3RlZEluZGV4Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwaW5jaEJ1dHRvbnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucGluY2hCdXR0b25zXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnBpbmNoQnV0dG9ucyA9IHZhbHVlXG5cdFx0XG5cdFxuXHRcblxuXHRncmlkU2l6ZTogKCkgPT5cblx0XHRyZXR1cm4gM1xuXG5cdGdldEdyaWRHYXA6ICgpID0+XG5cdFx0cmV0dXJuIDIwXG5cblx0Z2V0R3JpZFNjYWxlOiAoKSA9PlxuXHRcdHdzID0gKEB3aWR0aCAtIEBnZXRHcmlkR2FwKCkgKiAoQGdyaWRTaXplKCkgLSAxKSkgLyBAZ3JpZFNpemUoKVxuXHRcdHJldHVybiB3cyAvIEB3aWR0aFxuXG5cblxuXHRwaW5jaFRvR3JpZDogKCkgPT5cblxuXHRcdGlmIEBpc0dyaWQoKVxuXHRcdFx0QHBpbmNoVG9TbGlkZShAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleClcblx0XHRcdHJldHVyblxuXG5cdFx0QHN0YXRlU3dpdGNoKFwiZ3JpZFwiKVxuXHRcdEBzaG93R3JpZENhbmNlbEJ1dHRvbigpXG5cblx0XHRzY2FsZUluZGV4ID0gQGdldEdyaWRTY2FsZSgpXG5cblx0XHRAaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdEBjb250ZW50Lmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRcdCMgQHNjcm9sbFZlcnRpY2FsID0gdHJ1ZVxuXHRcdCMgQGNvbnRlbnQuc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXHRcdEBzY3JvbGxIb3Jpem9udGFsID0gZmFsc2Vcblx0XHQjIEBjb250ZW50LnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXG5cblxuXHRcdGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHNsaWRlLmdyaWREYXRhID1cblx0XHRcdFx0eDogKGluZGV4ICUgQGdyaWRTaXplKCkgLSAxKSAqIChzbGlkZS53aWR0aCAqIHNjYWxlSW5kZXggKyBAZ2V0R3JpZEdhcCgpKVxuXHRcdFx0XHR5OiAoKGluZGV4IC0gaW5kZXggJSBAZ3JpZFNpemUoKSkgLyBAZ3JpZFNpemUoKSAtIDEpICogKHNsaWRlLmhlaWdodCAqIHNjYWxlSW5kZXggKyBAZ2V0R3JpZEdhcCgpKSArIEBnZXRHcmlkR2FwKClcblx0XHRcdFx0c2NhbGU6IHNjYWxlSW5kZXhcblxuXG5cblxuXHRcdEBncmlkLnNjcm9sbFRvUG9pbnQoe3g6IDAsIHk6IEBjb250ZW50LmNoaWxkcmVuW0BsYXN0U2xpZGVTZWxlY3RlZEluZGV4XS5ncmlkRGF0YS55IH0sIGZhbHNlKVxuXHRcdHNlbGVjdGVkU2xpZGVEZWx0YVkgPSBAZ3JpZC5zY3JvbGxZXG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bMF0sIGZhbHNlKVxuXG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBjb250ZW50LmNsaXAgPSBmYWxzZVxuXG5cdFx0QGdyaWQuc2Nyb2xsVmVydGljYWwgPSB0cnVlXG5cdFx0QGdyaWQubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cblx0XHRkZWx0YVJvd051bWJlciA9ICgoQGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gKEBjb250ZW50LmNoaWxkcmVuLmxlbmd0aCAlIEBncmlkU2l6ZSgpKSkgLyBAZ3JpZFNpemUoKSArIDEpXG5cdFx0QGhlaWdodCA9IGRlbHRhUm93TnVtYmVyICogKEBncmlkLmhlaWdodCAvIDMpICsgKGRlbHRhUm93TnVtYmVyICsgMSkgKiAoQGdyaWRTaXplKCkgLyBzY2FsZUluZGV4KVxuXG5cblx0XHRcblx0XHRcblx0XHRmb3Igc2xpZGUsIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRpZiBpbmRleCA9PSBAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleFxuXG5cdFx0XHRcdHNsaWRlLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdHNsaWRlLnggPSAwXG5cdFx0XHRcdHNsaWRlLnkgPSBzZWxlY3RlZFNsaWRlRGVsdGFZXG5cblx0XHRcdFx0Z3JpZERvd25zY2FsZUFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24gc2xpZGUsXG5cdFx0XHRcdFx0eDogc2xpZGUuZ3JpZERhdGEueFxuXHRcdFx0XHRcdHk6IHNsaWRlLmdyaWREYXRhLnlcblx0XHRcdFx0XHRzY2FsZTogc2xpZGUuZ3JpZERhdGEuc2NhbGVcblx0XHRcdFx0XHRvcHRpb25zOlxuXHRcdFx0XHRcdFx0Y3VydmU6IEJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpXG5cdFx0XHRcdFx0XHR0aW1lOiAwLjNcblx0XHRcdFx0XG5cdFx0XHRcdGdyaWREb3duc2NhbGVBbmltYXRpb24uc3RhcnQoKVxuXG5cdFx0XHRcdGdyaWREb3duc2NhbGVBbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgKGFuaW1hdGlvbikgLT5cblx0XHRcdFx0XHRsb2NhbFNjcm9sbCA9IEBsYXllci5wYXJlbnQucGFyZW50XG5cdFx0XHRcdFx0bG9jYWxHcmlkQnV0dG9ucyA9IFtdXG5cblx0XHRcdFx0XHRmb3Igc2xpZGUsIGluZGV4IGluIGxvY2FsU2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdFx0XHRcdCMgcHJpbnQgbG9jYWxTbGlkZVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRncmlkQmFja0hhbmRlciA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRcdFx0XHRcdGxvY2FsU2Nyb2xsID0gQHBhcmVudC5wYXJlbnQucGFyZW50XG5cdFx0XHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBAY3VzdG9tLnNsaWRlSW5kZXhcblx0XHRcdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb1NsaWRlKClcblxuXHRcdFx0XHRcdFx0Z3JpZEJhY2tCdXR0b24gPSBuZXcgVGV4dEJ1dHRvblxuXHRcdFx0XHRcdFx0XHRwYXJlbnQ6IHNsaWRlXG5cdFx0XHRcdFx0XHRcdHdpZHRoOiBzbGlkZS53aWR0aCwgaGVpZ2h0OiBzbGlkZS5oZWlnaHRcblx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdFx0XHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0XHRcdFx0XHRoYW5kbGVyOiBncmlkQmFja0hhbmRlclxuXHRcdFx0XHRcdFx0XHRjdXN0b206XG5cdFx0XHRcdFx0XHRcdFx0c2xpZGVJbmRleDogaW5kZXhcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0bG9jYWxHcmlkQnV0dG9ucy5wdXNoIGdyaWRCYWNrQnV0dG9uXG5cblx0XHRcdFx0XHRcdCMgZ3JpZEJhY2tCdXR0b24ub25UYXAgLT5cblx0XHRcdFx0XHRcdCMgXHRsb2NhbFNjcm9sbCA9IEBwYXJlbnQucGFyZW50LnBhcmVudFxuXHRcdFx0XHRcdFx0IyBcdGxvY2FsU2Nyb2xsLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBAY3VzdG9tLnNsaWRlSW5kZXhcblx0XHRcdFx0XHRcdCMgXHRsb2NhbFNjcm9sbC5waW5jaFRvU2xpZGUoKVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmdyaWRCdXR0b25zID0gbG9jYWxHcmlkQnV0dG9uc1xuXG5cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2xpZGUueCA9IHNsaWRlLmdyaWREYXRhLnhcblx0XHRcdFx0c2xpZGUueSA9IHNsaWRlLmdyaWREYXRhLnlcblx0XHRcdFx0c2xpZGUuc2NhbGUgPSBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXG5cblxuXHRcdFxuXHRcdFxuXHRcdEB1cGRhdGVDb250ZW50KClcblx0XHRAZ3JpZC51cGRhdGVDb250ZW50KClcblxuXG5cblx0XG5cblxuXG5cdHBpbmNoVG9TbGlkZTogKCkgPT5cblx0XHRcblx0XHRAc3RhdGVTd2l0Y2goXCJwcmVzZW50XCIpXG5cblx0XHRmb3IgaXRlbSBpbiBAZ3JpZEJ1dHRvbnNcblx0XHRcdGl0ZW0uZGVzdHJveSgpXG5cblx0XHRAaWdub3JlRXZlbnRzID0gZmFsc2Vcblx0XHRAY29udGVudC5pZ25vcmVFdmVudHMgPSBmYWxzZVxuXG5cdFx0IyBAc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXHRcdCMgQGNvbnRlbnQuc2Nyb2xsVmVydGljYWwgPSB0cnVlXG5cdFx0QHNjcm9sbEhvcml6b250YWwgPSB0cnVlXG5cdFx0IyBAY29udGVudC5zY3JvbGxIb3Jpem9udGFsID0gdHJ1ZVxuXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFx0QGNvbnRlbnQuY2xpcCA9IHRydWVcblx0XHQjIEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblx0XHRAZ3JpZC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0IyBAZ3JpZC5jb250ZW50Lmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRcdEBncmlkLnNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHRAZ3JpZC5tb3VzZVdoZWVsRW5hYmxlZCA9IGZhbHNlXG5cblx0XHRAaGVpZ2h0ID0gQGdyaWQuaGVpZ2h0XG5cdFx0QGdyaWQuc2Nyb2xsVG9Ub3AoZmFsc2UpXG5cblxuXHRcdGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHNsaWRlLmdyaWREYXRhID1cblx0XHRcdFx0eDogKHNsaWRlLndpZHRoICsgMTIwKSAqIGluZGV4XG5cdFx0XHRcdHk6IDBcblx0XHRcdFx0c2NhbGU6IDFcblxuXHRcdGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHNsaWRlLnggPSBzbGlkZS5ncmlkRGF0YS54XG5cdFx0XHRzbGlkZS55ID0gc2xpZGUuZ3JpZERhdGEueVxuXHRcdFx0c2xpZGUuc2NhbGUgPSBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXG5cdFx0IyBmb3Igc2xpZGUsIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0IyBcdGlmIGluZGV4ID09IEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4XG5cdFx0IyBcdFx0c2xpZGUuYnJpbmdUb0Zyb250KClcblxuXHRcdCMgXHRcdGdyaWRVcHNjYWxlQW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbiBzbGlkZSxcblx0XHQjIFx0XHRcdHg6IHNsaWRlLmdyaWREYXRhLnhcblx0XHQjIFx0XHRcdHk6IHNsaWRlLmdyaWREYXRhLnlcblx0XHQjIFx0XHRcdHNjYWxlOiBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXHRcdCMgXHRcdFx0b3B0aW9uczpcblx0XHQjIFx0XHRcdFx0Y3VydmU6IEJlemllcigwLjI1LCAwLjEsIDAuMjUsIDEpXG5cdFx0IyBcdFx0XHRcdHRpbWU6IDAuM1xuXHRcdFx0XHRcblx0XHQjIFx0XHRncmlkVXBzY2FsZUFuaW1hdGlvbi5zdGFydCgpXG5cblx0XHQjIFx0XHRncmlkVXBzY2FsZUFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAoYW5pbWF0aW9uKSAtPlxuXHRcdCMgXHRcdFx0bG9jYWxTY3JvbGwgPSBAbGF5ZXIucGFyZW50LnBhcmVudFxuXG5cdFx0IyBcdFx0XHRmb3Igc2xpZGUsIGluZGV4IGluIGxvY2FsU2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW5cblx0XHQjIFx0XHRcdFx0c2xpZGUueCA9IHNsaWRlLmdyaWREYXRhLnhcblx0XHQjIFx0XHRcdFx0c2xpZGUueSA9IHNsaWRlLmdyaWREYXRhLnlcblx0XHQjIFx0XHRcdFx0c2xpZGUuc2NhbGUgPSBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXHRcdCMgXHRcdFx0XHQjIHNsaWRlLm9wYWNpdHkgPSAxXG5cblx0XHQjIFx0IyBlbHNlXG5cdFx0IyBcdFx0IyBzbGlkZS5vcGFjaXR5ID0gMC41XG5cblxuXHRcdFxuXHRcdEB1cGRhdGVDb250ZW50KClcblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlbltAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleF0sIGZhbHNlKVxuXG5cdFx0QHVwZGF0ZUN1cnJlbnRQYWdlKClcblxuXG5cblx0XHRcblx0XHQiLCJcbntTbGlkZXI0fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjRcIlxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjUgZXh0ZW5kcyBTbGlkZXI0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGFjdGl2ZVZpZGVvUGxheWVyOiBudWxsXG5cdFx0XHRhY3RpdmVQcm9ncmVzc1NsaWRlcjogbnVsbFxuXHRcdFx0YWN0aXZlRHJhZzogZmFsc2Vcblx0XHRcdGFjdGl2ZVBsYXlpbmc6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdFxuXHRcdEZyYW1lci5Mb29wLm9uIFwicmVuZGVyXCIsID0+XG5cdFx0XHRpZiAhQGFjdGl2ZURyYWcgYW5kIEBhY3RpdmVQbGF5aW5nIGFuZCAhQGlzR3JpZCgpXG5cblx0XHRcdFx0aWYgQGFjdGl2ZVByb2dyZXNzU2xpZGVyICE9IHVuZGVmaW5lZCBhbmQgQGFjdGl2ZVByb2dyZXNzU2xpZGVyICE9IG51bGxcblx0XHRcdFx0XHRpZiBAYWN0aXZlVmlkZW9QbGF5ZXIgIT0gdW5kZWZpbmVkIGFuZCBAYWN0aXZlVmlkZW9QbGF5ZXIgIT0gbnVsbFxuXHRcdFx0XHRcdFx0QGFjdGl2ZVByb2dyZXNzU2xpZGVyLnZhbHVlID0gVXRpbHMubW9kdWxhdGUoQGFjdGl2ZVZpZGVvUGxheWVyLmN1cnJlbnRUaW1lLCBbMCwgQGFjdGl2ZVZpZGVvUGxheWVyLmR1cmF0aW9uXSwgWzAsIDFdLCB0cnVlKVxuXG5cblxuXHR1cGRhdGVDdXJyZW50UGFnZTogKCkgPT5cblx0XHRzdXBlciBAdXBkYXRlQ29udGVudCgpXG5cdFx0XG5cdFx0QHNlbGVjdEN1cnJlbnRQbGF5aW5nVmlkZW8oKVxuXHRcdEBhY3RpdmVEcmFnID0gZmFsc2Vcblx0XG5cdFxuXHRcblx0QGRlZmluZSAnYWN0aXZlUHJvZ3Jlc3NTbGlkZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlUHJvZ3Jlc3NTbGlkZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYWN0aXZlVmlkZW9QbGF5ZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlVmlkZW9QbGF5ZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlVmlkZW9QbGF5ZXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYWN0aXZlRHJhZycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVEcmFnXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZURyYWcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYWN0aXZlUGxheWluZycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVQbGF5aW5nXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZVBsYXlpbmcgPSB2YWx1ZVxuXHRcblx0XG5cdFxuXHRzZWxlY3RDdXJyZW50UGxheWluZ1ZpZGVvOiAoKSA9PlxuXHRcdGN1cnJlbnRseU5vdFBsYXlpbmcgPSB0cnVlXG5cblx0XHRmb3IgaXRlbSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGlmIGl0ZW0gPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdGN1cnJlbnRseU5vdFBsYXlpbmcgPSBmYWxzZVxuXHRcdFx0XHRAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgPSBAY3VycmVudFBhZ2UucGxheWVyU2xpZGVyXG5cdFx0XHRcdEBhY3RpdmVWaWRlb1BsYXllciA9IEBjdXJyZW50UGFnZS52aWRlb1ZpZXcucGxheWVyXG5cdFx0XG5cdFx0aWYgY3VycmVudGx5Tm90UGxheWluZ1xuXHRcdFx0QGFjdGl2ZVByb2dyZXNzU2xpZGVyID0gbnVsbFxuXHRcdFx0QGFjdGl2ZVZpZGVvUGxheWVyID0gbnVsbFxuIiwiXG57U2xpZGVyM30gPSByZXF1aXJlIFwiUENTbGlkZXIzXCJcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXI0IGV4dGVuZHMgU2xpZGVyM1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOmN1cnJlbnRQYWdlXCIsIC0+XG5cdFx0XHRAdXBkYXRlQ3VycmVudFBhZ2UoKVxuXHRcdFxuXHRcdEBjb250ZW50Lm9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0XHRAcGFyZW50LnNsaWRlQ2hhbmdlclZpZXcucGFnZXMgPSBAY2hpbGRyZW4ubGVuZ3RoXG5cdFx0XHRAcGFyZW50LnVwZGF0ZUN1cnJlbnRQYWdlKClcblx0XHRcblx0XG5cdFxuXHRcblx0dXBkYXRlQ3VycmVudFBhZ2U6ICgpID0+XG5cdFx0aWYgIUBpc0dyaWQoKVxuXHRcdFx0Zm9yIGl0ZW0sIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRcdGlmIGl0ZW0gPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdFx0QGxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBpbmRleFxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XG5cblx0XHRAcGF1c2VCYWNrZ3JvdW5kVmlkZW9zKClcblx0XHRAdXBkYXRlQ3VycmVudFBhZ2VTbGlkZXIoKVxuXG5cdFx0aWYgIUBpc0dyaWQoKSB0aGVuIEBwbGF5QWN0aXZlVmlkZW8oKVxuXHRcdFx0XG5cdFxuXG5cblx0cGxheUFjdGl2ZVZpZGVvOiAoKSA9PlxuXHRcdGZvciBjdXJyZW50VmlkZW9TbGlkZSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGlmIGN1cnJlbnRWaWRlb1NsaWRlID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRjdXJyZW50VmlkZW9TbGlkZS5wbGF5KClcblx0XHRcdFx0cmV0dXJuXG5cblxuXHRwYXVzZUJhY2tncm91bmRWaWRlb3M6ICgpID0+XG5cdFx0Zm9yIGN1cnJlbnRWaWRlb1NsaWRlIGluIEB2aWRlb1NsaWRlc1xuXHRcdFx0aWYgY3VycmVudFZpZGVvU2xpZGUgIT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdGN1cnJlbnRWaWRlb1NsaWRlLnBhdXNlKClcblx0XG5cdHNob3dHcmlkQ2FuY2VsQnV0dG9uOiAoKSA9PlxuXHRcdEBzbGlkZUNoYW5nZXJWaWV3LmN1cnJlbnQgPSAtMVxuXHRcblx0dXBkYXRlQ3VycmVudFBhZ2VTbGlkZXI6ICgpID0+XG5cdFx0aWYgQGlzR3JpZCgpXG5cdFx0XHRAc2hvd0dyaWRDYW5jZWxCdXR0b24oKVxuXHRcdFx0cmV0dXJuXG5cdFx0XG5cdFx0Zm9yIGl0ZW0sIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRAc2xpZGVDaGFuZ2VyVmlldy5jdXJyZW50ID0gKGluZGV4ICsgMSlcblx0XHRcdFx0cmV0dXJuIiwiXG5cbntTbGlkZXIyfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjJcIlxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjMgZXh0ZW5kcyBTbGlkZXIyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAaW5pdFNob3J0Y3V0cygpXG5cdFxuXHRcblx0aW5pdFNob3J0Y3V0czogKCkgPT5cblx0XHRsb2NhbFNjcm9sbCA9IEBcblx0XHRcblx0XHRFdmVudHMud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cblx0XHRcdFxuXHRcdFx0aWYgZXZlbnQuY29kZSBpcyBcIkFycm93TGVmdFwiXG5cdFx0XHRcdGlmICFsb2NhbFNjcm9sbC5pc0dyaWQoKSB0aGVuIGxvY2FsU2Nyb2xsLnNuYXBUb05leHRQYWdlKFwibGVmdFwiLCBmYWxzZSlcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiQXJyb3dSaWdodFwiXG5cdFx0XHRcdGlmICFsb2NhbFNjcm9sbC5pc0dyaWQoKSB0aGVuIGxvY2FsU2Nyb2xsLnNuYXBUb05leHRQYWdlKFwicmlnaHRcIiwgZmFsc2UpXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUNcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5jb3B5QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlGXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwuZnVsbHNjcmVlbkJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5UlwiXG5cdFx0XHRcdGxvY2FsU2Nyb2xsLnJlc3RhcnRCdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUFcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvR3JpZCgpXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIkVzY2FwZVwiXG5cdFx0XHRcdGlmIGxvY2FsU2Nyb2xsLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJTcGFjZVwiXG5cdFx0XHRcdHRyeSBsb2NhbFNjcm9sbC5jdXJyZW50UGFnZS50b2dnbGVQbGF5KClcblx0IiwiXG57U2xpZGVyMX0gPSByZXF1aXJlIFwiUENTbGlkZXIxXCJcblxuXG5TbGlkZVRlbXBsYXRlID0gcmVxdWlyZShcIlBDU2xpZGVcIilcblNsaWRlID0gU2xpZGVUZW1wbGF0ZS5TbGlkZVxuU2ltcGxlVmlkZW9TbGlkZSA9IFNsaWRlVGVtcGxhdGUuU2ltcGxlVmlkZW9TbGlkZVxuVmlkZW9TbGlkZSA9IFNsaWRlVGVtcGxhdGUuVmlkZW9TbGlkZVxuSERWaWRlb1NsaWRlID0gU2xpZGVUZW1wbGF0ZS5IRFZpZGVvU2xpZGVcblxuUHJvdG90eXBlU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlByb3RvdHlwZVNsaWRlXG5cblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIyIGV4dGVuZHMgU2xpZGVyMVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWRlb1NsaWRlczogW11cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblx0QGRlZmluZSAndmlkZW9TbGlkZXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlkZW9TbGlkZXNcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRzbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0cmV0dXJuIHNsaWRlXG5cblxuXG5cdGJnVmlkZW9TbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgU2ltcGxlVmlkZW9TbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFxuXHRcdGlmIHNvdXJjZVVSTCAhPSBudWxsIHRoZW4gc2xpZGUuc291cmNlKHNvdXJjZVVSTClcblx0XHRAdmlkZW9TbGlkZXMucHVzaCBzbGlkZVxuXHRcdHJldHVybiBzbGlkZVxuXHRcblx0dmlkZW9TbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgSERWaWRlb1NsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0aWYgc291cmNlVVJMICE9IG51bGwgdGhlbiBzbGlkZS5zb3VyY2Uoc291cmNlVVJMKVxuXHRcdEB2aWRlb1NsaWRlcy5wdXNoIHNsaWRlXG5cdFx0cmV0dXJuIHNsaWRlXG5cblx0ZnVsbFZpZGVvU2xpZGU6IChzb3VyY2VVUkwgPSBudWxsKSA9PlxuXHRcdHNsaWRlID0gbmV3IFZpZGVvU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0QHZpZGVvU2xpZGVzLnB1c2ggc2xpZGVcblx0XHRyZXR1cm4gc2xpZGVcblxuXHRcblx0XG5cdFxuXHRcblx0XG5cblxuXHRwcm90b3R5cGVTbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgUHJvdG90eXBlU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0cmV0dXJuIHNsaWRlIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG57U2xpZGVyMH0gPSByZXF1aXJlIFwiUENTbGlkZXIwXCJcbiMge1NsaWRlclBpbmNofSA9IHJlcXVpcmUgXCJQQ1NsaWRlclBpbmNoXCJcbntTbGlkZUNoYW5nZXJ9ID0gcmVxdWlyZSBcIlBDU2xpZGVDaGFuZ2VyXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHQgPSBCdXR0b25zLlRleHRcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5Db3B5QnV0dG9uID0gQnV0dG9ucy5Db3B5QnV0dG9uXG5cblxuIyBQYW5lbHNcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIxIGV4dGVuZHMgU2xpZGVyMFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAdG9wVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAY2FudmFzLCBuYW1lOiBcInRvcFZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQGNhbnZhcy53aWR0aCwgaGVpZ2h0OiA1NlxuXHRcdFxuXHRcdEBib3R0b21WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBjYW52YXMsIG5hbWU6IFwiYm90dG9tVmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAY2FudmFzLndpZHRoLCBoZWlnaHQ6IDU2LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcblx0XHRmb3IgaXRlbSBpbiBbQHRvcFZpZXcsIEBib3R0b21WaWV3XVxuXHRcdFx0aXRlbS5zZW5kVG9CYWNrKClcblx0XHRcdGl0ZW0uc3RhdGVzID1cblx0XHRcdFx0XCJ3aW5kb3dcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0IyBUb3AgVmlld1xuXHRcdEBsb2dvQnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJsb2dvXCJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMiwgYXNzZXQ6IFNWRy5sb2dvSWNvblxuXHRcdFx0aGFuZGxlcjogQG9wZW5VUkxIb21lXG5cdFx0XG5cdFx0QHRpdGxlVGV4dCA9IG5ldyBUZXh0XG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcInRpdGxlXCJcblx0XHRcdHRleHQ6IEB0aXRsZSwgdGV4dEFsaWduOiBcImNlbnRlclwiLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG5cdFx0XG5cdFx0QGNvcHlCdXR0b24gPSBuZXcgQ29weUJ1dHRvblxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJjb3B5IGxpbmtcIlxuXHRcdFx0dGV4dDogXCJDb3B5IExpbmtcIiwgdGV4dEFsaWduOiBcInJpZ2h0XCIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y3VzdG9tOiB7IHg6IC00MC0yMC0yNCB9XG5cdFx0XHRsaW5rOiB3aW5kb3cubG9jYXRpb25cblx0XHRcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiZnVsbHNjcmVlblwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgYXNzZXQ6IFNWRy5mdWxsc2NyZWVuSWNvblxuXHRcdFx0aGFuZGxlcjogQGNoYW5nZVNjYWxlXG5cdFx0XHRjdXN0b206IHsgeDogLTM2IH1cblx0XHRcblxuXG5cblx0XHQjIEJvdHRvbSBWaWV3XG5cdFx0QHNsaWRlQ2hhbmdlclZpZXcgPSBuZXcgU2xpZGVDaGFuZ2VyXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInNsaWRlIGNoYW5nZXJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XHRzbGlkZXI6IEBcblx0XHRcblx0XHRAcmVzdGFydEJ1dHRvbiA9IG5ldyBUZXh0QnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInJlc3RhcnRcIlxuXHRcdFx0dGV4dDogXCJSZXN0YXJ0IChSKVwiLCB0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTIwMDApLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhhbmRsZXI6IEByZXN0YXJ0SGFuZGxlclxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0yMDAwIH1cblx0XHRcblx0XHRcblxuXG5cdFx0QHVwZGF0ZVZpZXdCdWlsZGVyU2l6ZShAY2FudmFzKVxuXHRcdEBjYW52YXMub24gXCJjaGFuZ2U6c2l6ZVwiLCA9PlxuXHRcdFx0QHVwZGF0ZVZpZXdCdWlsZGVyU2l6ZShAY2FudmFzKVxuXHRcdFxuXHRcdFxuXHRcblxuXHR1cGRhdGVWaWV3QnVpbGRlclNpemU6IChhbmNob3IpID0+XG5cdFx0XG5cdFx0QHRvcFZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcblx0XHRpZiBhbmNob3Iud2lkdGggPCA3NDBcblx0XHRcdEB0aXRsZVRleHQud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcdEB0aXRsZVRleHQudGV4dEFsaWduID0gXCJsZWZ0XCJcblx0XHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEB0aXRsZVRleHQueSA9IEFsaWduLnRvcChAdG9wVmlldy5oZWlnaHQgKyAxMClcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEBjb3B5QnV0dG9uLnkgPSBBbGlnbi50b3AoQHRvcFZpZXcuaGVpZ2h0ICsgMzYpXG5cdFx0ZWxzZVxuXHRcdFx0QHRpdGxlVGV4dC53aWR0aCA9IGFuY2hvci53aWR0aCAvIDJcblx0XHRcdEB0aXRsZVRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIlxuXHRcdFx0QHRpdGxlVGV4dC54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRAdGl0bGVUZXh0LnkgPSBBbGlnbi5jZW50ZXIoMilcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLnJpZ2h0KEBjb3B5QnV0dG9uLmN1c3RvbS54KVxuXHRcdFx0QGNvcHlCdXR0b24ueSA9IEFsaWduLmNlbnRlcigyKVxuXHRcdFxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uLnggPSBBbGlnbi5yaWdodChAZnVsbHNjcmVlbkJ1dHRvbi5jdXN0b20ueClcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbi55ID0gQWxpZ24uY2VudGVyKDIpXG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRAc2xpZGVDaGFuZ2VyVmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0IyBoZWlnaHRcblx0XHRAYm90dG9tVmlldy55ID0gQWxpZ24uYm90dG9tIiwiXG5cbiMgU2NhbGUgJiBVUkwgaGFuZGxpbmdcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIwIGV4dGVuZHMgUGFnZUNvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdGNhbnZhc0JhY2tncm91bmRMYXllciA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdG5hbWU6IFwiY2FudmFzXCJcblx0XHRcblx0XHRjYW52YXNCYWNrZ3JvdW5kTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwid2luZG93XCI6IHsgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIiB9XG5cdFx0XHRcImZ1bGxzY3JlZW5cIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMlwiIH1cblx0XHRcblxuXHRcdGdyaWRTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IGNhbnZhc0JhY2tncm91bmRMYXllclxuXHRcdFx0bmFtZTogXCJncmlkXCJcblx0XHRcdHdpZHRoOiAxNDAwICogMiwgaGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2UsIHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGlnbm9yZUV2ZW50czogdHJ1ZVxuXHRcdFxuXHRcdGdyaWRTY3JvbGwuc3RhdGVzID1cblx0XHRcdFwid2luZG93XCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgc2NhbGU6IDEgfVxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Y2FudmFzOiBjYW52YXNCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdGdyaWQ6IGdyaWRTY3JvbGxcblx0XG5cdFx0XHRwYXJlbnQ6IGdyaWRTY3JvbGwuY29udGVudFxuXHRcdFx0d2lkdGg6IGdyaWRTY3JvbGwud2lkdGgsIGhlaWdodDogZ3JpZFNjcm9sbC5oZWlnaHRcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZSwgc2Nyb2xsSG9yaXpvbnRhbDogdHJ1ZVxuXHRcdFx0cHJlc2VudGF0aW9uVGl0bGU6IFwiVW50aXRsZWRcIlxuXHRcdFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBjb250ZW50LmRyYWdnYWJsZS5wcm9wYWdhdGVFdmVudHMgPSBmYWxzZVxuXG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcImdyaWRcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcdFwicHJlc2VudFwiOiB7IG9wYWNpdHk6IDEgfVxuXHRcdEBzdGF0ZVN3aXRjaChcInByZXNlbnRcIilcblxuXHRcdEZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmRpc2FibGUoKVxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXHRcdFxuXHRcdEBpbml0U2NhbGUoKVxuXHRcdFxuXHRcdEB1cGRhdGVTaXplKClcblx0XHRAY2FudmFzLm9uIFwiY2hhbmdlOnNpemVcIiwgPT5cblx0XHRcdEB1cGRhdGVTaXplKClcblx0XG5cdFxuXHRAZGVmaW5lICd0aXRsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcmVzZW50YXRpb25UaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcmVzZW50YXRpb25UaXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdjYW52YXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY2FudmFzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNhbnZhcyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmdyaWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ3JpZCA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdGlzR3JpZDogKCkgPT5cblx0XHRyZXR1cm4gQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJncmlkXCJcblx0XG5cdHVwZGF0ZVNpemU6ICgpID0+XG5cdFx0QGluaXRTY2FsZShAZ3JpZC5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcblx0XG5cdGluaXRTY2FsZTogKGZvclN0YXRlID0gXCJ3aW5kb3dcIikgPT5cblxuXHRcdHNjYWxlWCA9IChAY2FudmFzLndpZHRoIC0gMjApIC8gQGdyaWQud2lkdGhcblx0XHRzY2FsZVkgPSAoQGNhbnZhcy5oZWlnaHQgLSAxMjApIC8gQGdyaWQuaGVpZ2h0XG5cdFx0QGdyaWQuc3RhdGVzLndpbmRvdy5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdHNjYWxlWCA9IEBjYW52YXMud2lkdGggLyBAZ3JpZC53aWR0aFxuXHRcdHNjYWxlWSA9IEBjYW52YXMuaGVpZ2h0IC8gQGdyaWQuaGVpZ2h0XG5cdFx0QGdyaWQuc3RhdGVzLmZ1bGxzY3JlZW4uc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XHRcblx0XHRAZ3JpZC5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRAY2FudmFzLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdEBncmlkLmNlbnRlcigpXG5cdFxuXHRcblx0IyBmb3IgcmVhY3Rcblx0Y2hhbmdlU2NhbGU6ICgpID0+XG5cdFx0XG5cdFx0aWYgQGdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIndpbmRvd1wiIHRoZW4gbmV4dFN0YXRlID0gXCJmdWxsc2NyZWVuXCJcblx0XHRlbHNlIG5leHRTdGF0ZSA9IFwid2luZG93XCJcblx0XHRcblx0XHRAZ3JpZC5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEBjYW52YXMuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAdG9wVmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEBib3R0b21WaWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXG5cdHJlc3RhcnRIYW5kbGVyOiAoKSA9PlxuXHRcdEBzbmFwVG9QYWdlKEBjb250ZW50LmNoaWxkcmVuWzBdLCBmYWxzZSlcblx0XG5cdFxuXHRvcGVuVVJMOiAodXJsID0gXCJodHRwczovL3RpbGxsdXIucnVcIiwgaXNCbGFuayA9IGZhbHNlKSA9PlxuXHRcdGlmIGlzQmxhbmsgdGhlbiB3aW5kb3cub3BlbiB1cmwsICdfYmxhbmsnXG5cdFx0ZWxzZVxuIyBcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiP3NsaWRlSURcIlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gdXJsXG5cdFxuXHRvcGVuVVJMSG9tZTogPT5cblx0XHRAb3BlblVSTChcImh0dHBzOi8vdGlsbGx1ci5ydVwiLCBmYWxzZSlcblxuIiwiXG5cblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG4jIFRleHQgPSBCdXR0b25zLlRleHRcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5cblxuY2xhc3MgZXhwb3J0cy5TbGlkZUNoYW5nZXIgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJwcm9ncmVzcyB2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDEyMFxuXHRcdFx0aGVpZ2h0OiA1NlxuXHRcdFx0cGFnZXM6IDFcblx0XHRcdGN1cnJlbnQ6IDFcblx0XHRcdHNsaWRlcjogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0dGVzdEhhZGxlciA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHR0cnkgQHBhcmVudC5zbGlkZXIucGluY2hUb0dyaWQoKVxuXG5cblx0XHRAY3VycmVudFRleHQgPSBuZXcgVGV4dEJ1dHRvblxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiLCB3aWR0aDogMTIwLCBsZXR0ZXJTcGFjaW5nOiAzXG5cdFx0XHRoYW5kbGVyOiB0ZXN0SGFkbGVyXG5cdFx0XG5cdFx0QGN1cnJlbnRUZXh0LnVwZGF0ZVR1cGxlKHsgbm9ybWFsOiAxLCBob3ZlcjogMC44IH0pXG5cblx0XHRAcHJldkJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwicHJldlwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcucHJldkljb25cblx0XHRcdGhhbmRsZXI6IEBtb3ZlTGVmdFxuXHRcdFxuXHRcdEBuZXh0QnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0bmFtZTogXCJuZXh0XCIsIHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgYXNzZXQ6IFNWRy5uZXh0SWNvblxuXHRcdFx0aGFuZGxlcjogQG1vdmVSaWdodFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QGN1cnJlbnRUZXh0LnBhcmVudCA9IEBcblx0XHRAY3VycmVudFRleHQueSA9IEFsaWduLmNlbnRlcigtMSlcblx0XHRAY3VycmVudFRleHQuc3R5bGUgPVxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCJ0bnVtXCJcblx0XHRcdFwiZm9udC12YXJpYW50LW51bWVyaWNcIjogXCJ0YWJ1bGFyLW51bXMgbGluaW5nLW51bXNcIlxuXHRcdFxuXHRcdEBwcmV2QnV0dG9uLnBhcmVudCA9IEBcblx0XHRAcHJldkJ1dHRvbi54ID0gQWxpZ24ubGVmdFxuXHRcdEBwcmV2QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XHRAbmV4dEJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QG5leHRCdXR0b24ueCA9IEFsaWduLnJpZ2h0XG5cdFx0QG5leHRCdXR0b24ueSA9IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcblx0QGRlZmluZSAnc2xpZGVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNsaWRlclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2xpZGVyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3BhZ2VzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBhZ2VzXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5wYWdlcyA9IHZhbHVlXG5cdFx0XHRAY3VycmVudFRleHQudGV4dCA9IFwiI3tAY3VycmVudH0vI3tAcGFnZXN9XCJcblxuXHRAZGVmaW5lICdjdXJyZW50Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmN1cnJlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmN1cnJlbnQgPSB2YWx1ZVxuXG5cdFx0XHRpZiBAY3VycmVudCAhPSAtMVxuXHRcdFx0XHQjIHRoZW4gQHBhcmVudC5hbmltYXRlKG9wYWNpdHk6IDAsIGN1cnZlOiBTcHJpbmcoZGFtcnBpbmc6IDEpLCB0aW1lOiAwLjQpXG5cdFx0XHQjIGVsc2Vcblx0XHRcdFx0IyBAcGFyZW50LmFuaW1hdGUob3BhY2l0eTogMSwgY3VydmU6IFNwcmluZyhkYW1ycGluZzogMSksIHRpbWU6IDAuNClcblx0XHRcdFx0QGN1cnJlbnRUZXh0LnRleHQgPSBcIiN7QGN1cnJlbnR9LyN7QHBhZ2VzfVwiXG5cdFx0XHRcblx0XG5cblxuXG5cdG1vdmVMZWZ0OiAoKSA9PlxuIyBcdFx0cHJpbnQgQHNsaWRlclxuXHRcdEBzbGlkZXIuc25hcFRvTmV4dFBhZ2UoXCJsZWZ0XCIsIGZhbHNlKVxuXHRcblx0bW92ZVJpZ2h0OiAoKSA9PlxuIyBcdFx0cHJpbnQgQHNsaWRlclxuXHRcdEBzbGlkZXIuc25hcFRvTmV4dFBhZ2UoXCJyaWdodFwiLCBmYWxzZSkiLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuY29sb3Jfb25EYXJrID0gXCIjZmZmXCJcbmNvbG9yX29uTGlnaHQgPSBcIiMwMDBcIlxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG5cbmV4cG9ydHMubG9nb0ljb24gPSB7IG9uRGFyazogZ2V0TG9nbyhjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRMb2dvKGNvbG9yX29uTGlnaHQpfVxuXG5cblxuZ2V0RnVsbHNjcmVlbiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0xMS4wNDEgMi45MjE2NEMxMS4wNDEgMy40NDQ3MyAxMS40MjI1IDMuODM0OTggMTEuOTUzMyAzLjgzNDk4SDEyLjU0MjNMMTUuMTEzNSAzLjY2MDYxTDEzLjA5OCA1LjU3ODYyTDEwLjcwOTIgNy45NTMzQzEwLjUyNjcgOC4xMjc2NiAxMC40NDM4IDguMzUxODQgMTAuNDQzOCA4LjU5MjYzQzEwLjQ0MzggOS4xNTcyNCAxMC44MjUzIDkuNTY0MDkgMTEuMzg5MyA5LjU2NDA5QzExLjY0NjQgOS41NjQwOSAxMS44NzA0IDkuNDY0NDUgMTIuMDUyOSA5LjI5MDA5TDE0LjQzMzQgNi45MDcxMUwxNi4zNDExIDQuODgxMTZMMTYuMTY2OSA3LjQ3MTcyVjguMTE5MzZDMTYuMTY2OSA4LjY0MjQ1IDE2LjU0ODUgOS4wNDEgMTcuMDc5MyA5LjA0MUMxNy42MTAyIDkuMDQxIDE4IDguNjUwNzUgMTggOC4xMTkzNlYzLjUxMTE2QzE4IDIuNTU2MzEgMTcuNDQ0MyAyIDE2LjQ5MDQgMkwxMS45NTMzIDJDMTEuNDMwOCAyIDExLjA0MSAyLjM5MDI0IDExLjA0MSAyLjkyMTY0Wk0yIDExLjg4MDZMMiAxNi40ODg4QzIgMTcuNDQzNyAyLjU1NTczIDE4IDMuNTA5NTkgMThIOC4wNDY2NkM4LjU2OTIxIDE4IDguOTU5MDUgMTcuNjAxNSA4Ljk1OTA1IDE3LjA3ODRDOC45NTkwNSAxNi41NTUzIDguNTc3NSAxNi4xNjUgOC4wNDY2NiAxNi4xNjVINy40NTc3NUw0Ljg4NjQ3IDE2LjMzOTRMNi45MDIwMiAxNC40MjE0TDkuMjkwODIgMTIuMDQ2N0M5LjQ3MzMgMTEuODcyMyA5LjU1NjI1IDExLjY0ODIgOS41NTYyNSAxMS4zOTkxQzkuNTU2MjUgMTAuODM0NSA5LjE3NDcgMTAuNDI3NiA4LjYxMDY4IDEwLjQyNzZDOC4zNTM1NSAxMC40Mjc2IDguMTIxMzEgMTAuNTI3MiA3Ljk0NzEyIDEwLjcwOTlMNS41NjY2MiAxMy4wOTI5TDMuNjU4ODkgMTUuMTE4OEwzLjgzMzA3IDEyLjUyODNMMy44MzMwNyAxMS44ODA2QzMuODMzMDcgMTEuMzQ5MiAzLjQ1MTUzIDEwLjk1OSAyLjkyMDY4IDEwLjk1OUMyLjM4OTg0IDEwLjk1OSAyIDExLjM0OTIgMiAxMS44ODA2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLmZ1bGxzY3JlZW5JY29uID0geyBvbkRhcms6IGdldEZ1bGxzY3JlZW4oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0RnVsbHNjcmVlbihjb2xvcl9vbkxpZ2h0KX1cblxuXG5cblxuZ2V0TmV4dCA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk00Ljc5NjQgMTIuNzkzMUw5LjU4NjI3IDhMNC43OTY0IDMuMjA2ODdDNC40MDYwMSAyLjgxNjIxIDQuNDA2MjIgMi4xODMwNCA0Ljc5Njg4IDEuNzkyNjVDNS4xODc1NCAxLjQwMjI2IDUuODIwNyAxLjQwMjQ4IDYuMjExMDkgMS43OTMxM0wxMS43MDczIDcuMjkzMTNDMTIuMDk3NSA3LjY4MzYgMTIuMDk3NSA4LjMxNjQgMTEuNzA3MyA4LjcwNjg3TDYuMjExMDkgMTQuMjA2OUM1LjgyMDcgMTQuNTk3NSA1LjE4NzU0IDE0LjU5NzcgNC43OTY4OCAxNC4yMDczQzQuNDA2MjIgMTMuODE3IDQuNDA2MDEgMTMuMTgzOCA0Ljc5NjQgMTIuNzkzMVpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5uZXh0SWNvbiA9IHsgb25EYXJrOiBnZXROZXh0KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldE5leHQoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0UHJldiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk02LjQxNzQ4IDhMMTEuMjA3MyAxMi43OTMxQzExLjU5NzcgMTMuMTgzOCAxMS41OTc1IDEzLjgxNyAxMS4yMDY5IDE0LjIwNzNDMTAuODE2MiAxNC41OTc3IDEwLjE4MyAxNC41OTc1IDkuNzkyNjUgMTQuMjA2OUw0LjI5NjQgOC43MDY4N0MzLjkwNjIgOC4zMTY0IDMuOTA2MiA3LjY4MzYgNC4yOTY0IDcuMjkzMTNMOS43OTI2NSAxLjc5MzEzQzEwLjE4MyAxLjQwMjQ4IDEwLjgxNjIgMS40MDIyNiAxMS4yMDY5IDEuNzkyNjVDMTEuNTk3NSAyLjE4MzA0IDExLjU5NzcgMi44MTYyMSAxMS4yMDczIDMuMjA2ODdMNi40MTc0OCA4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnByZXZJY29uID0geyBvbkRhcms6IGdldFByZXYoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UHJldihjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5nZXRQbGF5ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPGNpcmNsZSBvcGFjaXR5PVwiMC41XCIgY3g9XCI5MFwiIGN5PVwiOTBcIiByPVwiOTBcIiBmaWxsPVwiIzAwMFwiLz5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03Ni43MTU4IDU4LjQ5MTRDNzMuMDUxMyA1Ni4yMzY0IDY4LjMzMzQgNTguODcyOSA2OC4zMzM0IDYzLjE3NTZWMTE2LjgyNEM2OC4zMzM0IDEyMS4xMjcgNzMuMDUxNSAxMjMuNzYzIDc2LjcxNiAxMjEuNTA4TDEyMy45NzIgOTQuNjgyNkMxMjcuNDYyIDkyLjUzNDkgMTI3LjQ2MiA4Ny40NjE5IDEyMy45NzIgODUuMzE0M0w3Ni43MTU4IDU4LjQ5MTRaXCIgZmlsbD1cIndoaXRlXCIgZmlsbC1vcGFjaXR5PVwiMC44XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXlJY29uID0geyBvbkRhcms6IGdldFBsYXkoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuZ2V0UGF1c2UgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgdmlld0JveD1cIjAgMCAxODAgMTgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48Y2lyY2xlIG9wYWNpdHk9XCIwLjVcIiBjeD1cIjkwXCIgY3k9XCI5MFwiIHI9XCI5MFwiIGZpbGw9XCIjMDAwXCIvPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcwIDU2QzY1LjU4MTcgNTYgNjIgNTkuNTgxNyA2MiA2NFYxMTZDNjIgMTIwLjQxOCA2NS41ODE3IDEyNCA3MCAxMjRINzZDODAuNDE4MyAxMjQgODQgMTIwLjQxOCA4NCAxMTZWNjRDODQgNTkuNTgxNyA4MC40MTgzIDU2IDc2IDU2SDcwWk0xMDQgNTZDOTkuNTgxNyA1NiA5NiA1OS41ODE3IDk2IDY0VjExNkM5NiAxMjAuNDE4IDk5LjU4MTcgMTI0IDEwNCAxMjRIMTEwQzExNC40MTggMTI0IDExOCAxMjAuNDE4IDExOCAxMTZWNjRDMTE4IDU5LjU4MTcgMTE0LjQxOCA1NiAxMTAgNTZIMTA0WlwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGwtb3BhY2l0eT1cIjAuOFwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wYXVzZUljb24gPSB7IG9uRGFyazogZ2V0UGF1c2UoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGF1c2UoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFZpZGVvU2xpZGVyID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjM2OFwiIGhlaWdodD1cIjExMlwiIHZpZXdCb3g9XCIwIDAgMzY4IDExMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHJlY3Qgb3BhY2l0eT1cIjAuM1wiIHdpZHRoPVwiMzY4XCIgaGVpZ2h0PVwiMTEyXCIgcng9XCI1NlwiIGZpbGw9XCIjMDAwXCIvPlxuPHJlY3Qgb3BhY2l0eT1cIjAuNVwiIHg9XCIzNFwiIHk9XCI1MlwiIHdpZHRoPVwiMzAwXCIgaGVpZ2h0PVwiOFwiIHJ4PVwiNFwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy52aWRlb1NsaWRlckljb24gPSB7IG9uRGFyazogZ2V0VmlkZW9TbGlkZXIoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0VmlkZW9TbGlkZXIoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0U2hhcmVQcm90b3R5cGUgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgdmlld0JveD1cIjAgMCAxODAgMTgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cmVjdCBvcGFjaXR5PVwiMC4zXCIgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiByeD1cIjkwXCIgZmlsbD1cIiMwMDBcIi8+XG48ZyBvcGFjaXR5PVwiMC42XCI+XG48cGF0aCBkPVwiTTEwMS42NyA1Ny43NTg2SDgwLjE3NjJDNzYuODMxMiA1Ny43NTg2IDc0LjAyMTYgNjAuMDUwOSA3My4yMzI1IDYzLjE1MDNDNzIuOTg4NSA2NC4xMDg5IDcyLjIwOTUgNjQuOTIzMyA3MS4yMjAzIDY0LjkyMzNINjcuNjM3OUM2Ni42NDg2IDY0LjkyMzMgNjUuODM0OSA2NC4xMTc0IDY1Ljk1NzEgNjMuMTM1N0M2Ni44MzcgNTYuMDY1NCA3Mi44Njc2IDUwLjU5MzggODAuMTc2MiA1MC41OTM4SDEwMS42N0MxMDkuNTg0IDUwLjU5MzggMTE2IDU3LjAwOTQgMTE2IDY0LjkyMzNWMTE1LjA3N0MxMTYgMTIyLjk5MSAxMDkuNTg0IDEyOS40MDYgMTAxLjY3IDEyOS40MDZIODAuMTc2MkM3Mi44Njc2IDEyOS40MDYgNjYuODM3IDEyMy45MzUgNjUuOTU3MSAxMTYuODY0QzY1LjgzNDkgMTE1Ljg4MyA2Ni42NDg2IDExNS4wNzcgNjcuNjM3OSAxMTUuMDc3SDcxLjIyMDNDNzIuMjA5NSAxMTUuMDc3IDcyLjk4ODUgMTE1Ljg5MSA3My4yMzI1IDExNi44NUM3NC4wMjE2IDExOS45NDkgNzYuODMxMiAxMjIuMjQxIDgwLjE3NjIgMTIyLjI0MUgxMDEuNjdDMTA1LjYyNyAxMjIuMjQxIDEwOC44MzUgMTE5LjAzNCAxMDguODM1IDExNS4wNzdWNjQuOTIzM0MxMDguODM1IDYwLjk2NjMgMTA1LjYyNyA1Ny43NTg2IDEwMS42NyA1Ny43NTg2WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjY0NyAxMDEuODA1TDc4LjYwMDQgOTIuNDYyOUg0OS44Mzc5QzQ4LjQ3NzcgOTIuNDYyOSA0Ny4zNzUgOTEuMzYwMiA0Ny4zNzUgOTBDNDcuMzc1IDg4LjYzOTggNDguNDc3NyA4Ny41MzcxIDQ5LjgzNzkgODcuNTM3MUg3OC42MDA0TDY5LjI2NDcgNzguMTk1MUM2OC4zMDMyIDc3LjIzMjkgNjguMzAzOCA3NS42NzM1IDY5LjI2NTkgNzQuNzEyQzcwLjIyOCA3My43NTA1IDcxLjc4NzUgNzMuNzUxMSA3Mi43NDkgNzQuNzEzMkw4Ni4yODU2IDg4LjI1OTFDODcuMjQ2NiA4OS4yMjA4IDg3LjI0NjYgOTAuNzc5MyA4Ni4yODU2IDkxLjc0MDlMNzIuNzQ5IDEwNS4yODdDNzEuNzg3NSAxMDYuMjQ5IDcwLjIyOCAxMDYuMjQ5IDY5LjI2NTkgMTA1LjI4OEM2OC4zMDM4IDEwNC4zMjcgNjguMzAzMiAxMDIuNzY3IDY5LjI2NDcgMTAxLjgwNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48L2c+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMuc2hhcmVQcm90b3R5cGVJY29uID0geyBvbkRhcms6IGdldFNoYXJlUHJvdG90eXBlKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFNoYXJlUHJvdG90eXBlKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cblxuXG5cblxuXG5cbiMgUCBMIEEgWSBFIFIg4oCUIEkgQyBPIE4gU1xuXG5nZXRQbGF5ZXJQbGF5ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjguMzQ5NCAxOC41NjYzQzI1LjgzMjQgMTcuMDE3NSAyMi41OTE4IDE4LjgyODMgMjIuNTkxOCAyMS43ODM3TDIyLjU5MTggNTguNjMyNEMyMi41OTE4IDYxLjU4NzggMjUuODMyNSA2My4zOTg3IDI4LjM0OTUgNjEuODQ5N0w2MC44MDc1IDQzLjQyNDVDNjMuMjA0NiA0MS45NDk0IDYzLjIwNDUgMzguNDY1IDYwLjgwNzQgMzYuOTg5OUwyOC4zNDk0IDE4LjU2NjNaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXllclBsYXlJY29uID0geyBvbkRhcms6IGdldFBsYXllclBsYXkoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyUGxheShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuZ2V0UGxheWVyUGF1c2UgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiODBcIiBoZWlnaHQ9XCI4MFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yNi4zMTU4IDE2LjczNjhDMjMuMjkyOCAxNi43MzY4IDIwLjg0MjIgMTkuMTg3NSAyMC44NDIyIDIyLjIxMDVWNTcuNzg5NEMyMC44NDIyIDYwLjgxMjUgMjMuMjkyOCA2My4yNjMxIDI2LjMxNTggNjMuMjYzMUgzMC40MjExQzMzLjQ0NDEgNjMuMjYzMSAzNS44OTQ4IDYwLjgxMjUgMzUuODk0OCA1Ny43ODk1VjIyLjIxMDVDMzUuODk0OCAxOS4xODc1IDMzLjQ0NDEgMTYuNzM2OCAzMC40MjExIDE2LjczNjhIMjYuMzE1OFpNNDkuNTc5MyAxNi43MzY4QzQ2LjU1NjIgMTYuNzM2OCA0NC4xMDU2IDE5LjE4NzUgNDQuMTA1NiAyMi4yMTA1VjU3Ljc4OTRDNDQuMTA1NiA2MC44MTI1IDQ2LjU1NjIgNjMuMjYzMSA0OS41NzkzIDYzLjI2MzFINTMuNjg0NUM1Ni43MDc2IDYzLjI2MzEgNTkuMTU4MiA2MC44MTI1IDU5LjE1ODIgNTcuNzg5NVYyMi4yMTA1QzU5LjE1ODIgMTkuMTg3NSA1Ni43MDc2IDE2LjczNjggNTMuNjg0NSAxNi43MzY4SDQ5LjU3OTNaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXllclBhdXNlSWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5ZXJQYXVzZShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQbGF5ZXJQYXVzZShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5cbmdldFBsYXllclNvdW5kID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTQwIDE1SDM3LjVMMjcuNSAyNy41SDIwQzE4LjQ1NzMgMjcuNSAxNy42ODYgMjcuNSAxNi44OTMgMjcuNzczOEMxNS45NTk5IDI4LjA5NiAxNC44NjAxIDI4Ljk1ODMgMTQuMzI0NiAyOS43ODc1QzEzLjg2OTUgMzAuNDkyMiAxMy43MjU5IDMxLjA3NjUgMTMuNDM4OCAzMi4yNDQ5QzEyLjgxNjcgMzQuNzc2OSAxMi41IDM3LjM4MDUgMTIuNSA0MEMxMi41IDQyLjYxOTUgMTIuODE2NyA0NS4yMjMxIDEzLjQzODggNDcuNzU1MUMxMy43MjU5IDQ4LjkyMzUgMTMuODY5NSA0OS41MDc4IDE0LjMyNDYgNTAuMjEyNUMxNC44NjAxIDUxLjA0MTcgMTUuOTU5OSA1MS45MDQgMTYuODkzIDUyLjIyNjJDMTcuNjg2IDUyLjUgMTguNDU3MyA1Mi41IDIwIDUyLjVIMjcuNUwzNy41IDY1SDQwQzQzLjA1IDY1IDQ2LjI1IDU1IDQ2LjI1IDM5Ljk1NzNDNDYuMjUgMjQuOTE0NyA0My4xODMzIDE1IDQwIDE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjxwYXRoIGQ9XCJNNTIuNSAzOS45NzYzQzUyLjQ5NSAzNy4zNDIzIDUxLjY1OCAzNC43NzcyIDUwLjEwODYgMzIuNjQ3TDU0LjE1MjEgMjkuNzA1OUM1Ni4zMjEzIDMyLjY4OCA1Ny40OTMgMzYuMjc5MiA1Ny41IDM5Ljk2NjhDNTcuNTA3IDQzLjY1NDQgNTYuMzQ4OSA0Ny4yNSA1NC4xOTEgNTAuMjQwNEw1MC4xMzY0IDQ3LjMxNDZDNTEuNjc3OCA0NS4xNzg2IDUyLjUwNSA0Mi42MTAzIDUyLjUgMzkuOTc2M1pcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTU4LjE5NTUgMjYuNzY0N0M2MC45ODQ1IDMwLjU5ODkgNjIuNDkxIDM1LjIxNjEgNjIuNSAzOS45NTczQzYyLjUwOSA0NC42OTg2IDYxLjAyIDQ5LjMyMTUgNTguMjQ1NiA1My4xNjYyTDYyLjMwMDEgNTYuMDkyMUM2NS42OTExIDUxLjM5MjkgNjcuNTEwOSA0NS43NDI3IDY3LjUgMzkuOTQ3OUM2Ny40ODkgMzQuMTUzIDY1LjY0NzcgMjguNTA5NyA2Mi4yMzg5IDIzLjgyMzVMNTguMTk1NSAyNi43NjQ3WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJTb3VuZEljb24gPSB7IG9uRGFyazogZ2V0UGxheWVyU291bmQoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyU291bmQoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFBsYXllclNvdW5kT2ZmID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTQ1IDE1SDQ3LjVDNTAuNjgzMyAxNSA1My42IDI0LjcyMjIgNTMuNiA0MEM1My42IDQxLjc0MDYgNTMuNTYwNCA0My40MDkgNTMuNDg1OCA0NC45OTkyTDM4LjMyNiAyMy4zNDI0TDQ1IDE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjxwYXRoIGQ9XCJNMzEuMjM2MyAyNy41SDI3LjVDMjUuOTU3MyAyNy41IDI1LjE4NiAyNy41IDI0LjM5MyAyNy43NzM4QzIzLjQ1OTkgMjguMDk2IDIyLjM2MDEgMjguOTU4MyAyMS44MjQ2IDI5Ljc4NzVDMjEuMzY5NSAzMC40OTIyIDIxLjIyNTkgMzEuMDc2NSAyMC45Mzg4IDMyLjI0NDlDMjAuMzE2NyAzNC43NzY5IDIwIDM3LjM4MDUgMjAgNDBDMjAgNDIuNjE5NSAyMC4zMTY3IDQ1LjIyMzEgMjAuOTM4OCA0Ny43NTUxQzIxLjIyNTkgNDguOTIzNiAyMS4zNjk1IDQ5LjUwNzggMjEuODI0NiA1MC4yMTI1QzIyLjM2MDEgNTEuMDQxNyAyMy40NTk5IDUxLjkwNCAyNC4zOTMgNTIuMjI2MkMyNS4xODYgNTIuNSAyNS45NTczIDUyLjUgMjcuNSA1Mi41SDM1TDQ1IDY1SDQ3LjVDNDkuMTUwNyA2NSA1MC44MDE0IDYyLjE1MjMgNTEuOTY4NSA1Ny4xMTc1TDU3LjUgNjUuMDE5NUg2My43NUwyOC43NSAxNS4wMTk1SDIyLjVMMzEuMjM2MyAyNy41WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJTb3VuZE9mZkljb24gPSB7IG9uRGFyazogZ2V0UGxheWVyU291bmRPZmYoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyU291bmRPZmYoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0T3Blbkljb24gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNDhcIiBoZWlnaHQ9XCI0OFwiIHZpZXdCb3g9XCIwIDAgNDggNDhcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMTQuMDgyMSA5Ljg0MzI4QzE0LjA4MjEgMTAuODg5NSAxNC44NDUyIDExLjY3IDE1LjkwNjkgMTEuNjdIMTcuMDg0N0wzNi4yMjczIDExLjMyMTJMMzIuMTk2MSAxNS4xNTcyTDEzLjQxODUgMzMuOTA2NkMxMy4wNTM2IDM0LjI1NTMgMTIuODg3NyAzNC43MDM3IDEyLjg4NzcgMzUuMTg1M0MxMi44ODc3IDM2LjMxNDUgMTMuNjUwOCAzNy4xMjgyIDE0Ljc3ODggMzcuMTI4MkMxNS4yOTMxIDM3LjEyODIgMTUuNzQxIDM2LjkyODkgMTYuMTA1OSAzNi41ODAyTDM0Ljg2NyAxNy44MTQyTDM4LjY4MjQgMTMuNzYyM0wzOC4zMzQgMzIuOTQzNFYzNC4yMzg3QzM4LjMzNCAzNS4yODQ5IDM5LjA5NzEgMzYuMDgyIDQwLjE1ODggMzYuMDgyQzQxLjIyMDUgMzYuMDgyIDQyLjAwMDIgMzUuMzAxNSA0Mi4wMDAyIDM0LjIzODdWMTEuMDIyM0M0Mi4wMDAyIDkuMTEyNjEgNDAuODg4NyA4IDM4Ljk4MSA4TDE1LjkwNjkgOEMxNC44NjE4IDggMTQuMDgyMSA4Ljc4MDQ5IDE0LjA4MjEgOS44NDMyOFpcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMub3Blbkljb24gPSB7IG9uRGFyazogZ2V0T3Blbkljb24oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0T3Blbkljb24oY29sb3Jfb25MaWdodCkgfVxuXG5cblxuXG5cIlwiXCI8c3ZnIHdpZHRoPVwiNDhcIiBoZWlnaHQ9XCI0OFwiIHZpZXdCb3g9XCIwIDAgNDggNDhcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMzggMTVMMTUgMzguNDI0MUwxMS41NzYyIDM1TDM1IDEySDE0VjhINDJWMzZIMzhWMTVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIiIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5cbmNsYXNzIGV4cG9ydHMuUGxheWVyU2xpZGVyIGV4dGVuZHMgU2xpZGVyQ29tcG9uZW50XG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRAdmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJzbGlkZXJWaWV3XCJcblx0XHRcdHdpZHRoOiAyNjAgKiAyLCBoZWlnaHQ6IDU2ICogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC4yNSlcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxOCAqIDJcblx0XHRcblx0XHRAdmlldy5kcmFnZ2FibGUuZW5hYmxlZCA9IHRydWVcblx0XHRAdmlldy5kcmFnZ2FibGUuc3BlZWRYID0gMFxuXHRcdEB2aWV3LmRyYWdnYWJsZS5zcGVlZFkgPSAwXG5cdFx0QHZpZXcuZHJhZ2dhYmxlLnByb3BhZ2F0ZUV2ZW50cyA9IGZhbHNlXG5cblxuXG5cdFx0QHBsYXlCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB2aWV3LCBuYW1lOiBcInBsYXlCdXR0b25cIlxuXHRcdFx0d2lkdGg6IDQwICogMiwgaGVpZ2h0OiA0MCAqIDJcblx0XHRcdHg6IDEyICogMlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRhc3NldDogU1ZHLnBsYXllclBhdXNlSWNvblxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0QHBsYXlCdXR0b24uc3RhdGVzID1cblx0XHRcdFwicGxheWluZ1wiOiB7IGFzc2V0OiBTVkcucGxheWVyUGF1c2VJY29uIH1cblx0XHRcdFwicGF1c2VkXCI6IHsgYXNzZXQ6IFNWRy5wbGF5ZXJQbGF5SWNvbiB9XG5cdFx0QHBsYXlCdXR0b24uc3RhdGVTd2l0Y2goXCJwbGF5aW5nXCIpXG5cdFx0XG5cdFx0XG5cblx0XHRAc291bmRCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogNDAgKiAyLCBoZWlnaHQ6IDQwICogMlxuXHRcdFx0eDogKDEyICsgNDAgKyA4KSAqIDJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0YXNzZXQ6IFNWRy5wbGF5ZXJTb3VuZEljb25cblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEBzb3VuZEJ1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0XCJzb3VuZFwiOiB7IGFzc2V0OiBTVkcucGxheWVyU291bmRJY29uIH1cblx0XHRcdFwibXV0ZWRcIjogeyBhc3NldDogU1ZHLnBsYXllclNvdW5kT2ZmSWNvbiB9XG5cdFx0QHNvdW5kQnV0dG9uLnN0YXRlU3dpdGNoKFwibXV0ZWRcIilcblx0XHRcblxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAcGFyZW50ID0gQHZpZXdcblx0XHRAbmFtZSA9IFwidmlkZW9TbGlkZXJcIlxuXHRcdFxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0QHdpZHRoID0gQHZpZXcud2lkdGggLSAoKDEyICsgNDAgKyA4ICsgNDAgKyAxNikgKyAyMCkgKiAyXG5cdFx0QGhlaWdodCA9IDQgKiAyXG5cdFx0QHggPSAoMTIgKyA0MCArIDggKyA0MCArIDE2KSAqIDJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXHRcdEBrbm9iU2l6ZSA9IDI0ICogMlxuXHRcdFxuXHRcdCMgMTIgKyA0MCArIDggKyA0MCArIDE2ICsgZmxleCArIDIwXG5cblx0XHRAc2xpZGVyT3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4wNSlcIlxuXHRcdCMgQHNsaWRlck92ZXJsYXkuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIlxuXHRcdEBzbGlkZXJPdmVybGF5LndpZHRoID0gQHdpZHRoXG5cdFx0QHNsaWRlck92ZXJsYXkuaGVpZ2h0ID0gNCAqIDJcblx0XHRAc2xpZGVyT3ZlcmxheS54ID0gMFxuXHRcdEBzbGlkZXJPdmVybGF5LnkgPSAwXG5cdFx0QHNsaWRlck92ZXJsYXkuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFxuXHRcdEBmaWxsLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIlxuXHRcdEBmaWxsLm9wYWNpdHkgPSAwLjNcblx0XHRcblx0XHRAa25vYi5iYWNrZ3JvdW5kQ29sb3IgPSBcIm51bGxcIlxuXHRcdEBrbm9iLm9wYWNpdHkgPSAxXG5cdFx0QGtub2IuZHJhZ2dhYmxlLm1vbWVudHVtID0gZmFsc2Vcblx0XHRAa25vYi5kcmFnZ2FibGUucHJvcGFnYXRlRXZlbnRzID0gZmFsc2Vcblx0XHRAa25vYi5zaGFkb3dDb2xvciA9IG51bGxcblx0XHRAa25vYi5zaGFkb3dZID0gMFxuXHRcdFxuXHRcdGtub2JDdXJzb3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGtub2Jcblx0XHRcdHdpZHRoOiA0ICogMiwgaGVpZ2h0OiAzMiAqIDJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2RkZFwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQgKiAyXG5cdFx0XG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub24gRXZlbnRzLlRvdWNoU3RhcnQsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRsYXllci52YWx1ZSA9IFV0aWxzLm1vZHVsYXRlKGV2ZW50LnBvaW50LngsIFswLCBAc2xpZGVyT3ZlcmxheS53aWR0aF0sIFswLCAxXSwgdHJ1ZSlcblx0XHRcblx0XHRcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdFxuXHRIb3ZlcjogPT5cbiMgXHRcdEBvcGFjaXR5ID0gMVxuXHRIb3Zlck9mZjogPT5cbiMgXHRcdEBvcGFjaXR5ID0gMC41XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdHVwZGF0ZUZvclNjYWxlRG93bjogKCkgLT5cblx0XHRAdmlldy53aWR0aCA9IDgwMCAqIDJcblx0XHRAdmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0QHZpZXcueSA9IEFsaWduLmJvdHRvbSgtMzIgKiAyKVxuXG5cdFx0QHdpZHRoID0gQHZpZXcud2lkdGggLSAoKDEyICsgNDAgKyA4ICsgNDAgKyAxNikgKyAyMCkgKiAyXG5cdFx0QGhlaWdodCA9IDQgKiAyXG5cblx0XHQjIHByaW50IEBzbGlkZXJPdmVybGF5LndpZHRoXG5cdFx0QHNsaWRlck92ZXJsYXkud2lkdGggPSBAd2lkdGhcblx0XHRAc2xpZGVyT3ZlcmxheS5oZWlnaHQgPSA0ICogMlxuXHRcdEBzbGlkZXJPdmVybGF5LnggPSAwXG5cdFx0QHNsaWRlck92ZXJsYXkueSA9IDBcblx0XHQjIHByaW50IEBzbGlkZXJPdmVybGF5LndpZHRoXG5cblx0XHQjIEBwbGF5ZXJTbGlkZXIud2lkdGggPSBAd2lkdGggLSAzMDAgKiAyICogMlxuXHRcdCMgQHBsYXllclNsaWRlci54ID0gQWxpZ24ubGVmdCgzMDAgKiAyKVxuXHRcdCMgQHBsYXllclNsaWRlci55ID0gQWxpZ24uYm90dG9tKC0zMiAqIDIpIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG4jIFRleHQsIEJ1dHRvblxuXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIk51bml0b1wiLCA4MDApXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIlJhbGV3YXlcIiwgNzAwKVxuZm9udEF2ZXJpYSA9IFwiUmFsZXdheVwiXG5cbmNsYXNzIFRleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHR3ZWlnaHQ6IDcwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjRcbiMgXHRcdFx0dGV4dE92ZXJmbG93OiBcImVsbGlwc2lzXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0eWxlID1cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogXCJSYWxld2F5LCAnUFQgU2FucycsICdIZWx2ZXRpY2EnLCAnVGFob21hJywgc2Fucy1zZXJpZjtcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiOiA3MDBcblx0XHRcdFwiLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1vei1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1zLWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcblxuXG5cblxuXG5jbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDAuNSwgaG92ZXI6IDAuOCB9XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuXHRcdEB1cGRhdGVUdXBsZShAdHVwbGUpXG5cdFxuXHRcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUuaG92ZXJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUubm9ybWFsXG5cdFxuXHR1cGRhdGVUdXBsZTogKG5ld1R1cGxlKSA9PlxuXHRcdEB0dXBsZSA9IG5ld1R1cGxlXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3ZlclxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU91dFxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRAZGVmaW5lICd0dXBsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50dXBsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudHVwbGUgPSB2YWx1ZVxuXG5cblxuXG4jIEJ1dHRvbjogU1ZHXG5cbmNsYXNzIFNWR0J1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0YXNzZXQ6IG51bGxcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRhdXRvU2l6ZTogZmFsc2Vcblx0XHRcblx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcblx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcblx0QGRlZmluZSAnYXNzZXQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFzc2V0ID0gdmFsdWVcblx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cblx0XHRcdFx0XCJvbkxpZ2h0XCI6IHsgc3ZnOiB2YWx1ZS5vbkxpZ2h0IH1cblx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcblx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cblx0XHRAc3ZnU2hhcGUud2lkdGggPSBAd2lkdGhcblx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuY2xhc3MgQ29weUJ1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIucnVcIlxuXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG5cdFx0QGFyZWEgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAYXJlYS5wYXJlbnQgPSBAXG5cdFxuXHRcblx0QGRlZmluZSAnbGluaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcblx0dXBkYXRlOiAobGluaykgPT5cblx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcblx0Y29weUhhbmRsZXI6ID0+XG5cdFx0dGV4dERpdiA9IEBhcmVhLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3B5dGV4dGFyZWEtY2xhc3MnKVxuXHRcdHRleHREaXYuZm9jdXMoKVxuXHRcdHRleHREaXYuc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcblx0XHRcblx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG5cdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG5cdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHRleHQgPSBvcmlnaW5UaXRsZVxuXG5cblxuXG4jIEJ1dHRvbjogQ29weVxuXG5jbGFzcyBMaW5rQnV0dG9uIGV4dGVuZHMgU1ZHQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcdGJvcmRlcldpZHRoOiAxICogMlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMCAqIDJcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcdFxuXHRcdFxuXHRcdEB0aW50QnV0dG9uRml4ID0gbmV3IExheWVyXG5cdFx0XHRoZWlnaHQ6IDEyMCAqIDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEBidXR0b25UZXh0ID0gbmV3IFRleHRcblx0XHRcdGZvbnRTaXplOiAzMiAqIDJcblx0XHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHRoZWlnaHQ6IDYwICogMlxuXHRcdFxuXHRcdEBidXR0b25JY29uID0gbmV3IFNWR0xheWVyXG5cdFx0XHR3aWR0aDogMjQgKiAyLCBoZWlnaHQ6IDI0ICogMlxuXHRcdFx0c3ZnOiBTVkcub3Blbkljb24ub25MaWdodFxuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAYnV0dG9uVGV4dC50ZXh0ID0gQHRleHRcblx0XHRAdGV4dCA9IFwiXCJcblxuXHRcdEB0aW50QnV0dG9uRml4LnBhcmVudCA9IEBwYXJlbnRcblx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcblx0XHRAdGludEJ1dHRvbkZpeC55ID0gQWxpZ24udG9wXG5cdFx0XG5cdFx0QHBhcmVudCA9IEB0aW50QnV0dG9uRml4XG5cdFx0QHkgPSBBbGlnbi50b3AoMzAgKiAyKVxuXHRcdEBoZWlnaHQgPSA2MCAqIDJcblxuXHRcdEBidXR0b25UZXh0LnBhcmVudCA9IEBcblx0XHRAYnV0dG9uVGV4dC54ID0gMTYgKiAyXG5cdFx0QGJ1dHRvblRleHQueSA9IDkgKiAyXG5cblx0XHRAYnV0dG9uSWNvbi5wYXJlbnQgPSBAXG5cdFx0QGJ1dHRvbkljb24ueCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgMTYgKiAyXG5cdFx0QGJ1dHRvbkljb24ueSA9IEFsaWduLmNlbnRlcigzICogMilcblxuXHRcdEB3aWR0aCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgQGJ1dHRvbkljb24ud2lkdGggKyAxNiAqIDIgKyAxNiAqIDJcblx0XHRAdGludEJ1dHRvbkZpeC53aWR0aCA9IEB3aWR0aCArIDMwICogMiArIDE2ICogMlxuXG5cdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG5cdFx0QHggPSBBbGlnbi5yaWdodCgtMzAgKiAyKVxuXHRcdFxuXHRcblxuXHRAZGVmaW5lICdsaW5rJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGluayA9IHZhbHVlXG5cdFxuXHRzZXRDb2xvcjogKGNvbG9yID0gbnVsbCkgPT5cblx0XHRpZiBjb2xvciA9PSBudWxsIHRoZW4gcmV0dXJuXG5cdFx0QHRpbnRCdXR0b25GaXguYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1RleHQsIFRleHRCdXR0b24sIFNWR0J1dHRvbiwgQ29weUJ1dHRvbiwgTGlua0J1dHRvbn1cblxuXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQWVBQTtBRENBLElBQUEsb0VBQUE7RUFBQTs7OztBQUFBLEdBQUEsR0FBTSxPQUFBLENBQVEsT0FBUjs7QUFNTixVQUFBLEdBQWE7O0FBRVA7OztFQUNRLGNBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLFVBQUEsRUFBWSxVQUFaO01BQ0EsUUFBQSxFQUFVLEVBRFY7TUFFQSxNQUFBLEVBQVEsR0FGUjtNQUdBLEtBQUEsRUFBTyxPQUhQO01BSUEsTUFBQSxFQUFRLEVBSlI7TUFLQSxhQUFBLEVBQWUsR0FMZjtNQU1BLGFBQUEsRUFBZSxHQU5mO0tBREQ7SUFVQSxzQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxLQUFELEdBQ0M7TUFBQSxhQUFBLEVBQWUsd0RBQWY7TUFDQSxhQUFBLEVBQWUsR0FEZjtNQUVBLCtCQUFBLEVBQWlDLDZDQUZqQztNQUdBLDRCQUFBLEVBQThCLDZDQUg5QjtNQUlBLDJCQUFBLEVBQTZCLDZDQUo3QjtNQUtBLHVCQUFBLEVBQXlCLDZDQUx6Qjs7RUFmVzs7OztHQURLOztBQTRCYjs7O0VBQ1Esb0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLEtBQUEsRUFBTztRQUFFLE1BQUEsRUFBUSxHQUFWO1FBQWUsS0FBQSxFQUFPLEdBQXRCO09BQVA7TUFDQSxPQUFBLEVBQVMsSUFEVDtLQUREO0lBS0EsNENBQU0sSUFBQyxDQUFBLE9BQVA7SUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTO01BQUEsTUFBQSxFQUFRLFNBQVI7O0lBRVQsSUFBQyxDQUFDLFdBQUYs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
