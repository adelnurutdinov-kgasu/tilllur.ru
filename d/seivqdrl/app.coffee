
Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new Layer { width: 375, height: 812, backgroundColor: "F4F2F0" }
preview = new Preview { view: screen }


# Start Page

startPage = new ScrollComponent
	parent: screen
	width: screen.width
	height: screen.height - 44
	y: 44
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	contentInset: 
		bottom: 40

content = new Layer
	parent: startPage.content
	width: 375
	height: 906
	image: "images/Content.png"

article = new Layer
	parent: startPage.content
	width: 375
	height: 454
	y: content.height + 6
	image: "images/Article.png"

startPage.updateContent()



arrowButton = new Layer
	width: screen.width
	height: 64
	parent: content
	y: 80
	backgroundColor: "null"




darker = new Layer
	parent: startPage
	size: screen.size

darker.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
darker.stateSwitch("hidden")

suggestView = new Layer
	parent: startPage
	width: 375
	height: 458
	image: "images/suggestView.png"

suggestView.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
suggestView.stateSwitch("hidden")

backButton = new Layer
	parent: suggestView
	size: 64
	backgroundColor: "null"




keyboard = new Layer
	parent: preview
	width: 375
	height: 335
	image: "images/keyboard.png"

keyboard.states =
	"shown": { y: Align.bottom() }
	"hidden": { y: Align.bottom(keyboard.height + 20) }
keyboard.stateSwitch("hidden")

keyboard.bringToFront()





arrowButton.onTap ->
	keyboard.animate("shown")
	darker.animate("shown")
	suggestView.stateSwitch("shown")

backButton.onTap ->
	keyboard.animate("hidden")
	darker.animate("hidden")
	suggestView.stateSwitch("hidden")


topBarFix = new Layer
	parent: screen, width: screen.width, height: 44
	backgroundColor: "white"

bottomBarFix = new Layer
	parent: screen, width: screen.width, height: 34, y: Align.bottom
	backgroundColor: "white"
