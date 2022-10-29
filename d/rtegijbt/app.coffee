
# panel = require 'ControlPanel'

aH = 56
breakerSavedY = aH * 2

# API

# addAlert
# viewAlerts
# removeAlert

ALERTID = 0
getAlertID = () ->
	ALERTID++
	return ALERTID


isPermanent = (selectedName) ->
	if selectedName == "weather" or selectedName == "road"
		return true
	return false

getColorByName = (selectedName) ->
	if selectedName == "weather" then return "blue"
	else if selectedName == "road" then return "green"
	
	return "gray"




findLayerByType = (selectedName) ->
	for layer in view.children
		if layer.name == selectedName
			return layer
	return null


wipeLayers = () ->
	for layer, i in view.children
		permittedLayers = alerts.filter (filterItem) -> filterItem.name == layer.name
		if permittedLayers.length == 0 or permittedLayers == undefined
			layer.name = "to_destroy"
	
	bannedLayers = view.children.filter (layer) -> layer.name == "to_destroy"
	for item in bannedLayers
# 		item.animate(y: 0, options: { time: 1 })
		item.parent = null
		item.destroy()

# Screen


# users.sort (a,b) ->
# 	sortBy('id', a, b, true) or
# 	sortBy('lname', a, b) or
# 	sortBy('fname', a, b)





screen = new ScrollComponent
	scrollVertical: true
	scrollHorizontal: false
	width: 360
	height: 640
	backgroundColor: "F5F6F8"



outsideGeoViewY = 274
outsideGeoView = new Layer
	parent: screen.content
	width: 360
	height: 94
	y: 274
	backgroundColor: "null"

outsideGeoView.states =
	"hidden": { y: 274 }
	"shown": { y: 274 }


insideGeoView = new Layer
	parent: outsideGeoView
	width: 360
	height: 640
	borderRadius: 8
	backgroundColor: "null"

insideGeoView.states = 
	"hidden": { y: 0 }
	"shown": { y: 0 }
insideGeoView.stateSwitch("hidden")


view = new Layer
	parent: insideGeoView
	width: 360
	height: 640
	backgroundColor: "null"





topFix = new Layer
	width: Canvas.width
	height: screen.y
	backgroundColor: "222"

botttomFix = new Layer
	width: Canvas.width
	height: Canvas.height - screen.y - screen.height
	y: screen.height + screen.y
	backgroundColor: "222"






baseView = new Layer
	parent: screen.content
	y: 274
	width: 360
	height: 94
	image: "images/base%20view.png"

baseView.states = 
	"hidden": { opacity: 1 }
	"shown": { opacity: 1 }
baseView.stateSwitch("hidden")


header = new Layer
	parent: screen.content
	width: 360
	height: 640
	image: "images/header%20(3).png"
# 	opacity: 0.1



arrowView = new Layer
	parent: baseView
	x: Align.right
	width: 64
	height: 44
	backgroundColor: "white"

arrow_view_up_4 = new Layer
	parent: arrowView
	width: 64
	height: 44
	image: "images/arrow%20view%20up.4.png"

arrow_view_down_4 = new Layer
	parent: arrowView
	width: 64
	height: 44
	image: "images/arrow%20view%20down.4.png"

for item in [arrow_view_up_4, arrow_view_down_4]
	item.states =
		"hidden": { opacity: if item == arrow_view_up_4 then 0 else 1 }
		"shown": { opacity: if item == arrow_view_down_4 then 0 else 1 }
	item.stateSwitch("hidden")



topScrollFix = new Layer
	parent: screen.content
	width: 360
	backgroundColor: "white"
	y: -500
	height: 500



outsideBottomView = new Layer
	parent: screen.content
	width: 360
	height: 882
	backgroundColor: "null"
# 	opacity: .5

outsideBottomView.states = 
	"hidden": { y: 0 }
	"shown": { y: aH * 2 }
outsideBottomView.stateSwitch("hidden")

insideBottomView = new Layer
	parent: outsideBottomView
	width: 360
	height: 882
	image: "images/bottom.png"
# 	opacity: .2
	
insideBottomView.states = 
	"hidden": { y: 0 }
	"shown": { y: 0 }
insideBottomView.stateSwitch("hidden")


