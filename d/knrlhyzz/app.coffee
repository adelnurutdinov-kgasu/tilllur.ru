# Use desktop cursor
document.body.style.cursor = "auto"


Canvas.backgroundColor = "FFF"


headerView = new Layer
	backgroundColor: "null"
	height: 80
	y: 12

contentView = new Layer
	width: 818
	height: 405
	image: "images/contentView4.png"

logo = new Layer
	width: 40
	height: 40
	image: "images/logo.png"

avatar = new Layer
	width: 97
	height: 40
	image: "images/avatar.png"

minView = new Layer
	width: 191
	height: 18
	image: "images/min.png"



logo.parent = headerView
avatar.parent = headerView

updateView = () ->
	
	headerView.width = Canvas.width
	
	contentView.x = Align.center
	contentView.y = Align.center
	
	avatar.x = Align.right(-34)
	avatar.y = Align.center
	
	logo.x = Align.left(34)
	logo.y = Align.center
	
	minView.x = Align.center
	minView.y = Align.bottom(-30)


Canvas.on "change:size", ->
	updateView()

updateView()

queryArray = location.search[1..].split('&')
for item in queryArray
	keyValuePair = item.split("=")
	keyPart = keyValuePair[0]
	valuePart = keyValuePair[1]
	
	if keyPart == "type"
		
		if valuePart == "1"
			contentView.image = "images/contentView.png"
		else if valuePart == "2"
			contentView.image = "images/contentView2.png"
		else if valuePart == "3"
			contentView.image = "images/contentView3.png"
		else if valuePart == "4"
			contentView.image = "images/contentView4.png"
		else if valuePart == "5"
			contentView.image = "images/contentView5.png"


logo.originX = 0
logo.originY = 0
logo.scale = 1.2

avatar.originX = 1
avatar.originY = 0
avatar.scale = 1.2