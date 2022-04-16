{AudioPlayer} = require "audio"
audio = new AudioPlayer audio: "images/audio.mp3"

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

temp = new Layer
	parent: screen
	width: 375 * 2, height: 667 * 2, backgroundColor: "000", scale: 0.5
	originX: 0, originY: 0

# view
screen_bg = new Layer width: 748, height: 1334, x: 0, y: 0, backgroundColor: "rgba(246,246,246,1)"

post_bg = new Layer width: 750, x: 0, backgroundColor: "rgba(246,246,246,1)"

post_bg.states.add {
	event_locked_album: { height: 836, y: 328}
	event_unlocked_album: { height: 994, y: 128}
}
post_bg.states.switchInstant "event_locked_album"

post_general = new Layer width: 650, height: 152, x: 50, image: "images/post general.png"

post_general.states.add {
	event_locked_album: { y: 544, opacity: 0.0}
	event_unlocked_album: { y: 924, opacity: 1}
}
post_general.states.switchInstant "event_locked_album"

card = new Layer image: "images/card.png"

card.states.add {
	event_locked_album: { width: 710, height: 710, x: 20, y: 368}
	event_unlocked_album: { width: 496, height: 496, x: 126, y: 234}
}
card.states.switchInstant "event_locked_album"

post_next = new Layer width: 910, height: 590, x: -80, image: "images/post next.png"

post_next.states.add {
	event_locked_album: { y: 1164}
	event_unlocked_album: { y: 1122}
}
post_next.states.switchInstant "event_locked_album"

bottom_bar_base = new Layer width: 750, height: 98, x: 0, y: 1238, image: "images/bottom bar base.png"

bottom_bar_base.states.add {
	event_locked_album: { opacity: 1}
	event_unlocked_album: { opacity: 0}
}
bottom_bar_base.states.switchInstant "event_locked_album"

shadow = new Layer shadowColor: "rgba(0,0,0,0.12310348731884058)", opacity: 0

shadow.states.add {
	event_locked_album: { width: 280, height: 280, x: 236, y: 438, shadowY: 4, shadowBlur: 20}
	event_unlocked_album: { width: 710, height: 710, x: 20, y: 170, shadowY: 10, shadowBlur: 50}
}
shadow.states.switchInstant "event_locked_album"

album_artwork = new Layer image: "images/album artwork.png"

album_artwork.states.add {
	event_locked_album: { width: 280, height: 280, x: 236, y: 438}
	event_unlocked_album: { width: 710, height: 710, x: 20, y: 170}
}
album_artwork.states.switchInstant "event_locked_album"

bottom_bar_updated = new Layer width: 750, height: 98, x: 0, y: 1238, image: "images/bottom bar updated.png"

bottom_bar_updated.states.add {
	event_locked_album: { opacity: 0}
	event_unlocked_album: { opacity: 1}
}
bottom_bar_updated.states.switchInstant "event_locked_album"

artwork_overlay = new Layer backgroundColor: "rgba(255,255,255,0.4983016304347826)"

artwork_overlay.states.add {
	event_locked_album: { width: 280, height: 280, x: 236, y: 438, opacity: 1}
	event_unlocked_album: { width: 710, height: 710, x: 20, y: 170, opacity: 0.0}
}
artwork_overlay.states.switchInstant "event_locked_album"

lock_icon = new Layer width: 94, height: 120, x: 328, y: 510, image: "images/lock icon.png"

lock_icon.states.add {
	event_locked_album: { opacity: 0.7}
	event_unlocked_album: { opacity: 0}
}
lock_icon.states.switchInstant "event_locked_album"

follow_bar = new Layer width: 750, height: 200, x: 0, image: "images/follow bar.png"

follow_bar.states.add {
	event_locked_album: { y: 128}
	event_unlocked_album: { y: -72}
}
follow_bar.states.switchInstant "event_locked_album"

nav_bar = new Layer width: 750, height: 128, x: 0, y: 0, image: "images/nav bar.png"


# model
cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["event_locked_album", "event_unlocked_album"]
items = [screen_bg, post_bg, post_general, card, post_next, bottom_bar_base, shadow, album_artwork, bottom_bar_updated, artwork_overlay, lock_icon, follow_bar, nav_bar]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()



# hand written code

artwork_overlay.placeBefore(cycleButton)
lock_icon.placeBefore(artwork_overlay)
shake_delay = 0.3

liked_state = new Layer width: 70, height: 62, x: 436, y: 976, image: "images/liked state.png", opacity: 0


liked_state.on Events.Click, ->
	artwork_overlay.off(Events.Click, shakeHandler)
	liked_state.opacity = 1
	
	lock_icon.animate
			properties: 
				scale: 1.4
			time: shake_delay
			curve: "spring(300, 10, 0)"
		
	Utils.delay shake_delay, ->
		lock_icon.opacity = 0
		lock_icon.scale = 1
	
	Utils.delay shake_delay, ->
		liked_state.opacity = 0
		nextState = "event_unlocked_album"
# 		audio.player.play()
		
		
		for item in items
			if nextState == "event_unlocked_album" and item == post_general
				item.states.switch(nextState, delay: shake_delay/2, curve: "spring(100, 20, 1)")
			else if nextState == "event_unlocked_album" and item == post_next
				;
			else if nextState == "event_unlocked_album" and item == lock_icon
				;
			else
				try
					item.states.switch(nextState, curve: "spring(100, 20, 1)")
				catch error


cycleButton.on Events.Click, ->
	artwork_overlay.on(Events.Click, shakeHandler)
	lock_icon.scale = 1
# 	audio.player.pause()
	
	nextState = "event_locked_album"
	for item in items
		try
			item.states.switch(nextState, curve: "spring(100, 20, 1)")
		catch error



artwork_array = [artwork_overlay, album_artwork, lock_icon]

shakeHandler = (event, layer) ->
	for item in artwork_array
		item.animate
			properties:
				x: item.x - 60
			time: shake_delay
		
	Utils.delay shake_delay, ->
		for item in artwork_array
			item.animate
				properties:
					x: item.x + 100
				time: shake_delay / 2
				
	Utils.delay shake_delay + shake_delay/2, ->
		for item in artwork_array
			item.animate
				properties:
					x: item.x - 40
				time: shake_delay / 4


artwork_overlay.on(Events.Click, shakeHandler)


# artwork_overlay.on Events.Click, ->
# 	for item in artwork_array
# 		item.animate
# 			properties:
# 				x: item.x - 60
# 			time: shake_delay
# 		
# 	Utils.delay shake_delay, ->
# 		for item in artwork_array
# 			item.animate
# 				properties:
# 					x: item.x + 100
# 				time: shake_delay / 2
# 				
# 	Utils.delay shake_delay + shake_delay/2, ->
# 		for item in artwork_array
# 			item.animate
# 				properties:
# 					x: item.x - 40
# 				time: shake_delay / 4


for item in [audio, screen_bg, post_bg, post_general, card, post_next, bottom_bar_base, shadow, album_artwork, bottom_bar_updated, follow_bar, nav_bar, cycleButton, artwork_overlay, lock_icon, liked_state]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(243,247,249,1)"