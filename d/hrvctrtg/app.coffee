{ Preview } = require "PreviewComponent"

screen = new Layer
	width: 375
	height: 812
	backgroundColor: "DFDFDF"
	clip: true

new Preview { view: screen }

img = new Layer
	parent: screen
	width: 375
	height: 812
	image: "images/re1.png"

img.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
img.stateSwitch("shown")

scroll = new PageComponent
	parent: screen
	width: 375
	height: 812
	scrollVertical: true
	scrollHorizontal: false
	opacity: 0

page1 = new Layer
	parent: scroll.content
	width: scroll.width
	height: scroll.height
	backgroundColor: Utils.randomColor()

page2 = new Layer
	parent: scroll.content
	width: scroll.width
	height: scroll.height
	y: scroll.height
	backgroundColor: Utils.randomColor()



#

news = new Layer
	parent: screen
	width: 375
	height: 500
	image: "images/%D0%BD%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D0%B8.png"

news.states =
	"shown":
		y: 626
		scale: 1
		rotation: 0
	"hidden":
		y: 200
		scale: 0.7
		rotation: -3

news.stateSwitch("shown")



card = new Layer
	parent: screen
	width: 375
	height: 455
	image: "images/card.png"
	shadowColor: "rgba(0,0,0,0.2)"
	shadowBlur: 10
	borderRadius: 16

card.states =
	"shown":
		y: 350
		x: 500
		scale: 1
		rotation: 0
	"hidden":
		y: 220
		x: 100
		scale: 0.7
		rotation: 2

card.stateSwitch("shown")






#

text = new Layer
	parent: screen
	width: 294
	height: 136
	x: 33
	y: 88
	image: "images/text.png"

text.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 1 }
text.stateSwitch("shown")

icon = new Layer
	parent: screen
	width: 80
	height: 80
	x: Align.center
	y: Align.bottom(-53)
	image: "images/icon.png"

icon.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 1 }
icon.stateSwitch("shown")

button = new Layer
	parent: screen
	width: 276
	height: 72
	x: Align.center
	y: Align.bottom(-53)
	image: "images/button.png"

button.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 1 }
button.stateSwitch("shown")





gap = [0, 812]
gapFast = [0, 812 / 2]
gapLate = [812 / 2, 812]

scroll.content.on "change:y", ->
	v = @parent.scrollY
	
	[s1, s2] = ["shown", "hidden"]
	l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
		true) for [l, d, g] in [[img, "opacity", gapFast],
								[news, "y", gap],
								[news, "rotation", gap],
								[news, "scale", gap],
								[card, "x", gap],
								[card, "y", gap],
								[card, "rotation", gap],
								[card, "scale", gap],
								[text, "opacity", gapLate],
								[button, "opacity", gapLate],
		]
