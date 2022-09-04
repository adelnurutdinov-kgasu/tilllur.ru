retina = 1

screenView = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

screen = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(51,51,51,1)"

view = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/view.png"



card_checkmark = new Layer
	width: 18*retina
	height: 18*retina
	x: 60*retina
	y: 492*retina
	image: "images/card checkmark.png"

card_checkmark.states =
	"off":
		opacity: 0
	"on":
		opacity: 1

card_checkmark.stateSwitch("on")



browser_icon = new Layer
	width: 64*retina
	height: 64*retina
	x: 147*retina
	y: 302*retina
	image: "images/browser icon.png"

browser_icon.states =
	"off":
		opacity: 0
	"on":
		opacity: 1

browser_icon.stateSwitch("off")
Utils.delay 1, ->
	browser_icon.animate("on", time: 0.6)



card_checkmark.on Events.Click, ->
	if card_checkmark.states.current.name is "on"
		card_checkmark.stateSwitch("off")
		browser_icon.stateSwitch("off")
	else
		card_checkmark.stateSwitch("on")
		browser_icon.stateSwitch("on")

for item in [screen, view, card_checkmark, browser_icon]
	item.parent = screenView

statusBar = new Layer
	parent: screenView, width: screen.width, height: 32, backgroundColor: "#333"
