
screen = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"


logCounter = 0

tightSpring = "spring(200, 20, 10)"
newTabSpring = "spring(400, 10, 10)"
keyboardSpring = "spring(180, 20, 10)"
fakeTabsDelay = 0.4

barOffset = 612*2
barShowBookmarksOffset = 148*2
barOpenedOffset = (20+16)*2

# Understand is this bar for site or for serp
isCurrentGlobalModeSite = true
isNewTabAlreadyOpened = false
isCurrentContextTabs = false

# Global references
globalNavigation = null
bar = null
blankPage = null
zenBoard = null
bookmarkBlock = null
site_buttons_secondary = null
darker = null
blankPageRight = null

omni_bg = null
search_bar_bg = null
search_bar_shape = null
tabs_icom = null
cancel = null
back = null
tabs_button = null
tabs_buttons = null
return_site_button = null
new_tab_mask = null
new_tab = null
site_in_tab = null

omni_bar_elems = []
omnibarClickAreas = []

# delete soon
back_button = null
site_mask = null
site_1 = null
new_tab = null
localLogo = null
staticBlock = null
under_others = null
under_new_button = null




# Keyboard
keyboardHiddenOffset = 1334
keyboard = new Layer width: 750, height: 432, x: 0, y: 902, image: "images/keyboard.png", propagateEvents: false
keyboard.states =
	"hidden": { y: keyboardHiddenOffset }
keyboard.states.switchInstant("hidden")

# A page to show globalNavigation in 2 or 3 states
baseSize = 1220
serpBlankPage = new Layer
	width: 750
	height: 1224-baseSize
	y: baseSize+126
	backgroundColor: "transparent"
	parent: keyboard

# Status Bar
yandex_bg = new Layer width: 750, height: 1334, x: 0, y: 0, image: "images/yandex bg.png"

tabs_buttons = new Layer width: 658, height: 1218, x: 46, y: 74, image: "images/tabs buttons.png", parent: darker, opacity: 1, parent: yandex_bg, opacity: 0
new_tab_button = new Layer width: 74, height: 72, x: 340-tabs_buttons.x, y: 1238-tabs_buttons.y, image: "images/new tab button.png", parent: tabs_buttons
return_site_button = new Layer width: 46, height: 54, x: 674-tabs_buttons.x, y: 1246-tabs_buttons.y, image: "images/return site button.png", parent: tabs_buttons


logo = new Layer width: 216, height: 82.70260539545171, x: 268, y: 216, image: "images/logo.png", parent: yandex_bg, opacity: 0
logo.states =
	"shown": { y: 216, opacity: 1 }
	"hidden": { y: 216, opacity: 0 }
	"tabs": { y: 360, opacity: 1}

serp_content = new Layer width: 686, height: 724, x: 32, y: 426, image: "images/serp content.png", parent: yandex_bg
serp_content.states = 
	"shown": { y: 426, opacity: 1 }
	"hidden": { y: 426+200, opacity: 0 }
serp_content.states.switchInstant("hidden")

darker = new Layer width: 750, height: 1334, backgroundColor: "rgba(0,0,0,0)"
status_bar_bg = new Layer width: 750, height: 40, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1)"
status_bar_bg.states.add {
	site: { opacity: 1}
	tabs: { opacity: 0.0}
}
status_bar_bg.states.switchInstant "site"
status_bar = new Layer width: 728, height: 24, x: 12, y: 10, image: "images/status bar.png", parent: status_bar_bg

# Handlers
omniBgHeight = 112
zenValueThreshold = -164
zenScrollBoundsTop = [0, 300]
zenFixValue = 100
zenScrollTopOutput = [0, 0 - 300]
zenScrollTopOutputTop = [0, -300]
isZenScrollDone = false

zenHandler = (event, layer) ->
	if !isZenScrollDone
		keyboard.states.switch("hidden", curve: keyboardSpring)
		if isCurrentGlobalModeSite
			showBaseOmniBar()
		else
			showNewTabBar()
	
	if zenBoard.scrollY <= 0
		staticBlock.y = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, zenScrollTopOutput, false)
	else
		staticBlock.y = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, zenScrollTopOutputTop, true)
		staticBlock.opacity = Utils.modulate(zenBoard.scrollY, zenScrollBoundsTop, [1, 0], true)
	
	isZenScrollDone = true




