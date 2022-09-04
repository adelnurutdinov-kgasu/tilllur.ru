{TextLayer} = require 'TextLayer'
retina = 1

screenView = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(50,50,50,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

videoPlayingHelper = true

backgroundsArray = []
totalPages = 2

# flag for background teasing
isAutoSliding = true
isAutoSlidingAlreadyDone = false
# flag for zen teasing
isAutoChoosing = true
isAutoChoosingAlreadyDone = false
# flag for fonts
isTeasingFonts = true
isTeasingOptionalDone = false

optionalStepIndex = 0
if window.location.hash.includes "fonts"
	optionalStepIndex = 1
else if window.location.hash.includes "card"
	optionalStepIndex = 2

# override
# optionalStepIndex = 1

zenChooseDelay = 1.2
sliderDelay = 1.2
sliderTime = 0.6

slidesColor = "#333"
currentPage = -1



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
	return false
# 	return window.location.hash.includes "login"


# Global Navigation


navigationController = new PageComponent
	width: 360*retina
	height: 640*retina
	backgroundColor: "transparent"
	scrollHorizontal: false
	scrollVertical: false


yandex_bg_video = new VideoLayer
	width: 376 / (376/360) * retina
	height: 668 / (668/640) * retina
	video: "images/yandex-bg-video.mp4"

if videoPlayingHelper then yandex_bg_video.player.play()
yandex_bg_video.player.loop = true

welcome_logged_screen = new Layer
	parent: yandex_bg_video
	width: 360*retina
	height: 571*retina
	x: 0*retina
	y: 24*retina
	image: "images/welcome logged screen.png"

welcome_continue_button = new Layer
	parent: welcome_logged_screen
	width: 360*retina
	height: 56*retina
	x: 0*retina
	y: (536-24)*retina
	image: "images/welcome continue button.png"


# welcome_base_screen = new Layer
# 	width: 360*retina
# 	height: 640*retina
# 	image: "images/welcome base screen.png"

iphoneContainer = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "transparent"

optionalContainer = new Layer
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




# loggedQueue = [yandex_bg_video, iphoneContainer, browser_screen]
baseQueue = [yandex_bg_video, iphoneContainer, optionalContainer, zen_screen, browser_screen]

# for item in loggedQueue
# 	item.placeBehind(screen)
for item in baseQueue
	item.placeBehind(screen)

# if isLoginQueue() then selectedQueue = loggedQueue
# else selectedQueue = baseQueue

for item, i in baseQueue
	navigationController.addPage(item, "right")



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
	if toState is "shown" and currentPage == 3
		toast_shape.animate("hidden", { delay: 4 })
	else if toState is "hidden" and currentPage == 3
		zen_card.animate("shown", { delay: 1 })

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
	parent: browser_screen
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

progress_bar.states =
	"skip": { image: "images/progress bar.png" }
	"end": { image: "images/progress bar last.png" }

# progress_back = new Layer
# 	width: 44*retina
# 	height: 44*retina
# 	parent: progressView

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
# 	parent: iphoneContainer
# 	width: 228*retina
# 	height: 114*retina
# 	x: 66*retina
# 	image: "images/bookmarks check browser.png"
# 
# bookmarks_check_browser.states =
# 	"hidden":
# 		y: 544*retina
# 	"shown":
# 		y: 422*retina
# 
# bookmarks_check_browser.stateSwitch("hidden")

background_bottom_darker = new Layer
	parent: iphoneContainer
	width: 360*retina
	height: 114*retina
	x: 0*retina
	y: 422*retina
	image: "images/background bottom darker.png"



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


# Optional Step: Inits
fontsContainer = new Layer
	width: 360*retina
	height: 640*retina
	x: 360*retina
	backgroundColor: "transparent"

cardContainer = new Layer
	width: 360*retina
	height: 640*retina
	x: 360*retina
	backgroundColor: "transparent"

importContainer = new Layer
	width: 360*retina
	height: 640*retina
	x: 360*retina
	backgroundColor: "transparent"


initOptionalStep = () ->
	if optionalStepIndex == 1
		initFontsStep()
	else if optionalStepIndex == 2
		initCardStep()
	else
		initImportStep()


teaseOptionalStep = () ->
	if optionalStepIndex == 1
		teaseFonts()
	else if optionalStepIndex == 2
		teaseCard()
	else
		teaseImport()


initFontsStep = () ->
	fontsContainer.x = 0
	fontsContainer.parent = optionalContainer
	title_step_2.image = "images/title step 2 fonts.png"

initCardStep = () ->
	cardContainer.x = 0
	cardContainer.parent = optionalContainer
	title_step_2.image = "images/title step 2 card.png"

initImportStep = () ->
	importContainer.x = 0
	importContainer.parent = optionalContainer

initOptionalStep()


# Fonts: Layers

phonefonts = new Layer
	width: 254*retina
	height: 439*retina
	x: 53*retina
	y: 204*retina
	image: "images/phoneFonts.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(4px*" + retina + ") " + "rgba(0,0,0,0.5))"}

