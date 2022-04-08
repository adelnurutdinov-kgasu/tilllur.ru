
sketch = Framer.Importer.load "imported/fs-datavail-framer-notification"

screen = new Layer
	width: 320, height: 568, backgroundColor: "#111"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

notiication1 = sketch["notiication1"]
notiication2 = sketch["notiication2"]
notiication3 = sketch["notiication3"]
notiication4 = sketch["notiication4"]

temp = new Layer
	width: 320, height: 568, parent: screen, originX: 0, originY: 0, y: 20, backgroundColor: "#FFF"

sketch["Artboard_1"].parent = temp
temp.scale = 320 / sketch["Artboard_1"].width


notificationTitle = new Layer
	width: 280, height: 38, y: 64, image: "images/not_title.png"
	
bell = new Layer
	width: 32, height: 32, x: 227, y: 16, image: "images/bell.png"
	
label = new Layer
	width: 32, height: 32, x: 227, y: 16, backgroundColor: "rgba(0,0,0,0)", z = 10
label.html = "0"
label.style = {
	"text-align" : "center",
	"font-family" : "SF Pro Text, -system, Bold",
	"font-size" : "16px",
	"color" : "#FFF",
	"line-height" : "22px"
	"padding" : "5px"
	}

labelCounter = 0
	
bell_is_active = false
generating = true
	
notifacationArray = [notificationTitle, notiication1, notiication2, notiication3, notiication4]

new_notification_1 = new Layer { width: 5, height: 69, y: 102, backgroundColor: "#1C9E86"}
new_notification_2 = new Layer { width: 5, height: 69, y: 172, backgroundColor: "#1C9E86"}
new_notification_3 = new Layer { width: 5, height: 69, y: 242, backgroundColor: "#1C9E86"}
new_notification_4 = new Layer { width: 5, height: 69, y: 312, backgroundColor: "#1C9E86"}

new_notifications = [new_notification_1, new_notification_2, new_notification_3, new_notification_4]


for item in notifacationArray
	item.opacity = 0
	
for item in new_notifications
	item.opacity = 0

bell.on Events.Click, ->
	if !bell_is_active
		bell_is_active = true
		generating = false
		label.html = ""
		bell.image = "images/bell.png"
		toShowMarkers = labelCounter
		
		for item in notifacationArray
			item.opacity = 1
		if toShowMarkers > 0
			for x in [0..toShowMarkers-1]
				new_notifications[x].opacity = 1
		toShowMarkers = 0	
		labelCounter = 0
	else
		bell_is_active = false
		generating = true
		for item in notifacationArray
			item.opacity = 0
		for item in new_notifications
			item.opacity = 0
		

# changeImage = () ->
# 	if bell_is_active then bell.image = "images/bell.png"
# 	else bell.image = "images/bell_active.png"
	
	
generateNotification = () ->
	Utils.delay 2, ->
		if !bell_is_active && generating
			if labelCounter >= 4
				label.html = "4+"
			else
				labelCounter++
				label.html = labelCounter.toString()
# 				print label.html
			bell.image = "images/bell_color.png"
				
		generateNotification()
	
	
generateNotification()


for item in [notificationTitle, bell, label, new_notification_1, new_notification_2, new_notification_3, new_notification_4]
	item.parent = temp