Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

retina = 1

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

timeValue = 1.4
flag = 0

# Browser Curves
# fastInSlowOut = [0.4, 0, 0.2, 1]
# fastInRealSlowOut = [0.4, 0, 0, 1]
# linearInSlowOut = [0, 0, 0.2, 1]
# fastInLinearOut = [0.4, 0, 1, 1]
# 
# loadSiteTime = 0.6

outScreenOptions = 
	curve: "bezier-curve"
	curveOptions: [0.4, 0, 1, 1]
	time: 0.195

inScreenOptions = 
	curve: "bezier-curve"
	curveOptions: [0.4, 0, 0.2, 1]
	time: 0.225

outOptions = 
	curve: "bezier-curve"
	curveOptions: [0.4, 0, 0, 1]
	time: 0.195*3

inOptions = 
	curve: "bezier-curve"
	curveOptions: [0, 0, 0.2, 1]
	time: 0.225

transitionOptions = outOptions
transitionAnimating = false

wallpaper = new Layer
	y: 32
	width: 360*retina
	height: 608*retina
	image: "images/wallpaper.png"


# MAIN CONTENT

omnibox = new Layer
	width: 334*retina
	height: 44*retina
	x: 15*retina
	image: "images/omnibox.png"

omnibox.states =
	"general_page":
		y: 260*retina
	"zen_page":
		y: -80*retina

omnibox.stateSwitch("general_page")

sites = new Layer
	width: 330*retina
	height: 330*retina
	x: 15*retina
	image: "images/sites.png"

sites.states =
	"general_page":
		y: -180*retina
	"zen_page":
		y: -555*retina
	"sites_page":
		y: 30*retina

sites.stateSwitch("general_page")

buttons = new Layer
	width: 61*retina
	height: 24*retina
	x: 269*retina
	y: 440*retina
	image: "images/buttons.png"

buttons.states =
	"general_page":
		opacity: 1
	"zen_page":
		opacity: 0

buttons.stateSwitch("general_page")

micro = new Layer
	width: 213*retina
	height: 80*retina
	x: 74*retina
	image: "images/micro.png"

micro.states =
	"general_page":
		y: 330*retina
		opacity: 1
	"zen_page":
		y: 310*retina
		opacity: 0

micro.stateSwitch("general_page")

# yandex_logo = new Layer
# 	width: 120*retina
# 	x: 120*retina
# 	image: "images/yandex logo.png"
# 
# yandex_logo.states =
# 	"general_page":
# 		height: 49*retina
# 		y: 209*retina
# 	"zen_page":
# 		height: 48*retina
# 		y: -150*retina
# 
# yandex_logo.stateSwitch("general_page")











yandex_logo_container = new Layer
	width: 120*retina
	x: 120*retina
	height: 48*retina
	backgroundColor: "transparent"

yandex_logo_container.states =
	"general_page":
		y: 190*retina
	"zen_page":
		y: -150*retina

yandex_logo_container.stateSwitch("general_page")


yandex_logo = new Layer
	parent: yandex_logo_container
	width: 120*retina
	height: 48*retina
	image: "images/yandex logo.png"

yandex_logo.states =
	"general_page":
		opacity: 1
	"zen_page":
		opacity: 0

yandex_logo.stateSwitch("general_page")







# 
# 
# micro = new Layer
# 	width: 56*retina
# 	height: 56*retina
# 	x: 152*retina
# 	y: 396*retina
# 	image: "images/micro.png"
# 
# micro.states =
# 	"zen_page":
# 		opacity: 0
# 	"general_page":
# 		opacity: 1
# 
# micro.stateSwitch("zen_page")

zen_view = new ScrollComponent
	width: 360*retina
	height: 640*retina
	backgroundColor: "transparent"

zen_view.states =
	"general_page": { y: 456*retina }
	"zen_page": { y: 0*retina }
	"sites_page": { y: 580*retina }
zen_view.stateSwitch("general_page")

zen_view.scrollVertical = false
zen_view.scrollHorizontal = false
zen_view.contentInset =
	bottom: 72*retina


# Feed

closeZen = new Layer
	width: 360*retina
	backgroundColor: "transparent"

