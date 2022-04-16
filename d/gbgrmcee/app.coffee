{AudioPlayer} = require "audio"
audio = new AudioPlayer audio: "images/audio.mp3"
{Pointer} = require 'Pointer'

retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }



area = new Layer
	width:  screen.width
	height: screen.height
	backgroundColor: "white"

# compositionX = 88*retina
# compositionY = 169*retina
# compositionWidth = 375*retina
# compositionHeight = 451*retina

navs = new Layer width: 375*retina, height: 669*retina, x: 0*retina, y: 0*retina, image: "images/navs.png"

album = new Layer width: 375*retina, height: 450*retina, x: 0*retina, y: 169*retina, image: "images/album.png"

# text = new Layer width: 224*retina, height: 60*retina, x: 75*retina, y: 508*retina, image: "images/text.png"

text = new Layer width: 161*retina, height: 308*retina, x: 108*retina, y: 232*retina, image: "images/text.png"






album_name = new Layer width: 56*retina, height: 18*retina, y: 193*retina, image: "images/album name.png"

album_name.states.add {
	list_album_locked: { x: 113*retina, opacity: 0}
	list_album_unlocked: { x: 113*retina, opacity: 1}
}
album_name.states.switchInstant "list_album_locked"

author = new Layer width: 86*retina, height: 12*retina, y: 215*retina, image: "images/author.png"

author.states.add {
	list_album_locked: { x: 112*retina, opacity: 0}
	list_album_unlocked: { x: 112*retina, opacity: 1}
}
author.states.switchInstant "list_album_locked"

date = new Layer width: 31*retina, height: 12*retina, y: 237*retina, image: "images/date.png"

date.states.add {
	list_album_locked: { x: 113*retina, opacity: 0}
	list_album_unlocked: { x: 113*retina, opacity: 1}
}
date.states.switchInstant "list_album_locked"



content = new Layer width: 375*retina, height: 636*retina, x: 0*retina, y: 169*retina, image: "images/content.png", opacity: 0

bottom_bar_text_1 = new Layer width: 152*retina, height: 29*retina, x: 112*retina, y: 630*retina, image: "images/bottom bar text 1.png"

bottom_bar_text_2 = new Layer width: 132*retina, height: 32*retina, x: 122*retina, y: 629*retina, image: "images/bottom bar text 2.png", opacity: 0

pause_button = new Layer width: 30*retina, height: 33*retina, x: 6*retina, y: 628*retina, image: "images/pause button.png", opacity: 0

fix = new Layer width: 20*retina, height: 23*retina, x: 6*retina, y: 405*retina, backgroundColor: "rgba(255,255,255,1)", opacity: 0

playing = new Layer width: 8*retina, height: 8*retina, x: 12*retina, y: 412*retina, borderRadius: "100%", backgroundColor: "rgba(253,211,1,1)", opacity: 0, originX: 0.5, originY: 0.5






compositionX = 88*retina
compositionY = 280*retina
compositionWidth = 200*retina
compositionHeight = 200*retina


shadow = new Layer width: compositionWidth, height: compositionHeight, x: compositionX, y: compositionY, backgroundColor: "rgba(216,216,216,1)", shadowY: 20*retina, shadowBlur: 40*retina, shadowColor: "rgba(0,0,0,0.2388473731884058)"


# preventing clipping error by double clipping 
profileWrapper = new Layer width: compositionWidth, height: compositionHeight, x: compositionX, y: compositionY, backgroundColor: "rgba(216,216,216,1)", clip: true

# album_image = new Layer width: 200*retina, height: 200*retina, x: 88*retina, y: 265*retina, image: "images/album image.png"
	
profileArea = new Layer
	width: compositionWidth
	height: compositionHeight
	parent: profileWrapper
	clip: true

# Profile 1
profile1 = new Layer
	width: compositionWidth
	height: compositionHeight
	backgroundColor: null
	parent: profileArea

profile1Img = new Layer
	width: compositionWidth
	height: compositionHeight
	image: "images/finish.png"
	parent: profile1
	
svg = new Layer  
	width: screen.width
	height: screen.height
	x: -profileWrapper.x
	y: -profileWrapper.y
	backgroundColor: "#fff"
	html: '<svg id="svg" style="position: absolute; box-shadow: inset 0 0 0 1px white;" width="100%" height="100%" viewbox="0 0 #{screen.width} #{screen.height}"></svg>'
	style: 
		fill:   'none'
		stroke: '#000'
		strokeWidth: '50'
		strokeLinecap: 'round'
		mixBlendMode: "screen"
	custom:
		polyline: null
		svg: null
		active: false	
		
	parent: profile1
	
# profiles
# Profile 2
profile2 = new Layer
	width: compositionWidth
	height: compositionHeight
	backgroundColor: null
	parent: profileArea
	style: mixBlendMode: "multiply"

