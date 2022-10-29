Framer.Extras.Hints.disable()
# Utils.insertCSS('@import url(css/project.css)')

# Canvas.backgroundColor = "222"
borderValue = 42

Framer.Extras.Preloader.addImage("images/zenViewWithHeader.png")


{ Preview } = require "PreviewComponent"

screen = new Layer { width: 390, height: 844, backgroundColor: "ddd" }
new Preview { view: screen }


button = new Layer
	parent: screen
	size: 120
	x: Align.center
	y: Align.center
	borderRadius: "100%"

button.on Events.TouchEnd, ->
	articleView.animate("shown", curve: Spring(damping: 1), time: 0.5)


articleView = new Layer
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "white"
	image: "images/zenViewWithHeader.png"
	borderRadius: borderValue
	clip: true
	animationOptions: 
		curve: Spring(damping: 1)
		time: 0.3

articleView.states =
	"shown": { x: 0, y: 0, scale: 1 }
	"hidden": { x: 0, y: 844 + 20 }
	"hidden-top": { x: 0, y: -(844 + 20) }
	"hidden-right": { x: 390 + 20, y: 0, scale: 0.8 }
articleView.stateSwitch("shown")

articleView.on Events.StateSwitchEnd, (from, to) ->
	if to is "hidden"
		articleView_scroll.scrollToClosestLayer(0, 0)
	else if to is "hidden-top"
		@stateSwitch("hidden")
	else if to is "hidden-right"
		@stateSwitch("hidden")


articleView.draggable.vertical = true
articleView.draggable.horizontal = true

articleView.draggable.speedX = 0.5
articleView.draggable.speedY = 0.5

# articleView.content.draggable.momentum = false
# articleView.content.draggable.overdragScale = 1


articleView_scroll = new ScrollComponent
	parent: articleView
	y: 100
	width: articleView.width
	height: articleView.height - 100
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true
	contentInset: 
		bottom: 80



articleView_scroll.content.on Events.TouchStart, (event, layer) ->
	articleView.draggable.vertical = false

articleView_scroll.content.on Events.TouchEnd, (event, layer) ->
	articleView.draggable.vertical = true

articleView_scroll.content.on Events.DragStart, (event, layer) ->
	
	if articleView_scroll.scrollY <= 0 and layer.draggable.direction == "down"
		articleView.draggable.vertical = true
		articleView.draggable.horizontal = true
		@draggable.vertical = false
		return
	
	else if articleView_scroll.scrollY >= articleView_content.height - screen.height + articleView_scroll.y + articleView_scroll.contentInset.bottom and layer.draggable.direction == "up"
		articleView.draggable.vertical = true
		articleView.draggable.horizontal = true
		@draggable.vertical = false
		return
	
	articleView.draggable.horizontal = false


articleView_scroll.content.on Events.DragEnd, (event, layer) ->
	articleView.draggable.horizontal = true
	@draggable.vertical = true



articleView.on Events.DragStart, (event, layer) ->
	if @draggable.direction == "right" or @draggable.direction == "left"
		@draggable.vertical = true

articleView.on Events.DragEnd, (event, layer) ->
	@animate("shown")
	if @y > 60 then @animate("hidden")
	else if @y < -60 then @animate("hidden-top")
	else if @x > 80 then @animate("hidden-right")
	
	consoleLayer.text = @y

articleView.on "change:point", ->
	if @draggable.isDragging
		v = Math.hypot(articleView.x, articleView.y)
		@scale = Utils.modulate(v, [0, 200], [1, 0.9], false)


# Article Content

articleView_content = new Layer
	width: 390
	height: 2192
	backgroundColor: "white"
	borderRadius: borderValue
	parent: articleView_scroll.content
	clip: true

articleView_backButton = new Layer
	propagateEvents: true
	parent: articleView
	width: 48
	height: 56
	y: Align.top(44)
	x: Align.left(0)
	backgroundColor: "null"

articleView_backButton.onTap ->
	articleView.animate("hidden")



createText = (textValue = "text") ->
	return new TextLayer
		parent: articleView_content
		width: screen.width
		fontSize: 18
		lineHeight: 28/18
		color: "black"
		fontFamily: "YS Web Regular"
		opacity: .8
		text: textValue
		padding: 
			left: 20
			right: 20
			top: 16
			bottom: 16

createTitle = (textValue = "text") ->
	return new TextLayer
		parent: articleView_content
		width: screen.width
		fontSize: 20
		lineHeight: 24/20
		color: "black"
		fontWeight: "bold"
# 		fontFamily: "YS Web Medium"
		text: textValue
		padding: 
			left: 20
			right: 20
			top: 8
			bottom: 8








content_head = new TextLayer
	parent: articleView_content
	width: screen.width
	fontSize: 30
	fontWeight: "bold"
	color: "black"
	text: "Прототип закрытия статьи Дзена"
	padding: 
		left: 20
		right: 20
		top: 16

createText("Как можно закрыть статью:\n1. свайп от левого края экрана\n2. свайп наверху статьи\n3. свайп за шапку статьи\n4. свайп в самом конце статьи")

image = new Layer
	parent: articleView_content
	width: 390
	height: 280
	image: "images/image.jpg"

createText("К «известным» авторам издательства относят любых инфлюэнсеров со 100+ тысячами фолловеров.")

createTitle("Вариант 1. Выпустить книгу в двух томах")
createText("Например, первый том более попсовый, второй — более глубокий. Или первый том какие-то общие положения на все случаи жизни, второй том — прикладные аспекты.")

createTitle("Вариант 2. Выпустить книгу в формате «Учебник + воркбук»")
createText("В учебнике теория, в воркбуке упражнения. Как правило, для этого варианта требуется существенная переработка первоначальной структуры и текста книги. \n\n Крупные издательства предлагают авторам два способа издания первой книги.")

comments = new Layer
	parent: articleView_content
	width: 390
	height: 667
	image: "images/comments.jpg"



sumY = 0
for childLayer, i in articleView_content.children
	childLayer.y = sumY
	sumY += childLayer.height

articleView_content.height = 2192 - 290
articleView_scroll.updateContent()


Utils.delay 4, ->
	sumY = 0
	for childLayer, i in articleView_content.children
		childLayer.y = sumY
		sumY += childLayer.height



# Console Layer

consoleLayer = new TextLayer
	parent: screen
	width: 390
	height: 40
	backgroundColor: "white"
	y: Align.bottom()
	fontSize: 14
	textAlign: "center"
	padding:
		top: 10
	opacity: 0

# print articleView_content.height - screen.height + articleView_scroll.y

