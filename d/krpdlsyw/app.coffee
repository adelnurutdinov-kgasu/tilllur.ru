Framer.Extras.Hints.disable()
document.body.style.cursor = "auto"

# Data = require "result"
Data = require "all"
answerData = []

# https://dl.dropboxusercontent.com/s/w2pq88tmhjzwmcj/blur_layers_2.json
# https://dl.dropboxusercontent.com/s/jrlo5b2xu5vi8v7/blur_layers_1.json
# https://dl.dropboxusercontent.com/s/8q1wk9xjd8s5zso/pre-filtered.json
# https://dl.dropboxusercontent.com/s/ccz5dc0xb673tay/0-500%20results%202f.json
# https://dl.dropboxusercontent.com/s/tqx8u7wtex1jozg/result.json

# Data.wallpapers = JSON.parse Utils.domLoadDataSync decodeURIComponent("http://timurnurutdinov.github.io/timeline/json/wallpapers/uragan-server.json")

# URL: json, blur, start, finish

startIndex = 0
finishIndex = Data.wallpapers.length - 1
blurEnabled = false

queryArray = location.search[1..].split('&')
for item in queryArray
	keyValuePair = item.split("=")
	
	if keyValuePair[0] == "start"
		startIndex = parseInt(keyValuePair[1])
	
	else if keyValuePair[0] == "finish"
		finishIndex = parseInt(keyValuePair[1])
	
	else if keyValuePair[0] == "blur"
		if keyValuePair[1] == "true" then blurEnabled = true
		else if keyValuePair[1] == "false" then blurEnabled = false
	
	else if keyValuePair[0] == "json"
		if keyValuePair[1] == "blur"
			Data = require "blur"
			blurEnabled = false
		else if keyValuePair[1] == "all"
			Data = require "all"
		else
			Data.wallpapers = JSON.parse Utils.domLoadDataSync decodeURIComponent(keyValuePair[1])



if startIndex > Data.wallpapers.length - 1 then startIndex = Data.wallpapers.length - 1
if finishIndex > Data.wallpapers.length - 1 then finishIndex = Data.wallpapers.length - 1
if startIndex > finishIndex then startIndex = finishIndex

wallpapersRange = Data.wallpapers.slice(startIndex, finishIndex)
wallpaperIndex = 0

finishIndex = finishIndex - startIndex - 1
startIndex = 0



selectedWallpaper = () ->
	if wallpaperIndex < 0 then wallpaperIndex = 0
	else if wallpaperIndex >= finishIndex then wallpaperIndex = finishIndex
	
	return wallpapersRange[wallpaperIndex]

nextWallpaper = () ->
	
	wallpaperIndex++
	print selectedWallpaper().mobile1920
	return selectedWallpaper()

prevWallpaper = () ->
	wallpaperIndex--
	return selectedWallpaper()



imagePresets = ["images/rep1.png", "images/rep2.png"]

MAX_CHANGE = 0.07
SCALE_FACTOR = 1
PHONE_WIDTH = 360 * SCALE_FACTOR
PHONE_HEIGHT = 640 * SCALE_FACTOR
PHONE_SC = 1

# Helpers

addToLeft = (layerArray) ->
	currentX = 16
	for item in layerArray
		item.x = currentX
		currentX += item.width + 16

addToRight = (layerArray) ->
	currentX = Canvas.width
	for item in layerArray
		currentX = currentX - item.width - 16
		item.x = currentX

addToCenter = (layerArray, localPadding = 16) ->
	sumX = (layerArray.length - 1) * localPadding
	for item in layerArray
		sumX += item.width
	
	currentX = (Canvas.width - sumX) / 2
	for item in layerArray
		item.x = currentX
		currentX += item.width + localPadding

# Logic


Canvas.backgroundColor = "#222"

plateView = new Layer
	width: Screen.width
	height: Screen.height
	x: Align.center()
	y: Align.center()
	backgroundColor: "#transparent"

phoneView = new Layer
	width: PHONE_WIDTH
	height: PHONE_HEIGHT
	scale: PHONE_SC
	parent: plateView
	backgroundColor: "transparent"
	borderRadius: 12
	clip: true

dotSize = 6
dotsView = new Layer
	width: Screen.width
	height: dotSize
	parent: plateView
	backgroundColor: "transparent"


pagesView = new PageComponent
	width: phoneView.width
	height: phoneView.height
	parent: phoneView
	scrollVertical: false
	scrollHorizontal: false
	backgroundColor: "transparent"

pagesView.content.draggable.overdrag = false