navigationPageChangeHandler = (event, layer) ->
	if isCurrentGlobalModeSite
		darker.opacity = 1
	
	isZenScrollDone = false
	if globalNavigation.currentPage is bar
		zenBoard.scrollVertical = true
		zenBoard.animate { properties: { y: 0 }, curve: tightSpring }
		under_others.opacity = 1
		under_new_button.opacity = 1
	
	else if globalNavigation.currentPage is blankPage
		zenBoard.scrollVertical = false
		zenBoard.animate { properties: { y: 0 }, curve: tightSpring }
		under_others.opacity = 1
		under_new_button.opacity = 1
		
		Utils.delay 0.2, ->
			globalNavigation.placeBehind(keyboard)
		
		if isCurrentGlobalModeSite
			showBaseOmniBar()
		else
			showNewTabBar()
		
		keyboard.states.switch("hidden", curve: keyboardSpring)
		if isCurrentGlobalModeSite
			hideAdditionalBookmarkButtons(true, 0.2)
		else
			hideAllBookmarkButtons(true)
	
	else if globalNavigation.currentPage is serpBlankPage and serpBlankPage
		under_others.opacity = 0
		under_new_button.opacity = 0
		zenBoard.animate { properties: { y: -100 }, curve: tightSpring }
		zenBoard.scrollVertical = false
		
		hideAllBookmarkButtons(true)
		if isCurrentGlobalModeSite
			showBaseOmniBar()
		else
			showNewTabBar()
		keyboard.states.switch("hidden", curve: keyboardSpring)





omnibarHandler = (event, layer) ->
	isZenScrollDone = false
	
	if isCurrentGlobalModeSite
		showSearchOmniBar()
		cancel.on(Events.Click, cancelHandler)
	else
		logCounter++
	
	if !isCurrentGlobalModeSite
		hideAllBookmarkButtons(false)
	else if globalNavigation.currentPage is blankPage
# 		print "here"
		showAdditionalBookmarkButtons(false)
# 		site_buttons_secondary.opacity = 1
	else
		showAdditionalBookmarkButtons(true)
	
	keyboard.states.switch("default", curve: keyboardSpring)
	globalNavigation.snapToPage(bar)



cancelHandler = (event, layer) ->
	
	if isCurrentGlobalModeSite
		showBaseOmniBar()
	else
		logCounter++
	
	if !isCurrentGlobalModeSite
		hideAllBookmarkButtons(false)
	else if globalNavigation.currentPage is bar
		hideAdditionalBookmarkButtons(true)
	
	keyboard.states.switch("hidden", curve: keyboardSpring)
	cancel.off(Events.Click, cancelHandler)



blankPageHander = (event, layer) ->
	if isCurrentGlobalModeSite
		showBaseOmniBar()
	
	keyboard.states.switch("hidden", curve: keyboardSpring)
	globalNavigation.snapToPage(blankPage)



showTabsHandler = (event, layer) ->
	scrollView = createScroll()
	serpBlankPage.parent = keyboard
	
	globalNavigation.ignoreEvents = true
	serp_content.states.switch("hidden", curve: tightSpring)
	
	valueToHide = barOffset + 200
	if globalNavigation.currentPage is bar
		valueToHide = barOffset + bar.height
	
	darker.animate
		properties: { opacity: 0 }
		curve: tightSpring
	
	bar.animate
		properties: { y: valueToHide }
		curve: tightSpring
	
	showTabs()
	
	Utils.delay 0.5, ->
		if globalNavigation != null
			globalNavigation.destroy()
			globalNavigation = null


pagesBounds = [0, 1075]
siteDarkerHandler = () ->
	localValue = Utils.modulate(globalNavigation.scrollY, pagesBounds, [0, 0.6])
	darker.backgroundColor = "rgba(0,0,0, " + localValue  + ")"


# Navigation View
globalNavigationOffset = 300

createGlobalNavigation = () ->
	if globalNavigation != null
		return globalNavigation
	
