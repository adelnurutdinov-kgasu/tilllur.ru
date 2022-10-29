Canvas.backgroundColor = "222"

screen = new Layer
	width: 360
	height: 640
	backgroundColor: "F5F6F8"
	image: "images/content4.png"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 24 }

fixChats = new Layer
	size: 44
	parent: screen
	x: 50
	y: 30
	backgroundColor: "white"

promo_icon = new Layer
	parent: screen
	width: 36
	height: 36
	x: Align.right(-18)
	y: Align.top(34)
	image: "images/promo%20icon.png"
	opacity: 0

promo_icon.states =
	"hidden": { opacity: 0 }



# Shuffle

shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source


# WElCOME_RUNNING = false
# welcomeView.stateSwitch("hidden")

# CreateView

darker = new Layer
	parent: screen
	width: 360
	height: 640
	backgroundColor: "rgba(0,0,0,0.5)"

darker.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
darker.stateSwitch("hidden")



createScrollView = new ScrollComponent
	parent: screen
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
	
createScrollView.states =
	"shown": { y: 0 }
	"hidden": { y: 700 }
createScrollView.stateSwitch("hidden")


createScrollView.content.on Events.DragEnd, ->
	if @parent.scrollY < 56 and @draggable.direction == "down"
		createScrollView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
		darker.animate("hidden", curve: Spring(damping: 1), time: 0.5)


shtorka_hande = new Layer
	parent: createScrollView.content
	width: 80
	height: 12
	x: Align.center()
	y: 32
	image: "images/shtorka%20hande.png"

contentCreate = new Layer
	parent: createScrollView.content
	width: 360
	height: 859
	y: 44
	image: "images/contentCreateView%20(1).png"


createScrollView.fix = new Layer { width: 360, height: 400, parent: createScrollView, y: Align.bottom, backgroundColor: "F0F1F5"}
createScrollView.content.bringToFront()








zenStep1 = new Layer
	width: 360
	height: 60
	parent: contentCreate
	y: 378
	backgroundColor: "null"


zenStep1.on Events.Tap, ->
	createScrollView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	darker.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	
	newTab.animate("shown", curve: Spring(damping: 1), time: 0.5)
	siteContent.animate("shown", curve: Spring(damping: 1), time: 0.5, delay: 2)


zenStep2 = new Layer
	width: 360
	height: 60
	parent: contentCreate
	y: 132
	backgroundColor: "null"


zenStep2.on Events.Tap, ->
	createScrollView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	darker.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	
	writeScrollView.animate("shown", curve: Spring(damping: 1), time: 0.5)
	darkerWrite.animate("shown", curve: Spring(damping: 1), time: 0.5)
# 	siteContent.animate("shown", curve: Spring(damping: 1), time: 0.5, delay: 2)




# WriteZenView

darkerWrite = new Layer
	parent: screen
	width: 360
	height: 640
	backgroundColor: "rgba(0,0,0,0.5)"

darkerWrite.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
darkerWrite.stateSwitch("hidden")



writeScrollView = new ScrollComponent
	parent: screen
	width: 360
	height: 640
	scrollVertical: true
	scrollHorizontal: false
	
writeScrollView.states =
	"shown": { y: 0 }
	"hidden": { y: 700 }
writeScrollView.stateSwitch("hidden")


writeScrollView.content.on Events.DragEnd, ->
	if @parent.scrollY < 56 and @draggable.direction == "down"
		writeScrollView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
		darkerWrite.animate("hidden", curve: Spring(damping: 1), time: 0.5)




shtorkaHandWrite = new Layer
	parent: writeScrollView.content
	width: 80
	height: 12
	x: Align.center()
	y: 32
	image: "images/shtorka%20hande.png"

writeArticleEmpty = new Layer
	parent: writeScrollView.content
	width: 360
	height: 596
	y: 44
	backgroundColor: "white"













backWriteArticleEmpty = new Layer
	size: 60
	parent: writeArticleEmpty
	backgroundColor: "null"

