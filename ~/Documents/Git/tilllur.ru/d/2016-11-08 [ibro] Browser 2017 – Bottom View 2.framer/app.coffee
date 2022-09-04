

logCounter = 0

tightSpring = "spring(200, 25, 10)"

screen = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"

darker = new Layer width: 750, height: 1334, backgroundColor: "#000", opacity: 0


# Global Navigation Views


globalNavigation = new PageComponent
	width: 750
	height: 1334
	scrollHorizontal: false
	animationOptions: 
		curve: tightSpring
		time: 0.4
	

blankPage = new Layer
	parent: globalNavigation.content
	width: 750
	height: 1224
	backgroundColor: "transparent"


barOffset = 612*2
barShowBookmarksOffset = 148*2
barOpenedOffset = (20+16)*2

bar = new Layer width: 750, height: 1185, y: barOffset, parent: globalNavigation.content, style: {"-webkit-filter": "drop-shadow(0px 0px 4px rgba(0,0,0,0.2))"}
# bar.states =
# 	"opened": { y: (20+16)*2 }
# 	"search": { y: barOffset - barShowBookmarksOffset }
# 	"hidden": { y: 1280 }

isYandexSiteCurrent = false
changeSite = () ->
	
# 	if isYandexSiteCurrent
# 		site_1.opacity = 1
# 		site_2.opacity = 0
# 	else
# 		site_1.opacity = 0
# 		site_2.opacity = 1
# 		
# 	isYandexSiteCurrent = !isYandexSiteCurrent





contentBackground = new Layer
	width: 750
	height: 1222
	parent: bar
	y: 112
	backgroundColor: "#FAFAFA"
	opacity: 1

# Bookmarks
bookmarkBlock = new ScrollComponent
	width: 750
	height: 196
	parent: bar
	y: 112 + 24*2
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
	item.on Events.Click, ->
		changeSite()
		globalNavigation.snapToPage(blankPage)

back_button = new Layer width: 455, height: 58, x: 50, y: 124, backgroundColor: "rgba(0,0,0,0)", parent: bar
back = new Layer width: 358, height: 34, y: 29, image: "images/back.png", opacity: 0, parent: back_button



# Zen Views
zenBoard = new ScrollComponent
	parent: contentBackground
	height: 1039
	width: 327*2
	y: 112
	x: 24*2
	scrollHorizontal: false
	scrollVertical: false
	contentInset:
		top: bookmarkBlock.height
	propagateEvents: false


zen_item_1 = new Layer width: 654, height: 480, x: 0, y: 512, image: "images/zen item 1.png"
zen_item_2 = new Layer width: 654, height: 480, x: 0, y: 1024, image: "images/zen item 2.png"
zen_item_3 = new Layer width: 654, height: 480, x: 0, y: 0, image: "images/zen item 3.png"

zen_items = [zen_item_1, zen_item_2, zen_item_3]
for item in zen_items
	item.parent = zenBoard.content

# Zen Behaviour
omniBgHeight = 112
zenValueThreshold = -164
zenScrollBoundsTop = [0, 240]
zenScrollTopOutput = [omniBgHeight + 24*2, omniBgHeight + 24*2 - 100]
zenScrollTopOutputTop = [omniBgHeight + 24*2, omniBgHeight + 24*2 - 200]
isZenScrollDone = false

zenBoard.on Events.Move, ->
# 	print zenBoard.scrollY + " " + logCounter++
	if !isZenScrollDone
		keyboard.states.switch("hidden", curve: tightSpring)
		showBaseOmniBar()
	
	
	if zenBoard.scrollY <= 0
		bookmarkBlock.y = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, zenScrollTopOutput)
	else
		bookmarkBlock.y = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, zenScrollTopOutputTop, true)
		bookmarkBlock.opacity = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, [1, 0], true)
		back.opacity = 0
	
	if zenBoard.scrollY > zenScrollBoundsTop[1]
		back.opacity = 1
	
	isZenScrollDone = true

# Omnibox


omni_bg = new Layer width: 750, height: 112, x: 0, y: 0, image: "images/omni bg.png", parent: bar

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



# Keyboard
keyboardHiddenOffset = 1334
keyboard = new Layer width: 750, height: 432, x: 0, y: 902, image: "images/keyboard.png"
keyboard.states =
	"hidden": { y: keyboardHiddenOffset }
keyboard.states.switchInstant("hidden")

