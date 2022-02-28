Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"

# {iOSSwitch} = require 'iOSSwitch'
# {iOSSegmentedControl} = require "iOSSegmentedControl"

isShowTips = false
# isShowTips = true

# Debug Colors

array256 = []
array256.push item for item in [0..255]

debugColor = () ->
	if isShowTips
		return new Color(r: Utils.randomChoice(array256), g: Utils.randomChoice(array256), b: Utils.randomChoice(array256), a: 0.5)
	return null


Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

# Screen

screen = new Layer
	width: 375
	height: 812
	backgroundColor: "FAF9F8"



if Screen.width == 390
	Canvas.backgroundColor = "black"
	screen.scale = 390/375
	screen.x = Align.center
	screen.y = 16
else if Screen.width == 393
	Canvas.backgroundColor = "black"
	screen.scale = 393/375
	screen.x = Align.center
	screen.y = -44
else
	screen.center()
	screen.borderRadius = 42
	screen.clip = true
	screen.scale = (Screen.height - 80) / 812



# Flow: Global


changeState = (toState) ->
	if toState == "global"
		firstTab_Flow.stateSwitch("shown")
		secondTab_Flow.stateSwitch("hidden")
		
		firstTab_Flow.placeBehind(aliceBar)
		secondTab_Flow.sendToBack()
	
	else if toState == "reels"
		firstTab_Flow.stateSwitch("hidden")
		secondTab_Flow.stateSwitch("shown")
		
		secondTab_Flow.placeBehind(aliceBar)
		firstTab_Flow.sendToBack()
	
	else if toState == "tabs_fromFeed"
		globalTabs_View.animate("toTabs", time: 0.5)
		tabs.animate("shown")
	
	else if toState == "feed_fromTabs"
		globalTabs_View.animate("fromTabs", time: 0.5)
		tabs.animate("hidden")



firstTab_Flow_prev = (event, layer) ->	
	firstTab_Flow.showPrevious()

firstTab_Flow_prevSwipe = Utils.throttle 0.5, (event, layer) ->
	firstTab_Flow.showPrevious()




globalTabs_View = new Layer
	parent: screen
	width: screen.width
	height: screen.height

globalTabs_View.states =
	"toTabs": { y: screen.height + 20 }
	"fromTabs": { y: 0 }
globalTabs_View.stateSwitch("fromTabs")


firstTab_Flow = new FlowComponent
	parent: globalTabs_View
	width: screen.width
	height: screen.height

firstTab_Flow.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
firstTab_Flow.stateSwitch("shown")


startPage_ViewController = new Layer
	width: screen.width
	height: screen.height
	backgroundColor: debugColor()
	backgroundColor: "white"




secondTab_Flow = new Layer
	parent: globalTabs_View
	width: screen.width
	height: screen.height

secondTab_Flow.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
secondTab_Flow.stateSwitch("hidden")

secondTab_Flow.sendToBack()

reels = new Layer
	parent: secondTab_Flow
	width: screen.width
	height: screen.height
	image: "images/reels.png"



tabsView = new Layer
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "black"

tabs = new Layer
	parent: tabsView
	width: screen.width
	height: screen.height
	image: "images/tabsView.png"

tabs.states =
	"hidden": { opacity: 0.2 }
	"shown": { opacity: 1 }
tabs.stateSwitch("hidden")

tabsView.sendToBack()





# Start Page







startPage = new Layer
	parent: startPage_ViewController
	width: screen.width
	height: screen.height
	backgroundColor: debugColor()
	backgroundColor: "white"


startPage_Bar = new Layer
	parent: startPage
	width: 375
	height: 146
	y: Align.bottom
	image: "images/mordaBar.png"




aliceBar = new Layer
	parent: globalTabs_View
	width: 375
	height: 80
	y: Align.bottom(-startPage_Bar.height)
	image: "images/aliceBar.png"




feedScroll = new ScrollComponent
	parent: startPage
	width: 375
	height: 812 - 102
	y: 102
	scrollVertical: true
	scrollHorizontal: false
	contentInset: 
		bottom: 144

