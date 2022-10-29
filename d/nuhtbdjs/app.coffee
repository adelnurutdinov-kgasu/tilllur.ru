require "animateOnSpline"
Framer.Extras.Hints.disable()

Screen.backgroundColor = "#222"
roundColor = "#FBDD60"

# Base

delayReference = null

delay = (time, fn, args...) ->
	setTimeout fn, time, args...





groupScreen = new Layer
	backgroundColor: "null"

screen = new Layer
	parent: groupScreen
	width: 360
	height: 640
	clip: true
# 	x: Align.center
# 	y: Align.center
	image: "images/%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%B0%D1%8F%20%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D0%BA%D0%B0%D0%BB%D1%8C%20(2).png"
	borderRadius: 8


ghostScreen = new Layer
	parent: groupScreen
	width: screen.width
	height: screen.height
	x: screen.width + 100
	borderRadius: 8
	backgroundColor: "rgba(85, 175,236, 0.1)"
	borderColor: "rgba(85, 175,236, 0.5)"
	borderWidth: 2

groupScreen.width = screen.width * 2 + 100
groupScreen.height = screen.height
groupScreen.center()


darker = new Layer
	width: screen.width
	height: screen.height
	parent: screen
	backgroundColor: "white"

darker.states =
	"shown": { opacity: 0.7 }
	"hidden": { opacity: 0 }
darker.stateSwitch("shown")

selectedType = "headerLeft2"
editorMode = false
# editorMode = true


# Ghost

buttonHeaderLeft = new Layer
	parent: ghostScreen
	size: 50
	x: Align.left(15)
	y: Align.top(15)

buttonHeaderLeft2 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.left(85)
	y: Align.top(15)

buttonHeaderRight = new Layer
	parent: ghostScreen
	size: 50
	x: Align.right(-15)
	y: Align.top(15)




buttonBottomBar2 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.left(85)
	y: Align.bottom(-15)

buttonBottomBar3 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.center()
	y: Align.bottom(-15)

buttonBottomBar4 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.right(-85)
	y: Align.bottom(-15)

buttonBottomBar5 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.right(-15)
	y: Align.bottom(-15)



buttonVertical2 = new Layer
	parent: ghostScreen
	width: 50
	height: 25
	x: Align.right(-85)
	y: Align.top(85)

buttonVertical3 = new Layer
	parent: ghostScreen
	width: 50
	height: 25
	x: Align.right(-15)
	y: Align.top(85)



buttonNav1 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.left(15)
	y: Align.top(195)

buttonNav2 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.left(85)
	y: Align.top(195)

buttonNav3 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.center
	y: Align.top(195)

buttonNav4 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.right(-85)
	y: Align.top(195)

buttonNav5 = new Layer
	parent: ghostScreen
	size: 50
	x: Align.right(-15)
	y: Align.top(195)



# Data

control =
	vertical2:
		controlPoint1: { midX: 24.5, midY: 245.5 }
		controlPoint2: { midX: 114.5, midY: 2.5 }
		end: { midX: 260.5, midY: 90.5 }
		text: "Теперь в ленте появились товары от Маркета"
		color: "#FBDD60"
		
	
	vertical3:
		controlPoint1: { midX: 24.5, midY: 245.5 }
		controlPoint2: { midX: 114.5, midY: 2.5 }
		end: { midX: 322.5, midY: 92.5 }
		text: "Больше видео. Теперь в отдельной ленте."
		color: "#CFEBFA"
	
	bottomBar2:
		controlPoint1: {midX: 90.5, midY: 328.5}
		controlPoint2: {midX: -90, midY: 540.5}
		end: {midX: 106.5, midY: 617.5}
		text: "Общайтесь с близкими с помощью Чатов"
		color: "#39DBDB"
	
	bottomBar3:
		controlPoint1: {midX: 130.5, midY: 319.5}
		controlPoint2: {midX: -90, midY: 580.5}
		end: {midX: 178.5, midY: 616.5}
		text: "Алиса подскажет не только погоду, но и все, что угодно"
		color: "#8F3DF6"
	
	bottomBar4:
		controlPoint1: {midX: 200.5, midY: 260.5}
		controlPoint2: {midX: 400, midY: 540.5}
		end: {midX: 250.5, midY: 617.5}
		text: "У вас есть 6 сохраненных вкладок"
	
	bottomBar5:
		controlPoint1: {midX: 200.5, midY: 260.5}
		controlPoint2: {midX: 450, midY: 540.5}
		end: {midX: 320.5, midY: 615.5}
		text: "Игры и приложения Яндекса рядом"
		color: "#272531"
	
	headerRight:
		controlPoint1: {midX: 40.5, midY: 320.5}
		controlPoint2: {midX: 120.5, midY: 80.5}
		end: {midX: 315.5, midY: 51.5}
		text: "История заказов теперь рядом"
		color: "#272531"
	
	headerLeft:
		controlPoint1: {midX: 300, midY: 320.5}
		controlPoint2: {midX: 240.5, midY: 60.5}
		end: {midX: 36.5, midY: 52.5}
		text: "Ваши подписки теперь в отдельном разделе"
		color: "#272531"
	
	headerLeft2:
		controlPoint1: {midX: 300, midY: 320.5}
		controlPoint2: {midX: 240.5, midY: 60.5}
		end: {midX: 90.5, midY: 52.5}
		text: "Почта – ваша, место – наше!"
		color: "FBDD60"
	
	
	nav1:
		controlPoint1: {midX: 12.5, midY: 616.5}
		controlPoint2: {midX: 12.5, midY: 278.5}
		end: {midX: 52, midY: 209}
		text: "Легко переходите к новым приложениям Яндекса"
		color: "#CFEBFA"
	
	nav2:
		controlPoint1: {midX: 50.5, midY: 616.5}
		controlPoint2: {midX: 50.5, midY: 278.5}
		end: {midX: 114.5, midY: 209}
		text: "Смотрите рекомендуемые Видео"
		color: "FBDD60"
	
	nav3:
		controlPoint1: {midX: 50.5, midY: 616.5}
		controlPoint2: {midX: 50.5, midY: 278.5}
		end: {midX: 180, midY: 209}
		text: "Чат вашего дома уже создан, заходите!"
		color: "#E2463E"
	
	nav4:
		controlPoint1: {midX: 360.5, midY: 600.5}
		controlPoint2: {midX: 343.5, midY: 275.5}
		end: {midX: 244, midY: 208}
		text: "Концерт группы Мумий Тролль только в Яндекс Эфире"
		color: "#5A3DEC"
	
	nav5:
		controlPoint1: {midX: 360.5, midY: 600.5}
		controlPoint2: {midX: 343.5, midY: 275.5}
		end: {midX: 308, midY: 208}
		text: "Добавили 20 новых аркад"
		color: "#434343"


