Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"

# API & Utils


isStoryView = () ->
	return true

alertViewCount = () ->
	return 1

isZenMediaCard = () ->
	return true


isFirstBannerView = () ->
	return true

isSecondBannerView = () ->
	return true


isOfferView = () ->
	return true




updateLayout = (currentcontentViewClassic) ->
	currentY = 0
	
	for view, i in currentcontentViewClassic.children
		view.y = currentY
		currentY += view.height
		
		if i == 0 or i == 1 or i == 2 then currentY += 0
		else currentY += 8
	
	currentParentContent.parent.updateContent()

# Populate Data

currentParentContent = null

setParent = (parentLayer) ->
	currentParentContent = parentLayer.content


getGap = (gapHeight = 8, gapColor = "null") ->
	new Layer { width: 360, height: gapHeight, backgroundColor: gapColor, parent: currentParentContent }


get = (viewData, uniRadius = 0) ->
	if uniRadius == 0 and (currentParentContent == contentViewSemiNew.content or currentParentContent == contentViewFuture.content) then uniRadius = 24

	if viewData == zenFutureView
		viewData = zenFutureCycler()
		uniRadius = 24
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


# Data: Classic

stocksView =
	height: 144
	image: "images/cards/stocks.png"

topView =
	height: 360
	image: "images/cards/top2.png"

storyView =
	height: 152
	backgroundColor: "white"
	image: "images/cards/stories.png"

alertCycler = Utils.cycle([2, 1])
alertView =
	height: 62
	image: "images/cards/alert 0#{alertCycler()}.png"

newsView =
	height: 481
	image: "images/cards/news.png"


zenMediaView =
	height: 380
	image: "images/cards/zen.png"

weatherView =
	height: 437
	image: "images/cards/weather.png"

bannerView =
	height: 210
	image: "images/cards/banner.png"

getBannerTopView =
	height: 76
	image: "images/cards/banner top.png"

tvView =
	height: 442
	image: "images/cards/tv.png"

offerView =
	height: 345
	image: "images/cards/offers.png"

localView =
	height: 393
	image: "images/cards/local.png"

newsPersonalView =
	height: 329
	image: "images/cards/personal.png"

collectionView =
	height: 340
	image: "images/cards/collections.png"

sportView =
	height: 328
	image: "images/cards/sport.png"

edadealView =
	height: 323
	image: "images/cards/edadeal.png"

marketView =
	height: 305
	image: "images/cards/market.png"

gamesView =
	height: 304
	image: "images/cards/games.png"

afishaView =
	height: 380
	image: "images/cards/afisha.png"

servicesView =
	height: 171
	image: "images/cards/services.png"

autoruView =
	height: 375
	image: "images/cards/autoru.png"

aliceSkillsView =
	height: 290
	image: "images/cards/skills.png"

efirView =
	height: 256
	image: "images/cards/efir.png"

nhlView =
	height: 324
	image: "images/cards/nhl.png"

translateView =
	height: 422
	image: "images/cards/translate.png"

musicView =
	height: 339
	image: "images/cards/music.png"

diskView =
	height: 432
	backgroundColor: Utils.randomColor()

theaterView =
	height: 380
	image: "images/cards/afisha white.png"




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


screenView = new Layer
	width: 360*3 + 40*2
	height: 640
	backgroundColor: "null"

screenView.center()

contentViewClassic = new ScrollComponent
	parent: screenView
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "#EEE"
	borderRadius: 8

contentViewSemiNew = new ScrollComponent
	parent: screenView
	width: 360
	height: 640
	x: 360 + 40
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "#F5F6F8"
	borderRadius: 8

contentViewFuture = new ScrollComponent
	parent: screenView
	width: 360
	height: 640
	x: (360 + 40) * 2
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "#F5F6F8"
	borderRadius: 8

texts = ["Prod", "July", "September"]
for item, i in [contentViewClassic, contentViewSemiNew, contentViewFuture]
	title = new TextLayer
		parent: item.parent
		x: item.x
		y: -80
		text: texts[i]
# contentViewClassic.center()

# print Screen.width
if Screen.width < 360 * 3 + 40 * 2
	screenView.scale = (Screen.width - 40) / (360 * 3 + 40 * 2)

screenView.x = Align.center()
screenView.y = Align.center(40)

# Get Image Size
 
