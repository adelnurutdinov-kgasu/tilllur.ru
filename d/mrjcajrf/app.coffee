Framer.Extras.Hints.disable()
Canvas.backgroundColor = "222"

{iOSSwitch} = require 'iOSSwitch'
{iOSSegmentedControl} = require "iOSSegmentedControl"

isShowTips = false

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

# API

{DynamicLoader} = require "DynamicLoader"
DynamicLoader.series(["./vendor/rest.js",]).then(->
	;
)


`window.searchQuery = function(q) {
	var API = 'https://suggest.yandex.ru/';
	
	var endingsURL = API + 'suggest-endings?v=4&part=' + encodeURI(q) + '&digram_only=0&digram_coeff=1&srv=test&lr=213&uil=ru&sn=100&esn=10';
	
	requestJSON(endingsURL).then(function(data2) {
		var endings = data2[2];
		console.log('Endings answer:', endings);
		
		var qlen = q.length;
		var rawEndings = []
		
		var cleanEndings = endings.map(function(e) { 
			var dp = e[0].substr(qlen);
			console.log ('NNNNNNNN:',dp);
			rawEndings.push(dp);
			
			var p = e[0];
			if (dp[0]==" " ){return e[0].substr(qlen);} 
			var i = qlen;

			while (i > 0) {
				i --
				if (p[i]==" "){
					e[0]=e[0].substr(i);
					i=0;
				}
			}
			return e[0]; });
		
		//updateSuggestContext(cleanEndings, rawEndings)
		updateSuggest(cleanEndings)
		
	}.bind(this));
	
	
	var url = API + 'suggest-ya.cgi?part=' + encodeURI(q) + '&v=4&?n=10&?fact=1&?mob=1';
	requestJSON(url).then(function(data) {
		var suggest = data[1] || [];
		console.log(data)
		//updateSuggestLines(data)
	}.bind(this));
}`

# Screen Guard

screenGuard = new Layer
	name: "screenGuard"
	opacity: 0
	x: -2000

screenGuard.states =
	"main": { opacity: 0 }
	"feed": { opacity: 0 }
screenGuard.stateSwitch("main")

screenGuard.on Events.StateSwitchEnd, (from, to) ->
# 	if from != to
# 		if to is "main"
# 			shortsButton.children[0].animate("hidden")
# 			exploreButton.children[0].animate("hidden")
# 			item.animate("shown") for item in [shortsButton, exploreButton]
# 		
# 		else if to is "feed"
# 			shortsButton.children[0].animate("shown")
# 			exploreButton.children[0].animate("shown")
# 			item.animate("hidden") for item in [shortsButton, exploreButton]

{ Preview } = require "PreviewComponent"

screen = new Layer { width: 375, height: 812, backgroundColor: "FAF9F8" }
new Preview { view: screen }



# Main


flow_withoutTabBar = new FlowComponent
	parent: screen
	width: screen.width
	height: screen.height


screen_WithTabBar = new Layer
	name: "screen_WithTabBar"
# 	parent: flow_withoutTabBar
	width: screen.width
	height: screen.height
	backgroundColor: "white"



flow_withTabBar = new FlowComponent
	parent: screen_WithTabBar
	width: screen.width
	height: screen.height
	backgroundColor: "white"






screen_main = new Layer
	name: "screen_main"
	parent: flow_withTabBar
	width: screen.width
	height: screen.height
	backgroundColor: "F3F3F3"

# mainHeader = new Layer
	name: "# mainHeader"
# 	parent: screen_main
# 	width: 375
# 	height: 101
# 	image: "images/mainHeader.png"



screen_main_header = new Layer
	name: "screen_main_header"
	parent: screen_main
	width: 375
	height: 358
	image: "images/screen_main_header.png"

screen_main_card = new Layer
	name: "screen_main_card"
	parent: screen_main
	width: 375
	height: 451
	y: screen_main_header.height + 6
	image: "images/screen_main_card.png"


shortcutsScroll = new ScrollComponent
	name: "shortcutsScroll"
	width: 375
	height: 8 + 8 + 108
	parent: screen_main_header
	y: 190
	scrollVertical: false
	scrollHorizontal: true
	contentInset: 
		top: 8
		right: 16