feed = new Layer
	width: 360*retina
	height: 1580*retina
	x: 0*retina
	y: 64*retina
	image: "images/feed.png"

closeZen.parent = zen_view
feed.parent = zen_view.content

# Cards

informers_view = new ScrollComponent
	width: 360*retina
	height: (360+32)*retina
	x: 0*retina
	y: 0*retina
# 	backgroundColor: "red"

informers_view.states =
	"zen_page": { y: 64*retina}
	"general_page": { y: 24*retina}
informers_view.stateSwitch("general_page")

# informers_view.on Events.StateSwitchEnd, (fromState, toState) ->
# 	print toState
# 	if toState is "general_page" then informers_view.content.draggable = false
# 	else if toState is "zen_page" then informers_view.content.draggable = true

informers_view.parent = zen_view.content
informers_view.scrollVertical = true
informers_view.scrollHorizontal = true
informers_view.speedX = 0.7
informers_view.speedY = 0
informers_view.content.draggable = false

informers_view.directionLock = true
informers_view.directionLockThreshold =
	x: 1*retina
	y: 1*retina

informers_view.on Events.Scroll, (event, layer) ->
# 	print "####"
# 	print event.direction
	if event != null
		if event.direction is "left" or event.direction is "right"
	# 		print "ok"
		else
	# 		print "stopped" 
			try
				event.stopPropagation()


# Events
# lastSwipeEvent = 0
# 
# informers_view.on Events.SwipeLeft, (event, layer) ->
# 	lastSwipeEvent = event.timeStamp
# # 	print "lse: " + lastSwipeEvent
# 	event.stopPropagation()
# 
# informers_view.on Events.SwipeRight, (event, layer) ->
# 	lastSwipeEvent = event.timeStamp
# # 	print "rse: " + lastSwipeEvent
# 	event.stopPropagation()
# 
# informers_view.on Events.SwipeUp, (event, layer) ->
# # 	print "su: " + event.timeStamp
# 	if event.timeStamp - lastSwipeEvent < 4000
# 		event.stopPropagation()
# 	lastSwipeEvent = event.timeStamp
# 
# informers_view.on Events.SwipeDown, (event, layer) ->
# # 	print "sd: " + event.timeStamp
# 	if event.timeStamp - lastSwipeEvent < 4000
# 		event.stopPropagation()
# 	lastSwipeEvent = event.timeStamp


# informers_view.contentInset =
# 	right: 15*retina

plate = new Layer
	width: 1266*retina
	height: 354*retina
	y: -1*retina
	image: "images/plate.png"

plate.states =
	"general_page":
		x: 45*retina
	"zen_page":
		x: 15*retina

plate.stateSwitch("general_page")



# informers_view.onScrollStart ->
# 	if zen_view.states.current.name is "zen_page" then zen_view.content.draggable = false
# 
# informers_view.onScrollEnd ->
# 	if zen_view.states.current.name is "zen_page" then zen_view.content.draggable = true

# Zen Content

news_card_background = new Layer
	height: 350*retina
	x: 15*retina
	borderRadius: 4*retina
	backgroundColor: "rgba(255,255,255,1)"
	shadowY: 1*retina
	shadowBlur: 2*retina
	shadowColor: "rgba(0,0,0,0.2)"

news_card_background.states =
	"general_page":
		width: 330*retina
# 		y: 24*retina
	"zen_page":
		width: 310*retina
# 		y: 64*retina

news_card_background.stateSwitch("general_page")


news_items = new Layer
	width: 318*retina
	height: 280*retina
	x: 14*retina
	image: "images/news items.png"

news_items.states =
	"general_page":
		y: 53*retina
	"zen_page":
		y: 63*retina

news_items.stateSwitch("general_page")

news_header_bg = new Layer
	width: 330*retina
	x: 2*retina
	y: 1*retina
	backgroundColor: "rgba(255,255,255,1)"
	shadowY: 1*retina
	shadowColor: "rgba(0,0,0,0.1)"

news_header_bg.states =
	"general_page":
		height: 44*retina
	"zen_page":
		height: 54*retina

news_header_bg.stateSwitch("general_page")



