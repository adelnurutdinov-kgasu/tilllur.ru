viewSize = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "fff"

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 16, visible: false }


returnViewSize = () ->
	if Canvas.width < 640
		return 3
	else if Canvas.width < 960
		return 2
	else
		return 1

header = new Layer
	backgroundColor: "#2CB968"

logo_mobile = new Layer width: 47, height: 15, x: 15, y: 14, image: "images/logo mobile.png", superLayer: header

logo_big = new Layer width: 56, height: 18, x: 27, y: 20, image: "images/header big.png", superLayer: header

profile = new Layer width: 170, height: 32, image: "images/profile.png"

buttons = new Layer width: 251, height: 13, y: 23, image: "images/buttons.png"





content = new Layer
	y: header.height
	borderColor: "rgba(119,237,68,0.5)"
	borderWidth: 1
	backgroundColor: "rgba(225,247,229,0.5)"






updateLayout = () ->
	viewSize = returnViewSize()
	
	if viewSize == 3
		header.height = 44
		
		logo_mobile.opacity = 1
		logo_big.opacity = 0
		
		profile.x = Canvas.width - 100 - profile.width - 8
		profile.y = 5
		
		buttons.opacity = 0
	
	else if viewSize == 2
		header.height = 58
		
		logo_mobile.opacity = 0
		logo_big.opacity = 1
		
		profile.x = Canvas.width - 100 -profile.width - 16
		profile.y = 15
		
		buttons.opacity = 1
	
	else
		header.height = 58
		
		logo_mobile.opacity = 0
		logo_big.opacity = 1
		
		profile.x = Canvas.width - 100 -profile.width - 16
		profile.y = 15
		
		buttons.opacity = 1
		
	
	header.width = Canvas.width - 100
	
	
	contentSize = 960 / viewSize
	content.height = Canvas.height
	content.width = contentSize
	content.y = header.height
	
	screen.width = header.width
	preview.width = header.width
	content.x = Align.center
	preview.x = Align.center
	
	

	# fix for titles	
	enoughSpace = 100
	if viewSize == 2 or viewSize == 1
		buttons.x = content.x
		if buttons.x - logo_big.x < enoughSpace
			buttons.x = logo_big.x + enoughSpace
	
	if Canvas.width > 1500
		logo_big.x = buttons.x - enoughSpace * 2 - enoughSpace / 2
		profile.x = content.x + content.width - profile.width

for item in [header, profile, buttons, content]
	item.parent = screen

updateLayout()

Canvas.on "change:width", ->
	updateLayout()


	