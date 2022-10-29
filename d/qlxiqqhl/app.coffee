Canvas.backgroundColor = "222"
Framer.Extras.Hints.disable()

Framer.Defaults.animationOptions =
	curve: Spring(damping: 1)
	time: 0.5

# SVG

svgCamera = """
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.08843 19.86C7.36807 19.8935 7.67007 19.9189 7.99988 19.9383V21.9412C6.08314 21.8379 4.8455 21.5532 3.9047 20.7679C3.66072 20.5642 3.43555 20.339 3.23189 20.0951C2.44656 19.1543 2.16183 17.9166 2.05859 15.9999H4.06147C4.08084 16.3297 4.10629 16.6317 4.13973 16.9113C4.27083 18.0075 4.49976 18.493 4.76727 18.8134C4.89412 18.9654 5.03437 19.1056 5.18634 19.2325C5.50681 19.5 5.99226 19.7289 7.08843 19.86ZM15.9999 21.9412V19.9383C16.3297 19.9189 16.6317 19.8935 16.9113 19.86C18.0075 19.7289 18.493 19.5 18.8134 19.2325C18.9654 19.1056 19.1056 18.9654 19.2325 18.8134C19.5 18.493 19.7289 18.0075 19.86 16.9113C19.8935 16.6317 19.9189 16.3297 19.9383 15.9999H21.9412C21.8379 17.9166 21.5532 19.1543 20.7679 20.0951C20.5642 20.339 20.339 20.5642 20.0951 20.7679C19.1543 21.5532 17.9166 21.8379 15.9999 21.9412ZM21.9412 7.99989H19.9383C19.9189 7.67008 19.8935 7.36807 19.86 7.08843C19.7289 5.99226 19.5 5.5068 19.2325 5.18634C19.1056 5.03437 18.9654 4.89412 18.8134 4.76727C18.493 4.49976 18.0075 4.27082 16.9113 4.13973C16.6317 4.10629 16.3297 4.08084 15.9999 4.06147V2.05859C17.9166 2.16183 19.1543 2.44656 20.0951 3.23189C20.339 3.43554 20.5642 3.66072 20.7679 3.90469C21.5532 4.8455 21.8379 6.08314 21.9412 7.99989ZM4.13973 7.08843C4.10629 7.36807 4.08084 7.67008 4.06147 7.99989H2.05859C2.16182 6.08314 2.44655 4.8455 3.23189 3.90469C3.43555 3.66072 3.66072 3.43554 3.9047 3.23189C4.8455 2.44656 6.08314 2.16183 7.99988 2.05859V4.06147C7.67007 4.08084 7.36807 4.10629 7.08843 4.13973C5.99226 4.27082 5.50681 4.49976 5.18634 4.76727C5.03437 4.89412 4.89412 5.03437 4.76727 5.18634C4.49976 5.5068 4.27083 5.99226 4.13973 7.08843ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" fill="black"/>
</svg>
"""



{ Preview } = require "PreviewComponent"

screen = new Layer { width: 375, height: 812 }
new Preview { view: screen }


# Site

scrollProxyLayer = new Layer
	opacity: 0

scrollProxyLayer.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 0 }
scrollProxyLayer.stateSwitch("shown")

scrollProxyLayer.on Events.StateSwitchEnd, (from, to) ->
	if from != to
		alice_Shadow_Proxy.animate(to, curve: Spring(damping: 1), time: 0.2)
		aliceView_Slider.animate(to, curve: Spring(damping: 1), time: 0.2)



site = new ScrollComponent
	parent: screen
	width: screen.width
	height: screen.height
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "white"
	contentInset: 
		bottom: 40
		top: 44

framerwiki.parent = site.content
framerwiki.x = framerwiki.y = 0
framerwiki.name = "."


site.content.on "change:y", ->
	v = site.scrollY
# 	print "#{framerwiki.height - screen.height} #{v}"
	
	if v < 40
		scrollProxyLayer.stateSwitch("shown")
	else if v > framerwiki.height - screen.height - 40
		scrollProxyLayer.stateSwitch("shown")
	else if site.content.draggable.direction == "up"
		scrollProxyLayer.stateSwitch("hidden")
	else
		scrollProxyLayer.stateSwitch("shown")



alice_Shadow_Proxy = new Layer
	width: alice_Shadow.width
	height: alice_Shadow.height
	parent: screen
	y: Align.bottom(-80)
	backgroundColor: "null"

