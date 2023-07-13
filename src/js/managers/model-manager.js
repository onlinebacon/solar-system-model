import * as VarManager from './var-manager.js';

export const models = [];

export const add = (model) => {
	let index = models.length;
	models.push(model);
	while (index > 0) {
		if (models[index - 1].error <= model.error) {
			break;
		}
		models[index] = models[index - 1];
		index --;
	}
	models[index] = model;
};

export const getBest = () => {
	return models[0];
};

export const getWorst = () => {
	return models.at(-1);
};

export const removeWorse = () => {
	models.length --;
};

export const clear = () => {
	models.length = 0;
};
