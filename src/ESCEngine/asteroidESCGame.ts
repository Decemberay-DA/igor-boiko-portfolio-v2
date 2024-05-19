import { pipe } from "fp-ts/lib/function"
import { World } from "miniplex"
import createReactAPI from "miniplex-react"
import { THREE } from "~/exp"

export type IDynamicSpatialPoint = {
	position: THREE.Vector3
	rotation: THREE.Euler
}
export type IDynamicTemporalPoint = {
	velocity: THREE.Vector3
}

/* Our entity type */
// this is component bwt
export type Asteroid = IDynamicSpatialPoint & IDynamicTemporalPoint

/* Create a Miniplex world that holds our entities */
export const asteroidWorld = new World<Asteroid>()

const _genPose = () => Math.random() - 0.5
const _getVector = (range: number) =>
	new THREE.Vector3(_genPose() * range, _genPose() * range, _genPose() * range)
const createSwarm = (ammouns: number = 123) => {
	for (let i = 0; i < ammouns; i++) {
		const Asteroid = asteroidWorld.add({
			position: _getVector(5),
			velocity: _getVector(0.04),
			rotation: new THREE.Euler(),
		})
	}
}
createSwarm(123)

// smth

const velocitySmoothCap = (max: number) => (v: THREE.Vector3) => {
	const targetVelocity = v.clone()
	const currentSpeed = v.length()

	if (currentSpeed > max) {
		const speedDifference = currentSpeed - max
		const capFactor = speedDifference / currentSpeed

		targetVelocity.multiplyScalar(1 - capFactor)
		targetVelocity.add(v.multiplyScalar(capFactor))
	}

	return targetVelocity
}

// SYSTEMS
const velocityApplySystem = (entities: World<Asteroid>) => {
	for (const entity of entities) {
		entity.position.add(entity.velocity)
	}
	return entities
}
const velocityFadeSystem = (entities: World<Asteroid>) => {
	var velocityFading = 0.99
	for (const entity of entities) {
		entity.velocity.multiplyScalar(velocityFading)
	}
	return entities
}
const distanceClampSystem = (entities: World<Asteroid>) => {
	var centerPoint = new THREE.Vector3(0, 0, 0)
	var radius = 2
	for (const entity of entities) {
		const distance = centerPoint.distanceTo(entity.position)
		if (distance > radius) {
			entity.velocity.set(0, 0, 0)
		}
	}
	return entities
}
const pointGravitySystem = (entities: World<Asteroid>) => {
	var gravitationPoint = new THREE.Vector3(0, 0, 0)
	var minGravityMagnitude = 0.0001
	var maxGravityMagnitude = 0.009
	for (const entity of entities) {
		const direction = gravitationPoint.clone().sub(entity.position).normalize()

		const distance = gravitationPoint.distanceTo(entity.position)
		const gravityMagnitude = 0.005 / distance

		const gravityMagnitude2 = Math.max(
			minGravityMagnitude,
			Math.min(maxGravityMagnitude, gravityMagnitude),
		)

		entity.velocity.add(direction.multiplyScalar(gravityMagnitude2))
	}
	return entities
}
const keepDistanceFromEachOtherSystem = (entities: World<Asteroid>) => {
	var minDistance = 0.1
	for (const entity of entities) {
		for (const naighbour of entities) {
			if (entity === naighbour) continue

			const directionAB = naighbour.position.clone().sub(entity.position)

			directionAB.normalize()

			const currentDistance = entity.position.distanceTo(naighbour.position)

			if (currentDistance < minDistance) {
				const adjustmentAmount = (minDistance - currentDistance) / 2
				const adjustmentVector = directionAB.multiplyScalar(adjustmentAmount)

				entity.velocity.add(adjustmentVector)
				naighbour.velocity.sub(adjustmentVector)
			}
		}
	}
	return entities
}

// every frame systems update loop
let frameCount = 0
const systemUpdateLoop = () => {
	pipe(
		asteroidWorld,
		// physycks
		pointGravitySystem,
		keepDistanceFromEachOtherSystem,
		distanceClampSystem,
		// velocity
		velocityApplySystem,
		velocityFadeSystem,
	)

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
