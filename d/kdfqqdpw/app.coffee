# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	backgroundColor: "transparent"


background = new Layer
	name: "background"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	image: "images/figma/background.png"


feedBeru = new Layer
	name: "feedBeru"
	parent: figmaView
	x: 0
	width: 360
	opacity: 1
	backgroundColor: "transparent"

feedBeru.states =
	"start":
		y: 24
		height: 2537
	"scrolled":
		y: -1010
		height: 2537
	"promoted":
		y: -1010
		height: 2000
	"station":
		y: -1010
		height: 2000
	"cart":
		y: -1010
		height: 2000
	"prepare":
		y: -1010
		height: 2000
	"skipped":
		y: -1010
		height: 2000


header = new Layer
	name: "header"
	parent: feedBeru
	x: 0
	y: 0
	width: 360
	height: 212
	opacity: 1
	image: "images/figma/header.png"


cardBook = new Layer
	name: "cardBook"
	parent: feedBeru
	x: 0
	y: 220
	width: 360
	height: 532
	opacity: 1
	image: "images/figma/cardBook.png"


cardRt = new Layer
	name: "cardRt"
	parent: feedBeru
	x: 0
	y: 760
	width: 360
	height: 334
	opacity: 1
	image: "images/figma/cardRt.png"


beruCard = new Layer
	name: "beruCard"
	parent: feedBeru
	x: 0
	y: 1102
	width: 360
	opacity: 1
	backgroundColor: "transparent"

beruCard.states =
	"start":
		height: 402
	"scrolled":
		height: 402
	"promoted":
		height: 526
	"station":
		height: 526
	"cart":
		height: 526
	"prepare":
		height: 526
	"skipped":
		height: 526


beruCardBottom = new Layer
	name: "beruCardBottom"
	parent: beruCard
	x: 0
	width: 360
	height: 68
	opacity: 1
	image: "images/figma/beruCardBottom.png"

beruCardBottom.states =
	"start":
		y: 334
	"scrolled":
		y: 334
	"promoted":
		y: 458
	"station":
		y: 458
	"cart":
		y: 458
	"prepare":
		y: 458
	"skipped":
		y: 458


beruCardOfferBackground = new Layer
	name: "beruCardOfferBackground"
	parent: beruCard
	x: 0
	width: 360
	height: 124
	opacity: 1
	image: "images/figma/beruCardOfferBackground.png"

beruCardOfferBackground.states =
	"start":
		y: 210
	"scrolled":
		y: 210
	"promoted":
		y: 334
	"station":
		y: 334
	"cart":
		y: 334
	"prepare":
		y: 334
	"skipped":
		y: 334


beruCardOffer = new Layer
	name: "beruCardOffer"
	parent: beruCard
	x: 0
	width: 360
	height: 124
	opacity: 1
	image: "images/figma/beruCardOffer.png"

beruCardOffer.states =
	"start":
		y: 210
	"scrolled":
		y: 210
	"promoted":
		y: 334
	"station":
		y: 334
	"cart":
		y: 334
	"prepare":
		y: 334
	"skipped":
		y: 334


beruCardTop = new Layer
	name: "beruCardTop"
	parent: beruCard
	x: 0
	y: 0
	width: 360
	height: 334
	opacity: 1
	image: "images/figma/beruCardTop.png"


cardAli = new Layer
	name: "cardAli"
	parent: feedBeru
	x: 0
	width: 360
	height: 542
	opacity: 1
	image: "images/figma/cardAli.png"

cardAli.states =
	"start":
		y: 1512
	"scrolled":
		y: 1512
	"promoted":
		y: 1636
	"station":
		y: 1636
	"cart":
		y: 1636
	"prepare":
		y: 1636
	"skipped":
		y: 1636


appBeru = new Layer
	name: "appBeru"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	backgroundColor: "transparent"


backgroundApp = new Layer
	name: "backgroundApp"
	parent: appBeru
	x: 0
	y: 0
	width: 360
	height: 720
	image: "images/figma/backgroundApp.png"

