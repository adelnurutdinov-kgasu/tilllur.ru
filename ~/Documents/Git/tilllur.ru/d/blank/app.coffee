
screen = new Layer
	width: 375, height: 812, backgroundColor: "#222"
	borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", borderRadius: 42 

{ Preview } = require "PreviewComponent"
new Preview { view: screen, visible: false }


textTypes = 
	api: "Internal API Restriction"
	temp: "Temporarily Unavailable"

descriptionText = textTypes.temp

for item in location.search[1..].split('&')
	keyValuePair = item.split("=")
	keyPart = keyValuePair[0]
	valuePart = keyValuePair[1]
	
	if keyPart == "reason"
		if valuePart == "api" then descriptionText = textTypes.api



fontAveria = Utils.loadWebFont("Nunito", 800)

class PCText extends TextLayer
	constructor: (@options={}) ->
		
		_.defaults @options,
			fontFamily: fontAveria
			fontSize: 18
			color: "white"
			height: 20
			letterSpacing: 0.7
			letterSpacing: 0.4
# 			textOverflow: "ellipsis"
		
		super @options


title = new PCText
	parent: screen
	text: "NDA"
	fontSize: 36, height: 40
	x: Align.center, y: Align.center(-20)

description = new PCText
	parent: screen
	text: descriptionText
	x: Align.center, y: Align.center(20)
	opacity: 0.3


