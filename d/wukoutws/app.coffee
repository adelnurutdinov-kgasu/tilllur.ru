Canvas.backgroundColor = "222"

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "eee"
	image: "images/base%20morda.png"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 24 }

promo_icon = new Layer
	parent: screen
	width: 36
	height: 36
	x: Align.right(-18)
	y: Align.top(34)
	image: "images/promo%20icon.png"

promo_icon.states =
	"hidden": { opacity: 0 }



# Shuffle

shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source

# Welcome View

WElCOME_RUNNING = true

welcomeView = new Layer
	parent: screen
	width: 360
	height: 640
	backgroundColor: "#F0F1F5"
	image: "images/welcomeView.png"

welcomeView.states =
	"shown": { y: 0 }
	"hidden": { y: 700 }
welcomeView.stateSwitch("shown")



iconWelcome01 = new Layer
	parent: welcomeView
	width: 46
	height: 46
	image: "images/iconWelcome01.png"

iconWelcome01.states =
	"shown": { x: 271, y: 220 }
	"hidden": {x: 242, y: 378}

iconWelcome02 = new Layer
	parent: welcomeView
	width: 42
	height: 42
	image: "images/iconWelcome02.png"


iconWelcome02.states =
	"shown": { x: 216, y: 285 }
	"hidden": {x: 240, y: 378}

iconWelcome03 = new Layer
	parent: welcomeView
	width: 28
	height: 28
	image: "images/iconWelcome03.png"

iconWelcome03.states =
	"shown": { x: 294, y: 297 }
	"hidden": {x: 242, y: 378}

iconWelcome04 = new Layer
	parent: welcomeView
	width: 60
	height: 60
	image: "images/iconWelcome04.png"

iconWelcome04.states =
	"shown": { x: 137, y: 331 }
	"hidden": {x: 234, y: 372}

iconWelcome05 = new Layer
	parent: welcomeView
	width: 56
	height: 56
	image: "images/iconWelcome05.png"

iconWelcome05.states =
	"shown": { x: 145, y: 231 }
	"hidden": {x: 240, y: 372}

welcomeArray = [iconWelcome01, iconWelcome02, iconWelcome03, iconWelcome04, iconWelcome05]

for item in welcomeArray
	item.stateSwitch("shown")




createWelcomeView = new Layer
	parent: welcomeView
	width: 360
	height: 93
	y: 354
	image: "images/createWelcomeView.png"

createWelcomeView.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 1 }
createWelcomeView.stateSwitch("shown")

createWelcomeView.on Events.StateSwitchEnd, (from, to) ->
	if to == "shown"
		welcomeArray = shuffle(welcomeArray)
		item.sendToBack() for item in welcomeArray
		nextState = "hidden"
		nextTime = 3.0
	else
		nextState = "shown"
		nextTime = 1.0
	
	for item, i in welcomeArray
		item.animate(nextState, time: nextTime, delay: 0.05*i, curve: Spring(damping: 1))
	
	Utils.delay nextTime, =>
		if WElCOME_RUNNING then @stateSwitch(nextState)
	

# createWelcomeView.on Events.Tap, ->
# 	if @states.current.name == "shown" then nextState = "hidden"
# 	else nextState = "shown"
# 	@stateSwitch(nextState)

createWelcomeView.stateSwitch("shown")




closeView = new Layer
	parent: welcomeView
	width: 360
	height: 80
	image: "images/closeView.png"

closeView.on Events.Tap, ->
	welcomeView.animate("hidden", time: 1.0, curve: Spring(damping: 1))
	Utils.delay 2, ->
		WElCOME_RUNNING = false



# WElCOME_RUNNING = false
# welcomeView.stateSwitch("hidden")

# Banner


service3 = new Layer
	width: 320
	height: 116
	image: "images/service3.png"

service2 = new Layer
	width: 320
	height: 116
	image: "images/service2.png"

service1 = new Layer
	width: 320
	height: 116
	image: "images/service1.png"

zen3 = new Layer
	width: 320
	height: 116
	image: "images/zen3.png"

zen2 = new Layer
	width: 320
	height: 116
	image: "images/zen2.png"

zen1 = new Layer
	width: 320
	height: 116
	image: "images/zen1.png"


bannerView = new PageComponent
	width: 360
	height: 116
	scrollVertical: false
	scrollHorizontal: true
# 	backgroundColor: "#F0F1F5"
	directionLock: true
	contentInset: 
		right: 20

for item, i in [zen1, zen2, zen3, service1, service2, service3]
	item.parent = bannerView.content
	item.x = 20 + 326 * i
	
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.8 }

bannerView.snapToPage(zen2, false)



