
retina = 1

Framer.Defaults.Animation =
	curve: Spring(damping: 0.9)
	time: 0.4

screen = new Layer
	width: 360, height: 640 - 40

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
	width: 360*retina
	height: 608*retina
	x: 0*retina
	y: 0*retina
	image: "images/wallpaper.png"


# MAIN CONTENT

omnibox = new Layer
	width: 334*retina
	height: 44*retina
	x: 15*retina
	image: "images/omnibox.png"

omnibox.states =
	"general_page":
		y: 284*retina
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
		y: -171*retina
	"zen_page":
		y: -555*retina

sites.stateSwitch("general_page")

buttons = new Layer
	width: 61*retina
	height: 24*retina
	x: 269*retina
	y: 464*retina
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
		y: 352*retina
		opacity: 1
	"zen_page":
		y: 332*retina
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
		y: 209*retina
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
	"general_page": { y: 480*retina }
	"zen_page": { y: -24*retina }
zen_view.stateSwitch("general_page")

# zen_view.pa
zen_view.scrollVertical = false
zen_view.scrollHorizontal = false
# zen_view.directionLock = true
# zen_view.directionLockThreshold =
# 	x: 8*retina
# 	y: 32*retina
zen_view.contentInset =
	bottom: 72*retina


zen_view.content.onDragStart ->
	# print "scrolling"
# 	_.invokeMap(zen_view.content.children, -> @.draggable = false)
	informers_view.content.draggable = false
	
zen_view.content.onDragEnd ->
# 	_.invokeMap(zen_view.content.children, -> @.draggable = true)
	informers_view.content.draggable = true

closeZen = new Layer
	parent: zen_view
# 	y: 40*retina
	width: 360*retina
	backgroundColor: "transparent"

# ZEN CONTENT

image = new Layer
	width: 330*retina
	height: 140*retina
	x: 15*retina
	image: "images/image.png"

image.states =
	"general_page":
		y: 23*retina
	"zen_page":
		y: 84*retina

image.stateSwitch("general_page")

card_logo_imaged = new Layer
	width: 68*retina
	height: 10*retina
	x: 30*retina
	image: "images/card logo imaged.png"

card_logo_imaged.states =
	"general_page":
		y: 38*retina
	"zen_page":
		y: 99*retina

card_logo_imaged.stateSwitch("general_page")

image_whiter = new Layer
	width: 330*retina
	height: 140*retina
	x: 15*retina
	backgroundColor: "rgba(255,255,255,1)"

image_whiter.states =
	"general_page":
		y: 23*retina
		opacity: 1
	"zen_page":
		y: 84*retina
		opacity: 0

image_whiter.stateSwitch("general_page")

card_logo_base = new Layer
	width: 68*retina
	height: 10*retina
	x: 30*retina
	image: "images/card logo base.png"

card_logo_base.states =
	"general_page":
		y: 38*retina
		opacity: 1
	"zen_page":
		y: 99*retina
		opacity: 0

card_logo_base.stateSwitch("general_page")

card_text = new Layer
	width: 330*retina
	height: 170*retina
	x: 15*retina
	image: "images/card text.png"

card_text.states =
	"general_page":
		y: 55*retina
	"zen_page":
		y: 224*retina

card_text.stateSwitch("general_page")

card_2 = new Layer
	width: 330*retina
	height: 1200*retina
	x: 15*retina
	image: "images/card 2.png"

card_2.states =
	"general_page":
		y: 829*retina
	"zen_page":
		y: 410*retina

card_2.stateSwitch("general_page")





zen_logo = new Layer
	width: 120*retina
	height: 28*retina
	x: 120*retina
	image: "images/zen logo.png"

zen_logo.states =
	"general_page":
		y: -21*retina
		opacity: 0
	"zen_page":
		y: 40*retina
		opacity: 1

zen_logo.stateSwitch("general_page")



# Cards

informers_view = new ScrollComponent
	width: 360*retina
	height: (360+32)*retina
	x: 0*retina
	y: 798*retina
# 	backgroundColor: "red"

informers_view.parent = zen_view.content
informers_view.scrollVertical = false
informers_view.speedX = 0.7
# informers_view.directionLock = true
# informers_view.propagateEvents = false

# informers_view.directionLockThreshold =
# 	x: 16*retina
# 	y: 0

informers_view.contentInset =
	left: 15*retina
	right: 15*retina
	top: 32*retina

# informers_view.on Events.Move, (event, layer) ->
# 	if layer.draggable.direction is "left" or layer.draggable.direction is "right"
# 		event.stopPropagation

plate = new Layer
	width: 1148*retina
	height: 364*retina
	x: -2*retina
	y: -1*retina
	image: "images/plate.png"

plate.parent = informers_view.content

informers_view.onScrollStart ->
	zen_view.content.draggable = false
# 	print "DragStaer #{tempFlag++}"

informers_view.onScrollEnd ->
	zen_view.content.draggable = true
# 	print "Edn #{tempFlag}"

zen_view.updateContent()

