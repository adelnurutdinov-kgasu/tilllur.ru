# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 1376
	height: 726
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"
	# clip: true


location = new Layer
	name: "location"
	parent: figmaView
	x: 0
	y: 0
	width: 328
	height: 58
	opacity: 1
	image: "images/figma/location.png"


linksBox = new Layer
	name: "linksBox"
	parent: figmaView
	x: 1093
	y: 0
	width: 283
	height: 58
	opacity: 1
	backgroundColor: "transparent"


links = new Layer
	name: "links"
	parent: linksBox
	x: 0
	y: 0
	width: 283
	height: 58
	opacity: 1
	image: "images/figma/links.png"


sites = new Layer
	name: "sites"
	parent: figmaView
	x: 264
	y: 408
	width: 768
	height: 112
	opacity: 1
	image: "images/figma/sites.png"


logo = new Layer
	name: "logo"
	parent: figmaView
	x: 611
	y: 94
	width: 153
	height: 83
	opacity: 1
	image: "images/figma/logo.png"


helper = new Layer
	name: "helper"
	parent: figmaView
	x: 282
	y: 241
	width: 262
	height: 27
	opacity: 1
	image: "images/figma/helper.png"


arrowBox = new Layer
	name: "arrowBox"
	parent: figmaView
	x: 282
	y: 185
	width: 811
	height: 62
	opacity: 1
	backgroundColor: "transparent"


arrowLeft = new Layer
	name: "arrowLeft"
	parent: arrowBox
	x: 0
	y: 0
	width: 417
	height: 62
	opacity: 1
	image: "images/figma/arrowLeft.png"


arrowRight = new Layer
	name: "arrowRight"
	parent: arrowBox
	x: 342
	y: 0
	width: 469
	height: 62
	opacity: 1
	image: "images/figma/arrowRight.png"


banner = new Layer
	name: "banner"
	parent: figmaView
	x: 288
	y: 292
	width: 728
	height: 90
	opacity: 1
	image: "images/figma/banner.png"


zenBox = new Layer
	name: "zenBox"
	parent: figmaView
	x: 200
	y: 605
	width: 976
	height: 121
	opacity: 1
	backgroundColor: "transparent"


zen = new Layer
	name: "zen"
	parent: zenBox
	x: 0
	y: 0
	width: 976
	height: 121
	opacity: 1
	image: "images/figma/zen.png"

news = new Layer
	parent: figmaView
	width: 790
	height: 189
	image: "images/news.png"

sceneStates = ["2"]
sceneLayers = [figmaView, location, linksBox, links, sites, logo, helper, arrowBox, arrowLeft, arrowRight, banner, zenBox, zen, news]

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


zenBox.clip = true
arrowBox.clip = true

# news.y = 200
# news.opacity = 0.6

updateWidth = () ->
	linksBox.x = Canvas.width - linksBox.width
	
# 	arrowBox.backgroundColor = "red"
	arrowBoxWidth = Canvas.width - 32
	arrowBox.width = Math.min(arrowBoxWidth, 811)
	arrowBox.x = Canvas.width / 2 - arrowBox.width / 2
	arrowRight.x = arrowBox.width - arrowRight.width
	
	arrowBox.x = arrowBox.x + 16
	
	logo.x = arrowBox.x - logo.width
	
	helper.x = arrowBox.x
	banner.x = arrowBox.x + 6
	sites.x = arrowBox.x + 18
	news.x = arrowBox.x - 18
	
	if Canvas.width < 670 then zenBox.width = 332
	else if Canvas.width < 980 then zenBox.width = 653
	else zenBox.width = 976
	zenBox.x = Canvas.width / 2 - zenBox.width / 2

updateHeight = () ->
# 	if Canvas.height < 800 then print "ok"
# 	print Canvas.height
	zenBox.y = Canvas.height - zenBox.height
	news.y = 700
# 	news.opacity = 0 
	
	
	# LOGO
	if Canvas.height < 500
		sites.y = 80
		arrowBox.y = 220
		logo.y = arrowBox.y - 10
		logo.opacity = 1
		helper.y = arrowBox.y + arrowBox.height - 4
		banner.y = helper.y + helper.height + 16
		banner.opacity = 0
# 		news.y = helper.y + helper.height + 28
		news.opacity = 0
	
	# NEWS
	else if Canvas.height < 612
		sites.y = 80
		arrowBox.y = 220
		logo.y = arrowBox.y - 10
		logo.opacity = 1
		helper.y = arrowBox.y + arrowBox.height - 4
		banner.y = helper.y + helper.height + 16
		banner.opacity = 0
# 		news.y = helper.y + helper.height + 28
		news.opacity = 0
	
	# BANNER
	else if Canvas.height < 724
		sites.y = 80
		arrowBox.y = 220
		logo.y = arrowBox.y - 10
		logo.opacity = 1
		helper.y = arrowBox.y + arrowBox.height - 4
		banner.y = helper.y + helper.height + 16
		banner.opacity = 0
		news.y = helper.y + helper.height + 16
		news.opacity = 1
	# MAX
	else
		sites.y = 80
		arrowBox.y = 220
		logo.y = arrowBox.y - 10
		logo.opacity = 1
		helper.y = arrowBox.y + arrowBox.height - 4
		banner.y = helper.y + helper.height + 16
		banner.opacity = 1
		news.y = banner.y + banner.height + 28
		news.opacity = 1





{ Preview } = require "PreviewComponent"
preview = new Preview { view: figmaView, borderRadius: 8, visible: false, backgroundColor: "white" }

# preview.backgroundColor = "red"

Canvas.on "change:width", ->
	preview.width = Canvas.width
	# figmaView.x = Align.center()
	updateWidth()

Canvas.on "change:height", ->
	preview.height = Canvas.height
	updateHeight()

preview.width = Canvas.width
preview.height = Canvas.height
preview.center()

updateWidth()
updateHeight()