font_base_line = new Layer width: 168*retina, height: 63*retina, x: 96*retina, y: 456*retina, image: "images/font base line.png"

select_item_1 = new Layer width: 24*retina, height: 24*retina, x: 96*retina, y: 456*retina, borderRadius: "100%", backgroundColor: "rgba(238,238,238,1)", borderWidth: 1*retina, borderColor: "rgba(221,221,221,1)"

select_item_2 = new Layer width: 24*retina, height: 24*retina, x: 168*retina, y: 456*retina, borderRadius: "100%", backgroundColor: "rgba(238,238,238,1)", borderWidth: 1*retina, borderColor: "rgba(221,221,221,1)"

select_item_3 = new Layer width: 24*retina, height: 24*retina, x: 240*retina, y: 456*retina, borderRadius: "100%", backgroundColor: "rgba(238,238,238,1)", borderWidth: 1.1*retina, borderColor: "rgba(221,221,221,1)"

text_preview_1 = new Layer
	width: 147*retina
	height: 54*retina
	x: 87*retina
	y: 277*retina
	image: "images/text preview 1.png"

text_preview_2 = new Layer
	width: 158*retina
	height: 60*retina
	x: 87*retina
	y: 276*retina
	image: "images/text preview 2.png"

text_preview_3 = new Layer
	width: 168*retina
	height: 64*retina
	x: 87*retina
	y: 276*retina
	image: "images/text preview 3.png"


textArray = [text_preview_1, text_preview_2, text_preview_3]
for item in textArray
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	item.stateSwitch("hidden")
	
	item.animationOptions =
		time: 0.1
		curve: "linear"

text_preview_1.stateSwitch("shown")

textLayers = [phonefonts, font_base_line, select_item_1, select_item_2, select_item_3, text_preview_1, text_preview_2, text_preview_3]

for item in textLayers
	item.parent = fontsContainer

# Fonts: Selected Round Behaviour
selected_font_round = new Layer
	parent: fontsContainer
	width: 44*retina
	height: 44*retina
	y: 446*retina
	borderRadius: "100%"
	backgroundColor: "rgba(255,221,96,1)"
	borderWidth: 2*retina
	borderColor: "rgba(230,199,87,1)"

selected_font_round.draggable.enabled = true
selected_font_round.draggable.vertical = false
selected_font_round.draggable.overdrag = false
selected_font_round.draggable.momentum = false

selected_font_round.draggable.constraints =
	width: 188*retina
	height: 46*retina
	x: 86*retina
	y: 445*retina
	backgroundColor: "rgba(216,216,216,1)"

selected_font_round.states =
	"small":
		x: 86*retina
	"medium":
		x: 158*retina
	"large":
		x: 230*retina

selected_font_round.stateSwitch("small")

selected_font_round.on Events.StateSwitchEnd, (fromState, toState, event, layer) ->
	localItemIndex = -1
	
	if toState is "small"
		localItemIndex = 0
	else if toState is "medium"
		localItemIndex = 1
	else if toState is "large"
		localItemIndex = 2
	
	if localItemIndex != -1
		for item, i in textArray
			if i == localItemIndex
				textArray[i].animate("shown")
			else textArray[i].animate("hidden")
	

selected_font_round.animationOptions = 
	curve: "spring(200, 0, 0)"

selected_font_round.on Events.TouchStart, (event, layer) ->
	selected_font_round.animateStop()
	isTeasingFonts = false
	selected_font_round.animate(scale: 0.8)

selected_font_round.on Events.TouchEnd, ->
	selected_font_round.animate(scale: 1)

