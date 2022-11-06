# class AppIcon

# appDataURL = "https://dl.dropboxusercontent.com/s/lztq2uh0xr3l4j2/appData.json"
appData = JSON.parse Utils.domLoadDataSync "appData.json"
groupData = JSON.parse Utils.domLoadDataSync "groups.json"

iconMap = new Map()
for item in appData
	iconMap.set(item.name, item)

groups = new Map()
for currentGroupData, i in groupData
	currentArray = []
	
	for currentIconName in currentGroupData.items
		currentArray.push(iconMap.get(currentIconName))
	
	groups.set(currentGroupData.name, currentArray)







class AppIcon
	@constData = {
		size: 56
		inset: 56
		gap: 12
		inRow: 5
	}
	
	appView = null
	
	name: "Unknown App"
	url: "yandex.ru"
	icon: "unknown.png"
	
	size: 56
	inset: 56
	gap: 12
	
	isTitled: true
	counter: 0
	
	
	constructor: (@name, @url, @icon, @size = AppIcon.constData.size, @gap = AppIcon.constData.gap, @isTitled = true, @counter = 0) ->
		@composeIcon()
# 		print @icon
	
	print: () ->
# 		print AppIcon.temp
	
	getView: () ->
		return @appView
	

	setWhiteTitle: () ->
		@getTitle().color = "white"

		@getIcon().borderWidth = 0
		@getIcon().shadowY = 1
		@getIcon().shadowBlur = 2
		@getIcon().shadowColor = "rgba(0, 0, 0, 0.1)"
	

	setDarkTitle: () ->
		@getTitle().color = "black"

		@getIcon().borderWidth = 1
		@getIcon().borderColor = "rgba(0, 0, 0, 0.1)"
	

	getTitle: () ->
		return @appView.children[1].children[0]

	getIcon: () ->
		# print @appView.children[0].name
		return @appView.children[0]
	
	getTitleView: () ->
		# print @appView.children[1].states
		return @appView.children[1]
	
	composeIcon: () ->
		@appView = new Layer
			width: @size
			height: @size + AppIcon.constData.inset
			backgroundColor: "transparent"
			name: @url
		
		appIcon = new Layer
			parent: @appView
			size: @size
			borderRadius: 16
			name: "shape"
			backgroundColor: "white"
			clip: true
			
		@appView.on Events.Tap, (event, layer) ->
			try
				window.webkit.messageHandlers.open.postMessage("https://" + layer.name);
		
		appAsset = new Layer
			parent: appIcon
			size: 36
			x: (@size - 36) / 2
			y: (@size - 36) / 2
			image: "images/apps/" + @icon
		
		if @name == "Яндекс" || @name == "VK" || @name == "OK" || @name == "Youtube"
			appAsset.width = @size
			appAsset.height = @size
			appAsset.x = 0
			appAsset.y = 0
			appAsset.backgroundColor = "transparent"
		
		# for animation
		appTitleView = new Layer
			parent: @appView
			width: @size + (@gap - 4)
			height: AppIcon.constData.inset
			x: - (@gap) / 2
			y: @size
			name: "titleView"
			backgroundColor: "transparent"
		
		appTitleView.states =
			"shown": { opacity: 0.9 }
			"hidden": { opacity: 0 }
		
# 		if @isTitled
# 			appTitle.stateSwitch("shown")
# 			appTitle.color = "rgba(0,0,0, 0.8)"
# 		else appTitle.stateSwitch("hidden")
		
		# for styling
		appTitle = new TextLayer
			parent: appTitleView
			width: appTitleView.width
			fontSize: 12
			lineHeight: 1.2
			textAlign: "center"
			fontWeight: "500"
			text: @name
			padding:
				top: 8
			color: "white"
			height: @size / 2
			truncate: true
			name: "title"
		
		
		appBadge = new Layer
			parent: @appView
			size: 24
			x: 40
			y: -8
			borderRadius: "100%"
			backgroundColor: "#EB3A38"
			name: "badge"
		
		appBadge.states =
			"shown": { opacity: 1 }
			"hidden": { opacity: 0 }
		
		if @counter != 0 then appBadge.stateSwitch("shown")
		else appBadge.stateSwitch("hidden")
		
		
		
		appBadgeCounter = new TextLayer
			parent: appBadge
			width: appBadge.width
			fontSize: 13
			y: 3
			textAlign: "center"
			fontWeight: "bold"
			text: @counter
			color: "white"
			height: 36
			truncate: true
			name: "counter"


class AppRow
	rowView = null
	width: 360
	size: 56
	gap: 12
	offset: 0
	
	constructor: (appIconArray, @size = AppIcon.constData.size, @gap = AppIcon.constData.gap) ->
		@offset = (@width - ((AppIcon.constData.inRow - 1) * (@size + @gap) + @size)) / 2
		@rowView = new Layer
			width: @width
			height: @size * 2
			backgroundColor: "transparent"
# 			backgroundColor: Utils.randomColor()
# 			opacity: 0.5
			name: "row: " + appIconArray[0].name + " -> " + appIconArray[appIconArray.length - 1].name
		
		for currentAppIcon, i in appIconArray
			currentIconView = currentAppIcon.getView()
			currentIconView.parent = @rowView
			currentIconView.x = (i % AppIcon.constData.inRow) * (@size + @gap) + @offset
	
	print: () ->
		# print("offset: " + @offset)
	
	getView: () ->
		return @rowView





class AppGrid
	gridView = null
	isInverted = false
	showText = true
	rows = 0
	
	constructor: (iconArray, @isInverted = false, @showText = true) ->
		@rows = (iconArray.length - iconArray.length % AppIcon.constData.inRow) / AppIcon.constData.inRow
		if iconArray.length % AppIcon.constData.inRow != 0 then @rows++
		
		@gridView = new Layer
			backgroundColor: "transparent"
			width: 360
			height: @rows * AppIcon.constData.size * 2
			name: "gridView"
		
		currentRowArray = []
		currentRow = -1
		
		for currentIcon, i in iconArray
			if i % AppIcon.constData.inRow == 0
				currentRowArray = []
				currentRow++
			
			currentRowArray.push(currentIcon)
			
			if i % AppIcon.constData.inRow == AppIcon.constData.inRow - 1 or i == iconArray.length - 1
				rowView = new AppRow(currentRowArray).getView()
				rowView.parent = @gridView
				rowView.states =
					"shown": { y: 0 }
					"hidden": { y: 0 }
				
				# print @isInverted
				if @isInverted
					rowView.states.shown.y = (@rows - currentRow - 1) * AppIcon.constData.size * 2
					rowView.states.hidden.y = @gridView.height - (AppIcon.constData.size * 2) - (currentRow) * (AppIcon.constData.size + AppIcon.constData.gap)
# 					rowView.states.hidden.y = (@rows - currentRow - 1) * (AppIcon.constData.size + AppIcon.constData.gap)
				else
					rowView.states.shown.y = currentRow * AppIcon.constData.size * 2
					rowView.states.hidden.y = currentRow * (AppIcon.constData.size + AppIcon.constData.gap)
				
# 				print rowView.states.shown.y + " " + rowView.states.hidden.y
				
				if @showText then rowView.stateSwitch("shown") else rowView.stateSwitch("hidden")
	
	getView: () ->
		return @gridView





class AppView
	view = null
	data = null
	icons = null
	
	isShown = true
	isInverted = false
	isWhite = false
	
	getView: () ->
		return @view
	
	constructor: (@data, @isShown = true, @isInverted = false, @isWhite = false) ->
		@icons = []
		
		for currentAppData, i in @data
			@icons.push(new AppIcon(currentAppData.name, currentAppData.url, currentAppData.icon))
		
		for icon in @icons
			if @isWhite then icon.setWhiteTitle()
			else icon.setDarkTitle()
		
		@view = (new AppGrid(@icons, @isInverted, @isShown)).getView()
		
		if !@isShown
			for row in @view.children
				row.stateSwitch("hidden")
				
				for icon in row.children
					icon.children[1].stateSwitch("hidden")
		
		for item in @view.children
			item.name = "."
			item.sendToBack()






































# constructor: (@data, @isShown = true, @isInverted = false, @isWhite = false) ->

exports.getAllAppView = () ->
	return (new AppView(groups.get("Все приложения"), titleShown = true, invertedOrder = false, whiteText = false)).getView()

exports.getBestAppView = () ->
	return (new AppView(groups.get("Табло"), titleShown = false, invertedOrder = true, whiteText = true)).getView()

exports.getPromoApps = () ->
	localIconViews = []
	
	for currentAppData, b in groups.get("Фичеры")
		icon = new AppIcon(currentAppData.name, currentAppData.url, currentAppData.icon, AppIcon.constData.size, AppIcon.constData.gap, false)
		icon.setDarkTitle()

		icon.getView().width = 108
		icon.getView().height = 192

		for child, c in icon.getView().children
			if c == 0
				child.x += 26
				child.y += 94
				child.originY = 1.5
				child.scale = 0.57
				child.shadowY = 1
				child.shadowBlur = 4
				child.shadowColor = "rgba(0,0,0,0.25)"
			else if c == 1
				child.x = Align.center()
				child.y += 94 + 12
			else
				child.opacity = 0
		
		preview = new Layer
			width: 96
			height: 144
			x: 6
			y: 8
			image: "images/best/" + b + ".png"
			parent: icon.getView()
		
		preview.sendToBack()

		localIconViews.push(icon.getView())


	for promoIconView in localIconViews
		for item in promoIconView.children
			item.name = "."

	return localIconViews


exports.getURL = (localAppName) ->
	for currentApp in appData
		if currentApp.name == localAppName then return currentApp.url

# getBestApps()