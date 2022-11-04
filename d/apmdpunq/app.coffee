
# Slides

Screen.backgroundColor = "#eee"
Framer.Extras.Hints.disable()

BORDER_R = 16
PAGE_W = 440
PAGE_H = 760

slides = []


createEmptySlide = () ->
	currentIndex = slidesComponent.content.children.length
	slide = new PageComponent
		name: "slide#{currentIndex}"
		width: PAGE_W
		height: PAGE_H
		backgroundColor: "null"
		x: PAGE_W * currentIndex
		parent: slidesComponent.content
		scrollVertical: true
		scrollHorizontal: false
	
	slide.directionLock = true
	slide.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.2 }
	if currentIndex != 0 then slide.stateSwitch("hidden")
	
	currentDotsView = createDotsView()
	currentDotsView.parent = slide
	
	slides.push(slide)
	
	slide.content.on "change:height", ->
		currentDotsView = getDotsView(@parent)
		if @children.length == 0 or @children.length == 1 then return
		else if @children.length == 2
			addDot(currentDotsView, 0)
			addDot(currentDotsView, 1)
		else
			addDot(currentDotsView, @children.length - 1)
	
	slide.on "change:currentPage", ->
		currentDotsView = @children[1]
		currentIndex = -1
		for item, i in @content.children
			if item == @currentPage then currentIndex = i
		
		for dot, i in currentDotsView.children
			if i == currentIndex then dot.animate("shown", time: 0.3)
			else dot.animate("hidden", time: 0.3)
	
	return slidesComponent.content.children.indexOf(slide)





slidesComponent = new PageComponent
	width: PAGE_W
	height: PAGE_H
	scrollVertical: false
	scrollHorizontal: true
	clip: false
	directionLock: true

slidesComponent.content.backgroundColor = "null"
slidesComponent.center()


slidesComponent.on "change:currentPage", ->
	for currentSlide in slides
		# Change opacity
		if currentSlide is slidesComponent.currentPage
			currentSlide.animate("shown")
		else currentSlide.animate("hidden")


slidesComponent.on "change:currentPage", ->
	for currentScreen in screens
		# Pause Inactive Videos
		if currentScreen.name == "video"
			if currentScreen.parent.parent != slidesComponent.currentPage
				currentScreen.children[0].player.pause()
			else currentScreen.children[0].player.play()



Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode is 37
		slidesComponent.snapToNextPage("left")
	else if event.keyCode is 39
		slidesComponent.snapToNextPage("right")
	
	else if event.keyCode is 40
		slidesComponent.currentPage.snapToNextPage("bottom")
	else if event.keyCode is 38
		slidesComponent.currentPage.snapToNextPage("top")

# Content Views

screens = []


addView = (slideIndex = 0, url) ->
	if slides[slideIndex] == undefined or slides[slideIndex] == null
		slideIndex = createEmptySlide()
	
	createdContent = null
	type = checkType(url)
	
	if type == slideType.image
		createdContent = createScreen(url)
	else if type == slideType.video
		createdContent = createVideo(url)
	else
		createdContent = createWebView(url)
	
	if createdContent != null
		slides[slideIndex].addPage(createdContent, "bottom")






createScreen = (imageURL) ->
	view = new Layer
		width: PAGE_W
		height: PAGE_H
		backgroundColor: "null"
		name: "image"
	
	contentView = new Layer
		width: 360
		height: 640
		parent: view
		x: Align.center
		y: Align.center
		image: imageURL
		backgroundColor: "null"
		borderRadius: BORDER_R
		clip: true
	
	screens.push(view)
	return view



createVideo = (videoURL) ->
	view = new Layer
		width: PAGE_W
		height: PAGE_H
		backgroundColor: "null"
		name: "video"
	
	contentView = new VideoLayer
		width: 360
		height: 640
		parent: view
		x: Align.center
		y: Align.center
		video: videoURL
		borderRadius: BORDER_R
		clip: true
		borderWidth: 2
		borderColor: "#eee"
	
	contentView.player.autoplay = true
	contentView.player.loop = true
	contentView.player.play()
	
	screens.push(view)
	return view


createWebView = (webURL) ->
	
	view = new Layer
		width: PAGE_W
		height: PAGE_H
		backgroundColor: "null"
		name: "web"
	
	contentView = new Layer
		width: 360
		height: 640
		parent: view
		x: Align.center
		y: Align.center
		html: "<iframe style='position: absolute; width: 100%; height: 100%;' src='#{webURL}'></iframe>"
		ignoreEvents: false
		borderRadius: BORDER_R
		clip: true
	
	screens.push(view)
	return view





# Generic

testStrList = ["https://framer.cloud/iGvUo/index.html", "https://framer.cloud/iGvUo/index.html?teer=12", "images/1.png", "images/1.mp4"]


slideType =
	image: "image"
	video: "video"
	web: "web"
	

checkType = (url) ->
	parts = url.split('/')
	lastSegment = parts.pop() || parts.pop()
	
	if lastSegment.includes("png") or lastSegment.includes("jpg") or lastSegment.includes("jpeg")
		return slideType.image
	else if lastSegment.includes("mp4")
		slideType.video
	else
		slideType.web

# Dots


getDotsView = (currentSlide) ->
	for item in currentSlide.children
		if item.name == "dotsView" then return item
	return null


showDots = () ->
	for currentSlide in slides
		if currentSlide.content.children.length < 2 then continue
		
		currentDotsView = currentSlide.children[1]
		
# 		print "???: #{currentDotsView.name}"
# 		currentDotsView.height = 400
		
		for currentSlidesScreen, i in currentSlide.content.children
			addDot(currentDotsView, i)



createDotsView = () ->
	dotsView = new Layer
		width: 8
		height: 1
		x: PAGE_W - 24
		y: Align.center
		backgroundColor: "null"
		name: "dotsView"
	
	return dotsView


addDot = (localView, i) ->
# 	print "inside: #{i}"
# 	print localView
	localView.height += 8 * 2
	localView.y = Align.center
	
	dot = new Layer
		size: 8
		y: i * 16
		borderRadius: "100%"
		backgroundColor: "black"
		parent: localView
	
	dot.states =
		"shown": { opacity: 0.6 }
		"hidden": { opacity: 0.2 }
	if i == 0 then dot.stateSwitch("shown")
	else dot.stateSwitch("hidden")


# Text

textType =
	title: "title"
	comment: "comment"


createTitleView = (titleText) ->
	return new TextLayer
		text: titleText
		width: 360
		x: (PAGE_W - 360) / 2 + 8
		y: 8 + 4
		color: "rgba(0,0,0,0.8)"
		fontSize: 24

createCommentView = (titleText) ->
	return new TextLayer
		text: titleText
		width: 360
		x: (PAGE_W - 360) / 2 + 8
		y: PAGE_H - 40 - 4
		fontSize: 14

addTitle = (slideIndex = 0, title = "Тест") ->
	addText(slideIndex, title, textType.title)

addComment = (slideIndex = 0, title = "Тест") ->
	addText(slideIndex, title, textType.comment)



addText = (slideIndex = 0, title = "Тест", type = textType.title) ->
	if slides[slideIndex] == undefined or slides[slideIndex] == null
		slideIndex = createEmptySlide()
	
	if type == textType.title
		createTitleView(title).parent = slides[slideIndex]
	else if type == textType.comment
		createCommentView(title).parent = slides[slideIndex]





addTitle(0, "Launch after update")
addComment(0, "Fullscreen or not?")
addView(0, "images/video1.mp4")
addView(0, "images/v1.png")
addView(0, "images/v2.png")
addView(0, "images/video2.mp4")

addTitle(1, "After Welcome")
addComment(1, "How long?")
addView(1, "images/video3.mp4")
addView(1, "images/dot.png")

addTitle(2, "Next tip")
addComment(2, "If not used yet")
addView(2, "images/tip2.png")
addView(2, "images/tip3.png")
addView(2, "images/tip1.png")

addTitle(3, "Card in feed")
addView(3, "images/promo.png")
addView(3, "images/alert.png")


# verticalPage1.addPage(createVideo("images/video1.mp4"), "bottom")
# verticalPage1.addPage(createScreen("images/v1.png"), "bottom")
# verticalPage1.addPage(createScreen("images/v2.png"), "bottom")
# verticalPage1.addPage(createVideo("images/video2.mp4"), "bottom")
# 
# 
# verticalPage2.addPage(createVideo("images/video3.mp4"), "bottom")
# verticalPage2.addPage(createScreen("images/dot.png"), "bottom")
# 
# 
# verticalPage3.addPage(createScreen("images/tip2.png"), "bottom")
# verticalPage3.addPage(createScreen("images/tip3.png"), "bottom")
# verticalPage3.addPage(createScreen("images/tip1.png"), "bottom")
# 
# 
# verticalPage4.addPage(createScreen("images/promo.png"), "bottom")
# verticalPage4.addPage(createScreen("images/alert.png"), "bottom")
# 
# 
# 
