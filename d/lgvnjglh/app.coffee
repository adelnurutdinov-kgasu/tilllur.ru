Framer.Loop.delta = 1 / 60
# Framer.Extras.Hints.disable()

appData = JSON.parse Utils.domLoadDataSync "appData.json"

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(255, 255, 255, 1)"


apps = new Layer
	name: "apps"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "transparent"


app12 = new Layer
	name: "app12"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app12.states =
	"left":
		x: 20
		y: 160
	"right":
		x: -229
		y: 160
	"bottom":
		x: 20
		y: 368
	"back":
		x: -229
		y: 160


app11 = new Layer
	name: "app11"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app11.states =
	"left":
		x: 84
		y: 160
	"right":
		x: -165
		y: 160
	"bottom":
		x: 88
		y: 368
	"back":
		x: -165
		y: 160


app10 = new Layer
	name: "app10"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app10.states =
	"left":
		x: 148
		y: 160
	"right":
		x: -101
		y: 160
	"bottom":
		x: 156
		y: 368
	"back":
		x: -101
		y: 160


app09 = new Layer
	name: "app09"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app09.states =
	"left":
		x: 212
		y: 160
	"right":
		x: -37
		y: 160
	"bottom":
		x: 224
		y: 368
	"back":
		x: -37
		y: 160


app08 = new Layer
	name: "app08"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app08.states =
	"left":
		x: 276
		y: 160
	"right":
		x: 27
		y: 160
	"bottom":
		x: 292
		y: 368
	"back":
		x: 27
		y: 160


app07 = new Layer
	name: "app07"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app07.states =
	"left":
		x: 340
		y: 160
	"right":
		x: 91
		y: 160
	"bottom":
		x: 20
		y: 264
	"back":
		x: 91
		y: 160


app06 = new Layer
	name: "app06"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app06.states =
	"left":
		x: 404
		y: 160
	"right":
		x: 155
		y: 160
	"bottom":
		x: 88
		y: 264
	"back":
		x: 155
		y: 160


app05 = new Layer
	name: "app05"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app05.states =
	"left":
		x: 468
		y: 160
	"right":
		x: 219
		y: 160
	"bottom":
		x: 156
		y: 264
	"back":
		x: 219
		y: 160


app04 = new Layer
	name: "app04"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app04.states =
	"left":
		x: 532
		y: 160
	"right":
		x: 283
		y: 160
	"bottom":
		x: 224
		y: 264
	"back":
		x: 283
		y: 160


app03 = new Layer
	name: "app03"
	parent: apps
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app03.states =
	"left":
		x: 596
		y: 160
	"right":
		x: 347
		y: 160
	"bottom":
		x: 292
		y: 264
	"back":
		x: 347
		y: 160


app02 = new Layer
	name: "app02"
	parent: apps
	y: 160
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app02.states =
	"left":
		x: 660
	"right":
		x: 411
	"bottom":
		x: 20
	"back":
		x: 411


app01 = new Layer
	name: "app01"
	parent: apps
	y: 160
	width: 48
	height: 48
	opacity: 1
	backgroundColor: "rgba(196.00000351667404, 196.00000351667404, 196.00000351667404, 1)"

app01.states =
	"left":
		x: 724
	"right":
		x: 475
	"bottom":
		x: 88
	"back":
		x: 475


header = new Layer
	name: "header"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 181
	opacity: 1
	image: "images/figma/header.png"


content = new Layer
	name: "content"
	parent: figmaView
	x: 0
	width: 360
	height: 497
	opacity: 1
	image: "images/figma/content.png"

content.states =
	"left":
		y: 264
	"right":
		y: 264
	"bottom":
		y: 472
	"back":
		y: 264


sceneStates = ["left", "right", "bottom", "back"]
sceneLayers = [figmaView, apps, app12, app11, app10, app09, app08, app07, app06, app05, app04, app03, app02, app01, header, content]

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


figmaView.on Events.Click, ->
	nextStateHandler()


for item, i in apps.children
	item.borderRadius = 13
	item.backgroundColor = "#FFF"
