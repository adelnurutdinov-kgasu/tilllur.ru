
retina = 1

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


# General Slides
welcome_logged = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/welcome logged.png"

configure_browser = new Layer
	parent: welcome_logged
	width: 280*retina
	height: 40*retina
	x: 40*retina
	y: 464*retina
	image: "images/configure browser.png"

welcome_base = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/welcome base.png"

skip_login_button = new Layer
	parent: welcome_base
	width: 280*retina
	height: 40*retina
	x: 40*retina
	y: 464*retina
	image: "images/skip login button.png"

bg_slide = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(242,242,242,1)"

bookmarks_slide = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/bookmarks slide.png"

bookmarks_browser_bg = new Layer
	parent: bookmarks_slide
	width: 200*retina
	height: 356*retina
	x: 148*retina
	y: 214*retina

bookmarks_seach_view = new Layer
	parent: bookmarks_slide
	width: 187*retina
	height: 63*retina
	x: 156*retina
	y: 238*retina
	image: "images/bookmarks seach view.png"



bookmarks_button = new Layer
	parent: bookmarks_slide
	width: 360*retina
	height: 113*retina
	x: 0*retina
	y: 479*retina
	image: "images/bookmarks button.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

zen_slide = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(242,242,242,1)"

zen_scroll = new ScrollComponent
	parent: zen_slide
	width: 360*retina
	height: 510*retina
	y: 70*retina
	backgroundColor: "rgba(241,241,241,1)"
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false

zen_line = new Layer
	parent: zen_scroll.content
	width: 360*retina
	height: 1610*retina
	x: 0*retina
	y: 0*retina
	image: "images/zen line.png"

zen_configure = new Layer
	parent: zen_slide
	width: 360*retina
	height: 113*retina
	x: 0*retina
	y: 479*retina
	image: "images/zen configure.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

skip_zen_step = new Layer
	parent: zen_configure
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 61*retina
	image: "images/skip zen step.png"


zen_done_slide = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/zen done slide.png"


zen_bg = new Layer
	parent: zen_done_slide
	width: 320*retina
	height: 569*retina
	x: 20*retina
	y: 210*retina
	image: "images/background 1.png"

zen_cards = new Layer
	parent: zen_done_slide
	width: 306*retina
	height: 306*retina
	x: 27*retina
	y: 273*retina
	image: "images/zen cards.png"


zen_continue_step = new Layer
	parent: zen_done_slide
	width: 360*retina
	height: 64*retina
	x: 0*retina
	y: 528*retina
	image: "images/zen continue step.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}


final_slide = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/final slide.png"

button_final_slide = new Layer
	parent: final_slide
	width: 360*retina
	height: 64*retina
	x: 0*retina
	y: 528*retina
	image: "images/button final slide.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}


browser_screen = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/background 1.png"

browser = new Layer
	parent: browser_screen 
	width: 360*retina
	height: 640*retina
	image: "images/browser screen.png"


# BG

background_sites = new Layer
	parent: bg_slide
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 80*retina
	originY: 1
	image: "images/background 6.png"
	clip: true

background_sites.states =
	"base": { scale: 1 }
	"preview": { scale: 0.8 }

background_sites.stateSwitch("preview")

seach_view = new Layer
	parent: bg_slide
	width: 297*retina
	height: 100*retina
	x: 34*retina
	y: 292*retina
	scale: 0.8
	image: "images/seach view.png"



# asd

background_bottom_view = new Layer
	width: 360*retina
	height: 176*retina
	parent: bg_slide
	backgroundColor: "rgba(255,255,255,1)"

background_bottom_view.states =
	"shown": { y: screen.height - 48*retina - background_bottom_view.height }
	"hidden": { y: screen.height }

background_bottom_view.stateSwitch("shown")



bg_text = new Layer
	parent: bg_slide
	width: 274*retina
	height: 98*retina
	x: 44*retina
	y: 77*retina
	image: "images/bg text.png"



next_step_button = new Layer
	parent: bg_slide
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 540*retina

next_step_button.states = 
	"save": { image: "images/next step save.png" }
	"skip": { image: "images/next step button.png" }
next_step_button.stateSwitch("skip")

backgroundToChooseNumber = 6
backgroundToChooseWidth = 100*retina
backgroundToChooseHeight = 100*retina
backgroundToChooseOffset = 12*retina
isBackgroundChanged = false

