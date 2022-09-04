retina = 1

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.2

screen = new Layer
	width: 360, height: 640, backgroundColor: "333"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

zen_done_slide = new Layer
	parent: screen
	y: 24*retina
	width: 360*retina
	height: 570*retina
	backgroundColor: "null"

# bgZenDone = new Layer
# 	parent: zen_done_slide
# 	width: 360*retina
# 	height: 640*retina
# 	x: 0*retina
# 	y: 0*retina
# 	image: "images/bg.png"

phoneZenDone = new Layer
	parent: zen_done_slide
	width: 254*retina
	height: 410*retina
	x: 53*retina
	y: 204*retina
	image: "images/phone.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(4px*" + retina + ") " + "rgba(0,0,0,0.5))"}

backgroundZenDone = new Layer
	parent: zen_done_slide
	width: 228*retina
	height: 406*retina
	x: 66*retina
	y: 237*retina
	image: "images/background.png"

darkerZenDone = new Layer
	parent: zen_done_slide
	width: 228*retina
	height: 290*retina
	x: 66*retina
	y: 237*retina

darkerZenDone.states =
	"zen_init":
		backgroundColor: "rgba(0,0,0,0.01)"
	"zen_done":
		backgroundColor: "rgba(0,0,0,0.01)"
	"zen_opened":
		backgroundColor: "rgba(0,0,0,0.5)"

darkerZenDone.stateSwitch("zen_init")

searchZenDone = new Layer
	parent: zen_done_slide
	width: 200*retina
	height: 68*retina
	x: 80*retina
	image: "images/search.png"

searchZenDone.states =
	"zen_init":
		y: 286*retina
	"zen_done":
		y: 286*retina
	"zen_opened":
		y: 136*retina

searchZenDone.stateSwitch("zen_init")

zen_card_1 = new Layer
	parent: zen_done_slide
	width: 200*retina
	height: 102*retina
	x: 80*retina
	image: "images/zen card 1.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_1.states =
	"zen_init":
		y: 543*retina
	"zen_done":
		y: 463*retina
	"zen_opened":
		y: 254*retina

zen_card_1.stateSwitch("zen_init")

zen_card_2 = new Layer
	parent: zen_done_slide
	width: 200*retina
	height: 102*retina
	x: 80*retina
	image: "images/zen card 2.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_2.states =
	"zen_init":
		y: 655*retina
	"zen_done":
		y: 595*retina
	"zen_opened":
		y: 366*retina

zen_card_2.stateSwitch("zen_init")

zen_card_3 = new Layer
	parent: zen_done_slide
	width: 200*retina
	height: 102*retina
	x: 80*retina
	image: "images/zen card 3.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_3.states =
	"zen_init":
		y: 767*retina
	"zen_done":
		y: 747*retina
	"zen_opened":
		y: 478*retina

zen_card_3.stateSwitch("zen_init")




fixZenDone = new Layer
	parent: zen_done_slide
	width: 360*retina
	height: 170*retina
	x: 0*retina
	y: 67*retina
	image: "images/fix.png"




# navbar = new Layer
# 	width: 360*retina
# 	height: 48*retina
# 	x: 0*retina
# 	y: 592*retina
# 	image: "images/navbar.png"
# 
# status_bar = new Layer
# 	width: 360*retina
# 	height: 24*retina
# 	x: 0*retina
# 	y: 0*retina
# 	image: "images/status bar.png"



movingArray = [darkerZenDone, zen_card_1, zen_card_2, zen_card_3, searchZenDone]
zen_card_1.on Events.StateSwitchEnd, (fromState, toState, event, layer) ->
	localDelay = 1
	nextState = ""
	
	if toState is "zen_done" then nextState = "zen_opened"
	else if toState is "zen_opened" then nextState = "zen_done"
	
	if layer is zen_card_2 then localDelay += 0.1
	else if layer is zen_card_3 then localDelay += 0.2
	
	if nextState != ""
		for item in movingArray
			item.animate(nextState, curve: Spring(damping: 0.9), time: 0.7, delay: localDelay)
		


start = () ->
	zen_card_1.animate("zen_done", curve: Spring(damping: 1), time: 0.5)


start()
# zen_plate.animate("zen_done")
