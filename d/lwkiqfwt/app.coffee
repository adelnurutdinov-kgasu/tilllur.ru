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


feedGt = new Layer
	name: "feedGt"
	parent: figmaView
	x: 0
	width: 360
	height: 2537
	opacity: 1
	backgroundColor: "transparent"

feedGt.states =
	"start":
		y: 24
	"scroll":
		y: -188
	"scrollTwo":
		y: -1038
	"appOpened":
		y: -1038
	"appScrolled":
		y: -1038
	"appPrepareClose":
		y: -1038
	"appClosed":
		y: -1038


header = new Layer
	name: "header"
	parent: feedGt
	x: 0
	y: 0
	width: 360
	height: 212
	opacity: 1
	image: "images/figma/header.png"


cardRt = new Layer
	name: "cardRt"
	parent: feedGt
	x: 0
	y: 760
	width: 360
	height: 334
	opacity: 1
	image: "images/figma/cardRt.png"


cardGt = new Layer
	name: "cardGt"
	parent: feedGt
	x: 0
	y: 1102
	width: 360
	height: 514
	opacity: 1
	image: "images/figma/cardGt.png"


cardAli = new Layer
	name: "cardAli"
	parent: feedGt
	x: 0
	y: 1624
	width: 360
	height: 542
	opacity: 1
	image: "images/figma/cardAli.png"


cardBook = new Layer
	name: "cardBook"
	parent: feedGt
	x: 0
	y: 220
	width: 360
	height: 532
	opacity: 1
	image: "images/figma/cardBook.png"


gtItemContent = new Layer
	name: "gtItemContent"
	parent: feedGt
	x: 0
	y: 1160
	width: 360
	height: 406
	backgroundColor: "rgba(255, 255, 255, 1)"

gtItemContent.states =
	"start":
		opacity: 0
	"scroll":
		opacity: 0
	"scrollTwo":
		opacity: 0
	"appOpened":
		opacity: 0
	"appScrolled":
		opacity: 0
	"appPrepareClose":
		opacity: 0
	"appClosed":
		opacity: 1


gtItemMid = new Layer
	name: "gtItemMid"
	parent: gtItemContent
	x: 288
	y: 6
	width: 280
	height: 394
	opacity: 1
	image: "images/figma/gtItemMid.png"


gtItemLeft = new Layer
	name: "gtItemLeft"
	parent: gtItemContent
	x: 4
	y: 6
	width: 280
	height: 394
	opacity: 1
	image: "images/figma/gtItemLeft.png"


gtItemRight = new Layer
	name: "gtItemRight"
	parent: gtItemContent
	x: 572
	y: 6
	width: 280
	height: 394
	opacity: 1
	image: "images/figma/gtItemRight.png"


app = new Layer
	name: "app"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 720
	opacity: 1
	backgroundColor: "transparent"


backgroundApp = new Layer
	name: "backgroundApp"
	parent: app
	x: 0
	y: 0
	width: 360
	height: 720
	image: "images/figma/backgroundApp.png"

backgroundApp.states =
	"start":
		opacity: 0
	"scrollTwo":
		opacity: 0
	"appOpened":
		opacity: 1
	"appScrolled":
		opacity: 1
	"appPrepareClose":
		opacity: 1
	"appClosed":
		opacity: 0


gtView = new Layer
	name: "gtView"
	parent: app
	x: 0
	width: 360
	height: 676
	opacity: 1
	backgroundColor: "transparent"

gtView.states =
	"start":
		y: 784
	"scrollTwo":
		y: 784
	"appOpened":
		y: 44
	"appScrolled":
		y: 44
	"appPrepareClose":
		y: 64
	"appClosed":
		y: 784


gtContent = new Layer
	name: "gtContent"
	parent: gtView
	x: 0
	width: 360
	height: 1907
	opacity: 1
	image: "images/figma/gtContent.png"

gtContent.states =
	"start":
		y: 0
	"scrollTwo":
		y: 0
	"appOpened":
		y: 0
	"appScrolled":
		y: -800
	"appPrepareClose":
		y: -800
	"appClosed":
		y: -800


gtHeader = new Layer
	name: "gtHeader"
	parent: gtView
	x: 0
	y: 0
	width: 360
	height: 56
	opacity: 1
	image: "images/figma/gtHeader.png"


gtFooter = new Layer
	name: "gtFooter"
	parent: gtView
	x: 0
	y: 544
	width: 360
	height: 132
	opacity: 1
	image: "images/figma/gtFooter.png"


appHeader = new Layer
	name: "appHeader"
	parent: app
	x: 0
	width: 360
	height: 64
	opacity: 1
	backgroundColor: "transparent"

appHeader.states =
	"start":
		y: 720
	"scrollTwo":
		y: 720
	"appOpened":
		y: -20
	"appScrolled":
		y: -20
	"appPrepareClose":
		y: 0
	"appClosed":
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
	"scrollTwo":
		opacity: 1
	"appOpened":
		opacity: 1
	"appScrolled":
		opacity: 1
	"appPrepareClose":
		opacity: 0
	"appClosed":
		opacity: 0