for item, i in ["vc", "seamless", "search", "01", "02", "03", "04", "05", "06", "07"]
	shortcut = new Layer
		name: "shortcut"
		parent: shortcutsScroll.content
		size: 108
		x: 16 + i * (108 + 8)
		image: "images/shortcuts/shortcut_#{item}.png"

shortcutsScroll.updateContent()
shortcutsScroll.backgroundColor = "white"

flow_withoutTabBar.showNext(screen_WithTabBar)
flow_withTabBar.showNext(screen_main)

# Buttons

clearBack = (layer) ->
	layer.off(Events.Tap, flow_withTabBar_handler)
	layer.off(Events.Tap, flow_withoutTabBar_handler)
	
	layer.off(Events.SwipeRight, flow_withTabBar_handler)
	layer.off(Events.SwipeRight, flow_withoutTabBar_handler)
	
	layer.off(Events.SwipeRightEnd, flow_withTabBar_handler)
	layer.off(Events.SwipeRightEnd, flow_withoutTabBar_handler)


flow_withTabBar_handler = (event, layer) ->	
	flow_withTabBar.showPrevious()

flow_withoutTabBar_handler = (event, layer) ->
	flow_withoutTabBar.showPrevious()

flow_site_handler = Utils.throttle 0.5, (event, layer) ->
	flow_withoutTabBar.showPrevious()
	
	Utils.delay 0.5, =>
		for item in flow_site.children
			item.destroy()
			item = null


# site
# box = new Layer
	name: "# box"
# 	x: Align.right, size: 58
# 
# box.onTap ->
# 	print flow_withoutTabBar.current
# 	print flow_withTabBar.current
# 	
# 	print flow_withoutTabBar.previous

web_home_handler = (event, layer) ->
	if flow_withoutTabBar.current == screen_search
		flow_withoutTabBar.showPrevious()
	else if flow_withoutTabBar.current == screen_site and flow_withoutTabBar.previous == screen_search
		flow_withoutTabBar.showPrevious(animate: false)
		flow_withoutTabBar.showPrevious()
	else if flow_withoutTabBar.current == screen_site
		flow_withoutTabBar.showPrevious()
	
# 	collapseSites()
	



# Buttons

gapButton = 48

createButton = (title = "Показать сайт") ->
	button = new TextLayer
		name: "button"
		parent: screen_main
		text: title
		fontSize: 16
		padding: 
			left: 12
			right: 12
			top: 8
			bottom: 10
		borderRadius: 20
		x: 24
		color: "black"
		backgroundColor: "#F3F3F2"
		textAlign: "left"
		opacity: .8
	return button


# createButton(item) for item in ["Сайт", "Статья Дзена", "Профиль Дзена"]


decorateArray = []

showTips = (layer) ->
	layer.borderRadius = 4
	layer.backgroundColor = Utils.randomColor()
	layer.opacity = 0.2

hideTips = (layer) ->
	layer.borderRadius = 0
	layer.backgroundColor = "null"
	layer.opacity = 1

decorateButton = (layer) ->
	decorateArray.push(layer)
	showTips(layer)

continueDecoration = () ->
	showTips(item) for item in decorateArray

pauseDecoration = () ->
	hideTips(item) for item in decorateArray

checkDecoration = () ->
	if isShowTips then continueDecoration()
	else pauseDecoration()



# Article


screen_article = new Layer
	name: "screen_article"
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "white"

screen_article_header = new Layer
	name: "screen_article_header"
	parent: screen_article
	width: 375
	height: 101
	image: "images/headerArticle.png"



screen_article_header_back = new Layer
	name: "screen_article_header_back"
	parent: screen_article_header, height: 56, width: 48, y: 44, x: -8


screen_article_header_profileButton = new Layer
	name: "screen_article_header_profileButton"
	parent: screen_article_header, height: 56, width: 240, y: 44, x: -8 + 48

screen_article_header_profileButton.onTap ->
	flow_withoutTabBar.showNext(screen_profile)
	clearBack(screen_profile_header_back)
	screen_profile_header_back.on(Events.Tap, flow_withoutTabBar_handler)
	clearBack(screen_profile)
	screen_profile.on(Events.SwipeRightEnd, flow_withoutTabBar_handler)



article_actionBar = new Layer
	name: "article_actionBar"
	parent: screen_article
	width: 375
	height: 83
	y: Align.bottom
	image: "images/article_actionBar.png"


