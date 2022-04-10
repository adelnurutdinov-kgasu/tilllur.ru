# This imports all the layers for "fs-ios-trailsee-framer-intersection-history" into fsIosTrailseeFramerIntersectionHistoryLayers
sketch = Framer.Importer.load "imported/fs-ios-trailsee-framer-intersection-history"

colorless = "rgba(0,0,0,0)"
springBase = "spring(500,50,10)"
retina = 1

screen = new Layer
	width: 320, height: 568

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 0, topTheme: "light" }


rootLayer = sketch["fs_ios_trailseeintersection"]
rootLayer.parent = screen
rootLayer.originX = 0
rootLayer.originY = 0
rootLayer.scale = 0.5

statusBar = new Layer
	width: preview.width, height: 20, parent: screen
	backgroundColor: "7E98CB"

filledArray = [sketch.filled1, sketch.filled2, sketch.filled3, sketch.filled4, sketch.filled5, sketch.filled6, sketch.filled7, sketch.filled8]
baseArray = [sketch.round1, sketch.round2, sketch.round3, sketch.round4, sketch.round5, sketch.round6, sketch.round7, sketch.round8]


# OLD PROTOTYPE
sketch.message.opacity = 0
sketch.message.scale = 0.5
# tap_sketch.message.opacity = 0

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

for item in filledArray
	item.opacity = 0
	
# NEW PROTOTYPE
container = new Layer
	width: 0, height: 150 * retina, y: 72*retina, x: 12*retina, backgroundColor: colorless
	parent: screen

intersections = 0
step = 122 * retina

a = new Layer
	backgroundColor: "rgba(0,0,0,0)"
historyLayers = [a]
historyLayers[0].destroy()
a.destroy()

marginSize = 280 * retina


for item in baseArray
	item.on Events.Click, (event, layer) ->
		
		if intersections == 0 
			sketch.new_point.opacity = 0
# 			tap_sketch.message.opacity = 1
		name = layer.name
		number = name.slice(-1)
		
		
		
		grid = new Layer
			width: 116*retina, height: 150*retina, x: step*intersections, backgroundColor: "null", opacity: 0
		grid.image = "images/map-filled" + number + ".png"
		
		deleteMap = new Layer
			width: 36*retina, height: 36*retina, x: 80*retina, opacity: 0
		deleteMap.image = "images/delete.png"
		
		grid.addSubLayer(deleteMap)
		
		timeMap = new Layer
			y: 120*retina, height: 15*retina, backgroundColor: colorless
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
# 		hidebaseArray = rounds.animate
# 			properties: {
# 				opacity: 0.2, 
# # 				scale: 0.8
# 				}
# 			time: 0.2
		showMessage = sketch.message.animate
			properties: {scale: 1.2, opacity: 1}
			time: 0.2
		hideWaiting = sketch.waiting.animate
			properties: {opacity: 0}
			time: 0
			
		showRound.on 'end', ->
			sketch[roundToFill].animate
				properties: {opacity: 0, scale: 0.8}
				time: 0.2
				delay: 1

# 		hidebaseArray.on 'end', ->
# 			rounds.animate
# 				properties: {opacity: 1, scale: 1}
		
		hideWaiting.on 'end', ->
			sketch.waiting.animate
				properties: {opacity: 1}
				time: 0
				delay: 1.2
		
		showMessage.on 'end', ->
			insideShows = sketch.message.animate
				properties: {scale: 1}
				time: 0.2
			insideShows.on 'end', ->
				sketch.message.animate
					properties: {scale: 0.5, opacity: 0}
					time: 0
					delay: 0.8


`window.receiveMessage = function (event) {
	console.log("ok2")
	console.log(event.origin)
}
window.addEventListener("message", receiveMessage, false);
`