# This imports all the layers for "is-social-parse-likes" into isSocialParseLikesLayers
sketch = Framer.Importer.load "imported/is-social-parse-likes"



screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

temp = new Layer
	parent: screen
	width: 320*2, height: 568*2, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

heart = sketch["heart"]
content = sketch["content"]

sketch["instagram_more"].parent = temp
sketch["instagram_more"].originX = 0
sketch["instagram_more"].originY = 0
sketch["instagram_more"].scale = 0.5

heart.states.add({
		begin: {scale: 0.2, opacity: 0}
		liked: {scale: 1, opacity: 1}
		hide: {scale: 1, opacity: 0}
	})
heart.states.animationOptions = {
		curve: "spring(120, 15, 0)"
		time: 0.2
	}
heart.states.switchInstant("begin")

content.on Events.Click, ->
	isLiked = heart.states.switch("liked")
	isLiked.on "end", ->
		Utils.delay .3, ->
			heart.states.switch("hide")
		Utils.delay .52, ->
			heart.states.switchInstant("begin")
				
statusBar = new Layer
	width: screen.width
	height: 20, parent: screen
	backgroundColor: "rgba(217,235,166,1)"