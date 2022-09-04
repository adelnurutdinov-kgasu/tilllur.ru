# Use desktop cursor
document.body.style.cursor = "auto"

retina = 1

screen = new Layer
	width: 320, height: 568, backgroundColor: "#FFF"

temp = new Layer
	width: 300, height: 568, backgroundColor: "#FFF", scale: 320/300
	originX: 0, originY: 0, y: 20, parent: screen

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "dark" }

# view
bg = new Layer width: 300*retina, height: 44*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)", shadowY: 1*retina, shadowColor: "rgba(238,238,238,1)"

bar = new Layer height: 24*retina, y: 12*retina, borderRadius: 4*retina, backgroundColor: "rgba(238,238,238,1)", shadowY: 1*retina, shadowBlur: 2*retina

bar.states.add {
	step_1: { width: 120.0*retina, x: 154*retina, shadowColor: "rgba(151,151,151,0)"}
	step_2: { width: 240*retina, x: 34*retina, shadowColor: "rgba(151,151,151,0.5636322463768116)"}
	step_3: { width: 240.0*retina}
	step_5: { width: 240*retina}
	step_6: { width: 120.0*retina, x: 154*retina, shadowColor: "rgba(151,151,151,0)"}
}
bar.states.switchInstant "step_1"

cancel = new Layer width: 39*retina, height: 11*retina, x: 224*retina, y: 18*retina, image: "images/cancel.png"

cancel.states.add {
	step_1: { opacity: 0}
	step_2: { opacity: 1}
	step_6: { opacity: 0}
}
cancel.states.switchInstant "step_1"

placeholder = new Layer width: 77*retina, height: 11*retina, y: 18*retina, image: "images/placeholder.png"

placeholder.states.add {
	step_1: { x: 182*retina, opacity: 1}
	step_2: { x: 62*retina, opacity: 0}
	step_6: { x: 182*retina, opacity: 1}
}
placeholder.states.switchInstant "step_1"

title = new Layer width: 9*retina, height: 11*retina, y: 18*retina, image: "images/title.png"

title.states.add {
	step_1: { x: 181*retina, opacity: 0}
	step_2: { x: 59*retina}
	step_4: { opacity: 1}
	step_6: { x: 181*retina, opacity: 0}
}
title.states.switchInstant "step_1"

title2 = new Layer width: 9*retina, height: 11*retina, y: 18*retina, image: "images/title2.png"

title2.states.add {
	step_1: { x: 190*retina, opacity: 0}
	step_2: { x: 68*retina}
	step_5: { opacity: 1}
	step_6: { x: 190*retina, opacity: 0}
}
title2.states.switchInstant "step_1"

cursor = new Layer width: 1*retina, height: 14*retina, y: 17*retina, backgroundColor: "rgba(0,0,0,1)"

cursor.states.add {
	step_1: { x: 200*retina, opacity: 0}
	step_2: { x: 59*retina}
	step_3: { opacity: 1}
	step_4: { x: 69*retina}
	step_5: { x: 78*retina}
	step_6: { x: 200*retina, opacity: 0}
}
cursor.states.switchInstant "step_1"

icon = new Layer width: 12*retina, height: 12*retina, y: 18*retina, image: "images/icon.png"

icon.states.add {
	step_1: { x: 162*retina}
	step_2: { x: 42*retina}
	step_6: { x: 162*retina}
}
icon.states.switchInstant "step_1"

icon_green = new Layer width: 12*retina, height: 12*retina, y: 18*retina, image: "images/icon green.png"

icon_green.states.add {
	step_1: { x: 162*retina, opacity: 0}
	step_2: { x: 42*retina, opacity: 1}
	step_6: { x: 162*retina, opacity: 0}
}
icon_green.states.switchInstant "step_1"

suggest_modal_bg = new Layer y: 40*retina, backgroundColor: "rgba(255,255,255,1)", shadowY: 1*retina, shadowBlur: 2*retina, shadowColor: "rgba(0,0,0,0.5)"

suggest_modal_bg.states.add {
	step_1: { width: 240*retina, height: 154*retina, x: 34*retina, opacity: 0}
	step_4: { opacity: 1}
	step_6: { width: 115*retina, height: 154.0*retina, x: 159*retina, opacity: 0}
}
suggest_modal_bg.states.switchInstant "step_1"

suggest_search = new Layer width: 65*retina, height: 11*retina, x: 44*retina, y: 52*retina, image: "images/suggest search.png"

suggest_search.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
}
suggest_search.states.switchInstant "step_1"

fix = new Layer width: 92*retina, height: 23*retina, x: 39*retina, y: 46*retina, backgroundColor: "rgba(255,255,255,1)"

fix.states.add {
	step_1: { opacity: 0}
	step_5: { opacity: 1}
}
fix.states.switchInstant "step_1"

suggest_search_2 = new Layer width: 74*retina, height: 11*retina, y: 52*retina, image: "images/suggest search 2.png"

suggest_search_2.states.add {
	step_1: { x: 44*retina, opacity: 0}
	step_5: { opacity: 1}
	step_6: { x: 164*retina, opacity: 0}
}
suggest_search_2.states.switchInstant "step_1"

suggest_bg_1 = new Layer width: 230*retina, height: 36*retina, x: 44*retina, y: 76*retina, image: "images/suggest bg 1.png"

suggest_bg_1.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_bg_1.states.switchInstant "step_1"

suggest_name_1 = new Layer width: 48*retina, height: 11*retina, x: 44*retina, y: 88*retina, image: "images/suggest name 1.png"

suggest_name_1.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_name_1.states.switchInstant "step_1"

