retina = 1

screen = new Layer
	width: 414, height: 736, backgroundColor: "000"

{ Preview } = require "PreviewComponent"
new Preview { view: screen, borderRadius: 16, topTheme: "light" }

screen_bg = new Layer width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)"
start = new Layer width: 414*retina, height: 736*retina, x: 0, y: 0, image: "images/start.png"
darker_bg = new Layer width: 414*retina, height: 686*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.50)", opacity: 0
overlay_bg = new Layer width: 434*retina, height: 720*retina, x: -10*retina, y: 676*retina, image: "images/overlay bg.png"
question1_1 = new Layer width: 294*retina, height: 80*retina, x: 54*retina, y: 780*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question1_2 = new Layer width: 294*retina, height: 80*retina, x: 66*retina, y: 792*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question1_3 = new Layer width: 294*retina, height: 80*retina, x: 60*retina, y: 786*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question1_text = new Layer width: 138*retina, height: 12*retina, x: 138*retina, y: 821*retina, image: "images/question1 text.png"
question2_1 = new Layer width: 294*retina, height: 80*retina, x: 54*retina, y: 888*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question2_2 = new Layer width: 294*retina, height: 80*retina, x: 66*retina, y: 894*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question2_3 = new Layer width: 294*retina, height: 80*retina, x: 60*retina, y: 882*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question2_text = new Layer width: 200*retina, height: 16*retina, x: 107*retina, y: 914*retina, image: "images/question2 text.png"
question3_1 = new Layer width: 294*retina, height: 80*retina, x: 54*retina, y: 984*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question3_2 = new Layer width: 294*retina, height: 80*retina, x: 66*retina, y: 996*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question3_3 = new Layer width: 294*retina, height: 80*retina, x: 60*retina, y: 990*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question3_text = new Layer width: 231*retina, height: 37*retina, x: 91*retina, y: 1008*retina, image: "images/question3 text.png"
question4_1 = new Layer width: 294*retina, height: 80*retina, x: 54*retina, y: 1098*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question4_2 = new Layer width: 294*retina, height: 80*retina, x: 66*retina, y: 1092*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question4_3 = new Layer width: 294*retina, height: 80*retina, x: 60*retina, y: 1086*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina
question4_text = new Layer width: 175*retina, height: 40*retina, x: 119*retina, y: 1107*retina, image: "images/question4 text.png"
choose_theme = new Layer width: 157*retina, height: 20*retina, x: 129*retina, y: 730*retina, image: "images/choose theme.png"
basic_round_indicator = new Layer width: 163*retina, height: 60*retina, x: 126*retina, y: 80*retina, image: "images/basic round indicator.png", opacity: 0
this_round_1 = new Layer width: 40*retina, height: 40*retina, x: 138*retina, y: 90*retina, image: "images/this round 1.png", opacity: 0
big_title = new Layer width: 263*retina, height: 29*retina, x: 72*retina, y: 291*retina, image: "images/big title.png", opacity: 0
timer = new Layer width: 64*retina, height: 64*retina, x: 175*retina, y: 510*retina, image: "images/timer.png", opacity: 0
new_game_button = new Layer width: 140*retina, height: 140*retina, x: 137*retina, y: 522*retina, image: "images/new game button.png", opacity: 0
answer_1 = new Layer width: 167*retina, height: 99*retina, x: 47*retina, y: 450*retina, image: "images/answer 1.png", opacity: 0
answer_2 = new Layer width: 167*retina, height: 99*retina, x: 47*retina, y: 534*retina, image: "images/answer 2.png", opacity: 0
answer_3 = new Layer width: 167*retina, height: 99*retina, x: 200*retina, y: 534*retina, image: "images/answer 3.png", opacity: 0
answer_4 = new Layer width: 167*retina, height: 99*retina, x: 200*retina, y: 450*retina, image: "images/answer 4.png", opacity: 0
ads = new Layer width: 414*retina, height: 50*retina, x: 0, y: 686*retina, image: "images/ads.png"

screen_bg.states.add {
	start: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	choose_theme: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	prepare_question: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	answers: width: 414*retina, height: 736*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,1.00)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
screen_bg.states.switchInstant 'start'

