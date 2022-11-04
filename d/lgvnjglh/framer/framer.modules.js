require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Apps":[function(require,module,exports){
var AppGrid, AppIcon, AppRow, AppView, appData, currentArray, currentGroupData, currentIconName, groupData, groups, i, iconMap, item, j, k, l, len, len1, len2, ref;

appData = JSON.parse(Utils.domLoadDataSync("appData.json"));

groupData = JSON.parse(Utils.domLoadDataSync("groups.json"));

iconMap = new Map();

for (j = 0, len = appData.length; j < len; j++) {
  item = appData[j];
  iconMap.set(item.name, item);
}

groups = new Map();

for (i = k = 0, len1 = groupData.length; k < len1; i = ++k) {
  currentGroupData = groupData[i];
  currentArray = [];
  ref = currentGroupData.items;
  for (l = 0, len2 = ref.length; l < len2; l++) {
    currentIconName = ref[l];
    currentArray.push(iconMap.get(currentIconName));
  }
  groups.set(currentGroupData.name, currentArray);
}

AppIcon = (function() {
  var appView;

  AppIcon.constData = {
    size: 56,
    inset: 56,
    gap: 12,
    inRow: 5
  };

  appView = null;

  AppIcon.prototype.name = "Unknown App";

  AppIcon.prototype.url = "yandex.ru";

  AppIcon.prototype.icon = "unknown.png";

  AppIcon.prototype.size = 56;

  AppIcon.prototype.inset = 56;

  AppIcon.prototype.gap = 12;

  AppIcon.prototype.isTitled = true;

  AppIcon.prototype.counter = 0;

  function AppIcon(name, url, icon1, size, gap, isTitled, counter) {
    this.name = name;
    this.url = url;
    this.icon = icon1;
    this.size = size != null ? size : AppIcon.constData.size;
    this.gap = gap != null ? gap : AppIcon.constData.gap;
    this.isTitled = isTitled != null ? isTitled : true;
    this.counter = counter != null ? counter : 0;
    this.composeIcon();
  }

  AppIcon.prototype.print = function() {};

  AppIcon.prototype.getView = function() {
    return this.appView;
  };

  AppIcon.prototype.setWhiteTitle = function() {
    this.getTitle().color = "white";
    this.getIcon().borderWidth = 0;
    this.getIcon().shadowY = 1;
    this.getIcon().shadowBlur = 2;
    return this.getIcon().shadowColor = "rgba(0, 0, 0, 0.1)";
  };

  AppIcon.prototype.setDarkTitle = function() {
    this.getTitle().color = "black";
    this.getIcon().borderWidth = 1;
    return this.getIcon().borderColor = "rgba(0, 0, 0, 0.1)";
  };

  AppIcon.prototype.getTitle = function() {
    return this.appView.children[1].children[0];
  };

  AppIcon.prototype.getIcon = function() {
    return this.appView.children[0];
  };

  AppIcon.prototype.getTitleView = function() {
    return this.appView.children[1];
  };

  AppIcon.prototype.composeIcon = function() {
    var appAsset, appBadge, appBadgeCounter, appIcon, appTitle, appTitleView;
    this.appView = new Layer({
      width: this.size,
      height: this.size + AppIcon.constData.inset,
      backgroundColor: "transparent",
      name: this.url
    });
    appIcon = new Layer({
      parent: this.appView,
      size: this.size,
      borderRadius: 16,
      name: "shape",
      backgroundColor: "white",
      clip: true
    });
    this.appView.on(Events.Tap, function(event, layer) {
      try {
        return window.webkit.messageHandlers.open.postMessage("https://" + layer.name);
      } catch (error) {}
    });
    appAsset = new Layer({
      parent: appIcon,
      size: 36,
      x: (this.size - 36) / 2,
      y: (this.size - 36) / 2,
      image: "images/apps/" + this.icon
    });
    if (this.name === "Яндекс" || this.name === "VK" || this.name === "OK" || this.name === "Youtube") {
      appAsset.width = this.size;
      appAsset.height = this.size;
      appAsset.x = 0;
      appAsset.y = 0;
      appAsset.backgroundColor = "transparent";
    }
    appTitleView = new Layer({
      parent: this.appView,
      width: this.size + (this.gap - 4),
      height: AppIcon.constData.inset,
      x: -this.gap / 2,
      y: this.size,
      name: "titleView",
      backgroundColor: "transparent"
    });
    appTitleView.states = {
      "shown": {
        opacity: 0.9
      },
      "hidden": {
        opacity: 0
      }
    };
    appTitle = new TextLayer({
      parent: appTitleView,
      width: appTitleView.width,
      fontSize: 12,
      lineHeight: 1.2,
      textAlign: "center",
      fontWeight: "500",
      text: this.name,
      padding: {
        top: 8
      },
      color: "white",
      height: this.size / 2,
      truncate: true,
      name: "title"
    });
    appBadge = new Layer({
      parent: this.appView,
      size: 24,
      x: 40,
      y: -8,
      borderRadius: "100%",
      backgroundColor: "#EB3A38",
      name: "badge"
    });
    appBadge.states = {
      "shown": {
        opacity: 1
      },
      "hidden": {
        opacity: 0
      }
    };
    if (this.counter !== 0) {
      appBadge.stateSwitch("shown");
    } else {
      appBadge.stateSwitch("hidden");
    }
    return appBadgeCounter = new TextLayer({
      parent: appBadge,
      width: appBadge.width,
      fontSize: 13,
      y: 3,
      textAlign: "center",
      fontWeight: "bold",
      text: this.counter,
      color: "white",
      height: 36,
      truncate: true,
      name: "counter"
    });
  };

  return AppIcon;

})();

AppRow = (function() {
  var rowView;

  rowView = null;

  AppRow.prototype.width = 360;

  AppRow.prototype.size = 56;

  AppRow.prototype.gap = 12;

  AppRow.prototype.offset = 0;

  function AppRow(appIconArray, size, gap) {
    var currentAppIcon, currentIconView, len3, m;
    this.size = size != null ? size : AppIcon.constData.size;
    this.gap = gap != null ? gap : AppIcon.constData.gap;
    this.offset = (this.width - ((AppIcon.constData.inRow - 1) * (this.size + this.gap) + this.size)) / 2;
    this.rowView = new Layer({
      width: this.width,
      height: this.size * 2,
      backgroundColor: "transparent",
      name: "row: " + appIconArray[0].name + " -> " + appIconArray[appIconArray.length - 1].name
    });
    for (i = m = 0, len3 = appIconArray.length; m < len3; i = ++m) {
      currentAppIcon = appIconArray[i];
      currentIconView = currentAppIcon.getView();
      currentIconView.parent = this.rowView;
      currentIconView.x = (i % AppIcon.constData.inRow) * (this.size + this.gap) + this.offset;
    }
  }

  AppRow.prototype.print = function() {};

  AppRow.prototype.getView = function() {
    return this.rowView;
  };

  return AppRow;

})();

AppGrid = (function() {
  var gridView, isInverted, rows, showText;

  gridView = null;

  isInverted = false;

  showText = true;

  rows = 0;

  function AppGrid(iconArray, isInverted1, showText1) {
    var currentIcon, currentRow, currentRowArray, len3, m, rowView;
    this.isInverted = isInverted1 != null ? isInverted1 : false;
    this.showText = showText1 != null ? showText1 : true;
    this.rows = (iconArray.length - iconArray.length % AppIcon.constData.inRow) / AppIcon.constData.inRow;
    if (iconArray.length % AppIcon.constData.inRow !== 0) {
      this.rows++;
    }
    this.gridView = new Layer({
      backgroundColor: "transparent",
      width: 360,
      height: this.rows * AppIcon.constData.size * 2,
      name: "gridView"
    });
    currentRowArray = [];
    currentRow = -1;
    for (i = m = 0, len3 = iconArray.length; m < len3; i = ++m) {
      currentIcon = iconArray[i];
      if (i % AppIcon.constData.inRow === 0) {
        currentRowArray = [];
        currentRow++;
      }
      currentRowArray.push(currentIcon);
      if (i % AppIcon.constData.inRow === AppIcon.constData.inRow - 1 || i === iconArray.length - 1) {
        rowView = new AppRow(currentRowArray).getView();
        rowView.parent = this.gridView;
        rowView.states = {
          "shown": {
            y: 0
          },
          "hidden": {
            y: 0
          }
        };
        if (this.isInverted) {
          rowView.states.shown.y = (this.rows - currentRow - 1) * AppIcon.constData.size * 2;
          rowView.states.hidden.y = this.gridView.height - (AppIcon.constData.size * 2) - currentRow * (AppIcon.constData.size + AppIcon.constData.gap);
        } else {
          rowView.states.shown.y = currentRow * AppIcon.constData.size * 2;
          rowView.states.hidden.y = currentRow * (AppIcon.constData.size + AppIcon.constData.gap);
        }
        if (this.showText) {
          rowView.stateSwitch("shown");
        } else {
          rowView.stateSwitch("hidden");
        }
      }
    }
  }

  AppGrid.prototype.getView = function() {
    return this.gridView;
  };

  return AppGrid;

})();