for item in [zen1, zen2, zen3]
	item.on Events.Tap, ->
		try promoteZen()

service1.on Events.Tap, ->
	createScrollView.scrollToPoint(
		x: 0, y: 400
		true,
		curve: Spring(damping: 1), time: 0.6
	)
	Utils.delay 0.3, ->
		promoteUslugi()

# CreateView

darker = new Layer
	parent: screen
	width: 360
	height: 640
	backgroundColor: "rgba(0,0,0,0.5)"

darker.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
darker.stateSwitch("hidden")



createScrollView = new ScrollComponent
	parent: screen
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
	
createScrollView.states =
	"shown": { y: 0 }
	"hidden": { y: 700 }
createScrollView.stateSwitch("hidden")


createScrollView.content.on Events.DragEnd, ->
# 	print @draggable.direction
# 	print @parent.scrollY
	if @parent.scrollY < 56 and @draggable.direction == "down"
		createScrollView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
		darker.animate("hidden", curve: Spring(damping: 1), time: 0.5)


contentCreate = new Layer
	parent: createScrollView.content
	width: 360
	height: 972
	y: 40
	image: "images/createView.png"

bannerView.parent = contentCreate
bannerView.y = 28






block1 = new Layer
	parent: contentCreate
	width: 328
	height: 170
	x: 16
	y: 265
	image: "images/block1.png"


block2 = new Layer
	parent: contentCreate
	width: 328
	height: 227
	x: 16
	y: 495
	image: "images/block2.png"



zenStep1 = new Layer
	parent: contentCreate
	width: block1.width
	x: block1.x
	y: block1.y
	height: 56

zenStep2 = new Layer
	parent: contentCreate
	width: block1.width
	x: block1.x
	y: block1.y + 57
	height: 56

zenStep3 = new Layer
	parent: contentCreate
	width: block1.width
	x: block1.x
	y: block1.y + 57 * 2
	height: 56

serviceStep3 = new Layer
	parent: contentCreate
	width: block2.width
	x: block2.x
	y: block2.y + 57 * 3
	height: 56

for item in [zenStep1, zenStep2, zenStep3, serviceStep3]
	item.backgroundColor = "D0D1D9"
	if item == serviceStep3 then item.backgroundColor = "96DCCE"
	item.sendToBack()
	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	item.stateSwitch("hidden")




promoteTime = 0.4

showZenAnimation = (stateName = "shown") ->
	for item, i in [zenStep1, zenStep2, zenStep3]
		item.animate(stateName, time: promoteTime, delay: 0 + 0.1*i)

promoteZen = () ->
	item.animateStop() for item in [zenStep1, zenStep2, zenStep3]
	
	showZenAnimation()
	Utils.delay promoteTime + 0.2, ->
		showZenAnimation("hidden")


showUslugiAnimation = (stateName = "shown") ->
	for item, i in [serviceStep3]
		item.animate(stateName, time: promoteTime, delay: 0 + 0.1*i)

promoteUslugi = () ->
	showUslugiAnimation()
	Utils.delay promoteTime + 0.2, ->
		showUslugiAnimation("hidden")

# promoteUslugi()


# Site

newTab = new Layer
	parent: screen
	width: 360
	height: 640
	image: "images/newTab%20(1).png"

newTab.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
newTab.stateSwitch("hidden")


closeTab = new Layer
	parent: newTab
	size: 44
	y: 24
	backgroundColor: "null"

closeTab.on Events.Tap, ->
	newTab.animate("hidden", curve: Spring(damping: 1), time: 0.5)

siteContent = new Layer
	parent: newTab
	y: 80
	width: 360
	height: 514
	image: "images/site%20content.png"

siteContent.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
siteContent.stateSwitch("hidden")


zenStep1.on Events.Tap, ->
	createScrollView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	darker.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	
	newTab.animate("shown", curve: Spring(damping: 1), time: 0.5)
	siteContent.animate("shown", curve: Spring(damping: 1), time: 0.5, delay: 2)


createButton = new Layer
	parent: screen
	size: 56
	x: Align.right(-8)
	y: Align.top(24)
	backgroundColor: "null"

createButton.on Events.Tap, ->
	promo_icon.animate("hidden", curve: Spring(damping: 1), time: 0.5, delay: 1)
	
	createScrollView.animate("shown", curve: Spring(damping: 1), time: 0.5)
	darker.animate("shown", curve: Spring(damping: 1), time: 0.5)



bottom_bar = new Layer
	width: 360
	height: 60
	image: "images/bottom%20bar.png"
	parent: screen
	y: Align.bottom()

welcomeView.bringToFront()
createScrollView.placeBefore(welcomeView)
darker.placeBefore(welcomeView)