decorateButton(screen_article_header_back)
decorateButton(screen_article_header_profileButton)

# Profile


screen_profile = new Layer
	name: "screen_profile"
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "white"

profileView = new Layer
	name: "profileView"
	parent: screen_profile
	width: 375
	height: 812
	image: "images/profileView.png"

screen_profile_header = new Layer
	name: "screen_profile_header"
	parent: screen_profile
	width: 375
	height: 101
# 	image: "images/headerProfile.png"
	backgroundColor: "null"

screen_profile_header_back = new Layer
	name: "screen_profile_header_back"
	parent: screen_profile_header, size: 56, y: 44, x: -8

decorateButton(screen_profile_header_back)




# Search

screen_search = new Layer
	name: "screen_search"
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "white"

screen_search_header = new Layer
	name: "screen_search_header"
	parent: screen_search
	width: 375
	height: 153
	image: "images/searchHeader.png"

screen_search_header_back = new Layer
	name: "screen_search_header_back"
	parent: screen_search_header, size: 48, y: 48, x: 14

screen_search_actionbar = new Layer
	name: "screen_search_actionbar"
	parent: screen_search
	width: 375
	height: 83
	y: Align.bottom
	image: "images/web_actionbar.png"

screen_search_actionbar_back = new Layer
	name: "screen_search_actionbar_back"
	parent: screen_search_actionbar, size: 48, x: 18, y: 2

screen_search_actionbar_back.onTap ->
	flow_withoutTabBar.showPrevious()

screen_search_actionbar_home = new Layer
	name: "screen_search_actionbar_home"
	parent: screen_search_actionbar, size: 48, x: Align.right(-18), y: 2

screen_search_actionbar_home.onTap ->
	web_home_handler()




screen_search_button_toSite = createButton("На сайт (target blank)")
screen_search_button_toSite.parent = screen_search
# screen_search_button_toSite.x = -24
screen_search_button_toSite.y = 200

screen_search_button_toSite.onTap ->
	flow_withoutTabBar.showNext(screen_site)
	createSitePage("start page")
	clearBack(screen_site_header_back)
	screen_site_header_back.on(Events.Tap, flow_site_handler)
	screen_site_header_back.on(Events.SwipeRight, flow_site_handler)



decorateButton(screen_search_actionbar_back)
decorateButton(screen_search_header_back)
decorateButton(screen_search_actionbar_home)

# Site

screen_site = new Layer
	name: "screen_site"
	parent: screen
	width: screen.width
	height: screen.height
	backgroundColor: "white"

screen_site_header = new Layer
	name: "screen_site_header"
	parent: screen_site
	width: 375
	height: 105
	image: "images/siteHeader.png"

screen_site_header_back = new Layer
	name: "screen_site_header_back"
	parent: screen_site_header, size: 48, y: 48, x: 14


screen_site_actionbar = new Layer
	name: "screen_site_actionbar"
	parent: screen_site
	width: 375
	height: 83
	y: Align.bottom
	image: "images/web_actionbar.png"

screen_site_actionbar_back = new Layer
	name: "screen_site_actionbar_back"
	parent: screen_site_actionbar, size: 48, x: 18, y: 2


site_backHandler = Utils.throttle 0.5, (event, layer) ->
	if flow_site.current.name == "start page"
		flow_withoutTabBar.showPrevious()
		
		Utils.delay 0.5, =>
			for item in flow_site.children
				item.destroy()
				item = null
	else 
		flow_site.showPrevious(animate: false)


screen_site_actionbar_back.on(Events.Tap, site_backHandler)
screen_site.on(Events.SwipeRightEnd, site_backHandler)


screen_site_actionbar_home = new Layer
	name: "screen_site_actionbar_home"
	parent: screen_site_actionbar, size: 48, x: Align.right(-18), y: 2

screen_site_actionbar_home.onTap ->
	web_home_handler()




flow_site = new FlowComponent
	parent: screen_site
	width: screen.width
	height: screen.height - screen_site_header.height - screen_site_actionbar.height
	y: screen_site_header.height
	backgroundColor: "white"


