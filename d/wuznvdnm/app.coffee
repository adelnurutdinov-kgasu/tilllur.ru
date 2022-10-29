{ Preview } = require "PreviewComponent"

screen = new Layer { width: 360, height: 720, backgroundColor: "F2F4F5" }
new Preview { view: screen, borderRadius: 24 }

headerView = new Layer
	parent: screen
	width: 360
	height: 344
	backgroundColor: "white"
	borderRadius: 24


#
header = new Layer
	width: 360
	height: 64
	image: "images/header.png"

informers = new Layer
	width: 360
	height: 48
	image: "images/informers.png"

omni = new Layer
	width: 360
	height: 56
	image: "images/omni.png"

shortcuts = new Layer
	width: 360
	height: 144
	image: "images/shortcuts.png"
	image: "null"
	

statusBar = new Layer
	width: 360
	height: 32
	backgroundColor: "white"
# 	image: "images/statusBar.png"

card = new Layer
	width: 360
	height: 466
	image: "images/card%20(3).png"

sumY = 0
for item in [statusBar, header, omni, shortcuts, informers]
	item.parent = headerView
	item.y = sumY
	sumY += item.height

card.parent = screen
card.y = sumY + 6


scrollCards = new PageComponent
	originX: 0.08
	parent: shortcuts
	y: 12
	width: 360
	height: 120
	scrollVertical: false
	directionLock: true
	contentInset: 
		right: 16


#


covidStack = new PageComponent
	size: 120
	borderRadius: 16
	clip: true
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	backgroundColor: "FFEFE5"


covid_0 = new Layer
	width: 120
	height: 120
	image: "images/covid%200.png"

covid_1 = new Layer
	width: 120
	height: 120
	image: "images/covid%201.png"

covid_2 = new Layer
	width: 120
	height: 120
	image: "images/covid%202.png"

for item in [covid_0, covid_1, covid_2]
	covidStack.addPage(item, "bottom")



progressBar = new Layer
	size: 32
	x: Align.right
	backgroundColor: "null"
	parent: covidStack

step1 = new Layer
	parent: progressBar
	width: 8
	height: 2
	y: 11
	borderRadius: 2

step2 = new Layer
	parent: progressBar
	width: 8
	height: 2
	y: 15
	borderRadius: 2

step3 = new Layer
	parent: progressBar
	width: 8
	height: 2
	y: 19
	borderRadius: 2

for item in [step1, step2, step3]
	item.x = 14
	item.backgroundColor = "545454"
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.3 }
	if item == step1 then item.stateSwitch("shown")
	else item.stateSwitch("hidden")

showStep = (index) ->
	for item, i in [step1, step2, step3]
		if i == index
			item.stateSwitch("shown")
		else item.stateSwitch("hidden")


covidStack.on "change:currentPage", ->
	if covidStack.currentPage == covidStack.content.children[0]
		showStep(0)
	else if covidStack.currentPage == covidStack.content.children[1]
		showStep(1)
	else
		showStep(2)

#


tradesStack = new PageComponent
	size: 120
	borderRadius: 16
	clip: true
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	backgroundColor: "FFEFE5"


trade_0 = new Layer
	width: 120
	height: 120
	image: "images/trades_0.png"

trade_1 = new Layer
	width: 120
	height: 120
	image: "images/trades_1.png"

for item in [trade_0, trade_1]
	tradesStack.addPage(item, "bottom")



progressBarTrades = new Layer
	size: 32
	x: Align.right
	backgroundColor: "null"
	parent: tradesStack

step1trades = new Layer
	parent: progressBarTrades
	width: 8
	height: 2
	y: 13
	borderRadius: 2

step2trades = new Layer
	parent: progressBarTrades
	width: 8
	height: 2
	y: 17
	borderRadius: 2


for item, i in [step1trades, step2trades]
	item.x = 14
	item.backgroundColor = "545454"
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.3 }
	if i == 0 then item.stateSwitch("shown")
	else item.stateSwitch("hidden")

showStepTrades = (index) ->
	for item, i in [step1trades, step2trades]
		if i == index
			item.stateSwitch("shown")
		else item.stateSwitch("hidden")


tradesStack.on "change:currentPage", ->
	if @currentPage == @content.children[0]
		showStepTrades(0)
	else if @currentPage == @content.children[1]
		showStepTrades(1)
	else
		showStepTrades(2)


#

short_0 = new Layer
	width: 120
	height: 120
	image: "images/short%200.png"

short_1 = new Layer
	width: 120
	height: 120
	image: "images/short%201.png"

short_2 = new Layer
	width: 120
	height: 120
	image: "images/short%202.png"

# short_3 = new Layer
# 	width: 120
# 	height: 120
# 	image: "images/short%203.png"

short_4 = new Layer
	width: 120
	height: 120
	image: "images/short%204.png"

short_5 = new Layer
	width: 120
	height: 120
	image: "images/short%205.png"

short_6 = new Layer
	width: 120
	height: 120
	image: "images/short%206.png"

# short_7 = new Layer
# 	width: 120
# 	height: 120
# 	image: "images/short%207.png"

short_8 = new Layer
	width: 120
	height: 120
	image: "images/short%208.png"

short_9 = new Layer
	width: 120
	height: 120
	image: "images/short%209.png"

short_10 = new Layer
	width: 120
	height: 120
	image: "images/short%2010.png"


cards = [short_0, short_1, short_6, short_2, short_4, short_5, covidStack, short_8, tradesStack, short_9, short_10]

cards = cards.reverse()

for item, i in cards
	item.parent = scrollCards.content
	item.x = 16 + i * (120 + 8)






