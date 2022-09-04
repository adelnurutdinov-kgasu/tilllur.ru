sketch = Framer.Importer.load "imported/fs-ios-adme-post-framer"

screen = new Layer
	width: 320, height: 568

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "dark", forceAndroidBar: true }

# Fixes

sketch["Artboard"].parent = screen
sketch["Artboard"].scale = 0.5
sketch["Artboard"].originX = 0
sketch["Artboard"].originY = 0

socials = sketch["socials"]
darker = sketch["darker"]
nav_bar = sketch["nav_bar"]
content = sketch["content"]
image = sketch["image"]
share_start = sketch["share_start"]
share_finish = sketch["share_finish"]
share = sketch["share"]
facebook = sketch["facebook"]
vk = sketch["vk"]
twitter = sketch["twitter"]
whatsapp = sketch["whatsapp"]

sketch.content.draggable.speedX = 0
sketch.content.draggable.speedY = 1
sketch.image.originX = 0.5
sketch.image.originY = 0
isSharing = false

sketch.socials.y = 744
sketch.share_start.opacity = 0
sketch.share_finish.opacity = 0
sketch.darker.opacity = 0
sketch.share.image = "images/start.png"


sketch.share.states.saved = { x: sketch.share.x, y: sketch.share.y }

sharings = [sketch.facebook, sketch.vk, sketch.twitter, sketch.whatsapp]
for item in sharings
	item.states.saved = { x: item.x, y: item.y }
	item.states.nextState = { x: sketch.share.x + 10, y: sketch.share.y + 10 }
	item.opacity = 0
	item.x = sketch.share.x + 10
	item.y = sketch.share.y + 10
# 	print item.states.saved

# content.on Events.DragMove, ->
# 	if content.y > 560
# 		image.scale = Utils.modulate(content.y, [560, 760], [1, 2], true)
# 		content.draggable.speedY = Utils.modulate(content.y, [560, 860], [1, 0.2])

sketch.share.on Events.Click, ->
	if !isSharing
		for item in sharings
			item.animate
				properties:
					x: item.states.saved.x,
					y: item.states.saved.y,
					opacity: 1
				time: 0.2
				curve: "spring(150, 10, 2)"
		sketch.darker.animate
			properties: {opacity: 1}
			time: 0.2
			curve: "linear"
		waitForBiggerShare = sketch.share.animate
			properties: {scale: 1.4}
			time: 0.1
		waitForBiggerShare.on 'end', ->
			sketch.share.animate
				properties: {scale: 1}
				time: 0.1
		isSharing = true
		sketch.share.image = "images/finish.png"
	else
		for item in sharings
			item.animate
				properties:
					x: sketch.share.states.saved.x + 10,
					y: sketch.share.states.saved.y + 10,
					opacity: 0
				time: 0.1
		sketch.share.image = "images/start.png"
		sketch.darker.opacity = 0
		isSharing = false


sketch.content.on Events.TouchMove, ->
	if sketch.content.y > 560
		image.scale = Utils.modulate(sketch.content.y, [560, 776], [1, 2], true)
		sketch.content.draggable.speedY = Utils.modulate(sketch.content.y, [560, 860], [1, 0.2])
	else
		sketch.image.y = Utils.modulate(sketch.content.y, [560, 128], [128, -128])
		
sketch.content.on Events.TouchEnd, ->
	sketch.content.draggable.speedY = 1
	if sketch.content.y > 560
		sketch.content.animate
			properties: {y: 560}
			time: 0.2
			delay: 0.1
		sketch.image.animate
			properties: {scale: 1}
			time: 0.2
			delay: 0.1

statusBar = new Layer
	parent: screen
	width: 360, height: 24
	backgroundColor: "rgba(255,207,0,1)"