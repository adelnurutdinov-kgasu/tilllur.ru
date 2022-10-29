document.body.style.cursor = "auto"

{ Preview } = require "PreviewComponent"

Framer.Defaults.Animation =
	curve: Spring(tension: 240, friction: 120, velocity: 10)

	# time: 1.5

screen = new Layer
	width: 1080, height: 1920
	backgroundColor: "FFF"


new Preview { view: screen, visible: false, borderRadius: 0 }


# video = new VideoLayer
# 	parent: screen
# 	width: 1080
# 	height: 1920
# 	video: "images/test.mp4"

# video.player.play()

phone = new Layer
	parent: screen
	width: 1080
	height: 1920
	image: "images/screen.png"
	# originX: 0.5
	# originY: 1

phone.states =
	"hidden": { scale: 0.8, y: 0, opacity: 0 } 
	"shown": { scale: 1.0, y: 0, opacity: 1 }

info = new Layer
	parent: phone
	width: 1080
	height: 1920
	backgroundColor: null
	# image: "images/content.png"
	# originX: 0
	# originY: 1

info.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

cover = new Layer
	parent: screen
	width: 1080
	height: 1920
	image: "images/cover.png"
	originX: 0
	originY: 0.2

cover.states =
	"hidden": { scale: 0.8, opacity: 0 }
	"shown": { scale: 1.0, opacity: 1 }

item.stateSwitch("hidden") for item in [phone]






layer1 = new Layer
	width: 290.0
	height: 64.0
	image: "images/layer1.png"

layer2 = new Layer
	width: 290.0
	height: 64.0
	image: "images/layer2.png"

layer3 = new Layer
	width: 290.0
	height: 120.0
	image: "images/layer3.png"

layer4 = new Layer
	width: 290.0
	height: 220.0
	image: "images/layer4.png"

layer5 = new Layer
	width: 290.0
	height: 220.0
	image: "images/layer5.png"

layer6 = new Layer
	width: 290.0
	height: 220.0
	image: "images/layer6.png"

layer7 = new Layer
	width: 290.0
	height: 460.0
	image: "images/layer7.png"


layerComp = new Layer
	parent: info
	width: 288 * 3
	height: 460 * 3
	x: 36 * 3
	y: 280 * 3
	backgroundColor: "white"
	clip: true

itemLayers = [layer1, layer2, layer3, layer4, layer5, layer6, layer7]
for item in itemLayers
	item.parent = layerComp
	item.width = item.width * 3
	item.height = item.height * 3
	item.backgroundColor = null

	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	item.stateSwitch("hidden")




flag = true


screen.onTap ->
	if flag
		for item in [phone]
			item.animate("shown")
		
		Utils.delay 0.8, =>
			for item, i in itemLayers
				# print item
				# item.stateSwitch("shown")
				item.animate("shown", time: 0.35, curve: Bezier.linear, delay: 0.15 * i)
	else
		# phone.states.hidden.scale = 1
		# phone.states.hidden.y = 1200
		# phone.states.hidden.opacity = 0
		for item in [phone]
			item.animate("hidden", curve: Spring(damping: 1), time: 0.8)
	
	flag = !flag


Utils.delay 0.5, ->
	screen.emit Events.Tap

Utils.delay 6, ->
	screen.emit Events.Tap

# phone.stateSwitch("shown")
# info.stateSwitch("shown")

# for item, i in itemLayers
# 	item.stateSwitch("shown")


screen.parent.scale = 0.51


# fix

# fixVideo = new Layer
# 	parent: screen
# 	width: screen.width
# 	height: screen.height
# 	backgroundColor: "white"
# 	backgroundColor: "black"

# testVideo = new VideoLayer
# 	# scale: 0.5
# 	parent: screen
# 	# x: -20
# 	width: 1080
# 	height: 1920
# 	backgroundColor: null
# 	video: "images/testVideo.mp4"

# testVideo.player.play()



# out = new Layer
# 	parent: screen
# 	width: 885.0
# 	height: 660.0
# 	image: "images/out.gif"
# 	scale: 1
