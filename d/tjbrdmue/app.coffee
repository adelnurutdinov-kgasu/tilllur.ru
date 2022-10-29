# Framer.Extras.Hints.disable()

# Layers

Screen.backgroundColor = "#222"

screen = new Layer
	width: 360
	height: 640
	image: "https://bro-bg-store.s3.yandex.net/14315a11-a04e-4646-aca3-6d7d3ea19d03.jpg"
	clip: true
	borderRadius: 8


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }
# if Screen.width < 1000 then screen.scale = Screen.width / 360
# screen.center()


feedOverlayTop = new Layer
	parent: screen
	width: 360
	height: 216 + 48
	backgroundColor: "white"

feedOverlayTop.states =
	"newTab": { opacity: 0, y: 0 }
	"feed": { opacity: 1, y: 0 - 216 + 24 }
feedOverlayTop.stateSwitch("newTab")



feedOverlayBottom = new Layer
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "#F0F1F5"

feedOverlayBottom.states =
	"newTab": { opacity: 0, y: 216 + 48 }
	"feed": { opacity: 1, y: 24 + 48 }
feedOverlayBottom.stateSwitch("newTab")

scrollView = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: true
	scrollHorizontal: false
	originY: 0


# Scroll

pageTop = new Layer
	width: screen.width
	height: screen.height

pageMid = new Layer
	width: screen.width
	height: 348
	y: pageTop.height

pageBot = new ScrollComponent
	width: screen.width
	height: screen.height - 48 - 24
	scrollVertical: false
	scrollHorizontal: false
	y: pageTop.height + pageMid.height

scrollView.on "change:currentPage", ->
	if scrollView.currentPage == pageBot
		pageBot.content.scrollVertical = true
		pageBot.scrollVertical = true
		scrollView.content.scrollVertical = false
		scrollView.scrollVertical = false
# 	else
# 		pageBot.content.scrollVertical = false
# 		pageBot.scrollVertical = false
# 		scrollView.content.scrollVertical = true
# 		scrollView.scrollVertical = true


guardFeedReturn = false


pageBot.content.on Events.DragStart, (event, layer) ->
	guardFeedReturn = false
	
	if pageBot.scrollY <= 0 and pageBot.content.draggable.direction == "down"
		guardFeedReturn = true


pageBot.content.on Events.DragEnd, (event, layer) ->
	if guardFeedReturn and pageBot.content.draggable.direction == "down"
		pageBot.content.scrollVertical = false
		pageBot.scrollVertical = false
		scrollView.content.scrollVertical = true
		scrollView.scrollVertical = true
		
		pageBot.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })
		scrollView.snapToPage(pageMid, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })


# Pages Init

for item, i in [pageTop, pageMid, pageBot]
	item.parent = scrollView.content
# 	item.backgroundColor = Utils.randomColor()
	item.backgroundColor = null


pageBot.originY = 0
pageBot.states =
	"newTab":
		scale: 344/360
	"feed":
		scale: 1
pageBot.stateSwitch("newTab")

scrollView.snapToPage(pageMid, false)

# New Tab: Content

sitesView = new Layer
	width: 360
	height: 84
	parent: pageTop
	backgroundColor: "null"
# 	y: Align.bottom(84+24)

sitesView.states =
	"newTab": { y: pageTop.height + 24 }
	"sites": { y: pageTop.height - 84 - 64 - 16 - 8 + 2 }
	"feed": { y: pageTop.height + 24 + 84 }
sitesView.stateSwitch("newTab")


sites = new Layer
	width: 360
	height: 218
	parent: sitesView
	y: Align.bottom()
	image: "images/sites.png"



logo = new Layer
	parent: pageMid
	width: 360
	height: 108
	y: 108
	image: "images/logo.png"

logo.states =
	"newTab": { opacity: 1, y: 108 }
	"feed": { opacity: 0, y: 108 + 84 }
	"sites": { opacity: 0, y: 108 }

tabs = new Layer
	parent: pageMid
	width: 360
	height: 48
	image: "images/tabs.png"

tabs.states =
	"newTab": { opacity: 1, y: 216 }
	"sites": { opacity: 0, y: 216 }
	"feed": { opacity: 0, y: 216 + 84 }


tabsFeedView = new Layer
	parent: pageMid
	width: 360
	height: 48
	backgroundColor: "null"

tabsFeedView.states =
	"newTab": { y: 216 }
	"sites": { y: 216 }
	"feed": { y: 216 + 84 }


tabsFeedImage = new Layer
	parent: tabsFeedView
	width: 360
	height: 48
	image: "images/tabsFeed.png"

tabsFeedImage.states =
	"newTab": { opacity: 0 }
	"sites": { opacity: 0 }
	"feed": { opacity: 1 }


omnibox = new Layer
	parent: pageMid
	width: 360
	height: 64
	image: "images/omnibox.png"

