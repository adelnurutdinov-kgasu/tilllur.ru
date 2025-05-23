

{PreviewClass5} = require "PreviewClass5"


class exports.PreviewClass6 extends PreviewClass5
	constructor: (@options={}) ->

		treeViewLayer = new Layer
			width: 320
			height: 0
			backgroundColor: "#222"
			

		_.defaults @options,
			treeView: treeViewLayer
			indent: 1
		
		super @options

		treeViewLayer.parent = @parent

	
	@define 'treeView',
		get: -> @options.treeView
		set: (value) -> @options.treeView = value
	
	@define 'indent',
		get: -> @options.indent
		set: (value) -> @options.indent = value
	



	printNode: (node, level) =>
		if node.name == "" then layerName = "Untitled" else layerName = node.name
		print Array(level + 1).join(" ・ ") + " #{layerName}"

		treeNodeLayer = new TextLayer
			parent: @treeView
			text: Array(level + 1).join(" ・ ") + " #{layerName}"
			
			fontSize: 15
			fontWeight: 500
			color: "white"

			width: 320, height: 28
			y: @treeView.height
			# backgroundColor: Utils.randomColor()
			backgroundColor: null
			custom:
				layer: node
		
		treeNodeLayer.onTap ->
			print "#{@custom.layer.name} x: #{@custom.layer.x} y: #{@custom.layer.y} size: #{@custom.layer.width}x#{@custom.layer.height}"

		
		@treeView.height += 28


		if node.children.length > 0
			nextLevel = level + 1
			for childNode in node.children
				@printNode(childNode, nextLevel)
		
