
screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

temp = new Layer
	parent: screen, width: 375 * 2, height: 667 * 2
	scale: 0.5, originX: 0, originY: 0


bg = new Layer
	width: 750
	height: 1349
	backgroundColor: "rgba(255,255,255,1)"

inside_content = new Layer width: 750, height: 4298, x: 0, y: 0, image: "images/inside content.png"

disk = new Layer width: 640, height: 644, x: 100, y: 274, image: "images/disk.png"

bg_content = new Layer width: 1060, height: 1650, x: -40, y: 0, image: "images/bg content.png"

darker = new Layer width: 750, height: 1334, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.5)", opacity: 0, ignoreEvents: true

scroll = ScrollComponent.wrap(inside_content)
scroll.scrollHorizontal = false
scroll.scrollVertical = false

sticky = new Layer width: 750, height: 332, x: 0, y: temp.height, image: "images/sticky.png", opacity: 1, shadowY: 1, shadowColor: "rgba(0,0,0,0.1)"


# springLight = "spring(100, 20, 10)"
# springHard = "spring(300, 20, 10)"

appear = true
screen.on Events.Tap, ->
	
	if appear
		disk.animate
			x: 160
			options:
				time: 0.3
				curve: Spring(damping: 1), time: 0.5
		
		darker.animate
			opacity: 1
			options: 
				time: 0.5
		
		sticky.animate
			y: temp.height - 332
			options:
				time: 0.3
				curve: Spring(damping: 1), time: 0.5
	else
		disk.animate
			x: 100
			options:
				time: 0.3
				curve: Spring(damping: 1), time: 0.5
		
		darker.animate
			opacity: 0
			options: 
				time: 0.5
		
		sticky.animate
			y: temp.height
			options:
				time: 0.3
				curve: Spring(damping: 1), time: 0.5
	
	appear = !appear
		




for item in [bg, disk, bg_content, darker, scroll, sticky]
	item.parent = temp


statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(245,248,251,1)"