backWriteArticleEmpty.on Events.Tap, ->
	createScrollView.animate("shown", curve: Spring(damping: 1), time: 0.5)
	darker.animate("shown", curve: Spring(damping: 1), time: 0.5)
	
	writeScrollView.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	darkerWrite.animate("hidden", curve: Spring(damping: 1), time: 0.5)



# ZenContentStack


zenContentStack = new PageComponent
	width: 360
	height: 640
	y: 56
	backgroundColor: "white"
	scrollVertical: false
	scrollHorizontal: false


zenStep4 = new Layer
	width: 360
	height: 540
	image: "images/zenStep4.png"

zenStep3 = new Layer
	width: 360
	height: 540
	image: "images/zenStep3.png"

zenStep2 = new Layer
	width: 360
	height: 540
	image: "images/zenStep2.png"

zenStep1next = new Layer
	width: 360
	height: 540
	image: "images/zenStep1next.png"

zenStep1 = new Layer
	width: 360
	height: 540
	image: "images/zenStep1.png"



zenStepArray = [zenStep1, zenStep1next, zenStep2, zenStep3, zenStep4]

for item in zenStepArray
	item.parent = zenContentStack.content
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	if item is zenStep1 then startState = "shown"
	else startState = "hidden"
	
	item.stateSwitch(startState)
	
	
	
	nextActionLayerIndex = -1
	if item is zenStep1next then nextActionLayerIndex = 2
	else if item is zenStep2 then nextActionLayerIndex = 3
	else if item is zenStep3 then nextActionLayerIndex = 4
	
	if item is zenStep1
		item.on Events.Tap, ->
			zenStep1next.stateSwitch("shown")
	
	else if nextActionLayerIndex > -1
	
		nextButton = new Layer
			parent: item
			size: 100
			x: Align.right()
			custom:
				currentPage: item
				index: nextActionLayerIndex
		
		nextHandler = (event, layer) ->
			
			zenStepArray[@custom.index].stateSwitch("shown")
		
		nextButton.on(Events.Click, nextHandler)




zenContentStack.on "change:currentPage", ->
	for item in @content.children
		if item == @currentPage
			item.ignoreEvents = false
			item.children[0].off()
		else
			item.ignoreEvents = true

zenContentStack.snapToPage(zenStep1, false)






# Site

newTab = new Layer
	parent: screen
	width: 360
	height: 640
	image: "images/emptyTab.png"

newTab.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
newTab.stateSwitch("hidden")


closeTab = new Layer
	parent: newTab
	size: 44
	y: 24
	backgroundColor: "null"

closeTab.on Events.Tap, ->
	newTab.animate("hidden", curve: Spring(damping: 1.00), time: 0.5)
	siteContent.stateSwitch("hidden")

siteContent = new Layer
	parent: newTab
	y: 80
	width: 360
	height: 514
	image: "images/siteContent3.png"

siteContent.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
siteContent.stateSwitch("hidden")



createButton = new Layer
	parent: screen
	size: 56
	x: Align.right(-8)
	y: Align.top(24)
	backgroundColor: "null"

createButton.on Events.Tap, ->
	promo_icon.animate("hidden", curve: Spring(damping: 1), time: 0.5, delay: 1)
	
	createScrollView.animate("shown", curve: Spring(damping: 1), time: 0.5)
	darker.animate("shown", curve: Spring(damping: 1), time: 0.5)



bottom_bar = new Layer
	width: 360
	height: 60
	image: "images/bottom%20bar.png"
	parent: screen
	y: Align.bottom()

createScrollView.placeBefore(bottom_bar)
writeScrollView.placeBefore(bottom_bar)


statusBar = new Layer
	parent: screen
	width: 360
	height: 24
	backgroundColor: "white"
# 	image: "images/statusBar.png"


zenContentStack.parent = writeScrollView.content
# createButton.emit Events.Tap

