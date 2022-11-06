Framer.Defaults.Animation =
	curve: Spring(0.5)


startColor = "#9148FF"
finishColor = "#067AFF"
TIME = "2s"

#
screen = new Layer
	width: 360
	height: 640

home.parent = screen

# Path Animation Functions

style = document.styleSheets[0]

setLayerStates = (layer, i) ->
	layer.pixelAlign = true
	
	layer.states =
		"clear":
			fill: 'rgba(255,255,255,0)'
			stroke: 'rgba(255,255,255,1)'
			opacity: 0
			
		"noStroke":
			stroke: 'rgba(255,255,255,1.0)'
			opacity: 0
			options:
				time: 0.25
		
		"fadeIn":
			opacity: 1
		
		"fadeOut":
			opacity: 0
			scale: 1.2
			options:
				time: 1, delay: 0.25 * i + 0.05





setPathProperties = (path, length, i) ->
	path.style.strokeWidth = 2
	path.style.strokeLinecap= 'round'
	path.style.strokeLinejoin = 'round'
	rule = style.insertRule("@keyframes dash" + i + "{}", 0)

# 	start = '0,' + length
# 	end = length + ',0'
	start = 5.0
	end = 7.0

	style.cssRules[0].appendRule "0% { stroke-dasharray: " + start + "; stroke: #{startColor}; transform: rotate(0deg); transform-origin: center; }"
	style.cssRules[0].appendRule "100% { stroke-dasharray: " + end + "; stroke: #{finishColor}; transform: rotate(0deg); transform-origin: center; }"
	
	path.style.animation = "dash" + i + " #{TIME} ease-in-out alternate infinite running"


setPathProperties2 = (path) ->
	rule = style.insertRule("@keyframes fillAnimation" + "{}", 0)

	style.cssRules[0].appendRule "0% { fill: #{startColor}; }"
	style.cssRules[0].appendRule "100% { fill: #{finishColor}; }"
	
	# transform: rotate(90deg); 	
	path.style.animation = "fillAnimation" + " #{TIME} ease-in-out alternate infinite"


setPathProperties3 = (path) ->
	localOpacity = 0.2
	rule = style.insertRule("@keyframes fillAnimation" + "{}", 0)

	style.cssRules[0].appendRule "0% { fill: #{startColor}; opacity: #{localOpacity}; }"
	style.cssRules[0].appendRule "100% { fill: #{finishColor};  opacity: #{localOpacity}; }"
	
	# transform: rotate(90deg); 	
	path.style.animation = "fillAnimation" + " #{TIME} ease-in-out alternate infinite"



setPathStopState = (layer, i) ->
	layer.animate 'noStroke', instant: true
	
	path = layer.path
	layer.style.animationPlayState = 'paused'



animatePath = (layer, i) ->
	setLayerStates layer
	layer.animate 'clear', instant: true

	# Adding the CSS Rules
	Utils.delay 0.15 * i, ->
		layer.animate 'fadeIn'
		setPathProperties layer, layer.length, i

#Setup
plusShape = plus.children[0]

firstRun = null
currentTheme = []

setup = () ->
	for path, i in framer.children when path instanceof SVGPath
		animatePath path, i
	
	for path, i in plus.children when path instanceof SVGPath
		setPathProperties2(path)
		
	for path, i in colored.children when path instanceof SVGPath
		setPathProperties3(path)

Utils.domComplete ->
	firstRun = false
	setup()

home.onTap ->
	unless firstRun is true
		for path, i in framer.children
			setPathStopState path, i
			
		firstRun = true


statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }