Framer.Extras.Hints.disable()
retina = 1

screenView = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(50,50,50,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

isTeasingFonts = true

# General Initialization

screen = new Layer width: 360*retina, height: 640*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(51,51,51,1)"

title_block = new Layer width: 360*retina, height: 170*retina, x: 0*retina, y: 24*retina, image: "images/title block.png"

status_bar = new Layer width: 360*retina, height: 24*retina, x: 0*retina, y: 0*retina, image: "images/status bar.png"




# Fonts: Layers

phoneFonts = new Layer width: 254*retina, height: 439*retina, x: 53*retina, y: 204*retina, image: "images/phone.png", style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(4px*" + retina + ") " + "rgba(0,0,0,0.5))"}

font_base_line = new Layer width: 168*retina, height: 63*retina, x: 96*retina, y: 456*retina, image: "images/font base line.png"

select_item_1 = new Layer width: 24*retina, height: 24*retina, x: 96*retina, y: 456*retina, borderRadius: "100%", backgroundColor: "rgba(238,238,238,1)", borderWidth: 1*retina, borderColor: "rgba(221,221,221,1)"

select_item_2 = new Layer width: 24*retina, height: 24*retina, x: 168*retina, y: 456*retina, borderRadius: "100%", backgroundColor: "rgba(238,238,238,1)", borderWidth: 1*retina, borderColor: "rgba(221,221,221,1)"

select_item_3 = new Layer width: 24*retina, height: 24*retina, x: 240*retina, y: 456*retina, borderRadius: "100%", backgroundColor: "rgba(238,238,238,1)", borderWidth: 1.1*retina, borderColor: "rgba(221,221,221,1)"

text_preview_1 = new Layer
	width: 185*retina
	height: 93*retina
	x: 86*retina
	y: 278*retina
	image: "images/text preview 1.png"

text_preview_2 = new Layer
	width: 168*retina
	height: 103*retina
	x: 86*retina
	y: 277*retina
	image: "images/text preview 2.png"

text_preview_3 = new Layer
	width: 180*retina
	height: 112*retina
	x: 86*retina
	y: 276*retina
	image: "images/text preview 3.png"

textArray = [text_preview_1, text_preview_2, text_preview_3]
for item in textArray
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	item.stateSwitch("hidden")
	
	item.animationOptions =
		time: 0.2
		curve: "ease-in-out"

text_preview_1.stateSwitch("shown")

textLayers = [phoneFonts, font_base_line, select_item_1, select_item_2, select_item_3, text_preview_1, text_preview_2, text_preview_3]

for item in textLayers
	item.parent = screen

# Selected Round Behaviour
selected_font_round = new Layer
	width: 44*retina
	height: 44*retina
	y: 446*retina
	borderRadius: "100%"
	backgroundColor: "rgba(255,221,96,1)"
	borderWidth: 2*retina
	borderColor: "rgba(230,199,87,1)"

selected_font_round.draggable.enabled = true
selected_font_round.draggable.vertical = false
selected_font_round.draggable.overdrag = false
selected_font_round.draggable.momentum = false

selected_font_round.draggable.constraints =
	width: 188*retina
	height: 46*retina
	x: 86*retina
	y: 445*retina
	backgroundColor: "rgba(216,216,216,1)"

selected_font_round.states =
	"small":
		x: 86*retina
	"medium":
		x: 158*retina
	"large":
		x: 230*retina

selected_font_round.stateSwitch("small")

selected_font_round.on Events.StateSwitchEnd, (fromState, toState, event, layer) ->
	localItemIndex = -1
	
	if toState is "small"
		localItemIndex = 0
	else if toState is "medium"
		localItemIndex = 1
	else if toState is "large"
		localItemIndex = 2
	
	if localItemIndex != -1
		for item, i in textArray
			if i == localItemIndex
				textArray[i].animate("shown")
			else textArray[i].animate("hidden")
	

selected_font_round.animationOptions = 
	curve: "spring(200, 20, 10)"

selected_font_round.on Events.TouchStart, (event, layer) ->
	selected_font_round.animateStop()
	isTeasing = false
	selected_font_round.animate(scale: 0.8)

selected_font_round.on Events.DragEnd, (event, layer)->
	selected_font_round.animate(scale: 1)
	
	if layer.x > selected_font_round.states.small.x and layer.x < selected_font_round.states.medium.x
		if layer.draggable.direction is "right" then layer.animate("medium")
		else if layer.draggable.direction is "left" then layer.animate("small")
		else attachToNearestPoint(layer)
	else if layer.x > selected_font_round.states.medium.x and layer.x < selected_font_round.states.large.x
		if layer.draggable.direction is "right" then layer.animate("large")
		else if layer.draggable.direction is "left" then layer.animate("medium")
		else attachToNearestPoint(layer)
	
	
attachToNearestPoint = (layer) ->
	if layer.x < selected_font_round.states.small.x + (selected_font_round.states.medium.x - selected_font_round.states.small.x) / 2
			layer.animate("small")
		else if layer.x > selected_font_round.states.small.x + (selected_font_round.states.medium.x - selected_font_round.states.small.x) / 2 and layer.x < selected_font_round.states.medium.x + (selected_font_round.states.large.x - selected_font_round.states.medium.x) / 2
			layer.animate("medium")
		else layer.animate("large")


for item in [select_item_1, select_item_2, select_item_3]
	item.on Events.Click, (event, layer) ->
		selected_font_round.animateStop()
		isTeasing = false
		
		if layer is select_item_1
			selected_font_round.animate("small")
		else if layer is select_item_2
			selected_font_round.animate("medium")
		else if layer is select_item_3
			selected_font_round.animate("large")

navbar = new Layer width: 360*retina, height: 48*retina, x: 0*retina, y: 592*retina, image: "images/navbar.png"

next_button = new Layer width: 360*retina, height: 56*retina, x: 0*retina, y: 536*retina, image: "images/next button.png"

progress_bar = new Layer
	width: 360*retina
	height: 44*retina
	x: 0*retina
	y: 24*retina
	image: "images/progress bar.png"

selected_font_round.states.tease =
	x: selected_font_round.states.small.x + 24*retina
		
teaseFonts = () ->
	if isTeasingFonts
		selected_font_round.animate("tease")
		Utils.delay 0.6, ->
			if isTeasingFonts
				selected_font_round.animate("small", { curve: "linear", time: 1 })
				Utils.delay 2, ->
					if isTeasingFonts
						teaseFonts()

teaseFonts()

status_bar.opacity = 0
for item in [screen, title_block, status_bar, selected_font_round, navbar, next_button, progress_bar]
	item.parent = screenView