feedScroll.sendToBack()

Sampled_Feed = new Layer
	parent: feedScroll.content
	width: 375
	height: 1581
	image: "images/sampled.png"


feedScroll.content.on "change:y", ->
	v = feedScroll.scrollY
	if v > 154
		scrollProxy.stateSwitch("feed")
	else
		scrollProxy.stateSwitch("start")


startPage_SiteButton = new Layer
	parent: Sampled_Feed
	x: 17
	y: 282
	height: 236
	width: 343
	backgroundColor: debugColor()

startPage_SiteButton.onTap ->
# 	firstTab_Flow.showNext(site_ViewController)
	firstTab_Flow.transition(site_ViewController, stackTransition)


startPage_SearchButton = new Layer
	parent: startPage_Bar
	height: 60
	x: 65
	y: 6
	width: 245
	backgroundColor: debugColor()

startPage_SearchButton.onTap ->
	searchView_scroll.scrollToPoint({ x: 0, y: 88 }, false)
	firstTab_Flow.transition(search_ViewController, stackTransition)




startPage_NavigateToReels_Button = new Layer
	parent: startPage_Bar
	height: 55
	width: 103
	backgroundColor: debugColor()
	y: 66
	x: 135

startPage_NavigateToReels_Button.onTap ->
	changeState("reels")


startPage_NavigateToTabs_Button = new Layer
	parent: startPage_Bar
	height: 55
	width: 103
	backgroundColor: debugColor()
	y: 68
	x: Align.right(-20)

startPage_NavigateToTabs_Button.onTap ->
	changeState("tabs_fromFeed")

# Start Page — On Scroll

scrollProxy = new Layer
	opacity: 0
	y: -3000

scrollProxy.states =
	"start": { opacity: 0 }
	"feed": { opacity: 0 }
scrollProxy.stateSwitch("start")

scrollProxy.on Events.StateSwitchEnd, (from, to) ->
	logoTransitionTime = 0.2
	if from != to
		if to == "start"
			startPage_HeaderTitleYandex.animate("shown", time: logoTransitionTime)
			startPage_HeaderTitleZen.animate("hidden", time: logoTransitionTime)
		else
			startPage_HeaderTitleYandex.animate("hidden", time: logoTransitionTime)
			startPage_HeaderTitleZen.animate("shown", time: logoTransitionTime)


startPage_Header = new Layer
	parent: startPage
	width: 375
	height: 100
	image: "images/startPage_Header.png"
	clip: true



startPage_HeaderTitleYandex = new Layer
	parent: startPage_Header
	width: 160
	height: 60
	y: Align.bottom
	image: "images/startPage_HeaderTitleYandex_logo.png"

startPage_HeaderTitleYandex.states =
	"hidden": { opacity: 0, y: Align.bottom(-30) }
	"shown": { opacity: 1, y: Align.bottom }
startPage_HeaderTitleYandex.stateSwitch("shown")



startPage_HeaderTitleZen = new Layer
	parent: startPage_Header
	width: 160
	height: 60
	y: Align.bottom
	image: "images/startPage_HeaderTitleZen.png"

startPage_HeaderTitleZen.states =
	"hidden": { opacity: 0, y: Align.bottom(30) }
	"shown": { opacity: 1, y: Align.bottom }
startPage_HeaderTitleZen.stateSwitch("hidden")






# Site

site_ViewController = new Layer
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	parent: screen

site_ViewController.on(Events.SwipeRightEnd, firstTab_Flow_prevSwipe)



site = new Layer
	parent: site_ViewController
	width: 375
	height: 821
	y: Align.top(44)
	image: "images/site_vc.jpg"


site_Bar = new Layer
	parent: site_ViewController
	width: 375
	height: 146
	y: Align.bottom
	image: "images/vcBar.png"







site_backButton = new Layer
	parent: site_Bar
	width: 109
	height: 50
	y: 68
	x: 18
	backgroundColor: debugColor()