createSitePage = (name = "inside page") ->
	page = new Layer
		name: "page"
		width: screen.width
		height: screen.height - screen_site_header.height - screen_site_actionbar.height
		backgroundColor: "white"
		opacity: 0.1
		name: name
	
	flow_site.showNext(page, animate: false)
	
	page_newNavigateButton = createButton("Переход на страницу #{flow_site.children.length}")
	page_newNavigateButton.parent = page
	page_newNavigateButton.color = Utils.randomColor()
	page_newNavigateButton.y = 120

	page_newNavigateButton.onTap ->
		flow_site.showNext(createSitePage())
	
	
	return page



decorateButton(screen_site_actionbar_back)
decorateButton(screen_site_header_back)
decorateButton(screen_site_actionbar_home)

# Settings

screen_settings = new Layer
	name: "screen_settings"
	parent: screen
	width: 390
	height: 844
	backgroundColor: "white"

screen_settings_header = new Layer
	name: "screen_settings_header"
	width: 390
	height: 100
	image: "images/settingsHeader.png"
	parent: screen_settings

screen_settings_header_back = new Layer
	name: "screen_settings_header_back"
	parent: screen_settings_header, height: 56, width: 56, y: 44, x: -8


settingsView_scroll = new ScrollComponent
	name: "settingsView_scroll"
	parent: screen_settings
	width: 390
	height: 844 - 100
	y: 100
	backgroundColor: "white"
	scrollVertical: true
	scrollHorizontal: false
	directionLock: true


getSettingsTitle = (title = "Дзен") ->
	settings_breaker1 = new TextLayer
		name: "settings_breaker1"
		name: "breaker"
		parent: settingsView_scroll.content
		fontSize: 24
		width: 390 - 20
		height: 40
		text: title
		fontWeight: "bold"
		x: Align.left(20)
		color: "black"
		contentInset:
			left: 20
			right: 80


getSettingsLine = (title = "Строчка") ->
	settings_zenArticleOpenTypeText = new TextLayer
		name: "settings_zenArticleOpenTypeText"
		parent: settingsView_scroll.content
		fontSize: 16
		width: 390 - 20
		height: 32
		text: title
		x: Align.left(20)
		color: "black"
		padding: 
			top: 6
		contentInset:
			left: 20
			right: 80

getSegmentedControl = (itemArray = ["On", "Off", "sd"], customWidth = 200) ->
	switchControl = new iOSSegmentedControl
		parent: settingsView_scroll.content
		x: Align.center
		y: Align.center -50
		tintColor: "#42B72A"
		width: customWidth
		items: itemArray
	
	switchControl.setSelected true, 0
	return switchControl


# tempLine = getSettingsLine("Области нажатий")
# tempLine.y += 80
# tempSegment = getSegmentedControl(["Да","Нет"], 100)
# tempSegment.y = tempLine.y + tempLine.height + 10
# tempSegment.x = tempLine.x

settings_showTips = new iOSSwitch
	parent: getSettingsLine("Области нажатий")
	point: Align.center
	isOn: isShowTips
	y: Align.center(0)
	x: Align.right(-40)

settings_showTips.parent.y = Align.top(40)
settings_showTips.onValueChange (value) ->
	isShowTips = !isShowTips
	checkDecoration()



# box = new TextLayer
	name: "# box"
# 	parent: settingsView_scroll.content
# 	text: "Зарепортить баг"
# 	html: "<button type='button' onclick='alert('Hello world!')'>Click Me!</button>"
# box.center()



# Handlers

# (buttonS = createButton("поиск")).y = 400
# (button0 = createButton("сайт")).y = buttonS.y + gapButton
# (button1 = createButton("статья дзена")).y = button0.y + gapButton
# (button2 = createButton("профиль дзена")).y = button1.y + gapButton


buttonOpenSearch = shortcutsScroll.content.children[2]

buttonOpenSearch.onTap ->
	flow_withoutTabBar.showNext(screen_search)
	clearBack(screen_search_header_back)
	screen_search_header_back.on(Events.Tap, flow_withoutTabBar_handler)
	clearBack(screen_search)
	screen_search.on(Events.SwipeRight, flow_withoutTabBar_handler)


buttonOpenSite = shortcutsScroll.content.children[0]

buttonOpenSite.onTap ->
	flow_withoutTabBar.showNext(screen_site)
	createSitePage("start page")
	clearBack(screen_site_header_back)
	screen_site_header_back.on(Events.Tap, flow_site_handler)
	screen_site.on(Events.SwipeRight, flow_site_handler)



buttonOpenArticle = new Layer
	name: "buttonOpenArticle"
	parent: screen_main_card
	width: 375
	height: screen_main_card.height - 60
	y: 60
	backgroundColor: "null"

buttonOpenArticle.onTap ->
	flow_withoutTabBar.showNext(screen_article)
	clearBack(screen_article_header_back)
	screen_article_header_back.on(Events.Tap, flow_withoutTabBar_handler)
	clearBack(screen_article)
	screen_article.on(Events.SwipeRight, flow_withoutTabBar_handler)
	

buttonOpenProfile = new Layer
	name: "buttonOpenProfile"
	width: 375
	height: 60
	x: 6
	y: 4
	backgroundColor: "null"
	parent: screen_main_card

buttonOpenProfile.onTap ->
	flow_withTabBar.showNext(screen_profile)
	clearBack(screen_profile_header_back)
	screen_profile_header_back.on(Events.Tap, flow_withTabBar_handler)
	clearBack(screen_profile)
	screen_profile.on(Events.SwipeRight, flow_withTabBar_handler)



# decorateButton(buttonOpenSearch)
# decorateButton(buttonOpenSite)
decorateButton(buttonOpenArticle)
decorateButton(buttonOpenProfile)




buttonOpenSettings = new Layer
	name: "buttonOpenSettings"
	parent: screen_main_header
	width: 120
	height: 80
	y: 42
	x: Align.center

buttonOpenSettings.onTap ->
	flow_withoutTabBar.showNext(screen_settings)
	clearBack(screen_settings_header_back)
	screen_settings_header_back.on(Events.Tap, flow_withoutTabBar_handler)
	clearBack(screen_settings)
	screen_settings.on(Events.SwipeRight, flow_withoutTabBar_handler)

decorateButton(buttonOpenSettings)
decorateButton(screen_settings_header_back)



# Seamless Exp

screen_seamless = new Layer
	name: "screen_seamless"
	parent: screen
	width: 375
	height: 812
	backgroundColor: "white"

screen_seamless_header = new Layer
	name: "screen_seamless_header"
	width: 375
	height: 100
# 	image: "images/settingsHeader.png"
	backgroundColor: "null"
	parent: screen_seamless

screen_seamless_header_back = new Layer
	name: "screen_seamless_header_back"
	parent: screen_seamless_header, height: 64, width: 60, y: 44

screen_seamless_header_search = new Layer
	name: "screen_seamless_header_search"
	parent: screen_seamless_header, height: 64, width: 246, y: 44, x: 60

screen_seamless_header_clear = new Layer
	name: "screen_seamless_header_clear"
	parent: screen_seamless_header
	width: 70, height: 64, x: Align.right(), y: 44
	image: "images/clear.png"

screen_seamless_header_clear.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
screen_seamless_header_clear.stateSwitch("hidden")

screen_seamless_header_title = new TextLayer
	name: "screen_seamless_header_title"
	parent: screen_seamless_header_search
	text: ""
	width: screen_seamless_header_search.width
	height: screen_seamless_header_search.height
	fontSize: 17
	color: "black"
	padding:
		top: 22
	custom:
		text: "клавиатура для айпада"

decorateButton(screen_seamless_header_back)
decorateButton(screen_seamless_header_search)
decorateButton(screen_seamless_header_clear)




seamlessView = new Layer
	name: "seamlessView"
	parent: screen_seamless
	width: 375
	height: 812
	image: "images/seamlessView.png"

seamlessView.sendToBack()


seamlessView_tabs = new Layer
	name: "seamlessView_tabs"
	parent: seamlessView
	width: 375
	height: 40
	image: "images/site%20tabs.png"
	y: 108

seamlessView_tabs.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
seamlessView_tabs.stateSwitch("hidden")



seamlessScroll = new ScrollComponent
	name: "seamlessScroll"
	parent: seamlessView
	width: 375
	height: seamlessView.height - 149
	y: 144
	scrollVertical: true
	scrollHorizontal: false
	contentInset: 
		top: 6


# dark pattern
seamlessScroll_trash = new ScrollComponent
	name: "seamlessScroll_trash"
	parent: seamlessView
	x: 3000
	width: 1
	opacity: 0



seamlessScroll_null = new Layer
	name: "seamlessScroll_null"
	parent: seamlessScroll.content
	width: 375
	height: 579
	image: "images/null%20suggest.png"

results1 = new Layer
	name: "results1"
	parent: seamlessScroll_trash.content
	width: 375
	height: 922
	image: "images/results1.jpg"

results2 = new Layer
	name: "results2"
	parent: seamlessScroll_trash.content
	width: 375
	height: 951
	image: "images/results2.jpg"

results3 = new Layer
	name: "results3"
	parent: seamlessScroll_trash.content
	width: 375
	height: 987
	image: "images/results3.jpg"

results4 = new Layer
	name: "results4"
	parent: seamlessScroll_trash.content
	width: 375
	height: 1557
	image: "images/results4.jpg"


# setContentForSeamlessScroll = (localLayer = seamlessScroll_null) ->
# 	for item in [seamlessScroll_null, seamlessScroll_items]
# 		if item == localLayer then item.parent = seamlessScroll.content
# 		else item.parent = seamlessScroll_trash.content
# 		
# 		seamlessScroll.updateContent()
# 
# setContentForSeamlessScroll()

# seamlessScroll.content.on "change:children", ->
# 	if @children.length == 1
# 		if @children[0] == seamlessScroll_null
# 			keyboard_suggest_null.stateSwitch("shown")
# 			keyboard_suggest_items.stateSwitch("hidden")
# 		else
# 			keyboard_suggest_null.stateSwitch("hidden")
# 			keyboard_suggest_items.stateSwitch("shown")

# Fake Keyboard


seamlessActionBar = new Layer
	name: "seamlessActionBar"
	parent: seamlessView
	width: 375
	height: 83
	y: Align.bottom
	image: "images/seamlessActionBar.png"



keyboardProxy = new Layer
	name: "keyboardProxy"
	opacity: 0	
	y: -3000

keyboardProxy.states =
	"shown": { opacity: 0 }
	"hidden": { opacity: 0 }
keyboardProxy.stateSwitch("hidden")

keyboardProxy.on Events.StateSwitchStart, (from, to) ->
	if to != from
		keyboard.animate(to)



keyboard = new Layer
	name: "keyboard"
	parent: seamlessView
	width: 375
	height: 378
	image: "images/fakeKeyboard.png"

keyboard.states =
	"shown": { y: seamlessView.height - keyboard.height }
	"hidden": { y: seamlessView.height + 16 }
keyboard.stateSwitch("hidden")



keyboard_clear = new Layer
	name: "keyboard_clear"
	parent: keyboard
	y: 195
	x: 325
	height: 55
	width: 51

decorateButton(keyboard_clear)


submitButton = new Layer
	name: "submitButton"
	parent: keyboard
	width: 88
	height: 43
	image: "images/submit.png"
	y: 257
	x: 285

submitButton.states =
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
submitButton.stateSwitch("hidden")

decorateButton(keyboard_clear)



keyboard_suggest_items = new ScrollComponent
	name: "keyboard_suggest_items"
	parent: keyboard
	width: 375
	height: 45
	y: 42
	backgroundColor: "#null"
	scrollVertical: false
	scrollHorizontal: false

fixColor = new Layer { size: 1, parent: keyboard_suggest_items.content }



keyboard_suggest_null = new Layer
	name: "keyboard_suggest_null"
	parent: keyboard
	width: 375
	height: 45
	y: 42
	image: "images/keyboard_suggest_null.png"

for item in [keyboard_suggest_null, keyboard_suggest_items]
	item.states =
		"hidden": { opacity: 0 }
		"shown": { opacity: 1 }
	if item is keyboard_suggest_null then item.stateSwitch("shown")
	else item.stateSwitch("hidden")



updateSuggest = (suggestData = []) ->
	for item in keyboard_suggest_items.content.children
		item.destroy()
	
	sumX = 0
	for textData in suggestData
		button = new TextLayer
			name: "button"
			parent: keyboard_suggest_items.content
			fontSize: 16
			backgroundColor: "white"
			color: "black"
			x: 6 + (sumX)
			y: 8
			borderRadius: 8
			text: textData
			padding: 
				top: 8
				right: 9
				bottom: 8
				left: 9
		
		sumX += (button.width + 8)
	
	keyboard_suggest_items.updateContent()



# Seamless Handlers

buttonOpenSeamless = shortcutsScroll.content.children[1]

buttonOpenSeamless.onTap ->
	startSeamlessSearch()


buttonOpenSeamless_fromInput = new Layer
	name: "buttonOpenSeamless_fromInput"
	parent: screen_main_header
	y: 122
	height: 68
	width: 375

buttonOpenSeamless_fromInput.onTap ->
	startSeamlessSearch()

decorateButton(buttonOpenSeamless_fromInput)





startSeamlessSearch = () ->
	flow_withoutTabBar.showNext(screen_seamless)
	createSitePage("start page")
	clearBack(screen_seamless_header_back)
	screen_seamless_header_back.on(Events.Tap, flow_site_handler)
	screen_seamless.on(Events.SwipeRight, flow_site_handler)
	
	screen_seamless_header_title.text = ""
	keyboard.stateSwitch("hidden")
	keyboardProxy.stateSwitch("hidden")
	keyboardProxy.stateSwitch("shown")
	seamlessScroll.scrollToPoint({ x: 0, y: 0 }, false)

nextButton = () ->
	refText = screen_seamless_header_title.custom.text
	screen_seamless_header_title.text +=
		refText.replace(screen_seamless_header_title.text,'').substring(0, 1)

prevButton = () ->
	screen_seamless_header_title.text =
		screen_seamless_header_title.text.substring(0, screen_seamless_header_title.text.length - 1)





screen_seamless_header_search.onTap ->
	keyboardProxy.stateSwitch("shown")

seamlessScroll.content.onDragStart ->
	keyboardProxy.stateSwitch("hidden")

submitButton.on Events.Tap, (event, layer) ->
	event.stopPropagation()
	keyboardProxy.stateSwitch("hidden")


Events.wrap(window).addEventListener "keydown", (event) ->
	if event.keyCode >= 65 and event.keyCode <= 90 then nextButton()
	else if event.keyCode == 8 then prevButton()

keyboard.onTap ->
	nextButton()

keyboard_clear.on Events.Tap, (event, layer) ->
	event.stopPropagation()
	prevButton()

screen_seamless_header_clear.onTap ->
	screen_seamless_header_title.text = ""


contentArray = [seamlessScroll_null, results1, results2, results3, results4]

screen_seamless_header_title.on "change:text", ->
	searchQuery(screen_seamless_header_title.text)
	
	if @text == ""
		keyboard_suggest_null.stateSwitch("shown")
		keyboard_suggest_items.stateSwitch("hidden")
		screen_seamless_header_clear.stateSwitch("hidden")
		seamlessView_tabs.stateSwitch("hidden")
		submitButton.stateSwitch("hidden")
	else
# 		setContentForSeamlessScroll(seamlessScroll_items)
		keyboard_suggest_null.stateSwitch("hidden")
		keyboard_suggest_items.stateSwitch("shown")
		screen_seamless_header_clear.stateSwitch("shown")
		seamlessView_tabs.stateSwitch("shown")
		submitButton.stateSwitch("shown")
	
	
	tl = screen_seamless_header_title.text.length
	if tl < 4
		for item in contentArray
			if item == contentArray[0]
				item.parent = seamlessScroll.content
			else item.parent = seamlessScroll_trash.content
	else if tl < 8
		for item in contentArray
			if item == contentArray[1]
				item.parent = seamlessScroll.content
			else item.parent = seamlessScroll_trash.content
	else if tl < 12
		for item in contentArray
			if item == contentArray[2]
				item.parent = seamlessScroll.content
			else item.parent = seamlessScroll_trash.content
	else if tl < 16
		for item in contentArray
			if item == contentArray[3]
				item.parent = seamlessScroll.content
			else item.parent = seamlessScroll_trash.content
	else
		for item in contentArray
			if item == contentArray[4]
				item.parent = seamlessScroll.content
			else item.parent = seamlessScroll_trash.content
		



tabBar = new Layer
	name: "tabBar"
	parent: screen_WithTabBar
	y: Align.bottom
	width: 375
	height: 83
	image: "images/tabBar.png"

tabBar.bringToFront()


item.sendToBack() for item in [screen_profile, screen_article, screen_search, screen_site, screen_settings, screen_seamless]

checkDecoration()

