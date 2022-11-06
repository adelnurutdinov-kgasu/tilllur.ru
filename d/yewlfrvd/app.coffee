Framer.Extras.Hints.disable()
tempTarget = null

appsModule = require "Apps"

# App View: Horizontal Scroll

appView = new Layer
	width: 360
	height: 640
	backgroundColor: "transparent"
	image: "images/wallpaper.png"

# appView.center()


canvasScroll = new PageComponent
	parent: appView
	width: appView.width
	height: appView.height
	backgroundColor: "transparent"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true


for item, i in ["leftCanvas", "midCanvas", "rightCanvas"]
	
	currentCanvas = new ScrollComponent
		parent: canvasScroll.content
		x: (canvasScroll.width + 16) * (i)
		height: canvasScroll.height
		width: canvasScroll.width
		backgroundColor: "transparent"
		scrollHorizontal: false
		directionLock: true
		contentInset: 
			bottom: 100
	
canvasScroll.updateContent()
canvasScroll.snapToPage(canvasScroll.content.children[1], false)


whiterView = new Layer
	width: canvasScroll.width
	height: canvasScroll.height
	parent: appView
	backgroundColor: "white"
	opacity: 0

whiterView.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

blur = new Layer
	parent: appView
	width: 360
	height: 640
	backgroundColor: "transparent"
	image: "images/blur.png"

blur.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
	
blur.stateSwitch("hidden")

whiterView.sendToBack()
blur.sendToBack()

canvasScroll.on "change:currentPage", ->
	index = -1
	if canvasScroll.currentPage == canvasScroll.content.children[0] then index = 0
	else if canvasScroll.currentPage == canvasScroll.content.children[1] then index = 1
	else if canvasScroll.currentPage == canvasScroll.content.children[2] then index = 2
	else return
	
	for item, i in navigationViewTitles.children
		if i == index then item.children[0].animate("shown", time: 0.2)
		else item.children[0].animate("hidden", time: 0.2)


canvasScroll.content.on "change:x", ->
	lBHeader = [0, 360 + 16]
	rBHeader = [360 + 16, 720 + 32]
	csValue = canvasScroll.scrollX
# 	print csValue
	
	if csValue > rBHeader[0]
		progressView.x = Utils.modulate(csValue, rBHeader, [progressView.states.mid.x, progressView.states.right.x], true)
		progressView.width = Utils.modulate(csValue, rBHeader, [progressView.states.mid.width, progressView.states.right.width], true)
		
		whiterView.opacity = Utils.modulate(csValue, [370, 720 - 90], [whiterView.states.hidden.opacity, .9], true)
		newTabView.opacity = Utils.modulate(csValue, [370, 720 - 90], [1, 0], true)
		
	else
		progressView.x = Utils.modulate(csValue, lBHeader, [progressView.states.left.x, progressView.states.mid.x], true)
		progressView.width = Utils.modulate(csValue, lBHeader, [progressView.states.left.width, progressView.states.mid.width], true)
		
		whiterView.opacity = Utils.modulate(csValue, [90, 350], [whiterView.states.shown.opacity, whiterView.states.hidden.opacity], true)
		newTabView.opacity = Utils.modulate(csValue, [90, 350], [0, 1], true)

# Navigation View

navigationView = new Layer
	parent: canvasScroll
	height: 68
	width: appView.width
	backgroundColor: "white"
	shadowY: 1
	shadowBlur: 2
	shadowColor: "rgba(0,0,0,0.2)"



progressView = new Layer
	height: 2
	y: 60
	backgroundColor: "black"
	parent: navigationView

progressView.states =
	"left": { x: 0, width: 0 }
	"mid": { x: 0, width: 0 }
	"right": { x: 0, width: 0 }

navigationViewTitles = new Layer
	parent: navigationView
	height: navigationView.height
	width: navigationView.width
	backgroundColor: "transparent"

