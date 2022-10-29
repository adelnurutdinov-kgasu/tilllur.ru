Canvas.backgroundColor = "222"
magicW = 200

# UI

consoleLayer = new TextLayer
	width: Canvas.width - magicW
	x: magicW/2
	y: 40
	fontSize: 16
	text: "#{(Canvas.width - magicW)}"


minGuidePlate = new Layer
	width: 100
	height: 60
	x: magicW/2 + 320
	y: 10
	backgroundColor: "red"
	opacity: 0.1

minGuide = new Layer
	width: 1
	height: 60
	x: magicW/2 + 320
	y: 10
	backgroundColor: "red"
	opacity: 0.5

maxGuide = new Layer
	width: 1
	height: 60
	x: magicW/2 + 420
	y: 10
	backgroundColor: "red"
	opacity: 0.5




minGuidePlateLandscape = new Layer
	width: 720 - 568
	height: 60
	x: magicW/2 + 568
	y: 10
	backgroundColor: "yellow"
	opacity: 0.1

minGuideLandscape = new Layer
	width: 1
	height: 60
	x: magicW/2 + 568
	y: 10
	backgroundColor: "yellow"
	opacity: 0.5

maxGuideLandscape = new Layer
	width: 1
	height: 60
	x: magicW/2 + 720
	y: 10
	backgroundColor: "yellow"
	opacity: 0.5



screenWrapper = new Layer
	width: Canvas.width - magicW
	height: 667 + 80
	x: magicW/2
	y: 120
	backgroundColor: "333"
	borderRadius: 16

screen = new Layer
	width: Canvas.width - magicW
	height: 667
	x: magicW/2
	y: 160
	backgroundColor: "white"
	clip: true
	borderRadius: 16

# header

header = new Layer
	parent: screen
	width: screen.width
	height: 48
	backgroundColor: "null"

header_right = new Layer
	parent: header
	width: 180
	height: 48
	image: "images/header%20right.png"
	x: Align.right

header_left = new Layer
	parent: header
	width: 180
	height: 48
	image: "images/header%20left.png"
	x: Align.left



# Logo & Omni

logo = new Layer
	parent: screen
	width: 360
	height: 48
	image: "images/logo.png"
	x: Align.center

gapLogoToArrow = new Layer
	parent: screen
	height: 10
	backgroundColor: "null"

omnibox = new Layer
	parent: screen
	width: screen.width
	height: 42
	backgroundColor: "null"

omni_left = new Layer
	parent: omnibox
	width: 50
	height: 42
	image: "images/omni%20left.png"

omni_right = new Layer
	parent: omnibox
	width: 140
	height: 42
	x: Align.right
	image: "images/omni%20right.png"

omni_mid = new Layer
	parent: omnibox
	width: omnibox.width - omni_left.width - omni_right.width
	height: 42
	x: omni_left.width
	clip: true









omni_mid_content1 = new Layer
	parent: omni_mid
	width: 170
	height: 42
	image: "images/omni%20mid.png"

omni_mid_content2 = new Layer
	parent: omni_mid
	width: 170
	height: 42
	x: 170
	image: "images/omni%20mid.png"

omni_mid_content3 = new Layer
	parent: omni_mid
	width: 170
	height: 42
	x: 170 * 2
	image: "images/omni%20mid.png"

omni_mid_content4 = new Layer
	parent: omni_mid
	width: 170
	height: 42
	x: 170 * 3
	image: "images/omni%20mid.png"

# Nav Panel

navPanel = new Layer
	parent: screen
	width: screen.width
	height: 90
	backgroundColor: "null"



navPanelGap = 16

