Canvas.backgroundColor = "222"
Framer.Extras.Hints.disable()

# API

{DynamicLoader} = require "DynamicLoader"
DynamicLoader.series(["./vendor/rest.js",]).then(->
	;
)


`window.searchQuery = function(q) {
	var API = 'https://suggest.yandex.ru/';
	
	var endingsURL = API + 'suggest-endings?v=4&part=' + encodeURI(q) + '&digram_only=0&digram_coeff=1&srv=test&lr=213&uil=ru&sn=100&esn=10';
	
	requestJSON(endingsURL).then(function(data2) {
		var endings = data2[2];
		console.log('Endings answer:', endings);
		
		var qlen = q.length;
		var rawEndings = []
		
		var cleanEndings = endings.map(function(e) { 
			var dp = e[0].substr(qlen);
			console.log ('NNNNNNNN:',dp);
			rawEndings.push(dp);
			
			var p = e[0];
			if (dp[0]==" " ){return e[0].substr(qlen);} 
			var i = qlen;

			while (i > 0) {
				i --
				if (p[i]==" "){
					e[0]=e[0].substr(i);
					i=0;
				}
			}
			return e[0]; });
		
		updateSuggestContext(cleanEndings, rawEndings)
		
	}.bind(this));
	
	
	var url = API + 'suggest-ya.cgi?part=' + encodeURI(q) + '&v=4&?n=10&?fact=1&?mob=1';
	requestJSON(url).then(function(data) {
		var suggest = data[1] || [];
		console.log(data)
		updateSuggestLines(data)
	}.bind(this));
}`

# Suggest Buttons

updateSuggestContext = (cleanArray = [], rawArray = [], maxResults = 6) ->
	slicedArray = cleanArray.slice(0, maxResults);
	for button, i in suggestView_Context.children
		if cleanArray[i] != undefined then button.text = cleanArray[i]
		else button.text = ""
		
		if rawArray[i] != undefined then button.custom.rawText = rawArray[i]
		else button.custom.rawText = ""
	
	isEmpty = cleanArray.length == 0
	visibleButtons = clearEmptyButtons(suggestView_Context)
	backpackButtons(visibleButtons)


clearEmptyButtons = (viewWithChildren) ->
	visibleButtonCounter = 0
	for button in viewWithChildren.children
		if button.text == "" then button.opacity = 0
		else	
			button.opacity = 1
			visibleButtonCounter++
	return visibleButtonCounter


backpackButtons = (visibleButtons = 0) ->
	sumX = 0
	sumY = 12
	availableWidth = screen.width - 16 * 2
	
	for button, i in suggestView_Context.children
		button.x = sumX
		sumX += button.width + 6
		
		if button.x + button.width > availableWidth and i != 0
			sumY += 44
			button.x = 0
			sumX = button.width + 6
		
		button.y = sumY
	
	suggestView_Color.states.lines.height = 118 + sumY + 32
	if visibleButtons == 0
		suggestView_Context.height = 0
# 		suggestView_Color.stateSwitch("null")
	else
		suggestView_Context.height = sumY + 44 + 8
# 		suggestView_Color.stateSwitch("lines")
	

createButtonView = (maxResults = 6) ->
	for textValue in [0...maxResults]
		button = createButton(textValue)
		button.on(Events.Tap, selectQueryFromSuggest)
		

createButton = (text = "купить") ->
	return new TextLayer
		parent: suggestView_Context
		fontSize: 16
		backgroundColor: "F3F3F3"
# 		backgroundColor: "red"
		borderRadius: 12
		text: text
		color: "black"
		padding: 
			left: 12
			right: 12
			top: 8
			bottom: 8
		custom: 
			rawText: ""




# Suggest Lines

dataSuggestArray = [1, ["кроссовки найк", "доставка еды", "купить билеты в казань"]]

updateSuggestLines = (dataArray = [], maxResults = 6) ->
	if dataArray.length == 0 or isEmptyInputText()
		dataArray = dataSuggestArray
	
	slicedArray = dataArray.slice(0, maxResults)
	for line, i in suggestView_LineView.children
		if dataArray[1][i] == undefined then line.text = ""
		else line.text = dataArray[1][i]
	
	visibleLines = clearEmptyButtons(suggestView_LineView)
	placeLines(visibleLines)



