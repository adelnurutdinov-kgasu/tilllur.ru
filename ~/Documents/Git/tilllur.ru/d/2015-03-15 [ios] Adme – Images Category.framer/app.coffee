sketch = Framer.Importer.load "imported/fs-ios-adme-category"

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "dark", forceAndroidBar: true }

created_bar = new Layer
	parent: screen
	originX: 0
	width: 722, y: 483 - 20, height: 104, backgroundColor: "rgba(240,240,240,1)", scale: 1/3

# Fixes

image1 = sketch["image1"]
image2 = sketch["image2"]
image3 = sketch["image3"]
image4 = sketch["image4"]
image5 = sketch["image5"]
image6 = sketch["image6"]
image7 = sketch["image7"]
image8 = sketch["image8"]
image9 = sketch["image9"]
items = sketch["items"]

bigs = sketch["bigs"]
selectedimage = sketch["selectedimage"]

sketch["framer_category_v1"].parent = screen
sketch["framer_category_v1"].scale = 1/3
sketch["framer_category_v1"].originX = 0
sketch["framer_category_v1"].originY = 0

images = [image1, image2, image3, image4, image5, image6, image7, image8, image9]

created_bar.addSubLayer(items)
items.y = 43
created_bar.addSubLayer(selectedimage)
selectedimage.y = 18

created_bar.draggable.speedX = 1
created_bar.draggable.speedY = 0


lastClickX = 0
moving = false

created_bar.on Events.DragStart, ->
# 	created_bar.draggable.speedX = Utils.modulate(created_bar.x, [-200, 0], [0, 1], true)

leftCreatedBarLine = 1087 / 3

created_bar.on Events.DragMove, (eventMove, layerMove) ->
	moving = true
	if created_bar.x > 0
		created_bar.draggable.speedX = Utils.modulate(created_bar.x, [0, 400/3], [1, 0.2], true)
	if created_bar.x < -leftCreatedBarLine
		created_bar.draggable.speedX = Utils.modulate(created_bar.x, [-1320 / 3, -1720/ 3], [1, 0.2], true)
		
			
for image in images
	image.on Events.Click, (event, layer) ->
# 		print layer + " " + clicks
# 		print lastClickX + " : " + layer.x + " and abs is " + Math.abs(lastClickX - layer.x)
		if !moving
			fadeSelectedBar = selectedimage.animate
				properties: 
					x: layer.x + 26
					opacity: 0
				time: 0
# 				time: Math.abs(lastClickX - layer.x)/235 * 0.02
# 				curve: "ease-in-out"
# 				curve: "spring(40, 0, 1)"
			fadeSelectedBar.on 'end', ->
				selectedimage.animate
					properties: {opacity: 1}
					time: 0.2
		
			
		
			name = layer.name
			number = name.slice(-1)
# 			print number
			
			temp = Math.abs(lastClickX - layer.x)/235
			localTiming = 0
			
			if temp > 0.9 and temp < 1.1
				localTiming = 0.4
# 				print "nice"
			bigs.animate
				properties:
					x: 1080 * (number-1) * (-1) - 30 * (number - 1)
				time: localTiming
				
				
			lastClickX = layer.x
# 			print "bigs: " + bigs.x
# 			if number % 2 == 1
# 				big_image.backgroundColor = "blue"
# 			else
# 				big_image.backgroundColor = "green"

			
			
created_bar.on Events.DragEnd, (event, layer) ->
	moving = false		
# 	print "DragEnd: " + created_bar.x
	if created_bar.x > 0
		created_bar.animate
			properties: 
				x: 0
			time: 0.5
	if created_bar.x < -leftCreatedBarLine
		created_bar.animate
			properties: 
				x: -leftCreatedBarLine
			time: 0.5
	created_bar.draggable.speedX = 1

created_bar.bringToFront()

statusBar = new Layer
	parent: screen
	width: 360, height: 24
	backgroundColor: "rgba(255,207,0,1)"