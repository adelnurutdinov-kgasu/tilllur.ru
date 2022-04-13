retina = 2

screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

temp = new Layer
	width: 320*retina, height: 568*retina, backgroundColor: "000", parent: screen
	originX: 0, originY: 0, scale: 0.5

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

defaultSpring = "spring(100, 10, 0)"
customSpring = "spring(60, 10, 0)"
colorSwipeBase = "#E5E5EA"
colorSwipeAddNext = "#92EED9"
colorSwipeDelete = "#FF7E7E"
colorSwipeDownload = "#3BCAF9"
colorSwipeFav = "#F7DB7D"
speedSwipeBase = 0.8
speedSwipeSlow = 0.2
timeToNextStep = 0.5
animateAddNextArrows = false
animateDeleteArrows = false
animateFavArrows = false
animateDownloadArrows = false
canAnimateAddNext = false
canAnimateDelete = false
canAnimateFav = false
canAnimateDownload = false

bg = new Layer width: 320*retina, height: 568*retina, backgroundColor: "#EFEFEF"

iphone = new Layer width: 320*retina, height: 640*retina, image: "images/iphone.png"
iphone.states.add {
	"initial": {y: 568*retina}
	"main": {y: 100*retina}
	"reload": {y: 420*retina}
	"congratulations": {y: 370*retina}
}
iphone.stateSwitch "initial"

texts = []
for item in [1..4]
	texts.push (new Layer width: 320*retina, height: 100*retina, y: 24*retina,  image: "images/text" + item + ".png", superLayer: bg)
	texts[item-1].states.add {
		"hide": {opacity: 0}
		"show": {opacity: 1} 
	}
	texts[item-1].stateSwitch "hide"
	
containerSize = 256
congratulations = new Layer width: 320*retina, height: 200*retina, image: "images/congratulations.png", opacity: 0
button = new Layer width: 200*retina, height: 40*retina, x: 60*retina, y: 226*retina, image: "images/button.png", opacity: 0


screen = new Layer width: 256*retina, height: 344*retina, y: (124+51)*retina, x: 33*retina, superLayer: iphone
navBar = new Layer width: 252*retina, height: 137, image: "images/navbar.png", superLayer: iphone, y: 124*retina, x: 35*retina

songViewAddNext = new Layer width: 256*retina, height: 60*retina, superLayer: screen, backgroundColor: colorSwipeBase
songAddNextIcon = new Layer width: 256*retina, height: 60*retina, image: "images/iconnext.png", superLayer: songViewAddNext
songAddNext = new Layer width: containerSize*retina, height: 60*retina, superLayer: songViewAddNext, image: "images/songbase1.png"
songAddNext.states.add { initial: {x: 0}, show: {opacity: 1, scale: 1} , hide: {opacity: 0, scale: 0.8}}

songViewDelete = new Layer width: 256*retina, height: 60*retina, superLayer: screen, backgroundColor: colorSwipeBase, y: 60*retina
songDeleteIcon = new Layer width: 256*retina, height: 60*retina, image: "images/iconnext.png", superLayer: songViewDelete
songDelete = new Layer width: containerSize*retina, height: 60*retina, superLayer: songViewDelete, image: "images/songbase2.png"

songDelete.states =
	"initial": {x: 0}
	"show": {opacity: 1, scale: 1}
	"hide": {opacity: 0, scale: 0.8}

songViewFav = new Layer width: 256*retina, height: 60*retina, backgroundColor: colorSwipeBase, superLayer: screen, y: 120*retina
songFavIcon = new Layer width: 256*retina, height: 60*retina, image: "images/iconfav.png", superLayer: songViewFav
songFav = new Layer width: containerSize*retina, height: 60*retina, superLayer: songViewFav, image: "images/songbase3.png"
songFav.states.add { initial: {x: 0}, show: {opacity: 1, scale: 1} , hide: {opacity: 0, scale: 0.8}}