omnibox.states =
	"newTab": { opacity: 1, y: 264 }
	"sites": { opacity: 1, y: -64-16 }
	"feed": { opacity: 0, y: 264 + 84 }


pip = new Layer
	parent: pageMid
	width: 360
	height: 20
	y: 328
	image: "images/pip.png"

pip.states =
	"newTab": { opacity: 1 }
	"sites": { opacity: 0 }
	"feed": { opacity: 0 }




for item in [tabs, omnibox, pip, logo, tabsFeedImage, tabsFeedView]
	try item.stateSwitch("newTab")



# Feed: Content

feedContent = new Layer
	parent: pageBot.content
	width: 360
	height: 604
	image: "images/feedContent.png"





# Populate Data

currentParentContent = null

setParent = (parentLayer) ->
	currentParentContent = parentLayer.content


getGap = (gapHeight = 8, gapColor = "null") ->
	new Layer { width: 360, height: gapHeight, backgroundColor: gapColor, parent: currentParentContent }


get = (viewData, uniRadius = 24) ->
	if viewData == zenFutureView then viewData = zenFutureCycler()
	else if viewData == zenView then viewData = zenCycler()
	else if viewData == zenAdView then viewData = zenAdCycler()
	else if viewData == zenAdFutureView then viewData = zenAdFutureCycler()
	else if viewData == promoView then viewData = promoCycler()
	
	return new Layer { width: 360, height: viewData.height, image: viewData.image, parent: currentParentContent, borderRadius: uniRadius, backgroundColor: "white" }


zenView =
	image: "universal_zen_id"

zenFutureView =
	image: "universal_zen_future_id"

zenAdView =
	image: "universal_zen_ad_id"

zenAdFutureView =
	image: "universal_zen_ad_future_id"

promoView =
	image: "universal_promo_id"



updateLayout = (currentcontentViewClassic, currentY = 0) ->
	
	for view, i in currentcontentViewClassic.children
		view.y = currentY
		currentY += view.height
		
		if i == 0 or i == 1 or i == 2 then currentY += 0
		else currentY += 8
	
	currentParentContent.parent.updateContent()

# Data: Populate (Zen, Alerts, Ads)



zenFuture9 =
	height: 528
	image: "images/zenFuture/zenFuture9.png"

zenFuture10 =
	height: 468
	image: "images/zenFuture/zenFuture10.png"

zenFuture11 =
	height: 450
	image: "images/zenFuture/zenFuture11.png"

zenFuture12 =
	height: 370
	image: "images/zenFuture/zenFuture12.png"

zenFuture13 =
	height: 418
	image: "images/zenFuture/zenFuture13.png"

zenFuture14 =
	height: 355
	image: "images/zenFuture/zenFuture14.png"

zenFuture5 =
	height: 642
	image: "images/zenFuture/zenFuture5.png"

zenFuture6 =
	height: 554
	image: "images/zenFuture/zenFuture6.png"

zenFuture7 =
	height: 460
	image: "images/zenFuture/zenFuture7.png"

zenFuture8 =
	height: 422
	image: "images/zenFuture/zenFuture8.png"

zenFuture0 =
	height: 466
	image: "images/zenFuture/zenFuture0.png"

zenFuture1 =
	height: 332
	image: "images/zenFuture/zenFuture1.png"

zenFuture2 =
	height: 532
	image: "images/zenFuture/zenFuture2.png"

zenFuture3 =
	height: 502
	image: "images/zenFuture/zenFuture3.png"

zenFuture4 =
	height: 436
	image: "images/zenFuture/zenFuture4.png"


zenFutureCycler = Utils.cycle([zenFuture0, zenFuture1, zenFuture2, zenFuture3, zenFuture4, zenFuture5, zenFuture6, zenFuture7, zenFuture8])

zenAdFutureCycler = Utils.cycle([zenFuture9, zenFuture11, zenFuture12])

# zenFuture10, zenFuture13, zenFuture14


zenView0 =
	height: 432
	image: "images/zen/zen card example 01.png"

zenView1 =
	height: 432
	image: "images/zen/zen card example 02.png"

zenView2 =
	height: 432
	image: "images/zen/zen card example 03.png"

zenView3 =
	height: 432
	image: "images/zen/zen card example 04.png"

zenCycler = Utils.cycle([zenView0, zenView1, zenView2, zenView3])




zenAdView0 =
	height: 432
	image: "images/zen/zenAd0.png"

zenAdView1 =
	height: 432
	image: "images/zen/zenAd0.png"

zenAdCycler = Utils.cycle([zenAdView0, zenAdView1])



promoView0 =
	height: 144
	image: "images/cards/promo 01.png"

promoView1 =
	height: 172
	image: "images/cards/promo 02.png"

promoCycler = Utils.cycle([promoView0, promoView1])






newsFutureView =
	height: 448
	image: "images/cardsFuture/news.png"

