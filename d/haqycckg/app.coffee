
# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Timur Nurutdinov"
	twitter: ""
	description: ""


screen = new Layer
	width: 375, height: 667, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0


# VIEWS

site = new Layer width: 750, height: 1588, x: 0, y: 40, image: "images/site.png"
status_bar = new Layer width: 728, height: 24, x: 12, y: 10, image: "images/status bar.png"
darker = new Layer width: 750, height: 1334, backgroundColor: "#000", opacity: 0

barOffset = 612*2
barShowBookmarksOffset = 148*2
barOpenedOffset = (20+16)*2

bar = new Layer width: 750, height: 1334, x: 0, y: barOffset, style: {"-webkit-filter": "drop-shadow(0px 0px 4px rgba(0,0,0,0.2))"}
bar.states =
	"opened": { y: (20+16)*2 }
	"search": { y: barOffset - barShowBookmarksOffset }



omni_bg = new Layer width: 750, height: 112, x: 0, y: 0, image: "images/omni bg.png", parent: bar

# Omnibox


search_bar_bg = new Layer width: 240, height: 72, x: 24, y: 20, borderRadius: 4, backgroundColor: "rgba(216,216,216,1)"

search_bar_shape = new Layer width: 402, height: 72, y: 20, image: "images/search bar shape.png"

search_bar_shape.states.add {
	search: { x: 184}
	base: { x: 242}
}
search_bar_shape.states.switchInstant "search"

focustext = new Layer height: 36, y: 38, backgroundColor: "rgba(184,201,219,1)"

focustext.states.add {
	search: { width: 332, x: 40, opacity: 1}
	base: { width: 248, x: 202, opacity: 0}
}
focustext.states.switchInstant "search"

address = new Layer width: 236, height: 34, y: 42, image: "images/address.png"

address.states.add {
	search: { x: 132}
	base: { x: 208}
}
address.states.switchInstant "search"

http = new Layer width: 90, height: 32, y: 42, image: "images/http.png"

http.states.add {
	search: { x: 42, opacity: 1}
	base: { x: 118, opacity: 0}
}
http.states.switchInstant "search"

tabs_icom = new Layer width: 44, height: 54, y: 28, image: "images/tabs icom.png"

tabs_icom.states.add {
	search: { x: 634, opacity: 0}
	base: { x: 674, opacity: 1}
}
tabs_icom.states.switchInstant "search"

cancel = new Layer width: 98, height: 28, y: 40, image: "images/cancel.png"

cancel.states.add {
	search: { x: 618, opacity: 1}
	base: { x: 646, opacity: 0}
}
cancel.states.switchInstant "search"

refresh_icon = new Layer width: 28, height: 34, y: 38, image: "images/refresh icon.png"

refresh_icon.states.add {
	search: { x: 524, opacity: 0}
	base: { x: 582, opacity: 1}
}
refresh_icon.states.switchInstant "search"

clear = new Layer width: 28, height: 28, y: 42, image: "images/clear.png"

clear.states.add {
	search: { x: 526, opacity: 1}
	base: { x: 582, opacity: 0}
}
clear.states.switchInstant "search"

protect_icon = new Layer width: 24, height: 32, x: 48, y: 40, image: "images/protect icon.png"

protect_icon.states.add {
	search: { opacity: 0}
	base: { opacity: 1}
}
protect_icon.states.switchInstant "search"

omni_bar_elems = [search_bar_bg, search_bar_shape, focustext, address, http, tabs_icom, cancel, refresh_icon, clear, protect_icon]

for item in omni_bar_elems
	item.parent = omni_bg
	try
		item.states.switchInstant("base")
	catch error






contentBackground = new Layer
	width: 750
	height: 1222
	parent: bar
	y: omni_bg.height
	backgroundColor: "#FAFAFA"
	opacity: 1

back_button = new Layer width: 455, height: 58, x: 50, y: 124, backgroundColor: "rgba(0,0,0,0)"
back = new Layer width: 358, height: 34, y: 29, image: "images/back.png", opacity: 0, parent: back_button

# Bookmarks
bookmarkBlock = new ScrollComponent
	width: 750
	height: 196
	parent: bar
	y: omni_bg.height + 24*2
# 	backgroundColor: "rgba(255,255,255,1)"
	originX: 0.1
	originY: 0
	scrollVertical: false
# 	propagateEvents: false
	contentInset:
		top: 0
		right: 0
		bottom: 0
		left: 24*2

