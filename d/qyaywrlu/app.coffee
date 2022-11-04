RADIUS_CARD = 16

Framer.Extras.Hints.disable()

# Data

data = ["images/icons/afisha.png",
"images/icons/autoru.png",
"images/icons/chief.png",
"images/icons/disk.png",
"images/icons/drive.png",
"images/icons/eda.png",
"images/icons/edadil.png",
"images/icons/efir.png",
"images/icons/mail.png",
"images/icons/market.png",
"images/icons/mvideo.png",
"images/icons/news.png",
"images/icons/ozon.png",
"images/icons/perek.png",
"images/icons/q.png",
"images/icons/rayon.png",
"images/icons/sport.png",
"images/icons/talents.png",
"images/icons/trains.png",
"images/icons/wildb.png",
"images/icons/yandex.png",
"images/icons/zen-logo.png"]


dataTitles = [
	"Новости",
	"Драйв",
	"Яндекс",
	"Мвидео",
	"Маркет",
	"Авто.ру",
	"Еда",
	"Едадил",
	"Эфир",
	"Такси",
	"Таланты",
	"Дзен",
	"Ozon",
	"Мвидео",
	"Электрички"
]

# Page

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "#eee"
	borderRadius: 12
	clip: true

pages = new PageComponent
	parent: screen
	width: 360
	height: 640
	scrollHorizontal: false
	directionLock: true
	originY: 1

page1 = new Layer
	width: 360
	height: 538
	parent: pages.content
	backgroundColor: "white"
	borderRadius: RADIUS_CARD

page2 = new Layer
	width: 360
	height: 400
	y: page1.height
	parent: pages.content
	backgroundColor: "eee"

page3 = new Layer
	width: 360
	height: 640 - page2.height
	y: page1.height + page2.height
	parent: pages.content
	backgroundColor: "eee"

pages.snapToPage(page2, false)



pipkaLayer = new Layer
	width: 40
	height: 4
	borderRadius: 8
	parent: page1
	y: page1.height - 4 - 8
	x: Align.center

header = new Layer
	parent: screen
	width: 360
	height: 138
	image: "images/header.png"

newsView = new Layer
	parent: page2
	y: 8
	backgroundColor: "white"
	borderRadius: RADIUS_CARD
	width: 360
	height: 470
	image: "images/news%20view.png"

page2.bringToFront()

bottomBar = new Layer
	parent: screen
	width: 360
	height: 48
	y: Screen.height - 48
	image: "images/bottomBar.png"




# App

getIcon = () ->
	iconLayer = new Layer
		size: 48
		borderRadius: 16
		image: Utils.randomChoice(data)
	
	iconTitle = new TextLayer
		fontSize: 13
		parent: iconLayer
		width: 48
		height: 72
		y: 48 + 4
		height: 72 - 48 - 4
		text: Utils.randomChoice(dataTitles)
		textAlign: "center"
	
	return iconLayer





recentAppView = new PageComponent
	directionLock: true
	backgroundColor: "white"
	parent: pages
	width: 360
	height: 72 + 4
	y: 144 - 6
	scrollVertical: false
	originX: 0
	contentInset:
		left: 28
		right: 20

recentAppView.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

recentAppView.stateSwitch("shown")


for i in [0...3]
	fiveAppView = new Layer
		width: 64 * 5
		height: 72
		backgroundColor: "null"
		parent: recentAppView.content
		x: (64 * 5) * i
	
	for iconIndex in [0...5]
		tempIcon = getIcon()
		tempIcon.parent = fiveAppView
		tempIcon.x = iconIndex * 64



myAppView = new Layer
	width: 360
	height: page1.height
	parent: page1
	backgroundColor: "null"

myAppView.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

myAppView.stateSwitch("shown")


for i in [0...3]
	fiveAppView = new Layer
		width: 64 * 5
		height: 64
		backgroundColor: "null"
		parent: myAppView
		y: page1.height - 200 - (64 + 36) * i + 190 - 64 - 16 - 12
		x: 28
	
	for iconIndex in [0...5]
		tempIcon = getIcon()
		tempIcon.parent = fiveAppView
		tempIcon.x = iconIndex * 64



pages.content.on "change:y", ->
	value = pages.scrollY
	
# 	myAppView.opacity = Utils.modulate(value, [0, page1.height / 3], [1, 0], true)
# 	recentAppView.opacity = Utils.modulate(value, [0, page1.height / 3], [0, 1], true)


# recentAppView.opacity = 0.4

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }