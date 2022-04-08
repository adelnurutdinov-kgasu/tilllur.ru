
sketch = Framer.Importer.load "imported/fs-ios-trailsee-framer-intersection-cut"

screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

filled1 = sketch["filled1"]
filled2 = sketch["filled2"]
filled3 = sketch["filled3"]
filled4 = sketch["filled4"]
filled5 = sketch["filled5"]
filled6 = sketch["filled6"]
filled7 = sketch["filled7"]
filled8 = sketch["filled8"]
round1 = sketch["round1"]
round2 = sketch["round2"]
round3 = sketch["round3"]
round4 = sketch["round4"]
round5 = sketch["round5"]
round6 = sketch["round6"]
round7 = sketch["round7"]
round8 = sketch["round8"]
message = sketch["message"]
rounds = sketch["rounds"]
waiting = sketch["waiting"]

sketch["framer"].parent = screen
sketch["framer"].originX = 0
sketch["framer"].originY = 0
sketch["framer"].scale = 0.5

sketch["status_bar"].image = null

filledrounds = [filled1, filled2, filled3, filled4, filled5, filled6, filled7, filled8]
baserounds = [round1, round2, round3, round4, round5, round6, round7, round8]

message.opacity = 0
message.scale = 0.5

label = new Layer
	backgroundColor: "rgba(0,0,0,0))", y: 1072, x: 390, width: 200
label.html = "0"
label.style = {
		"text-align" : "right",
		"font-family" : "HelveticaNeue",
		"font-size" : "28px",
		"color" : "#DDDDDD",
		"line-height" : "34px"
	}

counter = 0

for item in filledrounds
	item.opacity = 0

for item in baserounds
	item.on Events.Click, (event, layer) ->
		counter++
		label.html = counter
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
		hideBaseRounds = rounds.animate
			properties: {opacity: 0.2, scale: 0.8}
			time: 0.2
		showMessage = message.animate
			properties: {scale: 1.2, opacity: 1}
			time: 0.2
		hideWaiting = waiting.animate
			properties: {opacity: 0}
			time: 0
			
		showRound.on 'end', ->
			sketch[roundToFill].animate
				properties: {opacity: 0, scale: 0.8}
				time: 0.3
				delay: 1
# 			sketch[name].animate
# 				properties: {opacity: 1}
# 				time: 0.2
# 				delay: 1.2
# 			rounds.animate
# 				properties: {opacity: 1}
# 				time: 0.2

		hideBaseRounds.on 'end', ->
			rounds.animate
				properties: {opacity: 1, scale: 1}
		
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
				
	
