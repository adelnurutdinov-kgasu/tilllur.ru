
bigSpring = "spring(200,15, -3)"
gentleSpring = "spring(40,5, 0)"
swingSpring = "spring(120,15, 0)"
smoothSpring = "spring(100,20, 0)"
slowSpring = "spring(100,15, -3)"
snapSpring = "spring(200, 20, 0)"
tightSpring = "spring(300, 25, 0)"
straightSpring = "spring(500, 40, 0)"
superSlowSpring = "spring(30,20,0)"

smallTime = 0.1
gentleTime = 0.2


isSwipping = false
# bg = new Layer width: Screen.width, height: Screen.height, backgroundColor: "#222"

screen = new Layer
	width: 320, height: 568, backgroundColor: "222"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "222"

content = new Layer width: 672, height: 1438, x: -16, y: 0, image: "images/content.png"

# scroll = ScrollComponent.wrap(content)
# scroll.scrollHorizontal = false

ballTime = gentleTime

# Init Indicators
indicator_small = new Layer width: 24, height: 24, x: 40, y: 712, borderRadius: "100%", backgroundColor: "rgba(245,166,35,1)", shadowBlur: 8, shadowColor: "rgba(0,0,0,0.5)"
indicator_small.states.add
	hidden: opacity: 0
indicator_small.states.switchInstant("hidden")

indicator_big = new Layer width: 72, height: 72, x: 78, y: 346, borderRadius: "100%", backgroundColor: "rgba(245,166,35,1)", shadowBlur: 8, shadowColor: "rgba(0,0,0,0.5)"
indicator_big.states.add
	hidden: opacity: 0
indicator_big.states.switchInstant("hidden")

# Animate Small Ball
animationA = new Animation
	layer: indicator_small
	properties: { scale: 0.8 }
	curve: straightSpring
	time: ballTime

animationB = new Animation
	layer: indicator_small
	properties: { scale: 1 }
	curve: straightSpring
	time: ballTime

animationA.start()
animationA.on(Events.AnimationEnd, animationB.start)
animationB.on(Events.AnimationEnd, animationA.start)

# Animate Big Ball
animationC = new Animation
	layer: indicator_big
	properties: { scale: 0.8 }
	curve: straightSpring
	time: ballTime

animationD = new Animation
	layer: indicator_big
	properties: { scale: 1 }
	curve: straightSpring
	time: ballTime

animationC.start()
animationC.on(Events.AnimationEnd, animationD.start)
animationD.on(Events.AnimationEnd, animationC.start)

# Cards
card_1 = new Layer width: 640, height: 1158, x: 0, y: 400, image: "images/card 1.png", style: {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}

card_2 = new Layer width: 640, height: 1158, x: 0, y: 616, image: "images/card 2.png", style: {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}

card_3 = new Layer width: 640, height: 1158, x: 0, y: 832, image: "images/card 3.png", style: {"-webkit-filter": "drop-shadow(0px -12px 16px rgba(0,0,0,0.3))"}

cards = [card_1, card_2, card_3]


cardsPlaces = []
for item, i in cards
	cardsPlaces.push(item.y + 46 * 2)
	item.y = item.y + 1000

areCardsBack = false
animateCardsBack = () ->
	for card, i in cards
		value = cardsPlaces[i]
		delayValue = 0.04*i
		
		if areCardsBack
			value = cardsPlaces[i] + 1000 
			delayValue = 0.04*(3-i)
			
		cards[i].animate
			properties: y: value
			delay: delayValue
			time: 0.2
			curve: snapSpring
	
	areCardsBack ^= 1

song_bg = new Layer width: 600, height: 108, x: 20, y: 684, backgroundColor: "#393935", propagateEvents: false

song = new Layer width: 600, height: 108, x: 20, y: 684, image: "images/song.png", propagateEvents: false

song.placeBefore(content)
song_bg.placeBefore(content)










player_min = new Layer width: 640, height: 204, x: 0, y: 932, image: "images/player min.png", style: {"-webkit-filter": "drop-shadow(0px -20px 40px rgba(0,0,0,0.5))"}
player_min.propagateEvents = false

progress_base = new Layer width: 320*2, height: 4, parent: player_min, backgroundColor: "#666"

progress_fill = new Layer width: 320*2, height: 4, parent: progress_base, width: 1, backgroundColor: "#F5A623"


shuffle_base = new Layer width: 150*2, height: 40*2, y: 62*2, image: "images/shuffle base.png", parent: player_min
shuffle = new Layer width: 150*2, height: 40*2, y: 0, image: "images/shuffle.png", parent: shuffle_base, opacity: 0

pause = new Layer width: 120, height: 100, x: 0, y: 4, image: "images/pause.png", parent: player_min
pause.states.add
	hidden: opacity: 0
pause.states.switchInstant("hidden")

player_min.states.add
	hidden: y: 932+42*2
player_min.states.switchInstant("hidden")
player_min.states.animationOptions =
	curve: bigSpring

content.on Events.Click, ->
	if !isIndicating
		startSong()
	
	if !isSwipping
		player_min.states.next()
	

isIndicating = false

startSong = () ->
	if !isIndicating
		startProgress()
		Utils.delay 0.2, ->
			indicator_big.states.switchInstant("default")
		Utils.delay 0.1, ->
			indicator_small.states.switchInstant("default")
		pause.states.switchInstant("default")
	else
		stopProgress()
		indicator_big.states.switch("hidden", time: smallTime)
		indicator_small.states.switch("hidden", time: smallTime)
		pause.states.switch("hidden", time: smallTime)
	
	isIndicating ^= 1


lastTouched = 0
song.on Events.Click, ->
	startSong()

song.on Events.TouchStart, (e) ->
	lastTouched = e.timeStamp
	song.opacity = 0.5

song.on Events.TouchEnd, (e) ->
	if (e.timeStamp - lastTouched < 100)
		Utils.delay 0.1, ->
			song.opacity = 1
	else
		song.opacity = 1


startProgress = () ->
	progress_fill.width = 1
	progress_fill.animate
		properties: width: 640
		time: 60

stopProgress = () ->
	finalValue = progress_fill.width
	progress_fill.animate
		properties: width: finalValue
		time: 0


pause.on Events.Click, ->
	indicator_big.states.switch("hidden", time: smallTime)
	indicator_small.states.switch("hidden", time: smallTime)
	pause.states.switch("hidden", time: smallTime)
	stopProgress()

isShuffling = true
shuffle_base.on Events.Click, ->
	if !isShuffling
		shuffle.opacity = 0
	else
		shuffle.opacity = 1
	
	isShuffling ^= 1

# player_min.on Events.SwipeStart, ->
# 	isSwipping = true
# 
# player_min.on Events.SwipeEnd, ->
# 	Utils.delay 0.1, ->
# 		isSwipping = false
# 
# player_min.on Events.SwipeDown, ->
# 	player_min.states.next()
# 
# player_min.on Events.SwipeUp, ->
# 	player_min.states.next()

playerFix = new Layer
	width: player_min.width
	height: 40
	backgroundColor: "1D1D1D"

buttonCards = new Layer
	width: 640
	y: 282
	backgroundColor: "null"
buttonCards.on Events.Click, ->
	animateCardsBack()

player_min.states.next()


for item in [content, song_bg, song, indicator_small, indicator_big, card_1, card_2, card_3, playerFix, player_min, buttonCards]
	item.parent = tempView

print tempView.height
playerFix.y = tempView.height - 20

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"