sumNavigationViewWidth = 0
for currentTitle, i in ["Приложения", "Главная", "Мой Яндекс"]
	progressViewState = "left"
	if i == 1 then progressViewState = "mid"
	else if i == 2 then progressViewState = "right"
	
	title = new TextLayer
		text: currentTitle
		fontSize: 15
		textAlign: "center"
		lineHeight: 1.2
		color: "black"
		fontWeight: "500"
		letterSpacing: 0.2
		padding:
			top: 32
	
	title.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.5 }
	if i == 1 then title.stateSwitch("shown") else title.stateSwitch("hidden")
	
	titleButton = new Layer
		parent: navigationViewTitles
		width: title.width + 12 * 2
		height: 68
		x: 20 + sumNavigationViewWidth
		backgroundColor: "transparent"
		name: progressViewState
	
	titleButton.on Events.Tap, (event, layer) ->
		index = -1
		if layer.name == "left" then index = 0
		else if layer.name == "mid" then index = 1
		else if layer.name == "right" then index = 2
		else return
		
		canvasScroll.snapToPage(canvasScroll.content.children[index])
# 		progressView.animate(layer.name, time: 0.2)
	
	
	
	progressView.states[progressViewState].x = titleButton.x + 12
	progressView.states[progressViewState].width = title.width
	
	if i == 1 then progressView.stateSwitch("mid")
	
	title.parent = titleButton
	title.width = titleButton.width
	title.x = Align.center()
	
	sumNavigationViewWidth += titleButton.width
	



# Apps Store

# storeView = new ScrollComponent
# 	parent: canvasScroll.content.children[0].content
# 	width: appView.width
# 	height: appView.height
# 	scrollVertical: true
# 	scrollHorizontal: false
# 	directionLock: true
# 	backgroundColor: "transparent"

featuredViewTitle = new TextLayer
	parent: canvasScroll.content.children[0].content
	y: navigationView.height
	width: appView.width
	height: 40
	textIndent: 16
	padding:
		top: 14
	text: "Турбо приложения"
	fontSize: 16
	lineHeight: 1.25
	fontWeight: 500
	color: "rgba(0,0,0,0.8)"
	

featuredView = new ScrollComponent
	parent: canvasScroll.content.children[0].content
	width: appView.width
	height: 192
	y: navigationView.height + featuredViewTitle.height
	scrollVertical: false
	scrollHorizontal: true
	propagateEvents: false
	directionLock: true
	backgroundColor: "transparent"
	contentInset:
		right: 10



actionViewTitle = new TextLayer
	parent: canvasScroll.content.children[0].content
	width: appView.width
	height: 40
	y: navigationView.height + featuredViewTitle.height + featuredView.height
	textIndent: 16
	padding:
		top: 14
	text: "Быстрые действия"
	fontSize: 16
	lineHeight: 1.25
	fontWeight: 500
	color: "rgba(0,0,0,0.8)"

actionView = new ScrollComponent
	parent: canvasScroll.content.children[0].content
	width: appView.width
	height: 88
	y: navigationView.height + featuredViewTitle.height + featuredView.height + actionViewTitle.height
	contentInset:
		right: 12
	scrollVertical: false
	scrollHorizontal: true
	propagateEvents: false
	directionLock: true
	backgroundColor: "transparent"




allAppsViewTitle = new TextLayer
	parent: canvasScroll.content.children[0].content
	width: appView.width
	height: 40
	y: navigationView.height + featuredViewTitle.height + featuredView.height + actionViewTitle.height + actionView.height
	textIndent: 16
	padding:
		top: 14
	text: "Все приложения"
	fontSize: 16
	lineHeight: 1.25
	fontWeight: 500
	color: "rgba(0,0,0,0.8)"

# New Tab: Draggable View

prevStableState = null

vTeaserT = 200
vTeaserB = 190
vPanel = 68

vHeightT = 640
vHeightM = 640 - vTeaserT - vTeaserB
vHeightB = 640 - vPanel

vSum = vHeightT + vHeightM + vHeightB



newTabView = new PageComponent
	width: 360
	height: 640
	backgroundColor: "transparent"
	parent: canvasScroll.content.children[1]
	scrollHorizontal: false
	directionLock: true
	contentInset:
		bottom: 100


prevHeight = 0
for currentHeight, i in [vHeightT, vHeightM, vHeightB]
	currentPage = new Layer
		width: newTabView.width
		height: currentHeight
		parent: newTabView.content
		y: prevHeight
		backgroundColor: Utils.randomColor()
		backgroundColor: "transparent"
		opacity: 1
		name: "page: " + i
	
	prevHeight += currentHeight

newTabView.snapToPage(newTabView.content.children[1], false)

# newTabView.content.on Events.AnimationStart, (event, layer)->
# 	print newTabView.currentPage
# 	print event.layer

