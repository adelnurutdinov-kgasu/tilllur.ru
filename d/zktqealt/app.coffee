retina = 1

screen = new Layer
	width: 375, height: 667

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

# view
bg = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)"

content_base = new Layer width: 360*retina, height: 454*retina, x: 8*retina, image: "images/content base.png"

content_base.states.add {
	products: { y: 184*retina, opacity: 1}
	products_search_empty: { y: 244*retina}
	products_search: { opacity: 0}
}
content_base.states.switchInstant "products"

search_field = new Layer width: 375*retina, height: 60*retina, x: 0*retina, image: "images/search field.png"

search_field.states.add {
	products: { y: 104*retina}
	products_search_empty: { y: 164*retina}
}
search_field.states.switchInstant "products"

search_label = new Layer width: 106*retina, height: 17*retina, x: 18*retina, image: "images/search label.png"

search_label.states.add {
	products: { y: 127*retina, opacity: 1}
	products_search_empty: { y: 187*retina}
	products_search: { opacity: 0}
}
search_label.states.switchInstant "products"

search_typed = new Layer width: 23*retina, height: 14*retina, x: 18*retina, y: 187*retina, image: "images/search typed.png"

search_typed.states.add {
	products: { opacity: 0}
	products_search: { opacity: 1}
}
search_typed.states.switchInstant "products"

keyboard = new Layer width: 375*retina, height: 217*retina, x: 0*retina, image: "images/keyboard.png"

keyboard.states.add {
	products: { y: 664*retina}
	products_search_empty: { y: Align.bottom }
}
keyboard.states.switchInstant "products"

search_bar = new Layer width: 375*retina, height: 41*retina, x: 0*retina, y: 124*retina, image: "images/search bar.png"

close_search = new Layer width: 36*retina, height: 32*retina, x: 331*retina, y: 128*retina, image: "images/close search.png"

close_search.states.add {
	products: { opacity: 0}
	products_search_empty: { opacity: 1}
}
close_search.states.switchInstant "products"

header = new Layer width: 375*retina, height: 124*retina, x: 0*retina, y: 0*retina, image: "images/header.png"

search_results = new Layer width: 340*retina, height: 152*retina, x: 8*retina, y: 244*retina, image: "images/search results.png"

search_results.states.add {
	products: { opacity: 0}
	products_search_copy: { opacity: 1}
}
search_results.states.switchInstant "products"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["products", "products_search_empty", "products_search", "products_search_copy"]
items = [bg, content_base, search_field, search_label, search_typed, keyboard, search_bar, close_search, header, search_results]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

for item in items
	item.parent = screen
# 	item.opacity= 0

cycleButton.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

statusBar = new Layer
	width: screen.width, height: 20, backgroundColor: "rgba(243,243,243,1)", parent: screen