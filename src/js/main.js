import * as VarManager from './managers/var-manager.js';
import ModelVar from './model/model-var.js';
import * as ViewVar from './view/view-model-var.js';

const addVar = (config) => {
	const modelVar = new ModelVar(config);
	VarManager.add(modelVar);
	ViewVar.add({ modelVar });
};

addVar({ label: 'Latitude', name: 'lat', min: -90, max: +90 });
addVar({ label: 'Longitude', name: 'lon', min: -180, max: 180 });
