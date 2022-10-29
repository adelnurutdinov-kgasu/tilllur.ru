# cp ~/Documents/Git/ControlPanel-for-Framer/ControlPanel.framer/modules/ControlPanel.coffee ~/Documents/Git/Prototyping-Queue/2021-02-16\ \[touch\]\ United\ Feed\ –\ News\ More.framer/modules/

Framer.Extras.Hints.disable()
panel = require 'ControlPanel'
Canvas.backgroundColor = "222"

# Data

mobileWidth = 480
isMobilePreview = () ->
	return Canvas.width < mobileWidth


dataMain = [
	"ЦИК отказал Бабарико в регистрации кандидатом в президенты Белоруссии",
	"АТОР назвала готовые принимать российских туристов страны",
	"В Кремле прокомментировали несанкционнированные акции в Хабаровске",
	"Член конгресса США объявила о намерении инициировать импичмент Байдена",
	"В Ереване сообщили о гибели двух офицеров на границе Азербайджана",
	"Путин объяснил нападки на «Северный поток – 2»",
	"В АКОРТ сообщили о предложении повысить цены на птицу и яйца в России",
	"ФСБ задержала исламистов, планировавших теракты на Северном Кавказе",
	"Медведев по итогам Australian Open войдет в топ-3 рейтинга АТР",
	"Экс-губернатор Хабаровского края Ишаев признан виновным в растрате",
	"Путин заявил о недопустимости вмешательства в предстоящие выборы в Госдуму",
	"Минсельхоз допустил рост цен на яйца и мясо птицы в рамках инфляции",
	"ФСБ задержала 19 исламистов с поясом смертника",
	"Даниил Медведев обеспечил себе место в топ-3 рейтинга ATP",
	"RT рассказал об источниках финансирования издания «Проект»"
]


shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source


dataMain = shuffle(dataMain)

dataMain1 = dataMain[0...5]
dataMain2 = dataMain[5...10]
dataMain3 = dataMain[10...15]

# print dataMain1.length
# print dataMain2.length
# print dataMain3.length
# dataMain1 = [
# 	"ЦИК отказал Бабарико в регистрации кандидатом в президенты Белоруссии",
# 	"АТОР назвала готовые принимать российских туристов страны",
# 	"В Кремле прокомментировали несанкционнированные акции в Хабаровске",
# 	"Член конгресса США объявила о намерении инициировать импичмент Байдена",
# 	"В Ереване сообщили о гибели двух офицеров на границе Азербайджана"
# ]
# 
# dataMain2 = [
# 	"Путин объяснил нападки на «Северный поток – 2»",
# 	"В АКОРТ сообщили о предложении повысить цены на птицу и яйца в России",
# 	"ФСБ задержала исламистов, планировавших теракты на Северном Кавказе",
# 	"Медведев по итогам Australian Open войдет в топ-3 рейтинга АТР",
# 	"Экс-губернатор Хабаровского края Ишаев признан виновным в растрате"
# ]
# 
# dataMain3 = [
# 	"Путин заявил о недопустимости вмешательства в предстоящие выборы в Госдуму",
# 	"Минсельхоз допустил рост цен на яйца и мясо птицы в рамках инфляции",
# 	"ФСБ задержала 19 исламистов с поясом смертника",
# 	"Даниил Медведев обеспечил себе место в топ-3 рейтинга ATP",
# 	"RT рассказал об источниках финансирования издания «Проект»"
# ]


dataMoscow = [
	"Пять детских садов и шесть школ построят по реновации в Головинском районе",
	"Более 25 тыс человек переедут по реновации в Можайском районе Москвы",
	"На обсуждение жителей вынесен 91 градостроительный проект",
	"Завершена реконструкция Детского музыкального театра юного актера",
	"Между станциями «Пыхтино» и «Внуково» закончат строительство метромоста",
	"В Москве Центр пульмонологии ГКБ №67 вернется к обычному режиму работы",
	"Пять детских садов и шесть школ построят по реновации в Головинском районе",
	"На обсуждение жителей вынесен 91 градостроительный проект",
	"В Москве завершили реконструкцию Театра юного актера",
	"Более 25 тыс человек переедут по реновации в Можайском районе Москвы",
	
	"Пять детских садов и шесть школ построят по реновации в Головинском районе",
	"Более 25 тыс человек переедут по реновации в Можайском районе Москвы",
	"На обсуждение жителей вынесен 91 градостроительный проект",
	"Завершена реконструкция Детского музыкального театра юного актера",
	"Между станциями «Пыхтино» и «Внуково» закончат строительство метромоста",
]

dataMoscow = shuffle(dataMoscow)
dataMoscow1 = dataMoscow[0...5]
dataMoscow2 = dataMoscow[5...10]
dataMoscow3 = dataMoscow[10...15]