AppView = (function() {
  var data, icons, isInverted, isShown, isWhite, view;

  view = null;

  data = null;

  icons = null;

  isShown = true;

  isInverted = false;

  isWhite = false;

  AppView.prototype.getView = function() {
    return this.view;
  };

  function AppView(data1, isShown1, isInverted1, isWhite1) {
    var currentAppData, icon, len3, len4, len5, len6, len7, m, n, o, p, q, ref1, ref2, ref3, ref4, ref5, row;
    this.data = data1;
    this.isShown = isShown1 != null ? isShown1 : true;
    this.isInverted = isInverted1 != null ? isInverted1 : false;
    this.isWhite = isWhite1 != null ? isWhite1 : false;
    this.icons = [];
    ref1 = this.data;
    for (i = m = 0, len3 = ref1.length; m < len3; i = ++m) {
      currentAppData = ref1[i];
      this.icons.push(new AppIcon(currentAppData.name, currentAppData.url, currentAppData.icon));
    }
    ref2 = this.icons;
    for (n = 0, len4 = ref2.length; n < len4; n++) {
      icon = ref2[n];
      if (this.isWhite) {
        icon.setWhiteTitle();
      } else {
        icon.setDarkTitle();
      }
    }
    this.view = (new AppGrid(this.icons, this.isInverted, this.isShown)).getView();
    if (!this.isShown) {
      ref3 = this.view.children;
      for (o = 0, len5 = ref3.length; o < len5; o++) {
        row = ref3[o];
        row.stateSwitch("hidden");
        ref4 = row.children;
        for (p = 0, len6 = ref4.length; p < len6; p++) {
          icon = ref4[p];
          icon.children[1].stateSwitch("hidden");
        }
      }
    }
    ref5 = this.view.children;
    for (q = 0, len7 = ref5.length; q < len7; q++) {
      item = ref5[q];
      item.name = ".";
      item.sendToBack();
    }
  }

  return AppView;

})();

exports.getAllAppView = function() {
  var invertedOrder, titleShown, whiteText;
  return (new AppView(groups.get("Все приложения"), titleShown = true, invertedOrder = false, whiteText = false)).getView();
};

exports.getBestAppView = function() {
  var invertedOrder, titleShown, whiteText;
  return (new AppView(groups.get("Табло"), titleShown = false, invertedOrder = true, whiteText = true)).getView();
};

exports.getPromoApps = function() {
  var b, c, child, currentAppData, icon, len3, len4, len5, len6, localIconViews, m, n, o, p, preview, promoIconView, ref1, ref2, ref3;
  localIconViews = [];
  ref1 = groups.get("Фичеры");
  for (b = m = 0, len3 = ref1.length; m < len3; b = ++m) {
    currentAppData = ref1[b];
    icon = new AppIcon(currentAppData.name, currentAppData.url, currentAppData.icon, AppIcon.constData.size, AppIcon.constData.gap, false);
    icon.setDarkTitle();
    icon.getView().width = 108;
    icon.getView().height = 192;
    ref2 = icon.getView().children;
    for (c = n = 0, len4 = ref2.length; n < len4; c = ++n) {
      child = ref2[c];
      if (c === 0) {
        child.x += 26;
        child.y += 94;
        child.originY = 1.5;
        child.scale = 0.57;
        child.shadowY = 1;
        child.shadowBlur = 4;
        child.shadowColor = "rgba(0,0,0,0.25)";
      } else if (c === 1) {
        child.x = Align.center();
        child.y += 94 + 12;
      } else {
        child.opacity = 0;
      }
    }
    preview = new Layer({
      width: 96,
      height: 144,
      x: 6,
      y: 8,
      image: "images/best/" + b + ".png",
      parent: icon.getView()
    });
    preview.sendToBack();
    localIconViews.push(icon.getView());
  }
  for (o = 0, len5 = localIconViews.length; o < len5; o++) {
    promoIconView = localIconViews[o];
    ref3 = promoIconView.children;
    for (p = 0, len6 = ref3.length; p < len6; p++) {
      item = ref3[p];
      item.name = ".";
    }
  }
  return localIconViews;
};

exports.getURL = function(localAppName) {
  var currentApp, len3, m;
  for (m = 0, len3 = appData.length; m < len3; m++) {
    currentApp = appData[m];
    if (currentApp.name === localAppName) {
      return currentApp.url;
    }
  }
};

