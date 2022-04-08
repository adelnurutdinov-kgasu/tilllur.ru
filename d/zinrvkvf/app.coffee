retina = 1

screen = new Layer
	width: 320, height: 568

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

bg = new Layer width: 320*retina, height: 568*retina, x: 0, y: 0, backgroundColor: "rgba(255,255,255,1.00)"
bg_twitter = new Layer width: 320*retina, height: 568*retina, x: 0, y: 0, backgroundColor: "rgba(232,190,160,1.00)"
bg_facebook = new Layer width: 320*retina, height: 568*retina, x: 0, y: 0, backgroundColor: "rgba(160,212,232,1.00)", opacity: 0
settings_color = new Layer width: 44*retina, height: 73*retina, x: 138*retina, y: 460*retina, image: "images/settings color.png", opacity: 0.8
card_twitter = new Layer width: 150*retina, height: 220*retina, x: 85*retina, y: 175*retina, image: "images/card twitter.png"
setting_global = new Layer width: 78*retina, height: 70*retina, x: 121*retina, y: 36*retina, image: "images/setting global.png", opacity: 0.8
card_instagram = new Layer width: 152*retina, height: 222*retina, x: 364*retina, y: 173*retina, image: "images/card instagram.png"
choose_color = new Layer width: 320*retina, height: 240*retina, x: 0, y: 568*retina, image: "images/choose color.png"
card_facebook = new Layer width: 108*retina, height: 158*retina, x: 246*retina, y: 206*retina, image: "images/card facebook.png"
settings_save = new Layer width: 90*retina, height: 71*retina, x: 115*retina, y: 5*retina, image: "images/settings save.png", opacity: 0
close_icon = new Layer width: 15*retina, height: 15*retina, x: 108*retina, y: 123*retina, image: "images/close icon.png", opacity: 0

bg.states.add {
	twitter: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook_settings: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook_settings_next: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook_back: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
}
bg.states.switchInstant 'twitter'

bg_twitter.states.add {
	twitter: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 0
	facebook_settings: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 0
	facebook_settings_next: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 0
	facebook_back: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 0
}
bg_twitter.states.switchInstant 'twitter'

bg_facebook.states.add {
	twitter: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 0
	facebook: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook_settings: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook_settings_next: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
	facebook_back: width: 320*retina, height: 568*retina, x: 0, y: 0, opacity: 1
}
bg_facebook.states.switchInstant 'twitter'

settings_color.states.add {
	twitter: width: 44*retina, height: 73*retina, x: 138*retina, y: 460*retina, opacity: 0.8
	facebook: width: 44*retina, height: 73*retina, x: 138*retina, y: 462*retina, opacity: 0.8
	facebook_settings: width: 44*retina, height: 73*retina, x: 138*retina, y: 422*retina, opacity: 0
	facebook_settings_next: width: 44*retina, height: 73*retina, x: 138*retina, y: 502*retina, opacity: 0
	facebook_back: width: 44*retina, height: 73*retina, x: 138*retina, y: 462*retina, opacity: 0.8
}
settings_color.states.switchInstant 'twitter'

card_twitter.states.add {
	twitter: width: 150*retina, height: 220*retina, x: 85*retina, y: 175*retina, opacity: 1
	facebook: width: 108*retina, height: 158*retina, x: -34*retina, y: 206*retina, opacity: 1
	facebook_settings: width: 108*retina, height: 158*retina, x: -34*retina, y: 136*retina, opacity: 0
	facebook_settings_next: width: 108*retina, height: 158*retina, x: -34*retina, y: 136*retina, opacity: 0
	facebook_back: width: 108*retina, height: 158*retina, x: -34*retina, y: 206*retina, opacity: 1
}
card_twitter.states.switchInstant 'twitter'

setting_global.states.add {
	twitter: width: 78*retina, height: 70*retina, x: 121*retina, y: 36*retina, opacity: 0.8
	facebook: width: 78*retina, height: 70*retina, x: 121*retina, y: 36*retina, opacity: 0.8
	facebook_settings: width: 78*retina, height: 70*retina, x: 121*retina, y: -4*retina, opacity: 0
	facebook_settings_next: width: 78*retina, height: 70*retina, x: 121*retina, y: -4*retina, opacity: 0
	facebook_back: width: 78*retina, height: 70*retina, x: 121*retina, y: 36*retina, opacity: 0.8
}
setting_global.states.switchInstant 'twitter'