# 
# card_1 = new Layer
# 	width: 284*retina
# 	height: 364*retina
# 	x: -2*retina
# 	y: -1*retina
# 	image: "images/card 1.png"
# 
# card_2 = new Layer
# 	width: 284*retina
# 	height: 364*retina
# 	x: 286*retina
# 	y: -1*retina
# 	image: "images/card 2.png"
# 
# card_3 = new Layer
# 	width: 284*retina
# 	height: 364*retina
# 	x: 574*retina
# 	y: -1*retina
# 	image: "images/card 3.png"
# 
# cards = [card_1, card_2, card_3]
# for item in cards
# 	item.parent = informers_view.content

# navigationbar = new Layer
# 	width: 361*retina
# 	height: 50*retina
# 	x: 0*retina
# 	y: 591*retina
# 	image: "images/navigationbar.png"
# 
# status_bar = new Layer
# 	width: 360*retina
# 	height: 24*retina
# 	x: 0*retina
# 	y: 0*retina
# 	image: "images/status bar.png"


# educational_array = [darker, info_text]
new_tab_array = [buttons, omnibox, sites, yandex_logo, micro]
zen_tab_array = [image, card_logo_imaged, image_whiter, card_logo_base, card_text, card_2, zen_logo]

# for item in educational_array
# 	try item.stateSwitch("general_page")

for item in new_tab_array
	try item.stateSwitch("general_page")

for item in zen_tab_array
	try item.stateSwitch("general_page")
	item.parent = zen_view.content

for item in [image, card_logo_imaged, image_whiter, card_logo_base, card_text]
	item.bringToFront()
# navigationbar.bringToFront()

# info_text.on Events.Click, (event, layer) ->
# 	image_whiter.animate("zen_page", curve: "ease-in-out", time: 0.8)


zen_view.draggable.enabled = true
zen_view.draggable.speedX = 0
zen_view.draggable.speedY = 0.8
zen_view.draggable.overdrag = false
zen_view.draggable.overdragScale = 0
zen_view.draggable.momentum = false

# image_whiter.draggable.bounce = false
zen_view.draggable.constraints =
	x: zen_view.x
	y: zen_view.states.zen_page.y
	width: zen_view.width
	height:  zen_view.states.general_page.y - zen_view.states.zen_page.y + zen_view.height

# boundsLayer = new Layer
# 	x: image_whiter.x
# 	y: image_whiter.states.zen_page.y
# 	width: image_whiter.width
# 	height:  image_whiter.states.general_page.y - image_whiter.states.zen_page.y + image_whiter.height
# 	backgroundColor: "red"

# print image_whiter.draggable.constraints

bounds = [zen_view.states.general_page.y, zen_view.states.zen_page.y]
canMore = true


# image_whiter.onSwipeUp ->
# 	image_whiter.animate("zen_page")

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
# 		print "B:" + zen_view.scrollY
		zen_view.draggable.enabled = true
# 		zen_view.ignoreEvents = false

blockScroll = false
scrollBack = Utils.throttle 2, ->
	blockScroll = true
# 	zen_view.ignoreEvents = true
# 	print "A:" + zen_view.scrollY
	
# 	for item in zen_tab_array
# 		if item is card_2 then print "@!@"
# 		item.animate("general_page")
# 	
# 	zen_view.scrollToPoint(
# 		x: 0, y: 0
# 		false
# 		options: transitionOptions
# 	)
	
	Utils.delay 0.02, ->
		zen_view.updateContent()
		zen_view.animate("general_page")
		blockScroll = false
	
	


tempFlag = 0
zen_view.content.on "change:y", ->
	if zen_view.scrollY < -64*retina
# 		print "log #{tempFlag++}"
		if !blockScroll then scrollBack()


zen_view.on "change:y", ->
	value = zen_view.y
	
	image_whiter.opacity = Utils.modulate(value, bounds, [image_whiter.states.general_page.opacity, image_whiter.states.zen_page.opacity])
	image_whiter.y = Utils.modulate(value, bounds, [image_whiter.states.general_page.y, image_whiter.states.zen_page.y])
	
	for item in  [omnibox, sites, image, card_logo_imaged, card_logo_base, card_text, card_2, yandex_logo_container, zen_view]
		try
			item.y = Utils.modulate(value, bounds, [item.states.general_page.y, item.states.zen_page.y], canMore)
		try
			item.opacity = Utils.modulate(value, bounds, [item.states.general_page.opacity, item.states.zen_page.opacity], canMore)
	
	fast_bounds = [bounds[0], bounds[1] + 400*retina]
	for item in [yandex_logo, micro, buttons]
		try
			item.y = Utils.modulate(value, fast_bounds, [item.states.general_page.y, item.states.zen_page.y], canMore)
		try
			item.opacity = Utils.modulate(value, fast_bounds, [item.states.general_page.opacity, item.states.zen_page.opacity], canMore)
	
	late_bounds = [bounds[0] - 250*retina, bounds[1]]
	for item in [zen_logo]
		try
			item.y = Utils.modulate(value, late_bounds, [item.states.general_page.y, item.states.zen_page.y], canMore)
		try
			item.opacity = Utils.modulate(value, late_bounds, [item.states.general_page.opacity, item.states.zen_page.opacity], canMore)



for item in [wallpaper, omnibox, sites, buttons, micro, yandex_logo_container, zen_view]
	item.parent = screen