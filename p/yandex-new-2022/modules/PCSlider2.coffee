
{Slider1} = require "PCSlider1"


SlideTemplate = require("PCSlide")
Slide = SlideTemplate.Slide
SimpleVideoSlide = SlideTemplate.SimpleVideoSlide
VideoSlide = SlideTemplate.VideoSlide
HDVideoSlide = SlideTemplate.HDVideoSlide
PhoneVideoSlideCenter = SlideTemplate.PhoneVideoSlideCenter

PrototypeSlide = SlideTemplate.PrototypeSlide


class exports.Slider2 extends Slider1
	constructor: (@options={}) ->
		
		_.defaults @options,
			videoSlides: []
		
		super @options
	
	@define 'videoSlides',
		get: -> @options.videoSlides
	
	
	
	
	
	slide: (sourceURL = null) =>
		slide = new Slide
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		return slide
	

	slideWithIndex: (imageIndex = 0) =>
		if imageIndex == 0 then print "Slide index is 0"

		slide = new Slide
			parent: @content
		
		slide.image = "images/page#{@leadZero(imageIndex)}.png"
		return slide



	bgVideoSlide: (sourceURL = null) =>
		slide = new SimpleVideoSlide
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		@videoSlides.push slide
		return slide

	fullVideoSlide: (sourceURL = null) =>
		slide = new VideoSlide
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		@videoSlides.push slide
		return slide
	


	previewVideoSlide: (sourceURL = null) =>
		slide = new HDVideoSlide
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		@videoSlides.push slide
		return slide
	
	previewVideoSlideScaled: (sourceURL = null) =>
		slide = @previewVideoSlide(sourceURL)
		
		slide.videoView.originY = 0
		slide.videoView.y = 0
		slide.videoView.scale = 2800 / 1920
		slide.videoView.borderRadius = 0

		return slide
	


	phoneVideoSlide: (sourceURL = null) =>
		slide = new PhoneVideoSlideCenter
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		@videoSlides.push slide
		return slide

	
	
	
	
	


	prototypeSlide: (sourceURL = null) =>
		slide = new PrototypeSlide
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		return slide