# 	localValue = 10+200
# 	placeZenBlock = 352*2 - localValue
# 	placeBookmarksBlock = 47*2 - localValue
# 	placeButtonsBlock = 246*2 - localValue
# 	placeTitleOneBlock = 9*2 - localValue
# 	placeTitleTwoBlock = 300*2 - localValue
	
	
	# General Init
	globalNavigation = new PageComponent
		parent: tempView
		width: 750
		height: 1334+100
		y: globalNavigationOffset 
		scrollHorizontal: false
		animationOptions: 
			curve: tightSpring
			time: 0.4
	
	globalNavigation.states =
		"shown": { y: 0 }
	
	globalNavigation.states.switch("shown", curve: tightSpring)
	
	# Init empty page for pages
	blankPage = new Layer
		parent: globalNavigation.content
		width: 750
		height: 1224
		backgroundColor: "transparent"
		visible: false
		ignoreEvents: true

	
	# Main content place	
	bar = new Layer
		width: 750
		height: 667*2-32
		y: barOffset
		parent: globalNavigation.content
		borderRadius: 16
		clip: true
		style: {"-webkit-filter": "drop-shadow(0px 0px 4px rgba(0,0,0,0.2))"}
	
	# Place for content
	contentBackground = new Layer
		width: 750
		height: 1222
		parent: bar
		y: 112
		backgroundColor: "#E3EAE8"
		opacity: 1
	
	
	staticBlock = new Layer
		width: 750
		height: 700
		parent: contentBackground
		backgroundColor: "transparent"
	
	# Bookmarks
	bookmarkBlock = new ScrollComponent
		width: 750
		height: 400
		parent: staticBlock
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

	bookmark_blank = new Layer width: 32, height: 400, x: 1494-588+32+286, backgroundColor: "transparent", parent: bookmarkBlock.content
# 	site_buttons_main = new Layer width: 200, height: 368, x: 388, y: 0, image: "images/site buttons main.png"
# 	site_buttons_secondary = new Layer width: 388, height: 368, x: 0, y: 0, image: "images/site buttons secondary.png"

	
# 	bookmarkBlock.on Events.ScrollEnd, ->
# 		if bookmarkBlock.scrollX < 160 and bookmarkBlock.direction is "right"
# 			bookmarkBlock.scrollToPoint({ x: 320, y: 0 }, true, curve: tightSpring)
# 		else if bookmarkBlock.scrollX < 340 and bookmarkBlock.direction is "left"
# 			bookmarkBlock.scrollToPoint({ x: 32, y: 0 }, true, curve: tightSpring)
	
	bookmarks = [bookmark_1, bookmark_2, bookmark_3, bookmark_4]
	for item in bookmarks
		item.x = item.x + 32
		item.parent = bookmarkBlock.content
# 		if item != site_buttons_main and item != site_buttons_secondary
		item.on Events.Click, ->
			globalNavigation.snapToPage(blankPage)
# 		else if item is site_buttons_main
# 			site_buttons_main.on(Events.Click, openNewTabHandler)
	
# 	bookmarkBlock.scrollToPoint({ x: 320, y: 0 }, false, curve: "linear")


	under_others = new Layer width: 294, height: 64, x: 300, y: 526, image: "images/under others.png", parent: staticBlock
	under_new_button = new Layer width: 252, height: 64, x: 32, y: 526, image: "images/under new button.png", parent: staticBlock
	under_new_button.on(Events.Click, openNewTabHandler)
# 	titleone = new Layer width: 686, height: 76, x: 32, y: 18, image: "images/titleOne.png", parent: staticBlock



	# Zen Views
	zenBoard = new ScrollComponent
		parent: contentBackground
		height: 1096
		width: 343*2
		x: 16*2
		scrollHorizontal: false
		scrollVertical: false
		contentInset:
			top: 628
		propagateEvents: false
	
	zenBoard.placeBehind(staticBlock)
	
	localZenAdder = 76
# 	zenBlank = new Layer width: 686, height: 200, parent: zenBoard.content, 
	titletwo = new Layer width: 686, height: 76, x: 32, y: 0, image: "images/titleTwo.png", parent: zenBoard.content
	zen_item_1 = new Layer width: 686, height: 824, x: 0, y: 0+localZenAdder, image: "images/zen item 1.png", parent: zenBoard.content
	zen_item_2 = new Layer width: 686, height: 820, x: 0, y: 856+localZenAdder, image: "images/zen item 2.png", parent: zenBoard.content
	zen_item_3 = new Layer width: 686, height: 824, x: 0, y: 1708+localZenAdder, image: "images/zen item 3.png", parent: zenBoard.content

	
	zen_item_blank = new Layer width: 686, height: 140, x: 0, y: 1712+766+32, backgroundColor: "transparent", parent: zenBoard.content

	fixLocalHeights = [under_new_button, under_others, bookmarkBlock]
	for item in fixLocalHeights
		item.y = item.y - 76
	
	zenBoard.contentInset =
		top: 628-76

# Omnibox