bookmark_1 = new Layer width: 300, height: 196, x: 630, y: 0, image: "images/bookmark 1.png"
bookmark_2 = new Layer width: 300, height: 196, x: 946, y: 0, image: "images/bookmark 2.png"
bookmark_3 = new Layer width: 300, height: 196, x: 314, y: 0, image: "images/bookmark 3.png"
bookmark_4 = new Layer width: 298, height: 196, x: 0, y: 0, image: "images/bookmark 4.png"

bookmarks = [bookmark_1, bookmark_2, bookmark_3, bookmark_4]
for item in bookmarks
	item.parent = bookmarkBlock.content

zenBoard = new ScrollComponent
	parent: contentBackground
	height: 1039
	width: 327*2
	y: omni_bg.height
	x: 24*2
	scrollHorizontal: false
	scrollVertical: false
	contentInset:
		top: bookmarkBlock.height
# 	propagateEvents: false

zen_item_1 = new Layer width: 654, height: 480, x: 0, y: 512, image: "images/zen item 1.png"
zen_item_2 = new Layer width: 654, height: 480, x: 0, y: 1024, image: "images/zen item 2.png"
zen_item_3 = new Layer width: 654, height: 480, x: 0, y: 0, image: "images/zen item 3.png"

zen_items = [zen_item_1, zen_item_2, zen_item_3]
for item in zen_items
	item.parent = zenBoard.content


zenValueThreshold = -164
zenScrollBoundsTop = [0, 240]
zenScrollTopOutput = [omni_bg.height + 24*2, omni_bg.height + 24*2 - 200]

zenBoard.on Events.Move, ->
# 	print zenBoard.scrollY
	if zenBoard.scrollY <= 0 and zenBoard.scrollY > zenValueThreshold
		bookmarkBlock.y = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, zenScrollTopOutput)
	else if zenBoard.scrollY <= zenValueThreshold
		showBaseOmniBar()
		
		bar.animate
			y: barOffset
			options: { curve: tightSpring }
		
		bookmarkBlock.animate
			y: omni_bg.height + 24*2
			options: { curve: tightSpring }
		
		Utils.delay 0.2, ->
			zenBoard.scrollY = 0
	else
		if zenBoard.scrollY > 120
			back.opacity = 1
		else
			back.opacity = 0

		bookmarkBlock.scale = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, [1, 0.2], true)
		bookmarkBlock.opacity = Utils.modulate(zenBoard.scrollY, [zenScrollBoundsTop[0], zenScrollBoundsTop[1]-80], [1, 0], true)




keyboardHiddenOffset = 1334
keyboard = new Layer width: 750, height: 432, x: 0, y: 902, image: "images/keyboard.png"
keyboard.states =
	"hidden": { y: keyboardHiddenOffset }
keyboard.states.switchInstant("hidden")








tightSpring = "spring(200, 20, 0)"

bar.draggable.enabled = true
bar.draggable.horizontal = false

bar.draggable.constraints =
	x: 0
	y: 16*2+20*2
	width: 750
	height: 1334 + 592*2-16*2


bar.draggable.overdragScale = 0.0001




showSearchOmniBar = () ->
	for item in omni_bar_elems
		try
			item.states.switch("search", time: 0.2)
		catch error

showBaseOmniBar = () ->
	for item in omni_bar_elems
		try
			item.states.switch("base", time: 0.2)
		catch error


bounds = [barOpenedOffset, barOffset]
bar.on "change:y", ->
	darker.opacity = Utils.modulate(bar.y, bounds, [0.8,0])
	if bar.y <= barOpenedOffset
		zenBoard.scrollVertical = true
	else
		zenBoard.scrollVertical = false

counter = 0
omni_bg.on Events.Click, (event) ->
	
	showSearchOmniBar()
	keyboard.states.switch("default", curve: tightSpring)
	
	bar.animate
		y: barOffset-keyboard.height-barShowBookmarksOffset
		options: { curve: tightSpring }



bar.on Events.Swipe, ->
# 	print "back click" + counter++
	
	showBaseOmniBar()
	keyboard.states.switch("hidden", curve: tightSpring)

darker.on Events.Click, ->
	showBaseOmniBar()
	keyboard.states.switch("hidden", curve: tightSpring)
# 	if keyboard.states.current.name == "default"
	
	bar.animate
		y: barOffset
		options: { curve: tightSpring }

cancel.on Events.Click, ->
	showBaseOmniBar()
	keyboard.states.switch("hidden", curve: tightSpring)
	
# 	if keyboard.states.current.name == "default"
back_button.parent = bar
		
back_button.on Events.Click, ->
# 	print "Clikc"
	if back.opacity == 1
		back.opacity = 0
		
		zenBoard.scrollToPoint(
			x: 0, y: 0
			true
			curve: tightSpring
		)


for item in [site, status_bar, darker, bar, keyboard]
	item.parent = tempView

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"