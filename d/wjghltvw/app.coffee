Framer.Extras.Hints.disable()

Framer.Defaults.animationOptions =
	curve: Spring(damping: 1)
	time: 0.5

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 375
	height: 812
	opacity: 1
	image: "images/figma/figmaView.png"


# site = new Layer
# 	name: "site"
# 	parent: figmaView
# 	x: 0
# 	y: 0
# 	width: 375
# 	height: 812
# 	opacity: 1
# 	image: "images/figma/site.png"


cloud = new Layer
	name: "cloud"
	parent: figmaView
	x: 0
	y: 438
	width: 375
	height: 374
	image: "images/figma/cloud.png"

cloud.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0


alice_SayHello = new Layer
	name: "alice_SayHello"
	parent: figmaView
	x: 0
	y: 572
	width: 375
	height: 56
	image: "images/figma/alice_SayHello.png"

alice_SayHello.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0


iconL = new Layer
	name: "iconL"
	parent: figmaView
	x: 32
	y: 736
	width: 32
	height: 32
	image: "images/figma/iconL.png"

iconL.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0


iconR = new Layer
	name: "iconR"
	parent: figmaView
	x: 311
	y: 736
	width: 32
	height: 32
	image: "images/figma/iconR.png"

iconR.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0


aliceIcon = new Layer
	name: "aliceIcon"
	parent: figmaView
	width: 40
	height: 40
	opacity: 1
	image: "images/figma/aliceIcon.png"

aliceIcon.states =
	"shown":
		x: 168
		y: 732
	"hidden":
		x: 25
		y: 674


button3 = new Layer
	name: "button3"
	parent: figmaView
	y: 678
	width: 155
	height: 32
	opacity: 1
	image: "images/figma/button3.png"

button3.states =
	"shown":
		x: 59
	"hidden":
		x: -481


button4 = new Layer
	name: "button4"
	parent: figmaView
	y: 678
	width: 94
	height: 32
	opacity: 1
	image: "images/figma/button4.png"

button4.states =
	"shown":
		x: 222
	"hidden":
		x: -583


button1 = new Layer
	name: "button1"
	parent: figmaView
	width: 144
	height: 32
	opacity: 1
	image: "images/figma/button1.png"

button1.states =
	"shown":
		x: 22
		y: 638
	"hidden":
		x: -131
		y: 678


button2 = new Layer
	name: "button2"
	parent: figmaView
	width: 179
	height: 32
	opacity: 1
	image: "images/figma/button2.png"

button2.states =
	"shown":
		x: 174
		y: 638
	"hidden":
		x: -318
		y: 678


sceneStates = ["shown", "hidden"]
sceneLayers = [figmaView, site, cloud, alice_SayHello, iconL, iconR, aliceIcon, button3, button4, button1, button2]

for item in sceneLayers
	try item.stateSwitch(sceneStates[0])


cycler = Utils.cycle(sceneStates)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


# figmaView.on Events.Click, ->
# 	nextStateHandler()


# Addon


figmaView.states =
	"shown": { opacity: 1, y: 0 }
	"hidden": { opacity: 0, y: 0 }
figmaView.stateSwitch("shown")


aliceIcon.states.listen =
	image: "images/alice%20icon%20listen.png"
aliceIcon.states.normal =
	image: "images/figma/aliceIcon.png"


aliceIcon.stateSwitch("listen")
aliceIcon.stateSwitch("normal")

cloud_mute = new Layer
	width: 375
	height: 374
	image: "images/cloud_mute.png"

cloud_mute.y = cloud.y + 80
cloud_mute.parent = cloud.parent
cloud_mute.placeBehind(cloud)

cloud_mute.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

# cloud_mute.stateSwitch("shown")


cloud_light = new Layer
	width: 475
	height: 324
	image: "images/cloud_light.png"

cloud_light.y = cloud.y
cloud_light.parent = cloud.parent
cloud_light.placeBehind(cloud)

cloud_light.states =
	"shown":
		opacity: 1
		x: 0
		y: 670
	"mid":
		opacity: 1
		x: -475+86
		y: 586
	"hidden":
		opacity: 0
		x: -475
		y: 586




for item in figmaView.children
	try item.stateSwitch("hidden")

figmaView.off(Events.Click, nextStateHandler)


