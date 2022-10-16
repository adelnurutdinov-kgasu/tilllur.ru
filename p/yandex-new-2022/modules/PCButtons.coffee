
SVG = require "PCSVG"

# Text, Button

# fontAveria = Utils.loadWebFont("Nunito", 800)
# fontAveria = Utils.loadWebFont("Raleway", 700)
fontAveria = "Raleway"

class Text extends TextLayer
	constructor: (@options={}) ->
		
		_.defaults @options,
			fontFamily: fontAveria
			fontSize: 18
			weight: 700
			color: "white"
			height: 20
			letterSpacing: 0.7
			letterSpacing: 0.4
# 			textOverflow: "ellipsis"
		
		super @options

		@style =
			"font-family": "Raleway, 'PT Sans', 'Helvetica', 'Tahoma', sans-serif;"
			"font-weight": 700
			"-webkit-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"-moz-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"-ms-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
			"font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
		





class TextButton extends Text
	constructor: (@options={}) ->
		
		_.defaults @options,
			tuple: { normal: 0.8, hover: 0.5 }
			opacity: 0.5
			handler: null

		
		super @options
		@style = cursor: "pointer"
		
		@.onMouseOver @Hover
		@.onMouseOut @HoverOff
		
	Hover: =>
		@opacity = @tuple.hover
	HoverOff: =>
		@opacity = @tuple.normal
	
	updateTuple: (newTuple) =>
		@tuple = newTuple
		@emit Events.MouseOver
		@emit Events.MouseOut
	
	
	@define 'handler',
		set: (value) -> @on(Events.Tap, value)
	
	@define 'tuple',
		get: -> @options.tuple
		set: (value) ->
			@options.tuple = value




# Button: SVG

class SVGButton extends TextButton
	constructor: (@options={}) ->
		
		_.defaults @options,
			text: ""
			asset: null
			clip: false
			autoSize: false
		
		@svgShape = new SVGLayer
			backgroundColor: "null", name: "svgShape"
		
		super @options
		@svgShape.parent = @
		@updateSVGSize()
	
	
	@define 'asset',
		get: -> @options.asset
		set: (value) ->
			@options.asset = value
			@svgShape.states =
				"onDark": { svg: value.onDark }
				"onLight": { svg: value.onLight }
			@svgShape.stateSwitch("onDark")
	
	updateSVGSize: () =>
		@svgShape.width = @width
		@svgShape.height = @height
	




# Button: Copy

class CopyButton extends TextButton
	constructor: (@options={}) ->
		
		_.defaults @options,
			link: "https://tilllur.ru"
			handler: @copyHandler
		
		@area = new Layer
			opacity: 0, x: -3000, html: null
		
		super @options
		@area.parent = @
	
	
	@define 'link',
		get: -> @options.link
		set: (value) ->
			@options.link = value
			@update(value)
	
	
	update: (link) =>
		@area.html = "<textarea class='js-copytextarea-class' style='opacity:0;'>#{link}</textarea>"
	
	
	copyHandler: =>
		textDiv = @area.querySelector('.js-copytextarea-class')
		textDiv.focus()
		textDiv.select()
		document.execCommand 'copy'
		
		originTitle = @text
		@text = "Done 👌"
		Utils.delay 1, => @text = originTitle




module.exports = {Text, TextButton, SVGButton, CopyButton}







# /* wInformation Delivery in Yandex App */

# width: 715.65px;
# height: 32px;

# font-family: 'Raleway';
# font-style: normal;
# font-weight: 700;
# font-size: 18px;
# line-height: 32px;
# /* identical to box height, or 178% */
# display: flex;
# align-items: center;
# text-align: center;
# letter-spacing: 0.04em;
# font-feature-settings: 'ss09' on;

# color: #FFFFFF;


# /* Inside auto layout */
# flex: none;
# order: 1;
# flex-grow: 0;
