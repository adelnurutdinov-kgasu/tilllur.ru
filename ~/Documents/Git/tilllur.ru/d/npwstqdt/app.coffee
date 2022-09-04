
Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

screenView = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screenView, borderRadius: 16, topTheme: "light" }

retina = 1

smallDelay = 0.8
reorderTime = 0.4

# Global Step
globalStep = 0

isInitialStep = () ->
	return globalStep == 0

isBackgroundStep = () ->
	return globalStep == 1

isSitesStep = () ->
	return globalStep == 2

isZenStep = () ->
	return globalStep == 3

isWelcomeStep = () ->
	return globalStep == 4

isFinalStep = () ->
	return globalStep == 5

# Screen

screen = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(40,40,40,1)"

titleView = new PageComponent
	parent: screen
	width: 360*retina
	height: 140*retina
	y: 24*retina
	scrollVertical: false
	scrollHorizontal: false
# 	ignoreEvents: true

title_step_1 = new Layer
	parent: titleView.content
	width: 360*retina
	height: 140*retina
	x: 0*retina
	y: 0*retina
	image: "images/title step 1.png"
# 	ignoreEvents: true

title_step_2 = new Layer
	parent: titleView.content
	width: 360*retina
	height: 140*retina
	x: 360*retina
	y: 0*retina
	image: "images/title step 2.png"
# 	ignoreEvents: true

title_step_3 = new Layer
	parent: titleView.content
	width: 360*retina
	height: 140*retina
	x: 720*retina
	y: 0*retina
	backgroundColor: "transparent"



# Background context

slidesView = new PageComponent
	width: 360*retina
	height: 640*retina
	scrollVertical: false
	scrollHorizontal: false
	backgroundColor: "transparent"

background_sites = new Layer
	parent: slidesView.content
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 24*retina
	originY: 1
	image: "images/background 6.png"
	clip: true

background_sites.states =
	"base": { scale: 1 }
	"preview": { scale: 0.8 }

welcome_view = new Layer
	parent: slidesView.content
	width: 360*retina
	height: 535*retina
	x: 360*retina
	y: 57*retina
	image: "images/welcome view.png"

zen_view = new Layer
	parent: slidesView.content
	width: 360*retina
	height: 570*retina
	x: 720*retina
	y: 22*retina
	image: "images/zen view.png"

welcome_view.onClick ->
	slidesView.snapToNextPage()







# zen_view.states =
# 	"shown": { opacity: 1 }
# 	"hidden": { opacity: 0 }
# zen_view.stateSwitch("hidden")












search_view = new Layer
	parent: background_sites
	width: 334*retina
	height: 113*retina
	x: 16*retina
	y: 240*retina
	image: "images/seach view.png"

search_view.states =
	"shown": { opacity: 1, y: 240*retina }
	"hidden": { opacity: 0, y: 240*retina }
	"top-shown": { opacity: 1, y: 60*retina }
	"top-hidden": { opacity: 0, y: 60*retina }

search_view.stateSwitch("top-shown")




volumeHeight = 78*retina
volumeWidth = 164*retina
volumeX = 16*retina

volumeView = new Layer
	parent: background_sites
	width: volumeWidth
	height: volumeHeight
	image: "images/volume empty.png"
	x: 16*retina

volumeView.states =
	"shown": { opacity: 1, y: 0, x: volumeX }
	"hidden": { opacity: 0, y: 0, x: volumeX }
	"extra row 1": { opacity: 1, y: -volumeHeight, x: volumeX }
	"extra row 2": { opacity: 1, y: -volumeHeight * 2, x: volumeX }
	"less row 1": { opacity: 1, y: volumeHeight, x: volumeX }
	"one": { opacity: 1, y: volumeHeight, x: volumeX }

volumeView.stateSwitch("hidden")	


createVolume = (imagePath) ->
	currentVolumeNumber = volumeView.children.length
	
	previewVolume = new Layer
		width: volumeWidth
		height: volumeHeight
		image: "images/volume empty.png"
	
	if imagePath != undefined
		previewVolume.image = imagePath
	
	if currentVolumeNumber == 0
		previewVolume.image = "images/volume yandex.png"
	else
# 		previewVolume.on Events.Click, (event, layer) ->
# 			removeVolume(layer)
		
		if currentVolumeNumber > 1
			previewVolume.opacity = 0
			previewVolume.animate
				opacity: 1
				options: { time: reorderTime, delay: reorderTime }
			
	return previewVolume

removeVolume = (layer) ->
	layer.parent = null
	layer.destroy()
	reorderVolumes(reorderTime)

removeVolumeWithImage = (imagePath) ->
	volumes = volumeView.children
	for item in volumes
		if item.image is imagePath
			removeVolume(item)
			reorderVolumes(reorderTime)