createOmniBox = () ->
	omni_bg = new Layer width: 750, height: 112, x: 0, y: 0, image: "images/omni bg.png", parent: bar
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

	
	
	omni_bar_elems = [search_bar_bg, search_bar_shape, focustext, address, http, cancel, tabs_button, tabs_icom, refresh_icon, clear, protect_icon, ready_for_search]

	for item in omni_bar_elems
		item.parent = omni_bg
		try
			if isCurrentGlobalModeSite
				item.states.switchInstant("base")
			else
				item.states.switchInstant("new_tab")
		catch error
	
	



showAdditionalBookmarkButtons = (isAnimated, localDelay) ->
# 	if localDelay != null
# 		bookmarkBlock.scrollToPoint({ x: 0, y: 0 }, isAnimated, curve: tightSpring, delay: localDelay)
# 	else
# 		bookmarkBlock.scrollToPoint({ x: 0, y: 0 }, isAnimated, curve: tightSpring)

hideAdditionalBookmarkButtons = (isAnimated, localDelay) ->
# 	if localDelay != null
# 		bookmarkBlock.scrollToPoint({ x: 320, y: 0 }, isAnimated, curve: tightSpring, delay: localDelay)
# 	else
# 		bookmarkBlock.scrollToPoint({ x: 320, y: 0 }, isAnimated, curve: tightSpring)

hideAllBookmarkButtons = (isAnimated, localDelay) ->
# 	if localDelay != null
# 		bookmarkBlock.scrollToPoint({ x: (294-16)*2, y: 0 }, isAnimated, curve: tightSpring, delay: localDelay)
# 	else
# 		bookmarkBlock.scrollToPoint({ x: (294-16)*2, y: 0 }, isAnimated, curve: tightSpring)


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




initBar = () ->
	createGlobalNavigation()
	globalNavigation.on("change:currentPage", navigationPageChangeHandler)
	globalNavigation.on(Events.Scroll, siteDarkerHandler)
	blankPage.on(Events.Click, blankPageHander)
	keyboard.placeBefore(globalNavigation)
	
	createOmniBox()
	zenBoard.on(Events.Move, zenHandler)

# 	back_button.on(Events.Click, backToTabsHandler)
# 	tabs_icom.on(Events.Click, showTabsHandler)
	tabs_button.on(Events.Click, showTabsHandler)
	
	omnibarClickAreas = [search_bar_bg, search_bar_shape]
	for item in omnibarClickAreas
		item.on(Events.Click, omnibarHandler)


returnSiteHandler = (event, layer) ->
	if scrollView != null
		if scrollView.currentPage is site_in_tab
			isCurrentGlobalModeSite = true
			showTab()
		else if scrollView.currentPage is new_tab
			isCurrentGlobalModeSite = false
			showTab()


openNextTabHandlerFromTabs = (event, layer) ->
	isCurrentGlobalModeSite = false
	if isNewTabAlreadyOpened
		initBar()
		openNewTabHandler()
		
		scrollView.animate { properties: { x: -200 }, curve: "linear", time: 0.2 }
		tabs_buttons.animate { properties: {opacity: 0}, curve: tightSpring}
		logo.states.switch("shown", curve: tightSpring)
		new_tab_mask.opacity = 1
		new_tab_mask.states.switch("site", curve: tightSpring)
		
		return
	
	isNewTabAlreadyOpened = true
	
	
	
	new_tab = new Layer width: 494, height: 820, x: blankPageRight.x, borderRadius: 8, backgroundColor: "rgba(250,250,250,0.08)", borderWidth: 4, borderColor: "rgba(255,255,255,0.5)", opacity: 0
	
	localLogo = logo.copy()
	localLogo.parent = new_tab
	localLogo.y = 37*2
	localLogo.opacity = 1
	localLogo.x = 136
	logo.states.switchInstant("hidden")

			
	new_tab.on Events.Click, (event, layer) ->
		if scrollView.currentPage is layer
			isCurrentGlobalModeSite = false
			showTab()
	
	new_tab.parent = scrollView.content
	blankPageRight.x = blankPageRight.x + (247+8)*2
	scrollView.updateContent()
	
	new_tab.animate { properties: { opacity: 1}, curve: tightSpring }
	scrollView.snapToPage(new_tab, curve: tightSpring)
	localLogo = null

	
	Utils.delay fakeTabsDelay*2, ->
		tabs_buttons.animate { properties: {opacity: 0}, curve: tightSpring}
		logo.states.switch("shown", curve: tightSpring)
		
		new_tab.opacity = 0
		new_tab = null
		
		createSerpTab("tabs")
		new_tab_mask.states.switch("site", curve: tightSpring)
		
		initBar()
		serpBlankPage.parent = globalNavigation.content
		scrollView.animate { properties: { x: -200 }, curve: "linear", time: 0.2 }
		Utils.delay 0.3, ->
			scrollView = null
		
		logo.states.switch("shown", curve: tightSpring)
		darker.animate { properties: { opacity: 0.4 }, time: 0.2 }
		globalNavigation.snapToPage(serpBlankPage, curve: tightSpring)
		showSerpContent()

		
