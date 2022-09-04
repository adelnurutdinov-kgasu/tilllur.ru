{TextLayer} = require 'TextLayer'
retina = 1

screenView = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(50,50,50,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

backgroundsArray = []
totalPages = 2

# flag for background teasing
isAutoSliding = true

# flag for zen teasing
isAutoChoosing = true

zenChooseDelay = 1.2

sliderDelay = 1.2
sliderTime = 0.6

slidesColor = "#333"
currentPage = 0

# Browser Curves

fastInSlowOut = [0.4, 0, 0.2, 1]
fastInRealSlowOut = [0.4, 0, 0, 1]
linearInSlowOut = [0, 0, 0.2, 1]
fastInLinearOut = [0.4, 0, 1, 1]

loadSiteTime = 0.6

outScreenOptions = 
	curve: "bezier-curve"
	curveOptions: fastInLinearOut
	time: 0.195*2

inScreenOptions = 
	curve: "bezier-curve"
	curveOptions: fastInSlowOut
	time: 0.225*2

outOptions = 
	curve: "bezier-curve"
	curveOptions: fastInRealSlowOut
	time: 0.195*2

inOptions = 
	curve: "bezier-curve"
	curveOptions: linearInSlowOut
	time: 0.225*2



# BG
screen = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: slidesColor


for i in [0...4]
	temp = new Layer
		image: "images/helper #{i}.png"
		y: 640*retina
		parent: screen

isLoginQueue = () ->
# 	return true
	return window.location.hash.includes "login"


# Global Navigation


navigationController = new PageComponent
	width: 360*retina
	height: 640*retina
	backgroundColor: "transparent"
	scrollHorizontal: false
	scrollVertical: false

welcome_logged_screen = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/welcome logged screen.png"

welcome_base_screen = new Layer
	width: 360*retina
	height: 640*retina
	image: "images/welcome base screen.png"

iphoneContainer = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "transparent"

browser_screen = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "transparent"

zen_screen = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "transparent"




loggedQueue = [welcome_logged_screen, iphoneContainer, browser_screen]
baseQueue = [welcome_base_screen, iphoneContainer, zen_screen, browser_screen]

for item in loggedQueue
	item.placeBehind(screen)
for item in baseQueue
	item.placeBehind(screen)

if isLoginQueue() then selectedQueue = loggedQueue
else selectedQueue = baseQueue

for item, i in selectedQueue
	navigationController.addPage(item, "right")

# Welcome Screen Logic

welcome_continue_button = new Layer
	parent: selectedQueue[0]
	width: 280*retina
	height: 48*retina
	x: 40*retina
	y: 464*retina
	image: "images/welcome continue button.png"

if !isLoginQueue() then welcome_continue_button.y = 408*retina


# Browser Screen Logic

browser_content = new Layer
	parent: browser_screen
	width: 336*retina
	height: 339*retina
	x: 16*retina
	y: 24*retina
	image: "images/browser content.png"



toast_shape = new Layer
	parent: browser_screen
	width: 360*retina
	height: 104*retina
	x: 0*retina
	y: 488*retina
	image: "images/toast shape.png"

toast_shape.states =
	"hidden": { y: 640*retina }
	"shown": { y: 488*retina }
toast_shape.stateSwitch("hidden")

toast_shape.animationOptions = inOptions

toast_shape.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "shown"
		toast_shape.animate("hidden", { delay: 4 })
		zen_card.animate("shown", { delay: 5 })

bro_logo = new Layer
	parent: toast_shape
	width: 60*retina
	height: 60*retina
	x: 26*retina
	y: 24*retina
	image: "images/bro logo.png"

bro_logo.states =
	"hidden": { scale: 0.2 }
	"shown": { scale: 1 }
bro_logo.stateSwitch("hidden")

bro_logo.animationOptions = outOptions


zen_card = new Layer
	width: 331*retina
	height: 160*retina
	x: 16*retina
	image: "images/zen card.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card.states =
	"shown": { y: 460*retina }
	"hidden": { y: 600*retina }
zen_card.stateSwitch("hidden")

# Zen Onboarding Logic

# Number of selected zen items
selectedSources = 0

zenOnboarding = new ScrollComponent
	parent: zen_screen
	width: 360*retina
	height: 570*retina - 48*retina
	y: 24*retina
	scrollHorizontal: false


zenOnboarding.on Events.Move, ->
	isAutoChoosing = false


zen_text = new Layer
	parent: zenOnboarding.content
	width: 286*retina
	height: 97*retina
	x: 37*retina
	y: 56*retina
	image: "images/zen text.png"





zen_button = new Layer
	parent: zen_screen
	width: 360*retina
	height: 56*retina
	y: 536*retina
	backgroundColor: "rgba(204,204,204,1)"

zen_button_progress = new Layer
	parent: zen_button
	width: 90*retina
	height: 56*retina
	backgroundColor: "rgba(255,221,96,1)"

zen_button_progress.states =
	"zero": { width: 0 }
	"one": { width: 90*retina }
	"two": { width: 90*retina*2 }
	"three": { width: 90*retina*3 }
	"four": { width: 90*retina*4 }
zen_button_progress.stateSwitch("zero")

zen_button_progress.animationOptions = inOptions




buttonTexts = [
	"Можно продолжить",
	"Выберите еще минимум 1 источник",
	"Выберите еще минимум 2 источника",
	"Выберите еще минимум 3 источника",
	"Выберите еще минимум 4 источника"
]

zen_button_text = new TextLayer
	parent: zen_button
	width: 360*retina
	height: 14*retina
	y: 18*retina
	opacity: 0.8
	text: buttonTexts[4]
	textAlign: "center"
	fontFamily: "Roboto"
	fontSize: 17*retina
	fontWeight: 500
	color: "#000"
	letterSpacing: 0.5*retina


updateZenButtonText = () ->
	if selectedSources < 4 then zen_button_text.text = buttonTexts[4 - selectedSources]
	else zen_button_text.text = buttonTexts[0]

updateZenButtonProgress = () ->
	updateZenButtonText()
# 	updateHelper()
	
	if selectedSources == 0 then zen_button_progress.animate("zero")
	else if selectedSources == 1 then zen_button_progress.animate("one")
	else if selectedSources == 2 then zen_button_progress.animate("two")
	else if selectedSources == 3 then zen_button_progress.animate("three")
	else zen_button_progress.animate("four")




zenItemsArray = []
for i in [1...30]
	zen_item = new Layer
		parent: zenOnboarding.content
		width: 104*retina
		height: 132*retina
		borderRadius: 4*retina
		y: Math.floor((i - 1) / 3) * (132+12)*retina + 180*retina
	
	if i % 3 == 1
		zen_item.x = 16*retina
	else if i % 3 == 2
		zen_item.x = 128*retina
	else
		zen_item.x = 240*retina
	
	zen_item.states =
		"selected": { scale: 0.94 }
		"base": { scale: 1 }
	zen_item.stateSwitch("base")
		
	zenItemsArray.push(zen_item)
	
	
	zen_image = new Layer
		width: 104*retina
		height: 132*retina
		parent: zen_item
		image: "images/zen item #{i}.png"
	
	zen_image.states =
		"selected": { opacity: 0.3 }
		"base": { opacity: 1 }
	zen_image.stateSwitch("base")
	
	
	check = new Layer
		parent: zen_item
		width: 44*retina
		height: 44*retina
		x: 30*retina
		y: 30*retina
		image: "images/icCheck.png"
	
	check.states =
		"selected": { opacity: 1 }
		"base": { opacity: 0 }
	check.stateSwitch("base")
	
	for item in [zen_item, zen_image, check]
		item.animationOptions = inOptions
	
	
	zen_item.on Events.StateSwitchStart, (fromState, toState, event, layer) ->
		if toState is "selected"
			layer.children[0].animate("selected")
			layer.children[1].animate("selected")
			selectedSources++
		else 
			layer.children[0].animate("base")
			layer.children[1].animate("base")
			selectedSources--
		updateZenButtonProgress()
	
	zen_item.on Events.Click, (event, layer) ->
		isAutoChoosing = false
		if layer.states.current.name is "base"
			layer.animate("selected")
		else if layer.states.current.name is "selected"
			layer.animate("base")


zenChangeItemState = () ->
	if isAutoChoosing
		if zenItemsArray[0].states.current.name is "base"
			zenItemsArray[0].animate("selected")
		else if zenItemsArray[0].states.current.name is "selected"
			zenItemsArray[0].animate("base")
		
		Utils.delay zenChooseDelay, ->
			zenChangeItemState()

teaseZenChoosing = () ->
	Utils.delay 1, ->
		zenChangeItemState()

# Titles for Slides

titlesView = new PageComponent
	parent: navigationController
	width: 360*retina
	height: 170*retina
	y: 24*retina
	scrollHorizontal: false
	scrollVertical: false
	ignoreEvents: true

title_step_0 = new Layer
	width: 360*retina
	height: 170*retina
	backgroundColor: "transparent"

title_step_1 = new Layer
	width: 360*retina
	height: 170*retina
	image: "images/title step 1.png"

title_step_2 = new Layer
	width: 360*retina
	height: 170*retina
	image: "images/title step 2.png"

title_step_3 = new Layer
	width: 360*retina
	height: 170*retina
	backgroundColor: "transparent"

if isLoginQueue() then title_step_3.image = "images/title step 3.png"

title_step_4 = new Layer
	width: 360*retina
	height: 170*retina
	backgroundColor: "transparent"

for item in [title_step_0, title_step_1, title_step_2, title_step_3, title_step_4]
	item.ignoreEvents = true
	titlesView.addPage(item, "right")
	
titlesView.content.ignoreEvents = true





progressView = new PageComponent
	parent: navigationController
	width: 360*retina
	height: 44*retina
	y: 24*retina
	scrollVertical: false

empty_bar_left = new Layer
	parent: progressView
	width: 360*retina
	height: 44*retina
	backgroundColor: "transparent"

progress_bar = new Layer
	parent: progressView
	width: 360*retina
	height: 44*retina
	image: "images/progress bar.png"

empty_bar_right = new Layer
	parent: progressView
	width: 360*retina
	height: 44*retina
	backgroundColor: "transparent"

for item in [empty_bar_left, progress_bar, empty_bar_right]
	progressView.addPage(item, "right")

current_step = new Layer
	parent: progress_bar
	width: 8*retina
	height: 8*retina
	y: 18*retina
	borderRadius: "100%"
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.7

current_step.states =
	"one":
		x: 160*retina
	"two":
		x: 176*retina
	"three":
		x: 192*retina

current_step.stateSwitch("one")






# Choose Background Logic

slider = new PageComponent
	parent: iphoneContainer
	width: 360*retina
	height: 403*retina
	x: 0*retina
	y: 237*retina
	backgroundColor: "transparent"
	scrollVertical: false
	contentInset: 
		right: 66*retina


for i in [0..totalPages]
	item = new Layer
		width: 228*retina
		height: 406*retina
		x: 228*retina * i + 66*retina
		y: 0
		parent: slider.content
		image: "images/background #{i%3+1}.png"
	
	backgroundsArray.push(item)


teaseScrolling = () ->
	if isAutoSliding
		tryScrolling()
	Utils.delay 2, ->
		teaseScrolling()

tryScrolling = () ->
	if isAutoSliding
		slider.scrollToPoint(
			x: 32*retina, y: 0
			true
			curve: "spring(400, 20, 0)"
		)
		Utils.delay 0.4, ->
			if isAutoSliding
				slider.scrollToPoint(
					x: 0*retina, y: 0
					true
					curve: "ease-in"
					time: 0.8
				)


slider.on Events.TouchStart, ->
	slider.animateStop()
	slider.content.animateStop()
	isAutoSliding = false

# iPhone
background_fix_1 = new Layer
	parent: iphoneContainer
	width: 60*retina
	height: 320*retina
	x: 0*retina
	y: 230*retina
	backgroundColor: "rgba(51,51,51,1)"

background_fix_1.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
background_fix_1.stateSwitch("hidden")


background_fix_2 = new Layer
	parent: iphoneContainer
	width: 60*retina
	height: 320*retina
	x: 300*retina
	y: 230*retina
	backgroundColor: "rgba(51,51,51,1)"

background_fix_2.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
background_fix_2.stateSwitch("hidden")

phone = new Layer
	parent: iphoneContainer
	width: 258*retina
	height: 343*retina
	x: 51*retina
	y: 201*retina
	image: "images/phone.png"

# bookmarks_check_browser = new Layer
# 	width: 228*retina
# 	height: 114*retina
# 	x: 66*retina

bookmarks_check_browser = new Layer
	parent: iphoneContainer
	width: 228*retina
	height: 114*retina
	x: 66*retina
	image: "images/bookmarks check browser.png"

bookmarks_check_browser.states =
	"hidden":
		y: 544*retina
	"shown":
		y: 422*retina

bookmarks_check_browser.stateSwitch("hidden")

# Zen Configured Logic

zenView = new Layer
	parent: iphoneContainer
	width: 230*retina
	height: 309*retina
	x: 65*retina
	y: 236*retina
	backgroundColor: "transparent"
	clip: true

darker = new Layer
	parent: zenView
	width: 230*retina
	height: 309*retina
	backgroundColor: "rgba(0,0,0,0.5)"

darker.states =
	"zen_init":
		opacity: 0
	"zen_done":
		opacity: 0
	"zen_opened":
		opacity: 1
darker.stateSwitch("zen_init")

search_view = new Layer
	parent: zenView
	width: 200*retina
	height: 68*retina
	x: 80*retina - 65*retina
	y: 350*retina - 236*retina
	image: "images/search view.png"

search_view.states =
	"zen_init":
		y: 350*retina - 236*retina
	"zen_done":
		y: 350*retina - 236*retina
	"zen_opened":
		y: 60*retina - 236*retina
search_view.stateSwitch("zen_init")

zen_card_1 = new Layer
	parent: zenView
	width: 200*retina
	height: 102*retina
	x: 80*retina - 65*retina
	image: "images/zen card 1.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_1.states =
	"zen_init":
		y: 546*retina - 236*retina
	"zen_done":
		y: 463*retina - 236*retina
	"zen_opened":
		y: 254*retina - 236*retina

zen_card_1.stateSwitch("zen_init")

zen_card_2 = new Layer
	parent: zenView
	width: 200*retina
	height: 102*retina
	x: 80*retina - 65*retina
	image: "images/zen card 2.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_2.states =
	"zen_init":
		y: 655*retina - 236*retina
	"zen_done":
		y: 595*retina - 236*retina
	"zen_opened":
		y: 366*retina - 236*retina

zen_card_2.stateSwitch("zen_init")

zen_card_3 = new Layer
	parent: zenView
	width: 200*retina
	height: 102*retina
	x: 80*retina - 65*retina
	image: "images/zen card 3.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(1px*" + retina + ") " + "rgba(0,0,0,0.12))"}