{ Preview } = require "PreviewComponent"

screen = new Layer { width: 375, height: 812 }
new Preview { view: screen }

figmaView.parent = screen

# Site

scrollProxyLayer = new Layer
	opacity: 0

scrollProxyLayer.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }
scrollProxyLayer.stateSwitch("shown")

scrollProxyLayer.on Events.StateSwitchEnd, (from, to) ->
	if from != to
# 		alice_Shadow_Proxy.animate(to, curve: Spring(damping: 1), time: 0.2)
		figmaView.animate(to, curve: Spring(damping: 1), time: 0.2)
		actionBar.animate(to, curve: Spring(damping: 1), time: 0.2)
		panelHeader.animate(to, curve: Spring(damping: 1), time: 0.2)



site = new ScrollComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "white"
	directionLock: true
	contentInset:
		top: 105
		bottom: 200

framerwiki.parent = site.content
framerwiki.x = framerwiki.y = 0
framerwiki.name = "."

site.sendToBack()

site.onTap ->
	aliceIcon.stateSwitch("normal")
	sayingProxy.stateSwitch("hidden")
	
# 	aliceView_Slider.ignoreEvents = true
# 	aliceView_Slider.content.ignoreEvents = true
	
	if aliceView_Slider.currentPage == aliceView_Scroll
		aliceView_Slider.snapToPage(aliceView_Null)



site.content.on "change:y", ->
	v = site.scrollY
	
	aliceIcon.stateSwitch("normal")
	sayingProxy.stateSwitch("hidden")
	
# 	aliceView_Slider.ignoreEvents = true
# 	aliceView_Slider.content.ignoreEvents = true
	
	if aliceView_Slider.currentPage == aliceView_Scroll
		aliceView_Slider.content.animateStop()
		aliceView_Slider.snapToPage(aliceView_Null)
	
	if v < 40
		scrollProxyLayer.stateSwitch("shown")
	else if v > framerwiki.height - screen.height - 40
		scrollProxyLayer.stateSwitch("shown")
	else if site.content.draggable.direction == "up"
		scrollProxyLayer.stateSwitch("hidden")
	else
		scrollProxyLayer.stateSwitch("shown")



panelHeader = new Layer
	parent: screen
	width: 375
	height: 105
	image: "images/Panel%20Header%20(1).png"

panelHeader.states =
	"shown": { y: Align.top }
	"hidden": { y: Align.top(-105) }
panelHeader.stateSwitch("shown")

actionBar = new Layer
	parent: screen
	width: 375
	height: 83
	y: Align.bottom
	image: "images/Action%20Bar.png"

actionBar.states =
	"shown": { y: Align.bottom }
	"hidden": { y: Align.bottom(83) }
actionBar.stateSwitch("shown")

actionBar.placeBehind(figmaView)

# Scroll 

isMutedMode = false

aliceView_Slider = new PageComponent
	parent: screen
	width: screen.width
	height: 80
	y: Align.bottom(-83)
	scrollVertical: false
	scrollHorizontal: true
	directionLock: true
	originX: 0

aliceView_Slider.content.draggable.overdrag = false
aliceView_Slider.velocityThreshold = 0.1
	

aliceView_Slider.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
aliceView_Slider.stateSwitch("shown")


aliceView_Null = new Layer
	width: screen.width - 40 - 16 - 16
	height: 80
	backgroundColor: "."
# 	backgroundColor: "red"

aliceView_Scroll = new Layer
	width: screen.width
	height: 80
	backgroundColor: "."
# 	backgroundColor: "green"

aliceView_Slider.addPage(aliceView_Scroll)
aliceView_Slider.addPage(aliceView_Null)
aliceView_Slider.snapToPage(aliceView_Null, false)

gapFast = [303, 303 - 100]
gap = [303, 0]
gap2 = [303, 0] 
# print gap
gapMid = [303- 50, 0]
gapLate = [303 - 120, 0]
gapLate2 = [303- 160, 0]



aliceView_Slider.on "change:currentPage", ->
	if @currentPage == aliceView_Null
		aliceView_Slider.ignoreEvents = true
		aliceView_Slider.content.ignoreEvents = true


aliceView_Slider.content.onDragStart ->
	aliceIcon.stateSwitch("normal")
	sayingProxy.stateSwitch("hidden")
	
	if aliceView_Slider.currentPage == aliceView_Null
		isMutedMode = true


