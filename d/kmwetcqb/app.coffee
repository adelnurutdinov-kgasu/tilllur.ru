Framer.Extras.Hints.disable()
Utils.insertCSS('@import url(css/project.css)')


# Магия
BS = {
	w: 360, wg: 180
	h: 640, hg: 200
}

# Омнибокс
PS = { h: 64 }

boxSideGap = BS.hg # Сдвиг модуляции для бокового состояния
siteGap = 24 # Расстояние между табами

screen = new Layer
	width: BS.w
	height: BS.h
	image: "images/alice.jpg"

scaleFactor = Screen.width / screen.width
# screen.scale = scaleFactor
# screen.center()

newTabPreview = new Layer
	width: 360
	height: 640
	image: "images/chudes.png"
	parent: screen
	

# New Tab — Base Contruction

canvasScroll = new PageComponent
	parent: newTabPreview
	width: newTabPreview.width
	height: newTabPreview.height
	backgroundColor: "transparent"
	scrollHorizontal: true
	scrollVertical: false
	directionLock: true
	image: "images/chudes.png"
	
currentCanvasBg = new Layer
	width: canvasScroll.width
	height: canvasScroll.height
	parent: canvasScroll
	backgroundColor: "white"
	opacity: 0
	name: "canvasBG"

currentCanvasBg.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

currentCanvasBg.sendToBack()



for item, i in ["leftCanvas", "midCanvas", "rightCanvas"]
	
	currentCanvas = new ScrollComponent
		scrollHorizontal: false
		directionLock: true
		contentInset: 
			bottom: 100
	
	currentCanvas.parent = canvasScroll.content
	currentCanvas.x = (canvasScroll.width + 16) * (i)
	currentCanvas.height = canvasScroll.height
	currentCanvas.width = canvasScroll.width
	
	
	
	

canvasScroll.updateContent()



for item, i in canvasScroll.content.children
	if i == 0
		framerLeftCanvasContent.parent = item.content
		framerLeftCanvasContent.x = 0
		framerLeftCanvasContent.y = 0
	if i == 1
		framerMidCanvasContent.parent = item.content
		framerMidCanvasContent.x = 0
		framerMidCanvasContent.y = 0
	else
		framerRightCanvasContent.parent = item.content
		framerRightCanvasContent.x = 0
		framerRightCanvasContent.y = 0


framerHeader.parent = canvasScroll
framerHeader.x = 0
framerHeader.y = 0
for item in framerHeader_tabs.children
	item.fontFamily = "YS Web Medium"

canvasScroll.snapToPage(canvasScroll.content.children[1], false)


framerHeader_selected = new Layer
	height: 2
	y: 66
	parent: framerHeader
	backgroundColor: "black"

# framerHeader_selected.states =
# 	"left":
# 		width: framerHeader_tab_left.width
# 		x: framerHeader_tab_left.x
# 	"mid":
# 		width: framerHeader_tab_mid.width
# 		x: framerHeader_tab_mid.x
# 	"right":
# 		width: framerHeader_tab_right.width
# 		x: framerHeader_tab_right.x
# 
# framerHeader_selected.stateSwitch("mid")


getCanvasBg = (localLayer) ->
	for item in localLayer.children
		if item.name == "canvasBG" then return item

canvasScroll.content.on "change:x", ->
	lBHeader = [0, 360]
	rBHeader = [360, 720]
	csValue = canvasScroll.scrollX
	
	
	if csValue > rBHeader[0]
		framerHeader_selected.x = Utils.modulate(csValue, rBHeader, [framerHeader_selected.states.mid.x, framerHeader_selected.states.right.x], true)
		framerHeader_selected.width = Utils.modulate(csValue, rBHeader, [framerHeader_selected.states.mid.width, framerHeader_selected.states.right.width], true)
		
# 		rightCanvasBG = currentCanvasBg
		currentCanvasBg.opacity = Utils.modulate(csValue, [370, 720 - 180], [currentCanvasBg.states.hidden.opacity, currentCanvasBg.states.shown.opacity], true)
		
	else
		framerHeader_selected.x = Utils.modulate(csValue, lBHeader, [framerHeader_selected.states.left.x, framerHeader_selected.states.mid.x], true)
		framerHeader_selected.width = Utils.modulate(csValue, lBHeader, [framerHeader_selected.states.left.width, framerHeader_selected.states.mid.width], true)
		
