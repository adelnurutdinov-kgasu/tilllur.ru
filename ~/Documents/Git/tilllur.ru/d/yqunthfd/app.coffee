
screen = new Layer
	width: 360, height: 640, backgroundColor: "666666"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


retina = 1

content_block = new Layer width: 360*retina, height: 1292*retina, x: 0*retina, y: 0*retina, image: "images/content block.png"

scroll = ScrollComponent.wrap(content_block)
scroll.width = 480*retina
scroll.height = 640*retina
scroll.scrollHorizontal = false
scroll.scrollVertical = true

album_title_block = new Layer width: 112*retina, height: 37*retina, x: 124*retina, y: 65*retina, image: "images/album title block.png", parent: content_block

navigation_base = new Layer width: 323*retina, height: 20*retina, x: 18*retina, y: 42*retina, image: "images/navigation base.png"


status_bar = new Layer width: 720, height: 48, x: 0, y: 0, image: "images/status bar.png", opacity: 0

app_bar = new Layer width: 368*retina, height: 92*retina, x: -4*retina, y: -4*retina, image: "images/app bar.png", opacity: 0








todoN = 5
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

todoList = new Layer width: 360*retina, height: todoH * todoN + todoP * (todoN - 1), backgroundColor: null, parent: content_block, y: 684*retina


# Create todos

for i in [0...todoN]
	todo = new Layer width: todoW, height: todoH, y: (todoH + todoP) * i, parent: todoList, backgroundColor: null
	todo.centerX()
	
	if i > 0
		todo.y = (todoH + todoP) * i + 16*retina
	if i > 2
		todo.y = (todoH + todoP) * i + 16*2*retina
	
	todBg = new Layer
		parent: todo
		width: todo.width, height: todo.height,
		backgroundColor: "white", borderRadius: borderRadius, opacity: 1
	
	title_block = new Layer width: 528 / 2, height: 80 / 2, x:16*retina, y: 32 / 2, image: "images/title block #{i+1}.png", parent: todo
	
	detailed_data = new Layer width: 600 / 2, height: 314 / 2, y: 200 / 2, image: "images/detailed data #{i+1}.png", parent: todo, opacity: 0, x: 36 / 2 - (expandW - todoW)/2
	
	todos.push(todo)
	todoYs.push(todo.y)
	todoExps.push(false)
	todoIns.push(todo.index)




scroll.content.on "change:y", ->
	v = @parent.scrollY

	if v > 80*retina
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
	item.parent = screen