selected_font_round.on Events.DragEnd, (event, layer)->
	selected_font_round.animate(scale: 1)
	
	if layer.x > selected_font_round.states.small.x and layer.x < selected_font_round.states.medium.x
		if layer.draggable.direction is "right" then layer.animate("medium")
		else if layer.draggable.direction is "left" then layer.animate("small")
		else attachToNearestPoint(layer)
	else if layer.x > selected_font_round.states.medium.x and layer.x < selected_font_round.states.large.x
		if layer.draggable.direction is "right" then layer.animate("large")
		else if layer.draggable.direction is "left" then layer.animate("medium")
		else attachToNearestPoint(layer)
	
	
attachToNearestPoint = (layer) ->
	if layer.x < selected_font_round.states.small.x + (selected_font_round.states.medium.x - selected_font_round.states.small.x) / 2
			layer.animate("small")
		else if layer.x > selected_font_round.states.small.x + (selected_font_round.states.medium.x - selected_font_round.states.small.x) / 2 and layer.x < selected_font_round.states.medium.x + (selected_font_round.states.large.x - selected_font_round.states.medium.x) / 2
			layer.animate("medium")
		else layer.animate("large")


for item in [select_item_1, select_item_2, select_item_3]
	item.on Events.Click, (event, layer) ->
		selected_font_round.animateStop()
		isTeasingFonts = false
		
		if layer is select_item_1
			selected_font_round.animate("small")
		else if layer is select_item_2
			selected_font_round.animate("medium")
		else if layer is select_item_3
			selected_font_round.animate("large")

# Fonts: Tease

selected_font_round.states.tease =
	x: selected_font_round.states.small.x + 24*retina
		
teaseFonts = () ->
	if isTeasingFonts
		selected_font_round.animate("tease")
		Utils.delay 0.6, ->
			if isTeasingFonts
				selected_font_round.animate("small", { curve: "linear", time: 1 })
				Utils.delay 2, ->
					if isTeasingFonts
						teaseFonts()

# teaseFonts()


# Card: Layers


card_shape = new Layer
	width: 113*retina
	height: 164*retina
	x: 52*retina
	y: 262*retina
	image: "images/card shape.png"

card_fill = new Layer
	width: 113*retina
	x: 52*retina
	backgroundColor: "rgba(204,204,204,1)"

card_fill.states =
	"base":
		height: 1*retina
		y: 426*retina
	"done":
		height: 164*retina
		y: 262*retina

card_fill.stateSwitch("base")

card_cover = new Layer
	width: 360*retina
	height: 220*retina
	x: 0*retina
	y: 240*retina
	image: "images/card cover.png"

card_fill_phone = new Layer
	width: 114*retina
	x: 192*retina
	backgroundColor: "rgba(204,204,204,1)"

card_fill_phone.states =
	"base":
		height: 165*retina
		y: 263*retina
	"done":
		height: 2*retina
		y: 426*retina

card_fill_phone.stateSwitch("base")

card_data_browser = new Layer
	width: 68*retina
	height: 40*retina
	x: 215*retina
	y: 322*retina
	image: "images/card data browser.png"

card_data_card = new Layer
	width: 68*retina
	height: 40*retina
	x: 74*retina
	y: 321*retina
	image: "images/card data card.png"

card_checkmark_place = new Layer
	width: 360*retina
	height: 70*retina
	x: 0*retina
	y: 466*retina
	image: "images/card checkmark place.png"


cardItems = [card_shape, card_fill, card_cover, card_fill_phone, card_data_browser, card_data_card, card_checkmark_place]
for item in cardItems
	item.parent = cardContainer


teaseCard = () ->
	for item in cardItems
		try  
			item.animate("done")


card_checkmark = new Layer
	width: 18*retina
	height: 18*retina
	x: 60*retina
	y: 492*retina
	image: "images/card checkmark.png"

card_checkmark.states =
	"base":
		opacity: 0
	"done":
		opacity: 1

card_checkmark.stateSwitch("done")
card_checkmark.parent = cardContainer

card_checkmark.on Events.Click, ->
	if card_checkmark.states.current.name is "done" then cardNextState = "base"
	else cardNextState = "done"
	
	card_checkmark.stateSwitch(cardNextState)
	for item in cardItems
		try item.animate(cardNextState)

