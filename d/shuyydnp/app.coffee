# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""


{Card} = require 'card'

retina = 2
cardCounter = 0
cardsTime = 0.2
cardsCurve = "spring(200, 10, 4)"
cardsLongCurve = "spring(300, 10, 4)"


screen = new Layer
	width: 320, height: 568, backgroundColor: "222"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


temp = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "222"

cardContent = new Layer width: 640, height: 730, x: 0, y: 200, backgroundColor: "transparent"


hideHandler = (event, layer) ->
	if layer.y > 240
		clickHandler()


getCard = () ->
	card = new Layer width: 640, height: 730, x: 0, y: 200, image: "images/card.png", scale: 0.94, cardID: cardCounter++, opacity: 0, parent: temp
	card.draggable = true
	card.draggable.constraints = cardContent
	card.draggable.speedX = 0.2
	card.draggable.speedY = 0.6
	
	card.animate
		properties: { opacity: 1}
		time: cardsTime / 2
	
	card.on(Events.DragEnd, hideHandler)
	
	button = new Layer width: 360, height: 28, x: 140, y: 868-100*retina, image: "images/button.png", opacity: 0.5, parent: card
	
# 	button.on(Events.Click, clickHandler)
	
	return card


currentCard = getCard()
currentCard.scale = 1

nextCard = getCard()
nextCard.y = nextCard.y - 20*retina

nextCard.placeBehind(currentCard)





clickHandler = (event, layer) ->
	
	currentCard.animate
		properties: { y: 1136}
		time: cardsTime*4
		curve: cardsCurve
	
	nextCard.animate
		properties: { scale: 1, y: nextCard.y + 20*retina}
		time: cardsTime
		curve: cardsCurve
		
	Utils.delay cardsTime, ->
		removingCard = currentCard
		currentCard = nextCard
		removingCard.destroy()
		
		currentCard.children[0].on(Events.Click, clickHandler)
		
		nextCard = getCard()
		nextCard.y = nextCard.y - 20*retina
		nextCard.placeBehind(currentCard)

















# tile.onDragEnd (event, layer) ->
returnHandler = (event, layer) ->
	layer.animate
		properties:
			x: Align.center
			y: Align.center
		curve: "spring(300, 20, 10)"
		time: 0.1
	
	Utils.delay 0.1, ->
		allowClick = true


# dragStartHandler = (event, layer) ->
currentCard.on(Events.DragEnd, returnHandler)
currentCard.children[0].on(Events.Click, clickHandler)



nav_bar = new Layer width: 640, height: 168, x: 0, y: 0, image: "images/nav bar.png"

base = new Layer width: 720, height: 200, x: -40, y: 956, image: "images/player.png"


Utils.delay 0.5, ->
	clickHandler()


for item in [cardContent, nav_bar, base]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"