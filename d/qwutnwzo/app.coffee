Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"

{iOSSwitch} = require 'iOSSwitch'
{iOSSegmentedControl} = require "iOSSegmentedControl"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

# Screen Guard

screenGuard = new Layer
	opacity: 0
	x: -2000

screenGuard.states =
	"main": { opacity: 0 }
	"feed": { opacity: 0 }
screenGuard.stateSwitch("main")

screenGuard.on Events.StateSwitchEnd, (from, to) ->
# 	if from != to
# 		if to is "main"
# 			shortsButton.children[0].animate("hidden")
# 			exploreButton.children[0].animate("hidden")
# 			item.animate("shown") for item in [shortsButton, exploreButton]
# 		
# 		else if to is "feed"
# 			shortsButton.children[0].animate("shown")
# 			exploreButton.children[0].animate("shown")
# 			item.animate("hidden") for item in [shortsButton, exploreButton]

# Flow

{ Preview } = require "PreviewComponent"

globalScreen = new Layer { width: 390, height: 844 }
new Preview { view: globalScreen }

flow = new FlowComponent
	parent: globalScreen
	width: 390
	height: 844

screen = new ScrollComponent
	width: 390
	height: 844
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "FAF9F8"
	contentInset: 
		bottom: 24



flow.showNext(screen)

# TabBar


tabViewScroll = new PageComponent
	parent: globalScreen
	width: 390
	height: 844
	scrollVertical: false
	scrollHorizontal: false

for i in [0...3]
	if i == 0
		flow.parent = tabViewScroll.content
		
	else tabView = new FlowComponent
		width: 390
		height: 844
		parent: tabViewScroll.content
		scrollVertical: true
		scrollHorizontal: false
		x: 390 * i



tabbar = new Layer
	parent: screen
	width: 390
	height: 82
	y: Align.bottom
	backgroundColor: "white"


for i in [0...3]
	iconButton = new Layer
		parent: tabbar
		width: 111
		height: 48
		x: 28 + 111 * i
		backgroundColor: "null"
	
	iconButton.states =
		"hidden": { opacity: 0.28 }
		"shown": { opacity: 1 }
	if i == 0 then iconButton.stateSwitch("shown")
	else iconButton.stateSwitch("hidden")
	
	iconImage = new Layer
		parent: iconButton
		width: 90
		height: 48
		x: Align.center
		image: "images/icon#{i + 1}.png"


changeTab = (index = 0) ->
	for item, i in tabbar.children
		if i == index then item.stateSwitch("shown")
		else item.stateSwitch("hidden")






tabbar.children[0].onClick ->
	changeTab(0)
	if tabViewScroll.currentPage == tabViewScroll.content.children[0]
		scrollFeedToTop()
	else
		tabbar.parent = screen
		tabViewScroll.snapToPage(tabViewScroll.content.children[0], false)



tabbar.children[1].onClick ->
	changeTab(1)
	if tabViewScroll.currentPage == tabViewScroll.content.children[1]
# 		;
	else
# 		tabbar.parent = tabViewScroll.content.children[1]
		tabViewScroll.snapToPage(tabViewScroll.content.children[1], false)



tabbar.children[2].onClick ->
	changeTab(2)
	if tabViewScroll.currentPage == tabViewScroll.content.children[2]
		;
	else
		tabbar.parent = tabViewScroll.content.children[2]
		tabViewScroll.snapToPage(tabViewScroll.content.children[2], false)



# 	image: "images/gamesFast.jpg"
# 	image: "images/mailFast.jpg"
# 
# marketFast = new Layer
# 	width: 390
# 	height: 844
# 	image: "images/marketFast.jpg"
# 
# weatherFast = new Layer
# 	width: 390
# 	height: 844
# 	image: "images/weatherFast.jpg"


# Tabs


# exploreFlowBar = new Layer
# 	width: 391
# 	height: 83
# 	image: "images/exploreFlowBar.jpg"