# Import: 

teaseImport = () ->




next_button = new Layer
	parent: iphoneContainer
	width: 360*retina
	height: 56*retina
	y: 536*retina
	image: "images/next button.png"

next_button_optional = new Layer
	parent: optionalContainer
	width: 360*retina
	height: 56*retina
	y: 536*retina
	image: "images/next button.png"


# Back Handler
backButtonHandler = () ->
	if currentPage == 0
		currentPage--
		navigationController.snapToNextPage("left")
		titlesView.snapToNextPage("left")
		progressView.snapToNextPage("left")
		Utils.delay 1, ->
			yandex_bg_video.player.play()
	
	else if currentPage == 1
		currentPage--
		current_step.stateSwitch("one")
		titlesView.snapToNextPage("left")
		background_fix_1.animate("hidden", time: 0.2)
		background_fix_2.animate("hidden", time: 0.2)
		navigationController.snapToNextPage("left")

	
	else if currentPage == 2
		currentPage--
		current_step.stateSwitch("two")
		progress_bar.stateSwitch("skip")
		titlesView.snapToNextPage("left")
		navigationController.snapToNextPage("left")
	
	else if currentPage == 3
		currentPage--
		zen_card.animateStop()
		zen_card.animate("hidden")
		navigationController.snapToNextPage("left")
		progressView.snapToNextPage("left")
		titlesView.snapToNextPage("left")

welcome_continue_button.on Events.Click, ->
	currentPage = 0
	navigationController.snapToNextPage()
	titlesView.snapToNextPage()
	progressView.snapToNextPage()
	Utils.delay 1, ->
		if !isAutoSlidingAlreadyDone
			isAutoSlidingAlreadyDone = true
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
		navigationController.snapToNextPage()
		browser_screen.image = slider.currentPage.image
		Utils.delay 1, ->
			yandex_bg_video.player.pause()
			if !isTeasingOptionalDone
				isTeasingOptionalDone = true
				teaseOptionalStep()
	
	else if currentPage == 1
		currentPage++
		current_step.stateSwitch("three")
		progress_bar.stateSwitch("end")
		titlesView.snapToNextPage()
		navigationController.snapToNextPage()
		Utils.delay 1, ->
			if !isAutoChoosingAlreadyDone
				isAutoChoosingAlreadyDone = true
				teaseZenChoosing()
	
	else if currentPage == 2
		currentPage++
		navigationController.snapToNextPage()
		progressView.snapToNextPage()
		toast_shape.animate("shown", { delay: 1 } )
		bro_logo.animate("shown", { delay: 1.2 })
		titlesView.snapToNextPage()

preNextButtonHandler = () ->
	if selectedSources > 3
		nextButtonHandler()

android_back = new Layer
	y: 2380
	width: 599
	height: 188

next_button.on(Events.Click, nextButtonHandler)
next_button_optional.on(Events.Click, nextButtonHandler)
zen_button.on(Events.Click, preNextButtonHandler)
android_back.on(Events.Click, backButtonHandler)

navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

status_bar = new Layer
	width: 360*retina
	height: 32*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "black"


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
	currentPage = 3
	navigationController.snapToPage(browser_screen)
# 	toast_shape.state
# 	if isLoginQueue() then zen_card.animate("shown", { delay: 2 })
	titlesView.snapToPage(title_step_4)
	finish_tutorial.stateSwitch("hidden", { time: 0.4 })
	progressView.snapToPage(empty_bar_right)
	browser_screen.image = slider.currentPage.image


openFinishTutorialModal = (event, layer) ->
	if currentPage == 2
		finish_tutorial.ignoreEvents = false
		modal_cancel_button.ignoreEvents = false
		modal_finish_button.ignoreEvents = false
		finish_tutorial.stateSwitch("shown", { time: 0.4 })
	else
		nextButtonHandler()

finish_tutorial.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "hidden"
		finish_tutorial.ignoreEvents = true
		modal_cancel_button.ignoreEvents = true
		modal_finish_button.ignoreEvents = true

finish_tutorial.stateSwitch("hidden")

progress_bar.on(Events.Click, openFinishTutorialModal)







for item in [screen, navigationController, fontsContainer, cardContainer, android_back, navbar, status_bar, finish_tutorial]
	item.parent = screenView