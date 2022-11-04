Framer.Extras.Hints.disable()
myModule = require "allHome"

# myModule.myFunction()

# Input

inputLayer = new Layer
	backgroundColor: "null"
	x: 40
	y: 20
	html: "<input id='myInput' fontSize='14px' multiple type='file' accept='image/png, image/jpeg, image/jpg'>"


Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "change", ->
	fileList = inputLayer.querySelector("#myInput").files
	
	for file, i in fileList
		try for item in [cardDesktopView, cardTouchView, cardPPView]
			item.image = URL.createObjectURL(file)
			item.name = file.name


textInputLayer = new Layer
	backgroundColor: "rgba(0,0,0,0.0)"
	x: 90
	y: 50
	height: 36
	html: "<input id='textInput' font='14px' placeholder='Тайтл' type='text'>"

colorHolder1 = myModule.createColorHolder()
colorHolder1.x = 40
colorHolder1.y = textInputLayer.y + 4
# colorHolder1.parent = textInputLayer

Events.wrap(textInputLayer.querySelector("#textInput")).addEventListener "change", ->
	newValue = textInputLayer.querySelector("#textInput").value
	try for item, i in [cardDesktopView, cardTouchView, cardPPView]
		textView = item.children[0]
		localTitleView = textView.children[0]
		localSubTitleView = textView.children[1]

		localTitleView.text = newValue
		localSubTitleView.y = localTitleView.height + subTitleGap[i]

colorHolder1.children[0].on "change:backgroundColor", ->
	try for item in [cardDesktopView, cardTouchView, cardPPView]
		textView = item.children[0]
		localSubTitleView = textView.children[0]
		localSubTitleView.color = @backgroundColor








subTextInputLayer = new Layer
	backgroundColor: "rgba(0,0,0,0.0)"
	x: 90
	y: 90
	html: "<input id='subTextInput' placeholder='Сабтайтл' type='text'>"


Events.wrap(subTextInputLayer.querySelector("#subTextInput")).addEventListener "change", ->
	newValue = subTextInputLayer.querySelector("#subTextInput").value
	
	try for item in [cardDesktopView, cardTouchView, cardPPView]
		textView = item.children[0]
		localTitleView = textView.children[0]
		localSubTitleView = textView.children[1]

		localSubTitleView.text = newValue

colorHolder2 = myModule.createColorHolder()
colorHolder2.x = 40
colorHolder2.y = subTextInputLayer.y + 4

colorHolder2.children[0].on "change:backgroundColor", ->
	try for item in [cardDesktopView, cardTouchView, cardPPView]
		textView = item.children[0]
		localSubTitleView = textView.children[1]
		localSubTitleView.color = @backgroundColor




clearTitles = () ->
	for item in [textInputLayer, subTextInputLayer, colorHolder1, colorHolder2]
		item.opacity = 0
		item.x = -1000
	
	try for item in [cardDesktopView, cardTouchView, cardPPView]
		textView = item.children[0]
		localTitleView = textView.children[0]
		localSubTitleView = textView.children[1]
		localTitleView.text = ""
		localSubTitleView.text = ""


# view.on Events.Click, ->
# 	colorHolder1.stateSwitch("hidden")
# 	colorHolder2.stateSwitch("hidden")


# Cards
Utils.insertCSS('@import url(css/project.css)')

cardGroup = new Layer
	backgroundColor: "null"
	width: 1400
	height: 240



cardDesktopView = new Layer
	width: 188
	height: 141

cardTouchView = new Layer
	width: 212
	height: 159

cardPPView = new Layer
	width: 240
	height: 180





sumX = 0
titleFontSize = [13, 14, 16]
titleFontLineHeight = [1.385, 1.385, 1.25]

subTitleFontSize = [12, 13, 14]
subTitleFontLineHeight = [1.34, 1.34, 1.4]

subTitleGap = [2, 2, 4]
typeTitleText = ["Десктоп", "Тач", "ПП"]

for item, i in [cardDesktopView, cardTouchView, cardPPView]
	
	item.borderRadius = 6
	item.image = "images/image%20friends.png"
	item.parent = cardGroup
	item.x = sumX
	sumX += item.width + 24
	
	
	
	titleView = new Layer
		parent: item
		width: item.width - 12 *2
		x: 12
		y: 12
		height: 100
		backgroundColor: "null"
	
	title = new TextLayer
		parent: titleView
		width: titleView.width
		fontFamily: "YS Web Medium"
		text: "Ограничение поездкок"
		fontSize: titleFontSize[i]
		lineHeight: titleFontLineHeight[i]
# 		fontWeight: "Medium"
		name: "title"
		color: "black"
	
	subTitle = new TextLayer
		parent: titleView
		width: titleView.width
		fontFamily: "YS Web Regular"
		text: "Многие страны ограничили въезд на свою территорию, железнодорожное и ависообщение"
		fontSize: subTitleFontSize[i]
		lineHeight: subTitleFontLineHeight[i]
		y: title.height + subTitleGap[i]
# 		fontWeight: "Regular"
		name: "subtitle"
		color: "black"
	
	
	typeTitle = new TextLayer
		parent: item
		y: -40
		fontFamily: "YS Web Regular"
		text: typeTitleText[i]
		width: item.width
		fontSize: 20
		x: 8

cardGroup.width = sumX - 24
# cardGroup.center()


# Canvas.on "change:size", ->
# 	cardGroup.center()

clearTitles()


# cardGroup.backgroundColor = "red"

{ Preview } = require "PreviewComponent"
preview = new Preview { view: cardGroup, borderRadius: 8, visible: false }
# preview.printTree()
