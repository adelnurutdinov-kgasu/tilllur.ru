Framer.Extras.Hints.disable()

{iOSSwitch} = require 'iOSSwitch'
{iOSSegmentedControl} = require "iOSSegmentedControl"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer { width: 390, height: 844 }
new Preview { view: screen }

# Start Page

startPage = new Layer
	parent: screen
	width: 375
	height: 812
	image: "images/start2.png"
	scale: 390/375
	x: Align.center
	y: Align.center

button_OpenStory = new Layer
	parent: startPage
	x: 15
	y: 196
	height: 109
	width: 109
	backgroundColor: "null"

shortcut = new Layer
	parent: startPage
	size: 108
	x: 15
	y: 196
	backgroundColor: "null"



# Data


lastData = null

data = [{
	images: ["images/steps/read1.png", "images/steps/read2a.png"]
	title: "Читалка — полнота"
	shortcut: "images/shortcuts/read.png"
},
{
	images: ["images/steps/read1.png", "images/steps/read2b.png"]
	title: "Читалка — как включать"
	shortcut: "images/shortcuts/read.png"
},
{
	images: ["images/steps/translate1.png", "images/steps/translate2.png"]
	title: "Перевод"
	shortcut: "images/shortcuts/translate.png"
},
{
	images: ["images/steps/translate1light.png", "images/steps/translate2.png"]
	title: "Перевод — без кнопки"
	shortcut: "images/shortcuts/translate.png"
},
{
	images: ["images/steps/camera1.png"]
	title: "Умная камера"
	shortcut: "images/shortcuts/camera.png"
},
{
	images: ["images/steps/cards1.png"]
	title: "Бонусные карты"
	shortcut: "images/shortcuts/cards.png"
},
{
	images: ["images/steps/cards1light.png"]
	title: "Бонусные карты — без кнопки"
	shortcut: "images/shortcuts/cards.png"
},
]

# Load images

for item in data
	for image in item.images
		tempLayer = new Layer
			image: image
			y: -5000



# Slider / Steps

slider = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: false
	backgroundColor: "null"



compose = (images = imageSteps) ->
	
	for imageURL in images.concat([""])
		step = new Layer
			width: screen.width
			height: screen.height
			backgroundColor: "null"
		
		slider.addPage(step, "right")
		
		if imageURL != "" and progressType.stories
			step.on Events.Tap, (event, layer) ->
# 				print event
# 				print Events.touchEvent(event)
# 				print Events.touchEvent(event).point
				if Utils.isMobile()
					if event.start.y > 100
						if event.start.x > screen.width / 2 then nextHander()
						else prevHandler()
				else
					if event.point.y > 100
						if event.point.x > screen.width / 2 then nextHander()
						else prevHandler()
					
	# 				# last page
	# 				if slider.currentPage == slider.content.children[slider.content.children.length - 1]
	# 					slider.content.draggable.enabled = false
	# 					slider.content.ignoreEvents = true
	# 					slider.ignoreEvents = true
		
	slider.updateContent()




stepView = null
stepProxy = null

progressView = null
progressProxy = null
progressProxy_Round = null

stepView = new Layer
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "null"

stepView.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
	"left": { x: -screen.width }
	"center": { x: 0 }
	"right": { x: screen.width }

stepView.stateSwitch("right")



create = (images = imageSteps) ->
	
	stepProxy = new Layer
		parent: stepView
		width: screen.width
		height: screen.height
		backgroundColor: "null"
	
	
	for imageURL in images.concat([""])
		step = new Layer
			parent: stepProxy
			width: screen.width
			height: screen.height
			image: imageURL
			backgroundColor: "null"
		
# 		buttonClose = new Layer
# 			parent: step
# 			y: 0
# 			height: screen.height
# 			width: screen.width / 2
# 			x: Align.left
# 			backgroundColor: "null"
# 		
# 		buttonNext = new Layer
# 			parent: step
# 			y: 0
# 			height: screen.height
# 			width: screen.width / 2
# 			x: Align.right
# 			backgroundColor: "null"
# 		
		
		
		darker = new Layer
			parent: step
			width: screen.width
			height: screen.height
			backgroundColor: "rgba(0,0,0,0.5)"
		
		darker.states =
			"shown": { opacity: 1 }
			"hidden": { opacity: 0 }
		darker.stateSwitch("shown")
		
		step.sendToBack()
		