wipeVolumes = () ->
	next_step_button.stateSwitch("skip")
	
	volumes = volumeView.children
	for item, i in volumes
		if item.image != "images/volume yandex.png"
			removeVolume(item)
	reorderVolumes()
	
	sitesToChooseArray = sites_to_choose_view.content.children
	sites_to_choose_view.scrollX = 0
	for item in sitesToChooseArray
		item.children[0].stateSwitch("hidden")
	
	backgroundToChooseArray = background_to_choose_view.content.children
	background_to_choose_view.scrollX = 0
	for item, i in backgroundToChooseArray
		item.children[0].stateSwitch("hidden")
		if i == 0 then item.children[0].stateSwitch("shown")
	

addVolume = (layer, animationTime) ->
	layer.parent = volumeView
	reorderVolumes(animationTime)

reorderVolumes = (animationTime) ->
	volumes = volumeView.children
	
	if animationTime is undefined
		animationTime = 0
	
	for volume, i in volumes
		reverseIndex = volumes.length - i - 1
		if volumes.length == 1
			reverseIndex = volumes.length - i
		volume.name = "volume #{i}"
		
		volume.animate
			x: reverseIndex % 2 * volumeWidth
			y: if reverseIndex % 2 == 0 then reverseIndex / 2 * volumeHeight else (reverseIndex - 1) / 2 * volumeHeight
			options: 
				time: animationTime
				delay: i * animationTime / 10




for index in [0...1]
	previewVolume = createVolume()
	if index is 0 then previewVolume.backgroundColor = "white"
	addVolume(previewVolume)
	
reorderVolumes()


# Added Block

addedSitesView = new Layer
	parent: background_sites
	width: volumeWidth*2
	x: 16*retina
	height: volumeHeight
	backgroundColor: "red"
	
addedSitesView.states =
	"shown": { y: 0 }
	"hidden": { y: -volumeHeight }
addedSitesView.stateSwitch("hidden")

addedVolume1 = new Layer
	parent: addedSitesView
	width: volumeWidth
	height: volumeHeight
	image: "images/site to choose 1.png"

addedVolume2 = new Layer
	parent: addedSitesView
	width: volumeWidth
	height: volumeHeight
	x: volumeWidth
	image: "images/site to choose 2.png"

nextStepHandler = (event, layer) ->
	if isInitialStep()
		globalStep = 1
# 		titleView.scrollToLayer(title_step_1, {0, 0}, false, 1)
		configure_browser.ignoreEvents = true
		next_step_button_view.ignoreEvents = false
		
		welcome_popup.animate("hidden", options: { time: reorderTime / 2})
		background_sites.animate("preview")
		bottom_buttons_view.stateSwitch("shown")
		background_bottom_view.animate("shown")
	
	else if isBackgroundStep()
		globalStep = 2
		titleView.scrollToLayer(title_step_2)
		background_bottom_view.animate("hidden")
		next_step_button.stateSwitch("skip")
		sites_bottom_view.animate("shown", options: { delay: reorderTime / 2 })
		search_view.animate("top-hidden")
		volumeView.animate("shown")
	
	else if isSitesStep()
		globalStep = 3
		next_step_button_view.ignoreEvents = true
# 		restart_popup.ignoreEvents = false

		slidesView.snapToNextPage()
		titleView.scrollToLayer(title_step_3)
		
		
		background_sites.animate("base")
		search_view.stateSwitch("hidden")
		search_view.animate("shown")
		bottom_buttons_view.stateSwitch("hidden")
		sites_bottom_view.animate("hidden")
# 		restart_popup.animate("shown", options: { delay: reorderTime * 5 })
		
		
		if volumeView.children.length > 6
			volumeView.animate("extra row 2")
		else if volumeView.children.length > 4
			volumeView.animate("extra row 1")
		else if volumeView.children.length < 3
			volumeView.animate("less row 1")
			addedSitesView.animate("shown")
			
			if volumeView.children.length == 1
				volumeView.children[0].animate(x: 0)
		
	
	else if isFinalStep()
		globalStep = 0
		titleView.scrollToLayer(title_step_1)
		wipeVolumes()
		configure_browser.ignoreEvents = false
		restart_popup.ignoreEvents = true
		
		restart_popup.stateSwitch("hidden")
		addedSitesView.stateSwitch("hidden")
		search_view.animate("top-shown")
		volumeView.stateSwitch("hidden")
		welcome_popup.animate("shown", options: { delay: reorderTime * 3 })
		
		background_sites.image = "images/background 6.png"
		



# Bottom View: Background

background_bottom_view = new Layer
	width: 360*retina
	height: 228*retina
	x: 0*retina
	backgroundColor: "rgba(255,255,255,1)"

background_bottom_view.states =
	"shown": { y: screen.height - 48*retina - background_bottom_view.height }
	"hidden": { y: screen.height }

background_bottom_view.stateSwitch("hidden")


backgroundToChooseNumber = 6
backgroundToChooseWidth = 100*retina
backgroundToChooseHeight = 140*retina
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
		checkBackgroundCounter()
		
		for item in background_bottom_view.children[0].content.children
			item.children[0].stateSwitch("hidden")
		
		if selectedLayer.states.current.name is "hidden"
			selectedLayer.stateSwitch("shown")
		else
			selectedLayer.stateSwitch("hidden")

		


# Bottom View: Sites

sites_bottom_view = new Layer
	width: 360*retina
	height: 156*retina
	x: 0*retina
	backgroundColor: "rgba(255,255,255,1)"

sites_bottom_view.states =
	"shown": { y: screen.height - 48*retina - sites_bottom_view.height }
	"hidden": { y: screen.height }

sites_bottom_view.stateSwitch("hidden")


sitesToChooseNumber = 6
sitesToChooseWidth = 140*retina
sitesToChooseHeight = 70*retina
sitesToChooseOffset = 12*retina

checkSitesCounter = () ->
	selectedSitesCounter = 0
	
	for item in sites_to_choose_view.content.children
		if item.children[0].states.current.name == "shown"
			selectedSitesCounter++
	
	if selectedSitesCounter > 0
		next_step_button.stateSwitch("save")
	else
		next_step_button.stateSwitch("skip")


sites_to_choose_view = new ScrollComponent
	parent: sites_bottom_view
	width: 360*retina
	height: 70*retina
	x: 0*retina
	y: 12*retina
	backgroundColor: "rgba(255,255,255,1)"
	scrollVertical: false
	contentInset: 
		right: sitesToChooseOffset

for itemIndex in [0...sitesToChooseNumber]
	site_to_choose = new Layer
		parent: sites_to_choose_view.content
		width: sitesToChooseWidth
		height: sitesToChooseHeight
		x: sitesToChooseWidth * itemIndex + sitesToChooseOffset
		name: "site to choose #{sitesToChooseNumber - itemIndex}"
		image: "images/site to choose #{sitesToChooseNumber - itemIndex}.png"
	
	site_to_choose_selected = new Layer
		parent: site_to_choose
		width: sitesToChooseWidth
		height: sitesToChooseHeight
		image: "images/site to choose selected.png"
	
	site_to_choose_selected.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	
	site_to_choose_selected.stateSwitch("hidden")
	
	site_to_choose.on Events.Click, (event, layer) ->
		selectedLayer = layer.children[0]
		if selectedLayer.states.current.name is "hidden"
			selectedLayer.stateSwitch("shown")
			checkSitesCounter()
			
			previewVolume = createVolume(layer.image)
			addVolume(previewVolume, reorderTime)
			
		else
			selectedLayer.stateSwitch("hidden")
			checkSitesCounter()
			
			removeVolumeWithImage(layer.image)
		


# Bottom View: Buttons

# bottom_buttons_view = new Layer
# 	width: 360*retina
# 	height: 64*retina
# 	x: 0*retina
# 	y: 528*retina
# 	backgroundColor: "rgba(255,255,255,1)"
# 
# sites_bottom_view_choose_button = new Layer
# 	parent: bottom_buttons_view
# 	width: 162*retina
# 	height: 40*retina
# 	x: 186*retina
# 	y: 12*retina
# 
# sites_bottom_view_choose_button.states =
# 	"wait": { image: "images/sites bottom view choose button.png" }
# 	"save": { image: "images/sites bottom view save button.png" }
# 
# sites_bottom_view_choose_button.stateSwitch("wait")
# 
# 
# sites_bottom_view_skip_button = new Layer
# 	parent: bottom_buttons_view
# 	width: 162*retina
# 	height: 40*retina
# 	x: 12*retina
# 	y: 12*retina
# 	image: "images/sites bottom view skip button.png"
# 
# sites_bottom_view_choose_button.on(Events.Click, maybeSaveSitesHandler)
# sites_bottom_view_skip_button.on(Events.Click, saveSitesHandler)


bottom_buttons_view = new Layer
	width: 360*retina
	height: 64*retina
	x: 0*retina
	y: 528*retina
	backgroundColor: "rgba(255,255,255,1)"

bottom_buttons_view.states = 
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
bottom_buttons_view.stateSwitch("hidden")

next_step_button_view = new Layer
	parent: bottom_buttons_view
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 12*retina
	backgroundColor: "transparent"

next_step_button_view.states = 
	"shown": { opacity: 1 }
	"hover": { opacity: 0.5 }
next_step_button_view.stateSwitch("shown")

next_step_button_view.on(Events.Click, nextStepHandler)

next_step_button = new Layer
	parent: next_step_button_view
	width: 336*retina
	height: 40*retina
	image: "images/skip button.png"

next_step_button.states = 
	"save": { image: "images/save button.png" }
	"skip": { image: "images/skip button.png" }
next_step_button.stateSwitch("skip")



# Popup

darker = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "#000"

darker.states = 
	"shown": { opacity: 0.5 }
	"hidden": { opacity: 0 }
	
darker.stateSwitch("hidden")


# sites_popup = new Layer
# 	width: 340*retina
# 	height: 207*retina
# 	x: 10*retina
# 	image: "images/sites popup.png"
# 	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}
# 	
# sites_popup.states =
# 	"shown": { opacity: 1, y: 88*retina }
# 	"hidden": { opacity: 0, y: 128*retina }
# 
# sites_popup.stateSwitch("hidden")	
# # sites_popup.animate("shown")
# 
# sites_add_button = new Layer
# 	parent: sites_popup
# 	width: 172*retina
# 	height: 40*retina
# 	x: 156*retina
# 	y: 155*retina
# 	image: "images/sites add button.png"
# 
# sites_skip_button = new Layer
# 	parent: sites_popup
# 	width: 132*retina
# 	height: 40*retina
# 	x: 12*retina
# 	y: 155*retina
# 	image: "images/sites skip button.png"


# addSitesHandler = (event, layer) ->
# 	background_sites.animate("preview")
# 	sites_bottom_view.animate("shown")
# 	sites_popup.animate("hidden")
# 	search_view.animate("hidden")

# skipSitesHandler = (event, layer) ->
# 	background_sites.animate("base")
# 	sites_bottom_view.animate("hidden")
# 	sites_popup.animate("shown", delay: smallDelay)
# 	search_view.animate("shown")

# maybeSaveSitesHandler = (event, layer) ->
# 	if layer.image is "images/sites bottom view save button.png"
# 		saveSitesHandler(event, layer)
# 
# saveSitesHandler = (event, layer) ->
# 	background_sites.animate("base")
# 	sites_bottom_view.animate("hidden")
# 	search_view.animate("shown")
# 	restart_popup.animate("shown", options: { delay: 1 })
# 	restart_popup.on(Events.Click, startSimulationHandler)
# 
# sites_add_button.on(Events.Click, addSitesHandler)
# sites_skip_button.on(Events.Click, skipSitesHandler)




welcome_popup = new Layer
	width: 340*retina
	height: 298*retina
	x: 10*retina
	y: 284*retina
	image: "images/welcome popup.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

welcome_popup.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

welcome_popup.stateSwitch("shown")	

configure_browser = new Layer
	parent: welcome_popup
	width: 316*retina
	height: 40*retina
	x: 12*retina
	y: 144*retina
	image: "images/configure browser.png"


# showSitesStep = (event, layer) ->
# 	welcome_popup.animate("hidden", options: { time: reorderTime / 2})
# 	search_view.animate("shown")
# 	darker.animate("hidden")
# 	sites_popup.animate("shown", options: { delay: reorderTime * 3 })

# showBackgroundStep = (event, layer) ->
# 	globalStep = 1
# 	configure_browser.ignoreEvents = true
# 	
# 	welcome_popup.animate("hidden", options: { time: reorderTime / 2})
# 	background_sites.animate("preview")
# 	bottom_buttons_view.stateSwitch("shown")
# 	background_bottom_view.animate("shown")
	
configure_browser.on(Events.Click, nextStepHandler)




restart_popup = new Layer
	width: 356*retina
	height: 80*retina
	x: 2*retina
	y: 510*retina
	image: "images/restart popup.png"
	
restart_popup.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

restart_popup.stateSwitch("hidden")	
restart_popup.on(Events.Click, nextStepHandler)

# startSimulationHandler = (event, layer) ->
# 	restart_popup.off(Events.Click, startSimulationHandler)
# 	restart_popup.animate("hidden", options: { time: reorderTime / 2})
# # 	darker.animate("shown")
# 	welcome_popup.animate("shown")
# 	wipeVolumes()






status_bar = new Layer
	width: 360*retina
	height: 32*retina
	backgroundColor: "#000"

navbar = new Layer

	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

for item in [screen, slidesView, background_bottom_view, sites_bottom_view, bottom_buttons_view, darker, welcome_popup, restart_popup, status_bar, navbar]
	item.parent = screenView

