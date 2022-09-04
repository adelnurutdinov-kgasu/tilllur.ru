
screen = new Layer
	width: 375, height: 667, backgroundColor: "black"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

tempView = new Layer
	parent: screen, width: screen.width * 2, height: screen.height * 2
	scale: 0.5, originX: 0, originY: 0, backgroundColor: "black"


logCounter = 0

tightCurve = "spring(200, 20, 0)"
buttonAppearDelay = 0.2

yandex_bg = new Layer width: 750, height: 1334, x: 0, y: 0, image: "images/yandex bg.png"
darker = new Layer width: 750, height: 1334, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.4)"

# Scroll
scrollView = null
createScroll = () ->
# 	print scrollView
	if scrollView != null
		return scrollView
	else
		scrollView = new PageComponent
			width: 375*2
			height: 410*2
			y: 141*2
			scrollVertical: false
		
		blankPageLeft = new Layer
			width: 64*2
			height: 820
			parent: scrollView.content
			backgroundColor: "null"
		
		for item, i in [0, 1, 2, 3, 4]
			if i == 1
				site_in_tab = new Layer width: 494, height: 820, image: "images/site in tab.png", x: (247+8)*2 + 64*2, parent: scrollView.content
				site_in_tab.on Events.Click, (event, layer) ->
					if scrollView.currentPage is layer
						createTab("tabs")
			else
				siteItem = new Layer
					width: 247*2
					height: 410*2
					x: i*(247+8)*2 + 64*2
					name: "#{i}"
					backgroundColor: "white"
					parent: scrollView.content
					borderRadius: 4*2
		
		blankPageRight = new Layer
			width: 64*2
			height: 820
			x: 5*(247+8)*2 + 64*2
			parent: scrollView.content
			backgroundColor: "null"
		
		
		scrollView.snapToPage(
			site_in_tab
			false
			animationOptions = curve: "ease", time: 2
		)
createScroll()

# Tab
site_mask = null
site_1 = null
flag = true

tabHandler = (event, layer) ->
	localParent = layer.parent
	nextState = ""
	if flag then nextState = "tabs"	
	else nextState = "site"	
	flag = !flag
		
	for item in [layer, localParent]
		item.states.switch(nextState, curve: tightCurve)
	
	Utils.delay 0.5, ->
		if localParent.states.current.name is "tabs"
			localParent.destroy()


createTab = (startStateName) ->
	if startStateName is "site" then flag = true
	else flag = false
	
	site_mask = new Layer
		parent: tempView
		backgroundColor: "rgba(0,0,0,1)", clip: true
	
	site_mask.states.add {
		site: { width: 750, height: 1294, x: 0, y: 40, borderRadius: 0}
		tabs: { width: 494, height: 820, x: 128, y: 282, borderRadius: 8}
	}
	site_mask.states.switchInstant startStateName


	site_1 = new Layer x: 0, y: 0, image: "images/site 1.png", parent: site_mask
	site_1.states.add {
		site: { width: 750, height: 1294}
		tabs: { width: 494, height: 852}
	}
	site_1.states.switchInstant startStateName
	
	
	site_1.on Events.Click, (event, layer) ->
		tabHandler(event, layer)
	
	if startStateName is "tabs"
		tabHandler(null, site_1)
createTab("site")

tab_name = new Layer width: 310, height: 30, x: 220, y: 210, image: "images/tab name.png"

tab_name.states.add {
	site: { opacity: 0.0}
	tabs: { opacity: 1}
}
tab_name.states.switchInstant "site"

close_tab = new Layer width: 24, height: 24, x: 574, y: 210, image: "images/close tab.png"

close_tab.states.add {
	site: { opacity: 0.0}
	tabs: { opacity: 1}
}
close_tab.states.switchInstant "site"

tabs_buttons = new Layer width: 654, height: 1214, x: 48, y: 78, image: "images/tabs buttons.png", parent: darker, opacity: 1


# Status Bar Views
status_bar_bg = new Layer width: 750, height: 40, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1)"
status_bar_bg.states.add {
	site: { opacity: 1}
	tabs: { opacity: 0.0}
}
status_bar_bg.states.switchInstant "site"

status_bar = new Layer width: 728, height: 24, x: 12, y: 10, image: "images/status bar.png"


tabsItems = [site_mask, site_1, status_bar_bg, tab_name, close_tab]

status_bar.opacity = 0

for item in [yandex_bg, darker, scrollView, site_mask, tab_name, close_tab, status_bar_bg, status_bar]
	item.parent = tempView
	item.bringToFront()
