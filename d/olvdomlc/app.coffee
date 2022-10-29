Framer.Extras.Hints.disable()
document.body.style.cursor = "auto"
Screen.backgroundColor = "#222"
Utils.insertCSS('@import url(css/project.css)')


data =
	image: "images/example.png"
	name: "Ёжики"

screen = new Layer
	width: 360
	height: 640

{ Preview } = require "PreviewComponent"
preview = new Preview { view: screen, borderRadius: 16, forceAndroidBar: true }

screen.borderRadius = 16
screen.clip = true
preview.clip = false

# Image

image = new Layer
	parent: screen
	width: 360
	height: 640
	image: "images/screen.png"
	borderRadius: 8
	originY: 0
	originX: 0

image.states =
	"hidden":
		scale: 1
	"shown":
		scale: 1.8
image.stateSwitch("hidden")

button = new TextLayer
	parent: preview
	text: "x2"
	textAlign: "center"
	fontFamily: "YS Web Regular"
	padding: 
		top: 6
	fontSize: 16
	borderRadius: "100%"
	backgroundColor: "white"
	width: 32
	height: 32
	y: Align.top(-60)
	x: Align.right(-5)

button.states =
	"hidden":
		opacity: 1
	"shown":
		opacity: 0.3
button.stateSwitch("hidden")


button.onTap ->
	nextState = "hidden"
	if @states.current.name == "hidden" then nextState = "shown"
	@animate(nextState, time: 0.5)
	image.animate(nextState, time: 0.5)


url = "https://images.unsplash.com/photo-1472195870936-d88b0d4c1b41?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ%3D%3D&s=f1abbd4d59a9b448813cb48769806ada"



appIconSize = 48

# Pre/Post

linePrefix = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
	<defs>
		<mask id="image-mask">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M2.04528 6.84503C0 10.2283 0 14.8189 0 24C0 33.1811 0 37.7716 2.04528 41.1549C3.23308 43.1199 4.88017 44.7669 6.84503 45.9547C10.2283 48 14.8189 48 24 48C33.1811 48 37.7716 48 41.1549 45.9547C43.1199 44.7669 44.7669 43.1199 45.9547 41.1549C48 37.7716 48 33.1811 48 24C48 14.8189 48 10.2283 45.9547 6.84503C44.7669 4.88017 43.1199 3.23308 41.1549 2.04528C37.7716 0 33.1811 0 24 0C14.8189 0 10.2283 0 6.84503 2.04528C4.88017 3.23308 3.23308 4.88017 2.04528 6.84503Z"/>
		</mask>
	</defs>
	<image width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xlink:href="
"""


linePostfix = """" mask="url(#image-mask)"></image>
</svg>
"""

statusBar = new Layer
	parent: screen
	width: screen.width
	height: 24
	backgroundColor: "white"


fix = new Layer
	parent: image
	size: 32
	y: 184 + 7
	x: 28+7
	backgroundColor: "#F5F5F5"

appView = new Layer
	parent: image
	size: 48
	y: 184
	x: 28
	backgroundColor: null

appIcon = new SVGLayer
	parent: appView
	size: 48
	scale: 0.6667
	svg: linePrefix + data.image + linePostfix
# 	opacity: 0

appIcon.center()
# print linePrefix

# Upload Button
uploadButton = new Layer
	parent: preview
	width: 200
	height: 40
	clip: true
	backgroundColor: "null"
	y: Align.top(-60)

inputLayer = new Layer
# 	x: -4
	y: -4
	parent: uploadButton
	opacity: 0.5
	backgroundColor: "null"
	html: "<input id='myInput' multiple type='file' accept='image/png, image/jpeg, image/jpg' style='background-color: rgba(255, 0, 0, 0); height: 100px; width: 200px;'>"


Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "change", ->
	fileList = inputLayer.querySelector("#myInput").files
	
	for file, i in fileList
		data.image = URL.createObjectURL(file)
		data.name = file.name.split('.').slice(0, -1).join('.')
		
		appIcon.svg = linePrefix + data.image + linePostfix
		text.text = data.name
	
# 	addToCenter(groupView.children)

fix = new Layer
	parent: appView
	x: -8
	width: 64
	height: 20
	y: 48 + 4
	backgroundColor: "white"

text = new TextLayer
	parent: appView
	text: data.name
	textAlign: "center"
	fontFamily: "YS Web Regular"
	width: 64
	x: -(64-48)/2
	fontSize: 12
	color: "black"
	y: 48+4