# 		currentCanvasBg = currentCanvasBg
		currentCanvasBg.opacity = Utils.modulate(csValue, [180, 350], [currentCanvasBg.states.shown.opacity, currentCanvasBg.states.hidden.opacity], true)

# SVG Apps Map

svgAppIcons = {
	"Алиса": "Appicon_alice.svg",
	"Афиша": "Appicon_afisha.svg",
	"АОН": "Appicon_aon.svg",
	"Метрика": "Appicon_appmetric.svg",
	"Аура": "Appicon_aura.svg",
	"Авиабилеты": "Appicon_avia.svg",
	"Авто.ру": "Appicon_avtoru.svg",
	"Беру": "Appicon_beru.svg",
	"Брингли": "Appicon_bringly.svg",
	"Календарь": "Appicon_calendar.svg",
	"Кэшбэк": "Appicon_cashback.svg",
	"Чаты": "Appicon_chats.svg",
	"Коллекции": "Appicon_collection.svg",
	"t1": "Appicon_default_eng.svg",
	"t2": "Appicon_default_rus.svg",
	"Директ": "Appicon_direct.svg",
	"Диск": "Appicon_disk.svg",
	"Драйв": "Appicon_drive.svg",
	"Еда": "Appicon_eda.svg",
	"Едадил": "Appicon_edadeal.svg",
	"Эфир": "Appicon_efir.svg",
	"Знатоки": "Appicon_faq.svg",
	"Игры": "Appicon_games.svg",
	"Здоровье": "Appicon_health.svg",
	"Устройства": "Appicon_home.svg",
	"Картинки": "Appicon_images.svg",
	"t3": "Appicon_internetometr.svg",
	"Изолента": "Appicon_izolenta.svg",
	"Работа": "Appicon_jobs.svg",
	"Кинопоиск": "Appicon_kinopoisk.svg",
	"Лончер": "Appicon_launcher.svg",
	"Район": "Appicon_local.svg",
	"Почта": "Appicon_mail.svg",
	"Карты": "Appicon_maps.svg",
	"Маркет": "Appicon_market.svg",
	"m1": "Appicon_metro_ekb.svg",
	"Метро": "Appicon_metro_msk.svg",
	"m2": "Appicon_metro_samara.svg",
	"m3": "Appicon_metro_spb.svg",
	"Зеркало": "Appicon_mirror.svg",
	"Деньги": "Appicon_money.svg",
	"Музыка": "Appicon_music.svg",
	"Навигатор": "Appicon_navi.svg",
	"Нежвижимость": "Appicon_nedvijimost.svg",
	"Новости": "Appicon_news.svg",
	"Переводы": "Appicon_perevod.svg",
	"p1": "Appicon_photo-1.svg",
	"Фото": "Appicon_photo.svg",
	"Плюс": "Appicon_plus.svg",
	"Практикум": "Appicon_praktikum.svg",
	"QR": "Appicon_qr.svg",
	"Расписание": "Appicon_raspisania.svg",
	"Настройки": "Appicon_settings.svg",
	"Шеф": "Appicon_sheff.svg",
	"Спорт": "Appicon_sport.svg",
	"Такси": "Appicon_taxi.svg",
	"Время": "Appicon_time.svg",
	"Толока": "Appicon_toloka.svg",
	"Поезда": "Appicon_trains.svg",
	"Переводчик": "Appicon_translate.svg",
	"Транспорт": "Appicon_transport.svg",
	"Путешествия": "Appicon_travel.svg",
	"t1": "Appicon_tutor.svg",
	"t2": "Appicon_tvonline.svg",
	"t3": "Appicon_ugc.svg",
	"Услуги": "Appicon_uslugi.svg",
	"Видео": "Appicon_video.svg",
	"Погода": "Appicon_weather.svg",
	"Дзен": "Appicon_zen.svg",
	"Знатоки": "Appicon_znatoki.svg",	
}

secureURL = (localURL) ->
	return "https://" + localURL

findURL = (localName) ->
	if localName == "Почта" then return secureURL("mail.yandex.ru")
	else if localName == "Погода" then return secureURL("weather.yandex.ru")
	else return secureURL("yandex.ru")

# Create App Icon