songViewDownload = new Layer width: 256*retina, height: 60*retina, superLayer: screen, backgroundColor: colorSwipeBase, y: 180*retina
songDownloadIcon = new Layer width: 256*retina, height: 60*retina, image: "images/iconfav.png", superLayer: songViewDownload
songDownload = new Layer width: containerSize*retina, height: 60*retina, superLayer: songViewDownload, image: "images/songbase4.png"
songDownload.states.add { initial: {x: 0}, show: {opacity: 1, scale: 1} , hide: {opacity: 0, scale: 0.8}}

songs = new Layer width: 256*retina, height: 180*retina, image: "images/songs.png", superLayer: screen, y: 240*retina

initializeSongDraggableFeature = (songLayer, yPosition) ->
	songLayer.draggable.enabled
	songLayer.draggable.speedX = speedSwipeBase
	songLayer.draggable.speedY = 0
	songLayer.draggable.overdrag = true
	songLayer.draggable.momentum = false
	songLayer.draggable.bounce = true
	songLayer.draggable.constraints = {x: 0, y: yPosition, width: containerSize*2*retina, height: 60*retina}
	
initializeSongDraggableFeature(songAddNext, 0)
initializeSongDraggableFeature(songDelete, 60*retina)
initializeSongDraggableFeature(songFav, 120*retina)
initializeSongDraggableFeature(songDownload, 180*retina)



tipAddNext = new Layer width: 320*retina, height: 40*retina, y: 285*retina, backgroundColor: "rgba(0,0,0,0)", opacity: 1
tipAddNextRound = new Layer width: 40*retina, height: 40*retina, image: "images/roundnext.png", x: 66*retina, superLayer: tipAddNext, opacity:0
tipAddNextArrows = []
tipAddNextArrows.push tipAddNextRound
for arrowItem in [0..2]
	tipAddNextArrows.push new Layer width: 22*retina, height: 40*retina, image: "images/arrownext.png", superLayer: tipAddNext, x: 120*retina + arrowItem*22*retina, name: "addarrownext"+arrowItem, opacity: 0


tipDelete = new Layer width: 320*retina, height: 40*retina, y: 345*retina, backgroundColor: "rgba(0,0,0,0)", opacity: 1
tipDeleteRound = new Layer width: 40*retina, height: 40*retina, image: "images/rounddelete.png", x: 66*retina, superLayer: tipDelete, opacity: 0
tipDeleteArrows = []
tipDeleteArrows.push tipDeleteRound
for arrowItem in [0..4]
	tipDeleteArrows.push new Layer width: 22*retina, height: 40*retina, image: "images/arrowdelete.png", superLayer: tipDelete, x: 120*retina + arrowItem*22*retina, name: "addarrowdelete"+arrowItem, opacity: 0
	

tipFav = new Layer width: 320*retina, height: 40*retina, y: 405*retina, backgroundColor: "rgba(0,0,0,0)", opacity: 1
tipFavRound = new Layer width: 40*retina, height: 40*retina, image: "images/roundfav.png", x: 220*retina, superLayer: tipFav, opacity: 0
tipFavArrows = []
tipFavArrows.push tipFavRound
for arrowItem in [0..2]
	tipFavArrows.push new Layer width: 22*retina, height: 40*retina, image: "images/arrowfav.png", superLayer: tipFav, x: 186*retina - arrowItem*22*retina, name: "addarrowfav"+arrowItem, opacity: 0
	
	
tipDownload = new Layer width: 320*retina, height: 40*retina, y: 465*retina, backgroundColor: "rgba(0,0,0,0)", opacity: 1
tipDownloadRound = new Layer width: 40*retina, height: 40*retina, image: "images/rounddownload.png", x: 220*retina, superLayer: tipDownload, opacity: 0
tipDownloadArrows = []
tipDownloadArrows.push tipDownloadRound
for arrowItem in [0..4]
	tipDownloadArrows.push new Layer width: 22*retina, height: 40*retina, image: "images/arrowdownload.png", superLayer: tipDownload, x: 186*retina - arrowItem*22*retina, name: "addarrowdownload"+arrowItem, opacity: 0


