export default class ModelVar {
	constructor({ label, name, index, min, max }) {
		this.label = label;
		this.name = name;
		this.index = index;
		this.min = min;
		this.max = max;
	}
	get range() {
		return this.max - this.min;
	}
	rand() {
		return Math.random()*this.range + this.min;
	}
}
