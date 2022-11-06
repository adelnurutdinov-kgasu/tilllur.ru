# cp ~/Documents/Git/ControlPanel-for-Framer/ControlPanel.framer/modules/ControlPanel.coffee ~/Documents/Git/Prototyping-Queue/01218\ zen\ dau\ increase.framer/modules/

Utils.insertCSS('@import url(css/project.css)')

panel = require 'ControlPanel'
presentationMode = false

# Helpers

delay = (time, fn, args...) ->
	setTimeout fn, time, args...


# App

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "black"

if presentationMode
	screen.scale = Math.min((Canvas.height - 40 * 2) / 640, 1.2)

homeScreen = new Layer
	parent: screen
	width: 1080 / 3
	height: 2160 / 3
	y: -40
	image: "images/Screenshot_20210118-114313.png"

appIcon = new Layer
	parent: homeScreen
	y: 219
	x: 80
	backgroundColor: "null"

searchIcon = new Layer
	parent: homeScreen
	width: 360
	y: 40
	height: 74
	backgroundColor: "null"




ppView = new Layer
	parent: screen
	width: 360
	height: 640
	backgroundColor: "white"

ppView.states =
	"hidden": { y: 640 }
	"shown": { y: 0 }
ppView.stateSwitch("hidden")



searchArrow = new Layer
	parent: ppView
	height: 63
	y: 116
	width: 360
	backgroundColor: "null"


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 24 }

# Morda


mordaContentView = new ScrollComponent
	parent: ppView
	width: 360
	height: 640 - 24
	y: 24
	scrollHorizontal: false
	scrollVertical: true
	backgroundColor: "FAF9F8"
	contentInset: 
		bottom: 40

mordaContentView.sendToBack()

mordaContentView.content.on Events.DragStart, ->
	hideTipNewArticles()
	


card = new Layer
	width: 360
	height: 440
	image: "images/card.png"

card.states =
	"teaser": { image: "images/card.png" }
	"normal": { image: "images/cardGeneral.png" }
card.stateSwitch("normal")


header = new Layer
	width: 360
	height: 244
	image: "images/header.png"






informersWithAlerts = new Layer
	width: 360
	height: 0
	image: "images/InformersWithAlerts.png"

informersWithAlerts.states =
	"origin": { height: 212, image: "images/InformersWithAlerts.png"}
	"one": { height: 155, image: "images/InformersWithAlert.png" }

informers = new Layer
	width: 360
	height: 94
	image: "images/informers.png"

informers.states =
	"origin": { height: 94 }

news = new Layer
	width: 360
	height: 488
	image: "images/news.png"

cardMore = new Layer
	width: 360
	height: 359
	image: "images/cardMore.png"

cardMoreMore = new Layer
	width: 360
	height: 536
	image: "images/cardMoreMore.png"

cardAd = new Layer
	width: 360
	height: 489
	image: "images/cardAd.png"




composeFeed = (layerArray) ->
	mordaContentY = 0
	
	for item in mordaContentView.content.children
		item.parent = null 
	
	for item in layerArray
		item.parent = mordaContentView.content
		item.y = mordaContentY
		
		if item.height != 0 then mordaContentY += item.height + 6
	
	mordaContentView.updateContent()



bringZenTop = () ->
	composeFeed([header, informers, informersWithAlerts, card, news, cardAd, cardMore, cardMoreMore])
	setTeaserCard()

bringNewsTop = () ->
	composeFeed([header, informers, informersWithAlerts, news, card, cardAd, cardMore, cardMoreMore])
	setNormalCard()





dotNotification = new Layer
	parent: header
	size: 40
	x: 20
	y: 4
	image: "images/dot.png"

dotMail = new Layer
	parent: header
	size: 40
	x: 64
	y: 4
	image: "images/dot.png"

for item in [dotNotification, dotMail]
	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	item.stateSwitch("hidden")


setTeaserCard = () ->
	try setMordaTipZen()
	if mordaContentView.content.children[3] == card
		card.image = card.states.teaser.image

setNormalCard = () ->
	try setMordaTipNews()
	card.image = card.states.normal.image





