retina = 1

screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


# SCREENS BLOCKS 
screenBlockWelcome = new Layer width: 320*retina, height: 568*retina
screenBlockWelcome.states.add {
	active: {x: 0}
	screenBlockShareOn: {x: -320 * retina}
}
screenBlockWelcome.states.switchInstant "active"

screenBlockShare = new Layer width: 320*retina, height: 568*retina
screenBlockShare.states.add {
	active: {x: 0}
	screenBlockWelcomeOn: {x: 320 * retina}
}
screenBlockShare.states.switchInstant "screenBlockWelcomeOn"





# SCREEN WELCOME
splash = new Layer width: 320*retina, height: 568*retina, image: "images/splash.png"

checkStatsButton = new Layer width: 320*retina, height: 44*retina, image: "images/text.png", y: 510*retina
checkStatsButton.states.add {
	initial: {opacity: 0}
	ready: {opacity: 1}
	final: {opacity: 0}
}
checkStatsButton.states.switchInstant("initial")

round = new Layer width: 80*retina, height: 80*retina, image: "images/round_bg.png"
round.states.add {
	initial: {x: 120*retina, y: 427*retina, opacity: 0, scale: 0.6}
	ready: {x: 120*retina, y: 427*retina, opacity: 1, scale: 1}
	bigger: {width: 356*retina, height: 356*retina, x: -20*retina, y: 100*retina, opacity: 1}
	final: {width: 700*retina, height: 700*retina, x: -200*retina, y: -80*retina}
}
round.states.switchInstant("initial")

days = new Layer width: 240*retina, height: 240*retina, image: "images/days.png", x: 40*retina, y: 200*retina
days.states.add {
	initial: {opacity: 0, scale: 0.8}
	bigger: {opacity: 1, scale: 1}
	final: {opacity: 0, scale: 0.5}
}
days.states.switchInstant "initial"

sober1 = new Layer width: 240*retina, height: 32*retina, image: "images/sober1.png", x: 40*retina
sober2 = new Layer width: 240*retina, height: 120*retina, image: "images/sober2.png", x: 40*retina
sober3 = new Layer width: 240*retina, height: 32*retina, image: "images/sober3.png", x: 40*retina

sobers = [sober1, sober2, sober3]
count = -1
soberPositions = [170, 202, 322]
for item in sobers
	count++
	item.states.add {
		initial: {y: soberPositions[count]*retina - (3-count)*40*retina, opacity: 0}
		show: {y: soberPositions[count]*retina, opacity: 1}
		hide: {opacity: 0}
	}
	item.states.switchInstant "initial"
	
shareButton = new Layer width: 240*retina, height: 44*retina, image: "images/share.png", y: 484*retina, x: 40*retina
shareButton.states.add {
	initial: {opacity: 0, scale: 0.8}
	show: {opacity: 1, scale: 1}
}
shareButton.states.switchInstant "initial"


feelSameButton = new Layer width: 240*retina, height: 44*retina, image: "images/feelsame.png", y: 500*retina, x: 40*retina
feelSameButton.states.add {
	initial: {opacity: 0}
	show: {opacity: 1}
	hide: {opacity: 0}
}
feelSameButton.states.switchInstant "initial"

message1 = new Layer width: 240*retina, height: 360*retina, image: "images/message1.png", y: 120*retina, x: 40*retina
message1.states.add {
	initial: {opacity: 0}
	show: {opacity: 1}
	hide: {opacity: 0}
}
message1.states.switchInstant "initial"

navBarFeelingButton = new Layer width: 320*retina, height: 64*retina, image: "images/navbarfeelings.png"
navBarFeelingButton.states.add {
	initial: {opacity: 0}
	show: {opacity: 1}
	hide: {opacity: 0}
}
navBarFeelingButton.states.switchInstant "initial"


checkButton = new Layer width: 240*retina, height: 44*retina, image: "images/checkfeelings.png", y: 30*retina, x: 40*retina
checkButton.states.add {
	initial: {opacity: 0}
	show: {opacity: 1}
	hide: {opacity: 0}
}
checkButton.states.switchInstant "initial"



screenBlockWelcomeLayers = [splash, checkStatsButton, round, days, sober1, sober2, sober3, shareButton, feelSameButton, message1, navBarFeelingButton, checkButton]
for item in screenBlockWelcomeLayers
	screenBlockWelcome.addSubLayer(item)






# SCREEN BLOCK SHARE

bg = new Layer width: 320*retina, height: 568*retina, image: "images/bg.png"

prevFontLayer = bg

dragableArea = new Layer height: 256*retina, width: 320*retina, image: "images/photo.jpeg", y: 64*retina

