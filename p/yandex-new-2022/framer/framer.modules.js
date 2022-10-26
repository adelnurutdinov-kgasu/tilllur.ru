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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QcmVzZW50YXRpb25Db21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZS5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlclBpbmNoLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyR3JpZC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjUuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXI0LmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlcjIuY29mZmVlIiwiLi4vLi4vUHJlc2VudGF0aW9uLVF1ZXVlLzIwMjItMDMtMjAgW3ByZXNlbnRdIDAzIOKAlCBZYW5kZXggTmV3IDIwMjIuZnJhbWVyL21vZHVsZXMvUENTbGlkZXIxLmNvZmZlZSIsIi4uLy4uL1ByZXNlbnRhdGlvbi1RdWV1ZS8yMDIyLTAzLTIwIFtwcmVzZW50XSAwMyDigJQgWWFuZGV4IE5ldyAyMDIyLmZyYW1lci9tb2R1bGVzL1BDU2xpZGVyMC5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NsaWRlQ2hhbmdlci5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1NWRy5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ1BsYXllclNsaWRlci5jb2ZmZWUiLCIuLi8uLi9QcmVzZW50YXRpb24tUXVldWUvMjAyMi0wMy0yMCBbcHJlc2VudF0gMDMg4oCUIFlhbmRleCBOZXcgMjAyMi5mcmFtZXIvbW9kdWxlcy9QQ0J1dHRvbnMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIFByZXZpZXcgQ29tcG9uZW50XG5Bc3NldHMgPSByZXF1aXJlIFwiUHJldmlld0NvbXBvbmVudEFzc2V0c1wiXG5GcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5sb2NhbENvbG9ycyA9XG5cdGJnX2NvbG9yX29uTGlnaHQ6IFwiI2VlZVwiXG5cdGJnX2NvbG9yX29uRGFyazogXCIjMjIyXCJcblx0Y29udGVudF9jb2xvcl9vbkxpZ2h0OiBcIiMwMDBcIlxuXHRjb250ZW50X2NvbG9yX29uRGFyazogXCIjRkZGXCJcblxudGhlbWUgPVxuXHRiZ19jb2xvcjogbG9jYWxDb2xvcnMuYmdfY29sb3Jfb25EYXJrXG5cdGNvbnRlbnRfY29sb3I6IGxvY2FsQ29sb3JzLmNvbnRlbnRfY29sb3Jfb25EYXJrXG5cblxuIyBMb2dvXG5cbmNsYXNzIExvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKGxvY2FsQ29sb3JzLmNvbnRlbnRfY29sb3Jfb25EYXJrKVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cblxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cbiMgUHJldmlld1xuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlldzogbnVsbFxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBcIjIwOjIyXCJcblx0XHRcdG5hbWU6IFwiUHJldmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2Vcblx0XHRcdFxuXHRcdFx0dmlzaWJsZTogdHJ1ZVxuXHRcdFx0dG9wVGhlbWU6IFwiZGFya1wiXG5cdFx0XHRib3R0b21UaGVtZTogXCJkYXJrXCJcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3Zpc2libGUnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd0b3BUaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50b3BUaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50b3BUaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdib3R0b21UaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhciA9IHZhbHVlXG5cdFxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcIm5vcm1hbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJmaWxsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdHN0YXRlU3dpdGNoVG9Ob3JtYWw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFxuXG5cdFxuXHRcblx0XG5cdFxuXHRnZXRMb2NhdGlvbkRhdGE6ICgpID0+XG5cdFx0cXVlcnlBcnJheSA9IGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblxuXHRcdGZvciBpdGVtIGluIHF1ZXJ5QXJyYXlcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcInNjYWxlXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwiZmlsbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHRcdFx0ZWxzZSBpZiB2YWx1ZVBhcnQgPT0gXCJub3JtYWxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvTm9ybWFsKClcblx0XHRcdFxuXHRcblx0XG5cdHVwZGF0ZVNjYWxlU3RhdGU6ICgpID0+XG5cdFx0c2NhbGVYID0gKENhbnZhcy53aWR0aCAtIDExMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoQ2FudmFzLmhlaWdodCAtIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlcy5maWxsLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFxuXHRzZXREZXNrdG9wU2NhbGVNb2RlOiAoZm9yU3RhdGUgPSBcIm5vcm1hbFwiKSA9PlxuXHRcdEB1cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRpbml0U3RhdGUgPSBmb3JTdGF0ZVxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblx0XHRcdFxuXHRcdFx0aWYga2V5UGFydCA9PSBcInNjYWxlXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwiZmlsbFwiIHRoZW4gaW5pdFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdFx0ZWxzZSBpbml0U3RhdGUgPSBcIm5vcm1hbFwiXG5cdFx0XG5cdFx0c2hvdWxkU2hvd0J1dHRvbiA9IHRydWVcblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJidXR0b25cIlxuXHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gXCJvZmZcIiB0aGVuIHNob3VsZFNob3dCdXR0b24gPSBmYWxzZVxuXHRcdFx0XHRlbHNlIGlmIHZhbHVlUGFydCA9PSBcImZhbHNlXCIgdGhlbiBzaG91bGRTaG93QnV0dG9uID0gZmFsc2Vcblx0XHRcblx0XHRzaG91bGRTaG93TG9nbyA9IHRydWVcblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cdFx0XHRcblx0XHRcdGlmIGtleVBhcnQgPT0gXCJsb2dvXCJcblx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IFwib2ZmXCIgdGhlbiBzaG91bGRTaG93TG9nbyA9IGZhbHNlXG5cdFx0XHRcdGVsc2UgaWYgdmFsdWVQYXJ0ID09IFwiZmFsc2VcIiB0aGVuIHNob3VsZFNob3dMb2dvID0gZmFsc2Vcblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRAc3RhdGVTd2l0Y2goaW5pdFN0YXRlKVxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoZm9yU3RhdGUpID0+XG5cdFx0aWYgVXRpbHMuaXNGcmFtZXJTdHVkaW8oKSB0aGVuIHJldHVyblxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5ydVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRpZiBVdGlscy5pc0ZyYW1lclN0dWRpbygpIHRoZW4gcmV0dXJuXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUgPSBuZXcgTGF5ZXJcblx0XHRcdHNpemU6IDQ4LCBib3JkZXJSYWRpdXM6IDQ4XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzIpLCB5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMSlcIlxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0cHJldmlldzogQFxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJ1dHRvblNjYWxlXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0c2l6ZTogMjgsIGJvcmRlclJhZGl1czogMjJcblx0XHRcdHg6IDEwLCB5OiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25TY2FsZS5vblRhcCAtPlxuXHRcdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBuZXh0U3RhdGUgPSBcIm5vcm1hbFwiIGVsc2UgbmV4dFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY2hpbGRyZW5bMF0uc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGN1c3RvbS5wcmV2aWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUgPSAoYnV0dG9uTGF5ZXIpID0+XG5cdFx0XHRsb2NhbEJ1dHRvbiA9IGJ1dHRvbkxheWVyXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueCA9IEFsaWduLnJpZ2h0KC0zMilcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnkgPSBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplKGJ1dHRvblNjYWxlKVxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2Vcblx0XHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRcdEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblx0XG5cdFxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblx0XG5cdFxuXG5cdFxuXHRcblx0dXBkYXRlUHJldmlld09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsUHJldmlldyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XG5cdFxuXHRcblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IHRoZW1lLmJnX2NvbG9yXG5cdFx0QGNyZWF0ZUJhcnMoKVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cdFx0cHJldmlld0NhbnZhcyA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29udGVudF9jb2xvciwgbmFtZTogXCIuaGlkZGVuUHJldmlld0NhbnZhc1wiXG5cdFx0XG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBvcmlnaW5ZID0gMC41XG5cdFx0QG9yaWdpblggPSAwLjVcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpXG5cdFx0XHRcblx0XHRcdGlmIEBzY3JlZW5TaXplKDM3NSwgNzY4KSBvciBAc2NyZWVuU2l6ZSgzOTAsIDc5Nykgb3IgQHNjcmVlblNpemUoNDE0LCA4NTIpIG9yIEBzY3JlZW5TaXplKDQyOCwgODc5KVxuXHRcdFx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRcdGVsc2UgQHNldEN1c3RvbVByZXZpZXcoKVxuXHRcdFxuIyBcdFx0ZWxzZSBpZiBAdmlldy53aWR0aCA9PSAzNjBcblx0XHRcdFxuXHRcdGVsc2UgQHNldEN1c3RvbVByZXZpZXcoKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHNldEN1c3RvbVByZXZpZXc6ICgpID0+XG5cdFx0QHkgPSBBbGlnbi50b3AoLTIwKVxuXHRcdEBvcmlnaW5ZID0gMFxuXHRcdFxuXHRcdHNIID0gKFNjcmVlbi5oZWlnaHQgKyA0MCkgLyBAaGVpZ2h0XG5cdFx0QHNjYWxlID0gTWF0aC5taW4oU2NyZWVuLndpZHRoIC8gQHdpZHRoLCBzSClcblx0XG5cdFxuXHRsb2dTaXplOiAoKSA9PlxuXHRcdG5ldyBUZXh0TGF5ZXIgeyB0ZXh0OiBcIiN7U2NyZWVuLndpZHRofXgje1NjcmVlbi5oZWlnaHR9XCIsIHk6IEFsaWduLmNlbnRlciB9XG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdHRvcEJhciA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0Jhcih0b3BCYXIpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIodG9wQmFyKSBcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcilcblx0XG5cdFxuXHRcblx0XG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6ICh0ZW1wKSA9PlxuXHRcdHRlbXAuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIgbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IHRlbXAsIHdpZHRoOiB0ZW1wLndpZHRoIC0gMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24udG9wKDYpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24uY2VudGVyKDEpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAdG9wVGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24uY2VudGVyKC0xKVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRvcFRoZW1lXVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAdG9wVGhlbWVdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFx0XG5cdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0B0b3BUaGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAdG9wVGhlbWVdXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRob21lSW5kaWNhdG9yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bib3R0b21UaGVtZV0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cdFxuXG4iLCJcbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG4iLCJcbiMge1NsaWRlcjB9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMFwiIFx0IyBTY2FsZSAvIFVSTFxuIyB7U2xpZGVyMX0gPSByZXF1aXJlIFwiUENTbGlkZXIxXCJcdCMgUGFuZWxzXG4jIHtTbGlkZXIyfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjJcIlx0IyBDcmVhdGUgU2xpZGVcbiMge1NsaWRlcjN9ID0gcmVxdWlyZSBcIlBDU2xpZGVyM1wiXHQjIFNob3J0Y3V0c1xuIyB7U2xpZGVyNH0gPSByZXF1aXJlIFwiUENTbGlkZXI0XCJcdCMgQmFja2dyb3VuZCBQYXVzZSBmb3IgVmlkZW9zXG4jIHtTbGlkZXI1fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjVcIlx0IyBQbGF5aW5nIFZpZGVvXG4jIHtTbGlkZXJQaW5jaH0gPSByZXF1aXJlIFwiUENTbGlkZXJQaW5jaFwiXHQjIFBpbmNoXG57U2xpZGVyR3JpZH0gPSByZXF1aXJlIFwiUENTbGlkZXJHcmlkXCJcdCMgUGluY2hcblxuY2xhc3MgRml4UHJlc2VudGF0aW9uRXhwb3J0IGV4dGVuZHMgU2xpZGVyR3JpZFxuIyBjbGFzcyBGaXhQcmVzZW50YXRpb25FeHBvcnQgZXh0ZW5kcyBTbGlkZXJQaW5jaFxuIyBjbGFzcyBGaXhQcmVzZW50YXRpb25FeHBvcnQgZXh0ZW5kcyBTbGlkZXIwXG5jbGFzcyBleHBvcnRzLlByZXNlbnRhdGlvbiBleHRlbmRzIEZpeFByZXNlbnRhdGlvbkV4cG9ydFxuXG5cblx0XG5cblxuXG4jIHNsaWRlciA9IG5ldyBQcmVzZW50YXRpb24gKHRpdGxlOiBcIkRldmVsb3BtZW50XCIpXG5cbiMgSW1hZ2VzXG4jIHNsaWRlci5zbGlkZSgpLnJhbmRvbUNvbG9yKClcbiMgc2xpZGVyLnNsaWRlKFwiaW1hZ2VzL3RpdGxlJTIwb3ZlcmxheS5wbmdcIilcbiMgc2xpZGVyLnNsaWRlKCkucmFuZG9tQ29sb3IoKS5vdmVybGF5KFwiaW1hZ2VzL3RpdGxlJTIwb3ZlcmxheS5wbmdcIilcblxuXG4jIExpbmtcbiMgc2xpZGVyLnNsaWRlKCkubGluayhcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIilcbiMgc2xpZGVyLnNsaWRlKCkubGluayhcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIiwgXCJMaW5rIFRpdGxlXCIpXG4jIHNsaWRlci5zbGlkZSgpLmxpbmsoXCJodHRwczovL3RpbGxsdXIucnUvZC9xeXZ0a2dqdS9pbmRleC5odG1sXCIsIFwiTGluayBUaXRsZVwiLCB0eXBlMSlcblxuXG4jIFZpZGVvIDE0MDB4OTAwIOKAlCBGdWxsc2NyZWVuXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpLm11dGUoZmFsc2UpXG4jIHNsaWRlci5iZ1ZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpLmxvb3AoZmFsc2UpXG5cbiMgVmlkZW8gMTQwMHg5MDAg4oCUIEZ1bGxzY3JlZW4gJiBDb250cm9sc1xuIyBzbGlkZXIuZnVsbFZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG5cbiMgVmlkZW8gMTkyMHgxMDgwIOKAlCBDcm9wICYgQ29udHJvbHNcbiMgc2xpZGVyLnZpZGVvU2xpZGUoXCJodHRwczovL3RpbGxsdXIucnUvbXA0L3lhcnUubXA0XCIpXG5cblxuIyBQcm90b3R5cGVcbiMgc2xpZGVyLnByb3RvdHlwZVNsaWRlKFwiaHR0cHM6Ly90aWxsbHVyLnJ1L2QvcXl2dGtnanUvaW5kZXguaHRtbFwiKS5zaXplZCgpXG4jIHNsaWRlci5wcm90b3R5cGVTbGlkZShcImh0dHBzOi8vdGlsbGx1ci5ydS9kL3F5dnRrZ2p1L2luZGV4Lmh0bWxcIikuc2l6ZWQoMzkwLCA4NDQpXG5cblxuXG5cbiIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuQnV0dG9ucyA9IHJlcXVpcmUoXCJQQ0J1dHRvbnNcIilcblRleHQgPSBCdXR0b25zLlRleHRcblNWR0J1dHRvbiA9IEJ1dHRvbnMuU1ZHQnV0dG9uXG5MaW5rQnV0dG9uID0gQnV0dG9ucy5MaW5rQnV0dG9uXG5cbntQbGF5ZXJTbGlkZXJ9ID0gcmVxdWlyZShcIlBDUGxheWVyU2xpZGVyXCIpXG5cblxuXG4jIFNsaWRlIHdpdGggSW1hZ2VzXG5cbmNsYXNzIFNsaWRlVGVtcGxhdGUgZXh0ZW5kcyBMYXllclxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Z3JpZERhdGE6IG51bGxcblxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFx0d2lkdGg6IDE0MDAgKiAyXG5cdFx0XHRoZWlnaHQ6IDkwMCAqIDJcblx0XHRcdGJvcmRlclJhZGl1czogMTYgKiAyXG5cdFx0XHR0aXRsZTogXCJcIlxuXHRcdFx0aW1hZ2U6IG51bGxcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEB4ID0gKEBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAoQHdpZHRoICsgMTIwKSBcblx0XHRAcGFyZW50LnBhcmVudC51cGRhdGVDb250ZW50KClcblx0XHRAbmFtZSA9IFwic2xpZGUgI3tAcGFyZW50LmNoaWxkcmVuLmxlbmd0aH1cIlxuXHRcblx0XG5cdFxuXHRAZGVmaW5lICd0aXRsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkRGF0YScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ncmlkRGF0YVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ncmlkRGF0YSA9IHZhbHVlXG5cblxuXG5cdHNvdXJjZTogKGltYWdlKSA9PlxuXHRcdEBpbWFnZSA9IGltYWdlXG5cdFx0cmV0dXJuIEBcblx0XG5cdG92ZXJsYXk6IChpbWFnZSkgPT5cblx0XHR0b3BJbWFnZSA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTQwMCAqIDIsIGhlaWdodDogOTAwICogMlxuXHRcdFx0aW1hZ2U6IGltYWdlXG5cdFx0cmV0dXJuIEBcblx0XG5cdHJhbmRvbUNvbG9yOiAoKSA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBVdGlscy5yYW5kb21Db2xvcigpXG5cdFx0cmV0dXJuIEBcblxuXG5cblxuXG4jIFM6IFNsaWRlIHdpdGggTGlua1xuXG4jIGZmbXBlZyAtaSBpbnB1dC5tcDQgLWM6diBsaWJ4MjY0IC1wcm9maWxlOnYgbWFpbiAtdmYgZm9ybWF0PXl1djQyMHAgLWM6YSBhYWMgLW1vdmZsYWdzICtmYXN0c3RhcnQgb3V0cHV0Lm1wNFxuIyBmZm1wZWcgLWkgb3V0cHV0Lm1wNCAtZmlsdGVyOnYgXCJjcm9wPTE2ODA6MTA4MDoxMjA6MFwiIC1jOmEgY29weSBjcm9wLm1wNFxuXG5cbmNsYXNzIFNsaWRlIGV4dGVuZHMgU2xpZGVUZW1wbGF0ZVxuXHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c2hhcmVMaW5rOiBcIlwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cdFxuXHRAZGVmaW5lICdzaGFyZUxpbmsnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hhcmVMaW5rXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNoYXJlTGluayA9IHZhbHVlXG5cdFxuXHRcblx0bGluazogKHVybCA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiLCBidXR0b25UaXRsZSA9IFwiT3BlblwiLCB0eXBlID0gMCkgPT5cblx0XHRAc2hhcmVMaW5rID0gdXJsXG5cblx0XHRAdGludEJ1dHRvbiA9IG5ldyBMaW5rQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEAsIG5hbWU6IFwibGlua0J1dHRvblwiXG5cdFx0XHR0ZXh0OiBidXR0b25UaXRsZVxuXHRcdFx0dXJsOiB1cmxcblx0XHRcdGhhbmRsZXI6IEBvcGVuUHJvdG90eXBlVVJMXG5cdFx0XG5cdFx0aWYgdHlwZSA9PSAwXG5cdFx0XHRAdGludEJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cdFx0XHRAdGludEJ1dHRvbi5ib3JkZXJDb2xvciA9IFwicmdiYSgyNTUsMjU1LDI1NSwwLjMpXCJcblx0XHRlbHNlIGlmIHR5cGUgPT0gMVxuXHRcdFx0QHRpbnRCdXR0b24uYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMjUpXCJcblx0XHRcdEB0aW50QnV0dG9uLmJvcmRlckNvbG9yID0gbnVsbFxuXHRcblx0b3BlblByb3RvdHlwZVVSTDogKCkgPT5cblx0XHRwcmVzZW50YXRpb24gPSBAcGFyZW50LnBhcmVudFxuXHRcdHByZXNlbnRhdGlvbi5vcGVuVVJMKEBzaGFyZUxpbmssIHRydWUpXG5cblxuXG5cblxuXG5cblxuXG5cbiMgUzogVGVtcGxhdGUgKFZpZGVvKVxuIyBPdmVycmlkZSBcInNvdXJjZSgpXCJcblxuY2xhc3MgU2ltcGxlVmlkZW9TbGlkZSBleHRlbmRzIFNsaWRlXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRpdGxlOiBcInNpbXBsZVZpZGVvU2xpZGVcIlxuXHRcdFxuXHRcdEBsb2FkaW5nVGV4dCA9IG5ldyBUZXh0XG5cdFx0XHR3aWR0aDogNDAwLCBoZWlnaHQ6IDcwXG5cdFx0XHRmb250U2l6ZTogNDBcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIlxuXHRcdFx0dGV4dDogXCJObyBVUkxcIlxuXHRcdFx0XG5cdFx0XG5cdFx0QHZpZGVvVmlldyA9IG5ldyBWaWRlb0xheWVyXG5cdFx0XHR3aWR0aDogMTY4MCwgaGVpZ2h0OiAxMDgwXG5cdFx0XHRuYW1lOiBcInZpZGVvVmlld1wiLCBiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgPSB0cnVlXG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIuYXV0b3BsYXkgPSBmYWxzZVxuXHRcdEB2aWRlb1ZpZXcucGxheWVyLmxvb3AgPSB0cnVlXG5cdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdFxuXHRcdEBsb2FkaW5nVGV4dC5wYXJlbnQgPSBAXG5cdFx0QGxvYWRpbmdUZXh0LmNlbnRlcigpXG5cdFx0XG5cdFx0QHZpZGVvVmlldy5wYXJlbnQgPSBAXG5cdFx0QHZpZGVvVmlldy5zY2FsZSA9IEBoZWlnaHQgLyAxMDgwXG5cdFx0QHZpZGVvVmlldy5jZW50ZXIoKVxuXG5cdFxuXHRcblx0IyBAZGVmaW5lICd2aWRlb1VSTCcsXG5cdCMgXHRnZXQ6IC0+IEBvcHRpb25zLnZpZGVvVVJMXG5cdCMgXHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlkZW9VUkwgPSB2YWx1ZVxuXHRcblxuXHQjIG92ZXJyaWRlXG5cdHNvdXJjZTogKHZpZGVvKSA9PlxuXHRcdEB2aWRlb1ZpZXcudmlkZW8gPSB2aWRlb1xuXHRcdEBsb2FkaW5nVGV4dC50ZXh0ID0gXCJMb2FkaW5nXCJcblx0XHRAbmFtZSA9IEBuYW1lICsgXCI6IFwiICsgdmlkZW9cblx0XHRyZXR1cm4gQFxuXG5cblxuXG5cdGxvb3A6ICh2YWx1ZSA9IHRydWUpID0+XG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIubG9vcCA9IHRydWVcblx0XHRyZXR1cm4gQFxuXHRcblx0bXV0ZTogKHZhbHVlID0gdHJ1ZSkgPT5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5tdXRlZCA9IHZhbHVlXG5cdFx0cmV0dXJuIEBcblx0XG5cdHVubXV0ZTogKCkgPT5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5tdXRlZCA9IGZhbHNlXG5cdFx0cmV0dXJuIEBcblxuXG5cblxuXHRpc1BhdXNlZDogKCkgPT5cblx0XHRyZXR1cm4gQHZpZGVvVmlldy5wbGF5ZXIucGF1c2VkXG5cblx0cGxheTogKCkgPT5cblx0XHRpZiAhQGlzUGF1c2VkKCkgdGhlbiByZXR1cm5cblx0XHRAdmlkZW9WaWV3LnBsYXllci5wbGF5KClcblx0XG5cdHBhdXNlOiAoKSA9PlxuXHRcdGlmIEBpc1BhdXNlZCgpIHRoZW4gcmV0dXJuXG5cdFx0QHZpZGVvVmlldy5wbGF5ZXIucGF1c2UoKVxuXHRcblx0dG9nZ2xlUGxheTogKCkgPT5cblx0XHRpZiBAaXNQYXVzZWQoKSB0aGVuIEBwbGF5KClcblx0XHRlbHNlIEBwYXVzZSgpXG5cdFxuXG5cbiMgXHRsb2FkVmlkZW86ICh3ZWJVUkwpID0+XG4jIFx0XHRAdmlkZW9WaWV3LnBsYXllci5tdXRlZCA9IHRydWVcbiMgXHRcdEB2aWRlb1ZpZXcucGxheWVyLmF1dG9wbGF5ID0gdHJ1ZVxuIyBcdFx0QHZpZGVvVmlldy52aWRlbyA9IEB2aWRlb1VSTFxuIyBcdFx0VXRpbHMuZGVsYXkgMTAsID0+XG4jIFx0XHRAdmlkZW9WaWV3LnBsYXllci5wbGF5KClcblx0XHRcblx0XHRcbiMgXHRcdHByaW50IEB2aWRlb1ZpZXcucGxheWVyLnJlYWR5U3RhdGVcbiMgXHRcdFV0aWxzLmRlbGF5IDEwLCA9PlxuIyBcdFx0XHRwcmludCBAdmlkZW9WaWV3LnBsYXllci5yZWFkeVN0YXRlXG5cblxuXG5cblxuIyBTOiBTbGlkZSAoVmlkZW8pXG5cbmNsYXNzIFZpZGVvU2xpZGUgZXh0ZW5kcyBTaW1wbGVWaWRlb1NsaWRlXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdCMgUHJvZ3Jlc3Ncblx0XHRAcGxheWVyU2xpZGVyID0gbmV3IFBsYXllclNsaWRlclxuXHRcdEBwbGF5ZXJTbGlkZXIucGFyZW50LnBhcmVudCA9IEBcblxuXHRcdEBwbGF5ZXJTbGlkZXIucGFyZW50LnggPSBBbGlnbi5sZWZ0KDk4KjIpXG5cdFx0QHBsYXllclNsaWRlci5wYXJlbnQueSA9IEFsaWduLmJvdHRvbSgtNjAgKiAyKVxuXG5cdFx0IyBwcmludCBAcGxheWVyU2xpZGVyLnBhcmVudFxuXHRcdCMgcHJpbnQgQHBsYXllclNsaWRlci5wbGF5QnV0dG9uXG5cblxuXHRcdEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvbi5vbiBFdmVudHMuVGFwLCAoZXZlbnQsIGxheWVyKSAtPlx0XHRcdFxuXHRcdFx0c2xpZGUgPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uID0gc2xpZGUucGFyZW50LnBhcmVudFxuXHRcdFx0XG5cdFx0XHRzbGlkZS50b2dnbGVQbGF5KClcblx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVEcmFnID0gZmFsc2VcblxuXG5cblxuXHRcdEBwbGF5ZXJTbGlkZXIub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHQjIHByaW50IFwiVG91Y2ggU3RhcnRcIlxuXHRcdFx0c2xpZGUgPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uID0gc2xpZGUucGFyZW50LnBhcmVudFxuXHRcdFx0XG5cdFx0XHRzbGlkZS5wYXVzZSgpXG5cdFx0XHRwcmVzZW50YXRpb24uYWN0aXZlRHJhZyA9IHRydWVcblx0XHRcblx0XHRcblxuXHRcdEBwbGF5ZXJTbGlkZXIub24gXCJjaGFuZ2U6dmFsdWVcIiwgLT5cblx0XHRcdHNsaWRlID0gQHBhcmVudC5wYXJlbnRcblx0XHRcdHByZXNlbnRhdGlvbiA9IHNsaWRlLnBhcmVudC5wYXJlbnRcblx0XHRcdFxuXHRcdFx0aWYgcHJlc2VudGF0aW9uLmFjdGl2ZURyYWdcblx0XHRcdFx0c2xpZGUudmlkZW9WaWV3LnBsYXllci5jdXJyZW50VGltZSA9IFV0aWxzLm1vZHVsYXRlKEB2YWx1ZSwgWzAsIDFdLCBbMCwgc2xpZGUudmlkZW9WaWV3LnBsYXllci5kdXJhdGlvbl0sIHRydWUpXG5cdFx0XG5cdFx0XG5cblx0XHRAcGxheWVyU2xpZGVyLnNvdW5kQnV0dG9uLm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0XHRzbGlkZSA9IEBwYXJlbnQucGFyZW50XG5cdFx0XHRwcmVzZW50YXRpb24gPSBzbGlkZS5wYXJlbnQucGFyZW50XG5cdFx0XHRcblx0XHRcdGlmIHNsaWRlLnZpZGVvVmlldy5wbGF5ZXIubXV0ZWQgdGhlbiBzbGlkZS51bm11dGUoKVxuXHRcdFx0ZWxzZSBzbGlkZS5tdXRlKClcblx0XHRcblxuXHRcdFxuXG5cdFx0XG5cdFx0RXZlbnRzLndyYXAoQHZpZGVvVmlldy5wbGF5ZXIpLm9uIFwicGF1c2VcIiwgPT5cblx0XHRcdCMgcHJpbnQgXCIhIG5leHQgcGF1c2VcIlxuXHRcdFx0QHBhdXNlKClcblx0XHRcdEBwbGF5ZXJTbGlkZXIucGxheUJ1dHRvbi5zdGF0ZVN3aXRjaChcInBhdXNlZFwiKVxuXHRcdFx0XG5cdFx0XHRwcmVzZW50YXRpb24gPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0aWYgQHZpZGVvVmlldy5wbGF5ZXIgPT0gcHJlc2VudGF0aW9uLmFjdGl2ZVZpZGVvUGxheWVyXG5cdFx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVQbGF5aW5nID0gZmFsc2Vcblx0XHRcblx0XHRcblx0XHRFdmVudHMud3JhcChAdmlkZW9WaWV3LnBsYXllcikub24gXCJwbGF5XCIsID0+XG5cdFx0XHQjIHByaW50IFwiISBuZXh0IHBsYXlcIlxuXHRcdFx0QHBsYXkoKVxuXHRcdFx0QHBsYXllclNsaWRlci5wbGF5QnV0dG9uLnN0YXRlU3dpdGNoKFwicGxheWluZ1wiKVxuXHRcdFx0XG5cdFx0XHRwcmVzZW50YXRpb24gPSBAcGFyZW50LnBhcmVudFxuXHRcdFx0cHJlc2VudGF0aW9uLmFjdGl2ZURyYWcgPSBmYWxzZVxuXHRcdFx0aWYgQHZpZGVvVmlldy5wbGF5ZXIgPT0gcHJlc2VudGF0aW9uLmFjdGl2ZVZpZGVvUGxheWVyXG5cdFx0XHRcdHByZXNlbnRhdGlvbi5hY3RpdmVQbGF5aW5nID0gdHJ1ZVxuXHRcdFxuXHRcdFxuXHRcdEV2ZW50cy53cmFwKEB2aWRlb1ZpZXcucGxheWVyKS5vbiBcInZvbHVtZWNoYW5nZVwiLCA9PlxuXHRcdFx0aWYgQHZpZGVvVmlldy5wbGF5ZXIubXV0ZWRcblx0XHRcdFx0QHBsYXllclNsaWRlci5zb3VuZEJ1dHRvbi5zdGF0ZVN3aXRjaChcIm11dGVkXCIpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBwbGF5ZXJTbGlkZXIuc291bmRCdXR0b24uc3RhdGVTd2l0Y2goXCJzb3VuZFwiKVxuXG5cdFx0XHRcdFxuXHRcdFxuY2xhc3MgSERWaWRlb1NsaWRlIGV4dGVuZHMgVmlkZW9TbGlkZVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHZpZGVvVmlldy53aWR0aCA9IDE5MjBcblx0XHRAdmlkZW9WaWV3LmhlaWdodCA9IDEwODBcblx0XHRAdmlkZW9WaWV3LnggPSA0NDBcblx0XHRAdmlkZW9WaWV3LnkgPSAyODZcblxuXHRcdEB2aWRlb1ZpZXcuYm9yZGVyUmFkaXVzID0gOCAqIDJcblx0XHRAdmlkZW9WaWV3LmNsaXAgPSB0cnVlXG5cblxuXHRcdEB2aWRlb1ZpZXcub3JpZ2luWCA9IDAuNVxuXHRcdEB2aWRlb1ZpZXcub3JpZ2luWSA9IDAuNVxuXG5cdFx0QHZpZGVvVmlldy5zY2FsZSA9IDEuMzY2NlxuXG5cblx0XHRAcGxheWVyU2xpZGVyLnVwZGF0ZUZvclNjYWxlRG93bigpXG5cblxuXHRcdFx0XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIFM6IFNsaWRlIChQcm90b3R5cGUpXG5cbmNsYXNzIFByb3RvdHlwZVNsaWRlIGV4dGVuZHMgU2xpZGVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRAcHJvdG90eXBlVmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJwcm90b3R5cGVcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRjbGlwOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAcHJvdG90eXBlVmlldy5wYXJlbnQgPSBAXG5cdFx0QHNpemVkKClcblx0XG5cdFxuXHRcblx0XG5cdEBkZWZpbmUgJ3BXaWR0aCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wV2lkdGhcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucFdpZHRoID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3BIZWlnaHQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucEhlaWdodFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wSGVpZ2h0ID0gdmFsdWVcblx0XG5cdFxuXHRcblx0XG5cdHNjYWxlZDogKHZhbHVlKSA9PlxuXHRcdEBwcm90b3R5cGVWaWV3LnNjYWxlID0gdmFsdWVcblx0XHRyZXR1cm4gQFxuXHRcblx0Ym9yZGVyZWQ6ICh2YWx1ZSkgPT5cblx0XHRAcHJvdG90eXBlVmlldy5ib3JkZXJSYWRpdXMgPSB2YWx1ZVxuXHRcdHJldHVybiBAXG5cdFxuXHRzaXplZDogKHdpZHRoID0gMzc1LCBoZWlnaHQgPSA4MTIpID0+XG5cdFx0QHByb3RvdHlwZVZpZXcud2lkdGggPSB3aWR0aFxuXHRcdEBwcm90b3R5cGVWaWV3LmhlaWdodCA9IGhlaWdodFxuXHRcdEBwcm90b3R5cGVWaWV3LmNlbnRlcigpXG5cblx0XHRpZiB3aWR0aCA9PSAzNzUgYW5kIGhlaWdodCA9PSA4MTIgdGhlbiBAc2NhbGVkKDIuMClcblx0XHRlbHNlIGlmIHdpZHRoID09IDM5MCBhbmQgaGVpZ2h0ID09IDg0NCB0aGVuIEBzY2FsZWQoMS45MjMpXG5cdFx0ZWxzZSBAc2NhbGVkKDIuMClcblxuXHRcdHJldHVybiBAXG5cdFxuXHRcblx0XG5cdCMgb3ZlcnJpZGVcblx0c291cmNlOiAob3JpZ2luVVJMKSA9PlxuXHRcdHVybCA9IG9yaWdpblVSTCArIFwiP2xvZ289b2ZmJmJ1dHRvbj1vZmZcIlxuXHRcdFxuXHRcdGNvbnRlbnRWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBwcm90b3R5cGVWaWV3XG5cdFx0XHR3aWR0aDogQHByb3RvdHlwZVZpZXcud2lkdGgsIGhlaWdodDogQHByb3RvdHlwZVZpZXcuaGVpZ2h0LCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGh0bWw6IFwiPGlmcmFtZSBzdHlsZT0ncG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOycgc3JjPScje3VybH0nPjwvaWZyYW1lPlwiXG5cdFx0XHRpZ25vcmVFdmVudHM6IGZhbHNlLCBjbGlwOiB0cnVlXG5cdFx0XG5cdFx0cmV0dXJuIEBcblx0XG5cdFxuXHRcblx0Y3JlYXRlV2ViVmlldzogKHdlYlVSTCkgPT5cblx0XHRcblx0XHR2aWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodFxuXHRcdFx0bmFtZTogXCJ3ZWJ2aWV3XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbCwgYm9yZGVyUmFkaXVzOiBAaW1hZ2VSYWRpdXNcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcblx0XHRjb250ZW50VmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB2aWV3XG5cdFx0XHR3aWR0aDogQGltYWdlU2l6ZS53aWR0aCwgaGVpZ2h0OiBAaW1hZ2VTaXplLmhlaWdodCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRodG1sOiBcIjxpZnJhbWUgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsnIHNyYz0nI3t3ZWJVUkx9Jz48L2lmcmFtZT5cIlxuXHRcdFx0aWdub3JlRXZlbnRzOiBmYWxzZSwgY2xpcDogdHJ1ZVxuXHRcdFxuXHRcdHJldHVybiB2aWV3XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtTbGlkZSwgU2ltcGxlVmlkZW9TbGlkZSwgVmlkZW9TbGlkZSwgSERWaWRlb1NsaWRlLCBQcm90b3R5cGVTbGlkZX0iLCJcbntTbGlkZXI1fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjVcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuVGV4dEJ1dHRvbiA9IEJ1dHRvbnMuVGV4dEJ1dHRvblxuXG5cbiMgUGFuZWxzXG5cbiMgcHJpbnQgXCI/XCJcbmNsYXNzIGV4cG9ydHMuU2xpZGVyUGluY2ggZXh0ZW5kcyBTbGlkZXI1XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bGFzdFNsaWRlU2VsZWN0ZWRJbmRleDogMFxuXHRcdFx0Z3JpZEJ1dHRvbnM6IFtdXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBvbiBFdmVudHMuU3RhdGVTd2l0Y2hFbmQsIChmcm9tLCB0bykgLT5cblx0XHRcdGlmIGZyb20gIT0gdG9cblx0XHRcdFx0aWYgdG8gPT0gXCJwcmVzZW50XCJcblx0XHRcdFx0XHRuZXh0T3BhY2l0eVZhbHVlID0gMVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0bmV4dE9wYWNpdHlWYWx1ZSA9IDBcblx0XHRcdFx0XG5cdFx0XHRcdEBib3R0b21WaWV3LmFuaW1hdGUob3BhY2l0eTogbmV4dE9wYWNpdHlWYWx1ZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblxuXHRcdFx0XHRcblx0XHRcblx0XG5cdEBkZWZpbmUgJ2xhc3RTbGlkZVNlbGVjdGVkSW5kZXgnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMubGFzdFNsaWRlU2VsZWN0ZWRJbmRleFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5sYXN0U2xpZGVTZWxlY3RlZEluZGV4ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3BpbmNoQnV0dG9ucycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5waW5jaEJ1dHRvbnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucGluY2hCdXR0b25zID0gdmFsdWVcblx0XHRcblx0XG5cdFxuXG5cdGdyaWRTaXplOiAoKSA9PlxuXHRcdHJldHVybiAzXG5cblx0Z2V0R3JpZEdhcDogKCkgPT5cblx0XHRyZXR1cm4gMjBcblxuXHRnZXRHcmlkU2NhbGU6ICgpID0+XG5cdFx0d3MgPSAoQHdpZHRoIC0gQGdldEdyaWRHYXAoKSAqIChAZ3JpZFNpemUoKSAtIDEpKSAvIEBncmlkU2l6ZSgpXG5cdFx0cmV0dXJuIHdzIC8gQHdpZHRoXG5cblxuXG5cdHBpbmNoVG9HcmlkOiAoKSA9PlxuXG5cdFx0aWYgQGlzR3JpZCgpXG5cdFx0XHRAcGluY2hUb1NsaWRlKEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4KVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAc3RhdGVTd2l0Y2goXCJncmlkXCIpXG5cdFx0QHNob3dHcmlkQ2FuY2VsQnV0dG9uKClcblxuXHRcdHNjYWxlSW5kZXggPSBAZ2V0R3JpZFNjYWxlKClcblxuXHRcdEBpZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0QGNvbnRlbnQuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXG5cdFx0IyBAc2Nyb2xsVmVydGljYWwgPSB0cnVlXG5cdFx0IyBAY29udGVudC5zY3JvbGxWZXJ0aWNhbCA9IGZhbHNlXG5cdFx0QHNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXHRcdCMgQGNvbnRlbnQuc2Nyb2xsSG9yaXpvbnRhbCA9IGZhbHNlXG5cblxuXG5cdFx0Zm9yIHNsaWRlLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0c2xpZGUuZ3JpZERhdGEgPVxuXHRcdFx0XHR4OiAoaW5kZXggJSBAZ3JpZFNpemUoKSAtIDEpICogKHNsaWRlLndpZHRoICogc2NhbGVJbmRleCArIEBnZXRHcmlkR2FwKCkpXG5cdFx0XHRcdHk6ICgoaW5kZXggLSBpbmRleCAlIEBncmlkU2l6ZSgpKSAvIEBncmlkU2l6ZSgpIC0gMSkgKiAoc2xpZGUuaGVpZ2h0ICogc2NhbGVJbmRleCArIEBnZXRHcmlkR2FwKCkpICsgQGdldEdyaWRHYXAoKVxuXHRcdFx0XHRzY2FsZTogc2NhbGVJbmRleFxuXG5cblxuXG5cdFx0QGdyaWQuc2Nyb2xsVG9Qb2ludCh7eDogMCwgeTogQGNvbnRlbnQuY2hpbGRyZW5bQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhdLmdyaWREYXRhLnkgfSwgZmFsc2UpXG5cdFx0c2VsZWN0ZWRTbGlkZURlbHRhWSA9IEBncmlkLnNjcm9sbFlcblx0XHRAc25hcFRvUGFnZShAY29udGVudC5jaGlsZHJlblswXSwgZmFsc2UpXG5cblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNvbnRlbnQuY2xpcCA9IGZhbHNlXG5cblx0XHRAZ3JpZC5zY3JvbGxWZXJ0aWNhbCA9IHRydWVcblx0XHRAZ3JpZC5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblxuXHRcdGRlbHRhUm93TnVtYmVyID0gKChAY29udGVudC5jaGlsZHJlbi5sZW5ndGggLSAoQGNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoICUgQGdyaWRTaXplKCkpKSAvIEBncmlkU2l6ZSgpICsgMSlcblx0XHRAaGVpZ2h0ID0gZGVsdGFSb3dOdW1iZXIgKiAoQGdyaWQuaGVpZ2h0IC8gMykgKyAoZGVsdGFSb3dOdW1iZXIgKyAxKSAqIChAZ3JpZFNpemUoKSAvIHNjYWxlSW5kZXgpXG5cblxuXHRcdFxuXHRcdFxuXHRcdGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGlmIGluZGV4ID09IEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4XG5cblx0XHRcdFx0c2xpZGUuYnJpbmdUb0Zyb250KClcblx0XHRcdFx0c2xpZGUueCA9IDBcblx0XHRcdFx0c2xpZGUueSA9IHNlbGVjdGVkU2xpZGVEZWx0YVlcblxuXHRcdFx0XHRncmlkRG93bnNjYWxlQW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbiBzbGlkZSxcblx0XHRcdFx0XHR4OiBzbGlkZS5ncmlkRGF0YS54XG5cdFx0XHRcdFx0eTogc2xpZGUuZ3JpZERhdGEueVxuXHRcdFx0XHRcdHNjYWxlOiBzbGlkZS5ncmlkRGF0YS5zY2FsZVxuXHRcdFx0XHRcdG9wdGlvbnM6XG5cdFx0XHRcdFx0XHRjdXJ2ZTogQmV6aWVyKDAuMjUsIDAuMSwgMC4yNSwgMSlcblx0XHRcdFx0XHRcdHRpbWU6IDAuM1xuXHRcdFx0XHRcblx0XHRcdFx0Z3JpZERvd25zY2FsZUFuaW1hdGlvbi5zdGFydCgpXG5cblx0XHRcdFx0Z3JpZERvd25zY2FsZUFuaW1hdGlvbi5vbiBFdmVudHMuQW5pbWF0aW9uRW5kLCAoYW5pbWF0aW9uKSAtPlxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsID0gQGxheWVyLnBhcmVudC5wYXJlbnRcblx0XHRcdFx0XHRsb2NhbEdyaWRCdXR0b25zID0gW11cblxuXHRcdFx0XHRcdGZvciBzbGlkZSwgaW5kZXggaW4gbG9jYWxTY3JvbGwuY29udGVudC5jaGlsZHJlblxuXHRcdFx0XHRcdFx0IyBwcmludCBsb2NhbFNsaWRlXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdGdyaWRCYWNrSGFuZGVyID0gKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdFx0XHRcdFx0bG9jYWxTY3JvbGwgPSBAcGFyZW50LnBhcmVudC5wYXJlbnRcblx0XHRcdFx0XHRcdFx0bG9jYWxTY3JvbGwubGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IEBjdXN0b20uc2xpZGVJbmRleFxuXHRcdFx0XHRcdFx0XHRsb2NhbFNjcm9sbC5waW5jaFRvU2xpZGUoKVxuXG5cdFx0XHRcdFx0XHRncmlkQmFja0J1dHRvbiA9IG5ldyBUZXh0QnV0dG9uXG5cdFx0XHRcdFx0XHRcdHBhcmVudDogc2xpZGVcblx0XHRcdFx0XHRcdFx0d2lkdGg6IHNsaWRlLndpZHRoLCBoZWlnaHQ6IHNsaWRlLmhlaWdodFxuXHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0XHRcdFx0XHR0ZXh0OiBcIlwiXG5cdFx0XHRcdFx0XHRcdGhhbmRsZXI6IGdyaWRCYWNrSGFuZGVyXG5cdFx0XHRcdFx0XHRcdGN1c3RvbTpcblx0XHRcdFx0XHRcdFx0XHRzbGlkZUluZGV4OiBpbmRleFxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRsb2NhbEdyaWRCdXR0b25zLnB1c2ggZ3JpZEJhY2tCdXR0b25cblxuXHRcdFx0XHRcdFx0IyBncmlkQmFja0J1dHRvbi5vblRhcCAtPlxuXHRcdFx0XHRcdFx0IyBcdGxvY2FsU2Nyb2xsID0gQHBhcmVudC5wYXJlbnQucGFyZW50XG5cdFx0XHRcdFx0XHQjIFx0bG9jYWxTY3JvbGwubGFzdFNsaWRlU2VsZWN0ZWRJbmRleCA9IEBjdXN0b20uc2xpZGVJbmRleFxuXHRcdFx0XHRcdFx0IyBcdGxvY2FsU2Nyb2xsLnBpbmNoVG9TbGlkZSgpXG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuZ3JpZEJ1dHRvbnMgPSBsb2NhbEdyaWRCdXR0b25zXG5cblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzbGlkZS54ID0gc2xpZGUuZ3JpZERhdGEueFxuXHRcdFx0XHRzbGlkZS55ID0gc2xpZGUuZ3JpZERhdGEueVxuXHRcdFx0XHRzbGlkZS5zY2FsZSA9IHNsaWRlLmdyaWREYXRhLnNjYWxlXG5cblxuXG5cdFx0XG5cdFx0XG5cdFx0QHVwZGF0ZUNvbnRlbnQoKVxuXHRcdEBncmlkLnVwZGF0ZUNvbnRlbnQoKVxuXG5cblxuXHRcblxuXG5cblx0cGluY2hUb1NsaWRlOiAoKSA9PlxuXHRcdFxuXHRcdEBzdGF0ZVN3aXRjaChcInByZXNlbnRcIilcblxuXHRcdGZvciBpdGVtIGluIEBncmlkQnV0dG9uc1xuXHRcdFx0aXRlbS5kZXN0cm95KClcblxuXHRcdEBpZ25vcmVFdmVudHMgPSBmYWxzZVxuXHRcdEBjb250ZW50Lmlnbm9yZUV2ZW50cyA9IGZhbHNlXG5cblx0XHQjIEBzY3JvbGxWZXJ0aWNhbCA9IGZhbHNlXG5cdFx0IyBAY29udGVudC5zY3JvbGxWZXJ0aWNhbCA9IHRydWVcblx0XHRAc2Nyb2xsSG9yaXpvbnRhbCA9IHRydWVcblx0XHQjIEBjb250ZW50LnNjcm9sbEhvcml6b250YWwgPSB0cnVlXG5cblx0XHRAY2xpcCA9IHRydWVcblx0XHRAY29udGVudC5jbGlwID0gdHJ1ZVxuXHRcdCMgQGJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXHRcdEBncmlkLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHQjIEBncmlkLmNvbnRlbnQuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXG5cdFx0QGdyaWQuc2Nyb2xsVmVydGljYWwgPSBmYWxzZVxuXHRcdEBncmlkLm1vdXNlV2hlZWxFbmFibGVkID0gZmFsc2VcblxuXHRcdEBoZWlnaHQgPSBAZ3JpZC5oZWlnaHRcblx0XHRAZ3JpZC5zY3JvbGxUb1RvcChmYWxzZSlcblxuXG5cdFx0Zm9yIHNsaWRlLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0c2xpZGUuZ3JpZERhdGEgPVxuXHRcdFx0XHR4OiAoc2xpZGUud2lkdGggKyAxMjApICogaW5kZXhcblx0XHRcdFx0eTogMFxuXHRcdFx0XHRzY2FsZTogMVxuXG5cdFx0Zm9yIHNsaWRlLCBpbmRleCBpbiBAY29udGVudC5jaGlsZHJlblxuXHRcdFx0c2xpZGUueCA9IHNsaWRlLmdyaWREYXRhLnhcblx0XHRcdHNsaWRlLnkgPSBzbGlkZS5ncmlkRGF0YS55XG5cdFx0XHRzbGlkZS5zY2FsZSA9IHNsaWRlLmdyaWREYXRhLnNjYWxlXG5cblx0XHQjIGZvciBzbGlkZSwgaW5kZXggaW4gQGNvbnRlbnQuY2hpbGRyZW5cblx0XHQjIFx0aWYgaW5kZXggPT0gQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhcblx0XHQjIFx0XHRzbGlkZS5icmluZ1RvRnJvbnQoKVxuXG5cdFx0IyBcdFx0Z3JpZFVwc2NhbGVBbmltYXRpb24gPSBuZXcgQW5pbWF0aW9uIHNsaWRlLFxuXHRcdCMgXHRcdFx0eDogc2xpZGUuZ3JpZERhdGEueFxuXHRcdCMgXHRcdFx0eTogc2xpZGUuZ3JpZERhdGEueVxuXHRcdCMgXHRcdFx0c2NhbGU6IHNsaWRlLmdyaWREYXRhLnNjYWxlXG5cdFx0IyBcdFx0XHRvcHRpb25zOlxuXHRcdCMgXHRcdFx0XHRjdXJ2ZTogQmV6aWVyKDAuMjUsIDAuMSwgMC4yNSwgMSlcblx0XHQjIFx0XHRcdFx0dGltZTogMC4zXG5cdFx0XHRcdFxuXHRcdCMgXHRcdGdyaWRVcHNjYWxlQW5pbWF0aW9uLnN0YXJ0KClcblxuXHRcdCMgXHRcdGdyaWRVcHNjYWxlQW5pbWF0aW9uLm9uIEV2ZW50cy5BbmltYXRpb25FbmQsIChhbmltYXRpb24pIC0+XG5cdFx0IyBcdFx0XHRsb2NhbFNjcm9sbCA9IEBsYXllci5wYXJlbnQucGFyZW50XG5cblx0XHQjIFx0XHRcdGZvciBzbGlkZSwgaW5kZXggaW4gbG9jYWxTY3JvbGwuY29udGVudC5jaGlsZHJlblxuXHRcdCMgXHRcdFx0XHRzbGlkZS54ID0gc2xpZGUuZ3JpZERhdGEueFxuXHRcdCMgXHRcdFx0XHRzbGlkZS55ID0gc2xpZGUuZ3JpZERhdGEueVxuXHRcdCMgXHRcdFx0XHRzbGlkZS5zY2FsZSA9IHNsaWRlLmdyaWREYXRhLnNjYWxlXG5cdFx0IyBcdFx0XHRcdCMgc2xpZGUub3BhY2l0eSA9IDFcblxuXHRcdCMgXHQjIGVsc2Vcblx0XHQjIFx0XHQjIHNsaWRlLm9wYWNpdHkgPSAwLjVcblxuXG5cdFx0XG5cdFx0QHVwZGF0ZUNvbnRlbnQoKVxuXHRcdEBzbmFwVG9QYWdlKEBjb250ZW50LmNoaWxkcmVuW0BsYXN0U2xpZGVTZWxlY3RlZEluZGV4XSwgZmFsc2UpXG5cblx0XHRAdXBkYXRlQ3VycmVudFBhZ2UoKVxuXG5cblxuXHRcdFxuXHRcdCIsIlxue1NsaWRlcjV9ID0gcmVxdWlyZSBcIlBDU2xpZGVyNVwiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG5UZXh0QnV0dG9uID0gQnV0dG9ucy5UZXh0QnV0dG9uXG5QcmV2aWV3QnV0dG9uID0gQnV0dG9ucy5QcmV2aWV3QnV0dG9uXG5cblxuIyBQYW5lbHNcblxuIyBwcmludCBcIj9cIlxuY2xhc3MgZXhwb3J0cy5TbGlkZXJHcmlkIGV4dGVuZHMgU2xpZGVyNVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Z3JpZDIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHRuYW1lOiBcImdyaWQyXCJcblx0XHRcdHdpZHRoOiAxNDAwICogMiwgaGVpZ2h0OiA5MDAgKiAyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZSwgc2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0IyBpZ25vcmVFdmVudHM6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjAwMFwiXG5cdFx0XG5cdFx0Z3JpZDIuc3RhdGVzID1cblx0XHRcdFwic2hvd25cIjogeyBvcGFjaXR5OiAxLCB5OiBTY3JlZW4uaGVpZ2h0IH1cblx0XHRcdFwiaGlkZGVuXCI6IHsgb3BhY2l0eTogMCwgeTogU2NyZWVuLmhlaWdodCB9XG5cdFx0XG5cdFx0IyBncmlkMi5vbiBFdmVudHMuU3RhdGVTd2l0Y2hFbmQsIChmcm9tLCB0bykgLT5cblx0XHQjIFx0aWYgZnJvbSAhPSB0b1xuXHRcdCMgXHRcdGlmIHRvID09IFwic2hvd25cIiB0aGVuIEBpZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0IyBcdFx0ZWxzZSBAaWdub3JlRXZlbnRzID0gZmFsc2Vcblx0XHRcblx0XHRncmlkMi5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Z3JpZDI6IGdyaWQyXG5cdFx0XHRsYXN0U2xpZGVTZWxlY3RlZEluZGV4OiAwXG5cdFx0XHRncmlkQnV0dG9uczogW11cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0Z3JpZDIucGFyZW50ID0gQGNhbnZhc1xuXHRcdEBjYW52YXMuY3VzdG9tLmxvY2FsU2Nyb2xsID0gQFxuXG5cdFx0dHJ5IGdyaWQucGxhY2VCZWZvcmUoQHRvcFZpZXcpXG5cblxuXHRcdEBjb250ZW50Lm9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0XHRsb2NhbFNjcm9sbCA9IEBwYXJlbnRcblx0XHRcdFxuXHRcdFx0bG9jYWxTY3JvbGwuYWRkUHJldmlldyhsb2NhbFNjcm9sbC5jb250ZW50LmNoaWxkcmVuLmxlbmd0aClcblx0XHRcdGxvY2FsU2Nyb2xsLnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXG5cdFx0IyBAb24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0IyBcdGlmIGZyb20gIT0gdG9cblx0XHQjIFx0XHRpZiB0byA9PSBcInByZXNlbnRcIiB0aGVuIG5leHRPcGFjaXR5VmFsdWUgPSAxXG5cdFx0IyBcdFx0ZWxzZSBuZXh0T3BhY2l0eVZhbHVlID0gMFxuXHRcdFx0XHRcblx0XHQjIFx0XHRAYm90dG9tVmlldy5hbmltYXRlKG9wYWNpdHk6IG5leHRPcGFjaXR5VmFsdWUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblx0XHRcdFx0XG5cdFxuXHRcblx0QGRlZmluZSAnbGFzdFNsaWRlU2VsZWN0ZWRJbmRleCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5sYXN0U2xpZGVTZWxlY3RlZEluZGV4XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZ3JpZEJ1dHRvbnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZ3JpZEJ1dHRvbnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ3JpZEJ1dHRvbnMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZ3JpZDInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZ3JpZDJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ3JpZDIgPSB2YWx1ZVxuXHRcblx0XG5cblx0bGVhZFplcm86IChudW0sIHNpemUgPSAyKSA9PlxuXHRcdHMgPSBudW0gKyBcIlwiXG5cdFx0d2hpbGUgcy5sZW5ndGggPCBzaXplIHRoZW4gcyA9IFwiMFwiICsgc1xuXHRcdHJldHVybiBzXG5cblxuXHRhZGRQcmV2aWV3OiAoaW1hZ2VJbmRleCkgPT5cblx0XHRpbmRleCA9IGltYWdlSW5kZXggLSAxXG5cdFx0IyBwVyA9IEBncmlkMi53aWR0aCAvIEBncmlkU2l6ZSgpXG5cdFx0IyBwSCA9IChAZ3JpZDIud2lkdGggLyBAZ3JpZFNpemUoKSkgKiAoOTAwLzE0MDApXG5cblx0XHRwcmV2aWV3TGF5ZXIgPSBuZXcgUHJldmlld0J1dHRvblxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0cGFyZW50OiBAZ3JpZDIuY29udGVudFxuXHRcdFx0d2lkdGg6IDI4MCwgaGVpZ2h0OiAxODBcblx0XHRcdGJvcmRlclJhZGl1czogOFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjIyMlwiXG5cdFx0XHQjIHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcdGltYWdlOiBcImltYWdlcy9wYWdlI3tAbGVhZFplcm8oaW1hZ2VJbmRleCl9QHByZXZpZXcucG5nXCJcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0aW5kZXg6IGluZGV4XG5cdFx0XG5cdFx0cHJldmlld0xheWVyLnN0YXRlcyA9XG5cdFx0XHRcInNob3duXCI6IHsgb3BhY2l0eTogMC44IH1cblx0XHRcdFwiaGlkZGVuXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0cHJldmlld0xheWVyLnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cdFx0XG5cdFx0QGdyaWRCdXR0b25zLnB1c2ggcHJldmlld0xheWVyXG5cblx0XHRwcmV2aWV3TGF5ZXIub25UYXAgLT5cblx0XHRcdGxvY2FsQ2FudmFzID0gQHBhcmVudC5wYXJlbnQucGFyZW50XG5cdFx0XHRsb2NhbFNjcm9sbCA9IGxvY2FsQ2FudmFzLmN1c3RvbS5sb2NhbFNjcm9sbFxuXHRcdFx0XG5cdFx0XHRsb2NhbFNjcm9sbC5sYXN0U2xpZGVTZWxlY3RlZEluZGV4ID0gaW5kZXhcblx0XHRcdGxvY2FsU2Nyb2xsLnBpbmNoVG9TbGlkZSgpXG5cblx0XHRcblx0XHQjIEBncmlkMi51cGRhdGVDb250ZW50KClcblx0XG5cdHVwZGF0ZVByZXZpZXc6ICgpID0+XG5cdFx0Zm9yIGl0ZW0sIGluZGV4IGluIEBncmlkMi5jb250ZW50LmNoaWxkcmVuXG5cdFx0XHRwVyA9IChAZ3JpZDIud2lkdGggLSBAZ2V0R3JpZEdhcCgpICogKEBncmlkU2l6ZSgpICsgMSkpIC8gQGdyaWRTaXplKClcblx0XHRcdHBIID0gcFcgKiAoOTAwLzE0MDApXG5cblx0XHRcdGl0ZW0ud2lkdGggPSBwV1xuXHRcdFx0aXRlbS5oZWlnaHQgPSBwSFxuXHRcdFx0aXRlbS54ID0gaW5kZXggJSBAZ3JpZFNpemUoKSAqIChwVyArIEBnZXRHcmlkR2FwKCkpICsgQGdldEdyaWRHYXAoKVxuXHRcdFx0aXRlbS55ID0gKGluZGV4IC0gaW5kZXggJSBAZ3JpZFNpemUoKSkgLyBAZ3JpZFNpemUoKSAqIChwSCArIEBnZXRHcmlkR2FwKCkpICsgQGdldEdyaWRHYXAoKVxuXG5cdFx0XG5cdFx0QGdyaWQyLnVwZGF0ZUNvbnRlbnQoKVxuXG5cblx0XG5cdCMgb3ZlcnJpZGVcblx0dXBkYXRlU2l6ZTogKCkgPT5cblx0XHRzdXBlclxuXHRcdG5leHRTdGF0ZSA9IEBncmlkMi5zdGF0ZXMuY3VycmVudC5uYW1lXG5cdFx0XG5cdFx0QGdyaWQyLndpZHRoID0gQGNhbnZhcy53aWR0aFxuXHRcdEBncmlkMi5oZWlnaHQgPSBAY2FudmFzLmhlaWdodCAtIDU4XG5cblx0XHRAZ3JpZDIuc3RhdGVzLnNob3duLnkgPSA1OFxuXHRcdEBncmlkMi5zdGF0ZXMuaGlkZGVuLnkgPSBTY3JlZW4uaGVpZ2h0ICsgMTAwMFxuXG5cdFx0QGdyaWQyLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblxuXHRcdEB1cGRhdGVQcmV2aWV3KClcblxuXG5cdGdyaWRTaXplOiAoKSA9PlxuXHRcdGlmIEBjYW52YXMud2lkdGggPCA3NDAgdGhlbiByZXR1cm4gMlxuXHRcdGVsc2UgaWYgQGNhbnZhcy53aWR0aCA8IDEyODAgdGhlbiByZXR1cm4gM1xuXHRcdGVsc2UgaWYgQGNhbnZhcy53aWR0aCA8IDE2MDAgdGhlbiByZXR1cm4gNFxuXHRcdGVsc2UgaWYgQGNhbnZhcy53aWR0aCA8IDIwMDAgdGhlbiByZXR1cm4gNVxuXHRcdHJldHVybiA2XG5cblx0Z2V0R3JpZEdhcDogKCkgPT5cblx0XHRyZXR1cm4gOFxuXG5cdGdldEdyaWRTY2FsZTogKCkgPT5cblx0XHR3cyA9IChAd2lkdGggLSBAZ2V0R3JpZEdhcCgpICogKEBncmlkU2l6ZSgpIC0gMSkpIC8gQGdyaWRTaXplKClcblx0XHRyZXR1cm4gd3MgLyBAd2lkdGhcblxuXG5cblx0aXNHcmlkOiAoKSA9PlxuXHRcdHJldHVybiBAZ3JpZDIuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcInNob3duXCJcblxuXHRwaW5jaFRvR3JpZDogKCkgPT5cblx0XHRpZiBAaXNHcmlkKCkgdGhlbiBAcGluY2hUb1NsaWRlKClcblx0XHRlbHNlXG5cdFx0XHQjIGlmIEBncmlkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmdWxsc2NyZWVuXCIgdGhlbiBAY2hhbmdlU2NhbGUoKVxuXG5cdFx0XHRmb3IgaXRlbSwgaW5kZXggaW4gQGdyaWRCdXR0b25zXG5cdFx0XHRcdGlmIGluZGV4ID09IEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4XG5cdFx0XHRcdFx0aXRlbS5zdGF0ZVN3aXRjaChcInNob3duXCIpXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRpdGVtLnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cdFx0XHRcdFx0aXRlbS5hbmltYXRlKFwic2hvd25cIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41LCBkZWxheTogMC4xMiArIDAuMDIgKiBNYXRoLmFicygoQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXggLSBpbmRleCkpKVxuXHRcdFx0XG5cdFx0XHRAZ3JpZDIuc3RhdGVTd2l0Y2goXCJzaG93blwiKVxuXHRcdFx0dHJ5IEBncmlkMi5zY3JvbGxUb1BvaW50KHsgeDogMCwgeTogQGdyaWRCdXR0b25zW0BsYXN0U2xpZGVTZWxlY3RlZEluZGV4XS55IC0gQGdyaWRCdXR0b25zW0BsYXN0U2xpZGVTZWxlY3RlZEluZGV4XS5oZWlnaHQgLyAyIH0sIGZhbHNlKVxuXHRcdFx0XG5cdFx0XHRAcGF1c2VWaWRlb3MoKVxuXG5cdHBpbmNoVG9TbGlkZTogKCkgPT5cblx0XHQjIHByaW50IEBsYXN0U2xpZGVTZWxlY3RlZEluZGV4XG5cdFx0QGdyaWQyLnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bQGxhc3RTbGlkZVNlbGVjdGVkSW5kZXhdLCBmYWxzZSlcblx0XHRcblx0XHRcblxuXG5cblx0XHRcblx0XHQiLCJcbntTbGlkZXI0fSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjRcIlxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjUgZXh0ZW5kcyBTbGlkZXI0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGFjdGl2ZVZpZGVvUGxheWVyOiBudWxsXG5cdFx0XHRhY3RpdmVQcm9ncmVzc1NsaWRlcjogbnVsbFxuXHRcdFx0YWN0aXZlRHJhZzogZmFsc2Vcblx0XHRcdGFjdGl2ZVBsYXlpbmc6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdFxuXHRcdEZyYW1lci5Mb29wLm9uIFwicmVuZGVyXCIsID0+XG5cdFx0XHRpZiAhQGFjdGl2ZURyYWcgYW5kIEBhY3RpdmVQbGF5aW5nIGFuZCAhQGlzR3JpZCgpXG5cblx0XHRcdFx0aWYgQGFjdGl2ZVByb2dyZXNzU2xpZGVyICE9IHVuZGVmaW5lZCBhbmQgQGFjdGl2ZVByb2dyZXNzU2xpZGVyICE9IG51bGxcblx0XHRcdFx0XHRpZiBAYWN0aXZlVmlkZW9QbGF5ZXIgIT0gdW5kZWZpbmVkIGFuZCBAYWN0aXZlVmlkZW9QbGF5ZXIgIT0gbnVsbFxuXHRcdFx0XHRcdFx0QGFjdGl2ZVByb2dyZXNzU2xpZGVyLnZhbHVlID0gVXRpbHMubW9kdWxhdGUoQGFjdGl2ZVZpZGVvUGxheWVyLmN1cnJlbnRUaW1lLCBbMCwgQGFjdGl2ZVZpZGVvUGxheWVyLmR1cmF0aW9uXSwgWzAsIDFdLCB0cnVlKVxuXG5cblxuXHR1cGRhdGVDdXJyZW50UGFnZTogKCkgPT5cblx0XHRzdXBlciBAdXBkYXRlQ29udGVudCgpXG5cdFx0XG5cdFx0QHNlbGVjdEN1cnJlbnRQbGF5aW5nVmlkZW8oKVxuXHRcdEBhY3RpdmVEcmFnID0gZmFsc2Vcblx0XG5cdFxuXHRcblx0QGRlZmluZSAnYWN0aXZlUHJvZ3Jlc3NTbGlkZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlUHJvZ3Jlc3NTbGlkZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYWN0aXZlVmlkZW9QbGF5ZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYWN0aXZlVmlkZW9QbGF5ZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYWN0aXZlVmlkZW9QbGF5ZXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYWN0aXZlRHJhZycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVEcmFnXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZURyYWcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnYWN0aXZlUGxheWluZycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hY3RpdmVQbGF5aW5nXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmFjdGl2ZVBsYXlpbmcgPSB2YWx1ZVxuXHRcblx0XG5cdFxuXHRzZWxlY3RDdXJyZW50UGxheWluZ1ZpZGVvOiAoKSA9PlxuXHRcdGN1cnJlbnRseU5vdFBsYXlpbmcgPSB0cnVlXG5cblx0XHRmb3IgaXRlbSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGlmIGl0ZW0gPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdGN1cnJlbnRseU5vdFBsYXlpbmcgPSBmYWxzZVxuXHRcdFx0XHRAYWN0aXZlUHJvZ3Jlc3NTbGlkZXIgPSBAY3VycmVudFBhZ2UucGxheWVyU2xpZGVyXG5cdFx0XHRcdEBhY3RpdmVWaWRlb1BsYXllciA9IEBjdXJyZW50UGFnZS52aWRlb1ZpZXcucGxheWVyXG5cdFx0XG5cdFx0aWYgY3VycmVudGx5Tm90UGxheWluZ1xuXHRcdFx0QGFjdGl2ZVByb2dyZXNzU2xpZGVyID0gbnVsbFxuXHRcdFx0QGFjdGl2ZVZpZGVvUGxheWVyID0gbnVsbFxuIiwiXG57U2xpZGVyM30gPSByZXF1aXJlIFwiUENTbGlkZXIzXCJcblxuY2xhc3MgZXhwb3J0cy5TbGlkZXI0IGV4dGVuZHMgU2xpZGVyM1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOmN1cnJlbnRQYWdlXCIsIC0+XG5cdFx0XHRAdXBkYXRlQ3VycmVudFBhZ2UoKVxuXHRcdFxuXHRcdEBjb250ZW50Lm9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0XHRAcGFyZW50LnNsaWRlQ2hhbmdlclZpZXcucGFnZXMgPSBAY2hpbGRyZW4ubGVuZ3RoXG5cdFx0XHRAcGFyZW50LnVwZGF0ZUN1cnJlbnRQYWdlKClcblx0XHRcblx0XG5cdFxuXHRcblx0dXBkYXRlQ3VycmVudFBhZ2U6ICgpID0+XG5cdFx0aWYgIUBpc0dyaWQoKVxuXHRcdFx0Zm9yIGl0ZW0sIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRcdGlmIGl0ZW0gPT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdFx0QGxhc3RTbGlkZVNlbGVjdGVkSW5kZXggPSBpbmRleFxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XG5cblx0XHRAcGF1c2VCYWNrZ3JvdW5kVmlkZW9zKClcblx0XHRAdXBkYXRlQ3VycmVudFBhZ2VTbGlkZXIoKVxuXG5cdFx0aWYgIUBpc0dyaWQoKSB0aGVuIEBwbGF5QWN0aXZlVmlkZW8oKVxuXHRcdFx0XG5cdFxuXG5cblx0cGxheUFjdGl2ZVZpZGVvOiAoKSA9PlxuXHRcdGZvciBjdXJyZW50VmlkZW9TbGlkZSBpbiBAdmlkZW9TbGlkZXNcblx0XHRcdGlmIGN1cnJlbnRWaWRlb1NsaWRlID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRjdXJyZW50VmlkZW9TbGlkZS5wbGF5KClcblx0XHRcdFx0cmV0dXJuXG5cblxuXHRwYXVzZVZpZGVvczogKCkgPT5cblx0XHRmb3IgY3VycmVudFZpZGVvU2xpZGUgaW4gQHZpZGVvU2xpZGVzXG5cdFx0XHRjdXJyZW50VmlkZW9TbGlkZS5wYXVzZSgpXG5cblxuXHRwYXVzZUJhY2tncm91bmRWaWRlb3M6ICgpID0+XG5cdFx0Zm9yIGN1cnJlbnRWaWRlb1NsaWRlIGluIEB2aWRlb1NsaWRlc1xuXHRcdFx0aWYgY3VycmVudFZpZGVvU2xpZGUgIT0gQGN1cnJlbnRQYWdlXG5cdFx0XHRcdGN1cnJlbnRWaWRlb1NsaWRlLnBhdXNlKClcblx0XG5cdHNob3dHcmlkQ2FuY2VsQnV0dG9uOiAoKSA9PlxuXHRcdEBzbGlkZUNoYW5nZXJWaWV3LmN1cnJlbnQgPSAtMVxuXHRcblx0dXBkYXRlQ3VycmVudFBhZ2VTbGlkZXI6ICgpID0+XG5cdFx0aWYgQGlzR3JpZCgpXG5cdFx0XHRAc2hvd0dyaWRDYW5jZWxCdXR0b24oKVxuXHRcdFx0cmV0dXJuXG5cdFx0XG5cdFx0Zm9yIGl0ZW0sIGluZGV4IGluIEBjb250ZW50LmNoaWxkcmVuXG5cdFx0XHRpZiBpdGVtID09IEBjdXJyZW50UGFnZVxuXHRcdFx0XHRAc2xpZGVDaGFuZ2VyVmlldy5jdXJyZW50ID0gKGluZGV4ICsgMSlcblx0XHRcdFx0cmV0dXJuIiwiXG5cbntTbGlkZXIyfSA9IHJlcXVpcmUgXCJQQ1NsaWRlcjJcIlxuXG5jbGFzcyBleHBvcnRzLlNsaWRlcjMgZXh0ZW5kcyBTbGlkZXIyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAaW5pdFNob3J0Y3V0cygpXG5cdFxuXHRcblx0aW5pdFNob3J0Y3V0czogKCkgPT5cblx0XHRsb2NhbFNjcm9sbCA9IEBcblx0XHRcblx0XHRFdmVudHMud3JhcCh3aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXIgXCJrZXlkb3duXCIsIChldmVudCkgLT5cblx0XHRcdFxuXHRcdFx0aWYgZXZlbnQuY29kZSBpcyBcIkFycm93TGVmdFwiXG5cdFx0XHRcdGlmICFsb2NhbFNjcm9sbC5pc0dyaWQoKVxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLnNuYXBUb05leHRQYWdlKFwibGVmdFwiLCBmYWxzZSlcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiQXJyb3dSaWdodFwiXG5cdFx0XHRcdGlmICFsb2NhbFNjcm9sbC5pc0dyaWQoKVxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLnNuYXBUb05leHRQYWdlKFwicmlnaHRcIiwgZmFsc2UpXG5cdFx0XHRcblxuXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlDXCJcblx0XHRcdFx0bG9jYWxTY3JvbGwuY29weUJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5UlwiXG5cdFx0XHRcdGxvY2FsU2Nyb2xsLnJlc3RhcnRCdXR0b24uZW1pdCBFdmVudHMuVGFwXG5cdFx0XHRcblxuXG5cdFx0XHRlbHNlIGlmIGV2ZW50LmNvZGUgaXMgXCJLZXlGXCJcblx0XHRcdFx0aWYgIWxvY2FsU2Nyb2xsLmlzR3JpZCgpXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuZnVsbHNjcmVlbkJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLnBpbmNoVG9HcmlkKClcblx0XHRcdFx0XHRVdGlscy5kZWxheSAwLjM2LCA9PlxuXHRcdFx0XHRcdFx0bG9jYWxTY3JvbGwuZnVsbHNjcmVlbkJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiS2V5QVwiXG5cdFx0XHRcdGlmIGxvY2FsU2Nyb2xsLmdyaWQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIndpbmRvd1wiXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb0dyaWQoKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuZnVsbHNjcmVlbkJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFx0XHRVdGlscy5kZWxheSAwLjM2LCA9PlxuXHRcdFx0XHRcdFx0bG9jYWxTY3JvbGwucGluY2hUb0dyaWQoKVxuXG5cdFx0XHRcblxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiRXNjYXBlXCJcblx0XHRcdFx0aWYgbG9jYWxTY3JvbGwuZ3JpZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZnVsbHNjcmVlblwiXG5cdFx0XHRcdFx0bG9jYWxTY3JvbGwuZnVsbHNjcmVlbkJ1dHRvbi5lbWl0IEV2ZW50cy5UYXBcblx0XHRcdFx0ZWxzZSBpZiBsb2NhbFNjcm9sbC5pc0dyaWQoKVxuXHRcdFx0XHRcdGxvY2FsU2Nyb2xsLnBpbmNoVG9HcmlkKClcblx0XHRcdFxuXHRcdFx0ZWxzZSBpZiBldmVudC5jb2RlIGlzIFwiU3BhY2VcIlxuXHRcdFx0XHR0cnkgbG9jYWxTY3JvbGwuY3VycmVudFBhZ2UudG9nZ2xlUGxheSgpXG5cdCIsIlxue1NsaWRlcjF9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMVwiXG5cblxuU2xpZGVUZW1wbGF0ZSA9IHJlcXVpcmUoXCJQQ1NsaWRlXCIpXG5TbGlkZSA9IFNsaWRlVGVtcGxhdGUuU2xpZGVcblNpbXBsZVZpZGVvU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlNpbXBsZVZpZGVvU2xpZGVcblZpZGVvU2xpZGUgPSBTbGlkZVRlbXBsYXRlLlZpZGVvU2xpZGVcbkhEVmlkZW9TbGlkZSA9IFNsaWRlVGVtcGxhdGUuSERWaWRlb1NsaWRlXG5cblByb3RvdHlwZVNsaWRlID0gU2xpZGVUZW1wbGF0ZS5Qcm90b3R5cGVTbGlkZVxuXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyMiBleHRlbmRzIFNsaWRlcjFcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlkZW9TbGlkZXM6IFtdXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cdEBkZWZpbmUgJ3ZpZGVvU2xpZGVzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZGVvU2xpZGVzXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0c2xpZGU6IChzb3VyY2VVUkwgPSBudWxsKSA9PlxuXHRcdHNsaWRlID0gbmV3IFNsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0aWYgc291cmNlVVJMICE9IG51bGwgdGhlbiBzbGlkZS5zb3VyY2Uoc291cmNlVVJMKVxuXHRcdHJldHVybiBzbGlkZVxuXG5cblxuXHRiZ1ZpZGVvU2xpZGU6IChzb3VyY2VVUkwgPSBudWxsKSA9PlxuXHRcdHNsaWRlID0gbmV3IFNpbXBsZVZpZGVvU2xpZGVcblx0XHRcdHBhcmVudDogQGNvbnRlbnRcblx0XHRcblx0XHRpZiBzb3VyY2VVUkwgIT0gbnVsbCB0aGVuIHNsaWRlLnNvdXJjZShzb3VyY2VVUkwpXG5cdFx0QHZpZGVvU2xpZGVzLnB1c2ggc2xpZGVcblx0XHRyZXR1cm4gc2xpZGVcblx0XG5cdHZpZGVvU2xpZGU6IChzb3VyY2VVUkwgPSBudWxsKSA9PlxuXHRcdHNsaWRlID0gbmV3IEhEVmlkZW9TbGlkZVxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFxuXHRcdGlmIHNvdXJjZVVSTCAhPSBudWxsIHRoZW4gc2xpZGUuc291cmNlKHNvdXJjZVVSTClcblx0XHRAdmlkZW9TbGlkZXMucHVzaCBzbGlkZVxuXHRcdHJldHVybiBzbGlkZVxuXG5cdGZ1bGxWaWRlb1NsaWRlOiAoc291cmNlVVJMID0gbnVsbCkgPT5cblx0XHRzbGlkZSA9IG5ldyBWaWRlb1NsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0aWYgc291cmNlVVJMICE9IG51bGwgdGhlbiBzbGlkZS5zb3VyY2Uoc291cmNlVVJMKVxuXHRcdEB2aWRlb1NsaWRlcy5wdXNoIHNsaWRlXG5cdFx0cmV0dXJuIHNsaWRlXG5cblx0XG5cdFxuXHRcblx0XG5cdFxuXG5cblx0cHJvdG90eXBlU2xpZGU6IChzb3VyY2VVUkwgPSBudWxsKSA9PlxuXHRcdHNsaWRlID0gbmV3IFByb3RvdHlwZVNsaWRlXG5cdFx0XHRwYXJlbnQ6IEBjb250ZW50XG5cdFx0XG5cdFx0aWYgc291cmNlVVJMICE9IG51bGwgdGhlbiBzbGlkZS5zb3VyY2Uoc291cmNlVVJMKVxuXHRcdHJldHVybiBzbGlkZSIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxue1NsaWRlcjB9ID0gcmVxdWlyZSBcIlBDU2xpZGVyMFwiXG4jIHtTbGlkZXJQaW5jaH0gPSByZXF1aXJlIFwiUENTbGlkZXJQaW5jaFwiXG57U2xpZGVDaGFuZ2VyfSA9IHJlcXVpcmUgXCJQQ1NsaWRlQ2hhbmdlclwiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG5UZXh0ID0gQnV0dG9ucy5UZXh0XG5UZXh0QnV0dG9uID0gQnV0dG9ucy5UZXh0QnV0dG9uXG5TVkdCdXR0b24gPSBCdXR0b25zLlNWR0J1dHRvblxuQ29weUJ1dHRvbiA9IEJ1dHRvbnMuQ29weUJ1dHRvblxuXG5cbiMgUGFuZWxzXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyMSBleHRlbmRzIFNsaWRlcjBcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHRvcFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQGNhbnZhcywgbmFtZTogXCJ0b3BWaWV3XCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0d2lkdGg6IEBjYW52YXMud2lkdGgsIGhlaWdodDogNTZcblx0XHRcblx0XHRAYm90dG9tVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAY2FudmFzLCBuYW1lOiBcImJvdHRvbVZpZXdcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR3aWR0aDogQGNhbnZhcy53aWR0aCwgaGVpZ2h0OiA1NiwgeTogQWxpZ24uYm90dG9tXG5cdFx0XG5cdFx0Zm9yIGl0ZW0gaW4gW0B0b3BWaWV3LCBAYm90dG9tVmlld11cblx0XHRcdGl0ZW0uc2VuZFRvQmFjaygpXG5cdFx0XHRpdGVtLnN0YXRlcyA9XG5cdFx0XHRcdFwid2luZG93XCI6IHsgb3BhY2l0eTogMSB9XG5cdFx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IG9wYWNpdHk6IDAgfVxuXHRcdFxuXHRcdFxuXHRcdFxuXHRcdCMgVG9wIFZpZXdcblx0XHRAbG9nb0J1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwibG9nb1wiXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzIsIGFzc2V0OiBTVkcubG9nb0ljb25cblx0XHRcdGhhbmRsZXI6IEBvcGVuVVJMSG9tZVxuXHRcdFxuXHRcdEB0aXRsZVRleHQgPSBuZXcgVGV4dFxuXHRcdFx0cGFyZW50OiBAdG9wVmlldywgbmFtZTogXCJ0aXRsZVwiXG5cdFx0XHR0ZXh0OiBAdGl0bGUsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIlxuXHRcdFxuXHRcdEBjb3B5QnV0dG9uID0gbmV3IENvcHlCdXR0b25cblx0XHRcdHBhcmVudDogQHRvcFZpZXcsIG5hbWU6IFwiY29weSBsaW5rXCJcblx0XHRcdHRleHQ6IFwiQ29weSBMaW5rXCIsIHRleHRBbGlnbjogXCJyaWdodFwiLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGN1c3RvbTogeyB4OiAtNDAtMjAtMjQgfVxuXHRcdFx0bGluazogd2luZG93LmxvY2F0aW9uXG5cdFx0XG5cdFx0QGZ1bGxzY3JlZW5CdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRwYXJlbnQ6IEB0b3BWaWV3LCBuYW1lOiBcImZ1bGxzY3JlZW5cIlxuXHRcdFx0eTogQWxpZ24uY2VudGVyXG5cdFx0XHR3aWR0aDogMjAsIGhlaWdodDogMjAsIGFzc2V0OiBTVkcuZnVsbHNjcmVlbkljb25cblx0XHRcdGhhbmRsZXI6IEBjaGFuZ2VTY2FsZVxuXHRcdFx0Y3VzdG9tOiB7IHg6IC0zNiB9XG5cdFx0XG5cblxuXG5cdFx0IyBCb3R0b20gVmlld1xuXHRcdEBzbGlkZUNoYW5nZXJWaWV3ID0gbmV3IFNsaWRlQ2hhbmdlclxuXHRcdFx0cGFyZW50OiBAYm90dG9tVmlldywgbmFtZTogXCJzbGlkZSBjaGFuZ2VyXCJcblx0XHRcdHg6IEFsaWduLmNlbnRlclxuXHRcdFx0c2xpZGVyOiBAXG5cdFx0XG5cdFx0QHJlc3RhcnRCdXR0b24gPSBuZXcgVGV4dEJ1dHRvblxuXHRcdFx0cGFyZW50OiBAYm90dG9tVmlldywgbmFtZTogXCJyZXN0YXJ0XCJcblx0XHRcdHRleHQ6IFwiUmVzdGFydCAoUilcIiwgdGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0yMDAwKSwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRoYW5kbGVyOiBAcmVzdGFydEhhbmRsZXJcblx0XHRcdGN1c3RvbTogeyB4OiAtMjAwMCB9XG5cdFx0XG5cdFx0XG5cblxuXHRcdEB1cGRhdGVWaWV3QnVpbGRlclNpemUoQGNhbnZhcylcblx0XHRAY2FudmFzLm9uIFwiY2hhbmdlOnNpemVcIiwgPT5cblx0XHRcdEB1cGRhdGVWaWV3QnVpbGRlclNpemUoQGNhbnZhcylcblx0XHRcblx0XHRcblx0XG5cblx0dXBkYXRlVmlld0J1aWxkZXJTaXplOiAoYW5jaG9yKSA9PlxuXHRcdFxuXHRcdEB0b3BWaWV3LndpZHRoID0gYW5jaG9yLndpZHRoXG5cdFx0XG5cdFx0aWYgYW5jaG9yLndpZHRoIDwgNzQwXG5cdFx0XHRAdGl0bGVUZXh0LndpZHRoID0gYW5jaG9yLndpZHRoXG5cdFx0XHRAdGl0bGVUZXh0LnRleHRBbGlnbiA9IFwibGVmdFwiXG5cdFx0XHRAdGl0bGVUZXh0LnggPSBBbGlnbi5sZWZ0KEBsb2dvQnV0dG9uLngpXG5cdFx0XHRAdGl0bGVUZXh0LnkgPSBBbGlnbi50b3AoQHRvcFZpZXcuaGVpZ2h0ICsgMTApXG5cdFx0XHRcblx0XHRcdEBjb3B5QnV0dG9uLnggPSBBbGlnbi5sZWZ0KEBsb2dvQnV0dG9uLngpXG5cdFx0XHRAY29weUJ1dHRvbi55ID0gQWxpZ24udG9wKEB0b3BWaWV3LmhlaWdodCArIDM2KVxuXHRcdGVsc2Vcblx0XHRcdEB0aXRsZVRleHQud2lkdGggPSBhbmNob3Iud2lkdGggLyAyXG5cdFx0XHRAdGl0bGVUZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCJcblx0XHRcdEB0aXRsZVRleHQueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0QHRpdGxlVGV4dC55ID0gQWxpZ24uY2VudGVyKDIpXG5cdFx0XHRcblx0XHRcdEBjb3B5QnV0dG9uLnggPSBBbGlnbi5yaWdodChAY29weUJ1dHRvbi5jdXN0b20ueClcblx0XHRcdEBjb3B5QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXIoMilcblx0XHRcblx0XHRAZnVsbHNjcmVlbkJ1dHRvbi54ID0gQWxpZ24ucmlnaHQoQGZ1bGxzY3JlZW5CdXR0b24uY3VzdG9tLngpXG5cdFx0QGZ1bGxzY3JlZW5CdXR0b24ueSA9IEFsaWduLmNlbnRlcigyKVxuXHRcdFxuXHRcdEBib3R0b21WaWV3LndpZHRoID0gYW5jaG9yLndpZHRoXG5cdFx0QHNsaWRlQ2hhbmdlclZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFxuXHRcdCMgaGVpZ2h0XG5cdFx0QGJvdHRvbVZpZXcueSA9IEFsaWduLmJvdHRvbSIsIlxuXG4jIFNjYWxlICYgVVJMIGhhbmRsaW5nXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVyMCBleHRlbmRzIFBhZ2VDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRjYW52YXNCYWNrZ3JvdW5kTGF5ZXIgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRuYW1lOiBcImJhY2tncm91bmRMYXllclwiXG5cdFx0XG5cblxuXHRcdGNhbnZhc0xheWVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImNhbnZhc1wiXG5cdFx0XHR3aWR0aDogU2NyZWVuLndpZHRoXG5cdFx0XHRoZWlnaHQ6IFNjcmVlbi5oZWlnaHRcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0bG9jYWxTY3JvbGw6IG51bGxcblx0XHRcblx0XHRjYW52YXNMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJ3aW5kb3dcIjogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiIH1cblx0XHRcdFwiZnVsbHNjcmVlblwiOiB7IGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCIgfVxuXG5cblx0XHQjIExlZ2FjeVxuXHRcdGxlZ2FjeVNjcm9sbCA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHBhcmVudDogY2FudmFzTGF5ZXJcblx0XHRcdG5hbWU6IFwiZ3JpZFwiXG5cdFx0XHR3aWR0aDogMTQwMCAqIDIsIGhlaWdodDogOTAwICogMlxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlLCBzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRpZ25vcmVFdmVudHM6IHRydWVcblx0XHRcblx0XHRsZWdhY3lTY3JvbGwuc3RhdGVzID1cblx0XHRcdFwid2luZG93XCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmdWxsc2NyZWVuXCI6IHsgc2NhbGU6IDEgfVxuXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Y2FudmFzOiBjYW52YXNMYXllclxuXHRcdFx0Z3JpZDogbGVnYWN5U2Nyb2xsXG5cdFx0XHRiYWNrZ3JvdW5kTGF5ZXI6IGNhbnZhc0JhY2tncm91bmRMYXllclxuXHRcblx0XHRcdHBhcmVudDogbGVnYWN5U2Nyb2xsLmNvbnRlbnRcblx0XHRcdHdpZHRoOiBsZWdhY3lTY3JvbGwud2lkdGgsIGhlaWdodDogbGVnYWN5U2Nyb2xsLmhlaWdodFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IGZhbHNlLCBzY3JvbGxIb3Jpem9udGFsOiB0cnVlXG5cdFx0XHRwcmVzZW50YXRpb25UaXRsZTogXCJVbnRpdGxlZFwiXG5cdFx0XG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNvbnRlbnQuZHJhZ2dhYmxlLnByb3BhZ2F0ZUV2ZW50cyA9IGZhbHNlXG5cblx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5kaXNhYmxlKClcblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblx0XHRcblx0XHRAaW5pdFNjYWxlKClcblx0XHRcblx0XHRAdXBkYXRlU2l6ZSgpXG5cdFx0QGJhY2tncm91bmRMYXllci5vbiBcImNoYW5nZTpzaXplXCIsID0+XG5cdFx0XHRAdXBkYXRlU2l6ZSgpXG5cdFx0XG5cblxuXHRcblxuXHRAZGVmaW5lICd0aXRsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcmVzZW50YXRpb25UaXRsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcmVzZW50YXRpb25UaXRsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdjYW52YXMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY2FudmFzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNhbnZhcyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdncmlkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmdyaWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ3JpZCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdiYWNrZ3JvdW5kTGF5ZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYmFja2dyb3VuZExheWVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJhY2tncm91bmRMYXllciA9IHZhbHVlXG5cdFxuXHRcblx0XG5cblx0IyBpc0dyaWQ6ICgpID0+XG5cdCMgXHRyZXR1cm4gQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJncmlkXCJcblx0XG5cdHVwZGF0ZVNpemU6ICgpID0+XG5cdFx0QGluaXRTY2FsZShAZ3JpZC5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcblx0aW5pdFNjYWxlOiAoZm9yU3RhdGUgPSBcIndpbmRvd1wiKSA9PlxuXHRcdEBjYW52YXMud2lkdGggPSBTY3JlZW4ud2lkdGhcblx0XHRAY2FudmFzLmhlaWdodCA9IFNjcmVlbi5oZWlnaHRcblxuXHRcdHNjYWxlWCA9IChTY3JlZW4ud2lkdGggLSAyMCkgLyBAZ3JpZC53aWR0aFxuXHRcdHNjYWxlWSA9IChTY3JlZW4uaGVpZ2h0IC0gMTIwKSAvIEBncmlkLmhlaWdodFxuXHRcdEBncmlkLnN0YXRlcy53aW5kb3cuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XHRcblx0XHRzY2FsZVggPSBTY3JlZW4ud2lkdGggLyBAZ3JpZC53aWR0aFxuXHRcdHNjYWxlWSA9IFNjcmVlbi5oZWlnaHQgLyBAZ3JpZC5oZWlnaHRcblx0XHRAZ3JpZC5zdGF0ZXMuZnVsbHNjcmVlbi5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcdFxuXHRcdEBncmlkLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdEBjYW52YXMuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0QGdyaWQuY2VudGVyKClcblx0XG5cdFxuXHQjIGZvciByZWFjdFxuXHRjaGFuZ2VTY2FsZTogKCkgPT5cblx0XHRcblx0XHRpZiBAZ3JpZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwid2luZG93XCIgdGhlbiBuZXh0U3RhdGUgPSBcImZ1bGxzY3JlZW5cIlxuXHRcdGVsc2UgbmV4dFN0YXRlID0gXCJ3aW5kb3dcIlxuXHRcdFxuXHRcdEBncmlkLmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGNhbnZhcy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdEB0b3BWaWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0QGJvdHRvbVZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cblx0cmVzdGFydEhhbmRsZXI6ICgpID0+XG5cdFx0QHNuYXBUb1BhZ2UoQGNvbnRlbnQuY2hpbGRyZW5bMF0sIGZhbHNlKVxuXHRcblx0XG5cdG9wZW5VUkw6ICh1cmwgPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIiwgaXNCbGFuayA9IGZhbHNlKSA9PlxuXHRcdGlmIGlzQmxhbmsgdGhlbiB3aW5kb3cub3BlbiB1cmwsICdfYmxhbmsnXG5cdFx0ZWxzZVxuIyBcdFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCA9IFwiP3NsaWRlSURcIlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gdXJsXG5cdFxuXHRvcGVuVVJMSG9tZTogPT5cblx0XHRAb3BlblVSTChcImh0dHBzOi8vdGlsbGx1ci5jb21cIiwgZmFsc2UpXG5cbiIsIlxuXG5TVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5CdXR0b25zID0gcmVxdWlyZShcIlBDQnV0dG9uc1wiKVxuIyBUZXh0ID0gQnV0dG9ucy5UZXh0XG5UZXh0QnV0dG9uID0gQnV0dG9ucy5UZXh0QnV0dG9uXG5TVkdCdXR0b24gPSBCdXR0b25zLlNWR0J1dHRvblxuXG5cbmNsYXNzIGV4cG9ydHMuU2xpZGVDaGFuZ2VyIGV4dGVuZHMgTGF5ZXJcblx0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG5hbWU6IFwicHJvZ3Jlc3Mgdmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHdpZHRoOiAxMjBcblx0XHRcdGhlaWdodDogNTZcblx0XHRcdHBhZ2VzOiAxXG5cdFx0XHRjdXJyZW50OiAxXG5cdFx0XHRzbGlkZXI6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdHRlc3RIYWRsZXIgPSAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0dHJ5IEBwYXJlbnQuc2xpZGVyLnBpbmNoVG9HcmlkKClcblxuXG5cdFx0QGN1cnJlbnRUZXh0ID0gbmV3IFRleHRCdXR0b25cblx0XHRcdHRleHRBbGlnbjogXCJjZW50ZXJcIiwgd2lkdGg6IDEyMCwgbGV0dGVyU3BhY2luZzogM1xuXHRcdFx0aGFuZGxlcjogdGVzdEhhZGxlclxuXHRcdFxuXHRcdEBjdXJyZW50VGV4dC51cGRhdGVUdXBsZSh7IG5vcm1hbDogMSwgaG92ZXI6IDAuOCB9KVxuXG5cdFx0QHByZXZCdXR0b24gPSBuZXcgU1ZHQnV0dG9uXG5cdFx0XHRuYW1lOiBcInByZXZcIiwgd2lkdGg6IDE2LCBoZWlnaHQ6IDE2LCBhc3NldDogU1ZHLnByZXZJY29uXG5cdFx0XHRoYW5kbGVyOiBAbW92ZUxlZnRcblx0XHRcblx0XHRAbmV4dEJ1dHRvbiA9IG5ldyBTVkdCdXR0b25cblx0XHRcdG5hbWU6IFwibmV4dFwiLCB3aWR0aDogMTYsIGhlaWdodDogMTYsIGFzc2V0OiBTVkcubmV4dEljb25cblx0XHRcdGhhbmRsZXI6IEBtb3ZlUmlnaHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBjdXJyZW50VGV4dC5wYXJlbnQgPSBAXG5cdFx0QGN1cnJlbnRUZXh0LnkgPSBBbGlnbi5jZW50ZXIoLTEpXG5cdFx0QGN1cnJlbnRUZXh0LnN0eWxlID1cblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwidG51bVwiXG5cdFx0XHRcImZvbnQtdmFyaWFudC1udW1lcmljXCI6IFwidGFidWxhci1udW1zIGxpbmluZy1udW1zXCJcblx0XHRcblx0XHRAcHJldkJ1dHRvbi5wYXJlbnQgPSBAXG5cdFx0QHByZXZCdXR0b24ueCA9IEFsaWduLmxlZnRcblx0XHRAcHJldkJ1dHRvbi55ID0gQWxpZ24uY2VudGVyXG5cdFx0XG5cdFx0QG5leHRCdXR0b24ucGFyZW50ID0gQFxuXHRcdEBuZXh0QnV0dG9uLnggPSBBbGlnbi5yaWdodFxuXHRcdEBuZXh0QnV0dG9uLnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcblx0XG5cdEBkZWZpbmUgJ3NsaWRlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zbGlkZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNsaWRlciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwYWdlcycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wYWdlc1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMucGFnZXMgPSB2YWx1ZVxuXHRcdFx0QGN1cnJlbnRUZXh0LnRleHQgPSBcIiN7QGN1cnJlbnR9LyN7QHBhZ2VzfVwiXG5cblx0QGRlZmluZSAnY3VycmVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jdXJyZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5jdXJyZW50ID0gdmFsdWVcblxuXHRcdFx0aWYgQGN1cnJlbnQgIT0gLTFcblx0XHRcdFx0IyB0aGVuIEBwYXJlbnQuYW5pbWF0ZShvcGFjaXR5OiAwLCBjdXJ2ZTogU3ByaW5nKGRhbXJwaW5nOiAxKSwgdGltZTogMC40KVxuXHRcdFx0IyBlbHNlXG5cdFx0XHRcdCMgQHBhcmVudC5hbmltYXRlKG9wYWNpdHk6IDEsIGN1cnZlOiBTcHJpbmcoZGFtcnBpbmc6IDEpLCB0aW1lOiAwLjQpXG5cdFx0XHRcdEBjdXJyZW50VGV4dC50ZXh0ID0gXCIje0BjdXJyZW50fS8je0BwYWdlc31cIlxuXHRcdFx0XG5cdFxuXG5cblxuXHRtb3ZlTGVmdDogKCkgPT5cbiMgXHRcdHByaW50IEBzbGlkZXJcblx0XHRAc2xpZGVyLnNuYXBUb05leHRQYWdlKFwibGVmdFwiLCBmYWxzZSlcblx0XG5cdG1vdmVSaWdodDogKCkgPT5cbiMgXHRcdHByaW50IEBzbGlkZXJcblx0XHRAc2xpZGVyLnNuYXBUb05leHRQYWdlKFwicmlnaHRcIiwgZmFsc2UpIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmNvbG9yX29uRGFyayA9IFwiI2ZmZlwiXG5jb2xvcl9vbkxpZ2h0ID0gXCIjMDAwXCJcblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuXG5leHBvcnRzLmxvZ29JY29uID0geyBvbkRhcms6IGdldExvZ28oY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0TG9nbyhjb2xvcl9vbkxpZ2h0KX1cblxuXG5cbmdldEZ1bGxzY3JlZW4gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMTEuMDQxIDIuOTIxNjRDMTEuMDQxIDMuNDQ0NzMgMTEuNDIyNSAzLjgzNDk4IDExLjk1MzMgMy44MzQ5OEgxMi41NDIzTDE1LjExMzUgMy42NjA2MUwxMy4wOTggNS41Nzg2MkwxMC43MDkyIDcuOTUzM0MxMC41MjY3IDguMTI3NjYgMTAuNDQzOCA4LjM1MTg0IDEwLjQ0MzggOC41OTI2M0MxMC40NDM4IDkuMTU3MjQgMTAuODI1MyA5LjU2NDA5IDExLjM4OTMgOS41NjQwOUMxMS42NDY0IDkuNTY0MDkgMTEuODcwNCA5LjQ2NDQ1IDEyLjA1MjkgOS4yOTAwOUwxNC40MzM0IDYuOTA3MTFMMTYuMzQxMSA0Ljg4MTE2TDE2LjE2NjkgNy40NzE3MlY4LjExOTM2QzE2LjE2NjkgOC42NDI0NSAxNi41NDg1IDkuMDQxIDE3LjA3OTMgOS4wNDFDMTcuNjEwMiA5LjA0MSAxOCA4LjY1MDc1IDE4IDguMTE5MzZWMy41MTExNkMxOCAyLjU1NjMxIDE3LjQ0NDMgMiAxNi40OTA0IDJMMTEuOTUzMyAyQzExLjQzMDggMiAxMS4wNDEgMi4zOTAyNCAxMS4wNDEgMi45MjE2NFpNMiAxMS44ODA2TDIgMTYuNDg4OEMyIDE3LjQ0MzcgMi41NTU3MyAxOCAzLjUwOTU5IDE4SDguMDQ2NjZDOC41NjkyMSAxOCA4Ljk1OTA1IDE3LjYwMTUgOC45NTkwNSAxNy4wNzg0QzguOTU5MDUgMTYuNTU1MyA4LjU3NzUgMTYuMTY1IDguMDQ2NjYgMTYuMTY1SDcuNDU3NzVMNC44ODY0NyAxNi4zMzk0TDYuOTAyMDIgMTQuNDIxNEw5LjI5MDgyIDEyLjA0NjdDOS40NzMzIDExLjg3MjMgOS41NTYyNSAxMS42NDgyIDkuNTU2MjUgMTEuMzk5MUM5LjU1NjI1IDEwLjgzNDUgOS4xNzQ3IDEwLjQyNzYgOC42MTA2OCAxMC40Mjc2QzguMzUzNTUgMTAuNDI3NiA4LjEyMTMxIDEwLjUyNzIgNy45NDcxMiAxMC43MDk5TDUuNTY2NjIgMTMuMDkyOUwzLjY1ODg5IDE1LjExODhMMy44MzMwNyAxMi41MjgzTDMuODMzMDcgMTEuODgwNkMzLjgzMzA3IDExLjM0OTIgMy40NTE1MyAxMC45NTkgMi45MjA2OCAxMC45NTlDMi4zODk4NCAxMC45NTkgMiAxMS4zNDkyIDIgMTEuODgwNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5mdWxsc2NyZWVuSWNvbiA9IHsgb25EYXJrOiBnZXRGdWxsc2NyZWVuKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldEZ1bGxzY3JlZW4oY29sb3Jfb25MaWdodCl9XG5cblxuXG5cbmdldE5leHQgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNC43OTY0IDEyLjc5MzFMOS41ODYyNyA4TDQuNzk2NCAzLjIwNjg3QzQuNDA2MDEgMi44MTYyMSA0LjQwNjIyIDIuMTgzMDQgNC43OTY4OCAxLjc5MjY1QzUuMTg3NTQgMS40MDIyNiA1LjgyMDcgMS40MDI0OCA2LjIxMTA5IDEuNzkzMTNMMTEuNzA3MyA3LjI5MzEzQzEyLjA5NzUgNy42ODM2IDEyLjA5NzUgOC4zMTY0IDExLjcwNzMgOC43MDY4N0w2LjIxMTA5IDE0LjIwNjlDNS44MjA3IDE0LjU5NzUgNS4xODc1NCAxNC41OTc3IDQuNzk2ODggMTQuMjA3M0M0LjQwNjIyIDEzLjgxNyA0LjQwNjAxIDEzLjE4MzggNC43OTY0IDEyLjc5MzFaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMubmV4dEljb24gPSB7IG9uRGFyazogZ2V0TmV4dChjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXROZXh0KGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFByZXYgPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gd2l0aENvbG9yXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNNi40MTc0OCA4TDExLjIwNzMgMTIuNzkzMUMxMS41OTc3IDEzLjE4MzggMTEuNTk3NSAxMy44MTcgMTEuMjA2OSAxNC4yMDczQzEwLjgxNjIgMTQuNTk3NyAxMC4xODMgMTQuNTk3NSA5Ljc5MjY1IDE0LjIwNjlMNC4yOTY0IDguNzA2ODdDMy45MDYyIDguMzE2NCAzLjkwNjIgNy42ODM2IDQuMjk2NCA3LjI5MzEzTDkuNzkyNjUgMS43OTMxM0MxMC4xODMgMS40MDI0OCAxMC44MTYyIDEuNDAyMjYgMTEuMjA2OSAxLjc5MjY1QzExLjU5NzUgMi4xODMwNCAxMS41OTc3IDIuODE2MjEgMTEuMjA3MyAzLjIwNjg3TDYuNDE3NDggOFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wcmV2SWNvbiA9IHsgb25EYXJrOiBnZXRQcmV2KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFByZXYoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuZ2V0UGxheSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIxODBcIiBoZWlnaHQ9XCIxODBcIiB2aWV3Qm94PVwiMCAwIDE4MCAxODBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxjaXJjbGUgb3BhY2l0eT1cIjAuNVwiIGN4PVwiOTBcIiBjeT1cIjkwXCIgcj1cIjkwXCIgZmlsbD1cIiMwMDBcIi8+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNNzYuNzE1OCA1OC40OTE0QzczLjA1MTMgNTYuMjM2NCA2OC4zMzM0IDU4Ljg3MjkgNjguMzMzNCA2My4xNzU2VjExNi44MjRDNjguMzMzNCAxMjEuMTI3IDczLjA1MTUgMTIzLjc2MyA3Ni43MTYgMTIxLjUwOEwxMjMuOTcyIDk0LjY4MjZDMTI3LjQ2MiA5Mi41MzQ5IDEyNy40NjIgODcuNDYxOSAxMjMuOTcyIDg1LjMxNDNMNzYuNzE1OCA1OC40OTE0WlwiIGZpbGw9XCJ3aGl0ZVwiIGZpbGwtb3BhY2l0eT1cIjAuOFwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5SWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXkoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFBhdXNlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPGNpcmNsZSBvcGFjaXR5PVwiMC41XCIgY3g9XCI5MFwiIGN5PVwiOTBcIiByPVwiOTBcIiBmaWxsPVwiIzAwMFwiLz5cbjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk03MCA1NkM2NS41ODE3IDU2IDYyIDU5LjU4MTcgNjIgNjRWMTE2QzYyIDEyMC40MTggNjUuNTgxNyAxMjQgNzAgMTI0SDc2QzgwLjQxODMgMTI0IDg0IDEyMC40MTggODQgMTE2VjY0Qzg0IDU5LjU4MTcgODAuNDE4MyA1NiA3NiA1Nkg3MFpNMTA0IDU2Qzk5LjU4MTcgNTYgOTYgNTkuNTgxNyA5NiA2NFYxMTZDOTYgMTIwLjQxOCA5OS41ODE3IDEyNCAxMDQgMTI0SDExMEMxMTQuNDE4IDEyNCAxMTggMTIwLjQxOCAxMTggMTE2VjY0QzExOCA1OS41ODE3IDExNC40MTggNTYgMTEwIDU2SDEwNFpcIiBmaWxsPVwid2hpdGVcIiBmaWxsLW9wYWNpdHk9XCIwLjhcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGF1c2VJY29uID0geyBvbkRhcms6IGdldFBhdXNlKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBhdXNlKGNvbG9yX29uTGlnaHQpIH1cblxuXG5nZXRWaWRlb1NsaWRlciA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCIzNjhcIiBoZWlnaHQ9XCIxMTJcIiB2aWV3Qm94PVwiMCAwIDM2OCAxMTJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxyZWN0IG9wYWNpdHk9XCIwLjNcIiB3aWR0aD1cIjM2OFwiIGhlaWdodD1cIjExMlwiIHJ4PVwiNTZcIiBmaWxsPVwiIzAwMFwiLz5cbjxyZWN0IG9wYWNpdHk9XCIwLjVcIiB4PVwiMzRcIiB5PVwiNTJcIiB3aWR0aD1cIjMwMFwiIGhlaWdodD1cIjhcIiByeD1cIjRcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMudmlkZW9TbGlkZXJJY29uID0geyBvbkRhcms6IGdldFZpZGVvU2xpZGVyKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFZpZGVvU2xpZGVyKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldFNoYXJlUHJvdG90eXBlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjE4MFwiIGhlaWdodD1cIjE4MFwiIHZpZXdCb3g9XCIwIDAgMTgwIDE4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHJlY3Qgb3BhY2l0eT1cIjAuM1wiIHdpZHRoPVwiMTgwXCIgaGVpZ2h0PVwiMTgwXCIgcng9XCI5MFwiIGZpbGw9XCIjMDAwXCIvPlxuPGcgb3BhY2l0eT1cIjAuNlwiPlxuPHBhdGggZD1cIk0xMDEuNjcgNTcuNzU4Nkg4MC4xNzYyQzc2LjgzMTIgNTcuNzU4NiA3NC4wMjE2IDYwLjA1MDkgNzMuMjMyNSA2My4xNTAzQzcyLjk4ODUgNjQuMTA4OSA3Mi4yMDk1IDY0LjkyMzMgNzEuMjIwMyA2NC45MjMzSDY3LjYzNzlDNjYuNjQ4NiA2NC45MjMzIDY1LjgzNDkgNjQuMTE3NCA2NS45NTcxIDYzLjEzNTdDNjYuODM3IDU2LjA2NTQgNzIuODY3NiA1MC41OTM4IDgwLjE3NjIgNTAuNTkzOEgxMDEuNjdDMTA5LjU4NCA1MC41OTM4IDExNiA1Ny4wMDk0IDExNiA2NC45MjMzVjExNS4wNzdDMTE2IDEyMi45OTEgMTA5LjU4NCAxMjkuNDA2IDEwMS42NyAxMjkuNDA2SDgwLjE3NjJDNzIuODY3NiAxMjkuNDA2IDY2LjgzNyAxMjMuOTM1IDY1Ljk1NzEgMTE2Ljg2NEM2NS44MzQ5IDExNS44ODMgNjYuNjQ4NiAxMTUuMDc3IDY3LjYzNzkgMTE1LjA3N0g3MS4yMjAzQzcyLjIwOTUgMTE1LjA3NyA3Mi45ODg1IDExNS44OTEgNzMuMjMyNSAxMTYuODVDNzQuMDIxNiAxMTkuOTQ5IDc2LjgzMTIgMTIyLjI0MSA4MC4xNzYyIDEyMi4yNDFIMTAxLjY3QzEwNS42MjcgMTIyLjI0MSAxMDguODM1IDExOS4wMzQgMTA4LjgzNSAxMTUuMDc3VjY0LjkyMzNDMTA4LjgzNSA2MC45NjYzIDEwNS42MjcgNTcuNzU4NiAxMDEuNjcgNTcuNzU4NlpcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTY5LjI2NDcgMTAxLjgwNUw3OC42MDA0IDkyLjQ2MjlINDkuODM3OUM0OC40Nzc3IDkyLjQ2MjkgNDcuMzc1IDkxLjM2MDIgNDcuMzc1IDkwQzQ3LjM3NSA4OC42Mzk4IDQ4LjQ3NzcgODcuNTM3MSA0OS44Mzc5IDg3LjUzNzFINzguNjAwNEw2OS4yNjQ3IDc4LjE5NTFDNjguMzAzMiA3Ny4yMzI5IDY4LjMwMzggNzUuNjczNSA2OS4yNjU5IDc0LjcxMkM3MC4yMjggNzMuNzUwNSA3MS43ODc1IDczLjc1MTEgNzIuNzQ5IDc0LjcxMzJMODYuMjg1NiA4OC4yNTkxQzg3LjI0NjYgODkuMjIwOCA4Ny4yNDY2IDkwLjc3OTMgODYuMjg1NiA5MS43NDA5TDcyLjc0OSAxMDUuMjg3QzcxLjc4NzUgMTA2LjI0OSA3MC4yMjggMTA2LjI0OSA2OS4yNjU5IDEwNS4yODhDNjguMzAzOCAxMDQuMzI3IDY4LjMwMzIgMTAyLjc2NyA2OS4yNjQ3IDEwMS44MDVaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9nPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLnNoYXJlUHJvdG90eXBlSWNvbiA9IHsgb25EYXJrOiBnZXRTaGFyZVByb3RvdHlwZShjb2xvcl9vbkRhcmspLCBvbkxpZ2h0OiBnZXRTaGFyZVByb3RvdHlwZShjb2xvcl9vbkxpZ2h0KSB9XG5cblxuXG5cblxuXG5cblxuXG4jIFAgTCBBIFkgRSBSIOKAlCBJIEMgTyBOIFNcblxuZ2V0UGxheWVyUGxheSA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgdmlld0JveD1cIjAgMCA4MCA4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTI4LjM0OTQgMTguNTY2M0MyNS44MzI0IDE3LjAxNzUgMjIuNTkxOCAxOC44MjgzIDIyLjU5MTggMjEuNzgzN0wyMi41OTE4IDU4LjYzMjRDMjIuNTkxOCA2MS41ODc4IDI1LjgzMjUgNjMuMzk4NyAyOC4zNDk1IDYxLjg0OTdMNjAuODA3NSA0My40MjQ1QzYzLjIwNDYgNDEuOTQ5NCA2My4yMDQ1IDM4LjQ2NSA2MC44MDc0IDM2Ljk4OTlMMjguMzQ5NCAxOC41NjYzWlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJQbGF5SWNvbiA9IHsgb25EYXJrOiBnZXRQbGF5ZXJQbGF5KGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXllclBsYXkoY29sb3Jfb25MaWdodCkgfVxuXG5cbmdldFBsYXllclBhdXNlID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjgwXCIgaGVpZ2h0PVwiODBcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMjYuMzE1OCAxNi43MzY4QzIzLjI5MjggMTYuNzM2OCAyMC44NDIyIDE5LjE4NzUgMjAuODQyMiAyMi4yMTA1VjU3Ljc4OTRDMjAuODQyMiA2MC44MTI1IDIzLjI5MjggNjMuMjYzMSAyNi4zMTU4IDYzLjI2MzFIMzAuNDIxMUMzMy40NDQxIDYzLjI2MzEgMzUuODk0OCA2MC44MTI1IDM1Ljg5NDggNTcuNzg5NVYyMi4yMTA1QzM1Ljg5NDggMTkuMTg3NSAzMy40NDQxIDE2LjczNjggMzAuNDIxMSAxNi43MzY4SDI2LjMxNThaTTQ5LjU3OTMgMTYuNzM2OEM0Ni41NTYyIDE2LjczNjggNDQuMTA1NiAxOS4xODc1IDQ0LjEwNTYgMjIuMjEwNVY1Ny43ODk0QzQ0LjEwNTYgNjAuODEyNSA0Ni41NTYyIDYzLjI2MzEgNDkuNTc5MyA2My4yNjMxSDUzLjY4NDVDNTYuNzA3NiA2My4yNjMxIDU5LjE1ODIgNjAuODEyNSA1OS4xNTgyIDU3Ljc4OTVWMjIuMjEwNUM1OS4xNTgyIDE5LjE4NzUgNTYuNzA3NiAxNi43MzY4IDUzLjY4NDUgMTYuNzM2OEg0OS41NzkzWlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCJcblxuZXhwb3J0cy5wbGF5ZXJQYXVzZUljb24gPSB7IG9uRGFyazogZ2V0UGxheWVyUGF1c2UoY29sb3Jfb25EYXJrKSwgb25MaWdodDogZ2V0UGxheWVyUGF1c2UoY29sb3Jfb25MaWdodCkgfVxuXG5cblxuXG5nZXRQbGF5ZXJTb3VuZCA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgdmlld0JveD1cIjAgMCA4MCA4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk00MCAxNUgzNy41TDI3LjUgMjcuNUgyMEMxOC40NTczIDI3LjUgMTcuNjg2IDI3LjUgMTYuODkzIDI3Ljc3MzhDMTUuOTU5OSAyOC4wOTYgMTQuODYwMSAyOC45NTgzIDE0LjMyNDYgMjkuNzg3NUMxMy44Njk1IDMwLjQ5MjIgMTMuNzI1OSAzMS4wNzY1IDEzLjQzODggMzIuMjQ0OUMxMi44MTY3IDM0Ljc3NjkgMTIuNSAzNy4zODA1IDEyLjUgNDBDMTIuNSA0Mi42MTk1IDEyLjgxNjcgNDUuMjIzMSAxMy40Mzg4IDQ3Ljc1NTFDMTMuNzI1OSA0OC45MjM1IDEzLjg2OTUgNDkuNTA3OCAxNC4zMjQ2IDUwLjIxMjVDMTQuODYwMSA1MS4wNDE3IDE1Ljk1OTkgNTEuOTA0IDE2Ljg5MyA1Mi4yMjYyQzE3LjY4NiA1Mi41IDE4LjQ1NzMgNTIuNSAyMCA1Mi41SDI3LjVMMzcuNSA2NUg0MEM0My4wNSA2NSA0Ni4yNSA1NSA0Ni4yNSAzOS45NTczQzQ2LjI1IDI0LjkxNDcgNDMuMTgzMyAxNSA0MCAxNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTUyLjUgMzkuOTc2M0M1Mi40OTUgMzcuMzQyMyA1MS42NTggMzQuNzc3MiA1MC4xMDg2IDMyLjY0N0w1NC4xNTIxIDI5LjcwNTlDNTYuMzIxMyAzMi42ODggNTcuNDkzIDM2LjI3OTIgNTcuNSAzOS45NjY4QzU3LjUwNyA0My42NTQ0IDU2LjM0ODkgNDcuMjUgNTQuMTkxIDUwLjI0MDRMNTAuMTM2NCA0Ny4zMTQ2QzUxLjY3NzggNDUuMTc4NiA1Mi41MDUgNDIuNjEwMyA1Mi41IDM5Ljk3NjNaXCIgZmlsbD1cIndoaXRlXCIvPlxuPHBhdGggZD1cIk01OC4xOTU1IDI2Ljc2NDdDNjAuOTg0NSAzMC41OTg5IDYyLjQ5MSAzNS4yMTYxIDYyLjUgMzkuOTU3M0M2Mi41MDkgNDQuNjk4NiA2MS4wMiA0OS4zMjE1IDU4LjI0NTYgNTMuMTY2Mkw2Mi4zMDAxIDU2LjA5MjFDNjUuNjkxMSA1MS4zOTI5IDY3LjUxMDkgNDUuNzQyNyA2Ny41IDM5Ljk0NzlDNjcuNDg5IDM0LjE1MyA2NS42NDc3IDI4LjUwOTcgNjIuMjM4OSAyMy44MjM1TDU4LjE5NTUgMjYuNzY0N1pcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGxheWVyU291bmRJY29uID0geyBvbkRhcms6IGdldFBsYXllclNvdW5kKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXllclNvdW5kKGNvbG9yX29uTGlnaHQpIH1cblxuXG5nZXRQbGF5ZXJTb3VuZE9mZiA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSB3aXRoQ29sb3Jcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI4MFwiIGhlaWdodD1cIjgwXCIgdmlld0JveD1cIjAgMCA4MCA4MFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk00NSAxNUg0Ny41QzUwLjY4MzMgMTUgNTMuNiAyNC43MjIyIDUzLjYgNDBDNTMuNiA0MS43NDA2IDUzLjU2MDQgNDMuNDA5IDUzLjQ4NTggNDQuOTk5MkwzOC4zMjYgMjMuMzQyNEw0NSAxNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48cGF0aCBkPVwiTTMxLjIzNjMgMjcuNUgyNy41QzI1Ljk1NzMgMjcuNSAyNS4xODYgMjcuNSAyNC4zOTMgMjcuNzczOEMyMy40NTk5IDI4LjA5NiAyMi4zNjAxIDI4Ljk1ODMgMjEuODI0NiAyOS43ODc1QzIxLjM2OTUgMzAuNDkyMiAyMS4yMjU5IDMxLjA3NjUgMjAuOTM4OCAzMi4yNDQ5QzIwLjMxNjcgMzQuNzc2OSAyMCAzNy4zODA1IDIwIDQwQzIwIDQyLjYxOTUgMjAuMzE2NyA0NS4yMjMxIDIwLjkzODggNDcuNzU1MUMyMS4yMjU5IDQ4LjkyMzYgMjEuMzY5NSA0OS41MDc4IDIxLjgyNDYgNTAuMjEyNUMyMi4zNjAxIDUxLjA0MTcgMjMuNDU5OSA1MS45MDQgMjQuMzkzIDUyLjIyNjJDMjUuMTg2IDUyLjUgMjUuOTU3MyA1Mi41IDI3LjUgNTIuNUgzNUw0NSA2NUg0Ny41QzQ5LjE1MDcgNjUgNTAuODAxNCA2Mi4xNTIzIDUxLjk2ODUgNTcuMTE3NUw1Ny41IDY1LjAxOTVINjMuNzVMMjguNzUgMTUuMDE5NUgyMi41TDMxLjIzNjMgMjcuNVpcIiBmaWxsPVwid2hpdGVcIi8+XG48L3N2Zz5cblx0XCJcIlwiXG5cbmV4cG9ydHMucGxheWVyU291bmRPZmZJY29uID0geyBvbkRhcms6IGdldFBsYXllclNvdW5kT2ZmKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldFBsYXllclNvdW5kT2ZmKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cbmdldE9wZW5JY29uID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IHdpdGhDb2xvclxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjQ4XCIgaGVpZ2h0PVwiNDhcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTE0LjA4MjEgOS44NDMyOEMxNC4wODIxIDEwLjg4OTUgMTQuODQ1MiAxMS42NyAxNS45MDY5IDExLjY3SDE3LjA4NDdMMzYuMjI3MyAxMS4zMjEyTDMyLjE5NjEgMTUuMTU3MkwxMy40MTg1IDMzLjkwNjZDMTMuMDUzNiAzNC4yNTUzIDEyLjg4NzcgMzQuNzAzNyAxMi44ODc3IDM1LjE4NTNDMTIuODg3NyAzNi4zMTQ1IDEzLjY1MDggMzcuMTI4MiAxNC43Nzg4IDM3LjEyODJDMTUuMjkzMSAzNy4xMjgyIDE1Ljc0MSAzNi45Mjg5IDE2LjEwNTkgMzYuNTgwMkwzNC44NjcgMTcuODE0MkwzOC42ODI0IDEzLjc2MjNMMzguMzM0IDMyLjk0MzRWMzQuMjM4N0MzOC4zMzQgMzUuMjg0OSAzOS4wOTcxIDM2LjA4MiA0MC4xNTg4IDM2LjA4MkM0MS4yMjA1IDM2LjA4MiA0Mi4wMDAyIDM1LjMwMTUgNDIuMDAwMiAzNC4yMzg3VjExLjAyMjNDNDIuMDAwMiA5LjExMjYxIDQwLjg4ODcgOCAzOC45ODEgOEwxNS45MDY5IDhDMTQuODYxOCA4IDE0LjA4MjEgOC43ODA0OSAxNC4wODIxIDkuODQzMjhaXCIgZmlsbD1cIndoaXRlXCIvPlxuPC9zdmc+XG5cdFwiXCJcIlxuXG5leHBvcnRzLm9wZW5JY29uID0geyBvbkRhcms6IGdldE9wZW5JY29uKGNvbG9yX29uRGFyayksIG9uTGlnaHQ6IGdldE9wZW5JY29uKGNvbG9yX29uTGlnaHQpIH1cblxuXG5cblxuXCJcIlwiPHN2ZyB3aWR0aD1cIjQ4XCIgaGVpZ2h0PVwiNDhcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTM4IDE1TDE1IDM4LjQyNDFMMTEuNTc2MiAzNUwzNSAxMkgxNFY4SDQyVjM2SDM4VjE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cbjwvc3ZnPlxuXHRcIlwiXCIiLCJcblNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbkJ1dHRvbnMgPSByZXF1aXJlKFwiUENCdXR0b25zXCIpXG5TVkdCdXR0b24gPSBCdXR0b25zLlNWR0J1dHRvblxuXG5jbGFzcyBleHBvcnRzLlBsYXllclNsaWRlciBleHRlbmRzIFNsaWRlckNvbXBvbmVudFxuXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0QHZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwic2xpZGVyVmlld1wiXG5cdFx0XHR3aWR0aDogMjYwICogMiwgaGVpZ2h0OiA1NiAqIDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMjUpXCJcblx0XHRcdGJvcmRlclJhZGl1czogMTggKiAyXG5cdFx0XG5cdFx0QHZpZXcuZHJhZ2dhYmxlLmVuYWJsZWQgPSB0cnVlXG5cdFx0QHZpZXcuZHJhZ2dhYmxlLnNwZWVkWCA9IDBcblx0XHRAdmlldy5kcmFnZ2FibGUuc3BlZWRZID0gMFxuXHRcdEB2aWV3LmRyYWdnYWJsZS5wcm9wYWdhdGVFdmVudHMgPSBmYWxzZVxuXG5cblxuXHRcdEBwbGF5QnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdmlldywgbmFtZTogXCJwbGF5QnV0dG9uXCJcblx0XHRcdHdpZHRoOiA0MCAqIDIsIGhlaWdodDogNDAgKiAyXG5cdFx0XHR4OiAxMiAqIDJcblx0XHRcdHk6IEFsaWduLmNlbnRlclxuXHRcdFx0YXNzZXQ6IFNWRy5wbGF5ZXJQYXVzZUljb25cblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdEBwbGF5QnV0dG9uLnN0YXRlcyA9XG5cdFx0XHRcInBsYXlpbmdcIjogeyBhc3NldDogU1ZHLnBsYXllclBhdXNlSWNvbiB9XG5cdFx0XHRcInBhdXNlZFwiOiB7IGFzc2V0OiBTVkcucGxheWVyUGxheUljb24gfVxuXHRcdEBwbGF5QnV0dG9uLnN0YXRlU3dpdGNoKFwicGxheWluZ1wiKVxuXHRcdFxuXHRcdFxuXG5cdFx0QHNvdW5kQnV0dG9uID0gbmV3IFNWR0J1dHRvblxuXHRcdFx0cGFyZW50OiBAdmlld1xuXHRcdFx0d2lkdGg6IDQwICogMiwgaGVpZ2h0OiA0MCAqIDJcblx0XHRcdHg6ICgxMiArIDQwICsgOCkgKiAyXG5cdFx0XHR5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGFzc2V0OiBTVkcucGxheWVyU291bmRJY29uXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRAc291bmRCdXR0b24uc3RhdGVzID1cblx0XHRcdFwic291bmRcIjogeyBhc3NldDogU1ZHLnBsYXllclNvdW5kSWNvbiB9XG5cdFx0XHRcIm11dGVkXCI6IHsgYXNzZXQ6IFNWRy5wbGF5ZXJTb3VuZE9mZkljb24gfVxuXHRcdEBzb3VuZEJ1dHRvbi5zdGF0ZVN3aXRjaChcIm11dGVkXCIpXG5cdFx0XG5cblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHBhcmVudCA9IEB2aWV3XG5cdFx0QG5hbWUgPSBcInZpZGVvU2xpZGVyXCJcblx0XHRcblx0XHRAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoIC0gKCgxMiArIDQwICsgOCArIDQwICsgMTYpICsgMjApICogMlxuXHRcdEBoZWlnaHQgPSA0ICogMlxuXHRcdEB4ID0gKDEyICsgNDAgKyA4ICsgNDAgKyAxNikgKiAyXG5cdFx0QHkgPSBBbGlnbi5jZW50ZXJcblx0XHRAa25vYlNpemUgPSAyNCAqIDJcblx0XHRcblx0XHQjIDEyICsgNDAgKyA4ICsgNDAgKyAxNiArIGZsZXggKyAyMFxuXG5cdFx0QHNsaWRlck92ZXJsYXkuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpXCJcblx0XHQjIEBzbGlkZXJPdmVybGF5LmJhY2tncm91bmRDb2xvciA9IFwicmVkXCJcblx0XHRAc2xpZGVyT3ZlcmxheS53aWR0aCA9IEB3aWR0aFxuXHRcdEBzbGlkZXJPdmVybGF5LmhlaWdodCA9IDQgKiAyXG5cdFx0QHNsaWRlck92ZXJsYXkueCA9IDBcblx0XHRAc2xpZGVyT3ZlcmxheS55ID0gMFxuXHRcdEBzbGlkZXJPdmVybGF5Lmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcblx0XHRAZmlsbC5iYWNrZ3JvdW5kQ29sb3IgPSBcIndoaXRlXCJcblx0XHRAZmlsbC5vcGFjaXR5ID0gMC4zXG5cdFx0XG5cdFx0QGtub2IuYmFja2dyb3VuZENvbG9yID0gXCJudWxsXCJcblx0XHRAa25vYi5vcGFjaXR5ID0gMVxuXHRcdEBrbm9iLmRyYWdnYWJsZS5tb21lbnR1bSA9IGZhbHNlXG5cdFx0QGtub2IuZHJhZ2dhYmxlLnByb3BhZ2F0ZUV2ZW50cyA9IGZhbHNlXG5cdFx0QGtub2Iuc2hhZG93Q29sb3IgPSBudWxsXG5cdFx0QGtub2Iuc2hhZG93WSA9IDBcblx0XHRcblx0XHRrbm9iQ3Vyc29yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBrbm9iXG5cdFx0XHR3aWR0aDogNCAqIDIsIGhlaWdodDogMzIgKiAyXG5cdFx0XHR4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNkZGRcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0ICogMlxuXHRcdFxuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0bGF5ZXIudmFsdWUgPSBVdGlscy5tb2R1bGF0ZShldmVudC5wb2ludC54LCBbMCwgQHNsaWRlck92ZXJsYXkud2lkdGhdLCBbMCwgMV0sIHRydWUpXG5cdFx0XG5cdFx0XG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRcblx0SG92ZXI6ID0+XG4jIFx0XHRAb3BhY2l0eSA9IDFcblx0SG92ZXJPZmY6ID0+XG4jIFx0XHRAb3BhY2l0eSA9IDAuNVxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHR1cGRhdGVGb3JTY2FsZURvd246ICgpIC0+XG5cdFx0QHZpZXcud2lkdGggPSA4MDAgKiAyXG5cdFx0QHZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdEB2aWV3LnkgPSBBbGlnbi5ib3R0b20oLTMyICogMilcblxuXHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoIC0gKCgxMiArIDQwICsgOCArIDQwICsgMTYpICsgMjApICogMlxuXHRcdEBoZWlnaHQgPSA0ICogMlxuXG5cdFx0IyBwcmludCBAc2xpZGVyT3ZlcmxheS53aWR0aFxuXHRcdEBzbGlkZXJPdmVybGF5LndpZHRoID0gQHdpZHRoXG5cdFx0QHNsaWRlck92ZXJsYXkuaGVpZ2h0ID0gNCAqIDJcblx0XHRAc2xpZGVyT3ZlcmxheS54ID0gMFxuXHRcdEBzbGlkZXJPdmVybGF5LnkgPSAwXG5cdFx0IyBwcmludCBAc2xpZGVyT3ZlcmxheS53aWR0aFxuXG5cdFx0IyBAcGxheWVyU2xpZGVyLndpZHRoID0gQHdpZHRoIC0gMzAwICogMiAqIDJcblx0XHQjIEBwbGF5ZXJTbGlkZXIueCA9IEFsaWduLmxlZnQoMzAwICogMilcblx0XHQjIEBwbGF5ZXJTbGlkZXIueSA9IEFsaWduLmJvdHRvbSgtMzIgKiAyKSIsIlxuU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuIyBUZXh0LCBCdXR0b25cblxuIyBmb250QXZlcmlhID0gVXRpbHMubG9hZFdlYkZvbnQoXCJOdW5pdG9cIiwgODAwKVxuIyBmb250QXZlcmlhID0gVXRpbHMubG9hZFdlYkZvbnQoXCJSYWxld2F5XCIsIDcwMClcbmZvbnRBdmVyaWEgPSBcIlJhbGV3YXlcIlxuXG5jbGFzcyBUZXh0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGZvbnRGYW1pbHk6IGZvbnRBdmVyaWFcblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0d2VpZ2h0OiA3MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuN1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC40XG4jIFx0XHRcdHRleHRPdmVyZmxvdzogXCJlbGxpcHNpc1wiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzdHlsZSA9XG5cdFx0XHRcImZvbnQtZmFtaWx5XCI6IFwiUmFsZXdheSwgJ1BUIFNhbnMnLCAnSGVsdmV0aWNhJywgJ1RhaG9tYScsIHNhbnMtc2VyaWY7XCJcblx0XHRcdFwiZm9udC13ZWlnaHRcIjogNzAwXG5cdFx0XHRcIi13ZWJraXQtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tb3otZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tcy1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XG5cblxuXG5cblxuY2xhc3MgVGV4dEJ1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAwLjUsIGhvdmVyOiAwLjggfVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cblx0XHRAdXBkYXRlVHVwbGUoQHR1cGxlKVxuXHRcblx0XG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLmhvdmVyXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLm5vcm1hbFxuXHRcblx0dXBkYXRlVHVwbGU6IChuZXdUdXBsZSkgPT5cblx0XHRAdHVwbGUgPSBuZXdUdXBsZVxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU92ZXJcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdXRcblx0XG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0QGRlZmluZSAndHVwbGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudHVwbGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnR1cGxlID0gdmFsdWVcblxuXG5cblxuXG4jIEJ1dHRvbjogU1ZHXG5cbmNsYXNzIFNWR0J1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dGV4dDogXCJcIlxuXHRcdFx0YXNzZXQ6IG51bGxcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRhdXRvU2l6ZTogZmFsc2Vcblx0XHRcblx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcblx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcblx0QGRlZmluZSAnYXNzZXQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmFzc2V0ID0gdmFsdWVcblx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cblx0XHRcdFx0XCJvbkxpZ2h0XCI6IHsgc3ZnOiB2YWx1ZS5vbkxpZ2h0IH1cblx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcblx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cblx0XHRAc3ZnU2hhcGUud2lkdGggPSBAd2lkdGhcblx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuY2xhc3MgQ29weUJ1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcblx0XHRcdGhhbmRsZXI6IEBjb3B5SGFuZGxlclxuXHRcdFxuXHRcdEBhcmVhID0gbmV3IExheWVyXG5cdFx0XHRvcGFjaXR5OiAwLCB4OiAtMzAwMCwgaHRtbDogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QGFyZWEucGFyZW50ID0gQFxuXHRcblx0XG5cdEBkZWZpbmUgJ2xpbmsnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMubGlua1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMubGluayA9IHZhbHVlXG5cdFx0XHRAdXBkYXRlKHZhbHVlKVxuXHRcblx0XG5cdHVwZGF0ZTogKGxpbmspID0+XG5cdFx0QGFyZWEuaHRtbCA9IFwiPHRleHRhcmVhIGNsYXNzPSdqcy1jb3B5dGV4dGFyZWEtY2xhc3MnIHN0eWxlPSdvcGFjaXR5OjA7Jz4je2xpbmt9PC90ZXh0YXJlYT5cIlxuXHRcblx0XG5cdGNvcHlIYW5kbGVyOiA9PlxuXHRcdHRleHREaXYgPSBAYXJlYS5xdWVyeVNlbGVjdG9yKCcuanMtY29weXRleHRhcmVhLWNsYXNzJylcblx0XHR0ZXh0RGl2LmZvY3VzKClcblx0XHR0ZXh0RGl2LnNlbGVjdCgpXG5cdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgJ2NvcHknXG5cdFx0XG5cdFx0b3JpZ2luVGl0bGUgPSBAdGV4dFxuXHRcdEB0ZXh0ID0gXCJEb25lIPCfkYxcIlxuXHRcdFV0aWxzLmRlbGF5IDEsID0+IEB0ZXh0ID0gb3JpZ2luVGl0bGVcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuY2xhc3MgTGlua0J1dHRvbiBleHRlbmRzIFNWR0J1dHRvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFx0Ym9yZGVyV2lkdGg6IDEgKiAyXG5cdFx0XHRib3JkZXJSYWRpdXM6IDIwICogMlxuXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFx0XG5cdFx0XG5cdFx0QHRpbnRCdXR0b25GaXggPSBuZXcgTGF5ZXJcblx0XHRcdGhlaWdodDogMTIwICogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0QGJ1dHRvblRleHQgPSBuZXcgVGV4dFxuXHRcdFx0Zm9udFNpemU6IDMyICogMlxuXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcblx0XHRcdGhlaWdodDogNjAgKiAyXG5cdFx0XG5cdFx0QGJ1dHRvbkljb24gPSBuZXcgU1ZHTGF5ZXJcblx0XHRcdHdpZHRoOiAyNCAqIDIsIGhlaWdodDogMjQgKiAyXG5cdFx0XHRzdmc6IFNWRy5vcGVuSWNvbi5vbkxpZ2h0XG5cdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdFxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBidXR0b25UZXh0LnRleHQgPSBAdGV4dFxuXHRcdEB0ZXh0ID0gXCJcIlxuXG5cdFx0QHRpbnRCdXR0b25GaXgucGFyZW50ID0gQHBhcmVudFxuXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuXHRcdEB0aW50QnV0dG9uRml4LnkgPSBBbGlnbi50b3Bcblx0XHRcblx0XHRAcGFyZW50ID0gQHRpbnRCdXR0b25GaXhcblx0XHRAeSA9IEFsaWduLnRvcCgzMCAqIDIpXG5cdFx0QGhlaWdodCA9IDYwICogMlxuXG5cdFx0QGJ1dHRvblRleHQucGFyZW50ID0gQFxuXHRcdEBidXR0b25UZXh0LnggPSAxNiAqIDJcblx0XHRAYnV0dG9uVGV4dC55ID0gOSAqIDJcblxuXHRcdEBidXR0b25JY29uLnBhcmVudCA9IEBcblx0XHRAYnV0dG9uSWNvbi54ID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyAxNiAqIDJcblx0XHRAYnV0dG9uSWNvbi55ID0gQWxpZ24uY2VudGVyKDMgKiAyKVxuXG5cdFx0QHdpZHRoID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyBAYnV0dG9uSWNvbi53aWR0aCArIDE2ICogMiArIDE2ICogMlxuXHRcdEB0aW50QnV0dG9uRml4LndpZHRoID0gQHdpZHRoICsgMzAgKiAyICsgMTYgKiAyXG5cblx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcblx0XHRAeCA9IEFsaWduLnJpZ2h0KC0zMCAqIDIpXG5cdFx0XG5cdFxuXG5cdEBkZWZpbmUgJ2xpbmsnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMubGlua1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XG5cdHNldENvbG9yOiAoY29sb3IgPSBudWxsKSA9PlxuXHRcdGlmIGNvbG9yID09IG51bGwgdGhlbiByZXR1cm5cblx0XHRAdGludEJ1dHRvbkZpeC5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcblxuXG5cblxuXG5cblxuXG5jbGFzcyBQcmV2aWV3QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHJlbW92ZUFsbExpc3RlbmVycygpXG5cblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuXHRIb3ZlcjogPT5cblx0XHQjIEBzY2FsZSA9IDEuMDVcblx0XHRAb3BhY2l0eSA9IDEuMFxuXHRcblx0SG92ZXJPZmY6ID0+XG5cdFx0IyBAc2NhbGUgPSAxLjBcblx0XHRAb3BhY2l0eSA9IDAuOFxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1RleHQsIFRleHRCdXR0b24sIFNWR0J1dHRvbiwgQ29weUJ1dHRvbiwgTGlua0J1dHRvbiwgUHJldmlld0J1dHRvbn1cblxuXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQWdCQUE7QURDQSxJQUFBLG1GQUFBO0VBQUE7Ozs7QUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLE9BQVI7O0FBTU4sVUFBQSxHQUFhOztBQUVQOzs7RUFDUSxjQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxVQUFBLEVBQVksVUFBWjtNQUNBLFFBQUEsRUFBVSxFQURWO01BRUEsTUFBQSxFQUFRLEdBRlI7TUFHQSxLQUFBLEVBQU8s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