arrowsTime = 0.4
arrowsDelay = 0.1
animateThreeArrows = (arrows, stepNumber) ->
	animateOneArrow(arrows[0], stepNumber)
	Utils.delay arrowsDelay, ->
		animateOneArrow(arrows[1], stepNumber)
	Utils.delay arrowsDelay*2, ->
		animateOneArrow(arrows[2], stepNumber)
	Utils.delay arrowsDelay*3, ->
		animateOneArrow(arrows[3], stepNumber)
		
		
animateFiveArrows = (arrows, stepNumber) ->
	animateThreeArrows(arrows, stepNumber)
	Utils.delay arrowsDelay*4, ->
		animateOneArrow(arrows[4], stepNumber)
	Utils.delay arrowsDelay*5, ->
		animateOneArrow(arrows[5], stepNumber)
	

animateOneArrow = (layerOfArrow, stepNumber) ->
	arrowZeroOfThreeDone = layerOfArrow.animate {properties:{opacity: 1}, time: arrowsTime}
	arrowZeroOfThreeDone.on 'end', ->
		arrowZeroOfThreeDoneAgain = layerOfArrow.animate {properties:{opacity: 0}, time: arrowsTime}
		arrowZeroOfThreeDoneAgain.on 'end', ->
			Utils.delay 1, ->
				if stepNumber == 0 and animateAddNextArrows
					animateOneArrow(layerOfArrow, stepNumber) 
				else if stepNumber == 1 and animateDeleteArrows
					animateOneArrow(layerOfArrow, stepNumber)
				else if stepNumber == 2 and animateFavArrows
					animateOneArrow(layerOfArrow, stepNumber)
				else if stepNumber == 3 and animateDownloadArrows
					animateOneArrow(layerOfArrow, stepNumber)
	
stopAddNextArrowsAnimation = () ->
	animateAddNextArrows = false
	
startAddNextArrowsAnimation = () ->
	animateAddNextArrows = true
	
stopDeleteArrowsAnimation = () ->
	animateDeleteArrows = false
	
startDeleteArrowsAnimation = () ->
	animateDeleteArrows = true
	
stopFavArrowsAnimation = () ->
	animateFavArrows = false
	
startFavArrowsAnimation = () ->
	animateFavArrows = true
	
stopDownloadArrowsAnimation = () ->
	animateDownloadArrows = false
	
startDownloadArrowsAnimation = () ->
	animateDownloadArrows = true



# SWIPES

# SWIPE ADD NEXT
songAddNext.on Events.DragMove, ->
	stopAddNextArrowsAnimation()
	canAnimateAddNext = true
	this.draggable.speedX = Utils.modulate(this.x, [0, 256*retina], [speedSwipeBase, speedSwipeSlow], true)
	if this.x < 0
		this.draggable.speedX = speedSwipeSlow
	if this.x > 60*retina
		songViewAddNext.backgroundColor = colorSwipeAddNext
	else
		songViewAddNext.backgroundColor = colorSwipeBase

songAddNext.on Events.DragEnd, -> 
	if this.x > 60*retina
		songIsAddedNextAnimation = this.animate {properties: {x: containerSize*retina}, time: 0.3 , curve: "ease-out"}
		songIsAddedNextAnimation.on 'end', ->
			songAddNext.stateSwitch "initial"
			songAddNext.stateSwitch "hide"
			songAddNext.animate "show", {time: 0.3}
			songViewAddNext.backgroundColor = colorSwipeBase
			songAddNext.draggable.enabled = false
			goToStepTwo()
			Utils.delay 1.2, ->
				startDeleteArrowsAnimation()
				animateFiveArrows(tipDeleteArrows, 1)
				canAnimateAddNext = false
	else
		startAddNextArrowsAnimation()
		if canAnimateAddNext then animateThreeArrows(tipAddNextArrows, 0)
		this.draggable.speedX = speedSwipeBase
		this.animate 
			properties: {x: 0}
			time: 0.4
			
			

