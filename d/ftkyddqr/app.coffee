retina = 1

screen = new Layer
	width: 320, height: 568, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

mask = new Layer width: 320*retina, height: 64*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", shadowX: 0, shadowY: 4*retina, shadowBlur: 8*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)"
hill_1 = new Layer width: 50*retina, height: 50*retina, x: 84.35533905932738*retina, y: 36.35533905932738*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
hill_2 = new Layer width: 58.162950903902356*retina, height: 58.162950903902356*retina, x: 131.0459415460184*retina, y: 32.04594154601841*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
hill_3 = new Layer width: 50*retina, height: 50*retina, x: 186.35533905932743*retina, y: 36.35533905932738*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
hill_4 = new Layer width: 35*retina, height: 35*retina, x: 234.24873734152914*retina, y: 43.248737341529136*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
hill_5 = new Layer width: 20*retina, height: 20*retina, x: 265.14213562373095*retina, y: 51.14213562373095*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
hill_6 = new Layer width: 20*retina, height: 20*retina, x: 34.14213562373095*retina, y: 51.14213562373095*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
hill_7 = new Layer width: 35*retina, height: 35*retina, x: 51.248737341529136*retina, y: 43.248737341529136*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
status_bar = new Layer width: 310*retina, height: 11*retina, x: 6*retina, y: 5*retina, image: "images/status bar.png", opacity: 0.7
title = new Layer width: 124*retina, height: 16*retina, x: 98*retina, y: 36*retina, image: "images/title.png"

