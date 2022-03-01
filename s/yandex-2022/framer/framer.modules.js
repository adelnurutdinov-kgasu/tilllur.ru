require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"iOSSegmentedControl":[function(require,module,exports){

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3RpbGxsdXIvRG9jdW1lbnRzL0dpdC9Qcm90b3R5cGluZy1RdWV1ZS8yMDIyLTAyLTA4IFtwcF0gWWFuZGV4IDIwMjIg4oCTIEZsb3cuZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjItMDItMDggW3BwXSBZYW5kZXggMjAyMiDigJMgRmxvdy5mcmFtZXIvbW9kdWxlcy9pT1NTd2l0Y2guY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvdGlsbGx1ci9Eb2N1bWVudHMvR2l0L1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjItMDItMDggW3BwXSBZYW5kZXggMjAyMiDigJMgRmxvdy5mcmFtZXIvbW9kdWxlcy9pT1NTZWdtZW50ZWRDb250cm9sLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMjI1xuXHQjIGlPU1N3aXRjaFxuXHR7aU9TU3dpdGNofSA9IHJlcXVpcmUgXCJpT1NTd2l0Y2hcIlxuXG5cdHN3aXRjaCA9IG5ldyBpT1NTd2l0Y2hcblx0XHRpc09uOiA8Ym9vbD4gaXMgdGhlIHN3aXRjaCBpbiB0aGUgb24gcG9zaXRpb24gKGRlZmF1bHRzIHRvIGZhbHNlKVxuXHRcdHRpbnRDb2xvcjogPGNvbG9yPiB0aGUgY29sb3Igb2YgdGhlIHN3aXRjaCBiYWNrZ3JvdW5kIHdoZW4gaXNPbiBpcyB0cnVlIChkZWZhdWx0cyB0byBpT1MgZ3JlZW4pXG5cdFx0dGh1bWJUaW50Q29sb3I6IDxjb2xvcj4gdGhlIGNvbG9yIG9mIHRoZSBzd2l0Y2ggdGh1bWIgKGRlZmF1bHRzIHRvIHdoaXRlKVxuXG5cdCMgT2JzZXJ2ZSB0aGUgXCJFdmVudHMuVmFsdWVDaGFuZ2VcIiBldmVudFxuXHRzd2l0Y2gub25WYWx1ZUNoYW5nZSAodmFsdWUpIC0+XG5cbiMjI1xuXG5pT1NLaXRDb2xvcnMgPVxuICByZWQ6IG5ldyBDb2xvcihcIkZGM0IzMFwiKVxuICBncmVlbjogbmV3IENvbG9yKFwiNENEOTY0XCIpXG4gIGJsdWU6ICBuZXcgQ29sb3IoXCIwMDdBRkZcIilcbiAgYmxhY2s6IG5ldyBDb2xvcihcIjAwMFwiKVxuICBncmF5OiBuZXcgQ29sb3IoXCI4RThFOTNcIilcbiAgZ3JleTogbmV3IENvbG9yKFwiOEU4RTkzXCIpXG4gIHdoaXRlOiBuZXcgQ29sb3IoXCJmZmZcIilcbiAgdHJhbnNwYXJlbnQ6IG5ldyBDb2xvcihcInRyYW5zcGFyZW50XCIpXG5cblxuRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlID0gXCJzd2l0Y2hWYWx1ZUNoYW5nZVwiXG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnM9e30pIC0+XG5cdFx0b3B0aW9ucyA9IF8uZGVmYXVsdHMge30sIG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogNTFcblx0XHRcdGhlaWdodDogMzFcblx0XHRcdGJhY2tncm91bmRDb2xvcjogaU9TS2l0Q29sb3JzLnRyYW5zcGFyZW50XG5cblx0XHRcdHRpbnRDb2xvcjogaU9TS2l0Q29sb3JzLmdyZWVuXG5cdFx0XHR0aHVtYlRpbnRDb2xvcjogaU9TS2l0Q29sb3JzLndoaXRlXG5cdFx0XHRpc09uOiBmYWxzZVxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdHJpbUNvbG9yID0gXCJFNUU1RUFcIlxuXG5cdFx0QGJhc2UgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmJhc2VcIlxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogaU9TS2l0Q29sb3JzLnRyYW5zcGFyZW50XG5cdFx0XHRib3JkZXJSYWRpdXM6IDIwXG5cdFx0XHRib3JkZXJDb2xvcjogcmltQ29sb3Jcblx0XHRcdGJvcmRlcldpZHRoOiAxLjVcblxuXHRcdFx0c2hhZG93Q29sb3I6IHJpbUNvbG9yXG5cdFx0XHRzaGFkb3dUeXBlOiBcImlubmVyXCJcblxuXHRcdEBiYXNlLnN0YXRlcy5vbiA9XG5cdFx0XHRib3JkZXJXaWR0aDogMFxuXHRcdFx0c2hhZG93Q29sb3I6IEB0aW50Q29sb3Jcblx0XHRcdHNoYWRvd1NwcmVhZDogMjBcblxuXHRcdEBiYXNlLmFuaW1hdGlvbk9wdGlvbnMgPVxuXHRcdFx0dGltZTogMC42XG5cdFx0XHRjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDAuNzUpXG5cblx0XHRAdGh1bWIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLnRodW1iXCJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDI5LCBoZWlnaHQ6IDI5XG5cdFx0XHRib3JkZXJSYWRpdXM6IDE0LjVcblx0XHRcdHg6IDFcblx0XHRcdG1pZFk6IEBoZWlnaHQgLyAyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlPU0tpdENvbG9ycy50cmFuc3BhcmVudFxuXHRcdFx0Ym9yZGVyV2lkdGg6IDAuNVxuXHRcdFx0Ym9yZGVyQ29sb3I6IFwicmdiYSgwLDAsMCwwLjA0KVwiXG5cdFx0QHRodW1iLnN0YXRlcy5vbiA9XG5cdFx0XHR4OiAyMVxuXHRcdEB0aHVtYi5hbmltYXRpb25PcHRpb25zID1cblx0XHRcdHRpbWU6IDAuNlxuXHRcdFx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAwLjgpXG5cblx0XHRAdGh1bWJGaWxsID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcInRodW1iRmlsbFwiXG5cdFx0XHRwYXJlbnQ6IEB0aHVtYlxuXHRcdFx0eDogMC41XG5cdFx0XHR5OiAwLjVcblx0XHRcdHdpZHRoOiAyOCwgaGVpZ2h0OiAyOFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiAxNFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAdGh1bWJUaW50Q29sb3JcblxuXHRcdFx0c2hhZG93MTpcblx0XHRcdFx0eTogM1xuXHRcdFx0XHRibHVyOiA4XG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xNSlcIlxuXHRcdFx0c2hhZG93Mjpcblx0XHRcdFx0eTogMVxuXHRcdFx0XHRibHVyOiAxXG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xNilcIlxuXHRcdFx0c2hhZG93Mzpcblx0XHRcdFx0eTogM1xuXHRcdFx0XHRibHVyOiAxXG5cdFx0XHRcdGNvbG9yOiBcInJnYmEoMCwwLDAsMC4xMClcIlxuXG5cdFx0aWYgQGlzT25cblx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwib25cIlxuXHRcdFx0QHRodW1iLnN0YXRlU3dpdGNoIFwib25cIlxuXG5cblxuXHRcdEBvbkNsaWNrIC0+XG5cdFx0XHRAc2V0T24gIUBpc09uLCB0cnVlXG5cblxuXHRAZGVmaW5lIFwidGludENvbG9yXCIsXG5cdFx0Z2V0OiAtPiBAX3RpbnRDb2xvclxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF90aW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaW50Q29sb3IoKVxuXHRAZGVmaW5lIFwidGh1bWJUaW50Q29sb3JcIixcblx0XHRnZXQ6IC0+IEBfdGh1bWJUaW50Q29sb3Jcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBfdGh1bWJUaW50Q29sb3IgPSB2YWx1ZVxuXHRcdFx0QF91cGRhdGVUaHVtYigpXG5cblx0QGRlZmluZSBcImlzT25cIixcblx0XHRnZXQ6IC0+IEBfaXNPblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9pc09uID0gdmFsdWVcblxuXHRzZXRPbjogKHN3aXRjaE9uLCBhbmltYXRlZCkgLT5cblx0XHRAaXNPbiA9IHN3aXRjaE9uXG5cdFx0YW5pbWF0ZWQgPSBhbmltYXRlZCA/IHRydWVcblxuXHRcdGlmIEBpc09uXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwib25cIlxuXHRcdFx0XHRAdGh1bWIuYW5pbWF0ZSBcIm9uXCJcblx0XHRcdGVsc2Vcblx0XHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcIm9uXCJcblx0XHRlbHNlXG5cdFx0XHRpZiBhbmltYXRlZFxuXHRcdFx0XHRAYmFzZS5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5hbmltYXRlIFwiZGVmYXVsdFwiXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBiYXNlLnN0YXRlU3dpdGNoIFwiZGVmYXVsdFwiXG5cdFx0XHRcdEB0aHVtYi5zdGF0ZVN3aXRjaCBcImRlZmF1bHRcIlxuXG5cdFx0QGVtaXQgRXZlbnRzLlN3aXRjaFZhbHVlQ2hhbmdlLCBAaXNPblxuXG5cblx0X3VwZGF0ZVRpbnRDb2xvcjogLT5cblx0XHRpZiBAYmFzZVxuXHRcdFx0QGJhc2Uuc3RhdGVzLm9uLnNoYWRvd0NvbG9yID0gQHRpbnRDb2xvclxuXHRcdFx0QGJhc2Uuc3RhdGVTd2l0Y2ggXCJvblwiIGlmIEBpc09uXG5cblx0X3VwZGF0ZVRodW1iOiAtPlxuXHRcdGlmIEB0aHVtYkZpbGwgdGhlbiBAdGh1bWJGaWxsLmJhY2tncm91bmRDb2xvciA9IEB0aHVtYlRpbnRDb2xvclxuXG5cdG9uVmFsdWVDaGFuZ2U6IChjYikgLT4gQG9uKEV2ZW50cy5Td2l0Y2hWYWx1ZUNoYW5nZSwgY2IpXG5cblxuZXhwb3J0cy5pT1NTd2l0Y2ggPSBTd2l0Y2hcbiIsIiMjI1xuICAgICMgaU9TU2VnbWVudGVkQ29udHJvbFxuICAgIHtpT1NTZWdtZW50ZWRDb250cm9sfSA9IHJlcXVpcmUgXCJpT1NTZWdtZW50ZWRDb250cm9sXCJcblxuICAgIHNlZ0NvbnRyb2wgPSBuZXcgaU9TU2VnbWVudGVkQ29udHJvbFxuICAgICAgICAjIE9QVElPTkFMXG4gICAgICAgIGl0ZW1zOiA8YXJyYXk+IChzdHJpbmdzIGZvciBlYWNoIHNlZ21lbnQgdGl0bGUpXG4gICAgICAgIHRpbnRDb2xvcjogPGNvbG9yPiAoZGVmYXVsdHMgdG8gaU9TIGJsdWUpXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogPGNvbG9yPiAoZGVmYXVsdHMgdG8gd2hpdGUpXG4gICAgICAgIHdpZHRoOiA8bnVtYmVyPiAoZGVmYXVsdHMgdG8gU2NyZWVuLndpZHRoIHdpdGggMTZkcCBwYWRkaW5nKVxuICAgICAgICBoZWlnaHQ6IDxudW1iZXI+IChkZWZhdWx0cyB0byAyOSlcbiAgICAgICAgaXNNb21lbnRhcnk6IDxib29sPiAoZG9uJ3QgaGlnaGxpZ2h0IGl0ZW1zIG9uIHRhcCksIGRlZmF1bHRzIHRvIGZhbHNlKVxuXG4gICAgc2VnQ29udHJvbC5zZXRTZWxlY3RlZCA8Ym9vbD4sIDxudW1iZXI+XG4gICAgICAgICMgaWYgYm9vbD10cnVlLCBzZWxlY3QsIG9yIGlmIGJvb2w9ZmFsc2UsIHVuc2VsZWN0IHRoZSBzZWdtZW50IGF0IGluZGV4IDxudW1iZXI+XG5cbiAgICBzZWdDb250cm9sLmluc2VydFNlZ21lbnQgPHN0cmluZz4sIDxudW1iZXI+IG9wdGlvbmFsXG4gICAgICAgICMgYWRkIGEgbmV3IHNlZ21lbnQgd2l0aCB0aGUgbmFtZSA8c3RyaW5nPlxuICAgICAgICAjIG9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgaW5kZXggdG8gaW5zZXJ0IHRoZSBuZXcgc2VnbWVudCBhdFxuICAgICAgICAjIGJ5IGRlZmF1bHQsIGluc2VydCBpbiB0aGUgbGFzdCBwb3N0aW9uXG5cbiAgICBzZWdDb250cm9sLnJlbW92ZVNlZ21lbnQgPG51bWJlcj5cbiAgICAgICAgIyByZW1vdmUgdGhlIHNlZ21lbnQgYXQgaW5kZXggPG51bWJlcj5cblxuICAgIHNlZ0NvbnRyb2wuc2V0VGl0bGUgPHN0cmluZz4sIDxudW1iZXI+XG4gICAgICAgICMgY2hhbmdlIHRoZSB0aXRsZSB0byA8c3RyaW5nPiBvZiB0aGUgc2VnbWVudCBhdCBpbmRleCA8bnVtYmVyPlxuXG4gICAgc2VnQ29udHJvbC5zZXRXaWR0aCA8bnVtYmVyPiwgPG51bWJlcj5cbiAgICAgICAgIyBoYXJkLXNldCB3aWR0aCBvZiBzZWdtZW50IGF0IHRoZSBzZWNvbmQgPG51bWJlcj4gaW5kZXggdG8gdGhlIGZpcnN0IDxudW1iZXI+XG5cbiAgICAjIE9ic2VydmUgdGhlIFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIgZXZlbnRcbiAgICBuYXZCYXIub24gXCJjaGFuZ2U6Y3VycmVudFNlZ21lbnRcIiwgKGN1cnJlbnRTZWdtZW50LCBsYXN0U2VnbWVudCkgLT5cblxuIyMjXG5cblxuY2xhc3MgZXhwb3J0cy5pT1NTZWdtZW50ZWRDb250cm9sIGV4dGVuZHMgTGF5ZXJcblxuICAgIGNvbnN0cnVjdG9yOiAob3B0aW9ucz17fSkgLT5cblxuICAgICAgICBASFBBRERJTkcgPSAxNlxuICAgICAgICBASEVJR0hUID0gMjlcblxuICAgICAgICBvcHRpb25zID0gXy5kZWZhdWx0cyB7fSwgb3B0aW9ucyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICAgICAgdGludENvbG9yOiBcIiMwMDdBRkZcIlxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkZGRkZcIlxuICAgICAgICAgICAgd2lkdGg6IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgICAgICBoZWlnaHQ6IEBIRUlHSFRcbiAgICAgICAgICAgIHg6IEBIUEFERElOR1xuICAgICAgICAgICAgaXNNb21lbnRhcnk6IGZhbHNlXG4gICAgICAgICAgICBjbGlwOiB0cnVlXG5cbiAgICAgICAgc3VwZXIgb3B0aW9uc1xuXG4gICAgICAgIEB0aW50Q29sb3IgPSBvcHRpb25zLnRpbnRDb2xvclxuICAgICAgICBAaXNNb21lbnRhcnkgPSBvcHRpb25zLmlzTW9tZW50YXJ5XG4gICAgICAgIEBib3JkZXJXaWR0aCA9IDFcbiAgICAgICAgQGJvcmRlclJhZGl1cyA9IDRcblxuICAgICAgICBAX2JhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yXG4gICAgICAgIEBfc2VnbWVudHMgPSBbXVxuICAgICAgICBmb3IgaXRlbSBpbiBvcHRpb25zLml0ZW1zXG4gICAgICAgICAgICBAX2FkZFNlZ21lbnQgaXRlbVxuICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcbiAgICAgICAgQF90b3VjaERvd24gPSBmYWxzZVxuXG4gICAgX3NlZ21lbnRGb3JFdmVudDogKGV2ZW50KSAtPlxuICAgICAgICAjIFRvdWNoTW92ZSBkb2Vzbid0IHdvcmsgdGhlIHNhbWUgb24gbW9iaWxlLCBzbyBkbyB0aGUgaGl0IHRlc3Rpbmcgb3Vyc2VsdmVzXG4gICAgICAgIHRvdWNoRXZlbnQgPSBFdmVudHMudG91Y2hFdmVudChldmVudClcbiAgICAgICAgcG9pbnQgPSB7eDp0b3VjaEV2ZW50LmNsaWVudFgsIHk6dG91Y2hFdmVudC5jbGllbnRZfVxuICAgICAgICBwb2ludCA9IFV0aWxzLmNvbnZlcnRQb2ludChwb2ludCwgdW5kZWZpbmVkLCBALCB0cnVlKVxuICAgICAgICBmb3IgYUxheWVyIGluIEBjaGlsZHJlblxuICAgICAgICAgICAgcmV0dXJuIGFMYXllciBpZiBVdGlscy5wb2ludEluRnJhbWUocG9pbnQsIGFMYXllci5mcmFtZSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgX2FkZFNlZ21lbnQ6ICh0aXRsZSwgaW5kZXgpIC0+XG4gICAgICAgIHNlZ21lbnQgPSBuZXcgTGF5ZXJcbiAgICAgICAgICAgIGhlaWdodDogQGhlaWdodFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBAX2JhY2tncm91bmRDb2xvclxuICAgICAgICAgICAgcGFyZW50OiBAXG4gICAgICAgICAgICBuYW1lOiBcIi5TZWdtZW50XCIrQF9zZWdtZW50cy5sZW5ndGhcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hTdGFydCAoZXZlbnQsIGxheWVyKSA9PlxuICAgICAgICAgICAgQF90b3VjaERvd24gPSB0cnVlXG4gICAgICAgICAgICBFdmVudHMud3JhcChkb2N1bWVudCkuYWRkRXZlbnRMaXN0ZW5lcihcInRhcGVuZFwiLCBAX3RvdWNoRW5kKVxuICAgICAgICAgICAgcmV0dXJuIGlmIGxheWVyIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgICAgICBsYXllci5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoQF90aW50Q29sb3IpLmFscGhhKC4xKVxuXG4gICAgICAgIHNlZ21lbnQub25Ub3VjaE1vdmUgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIGxheWVyID0gQF9zZWdtZW50Rm9yRXZlbnQgZXZlbnRcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyB1bmRlZmluZWRcblxuICAgICAgICAgICAgQF91bnNlbGVjdEFsbCgpXG4gICAgICAgICAgICByZXR1cm4gaWYgbGF5ZXIgaXMgQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgICAgIGlmIEBfdG91Y2hEb3duIHRoZW4gbGF5ZXIuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKEBfdGludENvbG9yKS5hbHBoYSguMSlcblxuICAgICAgICBzZWdtZW50Lm9uVG91Y2hFbmQgKGV2ZW50LCBsYXllcikgPT5cbiAgICAgICAgICAgIGxheWVyID0gQF9zZWdtZW50Rm9yRXZlbnQgZXZlbnRcbiAgICAgICAgICAgIHJldHVybiBpZiBsYXllciBpcyB1bmRlZmluZWRcblxuICAgICAgICAgICAgQF9zZWxlY3RJdGVtIGxheWVyXG5cbiAgICAgICAgdGl0bGVUZXh0ID0gbmV3IFRleHRMYXllclxuICAgICAgICAgICAgdGV4dDogdGl0bGVcbiAgICAgICAgICAgIHBhcmVudDogc2VnbWVudFxuICAgICAgICAgICAgbmFtZTogXCIuTGFiZWxcIlxuICAgICAgICAgICAgY29sb3I6IEBfdGludENvbG9yXG4gICAgICAgICAgICBmb250U2l6ZTogMTdcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMFxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiXG4gICAgICAgICAgICB3aWR0aDogc2VnbWVudC53aWR0aFxuICAgICAgICBzZWdtZW50LnRpdGxlID0gdGl0bGVcbiAgICAgICAgc2VnbWVudC5sYWJlbCA9IHRpdGxlVGV4dFxuICAgICAgICB0aXRsZVRleHQuZm9udFNpemUgPSAxM1xuXG4gICAgICAgIGlmIGluZGV4P1xuICAgICAgICAgICAgQF9zZWdtZW50cy5zcGxpY2UgaW5kZXgsIDAsIHNlZ21lbnRcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF9zZWdtZW50cy5wdXNoIHNlZ21lbnRcblxuICAgIF90b3VjaEVuZDogKGV2ZW50LCBsYXllcik9PlxuICAgICAgICBAX3RvdWNoRG93biA9IGZhbHNlXG4gICAgICAgIEBfdW5zZWxlY3RBbGwoKVxuXG4gICAgX2xheW91dFNlZ21lbnRzOiAoKS0+XG4gICAgICAgIGZvciBzZWdtZW50LCBpIGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgIHNlZ21lbnQuaW5kZXggPSBpICMgcGFzc2VkIGluIGV2ZW50IGhhbmRsZXIgaW4gY2FzZSBvZiByZS1sYXlvdXQgYWZ0ZXIgaW5pdFxuICAgICAgICAgICAgIyBidHcgdGhlIGFiaWxpdHkgdG8gc2V0V2lkdGggb2YgYW55IHNlZ21lbnQgaXMgd2h5IHRoaXMgY29tcGxleGl0eSBleGlzdHNcbiAgICAgICAgICAgIHVubGVzcyBzZWdtZW50Lmhhc0V4cGxpY2l0V2lkdGg/XG4gICAgICAgICAgICAgICAgc2VnbWVudHNXaXRoRXhwbGljaXRXaWR0aCA9IF8uZmlsdGVyIEBfc2VnbWVudHMsIChvKS0+IHJldHVybiBvLmhhc0V4cGxpY2l0V2lkdGg/XG4gICAgICAgICAgICAgICAgcmVtYWluaW5nV2lkdGggPSBAd2lkdGhcbiAgICAgICAgICAgICAgICBmb3Igd1NlZ21lbnQgaW4gc2VnbWVudHNXaXRoRXhwbGljaXRXaWR0aFxuICAgICAgICAgICAgICAgICAgICByZW1haW5pbmdXaWR0aCAtPSB3U2VnbWVudC53aWR0aFxuICAgICAgICAgICAgICAgIHNlZ21lbnQud2lkdGggPSBNYXRoLnJvdW5kIChyZW1haW5pbmdXaWR0aCAvIChAX3NlZ21lbnRzLmxlbmd0aCAtIHNlZ21lbnRzV2l0aEV4cGxpY2l0V2lkdGgubGVuZ3RoKSlcbiAgICAgICAgICAgIHNlZ21lbnQueCA9IG5leHRYXG4gICAgICAgICAgICBuZXh0WCA9IHNlZ21lbnQubWF4WFxuXG4gICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJpZ2h0ID0gXCIxcHggc29saWQgI3tAX3RpbnRDb2xvcn1cIlxuICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjBcIlxuICAgICAgICAgICAgaWYgaSBpcyAwIHRoZW4gc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweCAwIDAgNHB4XCJcbiAgICAgICAgICAgIGlmIGkgaXMgQF9zZWdtZW50cy5sZW5ndGgtMVxuICAgICAgICAgICAgICAgIGlmIEBfc2VnbWVudHMubGVuZ3RoIGlzIDFcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjRweFwiXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJpZ2h0ID0gXCJcIlxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LnN0eWxlLmJvcmRlclJhZGl1cyA9IFwiMCA0cHggNHB4IDBcIlxuXG4gICAgICAgICAgICBsYWJlbCA9IHNlZ21lbnQuY2hpbGRyZW5bMF1cbiAgICAgICAgICAgIGxhYmVsPy53aWR0aCA9IHNlZ21lbnQud2lkdGhcbiAgICAgICAgICAgIGxhYmVsPy5jZW50ZXIoKVxuICAgICAgICBAd2lkdGggPSBuZXh0WFxuXG4gICAgX3NlbGVjdEl0ZW06IChpdGVtKS0+XG4gICAgICAgIHJldHVybiBpZiBpdGVtIGlzIEBfc2VsZWN0ZWRJdGVtXG4gICAgICAgIGlmICFAaXNNb21lbnRhcnlcbiAgICAgICAgICAgIG9sZEl0ZW0gPSBAX3NlbGVjdGVkSXRlbVxuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0gPSBpdGVtXG4gICAgICAgICAgICBAX3Vuc2VsZWN0SXRlbSBvbGRJdGVtXG4gICAgICAgICAgICBAX2hpZ2hsaWdodEl0ZW0gQF9zZWxlY3RlZEl0ZW1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF91bnNlbGVjdEl0ZW0gaXRlbVxuICAgICAgICBAZW1pdChcImNoYW5nZTpjdXJyZW50U2VnbWVudFwiLCBpdGVtLCBvbGRJdGVtKVxuXG4gICAgX3Vuc2VsZWN0QWxsOiAoKS0+XG4gICAgICAgIGZvciBzZWdtZW50IGluIEBfc2VnbWVudHNcbiAgICAgICAgICAgIEBfcmVtb3ZlSGlnaGxpZ2h0IHNlZ21lbnQgdW5sZXNzIHNlZ21lbnQgaXMgQF9zZWxlY3RlZEl0ZW1cblxuICAgIF91bnNlbGVjdEl0ZW06IChpdGVtLCBpc0NsZWFyaW5nKS0+XG4gICAgICAgIGlmIGl0ZW0/IHRoZW4gQF9yZW1vdmVIaWdobGlnaHQgaXRlbVxuICAgICAgICBpZiBpc0NsZWFyaW5nXG4gICAgICAgICAgICBAX3NlbGVjdGVkSXRlbSA9IG51bGxcbiAgICAgICAgICAgIEBlbWl0KFwiY2hhbmdlOmN1cnJlbnRTZWdtZW50XCIsIG51bGwsIGl0ZW0pXG5cbiAgICBfaGlnaGxpZ2h0SXRlbTogKGl0ZW0pLT5cbiAgICAgICAgaXRlbS5iYWNrZ3JvdW5kQ29sb3IgPSBAX3RpbnRDb2xvclxuICAgICAgICBpdGVtLmxhYmVsLmNvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcblxuICAgIF9yZW1vdmVIaWdobGlnaHQ6IChpdGVtKS0+XG4gICAgICAgIGl0ZW0uYmFja2dyb3VuZENvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgaXRlbS5sYWJlbC5jb2xvciA9IEBfdGludENvbG9yXG5cbiAgICBfbGF5b3V0OiAoKS0+XG4gICAgICAgIEB3aWR0aCA9IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgQGRlZmluZSBcImlzTW9tZW50YXJ5XCIsXG4gICAgICAgIGdldDogLT4gQF9pc01vbWVudGFyeVxuICAgICAgICBzZXQ6ICh2YWx1ZSktPlxuICAgICAgICAgICAgQF9pc01vbWVudGFyeSA9IHZhbHVlXG5cbiAgICBAZGVmaW5lIFwidGludENvbG9yXCIsXG4gICAgICAgIGdldDogLT4gQF90aW50Q29sb3JcbiAgICAgICAgc2V0OiAodmFsdWUpLT5cbiAgICAgICAgICAgIEBib3JkZXJDb2xvciA9IHZhbHVlXG4gICAgICAgICAgICBpZiBAX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgZm9yIHNlZ21lbnQgaW4gQF9zZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICBzZWdtZW50LmxhYmVsLmNvbG9yID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudC5zdHlsZS5ib3JkZXJSaWdodCA9IFwiMXB4IHNvbGlkICN7dmFsdWV9XCJcbiAgICAgICAgICAgIEBfc2VsZWN0ZWRJdGVtPy5iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZVxuICAgICAgICAgICAgQF9zZWxlY3RlZEl0ZW0/LmxhYmVsLmNvbG9yID0gQF9iYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgICAgIEBfdGludENvbG9yID0gdmFsdWVcblxuICAgIEBkZWZpbmUgXCJudW1iZXJPZlNlZ21lbnRzXCIsXG4gICAgICAgIGdldDogLT4gQF9zZWdtZW50cz8ubGVuZ3RoXG5cbiAgICBAZGVmaW5lIFwic2VsZWN0ZWRTZWdtZW50SW5kZXhcIixcbiAgICAgICAgZ2V0OiAtPiBAX3NlbGVjdGVkSXRlbT8uaW5kZXhcblxuICAgIEBkZWZpbmUgXCJhdXRvTGF5b3V0XCIsXG4gICAgICAgIGdldDogLT4gQF9hdXRvTGF5b3V0XG4gICAgICAgIHNldDogKHZhbHVlKS0+XG4gICAgICAgICAgICBAX2F1dG9MYXlvdXQgPSB2YWx1ZVxuXG4gICAgc2V0U2VsZWN0ZWQ6IChpc1NlbGVjdGVkLCBpbmRleCkgLT5cbiAgICAgICAgc2VnbWVudCA9IEBfc2VnbWVudHNbaW5kZXhdXG4gICAgICAgIGlmIGlzU2VsZWN0ZWQgdGhlbiBAX3NlbGVjdEl0ZW0gc2VnbWVudCBlbHNlIEBfdW5zZWxlY3RJdGVtIHNlZ21lbnQsIHRydWVcblxuICAgIGluc2VydFNlZ21lbnQ6ICh0aXRsZSwgaW5kZXgpIC0+XG4gICAgICAgIGlmICFpbmRleD8gdGhlbiBpbmRleCA9IEBfc2VnbWVudHMubGVuZ3RoXG4gICAgICAgIEBfYWRkU2VnbWVudCB0aXRsZSwgaW5kZXhcbiAgICAgICAgQF9sYXlvdXRTZWdtZW50cygpXG5cbiAgICByZW1vdmVTZWdtZW50OiAoaW5kZXgpLT5cbiAgICAgICAgaWYgQF9zZWdtZW50c1tpbmRleF0/XG4gICAgICAgICAgICBAX3NlZ21lbnRzW2luZGV4XS5kZXN0cm95KClcbiAgICAgICAgICAgIEBfc2VnbWVudHMuc3BsaWNlIGluZGV4LCAxXG4gICAgICAgICAgICBAX2xheW91dFNlZ21lbnRzKClcblxuICAgIHJlbW92ZUFsbFNlZ21lbnRzOiAoKS0+XG4gICAgICAgIEByZW1vdmVTZWdtZW50IDAgd2hpbGUgQF9zZWdtZW50cy5sZW5ndGggPiAwXG5cbiAgICBzZXRUaXRsZTogKHRpdGxlLCBpbmRleCktPlxuICAgICAgICBAX3NlZ21lbnRzW2luZGV4XT8ubGFiZWwudGV4dCA9IHRpdGxlXG5cbiAgICBzZXRXaWR0aDogKHdpZHRoLCBpbmRleCktPlxuICAgICAgICBpZiB3aWR0aD9cbiAgICAgICAgICAgIEBfc2VnbWVudHNbaW5kZXhdPy5oYXNFeHBsaWNpdFdpZHRoID0gQF9zZWdtZW50c1tpbmRleF0/LndpZHRoID0gd2lkdGhcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQF9zZWdtZW50c1tpbmRleF0/Lmhhc0V4cGxpY2l0V2lkdGggPSBudWxsXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuXG4gICAgYXV0b1dpZHRoTGF5b3V0OiAoKS0+XG4gICAgICAgIEB3aWR0aCA9IFNjcmVlbi53aWR0aCAtIEBIUEFERElORyoyXG4gICAgICAgIEBfbGF5b3V0U2VnbWVudHMoKVxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFHQUE7O0FEQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUE7Ozs7QUFvQ00sT0FBTyxDQUFDOzs7RUFFRyw2QkFBQyxPQUFEO0FBRVQsUUFBQTs7TUFGVSxVQUFROzs7SUFFbEIs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
