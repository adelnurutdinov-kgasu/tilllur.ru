# localDisappearTime = 0.5
# localNewsDetailedAppearCurve = "cubic-bezier(.06,.81,0,.93)"
# localNewsDetailedCloseCurve = "cubic-bezier(.06,.81,.79,.99)"
localDisappearTime = 0.34
localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)"
localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)"

Artist = require "artist"
config = Artist.config


closeDetailedViewTwoWays = (newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color) ->
	closeDetailedView(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color, 1136)


closeDetailedViewOneWay = (newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color) ->
	closeDetailedView(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color, -1136)


closeDetailedView = (newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color, valueY) ->
	
	newsDetailedTopView.animate
		properties:
			y: -88*3
		time: localDisappearTime
		curve: localNewsDetailedCloseCurve
		
	newsDetailedContent.animate
		properties:
			y: valueY
		time: localDisappearTime
		curve: localNewsDetailedCloseCurve
	
	newsDetailedView.animate
		properties: { backgroundColor: "rgba(0,0,0,0)" }
		time: localDisappearTime
	
	status_bar_color.animate
		properties: { backgroundColor: Artist.colorTheme.navigation_header_background_color + "1)" }
		time: localDisappearTime / 2
	
	Utils.delay localDisappearTime+0.02, ->
		newsDetailedView.destroy()







exports.createNewsDetailedPage = (newsArtistModel, status_bar_color) ->
	# print newsArtistModel.image
	
	newsDetailedView = new Layer
		width: 640
		height: 1136
		backgroundColor: "rgba(0,0,0,0)"
	
	newsDetailedView.on Events.Tap, ->
		# skip taps

	newsDetailedTopView = new Layer
		parent: newsDetailedView
		width: 640
		height: 88*2
		y: -88*2
		backgroundColor: "transparent"
		image: newsArtistModel.image

	blurDetailedTopView = new Layer
		parent: newsDetailedTopView
		width: newsDetailedTopView.width
		height: newsDetailedTopView.height
		backgroundColor: Artist.colorTheme.navigation_blur_color

	blurDetailedTopView.style =
			'-webkit-backdrop-filter': Artist.colorTheme.navigation_blur_radius

	closeNewsDetailedTopView = new Layer
		width: 64*2
		height: 64*2
		x: 0
		y: 20*2
		backgroundColor: "rgba(0,0,0,0)"
		image: config + "/closeNewsPage.png"
		parent: newsDetailedTopView

	shareNewsDetailedTopView = new Layer
		width: 244
		height: 72
		x: 376
		y: 72
		image: config + "/shareNewsDetailedView.png"
		parent: newsDetailedTopView
	
	


	newsDetailedContent = new Layer
		width: 640
		height: 1136-88*2-60*2
		y: 1136
		parent: newsDetailedView
		scrollHorizontal: false
		directionLock: true
		backgroundColor: "rbga(0,0,0,0)"

	newsDetailedContentScroll = new ScrollComponent
		width: 640
		height: 1136-88*2-60*2
		parent: newsDetailedContent
		speedY: 0.8
		backgroundColor: "transparent"
		scrollHorizontal: false

	# newsDetailedContentImage = new Layer
# 		width: 640
# 		height: 480
# 		parent: newsDetailedContentScroll.content
# 		backgroundColor: "transparent"
# 		image: newsArtistModel.image

	newsDetailedContentTextView = new Layer
		width: 640
		height: 1680
		backgroundColor: "white"
		# y: newsDetailedContentImage.height
		parent: newsDetailedContentScroll.content

	newsDetailedContentTextImage = new Layer
		parent: newsDetailedContentTextView
		width: 640
		height: 1680
		backgroundColor: "white"
		image: newsArtistModel.textImage

	
	
	
	# opening animations
	
	newsDetailedTopView.animate
		properties:
			y: 0
		time: localDisappearTime
		curve: localNewsDetailedAppearCurve
	
	newsDetailedContent.animate
		properties:
			y: 88*2
		time: localDisappearTime
		curve: localNewsDetailedAppearCurve
		# curve: "cubic-bezier(.01,1,.78,.89)"
		
	newsDetailedView.animate
		properties:
			backgroundColor: "rgba(0,0,0,0.9)"
		time: localDisappearTime
		
	
	status_bar_color.animate
		properties: { backgroundColor: Artist.colorTheme.navigation_header_background_color + "0)" }
		time: localDisappearTime



	gapBottom = -860
	gapTop = 10
	gapDelta = 200
	
	isNewsViewModulating = false
	Utils.delay localDisappearTime, ->
		isNewsViewModulating = true
	
	
	
	# close view
	newsDetailedContentScroll.on Events.Move, (event, layer) ->
		
		if newsDetailedContentScroll.content.y > gapTop && isNewsViewModulating
			bounds = [gapTop, gapTop+gapDelta]
			newsDetailedTopView.y = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, -88], true) 
			closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true)
			shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true)
			localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true)
			newsDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")"
			localStatusBarArtist = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, 1], true)
			status_bar_color.backgroundColor = Artist.colorTheme.navigation_header_background_color + localStatusBarArtist + ")"
				
		if newsDetailedContentScroll.content.y < gapBottom && isNewsViewModulating
			bounds = [gapBottom, gapBottom-gapDelta]
			closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true)
			shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true)
			localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true)
			newsDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")"
			localStatusBarArtist = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0, 1], true)
			status_bar_color.backgroundColor = Artist.colorTheme.navigation_header_background_color + localStatusBarArtist + ")"
	
	
	
	newsDetailedContentScroll.on Events.Scroll, (event, layer) ->
		if newsDetailedContentScroll.content.y < gapBottom - gapDelta / 5 * 2
			newsDetailedContentScroll.ignoreEvents = true
			isNewsViewModulating = false
			closeDetailedViewOneWay(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color)
		
		if newsDetailedContentScroll.content.y > gapTop + gapDelta / 5 * 2
			newsDetailedContentScroll.ignoreEvents = true
			isNewsViewModulating = false
			closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color)
	
	
	closeNewsDetailedTopView.on Events.Tap, ->
		newsDetailedContentScroll.ignoreEvents = true
		isNewsViewModulating = false
		closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView, status_bar_color)
		
		newsDetailedView.animate
			properties:
				backgroundColor: "rgba(0,0,0,0)"
			time: localDisappearTime / 2
				
		
	
	
	return newsDetailedView