


retina = 2

{Card} = require 'card'

cardsTime = 0.2
cardsCurve = "spring(200, 25, 10)"
cardsLongCurve = "spring(300, 25, 10)"

screen = new Layer
	width: 320, height: 568, backgroundColor: "111"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, backgroundColor: "111", topTheme: "light" }


temp = new Layer
	parent: screen, width: screen * 2, height: screen * 2
	scale: 0.5, originX: 0, originY: 0

# bg = new Layer
# 	width: Screen.width
# 	height: Screen.height
# 	backgroundColor: "#222"

scroll = new ScrollComponent
	width: 640
	height: 845
	scrollHorizontal: false
	y: 168


play_random = new Layer width: 580, height: 34, x: 28, y: 36, image: "images/play random.png", parent: scroll.content


cards = []
cardsY = []
prevTappedCard = null

for i in [0..10]
	card = new Card width: 640, height: 1158, x: 0, y: 216*i+70*2, image: "images/card #{i%4}.png", style: {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}
	cards.push(card)


for card, i in cards
	card.parent = scroll.content
	card.cardID = i
	cardsY[i] = card.y
	
	card.on Events.Click, (event, layer) ->
# 		print "prev: #{prevTappedCard}"
		if layer == prevTappedCard
			prevTappedCard = null
			for card in cards
# 				addedY = 120
				addedY = 0
				if layer.cardID == 0
					addedY = 0
				positionY = cardsY[card.cardID] + addedY
				
# 				print "#{positionY}"
				card.animate
					properties: { y: positionY}
					time: cardsTime * 2
					curve: cardsLongCurve
					delay: 0.04 * card.cardID
			
# 			scrollCardsViewBack(currentID)
			
		else
			prevTappedCard = layer
# 			print "added prev: #{prevTappedCard}"
			currentID = layer.cardID
# 			print "id #{currentID}"
		
			for card in cards
		
				positionY = 0
				if card.cardID > currentID
					positionY = cardsY[card.cardID] + cards[0].height - 108*retina + 16
				else
					positionY = cardsY[card.cardID]
			
				card.animate
					properties: { y: positionY }
					time: cardsTime
					curve: cardsLongCurve
		
			scrollCardsView(currentID)


nav_bar = new Layer width: 640, height: 168, x: 0, y: 0, image: "images/nav bar.png"

player = new Layer width: 720, height: 264, x: -40, y: 953, image: "images/player.png"



scrollCardsView = (cardID) ->
	scrollValueY = cardsY[cardID] - 8*2

	scroll.scrollToPoint(
		x: 0, y: scrollValueY
		true
		time: cardsTime * 4
		curve: cardsCurve
)






for card, i in cards
	card.y = cardsY[i] + 1000

scroll.scrollY = 100

for card, i in cards
		card.animate
			properties: { y: cardsY[i] }
			time: 1
			curve: cardsCurve
			delay: 0.04*i + 1

# nav_bar.on Events.Click, ->
# 	for card, i in cards
# 		card.animate
# 			properties: { y: cardsY[i] }
# 			time: 1
# 			curve: cardsCurve
# 			delay: 0.04*i
# 	
# 	Utils.delay 1.2, ->
# 		currentID = 0
# 		for card in cards
# 			positionY = 0
# 		
# 			if card.cardID > currentID
# 				positionY = cardsY[card.cardID] + cards[0].height - 108*retina + 16
# 			else
# 				positionY = cardsY[card.cardID]
# 			
# 			card.animate
# 				properties: { y: positionY }
# 				time: cardsTime
# 				curve: cardsLongCurve
# 		
# 			scrollCardsView(currentID)
# 

for item in [scroll, nav_bar, player]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"
