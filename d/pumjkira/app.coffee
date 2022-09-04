Canvas.backgroundColor = "222"

{ Preview } = require "PreviewComponent"

screen = new Layer { width: 390, height: 844 }
preview = new Preview { view: screen }

tabViewScroll = new PageComponent
	parent: screen
	width: 390
	height: 844
	scrollVertical: false
	scrollHorizontal: false

for i in [0...4]
	tabView = new FlowComponent
		width: 390
		height: 844
		parent: tabViewScroll.content
		x: 390 * i


# Main

mainTabViewFlow = tabViewScroll.content.children[0]

mainTabView = new ScrollComponent
	width: 390
	height: 844
	backgroundColor: "FAF9F8"
	scrollVertical: true
	scrollHorizontal: false
	contentInset: 
		bottom: 82 + 6

mainTabViewFlow.showNext(mainTabView, animate: false)



card_01 = new Layer
	width: 390
	height: 368
	image: "images/card%2001.png"

card_02 = new Layer
	width: 390
	height: 461
	image: "images/card%2002.jpg"

card_03 = new Layer
	width: 390
	height: 304
	image: "images/card%2003.jpg"

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

sumY = 0
for item in [card_01, card_02, card_03, card_04, card_05, card_06]
	item.parent = mainTabView.content
	item.y = sumY
	sumY += item.height + 6
	
	if item != card_01 then item.borderRadius = 24




weatherButton = new Layer
	size: 120
	parent: card_01
	x: 16
	y: 194
	backgroundColor: "null"

weatherButton.onClick ->
	mainTabViewFlow.showNext(weather)

weather = new Layer
	width: 390
	height: 844
	image: "images/weather.jpg"

weather.onClick ->
	mainTabViewFlow.showPrevious()

weather.sendToBack()




card_02.onClick ->
	mainTabViewFlow.showNext(article)

card_04.onClick ->
	mainTabViewFlow.showNext(article)

article = new Layer
	width: 390
	height: 844
	image: "images/article.jpg"

article.onClick ->
	mainTabViewFlow.showPrevious()

article.sendToBack()



mainSearchButton = new Layer
	parent: card_01
	width: 390
	height: 60
	y: 124
	backgroundColor: "null"

mainSearchButton.onClick ->
	mainTabViewFlow.showOverlayTop(searchModal, animate: false)

searchModal = new Layer
	width: 390
	height: 844
	image: "images/searchModal.png"

searchModal.sendToBack()

searchModal.onClick ->
	mainTabViewFlow.showPrevious(animate: false)




card_03.onClick ->
	tabbar.children[2].emit Events.Click

# Browser

browserTabViewFlow = tabViewScroll.content.children[1]

browserView = new Layer
	width: 390
	height: 844
	image: "images/browser.jpg"

browserTabViewFlow.showNext(browserView, animate: false)



searchButton = new Layer
	parent: browserView
	width: 390
	y: 110
	height: 90
	backgroundColor: "null"



searchInlineButton = new Layer
	parent: browserView
	width: 390
	y: 110
	height: 140
	y: 460
	backgroundColor: "null"

searchInlineButton.onClick ->
	browserTabViewFlow.showNext(search)


search = new Layer
	width: 390
	height: 844
	image: "images/search.jpg"

searchBackButton = new Layer
	parent: search
	width: 390
	height: 100
	backgroundColor: "null"

searchBackButton.onClick ->
	browserTabViewFlow.showPrevious()


searchResultButton = new Layer
	parent: search
	width: 390
	height: 240
	y: 160
	backgroundColor: "null"

searchResultButton.onClick ->
	browserTabViewFlow.showNext(site)


site = new Layer
	width: 390
	height: 844
	image: "images/site.jpg"

site.onClick ->
	browserTabViewFlow.showPrevious()


search.sendToBack()
site.sendToBack()





searchButton.onClick ->
	browserTabViewFlow.showOverlayTop(searchModal2, modal: true, animate: false)

searchModal2 = new Layer
	width: 390
	height: 844
	image: "images/searchModal.png"

searchModal2.sendToBack()

searchModal2BackButton = new Layer
	parent: searchModal2
	width: 390
	height: 110
	backgroundColor: "null"
	

searchModal2BackButton.onClick ->
	browserTabViewFlow.showPrevious(animate: false)