for i in [0, 1, 2]
	page = new Layer
		x: phoneView.width * i
		width: phoneView.width
		height: phoneView.height
		parent: pagesView.content
		backgroundColor: "#EEEEEE"
	
	if i == 0
		page.width = phoneView.width / 3
		page.x = 0
	else if i == 1
		page.width = phoneView.width
		page.x = phoneView.width / 3
	else
		page.width = phoneView.width / 3
		page.x = phoneView.width / 3 + phoneView.width

pagesView.content.children[1].bringToFront()
pagesView.snapToPage(pagesView.content.children[1], false)
# pagesView.snapToPage(pagesView.content.children[0], true)



# Blur Box
box = new Layer
	width: phoneView.width
	height: phoneView.height
	backgroundColor: "rgba(0,0,0,0.03)"
	parent: phoneView

box.style =
	"-webkit-backdrop-filter": "blur(40px)"
	"backdrop-filter": "blur(40px)"

box.states =
	"blur":
		style:
			"-webkit-backdrop-filter": "blur(40px)"
			"backdrop-filter": "blur(40px)"
	"none":
		style:
			"-webkit-backdrop-filter": "blur(0px)"
			"backdrop-filter": "blur(0px)"

if blurEnabled then box.stateSwitch("blur") else box.stateSwitch("none")
delete box.states.default



phoneViewBorder = new Layer
	width: PHONE_WIDTH
	height: PHONE_HEIGHT
	scale: PHONE_SC
	parent: plateView
	borderWidth: 2
	opacity: 0
	borderColor: "red"
	backgroundColor: "transparent"

imageView = new Layer
	width: 2000
	height: 2000
	originX: 0
	originY: 0
	parent: pagesView.content.children[1]

imageView.sendToBack()

imageRaw = new Layer
	width: 1920
	height: 1080
	parent: imageView
	scale: 1.8519

imageRaw.center()

ntpView = new Layer
	width: PHONE_WIDTH
	height: PHONE_HEIGHT
	parent: phoneView
	backgroundColor: "transparent"

ntpViewPageComponent = new PageComponent
	parent: ntpView
	width: ntpView.width
	height: ntpView.height
	scrollVertical: false

createDots = (dotsCount) ->
	for child in dotsView.children
		child.destroy()
	
	for i in [0...dotsCount]
		dot = new Layer
			size: dotSize
			parent: dotsView
			borderRadius: dotSize
		dot.states =
			"shown": { backgroundColor: "rgba(255,255,255,0.6)" }
			"hidden": { backgroundColor: "rgba(255,255,255,0.1)" }
		if i == 0 then dot.stateSwitch("shown") else dot.stateSwitch("hidden")
	
	addToCenter(dotsView.children, dotSize + 4)

createPage = (index) ->
	return new Layer
		width: ntpView.width
		height: ntpView.height
		x: ntpView.width * index
		parent: ntpViewPageComponent.content

for imageURL, i in imagePresets
	localPage = createPage(i)
	localPage.image = imageURL
	localPage.name = imageURL.replace("images/", "")

createDots(imagePresets.length)


ntpViewPageComponent.on "change:currentPage", ->
	currentUILayer.text = ntpViewPageComponent.currentPage.name
	
	for customPage, pageIndex in ntpViewPageComponent.content.children
		if customPage is ntpViewPageComponent.currentPage
			try dotsView.children[pageIndex].stateSwitch("shown")
		else
			try dotsView.children[pageIndex].stateSwitch("hidden")
		



IMAGE_SCALE_FACTOR = 1.05

vWidth = phoneView.width
vHeight = phoneView.height

dWidth = imageView.width
dHeight = imageView.height

scaleX = vWidth / dWidth
scaleY = vHeight / dHeight
scale = Math.max(scaleX, scaleY) * IMAGE_SCALE_FACTOR

dxToCenter = (vWidth - (dWidth * scale)) / 2
dyToCenter = (vHeight - (dHeight * scale)) / 2

dxToCenterPoints = dxToCenter / SCALE_FACTOR
dyToCenterPoints = dyToCenter / SCALE_FACTOR

imageView.scale = scale
imageView.x = dxToCenter
imageView.y = dyToCenter




textView = new TextLayer
	parent: plateView
	originX: 0
	originY: 0
	scale: 0.8
	x: 20
	y: 20
	fontWeight: 600
	textAlign: "left"
	fontSize: 20
	text: ""
	color: "black"
	opacity: 0

textView.text = "sc:   " + scale + "\n" + "dx: " + dxToCenterPoints + " dp\n" + "dy: " + dyToCenterPoints + " dp"

# Parallax

