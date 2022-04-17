
{Site} = require "site"
{TextLayer} = require 'TextLayer'
{Input} = require 'input'

screen = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"

tightSpring = "spring(200, 25, 10)"


barView = null
contentView = null
staticView = null
zenView = null
tabsView = null

openedSite = null
homeSite = null
blankPageRight = null
homeScreen = null
fakeTab = null

input = null
suggestView = null
textOutputsLayers = []
textOutputsSuggestPhrase = [
	["", "", "", "", "", ""],
	["погода -1С", "погода", "погода в москве", "переводчик онлайн", "", ""],
	["погода в москве", "погода в москве на 14 дней", "почта росии отслеживание", "", "", ""],
	["погода в москве", "погода в москве на 14 дней", "погода на неделю", "погода на завтра", "погода на месяц", "погода в москве на 3 дня"]
]


# State Machine


# 0 - Uninitialised
# 1 - Site
# 2 - Tabs with site only
# 3 - New Tab
# 4 - Tabs with site & new tab

browserMode = 0

getMode = () ->
	return browserMode



isModeSite = () ->
	if browserMode is 1 then return true
	return false

isModeTabsGeneral = () ->
	if browserMode is 2 then return true
	return false

isModeNewTab = () ->
	if browserMode is 3 then return true
	return false

isModeTabsMore = () ->
	if browserMode is 4 then return true
	return false



setModeSite = () ->
	browserMode = 1

setModeTabsGeneral = () ->
	browserMode = 2

setModeNewTab = () ->
	browserMode = 3

setModeTabsMore = () ->
	browserMode = 4



positionBackgroundView = new Layer
	backgroundColor: "transparent"

# Create Home Screen

homeScreenButtonsArray = []

createHomeScreen = () ->
	homeScreen = new Layer
		width: 750
		height: 1334
		x: 0
		y: 0
		image: "images/home screen.png"
	
	incognito_button = new Layer
		width: 160
		height: 26
		x: 48
		y: 1260
		image: "images/incognito button.png"
		parent: homeScreen
	
	history_button = new Layer
		width: 126
		height: 30
		x: 48
		y: 80
		image: "images/history button.png"
		parent: homeScreen
	
	user_button = new Layer
		width: 170
		height: 28
		x: 532
		y: 78
		image: "images/user button.png"
		parent: homeScreen
	
	open_new_tab_button = new Layer
		width: 72
		height: 72
		x: 340
		y: 1238
		image: "images/open new tab button.png"
		parent: homeScreen
	
	hide_tabs_button = new Layer
		width: 72
		height: 72
		x: 660
		y: 1238
		image: "images/hide tabs button.png"
		parent: homeScreen
	
	hide_tabs_button.on(Events.Click, hideTabsHander)
	open_new_tab_button.on(Events.Click, createNewTabFromTabsHandler)
	
	homeScreenButtonsArray.push(incognito_button)
	homeScreenButtonsArray.push(history_button)
	homeScreenButtonsArray.push(user_button)
	homeScreenButtonsArray.push(open_new_tab_button)
	homeScreenButtonsArray.push(hide_tabs_button)
	
	for item in homeScreenButtonsArray
		item.states = 
			"shown": { opacity: 1 }
			"hidden": { opacity: 0 }
		item.stateSwitch("shown")


showHomeScreenButtons = () ->
	for item in homeScreenButtonsArray
		item.animate("shown", curve: tightSpring)
	
hideHomeScreenButtons = () ->
	for item in homeScreenButtonsArray
		item.animate("hidden", curve: tightSpring)

# Logic

sites = []
activePage = null
listeningPages = true
tabHeight = 880


getActiveSite = () ->
	return activePage

isListeningPages = () ->
	return listeningPages

stopListeningPages = () ->
	listeningPages = false

startListeningPages = () ->
	listeningPages = true




showTabsHandler = (event, layer) ->
	if isListeningPages()
		tabsView.stateSwitch("shown")
		currentLayer = getActiveSite()
		
		if currentLayer.siteID is homeSiteID
			createFakeTab()
			tabsView.snapToPage(fakeTab, false, { })
		
		currentLayer.animate("site-tabs")
		barView.animate("tabs")
		
		showHomeScreenButtons()

hideTabsHander = (event, layer) ->
	if isListeningPages()
		currentLayer = getActiveSite()
		removeSiteFromTabs(currentLayer)
		barView.animate("hidden")
		hideHomeScreenButtons()



