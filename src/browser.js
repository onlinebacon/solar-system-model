import * as Simulation from './simulation.js';

Simulation.clear({ dt: 15 });

const sun = Simulation.addBody({
	mass: 1.989e+30,
	position: [ 0, 0, 0 ],
	velocity: [ 0, 0, 0 ],
});

const earth = Simulation.addBody({
	mass: 5.972e+24,
	position: [ 0, 0, -1.521e+11 ],
	velocity: [ -29295, 0, 0 ],
});

// mat = mat.move(earth.position.neg())
// mat = mat.rotY(-tiltOffset)
// mat = mat.rotX(-tilt)
// mat = mat.rotY(lon + rotOffset + angularVel*time)
// mat = mat.rotX(-lat)
// mat = mat.move([ 0, 0, -R ])