placeLines = (visibleLinesCounter = 0) ->
	if isEmptyInputText() then suggestView_LineView.y = 112
	else
		suggestView_LineView.y = suggestView_Context.y + suggestView_Context.children[5].y + 60
	
	if suggestView_LineView.children != undefined and suggestView_LineView.children.length != 0
		suggestView_Exit.y = suggestView_LineView.y + suggestView_LineView.children[0].height * visibleLinesCounter + 10
		suggestView_Color.height = suggestView_Exit.y + 8




createLineView = (maxResults = 6) ->
	for i in [0...maxResults]
		line = createLine(i)
		line.y = i * line.height
		line.on(Events.Tap, selectLineQuery)

createLine = (text = "купить") ->
	line = new TextLayer
		parent: suggestView_LineView
		width: 360
		height: 42
		fontSize: 16
		backgroundColor: "null"
		text: text
		color: "black"
		truncate: true
		padding: 
			left: 64
			right: 14
			top: 10
			bottom: 13
	
	lineIcon = new Layer
		parent: line
		width: 28
		height: 28
		x: Align.left(26)
		y: Align.center
		name: "."
	
	lineIcon.states =
		"history": { image: "images/historyIcon.png" }
		"search": { image: "images/searchIcon.png" }
	lineIcon.stateSwitch("history")
	
	return line




Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

# States

screenState = new Layer
	opacity: 0
	size: 20

screenState.states =
	"feed": { opacity: 0 }
	"suggestFeed": { opacity: 0 }
	"suggestFeed_typing": { opacity: 0 }
	"search": { opacity: 0 }
	"suggestSite": { opacity: 0 }
	"suggestSite_typing": { opacity: 0 }
	"suggestUrl": { opacity: 0 }
	"suggestUrl_typing": { opacity: 0 }

screenState.on Events.StateSwitchStart, (from, to) ->
	if from != to
		
		if to is "feed"
			searchView.ignoreEvents = true
			searchView.content.ignoreEvents = true
			searchView.stateSwitch("disabled")
			
			navigationView.stateSwitch("init")
			navigationView_Whiter.animate("hidden")
			
			feedView.animate("shown")
			
			suggestView_LineView.animate("hidden")
			suggestView_Context.animate("hidden")
			suggestView_Color.stateSwitch("hidden")
			
			inputLayer.querySelector("#myInput").blur()
			clearSearch()
			scrollFeedToTop()
			updateSuggestLines()
			searchView.scrollToTop(false)
			
			ignoreSuggestItems(true)
			
			browserBar.stateSwitch("hidden")
		
		
		else if to is "suggestFeed"
			if from is "feed"
				navigationView.stateSwitch("shown")
				navigationView.stateSwitch("feed")
				navigationView.animate("suggestFeed")
				navigationView_Whiter.animate("shown", time: 0.4)
			
			feedView.animate("hidden")
			
			if from is "feed" then suggestView_LineView.animate("shown")
			else suggestView_LineView.stateSwitch("shown")
			ignoreSuggestItems(false)
			suggestView_Color.stateSwitch("shown")
			
			
			inputText.textAlign = "left"
			inputText_Null.stateSwitch("shown")
			closeIcon.stateSwitch("hidden")
			scrollFeedToSuggest()
			updateSuggestLines()
			
			alice.stateSwitch("hidden")
			
		
		else if to is "suggestFeed_typing"
			suggestView_LineView.stateSwitch("shown")
			suggestView_Context.stateSwitch("shown")
			suggestView_Color.stateSwitch("shown")
			
			inputText.textAlign = "left"
			closeIcon.stateSwitch("shown")
		
		
		else if to is "search"
			restoreSearchText()
			suggestView_Context.stateSwitch("hidden")
			navigationView_Whiter.stateSwitch("hidden")
			navigationView_Darker.stateSwitch("hidden")
			
			
			searchView.stateSwitch("enabled")
			searchView.animate("shown")
			searchView.ignoreEvents = false
			searchView.content.ignoreEvents = false
			
			suggestView_LineView.stateSwitch("hidden")
			suggestView_Color.stateSwitch("hidden")
			ignoreSuggestItems(true)
			suggestView_UrlActions.stateSwitch("hidden")
			
			searchBar_Shape.stateSwitch("search")
			searchBar_UrlFake.stateSwitch("hidden")
			
			inputLayer.querySelector("#myInput").blur()
			inputText.textAlign = "center"
			
			browserBar.stateSwitch("shown")
			alice.stateSwitch("shown")
		
		
		else if to is "suggestSite"
			if from is "search"
				navigationView.animate("suggestFeed")
				navigationView_Darker.animate("shown", time: 0.4)
			
			suggestView_LineView.stateSwitch("shown")
			suggestView_Color.stateSwitch("shown")
			suggestView_Context.stateSwitch("shown")
			suggestView_UrlActions.stateSwitch("hidden")
			ignoreSuggestItems(false)
			
			searchBar_Shape.stateSwitch("search")
			searchBar_UrlFake.stateSwitch("hidden")
			
			inputText.textAlign = "left"
			closeIcon.stateSwitch("shown")
			updateSuggestLines()
		
		
		else if to is "suggestSite_typing"
			if from is "search"
				navigationView.animate("suggestFeed")
				navigationView_Darker.animate("shown", time: 0.4)
			
			suggestView_LineView.stateSwitch("shown")
			suggestView_Color.stateSwitch("shown")
			suggestView_Context.stateSwitch("shown")
			ignoreSuggestItems(false)
			
			inputText.textAlign = "left"
			closeIcon.stateSwitch("shown")
		
		
		