# imageURl = newsFutureView.image
# print imageURl
# ;
# 
# 
# 
# `
# var img = new Image();
# img.src = imageURl
# `
# print img.width + " " + img.height/3


# Compose Classic

setParent(contentViewClassic)

updateData = () ->
	getGap(24, "white")
	get(topView)
	getGap(8)
	
	get(alertView)
	get(newsView)
	get(stocksView)
	get(zenView) for _ in [0...2]
	get(bannerView)
	get(weatherView)
	get(zenView) for _ in [0...1]
	get(zenAdView)
	get(tvView)
	
	get(localView)
	get(zenView) for _ in [0...1]
	get(collectionView)
	get(zenView) for _ in [0...1]
	get(newsPersonalView)
	get(promoView)
	get(zenView) for _ in [0...3]
	get(sportView)
	
	get(zenView) for _ in [0...1]
	get(zenAdView)
	get(zenView) for _ in [0...1]
	get(edadealView)
	get(zenView) for _ in [0...3]
	get(marketView)
	get(zenView) for _ in [0...2]
	
	get(zenAdView)
	get(gamesView)
	get(zenView) for _ in [0...3]
	get(musicView)
	get(zenView) for _ in [0...3]
	get(diskView)
	
	updateLayout(currentParentContent)

updateData()




status_bar = new Layer
	width: 360
	height: 24
	image: "images/status%20bar.png"
	parent: currentParentContent.parent

bottom_bar = new Layer
	width: 360
	height: 56
	image: "images/bottom%20bar.png"
	parent: currentParentContent.parent
	y: currentParentContent.height - 56

# ComposeSemiNew

setParent(contentViewSemiNew)

updateData = () ->
	getGap(24, "white")
	get(topView)
	getGap(8)
	
	get(alertView, 16)
	get(newsFutureView)
# 	get(stocksView)
	get(zenFutureView) for _ in [0...2]
	get(bannerView, 16)
	get(weatherFutureView, 16)
	get(zenFutureView) for _ in [0...1]
	get(zenAdFutureView)
	get(tvFutureView)
	
	get(localView)
	get(zenFutureView) for _ in [0...1]
	get(collectionView)
	get(zenFutureView) for _ in [0...1]
	get(newsPersonalView)
	get(promoView, 16)
	get(zenFutureView) for _ in [0...3]
	get(sportView)
	
	get(zenFutureView) for _ in [0...1]
	get(zenAdFutureView)
	get(zenFutureView) for _ in [0...1]
	get(edadealView)
	get(zenFutureView) for _ in [0...3]
	get(marketView)
	get(zenFutureView) for _ in [0...2]
	
	get(zenAdFutureView)
	get(gamesView)
	get(zenFutureView) for _ in [0...3]
	get(musicView)
	get(zenFutureView) for _ in [0...3]
	get(diskView)
	
	updateLayout(currentParentContent)

updateData()




status_bar = new Layer
	width: 360
	height: 24
	image: "images/status%20bar.png"
	parent: currentParentContent.parent

bottom_bar = new Layer
	width: 360
	height: 56
	image: "images/bottom%20bar.png"
	parent: currentParentContent.parent
	y: currentParentContent.height - 56

# ComposeFuture


setParent(contentViewFuture)

updateDataFuture = () ->
	getGap(24, "white")
	get(topView)
	getGap(8)
	
	get(alertView, 16)
	get(newsFutureView)
# 	get(stocksView)
	get(zenFutureView) for _ in [0...2]
	get(bannerView, 16)
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
	
	get(zenFutureView) for _ in [0...1]
	get(zenAdFutureView)
	get(zenFutureView) for _ in [0...1]
	get(edadealView)
	get(zenFutureView) for _ in [0...3]
	get(marketFutureView)
	get(zenFutureView) for _ in [0...2]
	
	get(zenAdFutureView)
	get(gamesFutureView)
	get(zenFutureView) for _ in [0...3]
	get(musicFutureView)
	get(zenFutureView) for _ in [0...3]
	get(diskView)
	
	updateLayout(currentParentContent)

updateDataFuture()




status_bar = new Layer
	width: 360
	height: 24
	image: "images/status%20bar.png"
	parent: currentParentContent.parent

bottom_bar = new Layer
	width: 360
	height: 56
	image: "images/bottom%20bar.png"
	parent: currentParentContent.parent
	y: currentParentContent.height - 56







