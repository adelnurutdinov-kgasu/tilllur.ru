require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"PCButtons":[function(require,module,exports){
var CopyButton, LinkButton, PreviewButton, SVG, SVGButton, Text, TextButton, fontAveria,
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

PreviewButton = (function(superClass) {
  extend(PreviewButton, superClass);

  function PreviewButton(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      tuple: {
        normal: 1.0,
        hover: 0.8
      }
    });
    PreviewButton.__super__.constructor.call(this, this.options);
    this.removeAllListeners();
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
  }

  PreviewButton.prototype.Hover = function() {
    return this.opacity = 1.0;
  };

  PreviewButton.prototype.HoverOff = function() {
    return this.opacity = 0.8;
  };

  return PreviewButton;

})(Text);

module.exports = {
  Text: Text,
  TextButton: TextButton,
  SVGButton: SVGButton,
  CopyButton: CopyButton,
  LinkButton: LinkButton,
  PreviewButton: PreviewButton
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
    var canvasBackgroundLayer, canvasLayer, legacyScroll;
    this.options = options != null ? options : {};
    this.openURLHome = bind(this.openURLHome, this);
    this.openURL = bind(this.openURL, this);
    this.restartHandler = bind(this.restartHandler, this);
    this.changeScale = bind(this.changeScale, this);
    this.initScale = bind(this.initScale, this);
    this.updateSize = bind(this.updateSize, this);
    canvasBackgroundLayer = new BackgroundLayer({
      name: "backgroundLayer"
    });
    canvasLayer = new Layer({
      name: "canvas",
      width: Screen.width,
      height: Screen.height,
      custom: {
        localScroll: null
      }
    });
    canvasLayer.states = {
      "window": {
        backgroundColor: "#000"
      },
      "fullscreen": {
        backgroundColor: "#222"
      }
    };
    legacyScroll = new ScrollComponent({
      parent: canvasLayer,
      name: "grid",
      width: 1400 * 2,
      height: 900 * 2,
      scrollVertical: false,
      scrollHorizontal: false,
      backgroundColor: null,
      ignoreEvents: true
    });
    legacyScroll.states = {
      "window": {
        scale: 1
      },
      "fullscreen": {
        scale: 1
      }
    };
    _.defaults(this.options, {
      canvas: canvasLayer,
      grid: legacyScroll,
      backgroundLayer: canvasBackgroundLayer,
      parent: legacyScroll.content,
      width: legacyScroll.width,
      height: legacyScroll.height,
      scrollVertical: false,
      scrollHorizontal: true,
      presentationTitle: "Untitled"
    });
    Slider0.__super__.constructor.call(this, this.options);
    this.content.draggable.propagateEvents = false;
    Framer.Extras.Preloader.disable();
    Framer.Extras.Hints.disable();
    document.body.style.cursor = "auto";
    this.initScale();
    this.updateSize();
    this.backgroundLayer.on("change:size", (function(_this) {
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

  Slider0.define('backgroundLayer', {
    get: function() {
      return this.options.backgroundLayer;
    },
    set: function(value) {
      return this.options.backgroundLayer = value;
    }
  });

  Slider0.prototype.updateSize = function() {
    return this.initScale(this.grid.states.current.name);
  };

  Slider0.prototype.initScale = function(forState) {
    var scaleX, scaleY;
    if (forState == null) {
      forState = "window";
    }
    this.canvas.width = Screen.width;
    this.canvas.height = Screen.height;
    scaleX = (Screen.width - 20) / this.grid.width;
    scaleY = (Screen.height - 120) / this.grid.height;
    this.grid.states.window.scale = Math.min(scaleX, scaleY);
    scaleX = Screen.width / this.grid.width;
    scaleY = Screen.height / this.grid.height;
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
      } else if (event.code === "KeyR") {
        return localScroll.restartButton.emit(Events.Tap);
      } else if (event.code === "KeyF") {
        if (!localScroll.isGrid()) {
          return localScroll.fullscreenButton.emit(Events.Tap);
        } else {
          localScroll.pinchToGrid();
          return Utils.delay(0.36, (function(_this) {
            return function() {
              return localScroll.fullscreenButton.emit(Events.Tap);
            };
          })(this));
        }
      } else if (event.code === "KeyA") {
        if (localScroll.grid.states.current.name === "window") {
          return localScroll.pinchToGrid();
        } else {
          localScroll.fullscreenButton.emit(Events.Tap);
          return Utils.delay(0.36, (function(_this) {
            return function() {
              return localScroll.pinchToGrid();
            };
          })(this));
        }
      } else if (event.code === "Escape") {
        if (localScroll.grid.states.current.name === "fullscreen") {
          return localScroll.fullscreenButton.emit(Events.Tap);
        } else if (localScroll.isGrid()) {
          return localScroll.pinchToGrid();
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
    this.pauseVideos = bind(this.pauseVideos, this);
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

  Slider4.prototype.pauseVideos = function() {
    var currentVideoSlide, i, len, ref, results;
    ref = this.videoSlides;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      currentVideoSlide = ref[i];
      results.push(currentVideoSlide.pause());
    }
    return results;
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


},{"PCSlider4":"PCSlider4"}],"PCSliderGrid":[function(require,module,exports){
var Buttons, PreviewButton, Slider5, TextButton,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Slider5 = require("PCSlider5").Slider5;

Buttons = require("PCButtons");

TextButton = Buttons.TextButton;

PreviewButton = Buttons.PreviewButton;

exports.SliderGrid = (function(superClass) {
  extend(SliderGrid, superClass);

  function SliderGrid(options) {
    var grid2;
    this.options = options != null ? options : {};
    this.pinchToSlide = bind(this.pinchToSlide, this);
    this.pinchToGrid = bind(this.pinchToGrid, this);
    this.isGrid = bind(this.isGrid, this);
    this.getGridScale = bind(this.getGridScale, this);
    this.getGridGap = bind(this.getGridGap, this);
    this.gridSize = bind(this.gridSize, this);
    this.updateSize = bind(this.updateSize, this);
    this.updatePreview = bind(this.updatePreview, this);
    this.addPreview = bind(this.addPreview, this);
    this.leadZero = bind(this.leadZero, this);
    grid2 = new ScrollComponent({
      name: "grid2",
      width: 1400 * 2,
      height: 900 * 2,
      scrollVertical: true,
      scrollHorizontal: false,
      backgroundColor: null,
      mouseWheelEnabled: true,
      backgroundColor: "000"
    });
    grid2.states = {
      "shown": {
        opacity: 1,
        y: Screen.height
      },
      "hidden": {
        opacity: 0,
        y: Screen.height
      }
    };
    grid2.stateSwitch("hidden");
    _.defaults(this.options, {
      grid2: grid2,
      lastSlideSelectedIndex: 0,
      gridButtons: []
    });
    SliderGrid.__super__.constructor.call(this, this.options);
    grid2.parent = this.canvas;
    this.canvas.custom.localScroll = this;
    try {
      grid.placeBefore(this.topView);
    } catch (error) {}
    this.content.on("change:children", function() {
      var localScroll;
      localScroll = this.parent;
      localScroll.addPreview(localScroll.content.children.length);
      return localScroll.updatePreview();
    });
  }

  SliderGrid.define('lastSlideSelectedIndex', {
    get: function() {
      return this.options.lastSlideSelectedIndex;
    },
    set: function(value) {
      return this.options.lastSlideSelectedIndex = value;
    }
  });

  SliderGrid.define('gridButtons', {
    get: function() {
      return this.options.gridButtons;
    },
    set: function(value) {
      return this.options.gridButtons = value;
    }
  });

  SliderGrid.define('grid2', {
    get: function() {
      return this.options.grid2;
    },
    set: function(value) {
      return this.options.grid2 = value;
    }
  });

  SliderGrid.prototype.leadZero = function(num, size) {
    var s;
    if (size == null) {
      size = 2;
    }
    s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  };

  SliderGrid.prototype.addPreview = function(imageIndex) {
    var index, previewLayer;
    index = imageIndex - 1;
    previewLayer = new PreviewButton({
      text: "",
      parent: this.grid2.content,
      width: 280,
      height: 180,
      borderRadius: 8,
      backgroundColor: "222",
      image: "images/page" + (this.leadZero(imageIndex)) + "@preview.png",
      custom: {
        index: index
      }
    });
    previewLayer.states = {
      "shown": {
        opacity: 0.8
      },
      "hidden": {
        opacity: 0
      }
    };
    previewLayer.stateSwitch("hidden");
    this.gridButtons.push(previewLayer);
    return previewLayer.onTap(function() {
      var localCanvas, localScroll;
      localCanvas = this.parent.parent.parent;
      localScroll = localCanvas.custom.localScroll;
      localScroll.lastSlideSelectedIndex = index;
      return localScroll.pinchToSlide();
    });
  };

  SliderGrid.prototype.updatePreview = function() {
    var i, index, item, len, pH, pW, ref;
    ref = this.grid2.content.children;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      item = ref[index];
      pW = (this.grid2.width - this.getGridGap() * (this.gridSize() + 1)) / this.gridSize();
      pH = pW * (900 / 1400);
      item.width = pW;
      item.height = pH;
      item.x = index % this.gridSize() * (pW + this.getGridGap()) + this.getGridGap();
      item.y = (index - index % this.gridSize()) / this.gridSize() * (pH + this.getGridGap()) + this.getGridGap();
    }
    return this.grid2.updateContent();
  };

  SliderGrid.prototype.updateSize = function() {
    var nextState;
    SliderGrid.__super__.updateSize.apply(this, arguments);
    nextState = this.grid2.states.current.name;
    this.grid2.width = this.canvas.width;
    this.grid2.height = this.canvas.height - 58;
    this.grid2.states.shown.y = 58;
    this.grid2.states.hidden.y = Screen.height + 1000;
    this.grid2.stateSwitch(nextState);
    return this.updatePreview();
  };

  SliderGrid.prototype.gridSize = function() {
    if (this.canvas.width < 740) {
      return 2;
    } else if (this.canvas.width < 1280) {
      return 3;
    } else if (this.canvas.width < 1600) {
      return 4;
    } else if (this.canvas.width < 2000) {
      return 5;
    }
    return 6;
  };

  SliderGrid.prototype.getGridGap = function() {
    return 8;
  };

  SliderGrid.prototype.getGridScale = function() {
    var ws;
    ws = (this.width - this.getGridGap() * (this.gridSize() - 1)) / this.gridSize();
    return ws / this.width;
  };

  SliderGrid.prototype.isGrid = function() {
    return this.grid2.states.current.name === "shown";
  };

  SliderGrid.prototype.pinchToGrid = function() {
    var i, index, item, len, ref;
    if (this.isGrid()) {
      return this.pinchToSlide();
    } else {
      ref = this.gridButtons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        item = ref[index];
        if (index === this.lastSlideSelectedIndex) {
          item.stateSwitch("shown");
        } else {
          item.stateSwitch("hidden");
          item.animate("shown", {
            curve: Spring({
              damping: 1
            }),
            time: 0.5,
            delay: 0.12 + 0.02 * Math.abs(this.lastSlideSelectedIndex - index)
          });
        }
      }
      this.grid2.stateSwitch("shown");
      try {
        this.grid2.scrollToPoint({
          x: 0,
          y: this.gridButtons[this.lastSlideSelectedIndex].y - this.gridButtons[this.lastSlideSelectedIndex].height / 2
        }, false);
      } catch (error) {}
      return this.pauseVideos();
    }
  };

  SliderGrid.prototype.pinchToSlide = function() {
    this.grid2.stateSwitch("hidden");
    return this.snapToPage(this.content.children[this.lastSlideSelectedIndex], false);
  };

  return SliderGrid;

})(Slider5);


},{"PCButtons":"PCButtons","PCSlider5":"PCSlider5"}],"PCSliderPinch":[function(require,module,exports){
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
    this.name = this.name + ": " + video;
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
var FixPresentationExport, SliderGrid,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SliderGrid = require("PCSliderGrid").SliderGrid;

FixPresentationExport = (function(superClass) {
  extend(FixPresentationExport, superClass);

  function FixPresentationExport() {
    return FixPresentationExport.__super__.constructor.apply(this, arguments);
  }

  return FixPresentationExport;

})(SliderGrid);

exports.Presentation = (function(superClass) {
  extend(Presentation, superClass);

  function Presentation() {
    return Presentation.__super__.constructor.apply(this, arguments);
  }

  return Presentation;

})(FixPresentationExport);


},{"PCSliderGrid":"PCSliderGrid"}],"PreviewComponentAssets":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QcmVzZW50YXRpb25Db21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZS5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlclBpbmNoLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyR3JpZC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjUuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXI0LmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjIuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIxLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlQ2hhbmdlci5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NWRy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1BsYXllclNsaWRlci5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ0J1dHRvbnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIFByZXZpZXcgQ29tcG9uZW50XG5Bc3NldHMgPSByZXF1aXJlIFwiUHJldmlld0NvbXBvbmVudEFzc2V0c1wiXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5sb2NhbENvbG9ycyA9XG5cdGJnX2NvbG9yX29uTGlnaHQ6IFwiI2VlZVwiXG5cdGJnX2NvbG9yX29uRGFyazogXCIjMjIyXCJcblx0Y29udGVudF9jb2xvcl9vbkxpZ2h0OiBcIiMwMDBcIlxuXHRjb250ZW50X2NvbG9yX29uRGFyazogXCIjRkZGXCJcblxudGhlbWUgPVxuXHRiZ19jb2xvcjogbG9jYWxDb2xvcnMuYmdfY29sb3Jfb25EYXJrXG5cdGNvbnRlbnRfY29sb3I6IGxvY2FsQ29sb3JzLmNvbnRlbnRfY29sb3Jfb25EYXJrXG5cblxuIyBMb2dvXG5cbmNsYXNzIExvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKGxvY2FsQ29sb3JzLmNvbnRlbnRfY29sb3Jfb25EYXJrKVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cblxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cbiMgUHJldmlld1xuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlldzogbnVsbFxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBcIjIwOjIyXCJcblx0XHRcdG5hbWU6IFwiUHJldmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2Vcblx0XHRcdFxuXHRcdFx0dmlzaWJsZTogdHJ1ZVxuXHRcdFx0dG9wVGhlbWU6IFwiZGFya1wiXG5cdFx0XHRib3R0b21UaGVtZTogXCJkYXJrXCJcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3Zpc2libGUnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd0b3BUaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50b3BUaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50b3BUaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdib3R0b21UaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhciA9IHZhbHVlXG5cdFxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcIm5vcm1hbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJmaWxsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdHN0YXRlU3dpdGNoVG9Ob3JtYWw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFxuXG5cdFxuXHRcblx0XG5cdFxuXHRnZXRMb2NhdGlvbkRhdGE6ICgpID0+XG5cdFx0cXVlcnlBcnJheSA9IGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblxuXHRcdGZvciBpdGVtIGluIHF1ZXJ5QXJyYXlcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcInNjYWxlXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwiZmlsbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHRcdFx0ZWxzZSBpZiB2YWx1ZVBhcnQgPT0gXCJub3JtYWxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvTm9ybWFsKClcblx0XHRcdFxuXHRcblx0XG5cdHVwZGF0ZVNjYWxlU3RhdGU6ICgpID0+XG5cdFx0c2NhbGVYID0gKENhbnZhcy53aWR0aCAtIDExMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoQ2FudmFzLmhlaWdodCAtIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlcy5maWxsLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFxuXHRzZXREZXNrdG9wU2NhbGVNb2RlOiAoZm9yU3RhdGUgPSBcIm5vcm1hbFwiKSA9PlxuXHRcdEB1cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRpbml0U3RhdGUgPSBmb3JTdGF0ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcInNjYWxlXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwiZmlsbFwiIHRoZW4gaW5pdFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdFx0ZWxzZSBpbml0U3RhdGUgPSBcIm5vcm1hbFwiXG5cdFx0XG5cdFx0c2hvdWxkU2hvd0J1dHRvbiA9IHRydWVcblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJidXR0b25cIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJvZmZcIiB0aGVuIHNob3VsZFNob3dCdXR0b24gPSBmYWxzZVxuXHRcdFx0XHRlbHNlIGlmIHZhbHVlUGFydCA9PSBcImZhbHNlXCIgdGhlbiBzaG91bGRTaG93QnV0dG9uID0gZmFsc2Vcblx0XHRcblx0XHRzaG91bGRTaG93TG9nbyA9IHRydWVcblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJsb2dvXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwib2ZmXCIgdGhlbiBzaG91bGRTaG93TG9nbyA9IGZhbHNlXG5cdFx0XHRcdGVsc2UgaWYgdmFsdWVQYXJ0ID09IFwiZmFsc2VcIiB0aGVuIHNob3VsZFNob3dMb2dvID0gZmFsc2Vcblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRAc3RhdGVTd2l0Y2goaW5pdFN0YXRlKVxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoZm9yU3RhdGUpID0+XG5cdFx0aWYgVXRpbHMuaXNGcmFtZXJTdHVkaW8oKSB0aGVuIHJldHVyblxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5ydVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUgPSBuZXcgTGF5ZXJcblx0XHRcdHNpemU6IDQ4LCBib3JkZXJSYWRpdXM6IDQ4XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzIpLCB5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMSlcIlxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0cHJldmlldzogQFxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJ1dHRvblNjYWxlXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0c2l6ZTogMjgsIGJvcmRlclJhZGl1czogMjJcblx0XHRcdHg6IDEwLCB5OiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25TY2FsZS5vblRhcCAtPlxuXHRcdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBuZXh0U3RhdGUgPSBcIm5vcm1hbFwiIGVsc2UgbmV4dFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY2hpbGRyZW5bMF0uc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGN1c3RvbS5wcmV2aWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUgPSAoYnV0dG9uTGF5ZXIpID0+XG5cdFx0XHRsb2NhbEJ1dHRvbiA9IGJ1dHRvbkxheWVyXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueCA9IEFsaWduLnJpZ2h0KC0zMilcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnkgPSBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplKGJ1dHRvblNjYWxlKVxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2Vcblx0XHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRcdEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblx0XG5cdFxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblx0XG5cdFxuXG5cdFxuXHRcblx0dXBkYXRlUHJldmlld09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsUHJldmlldyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XG5cdFxuXHRcblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IHRoZW1lLmJnX2NvbG9yXG5cdFx0QGNyZWF0ZUJhcnMoKVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cdFx0cHJldmlld0NhbnZhcyA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29udGVudF9jb2xvciwgbmFtZTogXCIuaGlkZGVuUHJldmlld0NhbnZhc1wiXG5cdFx0XG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBvcmlnaW5ZID0gMC41XG5cdFx0QG9yaWdpblggPSAwLjVcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpXG5cdFx0XHRcblx0XHRcdGlmIEBzY3JlZW5TaXplKDM3NSwgNzY4KSBvciBAc2NyZWVuU2l6ZSgzOTAsIDc5Nykgb3IgQHNjcmVlblNpemUoNDE0LCA4NTIpIG9yIEBzY3JlZW5TaXplKDQyOCwgODc5KVxuXHRcdFx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRcdGVsc2UgQHNldEN1c3RvbVByZXZpZXcoKVxuXHRcdFxuIyBcdFx0ZWxzZSBpZiBAdmlldy53aWR0aCA9PSAzNjBcblx0XHRcdFxuXHRcdGVsc2UgQHNldEN1c3RvbVByZXZpZXcoKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHNldEN1c3RvbVByZXZpZXc6ICgpID0+XG5cdFx0QHkgPSBBbGlnbi50b3AoLTIwKVxuXHRcdEBvcmlnaW5ZID0gMFxuXHRcdFxuXHRcdHNIID0gKFNjcmVlbi5oZWlnaHQgKyA0MCkgLyBAaGVpZ2h0XG5cdFx0QHNjYWxlID0gTWF0aC5taW4oU2NyZWVuLndpZHRoIC8gQHdpZHRoLCBzSClcblx0XG5cdFxuXHRsb2dTaXplOiAoKSA9PlxuXHRcdG5ldyBUZXh0TGF5ZXIgeyB0ZXh0OiBcIiN7U2NyZWVuLndpZHRofXgje1NjcmVlbi5oZWlnaHR9XCIsIHk6IEFsaWduLmNlbnRlciB9XG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdHRvcEJhciA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIodG9wQmFyKSBcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcilcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6ICh0ZW1wKSA9PlxuXHRcdHRlbXAuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIgbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IHRlbXAsIHdpZHRoOiB0ZW1wLndpZHRoIC0gMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24udG9wKDYpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyKDEpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAdG9wVGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24uY2VudGVyKC0xKVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRvcFRoZW1lXVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAdG9wVGhlbWVdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFx0XG5cdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRob21lSW5kaWNhdG9yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bib3R0b21UaGVtZV0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cdFxuXG4iLCJcbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG4iLCJcbiMge1NsaWRlcjB9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMFwiIFx0IyBTY2FsZSAvIFVSTFxuIyB7U2xpZGVyMX0gPSByZXF1aXJlIFwiUENTbGlkZXIxXCJcdCMgUGFuZWxzXG4jIHtTbGlkZXIyfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjJcIlx0IyBDcmVhdGUgU2xpZGVcbiMge1NsaWRlcjN9ID0gcmVxdWlyZSBcIlBDU2xpZGVyM1wiXHQjIFNob3J0Y3V0c1xuIyB7U2xpZGVyNH0gPSByZXF1aXJlIFwiUENTbGlkZXI0XCJcdCMgQmFja2dyb3VuZCBQYXVzZSBmb3IgVmlkZW9zXG4jIHtTbGlkZXI1fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjVcIlx0IyBQbGF5aW5nIFZpZGVvXG4jIHtTbGlkZXJQaW5jaH0gPSByZXF1aXJlIFwiUENTbGlkZXJQaW5jaFwiXHQjIFBpbmNoXG57U2xpZGVyR3JpZH0gPSByZXF1aXJlIFwiUENTbGlkZXJHcmlkXCJcdCMgUGluY2hcblxuY2xhc3MgRml4UHJlc2VudGF0aW9uRXhwb3J0IGV4dGVuZHMgU2xpZGVyR3JpZFxuIyBjbGFzcyBGaXhQcmVzZW50YXRpb25FeHBvcnQgZXh0ZW5kcyBTbGlkZXJQaW5jaFxuIyBjbGFzcyBGaXhQcmVzZW50YXRpb25FeHBvcnQgZXh0ZW5kcyBTbGlkZXIwXG5jbGFzcyBleHBvcnRzLlByZXNlbnRhdGlvbiBleHRlbmRzIEZpeFByZXNlbnRhdGlvbkV4cG9ydFxuXG5cblx0XG5cblxuXG4jIHNsaWRlciA9IG5ldyBQcmVzZW50YXRpb24gKHRpdGxlOiBcIkRldmVsb3BtZW50XCIpXG5cbiMgSW1hZ2VzXG4jIHNsaWRlci5zbGlkZSgpLnJhbmRvbUNvbG9yKClcbiMgc2xpZGVyLnNsaWRlKFwiaW1hZ2VzL3RpdGxlJTIwb3ZlcmxheS5wbmdcIilcbiMgc2xpZGVyLnNsaWRlKCkucmFuZG9tQ29sb3IoKS5vdmVybGF5KFwiaW1hZ2VzL3RpdGxlJTIwb3ZlcmxheS5wbmdcIilcblxuXG4jIExpbmtcbiMgc2xpZGVyLnNsaWRlKCkubGluayhcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIilcbiMgc2xpZGVyLnNsaWRlKCkubGluayhcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIiwgXCJMaW5rIFRpdGxlXCIpXG4jIHNsaWRlci5zbGlkZSgpLmxpbmsoXCJodHRwczovL3RpbGxsdXIucnUvZC9xeXZ0a2dqdS9pbmRleC5odG1sXCIsIFwiTGluayBUaXRsZVwiLCB0eXBlMSlcblxuXG4jIFZpZGVvIDE0MDB4OTAwIOKAlCBGdWxsc2NyZWVuXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpLm11dGUoZmFsc2UpXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpLmxvb3AoZmFsc2UpXG5cbiMgVmlkZW8gMTQwMHg5MDAg4oCUIEZ1bGxzY3JlZW4gJiBDb250cm9sc1xuIyBzbGlkZXIuZnVsbFZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG5cbiMgVmlkZW8gMTkyMHgxMDgwIOKAlCBDcm9wICYgQ29udHJvbHNcbiMgc2xpZGVyLnZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG5cblxuIyBQcm90b3R5cGVcbiMgc2xpZGVyLnByb3RvdHlwZVNsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L2QvcXl2dGtnanUvaW5kZXguaHRtbFwiKS5zaXplZCgpXG4jIHNsaWRlci5wcm90b3R5cGVTbGlkZShcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIikuc2l6ZWQoMzkwLCA4NDQpXG5cblxuXG5cbiIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHQgPSBCdXR0b25zLlRleHRcblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5MaW5rQnV0dG9uID0gQnV0dG9ucy5MaW5rQnV0dG9uXG5cbntQbGF5ZXJTbGlkZXJ9ID0gcmVxdWlyZShcIlBDUGxheWVyU2xpZGVyXCIpXG5cblxuXG4jIFNsaWRlIHdpdGggSW1hZ2VzXG5cbmNsYXNzIFNsaWRlVGVtcGxhdGUgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Z3JpZERhdGE6IG51bGxcblxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyXG5cdFx0XHRoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdGJvcmRlclJhZGl1czogMTYgKiAyXG5cdFx0XHR0aXRsZTogXCJcIlxuXHRcdFx0aW1hZ2U6IG51bGxcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEB4ID0gKEBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAoQHdpZHRoICsgMTIwKSBcblx0XHRAcGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcblx0XHRAbmFtZSA9IFwic2xpZGUgI3tAcGFyZW50LmNoaWxkcmVuLmxlbmd0aH1cIlxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICd0aXRsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkRGF0YScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkRGF0YVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkRGF0YSA9IHZhbHVlXG5cblxuXG5cdHNvdXJjZTogKGltYWdlKSA9PlxuXHRcdEBpbWFnZSA9IGltYWdlXG5cdFx0cmV0dXJuIEBcblx0XG5cdG92ZXJsYXk6IChpbWFnZSkgPT5cblx0XHR0b3BJbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTQwMCAqIDIsIGhlaWdodDogOTAwICogMlxuXHRcdFx0aW1hZ2U6IGltYWdlXG5cdFx0cmV0dXJuIEBcblx0XG5cdHJhbmRvbUNvbG9yOiAoKSA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBVdGlscy5yYW5kb21Db2xvcigpXG5cdFx0cmV0dXJuIEBcblxuXG5cblxuXG4jIFM6IFNsaWRlIHdpdGggTGlua1xuXG4jIGZmbXBlZyAtaSBpbnB1dC5tcDQgLWM6diBsaWJ4MjY0IC1wcm9maWxlOnYgbWFpbiAtdmYgZm9ybWF0PXl1djQyMHAgLWM6YSBhYWMgLW1vdmZsYWdzICtmYXN0c3RhcnQgb3V0cHV0Lm1wNFxuIyBmZm1wZWcgLWkgb3V0cHV0Lm1wNCAtZmlsdGVyOnYgXCJjcm9wPTE2ODA6MTA4MDoxMjA6MFwiIC1jOmEgY29weSBjcm9wLm1wNFxuXG5cbmNsYXNzIFNsaWRlIGV4dGVuZHMgU2xpZGVUZW1wbGF0ZVxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c2hhcmVMaW5rOiBcIlwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cdFxuXHRAZGVmaW5lICdzaGFyZUxpbmsnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hhcmVMaW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNoYXJlTGluayA9IHZhbHVlXG5cdFxuXHRcblx0bGluazogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCIsIGJ1dHRvblRpdGxlID0gXCJPcGVuXCIsIHR5cGUgPSAwKSA9PlxuXHRcdEBzaGFyZUxpbmsgPSB1cmxcblxuXHRcdEB0aW50QnV0dG9uID0gbmV3IExpbmtCdXR0b25cblx0XHRcdHBhcmVudDogQCwgbmFtZTogXCJsaW5rQnV0dG9uXCJcblx0XHRcdHRleHQ6IGJ1dHRvblRpdGxlXG5cdFx0XHR1cmw6IHVybFxuXHRcdFx0aGFuZGxlcjogQG9wZW5Qcm90b3R5cGVVUkxcblx0XHRcblx0XHRpZiB0eXBlID09IDBcblx0XHRcdEB0aW50QnV0dG9uLmJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHRcdEB0aW50QnV0dG9uLmJvcmRlckNvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMylcIlxuXHRcdGVsc2UgaWYgdHlwZSA9PSAxXG5cdFx0XHRAdGludEJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yNSlcIlxuXHRcdFx0QHRpbnRCdXR0b24uYm9yZGVyQ29sb3IgPSBudWxsXG5cdFxuXHRvcGVuUHJvdG90eXBlVVJMOiAoKSA9PlxuXHRcdHByZXNlbnRhdGlvbiA9IEBwYXJlbnQucGFyZW50XG5cdFx0cHJlc2VudGF0aW9uLm9wZW5VUkwoQHNoYXJlTGluaywgdHJ1ZSlcblxuXG5cblxuXG5cblxuXG5cblxuIyBTOiBUZW1wbGF0ZSAoVmlkZW8pXG4jIE92ZXJyaWRlIFwic291cmNlKClcIlxuXG5jbGFzcyBTaW1wbGVWaWRlb1NsaWRlIGV4dGVuZHMgU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dGl0bGU6IFwic2ltcGxlVmlkZW9TbGlkZVwiXG5cdFx0XG5cdFx0QGxvYWRpbmdUZXh0ID0gbmV3IFRleHRcblx0XHRcdHdpZHRoOiA0MDAsIGhlaWdodDogNzBcblx0XHRcdGZvbnRTaXplOiA0MFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCJcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG5cdFx0XHR0ZXh0OiBcIk5vIFVSTFwiXG5cdFx0XHRcblx0XHRcblx0XHRAdmlkZW9WaWV3ID0gbmV3IFZpZGVvTGF5ZXJcblx0XHRcdHdpZHRoOiAxNjgwLCBoZWlnaHQ6IDEwODBcblx0XHRcdG5hbWU6IFwidmlkZW9WaWV3XCIsIGJhY2tncm91bmRDb2xvcjogXCJudWxsXCJcblx0XHRcblx0XHRcblx0XHRcblx0XHRAdmlkZW9WaWV3LnBsYXllci5tdXRlZCA9IHRydWVcblx0XHRAdmlkZW9WaWV3LnBsYXllci5hdXRvcGxheSA9IGZhbHNlXG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubG9vcCA9IHRydWVcblx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0XG5cdFx0QGxvYWRpbmdUZXh0LnBhcmVudCA9IEBcblx0XHRAbG9hZGluZ1RleHQuY2VudGVyKClcblx0XHRcblx0XHRAdmlkZW9WaWV3LnBhcmVudCA9IEBcblx0XHRAdmlkZW9WaWV3LnNjYWxlID0gQGhlaWdodCAvIDEwODBcblx0XHRAdmlkZW9WaWV3LmNlbnRlcigpXG5cblx0XG5cdFxuXHQjIEBkZWZpbmUgJ3ZpZGVvVVJMJyxcblx0IyBcdGdldDogLT4gQG9wdGlvbnMudmlkZW9VUkxcblx0IyBcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWRlb1VSTCA9IHZhbHVlXG5cdFxuXG5cdCMgb3ZlcnJpZGVcblx0c291cmNlOiAodmlkZW8pID0+XG5cdFx0QHZpZGVvVmlldy52aWRlbyA9IHZpZGVvXG5cdFx0QGxvYWRpbmdUZXh0LnRleHQgPSBcIkxvYWRpbmdcIlxuXHRcdEBuYW1lID0gQG5hbWUgKyBcIjogXCIgKyB2aWRlb1xuXHRcdHJldHVybiBAXG5cblxuXG5cblx0bG9vcDogKHZhbHVlID0gdHJ1ZSkgPT5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5sb29wID0gdHJ1ZVxuXHRcdHJldHVybiBAXG5cdFxuXHRtdXRlOiAodmFsdWUgPSB0cnVlKSA9PlxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLm11dGVkID0gdmFsdWVcblx0XHRyZXR1cm4gQFxuXHRcblx0dW5tdXRlOiAoKSA9PlxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLm11dGVkID0gZmFsc2Vcblx0XHRyZXR1cm4gQFxuXG5cblxuXG5cdGlzUGF1c2VkOiAoKSA9PlxuXHRcdHJldHVybiBAdmlkZW9WaWV3LnBsYXllci5wYXVzZWRcblxuXHRwbGF5OiAoKSA9PlxuXHRcdGlmICFAaXNQYXVzZWQoKSB0aGVuIHJldHVyblxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLnBsYXkoKVxuXHRcblx0cGF1c2U6ICgpID0+XG5cdFx0aWYgQGlzUGF1c2VkKCkgdGhlbiByZXR1cm5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5wYXVzZSgpXG5cdFxuXHR0b2dnbGVQbGF5OiAoKSA9PlxuXHRcdGlmIEBpc1BhdXNlZCgpIHRoZW4gQHBsYXkoKVxuXHRcdGVsc2UgQHBhdXNlKClcblx0XG5cblxuIyBcdGxvYWRWaWRlbzogKHdlYlVSTCkgPT5cbiMgXHRcdEB2aWRlb1ZpZXcucGxheWVyLm11dGVkID0gdHJ1ZVxuIyBcdFx0QHZpZGVvVmlldy5wbGF5ZXIuYXV0b3BsYXkgPSB0cnVlXG4jIFx0XHRAdmlkZW9WaWV3LnZpZGVvID0gQHZpZGVvVVJMXG4jIFx0XHRVdGlscy5kZWxheSAxMCwgPT5cbiMgXHRcdEB2aWRlb1ZpZXcucGxheWVyLnBsYXkoKVxuXHRcdFxuXHRcdFxuIyBcdFx0cHJpbnQgQHZpZGVvVmlldy5wbGF5ZXIucmVhZHlTdGF0ZVxuIyBcdFx0VXRpbHMuZGVsYXkgMTAsID0+XG4jIFx0XHRcdHByaW50IEB2aWRlb1ZpZXcucGxheWVyLnJlYWR5U3RhdGVcblxuXG5cblxuXG4jIFM6IFNsaWRlIChWaWRlbylcblxuY2xhc3MgVmlkZW9TbGlkZSBleHRlbmRzIFNpbXBsZVZpZGVvU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0IyBQcm9ncmVzc1xuXHRcdEBwbGF5ZXJTbGlkZXIgPSBuZXcgUGxheWVyU2xpZGVyXG5cdFx0QHBsYXllclNsaWRlci5wYXJlbnQucGFyZW50ID0gQFxuXG5cdFx0QHBsYXllclNsaWRlci5wYXJlbnQueCA9IEFsaWduLmxlZnQoOTgqMilcblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC55ID0gQWxpZ24uYm90dG9tKC02MCAqIDIpXG5cblx0XHQjIHByaW50IEBwbGF5ZXJTbGlkZXIucGFyZW50XG5cdFx0IyBwcmludCBAcGxheWVyU2xpZGVyLnBsYXlCdXR0b25cblxuXG5cdFx0QHBsYXllclNsaWRlci5wbGF5QnV0dG9uLm9uIEV2ZW50cy5UYXAsIChldmVudCwgbGF5ZXIpIC0+XHRcdFx0XG5cdFx0XHRzbGlkZSA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdHNsaWRlLnRvZ2dsZVBsYXkoKVxuXHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZURyYWcgPSBmYWxzZVxuXG5cblxuXG5cdFx0QHBsYXllclNsaWRlci5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdCMgcHJpbnQgXCJUb3VjaCBTdGFydFwiXG5cdFx0XHRzbGlkZSA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdHNsaWRlLnBhdXNlKClcblx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnID0gdHJ1ZVxuXHRcdFxuXHRcdFxuXG5cdFx0QHBsYXllclNsaWRlci5vbiBcImNoYW5nZTp2YWx1ZVwiLCAtPlxuXHRcdFx0c2xpZGUgPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uID0gc2xpZGUucGFyZW50LnBhcmVudFxuXHRcdFx0XG5cdFx0XHRpZiBwcmVzZW50YXRpb24uYWN0aXZlRHJhZ1xuXHRcdFx0XHRzbGlkZS52aWRlb1ZpZXcucGxheWVyLmN1cnJlbnRUaW1lID0gVXRpbHMubW9kdWxhdGUoQHZhbHVlLCBbMCwgMV0sIFswLCBzbGlkZS52aWRlb1ZpZXcucGxheWVyLmR1cmF0aW9uXSwgdHJ1ZSlcblx0XHRcblx0XHRcblxuXHRcdEBwbGF5ZXJTbGlkZXIuc291bmRCdXR0b24ub24gRXZlbnRzLlRhcCwgLT5cblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0aWYgc2xpZGUudmlkZW9WaWV3LnBsYXllci5tdXRlZCB0aGVuIHNsaWRlLnVubXV0ZSgpXG5cdFx0XHRlbHNlIHNsaWRlLm11dGUoKVxuXHRcdFxuXG5cdFx0XG5cblx0XHRcblx0XHRFdmVudHMud3JhcChAdmlkZW9WaWV3LnBsYXllcikub24gXCJwYXVzZVwiLCA9PlxuXHRcdFx0IyBwcmludCBcIiEgbmV4dCBwYXVzZVwiXG5cdFx0XHRAcGF1c2UoKVxuXHRcdFx0QHBsYXllclNsaWRlci5wbGF5QnV0dG9uLnN0YXRlU3dpdGNoKFwicGF1c2VkXCIpXG5cdFx0XHRcblx0XHRcdHByZXNlbnRhdGlvbiA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRpZiBAdmlkZW9WaWV3LnBsYXllciA9PSBwcmVzZW50YXRpb24uYWN0aXZlVmlkZW9QbGF5ZXJcblx0XHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZVBsYXlpbmcgPSBmYWxzZVxuXHRcdFxuXHRcdFxuXHRcdEV2ZW50cy53cmFwKEB2aWRlb1ZpZXcucGxheWVyKS5vbiBcInBsYXlcIiwgPT5cblx0XHRcdCMgcHJpbnQgXCIhIG5leHQgcGxheVwiXG5cdFx0XHRAcGxheSgpXG5cdFx0XHRAcGxheWVyU2xpZGVyLnBsYXlCdXR0b24uc3RhdGVTd2l0Y2goXCJwbGF5aW5nXCIpXG5cdFx0XHRcblx0XHRcdHByZXNlbnRhdGlvbiA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlRHJhZyA9IGZhbHNlXG5cdFx0XHRpZiBAdmlkZW9WaWV3LnBsYXllciA9PSBwcmVzZW50YXRpb24uYWN0aXZlVmlkZW9QbGF5ZXJcblx0XHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZVBsYXlpbmcgPSB0cnVlXG5cdFx0XG5cdFx0XG5cdFx0RXZlbnRzLndyYXAoQHZpZGVvVmlldy5wbGF5ZXIpLm9uIFwidm9sdW1lY2hhbmdlXCIsID0+XG5cdFx0XHRpZiBAdmlkZW9WaWV3LnBsYXllci5tdXRlZFxuXHRcdFx0XHRAcGxheWVyU2xpZGVyLnNvdW5kQnV0dG9uLnN0YXRlU3dpdGNoKFwibXV0ZWRcIilcblx0XHRcdGVsc2Vcblx0XHRcdFx0QHBsYXllclNsaWRlci5zb3VuZEJ1dHRvbi5zdGF0ZVN3aXRjaChcInNvdW5kXCIpXG5cblx0XHRcdFx0XG5cdFx0XG5jbGFzcyBIRFZpZGVvU2xpZGUgZXh0ZW5kcyBWaWRlb1NsaWRlXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAdmlkZW9WaWV3LndpZHRoID0gMTkyMFxuXHRcdEB2aWRlb1ZpZXcuaGVpZ2h0ID0gMTA4MFxuXHRcdEB2aWRlb1ZpZXcueCA9IDQ0MFxuXHRcdEB2aWRlb1ZpZXcueSA9IDI4NlxuXG5cdFx0QHZpZGVvVmlldy5ib3JkZXJSYWRpdXMgPSA4ICogMlxuXHRcdEB2aWRlb1ZpZXcuY2xpcCA9IHRydWVcblxuXG5cdFx0QHZpZGVvVmlldy5vcmlnaW5YID0gMC41XG5cdFx0QHZpZGVvVmlldy5vcmlnaW5ZID0gMC41XG5cblx0XHRAdmlkZW9WaWV3LnNjYWxlID0gMS4zNjY2XG5cblxuXHRcdEBwbGF5ZXJTbGlkZXIudXBkYXRlRm9yU2NhbGVEb3duKClcblxuXG5cdFx0XHRcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiMgUzogU2xpZGUgKFByb3RvdHlwZSlcblxuY2xhc3MgUHJvdG90eXBlU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdEBwcm90b3R5cGVWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInByb3RvdHlwZVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBwcm90b3R5cGVWaWV3LnBhcmVudCA9IEBcblx0XHRAc2l6ZWQoKVxuXHRcblx0XG5cdFxuXHRcblx0QGRlZmluZSAncFdpZHRoJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBXaWR0aFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wV2lkdGggPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAncEhlaWdodCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wSGVpZ2h0XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnBIZWlnaHQgPSB2YWx1ZVxuXHRcblx0XG5cdFxuXHRcblx0c2NhbGVkOiAodmFsdWUpID0+XG5cdFx0QHByb3RvdHlwZVZpZXcuc2NhbGUgPSB2YWx1ZVxuXHRcdHJldHVybiBAXG5cdFxuXHRib3JkZXJlZDogKHZhbHVlKSA9PlxuXHRcdEBwcm90b3R5cGVWaWV3LmJvcmRlclJhZGl1cyA9IHZhbHVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdHNpemVkOiAod2lkdGggPSAzNzUsIGhlaWdodCA9IDgxMikgPT5cblx0XHRAcHJvdG90eXBlVmlldy53aWR0aCA9IHdpZHRoXG5cdFx0QHByb3RvdHlwZVZpZXcuaGVpZ2h0ID0gaGVpZ2h0XG5cdFx0QHByb3RvdHlwZVZpZXcuY2VudGVyKClcblxuXHRcdGlmIHdpZHRoID09IDM3NSBhbmQgaGVpZ2h0ID09IDgxMiB0aGVuIEBzY2FsZWQoMi4wKVxuXHRcdGVsc2UgaWYgd2lkdGggPT0gMzkwIGFuZCBoZWlnaHQgPT0gODQ0IHRoZW4gQHNjYWxlZCgxLjkyMylcblx0XHRlbHNlIEBzY2FsZWQoMi4wKVxuXG5cdFx0cmV0dXJuIEBcblx0XG5cdFxuXHRcblx0IyBvdmVycmlkZVxuXHRzb3VyY2U6IChvcmlnaW5VUkwpID0+XG5cdFx0dXJsID0gb3JpZ2luVVJMICsgXCI/bG9nbz1vZmYmYnV0dG9uPW9mZlwiXG5cdFx0XG5cdFx0Y29udGVudFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQHByb3RvdHlwZVZpZXdcblx0XHRcdHdpZHRoOiBAcHJvdG90eXBlVmlldy53aWR0aCwgaGVpZ2h0OiBAcHJvdG90eXBlVmlldy5oZWlnaHQsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aHRtbDogXCI8aWZyYW1lIHN0eWxlPSdwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7JyBzcmM9JyN7dXJsfSc+PC9pZnJhbWU+XCJcblx0XHRcdGlnbm9yZUV2ZW50czogZmFsc2UsIGNsaXA6IHRydWVcblx0XHRcblx0XHRyZXR1cm4gQFxuXHRcblx0XG5cdFxuXHRjcmVhdGVXZWJWaWV3OiAod2ViVVJMKSA9PlxuXHRcdFxuXHRcdHZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiBAaW1hZ2VTaXplLndpZHRoLCBoZWlnaHQ6IEBpbWFnZVNpemUuaGVpZ2h0XG5cdFx0XHRuYW1lOiBcIndlYnZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBib3JkZXJSYWRpdXM6IEBpbWFnZVJhZGl1c1xuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFxuXHRcdGNvbnRlbnRWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IHZpZXdcblx0XHRcdHdpZHRoOiBAaW1hZ2VTaXplLndpZHRoLCBoZWlnaHQ6IEBpbWFnZVNpemUuaGVpZ2h0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGh0bWw6IFwiPGlmcmFtZSBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOycgc3JjPScje3dlYlVSTH0nPjwvaWZyYW1lPlwiXG5cdFx0XHRpZ25vcmVFdmVudHM6IGZhbHNlLCBjbGlwOiB0cnVlXG5cdFx0XG5cdFx0cmV0dXJuIHZpZXdcblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1NsaWRlLCBTaW1wbGVWaWRlb1NsaWRlLCBWaWRlb1NsaWRlLCBIRFZpZGVvU2xpZGUsIFByb3RvdHlwZVNsaWRlfSIsIlxue1NsaWRlcjV9ID0gcmVxdWlyZSBcIlBDU2xpZGVyNVwiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG5UZXh0QnV0dG9uID0gQnV0dG9ucy5UZXh0QnV0dG9uXG5cblxuIyBQYW5lbHNcblxuIyBwcmludCBcIj9cIlxuY2xhc3MgZXhwb3J0cy5TbGlkZXJQaW5jaCBleHRlbmRzIFNsaWRlcjVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRsYXN0U2xpZGVTZWxlY3RlZEluZGV4OiAwXG5cdFx0XHRncmlkQnV0dG9uczogW11cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QG9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdFx0aWYgZnJvbSAhPSB0b1xuXHRcdFx0XHRpZiB0byA9PSBcInByZXNlbnRcIlxuXHRcdFx0XHRcdG5leHRPcGFjaXR5VmFsdWUgPSAxXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRuZXh0T3BhY2l0eVZhbHVlID0gMFxuXHRcdFx0XHRcblx0XHRcdFx0QGJvdHRvbVZpZXcuYW5pbWF0ZShvcGFjaXR5OiBuZXh0T3BhY2l0eVZhbHVlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXG5cdFx0XHRcdFxuXHRcdFxuXHRcblx0QGRlZmluZSAnbGFzdFNsaWRlU2VsZWN0ZWRJbmRleCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5sYXN0U2xpZGVTZWxlY3RlZEluZGV4XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAncGluY2hCdXR0b25zJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBpbmNoQnV0dG9uc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5waW5jaEJ1dHRvbnMgPSB2YWx1ZVxuXHRcdFxuXHRcblx0XG5cblx0Z3JpZFNpemU6ICgpID0+XG5cdFx0cmV0dXJuIDNcblxuXHRnZXRHcmlkR2FwOiAoKSA9PlxuXHRcdHJldHVybiAyMFxuXG5cdGdldEdyaWRTY2FsZTogKCkgPT5cblx0XHR3cyA9IChAd2lkdGggLSBAZ2V0R3JpZEdhcCgpICogKEBncmlkU2l6ZSgpIC0gMSkpIC8gQGdyaWRTaXplKClcblx0XHRyZXR1cm4gd3MgLyBAd2lkdGhcblxuXG5cblx0cGluY2hUb0dyaWQ6ICgpID0+XG5cblx0XHRpZiBAaXNHcmlkKClcblx0XHRcdEBwaW5jaFRvU2xpZGUoQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXgpXG5cdFx0XHRyZXR1cm5cblxuXHRcdEBzdGF0ZVN3aXRjaChcImdyaWRcIilcblx0XHRAc2hvd0dyaWRDYW5jZWxCdXR0b24oKVxuXG5cdFx0c2NhbGVJbmRleCA9IEBnZXRHcmlkU2NhbGUoKVxuXG5cdFx0QGlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRAY29udGVudC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cblx0XHQjIEBzY3JvbGxWZXJ0aWNhbCA9IHRydWVcblx0XHQjIEBjb250ZW50LnNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHRAc2Nyb2xsSG9yaXpvbnRhbCA9IGZhbHNlXG5cdFx0IyBAY29udGVudC5zY3JvbGxIb3Jpem9udGFsID0gZmFsc2VcblxuXG5cblx0XHRmb3Igc2xpZGUsIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRzbGlkZS5ncmlkRGF0YSA9XG5cdFx0XHRcdHg6IChpbmRleCAlIEBncmlkU2l6ZSgpIC0gMSkgKiAoc2xpZGUud2lkdGggKiBzY2FsZUluZGV4ICsgQGdldEdyaWRHYXAoKSlcblx0XHRcdFx0eTogKChpbmRleCAtIGluZGV4ICUgQGdyaWRTaXplKCkpIC8gQGdyaWRTaXplKCkgLSAxKSAqIChzbGlkZS5oZWlnaHQgKiBzY2FsZUluZGV4ICsgQGdldEdyaWRHYXAoKSkgKyBAZ2V0R3JpZEdhcCgpXG5cdFx0XHRcdHNjYWxlOiBzY2FsZUluZGV4XG5cblxuXG5cblx0XHRAZ3JpZC5zY3JvbGxUb1BvaW50KHt4OiAwLCB5OiBAY29udGVudC5jaGlsZHJlbltAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleF0uZ3JpZERhdGEueSB9LCBmYWxzZSlcblx0XHRzZWxlY3RlZFNsaWRlRGVsdGFZID0gQGdyaWQuc2Nyb2xsWVxuXHRcdEBzbmFwVG9QYWdlKEBjb250ZW50LmNoaWxkcmVuWzBdLCBmYWxzZSlcblxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAY29udGVudC5jbGlwID0gZmFsc2VcblxuXHRcdEBncmlkLnNjcm9sbFZlcnRpY2FsID0gdHJ1ZVxuXHRcdEBncmlkLm1vdXNlV2hlZWxFbmFibGVkID0gdHJ1ZVxuXG5cdFx0ZGVsdGFSb3dOdW1iZXIgPSAoKEBjb250ZW50LmNoaWxkcmVuLmxlbmd0aCAtIChAY29udGVudC5jaGlsZHJlbi5sZW5ndGggJSBAZ3JpZFNpemUoKSkpIC8gQGdyaWRTaXplKCkgKyAxKVxuXHRcdEBoZWlnaHQgPSBkZWx0YVJvd051bWJlciAqIChAZ3JpZC5oZWlnaHQgLyAzKSArIChkZWx0YVJvd051bWJlciArIDEpICogKEBncmlkU2l6ZSgpIC8gc2NhbGVJbmRleClcblxuXG5cdFx0XG5cdFx0XG5cdFx0Zm9yIHNsaWRlLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0aWYgaW5kZXggPT0gQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblxuXHRcdFx0XHRzbGlkZS5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XHRzbGlkZS54ID0gMFxuXHRcdFx0XHRzbGlkZS55ID0gc2VsZWN0ZWRTbGlkZURlbHRhWVxuXG5cdFx0XHRcdGdyaWREb3duc2NhbGVBbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uIHNsaWRlLFxuXHRcdFx0XHRcdHg6IHNsaWRlLmdyaWREYXRhLnhcblx0XHRcdFx0XHR5OiBzbGlkZS5ncmlkRGF0YS55XG5cdFx0XHRcdFx0c2NhbGU6IHNsaWRlLmdyaWREYXRhLnNjYWxlXG5cdFx0XHRcdFx0b3B0aW9uczpcblx0XHRcdFx0XHRcdGN1cnZlOiBCZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKVxuXHRcdFx0XHRcdFx0dGltZTogMC4zXG5cdFx0XHRcdFxuXHRcdFx0XHRncmlkRG93bnNjYWxlQW5pbWF0aW9uLnN0YXJ0KClcblxuXHRcdFx0XHRncmlkRG93bnNjYWxlQW5pbWF0aW9uLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsIChhbmltYXRpb24pIC0+XG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwgPSBAbGF5ZXIucGFyZW50LnBhcmVudFxuXHRcdFx0XHRcdGxvY2FsR3JpZEJ1dHRvbnMgPSBbXVxuXG5cdFx0XHRcdFx0Zm9yIHNsaWRlLCBpbmRleCBpbiBsb2NhbFNjcm9sbC5jb250ZW50LmNoaWxkcmVuXG5cdFx0XHRcdFx0XHQjIHByaW50IGxvY2FsU2xpZGVcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0Z3JpZEJhY2tIYW5kZXIgPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0XHRcdFx0XHRsb2NhbFNjcm9sbCA9IEBwYXJlbnQucGFyZW50LnBhcmVudFxuXHRcdFx0XHRcdFx0XHRsb2NhbFNjcm9sbC5sYXN0U2xpZGVTZWxlY3RlZEluZGV4ID0gQGN1c3RvbS5zbGlkZUluZGV4XG5cdFx0XHRcdFx0XHRcdGxvY2FsU2Nyb2xsLnBpbmNoVG9TbGlkZSgpXG5cblx0XHRcdFx0XHRcdGdyaWRCYWNrQnV0dG9uID0gbmV3IFRleHRCdXR0b25cblx0XHRcdFx0XHRcdFx0cGFyZW50OiBzbGlkZVxuXHRcdFx0XHRcdFx0XHR3aWR0aDogc2xpZGUud2lkdGgsIGhlaWdodDogc2xpZGUuaGVpZ2h0XG5cdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHRcdFx0XHRcdHRleHQ6IFwiXCJcblx0XHRcdFx0XHRcdFx0aGFuZGxlcjogZ3JpZEJhY2tIYW5kZXJcblx0XHRcdFx0XHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRcdFx0XHRcdHNsaWRlSW5kZXg6IGluZGV4XG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGxvY2FsR3JpZEJ1dHRvbnMucHVzaCBncmlkQmFja0J1dHRvblxuXG5cdFx0XHRcdFx0XHQjIGdyaWRCYWNrQnV0dG9uLm9uVGFwIC0+XG5cdFx0XHRcdFx0XHQjIFx0bG9jYWxTY3JvbGwgPSBAcGFyZW50LnBhcmVudC5wYXJlbnRcblx0XHRcdFx0XHRcdCMgXHRsb2NhbFNjcm9sbC5sYXN0U2xpZGVTZWxlY3RlZEluZGV4ID0gQGN1c3RvbS5zbGlkZUluZGV4XG5cdFx0XHRcdFx0XHQjIFx0bG9jYWxTY3JvbGwucGluY2hUb1NsaWRlKClcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5ncmlkQnV0dG9ucyA9IGxvY2FsR3JpZEJ1dHRvbnNcblxuXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHNsaWRlLnggPSBzbGlkZS5ncmlkRGF0YS54XG5cdFx0XHRcdHNsaWRlLnkgPSBzbGlkZS5ncmlkRGF0YS55XG5cdFx0XHRcdHNsaWRlLnNjYWxlID0gc2xpZGUuZ3JpZERhdGEuc2NhbGVcblxuXG5cblx0XHRcblx0XHRcblx0XHRAdXBkYXRlQ29udGVudCgpXG5cdFx0QGdyaWQudXBkYXRlQ29udGVudCgpXG5cblxuXG5cdFxuXG5cblxuXHRwaW5jaFRvU2xpZGU6ICgpID0+XG5cdFx0XG5cdFx0QHN0YXRlU3dpdGNoKFwicHJlc2VudFwiKVxuXG5cdFx0Zm9yIGl0ZW0gaW4gQGdyaWRCdXR0b25zXG5cdFx0XHRpdGVtLmRlc3Ryb3koKVxuXG5cdFx0QGlnbm9yZUV2ZW50cyA9IGZhbHNlXG5cdFx0QGNvbnRlbnQuaWdub3JlRXZlbnRzID0gZmFsc2VcblxuXHRcdCMgQHNjcm9sbFZlcnRpY2FsID0gZmFsc2Vcblx0XHQjIEBjb250ZW50LnNjcm9sbFZlcnRpY2FsID0gdHJ1ZVxuXHRcdEBzY3JvbGxIb3Jpem9udGFsID0gdHJ1ZVxuXHRcdCMgQGNvbnRlbnQuc2Nyb2xsSG9yaXpvbnRhbCA9IHRydWVcblxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcdEBjb250ZW50LmNsaXAgPSB0cnVlXG5cdFx0IyBAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXG5cdFx0QGdyaWQuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdCMgQGdyaWQuY29udGVudC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cblx0XHRAZ3JpZC5zY3JvbGxWZXJ0aWNhbCA9IGZhbHNlXG5cdFx0QGdyaWQubW91c2VXaGVlbEVuYWJsZWQgPSBmYWxzZVxuXG5cdFx0QGhlaWdodCA9IEBncmlkLmhlaWdodFxuXHRcdEBncmlkLnNjcm9sbFRvVG9wKGZhbHNlKVxuXG5cblx0XHRmb3Igc2xpZGUsIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRzbGlkZS5ncmlkRGF0YSA9XG5cdFx0XHRcdHg6IChzbGlkZS53aWR0aCArIDEyMCkgKiBpbmRleFxuXHRcdFx0XHR5OiAwXG5cdFx0XHRcdHNjYWxlOiAxXG5cblx0XHRmb3Igc2xpZGUsIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRzbGlkZS54ID0gc2xpZGUuZ3JpZERhdGEueFxuXHRcdFx0c2xpZGUueSA9IHNsaWRlLmdyaWREYXRhLnlcblx0XHRcdHNsaWRlLnNjYWxlID0gc2xpZGUuZ3JpZERhdGEuc2NhbGVcblxuXHRcdCMgZm9yIHNsaWRlLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdCMgXHRpZiBpbmRleCA9PSBAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleFxuXHRcdCMgXHRcdHNsaWRlLmJyaW5nVG9Gcm9udCgpXG5cblx0XHQjIFx0XHRncmlkVXBzY2FsZUFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24gc2xpZGUsXG5cdFx0IyBcdFx0XHR4OiBzbGlkZS5ncmlkRGF0YS54XG5cdFx0IyBcdFx0XHR5OiBzbGlkZS5ncmlkRGF0YS55XG5cdFx0IyBcdFx0XHRzY2FsZTogc2xpZGUuZ3JpZERhdGEuc2NhbGVcblx0XHQjIFx0XHRcdG9wdGlvbnM6XG5cdFx0IyBcdFx0XHRcdGN1cnZlOiBCZXppZXIoMC4yNSwgMC4xLCAwLjI1LCAxKVxuXHRcdCMgXHRcdFx0XHR0aW1lOiAwLjNcblx0XHRcdFx0XG5cdFx0IyBcdFx0Z3JpZFVwc2NhbGVBbmltYXRpb24uc3RhcnQoKVxuXG5cdFx0IyBcdFx0Z3JpZFVwc2NhbGVBbmltYXRpb24ub24gRXZlbnRzLkFuaW1hdGlvbkVuZCwgKGFuaW1hdGlvbikgLT5cblx0XHQjIFx0XHRcdGxvY2FsU2Nyb2xsID0gQGxheWVyLnBhcmVudC5wYXJlbnRcblxuXHRcdCMgXHRcdFx0Zm9yIHNsaWRlLCBpbmRleCBpbiBsb2NhbFNjcm9sbC5jb250ZW50LmNoaWxkcmVuXG5cdFx0IyBcdFx0XHRcdHNsaWRlLnggPSBzbGlkZS5ncmlkRGF0YS54XG5cdFx0IyBcdFx0XHRcdHNsaWRlLnkgPSBzbGlkZS5ncmlkRGF0YS55XG5cdFx0IyBcdFx0XHRcdHNsaWRlLnNjYWxlID0gc2xpZGUuZ3JpZERhdGEuc2NhbGVcblx0XHQjIFx0XHRcdFx0IyBzbGlkZS5vcGFjaXR5ID0gMVxuXG5cdFx0IyBcdCMgZWxzZVxuXHRcdCMgXHRcdCMgc2xpZGUub3BhY2l0eSA9IDAuNVxuXG5cblx0XHRcblx0XHRAdXBkYXRlQ29udGVudCgpXG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhdLCBmYWxzZSlcblxuXHRcdEB1cGRhdGVDdXJyZW50UGFnZSgpXG5cblxuXG5cdFx0XG5cdFx0IiwiXG57U2xpZGVyNX0gPSByZXF1aXJlIFwiUENTbGlkZXI1XCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblByZXZpZXdCdXR0b24gPSBCdXR0b25zLlByZXZpZXdCdXR0b25cblxuXG4jIFBhbmVsc1xuXG4jIHByaW50IFwiP1wiXG5jbGFzcyBleHBvcnRzLlNsaWRlckdyaWQgZXh0ZW5kcyBTbGlkZXI1XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRncmlkMiA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdG5hbWU6IFwiZ3JpZDJcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyLCBoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlLCBzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHQjIGlnbm9yZUV2ZW50czogZmFsc2Vcblx0XHRcdG1vdXNlV2hlZWxFbmFibGVkOiB0cnVlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcblx0XHRncmlkMi5zdGF0ZXMgPVxuXHRcdFx0XCJzaG93blwiOiB7IG9wYWNpdHk6IDEsIHk6IFNjcmVlbi5oZWlnaHQgfVxuXHRcdFx0XCJoaWRkZW5cIjogeyBvcGFjaXR5OiAwLCB5OiBTY3JlZW4uaGVpZ2h0IH1cblx0XHRcblx0XHQjIGdyaWQyLm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdCMgXHRpZiBmcm9tICE9IHRvXG5cdFx0IyBcdFx0aWYgdG8gPT0gXCJzaG93blwiIHRoZW4gQGlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHQjIFx0XHRlbHNlIEBpZ25vcmVFdmVudHMgPSBmYWxzZVxuXHRcdFxuXHRcdGdyaWQyLnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRncmlkMjogZ3JpZDJcblx0XHRcdGxhc3RTbGlkZVNlbGVjdGVkSW5kZXg6IDBcblx0XHRcdGdyaWRCdXR0b25zOiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRncmlkMi5wYXJlbnQgPSBAY2FudmFzXG5cdFx0QGNhbnZhcy5jdXN0b20ubG9jYWxTY3JvbGwgPSBAXG5cblx0XHR0cnkgZ3JpZC5wbGFjZUJlZm9yZShAdG9wVmlldylcblxuXG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdGxvY2FsU2Nyb2xsID0gQHBhcmVudFxuXHRcdFx0XG5cdFx0XHRsb2NhbFNjcm9sbC5hZGRQcmV2aWV3KGxvY2FsU2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoKVxuXHRcdFx0bG9jYWxTY3JvbGwudXBkYXRlUHJldmlldygpXG5cdFx0XG5cblx0XHQjIEBvbiBFdmVudHMuU3RhdGVTd2l0Y2hFbmQsIChmcm9tLCB0bykgLT5cblx0XHQjIFx0aWYgZnJvbSAhPSB0b1xuXHRcdCMgXHRcdGlmIHRvID09IFwicHJlc2VudFwiIHRoZW4gbmV4dE9wYWNpdHlWYWx1ZSA9IDFcblx0XHQjIFx0XHRlbHNlIG5leHRPcGFjaXR5VmFsdWUgPSAwXG5cdFx0XHRcdFxuXHRcdCMgXHRcdEBib3R0b21WaWV3LmFuaW1hdGUob3BhY2l0eTogbmV4dE9wYWNpdHlWYWx1ZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblxuXHRcdFx0XHRcblx0XG5cdFxuXHRAZGVmaW5lICdsYXN0U2xpZGVTZWxlY3RlZEluZGV4Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkQnV0dG9ucycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkQnV0dG9uc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkQnV0dG9ucyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkMicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkMlxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkMiA9IHZhbHVlXG5cdFxuXHRcblxuXHRsZWFkWmVybzogKG51bSwgc2l6ZSA9IDIpID0+XG5cdFx0cyA9IG51bSArIFwiXCJcblx0XHR3aGlsZSBzLmxlbmd0aCA8IHNpemUgdGhlbiBzID0gXCIwXCIgKyBzXG5cdFx0cmV0dXJuIHNcblxuXG5cdGFkZFByZXZpZXc6IChpbWFnZUluZGV4KSA9PlxuXHRcdGluZGV4ID0gaW1hZ2VJbmRleCAtIDFcblx0XHQjIHBXID0gQGdyaWQyLndpZHRoIC8gQGdyaWRTaXplKClcblx0XHQjIHBIID0gKEBncmlkMi53aWR0aCAvIEBncmlkU2l6ZSgpKSAqICg5MDAvMTQwMClcblxuXHRcdHByZXZpZXdMYXllciA9IG5ldyBQcmV2aWV3QnV0dG9uXG5cdFx0XHR0ZXh0OiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBncmlkMi5jb250ZW50XG5cdFx0XHR3aWR0aDogMjgwLCBoZWlnaHQ6IDE4MFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMjIyXCJcblx0XHRcdCMgdHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL3BhZ2Uje0BsZWFkWmVybyhpbWFnZUluZGV4KX1AcHJldmlldy5wbmdcIlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRpbmRleDogaW5kZXhcblx0XHRcblx0XHRwcmV2aWV3TGF5ZXIuc3RhdGVzID1cblx0XHRcdFwic2hvd25cIjogeyBvcGFjaXR5OiAwLjggfVxuXHRcdFx0XCJoaWRkZW5cIjogeyBvcGFjaXR5OiAwIH1cblx0XHRwcmV2aWV3TGF5ZXIuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XHRcblx0XHRAZ3JpZEJ1dHRvbnMucHVzaCBwcmV2aWV3TGF5ZXJcblxuXHRcdHByZXZpZXdMYXllci5vblRhcCAtPlxuXHRcdFx0bG9jYWxDYW52YXMgPSBAcGFyZW50LnBhcmVudC5wYXJlbnRcblx0XHRcdGxvY2FsU2Nyb2xsID0gbG9jYWxDYW52YXMuY3VzdG9tLmxvY2FsU2Nyb2xsXG5cdFx0XHRcblx0XHRcdGxvY2FsU2Nyb2xsLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBpbmRleFxuXHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb1NsaWRlKClcblxuXHRcdFxuXHRcdCMgQGdyaWQyLnVwZGF0ZUNvbnRlbnQoKVxuXHRcblx0dXBkYXRlUHJldmlldzogKCkgPT5cblx0XHRmb3IgaXRlbSwgaW5kZXggaW4gQGdyaWQyLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHBXID0gKEBncmlkMi53aWR0aCAtIEBnZXRHcmlkR2FwKCkgKiAoQGdyaWRTaXplKCkgKyAxKSkgLyBAZ3JpZFNpemUoKVxuXHRcdFx0cEggPSBwVyAqICg5MDAvMTQwMClcblxuXHRcdFx0aXRlbS53aWR0aCA9IHBXXG5cdFx0XHRpdGVtLmhlaWdodCA9IHBIXG5cdFx0XHRpdGVtLnggPSBpbmRleCAlIEBncmlkU2l6ZSgpICogKHBXICsgQGdldEdyaWRHYXAoKSkgKyBAZ2V0R3JpZEdhcCgpXG5cdFx0XHRpdGVtLnkgPSAoaW5kZXggLSBpbmRleCAlIEBncmlkU2l6ZSgpKSAvIEBncmlkU2l6ZSgpICogKHBIICsgQGdldEdyaWRHYXAoKSkgKyBAZ2V0R3JpZEdhcCgpXG5cblx0XHRcblx0XHRAZ3JpZDIudXBkYXRlQ29udGVudCgpXG5cblxuXHRcblx0IyBvdmVycmlkZVxuXHR1cGRhdGVTaXplOiAoKSA9PlxuXHRcdHN1cGVyXG5cdFx0bmV4dFN0YXRlID0gQGdyaWQyLnN0YXRlcy5jdXJyZW50Lm5hbWVcblx0XHRcblx0XHRAZ3JpZDIud2lkdGggPSBAY2FudmFzLndpZHRoXG5cdFx0QGdyaWQyLmhlaWdodCA9IEBjYW52YXMuaGVpZ2h0IC0gNThcblxuXHRcdEBncmlkMi5zdGF0ZXMuc2hvd24ueSA9IDU4XG5cdFx0QGdyaWQyLnN0YXRlcy5oaWRkZW4ueSA9IFNjcmVlbi5oZWlnaHQgKyAxMDAwXG5cblx0XHRAZ3JpZDIuc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXG5cdFx0QHVwZGF0ZVByZXZpZXcoKVxuXG5cblx0Z3JpZFNpemU6ICgpID0+XG5cdFx0aWYgQGNhbnZhcy53aWR0aCA8IDc0MCB0aGVuIHJldHVybiAyXG5cdFx0ZWxzZSBpZiBAY2FudmFzLndpZHRoIDwgMTI4MCB0aGVuIHJldHVybiAzXG5cdFx0ZWxzZSBpZiBAY2FudmFzLndpZHRoIDwgMTYwMCB0aGVuIHJldHVybiA0XG5cdFx0ZWxzZSBpZiBAY2FudmFzLndpZHRoIDwgMjAwMCB0aGVuIHJldHVybiA1XG5cdFx0cmV0dXJuIDZcblxuXHRnZXRHcmlkR2FwOiAoKSA9PlxuXHRcdHJldHVybiA4XG5cblx0Z2V0R3JpZFNjYWxlOiAoKSA9PlxuXHRcdHdzID0gKEB3aWR0aCAtIEBnZXRHcmlkR2FwKCkgKiAoQGdyaWRTaXplKCkgLSAxKSkgLyBAZ3JpZFNpemUoKVxuXHRcdHJldHVybiB3cyAvIEB3aWR0aFxuXG5cblxuXHRpc0dyaWQ6ICgpID0+XG5cdFx0cmV0dXJuIEBncmlkMi5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwic2hvd25cIlxuXG5cdHBpbmNoVG9HcmlkOiAoKSA9PlxuXHRcdGlmIEBpc0dyaWQoKSB0aGVuIEBwaW5jaFRvU2xpZGUoKVxuXHRcdGVsc2Vcblx0XHRcdCMgaWYgQGdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZ1bGxzY3JlZW5cIiB0aGVuIEBjaGFuZ2VTY2FsZSgpXG5cblx0XHRcdGZvciBpdGVtLCBpbmRleCBpbiBAZ3JpZEJ1dHRvbnNcblx0XHRcdFx0aWYgaW5kZXggPT0gQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRcdFx0XHRpdGVtLnN0YXRlU3dpdGNoKFwic2hvd25cIilcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGl0ZW0uc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XHRcdFx0XHRpdGVtLmFuaW1hdGUoXCJzaG93blwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUsIGRlbGF5OiAwLjEyICsgMC4wMiAqIE1hdGguYWJzKChAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleCAtIGluZGV4KSkpXG5cdFx0XHRcblx0XHRcdEBncmlkMi5zdGF0ZVN3aXRjaChcInNob3duXCIpXG5cdFx0XHR0cnkgQGdyaWQyLnNjcm9sbFRvUG9pbnQoeyB4OiAwLCB5OiBAZ3JpZEJ1dHRvbnNbQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhdLnkgLSBAZ3JpZEJ1dHRvbnNbQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhdLmhlaWdodCAvIDIgfSwgZmFsc2UpXG5cdFx0XHRcblx0XHRcdEBwYXVzZVZpZGVvcygpXG5cblx0cGluY2hUb1NsaWRlOiAoKSA9PlxuXHRcdCMgcHJpbnQgQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRAZ3JpZDIuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlbltAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleF0sIGZhbHNlKVxuXHRcdFxuXHRcdFxuXG5cblxuXHRcdFxuXHRcdCIsIlxue1NsaWRlcjR9ID0gcmVxdWlyZSBcIlBDU2xpZGVyNFwiXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyNSBleHRlbmRzIFNsaWRlcjRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YWN0aXZlVmlkZW9QbGF5ZXI6IG51bGxcblx0XHRcdGFjdGl2ZVByb2dyZXNzU2xpZGVyOiBudWxsXG5cdFx0XHRhY3RpdmVEcmFnOiBmYWxzZVxuXHRcdFx0YWN0aXZlUGxheWluZzogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdFx0RnJhbWVyLkxvb3Aub24gXCJyZW5kZXJcIiwgPT5cblx0XHRcdGlmICFAYWN0aXZlRHJhZyBhbmQgQGFjdGl2ZVBsYXlpbmcgYW5kICFAaXNHcmlkKClcblxuXHRcdFx0XHRpZiBAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgIT0gdW5kZWZpbmVkIGFuZCBAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgIT0gbnVsbFxuXHRcdFx0XHRcdGlmIEBhY3RpdmVWaWRlb1BsYXllciAhPSB1bmRlZmluZWQgYW5kIEBhY3RpdmVWaWRlb1BsYXllciAhPSBudWxsXG5cdFx0XHRcdFx0XHRAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIudmFsdWUgPSBVdGlscy5tb2R1bGF0ZShAYWN0aXZlVmlkZW9QbGF5ZXIuY3VycmVudFRpbWUsIFswLCBAYWN0aXZlVmlkZW9QbGF5ZXIuZHVyYXRpb25dLCBbMCwgMV0sIHRydWUpXG5cblxuXG5cdHVwZGF0ZUN1cnJlbnRQYWdlOiAoKSA9PlxuXHRcdHN1cGVyIEB1cGRhdGVDb250ZW50KClcblx0XHRcblx0XHRAc2VsZWN0Q3VycmVudFBsYXlpbmdWaWRlbygpXG5cdFx0QGFjdGl2ZURyYWcgPSBmYWxzZVxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICdhY3RpdmVQcm9ncmVzc1NsaWRlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVQcm9ncmVzc1NsaWRlclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVQcm9ncmVzc1NsaWRlciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhY3RpdmVWaWRlb1BsYXllcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVWaWRlb1BsYXllclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVWaWRlb1BsYXllciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhY3RpdmVEcmFnJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZURyYWdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlRHJhZyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhY3RpdmVQbGF5aW5nJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZVBsYXlpbmdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlUGxheWluZyA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdHNlbGVjdEN1cnJlbnRQbGF5aW5nVmlkZW86ICgpID0+XG5cdFx0Y3VycmVudGx5Tm90UGxheWluZyA9IHRydWVcblxuXHRcdGZvciBpdGVtIGluIEB2aWRlb1NsaWRlc1xuXHRcdFx0aWYgaXRlbSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0Y3VycmVudGx5Tm90UGxheWluZyA9IGZhbHNlXG5cdFx0XHRcdEBhY3RpdmVQcm9ncmVzc1NsaWRlciA9IEBjdXJyZW50UGFnZS5wbGF5ZXJTbGlkZXJcblx0XHRcdFx0QGFjdGl2ZVZpZGVvUGxheWVyID0gQGN1cnJlbnRQYWdlLnZpZGVvVmlldy5wbGF5ZXJcblx0XHRcblx0XHRpZiBjdXJyZW50bHlOb3RQbGF5aW5nXG5cdFx0XHRAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgPSBudWxsXG5cdFx0XHRAYWN0aXZlVmlkZW9QbGF5ZXIgPSBudWxsXG4iLCJcbntTbGlkZXIzfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjNcIlxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjQgZXh0ZW5kcyBTbGlkZXIzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgLT5cblx0XHRcdEB1cGRhdGVDdXJyZW50UGFnZSgpXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdEBwYXJlbnQuc2xpZGVDaGFuZ2VyVmlldy5wYWdlcyA9IEBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdEBwYXJlbnQudXBkYXRlQ3VycmVudFBhZ2UoKVxuXHRcdFxuXHRcblx0XG5cdFxuXHR1cGRhdGVDdXJyZW50UGFnZTogKCkgPT5cblx0XHRpZiAhQGlzR3JpZCgpXG5cdFx0XHRmb3IgaXRlbSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdFx0aWYgaXRlbSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0XHRAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IGluZGV4XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcblxuXHRcdEBwYXVzZUJhY2tncm91bmRWaWRlb3MoKVxuXHRcdEB1cGRhdGVDdXJyZW50UGFnZVNsaWRlcigpXG5cblx0XHRpZiAhQGlzR3JpZCgpIHRoZW4gQHBsYXlBY3RpdmVWaWRlbygpXG5cdFx0XHRcblx0XG5cblxuXHRwbGF5QWN0aXZlVmlkZW86ICgpID0+XG5cdFx0Zm9yIGN1cnJlbnRWaWRlb1NsaWRlIGluIEB2aWRlb1NsaWRlc1xuXHRcdFx0aWYgY3VycmVudFZpZGVvU2xpZGUgPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdGN1cnJlbnRWaWRlb1NsaWRlLnBsYXkoKVxuXHRcdFx0XHRyZXR1cm5cblxuXG5cdHBhdXNlVmlkZW9zOiAoKSA9PlxuXHRcdGZvciBjdXJyZW50VmlkZW9TbGlkZSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGN1cnJlbnRWaWRlb1NsaWRlLnBhdXNlKClcblxuXG5cdHBhdXNlQmFja2dyb3VuZFZpZGVvczogKCkgPT5cblx0XHRmb3IgY3VycmVudFZpZGVvU2xpZGUgaW4gQHZpZGVvU2xpZGVzXG5cdFx0XHRpZiBjdXJyZW50VmlkZW9TbGlkZSAhPSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0Y3VycmVudFZpZGVvU2xpZGUucGF1c2UoKVxuXHRcblx0c2hvd0dyaWRDYW5jZWxCdXR0b246ICgpID0+XG5cdFx0QHNsaWRlQ2hhbmdlclZpZXcuY3VycmVudCA9IC0xXG5cdFxuXHR1cGRhdGVDdXJyZW50UGFnZVNsaWRlcjogKCkgPT5cblx0XHRpZiBAaXNHcmlkKClcblx0XHRcdEBzaG93R3JpZENhbmNlbEJ1dHRvbigpXG5cdFx0XHRyZXR1cm5cblx0XHRcblx0XHRmb3IgaXRlbSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGlmIGl0ZW0gPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdEBzbGlkZUNoYW5nZXJWaWV3LmN1cnJlbnQgPSAoaW5kZXggKyAxKVxuXHRcdFx0XHRyZXR1cm4iLCJcblxue1NsaWRlcjJ9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMlwiXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyMyBleHRlbmRzIFNsaWRlcjJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBpbml0U2hvcnRjdXRzKClcblx0XG5cdFxuXHRpbml0U2hvcnRjdXRzOiAoKSA9PlxuXHRcdGxvY2FsU2Nyb2xsID0gQFxuXHRcdFxuXHRcdEV2ZW50cy53cmFwKHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSAtPlxuXHRcdFx0XG5cdFx0XHRpZiBldmVudC5jb2RlIGlzIFwiQXJyb3dMZWZ0XCJcblx0XHRcdFx0aWYgIWxvY2FsU2Nyb2xsLmlzR3JpZCgpXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuc25hcFRvTmV4dFBhZ2UoXCJsZWZ0XCIsIGZhbHNlKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd1JpZ2h0XCJcblx0XHRcdFx0aWYgIWxvY2FsU2Nyb2xsLmlzR3JpZCgpXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuc25hcFRvTmV4dFBhZ2UoXCJyaWdodFwiLCBmYWxzZSlcblx0XHRcdFxuXG5cblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUNcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5jb3B5QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlSXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwucmVzdGFydEJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFxuXG5cblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUZcIlxuXHRcdFx0XHRpZiAhbG9jYWxTY3JvbGwuaXNHcmlkKClcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb0dyaWQoKVxuXHRcdFx0XHRcdFV0aWxzLmRlbGF5IDAuMzYsID0+XG5cdFx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlBXCJcblx0XHRcdFx0aWYgbG9jYWxTY3JvbGwuZ3JpZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwid2luZG93XCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvR3JpZCgpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XHRcdFV0aWxzLmRlbGF5IDAuMzYsID0+XG5cdFx0XHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvR3JpZCgpXG5cblx0XHRcdFxuXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJFc2NhcGVcIlxuXHRcdFx0XHRpZiBsb2NhbFNjcm9sbC5ncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XHRlbHNlIGlmIGxvY2FsU2Nyb2xsLmlzR3JpZCgpXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb0dyaWQoKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJTcGFjZVwiXG5cdFx0XHRcdHRyeSBsb2NhbFNjcm9sbC5jdXJyZW50UGFnZS50b2dnbGVQbGF5KClcblx0IiwiXG57U2xpZGVyMX0gPSByZXF1aXJlIFwiUENTbGlkZXIxXCJcblxuXG5TbGlkZVRlbXBsYXRlID0gcmVxdWlyZShcIlBDU2xpZGVcIilcblNsaWRlID0gU2xpZGVUZW1wbGF0ZS5TbGlkZVxuU2ltcGxlVmlkZW9TbGlkZSA9IFNsaWRlVGVtcGxhdGUuU2ltcGxlVmlkZW9TbGlkZVxuVmlkZW9TbGlkZSA9IFNsaWRlVGVtcGxhdGUuVmlkZW9TbGlkZVxuSERWaWRlb1NsaWRlID0gU2xpZGVUZW1wbGF0ZS5IRFZpZGVvU2xpZGVcblxuUHJvdG90eXBlU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlByb3RvdHlwZVNsaWRlXG5cblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIyIGV4dGVuZHMgU2xpZGVyMVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWRlb1NsaWRlczogW11cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblx0QGRlZmluZSAndmlkZW9TbGlkZXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlkZW9TbGlkZXNcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRzbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0cmV0dXJuIHNsaWRlXG5cblxuXG5cdGJnVmlkZW9TbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgU2ltcGxlVmlkZW9TbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFxuXHRcdGlmIHNvdXJjZVVSTCAhPSBudWxsIHRoZW4gc2xpZGUuc291cmNlKHNvdXJjZVVSTClcblx0XHRAdmlkZW9TbGlkZXMucHVzaCBzbGlkZVxuXHRcdHJldHVybiBzbGlkZVxuXHRcblx0dmlkZW9TbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgSERWaWRlb1NsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0aWYgc291cmNlVVJMICE9IG51bGwgdGhlbiBzbGlkZS5zb3VyY2Uoc291cmNlVVJMKVxuXHRcdEB2aWRlb1NsaWRlcy5wdXNoIHNsaWRlXG5cdFx0cmV0dXJuIHNsaWRlXG5cblx0ZnVsbFZpZGVvU2xpZGU6IChzb3VyY2VVUkwgPSBudWxsKSA9PlxuXHRcdHNsaWRlID0gbmV3IFZpZGVvU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0QHZpZGVvU2xpZGVzLnB1c2ggc2xpZGVcblx0XHRyZXR1cm4gc2xpZGVcblxuXHRcblx0XG5cdFxuXHRcblx0XG5cblxuXHRwcm90b3R5cGVTbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgUHJvdG90eXBlU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0cmV0dXJuIHNsaWRlIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG57U2xpZGVyMH0gPSByZXF1aXJlIFwiUENTbGlkZXIwXCJcbiMge1NsaWRlclBpbmNofSA9IHJlcXVpcmUgXCJQQ1NsaWRlclBpbmNoXCJcbntTbGlkZUNoYW5nZXJ9ID0gcmVxdWlyZSBcIlBDU2xpZGVDaGFuZ2VyXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHQgPSBCdXR0b25zLlRleHRcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5Db3B5QnV0dG9uID0gQnV0dG9ucy5Db3B5QnV0dG9uXG5cblxuIyBQYW5lbHNcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIxIGV4dGVuZHMgU2xpZGVyMFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAdG9wVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAY2FudmFzLCBuYW1lOiBcInRvcFZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQGNhbnZhcy53aWR0aCwgaGVpZ2h0OiA1NlxuXHRcdFxuXHRcdEBib3R0b21WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBjYW52YXMsIG5hbWU6IFwiYm90dG9tVmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAY2FudmFzLndpZHRoLCBoZWlnaHQ6IDU2LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcblx0XHRmb3IgaXRlbSBpbiBbQHRvcFZpZXcsIEBib3R0b21WaWV3XVxuXHRcdFx0aXRlbS5zZW5kVG9CYWNrKClcblx0XHRcdGl0ZW0uc3RhdGVzID1cblx0XHRcdFx0XCJ3aW5kb3dcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0IyBUb3AgVmlld1xuXHRcdEBsb2dvQnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJsb2dvXCJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMiwgYXNzZXQ6IFNWRy5sb2dvSWNvblxuXHRcdFx0aGFuZGxlcjogQG9wZW5VUkxIb21lXG5cdFx0XG5cdFx0QHRpdGxlVGV4dCA9IG5ldyBUZXh0XG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcInRpdGxlXCJcblx0XHRcdHRleHQ6IEB0aXRsZSwgdGV4dEFsaWduOiBcImNlbnRlclwiLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG5cdFx0XG5cdFx0QGNvcHlCdXR0b24gPSBuZXcgQ29weUJ1dHRvblxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJjb3B5IGxpbmtcIlxuXHRcdFx0dGV4dDogXCJDb3B5IExpbmtcIiwgdGV4dEFsaWduOiBcInJpZ2h0XCIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y3VzdG9tOiB7IHg6IC00MC0yMC0yNCB9XG5cdFx0XHRsaW5rOiB3aW5kb3cubG9jYXRpb25cblx0XHRcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiZnVsbHNjcmVlblwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgYXNzZXQ6IFNWRy5mdWxsc2NyZWVuSWNvblxuXHRcdFx0aGFuZGxlcjogQGNoYW5nZVNjYWxlXG5cdFx0XHRjdXN0b206IHsgeDogLTM2IH1cblx0XHRcblxuXG5cblx0XHQjIEJvdHRvbSBWaWV3XG5cdFx0QHNsaWRlQ2hhbmdlclZpZXcgPSBuZXcgU2xpZGVDaGFuZ2VyXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInNsaWRlIGNoYW5nZXJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XHRzbGlkZXI6IEBcblx0XHRcblx0XHRAcmVzdGFydEJ1dHRvbiA9IG5ldyBUZXh0QnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInJlc3RhcnRcIlxuXHRcdFx0dGV4dDogXCJSZXN0YXJ0IChSKVwiLCB0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTIwMDApLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhhbmRsZXI6IEByZXN0YXJ0SGFuZGxlclxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0yMDAwIH1cblx0XHRcblx0XHRcblxuXG5cdFx0QHVwZGF0ZVZpZXdCdWlsZGVyU2l6ZShAY2FudmFzKVxuXHRcdEBjYW52YXMub24gXCJjaGFuZ2U6c2l6ZVwiLCA9PlxuXHRcdFx0QHVwZGF0ZVZpZXdCdWlsZGVyU2l6ZShAY2FudmFzKVxuXHRcdFxuXHRcdFxuXHRcblxuXHR1cGRhdGVWaWV3QnVpbGRlclNpemU6IChhbmNob3IpID0+XG5cdFx0XG5cdFx0QHRvcFZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcblx0XHRpZiBhbmNob3Iud2lkdGggPCA3NDBcblx0XHRcdEB0aXRsZVRleHQud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcdEB0aXRsZVRleHQudGV4dEFsaWduID0gXCJsZWZ0XCJcblx0XHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEB0aXRsZVRleHQueSA9IEFsaWduLnRvcChAdG9wVmlldy5oZWlnaHQgKyAxMClcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEBjb3B5QnV0dG9uLnkgPSBBbGlnbi50b3AoQHRvcFZpZXcuaGVpZ2h0ICsgMzYpXG5cdFx0ZWxzZVxuXHRcdFx0QHRpdGxlVGV4dC53aWR0aCA9IGFuY2hvci53aWR0aCAvIDJcblx0XHRcdEB0aXRsZVRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIlxuXHRcdFx0QHRpdGxlVGV4dC54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRAdGl0bGVUZXh0LnkgPSBBbGlnbi5jZW50ZXIoMilcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLnJpZ2h0KEBjb3B5QnV0dG9uLmN1c3RvbS54KVxuXHRcdFx0QGNvcHlCdXR0b24ueSA9IEFsaWduLmNlbnRlcigyKVxuXHRcdFxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uLnggPSBBbGlnbi5yaWdodChAZnVsbHNjcmVlbkJ1dHRvbi5jdXN0b20ueClcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbi55ID0gQWxpZ24uY2VudGVyKDIpXG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRAc2xpZGVDaGFuZ2VyVmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0IyBoZWlnaHRcblx0XHRAYm90dG9tVmlldy55ID0gQWxpZ24uYm90dG9tIiwiXG5cbiMgU2NhbGUgJiBVUkwgaGFuZGxpbmdcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIwIGV4dGVuZHMgUGFnZUNvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdGNhbnZhc0JhY2tncm91bmRMYXllciA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdG5hbWU6IFwiYmFja2dyb3VuZExheWVyXCJcblx0XHRcblxuXG5cdFx0Y2FudmFzTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY2FudmFzXCJcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsb2NhbFNjcm9sbDogbnVsbFxuXHRcdFxuXHRcdGNhbnZhc0xheWVyLnN0YXRlcyA9XG5cdFx0XHRcIndpbmRvd1wiOiB7IGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIgfVxuXHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgYmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIiB9XG5cblxuXHRcdCMgTGVnYWN5XG5cdFx0bGVnYWN5U2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBjYW52YXNMYXllclxuXHRcdFx0bmFtZTogXCJncmlkXCJcblx0XHRcdHdpZHRoOiAxNDAwICogMiwgaGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2UsIHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGlnbm9yZUV2ZW50czogdHJ1ZVxuXHRcdFxuXHRcdGxlZ2FjeVNjcm9sbC5zdGF0ZXMgPVxuXHRcdFx0XCJ3aW5kb3dcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZ1bGxzY3JlZW5cIjogeyBzY2FsZTogMSB9XG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRjYW52YXM6IGNhbnZhc0xheWVyXG5cdFx0XHRncmlkOiBsZWdhY3lTY3JvbGxcblx0XHRcdGJhY2tncm91bmRMYXllcjogY2FudmFzQmFja2dyb3VuZExheWVyXG5cdFxuXHRcdFx0cGFyZW50OiBsZWdhY3lTY3JvbGwuY29udGVudFxuXHRcdFx0d2lkdGg6IGxlZ2FjeVNjcm9sbC53aWR0aCwgaGVpZ2h0OiBsZWdhY3lTY3JvbGwuaGVpZ2h0XG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2UsIHNjcm9sbEhvcml6b250YWw6IHRydWVcblx0XHRcdHByZXNlbnRhdGlvblRpdGxlOiBcIlVudGl0bGVkXCJcblx0XHRcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY29udGVudC5kcmFnZ2FibGUucHJvcGFnYXRlRXZlbnRzID0gZmFsc2VcblxuXHRcdEZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmRpc2FibGUoKVxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXHRcdFxuXHRcdEBpbml0U2NhbGUoKVxuXHRcdFxuXHRcdEB1cGRhdGVTaXplKClcblx0XHRAYmFja2dyb3VuZExheWVyLm9uIFwiY2hhbmdlOnNpemVcIiwgPT5cblx0XHRcdEB1cGRhdGVTaXplKClcblx0XHRcblxuXG5cdFxuXG5cdEBkZWZpbmUgJ3RpdGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByZXNlbnRhdGlvblRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByZXNlbnRhdGlvblRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2NhbnZhcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jYW52YXNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuY2FudmFzID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dyaWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZ3JpZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2JhY2tncm91bmRMYXllcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5iYWNrZ3JvdW5kTGF5ZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYmFja2dyb3VuZExheWVyID0gdmFsdWVcblx0XG5cdFxuXHRcblxuXHQjIGlzR3JpZDogKCkgPT5cblx0IyBcdHJldHVybiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImdyaWRcIlxuXHRcblx0dXBkYXRlU2l6ZTogKCkgPT5cblx0XHRAaW5pdFNjYWxlKEBncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFxuXHRpbml0U2NhbGU6IChmb3JTdGF0ZSA9IFwid2luZG93XCIpID0+XG5cdFx0QGNhbnZhcy53aWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdEBjYW52YXMuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXG5cdFx0c2NhbGVYID0gKFNjcmVlbi53aWR0aCAtIDIwKSAvIEBncmlkLndpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGdyaWQuaGVpZ2h0XG5cdFx0QGdyaWQuc3RhdGVzLndpbmRvdy5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdHNjYWxlWCA9IFNjcmVlbi53aWR0aCAvIEBncmlkLndpZHRoXG5cdFx0c2NhbGVZID0gU2NyZWVuLmhlaWdodCAvIEBncmlkLmhlaWdodFxuXHRcdEBncmlkLnN0YXRlcy5mdWxsc2NyZWVuLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFx0XG5cdFx0QGdyaWQuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0QGNhbnZhcy5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRAZ3JpZC5jZW50ZXIoKVxuXHRcblx0XG5cdCMgZm9yIHJlYWN0XG5cdGNoYW5nZVNjYWxlOiAoKSA9PlxuXHRcdFxuXHRcdGlmIEBncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJ3aW5kb3dcIiB0aGVuIG5leHRTdGF0ZSA9IFwiZnVsbHNjcmVlblwiXG5cdFx0ZWxzZSBuZXh0U3RhdGUgPSBcIndpbmRvd1wiXG5cdFx0XG5cdFx0QGdyaWQuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAY2FudmFzLmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QHRvcFZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAYm90dG9tVmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblxuXHRyZXN0YXJ0SGFuZGxlcjogKCkgPT5cblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlblswXSwgZmFsc2UpXG5cdFxuXHRcblx0b3BlblVSTDogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCIsIGlzQmxhbmsgPSBmYWxzZSkgPT5cblx0XHRpZiBpc0JsYW5rIHRoZW4gd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuXHRcdGVsc2VcbiMgXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIj9zbGlkZUlEXCJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybFxuXHRcblx0b3BlblVSTEhvbWU6ID0+XG5cdFx0QG9wZW5VUkwoXCJodHRwczovL3RpbGxsdXIucnVcIiwgZmFsc2UpXG5cbiIsIlxuXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuIyBUZXh0ID0gQnV0dG9ucy5UZXh0XG5UZXh0QnV0dG9uID0gQnV0dG9ucy5UZXh0QnV0dG9uXG5TVkdCdXR0b24gPSBCdXR0b25zLlNWR0J1dHRvblxuXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVDaGFuZ2VyIGV4dGVuZHMgTGF5ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG5hbWU6IFwicHJvZ3Jlc3Mgdmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiAxMjBcblx0XHRcdGhlaWdodDogNTZcblx0XHRcdHBhZ2VzOiAxXG5cdFx0XHRjdXJyZW50OiAxXG5cdFx0XHRzbGlkZXI6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdHRlc3RIYWRsZXIgPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0dHJ5IEBwYXJlbnQuc2xpZGVyLnBpbmNoVG9HcmlkKClcblxuXG5cdFx0QGN1cnJlbnRUZXh0ID0gbmV3IFRleHRCdXR0b25cblx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIiwgd2lkdGg6IDEyMCwgbGV0dGVyU3BhY2luZzogM1xuXHRcdFx0aGFuZGxlcjogdGVzdEhhZGxlclxuXHRcdFxuXHRcdEBjdXJyZW50VGV4dC51cGRhdGVUdXBsZSh7IG5vcm1hbDogMSwgaG92ZXI6IDAuOCB9KVxuXG5cdFx0QHByZXZCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRuYW1lOiBcInByZXZcIiwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBhc3NldDogU1ZHLnByZXZJY29uXG5cdFx0XHRoYW5kbGVyOiBAbW92ZUxlZnRcblx0XHRcblx0XHRAbmV4dEJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwibmV4dFwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcubmV4dEljb25cblx0XHRcdGhhbmRsZXI6IEBtb3ZlUmlnaHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBjdXJyZW50VGV4dC5wYXJlbnQgPSBAXG5cdFx0QGN1cnJlbnRUZXh0LnkgPSBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0QGN1cnJlbnRUZXh0LnN0eWxlID1cblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwidG51bVwiXG5cdFx0XHRcImZvbnQtdmFyaWFudC1udW1lcmljXCI6IFwidGFidWxhci1udW1zIGxpbmluZy1udW1zXCJcblx0XHRcblx0XHRAcHJldkJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QHByZXZCdXR0b24ueCA9IEFsaWduLmxlZnRcblx0XHRAcHJldkJ1dHRvbi55ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0QG5leHRCdXR0b24ucGFyZW50ID0gQFxuXHRcdEBuZXh0QnV0dG9uLnggPSBBbGlnbi5yaWdodFxuXHRcdEBuZXh0QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XG5cdEBkZWZpbmUgJ3NsaWRlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zbGlkZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNsaWRlciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwYWdlcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wYWdlc1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMucGFnZXMgPSB2YWx1ZVxuXHRcdFx0QGN1cnJlbnRUZXh0LnRleHQgPSBcIiN7QGN1cnJlbnR9LyN7QHBhZ2VzfVwiXG5cblx0QGRlZmluZSAnY3VycmVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jdXJyZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5jdXJyZW50ID0gdmFsdWVcblxuXHRcdFx0aWYgQGN1cnJlbnQgIT0gLTFcblx0XHRcdFx0IyB0aGVuIEBwYXJlbnQuYW5pbWF0ZShvcGFjaXR5OiAwLCBjdXJ2ZTogU3ByaW5nKGRhbXJwaW5nOiAxKSwgdGltZTogMC40KVxuXHRcdFx0IyBlbHNlXG5cdFx0XHRcdCMgQHBhcmVudC5hbmltYXRlKG9wYWNpdHk6IDEsIGN1cnZlOiBTcHJpbmcoZGFtcnBpbmc6IDEpLCB0aW1lOiAwLjQpXG5cdFx0XHRcdEBjdXJyZW50VGV4dC50ZXh0ID0gXCIje0BjdXJyZW50fS8je0BwYWdlc31cIlxuXHRcdFx0XG5cdFxuXG5cblxuXHRtb3ZlTGVmdDogKCkgPT5cbiMgXHRcdHByaW50IEBzbGlkZXJcblx0XHRAc2xpZGVyLnNuYXBUb05leHRQYWdlKFwibGVmdFwiLCBmYWxzZSlcblx0XG5cdG1vdmVSaWdodDogKCkgPT5cbiMgXHRcdHByaW50IEBzbGlkZXJcblx0XHRAc2xpZGVyLnNuYXBUb05leHRQYWdlKFwicmlnaHRcIiwgZmFsc2UpIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmNvbG9yX29uRGFyayA9IFwiI2ZmZlwiXG5jb2xvcl9vbkxpZ2h0ID0gXCIjMDAwXCJcblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuXG5leHBvcnRzLmxvZ29JY29uID0geyBvbkRhcms6IGdldExvZ28oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0TG9nbyhjb2xvcl9vbkxpZ2h0KX1cblxuXG5cbmdldEZ1bGxzY3JlZW4gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMTEuMDQxIDIuOTIxNjRDMTEuMDQxIDMuNDQ0NzMgMTEuNDIyNSAzLjgzNDk4IDExLjk1MzMgMy44MzQ5OEgxMi41NDIzTDE1LjExMzUgMy42NjA2MUwxMy4wOTggNS41Nzg2MkwxMC43MDkyIDcuOTUzM0MxMC41MjY3IDguMTI3NjYgMTAuNDQzOCA4LjM1MTg0IDEwLjQ0MzggOC41OTI2M0MxMC40NDM4IDkuMTU3MjQgMTAuODI1MyA5LjU2NDA5IDExLjM4OTMgOS41NjQwOUMxMS42NDY0IDkuNTY0MDkgMTEuODcwNCA5LjQ2NDQ1IDEyLjA1MjkgOS4yOTAwOUwxNC40MzM0IDYuOTA3MTFMMTYuMzQxMSA0Ljg4MTE2TDE2LjE2NjkgNy40NzE3MlY4LjExOTM2QzE2LjE2NjkgOC42NDI0NSAxNi41NDg1IDkuMDQxIDE3LjA3OTMgOS4wNDFDMTcuNjEwMiA5LjA0MSAxOCA4LjY1MDc1IDE4IDguMTE5MzZWMy41MTExNkMxOCAyLjU1NjMxIDE3LjQ0NDMgMiAxNi40OTA0IDJMMTEuOTUzMyAyQzExLjQzMDggMiAxMS4wNDEgMi4zOTAyNCAxMS4wNDEgMi45MjE2NFpNMiAxMS44ODA2TDIgMTYuNDg4OEMyIDE3LjQ0MzcgMi41NTU3MyAxOCAzLjUwOTU5IDE4SDguMDQ2NjZDOC41NjkyMSAxOCA4Ljk1OTA1IDE3LjYwMTUgOC45NTkwNSAxNy4wNzg0QzguOTU5MDUgMTYuNTU1MyA4LjU3NzUgMTYuMTY1IDguMDQ2NjYgMTYuMTY1SDcuNDU3NzVMNC44ODY0NyAxNi4zMzk0TDYuOTAyMDIgMTQuNDIxNEw5LjI5MDgyIDEyLjA0NjdDOS40NzMzIDExLjg3MjMgOS41NTYyNSAxMS42NDgyIDkuNTU2MjUgMTEuMzk5MUM5LjU1NjI1IDEwLjgzNDUgOS4xNzQ3IDEwLjQyNzYgOC42MTA2OCAxMC40Mjc2QzguMzUzNTUgMTAuNDI3NiA4LjEyMTMxIDEwLjUyNzIgNy45NDcxMiAxMC43MDk5TDUuNTY2NjIgMTMuMDkyOUwzLjY1ODg5IDE1LjExODhMMy44MzMwNyAxMi41MjgzTDMuODMzMDcgMTEuODgwNkMzLjgzMzA3IDExLjM0OTIgMy40NTE1MyAxMC45NTkgMi45MjA2OCAxMC45NTlDMi4zODk4NCAxMC45NTkgMiAxMS4zNDkyIDIgMTEuODgwNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5mdWxsc2NyZWVuSWNvbiA9IHsgb25EYXJrOiBnZXRGdWxsc2NyZWVuKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldEZ1bGxzY3JlZW4oY29sb3Jfb25MaWdodCl9XG5cblxuXG5cbmdldE5leHQgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNC43OTY0IDEyLjc5MzFMOS41ODYyNyA4TDQuNzk2NCAzLjIwNjg3QzQuNDA2MDEgMi44MTYyMSA0LjQwNjIyIDIuMTgzMDQgNC43OTY4OCAxLjc5MjY1QzUuMTg3NTQgMS40MDIyNiA1LjgyMDcgMS40MDI0OCA2LjIxMTA5IDEuNzkzMTNMMTEuNzA3MyA3LjI5MzEzQzEyLjA5NzUgNy42ODM2IDEyLjA5NzUgOC4zMTY0IDExLjcwNzMgOC43MDY4N0w2LjIxMTA5IDE0LjIwNjlDNS44MjA3IDE0LjU5NzUgNS4xODc1NCAxNC41OTc3IDQuNzk2ODggMTQuMjA3M0M0LjQwNjIyIDEzLjgxNyA0LjQwNjAxIDEzLjE4MzggNC43OTY0IDEyLjc5MzFaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMubmV4dEljb24gPSB7IG9uRGFyazogZ2V0TmV4dChjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXROZXh0KGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFByZXYgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNi40MTc0OCA4TDExLjIwNzMgMTIuNzkzMUMxMS41OTc3IDEzLjE4MzggMTEuNTk3NSAxMy44MTcgMTEuMjA2OSAxNC4yMDczQzEwLjgxNjIgMTQuNTk3NyAxMC4xODMgMTQuNTk3NSA5Ljc5MjY1IDE0LjIwNjlMNC4yOTY0IDguNzA2ODdDMy45MDYyIDguMzE2NCAzLjkwNjIgNy42ODM2IDQuMjk2NCA3LjI5MzEzTDkuNzkyNjUgMS43OTMxM0MxMC4xODMgMS40MDI0OCAxMC44MTYyIDEuNDAyMjYgMTEuMjA2OSAxLjc5MjY1QzExLjU5NzUgMi4xODMwNCAxMS41OTc3IDIuODE2MjEgMTEuMjA3MyAzLjIwNjg3TDYuNDE3NDggOFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wcmV2SWNvbiA9IHsgb25EYXJrOiBnZXRQcmV2KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFByZXYoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0UGxheSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiB2aWV3Qm94PVwiMCAwIDE4MCAxODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxjaXJjbGUgb3BhY2l0eT1cIjAuNVwiIGN4PVwiOTBcIiBjeT1cIjkwXCIgcj1cIjkwXCIgZmlsbD1cIiMwMDBcIi8+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNzYuNzE1OCA1OC40OTE0QzczLjA1MTMgNTYuMjM2NCA2OC4zMzM0IDU4Ljg3MjkgNjguMzMzNCA2My4xNzU2VjExNi44MjRDNjguMzMzNCAxMjEuMTI3IDczLjA1MTUgMTIzLjc2MyA3Ni43MTYgMTIxLjUwOEwxMjMuOTcyIDk0LjY4MjZDMTI3LjQ2MiA5Mi41MzQ5IDEyNy40NjIgODcuNDYxOSAxMjMuOTcyIDg1LjMxNDNMNzYuNzE1OCA1OC40OTE0WlwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGwtb3BhY2l0eT1cIjAuOFwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5SWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXkoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFBhdXNlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPGNpcmNsZSBvcGFjaXR5PVwiMC41XCIgY3g9XCI5MFwiIGN5PVwiOTBcIiByPVwiOTBcIiBmaWxsPVwiIzAwMFwiLz5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03MCA1NkM2NS41ODE3IDU2IDYyIDU5LjU4MTcgNjIgNjRWMTE2QzYyIDEyMC40MTggNjUuNTgxNyAxMjQgNzAgMTI0SDc2QzgwLjQxODMgMTI0IDg0IDEyMC40MTggODQgMTE2VjY0Qzg0IDU5LjU4MTcgODAuNDE4MyA1NiA3NiA1Nkg3MFpNMTA0IDU2Qzk5LjU4MTcgNTYgOTYgNTkuNTgxNyA5NiA2NFYxMTZDOTYgMTIwLjQxOCA5OS41ODE3IDEyNCAxMDQgMTI0SDExMEMxMTQuNDE4IDEyNCAxMTggMTIwLjQxOCAxMTggMTE2VjY0QzExOCA1OS41ODE3IDExNC40MTggNTYgMTEwIDU2SDEwNFpcIiBmaWxsPVwid2hpdGVcIiBmaWxsLW9wYWNpdHk9XCIwLjhcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGF1c2VJY29uID0geyBvbkRhcms6IGdldFBhdXNlKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBhdXNlKGNvbG9yX29uTGlnaHQpIH1cblxuXG5nZXRWaWRlb1NsaWRlciA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIzNjhcIiBoZWlnaHQ9XCIxMTJcIiB2aWV3Qm94PVwiMCAwIDM2OCAxMTJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxyZWN0IG9wYWNpdHk9XCIwLjNcIiB3aWR0aD1cIjM2OFwiIGhlaWdodD1cIjExMlwiIHJ4PVwiNTZcIiBmaWxsPVwiIzAwMFwiLz5cbjxyZWN0IG9wYWNpdHk9XCIwLjVcIiB4PVwiMzRcIiB5PVwiNTJcIiB3aWR0aD1cIjMwMFwiIGhlaWdodD1cIjhcIiByeD1cIjRcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMudmlkZW9TbGlkZXJJY29uID0geyBvbkRhcms6IGdldFZpZGVvU2xpZGVyKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFZpZGVvU2xpZGVyKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFNoYXJlUHJvdG90eXBlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHJlY3Qgb3BhY2l0eT1cIjAuM1wiIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgcng9XCI5MFwiIGZpbGw9XCIjMDAwXCIvPlxuPGcgb3BhY2l0eT1cIjAuNlwiPlxuPHBhdGggZD1cIk0xMDEuNjcgNTcuNzU4Nkg4MC4xNzYyQzc2LjgzMTIgNTcuNzU4NiA3NC4wMjE2IDYwLjA1MDkgNzMuMjMyNSA2My4xNTAzQzcyLjk4ODUgNjQuMTA4OSA3Mi4yMDk1IDY0LjkyMzMgNzEuMjIwMyA2NC45MjMzSDY3LjYzNzlDNjYuNjQ4NiA2NC45MjMzIDY1LjgzNDkgNjQuMTE3NCA2NS45NTcxIDYzLjEzNTdDNjYuODM3IDU2LjA2NTQgNzIuODY3NiA1MC41OTM4IDgwLjE3NjIgNTAuNTkzOEgxMDEuNjdDMTA5LjU4NCA1MC41OTM4IDExNiA1Ny4wMDk0IDExNiA2NC45MjMzVjExNS4wNzdDMTE2IDEyMi45OTEgMTA5LjU4NCAxMjkuNDA2IDEwMS42NyAxMjkuNDA2SDgwLjE3NjJDNzIuODY3NiAxMjkuNDA2IDY2LjgzNyAxMjMuOTM1IDY1Ljk1NzEgMTE2Ljg2NEM2NS44MzQ5IDExNS44ODMgNjYuNjQ4NiAxMTUuMDc3IDY3LjYzNzkgMTE1LjA3N0g3MS4yMjAzQzcyLjIwOTUgMTE1LjA3NyA3Mi45ODg1IDExNS44OTEgNzMuMjMyNSAxMTYuODVDNzQuMDIxNiAxMTkuOTQ5IDc2LjgzMTIgMTIyLjI0MSA4MC4xNzYyIDEyMi4yNDFIMTAxLjY3QzEwNS42MjcgMTIyLjI0MSAxMDguODM1IDExOS4wMzQgMTA4LjgzNSAxMTUuMDc3VjY0LjkyMzNDMTA4LjgzNSA2MC45NjYzIDEwNS42MjcgNTcuNzU4NiAxMDEuNjcgNTcuNzU4NlpcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTY5LjI2NDcgMTAxLjgwNUw3OC42MDA0IDkyLjQ2MjlINDkuODM3OUM0OC40Nzc3IDkyLjQ2MjkgNDcuMzc1IDkxLjM2MDIgNDcuMzc1IDkwQzQ3LjM3NSA4OC42Mzk4IDQ4LjQ3NzcgODcuNTM3MSA0OS44Mzc5IDg3LjUzNzFINzguNjAwNEw2OS4yNjQ3IDc4LjE5NTFDNjguMzAzMiA3Ny4yMzI5IDY4LjMwMzggNzUuNjczNSA2OS4yNjU5IDc0LjcxMkM3MC4yMjggNzMuNzUwNSA3MS43ODc1IDczLjc1MTEgNzIuNzQ5IDc0LjcxMzJMODYuMjg1NiA4OC4yNTkxQzg3LjI0NjYgODkuMjIwOCA4Ny4yNDY2IDkwLjc3OTMgODYuMjg1NiA5MS43NDA5TDcyLjc0OSAxMDUuMjg3QzcxLjc4NzUgMTA2LjI0OSA3MC4yMjggMTA2LjI0OSA2OS4yNjU5IDEwNS4yODhDNjguMzAzOCAxMDQuMzI3IDY4LjMwMzIgMTAyLjc2NyA2OS4yNjQ3IDEwMS44MDVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9nPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnNoYXJlUHJvdG90eXBlSWNvbiA9IHsgb25EYXJrOiBnZXRTaGFyZVByb3RvdHlwZShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRTaGFyZVByb3RvdHlwZShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5cblxuXG5cblxuXG4jIFAgTCBBIFkgRSBSIOKAlCBJIEMgTyBOIFNcblxuZ2V0UGxheWVyUGxheSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgdmlld0JveD1cIjAgMCA4MCA4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTI4LjM0OTQgMTguNTY2M0MyNS44MzI0IDE3LjAxNzUgMjIuNTkxOCAxOC44MjgzIDIyLjU5MTggMjEuNzgzN0wyMi41OTE4IDU4LjYzMjRDMjIuNTkxOCA2MS41ODc4IDI1LjgzMjUgNjMuMzk4NyAyOC4zNDk1IDYxLjg0OTdMNjAuODA3NSA0My40MjQ1QzYzLjIwNDYgNDEuOTQ5NCA2My4yMDQ1IDM4LjQ2NSA2MC44MDc0IDM2Ljk4OTlMMjguMzQ5NCAxOC41NjYzWlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJQbGF5SWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5ZXJQbGF5KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXllclBsYXkoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFBsYXllclBhdXNlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjYuMzE1OCAxNi43MzY4QzIzLjI5MjggMTYuNzM2OCAyMC44NDIyIDE5LjE4NzUgMjAuODQyMiAyMi4yMTA1VjU3Ljc4OTRDMjAuODQyMiA2MC44MTI1IDIzLjI5MjggNjMuMjYzMSAyNi4zMTU4IDYzLjI2MzFIMzAuNDIxMUMzMy40NDQxIDYzLjI2MzEgMzUuODk0OCA2MC44MTI1IDM1Ljg5NDggNTcuNzg5NVYyMi4yMTA1QzM1Ljg5NDggMTkuMTg3NSAzMy40NDQxIDE2LjczNjggMzAuNDIxMSAxNi43MzY4SDI2LjMxNThaTTQ5LjU3OTMgMTYuNzM2OEM0Ni41NTYyIDE2LjczNjggNDQuMTA1NiAxOS4xODc1IDQ0LjEwNTYgMjIuMjEwNVY1Ny43ODk0QzQ0LjEwNTYgNjAuODEyNSA0Ni41NTYyIDYzLjI2MzEgNDkuNTc5MyA2My4yNjMxSDUzLjY4NDVDNTYuNzA3NiA2My4yNjMxIDU5LjE1ODIgNjAuODEyNSA1OS4xNTgyIDU3Ljc4OTVWMjIuMjEwNUM1OS4xNTgyIDE5LjE4NzUgNTYuNzA3NiAxNi43MzY4IDUzLjY4NDUgMTYuNzM2OEg0OS41NzkzWlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJQYXVzZUljb24gPSB7IG9uRGFyazogZ2V0UGxheWVyUGF1c2UoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyUGF1c2UoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuXG5nZXRQbGF5ZXJTb3VuZCA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgdmlld0JveD1cIjAgMCA4MCA4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk00MCAxNUgzNy41TDI3LjUgMjcuNUgyMEMxOC40NTczIDI3LjUgMTcuNjg2IDI3LjUgMTYuODkzIDI3Ljc3MzhDMTUuOTU5OSAyOC4wOTYgMTQuODYwMSAyOC45NTgzIDE0LjMyNDYgMjkuNzg3NUMxMy44Njk1IDMwLjQ5MjIgMTMuNzI1OSAzMS4wNzY1IDEzLjQzODggMzIuMjQ0OUMxMi44MTY3IDM0Ljc3NjkgMTIuNSAzNy4zODA1IDEyLjUgNDBDMTIuNSA0Mi42MTk1IDEyLjgxNjcgNDUuMjIzMSAxMy40Mzg4IDQ3Ljc1NTFDMTMuNzI1OSA0OC45MjM1IDEzLjg2OTUgNDkuNTA3OCAxNC4zMjQ2IDUwLjIxMjVDMTQuODYwMSA1MS4wNDE3IDE1Ljk1OTkgNTEuOTA0IDE2Ljg5MyA1Mi4yMjYyQzE3LjY4NiA1Mi41IDE4LjQ1NzMgNTIuNSAyMCA1Mi41SDI3LjVMMzcuNSA2NUg0MEM0My4wNSA2NSA0Ni4yNSA1NSA0Ni4yNSAzOS45NTczQzQ2LjI1IDI0LjkxNDcgNDMuMTgzMyAxNSA0MCAxNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTUyLjUgMzkuOTc2M0M1Mi40OTUgMzcuMzQyMyA1MS42NTggMzQuNzc3MiA1MC4xMDg2IDMyLjY0N0w1NC4xNTIxIDI5LjcwNTlDNTYuMzIxMyAzMi42ODggNTcuNDkzIDM2LjI3OTIgNTcuNSAzOS45NjY4QzU3LjUwNyA0My42NTQ0IDU2LjM0ODkgNDcuMjUgNTQuMTkxIDUwLjI0MDRMNTAuMTM2NCA0Ny4zMTQ2QzUxLjY3NzggNDUuMTc4NiA1Mi41MDUgNDIuNjEwMyA1Mi41IDM5Ljk3NjNaXCIgZmlsbD1cIndoaXRlXCIvPlxuPHBhdGggZD1cIk01OC4xOTU1IDI2Ljc2NDdDNjAuOTg0NSAzMC41OTg5IDYyLjQ5MSAzNS4yMTYxIDYyLjUgMzkuOTU3M0M2Mi41MDkgNDQuNjk4NiA2MS4wMiA0OS4zMjE1IDU4LjI0NTYgNTMuMTY2Mkw2Mi4zMDAxIDU2LjA5MjFDNjUuNjkxMSA1MS4zOTI5IDY3LjUxMDkgNDUuNzQyNyA2Ny41IDM5Ljk0NzlDNjcuNDg5IDM0LjE1MyA2NS42NDc3IDI4LjUwOTcgNjIuMjM4OSAyMy44MjM1TDU4LjE5NTUgMjYuNzY0N1pcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGxheWVyU291bmRJY29uID0geyBvbkRhcms6IGdldFBsYXllclNvdW5kKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXllclNvdW5kKGNvbG9yX29uTGlnaHQpIH1cblxuXG5nZXRQbGF5ZXJTb3VuZE9mZiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgdmlld0JveD1cIjAgMCA4MCA4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk00NSAxNUg0Ny41QzUwLjY4MzMgMTUgNTMuNiAyNC43MjIyIDUzLjYgNDBDNTMuNiA0MS43NDA2IDUzLjU2MDQgNDMuNDA5IDUzLjQ4NTggNDQuOTk5MkwzOC4zMjYgMjMuMzQyNEw0NSAxNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTMxLjIzNjMgMjcuNUgyNy41QzI1Ljk1NzMgMjcuNSAyNS4xODYgMjcuNSAyNC4zOTMgMjcuNzczOEMyMy40NTk5IDI4LjA5NiAyMi4zNjAxIDI4Ljk1ODMgMjEuODI0NiAyOS43ODc1QzIxLjM2OTUgMzAuNDkyMiAyMS4yMjU5IDMxLjA3NjUgMjAuOTM4OCAzMi4yNDQ5QzIwLjMxNjcgMzQuNzc2OSAyMCAzNy4zODA1IDIwIDQwQzIwIDQyLjYxOTUgMjAuMzE2NyA0NS4yMjMxIDIwLjkzODggNDcuNzU1MUMyMS4yMjU5IDQ4LjkyMzYgMjEuMzY5NSA0OS41MDc4IDIxLjgyNDYgNTAuMjEyNUMyMi4zNjAxIDUxLjA0MTcgMjMuNDU5OSA1MS45MDQgMjQuMzkzIDUyLjIyNjJDMjUuMTg2IDUyLjUgMjUuOTU3MyA1Mi41IDI3LjUgNTIuNUgzNUw0NSA2NUg0Ny41QzQ5LjE1MDcgNjUgNTAuODAxNCA2Mi4xNTIzIDUxLjk2ODUgNTcuMTE3NUw1Ny41IDY1LjAxOTVINjMuNzVMMjguNzUgMTUuMDE5NUgyMi41TDMxLjIzNjMgMjcuNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGxheWVyU291bmRPZmZJY29uID0geyBvbkRhcms6IGdldFBsYXllclNvdW5kT2ZmKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXllclNvdW5kT2ZmKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldE9wZW5JY29uID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjQ4XCIgaGVpZ2h0PVwiNDhcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTE0LjA4MjEgOS44NDMyOEMxNC4wODIxIDEwLjg4OTUgMTQuODQ1MiAxMS42NyAxNS45MDY5IDExLjY3SDE3LjA4NDdMMzYuMjI3MyAxMS4zMjEyTDMyLjE5NjEgMTUuMTU3MkwxMy40MTg1IDMzLjkwNjZDMTMuMDUzNiAzNC4yNTUzIDEyLjg4NzcgMzQuNzAzNyAxMi44ODc3IDM1LjE4NTNDMTIuODg3NyAzNi4zMTQ1IDEzLjY1MDggMzcuMTI4MiAxNC43Nzg4IDM3LjEyODJDMTUuMjkzMSAzNy4xMjgyIDE1Ljc0MSAzNi45Mjg5IDE2LjEwNTkgMzYuNTgwMkwzNC44NjcgMTcuODE0MkwzOC42ODI0IDEzLjc2MjNMMzguMzM0IDMyLjk0MzRWMzQuMjM4N0MzOC4zMzQgMzUuMjg0OSAzOS4wOTcxIDM2LjA4MiA0MC4xNTg4IDM2LjA4MkM0MS4yMjA1IDM2LjA4MiA0Mi4wMDAyIDM1LjMwMTUgNDIuMDAwMiAzNC4yMzg3VjExLjAyMjNDNDIuMDAwMiA5LjExMjYxIDQwLjg4ODcgOCAzOC45ODEgOEwxNS45MDY5IDhDMTQuODYxOCA4IDE0LjA4MjEgOC43ODA0OSAxNC4wODIxIDkuODQzMjhaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLm9wZW5JY29uID0geyBvbkRhcms6IGdldE9wZW5JY29uKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldE9wZW5JY29uKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cblxuXCJcIlwiPHN2ZyB3aWR0aD1cIjQ4XCIgaGVpZ2h0PVwiNDhcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTM4IDE1TDE1IDM4LjQyNDFMMTEuNTc2MiAzNUwzNSAxMkgxNFY4SDQyVjM2SDM4VjE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCIiLCJcblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG5TVkdCdXR0b24gPSBCdXR0b25zLlNWR0J1dHRvblxuXG5jbGFzcyBleHBvcnRzLlBsYXllclNsaWRlciBleHRlbmRzIFNsaWRlckNvbXBvbmVudFxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0QHZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwic2xpZGVyVmlld1wiXG5cdFx0XHR3aWR0aDogMjYwICogMiwgaGVpZ2h0OiA1NiAqIDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMjUpXCJcblx0XHRcdGJvcmRlclJhZGl1czogMTggKiAyXG5cdFx0XG5cdFx0QHZpZXcuZHJhZ2dhYmxlLmVuYWJsZWQgPSB0cnVlXG5cdFx0QHZpZXcuZHJhZ2dhYmxlLnNwZWVkWCA9IDBcblx0XHRAdmlldy5kcmFnZ2FibGUuc3BlZWRZID0gMFxuXHRcdEB2aWV3LmRyYWdnYWJsZS5wcm9wYWdhdGVFdmVudHMgPSBmYWxzZVxuXG5cblxuXHRcdEBwbGF5QnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdmlldywgbmFtZTogXCJwbGF5QnV0dG9uXCJcblx0XHRcdHdpZHRoOiA0MCAqIDIsIGhlaWdodDogNDAgKiAyXG5cdFx0XHR4OiAxMiAqIDJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0YXNzZXQ6IFNWRy5wbGF5ZXJQYXVzZUljb25cblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEBwbGF5QnV0dG9uLnN0YXRlcyA9XG5cdFx0XHRcInBsYXlpbmdcIjogeyBhc3NldDogU1ZHLnBsYXllclBhdXNlSWNvbiB9XG5cdFx0XHRcInBhdXNlZFwiOiB7IGFzc2V0OiBTVkcucGxheWVyUGxheUljb24gfVxuXHRcdEBwbGF5QnV0dG9uLnN0YXRlU3dpdGNoKFwicGxheWluZ1wiKVxuXHRcdFxuXHRcdFxuXG5cdFx0QHNvdW5kQnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdmlld1xuXHRcdFx0d2lkdGg6IDQwICogMiwgaGVpZ2h0OiA0MCAqIDJcblx0XHRcdHg6ICgxMiArIDQwICsgOCkgKiAyXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGFzc2V0OiBTVkcucGxheWVyU291bmRJY29uXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRAc291bmRCdXR0b24uc3RhdGVzID1cblx0XHRcdFwic291bmRcIjogeyBhc3NldDogU1ZHLnBsYXllclNvdW5kSWNvbiB9XG5cdFx0XHRcIm11dGVkXCI6IHsgYXNzZXQ6IFNWRy5wbGF5ZXJTb3VuZE9mZkljb24gfVxuXHRcdEBzb3VuZEJ1dHRvbi5zdGF0ZVN3aXRjaChcIm11dGVkXCIpXG5cdFx0XG5cblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHBhcmVudCA9IEB2aWV3XG5cdFx0QG5hbWUgPSBcInZpZGVvU2xpZGVyXCJcblx0XHRcblx0XHRAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoIC0gKCgxMiArIDQwICsgOCArIDQwICsgMTYpICsgMjApICogMlxuXHRcdEBoZWlnaHQgPSA0ICogMlxuXHRcdEB4ID0gKDEyICsgNDAgKyA4ICsgNDAgKyAxNikgKiAyXG5cdFx0QHkgPSBBbGlnbi5jZW50ZXJcblx0XHRAa25vYlNpemUgPSAyNCAqIDJcblx0XHRcblx0XHQjIDEyICsgNDAgKyA4ICsgNDAgKyAxNiArIGZsZXggKyAyMFxuXG5cdFx0QHNsaWRlck92ZXJsYXkuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpXCJcblx0XHQjIEBzbGlkZXJPdmVybGF5LmJhY2tncm91bmRDb2xvciA9IFwicmVkXCJcblx0XHRAc2xpZGVyT3ZlcmxheS53aWR0aCA9IEB3aWR0aFxuXHRcdEBzbGlkZXJPdmVybGF5LmhlaWdodCA9IDQgKiAyXG5cdFx0QHNsaWRlck92ZXJsYXkueCA9IDBcblx0XHRAc2xpZGVyT3ZlcmxheS55ID0gMFxuXHRcdEBzbGlkZXJPdmVybGF5Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcblx0XHRAZmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCJcblx0XHRAZmlsbC5vcGFjaXR5ID0gMC4zXG5cdFx0XG5cdFx0QGtub2IuYmFja2dyb3VuZENvbG9yID0gXCJudWxsXCJcblx0XHRAa25vYi5vcGFjaXR5ID0gMVxuXHRcdEBrbm9iLmRyYWdnYWJsZS5tb21lbnR1bSA9IGZhbHNlXG5cdFx0QGtub2IuZHJhZ2dhYmxlLnByb3BhZ2F0ZUV2ZW50cyA9IGZhbHNlXG5cdFx0QGtub2Iuc2hhZG93Q29sb3IgPSBudWxsXG5cdFx0QGtub2Iuc2hhZG93WSA9IDBcblx0XHRcblx0XHRrbm9iQ3Vyc29yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBrbm9iXG5cdFx0XHR3aWR0aDogNCAqIDIsIGhlaWdodDogMzIgKiAyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNkZGRcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0ICogMlxuXHRcdFxuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0bGF5ZXIudmFsdWUgPSBVdGlscy5tb2R1bGF0ZShldmVudC5wb2ludC54LCBbMCwgQHNsaWRlck92ZXJsYXkud2lkdGhdLCBbMCwgMV0sIHRydWUpXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRcblx0SG92ZXI6ID0+XG4jIFx0XHRAb3BhY2l0eSA9IDFcblx0SG92ZXJPZmY6ID0+XG4jIFx0XHRAb3BhY2l0eSA9IDAuNVxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHR1cGRhdGVGb3JTY2FsZURvd246ICgpIC0+XG5cdFx0QHZpZXcud2lkdGggPSA4MDAgKiAyXG5cdFx0QHZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdEB2aWV3LnkgPSBBbGlnbi5ib3R0b20oLTMyICogMilcblxuXHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoIC0gKCgxMiArIDQwICsgOCArIDQwICsgMTYpICsgMjApICogMlxuXHRcdEBoZWlnaHQgPSA0ICogMlxuXG5cdFx0IyBwcmludCBAc2xpZGVyT3ZlcmxheS53aWR0aFxuXHRcdEBzbGlkZXJPdmVybGF5LndpZHRoID0gQHdpZHRoXG5cdFx0QHNsaWRlck92ZXJsYXkuaGVpZ2h0ID0gNCAqIDJcblx0XHRAc2xpZGVyT3ZlcmxheS54ID0gMFxuXHRcdEBzbGlkZXJPdmVybGF5LnkgPSAwXG5cdFx0IyBwcmludCBAc2xpZGVyT3ZlcmxheS53aWR0aFxuXG5cdFx0IyBAcGxheWVyU2xpZGVyLndpZHRoID0gQHdpZHRoIC0gMzAwICogMiAqIDJcblx0XHQjIEBwbGF5ZXJTbGlkZXIueCA9IEFsaWduLmxlZnQoMzAwICogMilcblx0XHQjIEBwbGF5ZXJTbGlkZXIueSA9IEFsaWduLmJvdHRvbSgtMzIgKiAyKSIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuIyBUZXh0LCBCdXR0b25cblxuIyBmb250QXZlcmlhID0gVXRpbHMubG9hZFdlYkZvbnQoXCJOdW5pdG9cIiwgODAwKVxuIyBmb250QXZlcmlhID0gVXRpbHMubG9hZFdlYkZvbnQoXCJSYWxld2F5XCIsIDcwMClcbmZvbnRBdmVyaWEgPSBcIlJhbGV3YXlcIlxuXG5jbGFzcyBUZXh0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6IGZvbnRBdmVyaWFcblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0d2VpZ2h0OiA3MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuN1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC40XG4jIFx0XHRcdHRleHRPdmVyZmxvdzogXCJlbGxpcHNpc1wiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzdHlsZSA9XG5cdFx0XHRcImZvbnQtZmFtaWx5XCI6IFwiUmFsZXdheSwgJ1BUIFNhbnMnLCAnSGVsdmV0aWNhJywgJ1RhaG9tYScsIHNhbnMtc2VyaWY7XCJcblx0XHRcdFwiZm9udC13ZWlnaHRcIjogNzAwXG5cdFx0XHRcIi13ZWJraXQtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tb3otZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tcy1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XG5cblxuXG5cblxuY2xhc3MgVGV4dEJ1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAwLjUsIGhvdmVyOiAwLjggfVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cblx0XHRAdXBkYXRlVHVwbGUoQHR1cGxlKVxuXHRcblx0XG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLmhvdmVyXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLm5vcm1hbFxuXHRcblx0dXBkYXRlVHVwbGU6IChuZXdUdXBsZSkgPT5cblx0XHRAdHVwbGUgPSBuZXdUdXBsZVxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU92ZXJcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdXRcblx0XG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0QGRlZmluZSAndHVwbGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudHVwbGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnR1cGxlID0gdmFsdWVcblxuXG5cblxuXG4jIEJ1dHRvbjogU1ZHXG5cbmNsYXNzIFNWR0J1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0YXNzZXQ6IG51bGxcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRhdXRvU2l6ZTogZmFsc2Vcblx0XHRcblx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcblx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcblx0QGRlZmluZSAnYXNzZXQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFzc2V0ID0gdmFsdWVcblx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cblx0XHRcdFx0XCJvbkxpZ2h0XCI6IHsgc3ZnOiB2YWx1ZS5vbkxpZ2h0IH1cblx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcblx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cblx0XHRAc3ZnU2hhcGUud2lkdGggPSBAd2lkdGhcblx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuY2xhc3MgQ29weUJ1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIucnVcIlxuXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG5cdFx0QGFyZWEgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAYXJlYS5wYXJlbnQgPSBAXG5cdFxuXHRcblx0QGRlZmluZSAnbGluaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcblx0dXBkYXRlOiAobGluaykgPT5cblx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcblx0Y29weUhhbmRsZXI6ID0+XG5cdFx0dGV4dERpdiA9IEBhcmVhLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3B5dGV4dGFyZWEtY2xhc3MnKVxuXHRcdHRleHREaXYuZm9jdXMoKVxuXHRcdHRleHREaXYuc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcblx0XHRcblx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG5cdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG5cdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHRleHQgPSBvcmlnaW5UaXRsZVxuXG5cblxuXG4jIEJ1dHRvbjogQ29weVxuXG5jbGFzcyBMaW5rQnV0dG9uIGV4dGVuZHMgU1ZHQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLnJ1XCJcblx0XHRcdGJvcmRlcldpZHRoOiAxICogMlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMCAqIDJcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcdFxuXHRcdFxuXHRcdEB0aW50QnV0dG9uRml4ID0gbmV3IExheWVyXG5cdFx0XHRoZWlnaHQ6IDEyMCAqIDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEBidXR0b25UZXh0ID0gbmV3IFRleHRcblx0XHRcdGZvbnRTaXplOiAzMiAqIDJcblx0XHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHRoZWlnaHQ6IDYwICogMlxuXHRcdFxuXHRcdEBidXR0b25JY29uID0gbmV3IFNWR0xheWVyXG5cdFx0XHR3aWR0aDogMjQgKiAyLCBoZWlnaHQ6IDI0ICogMlxuXHRcdFx0c3ZnOiBTVkcub3Blbkljb24ub25MaWdodFxuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAYnV0dG9uVGV4dC50ZXh0ID0gQHRleHRcblx0XHRAdGV4dCA9IFwiXCJcblxuXHRcdEB0aW50QnV0dG9uRml4LnBhcmVudCA9IEBwYXJlbnRcblx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcblx0XHRAdGludEJ1dHRvbkZpeC55ID0gQWxpZ24udG9wXG5cdFx0XG5cdFx0QHBhcmVudCA9IEB0aW50QnV0dG9uRml4XG5cdFx0QHkgPSBBbGlnbi50b3AoMzAgKiAyKVxuXHRcdEBoZWlnaHQgPSA2MCAqIDJcblxuXHRcdEBidXR0b25UZXh0LnBhcmVudCA9IEBcblx0XHRAYnV0dG9uVGV4dC54ID0gMTYgKiAyXG5cdFx0QGJ1dHRvblRleHQueSA9IDkgKiAyXG5cblx0XHRAYnV0dG9uSWNvbi5wYXJlbnQgPSBAXG5cdFx0QGJ1dHRvbkljb24ueCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgMTYgKiAyXG5cdFx0QGJ1dHRvbkljb24ueSA9IEFsaWduLmNlbnRlcigzICogMilcblxuXHRcdEB3aWR0aCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgQGJ1dHRvbkljb24ud2lkdGggKyAxNiAqIDIgKyAxNiAqIDJcblx0XHRAdGludEJ1dHRvbkZpeC53aWR0aCA9IEB3aWR0aCArIDMwICogMiArIDE2ICogMlxuXG5cdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG5cdFx0QHggPSBBbGlnbi5yaWdodCgtMzAgKiAyKVxuXHRcdFxuXHRcblxuXHRAZGVmaW5lICdsaW5rJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGluayA9IHZhbHVlXG5cdFxuXHRzZXRDb2xvcjogKGNvbG9yID0gbnVsbCkgPT5cblx0XHRpZiBjb2xvciA9PSBudWxsIHRoZW4gcmV0dXJuXG5cdFx0QHRpbnRCdXR0b25GaXguYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XG5cblxuXG5cblxuXG5cblxuY2xhc3MgUHJldmlld0J1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEByZW1vdmVBbGxMaXN0ZW5lcnMoKVxuXG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cblx0SG92ZXI6ID0+XG5cdFx0IyBAc2NhbGUgPSAxLjA1XG5cdFx0QG9wYWNpdHkgPSAxLjBcblx0XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdCMgQHNjYWxlID0gMS4wXG5cdFx0QG9wYWNpdHkgPSAwLjhcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtUZXh0LCBUZXh0QnV0dG9uLCBTVkdCdXR0b24sIENvcHlCdXR0b24sIExpbmtCdXR0b24sIFByZXZpZXdCdXR0b259XG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFnQkFBO0FEQ0EsSUFBQSxtRkFBQTtFQUFBOzs7O0FBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxPQUFSOztBQU1OLFVBQUEsR0FBYTs7QUFFUDs7O0VBQ1EsY0FBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsVUFBQSxFQUFZLFVBQVo7TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLE1BQUEsRUFBUSxHQUZSO01BR0EsS0FBQSxFQUFPLE9BSFA7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
