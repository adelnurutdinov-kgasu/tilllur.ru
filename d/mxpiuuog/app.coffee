
tupleW = 8
tupleH = 14


Canvas.backgroundColor = "222"

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

{ Preview } = require "PreviewComponent"

screen = new ScrollComponent
	width: 390
	height: 844
	scrollVertical: true
	scrollHorizontal: false
	backgroundColor: "F4F2F0"

new Preview { view: screen }


# Layers

Content = new Layer
	parent: screen.content
	width: 390
	height: 1888
	image: "images/Content.png"


ProfileView = new Layer
	size: 32
	parent: Content
	x: Align.left(25)
	y: Align.top(24 + 44)
	backgroundColor: "null"


Plus = new Layer
	parent: ProfileView
	width: 36
	height: 36
	x: Align.center
	y: Align.center
	image: "images/Plus.png"

Plus.states =
	"delta": { opacity: 0, scale: 0.5 }
	"normal": { opacity: 1, scale: 1 }
Plus.stateSwitch("normal")



Avatar = new Layer
	parent: ProfileView
	width: 28
	height: 28
	x: Align.center
	y: Align.center
	image: "images/Avatar.png"

Avatar.states =
	"delta": { scale: 32/28 }
	"normal": { scale: 1 }
Avatar.stateSwitch("normal")


badgeView = new Layer
	parent: ProfileView
	width: 58
	height: 32
	x: Align.left(12)
	y: Align.top(-14)
	originX: 0
	originY: 1
	image: "images/badgeViewNull.png"

badgeView.states =
	"normal": { opacity: 0, scale: 0.5 }
	"delta": { opacity: 1, scale: 1 }
badgeView.stateSwitch("normal")




badgeView_Text = new Layer
	parent: badgeView
	width: 58
	height: 32
	image: "images/badgeView_Text.png"
	opacity: 0

betweenView = new Layer
	parent: badgeView
	width: 120
	height: 16
	x: 24
	y: 7.5
	backgroundColor: "null"
	clip: true

# Generate Lines

getLength = (number = 1024) ->
	return number.toString().length


getDigits = (numberV, groupSize = 1) ->
	digitArray = []
	for i in [groupSize - 1... -1]
		d = Math.pow(10, i)
		digitArray.push (numberV - numberV % d) / d % 10
	return digitArray


getValues = (startV = 842, finishV = 1234) ->
	groupSize = getLength(finishV)
	
	line1 = getDigits(startV, groupSize)
	line2 = getDigits(finishV, groupSize)
	
	allLines = []
	for i in [0...groupSize]
		fullLine = []
		fullLine.push hackNumber % 10 for hackNumber in [line1[i]..line2[i] + i * 10]
		allLines.push fullLine
	
	return allLines


# print getValues()

# Tuples

createTuple = (v, isLead = false) ->
	
	tupleView = new Layer
		parent: betweenView
		backgroundColor: "null"
		width: tupleW
	
	tupleView.states =
		"hidden": { y: 0 }
		"shown": { y: -tupleH * v.length + tupleH }
	tupleView.stateSwitch("hidden")
	
	for numberV, i in v
		tupleView_value = new TextLayer
			parent: tupleView
			text: "#{numberV}"
			fontSize: 13
			y: tupleH * i
			fontWeight: "bold"
			color: "white"
			textAlign: "center"
		
		if numberV == 0 and isLead then tupleView_value.opacity = 0.5
	
	return tupleView


createBetween = (sV = 123, fV = 2341) ->
	for currentTuple, i in getValues(sV, fV)
		tupleLayer = createTuple(currentTuple)
		tupleLayer.x = tupleW * i
	
animateBetween = () ->
	for item, i in betweenView.children
		item.animate("shown", time: 1, curve: Spring(damping: .9))

resetBetween = () ->
	for item, i in betweenView.children
		item.stateSwitch("hidden")

# createBetween(246, 329)
createBetween(329, 329)




tempFlag = false

screen.onTap ->
	tempFlag = !tempFlag
	
	for item in [Plus, Avatar, badgeView]
		item.stateCycle("delta","normal")
	
# 	if tempFlag
# 		Utils.delay 0.3, ->
# 			animateBetween()
# 	else 
# 		Utils.delay 0.3, ->
# 			resetBetween()



# for item in [Plus, Avatar, badgeView]
# 		item.stateSwitch("delta")