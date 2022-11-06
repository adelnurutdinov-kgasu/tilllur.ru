Input = require 'input'

# Import from Figma
# Generated with Framer Inventory

figmaView = new Layer
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	backgroundColor: "rgba(0, 0, 0, 1)"


wallpaper = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 640
	opacity: 1
	image: "images/figma/wallpaper.png"



newTabContent = new Layer
	parent: figmaView
	x: 0
	y: 152
	width: 360
	height: 488
	opacity: 1
	image: "images/figma/newTabContent.png"


statusBar = new Layer
	parent: figmaView
	x: 0
	y: 0
	width: 360
	height: 24
	opacity: 1
	backgroundColor: "rgba(0,0,0,1)"




for item in [newTabContent]
	item.states =
		"hidden":
			opacity: 0
		"shown":
			opacity: 1


darker = new Layer
	parent: figmaView
	width: wallpaper.width
	height: wallpaper.height
	backgroundColor: "rgba(0,0,0,0.5)"

darker.states =
	"shown":
		opacity: 1
	"hidden":
		opacity: 0

darker.stateSwitch("hidden")


darker.placeBefore(wallpaper)
darker.style =
	"-webkit-backdrop-filter": "blur(8px)"

newTabContent.on Events.StateSwitchStart, (from, to) ->
	if from != to
		darker.animate(from, curve: Spring(damping: 1), time: 0.5)

siteNames = ["soundcloud.com", "figma.com", "framer.com", "yandex.ru", "vk.com", "youtube.com", "yandex.ru/pogoda", "zen.yandex.ru", "apple.com", "3dnews.ru", "dtf.ru", "championat.com"]

# Colors
siteColors = {}

for currentName in siteNames
	currentColor = Utils.randomColor()
	if currentName == "soundcloud.com" then currentColor = "#EE6F2E"
	else if currentName == "yandex.ru" then currentColor = "#FFF"
	else if currentName == "yandex.ru/pogoda" then currentColor = "#FFF"
	else if currentName == "zen.yandex.ru" then currentColor = "#FFF"
	else if currentName == "figma.com" then currentColor = "#222"
	else if currentName == "framer.com" then currentColor = "#4476F7"
	else if currentName == "vk.com" then currentColor = "#56789F"
	else if currentName == "youtube.com" then currentColor = "#EB3223"
	else if currentName == "apple.com" then currentColor = "#676767"
	else if currentName == "3dnews.ru" then currentColor = "#FFFFFF"
	else if currentName == "dtf.ru" then currentColor = "#A2D3E9"
	else if currentName == "championat.com" then currentColor = "#E05E33"
	

	
	siteColors[currentName] = currentColor

# print siteColors["yandex.ru"]

selectedSites = []
selectedSites.push("yandex.ru")
siteNames = siteNames.filter (x) -> x != "yandex.ru"

# Cell

createEmptyCell = (siteName) ->
	siteLayer = new Layer
		width: 104
		height: 64
		borderRadius: 6
		borderColor: "rgba(0,0,0,0.1)"
		borderWidth: 1
		backgroundColor: "rgba(0,0,0,0.2)"
		name: "empty"
	
	siteLayer.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 0.7
	
	textLayer = new TextLayer
		parent: siteLayer
		text: "re"
		fontSize: 12
		width: 104
		textAlign: "center"
		color: "white"
		padding:
			top: 24
		text: siteName
		opacity: 0
	
	if siteName == "yandex.ru" or siteName == "zen.yandex.ru" or siteName == "yandex.ru/pogoda" or siteName == "3dnews.ru"
		textLayer.color = "black"
	
	tick = new Layer
		parent: siteLayer
		size: 24
		x: 4
		y: 4
		backgroundColor: "black"
		borderRadius: "100%"
		borderColor: "white"
		borderWidth: 2
	
	tick.states =
		"shown":
			opacity: 0
		"hidden":
			opacity: 1
	
	tick.stateSwitch("shown")
	
	siteLayer.on Events.StateSwitchStart, (from, to, event, layer) ->
		layer.children[1].stateSwitch(to)
	
	
	return siteLayer



createCell = (siteName, active = false) ->
	siteLayer = createEmptyCell(siteName)
	siteLayer.borderColor = "rgba(0,0,0,0.1)"
	siteLayer.borderWidth = 1
	siteLayer.backgroundColor = siteColors[siteName]
	siteLayer.name = siteName
	siteLayer.children[0].opacity = 1
	
	if active
		siteLayer.on Events.TapEnd, (event, layer) ->
			toggleSite(layer.name)
	else
		siteLayer.children[1].states.hidden.opacity = 0
		siteLayer.children[1].stateSwitch("hidden")
		
	
	return siteLayer






# Sheet

sheetView = new Layer
	parent: figmaView
	width: 360
	height: 640
	backgroundColor: "white"
	borderRadius: 12
	clip: true
	shadowY: -4
	shadowBlur: 10
	shadowColor: "rgba(0,0,0,0.4)"

sheetView.states =
	"shown":
		y: 240
	"hidden":
		y: 640

sheetView.stateSwitch("hidden")
# sheetView.stateSwitch("shown")


sheetScroll = new ScrollComponent
	width: 360
	height: 400
	parent: sheetView
	scrollHorizontal: false



sheetScroll.content.on "change:y", ->
	if sheetScroll.scrollY > 0
		whiterRule.stateSwitch("shown")
	else
		whiterRule.stateSwitch("hidden")



doneButton = new Layer
	parent: sheetView
	y: 400 - 86
	width: 360
	height: 86
	image: "images/done button.png"


doneButton.on Events.TapEnd, ->
	for currentName in selectedSites
		siteNames = siteNames.filter (x) -> x != currentName
		composeSuggestSites()
		
	siteView.animate("one", curve: Spring(damping: 1), time: 0.5)
	sheetView.animate("hidden", curve: Spring(damping: 1), time: 0.5)

sheetView.on Events.StateSwitchStart, (from, to) ->
	if from != to
		try newTabContent.animate(from, curve: Spring(damping: 1), time: 0.5)



# Site View

siteView = new Layer
	parent: figmaView
	width: 360
	height: 640
	backgroundColor: "null"

siteView.states =
	"one":
		y: -536 + 8
	"two":
		y: -464 + 8
	"three":
		y: -464 + 72 + 8
	"four":
		y: -464 + 72 * 2 + 8
	"five":
		y: -464 + 72 * 3 + 8

siteView.stateSwitch("one")
siteView.placeBehind(sheetView)

siteView.on Events.TapEnd, ->
	sheetScroll.scrollToTop(false)
	teaseSites()
	sheetView.animate("shown", curve: Spring(damping: 1), time: 0.5)


emptyView = new Layer
	parent: siteView
	width: 360
	height: 640
	backgroundColor: "null"


contentView = new Layer
	parent: siteView
	width: 360
	height: 640
	backgroundColor: "null"





composeEmpty = () ->
	for currentName, i in siteNames
		currentLayer = createEmptyCell(currentName)
		currentLayer.parent = emptyView
		currentLayer.x = i % 3 * (104+8) + 16
		currentLayer.y = 640 - ((i - i % 3) / 3 + 1) * (64 + 8)

composeSites = () ->
	for item in contentView.children
		for child in item
			child.destroy()
		item.destroy()
	
	for currentName, i in selectedSites
		currentLayer = createCell(currentName)
		currentLayer.parent = contentView
		currentLayer.x = i % 3 * (104+8) + 16
		currentLayer.y = 640 - ((i - i % 3) / 3 + 1) * (64 + 8)

# Suggest

suggestView = new Layer
	scrollHorizontal: false
	parent: sheetScroll.content
	width: 360
	height: 640
	y: 156
	backgroundColor: "null"

header = new Layer
	width: 360
	height: 156
	image: "images/header.png"
	parent: sheetScroll.content



whiter = new Layer
	parent: sheetScroll
	width: 360
	height: 72
	image: "images/whiter.png"

whiter.states =
	"hidden":
		opacity: 0
	"shown":
		opacity: 1

whiter.stateSwitch("hidden")

whiterRule = new Layer
	size: 16
	opacity: 0

whiterRule.states =
	"hidden":
		opacity: 0
	"shown":
		opacity: 0

whiterRule.stateSwitch("hidden")

whiterRule.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		whiter.animate(to, time: 0.2)
	



composeSuggestSites = () ->
	for item in suggestView.children
		for child in item
			child.destroy()
		item.destroy()
	
	for currentName, i in siteNames
		currentLayer = createCell(currentName, true)
		currentLayer.parent = suggestView
		currentLayer.x = i % 3 * (104+8) + 16
		currentLayer.y = (i - i % 3) / 3 * (64 + 8)

# Input

addInput = new Input.Input
	placeholder: "yandex.ru"
	virtualKeyboard: false
	placeholderColor: "rgba(0,0,0,0.2)"
	textColor: "rgba(0,0,0,1)"
	backgroundColor: "rgba(0,0,0,0)"
	lineHeight: 1
	width: 360 - 32 * 2
	height: 52 / 3 * 2
	parent: sheetScroll.content
	y: 44
	x: 24

addInput.style =
	fontSize: "16px"

addInput.onFocus ->
	
# 	print "0: #{@value}"

addInput.onBlur ->
# 	print "1: #{@value}"

Events.wrap(addInput.form).addEventListener "submit", ->
	newAddress = addInput.value
	addInput.value = ""
	
	if isAlreadyAdded(newAddress)
		if isAlreadySelected(newAddress)
			toggleSite(newAddress)
			toggleSite(newAddress)
		else
			toggleSite(newAddress)
	else
		siteNames = [newAddress].concat siteNames
		siteColors[newAddress] = Utils.randomColor()
		
		composeSuggestSites()
		toggleSite(newAddress)
		
# 	print "Done"

composeEmpty()
composeSites()
composeSuggestSites()



toggleSite = (siteName) ->
	if isAlreadySelected(siteName)
		removeSite(siteName)
	else
		addSite(siteName)
	
	composeSites()
	teaseSites()

isAlreadySelected = (siteName) ->
	for item in selectedSites
		if item == siteName then return true
	return false

isAlreadyAdded = (siteName) ->
	for item in siteNames
		if item == siteName then return true
	return false

removeSite = (siteName) ->
	selectedSites = selectedSites.filter (x) -> x != siteName
# 	print "Removed " + siteName

addSite = (siteName) ->
	selectedSites.push(siteName)





teaseSuggest = () ->
	for siteLayer in suggestView.children
		siteName = siteLayer.name
		if isAlreadySelected(siteName)
			siteLayer.stateSwitch("hidden")
		else
			siteLayer.stateSwitch("shown")


teaseSites = () ->
	teaseSuggest()
	
	selectedCount = selectedSites.length
	nextState = "one"
	
	if selectedCount >= 12 then nextState = "five"
	else if selectedCount >= 9 then nextState = "four"
	else if selectedCount >= 6 then nextState = "three"
	else if selectedCount >= 3 then nextState = "two"
	else nextState = "one"
	
	siteView.animate(nextState, curve: Spring(damping: 1), time: 0.5)

# test1 = ["hello", "world", "peace"]


# statusBar.bringToFront()
# statusBar.opacity = 0

# box = new Layer


{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, statusBar: "light" }