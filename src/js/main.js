import * as VarManager from './managers/var-manager.js';
import * as ModelManager from './managers/model-manager.js';
import * as ViewVar from './view/view-model-var.js';
import * as ErrorPlot from './view/error-plot.js';
import ModelVar from './model/model-var.js';
import Model from './model/model.js';

const maxModels = 500;

let paused = false;

const updateLoop = async () => {
	for (;;) {
		if (!paused) {
			if (ModelManager.models.length < maxModels) {
				ModelManager.add(new Model());
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
	ModelManager.clear();
};

const addVar = (config) => {
	const modelVar = new ModelVar(config);
	VarManager.add(modelVar);
	ViewVar.add({ modelVar, onchange: refresh });
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

updateLoop();
