import { pipe } from "fp-ts/lib/function"
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
const lambdaSystem =
	<TEntity>(fn: (a: TEntity) => void) =>
	(entities: TEntity[]) => {
		for (const entity of entities) {
			fn(entity)
		}
		return entities
	}
const velocitySystem = (entities: Asteroid[]) => {
	var velocityFading = 0.99
	for (const entity of entities) {
		entity.position.add(entity.velocity)
		entity.velocity.multiplyScalar(velocityFading)
	}
	return entities
}
const distanceClampSystem = (entities: Asteroid[]) => {
	var centerPoint = new THREE.Vector3(0, 0, 0)
	var radius = 2
	for (const entity of entities) {
		const distance = centerPoint.distanceTo(entity.position)
		if (distance > radius) {
			// const direction = centerPoint.clone().sub(entity.position).normalize().multiplyScalar(radius)
			entity.velocity.set(0, 0, 0)
			// entity.position.copy(direction.multiplyScalar(-1))
		}
	}
	return entities
}
const pointGravitySystem = (entities: Asteroid[]) => {
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
const keepDistanceFromEachOtherSystem = (entities: Asteroid[]) => {
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
		asteroidWorld.entities,
		pointGravitySystem,
		keepDistanceFromEachOtherSystem,
		distanceClampSystem,
		velocitySystem,
		lambdaSystem((a) => velocitySmoothCap(0.5)(a.velocity)),
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
