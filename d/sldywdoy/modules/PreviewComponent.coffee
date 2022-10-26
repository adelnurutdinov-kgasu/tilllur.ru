# Preview Component

Framer.Extras.Hints.disable()

# {PreviewClass1} = require "PreviewClass1"
{PreviewClass4} = require "PreviewClass4"

# print Preview


class FixPreviewExport extends PreviewClass4
class exports.Preview extends FixPreviewExport




# Native

`window.savePreviewMessageFramerObject = function (layer) {
	window.previewMessageFramerObject = layer
}
`

`window.receiveMessageNormal = function (event) {
	window.previewMessageFramerObject.animateStateToNormal()
}
window.addEventListener("animateNormal", receiveMessageNormal, false);
`

`window.receiveMessage = function (event) {
	console.log(event)
	window.previewMessageFramerObject.animateStateToFill()
}
window.addEventListener("animateFill", receiveMessage, false);
`









