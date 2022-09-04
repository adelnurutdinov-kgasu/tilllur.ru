
retina = 1

screen = new Layer
	width: 375, height: 667

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


localCurve = "ease-in-out"
localTime = 0.1


# Buttons
bg = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, image: "images/bg.png"



plate = new Layer width: 308*retina, height: 76.0*retina, x: 30*retina, y: 442*retina, borderRadius: 100*retina, backgroundColor: "rgba(255,255,255,1)", shadowY: 34*retina, shadowBlur: 44*retina, shadowColor: "rgba(55,130,188,0.4760812952898551)", borderWidth: 1*retina, borderColor: "rgba(238,238,238,1)", opacity: 1

plate.states.add
	hidden: { y: 500*retina, opacity: 0, scale: 0.8 }
	base: { y: 442*retina, opacity: 1, scale: 1}

plate.states.switchInstant("hidden")


howbg = new Layer width: 220*retina, height: 64*retina, x: 36*retina, y: 448*retina, borderRadius: 100*retina, backgroundColor: "rgba(84,201,255,1)", shadowY: 7*retina, shadowBlur: 8*retina, shadowColor: "rgba(55,130,188,0.4)", borderWidth: 2*retina, borderColor: "rgba(80,187,238,1)"

howtext = new Layer width: 140*retina, height: 26*retina, x: 42*retina, y: (16+4)*retina, image: "images/howText.png", parent: howbg

howbg.states.add
	hidden: { y: 506*retina, opacity: 0, scale: 0.8 }
	base: { y: 448*retina, opacity: 1, scale: 1}

howbg.states.switchInstant("hidden")


sharebg = new Layer width: 64*retina, height: 64*retina, x: 268*retina, y: 448*retina, borderRadius: 100*retina, backgroundColor: "rgba(84,201,255,1)", shadowY: 7*retina, shadowBlur: 8*retina, shadowColor: "rgba(55,130,188,0.4)", borderWidth: 2*retina, borderColor: "rgba(80,187,238,1)"

shareicon = new Layer width: 27*retina, height: 31*retina, x: 17*retina, y: 14*retina, image: "images/shareIcon.png", parent: sharebg

sharebg.states.add
	hidden: { y: 506*retina, opacity: 0, scale: 0.8 }
	base: { y: 448*retina, opacity: 1, scale: 1}

sharebg.states.switchInstant("hidden")


# Handlers

howForward = (layer) ->
# 	playFullScreen(videoNativeView, "images/preview tutorial.mp4")
	
	layer.animate
		properties: { scale: 0.97, backgroundColor: "rgba(84,201,255,0.9)", shadowColor: "rgba(55,130,188,0.2)" }
		time: localTime
		curve: localCurve
	layer.children[0].animate 
		properties: { opacity: 0.8 }
		time: localTime
	

howBack = (layer) ->
	layer.animate
		properties: { scale: 1, backgroundColor: "rgba(84,201,255,1)", shadowColor: "rgba(55,130,188,0.4)" }
		time: localTime
		curve: localCurve
	layer.children[0].animate
		properties: { opacity: 1 }
		time: localTime

	playFullScreen(videoNativeView, tutorialVideoPath)


howForwardSimple = (layer) ->
	layer.animate
		properties: { opacity: 0.6 }
		time: localTime
		curve: localCurve

howBackSimple = (layer) ->
	layer.animate
		properties: { opacity: 1 }
		time: localTime
		curve: localCurve
	
	content.states.next(time: localTime*3, curve: localCurve)




appearCurve = "spring(200, 10, 0)"
plate.states.switch("base", curve: appearCurve)
sharebg.states.switch("base", curve: appearCurve)
howbg.states.switch("base", curve: appearCurve)


howbg.on Events.TouchStart, (event, layer) ->
	howForward(layer)

howbg.on Events.TouchEnd,  (event, layer) ->
	howBack(layer)

# Arrow
arrow = new Layer width: 80*retina, height: 56*retina, x: 148*retina, y: -20*retina, image: "images/arrow.png", opacity: 1

# arrow.opacity = 0


arrow.states.add
	hidden:
		y: -112
		x: 295
		opacity: 1

arrowFlag = false
arrowTime = 0.4



arrowMove = () ->
	arrowFlag ^= 1
	
	if !arrowFlag
		arrow.states.switch("default", time: arrowTime*2, curve: "spring(300, 20, 0)")
		Utils.delay arrowTime*4, ->
			arrowMove()
	else
		arrow.states.switch("hidden", time: arrowTime*4, curve: "linear")
		Utils.delay arrowTime*4, ->
			arrowMove()



arrow.placeBehind(bg)

# Video Native
videoNativeView = new VideoLayer
	width: Screen.width
	height: Screen.height
	video: ""
videoNativeView.sendToBack()


tutorialVideoPath = "images/tutorial.mp4"
wasPlayingBefore = false
playFullScreen = (player, videoPath) ->
	wasPlayingBefore = true

	if Utils.isMobile() == true
		player.video = videoPath
		Utils.delay 0.2, ->
			player.bringToFront()
			player.player.webkitEnterFullScreen()
			player.player.play()

Events.wrap(videoNativeView.player).on "pause", ->
	videoNativeView.player.load()
	videoNativeView.sendToBack()
	if wasPlayingBefore
		arrow.placeBefore(bg)
		arrowMove()



for item in [videoNativeView, arrow, bg, plate, howbg, sharebg]
	item.parent = screen