# Create Tabs Scroll
scrollView = null
createScroll = () ->
# 	print scrollView
	if scrollView != null
		return scrollView
	else
		scrollView = new PageComponent
			width: 375*2
			height: 410*2
			y: 141*2
			scrollVertical: false
		
		scrollView.placeBehind(globalNavigation)
		
		blankPageLeft = new Layer
			width: 64*2
			height: 820
			parent: scrollView.content
			backgroundColor: "null"
		
		for item, i in [0, 1, 2, 3, 4]
			if i == 1
				site_in_tab = new Layer width: 494, height: 820, image: "images/site in tab.png", x: (247+8)*2 + 64*2, parent: scrollView.content
				site_in_tab.on Events.Click, (event, layer) ->
					if scrollView.currentPage is layer
						createTab("tabs")
			else
				siteItem = new Layer
					width: 247*2
					height: 410*2
					x: i*(247+8)*2 + 64*2
					name: "#{i}"
					backgroundColor: "white"
					parent: scrollView.content
					borderRadius: 4*2
		
		blankPageRight = new Layer
			width: 64*2
			height: 820
			x: 5*(247+8)*2 + 64*2
			parent: scrollView.content
			backgroundColor: "null"
		
		
		scrollView.snapToPage(
			site_in_tab
			false
			animationOptions = curve: "ease", time: 2
		)

# Create Current Tab
site_mask = null
site_1 = null
flag = true

tabHandler = (event, layer) ->
	localParent = site_mask
	nextState = ""
	
	if flag then nextState = "tabs"	
	else nextState = "site"	
	flag = !flag
		
	for item in [site_1, site_mask]
		item.states.switch(nextState, curve: tightSpring)
	
	Utils.delay 0.5, ->
		if localParent.states.current.name is "tabs"
			localParent.destroy()


createTab = (startStateName) ->
	if startStateName is "site" then flag = true
	else flag = false
	
	site_mask = new Layer
		parent: tempView
		backgroundColor: "rgba(0,0,0,1)", clip: true
		
	site_mask.placeBehind(globalNavigation)
	site_mask.states.add {
		site: { width: 750, height: 1294, x: 0, y: 40, borderRadius: 0}
		tabs: { width: 494, height: 820, x: 128, y: 282, borderRadius: 8}
	}
	site_mask.states.switchInstant startStateName


	site_1 = new Layer x: 0, y: 0, image: "images/site 1.png", parent: site_mask
	site_1.states.add {
		site: { width: 750, height: 1294}
		tabs: { width: 494, height: 852}
	}
	site_1.states.switchInstant startStateName
	
	
# 	site_1.on Events.Click, (event, layer) ->
# 		tabHandler(event, layer)
	
	if startStateName is "tabs"
		tabHandler(null, site_1)

createScroll()
createTab("site")

# Navigation handlers
globalNavigation.on "change:currentPage", ->
	isZenScrollDone = false
	if globalNavigation.currentPage is bar
		zenBoard.scrollVertical = true
	else 
		zenBoard.scrollVertical = false
		showBaseOmniBar()
		keyboard.states.switch("hidden", curve: tightSpring)


omnibarHandler = (event, layer) ->
	isZenScrollDone = false
	showSearchOmniBar()
	keyboard.states.switch("default", curve: tightSpring)
	globalNavigation.snapToPage(bar)
	cancel.on(Events.Click, cancelHandler)

cancelHandler = (event, layer) ->
	showBaseOmniBar()
	keyboard.states.switch("hidden", curve: tightSpring)
	cancel.off(Events.Click, cancelHandler)

tabs_icom.propagateEvents = false
tabs_icom.on Events.Click, ->
	return
# 	print "ok?"
	valueToHide = barOffset + 200
	if globalNavigation.currentPage is bar
		valueToHide = barOffset + bar.height
		
# 	print valueToHide + " " + logCounter++
	
	globalNavigation.ignoreEvents = true
	
	darker.animate
		properties:
			opacity: 0
		curve: tightSpring
	
	bar.animate
		properties: 
			y: valueToHide
		curve: tightSpring
	
	tabHandler()
	
	Utils.delay 0.5, ->
		globalNavigation.destroy()
	
	
	
# 	bar.states.switch("hidden", curve: tightSpring)

blankPage.on Events.Click, ->
	showBaseOmniBar()
	keyboard.states.switch("hidden", curve: tightSpring)
	globalNavigation.snapToPage(blankPage)


pagesBounds = [0, 1075]
globalNavigation.on Events.Scroll, ->
	darker.opacity = Utils.modulate(globalNavigation.scrollY, pagesBounds, [0, 0.6])


back_button.on Events.Click, ->
	zenBoard.scrollToPoint(
		x: 0, y: 0
		true
		curve: tightSpring
		time: 0.2
	)
	


omnibarClickAreas = [search_bar_bg, search_bar_shape]
for item in omnibarClickAreas
	item.on(Events.Click, omnibarHandler)


for item in [darker, scrollView, site_mask, globalNavigation, keyboard]
	item.parent = tempView
	item.bringToFront()

statusBar = new Layer
	parent: screen, width: screen.width, height: 30, backgroundColor: "black"