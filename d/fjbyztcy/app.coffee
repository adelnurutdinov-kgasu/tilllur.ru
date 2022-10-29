# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(245.00000059604645, 246.0000005364418, 248.0000004172325, 1)"


content = new Layer
	name: "content"
	parent: figmaView
	x: 0
	y: 156
	width: 360
	height: 500
	opacity: 1
	backgroundColor: "transparent"


verticals = new Layer
	name: "verticals"
	parent: content
	x: 0
	y: 0
	width: 736
	height: 500
	opacity: 1
	backgroundColor: "transparent"

verticals.states =
	"yandex":
		x: 0
	"video":
		x: -360-16


contentYandex = new Layer
	name: "contentYandex"
	parent: verticals
	x: 0
	y: 0
	width: 360
	height: 500
	opacity: 1
	image: "images/figma/contentYandex.png"


contentVideo = new Layer
	name: "contentVideo"
	parent: verticals
	x: 376
	y: 0
	width: 360
	height: 500
	opacity: 1
	image: "images/figma/contentVideo.png"


header = new Layer
	name: "header"
	parent: figmaView
	x: 0
	y: 24
	width: 360
	height: 160
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


notifications = new Layer
	name: "notifications"
	parent: header
	x: 20
	y: 16
	width: 24
	height: 24
	opacity: 1
	image: "images/figma/notifications.png"


mail = new Layer
	name: "mail"
	parent: header
	x: 64
	y: 16
	width: 24
	height: 24
	opacity: 1
	image: "images/figma/mail.png"


user = new Layer
	name: "user"
	parent: header
	x: 316
	y: 14
	width: 28
	height: 28
	opacity: 1
	image: "images/figma/user.png"


ya = new Layer
	name: "ya"
	parent: header
	x: 160
	y: 8
	width: 40
	height: 40
	opacity: 1
	image: "images/figma/ya.png"


titleYandex = new Layer
	name: "titleYandex"
	parent: header
	y: 48
	width: 62
	height: 48
	image: "images/figma/titleYandex.png"

titleYandex.states =
	"yandex":
		x: 149
		opacity: 1
	"video":
		x: 71
		opacity: 0.3


titleVideo = new Layer
	name: "titleVideo"
	parent: header
	y: 48
	width: 54
	height: 48
	image: "images/figma/titleVideo.png"

titleVideo.states =
	"yandex":
		x: 231
		opacity: 0.3
	"video":
		x: 153
		opacity: 1


titleMarket = new Layer
	name: "titleMarket"
	parent: header
	y: 48
	width: 65
	height: 48
	opacity: 1
	image: "images/figma/titleMarket.png"

titleMarket.states =
	"yandex":
		x: 305
	"video":
		x: 227


search = new Layer
	name: "search"
	parent: header
	x: 0
	y: 96
	width: 360
	height: 56
	opacity: 1
	image: "images/figma/search.png"


bottomBar = new Layer
	name: "bottomBar"
	parent: figmaView
	x: 0
	y: 592
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/bottomBar.png"


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: "white"


sceneStates = ["yandex", "video"]
sceneLayers = [figmaView, content, verticals, contentYandex, contentVideo, header, notifications, mail, user, ya, titleYandex, titleVideo, titleMarket, search, bottomBar, statusBar]

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


nextStateHandler = () ->

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, forceAndroidBar: true }

# Pages

pages = new PageComponent
	width: 360
	height: 640
	parent: figmaView

page1 = new Layer
	width: 360
	height: 640
	backgroundColor: "rgba(255, 0, 0, 0.5)"

page2 = new Layer
	width: 360
	height: 640
	backgroundColor: "rgba(0, 255, 0, 0.5)"

for item, i in [page1, page2]
	item.parent = pages.content
	item.x = 360 * i
	item.backgroundColor = "null"

pages.updateContent()

toFeedGap = [0, 360]

pages.content.on "change:x", ->
	v = pages.scrollX
# 	print v
	
	[s1, s2] = ["yandex", "video"]
	l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
		true) for [l, d, g] in [[verticals, "x", toFeedGap],
								[titleYandex, "x", toFeedGap],
								[titleYandex, "opacity", toFeedGap],
								[titleVideo, "x", toFeedGap],
								[titleVideo, "opacity", toFeedGap],
								[titleMarket, "x", toFeedGap],
	]