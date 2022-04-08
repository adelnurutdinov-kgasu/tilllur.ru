
screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

retina = 1
colorNone = "rbg(0,0,0,0)"
pageSize = 320*retina
activeRound = 1

bg = new Layer width: 320*retina, height: 568*retina, image:"images/bg.png"
actionBar = new Layer width: 320*retina, height: 56*retina, superLayer: bg, y: Align.bottom, image: "images/bar.png"

makeRoundPassive = (roundLayer) ->
	roundLayer.borderColor = "#8D8D8D"
	roundLayer.backgroundColor = "#191919"
	
makeRoundActive = (roundLayer) ->
	roundLayer.borderColor = "white"
	roundLayer.backgroundColor = "white"
	

roundBox = new Layer width: 82*retina, height: 10*retina, x: 119*retina, y: 420*retina, backgroundColor: colorNone
round1 = new Layer borderRadius: 10, borderWidth: 2*retina, width: 10*retina, height: 10*retina, superLayer: roundBox
round2 = new Layer borderRadius: 10, borderWidth: 2*retina, width: 10*retina, height: 10*retina, superLayer: roundBox, x: 36*retina
round3 = new Layer borderRadius: 10, borderWidth: 2*retina, width: 10*retina, height: 10*retina, superLayer: roundBox, x: 72*retina

roundArray = [round1, round2, round3]

cleanRounds = () ->
	for item in [round1, round2, round3]
		makeRoundPassive(item)

cleanRounds()
makeRoundActive(round1)	


slider = new PageComponent width: 320*retina, height: 400*retina, superLayer: bg
slider.scrollVertical = false
slider.speedX = 0.6

page1 = new Layer width: pageSize, height: 400*retina, image: "images/step1.png", superLayer: slider.content
page2 = new Layer width: pageSize, height: 400*retina, image: "images/step2.png", superLayer: slider.content, x: pageSize
page3 = new Layer width: pageSize, height: 400*retina, image: "images/step3.png", superLayer: slider.content, x: pageSize * 2



checkClosestRound = (sliderLayer) ->
	closestRound = sliderLayer.closestContentLayer(0.5, 0.5)
	if closestRound == page1 and activeRound != 1
		cleanRounds()
		makeRoundActive(round1)
		activeRound = 1
	else if closestRound == page2 and activeRound != 2
		cleanRounds()
		makeRoundActive(round2)
		activeRound = 2
	else if closestRound == page3 and activeRound != 3
		cleanRounds()
		makeRoundActive(round3)
		activeRound = 3
	
	
slider.on Events.Move, ->
	checkClosestRound(slider)	
	
for item in [bg, roundBox]
	item.parent = screen