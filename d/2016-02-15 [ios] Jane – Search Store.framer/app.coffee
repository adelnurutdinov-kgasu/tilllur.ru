retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

# view
bg = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)"

map_block = new Layer width: 375*retina, height: 300*retina, x: 0*retina, y: 164*retina, image: "images/map block.png"

map_block.states.add {
	stores: { opacity: 1}
	products_search: { opacity: 0}
}
map_block.states.switchInstant "stores"

bg_content = new Layer width: 375*retina, height: 402.0*retina, x: 0*retina, backgroundColor: "rgba(255,255,255,1)"

bg_content.states.add {
	stores: { y: 464*retina, opacity: 1}
	stores_search_empty: { y: 224*retina}
	products_search_results: { opacity: 0}
}
bg_content.states.switchInstant "stores"

content = new Layer width: 375*retina, height: 402*retina, x: 0*retina, image: "images/content.png"

content.states.add {
	stores: { y: 464*retina, opacity: 1}
	stores_search_empty: { y: 224*retina}
	products_search: { opacity: 0}
}
content.states.switchInstant "stores"

search_field = new Layer width: 375*retina, height: 60*retina, x: 0*retina, image: "images/search field.png"

search_field.states.add {
	stores: { y: 104*retina}
	stores_search_empty: { y: 164*retina}
}
search_field.states.switchInstant "stores"

search_label = new Layer width: 135*retina, height: 16*retina, x: 18*retina, image: "images/search label.png"

search_label.states.add {
	stores: { y: 128*retina, opacity: 1}
	stores_search_empty: { y: 188*retina}
	products_search: { opacity: 0}
}
search_label.states.switchInstant "stores"

search_typed = new Layer width: 29*retina, height: 14*retina, x: 18*retina, image: "images/search typed.png"

search_typed.states.add {
	stores: { y: 127*retina, opacity: 0}
	stores_search_empty: { y: 187*retina}
	products_search: { opacity: 1}
}
search_typed.states.switchInstant "stores"

keyboard = new Layer width: 375*retina, height: 217*retina, x: 0*retina, image: "images/keyboard.png"

keyboard.states.add {
	stores: { y: 664*retina}
	stores_search_empty: { y: 450*retina}
}
keyboard.states.switchInstant "stores"

search_bar = new Layer width: 375*retina, height: 41*retina, x: 0*retina, y: 124*retina, image: "images/search bar.png"

close_search = new Layer width: 36*retina, height: 32*retina, x: 331*retina, y: 128*retina, image: "images/close search.png"

close_search.states.add {
	stores: { opacity: 0}
	stores_search_empty: { opacity: 1}
}
close_search.states.switchInstant "stores"

header = new Layer width: 375*retina, height: 124*retina, x: 0*retina, y: 0*retina, image: "images/header.png"

search_results = new Layer width: 320*retina, height: 131*retina, x: 28*retina, y: 246*retina, image: "images/search results.png"

search_results.states.add {
	stores: { opacity: 0}
	products_search_results: { opacity: 1}
}
search_results.states.switchInstant "stores"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["stores", "stores_search_empty", "products_search", "products_search_results"]
items = [bg, map_block, bg_content, content, search_field, search_label, search_typed, keyboard, search_bar, close_search, header, search_results]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error

for item in items
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(246,246,246,1)"