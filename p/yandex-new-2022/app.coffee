{Presentation} = require "PresentationComponent"

slider = new Presentation (title: "Yandex New 2022")

for index in [1..34]
	if index == 2
		slider.videoSlide("videos/yaru.mp4")
	else if index == 6
		slider.slide("images/page#{slider.leadZero(index)}.png")
		.link("https://techcrunch.com/2022/03/16/russia-yandex-news-vk/")
	else if index == 31
		slider.slide("images/page#{slider.leadZero(index)}.png")
		.link("https://yandex.com/company/press_center/press_releases/2022/2022-08-23")
	else if index == 32
		slider.slide("images/page#{slider.leadZero(index)}.png")
		.link("https://yandex.com/company/press_center/press_releases/2022/2022-09-12")
	else
		slider.slide("images/page#{slider.leadZero(index)}.png")




