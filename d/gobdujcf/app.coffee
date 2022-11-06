Framer.Extras.Hints.disable()
Utils.insertCSS('@import url(css/project.css)')

type = 0
data = null
currentIndex = 0
dataSum = 0

# Screen

screen_1.y = 0
screen_1.x = 0

if Utils.isMobile()
	screen_1.y = -48

rating_view.parent = screen_1
rating_view.y = 498
rating_view.x = 0



progress_view.clip = true
title_view.truncate = true


# button2.on Events.Tap, ->
# 	type = 1
# 	initProgress()
# 	button5.stateSwitch("base")
# 	button2.stateSwitch("selected")

# button5.on Events.Tap, ->
# 	type = 0
# 	initProgress()
# 	button5.stateSwitch("selected")
# 	button2.stateSwitch("base")


for typeButton in [button2, button5]
	typeButton.opacity = 0
	typeButton.states =
		"selected": { backgroundColor: "rgba(27,27,27,1)" }
		"base": { backgroundColor: "000" }

button5.stateSwitch("selected")


prevHandler = () ->
	tempIndex = currentIndex
	tempIndex++
	
	if tempIndex >= dataTitles.length
		tempIndex = 0
	
	data = dataArray[dataTitles[tempIndex]]
	currentIndex = tempIndex

	initProgress()

nextHandler = () ->
	tempIndex = currentIndex
	tempIndex--
	
	if tempIndex < 0
		tempIndex = dataTitles.length - 1
	
	data = dataArray[dataTitles[tempIndex]]
	currentIndex = tempIndex

	initProgress()

bottom_content_view.states =
	"shown": { y: 0 }
	"hidden": { y: 498 - 81 }
bottom_content_view.stateSwitch("hidden")

darker.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
darker.stateSwitch("hidden")

rating_view.on Events.Tap, ->
	if bottom_content_view.states.current.name == "shown"
		bottom_content_view.animate("hidden", time: 0.3)
		darker.animate("hidden", time: 0.3)
	else
		bottom_content_view.animate("shown", time: 0.3)
		darker.animate("shown", time: 0.3)


bottom_content_view.onTap ->
	bottom_content_view.animate("hidden", time: 0.3)
	darker.animate("hidden", time: 0.3)


title_view.fontFamily = "YS Web Regular"
number.fontFamily = "YS Web Medium"
button2.children[0].fontFamily = "YS Web Medium"
button5.children[0].fontFamily = "YS Web Medium"
buttonPrev.children[0].fontFamily = "YS Web Medium"
buttonNext.children[0].fontFamily = "YS Web Medium"

buttonPrev.opacity = 0
buttonNext.opacity = 0

site_stars.fontFamily = "YS Web Medium"
site_title.fontFamily = "YS Web Medium"

# Data

dataArray = {
	"Ресторан White Rabbit": [93, 99, 206, 414, 1212],
	"Жи Есть": [4, 0, 4, 9, 21],
	"Юджунг": [0, 1, 3, 7, 22],
	"Филион": [3, 4, 6, 11, 12],
	"Отель Глобус": [4, 5, 10, 3, 2],
	"Мини-отель Булгаков": [26, 14, 24, 37, 19],
	"Гостиница ApartLux Арбат": [6, 0, 3, 2, 0],
	"Торгово-досуговый центр Варшавский": [2, 2, 4, 0, 1],
	"Тануки": [3, 6, 10, 13, 8],
	"Макдоналдс": [5, 12, 15, 25, 22],
}

dataArray = {
	"travelask.ru": [2, 1, 3, 15, 41],
	"sports.ru": [29, 17, 116-47, 256-116, 654-256],
	"pozdravok.ru": [1, 3, 25-4, 72-25, 662-72],
	"pikabu.ru": [1, 20-1, 35-20, 87-35, 689-87],
	"music.yandex.ru": [10-1, 21-10, 60-21, 162-60, 574-162],
	"lostfilms.ru": [7-2, 1, 37-8, 147-37, 648-147],
	"kinopoisk.ru": [1, 14-2, 32-14, 89-32, 642-89],
	"bilettutu.ru": [0, 0, 3, 1, 2],
	"sameresults.example": [20, 20, 20, 20, 20]
}

dataTitles = []

for k,v of dataArray
	dataTitles.push(k)

colors5 = ["FF4242", "FF8800", "FFB800", "AEC668", "68C668"]
colors2 = ["68C668", "FF8800"]

# Progress — 5

initProgress5 = () ->
	
	widthData = [0, 0, 0, 0, 0]
	dataSum = 0
	
	
	for currentNumber in data
		dataSum += currentNumber
	
	number.text = dataSum.toFixed()
	
	for currentNumber, i in data
		accurateNumber = currentNumber / dataSum * progress_view.width
		widthData[i] = parseInt(accurateNumber.toFixed(), 10)
	
	testWidth = 0
	for currentWidthData in widthData
		testWidth += currentWidthData
	widthData[4] += (44 - testWidth)  
	
	startX = 0
	for currentWidth, i in widthData
		
		progressPart = new Layer
			parent: progress_view
			width: currentWidth
			height: 3
			x: startX
			y: 0
			backgroundColor: colors5[i]
		
		startX += currentWidth
		
		
		progressPartSite = new Layer
			parent: progress_view_site
			width: progress_view_site.width * (data[i] / dataSum)
			height: 10
			y: 0 - 18 * i
			borderRadius: 10
			backgroundColor: colors5[i]
		
		if progressPartSite.width < 2 then progressPartSite.destroy()

# Progress — 2

initProgress2 = (currentData) ->
	
	widthData = [0, 0]
	dataSum = 0
	
	
	for currentNumber in data
		dataSum += currentNumber
	
	number.text = dataSum.toFixed()
	
	posSum = 0.0
	negSum = 0.0
	
	for currentNumber, i in data
		if i == 0 || i == 1
			posSum += currentNumber
		else if i == 2
			posSum += currentNumber / 2
			negSum += currentNumber / 2
		else if i == 3 || i == 4
			negSum += currentNumber
	
	
	accuratePos = posSum / dataSum * progress_view.width
	widthData[1] = parseInt(accuratePos.toFixed(), 10)
	
	accurateNeg = negSum / dataSum * progress_view.width
	widthData[0] = parseInt(accurateNeg.toFixed(), 10)
	
# 	print widthData
	
	startX = 0
	for currentWidth, i in widthData
		
		progressPart = new Layer
			parent: progress_view
			width: currentWidth
			height: 3
			x: startX
			y: 0
			backgroundColor: colors2[i]
	# 		backgroundColor: Utils.randomColor()
		
		startX += currentWidth


initProgress = () ->
	for item in progress_view.children
		item.destroy()
	for item in progress_view_site.children
		item.destroy()
	
	if type == 0
		initProgress5(data)
	else
		initProgress2(data)
	
	site_stars.text = "#{dataSum}"
	title_view.text = "#{dataTitles[currentIndex]}"
	site_title.text = "#{dataTitles[currentIndex]}"




data = dataArray[dataTitles[currentIndex]]
initProgress()





statusBar = new Layer
	parent: screen_1, width: screen_1.width, height: 20, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen_1, borderRadius: 16, statusBar: "light" }


preview.addSection("Preview for Axis", [
	{ title: "Like/Dislike", handler: initProgress2 },
	{ title: "Rating 1..5", handler: initProgress5 }
])

preview.addSection("Examples", [
	{ title: "Prev", handler: prevHandler },
	{ title: "Next", handler: nextHandler }
])