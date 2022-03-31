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
  notch: "modules/PreviewComponentAssets/statusBar_notch.png"
};


},{}],"PreviewComponent":[function(require,module,exports){
var Assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assets = require("PreviewComponentAssets");

exports.Preview = (function(superClass) {
  extend(Preview, superClass);

  function Preview(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createBars = bind(this.createBars, this);
    this.logSize = bind(this.logSize, this);
    this.setCustomPreview = bind(this.setCustomPreview, this);
    this.previewMobile = bind(this.previewMobile, this);
    this.previewDesktop = bind(this.previewDesktop, this);
    this.viewWidth = bind(this.viewWidth, this);
    this.viewSize = bind(this.viewSize, this);
    this.screenSize = bind(this.screenSize, this);
    this.scalePreview = bind(this.scalePreview, this);
    _.defaults(this.options, {
      view: null,
      prototypeCreationYear: "20:22",
      name: "Preview",
      backgroundColor: null,
      borderRadius: 42,
      visible: true,
      topTheme: "dark",
      bottomTheme: "dark",
      assets: Assets.data
    });
    Preview.__super__.constructor.call(this, this.options);
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

  Preview.prototype.scalePreview = function() {
    if (Utils.isMobile()) {
      return this.previewMobile();
    } else {
      return this.previewDesktop();
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

  Preview.prototype.previewDesktop = function() {
    Canvas.backgroundColor = "#222";
    this.createBars();
    this.center();
    return this.clip = true;
  };

  Preview.prototype.previewMobile = function() {
    var previewCanvas;
    previewCanvas = new BackgroundLayer({
      backgroundColor: "#000",
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
    if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926)) {
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
    } else if (this.viewSize(375, 667) || this.viewSize(414, 736)) {
      return this.createClassicStatusBar(topBar);
    }
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
      backgroundColor: "rgba(0,0,0,0.2)",
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


},{"PreviewComponentAssets":"PreviewComponentAssets"}],"iOSSegmentedControl":[function(require,module,exports){

/*
     * iOSSegmentedControl
    {iOSSegmentedControl} = require "iOSSegmentedControl"

    segControl = new iOSSegmentedControl
         * OPTIONAL
        items: <array> (strings for each segment title)
        tintColor: <color> (defaults to iOS blue)
        backgroundColor: <color> (defaults to white)
        width: <number> (defaults to Screen.width with 16dp padding)
        height: <number> (defaults to 29)
        isMomentary: <bool> (don't highlight items on tap), defaults to false)

    segControl.setSelected <bool>, <number>
         * if bool=true, select, or if bool=false, unselect the segment at index <number>

    segControl.insertSegment <string>, <number> optional
         * add a new segment with the name <string>
         * optionally specify the index to insert the new segment at
         * by default, insert in the last postion

    segControl.removeSegment <number>
         * remove the segment at index <number>

    segControl.setTitle <string>, <number>
         * change the title to <string> of the segment at index <number>

    segControl.setWidth <number>, <number>
         * hard-set width of segment at the second <number> index to the first <number>

     * Observe the "change:currentSegment" event
    navBar.on "change:currentSegment", (currentSegment, lastSegment) ->
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.iOSSegmentedControl = (function(superClass) {
  extend(iOSSegmentedControl, superClass);

  function iOSSegmentedControl(options) {
    var item, j, len, ref;
    if (options == null) {
      options = {};
    }
    this._touchEnd = bind(this._touchEnd, this);
    this.HPADDING = 16;
    this.HEIGHT = 29;
    options = _.defaults({}, options, {
      items: [],
      tintColor: "#007AFF",
      backgroundColor: "#FFFFFF",
      width: Screen.width - this.HPADDING * 2,
      height: this.HEIGHT,
      x: this.HPADDING,
      isMomentary: false,
      clip: true
    });
    iOSSegmentedControl.__super__.constructor.call(this, options);
    this.tintColor = options.tintColor;
    this.isMomentary = options.isMomentary;
    this.borderWidth = 1;
    this.borderRadius = 4;
    this._backgroundColor = options.backgroundColor;
    this._segments = [];
    ref = options.items;
    for (j = 0, len = ref.length; j < len; j++) {
      item = ref[j];
      this._addSegment(item);
    }
    this._layoutSegments();
    this._touchDown = false;
  }

  iOSSegmentedControl.prototype._segmentForEvent = function(event) {
    var aLayer, j, len, point, ref, touchEvent;
    touchEvent = Events.touchEvent(event);
    point = {
      x: touchEvent.clientX,
      y: touchEvent.clientY
    };
    point = Utils.convertPoint(point, void 0, this, true);
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      aLayer = ref[j];
      if (Utils.pointInFrame(point, aLayer.frame)) {
        return aLayer;
      }
    }
    return void 0;
  };

  iOSSegmentedControl.prototype._addSegment = function(title, index) {
    var segment, titleText;
    segment = new Layer({
      height: this.height,
      backgroundColor: this._backgroundColor,
      parent: this,
      name: ".Segment" + this._segments.length
    });
    segment.onTouchStart((function(_this) {
      return function(event, layer) {
        _this._touchDown = true;
        Events.wrap(document).addEventListener("tapend", _this._touchEnd);
        if (layer === _this._selectedItem) {
          return;
        }
        return layer.backgroundColor = new Color(_this._tintColor).alpha(.1);
      };
    })(this));
    segment.onTouchMove((function(_this) {
      return function(event, layer) {
        layer = _this._segmentForEvent(event);
        if (layer === void 0) {
          return;
        }
        _this._unselectAll();
        if (layer === _this._selectedItem) {
          return;
        }
        if (_this._touchDown) {
          return layer.backgroundColor = new Color(_this._tintColor).alpha(.1);
        }
      };
    })(this));
    segment.onTouchEnd((function(_this) {
      return function(event, layer) {
        layer = _this._segmentForEvent(event);
        if (layer === void 0) {
          return;
        }
        return _this._selectItem(layer);
      };
    })(this));
    titleText = new TextLayer({
      text: title,
      parent: segment,
      name: ".Label",
      color: this._tintColor,
      fontSize: 17,
      fontWeight: 400,
      textAlign: "center",
      width: segment.width
    });
    segment.title = title;
    segment.label = titleText;
    titleText.fontSize = 13;
    if (index != null) {
      return this._segments.splice(index, 0, segment);
    } else {
      return this._segments.push(segment);
    }
  };

  iOSSegmentedControl.prototype._touchEnd = function(event, layer) {
    this._touchDown = false;
    return this._unselectAll();
  };

  iOSSegmentedControl.prototype._layoutSegments = function() {
    var i, j, k, label, len, len1, nextX, ref, remainingWidth, segment, segmentsWithExplicitWidth, wSegment;
    ref = this._segments;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      segment = ref[i];
      segment.index = i;
      if (segment.hasExplicitWidth == null) {
        segmentsWithExplicitWidth = _.filter(this._segments, function(o) {
          return o.hasExplicitWidth != null;
        });
        remainingWidth = this.width;
        for (k = 0, len1 = segmentsWithExplicitWidth.length; k < len1; k++) {
          wSegment = segmentsWithExplicitWidth[k];
          remainingWidth -= wSegment.width;
        }
        segment.width = Math.round(remainingWidth / (this._segments.length - segmentsWithExplicitWidth.length));
      }
      segment.x = nextX;
      nextX = segment.maxX;
      segment.style.borderRight = "1px solid " + this._tintColor;
      segment.style.borderRadius = "0";
      if (i === 0) {
        segment.style.borderRadius = "4px 0 0 4px";
      }
      if (i === this._segments.length - 1) {
        if (this._segments.length === 1) {
          segment.style.borderRadius = "4px";
        } else {
          segment.style.borderRight = "";
          segment.style.borderRadius = "0 4px 4px 0";
        }
      }
      label = segment.children[0];
      if (label != null) {
        label.width = segment.width;
      }
      if (label != null) {
        label.center();
      }
    }
    return this.width = nextX;
  };

  iOSSegmentedControl.prototype._selectItem = function(item) {
    var oldItem;
    if (item === this._selectedItem) {
      return;
    }
    if (!this.isMomentary) {
      oldItem = this._selectedItem;
      this._selectedItem = item;
      this._unselectItem(oldItem);
      this._highlightItem(this._selectedItem);
    } else {
      this._unselectItem(item);
    }
    return this.emit("change:currentSegment", item, oldItem);
  };

  iOSSegmentedControl.prototype._unselectAll = function() {
    var j, len, ref, results, segment;
    ref = this._segments;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      segment = ref[j];
      if (segment !== this._selectedItem) {
        results.push(this._removeHighlight(segment));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  iOSSegmentedControl.prototype._unselectItem = function(item, isClearing) {
    if (item != null) {
      this._removeHighlight(item);
    }
    if (isClearing) {
      this._selectedItem = null;
      return this.emit("change:currentSegment", null, item);
    }
  };

  iOSSegmentedControl.prototype._highlightItem = function(item) {
    item.backgroundColor = this._tintColor;
    return item.label.color = this._backgroundColor;
  };

  iOSSegmentedControl.prototype._removeHighlight = function(item) {
    item.backgroundColor = this._backgroundColor;
    return item.label.color = this._tintColor;
  };

  iOSSegmentedControl.prototype._layout = function() {
    this.width = Screen.width - this.HPADDING * 2;
    return this._layoutSegments();
  };

  iOSSegmentedControl.define("isMomentary", {
    get: function() {
      return this._isMomentary;
    },
    set: function(value) {
      return this._isMomentary = value;
    }
  });

  iOSSegmentedControl.define("tintColor", {
    get: function() {
      return this._tintColor;
    },
    set: function(value) {
      var j, len, ref, ref1, ref2, segment;
      this.borderColor = value;
      if (this._segments) {
        ref = this._segments;
        for (j = 0, len = ref.length; j < len; j++) {
          segment = ref[j];
          segment.label.color = value;
          segment.style.borderRight = "1px solid " + value;
        }
      }
      if ((ref1 = this._selectedItem) != null) {
        ref1.backgroundColor = value;
      }
      if ((ref2 = this._selectedItem) != null) {
        ref2.label.color = this._backgroundColor;
      }
      return this._tintColor = value;
    }
  });

  iOSSegmentedControl.define("numberOfSegments", {
    get: function() {
      var ref;
      return (ref = this._segments) != null ? ref.length : void 0;
    }
  });

  iOSSegmentedControl.define("selectedSegmentIndex", {
    get: function() {
      var ref;
      return (ref = this._selectedItem) != null ? ref.index : void 0;
    }
  });

  iOSSegmentedControl.define("autoLayout", {
    get: function() {
      return this._autoLayout;
    },
    set: function(value) {
      return this._autoLayout = value;
    }
  });

  iOSSegmentedControl.prototype.setSelected = function(isSelected, index) {
    var segment;
    segment = this._segments[index];
    if (isSelected) {
      return this._selectItem(segment);
    } else {
      return this._unselectItem(segment, true);
    }
  };

  iOSSegmentedControl.prototype.insertSegment = function(title, index) {
    if (index == null) {
      index = this._segments.length;
    }
    this._addSegment(title, index);
    return this._layoutSegments();
  };

  iOSSegmentedControl.prototype.removeSegment = function(index) {
    if (this._segments[index] != null) {
      this._segments[index].destroy();
      this._segments.splice(index, 1);
      return this._layoutSegments();
    }
  };

  iOSSegmentedControl.prototype.removeAllSegments = function() {
    var results;
    results = [];
    while (this._segments.length > 0) {
      results.push(this.removeSegment(0));
    }
    return results;
  };

  iOSSegmentedControl.prototype.setTitle = function(title, index) {
    var ref;
    return (ref = this._segments[index]) != null ? ref.label.text = title : void 0;
  };

  iOSSegmentedControl.prototype.setWidth = function(width, index) {
    var ref, ref1, ref2;
    if (width != null) {
      if ((ref = this._segments[index]) != null) {
        ref.hasExplicitWidth = (ref1 = this._segments[index]) != null ? ref1.width = width : void 0;
      }
    } else {
      if ((ref2 = this._segments[index]) != null) {
        ref2.hasExplicitWidth = null;
      }
    }
    return this._layoutSegments();
  };

  iOSSegmentedControl.prototype.autoWidthLayout = function() {
    this.width = Screen.width - this.HPADDING * 2;
    return this._layoutSegments();
  };

  return iOSSegmentedControl;

})(Layer);


},{}],"iOSSwitch":[function(require,module,exports){

/*
	 * iOSSwitch
	{iOSSwitch} = require "iOSSwitch"

	switch = new iOSSwitch
		isOn: <bool> is the switch in the on position (defaults to false)
		tintColor: <color> the color of the switch background when isOn is true (defaults to iOS green)
		thumbTintColor: <color> the color of the switch thumb (defaults to white)

	 * Observe the "Events.ValueChange" event
	switch.onValueChange (value) ->
 */
var Switch, iOSKitColors,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

iOSKitColors = {
  red: new Color("FF3B30"),
  green: new Color("4CD964"),
  blue: new Color("007AFF"),
  black: new Color("000"),
  gray: new Color("8E8E93"),
  grey: new Color("8E8E93"),
  white: new Color("fff"),
  transparent: new Color("transparent")
};

Events.SwitchValueChange = "switchValueChange";

Switch = (function(superClass) {
  extend(Switch, superClass);

  function Switch(options) {
    var rimColor;
    if (options == null) {
      options = {};
    }
    options = _.defaults({}, options, {
      width: 51,
      height: 31,
      backgroundColor: iOSKitColors.transparent,
      tintColor: iOSKitColors.green,
      thumbTintColor: iOSKitColors.white,
      isOn: false
    });
    Switch.__super__.constructor.call(this, options);
    rimColor = "E5E5EA";
    this.base = new Layer({
      name: ".base",
      parent: this,
      width: this.width,
      height: this.height,
      backgroundColor: iOSKitColors.transparent,
      borderRadius: 20,
      borderColor: rimColor,
      borderWidth: 1.5,
      shadowColor: rimColor,
      shadowType: "inner"
    });
    this.base.states.on = {
      borderWidth: 0,
      shadowColor: this.tintColor,
      shadowSpread: 20
    };
    this.base.animationOptions = {
      time: 0.6,
      curve: Spring({
        damping: 0.75
      })
    };
    this.thumb = new Layer({
      name: ".thumb",
      parent: this,
      width: 29,
      height: 29,
      borderRadius: 14.5,
      x: 1,
      midY: this.height / 2,
      backgroundColor: iOSKitColors.transparent,
      borderWidth: 0.5,
      borderColor: "rgba(0,0,0,0.04)"
    });
    this.thumb.states.on = {
      x: 21
    };
    this.thumb.animationOptions = {
      time: 0.6,
      curve: Spring({
        damping: 0.8
      })
    };
    this.thumbFill = new Layer({
      name: "thumbFill",
      parent: this.thumb,
      x: 0.5,
      y: 0.5,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: this.thumbTintColor,
      shadow1: {
        y: 3,
        blur: 8,
        color: "rgba(0,0,0,0.15)"
      },
      shadow2: {
        y: 1,
        blur: 1,
        color: "rgba(0,0,0,0.16)"
      },
      shadow3: {
        y: 3,
        blur: 1,
        color: "rgba(0,0,0,0.10)"
      }
    });
    if (this.isOn) {
      this.base.stateSwitch("on");
      this.thumb.stateSwitch("on");
    }
    this.onClick(function() {
      return this.setOn(!this.isOn, true);
    });
  }

  Switch.define("tintColor", {
    get: function() {
      return this._tintColor;
    },
    set: function(value) {
      this._tintColor = value;
      return this._updateTintColor();
    }
  });

  Switch.define("thumbTintColor", {
    get: function() {
      return this._thumbTintColor;
    },
    set: function(value) {
      this._thumbTintColor = value;
      return this._updateThumb();
    }
  });

  Switch.define("isOn", {
    get: function() {
      return this._isOn;
    },
    set: function(value) {
      return this._isOn = value;
    }
  });

  Switch.prototype.setOn = function(switchOn, animated) {
    this.isOn = switchOn;
    animated = animated != null ? animated : true;
    if (this.isOn) {
      if (animated) {
        this.base.animate("on");
        this.thumb.animate("on");
      } else {
        this.base.stateSwitch("on");
        this.thumb.stateSwitch("on");
      }
    } else {
      if (animated) {
        this.base.animate("default");
        this.thumb.animate("default");
      } else {
        this.base.stateSwitch("default");
        this.thumb.stateSwitch("default");
      }
    }
    return this.emit(Events.SwitchValueChange, this.isOn);
  };

  Switch.prototype._updateTintColor = function() {
    if (this.base) {
      this.base.states.on.shadowColor = this.tintColor;
      if (this.isOn) {
        return this.base.stateSwitch("on");
      }
    }
  };

  Switch.prototype._updateThumb = function() {
    if (this.thumbFill) {
      return this.thumbFill.backgroundColor = this.thumbTintColor;
    }
  };

  Switch.prototype.onValueChange = function(cb) {
    return this.on(Events.SwitchValueChange, cb);
  };

  return Switch;

})(Layer);

exports.iOSSwitch = Switch;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDIyLTAyLTA4IFtwcF0gWWFuZGV4IDIwMjIg4oCTIEZsb3cuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjItMDItMDggW3BwXSBZYW5kZXggMjAyMiDigJMgRmxvdy5mcmFtZXIvbW9kdWxlcy9pT1NTd2l0Y2guY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjItMDItMDggW3BwXSBZYW5kZXggMjAyMiDigJMgRmxvdy5mcmFtZXIvbW9kdWxlcy9pT1NTZWdtZW50ZWRDb250cm9sLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDIyLTAyLTA4IFtwcF0gWWFuZGV4IDIwMjIg4oCTIEZsb3cuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy90aWxsbHVyL0RvY3VtZW50cy9HaXQvUHJvdG90eXBpbmctUXVldWUvMjAyMi0wMi0wOCBbcHBdIFlhbmRleCAyMDIyIOKAkyBGbG93LmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyMjXG5cdCMgaU9TU3dpdGNoXG5cdHtpT1NTd2l0Y2h9ID0gcmVxdWlyZSBcImlPU1N3aXRjaFwiXG5cblx0c3dpdGNoID0gbmV3IGlPU1N3aXRjaFxuXHRcdGlzT246IDxib29sPiBpcyB0aGUgc3dpdGNoIGluIHRoZSBvbiBwb3NpdGlvbiAoZGVmYXVsdHMgdG8gZmFsc2UpXG5cdFx0dGludENvbG9yOiA8Y29sb3I+IHRoZSBjb2xvciBvZiB0aGUgc3dpdGNoIGJhY2tncm91bmQgd2hlbiBpc09uIGlzIHRydWUgKGRlZmF1bHRzIHRvIGlPUyBncmVlbilcblx0XHR0aHVtYlRpbnRDb2xvcjogPGNvbG9yPiB0aGUgY29sb3Igb2YgdGhlIHN3aXRjaCB0aHVtYiAoZGVmYXVsdHMgdG8gd2hpdGUpXG5cblx0IyBPYnNlcnZlIHRoZSBcIkV2ZW50cy5WYWx1ZUNoYW5nZVwiIGV2ZW50XG5cdHN3aXRjaC5vblZhbHVlQ2hhbmdlICh2YWx1ZSkgLT5cblxuIyMjXG5cbmlPU0tpdENvbG9ycyA9XG4gIHJlZDogbmV3IENvbG9yKFwiRkYzQjMwXCIpXG4gIGdyZWVuOiBuZXcgQ29sb3IoXCI0Q0Q5NjRcIilcbiAgYmx1ZTogIG5ldyBDb2xvcihcIjAwN0FGRlwiKVxuICBibGFjazogbmV3IENvbG9yKFwiMDAwXCIpXG4gIGdyYXk6IG5ldyBDb2xvcihcIjhFOEU5M1wiKVxuICBncmV5OiBuZXcgQ29sb3IoXCI4RThFOTNcIilcbiAgd2hpdGU6IG5ldyBDb2xvcihcImZmZlwiKVxuICB0cmFuc3BhcmVudDogbmV3IENvbG9yKFwidHJhbnNwYXJlbnRcIilcblxuXG5FdmVudHMuU3dpdGNoVmFsdWVDaGFuZ2UgPSBcInN3aXRjaFZhbHVlQ2hhbmdlXCJcbmNsYXNzIFN3aXRjaCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblx0XHRvcHRpb25zID0gXy5kZWZhdWx0cyB7fSwgb3B0aW9ucyxcblx0XHRcdHdpZHRoOiA1MVxuXHRcdFx0aGVpZ2h0OiAzMVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBpT1NLaXRDb2xvcnMudHJhbnNwYXJlbnRcblxuXHRcdFx0dGludENvbG9yOiBpT1NLaXRDb2xvcnMuZ3JlZW5cblx0XHRcdHRodW1iVGludENvbG9yOiBpT1NLaXRDb2xvcnMud2hpdGVcblx0XHRcdGlzT246IGZhbHNlXG5cdFx0c3VwZXIgb3B0aW9uc1xuXG5cdFx0cmltQ29sb3IgPSBcIkU1RTVFQVwiXG5cblx0XHRAYmFzZSA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuYmFzZVwiXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBpT1NLaXRDb2xvcnMudHJhbnNwYXJlbnRcblx0XHRcdGJvcmRlclJhZGl1czogMjBcblx0XHRcdGJvcmRlckNvbG9yOiByaW1Db2xvclxuXHRcdFx0Ym9yZGVyV2lkdGg6IDEuNVxuXG5cdFx0XHRzaGFkb3dDb2xvcjogcmltQ29sb3Jcblx0XHRcdHNoYWRvd1R5cGU6IFwiaW5uZXJcIlxuXG5cdFx0QGJhc2Uuc3RhdGVzLm9uID1cblx0XHRcdGJvcmRlcldpZHRoOiAwXG5cdFx0XHRzaGFkb3dDb2xvcjogQHRpbnRDb2xvclxuXHRcdFx0c2hhZG93U3ByZWFkOiAyMFxuXG5cdFx0QGJhc2UuYW5pbWF0aW9uT3B0aW9ucyA9XG5cdFx0XHR0aW1lOiAwLjZcblx0XHRcdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMC43NSlcblxuXHRcdEB0aHVtYiA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIudGh1bWJcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMjksIGhlaWdodDogMjlcblx0XHRcdGJvcmRlclJhZGl1czogMTQuNVxuXHRcdFx0eDogMVxuXHRcdFx0bWlkWTogQGhlaWdodCAvIDJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogaU9TS2l0Q29sb3JzLnRyYW5zcGFyZW50XG5cdFx0XHRib3JkZXJXaWR0aDogMC41XG5cdFx0XHRib3JkZXJDb2xvcjogXCJyZ2JhKDAsMCwwLDAuMDQpXCJcblx0XHRAdGh1bWIuc3RhdGVzLm9uID1cblx0XHRcdHg6IDIxXG5cdFx0QHRodW1iLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0dGltZTogMC42XG5cdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuOClcblxuXHRcdEB0aHVtYkZpbGwgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwidGh1bWJGaWxsXCJcblx0XHRcdHBhcmVudDogQHRodW1iXG5cdFx0XHR4OiAwLjVcblx0XHRcdHk6IDAuNVxuXHRcdFx0d2lkdGg6IDI4LCBoZWlnaHQ6IDI4XG5cdFx0XHRib3JkZXJSYWRpdXM6IDE0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEB0aHVtYlRpbnRDb2xvclxuXG5cdFx0XHRzaGFkb3cxOlxuXHRcdFx0XHR5OiAzXG5cdFx0XHRcdGJsdXI6IDhcblx0XHRcdFx0Y29sb3I6IFwicmdiYSgwLDAsMCwwLjE1KVwiXG5cdFx0XHRzaGFkb3cyOlxuXHRcdFx0XHR5OiAxXG5cdFx0XHRcdGJsdXI6IDFcblx0XHRcdFx0Y29sb3I6IFwicmdiYSgwLDAsMCwwLjE2KVwiXG5cdFx0XHRzaGFkb3czOlxuXHRcdFx0XHR5OiAzXG5cdFx0XHRcdGJsdXI6IDFcblx0XHRcdFx0Y29sb3I6IFwicmdiYSgwLDAsMCwwLjEwKVwiXG5cblx0XHRpZiBAaXNPblxuXHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0XHRAdGh1bWIuc3RhdGVTd2l0Y2ggXCJvblwiXG5cblxuXG5cdFx0QG9uQ2xpY2sgLT5cblx0XHRcdEBzZXRPbiAhQGlzT24sIHRydWVcblxuXG5cdEBkZWZpbmUgXCJ0aW50Q29sb3JcIixcblx0XHRnZXQ6IC0+IEBfdGludENvbG9yXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX3RpbnRDb2xvciA9IHZhbHVlXG5cdFx0XHRAX3VwZGF0ZVRpbnRDb2xvcigpXG5cdEBkZWZpbmUgXCJ0aHVtYlRpbnRDb2xvclwiLFxuXHRcdGdldDogLT4gQF90aHVtYlRpbnRDb2xvclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF90aHVtYlRpbnRDb2xvciA9IHZhbHVlXG5cdFx0XHRAX3VwZGF0ZVRodW1iKClcblxuXHRAZGVmaW5lIFwiaXNPblwiLFxuXHRcdGdldDogLT4gQF9pc09uXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAX2lzT24gPSB2YWx1ZVxuXG5cdHNldE9uOiAoc3dpdGNoT24sIGFuaW1hdGVkKSAtPlxuXHRcdEBpc09uID0gc3dpdGNoT25cblx0XHRhbmltYXRlZCA9IGFuaW1hdGVkID8gdHJ1ZVxuXG5cdFx0aWYgQGlzT25cblx0XHRcdGlmIGFuaW1hdGVkXG5cdFx0XHRcdEBiYXNlLmFuaW1hdGUgXCJvblwiXG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIFwib25cIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRcdFx0QHRodW1iLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdGVsc2Vcblx0XHRcdGlmIGFuaW1hdGVkXG5cdFx0XHRcdEBiYXNlLmFuaW1hdGUgXCJkZWZhdWx0XCJcblx0XHRcdFx0QHRodW1iLmFuaW1hdGUgXCJkZWZhdWx0XCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJkZWZhdWx0XCJcblx0XHRcdFx0QHRodW1iLnN0YXRlU3dpdGNoIFwiZGVmYXVsdFwiXG5cblx0XHRAZW1pdCBFdmVudHMuU3dpdGNoVmFsdWVDaGFuZ2UsIEBpc09uXG5cblxuXHRfdXBkYXRlVGludENvbG9yOiAtPlxuXHRcdGlmIEBiYXNlXG5cdFx0XHRAYmFzZS5zdGF0ZXMub24uc2hhZG93Q29sb3IgPSBAdGludENvbG9yXG5cdFx0XHRAYmFzZS5zdGF0ZVN3aXRjaCBcIm9uXCIgaWYgQGlzT25cblxuXHRfdXBkYXRlVGh1bWI6IC0+XG5cdFx0aWYgQHRodW1iRmlsbCB0aGVuIEB0aHVtYkZpbGwuYmFja2dyb3VuZENvbG9yID0gQHRodW1iVGludENvbG9yXG5cblx0b25WYWx1ZUNoYW5nZTogKGNiKSAtPiBAb24oRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlLCBjYilcblxuXG5leHBvcnRzLmlPU1N3aXRjaCA9IFN3aXRjaFxuIiwiIyMjXG4gICAgIyBpT1NTZWdtZW50ZWRDb250cm9sXG4gICAge2lPU1NlZ21lbnRlZENvbnRyb2x9ID0gcmVxdWlyZSBcImlPU1NlZ21lbnRlZENvbnRyb2xcIlxuXG4gICAgc2VnQ29udHJvbCA9IG5ldyBpT1NTZWdtZW50ZWRDb250cm9sXG4gICAgICAgICMgT1BUSU9OQUxcbiAgICAgICAgaXRlbXM6IDxhcnJheT4gKHN0cmluZ3MgZm9yIGVhY2ggc2VnbWVudCB0aXRsZSlcbiAgICAgICAgdGludENvbG9yOiA8Y29sb3I+IChkZWZhdWx0cyB0byBpT1MgYmx1ZSlcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiA8Y29sb3I+IChkZWZhdWx0cyB0byB3aGl0ZSlcbiAgICAgICAgd2lkdGg6IDxudW1iZXI+IChkZWZhdWx0cyB0byBTY3JlZW4ud2lkdGggd2l0aCAxNmRwIHBhZGRpbmcpXG4gICAgICAgIGhlaWdodDogPG51bWJlcj4gKGRlZmF1bHRzIHRvIDI5KVxuICAgICAgICBpc01vbWVudGFyeTogPGJvb2w+IChkb24ndCBoaWdobGlnaHQgaXRlbXMgb24gdGFwKSwgZGVmYXVsdHMgdG8gZmFsc2UpXG5cbiAgICBzZWdDb250cm9sLnNldFNlbGVjdGVkIDxib29sPiwgPG51bWJlcj5cbiAgICAgICAgIyBpZiBib29sPXRydWUsIHNlbGVjdCwgb3IgaWYgYm9vbD1mYWxzZSwgdW5zZWxlY3QgdGhlIHNlZ21lbnQgYXQgaW5kZXggPG51bWJlcj5cblxuICAgIHNlZ0NvbnRyb2wuaW5zZXJ0U2VnbWVudCA8c3RyaW5nPiwgPG51bWJlcj4gb3B0aW9uYWxcbiAgICAgICAgIyBhZGQgYSBuZXcgc2VnbWVudCB3aXRoIHRoZSBuYW1lIDxzdHJpbmc+XG4gICAgICAgICMgb3B0aW9uYWxseSBzcGVjaWZ5IHRoZSBpbmRleCB0byBpbnNlcnQgdGhlIG5ldyBzZWdtZW50IGF0XG4gICAgICAgICMgYnkgZGVmYXVsdCwgaW5zZXJ0IGluIHRoZSBsYXN0IHBvc3Rpb25cblxuICAgIHNlZ0NvbnRyb2wucmVtb3ZlU2VnbWVudCA8bnVtYmVyPlxuICAgICAgICAjIHJlbW92ZSB0aGUgc2VnbWVudCBhdCBpbmRleCA8bnVtYmVyPlxuXG4gICAgc2VnQ29udHJvbC5zZXRUaXRsZSA8c3RyaW5nPiwgPG51bWJlcj5cbiAgICAgICAgIyBjaGFuZ2UgdGhlIHRpdGxlIHRvIDxzdHJpbmc+IG9mIHRoZSBzZWdtZW50IGF0IGluZGV4IDxudW1iZXI+XG5cbiAgICBzZWdDb250cm9sLnNldFdpZHRoIDxudW1iZXI+LCA8bnVtYmVyPlxuICAgICAgICAjIGhhcmQtc2V0IHdpZHRoIG9mIHNlZ21lbnQgYXQgdGhlIHNlY29uZCA8bnVtYmVyPiBpbmRleCB0byB0aGUgZmlyc3QgPG51bWJlcj5cblxuICAgICMgT2JzZXJ2ZSB0aGUgXCJjaGFuZ2U6Y3VycmVudFNlZ21lbnRcIiBldmVudFxuICAgIG5hdkJhci5vbiBcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiLCAoY3VycmVudFNlZ21lbnQsIGxhc3RTZWdtZW50KSAtPlxuXG4jIyNcblxuXG5jbGFzcyBleHBvcnRzLmlPU1NlZ21lbnRlZENvbnRyb2wgZXh0ZW5kcyBMYXllclxuXG4gICAgY29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXG4gICAgICAgIEBIUEFERElORyA9IDE2XG4gICAgICAgIEBIRUlHSFQgPSAyOVxuXG4gICAgICAgIG9wdGlvbnMgPSBfLmRlZmF1bHRzIHt9LCBvcHRpb25zLFxuICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICB0aW50Q29sb3I6IFwiIzAwN0FGRlwiXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0ZGRkZGRlwiXG4gICAgICAgICAgICB3aWR0aDogU2NyZWVuLndpZHRoIC0gQEhQQURESU5HKjJcbiAgICAgICAgICAgIGhlaWdodDogQEhFSUdIVFxuICAgICAgICAgICAgeDogQEhQQURESU5HXG4gICAgICAgICAgICBpc01vbWVudGFyeTogZmFsc2VcbiAgICAgICAgICAgIGNsaXA6IHRydWVcblxuICAgICAgICBzdXBlciBvcHRpb25zXG5cbiAgICAgICAgQHRpbnRDb2xvciA9IG9wdGlvbnMudGludENvbG9yXG4gICAgICAgIEBpc01vbWVudGFyeSA9IG9wdGlvbnMuaXNNb21lbnRhcnlcbiAgICAgICAgQGJvcmRlcldpZHRoID0gMVxuICAgICAgICBAYm9yZGVyUmFkaXVzID0gNFxuXG4gICAgICAgIEBfYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgQF9zZWdtZW50cyA9IFtdXG4gICAgICAgIGZvciBpdGVtIGluIG9wdGlvbnMuaXRlbXNcbiAgICAgICAgICAgIEBfYWRkU2VnbWVudCBpdGVtXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuICAgICAgICBAX3RvdWNoRG93biA9IGZhbHNlXG5cbiAgICBfc2VnbWVudEZvckV2ZW50OiAoZXZlbnQpIC0+XG4gICAgICAgICMgVG91Y2hNb3ZlIGRvZXNuJ3Qgd29yayB0aGUgc2FtZSBvbiBtb2JpbGUsIHNvIGRvIHRoZSBoaXQgdGVzdGluZyBvdXJzZWx2ZXNcbiAgICAgICAgdG91Y2hFdmVudCA9IEV2ZW50cy50b3VjaEV2ZW50KGV2ZW50KVxuICAgICAgICBwb2ludCA9IHt4OnRvdWNoRXZlbnQuY2xpZW50WCwgeTp0b3VjaEV2ZW50LmNsaWVudFl9XG4gICAgICAgIHBvaW50ID0gVXRpbHMuY29udmVydFBvaW50KHBvaW50LCB1bmRlZmluZWQsIEAsIHRydWUpXG4gICAgICAgIGZvciBhTGF5ZXIgaW4gQGNoaWxkcmVuXG4gICAgICAgICAgICByZXR1cm4gYUxheWVyIGlmIFV0aWxzLnBvaW50SW5GcmFtZShwb2ludCwgYUxheWVyLmZyYW1lKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG5cbiAgICBfYWRkU2VnbWVudDogKHRpdGxlLCBpbmRleCkgLT5cbiAgICAgICAgc2VnbWVudCA9IG5ldyBMYXllclxuICAgICAgICAgICAgaGVpZ2h0OiBAaGVpZ2h0XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IEBfYmFja2dyb3VuZENvbG9yXG4gICAgICAgICAgICBwYXJlbnQ6IEBcbiAgICAgICAgICAgIG5hbWU6IFwiLlNlZ21lbnRcIitAX3NlZ21lbnRzLmxlbmd0aFxuXG4gICAgICAgIHNlZ21lbnQub25Ub3VjaFN0YXJ0IChldmVudCwgbGF5ZXIpID0+XG4gICAgICAgICAgICBAX3RvdWNoRG93biA9IHRydWVcbiAgICAgICAgICAgIEV2ZW50cy53cmFwKGRvY3VtZW50KS5hZGRFdmVudExpc3RlbmVyKFwidGFwZW5kXCIsIEBfdG91Y2hFbmQpXG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgICAgIGxheWVyLmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihAX3RpbnRDb2xvcikuYWxwaGEoLjEpXG5cbiAgICAgICAgc2VnbWVudC5vblRvdWNoTW92ZSAoZXZlbnQsIGxheWVyKSA9PlxuICAgICAgICAgICAgbGF5ZXIgPSBAX3NlZ21lbnRGb3JFdmVudCBldmVudFxuICAgICAgICAgICAgcmV0dXJuIGlmIGxheWVyIGlzIHVuZGVmaW5lZFxuXG4gICAgICAgICAgICBAX3Vuc2VsZWN0QWxsKClcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyBAX3NlbGVjdGVkSXRlbVxuICAgICAgICAgICAgaWYgQF90b3VjaERvd24gdGhlbiBsYXllci5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoQF90aW50Q29sb3IpLmFscGhhKC4xKVxuXG4gICAgICAgIHNlZ21lbnQub25Ub3VjaEVuZCAoZXZlbnQsIGxheWVyKSA9PlxuICAgICAgICAgICAgbGF5ZXIgPSBAX3NlZ21lbnRGb3JFdmVudCBldmVudFxuICAgICAgICAgICAgcmV0dXJuIGlmIGxheWVyIGlzIHVuZGVmaW5lZFxuXG4gICAgICAgICAgICBAX3NlbGVjdEl0ZW0gbGF5ZXJcblxuICAgICAgICB0aXRsZVRleHQgPSBuZXcgVGV4dExheWVyXG4gICAgICAgICAgICB0ZXh0OiB0aXRsZVxuICAgICAgICAgICAgcGFyZW50OiBzZWdtZW50XG4gICAgICAgICAgICBuYW1lOiBcIi5MYWJlbFwiXG4gICAgICAgICAgICBjb2xvcjogQF90aW50Q29sb3JcbiAgICAgICAgICAgIGZvbnRTaXplOiAxN1xuICAgICAgICAgICAgZm9udFdlaWdodDogNDAwXG4gICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCJcbiAgICAgICAgICAgIHdpZHRoOiBzZWdtZW50LndpZHRoXG4gICAgICAgIHNlZ21lbnQudGl0bGUgPSB0aXRsZVxuICAgICAgICBzZWdtZW50LmxhYmVsID0gdGl0bGVUZXh0XG4gICAgICAgIHRpdGxlVGV4dC5mb250U2l6ZSA9IDEzXG5cbiAgICAgICAgaWYgaW5kZXg/XG4gICAgICAgICAgICBAX3NlZ21lbnRzLnNwbGljZSBpbmRleCwgMCwgc2VnbWVudFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAX3NlZ21lbnRzLnB1c2ggc2VnbWVudFxuXG4gICAgX3RvdWNoRW5kOiAoZXZlbnQsIGxheWVyKT0+XG4gICAgICAgIEBfdG91Y2hEb3duID0gZmFsc2VcbiAgICAgICAgQF91bnNlbGVjdEFsbCgpXG5cbiAgICBfbGF5b3V0U2VnbWVudHM6ICgpLT5cbiAgICAgICAgZm9yIHNlZ21lbnQsIGkgaW4gQF9zZWdtZW50c1xuICAgICAgICAgICAgc2VnbWVudC5pbmRleCA9IGkgIyBwYXNzZWQgaW4gZXZlbnQgaGFuZGxlciBpbiBjYXNlIG9mIHJlLWxheW91dCBhZnRlciBpbml0XG4gICAgICAgICAgICAjIGJ0dyB0aGUgYWJpbGl0eSB0byBzZXRXaWR0aCBvZiBhbnkgc2VnbWVudCBpcyB3aHkgdGhpcyBjb21wbGV4aXR5IGV4aXN0c1xuICAgICAgICAgICAgdW5sZXNzIHNlZ21lbnQuaGFzRXhwbGljaXRXaWR0aD9cbiAgICAgICAgICAgICAgICBzZWdtZW50c1dpdGhFeHBsaWNpdFdpZHRoID0gXy5maWx0ZXIgQF9zZWdtZW50cywgKG8pLT4gcmV0dXJuIG8uaGFzRXhwbGljaXRXaWR0aD9cbiAgICAgICAgICAgICAgICByZW1haW5pbmdXaWR0aCA9IEB3aWR0aFxuICAgICAgICAgICAgICAgIGZvciB3U2VnbWVudCBpbiBzZWdtZW50c1dpdGhFeHBsaWNpdFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmluZ1dpZHRoIC09IHdTZWdtZW50LndpZHRoXG4gICAgICAgICAgICAgICAgc2VnbWVudC53aWR0aCA9IE1hdGgucm91bmQgKHJlbWFpbmluZ1dpZHRoIC8gKEBfc2VnbWVudHMubGVuZ3RoIC0gc2VnbWVudHNXaXRoRXhwbGljaXRXaWR0aC5sZW5ndGgpKVxuICAgICAgICAgICAgc2VnbWVudC54ID0gbmV4dFhcbiAgICAgICAgICAgIG5leHRYID0gc2VnbWVudC5tYXhYXG5cbiAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmlnaHQgPSBcIjFweCBzb2xpZCAje0BfdGludENvbG9yfVwiXG4gICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMFwiXG4gICAgICAgICAgICBpZiBpIGlzIDAgdGhlbiBzZWdtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNHB4IDAgMCA0cHhcIlxuICAgICAgICAgICAgaWYgaSBpcyBAX3NlZ21lbnRzLmxlbmd0aC0xXG4gICAgICAgICAgICAgICAgaWYgQF9zZWdtZW50cy5sZW5ndGggaXMgMVxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiNHB4XCJcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmlnaHQgPSBcIlwiXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIwIDRweCA0cHggMFwiXG5cbiAgICAgICAgICAgIGxhYmVsID0gc2VnbWVudC5jaGlsZHJlblswXVxuICAgICAgICAgICAgbGFiZWw/LndpZHRoID0gc2VnbWVudC53aWR0aFxuICAgICAgICAgICAgbGFiZWw/LmNlbnRlcigpXG4gICAgICAgIEB3aWR0aCA9IG5leHRYXG5cbiAgICBfc2VsZWN0SXRlbTogKGl0ZW0pLT5cbiAgICAgICAgcmV0dXJuIGlmIGl0ZW0gaXMgQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgaWYgIUBpc01vbWVudGFyeVxuICAgICAgICAgICAgb2xkSXRlbSA9IEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgICAgICBAX3NlbGVjdGVkSXRlbSA9IGl0ZW1cbiAgICAgICAgICAgIEBfdW5zZWxlY3RJdGVtIG9sZEl0ZW1cbiAgICAgICAgICAgIEBfaGlnaGxpZ2h0SXRlbSBAX3NlbGVjdGVkSXRlbVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAX3Vuc2VsZWN0SXRlbSBpdGVtXG4gICAgICAgIEBlbWl0KFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIsIGl0ZW0sIG9sZEl0ZW0pXG5cbiAgICBfdW5zZWxlY3RBbGw6ICgpLT5cbiAgICAgICAgZm9yIHNlZ21lbnQgaW4gQF9zZWdtZW50c1xuICAgICAgICAgICAgQF9yZW1vdmVIaWdobGlnaHQgc2VnbWVudCB1bmxlc3Mgc2VnbWVudCBpcyBAX3NlbGVjdGVkSXRlbVxuXG4gICAgX3Vuc2VsZWN0SXRlbTogKGl0ZW0sIGlzQ2xlYXJpbmcpLT5cbiAgICAgICAgaWYgaXRlbT8gdGhlbiBAX3JlbW92ZUhpZ2hsaWdodCBpdGVtXG4gICAgICAgIGlmIGlzQ2xlYXJpbmdcbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtID0gbnVsbFxuICAgICAgICAgICAgQGVtaXQoXCJjaGFuZ2U6Y3VycmVudFNlZ21lbnRcIiwgbnVsbCwgaXRlbSlcblxuICAgIF9oaWdobGlnaHRJdGVtOiAoaXRlbSktPlxuICAgICAgICBpdGVtLmJhY2tncm91bmRDb2xvciA9IEBfdGludENvbG9yXG4gICAgICAgIGl0ZW0ubGFiZWwuY29sb3IgPSBAX2JhY2tncm91bmRDb2xvclxuXG4gICAgX3JlbW92ZUhpZ2hsaWdodDogKGl0ZW0pLT5cbiAgICAgICAgaXRlbS5iYWNrZ3JvdW5kQ29sb3IgPSBAX2JhY2tncm91bmRDb2xvclxuICAgICAgICBpdGVtLmxhYmVsLmNvbG9yID0gQF90aW50Q29sb3JcblxuICAgIF9sYXlvdXQ6ICgpLT5cbiAgICAgICAgQHdpZHRoID0gU2NyZWVuLndpZHRoIC0gQEhQQURESU5HKjJcbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG5cbiAgICBAZGVmaW5lIFwiaXNNb21lbnRhcnlcIixcbiAgICAgICAgZ2V0OiAtPiBAX2lzTW9tZW50YXJ5XG4gICAgICAgIHNldDogKHZhbHVlKS0+XG4gICAgICAgICAgICBAX2lzTW9tZW50YXJ5ID0gdmFsdWVcblxuICAgIEBkZWZpbmUgXCJ0aW50Q29sb3JcIixcbiAgICAgICAgZ2V0OiAtPiBAX3RpbnRDb2xvclxuICAgICAgICBzZXQ6ICh2YWx1ZSktPlxuICAgICAgICAgICAgQGJvcmRlckNvbG9yID0gdmFsdWVcbiAgICAgICAgICAgIGlmIEBfc2VnbWVudHNcbiAgICAgICAgICAgICAgICBmb3Igc2VnbWVudCBpbiBAX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIHNlZ21lbnQubGFiZWwuY29sb3IgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJpZ2h0ID0gXCIxcHggc29saWQgI3t2YWx1ZX1cIlxuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0/LmJhY2tncm91bmRDb2xvciA9IHZhbHVlXG4gICAgICAgICAgICBAX3NlbGVjdGVkSXRlbT8ubGFiZWwuY29sb3IgPSBAX2JhY2tncm91bmRDb2xvclxuICAgICAgICAgICAgQF90aW50Q29sb3IgPSB2YWx1ZVxuXG4gICAgQGRlZmluZSBcIm51bWJlck9mU2VnbWVudHNcIixcbiAgICAgICAgZ2V0OiAtPiBAX3NlZ21lbnRzPy5sZW5ndGhcblxuICAgIEBkZWZpbmUgXCJzZWxlY3RlZFNlZ21lbnRJbmRleFwiLFxuICAgICAgICBnZXQ6IC0+IEBfc2VsZWN0ZWRJdGVtPy5pbmRleFxuXG4gICAgQGRlZmluZSBcImF1dG9MYXlvdXRcIixcbiAgICAgICAgZ2V0OiAtPiBAX2F1dG9MYXlvdXRcbiAgICAgICAgc2V0OiAodmFsdWUpLT5cbiAgICAgICAgICAgIEBfYXV0b0xheW91dCA9IHZhbHVlXG5cbiAgICBzZXRTZWxlY3RlZDogKGlzU2VsZWN0ZWQsIGluZGV4KSAtPlxuICAgICAgICBzZWdtZW50ID0gQF9zZWdtZW50c1tpbmRleF1cbiAgICAgICAgaWYgaXNTZWxlY3RlZCB0aGVuIEBfc2VsZWN0SXRlbSBzZWdtZW50IGVsc2UgQF91bnNlbGVjdEl0ZW0gc2VnbWVudCwgdHJ1ZVxuXG4gICAgaW5zZXJ0U2VnbWVudDogKHRpdGxlLCBpbmRleCkgLT5cbiAgICAgICAgaWYgIWluZGV4PyB0aGVuIGluZGV4ID0gQF9zZWdtZW50cy5sZW5ndGhcbiAgICAgICAgQF9hZGRTZWdtZW50IHRpdGxlLCBpbmRleFxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIHJlbW92ZVNlZ21lbnQ6IChpbmRleCktPlxuICAgICAgICBpZiBAX3NlZ21lbnRzW2luZGV4XT9cbiAgICAgICAgICAgIEBfc2VnbWVudHNbaW5kZXhdLmRlc3Ryb3koKVxuICAgICAgICAgICAgQF9zZWdtZW50cy5zcGxpY2UgaW5kZXgsIDFcbiAgICAgICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgcmVtb3ZlQWxsU2VnbWVudHM6ICgpLT5cbiAgICAgICAgQHJlbW92ZVNlZ21lbnQgMCB3aGlsZSBAX3NlZ21lbnRzLmxlbmd0aCA+IDBcblxuICAgIHNldFRpdGxlOiAodGl0bGUsIGluZGV4KS0+XG4gICAgICAgIEBfc2VnbWVudHNbaW5kZXhdPy5sYWJlbC50ZXh0ID0gdGl0bGVcblxuICAgIHNldFdpZHRoOiAod2lkdGgsIGluZGV4KS0+XG4gICAgICAgIGlmIHdpZHRoP1xuICAgICAgICAgICAgQF9zZWdtZW50c1tpbmRleF0/Lmhhc0V4cGxpY2l0V2lkdGggPSBAX3NlZ21lbnRzW2luZGV4XT8ud2lkdGggPSB3aWR0aFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAX3NlZ21lbnRzW2luZGV4XT8uaGFzRXhwbGljaXRXaWR0aCA9IG51bGxcbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG5cbiAgICBhdXRvV2lkdGhMYXlvdXQ6ICgpLT5cbiAgICAgICAgQHdpZHRoID0gU2NyZWVuLndpZHRoIC0gQEhQQURESU5HKjJcbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG4iLCIjIFByZXZpZXcgQ29tcG9uZW50XG5Bc3NldHMgPSByZXF1aXJlIFwiUHJldmlld0NvbXBvbmVudEFzc2V0c1wiXG5cblxuIyBQcmV2aWV3XG5cbmNsYXNzIGV4cG9ydHMuUHJldmlldyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogXCIyMDoyMlwiXG5cdFx0XHRuYW1lOiBcIlByZXZpZXdcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdHZpc2libGU6IHRydWVcblx0XHRcdHRvcFRoZW1lOiBcImRhcmtcIlxuXHRcdFx0Ym90dG9tVGhlbWU6IFwiZGFya1wiXG5cdFx0XHRhc3NldHM6IEFzc2V0cy5kYXRhXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcdFxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3Zpc2libGUnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd0b3BUaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50b3BUaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50b3BUaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdib3R0b21UaGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3R0b21UaGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhciA9IHZhbHVlXG5cdFxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2UgQHByZXZpZXdEZXNrdG9wKClcblx0XHRcbiMgXHRcdGlmIGZhbHNlIHRoZW4gQGxvZ1NpemUoKVxuXHRcblx0XG5cdFxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblx0XG5cdFxuXG5cdFxuXHRcblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IFwiIzIyMlwiXG5cdFx0QGNyZWF0ZUJhcnMoKVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cdFx0cHJldmlld0NhbnZhcyA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIsIG5hbWU6IFwiLmhpZGRlblByZXZpZXdDYW52YXNcIlxuXHRcdFxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAY2VudGVyKClcblx0XHRAb3JpZ2luWSA9IDAuNVxuXHRcdEBvcmlnaW5YID0gMC41XG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KVxuXHRcdFx0XG5cdFx0XHRpZiBAc2NyZWVuU2l6ZSgzNzUsIDc2OCkgb3IgQHNjcmVlblNpemUoMzkwLCA3OTcpIG9yIEBzY3JlZW5TaXplKDQxNCwgODUyKSBvciBAc2NyZWVuU2l6ZSg0MjgsIDg3OSlcblx0XHRcdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0XHRlbHNlIEBzZXRDdXN0b21QcmV2aWV3KClcblx0XHRcbiMgXHRcdGVsc2UgaWYgQHZpZXcud2lkdGggPT0gMzYwXG5cdFx0XHRcblx0XHRlbHNlIEBzZXRDdXN0b21QcmV2aWV3KClcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wKC0yMClcblx0XHRAb3JpZ2luWSA9IDBcblx0XHRcblx0XHRzSCA9IChTY3JlZW4uaGVpZ2h0ICsgNDApIC8gQGhlaWdodFxuXHRcdEBzY2FsZSA9IE1hdGgubWluKFNjcmVlbi53aWR0aCAvIEB3aWR0aCwgc0gpXG5cdFxuXHRcblx0bG9nU2l6ZTogKCkgPT5cblx0XHRuZXcgVGV4dExheWVyIHsgdGV4dDogXCIje1NjcmVlbi53aWR0aH14I3tTY3JlZW4uaGVpZ2h0fVwiLCB5OiBBbGlnbi5jZW50ZXIgfVxuXHRcblx0XG5cdFxuXHRcblx0Y3JlYXRlQmFyczogKCkgPT5cblx0XHR0b3BCYXIgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0Jhcih0b3BCYXIpXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC4yKVwiXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XHRcblx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHRvcFRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0b3BUaGVtZV1cblx0XG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGJvdHRvbVRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0XG5cbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCIiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUtBQTtBRENBLE9BQU8sQ0FBQyxJQUFSLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLEtBQUEsRUFBTyxNQURQO0dBREQ7RUFHQSxtQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLHlEQUFOO0lBQ0EsS0FBQSxFQUFPLDBEQURQO0dBSkQ7RUFNQSxxQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDJEQUFOO0lBQ0EsS0FBQSxFQUFPLDREQURQO0dBUEQ7RUFTQSxzQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDREQUFOO0lBQ0EsS0FBQSxFQUFPLDZEQURQO0dBVkQ7RUFhQSxLQUFBLEVBQU8sb0RBYlA7Ozs7O0FEREQsSUFBQSxNQUFBO0VBQUE7Ozs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLHdCQUFSOztBQUtILE9BQU8sQ0FBQzs7O0VBQ0EsaUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7Ozs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLElBQUEsRUFBTSxJQUFOO01BQ0EscUJB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
