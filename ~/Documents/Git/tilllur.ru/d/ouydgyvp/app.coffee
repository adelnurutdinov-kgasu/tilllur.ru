
screen = new Layer
	width: 1382, height: 894, backgroundColor: null

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }





# view
bg = new Layer width: 1382, height: 894, x: 8, y: 6, image: "images/bg.png"

whiter = new Layer width: 1286, height: 726, x: 56, y: 100, backgroundColor: "rgba(255,255,255,1)"

whiter.states.add {
	start: { opacity: 0.0}
	done: { opacity: .90}
	dissappear: { opacity: 0}
}
whiter.states.switchInstant "start"

logo = new Layer width: 120, height: 120, x: 390, y: 300, image: "images/logo.png"

logo.states.add {
	start: { opacity: 0}
	done: { opacity: 1}
	dissappear: { opacity: 0}
}
logo.states.switchInstant "start"

title = new Layer width: 405, height: 28, x: 552, image: "images/title.png"

title.states.add {
	start: { y: 359, opacity: 0.0}
	done: { y: 309, opacity: 1}
	dissappear: { opacity: 0}
}
title.states.switchInstant "start"

text = new Layer width: 456, height: 56, x: 551, image: "images/text.png"

text.states.add {
	start: { y: 385, opacity: 0.0}
	done: { y: 345, opacity: 1}
	dissappear: { opacity: 0}
}
text.states.switchInstant "start"

button = new Layer width: 200, height: 34, x: 550, image: "images/button.png"

button.states.add {
	start: { y: 455, opacity: 0.0}
	done: { y: 425, opacity: 1}
	dissappear: { opacity: 0}
}
button.states.switchInstant "start"

close = new Layer width: 46, height: 45, x: 1157, y: 180, image: "images/close.png"

close.states.add {
	start: { opacity: 0}
	done: { opacity: 1}
	dissappear: { opacity: 0}
}
close.states.switchInstant "start"




# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["start", "done", "dissappear"]
items = [bg, whiter, logo, title, text, button, close]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()


goNext = () ->
	nextState = cycler()

	for item in items
		if item is logo and nextState is "done"
			item.states.switch(nextState, delay: .4)
		else if item is close and nextState is "done"
			item.states.switch(nextState, delay: .8)
		else if nextState is "dissappear"
			try
				item.states.switchInstant(nextState)
			catch error
		else
			try
				item.states.switch(nextState)
			catch error
	
	if nextState is "dissappear"
		for item in items
			try
				item.states.switchInstant("start")
			catch error
		nextState = cycler()


screen.on Events.Click, ->
	goNext()


goNext()

for item in [bg, whiter, logo, title, text, button, close, cycleButton]
	item.parent = screen

