
screen = new Layer
	width: 1382, height: 920, backgroundColor: null

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, visible: false }



bg = new Layer width: 1382, height: 894, x: 0, y: 0, image: "images/bg.png"

box = new Layer width: 256, x: 473-30, y: 125, backgroundColor: "transparent", parent: bg

proxyYPos = 1000

square = new Layer width: 256, height: 200, backgroundColor: "transparent", parent: box
rect = new Layer width: 256, height: 200, backgroundColor: "transparent", parent: box

blinder = new Layer width: 62, height: 58, x: 196, image: "images/blinder.png", parent: box
logo = new Layer width: 60, height: 60, x: 399-8, y: 125-6, image: "images/logo.png", parent: bg


# Proxy layer for the animation
proxy = new Layer width: 40, height: 40, backgroundColor: "red", y: proxyYPos, backgroundColor: "transparent"

# Position SVG Layers
rect.center()
square.center()
# square.y = square.y - square.height*1.5

# Add a class to the layer we can target it easily
square.classList.add("square")
rect.classList.add("rect")

# Our Square is 200x200. Add together each edge length for 800
square.pathLength = 400

# Our Rect is 400x200. Add together each edge 400+400+200+2000 length for 1200
rect.pathLength   = 700

# Add SVG to the dom via our layers
# square.html = "<svg viewBox='0 0 200 200'><path fill='none' stroke-width='10' stroke='white' stroke-dasharray='#{square.pathLength} #{square.pathLength}' stroke-dashoffset='#{square.pathLength}' d='M200,0H0v200h200V0L200'/></svg>"

# rect.html = "<svg viewBox='0 0 400 200' ><polyline fill='none' stroke-width='10' stroke='#ffffff' stroke-dasharray='#{rect.pathLength} #{rect.pathLength}' stroke-dashoffset='#{rect.pathLength}' points='0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 400,0 400,200 0,200 0,0 '/></svg>"

square.html = "<svg viewBox='8 7 238 41'><path fill='none' stroke-width='4' stroke='#EC1C24' stroke-dasharray='#{square.pathLength} #{square.pathLength}' stroke-dashoffset='#{square.pathLength}' d='M10,33.8745101 L19.2634992,33.8745101 C19.2634992,33.8745101 21.7794838,33.3755025 24.1785811,32.0103041 C26.5776784,30.6451057 26.0896712,29.8599321 27.3682258,29.8599321 C28.3384433,29.8599321 27.9883896,30.5828231 30.1145502,32.0103041 C32.2407108,33.4377851 33.9720507,33.8745101 33.9720507,33.8745101 L38.6990829,33.8745101 L45.4893772,45.0603207 L52.9610264,10 L60.6012703,39.7836341 L69.7879339,33.8745101 L79.0694336,33.8745101 C79.0694336,33.8745101 83.3886601,33.543754 87.4681752,31.073409 C91.5476904,28.6030641 90.6326252,27.1549206 92.8017456,27.1549206 C94.8844318,27.1549206 93.5357677,28.272308 98.4211728,31.073409 C103.306578,33.8745101 106.310893,34.0299131 106.310893,34.0299131 L243.125289,34.0299131'/></svg>"

rect.html = "<svg viewBox='8 7 238 41'><path fill='none' stroke-width='7' stroke='#FFF' stroke-dasharray='#{square.pathLength} #{square.pathLength}' stroke-dashoffset='#{square.pathLength}' d='M10,33.8745101 L19.2634992,33.8745101 C19.2634992,33.8745101 21.7794838,33.3755025 24.1785811,32.0103041 C26.5776784,30.6451057 26.0896712,29.8599321 27.3682258,29.8599321 C28.3384433,29.8599321 27.9883896,30.5828231 30.1145502,32.0103041 C32.2407108,33.4377851 33.9720507,33.8745101 33.9720507,33.8745101 L38.6990829,33.8745101 L45.4893772,45.0603207 L52.9610264,10 L60.6012703,39.7836341 L69.7879339,33.8745101 L79.0694336,33.8745101 C79.0694336,33.8745101 83.3886601,33.543754 87.4681752,31.073409 C91.5476904,28.6030641 90.6326252,27.1549206 92.8017456,27.1549206 C94.8844318,27.1549206 93.5357677,28.272308 98.4211728,31.073409 C103.306578,33.8745101 106.310893,34.0299131 106.310893,34.0299131 L243.125289,34.0299131'/></svg>"

# shape.html = '<svg width='238px' height='41px' viewBox='8 7 238 41' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
# 
#     <path d='M10,33.8745101 L19.2634992,33.8745101 C19.2634992,33.8745101 21.7794838,33.3755025 24.1785811,32.0103041 C26.5776784,30.6451057 26.0896712,29.8599321 27.3682258,29.8599321 C28.3384433,29.8599321 27.9883896,30.5828231 30.1145502,32.0103041 C32.2407108,33.4377851 33.9720507,33.8745101 33.9720507,33.8745101 L38.6990829,33.8745101 L45.4893772,45.0603207 L52.9610264,10 L60.6012703,39.7836341 L69.7879339,33.8745101 L79.0694336,33.8745101 C79.0694336,33.8745101 83.3886601,33.543754 87.4681752,31.073409 C91.5476904,28.6030641 90.6326252,27.1549206 92.8017456,27.1549206 C94.8844318,27.1549206 93.5357677,28.272308 98.4211728,31.073409 C103.306578,33.8745101 106.310893,34.0299131 106.310893,34.0299131 L243.125289,34.0299131' id='path' stroke='#979797' stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
# </svg>'

# Add Slider, set max to our path length
slider = new SliderComponent
	parent: bg
	min: 0, max: 1, value: .5, knobSize: 50, x: Align.center, y: Align.bottom(-160)

# Position our slider
# slider.y = (Screen.height/5 * 4) - slider.knobSize
# print Screen.width
# slider.centerX()

# Tell the SVG paths to change when the slider changes
slider.on "change:value", -> 
	updatePathsFromSlider()
	sliderDone = true

# Tell the SVG paths to change when the proxy y position changes
proxy.on "change:y", -> updatePathsFromAnimation()

# Restart the Animation if you touch the red proxy proxy
proxy.on Events.TouchStart, -> animateBox()

# Multiply the slider value 0.0 to 1.0 times each SVG's path length
updatePathsFromSlider = ->
	square.path.style.strokeDashoffset = "#{slider.value * square.pathLength}"
	rect.path.style.strokeDashoffset   = "#{slider.value *   rect.pathLength}"

# Multiply the proxy Y value animation progress 0.0 to 1.0 times each SVG's path length
updatePathsFromAnimation = ->
	square.path.style.strokeDashoffset = "#{proxy.y/proxyYPos * square.pathLength}"
	rect.path.style.strokeDashoffset   = "#{proxy.y/proxyYPos *   rect.pathLength}"
	
sliderDone = false


# This method calls the proxy animation
localAnimationTime = 5-2

animateBox = () ->
	proxy.y = proxyYPos
	proxy.animate 
		properties:
			y: 0
# 		curve: "cubic-bezier(0.86, 0, 0.07, 1)"
		time: localAnimationTime
		curve: "cubic-bezier(0.4, 0, 0.5, 1)"
		
	Utils.delay localAnimationTime, ->
		if !sliderDone
			animateBox()

# Wait a bit so dom is ready before doing the intial animation
Utils.delay 0.4, ->
	square.path = document.querySelector('.square svg > :first-child')
	rect.path   = document.querySelector('.rect   svg > :first-child')
	animateBox()

for item in [bg, proxy]
	item.parent = screen


