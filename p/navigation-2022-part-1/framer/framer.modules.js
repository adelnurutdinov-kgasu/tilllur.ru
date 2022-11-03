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
      link: "https://tilllur.com",
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
      link: "https://tilllur.com",
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
      url = "https://tilllur.com";
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
    return this.openURL("https://tilllur.com", false);
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
      url = "https://tilllur.com";
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


},{"PCSliderGrid":"PCSliderGrid"}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwXSAwNCDigJQgWWFuZGV4IE5hdmlnYXRpb24gMjAyMiBwMS5mcmFtZXIvbW9kdWxlcy9QcmVzZW50YXRpb25Db21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3BdIDA0IOKAlCBZYW5kZXggTmF2aWdhdGlvbiAyMDIyIHAxLmZyYW1lci9tb2R1bGVzL1BDU2xpZGUuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3BdIDA0IOKAlCBZYW5kZXggTmF2aWdhdGlvbiAyMDIyIHAxLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyR3JpZC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcF0gMDQg4oCUIFlhbmRleCBOYXZpZ2F0aW9uIDIwMjIgcDEuZnJhbWVyL21vZHVsZXMvUENTbGlkZXI1LmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwXSAwNCDigJQgWWFuZGV4IE5hdmlnYXRpb24gMjAyMiBwMS5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3BdIDA0IOKAlCBZYW5kZXggTmF2aWdhdGlvbiAyMDIyIHAxLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcF0gMDQg4oCUIFlhbmRleCBOYXZpZ2F0aW9uIDIwMjIgcDEuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIyLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwXSAwNCDigJQgWWFuZGV4IE5hdmlnYXRpb24gMjAyMiBwMS5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjEuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3BdIDA0IOKAlCBZYW5kZXggTmF2aWdhdGlvbiAyMDIyIHAxLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcF0gMDQg4oCUIFlhbmRleCBOYXZpZ2F0aW9uIDIwMjIgcDEuZnJhbWVyL21vZHVsZXMvUENTbGlkZUNoYW5nZXIuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3BdIDA0IOKAlCBZYW5kZXggTmF2aWdhdGlvbiAyMDIyIHAxLmZyYW1lci9tb2R1bGVzL1BDU1ZHLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwXSAwNCDigJQgWWFuZGV4IE5hdmlnYXRpb24gMjAyMiBwMS5mcmFtZXIvbW9kdWxlcy9QQ1BsYXllclNsaWRlci5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcF0gMDQg4oCUIFlhbmRleCBOYXZpZ2F0aW9uIDIwMjIgcDEuZnJhbWVyL21vZHVsZXMvUENCdXR0b25zLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4jIHtTbGlkZXIwfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjBcIiBcdCMgU2NhbGUgLyBVUkxcbiMge1NsaWRlcjF9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMVwiXHQjIFBhbmVsc1xuIyB7U2xpZGVyMn0gPSByZXF1aXJlIFwiUENTbGlkZXIyXCJcdCMgQ3JlYXRlIFNsaWRlXG4jIHtTbGlkZXIzfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjNcIlx0IyBTaG9ydGN1dHNcbiMge1NsaWRlcjR9ID0gcmVxdWlyZSBcIlBDU2xpZGVyNFwiXHQjIEJhY2tncm91bmQgUGF1c2UgZm9yIFZpZGVvc1xuIyB7U2xpZGVyNX0gPSByZXF1aXJlIFwiUENTbGlkZXI1XCJcdCMgUGxheWluZyBWaWRlb1xuIyB7U2xpZGVyUGluY2h9ID0gcmVxdWlyZSBcIlBDU2xpZGVyUGluY2hcIlx0IyBQaW5jaFxue1NsaWRlckdyaWR9ID0gcmVxdWlyZSBcIlBDU2xpZGVyR3JpZFwiXHQjIFBpbmNoXG5cbmNsYXNzIEZpeFByZXNlbnRhdGlvbkV4cG9ydCBleHRlbmRzIFNsaWRlckdyaWRcbiMgY2xhc3MgRml4UHJlc2VudGF0aW9uRXhwb3J0IGV4dGVuZHMgU2xpZGVyUGluY2hcbiMgY2xhc3MgRml4UHJlc2VudGF0aW9uRXhwb3J0IGV4dGVuZHMgU2xpZGVyMFxuY2xhc3MgZXhwb3J0cy5QcmVzZW50YXRpb24gZXh0ZW5kcyBGaXhQcmVzZW50YXRpb25FeHBvcnRcblxuXG5cdFxuXG5cblxuIyBzbGlkZXIgPSBuZXcgUHJlc2VudGF0aW9uICh0aXRsZTogXCJEZXZlbG9wbWVudFwiKVxuXG4jIEltYWdlc1xuIyBzbGlkZXIuc2xpZGUoKS5yYW5kb21Db2xvcigpXG4jIHNsaWRlci5zbGlkZShcImltYWdlcy90aXRsZSUyMG92ZXJsYXkucG5nXCIpXG4jIHNsaWRlci5zbGlkZSgpLnJhbmRvbUNvbG9yKCkub3ZlcmxheShcImltYWdlcy90aXRsZSUyMG92ZXJsYXkucG5nXCIpXG5cblxuIyBMaW5rXG4jIHNsaWRlci5zbGlkZSgpLmxpbmsoXCJodHRwczovL3RpbGxsdXIucnUvZC9xeXZ0a2dqdS9pbmRleC5odG1sXCIpXG4jIHNsaWRlci5zbGlkZSgpLmxpbmsoXCJodHRwczovL3RpbGxsdXIucnUvZC9xeXZ0a2dqdS9pbmRleC5odG1sXCIsIFwiTGluayBUaXRsZVwiKVxuIyBzbGlkZXIuc2xpZGUoKS5saW5rKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L2QvcXl2dGtnanUvaW5kZXguaHRtbFwiLCBcIkxpbmsgVGl0bGVcIiwgdHlwZTEpXG5cblxuIyBWaWRlbyAxNDAweDkwMCDigJQgRnVsbHNjcmVlblxuIyBzbGlkZXIuYmdWaWRlb1NsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L21wNC95YXJ1Lm1wNFwiKVxuIyBzbGlkZXIuYmdWaWRlb1NsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L21wNC95YXJ1Lm1wNFwiKS5tdXRlKGZhbHNlKVxuIyBzbGlkZXIuYmdWaWRlb1NsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L21wNC95YXJ1Lm1wNFwiKS5sb29wKGZhbHNlKVxuXG4jIFZpZGVvIDE0MDB4OTAwIOKAlCBGdWxsc2NyZWVuICYgQ29udHJvbHNcbiMgc2xpZGVyLmZ1bGxWaWRlb1NsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L21wNC95YXJ1Lm1wNFwiKVxuXG4jIFZpZGVvIDE5MjB4MTA4MCDigJQgQ3JvcCAmIENvbnRyb2xzXG4jIHNsaWRlci52aWRlb1NsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L21wNC95YXJ1Lm1wNFwiKVxuXG5cbiMgUHJvdG90eXBlXG4jIHNsaWRlci5wcm90b3R5cGVTbGlkZShcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIikuc2l6ZWQoKVxuIyBzbGlkZXIucHJvdG90eXBlU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvZC9xeXZ0a2dqdS9pbmRleC5odG1sXCIpLnNpemVkKDM5MCwgODQ0KVxuXG5cblxuXG4iLCJcblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG5UZXh0ID0gQnV0dG9ucy5UZXh0XG5TVkdCdXR0b24gPSBCdXR0b25zLlNWR0J1dHRvblxuTGlua0J1dHRvbiA9IEJ1dHRvbnMuTGlua0J1dHRvblxuXG57UGxheWVyU2xpZGVyfSA9IHJlcXVpcmUoXCJQQ1BsYXllclNsaWRlclwiKVxuXG5cblxuIyBTbGlkZSB3aXRoIEltYWdlc1xuXG5jbGFzcyBTbGlkZVRlbXBsYXRlIGV4dGVuZHMgTGF5ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGdyaWREYXRhOiBudWxsXG5cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcdHdpZHRoOiAxNDAwICogMlxuXHRcdFx0aGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRib3JkZXJSYWRpdXM6IDE2ICogMlxuXHRcdFx0dGl0bGU6IFwiXCJcblx0XHRcdGltYWdlOiBudWxsXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAeCA9IChAcGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDEpICogKEB3aWR0aCArIDEyMCkgXG5cdFx0QHBhcmVudC5wYXJlbnQudXBkYXRlQ29udGVudCgpXG5cdFx0QG5hbWUgPSBcInNsaWRlICN7QHBhcmVudC5jaGlsZHJlbi5sZW5ndGh9XCJcblx0XG5cdFxuXHRcblx0QGRlZmluZSAndGl0bGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGl0bGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZ3JpZERhdGEnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZ3JpZERhdGFcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ3JpZERhdGEgPSB2YWx1ZVxuXG5cblxuXHRzb3VyY2U6IChpbWFnZSkgPT5cblx0XHRAaW1hZ2UgPSBpbWFnZVxuXHRcdHJldHVybiBAXG5cdFxuXHRvdmVybGF5OiAoaW1hZ2UpID0+XG5cdFx0dG9wSW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDE0MDAgKiAyLCBoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdGltYWdlOiBpbWFnZVxuXHRcdHJldHVybiBAXG5cdFxuXHRyYW5kb21Db2xvcjogKCkgPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdHJldHVybiBAXG5cblxuXG5cblxuIyBTOiBTbGlkZSB3aXRoIExpbmtcblxuIyBmZm1wZWcgLWkgaW5wdXQubXA0IC1jOnYgbGlieDI2NCAtcHJvZmlsZTp2IG1haW4gLXZmIGZvcm1hdD15dXY0MjBwIC1jOmEgYWFjIC1tb3ZmbGFncyArZmFzdHN0YXJ0IG91dHB1dC5tcDRcbiMgZmZtcGVnIC1pIG91dHB1dC5tcDQgLWZpbHRlcjp2IFwiY3JvcD0xNjgwOjEwODA6MTIwOjBcIiAtYzphIGNvcHkgY3JvcC5tcDRcblxuXG5jbGFzcyBTbGlkZSBleHRlbmRzIFNsaWRlVGVtcGxhdGVcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHNoYXJlTGluazogXCJcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFxuXHRcblx0QGRlZmluZSAnc2hhcmVMaW5rJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNoYXJlTGlua1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaGFyZUxpbmsgPSB2YWx1ZVxuXHRcblx0XG5cdGxpbms6ICh1cmwgPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIiwgYnV0dG9uVGl0bGUgPSBcIk9wZW5cIiwgdHlwZSA9IDApID0+XG5cdFx0QHNoYXJlTGluayA9IHVybFxuXG5cdFx0QHRpbnRCdXR0b24gPSBuZXcgTGlua0J1dHRvblxuXHRcdFx0cGFyZW50OiBALCBuYW1lOiBcImxpbmtCdXR0b25cIlxuXHRcdFx0dGV4dDogYnV0dG9uVGl0bGVcblx0XHRcdHVybDogdXJsXG5cdFx0XHRoYW5kbGVyOiBAb3BlblByb3RvdHlwZVVSTFxuXHRcdFxuXHRcdGlmIHR5cGUgPT0gMFxuXHRcdFx0QHRpbnRCdXR0b24uYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdFx0QHRpbnRCdXR0b24uYm9yZGVyQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4zKVwiXG5cdFx0ZWxzZSBpZiB0eXBlID09IDFcblx0XHRcdEB0aW50QnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjI1KVwiXG5cdFx0XHRAdGludEJ1dHRvbi5ib3JkZXJDb2xvciA9IG51bGxcblx0XG5cdG9wZW5Qcm90b3R5cGVVUkw6ICgpID0+XG5cdFx0cHJlc2VudGF0aW9uID0gQHBhcmVudC5wYXJlbnRcblx0XHRwcmVzZW50YXRpb24ub3BlblVSTChAc2hhcmVMaW5rLCB0cnVlKVxuXG5cblxuXG5cblxuXG5cblxuXG4jIFM6IFRlbXBsYXRlIChWaWRlbylcbiMgT3ZlcnJpZGUgXCJzb3VyY2UoKVwiXG5cbmNsYXNzIFNpbXBsZVZpZGVvU2xpZGUgZXh0ZW5kcyBTbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0aXRsZTogXCJzaW1wbGVWaWRlb1NsaWRlXCJcblx0XHRcblx0XHRAbG9hZGluZ1RleHQgPSBuZXcgVGV4dFxuXHRcdFx0d2lkdGg6IDQwMCwgaGVpZ2h0OiA3MFxuXHRcdFx0Zm9udFNpemU6IDQwXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIlxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcblx0XHRcdHRleHQ6IFwiTm8gVVJMXCJcblx0XHRcdFxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcgPSBuZXcgVmlkZW9MYXllclxuXHRcdFx0d2lkdGg6IDE2ODAsIGhlaWdodDogMTA4MFxuXHRcdFx0bmFtZTogXCJ2aWRlb1ZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBcIm51bGxcIlxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLm11dGVkID0gdHJ1ZVxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLmF1dG9wbGF5ID0gZmFsc2Vcblx0XHRAdmlkZW9WaWV3LnBsYXllci5sb29wID0gdHJ1ZVxuXHRcdFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRcblx0XHRAbG9hZGluZ1RleHQucGFyZW50ID0gQFxuXHRcdEBsb2FkaW5nVGV4dC5jZW50ZXIoKVxuXHRcdFxuXHRcdEB2aWRlb1ZpZXcucGFyZW50ID0gQFxuXHRcdEB2aWRlb1ZpZXcuc2NhbGUgPSBAaGVpZ2h0IC8gMTA4MFxuXHRcdEB2aWRlb1ZpZXcuY2VudGVyKClcblxuXHRcblx0XG5cdCMgQGRlZmluZSAndmlkZW9VUkwnLFxuXHQjIFx0Z2V0OiAtPiBAb3B0aW9ucy52aWRlb1VSTFxuXHQjIFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpZGVvVVJMID0gdmFsdWVcblx0XG5cblx0IyBvdmVycmlkZVxuXHRzb3VyY2U6ICh2aWRlbykgPT5cblx0XHRAdmlkZW9WaWV3LnZpZGVvID0gdmlkZW9cblx0XHRAbG9hZGluZ1RleHQudGV4dCA9IFwiTG9hZGluZ1wiXG5cdFx0QG5hbWUgPSBAbmFtZSArIFwiOiBcIiArIHZpZGVvXG5cdFx0cmV0dXJuIEBcblxuXG5cblxuXHRsb29wOiAodmFsdWUgPSB0cnVlKSA9PlxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLmxvb3AgPSB0cnVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdG11dGU6ICh2YWx1ZSA9IHRydWUpID0+XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSB2YWx1ZVxuXHRcdHJldHVybiBAXG5cdFxuXHR1bm11dGU6ICgpID0+XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSBmYWxzZVxuXHRcdHJldHVybiBAXG5cblxuXG5cblx0aXNQYXVzZWQ6ICgpID0+XG5cdFx0cmV0dXJuIEB2aWRlb1ZpZXcucGxheWVyLnBhdXNlZFxuXG5cdHBsYXk6ICgpID0+XG5cdFx0aWYgIUBpc1BhdXNlZCgpIHRoZW4gcmV0dXJuXG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIucGxheSgpXG5cdFxuXHRwYXVzZTogKCkgPT5cblx0XHRpZiBAaXNQYXVzZWQoKSB0aGVuIHJldHVyblxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLnBhdXNlKClcblx0XG5cdHRvZ2dsZVBsYXk6ICgpID0+XG5cdFx0aWYgQGlzUGF1c2VkKCkgdGhlbiBAcGxheSgpXG5cdFx0ZWxzZSBAcGF1c2UoKVxuXHRcblxuXG4jIFx0bG9hZFZpZGVvOiAod2ViVVJMKSA9PlxuIyBcdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSB0cnVlXG4jIFx0XHRAdmlkZW9WaWV3LnBsYXllci5hdXRvcGxheSA9IHRydWVcbiMgXHRcdEB2aWRlb1ZpZXcudmlkZW8gPSBAdmlkZW9VUkxcbiMgXHRcdFV0aWxzLmRlbGF5IDEwLCA9PlxuIyBcdFx0QHZpZGVvVmlldy5wbGF5ZXIucGxheSgpXG5cdFx0XG5cdFx0XG4jIFx0XHRwcmludCBAdmlkZW9WaWV3LnBsYXllci5yZWFkeVN0YXRlXG4jIFx0XHRVdGlscy5kZWxheSAxMCwgPT5cbiMgXHRcdFx0cHJpbnQgQHZpZGVvVmlldy5wbGF5ZXIucmVhZHlTdGF0ZVxuXG5cblxuXG5cbiMgUzogU2xpZGUgKFZpZGVvKVxuXG5jbGFzcyBWaWRlb1NsaWRlIGV4dGVuZHMgU2ltcGxlVmlkZW9TbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHQjIFByb2dyZXNzXG5cdFx0QHBsYXllclNsaWRlciA9IG5ldyBQbGF5ZXJTbGlkZXJcblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC5wYXJlbnQgPSBAXG5cblx0XHRAcGxheWVyU2xpZGVyLnBhcmVudC54ID0gQWxpZ24ubGVmdCg5OCoyKVxuXHRcdEBwbGF5ZXJTbGlkZXIucGFyZW50LnkgPSBBbGlnbi5ib3R0b20oLTYwICogMilcblxuXHRcdCMgcHJpbnQgQHBsYXllclNsaWRlci5wYXJlbnRcblx0XHQjIHByaW50IEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvblxuXG5cblx0XHRAcGxheWVyU2xpZGVyLnBsYXlCdXR0b24ub24gRXZlbnRzLlRhcCwgKGV2ZW50LCBsYXllcikgLT5cdFx0XHRcblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0c2xpZGUudG9nZ2xlUGxheSgpXG5cdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlRHJhZyA9IGZhbHNlXG5cblxuXG5cblx0XHRAcGxheWVyU2xpZGVyLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuXHRcdFx0IyBwcmludCBcIlRvdWNoIFN0YXJ0XCJcblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0c2xpZGUucGF1c2UoKVxuXHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZURyYWcgPSB0cnVlXG5cdFx0XG5cdFx0XG5cblx0XHRAcGxheWVyU2xpZGVyLm9uIFwiY2hhbmdlOnZhbHVlXCIsIC0+XG5cdFx0XHRzbGlkZSA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdGlmIHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnXG5cdFx0XHRcdHNsaWRlLnZpZGVvVmlldy5wbGF5ZXIuY3VycmVudFRpbWUgPSBVdGlscy5tb2R1bGF0ZShAdmFsdWUsIFswLCAxXSwgWzAsIHNsaWRlLnZpZGVvVmlldy5wbGF5ZXIuZHVyYXRpb25dLCB0cnVlKVxuXHRcdFxuXHRcdFxuXG5cdFx0QHBsYXllclNsaWRlci5zb3VuZEJ1dHRvbi5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdFx0c2xpZGUgPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uID0gc2xpZGUucGFyZW50LnBhcmVudFxuXHRcdFx0XG5cdFx0XHRpZiBzbGlkZS52aWRlb1ZpZXcucGxheWVyLm11dGVkIHRoZW4gc2xpZGUudW5tdXRlKClcblx0XHRcdGVsc2Ugc2xpZGUubXV0ZSgpXG5cdFx0XG5cblx0XHRcblxuXHRcdFxuXHRcdEV2ZW50cy53cmFwKEB2aWRlb1ZpZXcucGxheWVyKS5vbiBcInBhdXNlXCIsID0+XG5cdFx0XHQjIHByaW50IFwiISBuZXh0IHBhdXNlXCJcblx0XHRcdEBwYXVzZSgpXG5cdFx0XHRAcGxheWVyU2xpZGVyLnBsYXlCdXR0b24uc3RhdGVTd2l0Y2goXCJwYXVzZWRcIilcblx0XHRcdFxuXHRcdFx0cHJlc2VudGF0aW9uID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdGlmIEB2aWRlb1ZpZXcucGxheWVyID09IHByZXNlbnRhdGlvbi5hY3RpdmVWaWRlb1BsYXllclxuXHRcdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlUGxheWluZyA9IGZhbHNlXG5cdFx0XG5cdFx0XG5cdFx0RXZlbnRzLndyYXAoQHZpZGVvVmlldy5wbGF5ZXIpLm9uIFwicGxheVwiLCA9PlxuXHRcdFx0IyBwcmludCBcIiEgbmV4dCBwbGF5XCJcblx0XHRcdEBwbGF5KClcblx0XHRcdEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvbi5zdGF0ZVN3aXRjaChcInBsYXlpbmdcIilcblx0XHRcdFxuXHRcdFx0cHJlc2VudGF0aW9uID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnID0gZmFsc2Vcblx0XHRcdGlmIEB2aWRlb1ZpZXcucGxheWVyID09IHByZXNlbnRhdGlvbi5hY3RpdmVWaWRlb1BsYXllclxuXHRcdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlUGxheWluZyA9IHRydWVcblx0XHRcblx0XHRcblx0XHRFdmVudHMud3JhcChAdmlkZW9WaWV3LnBsYXllcikub24gXCJ2b2x1bWVjaGFuZ2VcIiwgPT5cblx0XHRcdGlmIEB2aWRlb1ZpZXcucGxheWVyLm11dGVkXG5cdFx0XHRcdEBwbGF5ZXJTbGlkZXIuc291bmRCdXR0b24uc3RhdGVTd2l0Y2goXCJtdXRlZFwiKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAcGxheWVyU2xpZGVyLnNvdW5kQnV0dG9uLnN0YXRlU3dpdGNoKFwic291bmRcIilcblxuXHRcdFx0XHRcblx0XHRcbmNsYXNzIEhEVmlkZW9TbGlkZSBleHRlbmRzIFZpZGVvU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEB2aWRlb1ZpZXcud2lkdGggPSAxOTIwXG5cdFx0QHZpZGVvVmlldy5oZWlnaHQgPSAxMDgwXG5cdFx0QHZpZGVvVmlldy54ID0gNDQwXG5cdFx0QHZpZGVvVmlldy55ID0gMjg2XG5cblx0XHRAdmlkZW9WaWV3LmJvcmRlclJhZGl1cyA9IDggKiAyXG5cdFx0QHZpZGVvVmlldy5jbGlwID0gdHJ1ZVxuXG5cblx0XHRAdmlkZW9WaWV3Lm9yaWdpblggPSAwLjVcblx0XHRAdmlkZW9WaWV3Lm9yaWdpblkgPSAwLjVcblxuXHRcdEB2aWRlb1ZpZXcuc2NhbGUgPSAxLjM2NjZcblxuXG5cdFx0QHBsYXllclNsaWRlci51cGRhdGVGb3JTY2FsZURvd24oKVxuXG5cblx0XHRcdFxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIyBTOiBTbGlkZSAoUHJvdG90eXBlKVxuXG5jbGFzcyBQcm90b3R5cGVTbGlkZSBleHRlbmRzIFNsaWRlXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0QHByb3RvdHlwZVZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwicHJvdG90eXBlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXHRcdFx0Y2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHByb3RvdHlwZVZpZXcucGFyZW50ID0gQFxuXHRcdEBzaXplZCgpXG5cdFxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICdwV2lkdGgnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucFdpZHRoXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnBXaWR0aCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwSGVpZ2h0Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBIZWlnaHRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucEhlaWdodCA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdFxuXHRzY2FsZWQ6ICh2YWx1ZSkgPT5cblx0XHRAcHJvdG90eXBlVmlldy5zY2FsZSA9IHZhbHVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdGJvcmRlcmVkOiAodmFsdWUpID0+XG5cdFx0QHByb3RvdHlwZVZpZXcuYm9yZGVyUmFkaXVzID0gdmFsdWVcblx0XHRyZXR1cm4gQFxuXHRcblx0c2l6ZWQ6ICh3aWR0aCA9IDM3NSwgaGVpZ2h0ID0gODEyKSA9PlxuXHRcdEBwcm90b3R5cGVWaWV3LndpZHRoID0gd2lkdGhcblx0XHRAcHJvdG90eXBlVmlldy5oZWlnaHQgPSBoZWlnaHRcblx0XHRAcHJvdG90eXBlVmlldy5jZW50ZXIoKVxuXG5cdFx0aWYgd2lkdGggPT0gMzc1IGFuZCBoZWlnaHQgPT0gODEyIHRoZW4gQHNjYWxlZCgyLjApXG5cdFx0ZWxzZSBpZiB3aWR0aCA9PSAzOTAgYW5kIGhlaWdodCA9PSA4NDQgdGhlbiBAc2NhbGVkKDEuOTIzKVxuXHRcdGVsc2UgQHNjYWxlZCgyLjApXG5cblx0XHRyZXR1cm4gQFxuXHRcblx0XG5cdFxuXHQjIG92ZXJyaWRlXG5cdHNvdXJjZTogKG9yaWdpblVSTCkgPT5cblx0XHR1cmwgPSBvcmlnaW5VUkwgKyBcIj9sb2dvPW9mZiZidXR0b249b2ZmXCJcblx0XHRcblx0XHRjb250ZW50VmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAcHJvdG90eXBlVmlld1xuXHRcdFx0d2lkdGg6IEBwcm90b3R5cGVWaWV3LndpZHRoLCBoZWlnaHQ6IEBwcm90b3R5cGVWaWV3LmhlaWdodCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRodG1sOiBcIjxpZnJhbWUgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsnIHNyYz0nI3t1cmx9Jz48L2lmcmFtZT5cIlxuXHRcdFx0aWdub3JlRXZlbnRzOiBmYWxzZSwgY2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHJldHVybiBAXG5cdFxuXHRcblx0XG5cdGNyZWF0ZVdlYlZpZXc6ICh3ZWJVUkwpID0+XG5cdFx0XG5cdFx0dmlldyA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IEBpbWFnZVNpemUud2lkdGgsIGhlaWdodDogQGltYWdlU2l6ZS5oZWlnaHRcblx0XHRcdG5hbWU6IFwid2Vidmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGJvcmRlclJhZGl1czogQGltYWdlUmFkaXVzXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XG5cdFx0Y29udGVudFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogdmlld1xuXHRcdFx0d2lkdGg6IEBpbWFnZVNpemUud2lkdGgsIGhlaWdodDogQGltYWdlU2l6ZS5oZWlnaHQsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aHRtbDogXCI8aWZyYW1lIHN0eWxlPSdwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7JyBzcmM9JyN7d2ViVVJMfSc+PC9pZnJhbWU+XCJcblx0XHRcdGlnbm9yZUV2ZW50czogZmFsc2UsIGNsaXA6IHRydWVcblx0XHRcblx0XHRyZXR1cm4gdmlld1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7U2xpZGUsIFNpbXBsZVZpZGVvU2xpZGUsIFZpZGVvU2xpZGUsIEhEVmlkZW9TbGlkZSwgUHJvdG90eXBlU2xpZGV9IiwiXG57U2xpZGVyNX0gPSByZXF1aXJlIFwiUENTbGlkZXI1XCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblByZXZpZXdCdXR0b24gPSBCdXR0b25zLlByZXZpZXdCdXR0b25cblxuXG4jIFBhbmVsc1xuXG4jIHByaW50IFwiP1wiXG5jbGFzcyBleHBvcnRzLlNsaWRlckdyaWQgZXh0ZW5kcyBTbGlkZXI1XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRncmlkMiA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdG5hbWU6IFwiZ3JpZDJcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyLCBoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlLCBzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHQjIGlnbm9yZUV2ZW50czogZmFsc2Vcblx0XHRcdG1vdXNlV2hlZWxFbmFibGVkOiB0cnVlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcblx0XHRncmlkMi5zdGF0ZXMgPVxuXHRcdFx0XCJzaG93blwiOiB7IG9wYWNpdHk6IDEsIHk6IFNjcmVlbi5oZWlnaHQgfVxuXHRcdFx0XCJoaWRkZW5cIjogeyBvcGFjaXR5OiAwLCB5OiBTY3JlZW4uaGVpZ2h0IH1cblx0XHRcblx0XHQjIGdyaWQyLm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdCMgXHRpZiBmcm9tICE9IHRvXG5cdFx0IyBcdFx0aWYgdG8gPT0gXCJzaG93blwiIHRoZW4gQGlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHQjIFx0XHRlbHNlIEBpZ25vcmVFdmVudHMgPSBmYWxzZVxuXHRcdFxuXHRcdGdyaWQyLnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRncmlkMjogZ3JpZDJcblx0XHRcdGxhc3RTbGlkZVNlbGVjdGVkSW5kZXg6IDBcblx0XHRcdGdyaWRCdXR0b25zOiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRncmlkMi5wYXJlbnQgPSBAY2FudmFzXG5cdFx0QGNhbnZhcy5jdXN0b20ubG9jYWxTY3JvbGwgPSBAXG5cblx0XHR0cnkgZ3JpZC5wbGFjZUJlZm9yZShAdG9wVmlldylcblxuXG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdGxvY2FsU2Nyb2xsID0gQHBhcmVudFxuXHRcdFx0XG5cdFx0XHRsb2NhbFNjcm9sbC5hZGRQcmV2aWV3KGxvY2FsU2Nyb2xsLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoKVxuXHRcdFx0bG9jYWxTY3JvbGwudXBkYXRlUHJldmlldygpXG5cdFx0XG5cblx0XHQjIEBvbiBFdmVudHMuU3RhdGVTd2l0Y2hFbmQsIChmcm9tLCB0bykgLT5cblx0XHQjIFx0aWYgZnJvbSAhPSB0b1xuXHRcdCMgXHRcdGlmIHRvID09IFwicHJlc2VudFwiIHRoZW4gbmV4dE9wYWNpdHlWYWx1ZSA9IDFcblx0XHQjIFx0XHRlbHNlIG5leHRPcGFjaXR5VmFsdWUgPSAwXG5cdFx0XHRcdFxuXHRcdCMgXHRcdEBib3R0b21WaWV3LmFuaW1hdGUob3BhY2l0eTogbmV4dE9wYWNpdHlWYWx1ZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblxuXHRcdFx0XHRcblx0XG5cdFxuXHRAZGVmaW5lICdsYXN0U2xpZGVTZWxlY3RlZEluZGV4Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkQnV0dG9ucycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkQnV0dG9uc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkQnV0dG9ucyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkMicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkMlxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkMiA9IHZhbHVlXG5cdFxuXHRcblxuXHRsZWFkWmVybzogKG51bSwgc2l6ZSA9IDIpID0+XG5cdFx0cyA9IG51bSArIFwiXCJcblx0XHR3aGlsZSBzLmxlbmd0aCA8IHNpemUgdGhlbiBzID0gXCIwXCIgKyBzXG5cdFx0cmV0dXJuIHNcblxuXG5cdGFkZFByZXZpZXc6IChpbWFnZUluZGV4KSA9PlxuXHRcdGluZGV4ID0gaW1hZ2VJbmRleCAtIDFcblx0XHQjIHBXID0gQGdyaWQyLndpZHRoIC8gQGdyaWRTaXplKClcblx0XHQjIHBIID0gKEBncmlkMi53aWR0aCAvIEBncmlkU2l6ZSgpKSAqICg5MDAvMTQwMClcblxuXHRcdHByZXZpZXdMYXllciA9IG5ldyBQcmV2aWV3QnV0dG9uXG5cdFx0XHR0ZXh0OiBcIlwiXG5cdFx0XHRwYXJlbnQ6IEBncmlkMi5jb250ZW50XG5cdFx0XHR3aWR0aDogMjgwLCBoZWlnaHQ6IDE4MFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMjIyXCJcblx0XHRcdCMgdHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL3BhZ2Uje0BsZWFkWmVybyhpbWFnZUluZGV4KX1AcHJldmlldy5wbmdcIlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRpbmRleDogaW5kZXhcblx0XHRcblx0XHRwcmV2aWV3TGF5ZXIuc3RhdGVzID1cblx0XHRcdFwic2hvd25cIjogeyBvcGFjaXR5OiAwLjggfVxuXHRcdFx0XCJoaWRkZW5cIjogeyBvcGFjaXR5OiAwIH1cblx0XHRwcmV2aWV3TGF5ZXIuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XHRcblx0XHRAZ3JpZEJ1dHRvbnMucHVzaCBwcmV2aWV3TGF5ZXJcblxuXHRcdHByZXZpZXdMYXllci5vblRhcCAtPlxuXHRcdFx0bG9jYWxDYW52YXMgPSBAcGFyZW50LnBhcmVudC5wYXJlbnRcblx0XHRcdGxvY2FsU2Nyb2xsID0gbG9jYWxDYW52YXMuY3VzdG9tLmxvY2FsU2Nyb2xsXG5cdFx0XHRcblx0XHRcdGxvY2FsU2Nyb2xsLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBpbmRleFxuXHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb1NsaWRlKClcblxuXHRcdFxuXHRcdCMgQGdyaWQyLnVwZGF0ZUNvbnRlbnQoKVxuXHRcblx0dXBkYXRlUHJldmlldzogKCkgPT5cblx0XHRmb3IgaXRlbSwgaW5kZXggaW4gQGdyaWQyLmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdHBXID0gKEBncmlkMi53aWR0aCAtIEBnZXRHcmlkR2FwKCkgKiAoQGdyaWRTaXplKCkgKyAxKSkgLyBAZ3JpZFNpemUoKVxuXHRcdFx0cEggPSBwVyAqICg5MDAvMTQwMClcblxuXHRcdFx0aXRlbS53aWR0aCA9IHBXXG5cdFx0XHRpdGVtLmhlaWdodCA9IHBIXG5cdFx0XHRpdGVtLnggPSBpbmRleCAlIEBncmlkU2l6ZSgpICogKHBXICsgQGdldEdyaWRHYXAoKSkgKyBAZ2V0R3JpZEdhcCgpXG5cdFx0XHRpdGVtLnkgPSAoaW5kZXggLSBpbmRleCAlIEBncmlkU2l6ZSgpKSAvIEBncmlkU2l6ZSgpICogKHBIICsgQGdldEdyaWRHYXAoKSkgKyBAZ2V0R3JpZEdhcCgpXG5cblx0XHRcblx0XHRAZ3JpZDIudXBkYXRlQ29udGVudCgpXG5cblxuXHRcblx0IyBvdmVycmlkZVxuXHR1cGRhdGVTaXplOiAoKSA9PlxuXHRcdHN1cGVyXG5cdFx0bmV4dFN0YXRlID0gQGdyaWQyLnN0YXRlcy5jdXJyZW50Lm5hbWVcblx0XHRcblx0XHRAZ3JpZDIud2lkdGggPSBAY2FudmFzLndpZHRoXG5cdFx0QGdyaWQyLmhlaWdodCA9IEBjYW52YXMuaGVpZ2h0IC0gNThcblxuXHRcdEBncmlkMi5zdGF0ZXMuc2hvd24ueSA9IDU4XG5cdFx0QGdyaWQyLnN0YXRlcy5oaWRkZW4ueSA9IFNjcmVlbi5oZWlnaHQgKyAxMDAwXG5cblx0XHRAZ3JpZDIuc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXG5cdFx0QHVwZGF0ZVByZXZpZXcoKVxuXG5cblx0Z3JpZFNpemU6ICgpID0+XG5cdFx0aWYgQGNhbnZhcy53aWR0aCA8IDc0MCB0aGVuIHJldHVybiAyXG5cdFx0ZWxzZSBpZiBAY2FudmFzLndpZHRoIDwgMTI4MCB0aGVuIHJldHVybiAzXG5cdFx0ZWxzZSBpZiBAY2FudmFzLndpZHRoIDwgMTYwMCB0aGVuIHJldHVybiA0XG5cdFx0ZWxzZSBpZiBAY2FudmFzLndpZHRoIDwgMjAwMCB0aGVuIHJldHVybiA1XG5cdFx0cmV0dXJuIDZcblxuXHRnZXRHcmlkR2FwOiAoKSA9PlxuXHRcdHJldHVybiA4XG5cblx0Z2V0R3JpZFNjYWxlOiAoKSA9PlxuXHRcdHdzID0gKEB3aWR0aCAtIEBnZXRHcmlkR2FwKCkgKiAoQGdyaWRTaXplKCkgLSAxKSkgLyBAZ3JpZFNpemUoKVxuXHRcdHJldHVybiB3cyAvIEB3aWR0aFxuXG5cblxuXHRpc0dyaWQ6ICgpID0+XG5cdFx0cmV0dXJuIEBncmlkMi5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwic2hvd25cIlxuXG5cdHBpbmNoVG9HcmlkOiAoKSA9PlxuXHRcdGlmIEBpc0dyaWQoKSB0aGVuIEBwaW5jaFRvU2xpZGUoKVxuXHRcdGVsc2Vcblx0XHRcdCMgaWYgQGdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZ1bGxzY3JlZW5cIiB0aGVuIEBjaGFuZ2VTY2FsZSgpXG5cblx0XHRcdGZvciBpdGVtLCBpbmRleCBpbiBAZ3JpZEJ1dHRvbnNcblx0XHRcdFx0aWYgaW5kZXggPT0gQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRcdFx0XHRpdGVtLnN0YXRlU3dpdGNoKFwic2hvd25cIilcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGl0ZW0uc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XHRcdFx0XHRpdGVtLmFuaW1hdGUoXCJzaG93blwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUsIGRlbGF5OiAwLjEyICsgMC4wMiAqIE1hdGguYWJzKChAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleCAtIGluZGV4KSkpXG5cdFx0XHRcblx0XHRcdEBncmlkMi5zdGF0ZVN3aXRjaChcInNob3duXCIpXG5cdFx0XHR0cnkgQGdyaWQyLnNjcm9sbFRvUG9pbnQoeyB4OiAwLCB5OiBAZ3JpZEJ1dHRvbnNbQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhdLnkgLSBAZ3JpZEJ1dHRvbnNbQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhdLmhlaWdodCAvIDIgfSwgZmFsc2UpXG5cdFx0XHRcblx0XHRcdEBwYXVzZVZpZGVvcygpXG5cblx0cGluY2hUb1NsaWRlOiAoKSA9PlxuXHRcdCMgcHJpbnQgQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHRAZ3JpZDIuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlbltAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleF0sIGZhbHNlKVxuXHRcdFxuXHRcdFxuXG5cblxuXHRcdFxuXHRcdCIsIlxue1NsaWRlcjR9ID0gcmVxdWlyZSBcIlBDU2xpZGVyNFwiXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyNSBleHRlbmRzIFNsaWRlcjRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YWN0aXZlVmlkZW9QbGF5ZXI6IG51bGxcblx0XHRcdGFjdGl2ZVByb2dyZXNzU2xpZGVyOiBudWxsXG5cdFx0XHRhY3RpdmVEcmFnOiBmYWxzZVxuXHRcdFx0YWN0aXZlUGxheWluZzogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0XG5cdFx0RnJhbWVyLkxvb3Aub24gXCJyZW5kZXJcIiwgPT5cblx0XHRcdGlmICFAYWN0aXZlRHJhZyBhbmQgQGFjdGl2ZVBsYXlpbmcgYW5kICFAaXNHcmlkKClcblxuXHRcdFx0XHRpZiBAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgIT0gdW5kZWZpbmVkIGFuZCBAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgIT0gbnVsbFxuXHRcdFx0XHRcdGlmIEBhY3RpdmVWaWRlb1BsYXllciAhPSB1bmRlZmluZWQgYW5kIEBhY3RpdmVWaWRlb1BsYXllciAhPSBudWxsXG5cdFx0XHRcdFx0XHRAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIudmFsdWUgPSBVdGlscy5tb2R1bGF0ZShAYWN0aXZlVmlkZW9QbGF5ZXIuY3VycmVudFRpbWUsIFswLCBAYWN0aXZlVmlkZW9QbGF5ZXIuZHVyYXRpb25dLCBbMCwgMV0sIHRydWUpXG5cblxuXG5cdHVwZGF0ZUN1cnJlbnRQYWdlOiAoKSA9PlxuXHRcdHN1cGVyIEB1cGRhdGVDb250ZW50KClcblx0XHRcblx0XHRAc2VsZWN0Q3VycmVudFBsYXlpbmdWaWRlbygpXG5cdFx0QGFjdGl2ZURyYWcgPSBmYWxzZVxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICdhY3RpdmVQcm9ncmVzc1NsaWRlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVQcm9ncmVzc1NsaWRlclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVQcm9ncmVzc1NsaWRlciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhY3RpdmVWaWRlb1BsYXllcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVWaWRlb1BsYXllclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVWaWRlb1BsYXllciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhY3RpdmVEcmFnJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZURyYWdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlRHJhZyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhY3RpdmVQbGF5aW5nJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZVBsYXlpbmdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlUGxheWluZyA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdHNlbGVjdEN1cnJlbnRQbGF5aW5nVmlkZW86ICgpID0+XG5cdFx0Y3VycmVudGx5Tm90UGxheWluZyA9IHRydWVcblxuXHRcdGZvciBpdGVtIGluIEB2aWRlb1NsaWRlc1xuXHRcdFx0aWYgaXRlbSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0Y3VycmVudGx5Tm90UGxheWluZyA9IGZhbHNlXG5cdFx0XHRcdEBhY3RpdmVQcm9ncmVzc1NsaWRlciA9IEBjdXJyZW50UGFnZS5wbGF5ZXJTbGlkZXJcblx0XHRcdFx0QGFjdGl2ZVZpZGVvUGxheWVyID0gQGN1cnJlbnRQYWdlLnZpZGVvVmlldy5wbGF5ZXJcblx0XHRcblx0XHRpZiBjdXJyZW50bHlOb3RQbGF5aW5nXG5cdFx0XHRAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgPSBudWxsXG5cdFx0XHRAYWN0aXZlVmlkZW9QbGF5ZXIgPSBudWxsXG4iLCJcbntTbGlkZXIzfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjNcIlxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjQgZXh0ZW5kcyBTbGlkZXIzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6Y3VycmVudFBhZ2VcIiwgLT5cblx0XHRcdEB1cGRhdGVDdXJyZW50UGFnZSgpXG5cdFx0XG5cdFx0QGNvbnRlbnQub24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdEBwYXJlbnQuc2xpZGVDaGFuZ2VyVmlldy5wYWdlcyA9IEBjaGlsZHJlbi5sZW5ndGhcblx0XHRcdEBwYXJlbnQudXBkYXRlQ3VycmVudFBhZ2UoKVxuXHRcdFxuXHRcblx0XG5cdFxuXHR1cGRhdGVDdXJyZW50UGFnZTogKCkgPT5cblx0XHRpZiAhQGlzR3JpZCgpXG5cdFx0XHRmb3IgaXRlbSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdFx0aWYgaXRlbSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0XHRAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IGluZGV4XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcblxuXHRcdEBwYXVzZUJhY2tncm91bmRWaWRlb3MoKVxuXHRcdEB1cGRhdGVDdXJyZW50UGFnZVNsaWRlcigpXG5cblx0XHRpZiAhQGlzR3JpZCgpIHRoZW4gQHBsYXlBY3RpdmVWaWRlbygpXG5cdFx0XHRcblx0XG5cblxuXHRwbGF5QWN0aXZlVmlkZW86ICgpID0+XG5cdFx0Zm9yIGN1cnJlbnRWaWRlb1NsaWRlIGluIEB2aWRlb1NsaWRlc1xuXHRcdFx0aWYgY3VycmVudFZpZGVvU2xpZGUgPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdGN1cnJlbnRWaWRlb1NsaWRlLnBsYXkoKVxuXHRcdFx0XHRyZXR1cm5cblxuXG5cdHBhdXNlVmlkZW9zOiAoKSA9PlxuXHRcdGZvciBjdXJyZW50VmlkZW9TbGlkZSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGN1cnJlbnRWaWRlb1NsaWRlLnBhdXNlKClcblxuXG5cdHBhdXNlQmFja2dyb3VuZFZpZGVvczogKCkgPT5cblx0XHRmb3IgY3VycmVudFZpZGVvU2xpZGUgaW4gQHZpZGVvU2xpZGVzXG5cdFx0XHRpZiBjdXJyZW50VmlkZW9TbGlkZSAhPSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0Y3VycmVudFZpZGVvU2xpZGUucGF1c2UoKVxuXHRcblx0c2hvd0dyaWRDYW5jZWxCdXR0b246ICgpID0+XG5cdFx0QHNsaWRlQ2hhbmdlclZpZXcuY3VycmVudCA9IC0xXG5cdFxuXHR1cGRhdGVDdXJyZW50UGFnZVNsaWRlcjogKCkgPT5cblx0XHRpZiBAaXNHcmlkKClcblx0XHRcdEBzaG93R3JpZENhbmNlbEJ1dHRvbigpXG5cdFx0XHRyZXR1cm5cblx0XHRcblx0XHRmb3IgaXRlbSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGlmIGl0ZW0gPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdEBzbGlkZUNoYW5nZXJWaWV3LmN1cnJlbnQgPSAoaW5kZXggKyAxKVxuXHRcdFx0XHRyZXR1cm4iLCJcblxue1NsaWRlcjJ9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMlwiXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyMyBleHRlbmRzIFNsaWRlcjJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBpbml0U2hvcnRjdXRzKClcblx0XG5cdFxuXHRpbml0U2hvcnRjdXRzOiAoKSA9PlxuXHRcdGxvY2FsU2Nyb2xsID0gQFxuXHRcdFxuXHRcdEV2ZW50cy53cmFwKHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lciBcImtleWRvd25cIiwgKGV2ZW50KSAtPlxuXHRcdFx0XG5cdFx0XHRpZiBldmVudC5jb2RlIGlzIFwiQXJyb3dMZWZ0XCJcblx0XHRcdFx0aWYgIWxvY2FsU2Nyb2xsLmlzR3JpZCgpXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuc25hcFRvTmV4dFBhZ2UoXCJsZWZ0XCIsIGZhbHNlKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd1JpZ2h0XCJcblx0XHRcdFx0aWYgIWxvY2FsU2Nyb2xsLmlzR3JpZCgpXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuc25hcFRvTmV4dFBhZ2UoXCJyaWdodFwiLCBmYWxzZSlcblx0XHRcdFxuXG5cblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUNcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5jb3B5QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlSXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwucmVzdGFydEJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFxuXG5cblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUZcIlxuXHRcdFx0XHRpZiAhbG9jYWxTY3JvbGwuaXNHcmlkKClcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb0dyaWQoKVxuXHRcdFx0XHRcdFV0aWxzLmRlbGF5IDAuMzYsID0+XG5cdFx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlBXCJcblx0XHRcdFx0aWYgbG9jYWxTY3JvbGwuZ3JpZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwid2luZG93XCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvR3JpZCgpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XHRcdFV0aWxzLmRlbGF5IDAuMzYsID0+XG5cdFx0XHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvR3JpZCgpXG5cblx0XHRcdFxuXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJFc2NhcGVcIlxuXHRcdFx0XHRpZiBsb2NhbFNjcm9sbC5ncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmdWxsc2NyZWVuXCJcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5mdWxsc2NyZWVuQnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XHRlbHNlIGlmIGxvY2FsU2Nyb2xsLmlzR3JpZCgpXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb0dyaWQoKVxuXHRcdFx0XG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJTcGFjZVwiXG5cdFx0XHRcdHRyeSBsb2NhbFNjcm9sbC5jdXJyZW50UGFnZS50b2dnbGVQbGF5KClcblx0IiwiXG57U2xpZGVyMX0gPSByZXF1aXJlIFwiUENTbGlkZXIxXCJcblxuXG5TbGlkZVRlbXBsYXRlID0gcmVxdWlyZShcIlBDU2xpZGVcIilcblNsaWRlID0gU2xpZGVUZW1wbGF0ZS5TbGlkZVxuU2ltcGxlVmlkZW9TbGlkZSA9IFNsaWRlVGVtcGxhdGUuU2ltcGxlVmlkZW9TbGlkZVxuVmlkZW9TbGlkZSA9IFNsaWRlVGVtcGxhdGUuVmlkZW9TbGlkZVxuSERWaWRlb1NsaWRlID0gU2xpZGVUZW1wbGF0ZS5IRFZpZGVvU2xpZGVcblxuUHJvdG90eXBlU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlByb3RvdHlwZVNsaWRlXG5cblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIyIGV4dGVuZHMgU2xpZGVyMVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aWRlb1NsaWRlczogW11cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblx0QGRlZmluZSAndmlkZW9TbGlkZXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlkZW9TbGlkZXNcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRzbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0cmV0dXJuIHNsaWRlXG5cblxuXG5cdGJnVmlkZW9TbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgU2ltcGxlVmlkZW9TbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFxuXHRcdGlmIHNvdXJjZVVSTCAhPSBudWxsIHRoZW4gc2xpZGUuc291cmNlKHNvdXJjZVVSTClcblx0XHRAdmlkZW9TbGlkZXMucHVzaCBzbGlkZVxuXHRcdHJldHVybiBzbGlkZVxuXHRcblx0dmlkZW9TbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgSERWaWRlb1NsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0aWYgc291cmNlVVJMICE9IG51bGwgdGhlbiBzbGlkZS5zb3VyY2Uoc291cmNlVVJMKVxuXHRcdEB2aWRlb1NsaWRlcy5wdXNoIHNsaWRlXG5cdFx0cmV0dXJuIHNsaWRlXG5cblx0ZnVsbFZpZGVvU2xpZGU6IChzb3VyY2VVUkwgPSBudWxsKSA9PlxuXHRcdHNsaWRlID0gbmV3IFZpZGVvU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0QHZpZGVvU2xpZGVzLnB1c2ggc2xpZGVcblx0XHRyZXR1cm4gc2xpZGVcblxuXHRcblx0XG5cdFxuXHRcblx0XG5cblxuXHRwcm90b3R5cGVTbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgUHJvdG90eXBlU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0cmV0dXJuIHNsaWRlIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG57U2xpZGVyMH0gPSByZXF1aXJlIFwiUENTbGlkZXIwXCJcbiMge1NsaWRlclBpbmNofSA9IHJlcXVpcmUgXCJQQ1NsaWRlclBpbmNoXCJcbntTbGlkZUNoYW5nZXJ9ID0gcmVxdWlyZSBcIlBDU2xpZGVDaGFuZ2VyXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHQgPSBCdXR0b25zLlRleHRcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5Db3B5QnV0dG9uID0gQnV0dG9ucy5Db3B5QnV0dG9uXG5cblxuIyBQYW5lbHNcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIxIGV4dGVuZHMgU2xpZGVyMFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAdG9wVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAY2FudmFzLCBuYW1lOiBcInRvcFZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQGNhbnZhcy53aWR0aCwgaGVpZ2h0OiA1NlxuXHRcdFxuXHRcdEBib3R0b21WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBjYW52YXMsIG5hbWU6IFwiYm90dG9tVmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAY2FudmFzLndpZHRoLCBoZWlnaHQ6IDU2LCB5OiBBbGlnbi5ib3R0b21cblx0XHRcblx0XHRmb3IgaXRlbSBpbiBbQHRvcFZpZXcsIEBib3R0b21WaWV3XVxuXHRcdFx0aXRlbS5zZW5kVG9CYWNrKClcblx0XHRcdGl0ZW0uc3RhdGVzID1cblx0XHRcdFx0XCJ3aW5kb3dcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0IyBUb3AgVmlld1xuXHRcdEBsb2dvQnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJsb2dvXCJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMiwgYXNzZXQ6IFNWRy5sb2dvSWNvblxuXHRcdFx0aGFuZGxlcjogQG9wZW5VUkxIb21lXG5cdFx0XG5cdFx0QHRpdGxlVGV4dCA9IG5ldyBUZXh0XG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcInRpdGxlXCJcblx0XHRcdHRleHQ6IEB0aXRsZSwgdGV4dEFsaWduOiBcImNlbnRlclwiLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG5cdFx0XG5cdFx0QGNvcHlCdXR0b24gPSBuZXcgQ29weUJ1dHRvblxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJjb3B5IGxpbmtcIlxuXHRcdFx0dGV4dDogXCJDb3B5IExpbmtcIiwgdGV4dEFsaWduOiBcInJpZ2h0XCIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y3VzdG9tOiB7IHg6IC00MC0yMC0yNCB9XG5cdFx0XHRsaW5rOiB3aW5kb3cubG9jYXRpb25cblx0XHRcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiZnVsbHNjcmVlblwiXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCwgYXNzZXQ6IFNWRy5mdWxsc2NyZWVuSWNvblxuXHRcdFx0aGFuZGxlcjogQGNoYW5nZVNjYWxlXG5cdFx0XHRjdXN0b206IHsgeDogLTM2IH1cblx0XHRcblxuXG5cblx0XHQjIEJvdHRvbSBWaWV3XG5cdFx0QHNsaWRlQ2hhbmdlclZpZXcgPSBuZXcgU2xpZGVDaGFuZ2VyXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInNsaWRlIGNoYW5nZXJcIlxuXHRcdFx0eDogQWxpZ24uY2VudGVyXG5cdFx0XHRzbGlkZXI6IEBcblx0XHRcblx0XHRAcmVzdGFydEJ1dHRvbiA9IG5ldyBUZXh0QnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEBib3R0b21WaWV3LCBuYW1lOiBcInJlc3RhcnRcIlxuXHRcdFx0dGV4dDogXCJSZXN0YXJ0IChSKVwiLCB0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTIwMDApLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGhhbmRsZXI6IEByZXN0YXJ0SGFuZGxlclxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0yMDAwIH1cblx0XHRcblx0XHRcblxuXG5cdFx0QHVwZGF0ZVZpZXdCdWlsZGVyU2l6ZShAY2FudmFzKVxuXHRcdEBjYW52YXMub24gXCJjaGFuZ2U6c2l6ZVwiLCA9PlxuXHRcdFx0QHVwZGF0ZVZpZXdCdWlsZGVyU2l6ZShAY2FudmFzKVxuXHRcdFxuXHRcdFxuXHRcblxuXHR1cGRhdGVWaWV3QnVpbGRlclNpemU6IChhbmNob3IpID0+XG5cdFx0XG5cdFx0QHRvcFZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcblx0XHRpZiBhbmNob3Iud2lkdGggPCA3NDBcblx0XHRcdEB0aXRsZVRleHQud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRcdEB0aXRsZVRleHQudGV4dEFsaWduID0gXCJsZWZ0XCJcblx0XHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEB0aXRsZVRleHQueSA9IEFsaWduLnRvcChAdG9wVmlldy5oZWlnaHQgKyAxMClcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLmxlZnQoQGxvZ29CdXR0b24ueClcblx0XHRcdEBjb3B5QnV0dG9uLnkgPSBBbGlnbi50b3AoQHRvcFZpZXcuaGVpZ2h0ICsgMzYpXG5cdFx0ZWxzZVxuXHRcdFx0QHRpdGxlVGV4dC53aWR0aCA9IGFuY2hvci53aWR0aCAvIDJcblx0XHRcdEB0aXRsZVRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIlxuXHRcdFx0QHRpdGxlVGV4dC54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRAdGl0bGVUZXh0LnkgPSBBbGlnbi5jZW50ZXIoMilcblx0XHRcdFxuXHRcdFx0QGNvcHlCdXR0b24ueCA9IEFsaWduLnJpZ2h0KEBjb3B5QnV0dG9uLmN1c3RvbS54KVxuXHRcdFx0QGNvcHlCdXR0b24ueSA9IEFsaWduLmNlbnRlcigyKVxuXHRcdFxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uLnggPSBBbGlnbi5yaWdodChAZnVsbHNjcmVlbkJ1dHRvbi5jdXN0b20ueClcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbi55ID0gQWxpZ24uY2VudGVyKDIpXG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcud2lkdGggPSBhbmNob3Iud2lkdGhcblx0XHRAc2xpZGVDaGFuZ2VyVmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0IyBoZWlnaHRcblx0XHRAYm90dG9tVmlldy55ID0gQWxpZ24uYm90dG9tIiwiXG5cbiMgU2NhbGUgJiBVUkwgaGFuZGxpbmdcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIwIGV4dGVuZHMgUGFnZUNvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdGNhbnZhc0JhY2tncm91bmRMYXllciA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdG5hbWU6IFwiYmFja2dyb3VuZExheWVyXCJcblx0XHRcblxuXG5cdFx0Y2FudmFzTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY2FudmFzXCJcblx0XHRcdHdpZHRoOiBTY3JlZW4ud2lkdGhcblx0XHRcdGhlaWdodDogU2NyZWVuLmhlaWdodFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsb2NhbFNjcm9sbDogbnVsbFxuXHRcdFxuXHRcdGNhbnZhc0xheWVyLnN0YXRlcyA9XG5cdFx0XHRcIndpbmRvd1wiOiB7IGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIgfVxuXHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgYmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIiB9XG5cblxuXHRcdCMgTGVnYWN5XG5cdFx0bGVnYWN5U2Nyb2xsID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBjYW52YXNMYXllclxuXHRcdFx0bmFtZTogXCJncmlkXCJcblx0XHRcdHdpZHRoOiAxNDAwICogMiwgaGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2UsIHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGlnbm9yZUV2ZW50czogdHJ1ZVxuXHRcdFxuXHRcdGxlZ2FjeVNjcm9sbC5zdGF0ZXMgPVxuXHRcdFx0XCJ3aW5kb3dcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZ1bGxzY3JlZW5cIjogeyBzY2FsZTogMSB9XG5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRjYW52YXM6IGNhbnZhc0xheWVyXG5cdFx0XHRncmlkOiBsZWdhY3lTY3JvbGxcblx0XHRcdGJhY2tncm91bmRMYXllcjogY2FudmFzQmFja2dyb3VuZExheWVyXG5cdFxuXHRcdFx0cGFyZW50OiBsZWdhY3lTY3JvbGwuY29udGVudFxuXHRcdFx0d2lkdGg6IGxlZ2FjeVNjcm9sbC53aWR0aCwgaGVpZ2h0OiBsZWdhY3lTY3JvbGwuaGVpZ2h0XG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2UsIHNjcm9sbEhvcml6b250YWw6IHRydWVcblx0XHRcdHByZXNlbnRhdGlvblRpdGxlOiBcIlVudGl0bGVkXCJcblx0XHRcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY29udGVudC5kcmFnZ2FibGUucHJvcGFnYXRlRXZlbnRzID0gZmFsc2VcblxuXHRcdEZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmRpc2FibGUoKVxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXHRcdFxuXHRcdEBpbml0U2NhbGUoKVxuXHRcdFxuXHRcdEB1cGRhdGVTaXplKClcblx0XHRAYmFja2dyb3VuZExheWVyLm9uIFwiY2hhbmdlOnNpemVcIiwgPT5cblx0XHRcdEB1cGRhdGVTaXplKClcblx0XHRcblxuXG5cdFxuXG5cdEBkZWZpbmUgJ3RpdGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByZXNlbnRhdGlvblRpdGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByZXNlbnRhdGlvblRpdGxlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2NhbnZhcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jYW52YXNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuY2FudmFzID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dyaWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZ3JpZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2JhY2tncm91bmRMYXllcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5iYWNrZ3JvdW5kTGF5ZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYmFja2dyb3VuZExheWVyID0gdmFsdWVcblx0XG5cdFxuXHRcblxuXHQjIGlzR3JpZDogKCkgPT5cblx0IyBcdHJldHVybiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImdyaWRcIlxuXHRcblx0dXBkYXRlU2l6ZTogKCkgPT5cblx0XHRAaW5pdFNjYWxlKEBncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFxuXHRpbml0U2NhbGU6IChmb3JTdGF0ZSA9IFwid2luZG93XCIpID0+XG5cdFx0QGNhbnZhcy53aWR0aCA9IFNjcmVlbi53aWR0aFxuXHRcdEBjYW52YXMuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXG5cdFx0c2NhbGVYID0gKFNjcmVlbi53aWR0aCAtIDIwKSAvIEBncmlkLndpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGdyaWQuaGVpZ2h0XG5cdFx0QGdyaWQuc3RhdGVzLndpbmRvdy5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdHNjYWxlWCA9IFNjcmVlbi53aWR0aCAvIEBncmlkLndpZHRoXG5cdFx0c2NhbGVZID0gU2NyZWVuLmhlaWdodCAvIEBncmlkLmhlaWdodFxuXHRcdEBncmlkLnN0YXRlcy5mdWxsc2NyZWVuLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFx0XG5cdFx0QGdyaWQuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0QGNhbnZhcy5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRAZ3JpZC5jZW50ZXIoKVxuXHRcblx0XG5cdCMgZm9yIHJlYWN0XG5cdGNoYW5nZVNjYWxlOiAoKSA9PlxuXHRcdFxuXHRcdGlmIEBncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJ3aW5kb3dcIiB0aGVuIG5leHRTdGF0ZSA9IFwiZnVsbHNjcmVlblwiXG5cdFx0ZWxzZSBuZXh0U3RhdGUgPSBcIndpbmRvd1wiXG5cdFx0XG5cdFx0QGdyaWQuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAY2FudmFzLmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QHRvcFZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAYm90dG9tVmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblxuXHRyZXN0YXJ0SGFuZGxlcjogKCkgPT5cblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlblswXSwgZmFsc2UpXG5cdFxuXHRcblx0b3BlblVSTDogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiLCBpc0JsYW5rID0gZmFsc2UpID0+XG5cdFx0aWYgaXNCbGFuayB0aGVuIHdpbmRvdy5vcGVuIHVybCwgJ19ibGFuaydcblx0XHRlbHNlXG4jIFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gXCI/c2xpZGVJRFwiXG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSB1cmxcblx0XG5cdG9wZW5VUkxIb21lOiA9PlxuXHRcdEBvcGVuVVJMKFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiLCBmYWxzZSlcblxuIiwiXG5cblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG4jIFRleHQgPSBCdXR0b25zLlRleHRcblRleHRCdXR0b24gPSBCdXR0b25zLlRleHRCdXR0b25cblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5cblxuY2xhc3MgZXhwb3J0cy5TbGlkZUNoYW5nZXIgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJwcm9ncmVzcyB2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IDEyMFxuXHRcdFx0aGVpZ2h0OiA1NlxuXHRcdFx0cGFnZXM6IDFcblx0XHRcdGN1cnJlbnQ6IDFcblx0XHRcdHNsaWRlcjogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0dGVzdEhhZGxlciA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHR0cnkgQHBhcmVudC5zbGlkZXIucGluY2hUb0dyaWQoKVxuXG5cblx0XHRAY3VycmVudFRleHQgPSBuZXcgVGV4dEJ1dHRvblxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiLCB3aWR0aDogMTIwLCBsZXR0ZXJTcGFjaW5nOiAzXG5cdFx0XHRoYW5kbGVyOiB0ZXN0SGFkbGVyXG5cdFx0XG5cdFx0QGN1cnJlbnRUZXh0LnVwZGF0ZVR1cGxlKHsgbm9ybWFsOiAxLCBob3ZlcjogMC44IH0pXG5cblx0XHRAcHJldkJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwicHJldlwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcucHJldkljb25cblx0XHRcdGhhbmRsZXI6IEBtb3ZlTGVmdFxuXHRcdFxuXHRcdEBuZXh0QnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0bmFtZTogXCJuZXh0XCIsIHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgYXNzZXQ6IFNWRy5uZXh0SWNvblxuXHRcdFx0aGFuZGxlcjogQG1vdmVSaWdodFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QGN1cnJlbnRUZXh0LnBhcmVudCA9IEBcblx0XHRAY3VycmVudFRleHQueSA9IEFsaWduLmNlbnRlcigtMSlcblx0XHRAY3VycmVudFRleHQuc3R5bGUgPVxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCJ0bnVtXCJcblx0XHRcdFwiZm9udC12YXJpYW50LW51bWVyaWNcIjogXCJ0YWJ1bGFyLW51bXMgbGluaW5nLW51bXNcIlxuXHRcdFxuXHRcdEBwcmV2QnV0dG9uLnBhcmVudCA9IEBcblx0XHRAcHJldkJ1dHRvbi54ID0gQWxpZ24ubGVmdFxuXHRcdEBwcmV2QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XHRAbmV4dEJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QG5leHRCdXR0b24ueCA9IEFsaWduLnJpZ2h0XG5cdFx0QG5leHRCdXR0b24ueSA9IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcblx0QGRlZmluZSAnc2xpZGVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNsaWRlclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2xpZGVyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3BhZ2VzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnBhZ2VzXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5wYWdlcyA9IHZhbHVlXG5cdFx0XHRAY3VycmVudFRleHQudGV4dCA9IFwiI3tAY3VycmVudH0vI3tAcGFnZXN9XCJcblxuXHRAZGVmaW5lICdjdXJyZW50Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmN1cnJlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmN1cnJlbnQgPSB2YWx1ZVxuXG5cdFx0XHRpZiBAY3VycmVudCAhPSAtMVxuXHRcdFx0XHQjIHRoZW4gQHBhcmVudC5hbmltYXRlKG9wYWNpdHk6IDAsIGN1cnZlOiBTcHJpbmcoZGFtcnBpbmc6IDEpLCB0aW1lOiAwLjQpXG5cdFx0XHQjIGVsc2Vcblx0XHRcdFx0IyBAcGFyZW50LmFuaW1hdGUob3BhY2l0eTogMSwgY3VydmU6IFNwcmluZyhkYW1ycGluZzogMSksIHRpbWU6IDAuNClcblx0XHRcdFx0QGN1cnJlbnRUZXh0LnRleHQgPSBcIiN7QGN1cnJlbnR9LyN7QHBhZ2VzfVwiXG5cdFx0XHRcblx0XG5cblxuXG5cdG1vdmVMZWZ0OiAoKSA9PlxuIyBcdFx0cHJpbnQgQHNsaWRlclxuXHRcdEBzbGlkZXIuc25hcFRvTmV4dFBhZ2UoXCJsZWZ0XCIsIGZhbHNlKVxuXHRcblx0bW92ZVJpZ2h0OiAoKSA9PlxuIyBcdFx0cHJpbnQgQHNsaWRlclxuXHRcdEBzbGlkZXIuc25hcFRvTmV4dFBhZ2UoXCJyaWdodFwiLCBmYWxzZSkiLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuY29sb3Jfb25EYXJrID0gXCIjZmZmXCJcbmNvbG9yX29uTGlnaHQgPSBcIiMwMDBcIlxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG5cbmV4cG9ydHMubG9nb0ljb24gPSB7IG9uRGFyazogZ2V0TG9nbyhjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRMb2dvKGNvbG9yX29uTGlnaHQpfVxuXG5cblxuZ2V0RnVsbHNjcmVlbiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0xMS4wNDEgMi45MjE2NEMxMS4wNDEgMy40NDQ3MyAxMS40MjI1IDMuODM0OTggMTEuOTUzMyAzLjgzNDk4SDEyLjU0MjNMMTUuMTEzNSAzLjY2MDYxTDEzLjA5OCA1LjU3ODYyTDEwLjcwOTIgNy45NTMzQzEwLjUyNjcgOC4xMjc2NiAxMC40NDM4IDguMzUxODQgMTAuNDQzOCA4LjU5MjYzQzEwLjQ0MzggOS4xNTcyNCAxMC44MjUzIDkuNTY0MDkgMTEuMzg5MyA5LjU2NDA5QzExLjY0NjQgOS41NjQwOSAxMS44NzA0IDkuNDY0NDUgMTIuMDUyOSA5LjI5MDA5TDE0LjQzMzQgNi45MDcxMUwxNi4zNDExIDQuODgxMTZMMTYuMTY2OSA3LjQ3MTcyVjguMTE5MzZDMTYuMTY2OSA4LjY0MjQ1IDE2LjU0ODUgOS4wNDEgMTcuMDc5MyA5LjA0MUMxNy42MTAyIDkuMDQxIDE4IDguNjUwNzUgMTggOC4xMTkzNlYzLjUxMTE2QzE4IDIuNTU2MzEgMTcuNDQ0MyAyIDE2LjQ5MDQgMkwxMS45NTMzIDJDMTEuNDMwOCAyIDExLjA0MSAyLjM5MDI0IDExLjA0MSAyLjkyMTY0Wk0yIDExLjg4MDZMMiAxNi40ODg4QzIgMTcuNDQzNyAyLjU1NTczIDE4IDMuNTA5NTkgMThIOC4wNDY2NkM4LjU2OTIxIDE4IDguOTU5MDUgMTcuNjAxNSA4Ljk1OTA1IDE3LjA3ODRDOC45NTkwNSAxNi41NTUzIDguNTc3NSAxNi4xNjUgOC4wNDY2NiAxNi4xNjVINy40NTc3NUw0Ljg4NjQ3IDE2LjMzOTRMNi45MDIwMiAxNC40MjE0TDkuMjkwODIgMTIuMDQ2N0M5LjQ3MzMgMTEuODcyMyA5LjU1NjI1IDExLjY0ODIgOS41NTYyNSAxMS4zOTkxQzkuNTU2MjUgMTAuODM0NSA5LjE3NDcgMTAuNDI3NiA4LjYxMDY4IDEwLjQyNzZDOC4zNTM1NSAxMC40Mjc2IDguMTIxMzEgMTAuNTI3MiA3Ljk0NzEyIDEwLjcwOTlMNS41NjY2MiAxMy4wOTI5TDMuNjU4ODkgMTUuMTE4OEwzLjgzMzA3IDEyLjUyODNMMy44MzMwNyAxMS44ODA2QzMuODMzMDcgMTEuMzQ5MiAzLjQ1MTUzIDEwLjk1OSAyLjkyMDY4IDEwLjk1OUMyLjM4OTg0IDEwLjk1OSAyIDExLjM0OTIgMiAxMS44ODA2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLmZ1bGxzY3JlZW5JY29uID0geyBvbkRhcms6IGdldEZ1bGxzY3JlZW4oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0RnVsbHNjcmVlbihjb2xvcl9vbkxpZ2h0KX1cblxuXG5cblxuZ2V0TmV4dCA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk00Ljc5NjQgMTIuNzkzMUw5LjU4NjI3IDhMNC43OTY0IDMuMjA2ODdDNC40MDYwMSAyLjgxNjIxIDQuNDA2MjIgMi4xODMwNCA0Ljc5Njg4IDEuNzkyNjVDNS4xODc1NCAxLjQwMjI2IDUuODIwNyAxLjQwMjQ4IDYuMjExMDkgMS43OTMxM0wxMS43MDczIDcuMjkzMTNDMTIuMDk3NSA3LjY4MzYgMTIuMDk3NSA4LjMxNjQgMTEuNzA3MyA4LjcwNjg3TDYuMjExMDkgMTQuMjA2OUM1LjgyMDcgMTQuNTk3NSA1LjE4NzU0IDE0LjU5NzcgNC43OTY4OCAxNC4yMDczQzQuNDA2MjIgMTMuODE3IDQuNDA2MDEgMTMuMTgzOCA0Ljc5NjQgMTIuNzkzMVpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5uZXh0SWNvbiA9IHsgb25EYXJrOiBnZXROZXh0KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldE5leHQoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0UHJldiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk02LjQxNzQ4IDhMMTEuMjA3MyAxMi43OTMxQzExLjU5NzcgMTMuMTgzOCAxMS41OTc1IDEzLjgxNyAxMS4yMDY5IDE0LjIwNzNDMTAuODE2MiAxNC41OTc3IDEwLjE4MyAxNC41OTc1IDkuNzkyNjUgMTQuMjA2OUw0LjI5NjQgOC43MDY4N0MzLjkwNjIgOC4zMTY0IDMuOTA2MiA3LjY4MzYgNC4yOTY0IDcuMjkzMTNMOS43OTI2NSAxLjc5MzEzQzEwLjE4MyAxLjQwMjQ4IDEwLjgxNjIgMS40MDIyNiAxMS4yMDY5IDEuNzkyNjVDMTEuNTk3NSAyLjE4MzA0IDExLjU5NzcgMi44MTYyMSAxMS4yMDczIDMuMjA2ODdMNi40MTc0OCA4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnByZXZJY29uID0geyBvbkRhcms6IGdldFByZXYoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UHJldihjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5nZXRQbGF5ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPGNpcmNsZSBvcGFjaXR5PVwiMC41XCIgY3g9XCI5MFwiIGN5PVwiOTBcIiByPVwiOTBcIiBmaWxsPVwiIzAwMFwiLz5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03Ni43MTU4IDU4LjQ5MTRDNzMuMDUxMyA1Ni4yMzY0IDY4LjMzMzQgNTguODcyOSA2OC4zMzM0IDYzLjE3NTZWMTE2LjgyNEM2OC4zMzM0IDEyMS4xMjcgNzMuMDUxNSAxMjMuNzYzIDc2LjcxNiAxMjEuNTA4TDEyMy45NzIgOTQuNjgyNkMxMjcuNDYyIDkyLjUzNDkgMTI3LjQ2MiA4Ny40NjE5IDEyMy45NzIgODUuMzE0M0w3Ni43MTU4IDU4LjQ5MTRaXCIgZmlsbD1cIndoaXRlXCIgZmlsbC1vcGFjaXR5PVwiMC44XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXlJY29uID0geyBvbkRhcms6IGdldFBsYXkoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuZ2V0UGF1c2UgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgdmlld0JveD1cIjAgMCAxODAgMTgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48Y2lyY2xlIG9wYWNpdHk9XCIwLjVcIiBjeD1cIjkwXCIgY3k9XCI5MFwiIHI9XCI5MFwiIGZpbGw9XCIjMDAwXCIvPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTcwIDU2QzY1LjU4MTcgNTYgNjIgNTkuNTgxNyA2MiA2NFYxMTZDNjIgMTIwLjQxOCA2NS41ODE3IDEyNCA3MCAxMjRINzZDODAuNDE4MyAxMjQgODQgMTIwLjQxOCA4NCAxMTZWNjRDODQgNTkuNTgxNyA4MC40MTgzIDU2IDc2IDU2SDcwWk0xMDQgNTZDOTkuNTgxNyA1NiA5NiA1OS41ODE3IDk2IDY0VjExNkM5NiAxMjAuNDE4IDk5LjU4MTcgMTI0IDEwNCAxMjRIMTEwQzExNC40MTggMTI0IDExOCAxMjAuNDE4IDExOCAxMTZWNjRDMTE4IDU5LjU4MTcgMTE0LjQxOCA1NiAxMTAgNTZIMTA0WlwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGwtb3BhY2l0eT1cIjAuOFwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wYXVzZUljb24gPSB7IG9uRGFyazogZ2V0UGF1c2UoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGF1c2UoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFZpZGVvU2xpZGVyID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjM2OFwiIGhlaWdodD1cIjExMlwiIHZpZXdCb3g9XCIwIDAgMzY4IDExMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHJlY3Qgb3BhY2l0eT1cIjAuM1wiIHdpZHRoPVwiMzY4XCIgaGVpZ2h0PVwiMTEyXCIgcng9XCI1NlwiIGZpbGw9XCIjMDAwXCIvPlxuPHJlY3Qgb3BhY2l0eT1cIjAuNVwiIHg9XCIzNFwiIHk9XCI1MlwiIHdpZHRoPVwiMzAwXCIgaGVpZ2h0PVwiOFwiIHJ4PVwiNFwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy52aWRlb1NsaWRlckljb24gPSB7IG9uRGFyazogZ2V0VmlkZW9TbGlkZXIoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0VmlkZW9TbGlkZXIoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0U2hhcmVQcm90b3R5cGUgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgdmlld0JveD1cIjAgMCAxODAgMTgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cmVjdCBvcGFjaXR5PVwiMC4zXCIgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiByeD1cIjkwXCIgZmlsbD1cIiMwMDBcIi8+XG48ZyBvcGFjaXR5PVwiMC42XCI+XG48cGF0aCBkPVwiTTEwMS42NyA1Ny43NTg2SDgwLjE3NjJDNzYuODMxMiA1Ny43NTg2IDc0LjAyMTYgNjAuMDUwOSA3My4yMzI1IDYzLjE1MDNDNzIuOTg4NSA2NC4xMDg5IDcyLjIwOTUgNjQuOTIzMyA3MS4yMjAzIDY0LjkyMzNINjcuNjM3OUM2Ni42NDg2IDY0LjkyMzMgNjUuODM0OSA2NC4xMTc0IDY1Ljk1NzEgNjMuMTM1N0M2Ni44MzcgNTYuMDY1NCA3Mi44Njc2IDUwLjU5MzggODAuMTc2MiA1MC41OTM4SDEwMS42N0MxMDkuNTg0IDUwLjU5MzggMTE2IDU3LjAwOTQgMTE2IDY0LjkyMzNWMTE1LjA3N0MxMTYgMTIyLjk5MSAxMDkuNTg0IDEyOS40MDYgMTAxLjY3IDEyOS40MDZIODAuMTc2MkM3Mi44Njc2IDEyOS40MDYgNjYuODM3IDEyMy45MzUgNjUuOTU3MSAxMTYuODY0QzY1LjgzNDkgMTE1Ljg4MyA2Ni42NDg2IDExNS4wNzcgNjcuNjM3OSAxMTUuMDc3SDcxLjIyMDNDNzIuMjA5NSAxMTUuMDc3IDcyLjk4ODUgMTE1Ljg5MSA3My4yMzI1IDExNi44NUM3NC4wMjE2IDExOS45NDkgNzYuODMxMiAxMjIuMjQxIDgwLjE3NjIgMTIyLjI0MUgxMDEuNjdDMTA1LjYyNyAxMjIuMjQxIDEwOC44MzUgMTE5LjAzNCAxMDguODM1IDExNS4wNzdWNjQuOTIzM0MxMDguODM1IDYwLjk2NjMgMTA1LjYyNyA1Ny43NTg2IDEwMS42NyA1Ny43NTg2WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjY0NyAxMDEuODA1TDc4LjYwMDQgOTIuNDYyOUg0OS44Mzc5QzQ4LjQ3NzcgOTIuNDYyOSA0Ny4zNzUgOTEuMzYwMiA0Ny4zNzUgOTBDNDcuMzc1IDg4LjYzOTggNDguNDc3NyA4Ny41MzcxIDQ5LjgzNzkgODcuNTM3MUg3OC42MDA0TDY5LjI2NDcgNzguMTk1MUM2OC4zMDMyIDc3LjIzMjkgNjguMzAzOCA3NS42NzM1IDY5LjI2NTkgNzQuNzEyQzcwLjIyOCA3My43NTA1IDcxLjc4NzUgNzMuNzUxMSA3Mi43NDkgNzQuNzEzMkw4Ni4yODU2IDg4LjI1OTFDODcuMjQ2NiA4OS4yMjA4IDg3LjI0NjYgOTAuNzc5MyA4Ni4yODU2IDkxLjc0MDlMNzIuNzQ5IDEwNS4yODdDNzEuNzg3NSAxMDYuMjQ5IDcwLjIyOCAxMDYuMjQ5IDY5LjI2NTkgMTA1LjI4OEM2OC4zMDM4IDEwNC4zMjcgNjguMzAzMiAxMDIuNzY3IDY5LjI2NDcgMTAxLjgwNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48L2c+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMuc2hhcmVQcm90b3R5cGVJY29uID0geyBvbkRhcms6IGdldFNoYXJlUHJvdG90eXBlKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFNoYXJlUHJvdG90eXBlKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cblxuXG5cblxuXG5cbiMgUCBMIEEgWSBFIFIg4oCUIEkgQyBPIE4gU1xuXG5nZXRQbGF5ZXJQbGF5ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjguMzQ5NCAxOC41NjYzQzI1LjgzMjQgMTcuMDE3NSAyMi41OTE4IDE4LjgyODMgMjIuNTkxOCAyMS43ODM3TDIyLjU5MTggNTguNjMyNEMyMi41OTE4IDYxLjU4NzggMjUuODMyNSA2My4zOTg3IDI4LjM0OTUgNjEuODQ5N0w2MC44MDc1IDQzLjQyNDVDNjMuMjA0NiA0MS45NDk0IDYzLjIwNDUgMzguNDY1IDYwLjgwNzQgMzYuOTg5OUwyOC4zNDk0IDE4LjU2NjNaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXllclBsYXlJY29uID0geyBvbkRhcms6IGdldFBsYXllclBsYXkoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyUGxheShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuZ2V0UGxheWVyUGF1c2UgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiODBcIiBoZWlnaHQ9XCI4MFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yNi4zMTU4IDE2LjczNjhDMjMuMjkyOCAxNi43MzY4IDIwLjg0MjIgMTkuMTg3NSAyMC44NDIyIDIyLjIxMDVWNTcuNzg5NEMyMC44NDIyIDYwLjgxMjUgMjMuMjkyOCA2My4yNjMxIDI2LjMxNTggNjMuMjYzMUgzMC40MjExQzMzLjQ0NDEgNjMuMjYzMSAzNS44OTQ4IDYwLjgxMjUgMzUuODk0OCA1Ny43ODk1VjIyLjIxMDVDMzUuODk0OCAxOS4xODc1IDMzLjQ0NDEgMTYuNzM2OCAzMC40MjExIDE2LjczNjhIMjYuMzE1OFpNNDkuNTc5MyAxNi43MzY4QzQ2LjU1NjIgMTYuNzM2OCA0NC4xMDU2IDE5LjE4NzUgNDQuMTA1NiAyMi4yMTA1VjU3Ljc4OTRDNDQuMTA1NiA2MC44MTI1IDQ2LjU1NjIgNjMuMjYzMSA0OS41NzkzIDYzLjI2MzFINTMuNjg0NUM1Ni43MDc2IDYzLjI2MzEgNTkuMTU4MiA2MC44MTI1IDU5LjE1ODIgNTcuNzg5NVYyMi4yMTA1QzU5LjE1ODIgMTkuMTg3NSA1Ni43MDc2IDE2LjczNjggNTMuNjg0NSAxNi43MzY4SDQ5LjU3OTNaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXllclBhdXNlSWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5ZXJQYXVzZShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQbGF5ZXJQYXVzZShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5cbmdldFBsYXllclNvdW5kID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTQwIDE1SDM3LjVMMjcuNSAyNy41SDIwQzE4LjQ1NzMgMjcuNSAxNy42ODYgMjcuNSAxNi44OTMgMjcuNzczOEMxNS45NTk5IDI4LjA5NiAxNC44NjAxIDI4Ljk1ODMgMTQuMzI0NiAyOS43ODc1QzEzLjg2OTUgMzAuNDkyMiAxMy43MjU5IDMxLjA3NjUgMTMuNDM4OCAzMi4yNDQ5QzEyLjgxNjcgMzQuNzc2OSAxMi41IDM3LjM4MDUgMTIuNSA0MEMxMi41IDQyLjYxOTUgMTIuODE2NyA0NS4yMjMxIDEzLjQzODggNDcuNzU1MUMxMy43MjU5IDQ4LjkyMzUgMTMuODY5NSA0OS41MDc4IDE0LjMyNDYgNTAuMjEyNUMxNC44NjAxIDUxLjA0MTcgMTUuOTU5OSA1MS45MDQgMTYuODkzIDUyLjIyNjJDMTcuNjg2IDUyLjUgMTguNDU3MyA1Mi41IDIwIDUyLjVIMjcuNUwzNy41IDY1SDQwQzQzLjA1IDY1IDQ2LjI1IDU1IDQ2LjI1IDM5Ljk1NzNDNDYuMjUgMjQuOTE0NyA0My4xODMzIDE1IDQwIDE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjxwYXRoIGQ9XCJNNTIuNSAzOS45NzYzQzUyLjQ5NSAzNy4zNDIzIDUxLjY1OCAzNC43NzcyIDUwLjEwODYgMzIuNjQ3TDU0LjE1MjEgMjkuNzA1OUM1Ni4zMjEzIDMyLjY4OCA1Ny40OTMgMzYuMjc5MiA1Ny41IDM5Ljk2NjhDNTcuNTA3IDQzLjY1NDQgNTYuMzQ4OSA0Ny4yNSA1NC4xOTEgNTAuMjQwNEw1MC4xMzY0IDQ3LjMxNDZDNTEuNjc3OCA0NS4xNzg2IDUyLjUwNSA0Mi42MTAzIDUyLjUgMzkuOTc2M1pcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTU4LjE5NTUgMjYuNzY0N0M2MC45ODQ1IDMwLjU5ODkgNjIuNDkxIDM1LjIxNjEgNjIuNSAzOS45NTczQzYyLjUwOSA0NC42OTg2IDYxLjAyIDQ5LjMyMTUgNTguMjQ1NiA1My4xNjYyTDYyLjMwMDEgNTYuMDkyMUM2NS42OTExIDUxLjM5MjkgNjcuNTEwOSA0NS43NDI3IDY3LjUgMzkuOTQ3OUM2Ny40ODkgMzQuMTUzIDY1LjY0NzcgMjguNTA5NyA2Mi4yMzg5IDIzLjgyMzVMNTguMTk1NSAyNi43NjQ3WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJTb3VuZEljb24gPSB7IG9uRGFyazogZ2V0UGxheWVyU291bmQoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyU291bmQoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFBsYXllclNvdW5kT2ZmID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTQ1IDE1SDQ3LjVDNTAuNjgzMyAxNSA1My42IDI0LjcyMjIgNTMuNiA0MEM1My42IDQxLjc0MDYgNTMuNTYwNCA0My40MDkgNTMuNDg1OCA0NC45OTkyTDM4LjMyNiAyMy4zNDI0TDQ1IDE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjxwYXRoIGQ9XCJNMzEuMjM2MyAyNy41SDI3LjVDMjUuOTU3MyAyNy41IDI1LjE4NiAyNy41IDI0LjM5MyAyNy43NzM4QzIzLjQ1OTkgMjguMDk2IDIyLjM2MDEgMjguOTU4MyAyMS44MjQ2IDI5Ljc4NzVDMjEuMzY5NSAzMC40OTIyIDIxLjIyNTkgMzEuMDc2NSAyMC45Mzg4IDMyLjI0NDlDMjAuMzE2NyAzNC43NzY5IDIwIDM3LjM4MDUgMjAgNDBDMjAgNDIuNjE5NSAyMC4zMTY3IDQ1LjIyMzEgMjAuOTM4OCA0Ny43NTUxQzIxLjIyNTkgNDguOTIzNiAyMS4zNjk1IDQ5LjUwNzggMjEuODI0NiA1MC4yMTI1QzIyLjM2MDEgNTEuMDQxNyAyMy40NTk5IDUxLjkwNCAyNC4zOTMgNTIuMjI2MkMyNS4xODYgNTIuNSAyNS45NTczIDUyLjUgMjcuNSA1Mi41SDM1TDQ1IDY1SDQ3LjVDNDkuMTUwNyA2NSA1MC44MDE0IDYyLjE1MjMgNTEuOTY4NSA1Ny4xMTc1TDU3LjUgNjUuMDE5NUg2My43NUwyOC43NSAxNS4wMTk1SDIyLjVMMzEuMjM2MyAyNy41WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJTb3VuZE9mZkljb24gPSB7IG9uRGFyazogZ2V0UGxheWVyU291bmRPZmYoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyU291bmRPZmYoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0T3Blbkljb24gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNDhcIiBoZWlnaHQ9XCI0OFwiIHZpZXdCb3g9XCIwIDAgNDggNDhcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMTQuMDgyMSA5Ljg0MzI4QzE0LjA4MjEgMTAuODg5NSAxNC44NDUyIDExLjY3IDE1LjkwNjkgMTEuNjdIMTcuMDg0N0wzNi4yMjczIDExLjMyMTJMMzIuMTk2MSAxNS4xNTcyTDEzLjQxODUgMzMuOTA2NkMxMy4wNTM2IDM0LjI1NTMgMTIuODg3NyAzNC43MDM3IDEyLjg4NzcgMzUuMTg1M0MxMi44ODc3IDM2LjMxNDUgMTMuNjUwOCAzNy4xMjgyIDE0Ljc3ODggMzcuMTI4MkMxNS4yOTMxIDM3LjEyODIgMTUuNzQxIDM2LjkyODkgMTYuMTA1OSAzNi41ODAyTDM0Ljg2NyAxNy44MTQyTDM4LjY4MjQgMTMuNzYyM0wzOC4zMzQgMzIuOTQzNFYzNC4yMzg3QzM4LjMzNCAzNS4yODQ5IDM5LjA5NzEgMzYuMDgyIDQwLjE1ODggMzYuMDgyQzQxLjIyMDUgMzYuMDgyIDQyLjAwMDIgMzUuMzAxNSA0Mi4wMDAyIDM0LjIzODdWMTEuMDIyM0M0Mi4wMDAyIDkuMTEyNjEgNDAuODg4NyA4IDM4Ljk4MSA4TDE1LjkwNjkgOEMxNC44NjE4IDggMTQuMDgyMSA4Ljc4MDQ5IDE0LjA4MjEgOS44NDMyOFpcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMub3Blbkljb24gPSB7IG9uRGFyazogZ2V0T3Blbkljb24oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0T3Blbkljb24oY29sb3Jfb25MaWdodCkgfVxuXG5cblxuXG5cIlwiXCI8c3ZnIHdpZHRoPVwiNDhcIiBoZWlnaHQ9XCI0OFwiIHZpZXdCb3g9XCIwIDAgNDggNDhcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMzggMTVMMTUgMzguNDI0MUwxMS41NzYyIDM1TDM1IDEySDE0VjhINDJWMzZIMzhWMTVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIiIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5cbmNsYXNzIGV4cG9ydHMuUGxheWVyU2xpZGVyIGV4dGVuZHMgU2xpZGVyQ29tcG9uZW50XG5cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRAdmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJzbGlkZXJWaWV3XCJcblx0XHRcdHdpZHRoOiAyNjAgKiAyLCBoZWlnaHQ6IDU2ICogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC4yNSlcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxOCAqIDJcblx0XHRcblx0XHRAdmlldy5kcmFnZ2FibGUuZW5hYmxlZCA9IHRydWVcblx0XHRAdmlldy5kcmFnZ2FibGUuc3BlZWRYID0gMFxuXHRcdEB2aWV3LmRyYWdnYWJsZS5zcGVlZFkgPSAwXG5cdFx0QHZpZXcuZHJhZ2dhYmxlLnByb3BhZ2F0ZUV2ZW50cyA9IGZhbHNlXG5cblxuXG5cdFx0QHBsYXlCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB2aWV3LCBuYW1lOiBcInBsYXlCdXR0b25cIlxuXHRcdFx0d2lkdGg6IDQwICogMiwgaGVpZ2h0OiA0MCAqIDJcblx0XHRcdHg6IDEyICogMlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRhc3NldDogU1ZHLnBsYXllclBhdXNlSWNvblxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0QHBsYXlCdXR0b24uc3RhdGVzID1cblx0XHRcdFwicGxheWluZ1wiOiB7IGFzc2V0OiBTVkcucGxheWVyUGF1c2VJY29uIH1cblx0XHRcdFwicGF1c2VkXCI6IHsgYXNzZXQ6IFNWRy5wbGF5ZXJQbGF5SWNvbiB9XG5cdFx0QHBsYXlCdXR0b24uc3RhdGVTd2l0Y2goXCJwbGF5aW5nXCIpXG5cdFx0XG5cdFx0XG5cblx0XHRAc291bmRCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogNDAgKiAyLCBoZWlnaHQ6IDQwICogMlxuXHRcdFx0eDogKDEyICsgNDAgKyA4KSAqIDJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0YXNzZXQ6IFNWRy5wbGF5ZXJTb3VuZEljb25cblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEBzb3VuZEJ1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0XCJzb3VuZFwiOiB7IGFzc2V0OiBTVkcucGxheWVyU291bmRJY29uIH1cblx0XHRcdFwibXV0ZWRcIjogeyBhc3NldDogU1ZHLnBsYXllclNvdW5kT2ZmSWNvbiB9XG5cdFx0QHNvdW5kQnV0dG9uLnN0YXRlU3dpdGNoKFwibXV0ZWRcIilcblx0XHRcblxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAcGFyZW50ID0gQHZpZXdcblx0XHRAbmFtZSA9IFwidmlkZW9TbGlkZXJcIlxuXHRcdFxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0QHdpZHRoID0gQHZpZXcud2lkdGggLSAoKDEyICsgNDAgKyA4ICsgNDAgKyAxNikgKyAyMCkgKiAyXG5cdFx0QGhlaWdodCA9IDQgKiAyXG5cdFx0QHggPSAoMTIgKyA0MCArIDggKyA0MCArIDE2KSAqIDJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXHRcdEBrbm9iU2l6ZSA9IDI0ICogMlxuXHRcdFxuXHRcdCMgMTIgKyA0MCArIDggKyA0MCArIDE2ICsgZmxleCArIDIwXG5cblx0XHRAc2xpZGVyT3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDI1NSwyNTUsMC4wNSlcIlxuXHRcdCMgQHNsaWRlck92ZXJsYXkuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIlxuXHRcdEBzbGlkZXJPdmVybGF5LndpZHRoID0gQHdpZHRoXG5cdFx0QHNsaWRlck92ZXJsYXkuaGVpZ2h0ID0gNCAqIDJcblx0XHRAc2xpZGVyT3ZlcmxheS54ID0gMFxuXHRcdEBzbGlkZXJPdmVybGF5LnkgPSAwXG5cdFx0QHNsaWRlck92ZXJsYXkuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFxuXHRcdEBmaWxsLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIlxuXHRcdEBmaWxsLm9wYWNpdHkgPSAwLjNcblx0XHRcblx0XHRAa25vYi5iYWNrZ3JvdW5kQ29sb3IgPSBcIm51bGxcIlxuXHRcdEBrbm9iLm9wYWNpdHkgPSAxXG5cdFx0QGtub2IuZHJhZ2dhYmxlLm1vbWVudHVtID0gZmFsc2Vcblx0XHRAa25vYi5kcmFnZ2FibGUucHJvcGFnYXRlRXZlbnRzID0gZmFsc2Vcblx0XHRAa25vYi5zaGFkb3dDb2xvciA9IG51bGxcblx0XHRAa25vYi5zaGFkb3dZID0gMFxuXHRcdFxuXHRcdGtub2JDdXJzb3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGtub2Jcblx0XHRcdHdpZHRoOiA0ICogMiwgaGVpZ2h0OiAzMiAqIDJcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI2RkZFwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQgKiAyXG5cdFx0XG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub24gRXZlbnRzLlRvdWNoU3RhcnQsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRsYXllci52YWx1ZSA9IFV0aWxzLm1vZHVsYXRlKGV2ZW50LnBvaW50LngsIFswLCBAc2xpZGVyT3ZlcmxheS53aWR0aF0sIFswLCAxXSwgdHJ1ZSlcblx0XHRcblx0XHRcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdFxuXHRIb3ZlcjogPT5cbiMgXHRcdEBvcGFjaXR5ID0gMVxuXHRIb3Zlck9mZjogPT5cbiMgXHRcdEBvcGFjaXR5ID0gMC41XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdHVwZGF0ZUZvclNjYWxlRG93bjogKCkgLT5cblx0XHRAdmlldy53aWR0aCA9IDgwMCAqIDJcblx0XHRAdmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0QHZpZXcueSA9IEFsaWduLmJvdHRvbSgtMzIgKiAyKVxuXG5cdFx0QHdpZHRoID0gQHZpZXcud2lkdGggLSAoKDEyICsgNDAgKyA4ICsgNDAgKyAxNikgKyAyMCkgKiAyXG5cdFx0QGhlaWdodCA9IDQgKiAyXG5cblx0XHQjIHByaW50IEBzbGlkZXJPdmVybGF5LndpZHRoXG5cdFx0QHNsaWRlck92ZXJsYXkud2lkdGggPSBAd2lkdGhcblx0XHRAc2xpZGVyT3ZlcmxheS5oZWlnaHQgPSA0ICogMlxuXHRcdEBzbGlkZXJPdmVybGF5LnggPSAwXG5cdFx0QHNsaWRlck92ZXJsYXkueSA9IDBcblx0XHQjIHByaW50IEBzbGlkZXJPdmVybGF5LndpZHRoXG5cblx0XHQjIEBwbGF5ZXJTbGlkZXIud2lkdGggPSBAd2lkdGggLSAzMDAgKiAyICogMlxuXHRcdCMgQHBsYXllclNsaWRlci54ID0gQWxpZ24ubGVmdCgzMDAgKiAyKVxuXHRcdCMgQHBsYXllclNsaWRlci55ID0gQWxpZ24uYm90dG9tKC0zMiAqIDIpIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG4jIFRleHQsIEJ1dHRvblxuXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIk51bml0b1wiLCA4MDApXG4jIGZvbnRBdmVyaWEgPSBVdGlscy5sb2FkV2ViRm9udChcIlJhbGV3YXlcIiwgNzAwKVxuZm9udEF2ZXJpYSA9IFwiUmFsZXdheVwiXG5cbmNsYXNzIFRleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Zm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHR3ZWlnaHQ6IDcwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjRcbiMgXHRcdFx0dGV4dE92ZXJmbG93OiBcImVsbGlwc2lzXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0eWxlID1cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogXCJSYWxld2F5LCAnUFQgU2FucycsICdIZWx2ZXRpY2EnLCAnVGFob21hJywgc2Fucy1zZXJpZjtcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiOiA3MDBcblx0XHRcdFwiLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1vei1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1zLWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcblxuXG5cblxuXG5jbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDAuNSwgaG92ZXI6IDAuOCB9XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuXHRcdEB1cGRhdGVUdXBsZShAdHVwbGUpXG5cdFxuXHRcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUuaG92ZXJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUubm9ybWFsXG5cdFxuXHR1cGRhdGVUdXBsZTogKG5ld1R1cGxlKSA9PlxuXHRcdEB0dXBsZSA9IG5ld1R1cGxlXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3ZlclxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU91dFxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRAZGVmaW5lICd0dXBsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50dXBsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudHVwbGUgPSB2YWx1ZVxuXG5cblxuXG5cbiMgQnV0dG9uOiBTVkdcblxuY2xhc3MgU1ZHQnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0ZXh0OiBcIlwiXG5cdFx0XHRhc3NldDogbnVsbFxuXHRcdFx0Y2xpcDogZmFsc2Vcblx0XHRcdGF1dG9TaXplOiBmYWxzZVxuXHRcdFxuXHRcdEBzdmdTaGFwZSA9IG5ldyBTVkdMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIiwgbmFtZTogXCJzdmdTaGFwZVwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3ZnU2hhcGUucGFyZW50ID0gQFxuXHRcdEB1cGRhdGVTVkdTaXplKClcblx0XG5cdFxuXHRAZGVmaW5lICdhc3NldCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYXNzZXQgPSB2YWx1ZVxuXHRcdFx0QHN2Z1NoYXBlLnN0YXRlcyA9XG5cdFx0XHRcdFwib25EYXJrXCI6IHsgc3ZnOiB2YWx1ZS5vbkRhcmsgfVxuXHRcdFx0XHRcIm9uTGlnaHRcIjogeyBzdmc6IHZhbHVlLm9uTGlnaHQgfVxuXHRcdFx0QHN2Z1NoYXBlLnN0YXRlU3dpdGNoKFwib25EYXJrXCIpXG5cdFxuXHR1cGRhdGVTVkdTaXplOiAoKSA9PlxuXHRcdEBzdmdTaGFwZS53aWR0aCA9IEB3aWR0aFxuXHRcdEBzdmdTaGFwZS5oZWlnaHQgPSBAaGVpZ2h0XG5cdFxuXG5cblxuXG4jIEJ1dHRvbjogQ29weVxuXG5jbGFzcyBDb3B5QnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG5cdFx0QGFyZWEgPSBuZXcgTGF5ZXJcblx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAYXJlYS5wYXJlbnQgPSBAXG5cdFxuXHRcblx0QGRlZmluZSAnbGluaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcblx0dXBkYXRlOiAobGluaykgPT5cblx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcblx0Y29weUhhbmRsZXI6ID0+XG5cdFx0dGV4dERpdiA9IEBhcmVhLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3B5dGV4dGFyZWEtY2xhc3MnKVxuXHRcdHRleHREaXYuZm9jdXMoKVxuXHRcdHRleHREaXYuc2VsZWN0KClcblx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcblx0XHRcblx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG5cdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG5cdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHRleHQgPSBvcmlnaW5UaXRsZVxuXG5cblxuXG4jIEJ1dHRvbjogQ29weVxuXG5jbGFzcyBMaW5rQnV0dG9uIGV4dGVuZHMgU1ZHQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMSAqIDJcblx0XHRcdGJvcmRlclJhZGl1czogMjAgKiAyXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XHRcblx0XHRcblx0XHRAdGludEJ1dHRvbkZpeCA9IG5ldyBMYXllclxuXHRcdFx0aGVpZ2h0OiAxMjAgKiAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRAYnV0dG9uVGV4dCA9IG5ldyBUZXh0XG5cdFx0XHRmb250U2l6ZTogMzIgKiAyXG5cdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuXHRcdFx0aGVpZ2h0OiA2MCAqIDJcblx0XHRcblx0XHRAYnV0dG9uSWNvbiA9IG5ldyBTVkdMYXllclxuXHRcdFx0d2lkdGg6IDI0ICogMiwgaGVpZ2h0OiAyNCAqIDJcblx0XHRcdHN2ZzogU1ZHLm9wZW5JY29uLm9uTGlnaHRcblx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0XG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGJ1dHRvblRleHQudGV4dCA9IEB0ZXh0XG5cdFx0QHRleHQgPSBcIlwiXG5cblx0XHRAdGludEJ1dHRvbkZpeC5wYXJlbnQgPSBAcGFyZW50XG5cdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG5cdFx0QHRpbnRCdXR0b25GaXgueSA9IEFsaWduLnRvcFxuXHRcdFxuXHRcdEBwYXJlbnQgPSBAdGludEJ1dHRvbkZpeFxuXHRcdEB5ID0gQWxpZ24udG9wKDMwICogMilcblx0XHRAaGVpZ2h0ID0gNjAgKiAyXG5cblx0XHRAYnV0dG9uVGV4dC5wYXJlbnQgPSBAXG5cdFx0QGJ1dHRvblRleHQueCA9IDE2ICogMlxuXHRcdEBidXR0b25UZXh0LnkgPSA5ICogMlxuXG5cdFx0QGJ1dHRvbkljb24ucGFyZW50ID0gQFxuXHRcdEBidXR0b25JY29uLnggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIDE2ICogMlxuXHRcdEBidXR0b25JY29uLnkgPSBBbGlnbi5jZW50ZXIoMyAqIDIpXG5cblx0XHRAd2lkdGggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIEBidXR0b25JY29uLndpZHRoICsgMTYgKiAyICsgMTYgKiAyXG5cdFx0QHRpbnRCdXR0b25GaXgud2lkdGggPSBAd2lkdGggKyAzMCAqIDIgKyAxNiAqIDJcblxuXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuXHRcdEB4ID0gQWxpZ24ucmlnaHQoLTMwICogMilcblx0XHRcblx0XG5cblx0QGRlZmluZSAnbGluaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuXHRcblx0c2V0Q29sb3I6IChjb2xvciA9IG51bGwpID0+XG5cdFx0aWYgY29sb3IgPT0gbnVsbCB0aGVuIHJldHVyblxuXHRcdEB0aW50QnV0dG9uRml4LmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdFxuXG5cblxuXG5cblxuXG5cbmNsYXNzIFByZXZpZXdCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAcmVtb3ZlQWxsTGlzdGVuZXJzKClcblxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG5cdEhvdmVyOiA9PlxuXHRcdCMgQHNjYWxlID0gMS4wNVxuXHRcdEBvcGFjaXR5ID0gMS4wXG5cdFxuXHRIb3Zlck9mZjogPT5cblx0XHQjIEBzY2FsZSA9IDEuMFxuXHRcdEBvcGFjaXR5ID0gMC44XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7VGV4dCwgVGV4dEJ1dHRvbiwgU1ZHQnV0dG9uLCBDb3B5QnV0dG9uLCBMaW5rQnV0dG9uLCBQcmV2aWV3QnV0dG9ufVxuXG5cbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBYUFBO0FEQ0EsSUFBQSxtRkFBQTtFQUFBOzs7O0FBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxPQUFSOztBQU1OLFVBQUEsR0FBYTs7QUFFUDs7O0VBQ1EsY0FBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsVUFBQSxFQUFZLFVBQVo7TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLE1BQUEsRUFBUSxHQUZSO01BR0EsS0FBQSxFQUFPLE9BSFA7TUFJQSxNQUFBLEVBQVEsRUFKUjtNQUtBLGFBQUEsRUFBZSxHQUxmO01BTUEsYUFBQSxFQUFlLEdBTmY7S0FERDtJQVVBLHNDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLEtBQUQsR0FDQztNQUFBLGFBQUEsRUFBZSx3REFBZjtNQUNBLGFBQUEsRUFBZSxHQURmO01BRUEsK0JBQUEsRUFBaUMsNkNBRmpDO01BR0EsNEJBQUEsRUFBOEIsNkNBSDlCO01BSUEsMkJBQUEsRUFBNkIsNkNBSjdCO01BS0EsdUJBQUEsRUFBeUIsNkNBTHpCOztFQWZXOzs7O0dBREs7O0FBNEJiOzs7RUFDUSxvQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsS0FBQSxFQUFPO1FBQUUsTUFBQSxFQUFRLEdBQVY7UUFBZSxLQUFBLEVBQU8sR0FBdEI7T0FBUDtNQUNBLE9BQUEsRUFBUyxJQURUO0tBREQ7SUFLQSw0Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFFVCxJQUFDLENBQUMsV0FBRixDQUFjLElBQUMsQ0FB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
