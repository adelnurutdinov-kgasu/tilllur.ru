
# Framer.Extras.Preloader.setLogo("https://tilllur.ru/shared/avatars/logoForFramer.png")
# ////tilllur.ru/shared/avatars/logoForFramer.png
screen = new Layer
	width: 375, height: 812

{ Preview } = require "PreviewComponent"
new Preview { view: screen }

Screen_Recording_2022_04_09_at_00_02_15 = new VideoLayer
	parent: screen
	width: 882
	height: 1752
	video: "images/Screen%20Recording%202022-04-09%20at%2000.02.15.mov"

# Screen_Recording_2022_04_09_at_00_02_15.player.play()

Screen_Recording_2022_04_09_at_00_04_58 = new VideoLayer
	parent: screen
	width: 882
	height: 1752
	video: "images/Screen%20Recording%202022-04-09%20at%2000.04.58.mov"

# Screen_Recording_2022_04_09_at_00_04_58.player.play()