exploreFlowHeader = new Layer
	width: 390
	height: 104
	parent: tabViewScroll.content.children[2]
	image: "images/exploreFlowHeader.jpg"

exploreFlowContent = new Layer
	width: 390
	height: 982
	y: 104
	parent: tabViewScroll.content.children[2].children[1].content
	image: "images/exploreFlowContent.jpg"

tabViewScroll.content.children[2].children[1].backgroundColor = "white"

exploreFlowContent.parent.draggable.horizontal = false




shortsView_WithBar = new Layer
	width: 390
	height: 844
	image: "images/shortsView_WithBar.jpg"
	parent: tabViewScroll.content.children[1]

homeBtn = new Layer
	parent: shortsView_WithBar
	width: 120
	height: 48
	x: Align.left(28)
	y: Align.bottom(-34)
	backgroundColor: "null"

exploreBtn = new Layer
	parent: shortsView_WithBar
	width: 120
	height: 48
	x: Align.right(-28)
	y: Align.bottom(-34)
	backgroundColor: "null"

homeBtn.onClick ->
	tabbar.children[0].emit Events.Click

exploreBtn.onClick ->
	tabbar.children[2].emit Events.Click



# Content
card_01 = new Layer
	width: 390
	height: 624
	image: "images/card%2001.jpg"

card_02 = new Layer
	width: 390
	height: 461
	image: "images/card%2002.jpg"

card_03 = new Layer
	width: 390
	height: 304
	image: "images/card%2003b.jpg"

card_04 = new Layer
	width: 390
	height: 613
	image: "images/card%2004.jpg"

card_05 = new Layer
	width: 390
	height: 461
	image: "images/card%2005.jpg"

card_06 = new Layer
	width: 390
	height: 613
	image: "images/card%2006.jpg"

sumY = -300 + 44
for card in [card_01, card_02, card_03, card_04, card_05, card_06]
	card.parent = screen.content
	card.borderRadius = 24
	card.y = sumY
	sumY += card.height + 6


screen.updateContent()



# Header


headerGuard = new Layer
	opacity: 0
	x: -2000

headerGuard.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
headerGuard.stateSwitch("hidden")

headerGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		headerColor.animate(to)
		headerImage.animate(to)
		
		if to is "shown"
			scrollToTopButton.ignoreEvents = false
		else
			scrollToTopButton.ignoreEvents = true



headerView = new Layer
	width: screen.width
	height: 44 + 56
	parent: screen
	backgroundColor: "null"

headerColor = new Layer
	width: headerView.width
	height: headerView.height
	parent: headerView
	backgroundColor: "white"
	animationOptions: 
		curve: Spring(damping: 1)
		time: 0.3

headerColor.states =
	"shown": { y: 0 }
	"hidden": { y: -56 }
headerColor.stateSwitch("hidden")

headerImage = new Layer
	parent: headerView
	y: 44
	width: 390
	height: 56
	image: "images/headerImage2.png"
	animationOptions: 
		curve: Spring(damping: 1)
		time: 0.3

headerImage.states =
	"shown": { opacity: 1, y: 44 }
	"hidden": { opacity: 0, y: 44 - 56 }
headerImage.stateSwitch("hidden")




scrollToTopButton = new Layer
	size: 56
	parent: headerView
	y: 44
	x: 4
	backgroundColor: "null"


scrollFeedToTop = () ->
	headerGuard.stateSwitch("hidden")
	
	if screen.scrollY > screen.height
		screen.scrollToPoint(
			x: 0, y: screen.height
			false
		)
	screen.scrollToPoint(
		x: 0, y: 0
		true
		curve: Spring(damping: 1), time: 0.5
	)


scrollToTopButton.on Events.Tap, ->
	scrollFeedToTop()

scrollToTopButton.ignoreEvents = true


# Logo

logoGuard = new Layer
	opacity: 0
	x: -2000

logoGuard.states =
	"center": { opacity: 0 }
	"semi1": { opacity: 0 }
	"semi2": { opacity: 0 }
	"side": { opacity: 0 }