createFakeTab = () ->
	if fakeTab != null
		return fakeTab
	
	fakeTab = new Site
		parent: tempView
		width: 494
		height: tabHeight
		siteID: homeSiteID
		opacity: 0
	
	insertFakeTabToTabs(fakeTab)





createNewTabFromBarHandler = (event, layer) ->
	barView.animate("search")
# 	zenView.scrollY = 0
	currentLayer = getActiveSite()
	if currentLayer.siteID != homeSiteID
		currentLayer.stateSwitch("site-tabs")
	tabsView.stateSwitch("hidden")
	
	stopListeningPages()
	if homeSite == null
		homeSite = createHomeSite()
		sites.push(homeSite)
	homeSite.stateSwitch("site-global")
	activePage = homeSite
	startListeningPages()
	
	hideHomeScreenButtons()
	
	

createNewTabFromTabsHandler = (event, layer) ->
	stopListeningPages()
	if homeSite == null
		homeSite = createHomeSite()
		sites.push(homeSite)
	# 	homeSite.stateSwitch("site-global")
		homeSite.stateSwitch("site-tabs")
		activePage = homeSite
	startListeningPages()
	
	updateRightBlankSite()
	scrollDistance = homeSite.x - tabsView.currentPage.x
	localDelay = Utils.modulate(scrollDistance, [0, 2200], [0, 0.5], false)
	if localDelay > 0 and localDelay < 0.2
		localDelay = 0.2
	tabsView.snapToPage(homeSite, true, { time: localDelay })
	
	Utils.delay localDelay, ->
		barView.animate("search")
		homeSite.stateSwitch("site-tabs")
		tabsView.stateSwitch("hidden")
		hideHomeScreenButtons()
		
# 		stopListeningPages()
		if homeSite == null
			homeSite = createHomeSite()
			sites.push(homeSite)
		homeSite.animate("site-global")
		activePage = homeSite
# 		startListeningPages()
		
# 		createNewTabFromBarHandler()
# 		homeSite.animate("site-global")
	
	


insertFakeTabToTabs = (fakeLayer) ->
	fakeLayer.parent = tabsView.content
	fakeLayer.x = fakeLayer.siteID * (247+8)*2 + 64*2
	updateRightBlankSite()

insertSiteToTabs = (siteLayer) ->
	siteLayer.stateSwitch("tabs-normal")
	siteLayer.parent = tabsView.content
	siteLayer.x = siteLayer.siteID * (247+8)*2 + 64*2
	updateRightBlankSite()

removeSiteFromTabs = (siteLayer) ->
	siteLayer.parent = tempView
	siteLayer.placeBefore(positionBackgroundView)
	siteLayer.x = 128
	siteLayer.y = 282
	siteLayer.animate("site-global")
	updateRightBlankSite()


updateRightBlankSite = () ->
	blankPageRight.x = sites.length*(247+8)*2 + 64*2
	tabsView.updateContent()
	








# scrollTabsToPageIndex = (index, isAnimating) ->
# 	if !isAnimating then tabsView.snapToPage(sites[index], false, { })
# 	else tabsView.snapToPage(sites[index], true, { curve: tightSpring })

# Create Opened Site

createOpenedSite = (localSiteID) ->
	openedSite = new Site
		parent: tempView
		width: 494
		height: tabHeight
		x: 128
		siteID: localSiteID
	
	openedSiteContent = new Layer
		width: 2576
		height: 1490
		image: "images/site#{localSiteID}.png"
		parent: openedSite.content
	
	openedSite.states =
		"site-tabs": { scale: 1, y: 282, borderRadius: 8}
		"tabs-normal": { scale: 1, y: 0, borderRadius: 8}
		"site-global": { scale: 1.52, y: 212, borderRadius: 0}
	
	openedSite.stateSwitch("tabs-normal")
	
	openedSite.animationOptions = 
		curve: "spring(200, 20, 0)"
	
	
	
	siteChangeStartHandler = (fromState, toState, event, layer) ->
		if fromState is "tabs-normal" and toState is "site-tabs"
			removeSiteFromTabs(layer)
		
		if toState is "site-global"
			layer.scrollVertical = true
			layer.scrollHorizontal = true
		else
			layer.scrollVertical = false
			layer.scrollHorizontal = false
			
	
	siteChangeEndHander = (fromState, toState, event, layer) ->
		if fromState is "site-global" and toState is "site-tabs"
			insertSiteToTabs(layer)
		
		if toState is "site-global" and homeSite != null
			sites.pop()
			homeSite.destroy()
			homeSite = null
			updateRightBlankSite()
	
	
	openedSite.on(Events.StateSwitchEnd, siteChangeEndHander)
	openedSite.on(Events.StateSwitchStart, siteChangeStartHandler)
	openedSite.on(Events.Click, backSiteHandler)
	
	return openedSite