start.states.add {
	start: scale: 1
	choose_theme: scale: 0.88
	prepare_question: scale: 0.88
	answers: scale: 0.88
}
start.states.switchInstant 'start'

darker_bg.states.add {
	start: width: 414*retina, height: 686*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 0
	choose_theme: width: 414*retina, height: 686*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	prepare_question: width: 414*retina, height: 686*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
	answers: width: 414*retina, height: 686*retina, x: 0, y: 0, backgroundColor: "rgba(0,0,0,0.50)", cornerRadius: 0*retina, rotation: 0, opacity: 1
}
darker_bg.states.switchInstant 'start'

overlay_bg.states.add {
	start: width: 434*retina, height: 720*retina, x: -10*retina, y: 676*retina, rotation: 0, opacity: 1
	choose_theme: width: 434*retina, height: 720*retina, x: -10*retina, y: 144*retina, rotation: 0, opacity: 1
	prepare_question: width: 434*retina, height: 720*retina, x: -10*retina, y: -20*retina, rotation: 0, opacity: 1
	answers: width: 434*retina, height: 720*retina, x: -10*retina, y: -20*retina, rotation: 0, opacity: 1
}
overlay_bg.states.switchInstant 'start'

question1_1.states.add {
	start: width: 294*retina, height: 80*retina, x: 54*retina, y: 780*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 254*retina, height: 80*retina, x: 80*retina, y: 248*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 254*retina, height: 80*retina, x: 80*retina, y: 248*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 254*retina, height: 80*retina, x: 80*retina, y: 248*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question1_1.states.switchInstant 'start'

question1_2.states.add {
	start: width: 294*retina, height: 80*retina, x: 66*retina, y: 792*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 274*retina, height: 80*retina, x: 70*retina, y: 254*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 274*retina, height: 80*retina, x: 70*retina, y: 254*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 274*retina, height: 80*retina, x: 70*retina, y: 254*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question1_2.states.switchInstant 'start'

question1_3.states.add {
	start: width: 294*retina, height: 80*retina, x: 60*retina, y: 786*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 294*retina, height: 80*retina, x: 60*retina, y: 260*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 294*retina, height: 80*retina, x: 60*retina, y: 260*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 294*retina, height: 80*retina, x: 60*retina, y: 260*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question1_3.states.switchInstant 'start'

question1_text.states.add {
	start: width: 138*retina, height: 12*retina, x: 138*retina, y: 821*retina, rotation: 0, opacity: 1
	choose_theme: width: 138*retina, height: 12*retina, x: 138*retina, y: 294*retina, rotation: 0, opacity: 1
	prepare_question: width: 138*retina, height: 12*retina, x: 138*retina, y: 294*retina, rotation: 0, opacity: 0
	answers: width: 138*retina, height: 12*retina, x: 138*retina, y: 294*retina, rotation: 0, opacity: 0
}
question1_text.states.switchInstant 'start'

question2_1.states.add {
	start: width: 294*retina, height: 80*retina, x: 54*retina, y: 888*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 254*retina, height: 80*retina, x: 80*retina, y: 350*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 252*retina, height: 166*retina, x: 81*retina, y: 121*retina, rotation: 0, opacity: 1
	answers: width: 252*retina, height: 166*retina, x: 81*retina, y: 121*retina, rotation: 0, opacity: 1
}
question2_1.states.switchInstant 'start'

question2_2.states.add {
	start: width: 294*retina, height: 80*retina, x: 66*retina, y: 894*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 274*retina, height: 80*retina, x: 70*retina, y: 356*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 306*retina, height: 200*retina, x: 54*retina, y: 130*retina, rotation: 0, opacity: 1
	answers: width: 306*retina, height: 200*retina, x: 54*retina, y: 130*retina, rotation: 0, opacity: 1
}
question2_2.states.switchInstant 'start'

question2_3.states.add {
	start: width: 294*retina, height: 80*retina, x: 60*retina, y: 882*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 294*retina, height: 80*retina, x: 60*retina, y: 362*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 360*retina, height: 234*retina, x: 27*retina, y: 139*retina, rotation: 0, opacity: 1
	answers: width: 360*retina, height: 234*retina, x: 27*retina, y: 139*retina, rotation: 0, opacity: 1
}
question2_3.states.switchInstant 'start'

question2_text.states.add {
	start: width: 200*retina, height: 16*retina, x: 107*retina, y: 914*retina, rotation: 0, opacity: 1
	choose_theme: width: 200*retina, height: 16*retina, x: 107*retina, y: 392*retina, rotation: 0, opacity: 1
	prepare_question: width: 180*retina, height: 14*retina, x: 117*retina, y: 175*retina, rotation: 0, opacity: 0.5
	answers: width: 180*retina, height: 14*retina, x: 117*retina, y: 175*retina, rotation: 0, opacity: 0.5
}
question2_text.states.switchInstant 'start'

question3_1.states.add {
	start: width: 294*retina, height: 80*retina, x: 54*retina, y: 984*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 254*retina, height: 80*retina, x: 80*retina, y: 452*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 254*retina, height: 80*retina, x: 80*retina, y: 452*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 254*retina, height: 80*retina, x: 80*retina, y: 452*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question3_1.states.switchInstant 'start'

question3_2.states.add {
	start: width: 294*retina, height: 80*retina, x: 66*retina, y: 996*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 274*retina, height: 80*retina, x: 70*retina, y: 458*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 274*retina, height: 80*retina, x: 70*retina, y: 458*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 274*retina, height: 80*retina, x: 70*retina, y: 458*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question3_2.states.switchInstant 'start'

question3_3.states.add {
	start: width: 294*retina, height: 80*retina, x: 60*retina, y: 990*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 294*retina, height: 80*retina, x: 60*retina, y: 464*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 294*retina, height: 80*retina, x: 60*retina, y: 464*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 294*retina, height: 80*retina, x: 60*retina, y: 464*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question3_3.states.switchInstant 'start'

question3_text.states.add {
	start: width: 231*retina, height: 37*retina, x: 91*retina, y: 1008*retina, rotation: 0, opacity: 1
	choose_theme: width: 231*retina, height: 37*retina, x: 91*retina, y: 488*retina, rotation: 0, opacity: 1
	prepare_question: width: 231*retina, height: 37*retina, x: 91*retina, y: 488*retina, rotation: 0, opacity: 0
	answers: width: 231*retina, height: 37*retina, x: 91*retina, y: 488*retina, rotation: 0, opacity: 0
}
question3_text.states.switchInstant 'start'

question4_1.states.add {
	start: width: 294*retina, height: 80*retina, x: 54*retina, y: 1098*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 254*retina, height: 80*retina, x: 80*retina, y: 554*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 254*retina, height: 80*retina, x: 80*retina, y: 554*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 254*retina, height: 80*retina, x: 80*retina, y: 554*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question4_1.states.switchInstant 'start'

question4_2.states.add {
	start: width: 294*retina, height: 80*retina, x: 66*retina, y: 1092*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 274*retina, height: 80*retina, x: 70*retina, y: 560*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 274*retina, height: 80*retina, x: 70*retina, y: 560*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 274*retina, height: 80*retina, x: 70*retina, y: 560*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question4_2.states.switchInstant 'start'

question4_3.states.add {
	start: width: 294*retina, height: 80*retina, x: 60*retina, y: 1086*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	choose_theme: width: 294*retina, height: 80*retina, x: 60*retina, y: 566*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 1
	prepare_question: width: 294*retina, height: 80*retina, x: 60*retina, y: 566*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
	answers: width: 294*retina, height: 80*retina, x: 60*retina, y: 566*retina, backgroundColor: "rgba(0,0,0,1.00)", borderColor: "rgba(82,82,82,1.00)", borderWidth: 2*retina, shadowX: 0, shadowY: 0, shadowBlur: 10*retina, shadowSpread: 0, shadowColor: "rgba(0,0,0,0.50)", cornerRadius: 10*retina, rotation: 0, opacity: 0
}
question4_3.states.switchInstant 'start'

question4_text.states.add {
	start: width: 175*retina, height: 40*retina, x: 119*retina, y: 1107*retina, rotation: 0, opacity: 1
	choose_theme: width: 175*retina, height: 40*retina, x: 119*retina, y: 583*retina, rotation: 0, opacity: 1
	prepare_question: width: 175*retina, height: 40*retina, x: 119*retina, y: 583*retina, rotation: 0, opacity: 0
	answers: width: 175*retina, height: 40*retina, x: 119*retina, y: 583*retina, rotation: 0, opacity: 0
}
question4_text.states.switchInstant 'start'

choose_theme.states.add {
	start: width: 157*retina, height: 20*retina, x: 129*retina, y: 730*retina, rotation: 0, opacity: 1
	choose_theme: width: 157*retina, height: 20*retina, x: 129*retina, y: 198*retina, rotation: 0, opacity: 1
	prepare_question: width: 157*retina, height: 20*retina, x: 129*retina, y: 98*retina, rotation: 0, opacity: 0
	answers: width: 157*retina, height: 20*retina, x: 129*retina, y: 198*retina, rotation: 0, opacity: 0
}
choose_theme.states.switchInstant 'start'

basic_round_indicator.states.add {
	start: width: 163*retina, height: 60*retina, x: 126*retina, y: 80*retina, rotation: 0, opacity: 0
	choose_theme: width: 163*retina, height: 60*retina, x: 126*retina, y: 80*retina, rotation: 0, opacity: 0
	prepare_question: width: 163*retina, height: 60*retina, x: 126*retina, y: 40*retina, rotation: 0, opacity: 1
	answers: width: 163*retina, height: 60*retina, x: 126*retina, y: 40*retina, rotation: 0, opacity: 1
}
basic_round_indicator.states.switchInstant 'start'

this_round_1.states.add {
	start: width: 40*retina, height: 40*retina, x: 138*retina, y: 100*retina, rotation: 0, opacity: 0
	choose_theme: width: 40*retina, height: 40*retina, x: 138*retina, y: 50*retina, rotation: 0, opacity: 0
	prepare_question: width: 40*retina, height: 40*retina, x: 138*retina, y: 50*retina, rotation: 0, opacity: 1
	answers: width: 40*retina, height: 40*retina, x: 138*retina, y: 50*retina, rotation: 0, opacity: 1
}
this_round_1.states.switchInstant 'start'

big_title.states.add {
	start: width: 263*retina, height: 29*retina, x: 72*retina, y: 291*retina, rotation: 0, opacity: 0
	choose_theme: width: 263*retina, height: 29*retina, x: 72*retina, y: 291*retina, rotation: 0, opacity: 0
	prepare_question: width: 263*retina, height: 29*retina, x: 72*retina, y: 240*retina, rotation: 0, opacity: 1
	answers: width: 263*retina, height: 29*retina, x: 72*retina, y: 240*retina, rotation: 0, opacity: 1
}
big_title.states.switchInstant 'start'

timer.states.add {
	start: width: 64*retina, height: 64*retina, x: 175*retina, y: 510*retina, rotation: 0, opacity: 0
	choose_theme: width: 64*retina, height: 64*retina, x: 175*retina, y: 510*retina, rotation: 0, opacity: 0
	prepare_question: width: 64*retina, height: 64*retina, x: 175*retina, y: 510*retina, rotation: 0, opacity: 0
	answers: width: 106*retina, height: 106*retina, x: 154*retina, y: 489*retina, rotation: 0, opacity: 1
}
timer.states.switchInstant 'start'

new_game_button.states.add {
	start: width: 140*retina, height: 140*retina, x: 137*retina, y: 522*retina, rotation: 0, opacity: 0
	choose_theme: width: 140*retina, height: 140*retina, x: 137*retina, y: 522*retina, rotation: 0, opacity: 0
	prepare_question: width: 140*retina, height: 140*retina, x: 137*retina, y: 472*retina, rotation: 0, opacity: 1
	answers: width: 84*retina, height: 84*retina, x: 165*retina, y: 500*retina, rotation: 0, opacity: 0
}
new_game_button.states.switchInstant 'start'

answer_1.states.add {
	start: width: 167*retina, height: 99*retina, x: 47*retina, y: 450*retina, rotation: 0, opacity: 0
	choose_theme: width: 167*retina, height: 99*retina, x: 47*retina, y: 450*retina, rotation: 0, opacity: 0
	prepare_question: width: 167*retina, height: 99*retina, x: 47*retina, y: 450*retina, rotation: 0, opacity: 0
	answers: width: 209*retina, height: 123*retina, x: 7*retina, y: 427*retina, rotation: 0, opacity: 1
}
answer_1.states.switchInstant 'start'

answer_2.states.add {
	start: width: 167*retina, height: 99*retina, x: 47*retina, y: 534*retina, rotation: 0, opacity: 0
	choose_theme: width: 167*retina, height: 99*retina, x: 47*retina, y: 534*retina, rotation: 0, opacity: 0
	prepare_question: width: 167*retina, height: 99*retina, x: 47*retina, y: 534*retina, rotation: 0, opacity: 0
	answers: width: 209*retina, height: 123*retina, x: 7*retina, y: 533*retina, rotation: 0, opacity: 1
}
answer_2.states.switchInstant 'start'

answer_3.states.add {
	start: width: 167*retina, height: 99*retina, x: 200*retina, y: 534*retina, rotation: 0, opacity: 0
	choose_theme: width: 167*retina, height: 99*retina, x: 200*retina, y: 534*retina, rotation: 0, opacity: 0
	prepare_question: width: 167*retina, height: 99*retina, x: 200*retina, y: 534*retina, rotation: 0, opacity: 0
	answers: width: 209*retina, height: 123*retina, x: 198*retina, y: 533*retina, rotation: 0, opacity: 1
}
answer_3.states.switchInstant 'start'

answer_4.states.add {
	start: width: 167*retina, height: 99*retina, x: 200*retina, y: 450*retina, rotation: 0, opacity: 0
	choose_theme: width: 167*retina, height: 99*retina, x: 200*retina, y: 450*retina, rotation: 0, opacity: 0
	prepare_question: width: 167*retina, height: 99*retina, x: 200*retina, y: 450*retina, rotation: 0, opacity: 0
	answers: width: 209*retina, height: 123*retina, x: 198*retina, y: 427*retina, rotation: 0, opacity: 1
}
answer_4.states.switchInstant 'start'

ads.states.add {
	start: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
	choose_theme: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
	prepare_question: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
	answers: width: 414*retina, height: 50*retina, x: 0, y: 686*retina, rotation: 0, opacity: 1
}
ads.states.switchInstant 'start'


generatedState1 = "start"
generatedState2 = "choose_theme"
generatedState3 = "prepare_question"
generatedState4 = "answers"


layers = [screen_bg, start, darker_bg, overlay_bg, question1_1, question1_2, question1_3, question1_text, question2_1, question2_2, question2_3, question2_text, question3_1, question3_2, question3_3, question3_text, question4_1, question4_2, question4_3, question4_text, choose_theme, basic_round_indicator, this_round_1, big_title, timer, new_game_button, answer_1, answer_2, answer_3, answer_4, ads]
generatedStates = [generatedState1, generatedState2, generatedState3, generatedState4]

cycler = Utils.cycle(generatedStates)
# generatedButton = new Layer width: Screen.width, height: Screen.height, opacity: 0


card_question = new Layer width: 360*retina, height: 234*retina, x: 27*retina, y: 139*retina, image: "images/new card.png", opacity: 0, scale: 0.8


nextState = cycler()
screen.on Events.Click, ->
	nextState = cycler()
	for item in layers
		if nextState == "prepare_question"
			if item == big_title
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.6)
			else if item == this_round_1
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 1.6)
			else 
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		
		else if nextState == "start"
			if item == big_title
				card_question.animate
					opacity: 0
					scale: 0.8
					options: 
						time: 0.2
			
			item.animate(nextState, curve: Spring(damping: 1), time: 0.2)
		
		else if nextState == "answers"
			if item == big_title
				card_question.animate
					opacity: 1
					scale: 1
					options: 
						time: 1
		
			if item == answer_1
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.1)
			else if item == answer_4
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.2)
			else if item == answer_2
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.3)
			else if item == answer_3
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5, delay: 0.4)
			else
				item.animate(nextState, curve: Spring(damping: 1), time: 0.5)
		else
			item.animate(nextState, curve: Spring(damping: 1), time: 0.5)


for item in layers
	item.parent = screen

# generatedButton.parent = screen
card_question.parent = screen


statusBar = new Layer
	parent: screen, width: screen.width, height: 20, backgroundColor: "black"