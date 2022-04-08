retina = 1

screen = new Layer
	width: 320, height: 568

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

splash = new Layer width: 320*retina, height: 568*retina, image: "images/splash.png"

text = new Layer width: 320*retina, height: 44*retina, image: "images/text.png", y: 510*retina
text.states.add {
	initial: {opacity: 0}
	ready: {opacity: 1}
	final: {opacity: 0}
}
text.states.switchInstant("initial")

round = new Layer width: 80*retina, height: 80*retina, image: "images/bg.png"
round.states.add {
	initial: {x: 120*retina, y: 427*retina, opacity: 0, scale: 0.6}
	ready: {x: 120*retina, y: 427*retina, opacity: 1, scale: 1}
	bigger: {width: 356*retina, height: 356*retina, x: -20*retina, y: 100*retina, opacity: 1}
	final: {width: 700*retina, height: 700*retina, x: -200*retina, y: -80*retina}
}
round.states.switchInstant("initial")

days = new Layer width: 240*retina, height: 240*retina, image: "images/days.png", x: 40*retina, y: 200*retina
days.states.add {
	initial: {opacity: 0, scale: 0.8}
	bigger: {opacity: 1, scale: 1}
	final: {opacity: 0, scale: 0.5}
}
days.states.switchInstant "initial"

sober1 = new Layer width: 240*retina, height: 32*retina, image: "images/sober1.png", x: 40*retina
sober2 = new Layer width: 240*retina, height: 120*retina, image: "images/sober2.png", x: 40*retina
sober3 = new Layer width: 240*retina, height: 32*retina, image: "images/sober3.png", x: 40*retina

sobers = [sober1, sober2, sober3]
count = -1
soberPositions = [170, 202, 322]
for item in sobers
	count++
	item.states.add {
		initial: {y: soberPositions[count]*retina - (3-count)*40*retina, opacity: 0}
		show: {y: soberPositions[count]*retina, opacity: 1}
	}
	item.states.switchInstant "initial"
	
shareButton = new Layer width: 240*retina, height: 44*retina, image: "images/share.png", y: 484*retina, x: 50*retina
shareButton.states.add {
	initial: {opacity: 0, scale: 0.8}
	show: {opacity: 1, scale: 1}
}
shareButton.states.switchInstant "initial"


Utils.delay 1, ->
	round.states.switch "ready", {curve: "spring(300,20,10)"}
	text.states.switch "ready"
			
roundAnimationHandler = (event, layer) ->
	round.states.switch "bigger", {curve: "spring(100,20,4)"}
	days.states.switch "bigger", {curve: "spring(100,20,4)"}
	text.states.switch "final"
	round.off(Events.Click, roundAnimationHandler)
	continueRoundAnimation(2)
	
	
continueRoundAnimation = (time) ->
	Utils.delay time, ->
		round.states.switch "final", {curve: "spring(100,20,4)"}
		days.states.switch "final", {time: 0.4}
# 		round.off(Events.Click)
		for item in sobers
			item.states.switch "show"
		Utils.delay 1, ->
			shareButton.states.switch "show", {curve: "spring(100,20,4)"}
	
round.on(Events.Click, roundAnimationHandler)


for item in  [splash, text, round, days, sober1, sober2, sober3, shareButton]
	item.parent = screen