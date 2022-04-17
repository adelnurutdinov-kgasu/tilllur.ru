
{SVGLayer} = require 'SVGLayer'
retina = 1
globalColor = "rgba(34,34,34,1)"


Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


# Curves
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

# Welcome Logged
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

# Welcome Base
welcome_base = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/welcome base.png"

start_configuration_button = new Layer
	parent: welcome_base
	width: 1120
	height: 160
	x: 160
	y: 1648
	image: "images/start configuration button.png"

skip_login_button = new Layer
	parent: welcome_base
	width: 280*retina
	height: 40*retina
	x: 40*retina
	y: 464*retina
	image: "images/skip login button.png"

# Welcome Base Type
login_type_slide = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/login type slide.png"
	
skip_type = new Layer
	parent: login_type_slide
	width: 280*retina
	height: 40*retina
	x: 40*retina
	y: 464*retina
	image: "images/skip type.png"




# Background Slide
bg_slide = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: globalColor

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

search_view = new Layer
	parent: bg_slide
	width: 297*retina
	height: 100*retina
	x: 34*retina
	y: 266*retina
	scale: 0.8
	image: "images/seach view.png"

# Choose Background for Background Slide 

background_bottom_view = new Layer
	width: 360*retina
	height: 188*retina
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


bottom_buttons_view = new Layer
	parent: bg_slide
	width: 360*retina
	height: 64*retina
	x: 0*retina
	y: 528*retina
	image: "images/bottom buttons view.png"


next_step_button = new Layer
	parent: bg_slide
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 540*retina

next_step_button.states = 
	"save": { image: "images/next step save.png" }
	"skip": { image: "images/next step save.png" }
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





# Bookmarks Slide
bookmarks_slide = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: globalColor

bookmarks_text = new Layer
	parent: bookmarks_slide
	width: 258*retina
	height: 97*retina
	x: 51*retina
	y: 78*retina
	image: "images/bookmarks text.png"

# phone_back = new Layer
# 	parent: bookmarks_slide
# 	width: 200*retina
# 	height: 356*retina
# 	x: 12*retina
# 	y: 247*retina
# 	image: "images/phone back.png"
# 	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(3px*" + retina + ") " + "rgba(0,0,0,0.5))"}

# phone_back.states =
# 	"shown": { opacity: 1, x: 12*retina }
# 	"hidden": { opacity: 1, x: 76*retina }
	

# background_screen = new Layer
# 	parent: bookmarks_slide
# 	width: 1440
# 	height: 2272
# 	x: 0
# 	y: 96
# 	image: "images/background screen.png"

# History for Bookmarks Slide

history_1 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 263*retina
	backgroundColor: "rgba(255,255,255,1)"

history_1.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_1.stateSwitch("base")

history_2 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 281*retina
	backgroundColor: "rgba(255,255,255,1)"

history_2.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_2.stateSwitch("base")

history_3 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 299*retina
	backgroundColor: "rgba(255,255,255,1)"

history_3.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_3.stateSwitch("base")

history_4 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 317*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.9

history_4.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_4.stateSwitch("base")

history_5 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 335*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.8

history_5.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_5.stateSwitch("base")

history_6 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 353*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.7

history_6.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_6.stateSwitch("base")

history_7 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 371*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.6

history_7.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_7.stateSwitch("base")

history_8 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 389*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.5

history_8.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_8.stateSwitch("base")

history_9 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 407*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.4

history_9.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_9.stateSwitch("base")

history_10 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 425*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.3

history_10.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_10.stateSwitch("base")

history_11 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 443*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.2

history_11.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_11.stateSwitch("base")

history_12 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 461*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.1

history_12.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_12.stateSwitch("base")

histotyView = new Layer
	backgroundColor: "transparent"
	parent: bookmarks_slide

historyArray = [history_1, history_2, history_3, history_4, history_5, history_6, history_7, history_8, history_9, history_10, history_11, history_12]
for item in historyArray
	item.parent = histotyView

