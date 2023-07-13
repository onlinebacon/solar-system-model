const template = document.querySelector('.var-template');
template.remove();

const removeClass = (dom, className) => {
	const attr = (dom.getAttribute('class') || '').trim();
	if (!attr) {
		dom.setAttribute('class', '');
	}
	const arr = attr.split(/\s+/).filter(cls => cls !== className);
	dom.setAttribute('class', arr.join('\x20'));
	return dom;
};

export const add = ({ modelVar, onchange }) => {
	const dom = template.cloneNode(true);
	const inputMap = {};
	const fields = [ 'min', 'max' ];
	removeClass(dom, 'var-template');
	const updateInputs = () => {
		for (const field of fields) {
			inputMap[field].value = modelVar[field];
		}
	};
	for (const field of fields) {
		const input = dom.querySelector(`.${field} input`);
		input.onchange = () => {
			modelVar[field] = Number(input.value);
			onchange?.();
		};
		inputMap[field] = input;
	}
	updateInputs();
	dom.querySelector('.label').innerText = modelVar.label;
	document.body.appendChild(dom);
};
