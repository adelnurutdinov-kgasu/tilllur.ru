{Presentation} = require "PresentationComponent"

slider = new Presentation (title: "Navigation 2022 pt1")


for index in [1..35]
	if index == 0 then continue

	else if index == 13
		slider.fullVideoSlide("videos/feed.mp4")
		.link("https://tilllur.com/s/feed-clips-p1/", "Open")
		

	else if index == 18
		slider.fullVideoSlide("videos/groups.mp4")
		.link("https://tilllur.com/s/bro-groups/", "Open")

	else if index == 33
		slider.fullVideoSlide("videos/flow.mp4")
		.link("https://tilllur.com/s/yandex-2022/", "Open")
	
	else if index == 34
		slider.prototypeSlide("https://tilllur.com/s/yandex-2022/")
		.overlay("videos/overlay.png")
		.link("https://tilllur.com/s/yandex-2022/", "Open")
		
	else if index == 35
		slider.slideWithIndex(index)
		.link("https://tilllur.com/p/navigation-2022-part-2/", "Next Chapter")
	else
		slider.slideWithIndex(index)