news_categories = new ScrollComponent
	width: 330*retina
	height: 54*retina
	y: 3*retina

news_categories.states =
	"general_page":
		opacity: 0
	"zen_page":
		opacity: 1

news_categories.stateSwitch("general_page")

news_title = new Layer
	width: 202*retina
	height: 14*retina
	x: 17*retina
	image: "images/news title.png"

news_title.states =
	"general_page":
		y: 19*retina
		opacity: 1
	"zen_page":
		y: 23*retina
		opacity: 0

news_title.stateSwitch("general_page")



header_plate = new Layer
	width: 533*retina
	height: 54*retina
	x: 0*retina
	y: 0*retina
	image: "images/header plate.png"

news_categories.backgroundColor = "transparent"
news_categories.scrollVertical = false
news_categories.propagateEvents = false
news_categories.contentInset =
	right: 16*retina
header_plate.parent = news_categories.content






# 
# 
# image = new Layer
# 	width: 330*retina
# 	height: 140*retina
# 	x: 15*retina
# 	image: "images/image.png"
# 
# image.states =
# 	"general_page":
# 		y: 23*retina
# 	"zen_page":
# 		y: 84*retina
# 
# image.stateSwitch("general_page")
# 
# card_logo_imaged = new Layer
# 	width: 68*retina
# 	height: 10*retina
# 	x: 30*retina
# 	image: "images/card logo imaged.png"
# 
# card_logo_imaged.states =
# 	"general_page":
# 		y: 38*retina
# 	"zen_page":
# 		y: 99*retina
# 
# card_logo_imaged.stateSwitch("general_page")
# 
# image_whiter = new Layer
# 	width: 330*retina
# 	height: 140*retina
# 	x: 15*retina
# 	backgroundColor: "rgba(255,255,255,1)"
# 
# image_whiter.states =
# 	"general_page":
# 		y: 23*retina
# 		opacity: 1
# 	"zen_page":
# 		y: 84*retina
# 		opacity: 0
# 
# image_whiter.stateSwitch("general_page")
# 
# card_logo_base = new Layer
# 	width: 68*retina
# 	height: 10*retina
# 	x: 30*retina
# 	image: "images/card logo base.png"
# 
# card_logo_base.states =
# 	"general_page":
# 		y: 38*retina
# 		opacity: 1
# 	"zen_page":
# 		y: 99*retina
# 		opacity: 0
# 
# card_logo_base.stateSwitch("general_page")
# 
# card_text = new Layer
# 	width: 330*retina
# 	height: 170*retina
# 	x: 15*retina
# 	image: "images/card text.png"
# 
# card_text.states =
# 	"general_page":
# 		y: 55*retina
# 	"zen_page":
# 		y: 224*retina
# 
# card_text.stateSwitch("general_page")
# 
# card_2 = new Layer
# 	width: 330*retina
# 	height: 1200*retina
# 	x: 15*retina
# 	image: "images/card 2.png"
# 
# card_2.states =
# 	"general_page":
# 		y: 829*retina
# 	"zen_page":
# 		y: 410*retina
# 
# card_2.stateSwitch("general_page")
# 
# 
# 
# 
# 
# zen_logo = new Layer
# 	width: 120*retina
# 	height: 28*retina
# 	x: 120*retina
# 	image: "images/zen logo.png"
# 
# zen_logo.states =
# 	"general_page":
# 		y: -21*retina
# 		opacity: 0
# 	"zen_page":
# 		y: 40*retina
# 		opacity: 1
# 
# zen_logo.stateSwitch("general_page")
# 



zen_view.updateContent()

news_card_background.clip = true

news_card_background.parent = informers_view.content
plate.parent = informers_view.content

news_card_array = [news_items, news_header_bg, news_title, news_categories]
for item in news_card_array
	item.parent = news_card_background

new_tab_array = [buttons, omnibox, sites, yandex_logo, micro]
for item in new_tab_array
	try item.stateSwitch("general_page")


zen_view.draggable.enabled = true
zen_view.draggable.speedX = 0
zen_view.draggable.speedY = 0.8
zen_view.draggable.overdrag = false
zen_view.draggable.overdragScale = 0
zen_view.draggable.momentum = false

