
{Slider1} = require "PCSlider1"


SlideTemplate = require("PCSlide")
Slide = SlideTemplate.Slide
SimpleVideoSlide = SlideTemplate.SimpleVideoSlide
VideoSlide = SlideTemplate.VideoSlide
HDVideoSlide = SlideTemplate.HDVideoSlide

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



	bgVideoSlide: (sourceURL = null) =>
		slide = new SimpleVideoSlide
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		@videoSlides.push slide
		return slide
	
	videoSlide: (sourceURL = null) =>
		slide = new HDVideoSlide
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

	
	
	
	
	


	prototypeSlide: (sourceURL = null) =>
		slide = new PrototypeSlide
			parent: @content
		
		if sourceURL != null then slide.source(sourceURL)
		return slide