# 	showSerpContent()

openNewTabHandler = (event, layer) ->
	isCurrentGlobalModeSite = false
	isNewTabAlreadyOpened = true
	
	scrollView = null
	site_in_tab = null
	scrollView = createScroll()
	
	showNewTabBar()
	createSerpTab("site")
	
	serpBlankPage.parent = globalNavigation.content
	globalNavigation.snapToPage(serpBlankPage, curve: "spring(100, 50, 10)", delay: 0.3)
	
	if site_mask != null
		site_mask.states.switch("serp_shown", curve: "spring(200, 30, 10)")
	
	logo.states.switch("shown", curve: tightSpring)
	darker.animate { properties: { opacity: 0.4 }, time: 0.2 }
	showSerpContent()


showSerpContent = () ->
	serp_content.states.switch("shown", curve: tightSpring)



# Create Tabs Scroll
scrollView = null
createScroll = () ->
	if scrollView != null
		scrollView.destroy()
		scrollView = null
	
	scrollView = new PageComponent
		parent: tempView
		width: 375*2
		height: 410*2
		y: 141*2
		x: -200
		scrollVertical: false
		opacity: 0
	
	scrollView.placeBehind(globalNavigation)
	
	
	
	
# 	localSitePlace = 3
# 	if isCurrentGlobalModeSite
# 		localSitePlace = 4
	
	for item, i in [0, 1, 2, 3, 4, 5]
# 		if !isCurrentGlobalModeSite and i == localSitePlace + 1
# 			new_tab = returnNewTabForTabs()
		
# 		else if i == localSitePlace
		if i == 0
			blankPageLeft = new Layer
				width: 64*2
				height: 820
				parent: scrollView.content
				backgroundColor: "null"
		if i == 4
			site_in_tab = new Layer width: 494, height: 820, image: "images/site in tab.png", x: i*(247+8)*2 + 64*2, parent: scrollView.content, opacity: 0
# 			blankPageRight.x = 5*(247+8)*2 + 64*2
			
			site_in_tab.on Events.Click, (event, layer) ->
				if scrollView.currentPage is layer
					isCurrentGlobalModeSite = true
					showTab()
			
		else if i == 5
			blankPageRight = new Layer
				width: 64*2
				height: 820
				x: i*(247+8)*2 + 64*2
				parent: scrollView.content
				backgroundColor: "null"
		else
			siteItem = new Layer
				width: 247*2
				height: 410*2
				x: i*(247+8)*2 + 64*2
				name: "#{i}"
				backgroundColor: "white"
				parent: scrollView.content
				borderRadius: 4*2
	
	
	if isCurrentGlobalModeSite
		scrollView.snapToPage(site_in_tab, false, { animationOptions: { curve: "ease", time: 2 } })
	else
		new_tab = new Layer width: 494, height: 820, x: blankPageRight.x, borderRadius: 8, backgroundColor: "rgba(250,250,250,0.08)", borderWidth: 4, borderColor: "rgba(255,255,255,0.5)", opacity: 0
			
		new_tab.on Events.Click, (event, layer) ->
			if scrollView.currentPage is layer
				isCurrentGlobalModeSite = false
				showTab()
		
		new_tab.parent = scrollView.content
		blankPageRight.x = blankPageRight.x + (247+8)*2
# 		blankPageRight.placeBefore(localTab)
		scrollView.updateContent()
# 		print "re?"
		scrollView.snapToPage(new_tab, false, { animationOptions: { curve: "ease", time: 2 } })
	
	scrollView.placeBefore(yandex_bg)
	scrollView.animate { properties: { x: 0 }, curve: "linear", time: 0.2 }
	return scrollView

# Site pages and Handlers
localCurve = "spring(200, 20, 10)"

# From Tab to tabs
showTabs = () ->
	scrollView.opacity = 1
	scrollView.animate { properties: { x: 0 }, curve: "ease-in-out", time: 0.2 }
	tabs_buttons.animate { properties: { opacity: 1 }, curve: tightSpring }
	keyboard.states.switch("hidden", curve: keyboardSpring)
	
	
	if isCurrentGlobalModeSite
