
screen = new Layer
	width: 360
	height: 640
	clip: true
	borderRadius: 8

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 16, forceAndroidBar: true }

base = new Layer
	width: 360
	height: 640
	image: "images/base%20(2).png"
	parent: screen


card = new Layer
	width: 360
	y: 276 - 4
	parent: screen
	borderRadius: 24
	backgroundColor: "white"

card.states =
	"hidden": { height: 94 }
	"shown": { height: 94 + 56 }
card.stateSwitch("hidden")

zenCard = new Layer
	width: 360
	height: 502
	image: "images/card%20(2).png"
	parent: screen

zenCard.states =
	"hidden": { y: 376 - 4 }
	"shown": { y: 376 + 56 - 4 }
zenCard.stateSwitch("hidden")


omni = new Layer
	width: 360
	height: 56
	image: "images/omni.png"
	parent: screen
	y: Align.bottom()



metro = new Layer
	width: 360
	height: 56
	image: "images/metro.png"
	parent: card

metro.states =
	"hidden": { y: 90 - 56 }
	"shown": { y: 90 }
metro.stateSwitch("hidden")



top = new Layer
	width: 360
	height: 88
	image: "images/top.png"
	parent: card
	y: 2



close = new Layer
	width: 132
	height: 44
	image: "images/close.png"
	parent: card
	x: Align.right()
	y: Align.top(-2)

close.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
close.stateSwitch("hidden")


open = new Layer
	width: 132
	height: 44
	image: "images/open.png"
	parent: card
	x: Align.right()
	y: Align.top(-2)

open.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 1 }
open.stateSwitch("hidden")




cycler = Utils.cycle(["shown", "hidden"])

nextHadler = () ->
	nextState = cycler()
	for item in [metro, card, zenCard]
		try item.animate(nextState, time: 0.3)

Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 38 or event.keyCode is 40
		nextHadler()



preview.addSection("Show New Message", [
	{ title: "Toggle", handler: nextHadler },
])




temp = new Layer
	width: 360
	height: 640
	y: 24
	parent: base
	clip: true
	backgroundColor: "null"

header = new Layer
	width: 360
	height: 196
	y: -24 - 8
	image: "images/header.png"
	parent: temp

statusBar = new Layer
	parent: screen
	width: screen.width
	height: 24
	backgroundColor: "white"