zen_card_3.states =
	"zen_init":
		y: 767*retina - 236*retina
	"zen_done":
		y: 747*retina - 236*retina
	"zen_opened":
		y: 478*retina - 236*retina

zen_card_3.stateSwitch("zen_init")

# movingArray = [darkerZenDone, zen_card_1, zen_card_2, zen_card_3, searchZenDone]
movingArray = [darker, zen_card_1, zen_card_2, zen_card_3, search_view]
zen_card_1.on Events.StateSwitchEnd, (fromState, toState, event, layer) ->
	localDelay = 1.4
	nextState = ""
	
	if toState is "zen_done" then nextState = "zen_opened"
	else if toState is "zen_opened" then nextState = "zen_done"
	
	if layer is zen_card_2 then localDelay += 0.2
	else if layer is zen_card_3 then localDelay += 0.4
	
	if nextState != ""
		for item in movingArray
			item.animate(nextState, options: { time: 1, curve: "ease-in-out", delay: localDelay})






next_button = new Layer
	parent: iphoneContainer
	width: 360*retina
	height: 56*retina
	y: 536*retina
	image: "images/next button.png"

# next_button = new Layer
# 	width: 360*retina
# 	height: 56*retina
# 	x: 0*retina
# 	y: 536*retina
# 	image: "images/next button.png"

