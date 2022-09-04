
screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

temp = new Layer
	width: 640, height: 1136, parent: screen, scale: 0.5, originX: 0, originY: 0


layerPath = new Layer width:640, height:1136, image:"images/bg.png"
# layerPath.center()

button = new Layer {width: 200, height: 200, borderRadius: 200, x: 220, y: 493}
button.style = {
	"background-image": "linear-gradient(-180deg, #5EA0F1 0%, #0B82D8 100%)"
	"box-shadow" : "0px 2px 4px 0px rgba(0,0,0,0.50);"
}

out = new Layer width:640, height:1136, backgroundColor: "rgba(0,0,0,0)"
out.html = '<svg width="640px" height="1136px" viewBox="0 0 640 1136" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
<path id="pathout" fill="none" stroke="#074B7D" stroke-width="40" stroke-miterlimit="10" d="M324.193105,348.035303 C457.016321,350.273397 564,458.64301 564,592 C564,726.757479 454.757479,836 320,836 C185.242521,836 76,726.757479 76,592 C76,457.242521 185.242521,348 320,348" stroke-dasharray="1530" stroke-dashoffset="1530"></path>
</svg>'

mid = new Layer width:640, height:1136, backgroundColor: "rgba(0,0,0,0)"
mid.html = '<svg width="640px" height="1136px" viewBox="0 0 640 1136" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
<path id="pathmid" fill="none" stroke="#1667AF" stroke-width="40" stroke-miterlimit="10" d="M202.928379,0.0288645553 C311.527688,1.85878125 399,90.4642641 399,199.5 C399,309.680808 309.680808,399 199.5,399 C89.3191924,399 0,309.680808 0,199.5 C0,89.3191924 89.3191924,0 199.5,0" stroke-dasharray="1250" stroke-dashoffset="1250" transform="translate(121.000000, 393.000000)"></path>
</svg>'

inner = new Layer width:640, height:1136, backgroundColor: "rgba(0,0,0,0)"
inner.html = '<svg width="640px" height="1136px" viewBox="0 0 640 1136" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
<path id="pathin" fill="none" stroke="#1284DA" stroke-width="40" stroke-miterlimit="10" d="M323.663653,438.022426 C408.039056,439.444166 476,508.285518 476,593 C476,678.604136 406.604136,748 321,748 C235.395864,748 166,678.604136 166,593 C166,507.395864 235.395864,438 321,438" stroke-dasharray="970" stroke-dashoffset="970"></path>
</svg>'

pathLength = 0
paths = ['pathin', 'pathmid', 'pathout']

button.on Events.Click, ->
	button.animate
		properties: {scale: 0.8}
		time: 0.2
		curve: "spring(300, 10, 0)"
	
	for item in paths
# 		Utils.delay 0.1, ->
			finishing_point = '0'
			svgPath = document.getElementById(item)
			pathLength = svgPath.getTotalLength()
			svgPath.style.strokeDasharray = pathLength + ' ' + pathLength;
			svgPath.style.strokeDashoffset = pathLength
			svgPath.getBoundingClientRect()
			svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 3.6s 0.2s cubic-bezier(1,.2,.9,1.29)'
			if item == 'pathin'
				svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 3.8s 0.4s cubic-bezier(.6,.34,.9,1.29)'
			if item == 'pathmid'
				svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 4.4s cubic-bezier(.6,.34,.9,1.29)'
				
			if item == 'pathout'
				finishing_point = '440'
			if item == 'pathmid'
				finishing_point = '270'
			if item == 'pathin'
				finishing_point = '320'
			svgPath.style.strokeDashoffset = finishing_point

for item in [layerPath, button, out, mid, inner]
	item.parent = temp

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "000"