# Layers

# Framer.Extras.Hints.disable()
# Screen.backgroundColor = "#222"

screenView = new Layer
	width: 360
	height: 640
	backgroundColor: "white"
	# borderRadius: 20
	# clip: true

# screenView.center()

consoleView = new TextLayer
	text: ""
	width: 360
	fontSize: 14
	color: "black"
	textAlign: "center"
	parent: screenView




bubleView = new TextLayer
	text: ""
	width: 360
	y: 20
# 	height: 40
# 	borderRadius: 12
# 	backgroundColor: "grey"
	fontSize: 14
	color: "black"
	textAlign: "center"
	parent: screenView

# bubleView.draggable.enabled = true




feedScrollGuard = new Layer
	opacity: 0
	x: -2000

feedScrollGuard.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }
feedScrollGuard.stateSwitch("shown")


feedScrollGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		bottomBar.animate(to, time: 0.3)




feedView = new ScrollComponent
	parent: screenView
	scrollVertical: true
	scrollHorizontal: false
	width: 360
	height: 640
	backgroundColor: "#f5f5f5"
	clip: true
	contentInset:
		bottom: 60


feedContent = new Layer
	width: 360
	height: 1302
	parent: feedView.content
	image: "images/feedContent.png"

nextCards = new Layer
	width: 360
	height: 1943
	y: feedContent.height
	parent: feedView.content
	image: "images/nextCards.png"





feedView.content.on "change:y", ->
	if @parent.scrollY < 16 or @parent.scrollY > feedView.content.height - feedView.height + 44
		feedScrollGuard.stateSwitch("shown")
	else if @draggable.direction == "up"
		feedScrollGuard.stateSwitch("hidden")
	else if @draggable.direction == "down"
		feedScrollGuard.stateSwitch("shown")


tabs = new Layer
	width: 360
	height: 76
	image: "images/tabs.png"
	parent: feedContent








bottomBar = new Layer
	parent: feedView
	width: 360
	height: 52
	image: "images/bottomBarIcons.png"
	backgroundColor: "white"

bottomBar.states =
	"shown":
		y: feedView.height - 52
	"hidden":
		y: feedView.height + 8
bottomBar.stateSwitch("shown")

bottomBar.onTap ->
	;


# Carousel Layers

darker = new Layer
	width: feedView.width
	height: feedView.height
	parent: feedView
	backgroundColor: "#F1F0ED"

darker.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0
darker.stateSwitch("hidden")


searchTabList = new Layer
	width: 360
	height: 48
	image: "images/searchTabList.png"
	parent: darker
	y: 24 + 4

searchTabList.states =
	"carousel":
		opacity: 1
		y: 24 + 4
	"app":
		opacity: 0
		y: 24 + 4 - 40
searchTabList.stateSwitch("app")


bottomBarTabList = new Layer
	parent: darker
	width: 360
	height: 52
	y: darker.height - 52
	image: "images/bottomBarIcons.png"
	backgroundColor: "null"

bottomBarTabList.states =
	"carousel":
		opacity: 1
	"app":
		opacity: 0
bottomBarTabList.stateSwitch("app")





statusBar = new Layer
	width: 360
	height: 24
	# image: "images/status%20bar.png"
	parent: screenView
	backgroundColor: "white"

statusBar.states =
	"app":
		backgroundColor: darker.backgroundColor
	"feed":
		backgroundColor: "white"
statusBar.stateSwitch("feed")

# screenView.scale = 1.6

if Screen.width < 420
	Screen.backgroundColor = "#000"
	screenView.centerX()
	
	if Screen.height < 700
		screenView.y = Align.bottom()
		screenView.originY = 1
	
	screenView.scale = Screen.width / 360
	


appViewDradStarted = false

globalGuard = new Layer
	opacity: 0

globalGuard.states =
	"app": { opacity: 0 }
	"carouselStart": { opacity: 0 }
	"carouselEnd": { opacity: 0 }
	"feed": { opacity: 0 }

globalGuard.on Events.StateSwitchEnd, (from, to) ->
	if from != to
# 		consoleView.text = "state: #{to}"
		
		if to == "app"
			scrollView.ignoreEvents = false
			scrollView.content.ignoreEvents = false
# 			bottomBarTabList.stateSwitch("app")
		
		else if to == "carouselStart"
			scrollView.ignoreEvents = true
			scrollView.content.ignoreEvents = true
		
		else if to == "carouselEnd"
			
		
		else if to == "feed"
			searchTabList.stateSwitch("app")
# 			try carryView.stateSwitch("shown")

globalGuard.stateSwitch("feed")





zenArticleButton = new Layer
	parent: feedContent
	x: 4
	width: 352
	height: 404
	y: 415
	borderRadius: 20
	backgroundColor: "null"
	opacity: 1.00

zenArticleButton.on Events.Tap, ->
# 	appView.animate("shown")
	appView.content.animate("app", curve: Spring(tension: 140, friction: 22, tolerance: 0.01))







appView = new PageComponent
	width: 360
	height: 640
	parent: screenView
	scrollHorizontal: false