getIconTitle = (appViewLayer) ->
	return appViewLayer.children[1]



createIcon = (iconName = "Test Name", isText = false, badgeCount = 0, iconSize = 56, iconGap = 12, iconFontSize = 14) ->
	if svgAppIcons[iconName] is undefined then print "Failed: #{iconName}"
	
	appView = new Layer
		width: iconSize
		height: iconSize * 2
		backgroundColor: "transparent"
		name: ".appView"
	
	appIcon = new Layer
		parent: appView
		image: "images/svg/" + svgAppIcons[iconName]
		size: iconSize
		name: iconName
		borderRadius: 12
		
	appIcon.on Events.Tap, (event, layer) ->
		print(findURL(layer.name))
		try
			window.webkit.messageHandlers.open.postMessage("" + findURL(layer.name));
	
	appTitle = new TextLayer
		parent: appView
		width: appIcon.width + (iconGap - 4)
		x: - (iconGap - 4) / 2
		fontSize: iconFontSize
		lineHeight: 1.2
		y: appIcon.height + 8
		textAlign: "center"
		fontWeight: "500"
		text: iconName
		color: "white"
		height: 36
		truncate: true
	
	appTitle.states =
		"shown": { opacity: 0.9 }
		"hidden": { opacity: 0 }
	
	if isText
		appTitle.stateSwitch("shown")
		appTitle.color = "rgba(0,0,0, 0.8)"
	else appTitle.stateSwitch("hidden")
# 	print appTitle.fontSize
	
	
	appBadge = new Layer
		parent: appView
		size: 24
		x: 40
		y: -8
		borderRadius: "100%"
		backgroundColor: "#EB3A38"
	
	appBadge.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	if badgeCount != 0 then appBadge.stateSwitch("shown")
	else appBadge.stateSwitch("hidden")
	
	
	
	appBadgeCounter = new TextLayer
		parent: appBadge
		width: appBadge.width
		fontSize: 13
		y: 3
		textAlign: "center"
		fontWeight: "bold"
		text: badgeCount
		color: "white"
		height: 36
		truncate: true
	
	
	return appView


# App Rows

sizeClass = {
	rowSize: 5,
	iconSize: 56,
	iconGap: 12,
	iconFontSize: 14
}

createGridRows = (nameArray, iconShowText = false, rSize = 5, iconSize = 56, iconGap = 12, iconFontSize = 14) ->
	rowArray = []
	currentRow = null
	
	for currentName, i in nameArray
		if i % rSize == 0
			rowArray.push new Layer
				height: iconSize * 2, width: 328, backgroundColor: "transparent"
		
		lastRowView = rowArray[rowArray.length - 1]
		
		currentIcon = createIcon(currentName, iconShowText, 0, iconSize, iconGap, iconFontSize)
		currentIcon.parent = lastRowView
		currentIcon.x = (i % rSize) * (iconSize + iconGap)
	
	return rowArray



# App Grid Inveterted

makeNewTabGrid = (nameArray, rowSize = 5, iconSize = 56, iconGap = 12, iconFontSize = 14) ->
	rows = createGridRows(nameArray, false, rowSize, iconSize, iconGap, iconFontSize)
	
	gridView = new Layer
		width: 360
		height: 640
		backgroundColor: "transparent"
	
	for row, i in rows
		row.parent = gridView
		row.x = (360 - rowSize * iconSize - (rowSize - 1) * iconGap) / 2
		
		row.states =
			"hidden":
				y: 52 - (iconSize + iconSize / 4) * i
			"shown":
				y: 516 - (iconSize * 2) * i
		row.stateSwitch("hidden")
	
	return gridView



# App Grid Base

createMenuGrid = (nameArray, rowSize = 5, iconSize = 56, iconGap = 12, iconFontSize = 14) ->
	rows = createGridRows(nameArray, true, rowSize, iconSize, iconGap, iconFontSize)
	
	gridView = new Layer
		width: 360
		height: rows.length * iconSize * 2
		backgroundColor: "transparent"
	
	for row, i in rows
		row.parent = gridView
		row.x = (360 - rowSize * iconSize - (rowSize - 1) * iconGap) / 2
		row.y = (56 * 2) * i
		
	return gridView

# App Sections


