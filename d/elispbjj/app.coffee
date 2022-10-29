# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


header = new Layer
	name: "header"
	parent: figmaView
	x: 0
	y: 1
	width: 360
	height: 270
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


notifications = new Layer
	name: "notifications"
	parent: header
	x: 20
	y: 40
	width: 24
	height: 24
	opacity: 1
	image: "images/figma/notifications.png"


mail = new Layer
	name: "mail"
	parent: header
	x: 64
	y: 40
	width: 24
	height: 24
	opacity: 1
	image: "images/figma/mail.png"


user = new Layer
	name: "user"
	parent: header
	x: 316
	y: 38
	width: 28
	height: 28
	opacity: 1
	image: "images/figma/user.png"


statusBar = new Layer
	name: "statusBar"
	parent: header
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: "white"


navPanel = new Layer
	name: "navPanel"
	parent: header
	x: 0
	y: 176
	width: 360
	height: 94
	opacity: 1
	image: "images/figma/navPanel.png"


yandex = new Layer
	name: "yandex"
	parent: header
	opacity: 1
	image: "images/figma/yandex.png"

yandex.states =
	"frame2":
		x: 80
		y: 40
		width: 200
		height: 80
	"frame1":
		x: 118.0
		y: 72
		width: 120.0
		height: 48.0


ya = new Layer
	name: "ya"
	parent: header
	image: "images/figma/ya.png"

ya.states =
	"frame2":
		x: 148
		y: -25
		width: 64
		height: 64
		opacity: 0
	"frame1":
		x: 160
		y: 32
		width: 40
		height: 40
		opacity: 1


titleYandex = new Layer
	name: "titleYandex"
	parent: header
	image: "images/figma/titleYandex.png"

titleYandex.states =
	"frame2":
		x: 115
		y: 29
		width: 129.2
		height: 100
		opacity: 0
	"frame1":
		x: 149
		y: 72
		width: 62
		height: 48
		opacity: 1


titleVideo = new Layer
	name: "titleVideo"
	parent: header
	image: "images/figma/titleVideo.png"

titleVideo.states =
	"frame2":
		x: 294.4
		y: 29
		width: 112.5
		height: 100
		opacity: 0
	"frame1":
		x: 231
		y: 72
		width: 54
		height: 48
		opacity: 1


titleMarket = new Layer
	name: "titleMarket"
	parent: header
	image: "images/figma/titleMarket.png"

titleMarket.states =
	"frame2":
		x: 448.6
		y: 29
		width: 135.4
		height: 100
		opacity: 0
	"frame1":
		x: 305
		y: 72
		width: 65
		height: 48
		opacity: 1


search = new Layer
	name: "search"
	parent: header
	x: 0
	y: 120
	width: 360
	height: 56
	opacity: 1
	image: "images/figma/search.png"


sceneStates = ["frame2", "frame1"]
sceneLayers = [figmaView, header, notifications, mail, user, statusBar, navPanel, yandex, ya, titleYandex, titleVideo, titleMarket, search]

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


# Addon

titleMarket.states.frame1.opacity = 0
titleVideo.states.frame1.opacity = 0

yandex.states.frame1.opacity = 0
yandex.states.frame1.scaleY = 0.5

yandex.states.frame2.opacity = 1
yandex.states.frame2.scaleY = 1

titleYandex.states.frame1.scaleX = 1.0
titleYandex.states.frame2.scaleX = 0.8



video = new Layer
	width: 54
	height: 48
	image: "images/video.png"
	x: 231
	y: 74

market = new Layer
	width: 55
	height: 48
	image: "images/market.png"
	x: 305
	y: 74

for item in [video, market]
	item.parent = figmaView
	item.scale = 0.9
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	item.stateSwitch("hidden")


yandex.on Events.StateSwitchStart, (from, to) ->
	if to == "frame1"
		for item, i in [video, market]
			item.animate("shown", time: 0.3, delay: 0.2 + 0.1 * i)
	else if to is "frame2"
		for item, i in [video, market]
			item.animate("hidden", time: 0.2)

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, forceAndroidBar: true }

figmaView.backgroundColor = "eee"
header.borderRadius = 24

stub = new Layer
	parent: figmaView
	width: 360
	height: 626
	y: 277
	image: "images/%D1%81%D1%82%D0%B0%D0%B1%D1%8B%20%D0%BF%D0%BF%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D0%B5%D1%80%D0%B5%D1%85%D0%BE%D0%B4%D0%BD%D0%BE%D0%B3%D0%BE.png"
