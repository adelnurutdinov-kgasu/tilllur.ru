

{SVGLayer} = require 'SVGLayer'

retina = 1

Framer.Defaults.Animation =
	curve: Spring(damping: 1)
	time: 0.5

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


bookmarks_slide = new Layer
	width: 360*retina
	height: 640*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "rgba(51,51,51,1)"

phone_back = new Layer
	parent: bookmarks_slide
	width: 200*retina
	height: 356*retina
	x: 12*retina
	y: 247*retina
	image: "images/phone back.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(3px*" + retina + ") " + "rgba(0,0,0,0.5))"}

phone_back.states =
	"shown": { opacity: 1, x: 12*retina }
	"hidden": { opacity: 1, x: 76*retina }

background_screen = new Layer
	parent: bookmarks_slide
	width: 298*retina
	height: 120*retina
	x: 46*retina
	y: 38*retina
	image: "images/background screen.png"

# history

history_1 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 263*retina
	backgroundColor: "rgba(255,255,255,1)"

history_1.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_1.stateSwitch("base")

history_2 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 281*retina
	backgroundColor: "rgba(255,255,255,1)"

history_2.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_2.stateSwitch("base")

history_3 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 299*retina
	backgroundColor: "rgba(255,255,255,1)"

history_3.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_3.stateSwitch("base")

history_4 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 317*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.9

history_4.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_4.stateSwitch("base")

history_5 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 335*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.8

history_5.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_5.stateSwitch("base")

history_6 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 353*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.7

history_6.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_6.stateSwitch("base")

history_7 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 371*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.6

history_7.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_7.stateSwitch("base")

history_8 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 389*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.5

history_8.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_8.stateSwitch("base")

history_9 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 407*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.4

history_9.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_9.stateSwitch("base")

history_10 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 425*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.3

history_10.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_10.stateSwitch("base")

history_11 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 443*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.2

history_11.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_11.stateSwitch("base")

history_12 = new Layer
	width: 128.0*retina
	height: 10*retina
	y: 461*retina
	backgroundColor: "rgba(255,255,255,1)"
	opacity: 0.1

history_12.states =
	"base":
		x: 28*retina
	"imported":
		x: 116*retina

history_12.stateSwitch("base")


historyArray = [history_1, history_2, history_3, history_4, history_5, history_6, history_7, history_8, history_9, history_10, history_11, history_12]
for item in historyArray
	item.parent = bookmarks_slide

phone = new Layer
	parent: bookmarks_slide
	width: 212*retina
	height: 366*retina
	x: 138*retina
	y: 204*retina
	image: "images/phone.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(1px*" + retina + ") calc(3px*" + retina + ") " + "rgba(0,0,0,0.5))"}

phone.states =
	"center": { x: 70*retina }


progress_view = new Layer
	parent: phone
	width: 100*retina
	height: 100*retina
	x: 54*retina
	y: 100*retina
	image: "images/progress view.png"

progress_view.states = 
	"small": { scale: 0.4 }
	"base": { scale: 1 }
progress_view.stateSwitch("small")

history_icon = new Layer
	parent: progress_view
	width: 50*retina
	height: 50*retina
	x: 25*retina
	y: 27*retina
	image: "images/history icon.png"
	opacity: 0.7

history_icon.states = 
	"hidden": { opacity: 0, scale: 0 }
	"shown": { opacity: 1, scale: 1 }
history_icon.stateSwitch("hidden")


tick = new Layer
	parent: progress_view
	width: 52*retina
	height: 48*retina
	x: 24*retina
	y: 28*retina
	image: "images/tick.png"

tick.states = 
	"hidden": { opacity: 0, scale: 0 }
	"shown": { opacity: 1, scale: 1 }
tick.stateSwitch("hidden")



history_path = new SVGLayer
	parent: progress_view
	x: 5*retina
	y: 6*retina
	strokeWidth: 4*4
	width: 352
	height: 352
	originX: 0
	originY: 0
	scale: 0.25
	path: '<path d="M176,352 C273.202116,352 352,273.202116 352,176 C352,78.797884 273.202116,0 176,0 C78.797884,0 0,78.797884 0,176 C0,273.202116 78.797884,352 176,352 Z"></path>'
	dashOffset: 0
	stroke: "#FDD94C"


bookmarksAnimationTime = 1

startBookmarksAnimation = () ->
	bookmarksAnimationTime = 3
	for item, i in historyArray
		item.animate("imported", options: { delay: 0.1 * i, time: bookmarksAnimationTime / 2, curve: "ease-in-out"})
	
	phone_back.animate("hidden", options: { delay: bookmarksAnimationTime / 2, time: bookmarksAnimationTime / 3})
	phone.animate("center", options: { delay: bookmarksAnimationTime / 2, time: bookmarksAnimationTime / 3})
	progress_view.animate("base", options: { delay: bookmarksAnimationTime / 2})
# 	history_path.animate(dashOffset: -1, options: { time: bookmarksAnimationTime / 2, delay: bookmarksAnimationTime / 2 })
	history_icon.animate("shown", options: { time: bookmarksAnimationTime / 5, delay: bookmarksAnimationTime / 2})

animateImportBookmarks = (event, layer) ->
	button_import.off(Events.Click, animateImportBookmarks)
	history_path.animate(dashOffset: -1, options: { time: bookmarksAnimationTime / 2 })
	tick.animate("shown", delay: bookmarksAnimationTime / 2, time: bookmarksAnimationTime / 5 )
	history_icon.opacity = 0
	
	button_importing.stateSwitch("shown")
	button_continue.stateSwitch("shown", delay: bookmarksAnimationTime / 2 + bookmarksAnimationTime / 5)

startBookmarksAnimation()


# addons
bookmarks_buttons = new Layer
	width: 360*retina
	height: 113*retina
	x: 0*retina
	y: 479*retina
	image: "images/bookmarks buttons.png"
	style: {"-webkit-filter": "drop-shadow(0 calc(4px*" + retina + ") calc(8px*" + retina + ") " + "rgba(0,0,0,0.5))"}

button_import = new Layer
	parent: bookmarks_buttons
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 12*retina
	image: "images/button import.png"

button_skip = new Layer
	parent: bookmarks_buttons
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 61*retina
	image: "images/button skip.png"

button_importing = new Layer
	parent: bookmarks_buttons
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 12*retina
	image: "images/button importing.png"

button_importing.states = 
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
button_importing.stateSwitch("hidden")

button_continue = new Layer
	parent: bookmarks_buttons
	width: 336*retina
	height: 40*retina
	x: 12*retina
	y: 61*retina
	image: "images/button continue.png"

button_continue.states = 
	"shown": { opacity: 1 }
	"hidden": { opacity: 0 }
button_continue.stateSwitch("hidden")





status_bar = new Layer
	width: 360*retina
	height: 32*retina
	backgroundColor: "333"

navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

button_import.on(Events.Click, animateImportBookmarks)

for item in [bookmarks_slide, bookmarks_buttons, status_bar, navbar]
	item.parent = screen