checkBackgroundCounter = () ->
	if isBackgroundChanged
		# TODO
		next_step_button.stateSwitch("save")
	else
		# TODO
		next_step_button.stateSwitch("skip")

background_to_choose_view = new ScrollComponent
	parent: background_bottom_view
	width: 360*retina
	height: backgroundToChooseHeight
# 	x: 0*retina
	y: backgroundToChooseOffset
	backgroundColor: "rgba(255,255,255,1)"
	scrollVertical: false
	propagateEvents: false
	contentInset: 
		right: backgroundToChooseOffset

for itemIndex in [0...backgroundToChooseNumber]
	background_to_choose = new Layer
		parent: background_to_choose_view.content
		width: backgroundToChooseWidth
		height: backgroundToChooseHeight
		x: backgroundToChooseWidth * itemIndex + backgroundToChooseOffset
		name: "background to choose #{backgroundToChooseNumber - itemIndex}"
		image: "images/background #{backgroundToChooseNumber - itemIndex}.png"
# 		backgroundColor: Utils.randomColor()
	
	background_to_choose_selected = new Layer
		parent: background_to_choose
		width: backgroundToChooseWidth
		height: backgroundToChooseHeight
		image: "images/background to choose selected.png"
	
	background_to_choose_selected.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	background_to_choose_selected.stateSwitch("hidden")
	if itemIndex is 0 then background_to_choose_selected.stateSwitch("shown")
	
	background_to_choose.on Events.Click, (event, layer) ->
		isBackgroundChanged = true
		selectedLayer = layer.children[0]
		background_sites.image = layer.image
		browser_screen.image = layer.image
		bookmarks_browser_bg.image = layer.image
		zen_bg.image = layer.image
		checkBackgroundCounter()
		
		for item in background_bottom_view.children[0].content.children
			item.children[0].stateSwitch("hidden")
		
		if selectedLayer.states.current.name is "hidden"
			selectedLayer.stateSwitch("shown")
		else
			selectedLayer.stateSwitch("hidden")





nextSlideArray = [configure_browser, final_slide, bookmarks_button, skip_login_button, skip_zen_step, zen_continue_step, next_step_button]

loggedArray = [welcome_logged, bg_slide, bookmarks_slide, zen_done_slide, final_slide, browser_screen]
baseArray = [welcome_base, bg_slide, bookmarks_slide, zen_slide, final_slide, browser_screen]

if window.location.hash.includes "login" then selectedArray = loggedArray
else selectedArray = baseArray

# selectedArray = loggedArray

slidesView = new PageComponent
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(216,216,216,1)"
	scrollHorizontal: false
	scrollVertical: false
	

for item, i in selectedArray
	item.parent = slidesView.content
	item.x = 360*retina * i

slidesView.updateContent()
slidesView.on "change:currentPage", ->
	currentPageIndex = slidesView.currentPage.x / 360 / retina
	
	if currentPageIndex >= 1 and currentPageIndex <= 4
		all_steps.stateSwitch("shown")
		current_step.stateSwitch("step #{currentPageIndex}")
	else
		all_steps.stateSwitch("hidden")





all_steps = new Layer
	width: 56*retina
	height: 8*retina
	x: 152*retina
	y: 42*retina
	image: "images/all steps.png"

all_steps.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
all_steps.stateSwitch("hidden")

current_step = new Layer
	parent: all_steps
	width: 8*retina
	height: 8*retina
# 	y: 42*retina
	borderRadius: "100%"
	backgroundColor: "rgba(102,102,102,1)"

current_step.states =
	"step 1": { x: 152*retina - 152*retina }
	"step 2": { x: 168*retina - 152*retina }
	"step 3": { x: 184*retina - 152*retina }
	"step 4": { x: 200*retina - 152*retina }
current_step.stateSwitch("step 1")


nextSlideHandler = () ->
	slidesView.snapToNextPage()

for item in nextSlideArray
	item.on(Events.Click, nextSlideHandler)



navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

status_bar = new Layer
	width: 360*retina
	height: 24*retina
	x: 0*retina
	y: 0*retina
	image: "images/status bar.png"

status_bar.opacity = 0

for item in [welcome_logged, zen_done_slide, slidesView, all_steps, navbar, status_bar]
	item.parent = screen


statusBar = new Layer
	parent: browser_screen, width: screen.width, height: 32, backgroundColor: "black"