getNextState = (name, states) ->
	temp = states.concat(states)
	for item, i in temp
		if item == name then return temp[i+1]
	print "failed to find #{name}"
	return states[0]


# print getNextState("1", ["0", "1", "2"])

autoScroll = false
autoHeight = false
scroll = null

# Params

queryArray = location.search[1..].split('&')
scrollKey = -1
heightKey = -1


# ?scroll=0&height=0
for item in queryArray
	keyValuePair = item.split("=")
	
	if keyValuePair[0] == "scroll"
		scrollKey = parseInt(keyValuePair[1])
	
	else if keyValuePair[0] == "height"
		heightKey = parseInt(keyValuePair[1])

if scrollKey == 0 then autoScroll = false
else if scrollKey == 1 then autoScroll = true

if heightKey == 0 then autoHeight = false
else if heightKey == 1 then autoHeight = true



# Item

getLogo = () ->
	return "images/logos/logo#{Utils.randomChoice([0...8])}.webp"


getNewsItem = (text = "АТОР назвала готовые принимать российских туристов страны") ->
	
	temp = new TextLayer
		fontSize: 15
		backgroundColor: "white"
		width: 360
		color: "black"
		text: text
		padding: 
			top: 9
			bottom: 12
			left: 48
			right: 12
	
	iconView = new Layer
		size: 16
		parent: temp
		x: 20
		y: 11
		image: getLogo()
	
	breaker = new Layer
		width: 296
		x: 48
		height: 1
		y: temp.height - 1
		parent: temp
		backgroundColor: "D8D8D8"
		opacity: 0.5
	
	return temp



getMoreButton = (text = "Показать ещё", lastText = "Свернуть", partArray = ["one part"]) ->
	button = new TextLayer
		width: 360
		text: text
		fontSize: 15
		backgroundColor: "white"
		width: 360
		color: "black"
		textAlign: "center"
		padding:
			top: 14
			bottom: 14 + 4
		custom:
			openState: text
			closeState: lastText
			last: "#{partArray.length - 1}"
	
	button.on Events.StateSwitchStart, (from, to) ->
		if to is @custom.last then @text = @custom.closeState
		else @text = @custom.openState
	
	button.on Events.Tap, ->
		nextState = getNextState(@states.current.name, @stateNames)
		
		if autoHeight
			nextState = getNextState(@states.current.name, @stateNames)
# 			print nextState
			for page in scroll.content.children
				page.animate(nextState,
					curve: Spring(damping: 1), time: 0.5)
				page.custom.button.animate(nextState,
					curve: Spring(damping: 1), time: 0.5)
			
			
		
		else
			# Animate current page
			@animate(nextState,
				curve:Spring(damping: 1), time: 0.5)
			@parent.animate(nextState,
				curve: Spring(damping: 1), time: 0.5)
		
		
		# Animate Outer Card
		scroll.animate(height: @parent.states[nextState].height,
			curve: Spring(damping: 1), time: 0.5)
		scroll.parent.animate(height: @parent.states[nextState].height + 92,
			curve: Spring(damping: 1), time: 0.5)
		zenNextView.animate(y: zenNextView.custom.originY + 92 + @parent.states[nextState].height,
			curve: Spring(damping: 1), time: 0.5)
		
		if autoScroll and @states.current.name == "0"
			if screen.scrollY > 880
				screen.scrollToPoint(
					x: 0, y: newsCard.y - 6
					true
				)

	return button

# List

getNewList = (texts = ["АТОР назвала готовые принимать российских туристов страны", "ЦИК отказал Бабарико в регистрации кандидатом в президенты Белоруссии"]) ->
	view = new Layer
		width: 360
	
	sumY = 0
	for textString in texts
		newsItem = getNewsItem(textString)
		newsItem.parent = view
		newsItem.y = sumY
		sumY += newsItem.height
	
	view.height = sumY
	return view

# Page

getPage = (textParts = [dataMain1, dataMain1, dataMain1]) ->
	sumY = 0
	pageView = new Layer { width: 360, clip: true, borderRadius: 0 }
	
	bottomButton = getMoreButton(null, null, textParts)
	bottomButton.parent = pageView
	
	
	for stringArray, i in textParts
		smallView = getNewList(stringArray)
		smallView.parent = pageView
		smallView.y = sumY
		sumY += smallView.height
		
		pageView.states["#{i}"] = { height: sumY + bottomButton.height }
		bottomButton.states["#{i}"] = { y: sumY }
	
	
	delete pageView.states.default
	delete bottomButton.states.default
	
	pageView.stateSwitch("0")
	bottomButton.stateSwitch("0")
	
	bottomButton.bringToFront()
	pageView.custom =
		button: bottomButton
	
	return pageView