# 	originY: 0.5

# appView.states =
# 	"shown": { y: 0 }
# 	"hidden": { y: 640 }
# appView.stateSwitch("hidden")


appView.content.draggable.speedY = 1
appView.content.draggable.momentum = false
appView.content.draggable.overdragScale = 1
# appView.content.originY = -0.5

appView.content.states =
	"app": { scale: 1, originY: -0.3, y: 0 }
	"carousel": { scale: 0.74, originY: 0.62, y: -20 }
	"feed": { scale: 0.74, originY: 1, y: 640}

appView.content.stateSwitch("feed")





# App Content


gapView = new Layer
	width: 360
	height: 80 - 34
	parent: appView.content
	backgroundColor: "blue"
	opacity: 0

lineView = new Layer
	width: 360
	height: 34
	y: gapView.height
	parent: appView.content
	backgroundColor: "null"
# 	opacity: 0


scrollView = new ScrollComponent
	width: 360
	height: 640 - lineView.height
	y: gapView.height + lineView.height
	parent: appView.content
	scrollHorizontal: false
	borderRadius: 20
	clip: true
# 	propagateEvents: true

scrollView.content.draggable.speedY = 0


zenContent = new Layer
	parent: scrollView.content
	width: 360
	height: 762
	image: "images/zenContent.png"

comments = new Layer
	parent: scrollView.content
	width: 360
	height: 556
	y: zenContent.height
	image: "images/comments.png"


# appView.scrollToPoint({ x: 0, y: 160 }, false)



zenHeader = new Layer
	width: 360
	height: 48
	image: "images/zenHeader.png"
	parent: lineView
	y: -18

zenHeader.states =
	"hidden":
		opacity: 0
	"shown":
		opacity: 1

zenHeader.stateSwitch("hidden")

zenCloseButton = new Layer
	parent: zenHeader
	size: 48
	x: Align.right()
	backgroundColor: "null"

zenCloseButton.onTap ->
	appView.content.animateStop()
	appView.content.animate("feed", curve: Spring(tension: 100, friction: 20, tolerance: 0.1,
		velocity: 0))



carryView = new Layer
	width: 48
	height: 4
	borderRadius: 4
	backgroundColor: "#D6D6D5"
	parent: appView.content
	y: lineView.height + gapView.height - 10

carryView.centerX()

carryView.states =
	"app":
		opacity: 1
	"carousel":
		opacity: 0
carryView.stateSwitch("app")





scrollGuard = new Layer
	opacity: 0

scrollGuard.states =
	"app": { opacity: 0 }
	"close": { opacity: 0 }
scrollGuard.stateSwitch("app")



appView.content.borderRadius = scrollView.borderRadius

appView.on "change:currentPage", ->
# 	print appView.currentPage


appView.content.on Events.Tap, ->
	if !appViewDradStarted
		if globalGuard.states.current.name == "carouselEnd"
			@animate("app", curve: Spring(tension: 500, friction: 40, tolerance: 0.005,
				velocity: 0))
			
			for itemView in [searchTabList, bottomBarTabList, carryView]
				itemView.animate("app", curve: Spring(tension: 500, friction: 40,
					tolerance: 0.005, velocity: 0))




appView.content.on Events.StateSwitchStart, (from, to) ->
	if to == "app" and darker.states.current.name == "hidden"
		darker.animate("shown", time: 0.3)
		zenHeader.stateSwitch("shown")
		statusBar.animate("app", time: 0.3)
		
	else if to == "feed"
		darker.animate("hidden", time: 0.3)
		statusBar.animate("feed", time: 0.3)
# 		zenHeader.animate("hidden", time: 0.5)

appView.content.on Events.StateSwitchEnd, (from, to) ->
	if to == "carousel"
		globalGuard.stateSwitch("carouselEnd")
	else if to == "app"
		globalGuard.stateSwitch("app")



appView.content.on "change:scale", ->
# 	print @scale
	if globalGuard.states.current.name == "app"
			
			for itemView in [carryView, bottomBarTabList, searchTabList]
				itemView.opacity = Utils.modulate(@scale, [1.0, 0.9],
					[itemView.states.app.opacity, itemView.states.carousel.opacity], true)
				if itemView == searchTabList
					itemView.y = Utils.modulate(@scale, [1.0, 0.92],
						[itemView.states.app.y, itemView.states.carousel.y], false)
			
			




appView.content.on "change:y", ->
	
