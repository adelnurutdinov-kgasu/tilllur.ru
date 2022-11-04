screen = new Layer
	width: 360
	height: 640

# Screen
chats_some_people = new Layer
	parent: screen
	width: 360
	height: 640
	image: "images/chats%20some%20people.png"

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "white"

gSpeed = 100
SIZE = 64
PADDING = 20

# Create View



create = (index = 0) ->
	if index > 2 or index < 0 then index = 0
	choices = [10*index...10*(index+1)]
	
	view = new Layer
		parent: screen
		width: SIZE * 10 + PADDING * 9
		height: SIZE
		backgroundColor: "null"
	
	for i in [0...10]
		# print "images/avatars/avatar" + choices[i] + ".jpg"
		new Layer
			parent: view
			x: i * (SIZE + PADDING)
			size: SIZE
			borderRadius: "100%"
			image: "images/avatars/avatar" + choices[i] + ".jpg"
	
	return view


avatarView1 = new ScrollComponent
	parent: screen
	width: 360
	height: SIZE
	y: 36
	contentInset:
		left: SIZE / 2
		right: SIZE / 2

[a1View1, a1View2] = [create(0), create(0)]
a1View1.parent = avatarView1.content
a1View2.parent = avatarView1.content
a1View2.x = a1View1.width + PADDING

avatarView1.updateContent()



avatarView3 = new ScrollComponent
	parent: screen
	width: 360
	height: SIZE
	y: 204
	contentInset:
		left: SIZE / 2
		right: SIZE / 2

[a1View1, a1View2] = [create(1), create(1)]
a1View1.parent = avatarView3.content
a1View2.parent = avatarView3.content
a1View2.x = a1View1.width + PADDING

avatarView3.updateContent()



avatarView2 = new ScrollComponent
	parent: screen
	width: 360
	height: SIZE
	y: 120
	contentInset:
		left: SIZE / 2
		right: SIZE / 2

[a1View1, a1View2] = [create(2), create(2)]
a1View1.parent = avatarView2.content
a1View2.parent = avatarView2.content
a1View2.x = a1View1.width + PADDING

avatarView2.updateContent()



scrollToStart = (scrollLayer) ->
	scrollLayer.scrollToPoint(
		x: 100-PADDING, y: 0
		false
	)
	scrollToFinish(scrollLayer)

scrollToFinish = (scrollLayer) =>
	scrollLayer.scrollToPoint(
		x: scrollLayer.content.children[0].width + 100, y: 0
		true
		curve: Bezier.linear, time: gSpeed, delay: 0
	)
	Utils.delay gSpeed, ->
		scrollToStart(scrollLayer)


scrollToStart(avatarView1)
scrollToStart(avatarView3)



scrollToStart2 = (scrollLayer) ->
	scrollLayer.scrollToPoint(
		x: scrollLayer.content.children[0].width + 100, y: 0
		false
	)
	scrollToFinish2(scrollLayer)

scrollToFinish2 = (scrollLayer) =>
	scrollLayer.scrollToPoint(
		x: 100-PADDING, y: 0
		true
		curve: Bezier.linear, time: gSpeed, delay: 0
	)
	Utils.delay gSpeed, ->
		scrollToStart2(scrollLayer)

scrollToStart2(avatarView2)






{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 8, topTheme: "light", forceAndroidBar: true }