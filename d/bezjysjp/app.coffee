# Use desktop cursor
document.body.style.cursor = "auto"

# screen_view.center()
Framer.Extras.Hints.disable()


# Gists
shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source

# Content

pageScroll = new ScrollComponent
	parent: browser
	width: browser.width
	height: browser.height
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true

content.x = 0
content.y = 0
content.parent = pageScroll.content


viewPoint.opacity = 0
pageScroll.scrollToPoint({x: 0, y: 1200}, false)

content.image = "images/content.jpg"
screen_view.image = "images/bro.png"

# Data



initURLs = [
	"images/cards/card 10.png",
	"images/cards/card 11.png",
	"images/cards/card 12.png",
	"images/cards/card 15.png",
	"images/cards/card 16.png",
	"images/cards/card 17.png",
	"images/cards/card 20.png",
	"images/cards/card 21.png",
	"images/cards/card 22.png",
	"images/cards/card 25.png",
	"images/cards/card 26.png",
	"images/cards/card 27.png",
	"images/cards/card 30.png",
	"images/cards/card 31.png",
	"images/cards/card 32.png",
	"images/cards/card 40.png",
	"images/cards/card 41.png",
	"images/cards/card 50.png",
	"images/cards/card 51.png"
]

initUniqueURLs = [
	"images/cards/card 12.png",
	"images/cards/card 16.png",
	"images/cards/card 20.png",
	"images/cards/card 27.png",
	"images/cards/card 31.png",
	"images/cards/card 42.png",
	"images/cards/card 50.png",
	"images/cards/card 61.png",
]

initUniqueURLs2 = [
	"images/cards/card 10.png",
	"images/cards/card 15.png",
	"images/cards/card 21.png",
	"images/cards/card 26.png",
	"images/cards/card 30.png",
	"images/cards/card 41.png",
	"images/cards/card 51.png",
	"images/cards/card 60.png",
]

randomURLs = [].concat(initURLs)
shuffle(randomURLs)

#

# URL: json, blur, start, finish

isUniqueCards = false

queryArray = location.search[1..].split('&')
for item in queryArray
	keyValuePair = item.split("=")
	
	if keyValuePair[0] == "unique"
		if keyValuePair[1] == "true" then isUniqueCards = true



cardScroll = new ScrollComponent
	parent: pageScroll.content
	width: 920
	height: 258
	x: Align.center
	y: 1500
	directionLock: true
	scrollVertical: false


# Cards

cards = []
createCards = () ->
	if isUniqueCards then currentArray = initUniqueURLs else currentArray = initURLs
	
	for item, i in currentArray
		number = "#{item}"
		if item < 10 then number = "0#{item}"
		
		card = new Layer
			width: 188
			height: 188
			x: (188 + 16) * i
		
		card.parent = cardScroll.content
		cards.push(card)


updateCards = (localArray) ->
	for card, i in cards
		card.image = "#{localArray[i]}"




createCards()


# Buttons

button = new TextLayer
	text: "Cards order: Random"
	color: "white"
	padding:
		top: 8
# 	parent: browser
	width: 180
	height: 40
	textAlign: "center"
	fontSize: 16
	x: Align.right(-40)
	y: 20
	borderRadius: 6

button.states =
	"random":
		backgroundColor: "rgba(0,0,0,0.4)"
	"base":
		backgroundColor: "rgba(0,0,0,0.5)"

button.on Events.StateSwitchEnd, (from, to) ->
	if to is "random"
		if isUniqueCards
			updateCards(initUniqueURLs)
		else
			updateCards(initURLs)
	else
		if isUniqueCards
			updateCards(initUniqueURLs2)
		else
			shuffle(randomURLs)
			updateCards(randomURLs)

button.on Events.Click, ->
	if @states.current.name == "random"
		@stateSwitch("base")
		@text = "Cards order: Custom"
		if isUniqueCards
			@text = "Набор 1"
	else
		@stateSwitch("random")
		@text = "Cards order: Random"
		if isUniqueCards
			@text = "Набор 2"

button.stateSwitch("base")

# test = new Layer

#

screen_view.opacity = 0 
# browser.parent = null
# browser.center()

button.bringToFront()


fix = new Layer
	parent: pageScroll.content
	width: 405
	height: 47
	image: "images/fix.png"
	backgroundColor: "white"
	x: 327
	y: 1438



# screen_view
{ Preview } = require "PreviewComponent"
preview = new Preview { view: browser, borderRadius: 8, visible: false }
# preview.printTree()