bestAppArray = ["Такси", "Еда", "Район", "Чаты", "Почта", "Эфир", "Коллекции", "Едадил", "Карты", "Переводчик", "Музыка", "Зеркало", "Кинопоиск", "Беру", "Диск", "Устройства", "Дзен", "Афиша", "Метро"]

appIconsMidView = makeNewTabGrid(bestAppArray, sizeClass.rowSize, sizeClass.iconSize, sizeClass.iconGap, sizeClass.iconFontSize)

appIconsMidView.parent = canvasScroll.content.children[1]
appIconsMidView.y = 40



# popularAppsArray = ["Погода", "Едадил", "Почта", "Игры", "Беру", "Эфир", "Диск", "Карты", "Еда", "Такси"]
# 
# appIconsLeftView = createMenuGrid(popularAppsArray, sizeClass.rowSize, sizeClass.iconSize, sizeClass.iconGap, sizeClass.iconFontSize)
# 
# appIconsLeftView.parent = canvasScroll.content.children[0].content
# appIconsLeftView.y = 236 + 400 - 150 + 30

allAppsArray = []
for k,v of svgAppIcons
	if k == "t1" or k == "t2" or k == "t3" or k == "m1" or k == "m2" or k == "m3" or k == "p1" or k == "Настройки"
	else
		allAppsArray.push(k)

appIconsLeftAllView = createMenuGrid(allAppsArray, sizeClass.rowSize, sizeClass.iconSize, sizeClass.iconGap, sizeClass.iconFontSize)

appIconsLeftAllView.parent = canvasScroll.content.children[0].content
appIconsLeftAllView.y = 236 + 400 - 150 + 30

canvasScroll.content.children[0].updateContent()



# Pages

newTabView = new PageComponent
	width: 360
	height: 640
	backgroundColor: "transparent"
	parent: canvasScroll.content.children[1]
	scrollHorizontal: false
	directionLock: true
	contentInset: 
		bottom: 100

for currentName, i in ["top", "mid", "bottom"]
	currentPage = new Layer
		size: newTabView.size
		parent: newTabView.content
		y: newTabView.height * i
		backgroundColor: Utils.randomColor()
		opacity: 0

newTabView.snapToPage(newTabView.content.children[1], false)



newTabView.content.on "change:y", ->
	value = newTabView.scrollY
	bounds = [newTabView.height, 0]
	boundsOpacity = [newTabView.height / 2, 0]
	
	for row in appIconsMidView.children
		
		for currentIcon in row.children
			currentTitle = getIconTitle(currentIcon)
			currentTitle.opacity = Utils.modulate(value, boundsOpacity, [currentTitle.states.hidden.opacity, currentTitle.states.shown.opacity])
		
		row.y = Utils.modulate(value, bounds, [row.states.hidden.y, row.states.shown.y])
		
	if value < 640
		framerMidCanvasContent.y = Utils.modulate(value, [1280, 640], [-600, 0])
	else
		framerMidCanvasContent.y = Utils.modulate(value, [0, 640], [472, 0])
		currentCanvasBg.opacity = Utils.modulate(value, [640, 640 + 640/2], [currentCanvasBg.states.hidden.opacity, currentCanvasBg.states.shown.opacity], true)
		firstCard.opacity = Utils.modulate(value, [640, 640 + 640/2], [0, 1], true)
		titleMulti.opacity = Utils.modulate(value, [640 + 640/2, 640 + 640], [0, 1], true)
	

titleMulti.bringToFront()
firstCard.opacity = 0
titleMulti.opacity = 0


# box = new Layer
# 	size: 100
# 	name: "Погода"
# 
# box2 = new Layer
# 	size: 100
# 	x: 100
# 	name: "Новости"
# 	backgroundColor: "white"
# 
# for item in [box, box2]
# 	item.on Events.Tap, (event, layer) ->
# 		print layer.name
# 		print(findURL(layer.name))
# 		try
# 			window.webkit.messageHandlers.open.postMessage("" + findURL(layer.name));




framerHeader_selected.states =
	"left":
		width: framerHeader_tab_left.width + 5
		x: framerHeader_tab_left.x
	"mid":
		width: framerHeader_tab_mid.width + 5
		x: framerHeader_tab_mid.x
	"right":
		width: framerHeader_tab_right.width + 5
		x: framerHeader_tab_right.x

framerHeader_selected.stateSwitch("mid")



{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }