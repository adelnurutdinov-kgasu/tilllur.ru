Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

retina = 1

smallDelay = 0.8
reorderTime = 0.4

screen = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(68,68,68,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

# Background flow

background_sites = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 24*retina
	image: "images/background sites.png"

background_sites.states =
	"base": { scale: 1 }
	"preview": { scale: 0.8 }


search_view = new Layer
	parent: background_sites
	width: 334*retina
	height: 113*retina
	x: 16*retina
	y: 240*retina
	image: "images/seach view.png"

search_view.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

search_view.stateSwitch("shown")




volumeHeight = 78*retina
volumeWidth = 164*retina

volumeView = new Layer
	parent: background_sites
	width: volumeWidth
	height: volumeHeight
	image: "images/volume empty.png"
	x: 16*retina

volumeView.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

volumeView.stateSwitch("shown")	


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
		previewVolume.on Events.Click, (event, layer) ->
			removeVolume(layer)
		
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
	sites_bottom_view_choose_button.stateSwitch("wait")
	selectedSitesCounter = 0
	
	volumes = volumeView.children
	for item, i in volumes
		if item.image != "images/volume yandex.png"
			removeVolume(item)
	
	sitesToChooseArray = sites_to_choose_view.content.children
	sites_to_choose_view.scrollX = 0
	for site in sitesToChooseArray
		site.children[0].stateSwitch("hidden")

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
	
darker.stateSwitch("shown")


sites_popup = new Layer
	width: 340*retina
	height: 207*retina
	x: 10*retina
	image: "images/sites popup.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}
	
sites_popup.states =
	"shown": { opacity: 1, y: 88*retina }
	"hidden": { opacity: 0, y: 128*retina }

sites_popup.stateSwitch("hidden")	
# sites_popup.animate("shown")

sites_add_button = new Layer
	parent: sites_popup
	width: 172*retina
	height: 40*retina
	x: 156*retina
	y: 155*retina
	image: "images/sites add button.png"

sites_skip_button = new Layer
	parent: sites_popup
	width: 132*retina
	height: 40*retina
	x: 12*retina
	y: 155*retina
	image: "images/sites skip button.png"


addSitesHandler = (event, layer) ->
	background_sites.animate("preview", curve: Spring(damping: 1), time: 0.5)
	sites_bottom_view.animate("shown", curve: Spring(damping: 1), time: 0.5)
	sites_popup.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	search_view.animate("hidden", curve: Spring(damping: 1), time: 0.5)

# skipSitesHandler = (event, layer) ->
# 	background_sites.animate("base")
# 	sites_bottom_view.animate("hidden")
# 	sites_popup.animate("shown", delay: smallDelay)
# 	search_view.animate("shown")

maybeSaveSitesHandler = (event, layer) ->
	if layer.image is "images/sites bottom view save button.png"
		saveSitesHandler(event, layer)

saveSitesHandler = (event, layer) ->
	background_sites.animate("base", curve: Spring(damping: 1), time: 0.5)
	sites_bottom_view.animate("hidden", curve: Spring(damping: 1), time: 0.5)
	search_view.animate("shown")
	restart_popup.animate("shown", options: { delay: 1 })
	restart_popup.on(Events.Click, startSimulationHandler)

sites_add_button.on(Events.Click, addSitesHandler)
# sites_skip_button.on(Events.Click, skipSitesHandler)




welcome_popup = new Layer
	width: 340*retina
	height: 298*retina
	x: 10*retina
	y: 163*retina
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

showSitesStep = (event, layer) ->
	welcome_popup.animate("hidden", options: { time: reorderTime / 2})
	search_view.animate("shown")
	darker.animate("hidden")
	sites_popup.animate("shown", options: { delay: reorderTime * 3 })
	
# 	wipeVolumes()
# 	volumeView.animate("shown")
	
configure_browser.on(Events.Click, showSitesStep)




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

startSimulationHandler = (event, layer) ->
	restart_popup.off(Events.Click, startSimulationHandler)
	restart_popup.animate("hidden", options: { time: reorderTime / 2})
	darker.animate("shown", curve: Spring(damping: 1), time: 0.5)
	welcome_popup.animate("shown", curve: Spring(damping: 1), time: 0.5)
	wipeVolumes()




# Bottom View

sites_bottom_view = new Layer
	width: 360*retina
	height: 156*retina
	x: 0*retina
	backgroundColor: "rgba(255,255,255,1)"

sites_bottom_view.states =
	"shown": { y: 436*retina }
	"hidden": { y: 640*retina }

sites_bottom_view.stateSwitch("hidden")

sites_bottom_view_choose_button = new Layer
	parent: sites_bottom_view
	width: 162*retina
	height: 40*retina
	x: 186*retina
	y: 104*retina

sites_bottom_view_choose_button.states =
	"wait": { image: "images/sites bottom view choose button.png" }
	"save": { image: "images/sites bottom view save button.png" }

sites_bottom_view_choose_button.stateSwitch("wait")


sites_bottom_view_skip_button = new Layer
	parent: sites_bottom_view
	width: 162*retina
	height: 40*retina
	x: 12*retina
	y: 104*retina
	image: "images/sites bottom view skip button.png"

sites_bottom_view_choose_button.on(Events.Click, maybeSaveSitesHandler)
sites_bottom_view_skip_button.on(Events.Click, saveSitesHandler)


sitesToChooseNumber = 6
sitesToChooseWidth = 140*retina
sitesToChooseHeight = 70*retina
sitesToChooseOffset = 12*retina
selectedSitesCounter = 0

checkSitesCounter = () ->
	if selectedSitesCounter > 0
		sites_bottom_view_choose_button.stateSwitch("save")
	else
		sites_bottom_view_choose_button.stateSwitch("wait")

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
			selectedSitesCounter++
			checkSitesCounter()
			
			previewVolume = createVolume(layer.image)
			addVolume(previewVolume, reorderTime)
			
		else
			selectedLayer.stateSwitch("hidden")
			selectedSitesCounter--
			checkSitesCounter()
			
			removeVolumeWithImage(layer.image)
		





status_bar = new Layer
	width: 360*retina
	height: 32*retina
	backgroundColor: "black"

navbar = new Layer

	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"


for item in [background_sites, darker, sites_popup, welcome_popup, restart_popup, sites_bottom_view, status_bar, navbar]
	item.parent = screen


