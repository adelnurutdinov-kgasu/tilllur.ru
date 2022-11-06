
# Story Data

colors = ["#4C6A5E", "#7E764A", "#4A657E", "#554A7E", "#8E3E51", "#3E8E71", "#80976F", "#97806F"]
getRandomColor = () ->
	if colors.length == 0 then return Utils.randomColor()
	currentColor = Utils.randomChoice(colors)
	colors = colors.filter (x) -> x != currentColor
	return currentColor

storyData = [
	{
		text: "У Ту-22 отказал двигатель во время полета в Астраханской области"
		title: "Russia Today"
		background: getRandomColor()
	},
	{
		text: "Первеза Мушаррафа приговорили к смертной казни"
		title: "Lenta.ru"
		background: getRandomColor()
	},
	{
		text: "Названы самые опасные алкогольные напитки"
		title: "Ведомости"
		background: getRandomColor()
	},
	{
		text: "Трёхсторонняя встреча по российскому газу состоится 19 декабря"
		title: "Russia today"
		background: getRandomColor()
	},
	{
		text: "Депутат прокомментировала скандал вокруг слов о малоимущих и зэках"
		title: "Газета.ру"
		background: getRandomColor()
	}
]

TEASER_TIME = 4
CURRENT_ANIMATING_CELL = null

storyTeaserMaster.x = storyTeaserMaster.y = -200

Canvas.backgroundColor = "#FFF"

appView = new Layer
	width: 360
	height: 640
	backgroundColor: "null"
	clip: true

# Canvas

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


homeView = new Layer
	parent: canvasScroll.content.children[1].content
	width: 360
	height: 640
	image: "images/2.png"
	backgroundColor: "null"

homeView.center()


tempViewLeft = new Layer
	parent: canvasScroll.content.children[0].content
	width: 360
	height: 640
	image: "images/1.png"
	backgroundColor: "null"

tempViewLeft.center()

tempViewRight = new Layer
	parent: canvasScroll.content.children[2].content
	width: 360
	height: 640
	image: "images/3.png"
	backgroundColor: "null"

tempViewRight.center()



# Player View

playerViewProtector = new Layer
	opacity: 0

playerViewProtector.states =
	"base": { opacity: 0 }
	"hover": { opacity: 0 }

playerViewProtector.stateSwitch("base")

playerViewProtector.on Events.StateSwitchStart, (from, to, event, layer) ->
	if from != to
		playerView.animate(to, time: 0.1, curve: Bezier.linear)

playerView = new PageComponent
	parent: homeView
	width: storyTeaserMaster.width
	height: storyTeaserMaster.height
	scrollVertical: false
	borderRadius: 12
	clip: true
	x: 16
	y: 154 + 2
# 	shadowColor: "rgba(0,0,0,0.1)"

playerView.states =
	"base":
		scale: 1
		opacity: 1
# 		shadowY: 0
# 		shadowBlur: 0
	"hover":
		scale: 1
		opacity: 0.8
# 		shadowY: 10
# 		shadowBlur: 10

playerView.content.ignoreEvents = true
# playerView.center()

playerView.on Events.TouchStart, ->
	playerViewProtector.stateSwitch("hover")

# playerView.on Events.Tap, ->
# 	playerViewProtector.stateSwitch("base")


homeView.on Events.TouchMove, (event, layer) ->
	box = { left: playerView.x, right: playerView.x + playerView.width, top: playerView.y, bottom: playerView.y + playerView.height }
	if event.point.x < box.right and event.point.x > box.left and event.point.y > box.top and event.point.y < box.bottom then playerViewProtector.stateSwitch("hover")
	else playerViewProtector.stateSwitch("base")

homeView.on Events.TouchEnd, ->
	box = { left: playerView.x, right: playerView.x + playerView.width, top: playerView.y, bottom: playerView.y + playerView.height }
# 	
	if event.point.x < box.right and event.point.x > box.left and event.point.y > box.top and event.point.y < box.bottom then openStory()
	else
		playerViewProtector.stateSwitch("base")



playerView.on Events.StateSwitchStart, (from, to) ->
	if to is "hover"
		CURRENT_ANIMATING_CELL.stateSwitch("paused")
	else if to is "base"
		CURRENT_ANIMATING_CELL.stateSwitch("continue")



progressView = new Layer
		parent: playerView
		width: playerView.width - 12 * 2
		x: 12
		y: 12
		height: 4
		backgroundColor: "null"


# Progress: Glebasta