# SWIPE DELETE
songDelete.on Events.DragMove, ->
	stopDeleteArrowsAnimation()
	canAnimateDelete = true
	this.draggable.speedX = Utils.modulate(this.x, [0, 256*2*retina], [speedSwipeBase, speedSwipeSlow], true)
	if this.x < 0
		this.draggable.speedX = speedSwipeSlow
	else if this.x > 120*retina
		songViewDelete.backgroundColor = colorSwipeDelete
		songDeleteIcon.image = "images/icondelete.png"
	else if this.x > 60*retina
		songViewDelete.backgroundColor = colorSwipeAddNext
		songDeleteIcon.image = "images/iconnext.png"
	else
		songViewDelete.backgroundColor = colorSwipeBase

songDelete.on Events.DragEnd, -> 
	if this.x > 120*retina
		songIsDeletedAnimation = this.animate
			x: containerSize*retina, y: @states.default.y
			options:
				time: 0.2 , curve: "ease-out"
		
		songIsDeletedAnimation.on Events.AnimationEnd, ->
			songDelete.stateSwitch("initial")
			songDelete.stateSwitch("hide")
			songDelete.stateSwitch("show")
		
			songViewDelete.backgroundColor = colorSwipeBase
			songDelete.draggable.enabled = false
			goToStepThree()
			Utils.delay 1.2, ->
				startFavArrowsAnimation()
				animateThreeArrows(tipFavArrows, 2)
				canAnimateDelete = false
	else
		startDeleteArrowsAnimation()
		if canAnimateDelete then animateFiveArrows(tipDeleteArrows, 1)
		this.draggable.speedX = speedSwipeBase
		this.animate 
			x: 0, y: @states.default.y
			options:
				time: 0.4


# SWIPE MAKE FAVOURITE
songFav.on Events.DragMove, ->
	stopFavArrowsAnimation()
	canAnimateFav = true
	if this.x > 0
		this.draggable.speedX = Utils.modulate(this.x, [0, 100*retina], [speedSwipeBase, 0], true)
	if this.x < -60*retina
		songViewFav.backgroundColor = colorSwipeFav
	else
		this.draggable.speedX = Utils.modulate(this.x, [0, -256*retina], [speedSwipeBase+0.3, speedSwipeBase+0.2], false)
		songViewFav.backgroundColor = colorSwipeBase

songFav.on Events.DragEnd, -> 
	if this.x < -60*retina
		songIsFaved = this.animate
			x: -containerSize*retina, y: @states.default.y
			options:
				time: 0.3 , curve: "ease-out"
		songIsFaved.on 'end', ->
			songFav.stateSwitch "initial"
			songFav.stateSwitch "hide"
			songFav.animate "show", {time: 0.3}
			songViewFav.backgroundColor = colorSwipeBase
			songFav.draggable.enabled = false
			goToStepFour()
			Utils.delay 1.2, ->
				startDownloadArrowsAnimation()
				animateFiveArrows(tipDownloadArrows, 3)
				canAnimateFav = false
	else
		startFavArrowsAnimation()
		if canAnimateFav then animateThreeArrows(tipFavArrows, 2)
		this.draggable.speedX = speedSwipeBase
		this.animate 
			x: 0, y: @states.default.y
			options:
				time: 0.4


