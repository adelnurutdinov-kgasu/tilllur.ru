

# Delay

SD = 500
LD = 3000

shortDelayReference = null
longDelayReference = null

delay = (time, fn, args...) ->
	setTimeout fn, time, args...

Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer { width: 390, height: 844 }
new Preview { view: screen }

startPage = new Layer
	size: screen.size
	backgroundColor: "white"

# Site Page

sitePage = new Layer
	size: screen.size
	backgroundColor: "white"
	parent: screen


site = new Layer
	parent: sitePage
	y: 108
	width: 390
	height: 755
	image: "images/site.jpg"

header = new Layer
	parent: sitePage
	width: 390
	height: 109
	image: "images/header.png"

headerBack = new Layer
	parent: header
	backgroundColor: "null"
	y: 48
	width: 60
	height: 56

headerBack.onTap ->
	flow.showPrevious()



ratingView = new Layer
	parent: header
	backgroundColor: "null"
	size: 32
	y: 60
	x: 60

ratingView.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
	"negative": { image: "images/negative.png", opacity: 1 }
	"positive": { image: "images/positive.png", opacity: 1 }
ratingView.stateSwitch("positive")



titleView = new Layer
	parent: header
	width: 182
	height: 44
	x: Align.center
	y: 54
	image: "images/titleView (1).png"

titleView.states =
	"base": { y: 54 + 10 }
	"promo": { y: 57 }
titleView.stateSwitch("base")
titleView.stateSwitch("promo")

titleSupportText = new TextLayer
	parent: titleView
	width: titleView.width
	y: 22
	fontSize: 11
	textAlign: "center"
	color: "rgba(0,0,0,0.3)"

titleSupportText.states =
	"protect": { text: "3 трекера заблокировано" }
	"rating": { text: "67 отзывов" }
	"reader": { text: "доступен режим чтения" }
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
titleSupportText.stateSwitch("protect")





shiledIcon = new Layer
	parent: titleView
	width: 12
	height: 12
	image: "images/shiledIcon.png"
	x: 25
	y: 16 - 8

shiledIcon.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
shiledIcon.stateSwitch("hidden")

sitePage.sendToBack()

sitePage.onSwipe ->
	flow.showPrevious()

flow = new FlowComponent
	parent: screen
	size: screen.size

flow.showNext(startPage)
# flow.showNext(sitePage)

# Buttons

gapButton = 60

createButton = (title = "Показать сайт") ->
	button = new TextLayer
		parent: startPage
		text: title
		fontSize: 20
		padding: 
			left: 40
		color: "black"
		opacity: .8

button0 = createButton("Обычный сайт")
button0.y = 100

button0.onTap ->
	ratingView.stateSwitch("hidden")
	titleView.stateSwitch("base")
	titleSupportText.stateSwitch("hidden")
	shiledIcon.stateSwitch("hidden")
	
	flow.showNext(sitePage)




button1 = createButton("Режим чтения")
button1.y = button0.y + gapButton

button1.onTap ->
	ratingView.stateSwitch("hidden")
	titleView.stateSwitch("base")
	titleSupportText.stateSwitch("hidden")
	titleSupportText.stateSwitch("reader")
	shiledIcon.stateSwitch("hidden")
	
	clearTimeout(shortDelayReference)
	clearTimeout(longDelayReference)
	
	shortDelayReference = delay SD, ->
		titleView.animate("promo")
		titleSupportText.animate("shown")
	
	longDelayReference = delay LD, ->
		titleView.animate("base")
		titleSupportText.animate("hidden")
	
	flow.showNext(sitePage)



button2 = createButton("С отзывами")
button2.y = button1.y + gapButton

button2.onTap ->
	ratingView.stateSwitch("hidden")
	titleView.stateSwitch("base")
	titleSupportText.stateSwitch("hidden")
	titleSupportText.stateSwitch("rating")
	shiledIcon.stateSwitch("hidden")
	
	clearTimeout(shortDelayReference)
	clearTimeout(longDelayReference)
	
	shortDelayReference = delay SD, ->
		titleView.animate("promo")
		titleSupportText.animate("shown")
		ratingView.animate("shown")
	
	longDelayReference = delay LD, ->
		titleView.animate("base")
		titleSupportText.animate("hidden")
	
	flow.showNext(sitePage)





button3 = createButton("С блокировщиком")
button3.y = button2.y + gapButton

button3.onTap ->
	ratingView.stateSwitch("hidden")
	titleView.stateSwitch("base")
	titleSupportText.stateSwitch("hidden")
	titleSupportText.stateSwitch("protect")
	shiledIcon.stateSwitch("hidden")
	
	clearTimeout(shortDelayReference)
	clearTimeout(longDelayReference)
	
	shortDelayReference = delay SD, ->
		titleView.animate("promo")
		titleSupportText.animate("shown")
# 		ratingView.animate("shown")
	
	longDelayReference = delay LD, ->
# 		titleView.animate("base")
# 		titleSupportText.animate("hidden")
# 		shiledIcon.animate("shown")
	
	flow.showNext(sitePage)



button4 = createButton("Отзывы и блокировщик")
button4.y = button3.y + gapButton

button4.onTap ->
	ratingView.stateSwitch("shown")
# 	ratingView.stateSwitch("negative")
	titleView.stateSwitch("base")
	titleSupportText.stateSwitch("hidden")
	titleSupportText.stateSwitch("protect")
	shiledIcon.stateSwitch("hidden")
	
	clearTimeout(shortDelayReference)
	clearTimeout(longDelayReference)
	
	shortDelayReference = delay SD, ->
		titleView.animate("promo")
		titleSupportText.animate("shown")
# 		ratingView.animate("shown")
	
	longDelayReference = delay LD, ->
# 		titleView.animate("base")
# 		titleSupportText.animate("hidden")
# 		shiledIcon.animate("shown")
	
	flow.showNext(sitePage)