# Site


siteView = new Layer
	parent: ppView
	width: 360
	height: 640
	backgroundColor: "white"

siteView.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }

siteView.on Events.StateSwitchStart, (from, to) ->
	if from == to then return
	
	if to == "shown"
		try loadPage()
		@ignoreEvents = false
	else if to == "hidden"
		try unloadPage()
		@ignoreEvents = true

siteView.stateSwitch("hidden")


siteHeader = new Layer
	parent: siteView
	width: 360
	height: 92
	y: 24
	image: "images/siteHeader.png"



siteContent = new Layer
	parent: siteView
	width: 360
	height: 530
	y: siteHeader.y + siteHeader.height
	image: "images/siteContent.png"

siteContent.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
siteContent.stateSwitch("hidden")




loadPage = () ->
	siteContent.animate("shown", time: 0.1, delay: 0.7)

unloadPage = () ->
	siteContent.animate("hidden", time: 0.1, delay: 0.3)




bringZenTop()



# Tip


tipNewArticles = new Layer
	parent: mordaContentView
	width: 360
	height: 120
	image: "images/tipMordaZen.png"

tipNewArticles.states =
	"hidden": { y: Align.bottom(100 + 46), opacity: 0 }
	"shown": { y: Align.bottom(46), opacity: 1 }
	"news": { image: "images/tipMordaNews.png" }
	"zen": { image: "images/tipMordaZen.png" }

showTipNewArticles = () ->
	tipNewArticles.animate("shown", curve: Spring(damping: 0.65), time: 0.8)

hideTipNewArticles = (withAnimation = true) ->
	if !withAnimation then tipNewArticles.stateSwitch("hidden")
	else tipNewArticles.animate("hidden", curve: Spring(damping: 1), time: 0.5)


scrollToArticles = (event, layer) ->
	hideTipNewArticles(false)
	
	for item in mordaContentView.content.children
		if item == card
			mordaContentView.scrollToLayer(news, 0.5, 0.05)
			break
		else if item == news
			mordaContentView.scrollToLayer(card, 0.5, 0.05)
			break


tipNewArticles.on Events.StateSwitchStart, (from, to) ->
	if from == to then return
	if to is "hidden" then @off(Events.Tap, scrollToArticles)
	else @on(Events.Tap, scrollToArticles)

tipNewArticles.stateSwitch("hidden")

setMordaTipZen = () ->
	tipNewArticles.stateSwitch("zen")

setMordaTipNews = () ->
	tipNewArticles.stateSwitch("news")



# BottomBar

scrollGuard = new Layer
	opacity: 0

scrollGuard.states =
	"top": { opacity: 0 }
	"feed": { opacity: 0 }
scrollGuard.stateSwitch("top")



bottomBar = new Layer
	parent: ppView
	width: 360
	height: 56
	y: Align.bottom
	image: "images/omnibox%20(2).png"

bottomBar.states =
	"shown": { y: Align.bottom }
	"hidden": { y: Align.bottom }
bottomBar.stateSwitch("shown")

bbClip = new Layer
	parent: bottomBar
	width: 360
	height: 48
	y: Align.bottom()
	clip: true

bbBg = new Layer
	parent: bbClip
	width: 360
	height: 60
	y: Align.bottom()
	image: "images/bbBg.png"

bbIcons = new Layer
	parent: bbBg
	width: 360
	height: 60
	image: "images/bbIcons.png"

bbIcons.states =
	"shown": { opacity: 1, y: 0 }
	"hidden": { opacity: 0, y: -20 }
bbIcons.stateSwitch("shown")

bottomBar.on Events.StateSwitchStart, (from, to) ->
	if to != from
		bbIcons.animate(to, time: 0.2)


firstbottomBarIcon = new Layer
	parent: bottomBar
	y: 4
	height: 52
	width: 72
	backgroundColor: "null"



feedBottomBar = new Layer
	parent: ppView
	width: 360
	height: 48
	y: Align.bottom
	backgroundColor: "black"

feedBottomBar.states =
	"shown": { y: Align.bottom }
	"hidden": { y: Align.bottom(100) }
