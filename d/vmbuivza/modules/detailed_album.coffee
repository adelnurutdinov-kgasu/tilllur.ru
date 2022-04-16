Data = require 'data'
SongCreator = require 'create_song'
# SongPlayer = require 'play_song'
{TextLayer} = require "text"


localDisappearTime = 0.2
localNewsDetailedAppearCurve = "cubic-bezier(.32,.92,.92,.99)"
localNewsDetailedCloseCurve = "cubic-bezier(.32,.92,.92,.99)"


animateDetailedAlbumPage = (songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY) ->
	
	album_fake_image.width = Utils.modulate(songsScrollView.content.y, bounds, [640, offsetValue.width], true)
	album_fake_image.height = Utils.modulate(songsScrollView.content.y, bounds, [640, offsetValue.height], true)
	album_fake_image.x = Utils.modulate(songsScrollView.content.y, bounds, [0, offsetValue.x], true)
	album_fake_image.y = Utils.modulate(songsScrollView.content.y, bounds, [0, offsetValue.y], true)
	
	album_fake_image_darker.opacity = Utils.modulate(songsScrollView.content.y, bounds, [1, 0.4])
	album_fake_image_darker.width = album_fake_image.width
	album_fake_image_darker.height = album_fake_image.height
		
	localColor = Utils.modulate(songsScrollView.content.y, bounds, [0.8, 0], true)
	detailedAlbumView.backgroundColor = "rgba(0,0,0," + localColor + ")"
	
	for item,i in albumOptions
		item.opacity = Utils.modulate(songsScrollView.content.y, bounds, [1, 0.4])
		item.y = Utils.modulate(songsScrollView.content.y, bounds, [albumOptionsY[i], albumOptionsY[i]+offsetValue.y / 2 + (i+1) * 20])


closeDetailedAlbumPage = (albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions) ->
	
	albumSongsView.animate
		properties:
			y: 1136
		time: localDisappearTime
		curve: localNewsDetailedCloseCurve
	
	album_fake_image.animate
		properties:
			width: offsetValue.width, height: offsetValue.height, x: offsetValue.x, y: offsetValue.y
		time: localDisappearTime
		curve: localNewsDetailedCloseCurve
	
	album_fake_image_darker.animate
		properties:
			opacity: 0
		time: localDisappearTime
	
	detailedAlbumView.animate
		properties: {backgroundColor: "rgba(0,0,0,0)"}
		time: localDisappearTime / 2
		delay: localDisappearTime / 2
	
	for item in albumOptions
		item.animate
			properties: { opacity: 0, y: item.y + 60}
			time: localDisappearTime / 4
	
	Utils.delay localDisappearTime+0.02, ->
		detailedAlbumView.destroy()





# Compose Detailed View	
exports.createDetailedAlbumPage = (albumID, offsetValue) ->
	
	detailedAlbumView = new Layer
		width: 640
		height: 1136
		backgroundColor: "rgba(0,0,0,0)"
	
	detailedAlbumView.on Events.Tap, ->
		# ignore other taps




	album_fake_image = new Layer
		parent: detailedAlbumView
		width: offsetValue.width
		height: offsetValue.height
		x: offsetValue.x
		y: offsetValue.y
		image: "images/albums/#{albumID}.jpg"	

	album_fake_image_darker = new Layer
		parent: album_fake_image
		opacity: 0
		width: 640
		height: 640
		backgroundColor: "rgba(0,0,0,0.6)"
	
	album_fake_image_darker.style =
			'-webkit-backdrop-filter': 'blur(10px)'
	
	
	
	
	
	albumTitle = new TextLayer
		parent: detailedAlbumView
		text: "#{Data.albumsData[albumID].title}"
		width: 292*2
		height: 48
		x: 28
		y: 84*2
		fontSize: 40
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "center"
		color: "white"
		letterSpacing: 0.2
		opacity: 0
	
	albumYear = new TextLayer
		parent: detailedAlbumView
		text: "#{Data.albumsData[albumID].year}"
		width: 292*2
		height: 48
		x: 28
		y: 114*2
		fontSize: 32
		fontFamily: "-apple-system-bold, BlinkMacSystemFont, sans-serif"
		textAlign: "center"
		color: "#999999"
		letterSpacing: 0.2
		opacity: 0
	
	closeNewsDetailedTopView = new Layer
		width: 72
		height: 72
		x: 142*2
		y: 34*2
		image: "images/closeNewsDetailedView.png"
		parent: detailedAlbumView
		opacity: 0
	
	albumSongsView = new Layer
		parent: detailedAlbumView
		width: 640
		height: 708
		y: 1136
		# image: "images/albums/#{albumID}.jpg"
		backgroundColor: "#111"
	
	# blur = new Layer
