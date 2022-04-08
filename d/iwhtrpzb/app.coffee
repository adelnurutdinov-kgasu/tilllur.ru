
sketch = Framer.Importer.load "imported/ios-music-sense-splash-identity"
retina = 1

screen = new Layer
	width: 320, height: 568

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

sketch["splash"].parent = screen
sketch["splash"].scale = 0.5
sketch["splash"].originX = 0
sketch["splash"].originY = 0

color_none = "rgb(0,0,0,0)"
color_brand = "#DC3F39"

sketch.button.opacity = 0
sketch.button.scale = 0.8
sketch.skip.opacity = 0

moving_parts = [sketch.move1, sketch.move2, sketch.move3, sketch.move4, sketch.move5]
for item in moving_parts
	item.opacity = 0

pipe1 = new Layer
	x: 260, y: 398, width: 14, height: 90, borderRadius: 66, backgroundColor: color_brand

pipe2 = new Layer
	x: 286, y: 416, width: 14, height: 40, borderRadius: 66, backgroundColor: color_brand
	
pipe3 = new Layer
	x: 312, y: 438, width: 14, height: 38, borderRadius: 66, backgroundColor: color_brand
	
pipe4 = new Layer
	x: 340, y: 416, width: 14, height: 40, borderRadius: 66, backgroundColor: color_brand
	
pipe5 = new Layer
	x: 366, y: 398, width: 14, height: 90, borderRadius: 66, backgroundColor: color_brand

for item in [pipe1, pipe2, pipe3, pipe4, pipe5]
	item.parent = sketch["splash"]

# pipe_animate_down = (pipe_layer, pipe_y, offset, pipe_height, height_delta, curve, time) ->
# 	pipe_layer.animate
# 		properties: 
	
# pipe_curve_base = "spring(100, 0, 0)"
# pipe_curve_base = "ease-in-out"
pipe_curve_base = "linear"

pipe1_y_array = [448, 398, 359]
pipe1_height_array = [40, 90, 40]

pipe2_y_array = [495, 416, 385]
pipe2_height_array = [20, 40, 30]

pipe3_y_array = [514, 438, 395]
pipe3_height_array = [30, 40, 16]

pipe4_y_array = [495, 416, 385]
pipe4_height_array = [20, 40, 30]

pipe5_y_array = [448, 398, 359]
pipe5_height_array = [40, 90, 40]


pipe_animate_down = (pipe_layer, pipe_y, pipe_heigth, pipe_curve, pipe_time) ->
	Utils.delay 2, ->
		pipe_layer.animate
			properties:
				y: pipe_y[0]
				height: pipe_heigth[0]
			time: pipe_time
			curve: pipe_curve
		Utils.delay pipe_time, ->
			pipe_animate_center(true, pipe_layer, pipe_y, pipe_heigth, pipe_curve, pipe_time)
		
pipe_animate_center = (toUp, pipe_layer, pipe_y, pipe_heigth, pipe_curve, pipe_time) ->
	pipe_layer.animate
		properties:
			y: pipe_y[1]
			height: pipe_heigth[1]
		time: pipe_time
		curve: pipe_curve
	Utils.delay pipe_time, ->
		if toUp then pipe_animate_up(pipe_layer, pipe_y, pipe_heigth, pipe_curve, pipe_time)
		else pipe_animate_down(pipe_layer, pipe_y, pipe_heigth, pipe_curve, pipe_time)
		
pipe_animate_up = (pipe_layer, pipe_y, pipe_heigth, pipe_curve, pipe_time) ->
	pipe_layer.animate
		properties:
			y: pipe_y[2]
			height: pipe_heigth[2]
		time: pipe_time
		curve: pipe_curve
	Utils.delay pipe_time, ->
		pipe_animate_center(false, pipe_layer, pipe_y, pipe_heigth, pipe_curve, pipe_time)
		

transition_time = 0.6

Utils.delay 0, ->
	sketch.button.animate
		properties: {opacity: 1, scale: 1}
		time: 1
		curve: "spring(50, 10, 0)"
		
	sketch.skip.animate
		properties: {opacity: 1}
		time: 1
		
	pipe_animate_down(pipe1, pipe1_y_array, pipe1_height_array, pipe_curve_base, transition_time)
	Utils.delay 0.05, ->
		pipe_animate_down(pipe2, pipe2_y_array, pipe2_height_array, pipe_curve_base, transition_time)
	Utils.delay 0.1, ->
		pipe_animate_down(pipe3, pipe3_y_array, pipe3_height_array, pipe_curve_base, transition_time)
	Utils.delay 0.15, ->
		pipe_animate_down(pipe4, pipe4_y_array, pipe4_height_array, pipe_curve_base, transition_time)
	Utils.delay 0.2, ->
		pipe_animate_down(pipe5, pipe5_y_array, pipe5_height_array, pipe_curve_base, transition_time)
		