stocksFutureView =
	height: 158
	image: "images/cardsFuture/stocks.png"

weatherFutureView =
	height: 480
	image: "images/cardsFuture/weather.png"

tvFutureView =
	height: 438
	image: "images/cardsFuture/tv.png"

localFutureView =
	height: 386
	image: "images/cardsFuture/local.png"

musicFutureView =
	height: 344
	image: "images/cardsFuture/musicFuture.png"

gamesFutureView =
	height: 354
	image: "images/cardsFuture/gamesFuture.png"

sportFutureView =
	height: 330
	image: "images/cardsFuture/sportFuture.png"

newsPersonalFutureView =
	height: 343
	image: "images/cardsFuture/personal.png"

marketFutureView =
	height: 320
	image: "images/cardsFuture/marketFuture.png"

collectionFutureView =
	height: 328
	image: "images/cardsFuture/collectionFuture.png"

promoFutureView =
	height: 170
	image: "images/cardsFuture/teaserFuture.png"

edadealFutureView =
	height: 345
	image: "images/cardsFuture/edadeal.png"

# ComposeFuture


setParent(pageBot)

updateDataFuture = () ->
	getGap(0)
	getGap(0)
	getGap(0)
	
	get(newsFutureView)
	get(zenFutureView) for _ in [0...2]
	get(weatherFutureView, 16)
	get(zenFutureView) for _ in [0...1]
	get(zenAdFutureView)
	get(tvFutureView)
	
	get(localFutureView)
	get(zenFutureView) for _ in [0...1]
	get(collectionFutureView)
	get(zenFutureView) for _ in [0...1]
	get(newsPersonalFutureView)
	get(promoFutureView, 16)
	get(zenFutureView) for _ in [0...3]
	get(sportFutureView)
	
# 	get(zenFutureView) for _ in [0...1]
# 	get(zenAdFutureView)
# 	get(zenFutureView) for _ in [0...1]
# 	get(zenFutureView) for _ in [0...3]
# 	get(marketFutureView)
# 	get(zenFutureView) for _ in [0...2]
# 	
# 	get(zenAdFutureView)
# 	get(gamesFutureView)
# 	get(zenFutureView) for _ in [0...3]
# 	get(musicFutureView)
# 	get(zenFutureView) for _ in [0...3]
	
	updateLayout(currentParentContent)

updateDataFuture()





# System: Content

statusBar = new Layer
	parent: screen
	width: 360
	height: 24
	backgroundColor: "black"


backButton = new Layer
	parent: tabsFeedImage
	height: tabsFeedImage.height
	width: 100
	x: 40
	backgroundColor: null

backButton.on Events.Tap, ->
	if scrollView.currentPage != pageBot
		scrollView.snapToPage(pageBot, true, { curve: Spring(damping: 1), time: 0.5 })
	else
		if pageBot.scrollY > 640 then pageBot.scrollToPoint({ x: 0, y: 640 }, false)
		
		pageBot.scrollToPoint(
			{ x: 0, y: 0 },
			true,
			{ curve: Spring(tension: 400, friction: 40) }
		)



# ScrollView Animate Transition
toFeedGap = [640, 916] #[0, 1]
toFeedGapFast = [640, 640 + 80] #[0, 0.3]
toFeedGapMedium = [640, 640 + 160] #[0, 0.6]

toSiteGap = [0, 640] #[0, 1]
toSiteGapFast = [560, 640] #[0.88, 1]

isSwipeToFeed = (localValue) -> return localValue >= toFeedGap[0] and localValue <= toFeedGap[1]
isSwipeToSite = (localValue) -> return localValue >= toSiteGap[0] and localValue <= toSiteGap[1]

scrollView.content.on "change:y", ->
	v = scrollView.scrollY
	
	if isSwipeToFeed(v)
		[s1, s2] = ["newTab", "feed"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[pageBot, "scale", toFeedGap],
									[feedOverlayBottom, "opacity", toFeedGap],
									[feedOverlayBottom, "y", toFeedGap],
									[feedOverlayTop, "opacity", toFeedGap],
									[feedOverlayTop, "y", toFeedGap],
									
									[sitesView, "y", toFeedGap],
									[logo, "opacity", toFeedGapMedium],
									[logo, "y", toFeedGap],
									[tabs, "y", toFeedGap],
									[tabsFeedView, "y", toFeedGap],
									[tabsFeedImage, "opacity", toFeedGap],
									[omnibox, "opacity", toFeedGapMedium],
									[omnibox, "y", toFeedGap],
									[pip, "opacity", toFeedGapFast],

			
		]

	else
		[s1, s2] = ["sites", "newTab"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[sitesView, "y", toSiteGap],
									[omnibox, "y", toSiteGap],
									[logo, "opacity", toSiteGapFast],
									[tabs, "opacity", toSiteGapFast],
		]


