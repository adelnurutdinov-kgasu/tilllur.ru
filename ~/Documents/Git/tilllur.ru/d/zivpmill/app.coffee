
retina = 2

screen = new Layer
	width: 360, height: 640, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

temp = new Layer
	parent: screen, width: 360 * 2, height: 640  *2
	scale: 0.5, originX: 0, originY: 0

content = new Layer width: 360*retina, height: 640*retina, x: 0*retina, y: 0*retina, image: "images/content.png"

breaker = new Layer width: 360*retina, height: 8*retina, x: 0*retina, y: 396*retina, image: "images/breaker.png", opacity: 0



startY = 656
finishY = 800

container = new Layer
	width: temp.width
	height: 287
# 	x: Align.center
	y: startY
	backgroundColor: null
	clip: false

rotator = new Layer
	width: 200
	superLayer: container
	y: Align.center
	x: 360
	backgroundColor: null

button = new Layer
	width: 120
	height: 120
	borderRadius: "50%"
	superLayer: rotator
	y: Align.center
	x: 200
	backgroundColor: "#FDD301"

invibutton = new Layer
	width: 120
	height: 120
	borderRadius: "50%"
	superLayer: rotator
	y: Align.center
	x: 350
	backgroundColor: "none"

invibutton.placeBehind(button)

backButtonMask = new Layer
	width: 500
	height: 42
	superLayer: invibutton
	y: Align.center
	backgroundColor: "none"
	x: -453
	clip: true

playButtonMask = new Layer
	width: 34
	height: 42
	superLayer: invibutton
	y: Align.center
	x: 46
	clip: true
	backgroundColor: "none"

# sketch.play.superLayer = playButtonMask
# sketch.play.centerY()
# sketch.play.x = -6
# sketch.play.scale = 0.65


share_title = new Layer width: 177*retina, height: 33*retina, x: 91*retina, y: 21*retina, image: "images/share title.png", parent: container

share_title.states.add {
	start: { opacity: 0.0}
	shown: { opacity: 1}
}
share_title.states.switchInstant "start"



share_icon_1 = new Layer width: 40*retina, height: 40*retina, y: 80*retina, image: "images/share icon 1.png"

share_icon_1.states.add {
	start: { x: 68*retina, opacity: 0.0}
	shown: { x: (8+30)*retina, opacity: 1}
}
share_icon_1.states.switchInstant "start"

share_icon_2 = new Layer width: 40*retina, height: 40*retina, y: 80*retina, image: "images/share icon 2.png"

share_icon_2.states.add {
	start: { x: 114*retina, opacity: 0.0}
	shown: { x: (84+15)*retina, opacity: 1}
}
share_icon_2.states.switchInstant "start"

share_icon_3 = new Layer width: 40*retina, height: 40*retina, x: 160*retina, y: 80*retina, image: "images/share icon 3.png"

share_icon_3.states.add {
	start: { opacity: 0.0}
	shown: { opacity: 1}
}
share_icon_3.states.switchInstant "start"

share_icon_4 = new Layer width: 40*retina, height: 40*retina, y: 80*retina, image: "images/share icon 4.png"

share_icon_4.states.add {
	start: { x: 206*retina, opacity: 0.0}
	shown: { x: (236-15)*retina, opacity: 1}
}
share_icon_4.states.switchInstant "start"

share_icon_5 = new Layer width: 40*retina, height: 40*retina, y: 80*retina, image: "images/share icon 5.png"

share_icon_5.states.add {
	start: { x: 252*retina, opacity: 0.0}
	shown: { x: (312-30)*retina, opacity: 1}
}
share_icon_5.states.switchInstant "start"



share_icons_array = [share_icon_1, share_icon_2, share_icon_3, share_icon_4, share_icon_5]

for item in share_icons_array
	item.parent = container



animateMove = true

time = 0
Utils.interval 1, ->
	time += 1

button.onClick ->
	if animateMove
		
		fab.opacity = 0
		
		button.animate
			delay: 0.5
			properties: 
				scale: 10
				backgroundColor: "#fff"
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.6
		
		invibutton.animate
			properties: 
				rotation: -180
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.6
		
		rotator.animate
			properties:
				x: 400	
				y: 60
				rotation: 180
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.6
		
		Utils.delay 0.6, ->
			container.clip = true
			breaker.placeBefore(navbar)
			
			share_title.states.switch("shown")
			
			for item in share_icons_array
				item.states.switch("shown", time: 0.4)
		
		container.animate
			properties: 
				y: finishY
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.2
		
		animateMove = false
		
		icon.animate
			properties: opacity: 0, rotation: -210
			time: 0.4
		
		
	else
		share_title.states.switch("start", time: 0.2)
			
		for item in share_icons_array
			item.states.switch("start", time: 0.2)
		
		button.animate
			properties: 
				scale: 1
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.3
		
		Utils.delay 0.3, ->
			container.clip = false
		
		rotator.animate
			delay: 0.3
			properties: 
				x: 360
				y: Align.center
				rotation: 0
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.6
		
		
		invibutton.animate
			delay: 0.3
			properties: 
				rotation: 0
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.6
		
		container.animate
			delay: 0.3
			properties: 
				y: startY
			curve: "cubic-bezier(0.4, 0, 0.2, 1)"
			time: 0.6
		
		fab.animate
			properties: opacity: 1
			time: 0
			delay: 0.9
		
		icon.animate
			properties: rotation: 0
			time: 0
		
		Utils.delay 0.8, ->
			
			icon.animate
				properties: opacity: 1
				time: 0.2
				
	
		animateMove = true



navbar = new Layer width: 360*retina, height: 48*retina, x: 0*retina, y: 592*retina, image: "images/navbar.png"

icon = new Layer width: 28*retina, height: 25*retina, x:16*retina, y: 19*retina, image: "images/icon.png", parent: button

fab = new Layer width: 84*retina, height: 92*retina, x: 268*retina, y: 360*retina, image: "images/fab.png"

fab.placeBefore(breaker)


for item in [content, fab, container, navbar]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 28, backgroundColor: "black"