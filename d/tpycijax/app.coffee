
barView = null
contentView = null
staticView = null
zenView = null


screen = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"



openedSiteHeight = 622*2
openedSiteWidth = 750

openedSite = new ScrollComponent
	width: 750
	height: openedSiteHeight

openedSite.states =
	"site": { scale: 1 }
	"tabs": { scale: 0.66 }

openedSite.states.switchInstant("site")

openedSite.animationOptions = 
	curve: "spring(200, 20, 0)"



button = new Layer
	width: 200
	height: 200
	borderRadius: "100%"

openedSiteContent = new Layer
	width: 374*5
	height: 664*5
	image: "images/Screen Shot 2016-11-15 at 3.33.25 PM.png"
	parent: openedSite.content



# Create Bar View
createBarView = () ->
	if barView != null
		return barView
	
	barView = new Layer
		y: 40*2
		width: 750
		height: 667*2+100
# 		backgroundColor: "rgba(255,255,255,0.4)"
		backgroundColor: "transparent"
		borderRadius: 16
		clip: true
		style:
			"-webkit-backdrop-filter": "blur(30px)"
	
	contentView = new Layer
		parent: barView
		width: 750
		height: 1142
		y: 112
		backgroundColor: "#EEE"
		clip: true
# 		scrollHorizontal: false
# 		scrollVertical: false
# 		propagateEvents: true
	
	createZenView()
	createBookmarkView()
	createOmniBox()
	
	barView.on(Events.DragEnd, barViewDragEndHandler)
	barView.on(Events.StateSwitchEnd, barViewStateSwitchEndHandler)
	
	barView.draggable.enabled = true
	barView.draggable.speedX = 0
	barView.draggable.momentum = false
	
	barView.draggable.constraints =
		y: 80
		x: 0
		width: 750
		height: 1334+1220+20
	
	barView.states = 
		"opened": { y: 80 }
		"search": { y: 500 }
		"hidden": { y: 1220 }
	barView.states.switchInstant("hidden")
	
	barView.animationOptions =
		curve: "spring(400,50,0)"
	
# 	barView.on Events.Click, ->
# 		print barView.y
	
# 	barView.on Events.DragMove, ->
	# 	bar.draggable.momentum = true
	
# 	barView.on Events.DragMove, ->
	# 	bar.draggable.momentum = true
	# 	print bar.draggable.direction
	
	
		


barViewDragEndHandler = (event, layer) ->
	if barView.y < 130
			barView.states.switch("opened")
		if barView.y > 130 and barView.draggable.direction == "down"
			barView.states.switch("hidden")
		else if barView.y < 950 and barView.draggable.direction == "up"
			barView.states.switch("opened")
		else if barView.y < 1220
			barView.states.switch("opened")
		else
			print "alarm"
			barView.states.switch("hidden")

barViewStateSwitchEndHandler = (fromState, toState) ->
# 	print fromState, toState
		
	if toState is "opened"
# 		contentView.propagateEvents = false
# 		contentView.scrollVertical = true
		zenView.scrollVertical = true
		
		
	else if toState is "hidden"
# 		contentView.propagateEvents = true
# 		contentView.scrollVertical = false
		zenView.scrollVertical = false
	
# Create Bookmark View
createBookmarkView = () ->
	staticView = new Layer
		width: 750
		height: 548
		parent: contentView
		backgroundColor: "transparent"
	
	bookmarkView = new ScrollComponent
		width: 750
		height: 400
		parent: staticView
		y: 94
		scrollVertical: false
		propagateEvents: false
		contentInset:
			top: 0
			right: 0
			bottom: 0
		
	bookmark_4 = new Layer width: 334, height: 400, x: 1050, y: 0, image: "images/bookmark 4.png"
	bookmark_3 = new Layer width: 334, height: 400, x: 700, y: 0, image: "images/bookmark 3.png"
	bookmark_2 = new Layer width: 334, height: 402, x: 350, y: 0, image: "images/bookmark 2.png"
	bookmark_1 = new Layer width: 334, height: 402, x: 0, y: 0, image: "images/bookmark 1.png"

	bookmark_blank = new Layer width: 32, height: 400, x: 1494-588+32+286, backgroundColor: "transparent", parent: bookmarkView.content
	
	bookmarks = [bookmark_1, bookmark_2, bookmark_3, bookmark_4]
	for item in bookmarks
		item.x = item.x + 32
		item.parent = bookmarkView.content
		item.on Events.Click, ->