# Addons for Bookmarks Slide
# phone = new Layer
# 	parent: bookmarks_slide
# 	width: 212*retina
# 	height: 366*retina
# 	x: 138*retina
# 	y: 204*retina
# 	image: "images/phone.png"
# 	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(3px*" + retina + ") " + "rgba(0,0,0,0.5))"}
# 
# phone.states =
# 	"center": { x: 70*retina }

bookmarks_phone = new Layer
	parent: bookmarks_slide
	width: 254*retina
	height: 439*retina
	x: 97*retina
	y: 204*retina
	image: "images/bookmarks phone.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(4px*" + retina + ") " + "rgba(0,0,0,0.5))"}

bookmarks_phone.states =
	"center": { x: 60*retina }



bookmarks_browser_bg = new Layer
	parent: bookmarks_phone
	width: 228*retina
	height: 400*retina
	x: 13*retina
	y: 34*retina
	image: "images/background 1.png"

progress_view = new Layer
	parent: bookmarks_phone
	width: 100*retina
	height: 100*retina
	x: 76*retina
	y: 80*retina
	image: "images/progress view.png"

progress_view.states = 
	"small": { scale: 0.4 }
	"base": { scale: 1 }
progress_view.stateSwitch("small")

history_icon = new Layer
	parent: progress_view
	width: 50*retina
	height: 50*retina
	x: 25*retina
	y: 27*retina
	image: "images/history icon.png"
	opacity: 0.7

history_icon.states = 
	"hidden": { opacity: 0, scale: 0 }
	"shown": { opacity: 1, scale: 1 }
history_icon.stateSwitch("hidden")


tick = new Layer
	parent: progress_view
	width: 52*retina
	height: 48*retina
	x: 24*retina
	y: 28*retina
	image: "images/tick.png"

tick.states = 
	"hidden": { opacity: 0, scale: 0 }
	"shown": { opacity: 1, scale: 1 }
tick.stateSwitch("hidden")



history_path = new SVGLayer
	parent: progress_view
	x: 5*retina
	y: 6*retina
	strokeWidth: 4*retina
	width: 352
	height: 352
	path: '<path d="M176,352 C273.202116,352 352,273.202116 352,176 C352,78.797884 273.202116,0 176,0 C78.797884,0 0,78.797884 0,176 C0,273.202116 78.797884,352 176,352 Z"></path>'
	dashOffset: 0
	stroke: "#FDD94C"


bookmarksAnimationTime = 1.4

startBookmarksAnimation = () ->
# 	bookmarksAnimationTime = 3
	for item, i in historyArray
		item.animate("imported", options: { delay: 0.05 * i, time: bookmarksAnimationTime / 2, curve: "ease-in-out"})
	
# 	bookmarks_phone.animate("hidden", options: { delay: bookmarksAnimationTime / 2, time: bookmarksAnimationTime / 2})
	bookmarks_phone.animate("center", options: { delay: bookmarksAnimationTime / 2, time: bookmarksAnimationTime / 2})
	progress_view.animate("base", options: { delay: bookmarksAnimationTime / 2})
# 	history_path.animate(dashOffset: -1, options: { time: bookmarksAnimationTime / 2, delay: bookmarksAnimationTime / 2 })
	history_icon.animate("shown", options: { time: bookmarksAnimationTime / 5, delay: bookmarksAnimationTime / 2})

animateImportBookmarks = (event, layer) ->
	button_import.off(Events.Click, animateImportBookmarks)
	history_path.animate(dashOffset: -1, options: { time: bookmarksAnimationTime / 2 })
	tick.animate("shown", delay: bookmarksAnimationTime / 2, time: bookmarksAnimationTime / 5 )
	history_icon.animate("hidden", options: { time: bookmarksAnimationTime / 5 })
	
	button_importing.stateSwitch("shown")
	button_continue.stateSwitch("shown", delay: bookmarksAnimationTime / 2 + bookmarksAnimationTime / 5)

# startBookmarksAnimation()


# bookmarks_seach_view = new Layer
# 	parent: bookmarks_slide
# 	width: 187*retina
# 	height: 63*retina
# 	x: 156*retina
# 	y: 238*retina
# 	image: "images/bookmarks seach view.png"


