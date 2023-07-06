export default {
	time: new Date('2022-01-01T00:00:00Z')*1e-3,
	dt: 1,
	G: 6.6743e-11,
	bodies: {
		sun: {
			mass: 1.9887426e+30,
			radius: 6.95700e+8,
			position: [ 0, 0, 0 ],
			velocity: [ 0, 0, 0 ],
		},
		earth: {
			mass: 5.9722e+24,
			radius: 6.3710088e+6,
			position: [ 0, 0, -1.5e+11 ],
			velocity: [ -3e+4, 0, 0 ],
			rotation: {
				period: 86164.09054,
				offset: 0,
				axis: { 'tilt': 23.4, 'direction': 180 },
			},
		},
	},
};
