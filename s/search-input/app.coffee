Utils.insertCSS('@import url(css/project.css)')

Framer.Defaults.Animation =
	curve: Spring(damping: 1), time: 0.5

screen = new Layer
    width: 375, height: 812, backgroundColor: "white"

# { Preview } = require "PreviewComponent"
# preview = new Preview { view: screen }
# preview.backgroundColor = "222"



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
	width: 315, height: 132, x: 30
	backgroundColor: null
# 	html: "<form id='myForm' onSubmit='search();return false;' action='#'><input id='myInput' multiple type='search' autocapitalize='off' autocomplete='off' autocorrect='off' style='color: rgba(0,0,0,1); background-color: rgba(255, 255, 255, 1); width: 295px; height: 132px; font-size: 32px; resize: vertical; box-sizing: border-box; text-overflow:ellipsis; -webkit-tap-highlight-color: transparent; -webkit-appearance: none;'></form>"
	html: "<textarea onmouseover='return false;' id='myInput' name='Text1' rows='5' cols='100' style=' height: 132px; font-size: 32px; border: 0; margin: 0; padding: 0; box-sizing: border-box; width: 100%; -webkit-tap-highlight-color: transparent; -webkit-appearance: none;'></textarea>"

inputLayer.states =
	"start": { y: 128 }
	"focus": { y: 208 }
inputLayer.stateSwitch("start")

# text = new TextLayer
# 	text: "Найти в Яндексе"
# 	fontFamily: "YS Text"
# 	fontSize: 32
# 	fontWeight: 700
# 	y: 160
# 	x: 40

# inputLayer

# `document.on("mousedown", "#reply_msg", function(e) {
# 	e.preventDefault();
# 	$(this).hide();
# 	$("#reply_message").show().focus();
# });`


inputLayer.querySelector("#myInput").placeholder = "Найти в Яндексе"
inputLayer.querySelector("#myInput").style["fontFamily"] = "YS Text"
inputLayer.querySelector("#myInput").style["fontWeight"] = 700

isEmptyInputText = () ->
	return inputLayer.querySelector("#myInput").value == ""

updateInput = () ->
	inputLayer.querySelector("#myInput").value

# Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "input", ->
# 	updateInput()

# Events.wrap(inputLayer.querySelector("#myForm")).addEventListener "submit", (event) ->
# 	event.preventDefault()


Events.wrap(inputLayer.querySelector("#myInput")).addEventListener "focus", ->
	inputLayer.animate("focus")

`window.search = function () {
	document.activeElement.blur();
	submitSearch()
}`

`var link = document.createElement("link");
  link.setAttribute("rel","stylesheet");
  link.setAttribute("href","https://meyerweb.com/eric/tools/css/reset/reset.css");
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
 `


submitSearch = () ->
	screenState.stateSwitch("search")
	successQuery = inputLayer.querySelector("#myInput").value

focusHandler = (event, layer) ->
	inputLayer.querySelector("#myInput").focus()

# inputLayer.on(Events.Tap, focusHandler)

# 
# Utils.delay 2, ->
# 	print "ok"
# 	inputLayer.querySelector("#myInput").focus()