# next_button.states =
# 	"continue": { "images/next button.png" }
# 	"skip": { "images/skip button.png" }
# next_button.stateSwitch("continue")


welcome_continue_button.on Events.Click, ->
	navigationController.nextPage()
	navigationController.snapToPage(iphoneContainer)
	titlesView.snapToNextPage()
	progressView.snapToNextPage()
	Utils.delay 1, ->
		teaseScrolling()


nextButtonHandler = () ->
	if currentPage == 0
		currentPage++
		current_step.stateSwitch("two")
		titlesView.snapToNextPage()
		isAutoSliding = false
		slider.snapToPage(slider.currentPage)
		background_fix_1.animate("shown", time: 0.2)
		background_fix_2.animate("shown", time: 0.2)
		bookmarks_check_browser.animate("shown")
		browser_screen.image = slider.currentPage.image
	
	else if currentPage == 1
		currentPage++
		current_step.stateSwitch("three")
		titlesView.snapToNextPage()
		if isLoginQueue()
			bookmarks_check_browser.animate("hidden")
			zen_card_1.animate("zen_done")
		else 
			navigationController.snapToNextPage()
			teaseZenChoosing()
	
	else if currentPage == 2
		navigationController.snapToNextPage()
		progressView.snapToNextPage()
		toast_shape.animate("shown", { delay: 1 } )
		bro_logo.animate("shown", { delay: 1.2 })
		titlesView.snapToNextPage()

