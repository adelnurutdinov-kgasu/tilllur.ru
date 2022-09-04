screenView = new Layer
	width: 2560 / 2, height: 1480 / 2, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light", visible: false }

tempView = new Layer
	parent: screenView, width: screenView.width * 2, height: screenView.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"



stateChangedHandler = (fromState, toState, event, layer) ->
	if toState is "small"
		layer.animate("big")
	else
		layer.animate("small")
	

# view
screen = new Layer
	width: 2560
	height: 1480
	x: 0
	y: 0
	image: "images/screen.png"
	
# try_oval = new Layer
# 	width: 172
# 	height: 172
# 	x: 304
# 	y: 40
# 	borderRadius: "100%"
# 	backgroundColor: "rgba(255,219,77,1)"

# try_oval.states = 
# 	"small": { scale: 1 }
# 	"big": { scale: 5 }
# try_oval.on(Events.StateSwitchStop, stateChangedHandler)
# try_oval.stateSwitch("small")
# try_oval.states.animationOptions =
# 	curve: "spring-dho(800, 200, 10, 0.01)"

try_text = new Layer
	width: 364
	height: 60
	x: 208
	y: 374
	image: "images/try text.png"

tabs = new Layer
	width: 2560
	height: 140
	x: 0
	y: 0
	image: "images/tabs.png"

inside_browser = new Layer
	width: 1440
	height: 1344
	x: 560
	y: 780
	image: "images/inside browser.png"
	style: {"-webkit-filter": "drop-shadow(0px 10px 24px rgba(0,0,0,0.5))"}

reader_mode_text = new Layer
	width: 168
	height: 22
	x: 1036
	y: 800
	image: "images/reader mode text.png"

reader_mode_text.states =
	base:
		opacity: 0
	reader:
		opacity: 1

reader_mode_text.stateSwitch("base")

read_mode_off = new Layer
	width: 40
	height: 40
	x: 714
	y: 794
	image: "images/read mode off.png"

read_mode_off.states =
	base:
		opacity: 1
	reader:
		opacity: 0

read_mode_off.stateSwitch("base")

read_mode_on = new Layer
	width: 40
	height: 40
	x: 714
	y: 794
	image: "images/read mode on.png"

read_mode_on.states =
	base:
		opacity: 0
	reader:
		opacity: 1

read_mode_on.stateSwitch("base")

content_base = new Layer
	width: 1440
	height: 630
	x: 560
	y: 850
	image: "images/content base.png"

content_read = new Layer
	width: 1440
	height: 630
	x: 560
	y: 850
	image: "images/content read.png"

content_read.states =
	base:
		opacity: 0
	reader:
		opacity: 1

content_read.stateSwitch("base")

arrow = new Layer
	width: 16
	height: 200
	x: 382
	y: 162
	image: "images/arrow.png"

readability = new Layer
	width: 2560
	height: 19790
	x: 0
	y: 0
	image: "images/readability.png"
	opacity: 0

visibleFlag = false
readability.on Events.Click, ->
	visibleFlag = !visibleFlag
	if visibleFlag
		readability.opacity = 1
	else
		readability.opacity = 0
	


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["base", "reader"]
items = [screen, try_text, tabs, inside_browser, reader_mode_text, read_mode_off, read_mode_on, content_base, content_read, arrow]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

changeBg = () ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error
	
	Utils.delay 3, ->
		changeBg()

changeBg()

for item in items
	item.parent = tempView

readability.parent = tempView
 