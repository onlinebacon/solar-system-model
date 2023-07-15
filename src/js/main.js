import * as VarManager from './managers/var-manager.js';
import * as ModelManager from './managers/model-manager.js';
import * as ViewVar from './view/view-model-var.js';
import * as ErrorPlot from './view/error-plot.js';
import ModelVar from './model/model-var.js';
import Model from './model/model.js';

const maxModels = 1000;

let breeding = false;
let paused = false;

const breed = () => {
	const models = ModelManager.models;
	const n = models.length;
	const nb = Math.ceil(n*0.1);
	const best = models.slice(0, nb);
	const a = best[nb*Math.random()|0];
	const b = best[nb*Math.random()|0];
	const args = a.args.map((arg, i) => {
		const bArg = b.args[i];
		if (Math.random() < 0.5) {
			arg = bArg;
		}
		return arg + (Math.random() - 0.5)*0.1*VarManager.get(i).range;
	});
	ModelManager.add(new Model(args));
};

const updateLoop = async () => {
	const models = ModelManager.models;
	for (;;) {
		if (!paused) {
			if (models.length < maxModels) {
				if (breeding) {
					breed();
				} else {
					ModelManager.add(new Model());
				}
			}
		}
		ViewVar.render();
		ErrorPlot.render();
		await new Promise(done => setTimeout(done, 0));
	}
};

const togglePause = () => {
	paused = !paused;
};

const refresh = () => {
	breeding = false;
	ModelManager.clear();
};

const startBreeding = () => {
	breeding = true;
	ModelManager.models.length >>= 1;
};

const addVar = (config) => {
	const modelVar = new ModelVar(config);
	VarManager.add(modelVar);
	ViewVar.add({ modelVar, onchange: refresh });
};

const shrinkAll = () => {
	const model = ModelManager.getBest();
	VarManager.forEach((v, i) => {
		let { range } = v;
		range /= 2;
		let val = model.args[i];
		v.min = val - range/2;
		v.max = val + range/2;
	});
	refresh();
	ViewVar.updateInputs();
};

addVar({
	label: 'Latitude',
	name: 'lat',
	min: -90,
	max: 90,
});

addVar({
	label: 'Longitude',
	name: 'lon',
	min: -180,
	max: 180,
});

document.querySelector('#pause').addEventListener('click', () => {
	togglePause();
});

document.querySelector('#refresh').addEventListener('click', () => {
	refresh();
});

document.querySelector('#breed').addEventListener('click', () => {
	startBreeding();
});

document.querySelector('#shrink_all').addEventListener('click', () => {
	shrinkAll();
});

updateLoop();
