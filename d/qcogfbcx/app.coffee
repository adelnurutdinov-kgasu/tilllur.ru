# Use desktop cursor
document.body.style.cursor = "auto"

flexHeight = 200
Screen.backgroundColor = "222"

initIconGap = { left: 16, size: 16 }
initTextGap = { vertical: 8, left: 12, right: 12 }
initLineGap = { max: 0 }
initIsTick = false

# Data

texts = [
	"Великобритания ввела санкции против 25 россиян по «делу Магнитского»",
	"Адвокат Ефремова заявил о достаточных доказательствах его невиновности",
	"Ущерб от разлива топлива в Норильске оценен в 148 млрд рублей",
	"Минкомсвязь создала систему отслеживания контактов больных COVID-19",
	"Новый Assasin’s Creed Valhalla попал на Youtube"
]

screen = new Layer
	width: (360 + 80) * 3
	x: Align.center()
	y: 60
	backgroundColor: "null"

# screen.center()
if Screen.width < 500 then screen.x = -400

cardView = new Layer
	parent: screen
	size: 360
	backgroundColor: "white"
	borderRadius: 24
	clip: true

cardUpdated = new Layer
	parent: screen
	x: 360 + 80
	size: 360
	backgroundColor: "white"
	borderRadius: 24
	clip: true

# Create Prod

createContent = () ->
	contentView = new Layer
		width: 360 - 8
		height: flexHeight
		borderRadius: 20
		backgroundColor: "#F0F1F5"
	
	outerGap = 6
	sumY = outerGap
	
	iconGap =
		left: 16
		size: 16
		
	textGap =
		vertical: 8
		left: 12
		right: 12
	
	for item, i in texts
		
		itemView = new Layer
			parent: contentView
			width: 360 - 8
			height: flexHeight
			backgroundColor: "null"
	# 		opacity: 0.5
# 			x: 4
		
		iconView = new Layer
			parent: itemView
			width: iconGap.size
			height: iconGap.size
			x: iconGap.left
			image: "images/lenta.jpg"
	# 		backgroundColor: "blue"
	# 		opacity: 0.5
		
		textView = new TextLayer
			parent: itemView
			x: iconGap.left + iconGap.size + textGap.left
			width: itemView.width - iconGap.left - iconGap.size - textGap.left - textGap.right
			fontSize: 16
			lineHeight: 20/16
			color: "black"
			text: item
	# 		backgroundColor: "red"
	# 		opacity: 0.5
		
		
		itemView.height = textView.height + textGap.vertical * 2
		itemView.y = sumY
		sumY += itemView.height
		
		textView.y = Align.center
		iconView.y = textGap.vertical + 2
	
	contentView.height = sumY + outerGap
	
	return contentView

# Create Updated


createUpdatedContent = (iconGap = initIconGap, textGap = initTextGap, lineGap = initLineGap, isTick = initIsTick) ->
	contentView = new Layer
		width: 360 - 8
		height: flexHeight
		borderRadius: 20
		backgroundColor: "#F0F1F5"
		title: "content"
	
	outerGap = 6
	sumY = outerGap
	
	
	
	for item, i in texts
		
		itemView = new Layer
			parent: contentView
			width: 360 - 8
			height: flexHeight
			backgroundColor: "null"
		
		iconView = new Layer
			parent: itemView
			width: iconGap.size
			height: iconGap.size
			x: iconGap.left
			image: "images/lenta.jpg"
		
		textView = new TextLayer
			parent: itemView
			x: iconGap.left + iconGap.size + textGap.left
			width: itemView.width - iconGap.left - iconGap.size - textGap.left - textGap.right
			fontSize: 16
			lineHeight: 20/16
			color: "black"
			text: item
		
		tickView = new Layer
			size: 36
			parent: itemView
			x: Align.right(-16)
			image: "images/tick.png"
			opacity: if isTick then 1 else 0
		
		
		
		if lineGap.max > 0
			textView.truncate = "ellipsis"
			textView.height = textView.fontSize * textView.lineHeight * lineGap.max
		
		itemView.height = textView.height + textGap.vertical * 2
		itemView.y = sumY
		sumY += itemView.height
		
		tickView.y = Align.center(-3)
		
		textView.y = Align.center
		iconView.y = textGap.vertical + 2
	
	contentView.height = sumY + outerGap
	
	return contentView




leftView = new Layer
	parent: screen
	x: (360 + 80) * 2
	width: 360
	backgroundColor: "222"
	opacity: 0.9



# Sliders


title1 = new TextLayer
	text: "Стрелки"
	parent: leftView
	fontSize: 14
	y: 10
	x: 64

button = new Layer
	size: 40
	borderRadius: 20
	parent: leftView
	x: 10


title2 = new TextLayer
	text: "Иконка"
	parent: leftView
	fontSize: 14
	y: 84
	x: 16

title3 = new TextLayer
	text: "Строки (inf - 1 - 2)"
	parent: leftView
	fontSize: 14
	y: 84 + 80
	x: 16

title4 = new TextLayer
	text: "Вертикальные отступы"
	parent: leftView
	fontSize: 14
	y: 84 + 80 + 80
	x: 16

title5 = new TextLayer
	text: "Ширина текстового контейнера"
	parent: leftView
	fontSize: 14
	y: 84 + 80 + 80 + 80
	x: 16













button.states =
	"shown":
		opacity: 0.6
	"hidden":
		opacity: 1.0

button.stateSwitch("hidden")
button.onTap ->
	if @states.current.name == "hidden"
		nextState = "shown"
		initIsTick = true
	else
		nextState = "hidden"
		initIsTick = false
	
	updateView()
	button.stateSwitch(nextState)


sliderY = 120

iconSizeSlider = new SliderComponent
	parent: leftView
	width: 300
	x: 30
	y: sliderY + 80 * 0

iconSizeSlider.knob.draggable.momentum = false

iconSizeSlider.on "change:value", ->
	initIconGap.size =
		Math.round Utils.modulate(iconSizeSlider.value, [0, 1], [16, 48], true)
	updateView()




maxLineSlider = new SliderComponent
	parent: leftView
	width: 300
	x: 30
	y: sliderY + 80 * 1

maxLineSlider.knob.draggable.momentum = false

maxLineSlider.on "change:value", ->
	initLineGap.max =
		Math.round Utils.modulate(maxLineSlider.value, [0, 1], [0, 2], true)
	updateView()


textGapSlider = new SliderComponent
	parent: leftView
	width: 300
	x: 30
	y: sliderY + 80 * 2

textGapSlider.knob.draggable.momentum = false

textGapSlider.on "change:value", ->
	initTextGap.vertical =
		Math.round Utils.modulate(textGapSlider.value, [0, 1], [8, 20], true)
	updateView()


textRightSlider = new SliderComponent
	parent: leftView
	width: 300
	x: 30
	y: sliderY + 80 * 3

textRightSlider.knob.draggable.momentum = false

textRightSlider.on "change:value", ->
	initTextGap.right =
		Math.round Utils.modulate(textRightSlider.value, [0, 1], [12, 100], true)
	updateView()



# Dirty
header.parent = cardView

content1 = createContent()
content1.parent = cardView
content1.x = 4
content1.y = header.height

footer.parent = cardView
footer.y = header.height + content1.height
cardView.height = header.height + content1.height + footer.height



headerUpdated = header.copy()
headerUpdated.parent = cardUpdated

updateView = () ->
	try content2.destroy()
	content2 = createUpdatedContent()
	content2.parent = cardUpdated
	content2.x = 4
	content2.y = headerUpdated.height
	
	footerUpdated = footer.copy()
	footerUpdated.parent = cardUpdated
	footerUpdated.y = headerUpdated.height + content2.height
	cardUpdated.height = headerUpdated.height + content2.height + footerUpdated.height

updateView()


screen.x = Align.center
screen.y = 300