suggest_type_1 = new Layer width: 27*retina, height: 11*retina, x: 237*retina, y: 88*retina, image: "images/suggest type 1.png"

suggest_type_1.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_type_1.states.switchInstant "step_1"

suggest_bg_2 = new Layer width: 230*retina, height: 36*retina, x: 44*retina, y: 112*retina, image: "images/suggest bg 2.png"

suggest_bg_2.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_bg_2.states.switchInstant "step_1"

suggest_name_2 = new Layer width: 51*retina, height: 13*retina, x: 45*retina, y: 124*retina, image: "images/suggest name 2.png"

suggest_name_2.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_name_2.states.switchInstant "step_1"

suggest_type_2 = new Layer width: 37*retina, height: 13*retina, x: 226*retina, y: 124*retina, image: "images/suggest type 2.png"

suggest_type_2.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_type_2.states.switchInstant "step_1"

suggest_bg_3 = new Layer width: 230.0*retina, height: 36*retina, x: 44*retina, y: 148*retina, backgroundColor: "rgba(255,255,255,1)"

suggest_bg_3.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_bg_3.states.switchInstant "step_1"

suggest_name_3 = new Layer width: 55*retina, height: 11*retina, x: 44*retina, y: 160*retina, image: "images/suggest name 3.png"

suggest_name_3.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_name_3.states.switchInstant "step_1"

suggest_type_3 = new Layer width: 35*retina, height: 11*retina, x: 228*retina, y: 160*retina, image: "images/suggest type 3.png"

suggest_type_3.states.add {
	step_1: { opacity: 0}
	step_4: { opacity: 1}
	step_5: { opacity: 0}
}
suggest_type_3.states.switchInstant "step_1"

suggest_bg_4 = new Layer height: 36*retina, y: 76*retina, image: "images/suggest bg 4.png"

suggest_bg_4.states.add {
	step_1: { width: 230*retina, x: 44*retina, opacity: 0}
	step_5: { opacity: 1}
	step_6: { width: 118*retina, x: 156*retina, opacity: 0}
}
suggest_bg_4.states.switchInstant "step_1"

suggest_name_4 = new Layer width: 50*retina, height: 11*retina, y: 88*retina, image: "images/suggest name 4.png"

suggest_name_4.states.add {
	step_1: { x: 44*retina, opacity: 0}
	step_5: { opacity: 1}
	step_6: { x: 164*retina, opacity: 0}
}
suggest_name_4.states.switchInstant "step_1"

suggest_type_4 = new Layer width: 37*retina, height: 13*retina, x: 226*retina, y: 88*retina, image: "images/suggest type 4.png"

suggest_type_4.states.add {
	step_1: { opacity: 0}
	step_5: { opacity: 1}
	step_6: { opacity: 0}
}
suggest_type_4.states.switchInstant "step_1"

suggest_bg_5 = new Layer height: 36*retina, y: 112*retina, image: "images/suggest bg 5.png"

suggest_bg_5.states.add {
	step_1: { width: 230*retina, x: 44*retina, opacity: 0}
	step_5: { opacity: 1}
	step_6: { width: 118*retina, x: 156*retina, opacity: 0}
}
suggest_bg_5.states.switchInstant "step_1"

suggest_name_5 = new Layer width: 52*retina, height: 13*retina, y: 124*retina, image: "images/suggest name 5.png"

suggest_name_5.states.add {
	step_1: { x: 44*retina, opacity: 0}
	step_5: { opacity: 1}
	step_6: { x: 164*retina, opacity: 0}
}
suggest_name_5.states.switchInstant "step_1"

suggest_type_5 = new Layer width: 35*retina, height: 11*retina, x: 228*retina, y: 124*retina, image: "images/suggest type 5.png"

suggest_type_5.states.add {
	step_1: { opacity: 0}
	step_5: { opacity: 1}
	step_6: { opacity: 0}
}
suggest_type_5.states.switchInstant "step_1"

suggest_bg_6 = new Layer width: 230.0*retina, height: 36*retina, x: 44*retina, y: 148*retina, backgroundColor: "rgba(255,255,255,1)"

suggest_bg_6.states.add {
	step_1: { opacity: 0}
	step_5: { opacity: 1}
}
suggest_bg_6.states.switchInstant "step_1"

suggest_name_6 = new Layer width: 41*retina, height: 11*retina, y: 160*retina, image: "images/suggest name 6.png"

suggest_name_6.states.add {
	step_1: { x: 44*retina, opacity: 0}
	step_5: { opacity: 1}
	step_6: { x: 164*retina, opacity: 0}
}
suggest_name_6.states.switchInstant "step_1"

suggest_type_6 = new Layer width: 35*retina, height: 11*retina, x: 228*retina, y: 160*retina, image: "images/suggest type 6.png"

suggest_type_6.states.add {
	step_1: { opacity: 0}
	step_5: { opacity: 1}
	step_6: { opacity: 0}
}
suggest_type_6.states.switchInstant "step_1"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["step_1", "step_2", "step_3", "step_4", "step_5", "step_6"]
items = [bg, bar, cancel, placeholder, title, title2, cursor, icon, icon_green, suggest_modal_bg, suggest_search, fix, suggest_search_2, suggest_bg_1, suggest_name_1, suggest_type_1, suggest_bg_2, suggest_name_2, suggest_type_2, suggest_bg_3, suggest_name_3, suggest_type_3, suggest_bg_4, suggest_name_4, suggest_type_4, suggest_bg_5, suggest_name_5, suggest_type_5, suggest_bg_6, suggest_name_6, suggest_type_6]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

for item in items
	item.parent = temp



cycleButton.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.6)
		catch error
