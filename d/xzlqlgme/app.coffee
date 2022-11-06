# Screen.backgroundColor = "#f0f0f0"

titleArray = ["kinopoisk.ru", "wikipedia.org", "hdrezka.ru", "bestmult.tv", "amediateka.ru", "more-films.com", "next.films"]

getIndex = (localName) ->
	for item, i in titleArray
		if item == localName then return i
	return -1

# Titles: Create

selectTitle = (titleLayer) ->
	try titleLayer.children[1].animate("selected", time: 0.2)

deselectTitle = (titleLayer) ->
	try titleLayer.children[1].animate("base", time: 0.2)

createTitles = () ->
	
	titleView = new ScrollComponent
		width: 360
		height: 44
		scrollVertical: false
		backgroundColor: "#f0f0f0"
	
	for titleName in titleArray
		
		titleLayer = new Layer
			y: 8
			height: 28
			width: 100
			name: titleName
			backgroundColor: "transparent"
		
		titleText = new TextLayer
			height: 20
			y: 5
			parent: titleLayer
			fontSize: 13
			text: titleName
		
		
		sumX = 16
		for prevTitle in titleView.content.children
			sumX += prevTitle.width + 2
			
		titleLayer.width = titleText.width + 20
		titleLayer.x = sumX
		titleText.centerX()
		
		titleLayer.parent = titleView.content
		
		coloredText = titleText.copy()
		coloredText.parent = titleLayer
		
		coloredText.states =
			"selected":
				color: "white"
			"base":
				color: "#777"
		
		coloredText.stateSwitch("base")
		
		titleLayer.on Events.Tap, (event, layer) ->
			siteIndex = getIndex(layer.name)
			sites.snapToPage(sites.content.children[siteIndex])
# 			titles.scrollToLayer(layer, 0.5)
# 			selectedTitle.animate(x: layer.x, width: layer.width, options: {
# 				time: 0.2
# 			})
		
		for item, i in titleView.content.children
			titleView.scrollToLayer(item, 0.5, 0.5, false)
			titleView.states[titleArray[i]] =
				x: titleView.scrollX
		
		titleView.scrollToLayer(titleView.content.children[0], 0.5, 0.5, false)
# 		print titleView.states
	
	return titleView

# Titles: Selected

createSelectedTitle = (titleView) ->
	
	selectedTitleView = new Layer
		y: 8
		parent: titleView.content
		backgroundColor: "#0074F8"
		height: titleView.content.children[0].height
		borderRadius: 40
	
	for titleName, i in titleArray
		selectedTitleView.states[titleName] =
			x: titleView.content.children[i].x
			width: titleView.content.children[i].width
		
# 		print selectedTitleView.states[titleName]
		if i == 0 then selectedTitleView.stateSwitch(titleName)
	
	selectedTitleView.sendToBack()
	
	return selectedTitleView

# Sites: Create


createSites = () ->
	
	siteView = new PageComponent
		width: 360
		height: 640
		scrollVertical: false
	
	for titleName, i in titleArray
		
		site = new Layer
			width: 360
			height: 640
			backgroundColor: Utils.randomColor()
			parent: siteView.content
			x: (360 + 16) * i
			name: titleName
			borderRadius: 16
	
	siteView.on "change:currentPage", ->
		for item in titles.content.children
			if item.name == siteView.currentPage.name
				selectTitle(item)
			else
				deselectTitle(item)
# 				item.children[0].animate("base", time: 0.2)
	
	siteView.content.on "change:x", ->
		value = siteView.scrollX
		
		cIndex = 0
		cIndex = switch 
			when value < (360 + 16)*1 then 0
			when value < (360 + 16)*2 then 1
			when value < (360 + 16)*3 then 2
			when value < (360 + 16)*4 then 3
			when value < (360 + 16)*5 then 4
			when value < (360 + 16)*6 then 5
			else 5
		
# 		print cIndex
		LS = selectedTitle.states
		PS = titles.states
		S0 = titleArray[cIndex]
		S1 = titleArray[cIndex + 1]
		
		selectedTitle.x = Utils.modulate(value, [(360 + 16)*cIndex, (360 + 16)*(cIndex+1)], [LS[S0].x, LS[S1].x], true)
		selectedTitle.width = Utils.modulate(value, [(360 + 16)*cIndex, (360 + 16)*(cIndex+1)], [LS[S0].width, LS[S1].width], true)
		
		titles.content.x = Utils.modulate(value, [(360 + 16)*cIndex, (360 + 16)*(cIndex+1)], [-PS[S0].x, -PS[S1].x])
	
	return siteView


screen = new Layer
	width: 360
	height: 640
	backgroundColor: "white"


selectedTitle = null

sites = createSites()
sites.parent = screen

titles = createTitles()
titles.parent = screen


selectedTitle = createSelectedTitle(titles)

selectTitle(titles.content.children[0])
# titles.content.width = titles.content.width + 100


titles.y = 24
sites.y = 69


# Bars

statusBar = new Layer
	parent: screen
	width: 360
	height: 24
	backgroundColor: "eee"

# navBar = new Layer
# 	width: 360
# 	height: 48
# 	y: 640 - 48
# 	backgroundColor: "black"


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }