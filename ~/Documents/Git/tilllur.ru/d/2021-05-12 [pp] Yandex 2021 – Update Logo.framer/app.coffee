
Canvas.backgroundColor = "222"

logoCustom = new Layer
	width: 128
	height: 72
	image: "images/logo1.png"

logoYandex = new Layer
	width: 128
	height: 72
	image: "images/logo2.png"


{ Preview } = require "PreviewComponent"

screen = new Layer { width: 360, height: 720, image: "images/screen.png" }
new Preview { view: screen, borderRadius: 16 }

# Logos

for item in [logoYandex, logoCustom]
	item.parent = screen
	item.x = 116
	item.y = 32
	item.animationOptions =
		curve: Spring(damping: 1)
		time: 0.3
	
	item.states =
		"hidden": { opacity: 0, scale: 0.7 }
		"shown": { opacity: 1, scale: 1 }
	if item is logoYandex then item.stateSwitch("shown")
	else item.stateSwitch("hidden")


screen.on Events.StateSwitchEnd, (from, to) ->
# 	print from + " " + to
	if to != from
		if to is "yandex"
			logoCustom.animate("hidden")
			logoYandex.animate("shown", delay: 0.2)
			Utils.delay 2, =>
				@stateSwitch("custom")
		else
			logoYandex.animate("hidden")
			logoCustom.animate("shown", delay: 0.2)
			Utils.delay 2, =>
				@stateSwitch("yandex")

# screen.onTap ->
# 	screen.stateCycle("custom", "yandex", time: 0)




screen.states =
	"yandex": { opacity: 1 }
	"custom": { opacity: 1 }
screen.stateSwitch("yandex")


topBarFix = new Layer
	parent: screen, width: screen.width, height: 32
	backgroundColor: "white"