# newTabView.content.on Events.DragEnd, (event, layer) ->
# 	print layer
# 	print newTabView.velocity.y
# 	if layer.y < -400 and newTabView.velocity.y < 0
# 		print "Or?"
# 		newTabView.originY = 1
# 	else
# 		newTabView.originY = 0.5
		
# 	if newTabView.currentPage == newTabView.content.children[1] and newTabView.velocity.y < 0
# 		print "Or?"
# 		newTabView.originY = 1
# 	else newTabView.originY = 0.5

# newTabView.content.on Events.AnimationStart, (event, layer) ->
# 	print newTabView.currentPage
# 	print newTabView.velocity
	

# newTabView.content.on Events.AnimationEnd, ->
# 	newTabView.originY = 0.5

newTabView.on "change:currentPage", ->
	if newTabView.currentPage is newTabView.content.children[2]
# 		newTabView.originY = 1
		newTabView.scrollVertical = false
		zen_view.scrollVertical = true
# 	else
# 		newTabView.originY = 0.5
# 	print newTabView.currentPage
	
# 	if newTabView.currentPage is newTabView.content.children[1]
# 		newTabView.originY = 1
# 	else if newTabView.currentPage is newTabView.content.children[0] or newTabView.currentPage is newTabView.content.children[2]
# 		newTabView.originY = 0.5

newTabAppView = null

newTabView.content.on "change:y", ->
	value = newTabView.scrollY
# 	if value <= vHeightM + vTeaserT and value >= 0
	
	newTabLogo.y = Utils.modulate(value, [vHeightM + vTeaserT, 0], [-56, 0], true)
	try cardTeaser.opacity = Utils.modulate(value, [vHeightM + vTeaserT + 100, vHeightM + vTeaserT + vHeightB - vTeaserB - 100], [1, 0], true)
	try zenViewTitle.opacity = Utils.modulate(value, [vHeightM + vTeaserT + 100, vHeightM + vTeaserT + vHeightB - vTeaserB - 100], [1, 0], true)
	
	blur.opacity = Utils.modulate(value, [vHeightM + vTeaserT + 100, vHeightM + vTeaserT + vHeightB - vTeaserB - 100], [0, 1], true)
	
	for row in newTabAppView.children
		row.y = Utils.modulate(value, [vHeightM + vTeaserT, 0], [row.states.hidden.y, row.states.shown.y], true)
		
		for icon in row.children
			iconText = icon.children[1]
			iconText.opacity = Utils.modulate(value, [vHeightM + vTeaserT - 100, 0], [iconText.states.hidden.opacity, iconText.states.shown.opacity], true)
	

# Zen View: Scroll Component

zen_view = new ScrollComponent
	width: 360
	height: 640 - vPanel
	parent: newTabView.content.children[2]
	backgroundColor: "rgba(252,19,27,.5)"
	backgroundColor: "transparent"
	scrollVertical: false
	scrollHorizontal: false
	momentum: false
	directionLock: true
	contentInset:
		bottom: 72


zen_view.content.on Events.DragEnd, (event, layer) ->
	value = layer.y
	
	if value > 24
		zen_view.scrollVertical = false
		zen_view.scrollToPoint({x: 0, y: 0}, true, curve: Bezier.easeOut, time: 0.3)
		
		newTabView.snapToPage(newTabView.content.children[1])
		newTabView.scrollVertical = true



# Content: New Tab



newTabLogo = new Layer
	width: 360
	height: 306
	parent: newTabView.content.children[1]
	backgroundColor: "transparent"
# 	image: "images/new tab logo.png"
	y: -56


tLogo = new Layer
	parent: newTabLogo
	x: 92
	y: 20
	width: 176
	height: 70
	image: "images/tab/tLogo.png"

tOmnibox = new Layer
	parent: newTabLogo
	x: 0
	y: 90
	width: 360
	height: 64
	image: "images/tab/tOmnibox.png"

tWeather = new Layer
	parent: newTabLogo
	x: 39
	y: 158
	width: 76
	height: 32
	image: "images/tab/tWeather.png"

tTraffic = new Layer
	parent: newTabLogo
	x: 123
	y: 158
	width: 54
	height: 32
	image: "images/tab/tTraffic.png"
	name: appsModule.getURL("Карты")

tMail = new Layer
	parent: newTabLogo
	x: 185
	y: 158
	width: 40
	height: 32
	image: "images/tab/tMail.png"
	name: appsModule.getURL("Почта")

