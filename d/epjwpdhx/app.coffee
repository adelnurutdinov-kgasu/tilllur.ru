Framer.Extras.Hints.disable()
Utils.insertCSS('@import url(css/project.css)')

Screen.backgroundColor = "222"

columnArray = []

cView = new Layer { backgroundColor: "null" }
columnWidth = [320, 360, 414]


# Data

titleData1 = {
	city: "Москва",
	local: "Хамовники",
}

TD = {
	arrow: [0, 1, 2]
	score: [
		["пусто"],
		["дороги\nсвободны"],
		["дороги почти\nсвободны"],
		["местами\nпробки"],
		["местами\nпробки"],
		["плотное\nдвижение"],
		["движение\nзатруднено"],
		["серьезные\nпробки"],
		["серьезные\nпробки"],
		["город\nстоит"],
		["пешком\nбыстрее"],
	]
	image: ["images/lighter_yellow.4.png", "images/lighter_red.4.png", "images/lighter_green.4.png"]
}

WD = {
	month:
		summer: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
		winter: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25],
		autumn: [4, 5, 6],
	next: 
		base: [
			["днём", "вечером",  [2, 3, 4, 5], [2, 3, 4]],
			["вечером", "ночью", [-2, -1, 0], [-2, -3, -4, -5]],
			["ночью", "утром", [-4, -3, -2], [-2, -1, 0]],
		],
		short: [
			["день", "вечер",  [2, 3, 4, 5], [2, 3, 4]],
			["вечер", "ночь", [-2, -1, 0], [-2, -3, -4, -5]],
			["ночь", "утро", [-4, -3, -2], [-2, -1, 0]],
		],
		min: [
			["от ", "до",  [2, 3, 4, 5], [2, 3, 4]],
			["от", "до", [-2, -1, 0], [-2, -3, -4, -5]],
			["от", "до", [-4, -3, -2], [-2, -1, 0]],
		]
	
	image: ["images/skc_d.4.png", "images/skc_n.4.png", "images/bkn_n.4.png", "images/fg_n.4.png", "images/bkn_-ra_d.4.png", "images/bkn_+ra_d.4.png", "images/bkn_ra_d.4.png", "images/fg_d.4.png", "images/ovc_ts.4.png", "images/ovc_ts_ra.4.png", "images/ovc_ra.4.png", "images/bkn_ra_n.4.png", "images/ovc.4.png", "images/bkn_d.4.png"]
}

dataArray = []



createWideData = (w_month = "summer", wSeedSize = 1) ->
	for _ in [0...wSeedSize]
		w_seed = Utils.randomChoice(WD.month[w_month])
		
		for w_type in [0]
			
			for t_type in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
				
				w_current = w_seed
				if w_month == "summer" then w_current_text = " #{w_current}°"
				else if w_month == "winter" then w_current_text = "–#{w_current}°"
				else w_current_text = " #{w_current}°"
				
				w_next_1 = w_seed + Utils.randomChoice(WD.next["base"][w_type][2])
				w_next_2 = w_seed + Utils.randomChoice(WD.next["base"][w_type][3])
				w_image_seed = Utils.randomChoice(WD.image)
				
# 				t_type = Utils.randomChoice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
				t_seed = TD.score[t_type]
				t_image_seed = TD.image[2]
				if t_type >= 4 and t_type <= 6 then t_image_seed = TD.image[1]
				else if t_type <= 3 then t_image_seed = TD.image[0]
				
				currentData = {
					w_image: "#{w_image_seed}",
					w_number: w_current_text,
					w_text: 
						base: "#{WD.next["base"][w_type][0]} #{w_next_1}° #{WD.next["base"][w_type][1]} #{w_next_2}°",
						short: "#{WD.next["short"][w_type][0]} #{w_next_1}° #{WD.next["short"][w_type][1]} #{w_next_2}°",
						min: "от #{Math.min(w_current, w_next_1, w_next_2)}°\nдо #{Math.max(w_current, w_next_1, w_next_2)}°",
					t_image: "#{t_image_seed}",
					t_number: "#{t_type}",
					t_dynamic: TD.arrow[0],
					t_text: "#{t_seed}",
				}
				
				dataArray.push currentData



createRandomData = (dataLength = 15) ->
	for item in [0...dataLength]
		w_seed = Utils.randomChoice(WD.month.summer)
		w_type = Utils.randomChoice([0, 1, 2])
		
		w_current = w_seed
		w_next_1 = w_seed + Utils.randomChoice(WD.next.base[w_type][2])
		w_next_2 = w_seed + Utils.randomChoice(WD.next.base[w_type][3])
	# 	print w_next_1 + " " + w_next_2
		
		t_type = Utils.randomChoice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
		t_seed = TD.score[t_type]
		
		
		currentData = {
			w_image: "images/skc_d.png",
			w_number: " #{w_current}°",
			w_text: "#{WD.next.base[w_type][0]} #{w_next_1}°\n#{WD.next.base[w_type][1]} #{w_next_2}°",
			t_image: "images/skc_d.png",
			t_number: "#{t_type}",
			t_dynamic: TD.arrow[0],
			t_text: "#{t_seed}",
		}
		
	dataArray.push currentData



createWideData("winter")

# Create

createInfoView = (data, parentView, w_text_length = "base") ->
	
	infoView = new Layer
		parent: parentView
		width: parentView.width
		height: 48
		backgroundColor: "null"
	
	
	
	weatherView = new Layer
		height: 36 + 6 + 6
		width: 360
		parent: infoView
# 		y: 44 - 6
		x: 4
		backgroundColor: "#F5F5F5"
		borderRadius: 12
	
	weatherImage = new Layer
		parent: weatherView
		size: 36
# 		x: 12
		y: 6
		image: data.w_image
	
	weatherNumber = new TextLayer
		parent: weatherView
		fontFamily: "YS Web Regular"
		fontSize: 24
		text: data.w_number
		color: "#21201F"
		height: weatherImage.height
		padding: 
			top: 3
# 		x: weatherImage.x + weatherImage.width + 2
		y: weatherImage.y
# 		backgroundColor: "rgba(255, 0, 255, 0.5)"
	
	weatherText = new TextLayer
		parent: weatherView
		truncate: true
		fontFamily: "YS Web Regular"
		text: data.w_text[w_text_length]
		color: "#21201F"
		padding:
			top: 2
		height: weatherImage.height
		fontSize: 13
# 		x: weatherNumber.x + weatherNumber.width + 4
		y: weatherImage.y
# 		backgroundColor: "rgba(255, 255, 0, 0.5)"
	
# 	weatherView.width = weatherText.x + weatherText.width + 12
	
	
	
	
	trafficView = new Layer
		height: 36 + 6 + 6
		width: 360
		parent: infoView
# 		y: 44 - 6
		x: 4 + weatherView.width + 4
		backgroundColor: "#F5F5F5"
		borderRadius: 12
	
	trafficImage = new Layer
		parent: trafficView
		size: 36
# 		x: 10
		y: 6
		image: data.t_image
	
	trafficNumber = new TextLayer
		parent: trafficView
		fontFamily: "YS Web Regular"
		fontSize: 24
		text: data.t_number
		color: "#21201F"
		height: trafficImage.height
		padding: 
			top: 3
# 		x: trafficImage.x + trafficImage.width + 4
		y: trafficImage.y
# 		backgroundColor: "rgba(255, 0, 255, 0.5)"
	
	trafficArrow = new Layer
		parent: trafficView
		width: 8
		height: 24
# 		x: trafficNumber.x + trafficNumber.width + 2
		y: trafficImage.y + 6
		image: "images/arrow%20up.4.png"
	
	if data.t_dynamic == TD.arrow[0] then trafficArrow.width = 0
	
	trafficText = new TextLayer
		parent: trafficView
		fontFamily: "YS Web Regular"
		truncate: true
		text: data.t_text
		color: "#21201F"
		padding:
			top: 2
		height: trafficImage.height
		fontSize: 13
# 		x: trafficArrow.x + trafficArrow.width + 8
		y: trafficImage.y
# 		backgroundColor: "rgba(255, 255, 0, 0.5)"
	
# 	trafficView.width = parentView.width - weatherView.width - 4 * 3
	
	return infoView


createCard = (titleData, infoData, parentView, w_text_length = "base") ->
	
	cardView = new Layer
		parent: parentView
		width: parentView.width
		height: 88
		backgroundColor: "white"
		borderRadius: 16
	
	cityView = new TextLayer
		parent: cardView
		fontFamily: "YS Web Medium"
		fontSize: 14
		height: 18
# 		backgroundColor: "red"
		x: 20
		y: 10
		text: titleData.city
		color: "21201F"
		padding: 
			top: 1
	
	localView = new TextLayer
		parent: cardView
		fontFamily: "YS Web Regular"
		fontSize: 14
		height: 18
# 		backgroundColor: "red"
		x: cityView.x + cityView.width + 6
		y: 10
		text: titleData.local
		color: "21201F"
		opacity: 0.4
		padding: 
			top: 1
	
	infoView = createInfoView(infoData, cardView, w_text_length)
	infoView.y = 36
	infoView.name = "infoView"
	
	return cardView


# Update

updateView = (cardView) ->
	currentInfoView = null
	currentWeatherView = null
	currentTrafficView = null
	
	for item, i in cardView.children
		if i == 1
			cardView.children[i].x = cardView.children[i-1].x + cardView.children[i-1].width + 6
		
		else if i == 2
			currentInfoView = item
			currentWeatherView = currentInfoView.children[0]
			currentTrafficView = currentInfoView.children[1]
	
	w_start = 0
	w_text_start = 0
	w_gaps = [12, 2-2, 6, 12]
	for item, i in currentWeatherView.children
		if i == 2 then w_text_start = w_start
		w_start += w_gaps[i]
		item.x = w_start
		w_start += item.width
	
	currentWeatherView.width = w_start + w_gaps[w_gaps.length - 1]
	
	#################### LOGIC BOY
	
# 	# minWidth 50%
# 	if currentWeatherView.width < (cardView.width - 4*3) * 0.5
# 		currentWeatherView.width = (cardView.width - 4*3) * 0.5
# 		
# 	# width 50%
	currentWeatherView.width = (cardView.width - 4*3) * 0.5
# 	#################### 
	
	currentWeatherView.children[2].width = currentWeatherView.width - w_text_start - w_gaps[w_gaps.length - 1]
	
	
	t_start = 0
	t_text_start = 0
	t_gaps = [10, 4, 0, 8]
	
	for item, i in currentTrafficView.children
		if i == 3 then t_text_start = t_start
		
		t_start += t_gaps[i]
		if i == 2 and item.width == 0 then t_start += 2
		item.x = t_start
		t_start += item.width
# 		item.backgroundColor = Utils.randomNumber()
	
	
	currentTrafficView.x = currentWeatherView.width + 4*2
	currentTrafficView.width = cardView.width - currentWeatherView.width - 4*3
	
	currentTrafficView.children[3].width = currentTrafficView.width - t_text_start - t_gaps[t_gaps.length - 1] - 8
	


columnX = 0
for currentWidth, c in columnWidth
	column = new ScrollComponent
		parent: cView
		width: currentWidth
		backgroundColor: "null"
		height: Screen.height
		scrollHorizontal: false
		x: columnX
	
# 	if c == 1 then column.scale = 0.977
	columnArray.push column
	columnX += currentWidth + 40
	
	tempLayers = []
	
	if c == 0 then c_type = "min"
	else if c == 1 then c_type = "short"
	else c_type  = "base"
	
	for dataItem, i in dataArray
		temp = createCard(titleData1, dataItem, column.content, c_type)
		temp.y = (temp.height + 20) * i + 20
		tempLayers.push(temp)

cView.width = columnX - 40
cView.x = Align.center

Utils.delay 4, ->
	for currentColumn in columnArray
		for temp in currentColumn.content.children
			updateView(temp)