fontTypeAlignment = 0	 # 0 - left, 1 - mid, 2 - right
fontTypeFace = 0 		 # 0 - A, 1 - B, 2 - C

text = new Layer width: 140*retina, height: 94*retina, backgroundColor: "#F90517", image: "images/font_n0_a0.png", y: 64*retina
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

backToStatsButton = new Layer width: 100*retina, height: 64*retina, image: "images/backtostats.png"
shareCompleteButton = new Layer width: 100*retina, height: 64*retina, image: "images/sharecomplete.png", x: 220*retina
facebook = new Layer width: 320*retina, height: 568*retina, image: "images/facebook.png", opacity: 0

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
	generatedLayer = new Layer width: 60*retina, height: 60*retina, superLayer: scroll.content
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


# new Layer image: "images/mid_alignment.png", opacity: 0
# new Layer image: "images/left_alignment.png", opacity: 0
# new Layer image: "images/right_alignment.png", opacity: 0
# for item in [0..2]
# 	new Layer image: "images/font" + item + ".png", opacity: 0
# 	for nextItem in [0..2]
# 		new Layer image: "images/font_n" + item + "_a" + nextItem + ".png", opacity: 0


screenBlockShareLayers = [bg, dragableArea, text, leftAlignmentButton, midAlignmentButton, rightAlignmentButton, scroll, backToStatsButton, shareCompleteButton, facebook]
for item in screenBlockShareLayers
	screenBlockShare.addSubLayer(item)











# START OF THE ACTION
Utils.delay 1, ->
	round.states.switch "ready", {curve: "spring(300,10,10)"}
	checkStatsButton.states.switch "ready"
			
roundAnimationHandler = (event, layer) ->
	round.states.switch "bigger", {curve: "spring(100,10,4)"}
	days.states.switch "bigger", {curve: "spring(100,10,4)"}
	checkStatsButton.states.switch "final"
	round.off(Events.Click, roundAnimationHandler)
	continueRoundAnimation(2)
	
checkButtonHandler = (event, layer) ->
	checkButton.off(Events.Click, checkButtonHandler)
	round.states.switch "bigger", {curve: "spring(100,10,4)"}
	for item in sobers
		item.states.switchInstant "initial"
# 		Utils.delay 1, ->
# 			item.states.switchInstant "initial"
	feelSameButton.states.switch "show", {curve: "spring(100,10,4)"}
	navBarFeelingButton.states.switch "show"
	Utils.delay 0.5, ->
		message1.states.switch "show"
		Utils.delay 1, ->
			navBarFeelingButton.on(Events.Click, navBarFeelingButtonHandler)
	
	
navBarFeelingButtonHandler = (event, layer) ->
	navBarFeelingButton.states.switchInstant "hide"
	navBarFeelingButton.off(Events.Click, navBarFeelingButtonHandler)
	event.stopPropagation()
# 	navBarFeelingButton.destroy()
	message1.states.switchInstant "hide"
	feelSameButton.states.switch "hide"
	round.states.switch "final", {curve: "spring(100,10,4)"}
	for item in sobers
		item.states.switch "show", {time: 1}
	Utils.delay 1, ->
		checkButton.on(Events.Click, checkButtonHandler)
	
	
continueRoundAnimation = (time) ->
	Utils.delay time, ->
		round.states.switch "final", {curve: "spring(100,10,4)"}
		days.states.switch "final", {time: 0.4}
# 		round.off(Events.Click)
		for item in sobers
			item.states.switch "show"
		Utils.delay 1, ->
			shareButton.states.switch "show", {curve: "spring(100,10,4)"}
			checkButton.states.switch "show"
			Utils.delay 1, ->
				checkButton.on(Events.Click, checkButtonHandler)
				shareButton.on(Events.Click, shareImageButtonHandler)
	
shareImageButtonHandler = (event, layer) ->
# 	shareButton.off(Events.Click, shareImageButtonHandler)
	screenBlockWelcome.states.switch "screenBlockShareOn"
	screenBlockShare.states.switch "active"
	
backToStatsButtonHandler = (event, layer) ->
	screenBlockShare.states.switch "screenBlockWelcomeOn"
	screenBlockWelcome.states.switch "active"
	
shareCompleteButtonHandler = (event, layer) ->
	facebook.opacity = 1
	Utils.delay 2, ->
		screenBlockShare.states.switch "screenBlockWelcomeOn"
		screenBlockWelcome.states.switch "active"
		Utils.delay 1, ->
			facebook.opacity = 0
	
round.on(Events.Click, roundAnimationHandler)

backToStatsButton.on(Events.Click, backToStatsButtonHandler)
shareCompleteButton.on(Events.Click, shareCompleteButtonHandler)

for item in [screenBlockWelcome, screenBlockShare]
	item.parent = screen