backSiteHandler = (event, layer) ->
		if layer.states.current.name is "tabs-normal"
			hideTabsHander(event, layer)





createTabsView = () ->
	if tabsView != null
		return tabsView
	
	tabsView = new PageComponent
# 		parent: tempView
		width: 375*2
		height: tabHeight
		y: 141*2
		scrollVertical: false
		opacity: 1
	
	tabsView.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	tabsView.states.animationOptions =
		curve: tightSpring
	
	tabsView.stateSwitch("shown")
	tabsView.placeBehind(positionBackgroundView)
	
	tabsView.on Events.Scroll, ->
		if tabsView.currentPage.siteID != undefined
			activePage = tabsView.closestPage


createSites = () ->
	
	blankPageLeft = new Layer
		width: 64*2
		height: tabHeight
		parent: tabsView.content
		backgroundColor: "null"
	
	blankPageRight = new Layer
		width: 64*2
		height: tabHeight
		x: sites.length*(247+8)*2 + 64*2
		parent: tabsView.content
		backgroundColor: "null"
	
	for i in [0...4]
		localSite = createOpenedSite(i)
		localSite.placeBehind(positionBackgroundView)
		sites.push(localSite)
		insertSiteToTabs(localSite)
	
	activePage = sites[0]


# Create Home Site

homeSiteID = 4

createHomeSite = () ->
	if homeSite != null
		return homeSite
	
	homeSite = new Layer
		width: 494
		height: tabHeight
		x: 128
		backgroundColor: "rgba(250,250,250,0.08)"
		borderWidth: 4
		borderColor: "rgba(255,255,255,0.5)"
		siteID: homeSiteID
	
	homeSite.states =
		"site-tabs": { scale: 1, y: 282, borderRadius: 8, borderColor: "rgba(255,255,255,0.5)" }
		"tabs-normal": { scale: 1, y: 0, borderRadius: 8, borderColor: "rgba(255,255,255,0.5)" }
		"site-global": { scale: 1.52, y: 212, borderRadius: 0, borderColor: "rgba(255,255,255,0)" }
	
	homeSite.stateSwitch("site-global")
	homeSite.placeBehind(positionBackgroundView)
	homeSite.animationOptions = 
		curve: tightSpring
	
	logo = new Layer
		width: 268
		height: 104
		y: 100
		image: "images/logo.png"
		parent: homeSite
	
	logo.centerX()
	
	logo.states = 
		"home": { scale: 1 / 1.52 }
		"tabs": { scale: 0.66 / 1.52 }
	logo.stateSwitch("home")

	
	homeSiteChangeStartHandler = (fromState, toState, event, layer) ->
		if fromState is "tabs-normal" and toState is "site-tabs"
			removeSiteFromTabs(layer)
		
		# Additional logic for logo
		if toState is "site-tabs"
			logo.animate("tabs", curve: tightSpring)
		else if toState is "site-global"
			logo.animate("home", curve: tightSpring)
			
		# Additional logic for home sites
		if toState is "site-global"
			tabsView.animate("hidden")
		else if toState is "site-tabs"
			tabsView.animate("shown")
	
	homeSiteChangeEndHander = (fromState, toState, event, layer) ->
		if fromState is "site-global" and toState is "site-tabs"
			insertSiteToTabs(layer)
		
		if toState is "tabs-normal" and fakeTab != null
			fakeTab.destroy()
			fakeTab = null
	
	homeSite.on(Events.StateSwitchStart, homeSiteChangeStartHandler)
	homeSite.on(Events.StateSwitchEnd, homeSiteChangeEndHander)
	homeSite.on(Events.Click, backSiteHandler)
	
	return homeSite
	


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
		
	barView.placeBefore(positionBackgroundView)
	
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
	barView.on(Events.StateSwitchStart, barViewStateSwitchStartHandler)
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
		"search": { y: 588 }
		"hidden": { y: 1220 }
		"tabs": { y: 1400 }
	barView.stateSwitch("hidden")
	
	barView.animationOptions =
		curve: tightSpring
	
	
