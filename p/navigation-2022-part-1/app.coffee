{Presentation} = require "PresentationComponent"

slider = new Presentation (title: "Navigation 2022. Part 1.")

for index in [1..31]
	if index == 0 then continue
	else if index == 29
		slider.fullVideoSlide("videos/temp.mp4")
	else if index == 30
		slider.slide("images/page#{slider.leadZero(index)}.png")
		.link("https://tilllur.com/s/yandex-2022/", "Open Prototype")
	else if index == 31
		slider.slide("images/page#{slider.leadZero(index)}.png")
		.link("https://tilllur.com/p/navigation-2022-part-2/", "Read Part 2")
	else
		slider.slide("images/page#{slider.leadZero(index)}.png")




