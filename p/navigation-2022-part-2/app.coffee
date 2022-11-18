{Presentation} = require "PresentationComponent"

slider = new Presentation (title: "Navigation 2022 pt2")


for index in [1..24]

	if index == 2
		slider.fullVideoSlide("videos/demo.mp4")
	
	else if index == 20
		slider.fullVideoSlide("videos/full.mp4")
		.link("https://tilllur.com/s/navigation-2022-p2-demo-1/", "Open")
		
	else if index == 23
		slider.slideWithIndex(index)
		.link("https://tilllur.com/p/yandex-new-2022/", "Read Next")
	
	else
		slider.slideWithIndex(index)




# test = new Layer
# 	width: 1400.0 * 2
# 	height: 900.0 * 2
# 	image: "images/test1.png"
# 	blending: "exclusion"
# 	parent: slider.content.children[0]