zen_view.draggable.constraints =
	x: zen_view.x
	y: zen_view.states.zen_page.y
	width: zen_view.width
	height:  zen_view.states.general_page.y - zen_view.states.zen_page.y + zen_view.height



# sites.draggable.enabled = true
# sites.draggable.speedX = 0
# sites.draggable.speedY = 0.8
# sites.draggable.overdrag = false
# sites.draggable.overdragScale = 0
# sites.draggable.momentum = false
# 
# sites.draggable.constraints =
# 	x: sites.x
# 	y: sites.states.zen_page.y
# 	width: sites.width
# 	height: sites.states.sites_page.y - sites.states.zen_page.y + sites.height



canMore = true


closeZen.on Events.Tap, ->
	zen_view.animate("general_page", options: transitionOptions)


zen_view.on Events.DragEnd, (event, layer) ->
	if layer.draggable.direction is "up" then zen_view.animate("zen_page", options: transitionOptions)
	else if layer.draggable.direction is "down" then zen_view.animate("general_page", options: transitionOptions)


zen_view.on Events.StateSwitchStart, (fromState, toState) ->
	if toState is "general_page"
		zen_view.scrollVertical = false
	

zen_view.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "zen_page"
		zen_view.scrollVertical = true
		zen_view.draggable.enabled = false
		zen_view.updateContent()
	else if toState is "general_page"
		zen_view.draggable.enabled = true
	
	if toState is "general_page" then informers_view.content.draggable = false
	else if toState is "zen_page" then informers_view.content.draggable = true


blockScroll = false
scrollBack = Utils.throttle 2, ->
	blockScroll = true
# 	informers_view.content.draggable = false
	informers_view.ignoreEvents = true
	
	Utils.delay 0.02, ->
		informers_view.updateContent()
		informers_view.scrollToPoint(
			x: 0, y: 0
			true
			options: transitionOptions
		)
		
		zen_view.updateContent()
		zen_view.animate("general_page")
		blockScroll = false


zen_view.content.on "change:y", ->
	if zen_view.scrollY < -64*retina
# 		informers_view.content.draggable = false
		if !blockScroll then scrollBack()


bounds = [zen_view.states.general_page.y, zen_view.states.zen_page.y]
# print bounds

zen_view.on "change:y", ->
	value = zen_view.y
# 	print value
	
# 	image_whiter.opacity = Utils.modulate(value, bounds, [image_whiter.states.general_page.opacity, image_whiter.states.zen_page.opacity])
# 	image_whiter.y = Utils.modulate(value, bounds, [image_whiter.states.general_page.y, image_whiter.states.zen_page.y])
# 	if value >= zen_view.states.general_page.y and value <= zen_view.states.zen_page.y
	plate.x = Utils.modulate(value, bounds, [plate.states.general_page.x, plate.states.zen_page.x])
	news_header_bg.height = Utils.modulate(value, bounds, [news_header_bg.states.general_page.height, news_header_bg.states.zen_page.height])
	
	news_card_background.width = Utils.modulate(value, bounds, [news_card_background.states.general_page.width, news_card_background.states.zen_page.width])
	
	for item in  [omnibox, sites, yandex_logo_container, zen_view, news_card_background, news_items, news_header_bg, news_categories, informers_view]
		try
			item.y = Utils.modulate(value, bounds, [item.states.general_page.y, item.states.zen_page.y], canMore)
		try
			item.opacity = Utils.modulate(value, bounds, [item.states.general_page.opacity, item.states.zen_page.opacity], canMore)
	
	fast_bounds = [bounds[0], bounds[1] + 400*retina]
	
	for item in [yandex_logo, micro, buttons, news_title]
		try
			item.y = Utils.modulate(value, fast_bounds, [item.states.general_page.y, item.states.zen_page.y], canMore)
		try
			item.opacity = Utils.modulate(value, fast_bounds, [item.states.general_page.opacity, item.states.zen_page.opacity], canMore)



for item in [wallpaper, omnibox, sites, buttons, micro, yandex_logo_container, zen_view]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 32, backgroundColor: "black"