createProgressPart = (currentIndex, currentLength = 5) ->
	progressPart = new Layer
		parent: progressView
		x: (progressView.width + 4) / currentLength * currentIndex
		width: (progressView.width + 4) / currentLength - 4
		height: progressView.height
		borderRadius: 2
		backgroundColor: "rgba(0,0,0,0.2)"
	
	progressPart.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 1 }
		"animate": { opacity: 1 }
		"paused": { opacity: 1 }
		"continue": { opacity: 1 }
	
	progressPart.on Events.StateSwitchStart, (from, to, event, layer) ->
		if from is "hidden" and to is "animate"
			CURRENT_ANIMATING_CELL = layer
			layer.children[0].stateSwitch("animate")
		else if to is "paused"
			layer.children[0].states["paused"].width = layer.children[0].width
			layer.children[0].states["continue"].width = layer.children[0].width
			layer.children[0].stateSwitch("paused") 
		else layer.children[0].stateSwitch(to)
	
	
	
	progressInside = new Layer
		parent: progressPart
		height: progressPart.height
		width: 0
		borderRadius: progressPart.borderRadius
		backgroundColor: "white"
	
	progressInside.states =
		"shown": { width: progressPart.width }
		"hidden": { width: 0 }
		"animate": { width: 0 }
		"paused": { width: 0 }
		"continue": { width: 0 }
	
	progressInside.on Events.StateSwitchEnd, (from, to, event, layer) ->
		if to is "animate" then layer.animate("shown", time: TEASER_TIME, curve: Bezier.linear)
		
		else if to is "paused"
			layer.animateStop()
		
		else if to is "continue"
			layer.animate("shown", time: Utils.modulate(layer.width, [layer.states.hidden.width, layer.states.shown.width], [TEASER_TIME, 0], true), curve: Bezier.linear)
		
		else if (from is "animate" and to is "shown") or
				(from is "continue" and to is "shown")
			currentPageIndex = playerView.content.children.indexOf(playerView.currentPage)
			currentPageIndex++
			
			if currentPageIndex >= playerView.content.children.length
				currentPageIndex = 0
			
			playerView.snapToPage(playerView.content.children[currentPageIndex], false)

# Init Stories Preview

startNextPlay = (loadingCellIndex) ->
	progressView.children[loadingCellIndex].stateSwitch("animate")
	

proceedToNextPage = () ->
	concatIndex = playerView.content.children.indexOf(playerView.currentPage)
	index = concatIndex % storyData.length
	
	for currentProgressPart, i in progressView.children
		if index > i then nextState = "shown"
		else nextState = "hidden"
		currentProgressPart.stateSwitch(nextState)
	
	startNextPlay(index)

playerView.on "change:currentPage", ->
	proceedToNextPage()


initProgressView = () ->
	for item, i in storyData
		createProgressPart(i, storyData.length)


initStories = () ->
	doubleStoryData = storyData
	
	for currentStoryData, i in doubleStoryData
		storyTeaserView = storyTeaserMaster.copy()
		storyTeaserView.y = 0
		storyTeaserView.x = storyTeaserView.width * i
		storyTeaserView.parent = playerView.content
		
		for child in storyTeaserView.children
			if child.name == "text"
				child.text = currentStoryData.text
				child.truncate = true
			else if child.name == "title"
				child.text = currentStoryData.title
			else if child.name == "background"
				child.backgroundColor = currentStoryData.background
	
	initProgressView()
	proceedToNextPage()


initStories()

# Modal

modalView = new Layer
	parent: appView
	width: 360
	height: 640
	backgroundColor: "#222"

modalView.states =
	"hidden": { y: 640 }
	"shown": { y: 0 }

modalView.stateSwitch("hidden")


closeButton = new Layer
	parent: modalView
	size: 64
	x: Align.right()

closeButton.on Events.Tap, ->
	modalView.animate("hidden", time: 0.5, curve: Spring(damping: 1))


openStory = () ->
	currentIndex = playerView.content.children.indexOf(playerView.currentPage)
	modalView.backgroundColor = storyData[currentIndex].background
	modalView.animate("shown", time: 0.5, curve: Spring(damping: 1))


modalView.on Events.StateSwitchStart, (from, to) ->
	if to is "shown"
		playerViewProtector.stateSwitch("hover")
	else if to is "hidden"
		playerViewProtector.stateSwitch("base")




# statusBar = new Layer
	# parent: phone, width: screen.width, height: 20, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: appView, borderRadius: 8, forceAndroidBar: true }