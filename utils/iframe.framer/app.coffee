Canvas.backgroundColor = "green"

niceValue = (number) ->
	return "#{number.toFixed()} dp"


console.log(niceValue(Screen.width))
print(niceValue(Screen.width))
