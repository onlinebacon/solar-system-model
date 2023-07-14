import * as ModelManager from '../managers/model-manager.js';

const vars = [];
const template = document.querySelector('.var-template');
template.remove();

const removeClass = (dom, className) => {
	const attr = (dom.getAttribute('class') || '').trim();
	if (!attr) {
		dom.setAttribute('class', '');
	}
	const arr = attr.split(/\s+/).filter(cls => cls !== className);
	dom.setAttribute('class', arr.join('\x20'));
	return dom;
};

export const render = () => {
	const { models } = ModelManager;
	const maxErr = ModelManager.getWorst().error;
	const minErr = ModelManager.getBest().error;
	const errRange = maxErr - minErr;
	for (const { modelVar, index, canvas, ctx } of vars) {
		const { width, height } = canvas;
		const { min, range } = modelVar;
		const y = height/2;
		ctx.clearRect(0, 0, width, height);
		for (const model of models) {
			const arg = model.args[index];
			const err = model.error;
			const x = (arg - min)/range*width;
			const normal = 1 - (1 - (err - minErr)/errRange)**2;
			const channel = Math.round(normal*255);
			const significance = (Math.abs(normal - 0.5)*2)**2;
			const color = `rgba(${channel}, 0, ${255 - channel}, ${significance})`;
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(x, y + (Math.random() - 0.5)*2, 3, 0, Math.PI*2);
			ctx.fill();
		}
	}
};

export const add = ({ modelVar, onchange }) => {
	const dom = template.cloneNode(true);
	const inputMap = {};
	const fields = [ 'min', 'max' ];
	removeClass(dom, 'var-template');
	const updateInputs = () => {
		for (const field of fields) {
			inputMap[field].value = modelVar[field];
		}
	};
	for (const field of fields) {
		const input = dom.querySelector(`.${field} input`);
		input.onchange = () => {
			modelVar[field] = Number(input.value);
			onchange?.();
		};
		inputMap[field] = input;
	}
	updateInputs();
	dom.querySelector('.label').innerText = modelVar.label;
	document.body.appendChild(dom);
	const canvas = dom.querySelector('canvas');
	canvas.addEventListener('click', e => {
		const nx = e.offsetX/canvas.width;
		const range = modelVar.range;
		const val = modelVar.min + nx*range;
		const min = modelVar.min = val - range/4;
		const max = modelVar.max = val + range/4;
		inputMap.min.value = min;
		inputMap.max.value = max;
		onchange?.();
	});
	const ctx = canvas.getContext('2d');
	const index = vars.length;
	vars.push({ modelVar, index, canvas, ctx });
};
