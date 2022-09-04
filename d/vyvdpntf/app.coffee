
screen = new Layer
	width: 414, height: 736, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "dark", forceAndroidBar: true }

retina = 1
colorLiked = "#46A16A"
colorZero = "rgba(0,0,0,0)"
colorDisliked = "#DC3F39"
colorGrey = "#EDEDED"
cellWidth = 50
lastChoice = 0

# Dirty
post1 = new Layer width: 414*retina, height: 115*retina, image: "images/post1.png", x: 0*retina, y: 64*retina, opacity: 1
post2 = new Layer width: 394*retina, height: 91*retina, image: "images/post2.png", x: 20*retina, y: 179*retina, opacity: 1
commentsblock = new Layer width: 414*retina, height: 49*retina, image: "images/commentsblock.png", x: 0*retina, y: Screen.height - 49*retina, opacity: 1
navbar = new Layer width: 414*retina, height: 64*retina, image: "images/navbar.png", x: 0*retina, y: 0*retina, opacity: 1

postDraggableBgLeft = new Layer width: (414+100*2)*retina / 2 , height: 115*retina, y: 270*retina, opacity: 1, x: -100*retina, backgroundColor: colorGrey
postDraggableBgRight = new Layer width: (414+100*2)*retina / 2, height: 115*retina, y: 270*retina, opacity: 1, x: (414+100*2)*retina / 4, backgroundColor: colorGrey




postDraggable = new Layer width: (414+cellWidth*2)*retina, height: 115*retina, y: 270*retina, opacity: 1, x: -100*retina, backgroundColor: colorZero

postDraggableAreaLiked = new Layer width: cellWidth*retina, height: 115*retina, superLayer: postDraggable, backgroundColor: colorLiked, opacity: 0
postDraggableAreaDisliked = new Layer width: cellWidth*retina, height: 115*retina, superLayer: postDraggable, backgroundColor: colorDisliked, x: postDraggable.width - cellWidth*retina, opacity: 0

post3 = new Layer width: 414*retina, height: 115*retina, image: "images/post3.png", x: 0*retina, y: 0, opacity: 1, x: 100*retina, superLayer: postDraggable
badgeLiked = new Layer width: 6*retina, height: postDraggableAreaLiked.height*retina, x: 0*retina, y: 0*retina, opacity: 1, backgroundColor: colorZero, superLayer: post3
badgeDisliked = new Layer width: 6*retina, height: postDraggableAreaLiked.height*retina, x: post3.width - 6*retina, y: 0*retina, opacity: 1, backgroundColor: colorZero, superLayer: post3

counterLabel = new Layer
	superLayer: post3
	x: 364*retina
	y: 11*retina
	width: 40*retina
	height: 17*retina
	image: "images/zero.png"

postDraggable.draggable.enabled = true
postDraggable.draggable.horizontal = true
postDraggable.draggable.vertical = false

postDraggable.draggable.constraints = {
    x: -100*retina
    y: 0
    width: (414+cellWidth*2) * retina
    height: 115*retina
}


refreshBg = () ->
	if lastChoice == 1
			postDraggableAreaDisliked.opacity = 0
			postDraggableBgLeft.backgroundColor = colorLiked
			postDraggableBgRight.backgroundColor = colorGrey
		else if lastChoice == -1
			postDraggableAreaLiked.opacity = 0
			postDraggableBgLeft.backgroundColor = colorGrey
			postDraggableBgRight.backgroundColor = colorDisliked
		else
			postDraggableAreaLiked.opacity = 0
			postDraggableAreaDisliked.opacity = 0
			postDraggableBgLeft.backgroundColor = colorGrey
			postDraggableBgRight.backgroundColor = colorGrey


postDraggable.on Events.Move, ->
	startPosition = -cellWidth*2*retina
# 	print "st pos: " + startPosition + " and current is " + postDraggable.x

	if postDraggable.x > startPosition + 80*retina
# 		print "OK"
		lastChoice = 1
		refreshBg()
		
		counterLabel.image = "images/plus.png"
		postDraggableAreaLiked.opacity = 1
		badgeLiked.backgroundColor = colorLiked
		badgeDisliked.backgroundColor = colorZero
# 		postDraggableBg.backgroundColor = colorLiked
	else if postDraggable.x < startPosition - 80*retina
# 		print "OP"
		lastChoice = -1
		refreshBg()
		
		counterLabel.image = "images/minus.png"
		postDraggableAreaDisliked.opacity = 1
		badgeDisliked.backgroundColor = colorDisliked
		badgeLiked.backgroundColor = colorZero
# 		postDraggableBg.backgroundColor = colorDisliked
	if postDraggable.x < startPosition + 2*retina and postDraggable.x > startPosition - 2*retina
		refreshBg()
		

postDraggable.on Events.DragEnd, ->
	startPosition = -cellWidth*retina	
	if postDraggable.x < startPosition + 2*retina and postDraggable.x > startPosition - 2*retina
		refreshBg()
		postDraggableBg.backgroundColor = colorGrey

# postDraggable.on Events.TouchEnd, ->


for item in [post1, post2, commentsblock, navbar, postDraggableBgLeft, postDraggableBgRight, postDraggable]
	item.parent = screen

statusBar = new Layer
	parent: screen
	width: screen.width, height: 24
	backgroundColor: "rgba(255,207,0,1)"