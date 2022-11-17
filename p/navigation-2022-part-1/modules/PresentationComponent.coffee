
# {Slider0} = require "PCSlider0" 	# Scale / URL
# {Slider1} = require "PCSlider1"	# Panels
# {Slider2} = require "PCSlider2"	# Create Slide
# {Slider3} = require "PCSlider3"	# Shortcuts
# {Slider4} = require "PCSlider4"	# Background Pause for Videos
# {Slider5} = require "PCSlider5"	# Playing Video
# {SliderPinch} = require "PCSliderPinch"	# Pinch
{SliderGrid} = require "PCSliderGrid"	# Pinch

class FixPresentationExport extends SliderGrid
# class FixPresentationExport extends SliderPinch
# class FixPresentationExport extends Slider0
class exports.Presentation extends FixPresentationExport


	



# slider = new Presentation (title: "Development")

# Images
# slider.slideWithIndex(index)
# slider.slide().randomColor()
# slider.slide("images/title%20overlay.png")

# Hierarchy
# slider.slide().overlay("images/title%20overlay.png")
# slider.slide().background("images/title%20overlay.png")
# slider.slide().blend("images/title%20overlay.png")


# Link
# slider.slide().link("https://tilllur.ru/d/qyvtkgju/index.html")
# slider.slide().link("https://tilllur.ru/d/qyvtkgju/index.html", "Link Title")
# ------ slider.slide().link("https://tilllur.ru/d/qyvtkgju/index.html", "Link Title", type1)


# Video 1400x900 — Fullscreen +/- Controls
# slider.fullVideoSlide("https://tilllur.ru/mp4/yaru.mp4")
# slider.bgVideoSlide("https://tilllur.ru/mp4/yaru.mp4")

# Video 1920x1080 — Crop & Controls
# slider.previewVideoSlide("https://tilllur.ru/mp4/yaru.mp4")
# slider.previewVideoSlideScaled("https://tilllur.ru/mp4/yaru.mp4")

# Audio
# slider.bgVideoSlide().mute(false)
# slider.bgVideoSlide().loop(false)


# Prototype
# slider.prototypeSlide("https://tilllur.ru/d/qyvtkgju/index.html").sized()
# slider.prototypeSlide("https://tilllur.ru/d/qyvtkgju/index.html").sized(390, 844)


# Decode
# ffmpeg -i input.mp4 -c:v libx264 -profile:v main -vf format=yuv420p -c:a aac -movflags +faststart output.mp4
# ffmpeg -i output.mp4 -filter:v "crop=1680:1080:120:0" -c:a copy crop.mp4
# ffmpeg -i crop.mp4 -vf eq=contrast=1.1 -c:a copy contrast.mp4