# 		else if to is "suggestUrl"
# 			searchBar_Shape.stateSwitch("search")
# 			searchBar_UrlFake.stateSwitch("hidden")
# 			suggestView_UrlActions.stateSwitch("hidden")
		
		
		else if to is "suggestUrl_typing"
			if from is "search"
				navigationView.animate("suggestFeed")
				navigationView_Darker.animate("shown", time: 0.4)
			
			searchBar_Shape.stateSwitch("url")
			searchBar_UrlFake.stateSwitch("shown")
			
			
			suggestView_Color.stateSwitch("shown")
			suggestView_Color.stateSwitch("url")
			suggestView_Context.stateSwitch("hidden")
			suggestView_LineView.stateSwitch("hidden")
			suggestView_UrlActions.stateSwitch("shown")
			
			ignoreSuggestItems(true)
			suggestView_Exit.ignoreEvents = false
			suggestView_Exit.y = suggestView_UrlActions.y + suggestView_UrlActions.height + 20
			
			
			inputText.textAlign = "left"
			closeIcon.stateSwitch("shown")

{ Preview } = require "PreviewComponent"

screen = new Layer { width: 360, height: 782 }
new Preview { view: screen }

# Input

successQuery = ""

clearSearch = () ->
	inputLayer.querySelector("#myInput").value = ""
	inputText.text = ""


inputLayer = new Layer
	opacity: 0
	y: -2000
	backgroundColor: "null"
	html: "<form id='myForm' onSubmit='search();return false;' action='#'><input id='myInput' multiple type='search' autocapitalize='off' autocomplete='off' autocorrect='off' style='color: rgba(255,25,25,1); background-color: rgba(255, 255, 255, 1); width: 100px; font-size: 16px; resize: vertical;'></form>"

# onsubmit='submitSearch'
# action='.'

isEmptyInputText = () ->
	return inputLayer.querySelector("#myInput").value == ""

updateInput = () ->
	inputText.text =
		inputLayer.querySelector("#myInput").value
	
# 	updateButtonViewForIndex(inputText.text.length)
	searchQuery(inputText.text)
	
	if inputText.text == ""
		suggestView_Context.stateSwitch("hidden")
		inputText_Null.stateSwitch("shown")
		
		if screenState.states.current.name == "suggestFeed_typing"
			screenState.stateSwitch("suggestFeed")
		else if screenState.states.current.name == "suggestSite_typing"
			screenState.stateSwitch("suggestSite")
		
	
	else
		inputText_Null.stateSwitch("hidden")
		
		if screenState.states.current.name == "suggestFeed"
			screenState.stateSwitch("suggestFeed_typing")
		else if screenState.states.current.name == "suggestSite"
			screenState.stateSwitch("suggestSite_typing")


Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "input", ->
	updateInput()
	


Events.wrap(inputLayer.querySelector("#myForm")).addEventListener "submit", (event) ->
	event.preventDefault()

`window.search = function () {
	document.activeElement.blur();
	submitSearch()
}`

submitSearch = () ->
	screenState.stateSwitch("search")
	successQuery = inputLayer.querySelector("#myInput").value
	
	




# Feed

feedView = new ScrollComponent
	width: screen.width
	height: screen.height
	parent: screen
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	contentInset: 
		bottom: 80
	backgroundColor: "FAF9F8"
	

