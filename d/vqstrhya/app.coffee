
Framer.Extras.Hints.disable()


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

screen = new Layer { width: 375, height: 812 }
new Preview { view: screen }

startPage = new Layer
	size: screen.size
	backgroundColor: "white"


# Pages





sitePage = new PageComponent
	parent: screen
	size: screen.size
	backgroundColor: "white"
	scrollVertical: false
	scrollHorizontal: false
	ignoreEvents: true


startImage = new Layer
	width: 375
	height: 812
	image: "images/start.jpg"

nullSuggest = new Layer
	width: 375
	height: 812
	image: "images/null.jpg"

typingSuggest = new Layer
	width: 375
	height: 812
	image: "images/typing.jpg"

for item in [startImage, nullSuggest, typingSuggest]
	sitePage.addPage(item, "right")


omnibox_start = new Layer
	parent: startImage
	width: 375
	height: 64
	y: 224

omnibox_start.onTap ->
	sitePage.snapToNextPage("right", false)

omnibox_start.states =
	"type1": { image: "images/omnibox/11.png"}
	"type2": { image: "images/omnibox/21.png"}
	"type3": { image: "images/omnibox/31.png"}
	"type4": { image: "images/omnibox/41.png"}
	"type5": { image: "images/omnibox/51.png"}
	"group1": { image: "images/omnibox/a1.png"}
	"group2": { image: "images/omnibox/b1.png"}
omnibox_start.stateSwitch("group1")


omnibox_null = new Layer
	parent: nullSuggest
	width: 375
	height: 64
	y: 94

omnibox_null.states =
	"type1": { image: "images/omnibox/12.png"}
	"type2": { image: "images/omnibox/22.png"}
	"type3": { image: "images/omnibox/32.png"}
	"type4": { image: "images/omnibox/42.png"}
	"type5": { image: "images/omnibox/52.png"}
	"group1": { image: "images/omnibox/a2.png"}
	"group2": { image: "images/omnibox/b2.png"}
omnibox_null.stateSwitch("group1")


omnibox_typing = new Layer
	parent: typingSuggest
	width: 375
	height: 64
	y: 94

omnibox_typing.states =
	"type1": { image: "images/omnibox/13.png"}
	"type2": { image: "images/omnibox/23.png"}
	"type3": { image: "images/omnibox/33.png"}
	"type4": { image: "images/omnibox/43.png"}
	"type5": { image: "images/omnibox/53.png"}
	"group1": { image: "images/omnibox/a3.png"}
	"group2": { image: "images/omnibox/b3.png"}
omnibox_typing.stateSwitch("group1")









keyboardBox = new Layer
	parent: nullSuggest
	width: 375
	height: 290
	y: Align.bottom

keyboardBox.onTap ->
	sitePage.snapToNextPage("right", false)

nullBack = new Layer
	parent: omnibox_null
	width: 80
	height: 64

nullBack.onTap ->
	sitePage.snapToNextPage("left", false)






typingBack = new Layer
	parent: omnibox_typing
	width: 80
	height: 64

typingBack.onTap ->
	sitePage.snapToNextPage("left", false)
	sitePage.snapToNextPage("left", false)


clear = new Layer
	parent: omnibox_typing
	width: 120
	height: 64
	x: Align.right

clear.onTap ->
	sitePage.snapToNextPage("left", false)

# sitePage.onTap ->
# 	@snapToNextPage("right", false)


for item in [omnibox_null, omnibox_start, omnibox_typing, clear, typingBack, nullBack, keyboardBox]
	item.backgroundColor = "null"


sitePage.sendToBack()

sitePage.onSwipe ->
	flow.showPrevious()

flow = new FlowComponent
	parent: screen
	size: screen.size

flow.showNext(startPage)

# Buttons

gapButton = 60

createButton = (title = "Показать сайт", faded = true) ->
	button = new TextLayer
		parent: startPage
		text: title
		fontSize: 20
		padding: 
			left: 40
		color: "black"
		opacity: if faded then 0.2 else .8



buttonGroup1 = createButton("Смелый", false)
buttonGroup1.y = 100

buttonGroup1.onTap ->
	flow.showNext(sitePage)
	for item in [omnibox_start, omnibox_null, omnibox_typing]
		item.stateSwitch("group1")


buttonGroup2 = createButton("Безопасный", false)
buttonGroup2.y = buttonGroup1.y + gapButton

buttonGroup2.onTap ->
	flow.showNext(sitePage)
	for item in [omnibox_start, omnibox_null, omnibox_typing]
		item.stateSwitch("group2")




button1 = createButton("Картинка (база)")
button1.y = buttonGroup2.y + gapButton*2

button1.onTap ->
	flow.showNext(sitePage)
	for item in [omnibox_start, omnibox_null, omnibox_typing]
		item.stateSwitch("type1")
	



button2 = createButton("Картинка (промо)")
button2.y = button1.y + gapButton

button2.onTap ->
	flow.showNext(sitePage)
	for item in [omnibox_start, omnibox_null, omnibox_typing]
		item.stateSwitch("type2")





button3 = createButton("Картинка (смелый)")
button3.y = button2.y + gapButton

button3.onTap ->
	flow.showNext(sitePage)
	for item in [omnibox_start, omnibox_null, omnibox_typing]
		item.stateSwitch("type3")



button4 = createButton("Пусто (смелый)")
button4.y = button3.y + gapButton

button4.onTap ->
	flow.showNext(sitePage)
	for item in [omnibox_start, omnibox_null, omnibox_typing]
		item.stateSwitch("type4")



button5 = createButton("Пусто (промо)")
button5.y = button4.y + gapButton

button5.onTap ->
	flow.showNext(sitePage)
	for item in [omnibox_start, omnibox_null, omnibox_typing]
		item.stateSwitch("type5")

topBarFix = new Layer
	parent: screen, width: screen.width, height: 44
	backgroundColor: "white"

bottomBarFix = new Layer
	parent: screen, width: screen.width, height: 34, y: Align.bottom
	backgroundColor: "white"