# 	item.image = "images/apps/" + appData[i].icon
	small = new Layer { width: 36, height: 36, image: "images/apps/" + appData[i].icon, parent: item, x: 6, y: 6}
	darker = new Layer { width: item.width, height: item.height, parent: item, borderRadius: item.borderRadius, backgroundColor: "rgba(0,0,0,0.06)"}
	text = new TextLayer { width: item.width + 8, x: -4, parent: item, fontSize: 13, textAlign: "center", text: appData[i].name, y: item.height + 4, color: "rgba(0,0,0,0.8)"}
	
	
#
# pages = new PageComponent
# 	width: 360
# 	height: 640
# 	scrollHorizontal: true
# 	scrollVertical: false
# 
# pageLeft = new PageComponent
# 	parent: pages.content
# 	width: 360
# 	height: 640
# 	scrollHorizontal: false
# 	scrollVertical: true
# 
# l1 = new Layer
# 	width: 360
# 	height: 640
# 	backgroundColor: Utils.randomColor()
# 	opacity: 0.5
# 	parent: pageLeft.content
# 
# l2 = new Layer
# 	width: 360
# 	height: 640
# 	y: 640
# 	backgroundColor: Utils.randomColor()
# 	opacity: 0.5
# 	parent: pageLeft.content
# 
# r1 = new Layer
# 	width: 360
# 	height: 640
# 	backgroundColor: Utils.randomColor()
# 	opacity: 0.5
# 	parent: pages.content
# 	x: 360
# 
# 
# # changeLayout = (value) ->
# 	
# 
# 
# 
# pages.content.on "change:x", ->
# 	valueX = pageLeft.scrollX
# 	print valueX
# 	
# 	for item in figmaView.children
# # 		item.y = Utils.modulate(value, [0, 640], [item.states[selState].y, item.states.bottom.y], true)
# 		item.x = Utils.modulate(valueX, [0, 360], [item.states["left"].x, item.states["right"].x], true)
# 		
# 		
# 
# pageLeft.content.on "change:y", ->
# 	value = pageLeft.scrollY
# 	if pages.currentPage == pageLeft
# 		selState = "left"
# 	else selState = "right"
# 	
# # 	print selState
# 	
# 	for item in figmaView.children
# 		item.y = Utils.modulate(value, [0, 640], [item.states[selState].y, item.states.bottom.y], true)
# 		item.x = Utils.modulate(value, [0, 640], [item.states[selState].x, item.states.bottom.x], true)
# 	




TimeBottom = 0.5
TimeNext = 0.5

centerP = if apps.children.length % 2 == 1 then ((apps.children.length - 1) / 2) else figmaView.children.length / 2



# else
# 	center = figmaView.children.length / 2


nextStateHandler = () ->
	nextState = cycler()
	for item, i in [content]
		try
			item.animate(nextState, curve: Spring(damping: 1), time: TimeNext)
		
	
	for item, i in apps.children
		
		if nextState is "bottom"
# 			if i >= 7 then fakeIndex = Utils.modulate(i, [centerP, apps.children.length], [0, 7], true)
# 			else fakeIndex = Utils.modulate(i, [0, centerP], [7, 0], true)
			fakeIndex = (i - i % 5) / 5
			if fakeIndex == 0 then fakeIndex += (5 - i % 5)
			else if fakeIndex == 2 then fakeIndex += i % 5
		
		else if nextState is "back"
			fakeIndex = i
# 			if i > apps.children.length - 5
# 				fakeIndex = Utils.modulate(i, [0, apps.children.length], [apps.children.length + 7, 0 + 7])
			
			fakeIndex = (i - i % 5) / 5
			if fakeIndex == 0 then fakeIndex += i % 5
			else if fakeIndex == 2 then fakeIndex += (5 - i % 5)
# 			
		else fakeIndex = 0
		
		
		try
			if nextState is "back"
# 				item.animate(nextState, curve: Spring(damping: 1), time: TimeBottom + fakeIndex * 0.3)
				item.animate(nextState, curve: Spring(damping: 1), time: TimeBottom) 
			else if nextState is "bottom"
				item.animate(nextState, curve: Spring(damping: 1), time: TimeBottom + fakeIndex * 0.1)
			else
				item.animate(nextState, curve: Spring(damping: 1), time: 0.67)
		catch error


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 8, topTheme: "light", forceAndroidBar: true }
