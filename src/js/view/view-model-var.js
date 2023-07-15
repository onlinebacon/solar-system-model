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

const markLine = (canvas, ctx, modelVar, arg, color) => {
	const x = (arg - modelVar.min)/modelVar.range*canvas.width;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(x, 0);
	ctx.lineTo(x, canvas.height);
	ctx.stroke();
};

export const render = () => {
	const { models } = ModelManager;
	const worst = ModelManager.getWorst();
	const best = ModelManager.getBest();
	const maxErr = worst.error;
	const minErr = best.error;
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
		markLine(canvas, ctx, modelVar, best.args[index], '#fff');
	}
};

export const add = ({ modelVar, onchange }) => {
	const dom = template.cloneNode(true);
	const inputMap = {};
	const fields = [ 'val', 'range' ];
	for (const field of fields) {
		inputMap[field] = dom.querySelector(`.${field} input`);
	}
	removeClass(dom, 'var-template');
	const updateInputs = () => {
		const { min, range } = modelVar;
		const val = min + range/2;
		inputMap.val.value = Number(val.toPrecision(12));
		inputMap.range.value = Number(range.toPrecision(5));
	};
	inputMap.val.onchange = () => {
		const { range } = modelVar;
		const val = Number(inputMap.val.value);
		modelVar.min = val - range/2;
		modelVar.max = val + range/2;
		onchange?.();
	};
	inputMap.range.onchange = () => {
		const { min, range } = modelVar;
		const val = min + range/2;
		const newRange = Number(inputMap.range.value);
		modelVar.min = val - newRange/2;
		modelVar.max = val + newRange/2;
		onchange?.();
	};
	updateInputs();
	dom.querySelector('.label').innerText = modelVar.label;
	document.body.appendChild(dom);
	const canvas = dom.querySelector('canvas');
	canvas.addEventListener('click', e => {
		const nx = e.offsetX/canvas.width;
		const range = modelVar.range;
		const val = modelVar.min + nx*range;
		modelVar.min = val - range/4;
		modelVar.max = val + range/4;
		updateInputs();
		onchange?.();
	});
	const ctx = canvas.getContext('2d');
	const index = vars.length;
	vars.push({ modelVar, index, canvas, ctx, updateInputs });
};

export const updateInputs = () => {
	vars.forEach(v => v.updateInputs());
};