card_instagram.states.add {
	twitter: width: 152*retina, height: 222*retina, x: 364*retina, y: 173*retina, opacity: 1
	facebook: width: 108*retina, height: 158*retina, x: 246*retina, y: 206*retina, opacity: 1
	facebook_settings: width: 108*retina, height: 158*retina, x: 246*retina, y: 136*retina, opacity: 0
	facebook_settings_next: width: 108*retina, height: 158*retina, x: 246*retina, y: 136*retina, opacity: 0
	facebook_back: width: 108*retina, height: 158*retina, x: 246*retina, y: 206*retina, opacity: 1
}
card_instagram.states.switchInstant 'twitter'

choose_color.states.add {
	twitter: width: 320*retina, height: 240*retina, x: 0, y: 568*retina, opacity: 0
	facebook: width: 320*retina, height: 240*retina, x: 0, y: 568*retina, opacity: 1
	facebook_settings: width: 320*retina, height: 240*retina, x: 0, y: 328*retina, opacity: 1
	facebook_settings_next: width: 320*retina, height: 240*retina, x: 0, y: 328*retina, opacity: 1
	facebook_back: width: 320*retina, height: 240*retina, x: 0, y: 568*retina, opacity: 1
}
choose_color.states.switchInstant 'twitter'

card_facebook.states.add {
	twitter: width: 108*retina, height: 158*retina, x: 246*retina, y: 206*retina, opacity: 1
	facebook: width: 150*retina, height: 220*retina, x: 85*retina, y: 175*retina, opacity: 1
	facebook_settings: width: 108*retina, height: 158*retina, x: 106*retina, y: 126*retina, opacity: 1
	facebook_settings_next: width: 108*retina, height: 158*retina, x: 106*retina, y: 126*retina, opacity: 1
	facebook_back: width: 150*retina, height: 220*retina, x: 85*retina, y: 175*retina, opacity: 1
}
card_facebook.states.switchInstant 'twitter'

settings_save.states.add {
	twitter: width: 90*retina, height: 71*retina, x: 115*retina, y: 5*retina, opacity: 0
	facebook: width: 90*retina, height: 71*retina, x: 115*retina, y: 5*retina, opacity: 0
	facebook_settings: width: 90*retina, height: 71*retina, x: 115*retina, y: 5*retina, opacity: 0
	facebook_settings_next: width: 90*retina, height: 71*retina, x: 115*retina, y: 25*retina, opacity: 0.8
	facebook_back: width: 90*retina, height: 71*retina, x: 115*retina, y: 25*retina, opacity: 0
}
settings_save.states.switchInstant 'twitter'

close_icon.states.add {
	twitter: width: 15*retina, height: 15*retina, x: 108*retina, y: 123*retina, opacity: 0
	facebook: width: 15*retina, height: 15*retina, x: 108*retina, y: 123*retina, opacity: 0
	facebook_settings: width: 15*retina, height: 15*retina, x: 108*retina, y: 123*retina, opacity: 0
	facebook_settings_next: width: 30*retina, height: 30*retina, x: 100*retina, y: 115*retina, opacity: 1
	facebook_back: width: 15*retina, height: 15*retina, x: 108*retina, y: 123*retina, opacity: 0
}
close_icon.states.switchInstant 'twitter'


generatedState1 = "twitter"
generatedState2 = "facebook"
generatedState3 = "facebook_settings"
generatedState4 = "facebook_settings_next"
generatedState5 = "facebook_back"


layers = [bg, bg_twitter, bg_facebook, settings_color, card_twitter, setting_global, card_instagram, choose_color, card_facebook, settings_save, close_icon]
generatedStates = [generatedState1, generatedState2, generatedState3, generatedState4, generatedState5]

cycler = Utils.cycle(generatedStates)
generatedButton = new Layer width: Screen.width, height: Screen.height, opacity: 0

for item in layers
	item.parent = screen

nextState = cycler()
generatedButton.on Events.Click, ->
	nextState = cycler()
	for item in layers
		item.animate(nextState, curve: Spring(damping: 1), time: 0.5)