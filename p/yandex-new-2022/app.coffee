{Presentation} = require "PresentationComponent"

leadZero = (num, size) ->
	s = num + ""
	while s.length < size then s = "0" + s
	return s

slider = new Presentation (title: "Yandex New 2022")


# slider.slide().overlay("images/yn2022/page#{25}.png")
for index in [1..34]
	# slider.slide().overlay("images/yn2022-preview/preview-page#{leadZero(index, 2)}.png")
	if index == 2
		slider.videoSlide("https://tilllur.ru/mp4/yaru.mp4")
	else if index == 6
		slider.slide().overlay("images/yn2022/page#{leadZero(index, 2)}.png")
		.link("https://techcrunch.com/2022/03/16/russia-yandex-news-vk/")
	else if index == 31
		slider.slide().overlay("images/yn2022/page#{leadZero(index, 2)}.png")
		.link("https://yandex.com/company/press_center/press_releases/2022/2022-08-23")
	else if index == 32
		slider.slide().overlay("images/yn2022/page#{leadZero(index, 2)}.png")
		.link("https://yandex.com/company/press_center/press_releases/2022/2022-09-12")
	else
		slider.slide().overlay("images/yn2022/page#{leadZero(index, 2)}.png")




