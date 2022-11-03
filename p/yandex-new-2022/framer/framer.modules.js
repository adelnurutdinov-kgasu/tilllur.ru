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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1ByZXNlbnRhdGlvbkNvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyR3JpZC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjUuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXI0LmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjIuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIxLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlQ2hhbmdlci5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NWRy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1BsYXllclNsaWRlci5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ0J1dHRvbnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbiMge1NsaWRlcjB9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMFwiIFx0IyBTY2FsZSAvIFVSTFxuIyB7U2xpZGVyMX0gPSByZXF1aXJlIFwiUENTbGlkZXIxXCJcdCMgUGFuZWxzXG4jIHtTbGlkZXIyfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjJcIlx0IyBDcmVhdGUgU2xpZGVcbiMge1NsaWRlcjN9ID0gcmVxdWlyZSBcIlBDU2xpZGVyM1wiXHQjIFNob3J0Y3V0c1xuIyB7U2xpZGVyNH0gPSByZXF1aXJlIFwiUENTbGlkZXI0XCJcdCMgQmFja2dyb3VuZCBQYXVzZSBmb3IgVmlkZW9zXG4jIHtTbGlkZXI1fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjVcIlx0IyBQbGF5aW5nIFZpZGVvXG4jIHtTbGlkZXJQaW5jaH0gPSByZXF1aXJlIFwiUENTbGlkZXJQaW5jaFwiXHQjIFBpbmNoXG57U2xpZGVyR3JpZH0gPSByZXF1aXJlIFwiUENTbGlkZXJHcmlkXCJcdCMgUGluY2hcblxuY2xhc3MgRml4UHJlc2VudGF0aW9uRXhwb3J0IGV4dGVuZHMgU2xpZGVyR3JpZFxuIyBjbGFzcyBGaXhQcmVzZW50YXRpb25FeHBvcnQgZXh0ZW5kcyBTbGlkZXJQaW5jaFxuIyBjbGFzcyBGaXhQcmVzZW50YXRpb25FeHBvcnQgZXh0ZW5kcyBTbGlkZXIwXG5jbGFzcyBleHBvcnRzLlByZXNlbnRhdGlvbiBleHRlbmRzIEZpeFByZXNlbnRhdGlvbkV4cG9ydFxuXG5cblx0XG5cblxuXG4jIHNsaWRlciA9IG5ldyBQcmVzZW50YXRpb24gKHRpdGxlOiBcIkRldmVsb3BtZW50XCIpXG5cbiMgSW1hZ2VzXG4jIHNsaWRlci5zbGlkZSgpLnJhbmRvbUNvbG9yKClcbiMgc2xpZGVyLnNsaWRlKFwiaW1hZ2VzL3RpdGxlJTIwb3ZlcmxheS5wbmdcIilcbiMgc2xpZGVyLnNsaWRlKCkucmFuZG9tQ29sb3IoKS5vdmVybGF5KFwiaW1hZ2VzL3RpdGxlJTIwb3ZlcmxheS5wbmdcIilcblxuXG4jIExpbmtcbiMgc2xpZGVyLnNsaWRlKCkubGluayhcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIilcbiMgc2xpZGVyLnNsaWRlKCkubGluayhcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIiwgXCJMaW5rIFRpdGxlXCIpXG4jIHNsaWRlci5zbGlkZSgpLmxpbmsoXCJodHRwczovL3RpbGxsdXIucnUvZC9xeXZ0a2dqdS9pbmRleC5odG1sXCIsIFwiTGluayBUaXRsZVwiLCB0eXBlMSlcblxuXG4jIFZpZGVvIDE0MDB4OTAwIOKAlCBGdWxsc2NyZWVuXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpLm11dGUoZmFsc2UpXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpLmxvb3AoZmFsc2UpXG5cbiMgVmlkZW8gMTQwMHg5MDAg4oCUIEZ1bGxzY3JlZW4gJiBDb250cm9sc1xuIyBzbGlkZXIuZnVsbFZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG5cbiMgVmlkZW8gMTkyMHgxMDgwIOKAlCBDcm9wICYgQ29udHJvbHNcbiMgc2xpZGVyLnZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG5cblxuIyBQcm90b3R5cGVcbiMgc2xpZGVyLnByb3RvdHlwZVNsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L2QvcXl2dGtnanUvaW5kZXguaHRtbFwiKS5zaXplZCgpXG4jIHNsaWRlci5wcm90b3R5cGVTbGlkZShcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIikuc2l6ZWQoMzkwLCA4NDQpXG5cblxuXG5cbiIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHQgPSBCdXR0b25zLlRleHRcblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5MaW5rQnV0dG9uID0gQnV0dG9ucy5MaW5rQnV0dG9uXG5cbntQbGF5ZXJTbGlkZXJ9ID0gcmVxdWlyZShcIlBDUGxheWVyU2xpZGVyXCIpXG5cblxuXG4jIFNsaWRlIHdpdGggSW1hZ2VzXG5cbmNsYXNzIFNsaWRlVGVtcGxhdGUgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Z3JpZERhdGE6IG51bGxcblxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyXG5cdFx0XHRoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdGJvcmRlclJhZGl1czogMTYgKiAyXG5cdFx0XHR0aXRsZTogXCJcIlxuXHRcdFx0aW1hZ2U6IG51bGxcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEB4ID0gKEBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAoQHdpZHRoICsgMTIwKSBcblx0XHRAcGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcblx0XHRAbmFtZSA9IFwic2xpZGUgI3tAcGFyZW50LmNoaWxkcmVuLmxlbmd0aH1cIlxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICd0aXRsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkRGF0YScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkRGF0YVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkRGF0YSA9IHZhbHVlXG5cblxuXG5cdHNvdXJjZTogKGltYWdlKSA9PlxuXHRcdEBpbWFnZSA9IGltYWdlXG5cdFx0cmV0dXJuIEBcblx0XG5cdG92ZXJsYXk6IChpbWFnZSkgPT5cblx0XHR0b3BJbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTQwMCAqIDIsIGhlaWdodDogOTAwICogMlxuXHRcdFx0aW1hZ2U6IGltYWdlXG5cdFx0cmV0dXJuIEBcblx0XG5cdHJhbmRvbUNvbG9yOiAoKSA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBVdGlscy5yYW5kb21Db2xvcigpXG5cdFx0cmV0dXJuIEBcblxuXG5cblxuXG4jIFM6IFNsaWRlIHdpdGggTGlua1xuXG4jIGZmbXBlZyAtaSBpbnB1dC5tcDQgLWM6diBsaWJ4MjY0IC1wcm9maWxlOnYgbWFpbiAtdmYgZm9ybWF0PXl1djQyMHAgLWM6YSBhYWMgLW1vdmZsYWdzICtmYXN0c3RhcnQgb3V0cHV0Lm1wNFxuIyBmZm1wZWcgLWkgb3V0cHV0Lm1wNCAtZmlsdGVyOnYgXCJjcm9wPTE2ODA6MTA4MDoxMjA6MFwiIC1jOmEgY29weSBjcm9wLm1wNFxuXG5cbmNsYXNzIFNsaWRlIGV4dGVuZHMgU2xpZGVUZW1wbGF0ZVxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c2hhcmVMaW5rOiBcIlwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cdFxuXHRAZGVmaW5lICdzaGFyZUxpbmsnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hhcmVMaW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNoYXJlTGluayA9IHZhbHVlXG5cdFxuXHRcblx0bGluazogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiLCBidXR0b25UaXRsZSA9IFwiT3BlblwiLCB0eXBlID0gMCkgPT5cblx0XHRAc2hhcmVMaW5rID0gdXJsXG5cblx0XHRAdGludEJ1dHRvbiA9IG5ldyBMaW5rQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEAsIG5hbWU6IFwibGlua0J1dHRvblwiXG5cdFx0XHR0ZXh0OiBidXR0b25UaXRsZVxuXHRcdFx0dXJsOiB1cmxcblx0XHRcdGhhbmRsZXI6IEBvcGVuUHJvdG90eXBlVVJMXG5cdFx0XG5cdFx0aWYgdHlwZSA9PSAwXG5cdFx0XHRAdGludEJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0XHRAdGludEJ1dHRvbi5ib3JkZXJDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjMpXCJcblx0XHRlbHNlIGlmIHR5cGUgPT0gMVxuXHRcdFx0QHRpbnRCdXR0b24uYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMjUpXCJcblx0XHRcdEB0aW50QnV0dG9uLmJvcmRlckNvbG9yID0gbnVsbFxuXHRcblx0b3BlblByb3RvdHlwZVVSTDogKCkgPT5cblx0XHRwcmVzZW50YXRpb24gPSBAcGFyZW50LnBhcmVudFxuXHRcdHByZXNlbnRhdGlvbi5vcGVuVVJMKEBzaGFyZUxpbmssIHRydWUpXG5cblxuXG5cblxuXG5cblxuXG5cbiMgUzogVGVtcGxhdGUgKFZpZGVvKVxuIyBPdmVycmlkZSBcInNvdXJjZSgpXCJcblxuY2xhc3MgU2ltcGxlVmlkZW9TbGlkZSBleHRlbmRzIFNsaWRlXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRpdGxlOiBcInNpbXBsZVZpZGVvU2xpZGVcIlxuXHRcdFxuXHRcdEBsb2FkaW5nVGV4dCA9IG5ldyBUZXh0XG5cdFx0XHR3aWR0aDogNDAwLCBoZWlnaHQ6IDcwXG5cdFx0XHRmb250U2l6ZTogNDBcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIlxuXHRcdFx0dGV4dDogXCJObyBVUkxcIlxuXHRcdFx0XG5cdFx0XG5cdFx0QHZpZGVvVmlldyA9IG5ldyBWaWRlb0xheWVyXG5cdFx0XHR3aWR0aDogMTY4MCwgaGVpZ2h0OiAxMDgwXG5cdFx0XHRuYW1lOiBcInZpZGVvVmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSB0cnVlXG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIuYXV0b3BsYXkgPSBmYWxzZVxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLmxvb3AgPSB0cnVlXG5cdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdFxuXHRcdEBsb2FkaW5nVGV4dC5wYXJlbnQgPSBAXG5cdFx0QGxvYWRpbmdUZXh0LmNlbnRlcigpXG5cdFx0XG5cdFx0QHZpZGVvVmlldy5wYXJlbnQgPSBAXG5cdFx0QHZpZGVvVmlldy5zY2FsZSA9IEBoZWlnaHQgLyAxMDgwXG5cdFx0QHZpZGVvVmlldy5jZW50ZXIoKVxuXG5cdFxuXHRcblx0IyBAZGVmaW5lICd2aWRlb1VSTCcsXG5cdCMgXHRnZXQ6IC0+IEBvcHRpb25zLnZpZGVvVVJMXG5cdCMgXHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlkZW9VUkwgPSB2YWx1ZVxuXHRcblxuXHQjIG92ZXJyaWRlXG5cdHNvdXJjZTogKHZpZGVvKSA9PlxuXHRcdEB2aWRlb1ZpZXcudmlkZW8gPSB2aWRlb1xuXHRcdEBsb2FkaW5nVGV4dC50ZXh0ID0gXCJMb2FkaW5nXCJcblx0XHRAbmFtZSA9IEBuYW1lICsgXCI6IFwiICsgdmlkZW9cblx0XHRyZXR1cm4gQFxuXG5cblxuXG5cdGxvb3A6ICh2YWx1ZSA9IHRydWUpID0+XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubG9vcCA9IHRydWVcblx0XHRyZXR1cm4gQFxuXHRcblx0bXV0ZTogKHZhbHVlID0gdHJ1ZSkgPT5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5tdXRlZCA9IHZhbHVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdHVubXV0ZTogKCkgPT5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5tdXRlZCA9IGZhbHNlXG5cdFx0cmV0dXJuIEBcblxuXG5cblxuXHRpc1BhdXNlZDogKCkgPT5cblx0XHRyZXR1cm4gQHZpZGVvVmlldy5wbGF5ZXIucGF1c2VkXG5cblx0cGxheTogKCkgPT5cblx0XHRpZiAhQGlzUGF1c2VkKCkgdGhlbiByZXR1cm5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5wbGF5KClcblx0XG5cdHBhdXNlOiAoKSA9PlxuXHRcdGlmIEBpc1BhdXNlZCgpIHRoZW4gcmV0dXJuXG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIucGF1c2UoKVxuXHRcblx0dG9nZ2xlUGxheTogKCkgPT5cblx0XHRpZiBAaXNQYXVzZWQoKSB0aGVuIEBwbGF5KClcblx0XHRlbHNlIEBwYXVzZSgpXG5cdFxuXG5cbiMgXHRsb2FkVmlkZW86ICh3ZWJVUkwpID0+XG4jIFx0XHRAdmlkZW9WaWV3LnBsYXllci5tdXRlZCA9IHRydWVcbiMgXHRcdEB2aWRlb1ZpZXcucGxheWVyLmF1dG9wbGF5ID0gdHJ1ZVxuIyBcdFx0QHZpZGVvVmlldy52aWRlbyA9IEB2aWRlb1VSTFxuIyBcdFx0VXRpbHMuZGVsYXkgMTAsID0+XG4jIFx0XHRAdmlkZW9WaWV3LnBsYXllci5wbGF5KClcblx0XHRcblx0XHRcbiMgXHRcdHByaW50IEB2aWRlb1ZpZXcucGxheWVyLnJlYWR5U3RhdGVcbiMgXHRcdFV0aWxzLmRlbGF5IDEwLCA9PlxuIyBcdFx0XHRwcmludCBAdmlkZW9WaWV3LnBsYXllci5yZWFkeVN0YXRlXG5cblxuXG5cblxuIyBTOiBTbGlkZSAoVmlkZW8pXG5cbmNsYXNzIFZpZGVvU2xpZGUgZXh0ZW5kcyBTaW1wbGVWaWRlb1NsaWRlXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdCMgUHJvZ3Jlc3Ncblx0XHRAcGxheWVyU2xpZGVyID0gbmV3IFBsYXllclNsaWRlclxuXHRcdEBwbGF5ZXJTbGlkZXIucGFyZW50LnBhcmVudCA9IEBcblxuXHRcdEBwbGF5ZXJTbGlkZXIucGFyZW50LnggPSBBbGlnbi5sZWZ0KDk4KjIpXG5cdFx0QHBsYXllclNsaWRlci5wYXJlbnQueSA9IEFsaWduLmJvdHRvbSgtNjAgKiAyKVxuXG5cdFx0IyBwcmludCBAcGxheWVyU2xpZGVyLnBhcmVudFxuXHRcdCMgcHJpbnQgQHBsYXllclNsaWRlci5wbGF5QnV0dG9uXG5cblxuXHRcdEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvbi5vbiBFdmVudHMuVGFwLCAoZXZlbnQsIGxheWVyKSAtPlx0XHRcdFxuXHRcdFx0c2xpZGUgPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uID0gc2xpZGUucGFyZW50LnBhcmVudFxuXHRcdFx0XG5cdFx0XHRzbGlkZS50b2dnbGVQbGF5KClcblx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnID0gZmFsc2VcblxuXG5cblxuXHRcdEBwbGF5ZXJTbGlkZXIub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHQjIHByaW50IFwiVG91Y2ggU3RhcnRcIlxuXHRcdFx0c2xpZGUgPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uID0gc2xpZGUucGFyZW50LnBhcmVudFxuXHRcdFx0XG5cdFx0XHRzbGlkZS5wYXVzZSgpXG5cdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlRHJhZyA9IHRydWVcblx0XHRcblx0XHRcblxuXHRcdEBwbGF5ZXJTbGlkZXIub24gXCJjaGFuZ2U6dmFsdWVcIiwgLT5cblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0aWYgcHJlc2VudGF0aW9uLmFjdGl2ZURyYWdcblx0XHRcdFx0c2xpZGUudmlkZW9WaWV3LnBsYXllci5jdXJyZW50VGltZSA9IFV0aWxzLm1vZHVsYXRlKEB2YWx1ZSwgWzAsIDFdLCBbMCwgc2xpZGUudmlkZW9WaWV3LnBsYXllci5kdXJhdGlvbl0sIHRydWUpXG5cdFx0XG5cdFx0XG5cblx0XHRAcGxheWVyU2xpZGVyLnNvdW5kQnV0dG9uLm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0XHRzbGlkZSA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdGlmIHNsaWRlLnZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgdGhlbiBzbGlkZS51bm11dGUoKVxuXHRcdFx0ZWxzZSBzbGlkZS5tdXRlKClcblx0XHRcblxuXHRcdFxuXG5cdFx0XG5cdFx0RXZlbnRzLndyYXAoQHZpZGVvVmlldy5wbGF5ZXIpLm9uIFwicGF1c2VcIiwgPT5cblx0XHRcdCMgcHJpbnQgXCIhIG5leHQgcGF1c2VcIlxuXHRcdFx0QHBhdXNlKClcblx0XHRcdEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvbi5zdGF0ZVN3aXRjaChcInBhdXNlZFwiKVxuXHRcdFx0XG5cdFx0XHRwcmVzZW50YXRpb24gPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0aWYgQHZpZGVvVmlldy5wbGF5ZXIgPT0gcHJlc2VudGF0aW9uLmFjdGl2ZVZpZGVvUGxheWVyXG5cdFx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVQbGF5aW5nID0gZmFsc2Vcblx0XHRcblx0XHRcblx0XHRFdmVudHMud3JhcChAdmlkZW9WaWV3LnBsYXllcikub24gXCJwbGF5XCIsID0+XG5cdFx0XHQjIHByaW50IFwiISBuZXh0IHBsYXlcIlxuXHRcdFx0QHBsYXkoKVxuXHRcdFx0QHBsYXllclNsaWRlci5wbGF5QnV0dG9uLnN0YXRlU3dpdGNoKFwicGxheWluZ1wiKVxuXHRcdFx0XG5cdFx0XHRwcmVzZW50YXRpb24gPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZURyYWcgPSBmYWxzZVxuXHRcdFx0aWYgQHZpZGVvVmlldy5wbGF5ZXIgPT0gcHJlc2VudGF0aW9uLmFjdGl2ZVZpZGVvUGxheWVyXG5cdFx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVQbGF5aW5nID0gdHJ1ZVxuXHRcdFxuXHRcdFxuXHRcdEV2ZW50cy53cmFwKEB2aWRlb1ZpZXcucGxheWVyKS5vbiBcInZvbHVtZWNoYW5nZVwiLCA9PlxuXHRcdFx0aWYgQHZpZGVvVmlldy5wbGF5ZXIubXV0ZWRcblx0XHRcdFx0QHBsYXllclNsaWRlci5zb3VuZEJ1dHRvbi5zdGF0ZVN3aXRjaChcIm11dGVkXCIpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBwbGF5ZXJTbGlkZXIuc291bmRCdXR0b24uc3RhdGVTd2l0Y2goXCJzb3VuZFwiKVxuXG5cdFx0XHRcdFxuXHRcdFxuY2xhc3MgSERWaWRlb1NsaWRlIGV4dGVuZHMgVmlkZW9TbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHZpZGVvVmlldy53aWR0aCA9IDE5MjBcblx0XHRAdmlkZW9WaWV3LmhlaWdodCA9IDEwODBcblx0XHRAdmlkZW9WaWV3LnggPSA0NDBcblx0XHRAdmlkZW9WaWV3LnkgPSAyODZcblxuXHRcdEB2aWRlb1ZpZXcuYm9yZGVyUmFkaXVzID0gOCAqIDJcblx0XHRAdmlkZW9WaWV3LmNsaXAgPSB0cnVlXG5cblxuXHRcdEB2aWRlb1ZpZXcub3JpZ2luWCA9IDAuNVxuXHRcdEB2aWRlb1ZpZXcub3JpZ2luWSA9IDAuNVxuXG5cdFx0QHZpZGVvVmlldy5zY2FsZSA9IDEuMzY2NlxuXG5cblx0XHRAcGxheWVyU2xpZGVyLnVwZGF0ZUZvclNjYWxlRG93bigpXG5cblxuXHRcdFx0XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIFM6IFNsaWRlIChQcm90b3R5cGUpXG5cbmNsYXNzIFByb3RvdHlwZVNsaWRlIGV4dGVuZHMgU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRAcHJvdG90eXBlVmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJwcm90b3R5cGVcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAcHJvdG90eXBlVmlldy5wYXJlbnQgPSBAXG5cdFx0QHNpemVkKClcblx0XG5cdFxuXHRcblx0XG5cdEBkZWZpbmUgJ3BXaWR0aCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wV2lkdGhcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucFdpZHRoID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3BIZWlnaHQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucEhlaWdodFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wSGVpZ2h0ID0gdmFsdWVcblx0XG5cdFxuXHRcblx0XG5cdHNjYWxlZDogKHZhbHVlKSA9PlxuXHRcdEBwcm90b3R5cGVWaWV3LnNjYWxlID0gdmFsdWVcblx0XHRyZXR1cm4gQFxuXHRcblx0Ym9yZGVyZWQ6ICh2YWx1ZSkgPT5cblx0XHRAcHJvdG90eXBlVmlldy5ib3JkZXJSYWRpdXMgPSB2YWx1ZVxuXHRcdHJldHVybiBAXG5cdFxuXHRzaXplZDogKHdpZHRoID0gMzc1LCBoZWlnaHQgPSA4MTIpID0+XG5cdFx0QHByb3RvdHlwZVZpZXcud2lkdGggPSB3aWR0aFxuXHRcdEBwcm90b3R5cGVWaWV3LmhlaWdodCA9IGhlaWdodFxuXHRcdEBwcm90b3R5cGVWaWV3LmNlbnRlcigpXG5cblx0XHRpZiB3aWR0aCA9PSAzNzUgYW5kIGhlaWdodCA9PSA4MTIgdGhlbiBAc2NhbGVkKDIuMClcblx0XHRlbHNlIGlmIHdpZHRoID09IDM5MCBhbmQgaGVpZ2h0ID09IDg0NCB0aGVuIEBzY2FsZWQoMS45MjMpXG5cdFx0ZWxzZSBAc2NhbGVkKDIuMClcblxuXHRcdHJldHVybiBAXG5cdFxuXHRcblx0XG5cdCMgb3ZlcnJpZGVcblx0c291cmNlOiAob3JpZ2luVVJMKSA9PlxuXHRcdHVybCA9IG9yaWdpblVSTCArIFwiP2xvZ289b2ZmJmJ1dHRvbj1vZmZcIlxuXHRcdFxuXHRcdGNvbnRlbnRWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBwcm90b3R5cGVWaWV3XG5cdFx0XHR3aWR0aDogQHByb3RvdHlwZVZpZXcud2lkdGgsIGhlaWdodDogQHByb3RvdHlwZVZpZXcuaGVpZ2h0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGh0bWw6IFwiPGlmcmFtZSBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOycgc3JjPScje3VybH0nPjwvaWZyYW1lPlwiXG5cdFx0XHRpZ25vcmVFdmVudHM6IGZhbHNlLCBjbGlwOiB0cnVlXG5cdFx0XG5cdFx0cmV0dXJuIEBcblx0XG5cdFxuXHRcblx0Y3JlYXRlV2ViVmlldzogKHdlYlVSTCkgPT5cblx0XHRcblx0XHR2aWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdFx0bmFtZTogXCJ3ZWJ2aWV3XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYm9yZGVyUmFkaXVzOiBAaW1hZ2VSYWRpdXNcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRjb250ZW50VmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB2aWV3XG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRodG1sOiBcIjxpZnJhbWUgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsnIHNyYz0nI3t3ZWJVUkx9Jz48L2lmcmFtZT5cIlxuXHRcdFx0aWdub3JlRXZlbnRzOiBmYWxzZSwgY2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHJldHVybiB2aWV3XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtTbGlkZSwgU2ltcGxlVmlkZW9TbGlkZSwgVmlkZW9TbGlkZSwgSERWaWRlb1NsaWRlLCBQcm90b3R5cGVTbGlkZX0iLCJcbntTbGlkZXI1fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjVcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuVGV4dEJ1dHRvbiA9IEJ1dHRvbnMuVGV4dEJ1dHRvblxuUHJldmlld0J1dHRvbiA9IEJ1dHRvbnMuUHJldmlld0J1dHRvblxuXG5cbiMgUGFuZWxzXG5cbiMgcHJpbnQgXCI/XCJcbmNsYXNzIGV4cG9ydHMuU2xpZGVyR3JpZCBleHRlbmRzIFNsaWRlcjVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGdyaWQyID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0bmFtZTogXCJncmlkMlwiXG5cdFx0XHR3aWR0aDogMTQwMCAqIDIsIGhlaWdodDogOTAwICogMlxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWUsIHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdCMgaWdub3JlRXZlbnRzOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIwMDBcIlxuXHRcdFxuXHRcdGdyaWQyLnN0YXRlcyA9XG5cdFx0XHRcInNob3duXCI6IHsgb3BhY2l0eTogMSwgeTogU2NyZWVuLmhlaWdodCB9XG5cdFx0XHRcImhpZGRlblwiOiB7IG9wYWNpdHk6IDAsIHk6IFNjcmVlbi5oZWlnaHQgfVxuXHRcdFxuXHRcdCMgZ3JpZDIub24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0IyBcdGlmIGZyb20gIT0gdG9cblx0XHQjIFx0XHRpZiB0byA9PSBcInNob3duXCIgdGhlbiBAaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdCMgXHRcdGVsc2UgQGlnbm9yZUV2ZW50cyA9IGZhbHNlXG5cdFx0XG5cdFx0Z3JpZDIuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGdyaWQyOiBncmlkMlxuXHRcdFx0bGFzdFNsaWRlU2VsZWN0ZWRJbmRleDogMFxuXHRcdFx0Z3JpZEJ1dHRvbnM6IFtdXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdGdyaWQyLnBhcmVudCA9IEBjYW52YXNcblx0XHRAY2FudmFzLmN1c3RvbS5sb2NhbFNjcm9sbCA9IEBcblxuXHRcdHRyeSBncmlkLnBsYWNlQmVmb3JlKEB0b3BWaWV3KVxuXG5cblx0XHRAY29udGVudC5vbiBcImNoYW5nZTpjaGlsZHJlblwiLCAtPlxuXHRcdFx0bG9jYWxTY3JvbGwgPSBAcGFyZW50XG5cdFx0XHRcblx0XHRcdGxvY2FsU2Nyb2xsLmFkZFByZXZpZXcobG9jYWxTY3JvbGwuY29udGVudC5jaGlsZHJlbi5sZW5ndGgpXG5cdFx0XHRsb2NhbFNjcm9sbC51cGRhdGVQcmV2aWV3KClcblx0XHRcblxuXHRcdCMgQG9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdCMgXHRpZiBmcm9tICE9IHRvXG5cdFx0IyBcdFx0aWYgdG8gPT0gXCJwcmVzZW50XCIgdGhlbiBuZXh0T3BhY2l0eVZhbHVlID0gMVxuXHRcdCMgXHRcdGVsc2UgbmV4dE9wYWNpdHlWYWx1ZSA9IDBcblx0XHRcdFx0XG5cdFx0IyBcdFx0QGJvdHRvbVZpZXcuYW5pbWF0ZShvcGFjaXR5OiBuZXh0T3BhY2l0eVZhbHVlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXG5cdFx0XHRcdFxuXHRcblx0XG5cdEBkZWZpbmUgJ2xhc3RTbGlkZVNlbGVjdGVkSW5kZXgnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMubGFzdFNsaWRlU2VsZWN0ZWRJbmRleFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5sYXN0U2xpZGVTZWxlY3RlZEluZGV4ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dyaWRCdXR0b25zJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmdyaWRCdXR0b25zXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmdyaWRCdXR0b25zID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2dyaWQyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmdyaWQyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmdyaWQyID0gdmFsdWVcblx0XG5cdFxuXG5cdGxlYWRaZXJvOiAobnVtLCBzaXplID0gMikgPT5cblx0XHRzID0gbnVtICsgXCJcIlxuXHRcdHdoaWxlIHMubGVuZ3RoIDwgc2l6ZSB0aGVuIHMgPSBcIjBcIiArIHNcblx0XHRyZXR1cm4gc1xuXG5cblx0YWRkUHJldmlldzogKGltYWdlSW5kZXgpID0+XG5cdFx0aW5kZXggPSBpbWFnZUluZGV4IC0gMVxuXHRcdCMgcFcgPSBAZ3JpZDIud2lkdGggLyBAZ3JpZFNpemUoKVxuXHRcdCMgcEggPSAoQGdyaWQyLndpZHRoIC8gQGdyaWRTaXplKCkpICogKDkwMC8xNDAwKVxuXG5cdFx0cHJldmlld0xheWVyID0gbmV3IFByZXZpZXdCdXR0b25cblx0XHRcdHRleHQ6IFwiXCJcblx0XHRcdHBhcmVudDogQGdyaWQyLmNvbnRlbnRcblx0XHRcdHdpZHRoOiAyODAsIGhlaWdodDogMTgwXG5cdFx0XHRib3JkZXJSYWRpdXM6IDhcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIyMjJcIlxuXHRcdFx0IyB0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvcGFnZSN7QGxlYWRaZXJvKGltYWdlSW5kZXgpfUBwcmV2aWV3LnBuZ1wiXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGluZGV4OiBpbmRleFxuXHRcdFxuXHRcdHByZXZpZXdMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJzaG93blwiOiB7IG9wYWNpdHk6IDAuOCB9XG5cdFx0XHRcImhpZGRlblwiOiB7IG9wYWNpdHk6IDAgfVxuXHRcdHByZXZpZXdMYXllci5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXHRcdFxuXHRcdEBncmlkQnV0dG9ucy5wdXNoIHByZXZpZXdMYXllclxuXG5cdFx0cHJldmlld0xheWVyLm9uVGFwIC0+XG5cdFx0XHRsb2NhbENhbnZhcyA9IEBwYXJlbnQucGFyZW50LnBhcmVudFxuXHRcdFx0bG9jYWxTY3JvbGwgPSBsb2NhbENhbnZhcy5jdXN0b20ubG9jYWxTY3JvbGxcblx0XHRcdFxuXHRcdFx0bG9jYWxTY3JvbGwubGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IGluZGV4XG5cdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvU2xpZGUoKVxuXG5cdFx0XG5cdFx0IyBAZ3JpZDIudXBkYXRlQ29udGVudCgpXG5cdFxuXHR1cGRhdGVQcmV2aWV3OiAoKSA9PlxuXHRcdGZvciBpdGVtLCBpbmRleCBpbiBAZ3JpZDIuY29udGVudC5jaGlsZHJlblxuXHRcdFx0cFcgPSAoQGdyaWQyLndpZHRoIC0gQGdldEdyaWRHYXAoKSAqIChAZ3JpZFNpemUoKSArIDEpKSAvIEBncmlkU2l6ZSgpXG5cdFx0XHRwSCA9IHBXICogKDkwMC8xNDAwKVxuXG5cdFx0XHRpdGVtLndpZHRoID0gcFdcblx0XHRcdGl0ZW0uaGVpZ2h0ID0gcEhcblx0XHRcdGl0ZW0ueCA9IGluZGV4ICUgQGdyaWRTaXplKCkgKiAocFcgKyBAZ2V0R3JpZEdhcCgpKSArIEBnZXRHcmlkR2FwKClcblx0XHRcdGl0ZW0ueSA9IChpbmRleCAtIGluZGV4ICUgQGdyaWRTaXplKCkpIC8gQGdyaWRTaXplKCkgKiAocEggKyBAZ2V0R3JpZEdhcCgpKSArIEBnZXRHcmlkR2FwKClcblxuXHRcdFxuXHRcdEBncmlkMi51cGRhdGVDb250ZW50KClcblxuXG5cdFxuXHQjIG92ZXJyaWRlXG5cdHVwZGF0ZVNpemU6ICgpID0+XG5cdFx0c3VwZXJcblx0XHRuZXh0U3RhdGUgPSBAZ3JpZDIuc3RhdGVzLmN1cnJlbnQubmFtZVxuXHRcdFxuXHRcdEBncmlkMi53aWR0aCA9IEBjYW52YXMud2lkdGhcblx0XHRAZ3JpZDIuaGVpZ2h0ID0gQGNhbnZhcy5oZWlnaHQgLSA1OFxuXG5cdFx0QGdyaWQyLnN0YXRlcy5zaG93bi55ID0gNThcblx0XHRAZ3JpZDIuc3RhdGVzLmhpZGRlbi55ID0gU2NyZWVuLmhlaWdodCArIDEwMDBcblxuXHRcdEBncmlkMi5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cblx0XHRAdXBkYXRlUHJldmlldygpXG5cblxuXHRncmlkU2l6ZTogKCkgPT5cblx0XHRpZiBAY2FudmFzLndpZHRoIDwgNzQwIHRoZW4gcmV0dXJuIDJcblx0XHRlbHNlIGlmIEBjYW52YXMud2lkdGggPCAxMjgwIHRoZW4gcmV0dXJuIDNcblx0XHRlbHNlIGlmIEBjYW52YXMud2lkdGggPCAxNjAwIHRoZW4gcmV0dXJuIDRcblx0XHRlbHNlIGlmIEBjYW52YXMud2lkdGggPCAyMDAwIHRoZW4gcmV0dXJuIDVcblx0XHRyZXR1cm4gNlxuXG5cdGdldEdyaWRHYXA6ICgpID0+XG5cdFx0cmV0dXJuIDhcblxuXHRnZXRHcmlkU2NhbGU6ICgpID0+XG5cdFx0d3MgPSAoQHdpZHRoIC0gQGdldEdyaWRHYXAoKSAqIChAZ3JpZFNpemUoKSAtIDEpKSAvIEBncmlkU2l6ZSgpXG5cdFx0cmV0dXJuIHdzIC8gQHdpZHRoXG5cblxuXG5cdGlzR3JpZDogKCkgPT5cblx0XHRyZXR1cm4gQGdyaWQyLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJzaG93blwiXG5cblx0cGluY2hUb0dyaWQ6ICgpID0+XG5cdFx0aWYgQGlzR3JpZCgpIHRoZW4gQHBpbmNoVG9TbGlkZSgpXG5cdFx0ZWxzZVxuXHRcdFx0IyBpZiBAZ3JpZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZnVsbHNjcmVlblwiIHRoZW4gQGNoYW5nZVNjYWxlKClcblxuXHRcdFx0Zm9yIGl0ZW0sIGluZGV4IGluIEBncmlkQnV0dG9uc1xuXHRcdFx0XHRpZiBpbmRleCA9PSBAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleFxuXHRcdFx0XHRcdGl0ZW0uc3RhdGVTd2l0Y2goXCJzaG93blwiKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0aXRlbS5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXHRcdFx0XHRcdGl0ZW0uYW5pbWF0ZShcInNob3duXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSwgZGVsYXk6IDAuMTIgKyAwLjAyICogTWF0aC5hYnMoKEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4IC0gaW5kZXgpKSlcblx0XHRcdFxuXHRcdFx0QGdyaWQyLnN0YXRlU3dpdGNoKFwic2hvd25cIilcblx0XHRcdHRyeSBAZ3JpZDIuc2Nyb2xsVG9Qb2ludCh7IHg6IDAsIHk6IEBncmlkQnV0dG9uc1tAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleF0ueSAtIEBncmlkQnV0dG9uc1tAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleF0uaGVpZ2h0IC8gMiB9LCBmYWxzZSlcblx0XHRcdFxuXHRcdFx0QHBhdXNlVmlkZW9zKClcblxuXHRwaW5jaFRvU2xpZGU6ICgpID0+XG5cdFx0IyBwcmludCBAbGFzdFNsaWRlU2VsZWN0ZWRJbmRleFxuXHRcdEBncmlkMi5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXHRcdEBzbmFwVG9QYWdlKEBjb250ZW50LmNoaWxkcmVuW0BsYXN0U2xpZGVTZWxlY3RlZEluZGV4XSwgZmFsc2UpXG5cdFx0XG5cdFx0XG5cblxuXG5cdFx0XG5cdFx0IiwiXG57U2xpZGVyNH0gPSByZXF1aXJlIFwiUENTbGlkZXI0XCJcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXI1IGV4dGVuZHMgU2xpZGVyNFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRhY3RpdmVWaWRlb1BsYXllcjogbnVsbFxuXHRcdFx0YWN0aXZlUHJvZ3Jlc3NTbGlkZXI6IG51bGxcblx0XHRcdGFjdGl2ZURyYWc6IGZhbHNlXG5cdFx0XHRhY3RpdmVQbGF5aW5nOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRcblx0XHRGcmFtZXIuTG9vcC5vbiBcInJlbmRlclwiLCA9PlxuXHRcdFx0aWYgIUBhY3RpdmVEcmFnIGFuZCBAYWN0aXZlUGxheWluZyBhbmQgIUBpc0dyaWQoKVxuXG5cdFx0XHRcdGlmIEBhY3RpdmVQcm9ncmVzc1NsaWRlciAhPSB1bmRlZmluZWQgYW5kIEBhY3RpdmVQcm9ncmVzc1NsaWRlciAhPSBudWxsXG5cdFx0XHRcdFx0aWYgQGFjdGl2ZVZpZGVvUGxheWVyICE9IHVuZGVmaW5lZCBhbmQgQGFjdGl2ZVZpZGVvUGxheWVyICE9IG51bGxcblx0XHRcdFx0XHRcdEBhY3RpdmVQcm9ncmVzc1NsaWRlci52YWx1ZSA9IFV0aWxzLm1vZHVsYXRlKEBhY3RpdmVWaWRlb1BsYXllci5jdXJyZW50VGltZSwgWzAsIEBhY3RpdmVWaWRlb1BsYXllci5kdXJhdGlvbl0sIFswLCAxXSwgdHJ1ZSlcblxuXG5cblx0dXBkYXRlQ3VycmVudFBhZ2U6ICgpID0+XG5cdFx0c3VwZXIgQHVwZGF0ZUNvbnRlbnQoKVxuXHRcdFxuXHRcdEBzZWxlY3RDdXJyZW50UGxheWluZ1ZpZGVvKClcblx0XHRAYWN0aXZlRHJhZyA9IGZhbHNlXG5cdFxuXHRcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZVByb2dyZXNzU2xpZGVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZVByb2dyZXNzU2xpZGVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZVByb2dyZXNzU2xpZGVyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZVZpZGVvUGxheWVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFjdGl2ZVZpZGVvUGxheWVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZVZpZGVvUGxheWVyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZURyYWcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlRHJhZ1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVEcmFnID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2FjdGl2ZVBsYXlpbmcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlUGxheWluZ1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5hY3RpdmVQbGF5aW5nID0gdmFsdWVcblx0XG5cdFxuXHRcblx0c2VsZWN0Q3VycmVudFBsYXlpbmdWaWRlbzogKCkgPT5cblx0XHRjdXJyZW50bHlOb3RQbGF5aW5nID0gdHJ1ZVxuXG5cdFx0Zm9yIGl0ZW0gaW4gQHZpZGVvU2xpZGVzXG5cdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRjdXJyZW50bHlOb3RQbGF5aW5nID0gZmFsc2Vcblx0XHRcdFx0QGFjdGl2ZVByb2dyZXNzU2xpZGVyID0gQGN1cnJlbnRQYWdlLnBsYXllclNsaWRlclxuXHRcdFx0XHRAYWN0aXZlVmlkZW9QbGF5ZXIgPSBAY3VycmVudFBhZ2UudmlkZW9WaWV3LnBsYXllclxuXHRcdFxuXHRcdGlmIGN1cnJlbnRseU5vdFBsYXlpbmdcblx0XHRcdEBhY3RpdmVQcm9ncmVzc1NsaWRlciA9IG51bGxcblx0XHRcdEBhY3RpdmVWaWRlb1BsYXllciA9IG51bGxcbiIsIlxue1NsaWRlcjN9ID0gcmVxdWlyZSBcIlBDU2xpZGVyM1wiXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyNCBleHRlbmRzIFNsaWRlcjNcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBvbiBcImNoYW5nZTpjdXJyZW50UGFnZVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUN1cnJlbnRQYWdlKClcblx0XHRcblx0XHRAY29udGVudC5vbiBcImNoYW5nZTpjaGlsZHJlblwiLCAtPlxuXHRcdFx0QHBhcmVudC5zbGlkZUNoYW5nZXJWaWV3LnBhZ2VzID0gQGNoaWxkcmVuLmxlbmd0aFxuXHRcdFx0QHBhcmVudC51cGRhdGVDdXJyZW50UGFnZSgpXG5cdFx0XG5cdFxuXHRcblx0XG5cdHVwZGF0ZUN1cnJlbnRQYWdlOiAoKSA9PlxuXHRcdGlmICFAaXNHcmlkKClcblx0XHRcdGZvciBpdGVtLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRcdEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4ID0gaW5kZXhcblx0XHRcdFx0XHRicmVha1xuXHRcdFxuXG5cdFx0QHBhdXNlQmFja2dyb3VuZFZpZGVvcygpXG5cdFx0QHVwZGF0ZUN1cnJlbnRQYWdlU2xpZGVyKClcblxuXHRcdGlmICFAaXNHcmlkKCkgdGhlbiBAcGxheUFjdGl2ZVZpZGVvKClcblx0XHRcdFxuXHRcblxuXG5cdHBsYXlBY3RpdmVWaWRlbzogKCkgPT5cblx0XHRmb3IgY3VycmVudFZpZGVvU2xpZGUgaW4gQHZpZGVvU2xpZGVzXG5cdFx0XHRpZiBjdXJyZW50VmlkZW9TbGlkZSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0Y3VycmVudFZpZGVvU2xpZGUucGxheSgpXG5cdFx0XHRcdHJldHVyblxuXG5cblx0cGF1c2VWaWRlb3M6ICgpID0+XG5cdFx0Zm9yIGN1cnJlbnRWaWRlb1NsaWRlIGluIEB2aWRlb1NsaWRlc1xuXHRcdFx0Y3VycmVudFZpZGVvU2xpZGUucGF1c2UoKVxuXG5cblx0cGF1c2VCYWNrZ3JvdW5kVmlkZW9zOiAoKSA9PlxuXHRcdGZvciBjdXJyZW50VmlkZW9TbGlkZSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGlmIGN1cnJlbnRWaWRlb1NsaWRlICE9IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRjdXJyZW50VmlkZW9TbGlkZS5wYXVzZSgpXG5cdFxuXHRzaG93R3JpZENhbmNlbEJ1dHRvbjogKCkgPT5cblx0XHRAc2xpZGVDaGFuZ2VyVmlldy5jdXJyZW50ID0gLTFcblx0XG5cdHVwZGF0ZUN1cnJlbnRQYWdlU2xpZGVyOiAoKSA9PlxuXHRcdGlmIEBpc0dyaWQoKVxuXHRcdFx0QHNob3dHcmlkQ2FuY2VsQnV0dG9uKClcblx0XHRcdHJldHVyblxuXHRcdFxuXHRcdGZvciBpdGVtLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0aWYgaXRlbSA9PSBAY3VycmVudFBhZ2Vcblx0XHRcdFx0QHNsaWRlQ2hhbmdlclZpZXcuY3VycmVudCA9IChpbmRleCArIDEpXG5cdFx0XHRcdHJldHVybiIsIlxuXG57U2xpZGVyMn0gPSByZXF1aXJlIFwiUENTbGlkZXIyXCJcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXIzIGV4dGVuZHMgU2xpZGVyMlxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QGluaXRTaG9ydGN1dHMoKVxuXHRcblx0XG5cdGluaXRTaG9ydGN1dHM6ICgpID0+XG5cdFx0bG9jYWxTY3JvbGwgPSBAXG5cdFx0XG5cdFx0RXZlbnRzLndyYXAod2luZG93KS5hZGRFdmVudExpc3RlbmVyIFwia2V5ZG93blwiLCAoZXZlbnQpIC0+XG5cdFx0XHRcblx0XHRcdGlmIGV2ZW50LmNvZGUgaXMgXCJBcnJvd0xlZnRcIlxuXHRcdFx0XHRpZiAhbG9jYWxTY3JvbGwuaXNHcmlkKClcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5zbmFwVG9OZXh0UGFnZShcImxlZnRcIiwgZmFsc2UpXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIkFycm93UmlnaHRcIlxuXHRcdFx0XHRpZiAhbG9jYWxTY3JvbGwuaXNHcmlkKClcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5zbmFwVG9OZXh0UGFnZShcInJpZ2h0XCIsIGZhbHNlKVxuXHRcdFx0XG5cblxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5Q1wiXG5cdFx0XHRcdGxvY2FsU2Nyb2xsLmNvcHlCdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleVJcIlxuXHRcdFx0XHRsb2NhbFNjcm9sbC5yZXN0YXJ0QnV0dG9uLmVtaXQgRXZlbnRzLlRhcFxuXHRcdFx0XG5cblxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5RlwiXG5cdFx0XHRcdGlmICFsb2NhbFNjcm9sbC5pc0dyaWQoKVxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvR3JpZCgpXG5cdFx0XHRcdFx0VXRpbHMuZGVsYXkgMC4zNiwgPT5cblx0XHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIktleUFcIlxuXHRcdFx0XHRpZiBsb2NhbFNjcm9sbC5ncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJ3aW5kb3dcIlxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLnBpbmNoVG9HcmlkKClcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRcdFx0VXRpbHMuZGVsYXkgMC4zNiwgPT5cblx0XHRcdFx0XHRcdGxvY2FsU2Nyb2xsLnBpbmNoVG9HcmlkKClcblxuXHRcdFx0XG5cblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIkVzY2FwZVwiXG5cdFx0XHRcdGlmIGxvY2FsU2Nyb2xsLmdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZ1bGxzY3JlZW5cIlxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLmZ1bGxzY3JlZW5CdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRcdGVsc2UgaWYgbG9jYWxTY3JvbGwuaXNHcmlkKClcblx0XHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvR3JpZCgpXG5cdFx0XHRcblx0XHRcdGVsc2UgaWYgZXZlbnQuY29kZSBpcyBcIlNwYWNlXCJcblx0XHRcdFx0dHJ5IGxvY2FsU2Nyb2xsLmN1cnJlbnRQYWdlLnRvZ2dsZVBsYXkoKVxuXHQiLCJcbntTbGlkZXIxfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjFcIlxuXG5cblNsaWRlVGVtcGxhdGUgPSByZXF1aXJlKFwiUENTbGlkZVwiKVxuU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlNsaWRlXG5TaW1wbGVWaWRlb1NsaWRlID0gU2xpZGVUZW1wbGF0ZS5TaW1wbGVWaWRlb1NsaWRlXG5WaWRlb1NsaWRlID0gU2xpZGVUZW1wbGF0ZS5WaWRlb1NsaWRlXG5IRFZpZGVvU2xpZGUgPSBTbGlkZVRlbXBsYXRlLkhEVmlkZW9TbGlkZVxuXG5Qcm90b3R5cGVTbGlkZSA9IFNsaWRlVGVtcGxhdGUuUHJvdG90eXBlU2xpZGVcblxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjIgZXh0ZW5kcyBTbGlkZXIxXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHZpZGVvU2xpZGVzOiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFxuXHRAZGVmaW5lICd2aWRlb1NsaWRlcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWRlb1NsaWRlc1xuXHRcblx0XG5cdFxuXHRcblx0XG5cdHNsaWRlOiAoc291cmNlVVJMID0gbnVsbCkgPT5cblx0XHRzbGlkZSA9IG5ldyBTbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFxuXHRcdGlmIHNvdXJjZVVSTCAhPSBudWxsIHRoZW4gc2xpZGUuc291cmNlKHNvdXJjZVVSTClcblx0XHRyZXR1cm4gc2xpZGVcblxuXG5cblx0YmdWaWRlb1NsaWRlOiAoc291cmNlVVJMID0gbnVsbCkgPT5cblx0XHRzbGlkZSA9IG5ldyBTaW1wbGVWaWRlb1NsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0aWYgc291cmNlVVJMICE9IG51bGwgdGhlbiBzbGlkZS5zb3VyY2Uoc291cmNlVVJMKVxuXHRcdEB2aWRlb1NsaWRlcy5wdXNoIHNsaWRlXG5cdFx0cmV0dXJuIHNsaWRlXG5cdFxuXHR2aWRlb1NsaWRlOiAoc291cmNlVVJMID0gbnVsbCkgPT5cblx0XHRzbGlkZSA9IG5ldyBIRFZpZGVvU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0QHZpZGVvU2xpZGVzLnB1c2ggc2xpZGVcblx0XHRyZXR1cm4gc2xpZGVcblxuXHRmdWxsVmlkZW9TbGlkZTogKHNvdXJjZVVSTCA9IG51bGwpID0+XG5cdFx0c2xpZGUgPSBuZXcgVmlkZW9TbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFxuXHRcdGlmIHNvdXJjZVVSTCAhPSBudWxsIHRoZW4gc2xpZGUuc291cmNlKHNvdXJjZVVSTClcblx0XHRAdmlkZW9TbGlkZXMucHVzaCBzbGlkZVxuXHRcdHJldHVybiBzbGlkZVxuXG5cdFxuXHRcblx0XG5cdFxuXHRcblxuXG5cdHByb3RvdHlwZVNsaWRlOiAoc291cmNlVVJMID0gbnVsbCkgPT5cblx0XHRzbGlkZSA9IG5ldyBQcm90b3R5cGVTbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFxuXHRcdGlmIHNvdXJjZVVSTCAhPSBudWxsIHRoZW4gc2xpZGUuc291cmNlKHNvdXJjZVVSTClcblx0XHRyZXR1cm4gc2xpZGUiLCJcblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbntTbGlkZXIwfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjBcIlxuIyB7U2xpZGVyUGluY2h9ID0gcmVxdWlyZSBcIlBDU2xpZGVyUGluY2hcIlxue1NsaWRlQ2hhbmdlcn0gPSByZXF1aXJlIFwiUENTbGlkZUNoYW5nZXJcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuVGV4dCA9IEJ1dHRvbnMuVGV4dFxuVGV4dEJ1dHRvbiA9IEJ1dHRvbnMuVGV4dEJ1dHRvblxuU1ZHQnV0dG9uID0gQnV0dG9ucy5TVkdCdXR0b25cbkNvcHlCdXR0b24gPSBCdXR0b25zLkNvcHlCdXR0b25cblxuXG4jIFBhbmVsc1xuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjEgZXh0ZW5kcyBTbGlkZXIwXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEB0b3BWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBjYW52YXMsIG5hbWU6IFwidG9wVmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiBAY2FudmFzLndpZHRoLCBoZWlnaHQ6IDU2XG5cdFx0XG5cdFx0QGJvdHRvbVZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGNhbnZhcywgbmFtZTogXCJib3R0b21WaWV3XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEBjYW52YXMud2lkdGgsIGhlaWdodDogNTYsIHk6IEFsaWduLmJvdHRvbVxuXHRcdFxuXHRcdGZvciBpdGVtIGluIFtAdG9wVmlldywgQGJvdHRvbVZpZXddXG5cdFx0XHRpdGVtLnNlbmRUb0JhY2soKVxuXHRcdFx0aXRlbS5zdGF0ZXMgPVxuXHRcdFx0XHRcIndpbmRvd1wiOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFx0XHRcImZ1bGxzY3JlZW5cIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcblx0XHRcblx0XHRcblx0XHQjIFRvcCBWaWV3XG5cdFx0QGxvZ29CdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImxvZ29cIlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyLCBhc3NldDogU1ZHLmxvZ29JY29uXG5cdFx0XHRoYW5kbGVyOiBAb3BlblVSTEhvbWVcblx0XHRcblx0XHRAdGl0bGVUZXh0ID0gbmV3IFRleHRcblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwidGl0bGVcIlxuXHRcdFx0dGV4dDogQHRpdGxlLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcblx0XHRcblx0XHRAY29weUJ1dHRvbiA9IG5ldyBDb3B5QnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImNvcHkgbGlua1wiXG5cdFx0XHR0ZXh0OiBcIkNvcHkgTGlua1wiLCB0ZXh0QWxpZ246IFwicmlnaHRcIiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjdXN0b206IHsgeDogLTQwLTIwLTI0IH1cblx0XHRcdGxpbms6IHdpbmRvdy5sb2NhdGlvblxuXHRcdFxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJmdWxsc2NyZWVuXCJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0d2lkdGg6IDIwLCBoZWlnaHQ6IDIwLCBhc3NldDogU1ZHLmZ1bGxzY3JlZW5JY29uXG5cdFx0XHRoYW5kbGVyOiBAY2hhbmdlU2NhbGVcblx0XHRcdGN1c3RvbTogeyB4OiAtMzYgfVxuXHRcdFxuXG5cblxuXHRcdCMgQm90dG9tIFZpZXdcblx0XHRAc2xpZGVDaGFuZ2VyVmlldyA9IG5ldyBTbGlkZUNoYW5nZXJcblx0XHRcdHBhcmVudDogQGJvdHRvbVZpZXcsIG5hbWU6IFwic2xpZGUgY2hhbmdlclwiXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXJcblx0XHRcdHNsaWRlcjogQFxuXHRcdFxuXHRcdEByZXN0YXJ0QnV0dG9uID0gbmV3IFRleHRCdXR0b25cblx0XHRcdHBhcmVudDogQGJvdHRvbVZpZXcsIG5hbWU6IFwicmVzdGFydFwiXG5cdFx0XHR0ZXh0OiBcIlJlc3RhcnQgKFIpXCIsIHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMjAwMCksIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0aGFuZGxlcjogQHJlc3RhcnRIYW5kbGVyXG5cdFx0XHRjdXN0b206IHsgeDogLTIwMDAgfVxuXHRcdFxuXHRcdFxuXG5cblx0XHRAdXBkYXRlVmlld0J1aWxkZXJTaXplKEBjYW52YXMpXG5cdFx0QGNhbnZhcy5vbiBcImNoYW5nZTpzaXplXCIsID0+XG5cdFx0XHRAdXBkYXRlVmlld0J1aWxkZXJTaXplKEBjYW52YXMpXG5cdFx0XG5cdFx0XG5cdFxuXG5cdHVwZGF0ZVZpZXdCdWlsZGVyU2l6ZTogKGFuY2hvcikgPT5cblx0XHRcblx0XHRAdG9wVmlldy53aWR0aCA9IGFuY2hvci53aWR0aFxuXHRcdFxuXHRcdGlmIGFuY2hvci53aWR0aCA8IDc0MFxuXHRcdFx0QHRpdGxlVGV4dC53aWR0aCA9IGFuY2hvci53aWR0aFxuXHRcdFx0QHRpdGxlVGV4dC50ZXh0QWxpZ24gPSBcImxlZnRcIlxuXHRcdFx0QHRpdGxlVGV4dC54ID0gQWxpZ24ubGVmdChAbG9nb0J1dHRvbi54KVxuXHRcdFx0QHRpdGxlVGV4dC55ID0gQWxpZ24udG9wKEB0b3BWaWV3LmhlaWdodCArIDEwKVxuXHRcdFx0XG5cdFx0XHRAY29weUJ1dHRvbi54ID0gQWxpZ24ubGVmdChAbG9nb0J1dHRvbi54KVxuXHRcdFx0QGNvcHlCdXR0b24ueSA9IEFsaWduLnRvcChAdG9wVmlldy5oZWlnaHQgKyAzNilcblx0XHRlbHNlXG5cdFx0XHRAdGl0bGVUZXh0LndpZHRoID0gYW5jaG9yLndpZHRoIC8gMlxuXHRcdFx0QHRpdGxlVGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiXG5cdFx0XHRAdGl0bGVUZXh0LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdEB0aXRsZVRleHQueSA9IEFsaWduLmNlbnRlcigyKVxuXHRcdFx0XG5cdFx0XHRAY29weUJ1dHRvbi54ID0gQWxpZ24ucmlnaHQoQGNvcHlCdXR0b24uY3VzdG9tLngpXG5cdFx0XHRAY29weUJ1dHRvbi55ID0gQWxpZ24uY2VudGVyKDIpXG5cdFx0XG5cdFx0QGZ1bGxzY3JlZW5CdXR0b24ueCA9IEFsaWduLnJpZ2h0KEBmdWxsc2NyZWVuQnV0dG9uLmN1c3RvbS54KVxuXHRcdEBmdWxsc2NyZWVuQnV0dG9uLnkgPSBBbGlnbi5jZW50ZXIoMilcblx0XHRcblx0XHRAYm90dG9tVmlldy53aWR0aCA9IGFuY2hvci53aWR0aFxuXHRcdEBzbGlkZUNoYW5nZXJWaWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XHQjIGhlaWdodFxuXHRcdEBib3R0b21WaWV3LnkgPSBBbGlnbi5ib3R0b20iLCJcblxuIyBTY2FsZSAmIFVSTCBoYW5kbGluZ1xuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjAgZXh0ZW5kcyBQYWdlQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Y2FudmFzQmFja2dyb3VuZExheWVyID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0bmFtZTogXCJiYWNrZ3JvdW5kTGF5ZXJcIlxuXHRcdFxuXG5cblx0XHRjYW52YXNMYXllciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJjYW52YXNcIlxuXHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0aGVpZ2h0OiBTY3JlZW4uaGVpZ2h0XG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxvY2FsU2Nyb2xsOiBudWxsXG5cdFx0XG5cdFx0Y2FudmFzTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwid2luZG93XCI6IHsgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIiB9XG5cdFx0XHRcImZ1bGxzY3JlZW5cIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMlwiIH1cblxuXG5cdFx0IyBMZWdhY3lcblx0XHRsZWdhY3lTY3JvbGwgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IGNhbnZhc0xheWVyXG5cdFx0XHRuYW1lOiBcImdyaWRcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyLCBoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZSwgc2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0aWdub3JlRXZlbnRzOiB0cnVlXG5cdFx0XG5cdFx0bGVnYWN5U2Nyb2xsLnN0YXRlcyA9XG5cdFx0XHRcIndpbmRvd1wiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IHNjYWxlOiAxIH1cblxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGNhbnZhczogY2FudmFzTGF5ZXJcblx0XHRcdGdyaWQ6IGxlZ2FjeVNjcm9sbFxuXHRcdFx0YmFja2dyb3VuZExheWVyOiBjYW52YXNCYWNrZ3JvdW5kTGF5ZXJcblx0XG5cdFx0XHRwYXJlbnQ6IGxlZ2FjeVNjcm9sbC5jb250ZW50XG5cdFx0XHR3aWR0aDogbGVnYWN5U2Nyb2xsLndpZHRoLCBoZWlnaHQ6IGxlZ2FjeVNjcm9sbC5oZWlnaHRcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiBmYWxzZSwgc2Nyb2xsSG9yaXpvbnRhbDogdHJ1ZVxuXHRcdFx0cHJlc2VudGF0aW9uVGl0bGU6IFwiVW50aXRsZWRcIlxuXHRcdFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBjb250ZW50LmRyYWdnYWJsZS5wcm9wYWdhdGVFdmVudHMgPSBmYWxzZVxuXG5cdFx0RnJhbWVyLkV4dHJhcy5QcmVsb2FkZXIuZGlzYWJsZSgpXG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cdFx0XG5cdFx0QGluaXRTY2FsZSgpXG5cdFx0XG5cdFx0QHVwZGF0ZVNpemUoKVxuXHRcdEBiYWNrZ3JvdW5kTGF5ZXIub24gXCJjaGFuZ2U6c2l6ZVwiLCA9PlxuXHRcdFx0QHVwZGF0ZVNpemUoKVxuXHRcdFxuXG5cblx0XG5cblx0QGRlZmluZSAndGl0bGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJlc2VudGF0aW9uVGl0bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJlc2VudGF0aW9uVGl0bGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnY2FudmFzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmNhbnZhc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5jYW52YXMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZ3JpZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmdyaWQgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYmFja2dyb3VuZExheWVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJhY2tncm91bmRMYXllclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5iYWNrZ3JvdW5kTGF5ZXIgPSB2YWx1ZVxuXHRcblx0XG5cdFxuXG5cdCMgaXNHcmlkOiAoKSA9PlxuXHQjIFx0cmV0dXJuIEBzdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZ3JpZFwiXG5cdFxuXHR1cGRhdGVTaXplOiAoKSA9PlxuXHRcdEBpbml0U2NhbGUoQGdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XG5cdGluaXRTY2FsZTogKGZvclN0YXRlID0gXCJ3aW5kb3dcIikgPT5cblx0XHRAY2FudmFzLndpZHRoID0gU2NyZWVuLndpZHRoXG5cdFx0QGNhbnZhcy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cblx0XHRzY2FsZVggPSAoU2NyZWVuLndpZHRoIC0gMjApIC8gQGdyaWQud2lkdGhcblx0XHRzY2FsZVkgPSAoU2NyZWVuLmhlaWdodCAtIDEyMCkgLyBAZ3JpZC5oZWlnaHRcblx0XHRAZ3JpZC5zdGF0ZXMud2luZG93LnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFx0XG5cdFx0c2NhbGVYID0gU2NyZWVuLndpZHRoIC8gQGdyaWQud2lkdGhcblx0XHRzY2FsZVkgPSBTY3JlZW4uaGVpZ2h0IC8gQGdyaWQuaGVpZ2h0XG5cdFx0QGdyaWQuc3RhdGVzLmZ1bGxzY3JlZW4uc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XHRcblx0XHRAZ3JpZC5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRAY2FudmFzLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdEBncmlkLmNlbnRlcigpXG5cdFxuXHRcblx0IyBmb3IgcmVhY3Rcblx0Y2hhbmdlU2NhbGU6ICgpID0+XG5cdFx0XG5cdFx0aWYgQGdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIndpbmRvd1wiIHRoZW4gbmV4dFN0YXRlID0gXCJmdWxsc2NyZWVuXCJcblx0XHRlbHNlIG5leHRTdGF0ZSA9IFwid2luZG93XCJcblx0XHRcblx0XHRAZ3JpZC5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEBjYW52YXMuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRAdG9wVmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEBib3R0b21WaWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXG5cdHJlc3RhcnRIYW5kbGVyOiAoKSA9PlxuXHRcdEBzbmFwVG9QYWdlKEBjb250ZW50LmNoaWxkcmVuWzBdLCBmYWxzZSlcblx0XG5cdFxuXHRvcGVuVVJMOiAodXJsID0gXCJodHRwczovL3RpbGxsdXIuY29tXCIsIGlzQmxhbmsgPSBmYWxzZSkgPT5cblx0XHRpZiBpc0JsYW5rIHRoZW4gd2luZG93Lm9wZW4gdXJsLCAnX2JsYW5rJ1xuXHRcdGVsc2VcbiMgXHRcdFx0d2luZG93LmxvY2F0aW9uLmhhc2ggPSBcIj9zbGlkZUlEXCJcblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVybFxuXHRcblx0b3BlblVSTEhvbWU6ID0+XG5cdFx0QG9wZW5VUkwoXCJodHRwczovL3RpbGxsdXIuY29tXCIsIGZhbHNlKVxuXG4iLCJcblxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcbiMgVGV4dCA9IEJ1dHRvbnMuVGV4dFxuVGV4dEJ1dHRvbiA9IEJ1dHRvbnMuVGV4dEJ1dHRvblxuU1ZHQnV0dG9uID0gQnV0dG9ucy5TVkdCdXR0b25cblxuXG5jbGFzcyBleHBvcnRzLlNsaWRlQ2hhbmdlciBleHRlbmRzIExheWVyXG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBcInByb2dyZXNzIHZpZXdcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogMTIwXG5cdFx0XHRoZWlnaHQ6IDU2XG5cdFx0XHRwYWdlczogMVxuXHRcdFx0Y3VycmVudDogMVxuXHRcdFx0c2xpZGVyOiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHR0ZXN0SGFkbGVyID0gKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdHRyeSBAcGFyZW50LnNsaWRlci5waW5jaFRvR3JpZCgpXG5cblxuXHRcdEBjdXJyZW50VGV4dCA9IG5ldyBUZXh0QnV0dG9uXG5cdFx0XHR0ZXh0QWxpZ246IFwiY2VudGVyXCIsIHdpZHRoOiAxMjAsIGxldHRlclNwYWNpbmc6IDNcblx0XHRcdGhhbmRsZXI6IHRlc3RIYWRsZXJcblx0XHRcblx0XHRAY3VycmVudFRleHQudXBkYXRlVHVwbGUoeyBub3JtYWw6IDEsIGhvdmVyOiAwLjggfSlcblxuXHRcdEBwcmV2QnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0bmFtZTogXCJwcmV2XCIsIHdpZHRoOiAxNiwgaGVpZ2h0OiAxNiwgYXNzZXQ6IFNWRy5wcmV2SWNvblxuXHRcdFx0aGFuZGxlcjogQG1vdmVMZWZ0XG5cdFx0XG5cdFx0QG5leHRCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRuYW1lOiBcIm5leHRcIiwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBhc3NldDogU1ZHLm5leHRJY29uXG5cdFx0XHRoYW5kbGVyOiBAbW92ZVJpZ2h0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAY3VycmVudFRleHQucGFyZW50ID0gQFxuXHRcdEBjdXJyZW50VGV4dC55ID0gQWxpZ24uY2VudGVyKC0xKVxuXHRcdEBjdXJyZW50VGV4dC5zdHlsZSA9XG5cdFx0XHRcImZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcInRudW1cIlxuXHRcdFx0XCJmb250LXZhcmlhbnQtbnVtZXJpY1wiOiBcInRhYnVsYXItbnVtcyBsaW5pbmctbnVtc1wiXG5cdFx0XG5cdFx0QHByZXZCdXR0b24ucGFyZW50ID0gQFxuXHRcdEBwcmV2QnV0dG9uLnggPSBBbGlnbi5sZWZ0XG5cdFx0QHByZXZCdXR0b24ueSA9IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcdEBuZXh0QnV0dG9uLnBhcmVudCA9IEBcblx0XHRAbmV4dEJ1dHRvbi54ID0gQWxpZ24ucmlnaHRcblx0XHRAbmV4dEJ1dHRvbi55ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFxuXHRAZGVmaW5lICdzbGlkZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2xpZGVyXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zbGlkZXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAncGFnZXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucGFnZXNcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnBhZ2VzID0gdmFsdWVcblx0XHRcdEBjdXJyZW50VGV4dC50ZXh0ID0gXCIje0BjdXJyZW50fS8je0BwYWdlc31cIlxuXG5cdEBkZWZpbmUgJ2N1cnJlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY3VycmVudFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuY3VycmVudCA9IHZhbHVlXG5cblx0XHRcdGlmIEBjdXJyZW50ICE9IC0xXG5cdFx0XHRcdCMgdGhlbiBAcGFyZW50LmFuaW1hdGUob3BhY2l0eTogMCwgY3VydmU6IFNwcmluZyhkYW1ycGluZzogMSksIHRpbWU6IDAuNClcblx0XHRcdCMgZWxzZVxuXHRcdFx0XHQjIEBwYXJlbnQuYW5pbWF0ZShvcGFjaXR5OiAxLCBjdXJ2ZTogU3ByaW5nKGRhbXJwaW5nOiAxKSwgdGltZTogMC40KVxuXHRcdFx0XHRAY3VycmVudFRleHQudGV4dCA9IFwiI3tAY3VycmVudH0vI3tAcGFnZXN9XCJcblx0XHRcdFxuXHRcblxuXG5cblx0bW92ZUxlZnQ6ICgpID0+XG4jIFx0XHRwcmludCBAc2xpZGVyXG5cdFx0QHNsaWRlci5zbmFwVG9OZXh0UGFnZShcImxlZnRcIiwgZmFsc2UpXG5cdFxuXHRtb3ZlUmlnaHQ6ICgpID0+XG4jIFx0XHRwcmludCBAc2xpZGVyXG5cdFx0QHNsaWRlci5zbmFwVG9OZXh0UGFnZShcInJpZ2h0XCIsIGZhbHNlKSIsIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5jb2xvcl9vbkRhcmsgPSBcIiNmZmZcIlxuY29sb3Jfb25MaWdodCA9IFwiIzAwMFwiXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcblxuZXhwb3J0cy5sb2dvSWNvbiA9IHsgb25EYXJrOiBnZXRMb2dvKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldExvZ28oY29sb3Jfb25MaWdodCl9XG5cblxuXG5nZXRGdWxsc2NyZWVuID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTExLjA0MSAyLjkyMTY0QzExLjA0MSAzLjQ0NDczIDExLjQyMjUgMy44MzQ5OCAxMS45NTMzIDMuODM0OThIMTIuNTQyM0wxNS4xMTM1IDMuNjYwNjFMMTMuMDk4IDUuNTc4NjJMMTAuNzA5MiA3Ljk1MzNDMTAuNTI2NyA4LjEyNzY2IDEwLjQ0MzggOC4zNTE4NCAxMC40NDM4IDguNTkyNjNDMTAuNDQzOCA5LjE1NzI0IDEwLjgyNTMgOS41NjQwOSAxMS4zODkzIDkuNTY0MDlDMTEuNjQ2NCA5LjU2NDA5IDExLjg3MDQgOS40NjQ0NSAxMi4wNTI5IDkuMjkwMDlMMTQuNDMzNCA2LjkwNzExTDE2LjM0MTEgNC44ODExNkwxNi4xNjY5IDcuNDcxNzJWOC4xMTkzNkMxNi4xNjY5IDguNjQyNDUgMTYuNTQ4NSA5LjA0MSAxNy4wNzkzIDkuMDQxQzE3LjYxMDIgOS4wNDEgMTggOC42NTA3NSAxOCA4LjExOTM2VjMuNTExMTZDMTggMi41NTYzMSAxNy40NDQzIDIgMTYuNDkwNCAyTDExLjk1MzMgMkMxMS40MzA4IDIgMTEuMDQxIDIuMzkwMjQgMTEuMDQxIDIuOTIxNjRaTTIgMTEuODgwNkwyIDE2LjQ4ODhDMiAxNy40NDM3IDIuNTU1NzMgMTggMy41MDk1OSAxOEg4LjA0NjY2QzguNTY5MjEgMTggOC45NTkwNSAxNy42MDE1IDguOTU5MDUgMTcuMDc4NEM4Ljk1OTA1IDE2LjU1NTMgOC41Nzc1IDE2LjE2NSA4LjA0NjY2IDE2LjE2NUg3LjQ1Nzc1TDQuODg2NDcgMTYuMzM5NEw2LjkwMjAyIDE0LjQyMTRMOS4yOTA4MiAxMi4wNDY3QzkuNDczMyAxMS44NzIzIDkuNTU2MjUgMTEuNjQ4MiA5LjU1NjI1IDExLjM5OTFDOS41NTYyNSAxMC44MzQ1IDkuMTc0NyAxMC40Mjc2IDguNjEwNjggMTAuNDI3NkM4LjM1MzU1IDEwLjQyNzYgOC4xMjEzMSAxMC41MjcyIDcuOTQ3MTIgMTAuNzA5OUw1LjU2NjYyIDEzLjA5MjlMMy42NTg4OSAxNS4xMTg4TDMuODMzMDcgMTIuNTI4M0wzLjgzMzA3IDExLjg4MDZDMy44MzMwNyAxMS4zNDkyIDMuNDUxNTMgMTAuOTU5IDIuOTIwNjggMTAuOTU5QzIuMzg5ODQgMTAuOTU5IDIgMTEuMzQ5MiAyIDExLjg4MDZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMuZnVsbHNjcmVlbkljb24gPSB7IG9uRGFyazogZ2V0RnVsbHNjcmVlbihjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRGdWxsc2NyZWVuKGNvbG9yX29uTGlnaHQpfVxuXG5cblxuXG5nZXROZXh0ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTQuNzk2NCAxMi43OTMxTDkuNTg2MjcgOEw0Ljc5NjQgMy4yMDY4N0M0LjQwNjAxIDIuODE2MjEgNC40MDYyMiAyLjE4MzA0IDQuNzk2ODggMS43OTI2NUM1LjE4NzU0IDEuNDAyMjYgNS44MjA3IDEuNDAyNDggNi4yMTEwOSAxLjc5MzEzTDExLjcwNzMgNy4yOTMxM0MxMi4wOTc1IDcuNjgzNiAxMi4wOTc1IDguMzE2NCAxMS43MDczIDguNzA2ODdMNi4yMTEwOSAxNC4yMDY5QzUuODIwNyAxNC41OTc1IDUuMTg3NTQgMTQuNTk3NyA0Ljc5Njg4IDE0LjIwNzNDNC40MDYyMiAxMy44MTcgNC40MDYwMSAxMy4xODM4IDQuNzk2NCAxMi43OTMxWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLm5leHRJY29uID0geyBvbkRhcms6IGdldE5leHQoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0TmV4dChjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5nZXRQcmV2ID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTYuNDE3NDggOEwxMS4yMDczIDEyLjc5MzFDMTEuNTk3NyAxMy4xODM4IDExLjU5NzUgMTMuODE3IDExLjIwNjkgMTQuMjA3M0MxMC44MTYyIDE0LjU5NzcgMTAuMTgzIDE0LjU5NzUgOS43OTI2NSAxNC4yMDY5TDQuMjk2NCA4LjcwNjg3QzMuOTA2MiA4LjMxNjQgMy45MDYyIDcuNjgzNiA0LjI5NjQgNy4yOTMxM0w5Ljc5MjY1IDEuNzkzMTNDMTAuMTgzIDEuNDAyNDggMTAuODE2MiAxLjQwMjI2IDExLjIwNjkgMS43OTI2NUMxMS41OTc1IDIuMTgzMDQgMTEuNTk3NyAyLjgxNjIxIDExLjIwNzMgMy4yMDY4N0w2LjQxNzQ4IDhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucHJldkljb24gPSB7IG9uRGFyazogZ2V0UHJldihjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQcmV2KGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFBsYXkgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgdmlld0JveD1cIjAgMCAxODAgMTgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48Y2lyY2xlIG9wYWNpdHk9XCIwLjVcIiBjeD1cIjkwXCIgY3k9XCI5MFwiIHI9XCI5MFwiIGZpbGw9XCIjMDAwXCIvPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTc2LjcxNTggNTguNDkxNEM3My4wNTEzIDU2LjIzNjQgNjguMzMzNCA1OC44NzI5IDY4LjMzMzQgNjMuMTc1NlYxMTYuODI0QzY4LjMzMzQgMTIxLjEyNyA3My4wNTE1IDEyMy43NjMgNzYuNzE2IDEyMS41MDhMMTIzLjk3MiA5NC42ODI2QzEyNy40NjIgOTIuNTM0OSAxMjcuNDYyIDg3LjQ2MTkgMTIzLjk3MiA4NS4zMTQzTDc2LjcxNTggNTguNDkxNFpcIiBmaWxsPVwid2hpdGVcIiBmaWxsLW9wYWNpdHk9XCIwLjhcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGxheUljb24gPSB7IG9uRGFyazogZ2V0UGxheShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQbGF5KGNvbG9yX29uTGlnaHQpIH1cblxuXG5nZXRQYXVzZSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiB2aWV3Qm94PVwiMCAwIDE4MCAxODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxjaXJjbGUgb3BhY2l0eT1cIjAuNVwiIGN4PVwiOTBcIiBjeT1cIjkwXCIgcj1cIjkwXCIgZmlsbD1cIiMwMDBcIi8+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNzAgNTZDNjUuNTgxNyA1NiA2MiA1OS41ODE3IDYyIDY0VjExNkM2MiAxMjAuNDE4IDY1LjU4MTcgMTI0IDcwIDEyNEg3NkM4MC40MTgzIDEyNCA4NCAxMjAuNDE4IDg0IDExNlY2NEM4NCA1OS41ODE3IDgwLjQxODMgNTYgNzYgNTZINzBaTTEwNCA1NkM5OS41ODE3IDU2IDk2IDU5LjU4MTcgOTYgNjRWMTE2Qzk2IDEyMC40MTggOTkuNTgxNyAxMjQgMTA0IDEyNEgxMTBDMTE0LjQxOCAxMjQgMTE4IDEyMC40MTggMTE4IDExNlY2NEMxMTggNTkuNTgxNyAxMTQuNDE4IDU2IDExMCA1NkgxMDRaXCIgZmlsbD1cIndoaXRlXCIgZmlsbC1vcGFjaXR5PVwiMC44XCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBhdXNlSWNvbiA9IHsgb25EYXJrOiBnZXRQYXVzZShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQYXVzZShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuZ2V0VmlkZW9TbGlkZXIgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMzY4XCIgaGVpZ2h0PVwiMTEyXCIgdmlld0JveD1cIjAgMCAzNjggMTEyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cmVjdCBvcGFjaXR5PVwiMC4zXCIgd2lkdGg9XCIzNjhcIiBoZWlnaHQ9XCIxMTJcIiByeD1cIjU2XCIgZmlsbD1cIiMwMDBcIi8+XG48cmVjdCBvcGFjaXR5PVwiMC41XCIgeD1cIjM0XCIgeT1cIjUyXCIgd2lkdGg9XCIzMDBcIiBoZWlnaHQ9XCI4XCIgcng9XCI0XCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnZpZGVvU2xpZGVySWNvbiA9IHsgb25EYXJrOiBnZXRWaWRlb1NsaWRlcihjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRWaWRlb1NsaWRlcihjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5nZXRTaGFyZVByb3RvdHlwZSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiB2aWV3Qm94PVwiMCAwIDE4MCAxODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxyZWN0IG9wYWNpdHk9XCIwLjNcIiB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHJ4PVwiOTBcIiBmaWxsPVwiIzAwMFwiLz5cbjxnIG9wYWNpdHk9XCIwLjZcIj5cbjxwYXRoIGQ9XCJNMTAxLjY3IDU3Ljc1ODZIODAuMTc2MkM3Ni44MzEyIDU3Ljc1ODYgNzQuMDIxNiA2MC4wNTA5IDczLjIzMjUgNjMuMTUwM0M3Mi45ODg1IDY0LjEwODkgNzIuMjA5NSA2NC45MjMzIDcxLjIyMDMgNjQuOTIzM0g2Ny42Mzc5QzY2LjY0ODYgNjQuOTIzMyA2NS44MzQ5IDY0LjExNzQgNjUuOTU3MSA2My4xMzU3QzY2LjgzNyA1Ni4wNjU0IDcyLjg2NzYgNTAuNTkzOCA4MC4xNzYyIDUwLjU5MzhIMTAxLjY3QzEwOS41ODQgNTAuNTkzOCAxMTYgNTcuMDA5NCAxMTYgNjQuOTIzM1YxMTUuMDc3QzExNiAxMjIuOTkxIDEwOS41ODQgMTI5LjQwNiAxMDEuNjcgMTI5LjQwNkg4MC4xNzYyQzcyLjg2NzYgMTI5LjQwNiA2Ni44MzcgMTIzLjkzNSA2NS45NTcxIDExNi44NjRDNjUuODM0OSAxMTUuODgzIDY2LjY0ODYgMTE1LjA3NyA2Ny42Mzc5IDExNS4wNzdINzEuMjIwM0M3Mi4yMDk1IDExNS4wNzcgNzIuOTg4NSAxMTUuODkxIDczLjIzMjUgMTE2Ljg1Qzc0LjAyMTYgMTE5Ljk0OSA3Ni44MzEyIDEyMi4yNDEgODAuMTc2MiAxMjIuMjQxSDEwMS42N0MxMDUuNjI3IDEyMi4yNDEgMTA4LjgzNSAxMTkuMDM0IDEwOC44MzUgMTE1LjA3N1Y2NC45MjMzQzEwOC44MzUgNjAuOTY2MyAxMDUuNjI3IDU3Ljc1ODYgMTAxLjY3IDU3Ljc1ODZaXCIgZmlsbD1cIndoaXRlXCIvPlxuPHBhdGggZD1cIk02OS4yNjQ3IDEwMS44MDVMNzguNjAwNCA5Mi40NjI5SDQ5LjgzNzlDNDguNDc3NyA5Mi40NjI5IDQ3LjM3NSA5MS4zNjAyIDQ3LjM3NSA5MEM0Ny4zNzUgODguNjM5OCA0OC40Nzc3IDg3LjUzNzEgNDkuODM3OSA4Ny41MzcxSDc4LjYwMDRMNjkuMjY0NyA3OC4xOTUxQzY4LjMwMzIgNzcuMjMyOSA2OC4zMDM4IDc1LjY3MzUgNjkuMjY1OSA3NC43MTJDNzAuMjI4IDczLjc1MDUgNzEuNzg3NSA3My43NTExIDcyLjc0OSA3NC43MTMyTDg2LjI4NTYgODguMjU5MUM4Ny4yNDY2IDg5LjIyMDggODcuMjQ2NiA5MC43NzkzIDg2LjI4NTYgOTEuNzQwOUw3Mi43NDkgMTA1LjI4N0M3MS43ODc1IDEwNi4yNDkgNzAuMjI4IDEwNi4yNDkgNjkuMjY1OSAxMDUuMjg4QzY4LjMwMzggMTA0LjMyNyA2OC4zMDMyIDEwMi43NjcgNjkuMjY0NyAxMDEuODA1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvZz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5zaGFyZVByb3RvdHlwZUljb24gPSB7IG9uRGFyazogZ2V0U2hhcmVQcm90b3R5cGUoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0U2hhcmVQcm90b3R5cGUoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuXG5cblxuXG5cblxuIyBQIEwgQSBZIEUgUiDigJQgSSBDIE8gTiBTXG5cbmdldFBsYXllclBsYXkgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiODBcIiBoZWlnaHQ9XCI4MFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yOC4zNDk0IDE4LjU2NjNDMjUuODMyNCAxNy4wMTc1IDIyLjU5MTggMTguODI4MyAyMi41OTE4IDIxLjc4MzdMMjIuNTkxOCA1OC42MzI0QzIyLjU5MTggNjEuNTg3OCAyNS44MzI1IDYzLjM5ODcgMjguMzQ5NSA2MS44NDk3TDYwLjgwNzUgNDMuNDI0NUM2My4yMDQ2IDQxLjk0OTQgNjMuMjA0NSAzOC40NjUgNjAuODA3NCAzNi45ODk5TDI4LjM0OTQgMTguNTY2M1pcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGxheWVyUGxheUljb24gPSB7IG9uRGFyazogZ2V0UGxheWVyUGxheShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQbGF5ZXJQbGF5KGNvbG9yX29uTGlnaHQpIH1cblxuXG5nZXRQbGF5ZXJQYXVzZSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgdmlld0JveD1cIjAgMCA4MCA4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTI2LjMxNTggMTYuNzM2OEMyMy4yOTI4IDE2LjczNjggMjAuODQyMiAxOS4xODc1IDIwLjg0MjIgMjIuMjEwNVY1Ny43ODk0QzIwLjg0MjIgNjAuODEyNSAyMy4yOTI4IDYzLjI2MzEgMjYuMzE1OCA2My4yNjMxSDMwLjQyMTFDMzMuNDQ0MSA2My4yNjMxIDM1Ljg5NDggNjAuODEyNSAzNS44OTQ4IDU3Ljc4OTVWMjIuMjEwNUMzNS44OTQ4IDE5LjE4NzUgMzMuNDQ0MSAxNi43MzY4IDMwLjQyMTEgMTYuNzM2OEgyNi4zMTU4Wk00OS41NzkzIDE2LjczNjhDNDYuNTU2MiAxNi43MzY4IDQ0LjEwNTYgMTkuMTg3NSA0NC4xMDU2IDIyLjIxMDVWNTcuNzg5NEM0NC4xMDU2IDYwLjgxMjUgNDYuNTU2MiA2My4yNjMxIDQ5LjU3OTMgNjMuMjYzMUg1My42ODQ1QzU2LjcwNzYgNjMuMjYzMSA1OS4xNTgyIDYwLjgxMjUgNTkuMTU4MiA1Ny43ODk1VjIyLjIxMDVDNTkuMTU4MiAxOS4xODc1IDU2LjcwNzYgMTYuNzM2OCA1My42ODQ1IDE2LjczNjhINDkuNTc5M1pcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGxheWVyUGF1c2VJY29uID0geyBvbkRhcms6IGdldFBsYXllclBhdXNlKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXllclBhdXNlKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cblxuZ2V0UGxheWVyU291bmQgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiODBcIiBoZWlnaHQ9XCI4MFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNDAgMTVIMzcuNUwyNy41IDI3LjVIMjBDMTguNDU3MyAyNy41IDE3LjY4NiAyNy41IDE2Ljg5MyAyNy43NzM4QzE1Ljk1OTkgMjguMDk2IDE0Ljg2MDEgMjguOTU4MyAxNC4zMjQ2IDI5Ljc4NzVDMTMuODY5NSAzMC40OTIyIDEzLjcyNTkgMzEuMDc2NSAxMy40Mzg4IDMyLjI0NDlDMTIuODE2NyAzNC43NzY5IDEyLjUgMzcuMzgwNSAxMi41IDQwQzEyLjUgNDIuNjE5NSAxMi44MTY3IDQ1LjIyMzEgMTMuNDM4OCA0Ny43NTUxQzEzLjcyNTkgNDguOTIzNSAxMy44Njk1IDQ5LjUwNzggMTQuMzI0NiA1MC4yMTI1QzE0Ljg2MDEgNTEuMDQxNyAxNS45NTk5IDUxLjkwNCAxNi44OTMgNTIuMjI2MkMxNy42ODYgNTIuNSAxOC40NTczIDUyLjUgMjAgNTIuNUgyNy41TDM3LjUgNjVINDBDNDMuMDUgNjUgNDYuMjUgNTUgNDYuMjUgMzkuOTU3M0M0Ni4yNSAyNC45MTQ3IDQzLjE4MzMgMTUgNDAgMTVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPHBhdGggZD1cIk01Mi41IDM5Ljk3NjNDNTIuNDk1IDM3LjM0MjMgNTEuNjU4IDM0Ljc3NzIgNTAuMTA4NiAzMi42NDdMNTQuMTUyMSAyOS43MDU5QzU2LjMyMTMgMzIuNjg4IDU3LjQ5MyAzNi4yNzkyIDU3LjUgMzkuOTY2OEM1Ny41MDcgNDMuNjU0NCA1Ni4zNDg5IDQ3LjI1IDU0LjE5MSA1MC4yNDA0TDUwLjEzNjQgNDcuMzE0NkM1MS42Nzc4IDQ1LjE3ODYgNTIuNTA1IDQyLjYxMDMgNTIuNSAzOS45NzYzWlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjxwYXRoIGQ9XCJNNTguMTk1NSAyNi43NjQ3QzYwLjk4NDUgMzAuNTk4OSA2Mi40OTEgMzUuMjE2MSA2Mi41IDM5Ljk1NzNDNjIuNTA5IDQ0LjY5ODYgNjEuMDIgNDkuMzIxNSA1OC4yNDU2IDUzLjE2NjJMNjIuMzAwMSA1Ni4wOTIxQzY1LjY5MTEgNTEuMzkyOSA2Ny41MTA5IDQ1Ljc0MjcgNjcuNSAzOS45NDc5QzY3LjQ4OSAzNC4xNTMgNjUuNjQ3NyAyOC41MDk3IDYyLjIzODkgMjMuODIzNUw1OC4xOTU1IDI2Ljc2NDdaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXllclNvdW5kSWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5ZXJTb3VuZChjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQbGF5ZXJTb3VuZChjb2xvcl9vbkxpZ2h0KSB9XG5cblxuZ2V0UGxheWVyU291bmRPZmYgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiODBcIiBoZWlnaHQ9XCI4MFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNDUgMTVINDcuNUM1MC42ODMzIDE1IDUzLjYgMjQuNzIyMiA1My42IDQwQzUzLjYgNDEuNzQwNiA1My41NjA0IDQzLjQwOSA1My40ODU4IDQ0Ljk5OTJMMzguMzI2IDIzLjM0MjRMNDUgMTVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPHBhdGggZD1cIk0zMS4yMzYzIDI3LjVIMjcuNUMyNS45NTczIDI3LjUgMjUuMTg2IDI3LjUgMjQuMzkzIDI3Ljc3MzhDMjMuNDU5OSAyOC4wOTYgMjIuMzYwMSAyOC45NTgzIDIxLjgyNDYgMjkuNzg3NUMyMS4zNjk1IDMwLjQ5MjIgMjEuMjI1OSAzMS4wNzY1IDIwLjkzODggMzIuMjQ0OUMyMC4zMTY3IDM0Ljc3NjkgMjAgMzcuMzgwNSAyMCA0MEMyMCA0Mi42MTk1IDIwLjMxNjcgNDUuMjIzMSAyMC45Mzg4IDQ3Ljc1NTFDMjEuMjI1OSA0OC45MjM2IDIxLjM2OTUgNDkuNTA3OCAyMS44MjQ2IDUwLjIxMjVDMjIuMzYwMSA1MS4wNDE3IDIzLjQ1OTkgNTEuOTA0IDI0LjM5MyA1Mi4yMjYyQzI1LjE4NiA1Mi41IDI1Ljk1NzMgNTIuNSAyNy41IDUyLjVIMzVMNDUgNjVINDcuNUM0OS4xNTA3IDY1IDUwLjgwMTQgNjIuMTUyMyA1MS45Njg1IDU3LjExNzVMNTcuNSA2NS4wMTk1SDYzLjc1TDI4Ljc1IDE1LjAxOTVIMjIuNUwzMS4yMzYzIDI3LjVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnBsYXllclNvdW5kT2ZmSWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5ZXJTb3VuZE9mZihjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRQbGF5ZXJTb3VuZE9mZihjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5nZXRPcGVuSWNvbiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI0OFwiIGhlaWdodD1cIjQ4XCIgdmlld0JveD1cIjAgMCA0OCA0OFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0xNC4wODIxIDkuODQzMjhDMTQuMDgyMSAxMC44ODk1IDE0Ljg0NTIgMTEuNjcgMTUuOTA2OSAxMS42N0gxNy4wODQ3TDM2LjIyNzMgMTEuMzIxMkwzMi4xOTYxIDE1LjE1NzJMMTMuNDE4NSAzMy45MDY2QzEzLjA1MzYgMzQuMjU1MyAxMi44ODc3IDM0LjcwMzcgMTIuODg3NyAzNS4xODUzQzEyLjg4NzcgMzYuMzE0NSAxMy42NTA4IDM3LjEyODIgMTQuNzc4OCAzNy4xMjgyQzE1LjI5MzEgMzcuMTI4MiAxNS43NDEgMzYuOTI4OSAxNi4xMDU5IDM2LjU4MDJMMzQuODY3IDE3LjgxNDJMMzguNjgyNCAxMy43NjIzTDM4LjMzNCAzMi45NDM0VjM0LjIzODdDMzguMzM0IDM1LjI4NDkgMzkuMDk3MSAzNi4wODIgNDAuMTU4OCAzNi4wODJDNDEuMjIwNSAzNi4wODIgNDIuMDAwMiAzNS4zMDE1IDQyLjAwMDIgMzQuMjM4N1YxMS4wMjIzQzQyLjAwMDIgOS4xMTI2MSA0MC44ODg3IDggMzguOTgxIDhMMTUuOTA2OSA4QzE0Ljg2MTggOCAxNC4wODIxIDguNzgwNDkgMTQuMDgyMSA5Ljg0MzI4WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5vcGVuSWNvbiA9IHsgb25EYXJrOiBnZXRPcGVuSWNvbihjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRPcGVuSWNvbihjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5cblwiXCJcIjxzdmcgd2lkdGg9XCI0OFwiIGhlaWdodD1cIjQ4XCIgdmlld0JveD1cIjAgMCA0OCA0OFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0zOCAxNUwxNSAzOC40MjQxTDExLjU3NjIgMzVMMzUgMTJIMTRWOEg0MlYzNkgzOFYxNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiIiwiXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuU1ZHQnV0dG9uID0gQnV0dG9ucy5TVkdCdXR0b25cblxuY2xhc3MgZXhwb3J0cy5QbGF5ZXJTbGlkZXIgZXh0ZW5kcyBTbGlkZXJDb21wb25lbnRcblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdEB2aWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInNsaWRlclZpZXdcIlxuXHRcdFx0d2lkdGg6IDI2MCAqIDIsIGhlaWdodDogNTYgKiAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjI1KVwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDE4ICogMlxuXHRcdFxuXHRcdEB2aWV3LmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuXHRcdEB2aWV3LmRyYWdnYWJsZS5zcGVlZFggPSAwXG5cdFx0QHZpZXcuZHJhZ2dhYmxlLnNwZWVkWSA9IDBcblx0XHRAdmlldy5kcmFnZ2FibGUucHJvcGFnYXRlRXZlbnRzID0gZmFsc2VcblxuXG5cblx0XHRAcGxheUJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHZpZXcsIG5hbWU6IFwicGxheUJ1dHRvblwiXG5cdFx0XHR3aWR0aDogNDAgKiAyLCBoZWlnaHQ6IDQwICogMlxuXHRcdFx0eDogMTIgKiAyXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGFzc2V0OiBTVkcucGxheWVyUGF1c2VJY29uXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRAcGxheUJ1dHRvbi5zdGF0ZXMgPVxuXHRcdFx0XCJwbGF5aW5nXCI6IHsgYXNzZXQ6IFNWRy5wbGF5ZXJQYXVzZUljb24gfVxuXHRcdFx0XCJwYXVzZWRcIjogeyBhc3NldDogU1ZHLnBsYXllclBsYXlJY29uIH1cblx0XHRAcGxheUJ1dHRvbi5zdGF0ZVN3aXRjaChcInBsYXlpbmdcIilcblx0XHRcblx0XHRcblxuXHRcdEBzb3VuZEJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHZpZXdcblx0XHRcdHdpZHRoOiA0MCAqIDIsIGhlaWdodDogNDAgKiAyXG5cdFx0XHR4OiAoMTIgKyA0MCArIDgpICogMlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHRhc3NldDogU1ZHLnBsYXllclNvdW5kSWNvblxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0QHNvdW5kQnV0dG9uLnN0YXRlcyA9XG5cdFx0XHRcInNvdW5kXCI6IHsgYXNzZXQ6IFNWRy5wbGF5ZXJTb3VuZEljb24gfVxuXHRcdFx0XCJtdXRlZFwiOiB7IGFzc2V0OiBTVkcucGxheWVyU291bmRPZmZJY29uIH1cblx0XHRAc291bmRCdXR0b24uc3RhdGVTd2l0Y2goXCJtdXRlZFwiKVxuXHRcdFxuXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBwYXJlbnQgPSBAdmlld1xuXHRcdEBuYW1lID0gXCJ2aWRlb1NsaWRlclwiXG5cdFx0XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHRAd2lkdGggPSBAdmlldy53aWR0aCAtICgoMTIgKyA0MCArIDggKyA0MCArIDE2KSArIDIwKSAqIDJcblx0XHRAaGVpZ2h0ID0gNCAqIDJcblx0XHRAeCA9ICgxMiArIDQwICsgOCArIDQwICsgMTYpICogMlxuXHRcdEB5ID0gQWxpZ24uY2VudGVyXG5cdFx0QGtub2JTaXplID0gMjQgKiAyXG5cdFx0XG5cdFx0IyAxMiArIDQwICsgOCArIDQwICsgMTYgKyBmbGV4ICsgMjBcblxuXHRcdEBzbGlkZXJPdmVybGF5LmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjA1KVwiXG5cdFx0IyBAc2xpZGVyT3ZlcmxheS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiXG5cdFx0QHNsaWRlck92ZXJsYXkud2lkdGggPSBAd2lkdGhcblx0XHRAc2xpZGVyT3ZlcmxheS5oZWlnaHQgPSA0ICogMlxuXHRcdEBzbGlkZXJPdmVybGF5LnggPSAwXG5cdFx0QHNsaWRlck92ZXJsYXkueSA9IDBcblx0XHRAc2xpZGVyT3ZlcmxheS5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XG5cdFx0QGZpbGwuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG5cdFx0QGZpbGwub3BhY2l0eSA9IDAuM1xuXHRcdFxuXHRcdEBrbm9iLmJhY2tncm91bmRDb2xvciA9IFwibnVsbFwiXG5cdFx0QGtub2Iub3BhY2l0eSA9IDFcblx0XHRAa25vYi5kcmFnZ2FibGUubW9tZW50dW0gPSBmYWxzZVxuXHRcdEBrbm9iLmRyYWdnYWJsZS5wcm9wYWdhdGVFdmVudHMgPSBmYWxzZVxuXHRcdEBrbm9iLnNoYWRvd0NvbG9yID0gbnVsbFxuXHRcdEBrbm9iLnNoYWRvd1kgPSAwXG5cdFx0XG5cdFx0a25vYkN1cnNvciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAa25vYlxuXHRcdFx0d2lkdGg6IDQgKiAyLCBoZWlnaHQ6IDMyICogMlxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjZGRkXCJcblx0XHRcdGJvcmRlclJhZGl1czogNCAqIDJcblx0XHRcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbiBFdmVudHMuVG91Y2hTdGFydCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdGxheWVyLnZhbHVlID0gVXRpbHMubW9kdWxhdGUoZXZlbnQucG9pbnQueCwgWzAsIEBzbGlkZXJPdmVybGF5LndpZHRoXSwgWzAsIDFdLCB0cnVlKVxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcblx0XG5cdEhvdmVyOiA9PlxuIyBcdFx0QG9wYWNpdHkgPSAxXG5cdEhvdmVyT2ZmOiA9PlxuIyBcdFx0QG9wYWNpdHkgPSAwLjVcblx0XG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0dXBkYXRlRm9yU2NhbGVEb3duOiAoKSAtPlxuXHRcdEB2aWV3LndpZHRoID0gODAwICogMlxuXHRcdEB2aWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRAdmlldy55ID0gQWxpZ24uYm90dG9tKC0zMiAqIDIpXG5cblx0XHRAd2lkdGggPSBAdmlldy53aWR0aCAtICgoMTIgKyA0MCArIDggKyA0MCArIDE2KSArIDIwKSAqIDJcblx0XHRAaGVpZ2h0ID0gNCAqIDJcblxuXHRcdCMgcHJpbnQgQHNsaWRlck92ZXJsYXkud2lkdGhcblx0XHRAc2xpZGVyT3ZlcmxheS53aWR0aCA9IEB3aWR0aFxuXHRcdEBzbGlkZXJPdmVybGF5LmhlaWdodCA9IDQgKiAyXG5cdFx0QHNsaWRlck92ZXJsYXkueCA9IDBcblx0XHRAc2xpZGVyT3ZlcmxheS55ID0gMFxuXHRcdCMgcHJpbnQgQHNsaWRlck92ZXJsYXkud2lkdGhcblxuXHRcdCMgQHBsYXllclNsaWRlci53aWR0aCA9IEB3aWR0aCAtIDMwMCAqIDIgKiAyXG5cdFx0IyBAcGxheWVyU2xpZGVyLnggPSBBbGlnbi5sZWZ0KDMwMCAqIDIpXG5cdFx0IyBAcGxheWVyU2xpZGVyLnkgPSBBbGlnbi5ib3R0b20oLTMyICogMikiLCJcblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbiMgVGV4dCwgQnV0dG9uXG5cbiMgZm9udEF2ZXJpYSA9IFV0aWxzLmxvYWRXZWJGb250KFwiTnVuaXRvXCIsIDgwMClcbiMgZm9udEF2ZXJpYSA9IFV0aWxzLmxvYWRXZWJGb250KFwiUmFsZXdheVwiLCA3MDApXG5mb250QXZlcmlhID0gXCJSYWxld2F5XCJcblxuY2xhc3MgVGV4dCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRmb250RmFtaWx5OiBmb250QXZlcmlhXG5cdFx0XHRmb250U2l6ZTogMThcblx0XHRcdHdlaWdodDogNzAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuNFxuIyBcdFx0XHR0ZXh0T3ZlcmZsb3c6IFwiZWxsaXBzaXNcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc3R5bGUgPVxuXHRcdFx0XCJmb250LWZhbWlseVwiOiBcIlJhbGV3YXksICdQVCBTYW5zJywgJ0hlbHZldGljYScsICdUYWhvbWEnLCBzYW5zLXNlcmlmO1wiXG5cdFx0XHRcImZvbnQtd2VpZ2h0XCI6IDcwMFxuXHRcdFx0XCItd2Via2l0LWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCItbW96LWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCItbXMtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcImZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFxuXG5cblxuXG5cbmNsYXNzIFRleHRCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMC41LCBob3ZlcjogMC44IH1cblx0XHRcdGhhbmRsZXI6IG51bGxcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG5cdFx0QHVwZGF0ZVR1cGxlKEB0dXBsZSlcblx0XG5cdFxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ob3ZlclxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ub3JtYWxcblx0XG5cdHVwZGF0ZVR1cGxlOiAobmV3VHVwbGUpID0+XG5cdFx0QHR1cGxlID0gbmV3VHVwbGVcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdmVyXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3V0XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEBkZWZpbmUgJ3R1cGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnR1cGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy50dXBsZSA9IHZhbHVlXG5cblxuXG5cblxuIyBCdXR0b246IFNWR1xuXG5jbGFzcyBTVkdCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRleHQ6IFwiXCJcblx0XHRcdGFzc2V0OiBudWxsXG5cdFx0XHRjbGlwOiBmYWxzZVxuXHRcdFx0YXV0b1NpemU6IGZhbHNlXG5cdFx0XG5cdFx0QHN2Z1NoYXBlID0gbmV3IFNWR0xheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiLCBuYW1lOiBcInN2Z1NoYXBlXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdmdTaGFwZS5wYXJlbnQgPSBAXG5cdFx0QHVwZGF0ZVNWR1NpemUoKVxuXHRcblx0XG5cdEBkZWZpbmUgJ2Fzc2V0Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5hc3NldCA9IHZhbHVlXG5cdFx0XHRAc3ZnU2hhcGUuc3RhdGVzID1cblx0XHRcdFx0XCJvbkRhcmtcIjogeyBzdmc6IHZhbHVlLm9uRGFyayB9XG5cdFx0XHRcdFwib25MaWdodFwiOiB7IHN2ZzogdmFsdWUub25MaWdodCB9XG5cdFx0XHRAc3ZnU2hhcGUuc3RhdGVTd2l0Y2goXCJvbkRhcmtcIilcblx0XG5cdHVwZGF0ZVNWR1NpemU6ICgpID0+XG5cdFx0QHN2Z1NoYXBlLndpZHRoID0gQHdpZHRoXG5cdFx0QHN2Z1NoYXBlLmhlaWdodCA9IEBoZWlnaHRcblx0XG5cblxuXG5cbiMgQnV0dG9uOiBDb3B5XG5cbmNsYXNzIENvcHlCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XHRoYW5kbGVyOiBAY29weUhhbmRsZXJcblx0XHRcblx0XHRAYXJlYSA9IG5ldyBMYXllclxuXHRcdFx0b3BhY2l0eTogMCwgeDogLTMwMDAsIGh0bWw6IG51bGxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBhcmVhLnBhcmVudCA9IEBcblx0XG5cdFxuXHRAZGVmaW5lICdsaW5rJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuXHRcdFx0QHVwZGF0ZSh2YWx1ZSlcblx0XG5cdFxuXHR1cGRhdGU6IChsaW5rKSA9PlxuXHRcdEBhcmVhLmh0bWwgPSBcIjx0ZXh0YXJlYSBjbGFzcz0nanMtY29weXRleHRhcmVhLWNsYXNzJyBzdHlsZT0nb3BhY2l0eTowOyc+I3tsaW5rfTwvdGV4dGFyZWE+XCJcblx0XG5cdFxuXHRjb3B5SGFuZGxlcjogPT5cblx0XHR0ZXh0RGl2ID0gQGFyZWEucXVlcnlTZWxlY3RvcignLmpzLWNvcHl0ZXh0YXJlYS1jbGFzcycpXG5cdFx0dGV4dERpdi5mb2N1cygpXG5cdFx0dGV4dERpdi5zZWxlY3QoKVxuXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kICdjb3B5J1xuXHRcdFxuXHRcdG9yaWdpblRpdGxlID0gQHRleHRcblx0XHRAdGV4dCA9IFwiRG9uZSDwn5GMXCJcblx0XHRVdGlscy5kZWxheSAxLCA9PiBAdGV4dCA9IG9yaWdpblRpdGxlXG5cblxuXG5cbiMgQnV0dG9uOiBDb3B5XG5cbmNsYXNzIExpbmtCdXR0b24gZXh0ZW5kcyBTVkdCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcblx0XHRcdGJvcmRlcldpZHRoOiAxICogMlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMCAqIDJcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcdFxuXHRcdFxuXHRcdEB0aW50QnV0dG9uRml4ID0gbmV3IExheWVyXG5cdFx0XHRoZWlnaHQ6IDEyMCAqIDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEBidXR0b25UZXh0ID0gbmV3IFRleHRcblx0XHRcdGZvbnRTaXplOiAzMiAqIDJcblx0XHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHRoZWlnaHQ6IDYwICogMlxuXHRcdFxuXHRcdEBidXR0b25JY29uID0gbmV3IFNWR0xheWVyXG5cdFx0XHR3aWR0aDogMjQgKiAyLCBoZWlnaHQ6IDI0ICogMlxuXHRcdFx0c3ZnOiBTVkcub3Blbkljb24ub25MaWdodFxuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAYnV0dG9uVGV4dC50ZXh0ID0gQHRleHRcblx0XHRAdGV4dCA9IFwiXCJcblxuXHRcdEB0aW50QnV0dG9uRml4LnBhcmVudCA9IEBwYXJlbnRcblx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcblx0XHRAdGludEJ1dHRvbkZpeC55ID0gQWxpZ24udG9wXG5cdFx0XG5cdFx0QHBhcmVudCA9IEB0aW50QnV0dG9uRml4XG5cdFx0QHkgPSBBbGlnbi50b3AoMzAgKiAyKVxuXHRcdEBoZWlnaHQgPSA2MCAqIDJcblxuXHRcdEBidXR0b25UZXh0LnBhcmVudCA9IEBcblx0XHRAYnV0dG9uVGV4dC54ID0gMTYgKiAyXG5cdFx0QGJ1dHRvblRleHQueSA9IDkgKiAyXG5cblx0XHRAYnV0dG9uSWNvbi5wYXJlbnQgPSBAXG5cdFx0QGJ1dHRvbkljb24ueCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgMTYgKiAyXG5cdFx0QGJ1dHRvbkljb24ueSA9IEFsaWduLmNlbnRlcigzICogMilcblxuXHRcdEB3aWR0aCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgQGJ1dHRvbkljb24ud2lkdGggKyAxNiAqIDIgKyAxNiAqIDJcblx0XHRAdGludEJ1dHRvbkZpeC53aWR0aCA9IEB3aWR0aCArIDMwICogMiArIDE2ICogMlxuXG5cdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG5cdFx0QHggPSBBbGlnbi5yaWdodCgtMzAgKiAyKVxuXHRcdFxuXHRcblxuXHRAZGVmaW5lICdsaW5rJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGluayA9IHZhbHVlXG5cdFxuXHRzZXRDb2xvcjogKGNvbG9yID0gbnVsbCkgPT5cblx0XHRpZiBjb2xvciA9PSBudWxsIHRoZW4gcmV0dXJuXG5cdFx0QHRpbnRCdXR0b25GaXguYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XG5cblxuXG5cblxuXG5cblxuY2xhc3MgUHJldmlld0J1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEByZW1vdmVBbGxMaXN0ZW5lcnMoKVxuXG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cblx0SG92ZXI6ID0+XG5cdFx0IyBAc2NhbGUgPSAxLjA1XG5cdFx0QG9wYWNpdHkgPSAxLjBcblx0XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdCMgQHNjYWxlID0gMS4wXG5cdFx0QG9wYWNpdHkgPSAwLjhcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtUZXh0LCBUZXh0QnV0dG9uLCBTVkdCdXR0b24sIENvcHlCdXR0b24sIExpbmtCdXR0b24sIFByZXZpZXdCdXR0b259XG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJb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