for item in ghostScreen.children
	item.borderRadius = 8
	item.backgroundColor = "rgba(85, 175,236,1)"
	item.states =
		"shown": { opacity: 1 }
		"hidden": { opacity: 0.2 }
	item.stateSwitch("hidden")
	
	item.on Events.Tap, (event, layer) ->
		if layer is buttonVertical2 then selectedType = "vertical2"
		else if layer is buttonVertical3 then selectedType = "vertical3"
		
		else if layer is buttonBottomBar2 then selectedType = "bottomBar2"
		else if layer is buttonBottomBar3 then selectedType = "bottomBar3"
		else if layer is buttonBottomBar4 then selectedType = "bottomBar4"
		else if layer is buttonBottomBar5 then selectedType = "bottomBar5"
		
		else if layer is buttonHeaderRight then selectedType = "headerRight"
		else if layer is buttonHeaderLeft then selectedType = "headerLeft"
		else if layer is buttonHeaderLeft2 then selectedType = "headerLeft2"
		
		else if layer is buttonNav1 then selectedType = "nav1"
		else if layer is buttonNav2 then selectedType = "nav2"
		else if layer is buttonNav3 then selectedType = "nav3"
		else if layer is buttonNav4 then selectedType = "nav4"
		else if layer is buttonNav5 then selectedType = "nav5"
		
		for item in ghostScreen.children
			if item != layer then item.animate("hidden", time: 0.2)
			else item.animate("shown", time: 0.2)
		
		round.stateSwitch("start")


round = new Layer
	parent: screen
	size: 40 * 4
	backgroundColor: roundColor
	x: Align.center
	y: Align.center
	borderRadius: "100%"



roundOrigin =
	x: round.x
	y: round.y

round.states =
	"start": { scale: 16, opacity: 1 }
	"shown": { scale: 16, x: roundOrigin.x, y: roundOrigin.y }
	"min": { scale: 1, x: roundOrigin.x, y: roundOrigin.y + 160 }
	"hidden": { scale: .25 }
	"wave": { scale: .33 }
	"null": { scale: .1, opacity: 0 }



round.on Events.StateSwitchEnd, (from, to) ->
	if to is "start"
		@animateStop()
		image.stateSwitch("shown")
		
		tipText.text = control[selectedType].text
		
		currentColor = control[selectedType].color
		if currentColor == undefined then currentColor = "#F0F1F5"
		round.backgroundColor = currentColor
		image.backgroundColor = currentColor
		
		clearTimeout(delayReference)
		delayReference = delay 1000, ->
			round.stateSwitch("shown")
		
	else if to is "shown"
		@animate("min", curve: Spring(damping: 1), time: 0.6)
		image.animate("hidden", curve: Spring(damping: 1), time: 0.6)
	
	else if to is "min"
		@animate("hidden", time: 0.4)
		darker.animate("hidden", time: 0.4)
		
		@animateOnSpline
			editor: editorMode
			from: 0
			to: 1
			animationOptions:
				time: 1.2
				curve: Spring(damping: .9)
				delay: 0.1
			points:
				start: {midX: @midX, midY: @midY}
				controlPoint1: control[selectedType].controlPoint1
				controlPoint2: control[selectedType].controlPoint2
				end: control[selectedType].end
	
	else if to is "hidden"
		@animate("wave", time: 0.4, delay: 0.8)
	
	else if to is "wave"
		@animate("null", time: 0.2)






image = new Layer
	width: 360
	height: 640
# 	image: "images/preview_iOS_8.png"
	backgroundColor: roundColor
	parent: screen
	originY: .8

image.states =
	"shown": { scale: 1, opacity: 1 }
	"hidden": { scale: 0.25, opacity: 0 }
image.stateSwitch("shown")

tipText = new TextLayer
	parent: image
	width: 280
	fontSize: 28
	textAlign: "center"
	color: "black"
	fontFamily: "System, Sans Serif, Roboto, SF Pro Text"
	x: Align.center
	y: Align.center
	text: "Теперь у нас появились товары"



# started = false
# screen.onTap ->
# 	if !started
# 		round.stateSwitch("start")
# 		print "ok"
# # 		started = !started
