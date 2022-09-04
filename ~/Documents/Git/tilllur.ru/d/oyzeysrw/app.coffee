retina = 1

screen = new Layer
	width: 360, height: 720, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16 }


content_block = new Layer width: 792 / 2, height: 2012 / 2, image: "images/content block.png"


scroll = ScrollComponent.wrap(content_block)
scroll.scrollHorizontal = false
scroll.scrollVertical = true
scroll.parent = screen
scroll.height = 720

content_block.x = Align.left(-18)
scroll.updateContent()

scroll.content.draggable.overdragScale = 0.1
scroll.content.draggable.momentumOptions =
	friction: 5.1
	tolerance: 0.1


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
	
	title_block = new Layer width: 528 / 2, height: 80/2, x: 16 + 16*retina, y: 18, image: "images/title block #{i+1}.png", parent: todo
	
	detailed_data = new Layer width: 300, height: 157, y: 100, image: "images/detailed data #{i+1}.png", parent: todo, opacity: 0, x: 14, x: 18 - (expandW - todoW)/2 + 16*retina
	
	todos.push(todo)
	todoYs.push(todo.y)
	todoExps.push(false)
	todoIns.push(todo.index)


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
		