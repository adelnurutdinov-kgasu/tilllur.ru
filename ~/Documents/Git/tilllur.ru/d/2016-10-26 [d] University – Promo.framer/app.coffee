
retina = 1

screen = new Layer
	width: 375, height: 667

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

Framer.Defaults.Animation =
	curve: "spring(600,20,10)"
	
smoothCurve = "spring(40,30,10)"

can = new Layer width: 375, height: 667, backgroundColor: "white"
# view
bg = new Layer width: 558*retina, height: 374*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)", parent: can

bg.center()

order_1 = new Layer image: "images/order 1.png", opacity: 0.8

order_1.states.add {
	start: { width: 190*retina, height: 184*retina, x: 190*retina, y: 104*retina}
	finish: { width: 317*retina, height: 308*retina, x: 103*retina, y: 51*retina}
}
order_1.states.switchInstant "start"

order_2 = new Layer image: "images/order 2.png"

order_2.states.add {
	start: { width: 194*retina, height: 191*retina, x: 193*retina, y: 77*retina}
	finish: { width: 324*retina, height: 319*retina, x: 133*retina, y: 6*retina}
}
order_2.states.switchInstant "start"

order_3 = new Layer image: "images/order 3.png", opacity: 0.8

order_3.states.add {
	start: { width: 207*retina, height: 191*retina, x: 181*retina, y: 91*retina}
	finish: { width: 346*retina, height: 320*retina, x: 114*retina, y: 29*retina}
}
order_3.states.switchInstant "start"

order_4 = new Layer image: "images/order 4.png"

order_4.states.add {
	start: { width: 184*retina, height: 179*retina, x: 184*retina, y: 93*retina}
	finish: { width: 308*retina, height: 299*retina, x: 119*retina, y: 32*retina}
}
order_4.states.switchInstant "start"

order_5 = new Layer image: "images/order 5.png", opacity: 0.8

order_5.states.add {
	start: { width: 170*retina, height: 183*retina, x: 212*retina, y: 103*retina}
	finish: { width: 285*retina, height: 306*retina, x: 165*retina, y: 50*retina}
}
order_5.states.switchInstant "start"

order_6 = new Layer image: "images/order 6.png", opacity: 0.8

order_6.states.add {
	start: { width: 182*retina, height: 171*retina, x: 196*retina, y: 107*retina}
	finish: { width: 305*retina, height: 286*retina, x: 139*retina, y: 56*retina}
}
order_6.states.switchInstant "start"

order_7 = new Layer image: "images/order 7.png", opacity: 0.8

order_7.states.add {
	start: { width: 180*retina, height: 183*retina, x: 191*retina, y: 93*retina}
	finish: { width: 301*retina, height: 306*retina, x: 130*retina, y: 32*retina}
}
order_7.states.switchInstant "start"

darker = new Layer image: "images/darker.png", opacity: 0.8

darker.states.add {
	start: { width: 176*retina, height: 176*retina, x: 196*retina, y: 95*retina}
	finish: { width: 294*retina, height: 293*retina, x: 139*retina, y: 37*retina}
}
darker.states.switchInstant "start"

main = new Layer width: 278*retina, height: 278*retina, x: 147*retina, y: 45*retina, image: "images/main.png", style: {"-webkit-filter": "drop-shadow(0 calc(2px*" + retina + ") calc(4px*" + retina + ") " + "rgba(0,0,0,0.5))"}

main.states.add {
	start: { scale: 0.8 }
	finish: { scale: 1 }
}
main.states.switchInstant "start"

look = new Layer width: 195*retina, height: 55*retina, x: 187*retina, image: "images/look.png", rotation: -2

look.states.add {
	start: { y: 158*retina, opacity: 0, scale: 0.8}
	finish: { y: 128*retina, opacity: 1, scale: 1}
}
look.states.switchInstant "start"

designer = new Layer width: 202*retina, height: 34*retina, x: 188*retina, image: "images/designer.png", rotation: -2

designer.states.add {
	start: { y: 221*retina, opacity: 0, scale: 0.8}
	finish: { y: 201*retina, opacity: 0.6, scale: 1}
}
designer.states.switchInstant "start"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["start", "finish"]
items = [bg, order_1, order_2, order_3, order_4, order_5, order_6, order_7, darker, main, look, designer]
for item in items
	if item != bg
		item.parent = bg

cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

startAnimation = () ->
	nextState = cycler()
	for item, i in items
		try
			if item == designer or item == look
				item.states.switch(nextState, delay: 0.4, curve: smoothCurve, time: 2)
			else if item == main
				item.states.switch(nextState, delay: 0.4, curve: smoothCurve)
			else
				item.states.switch(nextState, delay: 1.4-0.1*i)
		catch error

screen.on Events.Click, ->
	startAnimation()

can.parent = screen
