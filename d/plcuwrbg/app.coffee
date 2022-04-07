
retina = 1
iH = 736
iW = 414


bg = new Layer width: iW*retina, height: iH*retina, image: "images/bg.png"

{ Preview } = require "PreviewComponent"
new Preview { view: bg, borderRadius: 16, forceAndroidBar: true }

statusBar = new Layer
	height: 20, width: bg.width, parent: bg, backgroundColor: "rgba(255,207,0,1)"

shareBar = new Layer
	width: iW*retina, height: 50*retina, image: "images/sharebar.png", y: 686*retina
	parent: bg

darker = new Layer
	parent: bg
	width: iW*retina, height: iH*retina, backgroundColor: "rgba(0,0,0,0.8)", opacity: 0

expanded = new Layer
	width: iW*retina, height: iH*retina, image: "images/expandshare.png", opacity: 0
	parent: bg

popup = new Layer
	width: iW*retina, height: iW*retina, image: "images/popup.png", y: 161*retina
	parent: bg

popup.states.add {
	initial: {scale: 0.5, opacity: 0}
	show: {scale: 1, opacity: 1}
}
popup.states.switchInstant 'initial'



shareHandler = (event, layer) ->
	bg.off(Events.Click, shareHandler)
	darker.opacity = 1
	expanded.style = {"display" : "block"}
	expanded.opacity = 1
	expanded.on(Events.Click, animateWindow)

animateWindow = (event, layer) ->
	expanded.style = {"display" : "none"}
	expanded.opacity = 0
	popup.states.switch 'show', {curve: "spring(100, 20, 5)", time: 1.5}
	Utils.delay 1.5, ->
		popup.states.switch 'initial', {curve: "ease-in", time: 0.2}
		darker.opacity = 0
		bg.on(Events.Click, shareHandler)
	
bg.on(Events.Click, shareHandler)
	