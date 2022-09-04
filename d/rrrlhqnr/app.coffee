retina = 1

screen = new Layer
	width: 360, height: 640

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }


yandex_bg_video = new VideoLayer
	width: 376 / (376/360) * retina
	height: 668 / (668/640) * retina
	video: "images/yandex-bg-video.mp4"

yandex_bg_video.player.play()
yandex_bg_video.player.loop = true

welcome_screen = new Layer
	width: 360*retina
	height: 571*retina
	x: 0*retina
	y: 24*retina
	image: "images/welcome screen.png"

status_bar = new Layer
	width: 360*retina
	height: 32*retina
	x: 0*retina
	y: 0*retina
	backgroundColor: "black"

navbar = new Layer
	width: 360*retina
	height: 48*retina
	x: 0*retina
	y: 592*retina
	image: "images/navbar.png"

next_button = new Layer
	width: 360*retina
	height: 56*retina
	x: 0*retina
	y: 536*retina
	image: "images/next button.png"


for item in [yandex_bg_video, welcome_screen, status_bar, navbar, next_button]
	item.parent = screen