logoGuard.stateSwitch("side")

delete logoGuard.states.default

logoGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		if to == "center" then aValue = 98
		else if to == "semi1" then aValue = 48 + 18
		else if to == "semi2" then aValue = 48 + 36
		else aValue = 48
		
		exploreButton.x = Align.left(aValue)
		shortsButton.x = Align.right(-aValue)







screen.content.on "change:y", ->
	v = screen.scrollY
	
	if v < 60
		screenGuard.stateSwitch("main")
		headerGuard.stateSwitch("hidden")
	else if screen.content.draggable.direction == "up"
		screenGuard.stateSwitch("feed")
		headerGuard.stateSwitch("shown")
	else if screen.content.draggable.direction == "down"
		screenGuard.stateSwitch("main")
		headerGuard.stateSwitch("shown")



# Handlers & Transitions

openView = (currentView, isCustomTransition = false, flowLayer = flow) ->
	if isCustomTransition
		currentView.y = screen.height + 40
		currentView.x = 0
		flowLayer.transition(currentView, bottomToTopTransition)
	else
		currentView.x = 390
		currentView.y = 0
		flowLayer.showNext(currentView)





card_02.onClick ->
	openView(articleView, bool_ZenArticleOpenType)

# shortsButton.onTap ->
# 	openView(shortsView, bool_ZenNavigationOpenType)
# 
# exploreButton.onTap ->
# 	openView(exploreView, bool_ZenNavigationOpenType)



suggestCameraButton = new Layer
	parent: card_01
	width: 75
	height: 64
	x: Align.left()
	y: Align.bottom(-180)
	backgroundColor: "null"

suggestCameraButton.onClick ->
	openView(cameraView, bool_ShortcutsOpenType)


suggestButton = new Layer
	parent: card_01
	width: 240
	height: 64
	x: Align.center
	y: Align.bottom(-180)
	backgroundColor: "null"

suggestButton.onClick ->
	openView(searchFoodView, bool_ShortcutsOpenType)
# 	flow.transition(suggestView, suggestTransition, animate: false)



logoButton = new Layer
	width: 80
	height: 80
	parent: card_01
	x: Align.center
	y: Align.bottom(-244)
	backgroundColor: "null"

logoButton.onTap ->
	openView(settingsView, bool_ShortcutsOpenType)



weatherButton = new Layer
	parent: card_01
	x: Align.left(10)
	y: Align.bottom()
	width: 80
	height: 48
	backgroundColor: "null"

weatherButton.onTap ->
	openView(weatherView, bool_ShortcutsOpenType)



serviceButton = new Layer
	parent: card_01
	x: Align.right(10)
	y: Align.bottom()
	width: 120
	height: 48
	backgroundColor: "null"

serviceButton.onTap ->
	openView(serviceView, bool_ShortcutsOpenType)



searchFoodButton = new Layer
	parent: card_01
	x: Align.left(16)
	y: Align.bottom(-50)
	size: 120
	backgroundColor: "null"

searchFoodButton.onTap ->
	openView(searchFoodView, bool_ShortcutsOpenType)



cartButton = new Layer
	parent: card_01
	x: Align.left(144)
	y: Align.bottom(-50)
	size: 120
	backgroundColor: "null"

cartButton.onTap ->
	openView(cartView, bool_ShortcutsOpenType)


mailButton = new Layer
	parent: card_01
	x: Align.right(-20)
	y: Align.bottom(-50)
	size: 120
	backgroundColor: "null"

mailButton.onTap ->
	openView(mailView, bool_ShortcutsOpenType)



profileButton = new Layer
	parent: card_01
	x: Align.left(10)
	y: Align.bottom(-254)
	width: 100
	height: 60
	backgroundColor: "null"

profileButton.onTap ->
	openView(profileView, bool_ShortcutsOpenType)






bottomToTopTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: { opacity: 1 }
			hide: { opacity: 0.5 }
		layerB:
			show: { y: 0 }
			hide: { y: screen.height + 40 }


suggestTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: { opacity: 1 }
			hide: { opacity: 1 }
		layerB:
			show: { opacity: 1, y: 0 }
			hide: { opacity: 1, y: screen.height }


# Settings

settingsView = new Layer
	width: 390
	height: 844
	image: "images/articleView.jpg"

settingsHeader = new Layer
	width: 390
	height: 100
	image: "images/settingsHeader.png"
	parent: settingsView

settingsHeader.onTap ->
	flow.showPrevious()



settingsView_scroll = new ScrollComponent
	parent: settingsView
	width: 390
	height: 844 - 100
	y: 100
	backgroundColor: "white"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true


getSettingsTitle = (title = "Дзен") ->
	settings_breaker1 = new TextLayer
		name: "breaker"
		parent: settingsView_scroll.content
		fontSize: 24
		width: 390 - 20
		height: 40
		text: title
		fontWeight: "bold"
		x: Align.left(20)
		color: "black"
		contentInset:
			left: 20
			right: 80


getSettingsLine = (title = "Строчка") ->
	settings_zenArticleOpenTypeText = new TextLayer
		parent: settingsView_scroll.content
		fontSize: 16
		width: 390 - 20
		height: 32
		text: title
		x: Align.left(20)
		color: "black"
		padding: 
			top: 6
		contentInset:
			left: 20
			right: 80

getSegmentedControl = (itemArray = ["On", "Off", "sd"]) ->
	switchControl = new iOSSegmentedControl
		parent: settingsView_scroll.content
		x: Align.center
		y: Align.center -50
		tintColor: "#42B72A"
		width: 200
		items: itemArray
	
	switchControl.setSelected true, 0
	return switchControl

# Compose Settings

bool_ZenArticleOpenType = true
bool_ZenNavigationOpenType = true

bool_ShortcutsOpenType = true
bool_ShortcutsPresentType = false

bool_SearchOpenType = true




getSettingsTitle("Дзен")

settings_zenArticleOpenTypeButton = new iOSSwitch
	parent: getSettingsLine("Открывать статьи в шторке")
	point: Align.center
	isOn: bool_ZenArticleOpenType
	y: Align.center()
	x: Align.right(-20)

settings_zenArticleOpenTypeButton.onValueChange (value) ->
	bool_ZenArticleOpenType = value




settings_zenNavOpenTypeButton = new iOSSwitch
	parent: getSettingsLine("Открывать навигацию в шторке")
	point: Align.center
	isOn: bool_ZenNavigationOpenType
	y: Align.center()
	x: Align.right(-20)

settings_zenNavOpenTypeButton.onValueChange (value) ->
	bool_ZenNavigationOpenType = value





getSettingsTitle("Шорткаты").parent = settingsView_scroll.content
	
settings_ShortcutsOpenTypeButton = new iOSSwitch
	parent: getSettingsLine("Открывать в шторке")
	point: Align.center
	isOn: bool_ShortcutsOpenType
	y: Align.center()
	x: Align.right(-20)

settings_ShortcutsOpenTypeButton.onValueChange (value) ->
	bool_ShortcutsOpenType = value



settings_ShortcutsPresentTypeButton = new iOSSwitch
	parent: getSettingsLine("Открывать как сайты")
	point: Align.center
	isOn: bool_ShortcutsPresentType
	y: Align.center()
	x: Align.right(-20)

settings_ShortcutsPresentTypeButton.onValueChange (value) ->
	bool_ShortcutsPresentType = value
	
	if value
		weatherView.stateSwitch("site")
		cartView.stateSwitch("site")
	else
		weatherView.stateSwitch("view")
		cartView.stateSwitch("view")




getSettingsTitle("Сайты").parent = settingsView_scroll.content

settings_SearchOpenTypeButton = new iOSSwitch
	parent: getSettingsLine("Открывать в шторке")
	point: Align.center
	isOn: bool_SearchOpenType
	y: Align.center()
	x: Align.right(-20)

