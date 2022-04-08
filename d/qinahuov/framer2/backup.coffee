# This imports all the layers for "fs-ios-adme-pull-to-refresh" into fsIosAdmePullToRefreshLayers
# Framer.Device.contentScale = 0.595
sketch = Framer.Importer.load "imported/fs-ios-adme-pull-to-refresh"
Framer.Shortcuts.initialize(sketch)

# Animation Timing
MaterialCurve = "cubic-bezier(0.2, 0, 0.1, 1)"
MaterialTime = "0.6"

leaves = [leave1, leave2, leave3, leave4, leave5, leave6, leave7]

Framer.Defaults.Animation = 
	curve: MaterialCurve
	time: MaterialTime
	
content.draggable.speedX = 0
content.draggable.speedY = 1
spinner.opacity = 0

magic = 105 # add space to see progress of the leaves
minPoint = 166
maxPoint = 360*2 # 412*2
step = (maxPoint-minPoint-magic)/leaves.length #94

dragStartingPoint = minPoint
dragEndingPoint = maxPoint
values = [dragStartingPoint, dragEndingPoint]

content.on Events.DragMove, ->
	content.draggable.speedY = Utils.modulate(content.y, values, [0.8, 0.6], true)
	
	number = 0
	for item in leaves
		item.opacity = Utils.modulate(content.y, [minPoint + magic + number * step, minPoint + magic + (number + 1) * step], [0, 1])
		number++
	

content.on Events.DragEnd, ->
	content.draggable.speedY = 1
	if content.y < maxPoint
		content.animate
			properties: {y: content.originalFrame.y}
			time: 1
	else
		spinner.opacity = 1
		container.opacity = 0
		symbol.opacity = 0
		
		returnContent = content.animate
			properties: {y: maxPoint}
			time: 0.5
		returnContent.on 'end', ->
			spinner.animate { properties: {opacity: 0}, time: 0, delay: 2.5}
			symbol.animate { properties: {opacity: 1}, time: 0, delay: 3}
			container.animate { properties: {opacity: 1}, time: 0, delay: 3}
			content.animate { properties: {y: content.originalFrame.y}, time: 0.5, delay: 2.5}
	



		

spin = (item) ->
	item.animate
		properties:
			rotation: -360
		time: .8
		curve: MaterialCurve
	Utils.delay .8, ->
		item.rotation = 0
		spin(item)

spin(spinner)