# 			globalNavigation.snapToPage(blankPage)

	under_others = new Layer width: 294, height: 64, x: 300, y: 526, image: "images/under others.png", parent: staticView
	under_new_button = new Layer width: 252, height: 64, x: 32, y: 526, image: "images/under new button.png", parent: staticView
# 	under_new_button.on(Events.Click, openNewTabHandler)
	fixLocalHeights = [under_new_button, under_others, bookmarkView]
	for item in fixLocalHeights
		item.y = item.y - 76
	
	
# 	bookmarkView.on Events.Click, ->
# 		print "ksd"

# Create Zen View
zenScrollBoundsTop = [0, 300]
# zenFixValue = 100
zenScrollTopOutput = [0, 0 - 300]
zenScrollTopOutputTop = [0, -300]
isZenScrollDone = false

createZenView = () ->
	localZenAdder = 76
	
	zenView = new ScrollComponent
		parent: contentView
		height: 1142
		width: 343*2
		x: 16*2
		scrollHorizontal: false
		scrollVertical: false
		contentInset:
			top: 628 - localZenAdder
		propagateEvents: false
	
	zenView.on(Events.Move, zenHandler)
# 	zenView.placeBehind(contentView)
	
	
# 	zenBlank = new Layer width: 686, height: 200, parent: zenView.content, 
	titletwo = new Layer width: 686, height: 76, x: 32, y: 0, image: "images/titleTwo.png", parent: zenView.content
	zen_item_1 = new Layer width: 686, height: 824, x: 0, y: 0 + localZenAdder, image: "images/zen item 1.png", parent: zenView.content
	zen_item_2 = new Layer width: 686, height: 820, x: 0, y: 856 + localZenAdder, image: "images/zen item 2.png", parent: zenView.content
	zen_item_3 = new Layer width: 686, height: 824, x: 0, y: 1708 + localZenAdder, image: "images/zen item 3.png", parent: zenView.content

	zen_item_blank = new Layer width: 686, height: 140, x: 0, y: 1712+766+32, backgroundColor: "transparent", parent: zenView.content




zenHandler = (event, layer) ->
# 	if !isZenScrollDone
# # 		keyboard.states.switch("hidden", curve: keyboardSpring)
# 		if isCurrentGlobalModeSite
# 			showBaseOmniBar()
# 		else
# 			showNewTabBar()
	
	if zenView.scrollY <= 0
		staticView.y = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, zenScrollTopOutput, false)
	else
		staticView.y = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, zenScrollTopOutputTop, true)
		staticView.opacity = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, [1, 0], true)
	
	isZenScrollDone = true












flag = true
button.on Events.Click, ->
	if flag then openedSite.states.switch("tabs")
	else openedSite.states.switch("site")
	flag = !flag

openedSite.on Events.StateSwitchStart, (from, to) ->
	if to is "tabs"
		openedSite.scrollVertical = false
		openedSite.scrollHorizontal = false
	else
		openedSite.scrollVertical = true
		openedSite.scrollHorizontal = true

# openedSite.on Events.StateSwitchEnd, (state) ->
# 	print openedSite.x





# Omnibox
omni_bg = null
omni_bar_elems = []