# SWIPE DOWNLOAD
songDownload.on Events.DragMove, ->
	stopDownloadArrowsAnimation()
	canAnimateDownload = true
	if this.x > 0
		this.draggable.speedX = Utils.modulate(this.x, [0, 100*retina], [speedSwipeBase, 0], true)
	else if this.x < -120*retina
		songViewDownload.backgroundColor = colorSwipeDownload
		songDownloadIcon.image = "images/icondownload.png"
	else if this.x < -60*retina
		songViewDownload.backgroundColor = colorSwipeFav
		songDownloadIcon.image = "images/iconfav.png"
	else
		this.draggable.speedX = Utils.modulate(this.x, [0, -256*2*retina], [speedSwipeBase+0.6, speedSwipeBase+0.4], false)
		songViewDownload.backgroundColor = colorSwipeBase

songDownload.on Events.DragEnd, -> 
	if this.x < -120*retina
		songIsDownloaded = this.animate
			x: -containerSize*retina, y: @states.default.y
			options:
				time: 0.2 , curve: "ease-out"
		songIsDownloaded.on 'end', ->
			songDownload.stateSwitch "initial"
			songDownload.stateSwitch "hide"
			songDownload.animate "show", {time: 0.3}
			songViewDownload.backgroundColor = colorSwipeBase
			songDownload.draggable.enabled = false
			goToStepFive()
			canAnimateDownload = false
	else
		startDownloadArrowsAnimation()
		if canAnimateDownload then animateFiveArrows(tipDownloadArrows, 3)
		this.draggable.speedX = speedSwipeBase
		this.animate 
			x: 0, y: @states.default.y
			options:
				time: 0.4




# STEP TO STEP ANIMATION

songDelete.draggable.enabled = false
songFav.draggable.enabled = false
songDownload.draggable.enabled = false

goToStepTwo = () ->
	iphone.animate "reload", {time: timeToNextStep}
	texts[0].animate "hide", {time: timeToNextStep}
	texts[1].animate "show", {time: timeToNextStep, delay: timeToNextStep}
	Utils.delay timeToNextStep + 0.1, ->
		iphone.animate "main", {curve: customSpring, time: 0.3}
		songDelete.draggable.enabled = true
	

goToStepThree = () ->
	iphone.animate "reload", {time: timeToNextStep}
	texts[1].animate "hide", {time: timeToNextStep}
	texts[2].animate "show", {time: timeToNextStep, delay: timeToNextStep}
	Utils.delay timeToNextStep + 0.1, ->
		iphone.animate "main", {curve: customSpring, time: 0.3}
		songFav.draggable.enabled = true


goToStepFour = () ->
	iphone.animate "reload", {time: timeToNextStep}
	texts[2].animate "hide", {time: timeToNextStep}
	texts[3].animate "show", {time: timeToNextStep, delay: timeToNextStep}
	Utils.delay timeToNextStep + 0.1, ->
		iphone.animate "main", {curve: customSpring, time: 0.3}
		songDownload.draggable.enabled = true


goToStepFive = () ->
	iphone.animate "reload", {time: timeToNextStep}
	texts[3].animate "hide", {time: timeToNextStep}
	congratulations.animate {
		properties: {opacity: 1}
		time: 0.2
		delay: 0.3
	}
	button.animate {
		properties: {scale: 1, opacity: 1}
		time: 0.5
		delay: 0.7
		curve: defaultSpring
	}
	Utils.delay timeToNextStep + 0.1, ->
		iphone.animate "congratulations", {curve: customSpring, time: 0.2}



for item in [bg, iphone, congratulations, button, tipAddNext, tipDelete, tipFav, tipDownload]
	item.parent = temp

startButton = new TextLayer
	parent: temp
	text: "Press to start"
	x: Align.center, y: Align.center

isStarted = false
temp.onTap ->
	if !isStarted
		startButton.opacity = 0
		isStarted = true
		iphone.animate "main", {curve: defaultSpring}
		texts[0].animate "show", {delay: 0.5}
		
		Utils.delay 0.5, ->
			startAddNextArrowsAnimation()
			animateThreeArrows(tipAddNextArrows, 0)


