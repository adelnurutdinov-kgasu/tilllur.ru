{Input} = require 'input'

retina = 1


screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


thresholdValue = 16*retina

broSearchPlace = (272+48+24-5)*retina
broHiddenPlace = (520+48-24 + 24)*retina
broOpenedPlace = 48*retina

# Browser Curves
fastInSlowOut = [0.4, 0, 0.2, 1]
fastInRealSlowOut = [0.4, 0, 0, 1]
linearInSlowOut = [0, 0, 0.2, 1]
fastInLinearOut = [0.4, 0, 1, 1]

loadSiteTime = 0.6

outScreenOptions = 
	curve: "bezier-curve"
	curveOptions: fastInLinearOut
	time: 0.195

inScreenOptions = 
	curve: "bezier-curve"
	curveOptions: fastInSlowOut
	time: 0.225

outOptions = 
	curve: "bezier-curve"
	curveOptions: fastInRealSlowOut
	time: 0.195

inOptions = 
	curve: "bezier-curve"
	curveOptions: linearInSlowOut
	time: 0.225



barOptions =
	curve: Spring(damping: 1)
	time: 0.4

omnibarArray = []


# Homepage

wallpaper = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: -24*retina
	image: "images/wallpaper.png"




site_view = new ScrollComponent
	width: 360*retina
	height: 640*retina - 72*retina
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	directionLockThreshold:
		x: thresholdValue
		y: thresholdValue
	contentInset: 
		bottom: (32+16)*retina


site_view.on Events.ScrollStart, ->
	bar_bg.animate("hidden", options: barOptions)
	loginInput.input.blur()

site_view.on Events.Tap, ->
# 	print "Homepage clicked"
	bar_bg.animate("hidden", options: barOptions)
	loginInput.input.blur()

# temp = 0
site_view.content.on Events.DragEnd, ->
# 	print site_view.scrollY
	if site_view.scrollY > 840*retina or site_view.scrollY < -56*retina
# 		print "inside " + temp++ 
		if bar_bg.states.current.name is "hidden"
			bar_bg.animate("search")
# 			print "here " + temp++ 


homepage = new Layer
	width: 328*retina
	height: 1472*retina
	x: 16*retina
	y: 52*retina
	image: "images/homepage.png"










homepage.parent = site_view.content



# Browser Layer : Draggable

bar_bg = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: broSearchPlace
	image: "images/bar bg.png"

bar_bg.draggable.enabled = true
bar_bg.draggable.speedX = 0
bar_bg.draggable.momentum = false
bar_bg.draggable.overdragScale = 0.3

bar_bg.draggable.directionLock = true

bar_bg.draggable.directionLockThreshold =
	x: thresholdValue
	y: thresholdValue

bar_bg.draggable.constraints =
	y: 24*retina
	x: 0
	width: 360*retina
	height: 640*retina + broHiddenPlace - broOpenedPlace + 32*retina

# print (640*retina + broHiddenPlace - broOpenedPlace + 128*retina)/retina 

bar_bg.states =
	"hidden": { y: broHiddenPlace } # 520
	"opened": { y: broOpenedPlace } # 48
	"search": { y: broSearchPlace } # 272
bar_bg.stateSwitch("search")

bar_bg.animationOptions = barOptions

# bar_bg.on Events.Tap, (event, layer) ->
# 	print "" + layer.states.current.name
# 	bar_bg.stateSwitch("search")
# 	event.stopPropagation()

# Browser Layer : Logic

barViewDragEndHandler = (event, layer) ->
# 	try
# 		contentview.scrollToPoint(
# 			x: 0, y: 0
# 			false
# 		)
# 	
# 	print bar_bg.y
	if bar_bg.y < broOpenedPlace
		bar_bg.animate("opened", options: barOptions)
	if bar_bg.y > broOpenedPlace and bar_bg.y < broSearchPlace and bar_bg.draggable.direction == "down"
		bar_bg.animate("search", options: barOptions)
	else if bar_bg.y < broSearchPlace and bar_bg.draggable.direction == "up"
		bar_bg.animate("opened", options: barOptions)
	else if bar_bg.y > broSearchPlace and bar_bg.y < broHiddenPlace and bar_bg.draggable.direction == "down"
		bar_bg.animate("hidden")
	else if bar_bg.y > broSearchPlace and bar_bg.y < broHiddenPlace and bar_bg.draggable.direction == "up"
		bar_bg.animate("search", options: barOptions)
	else if bar_bg.y < broHiddenPlace
		bar_bg.animate("hidden", options: barOptions)
	else