createOmniBox = () ->
	if barView == null
		print "barView is null"
		return
	
	omni_bg = new Layer width: 750, height: 112, x: 0, y: 0, image: "images/omni bg.png", parent: barView
	search_bar_bg = new Layer width: 240, height: 72, x: 24, y: 20, borderRadius: 4, backgroundColor: "rgba(216,216,216,1)"

	search_bar_shape = new Layer width: 400, height: 72, y: 20, image: "images/search bar shape.png"
	search_bar_shape.states.add {
		base: { x: 242}
		search: { x: 184}
		new_tab: { x: 242}
	}
	search_bar_shape.states.switchInstant "base"
	
	clear = new Layer width: 28, height: 28, y: 42, image: "images/clear.png"
	
	clear.states.add {
		base: { x: 582, opacity: 0}
		search: { x: 526, opacity: 1}
		new_tab: { x: 526, opacity: 0}
	}
	clear.states.switchInstant "base"
	
	refresh_icon = new Layer width: 28, height: 34, y: 36, image: "images/refresh icon.png"
	
	refresh_icon.states.add {
		base: { x: 582, opacity: 1}
		search: { x: 524, opacity: 0}
		new_tab: { x: 584, opacity: 0}
	}
	refresh_icon.states.switchInstant "base"
	
	cancel = new Layer width: 98, height: 28, y: 40, image: "images/cancel.png"
	
	cancel.states.add {
		search: { x: 618, opacity: 1}
		base: { x: 646, opacity: 0}
		new_tab: { x: 618, opacity: 0}
	}
	cancel.states.switchInstant "base"
	
	tabs_icom = new Layer width: 46, height: 54, y: 28, image: "images/tabs icom.png"
	
	tabs_icom.states.add {
		base: { x: 674, opacity: 1}
		search: { x: 634, opacity: 0}
		new_tab: { x: 674, opacity: 1}
	}
	tabs_icom.states.switchInstant "base"
	
	focustext = new Layer height: 36, y: 38, backgroundColor: "rgba(184,201,219,1)"
	
	focustext.states.add {
		base: { width: 248, x: 202, opacity: 0}
		search: { width: 332, x: 40, opacity: 1}
		new_tab: { width: 332, x: 116, opacity: 0.0}
	}
	focustext.states.switchInstant "base"
	
	address = new Layer width: 236, height: 34, y: 42, image: "images/address.png"
	
	address.states.add {
		base: { x: 208, opacity: 1}
		search: { x: 132, opacity: 1}
		new_tab: { x: 208, opacity: 0.0}
	}
	address.states.switchInstant "base"

	
	ready_for_search = new Layer width: 270, height: 28, y: 44, image: "images/ready for search.png"
	
	ready_for_search.states.add {
		base: { x: 194, opacity: 0}
		search: { x: 154, opacity: 0}
		new_tab: { x: 194, opacity: 1}
	}
	ready_for_search.states.switchInstant "base"
	
	http = new Layer width: 90, height: 32, y: 42, image: "images/http.png"	
	http.states.add {
		base: { x: 118, opacity: 0}
		search: { x: 42, opacity: 1}
		new_tab: { x: 118, opacity: 0.0}
	}
	http.states.switchInstant "base"
	
	
	protect_icon = new Layer width: 24, height: 32, x: 48, y: 40, image: "images/protect icon.png"
	
	protect_icon.states.add {
		base: { opacity: 1}
		search: { opacity: 0}
		new_tab: { opacity: 0}
	}
	protect_icon.states.switchInstant "base"
	
	
	
	# Tabs button
	tabs_button = new Layer x: 638, height: 110, width: 112, backgroundColor: "transparent"
	tabs_button.states.add {
		search: { x: 750 }
		base: { x: 638 }
		new_tab: { x: 638 }
	}
	tabs_button.states.switchInstant "search"
	
# 	omni_bg.on(Events.DragEnd, barViewDragEndHandler)
	
	
	omni_bar_elems = [search_bar_bg, search_bar_shape, focustext, address, http, cancel, tabs_button, tabs_icom, refresh_icon, clear, protect_icon, ready_for_search]

	for item in omni_bar_elems
		item.parent = omni_bg
		try
			if isCurrentGlobalModeSite
				item.states.switchInstant("base")
			else
				item.states.switchInstant("new_tab")
		catch error


showSearchOmniBar = () ->
# 	print "Search Omni"
	for item in omni_bar_elems
		try
			item.states.switch("search", time: 0.2)
		catch error

showBaseOmniBar = () ->
# 	print "Base Omni"
	for item in omni_bar_elems
		try
			item.states.switch("base", time: 0.2)
		catch error

showNewTabBar = () ->
# 	print "New Tab Omni"
	for item in omni_bar_elems
		try
			item.states.switch("new_tab", time: 0.2)
		catch error


createBarView()

for item in [openedSite, button, barView]
	item.parent = tempView

button.x = Align.center
button.y = Align.center(-60)