# 	carryViewY = Utils.modulate(appView.scrollY, [gapView.height, 0],
# 		[0 - 10 + lineView.height, gapView.height - 10 + lineView.height])
# 	carryView.y = Math.max(carryViewY, 0 - 10 + lineView.height)
	
	if globalGuard.states.current.name == "app"
		localGap = [686 - 80 + 34, 686 - 80 + 34 + 46]
		appView.content.height = Utils.modulate(appView.scrollY,
			[0, gapView.height], localGap, true)
		zenHeader.opacity = Utils.modulate(appView.scrollY,
			[0 + 4, gapView.height - 14], [1, 0], true)
		
		appView.content.scale = Utils.modulate(@parent.scrollY, [0, -240],
			[appView.content.states.app.scale, appView.content.states.carousel.scale], true)
		appView.content.originY = Utils.modulate(@parent.scrollY, [0, -240],
			[appView.content.states.app.originY, appView.content.states.carousel.originY], true)
	
	
	else if globalGuard.states.current.name == "carouselEnd"
		searchTabList.opacity = Utils.modulate(@parent.scrollY, [20 + 28, 20],
			[searchTabList.states.app.opacity, searchTabList.states.carousel.opacity], true)
	
	else if globalGuard.states.current.name == "feed"
		carryView.opacity = Utils.modulate(@parent.scrollY, [200, 0],
			[carryView.states.carousel.opacity, carryView.states.app.opacity], true)


appView.content.on Events.DragStart, ->
	appViewDradStarted = true
# 	value = @parent.scrollY
# 	fixedValue = parseInt(value.toFixed())


appView.content.on Events.Move, ->
	value = @parent.scrollY
	fixedValue = parseInt(value.toFixed())
	
	if globalGuard.states.current.name == "app"
		if fixedValue >= gapView.height
			@draggable.speedY = 0
			scrollView.content.draggable.speedY = 1


appView.content.on Events.DragEnd, ->
	appViewDradStarted = false
	yVelocity = @draggable.velocity.y
# 	bubleView.text = yVelocity 
	
	if globalGuard.states.current.name == "app"
		if @parent.scrollY < 0 and (@draggable.direction == "down" or @draggable.direction == null)
			@animateStop()
			
			if yVelocity > 1.6
				globalGuard.stateSwitch("feed")
				@animate("feed", curve: Spring(tension: 300, friction: 40, tolerance: 0.1,
					velocity: yVelocity))
			else
				globalGuard.stateSwitch("carouselStart")
				@animate("carousel", curve: Spring(tension: 500, friction: 40, tolerance: 0.1,
					velocity: yVelocity))
				
				searchTabList.animate("carousel", curve: Spring(tension: 500, friction: 40,
					tolerance: 0.1, velocity: yVelocity))
				carryView.animate("carousel", curve: Spring(tension: 500, friction: 40,
					tolerance: 0.1, velocity: yVelocity))
				bottomBarTabList.animate("carousel", curve: Spring(tension: 500, friction: 40,
					tolerance: 0.1, velocity: yVelocity))
	
	
	else if globalGuard.states.current.name == "carouselEnd"
		if @parent.scrollY < 0 and (@draggable.direction == "down" or @draggable.direction == null)
			@animateStop()
			globalGuard.stateSwitch("feed")
			@animate("feed", curve: Spring(tension: 200, friction: 40, tolerance: 0.1, velocity: yVelocity))
		else
			searchTabList.animate("carousel", curve: Spring(tension: 500, friction: 40,
				tolerance: 0.1, velocity: yVelocity))
			carryView.animate("carousel", curve: Spring(tension: 500, friction: 40,
				tolerance: 0.1, velocity: yVelocity))
			bottomBarTabList.animate("carousel", curve: Spring(tension: 500, friction: 40,
				tolerance: 0.1, velocity: yVelocity))
	
	
	else if globalGuard.states.current.name == "feed"
		if @draggable.direction == "down"
			@animate("feed", curve: Spring(tension: 300, friction: 40, tolerance: 0.1,
					velocity: yVelocity))
		else if @draggable.direction == "up"
			@animate("app", curve: Spring(tension: 300, friction: 40, tolerance: 0.5,
					velocity: yVelocity))
		else
			if @y > 240
				@animate("feed", curve: Spring(tension: 300, friction: 40, tolerance: 0.1,
					velocity: yVelocity))
			else
				@animate("app", curve: Spring(tension: 300, friction: 40, tolerance: 0.5,
					velocity: yVelocity))





# scrollView.content.on Events.DragStart, ->
# 	value = @parent.scrollY
# 	fixedValue = parseInt(value.toFixed())


scrollView.content.on Events.Drag, (event, layer) ->
	value = @parent.scrollY
	fixedValue = parseInt(value.toFixed())
# 	bubleView.text = "scroll: #{fixedValue} #{@draggable.isDragging}"
	
	if globalGuard.states.current.name == "app"
		if fixedValue < 0 and @draggable.isDragging
			@draggable.speedY = 0
			appView.content.draggable.speedY = 1
		else
			event.stopPropagation()



scrollView.backgroundColor = "white"


# test = new Layer
# 	size: 60
# 	x: Align.right(-20)
# 	y: Align.top(20)
# 
# test.onTap ->
# 	appView.content.originY = 0.5
appView.content.stateSwitch("feed")

# System

consoleView.bringToFront()
bubleView.bringToFront()
statusBar.bringToFront()

for item in [consoleView, bubleView]
	
	item.parent = null
	item.color = "grey"
	item.y += 20
	item.x = Align.left(20)
	item.textAlign = "left"






{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }
