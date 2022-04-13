retina = 1

screen = new Layer
	width: 1440, height: 900, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }

bg = new Layer width: 1440*retina, height: 1132*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(255,255,255,1)"

content = new Layer width: 1440*retina, height: 961*retina, x: 0*retina, y: 0*retina, image: "images/content.png"

product_1 = new Layer width: 140*retina, height: 120*retina, x: 250*retina, y: 377*retina, image: "images/product 1.png"

product_2 = new Layer width: 140*retina, height: 120*retina, x: 410*retina, y: 377*retina, image: "images/product 2.png"

product_3 = new Layer width: 140*retina, height: 120*retina, x: 570*retina, y: 377*retina, image: "images/product 3.png"

product_4 = new Layer width: 140*retina, height: 120*retina, x: 730*retina, y: 377*retina, image: "images/product 4.png"

product_5 = new Layer width: 140*retina, height: 120*retina, x: 890*retina, y: 377*retina, image: "images/product 5.png"

product_6 = new Layer width: 140*retina, height: 120*retina, x: 1050*retina, y: 377*retina, image: "images/product 6.png"

selected_1 = new Layer width: 68*retina, height: 32*retina, x: 250*retina, y: 329*retina, image: "images/selected 1.png"

selected_2 = new Layer width: 73*retina, height: 32*retina, x: 412*retina, y: 329*retina, image: "images/selected 2.png", opacity: 0

button = new Layer width: 1011*retina, height: 253*retina, x: 202*retina, y: 280*retina, backgroundColor: "transparent"


backFlag = false
productsArray = [product_1, product_2, product_3, product_4, product_5, product_6]

sTime = 0.1

reloadProducts = () ->
	for item in productsArray
		item.opacity = 0
		if backFlag
			item.image = "images/product " + item.image.replace(/\D/g,'') + ".png"
		else
			item.image = "images/product next " + item.image.replace(/\D/g,'') + ".png"
	
	if backFlag
		selected_1.animate { time: sTime, properties: {opacity: 1}}
		selected_2.animate { time: sTime, properties: {opacity: 0}}
	else
		selected_1.animate { time: sTime, properties: {opacity: 0}}
		selected_2.animate { time: sTime, properties: {opacity: 1}}
	backFlag = backFlag ^ 1

	Utils.delay 0.1, ->
		current = 1
		for item in productsArray
			item.animate
				opacity: 1
				options:
					time: 0.3, delay: 0.04 * current
			current++
		
button.on Events.Click, ->
	reloadProducts()

for item in [bg, content, product_1, product_2, product_3, product_4, product_5, product_6, selected_1, selected_2, button]
	item.parent = screen