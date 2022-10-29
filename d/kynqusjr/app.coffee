
Canvas.backgroundColor = "222"

# Screen

screen = new Layer
	width: 360
	height: 640
	image: "images/screen.png"


welcome = new Layer
	parent: screen
	width: 360
	height: 640
	image: "images/market%20(1).png"

welcome.states =
	"hidden": { y: 700 }
	"shown": { y: 0 }
welcome.stateSwitch("shown")


welcomeView = new Layer
	parent: welcome
	width: 360
	height: 616
	backgroundColor: "white"
	rotation: 10
	y: 360
	borderRadius: 24


welcomeTip = new Layer
	parent: welcomeView
	width: 134
	height: 47
	x: 182
	y: 90
# 	image: "images/welcomeTip.png"
	backgroundColor: "FFCC00"
	borderRadius: 20

welcomeTip.states =
	"hidden": { opacity: 0.8, scaleX: 0.96, scaleY: 0.9 }
	"shown": { opacity: 1, scaleX: 1.1, scaleY: 1.1 }
welcomeTip.stateSwitch("hidden")


welcomeContent = new Layer
	parent: welcomeView
	width: 360
	height: 616
	image: "images/welcomeContent.png"


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

# Animate

welcomeTip.on Events.StateSwitchEnd, (from, to) ->
	if to == "shown" then nextTime = 0.7
	else nextTime = 1.2
	
	@animate(from, time: nextTime, curve: Bezier.easeInOut)


welcomeTip.stateSwitch("shown")


showPromo = () ->
	Utils.delay 0.5, ->
		tabRound.animate("shown", time: 0.3)
	Utils.delay 0.8, ->
		tabRound.animate("hidden", time: 0.3)
	Utils.delay 1.1, ->
		tabRound.animate("shown", time: 0.3)
	Utils.delay 1.4, ->
		tabRound.animate("hidden", time: 0.3)

welcome.on Events.Tap, ->
	welcome.animate("hidden", time: 0.5, curve: Spring(damping: 1))
	showPromo()


# Tabs


tab1 = new Layer
	width: 97
	height: 36
	image: "images/tab1.png"

tab2 = new Layer
	width: 80
	height: 36
	image: "images/tab2.png"
	opacity: 0.33

tab3 = new Layer
	width: 102
	height: 36
	backgroundColor: "null"

tabRound = new Layer
	parent: tab3
	borderRadius: 14
	width: 102
	height: 36
	backgroundColor: "FFCC00"

tabRound.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
tabRound.stateSwitch("hidden")

tab3base = new Layer
	parent: tab3
	opacity: 0
	width: 102
	height: 36
	image: "images/tab3.png"

tab3active = new Layer
	parent: tab3
	width: 102
	height: 36
	image: "images/tab3active.png"



tabView = new Layer
	height: 36
	backgroundColor: null
	y: 79
	parent: screen

sumX = 132
for item in [tab1, tab3, tab2]
	item.parent = tabView
	item.x = sumX
	sumX += item.width

tabView.sendToBack()

tab3.on Events.Tap, ->
	tabView.animate(x: -178, options: { time: 0.4, curve: Bezier.easeInOut})
	tab3active.animate(opacity: 0, options: { time: 0.4, curve: Bezier.easeInOut})
	tab3base.animate(opacity: 1, options: { time: 0.4, curve: Bezier.easeInOut})
	tab1.animate(opacity: 0.33, options: { time: 0.4, curve: Bezier.easeInOut})


close_16 = new Layer
	parent: welcome
	x: Align.right(-28)
	y: Align.top(40)
	width: 28
	height: 28
	image: "images/close%2016.png"

# welcome.stateSwitch("hidden", time: 0.5, curve: Spring(damping: 1))

avatarFix = new Layer
	parent: screen
	x: Align.right(-26), y: Align.top(39)
	size: 28, borderRadius: 100
	backgroundColor: "white"
	image: "https://tilllur.com/shared/avatars/tilllur.png"

avatarFix.sendToBack()