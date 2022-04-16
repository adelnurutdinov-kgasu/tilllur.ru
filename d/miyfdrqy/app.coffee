# Use desktop cursor
document.body.style.cursor = "auto"

screen = new Layer
	width: 360, height: 720, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

temp = new Layer
	parent: screen, width: 1440, height: 900
	x: Align.center, y: Align.center(50), backgroundColor: "000", scale: 0.5


# Data


person_1 = new Layer width: 62, height: 62, x: 546, y: 206, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_2 = new Layer width: 62, height: 62, x: 666, y: 169, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_3 = new Layer width: 62, height: 62, x: 798, y: 522, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_4 = new Layer width: 62, height: 62, x: 762, y: 620, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_5 = new Layer width: 62, height: 62, x: 506, y: 325, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_6 = new Layer width: 62, height: 62, x: 450, y: 387, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_7 = new Layer width: 30, height: 30, x: 491, y: 220, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_8 = new Layer width: 30, height: 30, x: 496, y: 277, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_9 = new Layer width: 30, height: 30, x: 562, y: 283, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_10 = new Layer width: 30, height: 30, x: 473, y: 547, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_11 = new Layer width: 30, height: 30, x: 413, y: 377, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_12 = new Layer width: 30, height: 30, x: 827, y: 599, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_13 = new Layer width: 30, height: 30, x: 878, y: 531, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_14 = new Layer width: 30, height: 30, x: 468, y: 471, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_15 = new Layer width: 30, height: 30, x: 552, y: 405, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_16 = new Layer width: 30, height: 30, x: 654, y: 244, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_17 = new Layer width: 30, height: 30, x: 710, y: 240, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_18 = new Layer width: 30, height: 30, x: 654, y: 126, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_19 = new Layer width: 30, height: 30, x: 820, y: 276, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_20 = new Layer width: 30, height: 30, x: 900, y: 209, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_21 = new Layer width: 30, height: 30, x: 906, y: 158, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_22 = new Layer width: 30, height: 30, x: 787, y: 111, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_23 = new Layer width: 30, height: 30, x: 736, y: 74, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_24 = new Layer width: 30, height: 30, x: 682, y: 83, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_25 = new Layer width: 30, height: 30, x: 710, y: 131, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_26 = new Layer width: 30, height: 30, x: 613, y: 136, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_27 = new Layer width: 30, height: 30, x: 716, y: 569, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_28 = new Layer width: 30, height: 30, x: 763, y: 576, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_29 = new Layer width: 30, height: 30, x: 716, y: 671, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_30 = new Layer width: 30, height: 30, x: 855, y: 486, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_31 = new Layer width: 30, height: 30, x: 537, y: 451, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_32 = new Layer width: 30, height: 30, x: 608, y: 259, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_33 = new Layer width: 30, height: 30, x: 567, y: 161, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_34 = new Layer width: 30, height: 30, x: 620, y: 196, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_35 = new Layer width: 30, height: 30, x: 449, y: 335, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_36 = new Layer width: 30, height: 30, x: 421, y: 273.3, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_37 = new Layer width: 30, height: 30, x: 507, y: 151, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_38 = new Layer width: 62, height: 62, x: 958, y: 318, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_39 = new Layer width: 62, height: 62, x: 927, y: 419, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_40 = new Layer width: 30, height: 30, x: 976, y: 497, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_41 = new Layer width: 30, height: 30, x: 996, y: 393, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_42 = new Layer width: 30, height: 30, x: 913, y: 370, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_43 = new Layer width: 30, height: 30, x: 870.8, y: 387.5, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_44 = new Layer width: 30, height: 30, x: 878.8, y: 268.3, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_45 = new Layer width: 30, height: 30, x: 881.4, y: 438.6, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_46 = new Layer width: 30, height: 30, x: 883.7, y: 602.6, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_47 = new Layer width: 30, height: 30, x: 923.7, y: 496.8, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_48 = new Layer width: 30, height: 30, x: 907.6, y: 321, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_49 = new Layer width: 30, height: 30, x: 850.9, y: 326.4, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_50 = new Layer width: 30, height: 30, x: 937.6, y: 273, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_51 = new Layer width: 30, height: 30, x: 937.6, y: 547, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_52 = new Layer width: 62, height: 62, x: 566, y: 634, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_53 = new Layer width: 62, height: 62, x: 531.7, y: 524, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_54 = new Layer width: 30, height: 30, x: 511.8, y: 639.5, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_55 = new Layer width: 30, height: 30, x: 548.6, y: 602.1, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_56 = new Layer width: 30, height: 30, x: 595.4, y: 576.8, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_57 = new Layer width: 30, height: 30, x: 607.4, y: 527.3, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_58 = new Layer width: 30, height: 30, x: 695.9, y: 623.6, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_59 = new Layer width: 30, height: 30, x: 574.3, y: 487.3, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_60 = new Layer width: 30, height: 30, x: 950, y: 217, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_61 = new Layer width: 30, height: 30, x: 510.2, y: 498.6, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_62 = new Layer width: 30, height: 30, x: 638.5, y: 601.4, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_63 = new Layer width: 30, height: 30, x: 667, y: 551.3, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_64 = new Layer width: 30, height: 30, x: 647.6, y: 664.5, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_65 = new Layer width: 30, height: 30, x: 477.6, y: 597.6, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_66 = new Layer width: 30, height: 30, x: 846, y: 131, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_67 = new Layer width: 30, height: 30, x: 439, y: 222, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_68 = new Layer width: 30, height: 30, x: 608, y: 71, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_69 = new Layer width: 30, height: 30, x: 553, y: 114, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_70 = new Layer width: 30, height: 30, x: 413, y: 450, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"

person_71 = new Layer width: 30, height: 30, x: 427, y: 514, borderRadius: "100%", backgroundColor: "rgba(102,102,102,1)"





persons = [person_1, person_2, person_3, person_4, person_5, person_6, person_7, person_8, person_9, person_10, person_11, person_12, person_13, person_14, person_15, person_16, person_17, person_18, person_19, person_20, person_21, person_22, person_23, person_24, person_25, person_26, person_27, person_28, person_29, person_30, person_31, person_32, person_33, person_34, person_35, person_36, person_37, person_38, person_39, person_40, person_41, person_42, person_43, person_44, person_45, person_46, person_47, person_48, person_49, person_50, person_51, person_52, person_53, person_54, person_55, person_56, person_57, person_58, person_59, person_60, person_61, person_62, person_63, person_64, person_65, person_66, person_67, person_68, person_69, person_70, person_71]

# Artist

way_1 = new Layer width: 62, height: 62, x: 817, y: 198, borderRadius: "100%", backgroundColor: "rgba(255,204,0,1)"

way_2 = new Layer width: 30, height: 30, x: 757, y: 243, borderRadius: "100%", backgroundColor: "rgba(255,204,0,1)"

way_3 = new Layer width: 30, height: 30, x: 757, y: 197, borderRadius: "100%", backgroundColor: "rgba(255,204,0,1)"

way_4 = new Layer width: 30, height: 30, x: 757, y: 153, borderRadius: "100%", backgroundColor: "rgba(255,204,0,1)"

way_5 = new Layer width: 30, height: 30, x: 798, y: 168, borderRadius: "100%", backgroundColor: "rgba(255,204,0,1)"

artist = new Layer width: 254, height: 254, x: 593, y: 283, image: "images/artist.png"



way = [way_1, way_2, way_3, way_4, way_5]

for item in way
	item.backgroundColor = "#666"

Utils.delay 1, ->
	for item in way
		item.animate
			properties: { backgroundColor: "rgba(255,204,0,1)" }
			time: 1




working = true
counter = 0

Utils.delay 3, ->
	Utils.interval 0.05, ->
		if working 
			item = getItem(counter++)
			item.animate
				properties: { scale: 1.08, backgroundColor: "#FFCC00" }
				time: 1
				curve: "spring(100, 10, 40)"
		
		if counter == 71
			working = false
		
customTime = 10
customSpring = "spring(40, 10, 10)"
# customSpring = "ease-in-out"
fadeCounter = 0

Utils.delay 7, ->
	for item in persons
		item.animate
			properties: { x: Utils.randomNumber(660, 710), y: Utils.randomNumber(360, 410)}
			time: customTime
			curve: customSpring
	
	for item in way
		item.animate
			properties: { x: Utils.randomNumber(660, 710), y: Utils.randomNumber(360, 410)}
			time: customTime
			curve: customSpring
	
	artist.animate
		properties: { scale: 1.4 }
		time: customTime
		curve: customSpring



getItem = (index) ->
	return persons[index]


for item in [way_1, way_2, way_3, way_4, way_5]
	item.parent = temp

for item in persons
	item.parent = temp

artist.parent = temp