settings_SearchOpenTypeButton.onValueChange (value) ->
	bool_SearchOpenType = value



getSettingsTitle("Вид серпа в шорткате").parent = settingsView_scroll.content

typesForShortcutSearchControl = ["Классика", " Натив", "Лайт"]
shortcutSearchControl = getSegmentedControl(typesForShortcutSearchControl)

for item, i in typesForShortcutSearchControl
	shortcutSearchControl.setWidth (390-40) / typesForShortcutSearchControl.length, i

shortcutSearchControl.x = Align.left(20)

shortcutSearchControl.on "change:currentSegment", (current, last)->
	value = shortcutSearchControl.selectedSegmentIndex
	if value == 0 then nextState = "classic"
	else if value == 1 then nextState = "native"
	else if value == 2 then nextState = "lite"
	
	item.stateSwitch(nextState) for item in [searchFoodView, searchFoodViewInside]




ySettingsValue = 0
for item, i in settingsView_scroll.content.children
	if item.name == "breaker" then ySettingsValue += 24
	item.y = ySettingsValue
	ySettingsValue += item.height + 12


# Modals

articleView = new Layer
	width: 390
	height: 844
	image: "images/articleView.jpg"

articleView_scroll = new ScrollComponent
	parent: articleView
	y: 100
	width: articleView.width
	height: articleView.height - 100
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

articleView_content = new Layer
	width: 390
	height: 2192
	image: "images/articleView_content.jpg"
	parent: articleView_scroll.content

articleView_authorButton = new Layer
	parent: articleView
	width: 300
	height: 56
	y: Align.top(44)
	x: Align.left(48)
	backgroundColor: "null"

articleView_backButton = new Layer
	propagateEvents: true
	parent: articleView
	width: 48
	height: 56
	y: Align.top(44)
	x: Align.left(0)
	backgroundColor: "null"


authorView = new Layer
	width: 390
	height: 844
	image: "images/authorView.jpg"






articleView_backButton.onClick ->
	flow.showPrevious()

articleView_authorButton.onClick ->
	flow.showNext(authorView)

articleView_content.onSwipeRight ->
	flow.showPrevious()

articleView_backButton.onSwipeDown ->
	flow.showPrevious()


authorView.onClick ->
	flow.showPrevious()





weatherView = new Layer
	width: 390
	height: 844
	image: "images/weatherView.jpg"

weatherView.states =
	"site": 
		image: "images/weatherSite.jpg"
	"view":
		image: "images/weatherView.jpg"

if bool_ShortcutsPresentType then weatherView.stateSwitch("site")
else weatherView.stateSwitch("view")

weatherView.onClick ->
	flow.showPrevious()







cartView = new Layer
	width: 390
	height: 844

cartView.states =
	"site":
		image: "images/cartSite.jpg"
	"view":
		image: "images/marketFast.jpg"

if bool_ShortcutsPresentType then cartView.stateSwitch("site")
else cartView.stateSwitch("view")

cartView.onClick ->
	flow.showPrevious()



profileView = new Layer
	width: 390
	height: 844
	image: "images/profileView.jpg"

profileView.onClick ->
	flow.showPrevious()



mailView = new Layer
	width: 390
	height: 844
	image: "images/mailFast.jpg"

mailView.onClick ->
	flow.showPrevious()



shortsView = new Layer
	width: 390
	height: 844
	image: "images/shortsView.jpg"

shortsView.onClick ->
	flow.showPrevious()



exploreView = new Layer
	width: 390
	height: 844
	image: "images/exploreView.jpg"

exploreView.onClick ->
	flow.showPrevious()




searchFoodView = new Layer
	width: 390
	height: 844
	image: "images/searchFoodView.jpg"

searchFoodView.states =
	"classic":
		image: "images/searchFoodView.jpg"
	"lite":
		image: "images/serpFast.jpg"
	"native":
		image: "images/searchFoodViewNative.jpg"