feedBottomBar.stateSwitch("hidden")




# Feed Bottom Bar content

# feedBottomBar.stateSwitch("shown")

renderedItemIndex = 0
fixFont = () ->
	renderedItemIndex = 3
	if renderedItemIndex == 3
		sumX = 0
		for title, i in textView.children
# 			print title.width
			dot = new Layer
				parent: title
				size: 6
				borderRadius: 2
				x: Align.center
				y: 22
				backgroundColor: "white"
	
			dot.states =
				"hidden": { opacity: 0 }
				"shown": { opacity: 1 }
			
			if i == 0 then dot.stateSwitch("shown")
			else dot.stateSwitch("hidden")
			
			title.x = sumX
			sumX += title.width + 16
		
		textView.width = sumX - 16
		textView.x = Align.center()


horns.parent = feedBottomBar
horns.y = -24

textView = new Layer
	parent: feedBottomBar
	backgroundColor: null
	y: 12


sumX = 0
for text, i in ["дзен", "видео", "подписки"]
	title = new TextLayer
		parent: textView
		fontFamily: "YS Text"
		fontWeight: 500
		text: text
		fontSize: 16
		lineHeight: 20/16
		x: sumX
		color: "white"
	
# 	title.on "change:fontFamily", ->
# 		fixFont()
	
	title.fontFamily = "YS Web Medium"



scroll_to_top = new Layer
	width: 24
	height: 24
	image: "images/scroll%20to%20top.png"
	parent: feedBottomBar
	x: Align.left(20)
	y: Align.top(12)

new_post = new Layer
	width: 24
	height: 24
	image: "images/Property%201=new%20message.png"
	parent: feedBottomBar
	x: Align.right(-20)
	y: Align.top(12)
# 	backgroundColor: "red"
# 	


scroll_to_top.on Events.Tap, ->
	scrollGuard.stateSwitch("top")
	if mordaContentView.scrollY > 640
		mordaContentView.scrollToPoint(
			x: 0, y: 640
			false
		)
	
	mordaContentView.scrollToPoint(
		x: 0, y: 0
		true
		curve: Spring(damping: 1), time: 0.5
	)


# Home Tips

delayReferenceGeo1 = null
delayReferenceGeo2 = null
delayReferenceNotification = null


tipRound = new Layer
	parent: bottomBar
	size: 24
	borderRadius: "100%"
	x: 36
	y: Align.bottom(-22)
	backgroundColor: "white"

tipRound.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
tipRound.stateSwitch('hidden')

homeTipGeoIcon = new Layer
	image: "images/Alert_%20Metro.png"

homeTipNotificationIcon = new Layer
	image: "images/Alert_%20Weather%20Popular.png"

for item in [homeTipGeoIcon, homeTipNotificationIcon]
	item.parent = tipRound
	item.width = 20
	item.height = 20
	item.x = Align.center
	item.y = Align.center
	
	item.states = 
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	item.stateSwitch("hidden")




tip_geo_1 = new Layer
	image: "images/tipMoscow.png"
	
tip_geo_2 = new Layer
	image: "images/tipMoscow.png"

tip_notification = new Layer
	image: "images/tipMoscow.png"

getDelayReference = (layer) ->
	if layer == tip_geo_1 then return delayReferenceGeo1
	else if layer == tip_geo_2 then return delayReferenceGeo2
	else if layer == tip_notification then return delayReferenceNotification
	return null

for item in [tip_geo_1, tip_geo_2, tip_notification]
	item.parent = ppView
	item.width = 360
	item.height = 120
	item.y = Align.bottom()
	item.ignoreEvents = true
	
	item.states =
		"hidden": { y: Align.bottom(10), opacity: 0 }
		"shown": { y: Align.bottom, opacity: 1 }

	item.on Events.StateSwitchEnd, (from, to) ->
		if from != to
			if to is "shown"
				delayReference = getDelayReference(@)
				delayReference = delay 2000, =>
					@animate("hidden", curve: Spring(damping: 1), time: 0.3)
	
	item.ignoreEvents = true
	item.stateSwitch("hidden")





# Handlers

