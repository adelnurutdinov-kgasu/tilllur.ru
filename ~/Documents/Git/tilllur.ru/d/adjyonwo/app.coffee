# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Timur Nurutdinov"
	twitter: ""
	description: ""


retina = 1

screen = new Layer
	width: 360, height: 640, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

opacityTime = 0.1
imageChangeDelay = 2

screen_bg = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(240,240,240,1)"





# Content
content_slide_3 = new Layer
	width: 340*retina
	height: 200*retina
	x: 10*retina
	image: "images/content slide 3.png"

content_slide_3.states =
	step_2:
		y: 337*retina
	step_3:
		y: 147*retina

content_slide_3.stateSwitch("step_2")



phone_shape = new Layer
	backgroundColor: "rgba(31,31,31,1)"
	shadowColor: "rgba(0,0,0,0.5)"
	width: 320*retina
	height: 360*retina
	x: 20*retina
	y: 63*retina
	borderRadius: 12*retina
	shadowY: 10*retina
	shadowBlur: 10*retina

phone_shape.states =
	step_1:
		scale: 1
		x: 20*retina
		y: 63*retina
	step_2:
		scale: 1
		x: 20*retina
		y: 63*retina
	step_3:
		scale: 0.5
		x: 70*retina
		y: 110*retina

phone_shape.stateSwitch("step_1")
phone_shape.on Events.StateSwitchStart, (fromState, toState) ->
	if toState != "step_2"
		zenView.animate("hidden")

phone_shape.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "step_2"
		zenView.animate("shown", delay: 0.2)



phone_image = new Layer
	backgroundColor: "transparent"
	width: 304*retina
	height: 260*retina
	x: 28*retina
	y: 109*retina

phone_image.states =
	step_1:
		scale: 1
		x: 28*retina
		y: 109*retina
	step_2:
		scale: 1
		x: 28*retina
		y: 109*retina
	step_3:
		scale: 0.5
		x: 78*retina
		y: 160*retina

phone_image.stateSwitch("step_1")

imageView = new Layer
	image: "images/phone image 1.png"
	width: 304*retina
	height: 260*retina
	parent: phone_image

imageView.states =
	"image 1": { image: "images/phone image 1.png" }
	"image 2": { image: "images/phone image 2.png" }
	"image 3": { image: "images/phone image 3.png" }
	"image 4": { image: "images/phone image 4.png" }
	
isCurrentBgChosen = false
imageView.on Events.StateSwitchEnd, (fromState, toState) ->
	Utils.delay 1, ->
		if !isCurrentBgChosen
			imageView.states.next()

imageView.stateSwitch("image 1")

# currentBgNumber = 1
# isCurrentBgChosen = false
# changeBg = () ->
# 	if !isCurrentBgChosen
# 		if currentBgNumber < 1 or currentBgNumber > 3
# 			currentBgNumber = 1
# 		phone_image.image = "images/phone image #{currentBgNumber}.png"
# 		currentBgNumber++
# 	
# Utils.interval imageChangeDelay, ->
# 	changeBg()


content_slide_1 = new Layer
	width: 254*retina
	height: 120*retina
	x: 56*retina
	y: 159*retina
	image: "images/content slide 1.png"

content_slide_1.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

content_slide_1.states.animationOptions =
	time: 0.2


zenView = new Layer
	width: 304*retina
	height: 218*retina
	x: 28*retina
	y: 109*retina
# 	parent: phone_image
	clip: true
	backgroundColor: "transparent"

zenView.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

zenView.states.animationOptions =
	time: 0.2
zenView.stateSwitch("hidden")

zenView.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "shown"
		content_slide_2.stateSwitch("start")
	else
		content_slide_2.animate("pause")

	
content_slide_2 = new Layer
	width: 280*retina
	height: 400*retina
	x: 12*retina
	y: 14*retina
	parent: zenView
	image: "images/content slide 2.png"

content_slide_2.states =
	start:
		y: 12*retina
	finish:
		y: -126*retina
	pause:
		y: 12*retina

content_slide_2.states.animationOptions =
	curve: "ease-in-out"
	time: 0.8
content_slide_2.stateSwitch("pause")

content_slide_2.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "finish"
		content_slide_2.stateSwitch("start", delay: 0.1)
	else if toState is "start"
		content_slide_2.animate("finish", delay: 1)
	

syncView = new Layer
	width: 60*retina
	height: 64*retina
	x: 152*retina
	y: 47*retina
	backgroundColor: "transparent"

syncView.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

syncView.stateSwitch("hidden")
syncView.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "shown"
		sync_shape.stateSwitch("start")
	else
		sync_shape.stateSwitch("finish")


sync_shape = new Layer
	width: 60*retina
	height: 64*retina
	image: "images/sync shape.png"
	parent: syncView

sync_shape.states =
	"start": { rotation: 0 }
	"finish": { rotation: -360 }
	"pause": { rotation: 0 }

sync_shape.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "finish"
		sync_shape.stateSwitch("start")
	else if toState is "start"
		sync_shape.animate("finish", time: 2, curve: "linear")

# sync_shape.stateSwitch("start")

