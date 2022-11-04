style = document.styleSheets[0]

# Base

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "white"
	borderRadius: 12
	clip: true

pageScroll = new ScrollComponent
	parent: screen
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
# 	contentInset:
# 		bottom: 120


statusBar = new Layer
	parent: screen
	width: 360
	height: 24
	# image: "images/status%20bar.png"
	backgroundColor: "white"

breaker1 = new Layer
	width: 360
	parent: pageScroll.content
	height: 132
	y: 148
	backgroundColor: "#eee"

breaker2 = new Layer
	width: 360
	parent: pageScroll.content
	height: 132
	y: 148 + 568
	backgroundColor: "#eee"

breaker3 = new Layer
	width: 360
	parent: pageScroll.content
	height: 132
	y: 148 + 568 * 2 + 100
	backgroundColor: "#eee"

header = new Layer
	parent: pageScroll.content
	y: 24
	width: 360
	height: 213
	image: "images/header.png"

card1 = new Layer
	parent: pageScroll.content
	y: 24 + header.height + 12
	width: 360
	height: 568
	image: "images/card%201.png"

card2 = new Layer
	parent: pageScroll.content
	y: 24 + header.height + 12 + card1.height + 12
	width: 360
	height: 568
	image: "images/card%201.png"


# screen.center()
# screen.scale = Screen.width / 360

arrowView.parent = screen
arrowView.y = 121
# arrowView.opacity = 0
# arrowView.backgroundColor = "green"
arrowView.placeBehind(statusBar)

pageScroll.content.on "change:y", ->
	value = pageScroll.scrollY
	
	arrowView.y = Utils.modulate(value, [0, 200], [121, 121 - 200], false)

startColor = "#000"
finishColor = "#FFF"
TIME = 0.4

# OLD

setPathProperties = (path) ->
	print path.length
	localOpacity = 0.2
	rule = style.insertRule("@keyframes fillAnimation" + "{}", 0)

	style.cssRules[0].appendRule "0% { fill: #{startColor}; filter: drop-shadow(0px 0px 0px rgba(0,0,0,1.0)); }"
	style.cssRules[0].appendRule "100% { fill: #{finishColor}; filter: drop-shadow(20px 10px 20px rgba(0,0,0,1.0)); }"
	
	
# 	"-webkit-filter": "drop-shadow(10px 10px 8px rgba(0,0,0,0.5))”
	print style.cssRules[0]
	
	# transform: rotate(90deg); 	
	path.style.animation = "fillAnimation" + " 3s ease-in-out alternate infinite"
	print path.style.animation



# setPathProperties = (path, length, i) ->
# 	path.style.strokeWidth = 2
# 	path.style.strokeLinecap= 'round'
# 	path.style.strokeLinejoin = 'round'
# 	rule = style.insertRule("@keyframes dash" + i + "{}", 0)
# 
# # 	start = '0,' + length
# # 	end = length + ',0'
# 	start = 5.0
# 	end = 7.0
# 
# 	style.cssRules[0].appendRule "0% { stroke-dasharray: " + start + "; stroke: #{startColor}; transform: rotate(0deg); transform-origin: center; }"
# 	style.cssRules[0].appendRule "100% { stroke-dasharray: " + end + "; stroke: #{finishColor}; transform: rotate(0deg); transform-origin: center; }"
# 	
# 	path.style.animation = "dash" + i + " #{TIME} ease-in-out alternate infinite running"
# 	print path.style.animation

# setPathProperties(shape)

# omni_white.opacity = 0
# shape.opacity = 0


for item in [shadow1, shadow2]
	item.opacity = 0

shadow = shadow3

shadow.blur = 16
shadow.saturate = 100
shadow.originX = 0.5
shadow.originY = 0.5

shadow.states =
	"start":
		y: shadow.y
		scaleX: 0.1
		scaleY: 0.1
		opacity: 1
		backgroundColor: "#FC0D1B"



basicMidX = shadow.midX
dataMidX = [0, 0, 0, 0, 0]
basicMidY = shadow.midY
dataMidY = [-8, -4, 0, 4, 8, 12]

basicScaleX = 0.9
dataScaleX = [-0.1, -0.05, 0, 0.05, 0.1]
basicScaleY = 0.4
dataScaleY = [0.3, 0.35, 0.4, 0.45, 0.5]

basicOpacity = 0.4
# dataOpacity = [0, 0, 0, 0, 0]
dataOpacity = [-0.3, -0.2, -0.1, 0, 0.1]

# #2D38F4
# #D90A16


dataCycler = Utils.cycle([0, 1, 2, 3, 4])
nextStateBool = false

getStateName = () ->
	DATA_I = dataCycler()
	nextStateBool = !nextStateBool
	if nextStateBool then stateName = "state1" else stateName = "state2"
	
	shadow.states[stateName] = {
		midX: basicMidX + dataMidX[DATA_I]
		midY: basicMidY + dataMidY[DATA_I]
		scaleX: basicScaleX + dataScaleX[DATA_I]
		scaleY: basicScaleY + dataScaleY[DATA_I]
		opacity: basicOpacity + dataOpacity[DATA_I]
		backgroundColor: Utils.randomChoice(["#FED038", "#313BF4", "#F61B58", "#CD2E9E", "#ADEA78"])
	}
	return stateName

speedT = 1
# cycler = Utils.cycle(["W1", "S1", "W2", "S2"])
shadow.on Events.StateSwitchEnd, (from, to) ->
	nextState = getStateName()
	nextTime = Utils.randomChoice([1, 2, 3])
# 	nextTime = speedT
	
	@animate(nextState, time: nextTime, curve: Bezier.linear)

shadow.stateSwitch("start")


# arrow.opacity = 0.2
omni_white.opacity = 0.6
# shadow1.opacity = 0.2
# shadow2.opacity = 0.2
# shadow3.opacity = 0.2

# print omni_white.parent.parent


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }
