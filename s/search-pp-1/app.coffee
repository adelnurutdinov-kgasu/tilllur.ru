

screen = new Layer
	width: 375, height: 812
	backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen }

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.4

# Stack Transition




scrollView = new PageComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: true
	scrollHorizontal: false
	originY: 0.5


# Scroll

pageTop = new Layer
	width: screen.width
	height: 564

pageMid = new Layer
	width: screen.width
	height: 292
	y: pageTop.height
	image: "images/arrow.png"

pageBot = new Layer
	width: screen.width
	height: 812 - 100
	# scrollVertical: false
	# scrollHorizontal: false
	y: pageTop.height + pageMid.height



# scrollView.on "change:currentPage", ->
# 	if scrollView.currentPage == pageBot
# 		pageBot.content.scrollVertical = true
# 		pageBot.scrollVertical = true
# 		scrollView.content.scrollVertical = false
# 		scrollView.scrollVertical = false


# guardFeedReturn = false


# pageBot.content.on Events.DragStart, (event, layer) ->
# 	guardFeedReturn = false
	
# 	if pageBot.scrollY <= 0 and pageBot.content.draggable.direction == "down"
# 		guardFeedReturn = true


# pageBot.content.on Events.DragEnd, (event, layer) ->
# 	if guardFeedReturn and pageBot.content.draggable.direction == "down"
# 		pageBot.content.scrollVertical = false
# 		pageBot.scrollVertical = false
# 		scrollView.content.scrollVertical = true
# 		scrollView.scrollVertical = true
		
# 		pageBot.scrollToPoint({ x: 0, y: 0 }, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })
# 		scrollView.snapToPage(pageMid, true, { curve: Spring(tension: 400, friction: 40, velocity: layer.draggable.velocity.y) })


# Pages Init

for item, i in [pageTop, pageMid, pageBot]
	item.parent = scrollView.content
	# item.backgroundColor = Utils.randomColor()
	item.backgroundColor = null


# pageBot.originY = 0
# pageBot.states =
# 	"newTab":
# 		scale: 344/360
# 	"feed":
# 		scale: 1
# pageBot.stateSwitch("newTab")

scrollView.snapToPage(pageMid, false)




# Static Views

feedView = new Layer
	parent: pageBot
	width: 375
	height: 812
	image: "images/content.png"


# Dynamic Views

sitesView = new Layer
	parent: screen
	width: 375
	height: 430
	image: "images/sites.png"

sitesView.states =
	"start": { y: -267 }
	"sites": { y: 142 }
	"feed": { y: -267 - (856-304)}

sitesView.stateSwitch("start")




weatherViewBackground = new Layer
	parent: screen
	width: 375
	height: 56
	backgroundColor: "white"

weatherViewBackground.states =
	"start": { y: 117, opacity: 1 }
	"sites": { y: 117 + (267 + 142), opacity: 0 }
	"feed": { y: 117 - (856-304), opacity: 0 }

weatherViewBackground.stateSwitch("start")


weatherView = new Layer
	parent: screen
	width: 375
	height: 56
	image: "images/weatherView.png"

weatherView.states =
	"start": { y: 117, opacity: 1 }
	"sites": { y: 117 + (267 + 142), opacity: 0 }
	"feed": { y: 117 - (856-304), opacity: 0 }

weatherView.stateSwitch("start")





# System

headerView = new Layer
	parent: screen
	width: 375
	height: 106
	y: Align.top
	image: "images/header.png"

bottomBar = new Layer
	parent: screen
	width: 375
	height: 80
	y: Align.bottom
	image: "images/bottom bar.png"

breaker = new Layer
	parent: headerView
	width: 375 - 20 * 2
	height: 0.5
	x: Align.center
	y: Align.bottom

breaker.states =
	"start": { opacity: 1 }
	"sites": { opacity: 0 }
	"feed": { opacity: 1 }
	






# ScrollView Animate Transition
toFeedGap = [304, 856] #[0, 1]
# toFeedGapFast = [640, 640 + 60] #[0, 0.3]
# toFeedGapSlow = [640 + 160, 916] #[0, 0.3]
# toFeedGapMedium = [640, 640 + 100] #[0, 0.6]

toSiteGap = [0, 304] #[0, 1]
toSiteGapFast = [304 - 100, 304] #[0.88, 1]
toSiteGapLate = [0, 304-100] #[0.88, 1]

isSwipeToFeed = (localValue) -> return localValue >= toFeedGap[0] and localValue <= toFeedGap[1]
isSwipeToSite = (localValue) -> return localValue >= toSiteGap[0] and localValue <= toSiteGap[1]

scrollView.content.on "change:y", ->
	v = scrollView.scrollY
	# print v


	# return
	if isSwipeToFeed(v)
		[s1, s2] = ["start", "feed"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[sitesView, "y", toFeedGap],
									[weatherViewBackground, "y", toFeedGap],
									[weatherView, "y", toFeedGap],
									[breaker, "opacity", toFeedGap],
									

			
		]

	else
		[s1, s2] = ["sites", "start"]
		l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
			true) for [l, d, g] in [[sitesView, "y", toSiteGap],
									[weatherViewBackground, "y", toSiteGap],
									[weatherViewBackground, "opacity", toSiteGapLate],
									[weatherView, "y", toSiteGap],
									[weatherView, "opacity", toSiteGapFast],
									[breaker, "opacity", toSiteGap],
									# [omnibox, "y", toSiteGap],
									# [logo, "opacity", toSiteGapFast],
									# [tabs, "opacity", toSiteGapFast],
		]


# screen.scale = 1.7
