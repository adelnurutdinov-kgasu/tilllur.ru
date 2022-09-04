retina = 2

screen = new Layer
	width: 360, height: 720, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }

temp = new Layer
	parent: screen
	width: 360 * 2, height: 720 * 2, backgroundColor: "000", scale: 0.5
	originX: 0, originY: 0



content_block = new Layer width: 792, height: 2012, y: 0, image: "images/content block.png"

scroll = ScrollComponent.wrap(content_block)
scroll.scrollHorizontal = false
scroll.scrollVertical = true

scroll.width = 384 * 2
scroll.height = 720 * 2
scroll.x = Align.left(-36)

album_title_block = new Layer width: 720, height: 84, y: 128, image: "images/album title block.png", parent: content_block, x: 36

navigation_base = new Layer width: 648, height: 36, x: 36, y: 84, image: "images/navigation base.png"

# status_bar = new Layer width: 720, height: 48, x: 0, y: 0, image: "images/status bar.png"

app_bar = new Layer width: 736, height: 184, x: -8, y: -8, image: "images/app bar.png", opacity: 0








todoN = 3
todoP = 8*retina
todoW = 296*retina
todoH = 72*retina
expandW = 336*retina
expandH = 282*retina
animationT = 0.2
borderRadius = 4

Framer.Defaults.Animation =
	curve: "spring(400,35,10)"
	time: animationT

todos = []
todoYs = []
todoExps = []
todoIns = []

todoList = new Layer width: 360*retina, height: todoH * todoN + todoP * (todoN - 1), backgroundColor: null, parent: content_block, y: 500*retina


# Create todos

for i in [0...todoN]
	todo = new Layer width: todoW, height: todoH, y: (todoH + todoP) * i, parent: todoList, backgroundColor: null
	todo.centerX()
	
	todBg = new Layer
		parent: todo
		width: todo.width, height: todo.height, x: 16*retina
		backgroundColor: "white", borderRadius: borderRadius, opacity: 1
	
	title_block = new Layer width: 528, height: 80, x: 32 + 16*retina, y: 32, image: "images/title block #{i+1}.png", parent: todo
	
	detailed_data = new Layer width: 600, height: 314, y: 200, image: "images/detailed data #{i+1}.png", parent: todo, opacity: 0, x: 27, x: 36 - (expandW - todoW)/2 + 16*retina
	
	todos.push(todo)
	todoYs.push(todo.y)
	todoExps.push(false)
	todoIns.push(todo.index)






scroll.on Events.Move, ->

	if scroll.scrollY > 40*retina
		app_bar.animate
			properties: opacity: 1
			time: animationT
		
		album_title_block.animate
			properties: opacity: 0
			time: animationT
		
	else
		app_bar.opacity = 0
		
		album_title_block.animate
			properties: opacity: 1
			time: animationT













# Some functions
findIndex = (object,arr) ->
	for i, objects of arr
		return parseInt(i) if object == objects

# Function for expanding an item
expandItem = (layer, i) ->
	layer.bringToFront()
	layer.children[0].animate properties:
		scaleX: expandW / todoW
	
	layer.children[0].animate
		properties: height: expandH
		delay: animationT
		
	layer.animate
		properties: y: todoYs[i] - todoP * 1.5
		delay: animationT

	layer.children[0].animate properties: shadowBlur: 40, shadowY: 10, shadowColor: "rgba(49,49,47,0.5)", opacity: 1
	
	layer.children[2].animate  
		properties: opacity: 1
		delay: animationT*2



# Function for collapsing an item
collapseItem = (layer,i) ->
	layer.children[0].animate properties: scaleX: 1
	layer.children[2].animate properties: opacity: 0

	layer.children[0].animate
		properties: height: todoH
		delay: animationT
	layer.animate
		properties: y: todoYs[i]
		delay: animationT
	# And shrink shadow
	layer.children[0].animate properties: shadowY: 0, shadowBlur: 0, opacity: 1

# Loop through all items
for todoItem in todos
			
	todoItem.children[0].onClick ->
		todoWrap = this.parent
		cI = findIndex(todoWrap,todos)
		# What should the clicked item do?
		# If it's not expanded
		if !todoExps[cI]
			# Change expand status of this is "true"
			todoExps[cI] = true
		# If it is expanded
		else if todoExps[cI]
			# Change expand status to "false"
			todoExps[cI] = false
		
		# If clicked item is expanding (todoExps == true)
		if todoExps[cI]
			# Expand it
			expandItem(todoWrap,cI)
			
		
		# If clicked item is collapsing (todoExps == false)
		if !todoExps[cI]
			# Collapse it
			collapseItem(todoWrap,cI)
		
		# Loop trough all items
		for n,item of todos
			i = parseInt(n)
			# What should the not-clicked items do?
			if i != cI
				# Set the index back to original
				item.index = todoIns[i]
				# If the item is below the clicked item
				if i > cI 
					# If the clicked item is expanding
					if todoExps[cI]
						# Move it down with a delay
						item.animate
							properties: y: todoYs[i - 1] + expandH - todoP * 1.5
							delay: animationT
					# If the clicked item is collapsed
					else if !todoExps[cI]
						# Move it back up with a delay
						item.animate
							properties: y: todoYs[i]
							delay: animationT
					# If the item is expanded
					if todoExps[i]
						# Collapse it
						collapseItem(item)
						todoExps[i] = false
				
				# If the item is above the clicked item
				if i < cI
					# Move all items back to original position
					item.animate
						properties: y: todoYs[i]
						delay: animationT
					# If the item is expanded
					if todoExps[i]
						# Collapse it
						collapseItem(item)
						todoExps[i] = false

for item in [scroll, navigation_base, app_bar]
	item.parent = temp