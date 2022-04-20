
screen = new Layer
    width: 375, height: 812, backgroundColor: "white"

{ Preview } = require "PreviewComponent"
new Preview { view: screen }

# API

{DynamicLoader} = require "DynamicLoader"
DynamicLoader.series(["./vendor/rest.js",]).then(->
	;
)


`window.searchQuery = function(q) {
	var API = 'https://suggest.yandex.ru/';
	
	var endingsURL = API + 'suggest-endings?v=4&part=' + encodeURI(q) + '&digram_only=0&digram_coeff=1&srv=test&lr=213&uil=ru&sn=100&esn=10';
	
	requestJSON(endingsURL).then(function(data2) {
		var endings = data2[2];
		console.log('Endings answer:', endings);
		
		var qlen = q.length;
		var rawEndings = []
		
		var cleanEndings = endings.map(function(e) { 
			var dp = e[0].substr(qlen);
			console.log ('NNNNNNNN:',dp);
			rawEndings.push(dp);
			
			var p = e[0];
			if (dp[0]==" " ){return e[0].substr(qlen);} 
			var i = qlen;

			while (i > 0) {
				i --
				if (p[i]==" "){
					e[0]=e[0].substr(i);
					i=0;
				}
			}
			return e[0]; });
		
		updateSuggestContext(cleanEndings, rawEndings)
		
	}.bind(this));
	
	
	var url = API + 'suggest-ya.cgi?part=' + encodeURI(q) + '&v=4&?n=10&?fact=1&?mob=1';
	requestJSON(url).then(function(data) {
		var suggest = data[1] || [];
		console.log(data)
		updateSuggestLines(data)
	}.bind(this));
}`

# Input

clearSearch = () ->
	inputLayer.querySelector("#myInput").value = ""


inputLayer = new Layer
	parent: screen
	width: 295, height: 132
	x: 40, y: 200
	backgroundColor: null
# 	html: "<form id='myForm' onSubmit='search();return false;' action='#'><input id='myInput' multiple type='search' autocapitalize='off' autocomplete='off' autocorrect='off' style='color: rgba(0,0,0,1); background-color: rgba(255, 255, 255, 1); width: 295px; height: 132px; font-size: 32px; resize: vertical;'></form>"
	html: "<textarea name='Text1' cols='40' rows='5' style='width: 295px; height: 132px; font-size: 32px; border: 0;'></textarea>"


inputLayer

# inputLayer.querySelector("#myInput").placeholder = "Найти в Яндексе"

isEmptyInputText = () ->
	return inputLayer.querySelector("#myInput").value == ""

updateInput = () ->
	inputLayer.querySelector("#myInput").value

# Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "input", ->
# 	updateInput()
# 	
# 
# 
# Events.wrap(inputLayer.querySelector("#myForm")).addEventListener "submit", (event) ->
# 	event.preventDefault()

`window.search = function () {
	document.activeElement.blur();
	submitSearch()
}`

submitSearch = () ->
	screenState.stateSwitch("search")
	successQuery = inputLayer.querySelector("#myInput").value

focusHandler = (event, layer) ->
	inputLayer.querySelector("#myInput").focus()

# inputLayer.on(Events.Tap, focusHandler)

# inputLayer.querySelector("#myInput").focus()
