import * as ModelManager from '../managers/model-manager.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const errorSpan = document.querySelector('#error');

export const render = () => {
	const { width, height } = canvas;
	const models = ModelManager.models;
	const n = models.length;
	const minErr = ModelManager.getBest().error;
	const maxErr = ModelManager.getWorst().error;
	const errRange = maxErr - minErr;
	ctx.clearRect(0, 0, width, height);
	ctx.strokeStyle = '#f70';
	ctx.beginPath();
	for (let i=0; i<n; ++i) {
		const x = i/(n - 1)*width;
		const normal = 1 - (models[i].error - minErr)/errRange;
		const y = normal*height;
		if (i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	}
	ctx.stroke();
	errorSpan.innerText = Number(minErr.toPrecision(5))
		+ ' - ' + Number(maxErr.toPrecision(5));
};