searchFoodView_backButtonTop = new Layer
	size: 56
	parent: searchFoodView
	x: Align.left(12)
	y: Align.top(48)
	backgroundColor: "null"

searchFoodView_backButtonTop.onClick ->
	flow.showPrevious()


searchFoodView_backButtonBottom = new Layer
	size: 56
	parent: searchFoodView
	x: Align.left(12)
	y: Align.bottom(-40)
	backgroundColor: "null"

searchFoodView_backButtonBottom.onClick ->
	flow.showPrevious()


searchFoodView_nextButton = new Layer
	parent: searchFoodView
	width: 390
	height: 240
	y: Align.bottom()
	backgroundColor: "null"

searchFoodView_nextButton.onClick ->
	flow.showNext(searchFoodViewInside)


searchFoodView_maps = new Layer
	parent: searchFoodView
	width: 390
	height: 240
	y: Align.top(200)
	backgroundColor: "null"

searchFoodView_maps.onClick ->
	flow.showNext(mapsFast)



searchFoodViewInside = new Layer
	width: 390
	height: 844
	image: "images/searchFoodInsideView.jpg"

searchFoodViewInside.states =
	"classic":
		image: "images/searchFoodInsideView.jpg"
	"lite":
		image: "images/foodFast.jpg"
	"native":
		image: "images/searchFoodInsideViewNative.jpg"



searchFoodViewInside_backButtonTop = new Layer
	size: 56
	parent: searchFoodViewInside
	x: Align.left(12)
	y: Align.top(48)
	backgroundColor: "null"

searchFoodViewInside_backButtonTop.onClick ->
	flow.showPrevious()


searchFoodViewInside_backButtonBottom = new Layer
	size: 56
	parent: searchFoodViewInside
	x: Align.left(12)
	y: Align.bottom(-40)
	backgroundColor: "null"

searchFoodViewInside_backButtonBottom.onClick ->
	flow.showPrevious()






mapsFast = new Layer
	width: 390
	height: 844
	image: "images/mapsFast.png"

mapsFast.onClick ->
	flow.showPrevious()


# Service View

serviceView = new Layer
	width: 390
	height: 844
	image: "images/serviceView.jpg"


serviceView_backButton = new Layer
	parent: serviceView
	width: 390
	height: 120
	backgroundColor: "null"

serviceView_backButton.onClick ->
	flow.showPrevious()


serviceView_button1 = new Layer
	width: 98
	height: 98
	parent: serviceView
	x: Align.left(0)
	y: Align.top(150)
	backgroundColor: "null"

serviceView_button2 = new Layer
	width: 98
	height: 98
	parent: serviceView
	x: Align.left(98)
	y: Align.top(150)
	backgroundColor: "null"

serviceView_button3 = new Layer
	width: 98
	height: 98
	parent: serviceView
	x: Align.left(98*2)
	y: Align.top(150)
	backgroundColor: "null"

serviceView_button4 = new Layer
	width: 98
	height: 98
	parent: serviceView
	x: Align.left(98*3)
	y: Align.top(150)
	backgroundColor: "null"
	

serviceView_button1.onClick ->
	flow.showNext(marketView)

serviceView_button2.onClick ->
	flow.showNext(readerView)

serviceView_button3.onClick ->
	flow.showNext(stepsView)

serviceView_button4.onClick ->
	flow.showNext(cameraView)


marketView = new Layer
	width: 390
	height: 844
# 	image: "images/marketView.jpg"
	image: "images/marketFast.jpg"

marketView.onClick ->
	flow.showPrevious()


readerView = new Layer
	width: 390
	height: 844
	image: "images/readerView.jpg"

readerView.onClick ->
	flow.showPrevious()


stepsView = new Layer
	width: 390
	height: 844
	image: "images/stepsView.jpg"

stepsView.onClick ->
	flow.showPrevious()

cameraView = new Layer
	width: 390
	height: 844
	image: "images/cameraView.jpg"