openApp = (event = null, layer = null, withAnimation = true, nextState = "shown") ->
	if !withAnimation then ppView.stateSwitch(nextState)
	else ppView.animate(nextState, curve: Spring(damping: 1), time: 0.3)

closeApp = (event = null, layer = null, withAnimation = true, nextState = "hidden") ->
	if !withAnimation then ppView.stateSwitch(nextState)
	else ppView.animate(nextState, curve: Spring(damping: 1), time: 0.3)

openSite = (event = null, layer = null, withAnimation = true, nextState = "shown") ->
	openApp(withAnimation)
	if !withAnimation then ppView.stateSwitch(nextState)
	siteView.animate(nextState, curve: Spring(damping: 1), time: 0.3)

closeSite = (event = null, layer = null, withAnimation = true, nextState = "hidden") ->
# 	tipRound.stateSwitch("hidden")
	hideHomeTips()
	
	if !withAnimation then siteView.stateSwitch(nextState)
	siteView.animate(nextState, curve: Spring(damping: 1), time: 0.3)

scrollMordaToTop = (event = null, layer = null, withAnimation = true) ->
	mordaContentView.scrollToLayer(header, 0.5, 0, withAnimation, { curve: Spring(damping: 1), time: 0.5 })





sceneBackFromSiteWithTip = (event = null, layer = null, withAnimation = true) ->
	if siteView.states.current.name == "hidden"
		openSite(event, layer, false)
		hideTipNewArticles(event, layer, false)
		scrollMordaToTop(event, layer, false)
		Utils.delay 3, ->
			closeSite(event, layer, withAnimation)
		Utils.delay 3.5, ->
			showTipNewArticles()
	else
		closeSite(event, layer, withAnimation)
		Utils.delay 0.5, ->
			showTipNewArticles()




showSiteTip = (event = null, layer = null, withAnimation = true, nextState = "shown", targetLayer = null) ->
	if targetLayer == null then print "select Target"
	
	if siteView.states.current.name != "shown"
		openSite(event, layer, withAnimation)
		return
	
	if nextState == "shown" then reverseState = "hidden"
	else reverseState = "shown"
	
	
	if tipRound.states.current.name == "shown"
		alreadyTipped = true
	else
		tipRound.stateSwitch(nextState)
		alreadyTipped = false
	
	clearTimeout(item) for item in [delayReferenceGeo1, delayReferenceGeo2, delayReferenceNotification]
	
	if targetLayer == tip_geo_1 or targetLayer == tip_geo_2
		homeTipGeoIcon.stateSwitch(nextState)
		homeTipNotificationIcon.stateSwitch(reverseState)
	else
		homeTipNotificationIcon.stateSwitch(nextState)
		homeTipGeoIcon.stateSwitch(reverseState)
	
	
	if alreadyTipped then ;
	else
		for item in [tip_geo_1, tip_geo_2, tip_notification]
			if item == targetLayer
				if !withAnimation
					targetLayer.stateSwitch(nextState)
				else
					targetLayer.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			
			else item.animate(reverseState, curve: Spring(damping: 1), time: 0.5)



showGeo1Tip = (event = null, layer = null, withAnimation = true, nextState = "shown") ->
	showSiteTip(event, layer, withAnimation, nextState, tip_geo_1)

showGeo2Tip = (event = null, layer = null, withAnimation = true, nextState = "shown") ->
	showSiteTip(event, layer, withAnimation, nextState, tip_geo_2)

showNotificationTip = (event = null, layer = null, withAnimation = true, nextState = "shown") ->
	showSiteTip(event, layer, withAnimation, nextState, tip_notification)


hideGeo1Tip = (event = null, layer = null, withAnimation = true, nextState = "hidden") ->
	showSiteTip(event, layer, withAnimation, nextState, tip_geo_1)

hideGeo2Tip = (event = null, layer = null, withAnimation = true, nextState = "hidden") ->
	showSiteTip(event, layer, withAnimation, nextState, tip_geo_2)

hideNotificationTip = (event = null, layer = null, withAnimation = true, nextState = "hidden") ->
	showSiteTip(event, layer, withAnimation, nextState, tip_notification)



