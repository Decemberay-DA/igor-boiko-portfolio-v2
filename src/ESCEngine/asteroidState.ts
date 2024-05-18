import { World } from "miniplex"
import createReactAPI from "miniplex-react"
import { THREE } from "~/exp"

/* Our entity type */
export type Asteroid = {
	position: THREE.Vector3
	velocity: THREE.Vector3
	rotation: THREE.Euler
}

/* Create a Miniplex world that holds our entities */
export const asteroidWorld = new World<Asteroid>()

const _genRange = 5
const _genPose = () => (Math.random() - 0.5) * _genRange
const createSwarm = (ammouns: number = 123) => {
	for (let i = 0; i < ammouns; i++) {
		const Asteroid = asteroidWorld.add({
			position: new THREE.Vector3(_genPose(), _genPose(), _genPose()),
			velocity: new THREE.Vector3(0, 0, 0),
			rotation: new THREE.Euler(),
		})
	}
}
createSwarm(50)

/* Create a bunch of systems: */
const velocitySystem = () => {
	const velocityFading = 0.99
	for (const a of asteroidWorld.entities) {
		a.position.add(a.velocity)
		a.velocity.multiplyScalar(velocityFading)
	}
}
const pointGravitySystem = () => {
	const gravitationPoint = new THREE.Vector3(0, 0, 0)
	const minGravityMagnitude = 0.0001
	const maxGravityMagnitude = 0.009
	for (const a of asteroidWorld.entities) {
		const direction = gravitationPoint.clone().sub(a.position).normalize()

		const distance = gravitationPoint.distanceTo(a.position)
		const gravityMagnitude = 0.005 / distance

		const gravityMagnitude2 = Math.max(
			minGravityMagnitude,
			Math.min(maxGravityMagnitude, gravityMagnitude),
		)

		a.velocity.add(direction.multiplyScalar(gravityMagnitude2))
	}
}

// every frame systems update loop
let frameCount = 0
const systemUpdateLoop = () => {
	velocitySystem()
	pointGravitySystem()

	frameCount++
	if (frameCount % 100 === 0) {
		console.log(`esc frame count: ${frameCount} | entities: ${asteroidWorld.entities.length}`)
	}

	requestAnimationFrame(systemUpdateLoop)
}

let isSystemUpdateLoopRunning = false
export const startSystemUpdateLoop = () => {
	if (isSystemUpdateLoopRunning) return
	console.log("start system update loop for esc engine")
	systemUpdateLoop()
	isSystemUpdateLoopRunning = true
}