tChats = new Layer
	parent: newTabLogo
	x: 233
	y: 158
	width: 40
	height: 32
	image: "images/tab/tChats.png"
	name: "yandex.ru/#messenger"

tNotification = new Layer
	parent: newTabLogo
	x: 281
	y: 158
	width: 40
	height: 32
	image: "images/tab/tNotification.png"
	name: "yandex.ru/#dialog=notifier"

tAction = new Layer
	parent: newTabLogo
	x: 0
	y: 194
	width: 360
	height: 90
	image: "images/tab/tAction.png"
	name: "framer.cloud/sBzss/index.html"
# 	name: "https://yandex.ru/maps/213/moscow/?um=constructor%3Aae37dafe5c36595134dcb6cd0de5645c30437ffdc87de7ac09bc1e8e6ea08026&source=constructorLink&mode=usermaps&ll=37.571913%2C55.727802&z=13&l=trf%2Ctrfe"



for item in [tTraffic, tMail, tChats, tNotification, tAction]
	item.on Events.Tap, (event, layer) ->
		try
			window.webkit.messageHandlers.open.postMessage("https://" + layer.name);


# print Screen


tWeather.on Events.Tap, ->
	canvasScroll.snapToPage(canvasScroll.content.children[2])

# Content: Zen




zenViewTitle = new TextLayer
	parent: zen_view.content
	width: appView.width
	height: 40
# 	textIndent: 16
	padding:
		top: 14
	text: "Мои рекомендации"
	textAlign: "center"
	fontSize: 16
	lineHeight: 1.25
	fontWeight: 500
	color: "rgba(255,255,255,0.8)"



# zen_title = new Layer
# 	width: 176
# 	height: 12
# 	x: 92
# 	y: 20
# 	image: Utils.randomImage()
# 	opacity: 0.8


# zen_cards = new Layer
# 	width: 330
# 	height: 1124
# 	x: 15
# 	y: 47


cardTeaser = null

zenBlockHeight = 44

addZenBlock = (blockView, blockURL) ->
	blockView.parent = zen_view.content
	blockView.y = zenBlockHeight
# 	blockView.shadowY = 1
# 	blockView.shadowBlur = 4
# 	blockView.shadowColor = "rgba(0,0,0,0.07)"
	zenBlockHeight += (blockView.height + 8)
	
	blockView.name = blockURL
	if blockURL != ""
		blockView.on Events.Tap, (event, layer) ->
			try
				window.webkit.messageHandlers.open.postMessage("https://" + layer.name);


zCard0 = new Layer
	width: 360
	height: 400
	image: "images/zen/Card0.png"

zTeaser = new Layer
	parent: zCard0
	width: 360
	height: 400
	image: "images/zen/Teaser.png"

zTeaser.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
zTeaser.stateSwitch("shown")

zNews = new Layer
	width: 360
	height: 480
	image: "images/zen/News.png"

zCard1 = new Layer
	width: 360
	height: 400
	image: "images/zen/Card1.png"

zLink0 = new Layer
	width: 360
	height: 400
	image: "images/zen/Link0.png"

zCard2 = new Layer
	width: 360
	height: 400
	image: "images/zen/Card2.png"

zLink1 = new Layer
	width: 360
	height: 400
	image: "images/zen/Link1.png"

# zCard3 = new Layer
# 	width: 360
# 	height: 400
# 	image: "images/zen/Card0.png"





cardTeaser = zTeaser

addZenBlock(zCard0, "www.wonderzine.com/wonderzine/style/style/245377-fall-wardrobe")
addZenBlock(zNews, "")
addZenBlock(zCard1, "zen.yandex.ru/media/beat_music/nauka-vyiasnila-pochemu-freddi-merkiuri-byl-takim-neveroiatnym-pevcom-5d0b54894b447200af8356c4")
addZenBlock(zLink0, "daily.afisha.ru/cities/12201-chemu-uchit-keys-yamy-ili-pochemu-kitay-gorod-stal-mestom-sily-vseh-podrostkov-moskvy/")
addZenBlock(zCard2, "wylsa.com/zhivye-fotografii-ne-samogo-krasivogo-google-pixel-4/")
addZenBlock(zLink1, "the-flow.ru/news/skims-kardashian")
# addZenBlock(zCard3, "yandex.ru")

zen_view.updateContent()


