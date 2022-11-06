# Screen

screen = new Layer
	width: 360
	height: 720
	borderRadius: 16
	clip: true
	backgroundColor: "white"

sites = new PageComponent
	parent: screen
	width: 360
	height: 720
	scrollVertical: false
	originX: 0
	speedX: 2

for item, i in ["m", "m", "m", "m"]
	site = new Layer
		width: 202 + 8*2
		height: 720
		x: (202+8*2) * i
		parent: sites.content
		backgroundColor: "transparent"
	
	sitePreview = new Layer
		width: 202
		height: 307
		y: 95
		x: 8
		parent: site
		backgroundColor: "white"
		borderRadius: 16
		borderColor: "rgba(0,0,0,0.2)"
		borderWidth: 1

sites.updateContent()
sites.contentInset =
		left: 79 - 8
		right: 79 - 8


for item, i in [reviewNew, commentNew, promoteChat]
	item.parent = sites.content.children[i]
	item.y = 410
	item.x = -71
	
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	if i == 0 then item.stateSwitch("shown") else item.stateSwitch("hidden")


bottomBar.parent = screen
bottomBar.y = Align.bottom()
bottomBar.x = Align.center()


sites.content.on "change:x", ->
	value = sites.scrollX
	
	for currentSite, i in sites.content.children
		currentClosestLayer = sites.closestContentLayer(0.5, 0)
		try
			card = currentSite.children[1]
			if currentClosestLayer == currentSite
				card.animate("shown", time: 0.1)
			else
				card.animate("hidden", time: 0.2)


{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }