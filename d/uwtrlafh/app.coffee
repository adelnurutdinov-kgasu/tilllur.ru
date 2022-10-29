Screen.backgroundColor = "222"


figmaView = new Layer
	width: 360
	height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: figmaView, borderRadius: 16, forceAndroidBar: true }



pages = new PageComponent
	width: 360
	height: 640 - 180
	parent: figmaView
	y: 180
	scrollVertical: false




content1 = new Layer
	parent: pages.content
	width: 360
	height: 460
	image: "images/content1.png"

content2 = new Layer
	parent: pages.content
	width: 360
	height: 460
	x: 360
	image: "images/content2.png"

header = new Layer
	parent: figmaView
	width: 360
	height: 180
	image: "images/header.png"



bottomBar = new Layer
	width: 360
	height: 56
	image: "images/bottomBar.png"
	parent: figmaView
	y: Align.bottom()


# titles

headerView = new Layer
	parent: header
	y: 24
	backgroundColor: null

fix = new Layer
	height: 100
	y: 52
	width: 360
	backgroundColor: "white"
	parent: headerView

fixLogo = new Layer
	size: 60
	parent: headerView
	x: 150
	y: -2
	backgroundColor: "white"
# 	opacity: 0.5

titleYandex = new Layer
	name: "titleYandex"
	parent: header
	y: 48
	width: 62
	height: 48
	image: "images/figma/titleYandex.png"

titleYandex.states =
	"yandex":
		x: 149
		opacity: 1
	"video":
		x: 71
		opacity: 0.3


titleVideo = new Layer
	name: "titleVideo"
	parent: header
	y: 48
	width: 54
	height: 48
	image: "images/figma/titleVideo.png"

titleVideo.states =
	"yandex":
		x: 231
		opacity: 0.3
	"video":
		x: 153
		opacity: 1


titleMarket = new Layer
	name: "titleMarket"
	parent: header
	y: 48
	width: 65
	height: 48
	opacity: 1
	image: "images/figma/titleMarket.png"

titleMarket.states =
	"yandex":
		x: 305
	"video":
		x: 227


for item in [titleYandex, titleVideo, titleMarket]
	item.parent = headerView
	item.stateSwitch("yandex")

# omni


search = new Layer
	parent: headerView
	width: 360
	height: 56
	image: "images/search.png"
	y: 96

searchMarket = new Layer
	parent: headerView
	width: 360
	height: 56
	image: "images/searchMarket.png"
	y: 96

for item in [search, searchMarket]
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	if item == search then item.stateSwitch("shown") else item.stateSwitch("hidden")




#


iconVideo = new Layer
	width: 44
	height: 44
	image: "images/iconVideo.png"

iconYandex = new Layer
	width: 44
	height: 44
	image: "images/iconYandex.png"

# iconMarket = new Layer
# 	width: 44
# 	height: 44
# 	image: "images/iconMarket.png"

for item in [iconYandex, iconVideo]
	item.parent = header
	item.y = 28
	item.x = Align.center()
	
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0 }
	if item == iconYandex then item.stateSwitch("shown") else item.stateSwitch("hidden")
	
	
statusBar = new Layer
	parent: figmaView
	width: 360
	height: 24
	backgroundColor: "white"


figmaView.backgroundColor = "#F5F6F8"
figmaView.borderRadius = 12

content1.originY = 0.7
content2.originY = 0.7

search.originY = 0.2
searchMarket.originY = 0.2

gap = 180
toFeedGap = [0, 360]


pages.content.on "change:x", ->
	v = pages.scrollX
# 	print v
	
	if v < gap
		header.borderRadius = Utils.modulate(v, [gap/4, 0], [24, 0], true)
	else
		header.borderRadius = Utils.modulate(v, [360 - gap/4, 360], [24, 0], true)
	
	search.scale = Utils.modulate(v, [gap, 0], [0.98, 1], true)
	iconYandex.scale = Utils.modulate(v, [gap, 0], [0.9, 1], true)
	
	searchMarket.scale = Utils.modulate(v, [360 - gap, 360], [0.98, 1], true)
	iconVideo.scale = Utils.modulate(v, [360 - gap, 360], [0.9, 1], true)
	
	content1.scale = Utils.modulate(v, [gap, 0], [0.92, 1], true)
	content1.borderRadius = Utils.modulate(v, [gap/2, 0], [24, 0], true)
	
	content2.scale = Utils.modulate(v, [gap, 360], [0.92, 1], true)
	content2.borderRadius = Utils.modulate(v, [360 - gap/2, 360], [24, 0], true)
	
	
	
	[s1, s2] = ["yandex", "video"]
	l[d] = Utils.modulate(v, g, [l.states[s1][d], l.states[s2][d]],
		true) for [l, d, g] in [[titleYandex, "x", toFeedGap],
								[titleYandex, "opacity", toFeedGap],
								[titleVideo, "x", toFeedGap],
								[titleVideo, "opacity", toFeedGap],
								[titleMarket, "x", toFeedGap],
	]



pages.on "change:currentPage", ->
	if pages.currentPage == content2
		search.animate("hidden", time: 0.2)
		iconYandex.animate("hidden", time: 0.2)
		searchMarket.animate("shown", time: 0.2)
		iconVideo.animate("shown", time: 0.2)
		
	else
		search.animate("shown", time: 0.2)
		iconYandex.animate("shown", time: 0.2)
		searchMarket.animate("hidden", time: 0.2)
		iconVideo.animate("hidden", time: 0.2)

# figmaView.scale = 1.6