# zenCardsArray = ["zen_card_1", "zen_card_2", "zen_card_3"]
# for item, i in zenCardsArray
# 	card = new Layer
# 		width: 360
# # 		x: 16
# 		height: 400
# 		y: 44 + i * (400+16)
# 		parent: zen_view.content
# 		borderRadius: 8
# 		image: "images/zen/card " + i + ".png"
# # 		backgroundColor: "white"
# 	
# 	if i == 0
# 		cardTeaser = new Layer
# 			parent: card
# 			size: card
# 			image: "images/zen/card " + i + " teaser.png"
# 		
# 		cardTeaser.states =
# 			"shown": { opacity: 1 }
# 			"hidden": { opacity: 0 }
# 		cardTeaser.stateSwitch("shown")


zNewsHeader = new Layer
	parent: zNews
	width: 330
	x: 15
	height: 51
	backgroundColor: "transparent"
	name: appsModule.getURL("Новости")

zNews0 = new Layer
	parent: zNews
	width: 330
	height: 80
	y: 51
	x: 15
	image: "images/zen/news0.png"
	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FMID_obyasnil_snyatie_s_poezda_amerikanskikh_diplomatov_v_Severodvinske--1e371b7cb539dff4709a4362f6a78803%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77266052%26rubric%3Dindex%26stid%3DY_OvHWvOFm85xwNQv5Ej%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.1e371b7c"

zNews1 = new Layer
	parent: zNews
	width: 330
	height: 60
	x: 15
	y: 132
	image: "images/zen/news1.png"
	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FV_GIBDD_soobshhili_o_novykh_ustrojstvakh_dlya_kontrolya_skorosti_avtomobilej--2dc294a0f4edf9b77bbb35e9609be6bb%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77259853%26rubric%3Dindex%26stid%3Dqx-lrzUmNKeW9pytKsHF%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.2dc294a0"
	
zNews2 = new Layer
	parent: zNews
	width: 330
	height: 80
	x: 15
	y: 193
	image: "images/zen/news2.png"
	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FYAndeks_nazval_razrushitelnye_posledstviya_zakona_o_znachimykh_sajtakh--a0d56e4657967d738b354e1aaeeaf413%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77268323%26rubric%3Dindex%26stid%3Df5Id76qYYDTGsdvm7TXd%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.a0d56e46"

zNews3 = new Layer
	parent: zNews
	width: 330
	height: 80
	x: 15
	y: 274
	image: "images/zen/news3.png"
	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FPutin_raskritikoval_glavu_Irkutskoj_oblasti_za_rabotu_posle_pavodkov--5ae78e01fa02489d5c1f9d4ffd591f85%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77083555%26rubric%3Dindex%26stid%3DSKYvBy055M_d01GaJ7l_%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.5ae78e01"

zNews4 = new Layer
	parent: zNews
	width: 330
	height: 60
	x: 15
	y: 355
	image: "images/zen/news4.png"
	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FEHrdogan_planiruet_posetit_Sochi_22_oktyabrya--3fccf647d504fef5e8fe616de0728f70%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77200795%26rubric%3Dindex%26stid%3D87X5YM2mEiVZs1Vf939Z%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.3fccf647"

zNewsFooter = new Layer
	parent: zNews
	width: 360
	height: 57
	y: 436
	backgroundColor: "transparent"
	name: appsModule.getURL("Новости")

for item in [zNewsHeader, zNewsFooter]
	item.on Events.Tap, (event, layer) ->
		try
			window.webkit.messageHandlers.open.postMessage("https://" + layer.name);

for item in [zNews0, zNews1, zNews2, zNews3, zNews4]
	item.backgroundColor = "white"
	item.on Events.Tap, (event, layer) ->
		try
			window.webkit.messageHandlers.open.postMessage(layer.name);

# Content : Featured + Actions

bestAppViewArray = appsModule.getPromoApps()

for item, i in bestAppViewArray
	item.parent = featuredView.content
	item.x = item.width * i + 8

featuredView.updateContent()

# for item, i in ["app1", "app2", "app3", "app4", "app5"]
# 	card = new Layer
# 		height: 180
# 		width: 100
# 		x: 10 + i * (100 + 16)
# 		y: 10
# 		image: Utils.randomImage()
# 		borderRadius: 10
# 		parent: featuredView.content


