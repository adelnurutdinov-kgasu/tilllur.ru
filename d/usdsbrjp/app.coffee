Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"

# API


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



# Data

getTopView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 301
		image: "images/cards/top.png"
	}

getTopView2 = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 360
		image: "images/cards/top2.png"
	}

getYaTeaserView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 196
		image: "images/cards/yateaser.png"
	}


zenTypeCycler = Utils.cycle([1, 2, 3, 4])
get________ZenView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 432
		image: "images/zen/zen card example 0#{zenTypeCycler()}.png"
	}





getStoryView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 152
		backgroundColor: "white"
		image: "images/cards/stories.png"
	}

alertCycler = Utils.cycle([2, 1])
getAlertView = () ->
	currentAlertType = alertCycler()
	
	if currentAlertType == 1
		return new Layer {
			parent: contentView.content
			width: 360
			height: 44
			image: "images/cards/alert 0#{currentAlertType}.png"
		}
	else
		return new Layer {
			parent: contentView.content
			width: 360
			height: 62
			image: "images/cards/alert 0#{currentAlertType}.png"
		}

getNewsView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 485
		image: "images/cards/news.png"
	}

getZenMediaView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 380
		image: "images/cards/zen.png"
	}

getWeatherView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 437
		image: "images/cards/weather.png"
	}

getBannerView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 177
		image: "images/cards/banner.png"
	}

getBannerTopView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 76
		image: "images/cards/banner top.png"
	}

promoCycler = Utils.cycle([1, 2])
getBannerPromoView = () ->
	currentPromoType = promoCycler()
	
	if currentPromoType == 1
		return new Layer {
			parent: contentView.content
			width: 360
			height: 154
			image: "images/cards/promo 0#{currentPromoType}.png"
		}
	else
		return new Layer {
			parent: contentView.content
			width: 360
			height: 172
			image: "images/cards/promo 0#{currentPromoType}.png"
		}

getTVView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 442
		image: "images/cards/tv.png"
	}

getOfferView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 345
		image: "images/cards/offers.png"
	}

getLocalView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 393
		image: "images/cards/local.png"
	}

getNewsPersonalView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 329
		image: "images/cards/personal.png"
	}

getCollectionView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 340
		image: "images/cards/collections.png"
	}

getSportView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 328
		image: "images/cards/sport.png"
	}

getEdadealView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 323
		image: "images/cards/edadeal.png"
	}

getMarketView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 305
		image: "images/cards/market.png"
	}

getGamesView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 304
		image: "images/cards/games.png"
	}

getAfishaView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 380
		image: "images/cards/afisha.png"
	}

getServicesView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 171
		image: "images/cards/services.png"
	}

getAutoruView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 375
		image: "images/cards/autoru.png"
	}

getAliceSkillsView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 290
		image: "images/cards/skills.png"
	}

getEfirView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 256
		image: "images/cards/efir.png"
	}

getNHLView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 324
		image: "images/cards/nhl.png"
	}

getTranslateView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 422
		image: "images/cards/translate.png"
	}

getMusicView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 339
		image: "images/cards/music.png"
	}

getDiskView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 432
		backgroundColor: Utils.randomColor()
	}

getTheaterView = () ->
	return new Layer {
		parent: contentView.content
		width: 360
		height: 380
		image: "images/cards/afisha white.png"
	}


contentView = new ScrollComponent
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "#EEE"

# contentView.center()


updateData = () ->
	currentLayers = []
	currentLayers.push(new Layer { width: 360, height: 24, backgroundColor: "#fff", parent: contentView.content})
	currentLayers.push(getTopView2())
	
# 	if isStoryView() then currentLayers.push(getStoryView())
	currentLayers.push(getBannerTopView())
	for item in [0...alertViewCount()]
		currentLayers.push(getAlertView())
	
	currentLayers.push(getNewsView())
	currentLayers.push(getZenMediaView())
	currentLayers.push(getWeatherView())
	currentLayers.push(getTVView())
	
	currentLayers.push(getYaTeaserView())
	
	currentLayers.push(get________ZenView())
	currentLayers.push(get________ZenView())
	currentLayers.push(get________ZenView())
	currentLayers.push(get________ZenView())
	
	currentLayers.push(get________ZenView())
	currentLayers.push(get________ZenView())
	currentLayers.push(get________ZenView())
	currentLayers.push(get________ZenView())
	
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getNewsPersonalView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getCollectionView())
# 	currentLayers.push(getBannerPromoView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getSportView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getEdadealView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getMarketView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getGamesView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getAfishaView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getServicesView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getAutoruView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getAliceSkillsView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getEfirView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getNHLView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getTranslateView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getMusicView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
# 	currentLayers.push(getTheaterView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	currentLayers.push(get________ZenView())
# 	
	updateLayout(currentLayers)

updateLayout = (views) ->
	currentY = 0
	for view, i in views
		view.y = currentY
		currentY += view.height
		if i == 0 or i == 1
			currentY += 0
		else
			currentY += 8
	
	contentView.updateContent()
	

updateData()




status_bar = new Layer
	width: 360
	height: 24
	backgroundColor: "white"
	parent: contentView

bottom_bar = new Layer
	width: 360
	height: 56
	image: "images/bottom%20bar.png"
	parent: contentView
	y: contentView.height - 56




{ Preview } = require "PreviewComponent"
new Preview { view: contentView, borderRadius: 8, topTheme: "light", forceAndroidBar: true }