sketch = Framer.Importer.load "imported/fs-ios-adme-post-framer"
# Framer.Shortcuts.initialize(sketch)

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

content.draggable.speedX = 0
content.draggable.speedY = 1
image.originX = 0.5
image.originY = 0
isSharing = false

socials.y = 744
share_start.opacity = 0
share_finish.opacity = 0
darker.opacity = 0
share.image = "images/start.png"

sharings = [facebook, vk, twitter, whatsapp]
for item in sharings
	item.opacity = 0
	item.x = share.x + 10
	item.y = share.y + 10

# content.on Events.DragMove, ->
# 	if content.y > 560
# 		image.scale = Utils.modulate(content.y, [560, 760], [1, 2], true)
# 		content.draggable.speedY = Utils.modulate(content.y, [560, 860], [1, 0.2])

share.on Events.Click, ->
	if !isSharing
		for item in sharings
#  		print item + ": " + item.originalFrame.x + " " + item.originalFrame.y
			item.animate
				properties:
					x: item.originalFrame.x,
					y: item.originalFrame.y,
					opacity: 1
				time: 0.2
				curve: "spring(150, 0, 2)"
		darker.animate
			properties: {opacity: 1}
			time: 0.2
			curve: "linear"
		waitForBiggerShare = share.animate
			properties: {scale: 1.4}
			time: 0.1
		waitForBiggerShare.on 'end', ->
			share.animate
				properties: {scale: 1}
				time: 0.1
		isSharing = true
		share.image = "images/finish.png"
	else
		for item in sharings
			item.animate
				properties:
					x: share.originalFrame.x + 10,
					y: share.originalFrame.y + 10,
					opacity: 0
				time: 0.1
		share.image = "images/start.png"
		darker.opacity = 0
		isSharing = false


content.on Events.TouchMove, ->
	if content.y > 560
		image.scale = Utils.modulate(content.y, [560, 776], [1, 2], true)
		content.draggable.speedY = Utils.modulate(content.y, [560, 860], [1, 0.2])
	else
		image.y = Utils.modulate(content.y, [560, 128], [128, -128])
		
content.on Events.TouchEnd, ->
	content.draggable.speedY = 1
	if content.y > 560
		content.animate
			properties: {y: 560}
			time: 0.2
			delay: 0.1
		image.animate
			properties: {scale: 1}
			time: 0.2
			delay: 0.1


statusBar = new Layer
	parent: screen
	width: 360, height: 24
	backgroundColor: "rgba(255,207,0,1)"