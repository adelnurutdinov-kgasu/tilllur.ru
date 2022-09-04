

retina = 1

isLoopStopRequired = false
threshold = 4




screen = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(243,243,243,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


ipad = new Layer
	width: 300*retina
	height: 220*retina
	x: 30*retina
	y: 130*retina
	image: "images/ipad.png"

ipad.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }

ipad.stateSwitch("hidden")

phone = new Layer
	width: 300*retina
	height: 500*retina
	x: 30*retina
	y: -55*retina
	image: "images/phone.png"
	originX: 1
	originY: 0.8

phone.states =
	"base": { scale: 1 }
	"small": { scale: 0.5 }

phone.on Events.StateSwitchStart, (fromState, toState) ->
	if fromState is "small"
		ipad.animate("hidden")

phone.on Events.StateSwitchEnd, (fromState, toState) ->
	if toState is "small"
		ipad.animate("shown")

phone.stateSwitch("base")






videoView = new Layer
	width: 224*retina
	height: 360*retina
	x: 65*retina
	y: 11*retina
	originX: 1.2
	originY: 1

videoView.states =
	"base": { scale: 1 }
	"small": { scale: 0.5 }

videoView.stateSwitch("base")

capture_1 = new VideoLayer
	width: 224*retina
	height: 393*retina
	parent: videoView
	y: -26*retina
	video: "images/capture 1.mov"

capture_2 = new VideoLayer
	width: 224*retina
	height: 393*retina
	parent: videoView
	y: -26*retina
	video: "images/capture 2.mov"

playerLayers = [capture_1, capture_2]

for item in playerLayers
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }

	item.on Events.StateSwitchEnd, (fromState, toState) ->
		if toState is "hidden"
			@player.pause()
			@player.currentTime = 0
			@player.volume = 0
			isLoopStopRequired = false
		else if toState is "shown"
			@player.loop = true
			@player.play()

capture_1.stateSwitch("shown")
capture_2.stateSwitch("hidden")






getPlayers = () ->
	localPlayingPlayer = null
	localStoppedPlayer = null
	
	for item in playerLayers
		if item.states.current.name is "shown" then localPlayingPlayer = item
		else localStoppedPlayer = item
			
	if localPlayingPlayer == null or localStoppedPlayer == null
		return null
	
	return [localPlayingPlayer, localStoppedPlayer]



Utils.interval 0.1, ->
	players = getPlayers()
	localPlayingPlayer = players[0]
	localStoppedPlayer = players[1]
	
	localThreshold = localPlayingPlayer.player.duration - localPlayingPlayer.player.currentTime
# 	print localThreshold
	
	if isLoopStopRequired and localThreshold > threshold
		localPlayingPlayer.stateSwitch("hidden")
		localStoppedPlayer.stateSwitch("shown")
	
	if isLoopStopRequired and localPlayingPlayer.player.duration - localPlayingPlayer.player.currentTime < 0.8
		localPlayingPlayer.stateSwitch("hidden")
		localStoppedPlayer.stateSwitch("shown")


changeBackgroundSmooth = () ->
	isLoopStopRequired = true
	
	players = getPlayers()
	localPlayingPlayer = players[0]
	localStoppedPlayer = players[1]
	
	localPlayingPlayer.player.loop = false








optionsView = new PageComponent
	width: 360*retina
	height: 140*retina
	x: 0*retina
	y: 452*retina
	scrollVertical: false

options_block_1 = new Layer
	width: 360*retina
	height: 140*retina
	x: 0*retina
	y: 452*retina
	image: "images/options block 1.png"

options_block_2 = new Layer
	width: 360*retina
	height: 140*retina
	x: 360*retina
	y: 452*retina
	image: "images/options block 2.png"

options_block_3 = new Layer
	width: 360*retina
	height: 140*retina
	x: 720*retina
	y: 452*retina
	image: "images/options block 3.png"





optionsBlocks = [options_block_1, options_block_2, options_block_3]
for block, i in optionsBlocks
	block.y = 0
	block.parent = optionsView.content
	block.name = "block_#{i+1}"
	block.on Events.Click, ->
		optionsView.snapToNextPage("right", true, { time: 1 })

prevCurrentPage = "block_1"
optionsView.on "change:currentPage", ->
	currentPage = optionsView.currentPage.name
	
	if currentPage is "block_2" and prevCurrentPage is "block_1"
		changeBackgroundSmooth()
	else if currentPage is "block_1" and prevCurrentPage is "block_2"
		changeBackgroundSmooth()
	
	if currentPage is "block_3"
		phone.animate("small")
		videoView.animate("small")
	else if currentPage is "block_2"
		phone.animate("base")
		videoView.animate("base")

	
	prevCurrentPage = currentPage


navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

for item in [ipad, phone, videoView, optionsView, navbar]
	item.parent = screen