feedView.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
feedView.stateSwitch("shown")


feedView_Header = new Layer
	parent: feedView.content
	width: 360
	height: 356
	image: "images/feedHeader.png"


card_1 = new Layer
	width: 360
	height: 442
	image: "images/card%201.jpg"
	borderRadius: 24

card_2 = new Layer
	width: 360
	height: 422
	image: "images/card%202.jpg"
	borderRadius: 24

card_3 = new Layer
	width: 360
	height: 442
	image: "images/card%201.jpg"
	borderRadius: 24

card_4 = new Layer
	width: 360
	height: 422
	image: "images/card%202.jpg"
	borderRadius: 24

sumCardY = 0
for card in [card_1, card_2, card_3, card_4]
	card.parent = feedView.content
	card.y = feedView_Header.height + sumCardY + 6
	sumCardY += card.height + 6
	if card == card_3 then feedView.updateContent()



feedView_Search = new Layer
	parent: feedView.content
	y: 112
	width: 360
	height: 64
	image: "images/fsw.png"

feedView_Search.states =
	"feed": { opacity: 1 }
	"search": { opacity: 0 }

feedView_Search.stateSwitch("feed")

# Search View


navigationView = new Layer
	width: screen.width
	height: screen.height + 80
	parent: screen
	backgroundColor: "null"

navigationView.states =
	"init": { y: 1000, opacity: 0 }
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
	"feed": { y: 0 }
	"suggestFeed": { y: -80 }
navigationView.stateSwitch("init")

# navigationView.stateSwitch("suggestFeed")
# navigationView.stateSwitch("shown")






searchGuard = new Layer
	opacity: 0
	x: -2000

searchGuard.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
searchGuard.stateSwitch("shown")

searchGuard.on Events.StateSwitchStart, (from, to) ->
	if from != to
		
		if to is "shown"
			browserBar.animate("shown")
			searchBar.animate("shown")
			alice.animate("shown")
		else if to is "hidden"
			browserBar.animate("hidden")
			searchBar.animate("hidden")
			alice.animate("hidden")



# Search Site

searchView = new ScrollComponent
	width: screen.width
	height: screen.height + 96
	parent: navigationView
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	backgroundColor: "FAF9F8"

searchView.states =
	"disabled": { y: 1000 }
	"enabled": { y: -16 }
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
searchView.stateSwitch("hidden")


searchView.ignoreEvents = true
searchView.content.ignoreEvents = true




searchView.content.on "change:y", ->
	v = @parent.scrollY
	if @draggable.direction == "up" and v > 20
		searchGuard.stateSwitch("hidden")
	else if @draggable.direction == "down"
		searchGuard.stateSwitch("shown")




search_temp1 = new Layer
	width: 360
	height: 564
	image: "images/search_temp1.jpg"

search_temp2 = new Layer
	width: 360
	height: 780
	image: "images/search_temp2.jpg"

search_temp3 = new Layer
	width: 360
	height: 880
	image: "images/search_temp3.jpg"

search_temp4 = new Layer
	width: 360
	height: 780
	image: "images/search_temp4.jpg"

search_temp5 = new Layer
	width: 360
	height: 1200
	image: "images/search_temp5.jpg"

searchItemY = 92
for item in [search_temp1, search_temp2, search_temp3, search_temp4, search_temp5]
	item.parent = searchView.content
	item.y = searchItemY
	searchItemY += item.height

searchView.updateContent()
	

# NavigationView


navigationView_Whiter = new Layer
	width: screen.width
	height: screen.height + 200
	parent: navigationView
	backgroundColor: "rgba(255,255,255,1)"

navigationView_Whiter.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
navigationView_Whiter.stateSwitch("hidden")



navigationView_Darker = new Layer
	width: screen.width
	height: screen.height + 200
	parent: navigationView
	backgroundColor: "rgba(0,0,0,.5)"

navigationView_Darker.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
navigationView_Darker.stateSwitch("hidden")







suggestView = new Layer
	y: 80
	parent: navigationView
	width: screen.width
	backgroundColor: "null"
	height: screen.height

suggestView_Color = new Layer
	parent: suggestView
	width: screen.width
	height: 268
	backgroundColor: "white"

suggestView_Color.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
	"null": { height: 262 }
	"lines": { height: 206 }
	"url": { height: 206 }





searchBar = new Layer
	parent: navigationView
	width: 360
	height: 64
	y: 112
	backgroundColor: "white"

searchBar.states =
	"shown": { y: 112 }
	"hidden": { y: 0 }
searchBar.stateSwitch("shown")

searchBar_Shape = new Layer
	parent: searchBar
	width: searchBar.width - 14 * 2
	height: 52
	x: Align.center
	y: Align.center

searchBar_Shape.states =
	"search":
		backgroundColor: "white"
		borderRadius: 12
		borderWidth: 2
		borderColor: "FFCC00"
	"url":
		backgroundColor: "rgba(0,0,0,0.05)"
		borderRadius: 12
		borderWidth: 2
		borderColor: "null"
searchBar_Shape.stateSwitch("search")


inputText = new TextLayer
	truncate: true
	parent: searchBar
	width: 360-64*2
	x: 65
	height: 48
	y: Align.center
	fontSize: 16
	lineHeight: 18/16
	text: ""
	color: "black"
	textTransform: "lowercase"
	padding: 
		top: 14

inputText_Null = inputText.copy()
inputText_Null.parent = inputText
inputText_Null.text = "кроссовки найк"
inputText_Null.x = 0
inputText_Null.y = 0

inputText_Null.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0.3 }
inputText_Null.stateSwitch("shown")



inputText.states =
	"left": { x: 65 }
	"center": { x: 65 }
inputText.stateSwitch("left")



searchBar_UrlFake = new Layer
	parent: searchBar
	width: 225
	height: 24
	image: "images/fakeUrl.png"
	x: 63
	y: Align.center





logoIcon = new Layer
	width: 64
	height: 64
	image: "images/logoIcon.png"
	parent: searchBar

closeIcon = new Layer
	width: 64
	height: 64
	image: "images/closeIcon.png"
	parent: searchBar
	x: Align.right

closeIcon.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: .5 }
closeIcon.stateSwitch("hidden")



suggestView_Context = new Layer
	parent: suggestView
	x: 16
	y: 96
	width: screen.width - 18 * 2
	height: 0
	backgroundColor: null


suggestView_UrlActions = new Layer
	parent: suggestView
	width: 358
	height: 80
	y: 104
	image: "images/linkActions.png"

suggestView_LineView = new Layer
	parent: suggestView
	width: screen.width
	y: 104
	backgroundColor: "null"


for suggest_item in [suggestView_Context, searchBar_UrlFake, suggestView_UrlActions, suggestView_LineView]
	suggest_item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	suggest_item.stateSwitch("hidden")





suggestView_Exit = new Layer
	parent: suggestView
	width: screen.width
	height: 640
	backgroundColor: null

suggestView_Exit.draggable.enabled = true
suggestView_Exit.draggable.speedX = 0
suggestView_Exit.draggable.speedY = 0.1

suggestView_Exit.on Events.Drag, (event, layer) ->
	if event.velocity.y > 0.2
		if screenState.states.current.name == "suggestFeed" or screenState.states.current.name == "suggestFeed_typing"
			ignoreSuggestItems(true)
			suggestView_Exit.ignoreEvents = true
			suggestView_Exit.emit Events.Tap


















# Alice View


aliceScreen = new Layer
	width: screen.width
	height: screen.height
	parent: screen
	backgroundColor: "null"

alice_view = new Layer
	parent: aliceScreen
	y: Align.bottom
	width: 360
	height: 360
	image: "images/alice%20view.png"

alice_view.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
alice_view.stateSwitch("hidden")


aliceCloseHandler = (event, layer) ->
	aliceScreen.off(Events.TouchStart, aliceCloseHandler)
	aliceScreen.ignoreEvents = true
	alice_view.animate("hidden")


aliceButton = new Layer
	size: 60
	parent: feedView.content
	x: Align.right(-12)
	y: 42
	backgroundColor: "null"

aliceButton.onTouchStart ->
	aliceScreen.ignoreEvents = false
	aliceScreen.on(Events.TouchStart, aliceCloseHandler)
	alice_view.animate("shown")


# Site View

# siteButton = new Layer

tempButton1 = new Layer
	height: 180
	width: 360
	y: 160
	parent: search_temp1
	backgroundColor: "null"

tempButton1.onTap ->
	browserBar_Text.text = "lamoda.ru"
	siteLamoda.animate("shown")


siteLamoda = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	parent: navigationView
	width: 360
	height: 970
	y: 108
	backgroundColor: "white"
# 	image: "images/siteLamoda.jpg"

siteLamoda.states =
	"hidden": { x: 400 }
	"shown": { x: 0 }
	"test": { x: 200 }
siteLamoda.stateSwitch("hidden")

delete siteLamoda.states.default
delete siteLamoda.states.test


lamodaContent = new Layer
	parent: siteLamoda.content
	width: 390 * 360/390
	height: 1558 * (360/390)
	image: "images/lamodaContent.jpg"

siteLamoda.content.on "change:y", ->
	v = @parent.scrollY
	if @draggable.direction == "up" and v > 20
		searchGuard.stateSwitch("hidden")
	else if @draggable.direction == "down"
		searchGuard.stateSwitch("shown")





tempButton2 = new Layer
	height: 180
	width: 360
	y: 380
	parent: search_temp1
	backgroundColor: "null"

tempButton2.onTap ->
	browserBar_Text.text = "vc.ru"
	siteVC.animate("shown")
	siteVCDarker.animate("shown")


siteVC = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	parent: navigationView
	width: 360
	height: 970
	y: 108
	backgroundColor: "null"

siteVC.states =
	"hidden": { y: screen.height + 132 }
	"shown": { y: 108 }
siteVC.stateSwitch("hidden")

delete siteLamoda.states.default


siteVC.content.on "change:y", ->
	v = @parent.scrollY
	if @draggable.direction == "up" and v > 20
		searchGuard.stateSwitch("hidden")
	else if @draggable.direction == "down"
		searchGuard.stateSwitch("shown")



vcContentA = new Layer
	parent: siteVC.content
	y: 72
	width: 360
	height: 1327
	image: "images/vcContent.jpg"
	borderRadius: 42
	clip: true


siteVCDarker = new Layer
	width: siteVC.width
	height: siteVC.height + siteVC.y
	parent: siteVC.parent
	backgroundColor: "rgba(0,0,0,0.4)"

siteVCDarker.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
siteVCDarker.stateSwitch("hidden")

# Browser

alice = new Layer
	width: 80
	height: 200
	image: "images/alice.png"
	parent: navigationView
	x: 280
	y: screen.height - 56 - (65 + 34 + 16)

alice.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
alice.stateSwitch("hidden")


aliceButtonSite = new Layer
	size: 40
	parent: alice
	x: 20
	y: 88
	backgroundColor: "null"

aliceButtonSite.onTouchStart ->
	aliceScreen.ignoreEvents = false
	aliceScreen.on(Events.TouchStart, aliceCloseHandler)
	alice_view.animate("shown")






browserBar = new Layer
	width: 360
	height: 65 + 34
	image: "images/browserView.png"
	parent: navigationView
# 	y: Align.bottom(-30)

browserBar.states =
	"hidden": { y: Align.bottom(65 + 34 + 8) }
	"shown": { y: Align.bottom(8) }
browserBar.stateSwitch("hidden")


browserBarImage = new Layer
	parent: browserBar
	width: 360, height: 65
	image: "images/browserView.png"



browserBar_Shape = new Layer
	parent: browserBarImage
	width: browserBarImage.width - 16 * 2
	height: browserBarImage.height - 8 * 2
	x: Align.center
	y: Align.center
	backgroundColor: "333"
	opacity: .05
	borderRadius: 10


backIcon = new Layer
	width: 64
	height: 64
	image: "images/backIcon.png"

browserBar_Text = inputText.copy()
browserBar_Text.parent = browserBarImage
browserBar_Text.text = "yandex.ru"
browserBar_Text.textAlign = "center"
browserBar_Text.x = 0
browserBar_Text.y = Align.center
browserBar_Text.children[0].destroy()


menuIcon = new Layer
	width: 40
	height: 64
	image: "images/menuIcon.png"
	opacity: 0.4
# 	opacity: 0

tabsIcon = new Layer
	width: 60
	height: 64
	image: "images/tabsIcon.png"

for item in [backIcon, browserBar_Text, menuIcon, tabsIcon]
	item.parent = browserBar
	if item == browserBar_Text then item.x = Align.left(64)
	else if item == menuIcon then item.x = Align.right(-60)
	else if item == tabsIcon then item.x = Align.right()






# Handlers

defocusHandler = (event, layer) ->
	screenState.stateSwitch("feed")

focusHandler = (event, layer) ->
	if screenState.states.current.name == "feed"
		screenState.stateSwitch("suggestFeed")
	inputLayer.querySelector("#myInput").focus()

focusHandlerSite = (event, layer) ->
	if screenState.states.current.name == "search"
		if inputText.text == "" then screenState.stateSwitch("suggestSite")
		else screenState.stateSwitch("suggestSite_typing")
	inputLayer.querySelector("#myInput").focus()

focusHandlerBottom = (event, layer) ->
	screenState.stateSwitch("suggestUrl_typing")
	inputLayer.querySelector("#myInput").focus()




scrollFeedToSuggest = (event, layer) ->
	feedView.scrollToPoint(x: 0, y: 80)
# 	searchView.scrollToPoint(x: 0, y: 80)

scrollFeedToTop = (event, layer) ->
	feedView.scrollToPoint(x: 0, y: 0)
# 	searchView.scrollToPoint(x: 0, y: 0)




	

typeText = (event, layer) ->
	if screenState.states.current.name == "suggestFeed"
		screenState.stateSwitch("suggestFeed_typing")
	else if screenState.states.current.name == "suggestFeed_typing"
		screenState.stateSwitch("search")




backToHome = (event, layer) ->
	screenState.stateSwitch("feed")

backHandler = (event, layer) ->
	if siteLamoda.states.current.name == "shown"
		siteLamoda.animate("hidden")
		browserBar_Text.text = "yandex.ru"
		return
	else if siteVC.states.current.name == "shown"
		siteVC.animate("hidden")
		browserBar_Text.text = "yandex.ru"
		siteVCDarker.animate("hidden")
		return
	
	if screenState.states.current.name == "search"
		screenState.stateSwitch("feed")

backFromSuggest = (event, layer) ->
	if screenState.states.current.name == "suggestFeed" or screenState.states.current.name == "suggestFeed_typing"
		screenState.stateSwitch("feed")
	else if screenState.states.current.name == "suggestSite" or screenState.states.current.name == "suggestSite_typing"
		screenState.stateSwitch("search")
	else if screenState.states.current.name == "suggestUrl_typing"
		screenState.stateSwitch("search")





clearQuery = (event, layer) ->
	suggestView_Context.stateSwitch("hidden")
	if screenState.states.current.name == "search"
		focusHandlerSite(event, layer)
	else if screenState.states.current.name == "suggestUrl_typing"
		screenState.stateSwitch("suggestSite")
	
	inputLayer.querySelector("#myInput").value = ""
	updateInput()
	inputLayer.querySelector("#myInput").focus()

selectLineQuery = (event, layer) ->
	inputLayer.querySelector("#myInput").value = layer.text
	updateInput()
	submitSearch()

selectQueryFromSuggest = (event, layer) ->
	mergedText = inputText.text + layer.custom.rawText
	inputLayer.querySelector("#myInput").value = mergedText
	updateInput()
	inputLayer.querySelector("#myInput").focus()

restoreSearchText = () ->
	if inputLayer.querySelector("#myInput").value == ""
		inputLayer.querySelector("#myInput").value = successQuery
		updateInput()
		inputLayer.querySelector("#myInput").focus()



ignoreSuggestItems = (ignoreValue = true) ->
	for item in suggestView_LineView.children
		item.ignoreEvents = ignoreValue
	for item in suggestView_Context.children
		item.ignoreEvents = ignoreValue
	suggestView_Exit.ignoreEvents = ignoreValue




feedView_Search.on(Events.Tap, focusHandler)
logoIcon.on(Events.Tap, backToHome)
backIcon.on(Events.Tap, backHandler)

suggestView_Exit.on(Events.Tap, backFromSuggest)

inputText.on(Events.Tap, focusHandlerSite)
browserBar_Text.on(Events.Tap, focusHandlerBottom)
closeIcon.on(Events.Tap, clearQuery)

screenState.stateSwitch("feed")

siteLamoda.placeBefore(searchBar)
browserBar.placeBefore(siteLamoda)
alice.placeBefore(siteLamoda)
siteVC.placeBehind(siteLamoda)
siteVCDarker.placeBehind(siteVC)

# searchBar.placeBehind(siteLamoda)

fix = new Layer
	width: 360
	height: 32
	parent: screen
	backgroundColor: "white"

createButtonView()
createLineView()
updateSuggestContext()
updateSuggestLines()


# suggestView_LineView.y += 200

topBarFix = new Layer
	parent: screen, width: screen.width, height: 36
	backgroundColor: "white"