bookmarks_continue_step = new Layer
	parent: bookmarks_slide
	width: 360*retina
	height: 64*retina
	x: 0*retina
	y: 528*retina
	image: "images/bookmarks continue step.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

bookmarks_check_browser = new Layer
	parent: bookmarks_slide
	width: 360*retina
	height: 100*retina
	x: 0*retina
	y: 428*retina
	image: "images/bookmarks check browser.png"





# Zen Onboarding Slide

zen_slide = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: globalColor

zen_scroll = new ScrollComponent
	parent: zen_slide
	width: 360*retina
	height: 510*retina
	y: 24*retina
	backgroundColor: "transparent"
	scrollVertical: true
	scrollHorizontal: false
	propagateEvents: false

zen_view = new Layer
	parent: zen_scroll.content
	width: 1440 / 4
	height: 6980 / 4
	x: 0
	y: 0
	image: "images/zen view.png"

zen_fix = new Layer
	parent: zen_slide
	width: 1440 / 4
	height: 176 / 4
	x: 0
	y: 95 / 4
	backgroundColor: globalColor


number_left = new Layer
	parent: zen_slide
	width: 360*retina
	height: 44*retina
	x: 0*retina
	y: 484*retina
	image: "images/number left.png"

skip_zen_button = new Layer
	parent: zen_slide
	width: 360*retina
	height: 64*retina
	x: 0*retina
	y: 528*retina
	image: "images/skip zen button.png"



# Zen Moving Slide
zen_done_slide = new Layer
	width: 360*retina
	height: 640*retina
# 	backgroundColor: globalColor
	image: "images/zen done slide.png"

zen_phone = new Layer
	parent: zen_done_slide
	width: 254*retina
	height: 410*retina
	x: 53*retina
	y: 204*retina
	image: "images/zen phone.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(4px*" + retina + ") " + "rgba(0,0,0,0.5))"}

zen_bg = new Layer
	parent: zen_done_slide
	clip: true
	width: 228*retina
	height: 406*retina
	x: 66*retina
	y: 237*retina
	image: "images/background 1.png"

darker_zen = new Layer
	parent: zen_bg
	width: 228*retina
	height: 290*retina
	x: 0*retina
	y: -1*retina

darker_zen.states =
	"zen_init":
		backgroundColor: "rgba(0,0,0,0.01)"
	"zen_done":
		backgroundColor: "rgba(0,0,0,0.01)"
	"zen_opened":
		backgroundColor: "rgba(0,0,0,0.5)"

darker_zen.stateSwitch("zen_init")

search_zen = new Layer
	parent: zen_bg
	width: 200*retina
	height: 68*retina
	x: 14*retina
	image: "images/search zen.png"

search_zen.states =
	"zen_init":
		y: 48*retina
	"zen_done":
		y: 48*retina
	"zen_opened":
		y: -102*retina

search_zen.stateSwitch("zen_init")

zen_card_1 = new Layer
	parent: zen_bg
	width: 200*retina
	height: 102*retina
	x: 14*retina
	image: "images/zen card 1.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_1.states =
	"zen_init":
		y: 305*retina
	"zen_done":
		y: 225*retina
	"zen_opened":
		y: 16*retina

zen_card_1.stateSwitch("zen_init")

zen_card_2 = new Layer
	parent: zen_bg
	width: 200*retina
	height: 102*retina
	x: 14*retina
	image: "images/zen card 2.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_2.states =
	"zen_init":
		y: 417*retina
	"zen_done":
		y: 357*retina
	"zen_opened":
		y: 128*retina

zen_card_2.stateSwitch("zen_init")

zen_card_3 = new Layer
	parent: zen_bg
	width: 200*retina
	height: 102*retina
	x: 14*retina
	image: "images/zen card 3.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_3.states =
	"zen_init":
		y: 529*retina
	"zen_done":
		y: 509*retina
	"zen_opened":
		y: 240*retina

zen_card_3.stateSwitch("zen_init")