titleGt = new Layer
	name: "titleGt"
	parent: appHeader
	x: 0
	y: 0
	width: 360
	height: 64
	image: "images/figma/titleGt.png"

titleGt.states =
	"start":
		opacity: 0
	"scrollTwo":
		opacity: 0
	"appOpened":
		opacity: 0
	"appScrolled":
		opacity: 0
	"appPrepareClose":
		opacity: 1
	"appClosed":
		opacity: 0


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
	"scroll":
		opacity: 1
	"scrollTwo":
		opacity: 1
	"appOpened":
		opacity: 0
	"appScrolled":
		opacity: 0
	"appPrepareClose":
		opacity: 0
	"appClosed":
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


sceneStates = ["start", "scroll", "scrollTwo", "appOpened", "appScrolled", "appPrepareClose", "appClosed"]
sceneLayers = [figmaView, background, feedGt, header, cardRt, cardGt, cardAli, cardBook, gtItemContent, gtItemMid, gtItemLeft, gtItemRight, app, backgroundApp, gtView, gtContent, gtHeader, gtFooter, appHeader, grab, titleGt, statusBar, statusBarColor, statusBarNull]

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


gtView.clip = true
gtView.borderRadius = 24

statusBar.image = "null"

feedScroll = new ScrollComponent
	parent: figmaView
	width: 360
	height: 720 - 24
	scrollVertical: true
	scrollHorizontal: false

feedGt.parent = feedScroll.content
feedScroll.placeBefore(background)



gtScroll = new ScrollComponent
	parent: gtView
	width: 360
	height: gtView.height
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

gtContent.parent = gtScroll.content
gtScroll.sendToBack()


gtItemScroll = new PageComponent
	parent: gtItemContent
	width: 360
	height: gtItemContent.height
	scrollVertical: false
	scrollHorizontal: true
	directionLock: true
	contentInset: 
		right: 4

for item in [gtItemLeft, gtItemMid, gtItemRight]
	item.parent = gtItemScroll.content

gtItemLeft.bringToFront()
gtItemScroll.clip = false
gtItemContent.clip = false
gtItemLeft.clip = false




sceneLayers = sceneLayers.filter (x) -> x != feedGt
sceneLayers = sceneLayers.filter (x) -> x != gtContent

sceneStates = sceneStates.filter (x) -> x != "scroll"
sceneStates = sceneStates.filter (x) -> x != "scrollTwo"
sceneStates = sceneStates.filter (x) -> x != "appScrolled"

cycler = Utils.cycle(sceneStates)
nextState = cycler()



# Icons

gtPromoFavIcon = new Layer
	width: 80
	height: 80
	image: "images/gt%20promo%20fav%20icon.png"

gtPromoFavIcon.states =
	"hidden": { scale: 0.5, opacity: 1 }
	"shown": { scale: 1, opacity: 1 }
	"done": { scale: 1, opacity: 0 }
gtPromoFavIcon.stateSwitch("hidden")


gtPromoFavIcon.parent = gtItemLeft
gtPromoFavIcon.y = - 12
gtPromoFavIcon.x = gtItemLeft.width - gtPromoFavIcon.width + 12


gtItemContent.on Events.StateSwitchStart, (from, to) ->
	if from is "appPrepareClose"
		gtPromoFavIcon.stateSwitch("hidden")
		Utils.delay 0.2, ->
			gtPromoFavIcon.animate("shown", curve: Spring(damping: 0.6, time: 0.2))
		Utils.delay 2.2, ->
			gtPromoFavIcon.animate("done", curve: Spring(damping: 0.9, time: 0.3))



gtFavIconDone = new Layer
	width: 32
	height: 32
	image: "images/gt%20fav%20icon%20done.png"
	propagateEvents: false

gtFavIconDone.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
gtFavIconDone.stateSwitch("hidden")

gtFavIconDone.parent = gtItemRight
gtFavIconDone.x = 236
gtFavIconDone.y = 12

gtFavIconDone.on Events.Click, (event, layer) ->
	event.stopPropagation()
	if gtFavIconDone.states.current.name == "hidden"
		gtFavIconDone.stateSwitch("shown")
		toastAdded.animate("shown", curve: Spring(damping: 1), time: 0.4)
		newFavCounter.stateSwitch("shown")
	else
		gtFavIconDone.stateSwitch("hidden")



newFavCounter = new Layer
	width: 20
	height: 20
	image: "images/new%20fav%20counter.png"

newFavCounter.parent = feedGt
newFavCounter.x = 188
newFavCounter.y = 0

newFavCounter.states = 
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
newFavCounter.stateSwitch("hidden")




toastAdded = new Layer
	width: 360
	height: 60
	image: "images/toast%20added.png"

toastAdded.parent = figmaView
toastAdded.states = 
	"hidden": { y: figmaView.height + 20 }
	"shown": { y: figmaView.height - toastAdded.height }
toastAdded.stateSwitch("hidden")

toastAdded.on Events.StateSwitchEnd, (from, to) ->
	if to is "shown"
		Utils.delay 2,->
			toastAdded.animate("hidden", curve: Spring(damping: 1), time: 0.4)



# feedScroll.scrollToPoint({x: 0, y: 1000}, false)


statusBar = new Layer
	parent: figmaView, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8 }