let current_test_failed = false;

const equals = (va, vb) => {
	if (va.length !== vb.length) {
		console.error(`Unexpected array length. Expected: ${va.length}, Actual: ${vb.length}`);
		current_test_failed = true;
		return;
	}
	for (let i=0; i<va.length; i++) {
		const a = va[i];
		const b = vb[i];
		if (a !== b) {
			console.error(`Mismatch in position ${i}; expected: ${a}, Actual: ${b}, Diff: ${a - b}`);
			current_test_failed = true;
		}
	}
};

const approximates = (va, vb, error) => {
	if ((typeof va) !== (typeof vb)) {
		current_test_failed = true;
		console.error(`Different types. Expected: ${typeof va}, Actual: ${typeof vb}`);
		return;
	}
	if (typeof va === 'number') {
		if (isNaN(va) !== isNaN(vb)) {
			current_test_failed = true;
			console.error(`Unexpected array length. Expected: ${va.length}, Actual: ${vb.length}`);
			return;
		}
		const dif = va - vb;
		if (Math.abs(dif) < error) {
			return;
		}
		console.error(`Expected: ${va}, Actual: ${vb}, Diff: ${dif}`);
		current_test_failed = true;
		return;
	}
	if (va.length !== vb.length) {
		current_test_failed = true;
		console.error(`Unexpected array length. Expected: ${va.length}, Actual: ${vb.length}`);
		return;
	}
	for (let i=0; i<va.length; ++i) {
		const a = va[i];
		const b = vb[i];
		const e = Math.abs(a - b);
		if (e > error) {
			current_test_failed = true;
			console.error(`Mismatch in position ${i}; Expected: ${a}, Actual: ${b}, Diff: ${a - b}`);
		}
	}
};

export const runTests = (file, tests) => {
	console.log('Testing', file);
	let someFailed = false;
	for (const { name, run } of tests) {
		current_test_failed = false;
		console.log(`${name}...`);
		try {
			run();
		} catch(e) {
			console.error(e);
		}
		if (current_test_failed) {
			someFailed = true;
		}
	}
	if (someFailed) {
		console.error('Fail');
		process.exit(1);
	} else {
		console.log('Pass');
	}
};

export const assert = {
	equals,
	approximates,
};