hideHomeTips = (nextState = "hidden") ->
	tipRound.stateSwitch(nextState)
	
	if homeTipGeoIcon.states.current.name == "shown"
		informersWithAlerts.stateSwitch("one")
		informers.height = 0
	else if homeTipNotificationIcon.states.current.name == "shown"
		informersWithAlerts.stateSwitch("origin")
		informers.height = 0
	else
		informersWithAlerts.height = 0
		informers.height = informers.states.origin.height
	
	bringZenTop()
		
	
# 	if homeTipNotificationIcon.states.current.name == "shown"
# 		dotNotification.stateSwitch("shown")
# 	else dotNotification.stateSwitch("hidden")
	
	item.stateSwitch(nextState) for item in [homeTipGeoIcon, homeTipNotificationIcon]
	
	for item in [tip_geo_1, tip_geo_2, tip_notification]
		clearTimeout(getDelayReference(item))
		item.animate(nextState, curve: Spring(damping: 1), time: 0.5)

# Panel

# panel.header("Приложение", "right")
# panel.button("Close", closeApp, "right", "appLaunch")
# panel.button("Open", openApp, "right", "appLaunch")
# 
# panel.header("Сайт", "right")
# panel.button("Close", closeSite, "right", "siteOpen")
# panel.button("Open", openSite, "right", "siteOpen")
# 
# 
# 
# panel.header("Первая карточка", "left")
# panel.button("Zen", bringZenTop, "left", "topCard")
# panel.button("News", bringNewsTop, "left", "topCard")
# 
# panel.header("Тизер", "left")
# panel.button("Special", setTeaserCard, "left", "teaserCard")
# panel.button("Normal", setNormalCard, "left", "teaserCard")
# 
# 
# panel.header("Обучение на Морде", "left")
# panel.button("Show", showTipNewArticles, "left", "tipFeed")
# panel.button("Hide", hideTipNewArticles, "left", "tipFeed")
# 
# 
# panel.button("Сценарий", sceneBackFromSiteWithTip, "left", "sceneArticlesNew")
# 
# panel.header("Обучение на сайте", "left")
# panel.button("Метро", showGeo1Tip, "left", "siteTip")
# panel.button("Погода", showNotificationTip, "left", "siteTip")

Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 87 then showTipNewArticles()
	else if event.keyCode is 65 then showGeo1Tip()
	else if event.keyCode is 83 then showNotificationTip()





appIcon.on(Events.Tap, openApp)
searchIcon.on(Events.Tap, openSite)
searchArrow.on(Events.Tap, openSite)
siteHeader.on(Events.Tap, closeSite)

firstbottomBarIcon.on(Events.Tap, closeSite)

openApp(null, null, false)


mordaContentView.content.on "change:y", ->
# 	print mordaContentView.scrollY
	if mordaContentView.scrollY > 98 or mordaContentView.content.draggable.velocity.y < -1
		scrollGuard.stateSwitch("feed")
	else if mordaContentView.scrollY < 98
		scrollGuard.stateSwitch("top")

scrollGuard.on Events.StateSwitchEnd, (from, to) ->
# 	print to
	if to != from
		if to == "top"
			bottomBar.animate("shown",
				curve: Spring(damping: 1), time: 0.5)
			feedBottomBar.animate("hidden",
				curve: Spring(damping: 1), time: 0.5)
		else if to == "feed"
			bottomBar.animate("hidden",
				curve: Spring(damping: 1), time: 0.5)
			feedBottomBar.animate("shown",
				curve: Spring(damping: 1), time: 0.5)
			

Utils.delay 1,->
	for item in textView.children
		item.children[0].x = Align.center

`
document.fonts.ready.then(function () {
  fixFont();
});
`

bottomBarFix = new Layer
	parent: screen, width: screen.width, height: 32, y: Align.top
	backgroundColor: "white"

avatarFix = new Layer
	parent: bbIcons
	x: Align.right(-27), y: Align.bottom(-10)
	size: 28, borderRadius: 100
	backgroundColor: "white"
	image: "https://tilllur.com/shared/avatars/tilllur.png"
