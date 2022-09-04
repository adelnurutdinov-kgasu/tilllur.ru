# localDisappearTime = 0.5
# localNewsDetailedAppearCurve = "cubic-bezier(.06,.81,0,.93)"
# localNewsDetailedCloseCurve = "cubic-bezier(.06,.81,.79,.99)"
localDisappearTime = 0.34
localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)"
localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)"


closeDetailedViewTwoWays = (newsDetailedTopView, newsDetailedContent, newsDetailedView) ->
	newsDetailedTopView.animate
		properties:
			y: -88*3
		time: localDisappearTime
		curve: localNewsDetailedCloseCurve
		
	newsDetailedContent.animate
		properties:
			y: 1136
		time: localDisappearTime
		curve: localNewsDetailedCloseCurve
	
	Utils.delay localDisappearTime+0.02, ->
		newsDetailedView.destroy()


closeDetailedView = (newsDetailedView) ->
	moreTime = 1.4
	newsDetailedView.animate
		properties:
			y: -1136
		time: localDisappearTime * moreTime
		curve: localNewsDetailedCloseCurve
	
	Utils.delay localDisappearTime * moreTime + 0.02, ->
		newsDetailedView.destroy()







exports.createNewsDetailedPage = (newsDataModel) ->
	# print newsDataModel.image
	
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
		image: newsDataModel.image

	blurDetailedTopView = new Layer
		parent: newsDetailedTopView
		width: newsDetailedTopView.width
		height: newsDetailedTopView.height
		backgroundColor: "rgba(0,0,0,0.5)"

	blurDetailedTopView.style =
			'-webkit-backdrop-filter': 'blur(20px)'

	closeNewsDetailedTopView = new Layer
		width: 64*2
		height: 64*2
		x: 0
		y: 20*2
		backgroundColor: "rgba(0,0,0,0)"
		image: "images/closeNewsPage.png"
		parent: newsDetailedTopView

	shareNewsDetailedTopView = new Layer width: 244, height: 72, x: 376, y: 72, image: "images/shareNewsDetailedView.png", parent: newsDetailedTopView
	
	


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

	newsDetailedContentImage = new Layer
		width: 640
		height: 480
		parent: newsDetailedContentScroll.content
		backgroundColor: "transparent"
		image: newsDataModel.image

	newsDetailedContentTextView = new Layer
		width: 640
		height: 1400
		backgroundColor: "white"
		y: newsDetailedContentImage.height
		parent: newsDetailedContentScroll.content

	newsDetailedContentTextImage = new Layer
		parent: newsDetailedContentTextView
		width: 640
		height: 1440
		backgroundColor: "white"
		image: newsDataModel.textImage

	
	
	
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




	gapBottom = -1040
	gapTop = 10
	gapDelta = 110
	
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
				
		if newsDetailedContentScroll.content.y < gapBottom && isNewsViewModulating
			bounds = [gapBottom, gapBottom-gapDelta]
			closeNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true)
			shareNewsDetailedTopView.opacity = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [1, 0.1], true)
			localBackgroundOpacityValue = Utils.modulate(newsDetailedContentScroll.content.y, bounds, [0.9, 0], true)
			newsDetailedView.backgroundColor = "rgba(0,0,0," + localBackgroundOpacityValue + ")"
			
	
	newsDetailedContentScroll.on Events.Scroll, (event, layer) ->
		if newsDetailedContentScroll.content.y < gapBottom - gapDelta
			newsDetailedContentScroll.ignoreEvents = true
			isNewsViewModulating = false
			closeDetailedView(newsDetailedView)			
		
		if newsDetailedContentScroll.content.y > gapTop + gapDelta
			newsDetailedContentScroll.ignoreEvents = true
			isNewsViewModulating = false
			closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView)
	
	
	closeNewsDetailedTopView.on Events.Tap, ->
		newsDetailedContentScroll.ignoreEvents = true
		isNewsViewModulating = false
		closeDetailedViewTwoWays(newsDetailedTopView, newsDetailedContent, newsDetailedView)
		
		newsDetailedView.animate
			properties:
				backgroundColor: "rgba(0,0,0,0)"
			time: localDisappearTime / 2
				
		
	
	
	return newsDetailedView