preNextButtonHandler = () ->
	if selectedSources > 3
		nextButtonHandler()

next_button.on(Events.Click, nextButtonHandler)
zen_button.on(Events.Click, preNextButtonHandler)

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

# Finish Tutorial

finish_tutorial = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	image: "images/finish tutorial.png"

finish_tutorial.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
finish_tutorial.stateSwitch("hidden")

modal_finish_button = new Layer
	parent: finish_tutorial
	width: 126*retina
	height: 48*retina
	x: 194*retina
	y: 334*retina
	image: "images/modal finish button.png"

modal_cancel_button = new Layer
	parent: finish_tutorial
	width: 154*retina
	height: 48*retina
	x: 40*retina
	y: 334*retina
	image: "images/modal cancel button.png"



modal_cancel_button.on Events.Click, ->
	finish_tutorial.stateSwitch("hidden", { time: 0.4 })

modal_finish_button.on Events.Click, ->
	navigationController.snapToPage(browser_screen)
# 	toast_shape.animate("shown", { delay: 1 } )
# 	bro_logo.animate("shown", { delay: 1.2 })
	if isLoginQueue() then zen_card.animate("shown", { delay: 2 })
	titlesView.snapToPage(title_step_4)
	finish_tutorial.stateSwitch("hidden", { time: 0.4 })
	progressView.snapToPage(empty_bar_right)
	browser_screen.image = slider.currentPage.image


openFinishTutorialModal = (event, layer) ->
	finish_tutorial.ignoreEvents = false
	modal_cancel_button.ignoreEvents = false
	modal_finish_button.ignoreEvents = false
	finish_tutorial.stateSwitch("shown", { time: 0.4 })

finish_tutorial.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "hidden"
		finish_tutorial.ignoreEvents = true
		modal_cancel_button.ignoreEvents = true
		modal_finish_button.ignoreEvents = true

finish_tutorial.stateSwitch("hidden")

progress_bar.on(Events.Click, openFinishTutorialModal)







navigationController.backgroundColor = "333"
for item in [screen, welcome_logged_screen,navigationController, zen_card, navbar, status_bar, finish_tutorial]
	item.parent = screenView