# inXBounds = [0, PHONE_WIDTH]
# inYBounds = [0, PHONE_HEIGHT]
# 
# outXBounds = [dxToCenter - 8 * SCALE_FACTOR, dxToCenter + 8 * SCALE_FACTOR]
# outYBounds = [dyToCenter - 8 * SCALE_FACTOR, dyToCenter + 8 * SCALE_FACTOR]
# 
# phoneView.on Events.TouchMove, (event) ->
# 	valueX = Events.touchEvent(event).point.x
# 	valueY = Events.touchEvent(event).point.y
# 	
# 	imageView.x = Utils.modulate(valueX, inXBounds, outXBounds, true)
# 	imageView.y = Utils.modulate(valueY, inYBounds, outYBounds, true)
	

phoneView.center()
dotsView.y = phoneView.y - dotSize * 4
phoneViewBorder.center()

imageRaw.image = selectedWallpaper().mobile1920


## Clear console

print.clear = () ->
	console.clear()
	try
		consoleParent = document.getElementById("FramerContextRoot-PrintConsole")
		consoleChild = consoleParent.children[0].children[1].children
		
		arrForRemove = []
	
		for i in [0...consoleChild.length]
			if consoleChild[i].textContent.indexOf('»') isnt -1
				arrForRemove.push(consoleChild[i])
		if arrForRemove.length > 0
			for i in [0...arrForRemove.length]
				arrForRemove[i].remove()
				
		divMsgClr = document.createElement('div')
		divMsgClr.style.color = "rgba(0,0,0,0.3)"
		divMsgClr.style.fontStyle = "italic"
# 		divMsgClr.innerHTML = "» Print-console cleared"
		consoleParent.children[0].children[1].appendChild(divMsgClr)
	catch e
		console.log "Print-console already clear"

# Buttons

onTouchStartAnimation = (currentLayer) ->
	currentLayer.scale = 0.8
	currentLayer.animate
		scale: 1
		options:
			curve: Spring(damping: 0.5)
			time: 0.5



applyTextStyleTo = (localLayer) ->
	localLayer.textAlign = "left"
	localLayer.fontWeight = "bold"
# 	localLayer.backgroundColor = "#333"
	localLayer.color = "rgba(255,255,255,0.3)"
	localLayer.fontSize = 12

applyStyleTo = (localLayer) ->
	localLayer.height = 44
	localLayer.textAlign = "center"
	localLayer.padding =
		top: 13
		left: 12
		right: 12
	localLayer.borderRadius = 8
	localLayer.fontWeight = "bold"
	localLayer.backgroundColor = "#333"
	localLayer.color = "rgba(255,255,255,0.3)"
	localLayer.fontSize = 14
	
	localLayer.onTouchStart (event, layer) ->
		onTouchStartAnimation(layer)

applyStyleTint = (localLayer) ->
	localLayer.backgroundColor = "#666"
	localLayer.color = "rgba(255,255,255,0.4)"

applyTextStyleTint = (localLayer) ->
	localLayer.color = "rgba(255,255,255,0.7)"
	localLayer.fontSize = 14

applyStyleLikeDislikeButtons = (localLayer) ->
	localLayer.width = 112


applyUploadViewStyle = (localLayer) ->
	applyStyleTo(localLayer)
# 	localLayer.backgroundColor = "#333"
# 	localLayer.height = 44
# 	localLayer.borderRadius = 8
	
	
	childStyleLayer = localLayer.children[1]
	childStyleLayer.textAlign = "center"
	childStyleLayer.padding =
		top: 13
	childStyleLayer.fontWeight = "bold"
	childStyleLayer.backgroundColor = "#333"
	childStyleLayer.color = "rgba(255,255,255,0.3)"
	childStyleLayer.fontSize = 14







topButtonView = new Layer
	width: Canvas.width
	height: 44
	y: 16
	backgroundColor: "transparent"

backButton = new TextLayer
	parent: topButtonView
	text: "⬅ Back"

printButton = new TextLayer
	parent: topButtonView
	text: "Get Data for Voting"



decorateTextCurrent = "Current: "
decorateTextLeft = "Images left: "

infoView = new Layer
	parent: topButtonView
	height: 44
	width: 200
	backgroundColor: "transparent"

currentIndexLayer = new TextLayer
	parent: infoView
	y: 5
	text: "#{decorateTextCurrent}#{wallpaperIndex + 1}"

outputLayer = new TextLayer
	parent: infoView
	y: 24
	text: "#{decorateTextLeft}#{wallpapersRange.length - wallpaperIndex - 1}"




for item in topButtonView.children
	if item is backButton or item is currentURLButton or item is blurButton
		applyStyleTo(item)
	else if item is printButton
		applyStyleTo(item)
		applyStyleTint(item)
	else if item is infoView
		for child in infoView.children
			applyTextStyleTo(child)
			if child is currentIndexLayer
				applyTextStyleTint(child)

