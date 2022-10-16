
{Slider1} = require "PCSlider1"


SlideTemplate = require("PCSlide")
Slide = SlideTemplate.Slide
SimpleVideoSlide = SlideTemplate.SimpleVideoSlide
VideoSlide = SlideTemplate.VideoSlide
PrototypeSlide = SlideTemplate.PrototypeSlide


class exports.Slider2 extends Slider1
	constructor: (@options={}) ->
		
		_.defaults @options,
			videoSlides: []
		
		super @options
	
	@define 'videoSlides',
		get: -> @options.videoSlides
	
	
	
	
	
	slide: (named = "") =>
		return new Slide
			parent: @content
	
	
	videoSlide: (name = "") =>
		slide = new VideoSlide
			parent: @content
		
		@videoSlides.push slide
		return slide
	
	simpleVideoSlide: (name = "") =>
		slide = new SimpleVideoSlide
			parent: @content
		
		@videoSlides.push slide
		return slide
	
	
	prototypeSlide: (name = "") =>
		return new PrototypeSlide
			parent: @content