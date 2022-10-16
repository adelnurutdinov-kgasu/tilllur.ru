{Presentation} = require "PresentationComponent"

leadZero = (num, size) ->
	s = num + ""
	while s.length < size then s = "0" + s
	return s

slider = new Presentation (title: "Yandex New 2022")


# slider.slide().overlay("images/yn2022/page#{25}.png")
for index in [1...39]
	slider.slide().overlay("images/yn2022/page#{leadZero(index, 2)}.png")