for item, i in ["app1", "app2"]
	action = new Layer
		height: 88
		width: 224
		x: 12 + i * 224
		image: "images/actions/" + i + ".png"
		parent: actionView.content
	
	if i == 0 then action.name = appsModule.getURL("Едадил")
	else if i == 1 then action.name = "framer.cloud/sBzss/index.html"
	
	action.on Events.Tap, (event, layer) ->
		try
			window.webkit.messageHandlers.open.postMessage("https://" + layer.name);

actionView.updateContent()

# Content: Yandex

yandexBlockHeight = 68 + 8


addYandexBlock = (blockView, openURL) ->
	blockView.parent = canvasScroll.content.children[2].content
	blockView.y = yandexBlockHeight
	blockView.shadowY = 1
	blockView.shadowBlur = 4
	blockView.shadowColor = "rgba(0,0,0,0.07)"
	yandexBlockHeight += (blockView.height + 8)
	
	blockView.name = openURL
	blockView.on Events.Tap, (event, layer) ->
		try
			window.webkit.messageHandlers.open.postMessage("https://" + layer.name);
			if layer.name == "passport.yandex.ru/auth?"
				Utils.delay 2, ->
					closeLoginView()
	

District = new Layer
	width: 360
	height: 344
	image: "images/yandex/District.png"

Edadeal = new Layer
	width: 360
	height: 320
	image: "images/yandex/Edadeal.png"



# Music = new Layer
# 	width: 360
# 	height: 240
# 	image: "images/yandex/Music.png"

# News = new Layer
# 	width: 360
# 	height: 480
# 	image: "images/yandex/News.png"

POI = new Layer
	width: 360
	height: 380
	image: "images/yandex/POI.png"

Stocks = new Layer
	width: 360
	height: 144
	image: "images/yandex/Stocks.png"

Transport = new Layer
	width: 360
	height: 432
	image: "images/yandex/Transport.png"

TV_schedule = new Layer
	width: 360
	height: 408
	image: "images/yandex/TV%20schedule.png"

# TVonline = new Layer
# 	width: 360
# 	height: 268
# 	image: "images/TVonline.png"

Weather = new Layer
	width: 360
	height: 400
	image: "images/yandex/Weather.png"

Login = new Layer
	width: 360
	height: 260
	image: "images/yandex/Login.png"

LoginButton = new Layer
	width: 288
	height: 56
	image: "images/yandex/LoginButton.png"
	parent: Login
	x: 36
	y: 166

# Zen = new Layer
# 	width: 360
# 	height: 360
# 	image: "images/Zen.png"


# addYandexBlock(News, "Новости")

# News.parent = canvasScroll.content.children[2].content
# News.y = yandexBlockHeight
# yandexBlockHeight += (News.height + 8)

# addYandexBlock(Zen, "Дзен")
addYandexBlock(Login, "passport.yandex.ru/auth?")
addYandexBlock(Weather, appsModule.getURL("Погода"))
addYandexBlock(Stocks, appsModule.getURL("Деньги"))
# addYandexBlock(Music, "Музыка")
addYandexBlock(Transport, appsModule.getURL("Транспорт"))
addYandexBlock(Edadeal, appsModule.getURL("Едадил"))
# addYandexBlock(TVonline, "Эфир")
addYandexBlock(TV_schedule, appsModule.getURL("Телепрограмма"))
addYandexBlock(District, appsModule.getURL("Район"))
addYandexBlock(POI, appsModule.getURL("Карты"))

