const modelVars = [];

export const add = (modelVar) => {
	modelVars.push(modelVar);
};

export const map = (fn) => {
	return modelVars.map(fn);
};

export const forEach = (fn) => {
	modelVars.forEach(fn);
};

export const indexOf = (modelVar) => {
	return modelVars.indexOf(modelVar);
};