addToLeft([backButton, infoView])
addToRight([printButton])





bottomButtonView = new Layer
	width: Canvas.width
	height: 60
	y: Canvas.height - 60
	backgroundColor: "transparent"

likeButton = new TextLayer
	parent: bottomButtonView
	text: "⬆ Like"

dislikeButton = new TextLayer
	parent: bottomButtonView
	text: "⬇ Dislike"



# Upload Button
uploadButton = new Layer
	parent: bottomButtonView
	width: 120
	clip: true

inputLayer = new Layer
# 	x: -4
	y: -4
	parent: uploadButton
	backgroundColor: "null"
	html: "<input id='myInput' multiple type='file' accept='image/png, image/jpeg, image/jpg' style='background-color: rgba(255, 0, 0, 0); height: 100px; width: 100px;'>"

styleInputView = new TextLayer
	text: "Upload UI"
	width: uploadButton.width
	parent: uploadButton








currentURLButton = new TextLayer
	parent: bottomButtonView
	text: "Print current URL"

# themeButton = new TextLayer
# 	parent: bottomButtonView
# 	text: "Картинка"


blurButton = new TextLayer
	parent: bottomButtonView
	text: "Blur"

currentUILayer = new TextLayer
	parent: bottomButtonView
	y: -32
	text: ntpViewPageComponent.content.children[0].name


for item in bottomButtonView.children
	if item is currentUILayer
		applyTextStyleTo(currentUILayer)
	else if item is uploadButton
		applyUploadViewStyle(item)
	else
		applyStyleTo(item)
	
	
	if item is likeButton or item is dislikeButton then applyStyleLikeDislikeButtons(item)


addToLeft([uploadButton, currentURLButton, blurButton])
addToRight([likeButton, dislikeButton])

addToLeft([currentUILayer])



# Dark
if Utils.isMobile()
	likeButton.parent = topButtonView
	likeButton.text = "Вперед"
	applyStyleTo(likeButton)
	
	bottomButtonView.opacity = 0
	infoView.opacity = 0
	
	addToLeft([backButton, likeButton])



# Buttons: Logic


backAction = () ->
	answerData.pop()
	prevWallpaper()
	
	imageRaw.image = selectedWallpaper().mobile1920
	currentIndexLayer.text = "#{decorateTextCurrent}#{wallpaperIndex + 1}"
	outputLayer.text = "#{decorateTextLeft}#{wallpapersRange.length - wallpaperIndex - 1}"



registerAction = (vote) ->
	voteString = if vote then "1" else "0"
	answerData.push("#{selectedWallpaper().id}:#{voteString}")
	
	nextWallpaper()
	imageRaw.image = selectedWallpaper().mobile1920
	currentIndexLayer.text = "#{decorateTextCurrent}#{wallpaperIndex + 1}"
	outputLayer.text = "#{decorateTextLeft}#{wallpapersRange.length - wallpaperIndex - 1}"
	


printData = () ->	
	answerString = ""
	for item in answerData
		answerString = answerString + " " + item
	
	print.clear()
	print answerString






backButton.on Events.Tap, ->
	backAction()

likeButton.on Events.Tap, ->
	registerAction(true)

dislikeButton.on Events.Tap, ->
	registerAction(false)

printButton.on Events.Tap, ->
	printData()

currentURLButton.on Events.Tap, ->
	print imageRaw.image

# themeButton.on Events.Tap, ->
# 	ntpView.image = themesCycler()
# 	currentUILayer.text = ntpView.image

blurButton.on Events.Tap, ->
	box.stateCycle()



Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 38 or event.keyCode is 39 or event.keyCode is 87
		likeButton.emit Events.TouchStart, (likeButton)
		likeButton.emit Events.Tap, (likeButton)
	else if event.keyCode is 40 or event.keyCode is 83
		dislikeButton.emit Events.TouchStart, (dislikeButton)
		dislikeButton.emit Events.Tap, (dislikeButton)
	else if event.keyCode is 27 or event.keyCode is 37 or event.keyCode is 65
		backButton.emit Events.TouchStart, (backButton)
		backButton.emit Events.Tap, (backButton)


Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "change", ->
	fileList = inputLayer.querySelector("#myInput").files
	
	for child in ntpViewPageComponent.content.children
		child.destroy()
	
	for file, i in fileList
		localPage = createPage(i)
		localPage.image = URL.createObjectURL(file)
		localPage.name = file.name
	
	createDots(fileList.length)
	ntpViewPageComponent.snapToPage(ntpViewPageComponent.content.children[0])
# 	addToCenter(groupView.children)