# 		print bar_bg
		bar_bg.animate("hidden", options: barOptions)




bar_bg.on(Events.DragEnd, barViewDragEndHandler)

bar_bg.on Events.StateSwitchStart, (fromState, toState) ->
	if toState is "search"
	else loginInput.input.blur()
# 	print fromState + " " + toState + " START"
# 	try
# 		contentview.scrollToPoint(
# 			x: 0, y: 0
# 			false
# 		)
	contentview.scrollY = 0
	
	if toState is "search"
		contentview.propagateEvents = true
		contentview.scrollVertical = false
		
# 	else if toState is "opened"
# # 		changeOmnibarHome()
# 		contentview.scrollVertical = true
# 		contentview.propagateEvents = false
# 	else if toState is "hidden"
# # 		changeOmnibarBottom()
# 		contentview.scrollVertical = false
# 		contentview.propagateEvents = true
# 	else
# # 		changeOmnibarHome()
# 		contentview.scrollVertical = false
# 		contentview.propagateEvents = true
		

bar_bg.on Events.StateSwitchEnd, (fromState, toState) ->
# 	print fromState + " " + toState + " END"
	
	if toState is "opened"
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

# Brower Layer : Content

contentview = new ScrollComponent
	parent: bar_bg
	width: 360*retina
	height: (500-24)*retina
	backgroundColor: "transparent"

contentview.scrollHorizontal = false
contentview.scrollVertical = false
contentview.directionLock = true

contentview.directionLockThreshold =
	x: thresholdValue
	y: thresholdValue

contentview.contentInset =
	bottom: 48*retina

contentview.states =
	"base":
		y: 72*retina
	"zen":
		y: 54*retina
contentview.stateSwitch("base")

# contentview.content.on "change:y", ->
# 	if contentview.scrollY < 0
# 		bar_bg.animate("search")

contentview.on Events.ScrollStart, (event, layer) ->
# 	print "started"
# 	print contentview.scrollY
	Utils.delay 0.03, ->
		if contentview.scrollY < 0
			contentview.scrollVertical = false
			contentview.ignoreEvents = true
			bar_bg.animate("search")

# temp = 0
# contentview.on Events.Scroll, (event, layer) ->
# # 	print temp++ 
# 	print contentview.scrollY
# 	
# 	if contentview.scrollY < 0
# 		contentview.scrollY = 0
# 		contentview.propagateEvents = true
# 	else
# 		contentview.scrollY = true
# 		contentview.propagateEvents = false









zen_view = new Layer
	width: 330*retina
	height: 1124*retina
	x: 15*retina
	y: 137*retina
	image: "images/zen view.png"



zen_title = new Layer
	width: 140*retina
	height: 14*retina
	x: 23*retina
	y: 110*retina
	image: "images/zen title.png"
	opacity: 0.6

zen_view.parent = contentview.content
zen_title.parent = contentview.content



omnibox = new Layer
	width: 360*retina
	height: 72*retina
# 	x: 2*retina
# 	y: 3*retina
	image: "images/omnibox.png"

close = new Layer
	width: 44*retina
	height: 46*retina
	x: 291*retina
	y: 12*retina
	image: "images/close.png"

close.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

close.stateSwitch("hidden")


close.on Events.Tap, ->
	try
		close.stateSwitch("hidden")
		loginInput.value = ""


close.parent = omnibox

# omnibox.on Events.Tap, (event, layer) ->
# 	print layer
# 	bar_bg.animate("search", curve: Spring(damping: 1.2, velocity: 40), time: 0.1)
# 	event.stopPropagation()


omnibarArray = [omnibox]
# 
for item in omnibarArray
	item.parent = bar_bg