# 		width: 640
# 		height: 1136
# 		parent: albumSongsView
# 		backgroundColor: 'rgba(0, 0, 0, 0.6)'
#
# 	blur.style =
# 		'-webkit-backdrop-filter': 'blur(10px)'

	
	
	
	
	
	albumOptions = [albumYear, albumTitle, closeNewsDetailedTopView]
	albumOptionsY = [albumYear.y, albumTitle.y, closeNewsDetailedTopView.y]

	album_fake_image.animate
		properties:
			width: 640, height: 640, x: 0, y: 0
		time: localDisappearTime
		curve: localNewsDetailedAppearCurve
	
	album_fake_image_darker.animate
		properties: { opacity: 1 }
		time: localDisappearTime
		delay: localDisappearTime / 2
		curve: localNewsDetailedAppearCurve
	
	for item in albumOptions
		item.animate
			properties: { opacity: 1 }
			time: localDisappearTime / 2
			delay: localDisappearTime / 2
			
	detailedAlbumView.animate
		properties: {backgroundColor: "rgba(0,0,0,0.8)"}
		time: localDisappearTime / 2
		delay: localDisappearTime / 2

	albumSongsView.animate
		properties:
			y: 308
		time: localDisappearTime
		curve: localNewsDetailedAppearCurve
		delay: localDisappearTime / 4








	# Compose song for album
	songsScrollView = new ScrollComponent
		width: 640
		height: 708
		scrollHorizontal: false
		parent: albumSongsView
		y: 20
		speedY: 0.8

	songs = SongCreator.createSongsForAlbum(albumID)
	songResultHeight = 0
	for song,i in songs
		song.y = i * 80
		songResultHeight = song.y + song.height
		song.parent = songsScrollView.content
	
	
	
	
	# Close Album View
	closingAlbumView = false
	bounds = [10+40, 100+80]
	boundsBottom = [-(songResultHeight - songsScrollView.height + bounds[0]), -(songResultHeight - songsScrollView.height + bounds[1])]
	
	songsScrollView.on Events.Scroll, ->
		
		if songsScrollView.content.y > bounds[0]
			animateDetailedAlbumPage(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY)
			
		if songsScrollView.content.y > bounds[1]
			songsScrollView.ignoreEvents = true
			closingAlbumView = true
			closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions)
		
		if songsScrollView.content.y < boundsBottom[0]
			animateDetailedAlbumPage(songsScrollView, boundsBottom, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY)

		if songsScrollView.content.y < boundsBottom[1]
			songsScrollView.ignoreEvents = true
			closingAlbumView = true
			closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions)
			
	
	
	
	songsScrollView.on Events.Move, ->
		if songsScrollView.content.y > bounds[0] and !closingAlbumView
			animateDetailedAlbumPage(songsScrollView, bounds, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY)
			
		if songsScrollView.content.y < boundsBottom[0] and !closingAlbumView
			animateDetailedAlbumPage(songsScrollView, boundsBottom, album_fake_image_darker, album_fake_image, detailedAlbumView, albumOptions, offsetValue, albumOptionsY)
	
	
	
	
	closeNewsDetailedTopView.on Events.Tap, ->
		songsScrollView.ignoreEvents = true
		closingAlbumView = true
		closeDetailedAlbumPage(albumSongsView, album_fake_image, album_fake_image_darker, offsetValue, detailedAlbumView, albumOptions)
	
	

	return [detailedAlbumView, songs]