Framer.Device.contentScale = 2

# This imports all the layers for "fs-ios-trailsee-framer" into fsIosTrailseeFramerLayers
fsIosTrailseeFramerLayers = Framer.Importer.load "imported/fs-ios-trailsee-framer"

spinner = fsIosTrailseeFramerLayers["spinner"]

spin = () ->
	spinner.rotation = 0
	spinner.animate
		properties:
			rotation: -1080
		time: 2
		curve: "linear"
	Utils.delay 2, ->
		spin()

spin()