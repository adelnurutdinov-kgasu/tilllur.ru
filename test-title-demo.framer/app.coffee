
{ Preview } = require "PreviewComponent"
{ FlowView, NavigationView, ModalView } = require "NavigationComponent"
{ Button } = require "Buttons"

screen = new Layer { width: 800, height: 400 }
preview = new Preview { view: screen, showDevice: false, borderRadius: 16, showBars: false, showHints: false }

flow = new FlowView { parent: screen }
homeView = new NavigationView { parent: flow, backgroundColor: "white", showBack: false }

box = new Button
	parent: homeView.content, borderRadius: 44
	handler: () -> flow.transition(app1View, stackTransition)
box.center()

app1View = new NavigationView { parent: flow, backgroundColor: "white" }
app2View = new NavigationView { parent: flow, backgroundColor: "white" }

stackTransition = (nav, layerA, layerB, overlay) ->
	transition =
		layerA:
			show: {x: 0, y: 0}
			hide: {x: 0, y: 0}
		layerB:
			show: {x: 0, y: 0, scale: 1}
			hide: {x: layerB.width, y: 0, scale: 0.2}
		# overlay:
		# 	show: {opacity: .5, x: 0, y: 0, size: nav.size}
		# 	hide: {opacity: 0, x: 0, y: 0, size: nav.size}