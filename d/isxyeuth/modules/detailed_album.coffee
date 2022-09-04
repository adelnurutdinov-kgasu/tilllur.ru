SongCreator = require 'create_song'

# Compose Detailed View	

exports.createDetailedAlbumPage = (albumID, offsetValue) ->
	
	detailedAlbumView = new Layer
		width: 640
		height: 1136
		backgroundColor: "null"
	
	detailedAlbumView.on Events.Tap, ->
		# ignore other taps


	album_fake_image = new Layer
		parent: detailedAlbumView
		width: 480
		height: 480
		x: 80
		y: 222 + offsetValue
		image: "images/albums/#{albumID}.jpg"
	
	album_fake_image.animate
		properties:
			width: 640, height: 640, x: 0, y: 0
		time: 0.2
		curve: "ease-in-out"

	album_fake_image_darker = new Layer
		parent: album_fake_image
		opacity: 0
		width: 640
		height: 640
		backgroundColor: "rgba(0,0,0,0.5)"
	
	album_fake_image_darker.animate
		properties: { opacity: 1 }
		time: 1
		delay: 0.2



	
	albumSongsView = new Layer
		parent: detailedAlbumView
		width: 640
		height: 708
		y: 1136
		image: "images/albums/#{albumID}.jpg"
	
	albumSongsView.animate
		properties:
			y: 308
		time: 0.3
		curve: "spring(100, 20, 1)"
		delay: 0.1
	
	blur = new Layer
		width: 640
		height: 1136
		parent: albumSongsView
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
		
	blur.style =
		'-webkit-backdrop-filter': 'blur(10px)'

	
	



	# Compose song for album
	songsScrollView = new ScrollComponent
		width: 640
		height: 708
		scrollHorizontal: false
		parent: albumSongsView
		y: 20
		speedY: 0.8

	songs = SongCreator.createSongsForAlbum(albumID)
	for song,i in songs
		song.y = i * 132
		song.parent = songsScrollView.content
	
		song.on Events.Tap, (event, layer) ->
			# song is playing here

	# Close Album View
	closingAlbumView = false
	
	songsScrollView.on Events.Scroll, ->
		if songsScrollView.content.y > 0
			album_fake_image_darker.opacity = Utils.modulate(songsScrollView.content.y, [0, 150], [1, 0])
		
		if songsScrollView.content.y > 150
			closingAlbumView = true
			
			albumSongsView.animate
				properties:
					y: 1136
				time: 0.3
				curve: "spring(100, 20, 1)"
				delay: 0.1
			
			album_fake_image.animate
				properties:
					width: 480, height: 480, x: 80, y: 222 + offsetValue
				time: 0.2
				curve: "ease-in-out"
			
			album_fake_image_darker.animate
				properties:
					opacity: 0
				time: 0.2
			
			Utils.delay 0.3, ->
				detailedAlbumView.destroy()
	
# 	
# 	albumSongsScrollStarted = false
# 	songsScrollView.on Events.ScrollStart, ->
# 		albumSongsScrollStarted = true
# 	songsScrollView.on Events.ScrollEnd, ->
# 		albumSongsScrollStarted = false
	
	songsScrollView.on Events.Move, ->
		if songsScrollView.content.y > 0 and !closingAlbumView
			album_fake_image_darker.opacity = Utils.modulate(songsScrollView.content.y, [0, 150], [1, 0])
	
	
	album_fake_image_darker.on Events.Tap, ->
		closingAlbumView = true
		
		albumSongsView.animate
			properties:
				y: 1136
			time: 0.3
			curve: "spring(100, 20, 1)"
			delay: 0.1
		
		album_fake_image.animate
			properties:
				width: 480, height: 480, x: 80, y: 222 + offsetValue
			time: 0.2
			curve: "ease-in-out"
		
		album_fake_image_darker.animate
			properties:
				opacity: 0
			time: 0.2
		
		Utils.delay 0.3, ->
			detailedAlbumView.destroy()
	
	

	return detailedAlbumView