
document.body.style.cursor = "auto"
Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer 
	width: 1366
	height: 768
	backgroundColor: "F4F2F0"
	image: "images/screen.png"

new Preview { view: screen, borderRadius: 8, visible: false }


# Layers


heart01 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart01.png"

heart02 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart02.png"

heart03 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart03.png"

heart04 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart04.png"

heart05 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart05.png"

heart06 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart06.png"

heart07 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart07.png"

heart08 = new Layer
	width: 21.0
	height: 21.0
	image: "images/heart08.png"


fixView = new Layer
	parent: screen
	size: 21
	x: Align.right(-624)
	y: Align.top(220)
	backgroundColor: "white"

imageParentView = new Layer
	parent: screen
	size: 21
	x: Align.right(-624)
	y: Align.top(220)
	backgroundColor: null



hearts = [heart01, heart02, heart03, heart04, heart05, heart06, heart07, heart08]
for item in hearts
	item.parent = imageParentView
	item.opacity = 0
	Framer.Extras.Preloader.addImage(item.image)

imageParentView.image = heart07.image

controllView = new Layer
	parent: screen
	size: 80
	x: Align.center(50)
	y: Align.top(190)
	backgroundColor: null


nextImage = (prevImage) ->
	currentImage = Utils.randomChoice(hearts).image
	# print prevImage + " | " + currentImage
	if prevImage == currentImage then return nextImage(currentImage)
	return currentImage

distanceBetween = (point1, point2) ->
	pX = point1.x - point2.x
	pY = point1.y - point2.y
	return Math.abs(Math.sqrt(pX*pX + pY*pY))


changeStarted = true

# controllView.on Events.MouseStart, (event, layer) ->
	# changeStarted = true

controllView.on Events.MouseOut, (event, layer) ->
	changeStarted = true
	# print "?"

controllView.on Events.MouseMove, (event, layer) ->
	dX = distanceBetween(event.point, {x: 40, y: 40 })
	imageParentView.scale = Utils.modulate(dX, [50, 0], [1.0, 1.3], true)
	
	# print dX

	if dX < 12 and changeStarted
		changeStarted = false
		imageParentView.image = nextImage(imageParentView.image)
	
	if dX > 12
		changeStarted = true

	