# 		if site_mask != null
		site_mask.states.switch("tabs", curve: localCurve)
		site_1.states.switch("tabs", curve: localCurve)
		
		Utils.delay fakeTabsDelay, ->
			site_in_tab.opacity = 1
			site_mask.opacity = 0
	
	else
		site_in_tab.opacity = 1
		logo.states.switch("tabs", curve: localCurve)
		new_tab_mask.states.switchInstant("site")
		new_tab_mask.opacity = 1
		new_tab_mask.states.switch("tabs", curve: tightSpring)
		
		Utils.delay fakeTabsDelay, ->
			new_tab.opacity = 1
			new_tab_mask.opacity = 0
			
			localLogo = logo.copy()
			localLogo.parent = new_tab
			localLogo.y = 37*2
			localLogo.x = 136
			logo.states.switchInstant("hidden")


# From tabs to Tab
showTab = (event, layer) ->
	initBar()
	tabs_buttons.animate { properties: { opacity: 0 }, curve: tightSpring }
# 	return_site_button.animate { properties: { opacity: 0 }, curve: tightSpring }
	scrollView.animate { properties: { x: -200 }, curve: "ease-in-out", time: 0.2}
	
	if isCurrentGlobalModeSite
		createTab("tabs")
		isNewTabAlreadyOpened = false
		site_mask.states.switch("site", curve: tightSpring)
		site_1.states.switch("site", curve: tightSpring)
		site_in_tab.opacity = 0
		site_mask.opacity = 1
# 		scrollView.animate { properties: { x: -200 }, curve: "linear", time: 0.2 }
	else
		new_tab_mask.opacity = 1
		new_tab.opacity = 0
		
		logo.states.switchInstant("tabs")
		logo.states.switch("shown", curve: tightSpring)
		if new_tab_mask != null
			new_tab_mask.states.switch("site", curve: "spring(200, 20, 10)")
		
		showSerpContent()
		
		
		
		


createSerpTab = (startStateName) ->
	if new_tab_mask != null
		return new_tab_mask
	
	new_tab_mask = new Layer
		parent: tempView
		borderWidth: 4
	
	new_tab_mask.states.add {
		site: { width: 750, height: 1334, x: 0, y: 0, borderRadius: 0, backgroundColor: "rgba(250,250,250,0)", borderColor: "rgba(255,255,255,0)" }
		tabs: { width: 494, height: 820, x: 128, y: 282, borderRadius: 8, backgroundColor: "rgba(250,250,250,0.08)", borderColor: "rgba(255,255,255,0.5)" }
	}
	
	new_tab_mask.states.switchInstant startStateName
	new_tab_mask.placeBehind(darker)



createTab = (startStateName) ->
	logo.states.switchInstant("hidden")
	if new_tab_mask != null
		new_tab_mask.states.switchInstant("site")
	
	if site_mask == null
		site_mask = new Layer backgroundColor: "rgba(0,0,0,1)", clip: true
		site_mask.states.add
			site: { width: 750, height: 1294, x: 0, y: 40, borderRadius: 0}
			tabs: { width: 494, height: 820, x: 128, y: 282, borderRadius: 8}
			serp_shown: { width: 750, height: 1294, x: 0, y: 1334, borderRadius: 0}
	
		site_1 = new Layer image: "images/site 1.png", parent: site_mask, width: 750, height: 1294, originX: 0, originY: 0
		site_1.states.add
			site: { scale: 1 }
			tabs: { scale: 0.666 }
	
	site_mask.placeBehind(darker)
	site_mask.states.switchInstant startStateName
	site_1.states.switchInstant startStateName
	
	return site_mask




createTab("site")

initBar()
return_site_button.on(Events.Click, returnSiteHandler)
new_tab_button.on(Events.Click, openNextTabHandlerFromTabs)


composeOrder = () ->

	darker.sendToBack()
	site_mask.sendToBack()
# 	scrollView.sendToBack()
	yandex_bg.sendToBack()
	
	keyboard.bringToFront()
	status_bar_bg.bringToFront()

composeOrder()



status_bar.opacity = 0
for item in [yandex_bg, site_mask, darker, globalNavigation, keyboard, status_bar_bg]
	item.parent = tempView
	item.bringToFront()


Utils.delay 0.5, ->
	globalNavigation.snapToNextPage("bottom", true, { curve: Spring(damping: 1), time: 0.5 })
