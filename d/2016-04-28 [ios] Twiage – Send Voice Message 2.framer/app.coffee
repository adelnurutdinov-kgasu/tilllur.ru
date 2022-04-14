{Pointer} = require "Pointer"
{TextLayer} = require "TextLayer"

retina = 1

screen = new Layer
	width: 375, height: 667, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


# view
content = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, image: "images/content.png"

bar = new Layer width: 375*retina, height: 46*retina, x: 0*retina, y: 621*retina, image: "images/bar.png"

message_text_edit = new Layer width: 270*retina, height: 28*retina, x: 16*retina, y: 630*retina, image: "images/message text edit.png"

darker = new Layer width: 375*retina, height: 667*retina, x: 0*retina, y: 0*retina, backgroundColor: "rgba(0,0,0,0.8)", opacity: 0

empty_text = new Layer width: 167*retina, height: 36*retina, x: 104*retina, y: 337*retina, image: "images/empty text.png", opacity: 0

counter_label = new TextLayer
    text: "00:00"
    color: "#FFF"
    textAlign: "center"
    fontSize: 64 * retina
    width: 176 * retina
    height: 40 * retina
    x: 100 * retina
    y: 240 * retina
    fontFamily: "Helvetica"
    opacity: 0

swipe_to_cancel = new Layer width: 145*retina, height: 18*retina, x: 61*retina, y: 635*retina, image: "images/swipe to cancel.png", opacity: 0

voice_button = new Layer borderRadius: "100%"
voice_button.states.add {
	case_chat_empty: { width: 54*retina, height: 54*retina, x: 305*retina, y: 604*retina, backgroundColor: "rgba(100,100,100,1)"}
	case_chat_empty_voice_pressed: { width: 120*retina, height: 120*retina, x: 272*retina, y: 571*retina, backgroundColor: "rgba(235,34,58,1)" }
}
voice_button.states.switchInstant "case_chat_empty"



voice_icon = new Layer width: 20*retina, height: 33*retina, x: 322*retina, y: 615*retina, image: "images/voice icon.png"




# model
# cycleButton = new Layer width: Screen.width, height: Screen.height, backgroundColor: "transparent"

statesFromArtboards = ["case_chat_empty", "case_chat_empty_voice_pressed"]
items = [content]
cycler = Utils.cycle(statesFromArtboards)
nextState = cycler()



recording = false
message_y = 127*retina
message_number = 0
message_height = 66 * retina

voice_button.on Events.TapStart, ->
	if !recording
		voice_button.states.switch("case_chat_empty_voice_pressed")
		recording = true
		
		message_text_edit.opacity = 0
		swipe_to_cancel.opacity = 1
		darker.animate { properties: { opacity: 1 }, time: 0.4 }
		empty_text.animate { properties: { opacity: 1 }, time: 0.4 }
		
		startTimer()
	

voice_button.onSwipeLeft (event, layer) ->
	positionX = Pointer.screen(event, layer).x * retina
# 	print positionX
	
	voice_button.states.switch("case_chat_empty", curve: "spring(400, 30, 0)", time: 0.4)
	recording = false
		
	message_text_edit.opacity = 1
	swipe_to_cancel.opacity = 0
	darker.animate { properties: { opacity: 0 }, time: 0.1 }
	empty_text.animate { properties: { opacity: 0 }, time: 0.1 }
		
	stopTimer()


voice_button.on Events.TapEnd, (event, layer) ->
	if recording
		voice_button.states.switch("case_chat_empty", curve: "spring(400, 30, 0)", time: 0.4)
		recording = false
		
		message_text_edit.opacity = 1
		swipe_to_cancel.opacity = 0
		darker.animate { properties: { opacity: 0 }, time: 0.4 }
		empty_text.animate { properties: { opacity: 0 }, time: 0.4 }
		
		stopTimer()
		
		uploaded_memo = new Layer width: 48*retina, height: 56*retina, x: 311*retina, y: 604*retina, image: "images/uploaded memo.png", opacity: 0, superLayer: content
		uploaded_memo.animate {
			properties: 
				opacity: 1
				y: message_y + message_number * message_height
			time: 0.4 + (10 - message_number) * 0.1
		}
		message_number++




timerRunning = false

startTimer = () ->
	time = 0
	timerRunning = true
	counter_label.opacity = 1
	counter_label.text = ""
	showTime(time)
# 	for time in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]	
# 		counter_label.html = "00:0" + time

showTime = (number) ->
	if timerRunning
		counter_label.text = "00:0" + number
		Utils.delay 1, ->
			showTime(number + 1)

stopTimer = () ->
	timerRunning = false
	counter_label.text = ""
	counter_label.opacity = 0

for item in [content, bar, message_text_edit, darker, empty_text, counter_label, swipe_to_cancel, voice_button, voice_icon]
	item.parent = screen

statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "rgba(251,254,254,1)"