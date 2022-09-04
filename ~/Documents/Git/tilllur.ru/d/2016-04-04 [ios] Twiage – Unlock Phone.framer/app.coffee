retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }



bg = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, image: "images/bg.png"


circle_9 = new Layer width: 75*retina, height: 75*retina, x: 253*retina, y: 384*retina, image: "images/circle 9.png"

circle_8 = new Layer width: 75*retina, height: 75*retina, x: 150*retina, y: 384*retina, image: "images/circle 8.png"

circle_7 = new Layer width: 75*retina, height: 75*retina, x: 47*retina, y: 384*retina, image: "images/circle 7.png"

circle_6 = new Layer width: 75*retina, height: 75*retina, x: 253*retina, y: 294*retina, image: "images/circle 6.png"

circle_5 = new Layer width: 75*retina, height: 75*retina, x: 150*retina, y: 294*retina, image: "images/circle 5.png"

circle_4 = new Layer width: 75*retina, height: 75*retina, x: 47*retina, y: 294*retina, image: "images/circle 4.png"

circle_3 = new Layer width: 75*retina, height: 75*retina, x: 253*retina, y: 204*retina, image: "images/circle 3.png"

circle_2 = new Layer width: 75*retina, height: 75*retina, x: 151*retina, y: 204*retina, image: "images/circle 2.png"

circle_1 = new Layer width: 75*retina, height: 75*retina, x: 47*retina, y: 204*retina, image: "images/circle 1.png"

circle_0 = new Layer width: 75*retina, height: 75*retina, x: 150*retina, y: 474*retina, image: "images/circle 0.png"

code_preview = new Layer width: 256*retina, height: 54*retina, x: 60*retina, y: 120*retina, borderRadius: 6*retina, backgroundColor: "rgba(255,255,255,1)", borderWidth: 2*retina, borderColor: "rgba(0,122,255,1)"

base_numbers = new Layer width: 182*retina, height: 8*retina, x: 37*retina, y: 23*retina, image: "images/base numbers.png", superLayer: code_preview

point_1 = new Layer width: 18*retina, height: 18*retina, x: 32*retina, y: 18*retina, borderRadius: "100%", backgroundColor: "rgba(0,122,255,1)", superLayer: code_preview

point_2 = new Layer width: 18*retina, height: 18*retina, x: 90*retina, y: 18*retina, borderRadius: "100%", backgroundColor: "rgba(0,122,255,1)", superLayer: code_preview

point_3 = new Layer width: 18*retina, height: 18*retina, x: 148*retina, y: 18*retina, borderRadius: "100%", backgroundColor: "rgba(0,122,255,1)", superLayer: code_preview

point_4 = new Layer width: 18*retina, height: 18*retina, x: 206*retina, y: 18*retina, borderRadius: "100%", backgroundColor: "rgba(0,122,255,1)", superLayer: code_preview



buttons = [circle_0, circle_1, circle_2, circle_3, circle_4, circle_5, circle_6, circle_7, circle_8, circle_9]
points = [point_1, point_2, point_3, point_4]
baseImage = []
hoverImage = []

pointsSelected = -1
baseX = code_preview.x

for item in buttons
	basePath = item.image
	baseImage.push(basePath)
	
	newPath = basePath.replace('images/circle ','')
	newPath = newPath.replace('.png','')
	hoverImage.push("images/circle " + newPath + " pressed.png")
	
	item.name = newPath


cleanPoints = () ->
	pointsSelected = -1
	
	code_preview.animate { properties: {x: baseX - 40}, time: 0.1}
	Utils.delay 0.1, ->
		code_preview.animate { properties: {x: baseX + 40}, time: 0.1}
	Utils.delay 0.2, ->
		code_preview.animate { properties: {x: baseX - 20}, time: 0.1}
	Utils.delay 0.3, ->
		code_preview.animate { properties: {x: baseX + 20}, time: 0.1}
	Utils.delay 0.4, ->
		code_preview.animate { properties: {x: baseX - 10}, time: 0.1}
	
	Utils.delay 0.5, ->
		code_preview.x = baseX
		pointsSelected = -1
		for item in points
			item.opacity = 0

animatePress = (circle) ->
	circle.on Events.TapStart, ->
		circle.image = hoverImage[circle.name]
		pointsSelected++
		if pointsSelected < 4
			points[pointsSelected].opacity = 1
		if pointsSelected >= 3
			cleanPoints()

returnAnimatePress = (circle) ->
	circle.on Events.TapEnd, ->
		Utils.delay 0.1, ->
			circle.image = baseImage[circle.name]

for item in buttons
	animatePress(item)
	returnAnimatePress(item)
	
for item in points
	item.opacity = 0


bg.parent = screen
for item in buttons
	item.parent = screen
code_preview.parent = screen