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


chat = new Layer
	name: "chat"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	backgroundColor: "transparent"


feedTop = new Layer
	name: "feedTop"
	parent: chat
	y: 0
	width: 360
	height: 720
	opacity: 1
	image: "images/figma/feedTop.png"

feedTop.states =
	"start":
		x: 0
	"list":
		x: -360
	"business":
		x: -360
	"cart":
		x: -360
	"chooseCard":
		x: -360
	"paymentDone":
		x: -360
	"done":
		x: -360
	"close":
		x: -360
	"finish":
		x: -360


chatListView = new Layer
	name: "chatListView"
	parent: chat
	y: 0
	width: 360
	height: 720
	image: "images/figma/chatListView.png"

chatListView.states =
	"start":
		x: 360
		opacity: 1
	"list":
		x: 0
		opacity: 1
	"business":
		x: -120
		opacity: 0
	"cart":
		x: -120
		opacity: 0
	"chooseCard":
		x: -120
		opacity: 0
	"paymentDone":
		x: -120
		opacity: 0
	"done":
		x: -120
		opacity: 0
	"close":
		x: -120
		opacity: 0
	"finish":
		x: -120
		opacity: 0


businessListView = new Layer
	name: "businessListView"
	parent: chat
	y: 0
	width: 360
	height: 720
	opacity: 1
	image: "images/figma/businessListView.png"

businessListView.states =
	"start":
		x: 720
	"list":
		x: 360
	"business":
		x: 0
	"cart":
		x: 0
	"chooseCard":
		x: 0
	"paymentDone":
		x: 0
	"done":
		x: 0
	"close":
		x: 0
	"finish":
		x: 0


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
	"list":
		opacity: 0
	"business":
		opacity: 0
	"cart":
		opacity: 1
	"chooseCard":
		opacity: 1
	"paymentDone":
		opacity: 1
	"done":
		opacity: 1
	"close":
		opacity: 1
	"finish":
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
	"list":
		y: 784
	"business":
		y: 784
	"cart":
		y: 44
	"chooseCard":
		y: 44
	"paymentDone":
		y: 44
	"done":
		y: 44
	"close":
		y: 64
	"finish":
		y: 784


beruHeader = new Layer
	name: "beruHeader"
	parent: beruView
	x: 0
	y: 0
	width: 360
	height: 113
	opacity: 1
	image: "images/figma/beruHeader.png"


beruStationContent = new Layer
	name: "beruStationContent"
	parent: beruView
	y: 113
	width: 360
	height: 563
	opacity: 1
	image: "images/figma/beruStationContent.png"

beruStationContent.states =
	"start":
		x: -360
	"list":
		x: -360
	"business":
		x: -360
	"cart":
		x: -360
	"chooseCard":
		x: -360
	"paymentDone":
		x: -360
	"done":
		x: -360
	"close":
		x: -360
	"finish":
		x: 0


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
		x: 0
	"list":
		x: 0
	"business":
		x: 0
	"cart":
		x: 0
	"chooseCard":
		x: 0
	"paymentDone":
		x: 0
	"done":
		x: 0
	"close":
		x: 0
	"finish":
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
	"list":
		y: 720
	"business":
		y: 720
	"cart":
		y: -20
	"chooseCard":
		y: -20
	"paymentDone":
		y: -20
	"done":
		y: -20
	"close":
		y: 0
	"finish":
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
	"list":
		opacity: 1
	"business":
		opacity: 1
	"cart":
		opacity: 1
	"chooseCard":
		opacity: 1
	"paymentDone":
		opacity: 1
	"done":
		opacity: 1
	"close":
		opacity: 0
	"finish":
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
	"list":
		opacity: 0
	"business":
		opacity: 0
	"cart":
		opacity: 0
	"chooseCard":
		opacity: 0
	"paymentDone":
		opacity: 0
	"done":
		opacity: 0
	"close":
		opacity: 1
	"finish":
		opacity: 1


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
	"list":
		opacity: 1
	"business":
		opacity: 1
	"cart":
		opacity: 0
	"chooseCard":
		opacity: 0
	"paymentDone":
		opacity: 0
	"done":
		opacity: 0
	"close":
		opacity: 0
	"finish":
		opacity: 0


statusBarNull = new Layer
	name: "statusBarNull"
	parent: statusBar
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	image: "images/figma/statusBarNull.png"


payment = new Layer
	name: "payment"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	backgroundColor: "transparent"


darker = new Layer
	name: "darker"
	parent: payment
	x: 0
	y: 0
	width: 360
	height: 718
	image: "images/figma/darker.png"

darker.states =
	"start":
		opacity: 0
	"chooseCard":
		opacity: 1
	"paymentDone":
		opacity: 1
	"done":
		opacity: 0


paymentSheet = new Layer
	name: "paymentSheet"
	parent: payment
	x: 0
	width: 360
	height: 288
	opacity: 1
	image: "images/figma/paymentSheet.png"

paymentSheet.states =
	"start":
		y: 720
	"chooseCard":
		y: 432
	"paymentDone":
		y: 432
	"done":
		y: 720


bottomSheetSmall = new Layer
	name: "bottomSheetSmall"
	parent: paymentSheet
	x: 0
	y: 0
	width: 360
	height: 288
	opacity: 1
	image: "images/figma/bottomSheetSmall.png"


paymentChooseCard = new Layer
	name: "paymentChooseCard"
	parent: paymentSheet
	x: 0
	y: 24
	width: 360
	height: 264
	opacity: 1
	image: "images/figma/paymentChooseCard.png"


paymentDone = new Layer
	name: "paymentDone"
	parent: paymentSheet
	x: 0
	y: 24
	width: 360
	height: 264
	image: "images/figma/paymentDone.png"

paymentDone.states =
	"start":
		opacity: 0
	"chooseCard":
		opacity: 0
	"paymentDone":
		opacity: 1
	"done":
		opacity: 0


sceneStates = ["start", "list", "business", "cart", "chooseCard", "paymentDone", "done", "close", "finish"]
sceneLayers = [figmaView, background, chat, feedTop, chatListView, businessListView, appBeru, backgroundApp, beruView, beruHeader, beruStationContent, beruCartContent, beruCartView, appHeader, grab, titleBeru, statusBar, statusBarColor, statusBarNull, payment, darker, paymentSheet, bottomSheetSmall, paymentChooseCard, paymentDone]

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


beruScroll = new ScrollComponent
	parent: beruCartContent
	width: 360
	height: beruCartContent.height
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

beruCartView.parent = beruScroll.content


# Extentions

newFavCounter = new Layer
	width: 20
	height: 20
	image: "images/new%20fav%20counter.png"

newFavCounter.parent = feedTop
newFavCounter.x = 328
newFavCounter.y = 4 + 24

newFavCounter.states = 
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
newFavCounter.stateSwitch("shown")




cartPromoPrice = new Layer
	width: 360
	height: 214
	image: "images/cart%20promo%20price.png"

cartPromoPrice.parent = beruCartView
cartPromoPrice.y = 704



statusBar = new Layer
	parent: figmaView, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8 }
