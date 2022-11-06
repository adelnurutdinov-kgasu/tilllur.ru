Framer.Extras.Hints.disable()

Data = require "result"
answerData = []

# https://dl.dropboxusercontent.com/s/ccz5dc0xb673tay/0-500%20results%202f.json
# https://dl.dropboxusercontent.com/s/tqx8u7wtex1jozg/result.json

# Indexes

startIndex = 0
finishIndex = Data.wallpapers.length - 1

queryArray = location.search[1..].split('&')
for item in queryArray
	keyValuePair = item.split("=")
	if keyValuePair[0] == "start"
		startIndex = parseInt(keyValuePair[1])
	else if keyValuePair[0] == "finish"
		finishIndex = parseInt(keyValuePair[1])
	else if keyValuePair[0] == "json"
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
	return selectedWallpaper()

prevWallpaper = () ->
	wallpaperIndex--
	return selectedWallpaper()





MAX_CHANGE = 0.07

SCALE_FACTOR = 1
PHONE_WIDTH = 360 * SCALE_FACTOR
PHONE_HEIGHT = 640 * SCALE_FACTOR

PHONE_SC = 1



# Logic


Screen.backgroundColor = "#222"

plateView = new Layer
	width: Screen.width
	height: Screen.height
	x: Align.center()
	y: Align.center()
	backgroundColor: "#222"

phoneView = new Layer
	width: PHONE_WIDTH
	height: PHONE_HEIGHT
	scale: PHONE_SC
	parent: plateView
	backgroundColor: "transparent"


pagesView = new PageComponent
	width: phoneView.width
	height: phoneView.height
	parent: phoneView
	scrollVertical: false
	backgroundColor: "transparent"

# pagesView.content.overdrag = false
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

phoneViewBorder = new Layer
	width: PHONE_WIDTH
	height: PHONE_HEIGHT
	scale: PHONE_SC
	parent: plateView
	borderWidth: 2
	borderColor: "red"
	backgroundColor: "transparent"

imageView = new Layer
	width: 2000
	height: 2000
	originX: 0
	originY: 0
	parent: pagesView.content.children[1]
# 	parent: phoneView
# 	image: "images/wallpaper.jpg"

imageView.sendToBack()

imageRaw = new Layer
	width: 1920
	height: 1080
	parent: imageView
# 	image: "https://bro-bg-store.s3.yandex.net/3dfe4109-a3b4-40c2-963c-4b1c3e5fb473.jpg"
	scale: 1.8519

imageRaw.center()

ntpView = new Layer
	width: PHONE_WIDTH
	height: PHONE_HEIGHT
	parent: phoneView
	backgroundColor: "transparent"
	image: "images/homescreen black.png"

# Framer.Device.customize
# 	deviceType: Framer.Device.Type.Tablet
# 	screenWidth: 360
# 	screenHeight: 640
# 	deviceImage: "http://f.cl.ly/items/001L0v3c1f120t0p2z24/custom.png"
# 	devicePixelRatio: 1



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
# 	opacity: 0


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
phoneView.y = phoneView.y - 40
phoneViewBorder.center()

imageRaw.image = selectedWallpaper().mobile1920

# ntpView.image = "https://dl.dropboxusercontent.com/s/i0xe1hx5xpbid9k/delete-soon-360x740.png"



phoneView.clip = true
textView.opacity = 0
phoneViewBorder.opacity = 0

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

printButton = new Layer
	width: 100
	height: 50
	backgroundColor: "lightgrey"
	x: phoneView.x + phoneView.width + 40
	y: phoneView.height / 2 + phoneView.y - 25
	borderRadius: 10

backButton = new Layer
	width: 100
	height: 50
	backgroundColor: "grey"
	x: phoneView.x - 40 - 100
	y: phoneView.height / 2 + phoneView.y - 25
	borderRadius: 10


likeButton = new Layer
	width: 140
	height: 64
	backgroundColor: "green"
	x: phoneView.x + phoneView.width - 140
	y: phoneView.y + phoneView.height + 40
	borderRadius: 10

