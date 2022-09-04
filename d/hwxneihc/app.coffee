retina = 1

backgroundsArray = []
totalPages = 2
isAutoSliding = true

sliderDelay = 1.2
sliderTime = 0.6

screen = new Layer
	width: 360*retina
	height: 640*retina
	backgroundColor: "rgba(50,50,50,1)"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

slider = new PageComponent
	width: 360*retina
	height: 403*retina
	x: 0*retina
	y: 237*retina
	backgroundColor: "transparent"
	scrollVertical: false
	contentInset: 
		right: 66*retina


for i in [0..totalPages]
# 	if i == 0
# # 		print "inside"
# 		blackPage = new Layer
# 			width: 66*retina
# 			height: 406*retina
# 			backgroundColor: "transparent"
# 			parent: slider.content
		
	item = new Layer
		width: 228*retina
		height: 406*retina
		x: 228*retina * i + 66*retina
		y: 0
		parent: slider.content
		image: "images/background #{i%3+1}.png"
	
	backgroundsArray.push(item)


teaseScrolling = () ->
	if isAutoSliding
		tryScrolling()
	Utils.delay 2, ->
		teaseScrolling()

tryScrolling = () ->
	if isAutoSliding
		slider.scrollToPoint(
			x: 32*retina, y: 0
			true
			curve: "spring(400, 20, 0)"
		)
		Utils.delay 0.4, ->
			if isAutoSliding
				slider.scrollToPoint(
					x: 0*retina, y: 0
					true
					curve: "ease-in"
					time: 0.8
				)

teaseScrolling()

# screen.on Events.Click, ->
# 	tryScrolling()

# 	if i == totalPages - 1
# 		blackPage = new Layer
# 			width: 66*retina
# 			height: 406*retina
# 			x: 228*retina * i + 66*retina
# 			backgroundColor: "transparent"
# 			parent: slider.content

# slider.content.on Events.AnimationStop, ->
# 	currentPage = slider.currentPage.index - 1
# 	
# 	if currentPage == totalPages + 2
# 		slider.snapToPage(backgroundsArray[2], false)
# 	if currentPage == totalPages + 3
# 		slider.snapToPage(backgroundsArray[3], false)
# 	if currentPage == 0
# 		slider.snapToPage(backgroundsArray[totalPages], false)
# 	if currentPage == 1
# 		slider.snapToPage(backgroundsArray[totalPages + 1], false)
# 		
# slider.snapToPage(backgroundsArray[2], false)


slider.on Events.TouchStart, ->
	slider.animateStop()
	slider.content.animateStop()
	isAutoSliding = false
# 
# nextSlide = () ->
# 	if isAutoSliding
# 		slider.snapToNextPage("right", true, { time: sliderTime })
# 		Utils.delay (sliderDelay + sliderTime), ->
# 			nextSlide()

# nextSlide()

phone = new Layer
	width: 258*retina
	height: 343*retina
	x: 51*retina
	y: 201*retina
	image: "images/phone.png"


search_view = new Layer
	width: 200*retina
	height: 68*retina
	x: 80*retina
	y: 350*retina
	image: "images/search view.png"

navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

status_bar = new Layer
	width: 360*retina
	height: 32*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "#333"

popup_1 = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 544*retina
	image: "images/popup 1.png"

title_step_1 = new Layer
	width: 360*retina
	height: 170*retina
	x: 0*retina
	y: 24*retina
	image: "images/title step 1.png"

fix_1 = new Layer
	width: 60*retina
	height: 307*retina
	x: 300*retina
	y: 237*retina
	backgroundColor: "rgba(51,51,51,1)"
	opacity: 0.2

fix_2 = new Layer
	width: 60*retina
	height: 307*retina
	x: 0*retina
	y: 237*retina
	backgroundColor: "rgba(51,51,51,1)"
	opacity: 0.2

for item in [slider, phone, search_view, navbar, status_bar, popup_1, title_step_1, fix_1, fix_2]
	item.parent = screen