alice_Shadow.parent = alice_Shadow_Proxy
alice_Shadow.x = alice_Shadow.y = 0

for item in [alice_Shadow, alice_Shadow_Proxy]
	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	if item is alice_Shadow then item.stateSwitch("hidden")
	else item.stateSwitch("shown")

# Alice View

aliceView_Slider = new PageComponent
	parent: screen
	width: screen.width
	height: 80
	y: Align.bottom(-83)
	scrollVertical: false
	scrollHorizontal: true
	

aliceView_Slider.states =
	"hidden": { opacity: 0 }
	"shown": { opacity: 1 }
aliceView_Slider.stateSwitch("shown")


aliceView_Null = new Layer
	width: screen.width - 40 - 16 - 16
	height: 80
	backgroundColor: "."
	

aliceView_Scroll = new ScrollComponent
	width: screen.width
	height: 80
	scrollVertical: false
	scrollHorizontal: false
	contentInset: 
		right: 16

aliceView_Slider.addPage(aliceView_Null)
aliceView_Slider.addPage(aliceView_Scroll)


# aliceView_Slider.snapToNextPage("right")

aliceView_Scroll.content.on Events.DragStart, (event, layer) ->
	if aliceView_Scroll.scrollX <= 0 and layer.draggable.direction == "right"
		useOutsideScroll()


useInsideScroll = () ->
	aliceView_Slider.scrollHorizontal = false
	aliceView_Slider.content.animateStop()
	aliceView_Slider.animateStop()
	aliceView_Scroll.content.animateStop()
	aliceView_Scroll.animateStop()
	aliceView_Scroll.scrollHorizontal = true
	
useOutsideScroll = () ->
	aliceView_Scroll.scrollHorizontal = false
	aliceView_Scroll.content.animateStop()
	aliceView_Slider.scrollHorizontal = true
	aliceView_Scroll.scrollToPoint(
		x: 0, y: 0
		true
		time: 0.1
	)

aliceView_Slider.content.on Events.AnimationEnd, (event, layer) ->
	if aliceView_Slider.currentPage == aliceView_Scroll
		useInsideScroll()


aliceView_Slider.on "change:currentPage", ->
	if aliceView_Slider.currentPage == aliceView_Scroll
		alice_Shadow.animate("shown")
	else
		alice_Shadow.animate("hidden")



# Alice Bar Content


aliceIcon = new Layer
	parent: aliceView_Scroll.content
	width: 40
	height: 40
	x: 16
	y: 20
	image: "images/alice.png"
	borderRadius: "100%"
	shadowY: 8
	shadowBlur: 20
	shadowColor: "rgba(99,6, 217, 0.25)"
	


cameraIcon = new Layer
	parent: aliceView_Scroll.content
	size: 36
	x: aliceIcon.x + aliceIcon.width + 8
	backgroundColor: "white"
	borderRadius: "100%"
	y: 22
	shadowY: 8
	shadowBlur: 20
	shadowColor: "rgba(0,0,0, 0.2)"


cameraShape = new SVGLayer
	parent: cameraIcon
	size: 24
	svg: svgCamera
	x: Align.center
	y: Align.center



createButton = (title = "Прочитать сайт") ->
	textButton = new TextLayer
		text: title
		fontWeight: 500
		fontSize: 13
		color: "black"
		padding: 10
		
	
	buttonView = new Layer
		name: "."
		width: textButton.width
		height: textButton.height
		backgroundColor: "white"
		borderRadius: 100
		shadowY: 8
		shadowBlur: 20
		shadowColor: "rgba(0,0,0, 0.2)"
	
	textButton.parent = buttonView
	
	return buttonView


buttonTextArray = [
	"Прочитать",
	"Перевести",
	"Найти объекты",
	"Открыть шагомер",
	"Открой отзывы",
	"Открой последний закрытый сайт",
	"Какая погода завтра",
]

currentW = 0
for currentTitle, i in buttonTextArray
	button = createButton(currentTitle)
	button.parent = aliceView_Scroll.content
	button.x = cameraIcon.x + cameraIcon.width + 10 + currentW
	button.y = 22
	
	currentW += button.width + 10

aliceView_Scroll.updateContent()
aliceView_Scroll.content.clip = false




actionBar = new Layer
	parent: screen
	width: 375
	height: 83
	y: Align.bottom
	image: "images/Action%20Bar.png"