module.exports = {
  AppIcon: AppIcon
};


},{}],"PreviewClass1":[function(require,module,exports){
var Assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assets = require("Preview_Assets");

exports.PreviewClass1 = (function(superClass) {
  extend(PreviewClass1, superClass);

  function PreviewClass1(options) {
    this.options = options != null ? options : {};
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    this.logSize = bind(this.logSize, this);
    this.viewWidth = bind(this.viewWidth, this);
    this.viewSize = bind(this.viewSize, this);
    this.screenSize = bind(this.screenSize, this);
    _.defaults(this.options, {
      name: "Preview",
      view: null,
      backgroundColor: null,
      borderRadius: 42,
      assets: Assets.data
    });
    PreviewClass1.__super__.constructor.call(this, this.options);
    window.savePreviewMessageFramerObject(this);
    this.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
  }

  PreviewClass1.define('view', {
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

  PreviewClass1.define('assets', {
    get: function() {
      return this.options.assets;
    }
  });

  PreviewClass1.prototype.screenSize = function(w, h) {
    return Screen.width === w && Screen.height === h;
  };

  PreviewClass1.prototype.viewSize = function(w, h) {
    return this.width === w && this.height === h;
  };

  PreviewClass1.prototype.viewWidth = function(w) {
    return this.width === w;
  };

  PreviewClass1.prototype.logSize = function() {
    return new TextLayer({
      text: Screen.width + "x" + Screen.height,
      y: Align.center
    });
  };

  PreviewClass1.prototype.animateStateToNormal = function() {
    return this.animate("normal", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  PreviewClass1.prototype.animateStateToFill = function() {
    return this.animate("fill", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  PreviewClass1.prototype.stateSwitchToNormal = function() {
    return this.stateSwitch("normal");
  };

  PreviewClass1.prototype.stateSwitchToFill = function() {
    return this.stateSwitch("fill");
  };

  return PreviewClass1;

})(Layer);


},{"Preview_Assets":"Preview_Assets"}],"PreviewClass2":[function(require,module,exports){
var PreviewClass1,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass1 = require("PreviewClass1").PreviewClass1;

exports.PreviewClass2 = (function(superClass) {
  extend(PreviewClass2, superClass);

  function PreviewClass2(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createClassicAndroidStatusBar = bind(this.createClassicAndroidStatusBar, this);
    this.createAndroidStatusBar = bind(this.createAndroidStatusBar, this);
    this.createBars = bind(this.createBars, this);
    _.defaults(this.options, {
      statusBar: "dark",
      homeBar: "dark",
      visible: true,
      forceAndroidBar: false,
      prototypeCreationYear: "20:20"
    });
    PreviewClass2.__super__.constructor.call(this, this.options);
  }

  PreviewClass2.define('statusBar', {
    get: function() {
      return this.options.statusBar;
    },
    set: function(value) {
      return this.options.statusBar = value;
    }
  });

  PreviewClass2.define('homeBar', {
    get: function() {
      return this.options.homeBar;
    },
    set: function(value) {
      return this.options.homeBar = value;
    }
  });

  PreviewClass2.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  PreviewClass2.define('visible', {
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

  PreviewClass2.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
    }
  });

  PreviewClass2.prototype.createBars = function() {
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

  PreviewClass2.prototype.createAndroidStatusBar = function(temp) {
    temp.height = 32;
    return this.createClassicAndroidStatusBar(new Layer({
      parent: temp,
      width: temp.width - 16,
      x: Align.center,
      y: Align.top(6),
      backgroundColor: null
    }));
  };

  PreviewClass2.prototype.createClassicAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 20;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.top(-2),
      color: this.assets.color[this.statusBar],
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
      y: Align.top(-4.5),
      image: this.assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createClassicStatusBar = function(barLayer) {
    var classicCenterComponent, classicLeftComponent, classicRightomponent;
    barLayer.height = 20;
    classicLeftComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.left,
      image: this.assets.oldStatusBarLeftImage[this.statusBar]
    });
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: this.assets.color[this.statusBar],
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
      image: this.assets.oldStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createNotchStatusBar = function(barLayer) {
    var notchCenterComponent, notchLeftComponent, notchRightComponent;
    barLayer.height = 44;
    notchLeftComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 21,
      x: Align.left(21),
      y: Align.top(12),
      color: this.assets.color[this.statusBar],
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
      image: this.assets.statusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createHomeIndicator = function(barLayer) {
    var homeIndicator;
    return homeIndicator = new Layer({
      parent: barLayer,
      width: 135,
      height: 5,
      x: Align.center,
      y: Align.bottom(-8),
      backgroundColor: this.assets.color[this.homeBar],
      borderRadius: 20
    });
  };

  return PreviewClass2;

})(PreviewClass1);


},{"PreviewClass1":"PreviewClass1"}],"PreviewClass3":[function(require,module,exports){
var LogoLayer, PreviewClass2,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LogoLayer = require("Preview_LogoLayer").LogoLayer;

PreviewClass2 = require("PreviewClass2").PreviewClass2;

exports.PreviewClass3 = (function(superClass) {
  extend(PreviewClass3, superClass);

  function PreviewClass3(options) {
    this.options = options != null ? options : {};
    this.createScaleButton = bind(this.createScaleButton, this);
    this.createLogoButton = bind(this.createLogoButton, this);
    _.defaults(this.options, PreviewClass3.__super__.constructor.call(this, this.options));
  }

  PreviewClass3.prototype.createLogoButton = function() {
    var logoButton, openHomeHandler;
    openHomeHandler = function() {
      return window.location = "https://tilllur.com";
    };
    return logoButton = new LogoLayer({
      width: 76,
      height: 32,
      x: Align.left(32),
      y: Align.top(12),
      handler: openHomeHandler
    });
  };

  PreviewClass3.prototype.createScaleButton = function(forState) {
    var buttonInsideLayer, buttonScale, updateButtonOnResize;
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

  return PreviewClass3;

})(PreviewClass2);


},{"PreviewClass2":"PreviewClass2","Preview_LogoLayer":"Preview_LogoLayer"}],"PreviewClass4":[function(require,module,exports){
var PreviewClass3,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass3 = require("PreviewClass3").PreviewClass3;

exports.PreviewClass4 = (function(superClass) {
  extend(PreviewClass4, superClass);

  function PreviewClass4(options) {
    this.options = options != null ? options : {};
    this.getStateGeneric = bind(this.getStateGeneric, this);
    this.setCustomPreview = bind(this.setCustomPreview, this);
    this.previewMobile = bind(this.previewMobile, this);
    this.updatePreviewOnResize = bind(this.updatePreviewOnResize, this);
    this.previewDesktop = bind(this.previewDesktop, this);
    this.setDesktopScaleMode = bind(this.setDesktopScaleMode, this);
    this.updateScaleState = bind(this.updateScaleState, this);
    this.scalePreview = bind(this.scalePreview, this);
    _.defaults(this.options, PreviewClass4.__super__.constructor.call(this, this.options));
    this.scalePreview();
  }

  PreviewClass4.prototype.scalePreview = function() {
    if (Utils.isMobile()) {
      return this.previewMobile();
    } else {
      this.updateScaleState();
      this.setDesktopScaleMode();
      this.previewDesktop();
      return this.updatePreviewOnResize();
    }
  };

  PreviewClass4.prototype.updateScaleState = function() {
    var scaleX, scaleY;
    scaleX = (Canvas.width - 112) / this.width;
    scaleY = (Canvas.height - 112) / this.height;
    return this.states.fill.scale = Math.min(scaleX, scaleY);
  };

  PreviewClass4.prototype.setDesktopScaleMode = function(forState) {
    var initState, shouldShowButton, shouldShowLogo;
    if (forState == null) {
      forState = "normal";
    }
    initState = this.getStateGeneric("scale", [
      {
        value: "fill",
        result: "fill"
      }, {
        value: "normal",
        result: "normal"
      }, {
        value: "true",
        result: "fill"
      }
    ], forState);
    shouldShowButton = this.getStateGeneric("button", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], true);
    shouldShowLogo = this.getStateGeneric("logo", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], true);
    if (shouldShowLogo) {
      this.createLogoButton();
    }
    if (shouldShowButton) {
      this.createScaleButton(initState);
    }
    return this.stateSwitch(initState);
  };

  PreviewClass4.prototype.previewDesktop = function() {
    Canvas.backgroundColor = "222";
    this.createBars();
    this.center();
    return this.clip = true;
  };

  PreviewClass4.prototype.updatePreviewOnResize = function() {
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

  PreviewClass4.prototype.previewMobile = function() {
    var previewCanvas;
    previewCanvas = new BackgroundLayer({
      backgroundColor: "222",
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

  PreviewClass4.prototype.setCustomPreview = function() {
    var tip;
    this.y = Align.top;
    this.originY = 0.1;
    this.scale = (Screen.height - 120) / this.height;
    this.borderRadius = 20;
    this.clip = true;
    return tip = new Layer({
      width: 240,
      height: 44,
      image: this.assets.tip,
      x: Align.center,
      y: Align.bottom(-30),
      opacity: 0.5
    });
  };

  PreviewClass4.prototype.getStateGeneric = function(stateKey, statePairs, defaultResult) {
    var i, item, j, keyPart, keyValuePair, len, len1, pair, ref, result, valuePart;
    if (stateKey == null) {
      stateKey = "scale";
    }
    if (statePairs == null) {
      statePairs = [];
    }
    if (defaultResult == null) {
      defaultResult = "";
    }
    result = defaultResult;
    ref = location.search.slice(1).split('&');
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      keyValuePair = item.split("=");
      keyPart = keyValuePair[0];
      valuePart = keyValuePair[1];
      if (keyPart === stateKey) {
        for (j = 0, len1 = statePairs.length; j < len1; j++) {
          pair = statePairs[j];
          if (valuePart === pair.value) {
            result = pair.result;
          }
        }
      }
    }
    return result;
  };

  return PreviewClass4;

})(PreviewClass3);


},{"PreviewClass3":"PreviewClass3"}],"PreviewClass5":[function(require,module,exports){
var PreviewClass4,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass4 = require("PreviewClass4").PreviewClass4;

exports.PreviewClass5 = (function(superClass) {
  extend(PreviewClass5, superClass);

  function PreviewClass5(options) {
    var controlPanelLayer;
    this.options = options != null ? options : {};
    this.addSectionTitle = bind(this.addSectionTitle, this);
    this.addSectionButton = bind(this.addSectionButton, this);
    this.addSection = bind(this.addSection, this);
    controlPanelLayer = new Layer({
      width: 360,
      height: 1000,
      x: 20,
      y: 60,
      backgroundColor: null
    });
    _.defaults(this.options, {
      controlPanel: controlPanelLayer
    });
    PreviewClass5.__super__.constructor.call(this, this.options);
    controlPanelLayer.parent = this.parent;
  }

  PreviewClass5.define('controlPanel', {
    get: function() {
      return this.options.controlPanel;
    },
    set: function(value) {
      return this.options.controlPanel = value;
    }
  });

  PreviewClass5.prototype.addSection = function(title, actionArray) {
    var actionItem, i, index, len, results, sectionButton, sectionView, sumX;
    if (actionArray == null) {
      actionArray = [];
    }
    if (Utils.isMobile()) {

    } else {
      sectionView = new Layer({
        width: 360,
        height: 100,
        parent: this.controlPanel,
        backgroundColor: null
      });
      sectionView.y = (this.controlPanel.children.length - 1) * 100;
      this.addSectionTitle(title).parent = sectionView;
      sumX = 0;
      results = [];
      for (index = i = 0, len = actionArray.length; i < len; index = ++i) {
        actionItem = actionArray[index];
        sectionButton = this.addSectionButton(actionItem);
        sectionButton.parent = sectionView;
        sectionButton.x = sumX;
        results.push(sumX += sectionButton.width + 8);
      }
      return results;
    }
  };

  PreviewClass5.prototype.addSectionButton = function(actionItem, pV, pH) {
    var buttonLayer;
    if (pV == null) {
      pV = 6;
    }
    if (pH == null) {
      pH = 9;
    }
    buttonLayer = new TextLayer({
      text: actionItem.title,
      y: 42,
      padding: {
        top: pV,
        bottom: pV + 2,
        left: pH,
        right: pH
      },
      fontSize: 18,
      fontWeight: 500,
      color: "white",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 8
    });
    buttonLayer.on(Events.Tap, actionItem.handler);
    return buttonLayer;
  };

  PreviewClass5.prototype.addSectionTitle = function(title) {
    if (title == null) {
      title = "Header Title";
    }
    return new TextLayer({
      text: title,
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: 0.6,
      padding: {
        top: 12
      }
    });
  };

  return PreviewClass5;

})(PreviewClass4);


},{"PreviewClass4":"PreviewClass4"}],"PreviewClass6":[function(require,module,exports){
var PreviewClass5,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass5 = require("PreviewClass5").PreviewClass5;

exports.PreviewClass6 = (function(superClass) {
  extend(PreviewClass6, superClass);

  function PreviewClass6(options) {
    var treeViewLayer;
    this.options = options != null ? options : {};
    this.printNode = bind(this.printNode, this);
    this.printTree = bind(this.printTree, this);
    treeViewLayer = new ScrollComponent({
      width: 320,
      height: 0,
      scrollVertical: true,
      scrollHorizontal: false,
      mouseWheelEnabled: true,
      backgroundColor: "#222"
    });
    treeViewLayer.content.height = 0;
    treeViewLayer.mouseWheelEnabled = true;
    _.defaults(this.options, {
      treeView: treeViewLayer,
      indent: 1
    });
    PreviewClass6.__super__.constructor.call(this, this.options);
    treeViewLayer.parent = this.parent;
  }

  PreviewClass6.define('treeView', {
    get: function() {
      return this.options.treeView;
    },
    set: function(value) {
      return this.options.treeView = value;
    }
  });

  PreviewClass6.define('indent', {
    get: function() {
      return this.options.indent;
    },
    set: function(value) {
      return this.options.indent = value;
    }
  });

  PreviewClass6.prototype.printTree = function() {
    print(this.view.children);
    this.printNode(this.view);
    this.treeView.height = Screen.height;
    return this.treeView.updateContent();
  };

  PreviewClass6.prototype.printNode = function(node, level) {
    var childNode, i, layerName, len, nextLevel, ref, results, treeNodeLayer;
    if (level == null) {
      level = 0;
    }
    if (node.name === "") {
      layerName = "Untitled";
    } else {
      layerName = node.name;
    }
    treeNodeLayer = new TextLayer({
      parent: this.treeView.content,
      text: Array(level + 1).join(" ・ ") + (" " + layerName),
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: layerName === "Untitled" ? 0.5 : 1,
      height: 28,
      y: this.treeView.height,
      backgroundColor: null,
      custom: {
        layer: node
      }
    });
    treeNodeLayer.onTap(function() {
      return print(this.custom.layer.name + " x: " + this.custom.layer.x + " y: " + this.custom.layer.y + " size: " + this.custom.layer.width + "x" + this.custom.layer.height);
    });
    this.treeView.height += 28;
    if (node.children.length > 0) {
      nextLevel = level + 1;
      ref = node.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        childNode = ref[i];
        results.push(this.printNode(childNode, nextLevel));
      }
      return results;
    }
  };

  return PreviewClass6;

})(PreviewClass5);


},{"PreviewClass5":"PreviewClass5"}],"PreviewComponentAssets":[function(require,module,exports){
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
var FixPreviewExport, PreviewClass6,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Extras.Hints.disable();

PreviewClass6 = require("PreviewClass6").PreviewClass6;

FixPreviewExport = (function(superClass) {
  extend(FixPreviewExport, superClass);

  function FixPreviewExport() {
    return FixPreviewExport.__super__.constructor.apply(this, arguments);
  }

  return FixPreviewExport;

})(PreviewClass6);

exports.Preview = (function(superClass) {
  extend(Preview, superClass);

  function Preview() {
    return Preview.__super__.constructor.apply(this, arguments);
  }

  return Preview;

})(FixPreviewExport);

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


},{"PreviewClass6":"PreviewClass6"}],"Preview_Assets":[function(require,module,exports){
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
  notch: "modules/PreviewComponentAssets/statusBar_notch.png",
  tip: "modules/PreviewComponentAssets/tip.png"
};


},{}],"Preview_LogoLayer":[function(require,module,exports){
var getLogo,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.LogoLayer = (function(superClass) {
  extend(LogoLayer, superClass);

  function LogoLayer(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      opacity: 0.5,
      handler: null,
      svg: getLogo("FFF")
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
  selectedColor = "#FFFFFF";
  return "<svg width=\"76\" height=\"32\" viewBox=\"0 0 76 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M2.79199 21.6C2.79199 21.168 2.90399 20.408 3.12799 19.32L4.39999 12.84H2.98399L3.07999 12.12C4.99999 11.544 6.88799 10.552 8.74399 9.14398H9.89599L9.31999 11.76H11.192L10.976 12.84H9.12799L7.90399 19.32C7.69599 20.312 7.59199 20.976 7.59199 21.312C7.59199 22.08 7.92799 22.544 8.59999 22.704C8.43999 23.248 8.07199 23.68 7.49599 24C6.91999 24.32 6.22399 24.48 5.40799 24.48C4.59199 24.48 3.95199 24.224 3.48799 23.712C3.02399 23.2 2.79199 22.496 2.79199 21.6Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M17.5599 22.68C17.0639 23.88 16.0239 24.48 14.4399 24.48C13.6239 24.48 12.9599 24.2 12.4479 23.64C12.0159 23.144 11.7999 22.648 11.7999 22.152C11.7999 20.856 12.0959 18.944 12.6879 16.416L13.5759 11.76L18.4479 11.28L16.9839 18.864C16.7119 20.048 16.5759 20.848 16.5759 21.264C16.5759 22.176 16.9039 22.648 17.5599 22.68ZM14.0079 8.42398C14.0079 7.79998 14.2639 7.31998 14.7759 6.98398C15.3039 6.64798 15.9439 6.47998 16.6959 6.47998C17.4479 6.47998 18.0479 6.64798 18.4959 6.98398C18.9599 7.31998 19.1919 7.79998 19.1919 8.42398C19.1919 9.04798 18.9359 9.51998 18.4239 9.83998C17.9279 10.16 17.3039 10.32 16.5519 10.32C15.7999 10.32 15.1839 10.16 14.7039 9.83998C14.2399 9.51998 14.0079 9.04798 14.0079 8.42398Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M26.0606 22.68C25.5646 23.88 24.5246 24.48 22.9406 24.48C22.1406 24.48 21.4846 24.2 20.9726 23.64C20.5566 23.176 20.3486 22.68 20.3486 22.152C20.3486 20.952 20.6286 19.04 21.1886 16.416L22.9406 7.19998L27.8126 6.71998L25.4846 18.864C25.2126 20.048 25.0766 20.848 25.0766 21.264C25.0766 22.176 25.4046 22.648 26.0606 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M34.5618 22.68C34.0658 23.88 33.0258 24.48 31.4418 24.48C30.6418 24.48 29.9858 24.2 29.4738 23.64C29.0578 23.176 28.8498 22.68 28.8498 22.152C28.8498 20.952 29.1298 19.04 29.6898 16.416L31.4418 7.19998L36.3138 6.71998L33.9858 18.864C33.7138 20.048 33.5778 20.848 33.5778 21.264C33.5778 22.176 33.9058 22.648 34.5618 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M43.0631 22.68C42.5671 23.88 41.5271 24.48 39.9431 24.48C39.1431 24.48 38.4871 24.2 37.9751 23.64C37.5591 23.176 37.3511 22.68 37.3511 22.152C37.3511 20.952 37.6311 19.04 38.1911 16.416L39.9431 7.19998L44.8151 6.71998L42.4871 18.864C42.2151 20.048 42.0791 20.848 42.0791 21.264C42.0791 22.176 42.4071 22.648 43.0631 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M53.5323 22.992C52.7643 23.984 51.4283 24.48 49.5243 24.48C48.5323 24.48 47.6763 24.184 46.9563 23.592C46.2363 22.984 45.8763 22.248 45.8763 21.384C45.8763 20.904 45.9003 20.544 45.9483 20.304L47.5563 11.76L52.4283 11.28L50.6763 20.544C50.6123 20.896 50.5803 21.176 50.5803 21.384C50.5803 22.312 50.8603 22.776 51.4203 22.776C52.0443 22.776 52.5803 22.352 53.0283 21.504C53.1723 21.232 53.2763 20.92 53.3403 20.568L55.0443 11.76L59.7723 11.28L57.9963 20.64C57.9483 20.88 57.9243 21.128 57.9243 21.384C57.9243 21.64 57.9963 21.912 58.1403 22.2C58.2843 22.472 58.5883 22.64 59.0523 22.704C58.9563 23.088 58.7403 23.408 58.4043 23.664C57.7003 24.208 56.9643 24.48 56.1963 24.48C55.4443 24.48 54.8443 24.344 54.3963 24.072C53.9483 23.8 53.6603 23.44 53.5323 22.992Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M69.2947 17.256C69.8707 16.232 70.1587 15.2 70.1587 14.16C70.1587 13.472 69.9107 13.128 69.4147 13.128C69.0307 13.128 68.6387 13.456 68.2387 14.112C67.8227 14.768 67.5507 15.52 67.4227 16.368L66.1747 24L61.2067 24.48L63.6547 11.76L67.6147 11.28L67.1827 13.704C67.9667 12.088 69.2387 11.28 70.9987 11.28C71.9267 11.28 72.6387 11.52 73.1347 12C73.6467 12.48 73.9027 13.216 73.9027 14.208C73.9027 15.184 73.5747 15.984 72.9187 16.608C72.2787 17.232 71.4067 17.544 70.3027 17.544C69.8227 17.544 69.4867 17.448 69.2947 17.256Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3X0xvZ29MYXllci5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdfQXNzZXRzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NvbXBvbmVudC5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3M2LmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzNS5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczQuY29mZmVlIiwiLi4vbW9kdWxlcy9QcmV2aWV3Q2xhc3MzLmNvZmZlZSIsIi4uL21vZHVsZXMvUHJldmlld0NsYXNzMi5jb2ZmZWUiLCIuLi9tb2R1bGVzL1ByZXZpZXdDbGFzczEuY29mZmVlIiwiLi4vbW9kdWxlcy9BcHBzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIiMgTG9nb1xuXG5jbGFzcyBleHBvcnRzLkxvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKFwiRkZGXCIpXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG5cbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdFxuXG5cdFxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblxuXG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcblx0dGlwOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy90aXAucG5nXCJcbiIsIiMgUHJldmlldyBDb21wb25lbnRcblxuRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuIyB7UHJldmlld0NsYXNzMX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzMVwiXG4jIHtQcmV2aWV3Q2xhc3M0fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M0XCJcbiMge1ByZXZpZXdDbGFzczV9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczVcIlxue1ByZXZpZXdDbGFzczZ9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczZcIlxuXG4jIHByaW50IFByZXZpZXdcblxuXG5jbGFzcyBGaXhQcmV2aWV3RXhwb3J0IGV4dGVuZHMgUHJldmlld0NsYXNzNlxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3IGV4dGVuZHMgRml4UHJldmlld0V4cG9ydFxuXG5cblxuXG4jIE5hdGl2ZVxuXG5gd2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGZ1bmN0aW9uIChsYXllcikge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBsYXllclxufVxuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlTm9ybWFsID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVOb3JtYWxcIiwgcmVjZWl2ZU1lc3NhZ2VOb3JtYWwsIGZhbHNlKTtcbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHRjb25zb2xlLmxvZyhldmVudClcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvRmlsbCgpXG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGVGaWxsXCIsIHJlY2VpdmVNZXNzYWdlLCBmYWxzZSk7XG5gXG5cblxuXG5cbiMgcHJldmlldy5hZGRTZWN0aW9uKFwiU2VjdGlvbiBUaXRsZVwiLCBbXG4jIFx0eyB0aXRsZTogXCJUaXRsZTFcIiwgaGFuZGxlcjogaGFuZGxlcjEgfSxcbiMgXHR7IHRpdGxlOiBcIlRpdGxlMlwiLCBoYW5kbGVyOiBoYW5kbGVyMiB9LFxuIyBdKVxuXG5cblxuXG5cblxuXG4iLCJcbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG4iLCJcblxue1ByZXZpZXdDbGFzczV9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczVcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNiBleHRlbmRzIFByZXZpZXdDbGFzczVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRyZWVWaWV3TGF5ZXIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMzIwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcblx0XHR0cmVlVmlld0xheWVyLmNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdHRyZWVWaWV3TGF5ZXIubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cdFx0XHRcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0cmVlVmlldzogdHJlZVZpZXdMYXllclxuXHRcdFx0aW5kZW50OiAxXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyZWVWaWV3TGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICd0cmVlVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50cmVlVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50cmVlVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbmRlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5kZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluZGVudCA9IHZhbHVlXG5cdFxuXG5cblx0cHJpbnRUcmVlOiAoKSA9PlxuXHRcdHByaW50IEB2aWV3LmNoaWxkcmVuXG5cdFx0QHByaW50Tm9kZShAdmlldylcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXHRcdEB0cmVlVmlldy51cGRhdGVDb250ZW50KClcblx0XG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAdHJlZVZpZXcuY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQHRyZWVWaWV3LmhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdHRyZWVOb2RlTGF5ZXIub25UYXAgLT5cblx0XHRcdHByaW50IFwiI3tAY3VzdG9tLmxheWVyLm5hbWV9IHg6ICN7QGN1c3RvbS5sYXllci54fSB5OiAje0BjdXN0b20ubGF5ZXIueX0gc2l6ZTogI3tAY3VzdG9tLmxheWVyLndpZHRofXgje0BjdXN0b20ubGF5ZXIuaGVpZ2h0fVwiXG5cblx0XHRcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ICs9IDI4XG5cblxuXHRcdGlmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0bmV4dExldmVsID0gbGV2ZWwgKyAxXG5cdFx0XHRmb3IgY2hpbGROb2RlIGluIG5vZGUuY2hpbGRyZW5cblx0XHRcdFx0QHByaW50Tm9kZShjaGlsZE5vZGUsIG5leHRMZXZlbClcblx0XHRcbiIsIlxuXG57UHJldmlld0NsYXNzNH0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNFwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3M1IGV4dGVuZHMgUHJldmlld0NsYXNzNFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAzNjAsIGhlaWdodDogMTAwMFxuXHRcdFx0eDogMjAsIHk6IDYwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRjb250cm9sUGFuZWw6IGNvbnRyb2xQYW5lbExheWVyXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdGNvbnRyb2xQYW5lbExheWVyLnBhcmVudCA9IEBwYXJlbnRcblxuXHRcblx0QGRlZmluZSAnY29udHJvbFBhbmVsJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5jb250cm9sUGFuZWwgPSB2YWx1ZVxuXHRcblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiByZXR1cm5cblx0XHRlbHNlXG5cdFx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0XHR3aWR0aDogMzYwXG5cdFx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRyb2xQYW5lbFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFx0c2VjdGlvblZpZXcueSA9IChAY29udHJvbFBhbmVsLmNoaWxkcmVuLmxlbmd0aCAtIDEpICogMTAwXG5cblx0XHRcdEBhZGRTZWN0aW9uVGl0bGUodGl0bGUpLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cblx0XHRcdHN1bVggPSAwXG5cdFx0XHRmb3IgYWN0aW9uSXRlbSwgaW5kZXggaW4gYWN0aW9uQXJyYXlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRTZWN0aW9uQnV0dG9uKGFjdGlvbkl0ZW0pXG5cdFx0XHRcdHNlY3Rpb25CdXR0b24ucGFyZW50ID0gc2VjdGlvblZpZXdcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0XHRzdW1YICs9IHNlY3Rpb25CdXR0b24ud2lkdGggKyA4XG5cdFx0XHRcdFxuXG5cblxuXG5cdGFkZFNlY3Rpb25CdXR0b246IChhY3Rpb25JdGVtLCBwViA9IDYsIHBIID0gOSkgPT5cblx0XHRidXR0b25MYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IGFjdGlvbkl0ZW0udGl0bGVcblx0XHRcdHk6IDQyXG5cdFx0XHRwYWRkaW5nOiB7IHRvcDogcFYsIGJvdHRvbTogcFYgKyAyLCBsZWZ0OiBwSCwgcmlnaHQ6IHBIIH1cblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0XHRcdGJvcmRlclJhZGl1czogOFxuXHRcdFxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGFjdGlvbkl0ZW0uaGFuZGxlcilcblx0XHRyZXR1cm4gYnV0dG9uTGF5ZXJcblxuXG5cdGFkZFNlY3Rpb25UaXRsZTogKHRpdGxlID0gXCJIZWFkZXIgVGl0bGVcIikgPT5cblx0XHRyZXR1cm4gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogdGl0bGVcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdHBhZGRpbmc6XG5cdFx0XHRcdHRvcDogMTJcblxuXG5cblxuIyAjIEV4YW1wbGVcbiMgcHJldmlldy5hZGRTZWN0aW9uKFwiQ2hvb3NlIEJhY2tncm91bmRcIiwgW1xuIyBcdHsgdGl0bGU6IHRlc3QxLCBoYW5kbGVyOiB0ZXN0MiB9LFxuIyBcdHsgdGl0bGU6IHRlc3QxLCBoYW5kbGVyOiB0ZXN0MiB9XG4jIF0pIiwiXG5cbntQcmV2aWV3Q2xhc3MzfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MzXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczQgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0XG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKClcblx0XHRcdEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlXG5cdFx0XHRAdXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XHRAc2V0RGVza3RvcFNjYWxlTW9kZSgpXG5cdFx0XHRAcHJldmlld0Rlc2t0b3AoKVxuXHRcdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cblxuXHRcblx0XG5cdHVwZGF0ZVNjYWxlU3RhdGU6ICgpID0+XG5cdFx0c2NhbGVYID0gKENhbnZhcy53aWR0aCAtIDExMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoQ2FudmFzLmhlaWdodCAtIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlcy5maWxsLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cdFxuXG5cblxuXG5cdHNldERlc2t0b3BTY2FsZU1vZGU6IChmb3JTdGF0ZSA9IFwibm9ybWFsXCIpID0+XG5cblx0XHRpbml0U3RhdGUgPSBAZ2V0U3RhdGVHZW5lcmljKFwic2NhbGVcIiwgW3sgdmFsdWU6IFwiZmlsbFwiLCByZXN1bHQ6IFwiZmlsbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm5vcm1hbFwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IFwiZmlsbFwiIH1dLCBmb3JTdGF0ZSlcblxuXHRcdHNob3VsZFNob3dCdXR0b24gPSBAZ2V0U3RhdGVHZW5lcmljKFwiYnV0dG9uXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCB0cnVlKVxuXG5cdFx0c2hvdWxkU2hvd0xvZ28gPSBAZ2V0U3RhdGVHZW5lcmljKFwibG9nb1wiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIHRydWUpXG5cdFx0XG5cdFx0aWYgc2hvdWxkU2hvd0xvZ28gdGhlbiBAY3JlYXRlTG9nb0J1dHRvbigpXG5cdFx0aWYgc2hvdWxkU2hvd0J1dHRvbiB0aGVuIEBjcmVhdGVTY2FsZUJ1dHRvbihpbml0U3RhdGUpXG5cdFx0QHN0YXRlU3dpdGNoKGluaXRTdGF0ZSlcblx0XG5cdFxuXHRcblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0Q2FudmFzLmJhY2tncm91bmRDb2xvciA9IFwiMjIyXCJcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNlbnRlcigpXG5cdFx0QGNsaXAgPSB0cnVlXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueSA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRwcmV2aWV3Q2FudmFzID0gbmV3IEJhY2tncm91bmRMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjIyMlwiLCBuYW1lOiBcIi5oaWRkZW5QcmV2aWV3Q2FudmFzXCJcblx0XHRcblx0XHRAY2xpcCA9IGZhbHNlXG5cdFx0QGNlbnRlcigpXG5cdFx0QG9yaWdpblkgPSAwLjVcblx0XHRAb3JpZ2luWCA9IDAuNVxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNilcblx0XHRcdFxuXHRcdFx0aWYgQHNjcmVlblNpemUoMzc1LCA3NjgpIG9yIEBzY3JlZW5TaXplKDM5MCwgNzk3KSBvciBAc2NyZWVuU2l6ZSg0MTQsIDg1Mikgb3IgQHNjcmVlblNpemUoNDI4LCA4NzkpXG5cdFx0XHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2V0Q3VzdG9tUHJldmlldygpXG5cdFx0XG4jIFx0XHRlbHNlIGlmIEB2aWV3LndpZHRoID09IDM2MFxuXHRcdFx0XG5cdFx0ZWxzZVxuXHRcdFx0QHNldEN1c3RvbVByZXZpZXcoKVxuXHRcblx0XG5cblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcFxuXHRcdEBvcmlnaW5ZID0gMC4xXG5cdFx0XG5cdFx0QHNjYWxlID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGhlaWdodFxuXHRcdEBib3JkZXJSYWRpdXMgPSAyMFxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cdFx0dGlwID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMjQwLCBoZWlnaHQ6IDQ0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy50aXBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC0zMClcblx0XHRcdG9wYWNpdHk6IDAuNVxuXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwib2sgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG57TG9nb0xheWVyfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0xvZ29MYXllclwiXG57UHJldmlld0NsYXNzMn0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzMlwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3MzIGV4dGVuZHMgUHJldmlld0NsYXNzMlxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XG5cdFxuXHRcblx0Y3JlYXRlTG9nb0J1dHRvbjogKCkgPT5cblx0XHRcblx0XHRvcGVuSG9tZUhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCJodHRwczovL3RpbGxsdXIuY29tXCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdGNyZWF0ZVNjYWxlQnV0dG9uOiAoZm9yU3RhdGUpID0+XG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUgPSBuZXcgTGF5ZXJcblx0XHRcdHNpemU6IDQ4LCBib3JkZXJSYWRpdXM6IDQ4XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzIpLCB5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMSlcIlxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0cHJldmlldzogQFxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJ1dHRvblNjYWxlXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0c2l6ZTogMjgsIGJvcmRlclJhZGl1czogMjJcblx0XHRcdHg6IDEwLCB5OiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25TY2FsZS5vblRhcCAtPlxuXHRcdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBuZXh0U3RhdGUgPSBcIm5vcm1hbFwiIGVsc2UgbmV4dFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY2hpbGRyZW5bMF0uc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGN1c3RvbS5wcmV2aWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUgPSAoYnV0dG9uTGF5ZXIpID0+XG5cdFx0XHRsb2NhbEJ1dHRvbiA9IGJ1dHRvbkxheWVyXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueCA9IEFsaWduLnJpZ2h0KC0zMilcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnkgPSBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplKGJ1dHRvblNjYWxlKVxuXG5cblxuIiwiXG5cbntQcmV2aWV3Q2xhc3MxfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MxXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczIgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MxXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c3RhdHVzQmFyOiBcImRhcmtcIiAjIGxpZ2h0L2Rhcmtcblx0XHRcdGhvbWVCYXI6IFwiZGFya1wiICMgbGlnaHQvZGFya1xuXG5cdFx0XHR2aXNpYmxlOiB0cnVlICMgdHJ1ZSAvIGZhbHNlXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlICMgdHJ1ZSAvIGZhbHNlXG5cblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogXCIyMDoyMFwiICMgZ2VuZXJhdGVkIGZyb20ganNvblxuXHRcdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnN0YXR1c0JhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaG9tZUJhciA9IHZhbHVlXG5cblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblxuXHQjIENyZWF0ZSBCYXJzXG5cblx0Y3JlYXRlQmFyczogKCkgPT5cblx0XHR0b3BCYXIgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFxuXHRcdGVsc2UgaWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcikgXG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAodGVtcCkgPT5cblx0XHR0ZW1wLmhlaWdodCA9IDMyXG5cdFx0XG5cdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyIG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiB0ZW1wLCB3aWR0aDogdGVtcC53aWR0aCAtIDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLnRvcCg2KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgtMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wKC00LjUpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRob21lSW5kaWNhdG9yID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bob21lQmFyXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0IiwiXG5cbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3X0Fzc2V0c1wiXG5cblxuIyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0XG5cblx0XG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cblx0QGRlZmluZSAnYXNzZXRzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0c1xuXG5cblxuXG5cblx0c2NyZWVuU2l6ZTogKHcsIGgpID0+IHJldHVybiBTY3JlZW4ud2lkdGggPT0gdyBhbmQgU2NyZWVuLmhlaWdodCA9PSBoXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB3aWR0aCA9PSB3IGFuZCBAaGVpZ2h0ID09IGhcblx0dmlld1dpZHRoOiAodykgPT4gcmV0dXJuIEB3aWR0aCA9PSB3XG5cblx0bG9nU2l6ZTogKCkgPT5cblx0XHRuZXcgVGV4dExheWVyIHsgdGV4dDogXCIje1NjcmVlbi53aWR0aH14I3tTY3JlZW4uaGVpZ2h0fVwiLCB5OiBBbGlnbi5jZW50ZXIgfVx0XG5cblxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwibm9ybWFsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcImZpbGxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcImZpbGxcIilcblxuXG5cdFx0XG4iLCIjIGNsYXNzIEFwcEljb25cblxuIyBhcHBEYXRhVVJMID0gXCJodHRwczovL2RsLmRyb3Bib3h1c2VyY29udGVudC5jb20vcy9senRxMnVoMHhyM2w0ajIvYXBwRGF0YS5qc29uXCJcbmFwcERhdGEgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBcImFwcERhdGEuanNvblwiXG5ncm91cERhdGEgPSBKU09OLnBhcnNlIFV0aWxzLmRvbUxvYWREYXRhU3luYyBcImdyb3Vwcy5qc29uXCJcblxuaWNvbk1hcCA9IG5ldyBNYXAoKVxuZm9yIGl0ZW0gaW4gYXBwRGF0YVxuXHRpY29uTWFwLnNldChpdGVtLm5hbWUsIGl0ZW0pXG5cbmdyb3VwcyA9IG5ldyBNYXAoKVxuZm9yIGN1cnJlbnRHcm91cERhdGEsIGkgaW4gZ3JvdXBEYXRhXG5cdGN1cnJlbnRBcnJheSA9IFtdXG5cdFxuXHRmb3IgY3VycmVudEljb25OYW1lIGluIGN1cnJlbnRHcm91cERhdGEuaXRlbXNcblx0XHRjdXJyZW50QXJyYXkucHVzaChpY29uTWFwLmdldChjdXJyZW50SWNvbk5hbWUpKVxuXHRcblx0Z3JvdXBzLnNldChjdXJyZW50R3JvdXBEYXRhLm5hbWUsIGN1cnJlbnRBcnJheSlcblxuXG5cblxuXG5cblxuY2xhc3MgQXBwSWNvblxuXHRAY29uc3REYXRhID0ge1xuXHRcdHNpemU6IDU2XG5cdFx0aW5zZXQ6IDU2XG5cdFx0Z2FwOiAxMlxuXHRcdGluUm93OiA1XG5cdH1cblx0XG5cdGFwcFZpZXcgPSBudWxsXG5cdFxuXHRuYW1lOiBcIlVua25vd24gQXBwXCJcblx0dXJsOiBcInlhbmRleC5ydVwiXG5cdGljb246IFwidW5rbm93bi5wbmdcIlxuXHRcblx0c2l6ZTogNTZcblx0aW5zZXQ6IDU2XG5cdGdhcDogMTJcblx0XG5cdGlzVGl0bGVkOiB0cnVlXG5cdGNvdW50ZXI6IDBcblx0XG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBuYW1lLCBAdXJsLCBAaWNvbiwgQHNpemUgPSBBcHBJY29uLmNvbnN0RGF0YS5zaXplLCBAZ2FwID0gQXBwSWNvbi5jb25zdERhdGEuZ2FwLCBAaXNUaXRsZWQgPSB0cnVlLCBAY291bnRlciA9IDApIC0+XG5cdFx0QGNvbXBvc2VJY29uKClcbiMgXHRcdHByaW50IEBpY29uXG5cdFxuXHRwcmludDogKCkgLT5cbiMgXHRcdHByaW50IEFwcEljb24udGVtcFxuXHRcblx0Z2V0VmlldzogKCkgLT5cblx0XHRyZXR1cm4gQGFwcFZpZXdcblx0XG5cblx0c2V0V2hpdGVUaXRsZTogKCkgLT5cblx0XHRAZ2V0VGl0bGUoKS5jb2xvciA9IFwid2hpdGVcIlxuXG5cdFx0QGdldEljb24oKS5ib3JkZXJXaWR0aCA9IDBcblx0XHRAZ2V0SWNvbigpLnNoYWRvd1kgPSAxXG5cdFx0QGdldEljb24oKS5zaGFkb3dCbHVyID0gMlxuXHRcdEBnZXRJY29uKCkuc2hhZG93Q29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC4xKVwiXG5cdFxuXG5cdHNldERhcmtUaXRsZTogKCkgLT5cblx0XHRAZ2V0VGl0bGUoKS5jb2xvciA9IFwiYmxhY2tcIlxuXG5cdFx0QGdldEljb24oKS5ib3JkZXJXaWR0aCA9IDFcblx0XHRAZ2V0SWNvbigpLmJvcmRlckNvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuMSlcIlxuXHRcblxuXHRnZXRUaXRsZTogKCkgLT5cblx0XHRyZXR1cm4gQGFwcFZpZXcuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF1cblxuXHRnZXRJY29uOiAoKSAtPlxuXHRcdCMgcHJpbnQgQGFwcFZpZXcuY2hpbGRyZW5bMF0ubmFtZVxuXHRcdHJldHVybiBAYXBwVmlldy5jaGlsZHJlblswXVxuXHRcblx0Z2V0VGl0bGVWaWV3OiAoKSAtPlxuXHRcdCMgcHJpbnQgQGFwcFZpZXcuY2hpbGRyZW5bMV0uc3RhdGVzXG5cdFx0cmV0dXJuIEBhcHBWaWV3LmNoaWxkcmVuWzFdXG5cdFxuXHRjb21wb3NlSWNvbjogKCkgLT5cblx0XHRAYXBwVmlldyA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IEBzaXplXG5cdFx0XHRoZWlnaHQ6IEBzaXplICsgQXBwSWNvbi5jb25zdERhdGEuaW5zZXRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRuYW1lOiBAdXJsXG5cdFx0XG5cdFx0YXBwSWNvbiA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAYXBwVmlld1xuXHRcdFx0c2l6ZTogQHNpemVcblx0XHRcdGJvcmRlclJhZGl1czogMTZcblx0XHRcdG5hbWU6IFwic2hhcGVcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcdFxuXHRcdEBhcHBWaWV3Lm9uIEV2ZW50cy5UYXAsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHR0cnlcblx0XHRcdFx0d2luZG93LndlYmtpdC5tZXNzYWdlSGFuZGxlcnMub3Blbi5wb3N0TWVzc2FnZShcImh0dHBzOi8vXCIgKyBsYXllci5uYW1lKTtcblx0XHRcblx0XHRhcHBBc3NldCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBhcHBJY29uXG5cdFx0XHRzaXplOiAzNlxuXHRcdFx0eDogKEBzaXplIC0gMzYpIC8gMlxuXHRcdFx0eTogKEBzaXplIC0gMzYpIC8gMlxuXHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL2FwcHMvXCIgKyBAaWNvblxuXHRcdFxuXHRcdGlmIEBuYW1lID09IFwi0K/QvdC00LXQutGBXCIgfHwgQG5hbWUgPT0gXCJWS1wiIHx8IEBuYW1lID09IFwiT0tcIiB8fCBAbmFtZSA9PSBcIllvdXR1YmVcIlxuXHRcdFx0YXBwQXNzZXQud2lkdGggPSBAc2l6ZVxuXHRcdFx0YXBwQXNzZXQuaGVpZ2h0ID0gQHNpemVcblx0XHRcdGFwcEFzc2V0LnggPSAwXG5cdFx0XHRhcHBBc3NldC55ID0gMFxuXHRcdFx0YXBwQXNzZXQuYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0XG5cdFx0IyBmb3IgYW5pbWF0aW9uXG5cdFx0YXBwVGl0bGVWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBhcHBWaWV3XG5cdFx0XHR3aWR0aDogQHNpemUgKyAoQGdhcCAtIDQpXG5cdFx0XHRoZWlnaHQ6IEFwcEljb24uY29uc3REYXRhLmluc2V0XG5cdFx0XHR4OiAtIChAZ2FwKSAvIDJcblx0XHRcdHk6IEBzaXplXG5cdFx0XHRuYW1lOiBcInRpdGxlVmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuXHRcdFxuXHRcdGFwcFRpdGxlVmlldy5zdGF0ZXMgPVxuXHRcdFx0XCJzaG93blwiOiB7IG9wYWNpdHk6IDAuOSB9XG5cdFx0XHRcImhpZGRlblwiOiB7IG9wYWNpdHk6IDAgfVxuXHRcdFxuIyBcdFx0aWYgQGlzVGl0bGVkXG4jIFx0XHRcdGFwcFRpdGxlLnN0YXRlU3dpdGNoKFwic2hvd25cIilcbiMgXHRcdFx0YXBwVGl0bGUuY29sb3IgPSBcInJnYmEoMCwwLDAsIDAuOClcIlxuIyBcdFx0ZWxzZSBhcHBUaXRsZS5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXHRcdFxuXHRcdCMgZm9yIHN0eWxpbmdcblx0XHRhcHBUaXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYXBwVGl0bGVWaWV3XG5cdFx0XHR3aWR0aDogYXBwVGl0bGVWaWV3LndpZHRoXG5cdFx0XHRmb250U2l6ZTogMTJcblx0XHRcdGxpbmVIZWlnaHQ6IDEuMlxuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRmb250V2VpZ2h0OiBcIjUwMFwiXG5cdFx0XHR0ZXh0OiBAbmFtZVxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiA4XG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRoZWlnaHQ6IEBzaXplIC8gMlxuXHRcdFx0dHJ1bmNhdGU6IHRydWVcblx0XHRcdG5hbWU6IFwidGl0bGVcIlxuXHRcdFxuXHRcdFxuXHRcdGFwcEJhZGdlID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBhcHBWaWV3XG5cdFx0XHRzaXplOiAyNFxuXHRcdFx0eDogNDBcblx0XHRcdHk6IC04XG5cdFx0XHRib3JkZXJSYWRpdXM6IFwiMTAwJVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiI0VCM0EzOFwiXG5cdFx0XHRuYW1lOiBcImJhZGdlXCJcblx0XHRcblx0XHRhcHBCYWRnZS5zdGF0ZXMgPVxuXHRcdFx0XCJzaG93blwiOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFx0XCJoaWRkZW5cIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcblx0XHRpZiBAY291bnRlciAhPSAwIHRoZW4gYXBwQmFkZ2Uuc3RhdGVTd2l0Y2goXCJzaG93blwiKVxuXHRcdGVsc2UgYXBwQmFkZ2Uuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XHRcblx0XHRcblx0XHRcblx0XHRhcHBCYWRnZUNvdW50ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGFwcEJhZGdlXG5cdFx0XHR3aWR0aDogYXBwQmFkZ2Uud2lkdGhcblx0XHRcdGZvbnRTaXplOiAxM1xuXHRcdFx0eTogM1xuXHRcdFx0dGV4dEFsaWduOiBcImNlbnRlclwiXG5cdFx0XHRmb250V2VpZ2h0OiBcImJvbGRcIlxuXHRcdFx0dGV4dDogQGNvdW50ZXJcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGhlaWdodDogMzZcblx0XHRcdHRydW5jYXRlOiB0cnVlXG5cdFx0XHRuYW1lOiBcImNvdW50ZXJcIlxuXG5cbmNsYXNzIEFwcFJvd1xuXHRyb3dWaWV3ID0gbnVsbFxuXHR3aWR0aDogMzYwXG5cdHNpemU6IDU2XG5cdGdhcDogMTJcblx0b2Zmc2V0OiAwXG5cdFxuXHRjb25zdHJ1Y3RvcjogKGFwcEljb25BcnJheSwgQHNpemUgPSBBcHBJY29uLmNvbnN0RGF0YS5zaXplLCBAZ2FwID0gQXBwSWNvbi5jb25zdERhdGEuZ2FwKSAtPlxuXHRcdEBvZmZzZXQgPSAoQHdpZHRoIC0gKChBcHBJY29uLmNvbnN0RGF0YS5pblJvdyAtIDEpICogKEBzaXplICsgQGdhcCkgKyBAc2l6ZSkpIC8gMlxuXHRcdEByb3dWaWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBzaXplICogMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBVdGlscy5yYW5kb21Db2xvcigpXG4jIFx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0bmFtZTogXCJyb3c6IFwiICsgYXBwSWNvbkFycmF5WzBdLm5hbWUgKyBcIiAtPiBcIiArIGFwcEljb25BcnJheVthcHBJY29uQXJyYXkubGVuZ3RoIC0gMV0ubmFtZVxuXHRcdFxuXHRcdGZvciBjdXJyZW50QXBwSWNvbiwgaSBpbiBhcHBJY29uQXJyYXlcblx0XHRcdGN1cnJlbnRJY29uVmlldyA9IGN1cnJlbnRBcHBJY29uLmdldFZpZXcoKVxuXHRcdFx0Y3VycmVudEljb25WaWV3LnBhcmVudCA9IEByb3dWaWV3XG5cdFx0XHRjdXJyZW50SWNvblZpZXcueCA9IChpICUgQXBwSWNvbi5jb25zdERhdGEuaW5Sb3cpICogKEBzaXplICsgQGdhcCkgKyBAb2Zmc2V0XG5cdFxuXHRwcmludDogKCkgLT5cblx0XHQjIHByaW50KFwib2Zmc2V0OiBcIiArIEBvZmZzZXQpXG5cdFxuXHRnZXRWaWV3OiAoKSAtPlxuXHRcdHJldHVybiBAcm93Vmlld1xuXG5cblxuXG5cbmNsYXNzIEFwcEdyaWRcblx0Z3JpZFZpZXcgPSBudWxsXG5cdGlzSW52ZXJ0ZWQgPSBmYWxzZVxuXHRzaG93VGV4dCA9IHRydWVcblx0cm93cyA9IDBcblx0XG5cdGNvbnN0cnVjdG9yOiAoaWNvbkFycmF5LCBAaXNJbnZlcnRlZCA9IGZhbHNlLCBAc2hvd1RleHQgPSB0cnVlKSAtPlxuXHRcdEByb3dzID0gKGljb25BcnJheS5sZW5ndGggLSBpY29uQXJyYXkubGVuZ3RoICUgQXBwSWNvbi5jb25zdERhdGEuaW5Sb3cpIC8gQXBwSWNvbi5jb25zdERhdGEuaW5Sb3dcblx0XHRpZiBpY29uQXJyYXkubGVuZ3RoICUgQXBwSWNvbi5jb25zdERhdGEuaW5Sb3cgIT0gMCB0aGVuIEByb3dzKytcblx0XHRcblx0XHRAZ3JpZFZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHR3aWR0aDogMzYwXG5cdFx0XHRoZWlnaHQ6IEByb3dzICogQXBwSWNvbi5jb25zdERhdGEuc2l6ZSAqIDJcblx0XHRcdG5hbWU6IFwiZ3JpZFZpZXdcIlxuXHRcdFxuXHRcdGN1cnJlbnRSb3dBcnJheSA9IFtdXG5cdFx0Y3VycmVudFJvdyA9IC0xXG5cdFx0XG5cdFx0Zm9yIGN1cnJlbnRJY29uLCBpIGluIGljb25BcnJheVxuXHRcdFx0aWYgaSAlIEFwcEljb24uY29uc3REYXRhLmluUm93ID09IDBcblx0XHRcdFx0Y3VycmVudFJvd0FycmF5ID0gW11cblx0XHRcdFx0Y3VycmVudFJvdysrXG5cdFx0XHRcblx0XHRcdGN1cnJlbnRSb3dBcnJheS5wdXNoKGN1cnJlbnRJY29uKVxuXHRcdFx0XG5cdFx0XHRpZiBpICUgQXBwSWNvbi5jb25zdERhdGEuaW5Sb3cgPT0gQXBwSWNvbi5jb25zdERhdGEuaW5Sb3cgLSAxIG9yIGkgPT0gaWNvbkFycmF5Lmxlbmd0aCAtIDFcblx0XHRcdFx0cm93VmlldyA9IG5ldyBBcHBSb3coY3VycmVudFJvd0FycmF5KS5nZXRWaWV3KClcblx0XHRcdFx0cm93Vmlldy5wYXJlbnQgPSBAZ3JpZFZpZXdcblx0XHRcdFx0cm93Vmlldy5zdGF0ZXMgPVxuXHRcdFx0XHRcdFwic2hvd25cIjogeyB5OiAwIH1cblx0XHRcdFx0XHRcImhpZGRlblwiOiB7IHk6IDAgfVxuXHRcdFx0XHRcblx0XHRcdFx0IyBwcmludCBAaXNJbnZlcnRlZFxuXHRcdFx0XHRpZiBAaXNJbnZlcnRlZFxuXHRcdFx0XHRcdHJvd1ZpZXcuc3RhdGVzLnNob3duLnkgPSAoQHJvd3MgLSBjdXJyZW50Um93IC0gMSkgKiBBcHBJY29uLmNvbnN0RGF0YS5zaXplICogMlxuXHRcdFx0XHRcdHJvd1ZpZXcuc3RhdGVzLmhpZGRlbi55ID0gQGdyaWRWaWV3LmhlaWdodCAtIChBcHBJY29uLmNvbnN0RGF0YS5zaXplICogMikgLSAoY3VycmVudFJvdykgKiAoQXBwSWNvbi5jb25zdERhdGEuc2l6ZSArIEFwcEljb24uY29uc3REYXRhLmdhcClcbiMgXHRcdFx0XHRcdHJvd1ZpZXcuc3RhdGVzLmhpZGRlbi55ID0gKEByb3dzIC0gY3VycmVudFJvdyAtIDEpICogKEFwcEljb24uY29uc3REYXRhLnNpemUgKyBBcHBJY29uLmNvbnN0RGF0YS5nYXApXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyb3dWaWV3LnN0YXRlcy5zaG93bi55ID0gY3VycmVudFJvdyAqIEFwcEljb24uY29uc3REYXRhLnNpemUgKiAyXG5cdFx0XHRcdFx0cm93Vmlldy5zdGF0ZXMuaGlkZGVuLnkgPSBjdXJyZW50Um93ICogKEFwcEljb24uY29uc3REYXRhLnNpemUgKyBBcHBJY29uLmNvbnN0RGF0YS5nYXApXG5cdFx0XHRcdFxuIyBcdFx0XHRcdHByaW50IHJvd1ZpZXcuc3RhdGVzLnNob3duLnkgKyBcIiBcIiArIHJvd1ZpZXcuc3RhdGVzLmhpZGRlbi55XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiBAc2hvd1RleHQgdGhlbiByb3dWaWV3LnN0YXRlU3dpdGNoKFwic2hvd25cIikgZWxzZSByb3dWaWV3LnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cdFxuXHRnZXRWaWV3OiAoKSAtPlxuXHRcdHJldHVybiBAZ3JpZFZpZXdcblxuXG5cblxuXG5jbGFzcyBBcHBWaWV3XG5cdHZpZXcgPSBudWxsXG5cdGRhdGEgPSBudWxsXG5cdGljb25zID0gbnVsbFxuXHRcblx0aXNTaG93biA9IHRydWVcblx0aXNJbnZlcnRlZCA9IGZhbHNlXG5cdGlzV2hpdGUgPSBmYWxzZVxuXHRcblx0Z2V0VmlldzogKCkgLT5cblx0XHRyZXR1cm4gQHZpZXdcblx0XG5cdGNvbnN0cnVjdG9yOiAoQGRhdGEsIEBpc1Nob3duID0gdHJ1ZSwgQGlzSW52ZXJ0ZWQgPSBmYWxzZSwgQGlzV2hpdGUgPSBmYWxzZSkgLT5cblx0XHRAaWNvbnMgPSBbXVxuXHRcdFxuXHRcdGZvciBjdXJyZW50QXBwRGF0YSwgaSBpbiBAZGF0YVxuXHRcdFx0QGljb25zLnB1c2gobmV3IEFwcEljb24oY3VycmVudEFwcERhdGEubmFtZSwgY3VycmVudEFwcERhdGEudXJsLCBjdXJyZW50QXBwRGF0YS5pY29uKSlcblx0XHRcblx0XHRmb3IgaWNvbiBpbiBAaWNvbnNcblx0XHRcdGlmIEBpc1doaXRlIHRoZW4gaWNvbi5zZXRXaGl0ZVRpdGxlKClcblx0XHRcdGVsc2UgaWNvbi5zZXREYXJrVGl0bGUoKVxuXHRcdFxuXHRcdEB2aWV3ID0gKG5ldyBBcHBHcmlkKEBpY29ucywgQGlzSW52ZXJ0ZWQsIEBpc1Nob3duKSkuZ2V0VmlldygpXG5cdFx0XG5cdFx0aWYgIUBpc1Nob3duXG5cdFx0XHRmb3Igcm93IGluIEB2aWV3LmNoaWxkcmVuXG5cdFx0XHRcdHJvdy5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXHRcdFx0XHRcblx0XHRcdFx0Zm9yIGljb24gaW4gcm93LmNoaWxkcmVuXG5cdFx0XHRcdFx0aWNvbi5jaGlsZHJlblsxXS5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXHRcdFxuXHRcdGZvciBpdGVtIGluIEB2aWV3LmNoaWxkcmVuXG5cdFx0XHRpdGVtLm5hbWUgPSBcIi5cIlxuXHRcdFx0aXRlbS5zZW5kVG9CYWNrKClcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4jIGNvbnN0cnVjdG9yOiAoQGRhdGEsIEBpc1Nob3duID0gdHJ1ZSwgQGlzSW52ZXJ0ZWQgPSBmYWxzZSwgQGlzV2hpdGUgPSBmYWxzZSkgLT5cblxuZXhwb3J0cy5nZXRBbGxBcHBWaWV3ID0gKCkgLT5cblx0cmV0dXJuIChuZXcgQXBwVmlldyhncm91cHMuZ2V0KFwi0JLRgdC1INC/0YDQuNC70L7QttC10L3QuNGPXCIpLCB0aXRsZVNob3duID0gdHJ1ZSwgaW52ZXJ0ZWRPcmRlciA9IGZhbHNlLCB3aGl0ZVRleHQgPSBmYWxzZSkpLmdldFZpZXcoKVxuXG5leHBvcnRzLmdldEJlc3RBcHBWaWV3ID0gKCkgLT5cblx0cmV0dXJuIChuZXcgQXBwVmlldyhncm91cHMuZ2V0KFwi0KLQsNCx0LvQvlwiKSwgdGl0bGVTaG93biA9IGZhbHNlLCBpbnZlcnRlZE9yZGVyID0gdHJ1ZSwgd2hpdGVUZXh0ID0gdHJ1ZSkpLmdldFZpZXcoKVxuXG5leHBvcnRzLmdldFByb21vQXBwcyA9ICgpIC0+XG5cdGxvY2FsSWNvblZpZXdzID0gW11cblx0XG5cdGZvciBjdXJyZW50QXBwRGF0YSwgYiBpbiBncm91cHMuZ2V0KFwi0KTQuNGH0LXRgNGLXCIpXG5cdFx0aWNvbiA9IG5ldyBBcHBJY29uKGN1cnJlbnRBcHBEYXRhLm5hbWUsIGN1cnJlbnRBcHBEYXRhLnVybCwgY3VycmVudEFwcERhdGEuaWNvbiwgQXBwSWNvbi5jb25zdERhdGEuc2l6ZSwgQXBwSWNvbi5jb25zdERhdGEuZ2FwLCBmYWxzZSlcblx0XHRpY29uLnNldERhcmtUaXRsZSgpXG5cblx0XHRpY29uLmdldFZpZXcoKS53aWR0aCA9IDEwOFxuXHRcdGljb24uZ2V0VmlldygpLmhlaWdodCA9IDE5MlxuXG5cdFx0Zm9yIGNoaWxkLCBjIGluIGljb24uZ2V0VmlldygpLmNoaWxkcmVuXG5cdFx0XHRpZiBjID09IDBcblx0XHRcdFx0Y2hpbGQueCArPSAyNlxuXHRcdFx0XHRjaGlsZC55ICs9IDk0XG5cdFx0XHRcdGNoaWxkLm9yaWdpblkgPSAxLjVcblx0XHRcdFx0Y2hpbGQuc2NhbGUgPSAwLjU3XG5cdFx0XHRcdGNoaWxkLnNoYWRvd1kgPSAxXG5cdFx0XHRcdGNoaWxkLnNoYWRvd0JsdXIgPSA0XG5cdFx0XHRcdGNoaWxkLnNoYWRvd0NvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMjUpXCJcblx0XHRcdGVsc2UgaWYgYyA9PSAxXG5cdFx0XHRcdGNoaWxkLnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdFx0XHRjaGlsZC55ICs9IDk0ICsgMTJcblx0XHRcdGVsc2Vcblx0XHRcdFx0Y2hpbGQub3BhY2l0eSA9IDBcblx0XHRcblx0XHRwcmV2aWV3ID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogOTZcblx0XHRcdGhlaWdodDogMTQ0XG5cdFx0XHR4OiA2XG5cdFx0XHR5OiA4XG5cdFx0XHRpbWFnZTogXCJpbWFnZXMvYmVzdC9cIiArIGIgKyBcIi5wbmdcIlxuXHRcdFx0cGFyZW50OiBpY29uLmdldFZpZXcoKVxuXHRcdFxuXHRcdHByZXZpZXcuc2VuZFRvQmFjaygpXG5cblx0XHRsb2NhbEljb25WaWV3cy5wdXNoKGljb24uZ2V0VmlldygpKVxuXG5cblx0Zm9yIHByb21vSWNvblZpZXcgaW4gbG9jYWxJY29uVmlld3Ncblx0XHRmb3IgaXRlbSBpbiBwcm9tb0ljb25WaWV3LmNoaWxkcmVuXG5cdFx0XHRpdGVtLm5hbWUgPSBcIi5cIlxuXG5cdHJldHVybiBsb2NhbEljb25WaWV3c1xuXG5cbmV4cG9ydHMuZ2V0VVJMID0gKGxvY2FsQXBwTmFtZSkgLT5cblx0Zm9yIGN1cnJlbnRBcHAgaW4gYXBwRGF0YVxuXHRcdGlmIGN1cnJlbnRBcHAubmFtZSA9PSBsb2NhbEFwcE5hbWUgdGhlbiByZXR1cm4gY3VycmVudEFwcC51cmxcblxuIyBnZXRCZXN0QXBwcygpXG5cbm1vZHVsZS5leHBvcnRzID1cbiAgQXBwSWNvbjogQXBwSWNvbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBWUFBO0FER0EsSUFBQTs7QUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLEtBQUwsQ0FBVyxLQUFLLENBQUMsZUFBTixDQUFzQixjQUF0QixDQUFYOztBQUNWLFNBQUEsR0FBWSxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxlQUFOLENBQXNCLGFBQXRCLENB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
