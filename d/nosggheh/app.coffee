
screen = new Layer
	width: 375, height: 812

{ Preview } = require "PreviewComponent"
new Preview { view: screen }

box = new Layer
	parent: screen, backgroundColor: "red"