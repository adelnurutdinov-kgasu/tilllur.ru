# Gradients

GradientModule = require "gradientData"

# https://www.dropbox.com/s/zkq5n5l6wtl3pm6/gradient.json?dl=0
# https://dl.dropboxusercontent.com/s/zkq5n5l6wtl3pm6/gradient.json

fakeParams = "json=https://dl.dropboxusercontent.com/s/zkq5n5l6wtl3pm6/gradient.json"
# print location.search[1..]

queryArray = location.search[1..].split('&')
queryArray = fakeParams.split('&')
# print queryArray
for item in queryArray
	keyValuePair = item.split("=")
	if keyValuePair[0] == "json"
# 		print "?"
		GradientModule.data = JSON.parse Utils.domLoadDataSync decodeURIComponent(keyValuePair[1])
# 		print GradientModule.data


screenGradients = []
for currentData in GradientModule.data
	screenGradients.push new Gradient {
		start: currentData.start
		end: currentData.end
		angle: currentData.angle
	}


screenGradients = [
	new Gradient
		start: "#7A7FDF"
		end: "#F08C84"
		angle: 45
	
# 	new Gradient
# 		start: "#30F"
# 		end: "#B8F"
# 		angle: -45
	
	new Gradient
		start: "#DE7364"
		end: "#E4C556"
		angle: -45
]


gradientView = new Layer
	width: 360
	height: 640

for currentGradient,i in screenGradients
	gradientView.states["#{i}"] = 
		gradient: currentGradient
		animationOptions:
			time: 20
			curve: Bezier.linear

delete gradientView.states.default

gradientView.on Events.StateSwitchEnd, (from, to) ->
	currentIndex = @stateNames.indexOf to
	currentIndex++
	if currentIndex >= @stateNames.length then currentIndex = 0
	@animate(@stateNames["#{currentIndex}"])

gradientView.stateSwitch(gradientView.stateNames[0])


temp = new Layer
	width: 360
	height: 640
	backgroundColor: null

gradientView.parent = temp

screenFix = new Layer
	parent: temp
	width: 360
	height: 620
	y: 20
	clip: true

screen = new Layer
	parent: screenFix
	y: -20
	width: 360
	height: 640
	image: "images/screen.png"



{ Preview } = require "PreviewComponent"
new Preview { view: temp, borderRadius: 12, topTheme: "light", forceAndroidBar: true }