# 		buttonClose.onTap ->
# 			closeHandler()
# 		
# 		buttonNext.onTap ->
# 			nextHander()
# 




# Slider / Progress

progressType =
	stories: true



progress = (images = imageSteps) ->
	maxWidth = 330
	stepCount = images.length
	stepWidth = (maxWidth - 10 * (stepCount - 1)) / stepCount
	
	progressView = new Layer
		parent: stepView
		width: screen.width
		height: 2
		y: 64
		backgroundColor: "null"
	
	
	# dont show 1 step
	# if stepCount <= 1 then progressView.opacity = 0
	
	progressProxy = new Layer
		parent: progressView
		width: maxWidth
		height: 2
		x: Align.center
		backgroundColor: "null"
	
	
	for image, i in images
		step = new Layer
			parent: progressProxy
			width: stepWidth
			height: 2
			x: (stepWidth + 10) * i
			backgroundColor: "rgba(0,0,0,1.0)"
		
		step.states =
			"shown": { opacity: 0.8 }
			"hidden": { opacity: 0.15 }
		if i == 0 then step.stateSwitch("shown")
		else step.stateSwitch("hidden")
	
	
	progressProxy_Round = new Layer
		parent: progressView
		width: 12 * stepCount + 16 * (stepCount - 1)
		height: 32
		x: Align.center
		y: Align.top(screen.height - 64 - 64)
		backgroundColor: "null"
	
	for image, i in images
		step = new Layer
			parent: progressProxy_Round
			width: 12
			height: 12
			borderRadius: "100%"
			x: (12 + 16) * i
			backgroundColor: "rgba(0,0,0,1.0)"
		
		step.states =
			"shown": { opacity: 0.8 }
			"hidden": { opacity: 0.15 }
		if i == 0 then step.stateSwitch("shown")
		else step.stateSwitch("hidden")
	
	
	closeIcon = new Layer
		parent: progressView
		y: 16
		width: 390
		height: 40
		image: "images/close.png"
	
	closeIcon.onTap ->
		closeHandler()

	closeIcon.states =
		"top": { y: -16 }
		"bottom": { y: 16 }		
	
	if progressType.stories
		progressProxy.opacity = 1
		progressProxy_Round.opacity = 0
		closeIcon.stateSwitch("bottom")
	else
		progressProxy.opacity = 0
		progressProxy_Round.opacity = 1
		closeIcon.stateSwitch("top")

showProgress = (index = 0) ->
	for item, i in progressProxy.children
		if i <= index then item.stateSwitch("shown")
		else item.stateSwitch("hidden")
	
	for item,i in progressProxy_Round.children
		if i == index then item.stateSwitch("shown")
		else item.stateSwitch("hidden")


initData = (dataItem) ->
	lastData = dataItem
	
	if stepView != null then item.destroy() for item in stepView.children
	item.destroy() for item in slider.content.children
	
	compose(dataItem.images)
	create(dataItem.images)
	progress(dataItem.images)
	
	stepProxy.children[0].children[0].stateSwitch("hidden")
	shortcut.image = dataItem.shortcut
	
	if progressType.stories
		slider.content.draggable.horizontal = false
	else
		slider.content.draggable.horizontal = true

initData(data[0])
stepView.stateSwitch("center")



# Handlers x Swipe

button_OpenStory.onTap ->
	slider.content.animateStop()
	slider.snapToPage(slider.content.children[0], false)
	slider.content.draggable.enabled = true
	slider.content.ignoreEvents = false
	slider.ignoreEvents = false
	item.ignoreEvents = false for item in slider.content.children
	
	stepView.stateSwitch("right")
	stepView.animate("center")


nextHander = (withAnimation = !progressType.stories) ->
	slider.snapToNextPage("right", withAnimation)
	
	# last page
	if slider.currentPage == slider.content.children[slider.content.children.length - 1]
		slider.content.draggable.enabled = false
		slider.content.ignoreEvents = true
		slider.ignoreEvents = true
		item.ignoreEvents = true for item in slider.content.children

prevHandler = (withAnimation = !progressType.stories) ->
	slider.snapToNextPage("left", withAnimation)