dislikeButton = new Layer
	width: 140
	height: 64
	backgroundColor: "red"
	x: phoneView.x
	y: phoneView.y + phoneView.height + 40
	borderRadius: 10

backButton.on Events.Tap, ->
	backAction()

likeButton.on Events.Tap, ->
	registerAction(true)

dislikeButton.on Events.Tap, ->
	registerAction(false)

printButton.on Events.Tap, ->
	printData()


themeButton = new TextLayer
	width: 100
	height: 40
	fontSize: 20
	textAlign: "left"
	text: "Тема"
	color: "blue"
	opacity: 0.5
	padding:
		top: 10
	backgroundColor: "transparent"
	x: phoneView.x + phoneView.width + 44
	y: phoneView.y + phoneView.height - 100 
	borderRadius: 10

themeButton.on Events.Tap, ->
	if ntpView.image == "images/homescreen white.png"
		ntpView.image = "images/homescreen black.png"
	else
		ntpView.image = "images/homescreen white.png"

# Buttons: Logic

pressAnimation = (currentLayer) ->
	currentLayer.scale = 0.8
	currentLayer.animate
		scale: 1
		options:
			curve: Spring(damping: 0.5)
			time: 0.5




backAction = () ->
	pressAnimation(backButton)
	
	answerData.pop()
	prevWallpaper()
	
	imageRaw.image = selectedWallpaper().mobile1920
	outputLayer.text = "#{wallpapersRange.length - wallpaperIndex - 1}"
	currentIndexLayer.text = "#{wallpaperIndex + 1}"


registerAction = (vote) ->
	voteString = if vote then "1" else "0"
	if vote then pressAnimation(likeButton) else pressAnimation(dislikeButton)
	
	answerData.push("#{selectedWallpaper().id}:#{voteString}")
	
	nextWallpaper()
	imageRaw.image = selectedWallpaper().mobile1920
	outputLayer.text = "#{wallpapersRange.length - wallpaperIndex - 1}"
	currentIndexLayer.text = "#{wallpaperIndex + 1}"


printData = () ->
	pressAnimation(printButton)
	
	answerString = ""
	for item in answerData
		answerString = answerString + " " + item
	
	print.clear()
	print answerString



Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 37
		registerAction(false)
	else if event.keyCode is 39
		registerAction(true)
	else if event.keyCode is 27
		backAction(true) 


tempImage = new Layer
	image: "images/homescreen white.png"
	y: 2000

tempImage.sendToBack()


# Texts

outputLayer = new TextLayer
	width: 500
	textAlign: "left"
	opacity: 0.5
	fontSize: 20
# 	y: phoneView.y - 80
	text: "#{wallpapersRange.length - wallpaperIndex - 1}"
# 	x: Align.center()
	x: phoneView.x + phoneView.width + 44
	y: phoneView.y + 100

currentIndexLayer = new TextLayer
	width: 500
	textAlign: "left"
	opacity: 1
	fontSize: 20
	y: phoneView.y + 140 
	text: "#{wallpaperIndex + 1}"
# 	x: Align.center()
	x: phoneView.x + phoneView.width + 44


likeText = new TextLayer
	width: likeButton.width
	textAlign: "center"
	fontSize: 20
	fontWeight: "700"
	color: "white"
	text: "Like"
	parent: likeButton
	y: Align.center()


dislikeText = new TextLayer
	width: dislikeButton.width
	textAlign: "center"
	fontSize: 20
	fontWeight: "700"
	color: "white"
	text: "Dislike"
	parent: dislikeButton
	y: Align.center()

resultText = new TextLayer
	width: printButton.width
	textAlign: "center"
	fontSize: 20
	fontWeight: "700"
	color: "white"
	text: "Result"
	parent: printButton
	y: Align.center()

backText = new TextLayer
	width: backButton.width
	textAlign: "center"
	fontSize: 20
	fontWeight: "700"
	color: "white"
	text: "Back"
	parent: backButton
	y: Align.center()