# 
# newsHeader = new Layer
# 	parent: News
# 	width: 360
# 	height: 76
# 	backgroundColor: "transparent"
# 	name: appsModule.getURL("Новости")
# 
# news0 = new Layer
# 	parent: News
# 	width: 360
# 	height: 80
# 	y: 76
# 	image: "images/news0.png"
# 	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FMID_obyasnil_snyatie_s_poezda_amerikanskikh_diplomatov_v_Severodvinske--1e371b7cb539dff4709a4362f6a78803%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77266052%26rubric%3Dindex%26stid%3DY_OvHWvOFm85xwNQv5Ej%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.1e371b7c"
# 
# news1 = new Layer
# 	parent: News
# 	width: 360
# 	height: 60
# 	y: 76 + 80
# 	image: "images/news1.png"
# 	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FV_GIBDD_soobshhili_o_novykh_ustrojstvakh_dlya_kontrolya_skorosti_avtomobilej--2dc294a0f4edf9b77bbb35e9609be6bb%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77259853%26rubric%3Dindex%26stid%3Dqx-lrzUmNKeW9pytKsHF%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.2dc294a0"
# 	
# news2 = new Layer
# 	parent: News
# 	width: 360
# 	height: 80
# 	y: 76 + 80 + 60
# 	image: "images/news2.png"
# 	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FYAndeks_nazval_razrushitelnye_posledstviya_zakona_o_znachimykh_sajtakh--a0d56e4657967d738b354e1aaeeaf413%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77268323%26rubric%3Dindex%26stid%3Df5Id76qYYDTGsdvm7TXd%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.a0d56e46"
# 
# news3 = new Layer
# 	parent: News
# 	width: 360
# 	height: 80
# 	y: 76 + 80 + 60 + 80
# 	image: "images/news3.png"
# 	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FPutin_raskritikoval_glavu_Irkutskoj_oblasti_za_rabotu_posle_pavodkov--5ae78e01fa02489d5c1f9d4ffd591f85%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77083555%26rubric%3Dindex%26stid%3DSKYvBy055M_d01GaJ7l_%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.5ae78e01"
# 
# news4 = new Layer
# 	parent: News
# 	width: 360
# 	height: 60
# 	y: 76 + 80 + 60 + 80 + 80
# 	image: "images/news4.png"
# 	name: "https://yandex.ru/turbo?text=https%3A%2F%2Fyandex.ru%2Fnews%2Fstory%2FEHrdogan_planiruet_posetit_Sochi_22_oktyabrya--3fccf647d504fef5e8fe616de0728f70%3Ffrom%3Dmain_portal%26lang%3Dru%26persistent_id%3D77200795%26rubric%3Dindex%26stid%3D87X5YM2mEiVZs1Vf939Z%26t%3D1571255625%26tt%3Dtrue%26lr%3D213%26msid%3D1571256589.36105.141047.2360%26mlid%3D1571255625.glob_225.3fccf647"
# 
# newsFooter = new Layer
# 	parent: News
# 	width: 360
# 	height: 76
# 	y: 436
# 	backgroundColor: "transparent"
# 	name: appsModule.getURL("Новости")
# 
# for item in [newsHeader, newsFooter]
# 	item.on Events.Tap, (event, layer) ->
# 		try
# 			window.webkit.messageHandlers.open.postMessage("https://" + layer.name);
# 
# for item in [news0, news1, news2, news3, news4]
# 	item.on Events.Tap, (event, layer) ->
# 		try
# 			window.webkit.messageHandlers.open.postMessage(layer.name);



# Modules

# All Apps
appModuleAllView = appsModule.getAllAppView()

appModuleAllView.parent = canvasScroll.content.children[0].content
appModuleAllView.y = navigationView.height + featuredViewTitle.height + featuredView.height + actionViewTitle.height + actionView.height + allAppsViewTitle.height + 10
canvasScroll.content.children[0].updateContent()


# Best Apps
appModuleBestView = appsModule.getBestAppView()

appModuleBestView.parent = newTabView.content.children[0]
appModuleBestView.y = vHeightT - appModuleBestView.height + 4





newTabAppView = newTabView.content.children[0].children[0]
canvasScroll.content.children[1].content.opacity = 0


# LoginView Logic
closeLoginView = () ->
	for item in canvasScroll.content.children[2].content.children
		item.y = item.y - Login.height
	
	Login.destroy()
	canvasScroll.content.children[2].updateContent()

`window.hideLoginView = function () {
	closeLoginView()
}`



appsPromo = new Layer
	width: 360
	height: 186
	parent: newTabView.content.children[0]
	y: 68
	image: "images/yandex/AppsPromo.png"

appsPromo.on Events.Tap, ->
	canvasScroll.snapToPage(canvasScroll.content.children[0])



backAction = () ->
	if canvasScroll.currentPage is canvasScroll.content.children[1]
		if newTabView.currentPage is newTabView.content.children[1]
			
		else
			zen_view.scrollVertical = false
# 			zen_view.scrollToPoint({x: 0, y: 0}, true, curve: Bezier.easeOut, time: 0.3)
			zen_view.scrollToTop(false)
		
			newTabView.snapToPage(newTabView.content.children[1])
			newTabView.scrollVertical = true
	else
		canvasScroll.snapToPage(canvasScroll.content.children[1])


`window.performBack = function () {
	backAction()
}`






{ Preview } = require "PreviewComponent"
new Preview { view: appView, borderRadius: 16 }