# Onboard Top Pannel

onboard_bg = new Layer
	width: 360*retina
	height: 265*retina
	x: 0*retina
	y: 327*retina
	backgroundColor: "rgba(44,44,44,1)"
	shadowBlur: 4*retina
	shadowColor: "rgba(0,0,0,0.4)"

progress_base = new Layer
	width: 80*retina
	height: 16*retina
	x: 140*retina
	y: 352*retina
	image: "images/progress base.png"

selected_step = new Layer
	width: 16*retina
	height: 16*retina
	y: 352*retina
	borderRadius: "100%"
	backgroundColor: "rgba(255,255,255,1)"

selected_step.states =
	step_1:
		x: 140*retina
	step_2:
		x: 172*retina
	step_3:
		x: 203*retina

selected_step.stateSwitch("step_1")

prev_step_button = new Layer
	width: 17*retina
	height: 16*retina
	x: 19*retina
	y: 351*retina
	image: "images/prev step button.png"
	opacity: 0.5

prev_step_button.states =
	shown: { opacity: 0.5 }
	hidden: { opacity: 0 }
prev_step_button.stateSwitch("hidden")
prev_step_button.states.animationOptions =
	time: opacityTime

prev_step_button.on Events.Click, ->
	plateView.snapToNextPage("left", true, { curve: "spring(100, 20, 0)"})


next_step_button = new Layer
	width: 17*retina
	height: 16*retina
	x: 324*retina
	y: 351*retina
	image: "images/next step button.png"
	opacity: 0.5

next_step_button.states =
	shown: { opacity: 0.5 }
	hidden: { opacity: 0 }
	
next_step_button.states.animationOptions =
	time: opacityTime

next_step_button.on Events.Click, ->
	plateView.snapToNextPage("right", true, { curve: "spring(100, 20, 0)"})

complete_button = new Layer
	width: 88*retina
	height: 12*retina
	x: 255*retina
	y: 353*retina
	image: "images/complete button.png"
	
complete_button.states =
	shown: { opacity: 0.5 }
	hidden: { opacity: 0 }

complete_button.stateSwitch("hidden")
complete_button.states.animationOptions =
	time: opacityTime

# Plate View

plateView = new PageComponent
	width: 360*retina
	height: 200*retina
	y: 392*retina
	scrollVertical: false
	backgroundColor: "#2B2B2B"

slide_1 = new Layer
	width: 360*retina
	height: 200*retina
	x: 0
	image: "images/slide 1.png"
	parent: plateView.content
	name: "slide_1"

slide_2 = new Layer
	width: 360*retina
	height: 200*retina
	x: 360*retina
	image: "images/slide 2.png"
	parent: plateView.content
	name: "slide_2"

slide_3 = new Layer
	width: 360*retina
	height: 200*retina
	x: 360*retina*2
	image: "images/slide 3.png"
	parent: plateView.content
	name: "slide_3"

# plateView.on Events.Move, ->
# 	closestPage = plateView.closestPage.name
# 	if closestPage is "slide_1"
# 		changeStepToOne()
# 		
# 	else if closestPage is "slide_2"
# 		changeStepToTwo()
# 		
# 	else if closestPage is "slide_3"
# 		changeStepToThree()

plateView.on "change:currentPage", ->
	closestPage = plateView.currentPage.name
	if closestPage is "slide_1"
		changeStepToOne()
		
	else if closestPage is "slide_2"
		changeStepToTwo()
		
	else if closestPage is "slide_3"
		changeStepToThree()

changeStepToOne = () ->
	selected_step.stateSwitch("step_1")
	phone_shape.animate("step_1")
	phone_image.animate("step_1")
	
	prev_step_button.animate("hidden")
	next_step_button.animate("shown")
	complete_button.animate("hidden")
	
	content_slide_1.animate("shown")
	syncView.animate("hidden")
	content_slide_3.animate("step_2")
	isCurrentBgChosen = false
	imageView.stateSwitch(imageView.states.current.name)

changeStepToTwo = () ->
	selected_step.stateSwitch("step_2")
	phone_shape.animate("step_2")
	phone_image.animate("step_2")
	
	prev_step_button.animate("shown")
	next_step_button.animate("shown")
	complete_button.animate("hidden")
	
	content_slide_1.stateSwitch("hidden")
	syncView.animate("hidden")
	content_slide_3.animate("step_2")
	isCurrentBgChosen = true

changeStepToThree = () ->
	selected_step.stateSwitch("step_3")
	phone_shape.animate("step_3")
	phone_image.animate("step_3")
	
	prev_step_button.animate("shown")
	next_step_button.animate("hidden")
	complete_button.animate("shown")
	
	content_slide_1.animate("hidden")
	syncView.animate("shown")
	content_slide_3.animate("step_3")
	isCurrentBgChosen = true







for item in [screen_bg, content_slide_3, phone_shape, phone_image, content_slide_1, zenView, syncView, onboard_bg, progress_base, selected_step, prev_step_button, next_step_button, complete_button, plateView]
	item.parent = screen

navbar = new Layer
	parent: screen
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"