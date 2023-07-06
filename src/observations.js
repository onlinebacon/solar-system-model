const date = (str) => {
	const dt = new Date(str);
	const t = dt.getTime();
	return t/1000;
};

const angle = (str) => {
	str = str.trim();
	const sign = /^[-+]/.match(str)?.[0]?.trim();
	str = str.replace(/^[-+]\s*/, '');
	const abs = str.split(/\s+/).map(val => (val, i) => val*60**-i).reduce((a, b) => a + b, 0);
	return sign === '-' ? - abs : abs;
};

export default [{
	time: date('2022-01-01T00:00:00Z'),
	lat: 0,
	lon: 180,
	bodies: {
		sun: {
			azm: angle('178 03 29.6'),
			alt: angle('66 57 53.7'),
			size: angle('0 32 30.99'),
		}
	}
}, {
	time: date('2022-01-01T00:00:00Z'),
	lat: 0,
	lon: -90,
	bodies: {
		sun: {
			azm: angle('246 58 39.9'),
			alt: angle('0 45 25.8'),
			size: angle('0 32 30.91'),
		}
	}
}, {
	time: date('2022-01-01T06:00:00Z'),
	lat: 0,
	lon: 90,
	bodies: {
		sun: {
			azm: angle('177 59 11.7'),
			alt: angle('66 59 03.3'),
			size: angle('0 32 31'),
		}
	}
}, {
	time: date('2022-01-01T06:00:00Z'),
	lat: 0,
	lon: 180,
	bodies: {
		sun: {
			azm: angle('246 59 52.6'),
			alt: angle('0 47 04.4'),
			size: angle('0 32 30.92'),
		}
	}
}];