cameraView.onClick ->
	flow.showPrevious()





serviceView_wideButton1 = new Layer
	parent: serviceView
	width: 390
	height: 70
	y: Align.top(376)
	backgroundColor: "null"

serviceView_wideButton1.onClick ->
	flow.showNext(aonView)

aonView = new Layer
	width: 390
	height: 844
	image: "images/aonView.jpg"

aonView.onClick ->
	flow.showPrevious()







# Search


suggestView = new Layer
	width: 390
	height: 844
	image: "images/suggestView.jpg"

suggestView_backButton = new Layer
	parent: suggestView
	size: 48
	x: Align.left(16)
	y: Align.top(60)
	backgroundColor: "null"

suggestView_backButton.onClick ->
	suggestView.ignoreEvents = true
	flow.showPrevious(animate: false)

suggestView_serpButton = new Layer
	parent: suggestView
	width: 390
	height: 160
	y: Align.top(120)
	backgroundColor: "null"

suggestView_serpButton.onClick ->
# 	flow.transition(searchView, suggestTransition, animate: false)
	flow.transition(flowSearch, suggestTransition, animate: false)
	



# Inseption

# searchGlobal = new Layer
# 	width: 390
# 	height: 844
# 	backgroundColor: "null"

flowSearch = new FlowComponent
	width: 390
	height: 844
	backgroundColor: "null"



# S View
searchView = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	width: 390
	height: 844
	contentInset: 
		top: 4
		bottom: 80
	image: "images/suggestView.jpg"

searchView_content = new Layer
	parent: searchView.content
	width: 390
	height: 1448
	image: "images/searchView.jpg"

searchView.content.draggable.overdragScale = 0.05


searchView_yandexButton = new Layer
	parent: searchView.content
	size: 48
	x: Align.left(18)
	y: Align.top(52)
	backgroundColor: "null"

searchView_yandexButton.onClick ->
	flow.showPrevious(animate: false)
	flow.showPrevious(animate: false)



searchView_openSiteButton = new Layer
	parent: searchView.content
	width: 390
	height: 200
	y: Align.top(180)
	backgroundColor: "null"

searchView_openSiteButton.onClick ->
	openView(vcView, bool_SearchOpenType, flowSearch)
# 	flowSearch.showNext(vcView)







# searchView_bottomBar = getBottomBar("Поиск")
# searchView_bottomBar.parent = searchView
# searchView_bottomBar.y = Align.bottom()
# 
# searchView_bottomBarBackButton = new Layer
# 	parent: searchView_bottomBar
# 	size: 48
# 	x: Align.left(12)
# 	y: Align.bottom(-44)
# 	backgroundColor: "null"
# 
# searchView_bottomBarBackButton.onClick ->
# 	flow.showPrevious(animate: false)
# 	flow.showPrevious(animate: false)





# vcView = new Layer
# # 	parent: flowSearch
# 	width: 390
# 	height: 844
# 	image: "images/vcView.jpg"

# vcView_bottomBar = getBottomBar("vc.ru")
# vcView_bottomBar.parent = vcView
# vcView_bottomBar.y = Align.bottom()

# vcView_bottomBarBackButton = new Layer
# 	parent: vcView_bottomBar
# 	size: 48
# 	x: Align.left(12)
# 	y: Align.bottom(-44)
# 	backgroundColor: "null"
# 
# vcView_bottomBarBackButton.onClick ->
# 	flowSearch.showPrevious()


shortcutSearchControl.setSelected true, 2

flowSearch.showNext(searchView)
tabbar.bringToFront()

for item in [exploreView, shortsView, mailView, profileView, cartView, weatherView, authorView, articleView, settingsView, flowSearch, searchFoodView, suggestView, aonView, cameraView, stepsView, readerView, marketView, serviceView, mapsFast, searchFoodView, searchFoodViewInside]
	flow.showNext(item, animate: false)
	flow.showPrevious(animate: false)