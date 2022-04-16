screen = new Layer
	width: 320, height: 568, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

retina = 1

content_block = new Layer width: 320*retina, height: 1652*retina, x: 0*retina, y: 20*retina, image: "images/content block.png"

scroll = ScrollComponent.wrap(content_block)
scroll.width = 480*retina
scroll.height = 640*retina
scroll.scrollHorizontal = false
scroll.scrollVertical = true


app_bar = new Layer width: 320*retina, height: 40*retina, y: 20*retina, image: "images/app bar.png", opacity: 0




animationT = 0.2

Framer.Defaults.Animation =
	curve: "spring(400,35,10)"
	time: animationT





scroll.on Events.Move, ->

	if scroll.scrollY > (124+10)*retina
		app_bar.animate
			properties: opacity: 1
			time: 0
				
	else
		app_bar.opacity = 0
		

for item in [scroll, app_bar]
	item.parent = screen