# 	barView.on Events.Click, ->
# 		print barView.y
	
# 	barView.on Events.DragMove, ->
	# 	bar.draggable.momentum = true
	
# 	barView.on Events.DragMove, ->
	# 	bar.draggable.momentum = true
	# 	print bar.draggable.direction




barViewStateSwitchStartHandler = (fromState, toState) ->
# 	if fromState is not toState
		if toState is "opened"
			if activePage is homeSite
				showSuggestBar()
				hideContextButtons()
			else
				showSearchOmniBar()
				showContextButtons()
			
		else if toState is "search"
# 			print "correct"
			if activePage is homeSite
# 				print "homeActivePage"
				showNewTabBar()
				destroySuggestInput()
				hideContextButtons()
			else
				showBaseOmniBar()
				showContextButtons()
			
		else if toState is "hidden"
			if activePage is homeSite
				showNewTabBar()
				destroySuggestInput()
			else
				showBaseOmniBar()


barViewStateSwitchEndHandler = (fromState, toState) ->
	if toState is "opened"
		zenView.scrollVertical = true
	else if toState is "hidden"
		zenView.scrollVertical = false
	
	if toState is "opened" and activePage is homeSite
		initSuggestInput()



barViewDragEndHandler = (event, layer) ->
	if barView.y < 130
			barView.animate("opened")
		if barView.y > 130 and barView.draggable.direction == "down"
			barView.animate("hidden")
		else if barView.y < 950 and barView.draggable.direction == "up"
			barView.animate("opened")
		else if barView.y < 1220
			barView.animate("opened")
		else
			print "alarm"
			barView.animate("hidden")

# Create Bookmark View
zenView = null
under_new_button = null
under_others = null

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
	under_others.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	under_others.stateSwitch("shown")
	
	under_new_button = new Layer width: 252, height: 64, x: 32, y: 526, image: "images/under new button.png", parent: staticView
	under_new_button.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	under_new_button.stateSwitch("shown")
	under_new_button.on(Events.Click, createNewTabFromBarHandler)

	fixLocalHeights = [under_new_button, under_others, bookmarkView]
	for item in fixLocalHeights
		item.y = item.y - 76
	
	
# 	bookmarkView.on Events.Click, ->
# 		print "ksd"


showContextButtons = () ->
	under_others.stateSwitch("shown")
	under_new_button.stateSwitch("shown")
# 	under_new_button.on(Events.Click, createNewTabFromBarHandler)
	zenView.stateSwitch("base")

hideContextButtons = () ->
	under_others.stateSwitch("hidden")
	under_new_button.stateSwitch("hidden")
# 	under_new_button.off(Events.Click, createNewTabFromBarHandler)
	zenView.stateSwitch("compact")


# Create Zen View

zenScrollBoundsTop = [0, 300]
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
	
	zenView.states = 
		"base": { y: 0, height: 1142 }
		"compact": { y: -96, height: 1142+96 }
	
	zenView.on(Events.Move, zenMoveHandler)
	zenView.on(Events.Scroll, zenScrollHandler)
# 	zenView.placeBehind(contentView)
	
	
# 	zenBlank = new Layer width: 686, height: 200, parent: zenView.content, 
	titletwo = new Layer width: 686, height: 76, x: 32, y: 0, image: "images/titleTwo.png", parent: zenView.content
	zen_item_1 = new Layer width: 686, height: 824, x: 0, y: 0 + localZenAdder, image: "images/zen item 1.png", parent: zenView.content
	zen_item_2 = new Layer width: 686, height: 820, x: 0, y: 856 + localZenAdder, image: "images/zen item 2.png", parent: zenView.content
	zen_item_3 = new Layer width: 686, height: 824, x: 0, y: 1708 + localZenAdder, image: "images/zen item 3.png", parent: zenView.content

	zen_item_blank = new Layer width: 686, height: 140, x: 0, y: 1712+766+32, backgroundColor: "transparent", parent: zenView.content


zenScrollHandler = (event, layer) ->
	if !isZenScrollDone
		cancelInputHanler()
	isZenScrollDone = true
	
zenMoveHandler = (event, layer) ->
	if zenView.scrollY <= 0
		staticView.y = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, zenScrollTopOutput, false)
	else
		staticView.y = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, zenScrollTopOutputTop, true)
		staticView.opacity = Utils.modulate(zenView.scrollY, zenScrollBoundsTop, [1, 0], true)
	
	

# Create Input

initSuggestInput = () ->
	if input != null
		Utils.delay 0.07, ->
			if input != null 
				input.focus()
		return input
	
	input = new Input
		width: 400
		height: 64
		x: 58
		y: 24
		borderRadius: 4
		backgroundColor: "rgba(215,215,215,1)"
		virtualKeyboard: true
		placeholder: "Найти в Яндексе"
		goButton: true
		type: "search"
		parent: omni_bg
	
	input.style = 
		fontSize: "32px"
		lineHeight: "38px"
		padding: "0.2px"
		color: "#000"
	
	input.updatePlaceholderColor("#7A797B")
	input.focus()
	
	
	input.onFocus ->
		checkSuggestView()
# 		input.value = ""
	
	input.onBlur ->
		if input.value == ""
			input.placeholder = "Найти в Яндексе"
		checkSuggestView()
	
	input.form.addEventListener "input", ->
		checkSuggestView()
		
		currentDigitNumber = input.value.length
		if currentDigitNumber > 3
			currentDigitNumber = 3
		
# 		print "locally" + logCounter++
# 		print suggestView.opacity
		for item, i in textOutputsSuggestPhrase[currentDigitNumber]
# 			print item
			textOutputsLayers[i].text = item
# 			print textOutputsLayers[i].text
	
	input.form.addEventListener "submit", ->
		input.value = ""
		checkSuggestView()
	
	return input


checkSuggestView = () ->
	if input.value.length > 1
		suggestView.opacity = 1
	else
		suggestView.opacity = 0


destroySuggestInput = () ->
	suggestView.opacity = 0
	if input != null
		input.destroy()
		input = null

# Create Omnibox
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
		suggest: { x: 184}
	}
	search_bar_shape.states.switchInstant "base"
	
	clear = new Layer width: 28, height: 28, y: 42, image: "images/clear.png"
	
	clear.states.add {
		base: { x: 582, opacity: 0}
		search: { x: 526, opacity: 1}
		new_tab: { x: 526, opacity: 0}
		suggest: { x: 526, opacity: 1}
	}
	clear.states.switchInstant "base"
	
	refresh_icon = new Layer width: 28, height: 34, y: 36, image: "images/refresh icon.png"
	
	refresh_icon.states.add {
		base: { x: 582, opacity: 1}
		search: { x: 524, opacity: 0}
		new_tab: { x: 584, opacity: 0}
		suggest: { x: 524, opacity: 0}
	}
	refresh_icon.states.switchInstant "base"
	
	cancel = new Layer width: 98, height: 28, y: 40, image: "images/cancel.png"
	
	cancel.states.add {
		search: { x: 618, opacity: 1}
		base: { x: 646, opacity: 0}
		new_tab: { x: 618, opacity: 0}
		suggest: { x: 618, opacity: 1}
	}
	cancel.states.switchInstant "base"
	
	tabs_icom = new Layer width: 46, height: 54, y: 28, image: "images/tabs icom.png"
	
	tabs_icom.states.add {
		base: { x: 674, opacity: 1}
		search: { x: 634, opacity: 0}
		new_tab: { x: 674, opacity: 1}
		suggest: { x: 634, opacity: 0}
	}
	tabs_icom.states.switchInstant "base"
	
	focustext = new Layer height: 36, y: 38, backgroundColor: "rgba(184,201,219,1)"
	
	focustext.states.add {
		base: { width: 248, x: 202, opacity: 0}
		search: { width: 332, x: 40, opacity: 1}
		new_tab: { width: 332, x: 116, opacity: 0.0}
		suggest: { width: 332, x: 40, opacity: 0}
	}
	focustext.states.switchInstant "base"
	
	address = new Layer width: 236, height: 34, y: 42, image: "images/address.png"
	
	address.states.add {
		base: { x: 208, opacity: 1}
		search: { x: 132, opacity: 1}
		new_tab: { x: 208, opacity: 0.0}
		suggest: { x: 132, opacity: 0}
	}
	address.states.switchInstant "base"

	
	ready_for_search = new Layer width: 270, height: 28, y: 44, image: "images/ready for search.png"
	
	ready_for_search.states.add {
		base: { x: 194, opacity: 0}
		search: { x: 154, opacity: 0}
		new_tab: { x: 194, opacity: 1}
		suggest: { x: 154, opacity: 0}
	}
	ready_for_search.states.switchInstant "base"
	
	http = new Layer width: 90, height: 32, y: 42, image: "images/http.png"	
	http.states.add {
		base: { x: 118, opacity: 0}
		search: { x: 42, opacity: 1}
		new_tab: { x: 118, opacity: 0.0}
		suggest: { x: 42, opacity: 0}
	}
	http.states.switchInstant "base"
	
	
	protect_icon = new Layer width: 24, height: 32, x: 48, y: 40, image: "images/protect icon.png"
	
	protect_icon.states.add {
		base: { opacity: 1}
		search: { opacity: 0}
		new_tab: { opacity: 0}
		suggest: { opacity: 0}
	}
	protect_icon.states.switchInstant "base"
	
	
	
	# Tabs button
	tabs_button = new Layer x: 638, height: 110, width: 112, backgroundColor: "transparent"
	tabs_button.states.add {
		search: { x: 750 }
		base: { x: 638 }
		new_tab: { x: 638 }
		suggest: { x: 750 }
	}
	tabs_button.states.switchInstant "search"
	
	tabs_button.on(Events.Click, showTabsHandler)
	cancel.on(Events.Click, cancelInputHanler)
	search_bar_bg.on(Events.Click, focusOnField)
	search_bar_shape.on(Events.Click, focusOnField)
	
