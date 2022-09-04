retina = 1

Framer.Defaults.Animation =
	curve: Spring(damping: 0.9)
	time: 0.4

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


omnibarArray = []

site_view = new ScrollComponent
	width: 360*retina
	height: 640*retina - 48*retina
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "black"
	contentInset: 
		bottom: 56

homepage = new Layer
	parent: site_view.content
	width: 360*retina
	height: 923*retina
	x: 0*retina
	y: 0*retina
	image: "images/homepage.png"

site_view.on Events.ScrollStart, ->
	bar_bg.animate("hidden")

bar_bg = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 288*retina
	image: "images/bar bg.png"

bar_bg.draggable.enabled = true
bar_bg.draggable.speedX = 0
bar_bg.draggable.momentum = false

bar_bg.draggable.constraints =
	y: 24*retina
	x: 0
	width: 360*retina
	height: (640+288)*retina

bar_bg.states =
	"hidden": { y: 536*retina }
	"opened": { y: 32*retina }
	"search": { y: 288*retina }
bar_bg.stateSwitch("search")

# bar_bg.animationOptions = outOptions
# 	curve: tightSpring


barViewDragEndHandler = (event, layer) ->
# 	print bar_bg.y
	if bar_bg.y < 24*retina
		bar_bg.animate("opened")
	if bar_bg.y > 24*retina and bar_bg.y < 288*retina and bar_bg.draggable.direction == "down"
		bar_bg.animate("search")
	else if bar_bg.y < 288*retina and bar_bg.draggable.direction == "up"
		bar_bg.animate("opened")
	else if bar_bg.y > 288*retina and bar_bg.y < 520*retina and bar_bg.draggable.direction == "down"
		bar_bg.animate("hidden")
	else if bar_bg.y > 288*retina and bar_bg.y < 520*retina and bar_bg.draggable.direction == "up"
		bar_bg.animate("search")
	else if bar_bg.y < 528*retina
		bar_bg.animate("hidden")
	else
# 		print bar_bg
		bar_bg.animate("hidden")


bar_bg.on(Events.DragEnd, barViewDragEndHandler)
bar_bg.on Events.StateSwitchStart, (fromState, toState) ->
# 	print fromState + " -> " + toState
	if toState is "search"
# 		changeOmnibarBase()
		contentview.scrollVertical = false
		contentview.propagateEvents = true
	else if toState is "opened"
# 		changeOmnibarHome()
		contentview.scrollVertical = true
		contentview.propagateEvents = false
	else if toState is "hidden"
# 		changeOmnibarBottom()
		contentview.scrollVertical = false
		contentview.propagateEvents = true
	else
# 		changeOmnibarHome()
		contentview.scrollVertical = false
		contentview.propagateEvents = true


# browser bar

contentview = new ScrollComponent
	parent: bar_bg
	width: 360*retina
	height: 500*retina
	x: 0*retina
	y: 64*retina
	backgroundColor: "transparent"
	scrollVertical: false
	scrollHorizontal: false
# 	propagateEvents: true
	
contentview.states =
	"base":
		y: 64*retina
	"zen":
		y: 54*retina
contentview.stateSwitch("base")


zen_view = new Layer
	parent: contentview.content
	width: 328*retina
	height: 824*retina
	x: 16*retina
	y: 152*retina
	image: "images/zen view.png"



title_1 = new Layer
	parent: contentview.content
	width: 131*retina
	height: 13*retina
	x: 19*retina
	y: 79*retina - 64*retina
	image: "images/title 1.png"
	opacity: 0.5

title_2 = new Layer
	parent: contentview.content
	width: 32*retina
	height: 12*retina
	x: 18*retina
	y: 191*retina - 64*retina
	image: "images/title 2.png"
	opacity: 0.5

sitesView = new ScrollComponent
	parent: contentview.content
	width: 360*retina
	height: 60*retina
	y: 106*retina - 64*retina
	scrollVertical: false
	propagateEvents: false
	contentInset: 
		right: 16*retina

sites = new Layer
	parent: sitesView.content
	width: 424*retina
	height: 60*retina
	x: 16*retina
# 	y: 106*retina - 64*retina
	image: "images/sites.png"


# Funny
breaker = new Layer
	width: 360*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(243,243,243,1)"
	shadowY: 1*retina
	shadowColor: "rgba(0,0,0,0.08)"

breaker.states =
	"base":
		height: 72*retina
		opacity: 0.0
	"zen":
		height: 56*retina
		opacity: 1
	"bottom":
		height: 56*retina
		opacity: 1

breaker.stateSwitch("base")

right_icons = new Layer
	width: 54*retina
	height: 20*retina
	image: "images/right icons.png"

right_icons.states =
	"base":
		x: 357*retina
		y: 27*retina
		opacity: 0
	"zen":
		x: 286*retina
		y: 17*retina
		opacity: 1
	"bottom":
		x: 356*retina
		y: 17*retina
		opacity: 0

right_icons.stateSwitch("base")

home_icon = new Layer
	width: 48*retina
	height: 56*retina
	image: "images/home icon.png"

home_icon.states =
	"base":
		x: -42*retina
		y: 8*retina
	"zen":
		x: 0*retina
		y: 0*retina
	"bottom":
		x: 0*retina
		y: 0*retina

home_icon.stateSwitch("base")

omnibox_bg = new Layer
	height: 44*retina
	backgroundColor: "rgba(255,255,255,1)"
	shadowColor: "rgba(0,0,0,0.16)"

