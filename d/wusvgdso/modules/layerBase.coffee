# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(242.24999696016312, 242.24999696016312, 242.24999696016312, 1)"


header = new Layer
	name: "header"
	parent: figmaView
	x: 0
	y: 24
	width: 360
	opacity: 1
	image: "images/figma/header.png"

header.states =
	"base":
		height: 270
	"overLayer":
		height: 270
	"scrolled":
		height: 274


bg = new Layer
	name: "bg"
	parent: header
	x: 0
	y: 0
	width: 360
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"

bg.states =
	"base":
		height: 268
	"overLayer":
		height: 268
	"scrolled":
		height: 92


colored = new Layer
	name: "colored"
	parent: header
	x: 0
	width: 360
	height: 72
	opacity: 1
	image: "images/figma/colored.png"

colored.states =
	"base":
		y: 196
	"overLayer":
		y: 196
	"scrolled":
		y: 22


verticals = new Layer
	name: "verticals"
	parent: header
	x: 0
	width: 360
	height: 72
	opacity: 1
	image: "images/figma/verticals.png"

verticals.states =
	"base":
		y: 196
	"overLayer":
		y: 196
	"scrolled":
		y: 43


texts = new Layer
	name: "texts"
	parent: header
	x: 0
	width: 360
	height: 14
	image: "images/figma/texts.png"

texts.states =
	"base":
		y: 241
		opacity: 1
	"overLayer":
		y: 241
		opacity: 1
	"scrolled":
		y: 88
		opacity: 0


panel = new Layer
	name: "panel"
	parent: header
	x: 0
	width: 360
	height: 40
	image: "images/figma/panel.png"

panel.states =
	"base":
		y: 156
		opacity: 1
	"overLayer":
		y: 156
		opacity: 1
	"scrolled":
		y: 3
		opacity: 0


arrow = new Layer
	name: "arrow"
	parent: header
	x: 0
	width: 360
	height: 56
	opacity: 1
	image: "images/figma/arrow.png"

arrow.states =
	"base":
		y: 100
	"overLayer":
		y: 100
	"scrolled":
		y: 0


logo = new Layer
	name: "logo"
	parent: header
	x: 0
	width: 360
	height: 100
	image: "images/figma/logo.png"

logo.states =
	"base":
		y: 0
		opacity: 1
	"overLayer":
		y: 0
		opacity: 1
	"scrolled":
		y: -100
		opacity: 0


banner = new Layer
	name: "banner"
	parent: figmaView
	x: 0
	width: 360
	height: 76
	opacity: 1
	image: "images/figma/banner.png"

banner.states =
	"base":
		y: 294
	"overLayer":
		y: 294
	"scrolled":
		y: 120


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBar.png"


zenCard = new Layer
	name: "zenCard"
	parent: figmaView
	x: 0
	width: 360
	height: 430
	opacity: 1
	image: "images/figma/zenCard.png"

zenCard.states =
	"base":
		y: 378
	"overLayer":
		y: 378
	"scrolled":
		y: 204


zenImage = new Layer
	name: "zenImage"
	parent: zenCard
	x: 0
	y: 0
	width: 360
	height: 430
	opacity: 1
	image: "images/figma/zenImage.png"


zenFade = new Layer
	name: "zenFade"
	parent: zenCard
	x: 0
	y: 0
	width: 360
	height: 430
	backgroundColor: "rgba(9.000000413507223, 9.000000413507223, 9.000000413507223, 1)"

zenFade.states =
	"base":
		opacity: 1
	"overLayer":
		opacity: 1
	"scrolled":
		opacity: 0


zenMenu = new Layer
	name: "zenMenu"
	parent: zenCard
	x: 316
	y: 8
	width: 28
	height: 28
	image: "images/figma/zenMenu.png"

zenMenu.states =
	"base":
		opacity: 0
	"overLayer":
		opacity: 0
	"scrolled":
		opacity: 1


zenTitle = new Layer
	name: "zenTitle"
	parent: zenCard
	x: 16
	width: 312
	height: 48
	opacity: 1
	image: "images/figma/zenTitle.png"

zenTitle.states =
	"base":
		y: 38
	"overLayer":
		y: 38
	"scrolled":
		y: 243


zenText = new Layer
	name: "zenText"
	parent: zenCard
	x: 16
	width: 312
	height: 60
	image: "images/figma/zenText.png"

zenText.states =
	"base":
		y: 94
		opacity: 0.7
	"overLayer":
		y: 94
		opacity: 0.7
	"scrolled":
		y: 299
		opacity: 1


zenBottom = new Layer
	name: "zenBottom"
	parent: zenCard
	x: 0
	y: 366
	width: 344
	height: 64
	opacity: 1
	image: "images/figma/zenBottom.png"


zenFakeSource = new Layer
	name: "zenFakeSource"
	parent: zenCard
	x: 16
	y: 16
	width: 228
	height: 14
	image: "images/figma/zenFakeSource.png"

zenFakeSource.states =
	"base":
		opacity: 1
	"overLayer":
		opacity: 1
	"scrolled":
		opacity: 0


layer = new Layer
	name: "layer"
	parent: figmaView
	x: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "transparent"

layer.states =
	"base":
		y: 0
	"overLayer":
		y: 0
	"scrolled":
		y: 400


layerShadow = new Layer
	name: "layerShadow"
	parent: layer
	x: 0
	y: 424
	width: 360
	height: 164
	opacity: 1
	image: "images/figma/layerShadow.png"


newsBg = new Layer
	name: "newsBg"
	parent: layer
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"

newsBg.states =
	"base":
		x: 6
		y: 475
		width: 348
		height: 418
	"overLayer":
		x: 0
		y: 24
		width: 360
		height: 570
	"scrolled":
		x: 6
		y: 475
		width: 348
		height: 418


newsFakeTitle = new Layer
	name: "newsFakeTitle"
	parent: layer
	x: 0
	width: 360
	height: 16
	image: "images/figma/newsFakeTitle.png"

newsFakeTitle.states =
	"base":
		y: 487
		opacity: 1
	"overLayer":
		y: 188
		opacity: 0
	"scrolled":
		y: 487
		opacity: 1


newsFooter = new Layer
	name: "newsFooter"
	parent: layer
	opacity: 1
	image: "images/figma/newsFooter.png"

newsFooter.states =
	"base":
		x: 6
		y: 850.3
		width: 348
		height: 42.5
	"overLayer":
		x: 0
		y: 554
		width: 360
		height: 44
	"scrolled":
		x: 6
		y: 850.3
		width: 348
		height: 42.5


newsItems = new Layer
	name: "newsItems"
	parent: layer
	opacity: 1
	image: "images/figma/newsItems.png"

newsItems.states =
	"base":
		x: 6
		y: 502.5
		width: 348.0
		height: 348.0
	"overLayer":
		x: 0
		y: 194
		width: 360.0
		height: 360.0
	"scrolled":
		x: 6
		y: 502.5
		width: 348.0
		height: 348.0


newsHeader = new Layer
	name: "newsHeader"
	parent: layer
	image: "images/figma/newsHeader.png"

newsHeader.states =
	"base":
		x: 6
		y: 432.9
		width: 348
		height: 69.6
		opacity: 0
	"overLayer":
		x: 0
		y: 122
		width: 360
		height: 72
		opacity: 1
	"scrolled":
		x: 6
		y: 432.9
		width: 348
		height: 69.6
		opacity: 0


headerLayer = new Layer
	name: "headerLayer"
	parent: layer
	image: "images/figma/headerLayer.png"

headerLayer.states =
	"base":
		x: 6
		y: 375.6
		width: 348
		height: 92.8
		opacity: 0
	"overLayer":
		x: 0
		y: 24
		width: 360
		height: 96
		opacity: 1
	"scrolled":
		x: 6
		y: 375.6
		width: 348
		height: 92.8
		opacity: 0


bottomBar = new Layer
	name: "bottomBar"
	parent: figmaView
	x: 0
	y: 592
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/bottomBar.png"


sceneStates = ["base", "overLayer", "scrolled"]
sceneLayers = [figmaView, header, bg, colored, verticals, texts, panel, arrow, logo, banner, statusBar, zenCard, zenImage, zenFade, zenMenu, zenTitle, zenText, zenBottom, zenFakeSource, layer, layerShadow, newsBg, newsFakeTitle, newsFooter, newsItems, newsHeader, headerLayer, bottomBar]

for item in sceneLayers
	try item.stateSwitch(sceneStates[0])


cycler = Utils.cycle(sceneStates)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


figmaView.on Events.Click, ->
	nextStateHandler()







# OVERRIDES

sceneStates = ["base", "overLayer"]
cycler = Utils.cycle(sceneStates)
nextState = cycler()




figmaView.clip = true

newsBg.states.base.borderRadius = 8
newsBg.states.overLayer.borderRadius = 0
newsBg.states.scrolled.borderRadius = 8
newsBg.stateSwitch(nextState)







zenCard.title = "zenCard"

exports.layers = {
	"figmaView": figmaView,
	"bottomBar": bottomBar,
	"layer": layer,
	"title": zenTitle,
	"text": zenText,
	"source": zenFakeSource,
}



exports.sceneLayers = () ->
	return sceneLayers

exports.sceneStates = () ->
	return sceneStates


zenFade.opacity = 0.7