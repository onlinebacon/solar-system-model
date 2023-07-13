import * as VarManager from '../managers/var-manager.js';
import objective from '../math/objective.js';

export default class Model {
	constructor() {
		this.args = VarManager.map(v => v.rand());
		this.error = objective(this.args);
	}
}