omnibox_bg.states =
	"base":
		width: 318*retina
		x: 16*retina
		y: 16*retina
		shadowY: 16*retina
		shadowBlur: 32*retina
	"zen":
		width: 210*retina
		x: 48*retina
		y: 6*retina
		shadowY: 1*retina
		shadowBlur: 1*retina
	"bottom":
		width: 210*retina
		x: 48*retina
		y: 6*retina
		shadowY: 1*retina
		shadowBlur: 1*retina

omnibox_bg.stateSwitch("base")

omnibox_shape = new Layer
	width: 182*retina
	height: 44*retina
	image: "images/omnibox shape.png"

omnibox_shape.states =
	"base":
		x: 166*retina
		y: 16*retina
	"zen":
		x: 88*retina
		y: 6*retina
	"bottom":
		x: 166*retina
		y: 6*retina

omnibox_shape.stateSwitch("base")

search_yandex = new Layer
	width: 125*retina
	height: 15*retina
	image: "images/search yandex.png"
	opacity: 0.7

search_yandex.states =
	"base":
		x: 29*retina
		y: 32*retina
	"zen":
		x: 63*retina
		y: 22*retina
	"bottom":
		x: 63*retina
		y: 22*retina

search_yandex.stateSwitch("base")

mic_icon = new Layer
	width: 15*retina
	height: 22*retina
	image: "images/mic icon.png"
	opacity: 0.5

mic_icon.states =
	"base":
		x: 311*retina
		y: 27*retina
	"zen":
		x: 238*retina
		y: 17*retina
	"bottom":
		x: 311*retina
		y: 17*retina

mic_icon.stateSwitch("base")



home_icon.propagateEvents = false
home_icon.on Events.Click, ->
# 	print "clicked?"
# 	print bar_bg.states.current.name
# 	if bar_bg.states.current.name is "hidden"
# 		changeOmnibarBase()
	bar_bg.animate("search")
	contentview.scrollToTop()



omnibarArray = [breaker, omnibox_bg, omnibox_shape, search_yandex, mic_icon, home_icon, right_icons]

for item in omnibarArray
	item.parent = bar_bg

# for item in omnibarArray
# 	try 
# 		item.animate("zen", time: 1)


# changeOmnibarHome = () ->
# 	contentview.animate("zen", options: inOptions)
# 	for item in omnibarArray
# 		try 
# 			item.animate("zen", options: inOptions)
# 
# changeOmnibarBase = () ->
# 	contentview.animate("base", options: inOptions)
# 	for item in omnibarArray
# 		try 
# 			item.animate("base",  options: inOptions)
# 
# changeOmnibarBottom = () ->
# 	contentview.animate("zen", options: inOptions)
# 	for item in omnibarArray
# 		try 
# 			item.animate("bottom",  options: inOptions)

topGap = [24*retina, 288*retina]
bottomGap = [288*retina, 528*retina]
# gaps = [topGap, bottomGap]

bar_bg.on "change:y", ->
	value = bar_bg.y
# 	print home_icon.states.base
	if bar_bg.y > topGap[0] and bar_bg.y < topGap[1]
		contentview.y = Utils.modulate(value, topGap, [contentview.states.zen.y, contentview.states.base.y])
		for item in omnibarArray
			try
				item.shadowY = Utils.modulate(value, topGap, [item.states.zen.shadowY, item.states.base.shadowY])
			try
				item.shadowBlur = Utils.modulate(value, topGap, [item.states.zen.shadowBlur, item.states.base.shadowBlur])
			try
				item.x = Utils.modulate(value, topGap, [item.states.zen.x, item.states.base.x])
			try
				item.y = Utils.modulate(value, topGap, [item.states.zen.y, item.states.base.y])
			try
				item.width = Utils.modulate(value, topGap, [item.states.zen.width, item.states.base.width])
			try
				item.height = Utils.modulate(value, topGap, [item.states.zen.height, item.states.base.height])
			try
				item.opacity = Utils.modulate(value, topGap, [item.states.zen.opacity, item.states.base.opacity])

	if bar_bg.y > bottomGap[0] and bar_bg.y < bottomGap[1]
		contentview.y = Utils.modulate(value, bottomGap, [contentview.states.base.y, contentview.states.zen.y])
		for item in omnibarArray
			try
				item.shadowY = Utils.modulate(value, bottomGap, [item.states.base.shadowY, item.states.bottom.shadowY])
			try
				item.shadowBlur = Utils.modulate(value, bottomGap, [item.states.base.shadowBlur, item.states.bottom.shadowBlur])
			try
				item.x = Utils.modulate(value, bottomGap, [item.states.base.x, item.states.bottom.x])
			try
				item.y = Utils.modulate(value, bottomGap, [item.states.base.y, item.states.bottom.y])
			try
				item.width = Utils.modulate(value, bottomGap, [item.states.base.width, item.states.bottom.width])
			try
				item.height = Utils.modulate(value, bottomGap, [item.states.base.height, item.states.bottom.height])
			try
				item.opacity = Utils.modulate(value, bottomGap, [item.states.base.opacity, item.states.bottom.opacity])
		


status_bar = new Layer
	width: 360*retina
	height: 32*retina
	backgroundColor: null

nav_bar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/nav bar.png"


for item in [site_view, bar_bg, status_bar, nav_bar]
	item.parent = screen