# 	omni_bg.on(Events.DragEnd, barViewDragEndHandler)
	
	
	omni_bar_elems = [search_bar_bg, search_bar_shape, focustext, address, http, cancel, tabs_button, tabs_icom, refresh_icon, clear, protect_icon, ready_for_search]

	for item in omni_bar_elems
		item.parent = omni_bg
		try
			if isCurrentGlobalModeSite
				item.stateSwitch("base")
			else
				item.stateSwitch("new_tab")
		catch error
	
	
	
	textOutputsLayers = []
	suggestView = new Layer
		width: 750
		height: 1142
		backgroundColor: "#F0F0F0"
		y: 112
		parent: omni_bg
		opacity: 0
	
	for item, i in [0, 1, 2, 3, 4, 5]
		outputLayer = new TextLayer
			text: ""
			color: "#000"
			textAlign: "left"
			fontSize: 36
			width: 750-28*2
			height: 56*2
			y: 56*2*i
			x: 28*2
			parent: suggestView
			paddingTop: 28
		
		textOutputsLayers.push(outputLayer)





cancelInputHanler = () ->
	if activePage is homeSite
		showNewTabBar()
		destroySuggestInput()
	else
		showBaseOmniBar()


focusOnField = () ->
	if activePage is homeSite
		if barView.states.current.name is "opened"
			initSuggestInput()
			showSuggestBar()
		else
			showNewTabBar()
	else
		showSearchOmniBar()
	  
	if barView.states.current.name is "hidden" or barView.states.current.name is "search"
		barView.animate("opened")



showSearchOmniBar = () ->
# 	print "Search Omni"
	isZenScrollDone = false
	for item in omni_bar_elems
		try
			item.animate("search", time: 0.2)
		catch error

showBaseOmniBar = () ->
# 	print "Base Omni"
	for item in omni_bar_elems
		try
			item.animate("base", time: 0.2)
		catch error

showNewTabBar = () ->
# 	print "New Tab Omni"
	for item in omni_bar_elems
		try
			item.animate("new_tab", time: 0.2)
		catch error

showSuggestBar = () ->
# 	print "New Tab Omni"
	isZenScrollDone = false
	for item in omni_bar_elems
		try
			item.states.switch("suggest", time: 0.2)
		catch error





createHomeScreen()
homeScreen.placeBehind(positionBackgroundView)

createTabsView()
# createOpenedSite()
createSites()
createBarView()
# initSuggestInput()

# sites[0].stateSwitch("site-tabs")
# activeSite = sites[0]
barView.stateSwitch("tabs")

for item in [homeScreen, tabsView, positionBackgroundView, barView]
	item.parent = tempView