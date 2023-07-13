const models = [];

export const add = (model) => {
	models.add(model);
};

export const getBest = () => {
	let best = null;
	for (const model of models) {
		if (best === null || model.error < best.error) {
			best = model;
		}
	}
	return best;
};
