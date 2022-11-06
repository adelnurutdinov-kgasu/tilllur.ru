# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


bg = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/bg.png"


site = new Layer
	parent: figmaView
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"

site.states =
	"base":
		x: 0
		y: 0
		width: 360
		height: 640
	"opened":
		x: 91
		y: 141.8
		width: 178
		height: 316.4


bottomBar = new Layer
	parent: figmaView
	image: "images/figma/bottomBar.png"

bottomBar.states =
	"base":
		x: 0
		y: 560
		width: 360
		height: 80
		opacity: 1
	"opened":
		x: 91
		y: 418.7
		width: 178
		height: 39.6
		opacity: 0


panel = new Layer
	parent: figmaView
	x: -370
	width: 1100
	height: 100
	opacity: 1
	backgroundColor: "transparent"

panel.states =
	"base":
		y: 561
	"opened":
		y: 531


left5 = new Layer
	parent: panel
	opacity: 1

left5.states =
	"base":
		x: 30
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 379
		y: 35
		width: 30
		height: 30
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


left4 = new Layer
	parent: panel
	opacity: 1

left4.states =
	"base":
		x: 96
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 379
		y: 35
		width: 30
		height: 30
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


left3 = new Layer
	parent: panel
	opacity: 1

left3.states =
	"base":
		x: 162
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 379
		y: 35
		width: 30
		height: 30
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


left2 = new Layer
	parent: panel
	opacity: 1

left2.states =
	"base":
		x: 228
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 383
		y: 32
		width: 36
		height: 36
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


left1 = new Layer
	parent: panel
	y: 29
	width: 42
	height: 42
	opacity: 1

left1.states =
	"base":
		x: 294
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 388
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


aliceButton = new Layer
	parent: panel
	opacity: 1
	backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"

aliceButton.states =
	"base":
		x: 394
		y: 32
		width: 36
		height: 36
	"opened":
		x: 396
		y: 24
		width: 52
		height: 52


right5 = new Layer
	parent: panel
	opacity: 1

right5.states =
	"base":
		x: 1025
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 688
		y: 35
		width: 30
		height: 30
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


right4 = new Layer
	parent: panel
	opacity: 1

right4.states =
	"base":
		x: 959
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 688
		y: 35
		width: 30
		height: 30
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


right3 = new Layer
	parent: panel
	opacity: 1

right3.states =
	"base":
		x: 893
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 688
		y: 35
		width: 30
		height: 30
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


right2 = new Layer
	parent: panel
	opacity: 1

right2.states =
	"base":
		x: 827
		y: 29
		width: 42
		height: 42
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 678
		y: 32
		width: 36
		height: 36
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


right1 = new Layer
	parent: panel
	y: 29
	width: 42
	height: 42
	opacity: 1

right1.states =
	"base":
		x: 761
		backgroundColor: "rgba(48.000000938773155, 45.00000111758709, 134.00000721216202, 1)"
	"opened":
		x: 667
		backgroundColor: "rgba(114.0000008046627, 114.0000008046627, 114.0000008046627, 1)"


chats = new Layer
	parent: panel
	opacity: 1
	backgroundColor: "rgba(66.00000366568565, 152.0000061392784, 242.00000077486038, 1)"

chats.states =
	"base":
		x: 667
		y: 32
		width: 36
		height: 36
	"opened":
		x: 649
		y: 24
		width: 52
		height: 52


sceneStates = ["base", "opened"]
sceneLayers = [figmaView, bg, site, bottomBar, panel, left5, left4, left3, left2, left1, aliceButton, right5, right4, right3, right2, right1, chats]

for item in sceneLayers
	try item.stateSwitch(sceneStates[0])


cycler = Utils.cycle(sceneStates)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.8)
		catch error


figmaView.on Events.Click, ->
	nextStateHandler()


for item in panel.children
	item.borderRadius = "50%"

aliceButton.states.base.shadowBlur = 0
aliceButton.states.base.shadowColor = "rgba(0,0,0,0.2)"

aliceButton.states.opened.shadowBlur = 16
aliceButton.states.opened.shadowColor = "rgba(0,0,0,0.2)"


chats.states.base.shadowBlur = 0
chats.states.base.shadowColor = "rgba(0,0,0,0.2)"

chats.states.opened.shadowBlur = 16
chats.states.opened.shadowColor = "rgba(0,0,0,0.2)"



for item in [left1, left2, left3, left4, left5]
	item.image = Utils.randomImage()
	item.shadowBlur = 16
	item.shadowColor = "rgba(0,0,0,0.1)"

for item in [right1, right2, right3, right4, right5]
	item.image = Utils.randomImage()
	item.shadowBlur = 16
	item.shadowColor = "rgba(0,0,0,0.1)"


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16 }
