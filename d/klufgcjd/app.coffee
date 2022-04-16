# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Nurutdinov Timur"
	twitter: ""
	description: ""


screen = new Layer
	width: 320, height: 568, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

temp = new Layer
	parent: screen, width: screen * 2, height: screen * 2
	scale: 0.5, originX: 0, originY: 0


detailedAlbumView = new Layer
	width: 640
	height: 1136

album_global_bg = new Layer width: 1138, height: 1138, x: -(1138-640)/2, y: 0, image: "images/albums/1.jpg", parent: detailedAlbumView

blur = new Layer
	width: 640
	height: 1136
	parent: detailedAlbumView
	backgroundColor: 'rgba(0, 0, 0, 0.6)'
blur.style =
	'-webkit-backdrop-filter': 'blur(10px)'

album_detailed_bg = new Layer width: 640, height: 308, x: 0, y: 0, backgroundColor: "rgba(238,238,238,1)", parent: detailedAlbumView, clip: true

image_small = new Layer width: 640, height: 640, x: 0, y: 0, image: "images/albums/1.jpg", parent: album_detailed_bg

image_darker = new Layer width: 640, height: 640, x: 0, y: 0, parent: album_detailed_bg, backgroundColor: "rgba(0,0,0,0.5)"

content = new Layer width: 640, height: 1194, x: 0, y: 326, image: "images/content.png", parent: detailedAlbumView

scrollSongs = ScrollComponent.wrap(content)
scrollSongs.scrollHorizontal = false

scrollSongs.on Events.Scroll, ->
# 	print scrollSongs.content.y



player = new Layer width: 720, height: 340, x: -40, y: 956, image: "images/player.png"

for item in [detailedAlbumView, scrollSongs, player]
	item.parent = temp