updateOutsideView = (to, withTime = 0.3) ->
	if to == "shown"
		outsideBottomView.states.shown.y = 0 + alerts.length * aH
		outsideGeoView.states.shown.y = outsideGeoViewY + 94
	else
		outsideBottomView.states.hidden.y = 0 + alerts.length * aH - breakerSavedY
		outsideGeoView.states.hidden.y = outsideGeoViewY + 94 - breakerSavedY
	
	if withTime > 0
		withTime = Utils.modulate(breakerSavedY / aH, [2, 3], [0.25, 0.32], true)
	
	outsideBottomView.animate(to, time: withTime, curve: Bezier.easeInOut)
	outsideGeoView.animate(to, time: withTime, curve: Bezier.easeInOut)



baseView.on Events.StateSwitchEnd, (from, to) ->
	updateOutsideView(to)
	
	if to is "shown"
		arrow_view_up_4.animate(to, time: 0.2, curve: Bezier.easeInOut, delay: 0.1)
		arrow_view_down_4.animate(to, time: 0.2, curve: Bezier.easeInOut, delay: 0.0)
	else
		arrow_view_up_4.animate(to, time: 0.2, curve: Bezier.easeInOut, delay: 0.0)
		arrow_view_down_4.animate(to, time: 0.2, curve: Bezier.easeInOut, delay: 0.1)





baseView.on Events.Tap, ->
	if @states.current.name == "shown" then @stateSwitch("hidden")
	else @stateSwitch("shown")


{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 24 }

# Images



shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source



otherImages = ["images/chats.png", "images/local.png", "images/metro.png", "images/taxi.png", "images/weather weekend.png"]

cycler = Utils.cycle(shuffle(otherImages))


getImage = (selectedName, showNumber = 0) ->
	
	if selectedName == "weather"
		if showNumber == 0 then return "images/weather%20static.png"
		else return "images/weather%20rain.png"
	
	else if selectedName == "road" then return "images/road.png"
	
	return cycler()







FORCE_MAGIC = true

breaker = new Layer
	parent: insideGeoView
	width: 420
	height: 1
	x: -30
	backgroundColor: "red"
	opacity: 0.2

alerts = []
showLog = true
showLog = false

# print
printAlerts = () ->
	line = ""
	line += "#{item.name}: #{item.showNumber} | " for item in alerts
	print line






updateView = (withAnimation = true) ->
	chestFullIndex = -1
	if withAnimation then withTime = 0.3 else withTime = 0
	
	for alert, i in alerts
		currentLayer = findLayerByType(alert.name)
		
		if currentLayer != null
			if i == alerts.length - 1
				currentLayer.sendToBack()
				currentLayer.y = (i - 1) * aH
				currentLayer.animate(y: i * aH, options: { time: withTime })
			else currentLayer.y = i * aH
			
			
# 			currentLayer.animate(y: i * aH, options: { time: withTime })
			currentLayer.children[1].text = alert.showNumber
			
			if alert.name == "weather"
				currentLayer.image = getImage(alert.name, alert.showNumber)
		
		else
			block = new Layer
				parent: view
				width: 360
				height: aH
				y: (i - 1) * aH
				opacity: 0
				name: alert.name
				backgroundColor: getColorByName(alert.name)
				image: getImage(alert.name)
			
			title = new TextLayer
				parent: block
				text: block.name
				color: "white"
				width: 240
				x: -240
				opacity: 0.5
			
			counter = new TextLayer
				parent: block
				text: alert.showNumber
				color: "white"
				width: 100
				textAlign: "right"
				x: 400
				opacity: 0.5
			
			block.sendToBack()
			block.opacity = 1
			block.animate(y: i * aH, options: { time: withTime })
			
			block.on Events.Tap, (event, layer) ->
				FORCE_MAGIC = false
				
				filterName = @name
				thisAlerts = alerts.filter (filterItem) -> filterItem.name == filterName
				
				if thisAlerts.length == 1
					thisAlerts[0].showNumber = 0
				
				FORCE_MAGIC = true
				updateView(false)
		
		if alert.showNumber > 0 and chestFullIndex < 0 then chestFullIndex = i
	
	if chestFullIndex < 0 then chestFullIndex = alerts.length
	
	
	breakerSavedY = chestFullIndex * aH
	breaker.animate(y: breakerSavedY, options: { time: withTime, curve: Bezier.easeInOut })
	
	updateOutsideView(baseView.states.current.name, withTime)
	
	wipeLayers()


# add item to array
createAlert = (selectedName, selectedShowNumber = 2, forceUpdate = FORCE_MAGIC) ->
	if isPermanent(selectedName)
		alerts = alerts.filter (filterItem) -> filterItem.name != selectedName
	else selectedName = "id: #{getAlertID()}"
	
	alerts.push(
		name: selectedName
		showNumber: selectedShowNumber
		visibilityAction: true
	)
	
	if showLog then printAlerts()
	if forceUpdate then updateView()



readAlerts = (forceUpdate = FORCE_MAGIC) ->
	
	for alert in alerts
		alert.showNumber--
		if isPermanent(alert.name) and alert.showNumber < 0 then alert.showNumber = 0
	
	zeroAlerts = alerts.filter (filterItem) -> filterItem.showNumber <= 0
	noneZeroAlerts = alerts.filter (filterItem) -> filterItem.showNumber > 0
	alerts = zeroAlerts.concat(noneZeroAlerts)
	
	if showLog then printAlerts()
	if forceUpdate then updateView(false)



forceRemoveFirst = (forceUpdate = FORCE_MAGIC) ->
	removeIndex = -1
	for alert, i in alerts
		if alert.showNumber > 0
			removeIndex = i
			break
	
	if removeIndex != -1
		alerts[removeIndex].showNumber = -1
		if isPermanent(alert.name) and alert.showNumber < 0 then alert.showNumber = 0
		
		zeroAlerts = alerts.filter (filterItem) -> filterItem.showNumber <= 0
		noneZeroAlerts = alerts.filter (filterItem) -> filterItem.showNumber > 0
		alerts = zeroAlerts.concat(noneZeroAlerts)
		
		removeAlerts(forceUpdate)


forceRemoveLast = (forceUpdate = FORCE_MAGIC) ->
	removeIndex = -1
	
	for alert, i in alerts
		if alert.showNumber > 0
			removeIndex = i
	
	if removeIndex != -1
		alerts[removeIndex].showNumber = -1
		if isPermanent(alert.name) and alert.showNumber < 0 then alert.showNumber = 0
		
		zeroAlerts = alerts.filter (filterItem) -> filterItem.showNumber <= 0
		noneZeroAlerts = alerts.filter (filterItem) -> filterItem.showNumber > 0
		alerts = zeroAlerts.concat(noneZeroAlerts)
		
		removeAlerts(forceUpdate)


removeAlerts = (forceUpdate = FORCE_MAGIC) ->
	alerts = alerts.filter (filterItem) -> filterItem.showNumber >= 0
	
	if showLog then printAlerts()
	if forceUpdate then updateView(false)





test = () ->



# Handlers

setOnlineHandler = () ->
	FORCE_MAGIC = true
	updateView()

setOfflineHandler = () ->
	FORCE_MAGIC = false

readHandler = () ->
	readAlerts()

removeHandler = () ->
	removeAlerts()

removeFirstHandler = () ->
	forceRemoveFirst()

removeLastHandler = () ->
	forceRemoveLast()

createWeatherHandler = () ->
	createAlert("weather")

createAlertHelper = (numberCreated) ->
	createAlert("some", numberCreated)


createAlert1 = () ->
	createAlertHelper(1)

createAlert2 = () ->
	createAlertHelper(2)

createAlert3 = () ->
	createAlertHelper(3)

createAlert4 = () ->
	createAlertHelper(4)

createAlert5 = () ->
	createAlertHelper(5)





preview.addSection("Show changes immediatelly", [
	{ title: "On (default)", handler: setOnlineHandler },
	{ title: "Off", handler: setOfflineHandler },
])

preview.addSection("Create with visibility counter", [
	{ title: "Weather", handler: createWeatherHandler },
	{ title: "1", handler: createAlert1 },
	{ title: "2", handler: createAlert2 },
	{ title: "3", handler: createAlert3 },
	{ title: "4", handler: createAlert4 },
	{ title: "5", handler: createAlert5 },
])

preview.addSection("Actions", [
	{ title: "Read", handler: readHandler },
	{ title: "Wipe", handler: removeHandler },
	{ title: "Remove ↑", handler: removeFirstHandler },
	{ title: "Remove ↓", handler: removeLastHandler },
])







# FORCE_MAGIC = false

createAlert("weather")
createAlert("road")
readAlerts() 
readAlerts()

updateOutsideView("shown", 0)
updateOutsideView("hidden", 0)

baseView.emit Events.Tap

topBarFix = new Layer
	parent: screen, width: screen.width, height: 32
	backgroundColor: "white"