mask.states.add {
	base: width: 320*retina, height: 64*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", shadowX: 0, shadowY: 4*retina, shadowBlur: 8*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	nextS: width: 320*retina, height: 64*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", shadowX: 0, shadowY: 4*retina, shadowBlur: 8*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	back_to_burst: width: 320*retina, height: 64*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", shadowX: 0, shadowY: 4*retina, shadowBlur: 8*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	back_loadign_more: width: 320*retina, height: 64*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", shadowX: 0, shadowY: 4*retina, shadowBlur: 8*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	again: width: 320*retina, height: 64*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", shadowX: 0, shadowY: 4*retina, shadowBlur: 8*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	back_loadign_moreasd: width: 320*retina, height: 64*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", shadowX: 0, shadowY: 4*retina, shadowBlur: 8*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
mask.states.switchInstant 'base'

hill_1.states.add {
	base: width: 50*retina, height: 50*retina, x: 84.35533905932738*retina, y: 36.35533905932738*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	nextS: width: 50*retina, height: 50*retina, x: 74.35533905932743*retina, y: 56.35533905932738*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	back_to_burst: width: 82.98275605729685*retina, height: 82.98275605729685*retina, x: 119*retina, y: -6*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	back_loadign_more: width: 259*retina, height: 259*retina, x: 30.99137802864834*retina, y: -94.00862197135157*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	again: width: 82.98275605729685*retina, height: 82.98275605729685*retina, x: 119*retina, y: -6*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	back_loadign_moreasd: width: 259*retina, height: 259*retina, x: 30.99137802864834*retina, y: -94.00862197135157*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
}
hill_1.states.switchInstant 'base'

hill_2.states.add {
	base: width: 58.162950903902356*retina, height: 58.162950903902356*retina, x: 131.0459415460184*retina, y: 32.04594154601841*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	nextS: width: 58.162950903902356*retina, height: 58.162950903902356*retina, x: 131.0459415460184*retina, y: 82.04594154601841*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	back_to_burst: width: 320*retina, height: 320*retina, x: 0, y: -124.66027240080103*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_more: width: 320*retina, height: 320*retina, x: 0, y: -124.66027240080103*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	again: width: 320*retina, height: 320*retina, x: 0, y: -124.66027240080103*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_moreasd: width: 320*retina, height: 320*retina, x: 0, y: -124.66027240080103*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
}
hill_2.states.switchInstant 'base'

hill_3.states.add {
	base: width: 50*retina, height: 50*retina, x: 186.35533905932743*retina, y: 36.35533905932738*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	nextS: width: 50*retina, height: 50*retina, x: 196.35533905932743*retina, y: 56.35533905932738*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	back_to_burst: width: 64.35833322704623*retina, height: 64.35833322704623*retina, x: 128.3122114151256*retina, y: 3.3122114151253186*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_more: width: 206.6877885848744*retina, height: 206.6877885848744*retina, x: 57.1474837362116*retina, y: -67.85251626378877*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	again: width: 64.35833322704623*retina, height: 64.35833322704623*retina, x: 128.3122114151256*retina, y: 3.3122114151253186*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_moreasd: width: 206.6877885848744*retina, height: 206.6877885848744*retina, x: 57.1474837362116*retina, y: -67.85251626378877*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
}
hill_3.states.switchInstant 'base'

hill_4.states.add {
	base: width: 35*retina, height: 35*retina, x: 234.24873734152914*retina, y: 43.248737341529136*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	nextS: width: 35*retina, height: 35*retina, x: 244.24873734152914*retina, y: 63.248737341529136*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	back_to_burst: width: 48.01282463805515*retina, height: 48.01282463805515*retina, x: 136.48496570962106*retina, y: 11.484965709620838*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	back_loadign_more: width: 157.51503429037894*retina, height: 157.51503429037894*retina, x: 81.73386088345933*retina, y: -43.26613911654107*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	again: width: 48.01282463805515*retina, height: 48.01282463805515*retina, x: 136.48496570962106*retina, y: 11.484965709620838*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	back_loadign_moreasd: width: 157.51503429037894*retina, height: 157.51503429037894*retina, x: 81.73386088345933*retina, y: -43.26613911654107*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
}
hill_4.states.switchInstant 'base'

hill_5.states.add {
	base: width: 20*retina, height: 20*retina, x: 265.14213562373095*retina, y: 51.14213562373095*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	nextS: width: 20*retina, height: 20*retina, x: 285.14213562373106*retina, y: 63.14213562373095*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	back_to_burst: width: 20*retina, height: 20*retina, x: 150*retina, y: 24.85786437626905*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	back_loadign_more: width: 20*retina, height: 20*retina, x: 150*retina, y: 24.85786437626905*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	again: width: 20*retina, height: 20*retina, x: 150*retina, y: 24.85786437626905*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
	back_loadign_moreasd: width: 20*retina, height: 20*retina, x: 150*retina, y: 24.85786437626905*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: 0, opacity: 0.3
}
hill_5.states.switchInstant 'base'

hill_6.states.add {
	base: width: 20*retina, height: 20*retina, x: 34.14213562373095*retina, y: 51.14213562373095*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	nextS: width: 20*retina, height: 20*retina, x: 14.142135623730951*retina, y: 63.14213562373095*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	back_to_burst: width: 11.220000267028809*retina, height: 11.220000267028809*retina, x: 154.88908729652576*retina, y: 29.531222920256937*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_more: width: 67.11091270347424*retina, height: 67.11091270347424*retina, x: 126.94363107830304*retina, y: 1.5857667020342205*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	again: width: 11.220000267028809*retina, height: 11.220000267028809*retina, x: 154.88908729652576*retina, y: 29.531222920256937*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_moreasd: width: 67.11091270347424*retina, height: 67.11091270347424*retina, x: 126.94363107830304*retina, y: 1.5857667020342205*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
}
hill_6.states.switchInstant 'base'

hill_7.states.add {
	base: width: 35*retina, height: 35*retina, x: 51.248737341529136*retina, y: 43.248737341529136*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	nextS: width: 35*retina, height: 35*retina, x: 41.248737341529136*retina, y: 63.248737341529136*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -45, opacity: 0.3
	back_to_burst: width: 35*retina, height: 35*retina, x: 142.5*retina, y: 17.991378028648455*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_more: width: 113.5*retina, height: 113.5*retina, x: 103.25*retina, y: -21.258621971351545*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	again: width: 35*retina, height: 35*retina, x: 142.5*retina, y: 17.991378028648455*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
	back_loadign_moreasd: width: 113.5*retina, height: 113.5*retina, x: 103.25*retina, y: -21.258621971351545*retina, backgroundColor: "rgba(85,85,85,1.00)", cornerRadius: 5*retina, rotation: -90, opacity: 0.3
}
hill_7.states.switchInstant 'base'

status_bar.states.add {
	base: width: 310*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 0.7
	nextS: width: 310*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 0.7
	back_to_burst: width: 310*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 0.7
	back_loadign_more: width: 310*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 0.7
	again: width: 310*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 0.7
	back_loadign_moreasd: width: 310*retina, height: 11*retina, x: 6*retina, y: 5*retina, rotation: 0, opacity: 0.7
}
status_bar.states.switchInstant 'base'

title.states.add {
	base: width: 124*retina, height: 16*retina, x: 98*retina, y: 36*retina, rotation: 0, opacity: 1
	nextS: width: 123*retina, height: 16*retina, x: 98*retina, y: 46*retina, rotation: 0, opacity: 0
	back_to_burst: width: 123*retina, height: 16*retina, x: 98*retina, y: 46*retina, rotation: 0, opacity: 0
	back_loadign_more: width: 123*retina, height: 16*retina, x: 98*retina, y: 46*retina, rotation: 0, opacity: 0
	again: width: 123*retina, height: 16*retina, x: 98*retina, y: 46*retina, rotation: 0, opacity: 0
	back_loadign_moreasd: width: 123*retina, height: 16*retina, x: 98*retina, y: 46*retina, rotation: 0, opacity: 0
}
title.states.switchInstant 'base'


generatedState1 = "base"
generatedState2 = "nextS"
generatedState3 = "back_to_burst"
generatedState4 = "back_loadign_more"
generatedState5 = "again"
generatedState6 = "back_loadign_moreasd"

status_bar.opacity = 0
mask.clip = true

layers = [mask, hill_1, hill_2, hill_3, hill_4, hill_5, hill_6, hill_7, title]
generatedStates = [generatedState1, generatedState2, generatedState3, generatedState4, generatedState5, generatedState6]
hills = [hill_1, hill_2, hill_3, hill_4, hill_5, hill_6, hill_7]

for item in hills
	item.superLayer = mask

cycler = Utils.cycle(generatedStates)
justdoit = () ->
	Utils.delay 1, ->
		nextSState = cycler()
		for item in layers
			item.states.switch nextSState
		justdoit()

justdoit()

for item in [mask, status_bar, title]
	item.parent = screen