profile2Img = new Layer
	width: compositionWidth
	height: compositionHeight
	image: "images/start.png"
	parent: profile2
	
svg2 = new Layer  
	width: screen.width
	height: screen.height
	x: -profileWrapper.x
	y: -profileWrapper.y		
	borderRadius: 200
	backgroundColor: null
	html: '<svg id="svg2" style="position: absolute; box-shadow: inset 0 0 0 1px white;" width="100%" height="100%" viewbox="0 0 #{screen.width} #{screen.height}"></svg>'
	style: 
		fill:   'none'
		stroke: '#fff'
		strokeWidth: '50'
		strokeLinecap: 'round'
	custom:
		polyline: null
		svg: null
		active: false
	
	parent: profile2
	
# Drawing part
newPolyline = ->
	# Get the svg element if we don't have it
	svg.custom.svg = document.getElementById "svg" if svg.custom.svg is null
	# Create a new polyline node and append it to the svg tag
	svg.custom.polyline = document.createElementNS "http://www.w3.org/2000/svg", "polyline"
	svg.custom.svg.appendChild svg.custom.polyline
	
	#for svg 2
	svg2.custom.svg = document.getElementById "svg2" if svg2.custom.svg is null
	# Create a new polyline node and append it to the svg tag
	svg2.custom.polyline = document.createElementNS "http://www.w3.org/2000/svg", "polyline"
	svg2.custom.svg.appendChild svg2.custom.polyline

updatePoints = (event, layer) ->
	# Get Pointer Position
	pos = Pointer.screen event, layer
	newPos =
		x: pos.x - screen.parent.x,
		y: pos.y - screen.parent.y,
	
	pos = newPos
	
# 	print screen.parent.x
# 	print layer.convertPointToLayer(pos, screen.parent)
# 	print screen.convertPointToLayer(pos, layer)
	# Create a new point
	point = svg.custom.svg.createSVGPoint()
	point.x = pos.x
	point.y = pos.y 
		
	# Creat a second point
	point2 = svg2.custom.svg.createSVGPoint()
	point2.x = pos.x
	point2.y = pos.y
	
	# Add the point to the two polylines
	svg.custom.polyline.points.appendItem point
	svg2.custom.polyline.points.appendItem point2

area.on Events.TouchStart, -> 
	svg.custom.active = true
	newPolyline()
	
area.on Events.TouchEnd, ->
	svg.custom.active = false
	animateScaleUp()
	Utils.delay smallDelay/8, ->
		animateScaleDown()
	
area.on Events.TouchMove, (event, layer) ->
	return unless svg.custom.active
	updatePoints event, layer




hideArray = [svg, profile2Img, svg2]
albumTextArray = [album_name, author, date]
popSpring = "spring(300, 10, 10)"
smallDelay = 6

# Utils.delay smallDelay, ->
animateScaleUp = () ->
	bottom_bar_text_1.opacity = 0
	bottom_bar_text_2.opacity = 1
	pause_button.opacity = 1
	
	text.animate
		properties: opacity: 0
		time: 0.2
	
	profileWrapper.animate
		properties: scale: 1.1
		time: 0.4
		curve: popSpring

animateScaleDown = () ->
# Utils.delay smallDelay + smallDelay/8, ->
	for item in hideArray
		item.animate
			properties: opacity: 0
			time: 0
	
	for item in albumTextArray
		item.states.switch("list_album_unlocked", time: 0.2, delay: 0.2)
	
	profileWrapper.animate
		properties: scale: 0.44, x: -44*retina, y: 121*retina
		time: 0.2
		curve: "spring(300, 40, 10)"
	
	shadow.animate
		properties: shadowX: 0, shadowY: 0, width: 88*retina, height: 88*retina, x: 12*retina, y: 177*retina, shadowColor: null
		time: 0.2
		curve: "spring(300, 40, 10)"
	
	content.animate 
		properties: opacity: 1
		time: 0.2
		delay: 0.6
	
	Utils.delay 0.8, ->
# 		audio.player.play()
		animateBall(1)
		fix.opacity = 1
		playing.opacity = 1



navs.bringToFront()
bottom_bar_text_1.bringToFront()
bottom_bar_text_2.bringToFront()
pause_button.bringToFront()

for item in albumTextArray
	item.bringToFront()

ballDelay = 0.4

animateBall = (flag) ->
	if flag % 2 == 1
		scaleValue = 1
	else
		scaleValue = 1.6
	
	playing.animate
		properties: scale: scaleValue
		time: ballDelay
		curve: "ease-in-out"
		
	Utils.delay ballDelay, ->
		animateBall(flag+1)

for item in [audio, area, album, text, content, fix, playing, shadow, profileWrapper, navs, bottom_bar_text_1, bottom_bar_text_2, pause_button, album_name, author, date]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(244,247,247,1)"