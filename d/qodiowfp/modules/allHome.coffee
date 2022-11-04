# Add the following line to your project in Framer Studio. 
# myModule = require "myModule"
# Reference the contents by name, like myModule.myFunction() or myModule.myVar

# exports.myVar = "myVariable"

exports.myFunction = ->
	print "myFunction is running"

# exports.myArray = [1, 2, 3]


# Use desktop cursor
document.body.style.cursor = "auto"

# bg = new BackgroundLayer
# 	backgroundColor: "eee"

# hslaValues = [0,100,50,1]

exports.createColorHolder = () ->

	hslaValues = [0,100,0,1]

	selectedColorHolder = new Layer
		x: Align.center
		height: 30
		width: 46
		borderRadius: 5
		backgroundColor: "white"
		shadowY: 2
		shadowBlur: 2
		shadowColor: "hsla(0,0,0,0.07)"
		y: Align.center(-126)
	
	selectedColorHolder.states =
		"shown":
			opacity: 1
		"hidden":
			opacity: 1
	selectedColorHolder.stateSwitch("hidden")

	selectedColor = new Layer
		parent: selectedColorHolder
		width: selectedColorHolder.width-10
		height: selectedColorHolder.height-10
		x: Align.center
		y: Align.center
		borderRadius: 3
		backgroundColor: "hsla(#{hslaValues[0]}, #{hslaValues[1]}, #{hslaValues[2]}, #{hslaValues[3]})"
		shadowBlur: 2
		shadowColor: "ddd"

	colorPicker = new Layer
		parent: selectedColorHolder
		y: 50
		width: 230
		height: 180
		borderRadius: 10
		backgroundColor: "white"
		borderRadius: 10
		shadowY: 2
		shadowBlur: 2
		shadowColor: "hsla(0,0,0,0.07)"

	colorPicker.states =
		"hidden":
			opacity: 0
			x: -1000
		"shown":
			opacity: 1
			x: 0

	triangle = new Layer
		parent: colorPicker
		width: 10
		height: 7
		x: Align.center
		y: -6
		backgroundColor: "white"

	triangle.style.webkitClipPath = " polygon(50% 0%, 0 85%, 100% 85%)"

	opacitySlider = new SliderComponent
		parent: colorPicker
		y: 15
		width: 15
		height: 180 - 30
		borderRadius: 4
		backgroundColor: ""
		clip: true
		x: Align.right(-15)

	opacitySlider.fill.backgroundColor = ""
	opacitySlider.knob.draggable.momentum = false

	opacitySlider.knob.props =
		height: opacitySlider.width-2
		width: opacitySlider.width-2
		shadowY: 0
		shadowBlur: 3
		shadowColor: "hsla(0,0,0,0.8)"
		backgroundColor: ""
		borderColor: "white"
		borderWidth: 2
		borderRadius: 10

	# 3 by 37 checker pattern
	for i in [0..2]
		for n in [0..36]
			checker = new Layer
				index: 0
				width: 5
				height: 5
				parent: opacitySlider
				x: i * 5
				y: n * 5
			if n % 2 && i % 2
				checker.backgroundColor = "white"
			if !(n % 2) && !(i % 2)
				checker.backgroundColor = "white"

	opacityGradient = new Layer
		parent: opacitySlider
		index: 0
		height: opacitySlider.height
		width: opacitySlider.width

	opacityGradient.style.background = "-webkit-linear-gradient(top, hsla(#{hslaValues[0]}, #{hslaValues[1]}%, #{hslaValues[2]}%, 1) 0%, hsla(#{hslaValues[0]}, #{hslaValues[1]}%, #{hslaValues[2]}%, 0) 100%)" 

	hueSlider = new SliderComponent
		parent: colorPicker
		y: 15
		width: 15
		height: 180 - 30
		borderRadius: 4
		backgroundColor: ""
		clip: true
		x: Align.right(-40)

	hueSlider.fill.backgroundColor = ""
	hueSlider.knob.draggable.momentum = false

	hueSlider.knob.props =
		height: opacitySlider.width-2
		width: opacitySlider.width-2
		shadowY: 0
		shadowBlur: 3
		shadowColor: "hsla(0,0,0,0.8)"
		backgroundColor: ""
		borderColor: "white"
		borderWidth: 2
		borderRadius: 10

	hueSlider.style.background = "-webkit-linear-gradient(top, hsla(0, 100%, 50%, 1), hsla(300, 100%, 50%, 1), hsla(240, 100%, 50%, 1), hsla(180, 100%, 50%, 1), hsla(120, 100%, 50%, 1), hsla(60, 100%, 50%, 1), hsla(0, 100%, 50%, 1))" 

	# saturation and lightness grid
	saturationGrid = new Layer
		parent: colorPicker
		width: 150
		height: 150
		y: 15
		x: Align.right(-65)
		borderRadius: 4
		borderWidth: 1
		borderColor: "ddd"
		clip: true

	saturationGrid.style.background = "-webkit-linear-gradient(right, hsla(#{hslaValues[0]}, #{hslaValues[1]}%, #{hslaValues[2]}%, 1) 0%, hsla(#{hslaValues[0]}, #{hslaValues[1]}%, #{hslaValues[2]}%, 0) 100%)"

	lightnessGrid = new Layer
		parent: saturationGrid
		width: 150
		height: 150

	lightnessGrid.style.background = "-webkit-linear-gradient(top, hsla(0, 0%, 0%, 0) 0%, hsla(0, 0%, 0%, 1) 100%)"

	saturationLightnessKnob = new Layer
		parent: saturationGrid
		height: opacitySlider.width-2
		width: opacitySlider.width-2
		shadowY: 0
		shadowBlur: 3
		shadowColor: "hsla(0,0,0,0.8)"
		backgroundColor: ""
		borderColor: "white"
		borderWidth: 2
		borderRadius: 10
		x: saturationGrid.width-10
		y: -5

	saturationLightnessKnob.draggable = true
	saturationLightnessKnob.draggable.momentum = false
	saturationLightnessKnob.draggable.overdrag = false
	saturationLightnessKnob.draggable.constraints =
		x: -5
		y: -5
		width: saturationGrid.width+10
		height: saturationGrid.height+10

	# click handling
	opacitySlider.on "change:value", ->
		hslaValues[3] = 1-opacitySlider.value
		updateSelectedColor()

	hueSlider.on "change:value", ->
		hslaValues[0] = 360 - 360 * hueSlider.value
		updateSelectedColor()

	saturationLightnessKnob.on Events.Drag, ->
		# saturation
		hslaValues[1] = (saturationLightnessKnob.point.x + 5)/147 * 100
		# lightness
		hslaValues[2] = (100 - (saturationLightnessKnob.point.y + 5)/147 * 100) - ((saturationLightnessKnob.point.x + 5)/147 * 50)*(1-(saturationLightnessKnob.point.y + 5)/147)
		updateSelectedColor()

	# update selected color function
	updateSelectedColor = () ->
		selectedColor.backgroundColor = "hsla(#{hslaValues[0]}, #{hslaValues[1]}, #{hslaValues[2]}, #{hslaValues[3]})"
		opacityGradient.style.background = "-webkit-linear-gradient(top, hsla(#{hslaValues[0]}, #{hslaValues[1]}%, #{hslaValues[2]}%, 1) 0%, hsla(#{hslaValues[0]}, #{hslaValues[1]}%, #{hslaValues[2]}%, 0) 100%)"
		saturationGrid.style.background = "-webkit-linear-gradient(right, hsla(#{hslaValues[0]}, 100%, 50%, 1) 0%, hsla(#{hslaValues[0]}, 100%, 50%, 0) 100%"

	mouseClicked = false

	saturationGrid.on Events.MouseDown, (event, layer)->
		mouseClicked = true
		saturationLightnessKnob.midX = event.point.x
		saturationLightnessKnob.midY = event.point.y
		# saturation
		hslaValues[1] = (saturationLightnessKnob.point.x + 5)/147 * 100
		# lightness
		hslaValues[2] = (100 - (saturationLightnessKnob.point.y + 5)/147 * 100) - ((saturationLightnessKnob.point.x + 5)/147 * 50)*(1-(saturationLightnessKnob.point.y + 5)/147)
		updateSelectedColor()

	# bg.on Events.MouseUp, (event, layer)->
	# 	mouseClicked = false

	saturationGrid.on Events.MouseUp, (event, layer)->
		mouseClicked = false

	hueSlider.on Events.MouseUp, (event, layer)->
		mouseClicked = false

	opacitySlider.on Events.MouseUp, (event, layer)->
		mouseClicked = false

	saturationGrid.on Events.MouseMove, (event, layer)->
		if mouseClicked is true
			saturationLightnessKnob.midX = event.point.x
			saturationLightnessKnob.midY = event.point.y
			# saturation
			hslaValues[1] = (saturationLightnessKnob.point.x + 5)/147 * 100
			# lightness
			hslaValues[2] = (100 - (saturationLightnessKnob.point.y + 5)/147 * 100) - ((saturationLightnessKnob.point.x + 5)/147 * 50)*(1-(saturationLightnessKnob.point.y + 5)/147)
			updateSelectedColor()


	selectedColorHolder.on Events.Tap, ->
		if @states.current.name == "hidden"
			@stateSwitch("shown")
		else
			@stateSwitch("hidden")
	
	selectedColorHolder.on Events.StateSwitchEnd, (from, to) ->
		try
			@children[1].stateSwitch(to)

	selectedColorHolder.stateSwitch("hidden")


		# if colorPicker.states.current.name == "hidden"
		# 	colorPicker.stateSwitch("shown")
		# else
		# 	colorPicker.stateSwitch("hidden")
	

	return selectedColorHolder



# selectedColor.on "change:backgroundColor", ->
	


# exports.selectedColor = () ->
# 	return