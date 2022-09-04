
main_bg = new Layer
	width: 320, height: 568, backgroundColor: "#BB133E"

sketch = Framer.Importer.load "imported/fs-ios-promo-pull-to-refresh-fcrk"

param = 0

content = sketch["content"]
letterf = sketch["letterf"]
letterc = sketch["letterc"]
letterr = sketch["letterr"]
letterk = sketch["letterk"]
ball = sketch["ball"]

sketch["main_pulled"].parent = main_bg
sketch["main_pulled"].originX = 0
sketch["main_pulled"].originY = 0
sketch["main_pulled"].scale = 0.5

{ Preview } = require "PreviewComponent"
new Preview { view: main_bg, borderRadius: 16, topTheme: "light" }

content.y = 128 + param
letters = [letterf, letterc, letterr, letterk]
for item in letters
	item.scale = 0.5
	item.opacity = 0
ball.opacity = 0
ball.scale = 0.5

content.draggable.speedX = 0
content.draggable.speedY = 0.8

startScroll = 128 + param
endScroll = 200
refreshing = false


content.on Events.DragMove, ->
	if !refreshing
		content.draggable.speedY = Utils.modulate(content.y, [startScroll, 720 + param], [0.8, 0])
		for i in [0..3]
			letters[i].scale = Utils.modulate(content.y, [startScroll + (endScroll/4 * i), startScroll + endScroll/4 * (i + 1)], [0.5, 1], true)
			letters[i].opacity = Utils.modulate(content.y, [startScroll + (endScroll/4 * i) + 20, startScroll + (endScroll/4 * (i + 1)) + 20], [0, 0.8], true)
		
	if content.y > 360 + param
		refreshing = true
		ball.animate
			properties: {opacity: 1}
			time: 0.2
			curve: "spring(300, 50, 0)"
		ball.animate
			properties: {scale: 1}
			time: 1
			curve: "spring(300, 50, 10)"
		for item in letters
			item.animate
				properties: {opacity: 0, scale: 1.5}
				time: 0.2


content.on Events.DragEnd, ->
	if !refreshing
		content.animate
			properties: {y: 128 + param}
			time: 0.2
			delay: 0.2
			curve: "spring(50, 20, 8)"
# 		for item in letters
# 			item.animate
# 				properties: {opacity: 0}
# 				time: 0.2
# 				delay: 0.2
	else
		for item in letters
			item.animate
				properties: {opacity: 0}
				time: 0
		refreshingPositionAnimation = content.animate {
			properties: {y: 300}
			time: 0.2
			curve: "ease-in"
		}
		refreshingPositionAnimation.on 'end', ->
			content.animate
				properties: {y: 128 + param}
				time: 0.2
				delay: 1.4
				curve: "spring(50, 8, 0)"
			ballToMinAnimation = ball.animate
				properties: {opacity: 0}
				time: 0.1
				delay: 1.4
			

			ballToMinAnimation.on 'end', ->
				refreshing = false
				ball.scale = 0.5
			

			
spin = () ->
	ball.rotation = 0
	ball.animate
		properties:
			rotation: 1080
		time: 2
		curve: "linear"
	Utils.delay 2, ->
		spin()

spin()

statusBar = new Layer
	width: main_bg.width, height: 20, parent: main_bg, backgroundColor: "AA2941"