retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

top_mask = new Layer width: 375*retina, height: 140*retina, x: 0*retina, y: 64*retina, backgroundColor: "rgba(216,216,216,1)"
top_mask.originY = 0

image = new Layer width: 375*retina, height: 200*retina, superLayer: top_mask, image: "images/image.png"
image.originY = 0

# top_mask.scale = Utils.modulate(content.y, inputLimit, [1, 2], true)

content = new Layer width: 375*retina, height: 2219*retina, x: 0*retina, y: 204*retina, image: "images/content.png"

nav_bar = new Layer width: 379*retina, height: 68*retina, x: -2*retina, y: -1*retina, image: "images/nav bar.png", style: {"-webkit-filter": "drop-shadow(calc(0px*" + retina + ") calc(1px*" + retina + ") calc(2px*" + retina + ") " + "rgba(0,0,0,0.5))"}

content.draggable.enabled = true
content.draggable.horizontal = false

inputLimit = [204*retina, (204 + 300)*retina]

content.on "change:y", ->
	if content.y > 204 * retina
		top_mask.height = content.y - 64 * retina
		image.scale = Utils.modulate(content.y, inputLimit, [1, 2], true)

content.on Events.DragMove, ->
	content.draggable.speedY = Utils.modulate(content.y, inputLimit, [1,0.2], true)

content.on Events.DragEnd, ->
	if content.y > 204 * retina
		content.animate
			properties: 
				y: 204 * retina
			time: 1


for item in [top_mask, content, nav_bar]
	item.parent = screen

statusBar = new Layer
	parent: screen, height: 20, width: screen.width
	backgroundColor: "rgba(86,185,75,1)"