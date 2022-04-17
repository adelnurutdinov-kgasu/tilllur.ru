
screen = new Layer
	width: 360, height: 640, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }



retina = 1

# view
screen_bg = new Layer width: 360*retina, height: 640*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(102,102,102,1)"

shadow = new Layer backgroundColor: "rgba(216,216,216,1)", shadowY: 20*retina, shadowBlur: 50*retina, shadowColor: "rgba(0,0,0,0.396682518115942)"

shadow.states.add {
	album: { width: 296*retina, height: 296*retina, x: 32*retina, y: 126*retina}
	album_news: { width: 360*retina, height: 360*retina, x: 0*retina, y: 0*retina}
}
shadow.states.switchInstant "album"

image = new Layer image: "images/image.png"

image.states.add {
	album: { width: 296*retina, height: 296*retina, x: 32*retina, y: 126*retina}
	album_news: { width: 360*retina, height: 360*retina, x: 0*retina, y: 0*retina}
}
image.states.switchInstant "album"

album_followers = new Layer image: "images/album followers.png"

album_followers.states.add {
	album: { width: 296*retina, height: 160*retina, x: 32*retina, y: 262*retina, opacity: 1}
	album_news: { width: 360*retina, height: 195*retina, x: 0*retina, y: 165*retina, opacity: 0.0}
}
album_followers.states.switchInstant "album"

navigation_base = new Layer width: 323*retina, height: 20*retina, x: 18*retina, y: 42*retina, image: "images/navigation base.png"

navigation_base.states.add {
	album: { opacity: 1}
	album_news: { opacity: 0.0}
}
navigation_base.states.switchInstant "album"

album_title = new Layer width: 112*retina, height: 37*retina, x: 124*retina, y: 65*retina, image: "images/album title.png"

album_title.states.add {
	album: { opacity: 1}
	album_news: { opacity: 0.0}
}
album_title.states.switchInstant "album"

app_bar_next = new Layer width: 368*retina, height: 92*retina, x: -4*retina, image: "images/app bar next.png"

app_bar_next.states.add {
	album: { y: -60*retina}
	album_news: { y: -4*retina}
}
app_bar_next.states.switchInstant "album"

tabs = new Layer width: 368*retina, height: 60*retina, x: -4*retina, y: 308*retina, image: "images/tabs.png"

tabs.states.add {
	album: { opacity: 0}
	album_news: { opacity: 1}
}
tabs.states.switchInstant "album"

ops_1 = new Layer width: 348*retina, height: 189*retina, x: 6*retina, image: "images/ops 1.png"

ops_1.states.add {
	album: { y: 384*retina, opacity: 0.0}
	album_news: { y: 374*retina, opacity: 1}
}
ops_1.states.switchInstant "album"

ops_2 = new Layer width: 348*retina, height: 80*retina, x: 6*retina, image: "images/ops 2.png"

ops_2.states.add {
	album: { y: 595*retina, opacity: 0.0}
	album_news: { y: 565*retina, opacity: 1}
}
ops_2.states.switchInstant "album"

card_stats = new Layer width: 356*retina, height: 266*retina, x: 2*retina, image: "images/card stats.png"

card_stats.states.add {
	album: { y: 434*retina, opacity: 1}
	album_news: { y: 474*retina, opacity: 0.0}
}
card_stats.states.switchInstant "album"

navbar = new Layer width: 360*retina, height: 48*retina, x: 0*retina, y: 592*retina, image: "images/navbar.png"

status_bar = new Layer width: 360*retina, height: 24*retina, x: 0*retina, y: 0*retina, image: "images/status bar.png"


# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["album", "album_news"]
items = [screen_bg, shadow, image, album_followers, navigation_base, album_title, app_bar_next, tabs, ops_1, ops_2, card_stats, navbar, status_bar]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()

screen.on Events.Click, ->
	nextState = cycler()
	for item in items
		
		if nextState == "album_news"
			if item == album_followers
				item.opacity = 0
			else if item == album_title
				item.opacity = 0
			else if item == card_stats
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			else if item == ops_1 or item == ops_2
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.3)
			else if item == tabs
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.3)
			else
				try item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
				catch error
		
		else 
			if item == ops_1 or item == ops_2
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
			else if item == tabs
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.1)
			else if item == card_stats
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.4)
			else if item == album_followers or item == album_title
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.5)
			else
				try
					item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.3)
				catch error

for item in items
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 28, backgroundColor: "black"