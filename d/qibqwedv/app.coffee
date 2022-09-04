{SVGLayer} = require 'SVGLayer'
retina = 1

screenView = new Layer
	width: 360, height: 640
	backgroundColor: "#333"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

# Init
screen = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(51,51,51,1)"

fix = new Layer
	width: 360*retina
	height: 170*retina
	x: 0*retina
	y: 24*retina
	backgroundColor: "rgba(51,51,51,1)"



status_bar = new Layer
	width: 360*retina
	height: 32*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "#333"

welcome_view = new Layer
	width: 360*retina
	height: 568*retina
	x: 0*retina
	y: 24*retina
	image: "images/welcome view.png"

title_step_2_import = new Layer
	width: 360*retina
	height: 170*retina
	x: 0*retina
	y: 24*retina
	image: "images/title step 2 import.png"

bottom_buttons_view = new Layer
	width: 360*retina
	height: 70*retina
	x: 0*retina
	y: 466*retina
	image: "images/bottom buttons view.png"

bookmarks_check_browser = new Layer
	width: 268*retina
	height: 42*retina
	x: 45*retina
	y: 467*retina
	image: "images/bookmarks check browser.png"

import_checkmark = new Layer
	width: 18*retina
	height: 18*retina
	x: 45*retina
	y: 467*retina
	image: "images/import checkmark.png"

import_checkmark.states =
	"base":
		opacity: 0
	"done":
		opacity: 1

import_checkmark.stateSwitch("done")

import_checkmark.on Events.Click, ->
	if import_checkmark.states.current.name is "done"
		import_checkmark.stateSwitch("base")
		hideAnimation()
	else
		import_checkmark.stateSwitch("done")
		showAnimation()

navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

next_button = new Layer
	width: 360*retina
	height: 56*retina
	x: 0*retina
	y: 536*retina
	image: "images/next button.png"

phone = new Layer
	width: 128*retina
	height: 207*retina
	x: 116*retina
	y: 246*retina
	image: "images/phone.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(2px*" + retina + ") " + "rgba(0,0,0,0.5))"}

progress_bar = new Layer
	width: 360*retina
	height: 44*retina
	x: 0*retina
	y: 24*retina
	image: "images/progress bar.png"


maxNumber = 25
animatedItems = []


for item in [screen, fix, status_bar, welcome_view, title_step_2_import, bottom_buttons_view, bookmarks_check_browser, import_checkmark, navbar, next_button, phone, progress_bar]
	item.parent = screenView

createShape = (index) ->
	shapeContainer = new Layer
		parent: screenView
		width: 300*retina
		height: 80*retina
		x: -120*retina
		y: 300*retina
		name: index
		backgroundColor: "transparent"
		originX: 1
		originY: 0.5
		rotation: 360 / maxNumber * index
	
	shapeContainer.placeBefore(screen)
	
	shape = new SVGLayer
		parent: shapeContainer
		rotation: -(360 / maxNumber * index)
		fill: "#FFF"
		strokeWidth: 0
		name: index
		opacity: 0.8
# 		opacity: 0.6 + (index%5)*0.08
		width: 100
		height: 143
		scale: 0.25
		path: '<path d="M15.625,0 C7.20208335,0 0,6.08889854 0,13.9891304 L0,135.228261 C0,137.016797 0.406249998,139.300652 2.19791666,141.008362 C3.9875,142.716072 6.16041665,143 7.81250001,143 C8.73958331,142.98342 9.63541665,142.699493 10.4,142.17516 L50,115.896319 L89.5999999,142.17516 C90.3645831,142.699493 91.2604164,142.98342 92.1875001,143 C93.8395831,143 96.0125,142.716072 97.8020832,141.008362 C99.5937498,139.300652 100,137.016797 100,135.228261 L100,13.9891304 C100,6.08889854 92.7979167,0 84.3749997,0 L15.625,0 Z"></path>'
	
	shape.states =
		"top":
			y: -20*retina
			scale: 1.1 / 4
		"bottom":
			y: 20*retina
			scale: 0.8 / 4
	
	shape.on Events.StateSwitchEnd, (fromState, toState) ->
		if toState is "top" then shape.animate("bottom")
		else shape.animate("top")
	
	animatedItems.push(shape)
	shape.animate("top", delay: Utils.randomNumber(10) * 0.1)
	
	return shapeContainer


animateShape = (parentLayer) ->
	layer = parentLayer.children[0]
	index = parseInt(parentLayer.name)
	section = index % 5
	
	
# 	normal = 1 * Utils.delay(1)
	normal = 2
	localTime = 4
	
	parentLayer.rotation = 360 / maxNumber * index
	parentLayer.animate
		rotaion: 360 / maxNumber * (index + 4)
		options: 
			time: localTime
			delay: normal*index*0.2
	
	layer.x = 0
	layer.animate
		x: 300*retina
		options: 
			time: localTime
			delay: normal*index*0.2
	
	Utils.delay normal*index*0.2 + localTime + 0.1, ->
		animateShape(parentLayer)
	

showAnimation = () -> 
	for item in animatedItems
		item.animate
			opacity: 0.8

hideAnimation = () -> 
	for item in animatedItems
		item.animate
			opacity: 0


start = () ->
	for index in [0..maxNumber]
		item = createShape(index)
		animateShape(item)

start()