backgroundApp.states =
	"start":
		opacity: 0
	"scrolled":
		opacity: 0
	"promoted":
		opacity: 0
	"station":
		opacity: 1
	"cart":
		opacity: 1
	"prepare":
		opacity: 1
	"skipped":
		opacity: 0


beruView = new Layer
	name: "beruView"
	parent: appBeru
	x: 0
	width: 360
	height: 676
	opacity: 1
	backgroundColor: "transparent"

beruView.states =
	"start":
		y: 784
	"scrolled":
		y: 784
	"promoted":
		y: 784
	"station":
		y: 44
	"cart":
		y: 44
	"prepare":
		y: 64
	"skipped":
		y: 784


beruStationContent = new Layer
	name: "beruStationContent"
	parent: beruView
	y: 113
	width: 360
	height: 563
	opacity: 1
	backgroundColor: "transparent"

beruStationContent.states =
	"start":
		x: 0
	"scrolled":
		x: 0
	"promoted":
		x: 0
	"station":
		x: 0
	"cart":
		x: -360
	"prepare":
		x: -360
	"skipped":
		x: 0


beruStationView = new Layer
	name: "beruStationView"
	parent: beruStationContent
	x: 0
	y: 0
	width: 360
	height: 1752
	opacity: 1
	image: "images/figma/beruStationView.png"


beruHeader = new Layer
	name: "beruHeader"
	parent: beruView
	x: 0
	y: 0
	width: 360
	height: 113
	opacity: 1
	image: "images/figma/beruHeader.png"


beruCartContent = new Layer
	name: "beruCartContent"
	parent: beruView
	y: 113
	width: 360
	height: 563
	opacity: 1
	backgroundColor: "transparent"

beruCartContent.states =
	"start":
		x: 360
	"scrolled":
		x: 360
	"promoted":
		x: 360
	"station":
		x: 360
	"cart":
		x: 0
	"prepare":
		x: 0
	"skipped":
		x: 360


beruCartView = new Layer
	name: "beruCartView"
	parent: beruCartContent
	x: 0
	y: 0
	width: 360
	height: 1075
	opacity: 1
	image: "images/figma/beruCartView.png"


appHeader = new Layer
	name: "appHeader"
	parent: appBeru
	x: 0
	width: 360
	height: 64
	opacity: 1
	backgroundColor: "transparent"

appHeader.states =
	"start":
		y: 720
	"scrolled":
		y: 720
	"promoted":
		y: 720
	"station":
		y: -20
	"cart":
		y: -20
	"prepare":
		y: 0
	"skipped":
		y: 720


grab = new Layer
	name: "grab"
	parent: appHeader
	x: 0
	y: 0
	width: 360
	height: 64
	image: "images/figma/grab.png"

grab.states =
	"start":
		opacity: 1
	"scrolled":
		opacity: 1
	"promoted":
		opacity: 1
	"station":
		opacity: 1
	"cart":
		opacity: 1
	"prepare":
		opacity: 0
	"skipped":
		opacity: 0


titleBeru = new Layer
	name: "titleBeru"
	parent: appHeader
	x: 0
	y: 0
	width: 360
	height: 64
	image: "images/figma/titleBeru.png"

titleBeru.states =
	"start":
		opacity: 0
	"scrolled":
		opacity: 0
	"promoted":
		opacity: 0
	"station":
		opacity: 0
	"cart":
		opacity: 0
	"prepare":
		opacity: 1
	"skipped":
		opacity: 1


chat = new Layer
	name: "chat"
	parent: figmaView
	x: 360
	y: 0
	width: 360
	height: 720
	opacity: 1
	backgroundColor: "transparent"


chatListView = new Layer
	name: "chatListView"
	parent: chat
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	image: "images/figma/chatListView.png"


businessListView = new Layer
	name: "businessListView"
	parent: chat
	x: 360
	y: 0
	width: 360
	height: 720
	opacity: 1
	image: "images/figma/businessListView.png"


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBar.png"


statusBarColor = new Layer
	name: "statusBarColor"
	parent: statusBar
	x: 0
	y: 0
	width: 360
	height: 24
	image: "images/figma/statusBarColor.png"