# News

getNewsCard = (pages = [[dataMain1, dataMain2, dataMain3],[dataMoscow1, dataMoscow2, dataMain1]]) ->
	card = new Layer { width: 360, clip: true, borderRadius: 24, backgroundColor: "white" }
	header = new Layer
		parent: card
		backgroundColor: "white"
		width: 360
		height: 92
		image: "images/header%20(4).png"
	
	selectedTab = new Layer
		parent: header
		width: 78
		height: 30
		y: 54
		borderRadius: 24
		backgroundColor: "FFDC60"
	selectedTab.states =
		"0": { x: 14 }
		"1": { x: 92 }
	selectedTab.stateSwitch("0")
	
	tab_left = new Layer
		width: 92
		height: 38
		y: 54
		parent: header
		image: "images/tab%20left.png"
	
	tab_right = new Layer
		width: 268
		height: 38
		y: 54
		x: 92
		parent: header
		image: "images/tab%20right.png"
	
	
	
	
	
	sumY = header.height
	
	scroll = new PageComponent
		y: sumY
		parent: card
		width: 360
		height: 200
		scrollVertical: false
		originY: 0
		directionLock: true
	
	for pageData, i in pages
		page = getPage(pageData)
		scroll.addPage(page, "right")
		if i == 0 then scroll.height = page.height

	card.height = 92 + scroll.content.children[0].height
	
	scroll.on "change:currentPage", ->
		if scroll.content.children[0] == scroll.currentPage
			selectedTab.animate("0",
				curve: Spring(damping: 1), time: 0.5)
		else
			selectedTab.animate("1",
				curve: Spring(damping: 1), time: 0.5)
		
		for page in scroll.content.children
			
			# Compose Height to Current Page
			if page == scroll.currentPage
				scroll.animate(height: scroll.currentPage.height, options: { curve: Spring(damping: 1), time: 0.5 })
				scroll.parent.animate(height: 92 + page.height, options: {curve: Spring(damping: 1), time: 0.5})
				zenNextView.animate(y: zenNextView.custom.originY + 92 + page.height, options: {curve: Spring(damping: 1), time: 0.5})
				
				if autoScroll
					if screen.scrollY > 880
						screen.scrollToPoint(
							x: 0, y: newsCard.y - 6
							true
						)
			
			# Close Other Pages
			else if !autoHeight
				page.animate("0", curve: Spring(damping: 1), time: 0.5)
				page.custom.button.animate("0", curve: Spring(damping: 1), time: 0.5)
	
	return card




screen = new ScrollComponent
	width: 360
	height: 640
	clip: true
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "FAF9F8"
	borderRadius: 16
	directionLock: true
	contentInset: 
		top: 32

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 24 }


screen.on Events.DragStart, ->
	scroll.content.ignoreEvents = true
	scroll.ignoreEvents = true

screen.on Events.DragEnd, ->
	scroll.content.ignoreEvents = true
	scroll.ignoreEvents = true

fixHeight = new Layer { width: 360, height: 5000, parent: screen.content, backgroundColor: null }


# Feed

header = new Layer
	parent: screen.content
	width: 360
	height: 244
	image: "images/header.png"

informers = new Layer
	parent: screen.content
	width: 360
	height: 94
	y: header.y + header.height + 6
	image: "images/informers.png"

zen = new Layer
	parent: screen.content
	width: 360
	height: 440
	y: informers.y + informers.height + 6
	image: "images/zen%20(1).png"


newsCard = getNewsCard()
newsCard.parent = screen.content
newsCard.y = zen.y + zen.height + 6

zenNextView = new Layer
	width: 360
	height: 1000
	backgroundColor: null
	parent: screen.content
	y: newsCard.y + newsCard.height + 6
	custom:
		originY: newsCard.y + 6



zenCard = new Layer
	parent: zenNextView
	width: 360
	height: 510
	image: "images/zenCard.png"

zenCard2 = new Layer
	parent: zenNextView
	width: 360
	height: 440
	y: zenCard.y + zenCard.height + 6
	image: "images/zen%20(1).png"



# Panel

# autoScrollToggle = (event, layer) ->
# 	autoScroll = !autoScroll

onAutoScroll = (event, layer) ->
	autoScroll = true

offAutoScroll = (event, layer) ->
	autoScroll = false

onStableHeight = (event, layer) ->
	autoHeight = true

offStableHeight = (event, layer) ->
	autoHeight = false



preview.addSection("Scroll to Header", [
	{ title: "On", handler: onAutoScroll },
	{ title: "Off", handler: offAutoScroll },
])

preview.addSection("Same width for neighbors", [
	{ title: "On", handler: onStableHeight },
	{ title: "Off", handler: offStableHeight },
])