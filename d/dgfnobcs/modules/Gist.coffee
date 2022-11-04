# Add the following line to your project in Framer Studio. 
# myModule = require "myModule"
# Reference the contents by name, like myModule.myFunction() or myModule.myVar

exports.shuffle = (source) ->
	return source unless source.length >= 2
	for index in [source.length-1..1]
		randomIndex = Math.floor Math.random() * (index + 1)
		[source[index], source[randomIndex]] = [source[randomIndex], source[index]]
	return source



exports.delayReference = null

exports.delay = (time, fn, args...) ->
	setTimeout fn, time, args...



exports.createGap = (gapHeight = 8) ->
	return new Layer
		width: 360
		height: gapHeight
		opacity: 0
		name: "gap: #{gapHeight}"
		backgroundColor: "null"
# 		backgroundColor: Utils.randomColor()

exports.createBreakerFull = (gapHeight = 8) ->
	return new Layer
		width: 360
		height: gapHeight
		opacity: 0.1
		backgroundColor: "grey"
		name: "bf: #{gapHeight}"

exports.createBreaker = (gapHeight = 8) ->
	return new Layer
		width: 360 - 28*2
		height: gapHeight
		opacity: 0.1
		x: 28
		backgroundColor: "grey"
		name: "b: #{gapHeight}"




# SVG

deleteSVGRoundColor = "#FFF"
exports.deleteSvg = """<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.6 7.2C13.8209 6.97909 13.8209 6.62091 13.6 6.4V6.4C13.3791 6.17909 13.0209 6.17909 12.8 6.4L10 9.2L7.2 6.4C6.97909 6.17909 6.62091 6.17909 6.4 6.4V6.4C6.17909 6.62091 6.17909 6.97909 6.4 7.2L9.2 10L6.4 12.8C6.17909 13.0209 6.17909 13.3791 6.4 13.6V13.6C6.62091 13.8209 6.97909 13.8209 7.2 13.6L10 10.8L12.8 13.6C13.0209 13.8209 13.3791 13.8209 13.6 13.6V13.6C13.8209 13.3791 13.8209 13.0209 13.6 12.8L10.8 10L13.6 7.2Z" fill="black"/>
</svg>
"""

plusSvgColor = "rgba(0,0,0,0.8)"
exports.plusSvg = """<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C15.4477 8 15 8.44772 15 9V15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H15V23C15 23.5523 15.4477 24 16 24C16.5523 24 17 23.5523 17 23V17H23C23.5523 17 24 16.5523 24 16C24 15.4477 23.5523 15 23 15H17V9C17 8.44772 16.5523 8 16 8Z" fill="none"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C15.4477 8 15 8.44772 15 9V15H9C8.44772 15 8 15.4477 8 16C8 16.5523 8.44772 17 9 17H15V23C15 23.5523 15.4477 24 16 24C16.5523 24 17 23.5523 17 23V17H23C23.5523 17 24 16.5523 24 16C24 15.4477 23.5523 15 23 15H17V9C17 8.44772 16.5523 8 16 8Z" fill="#{plusSvgColor}"/>
</svg>
"""

exports.tickSvg = """<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.4559 10.0013C23.1367 9.72243 22.7198 9.58161 22.2968 9.60981C21.8739 9.63801 21.4793 9.83292 21.1999 10.1517L13.9727 18.4045L10.7792 14.9197C10.4886 14.6238 10.0945 14.4523 9.67989 14.4413C9.26531 14.4303 8.86266 14.5807 8.55683 14.8608C8.25099 15.1409 8.06586 15.5288 8.04048 15.9428C8.01509 16.3567 8.15143 16.7644 8.42075 17.0797L12.2175 21.2237C12.6472 21.6932 13.2458 21.9728 13.8816 22.001C14.5174 22.0292 15.1384 21.8037 15.6079 21.3741L15.7039 21.2813L15.7919 21.1853L23.6063 12.2589C23.8855 11.9399 24.0265 11.5231 23.9986 11.1002C23.9707 10.6772 23.7761 10.2826 23.4575 10.0029L23.4559 10.0013Z" fill="#999"/>
</svg>
"""

exports.doneSvg = """<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 28L25.5 33.5L36 23" stroke="#45474C" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""