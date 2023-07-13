import * as VarManager from '../managers/var-manager.js';
import objective from '../math/objective.js';

export default class Model {
	constructor(args) {
		this.args = args ?? VarManager.map(v => v.rand());
		this.error = objective(this.args);
	}
}