closeHandler = () ->
# 	if slider.currentPage == slider.content.children[slider.content.children.length - 1]
# 		return
	
	stepView.animate("left")
	slider.content.draggable.enabled = false
	slider.content.ignoreEvents = true
	slider.ignoreEvents = true
	item.ignoreEvents = true for item in slider.content.children




slider.content.on "change:x", ->
# 	print v = @x
	for item, i in slider.content.children.reverse()
		
		# change pages from [0, -390]
		stepProxy.children[i].x = Utils.modulate(@x, [-screen.width*(i), -screen.width*(i+1)], [0, -screen.width], true)
		
		# change darker on next page
		if i < slider.content.children.length - 1
			stepProxy.children[i+1].children[0].opacity = Utils.modulate(@x, [-screen.width*(i), -screen.width*(i+1)], [1, 0], true)
		
		# change progress on last page
		if i == slider.content.children.length - 1
			progressView.x = Utils.modulate(@x, [-screen.width*(i-1), -screen.width*(i)], [0, -screen.width], true)



slider.content.on Events.DragEnd, ->
	if slider.currentPage == slider.content.children[slider.content.children.length - 1]
		slider.content.draggable.enabled = false
		slider.content.ignoreEvents = true
		slider.ignoreEvents = true
		item.ignoreEvents = true for item in slider.content.children


slider.on "change:currentPage", ->
	for item, i in slider.content.children
		if item == slider.currentPage
			showProgress(i)




# Settings

screen_settings = new Layer
	parent: screen
	width: 390
	height: 844
	backgroundColor: "white"

screen_settings.states =
	"shown": { x: 0 }
	"hidden": { x: screen.width }
screen_settings.stateSwitch("hidden")

screen_settings_header = new Layer
	width: 390
	height: 100
	image: "images/settingsHeader.png"
	parent: screen_settings

screen_settings_header_back = new Layer
	parent: screen_settings_header, height: 56, width: 56, y: 44, x: -8
	backgroundColor: "null"


settingsView_scroll = new ScrollComponent
	parent: screen_settings
	width: 390
	height: 844 - 100
	y: 100
	backgroundColor: "white"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true


getSettingsTitle = (title = "Дзен") ->
	settings_breaker1 = new TextLayer
		name: "breaker"
		parent: settingsView_scroll.content
		fontSize: 24
		width: 390 - 20
		height: 40
		text: title
		fontWeight: "bold"
		x: Align.left(20)
		color: "black"
		contentInset:
			left: 20
			right: 80


getSettingsLine = (title = "Строчка") ->
	settings_zenArticleOpenTypeText = new TextLayer
		parent: settingsView_scroll.content
		fontSize: 16
		width: 390 - 20
		height: 32
		text: title
		x: Align.left(20)
		color: "black"
		padding: 
			top: 6
		contentInset:
			left: 20
			right: 80

getSegmentedControl = (itemArray = ["On", "Off", "sd"], customWidth = 200) ->
	switchControl = new iOSSegmentedControl
		parent: settingsView_scroll.content
		x: Align.center
		y: Align.center -50
		tintColor: "#42B72A"
		width: customWidth
		items: itemArray
	
	switchControl.setSelected true, 0
	return switchControl




screen_settings_header_back.onTap ->
	screen_settings.animate("hidden")

logoButton = new Layer
	parent: startPage
	width: 106
	height: 83
	x: 135
	y: 41
	backgroundColor: "null"

logoButton.onTap ->
	screen_settings.animate("shown")



settings_showTips = new iOSSwitch
	parent: getSettingsLine("Фулскрин как сторис")
	point: Align.center
	isOn: progressType.stories
	x: Align.right(-32)

settings_showTips.parent.y = Align.top(data.length * 48 + 80)
settings_showTips.onValueChange (value) ->
	progressType.stories = !progressType.stories
	
	screen_settings.stateSwitch("hidden")
	initData(lastData)
	button_OpenStory.emit Events.Tap
	stepView.stateSwitch("center")



switchControl_Array = []
switchControl_Array.push(item.title) for item in data




for item, i in data
	button = getSettingsLine("#{item.title}")
	button.y = i * 48 + 32
	button.custom =
		data: item
	
	button.onTap ->
		screen_settings.stateSwitch("hidden")
		initData(@custom.data)
		button_OpenStory.emit Events.Tap
		stepView.stateSwitch("center")



