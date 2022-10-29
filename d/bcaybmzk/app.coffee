
Utils.insertCSS('@import url(css/project.css)')

screen = new Layer { width: 360, height: 640, backgroundColor: "black" }

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 24 }

pages = new PageComponent
	width: 360
	height: 640
	parent: screen
	scrollVertical: false

changePage = (index, snapping = true) ->
	if snapping
		pages.snapToPage(pages.content.children[index])
	
	for title, i in textView.children
		if i == index
			title.children[0].animate("shown",
				curve: Spring(damping: 1), time: 0.5)
		else
			title.children[0].animate("hidden",
				curve: Spring(damping: 1), time: 0.5)

# Bottom Bar

feedBottomBar = new Layer
	parent: pages
	width: 360
	height: 48
	y: Align.bottom
	backgroundColor: "black"

feedBottomBar.states =
	"shown": { y: Align.bottom }
	"hidden": { y: Align.bottom(100) }
feedBottomBar.stateSwitch("hidden")


horns.parent = feedBottomBar
horns.y = -24
horns.x = 0

textView = new Layer
	parent: feedBottomBar
	backgroundColor: null
	y: 12

# Fix Fonts

fixFont = () ->
	sumX = 0
	for title, i in textView.children
		
		title.children[0].x = Align.center
		
		title.x = sumX
		sumX += title.width + 16
	
	textView.width = sumX - 16
	textView.x = Align.center()

# Create Title

for text, i in ["дзен", "видео", "подписки"]
	view = new Layer
		width: 360
		height: 640
		parent: pages.content
		x: i * (360 + 16)
		backgroundColor: "white"
	
	title = new TextLayer
		parent: textView
		fontFamily: "YS Text"
		fontWeight: 500
		text: text
		fontSize: 16
		lineHeight: 20/16
		color: "white"
		fontFamily: "YS Web Medium"
		custom:
			index: i
	
	title.states =
		"shown": { color: "rgba(255,255,255, 1.0)" }
		"hidden": { color: "rgba(255,255,255, .5)" }
	title.stateSwitch("shown")
	
	dot = new Layer
		parent: title
		size: 6
		borderRadius: 2
		x: Align.center
		y: 22
		backgroundColor: "white"

	dot.states =
		"hidden": { opacity: 0, scale: 0 }
		"shown": { opacity: 1, scale: 1 }
	
	if i == 0 then dot.stateSwitch("shown")
	else dot.stateSwitch("hidden")
	
	
	
	title.on Events.TouchStart, ->
		@animate("hidden", time: 0.1)
	
	title.on Events.TouchEnd, ->
		@animate("shown", time: 0.1)
		changePage(@custom.index)



pages.on "change:currentPage", ->
	for page, i in pages.content.children
		if page == pages.currentPage
			changePage(i, false)


feedBottomBar.stateSwitch("shown")

# Load fonts

Utils.delay 1,->
	fixFont()


`
document.fonts.ready.then(function () {
  fixFont();
});
`
