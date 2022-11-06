Utils.insertCSS('@import url(css/project.css)')

# ScrollView
scrollView = new PageComponent
	width: 360
	height: 640
	scrollHorizontal: false

page1 = new Layer
	width: scrollView.width
	height: scrollView.height
	parent: scrollView.content
	backgroundColor: "null"

page2 = new Layer
	width: scrollView.width
	height: scrollView.height / 2
	parent: scrollView.content
	y: scrollView.height
	backgroundColor: "null"

page3 = new Layer
	width: scrollView.width
	height: scrollView.height
	parent: scrollView.content
	y: scrollView.height * 1.5
	backgroundColor: "null"
# 	backgroundColor: "red"

scrollView.snapToPage(page2, false)
scrollView.updateContent()

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	name: "figmaView"
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "transparent"


bg = new Layer
	name: "bg"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/bg.png"


whiter = new Layer
	name: "whiter"
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	image: "images/figma/whiter.png"

whiter.states =
	"base":
		opacity: 0
	"tabs":
		opacity: 0
	"feed":
		opacity: 1


sitesAll = new Layer
	name: "sitesAll"
	parent: figmaView
	x: 0
	width: 360
	height: 220
	opacity: 1
	image: "images/figma/sitesAll.png"

sitesAll.states =
	"base":
		y: -104
	"tabs":
		y: 415
	"feed":
		y: -380


feed = new Layer
	name: "feed"
	parent: figmaView
	x: 0
	width: 360
	height: 986
	opacity: 1
	image: "images/figma/feed.png"

feed.states =
	"base":
		y: 314
	"tabs":
		y: 833
	"feed":
		y: 38


header = new Layer
	name: "header"
	parent: figmaView
	x: 0
	width: 360
	height: 186
	opacity: 1
	image: "images/figma/header.png"

header.states =
	"base":
		y: 116
	"tabs":
		y: 635
	"feed":
		y: -160


statusBar = new Layer
	name: "statusBar"
	parent: figmaView
	x: -0.0
	y: 0
	width: 360
	height: 32
	opacity: 1
	image: "images/figma/statusBar.png"


sceneStates = ["base", "tabs", "feed"]
sceneLayers = [figmaView, bg, whiter, sitesAll, feed, header, statusBar]

for item in sceneLayers
	try item.stateSwitch(sceneStates[0])


cycler = Utils.cycle(sceneStates)
nextState = cycler()

nextStateHandler = () ->
	nextState = cycler()
	for item in sceneLayers
		try
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		catch error


figmaView.on Events.Click, ->
	nextStateHandler()


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 24, statusBar: "light" }

nextStateHandler = () ->

scrollView.parent = figmaView
# scrollView.content.draggable.speedY = 0.5

statusBar.image = null
statusBar.backgroundColor = "000"

# BottomBar

scrollGuard = new Layer
	opacity: 0

scrollGuard.states =
	"top": { opacity: 0 }
	"feed": { opacity: 0 }
scrollGuard.stateSwitch("top")



feedBottomBar = new Layer
	parent: figmaView
	width: 360
	height: 48
	y: Align.bottom
	backgroundColor: "black"

feedBottomBar.states =
	"shown": { y: Align.bottom }
	"hidden": { y: Align.bottom(100) }
feedBottomBar.stateSwitch("hidden")



scrollGuard.on Events.StateSwitchEnd, (from, to) ->
# 	print to
	if to != from
		if to == "top"
# 			bottomBar.animate("shown",
# 				curve: Spring(damping: 1), time: 0.5)
			feedBottomBar.animate("hidden",
				curve: Spring(damping: 1), time: 0.5)
		else if to == "feed"
# 			bottomBar.animate("hidden",
# 				curve: Spring(damping: 1), time: 0.5)
			feedBottomBar.animate("shown",
				curve: Spring(damping: 1), time: 0.5)



# Feed Bottom Bar content

# feedBottomBar.stateSwitch("shown")

renderedItemIndex = 0
fixFont = () ->
	renderedItemIndex = 3
	if renderedItemIndex == 3
		sumX = 0
		for title, i in textView.children
# 			print title.width
			dot = new Layer
				parent: title
				size: 6
				borderRadius: 2
				x: Align.center
				y: 22
				backgroundColor: "white"
	
			dot.states =
				"hidden": { opacity: 0 }
				"shown": { opacity: 1 }
			
			if i == 0 then dot.stateSwitch("shown")
			else dot.stateSwitch("hidden")
			
			title.x = sumX
			sumX += title.width + 16
		
		textView.width = sumX - 16
		textView.x = Align.center()


horns.parent = feedBottomBar
horns.y = -24
horns.x = 0

textView = new Layer
	parent: feedBottomBar
	backgroundColor: null
	y: 12


sumX = 0
for text, i in ["дзен", "видео", "подписки"]
	title = new TextLayer
		parent: textView
		fontFamily: "YS Text"
		fontWeight: 500
		text: text
		fontSize: 16
		lineHeight: 20/16
		x: sumX
		color: "white"
	
# 	title.on "change:fontFamily", ->
# 		fixFont()
	
	title.fontFamily = "YS Web Medium"



scroll_to_top = new Layer
	width: 24
	height: 24
	image: "images/scroll%20to%20top.png"
	parent: feedBottomBar
	x: Align.left(20)
	y: Align.top(12)

new_post = new Layer
	width: 24
	height: 24
	image: "images/Property%201=new%20message.png"
	parent: feedBottomBar
	x: Align.right(-20)
	y: Align.top(12)
# 	backgroundColor: "red"
# 	


scroll_to_top.on Events.Tap, ->
	scrollGuard.stateSwitch("top")
	if mordaContentView.scrollY > 640
		mordaContentView.scrollToPoint(
			x: 0, y: 640
			false
		)
	
	mordaContentView.scrollToPoint(
		x: 0, y: 0
		true
		curve: Spring(damping: 1), time: 0.5
	)

scrollView.on "change:currentPage", ->
	if scrollView.currentPage == page3
		scrollGuard.stateSwitch("feed")
	else
		scrollGuard.stateSwitch("top")


# ScrollView Animate Transition
toFeedGap = [480, 640 + 320] #[0, 1]
# toFeedGapFast = [640, 640 + 60] #[0, 0.3]
# toFeedGapSlow = [640 + 160, 916] #[0, 0.3]
# toFeedGapMedium = [640, 640 + 100] #[0, 0.6]

toSiteGap = [0, 480] #[0, 1]
# toSiteGapFast = [560, 640] #[0.88, 1]

isSwipeToFeed = (localValue) -> return localValue >= toFeedGap[0]
# isSwipeToSite = (localValue) -> return localValue >= toSiteGap[0] and localValue <= toSiteGap[1]


scrollView.content.on "change:y", ->
	v = scrollView.scrollY
# 	print v
	
	if isSwipeToFeed(v)
		[s1, s2] = ["base", "feed"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [
									[header, "y", toFeedGap],
									[sitesAll, "y", toFeedGap],
									[feed, "y", toFeedGap],
									[whiter, "opacity", toFeedGap],
		]

	else
		[s1, s2] = ["tabs", "base"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [
									[header, "y", toSiteGap],
									[sitesAll, "y", toSiteGap],
									[feed, "y", toSiteGap],
		]


# Fonts

Utils.delay 1,->
	for item in textView.children
		item.children[0].x = Align.center

`
document.fonts.ready.then(function () {
  fixFont();
});
`