movingArray = [darker_zen, zen_card_1, zen_card_2, zen_card_3, search_zen]
zen_card_1.on Events.StateSwitchEnd, (fromState, toState, event, layer) ->
	localDelay = 2
	nextState = ""
	
	if toState is "zen_done" then nextState = "zen_opened"
	else if toState is "zen_opened" then nextState = "zen_done"
	
	if layer is zen_card_2 then localDelay += 0.2
	else if layer is zen_card_3 then localDelay += 0.4
	
	if nextState != ""
		for item in movingArray
			item.animate(nextState, options: { time: 1, curve: "ease-in-out", delay: localDelay})


zen_continue_step = new Layer
	parent: zen_done_slide
	width: 360*retina
	height: 64*retina
	x: 0*retina
	y: (504+24)*retina
	image: "images/zen continue step.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}


# Browser Slide
browser_screen = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/background 1.png"

browser_content = new Layer
	parent: browser_screen
	width: 336*retina
	height: 339*retina
	x: 14*retina
	y: 24*retina
	image: "images/browser content.png"





toast_multiline = new Layer
	parent: browser_screen
	width: 364*retina
	height: 86*retina
	x: -2*retina
	y: 510*retina
	image: "images/toast multiline.png"

toast_multiline.on Events.StateSwitchEnd, (fromState, toState, event, layer) ->
	if toState is "shown"
		toast_multiline.animate("hidden", options: { delay: 2 })
		zen_real.animate("shown", options: { delay: 3 })

toast_multiline.states = 
	"hidden": { y: 640*retina }
	"shown": { y: 510*retina }
toast_multiline.stateSwitch("hidden")


zen_real = new Layer
	parent: browser_screen
	width: 330*retina
	height: 160*retina
	x: 16*retina
	y: 460*retina
	image: "images/zen real.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_real.states = 
	"hidden": { y: 640*retina }
	"shown": { y: 460*retina }
zen_real.stateSwitch("hidden")









nextSlideArray = [configure_browser, skip_login_button, skip_zen_button, zen_continue_step, next_step_button, bookmarks_continue_step, start_configuration_button, skip_type]

loggedArray = [welcome_logged, bg_slide, bookmarks_slide, zen_done_slide, browser_screen]
baseArray = [welcome_base, login_type_slide, bg_slide, bookmarks_slide, zen_slide, browser_screen]

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
	
	if selectedArray == loggedArray
		if currentPageIndex >= 1 and currentPageIndex <= 3
			all_steps.stateSwitch("shown")
			current_step.stateSwitch("step #{currentPageIndex}")
			close_tutorial.stateSwitch("shown")
		else
			all_steps.stateSwitch("hidden")
			close_tutorial.stateSwitch("hidden")
	else
		if currentPageIndex >= 2 and currentPageIndex <= 4
			all_steps.stateSwitch("shown")
			current_step.stateSwitch("step #{currentPageIndex-1}")
			close_tutorial.stateSwitch("shown")
		else
			all_steps.stateSwitch("hidden")
			close_tutorial.stateSwitch("hidden")
	

	if currentPageIndex == 2 and selectedArray == loggedArray then startBookmarksAnimation()
	if currentPageIndex == 3 and selectedArray == baseArray then startBookmarksAnimation()
	
	if currentPageIndex == 3 and selectedArray == loggedArray then zen_card_1.animate("zen_done")
	
	if currentPageIndex == 4 and selectedArray == loggedArray then toast_multiline.animate("shown")
	if currentPageIndex == 5 and selectedArray == baseArray then toast_multiline.animate("shown")



close_tutorial = new Layer
	width: 296
	height: 56
	x: 1080
	y: 152
	image: "images/close tutorial.png"

close_tutorial.states = 
	"shown": { opacity: 0.8 }
	"hidden": { opacity: 0 }
close_tutorial.stateSwitch("shown")

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
	backgroundColor: "rgba(255,255,255,1)"

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
	height: 32*retina
	backgroundColor: "black"

for item in [welcome_logged, zen_done_slide, slidesView, close_tutorial, all_steps, navbar, status_bar]
	item.parent = screen
