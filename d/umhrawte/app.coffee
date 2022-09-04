
retina = 1

screen = new Layer
	width: 375, height: 667

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

localCurve = "ease-in-out"
localTime = 0.1


bg = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, image: "images/bg.png"

button1 = new Layer width: 52*retina, height: 16*retina, x: 37*retina, y: 617*retina, image: "images/button1.png"

button2 = new Layer width: 137*retina, height: 16*retina, x: 193*retina, y: 617*retina, image: "images/button2.png"

plate = new Layer width: 308*retina, height: 76.0*retina, x: 30*retina, y: 442*retina, borderRadius: 100*retina, backgroundColor: "rgba(255,255,255,1)", shadowY: 34*retina, shadowBlur: 44*retina, shadowColor: "rgba(55,130,188,0.4760812952898551)", borderWidth: 1*retina, borderColor: "rgba(238,238,238,1)"



howbg = new Layer width: 220*retina, height: 64*retina, x: 36*retina, y: 448*retina, borderRadius: 100*retina, backgroundColor: "rgba(84,201,255,1)", shadowY: 7*retina, shadowBlur: 8*retina, shadowColor: "rgba(55,130,188,0.4)", borderWidth: 2*retina, borderColor: "rgba(80,187,238,1)"

howtext = new Layer width: 140*retina, height: 26*retina, x: 42*retina, y: (16+4)*retina, image: "images/howText.png", parent: howbg


sharebg = new Layer width: 64*retina, height: 64*retina, x: 268*retina, y: 448*retina, borderRadius: 100*retina, backgroundColor: "rgba(84,201,255,1)", shadowY: 7*retina, shadowBlur: 8*retina, shadowColor: "rgba(55,130,188,0.4)", borderWidth: 2*retina, borderColor: "rgba(80,187,238,1)"

shareicon = new Layer width: 27*retina, height: 31*retina, x: 17*retina, y: 14*retina, image: "images/shareIcon.png", parent: sharebg


content = new Layer
	width: 750
	height: 1334
	y: 1334
	backgroundColor: "white"

contentNavBar = new Layer
	width: 750
	height: 128
	backgroundColor: "#37C8FF"
	parent: content

content.states.add
	stateA: { y: 0, x: 0 }

content.on Events.Click, ->
	closeContent()

closeContent = Utils.throttle 0.5, ->
	content.states.next(time: localTime*2, curve: localCurve)



# localCurve = "spring(150, 5, 0)"


howForward = (layer) ->
	layer.animate
		properties: { scale: 0.97, backgroundColor: "rgba(84,201,255,0.9)", shadowColor: "rgba(55,130,188,0.2)" }
		time: localTime
		curve: localCurve
	layer.children[0].animate 
		properties: { opacity: 0.8 }
		time: localTime
	

howBack = (layer) ->
	layer.animate
		properties: { scale: 1, backgroundColor: "rgba(84,201,255,1)", shadowColor: "rgba(55,130,188,0.4)" }
		time: localTime
		curve: localCurve
	layer.children[0].animate
		properties: { opacity: 1 }
		time: localTime
	
	content.states.next(time: localTime*3, curve: localCurve)


howForwardSimple = (layer) ->
	layer.animate
		properties: { opacity: 0.6 }
		time: localTime
		curve: localCurve

howBackSimple = (layer) ->
	layer.animate
		properties: { opacity: 1 }
		time: localTime
		curve: localCurve
	
	content.states.next(time: localTime*3, curve: localCurve)


for item in [howbg, sharebg]
	item.on Events.TouchStart, (event, layer) ->
		howForward(layer)
	
	item.on Events.TouchEnd,  (event, layer) ->
		howBack(layer)



for item in [button1, button2]
	item.on Events.TouchStart, (event, layer) ->
		howForwardSimple(layer)
	
	item.on Events.TouchEnd,  (event, layer) ->
		howBackSimple(layer)





bg.on Events.TouchEnd, ->
	howBack(howbg)
	howBack(sharebg)
	howBackSimple(button1)
	howBackSimple(button2)



for item in [bg, button1, button2, plate, howbg, sharebg, content]
	item.parent = screen