# searchModal2SearchButton = new Layer
# 	parent: searchModal2
# 	width: 390
# 	height: 110
# 	y: 110
# 	backgroundColor: "null"
# 
# searchModal2SearchButton.onClick ->
# 	browserTabViewFlow.showNext(search)

# Shorts


shortsTabViewFlow = tabViewScroll.content.children[2]

shortsView = new Layer
	width: 390
	height: 844
	image: "images/shorts.jpg"

shortsTabViewFlow.showNext(shortsView, animate: false)

# Explore


exploreTabViewFlow = tabViewScroll.content.children[3]

exploreView = new Layer
	width: 390
	height: 844
	image: "images/explore.jpg"

exploreTabViewFlow.showNext(exploreView, animate: false)





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
	parent: mainTabView
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

scrollToTopButton.on Events.Tap, ->
	
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

scrollToTopButton.ignoreEvents = true


# print tabViewScroll.content.children[0].children[1].content.scrollY

# card_01.parent.on "change:y", ->
# 	print card_01.parent.y

# tabViewScroll.content.children[0].children[1].content.on "change:y", ->
# 	v = screen.scrollY

card_01.parent.on "change:y", ->
	v = -card_01.parent.y
	if v < 60
		headerGuard.stateSwitch("hidden")
	else
		headerGuard.stateSwitch("shown")
# 	else if screen.content.draggable.direction == "up"
# 		
# 		headerGuard.stateSwitch("shown")
# 	else if screen.content.draggable.direction == "down"
# 		
# 		headerGuard.stateSwitch("shown")


# TabBar

tabbar = new Layer
	parent: screen
	width: 390
	height: 82
	y: Align.bottom
	backgroundColor: "white"


for i in [0...4]
	iconButton = new Layer
		parent: tabbar
		width: 90
		height: 48
		x: 15 + 90 * i
		image: "images/icon#{i + 1}.png"
	
	iconButton.states =
		"hidden": { opacity: 0.28 }
		"shown": { opacity: 1 }
	if i == 0 then iconButton.stateSwitch("shown")
	else iconButton.stateSwitch("hidden")


changeTab = (index = 0) ->
	for item, i in tabbar.children
		if i == index then item.stateSwitch("shown")
		else item.stateSwitch("hidden")






tabbar.children[0].onClick ->
	changeTab(0)
	if tabViewScroll.currentPage == tabViewScroll.content.children[0]
		mainTabViewFlow.showPrevious()
	else
		tabViewScroll.snapToPage(tabViewScroll.content.children[0], false)



tabbar.children[1].onClick ->
	changeTab(1)
	if tabViewScroll.currentPage == tabViewScroll.content.children[1]
		browserTabViewFlow.showPrevious()
		browserTabViewFlow.showPrevious()
	else
		tabViewScroll.snapToPage(tabViewScroll.content.children[1], false)



tabbar.children[2].onClick ->
	changeTab(2)
	if tabViewScroll.currentPage == tabViewScroll.content.children[2]
		mainTabViewFlow.showPrevious()
	else
		tabViewScroll.snapToPage(tabViewScroll.content.children[2], false)


tabbar.children[3].onClick ->
	changeTab(3)
	if tabViewScroll.currentPage == tabViewScroll.content.children[3]
		mainTabViewFlow.showPrevious()
	else
		tabViewScroll.snapToPage(tabViewScroll.content.children[3], false)

mainTabViewFlow.showNext(weather, animate: false)
mainTabViewFlow.showPrevious(animate: false)

mainTabViewFlow.showNext(article, animate: false)
mainTabViewFlow.showPrevious(animate: false)

browserTabViewFlow.showNext(search, animate: false)
browserTabViewFlow.showPrevious(animate: false)

browserTabViewFlow.showNext(site, animate: false)
browserTabViewFlow.showPrevious(site: false)

browserTabViewFlow.showNext(searchModal, animate: false)
browserTabViewFlow.showPrevious(site: false)

browserTabViewFlow.showNext(searchModal2, animate: false)
browserTabViewFlow.showPrevious(site: false)

topBarFix = new Layer
	parent: searchModal, width: screen.width, height: 44
	backgroundColor: "white"

topBarFix2 = new Layer
	parent: searchModal2, width: screen.width, height: 44
	backgroundColor: "white"
