# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "transparent"


content = new Layer
	name: "content"
	name: "content"
	parent: figmaView
	x: 0
# 	width: 360
# 	height: 3573
	opacity: 1
	width: 360
	height: 3366
	image: "images/content.png"

# content = new Layer
	name: "# content"
# 	width: 360
# 	height: 3366
# 	image: "images/content.png"

content.states =
	"base":
		y: 24
	"scrolled1":
		y: -780
	"scrolled2":
		y: -1280
	"scrolled3":
		y: -1737
	"layer":
		y: -2154
	"back":
		y: -1737


layerTeaser = new Layer
	name: "layerTeaser"
	name: "layerTeaser"
	parent: figmaView
	x: 0
	width: 360
	height: 430
	opacity: 1
	image: "images/figma/layerTeaser.png"

layerTeaser.states =
	"base":
		y: 532 - 20
	"scrolled1":
		y: 532
	"scrolled2":
		y: 532
	"scrolled3":
		y: 532
	"layer":
		y: 117
	"back":
		y: 532


bottomBar = new Layer
	name: "bottomBar"
	name: "bottomBar"
	parent: figmaView
	x: 0
	y: 592
	width: 360
	height: 48
	opacity: 1
	image: "images/figma/bottomBar.png"


statusBarWhite = new Layer
	name: "statusBarWhite"
	name: "statusBarWhite"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: "white"
	# image: "images/figma/statusBarWhite.png"


sceneStates = ["base", "scrolled1", "scrolled2", "scrolled3", "layer", "back"]
sceneLayers = [figmaView, content, layerTeaser, bottomBar, statusBarWhite]

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


contentScroll = new ScrollComponent
	name: "contentScroll"
	parent: figmaView
	width: content.width
	height: figmaView.height - statusBarWhite.height - bottomBar.height + 4
	y: statusBarWhite.height
	scrollHorizontal: false
	scrollVertical: false

content.y = 0
content.parent = contentScroll.content
contentScroll.placeBehind(layerTeaser)


figmaView.backgroundColor = "EEE"
layerTeaser.image = null
layerTeaser.height = 640

layerTeaser.draggable.enabled = true
layerTeaser.draggable.overdrag = false
layerTeaser.draggable.constraints =
	x: 0
	y: -640
	width: 360
	height: 640*10

# Card

card = new Layer
	name: "card"
	width: 360
	height: 414
	image: "images/card2.png"

card.parent = layerTeaser
card.originX = 0.5
card.originY = 0
card.states =
	"feed":
		scale: 0.9777
		borderRadius: 8
	"layer":
		scale: 0.92
		borderRadius: 12

card.stateSwitch("layer")
sceneLayers.push(card)




omnibox = new Layer
	name: "omnibox"
	width: 360
	height: 56
	parent: figmaView
	y: 105 + 24
	image: "images/omnibox.png"
	backgroundColor: "white"

omniboxFix = new Layer
	name: "omniboxFix"
	width: 360
	height: 56
	parent: content
	y: 105
	backgroundColor: "white"


zenP = 1536 + 64+ 20
teaserP = 512
gapSize = 140




# Blur

box = new Layer
	name: "box"
	width: 360
	height: 640
	backgroundColor: "rgba(255,255,255,1.0)"
	parent: figmaView
	opacity: 0

box.placeBehind(layerTeaser)
sceneLayers.push box
# 
# box.style =
# 	"-webkit-backdrop-filter": "blur(80px)"





temp = new TextLayer
	name: "temp"
	fontSize: 14
	x: 140
	text: layerTeaser.y
	opacity: 0


layerTeaser.on "change:y", ->
	value = layerTeaser.y
	temp.text = value
# 	if value < 0
# # # 		print "ok"
# 		transitionEnded = true
	
	if !transitionEnded
		omnibox.y = Utils.modulate(value, [teaserP, teaserP - 105], [105 + 24, 24], true)
		header_classic.y = Utils.modulate(value, [teaserP, teaserP - 105], [24, 24-105], true)
		
		if value > teaserP-gapSize/2
			skip.opacity = Utils.modulate(value, [teaserP-gapSize/5*2, teaserP-gapSize/2], [0, 1], true)
		else 
			skip.opacity = Utils.modulate(value, [teaserP-gapSize/2, teaserP-gapSize], [1, 0], true)
		skip.y = Utils.modulate(value, [teaserP, teaserP - 105], [teaserP - 36, teaserP - 36-105], false)
		
		contentScroll.opacity = Utils.modulate(value, [teaserP, teaserP-gapSize/2], [1, 0], true)
		contentScroll.scrollY = Utils.modulate(value, [teaserP, teaserP-100], [0, 100], false)
		
		framerShadow.opacity = Utils.modulate(value, [teaserP-gapSize/2, teaserP-gapSize], [1, 0], true)
		
		newContent.y = Utils.modulate(value, [teaserP, teaserP-100], [-zenP+24, -zenP+24 - 100], false)
	# 	newContent.opacity = Utils.modulate(value, [teaserP-gapSize/2, teaserP-gapSize], [0, 1], true)
		newContent.opacity = Utils.modulate(value, [teaserP-gapSize, teaserP-gapSize*1.5], [0, 1], true)
			
		card.scale = Utils.modulate(value, [teaserP, teaserP - gapSize], [card.states.layer.scale, card.states.feed.scale], true)
		card.borderRadius = Utils.modulate(value, [teaserP, teaserP - gapSize], [card.states.layer.borderRadius, card.states.feed.borderRadius], true)
	
	
	else
		newContent.y = Utils.modulate(value, [teaserP, teaserP-100], [-zenP+24, -zenP+24 - 100], false)

	


transitionEnded = false


framerShadow.parent = layerTeaser
framerShadow.y = -20
framerShadow.sendToBack()

layerTeaser.on Events.AnimationEnd, ->
	if layerTeaser.y < 440
		transitionEnded = true

layerTeaser.on Events.TouchEnd, ->
	if layerTeaser.y < 100
		transitionEnded = true

layerTeaser.on Events.DragEnd, ->
	if layerTeaser.draggable.velocity.y < -0.2
		return
	
	if layerTeaser.y > 440
		layerTeaser.animate(y: 512, { time: 0.3 } )
	else if layerTeaser.y > 300 and layerTeaser.y < 440
		layerTeaser.animate(y: 160, { time: 0.6 } )
	
# 		transitionEnded = true
# 	else
# 		transitionEnded = true
		

newContent = content.copy()
newContent.name = "newContent"
newContent.parent = figmaView
newContent.opacity = 0
newContent.placeBehind(box)



header_classic = new Layer
	name: "header_classic"
	width: 360
	height: 105
	image: "images/header%20classic.png"
	parent: figmaView

header_classic.sendToBack()


skip = new Layer
	name: "skip"
	width: 360
	height: 32
	image: "images/skip.png"
	parent: figmaView
	opacity: 0



{ Preview } = require "PreviewComponent"
preview = new Preview { view: figmaView, borderRadius: 12, topTheme: "light", forceAndroidBar: true }
# preview.printTree()