aliceView_Slider.content.on "change:x", ->
	v = aliceView_Slider.scrollX
	
	[s1, s2] = ["hidden", "shown"]
	l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
		true) for [l, d, g] in [[iconL, "opacity", gapLate],
								[iconR, "opacity", gapLate],
# 								[alice_SayHello, "opacity", gapLate],
# 								[cloud, "opacity", gapLate],
# 								[cloud_mute, "opacity", gapLate],
								[iconL, "opacity", gapLate],
								[iconR, "opacity", gapLate],
								[aliceIcon, "x", gap],
								[aliceIcon, "y", gapLate],
								[button1, "x", gap2],
								[button1, "y", gapLate],
								[button2, "x", gap],
								[button2, "y", gapMid],
								[button3, "x", gap],
# 								[button3, "y", gapLate],
								[button4, "x", gap],
# 								[button4, "y", gapLate],

		
	]
	
	
	if isMutedMode then local_item = cloud_mute
	else local_item = cloud
		
	
	[s1, s2] = ["hidden", "shown"]
	l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
		true) for [l, d, g] in [[local_item, "opacity", gapLate],
	]
	
# 	print v
	if v < gapLate2[0]
		[s1, s2] = ["hidden", "mid"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
		true) for [l, d, g] in [[cloud_light, "opacity", [0, gapLate2[0]]],
								[cloud_light, "x", [0, gapLate2[0]]]
		]
	else
		[s1, s2] = ["mid", "shown"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
		true) for [l, d, g] in [[cloud_light, "x", gapLate2],
								[cloud_light, "y", gapLate2]
		]



# Addon 2


aliceView_Slider.clip = false
aliceView_Slider.content.clip = false
aliceView_Slider.parent = figmaView
aliceView_Slider.placeBefore(cloud)

aliceIcon.parent = aliceView_Null
# print aliceIcon.states.shown.y - aliceView_Slider.y

aliceIcon.states.shown =
	x: 96 - aliceView_Null.width
	y: 81

aliceIcon.states.hidden =
	x: -50
	y: 26

# aliceIcon.states.shown.x = aliceIcon.states.shown.x + aliceView_Null.width
# aliceIcon.states.shown.y = aliceIcon.states.shown.y - aliceView_Slider.y
# aliceIcon.states.hidden.y = aliceIcon.states.hidden.y - aliceView_Slider.y

aliceIcon.stateSwitch("hidden")

# Saying

sayingProxy = new Layer
	opacity: 0

sayingProxy.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
sayingProxy.stateSwitch("hidden")


sayingProxy.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		alice_SayHello.animate(to, curve: Spring(damping: 1), time: 0.4)


# cloud.on "change:opacity", ->
# 	if @opacity > 0.1 then sayingProxy.stateSwitch("shown")
# 	else sayingProxy.stateSwitch("hidden")

aliceView_Slider.ignoreEvents = true
aliceView_Slider.content.ignoreEvents = true

aliceIcon.onTouchStart ->
	site.animateStop()
	site.content.animateStop()
	
	aliceView_Slider.ignoreEvents = false
	aliceView_Slider.content.ignoreEvents = false
	

aliceIcon.onTap ->
	if figmaView.states.current.name == "shown"
		
		if aliceView_Slider.currentPage == aliceView_Null
			isMutedMode = false
			aliceIcon.stateSwitch("listen")
			sayingProxy.stateSwitch("shown")
			
			site.content.animateStop()
			aliceView_Slider.ignoreEvents = false
			aliceView_Slider.content.ignoreEvents = false
			aliceView_Slider.snapToPage(aliceView_Scroll)
		
		else if aliceIcon.image == aliceIcon.states.normal.image
			isMutedMode = false
			aliceIcon.stateSwitch("listen")
			sayingProxy.stateSwitch("shown")
			
			cloud.animate("shown", time: 0.1)
			cloud_mute.animate("hidden", delay: 0.1)
			
		else
			isMutedMode = true
			aliceIcon.stateSwitch("normal")
			sayingProxy.stateSwitch("hidden")
			
			cloud.animate("hidden", delay: 0.1)
			cloud_mute.animate("shown", time: 0.1)
		

	
