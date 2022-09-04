
retina = 1

screen = new Layer
	width: 360, height: 640, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

bg = new Layer width: 360*retina, height: 640*retina, backgroundColor: "rgba(102,102,102,1)"




# status_bar = new Layer width: 360*retina, height: 24*retina, x: 0*retina, y: 0*retina, image: "images/status bar.png"

navbar = new Layer width: 360*retina, height: 48*retina, x: 0*retina, y: 592*retina, image: "images/navbar.png"

filters = new Layer width: 360*retina, height: 86*retina, x: 0*retina, y: 494*retina, image: "images/filters.png"


# compose card bg
card_bg = new Layer width: 344*retina, x: 8*retina, borderRadius: 4*retina, shadowColor: "rgba(0,0,0,0.396682518115942)", borderColor: "rgba(79,79,79,1)"

card_bg.states.add {
	create_post_general: { height: 344*retina, y: 112*retina, backgroundColor: "rgba(115,115,115,1)", shadowY: 0*retina, shadowBlur: 0*retina, borderWidth: 1*retina}
	create_post_text: { height: 95*retina, y: 96*retina, backgroundColor: "rgba(255,255,255,1)", shadowY: 10*retina, shadowBlur: 30*retina, borderWidth: 0*retina}
	create_post_image: { height: 355*retina, y: 96*retina, backgroundColor: "rgba(158,77,56,1)", shadowY: 10*retina, shadowBlur: 30*retina, borderWidth: 0*retina}
	create_post_song: { height: 403*retina, y: 60*retina, backgroundColor: "rgba(0,0,0,1)", shadowY: 10*retina, shadowBlur: 30*retina, borderWidth: 0*retina}
}
card_bg.states.switchInstant "create_post_general"

image = new Layer width: 344*retina, height: 260*retina, x: 8*retina, y: 96*retina, backgroundColor: "rgba(216,216,216,1)", opacity: 0, clip: true

image_photo = new Layer width: 344*retina, height: 260*retina, image: "images/image.png", parent: image

song = new Layer width: 310*retina, height: 56*retina, x: 24*retina, y: 383*retina, image: "images/song.png", opacity: 0

text_empty = new Layer width: 171*retina, height: 61*retina, x: 94*retina, y: 255*retina, image: "images/Group 3.png"

app_bar = new Layer width: 14*retina, height: 14*retina, x: 21*retina, y: 45*retina, image: "images/app bar.png"

share = new Layer width: 132*retina, height: 21*retina, x: 211*retina, y: 43*retina, image: "images/share.png", opacity: 0.5

text_dark = new Layer width: 301*retina, height: 56*retina, x: 24*retina, y: 115*retina, image: "images/text dark.png", opacity: 0

text_white = new Layer width: 301*retina, height: 56*retina, x: 24*retina, y: 115*retina, image: "images/text white.png", opacity: 0


selected_filter_text = new Layer width: 136*retina, height: 88*retina, x: -4*retina, y: 494*retina, image: "images/selected filter text.png"

selected_filter_image = new Layer width: 144*retina, height: 88*retina, x: 108*retina, y: 494*retina, image: "images/selected filter image.png"

selected_filter_song = new Layer width: 136*retina, height: 88*retina, x: 228*retina, y: 494*retina, image: "images/selected filter song.png"

for item in [selected_filter_text, selected_filter_image, selected_filter_song]
	item.scale = 0.5
	item.opacity = 0



text_text = new Layer width: 38*retina, height: 11*retina, x: 45*retina, y: 567*retina, image: "images/text text.png"

text_image = new Layer width: 91*retina, height: 14*retina, x: 135*retina, y: 566*retina, image: "images/text image.png"

text_song = new Layer width: 32*retina, height: 13*retina, x: 280*retina, y: 567*retina, image: "images/text song.png"

for item in [text_text, text_image, text_song]
	item.opacity = 0



app_bar_hover = new Layer width: 368*retina, height: 92*retina, x: -4*retina, y: -4*retina, 
image: "images/app bar hover.png", opacity: 0





springCurve = "spring(300, 40, 1)"
stateTime = 0.4

flag = -2
screen.on Events.Click, ->
	flag++
	
	if flag == -1
		bg.animate
			properties: y: 0*retina, opacity: 1
			time: 0.375
			curve: "cubic-bezier(0.0, 0.0, 0.2, 1)"
	
	else if flag == 0
		card_bg.states.switch("create_post_text", curve: springCurve, time: stateTime)
		share.opacity = 1
		
		text_empty.animate
			properties: opacity: 0
			time: stateTime/2
		
		text_dark.animate
			properties: opacity: 1
			time: stateTime / 2
			delay: stateTime
		
		selected_filter_text.animate
			properties: scale: 1, opacity: 1
			curve: "spring(300, 20, 1)"
			delay: stateTime / 2
		
		text_text.animate
			properties: opacity: 1
			delay: stateTime
	
	else if flag == 1
		card_bg.states.switch("create_post_image", curve: springCurve, time: stateTime)
		
		text_dark.animate
			properties: y: 372*retina, opacity: 0
			time: stateTime
		
		text_white.animate
			properties: y: 372*retina, opacity: 1
			time: stateTime
		
		image.animate
			properties: opacity: 1
			time: 0.2
			delay: stateTime
		
		selected_filter_image.animate
			properties: scale: 1, opacity: 1
			curve: "spring(300, 20, 1)"
			delay: stateTime / 2
		
		text_image.animate
			properties: opacity: 1
			delay: stateTime
	
	else if flag == 2
		card_bg.states.switch("create_post_song", curve: springCurve, time: stateTime)
		
		text_white.animate
			properties: y: 296*retina
			time: stateTime
		
		song.animate
			properties: opacity: 1
			time: stateTime / 2
			delay: stateTime
		
		image.animate
			properties: y: 60*retina, height: 220*retina
			time: stateTime
			
		app_bar_hover.animate
			properties: opacity: 1
			time: stateTime
		
		selected_filter_song.animate
			properties: scale: 1, opacity: 1
			curve: "spring(300, 20, 1)"
			delay: stateTime / 2
		
		text_song.animate
			properties: opacity: 1
			delay: stateTime

childrenLayers = [app_bar_hover, text_song, text_image, text_text, selected_filter_song, selected_filter_image, selected_filter_text, text_white, text_dark, share, app_bar, text_empty, song, image, card_bg, filters]

for item in childrenLayers.reverse()
	item.parent = bg
	

bg.y = 640*retina
bg.x = -1*retina
bg.opacity = 1

# Utils.delay 2, ->
# 	bg.animate
# 		properties: y: 0*retina, opacity: 1
# 		time: 0.375
# 		curve: "cubic-bezier(0.0, 0.0, 0.2, 1)"

video = new VideoLayer
	x: -1*retina
	width: 360*retina
	height: 640*retina
	video: "images/video.mov"

video.placeBehind(bg)

for item in [video, bg, navbar]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 30, backgroundColor: "black"