site_backButton.on(Events.Tap, firstTab_Flow_prev)


site_homeButton = new Layer
	parent: site_Bar
	width: 109
	height: 50
	y: 68
	x: Align.center
	backgroundColor: debugColor()

site_homeButton.on(Events.Tap, firstTab_Flow_prev)


site_tabsButton = new Layer
	parent: site_Bar
	width: 109
	height: 50
	y: 68
	x: 242
	backgroundColor: debugColor()

site_tabsButton.onTap ->
	changeState("tabs_fromFeed")

# Search

search_ViewController = new Layer
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	parent: screen

search_ViewController.on(Events.SwipeRightEnd, firstTab_Flow_prevSwipe)



searchView = new Layer
	parent: search_ViewController
	width: 375
	height: 821
	y: Align.top(44)
	backgroundColor: "white"


search_Bar = new Layer
	parent: search_ViewController
	width: 375
	height: 146
	y: Align.bottom
	image: "images/searchBar.png"




searchView_scroll = new ScrollComponent
	parent: searchView
	width: 375
	height: 812 - search_Bar.height - 44
	scrollVertical: true
	scrollHorizontal: false

search_feed = new Layer
	parent: searchView_scroll.content
	width: 375
	height: 1465
	image: "images/search_feed.jpg"




search_backButton = new Layer
	parent: search_Bar
	width: 80
	height: 50
	y: 68
	x: 18
	backgroundColor: debugColor()

search_backButton.on(Events.Tap, firstTab_Flow_prev)


search_homeButton = new Layer
	parent: search_Bar
	width: 80
	height: 50
	y: 68
	x: 148
	backgroundColor: debugColor()

search_homeButton.on(Events.Tap, firstTab_Flow_prev)


search_tabsButton = new Layer
	parent: search_Bar
	width: 80
	height: 50
	y: 68
	x: 268
	backgroundColor: debugColor()

search_tabsButton.onTap ->
	changeState("tabs_fromFeed")



# Buttons


# Feed ->



# Reels -> 
secondTab_Flow_NavigateToFeed_Button = new Layer
	parent: secondTab_Flow
	height: 55
	width: 103
	backgroundColor: debugColor()
	y: Align.bottom(-24)
	x: Align.left(20)

secondTab_Flow_NavigateToFeed_Button.onTap ->
	changeState("global")



# Tabs ->
tabsView_NavigateBack_Button = new Layer
	parent: tabsView
	x: 276
	height: 54
	y: 718
	width: 99
	backgroundColor: debugColor()

tabsView_NavigateBack_Button.onTap ->
	changeState("feed_fromTabs")

# Transition

stackTransition = (firstTab_Flow, layerA = startPage_ViewController, layerB = site_ViewController, overlay) ->
	overlay.width = layerA.width
	overlay.height = layerA.height
	
	transition =
		layerA:
			show: { x: 0 }
			hide: { x: -375/2 }
		layerB:
			show: { x: 0, opacity: 1 }
			hide: { x: 375 }
		overlay:
			show: { opacity: 0.4 }
			hide: { opacity: 0 }



firstTab_Flow.showNext(startPage_ViewController)

# firstTab_Flow.showNext(site_ViewController, animate: false)
# firstTab_Flow.showPrevious(animate: false)

firstTab_Flow.transition(site_ViewController, stackTransition)
firstTab_Flow.transition(startPage_ViewController, stackTransition)

firstTab_Flow.transition(search_ViewController, stackTransition)
firstTab_Flow.transition(startPage_ViewController, stackTransition)



# System

if !Utils.isMobile()
	
	home_bar = new Layer
		parent: screen
		width: 375
		height: 34
		y: Align.bottom
		image: "images/home%20bar.png"
	
	status_bar = new Layer
		parent: screen
		width: 375
		height: 44
		image: "images/status%20bar.png"
	
	item.bringToFront() for item in [status_bar, home_bar]
 


