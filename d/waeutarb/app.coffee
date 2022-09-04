retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


# view
bg = new Layer width: 375*retina, height: 765*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)"

content = new Layer width: 375*retina, height: 982*retina, x: 0*retina, y: 0*retina, image: "images/content.png"

content.states.add {
	main_neue: { opacity: 1}
	artboard_2: { opacity: 0}
}
content.states.switchInstant "main_neue"


isIndica = true

slider_products = new ScrollComponent width: 375*retina, height: 120.0*retina, x: 0*retina, y: 384*retina, scrollVertical: false

indica_1 = new Layer width: 140*retina, height: 120*retina, x: 14*retina, y: 0*retina, image: "images/indica.png"

indica_2 = new Layer width: 140*retina, height: 120*retina, x: 174*retina, y: 0*retina, image: "images/indica.png"

indica_3 = new Layer width: 140*retina, height: 120*retina, x: 334*retina, y: 0*retina, image: "images/indica.png"

indica_4 = new Layer width: 140*retina, height: 120*retina, x: 494*retina, y: 0*retina, image: "images/indica.png"

indica_5 = new Layer width: 140*retina, height: 120*retina, x: 654*retina, y: 0*retina, image: "images/indica.png"

indica_6 = new Layer width: 140*retina, height: 120*retina, x: 814*retina, y: 0*retina, image: "images/indica.png"

indicaArray = [indica_1, indica_2, indica_3, indica_4, indica_5, indica_6]

for item in indicaArray
	item.parent = slider_products.content




slider_categories = new ScrollComponent width: 375*retina, height: 34*retina, x: 0*retina, y: 336*retina, scrollVertical: false

category_1 = new Layer width: 69*retina, height: 34*retina, x: 14*retina, y: 0*retina, image: "images/category selected 1.png"

category_2 = new Layer width: 70*retina, height: 34*retina, x: 91*retina, y: 0*retina, image: "images/category 2.png"

category_3 = new Layer width: 74*retina, height: 34*retina, x: 169*retina, y: 0*retina, image: "images/category 3.png"

category_4 = new Layer width: 70*retina, height: 34*retina, x: 251*retina, y: 0*retina, image: "images/category 4.png"

category_5 = new Layer width: 112*retina, height: 34*retina, x: 329*retina, y: 0*retina, image: "images/category 5.png"

category_6 = new Layer width: 78*retina, height: 34*retina, x: 449*retina, y: 0*retina, image: "images/category 6.png"

category_7 = new Layer width: 85*retina, height: 34*retina, x: 535*retina, y: 0*retina, image: "images/category 7.png"

category_8 = new Layer width: 63*retina, height: 34*retina, x: 628*retina, y: 0*retina, image: "images/category 8.png"

category_9 = new Layer width: 61*retina, height: 34*retina, x: 699*retina, y: 0*retina, image: "images/category 9.png"

category_10 = new Layer width: 80*retina, height: 34*retina, x: 768*retina, y: 0*retina, image: "images/category 10.png"

category_11 = new Layer width: 60*retina, height: 34*retina, x: 856*retina, y: 0*retina, image: "images/category 11.png"

categoryArray = [category_1, category_2, category_3, category_4, category_5, category_6, category_7, category_8, category_9, category_10, category_11]

category_handler = (event, layer) ->
	number = 1
	for item in categoryArray
		item.image = "images/category " + number + ".png"
		number++
	layer.image = "images/category selected " + layer.image.replace(/\D/g,'') + ".png"
	
	for item in indicaArray
		if isIndica
			item.image = "images/sativa.png"
		else
			item.image = "images/indica.png"
	
	isIndica = isIndica ^ 1
	slider_products.scrollToPoint(x: 0, y: 0)

for item in categoryArray
	item.parent = slider_categories.content
	item.on(Events.Click, category_handler)

for item in [bg, content, slider_products, slider_categories]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"