for item, i in ["Видео", "Картинки", "Маркет", "Карты", "Ещё"]
	iconView = new Layer
		parent: navPanel
		width: (navPanel.width - navPanelGap * 2) / 5
		x: ((navPanel.width - navPanelGap * 2) / 5) * i + navPanelGap
		height: navPanel.height
		backgroundColor: Utils.randomColor()
		backgroundColor: "null"
	
	iconImage = new Layer
		parent: iconView
		size: 48
		x: Align.center
		y: 12
		image: "images/icon#{i}.png"
	
	iconText = new TextLayer
		parent: iconView
		width: iconView.width
		height: 16
		y: 64
		fontSize: 12
		text: item
		textAlign: "center"
		color: "black"








richBanner = new Layer
	parent: screen
	width: screen.width
	height: 76
	backgroundColor: "#F8D6D6"
	clip: true

ad = new Layer
	parent: richBanner
	width: 300
	height: 76
	image: "images/ad.png"
	x: Align.center


# Informers

widgetGap = 16

widget =
	"40":
		width: 119
		height: 52
		image: "images/widget40.png"

	"30":
		width: 149
		height: 52
		image: "images/widget30.png"

	"20":
		width: 110
		height: 52
		image: "images/widget20.png"

	"10":
		width: 177
		height: 52
		image: "images/widget10.png"






gapAdToWidgets = new Layer
	parent: screen
	height: 10
	backgroundColor: "null"

widgetScroll = new ScrollComponent
	parent: screen
	width: screen.width
	height: 52
	scrollVertical: false
	contentInset:
		right: widgetGap

gapWidgetsToCard = new Layer
	parent: screen
	height: 6
	backgroundColor: "null"

widgetSumX = widgetGap
for item in ["10", "20", "30", "40"]
	widgetLayer = new Layer
		parent: widgetScroll.content
		width: widget[item].width
		height: widget[item].height
		image: widget[item].image
		x: widgetSumX
	
	widgetSumX += widget[item].width + 8



card_header = new Layer
	parent: screen
	width: screen.width
	height: 54
	backgroundColor: "null"

card_header_content = new Layer
	parent: card_header
	width: 200
	height: 54
	image: "images/card%20header.png"

card_grey_area = new Layer
	parent: screen
	width: screen.width - 8
	height: 300
	x: 4
	borderRadius: 20
	backgroundColor: "#F5F5F5"











composeVerticalLayout = () ->
	sumY = 0
	for item in screen.children
		item.y = sumY
		sumY += item.height

composeVerticalLayout()


Canvas.on "change:width", ->
	updateBasedOnCanvas()


updateBasedOnCanvas = () ->
	canvasWidth = Canvas.width
	if Canvas.width > magicW + 420
		canvasWidth = magicW + 420
	
	consoleLayer.width = Canvas.width - magicW
	screenWrapper.width = Canvas.width - magicW
	screen.width = canvasWidth - magicW
	screen.x = Align.center()
	
	
	consoleLayer.text = "#{(Canvas.width - magicW)}"
	
	header.width = header.parent.width
	header_left.x = 0
	header_right.x = header.parent.width - header_right.width
	
	logo.x = Align.center
	
	omnibox.width = omnibox.parent.width
	omni_right.x = Align.right
	omni_mid.width = screen.width - omni_left.width - omni_right.width
	
	navPanelGap = 0
	navPanel.width = navPanel.parent.width
	for item, i in navPanel.children
		item.width = (navPanel.width - navPanelGap * 2) / 5
		item.x = ((navPanel.width - navPanelGap * 2) / 5) * i + navPanelGap
		for child, i in item.children
			if i == 0 then child.x = Align.center
			if i == 1 then child.width = item.width
	
	richBanner.width = richBanner.parent.width
	ad.x = Align.center
	
	gapAdToWidgets.width = gapAdToWidgets.parent.width
	widgetScroll.width = widgetScroll.parent.width
	gapWidgetsToCard.width = gapWidgetsToCard.parent.width
	
	card_header.width = card_header.parent.width
	card_grey_area.width = card_grey_area.parent.width - 8
	

updateBasedOnCanvas()