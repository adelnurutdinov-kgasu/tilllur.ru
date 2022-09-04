# This imports all the layers for "fs-ios-trailsee-framer-intersection-history" into fsIosTrailseeFramerIntersectionHistoryLayers
sketch = Framer.Importer.load "imported/fs-ios-trailsee-framer-intersection-history"
Framer.Shortcuts.initialize(sketch)

colorless = "rgba(0,0,0,0)"
springBase = "spring(50,0,0)"
retina = 2

filledrounds = [filled1, filled2, filled3, filled4, filled5, filled6, filled7, filled8]
baserounds = [round1, round2, round3, round4, round5, round6, round7, round8]


# OLD PROTOTYPE
message.opacity = 0
message.scale = 0.5
# tap_message.opacity = 0

# label = new Layer
# 	backgroundColor: "rgba(0,0,0,0))", y: 1072, x: 390, width: 200
# label.html = "0"
# label.style = {
#     	"text-align" : "right",
# 		"font-family" : "HelveticaNeue",
# 		"font-size" : "28px",
# 		"color" : "#DDDDDD",
# 		"line-height" : "34px"
# 	}

counter = 0

for item in filledrounds
	item.opacity = 0
	
# NEW PROTOTYPE
container = new Layer
	width: 0, height: 150 * retina, y: 72*retina, x: 12*retina, backgroundColor: colorless

intersections = 0
step = 122 * retina

a = new Layer
	backgroundColor: "rgba(0,0,0,0)"
historyLayers = [a]
historyLayers[0].destroy
a.destroy

marginSize = 280 * retina


for item in baserounds
	item.on Events.Click, (event, layer) ->
		
		if intersections == 0 
			new_point.opacity = 0
# 			tap_message.opacity = 1
		name = layer.name
		number = name.slice(-1)
		
		
		
		grid = new Layer
			width: 116*retina, height: 150*retina, x: step*intersections, backgroundColor: "green", opacity: 0
		grid.image = "images/map-filled" + number + ".png"
		
		deleteMap = new Layer
			width: 72, height: 72, x: 80*retina, opacity: 0
		deleteMap.image = "images/delete.png"
		
		grid.addSubLayer(deleteMap)
		
		timeMap = new Layer
			y: 240, height: 30, backgroundColor: colorless
		timeMap.html = "22:0" + intersections
		if intersections > 9
			timeMap.html = "22:" + intersections
		timeMap.style = {
			"font-family" : "HelveticaNeue",
			"font-size" : "24px",
			"color" : "#999999",
			"line-height" : "29px"
		}
		grid.addSubLayer(timeMap)
		
		grid.opacity = 0
		grid.scale = 0.8
		deleteMap.opacity = 0
		deleteMap.scale = 0
		
		grid.animate
			properties: {opacity: 1, scale: 1}
			time: 0.2
			delay: 0.2
			
		deleteMap.animate
			properties: {opacity: 1, scale: 1}
			time: 0.2
			delay: 0.2
# 		layerNew = new Layer
# 			width: 38 * retina, height: 38 * retina, x: step*intersections, backgroundColor: "red", opacity: 0
# 		layerNew.image = "images/filled" + number + ".png"
			
		
		historyLayers[intersections] = grid
		container.width = container.width + step
		container.addSubLayer(historyLayers[intersections])
		intersections++
		
		if container.width > marginSize
			container.animate
				properties:
					x: marginSize - container.width
				time: 0.5
				delay: 0.2
				curve: springBase
		
		
# 		for historyItem in historyLayers
# 			historyItem.on Events.Click, (event_inside, layer_inside) ->
# 				findLayersVariable = 0
# 				print "Magic " + historyLayers.indexOf(historyItem)
# 				
# 				historyAnimation = historyItem.animate
# 					properties: {scale: 1.3}
# 					time: 0.2
# 				historyAnimation.on 'end', ->
# 					historyItem.animate
# 						properties: {scale: 1}
# 						time: 0.2
# 						delay: 0.2
# 				
# 				for i in historyLayers
# 					if historyLayers[findLayersVariable].x == historyItem.x
# 						historyLayers
# 					print historyLayers[findLayersVariable]
# 					findLayersVariable++
					
						
		
# 		POSITION
		
		counter++
# 		label.html = counter
		name = layer.name
		number = name.slice(-1)
		roundToFill = "filled"
		roundToFill += number
# 		sketch[name].animate
# 			properties: {opacity: 0}
# 			time: 0
		showRound = sketch[roundToFill].animate
			properties: {opacity: 1, scale: 1.2}
			time: 0
# 		hideBaseRounds = rounds.animate
# 			properties: {
# 				opacity: 0.2, 
# # 				scale: 0.8
# 				}
# 			time: 0.2
		showMessage = message.animate
			properties: {scale: 1.2, opacity: 1}
			time: 0.2
		hideWaiting = waiting.animate
			properties: {opacity: 0}
			time: 0
			
		showRound.on 'end', ->
			sketch[roundToFill].animate
				properties: {opacity: 0, scale: 0.8}
				time: 0.2
				delay: 1

# 		hideBaseRounds.on 'end', ->
# 			rounds.animate
# 				properties: {opacity: 1, scale: 1}
		
		hideWaiting.on 'end', ->
			waiting.animate
				properties: {opacity: 1}
				time: 0
				delay: 1.2
		
		showMessage.on 'end', ->
			insideShowMessage = message.animate
				properties: {scale: 1}
				time: 0.2
			insideShowMessage.on 'end', ->
				message.animate
					properties: {scale: 0.5, opacity: 0}
					time: 0
					delay: 0.8