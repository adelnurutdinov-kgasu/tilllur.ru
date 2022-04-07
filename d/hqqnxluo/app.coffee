retina = 1

bg = new Layer width: 320*retina, height: 568*retina, image: "images/bg.png"

screen = new Layer
	width: 320, height: 568

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

prevFontLayer = bg

dragableArea = new Layer height: 256*retina, width: 320*retina, image: "images/photo.jpeg", y: 64*retina

fontTypeAlignment = 0	 # 0 - left, 1 - mid, 2 - right
fontTypeFace = 0 		 # 0 - A, 1 - B, 2 - C

text = new Layer width: 140*retina, height: 94*retina, backgroundColor: "rgba(67,71,237,1)", image: "images/font_n0_a0.png", y: 140*retina, x: 90
text.draggable.enabled = true
text.draggable.overdrag = false
text.draggable.momentum = false
text.draggable.constraints = { x: 0, y: 64*retina, height: 256*retina, width: 320*retina }

leftAlignmentButton = new Layer x: 160*retina, y: 328*retina, image: "images/left_alignment_selected.png", height: 40*retina, width: 40*retina
midAlignmentButton = new Layer x: 210*retina, y: 328*retina, image: "images/mid_alignment.png", height: 40*retina, width: 40*retina
rightAlignmentButton = new Layer x: 260*retina, y: 328*retina, image: "images/right_alignment.png", height: 40*retina, width: 40*retina

scroll = new ScrollComponent width: 320*retina, height: 60*retina, y: 420*retina
scroll.scrollVertical = false
scroll.contentInset = { right: 100*retina, left: 20*retina }


changeFont = () ->
	imageToGet = "font_n" + fontTypeFace + "_a" + fontTypeAlignment
	text.image = "images/" + imageToGet + ".png"
# 	print imageToGet

changeAlignmentButtons = (number) ->
	leftAlignmentButton.image = "images/left_alignment.png"
	midAlignmentButton.image = "images/mid_alignment.png"
	rightAlignmentButton.image = "images/right_alignment.png"
	if number == 0 
		leftAlignmentButton.image = "images/left_alignment_selected.png"
	else if number == 1
		midAlignmentButton.image = "images/mid_alignment_selected.png"
	else 
		rightAlignmentButton.image = "images/right_alignment_selected.png"

changeFontTypeFace = (number) ->
	fontTypeFace = number % 3
	changeFont()

setFontTypSelectionDisabled = (layer) ->
	type = parseInt(layer.name.slice(-1), 10) % 3
	imageAsset = "images/font" + type + ".png"
	layer.image = "" + imageAsset
# 	print imageAsset
	
setFontTypSelectionEnabled = (layer) ->
	type = parseInt(layer.name.slice(-1), 10) % 3
	imageAsset = "images/font" + type + "_selected.png"
	layer.image = "" + imageAsset
# 	print imageAsset


selectFontHandler = (event, layer) ->
	changeFontTypeFace(parseInt(layer.name.slice(-1), 10))
	setFontTypSelectionDisabled(prevFontLayer)
	setFontTypSelectionEnabled(layer)
	prevFontLayer = layer

setPrevFontLayer = (layer) ->
		prevFontLayer = layer	

for number in [0..10]
	generatedLayer = new Layer
		width: 60*retina, height: 60*retina
		superLayer: scroll.content
	
	line = number % 3
	if line == 0 then generatedLayer.image = "images/font0.png"
	else if line == 1 then generatedLayer.image = "images/font1.png"
	else generatedLayer.image = "images/font2.png"
	generatedLayer.x = 82*retina*number
	generatedLayer.name = "font" + number
	generatedLayer.superLayer = scroll.content
	generatedLayer.on(Events.Click, selectFontHandler)
	if number == 0 
		setPrevFontLayer(generatedLayer)
		setFontTypSelectionEnabled(generatedLayer)
	

	
leftAlignmentAction = (event, layer) ->
	fontTypeAlignment = 0
	changeAlignmentButtons(0)
	changeFont()
	
midAlignmentAction = (event, layer) ->
	fontTypeAlignment = 1
	changeAlignmentButtons(1)
	changeFont()
	
rightAlignmentAction = (event, layer) ->
	fontTypeAlignment = 2
	changeAlignmentButtons(2)
	changeFont()

leftAlignmentButton.on(Events.Click, leftAlignmentAction)
midAlignmentButton.on(Events.Click, midAlignmentAction)
rightAlignmentButton.on(Events.Click, rightAlignmentAction)

for item in [bg, dragableArea, text, leftAlignmentButton, midAlignmentButton, rightAlignmentButton, scroll]
	item.parent = screen

for item in ["images/mid_alignment.png", "images/left_alignment.png", "images/right_alignment.png", "images/font0.png", "images/font1.png", "images/font0.png", "images/font_n0_a0.png", "images/font_n0_a1.png", "images/font_n0_a2.png","images/font_n1_a0.png","images/font_n1_a1.png", "images/font_n1_a2.png", "images/font_n2_a0.png","images/font_n2_a1.png", "images/font_n2_a2.png"]
	Framer.Extras.Preloader.addImage(item)