statusBarColor.states =
	"start":
		opacity: 1
	"scrolled":
		opacity: 1
	"promoted":
		opacity: 1
	"station":
		opacity: 0
	"cart":
		opacity: 0
	"prepare":
		opacity: 0
	"skipped":
		opacity: 1


statusBarNull = new Layer
	name: "statusBarNull"
	parent: statusBar
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBarNull.png"


sceneStates = ["start", "scrolled", "promoted", "station", "cart", "prepare", "skipped"]
sceneLayers = [figmaView, background, feedBeru, header, cardBook, cardRt, beruCard, beruCardBottom, beruCardOfferBackground, beruCardOffer, beruCardTop, cardAli, appBeru, backgroundApp, beruView, beruStationContent, beruStationView, beruHeader, beruCartContent, beruCartView, appHeader, grab, titleBeru, chat, chatListView, businessListView, statusBar, statusBarColor, statusBarNull]

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


Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 38 or event.keyCode is 39 or event.keyCode is 87
		nextStateHandler()

beruView.clip = true
beruView.borderRadius = 24
chat.backgroundColor = "white"

statusBar.image = "null"

feedScroll = new ScrollComponent
	parent: figmaView
	width: 360
	height: 720 - 24
	scrollVertical: true
	scrollHorizontal: false

feedBeru.parent = feedScroll.content
feedScroll.placeBefore(background)




beruScrollLeft = new ScrollComponent
	parent: beruStationContent
	width: 360
	height: beruStationContent.height
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

beruStationView.parent = beruScrollLeft.content

beruScrollRight = new ScrollComponent
	parent: beruCartContent
	width: 360
	height: beruCartContent.height
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

beruCartView.parent = beruScrollRight.content



sceneLayers = sceneLayers.filter (x) -> x != feedBeru
# sceneLayers = sceneLayers.filter (x) -> x != Content

sceneStates = sceneStates.filter (x) -> x != "scrolled"
# sceneStates = sceneStates.filter (x) -> x != "scrollTwo"
# sceneStates = sceneStates.filter (x) -> x != "appScrolled"

cycler = Utils.cycle(sceneStates)
nextState = cycler()


# Extentions

newFavCounter = new Layer
	width: 20
	height: 20
	image: "images/new%20fav%20counter.png"

newFavCounter.parent = feedBeru
newFavCounter.x = 328
newFavCounter.y = 4

newFavCounter.states = 
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
newFavCounter.stateSwitch("hidden")



beruHeaderCartAdded = new Layer
	width: 58
	height: 58
	image: "images/beru%20header%20cart%20added.png"

beruHeaderCartAdded.parent = beruHeader
beruHeaderCartAdded.x = 360 - beruHeaderCartAdded.width

beruHeaderCartAdded.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
beruHeaderCartAdded.stateSwitch("hidden")



cartButton = new Layer
	width: 132
	height: 53
	image: "images/cart%20button.png"

cartButton.x = 360 - cartButton.width - 24
cartButton.y = 624
cartButton.parent = beruStationView

cartButton.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
cartButton.stateSwitch("hidden")

cartButton.on Events.Click, (event, layer) ->
	event.stopPropagation()
	if @states.current.name == "hidden"
		cartButton.stateSwitch("shown")
		beruHeaderCartAdded.stateSwitch("shown")
		newFavCounter.stateSwitch("shown")
	else
		cartButton.stateSwitch("hidden")
		beruHeaderCartAdded.stateSwitch("hidden")
		newFavCounter.stateSwitch("hidden")



# Video

wylsaCrop = new Layer
	parent: feedBeru
	width: 352
	height: 198 + 40
	y: beruCard.y + 58
	x: 4
	borderRadius: 20
	backgroundColor: "null"
	clip: true

wylsacom = new VideoLayer
	parent: wylsaCrop
	width: 352
	height: 198
	scale: 1
	video: "images/wylsacom.mp4"

wylsacom.player.autoplay = false
wylsacom.player.loop = true
wylsacom.player.volume = 0

wylsacom.player.play()


statusBar = new Layer
	parent: figmaView, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8 }