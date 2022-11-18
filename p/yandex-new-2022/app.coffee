{Presentation} = require "PresentationComponent"

slider = new Presentation (title: "Yandex New 2022")


# slider.phoneVideoSlide("videos/stories.mp4")
# 	.background("videos/page10_background.png")

# slider.phoneVideoSlide("videos/crop.mp4")
# 	.background("videos/page10_background.png")





for index in [1..38]

	if index == 2
		slider.previewVideoSlide("videos/yaru.mp4")
		.background("videos/page02_background.png")
	else if index == 4
		slider.slideWithIndex(index)
		.link("https://techcrunch.com/2022/03/16/russia-yandex-news-vk/")
	else if index == 10
		slider.previewVideoSlide("videos/desktop.mp4")
		.background("videos/page10_background.png")
		.overlay("videos/overlay.png")
	else if index == 18
		slider.fullVideoSlide("videos/resize.mp4")
		.overlay("videos/overlay.png")
	else if index == 23
		slider.fullVideoSlide("videos/mobile.mp4")
		# .overlay("videos/overlay.png")
	else if index == 31
		slider.slideWithIndex(index)
		.link("https://yandex.com/company/press_center/press_releases/2022/2022-08-23")
	else if index == 32
		slider.slideWithIndex(index)
		.link("https://yandex.com/company/press_center/press_releases/2022/2022-09-12")
	else
		slider.slideWithIndex(index)




