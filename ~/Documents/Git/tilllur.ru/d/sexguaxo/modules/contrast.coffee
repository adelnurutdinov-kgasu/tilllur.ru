exports.getColorContrastOf = (color1, color2) ->

	# Color 1

	L1R = color1.r
	if L1R <= 0.03928
		L1R = color1.r / 12.92;
	else
		L1R = Math.pow(((L1R + 0.055) / 1.055), 2.4)

	L1G = color1.g
	if (L1G <= 0.03928)
		L1G = color1.g / 12.92
	else 
		L1G = Math.pow(((L1G + 0.055) / 1.055), 2.4)

	L1B = color1.b
	if (L1B <= 0.03928)
		L1B = color1.b / 12.92
	else
		L1B = Math.pow(((L1B + 0.055) / 1.055), 2.4)

	# Color 2

	L2R = color2.r
	if (L2R <= 0.03928)
		L2R = color2.r / 12.92
	else
		L2R = Math.pow(((L2R + 0.055) / 1.055), 2.4)

	L2G = color2.g
	if (L2G <= 0.03928)
		L2G = color2.g / 12.92
	else
		L2G = Math.pow(((L2G + 0.055) / 1.055), 2.4)

	L2B = color2.b
	if (L2B <= 0.03928)
		L2B = color2.b / 12.92
	else
		L2B = Math.pow(((L2B + 0.055) / 1.055), 2.4)

	L1 = 0.2126 * L1R + 0.7152 * L1G + 0.0722 * L1B
	L2 = 0.2126 * L2R + 0.7152 * L2G + 0.0722 * L2B
	
# 	print L1 + " " + L2
	# Make sure L1 is the lighter color

	if L1 <= L2
		temp = L2;
		L2 = L1;
		L1 = temp;

	# Calculate contrast

	cr = ((L1 + 0.05) / (L2 + 0.05)).toFixed(1)

	return cr


exports.getLightenValue = (color) ->
	baseColor = color
	baseColorFixed = color
	
	correctIndex = 0
	for i in [0...100]
		correctIndex = i
		baseColorFixed = baseColor.lighten(i)
		cv = @.getColorContrastOf(baseColor, baseColorFixed)
		if cv > 10
			break
	
	return correctIndex

exports.getDarkenValue = (color) ->
	baseColor = color
	baseColorFixed = color
	
	correctIndex = 0
	for i in [10...100]
		correctIndex = i
		baseColorFixed = baseColor.darken(i)
		cv = @.getColorContrastOf(baseColor, baseColorFixed)
		if cv > 3
			break
	
	return correctIndex


exports.returnContentColor = (color) ->
	# cv1 = @.getColorContrastOf(color, new Color("#000"))
# 	cv2 = @.getColorContrastOf(color, new Color("#FFF"))
	returnColor = "rgba(255,255,255,0.1)"
	
	# if cv1 > cv2
# 		returnColor = "rgba(0,0,0,0.08)"
# 	else
# 		returnColor = "rgba(255,255,255,0.1)"
	
	# print returnColor
	return new Color(returnColor)


exports.returnTextColor = (color) ->
	
	cv1 = @.getColorContrastOf(color, new Color("#000"))
	cv2 = @.getColorContrastOf(color, new Color("#FFF"))

	localFontColor = color
	changedValue = 0
	
	# fix for black colors
	if color.h < 0.0001 and color.l < 0.14
		localFontColor = new Color("#FFF")
		changedValue = @.getDarkenValue(localFontColor)
		
		if typeof changedValue != "undefined" && changedValue != null
			changedValue = 50
		localFontColor = localFontColor.darken(changedValue)
	
	else if color.h > 200
		localFontColor = new Color("#FFF")
		changedValue = @.getDarkenValue(localFontColor)
		localFontColor = localFontColor.darken(changedValue)
	
	else if cv1 < cv2
		changedValue = @.getLightenValue(localFontColor)
		localFontColor = localFontColor.lighten(changedValue)
	else
		changedValue = @.getDarkenValue(localFontColor)
		localFontColor = localFontColor.darken(changedValue)
	
	return localFontColor