# 
# topGap = [24*retina, 288*retina]
# bottomGap = [288*retina, 528*retina]
# 
# 
# bar_bg.on "change:y", ->
# 	value = bar_bg.y
# 	
# 	if bar_bg.y > topGap[0] and bar_bg.y < topGap[1]
# 		contentview.y = Utils.modulate(value, topGap, [contentview.states.zen.y, contentview.states.base.y])
# 		for item in omnibarArray
# 			try
# 				item.shadowY = Utils.modulate(value, topGap, [item.states.zen.shadowY, item.states.base.shadowY])
# 			try
# 				item.shadowBlur = Utils.modulate(value, topGap, [item.states.zen.shadowBlur, item.states.base.shadowBlur])
# 			try
# 				item.x = Utils.modulate(value, topGap, [item.states.zen.x, item.states.base.x])
# 			try
# 				item.y = Utils.modulate(value, topGap, [item.states.zen.y, item.states.base.y])
# 			try
# 				item.width = Utils.modulate(value, topGap, [item.states.zen.width, item.states.base.width])
# 			try
# 				item.height = Utils.modulate(value, topGap, [item.states.zen.height, item.states.base.height])
# 			try
# 				item.opacity = Utils.modulate(value, topGap, [item.states.zen.opacity, item.states.base.opacity])
# 
# 	if bar_bg.y > bottomGap[0] and bar_bg.y < bottomGap[1]
# 		contentview.y = Utils.modulate(value, bottomGap, [contentview.states.base.y, contentview.states.zen.y])
# 		for item in omnibarArray
# 			try
# 				item.shadowY = Utils.modulate(value, bottomGap, [item.states.base.shadowY, item.states.bottom.shadowY])
# 			try
# 				item.shadowBlur = Utils.modulate(value, bottomGap, [item.states.base.shadowBlur, item.states.bottom.shadowBlur])
# 			try
# 				item.x = Utils.modulate(value, bottomGap, [item.states.base.x, item.states.bottom.x])
# 			try
# 				item.y = Utils.modulate(value, bottomGap, [item.states.base.y, item.states.bottom.y])
# 			try
# 				item.width = Utils.modulate(value, bottomGap, [item.states.base.width, item.states.bottom.width])
# 			try
# 				item.height = Utils.modulate(value, bottomGap, [item.states.base.height, item.states.bottom.height])
# 			try
# 				item.opacity = Utils.modulate(value, bottomGap, [item.states.base.opacity, item.states.bottom.opacity])
# 		




# Sites

sitesView = new ScrollComponent
	parent: contentview.content
	width: 360*retina
	height: 106*retina
	contentInset: 
		right: 16*retina

sitesView.scrollHorizontal = true
sitesView.scrollVertical = false
sitesView.directionLock = true

sitesView.directionLockThreshold =
	x: thresholdValue
	y: thresholdValue

sitesView.on Events.ScrollStart, (event, layer) ->
# 	print "drag started " + event.direction
	bar_bg.draggable.enabled = false

sitesView.on Events.ScrollEnd, ->
# 	print "drag ended"
	bar_bg.draggable.enabled = true






sites = new Layer
	width: 888*retina
	height: 72*retina
	x: 16*retina
	y: 8*retina
	image: "images/sites.png"



sites.parent = sitesView.content




loginInput = new Input
	width: 220*retina
	height: 26*retina
	x: 16*retina
	y: 12*retina
	backgroundColor: "#FAFAFA"
	placeholderColor: "rgba(0,0,0,0.3)"
	placeholder: ""
	type: "email"

loginInput.parent = omnibox
loginInput.propagateEvents = false

loginInput.style = 
	fontSize: "13px"
	lineHeight: "28px"
	color: "#000"

loginInput.onFocus ->
	bar_bg.animate("search", options: barOptions)
	loginInput.stateSwitch("shown")

loginInput.onBlur ->
	loginInput.stateSwitch("hidden")


loginInput.form.addEventListener "input", ->
	if loginInput.value.length > 0
		close.stateSwitch("shown")

loginInput.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

loginInput.stateSwitch("hidden")


for item in [wallpaper, site_view, bar_bg]
	item.parent = screen